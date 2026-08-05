import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()

// All DB generic names
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

// KEML drugs not covered by DB name or bundled catalogue
import { readFileSync } from "fs"
const keml = JSON.parse(readFileSync("scripts/keml-drug-names.json", "utf8")) as string[]
let missing = 0
const missingList: string[] = []
for (const k of keml) {
  const n = norm(k)
  let hit = dbHay.has(n)
  if (!hit) hit = [...dbHay].some((h) => h.includes(n) || n.includes(h))
  if (!hit) { missing++; if (missingList.length < 30) missingList.push(k) }
}
console.log('KEML drugs:', keml.length, '| in DB:', keml.length - missing, '| MISSING:', missing)
console.log('missing sample:', missingList.join(' | '))
