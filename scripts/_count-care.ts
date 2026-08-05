import { CARE_PLAN_SPECIALTIES, getAllCarePlanDiseases } from '../src/data/carePlanData.js'
import { SPECIALTIES } from '../src/data/clinicalCasesData.js'

console.log('care plan specialties:', CARE_PLAN_SPECIALTIES.length)
console.log('care plan diseases:', getAllCarePlanDiseases().length)
console.log('clinical case SPECIALTIES:', SPECIALTIES.length)
