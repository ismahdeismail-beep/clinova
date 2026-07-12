-- 000004_drug_classes.sql
-- Adds a relational drug_classes reference table (broad category -> specific class)
-- to replace the free-text drug_monographs.drug_class field, consistent with the
-- project's "relational lookup tables over enums" architecture principle.
--
-- Applied live to project bveztrtykjburdhewcdy on 2026-07-12.
-- This file is a retroactive record of that migration so the repo's migration
-- history matches the live database. Safe to run on a fresh environment.

-- ============================================================================
-- 1. Table
-- ============================================================================

CREATE TABLE drug_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  parent_id uuid REFERENCES drug_classes(id),
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_drug_classes_parent_id ON drug_classes(parent_id);

-- Reuses the project's existing shared trigger function (also used by
-- kenya_drug_index and other tables) rather than duplicating logic.
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON drug_classes
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- ============================================================================
-- 2. Row Level Security
-- ============================================================================
-- Matches the established pattern for lookup/reference tables (clinical_settings,
-- case_types, acuity_levels, patient_age_groups): public read, writes restricted
-- to service_role by default (no write policy defined).

ALTER TABLE drug_classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read drug_classes"
ON drug_classes
FOR SELECT
TO public
USING (true);

-- ============================================================================
-- 3. Seed data: 16 broad categories (top-level, parent_id IS NULL)
-- ============================================================================

INSERT INTO drug_classes (name) VALUES
('Antimicrobial agent'),
('Dermatological agent'),
('Cardiovascular agent'),
('Antineoplastic / chemotherapeutic agent'),
('Central nervous system agent'),
('Anaesthetic agent'),
('Endocrine / metabolic agent'),
('Nutritional supplement / vitamin'),
('Therapeutic agent'),
('Analgesic agent'),
('Antidote / toxicology agent'),
('Gastrointestinal agent'),
('Respiratory agent'),
('Renal / electrolyte agent'),
('Anticoagulant / antithrombotic agent'),
('Immunomodulatory / biologic agent');

-- Stable display order for broad categories (alphabetical baseline, reorder later as needed)
WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY name) AS rn
  FROM drug_classes WHERE parent_id IS NULL
)
UPDATE drug_classes dc
SET sort_order = ordered.rn
FROM ordered
WHERE dc.id = ordered.id;

-- ============================================================================
-- 4. Seed data: 50 specific classes (children of the broad categories above)
-- ============================================================================
-- Names are the exact original drug_monographs.drug_class text values, except
-- 'Ophthalmic agent' (Acetazolamide), which was corrected to the accurate
-- pharmacological class 'Carbonic anhydrase inhibitor' -- the original label
-- described a route/indication, not a drug class. Flagged for review at the
-- time; written here as the corrected value so a fresh build matches the
-- current live database.

