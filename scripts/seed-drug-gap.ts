// Seed the drug-monograph gap: inserts the ~659 bundled catalogue drugs that
// are not yet in Supabase (salt-form variants of existing rows are skipped).
//
// Seeding strategy (matches how the original 440 were built):
//   - Core fields (indications, contraindications, side_effects, interactions,
//     dosage, monitoring, patient_counselling) come from the bundled seed text.
//   - Enrichment fields (MOA, PK, overdose, pregnancy, warnings, BBW, brands,
//     pearls) are left EMPTY so the existing enrich-monographs.ts and
//     gapfill-partials.ts pipelines fill them with genuine OpenFDA content.
//   - drug_class_id is mapped to the root drug_classes row for the bundled
//     browse category so the Drug Index categories/counts work immediately.
//
// Resumable: skips generic_names already present at start of each run.
// Usage: npx tsx scripts/seed-drug-gap.ts
// Env:   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'
import * as fs from 'fs'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\/–—\-+(),.'"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const SALT_RE =
  /\b(sodium|hydrochloride|sulfate|sulphate|fumarate|maleate|acetate|phosphate|isethionate|proxetil|fosamil|meglumine|tromethamine|diphosphate|medocaril|monohydrate|dihydrate|trihydrate|edisylate|besylate|mesylate|hydrobromide|gluconate|calcium|potassium|magnesium|zinc|nitrate|succinate|stearate|palmitate|pamoate|embonate|oleate|tartrate|citrate|lactate|napsylate)\b/i

// Bundled browse category -> canonical root class name in drug_classes.
const CATEGORY_ROOT: Record<string, string> = {
  'Anti-infectives': 'Antimicrobial agent',
  Cardiovascular: 'Cardiovascular agent',
  CNS: 'Central nervous system agent',
  Oncology: 'Antineoplastic / chemotherapeutic agent',
  Endocrine: 'Endocrine / metabolic agent',
  Analgesics: 'Analgesic agent',
  Immunology: 'Immunomodulatory / biologic agent',
  Respiratory: 'Respiratory agent',
  Gastrointestinal: 'Gastrointestinal agent',
  Dermatology: 'Dermatological agent',
  'Nutrition/Vitamins': 'Nutritional supplement / vitamin',
  Haematology: 'Therapeutic agent',
  'Renal/Electrolytes': 'Renal / electrolyte agent',
  'Toxicology/Antidotes': 'Antidote / toxicology agent',
  Ophthalmology: 'Ophthalmic agent',
  Other: 'Therapeutic agent',
}

async function fetchAll<T = any>(table: string, cols: string): Promise<T[]> {
  const out: T[] = []
  for (let from = 0; from < 60; from += 1000) {
    const { data, error } = await admin.from(table as any).select(cols).range(from, from + 999)
    if (error) throw error
    if (!data || data.length === 0) break
    out.push(...data)
    if (data.length < 1000) break
  }
  return out
}

async function main() {
  // 1) Existing DB names + generic names (dedupe guard)
  const dbRows = await fetchAll<{ generic_name: string; name: string }>('drug_monographs', 'generic_name, name')
  const dbNorm = new Set(dbRows.map((r) => norm(r.generic_name ?? '')))
  const dbNameNorm = new Set(dbRows.map((r) => norm(r.name ?? '')))
  console.log('existing monographs:', dbRows.length)

  // 2) Root class ids
  const { data: classes } = await admin.from('drug_classes').select('id, name, parent_id')
  const rootIds = new Map<string, string>()
  for (const c of classes ?? []) if (!c.parent_id) rootIds.set(c.name, c.id)
  console.log('root classes:', rootIds.size)

  // 3) Compute the gap list
  const isVariantOfDb = (name: string): boolean => {
    const n = norm(name)
    for (const dn of dbNorm) {
      if (dn === n) return true
      const nBase = n.replace(SALT_RE, '').trim()
      const dnBase = dn.replace(SALT_RE, '').trim()
      if (nBase && dnBase && nBase === dnBase) return true
    }
    return false
  }

  const missing = BUNDLED_DRUGS.filter((d) => {
    const name = (d as any).generic_name ?? (d as any).name
    if (isVariantOfDb(name)) return false
    // The `name` column has a UNIQUE constraint — skip rows whose display
    // name already exists (they are the same drug under an FDA-style
    // generic_name, e.g. 'Piperacillin/Tazobactam' → 'PIPERACILLIN SODIUM…').
    return !dbNameNorm.has(norm((d as any).name ?? ''))
  })
  console.log('new drugs to seed:', missing.length)

  // 4) Insert in batches
  const BATCH = 40
  let inserted = 0
  let skipped = 0
  let failed = 0
  const seen = new Set<string>()

  for (let i = 0; i < missing.length; i += BATCH) {
    const slice = missing.slice(i, i + BATCH)
    const rows = slice
      .map((d: any) => {
        const genericName = d.generic_name || d.name
        const key = norm(genericName)
        if (seen.has(key)) {
          skipped++
          return null
        }
        seen.add(key)
        const cat = d.drug_class_name ?? 'Other'
        const rootName = CATEGORY_ROOT[cat] ?? 'Therapeutic agent'
        const drugClassId = rootIds.get(rootName) ?? null
        return {
          name: d.name || genericName,
          generic_name: genericName,
          drug_class: rootName,
          drug_class_id: drugClassId,
          // Core seed content from bundled catalogue
          indications: d.indications ?? [],
          contraindications: d.contraindications ?? [],
          side_effects: d.side_effects ?? [],
          dosage: d.dosage ?? {},
          interactions: d.interactions ?? [],
          monitoring: d.monitoring ?? '',
          patient_counselling: d.patient_counselling ?? '',
          // Enrichment fields start empty -> filled by enrich + gapfill pipelines
          mechanism_of_action: '',
          pharmacokinetics: '',
          overdose: '',
          pregnancy_category: '',
          warnings: [],
          black_box_warnings: [],
          brand_names: [],
          clinical_pearls: [],
        }
      })
      .filter(Boolean)

    if (rows.length === 0) continue
    const { error } = await admin.from('drug_monographs').insert(rows)
    if (error) {
      failed += rows.length
      console.log(`[ERR batch ${i / BATCH + 1}]: ${error.message}`)
      continue
    }
    inserted += rows.length
    console.log(`[batch ${i / BATCH + 1}] inserted ${rows.length} (total ${inserted})`)
    await new Promise((r) => setTimeout(r, 250))
  }

  console.log(`\n[done] inserted=${inserted} skipped_dups=${skipped} failed=${failed}`)
  // Persist the list for the follow-up enrichment/image stages
  fs.writeFileSync(
    'storage/seed_gap_list.json',
    JSON.stringify(
      missing.map((d: any) => ({
        name: d.name,
        generic_name: d.generic_name || d.name,
        drug_class: CATEGORY_ROOT[d.drug_class_name ?? 'Other'] ?? 'Therapeutic agent',
        drug_class_name: d.drug_class_name,
      })),
      null,
      2,
    ),
  )
  console.log('saved storage/seed_gap_list.json')
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
