-- -----------------------------------------------------------
-- 20261005080227_add_content_status_to_drug_monographs.sql
-- Reconstructed from the hosted project's migration history
-- (applied 20261005). Committed to reconcile local <-> remote.
-- -----------------------------------------------------------

alter table public.drug_monographs
  add column if not exists content_status text not null default 'needs_review',
  add column if not exists content_status_note text,
  add column if not exists content_status_updated_at timestamptz;
alter table public.drug_monographs drop constraint if exists drug_monographs_content_status_check;
alter table public.drug_monographs add constraint drug_monographs_content_status_check check (content_status in ('verified','partially_sourced','template','needs_review'));
comment on column public.drug_monographs.content_status is 'verified = every section sourced; partially_sourced = some sections sourced; template = shared generic text across many drugs, do not present as drug-specific; needs_review = not yet audited';
create index if not exists drug_monographs_content_status_idx on public.drug_monographs(content_status);

with h as (
  select id,
    count(*) over (partition by md5(array_to_string(side_effects,'|'))) se_c,
    count(*) over (partition by md5(array_to_string(contraindications,'|'))) ci_c,
    count(*) over (partition by md5(array_to_string(interactions,'|'))) ix_c,
    count(*) over (partition by md5(coalesce(patient_counselling,''))) pc_c
  from public.drug_monographs
)
update public.drug_monographs d set
  content_status = case
     when d.adult_dosing is not null and d.adult_dosing <> '{}'::jsonb and h.se_c = 1 and h.ci_c = 1 then 'partially_sourced'
     when h.se_c > 1 or h.ci_c > 1 or h.ix_c > 1 or h.pc_c > 1 then 'template'
     else 'needs_review' end,
  content_status_note = case
     when h.se_c > 1 or h.ci_c > 1 or h.ix_c > 1 or h.pc_c > 1 then 'Side effects / contraindications / interactions / counselling text is shared word-for-word with other drugs (class template). Not drug-specific.'
     else null end,
  content_status_updated_at = now()
from h where h.id = d.id;