INSERT INTO drug_classes (name, parent_id)
SELECT v.name, dc.id
FROM (VALUES
  ('5-HT₃ receptor antagonist (antiemetic)', 'Gastrointestinal agent'),
  ('Aminoglycoside antibiotic — bactericidal, concentration-dependent killing', 'Antimicrobial agent'),
  ('Analgesic (non-opioid) and antipyretic — mechanism involves central COX inhibition, serotonergic descending pathways, and endocannabinoid system', 'Analgesic agent'),
  ('Angiotensin II receptor blocker (ARB)', 'Cardiovascular agent'),
  ('Angiotensin-converting enzyme (ACE) inhibitor', 'Cardiovascular agent'),
  ('Antiepileptic; mood stabiliser', 'Central nervous system agent'),
  ('Antiepileptic; mood stabiliser; anticonvulsant', 'Central nervous system agent'),
  ('Antimalarial (artemisinin-based combination therapy — ACT)', 'Antimicrobial agent'),
  ('Antipsychotic (first-generation / typical antipsychotic — butyrophenone)', 'Central nervous system agent'),
  ('Antipsychotic (second-generation / atypical antipsychotic — benzisoxazole derivative)', 'Central nervous system agent'),
  ('Benzimidazole anthelmintic — microtubule disruptor (inhibits polymerisation of β-tubulin → impairs glucose uptake → death of helminth)', 'Antimicrobial agent'),
  ('Benzodiazepine — long-acting (half-life 20–100 hours; active metabolite desmethyldiazepam t½ 36–200 hours); anxiolytic, sedative, hypnotic, anticonvulsant, muscle relaxant', 'Central nervous system agent'),
  ('Beta-1 selective adrenergic receptor blocker (cardioselective beta-blocker)', 'Cardiovascular agent'),
  ('Biguanide (oral antihyperglycaemic)', 'Endocrine / metabolic agent'),
  ('Cardiac glycoside', 'Cardiovascular agent'),
  ('Centrally acting alpha-2 adrenergic agonist', 'Cardiovascular agent'),
  ('Corticosteroid (glucocorticoid — intermediate-acting)', 'Endocrine / metabolic agent'),
  ('Corticosteroid (glucocorticoid with mineralocorticoid activity — short-acting)', 'Endocrine / metabolic agent'),
  ('Direct-acting vasodilator (arteriolar dilator)', 'Cardiovascular agent'),
  ('First-generation antihistamine (H₁-receptor antagonist) — sedating alkylamine', 'Central nervous system agent'),
  ('First-generation cephalosporin', 'Antimicrobial agent'),
  ('First-line antitubercular (bactericidal — inhibits mycolic acid synthesis)', 'Antimicrobial agent'),
  ('Fluoroquinolone antibiotic', 'Antimicrobial agent'),
  ('Folate synthesis inhibitor (sulphonamide + diaminopyrimidine combination)', 'Antimicrobial agent'),
  ('HMG-CoA reductase inhibitor (statin)', 'Cardiovascular agent'),
  ('Integrase strand transfer inhibitor (INSTI) — HIV antiretroviral', 'Antimicrobial agent'),
  ('Intermediate-acting insulin (pre-mixed formulation)', 'Endocrine / metabolic agent'),
  ('Loop diuretic', 'Cardiovascular agent'),
  ('Macrolide antibiotic', 'Antimicrobial agent'),
  ('Mood stabiliser (antimanic)', 'Central nervous system agent'),
  ('Nitroimidazole antibiotic / antiprotozoal', 'Antimicrobial agent'),
  ('Non-steroidal anti-inflammatory drug (NSAID) — non-selective COX-1/COX-2 inhibitor (propionic acid derivative)', 'Analgesic agent'),
  ('Nucleotide reverse transcriptase inhibitor (NtRTI) — HIV antiretroviral', 'Antimicrobial agent'),
  ('Carbonic anhydrase inhibitor', 'Renal / electrolyte agent'),
  ('Opioid analgesic (full mu-opioid receptor agonist — natural alkaloid)', 'Analgesic agent'),
  ('Oral iron preparation (haematinic)', 'Nutritional supplement / vitamin'),
  ('Osmotic laxative; ammonia-lowering agent', 'Gastrointestinal agent'),
  ('Penicillin + beta-lactamase inhibitor', 'Antimicrobial agent'),
  ('Penicillinase-resistant (anti-staphylococcal) penicillin — isoxazolyl penicillin', 'Antimicrobial agent'),
  ('Potassium-sparing diuretic (mineralocorticoid receptor antagonist)', 'Cardiovascular agent'),
  ('Proton pump inhibitor (PPI) — substituted benzimidazole', 'Gastrointestinal agent'),
  ('Rifamycin antibiotic (first-line antitubercular — bactericidal)', 'Antimicrobial agent'),
  ('Short-acting insulin', 'Endocrine / metabolic agent'),
  ('Sulphonylurea (insulin secretagogue) — second-generation', 'Endocrine / metabolic agent'),
  ('Tetracycline antibiotic', 'Antimicrobial agent'),
  ('Thyroid hormone (T₄) — synthetic', 'Endocrine / metabolic agent'),
  ('Triazole antifungal', 'Antimicrobial agent'),
  ('Vitamin K antagonist (anticoagulant)', 'Anticoagulant / antithrombotic agent'),
  ('Water-soluble B vitamin (cobalamin)', 'Nutritional supplement / vitamin'),
  ('Water-soluble B vitamin (folate)', 'Nutritional supplement / vitamin')
) AS v(name, parent_name)
JOIN drug_classes dc ON dc.name = v.parent_name;

-- ============================================================================
-- 5. Link drug_monographs to drug_classes
-- ============================================================================

ALTER TABLE drug_monographs ADD COLUMN drug_class_id uuid REFERENCES drug_classes(id);

CREATE INDEX idx_drug_monographs_drug_class_id ON drug_monographs(drug_class_id);

-- Correct the legacy free-text field for Acetazolamide to match the corrected
-- classification before backfilling (see note in section 4).
UPDATE drug_monographs
SET drug_class = 'Carbonic anhydrase inhibitor'
WHERE name = 'Acetazolamide';

-- Backfill: link every monograph to its matching class by exact text match.
UPDATE drug_monographs dm
SET drug_class_id = dc.id
FROM drug_classes dc
WHERE dc.name = dm.drug_class;

-- NOTE: drug_monographs.drug_class (legacy free-text column) is intentionally
-- left in place as a safe fallback and is not dropped by this migration.
-- Drop it in a later migration once the frontend reads from drug_class_id.

-- ============================================================================
-- 6. Validation (run manually after applying; not part of the migration)
-- ============================================================================
-- SELECT COUNT(*) FROM drug_monographs WHERE drug_class_id IS NULL;              -- expect 0
-- SELECT COUNT(*) FROM drug_classes WHERE parent_id IS NULL;                     -- expect 16
-- SELECT COUNT(*) FROM drug_classes WHERE parent_id IS NOT NULL;                 -- expect 50
-- SELECT COUNT(*) FROM drug_monographs dm JOIN drug_classes dc
--   ON dc.id = dm.drug_class_id WHERE dm.drug_class <> dc.name;                  -- expect 0
