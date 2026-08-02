import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { crawlDrug } from '../src/services/crawler/imageCrawler'
import { loadState, saveState, type CrawlerState } from '../src/services/crawler/state'

const BATCH_SIZE = Number(process.env.CRAWL_BATCH_SIZE || '10')

async function main() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })

  let state = loadState()

  const { data: drugs, error: drugErr } = await admin
    .from('drug_monographs')
    .select('id, generic_name, name')
    .order('id')
    .limit(5000)

  if (drugErr || !drugs) {
    console.error('Failed to fetch drugs:', drugErr?.message)
    process.exit(1)
  }

  // Never re-crawl drugs already marked failed (they need the fallback pass,
  // not Wikimedia retries). Dedupe both arrays to keep them from growing.
  state.crawled_drugs = [...new Set(state.crawled_drugs)]
  state.failed_drugs = [...new Set(state.failed_drugs)]
  saveState(state)

  const toCrawl = drugs.filter(
    (d: any) =>
      !state.crawled_drugs.includes(d.id) &&
      !state.failed_drugs.includes(d.id) &&
      !(state.deferred_drugs || []).includes(d.id),
  )
  const batch = toCrawl.slice(0, BATCH_SIZE)

  console.log(`[crawl] total=${drugs.length} done=${state.crawled_drugs.length} pending=${toCrawl.length} batch=${batch.length}`)

  let accepted = 0
  let rejected = 0
  let failures = 0

  for (const drug of batch) {
    const name = (drug as any).generic_name || (drug as any).name
    if (!name) continue

    state.pending_drugs = [drug.id]
    saveState(state)

    try {
      const stats = await crawlDrug(drug.id, name)
      accepted += stats.accepted
      rejected += stats.rejected

      if (stats.accepted > 0) {
        state.crawled_drugs.push(drug.id)
      } else {
        state.failed_drugs.push(drug.id)
      }

      console.log(`[ok] ${name} +${stats.accepted} -${stats.rejected}`)
    } catch (e: any) {
      state.failed_drugs.push(drug.id)
      failures++
      console.log(`[err] ${name}: ${e.message}`)
    }

    saveState(state)
  }

  state.pending_drugs = []
  state.last_crawl = new Date().toISOString()
  state.run_count = state.run_count + 1
  saveState(state)

  console.log(
    `[done] batch=${batch.length} accepted=${accepted} rejected=${rejected} failures=${failures} total_done=${state.crawled_drugs.length}`,
  )
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
