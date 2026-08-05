import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('id, name, pharmacokinetics, mechanism_of_action, clinical_pearls').ilike('name', '%allopurinol%')
for (const r of data ?? []) {
  console.log('=== ' + r.name + ' ===')
  console.log('MOA:', JSON.stringify(r.mechanism_of_action)?.slice(0, 200))
  console.log('PK :', JSON.stringify(r.pharmacokinetics)?.slice(0, 300))
  console.log('PEARLS:', JSON.stringify(r.clinical_pearls)?.slice(0, 150))
}
