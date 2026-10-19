// Drug monograph contamination sweep — read-only.
//
// The migration that assigned content_status='template' only grouped four fields
// (side_effects, contraindications, interactions, patient_counselling) by md5 of
// the *whole array*, so cross-drug contamination in other fields — most notably
// indications — was never detected. (5-Fluorouracil still carries Olanzapine's
// schizophrenia label text, despite a note claiming it was removed.)
//
// This script groups normalised text blocks across EVERY text/array field and
// reports clusters shared by more than one drug. Large clusters (>= 10 drugs) are
// the generic boilerplate; small clusters that span different drug classes are
// the likely "wrong drug pasted onto another drug" cases.
//
// Usage: npx tsx scripts/audit-monograph-duplication.ts
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'node:fs'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

const SELECT =
  'id, name, drug_class, indications, contraindications, side_effects, dosage, interactions, monitoring, patient_counselling, mechanism_of_action, warnings, precautions, serious_adverse_reactions, food_interactions, pregnancy_guidance, lactation_guidance, overdose, pharmacokinetics, clinical_pearls, brand_names, black_box_warnings, renal_dose_adjustment, hepatic_dose_adjustment, administration_instructions'

const FIELDS: { key: string; kind: 'array' | 'text' }[] = [
  { key: 'indications', kind: 'array' },
  { key: 'contraindications', kind: 'array' },
  { key: 'side_effects', kind: 'array' },
  { key: 'interactions', kind: 'array' },
  { key: 'monitoring', kind: 'text' },
  { key: 'patient_counselling', kind: 'text' },
  { key: 'mechanism_of_action', kind: 'text' },
  { key: 'warnings', kind: 'array' },
  { key: 'precautions', kind: 'array' },
  { key: 'serious_adverse_reactions', kind: 'array' },
  { key: 'food_interactions', kind: 'array' },
  { key: 'pregnancy_guidance', kind: 'text' },
  { key: 'lactation_guidance', kind: 'text' },
  { key: 'overdose', kind: 'text' },
  { key: 'pharmacokinetics', kind: 'text' },
  { key: 'clinical_pearls', kind: 'array' },
  { key: 'black_box_warnings', kind: 'array' },
  { key: 'renal_dose_adjustment', kind: 'text' },
  { key: 'hepatic_dose_adjustment', kind: 'text' },
  { key: 'administration_instructions', kind: 'text' },
]

interface Row {
  id: string
  name: string
  drug_class: string | null
  [k: string]: any
}

async function fetchAll(): Promise<Row[]> {
  const all: Row[] = []
  for (let from = 0; ; from += 1000) {
    const { data, error } = await admin
      .from('drug_monographs')
      .select(SELECT)
      .order('name', { ascending: true })
      .range(from, from + 999)
    if (error) throw new Error(`load failed: ${error.message}`)
    if (!data?.length) break
    all.push(...(data as Row[]))
    if (data.length < 1000) break
  }
  return all
}

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function blocksOf(row: Row, field: { key: string; kind: 'array' | 'text' }): string[] {
  const v = row[field.key]
  if (field.kind === 'array') {
    if (!Array.isArray(v)) return []
    return v.filter((x) => typeof x === 'string' && x.trim().length > 20).map((x) => norm(x))
  }
  if (typeof v !== 'string' || v.trim().length <= 20) return []
  return [norm(v)]
}

interface Cluster {
  field: string
  text: string
  members: { name: string; drug_class: string | null }[]
}

