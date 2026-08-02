// Refresh pass: re-crawl drugs that already have photos so their galleries
// grow (up to the 4-image cap) with the current Kenyan-brand-first queries and
// title-relevance filter. Seeded per-drug with existing hashes so nothing is
// re-inserted. Skips structure-only drugs (they get re-failed by the bitmap
// pass) and galleries already at the cap. Resumable via storage/refresh_state.json.
//
// Usage: npx tsx scripts/refresh-images.ts   (env REFRESH_BATCH_SIZE, default 10)
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { crawlDrug } from '../src/services/crawler/imageCrawler'
import { loadState, saveState } from '../src/services/crawler/state'

const BATCH = Number(process.env.REFRESH_BATCH_SIZE || '10')
const REFRESH_STATE_FILE = 'storage/refresh_state.json'
const MAX_IMAGES = 4

async function main() {
  const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  })
  const fs = await import('fs')
  const state = loadState()
  const refresh: { done: string[] } = fs.existsSync(REFRESH_STATE_FILE)
    ? JSON.parse(fs.readFileSync(REFRESH_STATE_FILE, 'utf8'))
    : { done: [] }

  const { data: images } = await admin.from('drug_images').select('drug_id, hash, source')
  if (!images) throw new Error('no images rows')

  const perDrug = new Map<string, { count: number; hasNonStructure: boolean; hashes: Set<string> }>()
  for (const row of images as any[]) {
    const e = perDrug.get(row.drug_id) || { count: 0, hasNonStructure: false, hashes: new Set<string>() }
    e.count++
    if (row.source !== 'Wikimedia Commons (structure)') e.hasNonStructure = true
    if (row.hash) e.hashes.add(row.hash)
    perDrug.set(row.drug_id, e)
  }

  const { data: drugs, error: drugsErr } = await admin
    .from('drug_monographs')
    .select('id, generic_name, name')
    .limit(5000)
  if (drugsErr || !drugs) throw new Error(`drugs: ${drugsErr?.message}`)

  const toRefresh = (drugs as any[]).filter((d) => {
    const e = perDrug.get(d.id)
    if (!e || !e.hasNonStructure) return false // structure-only or no images
    if (e.count >= MAX_IMAGES) return false // gallery already full
    return !refresh.done.includes(d.id)
  })

  console.log(`[refresh] total=${state.crawled_drugs.length} to_refresh=${toRefresh.length} batch=${Math.min(BATCH, toRefresh.length)}`)
  const batch = toRefresh.slice(0, BATCH)

  let added = 0
  for (const drug of batch) {
    const name = drug.generic_name || drug.name
    if (!name) continue
    const e = perDrug.get(drug.id)
    try {
      const stats = await crawlDrug(drug.id, name, undefined, '', new Set(e?.hashes || []))
      added += stats.accepted
      console.log(`[ok] ${name} +${stats.accepted} -${stats.rejected} (gallery ${e?.count} -> ${(e?.count || 0) + stats.accepted})`)
    } catch (err: any) {
      console.log(`[err] ${name}: ${err.message}`)
    }
    refresh.done.push(drug.id)
    fs.writeFileSync(REFRESH_STATE_FILE, JSON.stringify(refresh, null, 2))
  }

  console.log(`[done] batch=${batch.length} images_added=${added}`)
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
