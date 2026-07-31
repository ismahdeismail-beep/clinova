import os
from typing import Optional

import imagehash
from loguru import logger


class DuplicateDetector:
    def __init__(self, hash_type: str = "phash") -> None:
        self.hash_type = hash_type
        self.seen_hashes: dict[str, str] = {}

    def _compute_hash(self, filepath: str) -> Optional[str]:
        try:
            if self.hash_type == "phash":
                h = imagehash.phash(filepath)
            elif self.hash_type == "dhash":
                h = imagehash.dhash(filepath)
            elif self.hash_type == "whash":
                h = imagehash.whash(filepath)
            else:
                h = imagehash.phash(filepath)
            return str(h)
        except Exception as e:
            logger.warning("Failed to compute hash for {}: {}", filepath, e)
            return None

    def is_duplicate(self, filepath: str) -> tuple[bool, Optional[str]]:
        h = self._compute_hash(filepath)
        if h is None:
            return False, None

        for existing_path, existing_hash in self.seen_hashes.items():
            if h == existing_hash:
                return True, existing_path

        self.seen_hashes[filepath] = h
        return False, None

    def is_duplicate_similar(self, filepath: str, threshold: int = 5) -> tuple[bool, Optional[str]]:
        h = self._compute_hash(filepath)
        if h is None:
            return False, None

        for existing_path, existing_hash_str in self.seen_hashes.items():
            try:
                existing_hash = imagehash.hex_to_hash(existing_hash_str)
                new_hash = imagehash.hex_to_hash(h)
                diff = existing_hash - new_hash
                if diff <= threshold:
                    return True, existing_path
            except Exception:
                continue

        self.seen_hashes[filepath] = h
        return False, None

    def add_known_hash(self, filepath: str, hash_value: str) -> None:
        self.seen_hashes[filepath] = hash_value

    def get_hash(self, filepath: str) -> Optional[str]:
        return self._compute_hash(filepath)