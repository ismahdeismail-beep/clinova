/**
 * ensure-rag.ts — populate `knowledge_chunks` with embedded, retrievable
 * chunks for every drug monograph, so the WhatsApp bot / RAG tutor can
 * ground answers in the catalogue.
 *
 * Design notes
 * ------------
 * - Idempotent: every run gets a `run_id` (UTC timestamp) and upserts on
 *   (monograph_id, chunk_index). Re-running only rewrites the same rows.
 * - Real embeddings: reuses `embedText` from src/server/aiRouter.ts
 *   (Gemini gemini-embedding-2, 768-dim) so the pipeline matches the rest
 *   of the backend.
 * - Zero external CLIs: no psql/jq required (unlike the old bash sketch).
 * - Emits a JSON report to logs/rag-status-YYYYMMDD.json and a console
 *   summary (coverage, missing monographs, errors).
 *
 * Usage
 * -----
 *   npx tsx scripts/ensure-rag.ts [--dry-run] [--limit N] [--batch N]
 *   ./scripts/ensure-rag.sh        [--dry-run] [--limit N] [--batch N]
 *
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY
 */
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { embedText } from '../src/server/aiRouter.js'

interface Args {
  dryRun: boolean
  limit: number | null
  batch: number
}

interface Monograph {
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

interface Chunk {
  section: string
  text: string
}

function parseArgs(argv: string[]): Args {
  const args: Args = { dryRun: false, limit: null, batch: 20 }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dry-run') args.dryRun = true
    else if (a === '--limit') args.limit = Number(argv[++i]) || null
    else if (a === '--batch') args.batch = Number(argv[++i]) || 20
  }
  return args
}

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

function todayStamp(d = new Date()): string {
  return d.toISOString().slice(0, 10).replace(/-/g, '')
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  const gemini = process.env.GEMINI_API_KEY

  if (!url || !key) {
    console.error('ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.')
    process.exit(1)
  }
  if (!args.dryRun && !gemini) {
    console.error('ERROR: GEMINI_API_KEY is required to generate embeddings (or pass --dry-run).')
    process.exit(1)
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } })
  const runId = `${todayStamp()}-${Date.now().toString(36)}`

  // --- Load monographs (paginated: PostgREST caps at 1000 rows) ------------
  const SELECT =
    'id, name, generic_name, drug_class, indications, contraindications, side_effects, dosage, interactions, monitoring, patient_counselling'
  const monographs: Monograph[] = []
  const pageSize = 1000
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from('drug_monographs')
      .select(SELECT)
      .order('name', { ascending: true })
      .range(from, from + pageSize - 1)
    if (error) {
      console.error(`ERROR loading monographs: ${error.message}`)
      process.exit(1)
    }
    monographs.push(...((data ?? []) as Monograph[]))
    if (!data || data.length < pageSize) break
  }

  const targets = args.limit ? monographs.slice(0, args.limit) : monographs
  console.log(
    `[ensure-rag] run ${runId} — ${targets.length}/${monographs.length} monographs` +
      `${args.dryRun ? ' (dry run)' : ''}`,
  )

  const errors: { monograph: string; error: string }[] = []
  const missing: string[] = []
  let chunksWritten = 0
  let monographsProcessed = 0

  for (let i = 0; i < targets.length; i++) {
    const row = targets[i]
    const chunks = buildChunks(row)
    if (chunks.length === 0) {
      missing.push(row.name)
      continue
    }

    try {
      const rows: Record<string, unknown>[] = []
      for (let idx = 0; idx < chunks.length; idx++) {
        const chunk = chunks[idx]
        if (args.dryRun) {
          rows.push({
            monograph_id: row.id,
            chunk_index: idx,
            chunk_text: chunk.text,
            embedding: null,
            embedding_model: 'gemini-embedding-2',
            run_id: runId,
            metadata: { section: chunk.section, source: 'monograph' },
          })
          continue
        }
        const embedding = await embedText(chunk.text)
        rows.push({
          monograph_id: row.id,
          chunk_index: idx,
          chunk_text: chunk.text,
          embedding,
          embedding_model: 'gemini-embedding-2',
          run_id: runId,
          metadata: { section: chunk.section, source: 'monograph' },
        })
        await new Promise((r) => setTimeout(r, 120)) // stay under rate limits
      }

      if (!args.dryRun) {
        const { error } = await supabase
          .from('knowledge_chunks')
          .upsert(rows, { onConflict: 'monograph_id,chunk_index' })
        if (error) throw new Error(error.message)
      }
      chunksWritten += rows.length
      monographsProcessed++
    } catch (e) {
      errors.push({ monograph: row.name, error: (e as Error).message })
    }

    if ((i + 1) % args.batch === 0 || i === targets.length - 1) {
      console.log(
        `[ensure-rag] ${i + 1}/${targets.length} · ${chunksWritten} chunks · ${errors.length} errors`,
      )
    }
  }

  const report = {
    run_id: runId,
    dry_run: args.dryRun,
    generated_at: new Date().toISOString(),
    monographs_total: monographs.length,
    monographs_processed: monographsProcessed,
    monographs_missing_chunks: missing,
    chunks_written: chunksWritten,
    errors,
  }
  const reportPath = resolve(process.cwd(), 'logs', `rag-status-${todayStamp()}.json`)
  mkdirSync(dirname(reportPath), { recursive: true })
  writeFileSync(reportPath, JSON.stringify(report, null, 2))

  console.log(
    `[ensure-rag] done — ${monographsProcessed} monographs, ${chunksWritten} chunks, ` +
      `${missing.length} without chunks, ${errors.length} errors. Report: ${reportPath}`,
  )
  if (missing.length)
    console.log(
      `[ensure-rag] missing: ${missing.slice(0, 20).join(', ')}${missing.length > 20 ? ' …' : ''}`,
    )
  if (errors.length) process.exit(1)
}

main().catch((e) => {
  console.error(`[ensure-rag] fatal: ${e?.message ?? e}`)
  process.exit(1)
})
