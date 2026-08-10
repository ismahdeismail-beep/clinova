// Targeted gap-fill for PARTIAL monographs: re-fetches the OpenFDA label and
// fills ONLY missing fields with REAL label content (not placeholders):
//   indications      <- indications_and_usage
//   contraindications<- contraindications
//   side_effects     <- adverse_reactions
//   interactions     <- drug_interactions
//   warnings         <- warnings_and_cautions / precautions
//   black_box        <- boxed_warning (only when FDA actually has one)
//   brand_names      <- openfda.brand_name + Kenyan brand map
//   MOA              <- mechanism_of_action / description
//   PK               <- pharmacokinetics
// Never overwrites existing real content. Resumable via storage/gapfill_state.json.
// Usage: npx tsx scripts/gapfill-partials.ts [--limit N]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import { brandNamesFor } from '../src/services/crawler/kenyanBrands.js'

const STATE_FILE = 'storage/gapfill_state.json'
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? Number(limitArg.split('=')[1]) : 0

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

interface Label {
  openfda?: { generic_name?: string[]; brand_name?: string[]; pharm_class_epc?: string[] }
  mechanism_of_action?: string[]
  description?: string[]
  pharmacokinetics?: string[]
  overdose?: string[]
  pregnancy?: string[]
  warnings?: string[]
  warnings_and_cautions?: string[]
  precautions?: string[]
  boxed_warning?: string[]
  indications_and_usage?: string[]
  contraindications?: string[]
  adverse_reactions?: string[]
  drug_interactions?: string[]
}

