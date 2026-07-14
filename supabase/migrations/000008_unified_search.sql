-- ================================================================
-- Clinova Unified Ranked Search (Phase 8)
-- Version: 1.6.0
-- A single RPC that searches drug monographs, diseases and
-- published clinical cases in one round-trip, ranked by trigram
-- similarity. Backed by the pg_trgm GIN indexes from migration
-- 000006, so it stays fast as the knowledge base grows.
--
-- Replaces the previous client-side pattern of firing 3 separate
-- ILIKE '%q%' queries and merging in JS.
-- ================================================================

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Lower the trigram match floor a little so short clinical terms
-- (e.g. "UTI", "MI") still match. Session-scoped; safe default.
-- NOTE: set per-call via SET LOCAL inside the function instead of
-- globally to avoid affecting other queries.

CREATE OR REPLACE FUNCTION unified_search(
  search_query TEXT,
  match_count  INT DEFAULT 10
)
RETURNS TABLE (
  result_type TEXT,
  id          TEXT,
  title       TEXT,
  subtitle    TEXT,
  relevance   FLOAT
)
LANGUAGE sql
STABLE
AS $$
  WITH q AS (SELECT lower(trim(search_query)) AS term)
  (
    -- Drug monographs
    SELECT
      'drug'::TEXT AS result_type,
      d.id::TEXT AS id,
      d.name AS title,
      COALESCE(dc.name, '') AS subtitle,
      GREATEST(
        similarity(lower(d.name), (SELECT term FROM q)),
        similarity(lower(COALESCE(d.generic_name, '')), (SELECT term FROM q))
      )::FLOAT AS relevance
    FROM drug_monographs d
    LEFT JOIN drug_classes dc ON dc.id = d.drug_class_id
    WHERE lower(d.name) % (SELECT term FROM q)
       OR lower(COALESCE(d.generic_name, '')) % (SELECT term FROM q)
       OR d.name ILIKE '%' || (SELECT term FROM q) || '%'
  )
  UNION ALL
  (
    -- Diseases
    SELECT
      'disease'::TEXT,
      ds.id::TEXT,
      ds.name,
      COALESCE(ds.specialty, ''),
      similarity(lower(ds.name), (SELECT term FROM q))::FLOAT
    FROM diseases ds
    WHERE lower(ds.name) % (SELECT term FROM q)
       OR ds.name ILIKE '%' || (SELECT term FROM q) || '%'
  )
  UNION ALL
  (
    -- Published clinical cases
    SELECT
      'case'::TEXT,
      c.id::TEXT,
      c.title,
      COALESCE(c.specialty, ''),
      GREATEST(
        similarity(lower(c.title), (SELECT term FROM q)),
        similarity(lower(COALESCE(c.diagnosis, '')), (SELECT term FROM q)),
        similarity(lower(COALESCE(c.disease, '')), (SELECT term FROM q))
      )::FLOAT
    FROM clinical_cases c
    WHERE c.status = 'published'
      AND (
        lower(c.title) % (SELECT term FROM q)
        OR lower(COALESCE(c.diagnosis, '')) % (SELECT term FROM q)
        OR lower(COALESCE(c.disease, '')) % (SELECT term FROM q)
        OR c.title ILIKE '%' || (SELECT term FROM q) || '%'
      )
  )
  ORDER BY relevance DESC
  LIMIT match_count;
$$;

-- ================================================================
-- Grant execute to the roles used by the app (anon + authenticated).
-- ================================================================
GRANT EXECUTE ON FUNCTION unified_search(TEXT, INT) TO anon, authenticated;
