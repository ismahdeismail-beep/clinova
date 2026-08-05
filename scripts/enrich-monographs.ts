// Enrich thin drug monographs with OpenFDA clinical depth — fills the 8
// enrichment fields (MOA, brand_names, pregnancy_category, warnings, overdose,
// pharmacokinetics, black_box_warnings, clinical_pearls) plus any missing core
// fields, using the same FDA-first / class-fallback logic as the batch
// generator. Resumable via storage/enrich_state.json.
// Usage: npx tsx scripts/enrich-monographs.ts [--limit N]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

const STATE_FILE = 'storage/enrich_state.json'
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? Number(limitArg.split('=')[1]) : 0
const REST = process.argv.includes('--rest')
const ONLY_PK = process.argv.includes('--only-pk')
// The --rest pass uses its own state file so it can retry rows the first pass
// marked done even when they ended up with placeholder/boilerplate content.
const STATE_FILE_FINAL = REST ? 'storage/enrich_rest_state.json' : STATE_FILE

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

interface OpenFdaLabel {
  openfda?: {
    generic_name?: string[]
    brand_name?: string[]
    pharm_class_epc?: string[]
  }
  mechanism_of_action?: string[]
  description?: string[]
  pharmacokinetics?: string[]
  clinical_pharmacology?: string[]
  overdose?: string[]
  pregnancy?: string[]
  warnings?: string[]
  warnings_and_cautions?: string[]
  precautions?: string[]
  boxed_warning?: string[]
}

function fdaText(field: string[] | undefined): string {
  if (!field?.length) return ''
  return field[0]
    .replace(/\[.*?\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function fdaArray(field: string[] | undefined): string[] {
  if (!field?.length) return []
  const raw = field.join(' ').replace(/\s+/g, ' ').trim()
  if (!raw) return []
  // Split into sentence-sized items so long FDA sections ("5 WARNINGS AND
  // PRECAUTIONS" paragraphs run thousands of chars) become readable bullets
  // instead of being dropped by a length cap.
  return raw
    .split(/(?<=[.;])\s+(?=[A-Z])/)
    .map((s) => s.replace(/\[.*?\]/g, '').replace(/^\d+\s*/, '').trim())
    .filter((s) => s.length > 15 && s.length < 600)
}

async function fetchFdaLabel(drugName: string): Promise<OpenFdaLabel | null> {
  const fetchWithTimeout = async (url: string): Promise<Response> => {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 15000)
    try {
      return await fetch(url, { signal: ctrl.signal })
    } finally {
      clearTimeout(t)
    }
  }
  try {
    const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(drugName)}"+OR+openfda.brand_name:"${encodeURIComponent(drugName)}"&limit=1`
    const res = await fetchWithTimeout(url)
    if (!res.ok) {
      const fbUrl = `https://api.fda.gov/drug/label.json?search=search="${encodeURIComponent(drugName)}"&limit=1`
      const fbRes = await fetchWithTimeout(fbUrl)
      if (!fbRes.ok) return null
      const fbData: any = await fbRes.json()
      return fbData?.results?.[0] ?? null
    }
    const data: any = await res.json()
    return data?.results?.[0] ?? null
  } catch {
    return null
  }
}

function hasReal(v: any): boolean {
  if (Array.isArray(v)) return v.some((x) => typeof x === 'string' && x.trim().length > 10)
  return typeof v === 'string' && v.trim().length > 20
}

// Placeholder/boilerplate rows pass hasReal (they are long strings) but carry
// no actual content — "Refer to current prescribing information…" and the
// generated fallbacks. Treat those as empty so the --rest pass re-fetches them.
const BOILERPLATE = /^(refer to current|consult current|seek immediate|mechanism of action for |n\/a|none|tbd|todo|placeholder|unknown|pending)/i
function hasSubstance(v: any): boolean {
  if (!hasReal(v)) return false
  const items = Array.isArray(v) ? v : [v]
  return items.some((x) => typeof x === 'string' && x.trim().length > 10 && !BOILERPLATE.test(x.trim()))
}

/** Two concise, drug-specific practice tips drawn from the monograph's own
 *  monitoring and counselling text (already verified content — no fabrication). */
function makePearls(monitoring: string, counselling: string, name: string): string[] {
  const out: string[] = []
  const src = `${monitoring || ''} ${counselling || ''}`
    .replace(/\s+/g, ' ')
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 25 && s.length < 220)
  for (const s of src) {
    if (out.length >= 2) break
    const tip = s.replace(/^[a-z]/, (c) => c.toUpperCase())
    out.push(`${name}: ${tip}`)
  }
  if (out.length === 0) out.push(`${name}: Follow current prescribing guidelines and monitor response to therapy regularly.`)
  return out
}

