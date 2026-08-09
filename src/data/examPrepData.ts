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
//
// Unit sources:
//  - source: 'mock' — AI-generated practice papers (NEW curriculum)
//  - source: 'real' — verbatim cleaned past papers (OLD curriculum)
// ================================================================

export interface ExamSectionSpec {
  letter: 'A' | 'B' | 'C';
  name: string;
  count: number;
  marks: number;
  instruction: string;
}

export type ExamTrackId = 'traditional' | 'revised';

export interface ExamUnitSpec {
  id: string;
  title: string;
  mappedUnits: string[];
  structure: ExamSectionSpec[];
  topics: string[];
  /** 'mock' = AI-generated practice papers; 'real' = verbatim cleaned past paper(s) */
  source?: 'mock' | 'real';
  /** Kabarak old-curriculum placement (year/trimester) for OLD/traditional units. */
  year?: number;
  trimester?: number;
}

export interface ExamTrackSpec {
  id: ExamTrackId;
  title: string;
  shortLabel: string;
  description: string;
  badge: string;
  units: ExamUnitSpec[];
}

export interface ExamModuleSpec {
  id: string;
  title: string;
  description: string;
  units: ExamUnitSpec[];
  tracks: ExamTrackSpec[];
}

// ----------------------------------------------------------------
// STANDARD EXAM FORMAT (applies to every NEW-curriculum subject):
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

// Helper for OLD-curriculum units: normalized marks (A=30 / B=40 / C=30)
// with the real question counts of the cleaned past paper.
function oldStructure(aCount: number, bCount: number, cCount: number): ExamSectionSpec[] {
  return [
    { letter: 'A', name: 'Multiple Choice Questions', count: aCount, marks: 30, instruction: 'Answer ALL questions. Choose the best answer for each question.' },
    { letter: 'B', name: 'Short Answer Questions', count: bCount, marks: 40, instruction: 'Answer ALL questions. Questions may contain subsections.' },
    { letter: 'C', name: 'Long Answer Questions', count: cCount, marks: 30, instruction: 'Answer BOTH questions. Questions may contain subsections. Begin each in a new page.' },
  ];
}

