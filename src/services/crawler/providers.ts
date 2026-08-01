// Medicine image provider modules — search approved sources for licensed medicine images.
// Each provider returns metadata only (no download). License verification happens in the crawler.
import { type DrugImage } from '../../types/crawler'

const FETCH_TIMEOUT_MS = 12000

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.json()
}

// ── Wikimedia politeness (maxlag + Retry-After + burst backoff) ────
// The Wikimedia burst limiter returns 429 when requests fire too fast; the
// seeder hit this too, so keep delays and jitter generous.
const BASE_DELAY_MS = Number(process.env.CRAWL_DELAY_MS || '2500')

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

export function politeDelay(): Promise<void> {
  const jitter = Math.floor(Math.random() * 2000)
  return sleep(BASE_DELAY_MS + jitter)
}

function parseRetryAfter(header: string | null): number {
  if (!header) return 0
  const seconds = Number(header)
  if (Number.isFinite(seconds)) return Math.min(seconds, 120)
  const when = Date.parse(header)
  if (Number.isFinite(when)) return Math.min(Math.max(Math.ceil((when - Date.now()) / 1000), 0), 120)
  return 0
}

// Self-contained fetch with retry/backoff that respects Retry-After + maxlag waits.
export async function fetchWithRetry(url: URL, timeoutMs = FETCH_TIMEOUT_MS): Promise<any> {
  let lastErr: Error | null = null
  for (let attempt = 0; attempt < 6; attempt++) {
    let res: Response
    try {
      res = await fetch(url.toString(), {
        signal: AbortSignal.timeout(timeoutMs),
        headers: {
          'User-Agent': 'ClinovaBot/1.0 (educational project; contact admin@clinova.example)',
          'Accept': 'application/json',
        },
      })
    } catch (e: any) {
      lastErr = e
      await sleep(3000 * (attempt + 1))
      continue
    }

    if (res.status === 429) {
      const waitMs = parseRetryAfter(res.headers.get('retry-after')) * 1000 || 15000 * (attempt + 1)
      console.log(`  [429] rate limited — waiting ${Math.round(waitMs / 1000)}s (attempt ${attempt + 1}/6)`)
      await sleep(waitMs)
      continue
    }

    // Wikimedia maxlag: 503 "Waiting for X" — always retry, never counts as failure
    if (res.status === 503 && res.headers.get('retry-after')) {
      const waitMs = parseRetryAfter(res.headers.get('retry-after')) * 1000
      console.log(`  [503] maxlag wait — retrying in ${Math.round(waitMs / 1000)}s`)
      await sleep(waitMs)
      continue
    }

    if (!res.ok) {
      lastErr = new Error(`HTTP ${res.status}: ${(await res.text()).substring(0, 100)}`)
      if (res.status >= 500) {
        await sleep(3000 * (attempt + 1))
        continue
      }
      throw lastErr
    }

    return res
  }
  throw lastErr || new Error('All retries exhausted')
}

export interface ProviderResult {
  imageUrl: string
  thumbnailUrl: string
  pageUrl: string
  title: string
  author: string
  license: string
  licenseUrl: string
  source: string
  width?: number
  height?: number
  mimeType?: string
}

const ACCEPTED_LICENSES = [
  'public domain',
  'cc0',
  'cc by',
  'cc by-sa',
  'creative commons attribution',
  'creative commons attribution-sharealike',
]

export function isLicenseAccepted(license: string): boolean {
  const l = license.toLowerCase()
  return ACCEPTED_LICENSES.some((a) => l.includes(a))
}

// ── Wikimedia Commons ──────────────────────────────────────────────
// One API call per query via generator=search (imageinfo embedded), with
// filetype:bitmap so PDFs/SVGs never come back.
const RASTER_MIME = /^image\/(jpeg|png|gif|webp|tiff)$/

