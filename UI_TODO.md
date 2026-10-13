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

> ✅ **UNBLOCKED (2026‑10‑11):** the Supabase migration history was reconciled and migrations `00017`–`00020`
> are now **applied + recorded on production** (see `BACKEND_AUDIT_TODO.md` → **Phase 15**). Two migration bugs
> were fixed en route: `00017`'s invalid `UNIQUE (lower(query))` table constraint (→ expression index) and
> `00018`'s `using gist (metadata jsonb_path_ops)` (→ `using gin`; `jsonb_path_ops` is a GIN opclass).

**Done (2026‑10‑11)**

- [x] **Database schema** – migrations 00017‑00020 applied + recorded on production: `bot_training_cases`, `knowledge_chunks`, `bot_conversation_log`.
- [x] **Chunk model hardening** – `00020` adds `chunk_index`/`embedding_model`/`run_id` to `knowledge_chunks` (+ unique `(monograph_id, chunk_index)` for idempotent upserts) and enables deny-by-default RLS on all three bot tables (`00018`'s GIN index bug also fixed).
- [x] **Monitoring** – `rag_pipeline_status` view exposes training_cases, approved/reviewed counts, chunk count, covered vs total monographs and the latest `run_id`.
- [x] **Chunking engine** – `scripts/ensure-rag.ts`: sectioned chunks from `drug_monographs`, embedded via `aiRouter.embedText` (now `gemini-embedding-001` @ 768‑dim — `text-embedding-004` is gone for new keys), upserted with a per-run `run_id`; `--dry-run/--limit/--batch/--embed-batch/--reset` + JSON report. **Validated live 2026‑10‑11**: 3 monographs → 24 chunks, 768‑dim vectors in `knowledge_chunks`.
- [x] **Batched embeddings (2026‑10‑12)** – single-call embedding exhausted the per-model free-tier quota at ~8600 calls. `aiRouter.embedTexts` now uses the `batchEmbedContents` endpoint (≤100 texts/request) with retry/backoff on 429/5xx/network. **Batching fixes the per-minute throughput limit (100 texts/min per model) but NOT the daily budget** — see the 2026‑10‑13 correction below.
- [x] **Visual schema tool** – `scripts/build-db-explorer.mjs` → `docs/db-explorer.html` (searchable tables/columns + Mermaid ER diagram).
- [x] **Rate-limit hardening (2026‑10‑13)** – `aiRouter.embedTexts` now also retries **network** failures (not just 429/5xx) using the server's `retryDelay`, and fast-fails on daily-quota exhaustion (retryDelay > 90s). Empirically verified caps (2026‑10‑13): **1000 TEXTS/day per model** (`embed_content_free_tier_requests`; a 100-text batch consumes 100, so batching does NOT stretch the day) + **100 texts/min per model**. `ensure-rag` gained `--only-missing` (resume) and `--pace-ms` (default 60s → the 100 texts/min ceiling) and reports `chunks_quota_skipped`. npm: `rag:resume`, `rag:reset`.

**Open**

- [x] **`ensure-rag` plumbing** – `scripts/ensure-rag.sh` wrapper + npm scripts (`rag:ingest`, `rag:dry`); `GEMINI_API_KEY` set in `.env` (gitignored) and verified against the live API. Also fixed a **latent chunking bug**: the empty-section filter `/:?\s*$/` always matched (optional colon), silently dropping _every_ section — now `/:\s*$/`.
- [x] **Free-tier completion schedule (2026‑10‑13)** – chose the **free, automated** path: `scripts/rag-resume-cron.sh` is installed hourly in the user crontab (`17 * * * *`). It resumes only when the last _productive_ run was ≥20 h ago (so it self-heals after the machine sleeps/was off), is `flock`-guarded, and treats quota exhaustion as non-fatal (retry next hour). Documented in `docs/rag-ingest-schedule.md`, which also records the fast path (enable Gemini billing → whole corpus in ~15 min for <$0.05).
- [ ] **Full ingest** – **IN PROGRESS (2026‑10‑13)**: 996 chunks / **133 of 1072 monographs** written (`gemini-embedding-001`, run `20261013-mv6lapo3`); **~7077 chunks remain**, filling at ~1000 texts/day via the cron → ~8 days. Verify with `node scripts/db.mjs "select * from rag_pipeline_status"` (expect 1072/1072 covered + a fresh `run_id`), then `npm run rag:weekly`.
- [x] **Prompt template** – `src/prompts/rag-prompt.md` (ground-only-in-excerpts template, `<chunks>`/`{{chunks}}`/`{{question}}` sections + citation rule).
- [x] **Starter cases** – `data/clinical-cases-starter.csv` (25 Q&As across 12 drugs, grounded in live `drug_monographs` data) **imported** (`bot_training_cases`, 25 rows). The importer deliberately leaves `status='pending'` (the review workflow is a separate step); the curated starter set was then approved (`status='approved'`, `reviewed_at` still NULL) so `rag:weekly` has a work queue — `rag_pipeline_status` now reports `training_cases=25, approved_cases=25, reviewed_cases=0`.
- [x] **Harden case import** – `scripts/import-cases.ts` + new `import-cases.sh` wrapper: real RFC‑4180 CSV parser (quoted commas, `""` escapes), service‑role REST client (no `psql` heredoc / injection), `ignoreDuplicates` upsert (works with the `lower(query)` expression index), row validation + JSON report + `rag:import` npm script. **Validated live 2026‑10‑12**: 25/25 rows imported, idempotent re‑run → 0 writes / 25 skips.
- [x] **Semantic retrieval in the weekly loop** – `scripts/train-rag-weekly.ts` + new `train-rag-weekly.sh` wrapper: embeds each case query (same model as ingestion), cosine-search over `knowledge_chunks.embedding` (top‑3), generates with `gemini-flash-latest` @ temp 0, substring pass/fail (case‑insensitive), stamps `reviewed_at`, JSON report. No `psql`, no `jq`, current model names.
- [x] **Rollback procedure** – `docs/rag-rollback.md`: revert `knowledge_chunks` to a previous `run_id`, re-open reviewed cases, and the model-mixing warning (use `--reset` on model switches).
- [ ] **CI guard** – `npm run lint:check-phrases` (phrase‑consolidation ratchet, `scripts/check-phrases-simple.sh`).

(End of file)
