import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('generic_name, mechanism_of_action')
const rows = data ?? []
const bad = rows.filter((r: any) => {
  const moa = r.mechanism_of_action || ''
  return !moa.trim() || moa.length < 60 || /refer to current/i.test(moa) || /Mechanism of action for/i.test(moa)
})
console.log('still placeholder:', bad.length)
for (const r of bad) console.log(' ', r.generic_name)
