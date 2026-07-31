import time
from typing import Any

import requests
from loguru import logger

from ..parser.image_parser import ImageResult, parse_openi_result
from .base import Provider


class OpeniProvider(Provider):
    name = "openi"

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
            url = "https://openi.nlm.nih.gov/api/v1/search"
            params = {
                "query": query,
                "page_size": str(max_results),
                "format": "json",
            }
            resp = self.session.get(url, params=params, timeout=30)
            resp.raise_for_status()
            data = resp.json()
            hits = data.get("hits", [])
            for hit in hits[:max_results]:
                results.append(
                    {
                        "url": hit.get("url", ""),
                        "title": hit.get("title", ""),
                        "author": hit.get("creator", ""),
                        "license": hit.get("license", ""),
                        "license_url": hit.get("license_url", ""),
                        "width": hit.get("width", 0),
                        "height": hit.get("height", 0),
                        "format": hit.get("format", ""),
                    }
                )
            time.sleep(self.rate_limit_delay)
        except Exception as e:
            logger.warning("Openi search failed for '{}': {}", query, e)

        return results

    def parse_results(self, raw_results: list[dict[str, Any]]) -> list[ImageResult]:
        images: list[ImageResult] = []
        for item in raw_results:
            try:
                parsed = parse_openi_result(item)
                if parsed.image_url:
                    images.append(parsed)
            except Exception as e:
                logger.debug("Failed to parse Openi result: {}", e)
        return images