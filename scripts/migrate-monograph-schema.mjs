/**
 * migrate-monograph-schema.mjs — adds the rich monograph columns that the
 * app (knowledgeEngine, monographToMarkdown, drugIndexData) expects and that
 * generate-drug-monographs.ts emits. Idempotent. Uses the Management API SQL
 * endpoint. Run: node scripts/migrate-monograph-schema.mjs
 */
import 'dotenv/config'

const token = process.env.SUPABASE_ACCESS_TOKEN
const ref = process.env.SUPABASE_PROJECT_REF
if (!token || !ref) {
  console.error('Missing SUPABASE_ACCESS_TOKEN or SUPABASE_PROJECT_REF in .env')
  process.exit(1)
}

const ENDPOINT = `https://api.supabase.com/v1/projects/${ref}/database/query`

async function runSql(query) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`SQL failed (${res.status}): ${text.substring(0, 300)}`)
  }
  const json = await res.json()
  return Array.isArray(json) ? json : json?.data ?? json
}

const ADD_COLUMNS = [
  ['mechanism_of_action', 'text'],
  ["brand_names", "text[] DEFAULT '{}'::text[]"],
  ["warnings", "text[] DEFAULT '{}'::text[]"],
  ['pregnancy_category', 'text'],
  ['overdose', 'text'],
  ['pharmacokinetics', 'text'],
  ["black_box_warnings", "text[] DEFAULT '{}'::text[]"],
  ["clinical_pearls", "text[] DEFAULT '{}'::text[]"],
]

const current = await runSql(
  `SELECT column_name FROM information_schema.columns
   WHERE table_schema = 'public' AND table_name = 'drug_monographs'`
)
const existing = new Set(current.map((r) => r.column_name))
console.log('Current drug_monographs columns:', [...existing].sort().join(', '))

for (const [name, def] of ADD_COLUMNS) {
  if (existing.has(name)) {
    console.log(`  exists: ${name}`)
    continue
  }
  await runSql(
    `ALTER TABLE public.drug_monographs ADD COLUMN IF NOT EXISTS "${name}" ${def}`
  )
  console.log(`  added: ${name} (${def})`)
}

const after = await runSql(
  `SELECT column_name FROM information_schema.columns
   WHERE table_schema = 'public' AND table_name = 'drug_monographs'`
)
console.log('After:', after.map((r) => r.column_name).sort().join(', '))
