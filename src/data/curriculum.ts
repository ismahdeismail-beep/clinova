// ================================================================
// Clinova Curriculum — Single Source of Truth
// ----------------------------------------------------------------
// Every educational resource (clinical cases, flashcards, MCQs,
// oral practice, notes, drug/guideline monographs) is anchored to
// this hierarchy:
//
//   Learning Area  ->  Unit  ->  Learning Objective
//                                    |
//                                    +-> Disease
//                                    +-> Drug Class / Medicine
//                                    +-> Clinical Case
//
// Stable string IDs below are the ONLY keys used to connect
// resources. The Education Hub, Clinical Cases, Knowledge Graph,
// and AI Skills all read from here so nothing is duplicated.
// ================================================================

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface LearningObjective {
  /** Stable ID, namespaced by unit, e.g. 'lo-pharm-cv-htn-management' */
  id: string;
  unitId: string;
  statement: string;
  difficulty?: Difficulty;
}

export interface Disease {
  /** Stable slug, e.g. 'heart_failure' */
  id: string;
  name: string;
  aliases?: string[];
}

export interface CurriculumUnit {
  /** Matches the Education Hub unit id (e.g. 'pharm-cv', 'cp-cv') */
  id: string;
  areaId: string;
  /** Human subject label, e.g. 'Cardiovascular Pharmacology' */
  subject: string;
  title: string;
  description: string;
  estimatedHours: number;
  learningObjectives: LearningObjective[];
  diseaseIds: string[];
}

export interface CurriculumArea {
  /** Matches the Education Hub module id (e.g. 'pharmacology') */
  id: string;
  title: string;
  description: string;
  units: CurriculumUnit[];
}

// ================================================================
// Diseases — canonical registry
// ================================================================

