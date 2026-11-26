# Backend Infrastructure Synchronization & Production Readiness — TODO

> **Status (2026-10-11):** Phases 1–3, 5, 8–11, 13–14 and documentation are complete.
> Shipped today: Phase 9 validation/error-consistency pass + a production route-registration fix
> (academic-engine & `/api/library/*` routes were never registered on Vercel), verified on the live deploy.
> **Open items (2026-11-26):** Phase 4 (auth authority), Phase 12 (prod security env).
> **Update (2026-11-23):** Phase 7 server search API added and wired; Phase 6 KG sync refactored into an importable idempotent function.
> **Update (2026-11-26):** Phase 6 KG sync now triggers after admin case writes and reads DB cases. Full test suite 102/102.

## Definition of Done

Firebase, Supabase, PostgreSQL, Cloudinary, Knowledge Graph, search, auth, storage, and all backend services are synchronized, production-ready, documented, and operating as one cohesive backend supporting every Clinova feature.

---

### Phase 1 — Backend Architecture Audit ✅ (map done; see BACKEND_ARCHITECTURE_MAP.md)

- [x] Map all backend services → Firebase (auth/DB/storage), Supabase (Postgres + service-role server writes), server.ts (Express :3000; Gemini proxy, Cloudinary proxy, chunked upload), Google Gemini (@google/genai), Cloudinary, 60+ AI skills
- [x] Identify unused services, duplicated functionality, outdated configs
  - KEY FINDING: SPA (`src`) does NOT reference `/api/gemini/*` by relative path. `aiRouter.ts` is server-side only. Client `fetch()` calls target absolute URLs — `/api/gemini/*` routes may be legacy/unused by current client. Cannot confirm without deployed API base URL. **SUPERSEDED (2026-10-06): the SPA calls 7 relative `/api/gemini/*` routes — see Phase 9.**
  - No cron/queue/background-job framework present (no setInterval/cron/bull). Background processing = ad-hoc within request handlers only.
  - Dual persistence: Firebase (primary app DB/auth) + Supabase (secondary/backup + server service-role writes) → overlapping ownership.

### Phase 2 — Firebase Audit ✅ (see BACKEND_RESPONSIBILITY_FINDINGS.md)

- [x] Web SDK only; no Admin SDK; no server-side session verification (root cause of R1)
- [x] Firebase = sole user identity (auth/DB/Storage)

### Phase 3 — Supabase Audit ✅ (see BACKEND_RESPONSIBILITY_FINDINGS.md)

- [x] Responsibilities confirmed via 3 migrations; **no users table**; browser client read-only, server service-role writes
- [x] Duplication noted: Firebase (primary) + Supabase (server-writable read replica) overlap on cases/monographs

### Phase 4 — Authentication Synchronization ⚠️ GAP (see findings)

- [ ] Not implemented: no Supabase profiles/roles; RLS assumes Supabase Auth which isn't used
- [x] Documented; requires auth-authority decision (recommendations in findings doc)

### Phase 5 — Storage Audit ✅ (see BACKEND_STORAGE_BG_FINDINGS.md)

- [x] 3 storage systems: Firebase Storage (client), Cloudinary (media), local `uploads/` (chunked)
- [x] Code fix: temp-chunk cleanup added to chunked-upload catch block (Risk R8)
- [x] Dead config noted: CLOUDINARY_API_KEY/SECRET unused

### Phase 6 — Knowledge Infrastructure ✅ (read-only)

- [x] KG schema present (knowledge_graph_nodes/relationships + FKs/indexes in migration 1)
- [x] Reusable KG sync (2026-11-23): `scripts/sync-knowledge-engine.ts` refactored into an importable `src/server/kgSync.ts` exporting `syncKnowledgeGraph()` — idempotent, batched upserts of disease/case nodes and case→disease relationships, injectable Supabase client + logger, returns counts. CLI script is now a thin wrapper with unchanged output/behavior. Verified: tsc clean, eslint 0, vitest 6/6, full suite 99/99.
- [x] Automatic trigger after content updates (2026-11-26): `POST/PUT/DELETE /api/admin/clinical-cases` now re-sync the KG from the `clinical_cases` table (`caseSource: 'database'`, UUID entity ids), and `POST /api/admin/kg/sync` allows a manual re-sync. Opt out with `KG_SYNC_ON_WRITE=false`. Static CLI behaviour unchanged. 8/8 kgSync tests pass.

