import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const all: any[] = []
let from = 0
for (let i = 0; i < 80; i++) {
  const { data } = await admin.from('drug_monographs').select('id, name, pharmacokinetics').range(from, from + 999)
  if (!data || data.length === 0) break
  all.push(...data); from += 1000; if (data.length < 1000) break
}
let clean = 0, boiler = 0, raw = 0
for (const r of all) {
  const t = (r.pharmacokinetics || '').trim()
  if (!t) continue
  if (/^(refer to current|consult current|seek immediate)/i.test(t)) boiler++
  else if (/^\s*\d+(\.\d+){0,2}\s+Pharmacokinetics/i.test(t)) raw++
  else clean++
}
console.log(`total: ${all.length} | already-clean: ${clean} | still-raw (needs re-run): ${raw} | boilerplate (needs FDA): ${boiler}`)