export const DISEASES: Record<string, Disease> = {
  // Cardiovascular
  hypertension: { id: 'hypertension', name: 'Hypertension' },
  heart_failure: { id: 'heart_failure', name: 'Heart Failure' },
  acute_coronary_syndrome: { id: 'acute_coronary_syndrome', name: 'Acute Coronary Syndrome' },
  angina: { id: 'angina', name: 'Stable Angina' },
  myocardial_infarction: { id: 'myocardial_infarction', name: 'Myocardial Infarction' },
  atrial_fibrillation: { id: 'atrial_fibrillation', name: 'Atrial Fibrillation' },
  dvt: { id: 'dvt', name: 'Deep Vein Thrombosis' },
  pulmonary_embolism: { id: 'pulmonary_embolism', name: 'Pulmonary Embolism' },
  hyperlipidaemia: { id: 'hyperlipidaemia', name: 'Hyperlipidaemia' },
  stroke: { id: 'stroke', name: 'Stroke' },
  // Respiratory
  asthma: { id: 'asthma', name: 'Asthma' },
  copd: { id: 'copd', name: 'COPD' },
  tuberculosis: { id: 'tuberculosis', name: 'Tuberculosis' },
  community_acquired_pneumonia: { id: 'community_acquired_pneumonia', name: 'Community Acquired Pneumonia' },
  childhood_pneumonia: { id: 'childhood_pneumonia', name: 'Childhood Pneumonia' },
  allergic_rhinitis: { id: 'allergic_rhinitis', name: 'Allergic Rhinitis' },
  bronchiectasis: { id: 'bronchiectasis', name: 'Bronchiectasis' },
  // Gastrointestinal
  peptic_ulcer_disease: { id: 'peptic_ulcer_disease', name: 'Peptic Ulcer Disease' },
  gerd: { id: 'gerd', name: 'GERD' },
  h_pylori: { id: 'h_pylori', name: 'Helicobacter pylori Infection' },
  liver_cirrhosis: { id: 'liver_cirrhosis', name: 'Liver Cirrhosis' },
  hepatitis: { id: 'hepatitis', name: 'Hepatitis' },
  pancreatitis: { id: 'pancreatitis', name: 'Pancreatitis' },
  ibs: { id: 'ibs', name: 'Irritable Bowel Syndrome' },
  ibd: { id: 'ibd', name: 'Inflammatory Bowel Disease' },
  // Endocrine
  type_1_diabetes: { id: 'type_1_diabetes', name: 'Type 1 Diabetes' },
  type_2_diabetes: { id: 'type_2_diabetes', name: 'Type 2 Diabetes' },
  diabetic_ketoacidosis: { id: 'diabetic_ketoacidosis', name: 'Diabetic Ketoacidosis' },
  hhs: { id: 'hhs', name: 'Hyperosmolar Hyperglycaemic State' },
  hypothyroidism: { id: 'hypothyroidism', name: 'Hypothyroidism' },
  hyperthyroidism: { id: 'hyperthyroidism', name: 'Hyperthyroidism' },
  osteoporosis: { id: 'osteoporosis', name: 'Osteoporosis' },
  adrenal_insufficiency: { id: 'adrenal_insufficiency', name: 'Adrenal Insufficiency' },
  cushing: { id: 'cushing', name: 'Cushing Syndrome' },
  menopause: { id: 'menopause', name: 'Menopause' },
  // Vitamins / Nutrition
  iron_deficiency_anemia: { id: 'iron_deficiency_anemia', name: 'Iron Deficiency Anaemia' },
  vitamin_d_deficiency: { id: 'vitamin_d_deficiency', name: 'Vitamin D Deficiency' },
  vitamin_b12_deficiency: { id: 'vitamin_b12_deficiency', name: 'Vitamin B12 Deficiency' },
  // CNS
  epilepsy: { id: 'epilepsy', name: 'Epilepsy' },
  parkinson: { id: 'parkinson', name: 'Parkinson Disease' },
  alzheimer: { id: 'alzheimer', name: 'Alzheimer Disease' },
  migraine: { id: 'migraine', name: 'Migraine' },
  depression: { id: 'depression', name: 'Depression' },
  anxiety: { id: 'anxiety', name: 'Anxiety Disorders' },
  bipolar: { id: 'bipolar', name: 'Bipolar Disorder' },
  schizophrenia: { id: 'schizophrenia', name: 'Schizophrenia' },
  neuropathic_pain: { id: 'neuropathic_pain', name: 'Neuropathic Pain' },
  insomnia: { id: 'insomnia', name: 'Insomnia' },
  // Pain & Inflammation
  acute_pain: { id: 'acute_pain', name: 'Acute Pain' },
  chronic_pain: { id: 'chronic_pain', name: 'Chronic Pain' },
  rheumatoid_arthritis: { id: 'rheumatoid_arthritis', name: 'Rheumatoid Arthritis' },
  osteoarthritis: { id: 'osteoarthritis', name: 'Osteoarthritis' },
  gout: { id: 'gout', name: 'Gout' },
  fever: { id: 'fever', name: 'Fever' },
  // Antimicrobial / Infection
  malaria: { id: 'malaria', name: 'Malaria' },
  hiv: { id: 'hiv', name: 'HIV/AIDS' },
  uti: { id: 'uti', name: 'Urinary Tract Infection' },
  meningitis: { id: 'meningitis', name: 'Meningitis' },
  sepsis: { id: 'sepsis', name: 'Sepsis' },
  gonorrhoea: { id: 'gonorrhoea', name: 'Gonorrhoea' },
  syphilis: { id: 'syphilis', name: 'Syphilis' },
  cellulitis: { id: 'cellulitis', name: 'Cellulitis' },
  typhoid: { id: 'typhoid', name: 'Typhoid Fever' },
  // Oncology / Hematology
  breast_cancer: { id: 'breast_cancer', name: 'Breast Cancer' },
  cervical_cancer: { id: 'cervical_cancer', name: 'Cervical Cancer' },
  prostate_cancer: { id: 'prostate_cancer', name: 'Prostate Cancer' },
  lung_cancer: { id: 'lung_cancer', name: 'Lung Cancer' },
  colorectal_cancer: { id: 'colorectal_cancer', name: 'Colorectal Cancer' },
  leukemia: { id: 'leukemia', name: 'Leukemia' },
  lymphoma: { id: 'lymphoma', name: 'Lymphoma' },
  chemo_toxicity: { id: 'chemo_toxicity', name: 'Chemotherapy Toxicity' },
  febrile_neutropenia: { id: 'febrile_neutropenia', name: 'Febrile Neutropenia' },
  sickle_cell: { id: 'sickle_cell', name: 'Sickle Cell Disease' },
  hemophilia: { id: 'hemophilia', name: 'Hemophilia' },
  dic: { id: 'dic', name: 'Disseminated Intravascular Coagulation' },
  // Renal
  aki: { id: 'aki', name: 'Acute Kidney Injury' },
  ckd: { id: 'ckd', name: 'Chronic Kidney Disease' },
  hyperkalaemia: { id: 'hyperkalaemia', name: 'Hyperkalaemia' },
  hyponatraemia: { id: 'hyponatraemia', name: 'Hyponatraemia' },
  oedema: { id: 'oedema', name: 'Oedema' },
  resistant_hypertension: { id: 'resistant_hypertension', name: 'Resistant Hypertension' },
  nephrotic_syndrome: { id: 'nephrotic_syndrome', name: 'Nephrotic Syndrome' },
  // Dermatology
  acne: { id: 'acne', name: 'Acne' },
  psoriasis: { id: 'psoriasis', name: 'Psoriasis' },
  eczema: { id: 'eczema', name: 'Eczema' },
  contact_dermatitis: { id: 'contact_dermatitis', name: 'Contact Dermatitis' },
  fungal_skin: { id: 'fungal_skin', name: 'Fungal Skin Infections' },
  urticaria: { id: 'urticaria', name: 'Urticaria' },
  scabies: { id: 'scabies', name: 'Scabies' },
  // Ophthalmology
  glaucoma: { id: 'glaucoma', name: 'Glaucoma' },
  conjunctivitis: { id: 'conjunctivitis', name: 'Conjunctivitis' },
  cataracts: { id: 'cataracts', name: 'Cataracts' },
  dry_eye: { id: 'dry_eye', name: 'Dry Eye Disease' },
  uveitis: { id: 'uveitis', name: 'Uveitis' },
  // Toxicology
  organophosphate: { id: 'organophosphate', name: 'Organophosphate Poisoning' },
  paracetamol_overdose: { id: 'paracetamol_overdose', name: 'Paracetamol Overdose' },
  opioid_overdose: { id: 'opioid_overdose', name: 'Opioid Overdose' },
  snake_bite: { id: 'snake_bite', name: 'Snake Bite' },
  carbon_monoxide: { id: 'carbon_monoxide', name: 'Carbon Monoxide Poisoning' },
  alcohol_poisoning: { id: 'alcohol_poisoning', name: 'Alcohol Poisoning' },
  heavy_metal: { id: 'heavy_metal', name: 'Heavy Metal Poisoning' },
  // Clinical Pharmacy / General
  adr: { id: 'adr', name: 'Adverse Drug Reaction' },
  drug_overdose: { id: 'drug_overdose', name: 'Drug Overdose' },
  drug_poisoning: { id: 'drug_poisoning', name: 'Drug Poisoning' },
  medication_error: { id: 'medication_error', name: 'Medication Error' },
  polypharmacy: { id: 'polypharmacy', name: 'Polypharmacy' },
  drug_interaction: { id: 'drug_interaction', name: 'Drug Interaction' },
  dose_adjustment: { id: 'dose_adjustment', name: 'Dose Adjustment' },
  tdm: { id: 'tdm', name: 'Therapeutic Drug Monitoring' },
  nonadherence: { id: 'nonadherence', name: 'Medication Non-adherence' },
  special_pop_dosing: { id: 'special_pop_dosing', name: 'Special Population Dosing' },
  // Autonomic
  bph: { id: 'bph', name: 'Benign Prostatic Hyperplasia' },
  anaphylaxis: { id: 'anaphylaxis', name: 'Anaphylaxis' },
  shock: { id: 'shock', name: 'Shock' },
  bradycardia: { id: 'bradycardia', name: 'Bradycardia' },
  tachyarrhythmia: { id: 'tachyarrhythmia', name: 'Tachyarrhythmias' },
  motion_sickness: { id: 'motion_sickness', name: 'Motion Sickness' },
  // Obstetrics & Gynecology
  preeclampsia: { id: 'preeclampsia', name: 'Preeclampsia' },
  eclampsia: { id: 'eclampsia', name: 'Eclampsia' },
  gestational_diabetes: { id: 'gestational_diabetes', name: 'Gestational Diabetes' },
  postpartum_hemorrhage: { id: 'postpartum_hemorrhage', name: 'Postpartum Hemorrhage' },
  // Pediatrics / Emergency
  neonatal_sepsis: { id: 'neonatal_sepsis', name: 'Neonatal Sepsis' },
  childhood_diarrhea: { id: 'childhood_diarrhea', name: 'Acute Diarrhea' },
  pediatric_malaria: { id: 'pediatric_malaria', name: 'Pediatric Malaria' },
  status_epilepticus: { id: 'status_epilepticus', name: 'Status Epilepticus' },
  septic_shock: { id: 'septic_shock', name: 'Septic Shock' },
  cardiac_arrest: { id: 'cardiac_arrest', name: 'Cardiac Arrest' },
  infective_endocarditis: { id: 'infective_endocarditis', name: 'Infective Endocarditis' },
};

