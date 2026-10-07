# Clinova Project Memory (for subagents)

Auto-compiled reference so coding/subagent tasks start with correct context.

## Stack

- TypeScript (ESM), React 19 + Vite 6 (frontend)
- Express backend (`server.ts`, run via `tsx server.ts` in dev)
- Supabase: DB / Auth / Storage (see `supabase/`, `AGENTS.md`)
- Google Gemini AI via `@google/genai` (Knowledge Engine reasoning)
- Firebase config present (`firebase.json`, `firestore.rules`) but Supabase is primary backend
- State: zustand; Routing: react-router-dom v7; Charts: recharts + d3; Graphs: @xyflow/react; Icons: lucide-react; Validation: zod v4; Styling: tailwindcss v4 (`@tailwindcss/vite`)
- PWA: vite-plugin-pwa with workbox, offline support, precache 92 entries
- Vercel: deployed to https://clinova-main.vercel.app

## Commands

- `npm run dev` — tsx server.ts
- `npm run build` — vite build + esbuild bundle to dist/server.cjs
- `npm run lint` — `tsc --noEmit` (primary type-check, use to verify subagent edits)
- `npx eslint .` — ESLint v9 flat config
- `npm run supabase:migrate` — supabase db reset
- `npm run db:seed` — tsx scripts/seedExistingDb.ts

## Conventions

- Prettier: NO semicolons, single quotes, trailingComma all, printWidth 100
- DO NOT add code comments unless explicitly requested
- Check neighboring files + package.json before adding new libraries
- Mimic existing patterns in `src/`

## Derived Counts (Project Rule)

Every count displayed in the UI must be **derived from source data at render time**.
Never hardcode counts. When content is added/removed, all related count displays
must update automatically. Load the `derived-counts` skill for the full table.

## LSP (laptop)

- `typescript-language-server` 5.3.0 installed globally (npm -g) → Neovim/VSCode diagnostics + completions
- `.vscode/settings.json` uses workspace TS SDK + ESLint fixOnSave
- ESLint v9 flat config + Prettier config added as devDeps

## Layout

- `src/` frontend + app code
- `api/` serverless/api functions
- `functions/` firebase functions
- `supabase/` migrations + config
- `scripts/` db/seed/validation tsx scripts
- `public/` static assets
- `server.ts` Express entry

---

# Full Application Map

## Authentication Flow

- **Unauthenticated**: LandingScreen (`/`) → LoginScreen (`/login`)
- **Authenticated**: Sidebar + TopNav + BottomNav chrome → all app routes
- Auth: Supabase Auth + Firebase Auth (dual)
- User data stored in Firestore + Supabase profiles

## Navigation (unified, 2026-10-06 — minimal)

**One source of truth:** `src/data/navigationConfig.ts` exports `PRIMARY_NAV` (the
sidebar and bottom nav render this exact list — never diverge them) and `MORE_NAV`
(the secondary destinations shown on the `/more` screen).

| Label | Route        | Icon            |
| ----- | ------------ | --------------- |
| Home  | `/`          | LayoutDashboard |
| Learn | `/knowledge` | BookOpen        |
| Drugs | `/drugs`     | Pill            |
| Cases | `/cases`     | FolderOpen      |
| More  | `/more`      | LayoutGrid      |

Secondary destinations live on **MoreScreen** (`/more`): Care Plan, Clinova Support,
Library, Industry, Settings, plus Image Manager when `role === 'admin'` — each with a
one-line description and sign-out.

### Top Navigation Bar (authenticated)

- Hamburger (mobile only) → opens the sidebar
- Logo "CLINOVA" → home
- Search button → `/knowledge`
- Theme toggle, notification bell (badge + panel), avatar → Settings
- No other actions — secondary destinations are on `/more`

### Bottom Navigation (mobile)

`PRIMARY_NAV` (same 5 items as the sidebar). Hidden on `/assistant` (own fixed layout).

### Sidebar (desktop + mobile drawer)

