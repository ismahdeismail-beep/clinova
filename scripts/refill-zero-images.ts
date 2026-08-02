// Refill zero-image drugs: find every monograph with no drug_images rows and
// re-crawl it with the current crawler (Kenyan-brand tier reserves slots).
// Resumable via storage/refill_state.json. Usage:
//   npx tsx scripts/refill-zero-images.ts
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { crawlDrug } from '../src/services/crawler/imageCrawler'
import * as fs from 'fs'

const STATE_FILE = 'storage/refill_state.json'

async function fetchAll(table: string, cols: string): Promise<any[]> {
  const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  })
  const all: any[] = []
  let from = 0
  for (let i = 0; i < 60; i++) {
    const { data, error } = await admin.from(table as any).select(cols).range(from, from + 999)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    from += 1000
  }
  return all
}

async function main() {
  const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  })

  const imgs = await fetchAll('drug_images', 'drug_id')
  const withImages = new Set(imgs.map((i) => i.drug_id))

  const drugs = await fetchAll('drug_monographs', 'id, generic_name, name')
  const zero = (drugs as any[]).filter((d) => !withImages.has(d.id))
  console.log(`drugs with zero images: ${zero.length}`)

  const state: { done: string[] } = fs.existsSync(STATE_FILE)
    ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
    : { done: [] }
  const done = new Set(state.done)

  let ok = 0
  let failed = 0
  for (const d of zero) {
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
  console.log(`\n[done] ok=${ok} failed=${failed} total_done=${done.size}`)
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
