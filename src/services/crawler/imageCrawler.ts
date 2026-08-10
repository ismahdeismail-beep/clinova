// Main medicine image crawler — orchestrates search, download, validation, dedup, optimize, upload.
import { adminSupabase } from '../../server/adminClient'
import {
  PROVIDERS,
  type ProviderResult,
  isLicenseAccepted,
} from './providers'
import {
  downloadImage,
  downloadDelay,
  validateImage,
  hammingDistance,
  optimizeImage,
  scoreQuality,
} from './imageProcessor'
import { loadState, saveState } from './state'
import { brandNamesFor, isTitleRelevant, isWeakRelevant } from './kenyanBrands'
import { kenyanBrandImagesFor } from './kenyanBrandImages'
import { politeDelay } from './providers'

const DOSAGE_FORMS = [
  'tablet', 'capsule', 'suspension', 'injection', 'vial', 'inhaler',
  'cream', 'ointment', 'eye drops', 'syrup', 'powder', 'implant',
]

const QUICK_FORMS = ['tablet', 'capsule', 'injection', 'syrup']

const STORAGE_BUCKET = 'medicine-images'

// ── Image-kind classification (diversity) ──────────────────────────
// Galleries should mix kinds — packaging (box/vial/label), product (tablets/
// gel/cream…), 3D structure — instead of piling up N copies of one kind.
// Diagram (journal synthesis/pathway/mechanism figures) is never drug imagery.
const IMAGE_KIND_RE: Record<string, RegExp> = {
  diagram:
    /(synthesis|pathway|mechanism|scheme|reaction|reactions|metabolic|biosynth|figure|degradation|schematic|metabolism)/i,
  packaging:
    /\b(pack|packaging|box|vial|bottle|blister|strip|label|carton|tube|sachet|ampoule|ampule|inhaler|pen|jar|tin|syringe|prefilled|dispenser|dropper|container)\b/i,
  product:
    /(\b(tablet|tablets|tab|capsule|capsules|gel|cream|ointment|syrup|suspension|solution|drops|spray|injection|suppository|patch|lozenge|granules|powder|pill|pills|effervescent|tablets)\b|\b\d+\s?(mg|mcg|ml|g|iu|units?)\b)/i,
  structure:
    /(3d|ball.?and.?stick|skeletal|vdw|van.?der.?waals|space.?fill|molecule|molecular|chemical structure|formula|conformer|render|model)/i,
}

function kindOfTitle(title: string, source: string, pageUrl = ''): string {
  const t = `${pageUrl} ${title || ''}`.toLowerCase()
  if ((source || '').includes('structure')) return 'structure'
  if (IMAGE_KIND_RE.diagram.test(t)) return 'diagram'
  if (IMAGE_KIND_RE.packaging.test(t)) return 'packaging'
  if (IMAGE_KIND_RE.product.test(t)) return 'product'
  if (IMAGE_KIND_RE.structure.test(t)) return 'structure'
  return 'unknown'
}

export { kindOfTitle }

// Max images of the SAME kind per gallery (keeps the mix box/product/structure).
const MAX_PER_KIND = Number(process.env.CRAWL_MAX_PER_KIND || '2')

function setidOf(pageUrl: string): string | null {
  return pageUrl.match(/setid=([0-9a-f-]+)/i)?.[1] || null
}

