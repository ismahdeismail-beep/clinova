# Clinova Disaster Recovery Plan (Phase 15)

## Data Sources

| Source | Location | Backup Method | RPO | RTO |
|--------|----------|--------------|-----|-----|
| PostgreSQL (Supabase) | Supabase Dashboard → Database → Backups | Daily automated (point-in-time recovery) | ~24h (PITR: 5min) | < 1h |
| File Storage (Supabase Storage) | Supabase Dashboard → Storage | Manual export via CLI/API | Per-schedule | < 2h |
| Server-side code (server.cjs) | Vercel deployment | Git history + Vercel rollback | Instant (git) | < 10min |
| Environment variables | Vercel Project Settings → Environment Variables | Manual backup to .env.example + 1Password | Per-update | < 15min |

## Recovery Procedures

### 1. Database Corruption / Accidental Delete
```bash
# List available backups
supabase backups list --project-ref <ref>

# Restore to a point in time
supabase db restore --project-ref <ref> --target-time "2026-07-13 12:00:00 UTC"

# Or clone to a temporary branch for data recovery
supabase branches create recovery-20260713 --project-ref <ref>
```

### 2. Full Application Failure (Region Outage)
1. **Switch Vercel region**: Vercel Dashboard → Project → Settings → Functions → Region
2. **Restore Supabase**: Supabase Dashboard → Project → Settings → Infrastructure → Restore
3. **Verify health**: `GET /api/health` and `GET /api/ready` on the new deployment

### 3. Environment Variable Loss
1. Vercel Dashboard → Project → Settings → Environment Variables → Add each
2. Required vars: `GEMINI_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_API_SECRET`
3. Optional: `OPENROUTER_API_KEY`, `CLOUDINARY_*`, `AI_RATE_LIMIT_MAX`

### 4. Embeddings / Vector Data Loss
```bash
# Re-generate from scratch (rate-limited, ~5-10min for full corpus)
curl -X POST https://<deploy>/api/admin/embeddings/reindex \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: <secret>" \
  -d '{"batchSize": 100}'

# Check status
curl https://<deploy>/api/admin/embeddings/status \
  -H "x-admin-secret: <secret>"
```

### 5. Git / Deployment Rollback
```bash
# Rollback Vercel to previous stable deployment
vercel rollback --token <token>

# Or git revert + push
git revert HEAD --no-edit
git push origin main
```

## Monitoring & Alerting

- **Health probe**: `GET /api/health` (returns 200 + uptime)
- **Readiness probe**: `GET /api/ready` (200 if Gemini key configured)
- **Structured logs**: JSON-formatted on Vercel (method, path, status, ms)
- **Supabase alerts**: Dashboard → Database → Monitoring → Configure alerts

## Prevention

- All write/admin endpoints behind `ADMIN_API_SECRET` (403 without header)
- AI rate limiter (default 60 req/min/IP) prevents cost-based DoS
- Row Level Security on all Supabase tables
- Per-IP rate limiting on `/api/gemini/*` (independent of global limiter)
