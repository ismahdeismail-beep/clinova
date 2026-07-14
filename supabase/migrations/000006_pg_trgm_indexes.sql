-- Runtime pg_trgm GIN indexes for fuzzy search across the knowledge base.
-- Backs the search bar autocomplete (TopBar) and KnowledgeEngine lookups.
-- Extension already live; these are the actual indexes to make it useful.

CREATE INDEX IF NOT EXISTS idx_dm_name_trgm
  ON drug_monographs USING gin (name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_dm_generic_name_trgm
  ON drug_monographs USING gin (generic_name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_diseases_name_trgm
  ON diseases USING gin (name gin_trgm_ops);

-- aliases is ARRAY type — GIN trgm not applicable;
-- a regular GIN index or application-level handling covers it.

CREATE INDEX IF NOT EXISTS idx_cc_title_trgm
  ON clinical_cases USING gin (title gin_trgm_ops)
  WHERE status = 'published';
