import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { chromium } from 'playwright'
import { EXAM_PREP_MODULES, EXAM_TRACKS, type ExamUnitSpec } from '../src/data/examPrepData.ts'
import {
  getExamPrepPaper,
  type GeneratedPaper,
  type GeneratedQuestion,
} from '../src/data/examPrepPapers.ts'

const OUT_ROOT = path.join(os.homedir(), 'Desktop', 'Clinova Exam PDFs')

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function nl2br(s: unknown): string {
  return esc(s).replace(/\n/g, '<br>')
}

function normalizeText(v: unknown): string {
  if (v == null) return ''
  if (Array.isArray(v)) return v.map(normalizeText).join('\n')
  if (typeof v === 'object') return JSON.stringify(v, null, 2)
  return String(v)
}

function slug(s: string): string {
  return s
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
}

function trackLabel(trackId: string): string {
  if (trackId === 'traditional') return 'Old Curriculum (Traditional)'
  if (trackId === 'revised') return 'New Curriculum (Revised)'
  return EXAM_TRACKS[trackId as keyof typeof EXAM_TRACKS]?.title || trackId
}

function trackFolder(trackId: string): string {
  if (trackId === 'traditional') return 'Traditional - Old Curriculum'
  if (trackId === 'revised') return 'Revised - New Curriculum'
  return slug(trackLabel(trackId))
}

function questionHtml(q: GeneratedQuestion, idx: number, sectionLetter: string): string {
  const stem = nl2br(normalizeText(q.stem))
  const qLabel = `${sectionLetter}${idx + 1}`
  let html = `<article class="question">
  <div class="q-head">
    <div class="q-num">${esc(qLabel)}</div>
    <div class="q-body">
      <div class="q-stem">${stem}</div>`

  if (Array.isArray(q.options) && q.options.length > 0) {
    const answer = normalizeText(q.answer).trim()
    const normalizedOpts = q.options.map((o: unknown) => normalizeText(o).trim())
    html += `<ol class="options" type="a">`
    for (const opt of q.options) {
      const optText = normalizeText(opt)
      const isCorrect = answer !== '' && optText.trim() === answer
      html += `<li class="opt${isCorrect ? ' correct' : ''}"><span class="opt-text">${esc(optText)}</span>${isCorrect ? '<span class="badge">Correct answer</span>' : ''}</li>`
    }
    html += `</ol>`
    if (answer && !normalizedOpts.includes(answer)) {
      html += `<div class="guide-box"><div class="guide-label">Correct Answer</div><div class="guide-content">${nl2br(answer)}</div></div>`
    }
    if (q.explanation) {
      html += `<div class="guide-box"><div class="guide-label">Explanation</div><div class="guide-content">${nl2br(normalizeText(q.explanation))}</div></div>`
    }
  } else {
    const model = normalizeText(q.modelAnswer || q.answer)
    if (model) {
      html += `<div class="guide-box model"><div class="guide-label">Marking Guide</div><div class="guide-content">${nl2br(model)}</div></div>`
    }
  }

  html += `    </div>
  </div>
</article>`
  return html
}

function paperHtml(params: {
  moduleTitle: string
  trackId: string
  unit: ExamUnitSpec
  paper: GeneratedPaper
  variant: number
}): string {
  const { moduleTitle, trackId, unit, paper, variant } = params
  const tLabel = trackLabel(trackId)
  const totalMarks = paper.sections.reduce((s, sec) => s + (Number(sec.marks) || 0), 0)
  const totalQuestions = paper.sections.reduce((n, s) => n + s.questions.length, 0)
  const structure = paper.sections
    .map(
      (s) => `Section ${s.letter}: ${s.name} (${s.questions.length} questions, ${s.marks} marks)`,
    )
    .join('<span class="dot">•</span>')

  const sectionsHtml = paper.sections
    .map((sec) => {
      const qHtml = sec.questions.map((q, i) => questionHtml(q, i, sec.letter)).join('\n')
      const instruction = normalizeText(sec.instruction).trim()
      return `<section class="paper-section">
  <div class="section-head">
    <div class="section-kicker">Section ${esc(sec.letter)}</div>
    <h2>${esc(sec.name)}</h2>
    <div class="section-meta">${esc(String(sec.questions.length))} question${sec.questions.length === 1 ? '' : 's'} &nbsp;·&nbsp; ${esc(String(sec.marks))} marks</div>
  </div>
  ${instruction ? `<div class="instruction"><span class="instruction-label">Instructions</span><div>${nl2br(instruction)}</div></div>` : ''}
  <div class="questions">${qHtml}</div>
</section>`
    })
    .join('\n')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(paper.title || unit.title)} - Paper ${variant} - Answered Marking Guide</title>
