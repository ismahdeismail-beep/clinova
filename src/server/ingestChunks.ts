// Pure helpers for the knowledge_chunks ingest: chunking a monograph, and
// deciding which documents need (re-)embedding.
//
// Kept in src/ so they are unit-testable — the ingest script (scripts/ensure-rag.ts)
// only does IO. Two bugs in this area were expensive (the PostgREST 1000-row
// truncation silently froze coverage; a stale-document re-embed plan would burn
// the daily free quota), so the decision logic is covered by tests.

import { createHash } from 'node:crypto'

export interface Monograph {
  id: string
  name: string
  generic_name: string | null
  drug_class: string | null
  indications: string[] | null
  contraindications: string[] | null
  side_effects: string[] | null
  dosage: unknown
  interactions: string[] | null
  monitoring: string | null
  patient_counselling: string | null
}

export interface Chunk {
  section: string
  text: string
  embedding?: number[] | null
}

export interface IngestDoc {
  source: 'monograph' | 'stg'
  sourceRef: string
  label: string
  contentHash: string
}

export type IngestDecision = 'missing' | 'changed' | 'current'

function list(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v)).filter(Boolean)
  if (typeof value === 'string' && value.trim()) return [value.trim()]
  return []
}

function stringifyDosage(dosage: unknown): string {
  if (!dosage) return ''
  if (typeof dosage === 'string') return dosage
  if (typeof dosage !== 'object') return String(dosage)
  return Object.entries(dosage as Record<string, unknown>)
    .filter(([, v]) => v != null && String(v).trim())
    .map(([k, v]) => `${k}: ${String(v).trim()}`)
    .join('; ')
}

/** Fingerprint of a document's chunk texts — changes when its content changes. */
export function contentHash(chunks: Chunk[]): string {
  return createHash('sha1')
    .update(chunks.map((c) => c.text).join('\u0001'))
    .digest('hex')
    .slice(0, 16)
}

/** Turn one monograph row into sectioned chunks (empty sections dropped). */
export function buildChunks(row: Monograph): Chunk[] {
  const heading = `${row.name}${row.generic_name && row.generic_name !== row.name ? ` (${row.generic_name})` : ''}`
  const klass = row.drug_class ? `Drug class: ${row.drug_class}` : ''
  const sections: Chunk[] = [
    { section: 'overview', text: [heading, klass].filter(Boolean).join('. ') },
    {
      section: 'indications',
      text: `Indications for ${row.name}: ${list(row.indications).join('; ')}`,
    },
    {
      section: 'contraindications',
      text: `Contraindications for ${row.name}: ${list(row.contraindications).join('; ')}`,
    },
    {
      section: 'side_effects',
      text: `Side effects of ${row.name}: ${list(row.side_effects).join('; ')}`,
    },
    { section: 'dosage', text: `Dosage of ${row.name}: ${stringifyDosage(row.dosage)}` },
    {
      section: 'interactions',
      text: `Interactions of ${row.name}: ${list(row.interactions).join('; ')}`,
    },
    { section: 'monitoring', text: `Monitoring for ${row.name}: ${row.monitoring ?? ''}` },
    {
      section: 'counselling',
      text: `Patient counselling for ${row.name}: ${row.patient_counselling ?? ''}`,
    },
  ]
  return sections.filter((c) => !/:\s*$/.test(c.text) && c.text.trim().length > heading.length + 2)
}

/**
 * Decide which documents to embed.
 *
 * `have` holds `${source}:${sourceRef}` for every document that already has
 * chunks; `storedHash` holds the content hash recorded on those chunks.
 *
 * - not in `have`            -> missing: embed it.
 * - in `have`, marked re-embed, hash differs (or absent) -> changed: re-embed.
 * - in `have`, marked re-embed, hash matches -> current: skip (no quota wasted).
 * - in `have`, not marked    -> current: skip.
 */
export function decideIngest<T extends IngestDoc>(
  docs: T[],
  have: Set<string>,
  storedHash: Map<string, string>,
  reembedLabels: Set<string>,
): { selected: T[]; decisions: Map<string, IngestDecision> } {
  const decisions = new Map<string, IngestDecision>()
  const selected: T[] = []
  for (const d of docs) {
    const key = `${d.source}:${d.sourceRef}`
    if (!have.has(key)) {
      decisions.set(key, 'missing')
      selected.push(d)
      continue
    }
    const marked = d.source === 'monograph' && reembedLabels.has(d.label)
    if (marked && storedHash.get(key) !== d.contentHash) {
      decisions.set(key, 'changed')
      selected.push(d)
      continue
    }
    decisions.set(key, 'current')
  }
  return { selected, decisions }
}

/**
 * Put re-embedded (changed) documents first: their current corpus text is
 * known-wrong and they are few, so they win the daily quota over documents
 * that are simply not covered yet.
 */
export function prioritizeChanged<T extends IngestDoc>(docs: T[], reembedLabels: Set<string>): T[] {
  const isReembed = (d: IngestDoc) => d.source === 'monograph' && reembedLabels.has(d.label)
  const first = docs.filter(isReembed)
  return first.length ? [...first, ...docs.filter((d) => !isReembed(d))] : docs
}
