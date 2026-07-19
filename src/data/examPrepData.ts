// ================================================================
// Exam Prep — Clinical Pharmacy past-paper bank
// ----------------------------------------------------------------
// Built by crawling a set of clinical-pharmacy past examination
// papers, grouping them by subject, selecting the latest/most
// complete paper in each set, and studying its structure + topics.
//
// Each entry records the section structure (counts + marks) and
// the topic areas the paper actually examines, plus the Education
// Hub curriculum unit(s) it maps to.
//
// This drives the Education Hub "Exam Prep" feature: per subject it
// shows the real exam pattern + topics, then generates two mock
// papers that mirror the structure using these topics.
// ================================================================

export interface ExamSectionSpec {
  letter: 'A' | 'B' | 'C';
  name: string;
  count: number;
  marks: number;
  instruction: string;
}

export interface ExamUnitSpec {
  id: string;
  title: string;
  mappedUnits: string[];
  structure: ExamSectionSpec[];
  topics: string[];
}

// ----------------------------------------------------------------
// STANDARD EXAM FORMAT (applies to every subject henceforth):
//   Section A — MCQs                — 30 marks
//   Section B — Short Answer        — 8 questions, 40 marks
//   Section C — Long Answer         — 2 questions, 30 marks
//   Total                          — 100 marks
// Questions in Sections B and C may contain multiple subsections,
// but the section marks must always stay 30 / 40 / 30.
// ----------------------------------------------------------------
export const STANDARD_EXAM_STRUCTURE: ExamSectionSpec[] = [
  { letter: 'A', name: 'Multiple Choice Questions', count: 30, marks: 30, instruction: 'Answer ALL questions. Choose the best answer for each question.' },
  { letter: 'B', name: 'Short Answer Questions', count: 8, marks: 40, instruction: 'Answer ALL questions. Questions may contain subsections.' },
  { letter: 'C', name: 'Long Answer Questions', count: 2, marks: 30, instruction: 'Answer BOTH questions. Questions may contain subsections. Begin each in a new page.' },
];

