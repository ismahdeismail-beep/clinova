# Clinova Backend — Final Audit & Validation Report

> Scope: read-only audit of `server.ts` (Express :3000), `src/lib/firebase.ts`, `src/lib/supabase.ts`, `supabase/migrations/*`, `.env.example`, plus targeted code hardening. No breaking changes introduced.

## Components Audited
- Express API server (`server.ts`, 2300+ LOC): `/api/gemini/*` (Gemini proxy), `/api/cloudinary/upload`, `/api/upload/chunk`, `/api/health`, `/api/ready`.
- AI router (`src/server/aiRouter.ts`) + `academicEngine.ts` + 60+ skill definitions.
- Firebase (web SDK: auth/DB/storage) — sole user identity.
- Supabase (Postgres + Storage; browser anon client + server service-role client).
- Google Gemini (`@google/genai`) with quota-rotation fallbacks.
- Cloudinary (media), local `uploads/` (chunked).

## Issues Found & Status
| Risk | Sev | Status |
|------|-----|--------|
| R1 No auth on `/api/*` | P0 | **Mitigated (opt-in):** `API_REQUIRE_AUTH` guard added; enable in prod. |
| R2 No rate limiting | P0 | **Mitigated (opt-in):** `RATE_LIMIT_ENABLED` guard added; enable in prod. |
| R3 Supabase service-role RLS bypass | P1 | Documented; keep key server-only; rotate if leaked. |
| R4 Hardcoded Firebase fallback key | P2 | Documented; move to env only. |
| R5 Legacy/unused `/api/gemini/*` routes | P2 | Documented; prune BLOCKED until client call sites confirmed. |
| R6 Inconsistent error envelopes / provider leakage | P2 | Partially noted; covered by separate AI-branding task. |
| R7 No health/readiness endpoint | P3 | **Fixed:** `/api/health` + `/api/ready` added. |
| R8 Chunked-upload temp-file leak | P3 | **Fixed:** best-effort cleanup in catch block. |

## Code Changes Made (all non-breaking)
1. `server.ts`: `GET /api/health`, `GET /api/ready` probes.
2. `server.ts`: opt-in `rateLimit` + `requireAuth` middleware on `/api/*` (default OFF).
3. `server.ts`: temp-chunk cleanup on chunked-upload failure.
4. Build validated via esbuild (`exit 0`; only pre-existing `import.meta` warnings).

## Synchronization Summary
- **Firebase** = primary app DB + user auth. **Supabase** = server-writable, publicly-readable content store (cases, monographs, KG, curriculum). Overlap is acceptable but should be documented as policy.
- **Auth authority mismatch:** Supabase RLS uses `auth.role()/auth.uid()` (Supabase Auth) but the app uses Firebase → client Supabase writes are silently blocked; all writes flow through the server service-role key. User-isolation is **not** enforced at DB level. Requires an auth-authority decision (see responsibility findings).

## Security Recommendations (for production enablement)
- Set `API_REQUIRE_AUTH=true` + `API_SHARED_SECRET=<strong>` and `RATE_LIMIT_ENABLED=true`.
- Decide & implement Supabase auth integration (Firebase JWT → Supabase) OR replace misleading "authenticated" RLS policies.
- Add `user_id` scoping if client writes are ever desired.
- Rotate `SUPABASE_SERVICE_ROLE_KEY`; never expose; restrict server egress.
- Remove unused `CLOUDINARY_API_KEY/SECRET` or wire them up.

## Performance (Phase 13)
- No caching layer; every AI request hits Gemini (cost/latency). `academicEngine` may cache per-session only.
- Synchronous request-bound processing; long generations block the event loop under load.
- Recommend: response caching for monographs/cases, a job queue for heavy generation, and connection pooling for Supabase.

## Production Verification Checklist (Phase 14)
- [ ] `GET /api/health` returns `{status:'ok'}`.
- [ ] `GET /api/ready` returns `status:'ready'` with Gemini key set.
- [ ] With `RATE_LIMIT_ENABLED=true`, rapid requests return 429 after limit.
- [ ] With `API_REQUIRE_AUTH=true`, requests without bearer return 401.
- [ ] Chunked upload leaves no `uploads/tmp/<id>` after success or failure.
- [ ] Supabase migrations apply cleanly (`supabase db reset`).
- [ ] Firebase login + Firestore read/write works in SPA.
- [ ] Cloudinary upload returns `secure_url`.

## Deliverables
- `BACKEND_ARCHITECTURE_MAP.md` — components, flows, risk register, phasing.
- `BACKEND_ENV_REFERENCE.md` — env var catalog.
- `BACKEND_RESPONSIBILITY_FINDINGS.md` — Firebase/Supabase/RLS gap analysis.
- `BACKEND_STORAGE_BG_FINDINGS.md` — storage + background processing.
- `HANDOFF_MANUAL.md` — operator-facing runbook.
- `BACKEND_AUDIT_TODO.md` — phase tracker (this report).
