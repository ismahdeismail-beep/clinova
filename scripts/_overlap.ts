import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('id, name, pharmacokinetics, mechanism_of_action, warnings, brand_names, black_box_warnings')
const boilerPk = new Set<string>(), weakWarn = new Set<string>(), weakBrand = new Set<string>(), weakBb = new Set<string>()
for (const r of data ?? []) {
  const pk = (r.pharmacokinetics || '').trim()
  if (/^refer to current|^consult current|^seek immediate/i.test(pk)) boilerPk.add(r.id)
  const w = Array.isArray(r.warnings) ? r.warnings.join(' ') : String(r.warnings || '')
  if (!w.trim() || w.trim().length < 20 || /^(n\/a|none|tbd|todo|placeholder|pending|refer to current)/i.test(w.trim())) weakWarn.add(r.id)
  if (!Array.isArray(r.brand_names) || r.brand_names.length === 0) weakBrand.add(r.id)
  const bb = Array.isArray(r.black_box_warnings) ? r.black_box_warnings.join(' ') : String(r.black_box_warnings || '')
  if (!bb.trim() || bb.trim().length < 10 || /refer to current/i.test(bb)) weakBb.add(r.id)
}
console.log('total:', data?.length)
console.log('boilerplate PK:', boilerPk.size)
console.log('weak warnings:', weakWarn.size)
console.log('no brand_names:', weakBrand.size)
console.log('weak black_box:', weakBb.size)
const union = new Set([...boilerPk, ...weakWarn, ...weakBrand, ...weakBb])
console.log('union of any weak field:', union.size)
console.log('boilerplate PK && weak warnings:', [...boilerPk].filter(id => weakWarn.has(id)).length)
console.log('boilerplate PK && no brand:', [...boilerPk].filter(id => weakBrand.has(id)).length)
