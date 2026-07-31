#!/usr/bin/env python3
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.utils.config import load_config
from src.crawler.orchestrator import MedicineImageCrawler


def main():
    config = load_config()
    crawler = MedicineImageCrawler(config)
    pending = crawler.scheduler.get_pending()

    if not pending:
        print("No pending drugs to crawl")
        return

    print(f"Crawling {len(pending)} pending medicines...")
    result = crawler.crawl_all(drug_ids=pending[:config.crawl_batch_size])

    print(f"\nDone. Uploaded {result['stats']['images_accepted']} images.")


if __name__ == "__main__":
    main()