// ================================================================
// Curriculum — areas -> units -> learning objectives
// ================================================================

export const CURRICULUM: CurriculumArea[] = [
  {
    id: 'pharmacology',
    title: 'Pharmacology',
    description: 'Drug mechanisms, kinetics, dynamics, and toxicology.',
    units: [
      {
        id: 'pharm-intro', areaId: 'pharmacology', subject: 'General Pharmacology',
        title: 'Introduction to Pharmacology', description: 'Basic principles of drug action and discovery.', estimatedHours: 4,
        diseaseIds: [],
        learningObjectives: [
          { id: 'lo-pharm-intro-definitions', unitId: 'pharm-intro', statement: 'Define pharmacology, pharmacotherapeutics, and clinical pharmacy.' },
          { id: 'lo-pharm-intro-naming', unitId: 'pharm-intro', statement: 'Describe drug nomenclature (chemical, generic, brand).' },
        ],
      },
      {
        id: 'pharm-gen', areaId: 'pharmacology', subject: 'General Pharmacology',
        title: 'General Pharmacology', description: 'Receptors, dose-response, and signaling pathways.', estimatedHours: 8,
        diseaseIds: ['adr', 'drug_interaction', 'tdm'],
        learningObjectives: [
          { id: 'lo-pharm-gen-receptors', unitId: 'pharm-gen', statement: 'Explain receptor theory and agonism/antagonism.' },
          { id: 'lo-pharm-gen-doserresponse', unitId: 'pharm-gen', statement: 'Interpret dose-response curves and potency vs efficacy.' },
          { id: 'lo-pharm-gen-interactions', unitId: 'pharm-gen', statement: 'Classify drug-drug interactions and adverse drug reactions.' },
        ],
      },
      {
        id: 'pharm-pk', areaId: 'pharmacology', subject: 'General Pharmacology',
        title: 'Pharmacokinetics', description: 'Absorption, Distribution, Metabolism, and Excretion (ADME).', estimatedHours: 12,
        diseaseIds: ['dose_adjustment', 'tdm', 'ckd', 'aki'],
        learningObjectives: [
          { id: 'lo-pharm-pk-adme', unitId: 'pharm-pk', statement: 'Describe the four phases of pharmacokinetics (ADME).' },
          { id: 'lo-pharm-pk-clearance', unitId: 'pharm-pk', statement: 'Calculate clearance, half-life, and relate to dosing interval.' },
          { id: 'lo-pharm-pk-renal', unitId: 'pharm-pk', statement: 'Apply Cockcroft-Gault CrCl to renally-adjusted dosing.' },
        ],
      },
      {
        id: 'pharm-pd', areaId: 'pharmacology', subject: 'General Pharmacology',
        title: 'Pharmacodynamics', description: 'Drug-receptor interactions and mechanisms of effect.', estimatedHours: 10,
        diseaseIds: [],
        learningObjectives: [
          { id: 'lo-pharm-pd-mechanisms', unitId: 'pharm-pd', statement: 'Relate drug concentration to effect via receptor occupancy.' },
          { id: 'lo-pharm-pd-tolerance', unitId: 'pharm-pd', statement: 'Explain tolerance, sensitization, and receptor upregulation/downregulation.' },
        ],
      },
      {
        id: 'pharm-auto', areaId: 'pharmacology', subject: 'Autonomic Pharmacology',
        title: 'Autonomic Pharmacology', description: 'Sympathetic and parasympathetic nervous system drugs.', estimatedHours: 14,
        diseaseIds: ['hypertension', 'asthma', 'bph', 'glaucoma', 'anaphylaxis', 'organophosphate', 'shock', 'bradycardia', 'tachyarrhythmia', 'motion_sickness'],
        learningObjectives: [
          { id: 'lo-pharm-auto-divisions', unitId: 'pharm-auto', statement: 'Contrast sympathetic and parasympathetic effector responses.' },
          { id: 'lo-pharm-auto-agents', unitId: 'pharm-auto', statement: 'Identify adrenergic, cholinergic, and antimuscarinic agents and uses.' },
        ],
      },
      {
        id: 'pharm-cv', areaId: 'pharmacology', subject: 'Cardiovascular Pharmacology',
        title: 'Cardiovascular Pharmacology', description: 'Anti-hypertensives, antiarrhythmics, and heart failure drugs.', estimatedHours: 18,
        diseaseIds: ['hypertension', 'heart_failure', 'atrial_fibrillation', 'angina', 'myocardial_infarction', 'hyperlipidaemia', 'stroke', 'resistant_hypertension'],
        learningObjectives: [
          { id: 'lo-pharm-cv-htn', unitId: 'pharm-cv', statement: 'Compare antihypertensive classes and select by comorbidity.' },
          { id: 'lo-pharm-cv-hf', unitId: 'pharm-cv', statement: 'Describe guideline-directed medical therapy for heart failure with reduced ejection fraction.' },
          { id: 'lo-pharm-cv-anticoag', unitId: 'pharm-cv', statement: 'Explain anticoagulant and antiplatelet use in stroke and atrial fibrillation.' },
          { id: 'lo-pharm-cv-lipids', unitId: 'pharm-cv', statement: 'Apply statin therapy and lipid targets in cardiovascular prevention.' },
        ],
      },
      {
        id: 'pharm-renal', areaId: 'pharmacology', subject: 'Renal Pharmacology',
        title: 'Renal Pharmacology', description: 'Diuretics and drugs affecting fluid/electrolyte balance.', estimatedHours: 10,
        diseaseIds: ['oedema', 'hypertension', 'ckd', 'hyperkalaemia', 'hyponatraemia', 'nephrotic_syndrome'],
        learningObjectives: [
          { id: 'lo-pharm-renal-diuretics', unitId: 'pharm-renal', statement: 'Classify diuretics by site of action and electrolyte effect.' },
          { id: 'lo-pharm-renal-electrolytes', unitId: 'pharm-renal', statement: 'Manage diuretic-induced electrolyte disturbances.' },
        ],
      },
      {
        id: 'pharm-resp', areaId: 'pharmacology', subject: 'Respiratory Pharmacology',
        title: 'Respiratory Pharmacology', description: 'Bronchodilators, anti-inflammatories, and asthma/COPD drugs.', estimatedHours: 12,
        diseaseIds: ['asthma', 'copd', 'allergic_rhinitis', 'pulmonary_embolism'],
        learningObjectives: [
          { id: 'lo-pharm-resp-asthma', unitId: 'pharm-resp', statement: 'Distinguish controller vs reliever therapy in asthma (GINA).' },
          { id: 'lo-pharm-resp-copd', unitId: 'pharm-resp', statement: 'Outline maintenance and exacerbation management of COPD.' },
        ],
      },
      {
        id: 'pharm-gi', areaId: 'pharmacology', subject: 'Gastrointestinal Pharmacology',
        title: 'Gastrointestinal Pharmacology', description: 'Antacids, antiemetics, laxatives, and prokinetics.', estimatedHours: 10,
        diseaseIds: ['peptic_ulcer_disease', 'gerd', 'h_pylori', 'liver_cirrhosis', 'ibd', 'ibs', 'pancreatitis'],
        learningObjectives: [
          { id: 'lo-pharm-gi-pud', unitId: 'pharm-gi', statement: 'Describe acid-suppression and H. pylori eradication regimens.' },
          { id: 'lo-pharm-gi-cirrhosis', unitId: 'pharm-gi', statement: 'Manage complications of liver cirrhosis pharmacologically.' },
        ],
      },
      {
        id: 'pharm-endo', areaId: 'pharmacology', subject: 'Endocrine Pharmacology',
        title: 'Endocrine Pharmacology', description: 'Insulin, oral hypoglycemics, thyroid drugs, and corticosteroids.', estimatedHours: 16,
        diseaseIds: ['type_1_diabetes', 'type_2_diabetes', 'diabetic_ketoacidosis', 'hhs', 'hypothyroidism', 'hyperthyroidism', 'osteoporosis', 'adrenal_insufficiency', 'cushing', 'menopause'],
        learningObjectives: [
          { id: 'lo-pharm-endo-insulin', unitId: 'pharm-endo', statement: 'Compare insulin types and individualize basal-bolus regimens.' },
          { id: 'lo-pharm-endo-ohg', unitId: 'pharm-endo', statement: 'Select oral hypoglycaemic agents by mechanism and renal function.' },
          { id: 'lo-pharm-endo-dka', unitId: 'pharm-endo', statement: 'Outline the management of diabetic ketoacidosis.' },
          { id: 'lo-pharm-endo-thyroid', unitId: 'pharm-endo', statement: 'Manage hypo- and hyperthyroidism with thyroid hormones and antithyroid drugs.' },
        ],
      },
      {
        id: 'pharm-vit', areaId: 'pharmacology', subject: 'Vitamins & Nutrition',
        title: 'Vitamins & Minerals', description: 'Therapeutic uses and deficiencies of essential nutrients.', estimatedHours: 6,
        diseaseIds: ['iron_deficiency_anemia', 'vitamin_d_deficiency', 'vitamin_b12_deficiency'],
        learningObjectives: [
          { id: 'lo-pharm-vit-deficiencies', unitId: 'pharm-vit', statement: 'Recognize deficiency states and replacement therapy for key vitamins/minerals.' },
        ],
      },
      {
        id: 'pharm-cns', areaId: 'pharmacology', subject: 'Central Nervous System Pharmacology',
        title: 'Central Nervous System Pharmacology', description: 'Antidepressants, antipsychotics, anxiolytics, and anesthetics.', estimatedHours: 20,
        diseaseIds: ['epilepsy', 'parkinson', 'alzheimer', 'migraine', 'depression', 'anxiety', 'bipolar', 'schizophrenia', 'neuropathic_pain', 'insomnia'],
        learningObjectives: [
          { id: 'lo-pharm-cns-depressants', unitId: 'pharm-cns', statement: 'Compare SSRI/SNRI/TCA/MAOI antidepressants and their safety.' },
          { id: 'lo-pharm-cns-antiepileptic', unitId: 'pharm-cns', statement: 'Select antiseizure medications by seizure type.' },
          { id: 'lo-pharm-cns-parkinson', unitId: 'pharm-cns', statement: 'Explain dopaminergic therapy in Parkinson disease.' },
        ],
      },
      {
        id: 'pharm-chemo', areaId: 'pharmacology', subject: 'Chemotherapy & Antimicrobial Pharmacology',
        title: 'Chemotherapy', description: 'Principles of antimicrobial and antineoplastic therapy.', estimatedHours: 8,
        diseaseIds: ['malaria', 'hiv', 'tuberculosis', 'uti', 'meningitis', 'sepsis', 'gonorrhoea', 'syphilis', 'cellulitis', 'typhoid'],
        learningObjectives: [
          { id: 'lo-pharm-chemo-principles', unitId: 'pharm-chemo', statement: 'State principles of rational antimicrobial use and stewardship.' },
          { id: 'lo-pharm-chemo-resistance', unitId: 'pharm-chemo', statement: 'Explain mechanisms of antimicrobial resistance.' },
        ],
      },
      {
        id: 'pharm-anti', areaId: 'pharmacology', subject: 'Chemotherapy & Antimicrobial Pharmacology',
        title: 'Antimicrobial Pharmacology', description: 'Antibiotics, antivirals, antifungals, and antiparasitics.', estimatedHours: 24,
        diseaseIds: ['malaria', 'hiv', 'tuberculosis', 'community_acquired_pneumonia', 'childhood_pneumonia', 'uti', 'meningitis', 'sepsis', 'gonorrhoea', 'syphilis', 'cellulitis', 'typhoid', 'fungal_skin'],
        learningObjectives: [
          { id: 'lo-pharm-anti-beta-lactam', unitId: 'pharm-anti', statement: 'Classify beta-lactams and their spectrum of activity.' },
          { id: 'lo-pharm-anti-meningitis', unitId: 'pharm-anti', statement: 'Select empiric meningitis therapy with CNS penetration.' },
          { id: 'lo-pharm-anti-tb', unitId: 'pharm-anti', statement: 'Describe first-line tuberculosis and HIV regimens.' },
        ],
      },
      {
        id: 'pharm-tox', areaId: 'pharmacology', subject: 'Toxicology',
        title: 'Toxicology', description: 'Principles of poisoning, antidotes, and environmental toxins.', estimatedHours: 12,
        diseaseIds: ['organophosphate', 'paracetamol_overdose', 'opioid_overdose', 'snake_bite', 'carbon_monoxide', 'alcohol_poisoning', 'heavy_metal', 'drug_overdose', 'drug_poisoning'],
        learningObjectives: [
          { id: 'lo-pharm-tox-antidotes', unitId: 'pharm-tox', statement: 'Match common poisonings to their specific antidotes.' },
          { id: 'lo-pharm-tox-paracetamol', unitId: 'pharm-tox', statement: 'Manage paracetamol overdose with N-acetylcysteine.' },
        ],
      },
      {
        id: 'pharm-onc', areaId: 'pharmacology', subject: 'Oncology',
        title: 'Oncology Pharmacology', description: 'Targeted therapies, immunotherapies, and traditional cytotoxics.', estimatedHours: 16,
        diseaseIds: ['breast_cancer', 'cervical_cancer', 'prostate_cancer', 'lung_cancer', 'colorectal_cancer', 'leukemia', 'lymphoma', 'chemo_toxicity', 'febrile_neutropenia'],
        learningObjectives: [
          { id: 'lo-pharm-onc-cytotoxic', unitId: 'pharm-onc', statement: 'Explain cell-cycle specificity and toxicity of major cytotoxics.' },
          { id: 'lo-pharm-onc-hormonal', unitId: 'pharm-onc', statement: 'Describe hormonal and targeted therapy in breast cancer.' },
        ],
      },
      {
        id: 'pharm-derm', areaId: 'pharmacology', subject: 'Dermatology',
        title: 'Dermatological Pharmacology', description: 'Topical agents, acne treatments, and immunosuppressants.', estimatedHours: 8,
        diseaseIds: ['acne', 'psoriasis', 'eczema', 'contact_dermatitis', 'fungal_skin', 'urticaria', 'scabies'],
        learningObjectives: [
          { id: 'lo-pharm-derm-acne', unitId: 'pharm-derm', statement: 'Outline topical and systemic acne therapy.' },
          { id: 'lo-pharm-derm-psoriasis', unitId: 'pharm-derm', statement: 'Describe psoriasis management including biologics.' },
        ],
      },
      {
        id: 'pharm-ophth', areaId: 'pharmacology', subject: 'Ophthalmology',
        title: 'Ophthalmic Pharmacology', description: 'Glaucoma drops, mydriatics, and ocular therapeutics.', estimatedHours: 6,
        diseaseIds: ['glaucoma', 'conjunctivitis', 'cataracts', 'dry_eye', 'uveitis'],
        learningObjectives: [
          { id: 'lo-pharm-ophth-glaucoma', unitId: 'pharm-ophth', statement: 'Classify antiglaucoma agents by mechanism.' },
        ],
      },
      {
        id: 'pharm-vet', areaId: 'pharmacology', subject: 'Veterinary Pharmacology',
        title: 'Veterinary Pharmacology', description: 'Cross-species pharmacology and animal therapeutics.', estimatedHours: 5,
        diseaseIds: [],
        learningObjectives: [
          { id: 'lo-pharm-vet-principles', unitId: 'pharm-vet', statement: 'Recognize key differences in veterinary pharmacokinetics.' },
        ],
      },
    ],
  },
  {
    id: 'clinical_pharm',
    title: 'Clinical Pharmacy & Therapeutics',
    description: 'Disease management, patient care, and rational prescribing.',
    units: [
      {
        id: 'cp-intro', areaId: 'clinical_pharm', subject: 'Clinical Pharmacy',
        title: 'Introduction to Clinical Pharmacy', description: 'Roles of the clinical pharmacist and pharmaceutical care.', estimatedHours: 5,
        diseaseIds: [],
        learningObjectives: [
          { id: 'lo-cp-intro-role', unitId: 'cp-intro', statement: 'Describe the role of the clinical pharmacist in the healthcare team.' },
        ],
      },
      {
        id: 'cp-cv', areaId: 'clinical_pharm', subject: 'Cardiovascular Disorders',
        title: 'Cardiovascular Disorders', description: 'Hypertension, heart failure, ischemic heart disease, and arrhythmias.', estimatedHours: 25,
        diseaseIds: ['hypertension', 'heart_failure', 'acute_coronary_syndrome', 'angina', 'myocardial_infarction', 'atrial_fibrillation', 'infective_endocarditis', 'stroke'],
        learningObjectives: [
          { id: 'lo-cp-cv-htn', unitId: 'cp-cv', statement: 'Develop a pharmaceutical care plan for hypertension.' },
          { id: 'lo-cp-cv-hf', unitId: 'cp-cv', statement: 'Identify drug therapy problems in heart failure.' },
          { id: 'lo-cp-cv-acs', unitId: 'cp-cv', statement: 'Outline acute coronary syndrome pharmacotherapy.' },
        ],
      },
      {
        id: 'cp-endo', areaId: 'clinical_pharm', subject: 'Endocrine Disorders',
        title: 'Endocrine Disorders', description: 'Diabetes mellitus, thyroid disorders, and adrenal insufficiency.', estimatedHours: 18,
        diseaseIds: ['type_1_diabetes', 'type_2_diabetes', 'diabetic_ketoacidosis', 'hhs', 'hypothyroidism', 'hyperthyroidism', 'osteoporosis', 'adrenal_insufficiency', 'cushing', 'gestational_diabetes'],
        learningObjectives: [
          { id: 'lo-cp-endo-dm', unitId: 'cp-endo', statement: 'Construct a diabetes management and monitoring plan.' },
          { id: 'lo-cp-endo-dka', unitId: 'cp-endo', statement: 'Manage diabetic ketoacidosis and its precipitants.' },
        ],
      },
      {
        id: 'cp-resp', areaId: 'clinical_pharm', subject: 'Respiratory Disorders',
        title: 'Respiratory Disorders', description: 'Asthma, COPD, and allergic rhinitis.', estimatedHours: 15,
        diseaseIds: ['asthma', 'copd', 'tuberculosis', 'community_acquired_pneumonia', 'allergic_rhinitis', 'pulmonary_embolism', 'bronchiectasis'],
        learningObjectives: [
          { id: 'lo-cp-resp-asthma', unitId: 'cp-resp', statement: 'Counsel on inhaler technique and asthma action plans.' },
          { id: 'lo-cp-resp-copd', unitId: 'cp-resp', statement: 'Manage stable COPD and exacerbations.' },
        ],
      },
      {
        id: 'cp-gi', areaId: 'clinical_pharm', subject: 'Gastrointestinal Disorders',
        title: 'Gastrointestinal Disorders', description: 'PUD, GERD, IBD, and liver cirrhosis.', estimatedHours: 16,
        diseaseIds: ['peptic_ulcer_disease', 'gerd', 'h_pylori', 'liver_cirrhosis', 'hepatitis', 'pancreatitis', 'ibs', 'ibd'],
        learningObjectives: [
          { id: 'lo-cp-gi-pud', unitId: 'cp-gi', statement: 'Eradicate H. pylori and manage peptic ulcer disease.' },
          { id: 'lo-cp-gi-cirrhosis', unitId: 'cp-gi', statement: 'Prevent and treat complications of cirrhosis.' },
        ],
      },
      {
        id: 'cp-renal', areaId: 'clinical_pharm', subject: 'Renal Disorders',
        title: 'Renal Disorders', description: 'Acute kidney injury and chronic kidney disease.', estimatedHours: 14,
        diseaseIds: ['aki', 'ckd', 'hyperkalaemia', 'hyponatraemia', 'oedema', 'resistant_hypertension', 'nephrotic_syndrome'],
        learningObjectives: [
          { id: 'lo-cp-renal-aki', unitId: 'cp-renal', statement: 'Classify AKI and adjust drug regimens accordingly.' },
          { id: 'lo-cp-renal-ckd', unitId: 'cp-renal', statement: 'Apply CKD staging to dosing and monitoring.' },
        ],
      },
      {
        id: 'cp-neuro', areaId: 'clinical_pharm', subject: 'Neurological Disorders',
        title: "Neurological Disorders", description: "Epilepsy, Parkinson's, Alzheimer's, and pain management.", estimatedHours: 20,
        diseaseIds: ['epilepsy', 'parkinson', 'alzheimer', 'migraine', 'stroke', 'neuropathic_pain', 'insomnia'],
        learningObjectives: [
          { id: 'lo-cp-neuro-epilepsy', unitId: 'cp-neuro', statement: 'Individualize antiseizure therapy and counsel on adherence.' },
          { id: 'lo-cp-neuro-stroke', unitId: 'cp-neuro', statement: 'Apply acute stroke reperfusion and secondary prevention.' },
        ],
      },
      {
        id: 'cp-id', areaId: 'clinical_pharm', subject: 'Infectious Diseases',
        title: 'Infectious Diseases', description: 'Pneumonia, UTI, meningitis, HIV/AIDS, and tuberculosis.', estimatedHours: 30,
        diseaseIds: ['community_acquired_pneumonia', 'childhood_pneumonia', 'uti', 'meningitis', 'sepsis', 'hiv', 'tuberculosis', 'malaria', 'gonorrhoea', 'syphilis', 'cellulitis', 'typhoid'],
        learningObjectives: [
          { id: 'lo-cp-id-empiric', unitId: 'cp-id', statement: 'Select empiric antimicrobial therapy by syndrome and local resistance.' },
          { id: 'lo-cp-id-stewardship', unitId: 'cp-id', statement: 'Apply antimicrobial stewardship principles.' },
        ],
      },
      {
        id: 'cp-onc', areaId: 'clinical_pharm', subject: 'Oncology',
        title: 'Oncology', description: 'Breast cancer, lung cancer, leukemia, and supportive care.', estimatedHours: 22,
        diseaseIds: ['breast_cancer', 'cervical_cancer', 'prostate_cancer', 'lung_cancer', 'colorectal_cancer', 'leukemia', 'lymphoma', 'chemo_toxicity', 'febrile_neutropenia'],
        learningObjectives: [
          { id: 'lo-cp-onc-regimens', unitId: 'cp-onc', statement: 'Explain goals of therapy (curative vs palliative) in common cancers.' },
          { id: 'lo-cp-onc-toxicity', unitId: 'cp-onc', statement: 'Prevent and manage chemotherapy toxicity and febrile neutropenia.' },
        ],
      },
      {
        id: 'cp-hem', areaId: 'clinical_pharm', subject: 'Hematology',
        title: 'Hematology', description: 'Anemias, coagulopathies, and venous thromboembolism.', estimatedHours: 12,
        diseaseIds: ['iron_deficiency_anemia', 'sickle_cell', 'hemophilia', 'dvt', 'pulmonary_embolism', 'dic'],
        learningObjectives: [
          { id: 'lo-cp-hem-vte', unitId: 'cp-hem', statement: 'Compare anticoagulants for VTE treatment and prophylaxis.' },
          { id: 'lo-cp-hem-anemia', unitId: 'cp-hem', statement: 'Differentiate and manage major anemia types.' },
        ],
      },
      {
        id: 'cp-psych', areaId: 'clinical_pharm', subject: 'Psychiatry',
        title: 'Psychiatry', description: 'Depression, schizophrenia, bipolar disorder, and anxiety.', estimatedHours: 18,
        diseaseIds: ['depression', 'schizophrenia', 'bipolar', 'anxiety', 'insomnia'],
        learningObjectives: [
          { id: 'lo-cp-psych-depression', unitId: 'cp-psych', statement: 'Select and monitor antidepressant therapy safely.' },
          { id: 'lo-cp-psych-safety', unitId: 'cp-psych', statement: 'Assess and mitigate suicide risk in depressive disorders.' },
        ],
      },
      {
        id: 'cp-peds', areaId: 'clinical_pharm', subject: 'Pediatrics',
        title: 'Pediatrics', description: 'Neonatal intensive care, pediatric dosing, and immunizations.', estimatedHours: 15,
        diseaseIds: ['neonatal_sepsis', 'childhood_pneumonia', 'childhood_diarrhea', 'pediatric_malaria'],
        learningObjectives: [
          { id: 'lo-cp-peds-dosing', unitId: 'cp-peds', statement: 'Calculate weight-based pediatric dosing.' },
          { id: 'lo-cp-peds-pneumonia', unitId: 'cp-peds', statement: 'Manage severe childhood pneumonia per WHO protocols.' },
        ],
      },
      {
        id: 'cp-obgyn', areaId: 'clinical_pharm', subject: 'Obstetrics & Gynecology',
        title: 'Obstetrics & Gynecology', description: 'Pregnancy, contraception, and menopause management.', estimatedHours: 14,
        diseaseIds: ['preeclampsia', 'eclampsia', 'gestational_diabetes', 'postpartum_hemorrhage', 'menopause'],
        learningObjectives: [
          { id: 'lo-cp-obgyn-preeclampsia', unitId: 'cp-obgyn', statement: 'Manage preeclampsia with magnesium sulfate and antihypertensives.' },
          { id: 'lo-cp-obgyn-pregnancy', unitId: 'cp-obgyn', statement: 'Assess drug safety in pregnancy and lactation.' },
        ],
      },
      {
        id: 'cp-em', areaId: 'clinical_pharm', subject: 'Emergency Medicine',
        title: 'Emergency Medicine', description: 'ACLS, toxicology, trauma, and hypertensive crises.', estimatedHours: 20,
        diseaseIds: ['anaphylaxis', 'shock', 'septic_shock', 'status_epilepticus', 'cardiac_arrest', 'paracetamol_overdose', 'opioid_overdose', 'preeclampsia'],
        learningObjectives: [
          { id: 'lo-cp-em-acls', unitId: 'cp-em', statement: 'Apply ACLS pharmacology in cardiac arrest.' },
          { id: 'lo-cp-em-tox', unitId: 'cp-em', statement: 'Stabilize and antidote common toxicologic emergencies.' },
        ],
      },
      {
        id: 'cp-cc', areaId: 'clinical_pharm', subject: 'Critical Care',
        title: 'Critical Care', description: 'Sepsis, shock, sedation, and mechanical ventilation.', estimatedHours: 22,
        diseaseIds: ['sepsis', 'septic_shock', 'shock', 'aki'],
        learningObjectives: [
          { id: 'lo-cp-cc-sepsis', unitId: 'cp-cc', statement: 'Apply the sepsis bundle and vasopressor selection.' },
        ],
      },
      {
        id: 'cp-ger', areaId: 'clinical_pharm', subject: 'Geriatrics',
        title: 'Geriatrics', description: 'Polypharmacy, altered pharmacokinetics, and Beers criteria.', estimatedHours: 10,
        diseaseIds: ['polypharmacy', 'ckd', 'heart_failure'],
        learningObjectives: [
          { id: 'lo-cp-ger-polypharmacy', unitId: 'cp-ger', statement: 'Deprescribe and apply the Beers criteria in older adults.' },
        ],
      },
      {
        id: 'cp-tdm', areaId: 'clinical_pharm', subject: 'Therapeutic Drug Monitoring',
        title: 'Therapeutic Drug Monitoring', description: 'Clinical pharmacokinetics of narrow therapeutic index drugs.', estimatedHours: 15,
        diseaseIds: ['tdm', 'dose_adjustment'],
        learningObjectives: [
          { id: 'lo-cp-tdm-principles', unitId: 'cp-tdm', statement: 'Define when TDM is indicated and interpret levels.' },
        ],
      },
      {
        id: 'cp-couns', areaId: 'clinical_pharm', subject: 'Patient Counselling',
        title: 'Patient Counselling', description: 'Communication skills and medication adherence strategies.', estimatedHours: 10,
        diseaseIds: ['nonadherence'],
        learningObjectives: [
          { id: 'lo-cp-couns-adherence', unitId: 'cp-couns', statement: 'Use teach-back and adherence strategies in counselling.' },
        ],
      },
      {
        id: 'cp-safety', areaId: 'clinical_pharm', subject: 'Medication Safety',
        title: 'Medication Safety', description: 'Error prevention, pharmacovigilance, and root cause analysis.', estimatedHours: 12,
        diseaseIds: ['medication_error', 'adr'],
        learningObjectives: [
          { id: 'lo-cp-safety-vigilance', unitId: 'cp-safety', statement: 'Apply pharmacovigilance and error-reporting processes.' },
        ],
      },
      {
        id: 'cp-pharmcare', areaId: 'clinical_pharm', subject: 'Pharmaceutical Care',
        title: 'Pharmaceutical Care', description: 'Comprehensive medication management and care planning.', estimatedHours: 8,
        diseaseIds: ['adr', 'drug_interaction', 'polypharmacy'],
        learningObjectives: [
          { id: 'lo-cp-pharmcare-dtp', unitId: 'cp-pharmcare', statement: 'Identify and resolve drug therapy problems.' },
        ],
      },
    ],
  },
  {
    id: 'supporting',
    title: 'Supporting Sciences',
    description: 'Foundational sciences for pharmacy and medicine.',
    units: [
      { id: 'sup-anat', areaId: 'supporting', subject: 'Anatomy', title: 'Anatomy', description: 'Gross anatomy, neuroanatomy, and histology.', estimatedHours: 30, diseaseIds: [], learningObjectives: [{ id: 'lo-sup-anat-basics', unitId: 'sup-anat', statement: 'Recall major anatomical relationships relevant to drug action.' }] },
      { id: 'sup-phys', areaId: 'supporting', subject: 'Physiology', title: 'Physiology', description: 'Human body systems and homeostatic mechanisms.', estimatedHours: 35, diseaseIds: ['hypertension', 'heart_failure', 'asthma', 'ckd'], learningObjectives: [{ id: 'lo-sup-phys-systems', unitId: 'sup-phys', statement: 'Explain physiological basis of major organ systems.' }] },
      { id: 'sup-biochem', areaId: 'supporting', subject: 'Biochemistry', title: 'Biochemistry', description: 'Metabolism, enzymology, and molecular biology.', estimatedHours: 30, diseaseIds: ['type_2_diabetes', 'hhs'], learningObjectives: [{ id: 'lo-sup-biochem-metabolism', unitId: 'sup-biochem', statement: 'Relate metabolic pathways to drug targets.' }] },
      { id: 'sup-path', areaId: 'supporting', subject: 'Pathology', title: 'Pathology', description: 'Cell injury, inflammation, and systemic disease processes.', estimatedHours: 25, diseaseIds: [], learningObjectives: [{ id: 'lo-sup-path-inflammation', unitId: 'sup-path', statement: 'Describe cellular and inflammatory pathology.' }] },
      { id: 'sup-micro', areaId: 'supporting', subject: 'Microbiology', title: 'Microbiology', description: 'Bacteriology, virology, mycology, and parasitology.', estimatedHours: 25, diseaseIds: ['tuberculosis', 'hiv', 'malaria', 'meningitis', 'uti'], learningObjectives: [{ id: 'lo-sup-micro-classification', unitId: 'sup-micro', statement: 'Classify pathogens by causative organism.' }] },
      { id: 'sup-immuno', areaId: 'supporting', subject: 'Immunology', title: 'Immunology', description: 'Innate and adaptive immunity, hypersensitivity, and vaccines.', estimatedHours: 15, diseaseIds: ['anaphylaxis'], learningObjectives: [{ id: 'lo-sup-immuno-hypersensitivity', unitId: 'sup-immuno', statement: 'Classify hypersensitivity reactions.' }] },
      { id: 'sup-medchem', areaId: 'supporting', subject: 'Medicinal Chemistry', title: 'Medicinal Chemistry', description: 'Drug design, SAR, and targets.', estimatedHours: 25, diseaseIds: [], learningObjectives: [{ id: 'lo-sup-medchem-sar', unitId: 'sup-medchem', statement: 'Relate structure-activity relationships to pharmacology.' }] },
      { id: 'sup-pharmchem', areaId: 'supporting', subject: 'Pharmaceutical Chemistry', title: 'Pharmaceutical Chemistry', description: 'Analytical techniques and quality control.', estimatedHours: 20, diseaseIds: [], learningObjectives: [{ id: 'lo-sup-pharmchem-qc', unitId: 'sup-pharmchem', statement: 'Apply basic analytical QC principles.' }] },
      { id: 'sup-orgchem', areaId: 'supporting', subject: 'Organic Chemistry', title: 'Organic Chemistry', description: 'Reaction mechanisms and functional groups.', estimatedHours: 25, diseaseIds: [], learningObjectives: [{ id: 'lo-sup-orgchem-mechanisms', unitId: 'sup-orgchem', statement: 'Identify functional groups relevant to drug molecules.' }] },
      { id: 'sup-pharmanal', areaId: 'supporting', subject: 'Pharmaceutical Analysis', title: 'Pharmaceutical Analysis', description: 'Spectroscopy and chromatography.', estimatedHours: 20, diseaseIds: [], learningObjectives: [{ id: 'lo-sup-pharmanal-methods', unitId: 'sup-pharmanal', statement: 'Describe chromatographic and spectroscopic methods.' }] },
      { id: 'sup-pharmaceutics', areaId: 'supporting', subject: 'Pharmaceutics', title: 'Pharmaceutics', description: 'Dosage forms and biopharmaceutics.', estimatedHours: 30, diseaseIds: [], learningObjectives: [{ id: 'lo-sup-pharmaceutics-dosage', unitId: 'sup-pharmaceutics', statement: 'Relate dosage form to bioavailability.' }] },
      { id: 'sup-pharmacog', areaId: 'supporting', subject: 'Pharmacognosy', title: 'Pharmacognosy', description: 'Natural products and herbal medicines.', estimatedHours: 15, diseaseIds: [], learningObjectives: [{ id: 'lo-sup-pharmacog-natural', unitId: 'sup-pharmacog', statement: 'Identify key natural-product-derived drugs.' }] },
      { id: 'sup-pubhealth', areaId: 'supporting', subject: 'Public Health', title: 'Public Health', description: 'Epidemiology, health systems, and disease prevention.', estimatedHours: 15, diseaseIds: ['malaria', 'tuberculosis', 'hiv'], learningObjectives: [{ id: 'lo-sup-pubhealth-epid', unitId: 'sup-pubhealth', statement: 'Apply epidemiological measures to pharmacy practice.' }] },
    ],
  },
];

