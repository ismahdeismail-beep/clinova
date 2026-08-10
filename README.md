<div align="center">

# Clinova — Pharmacy & Clinical Knowledge OS

**An AI-powered clinical education and decision-support platform for pharmacy, nursing, and medical learners, built for the Kenyan (and wider African) context.**

</div>

---

## Overview

Clinova is a full-stack clinical knowledge operating system that combines a structured
disease-monograph library, a Kenya Drug Index (KDI), curated clinical cases, nursing
care plans, AI-assisted tutoring, and exam preparation. Content is authored against a
single, consistent **Standard Disease Discussion Template** so every disease page reads
the same way.

The app is a React 19 + Vite 6 single-page frontend backed by an Express server
(`server.ts`) and Supabase (Auth, Postgres, Storage, Realtime). Clinical intelligence is
provided by the Gemini / Google AI Knowledge Engine, while Supabase owns all structured
data, authentication, file storage, and retrieval.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, React Router 7, TypeScript (ESM), Tailwind CSS 4 (Vite plugin) |
| Backend | Express (`server.ts`), deployed as a bundled CJS service |
| Auth / DB / Storage | Supabase (Postgres, Auth, Storage, Realtime, pgvector) |
| AI | Google AI (`@google/genai`) Knowledge Engine + RAG router |
| Analytics | Vercel Analytics + Speed Insights |
| Charts / Diagrams | Recharts, D3, `@xyflow/react` |
| State | Zustand, React context |
| PWA | vite-plugin-pwa (service worker, offline support) |
| Tooling | Vite 6, `tsc --noEmit` for type-check/lint, Prettier, ESLint, esbuild |

## Getting Started

**Prerequisites:** Node.js (>= 18), a Supabase project, and a Gemini API key.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` (and/or `.env`) with your keys:
   ```bash
   GEMINI_API_KEY=your_gemini_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Run the app locally (Express server + Vite dev server):
   ```bash
   npm run dev
   ```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Express dev server (`tsx server.ts`) |
| `npm run build` | Vite frontend build + bundle the server with esbuild |
| `npm run start` | Run the production server (`dist/server.cjs`) |
| `npm run lint` | Type-check the project (`tsc --noEmit`) |
| `npm run supabase:start` / `:stop` | Start / stop local Supabase |
| `npm run db:seed` | Seed the existing database |
| `npm run db:seed:notes` | Seed disease notes into Supabase |
| `npm run db:validate` | Validate the database schema/content |

## Modules & Features

### Education Hub
Integrated clinical pharmacy curriculum covering **17 therapeutic areas** with
disease monographs, study guides, tutor sessions, flashcards, practice quizzes,
and curated online pharmacy resources.

| Area | Contents |
|------|----------|
| Cardiovascular | Heart Failure, Hypertension, ACS, Arrhythmias, Stroke, PAD |
| Respiratory | Asthma, COPD, TB, Pneumonia, COVID-19 |
| Gastrointestinal | GERD, PUD, IBD, Pancreatitis, Liver Cirrhosis |
| Endocrine | Diabetes, Thyroid, Adrenal, Bone & Calcium |
| Infectious Disease | Sepsis, UTI, HIV, Antimicrobial Stewardship |
| Neurology | Stroke, Epilepsy, Parkinson's, Dementia, MS |
| Nephrology | AKI, CKD, Electrolytes, Transplant |
| Oncology | Solid Tumours, Haematological Cancers, Supportive Care |
| Critical Care | Shock, Mechanical Ventilation, Nutrition |
| Paediatrics | Neonatal, Childhood Infections, Development |
| Obstetrics | Pre-eclampsia, Gestational DM, Labour |
| Dermatology | Eczema, Psoriasis, Acne, Infections |
| Ophthalmology | Glaucoma, conjunctivitis, Diabetic Retinopathy |
| Psychiatry | Depression, Bipolar, Schizophrenia, Anxiety |
| Toxicology | Poisoning, Drug Overdose, Antidotes |
| Haematology | Anaemia, Coagulopathy, Sickle Cell |
| Rheumatology | RA, SLE, Gout, Ankylosing Spondylitis |

### Clinical Cases
Real-world clinical scenarios across all therapeutic areas with guided feedback,
diagnostic reasoning, and treatment planning exercises.

### Nursing Care Plans
Structured **NANDA / NIC / NOC** care plans across **19 specialties** with **92 fully
detailed plans** covering pathophysiology, nursing diagnoses, goals, interventions,
and rationales.

| Specialty | Detailed Plans |
|-----------|---------------|
| Cardiovascular | Heart Failure, Hypertension, ACS |
| Respiratory | Asthma, COPD |
| Infectious Disease | Sepsis |
| Endocrine | Diabetes Mellitus |
| Neurological | Stroke |
| Obstetric | Antenatal Care |
| Emergency/Critical | Shock |
| + 7 more | GI, Renal, Oncology, Paediatric, Geriatric, Dermatology, Ophthalmology |

