// In-memory index over `knowledge_chunks` for the serving path.
//
// Caching here is a correctness requirement, not an optimisation:
//   1. PostgREST truncates a single select at max-rows (Supabase default 1000 —
//      even an explicit .limit(100000) is capped), so the corpus must be read
//      page-by-page.
//   2. Ranking against that 1000-row ceiling silently caps recall: with the full
//      8077 chunks indexed, cosine top-k would only ever see ~12% of the corpus,
//      so most questions would come back with the wrong (or no) excerpts.
//
// Reading page-by-page on every question would instead cost ~8 requests and
// ~24MB of egress per message. Loading once per TTL gives full-corpus ranking at
// a one-off cost.

import { rankByCosine, type Ranked } from './ragCore.js'

export interface ChunkIndexOptions {
  /** How long a loaded row set stays fresh. */
  ttlMs?: number
  now?: () => number
}

export interface ChunkSearchOptions<T> {
  limit?: number
  filter?: (item: T) => boolean
}

export interface ChunkIndexStats {
  rows: number
  loads: number
  ageMs: number
}

export interface ChunkIndex<T extends { embedding: number[] }> {
  search(query: number[], opts?: ChunkSearchOptions<T>): Promise<Ranked<T>[]>
  invalidate(): void
  readonly stats: ChunkIndexStats
}

/**
 * Read every row of a PostgREST-style paginated query, given a function that
 * returns one page for a `from`/`to` offset pair. Stops on a short page (or a
 * page that is not `pageSize` long, i.e. a server that ignored the range).
 */
export async function fetchAllPages<T>(
  fetchPage: (from: number, to: number) => Promise<T[] | null | undefined>,
  pageSize = 1000,
  maxPages = 10_000,
): Promise<T[]> {
  const out: T[] = []
  for (let page = 0; page < maxPages; page++) {
    const from = page * pageSize
    const rows = await fetchPage(from, from + pageSize - 1)
    if (!rows?.length) break
    out.push(...rows)
    if (rows.length !== pageSize) break
  }
  return out
}

/**
 * `load` runs at most once per TTL: the first search, and again once the rows
 * are older than `ttlMs`. Failures are not cached — the next search retries.
 */
export function createChunkIndex<T extends { embedding: number[] }>(
  load: () => Promise<T[]>,
  opts: ChunkIndexOptions = {},
): ChunkIndex<T> {
  const ttlMs = opts.ttlMs ?? 600_000
  const now = opts.now ?? Date.now
  let rows: T[] | null = null
  let loadedAt = 0
  let loads = 0

  async function current(): Promise<T[]> {
    if (rows && now() - loadedAt < ttlMs) return rows
    rows = await load()
    loadedAt = now()
    loads += 1
    return rows
  }

  return {
    async search(query, searchOpts = {}) {
      const all = await current()
      const candidates = searchOpts.filter ? all.filter(searchOpts.filter) : all
      return rankByCosine(query, candidates, searchOpts.limit ?? 3)
    },
    invalidate() {
      rows = null
      loadedAt = 0
    },
    get stats(): ChunkIndexStats {
      return { rows: rows?.length ?? 0, loads, ageMs: rows ? now() - loadedAt : -1 }
    },
  }
}
