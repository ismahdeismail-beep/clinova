/**
 * ensure-rag.ts — populate `knowledge_chunks` with embedded, retrievable
 * chunks for the RAG corpora: every drug monograph (source='monograph') and,
 * optionally, Standard Treatment Guideline markdown (source='stg'), so the
 * WhatsApp bot / RAG tutor can ground answers in the catalogue + guidelines.
 *
 * Design notes
 * ------------
 * - Idempotent: every run gets a `run_id` (UTC timestamp) and upserts on
 *   (source, source_ref, chunk_index) — added in migration 00021. Re-running
 *   only rewrites the same rows. For monographs `source_ref` is the monograph
 *   id; for STG docs it is the markdown filename slug.
 * - Batched embeddings: reuses `embedTexts` from src/server/aiRouter.ts
 *   (model = EMBEDDING_MODEL there, locked to 768-dim). Free-tier embedding
 *   caps, verified empirically 2026-10-12: daily = 1000 REQUESTS/day per model
 *   (a batch counts as ONE request), per-minute = 100 TEXTS/min per model. So
 *   batches should be large (--embed-batch 100) and paced ~60s apart.
 * - Resumable: `--only-missing` skips documents that already have chunks, so
 *   an interrupted or quota-throttled run can continue the next day.
 * - Zero external CLIs: no psql/jq required.
 * - Emits a JSON report to logs/rag-status-YYYYMMDD.json + console summary.
 *
 * STG documents
 * -------------
 * Markdown files under `src/data/essentialMedicine/` (override with --stg-dir):
 * YAML front-matter (title, category, atcCode, lastUpdated, sourceMonograph …),
 * an H1 title, then one `## Section` per chunk (e.g. "## Dosage"). Files whose
 * names start with `_` and README.md are ignored (templates/docs, not content).
 *
 * Usage
 * -----
 *   npx tsx scripts/ensure-rag.ts [--dry-run] [--limit N] [--batch N] [--embed-batch N] [--reset] [--only-missing] [--pace-ms N] [--stg-dir PATH] [--no-stg] [--reembed NAMES] [--reembed-drafts]
 *
 *   --batch N        documents flushed per upsert (default 50)
 *   --embed-batch N  texts per embedding request, max 100 (default 100)
 *   --reset          delete all existing knowledge_chunks first (model switch)
 *   --only-missing   only embed documents with no chunks yet (resume)
 *   --pace-ms N      sleep between embedding batches (default 60000 = 100 texts/min)
 *   --stg-dir PATH   STG markdown directory (default src/data/essentialMedicine)
 *   --no-stg         skip the STG corpus entirely
 *
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY
 */
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { embedTexts, EMBEDDING_MODEL } from '../src/server/aiRouter.js'
import { buildStgChunks, type StgDoc } from '../src/server/stgMarkdown.js'
import {
  buildChunks,
  contentHash,
  decideIngest,
  prioritizeChanged,
  type Chunk,
  type Monograph,
} from '../src/server/ingestChunks.js'

interface Args {
  dryRun: boolean
  limit: number | null
  batch: number
  embedBatch: number
  reset: boolean
  onlyMissing: boolean
  paceMs: number
  includeStg: boolean
  stgDir: string
  reembed: string[]
  reembedDrafts: boolean
}

/** One upsert target: a monograph or an STG document. */
interface DocRow {
  source: 'monograph' | 'stg'
  /** monograph id (monographs) or filename slug (stg). */
  sourceRef: string
  /** Human label for logs/reports. */
  label: string
  /** NULL for non-drug corpora. */
  monographId: string | null
  /** Fingerprint of the chunk texts, so a changed monograph can be detected. */
  contentHash: string
  chunks: Chunk[]
  error?: string
  /** Failed with a throttle (429) — worth one more attempt. */
  throttled?: boolean
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    dryRun: false,
    limit: null,
    batch: 50,
    embedBatch: 100,
    reset: false,
    onlyMissing: false,
    paceMs: 60000,
    includeStg: true,
    stgDir: resolve(process.cwd(), 'src', 'data', 'essentialMedicine'),
    reembed: [],
    reembedDrafts: false,
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dry-run') args.dryRun = true
    else if (a === '--reset') args.reset = true
    else if (a === '--only-missing') args.onlyMissing = true
    else if (a === '--no-stg') args.includeStg = false
    else if (a === '--limit') args.limit = Number(argv[++i]) || null
    else if (a === '--batch') args.batch = Number(argv[++i]) || 50
    else if (a === '--embed-batch') args.embedBatch = Math.min(Number(argv[++i]) || 100, 100)
    else if (a === '--pace-ms') args.paceMs = Math.max(Number(argv[++i]) || 60000, 0)
    else if (a === '--stg-dir') args.stgDir = resolve(process.cwd(), argv[++i] || '.')
    else if (a === '--reembed')
      args.reembed = (argv[++i] || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    else if (a === '--reembed-drafts') args.reembedDrafts = true
  }
  return args
}

