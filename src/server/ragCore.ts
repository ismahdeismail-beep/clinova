// Pure, dependency-light helpers for the server-side RAG serving path.
//
// Kept free of Supabase / Gemini imports so they can be unit-tested in
// isolation and reused by the weekly evaluator; the network-touching service
// lives in src/server/rag.ts.

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export interface Ranked<T> {
  item: T
  similarity: number
}

/** Cosine similarity of two equal-length vectors; -1 when incomparable. */
export function cosine(a: number[], b: number[]): number {
  if (!a?.length || a.length !== b.length) return -1
  let dot = 0
  let na = 0
  let nb = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    na += a[i] * a[i]
    nb += b[i] * b[i]
  }
  if (na === 0 || nb === 0) return -1
  return dot / (Math.sqrt(na) * Math.sqrt(nb))
}

/**
 * Rank items by cosine similarity to `qEmb`, dropping non-positive matches and
 * returning the top `n` as {item, similarity} pairs in descending order.
 */
export function rankByCosine<T extends { embedding: number[] }>(
  qEmb: number[],
  items: T[],
  n = 3,
): Ranked<T>[] {
  return items
    .map((item) => ({ item, similarity: cosine(qEmb, item.embedding) }))
    .filter((x) => x.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, n)
}

let cachedTemplate: string | null = null

/**
 * Load the RAG answer template (src/prompts/rag-prompt.md), cached. Resolved
 * from the process cwd, matching how server.ts locates uploads/ and dist/
 * (the server always runs from the repo root, incl. the bundled dist build).
 */
export function ragPromptTemplate(): string {
  if (cachedTemplate == null) {
    cachedTemplate = readFileSync(resolve(process.cwd(), 'src', 'prompts', 'rag-prompt.md'), 'utf8')
  }
  return cachedTemplate
}

/** Render retrieved chunks into the `<chunks>` excerpt block. */
export function formatChunks(chunks: { chunk_text: string; section?: string | null }[]): string {
  return chunks
    .map((c, i) => `[chunk ${i + 1} · section ${c.section ?? 'unknown'}\n${c.chunk_text}\n]`)
    .join('\n\n')
}

/** Fill the RAG template's `{{chunks}}` + `{{question}}` placeholders. */
export function buildRagPrompt(
  question: string,
  chunks: { chunk_text: string; section?: string | null }[],
  template: string = ragPromptTemplate(),
): string {
  return template.replace('{{chunks}}', formatChunks(chunks)).replace('{{question}}', question)
}
