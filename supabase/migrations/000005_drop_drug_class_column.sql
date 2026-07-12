-- 000005_drop_drug_class_column.sql
-- Drops the legacy free-text drug_monographs.drug_class column, now fully
-- superseded by the relational drug_class_id -> drug_classes(id) link added
-- in 000004_drug_classes.sql.
--
-- Applied live to project bveztrtykjburdhewcdy on 2026-07-12.
-- Pre-flight checks performed before dropping (see changelog):
--   - 358/358 drug_monographs rows had drug_class_id populated (0 unlinked)
--   - No views, RLS policies, or functions referenced drug_class
--   - drug_class_id had already been validated as an exact match against the
--     legacy text for every row (0 mismatches) in the 000004 migration
--
-- This file is a retroactive record so the repo's migration history matches
-- the live database. Safe to run on a fresh environment (any environment
-- built from 000001-000004 onward will have drug_class_id fully populated
-- before this runs, since seed/backfill data should be loaded via those
-- migrations first).

ALTER TABLE drug_monographs DROP COLUMN drug_class;
