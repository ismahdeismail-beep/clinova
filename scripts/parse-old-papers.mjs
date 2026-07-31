// Parse the 12 chosen OLD pharmacology past papers into structured questions.
// Output: scripts/out/parsed-papers/<code>.json
import fs from 'fs'
import path from 'path'

const OUT = 'scripts/out/old-papers'
const DEST = 'scripts/out/parsed-papers'

const PICKS = {
  '3101': 'pharmacology_kabarak_university_PHAM_3101_PHARMACOLOGY_I.txt',
  '3102': 'pharmacology_kabarak_university_PHAM_3102_PHARMACOLOGY_II.txt',
  '3203': 'pharmacology_kabarak_university_PHAM_3203_PHARMACOLOGY_III.txt',
  '3305': 'pharmacology_kabarak_university_PHAM_3305_PHARMACOLOGY_V.txt',
  '3306': 'pharmacology_kabarak_university_PHAM_3306_PHARMACOLOGY_VI_(2).txt',
  '3307': 'pharmacology_kabarak_university_PHAM_3307_PHARMACOLOGY_VII.txt',
  '4108': 'pharmacology_kabarak_university_PHAM_4108_PHARMACOLOGY_VIII_(GIT_PHARMACOLOGY).txt',
  '4109': 'pharmacology_kabarak_university_PHAM_4109_PHARMACOLOGY_IX_(CHEMOTHERAPEUTIC_AGENTS).txt',
  '4209': 'pharmacology_kabarak_university_PHAM_4209_PHARMACOLOGY_X.txt',
  '5111': 'pharmacology_kabarak_university_PHAM_5111_PHARMACOLOGY_XI.txt',
  '5112': 'pharmacology_kabarak_university_PHAM_5112_PHARMACOLOGY_XII_Exam_draft_MayAug2021.txt',
  '5314': 'pharmacology_kabarak_university_PHAM_5314Pharmacology_XIV_(Toxicology_and_drug_discovery_and_development).txt',
}

const TITLES = {
  '3101': 'Pharmacology I — General Principles of Pharmacology',
  '3102': 'Pharmacology II — Autonomic Pharmacology',
  '3203': 'Pharmacology III — Autacoids',
  '3305': 'Pharmacology V — Central Nervous System Pharmacology',
  '3306': 'Pharmacology VI — Cardiovascular Pharmacology',
  '3307': 'Pharmacology VII — Endocrine & Respiratory Pharmacology',
  '4108': 'Pharmacology VIII — Gastrointestinal Pharmacology',
  '4109': 'Pharmacology IX — Chemotherapeutic Agents',
  '4209': 'Pharmacology X — Chemotherapy of Infections',
  '5111': 'Pharmacology XI — Anticancer, Dermatological & Ocular Drugs',
  '5112': 'Pharmacology XII — Vitamins, Hormones & Endocrine Pharmacology',
  '5314': 'Pharmacology XIV — Toxicology & Drug Discovery',
}

// ---------------------------------------------------------------- mojibake
const MOJI = [
  // specific 3-char cp1252-misread sequences MUST precede the â€ catch-all
  [/â€˜/g, '\u2018'],
  [/â€™/g, '\u2019'],
  [/â€œ/g, '\u201C'],
  [/â€“/g, '\u2013'],
  [/â€”/g, '\u2014'],
  [/â€¦/g, '\u2026'],
  [/â€/g, '\u201D'],
  [/Â°/g, '\u00B0'],
  [/Â½/g, '\u00BD'],
  [/Â±/g, '\u00B1'],
  [/Â²/g, '\u00B2'],
  [/Â³/g, '\u00B3'],
  [/Â®/g, '\u00AE'],
  [/Â/g, ''],
  [/â†“/g, '\u2193'],
  [/âˆ’/g, '\u2212'],
  [/Î±/g, '\u03B1'],
  [/Î²/g, '\u03B2'],
  [/Î³/g, '\u03B3'],
  [/Î´/g, '\u03B4'],
  [/Î¼/g, '\u03BC'],
  [/Îº/g, '\u03BA'],
  [/Î»/g, '\u03BB'],
  [/Ã©/g, '\u00E9'],
  [/Ã¨/g, '\u00E8'],
  [/Ã¼/g, '\u00FC'],
  [/Ã±/g, '\u00F1'],
  [/Ã³/g, '\u00F3'],
  [/Ã®/g, '\u00EE'],
  [/Ã¬/g, '\u00EC'],
  [/Ã²/g, '\u00F2'],
  [/Ã¡/g, '\u00E1'],
  [/Ã¢/g, '\u00E2'],
  [/Ã¦/g, '\u00E6'],
  [/Ã¸/g, '\u00F8'],
  [/Ã¥/g, '\u00E5'],
  [/Ã¤/g, '\u00E4'],
  [/Ã¶/g, '\u00F6'],
  [/Ã§/g, '\u00E7'],
  [/Ã£/g, '\u00E3'],
]

