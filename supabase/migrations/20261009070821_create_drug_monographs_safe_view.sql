-- -----------------------------------------------------------
-- 20261009070821_create_drug_monographs_safe_view.sql
-- Reconstructed from the hosted project's migration history
-- (applied 20261009). Committed to reconcile local <-> remote.
-- -----------------------------------------------------------

create or replace view public.drug_monographs_safe with (security_invoker = true) as
select * from public.drug_monographs
where content_status in ('verified','partially_sourced');
comment on view public.drug_monographs_safe is 'Only monographs whose content is not class-template text. Point the app, search and AI retrieval at this view until the template rows are rebuilt from sources.';
