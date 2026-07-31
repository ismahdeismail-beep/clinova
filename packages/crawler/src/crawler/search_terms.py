from typing import Iterable

from ..utils.helpers import generate_search_terms
from ..utils.config import CrawlerConfig


def build_search_terms_for_drug(
    drug: dict,
    config: CrawlerConfig,
) -> list[str]:
    generic_name = drug.get("generic_name") or drug.get("name") or ""
    if not generic_name:
        return []

    brand_names = drug.get("brand_names") or []
    if isinstance(brand_names, str):
        brand_names = [b.strip() for b in brand_names.split(",") if b.strip()]

    dosage_forms = config.dosage_forms

    terms = generate_search_terms(
        generic_name=generic_name,
        dosage_forms=dosage_forms,
        brand_names=brand_names,
    )

    return terms


def build_all_search_terms(
    drugs: list[dict],
    config: CrawlerConfig,
) -> dict[str, list[str]]:
    mapping: dict[str, list[str]] = {}
    for drug in drugs:
        drug_id = drug.get("id", "")
        terms = build_search_terms_for_drug(drug, config)
        if terms:
            mapping[drug_id] = terms
    return mapping