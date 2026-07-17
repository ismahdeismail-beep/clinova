/**
 * Supermemory-backed knowledge storage for crawled book/reference content.
 *
 * This service is intentionally dependency-free (uses the global fetch available
 * in Node 18+) and is fully guarded: every method is a no-op / returns empty when
 * SUPERMEMORY_API_KEY is not configured, so the app builds and runs without secrets.
 *
 * API reference: https://api.supermemory.ai/v1/memories
 */

const SUPERMEMORY_API_KEY = process.env.SUPERMEMORY_API_KEY || ''
const SUPERMEMORY_BASE = process.env.SUPERMEMORY_BASE_URL || 'https://api.supermemory.ai/v1'
const LIBRARY_CATEGORY = 'clinova-library'

export interface LibraryMemory {
  id?: string
  text: string
  category?: string
  metadata?: Record<string, unknown>
}

export function isSupermemoryConfigured(): boolean {
  return SUPERMEMORY_API_KEY.length > 0
}

export async function addMemory(memory: LibraryMemory): Promise<string | null> {
  if (!isSupermemoryConfigured()) return null
  try {
    const res = await fetch(`${SUPERMEMORY_BASE}/memories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SUPERMEMORY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: memory.text,
        category: memory.category || LIBRARY_CATEGORY,
        metadata: memory.metadata || {},
      }),
    })
    if (!res.ok) {
      console.warn(`[supermemory] add failed ${res.status}: ${await res.text().catch(() => '')}`)
      return null
    }
    const data = (await res.json().catch(() => ({}))) as { id?: string }
    return data.id ?? null
  } catch (err) {
    console.warn('[supermemory] add error:', err)
    return null
  }
}

export async function searchMemories(query: string, limit = 5): Promise<LibraryMemory[]> {
  if (!isSupermemoryConfigured()) return []
  try {
    const params = new URLSearchParams({ q: query, limit: String(limit) })
    const res = await fetch(`${SUPERMEMORY_BASE}/memories/search?${params.toString()}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${SUPERMEMORY_API_KEY}` },
    })
    if (!res.ok) {
      console.warn(`[supermemory] search failed ${res.status}`)
      return []
    }
    const data = (await res.json().catch(() => ({}))) as { results?: LibraryMemory[] }
    return data.results ?? []
  } catch (err) {
    console.warn('[supermemory] search error:', err)
    return []
  }
}

export async function getAllMemories(limit = 100): Promise<LibraryMemory[]> {
  if (!isSupermemoryConfigured()) return []
  try {
    const params = new URLSearchParams({ limit: String(limit) })
    const res = await fetch(`${SUPERMEMORY_BASE}/memories?${params.toString()}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${SUPERMEMORY_API_KEY}` },
    })
    if (!res.ok) return []
    const data = (await res.json().catch(() => ({}))) as { results?: LibraryMemory[] }
    return data.results ?? []
  } catch (err) {
    console.warn('[supermemory] list error:', err)
    return []
  }
}

export { LIBRARY_CATEGORY }
