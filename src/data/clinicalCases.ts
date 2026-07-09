// ============================================================
// Clinova Clinical Case Repository
// Free, open-access clinical teaching cases across all major
// medical and pharmacy specialties.
// Each case follows a structured educational template.
// ============================================================

import type { ClinicalCase } from '../types/knowledge';

/**
 * The complete case repository.
 * All cases are derived from freely available educational resources
 * (open-access repositories, WHO, CDC, public domain clinical teaching materials).
 * Every case has been re-structured into Clinova's educational format.
 */
export const CLINICAL_CASES: ClinicalCase[] = [
  // ================================================================
  // CARDIOLOGY
  // ================================================================
  {
    id: 'card-001',
    title: 'Acute Myocardial Infarction — STEMI Management',
    discipline: 'Clinical Medicine',
    specialty: 'Cardiology',
    patientPresentation: 'A 58-year-old male presents to the emergency department with crushing retrosternal chest pain radiating to the left arm, associated with diaphoresis and nausea. Pain started 2 hours ago while at rest.',
    history: 'Hypertension for 10 years (poorly controlled), type 2 diabetes mellitus, smoker (20 pack-years), family history of premature coronary artery disease. No previous cardiac events.',
    examination: 'Pale, clammy skin. HR 110 bpm, BP 145/90 mmHg, RR 22/min, SpO2 94% on room air. JVP not elevated. Chest clear. Heart sounds: S1, S2, no murmurs or gallop.',
    differentialDiagnoses: [
      'Acute STEMI',
      'Unstable angina / NSTEMI',
      'Acute aortic dissection',
      'Acute pericarditis',
      'Pulmonary embolism',
      'Spontaneous pneumothorax',
      'Esophageal rupture (Boerhaave syndrome)',
    ],
    investigations: [
      { type: 'lab', name: 'ECG', findings: 'ST-segment elevation of 4mm in leads V1–V4 with reciprocal depression in II, III, aVF', isKeyFinding: true },
      { type: 'lab', name: 'High-sensitivity Troponin I', findings: 'Elevated at 2,450 ng/L (normal < 34 ng/L)', isKeyFinding: true },
      { type: 'lab', name: 'Chest X-ray', findings: 'Normal cardiac silhouette, no pulmonary edema, no pneumothorax' },
      { type: 'lab', name: 'Full blood count', findings: 'Hb 14.2 g/dL, WBC 12.5 × 10^9/L, platelets 245 × 10^9/L' },
      { type: 'lab', name: 'Urea & Electrolytes', findings: 'Sodium 138, Potassium 4.1, Creatinine 95 µmol/L, eGFR >60' },
      { type: 'lab', name: 'Lipid profile', findings: 'Total cholesterol 6.8 mmol/L, LDL 4.5 mmol/L, HDL 1.0 mmol/L, TG 2.1 mmol/L' },
    ],
    diagnosis: 'Anteroseptal ST-elevation myocardial infarction (Killip class I)',
    pharmacologicalManagement: [
      { drug: 'Aspirin', dose: '300 mg', route: 'Oral', frequency: 'Stat', duration: 'Loading dose', isFirstLine: true },
      { drug: 'Ticagrelor', dose: '180 mg', route: 'Oral', frequency: 'Stat', duration: 'Loading dose', isFirstLine: true },
      { drug: 'Heparin (Unfractionated)', dose: '60 IU/kg IV bolus, then 12 IU/kg/hr', route: 'Intravenous', frequency: 'Continuous infusion', duration: '48 hours or until PCI', isFirstLine: true },
      { drug: 'Morphine', dose: '4 mg', route: 'Intravenous', frequency: 'PRN every 5 minutes', duration: 'As needed for pain', notes: 'Monitor for respiratory depression' },
      { drug: 'Oxygen', dose: '4 L/min', route: 'Nasal cannula', frequency: 'Continuous', duration: 'Until SpO2 > 94%' },
      { drug: 'Atorvastatin', dose: '80 mg', route: 'Oral', frequency: 'Daily', duration: 'Long-term', isFirstLine: true },
      { drug: 'Metoprolol', dose: '25 mg', route: 'Oral', frequency: 'Twice daily', duration: 'Long-term', isFirstLine: true },
      { drug: 'Ramipril', dose: '2.5 mg', route: 'Oral', frequency: 'Daily', duration: 'Long-term', isFirstLine: true },
    ],
    nonPharmacologicalManagement: [
      'Primary percutaneous coronary intervention (PCI) within 90 minutes of arrival',
      'Temporary pacing wire standby',
      'Continuous cardiac monitoring in CCU',
      'Bed rest for first 24 hours',
      'Smoking cessation counseling',
      'Cardiac rehabilitation program referral',
    ],
    monitoring: [
      'Continuous ECG monitoring for arrhythmias',
      'Vital signs every 15 minutes until stable, then every 4 hours',
      'Troponin at 6 and 12 hours',
      'ECG at 90 minutes post-PCI to assess ST-segment resolution',
      'Monitor for bleeding (access site, GI, intracranial)',
      'Echocardiogram at 48 hours for LV function assessment',
    ],
    followUp: 'Cardiology clinic at 6 weeks. Repeat echo at 3 months. Cardiac rehab program for 12 weeks. Continue dual antiplatelet therapy for 12 months. Risk factor modification: target BP <130/80, LDL <1.4 mmol/L, HbA1c <7%.',
    learningObjectives: [
      'Recognize the ECG criteria for STEMI diagnosis',
      'Describe the emergency management algorithm for STEMI',
      'List the evidence-based pharmacotherapy for post-MI secondary prevention',
      'Explain the role and timing of primary PCI versus fibrinolysis',
      'Identify complications of acute MI (arrhythmias, heart failure, pericarditis, VSD, papillary muscle rupture)',
    ],
    clinicalPearls: [
      'Time is muscle: door-to-balloon time should be <90 minutes',
      'Right ventricular MI presents with hypotension and clear lungs — give IV fluids, avoid nitrates',
      'Inferior STEMI may involve the right ventricle — always do right-sided ECG (V4R)',
      'Beta-blockers reduce mortality but avoid in acute heart failure or cardiogenic shock',
      'High-dose statin is indicated regardless of baseline LDL levels',
    ],
    difficulty: 'intermediate',
    estimatedStudyMinutes: 45,
    source: {
      name: 'ESC Guidelines for STEMI Management',
      url: 'https://academic.oup.com/eurheartj/article/39/2/119/4091812',
      license: 'Open Access',
      attribution: 'European Society of Cardiology (ESC)',
    },
    tags: ['stemI', 'myocardial infarction', 'cardiology', 'emergency medicine', 'acute coronary syndrome', 'pci'],
    references: [
      'Ibanez B, et al. 2017 ESC Guidelines for STEMI. Eur Heart J. 2018;39(2):119-177.',
      'O\'Gara PT, et al. 2013 ACCF/AHA Guideline for STEMI. Circulation. 2013;127(4):e362-e425.',
    ],
    uploadedBy: 'system',
    createdAt: Date.now() - 86400000 * 30,
    updatedAt: Date.now(),
    version: 1,
  },

  // ================================================================
  // INFECTIOUS DISEASES
  // ================================================================
  {
    id: 'id-001',
    title: 'Severe Community-Acquired Pneumonia — Antimicrobial Management',
    discipline: 'Clinical Medicine',
    specialty: 'Infectious Diseases',
    subSpecialty: 'Respiratory Infections',
    patientPresentation: 'A 72-year-old female presents with 5-day history of productive cough with purulent sputum, fever (39.2°C), pleuritic chest pain, and progressive shortness of breath. She is confused and hypotensive on arrival.',
    history: 'COPD (GOLD stage 2), hypertension, type 2 diabetes. Vaccination status: influenza vaccine this season, pneumococcal vaccine status unknown. No recent hospitalization or antibiotic use.',
    examination: 'Confused, agitated. HR 115 bpm, BP 88/55 mmHg, RR 32/min, SpO2 88% on room air, Temp 39.2°C. Reduced breath sounds and bronchial breathing at right lower zone. Crepitations throughout right lung base.',
    differentialDiagnoses: [
      'Severe community-acquired pneumonia (CAP)',
      'Healthcare-associated pneumonia (HCAP)',
      'Acute exacerbation of COPD',
      'Pulmonary embolism with infarction',
      'Lung abscess',
      'Empyema',
      'Pulmonary edema (acute heart failure)',
    ],
    investigations: [
      { type: 'lab', name: 'Chest X-ray', findings: 'Right lower lobe consolidation with air bronchograms', isKeyFinding: true },
      { type: 'lab', name: 'Blood cultures', findings: 'Two sets collected before antibiotics' },
      { type: 'lab', name: 'Sputum culture & Gram stain', findings: 'Gram-positive diplococci, pending culture' },
      { type: 'lab', name: 'Full blood count', findings: 'WBC 18.5 × 10^9/L (neutrophilia), Hb 12.8 g/dL, platelets 350 × 10^9/L' },
      { type: 'lab', name: 'CRP', findings: '245 mg/L' },
      { type: 'lab', name: 'Procalcitonin', findings: '8.5 ng/mL' },
      { type: 'lab', name: 'Arterial blood gas', findings: 'pH 7.31, PaO2 58 mmHg, PaCO2 45 mmHg, HCO3 22 mmol/L, lactate 3.2 mmol/L' },
      { type: 'lab', name: 'Urea & Electrolytes', findings: 'Urea 12.4 mmol/L, Creatinine 145 µmol/L, eGFR 38 mL/min', isKeyFinding: true },
      { type: 'lab', name: 'Urinary antigen test', findings: 'Positive for Streptococcus pneumoniae' },
    ],
    diagnosis: 'Severe community-acquired pneumonia (PSI Class V, CURB-65 score 4) due to Streptococcus pneumoniae, with sepsis and acute kidney injury',
    pharmacologicalManagement: [
      { drug: 'Ceftriaxone', dose: '2 g', route: 'Intravenous', frequency: 'Every 12 hours', duration: '7–10 days', isFirstLine: true },
      { drug: 'Azithromycin', dose: '500 mg', route: 'Intravenous', frequency: 'Daily', duration: '5 days', isFirstLine: true, notes: 'For atypical coverage' },
      { drug: 'Norepinephrine', dose: '0.05–0.5 µg/kg/min', route: 'Intravenous infusion', frequency: 'Continuous', duration: 'As needed for MAP >65 mmHg' },
      { drug: 'Normal Saline', dose: '30 mL/kg', route: 'Intravenous', frequency: 'Bolus', duration: 'Over first hour, then reassess' },
      { drug: 'Paracetamol', dose: '1 g', route: 'Intravenous', frequency: 'Every 6 hours PRN', duration: 'For fever' },
      { drug: 'Enoxaparin', dose: '40 mg', route: 'Subcutaneous', frequency: 'Daily', duration: 'Throughout admission', notes: 'VTE prophylaxis' },
    ],
    nonPharmacologicalManagement: [
      'High-flow nasal cannula oxygen (target SpO2 ≥ 94%)',
      'ICU admission for sepsis management',
      'Chest physiotherapy and suctioning',
      'Early mobilization when hemodynamically stable',
      'Nutritional support (dietitian review)',
      'Influenza and pneumococcal vaccination planning for discharge',
    ],
    monitoring: [
      'Vital signs hourly until stable',
      'Blood cultures at 48 hours if still febrile',
      'Repeat chest X-ray at 6–8 weeks to confirm resolution',
      'Daily WBC, CRP, procalcitonin to track response',
      'Renal function daily (monitor for AKI progression)',
      'Monitor for complications: empyema, lung abscess, parapneumonic effusion',
    ],
    followUp: 'Chest X-ray in 6–8 weeks to document resolution. Pulmonary function tests at 3 months if history of COPD. Complete pneumococcal vaccination series. Annual influenza vaccine.',
    learningObjectives: [
      'Calculate CURB-65 score and classify CAP severity',
      'Select appropriate empiric antibiotics for severe CAP based on local guidelines',
      'Identify sepsis criteria and initiate early goal-directed therapy',
      'Recognize when ICU admission is indicated',
      'List complications of pneumonia and their management',
    ],
    clinicalPearls: [
      'CURB-65 ≥ 3 indicates severe pneumonia requiring hospital admission; ≥ 4 may require ICU',
      'Empiric therapy for severe CAP: beta-lactam + macrolide (or respiratory fluoroquinolone)',
      'Procalcitonin can guide antibiotic duration — consider stopping when <0.25 ng/mL',
      'Always check vaccination status — pneumococcal and influenza vaccines prevent CAP',
      'Lactate > 4 mmol/L in sepsis indicates tissue hypoperfusion and need for aggressive resuscitation',
    ],
    difficulty: 'intermediate',
    estimatedStudyMinutes: 40,
    source: {
      name: 'CDC Pneumococcal Disease Guidelines',
      url: 'https://www.cdc.gov/pneumococcal/hcp/clinical-guidance.html',
      license: 'Public Domain',
    },
    tags: ['pneumonia', 'sepsis', 'infectious diseases', 'antibiotics', 'respiratory', 'curb65'],
    references: [
      'Metlay JP, et al. Diagnosis and Treatment of Adults with CAP. Am J Respir Crit Care Med. 2019;200(7):e45-e67.',
      'Lim WS, et al. BTS Guidelines for CAP. Thorax. 2009;64(Suppl 3):iii1-iii55.',
    ],
    uploadedBy: 'system',
    createdAt: Date.now() - 86400000 * 25,
    updatedAt: Date.now(),
    version: 1,
  },

  // ================================================================
  // CLINICAL PHARMACY — Warfarin Dosing & INR Management
  // ================================================================
  {
    id: 'pharm-001',
    title: 'Warfarin Dosing and INR Management — A Clinical Pharmacy Case',
    discipline: 'Pharmacy',
    specialty: 'Clinical Pharmacy',
    subSpecialty: 'Anticoagulation Management',
    patientPresentation: 'A 65-year-old male on warfarin for atrial fibrillation (CHA₂DS₂-VASc score 4) presents with an INR of 5.8 on routine monitoring. He has no signs of bleeding but reports starting a new course of antibiotics (co-trimoxazole) for a UTI 5 days ago.',
    history: 'Atrial fibrillation (diagnosed 3 years ago), hypertension, heart failure with preserved EF. On warfarin (target INR 2.0–3.0), metoprolol, ramipril, furosemide. Recently started co-trimoxazole for UTI.',
    examination: 'No visible bleeding. HR 78 bpm (irregularly irregular), BP 128/76 mmHg. No petechiae, ecchymosis, or hematemesis. Neurological exam normal.',
    differentialDiagnoses: [
      'Warfarin overdose / supratherapeutic INR due to drug interaction',
      'Dietary change (increased vitamin K intake? decreased intake?)',
      'Acute illness causing INR elevation',
      'Liver dysfunction',
      'Laboratory error',
    ],
    investigations: [
      { type: 'lab', name: 'INR', findings: '5.8 (supratherapeutic)', isKeyFinding: true },
      { type: 'lab', name: 'aPTT', findings: '48 seconds' },
      { type: 'lab', name: 'Full blood count', findings: 'Hb 13.8 g/dL, platelets 220 × 10^9/L' },
      { type: 'lab', name: 'LFTs', findings: 'Normal ALT, AST, ALP, bilirubin' },
      { type: 'lab', name: 'Urea & Electrolytes', findings: 'Normal renal function' },
    ],
    diagnosis: 'Supratherapeutic INR (5.8) due to warfarin–co-trimoxazole drug interaction, without active bleeding',
    pharmacologicalManagement: [
      { drug: 'Warfarin', dose: 'Hold doses', route: 'Oral', frequency: 'N/A', duration: 'Until INR therapeutic', isFirstLine: true },
      { drug: 'Co-trimoxazole', dose: 'Discontinue or switch', route: 'Oral', frequency: 'N/A', duration: 'per microbiology advice', notes: 'Consider alternative antibiotic without warfarin interaction' },
      { drug: 'Vitamin K (oral)', dose: '2.5 mg', route: 'Oral', frequency: 'Single dose', duration: 'Stat', notes: 'Only if INR > 8 or risk factors for bleeding present', isFirstLine: true },
      { drug: 'Vitamin K (IV)', dose: '1–2 mg slow IV', route: 'Intravenous', frequency: 'Single dose', duration: 'Stat', notes: 'Reserved for serious bleeding or need for rapid reversal' },
    ],
    nonPharmacologicalManagement: [
      'Recheck INR in 24–48 hours after holding warfarin',
      'Patient education on drug interactions with warfarin',
      'Review all medications for potential interactions',
      'Anticoagulation clinic follow-up within 1 week',
    ],
    monitoring: [
      'Daily INR until therapeutic range achieved',
      'Monitor for signs of bleeding (hematuria, melena, gingival bleeding, neurological changes)',
      'Recheck hemoglobin if bleeding suspected',
    ],
    followUp: 'Warfarin restarted at reduced dose (10–20% reduction) once INR < 3.0. Consider switching to DOAC (apixaban or rivaroxaban) to avoid future drug interactions. Anticoagulation clinic follow-up in 1 week.',
    learningObjectives: [
      'Identify clinically significant drug interactions with warfarin',
      'Develop a management plan for supratherapeutic INR without bleeding',
      'Calculate the CHA₂DS₂-VASc score and assess thromboembolic risk',
      'Recommend appropriate anticoagulant alternatives for patients with drug interaction concerns',
      'Explain the mechanism of warfarin–antibiotic interactions (gut flora depletion, CYP inhibition)',
    ],
    clinicalPearls: [
      'Warfarin interactions are common — always check before adding new medications',
      'Co-trimoxazole potentiates warfarin by inhibiting CYP2C9 and displacing protein binding',
      'For INR 4.5–10 without bleeding: hold warfarin, no routine vitamin K',
      'For INR > 10 without bleeding: hold warfarin, give 2.5 mg oral vitamin K',
      'DOACs have significantly fewer drug interactions — consider switching after this episode',
    ],
    difficulty: 'intermediate',
    estimatedStudyMinutes: 35,
    source: {
      name: 'ACCP Antithrombotic Guidelines / CDC',
      url: 'https://www.accp.org',
      license: 'Open Access',
    },
    tags: ['warfarin', 'anticoagulation', 'drug interaction', 'clinical pharmacy', 'inr management'],
    references: [
      'Witt DM, et al. American Society of Hematology Guidelines for VTE Management. Blood Adv. 2018;2(22):3257-3291.',
      'Holbrook A, et al. Evidence-based management of anticoagulant therapy. Chest. 2012;141(2 Suppl):e152S-e184S.',
    ],
    uploadedBy: 'system',
    createdAt: Date.now() - 86400000 * 20,
    updatedAt: Date.now(),
    version: 1,
  },

  // ================================================================
  // INTERNAL MEDICINE — Diabetic Ketoacidosis
  // ================================================================
  {
    id: 'med-001',
    title: 'Diabetic Ketoacidosis — Emergency Management',
    discipline: 'Clinical Medicine',
    specialty: 'Internal Medicine',
    subSpecialty: 'Endocrinology',
    patientPresentation: 'A 22-year-old female with type 1 diabetes mellitus presents with 2-day history of polyuria, polydipsia, vomiting, and abdominal pain. She stopped her insulin 2 days ago because she "could not afford to buy a new vial." She is drowsy and breathing deeply.',
    history: 'Type 1 diabetes since age 10. Previous DKA admissions (2 in the past year, both due to insulin non-adherence). Uses Novorapid and Lantus. No other medical history.',
    examination: 'Drowsy but rousable. HR 115 bpm, BP 95/60 mmHg, RR 28/min (Kussmaul respirations), Temp 37.1°C. Fruity odor on breath. Skin turgor reduced. Capillary refill 4 seconds. Abdomen tender diffusely without guarding.',
    differentialDiagnoses: [
      'Diabetic ketoacidosis (DKA)',
      'Hyperosmolar hyperglycemic state (HHS)',
      'Acute pancreatitis',
      'Acute appendicitis',
      'Sepsis presenting with abdominal pain',
      'Starvation ketosis',
    ],
    investigations: [
      { type: 'lab', name: 'Capillary blood glucose', findings: '24.5 mmol/L', isKeyFinding: true },
      { type: 'lab', name: 'Venous blood gas', findings: 'pH 7.05, HCO3 6 mmol/L, pCO2 18 mmHg, base excess -18', isKeyFinding: true },
      { type: 'lab', name: 'Serum ketones (beta-hydroxybutyrate)', findings: '6.8 mmol/L (normal <0.6)', isKeyFinding: true },
      { type: 'lab', name: 'Urea & Electrolytes', findings: 'Sodium 132 (corrected Na 140), Potassium 5.1, Creatinine 115 µmol/L' },
      { type: 'lab', name: 'Full blood count', findings: 'WBC 14.5 × 10^9/L, Hb 14.0 g/dL, platelets 280 × 10^9/L' },
      { type: 'lab', name: 'Urinalysis', findings: 'Glucose 4+, ketones 3+' },
      { type: 'lab', name: 'ECG', findings: 'Sinus tachycardia, peaked T waves (consistent with hyperkalemia)' },
    ],
    diagnosis: 'Severe diabetic ketoacidosis (pH 7.05) precipitated by insulin omission, with hyperkalemia and acute kidney injury (AKI stage 1)',
    pharmacologicalManagement: [
      { drug: 'Normal Saline (0.9% NaCl)', dose: '1 L', route: 'Intravenous', frequency: 'Over first hour', duration: 'Rapid bolus', isFirstLine: true },
      { drug: 'Normal Saline (0.9% NaCl)', dose: '1 L over 2 hours, then 1 L over 4 hours, then 1 L over 6 hours', route: 'Intravenous', frequency: 'Per DKA protocol', duration: 'Over 12 hours', isFirstLine: true },
      { drug: 'Actrapid (Soluble Insulin)', dose: '0.1 units/kg IV bolus, then 0.1 units/kg/hr', route: 'Intravenous infusion', frequency: 'Continuous', duration: 'Until DKA resolved', isFirstLine: true },
      { drug: 'Potassium Chloride', dose: '40 mmol/L in maintenance IV fluids', route: 'Intravenous', frequency: 'Per protocol', duration: 'When K+ < 5.5 mEq/L', notes: 'Add once potassium < 5.5 and urine output established' },
      { drug: 'Fixed-rate insulin infusion adjustment', dose: 'Increase by 1 unit/hr if glucose not falling by 3 mmol/L/hr', route: 'Intravenous', frequency: 'Hourly check', duration: 'Until resolution' },
    ],
    nonPharmacologicalManagement: [
      'Admit to HDU/ICU for close monitoring',
      'Hourly capillary blood glucose monitoring',
      'Urinary catheter for accurate fluid balance',
      'NG tube if vomiting or reduced consciousness',
      'Social work referral for insulin access issues',
      'Diabetes educator consultation at discharge',
    ],
    monitoring: [
      'Hourly capillary glucose until stable, then 2-hourly',
      'Venous blood gas at 2, 4, 6, 12 hours (pH, HCO3, potassium)',
      'Serum potassium hourly for first 4 hours',
      'Fluid balance chart (strict input/output)',
      'GCS monitoring hourly',
      'Monitor for cerebral edema (headache, bradycardia, hypertension, declining GCS)',
    ],
    followUp: 'Transition to subcutaneous insulin when DKA resolved (pH >7.3, HCO3 >18, glucose <12 mmol/L). Start basal insulin 2 hours before stopping IV insulin. Outpatient endocrinology follow-up within 2 weeks. Social services referral for medication access assistance.',
    learningObjectives: [
      'Diagnose DKA using the triad of hyperglycemia, acidosis, and ketosis',
      'Implement the DKA management protocol: fluid resuscitation, insulin infusion, potassium replacement',
      'Identify the complications of DKA treatment (hypoglycemia, hypokalemia, cerebral edema)',
      'Understand the indications for transitioning from IV to subcutaneous insulin',
      'Recognize social determinants affecting diabetes management and adherence',
    ],
    clinicalPearls: [
      'Correct sodium for hyperglycemia: corrected Na = measured Na + 0.016 × (glucose in mg/dL − 100)',
      'Do not stop insulin infusion even when glucose falls — add dextrose to fluids instead',
      'Cerebral edema is the most feared complication in children; monitor GCS closely',
      'Bicarbonate is NOT routinely recommended in DKA (risk of paradoxical CSF acidosis)',
      'Always identify the precipitating cause: infection, missed insulin, MI, new diagnosis',
    ],
    difficulty: 'advanced',
    estimatedStudyMinutes: 50,
    source: {
      name: 'Joint British Diabetes Societies DKA Guidelines',
      url: 'https://abcd.care/resource/dka',
      license: 'Open Access',
    },
    tags: ['dka', 'diabetes', 'ketoacidosis', 'emergency', 'endocrinology', 'insulin'],
    references: [
      'Joint British Diabetes Societies. Management of DKA in Adults. JBDS 03. 2021 Update.',
      'Kitabchi AE, et al. Hyperglycemic crises in adult patients with diabetes. Diabetes Care. 2009;32(7):1335-1343.',
    ],
    uploadedBy: 'system',
    createdAt: Date.now() - 86400000 * 15,
    updatedAt: Date.now(),
    version: 1,
  },

  // ================================================================
  // NEUROLOGY — Acute Ischemic Stroke
  // ================================================================
  {
    id: 'neuro-001',
    title: 'Acute Ischemic Stroke — Thrombolysis Decision Making',
    discipline: 'Clinical Medicine',
    specialty: 'Neurology',
    subSpecialty: 'Cerebrovascular Disease',
    patientPresentation: 'A 70-year-old female presents with sudden onset of right-sided weakness and inability to speak, starting 1 hour and 45 minutes ago. Her husband noticed her collapse in the kitchen. She has a history of hypertension and atrial fibrillation (not on anticoagulation).',
    history: 'Hypertension, atrial fibrillation (paroxysmal, CHA₂DS₂-VASc 5), previous TIA 6 months ago (left arm weakness, resolved in 30 minutes). No previous stroke. Not on any antithrombotic therapy.',
    examination: 'HR 85 bpm (irregularly irregular), BP 168/94 mmHg. Neurological: right-sided facial droop, right arm drift (both severe), right leg weakness (mild), global aphasia. NIHSS score = 14. GCS 14 (E4, V4, M6).',
    differentialDiagnoses: [
      'Acute ischemic stroke (large vessel occlusion — likely MCA territory)',
      'Intracerebral hemorrhage',
      'Subarachnoid hemorrhage',
      'Seizure with Todd\'s paralysis',
      'Hypoglycemia mimicking stroke',
      'Migraine with aura / hemiplegic migraine',
      'Functional neurological disorder',
    ],
    investigations: [
      { type: 'imaging', name: 'Non-contrast CT Head', findings: 'No intracranial hemorrhage. ASPECTS score 9. Hyperdense left MCA sign noted.', isKeyFinding: true },
      { type: 'imaging', name: 'CT Angiography', findings: 'Left M1 MCA occlusion with good collateral circulation', isKeyFinding: true },
      { type: 'imaging', name: 'CT Perfusion', findings: 'Core infarct 15 mL, penumbra 95 mL (mismatch ratio > 6:1)' },
      { type: 'lab', name: 'Capillary blood glucose', findings: '6.8 mmol/L (rule out hypoglycemia)' },
      { type: 'lab', name: 'Full blood count', findings: 'Hb 13.5 g/dL, Platelets 210 × 10^9/L' },
      { type: 'lab', name: 'Coagulation profile (INR, aPTT)', findings: 'INR 1.1, aPTT 30 seconds' },
      { type: 'lab', name: 'ECG', findings: 'Atrial fibrillation, rate 85 bpm' },
    ],
    diagnosis: 'Acute ischemic stroke due to left M1 MCA occlusion (cardioembolic, secondary to atrial fibrillation) with mild core and large penumbra',
    pharmacologicalManagement: [
      { drug: 'Alteplase (tPA)', dose: '0.9 mg/kg (max 90 mg); 10% as bolus, 90% over 1 hour', route: 'Intravenous', frequency: 'Single dose', duration: 'Over 1 hour', notes: 'Last known well 1h45m ago — within 4.5 hour window', isFirstLine: true },
      { drug: 'Aspirin', dose: '300 mg', route: 'Oral (or via NG tube)', frequency: 'Stat', duration: 'Loading dose', notes: 'Start 24 hours after tPA if no hemorrhage on follow-up CT' },
      { drug: 'Blood Pressure Management', dose: 'Target BP < 185/110 for tPA, maintain < 180/105 during/after', route: 'Various', frequency: 'Per protocol', duration: 'First 24 hours' },
    ],
    nonPharmacologicalManagement: [
      'Mechanical thrombectomy (endovascular) for M1 MCA occlusion — within 6 hours (or up to 24 hours with perfusion mismatch)',
      'Admit to stroke unit / neurocritical care',
      'Nil by mouth until swallow assessment',
      'Head of bed elevated 30°',
      'Continuous cardiac monitoring for 72 hours',
      'Early mobilization (stroke physiotherapy) after 24 hours',
    ],
    monitoring: [
      'Neurological checks (NIHSS) every 15 min during tPA, every 30 min for 6 hours, then hourly for 24 hours',
      'BP monitoring every 15 min for 2 hours, then every 30 min for 6 hours, then hourly',
      'CT head at 24 hours to assess for hemorrhagic transformation',
      'Swallow assessment before oral intake',
      'Monitor for bleeding (gingival, injection sites, hematuria, intracranial)',
    ],
    followUp: 'Start anticoagulation for AF at 2–4 weeks post-stroke (if no hemorrhagic transformation). Start statin (atorvastatin 80 mg). Carotid Doppler to rule out concurrent carotid disease. Cardiac monitoring for 72h + outpatient Holter if paroxysmal AF suspected. Stroke prevention clinic at 3 months.',
    learningObjectives: [
      'Calculate NIHSS score and interpret its prognostic significance',
      'Identify candidates for IV thrombolysis using inclusion/exclusion criteria',
      'Interpret CT perfusion to differentiate core from penumbra',
      'Describe the management of blood pressure in acute stroke',
      'Discuss the timing of anticoagulation initiation post-stroke in AF patients',
    ],
    clinicalPearls: [
      'Time is brain: ~1.9 million neurons lost per minute in untreated stroke',
      'NIHSS > 10 suggests large vessel occlusion — activate endovascular team',
      'CT perfusion with mismatch ratio > 1.8 can extend thrombolysis window to 9 hours',
      'DOACs should be started 4–14 days post-stroke based on infarct size (1-3-6-12 rule)',
      'Every 15-minute delay in tPA reduces odds of good outcome by 4-5%',
    ],
    difficulty: 'advanced',
    estimatedStudyMinutes: 55,
    source: {
      name: 'AHA/ASA Acute Stroke Guidelines',
      url: 'https://professional.heart.org/en/guidelines-and-statements/acute-stroke',
      license: 'Open Access',
    },
    tags: ['stroke', 'thrombolysis', 'neurology', 'tpa', 'brain attack', 'cerebrovascular'],
    references: [
      'Powers WJ, et al. 2019 AHA/ASA Guidelines for Acute Ischemic Stroke. Stroke. 2019;50(12):e344-e418.',
      'Campbell BCV, et al. Ischaemic stroke. Nat Rev Dis Primers. 2019;5(1):70.',
    ],
    uploadedBy: 'system',
    createdAt: Date.now() - 86400000 * 10,
    updatedAt: Date.now(),
    version: 1,
  },

  // ================================================================
  // PEDIATRICS — Severe Malaria in a Child
  // ================================================================
  {
    id: 'peds-001',
    title: 'Severe Falciparum Malaria in a 3-Year-Old Child',
    discipline: 'Clinical Medicine',
    specialty: 'Pediatrics',
    subSpecialty: 'Infectious Diseases',
    patientPresentation: 'A 3-year-old boy is brought to the district hospital with a 3-day history of high fever, vomiting, and lethargy. He has had two convulsions in the past 12 hours. His mother reports he has been sleeping more than usual and refusing to eat or drink.',
    history: 'Lives in a malaria-endemic region (western Kenya). No prior malaria prophylaxis. No known drug allergies. Vaccinations incomplete per mother. No significant past medical history.',
    examination: 'Child is lethargic, difficult to rouse. Temp 39.8°C, HR 160 bpm, BP 75/40 mmHg, RR 40/min, SpO2 91% on room air. Pale conjunctivae. No neck stiffness. Liver and spleen palpable 3 cm and 4 cm below costal margins. Skin: cool, mottled extremities, no rash.',
    differentialDiagnoses: [
      'Severe falciparum malaria with cerebral malaria',
      'Bacterial meningitis',
      'Sepsis (any source)',
      'Status epilepticus from non-malaria cause',
      'Acute encephalitis syndrome',
      'Diabetic ketoacidosis',
      'Acute intoxication',
    ],
    investigations: [
      { type: 'lab', name: 'Rapid diagnostic test (RDT) for malaria', findings: 'Positive for P. falciparum (HRP2)', isKeyFinding: true },
      { type: 'lab', name: 'Blood smear (thick and thin film)', findings: '17% parasitemia (P. falciparum), >10,000 parasites/µL — hyperparasitemia', isKeyFinding: true },
      { type: 'lab', name: 'Full blood count', findings: 'Hb 5.8 g/dL (severe anemia), WBC 9.5 × 10^9/L, Platelets 45 × 10^9/L (thrombocytopenia)', isKeyFinding: true },
      { type: 'lab', name: 'Blood glucose', findings: '2.4 mmol/L (severe hypoglycemia)', isKeyFinding: true },
      { type: 'lab', name: 'Lumbar puncture (CSF analysis)', findings: 'CSF clear, protein 25 mg/dL, glucose 3.0 mmol/L, no organisms. Ruled out meningitis.' },
      { type: 'lab', name: 'Blood culture', findings: 'No growth after 48 hours' },
      { type: 'lab', name: 'Urea & Electrolytes', findings: 'Creatinine 135 µmol/L, Sodium 128, Potassium 5.2 — mild AKI' },
      { type: 'lab', name: 'Lactate', findings: '6.5 mmol/L (elevated)' },
    ],
    diagnosis: 'Severe P. falciparum malaria with cerebral malaria (2 convulsions, reduced GCS), severe anemia (Hb 5.8), hypoglycemia (2.4 mmol/L), hyperparasitemia (17%), and acute kidney injury',
    pharmacologicalManagement: [
      { drug: 'Artesunate (IV)', dose: '2.4 mg/kg IV at 0, 12, 24, and 48 hours', route: 'Intravenous', frequency: 'At 0, 12, 24, 48h', duration: 'Minimum 24 hours, then switch to oral', isFirstLine: true, notes: 'WHO-recommended first-line for severe malaria' },
      { drug: 'IV Dextrose 10%', dose: '5 mL/kg bolus, then 2 mL/kg/hr maintenance', route: 'Intravenous', frequency: 'Bolus then continuous', duration: 'Until blood glucose > 4 mmol/L', isFirstLine: true },
      { drug: 'Blood transfusion (packed red cells)', dose: '20 mL/kg', route: 'Intravenous', frequency: 'Over 3–4 hours', duration: 'Single transfusion, reassess Hb' },
      { drug: 'IV Fluids (0.9% NaCl)', dose: '10 mL/kg bolus, then maintenance', route: 'Intravenous', frequency: 'Careful fluid resuscitation', duration: 'Monitor for fluid overload', notes: 'Conservative — risk of pulmonary edema in severe malaria' },
      { drug: 'Diazepam (rectal/IV)', dose: '0.3 mg/kg IV (or 0.5 mg/kg PR)', route: 'Intravenous/Rectal', frequency: 'PRN for seizures', duration: 'Acute seizure management' },
      { drug: 'Paracetamol', dose: '15 mg/kg', route: 'Intravenous/Oral', frequency: 'Every 6 hours', duration: 'For fever' },
    ],
    nonPharmacologicalManagement: [
      'Admit to pediatric high dependency unit',
      'Seizure precautions (padding, airway equipment at bedside)',
      'Frequent neurological observations (GCS/Blantyre coma score)',
      'Temperature monitoring and management',
      'Insecticide-treated bed net provision for family',
      'Health education on malaria prevention (ITN use, prompt care-seeking)',
    ],
    monitoring: [
      'GCS/Blantyre coma score hourly',
      'Parasitemia level every 12 hours until < 1%',
      'Blood glucose every 2 hours until stable',
      'Hemoglobin at 24 and 48 hours',
      'Urine output (strict fluid balance)',
      'Monitor for pulmonary edema (respiratory rate, SpO2, crepitations)',
    ],
    followUp: 'Complete oral artemisinin-based combination therapy (ACT) when able to tolerate oral: artemether-lumefantrine (Coartem) for 3 days. Iron supplementation for 12 weeks to correct anemia. Follow-up at 2 weeks for blood smear to confirm parasite clearance. Complete routine vaccinations.',
    learningObjectives: [
      'Diagnose severe malaria using WHO criteria (impaired consciousness, severe anemia, hypoglycemia, hyperparasitemia, etc.)',
      'Administer IV artesunate correctly for severe malaria',
      'Manage complications: cerebral malaria, severe anemia, hypoglycemia, AKI',
      'Differentiate cerebral malaria from other causes of febrile encephalopathy',
      'Develop a discharge plan including malaria prevention strategies',
    ],
    clinicalPearls: [
      'WHO criteria for severe malaria: any of impaired consciousness, prostration, multiple convulsions, severe anemia (Hb <5), hypoglycemia, hyperparasitemia (>10%), jaundice, AKI, pulmonary edema, shock, DIC',
      'IV artesunate is superior to IV quinine — reduces mortality by 22.5% in severe malaria',
      'Hypoglycemia in severe malaria is multifactorial: quinine-induced, reduced intake, increased consumption',
      'Blood transfusion threshold in severe malaria: Hb <5 g/dL or <6 with respiratory distress',
      'Cerebral malaria: 10% mortality, 10-20% survivors may have neurological sequelae',
    ],
    difficulty: 'advanced',
    estimatedStudyMinutes: 50,
    source: {
      name: 'WHO Guidelines for Malaria Treatment',
      url: 'https://www.who.int/publications/i/item/9789241549127',
      license: 'WHO Open Access (CC BY-NC-SA 3.0 IGO)',
      attribution: 'World Health Organization',
    },
    tags: ['malaria', 'pediatrics', 'cerebral malaria', 'severe malaria', 'infectious disease', 'tropical medicine', 'artesunate'],
    references: [
      'WHO. Guidelines for the Treatment of Malaria. 3rd Edition. Geneva: WHO; 2015.',
      'Dondorp AM, et al. Artesunate versus quinine for treatment of severe falciparum malaria. Lancet. 2010;376(9753):1647-1657.',
      'WHO. Integrated Management of Childhood Illness (IMCI) Guidelines. 2014.',
    ],
    uploadedBy: 'system',
    createdAt: Date.now() - 86400000 * 8,
    updatedAt: Date.now(),
    version: 1,
  },

  // ================================================================
  // OBSTETRICS — Postpartum Hemorrhage
  // ================================================================
  {
    id: 'obs-001',
    title: 'Postpartum Hemorrhage — The Leading Cause of Maternal Mortality',
    discipline: 'Clinical Medicine',
    specialty: 'Obstetrics',
    patientPresentation: 'A 28-year-old primigravida delivered a 3.8 kg baby by vacuum extraction 20 minutes ago. Immediately following delivery of the placenta, there is profuse vaginal bleeding. Estimated blood loss is now >1,000 mL and ongoing.',
    history: 'Full-term pregnancy (40 weeks), uneventful antenatal care. Prolonged second stage of labor (3 hours) requiring vacuum extraction. No known coagulopathy. No prior surgeries.',
    examination: 'Pale, anxious. HR 130 bpm, BP 85/50 mmHg, RR 26/min, SpO2 94% on room air. Uterus: Boggy, atonic, fundus at umbilicus. Perineum: Second-degree perineal tear, sutured. Vagina: Active bleeding, clots expressed.',
    differentialDiagnoses: [
      'Uterine atony (most common — 80% of PPH)',
      'Genital tract trauma (cervical/vaginal lacerations)',
      'Retained placental tissue',
      'Coagulopathy (secondary to PPH or pre-existing)',
      'Uterine rupture',
      'Uterine inversion',
    ],
    investigations: [
      { type: 'lab', name: 'Estimated blood loss', findings: '>1,000 mL within 20 minutes postpartum', isKeyFinding: true },
      { type: 'lab', name: 'Full blood count', findings: 'Hb 8.2 g/dL (dropped from 12.1), Platelets 160 × 10^9/L' },
      { type: 'lab', name: 'Coagulation screen', findings: 'INR 1.3, aPTT 36 seconds, Fibrinogen 1.8 g/L (low)' },
      { type: 'lab', name: 'Blood gases', findings: 'pH 7.28, lactate 4.5 mmol/L' },
      { type: 'lab', name: 'Cross-match', findings: '4 units packed red cells requested' },
    ],
    diagnosis: 'Primary postpartum hemorrhage (>1,000 mL) due to uterine atony, complicated by hypovolemic shock',
    pharmacologicalManagement: [
      { drug: 'Oxytocin', dose: '10 IU intramuscular, then 40 IU in 500 mL NaCl at 125 mL/hr', route: 'IM then IV infusion', frequency: 'Stat, then continuous', duration: 'Ongoing', isFirstLine: true },
      { drug: 'Ergometrine', dose: '0.5 mg', route: 'Intramuscular', frequency: 'Stat (can repeat once after 15 min)', duration: 'Single doses', notes: 'Contraindicated in hypertension and preeclampsia' },
      { drug: 'Carboprost (PGF2-alpha)', dose: '250 µg', route: 'Intramuscular (deep)', frequency: 'Every 15 minutes, max 8 doses', duration: 'PRN', notes: 'Contraindicated in asthma' },
      { drug: 'Misoprostol', dose: '600–800 µg', route: 'Sublingual/Rectal', frequency: 'Single dose', duration: 'Stat' },
      { drug: 'Tranexamic Acid', dose: '1 g IV over 10 minutes', route: 'Intravenous', frequency: 'Stat, can repeat after 30 minutes', duration: 'Maximum 2 doses', isFirstLine: true, notes: 'WOMAN trial evidence: reduces death from bleeding' },
      { drug: 'Packed Red Cells', dose: '2–4 units', route: 'Intravenous', frequency: 'Per resuscitation protocol', duration: 'Ongoing' },
      { drug: 'Fresh Frozen Plasma / Cryoprecipitate', dose: 'Per massive transfusion protocol', route: 'Intravenous', frequency: 'Per protocol', duration: 'As needed' },
    ],
    nonPharmacologicalManagement: [
      'Uterine massage (bimanual compression)',
      'Empty bladder (catheterize)',
      'IV access × 2 large-bore (16G) cannulae',
      'Activate massive transfusion protocol',
      'Intrauterine balloon (Bakri balloon) tamponade if medical management fails',
      'Prepare for surgical intervention: compression sutures (B-Lynch), uterine artery ligation, hysterectomy if refractory',
    ],
    monitoring: [
      'Vital signs every 5 minutes until stable',
      'Continuous blood loss quantification',
      'Hourly urine output (target > 0.5 mL/kg/hr)',
      'Repeat Hb and coagulation after each 4 units transfused',
      'Monitor for complications: Sheehan syndrome, DIC, acute kidney injury',
    ],
    followUp: 'Postnatal day 1: Hb check, iron supplementation for 3 months. Counseling regarding future pregnancy risks (recurrence of PPH, need for hospital delivery). Contraception counseling before discharge.',
    learningObjectives: [
      'Recognize PPH as a medical emergency requiring immediate action',
      'Implement the PPH management algorithm: medical → mechanical → surgical',
      'Calculate the correct doses of uterotonic drugs',
      'Describe the massive transfusion protocol for obstetric hemorrhage',
      'Identify the indications for surgical intervention in PPH',
    ],
    clinicalPearls: [
      'PPH is the leading cause of maternal mortality in sub-Saharan Africa',
      'The "4 T\'s" of PPH: Tone (atony), Trauma (laceration), Tissue (retained), Thrombin (coagulopathy)',
      'Active management of third stage of labor reduces PPH risk by 60%',
      'Tranexamic acid within 3 hours of PPH onset reduces death from bleeding (WOMAN trial)',
      'Every minute delay in treating PPH worsens outcome — use "obstetric fire drill" simulation training',
    ],
    difficulty: 'advanced',
    estimatedStudyMinutes: 45,
    source: {
      name: 'WHO Guidelines for PPH Management',
      url: 'https://www.who.int/publications/i/item/9789241548502',
      license: 'WHO Open Access (CC BY-NC-SA 3.0 IGO)',
    },
    tags: ['postpartum hemorrhage', 'obstetrics', 'maternal health', 'emergency', 'uterotonics', 'pph'],
    references: [
      'WHO. WHO Recommendations for the Prevention and Treatment of PPH. Geneva: WHO; 2012.',
      'WOMAN Trial Collaborators. Effect of early tranexamic acid on mortality in women with PPH. Lancet. 2017;389(10084):2105-2116.',
    ],
    uploadedBy: 'system',
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now(),
    version: 1,
  },
];

