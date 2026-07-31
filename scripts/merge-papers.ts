// scripts/merge-papers.ts — merge NEW mock papers + OLD real papers into examPrepPapers.ts
// Removes the 8 intermixed pharm keys, adds 12 OLD (variant 1) + 36 NEW (variants 1-3).
import { writeFileSync, readFileSync, readdirSync } from 'fs'
import { EXAM_PREP_PAPERS } from '../src/data/examPrepPapers'
import { EXAM_PREP_PAPERS_OLD_PHARM } from '../src/data/examPrepPapersOldPharm'
import type { GeneratedPaper } from '../src/data/examPrepPapers'

const REMOVE_KEYS = new Set([
  'pharm-general',
  'pharm-autonomic',
  'pharm-autacoids-cns',
  'pharm-cvs',
  'pharm-resp-renal-git',
  'pharm-chemo',
  'pharm-anticancer-endo',
  'pharm-toxicology',
])

const NEW_DIR = './scripts/out/new'

// 1. Build merged object: keep existing (minus intermixed), add OLD + NEW
const merged: Record<string, Record<number, GeneratedPaper>> = {}

// Keep existing units (8 clinical + 8 intermixed-to-remove)
for (const [unitId, variants] of Object.entries(EXAM_PREP_PAPERS)) {
  if (REMOVE_KEYS.has(unitId)) continue
  merged[unitId] = variants
}

// Add OLD papers (variant 1 only) — kept for current learners, removed in future
for (const [unitId, variants] of Object.entries(EXAM_PREP_PAPERS_OLD_PHARM)) {
  merged[unitId] = { 1: variants[1] }
}

// Add NEW papers (variants 1-3)
const newFiles = readdirSync(NEW_DIR).filter((f) => f.endsWith('.json')).sort()
for (const file of newFiles) {
  const json = JSON.parse(readFileSync(`${NEW_DIR}/${file}`, 'utf8'))
  const unitId = Object.keys(json)[0]
  merged[unitId] = json[unitId]
}

// 2. Serialize to TypeScript format
function serializePaper(paper: any, indent: string): string {
  const json = JSON.stringify(paper, null, 2)
    .replace(/"(\d+)":/g, '$1:') // numeric keys unquoted
  const lines = json.split('\n')
  // First line ({) follows "vk: " on the same line — no extra indent
  return lines[0] + '\n' + lines.slice(1).map((l) => indent + l).join('\n')
}

let body = ''
for (const unitId of Object.keys(merged).sort()) {
  const variants = merged[unitId]
  body += `  "${unitId}": {\n`
  for (const vk of Object.keys(variants).sort((a, b) => Number(a) - Number(b))) {
    body += `    ${vk}: ${serializePaper(variants[Number(vk)], '      ')},\n`
  }
  body += `  },\n`
}

// 3. Assemble full file
const fileContent = `// AUTO-GENERATED mock exam papers (do not edit by hand).
// Grounded in the real crawled past papers (src/data/examPrepCrawled.ts) plus the Clinova
// clinical-case bank and KDI drug monographs, generated via Mistral (mistral-small-latest).
// Two sets: NEW-curriculum mock papers (3 variants each) + OLD-curriculum real past papers
// (variant 1 only, kept for current learners). Standard format A=30 / B=40 / C=30 = 100 marks.
// Regenerate with: npx tsx scripts/merge-papers.ts
import { type ExamUnitSpec } from './examPrepData';
import { EXAM_PREP_PAPERS_OLD_PHARM } from './examPrepPapersOldPharm';

export interface GeneratedQuestion {
  stem: any;
  options?: any[];
  answer?: any;
  explanation?: any;
  modelAnswer?: any;
}

export interface GeneratedSection {
  letter: string;
  name: string;
  marks: number;
  instruction?: string;
  questions: GeneratedQuestion[];
}

export interface GeneratedPaper {
  title: string;
  variant: number;
  sections: GeneratedSection[];
}

export const EXAM_PREP_PAPERS: Record<string, Record<number, GeneratedPaper>> =
{
${body}};\n
export function getExamPrepPaper(unitId: string, variant: number): GeneratedPaper | undefined {
  return EXAM_PREP_PAPERS[unitId]?.[variant] ?? EXAM_PREP_PAPERS_OLD_PHARM[unitId]?.[variant];
}
`

// 4. Write
writeFileSync('src/data/examPrepPapers.ts', fileContent)
console.log('Done! Updated examPrepPapers.ts')
console.log(`  Kept ${Object.keys(merged).length - newFiles.length - Object.keys(EXAM_PREP_PAPERS_OLD_PHARM).length} existing units`)
console.log(`  Removed ${REMOVE_KEYS.size} intermixed keys`)
console.log(`  Added ${Object.keys(EXAM_PREP_PAPERS_OLD_PHARM).length} OLD specs (variant 1 each)`)
console.log(`  Added ${newFiles.length} NEW specs (3 papers each)`)
console.log(`  Total units: ${Object.keys(merged).length}`)
