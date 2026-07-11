-- =====================================================================
-- 000004_drug_classes.sql
-- Normalised drug-class reference table (broad parents + specific children)
-- Links every drug_monographs row to a canonical drug_class_id while
-- preserving the original free-text drug_class column as a fallback.
-- =====================================================================

CREATE TABLE IF NOT EXISTS drug_classes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE,
  parent_id   UUID REFERENCES drug_classes(id) ON DELETE SET NULL,
  sort_order  INTEGER DEFAULT 0,
  is_broad    BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_drug_classes_parent ON drug_classes(parent_id);

INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001000', 'Anti-infectives', 'anti_infectives', NULL, 1, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001001', 'Cardiovascular', 'cardiovascular', NULL, 2, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001002', 'Central Nervous System', 'cns', NULL, 3, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001003', 'Analgesics', 'analgesics', NULL, 4, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001004', 'Gastrointestinal', 'gastrointestinal', NULL, 5, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001005', 'Endocrine / Metabolic', 'endocrine', NULL, 6, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001006', 'Respiratory', 'respiratory', NULL, 7, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001007', 'Anticoagulants / Antithrombotics', 'anticoagulants', NULL, 8, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001008', 'Oncology', 'oncology', NULL, 9, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001009', 'Immunology', 'immunology', NULL, 10, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001010', 'Dermatology', 'dermatology', NULL, 11, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001011', 'Renal / Electrolytes', 'renal', NULL, 12, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001012', 'Nutrition / Vitamins', 'nutrition', NULL, 13, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001013', 'Anaesthesia', 'anaesthesia', NULL, 14, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001014', 'Ophthalmology', 'ophthalmology', NULL, 15, true) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c00000-0000-0000-0000-000000001015', 'Toxicology / Antidotes', 'toxicology', NULL, 16, true) ON CONFLICT (slug) DO NOTHING;

INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001000', '5-HT₃ receptor antagonist (antiemetic)', 'child-1000', d1c00000-0000-0000-0000-000000001004, 1, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001001', 'Aminoglycoside antibiotic â€” bactericidal, concentration-dependent killing', 'child-1001', d1c00000-0000-0000-0000-000000001000, 2, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001002', 'Anaesthetic agent', 'child-1002', d1c00000-0000-0000-0000-000000001013, 3, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001003', 'Analgesic (non-opioid) and antipyretic â€” mechanism involves central COX inhibition, serotonergic descending pathways, and endocannabinoid system', 'child-1003', d1c00000-0000-0000-0000-000000001003, 4, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001004', 'Analgesic agent', 'child-1004', d1c00000-0000-0000-0000-000000001003, 5, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001005', 'Angiotensin II receptor blocker (ARB)', 'child-1005', d1c00000-0000-0000-0000-000000001001, 6, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001006', 'Angiotensin-converting enzyme (ACE) inhibitor', 'child-1006', d1c00000-0000-0000-0000-000000001001, 7, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001007', 'Anticoagulant / antithrombotic agent', 'child-1007', d1c00000-0000-0000-0000-000000001007, 8, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001008', 'Antidote / toxicology agent', 'child-1008', d1c00000-0000-0000-0000-000000001015, 9, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001009', 'Antiepileptic; mood stabiliser', 'child-1009', d1c00000-0000-0000-0000-000000001002, 10, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001010', 'Antiepileptic; mood stabiliser; anticonvulsant', 'child-1010', d1c00000-0000-0000-0000-000000001002, 11, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001011', 'Antimalarial (artemisinin-based combination therapy — ACT)', 'child-1011', d1c00000-0000-0000-0000-000000001000, 12, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001012', 'Antimicrobial agent', 'child-1012', d1c00000-0000-0000-0000-000000001000, 13, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001013', 'Antineoplastic / chemotherapeutic agent', 'child-1013', d1c00000-0000-0000-0000-000000001008, 14, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001014', 'Antipsychotic (first-generation / typical antipsychotic — butyrophenone)', 'child-1014', d1c00000-0000-0000-0000-000000001002, 15, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001015', 'Antipsychotic (second-generation / atypical antipsychotic — benzisoxazole derivative)', 'child-1015', d1c00000-0000-0000-0000-000000001002, 16, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001016', 'Benzimidazole anthelmintic â€” microtubule disruptor (inhibits polymerisation of Î²-tubulin â†’ impairs glucose uptake â†’ death of helminth)', 'child-1016', d1c00000-0000-0000-0000-000000001000, 17, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001017', 'Benzodiazepine â€” long-acting (half-life 20â€“100 hours; active metabolite desmethyldiazepam tÂ½ 36â€“200 hours); anxiolytic, sedative, hypnotic, anticonvulsant, muscle relaxant', 'child-1017', d1c00000-0000-0000-0000-000000001002, 18, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001018', 'Beta-1 selective adrenergic receptor blocker (cardioselective beta-blocker)', 'child-1018', d1c00000-0000-0000-0000-000000001001, 19, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001019', 'Biguanide (oral antihyperglycaemic)', 'child-1019', d1c00000-0000-0000-0000-000000001005, 20, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001020', 'Cardiac glycoside', 'child-1020', d1c00000-0000-0000-0000-000000001001, 21, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001021', 'Cardiovascular agent', 'child-1021', d1c00000-0000-0000-0000-000000001001, 22, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001022', 'Central nervous system agent', 'child-1022', d1c00000-0000-0000-0000-000000001002, 23, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001023', 'Centrally acting alpha-2 adrenergic agonist', 'child-1023', d1c00000-0000-0000-0000-000000001001, 24, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001024', 'Corticosteroid (glucocorticoid with mineralocorticoid activity — short-acting)', 'child-1024', d1c00000-0000-0000-0000-000000001009, 25, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001025', 'Corticosteroid (glucocorticoid — intermediate-acting)', 'child-1025', d1c00000-0000-0000-0000-000000001009, 26, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001026', 'Dermatological agent', 'child-1026', d1c00000-0000-0000-0000-000000001010, 27, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001027', 'Direct-acting vasodilator (arteriolar dilator)', 'child-1027', d1c00000-0000-0000-0000-000000001001, 28, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001028', 'Endocrine / metabolic agent', 'child-1028', d1c00000-0000-0000-0000-000000001005, 29, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001029', 'First-generation antihistamine (H₁-receptor antagonist) — sedating alkylamine', 'child-1029', d1c00000-0000-0000-0000-000000001006, 30, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001030', 'First-generation cephalosporin', 'child-1030', d1c00000-0000-0000-0000-000000001000, 31, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001031', 'First-line antitubercular (bactericidal — inhibits mycolic acid synthesis)', 'child-1031', d1c00000-0000-0000-0000-000000001000, 32, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001032', 'Fluoroquinolone antibiotic', 'child-1032', d1c00000-0000-0000-0000-000000001000, 33, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001033', 'Folate synthesis inhibitor (sulphonamide + diaminopyrimidine combination)', 'child-1033', d1c00000-0000-0000-0000-000000001000, 34, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001034', 'Gastrointestinal agent', 'child-1034', d1c00000-0000-0000-0000-000000001004, 35, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001035', 'HMG-CoA reductase inhibitor (statin)', 'child-1035', d1c00000-0000-0000-0000-000000001001, 36, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001036', 'Immunomodulatory / biologic agent', 'child-1036', d1c00000-0000-0000-0000-000000001009, 37, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001037', 'Integrase strand transfer inhibitor (INSTI) — HIV antiretroviral', 'child-1037', d1c00000-0000-0000-0000-000000001000, 38, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001038', 'Intermediate-acting insulin (pre-mixed formulation)', 'child-1038', d1c00000-0000-0000-0000-000000001005, 39, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001039', 'Loop diuretic', 'child-1039', d1c00000-0000-0000-0000-000000001011, 40, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001040', 'Macrolide antibiotic', 'child-1040', d1c00000-0000-0000-0000-000000001000, 41, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001041', 'Mood stabiliser (antimanic)', 'child-1041', d1c00000-0000-0000-0000-000000001002, 42, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001042', 'Nitroimidazole antibiotic / antiprotozoal', 'child-1042', d1c00000-0000-0000-0000-000000001000, 43, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001043', 'Non-steroidal anti-inflammatory drug (NSAID) â€” non-selective COX-1/COX-2 inhibitor (propionic acid derivative)', 'child-1043', d1c00000-0000-0000-0000-000000001003, 44, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001044', 'Nucleotide reverse transcriptase inhibitor (NtRTI) — HIV antiretroviral', 'child-1044', d1c00000-0000-0000-0000-000000001000, 45, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001045', 'Nutritional supplement / vitamin', 'child-1045', d1c00000-0000-0000-0000-000000001012, 46, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001046', 'Ophthalmic agent', 'child-1046', d1c00000-0000-0000-0000-000000001014, 47, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001047', 'Opioid analgesic (full mu-opioid receptor agonist — natural alkaloid)', 'child-1047', d1c00000-0000-0000-0000-000000001003, 48, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001048', 'Oral iron preparation (haematinic)', 'child-1048', d1c00000-0000-0000-0000-000000001012, 49, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001049', 'Osmotic laxative; ammonia-lowering agent', 'child-1049', d1c00000-0000-0000-0000-000000001004, 50, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001050', 'Penicillinase-resistant (anti-staphylococcal) penicillin â€” isoxazolyl penicillin', 'child-1050', d1c00000-0000-0000-0000-000000001000, 51, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001051', 'Potassium-sparing diuretic (mineralocorticoid receptor antagonist)', 'child-1051', d1c00000-0000-0000-0000-000000001011, 52, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001052', 'Proton pump inhibitor (PPI) — substituted benzimidazole', 'child-1052', d1c00000-0000-0000-0000-000000001004, 53, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001053', 'Renal / electrolyte agent', 'child-1053', d1c00000-0000-0000-0000-000000001011, 54, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001054', 'Respiratory agent', 'child-1054', d1c00000-0000-0000-0000-000000001006, 55, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001055', 'Rifamycin antibiotic (first-line antitubercular — bactericidal)', 'child-1055', d1c00000-0000-0000-0000-000000001000, 56, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001056', 'Sulphonylurea (insulin secretagogue) — second-generation', 'child-1056', d1c00000-0000-0000-0000-000000001005, 57, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001057', 'Tetracycline antibiotic', 'child-1057', d1c00000-0000-0000-0000-000000001000, 58, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001058', 'Therapeutic agent', 'child-1058', NULL, 59, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001059', 'Thyroid hormone (T₄) — synthetic', 'child-1059', d1c00000-0000-0000-0000-000000001005, 60, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001060', 'Triazole antifungal', 'child-1060', d1c00000-0000-0000-0000-000000001000, 61, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001061', 'Vitamin K antagonist (anticoagulant)', 'child-1061', d1c00000-0000-0000-0000-000000001007, 62, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001062', 'Water-soluble B vitamin (cobalamin)', 'child-1062', d1c00000-0000-0000-0000-000000001012, 63, false) ON CONFLICT (slug) DO NOTHING;
INSERT INTO drug_classes (id, name, slug, parent_id, sort_order, is_broad) VALUES ('d1c10000-0000-0000-0000-000000001063', 'Water-soluble B vitamin (folate)', 'child-1063', d1c00000-0000-0000-0000-000000001012, 64, false) ON CONFLICT (slug) DO NOTHING;

