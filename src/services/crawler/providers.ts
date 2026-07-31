// Medicine image provider modules — search approved sources for licensed medicine images.
// Each provider returns metadata only (no download). License verification happens in the crawler.
import { type DrugImage } from '../../types/crawler'

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
// Uses the MediaWiki API: search for files, then get imageinfo for metadata.
export async function searchWikimedia(query: string, limit = 10): Promise<ProviderResult[]> {
  const results: ProviderResult[] = []
  try {
    // Step 1: search for image files matching the query
    const searchUrl = new URL('https://commons.wikimedia.org/w/api.php')
    searchUrl.searchParams.set('action', 'query')
    searchUrl.searchParams.set('format', 'json')
    searchUrl.searchParams.set('list', 'search')
    searchUrl.searchParams.set('srsearch', `${query} filetype:bitmap`)
    searchUrl.searchParams.set('srnamespace', '6') // File namespace
    searchUrl.searchParams.set('srlimit', String(limit))
    searchUrl.searchParams.set('srprop', '')

    const searchRes = await fetch(searchUrl.toString())
    const searchData = await searchRes.json()
    const pages = searchData?.query?.search || []

    // Step 2: for each result, get imageinfo
    for (const page of pages) {
      const title = page.title // e.g. "File:Amoxicillin 500mg tablets.jpg"
      const imageUrl = await getWikimediaImageInfo(title)
      if (imageUrl) results.push(imageUrl)
    }
  } catch (e) {
    console.error('[Wikimedia] search failed:', e)
  }
  return results
}

async function getWikimediaImageInfo(fileTitle: string): Promise<ProviderResult | null> {
  try {
    const url = new URL('https://commons.wikimedia.org/w/api.php')
    url.searchParams.set('action', 'query')
    url.searchParams.set('format', 'json')
    url.searchParams.set('titles', fileTitle)
    url.searchParams.set('prop', 'imageinfo')
    url.searchParams.set('iiprop', 'url|metadata|extmetadata')
    url.searchParams.set('iiurlwidth', '800')
    url.searchParams.set('iiurlheight', '800')

    const res = await fetch(url.toString())
    const data = await res.json()
    const pages = data?.query?.pages || {}
    const page = Object.values(pages)[0] as any
    if (!page?.imageinfo?.[0]) return null

    const ii = page.imageinfo[0]
    const license = (ii.extmetadata?.LicenseShortName?.value || ii.extmetadata?.LicenseShortName?.value || 'Unknown').toString()
    const author = (ii.extmetadata?.Artist?.value || 'Unknown').toString()
    const licenseUrl = (ii.extmetadata?.LicenseShortName?.value || ii.extmetadata?.LicenseUrl?.value || '').toString()

    return {
      imageUrl: ii.url,
      thumbnailUrl: ii.thumburl || ii.url,
      pageUrl: ii.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle)}`,
      title: fileTitle.replace(/^File:/, ''),
      author,
      license,
      licenseUrl,
      source: 'Wikimedia Commons',
      width: ii.extmetadata?.ImageWidth ? Number(ii.extmetadata.ImageWidth.value) : undefined,
      height: ii.extmetadata?.ImageHeight ? Number(ii.extmetadata.ImageHeight.value) : undefined,
    }
  } catch (e) {
    return null
  }
}

// ── Open-i (National Library of Medicine) ──────────────────────────
export async function searchOpenI(query: string, limit = 10): Promise<ProviderResult[]> {
  const results: ProviderResult[] = []
  try {
    const url = new URL('https://openi.nlm.nih.gov/api/search')
    url.searchParams.set('query', query)
    url.searchParams.set('it', 'i') // images
    url.searchParams.set('m', String(limit))

    const res = await fetch(url.toString())
    const data = await res.json()
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

    const res = await fetch(url.toString())
    const data = await res.json()
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

    const res = await fetch(url.toString())
    const data = await res.json()
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
export const PROVIDERS = [
  { name: 'Wikimedia Commons', fn: searchWikimedia, priority: 1 },
  { name: 'Open-i (NLM)', fn: searchOpenI, priority: 2 },
  { name: 'NIH Image Gallery', fn: searchNIH, priority: 3 },
  { name: 'NCI Visuals Online', fn: searchNCI, priority: 4 },
] as const

export type ProviderFn = (query: string, limit?: number) => Promise<ProviderResult[]>
