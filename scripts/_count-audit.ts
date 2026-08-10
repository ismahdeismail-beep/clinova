// Audit of all counts displayed in the Clinova UI vs actual data sources.
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { INITIAL_CASES, ALL_CLINICAL_CASES } from '../src/data/clinicalCasesData.js'
import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'
import { INTEGRATED_UNITS_MAP } from '../src/data/curriculum.js'
import { getAllCarePlanDiseases } from '../src/data/carePlanData.js'
import { EXAM_PREP_UNITS } from '../src/data/examPrepData.js'
import { EXAM_PREP_PAPERS_OLD_PHARM } from '../src/data/examPrepPapersOldPharm.js'
import { EXAM_PREP_PAPERS as P2 } from '../src/data/examPrepPapers.js'

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

async function main() {
  console.log('=== LOCAL DATA SOURCES ===')
  console.log('INITIAL_CASES:', INITIAL_CASES.length)
  console.log('ALL_CLINICAL_CASES:', ALL_CLINICAL_CASES.length)
  console.log('BUNDLED_DRUGS:', BUNDLED_DRUGS.length)
  console.log('INTEGRATED_UNITS_MAP (therapeutic areas):', Object.keys(INTEGRATED_UNITS_MAP).length)
  console.log('care plan diseases:', getAllCarePlanDiseases().length)
  console.log('EXAM_PREP_UNITS:', EXAM_PREP_UNITS.length)

  let mockPapers = 0
  let realPapers = 0
  for (const u of EXAM_PREP_UNITS) {
    const m = (P2 as any)[u.id]
    const r = (EXAM_PREP_PAPERS_OLD_PHARM as any)[u.id]
    if (m) mockPapers += Object.keys(m).length
    if (r) realPapers += Object.keys(r).length
  }
  console.log('mock papers:', mockPapers, '| real papers:', realPapers, '| total:', mockPapers + realPapers)

  console.log('\n=== DATABASE (live) ===')
  for (const table of ['drug_monographs', 'clinical_cases', 'drug_images', 'drug_classes', 'care_plan_diseases', 'disease_monographs', 'flashcards', 'exam_papers', 'study_guides']) {
    try {
      const { count, error } = await admin.from(table).select('id', { count: 'exact', head: true })
      console.log(`${table}: ${error ? 'ERR ' + error.message : count}`)
    } catch {
      console.log(`${table}: fetch error`)
    }
  }
}
main().catch((e) => {
  console.error(e)
  process.exit(1)
})
