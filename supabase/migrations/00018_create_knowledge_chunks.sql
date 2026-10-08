-- -----------------------------------------------------------
-- 00018_create_knowledge_chunks.sql
-- -----------------------------------------------------------
-- Stores chunked monograph text with embeddings for RAG retrieval.
-- -----------------------------------------------------------

create table if not exists public.knowledge_chunks (
    id uuid primary key default gen_random_uuid(),
    monograph_id uuid not null references public.drug_monographs(id) on delete cascade,
    chunk_text text not null,
    embedding jsonb not null,          -- stored as [number, ...] array
    metadata jsonb not null default '{}', -- e.g. {section, line_number, source_url}
    created_at timestamp with time zone not null default now()
);

-- Indexes for fast similarity search (using pgvector-style cosine distance)
-- (if pgvector is installed, you would create a ivfflat index here;
--  otherwise the application can compute distance in SQL using the jsonb arrays.)
create index if not exists idx_knowledge_chunks_monograph on public.knowledge_chunks(monograph_id);
create index if not exists idx_knowledge_chunks_metadata on public.knowledge_chunks using gist (metadata jsonb_path_ops);
