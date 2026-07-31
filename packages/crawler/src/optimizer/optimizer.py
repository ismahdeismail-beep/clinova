import os
from typing import Optional

from PIL import Image
from loguru import logger


class ImageOptimizer:
    def __init__(
        self,
        max_file_size_kb: int = 200,
        output_dir: str = "storage/medicine-images",
    ) -> None:
        self.max_file_size_kb = max_file_size_kb
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)

    def optimize(
        self,
        input_path: str,
        generic_name: str,
        dosage_form: str,
        strength: str = "",
    ) -> dict[str, Optional[str]]:
        try:
            img = Image.open(input_path)
        except Exception as e:
            logger.warning("Cannot open image for optimization: {}", e)
            return {}

        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        base_name = os.path.splitext(os.path.basename(input_path))[0]
        slug = generic_name.lower().replace(" ", "-")
        form_slug = dosage_form.lower().replace(" ", "-").replace("-", "")
        strength_slug = strength.lower().replace(" ", "-").replace("mg", "").replace(" ", "") if strength else ""

        output_dir = os.path.join(
            self.output_dir,
            slug,
            form_slug,
        )
        os.makedirs(output_dir, exist_ok=True)

        results: dict[str, Optional[str]] = {}

        sizes = {
            "original": None,
            "large": (1600, 1200),
            "medium": (800, 600),
            "thumbnail": (200, 150),
        }

        for size_name, dimensions in sizes.items():
            if dimensions:
                resized = self._resize_keep_aspect(img, dimensions[0], dimensions[1])
            else:
                resized = img.copy()

            filename = f"{base_name}.webp"
            if strength_slug:
                filename = f"{strength_slug}-{base_name}.webp"
            output_path = os.path.join(output_dir, filename)

            quality = 85
            while quality >= 30:
                resized.save(output_path, "WEBP", quality=quality)
                file_size_kb = os.path.getsize(output_path) / 1024
                if file_size_kb <= self.max_file_size_kb:
                    break
                quality -= 10

            if size_name == "thumbnail":
                results["thumbnail_url"] = output_path
            elif size_name == "large":
                results["large_url"] = output_path
            elif size_name == "medium":
                results["medium_url"] = output_path
            else:
                results["original_url"] = output_path

        logger.info("Optimized {} -> {} variants", input_path, list(results.keys()))
        return results

    def _resize_keep_aspect(self, img: Image.Image, max_w: int, max_h: int) -> Image.Image:
        w, h = img.size
        ratio = min(max_w / w, max_h / h)
        if ratio >= 1.0:
            return img.copy()
        new_w = int(w * ratio)
        new_h = int(h * ratio)
        return img.resize((new_w, new_h), Image.LANCZOS)