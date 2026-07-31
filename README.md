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
clinical cases are displayed as initials (e.g. *John Mwangi -> J.M.*) to protect privacy.

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
