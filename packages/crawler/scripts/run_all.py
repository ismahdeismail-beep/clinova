#!/usr/bin/env python3
"""Run the full medicine image crawl."""
import sys
sys.path.insert(0, '.')
from src.utils.config import load_config
from src.crawler.orchestrator import MedicineImageCrawler

if __name__ == '__main__':
    config = load_config()
    crawler = MedicineImageCrawler(config)
    result = crawler.crawl_all()
    print(f"\nCrawl complete: {result['stats']['images_accepted']} images accepted")