### Phase 7 — Search / Health ✅ (partial)

- [x] Health/readiness probes added (validated)
- [x] Server search API (2026-11-23): `src/server/search.ts` exports `createSearchRouter()`, mounted at `/api/search` in `server.ts` just before the JSON 404 catch-all (inherits existing opt-in rate-limit/auth middleware). `GET /api/search?q=&limit=` calls the existing `unified_search` RPC (zod validation: 2–200 char query, limit 1–50, default 10); `GET /api/search/semantic?q=&limit=` embeds via `embedText` and retrieves via `retrieveChunks`, reusing the RAG cosine index rather than duplicating embedding logic (limit 1–20, default 5). Injectable deps; 9 mocked tests pass (no live Supabase/Ollama). Limitations: semantic needs the local embedding provider (no cloud fallback); unified route does not replicate the client-side static/industry fallbacks from `search.service.ts`.

### Phase 8 — Background Processing ✅ (see BACKEND_STORAGE_BG_FINDINGS.md)

- [x] Confirmed NO cron/queue/worker; processing is synchronous in request handlers
- [x] Documented as future scale item (non-breaking pass)

### Phase 9 — API Audit ✅ (validation pass done 2026-10-06)

- [x] Route-registration bug fixed: `CLINOVA ACADEMIC ENGINE` routes (`/api/gemini/module-tutor|case-tutor|generate-full-case|hub-tutor`, `/api/gemini/oral-practice/*`, `/api/ai/skills`, `/api/ai/orchestrate`) and `/api/library/crawl|crawl-many|search` were declared **inside** `startServer()`, which is skipped when `VERCEL=1` — so they were never registered in production and were shadowed by the JSON `/api` 404 catch-all in dev. Hoisted to module level; `startServer()` now only wires Vite/static, SPA fallback and `listen`. Verified on prod: `https://clinova-main.vercel.app/api/ai/skills` → 200 (Vercel deploy status: success).

- [x] Rate-limit middleware (sliding window, opt-in via `RATE_LIMIT_ENABLED`) + auth guard (`API_REQUIRE_AUTH` + `API_SHARED_SECRET`) added to `/api/*`. Default OFF → non-breaking. Validated (esbuild exit 0). See BACKEND_ENV_REFERENCE.md.
- [x] Per-endpoint validation/error-consistency pass — done: JSON 404 for unmatched `/api/*`, centralized error handler (malformed JSON → 400, oversize → 413, multer → 400, other 5xx → generic message), body validation on `/api/admin/config` (load-balancing mode + provider override whitelisted), UUID checks on `PUT`/`DELETE /api/admin/clinical-cases/:id`, and chunked-upload `uploadId`/chunk-index validation (closes a path-traversal write/`rmSync` in `POST /api/upload/chunk`). Verified against a live server (curl) + `tsc --noEmit` + vitest + production build.
- [x] Remove unused endpoints (`/api/gemini/*` likely legacy) — **CONFIRMED IN USE, not removable**: the SPA calls 7 relative `/api/gemini/*` routes (`search-drug`, `generate-unit-summary`, `hub-tutor`, `generate-unit-flashcards`, `generate-unit-quiz`, `assistant`, `assistant/stream`). The earlier "no relative call sites" finding was wrong.

### Phase 10 — Environment Variables ✅ (see BACKEND_ENV_REFERENCE.md)

- [x] Required vars documented; deprecated/unused noted (CLOUDINARY_API_KEY/SECRET unused; multi-provider keys reserved)
- [x] Dev/prod separation flagged; service-role key confirmed server-only
- [x] Final config documented

### Phase 11 — Database Health ✅ (see BACKEND_RESPONSIBILITY_FINDINGS.md)

- [x] Schema/indexes reviewed (3 migrations); RLS enabled but mismatched to Firebase auth
- [x] Inconsistency documented: client writes blocked by `auth.role()` checks; user-isolation not enforced

### Phase 12 — Security Audit ✅ (findings; 1 code control added)

