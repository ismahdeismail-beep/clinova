import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('drug_class_id, drug_class, name').limit(400)
const withId = (data ?? []).filter((r: any) => r.drug_class_id)
console.log('rows with drug_class_id:', withId.length, 'of', data?.length)
// distinct drug_class values among DB rows
const classes = new Map<string, number>()
for (const r of data ?? []) { const k = r.drug_class ?? 'NULL'; classes.set(k, (classes.get(k) ?? 0) + 1) }
console.log('distinct drug_class values:', classes.size)
for (const [k, v] of [...classes.entries()].slice(0, 25)) console.log('  ', k.padEnd(45), v)
