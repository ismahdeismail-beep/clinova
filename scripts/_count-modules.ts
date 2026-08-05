import { EDUCATION_MODULES } from '../src/data/curriculum.js'
import { EXAM_PREP_UNITS } from '../src/data/examPrepData.js'
import { BOARD_EXAM_QUESTIONS, BOARD_EXAM_UNITS } from '../src/data/boardExams.js'

console.log('EDUCATION_MODULES:', EDUCATION_MODULES.length)
for (const m of EDUCATION_MODULES as any[]) {
  console.log(` - ${m.id} | units: ${(m.units || []).length}`)
}
console.log('EXAM_PREP_UNITS:', EXAM_PREP_UNITS.length)
const sets = new Set(BOARD_EXAM_QUESTIONS.map((q) => q.predictionSet))
console.log('BOARD_EXAM sets:', sets.size, '| questions:', BOARD_EXAM_QUESTIONS.length, '| units:', BOARD_EXAM_UNITS.length)
