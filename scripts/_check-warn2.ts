import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
for (const n of ['Phenytoin', 'Atorvastatin', 'Warfarin']) {
  const { data } = await admin.from('drug_monographs').select('name, warnings').ilike('name', n).maybeSingle()
  if (!data) { console.log(n, 'NOT FOUND'); continue }
  const w = data.warnings
  console.log(`\n=== ${n} ===`)
  console.log('type:', Array.isArray(w) ? 'array(' + w.length + ')' : typeof w)
  console.log('first:', String(Array.isArray(w) ? w[0] : w).slice(0, 120))
}