export async function searchWikimedia(query: string, limit = 10): Promise<ProviderResult[]> {
  const results: ProviderResult[] = []
  try {
    const url = new URL('https://commons.wikimedia.org/w/api.php')
    url.searchParams.set('action', 'query')
    url.searchParams.set('format', 'json')
    url.searchParams.set('formatversion', '2')
    url.searchParams.set('generator', 'search')
    url.searchParams.set('gsrsearch', `${query} filetype:bitmap`)
    url.searchParams.set('gsrnamespace', '6') // File namespace
    url.searchParams.set('gsrlimit', String(limit))
    url.searchParams.set('gsrprop', '')
    url.searchParams.set('prop', 'imageinfo')
    url.searchParams.set('iiprop', 'url|mime|extmetadata')
    url.searchParams.set('iiurlwidth', '800')
    url.searchParams.set('iiurlheight', '800')
    url.searchParams.set('maxlag', '5')

    const res = await fetchWithRetry(url)
    const data = await res.json()
    const pages = (data?.query?.pages || []).filter(
      (p: any) => Array.isArray(p.imageinfo) && p.imageinfo.length > 0,
    )

    for (const page of pages) {
      const ii = page.imageinfo[0]
      const mime = ii.mime || ''
      if (!RASTER_MIME.test(mime)) continue

      const license = (ii.extmetadata?.LicenseShortName?.value || 'Unknown').toString()
      results.push({
        imageUrl: ii.url,
        thumbnailUrl: ii.thumburl || ii.url,
        pageUrl: ii.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
        title: page.title.replace(/^File:/, ''),
        author: (ii.extmetadata?.Artist?.value || 'Unknown').toString(),
        license,
        licenseUrl: (ii.extmetadata?.LicenseUrl?.value || '').toString(),
        source: 'Wikimedia Commons',
        width: ii.extmetadata?.ImageWidth ? Number(ii.extmetadata.ImageWidth.value) : undefined,
        height: ii.extmetadata?.ImageHeight ? Number(ii.extmetadata.ImageHeight.value) : undefined,
        mimeType: mime,
      })
    }
  } catch (e) {
    console.error('[Wikimedia] search failed:', e)
  }
  return results
}

// ── Open-i (National Library of Medicine) ──────────────────────────
export async function searchOpenI(query: string, limit = 10): Promise<ProviderResult[]> {
  const results: ProviderResult[] = []
  try {
    const url = new URL('https://openi.nlm.nih.gov/api/search')
    url.searchParams.set('query', query)
    url.searchParams.set('it', 'i') // images
    url.searchParams.set('m', String(limit))

    const data = await fetchJson(url.toString())
    const images = data?.list?.img || []

    for (const img of images) {
      results.push({
        imageUrl: img.url || img.imageSrc,
        thumbnailUrl: img.thumbUrl || img.thumbnail,
        pageUrl: img.contentUrl || `https://openi.nlm.nih.gov/${img.id}`,
        title: img.title || img.name || query,
        author: img.author || 'National Library of Medicine',
        license: img.license || 'Public Domain',
        licenseUrl: img.licenseUrl || 'https://www.nlm.nih.gov/',
        source: 'Open-i (NLM)',
        width: img.width,
        height: img.height,
      })
    }
  } catch (e) {
    console.error('[Open-i] search failed:', e)
  }
  return results
}

// ── NIH Image Gallery ──────────────────────────────────────────────
export async function searchNIH(query: string, limit = 10): Promise<ProviderResult[]> {
  const results: ProviderResult[] = []
  try {
    const url = new URL('https://images.nih.gov/api/search')
    url.searchParams.set('q', query)
    url.searchParams.set('n', String(limit))

    const data = await fetchJson(url.toString())
    const items = data?.results || []

    for (const item of items) {
      results.push({
        imageUrl: item.image_url || item.url,
        thumbnailUrl: item.thumbnail_url || item.thumbnail || item.image_url,
        pageUrl: item.url || item.page_url,
        title: item.title || query,
        author: item.author || 'National Institutes of Health',
        license: item.license || 'Public Domain',
        licenseUrl: item.license_url || 'https://www.nih.gov/',
        source: 'NIH Image Gallery',
        width: item.width,
        height: item.height,
      })
    }
  } catch (e) {
    console.error('[NIH] search failed:', e)
  }
  return results
}

// ── National Cancer Institute (Visuals Online) ─────────────────────
export async function searchNCI(query: string, limit = 10): Promise<ProviderResult[]> {
  const results: ProviderResult[] = []
  try {
    const url = new URL('https://visualsonline.cancer.gov/api/search')
    url.searchParams.set('q', query)
    url.searchParams.set('n', String(limit))

    const data = await fetchJson(url.toString())
    const items = data?.results || []

    for (const item of items) {
      results.push({
        imageUrl: item.image_url || item.url,
        thumbnailUrl: item.thumbnail_url || item.thumbnail || item.image_url,
        pageUrl: item.url || item.page_url,
        title: item.title || query,
        author: item.author || 'National Cancer Institute',
        license: item.license || 'Public Domain',
        licenseUrl: item.license_url || 'https://visualsonline.cancer.gov/',
        source: 'NCI Visuals Online',
        width: item.width,
        height: item.height,
      })
    }
  } catch (e) {
    console.error('[NCI] search failed:', e)
  }
  return results
}

// ── Provider registry ──────────────────────────────────────────────
// NOTE: Open-i (NLM) was retired, and images.nih.gov + visualsonline.cancer.gov
// are decommissioned (DNS dead) — only Wikimedia Commons is operational, and it
// is the source of all currently stored drug_images. Adding new providers is
// safe; the crawler runs them in parallel with hard timeouts.
export const PROVIDERS = [
  { name: 'Wikimedia Commons', fn: searchWikimedia, priority: 1 },
] as const

export type ProviderFn = (query: string, limit?: number) => Promise<ProviderResult[]>