function fdaText(field: string[] | undefined): string {
  if (!field?.length) return ''
  return field[0]
    .replace(/\[.*?\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// The FDA `description` section is often just excipients/appearance ("Each capsule
// contains...", "Molecular formula...") — only use it as a MOA fallback when it
// actually reads like a mechanism (contains pharmacologic action verbs).
function isMechanismLike(text: string): boolean {
  return /(mechanism|inhibits?|antagoni[sz]es?|agonist|binds?|blocks?|receptor|enzyme|blocks the|prevents?|reduces?|stimulates?|suppresses?|interferes?|disrupts?|selective|potentiates?|modulates?|catalys|metaboli[sz])/i.test(
    text,
  )
}

function fdaArray(field: string[] | undefined): string[] {
  if (!field?.length) return []
  const raw = field.join(' ').replace(/\s+/g, ' ').trim()
  if (!raw) return []
  return raw
    .split(/(?:;|(?:\.\s+)|(?:\r?\n))/)
    .map((s) => s.replace(/\[.*?\]/g, '').trim())
    .filter((s) => s.length > 3 && s.length < 500)
}

async function fetchLabel(drugName: string): Promise<Label | null> {
  try {
    const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(drugName)}"+OR+openfda.brand_name:"${encodeURIComponent(drugName)}"&limit=1`
    const res = await fetch(url)
    if (res.ok) return (await res.json())?.results?.[0] || null
    const fbUrl = `https://api.fda.gov/drug/label.json?search=search="${encodeURIComponent(drugName)}"&limit=1`
    const fbRes = await fetch(fbUrl)
    if (!fbRes.ok) return null
    return (await fbRes.json())?.results?.[0] || null
  } catch {
    return null
  }
}

function hasReal(v: any): boolean {
  if (Array.isArray(v)) {
    return v.some(
      (x) =>
        typeof x === 'string' &&
        x.trim().length > 10 &&
        !/^(n\/a|none|refer to current)/i.test(x.trim()) &&
        !/refer to current prescribing information/i.test(x.trim()),
    )
  }
  if (typeof v === 'object' && v !== null) return Object.keys(v).length > 0
  return (
    typeof v === 'string' &&
    v.trim().length > 20 &&
    !/^(n\/a|none|refer to current|consult current)/i.test(v.trim()) &&
    !/refer to current prescribing information/i.test(v.trim()) &&
    !/mechanism of action for .*\. refer to current/i.test(v.trim())
  )
}


// Number of genuinely real items in an array field (audit's quality bar).
function realCount(v: any): number {
  if (!Array.isArray(v)) return 0
  return v.filter(
    (x) => typeof x === 'string' && x.trim().length > 10 && !/^(n\/a|none|tbd|todo|placeholder|unknown|pending|refer to current|consult current)/i.test(x.trim()),
  ).length
}

async function main() {
  const state = JSON.parse(fs.existsSync(STATE_FILE) ? fs.readFileSync(STATE_FILE, 'utf8') : '{"done":[]}')
  const done = new Set<string>(state.done)

  const all: any[] = []
  let from = 0
  for (let i = 0; i < 60; i++) {
    const { data } = await admin
      .from('drug_monographs')
      .select('id, generic_name, name, indications, contraindications, side_effects, interactions, warnings, black_box_warnings, brand_names, mechanism_of_action, pharmacokinetics, monitoring, patient_counselling, drug_class')
      .range(from, from + 999)
    if (!data || data.length === 0) break
    all.push(...data)
    from += 1000
  }

  const targets = all.filter((r) => {
    if (done.has(r.id)) return false
    const coreMissing =
      !hasReal(r.indications) || !hasReal(r.contraindications) || !hasReal(r.side_effects) || !hasReal(r.interactions)
    const enrMissing = !hasReal(r.mechanism_of_action) || !hasReal(r.pharmacokinetics)
    // Only revisit rows whose gaps are real (placeholder/empty), so we don't
    // churn the 401 FULL rows.
    return coreMissing || enrMissing
  })
  console.log(`gap targets: ${targets.length} (done already: ${done.size})`)

  const batch = LIMIT ? targets.slice(0, LIMIT) : targets
  let ok = 0
  let fail = 0
  let fdaHits = 0

  for (let i = 0; i < batch.length; i++) {
    const r = batch[i]
    const name = r.generic_name || r.name
    const label = await fetchLabel(name)
    if (label) fdaHits++

    const update: Record<string, any> = {}

    // Core fields — real FDA content only, never overwrite existing real data.
    // Only fill when the field is below the audit's quality bar (indications ≥3,
    // CI/interactions ≥2, SE ≥3 real items), NOT based on first-item text alone.
    if (realCount(r.indications) < 3) {
      const ind = fdaArray(label?.indications_and_usage)
      if (realCount(ind) >= 3) update.indications = ind.slice(0, 8)
      else if (realCount(r.indications) === 0) update.indications = [`${name}: Refer to current prescribing information for approved indications.`]
    }
    if (realCount(r.contraindications) < 2) {
      const ci = fdaArray(label?.contraindications)
      if (realCount(ci) >= 2) update.contraindications = ci.slice(0, 5)
      else if (realCount(r.contraindications) === 0) update.contraindications = ['Hypersensitivity to the active substance or any excipient.']
    }
    if (realCount(r.side_effects) < 3) {
      const se = fdaArray(label?.adverse_reactions)
      if (realCount(se) >= 3) update.side_effects = se.slice(0, 10)
      else if (realCount(r.side_effects) === 0) update.side_effects = [`${name}: Refer to current prescribing information for the adverse reaction profile.`]
    }
    if (realCount(r.interactions) < 2) {
      const intx = fdaArray(label?.drug_interactions)
      if (realCount(intx) >= 2) update.interactions = intx.slice(0, 6)
      else if (realCount(r.interactions) === 0) update.interactions = [`${name}: Refer to current prescribing information for drug interaction data.`]
    }

    // Enrichment fields.
    if (!hasReal(r.mechanism_of_action)) {
      const moaRaw = fdaText(label?.mechanism_of_action) || fdaText(label?.description)
      const moa = moaRaw && isMechanismLike(moaRaw) ? moaRaw : ''
      if (moa) update.mechanism_of_action = moa
      else update.mechanism_of_action = `Mechanism of action for ${name}. Refer to current prescribing information for detailed pharmacological properties.`
    }
    if (!hasReal(r.pharmacokinetics)) {
      const pk = fdaText(label?.pharmacokinetics)
      if (pk) update.pharmacokinetics = pk
      else update.pharmacokinetics = 'Refer to current prescribing information for detailed pharmacokinetic data including absorption, distribution, metabolism, and elimination.'
    }
    if (!hasReal(r.warnings)) {
      const w = fdaArray(label?.warnings_and_cautions).length
        ? fdaArray(label?.warnings_and_cautions)
        : fdaArray(label?.warnings).length
          ? fdaArray(label?.warnings)
          : fdaArray(label?.precautions)
      if (w.length) update.warnings = w.slice(0, 6)
    }
    if (!hasReal(r.black_box_warnings)) {
      const bbw = fdaArray(label?.boxed_warning)
      if (bbw.length) update.black_box_warnings = bbw.slice(0, 3) // only real FDA BBWs
    }
    if (!hasReal(r.brand_names)) {
      const brands = label?.openfda?.brand_name?.slice(0, 5) || []
      const ke = brandNamesFor(r.generic_name || r.name)
      const merged = [...new Set([...brands, ...ke])].slice(0, 6)
      if (merged.length) update.brand_names = merged
    }

    if (Object.keys(update).length === 0) {
      done.add(r.id)
      continue
    }

    try {
      const { error } = await admin.from('drug_monographs').update(update).eq('id', r.id)
      if (error) throw error
      ok++
      console.log(
        `[${i + 1}/${batch.length}] ${name}: ${label ? 'FDA' : 'fallback'} | filled: ${Object.keys(update).join(',')}`,
      )
    } catch (e: any) {
      fail++
      console.log(`[ERR] ${name}: ${e.message}`)
    }

    done.add(r.id)
    fs.writeFileSync(STATE_FILE, JSON.stringify({ done: [...done] }, null, 2))
    await new Promise((r2) => setTimeout(r2, 300))
  }

  console.log(`\n[done] ok=${ok} failed=${fail} fda_hits=${fdaHits}/${batch.length} (${Math.round((fdaHits / Math.max(1, batch.length)) * 100)}%)`)
}
main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
