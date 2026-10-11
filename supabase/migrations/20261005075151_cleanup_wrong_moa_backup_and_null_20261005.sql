-- -----------------------------------------------------------
-- 20261005075151_cleanup_wrong_moa_backup_and_null_20261005.sql
-- Reconstructed from the hosted project's migration history
-- (applied 20261005). Committed to reconcile local <-> remote.
-- -----------------------------------------------------------

create table if not exists public.drug_monographs_cleanup_backup (
  backup_id bigserial primary key,
  backed_up_at timestamptz not null default now(),
  reason text not null,
  monograph_id uuid not null,
  name text,
  field text not null,
  old_value text
);
alter table public.drug_monographs_cleanup_backup enable row level security;

insert into public.drug_monographs_cleanup_backup (reason, monograph_id, name, field, old_value)
select 'MoA text belongs to a different drug (olanzapine label text copied onto unrelated drugs)', id, name, 'mechanism_of_action', mechanism_of_action
from public.drug_monographs
where mechanism_of_action ilike '12.1 Mechanism of Action The mechanism of action of olanzapine%'
  and name not ilike '%olanzapine%';

insert into public.drug_monographs_cleanup_backup (reason, monograph_id, name, field, old_value)
select 'MoA text copied from a different drug', id, name, 'mechanism_of_action', mechanism_of_action
from public.drug_monographs
where name in ('Methylprednisolone','Ledipasvir/Sofosbuvir','Somatostatin','Nicotine Replacement','Macrogol','Hydrochlorothiazide')
  and mechanism_of_action is not null;