ALTER TABLE drug_monographs ADD COLUMN IF NOT EXISTS drug_class_id UUID REFERENCES drug_classes(id);
ALTER TABLE drug_monographs ADD COLUMN IF NOT EXISTS classification_note TEXT;
CREATE INDEX IF NOT EXISTS idx_drug_monographs_class ON drug_monographs(drug_class_id);

-- Link existing monographs to their specific drug_class child (exact name match)
UPDATE drug_monographs
SET drug_class_id = (
  SELECT dc.id FROM drug_classes dc
  WHERE dc.name = drug_monographs.drug_class AND dc.is_broad = false
  LIMIT 1
)
WHERE drug_monographs.drug_class IS NOT NULL
  AND drug_monographs.drug_class_id IS NULL;

-- Acetazolamide: reclassify from Ophthalmic agent to Renal/electrolyte agent (carbonic
-- anhydrase inhibitor). Flagged via classification_note for clinical verification.
UPDATE drug_monographs
SET drug_class_id = 'd1c10000-0000-0000-0000-000000001053',
    drug_class = 'Renal / electrolyte agent',
    classification_note = 'Reclassified from Ophthalmic agent to Renal/electrolyte agent (carbonic anhydrase inhibitor). Original class was a route/indication label, not a pharmacological class. Verify clinical classification.'
WHERE lower(name) = 'acetazolamide';

ALTER TABLE drug_classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read drug_classes" ON drug_classes FOR SELECT USING (true);

-- Summary report (run after migration to verify linkage)
-- SELECT COUNT(*) FILTER (WHERE drug_class_id IS NULL) AS unlinked, COUNT(*) AS total FROM drug_monographs;
