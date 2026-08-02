// Main medicine image crawler — orchestrates search, download, validation, dedup, optimize, upload.
import { adminSupabase } from '../../server/adminClient'
import { type DrugImage } from '../../types/crawler'
import {
  PROVIDERS,
  type ProviderResult,
  isLicenseAccepted,
} from './providers'
import {
  downloadImage,
  downloadDelay,
  validateImage,
  computeDHash,
  hammingDistance,
  optimizeImage,
  scoreQuality,
  md5,
} from './imageProcessor'
import { type CrawlerState, loadState, saveState } from './state'
import { brandNamesFor, isTitleRelevant, isWeakRelevant } from './kenyanBrands'
import { politeDelay } from './providers'

const DOSAGE_FORMS = [
  'tablet', 'capsule', 'suspension', 'injection', 'vial', 'inhaler',
  'cream', 'ointment', 'eye drops', 'syrup', 'powder', 'implant',
]

const QUICK_FORMS = ['tablet', 'capsule', 'injection', 'syrup']

const STORAGE_BUCKET = 'medicine-images'

// ── Generate search queries for a medicine ─────────────────────────
export function generateSearchQueries(genericName: string, dosageForms?: string[]): string[] {
  const forms = process.env.CRAWL_NO_FORMS === '1' ? [] : dosageForms?.length ? dosageForms : QUICK_FORMS
  const queries: string[] = []
  // Kenyan-market brands first — real-world packaging photos are preferred.
  for (const brand of brandNamesFor(genericName)) {
    queries.push(`${brand} ${genericName}`)
  }
  if (forms.length > 0) {
    for (const form of forms) {
      queries.push(`${genericName} ${form}`)
    }
  }
  // Plain name matches the most on Wikimedia (form-suffixed queries often hit zero).
  queries.push(genericName)
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

// ── Search all providers for a query (in parallel) ─────────────────
async function searchAllProviders(query: string): Promise<ProviderResult[]> {
  const settled = await Promise.allSettled(
    PROVIDERS.map((provider) =>
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
async function uploadImages(
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
async function insertImageRecord(drugId: string, img: {
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
): Promise<{ found: number; accepted: number; rejected: number; failures: string[] }> {
  const stats = { found: 0, accepted: 0, rejected: 0, failures: [] as string[] }
  const weakCandidates: ProviderResult[] = []
  const queries = generateSearchQueries(genericName, dosageForms)
  const MAX_IMAGES_PER_DRUG = Number(process.env.CRAWL_MAX_IMAGES || '4')

  // Shared processing: download → validate → dedup → optimize → upload → insert.
  // Returns true when the image was accepted (and stored).
  const processResult = async (result: ProviderResult): Promise<boolean> => {
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
      return true
    } catch (e: any) {
      stats.failures.push(`${result.source}/${result.title}: ${e.message}`)
      return false
    }
  }

  for (const query of queries) {
    if (stats.accepted >= MAX_IMAGES_PER_DRUG) break
    const results = await searchAllProviders(query)
    stats.found += results.length

    for (const result of results) {
      if (stats.accepted >= MAX_IMAGES_PER_DRUG) break
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

    // Be polite to Wikimedia between queries (burst limiter returns 429).
    if (queries.length > 1) await politeDelay()
  }

  // Weak fallback tier: no titled matches at all — accept license-clean
  // generic medicine imagery (medicine-worded titles only, never junk like
  // scenery photos) so every monograph still gets an image.
  if (stats.accepted === 0) {
    const seen = new Set<string>()
    for (const result of weakCandidates) {
      if (stats.accepted >= MAX_IMAGES_PER_DRUG) break
      if (seen.has(result.imageUrl)) continue
      seen.add(result.imageUrl)
      if (!isWeakRelevant(result.title)) continue
      if (await processResult(result)) break
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
    .limit(10000)
  const existingHashes = new Set((existing || []).map((r: any) => r.hash as string).filter(Boolean))

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