// ── Generate search queries for a medicine ─────────────────────────
// Wikimedia search chokes on parens/slashes/plus signs — "Insulin
// (Regular/Soluble)" returns 0 while "insulin regular" matches. Queries are
// built from clean tokens (letters/numbers only), with Kenyan-market brands
// first — real-world packaging photos are preferred.
export function generateSearchQueries(genericName: string, dosageForms?: string[]): string[] {
  const forms = process.env.CRAWL_NO_FORMS === '1' ? [] : dosageForms?.length ? dosageForms : QUICK_FORMS
  const queries: string[] = []
  // Salt/ester words (phosphate, sodium, fumarate…) pollute Wikimedia searches
  // ("tedizolid phosphate" hits 0 while "tedizolid" matches). Strip them when
  // building the name query but keep the full name for title-relevance checks.
  const SALT_STOP = new Set([
    'sodium', 'potassium', 'calcium', 'hydrochloride', 'dihydrochloride',
    'sulfate', 'sulphate', 'acetate', 'citrate', 'fumarate', 'maleate',
    'phosphate', 'diphosphate', 'monohydrate', 'dihydrate', 'trihydrate',
    'proxetil', 'oxide', 'tartrate', 'succinate', 'carbonate', 'nitrate',
    'mesylate', 'tosylate', 'isethionate', 'tromethamine', 'meglumine', 'medocaril',
    'embonate', 'pamoate', 'bromide',
  ])
  const tokens = [...new Set(
    (genericName || '')
      .toLowerCase()
      .replace(/[^a-z0-9 ]+/g, ' ')
      .replace(/\s+/g, ' ')
      .split(' ')
      .filter((t) => t.length >= 4 && !SALT_STOP.has(t)),
  )]
  const short = tokens.slice(0, 3).join(' ')
  if (!short) return queries
  // Kenyan-market brands first — real-world packaging photos are preferred.
  // Brand-only queries (e.g. "Insulatard", "Actrapid") find the actual product
  // photos; the title-relevance filter rejects any junk they also return.
  for (const brand of brandNamesFor(genericName)) {
    queries.push(brand)
  }
  if (forms.length > 0) {
    for (const form of forms) {
      queries.push(`${short} ${form}`)
    }
  }
  // Plain name matches the most on Wikimedia (form-suffixed queries often hit zero).
  queries.push(short)
  return queries
}

// ── Run a promise with a hard timeout ──────────────────────────────
async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  let timer: NodeJS.Timeout
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('provider timeout')), ms)
  })
  try {
    return await Promise.race([p, timeout])
  } finally {
    clearTimeout(timer!)
  }
}

// ── Search all providers for a query ───────────────────────────────
// Wikimedia runs first; the fallback providers (DailyMed/FDA) are consulted by
// the crawler only when a query's Wikimedia results under-deliver, so NLM is
// never hammered for drugs that Wikimedia already fills.
async function searchAllProviders(query: string): Promise<ProviderResult[]> {
  return withTimeout(
    PROVIDERS[0].fn(query, 10).catch((e: any) => {
      console.error(`[${PROVIDERS[0].name}] search failed for "${query}":`, e?.message ?? e)
      return [] as ProviderResult[]
    }),
    20000,
  )
}

// ── Search fallback providers (DailyMed/FDA) for a query ───────────
async function searchFallbackProviders(query: string): Promise<ProviderResult[]> {
  const settled = await Promise.allSettled(
    PROVIDERS.slice(1).map((provider) =>
      withTimeout(
        provider.fn(query, 10).catch((e: any) => {
          console.error(`[${provider.name}] search failed for "${query}":`, e?.message ?? e)
          return [] as ProviderResult[]
        }),
        20000,
      ),
    ),
  )
  return settled.flatMap((s) => (s.status === 'fulfilled' ? s.value : ([] as ProviderResult[])))
}

// ── Check if image is duplicate ────────────────────────────────────
async function isDuplicate(hash: string, existingHashes: Set<string>): Promise<boolean> {
  for (const existing of existingHashes) {
    if (hammingDistance(hash, existing) < 5) return true
  }
  return false
}