`PRIMARY_NAV` (same 5 items as the bottom nav) + user card + Sign Out footer.

---

## Screen-by-Screen Reference

### DashboardScreen (`/`)

**No tabs.** Single-page home with:

- Hero section (search bar, AI assistant prompt)
- Daily Spotlight (daily reading card)
- Quick Links grid — 8 shortcut cards: Education Hub, Board Exam, Exam Prep, Clinical Cases, Care Plan, Drug Index, Clinova Support, Online Library
- Study Tracks — 6 clinical topic cards (Cardiology, Nephrology, GI, Infectious Disease, Endocrinology, Neurology) with guideline pearls
- Recent Activity / content stats

### EducationHubScreen (`/knowledge`)

**View Mode Toggle**: `grid` | `graph`

**Module Landing** (no unit selected):

- Grid of education modules (Exam, Clinical Pharmacy, Online Books, Clinical Cases, Clinova Support)
- Graph view (admin only) — CurriculumGraph component
- Favorites/starred modules
- Search across modules

**Unit-Level Learning Workspace** (when unit is selected):

| Tab             | Label         | Features                                                    |
| --------------- | ------------- | ----------------------------------------------------------- |
| `overview`      | Study Guide   | AI-generated study guide, static content, PDF/TXT/MD export |
| `disease-notes` | Disease Notes | Disease monographs, searchable by condition                 |
| `tutor`         | Tutor         | AI tutor Q&A session for the unit                           |
| `resources`     | Resources     | Linked library resources, external references               |
| `flashcards`    | Flashcards    | Create/review saved flashcards, spaced repetition           |
| `mcqs`          | Practice Quiz | MCQ practice quiz, auto-generated questions                 |

_Clinical Pharmacy module defaults to `disease-notes` tab only._

### ClinicalCasesScreen (`/cases`)

**3-level breadcrumb drill-down**:

1. **Specialty Grid** (`/cases`) — 17 therapeutic areas with case counts
2. **Case List** (`/cases/:specialtyId`) — cases within specialty
3. **Case Detail** (`/cases/:caseId`) — Patient Presentation, Clinical Reasoning, Treatment Plan, Monitoring, ADRs, Outcome

Search and filtering at specialty level.

### DrugIndexScreen (`/drugs`)

**2 tabs**:

| Tab         | Label      | Features                                                                                                                         |
| ----------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `monograph` | Monographs | Category browse grid (17 therapeutic categories), alphabetical filter, subclass filter, search with type-ahead, drug detail view |
| `library`   | My Library | Saved/pinned monographs, offline access                                                                                          |

**Drug Detail View** (`DrugMonographView` component) — **2 tabs**:

| Tab        | Label                    | Features                                                                                                 |
| ---------- | ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `clinical` | Clinical Monograph       | Full clinical monograph (markdown), dosing, interactions, contraindications, adverse effects, monitoring |
| `industry` | Industry & Manufacturing | `DrugIndustryTab` — manufacturing connections, formulation info, stability notes, Kenyan manufacturers   |

Also includes: Medicine Image Gallery, Pin Offline, Save.

Routes with category/subclass filtering:

- `/drugs/class/:category`
- `/drugs/class/:category/sub/:subclass`

### CarePlanScreen (`/care-plan`)

**3-level drill-down + 5 tabs on detail**:

1. **Specialty Landing** (`/care-plan`) — 19 specialty cards with disease counts
2. **Disease List** (`/care-plan/:specialtyId`) — diseases within specialty
3. **Care Plan Detail** (`/care-plan/:specialtyId/:disease`) — **5 tabs**:

| Tab             | Label             | Features                                        |
| --------------- | ----------------- | ----------------------------------------------- |
| `overview`      | Overview          | Disease overview, pathophysiology, epidemiology |
| `diagnoses`     | Diagnoses & Goals | NANDA nursing diagnoses, NOC goals              |
| `interventions` | Interventions     | NIC interventions, medications, procedures      |
| `education`     | Patient Education | Patient/family education materials              |
| `discharge`     | Discharge         | Discharge planning, follow-up                   |

