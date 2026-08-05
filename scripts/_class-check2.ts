import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('drug_class_id, drug_class').range(0, 999)
const withId = (data ?? []).filter((r: any) => r.drug_class_id).length
console.log('rows with drug_class_id:', withId, 'of', data?.length)
// sample: what drug_class_id values exist?
const ids = new Set((data ?? []).map((r: any) => r.drug_class_id).filter(Boolean))
console.log('distinct drug_class_ids:', ids.size)
