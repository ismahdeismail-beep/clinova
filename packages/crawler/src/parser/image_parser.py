from dataclasses import dataclass, field
from typing import Optional


@dataclass
class ImageResult:
    image_url: str
    page_url: str
    title: str = ""
    author: str = ""
    license: str = ""
    license_url: str = ""
    width: int = 0
    height: int = 0
    format: str = ""
    source: str = ""
    thumbnail_url: str = ""
    metadata: dict = field(default_factory=dict)


def parse_wikimedia_result(item: dict) -> ImageResult:
    title = item.get("title", "")
    image_url = ""
    page_url = ""
    author = ""
    license = ""
    license_url = ""

    thumb = item.get("thumb", {})
    image_url = thumb.get("source", "") or thumb.get("url", "")
    width = thumb.get("width", 0)
    height = thumb.get("height", 0)

    page_url = item.get("pageid", "")
    if page_url:
        page_url = f"https://commons.wikimedia.org/wiki/File:{title}"

    author = item.get("author", "") or item.get("user", "")

    if "license" in item:
        license = item["license"]
    if "license_url" in item:
        license_url = item["license_url"]

    ext = ""
    if "." in title:
        ext = title.rsplit(".", 1)[-1].lower()

    return ImageResult(
        image_url=image_url,
        page_url=page_url,
        title=title,
        author=author,
        license=license,
        license_url=license_url,
        width=width,
        height=height,
        format=ext,
        source="wikimedia",
    )


def parse_openi_result(item: dict) -> ImageResult:
    image_url = item.get("url", "") or item.get("image_url", "")
    page_url = item.get("page_url", "") or item.get("document_url", "")
    title = item.get("title", "") or item.get("caption", "")
    author = item.get("author", "") or item.get("creator", "")
    license = item.get("license", "")
    license_url = item.get("license_url", "")
    width = item.get("width", 0)
    height = item.get("height", 0)
    fmt = item.get("format", "") or item.get("content_type", "")

    if fmt and "/" in fmt:
        fmt = fmt.split("/")[-1]

    return ImageResult(
        image_url=image_url,
        page_url=page_url,
        title=title,
        author=author,
        license=license,
        license_url=license_url,
        width=width,
        height=height,
        format=fmt,
        source="openi",
    )


def parse_nih_result(item: dict) -> ImageResult:
    image_url = item.get("url", "") or item.get("image", "")
    page_url = item.get("page_url", "") or item.get("source_url", "")
    title = item.get("title", "") or item.get("alt_text", "")
    author = item.get("creator", "") or item.get("author", "")
    license = item.get("license", "")
    license_url = item.get("license_url", "")
    width = item.get("width", 0)
    height = item.get("height", 0)
    fmt = item.get("format", "")

    return ImageResult(
        image_url=image_url,
        page_url=page_url,
        title=title,
        author=author,
        license=license,
        license_url=license_url,
        width=width,
        height=height,
        format=fmt,
        source="nih",
    )