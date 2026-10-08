# Clinova UI / UX Simplification — TODO

## Definition of Done

The app is understandable at a glance: one navigation model, one obvious place for
every feature, no duplicated or conflicting entry points.

---

## Done — 2026-10-06 (navigation)

- [x] **One navigation model**: the sidebar and the bottom nav now render the exact same
      list, `PRIMARY_NAV` in `src/data/navigationConfig.ts` — Home, Learn, Drugs, Cases,
      More. They no longer diverge (previously the sidebar had 6 items + Settings while
      the bottom nav had 4 different ones, and Home was missing from the sidebar).
- [x] **Everything secondary lives behind one "More" screen** (`/more`, `src/screens/MoreScreen.tsx`):
      Care Plan, Clinova Support, Library, Industry, Settings, plus Image Manager for
      admins — each with a one-line description, then the user card and Sign Out.
      `/library` previously had no navigation entry at all.
- [x] **Top bar trimmed**: removed the "Clinova Support" pill. It is now logo, search,
      theme toggle, notification bell and avatar only.
- [x] **Single source of truth**: `PRIMARY_NAV` / `MORE_NAV` are the only nav definitions;
      `BottomNav`, the sidebar and `MoreScreen` import them.
- [x] Docs updated (`.opencode/project-context.md` nav sections + `MoreScreen` reference).
- [x] Verified: `npm run lint` (tsc), `npx eslint .`, `npm test` (6/6), `npm run build`.

## Done — 2026-10-06 (KDI opening screen)

- [x] **Drug Index opens on its modules only**: `/drugs` now renders just the KDI heading and
      the three module cards (Monographs, My Library, Interactions) — the global search bar,
      quick-search tags and category browse grid no longer show on the landing screen. Those
      moved into the Monographs module, under the module tab bar.
- [x] **No dead ends inside the KDI**: an "All modules" back link above the tab bar returns
      to the hub from any module; the tab bar switches modules.
- [x] **Deep links still work**: `/drugs/class/:category`, `/sub/:subclass` and `/drugs?q=…`
      now auto-enter the Monographs module instead of landing on the hub with content hidden.
- [x] Verified: `npm run lint` (tsc), `npx eslint .` (0 errors), `npm test` (6/6), `npm run build`.

## Open

- [ ] Unify in-page navigation: EducationHub tabs, DrugIndex breadcrumbs and Dashboard hub
      cards should use the same labels/icons as `PRIMARY_NAV`.
- [ ] Dashboard: reduce competing cards/sections to one primary call to action.
- [ ] No dead ends: every nested screen must have a visible back affordance.
- [ ] One page-header pattern (title + subtitle + back button) across all screens.
- [ ] Empty states: every list/grid says what it is and offers a single next action.
- [ ] Mobile audit: ≥44px hit targets, no horizontal scroll, legible bottom-nav labels.

## WhatsApp Bot — Feasibility & RAG Enforcement

- [ ] **Feasibility with Gemini keys**: The app already uses Gemini via 7 SPA call sites
      (`search-drug`, `generate-unit-summary`, `hub-tutor`, `generate-unit-flashcards`,
      `generate-unit-quiz`, `assistant`, `assistant/stream`) — confirmed in
      `BACKEND_AUDIT_TODO.md`. A WhatsApp bot can reuse the same Gemini endpoints
      (relative paths under `/api/gemini/*`) with a WhatsApp webhook that forwards
      user messages to the same generation logic; no new API keys required beyond
      existing GEMINI env var. Rate-limit per user via Supabase.
- [ ] **RAG enforcement script**: Create `scripts/ensure-rag.sh` that runs nightly
      (via Vercel cron or GitHub Action) and: 1. Fetches newest drug monographs from Supabase (`GET /api/drugs?limit=…`) 2. Chunks each monograph text into semantic sections (using sentence‑split +
      optional embeddings via Gemini) and writes/chunks to Supabase `knowledge_chunks`
      table, overwriting stale entries. 3. Validates that every drug in the catalog has at least one chunk; if not,
      triggers a re‑generate from the bundled `drugIndustryData.ts` or forces a
      manual review flag in Supabase. 4. Emits a summary report (JSON) to `logs/rag-status-$(date +%Y%m%d).json` and
      posts it to a designated Slack/Telegram channel (configurable via env).
      The script should be idempotent and safe to run on every deployment.
