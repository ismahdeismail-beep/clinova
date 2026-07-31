from dataclasses import dataclass, field
from typing import Optional

from loguru import logger


@dataclass
class LicenseDecision:
    accepted: bool
    reason: str = ""
    license_type: str = ""


class LicenseVerifier:
    def __init__(self, accepted_licenses: list[str] | None = None) -> None:
        self.accepted_licenses = accepted_licenses or [
            "public domain",
            "cc0",
            "cc by",
            "cc by-sa",
            "cc-by",
            "cc-by-sa",
        ]

    def verify(self, image_result: "ImageResult") -> LicenseDecision:
        from ..parser.image_parser import ImageResult

        license_text = (image_result.license or "").lower().strip()
        license_url = (image_result.license_url or "").lower().strip()

        if not license_text and not license_url:
            return LicenseDecision(
                accepted=False,
                reason="No license information available",
                license_type="unknown",
            )

        combined = f"{license_text} {license_url}"

        if any(term in combined for term in ["public domain", "cc0", "cc-by-sa", "cc by-sa", "cc-by", "cc by"]):
            if "cc0" in combined or "public domain" in combined:
                return LicenseDecision(accepted=True, reason="Public domain / CC0", license_type="cc0")
            if "cc-by-sa" in combined or "cc by-sa" in combined:
                return LicenseDecision(accepted=True, reason="CC BY-SA compatible", license_type="cc-by-sa")
            if "cc-by" in combined or "cc by" in combined:
                return LicenseDecision(accepted=True, reason="CC BY compatible", license_type="cc-by")

        if any(term in combined for term in ["all rights reserved", "copyright reserved", "no license", "watermarked", "stock photo", "stock photograph"]):
            return LicenseDecision(
                accepted=False,
                reason=f"License prohibits redistribution: {license_text}",
                license_type="rejected",
            )

        if "unknown" in combined or "unlicensed" in combined:
            return LicenseDecision(
                accepted=False,
                reason="Unknown or unlicensed",
                license_type="unknown",
            )

        if not license_text:
            return LicenseDecision(
                accepted=False,
                reason="No license specified",
                license_type="unknown",
            )

        logger.warning("Unrecognized license for image: '{}'", license_text)
        return LicenseDecision(
            accepted=False,
            reason=f"Unrecognized or incompatible license: {license_text}",
            license_type="unknown",
        )

    def verify_batch(self, results: list["ImageResult"]) -> tuple[list["ImageResult"], list["ImageResult"]]:
        accepted: list[ImageResult] = []
        rejected: list[ImageResult] = []
        for img in results:
            decision = self.verify(img)
            if decision.accepted:
                accepted.append(img)
            else:
                img.metadata["rejection_reason"] = decision.reason
                rejected.append(img)
        return accepted, rejected