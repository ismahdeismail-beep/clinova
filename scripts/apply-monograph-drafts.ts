// Apply drug-monograph content drafts to the `drug_monographs` table.
//
// Reads drafts/monographs/*.json (produced by the authoring agents) and upserts
// the sourced fields onto the matching row. Conservative by design:
//   - matches a row by `existing_id` (uuid) then by `name`; never inserts new rows.
//   - only overwrites a field when the draft carries a non-null value (merge,
//     don't clobber): an unsourced (null) draft field leaves the DB value alone.
//   - refuses to overwrite a row whose content_status is 'verified' unless
//     --force is passed.
//   - sets content_status='needs_review' + a note + updated_at on every apply.
//
// Usage:
//   npx tsx scripts/apply-monograph-drafts.ts --dry-run            # preview only
//   npx tsx scripts/apply-monograph-drafts.ts                       # apply all
//   npx tsx scripts/apply-monograph-drafts.ts --only "5-Fluorouracil"
//   npx tsx scripts/apply-monograph-drafts.ts --limit 5 --force
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const force = args.includes('--force')
const onlyIdx = args.indexOf('--only')
const only = onlyIdx >= 0 ? args[onlyIdx + 1] : null
const limitIdx = args.indexOf('--limit')
const limit = limitIdx >= 0 ? Number(args[limitIdx + 1]) : Infinity

// Draft field -> DB column mapping. Keep in sync with the draft shape.
const FIELD_MAP: { draft: string; column: string }[] = [
  { draft: 'mechanism_of_action', column: 'mechanism_of_action' },
  { draft: 'indications', column: 'indications' },
  { draft: 'contraindications', column: 'contraindications' },
  { draft: 'side_effects', column: 'side_effects' },
  { draft: 'dosage', column: 'dosage' },
  { draft: 'adult_dosing', column: 'adult_dosing' },
  { draft: 'pediatric_dosing', column: 'pediatric_dosing' },
  { draft: 'interactions', column: 'interactions' },
  { draft: 'monitoring', column: 'monitoring' },
  { draft: 'patient_counselling', column: 'patient_counselling' },
  { draft: 'warnings', column: 'warnings' },
  { draft: 'precautions', column: 'precautions' },
  { draft: 'serious_adverse_reactions', column: 'serious_adverse_reactions' },
  { draft: 'food_interactions', column: 'food_interactions' },
  { draft: 'pregnancy_category', column: 'pregnancy_category' },
  { draft: 'pregnancy_guidance', column: 'pregnancy_guidance' },
  { draft: 'lactation_guidance', column: 'lactation_guidance' },
  { draft: 'overdose', column: 'overdose' },
  { draft: 'pharmacokinetics', column: 'pharmacokinetics' },
  { draft: 'clinical_pearls', column: 'clinical_pearls' },
  { draft: 'brand_names', column: 'brand_names' },
  { draft: 'black_box_warnings', column: 'black_box_warnings' },
  { draft: 'renal_dose_adjustment', column: 'renal_dose_adjustment' },
  { draft: 'hepatic_dose_adjustment', column: 'hepatic_dose_adjustment' },
  { draft: 'administration_instructions', column: 'administration_instructions' },
]

interface Draft {
  name: string
  existing_id?: string | null
  content_status: string
  fields: Record<string, any>
  sources?: { field: string; ref: string; url?: string }[]
  unsourced_fields?: string[]
  notes?: string
}

interface Row {
  id: string
  name: string
  content_status: string
}

async function withRetry<T>(fn: () => PromiseLike<T>, label: string): Promise<T> {
  let last: any
  for (let i = 0; i < 3; i++) {
    try {
      return await fn()
    } catch (e) {
      last = e
      console.warn(`  retry ${i + 1}/3 for ${label}: ${(e as Error)?.message ?? e}`)
      await new Promise((r) => setTimeout(r, 5000))
    }
  }
  throw last
}

function nonNull(v: any): boolean {
  if (v === null || v === undefined) return false
  if (Array.isArray(v)) return v.length > 0 || v.length === 0
  // treat empty arrays as intentional ("none") — still a sourced statement
  return true
}

function validateDraft(d: any): string | null {
  if (!d || typeof d !== 'object') return 'not an object'
  if (typeof d.name !== 'string' || !d.name.trim()) return 'missing name'
  if (d.content_status !== 'needs_review')
    return `content_status must be needs_review (got ${d.content_status})`
  if (!d.fields || typeof d.fields !== 'object') return 'missing fields'
  if (!Array.isArray(d.sources)) return 'sources must be an array'
  for (const { draft } of FIELD_MAP) {
    if (!(draft in d.fields)) return `missing field: ${draft}`
  }
  return null
}

