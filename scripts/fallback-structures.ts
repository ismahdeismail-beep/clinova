// Structure-image fallback pass: for drugs with zero raster photos on
// Wikimedia Commons, fetch their chemical structure diagrams (SVG/PNG) and
// insert them directly (no download/optimize — browsers + the offline cache
// render SVG fine). Resumable via crawler_state.json (moves each drug from
// failed_drugs to crawled_drugs as it succeeds).
//
// Usage: npx tsx scripts/fallback-structures.ts
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'
import { fetchWithRetry, isLicenseAccepted } from '../src/services/crawler/providers'
import { isTitleRelevant, componentWords } from '../src/services/crawler/kenyanBrands'
import { loadState, saveState } from '../src/services/crawler/state'

const ACCEPT_MIME = /^image\/(svg\+xml|png|jpeg|gif|webp|tiff)$/
const LIMIT_PER_DRUG = 2
const DELAY_MS = 8000

// Reject data charts (DrugStats graphs) and other non-drug imagery that can
// still name-match the drug ("AlfuzosinHydrochloride_prescriptions_(DrugStats)").
const CHART_RE = /costs|prescriptions|drugstats|_stats|trends|utilization|expenditure|price|sales|patients|population|epidemiology|resistance/i
// Structure-diagram indicators — preferred over generic matches.
const STRUCTURE_RE = /structure|skeletal|ball-and-stick|formula|synthesis|3d|\bvdw\b|ball_and_stick/i

function isStructureTitle(title: string): boolean {
  if (CHART_RE.test(title)) return false
  // Bare drug-name SVGs ("Quinapril.svg") are structures too.
  if (title.toLowerCase().endsWith('.svg') && !/chart|graph|map|plot|logo|icon|flag/i.test(title)) return true
  return STRUCTURE_RE.test(title)
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const md5 = (s: string) => createHash('md5').update(s).digest('hex')

interface StructureHit {
  imageUrl: string
  thumbUrl: string
  pageUrl: string
  title: string
  author: string
  license: string
  licenseUrl: string
  mime: string
}

async function searchStructures(genericName: string): Promise<StructureHit[]> {
  // Salt suffixes hurt search ("ERTAPENEM SODIUM" misses "Ertapenem.svg") —
  // query each base component separately, first hit wins.
  const components = componentWords(genericName)
  const queries = components.length > 0 ? components : [genericName]

  for (const q of queries) {
    const url = new URL('https://commons.wikimedia.org/w/api.php')
    url.searchParams.set('action', 'query')
    url.searchParams.set('format', 'json')
    url.searchParams.set('formatversion', '2')
    url.searchParams.set('generator', 'search')
    url.searchParams.set('gsrsearch', q)
    url.searchParams.set('gsrnamespace', '6')
    url.searchParams.set('gsrlimit', '10')
    url.searchParams.set('prop', 'imageinfo')
    url.searchParams.set('iiprop', 'url|mime|extmetadata')
    url.searchParams.set('maxlag', '5')

    const res = await fetchWithRetry(url)
    const data = await res.json()
    const pages = (data?.query?.pages || []) as any[]

    const hits: StructureHit[] = []
    for (const page of pages) {
      const ii = page.imageinfo?.[0]
      if (!ii) continue
      const mime = ii.mime || ''
      if (!ACCEPT_MIME.test(mime)) continue
      const title = page.title.replace(/^File:/, '')
      const license = (ii.extmetadata?.LicenseShortName?.value || 'Unknown').toString()
      if (!isLicenseAccepted(license)) continue
      if (!isTitleRelevant(title, genericName)) continue
      if (!isStructureTitle(title)) continue
      hits.push({
        imageUrl: ii.url,
        thumbUrl: ii.thumburl || ii.url,
        pageUrl: ii.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
        title,
        author: (ii.extmetadata?.Artist?.value || 'Unknown').toString(),
        license,
        licenseUrl: (ii.extmetadata?.LicenseUrl?.value || '').toString(),
        mime,
      })
    }
    if (hits.length > 0) {
      // Prefer explicit structure diagrams over bare-name SVGs
      hits.sort((a, b) => Number(STRUCTURE_RE.test(b.title)) - Number(STRUCTURE_RE.test(a.title)))
      return hits
    }
  }
  return []
}

async function main() {
  const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  })
  const state = loadState()
  const failed = [...state.failed_drugs]
  if (failed.length === 0) {
    console.log('[fallback] no failed drugs to process')
    return
  }

  const { data: drugs, error } = await admin
    .from('drug_monographs')
    .select('id, generic_name, name')
    .in('id', failed)
  if (error || !drugs) throw new Error(`fetch drugs: ${error?.message}`)

  const byId = new Map(drugs.map((d: any) => [d.id, d]))
  let covered = 0
  let empty = 0

  for (const id of failed) {
    const drug = byId.get(id)
    const genericName = drug?.generic_name || drug?.name
    if (!genericName) continue

    try {
      const hits = await searchStructures(genericName)
      const rows = []
      for (const hit of hits.slice(0, LIMIT_PER_DRUG)) {
        rows.push({
          drug_id: id,
          generic_name: genericName,
          dosage_form: 'structure',
          strength: '',
          image_url: hit.imageUrl,
          thumbnail_url: hit.thumbUrl,
          large_url: hit.imageUrl,
          medium_url: hit.thumbUrl,
          source: 'Wikimedia Commons (structure)',
          license: hit.license,
          license_url: hit.licenseUrl,
          author: hit.author,
          page_url: hit.pageUrl,
          hash: md5(hit.imageUrl),
          quality_score: 35,
        })
      }

      if (rows.length > 0) {
        const { error: insErr } = await admin.from('drug_images').insert(rows)
        if (insErr) throw new Error(`insert: ${insErr.message}`)
        state.crawled_drugs.push(id)
        covered++
        console.log(`[ok] ${genericName} +${rows.length} (${rows[0].mime || 'structure'})`)
      } else {
        empty++
        console.log(`[none] ${genericName} — no structure images found`)
      }
    } catch (e: any) {
      console.log(`[err] ${genericName}: ${e.message}`)
    }

    // Always remove from failed_drugs (found or not — nothing else to try here)
    state.failed_drugs = state.failed_drugs.filter((x) => x !== id)
    saveState(state)
    await sleep(DELAY_MS)
  }

  console.log(`[done] covered=${covered} empty=${empty} crawled_total=${state.crawled_drugs.length} failed_remaining=${state.failed_drugs.length}`)
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
