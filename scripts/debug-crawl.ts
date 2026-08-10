// debug-crawl.ts — trace why specific KEM drugs reject candidates.
// Usage: npx tsx scripts/debug-crawl.ts "<genericName>" "<query>" ...
import 'dotenv/config'
import { searchWikimedia, isLicenseAccepted } from '../src/services/crawler/providers'
import { isTitleRelevant } from '../src/services/crawler/kenyanBrands'
import { downloadImage, validateImage, optimizeImage } from '../src/services/crawler/imageProcessor'

const name = process.argv[2] || 'Cephalexin'
const queries = process.argv.slice(3)

async function main() {
  const qs = queries.length ? queries : ['Keflex cephalexin', 'cephalexin', 'cephalexin capsule']
  for (const q of qs) {
    console.log(`\n=== query: "${q}" ===`)
    const results = await searchWikimedia(q, 8)
    console.log(`found ${results.length}`)
    for (const r of results) {
      const lic = isLicenseAccepted(r.license)
      const rel = isTitleRelevant(r.title, name)
      let detail = ''
      if (lic && rel) {
        try {
          const buf = await downloadImage(r.imageUrl)
          const v = await validateImage(buf)
          if (v.valid) {
            const opt = await optimizeImage(buf)
            detail = `download OK ${buf.length} bytes, dims ${v.width}x${v.height}, hash ${opt.hash.slice(0, 12)}`
          } else {
            detail = `INVALID: ${v.reason || 'unknown'}`
          }
        } catch (e: any) {
          detail = `download FAIL: ${e.message.slice(0, 80)}`
        }
      }
      console.log(`  [lic=${lic ? 'ok' : r.license} rel=${rel ? 'ok' : 'no'}] ${r.title}${detail ? ' → ' + detail : ''}`)
      await new Promise((r) => setTimeout(r, 800))
    }
  }
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