- [x] RLS reviewed; service-role bypass documented (R3)
- [x] API protection added (Phase 9 guard, opt-in)
- [ ] Remaining: enable `API_REQUIRE_AUTH`+`RATE_LIMIT_ENABLED` in prod; rotate/secure service-role key; decide auth authority
  - Note: `ADMIN_API_SECRET` guard exists but is unset in prod — all `/api/admin/*` writes (clinical cases, embeddings reindex, jobs, AI gateway) are currently open.

### Phase 13 — Performance Optimization ✅ (see BACKEND_AUDIT_REPORT.md)

- [x] Bottlenecks documented: no caching, synchronous heavy AI work, no connection pooling

### Phase 14 — Production Verification ✅ (checklist in report)

- [x] Health/ready, rate-limit, auth-guard, chunk cleanup, migrations, Firebase, Cloudinary — checklist provided

### Documentation ✅

- [x] Architecture (`BACKEND_ARCHITECTURE_MAP.md`), env (`BACKEND_ENV_REFERENCE.md`), responsibilities/RLS (`BACKEND_RESPONSIBILITY_FINDINGS.md`), storage/bg (`BACKEND_STORAGE_BG_FINDINGS.md`), handoff (`HANDOFF_MANUAL.md`), report (`BACKEND_AUDIT_REPORT.md`)

### Final Validation Report ✅

- [x] `BACKEND_AUDIT_REPORT.md` summarizes components, issues, repairs, sync, security, perf, DB, verification, recommendations

---

### Phase 15 — CI/CD & Deploy Health ✅ RESOLVED 2026-10-11

**Finding: every commit looks "failed" because of one persistent red check — `Supabase Preview`.**
All 13 commits below are pushed and present on `origin/main` (`git ls-remote origin main` = `1f8e193`); the
GitHub → Vercel deploy path is fine. The red X is the Supabase GitHub App check, failing identically on
**every** commit:

```
Supabase Preview  (failure)  ·  app=supabase  ·  project bveztrtykjburdhewcdy
Remote migration versions not found in local migrations directory.
```

| Commit  | Lint & Tests                                            | Build | E2E | Supabase Preview                  |
| ------- | ------------------------------------------------------- | ----- | --- | --------------------------------- |
| 1f8e193 | ✅                                                      | ✅    | ✅  | ❌ remote-only migration versions |
| e425433 | ✅                                                      | ✅    | ✅  | ❌ remote-only migration versions |
| 507209b | ✅                                                      | ✅    | ✅  | ❌ remote-only migration versions |
| 44848ee | ✅                                                      | ✅    | ✅  | ❌ remote-only migration versions |
| 5a2bc7a | ❌ (`src/App.tsx:317 Cannot find name 'useRenderName'`) | ✅    | ❌  | ❌ remote-only migration versions |
| 736f337 | ✅                                                      | ✅    | ✅  | ❌ remote-only migration versions |
| aebe55b | ✅                                                      | ✅    | ✅  | ❌ remote-only migration versions |
| ccec10d | ✅                                                      | ✅    | ✅  | ❌ remote-only migration versions |
| f838c13 | ✅                                                      | ✅    | ✅  | ❌ remote-only migration versions |
| 6a382a7 | ✅                                                      | ✅    | ✅  | ❌ remote-only migration versions |
| bb650ed | ✅                                                      | ✅    | ✅  | ❌ remote-only migration versions |
| 9b41af8 | ✅                                                      | ✅    | ✅  | ❌ remote-only migration versions |
| 47942b5 | ✅                                                      | ✅    | ✅  | ❌ remote-only migration versions |

- [x] **Diagnosed the persistent check**: `Supabase Preview` (app slug `supabase`) has failed on every commit
      since at least `47942b5` (2026-10-07) → it is a **standing migration-history drift**, not caused by any
      single commit. The remote project's `supabase_migrations.schema_migrations` holds versions with **no
      matching file** in `supabase/migrations/`.
- [x] **`5a2bc7a` CI failure is historical & already fixed**: Lint & Unit Tests failed with
      `src/App.tsx:317 Cannot find name 'useRenderName'`, fixed by the very next commit `44848ee`
      ("Fix: import useRenderName hook correctly"). Every later commit passes. No action needed.
