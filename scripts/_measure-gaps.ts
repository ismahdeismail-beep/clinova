import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })

console.log('BUNDLED_DRUGS (local catalogue):', BUNDLED_DRUGS.length)
const { data: dbDrugs, count: drugTotal } = await admin.from('drug_monographs').select('generic_name', { count: 'exact', head: false })
const dbNames = new Set((dbDrugs ?? []).map((r: any) => r.generic_name?.toLowerCase().trim()))
let missing = 0
const missingList: string[] = []
for (const d of BUNDLED_DRUGS) {
  const n = (d as any).generic_name?.toLowerCase().trim()
  if (!dbNames.has(n)) { missing++; if (missingList.length < 25) missingList.push((d as any).generic_name) }
}
console.log('DB drug_monographs:', drugTotal)
console.log('Bundled drugs NOT in DB (gap to 1000+):', missing)
console.log('  sample missing:', missingList.join(' | '))
