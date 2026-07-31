// Merges the AI-generated answer keys (scripts/out/answer-keys/*.json) into the
// OLD pharmacology papers file (src/data/examPrepPapersOldPharm.ts).
// - A questions get { answer, explanation } (answer must exactly match an option string)
// - B/C questions get { modelAnswer }
// Run after scripts/convert-parsed-papers.mjs. Validates counts before writing.
import { readFileSync, writeFileSync } from 'fs'

const UNITS = [
  ['3101', 'pharm-gen-principles', 'General Principles of Pharmacology', 'pharm-gen-principles.json'],
  ['3102', 'pharm-autonomic', 'Autonomic Pharmacology', 'pharm-autonomic.json'],
  ['3203', 'pharm-autacoids', 'Autacoids', 'pharm-autacoids.json'],
  ['3305', 'pharm-cns', 'Central Nervous System Pharmacology', 'pharm-cns.json'],
  ['3306', 'pharm-cardiovascular', 'Cardiovascular Pharmacology', 'pharm-cardiovascular.json'],
  ['3307', 'pharm-endocrine-resp', 'Endocrine & Respiratory Pharmacology', 'pharm-endocrine-resp.json'],
  ['4108', 'pharm-gi', 'Gastrointestinal Pharmacology', 'pharm-gi.json'],
  ['4109', 'pharm-chemo-agents', 'Chemotherapeutic Agents', 'pharm-chemo.json'],
  ['4209', 'pharm-chemo-infections', 'Chemotherapy of Infections', 'pharm-infections.json'],
  ['5111', 'pharm-anticancer-derm-ocular', 'Anticancer, Dermatological & Ocular Drugs', 'pharm-cancer-derm-ocular.json'],
  ['5112', 'pharm-vitamins-hormones', 'Vitamins, Hormones & Endocrine Pharmacology', 'pharm-vitamins-hormones.json'],
  ['5314', 'pharm-toxicology', 'Toxicology & Drug Discovery', 'pharm-toxicology.json'],
]

const MARKS = { A: 30, B: 40, C: 30 }
const NAMES = { A: 'Multiple Choice Questions', B: 'Short Answer Questions', C: 'Long Answer Questions' }

const record = {}
for (const [code, slug, title, keyFile] of UNITS) {
  const p = JSON.parse(readFileSync('scripts/out/parsed-papers/' + code + '.json', 'utf8'))
  const k = JSON.parse(readFileSync('scripts/out/answer-keys/' + keyFile, 'utf8'))

  // Sanity checks: key counts must match paper counts
  if (k.a.length !== p.sections.A.length) throw new Error(`${slug}: A key ${k.a.length} != paper ${p.sections.A.length}`)
  if (k.b.length !== p.sections.B.length) throw new Error(`${slug}: B key ${k.b.length} != paper ${p.sections.B.length}`)
  if (k.c.length !== p.sections.C.length) throw new Error(`${slug}: C key ${k.c.length} != paper ${p.sections.C.length}`)

  // A answers must exactly match an option string
  p.sections.A.forEach((q, i) => {
    const ans = k.a[i].answer
    if (q.options && !q.options.includes(ans)) {
      throw new Error(`${slug} A${i + 1}: answer ${JSON.stringify(ans)} not found among options`)
    }
  })

  const sections = []
  const letters = ['A', 'B', 'C']
  const keyArr = { A: k.a, B: k.b, C: k.c }
  for (const letter of letters) {
    const qs = p.sections[letter]
    const questions = qs.map((q, i) => {
      const base = { stem: q.stem }
      if (q.options) base.options = q.options
      const keyQ = keyArr[letter][i]
      if (letter === 'A') {
        base.answer = keyQ.answer
        base.explanation = keyQ.explanation
      } else {
        base.modelAnswer = keyQ.modelAnswer
      }
      return base
    })
    sections.push({ letter, name: NAMES[letter], marks: MARKS[letter], questions })
  }
  record[slug] = {
    1: { title, variant: 1, sections },
  }
  console.log(slug, '| A=' + k.a.length, 'B=' + k.b.length, 'C=' + k.c.length, '-> merged')
}

const header = `// AUTO-GENERATED from the real OLD-curriculum past papers (scripts/out/parsed-papers, latest paper per unit).
// Questions are 100% verbatim from the source papers; only unit codes / school names were removed.
// Section marks are normalized to A=30 / B=40 / C=30 (real question counts vary).
// A-questions carry AI-generated { answer, explanation }; B/C questions carry { modelAnswer }.
// Do not edit by hand — regenerate with scripts/convert-parsed-papers.mjs + scripts/merge-answer-keys.mjs.
import { type GeneratedPaper } from './examPrepPapers';

export const EXAM_PREP_PAPERS_OLD_PHARM: Record<string, Record<number, GeneratedPaper>> =
`

writeFileSync('src/data/examPrepPapersOldPharm.ts', header + JSON.stringify(record, null, 2) + '\n')
console.log('wrote src/data/examPrepPapersOldPharm.ts (with answer keys)')
