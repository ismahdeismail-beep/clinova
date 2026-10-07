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
