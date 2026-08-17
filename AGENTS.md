# Supabase Architecture & Responsibilities in Clinova

## Objective

Supabase serves as the primary backend platform for Clinova. It is responsible for securely storing, organizing, synchronizing, and serving application data while supporting the AI-powered Knowledge Engine.

Supabase should **not** perform AI reasoning. Its role is to provide a scalable, reliable backend that enables the Knowledge Engine and Google AI to operate efficiently.

---

# Core Responsibilities

Supabase is responsible for:

- User authentication
- User authorization
- Database management
- File storage
- Real-time synchronization
- Search support
- Metadata storage
- Knowledge indexing
- Progress tracking
- User personalization
- Security
- Backend automation

---

# Authentication

Supabase Authentication should manage:

- User registration
- Login
- Secure sessions
- Session refresh
- Password recovery
- OAuth providers
- User identities
- User profiles

Every user should have secure access to only their own resources unless content is intentionally shared.

---

# User Profiles

Store information such as:

- Profile information
- Academic preferences
- Learning preferences
- Theme preferences
- AI settings
- Saved workspaces
- Bookmarks
- Progress statistics

Profiles should remain synchronized across devices.

---

# Database

Supabase should be the central source of structured data.

Examples include:

- Users
- Notes
- Folders
- Subfolders
- Uploaded files
- Clinical Cases
- Oral Practice sessions
- Flashcards
- Assessments
- Study Guides
- Disease Monographs
- Drug Monographs
- Learning Objectives
- Curriculum mappings
- Metadata
- AI conversations (where applicable)
- Generated documents
- Learning history
- Search history
- Saved searches

---

# File Storage

Supabase Storage should securely manage:

- PDF documents
- Word documents
- PowerPoint files
- Images
- Lecture notes
- Generated reports
- Generated study guides
- Exported documents
- User uploads

Files should remain linked to their corresponding metadata within the database.

---

# Knowledge Engine Support

Supabase should support the Knowledge Engine by storing:

- Extracted text
- Metadata
- Semantic chunks
- Knowledge relationships
- Curriculum mappings
- Learning objectives
- Disease mappings
- Drug mappings
- Embedding references
- Knowledge Graph data

The Knowledge Engine retrieves this information to provide intelligent educational experiences.

---

# Search Support

Supabase should support fast retrieval through:

- Full-text search
- Indexed queries
- Metadata filtering
- Semantic search (where vector support is enabled)
- Optimized database indexes

Search should remain responsive even as the knowledge base grows.

---

# Vector Search

Where supported, Supabase should store vector embeddings for:

- Educational documents
- Notes
- Clinical Cases
- Study Guides
- Disease Monographs
- Drug Monographs
- User resources

This enables semantic search and retrieval-augmented generation (RAG), allowing the AI to find conceptually related information instead of relying only on keyword matching.

---

# Real-Time Features

Supabase should synchronize:

- Notes
- Folder updates
- Uploaded resources
- Learning progress
- Workspace changes
- Saved documents

This ensures a seamless experience across sessions and devices.

---

# Progress Tracking

Store learner activity including:

- Units studied
- Topics completed
- Clinical Cases completed
- Oral Practice progress
- Assessment scores
- Flashcard progress
- Revision history
- Recently viewed resources

These records support personalized learning and progress monitoring.

---

# AI Memory Support

Supabase should persist AI-related data such as:

- Saved conversations (where enabled)
- User preferences
- Custom instructions
- Generated documents
- Saved summaries
- Personalized study plans

This allows the AI to maintain continuity without relying solely on temporary session context.

---

# Background Automation

Use Supabase features for backend automation, including:

- Database triggers
- Scheduled jobs
- Data validation
- Metadata updates
- Index maintenance
- Cleanup tasks
- Synchronization workflows

Automation should reduce manual maintenance and keep the system consistent.

---

# Security

Implement robust security using:

- Row Level Security (RLS)
- Secure authentication
- Permission-based access
- Secure storage policies
- Input validation
- Database constraints
- Audit logging where appropriate

Users should only access data they are authorized to view.

---

# Relationship with Google AI

Google AI is responsible for:

- Clinical reasoning
- Educational explanations
- Answer generation
- Document generation
- Knowledge synthesis
- Study support

Supabase is responsible for:

- Supplying structured and indexed data
- Storing application data
- Persisting user content
- Managing authentication and storage
- Providing fast, secure retrieval for AI workflows

The AI reasons over knowledge; Supabase manages and serves it.

