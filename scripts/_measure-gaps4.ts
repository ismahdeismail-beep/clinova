import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const norm = (s: string) => s.toLowerCase().replace(/[\/–—\-+(),.'"]/g, ' ').replace(/\s+/g, ' ').trim()

// Dedupe bundled list: drop obvious variants (suffixes like "IV", "Prophylaxis", strength tags)
const dropSuffix = (s: string) => norm(s).replace(/\s*(iv|oral|topical|injection|prophylaxis|sodium|calcium|potassium|maleate|fumarate|hydrochloride|sulfate)\s*$/i, '').trim()

const seen = new Set<string>()
const unique: any[] = []
for (const d of BUNDLED_DRUGS) {
  const key = dropSuffix((d as any).generic_name ?? '')
  if (!key || seen.has(key)) continue
  seen.add(key)
  unique.push(d)
}
console.log('Bundled catalogue entries:', BUNDLED_DRUGS.length)
console.log('Bundled unique (after variant dedupe):', unique.length)

const { data: dbDrugs } = await admin.from('drug_monographs').select('generic_name')
const dbNorm = new Set((dbDrugs ?? []).map((r: any) => norm(r.generic_name ?? '')))
const dbDrop = new Set((dbDrugs ?? []).map((r: any) => dropSuffix(r.generic_name ?? '')))

const missing = unique.filter((d) => !dbNorm.has(norm((d as any).generic_name)) && !dbDrop.has(dropSuffix((d as any).generic_name)))
console.log('Unique bundled drugs NOT in DB (true gap):', missing.length)
