import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'
import * as fs from 'fs'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const norm = (s: string) => s.toLowerCase().replace(/[\/–—\-+(),.'"]/g, ' ').replace(/\s+/g, ' ').trim()

const dbAll: any[] = []
for (let from = 0; from < 2000; from += 1000) {
  const { data } = await admin.from('drug_monographs').select('generic_name').range(from, from + 999)
  if (!data?.length) break
  dbAll.push(...data)
  if (data.length < 1000) break
}
const dbNorm = new Set(dbAll.map((r: any) => norm(r.generic_name ?? '')))

const SALT_RE = /\b(sodium|hydrochloride|sulfate|sulphate|fumarate|maleate|acetate|phosphate|isethionate|proxetil|fosamil|meglumine|tromethamine|diphosphate|medocaril|monohydrate|dihydrate|trihydrate|edisylate|besylate|mesylate|hydrobromide|gluconate|calcium|potassium|magnesium|zinc|nitrate|succinate|stearate|palmitate|pamoate|embonate|oleate|tartrate|citrate|lactate|napsylate)\b/i

function isVariantOfDb(name: string): boolean {
  const n = norm(name)
  for (const dn of dbNorm) {
    if (dn === n) return true
    const nBase = n.replace(SALT_RE, '').trim()
    const dnBase = dn.replace(SALT_RE, '').trim()
    if (nBase && dnBase && nBase === dnBase) return true
  }
  return false
}

const missing: any[] = []
for (const d of BUNDLED_DRUGS) {
  const name = (d as any).generic_name ?? (d as any).name
  if (!isVariantOfDb(name)) missing.push(d)
}
console.log('new drugs to seed:', missing.length)
fs.writeFileSync('storage/seed_gap_list.json', JSON.stringify(missing.map((d: any) => ({ name: d.name, generic_name: d.generic_name, drug_class: d.drug_class, drug_class_name: d.drug_class_name })), null, 2))
console.log('saved storage/seed_gap_list.json')
