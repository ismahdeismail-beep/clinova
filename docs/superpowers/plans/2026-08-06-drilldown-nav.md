# Drill-Down Navigation — KDI + Exam (2026-08-06)

## Goal
1. **KDI**: 3-level drill-down — Superclass (CVS) → Subclass (β-blockers) → Monographs. Each level on its own page; breadcrumb + back nav; no long flat lists.
2. **Exam Prep**: Units get their own page (listing ~3 papers); each paper gets its own page (full content + answers toggle + download). No inline expansion / endless scrolling.
3. DrugIcon already prefers the drug's 3D-structure image (`thumbnailUrl`) with monogram fallback — verify, no change expected.

## Tech Stack / Files
- `src/App.tsx` — add routes
- `src/screens/DrugIndexScreen.tsx` — URL-param drill-down (category, subclass)
- `src/components/ExamPrepView.tsx` — export PaperCard/getPaperCount; compact UnitCard; props moduleId/onSelectModule/onSelectUnit
- `src/screens/ExamPrepScreen.tsx` — rewrite: hub → module → unit → paper pages via useParams

## Global Constraints
- Counts derived at render time (never hardcoded) — subclass card counts via catalog.filter
- No semicolons/Prettier style; no new comments unless needed
- Verify: `npx tsc --noEmit` then `npx vite build` (900s timeout), commit, push, Vercel READY, live check

## Tasks
- [ ] App.tsx: `/drugs/class/:category`, `/drugs/class/:category/sub/:subclass`, `/knowledge/exam/prep/:moduleId`, `/:unitId`, `/:unitId/:variant`
- [ ] KDI: useParams sync; category card → /drugs/class/:cat; subclass card grid at level 2; monograph grid at level 3; breadcrumb navigation; back → /drugs
- [ ] ExamPrepView: export PaperCard + getPaperCount; UnitCard clickable; module view uses UnitCard
- [ ] ExamPrepScreen: hub / module / unit / paper pages
- [ ] tsc + build + commit + push + deploy + live verify
