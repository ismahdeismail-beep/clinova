#!/usr/bin/env node
/**
 * enrichDrugsDirect.mjs — Direct text replacement approach.
 * Replaces ALL known generic placeholder patterns with class-specific content.
 * Works regardless of line breaks because we match patterns across the full source.
 */
import { readFileSync, writeFileSync } from 'fs'
import { CLASS_TEMPLATES, isGeneric } from './drugClassTemplates.mjs'
import { DRUG_OVERRIDES, NEW_ESSENTIAL_DRUGS } from './reEnrichAllDrugs.mjs'

const FILE = 'src/data/drugIndexData.ts'
let src = readFileSync(FILE, 'utf-8')
const originalLines = src.split('\n').length

// ═══════════════════════════════════════════════════════════════════════
// PARSE ALL DRUG BLOCKS (multi-line aware)
// ═══════════════════════════════════════════════════════════════════════

// Strategy: find each drug block by matching { id: 'xxx' ... created_at: '' }
// or {"id":"xxx" ... "created_at":""}
// Then replace generic fields within each block

const drugBlocks = []
// Match drug entries: from { id: to the next created_at or next { id:
const blockRegex = /(\{(?:\s*(?:id|\"id\")\s*[:=]\s*(?:'[^']+'|\"[^\"]+\"))[\s\S]*?(?:created_at:\s*''|\"created_at\":\s*\"\")\s*\})/g

let match
while ((match = blockRegex.exec(src)) !== null) {
  const block = match[1]
  const startIdx = match.index
  const endIdx = startIdx + block.length

  // Extract id
  const idMatch = block.match(/id\s*[:=]\s*['"]([^'"]+)['"]/) || block.match(/"id"\s*:\s*"([^"]+)"/)
  // Extract drug_class
  const dcMatch = block.match(/drug_class\s*[:=]\s*['"]([^'"]+)['"]/) || block.match(/"drug_class"\s*:\s*"([^"]+)"/)

  if (idMatch) {
    drugBlocks.push({
      id: idMatch[1],
      drugClass: dcMatch?.[1] || '',
      block,
      startIdx,
      endIdx
    })
  }
}

console.log(`Parsed ${drugBlocks.length} drug blocks from source`)

// ═══════════════════════════════════════════════════════════════════════
// CLASS TEMPLATE MATCHING
// ═══════════════════════════════════════════════════════════════════════

const ALIAS_MAP = {
  'ACEi': 'ACE inhibitor', 'CCB': 'Calcium channel blocker (DHP)',
  'BZD': 'Benzodiazepine', 'NSAID': 'Non-opioid analgesic',
  'SGLT2i': 'SGLT2 inhibitor', 'DPP4i': 'DPP-4 inhibitor',
  'GLP1RA': 'GLP-1 receptor agonist',
  'Beta-blocker': 'Beta-blocker', 'Beta-blocker (cardioselective)': 'Beta-blocker',
  'Statin': 'Statin', 'PPI': 'PPI',
  'ACE inhibitor': 'ACE inhibitor', 'ARB': 'ARB',
  'Opioid': 'Opioid analgesic', 'Analgesic': 'Non-opioid analgesic',
  'Antipsychotic': 'Antipsychotic (atypical)',
  'Anticoagulant': 'Anticoagulant', 'LMWH': 'Anticoagulant',
  'Antiviral': 'Antiviral (HSV)', 'Antiretroviral': 'Antiretroviral (INSTI)',
  'Antiretroviral (NRTI)': 'Antiretroviral (NRTI)', 'Antiretroviral (NNRTI)': 'Antiretroviral (NNRTI)',
  'Antiretroviral (INSTI)': 'Antiretroviral (INSTI)',
  'Antiretroviral (NtRTI)': 'Antiretroviral (NRTI)',
  'Antiretroviral (Protease inhibitor)': 'Antiretroviral (Protease inhibitor)',
  'Protease inhibitor': 'Antiretroviral (Protease inhibitor)',
  'Antifungal': 'Antifungal (Azole)',
  'Antimalarial': 'Antimalarial', 'Antimycobacterial': 'Antimycobacterial',
  'Antihistamine': 'Antihistamine', 'Antiemetic': 'Antiemetic',
  'Insulin': 'Insulin', 'Corticosteroid': 'Corticosteroid',
  'Thyroid hormone': 'Thyroid hormone', 'Cardiac glycoside': 'Cardiac glycoside',
  'Nitrate': 'Nitrate vasodilator', 'Antiplatelet': 'Antiplatelet',
  'Dopaminergic': 'Antiparkinsonian (dopaminergic)',
  'Anticholinergic': 'Anticholinergic bronchodilator',
  'Methylxanthine': 'Methylxanthine',
  'Topical corticosteroid': 'Topical corticosteroid',
  'Loop diuretic': 'Loop diuretic', 'Thiazide diuretic': 'Thiazide diuretic',
  'Potassium-sparing diuretic': 'Potassium-sparing diuretic',
  'H2 receptor antagonist': 'H2 receptor antagonist',
  'SERM': 'SERM (selective estrogen receptor modulator)',
  'Growth factor': 'Hematopoietic growth factor',
  'Antifibrinolytic': 'Hematologic agent',
  'Antidote (heparin)': 'Antidote',
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
// REPLACE WITHIN EACH DRUG BLOCK
// ═══════════════════════════════════════════════════════════════════════

let moaFixed = 0, pkFixed = 0, pearlsFixed = 0, warningsFixed = 0, overdoseFixed = 0, bbwFixed = 0
let drugsEnriched = 0
const modifiedBlocks = []

for (const entry of drugBlocks) {
  const tmpl = matchClass(entry.drugClass)
  const idLower = entry.id.toLowerCase()
  const override = DRUG_OVERRIDES[idLower]

  if (!tmpl && !override) {
    modifiedBlocks.push(entry.block)
    continue
  }

  let block = entry.block
  let modified = false

  // Fix mechanism_of_action
  const moaRe = /mechanism_of_action\s*[:=]\s*['"]([^'"]*Pharmacological agent[^'"]*?)['"]/
  if (moaRe.test(block)) {
    const newMoa = override?.moa || tmpl?.moa
    if (newMoa) {
      const safeMoa = newMoa.replace(/'/g, "\\'").replace(/"/g, '\\"')
      block = block.replace(moaRe, (_, old) => {
        // Detect quote style
        if (block.includes(`mechanism_of_action: '`)) return `mechanism_of_action: '${safeMoa}'`
        return `mechanism_of_action": "${safeMoa}"`
      })
      moaFixed++
      modified = true
    }
  }

  // Fix pharmacokinetics
  const pkRe = /pharmacokinetics\s*[:=]\s*['"]([^'"]*Absorption: variable depending on route[^'"]*?)['"]/
  if (pkRe.test(block)) {
    const newPk = override?.pk || tmpl?.pk
    if (newPk) {
      const safePk = newPk.replace(/'/g, "\\'").replace(/"/g, '\\"')
      block = block.replace(pkRe, () => {
        if (block.includes(`pharmacokinetics: '`)) return `pharmacokinetics: '${safePk}'`
        return `pharmacokinetics": "${safePk}"`
      })
      pkFixed++
      modified = true
    }
  }

  // Fix clinical_pearls — single-quote array
  const pearlsSqRe = /clinical_pearls:\s*\['Clinical response varies based on patient factors',\s*'Monitor therapeutic response and adjust dose accordingly'\]/
  if (pearlsSqRe.test(block)) {
    const newPearls = override?.pearls || tmpl?.pearls
    if (newPearls) {
      const pearlsStr = newPearls.map(p => `'${p.replace(/'/g, "\\'")}'`).join(', ')
      block = block.replace(pearlsSqRe, `clinical_pearls: [${pearlsStr}]`)
      pearlsFixed++
      modified = true
    }
  }
  // Fix clinical_pearls — double-quote array
  const pearlsDqRe = /"clinical_pearls":\s*\["Clinical response varies based on patient factors",\s*"Monitor therapeutic response and adjust dose accordingly"\]/
  if (pearlsDqRe.test(block)) {
    const newPearls = override?.pearls || tmpl?.pearls
    if (newPearls) {
      const pearlsStr = newPearls.map(p => `"${p.replace(/"/g, '\\"')}"`).join(', ')
      block = block.replace(pearlsDqRe, `"clinical_pearls": [${pearlsStr}]`)
      pearlsFixed++
      modified = true
    }
  }

  // Fix warnings — single-quote array
  const warnSqRe = /warnings:\s*\['Use with caution in patients with pre-existing conditions',\s*'Monitor for side effects during therapy'\]/
  if (warnSqRe.test(block)) {
    const newWarnings = override?.warnings || tmpl?.warnings
    if (newWarnings) {
      const warnsStr = newWarnings.map(w => `'${w.replace(/'/g, "\\'")}'`).join(', ')
      block = block.replace(warnSqRe, `warnings: [${warnsStr}]`)
      warningsFixed++
      modified = true
    }
  }
  // Fix warnings — double-quote array
  const warnDqRe = /"warnings":\s*\["Use with caution in patients with renal or hepatic impairment",\s*"Monitor for adverse effects"\]/
  if (warnDqRe.test(block)) {
    const newWarnings = override?.warnings || tmpl?.warnings
    if (newWarnings) {
      const warnsStr = newWarnings.map(w => `"${w.replace(/"/g, '\\"')}"`).join(', ')
      block = block.replace(warnDqRe, `"warnings": [${warnsStr}]`)
      warningsFixed++
      modified = true
    }
  }

  // Fix overdose — generic
  const odSqRe = /overdose:\s*'Symptoms: nausea, vomiting, dizziness\. Management: supportive care\. No specific antidote\.'/
  const odDqRe = /"overdose":\s*"Symptoms: nausea, vomiting, dizziness, dose-related adverse effects\. Management: discontinue drug, provide supportive care\. No specific antidote\."/
  if (odSqRe.test(block) || odDqRe.test(block)) {
    const newOd = override?.overdose || tmpl?.overdose
    if (newOd) {
      const safeOd = newOd.replace(/'/g, "\\'").replace(/"/g, '\\"')
      if (odSqRe.test(block)) {
        block = block.replace(odSqRe, `overdose: '${safeOd}'`)
      } else {
        block = block.replace(odDqRe, `"overdose": "${safeOd}"`)
      }
      overdoseFixed++
      modified = true
    }
  }

  // Fix empty black_box_warnings if template has them
  const bbwSqRe = /black_box_warnings:\s*\[\]/
  const bbwDqRe = /"black_box_warnings":\s*\[\]/
  if ((bbwSqRe.test(block) || bbwDqRe.test(block)) && tmpl?.bbw && tmpl.bbw.length > 0) {
    const bbwStr = tmpl.bbw.map(b => `"${b}"`).join(', ')
    if (bbwSqRe.test(block)) {
      block = block.replace(bbwSqRe, `black_box_warnings: [${tmpl.bbw.map(b => `'${b}'`).join(', ')}]`)
    } else {
      block = block.replace(bbwDqRe, `"black_box_warnings": [${bbwStr}]`)
    }
    bbwFixed++
    modified = true
  }

  if (modified) drugsEnriched++
  modifiedBlocks.push(block)
}

// Now reconstruct the file
// We need to replace the original blocks in the source
let newSrc = src
// Replace from end to start to preserve indices
for (let i = drugBlocks.length - 1; i >= 0; i--) {
  const orig = drugBlocks[i].block
  const mod = modifiedBlocks[i]
  if (orig !== mod) {
    newSrc = newSrc.substring(0, drugBlocks[i].startIdx) + mod + newSrc.substring(drugBlocks[i].endIdx)
  }
}

console.log(`\n=== PHASE 1: Re-enrichment Results ===`)
console.log(`Drugs enriched: ${drugsEnriched}`)
console.log(`  MoA fixed: ${moaFixed}`)
console.log(`  PK fixed: ${pkFixed}`)
console.log(`  Pearls fixed: ${pearlsFixed}`)
console.log(`  Warnings fixed: ${warningsFixed}`)
console.log(`  Overdose fixed: ${overdoseFixed}`)
console.log(`  BBW filled: ${bbwFixed}`)

// ═══════════════════════════════════════════════════════════════════════
// PHASE 2: Add new essential drugs
// ═══════════════════════════════════════════════════════════════════════

const newLines = newSrc.split('\n')
let insertLine = -1
for (let i = newLines.length - 1; i >= 0; i--) {
  if (newLines[i].trim() === '];' || newLines[i].trim() === '],') {
    insertLine = i
    break
  }
}

if (insertLine === -1) {
  console.log('ERROR: Could not find closing ]; of BUNDLED_DRUGS array')
  process.exit(1)
}

const newDrugEntries = NEW_ESSENTIAL_DRUGS.map(drug => {
  const tmpl = matchClass(drug.drug_class)
  const override = DRUG_OVERRIDES[drug.id]
  const moa = (override?.moa || tmpl?.moa || 'Pharmacological agent: acts through specific receptor or enzyme interactions.').replace(/"/g, '\\"')
  const pk = (override?.pk || tmpl?.pk || 'Absorption: variable. Distribution: widespread. Metabolism: hepatic. Excretion: renal.').replace(/"/g, '\\"')
  const pearls = (override?.pearls || tmpl?.pearls || ['Monitor therapeutic response']).map(p => `"${p.replace(/"/g, '\\"')}"`).join(', ')
  const warnings = (override?.warnings || tmpl?.warnings || ['Use with caution']).map(w => `"${w.replace(/"/g, '\\"')}"`).join(', ')
  const overdose = (override?.overdose || tmpl?.overdose || 'Symptoms: dose-dependent adverse effects. Management: supportive care.').replace(/"/g, '\\"')
  const preg = tmpl?.preg || 'C'
  const brands = tmpl?.brands || [drug.name]
  const bbw = (tmpl?.bbw || []).map(b => `"${b.replace(/"/g, '\\"')}"`).join(', ')

  const dosageStr = `{ "adult": "${drug.dosage.adult}"${drug.dosage.paediatric ? `, "paediatric": "${drug.dosage.paediatric}"` : ''} }`

  return `    {"id":"${drug.id}","name":"${drug.name}","generic_name":"${drug.generic_name}","drug_class":"${drug.drug_class}","drug_class_id":null,"drug_class_name":"${drug.drug_class_name}","indications":[${drug.indications.map(i=>`"${i}"`).join(', ')}],"contraindications":[${drug.contraindications.map(c=>`"${c}"`).join(', ')}],"side_effects":[${drug.side_effects.map(s=>`"${s}"`).join(', ')}],"dosage":${dosageStr},"interactions":[${(drug.interactions||[]).map(i=>`"${i}"`).join(', ')}],"monitoring":"${(drug.monitoring||'Monitor therapeutic response').replace(/"/g,'\\"')}","patient_counselling":"${(drug.patient_counselling||'Follow healthcare provider instructions.').replace(/"/g,'\\"')}","mechanism_of_action":"${moa}","brand_names":[${brands.map(b=>`"${b}"`).join(', ')}],"pregnancy_category":"${preg}","warnings":[${warnings}],"overdose":"${overdose}","pharmacokinetics":"${pk}","black_box_warnings":[${bbw}],"clinical_pearls":[${pearls}]},`
})

newLines.splice(insertLine, 0, ...newDrugEntries)
newSrc = newLines.join('\n')

console.log(`\n=== PHASE 2: Added ${NEW_ESSENTIAL_DRUGS.length} new essential drugs ===`)

// ═══════════════════════════════════════════════════════════════════════
// WRITE & VERIFY
// ═══════════════════════════════════════════════════════════════════════

writeFileSync(FILE, newSrc, 'utf-8')

const finalLines = newSrc.split('\n').length
const idCount = (newSrc.match(/"id":\s*"[^"]+"/g) || []).length + (newSrc.match(/\bid\s*:\s*'[^']+'/g) || []).length
const moaGen = (newSrc.match(/Pharmacological agent/g) || []).length
const pkGen = (newSrc.match(/Absorption: variable depending on route/g) || []).length
const pearlsGen = (newSrc.match(/Clinical response varies based on patient factors/g) || []).length
const warnGen = (newSrc.match(/Use with caution in patients/g) || []).length
const odGen = (newSrc.match(/Symptoms: nausea, vomiting, dizziness\. Management: supportive care\. No specific antidote/g) || []).length

console.log(`\n=== FINAL RESULTS ===`)
console.log(`Total drugs: ${idCount}`)
console.log(`Lines: ${finalLines} (was ${originalLines})`)
console.log(`Size: ${(newSrc.length / 1024).toFixed(1)} KB`)
console.log(`\nRemaining generic placeholders:`)
console.log(`  MoA (Pharmacological agent): ${moaGen}`)
console.log(`  PK (Absorption: variable): ${pkGen}`)
console.log(`  Pearls (Clinical response varies): ${pearlsGen}`)
console.log(`  Warnings (Use with caution in patients): ${warnGen}`)
console.log(`  Overdose (nausea, vomiting, dizziness generic): ${odGen}`)
console.log(`\nDone!`)
