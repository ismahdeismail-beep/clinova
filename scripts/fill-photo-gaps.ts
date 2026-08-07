// Photo-gap fill: give every monograph that lacks a photographic image (the
// drug itself, or a box/bottle with a clear name) a real product or packaging
// photo from Wikimedia Commons.
//
// Structure-only results are skipped — a drug whose gallery is already filled
// with PubChem/PDB renders keeps those and gains the missing photo kind. The
// audit (scripts/audit-image-quality.ts) decides who needs a photo.
//
// Usage:
//   npx tsx scripts/fill-photo-gaps.ts [--limit N] [--dry-run]
//   WORKER_INDEX=0 WORKER_COUNT=4 npx tsx scripts/fill-photo-gaps.ts
// Resumable via storage/photo_fill_state.json (per worker).
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import {
  generateSearchQueries,
  kindOfTitle,
  uploadImages,
  insertImageRecord,
} from '../src/services/crawler/imageCrawler'
import {
  searchWikimedia,
  searchDailyMed,
  isLicenseAccepted,
  politeDelay,
} from '../src/services/crawler/providers'
import { brandNamesFor, isTitleRelevant, isWeakRelevant, isJunkTitle } from '../src/services/crawler/kenyanBrands'
import { downloadImage, downloadDelay, optimizeImage, hammingDistance, scoreQuality } from '../src/services/crawler/imageProcessor'

const WORKER_INDEX = Number(process.env.WORKER_INDEX || '0')
const WORKER_COUNT = Number(process.env.WORKER_COUNT || '1')
const STATE_FILE = `storage/photo_fill_w${WORKER_INDEX}.json`
const dryRun = process.argv.includes('--dry-run')
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? Number(limitArg.split('=')[1]) : 0
const MAX_PHOTOS = 2

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

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

function shard(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % WORKER_COUNT
}

// Photo-targeted queries: brand names first, then the name + the forms that
// surface real product/box photos (Wikimedia form-suffixed searches usually
// beat the bare name for packaging shots).
function photoQueries(name: string): string[] {
  const out: string[] = []
  for (const b of brandNamesFor(name)) out.push(b)
  for (const q of generateSearchQueries(name, ['tablet', 'capsule', 'injection', 'syrup', 'vial', 'cream', 'box'])) {
    if (!out.includes(q)) out.push(q)
  }
  out.push(`${name} packaging`, `${name} box`)
  return out
}

// Brand-name-only photos ("Buspar.jpg" for buspirone, "Trileptal…" for
// oxcarbazepine) fail the generic-name relevance check but are real product
// photos. Accept them for the fill — junk subjects are already blocked by
// isJunkTitle and validateImage's blur/color/size checks.
function isBrandPhoto(title: string, genericName: string): boolean {
  if (isJunkTitle(title)) return false
  const t = title.toLowerCase().replace(/[^a-z0-9]+/g, ' ')
  const tokens = new Set(t.split(' ').filter(Boolean))
  for (const b of brandNamesFor(genericName)) {
    const bb = b.toLowerCase().replace(/[^a-z0-9]+/g, '')
    if (!bb || bb.length < 3) continue
    if (tokens.has(bb) || t.includes(bb)) return true
  }
  return false
}

// Diagram/chemistry titles in any language (synthesis, Synthese, mecanismo,
// pathw… ) are never drug photos — skip before the expensive download.
const DIAGRAM_TITLE_RE =
  /(synthes|synthese|synthèse|pathway|mechanism|scheme|reaction|nomenclature|metabol|strukturformel|structur|formula|formel|ball.?and.?stick|spacefill|molecule|molecular|conformer|conformer|3d|3 d|xtal|diagram|figure|fig\.|gráfica|grafica|esquema)/i

// Global dedup set is loaded once in main() — every new hash is added to it
// so the same photo is never stored twice across the whole catalog.

// Relaxed validation for the photo fill: a small-but-real product photo beats
// no photo. Min 250px (vs the crawler's 400px), no blur rejection (box/carton
// photos in poor light are still the correct drug), keep the icon/low-color
// rejection and a format sanity check.
async function validatePhoto(buf: Buffer): Promise<{ valid: boolean; reason?: string; width: number; height: number; format: string }> {
  try {
    const sharp = (await import('sharp')).default
    const meta = await sharp(buf).metadata()
    const { width = 0, height = 0, format = 'unknown' } = meta
    if (width < 250 || height < 250) {
      return { valid: false, reason: 'Image too small (min 250px)', width, height, format }
    }
    const { data } = await sharp(buf)
      .resize(50, 50, { fit: 'inside' })
      .raw()
      .toBuffer({ resolveWithObject: true })
    let colorSum = 0
    for (let i = 0; i < data.length; i += 3) {
      colorSum += Math.abs(data[i] - data[i + 1]) + Math.abs(data[i + 1] - data[i + 2])
    }
    const avgColorDiff = colorSum / (data.length / 3)
    if (avgColorDiff < 5) {
      return { valid: false, reason: 'Image appears to be text/icon (low color variance)', width, height, format }
    }
    return { valid: true, width, height, format }
  } catch (e: any) {
    return { valid: false, reason: `Processing error: ${e.message}`, width: 0, height: 0, format: 'unknown' }
  }
}

