# Backend Environment Variables — Reference (Audit Phase 10)

> Read-only audit of `server.ts`, `src/lib/firebase.ts`, `src/lib/supabase.ts`, `.env.example`.

## Required for core function
| Var | Used by | Notes |
|-----|---------|-------|
| `GEMINI_API_KEY` | server.ts / aiRouter | **Minimum viable dependency** (readiness gate). Gemini text + image generation. |
| `GEMINI_API_KEY_1`, `GEMINI_API_KEY_2` | aiRouter | Quota-rotation fallbacks (optional). |
| `SUPABASE_URL` | server.ts (service-role), supabase.ts | Postgres + Storage. Falls back to `VITE_SUPABASE_URL`. |
| `SUPABASE_SERVICE_ROLE_KEY` | server.ts | **Server-only**; bypasses RLS. Never ship to client. |
| `VITE_FIREBASE_*` (6 vars) | firebase.ts | Client Firebase auth/DB/storage. Required for SPA login. |

## Optional / secondary
| Var | Used by | Notes |
|-----|---------|-------|
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | supabase.ts (browser) | Cloud sync/backup; client fails soft if missing. |
| `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET` | server.ts cloudinary proxy | Media uploads. |
| `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | (reserved) | Not currently read server-side. |
| `OPENROUTER_API_KEY` | aiRouter | Secondary provider; readiness reports but not required. |
| `CEREBRAS_API_KEY`, `COHERE_API_KEY`, `MISTRAL_API_KEY`, `JINA_API_KEY`, `NIH_API_KEY` | aiRouter | Multi-provider reserves; unused in current request path. |

## New — API protection (added this audit; opt-in, OFF by default → non-breaking)
| Var | Default | Effect |
|-----|---------|--------|
| `RATE_LIMIT_ENABLED` | `false` | Enable sliding-window rate limiting on `/api/*`. |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Window size. |
| `RATE_LIMIT_MAX` | `300` | Max requests per IP per window. |
| `API_REQUIRE_AUTH` | `false` | Require `Authorization: Bearer <API_SHARED_SECRET>` on `/api/*`. |
| `API_SHARED_SECRET` | `""` | Shared secret for the bearer check. |

## Deprecated / risk notes
- `firebase.ts` ships a hardcoded fallback `apiKey` in source. Web API keys are not secret, but should come from env only to avoid drift. (Risk R4)
- No separation of dev vs prod secrets enforced; same `.env` drives both. (Phase 10)
- `CLOUDINARY_API_KEY/SECRET` defined but **not consumed** server-side — dead config. (Risk R5-lite)
