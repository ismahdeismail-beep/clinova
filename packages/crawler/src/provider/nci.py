import time
from typing import Any

import requests
from loguru import logger

from ..parser.image_parser import ImageResult, parse_nih_result
from .base import Provider


class NciProvider(Provider):
    name = "nci"

    def __init__(self, rate_limit_delay: float = 1.0) -> None:
        self.rate_limit_delay = rate_limit_delay
        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": "ClinovaCrawler/0.1 (educational project)",
            }
        )

    def search(self, query: str, max_results: int = 20) -> list[dict[str, Any]]:
        results: list[dict[str, Any]] = []
        try:
            url = "https://api.cancer.gov/api/v1/images"
            params = {
                "q": query,
                "page[size]": str(max_results),
            }
            resp = self.session.get(url, params=params, timeout=30)
            resp.raise_for_status()
            data = resp.json()
            items = data.get("data", data.get("hits", []))
            for item in items[:max_results]:
                results.append(
                    {
                        "url": item.get("url", item.get("image_url", "")),
                        "title": item.get("title", item.get("name", "")),
                        "author": item.get("author", ""),
                        "license": item.get("license", ""),
                        "license_url": item.get("license_url", ""),
                        "width": item.get("width", 0),
                        "height": item.get("height", 0),
                        "format": item.get("format", ""),
                    }
                )
            time.sleep(self.rate_limit_delay)
        except Exception as e:
            logger.warning("NCI search failed for '{}': {}", query, e)

        return results

    def parse_results(self, raw_results: list[dict[str, Any]]) -> list[ImageResult]:
        images: list[ImageResult] = []
        for item in raw_results:
            try:
                parsed = parse_nih_result(item)
                parsed.source = "nci"
                if parsed.image_url:
                    images.append(parsed)
            except Exception as e:
                logger.debug("Failed to parse NCI result: {}", e)
        return images