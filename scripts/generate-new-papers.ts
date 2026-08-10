import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs'
import { request as httpsRequest } from 'https'
import { EXAM_PREP_UNITS } from '../src/data/examPrepData'
import { EXAM_PREP_PAPERS_OLD_PHARM } from '../src/data/examPrepPapersOldPharm'
import { CRAWLED_EXAM_TEXT } from '../src/data/examPrepCrawled'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData'

const mk =
  readFileSync('.env', 'utf8')
    .split('\n')
    .find((l) => l.startsWith('MISTRAL_API_KEY='))
    ?.split('=', 2)[1]
    .trim()
    .replace(/^"|"$/g, '') || process.env.MISTRAL_API_KEY

const specId = process.argv[2]
if (!specId) {
  console.error('usage: npx tsx generate-new-papers.ts <spec-id>')
  process.exit(1)
}
const spec: any = EXAM_PREP_UNITS.find((u) => u.id === specId)
if (!spec) {
  console.error('unknown spec', specId)
  process.exit(1)
}

// ---------------------------------------------------------------
// Grounding map: where each NEW unit draws its real-exam content.
// pharm-new-* units ground in the cleaned OLD-curriculum papers;
// cp-new-* units ground in the crawled clinical-pharmacy papers.
// ---------------------------------------------------------------
const GROUNDING: Record<string, { oldPharm?: string[]; crawled?: string[] }> = {
  'pharm-new-intro-pkpd': { oldPharm: ['pharm-gen-principles'] },
  'pharm-new-autonomic': { oldPharm: ['pharm-autonomic'] },
  'pharm-new-cns': { oldPharm: ['pharm-cns'] },
  'pharm-new-cvs-renal': { oldPharm: ['pharm-cardiovascular'] },
  'pharm-new-endo-autacoids': { oldPharm: ['pharm-endocrine-resp', 'pharm-vitamins-hormones'] },
  'pharm-new-gi-resp': { oldPharm: ['pharm-gi', 'pharm-endocrine-resp'] },
  'pharm-new-chemo-anti': { oldPharm: ['pharm-chemo-agents', 'pharm-chemo-infections'] },
  'cp-new-intro': { crawled: ['exam-hospital-practice'] },
  'cp-new-cvs-renal': { crawled: ['exam-cardiovascular-heme', 'exam-respiratory-renal'] },
  'cp-new-infections': { crawled: ['exam-antimicrobials', 'exam-infections-i', 'exam-infections-ii'] },
  'cp-new-cns-endo': { crawled: ['exam-cns', 'exam-endo-onc-rheum'] },
  'cp-new-advanced': { crawled: ['exam-endo-onc-rheum', 'exam-hospital-practice'] },
}

function buildGrounding(): string {
  const g = GROUNDING[spec.id]
  if (!g) return '(none — no grounding supplied)'
  const parts: string[] = []
  for (const oldId of g.oldPharm || []) {
    const paper = EXAM_PREP_PAPERS_OLD_PHARM[oldId]?.[1]
    if (!paper) continue
    const lines: string[] = [`### REAL PAST PAPER — ${paper.title} (${oldId}) ###`]
    for (const sec of paper.sections) {
      lines.push(`SECTION ${sec.letter}: ${sec.name} [${sec.marks} marks]`)
      sec.questions.forEach((q: any, i: number) => {
        lines.push(`${i + 1}. ${q.stem}`)
        if (q.options && q.options.length) q.options.forEach((o: string) => lines.push(`   - ${o}`))
        lines.push('')
      })
    }
    parts.push(lines.join('\n'))
  }
  for (const crawlId of g.crawled || []) {
    const raw = CRAWLED_EXAM_TEXT[crawlId]
    if (!raw) continue
    const clean = raw
      .replace(/KABARAK\s+UNIVERSITY[\s\S]*?READ INSTRUCTIONS CAREFULLY/, '')
      .replace(/Do not write anything on the question paper\.?/, '')
      .replace(/\s+/g, ' ')
    parts.push(`### REAL CRAWLED PAST PAPER — ${crawlId} ###\n${clean.slice(0, 24000)}`)
  }
  return parts.join('\n\n')
}

