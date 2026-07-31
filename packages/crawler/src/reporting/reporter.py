import json
import os
from datetime import datetime, timezone
from typing import Any

from loguru import logger


class CrawlReporter:
    def __init__(self, output_dir: str = "reports") -> None:
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)

    def generate_report(
        self,
        medicines_searched: int,
        images_found: int,
        images_accepted: int,
        images_rejected: int,
        rejection_reasons: dict[str, int],
        duplicates_removed: int,
        processing_time_seconds: float,
        failures: list[str],
        storage_used_mb: float,
        coverage_percentage: float,
    ) -> dict[str, Any]:
        report = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "summary": {
                "medicines_searched": medicines_searched,
                "images_found": images_found,
                "images_accepted": images_accepted,
                "images_rejected": images_rejected,
                "duplicates_removed": duplicates_removed,
                "processing_time_seconds": round(processing_time_seconds, 2),
                "coverage_percentage": round(coverage_percentage, 2),
                "storage_used_mb": round(storage_used_mb, 2),
            },
            "rejection_reasons": rejection_reasons,
            "failures": failures,
        }

        filename = f"crawl-report-{datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')}.json"
        filepath = os.path.join(self.output_dir, filename)
        with open(filepath, "w") as f:
            json.dump(report, f, indent=2, default=str)

        latest_path = os.path.join(self.output_dir, "crawl-report.json")
        with open(latest_path, "w") as f:
            json.dump(report, f, indent=2, default=str)

        logger.info("Report saved to {}", filepath)
        return report

    def generate_summary_text(self, report: dict[str, Any]) -> str:
        s = report.get("summary", {})
        lines = [
            "=== Clinova Medicine Image Crawler Report ===",
            f"Timestamp: {report.get('timestamp')}",
            f"Medicines Searched: {s.get('medicines_searched', 0)}",
            f"Images Found: {s.get('images_found', 0)}",
            f"Images Accepted: {s.get('images_accepted', 0)}",
            f"Images Rejected: {s.get('images_rejected', 0)}",
            f"Duplicates Removed: {s.get('duplicates_removed', 0)}",
            f"Processing Time: {s.get('processing_time_seconds', 0)}s",
            f"Coverage: {s.get('coverage_percentage', 0)}%",
            f"Storage Used: {s.get('storage_used_mb', 0)} MB",
            "",
            "Rejection Reasons:",
        ]
        for reason, count in report.get("rejection_reasons", {}).items():
            lines.append(f"  - {reason}: {count}")

        failures = report.get("failures", [])
        if failures:
            lines.append("")
            lines.append("Failures:")
            for f in failures:
                lines.append(f"  - {f}")

        return "\n".join(lines)