export const EXAM_PREP_UNITS: ExamUnitSpec[] = [
  {
    id: 'exam-respiratory-renal',
    title: 'Respiratory & Renal',
    mappedUnits: ['cp-resp', 'cp-renal'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'COPD — pathophysiology, complications (cor pulmonale, respiratory failure), management classes',
      'Asthma — inhaler therapy, LABA/ICS combinations, mast cell stabilisers, monitoring',
      'Smoking cessation — nicotine replacement, varenicline, bupropion',
      'Spirometry & lung function — FEV1 interpretation',
      'Bronchodilators — SABA, LAMA, beta-agonist cautions',
      'Chronic kidney disease — risk factors, complications',
      'Antimuscarinics (ipratropium) — adverse effects',
      'Theophylline — TDM, interactions, toxicity',
      'Corticosteroids in asthma — role, cautions, tapering',
    ],
  },
  {
    id: 'exam-antimicrobials',
    title: 'Principles of Antimicrobial Therapy',
    mappedUnits: ['cp-id'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Antimicrobial stewardship — antibiograms, formulary, resistance',
      'Antimicrobial failure — causes, superinfection, drug resistance',
      'Tuberculosis — RHZE regimen, hepatotoxicity monitoring, rechallenge',
      'Penicillin allergy & alternative agents',
      'Atypical pneumonia — Legionella, Mycoplasma, macrolides',
      'Community-acquired pneumonia — organism coverage',
      'Empiric therapy selection — local/national susceptibility data',
      'Therapy monitoring & culture-directed adjustment',
    ],
  },
  {
    id: 'exam-cardiovascular-heme',
    title: 'Cardiovascular & Hematopoietic',
    mappedUnits: ['cp-cv', 'cp-onc'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Anaemia — detection (conjunctiva/sclera), causes',
      'Bradycardia — drug causes (digoxin, beta-blockers)',
      'Valvular/structural heart disease — investigation (ECG, ECHO)',
      'Blood pressure — MAP calculation, hypertension classification',
      'Hypertension in diabetes/nephropathy — BP targets',
      'Secondary hypertension — renoparenchymal causes',
      'Heart failure — ACEI + furosemide management',
      'Diuretics — loop/thiazide/K-sparing, adverse effects',
      'ACE inhibitors — contraindications',
      'Beta-blockers — cardio-selective vs non-selective',
      'Calcium channel blockers — toxicity, reflex tachycardia',
      'Antihypertensives in asthma — safe choices',
    ],
  },
  {
    id: 'exam-infections-i',
    title: 'Infections I',
    mappedUnits: ['cp-id'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Botulism, diphtheria, tetanus — clinical differentiation',
      'Food poisoning — Campylobacter, Salmonella, E. coli O157',
      'Acute osteomyelitis — organisms (Staph aureus), management',
      'Paediatric diarrhoea — zinc, rehydration, micronutrients',
      'STI — HPV typing, anogenital warts',
      'Rabies — post-exposure prophylaxis (vaccine + RIG)',
      'Campylobacter enteritis — antimicrobial choice',
      'Cholera — toxin mechanism (ADP-ribosylation of Gs)',
      'Loa loa — vector (Chrysops deerfly)',
      'Sickle cell — Salmonella osteomyelitis',
      'Septic arthritis — gonococcal vs staphylococcal',
    ],
  },
  {
    id: 'exam-infections-ii',
    title: 'Infections II',
    mappedUnits: ['cp-id'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Viral hepatitis A–E — transmission, vaccination schedules',
      'HIV — vertical transmission risk, antiretrovirals (NNRTI/NRTI/INSTI)',
      'Meningitis — bacterial (Listeria, TB, HSV), CSF findings',
      'Urethritis — ceftriaxone, Chlamydia co-treatment',
      'HBV serology — interpretation of marker patterns',
      'HCV — antibody testing, nucleic acid confirmation',
      'STI drug resistance — N. gonorrhoeae',
      'Syphilis — Treponema pallidum, rash pattern',
      'Hepatocellular carcinoma — viral aetiology (HBV/HCV)',
    ],
  },
  {
    id: 'exam-cns',
    title: 'Central Nervous System Disorders',
    mappedUnits: ['cp-neuro'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Mood disorders — mania, psychosis, schizophrenia symptoms',
      'Disulfiram-like reactions — metronidazole, cephalosporins',
      'Opioid dependence — heroin, methadone, meperidine',
      'Epilepsy — ethosuximide (absence), seizure types',
      'Traumatic brain injury — secondary injury, Mannitol, GCS',
      'Migraine — triggers, triptans, first-line therapy',
      'Wernicke encephalopathy — thiamine deficiency',
      'Schizophrenia — positive vs negative symptoms',
      'Alcohol withdrawal — benzodiazepines',
      'Antipsychotics — adverse effects, metabolic',
    ],
  },
  {
    id: 'exam-endo-onc-rheum',
    title: 'Endocrinology, Joint & Oncology',
    mappedUnits: ['cp-endo', 'cp-onc', 'cp-rheum'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Hypothyroidism — levothyroxine initiation, drug interactions (iron)',
      'Chemotherapy — cisplatin ototoxicity, monitoring',
      'Diabetes mellitus — insulin regimens, hypoglycaemia management',
      'Diabetes risk factors — screening, education',
      'NSAID/GI toxicity — ibuprofen without gastroprotection',
      'Gout — naproxen cautions in renal impairment, allopurinol counselling',
      'Metformin — withholding (contrast, AKI), lactic acidosis',
      'Thyroid function monitoring — follow-up timing',
      'Oncology pharmacotherapy — adverse effect identification',
    ],
  },
  {
    id: 'exam-hospital-practice',
    title: 'Hospital & Clinical Pharmacy Practice',
    mappedUnits: ['cp-intro'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Hospital pharmacist roles — medicines availability, drug safety',
      'Medicines & Therapeutics Committee — governance, policies',
      'Direct patient care — chart review, accuracy, competence',
      'Medication review & reconciliation',
      'Rational prescribing — principles, evidence-based',
      'Pharmacy-based screening & counselling',
      'Medication errors — wrong doses, ADRs, prevention',
      'Proprietary vs non-proprietary naming',
      'Pharmacy records & hospital formulary',
      'Drug distribution systems — floor stock, unit dose, satellite pharmacy',
      'Medical devices — function matching',
      'Vaccination schedules (EPI)',
    ],
  },
];

export function getExamPrepUnit(id: string): ExamUnitSpec | undefined {
  return EXAM_PREP_UNITS.find((u) => u.id === id);
}