// Supporting knowledge: real clinical cases + formulary monographs for the mapped units
function buildSupportContext(): string {
  const units = (spec.mappedUnits as string[]) || []
  const topicBlob = ((spec.topics as string[]) || []).join(' ').toLowerCase()
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
  const variantNote =
    variant === 3
      ? 'This is PAPER 3 — a THIRD, DISTINCT mock paper. Use DIFFERENT stems, vignettes, and distractors from Paper 1 and Paper 2. Do not repeat any earlier questions.'
      : variant === 2
        ? 'This is PAPER 2 — a SECOND, DISTINCT mock paper. Use DIFFERENT stems, vignettes, and distractors from Paper 1. Do not repeat Paper 1 questions.'
        : 'This is PAPER 1 (the first mock paper).'
  const structureText = spec.structure
    .map((s: any) => `SECTION ${s.letter}: ${s.name} - ${s.count} question(s), ${s.marks} marks. Instruction: ${s.instruction}`)
    .join('\n')
  const topicsText = (spec.topics as string[]).map((t: string, i: number) => `${i + 1}. ${t}`).join('\n')
  return `You are a senior clinical-pharmacy examiner. Generate a complete, realistic mock examination paper for: "${spec.title}".

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

GROUNDING — real past-paper content for this subject is supplied below. Study its question style, wording, difficulty, and the facts it tests, then write a NEW paper in the SAME voice and pattern (Katzung-style applied pharmacology: mechanism → clinical use → adverse effects → monitoring). Reuse the same clinical themes and factual content, but rephrase stems and shuffle distractors so it is a fresh mock, not a copy. Every MCQ must have exactly one correct answer; all options plausible and clinically defensible.

${grounding}

${support}

Respond with ONLY a JSON object (no markdown fences, no commentary) of exactly this shape:
{
  "title": "${spec.title}",
  "variant": ${variant},
  "sections": [
    { "letter": "A", "name": "Multiple Choice Questions", "marks": <number>,
      "questions": [ { "stem": "<clinical vignette or concept question>", "options": ["a","b","c","d"], "answer": "<exact correct option text>", "explanation": "<1-2 sentence rationale>" } ] },
    { "letter": "B", "name": "Short Answer Questions", "marks": <number>,
      "questions": [ { "stem": "<question>", "modelAnswer": "<concise, complete expected answer>" } ] },
    { "letter": "C", "name": "Long Answer Questions", "marks": <number>,
      "questions": [ { "stem": "<question>", "modelAnswer": "<structured exam-style answer with clear headings>" } ] }
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

// Exponential backoff with jitter — resets clustered (cooldown-like), so space retries out.
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
          { role: 'system', content: 'You are a senior clinical-pharmacy examiner. Clinically accurate, guideline-aligned (WHO/KDI). Every MCQ has exactly one correct answer. Valid JSON only.' },
          { role: 'user', content: buildPrompt(variant, grounding, support) },
        ],
      })
      const content = resp.choices?.[0]?.message?.content
      const parsed = JSON.parse(content)
      const letters = (parsed.sections || []).map((s: any) => s.letter).join('')
      if (letters !== 'ABC') throw new Error(`bad shape: sections=${letters || 'none'}`)
      const got: Record<string, number> = Object.fromEntries(parsed.sections.map((s: any) => [s.letter, s.questions.length]))
      const want: Record<string, number> = Object.fromEntries(spec.structure.map((s: any) => [s.letter, s.count]))
      const ok = (l: string) => (got[l] ?? 0) === want[l]
      // Retry only when a section is UNDER count (or B/C deviate). Overshoots in A are trimmed below.
      if (!ok('B') || !ok('C') || (got['A'] ?? 0) < want['A'])
        throw new Error(`counts mismatch got=${JSON.stringify(got)} want=${JSON.stringify(want)}`)
      const a = parsed.sections.find((s: any) => s.letter === 'A')
      if (a && a.questions.length > want['A']) a.questions = a.questions.slice(0, want['A'])
      return parsed
    } catch (e: any) {
      console.error(`retry ${spec.id} p${variant} a${attempt + 1}:`, e.message, '| cause:', e.cause && e.cause.message)
      if (attempt < BACKOFF.length) await sleep(BACKOFF[attempt] + Math.random() * 3000)
    }
  }
  throw new Error(`fail ${spec.id} p${variant}`)
}

const outDir = './scripts/out/new'
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const result: any = { [spec.id]: {} }
const papers = await Promise.all(
  [1, 2, 3].map(async (v) => {
    try {
      const paper = await generate(v)
      console.log(`OK ${spec.id} paper ${v}`)
      return [v, paper] as const
    } catch (e: any) {
      console.error(`FAILED ${spec.id} paper ${v}:`, e.message)
      return null
    }
  }),
)
for (const e of papers) if (e) result[spec.id][e[0]] = e[1]
writeFileSync(`${outDir}/${spec.id}.json`, JSON.stringify(result, null, 2))
const done = Object.keys(result[spec.id]).length
console.log(`wrote ${outDir}/${spec.id}.json (${done}/3 papers)`)
