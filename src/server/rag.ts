// Server-side retrieval-augmented generation over knowledge_chunks.
//
// This is the production serving path for the RAG corpus (the WhatsApp bot and
// any future surface): embed the query with the SAME model used at ingestion,
// cosine-rank the stored chunk vectors, and answer with Gemini grounded only in
// the retrieved excerpts (src/prompts/rag-prompt.md). Read-only (service-role).

import { adminSupabase } from './adminClient.js'
import { embedText, EMBEDDING_MODEL, generateContentWithFallback } from './aiRouter.js'
import { buildRagPrompt } from './ragCore.js'
import { createChunkIndex, fetchAllPages } from './chunkIndex.js'

export { buildRagPrompt, cosine, formatChunks, ragPromptTemplate, rankByCosine } from './ragCore.js'

export interface RagChunk {
  id: string
  chunk_text: string
  section: string | null
  monograph_id: string | null
  source: string
  similarity: number
}

export interface RagAnswer {
  answer: string
  chunks: RagChunk[]
  no_chunks: boolean
  embedding_model: string
}

export interface RetrieveOptions {
  /** Restrict to a single monograph (e.g. the drug the user asked about). */
  monographId?: string
  /** Restrict to a corpus tag, e.g. 'monograph' (default) or 'stg'. */
  source?: string
  /** Number of chunks to keep. */
  limit?: number
}

interface ChunkDbRow {
  id: string
  chunk_text: string
  metadata: { section?: string | null } | null
  monograph_id: string | null
  embedding: number[]
  source?: string | null
}

const NO_CHUNKS_REPLY =
  "I don't have indexed knowledge-base excerpts covering that yet — the Clinova knowledge base is still being built, so I can't ground an answer right now. Please try again later, or ask about a specific medicine."

/** How long a loaded corpus stays fresh before the next query reloads it. */
const INDEX_TTL_MS = Number(process.env.RAG_INDEX_TTL_MS || 600_000)

async function loadAllChunkRows(): Promise<ChunkDbRow[]> {
  if (!adminSupabase) {
    throw new Error('Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)')
  }
  const client = adminSupabase
  return fetchAllPages<ChunkDbRow>(async (from, to) => {
    const { data, error } = await client
      .from('knowledge_chunks')
      // select('*') keeps this working before/after the `source` column lands
      // (migration 00021); the value is read defensively below.
      .select('*')
      .eq('embedding_model', EMBEDDING_MODEL)
      .order('created_at', { ascending: true })
      .order('id', { ascending: true })
      .range(from, to)
    if (error) throw new Error(`knowledge_chunks query failed: ${error.message}`)
    return (data ?? []) as ChunkDbRow[]
  })
}

const chunkIndex = createChunkIndex<ChunkDbRow>(loadAllChunkRows, { ttlMs: INDEX_TTL_MS })

/**
 * Cosine top-k over knowledge_chunks using the ingestion embedding model.
 *
 * Ranking happens in-process against the cached corpus (see chunkIndex.ts), so
 * the whole table is searched rather than a PostgREST-truncated first page.
 */
export async function retrieveChunks(
  queryEmbedding: number[],
  opts: RetrieveOptions = {},
): Promise<RagChunk[]> {
  const { monographId, source, limit = 3 } = opts
  const ranked = await chunkIndex.search(queryEmbedding, {
    limit,
    filter: (r) =>
      (!monographId || r.monograph_id === monographId) &&
      (!source || (r.source ?? 'monograph') === source),
  })
  return ranked.map(({ item, similarity }) => ({
    id: item.id,
    chunk_text: item.chunk_text,
    section: item.metadata?.section ?? null,
    monograph_id: item.monograph_id,
    source: item.source ?? 'monograph',
    similarity: Number(similarity.toFixed(4)),
  }))
}

/** Embed → retrieve → grounded answer (grounded only in the retrieved chunks). */
export async function answerWithRag(
  question: string,
  opts: RetrieveOptions = {},
): Promise<RagAnswer> {
  const trimmed = (question ?? '').trim()
  if (!trimmed) {
    return { answer: '', chunks: [], no_chunks: true, embedding_model: EMBEDDING_MODEL }
  }
  const queryEmbedding = await embedText(trimmed)
  const chunks = await retrieveChunks(queryEmbedding, { ...opts, limit: opts.limit ?? 3 })
  if (!chunks.length) {
    return {
      answer: NO_CHUNKS_REPLY,
      chunks: [],
      no_chunks: true,
      embedding_model: EMBEDDING_MODEL,
    }
  }
  const prompt = buildRagPrompt(trimmed, chunks)
  const response = await generateContentWithFallback(
    { model: 'gemini-flash-latest', contents: prompt, config: { temperature: 0, topP: 0.1 } },
    undefined,
    'WhatsApp RAG',
  )
  return {
    answer: String(response?.text ?? '').trim(),
    chunks,
    no_chunks: false,
    embedding_model: EMBEDDING_MODEL,
  }
}
