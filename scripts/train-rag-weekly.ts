/**
 * train-rag-weekly.ts — weekly RAG quality loop.
 *
 * For every approved, unreviewed training case:
 *   1. embed the query with the same model used for ingestion (EMBEDDING_MODEL, 768-dim)
 *   2. cosine-search knowledge_chunks (all of the case's monograph, else recent chunks)
 *   3. build a prompt from src/prompts/rag-prompt.md and generate with Gemini (temperature 0)
 *   4. pass = generated answer contains the expected substring (case-insensitive)
 *   5. stamp reviewed_at and record the outcome in a JSON report (logs/weekly-rag-YYYYMMDD.json)
 *
 * Replaces the old bash version: no psql, no jq, no stale model names, and
 * retrieval is semantic instead of "first 3 random chunks".
 *
 * Usage:
 *   npx tsx scripts/train-rag-weekly.ts [--limit N] [--dry-run]
 *
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY (same as ensure-rag).
 */
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { embedText, EMBEDDING_MODEL } from '../src/server/aiRouter.js'

interface Args {
  dryRun: boolean
  limit: number
}
interface CaseRow {
  id: string
  query: string
  expected_answer: string
  category: string
  source_monograph_id: string | null
}
interface ChunkRow {
  id: string
  chunk_text: string
  section: string | null
  embedding: number[]
}

function parseArgs(argv: string[]) {
  const args: Args = { dryRun: false, limit: 50 }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dry-run') args.dryRun = true
    else if (a === '--limit') args.limit = Number(argv[++i]) || 50
  }
  return args
}

function cosine(a: number[], b: number[]): number {
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

function topChunks(qEmb: number[], chunks: ChunkRow[], n = 3): ChunkRow[] {
  return chunks
    .map((c) => ({ c, sim: cosine(qEmb, c.embedding) }))
    .filter((x) => x.sim > 0)
    .sort((a, b) => b.sim - a.sim)
    .slice(0, n)
    .map((x) => x.c)
}

async function generateAnswer(prompt: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY
  if (!key) throw new Error('GEMINI_API_KEY not configured')
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0, topP: 0.1 },
      }),
    },
  )
  if (!res.ok) throw new Error(`Gemini HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const j = await res.json()
  const text: string = j?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
  if (!text.trim()) throw new Error('Gemini returned no text')
  return text
}

function todayStamp(d = new Date()): string {
  return d.toISOString().slice(0, 10).replace(/-/g, '')
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error('ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.')
    process.exit(1)
  }
  const promptsDir = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'prompts')
  const template = readFileSync(resolve(promptsDir, 'rag-prompt.md'), 'utf8')

  const supabase = createClient(url, key, { auth: { persistSession: false } })
  const { data: cases, error } = await supabase
    .from('bot_training_cases')
    .select('id, query, expected_answer, category, source_monograph_id')
    .eq('status', 'approved')
    .is('reviewed_at', null)
    .limit(args.limit)
  if (error) {
    console.error(`ERROR loading cases: ${error.message}`)
    process.exit(1)
  }
  const caseRows = (cases ?? []) as CaseRow[]
  console.log(
    `[train-rag-weekly] ${caseRows.length} approved & unreviewed cases${args.dryRun ? ' (dry run — no updates, no generation)' : ''}`,
  )

  const results: {
    case_id: string
    query: string
    category: string
    pass: boolean
    sim_top: number | null
    sections: string[]
    generated_snippet: string
    note?: string
  }[] = []
  let passed = 0
  let failed = 0
  let noChunks = 0

  for (let i = 0; i < caseRows.length; i++) {
    const c = caseRows[i]
    try {
      let qEmb: number[] | null = null
      if (!args.dryRun) qEmb = await embedText(c.query)

      const chunkQuery = supabase
        .from('knowledge_chunks')
        .select('id, chunk_text, metadata, embedding')
        // Only compare against vectors from the same model — mixing embedding
        // models in one corpus makes cosine similarity meaningless.
        .eq('embedding_model', EMBEDDING_MODEL)
        .limit(800)
      if (c.source_monograph_id) chunkQuery.eq('monograph_id', c.source_monograph_id)
      const { data: chunks } = await chunkQuery
      const chunkRows = (chunks ?? []) as (ChunkRow & { metadata: { section?: string | null } })[]

      const picks = qEmb ? topChunks(qEmb, chunkRows, 3) : chunkRows.slice(0, 3)
      if (!picks.length) {
        noChunks++
        results.push({
          case_id: c.id,
          query: c.query,
          category: c.category,
          pass: false,
          sim_top: null,
          sections: [],
          generated_snippet: '',
          note: 'no-chunks-yet (ingest still running)',
        })
        console.log(
          `[train-rag-weekly] ${i + 1}/${caseRows.length} ${c.category.padEnd(16)} no-chunks-yet`,
        )
        continue
      }

      const simTop = qEmb ? cosine(qEmb, picks[0].embedding) : null
      const sections = picks.map((p) => p.metadata?.section ?? 'unknown')
      const excerpt = picks
        .map(
          (p, idx) =>
            `[chunk ${idx + 1} · section ${p.metadata?.section ?? 'unknown'}\n${p.chunk_text}\n]`,
        )
        .join('\n\n')
      const prompt = template.replace('{{chunks}}', excerpt).replace('{{question}}', c.query)

      let generated = ''
      if (!args.dryRun) generated = await generateAnswer(prompt)
      const pass = !args.dryRun && generated.toLowerCase().includes(c.expected_answer.toLowerCase())

      if (pass) passed++
      else if (!args.dryRun) failed++

      results.push({
        case_id: c.id,
        query: c.query,
        category: c.category,
        pass,
        sim_top: simTop == null ? null : Number(simTop.toFixed(4)),
        sections,
        generated_snippet: generated.slice(0, 160),
      })
      console.log(
        `[train-rag-weekly] ${i + 1}/${caseRows.length} ${c.category.padEnd(16)} → ${pass ? 'PASS' : args.dryRun ? 'DRY' : 'FAIL'} sim=${simTop?.toFixed(3) ?? 'n/a'}`,
      )

      if (!args.dryRun) {
        await supabase
          .from('bot_training_cases')
          .update({ reviewed_at: new Date().toISOString() })
          .eq('id', c.id)
      }
    } catch (e) {
      results.push({
        case_id: c.id,
        query: c.query,
        category: c.category,
        pass: false,
        sim_top: null,
        sections: [],
        generated_snippet: '',
        note: (e as Error).message,
      })
      console.error(`[train-rag-weekly] ${c.query.slice(0, 40)}… error: ${(e as Error).message}`)
    }
  }

  const report = {
    dry_run: args.dryRun,
    generated_at: new Date().toISOString(),
    cases: caseRows.length,
    passed,
    failed,
    no_chunks_yet: noChunks,
    results,
  }
  const reportPath = resolve(process.cwd(), 'logs', `weekly-rag-${todayStamp()}.json`)
  mkdirSync(dirname(reportPath), { recursive: true })
  writeFileSync(reportPath, JSON.stringify(report, null, 2))

  console.log(
    `[train-rag-weekly] done — ${passed} pass, ${failed} fail, ${noChunks} no-chunks-yet, report: ${reportPath}`,
  )
}

main().catch((e) => {
  console.error(`[train-rag-weekly] fatal: ${e?.message ?? e}`)
  process.exit(1)
})
