import json
import os
from typing import Any

from loguru import logger


def register_crawler_routes(app: Any) -> None:
    @app.get("/api/drugs/images")
    async def get_drug_images(request: Any) -> dict:
        drug_id = request.query.get("drug_id", "")
        generic_name = request.query.get("generic_name", "")
        dosage_form = request.query.get("dosage_form", "")

        from ..metadata.store import get_images_for_drug
        from ..utils.config import CrawlerConfig, load_config

        config = load_config()

        if drug_id:
            images = get_images_for_drug(config, drug_id)
        elif generic_name:
            all_images = get_images_for_drug(config, "")
            images = [
                img for img in all_images
                if generic_name.lower() in img.get("generic_name", "").lower()
            ]
            if dosage_form:
                images = [
                    img for img in images
                    if dosage_form.lower() in (img.get("dosage_form") or "").lower()
                ]
        else:
            from ..metadata.store import get_crawl_statistics
            stats = get_crawl_statistics(config)
            return {"ok": True, "data": [], "stats": stats}

        return {"ok": True, "data": images}

    @app.get("/api/images/search")
    async def search_images(request: Any) -> dict:
        q = request.query.get("q", "")
        source = request.query.get("source", "")
        license_filter = request.query.get("license", "")

        from ..metadata.store import get_crawl_statistics
        from ..utils.config import CrawlerConfig, load_config

        config = load_config()

        all_images = get_images_for_drug(config, "")

        results = all_images
        if q:
            q_lower = q.lower()
            results = [
                img for img in results
                if q_lower in (img.get("generic_name") or "").lower()
                or q_lower in (img.get("dosage_form") or "").lower()
                or q_lower in (img.get("title") or "").lower()
            ]

        if source:
            results = [img for img in results if img.get("source") == source]

        if license_filter:
            results = [img for img in results if img.get("license") == license_filter]

        return {"ok": True, "data": results, "total": len(results)}

    @app.post("/api/admin/images/reindex")
    async def reindex_images(request: Any) -> dict:
        from ..metadata.store import ensure_drug_images_table
        from ..utils.config import CrawlerConfig, load_config

        config = load_config()
        ensure_drug_images_table(config)

        return {"ok": True, "message": "Drug images table indexed"}

    @app.get("/api/admin/images/stats")
    async def image_stats(request: Any) -> dict:
        from ..metadata.store import get_crawl_statistics
        from ..utils.config import CrawlerConfig, load_config

        config = load_config()
        stats = get_crawl_statistics(config)
        return {"ok": True, "data": stats}

    @app.post("/api/admin/images/crawl")
    async def trigger_crawl(request: Any) -> dict:
        body = await request.json()
        drug_id = body.get("drug_id", "")
        drug_name = body.get("drug_name", "")

        from ..crawler.orchestrator import MedicineImageCrawler
        from ..utils.config import CrawlerConfig, load_config

        config = load_config()
        crawler = MedicineImageCrawler(config)

        if drug_id:
            result = crawler.crawl_single(drug_id)
        elif drug_name:
            result = crawler.crawl_all()
        else:
            result = crawler.crawl_all()

        return {"ok": True, "result": result}

    @app.get("/api/admin/images/missing")
    async def get_missing_drugs(request: Any) -> dict:
        from ..metadata.store import get_missing_drugs
        from ..utils.config import CrawlerConfig, load_config

        config = load_config()
        missing = get_missing_drugs(config)
        return {"ok": True, "data": missing, "total": len(missing)}

    @app.get("/api/admin/images/schedule")
    async def get_schedule_status(request: Any) -> dict:
        from ..scheduler.crawler_scheduler import CrawlerScheduler
        from ..utils.config import CrawlerConfig, load_config

        config = load_config()
        scheduler = CrawlerScheduler(config)
        return {"ok": True, "data": scheduler.get_status()}

    @app.post("/api/admin/images/refresh")
    async def refresh_crawler(request: Any) -> dict:
        body = await request.json()
        drug_ids = body.get("drug_ids", [])

        from ..crawler.orchestrator import MedicineImageCrawler
        from ..utils.config import CrawlerConfig, load_config

        config = load_config()
        crawler = MedicineImageCrawler(config)

        if drug_ids:
            result = crawler.crawl_all(drug_ids=drug_ids)
        else:
            result = crawler.crawl_all()

        return {"ok": True, "result": result}