/**
 * Get all clinical cases
 */
export function getAllCases(): ClinicalCase[] {
  return CLINICAL_CASES;
}

/**
 * Get a specific case by its ID
 */
export function getCaseById(caseId: string): ClinicalCase | undefined {
  return CLINICAL_CASES.find((c) => c.id === caseId);
}

/**
 * Filter cases by specialty
 */
export function getCasesBySpecialty(specialty: string): ClinicalCase[] {
  return CLINICAL_CASES.filter((c) => c.specialty.toLowerCase() === specialty.toLowerCase());
}

/**
 * Filter cases by discipline
 */
export function getCasesByDiscipline(discipline: string): ClinicalCase[] {
  return CLINICAL_CASES.filter((c) => c.discipline === discipline);
}

/**
 * Filter cases by difficulty
 */
export function getCasesByDifficulty(difficulty: 'basic' | 'intermediate' | 'advanced'): ClinicalCase[] {
  return CLINICAL_CASES.filter((c) => c.difficulty === difficulty);
}

/**
 * Search cases by keyword (searches title, specialty, diagnosis, tags)
 */
export function searchCases(query: string): ClinicalCase[] {
  const q = query.toLowerCase();
  return CLINICAL_CASES.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.specialty.toLowerCase().includes(q) ||
      c.diagnosis.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q)) ||
      c.learningObjectives.some((lo) => lo.toLowerCase().includes(q)),
  );
}

