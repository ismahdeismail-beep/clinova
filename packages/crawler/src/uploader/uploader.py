import os
from typing import Optional

from loguru import logger


class SupabaseUploader:
    def __init__(
        self,
        supabase_url: str,
        supabase_key: str,
        bucket_name: str = "medicine-images",
    ) -> None:
        self.supabase_url = supabase_url
        self.supabase_key = supabase_key
        self.bucket_name = bucket_name
        self._client = None

    @property
    def client(self):
        if self._client is None:
            try:
                from supabase import create_client
                self._client = create_client(self.supabase_url, self.supabase_key)
            except Exception as e:
                logger.error("Failed to create Supabase client: {}", e)
        return self._client

    def upload(self, local_path: str, remote_path: str) -> Optional[str]:
        try:
            client = self.client
            if client is None:
                logger.warning("Supabase client unavailable, skipping upload")
                return None

            with open(local_path, "rb") as f:
                file_data = f.read()

            file_name = os.path.basename(local_path)
            remote_full = f"{remote_path}/{file_name}"

            try:
                client.storage.from_(self.bucket_name).upload(
                    path=remote_full,
                    file=file_data,
                    file_options={"content-type": "image/webp"},
                )
            except Exception:
                client.storage.from_(self.bucket_name).upload(
                    path=remote_full,
                    file=file_data,
                )

            public_url = client.storage.from_(self.bucket_name).get_public_url(remote_full)
            logger.info("Uploaded {} -> {}", local_path, public_url)
            return public_url

        except Exception as e:
            logger.warning("Supabase upload failed for {}: {}", local_path, e)
            return None

    def upload_batch(self, file_paths: list[str], base_remote: str = "medicine-images") -> dict[str, Optional[str]]:
        results: dict[str, Optional[str]] = {}
        for fp in file_paths:
            remote = os.path.relpath(fp, base_remote)
            url = self.upload(fp, os.path.dirname(remote))
            results[fp] = url
        return results


class CloudinaryUploader:
    def __init__(self, cloud_name: str, api_key: str, api_secret: str) -> None:
        self.cloud_name = cloud_name
        self.api_key = api_key
        self.api_secret = api_secret
        self._client = None

    @property
    def client(self):
        if self._client is None:
            try:
                import cloudinary
                import cloudinary.uploader
                cloudinary.config(
                    cloud_name=self.cloud_name,
                    api_key=self.api_key,
                    api_secret=self.api_secret,
                )
                self._client = cloudinary
            except Exception as e:
                logger.error("Failed to configure Cloudinary: {}", e)
        return self._client

    def upload(self, local_path: str, folder: str = "medicine-images") -> Optional[str]:
        try:
            client = self.client
            if client is None:
                return None

            result = client.uploader.upload(
                local_path,
                folder=folder,
                resource_type="image",
                transformation=[{"fetch_format": "webp", "quality": "auto"}],
            )
            url = result.get("secure_url", "")
            logger.info("Uploaded {} -> {}", local_path, url)
            return url

        except Exception as e:
            logger.warning("Cloudinary upload failed for {}: {}", local_path, e)
            return None

    def upload_batch(self, file_paths: list[str], folder: str = "medicine-images") -> dict[str, Optional[str]]:
        results: dict[str, Optional[str]] = {}
        for fp in file_paths:
            url = self.upload(fp, folder)
            results[fp] = url
        return results


def get_uploader(config: "CrawlerConfig") -> object:
    from ..utils.config import CrawlerConfig

    if config.storage_provider == "cloudinary":
        return CloudinaryUploader(
            cloud_name=config.cloudinary_cloud_name,
            api_key=config.cloudinary_api_key,
            api_secret=config.cloudinary_api_secret,
        )
    return SupabaseUploader(
        supabase_url=config.supabase_url,
        supabase_key=config.supabase_key,
    )