import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'
import { getDrugCategory } from '../src/lib/drugCategory.js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })

// 1) Get root class ids by name
const { data: cls } = await admin.from('drug_classes').select('id, name, parent_id')
const roots = new Map<string, string>()
for (const c of cls ?? []) if (!c.parent_id) roots.set(c.name, c.id)

const MAP: Record<string, string> = {
  'Anti-infectives': 'Antimicrobial agent',
  Cardiovascular: 'Cardiovascular agent',
  CNS: 'Central nervous system agent',
  Oncology: 'Antineoplastic / chemotherapeutic agent',
  Endocrine: 'Endocrine / metabolic agent',
  Analgesics: 'Analgesic agent',
  Immunology: 'Immunomodulatory / biologic agent',
  Respiratory: 'Respiratory agent',
  Gastrointestinal: 'Gastrointestinal agent',
  Dermatology: 'Dermatological agent',
  'Nutrition/Vitamins': 'Nutritional supplement / vitamin',
  Haematology: 'Therapeutic agent',
  'Renal/Electrolytes': 'Renal / electrolyte agent',
  'Toxicology/Antidotes': 'Antidote / toxicology agent',
  Ophthalmology: 'Ophthalmic agent',
  Other: 'Therapeutic agent',
}

// 2) DB existing generic names (to exclude)
const norm = (s: string) => s.toLowerCase().replace(/[/–—\-+(),.'"]/g, ' ').replace(/\s+/g, ' ').trim()
const dbAll: any[] = []
for (let from = 0; from < 2000; from += 1000) {
  const { data } = await admin.from('drug_monographs').select('generic_name').range(from, from + 999)
  if (!data?.length) break
  dbAll.push(...data)
  if (data.length < 1000) break
}
const dbNorm = new Set(dbAll.map((r: any) => norm(r.generic_name ?? '')))

// 3) New drugs as DB rows would look
const missing = BUNDLED_DRUGS.filter((d) => !dbNorm.has(norm((d as any).generic_name ?? '')))
console.log('new rows to seed:', missing.length)
const byCat = new Map<string, number>()
const unrooted: any[] = []
for (const d of missing) {
  const cat = (d as any).drug_class_name ?? 'Other'
  const rootName = MAP[cat] ?? 'Therapeutic agent'
  const rootId = roots.get(rootName)
  if (!rootId) unrooted.push(rootName)
  const dbRow = { ...d, drug_class_name: rootName, drug_class: rootName }
  const c = getDrugCategory(dbRow as any)
  byCat.set(c, (byCat.get(c) ?? 0) + 1)
}
console.log('unmapped root names:', [...new Set(unrooted)])
for (const [c, n] of [...byCat.entries()].sort((a, b) => b[1] - a[1])) console.log('  ', c.padEnd(25), n)
