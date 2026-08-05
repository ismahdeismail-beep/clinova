import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })

const byUnit: Record<string, number> = {}
let fetched = 0
for (let from = 0; from < 3000; from += 1000) {
  const { data } = await admin.from('clinical_cases').select('unit_id, specialty').range(from, from + 999)
  if (!data || data.length === 0) break
  fetched += data.length
  for (const c of data) {
    const k = c.unit_id || 'UNMAPPED'
    byUnit[k] = (byUnit[k] ?? 0) + 1
  }
  if (data.length < 1000) break
}
console.log('total cases fetched:', fetched)
const entries = Object.entries(byUnit).sort((a, b) => b[1] - a[1])
for (const [u, n] of entries) console.log('  ', String(u).padEnd(40), n)

let deficit = 0
for (const [, n] of entries) if (n < 50) deficit += 50 - n
console.log('\ndeficit to 50/unit:', deficit, '→ ~', fetched + deficit, 'cases')
const target = 2000
console.log('cases needed for 2000+:', Math.max(0, target - fetched))
