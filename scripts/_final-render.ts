import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { monographToMarkdown } from '../src/lib/monographToMarkdown'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
for (const n of ['Allopurinol', 'Amoxicillin', 'Ibuprofen', 'Pyrazinamide']) {
  const { data } = await admin.from('drug_monographs').select('*').ilike('name', n).maybeSingle()
  if (!data) { console.log(n, 'NOT FOUND'); continue }
  const md = monographToMarkdown(data as any)
  const start = md.indexOf('⏱ Pharmacokinetics')
  const pkSec = md.slice(start, start + 800)
  console.log(`\n===== ${n} — Pharmacokinetics =====`)
  console.log(pkSec.replace(/\n{2,}/g, '\n'))
}
