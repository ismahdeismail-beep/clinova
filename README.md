<div align="center">

# Clinova — Pharmacy & Clinical Knowledge OS

**An AI-powered clinical education and decision-support platform for pharmacy and medical learners, built for the Kenyan (and wider African) context.**

</div>

---

## Overview

Clinova is a full-stack clinical knowledge operating system that combines a structured
disease-monograph library, a Kenya Drug Index (KDI), curated clinical cases, AI-assisted
tutoring, and exam preparation. Content is authored against a single, consistent
**Standard Disease Discussion Template** so every disease page reads the same way.

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
| Charts / Diagrams | Recharts, D3, `@xyflow/react` |
| State | Zustand, React context |
| Tooling | Vite 6, `tsc --noEmit` for type-check/lint, Prettier, ESLint, esbuild |

## Getting Started

**Prerequisites:** Node.js (≥ 18), a Supabase project, and a Gemini API key.

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

## Project Structure (high level)

```
src/
  screens/          # Route screens (EducationHub, ClinicalCases, DrugIndex,
                    # ClinicalAssistant, BoardExam, Settings, FormBuilder, …)
  components/       # Reusable UI + domain components (forms/, charts/, …)
  data/            # Local clinical content: diseaseNotes.ts, mechanism diagrams,
                    # navigation config, Kenya-context mappings
  context/          # React contexts (Auth, theme, …)
  skills/           # Structured clinical skill modules (drug information, etc.)
  server.ts         # Express entrypoint (API + static serving)
```

> **Note:** The Form Builder feature was removed. Clinical forms are no longer part of
> the shipped app.

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

## Guidelines & Conventions

- **TypeScript** (ESM), React 19 + Vite 6, Express backend; Supabase is the primary backend.
- Verify edits with `npm run lint` (`tsc --noEmit`).
- Prettier: no semicolons, single quotes, `trailingComma: all`, `printWidth: 100`.
- Do **not** add code comments unless explicitly requested.

## License

Internal / educational use.
