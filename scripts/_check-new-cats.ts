import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('generic_name, drug_class, drug_class_id, created_at').gte('created_at', '2026-08-03T00:00:00')
const rows = data ?? []
const byClass: Record<string, number> = {}
for (const r of rows) {
  const c = r.drug_class || '(none)'
  byClass[c] = (byClass[c] || 0) + 1
}
console.log('NEW rows by drug_class:')
for (const [c, n] of Object.entries(byClass).sort((a, b) => b[1] - a[1])) console.log(`  ${n}\t${c}`)
console.log('\nWith null drug_class_id:', rows.filter((r: any) => !r.drug_class_id).length)
