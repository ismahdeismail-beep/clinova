import { DIGITAL_LIBRARY, type DigitalLibraryResource } from './digitalLibraryData'

const LEGACY_UNIT_MAP: Record<string, string[]> = {
  // Pharmacology module
  'pharm-intro': ['Unit 2'],
  'pharm-gen': ['Unit 2'],
  'pharm-pk': ['Unit 4'],
  'pharm-pd': ['Unit 4'],
  'pharm-auto': ['Unit 3'],
  'pharm-cv': ['Unit 3', 'Unit 7'],
  'pharm-renal': ['Unit 3', 'Unit 12'],
  'pharm-resp': ['Unit 3', 'Unit 8'],
  'pharm-gi': ['Unit 3', 'Unit 10', 'Unit 11'],
  'pharm-endo': ['Unit 9'],
  'pharm-vit': ['Unit 27'],
  'pharm-cns': ['Unit 13'],
  'pharm-chemo': ['Unit 19'],
  'pharm-anti': ['Unit 6'],
  'pharm-tox': [],
  'pharm-onc': ['Unit 19'],
  'pharm-derm': ['Unit 21'],
  'pharm-ophth': ['Unit 22'],
  'pharm-vet': [],

  // Clinical Pharmacy & Therapeutics module
  'cp-intro': ['Unit 1', 'Unit 15'],
  'cp-cv': ['Unit 5', 'Unit 7'],
  'cp-endo': ['Unit 5', 'Unit 9'],
  'cp-resp': ['Unit 5', 'Unit 8'],
  'cp-gi': ['Unit 5', 'Unit 10', 'Unit 11'],
  'cp-renal': ['Unit 5', 'Unit 12'],
  'cp-neuro': ['Unit 5', 'Unit 13', 'Unit 14'],
  'cp-id': ['Unit 6', 'Unit 16'],
  'cp-onc': ['Unit 19', 'Unit 26'],
  'cp-peds': ['Unit 17'],
  'cp-obgyn': ['Unit 18'],
  'cp-em': [],
  'cp-rheum': ['Unit 24', 'Unit 25'],
  'cp-derm': ['Unit 21'],
  'cp-ophth': ['Unit 22'],
  'cp-ent': ['Unit 23'],
  'cp-tox': [],
  'cp-ger': [],
  'cp-tdm': [],
  'cp-couns': ['Unit 20'],
  'cp-safety': ['Unit 20'],
  'cp-pharmcare': ['Unit 15', 'Unit 20'],

  // Supporting Sciences module
  'sup-anat': ['Unit 34'],
  'sup-phys': ['Unit 33'],
  'sup-biochem': ['Unit 32'],
  'sup-path': ['Unit 35'],
  'sup-micro': ['Unit 36'],
  'sup-immuno': ['Unit 37'],
  'sup-medchem': ['Unit 30'],
  'sup-pharmchem': [],
  'sup-orgchem': [],
  'sup-pharmanal': ['Unit 31'],
  'sup-pharmaceutics': ['Unit 29'],
  'sup-pharmacog': [],
  'sup-pubhealth': ['Unit 28'],

  // Clinical Cases (non-curriculum)
  'cc-cv': ['Unit 7'],
  'cc-endo': ['Unit 9'],
  'cc-resp': ['Unit 8'],
  'cc-gi': ['Unit 10', 'Unit 11'],
  'cc-renal': ['Unit 12'],
  'cc-neuro': ['Unit 13'],
  'cc-id': ['Unit 6', 'Unit 16'],
  'cc-onc': ['Unit 19'],
  'cc-hem': ['Unit 26'],
  'cc-psych': ['Unit 14'],
  'cc-peds': ['Unit 17'],
  'cc-obgyn': ['Unit 18'],
  'cc-em': [],

  // Drug Information & Guidelines
  'di-guidelines': ['Unit 41', 'Unit 42', 'Unit 44'],
  'di-monographs': ['Unit 40'],
  'di-formulary': ['Unit 41', 'Unit 43'],

  // Evidence-Based Medicine & Research
  'ebm-research': ['Unit 38', 'Unit 44'],
  'ebm-biostats': ['Unit 38'],
  'ebm-literature': ['Unit 39'],
  'ebm-trials': [],

  // Study & Learning Tools
  'tool-qbank': [],
  'tool-flashcards': [],
  'tool-podcasts': [],
  'tool-papers': [],
  'tool-planner': [],
  'tool-saved': [],
}

export function getResourcesForUnit(unitId: string): DigitalLibraryResource[] {
  const legacyUnits = LEGACY_UNIT_MAP[unitId]
  if (!legacyUnits || legacyUnits.length === 0) return []

  return DIGITAL_LIBRARY.filter((resource) => {
    if (!resource.curriculumUnits || resource.curriculumUnits.length === 0) return false
    return legacyUnits.some((lu) => resource.curriculumUnits!.includes(lu))
  })
    .slice(0, 30)
    .sort((a, b) => {
      const aScore = legacyUnits.filter((lu) => a.curriculumUnits?.includes(lu)).length
      const bScore = legacyUnits.filter((lu) => b.curriculumUnits?.includes(lu)).length
      return bScore - aScore
    })
}
