import json
import os
from datetime import datetime, timezone
from typing import Any, Optional

from loguru import logger


def get_db_connection(config: "CrawlerConfig"):
    try:
        import psycopg2
        conn = psycopg2.connect(config.database_url)
        return conn
    except Exception:
        return None


def ensure_drug_images_table(config: "CrawlerConfig") -> None:
    conn = get_db_connection(config)
    if conn is None:
        logger.warning("No database connection; cannot create drug_images table")
        return

    try:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS drug_images (
                    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                    drug_id TEXT,
                    generic_name TEXT,
                    dosage_form TEXT,
                    strength TEXT,
                    image_url TEXT,
                    thumbnail_url TEXT,
                    large_url TEXT,
                    medium_url TEXT,
                    source TEXT,
                    license TEXT,
                    author TEXT,
                    page_url TEXT,
                    hash TEXT,
                    verified BOOLEAN DEFAULT false,
                    quality_score REAL DEFAULT 0.0,
                    rejection_reason TEXT,
                    created_at TIMESTAMPTZ DEFAULT now(),
                    updated_at TIMESTAMPTZ DEFAULT now()
                )
            """)
            cur.execute("""
                CREATE INDEX IF NOT EXISTS idx_drug_images_drug_id
                ON drug_images(drug_id)
            """)
            cur.execute("""
                CREATE INDEX IF NOT EXISTS idx_drug_images_generic_name
                ON drug_images(generic_name)
            """)
            cur.execute("""
                CREATE INDEX IF NOT EXISTS idx_drug_images_dosage_form
                ON drug_images(dosage_form)
            """)
            cur.execute("""
                CREATE INDEX IF NOT EXISTS idx_drug_images_source
                ON drug_images(source)
            """)
            cur.execute("""
                CREATE INDEX IF NOT EXISTS idx_drug_images_hash
                ON drug_images(hash)
            """)
            conn.commit()
            logger.info("Ensured drug_images table exists")
    except Exception as e:
        logger.error("Failed to create drug_images table: {}", e)
        conn.rollback()
    finally:
        conn.close()


def save_image_metadata(
    config: "CrawlerConfig",
    drug_id: str,
    generic_name: str,
    dosage_form: str,
    strength: str,
    image_url: str,
    thumbnail_url: str,
    source: str,
    license_type: str,
    author: str,
    page_url: str,
    hash_value: str,
    quality_score: float = 0.0,
    verified: bool = False,
    rejection_reason: str = "",
) -> bool:
    conn = get_db_connection(config)
    if conn is None:
        logger.warning("No database connection; cannot save metadata")
        return False

    try:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO drug_images
                    (drug_id, generic_name, dosage_form, strength,
                     image_url, thumbnail_url, source, license,
                     author, page_url, hash, verified, quality_score, rejection_reason)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (hash) DO UPDATE SET
                    image_url = EXCLUDED.image_url,
                    thumbnail_url = EXCLUDED.thumbnail_url,
                    quality_score = EXCLUDED.quality_score,
                    verified = EXCLUDED.verified,
                    updated_at = now()
            """, (
                drug_id, generic_name, dosage_form, strength,
                image_url, thumbnail_url, source, license_type,
                author, page_url, hash_value, verified, quality_score, rejection_reason,
            ))
            conn.commit()
            return True
    except Exception as e:
        logger.error("Failed to save image metadata: {}", e)
        conn.rollback()
        return False
    finally:
        conn.close()


def get_images_for_drug(config: "CrawlerConfig", drug_id: str) -> list[dict[str, Any]]:
    conn = get_db_connection(config)
    if conn is None:
        return []

    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM drug_images WHERE drug_id = %s ORDER BY created_at DESC",
                (drug_id,),
            )
            columns = [desc[0] for desc in cur.description]
            rows = cur.fetchall()
            return [dict(zip(columns, row)) for row in rows]
    except Exception as e:
        logger.error("Failed to fetch images for drug {}: {}", drug_id, e)
        return []
    finally:
        conn.close()


def get_missing_drugs(config: "CrawlerConfig") -> list[str]:
    conn = get_db_connection(config)
    if conn is None:
        return []

    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT DISTINCT drug_id FROM drug_images
                WHERE verified = true AND rejection_reason = ''
            """)
            rows = cur.fetchall()
            return [row[0] for row in rows]
    except Exception:
        return []
    finally:
        conn.close()


def get_crawl_statistics(config: "CrawlerConfig") -> dict[str, Any]:
    conn = get_db_connection(config)
    if conn is None:
        return {}

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT COUNT(*) FROM drug_images")
            total = cur.fetchone()[0]

            cur.execute("SELECT COUNT(*) FROM drug_images WHERE verified = true")
            verified = cur.fetchone()[0]

            cur.execute("SELECT COUNT(*) FROM drug_images WHERE rejection_reason != ''")
            rejected = cur.fetchone()[0]

            cur.execute("SELECT COUNT(DISTINCT drug_id) FROM drug_images")
            unique_drugs = cur.fetchone()[0]

            cur.execute("SELECT source, COUNT(*) FROM drug_images GROUP BY source")
            by_source = {row[0]: row[1] for row in cur.fetchall()}

            return {
                "total_images": total,
                "verified_images": verified,
                "rejected_images": rejected,
                "unique_drugs": unique_drugs,
                "by_source": by_source,
            }
    except Exception:
        return {}
    finally:
        conn.close()