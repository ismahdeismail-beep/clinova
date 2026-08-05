import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const norm = (s: string) => s.toLowerCase().replace(/[\/–—\-+(),.'"]/g, ' ').replace(/\s+/g, ' ').trim()
const dbRows: any[] = []
for (let from = 0; from < 4000; from += 1000) {
  const { data } = await admin.from('drug_monographs').select('name, generic_name').range(from, from + 999)
  if (!data?.length) break
  dbRows.push(...data)
  if (data.length < 1000) break
}
const dbNameNorm = new Set(dbRows.map((r: any) => norm(r.name ?? '')))
const dbGenNorm = new Set(dbRows.map((r: any) => norm(r.generic_name ?? '')))

// same SALT_RE logic as seed
const SALT_RE = /\b(sodium|hydrochloride|sulfate|sulphate|fumarate|maleate|acetate|phosphate|isethionate|proxetil|fosamil|meglumine|tromethamine|diphosphate|medocaril|monohydrate|dihydrate|trihydrate|edisylate|besylate|mesylate|hydrobromide|gluconate|calcium|potassium|magnesium|zinc|nitrate|succinate|stearate|palmitate|pamoate|embonate|oleate|tartrate|citrate|lactate|napsylate)\b/i

let nameCollideOnly = 0
let genCollide = 0
let ok = 0
const samples: string[] = []
for (const d of BUNDLED_DRUGS) {
  const g = (d as any).generic_name ?? (d as any).name
  const n = norm(g)
  const gBase = n.replace(SALT_RE, '').trim()
  let gHit = false
  for (const dn of dbGenNorm) {
    if (dn === n || (gBase && dn.replace(SALT_RE, '').trim() === gBase)) { gHit = true; break }
  }
  if (gHit) { genCollide++; continue }
  const name = norm((d as any).name ?? '')
  if (dbNameNorm.has(name)) {
    nameCollideOnly++
    if (samples.length < 25) samples.push(`${(d as any).name} (gen: ${g})`)
    continue
  }
  ok++
}
console.log('DB rows:', dbRows.length)
console.log('bundled generic-collide (skip):', genCollide)
console.log('bundled NAME-collide but generic OK (the failed 320):', nameCollideOnly)
console.log('bundled clean (insert):', ok)
console.log('samples:', samples.join(' | '))
