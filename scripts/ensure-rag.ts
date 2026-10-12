/**
 * ensure-rag.ts — populate `knowledge_chunks` with embedded, retrievable
 * chunks for every drug monograph, so the WhatsApp bot / RAG tutor can
 * ground answers in the catalogue.
 *
 * Design notes
 * ------------
 * - Idempotent: every run gets a `run_id` (UTC timestamp) and upserts on
 *   (monograph_id, chunk_index). Re-running only rewrites the same rows.
 * - Batched embeddings: reuses `embedTexts` from src/server/aiRouter.ts
 *   (Gemini gemini-embedding-001 @ 768-dim). Texts are embedded 50-at-a-time
 *   via the batch endpoint so a full 1072-monograph run costs ~150 requests
 *   instead of ~8000 (the API's free tier is 1000 requests/model/day).
 * - Zero external CLIs: no psql/jq required.
 * - Emits a JSON report to logs/rag-status-YYYYMMDD.json + console summary.
 *
 * Usage
 * -----
 *   npx tsx scripts/ensure-rag.ts [--dry-run] [--limit N] [--batch N] [--embed-batch N] [--reset]
 *   ./scripts/ensure-rag.sh        [--dry-run] [--limit N] [--batch N] [--embed-batch N] [--reset]
 *
 *   --batch N        monographs flushed per upsert (default 50)
 *   --embed-batch N  texts per embedding request, max 100 (default 50)
 *   --reset          delete all existing knowledge_chunks first (model switch)
 *
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY
 */
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { embedTexts, EMBEDDING_MODEL } from '../src/server/aiRouter.js'

interface Args {
  dryRun: boolean
  limit: number | null
  batch: number
  embedBatch: number
  reset: boolean
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
  embedding?: number[] | null
}

interface Plan {
  row: Monograph
  chunks: Chunk[]
  error?: string
}

function parseArgs(argv: string[]): Args {
  const args: Args = { dryRun: false, limit: null, batch: 50, embedBatch: 50, reset: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dry-run') args.dryRun = true
    else if (a === '--reset') args.reset = true
    else if (a === '--limit') args.limit = Number(argv[++i]) || null
    else if (a === '--batch') args.batch = Number(argv[++i]) || 50
    else if (a === '--embed-batch') args.embedBatch = Math.min(Number(argv[++i]) || 50, 100)
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

  // --- Build all chunks up front ------------------------------------------
  const plans: Plan[] = []
  const missing: string[] = []
  for (const row of targets) {
    const chunks = buildChunks(row)
    if (chunks.length === 0) missing.push(row.name)
    else plans.push({ row, chunks })
  }
  const totalChunks = plans.reduce((n, p) => n + p.chunks.length, 0)

  console.log(
    `[ensure-rag] run ${runId} — ${targets.length}/${monographs.length} monographs, ` +
      `${plans.length} with chunks (${totalChunks} chunks), ${missing.length} empty` +
      `${args.dryRun ? ' (dry run)' : ''}`,
  )

  if (args.reset && !args.dryRun) {
    const { error } = await supabase
      .from('knowledge_chunks')
      .delete()
      .gte('created_at', '1970-01-01T00:00:00Z')
    if (error) {
      console.error(`ERROR resetting knowledge_chunks: ${error.message}`)
      process.exit(1)
    }
    console.log(`[ensure-rag] --reset: cleared existing knowledge_chunks`)
  }

  // --- Embed in batches across monographs ---------------------------------
  const errors: { monograph: string; error: string }[] = []
  if (!args.dryRun && totalChunks > 0) {
    const items: { plan: Plan; chunk: Chunk }[] = []
    for (const p of plans) for (const c of p.chunks) items.push({ plan: p, chunk: c })

    let done = 0
    for (let i = 0; i < items.length; i += args.embedBatch) {
      const slice = items.slice(i, i + args.embedBatch)
      try {
        const vectors = await embedTexts(
          slice.map((x) => x.chunk.text),
          args.embedBatch,
        )
        slice.forEach((x, j) => {
          x.chunk.embedding = vectors[j]
        })
      } catch (e) {
        const names = [...new Set(slice.map((x) => x.plan.row.name))]
        const msg = (e as Error).message
        for (const p of slice.map((x) => x.plan)) {
          if (!p.error) p.error = msg
          errors.push({ monograph: p.row.name, error: msg })
        }
        console.error(
          `[ensure-rag] embed batch failed for: ${names.join(', ')} — ${msg.slice(0, 80)}`,
        )
      }
      done += slice.length
      if ((i / args.embedBatch) % 10 === 0 || done === items.length) {
        console.log(`[ensure-rag] embedded ${done}/${items.length} chunks`)
      }
    }
  }

  // --- Upsert per monograph (skip those whose embedding failed) ------------
  let chunksWritten = 0
  let monographsProcessed = 0
  for (let i = 0; i < plans.length; i += args.batch) {
    const group = plans.slice(i, i + args.batch)
    const rows: Record<string, unknown>[] = []
    for (const p of group) {
      if (p.error) continue
      p.chunks.forEach((c, idx) => {
        rows.push({
          monograph_id: p.row.id,
          chunk_index: idx,
          chunk_text: c.text,
          embedding: args.dryRun ? null : c.embedding,
          embedding_model: EMBEDDING_MODEL,
          run_id: runId,
          metadata: { section: c.section, source: 'monograph' },
        })
      })
    }
    if (args.dryRun) {
      chunksWritten += rows.length
      monographsProcessed += group.filter((g) => !g.error).length
      continue
    }
    if (rows.length) {
      const { error } = await supabase
        .from('knowledge_chunks')
        .upsert(rows, { onConflict: 'monograph_id,chunk_index' })
      if (error) {
        for (const p of group)
          if (!p.error) errors.push({ monograph: p.row.name, error: error.message })
      } else {
        chunksWritten += rows.length
        monographsProcessed += group.filter((g) => !g.error).length
      }
    }
    console.log(
      `[ensure-rag] upsert ${Math.min(i + args.batch, plans.length)}/${plans.length} · ${chunksWritten} chunks · ${errors.length} errors`,
    )
  }

  const report = {
    run_id: runId,
    dry_run: args.dryRun,
    embedding_model: EMBEDDING_MODEL,
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
