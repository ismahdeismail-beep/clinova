import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })

// existing names (including just-inserted)
const dbRows: any[] = []
for (let from = 0; from < 4000; from += 1000) {
  const { data } = await admin.from('drug_monographs').select('name, generic_name').range(from, from + 999)
  if (!data?.length) break
  dbRows.push(...data)
  if (data.length < 1000) break
}
const dbNames = new Set(dbRows.map((r: any) => (r.name ?? '').toLowerCase().trim()))
console.log('DB total:', dbRows.length)

// which bundled drugs would collide on name?
const collisions: { bundled: string; dbName: string }[] = []
for (const d of BUNDLED_DRUGS) {
  const bn = (d as any).name?.toLowerCase().trim()
  if (dbNames.has(bn)) collisions.push({ bundled: (d as any).name, dbName: bn })
}
console.log('bundled entries whose name collides with existing DB name:', collisions.length)
for (const c of collisions.slice(0, 30)) console.log('  ', c.bundled.padEnd(35), '→ DB has name', c.dbName)
