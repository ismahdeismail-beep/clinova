# Clinova Application Map

> **Read this first.** This is the authoritative map of the Clinova codebase for
> agents and developers: every route, screen, data file, service, convention, and
> gotcha you need to work here efficiently. Keep it updated when adding screens,
> routes, or data files.

Last verified: 2026-08-21 · Production: https://clinova-main.vercel.app

---

## 1. Stack Summary

| Layer               | Technology                                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| Frontend            | React 19, React Router 7 (BrowserRouter), TypeScript ESM, Tailwind CSS 4 (`@tailwindcss/vite`)             |
| Backend             | Express (`server.ts`, **PORT 3000**), bundled to `dist/server.cjs` via esbuild                             |
| Auth / DB / Storage | Supabase (Postgres, Auth, Storage, Realtime) + Firebase/Firestore for some user data                       |
| AI                  | Google Gemini (`@google/genai`) Knowledge Engine + RAG router (`src/engine/`, `src/services/ragRouter.ts`) |
| State               | Zustand, React context (Auth, Theme, Notification, Cache, UIMode)                                          |
| PWA                 | vite-plugin-pwa                                                                                            |
| Testing             | Vitest 4 + Testing Library + MSW; Playwright for E2E                                                       |
| Monitoring          | Sentry (browser + node), Vercel Analytics + Speed Insights                                                 |

## 2. Commands & Verification

```bash
npm run dev          # Express dev server (tsx server.ts) on PORT 3000
npm run build        # Vite build + esbuild server bundle  ← strongest verification
npm run start        # Production server (dist/server.cjs)
npm run lint         # tsc --noEmit type-check
npx eslint .         # Lint
```

**Environment constraints (this laptop):**

- `npx tsc --noEmit`, `npx eslint .`, `npx vitest run` **time out** at 120–180s.
- **Best verification:** `npm run build` (full vite build catches TS/syntax errors), or rely on
  the pre-commit hook (lint-staged runs eslint --fix + prettier --write on staged files only).
- Turborepo (if used elsewhere) runs via `node node_modules\turbo\bin\turbo run ...`.
- npm 11 blocks postinstall binaries — reinstall natively with `npm install <pkg>@<ver>`.

## 3. Route Map

All routes defined in `src/App.tsx`. Lazy-loaded screens except auth shell.

| Route                                  | Screen                  | Notes                                               |
| -------------------------------------- | ----------------------- | --------------------------------------------------- |
| `/login`                               | LoginScreen             | Public                                              |
| `*` (unauth)                           | LandingScreen           | Fallback                                            |
| `/`                                    | DashboardScreen         | Home, unified search, daily spotlight, study tracks |
| `/cases`                               | ClinicalCasesScreen     | Clinical scenarios                                  |
| `/drugs`                               | DrugIndexScreen         | Kenya Drug Index (1,000 drugs)                      |
| `/drugs/class/:category`               | DrugIndexScreen         | Filtered by class                                   |
| `/drugs/class/:category/sub/:subclass` | DrugIndexScreen         | Filtered by subclass                                |
| `/assistant`                           | ClinovaSupportScreen    | AI clinical decision support                        |
| `/knowledge`                           | EducationHubScreen      | Level 1: module grid                                |
| `/knowledge/:moduleId`                 | EducationHubScreen      | Level 2: sub-modules/units                          |
| `/knowledge/:moduleId/:unitId`         | EducationHubScreen      | Level 3: learning workspace                         |
| `/knowledge/exam/prep/...` (5 depths)  | ExamPrepScreen          | Mock papers, 33 units × 3 papers                    |
| `/knowledge/exam/board-exam/:setId?`   | BoardExamScreen         | 5 prediction sets                                   |
| `/care-plan/:specialtyId?/:disease?`   | CarePlanScreen          | NANDA/NIC/NOC plans                                 |
| `/library`                             | OnlineLibraryScreen     | Curated resources                                   |
| `/industry`                            | **IndustryHubScreen**   | Pharma industry hub (5 tabs)                        |
| `/reading/:articleId`                  | ReadingScreen           | Daily readings                                      |
| `/settings`                            | SettingsScreen          | Profile, notifications                              |
| `/admin/images`                        | AdminImageManagerScreen | Admin only                                          |
| `*` (authed)                           | Navigate → `/`          |                                                     |

**Shell:** fixed top nav (`TopNavigation` in App.tsx), sidebar ≥ md (`md:left-64`),
mobile hamburger drawer + `BottomNav` (Home, Education, Drugs, Exam, Care Plans).

## 4. Screen Inventory

