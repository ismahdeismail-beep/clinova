import json
import os
from datetime import datetime, timezone
from typing import Any

from loguru import logger


class CrawlerScheduler:
    def __init__(self, config: "CrawlerConfig") -> None:
        self.config = config
        self.state_file = os.path.join("storage", "crawler_state.json")
        self.state = self._load_state()

    def _load_state(self) -> dict[str, Any]:
        if os.path.exists(self.state_file):
            try:
                with open(self.state_file, "r") as f:
                    return json.load(f)
            except Exception:
                pass
        return {
            "last_crawl": None,
            "crawled_drugs": [],
            "failed_drugs": [],
            "pending_drugs": [],
            "run_count": 0,
        }

    def _save_state(self) -> None:
        os.makedirs(os.path.dirname(self.state_file), exist_ok=True)
        with open(self.state_file, "w") as f:
            json.dump(self.state, f, indent=2, default=str)

    def mark_crawled(self, drug_id: str) -> None:
        if drug_id not in self.state["crawled_drugs"]:
            self.state["crawled_drugs"].append(drug_id)
        if drug_id in self.state["failed_drugs"]:
            self.state["failed_drugs"].remove(drug_id)
        self._save_state()

    def mark_failed(self, drug_id: str) -> None:
        if drug_id not in self.state["failed_drugs"]:
            self.state["failed_drugs"].append(drug_id)
        self._save_state()

    def mark_pending(self, drug_ids: list[str]) -> None:
        for did in drug_ids:
            if did not in self.state["crawled_drugs"] and did not in self.state["pending_drugs"]:
                self.state["pending_drugs"].append(did)
        self._save_state()

    def get_pending(self) -> list[str]:
        return list(self.state["pending_drugs"])

    def get_crawl_batch(self, batch_size: int | None = None) -> list[str]:
        batch_size = batch_size or self.config.crawl_batch_size
        pending = self.get_pending()
        batch = pending[:batch_size]
        return batch

    def reset_pending(self, drug_ids: list[str]) -> None:
        for did in drug_ids:
            if did in self.state["crawled_drugs"]:
                self.state["crawled_drugs"].remove(did)
            if did in self.state["failed_drugs"]:
                self.state["failed_drugs"].remove(did)
            if did not in self.state["pending_drugs"]:
                self.state["pending_drugs"].append(did)
        self._save_state()

    def start_run(self) -> None:
        self.state["last_crawl"] = datetime.now(timezone.utc).isoformat()
        self.state["run_count"] += 1
        self._save_state()

    def finish_run(self) -> None:
        self.state["pending_drugs"] = [
            d for d in self.state["pending_drugs"]
            if d not in self.state["crawled_drugs"]
        ]
        self._save_state()

    def get_status(self) -> dict[str, Any]:
        return {
            "last_crawl": self.state.get("last_crawl"),
            "run_count": self.state.get("run_count", 0),
            "crawled_count": len(self.state["crawled_drugs"]),
            "failed_count": len(self.state["failed_drugs"]),
            "pending_count": len(self.state["pending_drugs"]),
        }