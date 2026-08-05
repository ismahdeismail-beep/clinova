import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { count } = await admin.from('drug_monographs').select('id', { count: 'exact', head: true })
console.log('drug_monographs total:', count)
// how many have empty MOA/PK (enrichment targets)?
const all: any[] = []
for (let from = 0; from < 4000; from += 1000) {
  const { data } = await admin.from('drug_monographs').select('generic_name, mechanism_of_action, pharmacokinetics, overdose').range(from, from + 999)
  if (!data?.length) break
  all.push(...data)
  if (data.length < 1000) break
}
const emptyMoa = all.filter((r: any) => !r.mechanism_of_action || !r.mechanism_of_action.trim()).length
const emptyPk = all.filter((r: any) => !r.pharmacokinetics || !r.pharmacokinetics.trim()).length
const emptyOd = all.filter((r: any) => !r.overdose || !r.overdose.trim()).length
console.log('rows with empty MOA:', emptyMoa, '| empty PK:', emptyPk, '| empty OD:', emptyOd)
// sample of new rows
const { data: sample } = await admin.from('drug_monographs').select('name, generic_name, drug_class_id, drug_class').order('created_at', { ascending: false }).limit(5)
for (const s of sample ?? []) console.log(' new:', s.name, '|', s.generic_name, '| class_id:', !!s.drug_class_id, '|', s.drug_class)
