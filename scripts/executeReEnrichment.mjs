#!/usr/bin/env node
/**
 * executeReEnrichment.mjs — Replaces ALL generic placeholders with class-specific content
 * and adds 50 new essential drugs. Handles both JS and JSON formatting in drugIndexData.ts.
 *
 * Run: node scripts/executeReEnrichment.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { CLASS_TEMPLATES, isGeneric } from './drugClassTemplates.mjs'
import { DRUG_OVERRIDES, NEW_ESSENTIAL_DRUGS } from './reEnrichAllDrugs.mjs'

const FILE = 'src/data/drugIndexData.ts'
let src = readFileSync(FILE, 'utf-8')
const originalSize = src.length

// ═══════════════════════════════════════════════════════════════════════
// CLASS TEMPLATE MATCHING (copied from reEnrichAllDrugs)
// ═══════════════════════════════════════════════════════════════════════

const ALIAS_MAP = {
  'ACEi': 'ACE inhibitor', 'CCB': 'Calcium channel blocker (DHP)',
  'BZD': 'Benzodiazepine', 'NSAID': 'Non-opioid analgesic',
  'SGLT2i': 'SGLT2 inhibitor', 'DPP4i': 'DPP-4 inhibitor',
  'GLP1RA': 'GLP-1 receptor agonist', 'DOAC': 'DOAC (direct oral anticoagulant)',
  'Beta-blocker': 'Beta-blocker', 'Beta-blocker (cardioselective)': 'Beta-blocker',
  'Statin': 'Statin', 'PPI': 'PPI',
  'ACE inhibitor': 'ACE inhibitor', 'ARB': 'ARB',
  'Opioid': 'Opioid analgesic', 'Analgesic': 'Non-opioid analgesic',
  'Analgesic/Antipyretic': 'Non-opioid analgesic',
  'Antipsychotic': 'Antipsychotic (atypical)', 'Antipsychotic (atypical)': 'Antipsychotic (atypical)',
  'Antipsychotic (typical)': 'Antipsychotic (typical)',
  'Anticoagulant': 'Anticoagulant', 'LMWH': 'Anticoagulant',
  'Antiviral': 'Antiviral (HSV)', 'Antiretroviral': 'Antiretroviral (INSTI)',
  'Antiretroviral (NRTI)': 'Antiretroviral (NRTI)', 'Antiretroviral (NNRTI)': 'Antiretroviral (NNRTI)',
  'Antiretroviral (INSTI)': 'Antiretroviral (INSTI)',
  'Antiretroviral (NtRTI)': 'Antiretroviral (NRTI)',
  'Antiretroviral (Protease inhibitor)': 'Antiretroviral (Protease inhibitor)',
  'Protease inhibitor': 'Antiretroviral (Protease inhibitor)',
  'Antifungal': 'Antifungal (Azole)', 'Antifungal (Azole)': 'Antifungal (Azole)',
  'Antimalarial': 'Antimalarial', 'Antimalarial (ACT)': 'Antimalarial',
  'Antimycobacterial': 'Antimycobacterial', 'Antihistamine': 'Antihistamine',
  'Antiemetic': 'Antiemetic', '5-HT3 antagonist': 'Antiemetic',
  'Antidiarrhoeal': 'Antidiarrheal', 'Laxative': 'Laxative',
  'Insulin': 'Insulin', 'Corticosteroid': 'Corticosteroid',
  'Thyroid hormone': 'Thyroid hormone', 'Cardiac glycoside': 'Cardiac glycoside',
  'Nitrate': 'Nitrate vasodilator', 'Antiplatelet': 'Antiplatelet',
  'Dopaminergic': 'Antiparkinsonian (dopaminergic)',
  'Anticholinergic': 'Anticholinergic bronchodilator',
  'Methylxanthine': 'Methylxanthine', 'Mucolytic': 'Mucolytic',
  'Leukotriene receptor antagonist': 'Leukotriene receptor antagonist',
  'Topical corticosteroid': 'Topical corticosteroid',
  'Calcium channel blocker': 'Calcium channel blocker (DHP)',
  'Calcium channel blocker (DHP)': 'Calcium channel blocker (DHP)',
  'Calcium channel blocker (Non-DHP)': 'Calcium channel blocker (Non-DHP)',
  'Loop diuretic': 'Loop diuretic', 'Thiazide diuretic': 'Thiazide diuretic',
  'Potassium-sparing diuretic': 'Potassium-sparing diuretic',
  'H2 receptor antagonist': 'H2 receptor antagonist',
  'Growth factor': 'Hematopoietic growth factor',
  'Antifibrinolytic': 'Hematologic agent',
  'Antidote (heparin)': 'Antidote',
  'SERM': 'SERM (selective estrogen receptor modulator)',
  'Aromatase inhibitor (steroidal)': 'Aromatase inhibitor',
  'Aromatase inhibitor (nonsteroidal)': 'Aromatase inhibitor',
  'Progestin': 'Progestin',
  'Antiseptic': 'Antiseptic', 'Antibiotic (ophthalmic)': 'Antibiotic (ophthalmic)',
  'Anticholinergic (ophthalmic)': 'Anticholinergic bronchodilator',
  'Beta-blocker (ophthalmic)': 'Beta-blocker',
  'Corticosteroid (ophthalmic)': 'Corticosteroid',
  'Prostaglandin analogue (ophthalmic)': 'Antiglaucoma',
  'Diagnostic dye': 'Diagnostic agent',
  'Topical antifungal': 'Antifungal (Azole)',
  'Antileprotic': 'Antileprotic',
  'Antiprotozoal': 'Antiprotozoal',
  'Urinary antiseptic': 'Urinary antiseptic',
}

function matchClass(drugClass) {
  if (!drugClass) return null
  if (CLASS_TEMPLATES[drugClass]) return CLASS_TEMPLATES[drugClass]
  if (ALIAS_MAP[drugClass] && CLASS_TEMPLATES[ALIAS_MAP[drugClass]]) return CLASS_TEMPLATES[ALIAS_MAP[drugClass]]
  const lower = drugClass.toLowerCase()
  for (const [key, tmpl] of Object.entries(CLASS_TEMPLATES)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) return tmpl
  }
  for (const [alias, key] of Object.entries(ALIAS_MAP)) {
    if (lower.includes(alias.toLowerCase()) && CLASS_TEMPLATES[key]) return CLASS_TEMPLATES[key]
  }
  return null
}

// ═══════════════════════════════════════════════════════════════════════
// FIELD EXTRACTION — handles both JS single-quote and JSON double-quote
// ═══════════════════════════════════════════════════════════════════════

function getField(drugLine, field) {
  // Try single-quote: field: 'value'
  const sq = drugLine.match(new RegExp(`${field}:\\s*'((?:[^'\\\\]|\\\\.)*)(?:'\\s*[,}])`))
  if (sq) return sq[1]
  // Try double-quote: "field": "value"
  const dq = drugLine.match(new RegExp(`"${field}":\\s*"((?:[^"\\\\]|\\\\.)*)(?:"\\s*[,}])`))
  if (dq) return dq[1]
  return null
}

function getArrayField(drugLine, field) {
  // Try single-quote: field: ['a', 'b']
  const sq = drugLine.match(new RegExp(`${field}:\\s*\\[((?:\\[.*?\\]|'(?:[^'\\\\]|\\\\.)*'|"[^"]*")*)\\s*\\]`))
  if (sq) {
    const items = [...sq[1].matchAll(/'((?:[^'\\\\]|\\\\.)*?)'/g)].map(m => m[1])
    if (items.length > 0) return items
  }
  // Try double-quote: "field": ["a", "b"]
  const dq = drugLine.match(new RegExp(`"${field}":\\s*\\[((?:\\[.*?\\]|"(?:[^"\\\\]|\\\\.)*?"|'[^']*')*)\\s*\\]`))
  if (dq) {
    const items = [...dq[1].matchAll(/"((?:[^"\\\\]|\\\\.)*?)"/g)].map(m => m[1])
    if (items.length > 0) return items
  }
  return null
}

function setField(line, field, value) {
  // Escape single quotes in value
  const safe = value.replace(/'/g, "\\'")
  // Replace existing value
  // Single-quote field
  const sqRe = new RegExp(`(${field}:\\s*)'[^']*'`)
  if (sqRe.test(line)) return line.replace(sqRe, `$1'${safe}'`)
  // Double-quote field
  const dqRe = new RegExp(`("${field}":\\s*)"[^"]*"`)
  if (dqRe.test(line)) return line.replace(dqRe, `$1"${safe}"`)
  return line
}

function setArrayField(line, field, items) {
  const arrStr = items.map(i => `'${i.replace(/'/g, "\\'")}'`).join(', ')
  // Single-quote array
  const sqRe = new RegExp(`${field}:\\s*\\[([^\\]]*)\\]`)
  if (sqRe.test(line)) return line.replace(sqRe, `${field}: [${arrStr}]`)
  return line
}

// ═══════════════════════════════════════════════════════════════════════
// PHASE 1: Re-enrich existing drugs
// ═══════════════════════════════════════════════════════════════════════

const lines = src.split('\n')
let moaFixed = 0, pkFixed = 0, pearlsFixed = 0, warningsFixed = 0, overdoseFixed = 0, bbwFixed = 0
let totalDrugs = 0, enrichedDrugs = 0

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  // Detect drug entry line (has both id and drug_class)
  const idVal = getField(line, 'id') || line.match(/"id":\s*"([^"]+)"/)?.[1]
  const drugClass = getField(line, 'drug_class') || line.match(/"drug_class":\s*"([^"]+)"/)?.[1]
  if (!idVal || !drugClass) continue
  totalDrugs++

  const tmpl = matchClass(drugClass)
  const idLower = idVal.toLowerCase()
  const override = DRUG_OVERRIDES[idLower]
  let modified = false

  if (tmpl || override) {
    // Fix mechanism_of_action
    const moaVal = getField(line, 'mechanism_of_action')
    if (moaVal && isGeneric(moaVal)) {
      const newMoa = override?.moa || tmpl?.moa
      if (newMoa) {
        lines[i] = setField(lines[i], 'mechanism_of_action', newMoa)
        moaFixed++
        modified = true
      }
    }

    // Fix pharmacokinetics
    const pkVal = getField(line, 'pharmacokinetics')
    if (pkVal && isGeneric(pkVal)) {
      const newPk = override?.pk || tmpl?.pk
      if (newPk) {
        lines[i] = setField(lines[i], 'pharmacokinetics', newPk)
        pkFixed++
        modified = true
      }
    }

    // Fix clinical_pearls
    const pearlsVal = getArrayField(lines[i], 'clinical_pearls')
    if (pearlsVal && pearlsVal.some(p => isGeneric(p))) {
      const newPearls = override?.pearls || tmpl?.pearls
      if (newPearls) {
        lines[i] = setArrayField(lines[i], 'clinical_pearls', newPearls)
        pearlsFixed++
        modified = true
      }
    }

    // Fix warnings
    const warningsVal = getArrayField(lines[i], 'warnings')
    if (warningsVal && warningsVal.some(w => isGeneric(w))) {
      const newWarnings = override?.warnings || tmpl?.warnings
      if (newWarnings) {
        lines[i] = setArrayField(lines[i], 'warnings', newWarnings)
        warningsFixed++
        modified = true
      }
    }

    // Fix overdose
    const odVal = getField(lines[i], 'overdose')
    if (odVal && isGeneric(odVal)) {
      const newOd = override?.overdose || tmpl?.overdose
      if (newOd) {
        lines[i] = setField(lines[i], 'overdose', newOd)
        overdoseFixed++
        modified = true
      }
    }

    // Fix black_box_warnings if empty and template has them
    const bbwVal = getArrayField(lines[i], 'black_box_warnings')
    if (bbwVal && bbwVal.length === 0 && tmpl?.bbw && tmpl.bbw.length > 0) {
      lines[i] = setArrayField(lines[i], 'black_box_warnings', tmpl.bbw)
      bbwFixed++
      modified = true
    }

    if (modified) enrichedDrugs++
  }
}

console.log('=== PHASE 1: Re-enrichment Results ===')
console.log(`Total drugs found: ${totalDrugs}`)
console.log(`Drugs enriched: ${enrichedDrugs}`)
console.log(`  MoA fixed: ${moaFixed}`)
console.log(`  PK fixed: ${pkFixed}`)
console.log(`  Pearls fixed: ${pearlsFixed}`)
console.log(`  Warnings fixed: ${warningsFixed}`)
console.log(`  Overdose fixed: ${overdoseFixed}`)
console.log(`  BBW filled: ${bbwFixed}`)

// ═══════════════════════════════════════════════════════════════════════
// PHASE 2: Add new essential drugs
// ═══════════════════════════════════════════════════════════════════════

// Find the closing ]; of the BUNDLED_DRUGS array
let insertLine = -1
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].trim() === '];' || lines[i].trim() === '],') {
    insertLine = i
    break
  }
}

if (insertLine === -1) {
  console.log('ERROR: Could not find closing ]; of BUNDLED_DRUGS array')
  process.exit(1)
}

// Generate new drug entries in the same format as the last entries (JSON style)
const newDrugEntries = NEW_ESSENTIAL_DRUGS.map(drug => {
  const indications = drug.indications.map(i => `"${i}"`).join(', ')
  const contraindications = drug.contraindications.map(c => `"${c}"`).join(', ')
  const sideEffects = drug.side_effects.map(s => `"${s}"`).join(', ')
  const interactions = (drug.interactions || []).map(i => `"${i}"`).join(', ')

  const tmpl = matchClass(drug.drug_class)
  const moa = (override => override?.moa || tmpl?.moa || 'Pharmacological agent: acts through specific receptor or enzyme interactions.')(DRUG_OVERRIDES[drug.id])
  const pk = (override => override?.pk || tmpl?.pk || 'Absorption: variable. Distribution: widespread. Metabolism: hepatic. Excretion: renal.')(DRUG_OVERRIDES[drug.id])
  const pearls = (override => (override?.pearls || tmpl?.pearls || ['Monitor therapeutic response']).map(p => `"${p}"`).join(', '))(DRUG_OVERRIDES[drug.id])
  const warnings = (override => (override?.warnings || tmpl?.warnings || ['Use with caution']).map(w => `"${w}"`).join(', '))(DRUG_OVERRIDES[drug.id])
  const overdose = (override => override?.overdose || tmpl?.overdose || 'Symptoms: dose-dependent adverse effects. Management: supportive care.')(DRUG_OVERRIDES[drug.id])
  const preg = tmpl?.preg || 'C'
  const brands = tmpl?.brands || [drug.name]
  const bbw = (tmpl?.bbw || []).map(b => `"${b}"`).join(', ')

  const dosage = drug.dosage
  const dosageStr = `{ "adult": "${dosage.adult}"${dosage.paediatric ? `, "paediatric": "${dosage.paediatric}"` : ''} }`

  return `    {"id":"${drug.id}","name":"${drug.name}","generic_name":"${drug.generic_name}","drug_class":"${drug.drug_class}","drug_class_id":null,"drug_class_name":"${drug.drug_class_name}","indications":[${indications}],"contraindications":[${contraindications}],"side_effects":[${sideEffects}],"dosage":${dosageStr},"interactions":[${interactions}],"monitoring":"${drug.monitoring || 'Monitor therapeutic response'}","patient_counselling":"${drug.patient_counselling || 'Follow healthcare provider instructions.'}","mechanism_of_action":"${moa.replace(/"/g, '\\"')}","brand_names":[${brands.map(b => `"${b}"`).join(', ')}],"pregnancy_category":"${preg}","warnings":[${warnings}],"overdose":"${overdose.replace(/"/g, '\\"')}","pharmacokinetics":"${pk.replace(/"/g, '\\"')}","black_box_warnings":[${bbw}],"clinical_pearls":[${pearls}]},`
})

// Insert before closing ];
lines.splice(insertLine, 0, ...newDrugEntries)

console.log(`\n=== PHASE 2: Added ${NEW_ESSENTIAL_DRUGS.length} new essential drugs ===`)

// ═══════════════════════════════════════════════════════════════════════
// PHASE 3: Write & verify
// ═══════════════════════════════════════════════════════════════════════

const newSrc = lines.join('\n')
writeFileSync(FILE, newSrc, 'utf-8')

// Verify
const finalCount = (newSrc.match(/"id":\s*"[^"]+"/g) || []).length + (newSrc.match(/\bid\s*:\s*'[^']+'/g) || []).length
const finalMoaGeneric = (newSrc.match(/Pharmacological agent: acts through/g) || []).length
const finalPkGeneric = (newSrc.match(/Absorption: variable depending on route/g) || []).length
const finalPearlsGeneric = (newSrc.match(/Clinical response varies based on patient factors/g) || []).length
const finalWarningsGeneric = (newSrc.match(/Use with caution in patients/g) || []).length

console.log(`\n=== FINAL RESULTS ===`)
console.log(`Total drugs: ${finalCount}`)
console.log(`File size: ${(newSrc.length / 1024).toFixed(1)} KB (was ${(originalSize / 1024).toFixed(1)} KB)`)
console.log(`\nRemaining generic placeholders:`)
console.log(`  MoA: ${finalMoaGeneric}`)
console.log(`  PK: ${finalPkGeneric}`)
console.log(`  Pearls: ${finalPearlsGeneric}`)
console.log(`  Warnings: ${finalWarningsGeneric}`)

const enriched = finalCount - finalMoaGeneric
console.log(`\nEnrichment quality:`)
console.log(`  Enriched MoA: ${enriched}/${finalCount} (${((enriched/finalCount)*100).toFixed(1)}%)`)
console.log(`  Enriched PK: ${finalCount - finalPkGeneric}/${finalCount} (${(((finalCount - finalPkGeneric)/finalCount)*100).toFixed(1)}%)`)
console.log(`  Enriched Pearls: ${finalCount - finalPearlsGeneric}/${finalCount} (${(((finalCount - finalPearlsGeneric)/finalCount)*100).toFixed(1)}%)`)
console.log(`  Enriched Warnings: ${finalCount - finalWarningsGeneric}/${finalCount} (${(((finalCount - finalWarningsGeneric)/finalCount)*100).toFixed(1)}%)`)
console.log(`\nDone! Written to ${FILE}`)
