import json
import os
from typing import Any, Optional

from loguru import logger


def load_bundled_drugs(filepath: str | None = None) -> list[dict[str, Any]]:
    if filepath is None:
        candidates = [
            os.path.join(os.path.dirname(__file__), "..", "..", "..", "src", "data", "drugIndexData.ts"),
            os.path.join(os.path.dirname(__file__), "..", "..", "..", "src", "data", "drugRegistryNames.ts"),
        ]
        for c in candidates:
            if os.path.exists(c):
                filepath = c
                break
    if filepath is None or not os.path.exists(filepath):
        logger.warning("No bundled drug data file found at {}", filepath)
        return []

    drugs: list[dict[str, Any]] = []
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    import re

    name_matches = re.findall(r'name:\s*"([^"]+)"', content)
    generic_matches = re.findall(r'generic_name:\s*"([^"]+)"', content)
    id_matches = re.findall(r"id:\s*'([^']+)'", content)
    drug_class_matches = re.findall(r'drug_class:\s*"([^"]+)"', content)

    seen = set()
    for i in range(len(name_matches)):
        name = name_matches[i] if i < len(name_matches) else ""
        generic = generic_matches[i] if i < len(generic_matches) else name
        drug_id = id_matches[i] if i < len(id_matches) else ""
        drug_class = drug_class_matches[i] if i < len(drug_class_matches) else ""
        key = (name, generic)
        if key in seen or not name:
            continue
        seen.add(key)
        drugs.append(
            {
                "id": drug_id or f"bundled-{i}",
                "name": name,
                "generic_name": generic,
                "drug_class": drug_class,
            }
        )

    logger.info("Loaded {} bundled drugs from {}", len(drugs), filepath)
    return drugs


def fetch_drugs_from_supabase(
    supabase_url: str,
    supabase_key: str,
) -> list[dict[str, Any]]:
    try:
        from supabase import create_client

        supabase = create_client(supabase_url, supabase_key)
        response = supabase.table("drug_monographs").select("id, name, generic_name, drug_class").order("name").execute()
        drugs = response.data if response.data else []
        logger.info("Fetched {} drugs from Supabase drug_monographs", len(drugs))
        return drugs
    except Exception as e:
        logger.warning("Failed to fetch drugs from Supabase: {}", e)
        return []


def fetch_drugs_from_kdi_table(
    supabase_url: str,
    supabase_key: str,
) -> list[dict[str, Any]]:
    try:
        from supabase import create_client

        supabase = create_client(supabase_url, supabase_key)
        response = supabase.table("kenya_drug_index").select("id, drug_name, generic_name, classification, brand_names, dosage_forms").order("generic_name").execute()
        drugs = response.data if response.data else []
        logger.info("Fetched {} drugs from KDI table", len(drugs))
        return drugs
    except Exception as e:
        logger.warning("Failed to fetch drugs from KDI table: {}", e)
        return []


def get_all_drugs(
    supabase_url: str = "",
    supabase_key: str = "",
    use_bundled_fallback: bool = True,
) -> list[dict[str, Any]]:
    drugs: list[dict[str, Any]] = []

    if supabase_url and supabase_key:
        kdi_drugs = fetch_drugs_from_kdi_table(supabase_url, supabase_key)
        if kdi_drugs:
            drugs.extend(kdi_drugs)

        monograph_drugs = fetch_drugs_from_supabase(supabase_url, supabase_key)
        if monograph_drugs:
            existing_ids = {d.get("id") for d in drugs}
            for d in monograph_drugs:
                if d.get("id") not in existing_ids:
                    drugs.append(d)

    if not drugs and use_bundled_fallback:
        bundled = load_bundled_drugs()
        if bundled:
            drugs.extend(bundled)

    logger.info("Total drugs available for crawling: {}", len(drugs))
    return drugs