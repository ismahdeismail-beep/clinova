-- ================================================================
-- Clinova Performance Indexes Migration (Phase 4)
-- Version: 1.4.0
-- Adds targeted indexes for hot-path read/search queries to
-- eliminate sequential scans and N+1-style lookups.
-- Safe to re-run (IF NOT EXISTS / CREATE EXTENSION guards).
-- ================================================================

-- Trigram extension enables fast ILIKE / autocomplete searches
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ================================================================
-- 1. Drug Monographs — primary search surface (Kenya Drug Index)
-- ================================================================

-- Exact + case-insensitive name lookups (e.g. /drugs?q=)
CREATE INDEX IF NOT EXISTS idx_drug_monographs_name
  ON drug_monographs (name);

CREATE INDEX IF NOT EXISTS idx_drug_monographs_name_trgm
  ON drug_monographs USING gin (name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_drug_monographs_class
  ON drug_monographs (drug_class);

-- Array containment for interaction / indication filtering
CREATE INDEX IF NOT EXISTS idx_drug_monographs_indications
  ON drug_monographs USING gin (indications);
CREATE INDEX IF NOT EXISTS idx_drug_monographs_contraindications
  ON drug_monographs USING gin (contraindications);
CREATE INDEX IF NOT EXISTS idx_drug_monographs_side_effects
  ON drug_monographs USING gin (side_effects);
CREATE INDEX IF NOT EXISTS idx_drug_monographs_interactions
  ON drug_monographs USING gin (interactions);

-- ================================================================
-- 2. Diseases — monograph + case join surface
-- ================================================================

CREATE INDEX IF NOT EXISTS idx_diseases_name
  ON diseases (name);

CREATE INDEX IF NOT EXISTS idx_diseases_name_trgm
  ON diseases USING gin (name gin_trgm_ops);

-- ================================================================
-- 3. Clinical Cases — listing, filtering, search
-- ================================================================

-- Hot read path: the SELECT policy filters status = 'published'.
-- A partial index keeps this small and fast as the table grows.
CREATE INDEX IF NOT EXISTS idx_clinical_cases_published
  ON clinical_cases (created_at DESC)
  WHERE status = 'published';

-- Common filter combos used by the Cases screen
CREATE INDEX IF NOT EXISTS idx_clinical_cases_specialty_status
  ON clinical_cases (specialty, status);
CREATE INDEX IF NOT EXISTS idx_clinical_cases_disease_status
  ON clinical_cases (disease, status);
CREATE INDEX IF NOT EXISTS idx_clinical_cases_difficulty_status
  ON clinical_cases (difficulty, status);

-- Autocomplete / free-text search on title and diagnosis
CREATE INDEX IF NOT EXISTS idx_clinical_cases_title_trgm
  ON clinical_cases USING gin (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_clinical_cases_diagnosis_trgm
  ON clinical_cases USING gin (diagnosis gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_clinical_cases_disease_trgm
  ON clinical_cases USING gin (disease gin_trgm_ops);

-- Array columns (DDX, references) for related-content expansion
CREATE INDEX IF NOT EXISTS idx_clinical_cases_ddx
  ON clinical_cases USING gin (ddx);
CREATE INDEX IF NOT EXISTS idx_clinical_cases_references
  ON clinical_cases USING gin ("references");

-- ================================================================
-- 4. Derived study resources — recency ordering
-- ================================================================

CREATE INDEX IF NOT EXISTS idx_study_guides_created
  ON study_guides (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_flashcards_created
  ON flashcards (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_created
  ON quiz_questions (created_at DESC);

-- ================================================================
-- 5. Knowledge graph — traversal acceleration
-- ================================================================

CREATE INDEX IF NOT EXISTS idx_kg_nodes_label_trgm
  ON knowledge_graph_nodes USING gin (label gin_trgm_ops);

-- ================================================================
-- 6. Maintenance note
-- ================================================================
-- After applying, run  ANALYZE;  to refresh planner statistics so
-- the optimizer picks the new indexes. On Supabase this can be done
-- from the SQL editor or via `vacuum analyze` on the affected tables.
--   ANALYZE clinical_cases;
--   ANALYZE drug_monographs;
--   ANALYZE diseases;
-- ================================================================
