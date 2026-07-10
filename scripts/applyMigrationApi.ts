/**
 * applyMigrationApi.ts
 * ----------------------------------------------------------------------------
 * Applies a Supabase migration SQL through the Management API database-query
 * endpoint. Used when the local environment cannot open a direct Postgres TCP
 * connection (e.g. IPv6-only DB host). Runs SQL with superuser privileges.
 *
 * Run:  npx tsx scripts/applyMigrationApi.ts
 * Env:  SUPABASE_ACCESS_TOKEN, SUPABASE_PROJECT_REF
 */
import 'dotenv/config';
import { readFileSync } from 'node:fs';

const token = process.env.SUPABASE_ACCESS_TOKEN;
const ref = process.env.SUPABASE_PROJECT_REF ?? 'bveztrtykjburdhewcdy';
const file = process.argv[2] ?? 'supabase/migrations/0001_init_clinova_schema.sql';

if (!token) {
  console.error('[apply] Missing SUPABASE_ACCESS_TOKEN in .env');
  process.exit(1);
}

const sql = readFileSync(file, 'utf8');

const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: sql }),
});

const text = await res.text();
if (!res.ok) {
  console.error(`[apply] HTTP ${res.status}\n${text}`);
  process.exit(1);
}
console.log(`[apply] OK. Applied ${file}. Response bytes: ${text.length}`);
try {
  const j = JSON.parse(text);
  console.log('[apply] first row sample:', JSON.stringify(j).slice(0, 200));
} catch {
  console.log('[apply] response (non-JSON):', text.slice(0, 200));
}
