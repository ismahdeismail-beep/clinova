-- -----------------------------------------------------------
-- 00021_knowledge_chunks_sources.sql
-- -----------------------------------------------------------
-- Lets `knowledge_chunks` hold corpora other than drug monographs. STG /
-- essential-medicine documents are not drug_monographs rows, so a chunk gains a
-- `source` tag plus a source-scoped upsert key instead of the monograph-only
-- key (which `ensure-rag` upserts on).
--
--   source      'monograph' (default) | 'stg' | … future corpora
--   source_ref  monograph uuid (as text) for monographs; document slug for
--               non-drug sources. Unique together with (source, chunk_index).
--
-- rag_pipeline_status counts distinct monograph_id, so stg rows (NULL
-- monograph_id) never inflate the monograph-coverage figure.
-- -----------------------------------------------------------

-- 1. Source tag + source-scoped reference ------------------------------------
alter table public.knowledge_chunks
  add column if not exists source text not null default 'monograph',
  add column if not exists source_ref text;

-- Every pre-existing row is a drug-monograph chunk: key it by its monograph id.
update public.knowledge_chunks
   set source_ref = monograph_id::text
 where source_ref is null and monograph_id is not null;

alter table public.knowledge_chunks
  alter column source_ref set not null;

-- Non-drug corpora (STG) carry no drug_monographs row.
alter table public.knowledge_chunks
  alter column monograph_id drop not null;

-- 2. Replace the monograph-only upsert target with a source-scoped one -------
drop index if exists public.uq_knowledge_chunks_monograph_chunk;
create unique index if not exists uq_knowledge_chunks_source_ref_chunk
  on public.knowledge_chunks (source, source_ref, chunk_index);

create index if not exists idx_knowledge_chunks_source
  on public.knowledge_chunks (source);
