#!/usr/bin/env python3
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.utils.config import load_config
from src.crawler.orchestrator import MedicineImageCrawler


def main():
    config = load_config()
    crawler = MedicineImageCrawler(config)
    result = crawler.crawl_all()

    print("\n" + "=" * 60)
    print("CRAWL COMPLETE")
    print("=" * 60)
    print(f"Medicines searched: {result['stats']['medicines_searched']}")
    print(f"Images found: {result['stats']['images_found']}")
    print(f"Images accepted: {result['stats']['images_accepted']}")
    print(f"Images rejected: {result['stats']['images_rejected']}")
    print(f"Duplicates removed: {result['stats']['duplicates_removed']}")
    print(f"Failures: {len(result['stats']['failures'])}")
    print(f"Processing time: {result['elapsed_seconds']}s")
    print(f"Coverage: {result['report']['summary']['coverage_percentage']}%")
    print(f"Storage used: {result['report']['summary']['storage_used_mb']} MB")
    print(f"Report: {result['report']['summary']}")


if __name__ == "__main__":
    main()