-- ================================================================
-- Pharmaceutical Industry Integration — Schema
-- Migration 000016
-- ================================================================

-- 1. Pharmaceutical Topics (hierarchical categories)
CREATE TABLE IF NOT EXISTS pharmaceutical_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  parent_id UUID REFERENCES pharmaceutical_topics(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pharma_topics_parent ON pharmaceutical_topics(parent_id);
CREATE INDEX IF NOT EXISTS idx_pharma_topics_slug ON pharmaceutical_topics(slug);

ALTER TABLE pharmaceutical_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read pharmaceutical_topics"
  ON pharmaceutical_topics FOR SELECT USING (true);
CREATE POLICY "Authenticated insert pharmaceutical_topics"
  ON pharmaceutical_topics FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated update pharmaceutical_topics"
  ON pharmaceutical_topics FOR UPDATE USING (auth.role() = 'authenticated');

-- 2. Industry Knowledge Entries
CREATE TABLE IF NOT EXISTS industry_knowledge_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES pharmaceutical_topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  difficulty TEXT CHECK (difficulty IN ('basic', 'intermediate', 'advanced')) DEFAULT 'intermediate',
  curriculum_unit_id UUID,
  source TEXT,
  source_url TEXT,
  last_verified DATE,
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_industry_entries_topic ON industry_knowledge_entries(topic_id);
CREATE INDEX IF NOT EXISTS idx_industry_entries_difficulty ON industry_knowledge_entries(difficulty);
CREATE INDEX IF NOT EXISTS idx_industry_entries_tags ON industry_knowledge_entries USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_industry_entries_curriculum ON industry_knowledge_entries(curriculum_unit_id);

ALTER TABLE industry_knowledge_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read industry_knowledge_entries"
  ON industry_knowledge_entries FOR SELECT USING (true);
CREATE POLICY "Authenticated insert industry_knowledge_entries"
  ON industry_knowledge_entries FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated update industry_knowledge_entries"
  ON industry_knowledge_entries FOR UPDATE USING (auth.role() = 'authenticated');

-- 3. Drug-Industry Connections
DO $$ BEGIN
  CREATE TYPE industry_connection_type AS ENUM (
    'manufactured_as',
    'formulation_type',
    'manufacturing_process',
    'quality_consideration',
    'regulatory_note',
    'supply_note',
    'storage_requirement',
    'manufacturer_info',
    'stability_note',
    'packaging_info'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS drug_industry_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drug_id UUID NOT NULL REFERENCES drug_monographs(id) ON DELETE CASCADE,
  knowledge_entry_id UUID NOT NULL REFERENCES industry_knowledge_entries(id) ON DELETE CASCADE,
  connection_type industry_connection_type NOT NULL,
  context TEXT,
  relevance_score REAL DEFAULT 0.8,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_drug_industry_unique
  ON drug_industry_connections(drug_id, knowledge_entry_id, connection_type);
CREATE INDEX IF NOT EXISTS idx_drug_industry_drug ON drug_industry_connections(drug_id);
CREATE INDEX IF NOT EXISTS idx_drug_industry_entry ON drug_industry_connections(knowledge_entry_id);
CREATE INDEX IF NOT EXISTS idx_drug_industry_type ON drug_industry_connections(connection_type);

ALTER TABLE drug_industry_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read drug_industry_connections"
  ON drug_industry_connections FOR SELECT USING (true);
CREATE POLICY "Authenticated insert drug_industry_connections"
  ON drug_industry_connections FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 4. Industry Terms (glossary)
CREATE TABLE IF NOT EXISTS industry_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  definition TEXT NOT NULL,
  topic_id UUID REFERENCES pharmaceutical_topics(id) ON DELETE SET NULL,
  related_terms TEXT[] DEFAULT '{}',
  aliases TEXT[] DEFAULT '{}',
  examples TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_industry_terms_topic ON industry_terms(topic_id);

-- Enable trgm for fuzzy term search if not already available
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS idx_industry_terms_trgm ON industry_terms USING GIN(term gin_trgm_ops);

ALTER TABLE industry_terms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read industry_terms"
  ON industry_terms FOR SELECT USING (true);
CREATE POLICY "Authenticated insert industry_terms"
  ON industry_terms FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated update industry_terms"
  ON industry_terms FOR UPDATE USING (auth.role() = 'authenticated');

-- 5. Kenyan Manufacturers
CREATE TABLE IF NOT EXISTS kenyan_manufacturers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location TEXT,
  products_description TEXT,
  capabilities TEXT[] DEFAULT '{}',
  regulatory_status TEXT,
  website TEXT,
  founded_year INTEGER,
  employee_count TEXT,
  certifications TEXT[] DEFAULT '{}',
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_kenyan_mfr_name ON kenyan_manufacturers(name);

ALTER TABLE kenyan_manufacturers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read kenyan_manufacturers"
  ON kenyan_manufacturers FOR SELECT USING (true);
CREATE POLICY "Authenticated insert kenyan_manufacturers"
  ON kenyan_manufacturers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated update kenyan_manufacturers"
  ON kenyan_manufacturers FOR UPDATE USING (auth.role() = 'authenticated');
