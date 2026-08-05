import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('generic_name, drug_class, drug_class_id').is('drug_class_id', null)
console.log('null drug_class_id:', data?.length)
for (const r of data ?? []) console.log(' ', r.generic_name, '|', r.drug_class)
