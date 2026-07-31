import argparse
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", ".."))

from ..utils.config import CrawlerConfig, load_config
from ..crawler.orchestrator import MedicineImageCrawler


def main() -> None:
    parser = argparse.ArgumentParser(description="Clinova Medicine Image Crawler")
    parser.add_argument("--all", action="store_true", help="Crawl all medicines")
    parser.add_argument("--drug-id", type=str, help="Crawl a single drug by ID")
    parser.add_argument("--drug-name", type=str, help="Crawl a single drug by name")
    parser.add_argument("--dry-run", action="store_true", help="Search only, no downloads")
    parser.add_argument("--batch-size", type=int, default=50, help="Batch size for incremental crawl")
    parser.add_argument("--reset", action="store_true", help="Reset crawl state")
    parser.add_argument("--stats", action="store_true", help="Show crawl statistics")
    args = parser.parse_args()

    config = load_config()
    crawler = MedicineImageCrawler(config)

    if args.stats:
        from ..metadata.store import get_crawl_statistics
        stats = get_crawl_statistics(config)
        print(json.dumps(stats, indent=2, default=str))
        return

    if args.reset:
        crawler.scheduler.state = {"last_crawl": None, "crawled_drugs": [], "failed_drugs": [], "pending_drugs": [], "run_count": 0}
        crawler.scheduler._save_state()
        print("Crawl state reset")
        return

    if args.dry_run:
        drugs = get_all_drugs(supabase_url=config.supabase_url, supabase_key=config.supabase_key)
        terms = build_all_search_terms(drugs, config)
        for drug_id, t_list in terms.items():
            print(f"{drug_id}: {len(t_list)} search terms")
        return

    if args.drug_id:
        result = crawler.crawl_single(args.drug_id)
        print(json.dumps(result, indent=2, default=str))
        return

    if args.drug_name:
        drugs = get_all_drugs(supabase_url=config.supabase_url, supabase_key=config.supabase_key)
        target = None
        for d in drugs:
            name = d.get("generic_name") or d.get("name") or ""
            if args.drug_name.lower() in name.lower():
                target = d
                break
        if target:
            result = crawler.crawl_medicine(target)
            print(json.dumps(result, indent=2, default=str))
        else:
            print(f"Drug '{args.drug_name}' not found")
        return

    if args.all:
        result = crawler.crawl_all()
        print(json.dumps(result, indent=2, default=str))
        return

    parser.print_help()


if __name__ == "__main__":
    import json
    from ..crawler.search_terms import build_all_search_terms
    from ..crawler.reader import get_all_drugs
    main()