import express, { type Request, type Response } from 'express'
import type { SupabaseClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { adminSupabase } from './adminClient.js'
import { EMBEDDING_MODEL, embedText } from './aiRouter.js'
import { retrieveChunks, type RagChunk } from './rag.js'

export const MAX_QUERY_LENGTH = 200
export const MAX_RESULTS = 50
export const MAX_SEMANTIC_RESULTS = 20

const queryField = z
  .string()
  .trim()
  .min(2, 'q must be at least 2 characters')
  .max(MAX_QUERY_LENGTH, `q must be at most ${MAX_QUERY_LENGTH} characters`)

export const searchQuerySchema = z.object({
  q: queryField,
  limit: z.coerce
    .number()
    .int()
    .min(1, 'limit must be at least 1')
    .max(MAX_RESULTS, `limit must be at most ${MAX_RESULTS}`)
    .default(10),
})

export const semanticSearchQuerySchema = z.object({
  q: queryField,
  limit: z.coerce
    .number()
    .int()
    .min(1, 'limit must be at least 1')
    .max(MAX_SEMANTIC_RESULTS, `limit must be at most ${MAX_SEMANTIC_RESULTS}`)
    .default(5),
})

export interface UnifiedSearchRow {
  result_type: string
  id: string
  title: string
  subtitle: string
  relevance: number
}

export type EmbedFn = (query: string) => Promise<number[]>
export type RetrieveFn = (embedding: number[], opts: { limit: number }) => Promise<RagChunk[]>

export interface SearchDeps {
  client?: SupabaseClient | null
  embed?: EmbedFn
  retrieve?: RetrieveFn
}

export async function searchUnified(
  query: string,
  limit: number,
  client: SupabaseClient | null,
): Promise<UnifiedSearchRow[]> {
  if (!client) throw new Error('Supabase service client not configured')
  const { data, error } = await client.rpc('unified_search', {
    search_query: query,
    match_count: limit,
  })
  if (error) throw new Error(error.message)
  return (data ?? []) as UnifiedSearchRow[]
}

export async function searchSemantic(
  query: string,
  limit: number,
  deps: Pick<SearchDeps, 'embed' | 'retrieve'> = {},
): Promise<RagChunk[]> {
  const embed = deps.embed ?? embedText
  const retrieve = deps.retrieve ?? retrieveChunks
  return retrieve(await embed(query), { limit })
}

function invalidQuery(res: Response, error: z.ZodError): Response {
  return res.status(400).json({ error: error.issues[0]?.message ?? 'Invalid search query' })
}

export function createSearchRouter(deps: SearchDeps = {}) {
  const client = deps.client === undefined ? adminSupabase : deps.client
  const router = express.Router()

  router.get('/', async (req: Request, res: Response) => {
    const parsed = searchQuerySchema.safeParse(req.query)
    if (!parsed.success) return invalidQuery(res, parsed.error)
    const { q, limit } = parsed.data
    if (!client) return res.status(500).json({ error: 'Supabase service client not configured' })
    try {
      const results = await searchUnified(q, limit, client)
      return res.json({ ok: true, query: q, limit, results, total: results.length })
    } catch (err) {
      console.error('[search] unified search failed:', err)
      return res.status(500).json({ error: 'Search failed' })
    }
  })

  router.get('/semantic', async (req: Request, res: Response) => {
    const parsed = semanticSearchQuerySchema.safeParse(req.query)
    if (!parsed.success) return invalidQuery(res, parsed.error)
    const { q, limit } = parsed.data
    try {
      const results = await searchSemantic(q, limit, deps)
      return res.json({
        ok: true,
        query: q,
        limit,
        embedding_model: EMBEDDING_MODEL,
        results,
        total: results.length,
      })
    } catch (err) {
      console.error('[search] semantic search failed:', err)
      return res.status(500).json({ error: 'Semantic search failed' })
    }
  })

  return router
}