// ====================================================================
// MODULE 1 — CLINICAL PHARMACY
// 8 existing units (real past papers) + 5 NEW-curriculum units
// ====================================================================
const CLINICAL_PHARMACY_UNITS: ExamUnitSpec[] = [
  {
    id: 'exam-respiratory-renal',
    title: 'Respiratory & Renal',
    year: 3,
    trimester: 3,
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
    year: 4,
    trimester: 1,
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
    year: 4,
    trimester: 1,
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
    year: 4,
    trimester: 2,
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
    year: 4,
    trimester: 2,
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
    year: 5,
    trimester: 1,
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
    year: 5,
    trimester: 2,
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
    year: 3,
    trimester: 2,
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
  // ---------------- NEW-curriculum Clinical Pharmacy units ----------------
  {
    id: 'cp-new-intro',
    title: 'Introduction to Clinical Pharmacy',
    mappedUnits: ['cp-intro', 'cp-pharmcare', 'cp-safety'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Clinical pharmacy — definitions, scope, ward-based practice',
      'Medication history taking & patient interviewing',
      'Medication reconciliation & review',
      'Prescription analysis — legality, interactions, dose checking',
      'Rational prescribing & evidence-based medicine',
      'Medication errors & adverse drug reaction reporting',
      'Hospital formulary & Medicines and Therapeutics Committee',
      'Drug distribution systems — unit dose, floor stock, satellite pharmacy',
      'Patient counselling & adherence strategies',
      'Pharmaceutical care planning',
    ],
  },
  {
    id: 'cp-new-cvs-renal',
    title: 'Cardiovascular & Renal Therapeutics',
    mappedUnits: ['cp-cv', 'cp-renal'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Hypertension — classification, BP targets, drug selection',
      'Heart failure — ACEI/ARB, beta-blockers, diuretics, digoxin',
      'Ischaemic heart disease — antianginals, antiplatelets',
      'Arrhythmias — Vaughan Williams classification, amiodarone',
      'Anticoagulation — warfarin, DOACs, monitoring, reversal',
      'Dyslipidaemia — statins, targets, interactions',
      'Acute & chronic kidney disease — staging, drug dose adjustment',
      'Renal replacement therapy & drug dosing in dialysis',
      'Electrolyte disorders — hyperkalaemia, hyponatraemia',
      'Diuretics — loop, thiazide, K-sparing; adverse effects',
      'Nephrotoxic drugs — NSAIDs, aminoglycosides, contrast media',
      'Anaemia of CKD — erythropoiesis-stimulating agents, iron',
    ],
  },
  {
    id: 'cp-new-infections',
    title: 'Infectious Diseases Therapeutics',
    mappedUnits: ['cp-id'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Antimicrobial stewardship & resistance',
      'Empiric vs directed therapy — culture & susceptibility',
      'Respiratory tract infections — CAP, HAP, atypical organisms',
      'Tuberculosis — RHZE, DOTS, monitoring, adverse effects',
      'HIV — ART regimens, opportunistic infection prophylaxis',
      'Viral hepatitis — HBV/HCV management',
      'Meningitis — empiric regimens, CSF interpretation',
      'UTI & pyelonephritis — treatment, catheter-associated',
      'Skin & soft tissue infections — MRSA considerations',
      'Sepsis — early antibiotics, source control',
      'Antifungal & antiviral therapy — indications, toxicity',
      'Vaccines & immunisation schedules (EPI)',
    ],
  },
  {
    id: 'cp-new-cns-endo',
    title: 'CNS & Endocrine Therapeutics',
    mappedUnits: ['cp-neuro', 'cp-endo'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Epilepsy — seizure types, drug selection, monitoring',
      'Parkinson disease — levodopa, dopamine agonists, COMT inhibitors',
      'Depression & anxiety — SSRI/SNRI/TCA, counselling points',
      'Bipolar disorder — lithium, valproate, monitoring',
      'Schizophrenia — antipsychotics, EPS, metabolic monitoring',
      'Migraine — acute & prophylaxis therapy',
      'Diabetes mellitus — insulin regimens, oral agents, SMBG',
      'Diabetic complications — nephropathy, neuropathy, foot care',
      'Thyroid disorders — hypothyroidism, hyperthyroidism management',
      'Corticosteroids — indications, tapering, adverse effects',
      'Osteoporosis — calcium, vitamin D, bisphosphonates',
      'Analgesics in neuropathic pain — amitriptyline, gabapentin',
    ],
  },
  {
    id: 'cp-new-advanced',
    title: 'Advanced Clinical Pharmacy: Oncology & Toxicology',
    mappedUnits: ['cp-onc', 'cp-tox', 'cp-ger'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Cancer chemotherapy — cell-cycle agents, regimens, protocols',
      'Chemotherapy adverse effects — myelosuppression, emesis, cardiotoxicity',
      'Supportive care in oncology — growth factors, antiemetics, pain',
      'Targeted & hormonal therapy — monoclonal antibodies, endocrine agents',
      'Safe handling of cytotoxic drugs — preparation, spill, disposal',
      'Extravasation management',
      'Principles of toxicology — toxicokinetics, toxidromes',
      'Paracetamol poisoning — N-acetylcysteine protocol',
      'Antidotes — organophosphates, opioids, benzodiazepines, cyanide',
      'Heavy metal poisoning — chelation therapy',
      'Management of poisoning — decontamination, enhanced elimination',
      'Polypharmacy & medication safety in older adults',
    ],
  },
];

// ====================================================================
// MODULE 2 — PHARMACOLOGY
// 7 NEW-curriculum units (mock papers) + 12 OLD-curriculum units
// (verbatim cleaned past papers, one real paper each)
// ====================================================================

// ---------------- NEW-curriculum Pharmacology units (mock papers) ----------------
const PHARMACOLOGY_NEW_UNITS: ExamUnitSpec[] = [
  {
    id: 'pharm-new-intro-pkpd',
    title: 'General Principles: Intro, PK & PD',
    mappedUnits: ['pharm-intro', 'pharm-gen', 'pharm-pk', 'pharm-pd'],
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
      'Dose-response curves — potency, efficacy, therapeutic index',
      'Receptor theory — agonists, antagonists, partial agonists, spare receptors',
      'Drug interactions — pharmacodynamic vs pharmacokinetic',
    ],
  },
  {
    id: 'pharm-new-autonomic',
    title: 'Autonomic Nervous System',
    mappedUnits: ['pharm-auto'],
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
      'Sympathetic vs parasympathetic — anatomy, transmitters, receptors',
      'Ganglionic blockers & stimulants — nicotine, hexamethonium',
    ],
  },
  {
    id: 'pharm-new-cns',
    title: 'Central Nervous System Pharmacology',
    mappedUnits: ['pharm-cns'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Sedative-hypnotics — benzodiazepines, barbiturates, Z-drugs',
      'Benzodiazepines — mechanism (GABA-A potentiation), antidote (flumazenil)',
      'Barbiturates — CYP450 induction, tolerance, dependence',
      'Antipsychotics — typical vs atypical, extrapyramidal side effects, metabolic syndrome',
      'Antidepressants — SSRI/SNRI/TCA/MAOI, mechanisms, adverse effects',
      'Mood stabilisers — lithium, valproate, carbamazepine; monitoring',
      'Antiepileptics — phenytoin, carbamazepine, valproate, ethosuximide, lamotrigine',
      'Opioid analgesics — morphine, pethidine, methadone; dependence, withdrawal',
      'General anaesthetics — thiopentone, propofol; stages of anaesthesia',
      'Parkinson disease — levodopa, carbidopa, dopamine agonists, selegiline',
      'Alcohol & substance abuse pharmacology — disulfiram, naltrexone',
      'Migraine therapy — triptans, ergotamine, prophylaxis',
      'CNS stimulants — amphetamines, caffeine; analeptics',
      'Antiemetics acting on CNS — ondansetron, metoclopramide, prochlorperazine',
    ],
  },
  {
    id: 'pharm-new-cvs-renal',
    title: 'Cardiovascular & Renal Pharmacology',
    mappedUnits: ['pharm-cv', 'pharm-renal'],
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
      'Antiplatelets — aspirin, clopidogrel, ticagrelor',
      'Renal pharmacology — diuretic sites of action, drug dosing in renal impairment',
    ],
  },
  {
    id: 'pharm-new-endo-autacoids',
    title: 'Endocrine & Autacoid Pharmacology',
    mappedUnits: ['pharm-endo', 'pharm-vit'],
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
      'Eicosanoids — prostaglandins, leukotrienes, NSAIDs, COX-2 inhibitors',
      'Thyroid hormones — levothyroxine; antithyroid drugs (carbimazole, propylthiouracil)',
      'Insulin preparations — rapid, short, intermediate, long-acting; regimens',
      'Oral hypoglycaemics — metformin, sulfonylureas, DPP-4 inhibitors, SGLT2 inhibitors',
      'Corticosteroids — prednisolone, dexamethasone; anti-inflammatory, immunosuppressive',
      'Sex hormones & contraceptives — oestrogens, progestins, tamoxifen',
    ],
  },
  {
    id: 'pharm-new-gi-resp',
    title: 'Gastrointestinal & Respiratory Pharmacology',
    mappedUnits: ['pharm-gi', 'pharm-resp'],
    structure: STANDARD_EXAM_STRUCTURE,
    topics: [
      'Bronchodilators — beta2-agonists (salbutamol), anticholinergics (ipratropium), theophylline',
      'Corticosteroids in respiratory disease — inhaled (budesonide, fluticasone), systemic',
      'Leukotriene receptor antagonists — montelukast, zafirlukast',
      'Mast cell stabilisers — sodium cromoglycate, nedocromil',
      'Theophylline — TDM, narrow therapeutic index, CYP450 interactions',
      'Antacids — aluminium/magnesium combinations, drug interactions',
      'H2 receptor antagonists — cimetidine, ranitidine, famotidine',
      'Proton pump inhibitors — omeprazole, esomeprazole; long-term concerns',
      'Antiemetics — ondansetron (5-HT3), metoclopramide, prochlorperazine',
      'Laxatives — bulk-forming, stimulant (bisacodyl, senna), osmotic (lactulose)',
      'Antidiarrhoeals — loperamide, oral rehydration salts',
      'H. pylori eradication — triple therapy regimens',
      'Inflammatory bowel disease — mesalazine, sulfasalazine, corticosteroids',
      'Antitussives & mucolytics — codeine, dextromethorphan, acetylcysteine',
    ],
  },
  {
    id: 'pharm-new-chemo-anti',
    title: 'Chemotherapy & Antimicrobials',
    mappedUnits: ['pharm-chemo', 'pharm-anti'],
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
      'Antiseptics & disinfectants — alcohol, chlorhexidine, iodine',
      'Principles of chemotherapy — cell-cycle specificity, combination rationale',
    ],
  },
];

