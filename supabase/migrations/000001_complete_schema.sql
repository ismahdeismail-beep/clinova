-- ================================================================
-- Clinova Complete Schema Migration
-- Version: 1.0.0
-- Creates all tables for clinical cases, curriculum, knowledge graph,
-- monographs, and AI-generated study resources.
-- ================================================================

-- ================================================================
-- Helper: updated_at trigger function
-- ================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ================================================================
-- Clean slate for Clinova tables (re-seeded by pipeline scripts)
-- ================================================================

DROP TABLE IF EXISTS quiz_questions CASCADE;
DROP TABLE IF EXISTS flashcards CASCADE;
DROP TABLE IF EXISTS study_guides CASCADE;
DROP TABLE IF EXISTS knowledge_graph_relationships CASCADE;
DROP TABLE IF EXISTS knowledge_graph_nodes CASCADE;
DROP TABLE IF EXISTS drug_monographs CASCADE;
DROP TABLE IF EXISTS disease_monographs CASCADE;
DROP TABLE IF EXISTS case_tags CASCADE;
DROP TABLE IF EXISTS content_tags CASCADE;
DROP TABLE IF EXISTS case_learning_objectives CASCADE;
DROP TABLE IF EXISTS learning_objectives CASCADE;
DROP TABLE IF EXISTS clinical_cases CASCADE;
DROP TABLE IF EXISTS diseases CASCADE;
DROP TABLE IF EXISTS curriculum_units CASCADE;
DROP TABLE IF EXISTS curriculum_areas CASCADE;

-- ================================================================
-- Curriculum
-- ================================================================

