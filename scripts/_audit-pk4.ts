import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data, error } = await admin.from('drug_monographs').select('id, name, pharmacokinetics')
console.log('rows:', data?.length, error?.message ?? '')
const pk0 = data?.[0]?.pharmacokinetics ?? ''
console.log('sample PK starts:', JSON.stringify(String(pk0).slice(0, 80)))
console.log('test1 /Absorption/i on sample:', /Absorption/i.test(String(pk0)))
console.log('test2 new RegExp:', new RegExp('\\bAbsorption\\b', 'i').test(String(pk0)))
let n = 0
for (const r of data ?? []) if (/\bAbsorption\b/i.test(String(r.pharmacokinetics || ''))) n++
console.log('rows containing Absorption (i):', n)
