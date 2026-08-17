# Pharmaceutical Industry Integration — Design Spec

> **Date:** 2026-08-17
> **Status:** Approved for Implementation
> **Scope:** Phase 1 — Manufacturing & Formulation (MVP)

---

## 1. Overview

Expand Clinova to incorporate pharmaceutical industry knowledge, intelligence, and learning while preserving the existing identity as a pharmacy, pharmacology, pharmacotherapy, clinical cases, and pharmaceutical knowledge platform.

The pharmaceutical industry component is an **extension of Clinova's existing medicine and pharmaceutical knowledge ecosystem**, not a separate application.

**Core principle:** The user should feel that Clinova has become **smarter**, not that a completely different application has been attached to it.

---

## 2. Design Decisions

| Decision              | Choice                                            | Rationale                                                                                     |
| --------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Content sources**   | Hybrid: authoritative web sources + AI generation | Scalable, uses available data, maintains accuracy with source hierarchy                       |
| **UI integration**    | Integrated into existing screens                  | No new navigation complexity; industry tabs in DrugMonographView, ClinicalCases, EducationHub |
| **First phase**       | Manufacturing & Formulation                       | Foundational, tangible, connects to existing drug data                                        |
| **Database approach** | New tables + knowledge graph extension            | Structured data for industry knowledge, flexible relationships via knowledge graph            |
| **AI approach**       | Extend existing RAG pipeline + new skills         | Reuses existing infrastructure, no separate AI system                                         |

---

## 3. Architecture

### 3.1 System Overview

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│  DrugMonographView → Industry tab                       │
│  ClinicalCases → Industry perspective section           │
│  EducationHub → Industry topic navigation               │
│  ExamPrep → Industry-related questions                  │
│  Search → Industry terms in unified results             │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                   RAG PIPELINE                           │
│  RAGRouter → industry intent detection                  │
│  KnowledgeEngine → industry knowledge retrieval         │
│  ContextBuilder → industry context enrichment           │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│               KNOWLEDGE SERVICES                         │
│  IndustryKnowledgeService (new)                         │
│  DrugMonographService (extended with industry links)    │
│  SearchService (extended with industry terms)           │
│  ContentCrawlerService (new — authoritative sources)    │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                SUPABASE DATABASE                         │
│  New tables: pharmaceutical_topics,                    │
│    industry_knowledge_entries,                          │
│    drug_industry_connections,                           │
│    industry_terms, kenyan_manufacturers                 │
│  Extended: knowledge_graph_nodes,                       │
│    knowledge_graph_relationships                        │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Data Flow

**Industry query flow:**

```
User query: "How is amoxicillin manufactured?"
  → RAGRouter.analyzeIntent()
    → detects: manufacturing_query intent
    → extracts: drug = "amoxicillin"
  → KnowledgeEngine.process()
    → drug name extraction → finds amoxicillin
    → drug monograph retrieval → clinical data
    → INDUSTRY: IndustryKnowledgeService.getForDrug("amoxicillin")
      → returns manufacturing process entries
      → returns formulation type (capsule, tablet, suspension)
      → returns quality considerations
    → INDUSTRY: IndustryKnowledgeService.getByTopic("tablet_manufacturing")
      → returns wet granulation, dry granulation, direct compression
  → buildContextForAi()
    → formats clinical + industry knowledge as markdown context
  → AI generates response with cited sources
```

**Drug monograph enrichment flow:**

```
User views DrugMonographView for "Amoxicillin"
  → DrugMonographService.getMonograph("amoxicillin")
  → DrugMonographService.getIndustryConnections("amoxicillin")
    → returns: formulation_types, manufacturing_notes, regulatory_status,
      quality_considerations, storage_requirements, manufacturer_info
  → Renders Industry tab with:
    - Formulation overview (capsule, tablet, suspension, powder)
    - Manufacturing principles (wet granulation for tablets)
    - Quality considerations (stability, moisture sensitivity)
    - Regulatory status (PPB registration, KEML listing)
    - Storage requirements (controlled room temperature)
    - Kenyan manufacturers (if applicable)
```

---

## 4. Database Schema

### 4.1 New Tables

#### `pharmaceutical_topics`

Industry knowledge categories with hierarchy.

```sql
CREATE TABLE pharmaceutical_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  parent_id UUID REFERENCES pharmaceutical_topics(id),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: public read, authenticated write
ALTER TABLE pharmaceutical_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON pharmaceutical_topics FOR SELECT USING (true);
CREATE POLICY "Authenticated insert" ON pharmaceutical_topics FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated update" ON pharmaceutical_topics FOR UPDATE USING (auth.role() = 'authenticated');
```

**Seed topics (hierarchical):**

