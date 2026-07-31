-- ================================================================
-- Medicine Images Table
-- Stores representative images for each medicine in the KDI
-- ================================================================

CREATE TABLE IF NOT EXISTS drug_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  drug_id TEXT NOT NULL,
  generic_name TEXT NOT NULL,
  dosage_form TEXT,
  strength TEXT,
  image_url TEXT,
  thumbnail_url TEXT,
  large_url TEXT,
  medium_url TEXT,
  source TEXT NOT NULL DEFAULT 'wikimedia',
  license TEXT,
  license_url TEXT,
  author TEXT,
  page_url TEXT,
  hash TEXT,
  verified BOOLEAN DEFAULT false,
  quality_score REAL DEFAULT 0.0,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_drug_images_drug_id ON drug_images(drug_id);
CREATE INDEX IF NOT EXISTS idx_drug_images_generic_name ON drug_images(generic_name);
CREATE INDEX IF NOT EXISTS idx_drug_images_dosage_form ON drug_images(dosage_form);
CREATE INDEX IF NOT EXISTS idx_drug_images_source ON drug_images(source);
CREATE INDEX IF NOT EXISTS idx_drug_images_hash ON drug_images(hash);
CREATE INDEX IF NOT EXISTS idx_drug_images_verified ON drug_images(verified);
CREATE INDEX IF NOT EXISTS idx_drug_images_generic_form ON drug_images(generic_name, dosage_form);

CREATE OR REPLACE FUNCTION update_drug_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_drug_images_updated
  BEFORE UPDATE ON drug_images
  FOR EACH ROW EXECUTE FUNCTION update_drug_images_updated_at();

ALTER TABLE drug_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read drug_images"
  ON drug_images FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert drug_images"
  ON drug_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update drug_images"
  ON drug_images FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete drug_images"
  ON drug_images FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Service role can manage drug_images"
  ON drug_images FOR ALL USING (true);