### IndustryHubScreen (`/industry`)

**3 tabs**:

| Tab             | Label         | Icon      | Features                                                                                                          |
| --------------- | ------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| `topics`        | Topics        | BookOpen  | Hierarchical topic tree (6 categories, 30+ topics), expandable nodes, topic detail view with 38 knowledge entries |
| `glossary`      | Glossary      | FileText  | 55+ searchable pharmaceutical industry terms with aliases, definitions, examples                                  |
| `manufacturers` | Manufacturers | Building2 | 27 real PPB-licensed Kenyan pharmaceutical companies, filterable                                                  |

**Topic Detail View** (drill-down from Topics):

- Back to Topics navigation
- Topic icon + description header
- Knowledge entries (formatted educational content)

### BoardExamScreen (`/knowledge/exam/board-exam`)

**Drill-down navigation**:

1. **Landing** — 5 Prediction Sets, each with 30 questions (MCQ/SAQ/Essay)
2. **Set Detail** (`/:setId`) — Question-by-question quiz flow with MCQ answer selection, SAQ/Essay free-text, difficulty badges, source attribution, explanations

### ExamPrepScreen (`/knowledge/exam/prep`)

**5-level drill-down**:

1. **Module Hub** — Exam prep modules
2. **Module Detail** (`/:moduleId`) — Choose curriculum track
3. **Track Page** (`/:moduleId/:trackId`) — Traditional or Revised syllabus
4. **Unit Page** (`/:moduleId/:trackId/:unitId`) — Paper selection grid
5. **Paper Page** (`/:moduleId/:trackId/:unitId/:variant`) — Full exam paper

### OnlineLibraryScreen (`/library`)

**Context-based filtering**:

- Standalone view: 5 curated sections (Core Textbooks, Kenya Clinical Resources, Formularies, Clinical Guidelines, Open Resources)
- Module context: `/library?module=X`
- Unit context: `/library?module=X&unit=Y`
- Resource types: Textbook, Guideline, Open Resource, Reference, Companion, Handbook, Formulary
- Each resource links externally

### ClinovaSupportScreen (`/assistant`)

**AI chat interface**:

- Chat area: AI-powered clinical Q&A, markdown rendering, citations, confidence scores
- Session sidebar: conversation history, new session, session selection
- Voice input: speech recognition toggle
- Export: Copy chat, Download as PDF/TXT/MD
- Features: Medical term highlighting, dosage badge formatting, RAG-based routing
- Auto-syncs sessions to Firestore every 30 seconds

### MoreScreen (`/more`)

- Single list of secondary destinations (Care Plan, Clinova Support, Library, Industry, Settings, admin-only Image Manager), each navigating on tap
- User card with role + Sign Out
- Entry point for everything that is not in `PRIMARY_NAV`

### SettingsScreen (`/settings`)

**3 sections**:

- Profile: Avatar, name, email, role badge
- Notifications: Push Notifications toggle, Recent Notifications accordion
- Account: Sign Out button

### ReadingScreen (`/reading/:articleId`)

**Single article reader**: Back nav, hero card, numbered sections, related readings

### AdminImageManagerScreen (`/admin/images`)

**MedicineImageManager wrapper**: manage, verify, and crawl medicine images for the Kenya Drug Index

### LandingScreen (`/` — unauthenticated)

**Marketing page**: Sticky top bar, Hero section, Stats bar (Therapeutic Areas, Clinical Cases, Drug Monographs, Care Plans), Features grid (7 cards), How it works (3 steps), Audience cards

### LoginScreen (`/login`)

**Auth form**: Email + Password, Google Sign-In, Sign In / Sign Up toggle

---

# Pharmaceutical Industry Knowledge Base

## Overview

Clinova includes a comprehensive pharmaceutical industry knowledge base covering the full medicine lifecycle — manufacturing, quality assurance, regulatory affairs, pharmacovigilance, supply chain, Kenya-specific context, and careers. Bundled as static data for offline-first access.

