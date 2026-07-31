import hashlib
import re
import unicodedata
from typing import Iterable


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")


def generate_search_terms(
    generic_name: str,
    dosage_forms: Iterable[str],
    brand_names: Iterable[str] | None = None,
) -> list[str]:
    terms: list[str] = []
    generic_lower = generic_name.lower().strip()
    terms.append(generic_name.strip())
    terms.append(f"{generic_name} medicine")
    for form in dosage_forms:
        terms.append(f"{generic_name} {form}")
    terms.append(f"{generic_name} packaging")
    terms.append(f"generic {generic_name}")
    for form in dosage_forms:
        terms.append(f"generic {generic_name} {form}")
    if brand_names:
        for brand in brand_names:
            brand_clean = brand.strip()
            terms.append(brand_clean)
            terms.append(f"{brand_clean} {generic_name}")
            for form in dosage_forms:
                terms.append(f"{brand_clean} {form}")
    return list(dict.fromkeys(terms))


def compute_hash(data: str, algorithm: str = "sha256") -> str:
    return hashlib.new(algorithm, data.encode("utf-8")).hexdigest()


def safe_filename(text: str, max_length: int = 100) -> str:
    slug = slugify(text)
    if len(slug) > max_length:
        slug = slug[:max_length]
    return slug or "unknown"