- [x] **Confirmed the drift (via the Management API — no CLI/DB password needed)**: dumped
      `supabase_migrations.schema_migrations`; the remote project held **4 versions with no local file**:
      `20261005075151 cleanup_wrong_moa_backup_and_null_20261005`,
      `20261005075403 knowledge_references_freshness_tracking`,
      `20261005080227 add_content_status_to_drug_monographs`,
      `20261009070821 create_drug_monographs_safe_view` (applied via dashboard/Management API on 2026-10-05/09).
- [x] **Correction to two earlier hypotheses**: - the mixed `000012` / `00012` prefixes are **not** a version collision — the CLI uses the literal filename
      prefix as the version, and the remote records both as distinct strings (so both are valid); - the local gaps `000007/000009/000011` are genuinely unused numbers — remote does not hold them.
- [x] **Reconciled local ↔ remote (now 22 versions each, exact set match)**: - added local files for the 4 remote-only versions (SQL reconstructed from the remote `statements`); - recorded `000013`/`000014`/`000015` as applied — their DB effects already existed
      (`clinical_pearls`→`text[]`, `pharmacokinetics`→`text`, `push_subscriptions`, `notifications`) but the
      versions were never in history (non-idempotent, so they must NOT be re-run); - applied **and** recorded `000016` (industry) + `00017`–`00020` (RAG) against production.
- [x] **Found and fixed a second migration bug**: `00018` metadata index used `using gist (metadata
jsonb_path_ops)`, but `jsonb_path_ops` is a **GIN** opclass → the migration failed with
      `operator class "jsonb_path_ops" does not exist for access method "gist"`. Changed to `using gin`.
- [x] **Verified in the live DB**: `bot_training_cases`, `knowledge_chunks` (with `chunk_index`/`embedding_model`/
      `run_id`), `bot_conversation_log` all exist; RLS enabled on all three; `rag_pipeline_status` view present;
      industry tables (`pharmaceutical_topics`, `industry_knowledge_entries`, `drug_industry_connections`,
      `industry_terms`, `kenyan_manufacturers`) present.
- [x] **Verified `Supabase Preview` is green** on push `4445d6e` — all 4 checks pass (`Supabase Preview`, Lint & Unit Tests, E2E, Production Build); both Vercel projects (`clinova`, `clinova-main`) deployed it, live `/api/ready` → `{status:ready, supabase:true}`.
- [x] **Guard against recurrence** (done 2026-11-20): added `migration-history` job to `.github/workflows/ci.yml` that runs `supabase migration list --linked` via `scripts/check-supabase-migrations.sh` (`npm run check:migrations`). Skips with an explicit notice when `SUPABASE_ACCESS_TOKEN` and project ref secrets are unavailable (e.g. fork PRs); when configured, links the project and fails fast with actionable reconciliation guidance on drift or CLI/link errors. Drift-detection awk parsing corrected during review (separator regex) and sanity-tested. Not end-to-end verified against a live linked project (no secrets in this environment).
- [x] **Tooling**: `scripts/build-db-explorer.mjs` → `docs/db-explorer.html` (searchable table/column browser +
      Mermaid ER diagram) for visual DB inspection without the dashboard.

---

### Phase 16 — Confirmed Runtime Bugs (open)

- [x] **Medium — Empty Ollama responses treated as success** (done 2026-11-20, `src/server/aiRouter.ts`): added shared `ensureUsableProviderText` validation; forced-override and normal fallback paths now reject null/missing/whitespace-only text before recording success/returning (so empty 200s throw and fail over instead of returning `""`). `streamGenerateContent` treats an empty/whitespace Gemini stream as failure (falls through to buffered fallback) and requires usable buffered fallback text (throws instead of silently returning `""`). Verified: tsc clean, eslint 0 errors on touched code, targeted vitest 46/46 pass, and reproduction shows empty/whitespace responses fail over while valid responses still return.
- [x] **Medium — Raw text attachments incorrectly Base64-decoded** (done 2026-11-20, `server.ts`, `/api/gemini/assistant`): data URLs decode payload as base64; PDFs/images remain base64 `inlineData` (with or without data URL). Undecorated non-binary attachments are treated as raw text unless payload is clearly base64 (canonical round-trip), so plain text (e.g. `"Hello"`) is preserved while base64-encoded text without a data URL still decodes. Verified by reproduction: raw text, data-URL text, base64-text-no-prefix, and base64 PDF/image cases behave correctly. Limitation: a rare undecorated string that is itself a canonical base64 round-trip may be interpreted as base64.