| Screen file                            | Size      | What it does                                                                                                                                                               |
| -------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/screens/DashboardScreen.tsx`      | ~750 ln   | Home feed, unified search (SearchService), study tracks, daily articles                                                                                                    |
| `src/screens/EducationHubScreen.tsx`   | ~4,240 ln | 3-level education browser. Modules from `curriculum.ts`. Sub-module click routing: `board_exam`→BoardExam, `exam_prep`→ExamPrep, `pi-*`→`/industry`, else drill into units |
| `src/screens/IndustryHubScreen.tsx`    | ~1,600 ln | 5 tabs: Topics (tree drill-down), Glossary, Manufacturers, Quiz, KEML. Topic detail view w/ sub-topic cards + KEML panel + color-coded entry renderer                      |
| `src/screens/DrugIndexScreen.tsx`      | ~1,580 ln | Search/filter 1,000 drugs by class/subclass; opens DrugMonographView                                                                                                       |
| `src/screens/ExamPrepScreen.tsx`       | large     | Paper viewer, 30/40/30 format, variant-derived paper counts                                                                                                                |
| `src/screens/BoardExamScreen.tsx`      | —         | 5 prediction sets                                                                                                                                                          |
| `src/screens/ClinicalCasesScreen.tsx`  | —         | Case browser/player                                                                                                                                                        |
| `src/screens/CarePlanScreen.tsx`       | —         | Specialty → disease → plan                                                                                                                                                 |
| `src/screens/ClinovaSupportScreen.tsx` | —         | Chat UI over Knowledge Engine                                                                                                                                              |
| Others                                 | —         | Landing, Login, Reading, Library, Settings, AdminImageManager                                                                                                              |

Key components:

- `src/components/DrugMonographView.tsx` — drug detail tabs incl. **Industry tab** (`DrugIndustryTab`)
- `src/components/PageLoader.tsx` — `PageLoader` + `InlineLoader`; pair with `useMinimumLoading` hook
- `src/components/BottomNav.tsx`, `ClinovaLogo.tsx`, `ThemeToggle.tsx`, `InstallPWA.tsx`

## 5. Data Layer (`src/data/`)

### Clinical content

| File                                                                       | Contents                                                                                                                                           |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `drugIndexData.ts`                                                         | BUNDLED_DRUGS — 1,000 drug monographs                                                                                                              |
| `diseaseNotes.ts`                                                          | Disease notes, 36-section Standard Disease Discussion Template                                                                                     |
| `clinicalCasesData.ts`                                                     | Clinical cases                                                                                                                                     |
| `carePlanData.ts`                                                          | 19 specialties, 92 NANDA/NIC/NOC plans                                                                                                             |
| `curriculum.ts`                                                            | EDUCATION_MODULES (17 therapeutic areas + `pharmaceutical_industry`), `getModuleUnits`, `getSubModuleUnits`, `findSubModule`, NON_CURRICULUM_UNITS |
| `examPrepData.ts` / `examPrepPapers.ts`                                    | 33 units, 99 papers (30 MCQ / 6 SAQ / 2 LAQ)                                                                                                       |
| `educationHubData.ts`                                                      | Module icons/colors helpers                                                                                                                        |
| `unitStaticContent.ts`, `unitToLibraryMapping.ts`, `digitalLibraryData.ts` | Unit content + library cross-links                                                                                                                 |
| `dailyReadings.ts`, `healthDays.ts`                                        | Dashboard reading feed                                                                                                                             |
| `navigationConfig.ts`                                                      | NAV_GROUPS sidebar config (incl. `/industry` Factory icon)                                                                                         |

### Pharmaceutical industry knowledge base (bundled, offline-first)

| File                             | Contents                                                                |
| -------------------------------- | ----------------------------------------------------------------------- |
| `industryKnowledgeData.ts`       | BUNDLED_TOPICS — 30+ hierarchical topics, 6 categories (parent_id tree) |
| `industryKnowledgeEntries.ts`    | BUNDLED_INDUSTRY_ENTRIES — 38 rich entries keyed by `topic_slug`        |
| `industryTermsData.ts`           | BUNDLED_INDUSTRY_TERMS — 55 glossary terms (aliases, examples)          |
| `industryQuizData.ts`            | BUNDLED_INDUSTRY_QUIZ — 25 questions (MCQ/true_false/clinical_scenario) |
| `kemlCrossReference.ts`          | 21 KEML drugs (core/complementary, WHO EML, local availability)         |
| `drugIndustryConnectionsData.ts` | 50 connections linking 21 drugs → industry entries                      |
| `kenyanManufacturersData.ts`     | 27 real PPB-licensed Kenyan manufacturers                               |

Types live in `src/types/knowledge.ts` (industry types at line 597+):
`PharmaceuticalTopic`, `IndustryKnowledgeEntry`, `DrugIndustryConnection`,
`IndustryTerm`, `KenyanManufacturer`, `IndustryQuizQuestion`, `KemlCrossReference`,
`IndustryDifficulty`, `IndustryConnectionType`.

**Supabase tables (when populated):** `pharmaceutical_topics`,
`industry_knowledge_entries`, `drug_industry_connections`, `industry_terms`,
`kenyan_manufacturers`. Service queries DB first, falls back to bundled data.

## 6. Services & Engine

| File                                            | Role                                                                                                                                                                                                                           |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/services/industryKnowledge.service.ts`     | `getTopicTree`, `getByTopic(slug)`, `getForDrug(drugId)` (matches `drug_id` OR `drug_name`), `getManufacturers`, `searchTerms`, `getQuizQuestions`, `getQuizCategories`, `getKemlReferences`, `getKemlForDrug`, `getKemlStats` |
| `src/services/search.service.ts`                | Unified dashboard search                                                                                                                                                                                                       |
| `src/services/drugMonograph.service.ts`         | Drug monograph fetch/cache                                                                                                                                                                                                     |
| `src/services/education.service.ts`             | Custom units/folders, saved flashcards/quizzes (Firestore)                                                                                                                                                                     |
| `src/services/diseaseNote.service.ts`           | Disease notes CRUD                                                                                                                                                                                                             |
| `src/services/export.service.ts`                | PDF/TXT/MD export                                                                                                                                                                                                              |
| `src/services/aiContent.service.ts`             | AI-generated study content                                                                                                                                                                                                     |
| `src/services/ragRouter.ts`                     | Intent classification incl. industry categories; builds RAG context                                                                                                                                                            |
| `src/engine/knowledgeEngine.service.ts`         | Gemini reasoning; industry keyword detection                                                                                                                                                                                   |
| `src/lib/getMonograph.ts`, `src/lib/localDb.ts` | Monograph caching, image pinning (IndexedDB)                                                                                                                                                                                   |
| `server.ts` + `src/server/`                     | Express API; 30+ AI skills incl. `kenyanIndustry.ts`, `regulatoryAffairs.ts`, `supplyChainKnowledge.ts`                                                                                                                        |

