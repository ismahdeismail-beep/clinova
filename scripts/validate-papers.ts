import { EXAM_PREP_PAPERS } from '../src/data/examPrepPapers'
import { EXAM_PREP_UNITS } from '../src/data/examPrepData'

const units = Object.keys(EXAM_PREP_PAPERS)
console.log('Total units in EXAM_PREP_PAPERS:', units.length)
console.log('Expected units:', EXAM_PREP_UNITS.length)

let papers = 0
let issues = 0
const pharmPlaceholders = /Alternative treatment for|Incorrect mechanism for|Side effect of/

for (const u of units) {
  const variants = Object.keys(EXAM_PREP_PAPERS[u]).sort()
  papers += variants.length
  if (variants.join(',') !== '1,2,3') {
    issues++
    console.log('  [ISSUE]', u, 'variants:', variants.join(','))
  }
  for (const vk of variants) {
    const paper = EXAM_PREP_PAPERS[u][Number(vk)]
    const marks = (paper.sections || []).map((s) => `${s.letter}=${s.marks}`).join(',')
    const qs = (paper.sections || []).reduce((a, s) => a + (s.questions ? s.questions.length : 0), 0)
    let bad = 0
    for (const s of paper.sections || [])
      for (const q of s.questions || []) {
        if (q.options !== undefined && !Array.isArray(q.options)) bad++
        if (pharmPlaceholders.test(JSON.stringify(q.options || []))) bad++
        if (!q.answer && !q.modelAnswer) bad++
      }
    if (bad) {
      issues++
      console.log('  [ISSUE]', u, 'v' + vk, 'malformed:', bad)
    }
    if (vk === '1' && !/^[A-Z]+=[0-9]/.test(marks)) {
      // fine
    }
    console.log('  ', u, 'v' + vk, '| title:', paper.title, '|', marks, '| qs:', qs)
  }
}

console.log('Total papers:', papers)
console.log('Issues:', issues)
