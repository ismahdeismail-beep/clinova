import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('id, name, pharmacokinetics')
const sectionHeaders = new Map<string, number>()
const leadPatterns = new Map<string, number>()
let boilerplate = 0
for (const r of data ?? []) {
  const pk = (r.pharmacokinetics || '').trim()
  if (!pk) continue
  if (/refer to current|consult current/i.test(pk)) boilerplate++
  // FDA section numbers like 12.3 / 8.6 / 12.4 — capture the label after them
  const m = pk.match(/^\s*\d+(?:\.\d+){0,2}\s+([A-Z][A-Za-z &()/-]{2,40})/)
  if (m) sectionHeaders.set(m[1], (sectionHeaders.get(m[1]) ?? 0) + 1)
  // Embedded subsection headers that START a sentence (label-style lead-ins)
  for (const pat of ['Absorption', 'Distribution', 'Metabolism', 'Elimination', 'Excretion', 'Special Populations', 'Drug Interaction Studies', 'Half-life', 'Half Life', 'Bioavailability', 'Volume of distribution', 'Protein binding', 'Onset of action', 'Duration of action']) {
    if (new RegExp(`\b${pat}\b`).test(pk)) leadPatterns.set(pat, (leadPatterns.get(pat) ?? 0) + 1)
  }
}
console.log('boilerplate PK:', boilerplate)
console.log('\nleading section headers (first word after number):')
for (const [h, n] of [...sectionHeaders.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15)) console.log(`  ${String(n).padStart(4)}  ${h}`)
console.log('\nembedded subsection words (occurrences):')
for (const [h, n] of [...leadPatterns.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${h}`)
