export interface ClinicalCase {
  id: string;
  specialty: string;
  disease: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  demographics: string;
  chiefComplaint: string;
  hpi: string;
  pmh: string;
  medHx: string;
  allergies: string;
  pe: string;
  vitals: string;
  labs: string;
  imaging?: string;
  diagnosis: string;
  ddx: string[];
  goals: string;
  pharm: string;
  nonPharm: string;
  carePlan: string;
  dtps: string;
  monitoring: string;
  counselling: string;
  followUp: string;
  pearls: string;
  references: string[];
  createdAt: any;
  status: 'published' | 'draft';
  createdBy: string;
  createdByName: string;
}

export const SPECIALTIES = [
  'Cardiology',
  'Respiratory Medicine',
  'Endocrinology',
  'Infectious Diseases',
  'Nephrology',
  'Gastroenterology',
  'Neurology',
  'Psychiatry',
  'Hematology',
  'Oncology',
  'Pediatrics',
  'Obstetrics & Gynecology',
  'Emergency Medicine'
];

export const DISEASES_BY_SPECIALTY: Record<string, string[]> = {
  'Cardiology': ['Hypertension', 'Heart Failure', 'Acute Coronary Syndrome', 'Stable Angina', 'Atrial Fibrillation', 'Infective Endocarditis'],
  'Respiratory Medicine': ['Asthma', 'COPD', 'Pneumonia', 'Tuberculosis', 'Pulmonary Embolism'],
  'Endocrinology': ['Diabetes Mellitus', 'Diabetic Ketoacidosis', 'Hyperthyroidism', 'Hypothyroidism'],
  'Infectious Diseases': ['HIV/AIDS', 'Malaria', 'Typhoid Fever', 'Urinary Tract Infection', 'Sepsis', 'Meningitis', 'Cellulitis'],
  'Nephrology': ['Acute Kidney Injury', 'Chronic Kidney Disease', 'Nephrotic Syndrome'],
  'Gastroenterology': ['GERD', 'Peptic Ulcer Disease', 'Liver Cirrhosis', 'Hepatitis', 'Acute Pancreatitis'],
  'Neurology': ['Stroke', 'Epilepsy', 'Parkinson Disease', 'Migraine'],
  'Psychiatry': ['Depression', 'Schizophrenia', 'Bipolar Disorder', 'Anxiety Disorders'],
  'Hematology': ['Iron Deficiency Anaemia', 'Sickle Cell Disease', 'Leukemia', 'Venous Thromboembolism'],
  'Oncology': ['Breast Cancer', 'Colorectal Cancer', 'Prostate Cancer', 'Chemotherapy Supportive Care'],
  'Pediatrics': ['Neonatal Sepsis', 'Childhood Pneumonia', 'Acute Diarrhea', 'Pediatric Malaria'],
  'Obstetrics & Gynecology': ['Preeclampsia', 'Eclampsia', 'Gestational Diabetes', 'Postpartum Hemorrhage'],
  'Emergency Medicine': ['Poisoning', 'Anaphylaxis', 'Status Epilepticus', 'Septic Shock', 'Cardiac Arrest']
};

export const INITIAL_CASES: ClinicalCase[] = [
  {
    id: 'case-1',
    specialty: 'Cardiology',
    disease: 'Heart Failure',
    title: 'Decompensated HFrEF with Digoxin Toxicity',
    difficulty: 'Advanced',
    demographics: '82-year-old female, 58 kg',
    chiefComplaint: 'Severe progressive fatigue, anorexia, nausea, and experiencing "yellow-green halos" around lights for the past 3 days.',
    hpi: 'Patient has a history of HFrEF and atrial fibrillation. She was doing well until 3 days ago when she started having nausea and visual disturbances.',
    pmh: 'Heart Failure with reduced Ejection Fraction (HFrEF, EF 30%), Atrial Fibrillation, Hypertension, Chronic Kidney Disease Stage 4.',
    medHx: 'Digoxin 0.25 mg daily, Furosemide 40 mg daily, Lisinopril 10 mg daily.',
    allergies: 'NKDA',
    pe: 'General: Fatigued, mildly confused. CV: Irregularly irregular rhythm. Lungs: Clear to auscultation. Ext: 1+ pitting edema.',
    vitals: 'HR 46 bpm (irregular), BP 98/54 mmHg, RR 18 breaths/min, Temp 36.6°C.',
    labs: 'Serum Creatinine: 2.1 mg/dL (Baseline: 0.9 mg/dL). eGFR: 22 mL/min/1.73m2. Serum Potassium: 3.1 mEq/L (Normal: 3.5 - 5.0 mEq/L). Serum Digoxin Concentration: 3.4 ng/mL (Therapeutic: 0.5 - 0.9 ng/mL).',
    imaging: 'ECG: Atrial fibrillation with slow ventricular response (45 bpm), frequent PVCs, and scooping of the ST-segment ("digoxin effect").',
    diagnosis: 'Digoxin Toxicity exacerbated by hypokalemia and Acute-on-Chronic Kidney Injury.',
    ddx: ['Digoxin toxicity', 'Ischemic stroke', 'Electrolyte imbalance', 'Worsening Heart Failure'],
    goals: 'Reverse digoxin toxicity, correct hypokalemia, manage acute kidney injury, stabilize heart rate.',
    pharm: 'Hold Digoxin, Hold Furosemide, Hold Lisinopril. Administer IV/Oral Potassium carefully. Consider Digoxin-specific antibody fragments (Digibind) if hemodynamically unstable or life-threatening arrhythmias occur.',
    nonPharm: 'Continuous cardiac monitoring, fluid status monitoring.',
    carePlan: 'Immediate admission to telemetry. Correct K+ to >4.0 mEq/L. Reassess renal function daily. Re-evaluate need for digoxin long-term; prefer GDMT for HFrEF when stable (e.g., low-dose beta-blocker, ARNI/ACEi, MRA, SGLT2i) adjusted for renal function.',
    dtps: '1. Adverse drug reaction: Digoxin toxicity due to reduced renal clearance. 2. Drug interaction / Toxicity: Furosemide-induced hypokalemia increasing digoxin binding/toxicity.',
    monitoring: 'Daily BMP (K+, BUN, SCr), ECG monitoring, Digoxin levels (though may be falsely elevated post-Digibind).',
    counselling: 'Educate patient on signs of digoxin toxicity (nausea, visual changes). Discuss importance of adhering to lab appointments.',
    followUp: 'Re-evaluate in 1 week post-discharge for renal function and volume status.',
    pearls: 'Digoxin is primarily cleared by the kidneys. Aging and CKD require lower doses (e.g., 0.125 mg daily or every other day). Hypokalemia sensitizes the myocardium to digoxin toxicity even at "normal" serum levels.',
    references: ['Clinical Cases in Clinical Pharmacology', 'AHA/ACC Heart Failure Guidelines'],
    createdAt: new Date().toISOString(),
    status: 'published',
    createdBy: 'system',
    createdByName: 'Clinical Faculty'
  }
];
