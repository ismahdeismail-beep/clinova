-- -----------------------------------------------------------
-- 00020_rag_pipeline_hardening.sql
-- -----------------------------------------------------------
-- Finishes the RAG training pipeline introduced in 00017–00019:
--   * knowledge_chunks gains chunk_index / embedding_model / run_id so a
--     nightly `ensure-rag` run can upsert idempotently and be rolled back.
--   * RLS is enabled (deny-by-default, service-role/server-only) on the three
--     bot tables, matching the notifications / push_subscriptions model.
--   * A read-only status view for the monitoring requirement.
-- -----------------------------------------------------------

-- 1. knowledge_chunks: provenance + idempotent upsert target --------------
alter table public.knowledge_chunks
  add column if not exists chunk_index integer not null default 0,
  add column if not exists embedding_model text,
  add column if not exists run_id text;

-- One row per (monograph, chunk position); lets `ensure-rag` upsert on conflict.
create unique index if not exists uq_knowledge_chunks_monograph_chunk
  on public.knowledge_chunks (monograph_id, chunk_index);

create index if not exists idx_knowledge_chunks_run_id
  on public.knowledge_chunks (run_id);

-- 2. Deny-by-default RLS (server uses the service-role key, which bypasses it).
--    The browser never reads or writes these tables directly.
alter table public.knowledge_chunks      enable row level security;
alter table public.bot_training_cases    enable row level security;
alter table public.bot_conversation_log  enable row level security;

-- 3. Monitoring dashboard (read-only). Query it from the Supabase SQL editor
--    or `select * from public.rag_pipeline_status`.
create or replace view public.rag_pipeline_status as
select
  (select count(*) from public.bot_training_cases)                                as training_cases,
  (select count(*) from public.bot_training_cases where status = 'approved')      as approved_cases,
  (select count(*) from public.bot_training_cases where reviewed_at is not null)  as reviewed_cases,
  (select count(*) from public.knowledge_chunks)                                  as knowledge_chunks,
  (select count(distinct monograph_id) from public.knowledge_chunks)              as covered_monographs,
  (select count(*) from public.drug_monographs)                                   as total_monographs,
  (select max(run_id) from public.knowledge_chunks)                               as latest_run_id;
