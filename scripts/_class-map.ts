import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data: cls } = await admin.from('drug_classes').select('id, name, parent_id')
// all classes
console.log('ALL drug_classes (66):')
for (const c of cls ?? []) {
  const parent = c.parent_id ? '→ ' + (cls ?? []).find((x: any) => x.id === c.parent_id)?.name : 'ROOT'
  console.log(' ', (c.name ?? '').padEnd(55), parent)
}
