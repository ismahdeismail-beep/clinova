// Refill worker: crawls one disjoint slice of zero-image drugs (set by env
// REFILL_IDS) and records per-drug progress in REFILL_STATE. Used by
// refill-parallel.ts. Safe to run standalone for a targeted list.
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { crawlDrug } from '../src/services/crawler/imageCrawler'
import * as fs from 'fs'

const REFILL_IDS = process.env.REFILL_IDS ? new Set(process.env.REFILL_IDS.split(',')) : null
const STATE_FILE = process.env.REFILL_STATE || 'storage/refill_state_w0.json'

async function main() {
  const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  })

  const drugs: any[] = []
  {
    let from = 0
    for (let i = 0; i < 60; i++) {
      const { data } = await admin.from('drug_monographs').select('id, generic_name, name').range(from, from + 999)
      if (!data || data.length === 0) break
      drugs.push(...data)
      from += 1000
      if (data.length < 1000) break
    }
  }

  const targets = (drugs as any[]).filter((d) => REFILL_IDS && REFILL_IDS.has(d.id))
  console.log(`[worker] targets=${targets.length}`)

  const state: { done: string[] } = fs.existsSync(STATE_FILE)
    ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
    : { done: [] }
  const done = new Set(state.done)

  let ok = 0
  let failed = 0
  for (const d of targets) {
    const name = d.generic_name || d.name
    if (!name) continue
    if (done.has(d.id)) continue
    try {
      const stats = await crawlDrug(d.id, name, undefined, '', new Set(), 0)
      ok++
      console.log(`[ok] ${name}: found=${stats.found} accepted=${stats.accepted} rejected=${stats.rejected} failures=${stats.failures.length}`)
    } catch (e: any) {
      failed++
      console.log(`[err] ${name}: ${e.message}`)
    }
    done.add(d.id)
    fs.writeFileSync(STATE_FILE, JSON.stringify({ done: [...done] }, null, 2))
  }
  console.log(`[worker done] ok=${ok} failed=${failed}`)
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