- [ ] **Training cases**: Populate a new Supabase `bot_training_cases` table with
      representative user queries (symptom descriptions, dosage questions, interaction
      checks) and expected answers grounded in monograph content. Each case has
      `query`, `category` (e.g. "dosage", "side-effects", "interaction"), `source_monograph_id`,
      and `resolved_answer`. A weekly job (script) compares live Gemini responses
      against these cached answers and surfaces mismatches for review.
- [ ] **Integration wiring**: WhatsApp webhook (`/api/whatsapp/incoming`) receives
      incoming messages, extracts text, calls the same Gemini generation function
      used by the SPA (e.g. `POST /api/gemini/assistant`), returns the reply via
      WhatsApp API. Add RAG context by prepending the most relevant monograph chunks
      (retrieved from Supabase `knowledge_chunks` by semantic similarity or keyword
      match) to the prompt.

## Standard Treatment Guidelines (STG) & Essential Medicines

- [ ] **Collect latest STG**: Download the most recent WHO Essential Medicines List (or national STG) and convert each entry into a markdown file under `src/data/essentialMedicine/` following the markdown design rules (H1 = medicine name, YAML front‑matter with `category`, `atcCode`, `lastUpdated`).
- [ ] **Link to existing monographs**: For medicines that already have a monograph in `src/data/drugMonographs/`, add a cross‑reference in the STG markdown (`sourceMonograph: amoxicillin`) so the RAG pipeline can pull both sets of chunks.
- [ ] **RAG inclusion**: Extend the nightly `ensure-rag.sh` script to also process the `src/data/essentialMedicine/` folder, embedding chunks and storing them in Supabase `knowledge_chunks` with a `source='stg'` tag.
- [ ] **WhatsApp bot STG lookup**: Update the WhatsApp webhook (`/api/whatsapp/incoming`) to, when a user queries an essential medicine, first retrieve the relevant STG chunks (by tag) and prepend them to the Gemini prompt, ensuring dosage and indication answers are grounded in the latest guidelines.
- [ ] **Validate markdown**: Run `npm run lint:md` on the new files to confirm they obey the naming, front‑matter, and heading conventions; fix any errors before committing.

## WhatsApp Bot — Feasibility & RAG Enforcement

- [ ] **Feasibility with Gemini keys**: The app already uses Gemini via 7 SPA call sites
      (`search-drug`, `generate-unit-summary`, `hub-tutor`, `generate-unit-flashcards`,
      `generate-unit-quiz`, `assistant`, `assistant/stream`) — confirmed in
      `BACKEND_AUDIT_TODO.md`. A WhatsApp bot can reuse the same Gemini endpoints
      (relative paths under `/api/gemini/*`) with a WhatsApp webhook that forwards
      user messages to the same generation logic; no new API keys required beyond
      existing GEMINI env var. Rate-limit per user via Supabase.
- [ ] **RAG enforcement script**: Create `scripts/ensure-rag.sh` that runs nightly
      (via Vercel cron or GitHub Action) and: 1. Fetches newest drug monographs from Supabase (`GET /api/drugs?limit=…`) 2. Chunks each monograph text into semantic sections (using sentence‑split +
      optional embeddings via Gemini) and writes/chunks to Supabase `knowledge_chunks`
      table, overwriting stale entries. 3. Validates that every drug in the catalog has at least one chunk; if not,
      triggers a re‑generate from the bundled `drugIndustryData.ts` or forces a
      manual review flag in Supabase. 4. Emits a summary report (JSON) to `logs/rag-status-$(date +%Y%m%d).json` and
      posts it to a designated Slack/Telegram channel (configurable via env).
      The script should be idempotent and safe to run on every deployment.
- [ ] **Training cases**: Populate a new Supabase `bot_training_cases` table with
      representative user queries (symptom descriptions, dosage questions, interaction
      checks) and expected answers grounded in monograph content. Each case has
      `query`, `category` (e.g. "dosage", "side-effects", "interaction"), `source_monograph_id`,
      and `resolved_answer`. A weekly job (script) compares live Gemini responses
      against these cached answers and surfaces mismatches for review.