Hooks: `useMinimumLoading`, `useDebounce`, `useContentStats` (derived counts).

## 7. Conventions (MUST follow)

1. **Prettier:** no semicolons, single quotes, `trailingComma: all`, `printWidth: 100`.
   `server.ts` is excluded via `.prettierignore` + `eslint.config.js`.
2. **No code comments** unless explicitly requested.
3. **Derived counts rule:** never hardcode counts in the UI. Every displayed count
   (papers, subjects, modules, flashcards, drugs, topics…) must be derived from
   source data at render time. See `.opencode/skills/derived-counts/SKILL.md`.
4. **Styling:** Tailwind utilities + CSS variables (`var(--primary)`, `var(--surface)`,
   `var(--text-muted)`, `var(--border)`…). Dark mode via `dark:` variants.
   Color-coded badges pattern: `bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-300/40`.
5. **Responsiveness:** mobile-first. Tab strips use `overflow-x-auto no-scrollbar`
   - `whitespace-nowrap shrink-0` buttons; grids use `grid-cols-1 sm:grid-cols-N`;
     text scales `text-xs sm:text-sm`; padding `p-4 sm:p-5`. `.no-scrollbar` utility is
     defined in `src/index.css`.
6. **Loading states:** use `PageLoader`/`InlineLoader` + `useMinimumLoading` hook.
7. **EXTEND, CONNECT, ENRICH** — never rebuild existing architecture when adding content.

## 8. Data Flow Examples

**Industry Hub topic view:**
`Topics tab → handleTopicClick(topic) → IndustryKnowledgeService.getByTopic(topic.slug)`
`→ setTopicEntries → renderEntry with getSectionStyle(key) color-coding (SECTION_STYLES, 60+ types)`
`+ getCategoryColors(name) per-category palette (CATEGORY_COLORS, 7 categories).`

**Drug → Industry:**
`DrugMonographView → DrugIndustryTab → getForDrug(drugId) → connections resolve entries`
`from BUNDLED_INDUSTRY_ENTRIES + getManufacturers() list.`

**Ed Hub → Industry:**
`EducationHubScreen.handleSubModuleClick → subMod.id.startsWith('pi-') → navigate('/industry').`

## 9. Gotchas & Known Issues

- **Edit tool corruption risk:** NUL-byte corruption possible on large-file edits —
  always re-read edited regions after editing big files.
- **Husky v10 deprecation warning** in `.husky/pre-commit` — will fail on husky v10.
- **Subagent dispatch unavailable** (`Model not found: cerebras/llama-3.3-70b`) — do edits directly.
- **Test Firebase account** `repro.1786463368449@test.clinova` pending deletion (manual).
- **Git push identity:** must be `ismahdeismail-beep` (repo owner). Fix with
  `gh auth switch --user ismahdeismail-beep` if pushes 403.
- **Vercel token:** `C:\Users\ADMIN\Desktop\PROJECTS-WEBSITES\SKILLS\VERCEL TOKEN KEY.txt`.
- **SUPERMEMORY_API_KEY** not yet set — supermemory persistence unavailable.

## 10. Definition of Done (per change)

1. `npm run build` passes (or pre-commit lint-staged green on staged files).
2. Counts shown in UI still derived from data (no hardcoded numbers introduced).
3. Responsive check: tab strips scroll, grids collapse, no horizontal overflow at 360px.
4. Commit with conventional message (`feat:` / `fix:` / `chore:` / `docs:`).
5. Push to `main` (origin). Deploy to Vercel after meaningful changes
   (`scripts/save-work.ps1` = verify → commit → push → deploy).
6. Update this map if you added/changed routes, screens, data files, or services.
