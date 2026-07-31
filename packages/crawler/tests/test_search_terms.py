from src.crawler.search_terms import build_search_terms_for_drug, build_all_search_terms
from src.utils.config import CrawlerConfig


def test_build_search_terms_for_drug():
    config = CrawlerConfig()
    drug = {
        "id": "test-1",
        "generic_name": "Amoxicillin",
        "brand_names": ["Amoxil", "Trimox"],
    }
    terms = build_search_terms_for_drug(drug, config)
    assert len(terms) > 0
    assert "Amoxicillin" in terms
    assert "Amoxicillin tablet" in terms
    assert "Amoxicillin capsule" in terms
    assert "Amoxicillin injection" in terms
    assert "Amoxicillin syrup" in terms
    assert "Amoxicillin cream" in terms
    assert "Amoxicillin gel" in terms
    assert "Amoxicillin inhaler" in terms
    assert "Amoxicillin eye drops" in terms
    assert "Amoxicillin packaging" in terms
    assert "generic Amoxicillin" in terms
    assert "Amoxil" in terms
    assert "Amoxil Amoxicillin" in terms


def test_build_all_search_terms():
    config = CrawlerConfig()
    drugs = [
        {"id": "d1", "generic_name": "Paracetamol", "brand_names": ["Panadol"]},
        {"id": "d2", "generic_name": "Ibuprofen"},
    ]
    result = build_all_search_terms(drugs, config)
    assert "d1" in result
    assert "d2" in result
    assert len(result["d1"]) > 0
    assert len(result["d2"]) > 0