- [ ] **Integration wiring**: WhatsApp webhook (`/api/whatsapp/incoming`) receives
      incoming messages, extracts text, calls the same Gemini generation function
      used by the SPA (e.g. `POST /api/gemini/assistant`), returns the reply via
      WhatsApp API. Add RAG context by prepending the most relevant monograph chunks
      (retrieved from Supabase `knowledge_chunks` by semantic similarity or keyword
      match) to the prompt.

## Content‑Audit & Staged Expansion (2026‑10‑07)

- [ ] **Run content‑audit script** (`scripts/audit-text.sh`) and record all UI strings & monograph markdown.
- [ ] **Consolidate repeated phrases** into `src/data/uiStrings.ts` (target: ≤ 3 occurrences per phrase across `src/`).
- [ ] **Create monograph template** (`src/data/monographTemplate.md`) and migration script (`scripts/generate-md.sh`).
- [ ] **Stage 2**: Add first batch of 20 new drug monographs using `generate-md.sh`; verify no duplicate headings via `uniq -c`.
- [ ] **Add repetition‑check guard** to CI: fail `npm run lint` if any phrase (outside `uiStrings.ts`) appears more than twice in `src/`.
- [ ] **Document the staged‑expansion roadmap** in `UI_TODO.md` (Stages 1‑5: core KDI, additional monographs, STG/guidelines, bot training cases, i18n).
- [ ] **Update Lighthouse CI** to also flag monograph markdown size > 150 KB as a potential performance risk.

## RAG Training – Thousand‑Case Pipeline (2026‑10‑08)

- [ ] **Database schema** – migrations 00017‑00019 created in `supabase/migrations/`. Tables: `bot_training_cases`, `knowledge_chunks`, `bot_conversation_log` with proper columns, UUID primary keys, and foreign keys to the bundled drug‑monograph catalogue.
- [ ] **Chunking & embedding script** – `scripts/ensure-rag.sh` already runs nightly; verify it also populates `knowledge_chunks.embedding` using the Gemini `embedding-001` model and stores metadata (section, line number).
- [ ] **Case import script** – `scripts/import-cases.sh` reads a CSV (`query,category,source_monograph_id,expected_answer`) and inserts rows into `bot_training_cases` via the Supabase connection string. Run `SUPABASE_CONNECTION_STRING=… ./scripts/import-cases.sh data/clinical-cases-starter.csv`.
- [ ] **Weekly quality‑loop script** – `scripts/train-rag-weekly.sh` evaluates a batch of approved cases, retrieves top chunks, calls Gemini (`temperature=0`) to generate an answer, compares to `expected_answer` (substring check), and marks the case as reviewed. Currently limited to 50 cases per run; increase `LIMIT` as needed.
- [ ] **Prompt template** – stored in `src/prompts/rag-prompt.md` (or inline) with the format “Answer using ONLY the following excerpts:\n<chunks>\n... \n</chunks>\nQuestion: …”. The backend should substitute the retrieved chunk text.
- [ ] **CI guard** – `npm run lint:check-phrases` now runs `scripts/check-phrases-simple.sh` which ensures no key phrase (e.g., “Kenya Drug Index”, “Source:”) appears outside `src/data/uiStrings.ts` beyond a configurable limit (default 200, lowerable as consolidation progresses).
- [ ] **Monitoring dashboard** – add a simple Supabase view or external tool that displays: total cases, % approved, pass‑rate, top failure categories. Update weekly after the quality‑loop runs.
- [ ] **Rollback plan** – each nightly `ensure-rag.sh` run tags the chunk data with a `run_id` (timestamp or git SHA). If the pass‑rate drops > 5 % after a new batch, revert the `knowledge_chunks` and `bot_training_cases` to the previous `run_id`.
- [ ] **Pilot batch** – import a starter set of 200 clinical case Q&As (provided in `data/clinical-cases-starter.csv`). After import, run `scripts/train-rag-weekly.sh --dry-run` to see the pass‑rate, then approve the cases that pass and iterate.

(End of file)
