// Server-side retrieval-augmented generation over knowledge_chunks.
//
// This is the production serving path for the RAG corpus (the WhatsApp bot and
// any future surface): embed the query with the SAME model used at ingestion,
// cosine-rank the stored chunk vectors, and answer with Gemini grounded only in
// the retrieved excerpts (src/prompts/rag-prompt.md). Read-only (service-role).

import { adminSupabase } from './adminClient.js'
import { embedText, EMBEDDING_MODEL, generateContentWithFallback } from './aiRouter.js'
import { buildRagPrompt, rankByCosine } from './ragCore.js'

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
  /** How many rows to pull from the DB before ranking in-process. */
  candidateLimit?: number
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

/** Cosine top-k over knowledge_chunks using the ingestion embedding model. */
export async function retrieveChunks(
  queryEmbedding: number[],
  opts: RetrieveOptions = {},
): Promise<RagChunk[]> {
  if (!adminSupabase) {
    throw new Error('Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)')
  }
  const { monographId, source, limit = 3, candidateLimit = 1000 } = opts
  let query = adminSupabase
    .from('knowledge_chunks')
    // select('*') keeps this working before/after the `source` column lands
    // (migration 00021); the value is read defensively below.
    .select('*')
    .eq('embedding_model', EMBEDDING_MODEL)
    .limit(candidateLimit)
  if (monographId) query = query.eq('monograph_id', monographId)
  const { data, error } = await query
  if (error) throw new Error(`knowledge_chunks query failed: ${error.message}`)
  const rows = (data ?? []) as ChunkDbRow[]
  const candidates = source ? rows.filter((r) => (r.source ?? 'monograph') === source) : rows
  return rankByCosine(queryEmbedding, candidates, limit).map(({ item, similarity }) => ({
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
