import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('id, name, pharmacokinetics')
let tables = 0, tablenames: string[] = []
let boiler = 0, boilernames: string[] = []
for (const r of data ?? []) {
  const pk = (r.pharmacokinetics || '').trim()
  if (/\bTable\s+\d+\b/i.test(pk)) { tables++; tablenames.push(r.name) }
  if (/^refer to current|^consult current/i.test(pk)) { boiler++; boilernames.push(r.name) }
}
console.log('PK containing "Table N":', tables, '→', tablenames.slice(0, 10).join(', '))
console.log('PK boilerplate:', boiler)
console.log('boilerplate examples:', boilernames.slice(0, 15).join(', '))
