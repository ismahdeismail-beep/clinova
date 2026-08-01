/**
 * export-images-local.mjs — downloads all drug images from Supabase Storage
 * into a local folder for review: storage/drug-images/<generic_name>/<id>_<dosage>.webp
 * Run: node scripts/export-images-local.mjs [destDir]  (default: storage/drug-images)
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

const dest = process.argv[2] ? path.resolve(process.argv[2]) : path.join(process.cwd(), 'storage', 'drug-images')
const supabase = createClient(url, key, { auth: { persistSession: false } })

const { data: rows, error } = await supabase
  .from('drug_images')
  .select('id, drug_id, generic_name, dosage_form, image_url, source')
  .limit(5000)
if (error) throw new Error(`drug_images: ${error.message}`)

console.log(`Exporting ${rows.length} images to ${dest}`)

let saved = 0
let failed = 0
const CONCURRENCY = 8
const queue = [...rows]

async function worker() {
  while (queue.length) {
    const row = queue.shift()
    if (!row) break
    try {
      const safeName = (row.generic_name || 'unknown').replace(/[^a-z0-9]/gi, '_').toLowerCase()
      const dir = path.join(dest, safeName)
      fs.mkdirSync(dir, { recursive: true })
      const file = path.join(dir, `${row.id}_${(row.dosage_form || 'unknown').replace(/[^a-z0-9]/gi, '_')}.webp`)
      if (fs.existsSync(file)) {
        saved++
        continue
      }
      const res = await fetch(row.image_url, { signal: AbortSignal.timeout(30000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(file, buf)
      saved++
    } catch (e) {
      failed++
      console.error(`[fail] ${row.generic_name} (${row.id}): ${e.message}`)
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()))
console.log(`Done: saved=${saved} failed=${failed} -> ${dest}`)