// ── Upload optimized images to Supabase Storage ────────────────────
export async function uploadImages(
  genericName: string,
  dosageForm: string,
  strength: string,
  optimized: { original: Buffer; large: Buffer; medium: Buffer; thumbnail: Buffer; hash: string },
): Promise<{ image_url: string; thumbnail_url: string; large_url: string; medium_url: string }> {
  if (!adminSupabase) throw new Error('Supabase admin client not configured')

  const safeName = `${genericName}-${dosageForm}-${strength}`.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  const ts = Date.now()

  const uploads = [
    { path: `${genericName}/${dosageForm}/${safeName}_${ts}.webp`, buf: optimized.original, key: 'image_url' },
    { path: `${genericName}/${dosageForm}/${safeName}_large_${ts}.webp`, buf: optimized.large, key: 'large_url' },
    { path: `${genericName}/${dosageForm}/${safeName}_medium_${ts}.webp`, buf: optimized.medium, key: 'medium_url' },
    { path: `${genericName}/${dosageForm}/${safeName}_thumb_${ts}.webp`, buf: optimized.thumbnail, key: 'thumbnail_url' },
  ]

  const urls: Record<string, string> = {}
  // Upload the 4 sizes in parallel — storage puts are independent.
  const results = await Promise.all(
    uploads.map(async ({ path, buf, key }) => {
      const { error } = await adminSupabase!.storage
        .from(STORAGE_BUCKET)
        .upload(path, buf, { contentType: 'image/webp', upsert: false })
      if (error) throw error
      const { data: { publicUrl } } = adminSupabase!.storage.from(STORAGE_BUCKET).getPublicUrl(path)
      return { key, publicUrl }
    }),
  )
  for (const { key, publicUrl } of results) urls[key] = publicUrl

  return {
    image_url: urls.image_url,
    thumbnail_url: urls.thumbnail_url,
    large_url: urls.large_url,
    medium_url: urls.medium_url,
  }
}

