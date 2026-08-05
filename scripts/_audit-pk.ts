import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data, error } = await admin.from('drug_monographs').select('id, name, pharmacokinetics')
if (error) { console.log('ERR', error.message); process.exit(1) }
let withPk = 0, sectionNum = 0, drugInt = 0, leadWord = 0
const sectionNumList: string[] = [], drugIntList: string[] = []
for (const r of data ?? []) {
  const pk = r.pharmacokinetics
  if (!pk || !pk.trim()) continue
  withPk++
  const clean = pk.trim()
  if (/^\d+(\.\d+)?\s+Pharmacokinetics/i.test(clean)) { sectionNum++; sectionNumList.push(r.name) }
  if (/drug interaction stud/i.test(clean)) { drugInt++; drugIntList.push(r.name) }
  if (/\b(Absorption|Distribution|Metabolism|Elimination|Excretion)\s+[A-Z]/.test(clean)) leadWord++
}
console.log(`total monographs: ${data?.length}`)
console.log(`with PK: ${withPk}`)
console.log(`  starts with '12.3 Pharmacokinetics' style section number: ${sectionNum}`)
console.log(`  contains 'Drug Interaction Studies' section: ${drugInt}`)
console.log(`  contains embedded ADME lead words: ${leadWord}`)
console.log('section-number examples:', sectionNumList.slice(0, 8).join(', '))
console.log('drug-interaction examples:', drugIntList.slice(0, 8).join(', '))
