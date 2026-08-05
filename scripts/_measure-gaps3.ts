import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const norm = (s: string) => s.toLowerCase().replace(/[\/–—\-+(),.]/g, ' ').replace(/\s+/g, ' ').trim()

const { data: dbDrugs } = await admin.from('drug_monographs').select('generic_name')
const dbRaw = new Set((dbDrugs ?? []).map((r: any) => (r.generic_name ?? '').toLowerCase().trim()))
const dbNorm = new Set((dbDrugs ?? []).map((r: any) => norm(r.generic_name ?? '')))

// Fuzzy: bundled drug matches DB if raw, normalized, or prefix match
const missing: any[] = []
for (const d of BUNDLED_DRUGS) {
  const n = (d as any).generic_name?.toLowerCase().trim() ?? ''
  const nn = norm(n)
  const hit = dbRaw.has(n) || dbNorm.has(nn) ||
    [...dbNorm].some((dn: string) => dn.includes(nn) || nn.includes(dn))
  if (!hit) missing.push({ name: (d as any).generic_name, cls: (d as any).drug_class_name })
}
console.log('DB monographs:', dbDrugs?.length)
console.log('Bundled entries with NO fuzzy match in DB:', missing.length)
const byCls: Record<string, number> = {}
for (const m of missing) byCls[m.cls ?? 'Unknown'] = (byCls[m.cls ?? 'Unknown'] ?? 0) + 1
console.log('Missing by class:')
for (const [c, n] of Object.entries(byCls).sort((a, b) => b[1] - a[1])) console.log('  ', c, n)
console.log('\nSample:', missing.slice(0, 20).map((m: any) => m.name).join(' | '))
