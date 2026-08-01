/**
 * db.mjs — reusable SQL runner against the hosted Supabase project via the
 * Management API. Usage:
 *   node scripts/db.mjs "SELECT COUNT(*) FROM drug_monographs"
 *   echo "SELECT 1" | node scripts/db.mjs
 */
import 'dotenv/config'

const token = process.env.SUPABASE_ACCESS_TOKEN
const ref = process.env.SUPABASE_PROJECT_REF

if (!token || !ref) {
  console.error('Missing SUPABASE_ACCESS_TOKEN or SUPABASE_PROJECT_REF in .env')
  process.exit(1)
}

const sql = process.argv[2] || (await readStdin())
if (!sql) {
  console.error('Usage: node scripts/db.mjs "<SQL QUERY>"')
  process.exit(1)
}

const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: sql }),
})

if (!res.ok) {
  console.error(`SQL failed (${res.status}): ${(await res.text()).substring(0, 800)}`)
  process.exit(1)
}

console.log(JSON.stringify(await res.json(), null, 2))

async function readStdin() {
  if (process.stdin.isTTY) return ''
  let buf = ''
  for await (const chunk of process.stdin) buf += chunk
  return buf.trim()
}
