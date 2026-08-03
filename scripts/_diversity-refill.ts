// Diversity refill: re-crawl drugs whose galleries are all-structure or have
// <2 product/packaging images, so the fixed crawler (per-kind cap, setid cap,
// journal-junk rejection) fills them with real packaging/product photos.
// Safe to run anytime; uses each drug's existing hashes so nothing re-inserts.
//
// Usage: npx tsx scripts/_diversity-refill.ts [--limit N]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { crawlDrug } from '../src/services/crawler/imageCrawler'

const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? Number(limitArg.split('=')[1]) : 0
const KIND_RE: Record<string, RegExp> = {
  diagram:
    /(synthesis|pathway|mechanism|scheme|reaction|reactions|metabolic|biosynth|figure|degradation|schematic|metabolism)/i,
  packaging:
    /\b(pack|packaging|box|vial|bottle|blister|strip|label|carton|tube|sachet|ampoule|ampule|inhaler|pen|jar|tin|syringe|prefilled|dispenser|dropper|container)\b/i,
  product:
    /(\b(tablet|tablets|tab|capsule|capsules|gel|cream|ointment|syrup|suspension|solution|drops|spray|injection|suppository|patch|lozenge|granules|powder|pill|pills|effervescent)\b|\b\d+\s?(mg|mcg|ml|g|iu|units?)\b)/i,
  structure: /(3d|ball.?and.?stick|skeletal|vdw|van.?der.?waals|space.?fill|molecule|molecular|chemical structure|formula|conformer|render|model)/i,
}

function kindOf(pageUrl: string, source: string): string {
  const t = `${pageUrl || ''}`.toLowerCase()
  const s = (source || '').toLowerCase()
  if (s.includes('structure')) return 'structure'
  if (s.includes('dailymed')) return 'packaging'
  if (KIND_RE.diagram.test(t)) return 'diagram'
  if (KIND_RE.packaging.test(t)) return 'packaging'
  if (KIND_RE.product.test(t)) return 'product'
  if (KIND_RE.structure.test(t)) return 'structure'
  return 'unknown'
}

async function fetchAll(table: string, cols: string): Promise<any[]> {
  const all: any[] = []
  let from = 0
  for (let i = 0; i < 80; i++) {
    const { data } = await admin.from(table as any).select(cols).range(from, from + 999)
    if (!data || data.length === 0) break
    all.push(...data)
    from += 1000
    if (data.length < 1000) break
  }
  return all
}

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

async function main() {
  const [drugs, images] = await Promise.all([
    fetchAll('drug_monographs', 'id, generic_name, name'),
    fetchAll('drug_images', 'drug_id, generic_name, source, page_url, quality_score, hash, created_at'),
  ])
  console.log(`drugs: ${drugs.length}  image rows: ${images.length}`)

  const perDrug = new Map<string, { count: number; hashes: Set<string>; photoKinds: number }>()
  for (const row of images) {
    const e = perDrug.get(row.drug_id) || { count: 0, hashes: new Set<string>(), photoKinds: 0 }
    e.count++
    if (row.hash) e.hashes.add(row.hash)
    const k = kindOf(row.page_url, row.source)
    if (k === 'packaging' || k === 'product') e.photoKinds++
    perDrug.set(row.drug_id, e)
  }

  const targets = drugs
    .filter((d) => {
      const e = perDrug.get(d.id)
      if (!e || e.count === 0) return false // zero-image drugs are refill's job
      if (!(d.generic_name || d.name)) return false
      // needs real product/packaging photos (structures don't count)
      return e.photoKinds < 2
    })
    .slice(0, LIMIT || undefined)

  console.log(`targets (non-structure photos < 2): ${targets.length}`)

  let ok = 0
  for (const d of targets) {
    const name = d.generic_name || d.name
    const e = perDrug.get(d.id)!
    try {
      const stats = await crawlDrug(d.id, name, undefined, '', new Set(e.hashes), e.count)
      ok++
      console.log(`[ok] ${name}: found=${stats.found} accepted=${stats.accepted} rejected=${stats.rejected} failures=${stats.failures.length}`)
    } catch (err: any) {
      console.log(`[err] ${name}: ${err.message}`)
    }
  }
  console.log(`[done] ok=${ok}/${targets.length}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
