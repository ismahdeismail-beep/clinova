import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';

const outDir = './scripts/out';
const files = readdirSync(outDir).filter((f) => f.endsWith('.json'));

const merged: any = {};
for (const f of files) {
  const data = JSON.parse(readFileSync(`${outDir}/${f}`, 'utf8'));
  for (const id of Object.keys(data)) {
    merged[id] = data[id];
  }
}

const out = `// AUTO-GENERATED mock exam papers (do not edit by hand).
// Grounded in the real crawled past papers (src/data/examPrepCrawled.ts) plus the Clinova
// clinical-case bank and KDI drug monographs, generated via Mistral (mistral-small-latest).
// 8 clinical-pharmacy subjects x 3 papers each (standard format A=30 / B=40 / C=30 = 100 marks).
// Titles mirror the real past-paper names (e.g. "Clinical Pharmacy — Respiratory & Renal").
// No unit codes or school name included.
import { type ExamUnitSpec } from './examPrepData';

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
  questions: GeneratedQuestion[];
}

export interface GeneratedPaper {
  title: string;
  variant: number;
  sections: GeneratedSection[];
}

export const EXAM_PREP_PAPERS: Record<string, Record<number, GeneratedPaper>> =
${JSON.stringify(merged, null, 2)};

export function getExamPrepPaper(unitId: string, variant: number): GeneratedPaper | undefined {
  return EXAM_PREP_PAPERS[unitId]?.[variant];
}
`;

writeFileSync('./src/data/examPrepPapers.ts', out);
console.log(`Merged ${files.length} files → src/data/examPrepPapers.ts (${Object.keys(merged).length} subjects)`);
void existsSync;
