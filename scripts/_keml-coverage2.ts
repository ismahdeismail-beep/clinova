import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()

const dbAll: any[] = []
for (let from = 0; from < 5000; from += 1000) {
  const { data } = await admin.from('drug_monographs').select('generic_name, name').range(from, from + 999)
  if (!data?.length) break
  dbAll.push(...data)
  if (data.length < 1000) break
}
const dbHay = new Set<string>()
for (const r of dbAll) {
  dbHay.add(norm(r.generic_name ?? ''))
  dbHay.add(norm(r.name ?? ''))
}
const bundledHay = new Set<string>()
for (const d of BUNDLED_DRUGS as any[]) {
  bundledHay.add(norm(d.generic_name ?? ''))
  bundledHay.add(norm(d.name ?? ''))
}

const keml = JSON.parse(readFileSync('scripts/keml-drug-names.json', 'utf8')) as string[]
const notDb = keml.filter((k) => {
  const n = norm(k)
  return ![...dbHay].some((h) => h.includes(n) || n.includes(h))
})
const notBundled = notDb.filter((k) => {
  const n = norm(k)
  return ![...bundledHay].some((h) => h.includes(n) || n.includes(h))
})
console.log('KEML not in DB:', notDb.length, '| of those, also not in bundled catalogue:', notBundled.length)
console.log('\nKEML drugs beyond bundled catalogue scope:')
for (const k of notBundled.slice(0, 50)) console.log('  ', k)
