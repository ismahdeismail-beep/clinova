// scripts/generate-old-extras.ts — generate OLD-curriculum v2/v3 papers (and vet v1-v3) via Mistral.
// Writes scripts/out/old-extras/<unitId>.json in the app schema, merging with existing variants.
// Grounding: real v1 (and v2 where present) papers from EXAM_PREP_PAPERS_OLD_PHARM.
// Usage: npx tsx scripts/generate-old-extras.ts <unitId>
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs'
import { request as httpsRequest } from 'https'
import { EXAM_PREP_UNITS } from '../src/data/examPrepData'
import { EXAM_PREP_PAPERS_OLD_PHARM } from '../src/data/examPrepPapersOldPharm'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData'

const mk =
  readFileSync('.env', 'utf8')
    .split('\n')
    .find((l) => l.startsWith('MISTRAL_API_KEY='))
    ?.split('=', 2)[1]
    .trim()
    .replace(/^"|"$/g, '') || process.env.MISTRAL_API_KEY

const unitId = process.argv[2]
if (!unitId) {
  console.error('usage: npx tsx generate-old-extras.ts <unitId>')
  process.exit(1)
}

// Units that already have a REAL second sitting (v2) — only generate v3.
// All other OLD units generate v2 + v3. pharm-veterinary generates v2 + v3 (v1 hand-written).
const V3_ONLY = new Set(['pharm-cardiovascular', 'pharm-anticancer-derm-ocular', 'pharm-vitamins-hormones'])
const VARIANTS = V3_ONLY.has(unitId) ? [3] : [2, 3]

// OLD-curriculum standard format (matches the real past papers and validate-papers.ts):
const STRUCT = [
  { letter: 'A', name: 'Multiple Choice Questions', count: 30, marks: 30 },
  { letter: 'B', name: 'Short Answer Questions', count: 6, marks: 40 },
  { letter: 'C', name: 'Long Answer Questions', count: 2, marks: 30 },
]

function buildGrounding(): string {
  const parts: string[] = []
  const v1 = EXAM_PREP_PAPERS_OLD_PHARM[unitId]?.[1]
  if (v1) {
    const lines: string[] = [`### REAL PAST PAPER (variant 1) — ${v1.title} ###`]
    for (const sec of v1.sections) {
      lines.push(`SECTION ${sec.letter}: ${sec.name} [${sec.marks} marks]`)
      sec.questions.forEach((q: any, i: number) => {
        lines.push(`${i + 1}. ${q.stem}`)
        if (q.options && q.options.length) q.options.forEach((o: string) => lines.push(`   - ${o}`))
        if (q.answer) lines.push(`   ANSWER: ${q.answer}`)
        if (q.explanation) lines.push(`   WHY: ${q.explanation}`)
        if (q.modelAnswer) lines.push(`   MODEL ANSWER: ${String(q.modelAnswer).slice(0, 900)}`)
        lines.push('')
      })
    }
    parts.push(lines.join('\n'))
  }
  const v2 = EXAM_PREP_PAPERS_OLD_PHARM[unitId]?.[2]
  if (v2) {
    const lines: string[] = [`### REAL PAST PAPER (variant 2) — ${v2.title} — DO NOT REPEAT THESE STEMS ###`]
    for (const sec of v2.sections) {
      sec.questions.forEach((q: any, i: number) => {
        lines.push(`${sec.letter}${i + 1}. ${String(q.stem).slice(0, 160)}`)
      })
    }
    parts.push(lines.join('\n'))
  }
  if (parts.length === 0) {
    parts.push('(No real past paper exists for this unit — write a realistic Kabarak-style paper from the topic list and supporting knowledge.)')
  }
  return parts.join('\n\n')
}

