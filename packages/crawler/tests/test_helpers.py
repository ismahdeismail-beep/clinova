from src.utils.helpers import slugify, generate_search_terms, compute_hash, safe_filename


def test_slugify():
    assert slugify("Amoxicillin 500mg") == "amoxicillin-500mg"
    assert slugify("Paracetamol") == "paracetamol"


def test_slugify_special_chars():
    assert slugify("Drug & Tablet") == "drug-tablet"
    assert slugify("  hello  world  ") == "hello-world"


def test_generate_search_terms():
    terms = generate_search_terms(
        generic_name="Metformin",
        dosage_forms=["tablet", "capsule"],
        brand_names=["Glucophage"],
    )
    assert "Metformin" in terms
    assert "Metformin tablet" in terms
    assert "Metformin capsule" in terms
    assert "Metformin packaging" in terms
    assert "generic Metformin" in terms
    assert "Glucophage" in terms
    assert "Glucophage Metformin" in terms


def test_compute_hash():
    h1 = compute_hash("test")
    h2 = compute_hash("test")
    assert h1 == h2
    assert compute_hash("test") != compute_hash("other")


def test_safe_filename():
    result = safe_filename("Amoxicillin 500mg Tablet")
    assert "amoxicillin" in result.lower()
    assert len(result) <= 100