/**
 * Get all unique specialties across all cases
 */
export function getAllSpecialties(): string[] {
  return [...new Set(CLINICAL_CASES.map((c) => c.specialty))].sort();
}

/**
 * Get all unique disciplines across all cases
 */
export function getAllDisciplines(): string[] {
  return [...new Set(CLINICAL_CASES.map((c) => c.discipline))].sort();
}

/**
 * Get cases requiring the least study time (quick study)
 */
export function getQuickStudyCases(minutes: number = 30): ClinicalCase[] {
  return CLINICAL_CASES.filter((c) => c.estimatedStudyMinutes <= minutes);
}

/**
 * Count cases by specialty for analytics
 */
export function getCaseStats() {
  const bySpecialty: Record<string, number> = {};
  const byDifficulty: Record<string, number> = { basic: 0, intermediate: 0, advanced: 0 };
  const byDiscipline: Record<string, number> = {};

  CLINICAL_CASES.forEach((c) => {
    bySpecialty[c.specialty] = (bySpecialty[c.specialty] || 0) + 1;
    byDiscipline[c.discipline] = (byDiscipline[c.discipline] || 0) + 1;
    byDifficulty[c.difficulty]++;
  });

  return {
    total: CLINICAL_CASES.length,
    bySpecialty,
    byDifficulty,
    byDiscipline,
  };
}