```
Manufacturing & Formulation
├── Drug Discovery & Development
├── Preclinical Research
├── Formulation Development
│   ├── Tablets
│   ├── Capsules
│   ├── Liquids & Suspensions
│   ├── Creams & Ointments
│   ├── Injections & Sterile Products
│   └── Novel Dosage Forms
├── Manufacturing Processes
│   ├── Wet Granulation
│   ├── Dry Granulation
│   ├── Direct Compression
│   ├── Capsule Filling
│   ├── Liquid Manufacturing
│   └── Sterile Manufacturing
├── Quality Assurance
├── Quality Control
├── Validation
├── Stability Testing
├── Packaging
├── Good Manufacturing Practices (GMP)
└── Scale-Up & Technology Transfer

Regulatory Affairs
├── Pharmaceutical Regulation
├── Product Registration
├── Marketing Authorisation
├── Regulatory Documentation
├── Labelling & Product Information
├── Regulatory Compliance
├── Inspections
├── Good Distribution Practices (GDP)
├── Good Storage Practices (GSP)
├── Regulatory Variations & Renewals
└── Post-Market Requirements

Pharmacovigilance
├── Adverse Drug Reactions
├── Serious Adverse Events
├── Medication Errors
├── Safety Signals
├── Risk Management
├── Post-Market Surveillance
├── Product Recalls
├── Substandard & Falsified Medicines
├── Reporting Principles
└── Medication Safety

Supply Chain
├── Procurement
├── Importation
├── Warehousing
├── Distribution
├── Cold Chain Management
├── Inventory Management
├── Product Traceability
├── Medicine Availability & Shortages
└── Good Distribution Practices

Local Kenyan Industry
├── Kenyan Pharmaceutical Manufacturers
├── Local Production Capacity
├── Regulatory Landscape (PPB)
├── Essential Medicines Manufacturing
├── Regional Pharmaceutical Markets
├── Technology Transfer
└── Pharmaceutical Innovation

Careers & Professional Development
├── Industrial Pharmacy
├── Production
├── Quality Assurance
├── Quality Control
├── Regulatory Affairs
├── Pharmacovigilance
├── Medical Affairs
├── Clinical Research
├── Research & Development
├── Supply Chain Management
├── Market Access & Health Economics
└── Pharmaceutical Entrepreneurship
```

#### `industry_knowledge_entries`

Individual knowledge items linked to topics.

```sql
CREATE TABLE industry_knowledge_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES pharmaceutical_topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  difficulty TEXT CHECK (difficulty IN ('basic', 'intermediate', 'advanced')) DEFAULT 'intermediate',
  curriculum_unit_id UUID REFERENCES curriculum_units(id),
  source TEXT,
  source_url TEXT,
  last_verified DATE,
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_industry_entries_topic ON industry_knowledge_entries(topic_id);
CREATE INDEX idx_industry_entries_difficulty ON industry_knowledge_entries(difficulty);
CREATE INDEX idx_industry_entries_tags ON industry_knowledge_entries USING GIN(tags);
CREATE INDEX idx_industry_entries_curriculum ON industry_knowledge_entries(curriculum_unit_id);

-- RLS
ALTER TABLE industry_knowledge_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON industry_knowledge_entries FOR SELECT USING (true);
CREATE POLICY "Authenticated insert" ON industry_knowledge_entries FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated update" ON industry_knowledge_entries FOR UPDATE USING (auth.role() = 'authenticated');
```

**Content JSONB schema (varies by topic):**

_Manufacturing entry:_

```json
{
  "overview": "Tablet manufacturing involves converting powder blends into solid dosage forms...",
  "principles": ["Particle size reduction", "Blending", "Granulation", "Compression", "Coating"],
  "process_steps": [
    {
      "step": 1,
      "name": "Weighing & Dispensing",
      "description": "Raw materials are weighed according to batch formula...",
      "key_considerations": ["Accuracy", "Contamination prevention", "Material identification"]
    }
  ],
  "equipment": ["Rotary tablet press", "Fluid bed dryer", "High-shear granulator"],
  "quality_controls": [
    "Weight variation",
    "Hardness",
    "Friability",
    "Disintegration",
    "Dissolution"
  ],
  "common_problems": ["Capping", "Lamination", "Sticking", "Picking"],
  "kenya_context": "Local tablet manufacturing in Kenya is expanding with companies like Cosmas, Medisel, and Dawa..."
}
```

_Regulatory entry:_

```json
{
  "overview": "Product registration in Kenya is managed by the Pharmacy and Poisons Board (PPB)...",
  "requirements": ["Marketing Authorisation Application", "GMP certificate", "Product data dossier"],
  "process": [...],
  "timeline": "6-12 months typical",
  "kenya_context": "Kenya is working toward WHO Maturity Level 3...",
  "relevant_legislation": ["Pharmacy and Poisons Act", "Cap 244"],
  "related_organizations": ["PPB", "KEPI", "MOH"]
}
```

