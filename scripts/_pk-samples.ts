import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const names = ['Tocilizumab', 'Tinidazole', 'Spironolactone', 'Ertapenem', 'Levetiracetam', 'Amoxicillin']
for (const n of names) {
  const { data } = await admin.from('drug_monographs').select('name, pharmacokinetics').ilike('name', n).single()
  if (!data) { console.log('=== ' + n + ': NOT FOUND'); continue }
  console.log(`\n===== ${data.name} (${data.pharmacokinetics.length} chars) =====`)
  console.log(data.pharmacokinetics.slice(0, 700))
}
