# Clinova Backend — Handoff Manual

## 1. Architecture at a Glance
- **SPA** (React/Vite) — Firebase auth/session; calls AI via `server.ts`.
- **`server.ts`** (Express, port 3000) — Gemini AI proxy, Cloudinary proxy, chunked uploads, Supabase service-role writes.
- **Firebase** — user auth + app Firestore DB + user Storage.
- **Supabase (Postgres + Storage)** — content store (cases, monographs, knowledge graph, curriculum). Writable only via server service-role key; publicly readable.
- **Google Gemini** — all generative AI (`@google/genai`), quota-rotation via `GEMINI_API_KEY_1/_2`.
- **Cloudinary** — rich media uploads.

## 2. Local Run
```bash
cp .env.example .env        # fill GEMINI_API_KEY, SUPABASE_SERVICE_ROLE_KEY, VITE_FIREBASE_*
npm install
npm run dev                 # tsx server.ts  (port 3000)
npm run build               # vite build + esbuild server bundle -> dist/server.cjs
npm start                   # node dist/server.cjs
supabase start              # local Postgres + RLS (port 54321/54322)
```

## 3. Environment (required)
- `GEMINI_API_KEY` — **required** (readiness gate).
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — server writes (never expose service-role key).
- `VITE_FIREBASE_*` — SPA login.
- Optional: `VITE_SUPABASE_URL/ANON_KEY` (browser read/sync), Cloudinary preset, multi-provider keys.
- New (opt-in hardening): `RATE_LIMIT_ENABLED`, `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`, `API_REQUIRE_AUTH`, `API_SHARED_SECRET`.

## 4. Auth Flow (important)
- Users authenticate with **Firebase** in the SPA.
- The Express server does **NOT** verify Firebase sessions. The `/api/*` routes are open unless `API_REQUIRE_AUTH=true` is set (then require `Authorization: Bearer <API_SHARED_SECRET>`).
- Supabase RLS assumes Supabase Auth (`auth.uid()`), which is unused → client-side Supabase writes are blocked; all writes go through the server service-role key. **Treat Supabase as server-writable, public-readable.**

## 5. Health & Ops
- `GET /api/health` → `{status:'ok', uptime, ts}`.
- `GET /api/ready` → `{status:'ready'|'degraded', deps:{gemini,supabase,openrouter}}`; 503 if Gemini key missing.
- Logs: console error logs on AI/cloudinary/chunk failures.

## 6. Storage Map
- User content → Firebase Storage.
- Media/images → Cloudinary (via preset or `/api/cloudinary/upload`).
- Chunked uploads → local `uploads/` (assembled to `uploads/<id>_<name>`); temp chunks under `uploads/tmp/<uploadId>` cleaned on success and failure.

## 7. Recovery / Disaster
- Postgres is the system of record for content; restore via `supabase db` dump/restore or migrations (`supabase/migrations/*`).
- Firebase is system of record for users + app data; use Firebase export.
- Service-role key compromise → rotate immediately and restart server.

## 8. Known Gaps (see audit docs)
- No API auth/rate-limit by default (opt-in only).
- Supabase user-isolation not enforced at DB layer.
- No background jobs / caching; heavy work is request-synchronous.
- Several `/api/gemini/*` routes likely legacy — confirm before pruning.
