// ================================================================
// Library ↔ Module Mapping
// Maps education modules to their relevant online library books
// so each module shows only its own books when navigating to library
// ================================================================

import { LIBRARY, type LibraryResource } from './onlineLibraryData'

/**
 * Module-to-library-book-ID mapping.
 * Books are assigned to modules based on subject relevance.
 */
const MODULE_BOOKS: Record<string, string[]> = {
  // Pharmacology
  pharmacology: [
    'lib_katzung', 'lib_goodman', 'lib_rang_dale', 'lib_whalen',
    'lib_shargel', 'lib_winter', 'lib_toxicology',
    'lib_oer_pharma1', 'lib_oer_merck',
  ],

  // Clinical Pharmacy & Therapeutics
  clinical_pharm: [
    'lib_dipiro', 'lib_pharmacotherapy_review', 'lib_pharm_care',
    'lib_ktg', 'lib_kenya_eml', 'lib_pharmacy_kenya',
    'lib_bnf', 'lib_who_formulary', 'lib_sanford', 'lib_drug_interactions',
    'lib_goodman', 'lib_katzung', 'lib_whalen',
    'lib_kenya_tb', 'lib_kenya_malaria', 'lib_kenya_hiv',
    'lib_who_antibiotic',
  ],

  // Supporting Sciences
  sup_sciences: [
    'lib_oer_ncbi', 'lib_oer_merck', 'lib_whalen',
    'lib_shargel', 'lib_winter',
  ],

  // Clinical Cases
  clinical_cases: [
    'lib_dipiro', 'lib_pharmacotherapy_review',
    'lib_sanford', 'lib_who_antibiotic',
    'lib_ktg', 'lib_kenya_hiv', 'lib_kenya_malaria', 'lib_kenya_tb',
    'lib_kenya_poison',
  ],

  // Drug Information & Guidelines
  drug_info: [
    'lib_bnf', 'lib_who_formulary', 'lib_sanford', 'lib_drug_interactions',
    'lib_kenya_eml', 'lib_pharmacy_kenya', 'lib_kenya_pharmacopoeia',
    'lib_ktg', 'lib_kenya_tb', 'lib_kenya_malaria', 'lib_kenya_hiv',
  ],

  // EBM & Research
  ebm_research: [
    'lib_nice_cns', 'lib_who_pain',
  ],

  // Online Books (general — show most books)
  online_books: [
    'lib_katzung', 'lib_goodman', 'lib_rang_dale', 'lib_whalen',
    'lib_dipiro', 'lib_shargel', 'lib_winter', 'lib_toxicology',
    'lib_pharm_care', 'lib_pharmacotherapy_review',
    'lib_ktg', 'lib_kenya_eml', 'lib_pharmacy_kenya', 'lib_kenya_pharmacopoeia',
    'lib_kenya_tb', 'lib_kenya_malaria', 'lib_kenya_hiv', 'lib_kenya_poison',
    'lib_bnf', 'lib_who_formulary', 'lib_sanford', 'lib_drug_interactions',
    'lib_gina', 'lib_gold', 'lib_esc_guidelines', 'lib_aha_guidelines',
    'lib_ada', 'lib_thyroid', 'lib_kdigo', 'lib_nccn', 'lib_asco',
    'lib_nice_cns', 'lib_who_pain', 'lib_who_antibiotic',
    'lib_bsg', 'lib_ash', 'lib_nice_derm', 'lib_aaoo',
    'lib_oer_pharma1', 'lib_oer_ncbi', 'lib_oer_merck', 'lib_brain_tree',
  ],
}

// GUIDELINES_BOOKS covers guidelines shared across modules
const GUIDELINES_BOOKS: string[] = [
  'lib_gina', 'lib_gold', 'lib_esc_guidelines', 'lib_aha_guidelines',
  'lib_ada', 'lib_thyroid', 'lib_kdigo', 'lib_nccn', 'lib_asco',
  'lib_nice_cns', 'lib_who_pain', 'lib_who_antibiotic',
  'lib_bsg', 'lib_ash', 'lib_nice_derm', 'lib_aaoo',
]