// ── Insert image record into drug_images table ─────────────────────
export async function insertImageRecord(drugId: string, img: {
  generic_name: string
  dosage_form: string
  strength: string
  image_url: string
  thumbnail_url: string
  large_url: string
  medium_url: string
  source: string
  license: string
  license_url: string
  author: string
  page_url: string
  hash: string
  quality_score: number
}): Promise<void> {
  if (!adminSupabase) throw new Error('Supabase admin client not configured')

  const { error } = await adminSupabase.from('drug_images').insert({
    drug_id: drugId,
    generic_name: img.generic_name,
    dosage_form: img.dosage_form,
    strength: img.strength,
    image_url: img.image_url,
    thumbnail_url: img.thumbnail_url,
    large_url: img.large_url,
    medium_url: img.medium_url,
    source: img.source,
    license: img.license,
    license_url: img.license_url,
    author: img.author,
    page_url: img.page_url,
    hash: img.hash,
    verified: false,
    quality_score: img.quality_score,
    rejection_reason: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
}

// ── Crawl a single drug ────────────────────────────────────────────
export async function crawlDrug(
  drugId: string,
  genericName: string,
  dosageForms?: string[],
  strength = '',
  existingHashes: Set<string> = new Set(),
  existingCount = 0,
): Promise<{ found: number; accepted: number; rejected: number; failures: string[] }> {
  const stats = { found: 0, accepted: 0, rejected: 0, failures: [] as string[] }
  const weakCandidates: ProviderResult[] = []
  const queries = generateSearchQueries(genericName, dosageForms)
  const MAX_IMAGES_PER_DRUG = Number(process.env.CRAWL_MAX_IMAGES || '4')
  // Cap on TOTAL gallery size (existing + new), not just new additions.
  const remaining = Math.max(0, MAX_IMAGES_PER_DRUG - existingCount)
  // Kind-diversity bookkeeping: how many of each kind accepted so far, and
  // which DailyMed label pages (setid) already contributed.
  const acceptedKinds = new Map<string, number>()
  const acceptedSetIds = new Set<string>()
  const budgetOk = (kind: string, setid: string | null): boolean => {
    if (kind === 'diagram') return false
    if (setid && acceptedSetIds.has(setid)) return false
    return (acceptedKinds.get(kind) || 0) < MAX_PER_KIND
  }
  const acceptKind = (kind: string, setid: string | null) => {
    acceptedKinds.set(kind, (acceptedKinds.get(kind) || 0) + 1)
    if (setid) acceptedSetIds.add(setid)
  }

  // Kenyan-market brand packaging is the highest-value content for learners
  // (they recognize local products), so it always reserves slots and is
  // inserted LAST — newest created_at → appears first in the gallery.
  const keImages = kenyanBrandImagesFor(genericName)
  const keSlots = Math.min(keImages.length, remaining)
  const webBudget = remaining - keSlots

  // Shared processing: download → validate → dedup → optimize → upload → insert.
  // Returns true when the image was accepted (and stored).
  const processResult = async (result: ProviderResult): Promise<boolean> => {
    const kind = kindOfTitle(result.title, result.source, result.pageUrl)
    const setid = setidOf(result.pageUrl || '')
    if (!budgetOk(kind, setid)) {
      stats.rejected++
      return false
    }
    try {
      await downloadDelay() // pace downloads — upload.wikimedia.org throttles bursts
      const buf = await downloadImage(result.imageUrl)
      const validation = await validateImage(buf)
      if (!validation.valid) {
        stats.rejected++
        return false
      }

      const optimized = await optimizeImage(buf)
      if (await isDuplicate(optimized.hash, existingHashes)) {
        stats.rejected++
        return false
      }
      existingHashes.add(optimized.hash)

      const form = DOSAGE_FORMS.find((f) => result.title.toLowerCase().includes(f)) || 'unknown'
      const urls = await uploadImages(genericName, form, strength, optimized)

      await insertImageRecord(drugId, {
        generic_name: genericName,
        dosage_form: form,
        strength,
        image_url: urls.image_url,
        thumbnail_url: urls.thumbnail_url,
        large_url: urls.large_url,
        medium_url: urls.medium_url,
        source: result.source,
        license: result.license,
        license_url: result.licenseUrl,
        author: result.author,
        page_url: result.pageUrl,
        hash: optimized.hash,
        quality_score: scoreQuality(validation.width, validation.height, validation.format),
      })

      stats.accepted++
      acceptKind(kind, setid)
      return true
    } catch (e: any) {
      stats.failures.push(`${result.source}/${result.title}: ${e.message}`)
      return false
    }
  }

  for (const query of queries) {
    if (stats.accepted >= webBudget) break
    const results = await searchAllProviders(query)
    stats.found += results.length

    for (const result of results) {
      if (stats.accepted >= webBudget) break
      if (!isLicenseAccepted(result.license)) {
        stats.rejected++
        continue
      }
      // Wikimedia search is fuzzy — keep only results that name the drug
      // (or a brand); stash the rest as weak fallback candidates.
      if (isTitleRelevant(result.title, genericName)) {
        await processResult(result)
      } else {
        weakCandidates.push(result)
      }
    }

    // Fallback tier: if Wikimedia under-delivered for this query, consult the
    // secondary providers (DailyMed/FDA). Same acceptance pipeline as above.
    if (stats.accepted < webBudget) {
      const fallbacks = await searchFallbackProviders(query)
      stats.found += fallbacks.length
      for (const result of fallbacks) {
        if (stats.accepted >= webBudget) break
        if (!isLicenseAccepted(result.license)) {
          stats.rejected++
          continue
        }
        if (isTitleRelevant(result.title, genericName)) {
          await processResult(result)
        } else {
          weakCandidates.push(result)
        }
      }
    }

    // Be polite to Wikimedia between queries (burst limiter returns 429).
    if (queries.length > 1) await politeDelay()
  }

  // Weak fallback tier: no titled matches at all — accept license-clean
  // generic medicine imagery (medicine-worded titles only, never junk like
  // scenery photos) so every monograph still gets an image. Skipped when a
  // curated Kenyan-brand image is available — that already fills the gallery.
  if (stats.accepted === 0 && webBudget > 0 && keSlots === 0) {
    const seen = new Set<string>()
    for (const result of weakCandidates) {
      if (stats.accepted >= remaining) break
      if (seen.has(result.imageUrl)) continue
      seen.add(result.imageUrl)
      if (!isWeakRelevant(result.title)) continue
      if (await processResult(result)) break
    }
  }

  // Kenyan-market brand tier — curated, verified local packaging (Lab & Allied).
  // Inserted last so it sorts first in the gallery (created_at DESC).
  let keAdded = 0
  for (const img of keImages) {
    if (stats.accepted >= remaining || keAdded >= keSlots) break
    if (!budgetOk('packaging', null)) {
      stats.rejected++
      continue
    }
    try {
      await downloadDelay()
      const buf = await downloadImage(img.imageUrl)
      const validation = await validateImage(buf)
      if (!validation.valid) {
        stats.rejected++
        continue
      }
      const optimized = await optimizeImage(buf)
      if (await isDuplicate(optimized.hash, existingHashes)) {
        stats.rejected++
        continue
      }
      existingHashes.add(optimized.hash)
      const urls = await uploadImages(genericName, 'unknown', strength, optimized)
      await insertImageRecord(drugId, {
        generic_name: genericName,
        dosage_form: 'unknown',
        strength,
        image_url: urls.image_url,
        thumbnail_url: urls.thumbnail_url,
        large_url: urls.large_url,
        medium_url: urls.medium_url,
        source: 'Kenyan brand (Lab & Allied)',
        license: 'Manufacturer marketing image (educational use)',
        license_url: 'https://www.laballied.com',
        author: 'Laboratory & Allied Ltd',
        page_url: img.imageUrl,
        hash: optimized.hash,
        quality_score: scoreQuality(validation.width, validation.height, validation.format),
      })
      stats.accepted++
      acceptKind('packaging', null)
      keAdded++
    } catch (e: any) {
      stats.failures.push(`${img.brand}: ${e.message}`)
    }
  }

  return stats
}

// ── Crawl all missing drugs ────────────────────────────────────────
export async function crawlAllMissing(): Promise<{
  medicines_searched: number
  images_found: number
  images_accepted: number
  images_rejected: number
  duplicates_removed: number
  failures: string[]
  coverage_percentage: number
}> {
  if (!adminSupabase) throw new Error('Supabase admin client not configured')

  const state = loadState()
  const report = {
    medicines_searched: 0,
    images_found: 0,
    images_accepted: 0,
    images_rejected: 0,
    duplicates_removed: 0,
    failures: [] as string[],
    coverage_percentage: 0,
  }

  const { data: drugs, error: drugErr } = await adminSupabase
    .from('drug_monographs')
    .select('id, generic_name, name')
    .limit(5000)

  if (drugErr || !drugs) {
    throw new Error(`Failed to fetch drugs: ${drugErr?.message}`)
  }

  const { data: existing } = await adminSupabase
    .from('drug_images')
    .select('hash')
    .limit(50000)
  const existingHashes = new Set((existing || []).map((r: any) => r.hash as string).filter(Boolean))

  // Paginate past Supabase's 1000-row response cap so every existing hash is
  // seen — otherwise a second crawl pass re-inserts the same images.
  {
    let from = 1000
    for (let i = 0; i < 60; i++) {
      const { data: more } = await adminSupabase.from('drug_images').select('hash').range(from, from + 999)
      if (!more || more.length === 0) break
      for (const r of more) if (r.hash) existingHashes.add(r.hash as string)
      from += 1000
    }
  }

  const drugsToCrawl = drugs.filter((d: any) => !state.crawled_drugs.includes(d.id))

  for (const drug of drugsToCrawl) {
    const genericName = drug.generic_name || drug.name
    if (!genericName) continue

    state.pending_drugs.push(drug.id)
    saveState(state)

    try {
      const stats = await crawlDrug(drug.id, genericName, undefined, '', existingHashes)
      report.medicines_searched++
      report.images_found += stats.found
      report.images_accepted += stats.accepted
      report.images_rejected += stats.rejected
      report.failures.push(...stats.failures)

      if (stats.accepted > 0) {
        state.crawled_drugs.push(drug.id)
      } else {
        state.failed_drugs.push(drug.id)
      }
      saveState(state)
    } catch (e: any) {
      report.failures.push(`${drug.id}: ${e.message}`)
      state.failed_drugs.push(drug.id)
      saveState(state)
    }
  }

  const { data: drugsWithImg } = await adminSupabase
    .from('drug_images')
    .select('drug_id')
    .limit(10000)
  const coveredDrugs = new Set((drugsWithImg || []).map((r: any) => r.drug_id))
  report.coverage_percentage = drugs.length > 0 ? (coveredDrugs.size / drugs.length) * 100 : 0

  state.last_crawl = new Date().toISOString()
  state.run_count = state.run_count + 1
  state.pending_drugs = []
  saveState(state)

  return report
}