function fixMojibake(s) {
  for (const [re, rep] of MOJI) s = s.replace(re, rep)
  return s
}

function cleanText(s) {
  s = s.replace(/\r/g, '')
  s = fixMojibake(s)
  const lines = s.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').replace(/^ +| +$/g, ''))
  return lines
}

// ---------------------------------------------------------------- sections
function lastSectionIdx(lines, letter) {
  const re = new RegExp('^SECTION\\s*' + letter + '\\b', 'i')
  let idx = -1
  for (let i = 0; i < lines.length; i++) if (re.test(lines[i])) idx = i
  return idx
}

const INSTRUCTION_PREFIX = [
  'answer all questions',
  'answer any',
  'answer questions',
  'answer the',
  'choose the best',
  'select the best',
  'adhere to',
  'begin each',
  'do not write',
  'write your',
  'this paper',
  'instructions',
  'time allowed',
  'total',
  'marks',
  'section a has',
  'section b has',
  'section c has',
  'use the',
  'all questions',
  'attempt',
  'for each',
  'state whether',
]

function isInstruction(line) {
  const l = line.toLowerCase()
  if (/^section\b/.test(l)) return true
  if (l.length > 0 && /^[A-Z][A-Z\s]{10,}$/.test(line)) return true // ALL-CAPS line
  for (const p of INSTRUCTION_PREFIX) {
    if (l.startsWith(p)) return true
  }
  return false
}

// ---------------------------------------------------------------- section A
function isQuestionStarter(line, current) {
  if (/^\d+\s*[.)]/.test(line)) return true
  if (/\?\s*$/.test(line)) return true
  if (/:\s*$/.test(line)) return true
  if (line.length > 120 && current.options.length > 0) return true
  return false
}

function parseSectionA(lines) {
  const questions = []
  let current = null
  for (const line of lines) {
    if (!line) continue
    if (isInstruction(line) && current === null) continue
    if (current === null) {
      current = { stem: line, options: [] }
      continue
    }
    if (isQuestionStarter(line, current)) {
      questions.push(current)
      current = { stem: line, options: [] }
      continue
    }
    current.options.push(line)
  }
  if (current) questions.push(current)
  return questions
}

// ---------------------------------------------------------------- sections B/C
function parseBlocks(lines) {
  // split into blocks by blank lines; each block => one question (multi-line stem preserved)
  const blocks = []
  let cur = []
  for (const line of lines) {
    if (!line) {
      if (cur.length) blocks.push(cur)
      cur = []
    } else cur.push(line)
  }
  if (cur.length) blocks.push(cur)
  return blocks
}

// ---------------------------------------------------------------- main
function parsePaper(file, code) {
  const raw = fs.readFileSync(path.join(OUT, file), 'utf8')
  const lines = cleanText(raw)

  const aIdx = lastSectionIdx(lines, 'A')
  const bIdx = lastSectionIdx(lines, 'B')
  const cIdx = lastSectionIdx(lines, 'C')
  if (aIdx === -1) throw new Error(code + ': no SECTION A')

  const body = lines.slice(aIdx)
  const aBody = bIdx !== -1 && bIdx > aIdx ? body.slice(0, bIdx - aIdx) : body
  const bBody = bIdx !== -1 ? (cIdx !== -1 ? body.slice(bIdx - aIdx, cIdx - aIdx) : body.slice(bIdx - aIdx)) : []
  const cBody = cIdx !== -1 ? body.slice(cIdx - aIdx) : []

  const a = parseSectionA(aBody)
  const bBlocks = parseBlocks(bBody)
  const cBlocks = parseBlocks(cBody)

  const b = bBlocks
    .filter((blk) => blk.some((l) => !isInstruction(l)))
    .map((blk) => ({ stem: blk.join('\n') }))
  const c = cBlocks
    .filter((blk) => blk.some((l) => !isInstruction(l)))
    .map((blk) => ({ stem: blk.join('\n') }))

  return { code, title: TITLES[code], sections: { A: a, B: b, C: c } }
}

fs.mkdirSync(DEST, { recursive: true })
let total = 0
for (const [code, file] of Object.entries(PICKS)) {
  const paper = parsePaper(file, code)
  fs.writeFileSync(path.join(DEST, code + '.json'), JSON.stringify(paper, null, 2))
  const a = paper.sections.A
  const bad = a.filter((q) => q.options.length < 2 || q.options.length > 6)
  const len = Object.values(paper.sections).reduce((n, s) => n + s.length, 0)
  total += len
  console.log(
    `${code}  A=${a.length} (bad-opt: ${bad.length})  B=${paper.sections.B.length}  C=${paper.sections.C.length}  TOTAL=${len}`
  )
}
console.log('GRAND TOTAL questions:', total)
