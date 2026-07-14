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
  sle: { id: 'sle', name: 'Systemic Lupus Erythematosus' },
  musculoskeletal_pain: { id: 'musculoskeletal_pain', name: 'Musculoskeletal Pain' },
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
  bacterial_skin_infections: { id: 'bacterial_skin_infections', name: 'Bacterial Skin Infections' },
  drug_induced_skin: { id: 'drug_induced_skin', name: 'Drug-Induced Skin Reactions' },
  // Ophthalmology
  glaucoma: { id: 'glaucoma', name: 'Glaucoma' },
  conjunctivitis: { id: 'conjunctivitis', name: 'Conjunctivitis' },
  cataracts: { id: 'cataracts', name: 'Cataracts' },
  dry_eye: { id: 'dry_eye', name: 'Dry Eye Disease' },
  uveitis: { id: 'uveitis', name: 'Uveitis' },
  ocular_infections: { id: 'ocular_infections', name: 'Ocular Infections' },
  // ENT
  otitis_media: { id: 'otitis_media', name: 'Otitis Media' },
  sinusitis: { id: 'sinusitis', name: 'Sinusitis' },
  pharyngitis: { id: 'pharyngitis', name: 'Pharyngitis' },
  tonsillitis: { id: 'tonsillitis', name: 'Tonsillitis' },
  hearing_disorders: { id: 'hearing_disorders', name: 'Hearing Disorders' },
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
          { id: 'lo-pharm-vit-anemia', unitId: 'pharm-vit', statement: 'Differentiate iron deficiency, B12, and folate anaemia by lab findings and treatment.' },
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
          { id: 'lo-pharm-ophth-infections', unitId: 'pharm-ophth', statement: 'Select appropriate topical anti-infectives for common ocular infections.' },
        ],
      },
      {
        id: 'pharm-vet', areaId: 'pharmacology', subject: 'Veterinary Pharmacology',
        title: 'Veterinary Pharmacology', description: 'Cross-species pharmacology and animal therapeutics.', estimatedHours: 5,
        diseaseIds: [],
        learningObjectives: [
          { id: 'lo-pharm-vet-principles', unitId: 'pharm-vet', statement: 'Recognize key differences in veterinary pharmacokinetics.' },
          { id: 'lo-pharm-vet-dosing', unitId: 'pharm-vet', statement: 'Apply allometric scaling to cross-species dose calculation.' },
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
          { id: 'lo-cp-intro-care', unitId: 'cp-intro', statement: 'Outline the pharmaceutical care process and its core components.' },
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
        id: 'cp-neuro', areaId: 'clinical_pharm', subject: 'Central Nervous System Pharmacotherapy',
        title: 'Central Nervous System Pharmacotherapy', description: 'Epilepsy, stroke, psychiatric disorders, neurodegenerative diseases, and pain management.', estimatedHours: 38,
        diseaseIds: ['epilepsy', 'parkinson', 'alzheimer', 'migraine', 'stroke', 'neuropathic_pain', 'insomnia', 'depression', 'schizophrenia', 'bipolar', 'anxiety'],
        learningObjectives: [
          { id: 'lo-cp-neuro-epilepsy', unitId: 'cp-neuro', statement: 'Individualize antiseizure therapy and counsel on adherence.' },
          { id: 'lo-cp-neuro-stroke', unitId: 'cp-neuro', statement: 'Apply acute stroke reperfusion and secondary prevention.' },
          { id: 'lo-cp-neuro-depression', unitId: 'cp-neuro', statement: 'Select and monitor antidepressant therapy safely.' },
          { id: 'lo-cp-neuro-psychosis', unitId: 'cp-neuro', statement: 'Manage schizophrenia and bipolar disorder with antipsychotic and mood stabilizer therapy.' },
        ],
      },
      {
        id: 'cp-id', areaId: 'clinical_pharm', subject: 'Infectious Diseases & Antimicrobial Pharmacotherapy',
        title: 'Infectious Diseases & Antimicrobial Pharmacotherapy', description: 'Pneumonia, UTI, meningitis, HIV/AIDS, tuberculosis, malaria, and antimicrobial stewardship.', estimatedHours: 30,
        diseaseIds: ['community_acquired_pneumonia', 'childhood_pneumonia', 'uti', 'meningitis', 'sepsis', 'hiv', 'tuberculosis', 'malaria', 'gonorrhoea', 'syphilis', 'cellulitis', 'typhoid', 'fever'],
        learningObjectives: [
          { id: 'lo-cp-id-empiric', unitId: 'cp-id', statement: 'Select empiric antimicrobial therapy by syndrome and local resistance.' },
          { id: 'lo-cp-id-stewardship', unitId: 'cp-id', statement: 'Apply antimicrobial stewardship principles.' },
        ],
      },
      {
        id: 'cp-onc', areaId: 'clinical_pharm', subject: 'Haematology & Oncology Pharmacotherapy',
        title: 'Haematology & Oncology Pharmacotherapy', description: 'Solid tumours, haematological malignancies, anaemias, coagulopathies, and supportive care.', estimatedHours: 34,
        diseaseIds: ['breast_cancer', 'cervical_cancer', 'prostate_cancer', 'lung_cancer', 'colorectal_cancer', 'leukemia', 'lymphoma', 'chemo_toxicity', 'febrile_neutropenia', 'iron_deficiency_anemia', 'sickle_cell', 'hemophilia', 'dvt', 'pulmonary_embolism', 'dic'],
        learningObjectives: [
          { id: 'lo-cp-onc-regimens', unitId: 'cp-onc', statement: 'Explain goals of therapy (curative vs palliative) in common cancers.' },
          { id: 'lo-cp-onc-toxicity', unitId: 'cp-onc', statement: 'Prevent and manage chemotherapy toxicity and febrile neutropenia.' },
          { id: 'lo-cp-onc-vte', unitId: 'cp-onc', statement: 'Compare anticoagulants for VTE treatment and prophylaxis in cancer patients.' },
          { id: 'lo-cp-onc-anemia', unitId: 'cp-onc', statement: 'Differentiate and manage major anaemia types.' },
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
        id: 'cp-em', areaId: 'clinical_pharm', subject: 'Emergency & Critical Care',
        title: 'Emergency & Critical Care', description: 'ACLS, sepsis, shock, trauma, sedation, and hypertensive crises.', estimatedHours: 42,
        diseaseIds: ['anaphylaxis', 'shock', 'septic_shock', 'status_epilepticus', 'cardiac_arrest', 'paracetamol_overdose', 'opioid_overdose', 'preeclampsia', 'sepsis', 'aki'],
        learningObjectives: [
          { id: 'lo-cp-em-acls', unitId: 'cp-em', statement: 'Apply ACLS pharmacology in cardiac arrest.' },
          { id: 'lo-cp-em-tox', unitId: 'cp-em', statement: 'Stabilize and antidote common toxicologic emergencies.' },
          { id: 'lo-cp-em-sepsis', unitId: 'cp-em', statement: 'Apply the sepsis bundle and vasopressor selection.' },
        ],
      },
      {
        id: 'cp-rheum', areaId: 'clinical_pharm', subject: 'Rheumatology & Musculoskeletal Pharmacotherapy',
        title: 'Rheumatology & Musculoskeletal Pharmacotherapy', description: 'Osteoarthritis, rheumatoid arthritis, gout, SLE, and musculoskeletal pain.', estimatedHours: 12,
        diseaseIds: ['rheumatoid_arthritis', 'osteoarthritis', 'gout', 'sle', 'musculoskeletal_pain', 'acute_pain', 'chronic_pain'],
        learningObjectives: [
          { id: 'lo-cp-rheum-ra', unitId: 'cp-rheum', statement: 'Select DMARDs and biologic therapy for rheumatoid arthritis.' },
          { id: 'lo-cp-rheum-gout', unitId: 'cp-rheum', statement: 'Manage acute gout flares and urate-lowering therapy.' },
          { id: 'lo-cp-rheum-pain', unitId: 'cp-rheum', statement: 'Apply WHO analgesic ladder for musculoskeletal pain.' },
        ],
      },
      {
        id: 'cp-derm', areaId: 'clinical_pharm', subject: 'Dermatology Pharmacotherapy',
        title: 'Dermatology Pharmacotherapy', description: 'Acne, psoriasis, eczema, fungal infections, and drug-induced skin reactions.', estimatedHours: 8,
        diseaseIds: ['acne', 'psoriasis', 'eczema', 'contact_dermatitis', 'fungal_skin', 'urticaria', 'scabies', 'bacterial_skin_infections', 'drug_induced_skin'],
        learningObjectives: [
          { id: 'lo-cp-derm-acne', unitId: 'cp-derm', statement: 'Outline topical and systemic acne therapy.' },
          { id: 'lo-cp-derm-psoriasis', unitId: 'cp-derm', statement: 'Describe psoriasis management including biologics.' },
          { id: 'lo-cp-derm-infection', unitId: 'cp-derm', statement: 'Treat common bacterial and fungal skin infections.' },
        ],
      },
      {
        id: 'cp-ophth', areaId: 'clinical_pharm', subject: 'Ophthalmology Pharmacotherapy',
        title: 'Ophthalmology Pharmacotherapy', description: 'Glaucoma, conjunctivitis, cataracts, and ocular infections.', estimatedHours: 6,
        diseaseIds: ['glaucoma', 'conjunctivitis', 'cataracts', 'dry_eye', 'uveitis', 'ocular_infections'],
        learningObjectives: [
          { id: 'lo-cp-ophth-glaucoma', unitId: 'cp-ophth', statement: 'Classify antiglaucoma agents by mechanism and select therapy.' },
          { id: 'lo-cp-ophth-infection', unitId: 'cp-ophth', statement: 'Manage common ocular infections with topical anti-infectives.' },
        ],
      },
      {
        id: 'cp-ent', areaId: 'clinical_pharm', subject: 'ENT Pharmacotherapy',
        title: 'ENT Pharmacotherapy', description: 'Otitis media, sinusitis, pharyngitis, and hearing disorders.', estimatedHours: 6,
        diseaseIds: ['otitis_media', 'sinusitis', 'pharyngitis', 'tonsillitis', 'hearing_disorders', 'allergic_rhinitis'],
        learningObjectives: [
          { id: 'lo-cp-ent-omi', unitId: 'cp-ent', statement: 'Select appropriate antibiotics for acute otitis media and sinusitis.' },
          { id: 'lo-cp-ent-pharyngitis', unitId: 'cp-ent', statement: 'Differentiate viral vs bacterial pharyngitis and treat accordingly.' },
        ],
      },
      {
        id: 'cp-tox', areaId: 'clinical_pharm', subject: 'Toxicology & Poison Management',
        title: 'Toxicology & Poison Management', description: 'Drug overdose, poisoning, antidotes, and environmental toxins.', estimatedHours: 12,
        diseaseIds: ['organophosphate', 'paracetamol_overdose', 'opioid_overdose', 'snake_bite', 'carbon_monoxide', 'alcohol_poisoning', 'heavy_metal', 'drug_overdose', 'drug_poisoning'],
        learningObjectives: [
          { id: 'lo-cp-tox-antidotes', unitId: 'cp-tox', statement: 'Match common poisonings to their specific antidotes.' },
          { id: 'lo-cp-tox-paracetamol', unitId: 'cp-tox', statement: 'Manage paracetamol overdose with N-acetylcysteine.' },
          { id: 'lo-cp-tox-overdose', unitId: 'cp-tox', statement: 'Stabilize and manage opioid and organophosphate poisoning.' },
        ],
      },
      {
        id: 'cp-ger', areaId: 'clinical_pharm', subject: 'Geriatrics',
        title: 'Geriatrics', description: 'Polypharmacy, altered pharmacokinetics, and Beers criteria.', estimatedHours: 10,
        diseaseIds: ['polypharmacy', 'ckd', 'heart_failure'],
        learningObjectives: [
          { id: 'lo-cp-ger-polypharmacy', unitId: 'cp-ger', statement: 'Deprescribe and apply the Beers criteria in older adults.' },
          { id: 'lo-cp-ger-cognition', unitId: 'cp-ger', statement: 'Screen for cognitive impairment and anticholinergic burden in older adults.' },
        ],
      },
      {
        id: 'cp-tdm', areaId: 'clinical_pharm', subject: 'Therapeutic Drug Monitoring',
        title: 'Therapeutic Drug Monitoring', description: 'Clinical pharmacokinetics of narrow therapeutic index drugs.', estimatedHours: 15,
        diseaseIds: ['tdm', 'dose_adjustment', 'special_pop_dosing'],
        learningObjectives: [
          { id: 'lo-cp-tdm-principles', unitId: 'cp-tdm', statement: 'Define when TDM is indicated and interpret levels.' },
          { id: 'lo-cp-tdm-pharmacokinetics', unitId: 'cp-tdm', statement: 'Calculate loading and maintenance doses using pharmacokinetic equations.' },
        ],
      },
      {
        id: 'cp-couns', areaId: 'clinical_pharm', subject: 'Patient Counselling',
        title: 'Patient Counselling', description: 'Communication skills and medication adherence strategies.', estimatedHours: 10,
        diseaseIds: ['nonadherence'],
        learningObjectives: [
          { id: 'lo-cp-couns-adherence', unitId: 'cp-couns', statement: 'Use teach-back and adherence strategies in counselling.' },
          { id: 'lo-cp-couns-barriers', unitId: 'cp-couns', statement: 'Identify and address common barriers to medication adherence.' },
        ],
      },
      {
        id: 'cp-safety', areaId: 'clinical_pharm', subject: 'Medication Safety',
        title: 'Medication Safety', description: 'Error prevention, pharmacovigilance, and root cause analysis.', estimatedHours: 12,
        diseaseIds: ['medication_error', 'adr'],
        learningObjectives: [
          { id: 'lo-cp-safety-vigilance', unitId: 'cp-safety', statement: 'Apply pharmacovigilance and error-reporting processes.' },
          { id: 'lo-cp-safety-error', unitId: 'cp-safety', statement: 'Classify medication errors by type and stage of the medication-use process.' },
        ],
      },
      {
        id: 'cp-pharmcare', areaId: 'clinical_pharm', subject: 'Pharmaceutical Care',
        title: 'Pharmaceutical Care', description: 'Comprehensive medication management and care planning.', estimatedHours: 8,
        diseaseIds: ['adr', 'drug_interaction', 'polypharmacy'],
        learningObjectives: [
          { id: 'lo-cp-pharmcare-dtp', unitId: 'cp-pharmcare', statement: 'Identify and resolve drug therapy problems.' },
          { id: 'lo-cp-pharmcare-plan', unitId: 'cp-pharmcare', statement: 'Construct a pharmaceutical care plan with measurable outcomes.' },
        ],
      },
    ],
  },
  {
    id: 'supporting',
    title: 'Supporting Sciences',
    description: 'Foundational sciences for pharmacy and medicine.',
    units: [
      {
        id: 'sup-anat', areaId: 'supporting', subject: 'Anatomy',
        title: 'Anatomy', description: 'Gross anatomy, neuroanatomy, and histology.',
        estimatedHours: 30, diseaseIds: [],
        learningObjectives: [
          { id: 'lo-sup-anat-basics', unitId: 'sup-anat', statement: 'Recall major anatomical relationships relevant to drug action.' },
          { id: 'lo-sup-anat-systems', unitId: 'sup-anat', statement: 'Identify anatomical structures relevant to drug administration routes.' },
        ],
      },
      { id: 'sup-phys', areaId: 'supporting', subject: 'Physiology', title: 'Physiology', description: 'Human body systems, homeostatic mechanisms, and organ function.', estimatedHours: 35, diseaseIds: [], learningObjectives: [{ id: 'lo-sup-phys-systems', unitId: 'sup-phys', statement: 'Explain physiological basis of major organ systems.' }, { id: 'lo-sup-phys-homeostasis', unitId: 'sup-phys', statement: 'Describe homeostatic regulation of body fluids, electrolytes, and acid-base balance.' }] },
      { id: 'sup-biochem', areaId: 'supporting', subject: 'Biochemistry', title: 'Biochemistry', description: 'Metabolism, enzymology, and molecular biology.', estimatedHours: 30, diseaseIds: [], learningObjectives: [{ id: 'lo-sup-biochem-metabolism', unitId: 'sup-biochem', statement: 'Describe major metabolic pathways and their regulation.' }, { id: 'lo-sup-biochem-enzymes', unitId: 'sup-biochem', statement: 'Explain enzyme kinetics and inhibition relevant to drug action.' }] },
      {
        id: 'sup-path', areaId: 'supporting', subject: 'Pathology',
        title: 'Pathology', description: 'Cell injury, inflammation, and systemic disease processes.',
        estimatedHours: 25, diseaseIds: [],
        learningObjectives: [
          { id: 'lo-sup-path-inflammation', unitId: 'sup-path', statement: 'Describe cellular and inflammatory pathology.' },
          { id: 'lo-sup-path-neoplasia', unitId: 'sup-path', statement: 'Describe the hallmarks of cancer and neoplastic progression.' },
        ],
      },
      {
        id: 'sup-micro', areaId: 'supporting', subject: 'Microbiology',
        title: 'Microbiology', description: 'Bacteriology, virology, mycology, and parasitology.',
        estimatedHours: 25, diseaseIds: ['tuberculosis', 'hiv', 'malaria', 'meningitis', 'uti'],
        learningObjectives: [
          { id: 'lo-sup-micro-classification', unitId: 'sup-micro', statement: 'Classify pathogens by causative organism.' },
          { id: 'lo-sup-micro-stains', unitId: 'sup-micro', statement: 'Compare Gram stain, acid-fast, and special staining techniques for bacterial identification.' },
        ],
      },
      {
        id: 'sup-immuno', areaId: 'supporting', subject: 'Immunology',
        title: 'Immunology', description: 'Innate and adaptive immunity, hypersensitivity, and vaccines.',
        estimatedHours: 15, diseaseIds: ['anaphylaxis'],
        learningObjectives: [
          { id: 'lo-sup-immuno-hypersensitivity', unitId: 'sup-immuno', statement: 'Classify hypersensitivity reactions.' },
          { id: 'lo-sup-immuno-vaccines', unitId: 'sup-immuno', statement: 'Describe vaccine types and the immunological basis of immunization.' },
        ],
      },
      {
        id: 'sup-medchem', areaId: 'supporting', subject: 'Medicinal Chemistry',
        title: 'Medicinal Chemistry', description: 'Drug design, SAR, and targets.',
        estimatedHours: 25, diseaseIds: [],
        learningObjectives: [
          { id: 'lo-sup-medchem-sar', unitId: 'sup-medchem', statement: 'Relate structure-activity relationships to pharmacology.' },
          { id: 'lo-sup-medchem-synthesis', unitId: 'sup-medchem', statement: 'Outline synthetic pathways for representative drug classes.' },
        ],
      },
      {
        id: 'sup-pharmchem', areaId: 'supporting', subject: 'Pharmaceutical Chemistry',
        title: 'Pharmaceutical Chemistry', description: 'Analytical techniques and quality control.',
        estimatedHours: 20, diseaseIds: [],
        learningObjectives: [
          { id: 'lo-sup-pharmchem-qc', unitId: 'sup-pharmchem', statement: 'Apply basic analytical QC principles.' },
          { id: 'lo-sup-pharmchem-stability', unitId: 'sup-pharmchem', statement: 'Evaluate drug stability and degradation pathways.' },
        ],
      },
      {
        id: 'sup-orgchem', areaId: 'supporting', subject: 'Organic Chemistry',
        title: 'Organic Chemistry', description: 'Reaction mechanisms and functional groups.',
        estimatedHours: 25, diseaseIds: [],
        learningObjectives: [
          { id: 'lo-sup-orgchem-mechanisms', unitId: 'sup-orgchem', statement: 'Identify functional groups relevant to drug molecules.' },
          { id: 'lo-sup-orgchem-reactions', unitId: 'sup-orgchem', statement: 'Classify organic reactions relevant to drug synthesis and metabolism.' },
        ],
      },
      {
        id: 'sup-pharmanal', areaId: 'supporting', subject: 'Pharmaceutical Analysis',
        title: 'Pharmaceutical Analysis', description: 'Spectroscopy and chromatography.',
        estimatedHours: 20, diseaseIds: [],
        learningObjectives: [
          { id: 'lo-sup-pharmanal-methods', unitId: 'sup-pharmanal', statement: 'Describe chromatographic and spectroscopic methods.' },
          { id: 'lo-sup-pharmanal-validation', unitId: 'sup-pharmanal', statement: 'Apply analytical method validation parameters (accuracy, precision, specificity).' },
        ],
      },
      {
        id: 'sup-pharmaceutics', areaId: 'supporting', subject: 'Pharmaceutics',
        title: 'Pharmaceutics', description: 'Dosage forms and biopharmaceutics.',
        estimatedHours: 30, diseaseIds: [],
        learningObjectives: [
          { id: 'lo-sup-pharmaceutics-dosage', unitId: 'sup-pharmaceutics', statement: 'Relate dosage form to bioavailability.' },
          { id: 'lo-sup-pharmaceutics-forms', unitId: 'sup-pharmaceutics', statement: 'Compare solid, liquid, and semi-solid dosage forms and their advantages.' },
        ],
      },
      {
        id: 'sup-pharmacog', areaId: 'supporting', subject: 'Pharmacognosy',
        title: 'Pharmacognosy', description: 'Natural products and herbal medicines.',
        estimatedHours: 15, diseaseIds: [],
        learningObjectives: [
          { id: 'lo-sup-pharmacog-natural', unitId: 'sup-pharmacog', statement: 'Identify key natural-product-derived drugs.' },
          { id: 'lo-sup-pharmacog-herbal', unitId: 'sup-pharmacog', statement: 'Evaluate evidence for commonly used herbal medicines and their interactions.' },
        ],
      },
      {
        id: 'sup-pubhealth', areaId: 'supporting', subject: 'Public Health',
        title: 'Public Health', description: 'Epidemiology, health systems, and disease prevention.',
        estimatedHours: 15, diseaseIds: ['malaria', 'tuberculosis', 'hiv'],
        learningObjectives: [
          { id: 'lo-sup-pubhealth-epid', unitId: 'sup-pubhealth', statement: 'Apply epidemiological measures to pharmacy practice.' },
          { id: 'lo-sup-pubhealth-programmes', unitId: 'sup-pubhealth', statement: 'Describe major disease prevention programmes in the Kenyan health system.' },
        ],
      },
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

// ================================================================
// Integrated Curriculum — 17 Clinical Units
// (single source of truth for specialty-based modules)
// ================================================================

export const INTEGRATED_UNIT_IDS = [
  'cp-cv',      // Cardiovascular Pharmacotherapy
  'cp-resp',    // Respiratory Pharmacotherapy
  'cp-id',      // Infectious Diseases & Antimicrobial Pharmacotherapy
  'cp-endo',    // Endocrine Pharmacotherapy
  'cp-gi',      // Gastrointestinal Pharmacotherapy
  'cp-renal',   // Renal & Electrolyte Pharmacotherapy
  'cp-neuro',   // Central Nervous System Pharmacotherapy
  'cp-onc',     // Haematology & Oncology Pharmacotherapy
  'cp-rheum',   // Rheumatology & Musculoskeletal Pharmacotherapy
  'cp-obgyn',   // Obstetrics & Gynaecology Pharmacotherapy
  'cp-peds',    // Paediatric Pharmacotherapy
  'cp-ger',     // Geriatric Pharmacotherapy
  'cp-derm',    // Dermatology Pharmacotherapy
  'cp-ophth',   // Ophthalmology Pharmacotherapy
  'cp-ent',     // ENT Pharmacotherapy
  'cp-em',      // Emergency & Critical Care
  'cp-tox',     // Toxicology & Poison Management
] as const;

export type IntegratedUnitId = typeof INTEGRATED_UNIT_IDS[number];

export function getIntegratedUnits(): CurriculumUnit[] {
  return INTEGRATED_UNIT_IDS.map((id) => getUnit(id)).filter(Boolean) as CurriculumUnit[];
}

export function isIntegratedUnit(unitId: string): boolean {
  return (INTEGRATED_UNIT_IDS as readonly string[]).includes(unitId);
}

/** Clinical curriculum with specialty name → integrated unit */
export const INTEGRATED_UNITS_MAP: Record<string, string> = {
  'Cardiovascular Pharmacotherapy': 'cp-cv',
  'Respiratory Pharmacotherapy': 'cp-resp',
  'Infectious Diseases & Antimicrobial Pharmacotherapy': 'cp-id',
  'Endocrine Pharmacotherapy': 'cp-endo',
  'Gastrointestinal Pharmacotherapy': 'cp-gi',
  'Renal & Electrolyte Pharmacotherapy': 'cp-renal',
  'Central Nervous System Pharmacotherapy': 'cp-neuro',
  'Haematology & Oncology Pharmacotherapy': 'cp-onc',
  'Rheumatology & Musculoskeletal Pharmacotherapy': 'cp-rheum',
  'Obstetrics & Gynaecology Pharmacotherapy': 'cp-obgyn',
  'Paediatric Pharmacotherapy': 'cp-peds',
  'Geriatric Pharmacotherapy': 'cp-ger',
  'Dermatology Pharmacotherapy': 'cp-derm',
  'Ophthalmology Pharmacotherapy': 'cp-ophth',
  'ENT Pharmacotherapy': 'cp-ent',
  'Emergency & Critical Care': 'cp-em',
  'Toxicology & Poison Management': 'cp-tox',
};

// Raw specialty (e.g. 'Cardiology') to integrated unit ID mapping
const RAW_SPECIALTY_MAP: Record<string, string> = {
  'Cardiology': 'cp-cv',
  'Internal Medicine': 'cp-cv',
  'Cardiovascular Disorders': 'cp-cv',
  'Respiratory Medicine': 'cp-resp',
  'Respiratory Disorders': 'cp-resp',
  'Infectious Diseases': 'cp-id',
  'Endocrinology': 'cp-endo',
  'Endocrine Disorders': 'cp-endo',
  'Gastroenterology': 'cp-gi',
  'Gastrointestinal Disorders': 'cp-gi',
  'Hepatology': 'cp-gi',
  'Nephrology': 'cp-renal',
  'Renal Disorders': 'cp-renal',
  'Neurology': 'cp-neuro',
  'Neurological Disorders': 'cp-neuro',
  'Psychiatry': 'cp-neuro',
  'Neurology / Pain Medicine': 'cp-neuro',
  'Haematology': 'cp-onc',
  'Oncology': 'cp-onc',
  'Hematology & Oncology': 'cp-onc',
  'Orthopaedics': 'cp-rheum',
  'Rheumatology': 'cp-rheum',
  'Obstetrics & Gynecology': 'cp-obgyn',
  'Pediatrics': 'cp-peds',
  'Geriatrics': 'cp-ger',
  'Emergency Medicine / Toxicology': 'cp-tox',
  'Toxicology': 'cp-tox',
  'Clinical Pharmacy / Antimicrobial Stewardship': 'cp-id',
  'Clinical Pharmacy / Pharmacokinetics': 'cp-renal',
  'Clinical Pharmacy / Polypharmacy': 'cp-ger',
  'Clinical Pharmacy / Transitions of Care': 'cp-ger',
  'Nutrition': 'cp-ger',
};

export function getIntegratedUnitId(specialtyName: string): string | undefined {
  return INTEGRATED_UNITS_MAP[specialtyName] || RAW_SPECIALTY_MAP[specialtyName];
}

// ================================================================
// Education Hub Modules — derived from curriculum areas + modules
// that don't map directly (cases, drug info, EBM, tools)
// ================================================================

export interface EducationModuleUnit {
  id: string;
  title: string;
  description: string;
  estimatedHours?: number;
  isCustom?: boolean;
  parentId?: string;
}

export interface EducationModule {
  id: string;
  title: string;
  description: string;
  /** Whether this module contains the 17 integrated clinical units */
  isIntegrated: boolean;
  /** Reference to the curriculum area id if applicable */
  areaId?: string;
  /** Optional display properties for the UI */
  icon?: string;
  color?: string;
}

/** All top-level modules for the Education Hub */
export const EDUCATION_MODULES: EducationModule[] = [
  { id: 'clinical_pharm', title: 'Clinical Pharmacy & Therapeutics', description: 'Disease management and patient care across 17 integrated therapeutic areas.', isIntegrated: true, areaId: 'clinical_pharm', icon: 'HeartPulse', color: 'red' },
  { id: 'pharmacology', title: 'Pharmacology', description: 'Drug mechanisms, kinetics, dynamics, and toxicology.', isIntegrated: false, areaId: 'pharmacology', icon: 'Beaker', color: 'indigo' },
  { id: 'cases', title: 'Clinical Cases', description: 'Interactive patient cases for therapeutic areas.', isIntegrated: false, icon: 'Briefcase', color: 'orange' },
  { id: 'drug_info', title: 'Drug Information & Guidelines', description: 'Clinical guidelines, monographs, and evidence.', isIntegrated: false, icon: 'FileText', color: 'teal' },
  { id: 'ebm', title: 'Evidence-Based Medicine & Research', description: 'Research methodology, biostatistics, critical appraisal, and evidence synthesis.', isIntegrated: false, icon: 'Search', color: 'sky' },
  { id: 'supporting', title: 'Supporting Sciences', description: 'Foundational sciences for pharmacy and medicine.', isIntegrated: false, areaId: 'supporting', icon: 'FlaskConical', color: 'emerald' },
  { id: 'tools', title: 'Study & Learning Tools', description: 'Flashcards, Q-banks, and Planning.', isIntegrated: false, icon: 'BrainCircuit', color: 'fuchsia' },
];

export function getEducationModule(moduleId: string): EducationModule | undefined {
  return EDUCATION_MODULES.find((m) => m.id === moduleId);
}

/** All units for a given education module (derived from curriculum areas where possible) */
export function getModuleUnits(moduleId: string): EducationModuleUnit[] {
  if (moduleId === 'clinical_pharm') {
    return getIntegratedUnits().map((u) => ({
      id: u.id, title: u.title, description: u.description,
    }));
  }
  if (moduleId === 'pharmacology' || moduleId === 'supporting') {
    const area = getArea(moduleId);
    return (area?.units ?? []).map((u) => ({
      id: u.id, title: u.title, description: u.description,
    }));
  }
  // Non-curriculum modules (cases, drug_info, ebm, tools) return units from static data
  return NON_CURRICULUM_UNITS[moduleId] ?? [];
}

// Static units for non-curriculum modules (preserved from original educationHubData)
const NON_CURRICULUM_UNITS: Record<string, EducationModuleUnit[]> = {
  cases: [
    { id: 'cc-cv', title: 'Cardiovascular Cases', description: 'Interactive cases on hypertension, heart failure, and ischemic heart disease.' },
    { id: 'cc-endo', title: 'Endocrine Cases', description: 'Interactive cases on diabetes, thyroid, and adrenal disorders.' },
    { id: 'cc-resp', title: 'Respiratory Cases', description: 'Interactive cases on asthma, COPD, and allergic rhinitis.' },
    { id: 'cc-gi', title: 'Gastrointestinal Cases', description: 'Interactive cases on PUD, IBD, and liver cirrhosis.' },
    { id: 'cc-renal', title: 'Renal Cases', description: 'Interactive cases on AKI and CKD management.' },
    { id: 'cc-neuro', title: 'Neurological Cases', description: 'Interactive cases on epilepsy, stroke, and Parkinson\'s disease.' },
    { id: 'cc-id', title: 'Infectious Disease Cases', description: 'Interactive cases on meningitis, pneumonia, and HIV.' },
    { id: 'cc-onc', title: 'Oncology Cases', description: 'Interactive cases on solid tumors and haematological malignancies.' },
    { id: 'cc-hem', title: 'Hematology Cases', description: 'Interactive cases on anemia and anticoagulation.' },
    { id: 'cc-psych', title: 'Psychiatry Cases', description: 'Interactive cases on depression, bipolar, and schizophrenia.' },
    { id: 'cc-peds', title: 'Pediatric Cases', description: 'Interactive cases on neonatal care and childhood infections.' },
    { id: 'cc-obgyn', title: 'Obstetrics & Gynecology Cases', description: 'Interactive cases on preeclampsia, pregnancy, and contraception.' },
    { id: 'cc-em', title: 'Critical Care & Emergency Cases', description: 'Interactive cases on sepsis, trauma, and toxicology.' },
  ],
  drug_info: [
    { id: 'di-guidelines', title: 'Clinical Guidelines', description: 'Latest WHO, AHA, IDSA, and national therapeutic guidelines.' },
    { id: 'di-monographs', title: 'Drug Monographs', description: 'Detailed prescribing information, adverse effects, and interactions.' },
    { id: 'di-formulary', title: 'Formulary Management', description: 'Pharmacy and Therapeutics (P&T) committee processes and drug selection.' },
  ],
  ebm: [
    { id: 'ebm-research', title: 'Research Methodology', description: 'Study designs, epidemiological methods, and research question formulation.' },
    { id: 'ebm-biostats', title: 'Biostatistics', description: 'Descriptive and inferential statistics, hypothesis testing, and data interpretation.' },
    { id: 'ebm-literature', title: 'Critical Appraisal', description: 'Evaluating validity, bias, and applicability of published medical research.' },
    { id: 'ebm-trials', title: 'Clinical Trial Design', description: 'Phases of drug development, randomization, blinding, and regulatory approval.' },
  ],
  tools: [
    { id: 'tool-qbank', title: 'Question Bank', description: 'MCQs and practice exams for all subjects.' },
    { id: 'tool-flashcards', title: 'Spaced Repetition Flashcards', description: 'Active recall decks for pharmacology and therapeutics.' },
    { id: 'tool-podcasts', title: 'Podcasts & Audio', description: 'Audio summaries of clinical topics and guidelines.' },
    { id: 'tool-papers', title: 'Past Papers', description: 'Historical board and university examination papers.' },
    { id: 'tool-planner', title: 'Smart Study Planner', description: 'Generate personalized study schedules and track progress.' },
    { id: 'tool-saved', title: 'Downloads & Bookmarks', description: 'Access saved resources, PDFs, and offline content.' },
  ],
};
