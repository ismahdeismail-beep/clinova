-- ================================================================
-- Clinova — Saved Monographs / User Library
-- Version: 1.0.0
-- Creates user_monographs for personal drug monograph library
-- with tagging, notes, and RLS.
-- ================================================================

-- ================================================================
-- User Monographs
-- ================================================================
CREATE TABLE IF NOT EXISTS user_monographs (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  monograph_id  UUID NOT NULL REFERENCES drug_monographs(id) ON DELETE CASCADE,
  saved_at      TIMESTAMPTZ DEFAULT now(),
  notes         TEXT,
  tags          TEXT[] DEFAULT '{}',

  -- Prevent duplicates
  UNIQUE(user_id, monograph_id)
);

CREATE INDEX IF NOT EXISTS idx_user_monographs_user   ON user_monographs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_monographs_tags   ON user_monographs USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_user_monographs_saved  ON user_monographs(user_id, saved_at DESC);

-- ================================================================
-- RLS
-- ================================================================
ALTER TABLE user_monographs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own monographs"
  ON user_monographs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own monographs"
  ON user_monographs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own monographs"
  ON user_monographs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own monographs"
  ON user_monographs FOR DELETE
  USING (auth.uid() = user_id);
