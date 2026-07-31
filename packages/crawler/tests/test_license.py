from src.license.verifier import LicenseVerifier
from src.parser.image_parser import ImageResult


def test_accept_cc0():
    verifier = LicenseVerifier()
    img = ImageResult(image_url="http://example.com/img.jpg", page_url="", license="CC0")
    decision = verifier.verify(img)
    assert decision.accepted is True


def test_accept_cc_by():
    verifier = LicenseVerifier()
    img = ImageResult(image_url="http://example.com/img.jpg", page_url="", license="CC BY 4.0")
    decision = verifier.verify(img)
    assert decision.accepted is True


def test_accept_cc_by_sa():
    verifier = LicenseVerifier()
    img = ImageResult(image_url="http://example.com/img.jpg", page_url="", license="CC BY-SA")
    decision = verifier.verify(img)
    assert decision.accepted is True


def test_reject_all_rights_reserved():
    verifier = LicenseVerifier()
    img = ImageResult(image_url="http://example.com/img.jpg", page_url="", license="All Rights Reserved")
    decision = verifier.verify(img)
    assert decision.accepted is False


def test_reject_no_license():
    verifier = LicenseVerifier()
    img = ImageResult(image_url="http://example.com/img.jpg", page_url="", license="")
    decision = verifier.verify(img)
    assert decision.accepted is False


def test_reject_unknown():
    verifier = LicenseVerifier()
    img = ImageResult(image_url="http://example.com/img.jpg", page_url="", license="Unknown")
    decision = verifier.verify(img)
    assert decision.accepted is False


def test_batch_verification():
    verifier = LicenseVerifier()
    images = [
        ImageResult(image_url="http://example.com/1.jpg", page_url="", license="CC0"),
        ImageResult(image_url="http://example.com/2.jpg", page_url="", license="All Rights Reserved"),
        ImageResult(image_url="http://example.com/3.jpg", page_url="", license="CC BY"),
    ]
    accepted, rejected = verifier.verify_batch(images)
    assert len(accepted) == 2
    assert len(rejected) == 1