// ---------------- OLD-curriculum Pharmacology units (real cleaned past papers) ----------------
const PHARMACOLOGY_OLD_UNITS: ExamUnitSpec[] = [
  {
    id: 'pharm-gen-principles',
    title: 'General Principles of Pharmacology',
    year: 3,
    trimester: 1,
    mappedUnits: ['pharm-intro', 'pharm-gen', 'pharm-pk', 'pharm-pd'],
    structure: oldStructure(30, 3, 3),
    topics: [
      'Loading dose, clearance, half-life (first-order kinetics, ~93% after 4 half-lives)',
      'Grapefruit juice — CYP3A4 inhibition',
      'Volume of distribution & plasma protein binding',
      'First-pass metabolism & bioavailability (rectal route)',
      'Weak acids in stomach / weak bases in intestine — absorption',
      'Prodrugs — enalapril, dipivefrine, mercaptopurine',
      'CYP450 induction & inhibition — rifampicin, phenytoin, ketoconazole, cimetidine',
      'Redistribution — thiopentone; acetylation — isoniazid, sulphonamide',
      'Bioavailability, drug elimination, drug interactions',
    ],
    source: 'real',
  },
  {
    id: 'pharm-autonomic',
    title: 'Autonomic Pharmacology',
    year: 3,
    trimester: 1,
    mappedUnits: ['pharm-auto'],
    structure: oldStructure(60, 2, 2),
    topics: [
      'Cholinergic agonists — bethanechol, pilocarpine',
      'Cholinesterase inhibitors — neostigmine, pyridostigmine, physostigmine',
      'Myasthenia gravis — edrophonium test, pyridostigmine maintenance',
      'Anticholinergics — atropine, tolterodine; organophosphate poisoning',
      'Adrenergic agonists — epinephrine, norepinephrine, phenylephrine',
      'Beta-blockers — metoprolol vs propranolol; alpha-blockers — prazosin',
      'Alpha2-agonists — clonidine, methyldopa',
      'Neuromuscular blockers — succinylcholine; malignant hyperthermia (dantrolene)',
      'Adrenergic receptor distribution — beta1 heart, beta2 bronchi',
    ],
    source: 'real',
  },
  {
    id: 'pharm-autacoids',
    title: 'Autacoids',
    year: 3,
    trimester: 2,
    mappedUnits: ['pharm-endo'],
    structure: oldStructure(60, 4, 3),
    topics: [
      'Autacoids vs hormones — local action',
      'Histamine — H1/H2/H3 receptors; H1 agonists',
      'H1 antihistamines — first vs second generation, cardiotoxicity (terfenadine/astemizole)',
      '5-Hydroxytryptamine — 5-HT3 (emesis), 5-HT1 (migraine)',
      'Migraine prophylaxis — methysergide, propranolol, amitriptyline',
      'Ergot alkaloids — ergotamine, DHE; ergotism',
      'Eicosanoids — prostaglandins, leukotrienes, NSAIDs',
    ],
    source: 'real',
  },
  {
    id: 'pharm-cns',
    title: 'Central Nervous System Pharmacology',
    year: 3,
    trimester: 2,
    mappedUnits: ['pharm-cns'],
    structure: oldStructure(20, 7, 3),
    topics: [
      'Benzodiazepines — GABA-A potentiation, flumazenil, withdrawal management',
      'Antipsychotics — typical vs atypical, EPS, metabolic effects',
      'Antidepressants — SSRIs, TCAs, MAOIs',
      'Mood stabilisers — lithium, valproate (neural tube defects)',
      'Antiepileptics — phenytoin, valproate, ethosuximide, seizure types',
      'Opioids — heroin, methadone, meperidine; dependence',
      'Parkinson disease — levodopa, dopa decarboxylase inhibitors',
      'Alcohol — withdrawal (benzodiazepines), Wernicke (thiamine), methanol poisoning',
      'Migraine — triptans, triggers; status epilepticus management',
      'Anxiety & panic — alprazolam; OCD — clomipramine',
    ],
    source: 'real',
  },
  {
    id: 'pharm-cardiovascular',
    title: 'Cardiovascular Pharmacology',
    year: 3,
    trimester: 3,
    mappedUnits: ['pharm-cv'],
    structure: oldStructure(30, 7, 2),
    topics: [
      'Antihypertensives — ACEIs, ARBs, CCBs, beta-blockers, diuretics',
      'ACE inhibitors — cough, contraindications (pregnancy, renal artery stenosis)',
      'Calcium channel blockers — verapamil, nifedipine; reflex tachycardia',
      'Beta-blockers — cardioselective vs non-selective',
      'Diuretics — loop, thiazide, K-sparing; adverse effects',
      'Cardiac glycosides — digoxin; toxicity, TDM',
      'Antiarrhythmics — Vaughan Williams classes',
      'Antianginals — nitrates, beta-blockers, CCBs',
      'Anticoagulants — warfarin, heparin, LMWH; reversal',
      'Lipid-lowering — statins, fibrates; heart failure therapy',
    ],
    source: 'real',
  },
  {
    id: 'pharm-endocrine-resp',
    title: 'Endocrine & Respiratory Pharmacology',
    mappedUnits: ['pharm-endo', 'pharm-resp'],
    structure: oldStructure(20, 7, 3),
    topics: [
      'Bronchodilators — beta2-agonists, ipratropium, theophylline',
      'Inhaled corticosteroids — budesonide, fluticasone; LABA/ICS combinations',
      'Mast cell stabilisers — cromoglycate; leukotriene antagonists — montelukast',
      'Thyroid hormones & antithyroid drugs — carbimazole, propylthiouracil',
      'Insulin preparations & regimens',
      'Oral hypoglycaemics — metformin, sulfonylureas',
      'Corticosteroids — anti-inflammatory, immunosuppressive uses',
      'Antiemetics — ondansetron, metoclopramide',
    ],
    source: 'real',
  },
  {
    id: 'pharm-gi',
    title: 'Gastrointestinal Pharmacology',
    year: 4,
    trimester: 1,
    mappedUnits: ['pharm-gi'],
    structure: oldStructure(60, 5, 2),
    topics: [
      'Antacids — aluminium/magnesium, drug interactions',
      'H2 receptor antagonists — cimetidine, ranitidine, famotidine',
      'Proton pump inhibitors — omeprazole, esomeprazole',
      'H. pylori eradication — triple therapy',
      'Antiemetics — ondansetron, metoclopramide, prochlorperazine',
      'Laxatives — bulk, stimulant (bisacodyl, senna), osmotic (lactulose)',
      'Antidiarrhoeals — loperamide, ORS, zinc',
      'IBD — mesalazine, sulfasalazine; antispasmodics',
    ],
    source: 'real',
  },
  {
    id: 'pharm-chemo-agents',
    title: 'Chemotherapeutic Agents',
    year: 4,
    trimester: 1,
    mappedUnits: ['pharm-chemo'],
    structure: oldStructure(30, 8, 2),
    topics: [
      'Antibacterial mechanisms — cell wall, protein synthesis inhibitors',
      'Beta-lactams — penicillins, cephalosporins, carbapenems',
      'Macrolides — erythromycin, azithromycin; CYP3A4 inhibition',
      'Tetracyclines — doxycycline; photosensitivity',
      'Aminoglycosides — gentamicin; ototoxicity, nephrotoxicity',
      'Fluoroquinolones — ciprofloxacin; tendon toxicity',
      'Antifungals — azoles, polyenes, echinocandins',
      'Antivirals — acyclovir, oseltamivir',
      'Antimalarials — chloroquine, artemisinin combinations',
      'Antimicrobial resistance — MRSA, ESBL, stewardship',
    ],
    source: 'real',
  },
  {
    id: 'pharm-chemo-infections',
    title: 'Chemotherapy of Infections',
    year: 4,
    trimester: 2,
    mappedUnits: ['pharm-anti'],
    structure: oldStructure(60, 1, 2),
    topics: [
      'Co-trimoxazole preventive therapy in HIV — CPT',
      'Cryptococcal meningitis — amphotericin B administration & monitoring',
      'ART adherence assessment — indirect methods',
      'HBV recurrence prevention after liver transplantation',
      'HCV therapy goals',
      'Pelvic inflammatory disease — presumptive diagnosis & treatment',
      'Pneumocystis pneumonia — diagnosis, treatment, alternatives',
      'Gonococcal urethritis — treatment, pregnancy contraindications',
      'Cryptosporidiosis & isosporiasis in HIV',
      'Post-exposure prophylaxis (PEP) — 72-hour window',
    ],
    source: 'real',
  },
  {
    id: 'pharm-anticancer-derm-ocular',
    title: 'Anticancer, Dermatological & Ocular Drugs',
    year: 5,
    trimester: 1,
    mappedUnits: ['pharm-onc', 'pharm-derm', 'pharm-ophth'],
    structure: oldStructure(30, 5, 2),
    topics: [
      'Cytotoxic chemotherapy — alkylating agents, antimetabolites, plant alkaloids',
      'Anticancer drug toxicity — cisplatin (ototoxicity, nephrotoxicity), doxorubicin (cardiotoxicity)',
      'Immunosuppressants — cyclosporine, tacrolimus, mycophenolate',
      'Topical corticosteroids & antifungal agents in dermatology',
      'Glaucoma therapy — timolol, latanoprost; ocular adverse effects',
      'Retinoids & acne therapy',
      'Hormonal anticancer agents — tamoxifen, aromatase inhibitors',
    ],
    source: 'real',
  },
  {
    id: 'pharm-vitamins-hormones',
    title: 'Vitamins, Hormones & Endocrine Pharmacology',
    year: 5,
    trimester: 1,
    mappedUnits: ['pharm-endo', 'pharm-vit'],
    structure: oldStructure(30, 6, 2),
    topics: [
      'Vitamins — water-soluble (B complex, C) and fat-soluble (A, D, E, K)',
      'Vitamin deficiency states & supplementation',
      'Bone pharmacology — calcium, vitamin D, bisphosphonates',
      'Thyroid hormones & antithyroid drugs',
      'Insulin & oral hypoglycaemics',
      'Corticosteroids — therapeutic uses, adverse effects',
      'Sex hormones & hormonal contraceptives',
    ],
    source: 'real',
  },
  {
    id: 'pharm-toxicology',
    title: 'Toxicology & Drug Discovery',
    year: 5,
    trimester: 3,
    mappedUnits: ['pharm-tox'],
    structure: oldStructure(30, 7, 3),
    topics: [
      'Heavy metal poisoning — lead, mercury, arsenic; chelation (BAL, EDTA, DMSA)',
      'Paracetamol poisoning — NAPQI, glutathione, N-acetylcysteine',
      'Organophosphate poisoning — cholinergic crisis, atropine + pralidoxime',
      'Cyanide poisoning — sodium nitrite, thiosulfate, hydroxocobalamin',
      'Iron poisoning — desferrioxamine',
      'Alcohol toxicity — methanol, ethylene glycol; fomepizole, ethanol',
      'Drug overdose — ABCDE approach, activated charcoal, antidotes',
      'Toxicokinetics — LD50, therapeutic index, safety margin',
      'Adverse drug reactions — classification, pharmacovigilance',
      'Drug discovery pipeline & clinical trial phases (I–IV)',
    ],
    source: 'real',
  },
  {
    id: 'pharm-veterinary',
    title: 'Veterinary Pharmacology',
    year: 5,
    trimester: 2,
    mappedUnits: ['pharm-vet'],
    structure: oldStructure(30, 6, 2),
    topics: [
      'Principles of veterinary pharmacology — species differences in drug handling',
      'Classes of veterinary medicines — antibiotics, anthelmintics, ectoparasiticides',
      'Mechanisms of veterinary drug action',
      'Therapeutic applications in companion & food animals',
      'Adverse effects & withdrawal periods',
      'Medicine safety — residues in food-producing animals',
      'Regulatory considerations for veterinary medicines',
    ],
    source: 'real',
  },
];

