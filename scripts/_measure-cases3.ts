import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })

const { data: units } = await admin.from('clinical_cases').select('unit_id, specialty')
const byUnit: Record<string, number> = {}
for (const c of units ?? []) {
  const k = c.unit_id || 'UNMAPPED'
  byUnit[k] = (byUnit[k] ?? 0) + 1
}
const entries = Object.entries(byUnit).sort((a, b) => b[1] - a[1])
console.log('units with cases:', entries.length, '| total cases:', units?.length)
for (const [u, n] of entries) console.log('  ', String(u).padEnd(40), n)

let deficit = 0
for (const [, n] of entries) if (n < 50) deficit += 50 - n
console.log('\ndeficit to reach 50/unit:', deficit, '→ target total ≈', units?.length + deficit)

// distinct specialties
const specs = new Set((units ?? []).map((c: any) => c.specialty))
console.log('distinct specialties:', specs.size)
