// Image-quality audit for the KDI galleries.
//
// Classifies every drug_images row by SOURCE (not filename) because the crawler
// folds the image kind into the `source` string ("PubChem (NIH) 3D conformer",
// "DailyMed (FDA)", "Kenyan brand (Lab & Allied)"), then reports per-drug
// coverage against the quality bar: every monograph needs
//   1. the drug itself / packaging with a clear name (photo), and
//   2. a correct 2D or 3D structure render.
// Also flags junk (logos, charts, disease photos, journal figures), low
// quality scores, and unverified rows.
//
// Usage: npx tsx scripts/audit-image-quality.ts [--json]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const asJson = process.argv.includes('--json')

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

type Kind = 'packaging' | 'product' | 'photo' | 'structure-2d' | 'structure-3d' | 'junk' | 'unknown'

// Filename junk heuristics for plain Wikimedia rows — logos, charts, graphs,
// disease photos, QR codes, and pure text documents are never drug imagery.
const JUNK_RE =
  /(logo|chart|graph|diagram|flowchart|figure\s*\d|scheme\s*\d|graphical abstract|qr[_ ]?code|barcode|infographic|\btable[_ ]?\d|timeline|business card|eczema|psoriasis|biopsy|histolog|microscop|scan|ultrasound|x[ -]?ray|mri|ct[_ ]?scan|poster|cover|title page|screenshot|drawing by|banner)/i

function kindOf(r: any): Kind {
  const s = String(r.source || '').toLowerCase()
  if (s.includes('dailymed') || s.includes('kenyan brand')) return 'packaging'
  if (s.includes('pubchem')) return s.includes('3d') ? 'structure-3d' : 'structure-2d'
  if (s.includes('rcsb') || s.includes('pdbe') || s.includes('ribbon')) return 'structure-3d'
  if (s.includes('wikimedia commons (structure)')) return 'structure-3d'
  if (s.includes('wikipedia (lead)')) return 'photo'
  if (s.includes('lecture notes')) return 'junk'
  if (s !== 'wikimedia commons') return 'unknown'

  // Plain Wikimedia rows: classify from the Commons file name.
  const name = decodeURIComponent((r.page_url || '').split('/').pop() || '')
    .toLowerCase()
    .replace(/^file:/, '')
    .replace(/\.[a-z0-9]+$/i, '')
  if (JUNK_RE.test(name)) return 'junk'
  if (/(3d|ball.?and.?stick|skeletal|vdw|van.?der.?waals|space.?fill|molecule|molecular|chemical structure|structural formula|conformer|render|model)/.test(name)) return 'structure-3d'
  if (/\b(pack|packaging|box|vial|bottle|blister|strip|label|carton|tube|sachet|ampoule|ampule|inhaler|pen|jar|tin|syringe|prefilled|dispenser|dropper|container)\b/.test(name)) return 'packaging'
  if (/\b(tablet|tablets|tab|capsule|capsules|gel|cream|ointment|syrup|suspension|solution|drops|spray|injection|suppository|patch|lozenge|granules|powder|pill|pills|effervescent|drug|medicine|medication|product|preparation)\b/.test(name)) return 'product'
  return 'photo' // generic drug photo — counts toward the photo requirement
}

async function fetchAll(table: string, cols: string, step = 1000): Promise<any[]> {
  const all: any[] = []
  let from = 0
  for (let i = 0; i < 80; i++) {
    const { data, error } = await admin.from(table as any).select(cols).range(from, from + step - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    from += step
    if (data.length < step) break
  }
  return all
}

async function main() {
  const images = await fetchAll(
    'drug_images',
    'id, drug_id, generic_name, source, image_url, thumbnail_url, page_url, quality_score, verified, created_at',
  )
  const drugs = await fetchAll('drug_monographs', 'id, generic_name, name')

  const perDrug = new Map<string, any[]>()
  for (const r of images) {
    r._kind = kindOf(r)
    if (!perDrug.has(r.drug_id)) perDrug.set(r.drug_id, [])
    perDrug.get(r.drug_id)!.push(r)
  }

  const kindTotals: Record<string, number> = {}
  for (const r of images) kindTotals[r._kind] = (kindTotals[r._kind] || 0) + 1

  const needsPhoto: string[] = []
  const needsStructure: string[] = []
  const needsBoth: string[] = []
  const noImages: string[] = []
  const junkRows = images.filter((r) => r._kind === 'junk')
  const lowQuality = images.filter((r) => (r.quality_score || 0) < 60)

  for (const d of drugs) {
    const imgs = perDrug.get(d.id) || []
    const name = d.generic_name || d.name || d.id
    if (imgs.length === 0) {
      noImages.push(name)
      continue
    }
    const hasPhoto = imgs.some((i) => i._kind === 'photo' || i._kind === 'product' || i._kind === 'packaging')
    const hasStructure = imgs.some((i) => i._kind === 'structure-2d' || i._kind === 'structure-3d')
    if (!hasPhoto && !hasStructure) needsBoth.push(name)
    else if (!hasPhoto) needsPhoto.push(name)
    else if (!hasStructure) needsStructure.push(name)
  }

  const report = {
    generated_at: new Date().toISOString(),
    drugs_total: drugs.length,
    images_total: images.length,
    images_per_drug: (images.length / Math.max(drugs.length, 1)).toFixed(2),
    kind_totals: kindTotals,
    verified_rows: images.filter((r) => r.verified).length,
    gaps: {
      no_images_at_all: noImages,
      missing_photo: needsPhoto,
      missing_structure: needsStructure,
      missing_both: needsBoth,
    },
    junk_rows: junkRows.map((r) => ({
      drug: r.generic_name,
      id: r.id,
      page_url: r.page_url,
      source: r.source,
    })),
    low_quality_rows: lowQuality.length,
  }

  if (asJson) {
    console.log(JSON.stringify(report, null, 2))
    return
  }

  console.log(`drugs: ${drugs.length}  images: ${images.length}  (${report.images_per_drug}/drug)`)
  console.log('kind totals:', JSON.stringify(kindTotals))
  console.log(`verified rows: ${report.verified_rows}/${images.length}`)
  console.log('')
  console.log(`GAPS — no images at all: ${noImages.length}`)
  console.log(`GAPS — missing photo (drug/box): ${needsPhoto.length}`)
  console.log(`GAPS — missing 2D/3D structure: ${needsStructure.length}`)
  console.log(`GAPS — missing both: ${needsBoth.length}`)
  console.log('')
  console.log('--- missing BOTH (need photo + structure) ---')
  for (const n of needsBoth.slice(0, 50)) console.log('  ', n)
  console.log('')
  console.log(`--- junk rows: ${junkRows.length} ---`)
  for (const r of junkRows.slice(0, 25)) console.log(`  ${String(r.generic_name).padEnd(22)} ${String(r.page_url).slice(0, 95)}`)
  console.log('')
  console.log(`--- low quality (<60): ${lowQuality.length} ---`)
  for (const r of lowQuality.slice(0, 15)) console.log(`  q=${r.quality_score} ${String(r.generic_name).padEnd(20)} ${String(r.page_url).slice(0, 85)}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
