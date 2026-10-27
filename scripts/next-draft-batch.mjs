/**
 * next-draft-batch.mjs — print the next N `template` monographs that have no
 * draft file yet, so authoring batches can be dispatched without re-querying.
 *
 *   node scripts/next-draft-batch.mjs 48
 */
import 'dotenv/config'
import { readdirSync, readFileSync } from 'node:fs'

const limit = Number(process.argv[2] || 36)

const token = process.env.SUPABASE_ACCESS_TOKEN
const ref = process.env.SUPABASE_PROJECT_REF
if (!token || !ref) {
  console.error('Missing SUPABASE_ACCESS_TOKEN or SUPABASE_PROJECT_REF in .env')
  process.exit(1)
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

const rows = await sql(
  "select name from drug_monographs where content_status = 'template' order by name",
)
const names = rows.map((r) => r.name)

const done = new Set()
for (const f of readdirSync('drafts/monographs')) {
  if (!f.endsWith('.json')) continue
  try {
    done.add(JSON.parse(readFileSync(`drafts/monographs/${f}`, 'utf8')).name)
  } catch {
    /* ignore unreadable draft */
  }
}

const rest = names.filter((n) => !done.has(n))
console.error(
  `template=${names.length} drafted=${names.length - rest.length} remaining=${rest.length}`,
)
for (const n of rest.slice(0, limit)) console.log(n)
