from dataclasses import dataclass, field
from typing import Optional


@dataclass
class CrawlerConfig:
    supabase_url: str = ""
    supabase_key: str = ""
    database_url: str = ""
    cloudinary_cloud_name: str = ""
    cloudinary_api_key: str = ""
    cloudinary_api_secret: str = ""
    max_concurrent_downloads: int = 10
    retry_attempts: int = 3
    retry_delay_seconds: int = 5
    image_min_width: int = 400
    image_min_height: int = 400
    target_thumbnail_size: int = 200
    target_large_size: int = 800
    target_medium_size: int = 400
    max_file_size_kb: int = 200
    storage_provider: str = "supabase"
    providers: list[str] = field(default_factory=lambda: [
        "wikimedia",
        "openi",
        "nih",
        "nci",
    ])
    dosage_forms: list[str] = field(default_factory=lambda: [
        "tablet",
        "capsule",
        "injection",
        "iv bag",
        "syrup",
        "suspension",
        "cream",
        "ointment",
        "gel",
        "eye drops",
        "ear drops",
        "nasal spray",
        "inhaler",
        "suppository",
        "implant",
        "patch",
    ])
    accepted_licenses: list[str] = field(default_factory=lambda: [
        "public domain",
        "cc0",
        "cc by",
        "cc by-sa",
        "cc-by",
        "cc-by-sa",
    ])
    rejected_licenses: list[str] = field(default_factory=lambda: [
        "all rights reserved",
        "copyright reserved",
        "no license",
        "unknown",
        "watermarked",
        "stock photo",
    ])
    tmp_download_dir: str = "tmp/downloads"
    storage_base_dir: str = "storage/medicine-images"
    report_output_dir: str = "reports"
    crawl_batch_size: int = 50
    incremental_only: bool = True


def load_config() -> CrawlerConfig:
    import os

    return CrawlerConfig(
        supabase_url=os.environ.get("SUPABASE_URL", ""),
        supabase_key=os.environ.get("SUPABASE_SERVICE_KEY", ""),
        database_url=os.environ.get("DATABASE_URL", ""),
        cloudinary_cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME", ""),
        cloudinary_api_key=os.environ.get("CLOUDINARY_API_KEY", ""),
        cloudinary_api_secret=os.environ.get("CLOUDINARY_API_SECRET", ""),
        max_concurrent_downloads=int(os.environ.get("MAX_CONCURRENT_DOWNLOADS", "10")),
        retry_attempts=int(os.environ.get("RETRY_ATTEMPTS", "3")),
        retry_delay_seconds=int(os.environ.get("RETRY_DELAY_SECONDS", "5")),
        image_min_width=int(os.environ.get("IMAGE_MIN_WIDTH", "400")),
        image_min_height=int(os.environ.get("IMAGE_MIN_HEIGHT", "400")),
        storage_provider=os.environ.get("STORAGE_PROVIDER", "supabase"),
        providers=os.environ.get("PROVIDERS", "wikimedia,openi,nih,nci").split(","),
        incremental_only=os.environ.get("INCREMENTAL_ONLY", "true").lower() == "true",
    )