// ====================================================================
// MODULE REGISTRY — both modules, each with curriculum tracks
// ====================================================================

// User-facing track metadata (old vs new syllabus)
export const EXAM_TRACKS: Record<ExamTrackId, { title: string; shortLabel: string; badge: string }> = {
  traditional: {
    title: 'Traditional Curriculum',
    shortLabel: 'Traditional',
    badge: 'Pre-revision syllabus',
  },
  revised: {
    title: 'Revised Curriculum',
    shortLabel: 'Revised',
    badge: 'Current syllabus',
  },
};

export const EXAM_PREP_MODULES: ExamModuleSpec[] = [
  {
    id: 'clinical-pharmacy-exam',
    title: 'Clinical Pharmacy',
    description:
      'Practice papers modelled on the real clinical-pharmacy exam pattern. First choose your curriculum track — Traditional (pre-revision syllabus) or Revised (current syllabus) — then practise the papers for that track.',
    units: CLINICAL_PHARMACY_UNITS,
    tracks: [
      {
        id: 'traditional',
        title: EXAM_TRACKS.traditional.title,
        shortLabel: EXAM_TRACKS.traditional.shortLabel,
        badge: EXAM_TRACKS.traditional.badge,
        description:
          'Practice papers built on the pre-revision Clinical Pharmacy I–XI unit structure — kept for learners still studying the old curriculum.',
        units: CLINICAL_PHARMACY_UNITS.filter((u) => u.id.startsWith('exam-')),
      },
      {
        id: 'revised',
        title: EXAM_TRACKS.revised.title,
        shortLabel: EXAM_TRACKS.revised.shortLabel,
        badge: EXAM_TRACKS.revised.badge,
        description:
          'Practice papers for the current syllabus in the standard format — Section A 30 MCQs · B 40 marks · C 30 marks (100 total) — across the integrated new-curriculum units.',
        units: CLINICAL_PHARMACY_UNITS.filter((u) => u.id.startsWith('cp-new-')),
      },
    ],
  },
  {
    id: 'pharmacology-exam',
    title: 'Pharmacology',
    description:
      'Practice papers covering systematic pharmacology from general principles through chemotherapy and toxicology. First choose your curriculum track — Traditional (Pharmacology I–XIV past papers) or Revised (current-syllabus mock papers).',
    units: [...PHARMACOLOGY_NEW_UNITS, ...PHARMACOLOGY_OLD_UNITS],
    tracks: [
      {
        id: 'traditional',
        title: EXAM_TRACKS.traditional.title,
        shortLabel: EXAM_TRACKS.traditional.shortLabel,
        badge: EXAM_TRACKS.traditional.badge,
        description:
          'Verbatim cleaned past papers from the pre-revision syllabus — the classic Pharmacology I–XIV units — kept for learners still studying the old curriculum.',
        units: PHARMACOLOGY_OLD_UNITS,
      },
      {
        id: 'revised',
        title: EXAM_TRACKS.revised.title,
        shortLabel: EXAM_TRACKS.revised.shortLabel,
        badge: EXAM_TRACKS.revised.badge,
        description:
          'Practice papers for the current syllabus in the standard format — Section A 30 MCQs · B 40 marks · C 30 marks (100 total) — across the integrated new-curriculum units.',
        units: PHARMACOLOGY_NEW_UNITS,
      },
    ],
  },
];

// Track helpers
export function getModuleTracks(mod: ExamModuleSpec): ExamTrackSpec[] {
  return mod.tracks;
}

export function getTrackById(mod: ExamModuleSpec, trackId: string): ExamTrackSpec | undefined {
  return mod.tracks.find((t) => t.id === trackId);
}

export function getTrackUnits(mod: ExamModuleSpec, trackId: string): ExamUnitSpec[] {
  return getTrackById(mod, trackId)?.units ?? [];
}

export function findUnitTrack(mod: ExamModuleSpec, unitId: string): ExamTrackSpec | undefined {
  return mod.tracks.find((t) => t.units.some((u) => u.id === unitId));
}

// Flat list for direct access (backwards-compatible)
export const EXAM_PREP_UNITS: ExamUnitSpec[] = [
  ...CLINICAL_PHARMACY_UNITS,
  ...PHARMACOLOGY_NEW_UNITS,
  ...PHARMACOLOGY_OLD_UNITS,
];

export function getExamPrepUnit(id: string): ExamUnitSpec | undefined {
  return EXAM_PREP_UNITS.find((u) => u.id === id);
}

export function getExamPrepModule(id: string): ExamModuleSpec | undefined {
  return EXAM_PREP_MODULES.find((m) => m.id === id);
}
