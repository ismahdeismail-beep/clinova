# Storage & Background Processing Findings (Audit Phases 5 / 8)

## Phase 5 — Storage
Three distinct storage systems coexist:
1. **Firebase Storage** (`src/lib/firebase.ts` `storage`) — client-side user uploads (notes, case files, profile media).
2. **Cloudinary** — media/images via signed upload preset (`VITE_CLOUDINARY_*`) or server proxy `POST /api/cloudinary/upload` (`server.ts`).
3. **Supabase Storage** — server-side chunked upload `POST /api/upload/chunk` (`server.ts`) writes to a Supabase bucket using the service-role client.

Findings:
- **No single source of truth for files**; metadata linking across systems is unclear (spec wants Supabase to hold "metadata/relationships/file refs" while Cloudinary/Firebase hold bytes).
- `CLOUDINARY_API_KEY`/`CLOUDINARY_API_SECRET` are defined in `.env.example` but **never read** server-side → dead config (cloudinary proxy relies only on the unsigned upload preset).
- Chunked upload temp files: handler reassembles chunks then uploads to Supabase; local temp cleanup not verified → potential disk growth on the server (Risk R8). Needs a cleanup step or stream-to-storage.

## Phase 8 — Background Processing
- **No cron, queue, worker, or scheduler** exists (grep: no `setInterval`/`node-cron`/`bull`/`agenda`/`worker`).
- All "processing" (AI generation, file assembly, Supabase writes) happens **synchronously inside request handlers**.
- Implications:
  - Long AI generations block the request; no retry/safe-failure reporting framework.
  - No async index/embedding generation, no scheduled cleanup, no notification jobs.
  - For production scale this needs a job queue (e.g., a lightweight worker) — but adding one is a larger change; out of scope for non-breaking pass.

### Recommendations
- Document the intended storage authority per file type (Firebase = user content, Cloudinary = rich media, Supabase = server-generated/structured).
- Add an explicit temp-file cleanup in the chunked-upload handler (unlink on success/error).
- Remove or wire up the unused Cloudinary API key/secret.
- Treat background processing as a future scale item; current design is request-bound by design.