---

# Scalability

The architecture should support future expansion, including:

- Larger knowledge bases
- Institutional deployments
- Multi-user collaboration
- Faculty-managed content
- Shared libraries
- Advanced analytics
- Offline synchronization
- Additional AI services

The backend should remain modular, secure, and maintainable.

---

# Final Goal

Supabase should function as the secure, scalable foundation of Clinova. It stores, organizes, protects, and synchronizes all educational content, user data, and application resources while enabling fast retrieval for the Knowledge Engine and Google AI. By separating backend responsibilities from AI reasoning, Clinova achieves a robust architecture that is maintainable, performant, and ready to support future growth.

---

# Pharmaceutical Industry Knowledge Base

## Overview

Clinova includes a comprehensive pharmaceutical industry knowledge base that covers the full medicine lifecycle — from manufacturing and quality assurance to regulatory affairs, pharmacovigilance, supply chain, and career development. This knowledge is bundled as static data and served through a dedicated service layer, enabling offline-first access without requiring Supabase.

## Architecture

### Data Layer (Bundled Static Data)

| File                                      | Purpose                                                        | Records               |
| ----------------------------------------- | -------------------------------------------------------------- | --------------------- |
| `src/data/industryKnowledgeData.ts`       | Pharmaceutical topic tree (30+ topics across 6 categories)     | Topics with hierarchy |
| `src/data/industryTermsData.ts`           | Industry glossary (55 searchable terms with aliases, examples) | Terms                 |
| `src/data/industryKnowledgeEntries.ts`    | Detailed knowledge entries with educational content            | 38 entries            |
| `src/data/drugIndustryConnectionsData.ts` | Links between drug index entries and industry knowledge        | 50 connections        |
| `src/data/kenyanManufacturersData.ts`     | 27 real PPB-licensed Kenyan pharmaceutical companies           | 27 manufacturers      |

### Service Layer

`src/services/industryKnowledge.service.ts` — Primary service for all industry data access:

- `getByTopic(topicSlug)` — Returns knowledge entries for a topic (falls back to bundled data)
- `getForDrug(drugId, connectionTypes?)` — Returns drug-industry connections (matches by `drug_id` OR `drug_name`)
- `getTopics(parentId?)` — Returns topic hierarchy
- `getManufacturers()` — Returns all Kenyan manufacturers
- `searchTerms(query)` — Searches glossary terms

### UI Components

| Component                            | Purpose                                                                                |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| `src/screens/IndustryHubScreen.tsx`  | Standalone Industry Hub screen (Topics browser, Glossary, Manufacturers)               |
| `src/components/DrugIndustryTab.tsx` | Industry tab within Drug Monograph view (shows connections + manufacturers for a drug) |

### Types

All industry types are defined in `src/types/knowledge.ts` (lines 597+):

- `PharmaceuticalTopic` — hierarchical topic tree
- `IndustryKnowledgeEntry` — detailed knowledge entries with content object
- `DrugIndustryConnection` — links drugs to industry knowledge
- `IndustryTerm` — glossary term with aliases and examples
- `KenyanManufacturer` — manufacturer profile with PPB registration number
- `IndustryDifficulty` — basic | intermediate | advanced
- `IndustryConnectionType` — manufactured_as | formulation_type | manufacturing_process | quality_consideration | regulatory_note | supply_note | storage_requirement | manufacturer_info | stability_note | packaging_info

### Navigation

Route: `/industry` — lazy-loaded `IndustryHubScreen`
Sidebar nav: "Industry" (Factory icon) in `src/data/navigationConfig.ts`

## Data Flow

1. User opens Drug Monograph → Industry tab → `DrugIndustryTab` loads
2. Tab calls `IndustryKnowledgeService.getForDrug(drugId)` → matches bundled connections by drug_id or drug_name
3. Tab calls `IndustryKnowledgeService.getManufacturers()` → returns all 27 Kenyan manufacturers
4. Connections resolve their `entry` references from `BUNDLED_INDUSTRY_ENTRIES`

User opens Industry Hub → `/industry` route

1. Topics tab loads `BUNDLED_TOPICS` tree
2. Glossary tab loads `BUNDLED_INDUSTRY_TERMS` (searchable)
3. Manufacturers tab loads `BUNDLED_KENYAN_MANUFACTURERS` (filterable)
4. Topic detail view renders entry content with formatted sections

## Content Categories

