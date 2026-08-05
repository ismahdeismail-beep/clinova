import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data, error } = await admin.from('clinical_cases').select('*').limit(1)
if (error) { console.log('ERR', error.message); process.exit(0) }
console.log('columns:', Object.keys(data?.[0] ?? {}).join(', '))
const { data: sample } = await admin.from('clinical_cases').select('*').limit(3)
for (const s of sample ?? []) console.log(' -', JSON.stringify(s).slice(0, 200))
