import type { AddressInfo } from 'node:net'
import express from 'express'
import type { SupabaseClient } from '@supabase/supabase-js'
import { describe, expect, it, vi } from 'vitest'
import type { RagChunk } from '../rag'
import { createSearchRouter, MAX_QUERY_LENGTH, MAX_RESULTS, searchUnified } from '../search'

const rows = [
  {
    result_type: 'drug',
    id: 'd1',
    title: 'Aspirin',
    subtitle: 'Analgesics',
    relevance: 0.91,
  },
]

const chunks: RagChunk[] = [
  {
    id: 'c1',
    chunk_text: 'Aspirin 75 mg once daily',
    section: 'dosage',
    monograph_id: 'd1',
    source: 'monograph',
    similarity: 0.88,
  },
]

function mockClient(rpc: ReturnType<typeof vi.fn>): SupabaseClient {
  return { rpc } as unknown as SupabaseClient
}

function makeApp(deps: Parameters<typeof createSearchRouter>[0]) {
  const app = express()
  app.use(express.json())
  app.use('/api/search', createSearchRouter(deps))
  return app
}

async function serve(app: express.Express, fn: (base: string) => Promise<void>) {
  const server = app.listen(0)
  await new Promise<void>((resolve) => server.once('listening', () => resolve()))
  const { port } = server.address() as AddressInfo
  try {
    await fn(`http://127.0.0.1:${port}`)
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()))
  }
}

describe('GET /api/search', () => {
  it('calls unified_search with the trimmed query and validated limit', async () => {
    const rpc = vi.fn(async () => ({ data: rows, error: null }))
    await serve(makeApp({ client: mockClient(rpc) }), async (base) => {
      const res = await fetch(`${base}/api/search?q=%20aspirin%20&limit=2`)
      expect(res.status).toBe(200)
      expect(await res.json()).toMatchObject({
        ok: true,
        query: 'aspirin',
        limit: 2,
        total: 1,
        results: rows,
      })
      expect(rpc).toHaveBeenCalledWith('unified_search', {
        search_query: 'aspirin',
        match_count: 2,
      })
    })
  })

  it('uses the default limit when none is given', async () => {
    const rpc = vi.fn(async () => ({ data: [], error: null }))
    await serve(makeApp({ client: mockClient(rpc) }), async (base) => {
      const res = await fetch(`${base}/api/search?q=aspirin`)
      expect(res.status).toBe(200)
      expect((await res.json()).limit).toBe(10)
      expect(rpc).toHaveBeenCalledWith('unified_search', {
        search_query: 'aspirin',
        match_count: 10,
      })
    })
  })

  it('rejects missing, short, overlong and out-of-range inputs', async () => {
    const rpc = vi.fn(async () => ({ data: rows, error: null }))
    await serve(makeApp({ client: mockClient(rpc) }), async (base) => {
      const urls = [
        `${base}/api/search`,
        `${base}/api/search?q=a`,
        `${base}/api/search?q=${'x'.repeat(MAX_QUERY_LENGTH + 1)}`,
        `${base}/api/search?q=aspirin&limit=0`,
        `${base}/api/search?q=aspirin&limit=${MAX_RESULTS + 1}`,
      ]
      for (const url of urls) {
        const res = await fetch(url)
        expect(res.status).toBe(400)
        expect((await res.json()).error).toBeTruthy()
      }
      expect(rpc).not.toHaveBeenCalled()
    })
  })

  it('returns 500 when the service client is not configured', async () => {
    await serve(makeApp({ client: null }), async (base) => {
      const res = await fetch(`${base}/api/search?q=aspirin`)
      expect(res.status).toBe(500)
      expect(await res.json()).toEqual({ error: 'Supabase service client not configured' })
    })
  })

  it('returns 500 when the RPC reports an error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const rpc = vi.fn(async () => ({ data: null, error: { message: 'rpc down' } }))
    await serve(makeApp({ client: mockClient(rpc) }), async (base) => {
      const res = await fetch(`${base}/api/search?q=aspirin`)
      expect(res.status).toBe(500)
      expect(await res.json()).toEqual({ error: 'Search failed' })
    })
  })
})

describe('GET /api/search/semantic', () => {
  it('reuses the injected embedder and retriever', async () => {
    const embed = vi.fn(async () => [0.1, 0.2])
    const retrieve = vi.fn(async () => chunks)
    await serve(makeApp({ embed, retrieve }), async (base) => {
      const res = await fetch(`${base}/api/search/semantic?q=aspirin&limit=3`)
      expect(res.status).toBe(200)
      expect(await res.json()).toMatchObject({ ok: true, query: 'aspirin', limit: 3, total: 1 })
      expect(embed).toHaveBeenCalledWith('aspirin')
      expect(retrieve).toHaveBeenCalledWith([0.1, 0.2], { limit: 3 })
    })
  })

  it('caps the semantic result limit', async () => {
    const embed = vi.fn(async () => [0.1])
    const retrieve = vi.fn(async () => chunks)
    await serve(makeApp({ embed, retrieve }), async (base) => {
      const res = await fetch(`${base}/api/search/semantic?q=aspirin&limit=999`)
      expect(res.status).toBe(400)
      expect(embed).not.toHaveBeenCalled()
      expect(retrieve).not.toHaveBeenCalled()
    })
  })

  it('returns 500 when retrieval fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const embed = vi.fn(async () => [0.1])
    const retrieve = vi.fn(async (): Promise<RagChunk[]> => {
      throw new Error('embedder offline')
    })
    await serve(makeApp({ embed, retrieve }), async (base) => {
      const res = await fetch(`${base}/api/search/semantic?q=aspirin`)
      expect(res.status).toBe(500)
      expect(await res.json()).toEqual({ error: 'Semantic search failed' })
    })
  })
})

describe('searchUnified', () => {
  it('returns RPC rows for direct server-side reuse', async () => {
    const rpc = vi.fn(async () => ({ data: rows, error: null }))
    const result = await searchUnified('aspirin', 5, mockClient(rpc))
    expect(result).toEqual(rows)
    expect(rpc).toHaveBeenCalledWith('unified_search', {
      search_query: 'aspirin',
      match_count: 5,
    })
  })
})
