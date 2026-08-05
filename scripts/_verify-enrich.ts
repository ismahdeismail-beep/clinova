import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const names = ['Ibuprofen', 'Omeprazole', 'Losartan Potassium', 'Pyrazinamide', 'Amoxicillin']
for (const n of names) {
  const { data } = await admin.from('drug_monographs').select('name, pharmacokinetics, warnings, black_box_warnings, mechanism_of_action').ilike('name', n).maybeSingle()
  if (!data) { console.log(n, 'NOT FOUND'); continue }
  console.log(`\n=== ${n} ===`)
  console.log('PK :', String(data.pharmacokinetics || '').slice(0, 100))
  console.log('warn:', Array.isArray(data.warnings) ? data.warnings.length + ' items → ' + String(data.warnings[0]).slice(0, 70) : 'n/a')
  console.log('bbw :', Array.isArray(data.black_box_warnings) ? data.black_box_warnings.length : 'n/a')
}