// STG markdown parsing lives in src/server/stgMarkdown.ts (unit-tested).

/** Load + chunk every content markdown file in the STG directory. */
function loadStgDocs(dir: string): StgDoc[] {
  if (!existsSync(dir)) return []
  const docs: StgDoc[] = []
  for (const name of readdirSync(dir).sort()) {
    if (!name.endsWith('.md')) continue
    if (name.startsWith('_') || name.toLowerCase() === 'readme.md') continue
    const doc = buildStgChunks(readFileSync(resolve(dir, name), 'utf8'), name.replace(/\.md$/, ''))
    if (doc.chunks.length) docs.push(doc)
  }
  return docs
}

function todayStamp(d = new Date()): string {
  return d.toISOString().slice(0, 10).replace(/-/g, '')
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

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

  // --reembed / --reembed-drafts: force these monographs to be re-embedded even
  // when --only-missing would skip them (their content changed after the first
  // ingest). Their stale chunks are deleted before embedding so a shorter new
  // version cannot leave orphaned high-index chunks behind.
  const reembedSet = new Set<string>(args.reembed)
  if (args.reembedDrafts) {
    const draftDir = resolve(process.cwd(), 'drafts', 'monographs')
    if (existsSync(draftDir)) {
      for (const f of readdirSync(draftDir).filter((x) => x.endsWith('.json'))) {
        try {
          const d = JSON.parse(readFileSync(resolve(draftDir, f), 'utf8'))
          if (typeof d?.name === 'string') reembedSet.add(d.name)
        } catch {
          /* skip malformed draft */
        }
      }
    }
  }
  if (reembedSet.size) {
    console.log(
      `[ensure-rag] --reembed: ${reembedSet.size} monograph(s) will be re-embedded ` +
        `(${[...reembedSet].slice(0, 6).join(', ')}${reembedSet.size > 6 ? '…' : ''})`,
    )
  }

  const monographDocs: DocRow[] = targets.map((row) => {
    const chunks = buildChunks(row)
    return {
      source: 'monograph',
      sourceRef: row.id,
      label: row.name,
      monographId: row.id,
      contentHash: contentHash(chunks),
      chunks,
    }
  })

  const stgDocs: DocRow[] = args.includeStg
    ? loadStgDocs(args.stgDir).map((d) => ({
        source: 'stg',
        sourceRef: d.slug,
        label: d.title,
        monographId: null,
        contentHash: contentHash(d.chunks),
        chunks: d.chunks,
      }))
    : []

  let docs = [...monographDocs, ...stgDocs]

  if (args.onlyMissing && !args.dryRun) {
    // Page every row: PostgREST truncates an unbounded select at max-rows
    // (Supabase default 1000 — even .limit(100000)), so an un-paged read stops
    // seeing coverage once the table outgrows it and re-embeds settled docs.
    const have = new Set<string>()
    const storedHash = new Map<string, string>()
    const pageSize = 1000
    for (let from = 0; ; from += pageSize) {
      const { data: page, error: existsErr } = await supabase
        .from('knowledge_chunks')
        .select('source, source_ref, metadata')
        .order('id', { ascending: true })
        .range(from, from + pageSize - 1)
      if (existsErr) {
        console.error(
          `ERROR reading existing chunks (is migration 00021 applied?): ${existsErr.message}`,
        )
        process.exit(1)
      }
      for (const r of (page ?? []) as { source: string; source_ref: string; metadata?: any }[]) {
        const key = `${r.source}:${r.source_ref}`
        have.add(key)
        const h = r.metadata?.content_hash
        if (typeof h === 'string' && !storedHash.has(key)) storedHash.set(key, h)
      }
      if (!page || page.length < pageSize) break
    }
    console.log(`[ensure-rag] --only-missing: ${have.size} documents already in knowledge_chunks`)
    const before = docs.length
    const { selected } = decideIngest(docs, have, storedHash, reembedSet)
    docs = selected
    console.log(
      `[ensure-rag] --only-missing: ${before} → ${docs.length} documents to embed ` +
        `(${docs.filter((d) => d.source === 'monograph').length} monographs, ` +
        `${docs.filter((d) => d.source === 'stg').length} stg)`,
    )
  }

  // Prioritise changed documents: their current corpus text is known-wrong, and
  // they are few, so they win the daily quota over not-yet-covered documents.
  if (reembedSet.size) {
    const changed = docs.filter((d) => d.source === 'monograph' && reembedSet.has(d.label))
    docs = prioritizeChanged(docs, reembedSet)
    if (changed.length) {
      console.log(`[ensure-rag] prioritising ${changed.length} changed monograph(s) for embedding`)
    }
  }

  // --- Build all chunks up front ------------------------------------------
  const plans: DocRow[] = []
  const missing: string[] = []
  for (const d of docs) {
    if (d.chunks.length === 0) missing.push(d.label)
    else plans.push(d)
  }
  const totalChunks = plans.reduce((n, p) => n + p.chunks.length, 0)
  const stgPlanned = plans.filter((p) => p.source === 'stg').length

  console.log(
    `[ensure-rag] run ${runId} — ${plans.length} documents with chunks ` +
      `(${plans.length - stgPlanned} monographs + ${stgPlanned} stg), ` +
      `${totalChunks} chunks, ${missing.length} empty${args.dryRun ? ' (dry run)' : ''}`,
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

  // --- Embed in batches across documents ----------------------------------
  const errors: { document: string; error: string }[] = []
  let quotaSkipped = 0
  let embeddedOk = 0
  let attempted = 0

  /**
   * Embed every chunk of `targetPlans`. Returns false when the daily quota is
   * exhausted (the caller must stop); failed documents are marked on the plan
   * itself (`p.error`), and throttled ones are flagged for a second pass.
   */
  const embedPass = async (targetPlans: DocRow[]): Promise<boolean> => {
    const items: { plan: DocRow; chunk: Chunk }[] = []
    for (const p of targetPlans) for (const c of p.chunks) items.push({ plan: p, chunk: c })
    if (!items.length) return true

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
        embeddedOk += slice.length
      } catch (e: any) {
        // Daily-quota exhaustion — nothing retryable today; stop and leave the
        // rest for a later run (--only-missing will resume them).
        if (e?.status === 429 && e?.retryDelayMs > 90_000) {
          const rest = items.slice(i)
          const affected = [...new Set(rest.map((x) => x.plan))]
          for (const p of affected) {
            p.error = `quota-skipped: retry in ${Math.round(e.retryDelayMs / 60000)}m`
            errors.push({
              document: p.label,
              error: 'quota-skipped: daily embedding quota exhausted',
            })
          }
          quotaSkipped = rest.length
          console.error(
            `[ensure-rag] DAILY QUOTA EXHAUSTED — embedded ${embeddedOk}/${attempted + slice.length} chunks, ` +
              `${quotaSkipped} chunks left for the next run (--only-missing).`,
          )
          return false
        }
        const labels = [...new Set(slice.map((x) => x.plan.label))]
        const msg = (e as Error).message
        const throttled = e?.status === 429
        for (const p of slice.map((x) => x.plan)) {
          if (!p.error) p.error = msg
          if (throttled) p.throttled = true
          errors.push({ document: p.label, error: msg })
        }
        console.error(
          `[ensure-rag] embed batch failed for: ${labels.join(', ')} — ${msg.slice(0, 80)}`,
        )
      }
      done += slice.length
      attempted += slice.length
      if ((i / args.embedBatch) % 5 === 0 || done === items.length) {
        console.log(`[ensure-rag] embedded ${embeddedOk}/${attempted} chunks`)
      }
      if (args.paceMs > 0 && i + args.embedBatch < items.length) await sleep(args.paceMs)
    }
    return true
  }

  if (!args.dryRun && totalChunks > 0) {
    const complete = await embedPass(plans)
    // A quota window can roll over mid-run, so a batch throttled at the start
    // may succeed minutes later. Retry the throttled documents once — otherwise
    // the prioritised (changed) documents are starved by a transient 429 and
    // only get another chance 20h later, when the cron stamp allows a run.
    const throttled = complete ? plans.filter((p) => p.throttled) : []
    if (throttled.length) {
      console.log(`[ensure-rag] retrying ${throttled.length} throttled document(s) after a pause…`)
      for (const p of throttled) {
        p.error = undefined
        p.throttled = false
      }
      const errMark = errors.length
      await sleep(60_000)
      errors.length = errMark
      await embedPass(throttled)
    }
  }

  // --- Upsert per document (skip those whose embedding failed) -------------
  let chunksWritten = 0
  let docsProcessed = 0
  for (let i = 0; i < plans.length; i += args.batch) {
    const group = plans.slice(i, i + args.batch)
    const rows: Record<string, unknown>[] = []
    for (const p of group) {
      if (p.error) continue
      p.chunks.forEach((c, idx) => {
        rows.push({
          monograph_id: p.monographId,
          source: p.source,
          source_ref: p.sourceRef,
          chunk_index: idx,
          chunk_text: c.text,
          embedding: args.dryRun ? null : c.embedding,
          embedding_model: EMBEDDING_MODEL,
          run_id: runId,
          metadata: { section: c.section, source: p.source, content_hash: p.contentHash },
        })
      })
    }
    if (args.dryRun) {
      chunksWritten += rows.length
      docsProcessed += group.filter((g) => !g.error).length
      continue
    }
    if (rows.length) {
      const { error } = await supabase
        .from('knowledge_chunks')
        .upsert(rows, { onConflict: 'source,source_ref,chunk_index' })
      if (error) {
        for (const p of group)
          if (!p.error) errors.push({ document: p.label, error: error.message })
      } else {
        chunksWritten += rows.length
        docsProcessed += group.filter((g) => !g.error).length
        // For re-embedded monographs, drop orphaned high-index chunks left by a
        // previous (longer) version so stale sections cannot linger.
        if (reembedSet.size) {
          for (const p of group) {
            if (p.error || p.source !== 'monograph' || !reembedSet.has(p.label)) continue
            const { error: delErr } = await supabase
              .from('knowledge_chunks')
              .delete()
              .eq('source', 'monograph')
              .eq('source_ref', p.sourceRef)
              .gte('chunk_index', p.chunks.length)
            if (delErr)
              console.warn(`[ensure-rag] orphan cleanup failed for ${p.label}: ${delErr.message}`)
          }
        }
      }
    }
    console.log(
      `[ensure-rag] upsert ${Math.min(i + args.batch, plans.length)}/${plans.length} · ${chunksWritten} chunks · ${errors.length} errors`,
    )
  }

  const report = {
    run_id: runId,
    dry_run: args.dryRun,
    only_missing: args.onlyMissing,
    reembed: reembedSet.size,
    pace_ms: args.paceMs,
    embedding_model: EMBEDDING_MODEL,
    generated_at: new Date().toISOString(),
    monographs_total: monographs.length,
    documents_processed: docsProcessed,
    stg_documents: stgDocs.length,
    documents_missing_chunks: missing,
    chunks_written: chunksWritten,
    chunks_embedded: embeddedOk,
    chunks_attempted: attempted,
    chunks_quota_skipped: quotaSkipped,
    errors,
  }
  const reportPath = resolve(process.cwd(), 'logs', `rag-status-${todayStamp()}.json`)
  mkdirSync(dirname(reportPath), { recursive: true })
  writeFileSync(reportPath, JSON.stringify(report, null, 2))

  console.log(
    `[ensure-rag] done — ${docsProcessed} documents, ${chunksWritten} chunks, ` +
      `${missing.length} without chunks, ${errors.length} errors, ${quotaSkipped} quota-skipped. ` +
      `Report: ${reportPath}`,
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