#### `drug_industry_connections`

Junction table linking drugs to industry knowledge.

```sql
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

CREATE TABLE drug_industry_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drug_id UUID NOT NULL REFERENCES drug_monographs(id) ON DELETE CASCADE,
  knowledge_entry_id UUID NOT NULL REFERENCES industry_knowledge_entries(id) ON DELETE CASCADE,
  connection_type industry_connection_type NOT NULL,
  context TEXT,
  relevance_score REAL DEFAULT 0.8,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_drug_industry_drug ON drug_industry_connections(drug_id);
CREATE INDEX idx_drug_industry_entry ON drug_industry_connections(knowledge_entry_id);
CREATE INDEX idx_drug_industry_type ON drug_industry_connections(connection_type);

-- Unique constraint: one connection per drug-entry-type
CREATE UNIQUE UNIQUE drug_industry_connection ON drug_industry_connections(drug_id, knowledge_entry_id, connection_type);

-- RLS
ALTER TABLE drug_industry_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON drug_industry_connections FOR SELECT USING (true);
CREATE POLICY "Authenticated insert" ON drug_industry_connections FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

#### `industry_terms`

Glossary of pharmaceutical industry terminology.

```sql
CREATE TABLE industry_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  definition TEXT NOT NULL,
  topic_id UUID REFERENCES pharmaceutical_topics(id),
  related_terms TEXT[] DEFAULT '{}',
  aliases TEXT[] DEFAULT '{}',
  examples TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Fuzzy search index
CREATE INDEX idx_industry_terms_trgm ON industry_terms USING GIN(term gin_trgm_ops);
CREATE INDEX idx_industry_terms_topic ON industry_terms(topic_id);

-- RLS
ALTER TABLE industry_terms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON industry_terms FOR SELECT USING (true);
CREATE POLICY "Authenticated insert" ON industry_terms FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated update" ON industry_terms FOR UPDATE USING (auth.role() = 'authenticated');
```

#### `kenyan_manufacturers`

Local pharmaceutical manufacturer profiles.

```sql
CREATE TABLE kenyan_manufacturers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location TEXT,
  products_description TEXT,
  capabilities TEXT[],
  regulatory_status TEXT,
  website TEXT,
  founded_year INTEGER,
  employee_count TEXT,
  certifications TEXT[],
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE kenyan_manufacturers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON kenyan_manufacturers FOR SELECT USING (true);
CREATE POLICY "Authenticated insert" ON kenyan_manufacturers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated update" ON kenyan_manufacturers FOR UPDATE USING (auth.role() = 'authenticated');
```

### 4.2 Knowledge Graph Extensions

**New node entity types:**

- `manufacturer` — Pharmaceutical companies
- `industry_process` — Manufacturing processes (wet granulation, direct compression)
- `industry_term` — Industry terminology
- `regulatory_body` — PPB, KEPI, WHO
- `industry_topic` — Topic categories

**New relationship types:**

- `DRUG_MANUFACTURED_AS` → Drug → Dosage Form
- `DRUG_MANUFACTURED_BY` → Drug → Manufacturer
- `DRUG_REGULATED_BY` → Drug → Regulatory Body
- `DRUG_PROCESS_USES` → Drug → Industry Process
- `PROCESS_REQUIRES` → Industry Process → Equipment/Technology
- `TOPIC_CONTAINS` → Industry Topic → Knowledge Entry
- `TERM_RELATES_TO` → Industry Term → Industry Topic
- `MANUFACTURER_PRODUCES` → Manufacturer → Drug

---

## 5. Knowledge Engine Extension

### 5.1 New Service: `IndustryKnowledgeService`

**File:** `src/services/industryKnowledge.service.ts`

```typescript
interface IndustryKnowledgeService {
  getByTopic(
    topicSlug: string,
    options?: { difficulty?: string; limit?: number },
  ): Promise<IndustryKnowledgeEntry[]>
  getForDrug(
    drugId: string,
    connectionTypes?: IndustryConnectionType[],
  ): Promise<DrugIndustryConnection[]>
  searchTerms(query: string, limit?: number): Promise<IndustryTerm[]>
  getManufacturers(filters?: {
    location?: string
    capability?: string
  }): Promise<KenyanManufacturer[]>
  getTopicTree(): Promise<PharmaceuticalTopic[]>
  getEntry(entryId: string): Promise<IndustryKnowledgeEntry>
}

interface IndustryKnowledgeEntry {
  id: string
  topic_id: string
  title: string
  content: Record<string, any> // JSONB
  difficulty: 'basic' | 'intermediate' | 'advanced'
  curriculum_unit_id: string | null
  source: string | null
  source_url: string | null
  last_verified: string | null
  tags: string[]
  metadata: Record<string, any>
}