async function findRow(draft: Draft): Promise<Row | null> {
  if (draft.existing_id) {
    const { data, error } = await withRetry(
      () =>
        admin
          .from('drug_monographs')
          .select('id, name, content_status')
          .eq('id', draft.existing_id!)
          .maybeSingle(),
      `find by id ${draft.existing_id}`,
    )
    if (error) throw new Error(error.message)
    if (data) return data as Row
  }
  const { data, error } = await withRetry(
    () =>
      admin
        .from('drug_monographs')
        .select('id, name, content_status')
        .eq('name', draft.name)
        .maybeSingle(),
    `find by name ${draft.name}`,
  )
  if (error) throw new Error(error.message)
  return (data as Row) ?? null
}

async function main() {
  const dir = resolve(process.cwd(), 'drafts/monographs')
  const files = readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()

  let selected = files
  if (only)
    selected = selected.filter(
      (f) =>
        f
          .replace(/\.json$/, '')
          .replace(/-/g, ' ')
          .toLowerCase() === only.toLowerCase().replace(/-/g, ' '),
    )
  if (Number.isFinite(limit)) selected = selected.slice(0, limit)

  console.log(
    `[apply-drafts] ${dryRun ? 'DRY RUN — ' : ''}${selected.length} draft(s) selected${only ? ` (only=${only})` : ''}`,
  )

  const stats = { applied: 0, skippedVerified: 0, notFound: 0, failed: 0, fieldsWritten: 0 }

  for (const file of selected) {
    const path = resolve(dir, file)
    let draft: Draft
    try {
      draft = JSON.parse(readFileSync(path, 'utf8'))
    } catch (e) {
      console.error(`  [${file}] invalid JSON: ${(e as Error).message}`)
      stats.failed++
      continue
    }
    const verr = validateDraft(draft)
    if (verr) {
      console.error(`  [${file}] invalid draft: ${verr}`)
      stats.failed++
      continue
    }

    let row: Row | null
    try {
      row = await findRow(draft)
    } catch (e) {
      console.error(`  [${draft.name}] lookup failed: ${(e as Error).message}`)
      stats.failed++
      continue
    }
    if (!row) {
      console.error(`  [${draft.name}] NOT FOUND in drug_monographs — skipped`)
      stats.notFound++
      continue
    }
    if (row.content_status === 'verified' && !force) {
      console.log(`  [${draft.name}] skipped (status=verified; pass --force to overwrite)`)
      stats.skippedVerified++
      continue
    }

    // build merge payload
    const payload: Record<string, any> = {}
    const written: string[] = []
    for (const { draft: dk, column: col } of FIELD_MAP) {
      const v = draft.fields[dk]
      if (nonNull(v)) {
        payload[col] = v
        written.push(col)
      }
    }
    payload.content_status = 'needs_review'
    payload.content_status_note =
      'Drug-specific draft applied from drafts/monographs/*.json (sourced from FDA/DailyMed label). Awaiting verification.'
    payload.content_status_updated_at = new Date().toISOString()

    const before = row.content_status
    if (dryRun) {
      console.log(
        `  [${draft.name}] (id ${row.id}) DRY: would update ${written.length} fields (${written.join(', ')}) [${before} -> needs_review]`,
      )
      stats.applied++
      stats.fieldsWritten += written.length
      continue
    }

    const { error } = await withRetry(
      () => admin.from('drug_monographs').update(payload).eq('id', row!.id),
      `update ${draft.name}`,
    )
    if (error) {
      console.error(`  [${draft.name}] update failed: ${error.message}`)
      stats.failed++
      continue
    }
    console.log(`  [${draft.name}] applied ${written.length} fields [${before} -> needs_review]`)
    stats.applied++
    stats.fieldsWritten += written.length
  }

  console.log('')
  console.log('[apply-drafts] summary')
  console.log(`  applied          : ${stats.applied}`)
  console.log(`  skipped (verified): ${stats.skippedVerified}`)
  console.log(`  not found        : ${stats.notFound}`)
  console.log(`  failed           : ${stats.failed}`)
  console.log(`  fields written   : ${stats.fieldsWritten}`)
  if (dryRun) console.log('  (dry run — no writes performed)')
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
