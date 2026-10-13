/**
 * verify-rag.mjs — assert the RAG corpus is complete and print the monitor view.
 *
 * Exits 0 only once every monograph is covered (so it can gate a cron / CI),
 * 1 while chunks are still being filled, 2 on a setup error.
 *
 *   node scripts/verify-rag.mjs
 *   npm run rag:verify
 *
 * Env: SUPABASE_ACCESS_TOKEN, SUPABASE_PROJECT_REF (same as scripts/db.mjs).
 */
import 'dotenv/config'

const token = process.env.SUPABASE_ACCESS_TOKEN
const ref = process.env.SUPABASE_PROJECT_REF
if (!token || !ref) {
  console.error('Missing SUPABASE_ACCESS_TOKEN or SUPABASE_PROJECT_REF in .env')
  process.exit(2)
}

async function sql(query) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  if (!res.ok) throw new Error(`SQL failed (${res.status}): ${(await res.text()).slice(0, 300)}`)
  return res.json()
}

const [row] = await sql('select * from rag_pipeline_status')
const covered = Number(row.covered_monographs)
const total = Number(row.total_monographs)
const pct = total ? Math.round((covered / total) * 100) : 0

console.log(
  `RAG corpus: ${covered}/${total} monographs (${pct}%) · ${row.knowledge_chunks} chunks · ` +
    `${row.approved_cases} approved cases · run ${row.latest_run_id ?? '—'}`,
)

if (covered < total) {
  console.log(
    `INCOMPLETE — ${total - covered} monographs still need chunks ` +
      `(free-tier resume fills ~1000 texts/day; see docs/rag-ingest-schedule.md).`,
  )
  process.exit(1)
}
console.log('COMPLETE — full monograph coverage reached. Run: npm run rag:weekly')