interface DrugIndustryConnection {
  id: string
  drug_id: string
  knowledge_entry_id: string
  connection_type: IndustryConnectionType
  context: string | null
  relevance_score: number
  entry: IndustryKnowledgeEntry
  topic: PharmaceuticalTopic
}

interface IndustryTerm {
  id: string
  term: string
  definition: string
  topic_id: string | null
  related_terms: string[]
  aliases: string[]
  examples: string[]
}

interface KenyanManufacturer {
  id: string
  name: string
  location: string | null
  products_description: string | null
  capabilities: string[]
  regulatory_status: string | null
  website: string | null
}

interface PharmaceuticalTopic {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  parent_id: string | null
  children: PharmaceuticalTopic[]
}

type IndustryConnectionType =
  | 'manufactured_as'
  | 'formulation_type'
  | 'manufacturing_process'
  | 'quality_consideration'
  | 'regulatory_note'
  | 'supply_note'
  | 'storage_requirement'
  | 'manufacturer_info'
  | 'stability_note'
  | 'packaging_info'
```

**Implementation approach:**

- Supabase queries with fallback to bundled data (same pattern as `drugMonograph.service.ts`)
- Cache topic tree and frequently accessed entries
- Batch load drug-industry connections

### 5.2 RAGRouter Extension

**File:** `src/services/ragRouter.ts` (extend existing)

Add new intent types to `analyzeIntent()`:

```typescript
// New intent types
type IntentType =
  | ...existing types...
  | 'manufacturing_query'      // "How is X manufactured?", "Tablet manufacturing process"
  | 'regulatory_query'         // "PPB registration requirements", "Drug regulatory status"
  | 'pharmacovigilance_query'  // "ADR reporting", "Safety signal detection"
  | 'supply_chain_query'       // "Drug distribution", "Cold chain management"
  | 'industry_term_query'      // "What is GMP?", "Define bioavailability"
  | 'manufacturer_query'       // "Who manufactures X in Kenya?", "Local pharmaceutical companies"
  | 'career_query'             // "Pharmaceutical industry careers", "QA career path"
