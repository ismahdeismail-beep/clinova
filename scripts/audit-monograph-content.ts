// Drug monograph content audit — scores every content field for substance and
// classifies each monograph as FULL / PARTIAL / THIN / EMPTY. Uses pagination to
// read past Supabase's 1000-row response cap.
// Usage: npx tsx scripts/audit-monograph-content.ts
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

// Core fields every monograph should have, with a "quality bar" per field.
const CORE_FIELDS: { key: string; label: string; kind: 'array' | 'text' | 'json'; minLen: number }[] = [
  { key: 'indications', label: 'indications', kind: 'array', minLen: 3 },
  { key: 'contraindications', label: 'contraindications', kind: 'array', minLen: 2 },
  { key: 'side_effects', label: 'side_effects', kind: 'array', minLen: 3 },
  { key: 'dosage', label: 'dosage', kind: 'json', minLen: 1 },
  { key: 'interactions', label: 'interactions', kind: 'array', minLen: 2 },
  { key: 'monitoring', label: 'monitoring', kind: 'text', minLen: 60 },
  { key: 'patient_counselling', label: 'patient_counselling', kind: 'text', minLen: 60 },
]

// Enrichment fields — present on fully built monographs, absent on seed-only rows.
const ENRICHED_FIELDS: { key: string; label: string; kind: 'array' | 'text' | 'json'; minLen: number }[] = [
  { key: 'mechanism_of_action', label: 'MOA', kind: 'text', minLen: 60 },
  { key: 'brand_names', label: 'brand_names', kind: 'array', minLen: 1 },
  { key: 'pregnancy_category', label: 'preg_category', kind: 'text', minLen: 1 },
  { key: 'warnings', label: 'warnings', kind: 'array', minLen: 1 },
  { key: 'overdose', label: 'overdose', kind: 'text', minLen: 60 },
  { key: 'pharmacokinetics', label: 'PK', kind: 'text', minLen: 60 },
  { key: 'black_box_warnings', label: 'black_box', kind: 'array', minLen: 1 },
  { key: 'clinical_pearls', label: 'pearls', kind: 'array', minLen: 1 },
]

function fieldScore(value: any, kind: string, minLen: number): number {
  if (value === null || value === undefined) return 0
  if (kind === 'array') {
    if (!Array.isArray(value) || value.length === 0) return 0
    // require at least minLen entries with real text (not placeholders)
    const real = value.filter((v) => typeof v === 'string' && v.trim().length > 10 && !/^(n\/a|none|tbd|todo|placeholder|unknown|pending)/i.test(v.trim()))
    return real.length >= minLen ? 1 : 0
  }
  if (kind === 'json') {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return 0
    const keys = Object.keys(value)
    if (keys.length === 0) return 0
    const hasReal = keys.some((k) => {
      const v = value[k]
      return (typeof v === 'string' && v.trim().length > 10) || (Array.isArray(v) && v.length > 0)
    })
    return hasReal ? 1 : 0
  }
  // text
  if (typeof value !== 'string') return 0
  const t = value.trim()
  if (t.length < minLen) return 0
  if (/^(n\/a|none|tbd|todo|placeholder|unknown|pending|coming soon)$/i.test(t)) return 0
  return 1
}

async function fetchAll(): Promise<any[]> {
  const all: any[] = []
  let from = 0
  for (let i = 0; i < 60; i++) {
    const { data, error } = await admin
      .from('drug_monographs')
      .select(
        'id, name, generic_name, drug_class, indications, contraindications, side_effects, dosage, interactions, monitoring, patient_counselling, mechanism_of_action, brand_names, pregnancy_category, warnings, overdose, pharmacokinetics, black_box_warnings, clinical_pearls',
      )
      .range(from, from + 999)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    from += 1000
  }
  return all
}

async function main() {
  const rows = await fetchAll()
  console.log(`total monographs: ${rows.length}\n`)

  let full = 0
  let partial = 0
  let thin = 0
  let empty = 0
  const partialList: string[] = []
  const thinList: string[] = []
  const emptyList: string[] = []

  const coreFieldStats: Record<string, { ok: number; empty: number }> = {}
  for (const f of CORE_FIELDS) coreFieldStats[f.key] = { ok: 0, empty: 0 }

  for (const r of rows) {
    const name = r.generic_name || r.name || r.id
    const coreOk = CORE_FIELDS.filter((f) => {
      const ok = fieldScore(r[f.key], f.kind, f.minLen) === 1
      coreFieldStats[f.key][ok ? 'ok' : 'empty']++
      return ok
    }).length
    const enrichedOk = ENRICHED_FIELDS.filter((f) => fieldScore(r[f.key], f.kind, f.minLen) === 1).length
    const enrichedTotal = ENRICHED_FIELDS.length

    if (coreOk === CORE_FIELDS.length && enrichedOk >= Math.ceil(enrichedTotal * 0.6)) {
      full++
    } else if (coreOk >= 5 && enrichedOk >= 2) {
      partial++
      if (partialList.length < 40) partialList.push(`${name} (core ${coreOk}/7, enrich ${enrichedOk}/8)`)
    } else if (coreOk >= 3) {
      thin++
      if (thinList.length < 40) thinList.push(`${name} (core ${coreOk}/7, enrich ${enrichedOk}/8)`)
    } else {
      empty++
      if (emptyList.length < 40) emptyList.push(`${name} (core ${coreOk}/7, enrich ${enrichedOk}/8)`)
    }
  }

  console.log('=== CLASSIFICATION ===')
  console.log(`FULL    (all core + ≥5/8 enrichment): ${full}`)
  console.log(`PARTIAL (≥5 core + ≥2 enrichment)   : ${partial}`)
  console.log(`THIN    (≥3 core)                   : ${thin}`)
  console.log(`EMPTY   (<3 core)                   : ${empty}`)

  console.log('\n=== CORE FIELD HEALTH ===')
  for (const f of CORE_FIELDS) {
    const s = coreFieldStats[f.key]
    console.log(`  ${f.label.padEnd(22)} ${String(s.ok).padStart(4)}/${rows.length} filled (${Math.round((s.ok / rows.length) * 100)}%)`)
  }

  console.log('\n=== ENRICHMENT FIELD HEALTH ===')
  for (const f of ENRICHED_FIELDS) {
    const ok = rows.filter((r) => fieldScore(r[f.key], f.kind, f.minLen) === 1).length
    console.log(`  ${f.label.padEnd(16)} ${String(ok).padStart(4)}/${rows.length} filled (${Math.round((ok / rows.length) * 100)}%)`)
  }

  if (partialList.length) console.log('\n=== PARTIAL SAMPLE ===\n' + partialList.join('\n'))
  if (thinList.length) console.log('\n=== THIN SAMPLE ===\n' + thinList.join('\n'))
  if (emptyList.length) console.log('\n=== EMPTY SAMPLE ===\n' + emptyList.join('\n'))
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
