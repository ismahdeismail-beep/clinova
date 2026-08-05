import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const norm = (s: string) => s.toLowerCase().replace(/[\/–—\-+(),.'"]/g, ' ').replace(/\s+/g, ' ').trim()

const dbAll: any[] = []
for (let from = 0; from < 2000; from += 1000) {
  const { data } = await admin.from('drug_monographs').select('generic_name').range(from, from + 999)
  if (!data?.length) break
  dbAll.push(...data)
  if (data.length < 1000) break
}
const dbNorm = new Set(dbAll.map((r: any) => norm(r.generic_name ?? '')))
const dbRaw = new Set(dbAll.map((r: any) => (r.generic_name ?? '').toLowerCase().trim()))

const rawMissing = BUNDLED_DRUGS.filter((d) => !dbNorm.has(norm((d as any).generic_name ?? '')))
// among raw-missing, which have substring fuzzy match to a DB name (variants)?
const variants: { name: string; matches: string }[] = []
for (const d of rawMissing) {
  const n = norm((d as any).generic_name ?? '')
  const hit = [...dbNorm].find((dn: string) => (dn.includes(n) || n.includes(dn)) && dn !== n)
  if (hit) variants.push({ name: (d as any).generic_name, matches: hit })
}
console.log('raw missing:', rawMissing.length, '| fuzzy variants of existing DB drugs:', variants.length)
console.log('\nVariant samples (bundled → DB):')
for (const v of variants.slice(0, 40)) console.log('  ', v.name.padEnd(40), '→', v.matches)
