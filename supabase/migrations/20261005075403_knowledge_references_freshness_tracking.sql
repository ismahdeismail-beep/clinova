-- -----------------------------------------------------------
-- 20261005075403_knowledge_references_freshness_tracking.sql
-- Reconstructed from the hosted project's migration history
-- (applied 20261005). Committed to reconcile local <-> remote.
-- -----------------------------------------------------------

alter table public.knowledge_references
  add column if not exists last_verified_at timestamptz,
  add column if not exists recheck_after date,
  add column if not exists superseded_by text;
comment on column public.knowledge_references.last_verified_at is 'When a human/agent last confirmed this is the latest edition of the source';
comment on column public.knowledge_references.recheck_after is 'Date after which the source must be re-checked for a newer edition';
comment on column public.knowledge_references.superseded_by is 'Name/edition of the newer source if this one is outdated';
update public.knowledge_references set recheck_after = (created_at + interval '6 months')::date where recheck_after is null;
