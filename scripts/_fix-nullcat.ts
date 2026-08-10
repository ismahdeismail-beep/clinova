import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })

// fetch real ids
const { data: classes } = await admin.from('drug_classes').select('id, name')
const clsByName = new Map<string, string>()
for (const c of classes ?? []) clsByName.set(c.name.toLowerCase(), c.id)

const { data } = await admin.from('drug_monographs').select('id, generic_name, drug_class').is('drug_class_id', null)
let fixed = 0
const ophth: string[] = []
for (const r of data ?? []) {
  const name = (r.drug_class || '').trim()
  const key = name.toLowerCase()
  if (key.includes('ophthalmic') || key.includes('eye')) { ophth.push(r.generic_name); continue }
  const id = clsByName.get(key) || [...clsByName.entries()].find(([k]) => k.includes(key) || key.includes(k))?.[1]
  if (id) {
    const { error } = await admin.from('drug_monographs').update({ drug_class_id: id }).eq('id', r.id)
    if (error) console.log('err', r.generic_name, error.message)
    else fixed++
  }
}
console.log('fixed:', fixed, '| ophthalmic (no root, expected):', ophth.length)