// Sub-module books (more specific)
const SUB_MODULE_BOOKS: Record<string, string[]> = {
  // Clinical Pharmacy sub-modules
  'cp-cv': ['lib_dipiro', 'lib_pharmacotherapy_review', 'lib_esc_guidelines', 'lib_aha_guidelines', 'lib_ash'],
  'cp-endo': ['lib_dipiro', 'lib_pharmacotherapy_review', 'lib_ada', 'lib_thyroid'],
  'cp-resp': ['lib_dipiro', 'lib_pharmacotherapy_review', 'lib_gina', 'lib_gold'],
  'cp-gi': ['lib_dipiro', 'lib_pharmacotherapy_review', 'lib_bsg'],
  'cp-renal': ['lib_dipiro', 'lib_pharmacotherapy_review', 'lib_kdigo'],
  'cp-neuro': ['lib_dipiro', 'lib_pharmacotherapy_review', 'lib_nice_cns'],
  'cp-id': ['lib_dipiro', 'lib_sanford', 'lib_who_antibiotic', 'lib_kenya_hiv', 'lib_kenya_malaria', 'lib_kenya_tb'],
  'cp-onc': ['lib_dipiro', 'lib_nccn', 'lib_asco'],
  'cp-peds': ['lib_dipiro', 'lib_pharmacotherapy_review'],
  'cp-obgyn': ['lib_dipiro', 'lib_pharmacotherapy_review'],
  'cp-derm': ['lib_dipiro', 'lib_nice_derm', 'lib_pharmacotherapy_review'],
  'cp-ophth': ['lib_aaoo'],
  'cp-ent': ['lib_pharmacotherapy_review'],

  // Pharmacology sub-modules
  'pharm-cv': ['lib_katzung', 'lib_rang_dale', 'lib_goodman'],
  'pharm-cns': ['lib_katzung', 'lib_rang_dale', 'lib_goodman', 'lib_whalen'],
  'pharm-endo': ['lib_katzung', 'lib_rang_dale', 'lib_goodman'],
  'pharm-resp': ['lib_katzung', 'lib_rang_dale'],
  'pharm-gi': ['lib_katzung', 'lib_rang_dale'],
  'pharm-renal': ['lib_katzung', 'lib_rang_dale'],
  'pharm-anti': ['lib_katzung', 'lib_sanford', 'lib_who_antibiotic'],
  'pharm-chemo': ['lib_katzung', 'lib_goodman', 'lib_nccn'],
  'pharm-pk': ['lib_shargel', 'lib_winter'],
  'pharm-pd': ['lib_shargel', 'lib_winter'],
  'pharm-tox': ['lib_toxicology', 'lib_kenya_poison'],
}

export function getBooksForModule(moduleId: string): LibraryResource[] {
  // "online_books" → show everything
  if (moduleId === 'online_books') {
    return LIBRARY
  }

  const ids = MODULE_BOOKS[moduleId] ?? []
  if (ids.length === 0) {
    // Try sub-module
    const subIds = SUB_MODULE_BOOKS[moduleId] ?? []
    if (subIds.length === 0) return []
    return subIds
      .map((id) => LIBRARY.find((r) => r.id === id)!)
      .filter(Boolean)
  }

  // Add shared guideline books for clinical modules
  const allIds = moduleId.startsWith('cp-') || moduleId === 'clinical_pharm'
    ? [...new Set([...ids, ...GUIDELINES_BOOKS])]
    : ids

  return allIds
    .map((id) => LIBRARY.find((r) => r.id === id)!)
    .filter(Boolean)
}

/** Group books into sections for display */
export function groupBooksByType(books: LibraryResource[]) {
  const groups: { title: string; books: LibraryResource[] }[] = []

  const textbooks = books.filter((b) => b.type === 'textbook')
  if (textbooks.length) groups.push({ title: 'Textbooks', books: textbooks })

  const guidelines = books.filter((b) => b.type === 'guideline')
  if (guidelines.length) groups.push({ title: 'Guidelines', books: guidelines })

  const references = books.filter((b) => b.type === 'reference' || b.type === 'formulary')
  if (references.length) groups.push({ title: 'References & Formularies', books: references })

  const handbooks = books.filter((b) => b.type === 'handbook' || b.type === 'companion')
  if (handbooks.length) groups.push({ title: 'Handbooks & Companions', books: handbooks })

  const oer = books.filter((b) => b.type === 'oer')
  if (oer.length) groups.push({ title: 'Open Resources', books: oer })

  return groups
}
