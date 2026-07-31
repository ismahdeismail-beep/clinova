---
name: derived-counts
description: Clinova project rule — every count shown in the UI must be derived from source data at render time, never hardcoded. Use when adding/removing exam units, papers, subjects, modules, flashcards, drugs, or any content whose quantity is displayed somewhere in the app. Triggers on "update the count", "number of subjects", "how many papers", "reflect everywhere", "hardcoded count".
---

# Derived Counts (Never Hardcode)

## The Rule

Any number displayed in the Clinova UI **must be computed from the source data**
at render time. When content is added or removed, every display that shows a
related count must update automatically — do NOT edit counts by hand.

Hardcoded counts rot. The UI and the data will drift apart, exactly as happened
with `count: '8 Subjects'` in `ExamScreen.tsx` (stale after the exam-prep
restructure grew 16 units to 27).

## Known count displays in Clinova (keep in sync)

| Location | What it shows | Must derive from |
|---|---|---|
| `src/screens/ExamScreen.tsx` — `EXAM_MODULES` entry `exam-prep` | `count: '8 Subjects'` (currently hardcoded — FIXED to derive) | `EXAM_PREP_UNITS.length` (or per-module sums) |
| `src/screens/ExamScreen.tsx` — `board-exam` entry | `count: '5 Sets'` | Board exam data (examSets/sources) |
| `src/components/ExamPrepView.tsx` (ModuleCard ~L312) | `{mod.units.length} units · 3 mock papers each` | `mod.units.length` + per-unit paper variant counts |
| `src/components/ExamPrepView.tsx` (intro copy ~L345) | "Each unit has three full mock papers with answers." | Paper availability per unit (`source: 'mock' | 'real'`) |
| `src/components/ExamPrepView.tsx` (PaperCard ~L99-140) | "Mock Paper {variant}" labels + download titles | `spec.source` — real units render "Past Paper" and only variant 1 |
| `src/data/curriculum.ts` — `EDUCATION_MODULES` `exam_prep` | sub-modules list (clinical_pharm only) | Add `pharmacology` sub-module; both derived from `getArea(...)` units |
| `src/screens/EducationHubScreen.tsx` (ModuleCard ~L620) | `{getModuleUnits(module.id).length} Standard Units` | `getModuleUnits()` — already derived, keep it that way |
| `README.md`, `CHANGELOG.md` | Paper/unit totals | Recompute text on content changes |

## Paper-count logic (Exam Prep specifics)

- A unit with `source: 'mock'` has **3** variants (in `EXAM_PREP_PAPERS`).
- A unit with `source: 'real'` has **1** paper (in `EXAM_PREP_PAPERS_OLD_PHARM`,
  reached via the `getExamPrepPaper` fallback in `src/data/examPrepPapers.ts`).
- Derive counts with the paper maps, never with literals:
  - `Object.keys(EXAM_PREP_PAPERS[unitId] ?? {}).length` for mock variants
  - `Object.keys(EXAM_PREP_PAPERS_OLD_PHARM[unitId] ?? {}).length` for real
- Current totals (July 2026): 27 units (13 Clinical Pharmacy + 19 Pharmacology),
  72 papers (39 clinical mock + 21 pharm mock + 12 real OLD).

## Checklist when adding ANY new content

1. Update the source data (e.g. `src/data/examPrepData.ts`, paper maps, curriculum).
2. Grep the whole repo for displays of that quantity:
   `Get-ChildItem src -Recurse -Filter *.tsx | Select-String -Pattern '<old count or related text>'`
3. Replace any hardcoded literal with a derived expression.
4. Run `npx tsc --noEmit` and `npx eslint src` to verify.
5. Update `README.md` / `CHANGELOG.md` totals if they mention the quantity.

## Verification

- `npx tsc --noEmit` must pass.
- Open the app and confirm the count renders from data (change a unit count in
  data temporarily → every display updates; revert).
