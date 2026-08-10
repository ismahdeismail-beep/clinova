import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'
import * as fs from 'fs'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const norm = (s: string) => s.toLowerCase().replace(/[/–—\-+(),.'"]/g, ' ').replace(/\s+/g, ' ').trim()

// All DB generic names
const dbAll: any[] = []
for (let from = 0; from < 2000; from += 1000) {
  const { data } = await admin.from('drug_monographs').select('generic_name').range(from, from + 999)
  if (!data?.length) break
  dbAll.push(...data)
  if (data.length < 1000) break
}
const dbNorm = new Set(dbAll.map((r: any) => norm(r.generic_name ?? '')))

// Salt/derivative suffixes that indicate the same drug under a different form
const SALT_RE = /\b(sodium|hydrochloride|sulfate|sulphate|fumarate|maleate|acetate|phosphate|isethionate|proxetil|fosamil|meglumine|tromethamine|diphosphate|medocaril|monohydrate|dihydrate|trihydrate|edisylate|besylate|mesylate|hydrobromide|gluconate|salts?|calcium|potassium|magnesium|zinc|nitrate|succinate|stearate|palmitate|pamoate|embonate|oleate|tartrate|citrate|lactate|sulfosalicylate|napsylate)\b/i

function isVariantOfDb(name: string): { hit: boolean; match?: string } {
  const n = norm(name)
  for (const dn of dbNorm) {
    if (dn === n) return { hit: true, match: dn }
    // same drug if DB name is "base + salt" and bundled is base (or vice versa)
    const nBase = n.replace(SALT_RE, '').trim()
    const dnBase = dn.replace(SALT_RE, '').trim()
    if (nBase && dnBase && nBase === dnBase) return { hit: true, match: dn }
  }
  return { hit: false }
}

const missing: any[] = []
for (const d of BUNDLED_DRUGS) {
  const name = (d as any).generic_name ?? (d as any).name
  const { hit } = isVariantOfDb(name)
  if (!hit) missing.push(d)
}
console.log('new drugs to seed (excluding salt variants of existing):', missing.length)
fs.writeFileSync('storage/seed_gap_list.json', JSON.stringify(missing.map((d: any) => ({ name: d.name, generic_name: d.generic_name, drug_class: d.drug_class, drug_class_name: d.drug_class_name })), null, 2))
// quick sample check for junk (prophylaxis/contextual entries)
const junk = missing.filter((d: any) => /prophylaxis|therapy$|treatment$|preparations?$|injection|oral |iv\b|topical/i.test((d as any).generic_name ?? ''))
console.log('suspicious contextual entries:', junk.length)
for (const j of junk.slice(0, 20)) console.log('  ', (j as any).generic_name)
