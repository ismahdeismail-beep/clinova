import { BOARD_EXAM_QUESTIONS, BOARD_EXAM_UNITS } from '../src/data/boardExams.js'

const sets = new Set(BOARD_EXAM_QUESTIONS.map((q) => q.predictionSet))
console.log('BOARD_EXAM_UNITS:', BOARD_EXAM_UNITS.length)
console.log('BOARD_EXAM_QUESTIONS:', BOARD_EXAM_QUESTIONS.length)
console.log('prediction sets:', [...sets].join(','))
