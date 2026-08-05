import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('name, pharmacokinetics').ilike('name', '%allopurinol%').single()
console.log('RAW PK (' + data.pharmacokinetics.length + ' chars):')
console.log(data.pharmacokinetics)
