// Read-only audit: classify every drug_images row into an image KIND
// (packaging / product / structure / diagram / unknown) and report per-gallery
// kind composition so same-kind repetition (e.g. 4 box shots, 3 structure
// diagrams, journal-figure junk) is visible.
//
// Usage: npx tsx scripts/_audit-kinds.ts [--top N] [--json]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const topN = Number(process.argv.find((a) => a.startsWith('--top='))?.split('=')[1] || '40')
const asJson = process.argv.includes('--json')

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

const KINDS = ['packaging', 'product', 'structure', 'diagram', 'unknown'] as const
type Kind = (typeof KINDS)[number]

const KIND_RE: Record<Kind, RegExp> = {
  packaging:
    /\b(pack|packaging|box|vial|bottle|blister|strip|label|carton|tube|sachet|ampoule|ampule|inhaler|pen|jar|tin|syringe|prefilled|dispenser|dropper)\b/,
  product:
    /\b(tablet|tablets|tab|tabs|capsule|capsules|cap\b|gel|cream|ointment|syrup|suspension|solution|drops|spray|injection|suppository|patch|lozenge|granules|powder|pill|pills|effervescent)\b/,
  structure:
    /(3d|3-d|3 d|ball.?and.?stick|skeletal|vdw|van.?der.?waals|space.?fill|stick\b|model|molecule|molecular|chemical|structure|formula|formulae|render|conformer)/,
  diagram:
    /(synthesis|pathway|reaction|scheme|mechanism|metabolism|metabolic|biosynth|degradation|route|graphical|abstract|figure|biosynthesis)/,
  unknown: /.*/,
}

function kindOf(pageUrl: string, source: string): Kind {
  const raw = (pageUrl || '').split('/').pop() || ''
  const name = decodeURIComponent(raw)
    .toLowerCase()
    .replace(/^file:/, '')
    .replace(/\.[a-z0-9]+$/i, '')
  const s = (source || '').toLowerCase()
  if (s.includes('structure')) return 'structure'
  if (KIND_RE.diagram.test(name)) return 'diagram'
  if (KIND_RE.packaging.test(name)) return 'packaging'
  if (KIND_RE.product.test(name)) return 'product'
  if (KIND_RE.structure.test(name)) return 'structure'
  return 'unknown'
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
  console.log(`total rows: ${rows.length}`)

  const perDrug = new Map<string, any[]>()
  for (const r of rows) {
    const k = r.drug_id
    if (!perDrug.has(k)) perDrug.set(k, [])
    perDrug.get(k)!.push(r)
  }

  const kindTotals: Record<Kind, number> = { packaging: 0, product: 0, structure: 0, diagram: 0, unknown: 0 }
  const galleryKinds: { drug: string; name: string; count: number; kinds: Record<Kind, number>; sameKindMax: number; rows: any[] }[] = []

  for (const [drugId, imgs] of perDrug) {
    const kinds: Record<Kind, number> = { packaging: 0, product: 0, structure: 0, diagram: 0, unknown: 0 }
    for (const i of imgs) {
      const k = kindOf(i.page_url, i.source)
      kinds[k]++
      kindTotals[k]++
      i._kind = k
    }
    const maxKind = Math.max(...Object.values(kinds))
    galleryKinds.push({
      drug: drugId,
      name: imgs[0]?.generic_name || drugId,
      count: imgs.length,
      kinds,
      sameKindMax: maxKind,
      rows: imgs,
    })
  }

  if (asJson) {
    console.log(JSON.stringify({ kindTotals, galleryKinds: galleryKinds.map((g) => ({ name: g.name, count: g.count, kinds: g.kinds, sameKindMax: g.sameKindMax })) }, null, 2))
    return
  }

  console.log('kind totals:', JSON.stringify(kindTotals))
  const withJunk = galleryKinds.filter((g) => g.kinds.diagram > 0)
  console.log(`galleries containing diagram junk: ${withJunk.length}`)
  const repetitive = galleryKinds.filter((g) => g.sameKindMax >= 3 && g.count >= 3)
  console.log(`galleries with >=3 of a single kind: ${repetitive.length}`)
  const sameOnly = galleryKinds.filter((g) => g.count >= 3 && Object.values(g.kinds).filter((v) => v > 0).length === 1)
  console.log(`galleries that are ALL one kind (>=3 imgs): ${sameOnly.length}`)
  console.log('')
  console.log(`--- top ${topN} repetitive galleries (by sameKindMax, then size) ---`)
  const ranked = [...repetitive].sort((a, b) => b.sameKindMax - a.sameKindMax || b.count - a.count)
  for (const g of ranked.slice(0, topN)) {
    const kinds = (Object.entries(g.kinds) as [Kind, number][])
      .filter(([, v]) => v > 0)
      .map(([k, v]) => `${k}:${v}`)
      .join(' ')
    console.log(`${g.name.padEnd(28)} n=${g.count}  ${kinds}`)
  }
  console.log('')
  console.log('--- diagram-junk examples (page_url) ---')
  const junkRows = rows.filter((r) => r._kind === 'diagram')
  for (const r of junkRows.slice(0, 20)) {
    console.log(`  ${r.generic_name?.padEnd(22)} ${String(r.page_url).substring(0, 90)}`)
  }
  console.log('')
  console.log(`--- unknown-kind rows: ${kindTotals.unknown} (first 15) ---`)
  for (const r of rows.filter((r) => r._kind === 'unknown').slice(0, 15)) {
    console.log(`  ${r.generic_name?.padEnd(22)} ${String(r.page_url).substring(0, 90)}`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
