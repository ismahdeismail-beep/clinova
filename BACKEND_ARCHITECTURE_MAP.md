# Clinova Backend — Architecture & Dependency Map (Audit Phase 1)

> Status: DRAFT for review. No runtime changes made. Read-only audit.

## 1. Components

| Component | Location | Role |
|-----------|----------|------|
| SPA (React/Vite) | `src/` | Client UI, Firebase auth/session, Supabase browser client, calls `/api/gemini/*` |
| API server | `server.ts` (Express, port 3000) | AI proxy to Gemini, Cloudinary upload proxy, chunked uploads, Supabase service-role writes |
| AI router | `src/server/aiRouter.ts` | Selects provider/key, quota rotation, builds requests |
| Academic engine | `src/server/academicEngine.ts` | Orchestrates skill graph for study/research tasks |
| Prompt registry | `src/server/promptRegistry.ts` | Centralized system prompts |
| Skills | `src/server/ai/skills/*` (60+ SKILL.md) | Domain capability definitions consumed by the engine |
| External medicine API | `src/server/externalMedicinesApi.ts` | RXNorm / external drug lookups |
| Firebase | `src/lib/firebase.ts` | Client auth (`auth`), Firestore (`db`), Storage (`storage`) |
| Supabase | `src/lib/supabase.ts` (browser) + service-role in `server.ts` | Postgres (DB) + Storage; browser client fails soft if env missing |
| Google Gemini | `@google/genai` via `GEMINI_API_KEY` (+ `_1`, `_2` fallbacks) | All generative AI |
| Cloudinary | `CLOUDINARY_API_KEY/SECRET` + upload preset | Media/image storage (server proxy) |

## 2. Request Flows

```
Browser (Firebase auth)
   │
   ├─ Firestore read/write (notes, patients, progress, cases) ───── Firebase
   ├─ Supabase browser client (cloud sync/backup) ─────────────── Supabase
   └─ AI request ──► POST /api/gemini/* ──► aiRouter ──► Gemini (@google/genai)
                                                       └─► Supabase service-role (save outputs)
        upload ──► POST /api/upload (Cloudinary signed) or /api/chunked-upload ──► Supabase Storage
```

## 3. Service Boundary Observations

- **Firebase = primary auth + app DB** (client SDK). Supabase is secondary/backup + server-side privileged writes via service-role.
- `server.ts` holds its own Supabase **service-role** client (`createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)`) → bypasses RLS. Highest-risk surface.
- No shared session verification between client Firebase auth and `server.ts`. Endpoints trust the caller.

## 4. Risk Register (P0–P3)

| ID | Sev | Finding | Phase |
|----|-----|---------|-------|
| R1 | P0 | **No auth on any `/api/gemini/*` route** → anyone can consume quota / trigger service-role writes | 12 |
| R2 | P0 | **No rate limiting** on AI or upload endpoints | 9 |
| R3 | P1 | Supabase **service-role** used server-side → RLS bypass; misconfiguration = full DB exposure | 12 |
| R4 | P2 | Hardcoded Firebase fallback `apiKey` in `firebase.ts` (web key, expected but should be env-only) | 11 |
| R5 | P2 | Many **legacy/likely-unused endpoints** (`/quiz`, `/flashcards`, `/assessment`, `/bcpnp`, `/ask`, `/patients`) → attack surface + maintenance debt | 5 |
| R6 | P2 | Inconsistent error envelopes; some leak provider strings ("Gemini", "Model high demand") | 4 |
| R7 | P3 | No health/readiness endpoint for infra checks | 7 |
| R8 | P3 | `chunked-upload` temp file cleanup not verified; potential disk growth | 8 |

## 5. Phasing Recommendation (safe order)

1. **Phase 1 (this doc)** — map + risk register. ✓
2. **Phase 4 (error envelope) + Phase 7 (health endpoint)** — low-risk, additive.
3. **Phase 9 (rate limit) + Phase 12 (auth guard)** — must ship together; touch all routes.
4. **Phase 5 (dead-code/legacy endpoint removal)** — after confirming client no longer calls them.
5. **Phase 2/3 (data ownership, sync logic)** — design-only until R1/R2/R3 resolved.
6. **Phase 6/8/10/11/13/14** — validation, docs, CI, monitoring.

> Open question for user: confirm which endpoints are still called by the client before removing legacy routes (R5). Client call sites must be grepped before deletion.
