import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()
// UK/US spelling normalisation
const uk = (s: string) => s.replace(/beclometasone/gi, 'beclomethasone').replace(/co-amoxiclav/gi, 'amoxicillin clavulanate').replace(/paracetamol/gi, 'acetaminophen').replace(/adrenaline/gi, 'epinephrine').replace(/noradrenaline/gi, 'norepinephrine').replace(/lignocaine/gi, 'lidocaine').replace(/salbutamol/gi, 'albuterol')

const dbAll: any[] = []
for (let from = 0; from < 5000; from += 1000) {
  const { data } = await admin.from('drug_monographs').select('generic_name, name').range(from, from + 999)
  if (!data?.length) break
  dbAll.push(...data)
  if (data.length < 1000) break
}
const dbHay = new Set<string>()
for (const r of dbAll) {
  dbHay.add(uk(norm(r.generic_name ?? '')))
  dbHay.add(uk(norm(r.name ?? '')))
}

const keml = JSON.parse(readFileSync('scripts/keml-drug-names.json', 'utf8')) as string[]
const missing: string[] = []
for (const k of keml) {
  const n = uk(norm(k))
  if (n.length < 3) continue
  if (n === 'antacids' || n === 'benzodiazepines' || n === 'artificial tears' || n === 'calcium supplements' || n === 'covid 19 vaccine' || n === 'caplan syndrome') continue
  let hit = [...dbHay].some((h) => h === n || h.includes(n) || n.includes(h))
  if (!hit) missing.push(k)
}
console.log('KEML drugs genuinely missing (spelling-tolerant, excluding categories):', missing.length)
console.log(missing.join(' | '))
