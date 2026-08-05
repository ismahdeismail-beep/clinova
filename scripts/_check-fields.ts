import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('kenya_drug_index_id, dosage, drug_class, name').eq('name', 'Amoxicillin').limit(1)
console.log('Amoxicillin kdi:', JSON.stringify(data?.[0]?.kenya_drug_index_id))
console.log('Amoxicillin dosage:', JSON.stringify(data?.[0]?.dosage)?.slice(0, 300))
// how many rows have kenya_drug_index_id?
const { count } = await admin.from('drug_monographs').select('id', { count: 'exact', head: true }).not('kenya_drug_index_id', 'is', null)
console.log('rows with kenya_drug_index_id:', count)
// sample kdi values
const { data: s } = await admin.from('drug_monographs').select('kenya_drug_index_id, generic_name').limit(400)
const kdi = new Set((s ?? []).map((r: any) => r.kenya_drug_index_id).filter(Boolean))
console.log('distinct kdi:', [...kdi].slice(0, 5))
