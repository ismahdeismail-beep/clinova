// ================================================================
// Exam Prep — Clinical Pharmacy & Pharmacology past-paper bank
// ----------------------------------------------------------------
// Built from real past examination papers, grouped by module
// (Clinical Pharmacy / Pharmacology), each with units that record
// the section structure (counts + marks) and topic areas.
//
// This drives the Education Hub "Exam Prep" feature: per module it
// shows the real exam pattern + topics, then generates three mock
// papers that mirror the structure.
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

export interface ExamModuleSpec {
  id: string;
  title: string;
  description: string;
  units: ExamUnitSpec[];
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

// ====================================================================
// MODULE 1 — CLINICAL PHARMACY (8 units)
// ====================================================================
const CLINICAL_PHARMACY_UNITS: ExamUnitSpec[] = [
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
      'Viral hepatitis A\u2013E — transmission, vaccination schedules',
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

// ====================================================================
// MODULE 2 — PHARMACOLOGY (8 units)
// ====================================================================
const PHARMACOLOGY_UNITS: ExamUnitSpec[] = [
  {
    id: 'pharm-general',
    title: 'General Principles',
    mappedUnits: ['pharm-general'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Prodrugs — enalapril, dipivefrine, mercaptopurine, concept and examples',
      'CYP450 enzyme inhibition — ketoconazole, cimetidine; induction — rifampicin, phenytoin, phenobarbitone',
      'Volume of distribution — altered in obesity, pregnancy, neonate; effect of protein binding',
      'Plasma protein binding — high binding = lower Vd, longer duration, drug interactions',
      'Redistribution phenomenon — thiopentone, highly lipid-soluble anaesthetics',
      'Drug metabolism — acetylation (sulphonamide, isoniazid), rapid vs slow acetylators',
      'Loading dose — purpose, achieving steady state rapidly',
      'Clearance — definition, significance for drug elimination',
      'Half-life — first-order kinetics, elimination after 4 half-lives (~93%)',
      'First-pass metabolism — rectal route bypass, bioavailability',
      'Grapefruit juice — CYP3A4 inhibition, effect on drug metabolism',
      'Drug absorption — weak acids in stomach, weak bases in intestine, factors affecting',
    ],
  },
  {
    id: 'pharm-autonomic',
    title: 'Autonomic Nervous System',
    mappedUnits: ['pharm-autonomic'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Cholinergic agonists — bethanechol (urinary retention), pilocarpine, methacholine',
      'Cholinesterase inhibitors — neostigmine, pyridostigmine, physostigmine, edrophonium',
      'Myasthenia gravis — diagnosis (edrophonium test), maintenance (pyridostigmine)',
      'Anticholinergics — atropine, tolterodine, glycopyrrolate; clinical uses',
      'Organophosphate poisoning — atropine + pralidoxime management',
      'Adrenergic agonists — epinephrine, norepinephrine, phenylephrine, methoxamine',
      'Beta-blockers — metoprolol (cardioselective) vs propranolol (non-selective)',
      'Alpha-blockers — prazosin, phentolamine; pharmacological effects',
      'Alpha2-agonists — clonidine, alpha-methyldopa; central antihypertensive action',
      'Neuromuscular blockers — succinylcholine, dantrolene (malignant hyperthermia)',
      'Plasma cholinesterase deficiency — prolonged succinylcholine effect',
      'Adrenergic receptor distribution — beta1 (heart), beta2 (bronchi, vessels)',
    ],
  },
  {
    id: 'pharm-autacoids-cns',
    title: 'Autacoids, Inflammation & CNS',
    mappedUnits: ['pharm-autacoids', 'pharm-cns'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Autacoids vs hormones — local action, no specific cell of origin',
      'Histamine — H1/H2/H3 receptors, H1 agonists (2-thiazolyl ethylamine)',
      'H1 antihistamines — first-gen (diphenhydramine, chlorpheniramine) vs second-gen (loratadine, cetirizine)',
      'H1 antihistamine properties — anticholinergic, anti-5-HT, sedative, appetite-stimulating',
      'Cardiotoxicity — terfenadine/astemizole + CYP3A4 inhibitors (ketoconazole, erythromycin)',
      '5-Hydroxytryptamine (serotonin) — 5-HT3 receptor (emesis), 5-HT1 (migraine)',
      'Migraine prophylaxis — methysergide (visceral fibrosis risk), propranolol, amitriptyline',
      'Ergot alkaloids — ergotamine, DHE; oxytocic property, ergotism',
      'Sedative-hypnotics — benzodiazepines, barbiturates, Z-drugs',
      'Benzodiazepines — mechanism (GABA-A potentiation), antidote (flumazenil)',
      'Barbiturates — CYP450 induction, tolerance, dependence',
      'Antipsychotics — typical vs atypical, extrapyramidal side effects, metabolic syndrome',
    ],
  },
  {
    id: 'pharm-cvs',
    title: 'Cardiovascular System',
    mappedUnits: ['pharm-cvs'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Antihypertensives — ACE inhibitors, ARBs, CCBs, beta-blockers, diuretics',
      'ACE inhibitors — mechanism, cough side effect, contraindications (pregnancy, renal artery stenosis)',
      'Angiotensin receptor blockers — losartan, valsartan; alternative when ACE-I intolerant',
      'Calcium channel blockers — verapamil, nifedipine, diltiazem; reflex tachycardia',
      'Beta-blockers — cardioselective (atenolol, metoprolol) vs non-selective (propranolol)',
      'Diuretics — loop (furosemide), thiazide (HCTZ), K-sparing (spironolactone)',
      'Cardiac glycosides — digoxin; mechanism, toxicity, TDM',
      'Antiarrhythmics — Vaughan Williams classification, class I–IV',
      'Antianginal drugs — nitrates, beta-blockers, CCBs',
      'Heart failure management — ACE-I + beta-blocker + diuretic + digoxin',
      'Lipid-lowering drugs — statins, fibrates, ezetimibe',
      'Anticoagulants — warfarin, heparin, LMWH, NOACs; monitoring, reversal',
    ],
  },
  {
    id: 'pharm-resp-renal-git',
    title: 'Respiratory, Renal & GIT',
    mappedUnits: ['pharm-resp-renal', 'pharm-git'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Bronchodilators — beta2-agonists (salbutamol), anticholinergics (ipratropium), theophylline',
      'Corticosteroids in respiratory disease — inhaled (budesonide, fluticasone), systemic',
      'Leukotriene receptor antagonists — montelukast, zafirlukast',
      'Mast cell stabilisers — sodium cromoglycate, nedocromil',
      'Theophylline — TDM, narrow therapeutic index, CYP450 interactions',
      'Diuretics in renal disease — loop diuretics, mechanism, adverse effects',
      'Antacids — aluminium/magnesium combinations, drug interactions',
      'H2 receptor antagonists — cimetidine, ranitidine, famotidine',
      'Proton pump inhibitors — omeprazole, esomeprazole; long-term concerns',
      'Antiemetics — ondansetron (5-HT3), metoclopramide, prochlorperazine',
      'Laxatives — bulk-forming, stimulant (bisacodyl, senna), osmotic (lactulose)',
      'Antidiarrhoeals — loperamide, oral rehydration salts',
    ],
  },
  {
    id: 'pharm-chemo',
    title: 'Chemotherapeutic Agents',
    mappedUnits: ['pharm-chemo'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Antibacterial mechanisms — cell wall (beta-lactams), protein synthesis (macrolides, tetracyclines)',
      'Beta-lactam antibiotics — penicillins, cephalosporins, carbapenems; spectrum, resistance',
      'Penicillin allergy — cross-reactivity with cephalosporins, alternative agents',
      'Macrolides — erythromycin, azithromycin; mechanism, CYP3A4 inhibition',
      'Tetracyclines — doxycycline, minocycline; indications, photosensitivity',
      'Aminoglycosides — gentamicin, amikacin; ototoxicity, nephrotoxicity, TDM',
      'Fluoroquinolones — ciprofloxacin, levofloxacin; tendon toxicity',
      'Antifungals — azoles (fluconazole), polyenes (amphotericin B), echinocandins',
      'Antivirals — acyclovir (herpes), oseltamivir (influenza), mechanism',
      'Tuberculosis — RHZE regimen, mechanism of action, hepatotoxicity monitoring',
      'Antimalarials — chloroquine, artemisinin combinations, resistance',
      'Antimicrobial resistance — mechanisms, MRSA, ESBL, stewardship',
    ],
  },
  {
    id: 'pharm-anticancer-endo',
    title: 'Anticancer, Endocrine & Vitamins',
    mappedUnits: ['pharm-anticancer', 'pharm-endo'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Cytotoxic chemotherapy — alkylating agents, antimetabolites, plant alkaloids',
      'Anticancer drug toxicity — cisplatin (ototoxicity, nephrotoxicity), doxorubicin (cardiotoxicity)',
      'Immunosuppressants — cyclosporine, tacrolimus, mycophenolate; TDM',
      'Dermatological pharmacology — topical corticosteroids, antifungals, retinoids',
      'Ocular pharmacology — beta-blockers (timolol), prostaglandin analogues (latanoprost) in glaucoma',
      'Thyroid hormones — levothyroxine; antithyroid drugs (carbimazole, propylthiouracil)',
      'Insulin preparations — rapid, short, intermediate, long-acting; regimens',
      'Oral hypoglycaemics — metformin, sulfonylureas, DPP-4 inhibitors, SGLT2 inhibitors',
      'Corticosteroids — prednisolone, dexamethasone; anti-inflammatory, immunosuppressive',
      'Vitamins — water-soluble (B complex, C) and fat-soluble (A, D, E, K); deficiency states',
      'Vitamin supplementation — indications, toxicity (hypervitaminosis)',
      'Bone pharmacology — calcium, vitamin D, bisphosphonates',
    ],
  },
  {
    id: 'pharm-toxicology',
    title: 'Toxicology & Drug Discovery',
    mappedUnits: ['pharm-toxicology'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Heavy metal poisoning — lead, mercury, arsenic; sources, clinical features',
      'Chelating agents — BAL (dimercaprol), EDTA, penicillamine, DMSA',
      'Paracetamol poisoning — NAPQI, glutathione depletion, N-acetylcysteine',
      'Organophosphate/carbamate poisoning — cholinergic crisis, atropine + pralidoxime',
      'Drug overdose management — ABCDE approach, activated charcoal, antidotes',
      'Cyanide poisoning — sodium nitrite, sodium thiosulfate, hydroxocobalamin',
      'Iron poisoning — desferrioxamine, dose, monitoring',
      'Alcohol toxicity — methanol, ethylene glycol; fomepizole, ethanol therapy',
      'Drug discovery pipeline — target identification, lead optimisation, preclinical testing',
      'Clinical trial phases — Phase I–IV, endpoints, ethics (Declaration of Helsinki)',
      'Toxicokinetics — LD50, therapeutic index, safety margin',
      'Adverse drug reactions — classification (Type A–F), pharmacovigilance',
    ],
  },
];

// ====================================================================
// MODULE REGISTRY — both modules
// ====================================================================
export const EXAM_PREP_MODULES: ExamModuleSpec[] = [
  {
    id: 'clinical-pharmacy-exam',
    title: 'Clinical Pharmacy',
    description: 'Practice papers modelled on the real clinical-pharmacy exam pattern. Each subject shows the section structure and topic areas drawn from the most recent past paper, then provides three full mock papers.',
    units: CLINICAL_PHARMACY_UNITS,
  },
  {
    id: 'pharmacology-exam',
    title: 'Pharmacology',
    description: 'Practice papers covering systematic pharmacology from general principles through chemotherapy and toxicology.',
    units: PHARMACOLOGY_UNITS,
  },
];

// Flat list for direct access (backwards-compatible)
export const EXAM_PREP_UNITS: ExamUnitSpec[] = [
  ...CLINICAL_PHARMACY_UNITS,
  ...PHARMACOLOGY_UNITS,
];

export function getExamPrepUnit(id: string): ExamUnitSpec | undefined {
  return EXAM_PREP_UNITS.find((u) => u.id === id);
}

export function getExamPrepModule(id: string): ExamModuleSpec | undefined {
  return EXAM_PREP_MODULES.find((m) => m.id === id);
}
