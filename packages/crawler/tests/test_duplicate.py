from src.duplicate.detector import DuplicateDetector


def test_duplicate_detector_add_and_check():
    detector = DuplicateDetector()
    detector.add_known_hash("/tmp/test1.jpg", "abc123")
    is_dup, existing = detector.is_duplicate("/tmp/test2.jpg")
    assert is_dup is False


def test_duplicate_detector_finds_duplicate():
    detector = DuplicateDetector()
    detector.add_known_hash("/tmp/test1.jpg", "abc123")
    is_dup, existing = detector.is_duplicate_similar("/tmp/test1.jpg", threshold=0)
    assert is_dup is True
    assert existing == "/tmp/test1.jpg"


def test_duplicate_detector_get_hash():
    detector = DuplicateDetector()
    h = detector.get_hash("/tmp/nonexistent.jpg")
    assert h is None