### Drug Index
Comprehensive **1,000-drug** Kenya Drug Index with monographs covering dosing,
interactions, contraindications, adverse effects, and therapeutic monitoring.
Color-coded by drug class (16 classes). Supports brand name search and fuzzy matching.

### Exam & Board Exam
Mock papers modelled on the real clinical-pharmacy exam in standard 30/40/30 format,
plus a dedicated Board Exam module for focused preparation.

### Clinova Support
AI-powered clinical assistant to audit regimens, answer drug questions, and suggest
evidence-based optimisations from trusted references. Features indication-based
search, fuzzy drug name extraction, and expanded clinical intent recognition.

### Settings & Notifications
- Profile management and clinical focus areas
- Browser push notification toggle
- Recent notifications panel with mark-all-read
- Sign out functionality

### Mobile Navigation
Bottom navigation bar (mobile) with quick access to: Home, Education Hub, Drug Index,
Exam, and Care Plans. Respects safe-area-inset for notch/home indicator support.

## Project Structure

```
src/
  screens/           # Route screens (Dashboard, EducationHub, ClinicalCases,
                     # DrugIndex, ClinicalAssistant, ExamScreen, BoardExam,
                     # ExamPrep, CarePlan, Settings, Login, Landing, Library)
  components/        # Reusable UI + domain components
    BottomNav.tsx    # Mobile bottom navigation bar
    DrugMonographView.tsx
    ExamPrepView.tsx
    SavedMonographsPanel.tsx
    DailySpotlight.tsx
    ClinovaLogo.tsx
    ThemeToggle.tsx
    InstallPWA.tsx
  data/              # Local clinical content
    carePlanData.ts  # NANDA/NIC/NOC care plan data (19 specialties, 92 plans)
    curriculum.ts    # Education module definitions (17 therapeutic areas)
    drugIndexData.ts # 1,000 drug monographs
    drugClassColors.ts # 16 drug class color mappings
    clinicalCasesData.ts
    diseaseNotes.ts
    navigationConfig.ts
    examPrepData.ts / examPrepPapers.ts
  contexts/          # React contexts (Auth, Theme, Notification, Cache, UIMode)
  engine/            # Knowledge Engine (AI reasoning, RAG, fuzzy search)
  services/          # Business logic (search, education, export, disease notes)
  server.ts          # Express entrypoint (API + static serving)
  server/            # AI skills (30+ clinical skill modules)
```

## Disease Knowledge Model

Every disease in `src/data/diseaseNotes.ts` follows the **36-section Standard Disease
Discussion Template**, including:

- `alternativeNames`, `icd10` / `icd11`, `definition`, `epidemiology`
- `etiology`, `riskFactors` (modifiable / non-modifiable)
- `clinicalFeatures`, `signs`, `redFlags`, `complications`
- `differential` (with similarities / differences), `investigations`, `diagnosis`
- `severityScores`, `management` (goals / immediate / definitive / longTerm)
- `nonPharmacological`, `prevention`, `prognosis`, `counseling`
- `specialPopulations`, `clinicalPearls`, `commonMistakes`, `drugTherapyProblems`
- `guidelines`, `faq`, `caseExample`, `references`, `metadata`

Each disease also carries a **Kenya-context** block and, where relevant, a **mechanism
diagram** rendered from `src/data/diseaseMechanismDiagrams.ts`. Patient identifiers in
clinical cases are displayed as initials (e.g. *John Mwangi → J.M.*) to protect privacy.

## Analytics

Clinova uses **Vercel Analytics** and **Vercel Speed Insights** for privacy-friendly,
zero-config web analytics and Core Web Vitals tracking. No cookies or personal data
are collected. Analytics are integrated at the app root via `<Analytics />` and
`<SpeedInsights />` components.

## Guidelines & Conventions

- **TypeScript** (ESM), React 19 + Vite 6, Express backend; Supabase is the primary backend.
- Verify edits with `npm run lint` (`tsc --noEmit`).
- Prettier: no semicolons, single quotes, `trailingComma: all`, `printWidth: 100`.
- Do **not** add code comments unless explicitly requested.

## License

Internal / educational use.

---

## Exam Prep — 3-Paper Minimum Coverage (2026-08-09)

Clinova now provides **3 papers per unit** across all 33 exam-prep units, meeting the
**3-paper minimum** standard. This is the result of a comprehensive gap-filling
operation:

### What was filled

| Category | Details |
|----------|---------|
| **Real second sittings** (3 units) | `pharm-cardiovascular` v2 (PHAM 3306, July 2019), `pharm-anticancer-derm-ocular` v2 (PHAM 5111, Special Exam), `pharm-vitamins-hormones` v2 (PHAM 5112, regular sitting) — curated by the parallel session via `scripts/fix-second-sittings.mjs` |
| **Generated papers** (24 units) | 23 via Mistral (old-extras pipeline), 1 hand-written (vet v1) — `scripts/generate-old-extras.ts` |
| **Merge** | `scripts/merge-papers.ts` preserves ALL OLD variants + merges `scripts/out/old-extras/*.json` |
| **UI** | `getPaperCount` fully variant-derived (3→2→1→0); `ExamPrepScreen` renders `Array.from({ length: getPaperCount(unit) })` |

