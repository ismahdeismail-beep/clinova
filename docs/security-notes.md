# Security notes & credential rotation runbook

## What was fixed (2026‑10‑12)

### `vercel.json` cron secret — FIXED (commit `435ea9a`)

- `/api/push/daily` previously carried its trigger secret in the cron path
  (`?secret=2ZTR…`) and that file is **committed to the repo** (and in git
  history). Removed.
- `server.ts` now authenticates the cron via Vercel's documented
  `User-Agent: Vercel-Cron` marker; any non-cron caller must present a secret
  matching the `PUSH_CRON_SECRET` env var (query or Bearer), compared in constant
  time.
- A fresh random `PUSH_CRON_SECRET` was generated and stored **only** in the
  gitignored `.env` (`c8743150…`).
- Residual risk (documented in code): the `Vercel-Cron` user-agent is spoofable,
  but the endpoint is idempotent per user/day (`dedupe_key`), so abuse can only
  re-trigger the already-scheduled daily push.

**Action required:** set `PUSH_CRON_SECRET` in the Vercel dashboard (Project →
Settings → Environment Variables) so any secret value that ever appeared in git
history is irrelevant:

```
PUSH_CRON_SECRET=<the value now in .env>
```

## Not fixed here — requires your dashboard/Vercel action

Two Supabase credentials were pasted into chat earlier (2018-era exposure) and
**cannot be rotated programmatically from this machine**:

1. The Management API rejects the legacy personal access token (`sbp_…`) on the
   token-management endpoints (`/v1/access-tokens` returned
   `"JWT could not be decoded"`) — rotation is dashboard/CLI-only.
2. Rotating keys via the dashboard invalidates the current key immediately, but
   the production app (`adminClient.ts`) reads `SUPABASE_SERVICE_ROLE_KEY` from
   **Vercel env**, which is not reachable from here — so a one-sided rotation
   would take production down.

### Runbook A — rotate Supabase personal access token (Management API)

1. Dashboard → Account → Access Tokens (https://supabase.com/dashboard/account/tokens)
2. **Revoke** the token that matches the `.env` value (prefix `sbp_fc…`), or
   wait for expiry if it has one.
3. **Create** a new token, scoped as narrowly as possible (only the projects/
   permissions you actually need).
4. Update `.env`:
   `SUPABASE_ACCESS_TOKEN=<new>`
5. Verify: `node scripts/db.mjs "select 1;"` returns `[{ "?column?": 1 }]`.

### Runbook B — rotate Supabase anon + service-role keys (project API keys)

> ⚠️ Do **both** steps close together. Rotating first, then updating Vercel,
> leaves a window where production cannot reach the DB.

1. Dashboard → Project → Settings → API → **Regenerate** each API key.
2. Update both places:
   - gitignored `.env`: `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (and
     the `VITE_` mirrors below).
   - Vercel dashboard → Project → Settings → Environment Variables →
     `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (Production
     - Preview + Development).
3. Verify locally: `node scripts/db.mjs "select count(*) from drug_monographs;"`
   and, after redeploying, `curl https://clinova-main.vercel.app/api/ready`
   must report `"supabase": true`.

### What's safe to leave

- `VITE_SUPABASE_ANON_KEY` and `SUPABASE_ANON_KEY` are public by design
  (client-side); RLS is deny-by-default on the backend tables. Rotating them is
  still recommended above because they were in chat, but they are not secret.

## Tracked-file secret scan (2026‑10‑13) — CLEAN

A full scan of every tracked file (`git grep`, excluding `package-lock.json`) for
committed secrets found **none**:

- No Google API keys (`AIza…`) — the only match is the Firebase **web** API key
  (see below), which is not a secret.
- No JWTs / Supabase anon or service-role tokens (`eyJ….….…`), no `sbp_…`
  personal access tokens, no `sk-…`/`Bearer …` values.
- Every `SUPABASE_SERVICE_ROLE_KEY` reference is a `process.env` read; the
  `.env.example` files hold placeholders only.

**Firebase Web API key is public by design.** `src/lib/firebase.ts` and
`server.ts` fall back to the literal key
`AIzaSyBOXVvQm2JxW7JT9CXlFeZqC23iSrX3GoA` when `VITE_FIREBASE_API_KEY` is unset.
This is intended: Google ships the Firebase web API key in every client bundle
and it identifies the project, it does not authorize anything. Access is
governed by **Firebase Security Rules**, not key secrecy. Do not rotate/remove
it; do keep Firestore/Auth/Storage rules deny-by-default. The bundled fallback
exists so the app works against the default project without env config.

## General rules in this repo

- `.env`, `.env.*`, `logs/` are gitignored — never force-add them.
- Never put a secret into `vercel.json`, `*.md` examples, or code; env vars only.
- `scripts/` read secrets exclusively from env (see `scripts/db.mjs`,
  `ensure-rag.ts`, `import-cases.ts`, `train-rag-weekly.ts`).
