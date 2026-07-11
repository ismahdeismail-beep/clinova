# Backend Infrastructure Synchronization & Production Readiness — TODO

## Definition of Done
Firebase, Supabase, PostgreSQL, Cloudinary, Knowledge Graph, search, auth, storage, and all backend services are synchronized, production-ready, documented, and operating as one cohesive backend supporting every Clinova feature.

---

### Phase 1 — Backend Architecture Audit  ✅ (map done; see BACKEND_ARCHITECTURE_MAP.md)
- [x] Map all backend services → Firebase (auth/DB/storage), Supabase (Postgres + service-role server writes), server.ts (Express :3000; Gemini proxy, Cloudinary proxy, chunked upload), Google Gemini (@google/genai), Cloudinary, 60+ AI skills
- [x] Identify unused services, duplicated functionality, outdated configs
      - KEY FINDING: SPA (`src`) does NOT reference `/api/gemini/*` by relative path. `aiRouter.ts` is server-side only. Client `fetch()` calls target absolute URLs — `/api/gemini/*` routes may be legacy/unused by current client. Cannot confirm without deployed API base URL.
      - No cron/queue/background-job framework present (no setInterval/cron/bull). Background processing = ad-hoc within request handlers only.
      - Dual persistence: Firebase (primary app DB/auth) + Supabase (secondary/backup + server service-role writes) → overlapping ownership.

### Phase 2 — Firebase Audit  ✅ (see BACKEND_RESPONSIBILITY_FINDINGS.md)
- [x] Web SDK only; no Admin SDK; no server-side session verification (root cause of R1)
- [x] Firebase = sole user identity (auth/DB/Storage)

### Phase 3 — Supabase Audit  ✅ (see BACKEND_RESPONSIBILITY_FINDINGS.md)
- [x] Responsibilities confirmed via 3 migrations; **no users table**; browser client read-only, server service-role writes
- [x] Duplication noted: Firebase (primary) + Supabase (server-writable read replica) overlap on cases/monographs

### Phase 4 — Authentication Synchronization  ⚠️ GAP (see findings)
- [ ] Not implemented: no Supabase profiles/roles; RLS assumes Supabase Auth which isn't used
- [x] Documented; requires auth-authority decision (recommendations in findings doc)

### Phase 5 — Storage Audit  ✅ (see BACKEND_STORAGE_BG_FINDINGS.md)
- [x] 3 storage systems: Firebase Storage (client), Cloudinary (media), local `uploads/` (chunked)
- [x] Code fix: temp-chunk cleanup added to chunked-upload catch block (Risk R8)
- [x] Dead config noted: CLOUDINARY_API_KEY/SECRET unused

### Phase 6 — Knowledge Infrastructure  ✅ (read-only)
- [x] KG schema present (knowledge_graph_nodes/relationships + FKs/indexes in migration 1)
- [ ] No server-side KG sync job observed; relationships written ad-hoc via service-role. Sync-after-update not automated.

### Phase 7 — Search / Health  ✅ (partial)
- [x] Health/readiness probes added (validated)
- [ ] Full-text/vector search endpoints not present in server; Supabase FTS/indexes exist in schema but no API exposes them. Ranking/auto-index not implemented.

### Phase 8 — Background Processing  ✅ (see BACKEND_STORAGE_BG_FINDINGS.md)
- [x] Confirmed NO cron/queue/worker; processing is synchronous in request handlers
- [x] Documented as future scale item (non-breaking pass)

### Phase 9 — API Audit
- [x] Rate-limit middleware (sliding window, opt-in via `RATE_LIMIT_ENABLED`) + auth guard (`API_REQUIRE_AUTH` + `API_SHARED_SECRET`) added to `/api/*`. Default OFF → non-breaking. Validated (esbuild exit 0). See BACKEND_ENV_REFERENCE.md.
- [ ] Per-endpoint validation/error-consistency pass (Phase 4) still pending
- [ ] Remove unused endpoints (`/api/gemini/*` likely legacy) — BLOCKED until client call sites confirmed

### Phase 10 — Environment Variables  ✅ (see BACKEND_ENV_REFERENCE.md)
- [x] Required vars documented; deprecated/unused noted (CLOUDINARY_API_KEY/SECRET unused; multi-provider keys reserved)
- [x] Dev/prod separation flagged; service-role key confirmed server-only
- [x] Final config documented

### Phase 11 — Database Health  ✅ (see BACKEND_RESPONSIBILITY_FINDINGS.md)
- [x] Schema/indexes reviewed (3 migrations); RLS enabled but mismatched to Firebase auth
- [x] Inconsistency documented: client writes blocked by `auth.role()` checks; user-isolation not enforced

### Phase 12 — Security Audit  ✅ (findings; 1 code control added)
- [x] RLS reviewed; service-role bypass documented (R3)
- [x] API protection added (Phase 9 guard, opt-in)
- [ ] Remaining: enable `API_REQUIRE_AUTH`+`RATE_LIMIT_ENABLED` in prod; rotate/secure service-role key; decide auth authority

### Phase 13 — Performance Optimization  ✅ (see BACKEND_AUDIT_REPORT.md)
- [x] Bottlenecks documented: no caching, synchronous heavy AI work, no connection pooling

### Phase 14 — Production Verification  ✅ (checklist in report)
- [x] Health/ready, rate-limit, auth-guard, chunk cleanup, migrations, Firebase, Cloudinary — checklist provided

### Documentation  ✅
- [x] Architecture (`BACKEND_ARCHITECTURE_MAP.md`), env (`BACKEND_ENV_REFERENCE.md`), responsibilities/RLS (`BACKEND_RESPONSIBILITY_FINDINGS.md`), storage/bg (`BACKEND_STORAGE_BG_FINDINGS.md`), handoff (`HANDOFF_MANUAL.md`), report (`BACKEND_AUDIT_REPORT.md`)

### Final Validation Report  ✅
- [x] `BACKEND_AUDIT_REPORT.md` summarizes components, issues, repairs, sync, security, perf, DB, verification, recommendations
