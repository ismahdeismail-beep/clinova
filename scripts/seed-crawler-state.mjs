/**
 * seed-crawler-state.mjs — marks drugs that already have images in drug_images
 * as "crawled" in storage/crawler_state.json, so the next crawl only processes
 * the remaining ~86 uncovered monographs. Run: node scripts/seed-crawler-state.mjs
 */
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key, { auth: { persistSession: false } })
const statePath = path.join(process.cwd(), 'storage', 'crawler_state.json')

const { data: drugs, error: drugErr } = await supabase
  .from('drug_monographs')
  .select('id')
  .order('id')
  .limit(5000)
if (drugErr) throw new Error(`drug_monographs: ${drugErr.message}`)

const { data: images, error: imgErr } = await supabase
  .from('drug_images')
  .select('drug_id')
  .limit(10000)
if (imgErr) throw new Error(`drug_images: ${imgErr.message}`)

const covered = new Set((images || []).map((r) => r.drug_id).filter(Boolean))
const allIds = (drugs || []).map((d) => d.id)
const missing = allIds.filter((id) => !covered.has(id))

const state = {
  last_crawl: null,
  crawled_drugs: [...covered],
  failed_drugs: [],
  pending_drugs: [],
  run_count: 0,
}

fs.mkdirSync(path.dirname(statePath), { recursive: true })
fs.writeFileSync(statePath, JSON.stringify(state, null, 2))

console.log(`drugs total=${allIds.length} covered=${covered.size} missing=${missing.length}`)
console.log(`State file written to ${statePath}`)
if (missing.length <= 30) console.log('Missing:', missing.join(', '))