```

**Keyword patterns for intent detection:**

```typescript
const INDUSTRY_INTENT_PATTERNS = {
  manufacturing_query: [
    /manufactur/i,
    /formulat/i,
    /tablet.*process/i,
    /capsule.*process/i,
    /granulation/i,
    /compression/i,
    /coating/i,
    /GMP/i,
    /batch/i,
    /production.*process/i,
    /dosage.*form/i,
    /excipient/i,
    /API/i,
    /active.*pharmaceutical.*ingredient/i,
    /wet.*granulat/i,
    /direct.*compress/i,
    /sterile.*manufactur/i,
  ],
  regulatory_query: [
    /PPB/i,
    /pharmacy.*poisons/i,
    /registration/i,
    /marketing.*authoris/i,
    /regulatory/i,
    /compliance/i,
    /inspection/i,
    /WHO.*prequalif/i,
    /KEML/i,
    /essential.*medicine/i,
    /product.*registration/i,
    /regulatory.*submission/i,
    /dossier/i,
    /CTD/i,
  ],
  pharmacovigilance_query: [
    /pharmacovigilance/i,
    /ADR/i,
    /adverse.*drug.*reaction/i,
    /safety.*signal/i,
    /post.*market/i,
    /recall/i,
    /reporting/i,
    /Yellow.*Card/i,
    /MedSafety/i,
    /substandard/i,
    /falsified/i,
    /counterfeit/i,
    /medication.*safety/i,
  ],
  supply_chain_query: [
    /supply.*chain/i,
    /procurement/i,
    /distribution/i,
    /cold.*chain/i,
    /warehousing/i,
    /inventory/i,
    /KEMSA/i,
    /track.*trace/i,
    /availability/i,
    /shortage/i,
    /importation/i,
    /GDP/i,
    /good.*distribution/i,
    /good.*storage/i,
  ],
  industry_term_query: [
    /what.*is.*GMP/i,
    /define.*GDP/i,
    /explain.*bioequivalen/i,
    /meaning.*of.*API/i,
    /what.*does.*excipient/i,
    /term.*industry/i,
    /glossary/i,
    /terminology/i,
  ],
  manufacturer_query: [
    /who.*manufactur/i,
    /manufacturer/i,
    /company.*produce/i,
    /local.*manufactur/i,
    /Kenyan.*pharmaceutical/i,
    /pharmaceutical.*company/i,
    /industrial.*pharmacy/i,
    /production.*facility/i,
  ],
  career_query: [
    /career/i,
    /job.*pharmaceutical/i,
    /pharmaceutical.*industry.*career/i,
    /QA.*career/i,
    /regulatory.*affairs.*career/i,
    /pharmacovigilance.*career/i,
    /industrial.*pharmacy.*career/i,
    /pharmaceutical.*profession/i,
  ],
}
```

### 5.3 Context Building Extension

**File:** `src/services/ragRouter.ts` — `buildContextForAi()` (extend)

Add industry knowledge as a new context source:

```typescript
// In buildContextForAi()
if (intent.industryRelevant) {
  // Add industry knowledge entries
  const industryEntries = await industryKnowledgeService.getForDrug(drugId)
  if (industryEntries.length > 0) {
    contextSources.push({
      name: 'Pharmaceutical Industry Knowledge',
      relevanceScore: 0.85,
      content: formatIndustryContext(industryEntries),
    })
  }

  // Add industry terms if term query
  if (intent.type === 'industry_term_query') {
    const terms = await industryKnowledgeService.searchTerms(extractedTerms)
    contextSources.push({
      name: 'Industry Terminology',
      relevanceScore: 0.9,
      content: formatTermsContext(terms),
    })
  }
}
```

### 5.4 Search Extension

**File:** `src/services/search.service.ts` (extend existing)

Add industry terms to `unified_search` RPC or extend the client-side search:

```typescript
// Extend unified_search RPC to include industry_terms
// Or add parallel search in the service layer:
async search(query: string) {
  const [existingResults, industryResults] = await Promise.all([
    this.unifiedSearchExisting(query),  // drugs, diseases, cases
    industryKnowledgeService.searchTerms(query)
  ])

  return {
    ...existingResults,
    industryTerms: industryResults
  }
}
```

---

## 6. AI Skills Extension

### 6.1 New Skills

**File:** `src/skills/` (add new skill modules)

#### `pharmaceuticalManufacturing`

```typescript
{
  id: 'pharmaceuticalManufacturing',
  name: 'Pharmaceutical Manufacturing',
  description: 'Manufacturing processes, formulation development, GMP, quality control, and industrial pharmacy',
  triggers: ['manufacturing', 'formulation', 'tablet', 'capsule', 'granulation', 'GMP', 'batch', 'production', 'excipient', 'API', 'dosage form'],
  knowledgeDomains: ['manufacturing', 'formulation', 'quality_assurance', 'quality_control'],
  capabilities: [
    'Explain manufacturing processes for different dosage forms',
    'Describe formulation principles and excipient functions',
    'Explain GMP requirements and compliance',
    'Discuss quality control testing methods',
    'Connect manufacturing concepts to specific drugs',
    'Generate industry-related educational content'
  ]
}
```

#### `regulatoryAffairs`

```typescript
{
  id: 'regulatoryAffairs',
  name: 'Regulatory Affairs',
  description: 'Pharmaceutical regulation, product registration, PPB requirements, and compliance',
  triggers: ['regulatory', 'PPB', 'registration', 'marketing authorisation', 'compliance', 'inspection', 'KEML', 'essential medicines'],
  knowledgeDomains: ['regulatory_affairs', 'product_registration', 'compliance'],
  capabilities: [
    'Explain regulatory frameworks (Kenyan, WHO)',
    'Describe product registration requirements',
    'Discuss GMP/GDP/GSP compliance',
    'Connect regulatory status to specific drugs',
    'Explain PPB functions and processes'
  ]
}
```

#### `pharmacovigilance`

```typescript
{
  id: 'pharmacovigilance',
  name: 'Pharmacovigilance',
  description: 'Drug safety monitoring, ADR reporting, post-market surveillance, and medication safety',
  triggers: ['pharmacovigilance', 'ADR', 'adverse reaction', 'safety signal', 'recall', 'reporting', 'Yellow Card', 'MedSafety'],
  knowledgeDomains: ['pharmacovigilance', 'drug_safety', 'post_market'],
  capabilities: [
    'Explain pharmacovigilance principles',
    'Describe ADR reporting mechanisms',
    'Discuss safety signal detection',
    'Connect PV concepts to specific drugs',
    'Explain post-market surveillance requirements'
  ]
}
```

#### `supplyChainKnowledge`

```typescript
{
  id: 'supplyChainKnowledge',
  name: 'Supply Chain Knowledge',
  description: 'Pharmaceutical supply chain, procurement, distribution, cold chain, and availability',
  triggers: ['supply chain', 'procurement', 'distribution', 'cold chain', 'KEMSA', 'availability', 'shortage', 'inventory'],
  knowledgeDomains: ['supply_chain', 'procurement', 'distribution'],
  capabilities: [
    'Explain supply chain principles',
    'Describe procurement processes',
    'Discuss cold chain management',
    'Connect supply concepts to drug availability',
    'Explain GDP/GSP requirements'
  ]
}
```

#### `kenyanIndustry`

```typescript
{
  id: 'kenyanIndustry',
  name: 'Kenyan Pharmaceutical Industry',
  description: 'Local pharmaceutical manufacturers, PPB, regulatory landscape, and Kenya-specific industry knowledge',
  triggers: ['Kenya', 'Kenyan', 'local manufacturer', 'PPB', 'KEMSA', 'KEPI', 'East Africa'],
  knowledgeDomains: ['kenyan_industry', 'local_manufacturing', 'regulatory_landscape'],
  capabilities: [
    'Provide information on Kenyan pharmaceutical manufacturers',
    'Explain Kenya-specific regulatory landscape',
    'Discuss local manufacturing capacity',
    'Connect Kenya context to global pharmaceutical knowledge'
  ]
}
```

### 6.2 Skill Graph Extension

**File:** `src/server/ai/skills/` (add new SKILL.md files)

Each new skill gets a SKILL.md file following the existing pattern (60+ existing skill files). The skill graph connects:

- `pharmaceuticalManufacturing` → `drugInformation` (connects to drug data)
- `regulatoryAffairs` → `drugInformation` (regulatory status per drug)
- `pharmacovigilance` → `drugInformation` (safety data per drug)
- `supplyChainKnowledge` → `drugInformation` (availability per drug)
- `kenyanIndustry` → `pharmaceuticalManufacturing`, `regulatoryAffairs`, `supplyChainKnowledge`

---

## 7. Frontend Integration

### 7.1 DrugMonographView — Industry Tab

**File:** `src/components/DrugMonographView.tsx` (extend existing)

Add an "Industry" tab/section to the existing drug monograph view.

**New sub-component:** `DrugIndustryTab`

```typescript
interface DrugIndustryTabProps {
  drugId: string
  drugName: string
}

