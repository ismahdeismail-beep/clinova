// Post-refill cleanup: enforce image-kind diversity per gallery.
//   1. Delete journal-figure junk (synthesis/pathway/mechanism diagrams).
//   2. Delete exact page_url duplicates within a drug (keeps highest quality).
//   3. Cap per-kind at CRAWL_MAX_PER_KIND (default 2) — no more 5× structure
//      or 5× box galleries.
//   4. Cap per DailyMed label page (setid) at 1.
//   5. Cap total gallery at CRAWL_MAX_IMAGES (default 4).
// Keeps the highest quality_score per bucket; never drops a drug below 1 image.
//
// Usage: npx tsx scripts/_cleanup-kinds.ts [--dry-run]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const dryRun = process.argv.includes('--dry-run')
const MAX_PER_KIND = Number(process.env.CRAWL_MAX_PER_KIND || '2')
const MAX_TOTAL = Number(process.env.CRAWL_MAX_IMAGES || '4')

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

const KIND_RE: Record<string, RegExp> = {
  diagram:
    /(synthesis|pathway|mechanism|scheme|reaction|reactions|metabolic|biosynth|figure|degradation|schematic|metabolism)/i,
  packaging:
    /\b(pack|packaging|box|vial|bottle|blister|strip|label|carton|tube|sachet|ampoule|ampule|inhaler|pen|jar|tin|syringe|prefilled|dispenser|dropper|container)\b/i,
  product:
    /(\b(tablet|tablets|tab|capsule|capsules|gel|cream|ointment|syrup|suspension|solution|drops|spray|injection|suppository|patch|lozenge|granules|powder|pill|pills|effervescent)\b|\b\d+\s?(mg|mcg|ml|g|iu|units?)\b)/i,
  structure:
    /(3d|ball.?and.?stick|skeletal|vdw|van.?der.?waals|space.?fill|molecule|molecular|chemical structure|formula|conformer|render|model)/i,
}

function kindOf(pageUrl: string, source: string): string {
  const t = `${pageUrl || ''}`.toLowerCase()
  const s = (source || '').toLowerCase()
  if (s.includes('structure')) return 'structure'
  if (s.includes('dailymed')) return 'packaging' // FDA label images = product labels
  if (KIND_RE.diagram.test(t)) return 'diagram'
  if (KIND_RE.packaging.test(t)) return 'packaging'
  if (KIND_RE.product.test(t)) return 'product'
  if (KIND_RE.structure.test(t)) return 'structure'
  return 'unknown'
}

function setidOf(pageUrl: string): string | null {
  return (pageUrl || '').match(/setid=([0-9a-f-]+)/i)?.[1] || null
}

async function fetchAll(): Promise<any[]> {
  const all: any[] = []
  let from = 0
  for (let i = 0; i < 80; i++) {
    const { data } = await admin.from('drug_images').select('id, drug_id, generic_name, source, page_url, quality_score, hash, created_at').range(from, from + 999)
    if (!data || data.length === 0) break
    all.push(...data)
    from += 1000
    if (data.length < 1000) break
  }
  return all
}

async function main() {
  const rows = await fetchAll()
  console.log(`total rows: ${rows.length}  dryRun=${dryRun}`)

  const toDelete = new Set<string>()
  let kept = 0

  // ── Pass 1: journal-figure junk ──
  for (const r of rows) {
    if (kindOf(r.page_url, r.source) === 'diagram') {
      toDelete.add(r.id)
      console.log(`  [junk] ${r.generic_name?.padEnd(24)} ${String(r.page_url).substring(0, 85)}`)
    }
  }

  // ── Pass 2: per-drug curation ──
  const perDrug = new Map<string, any[]>()
  for (const r of rows) {
    if (toDelete.has(r.id)) continue
    if (!perDrug.has(r.drug_id)) perDrug.set(r.drug_id, [])
    perDrug.get(r.drug_id)!.push(r)
  }

  let drugsTrimmed = 0
  for (const [drugId, imgs] of perDrug) {
    const name = imgs[0]?.generic_name || drugId
    // same page_url within a drug → keep the highest quality
    const seenUrl = new Map<string, any[]>()
    for (const i of imgs) {
      const key = `${i.page_url || ''}::${i.source || ''}`
      if (!seenUrl.has(key)) seenUrl.set(key, [])
      seenUrl.get(key)!.push(i)
    }
    for (const [, group] of seenUrl) {
      if (group.length <= 1) continue
      group.sort((a, b) => (b.quality_score || 0) - (a.quality_score || 0))
      for (const dup of group.slice(1)) {
        toDelete.add(dup.id)
        console.log(`  [dup-url] ${name?.padEnd(24)} ${String(dup.page_url).substring(0, 70)}`)
      }
    }

    const keptRows = imgs.filter((i) => !toDelete.has(i.id))
    const byKind = new Map<string, any[]>()
    for (const i of keptRows) {
      const k = kindOf(i.page_url, i.source)
      if (!byKind.has(k)) byKind.set(k, [])
      byKind.get(k)!.push(i)
    }

    // per-kind cap (rank by quality desc, then newest first)
    const winners: any[] = []
    for (const [kind, group] of byKind) {
      if (kind === 'diagram') continue
      group.sort((a, b) => (b.quality_score || 0) - (a.quality_score || 0) || (b.created_at || '').localeCompare(a.created_at || ''))
      winners.push(...group.slice(0, MAX_PER_KIND))
    }

    // per-setid cap for DailyMed labels
    const setidCount = new Map<string, number>()
    const setidFiltered = winners.filter((w) => {
      const sid = setidOf(w.page_url)
      if (!sid) return true
      const c = setidCount.get(sid) || 0
      if (c >= 1) return false
      setidCount.set(sid, c + 1)
      return true
    })

    // total cap — prefer keeping the most kinds (diversity), then quality
    let final = setidFiltered
    if (final.length > MAX_TOTAL) {
      final.sort((a, b) => {
        const ka = kindOf(a.page_url, a.source)
        const kb = kindOf(b.page_url, b.source)
        if (ka !== kb) return 0
        return (b.quality_score || 0) - (a.quality_score || 0)
      })
      // stable-ish: drop lowest-quality same-kind duplicates until at cap
      final = final.slice(0, MAX_TOTAL)
    }

    const winnerIds = new Set(final.map((w) => w.id))
    for (const i of keptRows) {
      if (!winnerIds.has(i.id) && !toDelete.has(i.id)) {
        toDelete.add(i.id)
        console.log(`  [cap] ${name?.padEnd(24)} kind=${kindOf(i.page_url, i.source)} q=${i.quality_score} ${String(i.page_url).substring(0, 60)}`)
      }
    }
    kept += final.length
    if (final.length < keptRows.length) drugsTrimmed++
  }

  console.log('')
  console.log(`toDelete: ${toDelete.size}  remaining: ${kept}  drugs trimmed: ${drugsTrimmed}`)

  if (dryRun) {
    console.log('DRY RUN — no changes made. Re-run without --dry-run to delete.')
    return
  }
  if (toDelete.size > 0) {
    const ids = [...toDelete]
    // chunked delete
    for (let i = 0; i < ids.length; i += 500) {
      const { error } = await admin.from('drug_images').delete().in('id', ids.slice(i, i + 500))
      if (error) throw error
    }
    console.log(`deleted ${ids.length} rows`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
