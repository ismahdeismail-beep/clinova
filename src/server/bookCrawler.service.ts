/**
 * Book / reference crawler that ingests curated library sources into Supermemory.
 *
 * - Uses Firecrawl (/v1/scrape) when FIRECRAWL_API_KEY is set for robust JS-rendered
 *   extraction; otherwise falls back to a plain fetch + naive markdown strip.
 * - Splits extracted text into ~800-char passages and stores each in Supermemory under
 *   the `clinova-library` category with source metadata.
 * - Everything is guarded: if no Supermemory key, steps are skipped gracefully.
 */

import { addMemory, searchMemories, isSupermemoryConfigured, LIBRARY_CATEGORY } from './supermemory.service.js'

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || ''
const FIRECRAWL_BASE = process.env.FIRECRAWL_BASE_URL || 'https://api.firecrawl.dev/v1'

export interface LibrarySource {
  id: string
  title: string
  url?: string
  authors?: string
  type?: string
  subject?: string
}

function chunkText(text: string, max = 800): string[] {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return [clean]
  const chunks: string[] = []
  for (let i = 0; i < clean.length; i += max) {
    chunks.push(clean.slice(i, i + max))
  }
  return chunks
}

async function fetchContent(url: string): Promise<string> {
  if (FIRECRAWL_API_KEY) {
    try {
      const res = await fetch(`${FIRECRAWL_BASE}/scrape`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true }),
      })
      if (res.ok) {
        const data = (await res.json().catch(() => ({}))) as { data?: { markdown?: string } }
        if (data.data?.markdown) return data.data.markdown
      }
      console.warn(`[bookCrawler] Firecrawl scrape failed ${res.status}; falling back to fetch`)
    } catch (err) {
      console.warn('[bookCrawler] Firecrawl error; falling back to fetch:', err)
    }
  }

  const res = await fetch(url, { headers: { 'User-Agent': 'ClinovaBot/1.0' } })
  if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`)
  const html = await res.text()
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
  return text
}

export interface CrawlResult {
  sourceId: string
  passages: number
  stored: number
  skipped: boolean
}

export async function crawlSource(source: LibrarySource): Promise<CrawlResult> {
  const skipped = !isSupermemoryConfigured() || !source.url
  if (skipped) {
    return { sourceId: source.id, passages: 0, stored: 0, skipped: true }
  }
  try {
    const raw = await fetchContent(source.url as string)
    const passages = chunkText(raw)
    let stored = 0
    for (let i = 0; i < passages.length; i++) {
      const id = await addMemory({
        text: `Source: ${source.title}${source.authors ? ` (${source.authors})` : ''}. ${passages[i]}`,
        category: LIBRARY_CATEGORY,
        metadata: { sourceId: source.id, title: source.title, url: source.url, type: source.type, subject: source.subject, part: i },
      })
      if (id) stored++
    }
    return { sourceId: source.id, passages: passages.length, stored, skipped: false }
  } catch (err) {
    console.warn(`[bookCrawler] crawl failed for ${source.id}:`, err)
    return { sourceId: source.id, passages: 0, stored: 0, skipped: false }
  }
}

export async function crawlMany(sources: LibrarySource[]): Promise<CrawlResult[]> {
  const results: CrawlResult[] = []
  for (const s of sources) results.push(await crawlSource(s))
  return results
}

export async function searchLibrary(query: string, limit = 5) {
  return searchMemories(query, limit)
}