// Displays:
// 1. Formulation Overview
//    - Available dosage forms (tablet, capsule, suspension, etc.)
//    - Common strengths
//    - Formulation-specific notes

// 2. Manufacturing Principles
//    - Brief overview of how this type of product is manufactured
//    - Key process steps (educational level)
//    - Quality considerations

// 3. Quality Considerations
//    - Stability profile
//    - Storage requirements
//    - Common quality issues

// 4. Regulatory Status
//    - PPB registration status (if available)
//    - KEML listing
//    - Essential medicine status

// 5. Kenyan Manufacturers (if applicable)
//    - Local manufacturers producing this drug
//    - Import sources

// 6. Industry Terms
//    - Related industry terms with definitions
```

**Data fetching:**

```typescript
// In DrugMonographView
const industryConnections = await industryKnowledgeService.getForDrug(drugId)
const relatedTerms = await industryKnowledgeService.searchTerms(drugName)
```

### 7.2 ClinicalCases — Industry Perspective

**File:** `src/components/` (extend existing clinical case components)

Add an industry perspective section to clinical case reflections.

**New sub-component:** `CaseIndustryPerspective`

```typescript
interface CaseIndustryPerspectiveProps {
  caseId: string
  drugs: string[] // drugs mentioned in the case
}

// Displays:
// - Formulation considerations for drugs in the case
// - Manufacturing quality relevance
// - Pharmacovigilance connections
// - Supply considerations
// - Regulatory context
```

### 7.3 EducationHub — Industry Topics

**File:** `src/screens/EducationHubScreen.tsx` (extend existing)

Add pharmaceutical industry topics to the curriculum navigation.

- New curriculum area card: "Pharmaceutical Industry"
- Sub-topics: Manufacturing, Regulatory, PV, Supply Chain, Careers
- Each topic links to industry knowledge entries
- Industry learning objectives linked to curriculum units

### 7.4 ExamPrep — Industry Questions

**File:** `src/components/ExamPrepView.tsx` and `src/data/examPrepData.ts` (extend)

Add industry-related questions to exam preparation:

- MCQs on manufacturing processes
- SAQs on regulatory scenarios
- Case-based questions on pharmacovigilance
- Scenario-based questions on supply chain challenges
- Viva questions on GMP compliance

### 7.5 Search — Industry Terms

**File:** `src/services/search.service.ts` (extend)

Extend unified search to include industry terms:

- Industry terms appear in search results with "Industry Term" badge
- Clicking navigates to term definition (tooltip or modal)
- Industry knowledge entries searchable by title and tags

---

## 8. Content Pipeline

### 8.1 Authoritative Source Crawlers

**New file:** `src/server/crawlers/industryCrawler.ts`

**Priority sources:**

| Source                                 | Content                                                     | Reliability                |
| -------------------------------------- | ----------------------------------------------------------- | -------------------------- |
| PPB (Pharmacy and Poisons Board Kenya) | Regulatory information, registered products, GMP compliance | Highest (Kenyan regulator) |
| WHO                                    | Essential medicines, prequalification, guidelines           | Very High                  |
| KEPI                                   | Kenya pharmaceutical information                            | High                       |
| KEMSA                                  | Supply chain data, procurement                              | High (Kenyan MOH)          |
| Peer-reviewed literature               | Manufacturing processes, formulation science                | High                       |
| Textbooks (Industrial Pharmacy, etc.)  | Foundational knowledge                                      | High                       |

**Crawler implementation:**

```typescript
interface IndustryCrawler {
  crawlPPB(): Promise<RegulatoryData[]>
  crawlWHO(): Promise<WHOPrequalificationData[]>
  crawlKEPI(): Promise<KenyaPharmaData[]>
  crawlTextbooks(): Promise<FormulationKnowledge[]>
}
```

**Quality controls:**

- Source attribution required for all crawled data
- Publication date tracking
- Last verification date
- Duplicate detection against existing entries
- Human review flag for high-risk content

### 8.2 AI Content Generation

**New file:** `src/server/industryContentGenerator.ts`

Generate industry knowledge entries from trusted references using Gemini:

```typescript
interface IndustryContentGenerator {
  generateManufacturingEntry(drugName: string, dosageForm: string): Promise<IndustryKnowledgeEntry>
  generateRegulatoryEntry(drugName: string): Promise<IndustryKnowledgeEntry>
  generateTermDefinition(term: string): Promise<IndustryTerm>
  generateManufacturerProfile(companyName: string): Promise<KenyanManufacturer>
}
```

**Source hierarchy enforcement:**

1. Kenyan regulatory authorities (PPB)
2. Kenyan Ministry of Health
3. WHO
4. African regulatory institutions
5. Recognised international regulators (FDA, EMA)
6. Peer-reviewed scientific literature
7. Official pharmaceutical-company documentation
8. Recognised textbooks and academic resources

### 8.3 Seed Data

**Initial seed content for Phase 1 (Manufacturing & Formulation):**

**Topics to seed:**

- Tablet manufacturing (wet granulation, dry granulation, direct compression)
- Capsule manufacturing (hard gelatin, soft gelatin, HPMC)
- Liquid manufacturing (solutions, suspensions, emulsions)
- Cream and ointment manufacturing
- Injectable manufacturing (aseptic, terminal sterilization)
- GMP fundamentals
- Quality control testing
- Stability testing
- Packaging principles
- Excipients and their functions

**Industry terms to seed (50+ initial terms):**

- API, Excipient, Granulation, Compression, Coating, Disintegration, Dissolution, Friability, Hardness, Weight Variation, Content Uniformity, Stability, Shelf Life, Batch, Lot, GMP, GDP, GSP, Validation, Qualification, CAPA, OOS, OOT, Deviation, Change Control, etc.

**Drug-industry connections to seed:**

- Link key drugs (amoxicillin, metformin, enalapril, salbutamol, ibuprofen, ciprofloxacin, omeprazole, Artemether-Lumefantrine) to relevant manufacturing knowledge
- Connect KDI drugs to regulatory status
- Link essential medicines to manufacturing processes

---

## 9. Source Hierarchy & Data Quality

### 9.1 Source Priority

All industry knowledge entries must carry source attribution:

```typescript
interface SourceAttribution {
  source: string // e.g., "PPB", "WHO", "Industrial Pharmacy (Aulton)"
  source_url: string | null
  publication_date: string | null
  last_verified: string // date
  reliability_score: number // 1-5
  is_authoritative: boolean
}
```

### 9.2 Content Classification

Every piece of industry information must be classified:

```typescript
type ContentClassification =
  | 'evidence' // Peer-reviewed, validated
  | 'regulatory' // Official regulatory information
  | 'educational' // Educational/academic content
  | 'commercial' // Company-provided (clearly marked)
  | 'generated' // AI-generated (clearly marked)
