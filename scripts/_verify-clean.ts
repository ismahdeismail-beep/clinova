import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
// inline a copy of cleanPk from cleanup-pk.ts to test against live rows
const LEAD_PREFIX = /^\s*\d+(?:\.\d+){0,2}\s+(?:Pharmacokinetics|CLINICAL PHARMACOLOGY|PHARMACOKINETICS)\s*/i
const ADME_HEAD = /\b(?:Absorption|Distribution|Metabolism|Elimination|Excretion)(?:\s+and\s+(?:Distribution|Metabolism|Elimination|Excretion))?(?:\s*[,]\s*(?:Bioavailability|Distribution|Excretion))?\s+(?=[A-Z])/g
const SECTION_NUMBER = /\b\d+(?:\.\d+){1,2}\s+(?:Special Populations|Specific Populations|Renal Impairment|Hepatic Impairment|Pediatric|Geriatric|Pediatric Use|Geriatric Use|Drug Interaction Studies|Pharmacokinetics|Absorption|Distribution|Metabolism|Elimination|Excretion)\b/gi
const DRUG_INTERACTION_STUDIES = /\s*Drug Interaction Studies\b.*$/i
const TABLE_JUNK = /^\s*(?:table\s+\d+|dose\/route|\d+(?:\.\d+)?\s+\d+)/i
function cleanPk(pk: string): string {
  let t = pk.trim()
  if (!t || /^(refer to current|consult current|seek immediate)/i.test(t)) return t
  t = t.replace(LEAD_PREFIX, '')
  t = t.replace(DRUG_INTERACTION_STUDIES, '')
  t = t.replace(ADME_HEAD, (m) => (/and\s+(?:Distribution|Metabolism|Elimination|Excretion)\s*$/i.test(m) ? m.trim() + ' ' : ''))
  t = t.replace(SECTION_NUMBER, (m) => m.replace(/^\s*\d+(?:\.\d+){1,2}\s+/i, ''))
  t = t.split(/(?<=[.;])\s+/).filter((s) => !TABLE_JUNK.test(s.trim())).join(' ')
  t = t.replace(/\s+/g, ' ').trim()
  return t.length < 30 ? pk.trim() : t
}
const names = ['Allopurinol', 'Spironolactone', 'Tinidazole', 'Levetiracetam', 'Ertapenem', 'Acyclovir']
for (const n of names) {
  const { data } = await admin.from('drug_monographs').select('name, pharmacokinetics').ilike('name', n).single()
  const out = cleanPk(data?.pharmacokinetics || '')
  console.log(`\n===== ${n} =====`)
  console.log('raw  :', String(data?.pharmacokinetics).slice(0, 160))
  console.log('clean:', out.slice(0, 160))
  if (String(data?.pharmacokinetics).length > 160) console.log('  …(' + String(data?.pharmacokinetics).length + ' chars → ' + out.length + ' chars)')
  if (/drug interaction stud/i.test(out)) console.log('  !! still contains Drug Interaction Studies')
  if (/^\d+\.\d+\s+Pharmacokinetics/i.test(out)) console.log('  !! still has section number prefix')
}