CREATE TABLE IF NOT EXISTS curriculum_areas (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS curriculum_units (
  id              TEXT PRIMARY KEY,
  area_id         TEXT NOT NULL REFERENCES curriculum_areas(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  estimated_hours INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_curriculum_units_area ON curriculum_units(area_id);

-- ================================================================
-- Diseases
-- ================================================================

CREATE TABLE IF NOT EXISTS diseases (
  id        TEXT PRIMARY KEY,
  name      TEXT NOT NULL,
  aliases   TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ================================================================
-- Learning Objectives
-- ================================================================

CREATE TABLE IF NOT EXISTS learning_objectives (
  id         TEXT PRIMARY KEY,
  unit_id    TEXT NOT NULL REFERENCES curriculum_units(id) ON DELETE CASCADE,
  statement  TEXT NOT NULL,
  difficulty TEXT
);

CREATE INDEX idx_lo_unit ON learning_objectives(unit_id);

-- ================================================================
-- Clinical Cases
-- ================================================================

CREATE TABLE IF NOT EXISTS clinical_cases (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seed_id         TEXT UNIQUE,
  title           TEXT NOT NULL,
  specialty       TEXT NOT NULL,
  disease         TEXT NOT NULL,
  disease_id      TEXT REFERENCES diseases(id),
  unit_id         TEXT REFERENCES curriculum_units(id),
  difficulty      TEXT CHECK (difficulty IN ('Beginner','Intermediate','Advanced')),
  patient_name    TEXT,
  facility_setting TEXT,
  demographics    TEXT,
  chief_complaint TEXT,
  hpi             TEXT,
  pmh             TEXT,
  med_hx          TEXT,
  allergies       TEXT,
  pe              TEXT,
  vitals          TEXT,
  labs            TEXT,
  imaging         TEXT,
  diagnosis       TEXT NOT NULL,
  ddx             TEXT[] DEFAULT '{}',
  goals           TEXT,
  pharm           TEXT,
  non_pharm       TEXT,
  care_plan       TEXT,
  dtps            TEXT,
  monitoring      TEXT,
  counselling     TEXT,
  follow_up       TEXT,
  pearls          TEXT,
  "references"    TEXT[] DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),
  status          TEXT DEFAULT 'published' CHECK (status IN ('published','draft','archived')),
  created_by      TEXT DEFAULT 'system',
  created_by_name TEXT DEFAULT 'Clinical Faculty',
  version         INT DEFAULT 1
);

CREATE INDEX idx_clinical_cases_seed     ON clinical_cases(seed_id);
CREATE INDEX idx_clinical_cases_unit     ON clinical_cases(unit_id);
CREATE INDEX idx_clinical_cases_disease  ON clinical_cases(disease_id);
CREATE INDEX idx_clinical_cases_status   ON clinical_cases(status);
CREATE INDEX idx_clinical_cases_specialty ON clinical_cases(specialty);
CREATE INDEX idx_clinical_cases_difficulty ON clinical_cases(difficulty);
CREATE INDEX idx_clinical_cases_created  ON clinical_cases(created_at);

CREATE TRIGGER trg_clinical_cases_updated
  BEFORE UPDATE ON clinical_cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- Case ↔ Learning Objectives junction
-- ================================================================

CREATE TABLE IF NOT EXISTS case_learning_objectives (
  case_id      UUID NOT NULL REFERENCES clinical_cases(id) ON DELETE CASCADE,
  objective_id TEXT NOT NULL REFERENCES learning_objectives(id) ON DELETE CASCADE,
  PRIMARY KEY (case_id, objective_id)
);

CREATE INDEX idx_clo_case      ON case_learning_objectives(case_id);
CREATE INDEX idx_clo_objective ON case_learning_objectives(objective_id);

-- ================================================================
-- Content Tags
-- ================================================================

CREATE TABLE IF NOT EXISTS content_tags (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS case_tags (
  case_id UUID NOT NULL REFERENCES clinical_cases(id) ON DELETE CASCADE,
  tag_id  UUID NOT NULL REFERENCES content_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (case_id, tag_id)
);

-- ================================================================
-- Monographs
-- ================================================================

CREATE TABLE IF NOT EXISTS disease_monographs (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  disease_id TEXT REFERENCES diseases(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  content    JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (disease_id)
);

CREATE TRIGGER trg_disease_monographs_updated
  BEFORE UPDATE ON disease_monographs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS drug_monographs (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name               TEXT NOT NULL,
  generic_name       TEXT,
  drug_class         TEXT,
  indications        TEXT[] DEFAULT '{}',
  contraindications  TEXT[] DEFAULT '{}',
  side_effects       TEXT[] DEFAULT '{}',
  dosage             JSONB,
  interactions       TEXT[] DEFAULT '{}',
  monitoring         TEXT,
  patient_counselling TEXT,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER trg_drug_monographs_updated
  BEFORE UPDATE ON drug_monographs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- Knowledge Graph
-- ================================================================

CREATE TABLE IF NOT EXISTS knowledge_graph_nodes (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id   TEXT NOT NULL,
  label       TEXT NOT NULL,
  description TEXT,
  metadata    JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (entity_type, entity_id)
);

CREATE INDEX idx_kg_nodes_type ON knowledge_graph_nodes(entity_type, entity_id);

CREATE TABLE IF NOT EXISTS knowledge_graph_relationships (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_node_id    UUID NOT NULL REFERENCES knowledge_graph_nodes(id) ON DELETE CASCADE,
  target_node_id    UUID NOT NULL REFERENCES knowledge_graph_nodes(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  metadata          JSONB DEFAULT '{}',
  created_at        TIMESTAMPTZ DEFAULT now(),
  UNIQUE (source_node_id, target_node_id, relationship_type)
);

CREATE INDEX idx_kg_rel_source ON knowledge_graph_relationships(source_node_id);
CREATE INDEX idx_kg_rel_target ON knowledge_graph_relationships(target_node_id);
CREATE INDEX idx_kg_rel_type   ON knowledge_graph_relationships(relationship_type);

-- ================================================================
-- AI-Generated Study Resources
-- ================================================================

CREATE TABLE IF NOT EXISTS study_guides (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id    UUID NOT NULL REFERENCES clinical_cases(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  content    JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_study_guides_case ON study_guides(case_id);

CREATE TRIGGER trg_study_guides_updated
  BEFORE UPDATE ON study_guides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS flashcards (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id    UUID NOT NULL REFERENCES clinical_cases(id) ON DELETE CASCADE,
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  difficulty TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_flashcards_case ON flashcards(case_id);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id        UUID NOT NULL REFERENCES clinical_cases(id) ON DELETE CASCADE,
  question_type  TEXT NOT NULL,
  question_text  TEXT NOT NULL,
  options        JSONB,
  correct_answer TEXT NOT NULL,
  explanation    TEXT,
  difficulty     TEXT,
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_quiz_questions_case ON quiz_questions(case_id);

-- ================================================================
-- Row-Level Security
-- ================================================================

-- Enable RLS on all user-facing tables
ALTER TABLE curriculum_areas            ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum_units            ENABLE ROW LEVEL SECURITY;
ALTER TABLE diseases                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_objectives         ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_cases              ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_learning_objectives    ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_tags                ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_tags                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE disease_monographs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE drug_monographs             ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_graph_nodes       ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_graph_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_guides                ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions              ENABLE ROW LEVEL SECURITY;

-- === SELECT policies: everyone can read ===

CREATE POLICY "Anyone can read curriculum_areas"
  ON curriculum_areas FOR SELECT USING (true);

CREATE POLICY "Anyone can read curriculum_units"
  ON curriculum_units FOR SELECT USING (true);

CREATE POLICY "Anyone can read diseases"
  ON diseases FOR SELECT USING (true);

CREATE POLICY "Anyone can read learning_objectives"
  ON learning_objectives FOR SELECT USING (true);

CREATE POLICY "Anyone can read published clinical_cases"
  ON clinical_cases FOR SELECT USING (status = 'published');

CREATE POLICY "Anyone can read case_learning_objectives"
  ON case_learning_objectives FOR SELECT USING (true);

CREATE POLICY "Anyone can read content_tags"
  ON content_tags FOR SELECT USING (true);

CREATE POLICY "Anyone can read case_tags"
  ON case_tags FOR SELECT USING (true);

CREATE POLICY "Anyone can read disease_monographs"
  ON disease_monographs FOR SELECT USING (true);

CREATE POLICY "Anyone can read drug_monographs"
  ON drug_monographs FOR SELECT USING (true);

CREATE POLICY "Anyone can read knowledge_graph_nodes"
  ON knowledge_graph_nodes FOR SELECT USING (true);

CREATE POLICY "Anyone can read knowledge_graph_relationships"
  ON knowledge_graph_relationships FOR SELECT USING (true);

CREATE POLICY "Anyone can read study_guides"
  ON study_guides FOR SELECT USING (true);

CREATE POLICY "Anyone can read flashcards"
  ON flashcards FOR SELECT USING (true);

CREATE POLICY "Anyone can read quiz_questions"
  ON quiz_questions FOR SELECT USING (true);

-- === INSERT/UPDATE/DELETE: only authenticated users ===

CREATE POLICY "Authenticated users can insert clinical_cases"
  ON clinical_cases FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update own clinical_cases"
  ON clinical_cases FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete own clinical_cases"
  ON clinical_cases FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage study_guides"
  ON study_guides FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage flashcards"
  ON flashcards FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage quiz_questions"
  ON quiz_questions FOR ALL USING (auth.role() = 'authenticated');

-- Service role bypass (implicit — service_role key bypasses RLS by default)

-- ================================================================
-- Seed: Curriculum Areas & Units (17 integrated + supporting)
-- ================================================================

INSERT INTO curriculum_areas (id, title, description) VALUES
  ('pharmacology', 'Pharmacology', 'Drug mechanisms, kinetics, dynamics, and toxicology.'),
  ('clinical_pharm', 'Clinical Pharmacy & Therapeutics', 'Disease management and patient care across integrated therapeutic areas.'),
  ('supporting', 'Supporting Sciences', 'Foundational sciences for pharmacy and medicine.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO curriculum_units (id, area_id, title, description, estimated_hours) VALUES
  -- Pharmacology area
  ('pharm-intro', 'pharmacology', 'Introduction to Pharmacology', 'Basic principles of drug action and discovery.', 4),
  ('pharm-gen', 'pharmacology', 'General Pharmacology', 'Receptors, dose-response, and signaling pathways.', 8),
  ('pharm-pk', 'pharmacology', 'Pharmacokinetics', 'ADME — Absorption, Distribution, Metabolism, Excretion.', 12),
  ('pharm-pd', 'pharmacology', 'Pharmacodynamics', 'Drug-receptor interactions and mechanisms of effect.', 10),
  ('pharm-auto', 'pharmacology', 'Autonomic Pharmacology', 'Sympathetic and parasympathetic nervous system drugs.', 14),
  ('pharm-cv', 'pharmacology', 'Cardiovascular Pharmacology', 'Anti-hypertensives, antiarrhythmics, heart failure drugs.', 18),
  ('pharm-renal', 'pharmacology', 'Renal Pharmacology', 'Diuretics and drugs affecting fluid/electrolyte balance.', 10),
  ('pharm-resp', 'pharmacology', 'Respiratory Pharmacology', 'Bronchodilators, anti-inflammatories, asthma/COPD drugs.', 12),
  ('pharm-gi', 'pharmacology', 'Gastrointestinal Pharmacology', 'Antacids, antiemetics, laxatives, prokinetics.', 10),
  ('pharm-endo', 'pharmacology', 'Endocrine Pharmacology', 'Insulin, oral hypoglycemics, thyroid drugs, corticosteroids.', 16),
  ('pharm-vit', 'pharmacology', 'Vitamins & Minerals', 'Therapeutic uses and deficiencies of essential nutrients.', 6),
  ('pharm-cns', 'pharmacology', 'Central Nervous System Pharmacology', 'Antidepressants, antipsychotics, anxiolytics, anesthetics.', 20),
  ('pharm-chemo', 'pharmacology', 'Chemotherapy', 'Principles of antimicrobial and antineoplastic therapy.', 8),
  ('pharm-anti', 'pharmacology', 'Antimicrobial Pharmacology', 'Antibiotics, antivirals, antifungals, antiparasitics.', 24),
  ('pharm-tox', 'pharmacology', 'Toxicology', 'Poisoning, antidotes, environmental toxins.', 12),
  ('pharm-onc', 'pharmacology', 'Oncology Pharmacology', 'Targeted therapies, immunotherapies, cytotoxics.', 16),
  ('pharm-derm', 'pharmacology', 'Dermatological Pharmacology', 'Topical agents, acne treatments, immunosuppressants.', 8),
  ('pharm-ophth', 'pharmacology', 'Ophthalmic Pharmacology', 'Glaucoma drops, mydriatics, ocular therapeutics.', 6),
  ('pharm-vet', 'pharmacology', 'Veterinary Pharmacology', 'Cross-species pharmacology.', 5),
  -- Clinical Pharmacy & Therapeutics — 17 Integrated Units
  ('cp-cv', 'clinical_pharm', 'Cardiovascular Pharmacotherapy', 'Hypertension, heart failure, ischaemic heart disease, arrhythmias.', 25),
  ('cp-resp', 'clinical_pharm', 'Respiratory Pharmacotherapy', 'Asthma, COPD, pneumonia, tuberculosis.', 15),
  ('cp-id', 'clinical_pharm', 'Infectious Diseases & Antimicrobial Pharmacotherapy', 'Pneumonia, UTI, meningitis, HIV/AIDS, TB, malaria.', 30),
  ('cp-endo', 'clinical_pharm', 'Endocrine Pharmacotherapy', 'Diabetes, thyroid, adrenal disorders.', 18),
  ('cp-gi', 'clinical_pharm', 'Gastrointestinal Pharmacotherapy', 'PUD, GERD, IBD, liver cirrhosis.', 16),
  ('cp-renal', 'clinical_pharm', 'Renal & Electrolyte Pharmacotherapy', 'AKI, CKD, electrolyte disorders.', 14),
  ('cp-neuro', 'clinical_pharm', 'Central Nervous System Pharmacotherapy', 'Epilepsy, stroke, psychiatric disorders, neurodegenerative.', 38),
  ('cp-onc', 'clinical_pharm', 'Haematology & Oncology Pharmacotherapy', 'Solid tumours, haematological malignancies, anaemias.', 34),
  ('cp-rheum', 'clinical_pharm', 'Rheumatology & Musculoskeletal Pharmacotherapy', 'Osteoarthritis, RA, gout, SLE.', 12),
  ('cp-obgyn', 'clinical_pharm', 'Obstetrics & Gynaecology Pharmacotherapy', 'Pregnancy, contraception, menopause.', 14),
  ('cp-peds', 'clinical_pharm', 'Paediatric Pharmacotherapy', 'Neonatal care, paediatric dosing, immunizations.', 15),
  ('cp-ger', 'clinical_pharm', 'Geriatric Pharmacotherapy', 'Polypharmacy, Beers criteria, deprescribing.', 10),
  ('cp-derm', 'clinical_pharm', 'Dermatology Pharmacotherapy', 'Acne, psoriasis, eczema, fungal infections.', 8),
  ('cp-ophth', 'clinical_pharm', 'Ophthalmology Pharmacotherapy', 'Glaucoma, conjunctivitis, cataracts.', 6),
  ('cp-ent', 'clinical_pharm', 'ENT Pharmacotherapy', 'Otitis media, sinusitis, pharyngitis.', 6),
  ('cp-em', 'clinical_pharm', 'Emergency & Critical Care', 'ACLS, sepsis, shock, toxicologic emergencies.', 42),
  ('cp-tox', 'clinical_pharm', 'Toxicology & Poison Management', 'Drug overdose, chemical poisoning, antidotes.', 12),
  -- Supporting Sciences
  ('sup-anat', 'supporting', 'Anatomy', 'Gross anatomy, neuroanatomy, histology.', 30),
  ('sup-phys', 'supporting', 'Physiology', 'Body systems and homeostatic mechanisms.', 35),
  ('sup-biochem', 'supporting', 'Biochemistry', 'Metabolism, enzymology, molecular biology.', 30),
  ('sup-path', 'supporting', 'Pathology', 'Cell injury, inflammation, disease processes.', 25),
  ('sup-micro', 'supporting', 'Microbiology', 'Bacteriology, virology, mycology, parasitology.', 25),
  ('sup-immuno', 'supporting', 'Immunology', 'Innate/adaptive immunity, hypersensitivity.', 15),
  ('sup-medchem', 'supporting', 'Medicinal Chemistry', 'Drug design, SAR.', 25),
  ('sup-pharmchem', 'supporting', 'Pharmaceutical Chemistry', 'Analytical techniques, QC.', 20),
  ('sup-orgchem', 'supporting', 'Organic Chemistry', 'Reaction mechanisms, functional groups.', 25),
  ('sup-pharmanal', 'supporting', 'Pharmaceutical Analysis', 'Spectroscopy, chromatography.', 20),
  ('sup-pharmaceutics', 'supporting', 'Pharmaceutics', 'Dosage forms, biopharmaceutics.', 30),
  ('sup-pharmacog', 'supporting', 'Pharmacognosy', 'Natural products, herbal medicines.', 15),
  ('sup-pubhealth', 'supporting', 'Public Health', 'Epidemiology, health systems, prevention.', 15)
ON CONFLICT (id) DO NOTHING;
