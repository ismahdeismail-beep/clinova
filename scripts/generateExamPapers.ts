import { writeFileSync, readFileSync } from 'fs';
import { EXAM_PREP_UNITS } from '../src/data/examPrepData';
import { INTEGRATED_UNITS_MAP } from '../src/data/curriculum';

const RAW_SPECIALTY_MAP: Record<string, string> = {
  'Clinical Pharmacy / Polypharmacy': 'cp-ger',
  'Clinical Pharmacy / Transitions of Care': 'cp-ger',
  'Clinical Pharmacy / Pharmacokinetics': 'cp-renal',
  'Clinical Pharmacy / Antimicrobial Stewardship': 'cp-id',
};
import { clinical_pharmacy_cases } from '../src/data/clinicalCases/clinical_pharmacy';
import { BUNDLED_DRUGS } from '../src/data/drugIndexData';
import { CRAWLED_EXAM_TEXT } from '../src/data/examPrepCrawled';

const orKey =
  readFileSync('.env', 'utf8')
    .split('\n')
    .find((l) => l.startsWith('MISTRAL_API_KEY='))
    ?.split('=', 2)[1]
    .trim()
    .replace(/^"|"$/g, '') || process.env.MISTRAL_API_KEY;

const ENDPOINT = 'https://api.mistral.ai/v1/chat/completions';
const MODEL = 'mistral-small-latest';
const UNITS: any[] = EXAM_PREP_UNITS;

function specialtyToUnit(specialty: string): string | undefined {
  return INTEGRATED_UNITS_MAP[specialty] || RAW_SPECIALTY_MAP[specialty];
}

// Supporting knowledge: real clinical cases + formulary monographs for the mapped units
function buildSupportContext(spec: any): string {
  const units = spec.mappedUnits as string[];
  const cases = clinical_pharmacy_cases
    .filter((c: any) => {
      const u = specialtyToUnit(c.specialty);
      return u && units.includes(u);
    })
    .slice(0, 4);

  const caseText = cases
    .map((c: any) => {
      const meds = (c.medHx || '').toString().split('\n').slice(0, 12).join('\n');
      return `CASE (${c.specialty}): ${c.title}\nHPI: ${(c.hpi || '').slice(0, 300)}\nMeds: ${meds}\nPharm: ${(c.pharm || '').slice(0, 350)}\nPearls: ${(c.pearls || '').slice(0, 200)}`;
    })
    .join('\n---\n');

  const topicBlob = (spec.topics as string[]).join(' ').toLowerCase();
  const drugs = BUNDLED_DRUGS.filter((d: any) => {
    const blob = `${d.name} ${d.drug_class} ${((d.indications as string[]) || []).join(' ')}`.toLowerCase();
    return topicBlob.split(' ').some((w) => w.length > 4 && blob.includes(w));
  }).slice(0, 12);

  const drugText = drugs
    .map((d: any) =>
      `${d.name} (${d.drug_class}): ${(d.indications || []).join(', ')}; SE: ${((d.side_effects as string[]) || []).slice(0, 4).join(', ')}; monitoring: ${d.monitoring || '-'}`
    )
    .join('\n');

  return `SUPPORTING KNOWLEDGE (real Clinova cases + KDI formulary — use to enrich applied detail):\n${caseText || '(none)'}\n\n${drugText || '(none)'}`;
}