// ================================================================
// Derived indices & accessors
// ================================================================

export const ALL_UNITS: CurriculumUnit[] = CURRICULUM.flatMap((a) => a.units);
export const ALL_LEARNING_OBJECTIVES: LearningObjective[] = ALL_UNITS.flatMap((u) => u.learningObjectives);

export function getArea(areaId: string): CurriculumArea | undefined {
  return CURRICULUM.find((a) => a.id === areaId);
}

export function getUnit(unitId: string): CurriculumUnit | undefined {
  return ALL_UNITS.find((u) => u.id === unitId);
}

export function getUnitsByArea(areaId: string): CurriculumUnit[] {
  return CURRICULUM.find((a) => a.id === areaId)?.units ?? [];
}

export function getUnitsByDisease(diseaseId: string): CurriculumUnit[] {
  return ALL_UNITS.filter((u) => u.diseaseIds.includes(diseaseId));
}

export function getDisease(diseaseId: string): Disease | undefined {
  return DISEASES[diseaseId];
}

export function getDiseaseIdByName(name: string): string | undefined {
  const lower = name.toLowerCase().trim();
  const direct = Object.values(DISEASES).find((d) => d.name.toLowerCase() === lower);
  if (direct) return direct.id;
  const alias = Object.values(DISEASES).find((d) =>
    d.aliases?.some((a) => a.toLowerCase() === lower),
  );
  return alias?.id;
}

export function getLearningObjective(loId: string): LearningObjective | undefined {
  return ALL_LEARNING_OBJECTIVES.find((lo) => lo.id === loId);
}

export function getLearningObjectivesForUnit(unitId: string): LearningObjective[] {
  return getUnit(unitId)?.learningObjectives ?? [];
}

export function getUnitsForLearningObjective(loId: string): CurriculumUnit[] {
  return ALL_UNITS.filter((u) => u.learningObjectives.some((lo) => lo.id === loId));
}

/** Convenience: all disease ids linked to a unit. */
export function getDiseaseIdsForUnit(unitId: string): string[] {
  return getUnit(unitId)?.diseaseIds ?? [];
}