```

**Rule:** Commercial claims must never influence clinical recommendations. Manufacturer presence must not imply product superiority.

### 9.3 Verification Workflow

- All crawled data flagged for review before publication
- AI-generated content carries "Generated" classification
- High-risk content (regulatory, safety) requires human review
- Stale data (>1 year) flagged for re-verification
- Conflicting sources resolved by source hierarchy

---

## 10. Files to Create/Modify

### New Files

| File                                                        | Purpose                                       |
| ----------------------------------------------------------- | --------------------------------------------- |
| `supabase/migrations/000016_pharmaceutical_industry.sql`    | New tables and indexes                        |
| `src/services/industryKnowledge.service.ts`                 | Industry knowledge data access                |
| `src/server/industryContentGenerator.ts`                    | AI content generation for industry            |
| `src/server/crawlers/industryCrawler.ts`                    | Authoritative source crawlers                 |
| `src/components/DrugIndustryTab.tsx`                        | Drug monograph industry tab                   |
| `src/components/CaseIndustryPerspective.tsx`                | Clinical case industry perspective            |
| `src/skills/pharmaceuticalManufacturing.ts`                 | Manufacturing AI skill                        |
| `src/skills/regulatoryAffairs.ts`                           | Regulatory AI skill                           |
| `src/skills/pharmacovigilance.ts`                           | PV AI skill                                   |
| `src/skills/supplyChainKnowledge.ts`                        | Supply chain AI skill                         |
| `src/skills/kenyanIndustry.ts`                              | Kenyan industry AI skill                      |
| `src/server/ai/skills/pharmaceuticalManufacturing/SKILL.md` | Manufacturing skill definition                |
| `src/server/ai/skills/regulatoryAffairs/SKILL.md`           | Regulatory skill definition                   |
| `src/server/ai/skills/pharmacovigilance/SKILL.md`           | PV skill definition                           |
| `src/server/ai/skills/supplyChainKnowledge/SKILL.md`        | Supply chain skill definition                 |
| `src/server/ai/skills/kenyanIndustry/SKILL.md`              | Kenyan industry skill definition              |
| `src/data/industryKnowledgeData.ts`                         | Bundled industry knowledge (offline fallback) |
| `src/data/industryTermsData.ts`                             | Bundled industry terms (offline fallback)     |
| `src/data/kenyanManufacturersData.ts`                       | Bundled manufacturer data (offline fallback)  |
| `src/data/industryQuestionBank.ts`                          | Industry-related exam questions               |

### Modified Files

| File                                    | Changes                                        |
| --------------------------------------- | ---------------------------------------------- |
| `src/components/DrugMonographView.tsx`  | Add Industry tab                               |
| `src/screens/EducationHubScreen.tsx`    | Add industry topic navigation                  |
| `src/services/ragRouter.ts`             | Add industry intent patterns, context building |
| `src/services/search.service.ts`        | Add industry term search                       |
| `src/services/drugMonograph.service.ts` | Add industry connections method                |
| `src/engine/knowledgeEngine.service.ts` | Add industry knowledge source                  |
| `src/skills/index.ts`                   | Register new skills                            |
| `src/data/examPrepData.ts`              | Add industry questions                         |
| `src/types/knowledge.ts`                | Add industry-related types                     |
| `server.ts`                             | Add industry API endpoints (if needed)         |

---

## 11. Testing Strategy

### Unit Tests

- `IndustryKnowledgeService` — CRUD operations, search, drug connections
- `RAGRouter` — Industry intent detection accuracy
- `ContextBuilder` — Industry context formatting
- `IndustryContentGenerator` — Content generation quality

### Integration Tests

- Drug monograph with industry tab — data loading, rendering
- Search including industry terms — result ranking
- AI query with industry context — response quality

### Content Quality Tests

- Seed data validation — all entries have source, content, tags
- Industry term definitions — completeness, accuracy
- Drug-industry connections — relevance, accuracy

---

## 12. Phased Implementation

### Phase 1.1: Schema & Foundation

- Database migrations
- IndustryKnowledgeService
- RAGRouter intent extension
- Type definitions

### Phase 1.2: Manufacturing & Formulation Content

- Seed manufacturing knowledge entries
- Seed industry terms
- Drug-industry connections for key drugs
- DrugMonographView Industry tab
- Bundled offline fallback data

### Phase 1.3: AI Integration

- New AI skills (5 skills)
- Skill graph connections
- Context building extension
- Test industry queries

### Phase 1.4: Content Enrichment

- PPB crawler
- WHO crawler
- AI content generation pipeline
- ExamPrep industry questions

### Phase 2: Regulatory & PV (future)

### Phase 3: Supply Chain & Careers (future)

### Phase 4: Intelligence & News (future)

---

## 13. Constraints

- No new top-level navigation — industry content integrates into existing screens
- No separate AI system — extend existing RAG pipeline
- No duplicate drug data — connect to existing drug_monographs via junction table
- Source hierarchy enforcement — all content carries attribution
- Educational focus — no commercial advertising
- Kenya-first context — local manufacturers, PPB, KEPI
- Offline fallback — bundled data when Supabase unavailable
- Prettier: no semicolons, single quotes, trailingComma all, printWidth 100
- TypeScript strict mode
- No comments unless asked

---

## 14. Success Criteria

1. Drug monographs display industry information (formulation, manufacturing, regulatory status)
2. Industry queries are detected and routed correctly by RAGRouter
3. AI responses include industry knowledge when relevant
4. Industry terms are searchable and accessible
5. Manufacturing knowledge connects to specific drugs
6. Content carries source attribution and verification dates
7. No regression in existing functionality
8. `npm run lint` passes
9. Industry questions appear in exam preparation
10. Clinical cases can include industry perspectives