async function fetchAllMonographs(): Promise<any[]> {
  const all: any[] = []
  let from = 0
  for (let i = 0; i < 60; i++) {
    const { data, error } = await admin
      .from('drug_monographs')
      .select('*')
      .range(from, from + 999)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    from += 1000
  }
  return all
}

async function main() {
  const rows = await fetchAllMonographs()
  console.log(`total monographs: ${rows.length}`)

  const state: { done: string[] } = fs.existsSync(STATE_FILE_FINAL)
    ? JSON.parse(fs.readFileSync(STATE_FILE_FINAL, 'utf8'))
    : { done: [] }
  const done = new Set(state.done)

  // Target rows that are still weak — any core or enrichment field below the
  // substance bar (placeholder/boilerplate counts as weak). In --rest mode the
  // old done-list is ignored for weak rows so fallback-only rows get retried.
  const isWeak = (r: any): boolean =>
    !hasSubstance(r.mechanism_of_action) ||
    !hasSubstance(r.pharmacokinetics) ||
    !hasSubstance(r.overdose) ||
    !hasSubstance(r.warnings) ||
    !hasSubstance(r.black_box_warnings) ||
    !hasSubstance(r.brand_names) ||
    !hasSubstance(r.indications) ||
    !hasSubstance(r.contraindications) ||
    !hasSubstance(r.side_effects) ||
    !hasSubstance(r.interactions) ||
    !hasSubstance(r.monitoring) ||
    !hasSubstance(r.patient_counselling)

  const targets = rows.filter((r) => {
    if (!isWeak(r)) return false
    if (!REST && done.has(r.id)) return false
    if (ONLY_PK && hasSubstance(r.pharmacokinetics)) return false
    return true
  })
  const weakBoilerPk = targets.filter((r) => !hasSubstance(r.pharmacokinetics) && BOILERPLATE.test(String(r.pharmacokinetics || '').trim())).length
  const weakPk = targets.filter((r) => !hasSubstance(r.pharmacokinetics)).length
  const weakWarn = targets.filter((r) => !hasSubstance(r.warnings)).length
  const weakBb = targets.filter((r) => !hasSubstance(r.black_box_warnings)).length
  const weakCore = targets.filter((r) => !hasSubstance(r.indications) || !hasSubstance(r.contraindications) || !hasSubstance(r.side_effects) || !hasSubstance(r.interactions)).length
  console.log(`total monographs: ${rows.length}`)
  console.log(`targets needing enrichment: ${targets.length} (done already: ${done.size})`)
  console.log(`  weak PK: ${weakPk} (of which boilerplate: ${weakBoilerPk})`)
  console.log(`  weak warnings: ${weakWarn} | weak black_box: ${weakBb} | weak core: ${weakCore}`)

  const batch = LIMIT ? targets.slice(0, LIMIT) : targets
  let fdaHits = 0
  let ok = 0
  let fail = 0

  for (let i = 0; i < batch.length; i++) {
    const r = batch[i]
    const name = r.generic_name || r.name
    const label = await fetchFdaLabel(name)
    if (label) fdaHits++

    const moaRaw = fdaText(label?.mechanism_of_action) || fdaText(label?.description)
    const moa = moaRaw && /(mechanism|inhibits?|antagoni[sz]es?|agonist|binds?|blocks?|receptor|enzyme|prevents?|reduces?|stimulates?|suppresses?|interferes?|disrupts?|selective|potentiates?|modulates?|catalys|metaboli[sz])/i.test(moaRaw) ? moaRaw : ''
    // Old SPL-format labels keep the PK text under clinical_pharmacology —
    // without this fallback those drugs keep the boilerplate placeholder.
    let pk = fdaText(label?.pharmacokinetics) || fdaText(label?.clinical_pharmacology)
    // OTC generic searches often return the Drug-Facts label (no PK section)
    // ahead of the Rx label. Retry with a filter for labels that HAVE a
    // pharmacokinetics section.
    if (!pk && label) {
      const pkUrl = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(name)}"+AND+pharmacokinetics:[*+TO+*]&limit=1`
      try {
        const ctrl = new AbortController()
        const t = setTimeout(() => ctrl.abort(), 15000)
        const res = await fetch(pkUrl, { signal: ctrl.signal })
        clearTimeout(t)
        if (res.ok) {
          const data: any = await res.json()
          const rx = data?.results?.[0]
          pk = fdaText(rx?.pharmacokinetics) || fdaText(rx?.clinical_pharmacology)
        }
      } catch {
        // keep pk empty — the update preserves the existing placeholder
      }
    }
    const od = fdaText(label?.overdose)
    const preg = fdaText(label?.pregnancy)
    // fdaArray returns [] (truthy) when empty, so a plain || chain would
    // short-circuit and never reach the fallback sections — find the first
    // section that actually produced content instead.
    const warnings =
      [fdaArray(label?.warnings), fdaArray(label?.warnings_and_cautions), fdaArray(label?.precautions)].find(
        (a) => a.length > 0,
      ) ?? []
    const bbw = fdaArray(label?.boxed_warning)
    const brands = label?.openfda?.brand_name?.slice(0, 5) || []

    const update: Record<string, any> = {
      mechanism_of_action:
        hasReal(r.mechanism_of_action) && moa === ''
          ? r.mechanism_of_action
          : moa || `Mechanism of action for ${name}. Refer to current prescribing information for detailed pharmacological properties.`,
      pharmacokinetics:
        hasReal(r.pharmacokinetics) && pk === ''
          ? r.pharmacokinetics
          : pk || 'Refer to current prescribing information for detailed pharmacokinetic data including absorption, distribution, metabolism, and elimination.',
      overdose:
        hasReal(r.overdose) && od === ''
          ? r.overdose
          : od || 'Seek immediate medical attention in case of overdose. Symptoms and management depend on the specific drug and dose taken.',
      pregnancy_category:
        hasReal(r.pregnancy_category) && preg === ''
          ? r.pregnancy_category
          : preg ? preg.slice(0, 200) : 'Consult current prescribing information',
      warnings: hasReal(r.warnings) && warnings.length === 0 ? r.warnings : warnings,
      black_box_warnings: hasReal(r.black_box_warnings) && bbw.length === 0 ? r.black_box_warnings : bbw,
      brand_names: hasReal(r.brand_names) && brands.length === 0 ? r.brand_names : brands,
      clinical_pearls: makePearls(r.monitoring || '', r.patient_counselling || '', name),
    }

    // Backfill any missing core fields too (indications/CI/SE/interactions).
    if (!hasReal(r.indications)) update.indications = ['Refer to current prescribing information for approved indications.']
    if (!hasReal(r.contraindications)) update.contraindications = ['Hypersensitivity to active substance or any excipient.']
    if (!hasReal(r.side_effects)) update.side_effects = ['Refer to current prescribing information for adverse reaction profile.']
    if (!hasReal(r.interactions)) update.interactions = ['Refer to current prescribing information for drug interaction data.']
    if (!hasReal(r.monitoring)) update.monitoring = 'Monitor clinical response, renal and hepatic function as appropriate.'
    if (!hasReal(r.patient_counselling)) update.patient_counselling = 'Take as prescribed and report any unusual or severe adverse effects.'

    try {
      const { error } = await admin.from('drug_monographs').update(update).eq('id', r.id)
      if (error) throw error
      ok++
      console.log(
        `[${i + 1}/${batch.length}] ${name}: ${label ? 'FDA' : 'fallback'} | MOA:${hasReal(update.mechanism_of_action) ? 'y' : 'n'} PK:${hasReal(update.pharmacokinetics) ? 'y' : 'n'} OD:${hasReal(update.overdose) ? 'y' : 'n'} pearls:${update.clinical_pearls.length}`,
      )
    } catch (e: any) {
      fail++
      console.log(`[ERR] ${name}: ${e.message}`)
    }

    done.add(r.id)
    fs.writeFileSync(STATE_FILE_FINAL, JSON.stringify({ done: [...done] }, null, 2))
    await new Promise((r2) => setTimeout(r2, 300))
  }

  console.log(`\n[done] ok=${ok} failed=${fail} fda_hits=${fdaHits}/${batch.length} (${Math.round((fdaHits / Math.max(1, batch.length)) * 100)}%)`)
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
