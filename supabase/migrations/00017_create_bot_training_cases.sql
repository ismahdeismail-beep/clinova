-- -----------------------------------------------------------
-- 00017_create_bot_training_cases.sql
-- -----------------------------------------------------------
-- Creates the table that stores curated Q&A pairs for RAG training.
-- -----------------------------------------------------------

create table if not exists public.bot_training_cases (
    id uuid primary key default gen_random_uuid(),
    query text not null,
    category text not null check (category in ('dosage','side-effect','interaction','contra-indication','other')),
    source_monograph_id uuid references public.drug_monographs(id) on delete set null,
    expected_answer text not null,
    status text not null default 'pending' check (status in ('pending','approved','deprecated')),
    reviewed_at timestamp with time zone,
    created_at timestamp with time zone not null default now()
);

-- Case-insensitive uniqueness on `query`. NOTE: PostgreSQL does not allow
-- expressions inside table-level UNIQUE constraints, so this must be a
-- standalone expression index. It also backs the `ON CONFLICT (lower(query))`
-- target used by the case-import pipeline.
create unique index if not exists uq_bot_training_cases_lower_query
  on public.bot_training_cases (lower(query));

-- Helper indexes
create index if not exists idx_bot_training_cases_category on public.bot_training_cases(category);
create index if not exists idx_bot_training_cases_status on public.bot_training_cases(status);
create index if not exists idx_bot_training_cases_source_monograph on public.bot_training_cases(source_monograph_id);
