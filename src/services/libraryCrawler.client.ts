export interface LibrarySourceInput {
  id: string
  title: string
  url?: string
  authors?: string
  type?: string
  subject?: string
}

export interface CrawlResult {
  sourceId: string
  passages: number
  stored: number
  skipped: boolean
}

export async function crawlLibrarySource(source: LibrarySourceInput): Promise<CrawlResult> {
  const res = await fetch('/api/library/crawl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || `Crawl failed (${res.status})`)
  }
  const data = await res.json()
  return data.result as CrawlResult
}

export async function crawlLibraryMany(sources: LibrarySourceInput[]): Promise<CrawlResult[]> {
  const res = await fetch('/api/library/crawl-many', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sources }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || `Crawl failed (${res.status})`)
  }
  const data = await res.json()
  return data.results as CrawlResult[]
}

export interface LibraryMemory {
  id?: string
  text: string
  category?: string
  metadata?: Record<string, unknown>
}

export async function searchLibrary(query: string, limit = 5): Promise<LibraryMemory[]> {
  const res = await fetch(`/api/library/search?q=${encodeURIComponent(query)}&limit=${limit}`)
  if (!res.ok) return []
  const data = await res.json()
  return data.results as LibraryMemory[]
}
