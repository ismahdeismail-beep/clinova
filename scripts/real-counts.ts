import { ALL_CLINICAL_CASES, INITIAL_CASES } from '../src/data/clinicalCasesData'
import { GENERATED_CASES } from '../src/data/clinicalCases'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData'
import { EXAM_PREP_UNITS, EXAM_PREP_MODULES } from '../src/data/examPrepData'
import { EXAM_PREP_PAPERS } from '../src/data/examPrepPapers'
import { DISEASE_NOTES } from '../src/data/diseaseNotes'
import { getAllCarePlanDiseases, CARE_PLAN_SPECIALTIES } from '../src/data/carePlanData'
import { INTEGRATED_UNITS_MAP } from '../src/data/curriculum'

console.log('=== REAL COUNTS ===')
console.log('INITIAL_CASES:', INITIAL_CASES.length)
console.log('GENERATED_CASES:', GENERATED_CASES.length)
console.log('ALL_CLINICAL_CASES:', ALL_CLINICAL_CASES.length)
console.log('BUNDLED_DRUGS:', BUNDLED_DRUGS.length)
console.log('EXAM_PREP_MODULES:', EXAM_PREP_MODULES.length)
console.log('EXAM_PREP_UNITS:', EXAM_PREP_UNITS.length)
let paperTotal = 0
const unitBreakdown: Record<string, number> = {}
for (const u of EXAM_PREP_UNITS) {
  const papers = EXAM_PREP_PAPERS[u.id]
  const n = papers ? Object.keys(papers).length : 0
  paperTotal += n
  unitBreakdown[u.id] = n
}
console.log('Total papers (variants):', paperTotal)
console.log('Paper breakdown:', JSON.stringify(unitBreakdown, null, 2))
console.log('DISEASE_NOTES:', DISEASE_NOTES.length)
console.log('Care plan diseases:', getAllCarePlanDiseases().length)
console.log('Care plan specialties:', CARE_PLAN_SPECIALTIES.length)
console.log('Therapeutic areas (INTEGRATED_UNITS_MAP keys):', Object.keys(INTEGRATED_UNITS_MAP).length)
