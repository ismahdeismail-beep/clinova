import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const names = ['Amoxicillin', 'Pyrazinamide', 'Digoxin', 'Gentamicin', 'Itraconazole']
for (const n of names) {
  const { data } = await admin.from('drug_monographs').select('name, pharmacokinetics, mechanism_of_action, warnings, black_box_warnings').ilike('name', n).single()
  console.log(`\n=== ${n} ===`)
  console.log('PK :', String(data?.pharmacokinetics || '').slice(0, 120))
  console.log('MOA:', String(data?.mechanism_of_action || '').slice(0, 80))
  console.log('warn:', Array.isArray(data?.warnings) ? data.warnings.length : 'n/a')
}
