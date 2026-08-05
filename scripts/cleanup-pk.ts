// Normalize raw FDA-scraped pharmacokinetics text into clean prose.
//
// Problems fixed across all monographs:
//   1. FDA section-number prefixes ("12.3 Pharmacokinetics …")
//   2. Embedded label sub-heads duplicated by the renderer's ADME grouping
//      ("Absorption Allopurinol tablets …" → "Allopurinol tablets …")
//   3. "Drug Interaction Studies" blocks scraped into PK (not kinetics)
//   4. Mid-text FDA section numbers ("8.6 Special Populations" → "Special Populations")
//
// Dry-run by default; pass --apply to write. Idempotent — re-running is safe.
// Usage: npx tsx scripts/cleanup-pk.ts [--apply]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const APPLY = process.argv.includes('--apply')
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

function isBoilerplate(text: string): boolean {
  return /^(refer to current|consult current|seek immediate)/i.test(text.trim())
}

// Strip leading FDA section number + title ("12.3 Pharmacokinetics",
// "CLINICAL PHARMACOLOGY" without a number on old SPL labels)
const LEAD_PREFIX =
  /^\s*(?:\d+(?:\.\d+){0,2}\s+)?(?:Pharmacokinetics|CLINICAL PHARMACOLOGY|PHARMACOKINETICS)\s*/i

// Embedded ADME label heads at the start of a subsection (capitalized, followed
// by a capital letter). Handles combos: "Absorption and Distribution ",
// "Absorption/Bioavailability ", "Elimination ".
const ADME_HEAD =
  /\b(?:Absorption|Distribution|Metabolism|Elimination|Excretion)(?:\s+and\s+(?:Distribution|Metabolism|Elimination|Excretion))?(?:\s*[\/,]\s*(?:Bioavailability|Distribution|Excretion))?\s+(?=[A-Z])/g

// Mid-text FDA section numbers on informative subsection heads
const SECTION_NUMBER =
  /\b\d+(?:\.\d+){1,2}\s+(?:Special Populations|Specific Populations|Renal Impairment|Hepatic Impairment|Pediatric|Geriatric|Pediatric Use|Geriatric Use|Drug Interaction Studies|Pharmacokinetics|Absorption|Distribution|Metabolism|Elimination|Excretion)\b/gi

// Drug Interaction Studies block — everything from the phrase to the end of the
// text (in scraped labels it is the trailing subsection).
const DRUG_INTERACTION_STUDIES = /\s*Drug Interaction Studies\b.*$/i

// FDA scrapes sometimes carry numeric table dumps ("Table 8 … 155 115 83 …").
// Drop sentences that are mostly numbers/spaces.
const TABLE_JUNK = /^\s*(?:table\s+\d+|dose\/route|\d+(?:\.\d+)?\s+\d+)/i

function cleanPk(pk: string): string {
  let t = pk.trim()
  if (!t || isBoilerplate(t)) return t

  // Some labels merge the whole "12 CLINICAL PHARMACOLOGY" (12.1 Mechanism of
  // Action … 12.3 Pharmacokinetics …) into the PK field — cut everything
  // before the Pharmacokinetics section word.
  if (/^\s*\d+(?:\.\d+){0,2}\s+Mechanism of Action\b/i.test(t)) {
    const pkIdx = t.search(/\bPharmacokinetics\b/i)
    if (pkIdx > 0) t = t.slice(pkIdx)
  }

  // 1. Leading section number + title
  t = t.replace(LEAD_PREFIX, '')

  // 2. Drug Interaction Studies trailing block
  t = t.replace(DRUG_INTERACTION_STUDIES, '')

  // 3. Embedded ADME label heads
  t = t.replace(ADME_HEAD, '')

  // 4. Mid-text FDA section numbers (keep the header words)
  t = t.replace(SECTION_NUMBER, (m) => m.replace(/^\s*\d+(?:\.\d+){1,2}\s+/i, ''))

  // 5. Drop table-junk sentences
  t = t
    .split(/(?<=[.;])\s+/)
    .filter((s) => !TABLE_JUNK.test(s.trim()))
    .join(' ')

  // 6. Collapse whitespace
  t = t.replace(/\s+/g, ' ').trim()

  // If the cleaned text is empty or junk, fall back to the original trim
  return t.length < 30 ? pk.trim() : t
}

async function main() {
  const all: any[] = []
  let from = 0
  for (let i = 0; i < 80; i++) {
    const { data, error } = await admin
      .from('drug_monographs')
      .select('id, name, pharmacokinetics')
      .range(from, from + 999)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    from += 1000
    if (data.length < 1000) break
  }

  let changed = 0
  let skippedBoiler = 0
  const examples: string[] = []
  const updates: { id: string; pk: string }[] = []

  for (const r of all) {
    const pk = (r.pharmacokinetics || '').trim()
    if (!pk) continue
    if (isBoilerplate(pk)) {
      // Leave boilerplate rows alone — they need FDA re-enrichment, not cleanup.
      skippedBoiler++
      continue
    }
    const cleaned = cleanPk(pk)
    if (cleaned !== pk) {
      changed++
      updates.push({ id: r.id, pk: cleaned })
      if (examples.length < 3) examples.push(`${r.name}: "${pk.slice(0, 90)}" → "${cleaned.slice(0, 90)}"`)
    }
  }

  console.log(`monographs scanned: ${all.length}`)
  console.log(`rows needing cleanup: ${changed}`)
  console.log(`boilerplate PK left for enrichment: ${skippedBoiler}`)
  for (const ex of examples) console.log('\n' + ex)

  if (!APPLY) {
    console.log('\n[DRY RUN] pass --apply to write changes.')
    return
  }

  let ok = 0
  let fail = 0
  // Batch updates (Supabase is fast, but 1000+ sequential round-trips is not)
  for (let i = 0; i < updates.length; i += 20) {
    const batch = updates.slice(i, i + 20)
    const results = await Promise.all(
      batch.map((u) =>
        admin.from('drug_monographs').update({ pharmacokinetics: u.pk }).eq('id', u.id),
      ),
    )
    for (const r of results) {
      if (r.error) {
        fail++
        console.log(`[ERR] ${r.error.message}`)
      } else {
        ok++
      }
    }
    if ((i + 20) % 100 === 0) console.log(`  …${ok + fail}/${updates.length}`)
  }
  console.log(`\n[done] updated=${ok} failed=${fail}`)
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
