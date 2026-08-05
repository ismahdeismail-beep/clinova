import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('generic_name, mechanism_of_action').gte('created_at', '2026-08-03T00:00:00')
const rows = data ?? []
const noMoa = rows.filter((r: any) => !(r.mechanism_of_action || '').length || (r.mechanism_of_action || '').length < 60 || /refer to current/i.test(r.mechanism_of_action))
console.log('rows without real MOA:', noMoa.length)
for (const r of noMoa.slice(0, 40)) console.log('  ', r.generic_name, '→', (r.mechanism_of_action || '').slice(0, 70))