## Data Files

| File                                      | Purpose                                                        | Records                     |
| ----------------------------------------- | -------------------------------------------------------------- | --------------------------- |
| `src/data/industryKnowledgeData.ts`       | Pharmaceutical topic tree (30+ topics across 6 categories)     | Topics with hierarchy       |
| `src/data/industryTermsData.ts`           | Industry glossary (55 searchable terms with aliases, examples) | Terms                       |
| `src/data/industryKnowledgeEntries.ts`    | Detailed knowledge entries with educational content            | 38 entries                  |
| `src/data/drugIndustryConnectionsData.ts` | Links between drug index entries and industry knowledge        | 50 connections for 21 drugs |
| `src/data/kenyanManufacturersData.ts`     | 27 real PPB-licensed Kenyan pharmaceutical companies           | 27 manufacturers            |

## Service

`src/services/industryKnowledge.service.ts`:

- `getByTopic(topicSlug)` — Returns knowledge entries for a topic
- `getForDrug(drugId, connectionTypes?)` — Returns drug-industry connections (matches by `drug_id` OR `drug_name`)
- `getTopics(parentId?)` — Returns topic hierarchy
- `getManufacturers()` — Returns all Kenyan manufacturers
- `searchTerms(query)` — Searches glossary terms

## UI

- `src/screens/IndustryHubScreen.tsx` — Standalone screen (Topics, Glossary, Manufacturers tabs)
- `src/components/DrugIndustryTab.tsx` — Industry tab within Drug Monograph view

## Content Categories

- **Manufacturing & Formulation** — tablets, capsules, oral liquids, semi-solids, sterile products, wet/dry granulation, direct compression, excipients, packaging/labelling, continuous manufacturing, formulation development, technology transfer
- **Quality** — QA systems, QC testing, process validation, stability testing, GMP
- **Regulatory** — product registration (Kenya PPB), WHO prequalification, EAC harmonisation, bioequivalence, clinical trials
- **Pharmacovigilance** — ADR classification, safety reporting systems
- **Supply Chain** — procurement, distribution/storage, cold chain, counterfeit medicines, essential medicines
- **Kenya** — manufacturing landscape, PPB regulation (2025-2026 reforms: ML3 benchmarking, traceability system, Practice360)
- **Careers** — industrial pharmacy, regulatory affairs, pharmacovigilance, QA/QC

## Drug-Industry Connections

50 connections linking 21 drugs to industry knowledge: paracetamol, amoxicillin, amoxicillin/clavulanate, artemether/lumefantrine, metformin, enalapril, fluconazole, omeprazole, insulin, zidovudine, ceftriaxone, azithromycin, ciprofloxacin, metronidazole, doxycycline, co-trimoxazole, gentamicin, vancomycin, linezolid, clindamycin, chloramphenicol

## Kenyan Manufacturers (Real PPB Registry Data)

27 companies from medstatus.co.ke: Cosmos, Dawa Life Sciences, Beta Healthcare, Biodeal, Autosterile (EA), Cipla QC, Elys Chemical, Lab & Allied, Haleon Kenya, Questa Care, Regal, Sphinx, Square Pharmaceuticals EPZ, Galaxy, Aesthetics, AKU Radiopharmacy, KUTRRH PET, Abacus Pharma, Amanta Healthcare, Biopharma, Tasa Pharma, BOC Kenya, Comet Healthcare, Benmed, B. Braun EPZ (suspended), Dinlas Pharma (suspended), KEMSA (government)

Each includes PPB registration number, location, capabilities, certifications, notes.

## Types

All in `src/types/knowledge.ts` (line 597+): PharmaceuticalTopic, IndustryKnowledgeEntry, DrugIndustryConnection, IndustryTerm, KenyanManufacturer, IndustryDifficulty, IndustryConnectionType

## Navigation

Route: `/industry` — lazy-loaded IndustryHubScreen
Sidebar: "Industry" (Factory icon) in navigationConfig.ts
