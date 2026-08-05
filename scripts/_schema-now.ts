import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data, error } = await admin.from('drug_monographs').select('*').limit(1)
if (error) { console.log('ERR', error.message); process.exit(0) }
console.log('drug_monographs columns:', Object.keys(data?.[0] ?? {}).join(', '))
const { data: cls } = await admin.from('drug_classes').select('id, name, parent_id')
console.log('\ndrug_classes count:', cls?.length)
for (const c of (cls ?? []).filter((c: any) => !c.parent_id)) console.log(' root:', c.name, c.id)
console.log('\nsample monograph:')
const { data: sample } = await admin.from('drug_monographs').select('*').eq('name', 'Amoxicillin').limit(1)
console.log(JSON.stringify(sample?.[0], null, 1).slice(0, 900))
