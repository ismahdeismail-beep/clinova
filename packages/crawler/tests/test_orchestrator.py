import pytest
from src.crawler.orchestrator import MedicineImageCrawler
from src.utils.config import CrawlerConfig


def test_crawler_init():
    config = CrawlerConfig()
    crawler = MedicineImageCrawler(config)
    assert crawler.config is not None
    assert crawler.license_verifier is not None
    assert crawler.downloader is not None
    assert crawler.validator is not None
    assert crawler.duplicate_detector is not None
    assert crawler.optimizer is not None


def test_crawler_stats_initial():
    config = CrawlerConfig()
    crawler = MedicineImageCrawler(config)
    assert crawler._stats["medicines_searched"] == 0
    assert crawler._stats["images_found"] == 0
    assert crawler._stats["images_accepted"] == 0
    assert crawler._stats["images_rejected"] == 0