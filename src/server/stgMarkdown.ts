// Pure parser for Standard Treatment Guideline (STG) / essential-medicine
// markdown. Dependency-free so it can be unit-tested and reused by the
// ingestion script (scripts/ensure-rag.ts).
//
// Document shape:
//   ---
//   title: Amoxicillin
//   category: Antibiotic
//   atcCode: J01CA04
//   lastUpdated: 2026-01-01
//   sourceMonograph: amoxicillin
//   ---
//   # Amoxicillin
//   ## Indications
//   ...
//   ## Dosage
//   ...

export interface StgChunk {
  section: string
  text: string
}

export interface StgDoc {
  slug: string
  title: string
  chunks: StgChunk[]
}

/** Split `---`-delimited YAML front-matter from the markdown body. */
export function parseFrontMatter(raw: string): { attrs: Record<string, string>; body: string } {
  if (!raw.startsWith('---')) return { attrs: {}, body: raw }
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return { attrs: {}, body: raw }
  const block = raw.slice(3, end).trim()
  const body = raw.slice(end + 4).replace(/^\s*\n/, '')
  const attrs: Record<string, string> = {}
  for (const line of block.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
    if (m) attrs[m[1].toLowerCase()] = m[2].trim().replace(/^["']|["']$/g, '')
  }
  return { attrs, body }
}

const MAX_CHUNK_CHARS = 3000

function splitOversized(text: string): string[] {
  if (text.length <= MAX_CHUNK_CHARS) return [text]
  const parts: string[] = []
  let rest = text
  while (rest.length > MAX_CHUNK_CHARS) {
    let cut = rest.lastIndexOf('\n', MAX_CHUNK_CHARS)
    if (cut < MAX_CHUNK_CHARS / 2) cut = rest.lastIndexOf(' ', MAX_CHUNK_CHARS)
    if (cut < MAX_CHUNK_CHARS / 2) cut = MAX_CHUNK_CHARS
    parts.push(rest.slice(0, cut).trim())
    rest = rest.slice(cut).trimStart()
  }
  if (rest) parts.push(rest)
  return parts
}

/**
 * Chunk an STG document: each `## Section` becomes one chunk, prefixed with the
 * medicine name so the embedding is self-contained. Prose before the first `##`
 * becomes an `overview` chunk. The YAML `title` wins over the H1 for the name.
 * Sections longer than the embedding model's context are split on line/word
 * boundaries so a single oversized section cannot stall the embedder.
 */
export function buildStgChunks(raw: string, slug: string): StgDoc {
  const { attrs, body } = parseFrontMatter(raw)
  const lines = body.split('\n')
  const h1 = lines
    .find((l) => /^#\s+/.test(l))
    ?.replace(/^#\s+/, '')
    .trim()
  const title = attrs.title || h1 || slug

  const preamble: string[] = []
  const chunks: StgChunk[] = []
  let section: string | null = null
  let buf: string[] = []
  const flush = () => {
    const text = buf.join('\n').trim()
    if (text) {
      if (section === null) preamble.push(...splitOversized(text))
      else
        for (const part of splitOversized(text))
          chunks.push({ section, text: `${title} — ${section}:\n${part}` })
    }
    buf = []
  }

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*$/)
    if (h2) {
      flush()
      section = h2[1].trim()
    } else if (/^#\s+/.test(line)) {
      // H1 title: rendered as `title`, not a chunk.
    } else {
      buf.push(line)
    }
  }
  flush()

  const intro = preamble.join('\n').trim()
  if (intro)
    chunks.unshift(
      ...splitOversized(intro).map((part) => ({
        section: 'overview',
        text: `${title} — overview:\n${part}`,
      })),
    )
  return { slug, title, chunks }
}
