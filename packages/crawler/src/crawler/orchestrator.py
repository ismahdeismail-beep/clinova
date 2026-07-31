import os
import time
from datetime import datetime, timezone
from typing import Any

from loguru import logger

from ..utils.config import CrawlerConfig
from ..utils.helpers import slugify, safe_filename, compute_hash
from ..crawler.reader import get_all_drugs
from ..crawler.search_terms import build_all_search_terms
from ..provider.wikimedia import WikimediaProvider
from ..provider.openi import OpeniProvider
from ..provider.nih import NihProvider
from ..provider.nci import NciProvider
from ..license.verifier import LicenseVerifier
from ..download.downloader import ImageDownloader
from ..validator.image_validator import ImageValidator
from ..duplicate.detector import DuplicateDetector
from ..optimizer.optimizer import ImageOptimizer
from ..uploader.uploader import get_uploader
from ..metadata.store import (
    ensure_drug_images_table,
    save_image_metadata,
    get_crawl_statistics,
)
from ..scheduler.crawler_scheduler import CrawlerScheduler
from ..reporting.reporter import CrawlReporter


PROVIDER_MAP = {
    "wikimedia": WikimediaProvider,
    "openi": OpeniProvider,
    "nih": NihProvider,
    "nci": NciProvider,
}


class MedicineImageCrawler:
    def __init__(self, config: CrawlerConfig | None = None) -> None:
        self.config = config or CrawlerConfig()
        self.license_verifier = LicenseVerifier(accepted_licenses=self.config.accepted_licenses)
        self.downloader = ImageDownloader(
            tmp_dir=self.config.tmp_download_dir,
            max_retries=self.config.retry_attempts,
            retry_delay=self.config.retry_delay_seconds,
            max_concurrent=self.config.max_concurrent_downloads,
        )
        self.validator = ImageValidator(
            min_width=self.config.image_min_width,
            min_height=self.config.image_min_height,
        )
        self.duplicate_detector = DuplicateDetector()
        self.optimizer = ImageOptimizer(
            max_file_size_kb=self.config.max_file_size_kb,
            output_dir=self.config.storage_base_dir,
        )
        self.uploader = get_uploader(self.config)
        self.scheduler = CrawlerScheduler(self.config)
        self.reporter = CrawlReporter(output_dir=self.config.report_output_dir)
        self._stats: dict[str, Any] = {
            "medicines_searched": 0,
            "images_found": 0,
            "images_accepted": 0,
            "images_rejected": 0,
            "duplicates_removed": 0,
            "failures": [],
            "rejection_reasons": {},
            "start_time": 0,
        }

    def _get_provider(self, name: str):
        provider_class = PROVIDER_MAP.get(name)
        if provider_class is None:
            return None
        return provider_class()

    def _get_drug_name(self, drug: dict) -> str:
        return drug.get("generic_name") or drug.get("name") or ""

    def _get_drug_brand_names(self, drug: dict) -> list[str]:
        brands = drug.get("brand_names") or []
        if isinstance(brands, str):
            brands = [b.strip() for b in brands.split(",") if b.strip()]
        return brands

    def _get_drug_id(self, drug: dict) -> str:
        return drug.get("id", "") or slugify(self._get_drug_name(drug))

    def crawl_medicine(self, drug: dict) -> dict[str, Any]:
        drug_id = self._get_drug_id(drug)
        generic_name = self._get_drug_name(drug)
        brand_names = self._get_drug_brand_names(drug)

        if not generic_name:
            return {"drug_id": drug_id, "status": "skipped", "reason": "No generic name"}

        search_terms = build_all_search_terms([drug], self.config)
        terms = search_terms.get(drug_id, [])

        if not terms:
            return {"drug_id": drug_id, "status": "skipped", "reason": "No search terms generated"}

        drug_results: list[dict] = []

        for provider_name in self.config.providers:
            provider = self._get_provider(provider_name)
            if provider is None:
                logger.warning("Unknown provider: {}", provider_name)
                continue

            for term in terms:
                try:
                    raw_results = provider.search(term, max_results=10)
                    parsed = provider.parse_results(raw_results)
                    for img in parsed:
                        img.source = provider_name
                        drug_results.append(img)
                except Exception as e:
                    logger.warning("Provider {} failed for '{}': {}", provider_name, term, e)

        self._stats["medicines_searched"] += 1
        self._stats["images_found"] += len(drug_results)

        accepted, rejected = self.license_verifier.verify_batch(drug_results)
        self._stats["images_accepted"] += len(accepted)
        self._stats["images_rejected"] += len(rejected)

        for img in rejected:
            reason = img.metadata.get("rejection_reason", "Unknown")
            self._stats["rejection_reasons"][reason] = self._stats["rejection_reasons"].get(reason, 0) + 1

        downloaded_paths: list[str] = []
        for img in accepted:
            local_path = self.downloader.download(img.image_url)
            if local_path is None:
                self._stats["failures"].append(f"Download failed: {img.image_url}")
                continue

            valid, reason = self.validator.validate(local_path)
            if not valid:
                self._stats["rejection_reasons"][f"Validation: {reason}"] = self._stats["rejection_reasons"].get(f"Validation: {reason}", 0) + 1
                os.remove(local_path)
                continue

            is_dup, dup_path = self.duplicate_detector.is_duplicate(local_path)
            if is_dup:
                self._stats["duplicates_removed"] += 1
                os.remove(local_path)
                continue

            downloaded_paths.append((local_path, img))

        optimized_paths: list[dict] = []
        for local_path, img in downloaded_paths:
            optimized = self.optimizer.optimize(
                local_path,
                generic_name,
                img.title or "",
                strength="",
            )
            optimized_paths.append({"img": img, "optimized": optimized, "local_path": local_path})

        uploaded_urls: list[dict] = []
        for item in optimized_paths:
            img = item["img"]
            optimized = item["optimized"]
            local_path = item["local_path"]

            upload_path = f"medicine-images/{slugify(generic_name)}/{slugify(img.title or 'unknown')}"

            original_url = self.uploader.upload(local_path, upload_path)
            thumbnail_url = None
            large_url = None
            if optimized.get("thumbnail_url"):
                thumbnail_url = self.uploader.upload(optimized["thumbnail_url"], upload_path)
            if optimized.get("large_url"):
                large_url = self.uploader.upload(optimized["large_url"], upload_path)

            hash_value = compute_hash(f"{generic_name}-{img.image_url}")

            save_image_metadata(
                config=self.config,
                drug_id=self._get_drug_id(drug),
                generic_name=generic_name,
                dosage_form=img.title,
                strength="",
                image_url=original_url or img.image_url,
                thumbnail_url=thumbnail_url,
                source=img.source,
                license_type=img.license,
                author=img.author,
                page_url=img.page_url,
                hash_value=hash_value,
                quality_score=0.0,
                verified=False,
            )

            uploaded_urls.append(
                {
                    "image_url": original_url or img.image_url,
                    "thumbnail_url": thumbnail_url,
                    "large_url": large_url,
                    "dosage_form": img.title,
                    "source": img.source,
                    "license": img.license,
                }
            )

            if os.path.exists(local_path):
                os.remove(local_path)

        self.scheduler.mark_crawled(drug_id)

        return {
            "drug_id": drug_id,
            "generic_name": generic_name,
            "status": "completed",
            "images_found": len(drug_results),
            "images_accepted": len(accepted),
            "images_rejected": len(rejected),
            "images_uploaded": len(uploaded_urls),
            "images": uploaded_urls,
        }

    def crawl_all(self, drug_ids: list[str] | None = None) -> dict[str, Any]:
        self._stats["start_time"] = time.time()
        ensure_drug_images_table(self.config)
        self.scheduler.start_run()

        drugs = get_all_drugs(
            supabase_url=self.config.supabase_url,
            supabase_key=self.config.supabase_key,
        )

        if drug_ids:
            drugs = [d for d in drugs if d.get("id") in drug_ids]

        self.scheduler.mark_pending([self._get_drug_id(d) for d in drugs])
        pending = self.scheduler.get_pending()

        logger.info("Starting crawl for {} medicines", len(pending))

        for drug in drugs:
            drug_id = self._get_drug_id(drug)
            if drug_ids and drug_id not in drug_ids:
                continue

            try:
                result = self.crawl_medicine(drug)
                logger.info("Crawled {}: {} images uploaded", drug_id, result.get("images_uploaded", 0))
            except Exception as e:
                logger.error("Failed to crawl {}: {}", drug_id, e)
                self._stats["failures"].append(f"{drug_id}: {str(e)}")
                self.scheduler.mark_failed(drug_id)
                continue

        self.scheduler.finish_run()

        elapsed = time.time() - self._stats["start_time"]

        stats = get_crawl_statistics(self.config)
        total_drugs = len(drugs)
        coverage = (stats.get("unique_drugs", 0) / total_drugs * 100) if total_drugs > 0 else 0

        storage_bytes = 0
        for root, _dirs, files in os.walk(self.config.storage_base_dir):
            for f in files:
                fp = os.path.join(root, f)
                if os.path.isfile(fp):
                    storage_bytes += os.path.getsize(fp)
        storage_mb = storage_bytes / (1024 * 1024)

        report = self.reporter.generate_report(
            medicines_searched=self._stats["medicines_searched"],
            images_found=self._stats["images_found"],
            images_accepted=self._stats["images_accepted"],
            images_rejected=self._stats["images_rejected"],
            rejection_reasons=self._stats["rejection_reasons"],
            duplicates_removed=self._stats["duplicates_removed"],
            processing_time_seconds=elapsed,
            failures=self._stats["failures"],
            storage_used_mb=storage_mb,
            coverage_percentage=coverage,
        )

        return {
            "status": "completed",
            "elapsed_seconds": round(elapsed, 2),
            "stats": self._stats,
            "database_stats": stats,
            "report": report,
        }

    def crawl_single(self, drug_id: str) -> dict[str, Any]:
        drugs = get_all_drugs(
            supabase_url=self.config.supabase_url,
            supabase_key=self.config.supabase_key,
        )
        drug = next((d for d in drugs if d.get("id") == drug_id), None)
        if drug is None:
            return {"status": "error", "reason": f"Drug {drug_id} not found"}
        return self.crawl_medicine(drug)