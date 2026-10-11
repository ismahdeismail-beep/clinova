# Backend Infrastructure Synchronization & Production Readiness — TODO

> **Status (2026-10-11):** Phases 1–3, 5, 8–11, 13–14 and documentation are complete.
> Shipped today: Phase 9 validation/error-consistency pass + a production route-registration fix
> (academic-engine & `/api/library/*` routes were never registered on Vercel), verified on the live deploy.
> **Open items:** Phase 4 (auth authority), Phase 6 (KG sync job), Phase 7 (search API), Phase 12 (prod security env),
> **Phase 15 (CI/CD "Supabase Preview" is red on every commit — migration-history drift).**

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
- [ ] No server-side KG sync job observed; relationships written ad-hoc via service-role. Sync-after-update not automated.

### Phase 7 — Search / Health ✅ (partial)

- [x] Health/readiness probes added (validated)
- [ ] Full-text/vector search endpoints not present in server; Supabase FTS/indexes exist in schema but no API exposes them. Ranking/auto-index not implemented.

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

### Phase 15 — CI/CD & Deploy Health ⚠️ INVESTIGATED 2026-10-11

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
- [ ] **Confirm the drift** (needs a Supabase access token — none is present on this machine; no `supabase`
      CLI installed, no `supabase/.temp` link):
      `supabase link --project-ref bveztrtykjburdhewcdy && supabase migration list --linked`
      → the `Remote`-only rows are the versions to reconcile.
- [ ] **Suspect #1 — duplicate local version 12**: `supabase/migrations/00012_drug_images.sql` and
      `supabase/migrations/000012_disease_notes.sql` both resolve to migration version **12** (mixed 5-digit
      vs 6-digit prefixes). Renumber one of them (e.g. `00012_drug_images.sql` → `000021_drug_images.sql`)
      so every migration has a unique, correctly-padded version.
- [ ] **Suspect #2 — local gaps**: versions `000007`, `000009`, `000011` are absent locally but may exist on
      remote (applied out-of-band via `scripts/applyMigrationApi.ts` / `scripts/db.mjs`, which run raw SQL and
      do **not** record versions). Recreate matching files, or retire them on remote with
      `supabase migration repair <version> --status reverted --linked`.
- [ ] **Apply the RAG schema**: once reconciled, `supabase db push --linked` must apply `00017`–`00020`
      (bot_training_cases / knowledge_chunks / bot_conversation_log / RAG hardening). **These tables are
      therefore not yet verified present on Supabase**, which currently blocks the RAG pipeline end-to-end.
- [ ] **Guard against recurrence**: apply migrations through the CLI/CI (never raw SQL), and add a
      `supabase migration list --linked` check to CI so a red/mismatched history fails fast with a clear
      message instead of a mystery "Preview" failure.
- [ ] **Consequence for Vercel**: `Supabase Preview` is a PR/preview-branch check, not the production deploy —
      production is unaffected, but the noisy red X makes real regressions invisible. Consider making the
      Supabase integration preview-only or fixing the history so the check goes green.
