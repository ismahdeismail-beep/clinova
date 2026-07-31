import pytest
from src.crawler.reader import load_bundled_drugs, build_all_search_terms
from src.utils.config import CrawlerConfig


def test_load_bundled_drugs_returns_list():
    drugs = load_bundled_drugs()
    assert isinstance(drugs, list)


def test_load_bundled_drugs_has_generic_name():
    drugs = load_bundled_drugs()
    if drugs:
        assert any(d.get("generic_name") for d in drugs)


def test_build_all_search_terms():
    config = CrawlerConfig()
    drugs = [
        {"id": "test-1", "generic_name": "Metformin", "brand_names": ["Glucophage"]},
    ]
    result = build_all_search_terms(drugs, config)
    assert "test-1" in result
    terms = result["test-1"]
    assert any("metformin" in t.lower() for t in terms)
    assert any("tablet" in t.lower() for t in terms)


def test_build_all_search_terms_empty():
    config = CrawlerConfig()
    result = build_all_search_terms([], config)
    assert result == {}