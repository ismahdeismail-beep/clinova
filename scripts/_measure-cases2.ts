import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })

// per-unit case counts
const { data: units } = await admin.from('clinical_cases').select('integrated_unit_id')
const byUnit: Record<string, number> = {}
for (const c of units ?? []) {
  const k = c.integrated_unit_id || 'UNMAPPED'
  byUnit[k] = (byUnit[k] ?? 0) + 1
}
const entries = Object.entries(byUnit).sort((a, b) => b[1] - a[1])
console.log('units with cases:', entries.length, '| total cases:', units?.length)
for (const [u, n] of entries) console.log('  ', u.padEnd(45), n)

// how many below target 50?
let deficit = 0
for (const [, n] of entries) if (n < 50) deficit += 50 - n
console.log('\ndeficit to reach 50/unit:', deficit)

// case template file sizes — count title occurrences properly per file
import * as fs from 'fs'
const files = fs.readdirSync('scripts/templates').filter(f => f.endsWith('.ts'))
let grand = 0
for (const f of files) {
  const src = fs.readFileSync(`scripts/templates/${f}`, 'utf8')
  const c = (src.match(/title:\s*['"`]/g) || []).length
  if (c > 0) { console.log('templates', f.padEnd(35), c); grand += c }
}
console.log('≈ template entries total:', grand)
