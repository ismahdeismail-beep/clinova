import time
from typing import Any

import requests
from loguru import logger

from ..parser.image_parser import ImageResult, parse_wikimedia_result
from .base import Provider


class WikimediaProvider(Provider):
    name = "wikimedia"

    def __init__(self, rate_limit_delay: float = 1.0) -> None:
        self.rate_limit_delay = rate_limit_delay
        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": "ClinovaCrawler/0.1 (educational project; contact@example.com)",
            }
        )

    def search(self, query: str, max_results: int = 20) -> list[dict[str, Any]]:
        results: list[dict[str, Any]] = []
        try:
            url = "https://commons.wikimedia.org/w/api.php"
            params = {
                "action": "query",
                "list": "search",
                "srsearch": f"{query} filetype:photo",
                "format": "json",
                "srlimit": str(max_results),
            }
            resp = self.session.get(url, params=params, timeout=30)
            resp.raise_for_status()
            data = resp.json()
            search_ids = data.get("query", {}).get("search", [])

            for entry in search_ids[:max_results]:
                title = entry.get("title", "")
                results.append({"title": title, "pageid": entry.get("pageid", "")})

            time.sleep(self.rate_limit_delay)
        except Exception as e:
            logger.warning("Wikimedia search failed for '{}': {}", query, e)

        return results

    def parse_results(self, raw_results: list[dict[str, Any]]) -> list[ImageResult]:
        images: list[ImageResult] = []
        for item in raw_results:
            try:
                parsed = parse_wikimedia_result(item)
                if parsed.image_url:
                    images.append(parsed)
            except Exception as e:
                logger.debug("Failed to parse Wikimedia result: {}", e)
        return images