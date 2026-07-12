-- 000005_drop_drug_class_column.sql
-- Drops the legacy free-text drug_monographs.drug_class column now that all
-- frontend and engine consumers read drug_class_name (resolved via FK join on
-- drug_class_id → drug_classes.name, falling back to drug_class).
--
-- Applied live to project bveztrtykjburdhewcdy on 2026-07-12.
-- This file is a retroactive record of that migration.

ALTER TABLE drug_monographs DROP COLUMN drug_class;
