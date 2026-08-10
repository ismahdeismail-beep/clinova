import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import { EXAM_PREP_UNITS } from '../src/data/examPrepData';
import { INTEGRATED_UNITS_MAP } from '../src/data/curriculum';
import { clinical_pharmacy_cases } from '../src/data/clinicalCases/clinical_pharmacy';
import { BUNDLED_DRUGS } from '../src/data/drugIndexData';
import { CRAWLED_EXAM_TEXT } from '../src/data/examPrepCrawled';

const mk =
  readFileSync('.env', 'utf8')
    .split('\n')
    .find((l) => l.startsWith('MISTRAL_API_KEY='))
    ?.split('=', 2)[1]
    .trim()
    .replace(/^"|"$/g, '') || process.env.MISTRAL_API_KEY;

const specId = process.argv[2];
if (!specId) {
  console.error('usage: generateOne.ts <exam-spec-id>');
  process.exit(1);
}
const spec: any = EXAM_PREP_UNITS.find((u) => u.id === specId);
if (!spec) {
  console.error('unknown spec', specId);
  process.exit(1);
}

const RAW_SPECIALTY_MAP: Record<string, string> = {
  'Clinical Pharmacy / Polypharmacy': 'cp-ger',
  'Clinical Pharmacy / Transitions of Care': 'cp-ger',
  'Clinical Pharmacy / Pharmacokinetics': 'cp-renal',
  'Clinical Pharmacy / Antimicrobial Stewardship': 'cp-id',
};
function specialtyToUnit(s: string) {
  return INTEGRATED_UNITS_MAP[s] || RAW_SPECIALTY_MAP[s];
}

function buildSupport(s: any): string {
  const units = s.mappedUnits as string[];
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
  const topicBlob = (s.topics as string[]).join(' ').toLowerCase();
  const drugs = BUNDLED_DRUGS.filter((d: any) => {
    const blob = `${d.name} ${d.drug_class} ${((d.indications as string[]) || []).join(' ')}`.toLowerCase();
    return topicBlob.split(' ').some((w) => w.length > 4 && blob.includes(w));
  }).slice(0, 12);
  const drugText = drugs
    .map((d: any) => `${d.name} (${d.drug_class}): ${(d.indications || []).join(', ')}; SE: ${((d.side_effects as string[]) || []).slice(0, 4).join(', ')}; monitoring: ${d.monitoring || '-'}`)
    .join('\n');
  return `SUPPORTING KNOWLEDGE (real Clinova cases + KDI formulary):\n${caseText || '(none)'}\n\n${drugText || '(none)'}`;
}

function buildPrompt(s: any, variant: number, crawled: string, support: string) {
  const variantNote =
    variant === 3
      ? 'This is PAPER 3 — a THIRD, DISTINCT mock paper. Use DIFFERENT stems, vignettes, and distractors from Paper 1 and Paper 2. Do not repeat any earlier questions.'
      : variant === 2
        ? 'This is PAPER 2 — a SECOND, DISTINCT mock paper. Use DIFFERENT stems, vignettes, and distractors from Paper 1. Do not repeat Paper 1 questions.'
        : 'This is PAPER 1 (the first mock paper).';
  const structureText = s.structure
    .map((x: any) => `SECTION ${x.letter}: ${x.name} - ${x.count} question(s), ${x.marks} marks. Instruction: ${x.instruction}`)
    .join('\n');
  const topicsText = s.topics.map((t: string, i: number) => `${i + 1}. ${t}`).join('\n');
  return `You are a senior clinical-pharmacy examiner. Generate a complete, realistic mock examination paper for: "${s.title}".

EXAM STRUCTURE (follow EXACTLY — same sections, same question counts, same marks). This is the fixed standard format (total 100 marks):
${structureText}

MANDATORY FORMAT RULES:
- Section A: Multiple Choice Questions worth 30 marks total (provide 30 MCQs, each with exactly 4 options and one correct answer).
- Section B: Short Answer Questions worth 40 marks total — provide EXACTLY 8 questions (5 marks each). A question MAY contain labelled subsections (e.g. a, b, c).
- Section C: Long Answer Questions worth 30 marks total — provide EXACTLY 2 questions (15 marks each). Each question MAY contain labelled subsections (e.g. a, b, c) with mark allocations.
- Do NOT deviate from these section marks or question counts.

TOPIC AREAS THE PAPER MUST COVER (draw questions from these, weighted to the unit):
${topicsText}

${variantNote}

GROUNDING — the REAL past paper for this subject is supplied below. Study its question style, wording, difficulty, and the facts it tests, then write a NEW paper in the SAME voice and pattern (Katzung-style applied pharmacology: mechanism → clinical use → adverse effects → monitoring). Reuse the same clinical themes and factual content, but rephrase stems and shuffle distractors so it is a fresh mock, not a copy. Every MCQ must have exactly one correct answer; all options plausible and clinically defensible.

REAL CRAWLED PAST PAPER:
${crawled}

${support}

Respond with ONLY a JSON object (no markdown fences, no commentary) of exactly this shape:
{
  "title": "${s.title}",
  "variant": ${variant},
  "sections": [
    { "letter": "A", "name": "Multiple Choice Questions", "marks": <number>,
      "questions": [ { "stem": "<clinical vignette or concept question>", "options": ["a","b","c","d"], "answer": "<exact correct option text>", "explanation": "<1-2 sentence rationale>" } ] },
    { "letter": "B", "name": "Short Answer Questions", "marks": <number>,
      "questions": [ { "stem": "<question>", "modelAnswer": "<concise, complete expected answer>" } ] },
    { "letter": "C", "name": "Long Answer Questions", "marks": <number>,
      "questions": [ { "stem": "<question>", "modelAnswer": "<structured exam-style answer with clear headings>" } ] }
  ]
}`;
}

async function generate(variant: number): Promise<any> {
  const crawled = (CRAWLED_EXAM_TEXT as any)[spec.id] || '';
  const support = buildSupport(spec);
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const resp = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${mk}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'mistral-small-latest',
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: 'You are a senior clinical-pharmacy examiner. Clinically accurate, guideline-aligned (WHO/KDI). Every MCQ has exactly one correct answer. Valid JSON only.' },
            { role: 'user', content: buildPrompt(spec, variant, crawled, support) },
          ],
        }),
      });
      if (!resp.ok) throw new Error(`${resp.status} ${(await resp.text()).slice(0, 140)}`);
      return JSON.parse((await resp.json()).choices[0].message.content);
    } catch (e: any) {
      console.error(`retry ${spec.id} p${variant} a${attempt + 1}:`, e.message);
      await new Promise((r) => setTimeout(r, 2500));
    }
  }
  throw new Error(`fail ${spec.id} p${variant}`);
}

const outDir = './scripts/out';
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const result: any = { [spec.id]: {} };
for (const v of [1, 2, 3]) {
  result[spec.id][v] = await generate(v);
  console.log(`OK ${spec.id} paper ${v}`);
}
writeFileSync(`${outDir}/${spec.id}.json`, JSON.stringify(result, null, 2));
console.log(`wrote ${outDir}/${spec.id}.json`);
