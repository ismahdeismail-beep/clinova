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
  },
  {
    id: 'case-2',
    specialty: 'Pediatrics',
    disease: 'Childhood Pneumonia',
    title: 'Severe Childhood Pneumonia in a 14-Month-Old with Mild Dehydration',
    difficulty: 'Intermediate',
    demographics: '14-month-old male, 10 kg',
    chiefComplaint: 'Rapid breathing, high fever, and poor feeding for 2 days.',
    hpi: 'Presented with a 3-day history of dry cough and rhinorrhea that progressed to high fever, decreased activity, tachypnea, and chest indrawing. He is resisting drinking liquids and breast milk.',
    pmh: 'Unremarkable. Fully immunised according to KEPI (Kenya Expanded Programme on Immunization) standards including PCV-10.',
    medHx: 'Paracetamol syrup 120 mg/5ml given PRN by mother.',
    allergies: 'NKDA',
    pe: 'General: Lethargic, irritable, mild subcostal and intercostal chest wall indrawing. HEENT: Dry mucous membranes, eyes slightly sunken. Resp: Tachypnea, bronchial breath sounds, coarse crepitations in right mid-and-lower lung fields. CV: S1 S2 heard, tachycardia, no murmurs.',
    vitals: 'Temp: 38.9°C, HR: 145 bpm, RR: 54 breaths/min, SpO2: 91% on room air.',
    labs: 'Hb: 11.2 g/dL, WBC: 16.5 x 10^9/L (82% Neutrophils), Serum Sodium: 138 mEq/L, Potassium: 4.2 mEq/L, Creatinine: 0.4 mg/dL.',
    imaging: 'Chest X-ray shows right middle lobe lobar consolidation.',
    diagnosis: 'Severe Childhood Pneumonia (WHO classification) with mild dehydration.',
    ddx: ['Bacterial pneumonia', 'Viral bronchiolitis', 'Foreign body aspiration', 'Pulmonary tuberculosis'],
    goals: 'Eradicate pulmonary infection, support oxygenation, correct fluid deficit, prevent septic transition.',
    pharm: '1. Oxygen therapy (nasal prongs or catheter at 1-2 L/min) to target SpO2 >92%. 2. IV Benzylpenicillin (Penicillin G) 50,000 IU/kg (500,000 IU) IV every 6 hours (or IV Ampicillin 50 mg/kg every 6 hours) paired with Gentamicin 7.5 mg/kg IV once daily (75 mg). 3. Paracetamol 125 mg (12.5 mg/kg) orally or rectally every 6 hours for pyrexia.',
    nonPharm: 'Encourage frequent small sips of oral rehydration solution (ORS) or breast milk to correct dehydration. Elevate head of bed. Clear nasal secretions.',
    carePlan: 'Admit to paediatric ward. Administer IV antibiotics as ordered. Closely monitor breathing rates and indrawing. Once patient shows clinical improvement (afebrile, respiratory distress resolved), transition to oral Amoxicillin 40 mg/kg/dose (400 mg) every 12 hours to complete a total antibiotic course of 5 days.',
    dtps: '1. Active untreated severe bacterial infection requiring urgent systemic bactericidal therapy. 2. Moderate risk of hypoxemia requiring immediate oxygen supplement guidance.',
    monitoring: 'Respiratory rate and respiratory effort (chest indrawing) every 2-4 hours, temperature, oxygen saturation via pulse oximetry, fluid input/output balance.',
    counselling: 'Educate mother on red flags (refusal to feed, convulsions, cyanosis, extreme lethargy). Demonstrate correct syringe dosing of oral Amoxicillin for home transition.',
    followUp: 'Follow-up review in 48-72 hours if transitioned to home care. Scheduled chest clinical assessment in 2 weeks.',
    pearls: 'WHO classifies childhood pneumonia with chest indrawing or any "danger sign" (inability to drink, lethargy, convulsions, stridor) as "Severe Pneumonia," requiring hospital admission and IV/IM ampicillin/penicillin plus gentamicin.',
    references: ['WHO Pocket Book of Hospital Care for Children (2019)', 'Kenyan Basic Paediatric Protocols'],
    createdAt: new Date().toISOString(),
    status: 'published',
    createdBy: 'system',
    createdByName: 'Clinical Faculty'
  },
  {
    id: 'case-3',
    specialty: 'Endocrinology',
    disease: 'Diabetic Ketoacidosis',
    title: 'Severe Diabetic Ketoacidosis Precipitated by Urinary Tract Infection',
    difficulty: 'Advanced',
    demographics: '24-year-old female, 55 kg',
    chiefComplaint: 'Deep rapid breathing, progressive abdominal pain, vomiting, and confusion over the last 12 hours.',
    hpi: 'Patient with Type 1 Diabetes Mellitus presented with dysuria and polyuria for the past week, leading to nausea, persistent vomiting, severe abdominal pain, and Kussmaul respirations. Admitted to holding insulin for 2 days due to poor oral intake.',
    pmh: 'Type 1 Diabetes Mellitus (diagnosed 6 years ago), history of poor compliance.',
    medHx: 'Insulin Glargine 22 units SC at bedtime, Insulin Aspart 6 units SC before meals (held for 48 hours).',
    allergies: 'NKDA',
    pe: 'General: Somnolent, dry flushed skin, fruity odor on breath. Resp: Deep, rapid, labored respirations (Kussmaul breathing). Abdomen: Diffuse tenderness without guarding or rigidity. GU: Unremarkable.',
    vitals: 'HR: 120 bpm, BP: 94/58 mmHg, RR: 28 breaths/min, Temp: 38.1°C, SpO2: 98% on room air.',
    labs: 'Venous Blood Gas: pH 7.12, HCO3: 8 mEq/L, pCO2: 24 mmHg. Blood Glucose: 450 mg/dL. Urine Ketones: Large (4+). Serum Creatinine: 1.4 mg/dL. Serum Sodium: 131 mEq/L (Corrected Sodium: 136.6 mEq/L). Serum Potassium: 5.2 mEq/L. Urine Analysis: Pyuria (WBC >50/hpf), positive leukocyte esterase, bacteria present.',
    imaging: 'Chest X-ray is normal. ECG shows sinus tachycardia, normal T waves.',
    diagnosis: 'Severe Diabetic Ketoacidosis (DKA) precipitated by Urinary Tract Infection (UTI).',
    ddx: ['Diabetic Ketoacidosis', 'Hyperosmolar Hyperglycemic State', 'Sepsis', 'Acute Pancreatitis', 'Salicylate poisoning'],
    goals: 'Restore intravascular volume, correct hyperglycemia and metabolic acidosis, prevent hypokalemia during insulin therapy, treat underlying infection.',
    pharm: '1. Resuscitation fluids: 1 liter of 0.9% Normal Saline (NS) over the first hour, then 250-500 mL/hour depending on hydration state. Change to 5% Dextrose with 0.45% NaCl when blood glucose drops below 250 mg/dL. 2. IV Insulin: Regular Insulin infusion at 0.1 units/kg/hour (5.5 units/hour). (Note: hold insulin if K+ was <3.3 mEq/L, but here K+ is 5.2 mEq/L). 3. Potassium replacement: Once K+ falls below 5.2 mEq/L, add 20-30 mEq KCl per liter of IV fluid to maintain serum K+ between 4.0-5.0 mEq/L. 4. Antibiotic: Empiric IV Ceftriaxone 1g daily for UTI.',
    nonPharm: 'Place urinary catheter for accurate urine output tracking. Keep patient NPO until ketoacidosis resolves.',
    carePlan: 'Hourly blood glucose monitoring. Monitor BMP (electrolytes, bicarbonate, anion gap) and VGS pH every 2-4 hours. Insulin infusion should continue until DKA resolves (pH >7.3, HCO3 >=15 mEq/L, anion gap closed <12), even if blood glucose drops (add dextrose to keep glucose stable). Transition to subcutaneous insulin regimen 1-2 hours before stopping IV insulin.',
    dtps: '1. Improper drug administration: Patient held basal and bolus insulin leading to severe diabetic ketoacidosis. 2. Active infectious pathology (UTI) precipitating acute metabolic crisis.',
    monitoring: 'Hourly fingerstick glucose, serum electrolytes (especially potassium) every 2 hours, continuous telemetry, fluid intake/output balance, respiratory rate.',
    counselling: 'Educate patient on sick-day rules: never stop basal insulin during illness; check urine ketones, drink plenty of sugar-free fluids, and seek emergency care early.',
    followUp: 'Referral to diabetes educator and clinical pharmacist in the endocrinology clinic for medication adherence barriers.',
    pearls: 'Insulin suppression of lipolysis requires much less insulin than glucose disposal, but IV insulin must not be stopped until the anion gap is completely closed to ensure absolute resolution of ketone synthesis.',
    references: ['ADA Standards of Care in Diabetes (2024)', 'AACE Guidelines for Management of DKA'],
    createdAt: new Date().toISOString(),
    status: 'published',
    createdBy: 'system',
    createdByName: 'Clinical Faculty'
  },
  {
    id: 'case-4',
    specialty: 'Respiratory Medicine',
    disease: 'Asthma',
    title: 'Acute Severe Asthma Exacerbation in a Young Adult',
    difficulty: 'Intermediate',
    demographics: '19-year-old male, 70 kg',
    chiefComplaint: 'Severe shortness of breath, chest tightness, and a dry, hacking cough for 6 hours.',
    hpi: 'Presented with acute respiratory distress. He has been using his Salbutamol inhaler every 30 minutes for the past 4 hours with minimal relief. Triggered by cold air and respiratory viral infection.',
    pmh: 'Persistent moderate asthma diagnosed in childhood, poor adherence to controller medication.',
    medHx: 'Salbutamol MDI 100 mcg 2 puffs PRN (uses daily), Budesonide/Formoterol 160/4.5 mcg 1 puff twice daily (uses rarely).',
    allergies: 'Allergies to pollen and cat dander.',
    pe: 'General: Sitting upright, speaking in single words due to breathlessness, accessory muscle use (supraclavicular retractions). Resp: High-pitched expiratory wheezing bilaterally, prolonged expiratory phase. CV: Tachycardia, no murmurs.',
    vitals: 'Temp: 37.0°C, HR: 118 bpm, BP: 124/80 mmHg, RR: 28 breaths/min, SpO2: 89% on room air, Peak Expiratory Flow (PEF): 150 L/min (35% of predicted).',
    labs: 'WBC: 9.8 x 10^9/L (mild eosinophilia), BMP (K+, Na+, BUN, SCr): Normal.',
    imaging: 'Chest X-ray shows hyperinflated lungs, no pneumothorax or consolidation.',
    diagnosis: 'Acute Severe Asthma Exacerbation.',
    ddx: ['Acute Asthma Exacerbation', 'Acute Bronchitis', 'Pneumothorax', 'Anaphylaxis', 'Foreign body aspiration'],
    goals: 'Relieve bronchospasm rapidly, support oxygenation, reduce airway inflammation, prevent relapse.',
    pharm: '1. Oxygen supplement via nasal cannula to target SpO2 93-95%. 2. Nebulized Salbutamol 5 mg paired with Ipratropium Bromide 0.5 mg every 20 minutes for 3 doses, then every 1-4 hours as needed. 3. Systemic corticosteroid: IV Hydrocortisone 100 mg (or oral Prednisolone 50 mg immediately) followed by oral Prednisolone 40-50 mg daily for 5-7 days.',
    nonPharm: 'Encourage upright sitting posture, reassure the patient to reduce anxiety, ensure high fluid intake to thin mucus.',
    carePlan: 'Administer back-to-back nebulizers and systemic steroid. Monitor PEF hourly. Once wheezing diminishes and PEF exceeds 60-80% of personal best, transition nebulizers to Salbutamol MDI via a spacer device (4-10 puffs every 3-4 hours). Establish controller medication compliance (Budesonide/Formoterol inhaler) before discharge.',
    dtps: '1. Sub-therapeutic dosage/adherence of controller medication (Budesonide/Formoterol) leading to loss of asthma control. 2. Overuse of short-acting beta-2 agonist (Salbutamol) causing transient hypokalemia risk and tachyarrhythmia.',
    monitoring: 'Respiratory rate, accessory muscle use, lung auscultation, heart rate, SpO2, serial PEF measurements, potassium levels (nebulized beta-agonists can drive potassium intracellularly).',
    counselling: 'Demonstrate proper MDI inhalation technique using a valved holding chamber spacer. Counsel on difference between "controller" (daily anti-inflammatory) and "reliever" (rescue bronchodilator) inhalers. Discuss the written Asthma Action Plan.',
    followUp: 'Follow-up with primary care physician or asthma clinic within 2-7 days after discharge.',
    pearls: 'Accessory muscle use, silent chest (lack of wheezing due to extremely poor air movement), and inability to speak in full sentences are ominous signs of severe, life-threatening asthma requiring urgent treatment.',
    references: ['Global Initiative for Asthma (GINA) Guidelines 2024', 'British Thoracic Society Asthma Guidelines'],
    createdAt: new Date().toISOString(),
    status: 'published',
    createdBy: 'system',
    createdByName: 'Clinical Faculty'
  }
];