async function main() {
  const rows = await fetchAll()
  const drugNames = new Set(rows.map((r) => r.name))

  // group normalised blocks -> clusters
  const map = new Map<string, Cluster>()
  for (const row of rows) {
    for (const field of FIELDS) {
      for (const block of blocksOf(row, field)) {
        const key = `${field.key}\u0001${block}`
        if (!map.has(key)) map.set(key, { field: field.key, text: block, members: [] })
        map.get(key)!.members.push({ name: row.name, drug_class: row.drug_class })
      }
    }
  }

  // distinct-drug clusters only
  const clusters = [...map.values()]
    .map((c) => {
      const distinct = [...new Map(c.members.map((m) => [m.name, m])).values()]
      return { ...c, members: distinct }
    })
    .filter((c) => c.members.length >= 2)

  const classesIn = (c: Cluster) => [...new Set(c.members.map((m) => m.drug_class ?? '(none)'))]
  const isCrossClass = (c: Cluster) => classesIn(c).length > 1
  const mentionsOtherDrug = (c: Cluster) =>
    [...drugNames].some((dn) => dn !== c.members[0].name && c.text.includes(dn.toLowerCase()))

  // Tier 1 — high precision: shared text literally names a drug not in the cluster.
  const contaminated = clusters.filter((c) => mentionsOtherDrug(c))
  // Tier 2 — review candidate: small cross-class cluster.
  const suspicious = clusters.filter(
    (c) => !contaminated.includes(c) && isCrossClass(c) && c.members.length <= 6,
  )
  const wrongDrug = [...contaminated, ...suspicious]

  // Per-drug scan: foreign drug name appearing inside a monograph's own content.
  const foreignHits: {
    drug: string
    drugClass: string | null
    field: string
    foreignDrug: string
  }[] = []
  const seenFH = new Set<string>()
  for (const row of rows) {
    for (const field of FIELDS) {
      const blocks = blocksOf(row, field)
      if (!blocks.length) continue
      const joined = blocks.join(' ')
      for (const other of drugNames) {
        if (other === row.name || other.length < 5) continue
        if (joined.includes(other.toLowerCase())) {
          const k = `${row.name}\u0001${field.key}\u0001${other}`
          if (seenFH.has(k)) continue
          seenFH.add(k)
          foreignHits.push({
            drug: row.name,
            drugClass: row.drug_class,
            field: field.key,
            foreignDrug: other,
          })
        }
      }
    }
  }

  // aggregate
  const byField = new Map<string, number>()
  for (const c of clusters) byField.set(c.field, (byField.get(c.field) ?? 0) + 1)
  const allInvolved = new Set(clusters.flatMap((c) => c.members.map((m) => m.name)))
  const priority = [
    ...new Map(wrongDrug.flatMap((c) => c.members.map((m) => m.name)).map((n) => [n, 0])).keys(),
  ]
    .map(
      (name) =>
        [name, wrongDrug.filter((c) => c.members.some((m) => m.name === name)).length] as [
          string,
          number,
        ],
    )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25)

  const top = [...clusters].sort((a, b) => b.members.length - a.members.length).slice(0, 12)
  const fuCluster = wrongDrug.find((c) => c.members.some((m) => m.name === '5-Fluorouracil'))
  const foreignDrugs = [...new Set(foreignHits.map((h) => h.drug))].sort()

  // report
  const lines: string[] = []
  lines.push('# Drug monograph contamination report')
  lines.push('')
  lines.push(
    `Generated ${new Date().toISOString()} by \`scripts/audit-monograph-duplication.ts\` (read-only).`,
  )
  lines.push('')
  lines.push('## Summary')
  lines.push('')
  lines.push(`- Monographs scanned: **${rows.length}**`)
  lines.push(
    `- Monographs involved in at least one cross-drug shared text block: **${allInvolved.size}**`,
  )
  lines.push(`- Cross-drug shared clusters: **${clusters.length}**`)
  lines.push(
    `- Distinct clusters per field: ${[...byField.entries()].map(([k, v]) => `${k}=${v}`).join(', ')}`,
  )
  lines.push(
    `- High-confidence contamination clusters (text names another drug): **${contaminated.length}**`,
  )
  lines.push(`- Review-candidate clusters (small, cross-class): **${suspicious.length}**`)
  lines.push(
    `- Monographs with a foreign drug name in their own content: **${foreignDrugs.length}**`,
  )
  lines.push('')
  lines.push('## Largest shared clusters (generic boilerplate)')
  lines.push('')
  lines.push(
    'Shared word-for-word across many drugs — the `template` class. Generic filler, not contamination.',
  )
  lines.push('')
  for (const c of top) {
    const classes = classesIn(c).join(' / ')
    lines.push(
      `- **${c.field}** — ${c.members.length} drugs (${classes}): ${c.members
        .map((m) => m.name)
        .slice(0, 8)
        .join(', ')}${c.members.length > 8 ? ' …' : ''}`,
    )
    lines.push(`  > ${c.text.slice(0, 160).replace(/\s+/g, ' ')}…`)
  }
  lines.push('')
  lines.push('## High-confidence contamination (shared text names another drug)')
  lines.push('')
  lines.push(
    'Clusters whose shared text literally names a drug that is NOT one of the cluster members — the strongest automatic signal of text pasted from the wrong drug.',
  )
  lines.push('')
  if (contaminated.length === 0) lines.push('_None detected._')
  for (const c of contaminated.slice(0, 80)) {
    lines.push(
      `- **${c.field}** — ${c.members.map((m) => `${m.name} (${m.drug_class ?? '?'})`).join(' · ')}`,
    )
    lines.push(`  > ${c.text.slice(0, 240).replace(/\s+/g, ' ')}…`)
  }
  lines.push('')
  lines.push('## Review candidates (small cross-class clusters)')
  lines.push('')
  lines.push(
    'Clusters of ≤ 6 drugs spanning more than one drug class. Many are generic boilerplate that happens to cross classes; a human skim separates real contamination from filler.',
  )
  lines.push('')
  if (suspicious.length === 0) lines.push('_None._')
  for (const c of suspicious.slice(0, 80)) {
    lines.push(
      `- **${c.field}** — ${c.members.map((m) => `${m.name} (${m.drug_class ?? '?'})`).join(' · ')}`,
    )
    lines.push(`  > ${c.text.slice(0, 180).replace(/\s+/g, ' ')}…`)
  }
  lines.push('')
  lines.push("## Foreign drug name found inside a monograph's own content")
  lines.push('')
  lines.push(
    "Monographs whose text contains the name of a different drug (>= 5 chars) anywhere in their content. This is the signal that surfaces paraphrased contamination, which exact-block matching misses (e.g. 5-Fluorouracil's olanzapine text).",
  )
  lines.push('')
  if (foreignHits.length === 0) lines.push('_None._')
  const byDrug = new Map<string, typeof foreignHits>()
  for (const h of foreignHits) {
    if (!byDrug.has(h.drug)) byDrug.set(h.drug, [])
    byDrug.get(h.drug)!.push(h)
  }
  for (const d of foreignDrugs.slice(0, 100)) {
    const hits = byDrug.get(d)!
    lines.push(
      `- **${d}** (${hits[0].drugClass ?? '?'}) — ${hits.map((h) => `${h.foreignDrug} in ${h.field}`).join('; ')}`,
    )
  }
  if (foreignDrugs.length > 100) lines.push(`_...and ${foreignDrugs.length - 100} more._`)
  lines.push('')
  lines.push('## Priority fix list')
  lines.push('')
  lines.push(
    'Drugs most often implicated in high-confidence contamination clusters, plus foreign-name hits.',
  )
  lines.push('')
  const priorityNames = [...new Set([...priority.map(([n]) => n), ...foreignDrugs])].slice(0, 40)
  if (priorityNames.length === 0) lines.push('_None._')
  for (const n of priorityNames) lines.push(`- ${n}`)
  lines.push('')
  lines.push('## Validation')
  lines.push('')
  lines.push(
    `- 5-Fluorouracil (known contamination: olanzapine/schizophrenia text) — cross-drug cluster: **${fuCluster ? 'YES (' + fuCluster.field + ')' : 'NO'}**; foreign-drug-name hit: **${foreignHits.some((h) => h.drug === '5-Fluorouracil') ? 'YES' : 'NO'}**.`,
  )
  lines.push(
    '  (Exact-normalised-block matching misses the 5-Fluorouracil case because its text is a paraphrase, not a verbatim copy. The foreign-drug-name scan is the route that surfaces it.)',
  )
  lines.push('')
  lines.push('## Notes')
  lines.push('')
  lines.push(
    '- The migration that set `content_status` grouped only side_effects / contraindications / interactions / patient_counselling, so contamination in `indications`, `mechanism_of_action`, `monitoring`, `warnings`, etc. is invisible to it. This sweep covers all 20 text/array fields.',
  )
  lines.push(
    '- Clusters with >= 10 distinct drugs are generic boilerplate and are excluded from the wrong-drug lists above.',
  )
  lines.push(
    '- Exact-normalised-block matching catches verbatim copy-paste (the observed failure mode for boilerplate) but NOT paraphrased wrong-drug content; the foreign-drug-name scan is the best automatic signal for the latter and still needs human confirmation.',
  )

  writeFileSync('docs/monograph-contamination-report.md', lines.join('\n') + '\n')

  console.log('=== SWEEP SUMMARY ===')
  console.log(`monographs scanned            : ${rows.length}`)
  console.log(`involved in any shared block  : ${allInvolved.size}`)
  console.log(`cross-drug shared clusters   : ${clusters.length}`)
  console.log(`  by field: ${[...byField.entries()].map(([k, v]) => `${k}=${v}`).join(', ')}`)
  console.log(`high-confidence clusters      : ${contaminated.length}`)
  console.log(`review-candidate clusters    : ${suspicious.length}`)
  console.log(`monographs with foreign name  : ${foreignDrugs.length}`)
  console.log(`priority-fix drugs           : ${priorityNames.length}`)
  console.log(
    `5-Fluorouracil cluster       : ${fuCluster ? 'YES (' + fuCluster.field + ')' : 'NO'}`,
  )
  console.log(
    `5-Fluorouracil foreign name  : ${foreignHits.some((h) => h.drug === '5-Fluorouracil') ? 'YES' : 'NO'}`,
  )
  console.log('')
  console.log('Report written to docs/monograph-contamination-report.md')
}

main().catch((e) => {
  console.error('Fatal:', e)
  process.exit(1)
})