async function main() {
  // Drugs that already have a photo (packaging/product/photo kind)
  const images = await fetchAll('drug_images', 'drug_id, source, page_url, hash')
  const withPhoto = new Set<string>()
  const hashes = new Set<string>()
  for (const r of images) {
    if (r.hash) hashes.add(r.hash)
    const s = String(r.source || '').toLowerCase()
    const name = decodeURIComponent((r.page_url || '').split('/').pop() || '').toLowerCase()
    const isPhoto =
      s.includes('dailymed') || s.includes('kenyan brand') || s.includes('wikipedia (lead)') ||
      (!s.includes('pubchem') && !s.includes('rcsb') && !s.includes('structure') && !s.includes('lecture'))
    if (isPhoto) withPhoto.add(r.drug_id)
  }

  const drugs = await fetchAll('drug_monographs', 'id, generic_name, name')
  const targets = drugs.filter(
    (d: any) => !withPhoto.has(d.id) && shard(d.id) === WORKER_INDEX,
  )
  console.log(`worker ${WORKER_INDEX}/${WORKER_COUNT}: ${targets.length} drugs need a photo`)

  const state: { done: string[]; ok: string[]; none: string[] } = fs.existsSync(STATE_FILE)
    ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
    : { done: [], ok: [], none: [] }
  const done = new Set(state.done)

  let ok = 0
  let none = 0
  for (const d of targets.slice(0, LIMIT || undefined)) {
    const name = d.generic_name || d.name
    if (!name || done.has(d.id)) continue
    console.log(`\n== ${name} ==`)
    const existingHashes = hashes
    const queries = photoQueries(name)
    const used = new Set<string>()
    const acceptedKinds = new Set<string>()
    let accepted = 0

    // Shared acceptance pipeline: license → kind → relevance → download →
    // validate → dedup → optimize → upload → insert. Returns images accepted.
    const processResults = async (results: any[], drugName: string, q: string): Promise<number> => {
      let got = 0
      for (const r of results) {
        if (accepted + got >= MAX_PHOTOS) break
        if (!isLicenseAccepted(r.license)) continue
        const kind = kindOfTitle(r.title, r.source, r.pageUrl)
        // Structure-only results are skipped — this fill is about photos.
        if (kind === 'structure' || kind === 'diagram') continue
        if (DIAGRAM_TITLE_RE.test(String(r.title || ''))) continue
        if (used.has(r.imageUrl)) continue
        // The title must name the drug (or the brand), or be a plausible
        // generic medicine photo as a weak fallback.
        if (!isTitleRelevant(r.title, drugName) && !isBrandPhoto(r.title, drugName) && !isWeakRelevant(r.title)) continue
        used.add(r.imageUrl)

        try {
          await downloadDelay()
          const buf = await downloadImage(r.imageUrl)
          const validation = await validatePhoto(buf)
          if (!validation.valid) {
            console.log(`    [reject] ${String(r.title).slice(0, 55)} — ${validation.reason}`)
            continue
          }
          const optimized = await optimizeImage(buf)
          const dup = [...existingHashes].some((h) => hammingDistance(optimized.hash, h) < 5)
          if (dup) {
            console.log(`    [dup] ${String(r.title).slice(0, 55)}`)
            continue
          }
          existingHashes.add(optimized.hash)
          const urls = await uploadImages(drugName, 'unknown', '', optimized)
          await insertImageRecord(d.id, {
            generic_name: drugName,
            dosage_form: 'unknown',
            strength: '',
            image_url: urls.image_url,
            thumbnail_url: urls.thumbnail_url,
            large_url: urls.large_url,
            medium_url: urls.medium_url,
            source: r.source,
            license: r.license,
            license_url: r.licenseUrl,
            author: r.author,
            page_url: r.pageUrl,
            hash: optimized.hash,
            quality_score: scoreQuality(validation.width, validation.height, validation.format),
          })
          got++
          acceptedKinds.add(kind)
          console.log(`    [ok] ${kind} ${String(r.title).slice(0, 65)} q=${validation.width}x${validation.height}`)
        } catch (e: any) {
          console.log(`    [err] ${String(r.title).slice(0, 55)}: ${e?.message ?? e}`)
        }
        await new Promise((r2) => setTimeout(r2, 300))
      }
      return got
    }

    for (const q of queries) {
      if (accepted >= MAX_PHOTOS) break
      let results: any[] = []
      try {
        results = await searchWikimedia(q, 12)
      } catch (e: any) {
        console.log(`    [search-err] ${q}: ${e?.message ?? e}`)
        continue
      }
      accepted += await processResults(results, name, q)
      if (accepted >= MAX_PHOTOS) continue
      // DailyMed tier: US FDA label package photos are public-domain and carry
      // the drug name — real packaging for US-marketed drugs Wikimedia lacks.
      try {
        const dm = await searchDailyMed(q, 6)
        accepted += await processResults(dm, name, q)
      } catch (e: any) {
        console.log(`    [dailymed-err] ${q}: ${e?.message ?? e}`)
      }
      if (queries.length > 1) await politeDelay()
    }

    if (accepted > 0) {
      ok++
      state.ok.push(d.id)
      console.log(`  -> +${accepted} photo(s), kinds: ${[...acceptedKinds].join(',')}`)
    } else {
      none++
      state.none.push(d.id)
      console.log('  -> no photo found on Wikimedia')
    }
    done.add(d.id)
    state.done = Array.from(done)
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
  }
  console.log(`\n[worker ${WORKER_INDEX} done] photos_added=${ok} none=${none} total_done=${done.size}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
