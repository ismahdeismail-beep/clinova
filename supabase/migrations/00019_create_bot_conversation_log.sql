-- -----------------------------------------------------------
-- 00019_create_bot_conversation_log.sql
-- -----------------------------------------------------------
-- Logs WhatsApp conversations for later fine‑tuning / audit.
-- -----------------------------------------------------------

create table if not exists public.bot_conversation_log (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    query text not null,
    answer_given text not null,
    feedback text,                     -- e.g. 'thumbs-up', 'thumbs-down', or free‑form
    created_at timestamp with time zone not null default now()
);

-- Index to quickly retrieve a user's history
create index if not exists idx_bot_conversation_log_user on public.bot_conversation_log(user_id);
create index if not exists idx_bot_conversation_log_created on public.bot_conversation_log(created_at);
