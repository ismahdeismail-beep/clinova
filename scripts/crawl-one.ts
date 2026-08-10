// One-off: run crawlDrug for a specific drug id (end-to-end, with dotenv).
// Usage: npx tsx scripts/crawl-one.ts "<drug-id>" "<generic-name>"
import 'dotenv/config'
import { crawlDrug } from '../src/services/crawler/imageCrawler'

async function main() {
  const [, , drugId, genericName] = process.argv
  if (!drugId || !genericName) {
    console.error('Usage: npx tsx scripts/crawl-one.ts "<drug-id>" "<generic-name>"')
    process.exit(1)
  }
  const stats = await crawlDrug(drugId, genericName)
  console.log(`[one] ${genericName} =>`, JSON.stringify(stats))
  // mark state so run-crawl skips it next time
  const fs = await import('fs')
  const p = 'storage/crawler_state.json'
  const state = JSON.parse(fs.readFileSync(p, 'utf8'))
  if (stats.accepted > 0 && !state.crawled_drugs.includes(drugId)) state.crawled_drugs.push(drugId)
  if (stats.accepted === 0 && !state.failed_drugs.includes(drugId)) state.failed_drugs.push(drugId)
  state.crawled_drugs = [...new Set(state.crawled_drugs)]
  state.failed_drugs = [...new Set(state.failed_drugs)]
  fs.writeFileSync(p, JSON.stringify(state, null, 2))
  console.log(`[one] state: crawled=${state.crawled_drugs.length} failed=${state.failed_drugs.length}`)
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