### Coverage verification

- **33/33 units** with papers (was 32/33; `pharm-veterinary` was the only missing unit)
- **99 total papers** (was 72)
- **0 validation issues** (`npx tsx scripts/validate-papers.ts`)
- All 13 real OLD units resolve 3 variants; runtime resolution verified

### Paper structure (standard 30/40/30 format)

- **Section A**: 30 MCQs (4 options each, one correct answer + explanation)
- **Section B**: 6 Short Answer Questions (40 marks total, 5 marks each)
- **Section C**: 2 Long Answer Questions (30 marks total, 15 marks each)

### Papers generated

| Unit | Type | Papers |
|------|------|--------|
| `pharm-veterinary` | Hand-written v1 | 1 |
| `pharm-veterinary` | Mistral v2 | 1 |
| `pharm-veterinary` | Mistral v3 | 1 |
| 9 OLD units (gen-principles, autonomic, autacoids, cns, endocrine-resp, gi, chemo-agents, chemo-infections, toxicology) | Mistral v2+v3 | 18 |
| 3 units with real v2 (cardiovascular, anticancer-derm-ocular, vitamins-hormones) | Mistral v3 | 3 |
| 12 OLD pharm units (v1 only) | — | 12 |
| **Total** | | **99** |

### Pipeline scripts

| Script | Purpose |
|--------|---------|
| `scripts/parse-old-papers.mjs` | Parses real second-sitting txt files into structured JSON (PICKS + TITLES) |
| `scripts/convert-parsed-papers.mjs` | Converts parsed JSON → `examPrepPapersOldPharm.ts` (stems + options, NO answer keys) |
| `scripts/merge-answer-keys.mjs` | Merges answer keys (variant 1 + variant 2) into `examPrepPapersOldPharm.ts` |
| `scripts/merge-papers.ts` | Merges EXAM_PREP_PAPERS + OLD + NEW + old-extras into `examPrepPapers.ts` |
| `scripts/generate-new-papers.ts` | Mistral generator for NEW curriculum mock papers (3 variants each) |
| `scripts/generate-old-extras.ts` | Mistral generator for OLD-extras papers (v2+v3, vet v1-v3) |
| `scripts/validate-papers.ts` | Coverage audit (33/33 units, 0 issues) |
| `scripts/fix-second-sittings.mjs` | Curates real second-sitting papers (split B/C, rebuild sections) |

### Excluded papers (knowledge recorded, not added)

| Paper | Unit | Reason |
|-------|------|--------|
| PHAM 2340 Social & Behavioral Pharmacy I | — | Outside Clinical Pharmacy + Pharmacology scope |
| PHAM 2353 Pharmaceutical Chemistry II | — | Outside Clinical Pharmacy + Pharmacology scope |
| PHAM 2364 Pharmacognosy I | — | Outside Clinical Pharmacy + Pharmacology scope |

### Board Exam 5 Prediction Sets (commit `c199bc5`)

The Board Exam module was expanded to **5 prediction sets** (sets 4 & 5 added):
- Set 4: blue/Stethoscope (`bg-blue-500/15`, `text-blue-500`, `border-blue-500/20`)
- Set 5: rose/ShieldCheck (`bg-rose-500/15`, `text-rose-500`, `border-rose-500/20`)
- `SET_NUMBER: Record<string, 1 | 2 | 3 | 4 | 5>` with 5 entries
- Set-grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (5 cards: 3+2 on desktop)
- Set-count chip: `{SET_INFO.length} Prediction Sets` (was hardcoded "3")
- Verified: tsc clean, vite build (87 precache entries), esbuild OK

### Supabase Architecture

Supabase serves as the primary backend for Clinova. It is responsible for:

- **User authentication** (registration, login, sessions, OAuth)
- **User authorization** (RLS, permission-based access)
- **Database management** (Postgres, full-text search, indexed queries)
- **File storage** (PDF, Word, PPTX, images, lecture notes, generated reports)
- **Real-time synchronization** (notes, folder updates, uploaded resources, learning progress)
- **Search support** (full-text search, indexed queries, metadata filtering, semantic search)
- **Vector search** (embeddings for educational documents, notes, clinical cases, study guides)
- **Metadata storage** (knowledge indexing, progress tracking, user personalization)
- **Background automation** (database triggers, scheduled jobs, data validation)
- **Security** (RLS, secure authentication, permission-based access, storage policies)

Google AI is responsible for clinical reasoning, educational explanations, answer generation, document generation, knowledge synthesis, and study support. Supabase manages and serves the structured and indexed data that the AI reasons over.

---

## CHANGELOG

See `CHANGELOG.md` for the full history.