function buildPrompt(spec: any, variant: number, crawled: string, support: string) {
  const variantNote =
    variant === 2
      ? 'This is PAPER 2 — a SECOND, DISTINCT mock paper. Use DIFFERENT stems, vignettes, and distractors from Paper 1. Do not repeat Paper 1 questions.'
      : 'This is PAPER 1 (the first mock paper).';
  const structureText = spec.structure
    .map((s: any) => `SECTION ${s.letter}: ${s.name} - ${s.count} question(s), ${s.marks} marks. Instruction: ${s.instruction}`)
    .join('\n');
  const topicsText = spec.topics.map((t: string, i: number) => `${i + 1}. ${t}`).join('\n');

  return `You are a senior clinical-pharmacy examiner. Generate a complete, realistic mock examination paper for: "${spec.title}".

EXAM STRUCTURE (follow EXACTLY — same sections, same question counts, same marks):
${structureText}

TOPIC AREAS THE PAPER MUST COVER (draw questions from these, weighted to the unit):
${topicsText}

${variantNote}

GROUNDING — the REAL past paper for this subject is supplied below. Study its question style, wording, difficulty, and the facts it tests, then write a NEW paper in the SAME voice and pattern (Katzung-style applied pharmacology: mechanism -> clinical use -> adverse effects -> monitoring). Reuse the same clinical themes and factual content, but rephrase stems and shuffle distractors so it is a fresh mock, not a copy. Every MCQ must have exactly one correct answer; all options plausible and clinically defensible.

REAL CRAWLED PAST PAPER:
${crawled}

${support}

Respond with ONLY a JSON object (no markdown fences, no commentary) of exactly this shape:
{
  "title": "${spec.title}",
  "variant": ${variant},
  "sections": [
    {
      "letter": "A",
      "name": "Multiple Choice Questions",
      "marks": <number>,
      "questions": [ { "stem": "<clinical vignette or concept question>", "options": ["a","b","c","d"], "answer": "<exact correct option text>", "explanation": "<1-2 sentence rationale citing the mechanism/fact>" } ]
    },
    {
      "letter": "B",
      "name": "Short Answer Questions",
      "marks": <number>,
      "questions": [ { "stem": "<question>", "modelAnswer": "<concise, complete expected answer>" } ]
    },
    {
      "letter": "C",
      "name": "Long Answer Questions",
      "marks": <number>,
      "questions": [ { "stem": "<question>", "modelAnswer": "<structured exam-style answer with clear headings>" } ]
    }
  ]
}`;
}

async function generate(spec: any, variant: number): Promise<any> {
  const crawled = (CRAWLED_EXAM_TEXT as any)[spec.id] || '';
  const support = buildSupportContext(spec);
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${orKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content:
                'You are a senior clinical-pharmacy examiner. Write board-style exam papers that are clinically accurate, guideline-aligned (WHO/KDI), and pedagogically sound. Every MCQ has exactly one unambiguously correct answer. Respond with valid JSON only.',
            },
            { role: 'user', content: buildPrompt(spec, variant, crawled, support) },
          ],
        }),
      });
      if (!resp.ok) {
        const t = await resp.text();
        throw new Error(`${resp.status} ${t.slice(0, 140)}`);
      }
      const data = await resp.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (e: any) {
      console.error(`Retry ${spec.id} paper ${variant} attempt ${attempt + 1}:`, e.message);
      await new Promise((r) => setTimeout(r, 2500));
    }
  }
  throw new Error(`Failed to generate ${spec.id} paper ${variant}`);
}

const results: any = {};

for (const spec of UNITS) {
  results[spec.id] = {};
  for (const variant of [1, 2]) {
    const paper = await generate(spec, variant);
    results[spec.id][variant] = paper;
    console.log(`OK ${spec.id} paper ${variant}`);
  }
}

const out = `// AUTO-GENERATED mock exam papers (do not edit by hand).
// Grounded in the real crawled past papers (src/data/examPrepCrawled.ts) plus the Clinova
// clinical-case bank and KDI drug monographs, via Gemini 2.5 Flash (OpenRouter).
// 8 clinical-pharmacy subjects x 2 papers each. Titles mirror the real past-paper names.
import { type ExamUnitSpec } from './examPrepData';

export interface GeneratedQuestion {
  stem: string;
  options?: string[];
  answer?: string;
  explanation?: string;
  modelAnswer?: string;
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
${JSON.stringify(results, null, 2)};

export function getExamPrepPaper(unitId: string, variant: number): GeneratedPaper | undefined {
  return EXAM_PREP_PAPERS[unitId]?.[variant];
}
`;

writeFileSync('./src/data/examPrepPapers.ts', out);
console.log('Wrote src/data/examPrepPapers.ts');
