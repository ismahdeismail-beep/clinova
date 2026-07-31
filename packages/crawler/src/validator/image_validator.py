import os
from typing import Optional

import cv2
import numpy as np
from loguru import logger


class ImageValidator:
    def __init__(
        self,
        min_width: int = 400,
        min_height: int = 400,
        max_aspect_ratio: float = 10.0,
    ) -> None:
        self.min_width = min_width
        self.min_height = min_height
        self.max_aspect_ratio = max_aspect_ratio

    def validate(self, filepath: str) -> tuple[bool, str]:
        if not os.path.exists(filepath):
            return False, "File does not exist"

        file_size = os.path.getsize(filepath)
        if file_size < 1024:
            return False, "File too small (likely corrupted)"

        try:
            img = cv2.imread(filepath)
            if img is None:
                return False, "Cannot decode image (corrupted)"
        except Exception as e:
            return False, f"Failed to read image: {e}"

        height, width = img.shape[:2]

        if width < self.min_width:
            return False, f"Width {width}px below minimum {self.min_width}px"
        if height < self.min_height:
            return False, f"Height {height}px below minimum {self.min_height}px"

        aspect_ratio = max(width, height) / min(width, height)
        if aspect_ratio > self.max_aspect_ratio:
            return False, f"Aspect ratio {aspect_ratio:.1f} too extreme (likely icon/logo)"

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur_score = cv2.Laplacian(gray, cv2.CV_64F).var()
        if blur_score < 50:
            return False, f"Image too blurry (Laplacian variance: {blur_score:.1f})"

        non_zero_ratio = np.count_nonzero(gray) / gray.size
        if non_zero_ratio < 0.05:
            return False, "Image is mostly empty/blank"

        text_ratio = self._estimate_text_ratio(gray)
        if text_ratio > 0.7:
            return False, "Image is mostly text, not a photograph"

        unique_colors = len(np.unique(gray))
        if unique_colors < 10:
            return False, "Image has too few colors (likely logo/icon)"

        return True, "Valid"

    def _estimate_text_ratio(self, gray: np.ndarray) -> float:
        edges = cv2.Canny(gray, 50, 150)
        edge_ratio = np.count_nonzero(edges) / edges.size
        return edge_ratio

    def validate_batch(self, filepaths: list[str]) -> dict[str, tuple[bool, str]]:
        results: dict[str, tuple[bool, str]] = {}
        for fp in filepaths:
            valid, reason = self.validate(fp)
            results[fp] = (valid, reason)
            if not valid:
                logger.info("Rejected {}: {}", os.path.basename(fp), reason)
        return results