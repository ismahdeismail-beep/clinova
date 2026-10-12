/**
 * import-cases.ts — bulk-insert clinical case Q&As into bot_training_cases.
 *
 * Replaces the old bash+psql version: parses real RFC-4180 CSV (quoted
 * commas / escaped quotes / embedded newlines), validates rows, and upserts
 * through the Supabase REST client with duplicate suppression (works with the
 * expression unique index on lower(query) via Prefer: resolution=ignore-duplicates).
 *
 * Usage:
 *   npx tsx scripts/import-cases.ts data/clinical-cases-starter.csv [--dry-run] [--batch 200]
 *
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (same as ensure-rag).
 */
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

interface CaseRow {
  query: string
  category: string
  source_monograph_id: string | null
  expected_answer: string
}

const CATEGORIES = new Set(['dosage', 'side-effect', 'interaction', 'contra-indication', 'other'])
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function parseArgs(argv: string[]) {
  const args = { dryRun: false, batch: 200 }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dry-run') args.dryRun = true
    else if (a === '--batch') args.batch = Number(argv[++i]) || 200
  }
  return args
}

/** Minimal RFC-4180 parser: honours quoted fields ("a,b"), escaped quotes (""), CRLF. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else inQuotes = false
      } else field += ch
    } else if (ch === '"') inQuotes = true
    else if (ch === ',') {
      row.push(field)
      field = ''
    } else if (ch === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (ch !== '\r') field += ch
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ''))
}

function todayStamp(d = new Date()): string {
  return d.toISOString().slice(0, 10).replace(/-/g, '')
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const csvPath = process.argv[2]
  if (!csvPath) {
    console.error('Usage: npx tsx scripts/import-cases.ts <cases.csv> [--dry-run] [--batch N]')
    process.exit(1)
  }
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error('ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.')
    process.exit(1)
  }

  const text = readFileSync(csvPath, 'utf8')
  const cells = parseCsv(text)
  if (cells.length < 2) {
    console.error(`ERROR: no data rows in ${csvPath} (need a header + rows).`)
    process.exit(1)
  }

  const header = cells[0].map((h) => h.trim().toLowerCase())
  const idx = (name: string) => header.indexOf(name)
  const iQuery = idx('query')
  const iCat = idx('category')
  const iMono = idx('source_monograph_id')
  const iAnswer = idx('expected_answer')
  if ([iQuery, iCat, iMono, iAnswer].includes(-1)) {
    console.error(
      `ERROR: CSV header must include query, category, source_monograph_id, expected_answer (got: ${header.join(', ')})`,
    )
    process.exit(1)
  }

  const rows: CaseRow[] = []
  const skipped: { line: number; reason: string }[] = []
  for (let i = 1; i < cells.length; i++) {
    const r = cells[i]
    const query = (r[iQuery] ?? '').trim()
    const category = (r[iCat] ?? '').trim()
    const monoRaw = (r[iMono] ?? '').trim()
    const expected = (r[iAnswer] ?? '').trim()
    if (query && category && expected) {
      rows.push({
        query,
        category,
        source_monograph_id: monoRaw && UUID_RE.test(monoRaw) ? monoRaw : null,
        expected_answer: expected,
      })
    }
    if (!query || !expected)
      skipped.push({ line: i + 1, reason: 'missing query or expected_answer' })
    else if (!CATEGORIES.has(category))
      skipped.push({ line: i + 1, reason: `invalid category '${category}'` })
    else if (monoRaw && !UUID_RE.test(monoRaw))
      skipped.push({ line: i + 1, reason: `invalid UUID '${monoRaw}' (imported as NULL)` })
  }

  console.log(
    `[import-cases] ${rows.length} valid rows from ${cells.length - 1} data rows${args.dryRun ? ' (dry run)' : ''}`,
  )
  if (skipped.length) {
    console.log(`[import-cases] skipped: ${skipped.length}`)
    for (const s of skipped.slice(0, 10)) console.log(`  line ${s.line}: ${s.reason}`)
  }
  if (!rows.length) process.exit(1)

  const supabase = createClient(url, key, { auth: { persistSession: false } })

  // Determine which queries already exist (case-insensitive) so the report can
  // distinguish inserts from skips — the upsert response can't tell us.
  const { data: existing, error: existErr } = await supabase
    .from('bot_training_cases')
    .select('query')
  if (existErr) {
    console.error(`ERROR reading existing cases: ${existErr.message}`)
    process.exit(1)
  }
  const seen = new Set((existing ?? []).map((r: { query: string }) => r.query.trim().toLowerCase()))

  let inserted = 0
  let duplicates = 0
  let errors = 0
  const errorRows: { query: string; error: string }[] = []
  const fresh: CaseRow[] = []
  for (const r of rows) {
    const k = r.query.trim().toLowerCase()
    if (seen.has(k)) {
      duplicates++
      continue
    }
    seen.add(k)
    fresh.push(r)
  }

  for (let from = 0; from < fresh.length; from += args.batch) {
    const slice = fresh.slice(from, from + args.batch)
    if (args.dryRun) {
      inserted += slice.length
      continue
    }
    const { error } = await supabase
      .from('bot_training_cases')
      .upsert(slice, { ignoreDuplicates: true })
    if (error) {
      errors += slice.length
      errorRows.push({ query: slice[0].query, error: error.message })
    } else inserted += slice.length
  }

  const report = {
    dry_run: args.dryRun,
    generated_at: new Date().toISOString(),
    csv: csvPath,
    rows_total: rows.length,
    inserted,
    duplicates,
    errors,
    skipped: skipped.length,
    error_rows: errorRows,
  }
  const reportPath = resolve(process.cwd(), 'logs', `import-cases-${todayStamp()}.json`)
  mkdirSync(dirname(reportPath), { recursive: true })
  writeFileSync(reportPath, JSON.stringify(report, null, 2))

  console.log(
    `[import-cases] done — ${inserted} inserted, ${duplicates} duplicates skipped, ${errors} errors. Report: ${reportPath}`,
  )
  if (errors) process.exit(1)
}

main().catch((e) => {
  console.error(`[import-cases] fatal: ${e?.message ?? e}`)
  process.exit(1)
})
