import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('id, name, pharmacokinetics')
const leadPatterns = new Map<string, number>()
for (const r of data ?? []) {
  const pk = (r.pharmacokinetics || '').trim()
  if (!pk) continue
  const pats = ['Absorption', 'Distribution', 'Metabolism', 'Elimination', 'Excretion', 'Special Populations', 'Drug Interaction Studies', 'Bioavailability', 'Volume of distribution', 'Protein binding']
  for (const pat of pats) {
    const re = new RegExp('\b' + pat + '\b', 'i')
    if (re.test(pk)) leadPatterns.set(pat, (leadPatterns.get(pat) ?? 0) + 1)
  }
}
console.log('count:', leadPatterns.size)
for (const [h, n] of leadPatterns) console.log(' ', n, h)
