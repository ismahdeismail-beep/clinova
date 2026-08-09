# Plan — Exam Prep: Curriculum Tracks (Traditional vs Revised)

**Date:** 2026-08-09
**Status:** Approved for execution
**Goal:** Restructure Exam Prep so a user entering **Clinical Pharmacy** or **Pharmacology**
first chooses their **curriculum track** (old syllabus vs new syllabus), then sees only that
track's units and papers. Old-syllabus learners keep their past papers; new-syllabus learners
get the current-format mock papers. Modeled on the **Kabarak University BPharm** old→new
curriculum transition ("Kabarak model"), per the user's Clinova Exam Curriculum Sorting System.

## Research summary — Kabarak old vs new (the difference)

| Dimension | OLD (Traditional) | NEW (Revised) |
|---|---|---|
| Unit numbering | Pharmacology I–XIV, Clinical Pharmacy I–XI | Same numbered units, formalized **PHAM codes** (PHAM 3101 – PHAM 5314) |
| Explicit unit additions | VIII (GIT), IX (Chemo I), X (Chemo II) not itemized | VIII GIT (PHAM 4108), IX Chemotherapy I (PHAM 4109), X Chemotherapy II (PHAM 4209) |
| Year/trimester placement | Loosely by year | Formalized: Y3T1→Y5T3 trimester system (3 terms/year) |
| Topic taxonomy | Objective-style blurbs | Per-unit topic lists (see Clinova sorting spec) |
| Curation driver | Kabarak 2023 curriculum review; UoN "curriculum has been revised" | Same — competency/clinical-care shift |

**How Clinova's data already mirrors this:** old units are `source: 'real'` (verbatim past papers)
+ the 8 `exam-*` Clinical Pharmacy units; new units are the `cp-new-*` (5) and `PHARMACOLOGY_NEW_UNITS` (7)
mock units (standard format A=30/B=40/C=30 = 100 marks). Currently both are merged in a **flat list**
per module — the user's first encounter is a wall of units with no track distinction. **Fix: track-first UI.**

## Architecture

- `ExamModuleSpec` gains `tracks: ExamTrackSpec[]` (units stay flattened on the module for
  backwards-compat with `scripts/*` that import `EXAM_PREP_UNITS`).
- `ExamTrackSpec = { id: 'traditional' | 'revised', title, shortLabel, description, badge, units }`.
- Routes: `/knowledge/exam/prep/:moduleId/:trackId/:unitId/:variant` (track-first), with
  legacy-URL fallback (old `:moduleId/:unitId` deep links resolve to the correct track).
- All counts stay **derived at render time** (derived-counts project rule): unit counts,
  paper counts, per-track counts — no hardcoded numbers in JSX.

### Better names (was "old format / new format")

- **Traditional Curriculum** — "Pre-revision syllabus (Pharmacology I–XIV, Clinical Pharmacy
  I–XI). Verbatim past papers kept for learners still studying the old curriculum."
- **Revised Curriculum** — "Current syllabus, standard format (A 30 MCQs · B 40 · C 30 = 100
  marks). Practice papers for learners on the new curriculum."

(Names match real Kenyan university language — UoN: "the curriculum has been revised";
Kabarak: "comprehensive review of our curriculum". One-line changes in `examPrepData.ts`.)

## Tasks

- [x] **T1 — Data (`src/data/examPrepData.ts`)**
  - Add `ExamTrackId`, `ExamTrackSpec`; add `tracks` to `ExamModuleSpec`.
  - Clinical Pharmacy: traditional = 8 `exam-*` units; revised = 5 `cp-new-*` units.
  - Pharmacology: traditional = 12 old units (+ new Veterinary unit, T2); revised = 7 new units.
  - Add helpers: `getModuleTracks(mod)`, `getTrackById(mod, trackId)`, `getTrackUnits(mod, trackId)`.
  - Verify: `npx tsc --noEmit`.

- [x] **T2 — Kabarak alignment metadata (`src/data/examPrepData.ts`)**
  - Add optional `year?: number`, `trimester?: number` to `ExamUnitSpec`.
  - Populate old units from the Kabarak placement (Y3T1 Phar I/II · Y3T2 Phar III/IV ·
    Y3T3 Phar V/VI/VII · Y4T1 GIT+Chemo I · Y4T2 Chemo II · Y5T1 XI/XII · Y5T2 XIII ·
    Y5T3 XIV; CP I Y3T2 · CP II Y3T3 · CP III/IV Y4T1 · CP V/VI Y4T2 · CP VII/VIII Y5T1 ·
    CP IX/X Y5T2 · CP XI Y5T3).
  - Add `pharm-veterinary` (Pharmacology XIII) unit with topics; `source: 'real'`
    (paper not yet available — shows honest "not available" state, curriculum complete).

- [x] **T3 — UI (`src/components/ExamPrepView.tsx`)**
  - Add `TrackCard` (icon per track: `History` / `Sparkles`; derived unit+paper counts).
  - Add `getTrackPaperCount(track)`; keep `getModulePaperCount` derived.
  - `ModuleCard`: add "2 curriculum tracks" derived chip.
  - `ModuleOverview`: add two-track note; keep all counts derived.

- [x] **T4 — Screen (`src/screens/ExamPrepScreen.tsx`)**
  - Track-first flow: hub → module → **track choice** → units → papers.
  - Legacy deep-link resolution (old `/prep/:moduleId/:unitId(/:variant)`).
  - Unit page back-links include track; hub copy updated.

- [x] **T5 — Routes (`src/App.tsx`)**
  - Add `/knowledge/exam/prep/:moduleId/:trackId(/:unitId(/:variant))` routes.

- [x] **T6 — Verify** `npx tsc --noEmit` → `npx vite build` → `npx esbuild server.ts
  --bundle --platform=node --format=cjs --outfile=dist/server.cjs --packages=external`.

- [ ] **T7 — Ship**: commit (`feat(exam): curriculum tracks — Traditional vs Revised`),
  push, `vercel --prod --yes` (canonical `clinova-main.vercel.app`).

## Global constraints

- Prettier: no semicolons, single quotes, trailingComma all, printWidth 100. No comments unless asked.
- Never hardcode counts in the UI — always derive.
- `EXAM_PREP_UNITS` flat export must remain (scripts `merge-papers.ts`, `validate-papers.ts`,
  `generate-new-papers.ts`, `real-counts.ts` depend on it).
- Do not touch `scripts/*` or regenerate `examPrepPapers.ts` — paper data is unchanged.

## Next phase (separate plan)

- Board Exam Prep: expand 3 prediction sets (91 Qs) → **5 sets** (~150 Qs) — new Set 4
  "Clinical Case Scenarios & Patient Cases", Set 5 "Regulatory, Practice & Grand Review".
  Requires content generation + review (pharmacy-research/quality gates). Keep pending.
