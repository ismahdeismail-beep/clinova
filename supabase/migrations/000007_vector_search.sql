-- ================================================================
-- Clinova Vector Search Foundation (Phase 5 / Phase 10)
-- Version: 1.5.0
-- Enables semantic search / RAG via pgvector. Embeddings are
-- populated by the background ingestion pipeline (Phase 10).
-- HNSW index gives sub-linear nearest-neighbour lookup, which is
-- the key Supabase performance lever for retrieval-augmented AI.
-- ================================================================

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS document_embeddings (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type  TEXT NOT NULL,              -- 'drug','disease','case','guide','note'
  content_id    TEXT NOT NULL,              -- source row / external id
  chunk_index   INT DEFAULT 0,
  chunk_text    TEXT NOT NULL,
  embedding     vector(768),                -- 768-dim (Gemini embedding-001)
  metadata      JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Source lookup: fetch all chunks for a document quickly
CREATE INDEX IF NOT EXISTS idx_embeddings_content
  ON document_embeddings (content_type, content_id);

-- Nearest-neighbour search (cosine). HNSW is preferred on Supabase
-- (no need to tune lists / no training scan).
CREATE INDEX IF NOT EXISTS idx_embeddings_vector
  ON document_embeddings
  USING hnsw (embedding vector_cosine_ops);

-- ================================================================
-- RLS: knowledge-base embeddings are readable by everyone, but only
-- the service role (background pipeline) writes them.
-- ================================================================
ALTER TABLE document_embeddings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Embeddings are publicly readable"
  ON document_embeddings FOR SELECT USING (true);

-- (No anon/authenticated INSERT — pipeline uses service_role key,
--  which bypasses RLS by default.)

-- ================================================================
-- Helper: similarity search over the knowledge base.
-- Returns the top-K chunks for a query embedding.
-- ================================================================
CREATE OR REPLACE FUNCTION match_embeddings(
  query_embedding vector(768),
  match_content_type TEXT DEFAULT NULL,
  match_count INT DEFAULT 8
)
RETURNS TABLE (
  content_id   TEXT,
  chunk_text   TEXT,
  metadata     JSONB,
  similarity   FLOAT
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    e.content_id,
    e.chunk_text,
    e.metadata,
    1 - (e.embedding <=> query_embedding) AS similarity
  FROM document_embeddings e
  WHERE (match_content_type IS NULL OR e.content_type = match_content_type)
  ORDER BY e.embedding <=> query_embedding
  LIMIT match_count;
$$;
