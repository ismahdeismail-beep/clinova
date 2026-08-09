// Converts scripts/out/parsed-papers/*.json (intermediate format) into the app's
// GeneratedPaper shape (src/data/examPrepPapers.ts interfaces) for the OLD pharmacology set.
// Output: src/data/examPrepPapersOldPharm.ts
// - Anonymized: no unit codes, no university/school names
// - Section marks normalized to A=30 / B=40 / C=30 (real questions kept verbatim)
// - Answer keys (answer/explanation/modelAnswer) intentionally left out: generated separately
import { readFileSync, writeFileSync } from 'fs'

const UNITS = [
  ['3101', 'pharm-gen-principles', 'General Principles of Pharmacology'],
  ['3102', 'pharm-autonomic', 'Autonomic Pharmacology'],
  ['3203', 'pharm-autacoids', 'Autacoids'],
  ['3305', 'pharm-cns', 'Central Nervous System Pharmacology'],
  ['3306', 'pharm-cardiovascular', 'Cardiovascular Pharmacology'],
  ['3307', 'pharm-endocrine-resp', 'Endocrine & Respiratory Pharmacology'],
  ['4108', 'pharm-gi', 'Gastrointestinal Pharmacology'],
  ['4109', 'pharm-chemo-agents', 'Chemotherapeutic Agents'],
  ['4209', 'pharm-chemo-infections', 'Chemotherapy of Infections'],
  ['5111', 'pharm-anticancer-derm-ocular', 'Anticancer, Dermatological & Ocular Drugs'],
  ['5112', 'pharm-vitamins-hormones', 'Vitamins, Hormones & Endocrine Pharmacology'],
  ['5314', 'pharm-toxicology', 'Toxicology & Drug Discovery'],
]

// Real second sittings (variant 2) — genuinely distinct papers parsed as <code>b
const SECOND_SITTINGS = {
  '3306': ['3306b', 'Cardiovascular Pharmacology (July 2019)'],
  '5111': ['5111b', 'Anticancer, Dermatological & Ocular Drugs (Special Exam)'],
  '5112': ['5112b', 'Vitamins, Hormones & Endocrine Pharmacology (Special Exam)'],
}

const MARKS = { A: 30, B: 40, C: 30 }
const NAMES = { A: 'Multiple Choice Questions', B: 'Short Answer Questions', C: 'Long Answer Questions' }

function buildPaper(code, title) {
  const p = JSON.parse(readFileSync('scripts/out/parsed-papers/' + code + '.json', 'utf8'))
  const sections = []
  for (const letter of ['A', 'B', 'C']) {
    const qs = p.sections[letter]
    const questions = qs.map((q) => {
      const base = { stem: q.stem }
      if (q.options) base.options = q.options
      return base
    })
    sections.push({ letter, name: NAMES[letter], marks: MARKS[letter], questions })
  }
  return { title, sections }
}

const record = {}
for (const [code, slug, title] of UNITS) {
  const paper = buildPaper(code, title)
  const variants = { 1: { title, variant: 1, sections: paper.sections } }
  if (SECOND_SITTINGS[code]) {
    const [bCode, bTitle] = SECOND_SITTINGS[code]
    const b = buildPaper(bCode, bTitle)
    variants[2] = { title: bTitle, variant: 2, sections: b.sections }
  }
  record[slug] = variants
  console.log(slug, '|', title, '| A=' + paper.sections[0].questions.length, 'B=' + paper.sections[1].questions.length, 'C=' + paper.sections[2].questions.length)
}

const header = `// AUTO-GENERATED from the real OLD-curriculum past papers (scripts/out/parsed-papers, latest paper per unit).
// Questions are 100% verbatim from the source papers; only unit codes / school names were removed.
// Section marks are normalized to A=30 / B=40 / C=30 (real question counts vary).
// Answer keys are added separately (AI-generated metadata).
// Do not edit by hand — regenerate with scripts/convert-parsed-papers.mjs.
import { type GeneratedPaper } from './examPrepPapers';

export const EXAM_PREP_PAPERS_OLD_PHARM: Record<string, Record<number, GeneratedPaper>> =
`

writeFileSync('src/data/examPrepPapersOldPharm.ts', header + JSON.stringify(record, null, 2) + '\n')
console.log('wrote src/data/examPrepPapersOldPharm.ts')