- **Manufacturing & Formulation** — tablets, capsules, oral liquids, semi-solids, sterile products, wet/dry granulation, direct compression, excipients, packaging/labelling, continuous manufacturing, formulation development, technology transfer
- **Quality** — QA systems, QC testing, process validation, stability testing, GMP
- **Regulatory** — product registration (Kenya PPB), compliance inspections, WHO prequalification, EAC harmonisation, bioequivalence, clinical trials
- **Pharmacovigilance** — ADR classification, safety reporting systems
- **Supply Chain** — procurement, distribution/storage, cold chain, counterfeit medicines, essential medicines
- **Kenya** — manufacturing landscape, PPB regulation (with 2025-2026 reforms)
- **Careers** — industrial pharmacy, regulatory affairs, pharmacovigilance, QA/QC

## Drug-Industry Connections

Connections link 21 drugs to industry knowledge across 9 connection types:

- Manufacturing process (wet granulation, direct compression)
- Formulation type (capsules, tablets, injectables)
- Stability notes (moisture sensitivity, storage conditions)
- Regulatory notes (WHO PQ, KEML status)
- Manufacturer info (local production)
- Storage requirements (cold chain)

Covered drugs: paracetamol, amoxicillin, amoxicillin/clavulanate, artemether/lumefantrine, metformin, enalapril, fluconazole, omeprazole, insulin, zidovudine, ceftriaxone, azithromycin, ciprofloxacin, metronidazole, doxycycline, co-trimoxazole, gentamicin, vancomycin, linezolid, clindamycin, chloramphenicol

## Kenyan Manufacturers (Real PPB Registry Data)

27 companies sourced from medstatus.co.ke PPB registry, including:

- **Active**: Cosmos, Dawa Life Sciences, Beta Healthcare, Biodeal, Autosterile (EA), Cipla QC, Elys Chemical, Lab & Allied, Haleon Kenya, Questa Care, Regal, Sphinx, Square Pharmaceuticals EPZ, Galaxy, Aesthetics, AKU Radiopharmacy, KUTRRH PET, Abacus Pharma, Amanta Healthcare, Biopharma, Tasa Pharma, BOC Kenya, Comet Healthcare, Benmed
- **Suspended**: B. Braun EPZ, Dinlas Pharma
- **Government**: KEMSA

Each entry includes PPB registration number, location, capabilities, certifications, and notes.

## Supabase Relationship

Industry data is bundled for offline-first access. When Supabase is available, the service queries the database first and falls back to bundled data. Database tables (when populated):

- `pharmaceutical_topics`
- `industry_knowledge_entries`
- `drug_industry_connections`
- `industry_terms`
- `kenyan_manufacturers`

---

# Subagent Memory & Tooling

This section helps coding/subagents work effectively in this repo.

## Project Context Memory

Full stack, commands, and conventions are documented in `.opencode/project-context.md`.
Subagents should read it before starting work. Key points:

- TypeScript (ESM), React 19 + Vite 6, Express backend (`server.ts`), Supabase primary backend.
- Verify edits with `npm run lint` (`tsc --noEmit`) and/or `npx eslint .`.
- Prettier: no semicolons, single quotes, trailingComma all, printWidth 100. Do not add comments unless asked.

## Derived Counts (Project Rule — NEVER hardcode counts in the UI)

Every count displayed in the UI must be **derived from source data at render time**.
Whenever content is added or removed (exam units/papers, subjects, modules,
flashcards, drugs, etc.), every display showing a related count must update
automatically — never edit counts by hand. Load the `derived-counts` skill
(`.opencode/skills/derived-counts/SKILL.md`) for the full table of count
displays, paper-count logic, and the add-content checklist.

## Persistent Memory (Supermemory)

The Supermemory tool provides cross-session persistent memory for subagents. It requires:

- Environment variable `SUPERMEMORY_API_KEY` (from https://supermemory.ai).
- Set it in the shell/environment before launching opencode, e.g. add to your profile:
  `setx SUPERMEMORY_API_KEY "your-key-here"` (PowerShell) or in `.env` / shell rc.

Once set, subagents can save/retrieve project facts via the Supermemory tool (scope: `project`).

## LSP on Laptop

- `typescript-language-server` is installed globally (`npm i -g typescript-language-server`) → TS diagnostics + completions in Neovim/VSCode.
- `.vscode/settings.json` + `extensions.json` configure workspace TS SDK, ESLint fixOnSave, Prettier.
- Neovim users: see `nvim-lsp-config.lua` for the LSP setup snippet.
