import os
import time
from typing import Optional

import requests
from loguru import logger
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type


class ImageDownloader:
    def __init__(
        self,
        tmp_dir: str = "tmp/downloads",
        max_retries: int = 3,
        retry_delay: int = 5,
        timeout: int = 30,
        max_concurrent: int = 10,
    ) -> None:
        self.tmp_dir = tmp_dir
        self.max_retries = max_retries
        self.retry_delay = retry_delay
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": "ClinovaCrawler/0.1 (educational project)",
                "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            }
        )
        os.makedirs(tmp_dir, exist_ok=True)

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=30),
        retry=retry_if_exception_type((requests.RequestException, ConnectionError)),
        reraise=True,
    )
    def download(self, url: str, filename: str | None = None) -> Optional[str]:
        if not url or not url.startswith(("http://", "https://")):
            logger.warning("Invalid URL skipped: {}", url)
            return None

        if filename is None:
            filename = url.split("/")[-1].split("?")[0]
            if not filename or "." not in filename:
                filename = f"image_{int(time.time())}.jpg"

        filepath = os.path.join(self.tmp_dir, filename)

        try:
            resp = self.session.get(url, timeout=self.timeout, stream=True)
            resp.raise_for_status()

            content_type = resp.headers.get("Content-Type", "")
            if "text/html" in content_type or "text/plain" in content_type:
                logger.warning("URL returned HTML/text, skipping: {}", url)
                return None

            if "login" in resp.url.lower() or "signin" in resp.url.lower():
                logger.warning("Redirect to login page, skipping: {}", url)
                return None

            total_size = int(resp.headers.get("Content-Length", 0))
            if total_size > 50 * 1024 * 1024:
                logger.warning("File too large ({} bytes), skipping: {}", total_size, url)
                return None

            with open(filepath, "wb") as f:
                for chunk in resp.iter_content(chunk_size=8192):
                    f.write(chunk)

            actual_size = os.path.getsize(filepath)
            if actual_size == 0:
                logger.warning("Downloaded file is empty, removing: {}", url)
                os.remove(filepath)
                return None

            logger.info("Downloaded {} -> {} ({} bytes)", url, filepath, actual_size)
            return filepath

        except requests.Timeout:
            logger.warning("Timeout downloading: {}", url)
        except requests.ConnectionError:
            logger.warning("Connection error downloading: {}", url)
        except requests.HTTPError as e:
            logger.warning("HTTP error {} downloading {}: {}", e.response.status_code if e.response else "N/A", url, e)
        except Exception as e:
            logger.warning("Failed to download {}: {}", url, e)

        return None

    def download_batch(self, urls: list[str]) -> dict[str, Optional[str]]:
        results: dict[str, Optional[str]] = {}
        for url in urls:
            result = self.download(url)
            results[url] = result
        return results