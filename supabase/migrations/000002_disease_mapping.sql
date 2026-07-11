-- ================================================================
-- Clinova Phase B — Disease Mapping & Academic Taxonomy
-- Version: 2.0.0
-- Creates clinical_topics, disease_mapping_review_queue, expands
-- disease catalog, and adds clinical_topic_id to clinical_cases.
-- ================================================================

-- ================================================================
-- Clinical Topics (pharmacy practice concepts)
-- ================================================================

CREATE TABLE IF NOT EXISTS clinical_topics (
  id          TEXT NOT NULL PRIMARY KEY,
  label       TEXT NOT NULL UNIQUE,
  description TEXT,
  icon        TEXT,
  color       TEXT,
  sort_order  INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ================================================================
-- Disease Mapping Review Queue
-- ================================================================

CREATE TABLE IF NOT EXISTS disease_mapping_review_queue (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clinical_case_id  UUID REFERENCES clinical_cases(id) ON DELETE CASCADE,
  original_term     TEXT NOT NULL,
  proposed_match    TEXT,
  confidence_score  REAL,
  review_reason     TEXT,
  review_status     TEXT DEFAULT 'pending' CHECK (review_status IN ('pending','approved','rejected','needs_review')),
  reviewed_by       TEXT,
  reviewed_at       TIMESTAMPTZ,
  notes             TEXT,
  created_at        TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_disease_review_status ON disease_mapping_review_queue(review_status);
CREATE INDEX IF NOT EXISTS idx_disease_review_case   ON disease_mapping_review_queue(clinical_case_id);

-- ================================================================
-- Add clinical_topic_id to clinical_cases
-- ================================================================

ALTER TABLE clinical_cases
  ADD COLUMN IF NOT EXISTS clinical_topic_id UUID REFERENCES clinical_topics(id);

CREATE INDEX IF NOT EXISTS idx_clinical_cases_topic ON clinical_cases(clinical_topic_id);

-- ================================================================
-- Expand Disease Catalog
-- ================================================================

INSERT INTO diseases (id, name, aliases) VALUES
  ('acute_bronchitis', 'Acute Bronchitis', ARRAY['Bronchitis']),
  ('alcohol_withdrawal', 'Alcohol Withdrawal', ARRAY['Alcohol Withdrawal Syndrome', 'Delirium Tremens']),
  ('fibromyalgia', 'Fibromyalgia', ARRAY['Fibromyalgia Syndrome']),
  ('folate_deficiency', 'Folate Deficiency', ARRAY['Folic Acid Deficiency', 'Megaloblastic Anaemia due to Folate Deficiency']),
  ('hospital_acquired_pneumonia', 'Hospital-Acquired Pneumonia', ARRAY['HAP', 'Nosocomial Pneumonia']),
  ('hypertensive_disorders_pregnancy', 'Hypertensive Disorders of Pregnancy', ARRAY['Pregnancy-Induced Hypertension']),
  ('malnutrition', 'Malnutrition', ARRAY['Protein-Energy Malnutrition', 'Undernutrition']),
  ('tinea_capitis', 'Tinea Capitis', ARRAY['Scalp Ringworm', 'Dermatophytosis of the Scalp']),
  ('venous_thromboembolism', 'Venous Thromboembolism', ARRAY['VTE', 'DVT/PE']),
  ('ckd_mineral_bone_disorder', 'CKD–Mineral and Bone Disorder', ARRAY['CKD-MBD', 'Renal Osteodystrophy']),
  ('bacterial_conjunctivitis', 'Bacterial Conjunctivitis', ARRAY['Purulent Conjunctivitis']),
  ('diabetic_emergencies', 'Diabetic Emergencies', ARRAY['DKA', 'HHS', 'Hyperglycaemic Emergencies']),
  ('contrast_nephropathy', 'Contrast-Induced Nephropathy', ARRAY['CIN', 'Contrast-Induced Acute Kidney Injury']),
  ('drug_induced_liver_injury', 'Drug-Induced Liver Injury', ARRAY['DILI', 'Hepatotoxicity']),
  ('serotonin_syndrome', 'Serotonin Syndrome', ARRAY['Serotonin Toxicity']),
  ('neuroleptic_malignant_syndrome', 'Neuroleptic Malignant Syndrome', ARRAY['NMS']),
  ('torsades_de_pointes', 'Torsades de Pointes', ARRAY['TdP', 'Polymorphic Ventricular Tachycardia']),
  ('acute_chest_syndrome', 'Acute Chest Syndrome', ARRAY['ACS in Sickle Cell Disease']),
  ('steroid_withdrawal', 'Steroid Withdrawal', ARRAY['Adrenal Insufficiency due to Steroid Withdrawal', 'Corticosteroid Withdrawal Syndrome']),
  ('methotrexate_toxicity', 'Methotrexate Toxicity', ARRAY['MTX Toxicity', 'Methotrexate Overdose']),
  ('vancomycin_aki', 'Vancomycin-Induced Acute Kidney Injury', ARRAY['Vancomycin Nephrotoxicity', 'Vancomycin AKI'])
ON CONFLICT (id) DO NOTHING;

-- ================================================================
-- Seed Clinical Topics
-- ================================================================

INSERT INTO clinical_topics (id, label, description, sort_order) VALUES
  ('medication_reconciliation', 'Medication Reconciliation', 'Systematic process of creating and maintaining an accurate list of all medications a patient is taking.', 1),
  ('polypharmacy', 'Polypharmacy', 'Evaluation and management of patients on multiple medications, particularly in older adults.', 2),
  ('antimicrobial_stewardship', 'Antimicrobial Stewardship', 'Coordinated interventions to optimize antimicrobial use, reduce resistance, and improve outcomes.', 3),
  ('anticoagulation_management', 'Anticoagulation Management', 'Monitoring, dosing, and management of anticoagulant therapy including warfarin and DOACs.', 4),
  ('therapeutic_drug_monitoring', 'Therapeutic Drug Monitoring', 'Measuring drug concentrations to optimize efficacy and minimize toxicity for narrow-therapeutic-index drugs.', 5),
  ('medication_safety', 'Medication Safety', 'Systems and practices to prevent medication errors and adverse drug events.', 6),
  ('adverse_drug_reactions', 'Adverse Drug Reactions', 'Identification, reporting, and management of adverse drug reactions.', 7),
  ('medication_adherence', 'Medication Adherence', 'Strategies to assess and improve patient compliance with prescribed medication regimens.', 8),
  ('pharmaceutical_care', 'Pharmaceutical Care', 'Patient-centered practice of identifying, resolving, and preventing drug therapy problems.', 9),
  ('medicines', 'Medicines', 'Provision of evidence-based drug information to healthcare professionals and patients.', 10)
ON CONFLICT (id) DO NOTHING;

-- ================================================================
-- RLS Policies for new tables
-- ================================================================

ALTER TABLE clinical_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE disease_mapping_review_queue ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read clinical_topics" ON clinical_topics;
CREATE POLICY "Anyone can read clinical_topics"
  ON clinical_topics FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage clinical_topics" ON clinical_topics;
CREATE POLICY "Authenticated users can manage clinical_topics"
  ON clinical_topics FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Anyone can read disease_mapping_review_queue" ON disease_mapping_review_queue;
CREATE POLICY "Anyone can read disease_mapping_review_queue"
  ON disease_mapping_review_queue FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage disease_mapping_review_queue" ON disease_mapping_review_queue;
CREATE POLICY "Authenticated users can manage disease_mapping_review_queue"
  ON disease_mapping_review_queue FOR ALL USING (auth.role() = 'authenticated');
