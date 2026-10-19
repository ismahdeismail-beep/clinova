import { describe, expect, it, vi } from 'vitest'
import { createChunkIndex, fetchAllPages } from '../chunkIndex'

interface Row {
  id: string
  embedding: number[]
  source?: string
}

const row = (id: string, embedding: number[], source = 'monograph'): Row => ({
  id,
  embedding,
  source,
})

describe('fetchAllPages', () => {
  it('reads every page until a short page arrives', async () => {
    const all = Array.from({ length: 2500 }, (_, i) => i)
    const calls: Array<[number, number]> = []
    const fetchPage = vi.fn(async (from: number, to: number) => {
      calls.push([from, to])
      return all.slice(from, to + 1)
    })

    const rows = await fetchAllPages(fetchPage, 1000)

    expect(rows).toHaveLength(2500)
    expect(fetchPage).toHaveBeenCalledTimes(3)
    expect(calls).toEqual([
      [0, 999],
      [1000, 1999],
      [2000, 2999],
    ])
  })

  it('does not stop at the first page when the table outgrows one page', async () => {
    const all = Array.from({ length: 2000 }, (_, i) => i)
    const fetchPage = async (from: number, to: number) => all.slice(from, to + 1)

    const rows = await fetchAllPages(fetchPage, 1000)

    expect(rows).toHaveLength(2000)
    expect(rows.at(-1)).toBe(1999)
  })

  it('stops immediately on an empty first page', async () => {
    const fetchPage = vi.fn(async () => [])

    expect(await fetchAllPages(fetchPage, 1000)).toEqual([])
    expect(fetchPage).toHaveBeenCalledTimes(1)
  })

  it('stops when a server ignores the range and returns more than one page', async () => {
    const fetchPage = vi.fn(async () => [1, 2, 3, 4, 5])

    expect(await fetchAllPages(fetchPage, 2)).toEqual([1, 2, 3, 4, 5])
    expect(fetchPage).toHaveBeenCalledTimes(1)
  })

  it('is bounded by maxPages even if every page comes back full', async () => {
    const fetchPage = vi.fn(async (from: number, to: number) =>
      Array.from({ length: to - from + 1 }, (_, i) => from + i),
    )

    const rows = await fetchAllPages(fetchPage, 2, 3)

    expect(rows).toEqual([0, 1, 2, 3, 4, 5])
    expect(fetchPage).toHaveBeenCalledTimes(3)
  })
})

describe('createChunkIndex', () => {
  it('loads once and serves later searches from the cache', async () => {
    const load = vi.fn(async () => [row('a', [1, 0])])
    const index = createChunkIndex(load, { ttlMs: 60_000, now: () => 0 })

    await index.search([1, 0])
    await index.search([1, 0])

    expect(load).toHaveBeenCalledTimes(1)
    expect(index.stats).toMatchObject({ rows: 1, loads: 1 })
  })

  it('reloads once the rows are older than the TTL', async () => {
    let clock = 0
    const load = vi.fn(async () => [row('a', [1, 0])])
    const index = createChunkIndex(load, { ttlMs: 1000, now: () => clock })

    await index.search([1, 0])
    clock = 1001
    await index.search([1, 0])

    expect(load).toHaveBeenCalledTimes(2)
    expect(index.stats).toMatchObject({ loads: 2, ageMs: 0 })
  })

  it('reloads after invalidate()', async () => {
    const load = vi.fn(async () => [row('a', [1, 0])])
    const index = createChunkIndex(load, { ttlMs: 60_000, now: () => 0 })

    await index.search([1, 0])
    index.invalidate()
    expect(index.stats).toMatchObject({ rows: 0, ageMs: -1 })

    await index.search([1, 0])
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('does not cache a failed load', async () => {
    const load = vi
      .fn<() => Promise<Row[]>>()
      .mockRejectedValueOnce(new Error('db down'))
      .mockResolvedValueOnce([row('a', [1, 0])])
    const index = createChunkIndex(load, { ttlMs: 60_000, now: () => 0 })

    await expect(index.search([1, 0])).rejects.toThrow('db down')
    await expect(index.search([1, 0])).resolves.toHaveLength(1)
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('ranks the whole corpus, not just the first page', async () => {
    const rows = Array.from({ length: 3000 }, (_, i) => row(`noise-${i}`, [0, 1]))
    rows[2500] = row('buried', [1, 0])
    const index = createChunkIndex(async () => rows, { ttlMs: 60_000, now: () => 0 })

    const top = await index.search([1, 0], { limit: 1 })

    expect(top).toHaveLength(1)
    expect(top[0].item.id).toBe('buried')
    expect(top[0].similarity).toBeCloseTo(1)
  })

  it('applies the filter before ranking', async () => {
    const rows = [row('mono-1', [1, 0], 'monograph'), row('stg-1', [1, 0], 'stg')]
    const index = createChunkIndex(async () => rows, { ttlMs: 60_000, now: () => 0 })

    const top = await index.search([1, 0], { filter: (r) => r.source === 'stg' })

    expect(top.map((t) => t.item.id)).toEqual(['stg-1'])
  })

  it('returns at most `limit` matches, best first', async () => {
    const rows = [row('weak', [1, 1]), row('best', [1, 0]), row('mid', [2, 1])]
    const index = createChunkIndex(async () => rows, { ttlMs: 60_000, now: () => 0 })

    const top = await index.search([1, 0], { limit: 2 })

    expect(top.map((t) => t.item.id)).toEqual(['best', 'mid'])
  })
})