function buildSupportContext(): string {
  const spec: any = EXAM_PREP_UNITS.find((u: any) => u.id === unitId)
  const topicBlob = (((spec?.topics as string[]) || []).join(' ')).toLowerCase()
  const drugs = BUNDLED_DRUGS.filter((d: any) => {
    const blob = `${d.name} ${d.drug_class} ${((d.indications as string[]) || []).join(' ')}`.toLowerCase()
    return topicBlob.split(' ').some((w) => w.length > 4 && blob.includes(w))
  }).slice(0, 12)
  const drugText = drugs
    .map((d: any) =>
      `${d.name} (${d.drug_class}): ${(d.indications || []).join(', ')}; SE: ${((d.side_effects as string[]) || []).slice(0, 4).join(', ')}; monitoring: ${d.monitoring || '-'}`
    )
    .join('\n')
  return `SUPPORTING KNOWLEDGE (real Clinova KDI formulary — use to enrich applied detail):\n${drugText || '(none)'}`
}

function buildPrompt(variant: number, grounding: string, support: string) {
  const spec: any = EXAM_PREP_UNITS.find((u: any) => u.id === unitId)
  const title = spec?.title ?? EXAM_PREP_PAPERS_OLD_PHARM[unitId]?.[1]?.title ?? unitId
  const topicsText = ((spec?.topics as string[]) || []).map((t: string, i: number) => `${i + 1}. ${t}`).join('\n')
  const variantNote =
    variant === 3
      ? 'This is PAPER 3 — a THIRD, DISTINCT paper. Use DIFFERENT stems, vignettes and distractors from ALL earlier papers (v1 and v2). Do not repeat any earlier question.'
      : 'This is PAPER 2 — a SECOND, DISTINCT paper. Use DIFFERENT stems, vignettes and distractors from the real variant-1 paper. Do not repeat any variant-1 question.'
  const structureText = STRUCT.map((s) => `SECTION ${s.letter}: ${s.name} - ${s.count} question(s), ${s.marks} marks total.`).join('\n')
  return `You are a senior veterinary/clinical-pharmacy examiner at a Kenyan university (Kabarak style). Generate a complete, realistic examination paper for: "${title}".

EXAM STRUCTURE (follow EXACTLY — fixed standard format, 100 marks total):
${structureText}

MANDATORY FORMAT RULES:
- Section A: EXACTLY 30 MCQs worth 30 marks (one mark each), each with EXACTLY 4 options and one clearly correct answer. Include the answer as verbatim option text plus a 1-2 sentence explanation.
- Section B: EXACTLY 6 Short Answer Questions worth 40 marks total (mark allocations per question must sum to 40, e.g. 7+7+7+7+6+6). A question MAY contain labelled subsections (a, b, c) with their marks.
- Section C: EXACTLY 2 Long Answer Questions worth 30 marks total (15 marks each). Each MAY contain labelled subsections with mark allocations.
- Do NOT deviate from these section marks or question counts.

TOPIC AREAS THE PAPER MUST COVER (draw questions from these, weighted to the unit):
${topicsText || '(general coverage of the unit title)'}

${variantNote}

GROUNDING — real past-paper content is supplied below. Study its question style, wording, difficulty and the facts it tests, then write a NEW paper in the SAME voice (applied pharmacology: mechanism -> clinical use -> adverse effects -> monitoring). Reuse the same clinical themes and factual content, but rephrase stems and shuffle distractors so it is a fresh paper, not a copy. Every MCQ must have exactly one correct answer; all options plausible and clinically defensible. Stay strictly within the unit's scope (Clinical Pharmacy and Pharmacology only).

${grounding}

${support}

Respond with ONLY a JSON object (no markdown fences, no commentary) of exactly this shape:
{
  "title": "${title}",
  "variant": ${variant},
  "sections": [
    { "letter": "A", "name": "Multiple Choice Questions", "marks": 30,
      "questions": [ { "stem": "<clinical vignette or concept question>", "options": ["a","b","c","d"], "answer": "<exact correct option text>", "explanation": "<1-2 sentence rationale>" } ] },
    { "letter": "B", "name": "Short Answer Questions", "marks": 40,
      "questions": [ { "stem": "<question with (N marks)>", "modelAnswer": "<concise, complete expected answer>" } ] },
    { "letter": "C", "name": "Long Answer Questions", "marks": 30,
      "questions": [ { "stem": "<question with (N marks)>", "modelAnswer": "<structured exam-style answer with clear headings>" } ] }
  ]
}`
}

