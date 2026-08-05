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
const boil = all.filter(r => /^(refer to current|consult current|seek immediate)/i.test(String(r.pharmacokinetics || '').trim()))
console.log('boilerplate:', boil.length, '→', boil.map(r => r.name).join(', '))