<style>
  @page { size: A4; margin: 20mm 15mm 22mm 15mm; }
  :root {
    --ink: #1a2433; --muted: #5f6b7a; --line: #d9e0e7; --soft: #f6f8fb;
    --accent: #123B2E; --accent-2: #1f6a52; --accent-soft: #edf6f2;
    --guide: #fbfdfc; --guide-border: #bcd4ca; --warn-bg: #fffaf1; --warn-border: #ead2a6;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { font-family: Georgia, "Times New Roman", serif; color: var(--ink); font-size: 10.8pt; line-height: 1.55; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  h1, h2, h3, .brand, .badge-mode, .meta-label, .section-kicker, .section-meta, .instruction-label, .q-num, .badge, .guide-label, .cover-footer { font-family: Arial, Helvetica, sans-serif; }

  .cover { border: 1px solid var(--line); border-top: 5px solid var(--accent); padding: 28px 30px 24px; margin-bottom: 28px; background: #fff; }
  .cover-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; margin-bottom: 18px; }
  .brand { font-size: 10.5pt; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin: 0 0 6px; }
  .badge-mode { display: inline-block; font-size: 8.5pt; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #6a4b16; background: #fff4df; border: 1px solid #ecd5a8; padding: 6px 10px; border-radius: 3px; white-space: nowrap; }
  h1 { font-size: 24pt; line-height: 1.2; margin: 0 0 6px; color: #111827; font-weight: 700; }
  .subtitle { font-size: 11pt; color: var(--muted); margin: 0 0 22px; font-family: Arial, Helvetica, sans-serif; }
  .meta { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .meta-item { padding: 10px 0; border-bottom: 1px solid #edf2f6; }
  .meta-item:nth-last-child(-n+2) { border-bottom: 0; }
  .meta-item:nth-child(odd) { padding-right: 16px; border-right: 1px solid #edf2f6; }
  .meta-item:nth-child(even) { padding-left: 16px; }
  .meta-label { display: block; font-size: 8pt; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
  .meta-value { font-size: 10.5pt; color: var(--ink); }
  .structure { margin-top: 18px; padding: 14px 16px; background: var(--soft); border: 1px solid #e3eaf1; border-left: 4px solid var(--accent); font-family: Arial, Helvetica, sans-serif; font-size: 9.5pt; line-height: 1.7; color: #334155; }
  .structure strong { color: #182230; }
  .dot { color: #94a3b8; margin: 0 8px; }
  .cover-footer { margin-top: 14px; font-size: 8.5pt; color: #6b7280; line-height: 1.5; }

  .paper-section { margin: 0 0 30px; }
  .section-head { padding: 0 0 12px; border-bottom: 2px solid var(--accent); margin-bottom: 16px; break-after: avoid; }
  .section-kicker { font-size: 8.5pt; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-2); margin-bottom: 4px; }
  .section-head h2 { margin: 0; font-size: 16pt; line-height: 1.25; color: #14283d; font-weight: 700; }
  .section-meta { margin-top: 5px; font-size: 9pt; color: var(--muted); }
  .instruction { margin: 0 0 18px; padding: 12px 14px; background: #fbfcfe; border: 1px solid var(--line); font-size: 10pt; }
  .instruction-label { display: block; font-size: 8pt; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #475569; margin-bottom: 5px; }

  .question { margin: 0 0 18px; padding: 0 0 18px; border-bottom: 1px solid #e7edf3; break-inside: avoid; page-break-inside: avoid; }
  .question:last-child { border-bottom: 0; padding-bottom: 0; margin-bottom: 0; }
  .q-head { display: grid; grid-template-columns: 54px 1fr; gap: 0; }
  .q-num { font-size: 10.5pt; font-weight: 700; color: var(--accent); padding-top: 1px; }
  .q-body { min-width: 0; }
  .q-stem { margin: 0 0 10px; font-size: 10.8pt; }

  .options { margin: 0; padding-left: 22px; }
  .opt { margin: 0 0 6px; padding: 4px 8px; border-radius: 2px; }
  .opt:last-child { margin-bottom: 0; }
  .opt.correct { background: var(--accent-soft); border: 1px solid #cde0d7; }
  .opt-text { vertical-align: middle; }
  .badge { display: inline-block; margin-left: 8px; padding: 2px 7px; font-size: 7.5pt; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; color: #14543e; background: #dceee6; border: 1px solid #bdd7ca; border-radius: 2px; vertical-align: middle; }

  .guide-box { margin-top: 12px; padding: 12px 14px; background: var(--guide); border: 1px solid var(--guide-border); border-left: 4px solid var(--accent-2); break-inside: avoid; page-break-inside: avoid; }
  .guide-box.model { background: #fcfefd; }
  .guide-label { font-size: 8pt; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .guide-content { font-size: 10.3pt; line-height: 1.55; color: #223044; }
</style>
</head>
<body>
  <main class="cover">
    <div class="cover-top">
      <div>
        <div class="brand">Clinova Exam Prep</div>
        <h1>${esc(paper.title || unit.title)}</h1>
        <p class="subtitle">${esc(moduleTitle)} &nbsp;·&nbsp; ${esc(tLabel)}</p>
      </div>
      <div class="badge-mode">Answered Marking Guide</div>
    </div>

    <div class="meta">
      <div class="meta-item"><span class="meta-label">Unit</span><div class="meta-value">${esc(unit.title)}</div></div>
      <div class="meta-item"><span class="meta-label">Paper</span><div class="meta-value">Variant ${variant}</div></div>
      <div class="meta-item"><span class="meta-label">Curriculum</span><div class="meta-value">${esc(tLabel)}</div></div>
      <div class="meta-item"><span class="meta-label">Total Marks</span><div class="meta-value">${totalMarks}</div></div>
      <div class="meta-item"><span class="meta-label">Total Questions</span><div class="meta-value">${totalQuestions}</div></div>
      <div class="meta-item"><span class="meta-label">Version</span><div class="meta-value">Answered (includes correct answers and marking guides)</div></div>
    </div>

    <div class="structure"><strong>Exam Structure:</strong> ${structure}</div>
    <div class="cover-footer">For educational use only. Generated for learning and exam preparation; not an official examination paper.</div>
  </main>

  ${sectionsHtml}
</body>
</html>`
}

async function main() {
  const args = process.argv.slice(2)
  const onlyUnit = args.includes('--unit') ? args[args.indexOf('--unit') + 1] : undefined
  const limit = args.includes('--limit') ? Number(args[args.indexOf('--limit') + 1]) : undefined

  const jobs: Array<{
    moduleTitle: string
    trackId: string
    unit: ExamUnitSpec
    paper: GeneratedPaper
    variant: number
    outPath: string
  }> = []

  for (const mod of EXAM_PREP_MODULES) {
    for (const track of mod.tracks) {
      for (const unit of track.units) {
        if (onlyUnit && unit.id !== onlyUnit) continue
        for (let variant = 1; variant <= 3; variant++) {
          const paper = getExamPrepPaper(unit.id, variant)
          if (!paper) continue
          const dir = path.join(OUT_ROOT, slug(mod.title), trackFolder(track.id))
          const base = `${slug(mod.title)}_${trackIdToShort(track.id)}_${slug(unit.title)}_Paper-${variant}_Answered.pdf`
          jobs.push({
            moduleTitle: mod.title,
            trackId: track.id,
            unit,
            paper,
            variant,
            outPath: path.join(dir, base),
          })
        }
      }
    }
  }

  const selected = typeof limit === 'number' && Number.isFinite(limit) ? jobs.slice(0, limit) : jobs
  console.log(`Generating ${selected.length} answered exam PDF(s) -> ${OUT_ROOT}`)
  fs.mkdirSync(OUT_ROOT, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  let ok = 0
  for (const job of selected) {
    fs.mkdirSync(path.dirname(job.outPath), { recursive: true })
    const html = paperHtml(job)
    await page.setContent(html, { waitUntil: 'load' })
    await page.pdf({
      path: job.outPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `<div style="width:100%;font-size:7.5px;color:#667085;padding:0 15mm;font-family:Arial,Helvetica,sans-serif;display:flex;justify-content:space-between;align-items:center;"><span>Clinova Exam Prep&nbsp;&middot;&nbsp;Answered Marking Guide&nbsp;&middot;&nbsp;For educational use only</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`,
      margin: { top: '20mm', bottom: '22mm', left: '15mm', right: '15mm' },
    })
    ok++
    if (ok % 10 === 0 || ok === selected.length)
      console.log(`  [${ok}/${selected.length}] ${path.relative(OUT_ROOT, job.outPath)}`)
  }

  await browser.close()
  console.log(`Done. ${ok} PDF(s) written to ${OUT_ROOT}`)
}

function trackIdToShort(trackId: string): string {
  if (trackId === 'traditional') return 'Old-Traditional'
  if (trackId === 'revised') return 'New-Revised'
  return slug(trackId)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