// Fresh connection per attempt (Connection: close) — the shared undici pool was
// returning ECONNRESET / hanging on reused sockets. Explicit socket timeout.
function postChatCompletion(body: object): Promise<any> {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body)
    const req = httpsRequest(
      {
        hostname: 'api.mistral.ai',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${mk}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          Connection: 'close',
        },
      },
      (res) => {
        let data = ''
        res.on('data', (c) => (data += c))
        res.on('end', () => {
          try {
            if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) resolve(JSON.parse(data))
            else reject(new Error(`${res.statusCode} ${data.slice(0, 140)}`))
          } catch (e: any) {
            reject(new Error(`bad response: ${e.message}`))
          }
        })
      },
    )
    req.setTimeout(300000, () => req.destroy(new Error('socket timeout')))
    req.on('error', (e) => reject(e))
    req.write(payload)
    req.end()
  })
}

const BACKOFF = [5000, 10000, 20000, 40000, 60000, 90000, 120000]
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function generate(variant: number): Promise<any> {
  const grounding = buildGrounding()
  const support = buildSupportContext()
  for (let attempt = 0; attempt <= BACKOFF.length; attempt++) {
    try {
      const resp = await postChatCompletion({
        model: 'mistral-small-latest',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'You are a senior clinical-pharmacy examiner. Clinically accurate, guideline-aligned (WHO/KDIGO). Every MCQ has exactly one correct answer. Valid JSON only.' },
          { role: 'user', content: buildPrompt(variant, grounding, support) },
        ],
      })
      const content = resp.choices?.[0]?.message?.content
      const parsed = JSON.parse(content)
      const letters = (parsed.sections || []).map((s: any) => s.letter).join('')
      if (letters !== 'ABC') throw new Error(`bad shape: sections=${letters || 'none'}`)
      const got: Record<string, number> = Object.fromEntries(parsed.sections.map((s: any) => [s.letter, s.questions.length]))
      const want: Record<string, number> = Object.fromEntries(STRUCT.map((s) => [s.letter, s.count]))
      const ok = (l: string) => (got[l] ?? 0) === want[l]
      if (!ok('B') || !ok('C') || (got['A'] ?? 0) < want['A'])
        throw new Error(`counts mismatch got=${JSON.stringify(got)} want=${JSON.stringify(want)}`)
      const a = parsed.sections.find((s: any) => s.letter === 'A')
      if (a && a.questions.length > want['A']) a.questions = a.questions.slice(0, want['A'])
      return parsed
    } catch (e: any) {
      console.error(`retry ${unitId} p${variant} a${attempt + 1}:`, e.message, '| cause:', e.cause && e.cause.message)
      if (attempt < BACKOFF.length) await sleep(BACKOFF[attempt] + Math.random() * 3000)
    }
  }
  throw new Error(`fail ${unitId} p${variant}`)
}

const outDir = './scripts/out/old-extras'
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const outPath = `${outDir}/${unitId}.json`
let result: any = {}
if (existsSync(outPath)) result = JSON.parse(readFileSync(outPath, 'utf8'))
if (!result[unitId]) result[unitId] = {}

const papers = await Promise.all(
  VARIANTS.map(async (v) => {
    try {
      const paper = await generate(v)
      console.log(`OK ${unitId} paper ${v}`)
      return [v, paper] as const
    } catch (e: any) {
      console.error(`FAILED ${unitId} paper ${v}:`, e.message)
      return null
    }
  }),
)
for (const e of papers) if (e) result[unitId][e[0]] = e[1]
writeFileSync(outPath, JSON.stringify(result, null, 2))
const done = Object.keys(result[unitId]).length
console.log(`wrote ${outPath} (${done} variants: ${Object.keys(result[unitId]).join(',')})`)
