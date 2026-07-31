from abc import ABC, abstractmethod
from typing import Any

from ..parser.image_parser import ImageResult


class Provider(ABC):
    name: str = "base"

    @abstractmethod
    def search(self, query: str, max_results: int = 20) -> list[dict[str, Any]]:
        ...

    @abstractmethod
    def parse_results(self, raw_results: list[dict[str, Any]]) -> list[ImageResult]:
        ...

    def search_and_parse(self, query: str, max_results: int = 20) -> list[ImageResult]:
        raw = self.search(query, max_results=max_results)
        return self.parse_results(raw)