-- ================================================================
-- Migration: Disease Notes
-- Version: 12
-- Creates the disease_notes table and enables RLS so that
-- the 72 hardcoded disease notes can be served from Supabase
-- with a local fallback, matching the clinical_cases pattern.
-- ================================================================

-- ================================================================
-- Disease Notes
-- Each row == one disease note with full content (overview,
-- diagram, key drugs, MCQs, Kenya context, pathophysiology).
-- ================================================================

CREATE TABLE IF NOT EXISTS disease_notes (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  unit_id         TEXT NOT NULL REFERENCES curriculum_units(id) ON DELETE CASCADE,
  specialty       TEXT NOT NULL,
  overview        TEXT NOT NULL,
  kenya_context   TEXT,
  pathophysiology TEXT,
  diagram         TEXT,
  key_drugs       JSONB NOT NULL DEFAULT '[]',
  monitoring      TEXT NOT NULL DEFAULT '',
  mcqs            JSONB NOT NULL DEFAULT '[]',
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_disease_notes_unit    ON disease_notes(unit_id);
CREATE INDEX idx_disease_notes_specialty ON disease_notes(specialty);

CREATE TRIGGER trg_disease_notes_updated
  BEFORE UPDATE ON disease_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- Row-Level Security
-- ================================================================

ALTER TABLE disease_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read disease_notes"
  ON disease_notes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert disease_notes"
  ON disease_notes FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update disease_notes"
  ON disease_notes FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete disease_notes"
  ON disease_notes FOR DELETE USING (auth.role() = 'authenticated');
