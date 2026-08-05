import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })

const norm = (s: string) => s.toLowerCase().replace(/[\/–—\-,]/g, ' ').replace(/\s+/g, ' ').trim()

const { data: dbDrugs } = await admin.from('drug_monographs').select('generic_name')
const dbNames = new Set((dbDrugs ?? []).map((r: any) => norm(r.generic_name ?? '')))
const dbRaw = new Set((dbDrugs ?? []).map((r: any) => (r.generic_name ?? '').toLowerCase().trim()))

// DB drugs not in bundled catalogue
const bundledNorm = new Set(BUNDLED_DRUGS.map((d: any) => norm(d.generic_name)))
const dbOnly = (dbDrugs ?? []).filter((r: any) => !bundledNorm.has(norm(r.generic_name ?? ''))).map((r: any) => r.generic_name)
console.log('DB monographs:', dbDrugs?.length)
console.log('DB drugs NOT in bundled catalogue:', dbOnly.length, dbOnly.slice(0, 20).join(' | '))

// Bundled drugs with normalized match in DB
let matched = 0
for (const d of BUNDLED_DRUGS) if (dbNames.has(norm((d as any).generic_name))) matched++
console.log('Bundled drugs matching DB (normalized):', matched, 'of', BUNDLED_DRUGS.length)

// Count bundled per therapeutic class (to see how many "real" entries vs variants)
const classes: Record<string, number> = {}
for (const d of BUNDLED_DRUGS) {
  const c = (d as any).drug_class_name || (d as any).drug_class || 'Unknown'
  classes[c] = (classes[c] ?? 0) + 1
}
console.log('\nBundled catalogue by class:')
for (const [c, n] of Object.entries(classes).sort((a, b) => b[1] - a[1])) console.log('  ', c, n)
