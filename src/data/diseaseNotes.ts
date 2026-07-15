// ================================================================
// Clinova Disease Notes — One disease, one comprehensive note
// Sourced from all clinical cases, deduplicated by disease name.
// Each entry covers: overview, key drugs + side effects,
// monitoring, and interactive MCQs.
// ================================================================

export interface DiseaseNoteMCQ {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export interface DiseaseNote {
  id: string
  name: string
  unitId: string
  specialty: string
  overview: string
  keyDrugs: { drug: string; class: string; sideEffects: string[] }[]
  monitoring: string
  mcqs: DiseaseNoteMCQ[]
}

export type DiseaseNoteCategory = {
  unitId: string
  specialty: string
  diseases: DiseaseNote[]
}

export const DISEASE_NOTES: DiseaseNote[] = [
  // ─── Cardiovascular ────────────────────────────────────────────
  {
    id: 'dnote-htn',
    name: 'Hypertension',
    unitId: 'cp-cv',
    specialty: 'Cardiovascular Disorders',
    overview:
      'Chronic elevation of arterial BP ≥140/90 mmHg. Major risk factor for stroke, MI, HF, CKD. First-line therapy differs by ethnicity, age, and comorbidities. Target BP <130/80 in most adults; <140/90 in uncomplicated.',
    keyDrugs: [
      { drug: 'ACE inhibitors (Enalapril, Lisinopril)', class: 'ACEi', sideEffects: ['Dry cough', 'Angioedema', 'Hyperkalaemia', 'Acute renal impairment', 'Foetal toxicity'] },
      { drug: 'ARBs (Losartan, Telmisartan)', class: 'ARB', sideEffects: ['Dizziness', 'Hyperkalaemia', 'Renal impairment (less than ACEi)', 'Foetal toxicity'] },
      { drug: 'Amlodipine', class: 'CCB', sideEffects: ['Ankle oedema', 'Flushing', 'Headache', 'Gingival hyperplasia', 'Dizziness'] },
      { drug: 'Hydrochlorothiazide', class: 'Thiazide', sideEffects: ['Hypokalaemia', 'Hyperglycaemia', 'Hyperuricaemia', 'Hyponatraemia', 'Hypercalcaemia'] },
      { drug: 'Bisoprolol', class: 'Beta-blocker', sideEffects: ['Bradycardia', 'Fatigue', 'Cold extremities', 'Bronchospasm (asthmatics)', 'Mask hypoglycaemia'] },
    ],
    monitoring: 'BP at every visit. Serum K+, Cr, eGFR at initiation and annually. Uric acid with thiazides. HR with beta-blockers.',
    mcqs: [
      { question: 'Which antihypertensive class is contraindicated in pregnancy?', options: ['A. Methyldopa', 'B. Nifedipine', 'C. Enalapril', 'D. Hydralazine'], correctAnswer: 'C', explanation: 'ACE inhibitors are teratogenic in the 2nd and 3rd trimesters, causing foetal renal dysplasia and oligohydramnios.' },
      { question: 'A 55-year-old diabetic on HCTZ develops gout. Which agent is most likely responsible?', options: ['A. Metformin', 'B. Hydrochlorothiazide', 'C. Lisinopril', 'D. Atorvastatin'], correctAnswer: 'B', explanation: 'Thiazide diuretics reduce uric acid clearance, precipitating gout flares.' },
      { question: 'First-line antihypertensive for a 35-year-old African male?', options: ['A. Enalapril', 'B. Amlodipine', 'C. Atenolol', 'D. Spironolactone'], correctAnswer: 'B', explanation: 'CCBs or thiazides are preferred first-line in black patients due to lower renin levels; ACEi monotherapy is less effective.' },
    ],
  },
  {
    id: 'dnote-hf',
    name: 'Heart Failure',
    unitId: 'cp-cv',
    specialty: 'Cardiovascular Disorders',
    overview:
      'Clinical syndrome of inadequate cardiac output. Classified as HFrEF (EF≤40%), HFmrEF (41-49%), HFpEF (≥50%). Guideline-directed medical therapy (GDMT) quadruple therapy: ACEi/ARNI + beta-blocker + MRA + SGLT2i.',
    keyDrugs: [
      { drug: 'Sacubitril/Valsartan', class: 'ARNI', sideEffects: ['Hypotension', 'Hyperkalaemia', 'Angioedema', 'Renal impairment', 'Dizziness'] },
      { drug: 'Carvedilol', class: 'Beta-blocker', sideEffects: ['Bradycardia', 'Hypotension', 'Dizziness', 'Fatigue', 'Fluid retention (initial)'] },
      { drug: 'Spironolactone', class: 'MRA', sideEffects: ['Hyperkalaemia', 'Gynaecomastia', 'Breast tenderness', 'Hyponatraemia', 'Renal impairment'] },
      { drug: 'Furosemide', class: 'Loop diuretic', sideEffects: ['Hypokalaemia', 'Ototoxicity (high dose)', 'Dehydration', 'Hypomagnesaemia', 'Hyperuricaemia'] },
      { drug: 'Digoxin', class: 'Cardiac glycoside', sideEffects: ['Nausea/vomiting', 'Arrhythmias', 'Visual disturbances (yellow halos)', 'Confusion', 'Toxicity (renal impairment)'] },
    ],
    monitoring: 'Echo EF every 6-12mo. K+, Cr, eGFR with RAASi/MRA. Weight daily. HR, BP, signs of congestion. Digoxin levels (0.5-0.9 ng/mL).',
    mcqs: [
      { question: 'Which combination is part of quadruple GDMT for HFrEF?', options: ['A. Digoxin + Amiodarone', 'B. Sacubitril/Valsartan + Carvedilol + Spironolactone + Dapagliflozin', 'C. Furosemide + Metoprolol + Aspirin + Nitrate', 'D. Enalapril + Digoxin + HCTZ + Ivabradine'], correctAnswer: 'B', explanation: 'GDMT for HFrEF = ARNI or ACEi + beta-blocker + MRA + SGLT2i. This is the quadruple therapy shown to reduce mortality.' },
      { question: 'Which lab abnormality requires spironolactone dose reduction?', options: ['A. K+ 5.8 mEq/L', 'B. Na+ 135 mEq/L', 'C. Hb 10 g/dL', 'D. Mg 1.8 mg/dL'], correctAnswer: 'A', explanation: 'Hyperkalaemia >5.5 mEq/L requires MRA dose reduction or hold. K+ >5.0 should prompt review.' },
    ],
  },
  {
    id: 'dnote-afib',
    name: 'Atrial Fibrillation',
    unitId: 'cp-cv',
    specialty: 'Cardiovascular Disorders',
    overview:
      'Most common sustained arrhythmia. Chaotic atrial activity → irregularly irregular ventricular response. Management: rate vs rhythm control + stroke prevention (CHA₂DS₂-VASc score).',
    keyDrugs: [
      { drug: 'Apixaban', class: 'DOAC', sideEffects: ['Bleeding', 'GI upset', 'Anaemia', 'Hepatic impairment (caution)', 'Accumulation in CKD'] },
      { drug: 'Warfarin', class: 'Vitamin K antagonist', sideEffects: ['Bleeding (INR monitoring required)', 'Skin necrosis', 'Teratogenicity', 'Drug interactions (many)', 'Purple toes syndrome'] },
      { drug: 'Amiodarone', class: 'Antiarrhythmic III', sideEffects: ['Pulmonary fibrosis', 'Thyroid dysfunction', 'Hepatotoxicity', 'Corneal deposits', 'Photosensitivity', 'Blue-grey skin'] },
      { drug: 'Metoprolol', class: 'Beta-blocker', sideEffects: ['Bradycardia', 'Hypotension', 'Fatigue', 'Dizziness', 'Bronchospasm'] },
    ],
    monitoring: 'ECG at each visit. INR (warfarin) — target 2.0-3.0. LFTs/TSH (amiodarone) q6mo. Cr/eGFR for DOAC dosing. HR at rest and exercise.',
    mcqs: [
      { question: 'Which DOAC requires dose adjustment for CrCl 25 mL/min?', options: ['A. Rivaroxaban', 'B. Apixaban', 'C. Dabigatran', 'D. All of the above'], correctAnswer: 'D', explanation: 'All DOACs require dose adjustment in moderate-severe CKD. Avoid dabigatran if CrCl <30, reduce apixaban/rivaroxaban if CrCl 15-30.' },
    ],
  },
  {
    id: 'dnote-acs',
    name: 'Acute Coronary Syndrome',
    unitId: 'cp-cv',
    specialty: 'Cardiovascular Disorders',
    overview:
      'Spectrum from unstable angina to NSTEMI/STEMI. Plaque rupture → thrombus → myocardial ischaemia. Immediate antiplatelet + anticoagulation ± reperfusion. Post-ACS: DAPT + statin + beta-blocker + ACEi.',
    keyDrugs: [
      { drug: 'Aspirin', class: 'Antiplatelet', sideEffects: ['GI bleeding', 'Gastric ulcer', 'Bronchospasm (aspirin-sensitive asthma)', 'Reversible hearing loss'] },
      { drug: 'Clopidogrel', class: 'P2Y12 inhibitor', sideEffects: ['Bleeding', 'Thrombotic thrombocytopenic purpura (rare)', 'Dyspnoea (ticagrelor)', 'Bradycardia (ticagrelor)'] },
      { drug: 'Atorvastatin', class: 'Statin', sideEffects: ['Myopathy', 'Rhabdomyolysis', 'Hepatotoxicity (ALT rise)', 'New-onset diabetes', 'Cognitive changes'] },
      { drug: 'Heparin/Enoxaparin', class: 'Anticoagulant', sideEffects: ['Bleeding', 'HIT (heparin)', 'Osteoporosis (long-term)', 'Hypoaldosteronism'] },
    ],
    monitoring: 'ECG, cardiac enzymes (troponin) serially. Lipid panel, LFTs (statin). CBC, aPTT (heparin). Bleeding signs. DAPT duration 6-12mo.',
    mcqs: [
      { question: 'DAPT for ACS includes which combination?', options: ['A. Aspirin + Warfarin', 'B. Aspirin + Clopidogrel', 'C. Clopidogrel + Enoxaparin', 'D. Aspirin + Dipyridamole'], correctAnswer: 'B', explanation: 'DAPT = aspirin + P2Y12 inhibitor (clopidogrel/ticagrelor/prasugrel). In ACS, continue for 12 months unless high bleeding risk.' },
    ],
  },

  // ─── Respiratory ───────────────────────────────────────────────
  {
    id: 'dnote-asthma',
    name: 'Asthma',
    unitId: 'cp-resp',
    specialty: 'Respiratory Disorders',
    overview:
      'Chronic inflammatory airway disease with reversible airflow obstruction. Triggers: allergens, exercise, cold air, infections. Stepwise management based on symptom control and exacerbation risk. GINA guidelines recommend ICS-containing therapy for all adults.',
    keyDrugs: [
      { drug: 'Salbutamol (Albuterol)', class: 'SABA', sideEffects: ['Tremor', 'Tachycardia', 'Hypokalaemia', 'Nervousness', 'Headache'] },
      { drug: 'Budesonide/Formoterol', class: 'ICS/LABA', sideEffects: ['Oral candidiasis', 'Dysphonia', 'Throat irritation', 'Adrenal suppression (high dose)', 'Growth delay (children)'] },
      { drug: 'Prednisolone', class: 'Systemic corticosteroid', sideEffects: ['Weight gain', 'Osteoporosis', 'Hyperglycaemia', 'Adrenal suppression', 'Immunosuppression', 'Mood changes'] },
      { drug: 'Montelukast', class: 'LTRA', sideEffects: ['Headache', 'GI upset', 'Behavioural changes (rare)', 'Dizziness', 'Fatigue'] },
    ],
    monitoring: 'PEF diary. Symptom control (ACT score). Spirometry annually. Inhaler technique at each visit. SABA use >2x/week = poor control.',
    mcqs: [
      { question: 'First-line maintenance therapy for persistent asthma in adults?', options: ['A. Salbutamol PRN', 'B. Low-dose ICS-formoterol as needed', 'C. Prednisolone daily', 'D. Montelukast alone'], correctAnswer: 'B', explanation: 'GINA 2023 recommends ICS-formoterol as both maintenance and reliever (SMART therapy) for adults with moderate-severe asthma.' },
      { question: 'Which side effect is most characteristic of inhaled corticosteroids?', options: ['A. Weight gain', 'B. Oral candidiasis', 'C. Myopathy', 'D. Hypoglycaemia'], correctAnswer: 'B', explanation: 'Oropharyngeal candidiasis occurs due to local immunosuppression; rinse mouth after each use to prevent.' },
    ],
  },
  {
    id: 'dnote-copd',
    name: 'COPD',
    unitId: 'cp-resp',
    specialty: 'Respiratory Disorders',
    overview:
      'Chronic, progressive lung disease (emphysema + chronic bronchitis). Irreversible airflow limitation. Caused primarily by smoking. Management: smoking cessation, bronchodilators, pulmonary rehab, exacerbation prevention.',
    keyDrugs: [
      { drug: 'Tiotropium', class: 'LAMA', sideEffects: ['Dry mouth', 'Urinary retention', 'Constipation', 'Glaucoma (worsening)', 'Paradoxical bronchospasm'] },
      { drug: 'Salmeterol/Fluticasone', class: 'LABA/ICS', sideEffects: ['Oral candidiasis', 'Dysphonia', 'Pneumonia risk (ICS)', 'Throat irritation', 'Adrenal suppression'] },
      { drug: 'Theophylline', class: 'Methylxanthine', sideEffects: ['Nausea/vomiting', 'Tachycardia', 'Seizures (toxic level)', 'Insomnia', 'Drug interactions (CYP1A2)'] },
    ],
    monitoring: 'Spirometry (FEV1/FVC <0.7). CAT or mMRC dyspnoea score. SpO₂. Exacerbation frequency. BMI. Smoking status.',
    mcqs: [
      { question: 'Which drug class increases pneumonia risk in COPD?', options: ['A. LAMA', 'B. LABA', 'C. ICS', 'D. PDE4 inhibitor'], correctAnswer: 'C', explanation: 'Inhaled corticosteroids increase pneumonia risk in COPD patients; use only if FEV1 <50% and frequent exacerbations.' },
    ],
  },
  {
    id: 'dnote-cap',
    name: 'Community Acquired Pneumonia',
    unitId: 'cp-resp',
    specialty: 'Respiratory Disorders',
    overview:
      'Acute lung infection in non-hospitalised patients. Pathogens: S. pneumoniae, H. influenzae, M. pneumoniae, C. pneumoniae, viruses. CURB-65 score guides severity and site of care. Empiric antibiotics based on local guidelines.',
    keyDrugs: [
      { drug: 'Amoxicillin', class: 'Penicillin', sideEffects: ['Rash', 'Diarrhoea', 'Anaphylaxis (rare)', 'Nausea', 'C. difficile colitis'] },
      { drug: 'Azithromycin', class: 'Macrolide', sideEffects: ['QT prolongation', 'GI upset', 'Hepatotoxicity', 'Ototoxicity (high dose)', 'Taste disturbance'] },
      { drug: 'Ceftriaxone', class: 'Cephalosporin (3rd gen)', sideEffects: ['Biliary sludge', 'Diarrhoea', 'C. difficile', 'Rash', 'Coombs-positive haemolysis'] },
      { drug: 'Doxycycline', class: 'Tetracycline', sideEffects: ['Photosensitivity', 'Oesophageal ulceration', 'Tooth discolouration (<8yrs)', 'Hepatotoxicity', 'Vestibular toxicity'] },
    ],
    monitoring: 'Temperature, WBC, CRP. Sputum + blood cultures. CURB-65 reassessment. Follow-up chest X-ray at 6 weeks.',
    mcqs: [
      { question: 'Empiric CAP coverage for hospitalised (non-ICU) patient?', options: ['A. Amoxicillin alone', 'B. Ceftriaxone + Azithromycin', 'C. Ciprofloxacin', 'D. Metronidazole alone'], correctAnswer: 'B', explanation: 'Community-acquired pneumonia requires beta-lactam + macrolide coverage for atypical pathogens.' },
    ],
  },
  {
    id: 'dnote-tb',
    name: 'Tuberculosis',
    unitId: 'cp-id',
    specialty: 'Infectious Diseases',
    overview:
      'M. tuberculosis infection — pulmonary most common. 2-month intensive phase (RIPE) + 4-month continuation phase (Rifampicin + Isoniazid). DOTS strategy. Kenya: high burden — screen all cough >2 weeks.',
    keyDrugs: [
      { drug: 'Rifampicin', class: 'Rifamycin', sideEffects: ['Hepatotoxicity', 'Red-orange discolouration (urine/sweat/tears)', 'GI upset', 'Thrombocytopenia', 'Potent CYP450 inducer'] },
      { drug: 'Isoniazid', class: 'Nicotinic acid derivative', sideEffects: ['Peripheral neuropathy (give pyridoxine)', 'Hepatotoxicity', 'Lupus-like syndrome', 'Hypersensitivity', 'Seizures (high dose)'] },
      { drug: 'Pyrazinamide', class: 'Nicotinamide analogue', sideEffects: ['Hepatotoxicity', 'Hyperuricaemia → gout', 'Arthralgia', 'Photosensitivity', 'GI upset'] },
      { drug: 'Ethambutol', class: 'Ethanolamine', sideEffects: ['Optic neuritis (dose-dependent)', 'Colour blindness', 'Reduced visual acuity', 'Peripheral neuropathy', 'Hyperuricaemia'] },
    ],
    monitoring: 'LFTs at baseline + monthly (RIPE). Visual acuity + colour vision (ethambutol). Uric acid (pyrazinamide). Sputum smear/culture at 2, 5, 6 months. Chest X-ray.',
    mcqs: [
      { question: 'Which anti-TB drug requires pyridoxine co-administration?', options: ['A. Rifampicin', 'B. Isoniazid', 'C. Pyrazinamide', 'D. Ethambutol'], correctAnswer: 'B', explanation: 'Isoniazid causes peripheral neuropathy by depleting pyridoxine (B6). Supplement 10-25mg/day to prevent.' },
      { question: 'Which anti-TB drug causes optic neuritis?', options: ['A. Rifampicin', 'B. Isoniazid', 'C. Pyrazinamide', 'D. Ethambutol'], correctAnswer: 'D', explanation: 'Ethambutol causes dose-dependent retrobulbar neuritis → decreased visual acuity and colour blindness. Reversible if caught early.' },
    ],
  },

  // ─── Endocrine ─────────────────────────────────────────────────
  {
    id: 'dnote-t2dm',
    name: 'Type 2 Diabetes',
    unitId: 'cp-endo',
    specialty: 'Endocrine Disorders',
    overview:
      'Insulin resistance + progressive beta-cell dysfunction. Target HbA1c <7% (individualised). First-line: metformin + lifestyle. Add SGLT2i/GLP1-RA if ASCVD/HF/CKD. Complications: CVD, nephropathy, retinopathy, neuropathy.',
    keyDrugs: [
      { drug: 'Metformin', class: 'Biguanide', sideEffects: ['GI upset', 'Metallic taste', 'Lactic acidosis (rare, eGFR<30)', 'B12 deficiency', 'Diarrhoea'] },
      { drug: 'Dapagliflozin', class: 'SGLT2i', sideEffects: ['UTI', 'Genital mycosis', 'Euglycaemic DKA', 'Dehydration', 'Fournier gangrene (rare)'] },
      { drug: 'Liraglutide', class: 'GLP1-RA', sideEffects: ['Nausea/vomiting', 'Pancreatitis (rare)', 'Gallbladder disease', 'Heart rate increase', 'Thyroid C-cell tumours (contraindicated in MEN2)'] },
      { drug: 'Insulin Glargine', class: 'Basal insulin', sideEffects: ['Hypoglycaemia', 'Weight gain', 'Lipodystrophy at injection site', 'Oedema', 'Allergic reaction'] },
      { drug: 'Glibenclamide', class: 'Sulfonylurea', sideEffects: ['Hypoglycaemia (prolonged)', 'Weight gain', 'Hyponatraemia', 'Photosensitivity', 'Disulfiram-like reaction'] },
    ],
    monitoring: 'HbA1c q3-6mo. FPG, PPG. eGFR, UACR annually. Foot exam. Eye exam. Lipid panel. BP. SMBG.',
    mcqs: [
      { question: 'Why should metformin be held before contrast imaging?', options: ['A. Nephrotoxicity', 'B. Lactic acidosis risk if AKI develops', 'C. Contrast binding', 'D. Drug interaction'], correctAnswer: 'B', explanation: 'Contrast-induced AKI can cause metformin accumulation → lactic acidosis. Hold metformin on day of procedure and for 48h after.' },
      { question: 'Best add-on therapy for T2DM with HF?', options: ['A. Glibenclamide', 'B. Dapagliflozin', 'C. Pioglitazone', 'D. Sitagliptin'], correctAnswer: 'B', explanation: 'SGLT2 inhibitors (dapagliflozin/empagliflozin) reduce HF hospitalisation and CV mortality — preferred in T2DM + HF.' },
    ],
  },
  {
    id: 'dnote-dka',
    name: 'Diabetic Ketoacidosis',
    unitId: 'cp-endo',
    specialty: 'Endocrine Disorders',
    overview:
      'Life-threatening complication of DM (more common in T1DM). Hyperglycaemia + ketonaemia + metabolic acidosis. Precipitated by infection, insulin omission, stress. Management: IVF + insulin infusion + K+ replacement.',
    keyDrugs: [
      { drug: 'Insulin (regular IV)', class: 'Short-acting insulin', sideEffects: ['Hypoglycaemia', 'Hypokalaemia', 'Hypomagnesaemia', 'Injection site reaction', 'Lipodystrophy'] },
      { drug: '0.9% NaCl IV', class: 'Crystalloid', sideEffects: ['Hyperchloraemic metabolic acidosis (large volume)', 'Fluid overload', 'Oedema'] },
      { drug: 'Potassium chloride IV', class: 'Electrolyte', sideEffects: ['Hyperkalaemia (over-replacement)', 'Phlebitis', 'Cardiac arrest (bolus)', 'GI upset'] },
    ],
    monitoring: 'Blood glucose hourly. K+, HCO₃, pH, anion gap q2-4h. Serum ketones. Fluid balance. LOC, GCS.',
    mcqs: [
      { question: 'In DKA, when should K+ be added to IV fluids?', options: ['A. Immediately', 'B. When K+ <5.5 mEq/L and urine output confirmed', 'C. Only if K+ <3.0', 'D. After insulin infusion is stopped'], correctAnswer: 'B', explanation: 'Insulin drives K+ intracellularly → hypokalaemia. Add K+ to fluids once K+ <5.5 and urine output is adequate (typically 20-40 mEq/L).' },
    ],
  },
  {
    id: 'dnote-thyroid',
    name: 'Hyperthyroidism / Hypothyroidism',
    unitId: 'cp-endo',
    specialty: 'Endocrine Disorders',
    overview:
      'Hyperthyroidism: excess thyroid hormone → weight loss, tremor, heat intolerance, palpitations. Hypothyroidism: deficiency → fatigue, weight gain, cold intolerance, constipation. Graves disease most common cause of hyperthyroidism.',
    keyDrugs: [
      { drug: 'Carbimazole/Methimazole', class: 'Thionamide', sideEffects: ['Agranulocytosis (sore throat → check FBC)', 'Rash', 'Hepatotoxicity', 'Arthralgia', 'Taste disturbance'] },
      { drug: 'Propylthiouracil (PTU)', class: 'Thionamide', sideEffects: ['Hepatotoxicity (severe)', 'Agranulocytosis', 'Vasculitis (ANCA+)', 'Rash', 'Lupus-like syndrome'] },
      { drug: 'Levothyroxine', class: 'T4 replacement', sideEffects: ['Palpitations', 'Tremor (over-replacement)', 'Insomnia', 'Anxiety', 'Osteoporosis (long-term excessive)'] },
      { drug: 'Propranolol', class: 'Beta-blocker', sideEffects: ['Bradycardia', 'Hypotension', 'Fatigue', 'Bronchospasm', 'Mask hypoglycaemia symptoms'] },
    ],
    monitoring: 'TSH, FT4 q4-6wk until euthyroid. FBC (thionamide — agranulocytosis). LFTs (PTU). BP, HR, weight, symptom score.',
    mcqs: [
      { question: 'Which symptom requires FBC urgently in a patient on carbimazole?', options: ['A. Headache', 'B. Sore throat', 'C. Joint pain', 'D. Nausea'], correctAnswer: 'B', explanation: 'Sore throat + fever may indicate agranulocytosis (neutrophils <500). Stop thionamide immediately and check FBC.' },
    ],
  },

  // ─── GI ────────────────────────────────────────────────────────
  {
    id: 'dnote-pud',
    name: 'Peptic Ulcer Disease',
    unitId: 'cp-gi',
    specialty: 'Gastrointestinal Disorders',
    overview:
      'Mucosal erosion in stomach or duodenum. Causes: H. pylori (60-80%), NSAIDs, stress, Zollinger-Ellison. Triple/quadruple therapy for H. pylori eradication. PPI for acid suppression.',
    keyDrugs: [
      { drug: 'Omeprazole', class: 'PPI', sideEffects: ['Headache', 'GI upset', 'C. difficile risk', 'B12 deficiency (long-term)', 'Hypomagnesaemia', 'Osteoporosis (long-term)'] },
      { drug: 'Amoxicillin + Clarithromycin + Omeprazole', class: 'Triple therapy', sideEffects: ['Diarrhoea', 'Metallic taste (clarithromycin)', 'Nausea', 'QT prolongation', 'C. difficile'] },
      { drug: 'Bismuth subsalicylate', class: 'Bismuth compound', sideEffects: ['Black tongue', 'Black stools', 'Constipation', 'Tinnitus (high dose)', 'Encephalopathy (long-term)'] },
    ],
    monitoring: 'Symptom resolution. Urea breath test or stool antigen for H. pylori eradication (≥4wk after therapy). Endoscopy for alarm features.',
    mcqs: [
      { question: 'First-line H. pylori eradication in Kenya?', options: ['A. PPI + Amoxicillin + Metronidazole', 'B. PPI + Amoxicillin + Clarithromycin', 'C. PPI + Tetracycline + Bismuth', 'D. PPI alone'], correctAnswer: 'B', explanation: 'Standard triple therapy = PPI + amoxicillin 1g + clarithromycin 500mg BID for 14 days. Quadruple therapy if macrolide resistance suspected.' },
    ],
  },
  {
    id: 'dnote-cirrhosis',
    name: 'Liver Cirrhosis',
    unitId: 'cp-gi',
    specialty: 'Gastrointestinal Disorders',
    overview:
      'End-stage liver fibrosis → portal hypertension + synthetic dysfunction. Complications: ascites, variceal bleeding, encephalopathy, SBP, HCC. Child-Pugh score for prognosis. Avoid hepatotoxins.',
    keyDrugs: [
      { drug: 'Spironolactone', class: 'MRA', sideEffects: ['Hyperkalaemia', 'Gynaecomastia', 'Breast tenderness', 'Hyponatraemia'] },
      { drug: 'Lactulose', class: 'Osmotic laxative', sideEffects: ['Bloating', 'Flatulence', 'Abdominal cramps', 'Diarrhoea (overdose)', 'Hypernatraemia'] },
      { drug: 'Rifaximin', class: 'Non-absorbable antibiotic', sideEffects: ['Nausea', 'Flatulence', 'Headache', 'Peripheral oedema', 'C. difficile (rare)'] },
      { drug: 'Propranolol', class: 'Non-selective beta-blocker', sideEffects: ['Bradycardia', 'Hypotension', 'Fatigue', 'Bronchospasm', 'Worsen peripheral perfusion'] },
    ],
    monitoring: 'LFTs, INR, albumin, bilirubin. Child-Pugh/MELD score. US liver q6mo (HCC screening). Upper endoscopy (varices). Encephalopathy assessment.',
    mcqs: [
      { question: 'First-line therapy for hepatic encephalopathy?', options: ['A. Rifaximin', 'B. Lactulose', 'C. Metronidazole', 'D. Neomycin'], correctAnswer: 'B', explanation: 'Lactulose is first-line — acidifies colon, traps NH₄⁺ as NH₄⁺ (non-absorbable). Rifaximin is add-on for recurrence prevention.' },
    ],
  },

  // ─── Renal ────────────────────────────────────────────────────
  {
    id: 'note-ckd',
    name: 'Chronic Kidney Disease',
    unitId: 'cp-renal',
    specialty: 'Renal Disorders',
    overview:
      'Progressive loss of kidney function (eGFR <60 for >3mo or albuminuria). Stages 1-5. Complications: anaemia, CKD-MBD, metabolic acidosis, CV disease. Renoprotective: ACEi/ARB + SGLT2i. Avoid nephrotoxins.',
    keyDrugs: [
      { drug: 'Enalapril', class: 'ACEi', sideEffects: ['Cough', 'Hyperkalaemia', 'AKI (dehydration)', 'Angioedema', 'Foetal toxicity'] },
      { drug: 'Dapagliflozin', class: 'SGLT2i', sideEffects: ['UTI', 'Volume depletion', 'Euglycaemic DKA', 'Genital mycosis'] },
      { drug: 'Erythropoietin (EPO)', class: 'ESA', sideEffects: ['Hypertension', 'Thrombosis', 'Pure red cell aplasia (rare)', 'Headache', 'Flu-like symptoms'] },
      { drug: 'Sevelamer', class: 'Phosphate binder', sideEffects: ['Constipation', 'GI upset', 'Metabolic acidosis', 'Bowel obstruction (rare)'] },
    ],
    monitoring: 'eGFR, UACR q3-6mo. Hb (anaemia), Ca, PO₄, PTH (CKD-MBD), HCO₃ (metabolic acidosis). BP. Potassium.',
    mcqs: [
      { question: 'Which drug slows CKD progression regardless of diabetes status?', options: ['A. Metformin', 'B. Dapagliflozin', 'C. Furosemide', 'D. Sodium bicarbonate'], correctAnswer: 'B', explanation: 'SGLT2 inhibitors (dapagliflozin/empagliflozin) reduce CKD progression, HF hospitalisation, and CV death in CKD with or without diabetes.' },
    ],
  },
  {
    id: 'dnote-aki',
    name: 'Acute Kidney Injury',
    unitId: 'cp-renal',
    specialty: 'Renal Disorders',
    overview:
      'Rapid decline in GFR → rise in Cr and/or ↓ urine output. KDIGO stages 1-3. Causes: pre-renal (dehydration), renal (ATN, AIN, GN), post-renal (obstruction). Avoid nephrotoxins, adjust drug doses.',
    keyDrugs: [
      { drug: '0.9% NaCl IV', class: 'Crystalloid', sideEffects: ['Fluid overload', 'Hyperchloraemic acidosis', 'Pulmonary oedema (excess)'] },
      { drug: 'Furosemide IV', class: 'Loop diuretic', sideEffects: ['Ototoxicity', 'Hypokalaemia', 'Dehydration', 'Hypomagnesaemia'] },
    ],
    monitoring: 'Cr, BUN, K+, HCO₃, urine output hourly. Urine microscopy (casts). Renal US (obstruction). Drug levels. Fluid balance.',
    mcqs: [
      { question: 'The "triple whammy" causing AKI involves which drug combo?', options: ['A. ACEi + Diuretic + NSAID', 'B. Metformin + SGLT2i + Statin', 'C. PPI + Aspirin + Clopidogrel', 'D. Warfarin + Amiodarone + Digoxin'], correctAnswer: 'A', explanation: 'ACEi/ARB + diuretic + NSAID = triple whammy. NSAID reduces afferent arteriolar flow, ACEi dilates efferent arteriole, diuretic depletes volume → severe AKI.' },
    ],
  },

  // ─── Neurology ─────────────────────────────────────────────────
  {
    id: 'dnote-epilepsy',
    name: 'Epilepsy',
    unitId: 'cp-neuro',
    specialty: 'Neurological Disorders',
    overview:
      'Recurrent unprovoked seizures. Classification: focal, generalised, unknown onset. Treatment: first-line AED based on seizure type. Goal = seizure freedom without side effects. Monitor drug levels for certain AEDs.',
    keyDrugs: [
      { drug: 'Sodium Valproate', class: 'Broad-spectrum AED', sideEffects: ['Hepatotoxicity', 'Thrombocytopenia', 'Tremor', 'Weight gain', 'Teratogenicity (neural tube defects)', 'Polycystic ovary syndrome (PCOS)'] },
      { drug: 'Phenytoin', class: 'Na+ channel blocker', sideEffects: ['Gingival hyperplasia', 'Cerebellar atrophy', 'Hirsutism', 'Osteoporosis', 'Nystagmus, ataxia (toxic)'] },
      { drug: 'Levetiracetam', class: 'SV2A ligand', sideEffects: ['Somnolence', 'Dizziness', 'Behavioural changes (aggression, irritability)', 'Psychosis (rare)', 'Fatigue'] },
      { drug: 'Carbamazepine', class: 'Na+ channel blocker', sideEffects: ['Hyponatraemia', 'Stevens-Johnson syndrome (HLA-B*1502)', 'Dizziness', 'Hepatotoxicity', 'Aplastic anaemia'] },
    ],
    monitoring: 'Seizure diary. AED levels (phenytoin, valproate, carbamazepine). LFTs, FBC, Na+. Bone density (long-term AEDs). Pregnancy prevention (valproate).',
    mcqs: [
      { question: 'Which AED is most teratogenic and restricted in females of childbearing age?', options: ['A. Levetiracetam', 'B. Sodium Valproate', 'C. Lamotrigine', 'D. Topiramate'], correctAnswer: 'B', explanation: 'Valproate has highest teratogenicity (neural tube defects, developmental delay). Contraindicated in pregnancy unless no alternative. Ensure effective contraception.' },
      { question: 'First-line IV for benzodiazepine-refractory status epilepticus?', options: ['A. Phenytoin', 'B. Valproate', 'C. Levetiracetam', 'D. Carbamazepine'], correctAnswer: 'C', explanation: 'IV levetiracetam or phenytoin/fosphenytoin is second-line after benzodiazepines for status epilepticus.' },
    ],
  },
  {
    id: 'dnote-stroke',
    name: 'Stroke',
    unitId: 'cp-neuro',
    specialty: 'Neurological Disorders',
    overview:
      'Acute neurological deficit from vascular cause. Ischaemic (85%) vs haemorrhagic (15%). Time-critical: thrombolysis within 4.5h (alteplase), thrombectomy up to 24h. Secondary prevention: antiplatelet + statin + BP control.',
    keyDrugs: [
      { drug: 'Alteplase (tPA)', class: 'Thrombolytic', sideEffects: ['Intracranial haemorrhage', 'Systemic bleeding', 'Angioedema', 'Hypotension', 'Arrhythmia'] },
      { drug: 'Aspirin', class: 'Antiplatelet', sideEffects: ['GI bleeding', 'Haemorrhagic transformation'] },
      { drug: 'Clopidogrel', class: 'P2Y12 inhibitor', sideEffects: ['Bleeding', 'TTP (rare)', 'Dyspnoea', 'Rash'] },
    ],
    monitoring: 'NIHSS q4h × 24h. BP (maintain <185/110 before tPA, <180/105 after). Neuro checks. Swallow screen. Glucose. CT at 24h.',
    mcqs: [
      { question: 'Time window for IV alteplase in acute ischaemic stroke?', options: ['A. 1.5 hours', 'B. 3 hours', 'C. 4.5 hours', 'D. 6 hours'], correctAnswer: 'C', explanation: 'IV alteplase is approved within 4.5 hours of symptom onset (or last known well). Earlier treatment yields better outcomes.' },
    ],
  },
  {
    id: 'dnote-depression',
    name: 'Depression',
    unitId: 'cp-neuro',
    specialty: 'Psychiatric Disorders',
    overview:
      'Persistent low mood, anhedonia, sleep/appetite changes, poor concentration, suicidal thoughts. PHQ-9 for screening and monitoring. First-line: SSRI. Consider CBT + pharmacotherapy. Watch for suicidality on initiation.',
    keyDrugs: [
      { drug: 'Fluoxetine', class: 'SSRI', sideEffects: ['Nausea', 'Insomnia', 'Sexual dysfunction', 'Serotonin syndrome (with other serotonergics)', 'Suicidal ideation (initial weeks)'] },
      { drug: 'Sertraline', class: 'SSRI', sideEffects: ['Diarrhoea', 'Insomnia', 'Sexual dysfunction', 'Weight changes', 'QT prolongation (high dose)'] },
      { drug: 'Amitriptyline', class: 'TCA', sideEffects: ['Anticholinergic (dry mouth, constipation, blurred vision)', 'Sedation', 'Cardiotoxicity (overdose)', 'Weight gain', 'Urinary retention'] },
    ],
    monitoring: 'PHQ-9/GAD-7 q2-4wk initially. Suicidal ideation screening. Side effect tolerance. Check adherence. ECG (TCA). Na+ (SSRI in elderly — SIADH).',
    mcqs: [
      { question: 'Which SSRI side effect is most distressing to patients and causes non-adherence?', options: ['A. Nausea', 'B. Sexual dysfunction', 'C. Headache', 'D. Insomnia'], correctAnswer: 'B', explanation: 'Sexual dysfunction (delayed ejaculation, anorgasmia, decreased libido) affects 30-60% of patients and is the most common reason for SSRI discontinuation.' },
    ],
  },
  {
    id: 'dnote-parkinson',
    name: 'Parkinson Disease',
    unitId: 'cp-neuro',
    specialty: 'Neurological Disorders',
    overview:
      'Progressive neurodegenerative disorder with loss of dopaminergic neurons in substantia nigra. Triad: tremor, rigidity, bradykinesia, postural instability. Levodopa is gold standard. Motor fluctuations and dyskinesias with long-term use.',
    keyDrugs: [
      { drug: 'Levodopa/Carbidopa', class: 'Dopamine precursor/DDCI', sideEffects: ['Dyskinesias (peak dose)', 'Nausea', 'Orthostatic hypotension', 'Hallucinations (elderly)', 'Motor fluctuations (wearing off)', 'Psychosis'] },
      { drug: 'Entacapone', class: 'COMT inhibitor', sideEffects: ['Orange-brown urine', 'Diarrhoea', 'Dyskinesia worsening', 'Nausea', 'Hepatotoxicity (tolcapone)'] },
      { drug: 'Pramipexole', class: 'Dopamine agonist', sideEffects: ['Impulse control disorders (gambling, hypersexuality)', 'Hallucinations', 'Sedation/sleep attacks', 'Oedema', 'Nausea'] },
    ],
    monitoring: 'Motor fluctuations ("off" time). Dyskinesia severity. UPDRS score. Orthostatic BP. Impulse control screening. Cognition. QoL assessment.',
    mcqs: [
      { question: 'Most effective therapy for motor symptoms of PD?', options: ['A. Entacapone', 'B. Levodopa/Carbidopa', 'C. Pramipexole', 'D. Benztropine'], correctAnswer: 'B', explanation: 'Levodopa is the most effective symptomatic therapy for Parkinson disease — all patients respond. Motor fluctuations develop after 3-5 years of therapy.' },
    ],
  },

  // ─── Infectious Diseases ────────────────────────────────────────
  {
    id: 'dnote-malaria',
    name: 'Malaria',
    unitId: 'cp-id',
    specialty: 'Infectious Diseases',
    overview:
      'P. falciparum most common in Kenya. Uncomplicated: artemisinin-based combination therapy (ACT). Severe: IV artesunate. Avoid monotherapy. Test before treat (mRDT or smear). Chemoprophylaxis for travellers.',
    keyDrugs: [
      { drug: 'Artemether/Lumefantrine', class: 'ACT', sideEffects: ['Nausea/vomiting', 'Headache', 'Dizziness', 'QT prolongation', 'Arthralgia'] },
      { drug: 'Artesunate IV', class: 'Artemisinin', sideEffects: ['Post-artemisinin haemolytic anaemia (rare)', 'Nausea', 'QT prolongation', 'Neurotoxicity (animal studies, not confirmed in humans)'] },
      { drug: 'Primaquine', class: '8-aminoquinoline', sideEffects: ['Haemolysis (G6PD deficiency)', 'Methaemoglobinaemia', 'GI upset', 'QT prolongation'] },
    ],
    monitoring: 'Parasite count (smear) at 0, 24, 48, 72h. Hb, G6PD status (primaquine). Temperature. In severe malaria: glucose, lactate, renal function.',
    mcqs: [
      { question: 'First-line treatment for uncomplicated malaria in Kenya?', options: ['A. Chloroquine', 'B. Artemether/Lumefantrine', 'C. IV Artesunate', 'D. Quinine'], correctAnswer: 'B', explanation: 'AL (Artemether/Lumefantrine) is first-line for uncomplicated P. falciparum in Kenya per national guidelines. 6-dose, 3-day course.' },
      { question: 'Which anti-malarial requires G6PD screening?', options: ['A. Artemether', 'B. Lumefantrine', 'C. Primaquine', 'D. Chloroquine'], correctAnswer: 'C', explanation: 'Primaquine causes acute haemolytic anaemia in G6PD-deficient individuals. Screen G6PD before prescribing.' },
    ],
  },
  {
    id: 'dnote-hiv',
    name: 'HIV/AIDS',
    unitId: 'cp-id',
    specialty: 'Infectious Diseases',
    overview:
      'Retrovirus → CD4 depletion → immunodeficiency. ART for all PLHIV regardless of CD4. Kenya: TLD (TLD — Tenofovir/Lamivudine/Dolutegravir) first-line. Treat comorbid TB, OIs. U=U.',
    keyDrugs: [
      { drug: 'TLD (Tenofovir/Lamivudine/Dolutegravir)', class: 'NRTI + INSTI', sideEffects: ['Tenofovir: renal toxicity, Fanconi syndrome, bone loss', 'Lamivudine: well tolerated', 'Dolutegravir: insomnia, weight gain, neural tube defects (pregnancy)'] },
      { drug: 'Efavirenz', class: 'NNRTI', sideEffects: ['CNS effects (nightmares, dizziness, depression)', 'Rash', 'Hepatotoxicity', 'Hyperlipidaemia', 'Teratogenicity'] },
      { drug: 'Cotrimoxazole', class: 'Antibiotic (prophylaxis)', sideEffects: ['Rash (SJS — sulphonamide)', 'Hyperkalaemia', 'Nephrotoxicity', 'Bone marrow suppression', 'Photosensitivity'] },
    ],
    monitoring: 'CD4 q6mo (stable) or q3mo (unstable). Viral load at 6mo, then annually. Cr/eGFR. Hb. ISTI (for TB screening). Adherence assessment. STI screening.',
    mcqs: [
      { question: 'First-line ART regimen in Kenya (2024 guidelines)?', options: ['A. AZT + 3TC + NVP', 'B. TDF + 3TC + EFV', 'C. TLD (TDF/3TC/DTG)', 'D. ABC + 3TC + LPV/r'], correctAnswer: 'C', explanation: 'TLD is the preferred first-line regimen in Kenya — single tablet, once daily, high barrier to resistance, well tolerated.' },
      { question: 'Which drug in TLD requires renal monitoring?', options: ['A. Lamivudine', 'B. Dolutegravir', 'C. Tenofovir', 'D. All of the above'], correctAnswer: 'C', explanation: 'Tenofovir disoproxil fumarate (TDF) accumulates in proximal renal tubules causing nephrotoxicity. Monitor Cr/eGFR at baseline and annually.' },
    ],
  },
  {
    id: 'dnote-sepsis',
    name: 'Sepsis',
    unitId: 'cp-em',
    specialty: 'Emergency & Critical Care',
    overview:
      'Life-threatening organ dysfunction from infection. SOFA/qSOFA score. Hour-1 bundle: blood cultures, lactate, broad-spectrum ABx, IVF, vasopressors if shock. Source control.',
    keyDrugs: [
      { drug: 'Piperacillin/Tazobactam', class: 'Beta-lactam/BLI', sideEffects: ['Diarrhoea (C. difficile)', 'Rash', 'Nephrotoxicity', 'Bleeding (high dose)', 'Neurotoxicity (renal impairment)'] },
      { drug: 'Vancomycin', class: 'Glycopeptide', sideEffects: ['Red man syndrome (infusion rate)', 'Nephrotoxicity', 'Ototoxicity', 'Thrombocytopenia', 'Neutropenia'] },
      { drug: 'Norepinephrine', class: 'Vasopressor', sideEffects: ['Tachyarrhythmia', 'Tissue ischaemia (extravasation)', 'Bradycardia (reflex)', 'Hypoperfusion (excessive vasoconstriction)'] },
    ],
    monitoring: 'Lactate q2-4h. MAP ≥65 mmHg. Urine output. ScvO₂. Cultures. WBC, CRP, procalcitonin. Vasopressor weaning. Fluid balance.',
    mcqs: [
      { question: 'First-line vasopressor in septic shock?', options: ['A. Dopamine', 'B. Norepinephrine', 'C. Epinephrine', 'D. Vasopressin'], correctAnswer: 'B', explanation: 'Norepinephrine is the first-line vasopressor for septic shock (target MAP ≥65 mmHg). Add vasopressin or epinephrine if insufficient.' },
    ],
  },

  // ─── Rheumatology ───────────────────────────────────────────────
  {
    id: 'dnote-ra',
    name: 'Rheumatoid Arthritis',
    unitId: 'cp-rheum',
    specialty: 'Rheumatology & Musculoskeletal Pharmacotherapy',
    overview:
      'Chronic autoimmune inflammatory arthritis. Symmetrical small joint involvement. Treat-to-target: start DMARD early (methotrexate first-line). Add biologics if inadequate response. Monitor for extra-articular manifestations.',
    keyDrugs: [
      { drug: 'Methotrexate', class: 'csDMARD', sideEffects: ['Hepatotoxicity', 'Pulmonary fibrosis', 'Myelosuppression', 'Stomatitis', 'Nausea', 'Teratogenicity'] },
      { drug: 'Sulfasalazine', class: 'csDMARD', sideEffects: ['Rash', 'Oligospermia', 'GI upset', 'Haemolysis (G6PD)', 'Hepatotoxicity'] },
      { drug: 'Prednisolone', class: 'Corticosteroid (bridge)', sideEffects: ['Weight gain', 'Osteoporosis', 'Hyperglycaemia', 'Immunosuppression', 'Adrenal suppression'] },
    ],
    monitoring: 'FBC, LFTs, Cr q1-3mo (MTX). CXR (MTX lung). CRP, ESR. DAS28 score. Bone density if on steroids. G6PD (sulfasalazine).',
    mcqs: [
      { question: 'First-line DMARD for RA?', options: ['A. Hydroxychloroquine', 'B. Methotrexate', 'C. Leflunomide', 'D. Prednisolone'], correctAnswer: 'B', explanation: 'Methotrexate is the anchor DMARD — start 15mg weekly, titrate to 20-25mg. Folic acid 5mg weekly (except MTX day) reduces side effects.' },
    ],
  },

  // ─── Oncology ──────────────────────────────────────────────────
  {
    id: 'dnote-breast-cancer',
    name: 'Breast Cancer',
    unitId: 'cp-onc',
    specialty: 'Haematology & Oncology',
    overview:
      'Most common cancer in women. Subtypes: HR+/HER2-, HER2+, triple-negative (TNBC). Treatment: surgery + (neo)adjuvant chemo + targeted therapy + endocrine therapy (if HR+). Early detection improves outcomes significantly.',
    keyDrugs: [
      { drug: 'Tamoxifen', class: 'SERM', sideEffects: ['Hot flushes', 'VTE risk', 'Endometrial cancer (long-term)', 'Weight gain', 'Nausea'] },
      { drug: 'Trastuzumab (Herceptin)', class: 'Anti-HER2 mAb', sideEffects: ['Cardiotoxicity (LVEF decline)', 'Infusion reaction', 'Diarrhoea', 'Fatigue'] },
      { drug: 'Doxorubicin', class: 'Anthracycline', sideEffects: ['Cardiomyopathy (cumulative dose-dependent)', 'Myelosuppression', 'Alopecia', 'Nausea/vomiting', 'Extravasation tissue necrosis'] },
      { drug: 'Paclitaxel', class: 'Taxane', sideEffects: ['Peripheral neuropathy', 'Myelosuppression (neutropenia)', 'Hypersensitivity (Cremophor)', 'Alopecia', 'Arthralgia/myalgia'] },
    ],
    monitoring: 'LVEF (trastuzumab, anthracyclines). FBC before each chemo cycle. LFTs. Nerve conduction (taxanes). Bone density (aromatase inhibitors). Mammogram annually.',
    mcqs: [
      { question: 'Life-threatening side effect of doxorubicin?', options: ['A. Peripheral neuropathy', 'B. Cardiomyopathy', 'C. Pulmonary fibrosis', 'D. Renal failure'], correctAnswer: 'B', explanation: 'Doxorubicin causes cumulative dose-dependent cardiomyopathy. Maximum lifetime dose: 450-550 mg/m². Monitor LVEF before each cycle.' },
    ],
  },

  // ─── Emergency ─────────────────────────────────────────────────
  {
    id: 'dnote-anaphylaxis',
    name: 'Anaphylaxis',
    unitId: 'cp-em',
    specialty: 'Emergency & Critical Care',
    overview:
      'Severe, life-threatening systemic hypersensitivity reaction. Rapid onset: respiratory, cardiovascular, skin, GI involvement. IM epinephrine is first-line and life-saving. Delayed epinephrine = increased mortality.',
    keyDrugs: [
      { drug: 'Epinephrine (Adrenaline) 1:1000 IM', class: 'Sympathomimetic', sideEffects: ['Tachycardia', 'Hypertension', 'Tremor', 'Pallor', 'Myocardial ischaemia (overdose)'] },
      { drug: 'Chlorpheniramine IV', class: 'Antihistamine (1st gen)', sideEffects: ['Sedation', 'Anticholinergic (dry mouth, blurred vision)', 'Hypotension (rapid IV)', 'Dizziness'] },
      { drug: 'Prednisolone IV', class: 'Corticosteroid', sideEffects: ['Hyperglycaemia', 'Psychosis (rare)', 'Fluid retention', 'Immunosuppression'] },
    ],
    monitoring: 'ABC assessment. BP, HR, SpO₂, PEF continuously. Response to IM epinephrine. Biphasic reaction risk (up to 20% — observe 6-8h).',
    mcqs: [
      { question: 'First-line, most important drug for anaphylaxis?', options: ['A. IV Chlorpheniramine', 'B. IV Hydrocortisone', 'C. IM Epinephrine', 'D. Inhaled Salbutamol'], correctAnswer: 'C', explanation: 'IM epinephrine (0.3-0.5mg, 1:1000, anterolateral thigh) is first-line. Delayed administration increases mortality. Repeat q5-15min if no response.' },
    ],
  },
  {
    id: 'dnote-overdose',
    name: 'Paracetamol Overdose',
    unitId: 'cp-tox',
    specialty: 'Toxicology & Poison Management',
    overview:
      'Leading cause of acute liver failure. Toxic dose: >150mg/kg (adults) or >7.5g. Metabolism via CYP2E1 → NAPQI → glutathione depletion → hepatotoxicity. Use Rumack-Matthew nomogram to guide NAC therapy.',
    keyDrugs: [
      { drug: 'N-Acetylcysteine (NAC)', class: 'Antidote', sideEffects: ['Nausea/vomiting', 'Anaphylactoid reaction (flushing, bronchospasm)', 'Rash', 'Hypotension (rapid infusion)'] },
    ],
    monitoring: 'Paracetamol level at ≥4h post-ingestion. Plot on nomogram. LFTs (ALT, AST), INR, Cr at baseline and q12-24h. pH (if severe). Lactate.',
    mcqs: [
      { question: 'When should NAC be started for paracetamol overdose?', options: ['A. Only when ALT is elevated', 'B. Within 8 hours of ingestion if level above treatment line', 'C. After 24 hours', 'D. Only if symptoms develop'], correctAnswer: 'B', explanation: 'NAC is most effective within 8 hours of ingestion. Start immediately if level is above the treatment line on the Rumack-Matthew nomogram. NAC also effective beyond 24h for late presenters.' },
    ],
  },
  {
    id: 'dnote-opoison',
    name: 'Organophosphate Poisoning',
    unitId: 'cp-tox',
    specialty: 'Toxicology & Poison Management',
    overview:
      'Inhibits acetylcholinesterase → excessive cholinergic stimulation (SLUDGE syndrome: salivation, lacrimation, urination, defecation, GI upset, emesis). Treatment: atropine + pralidoxime.',
    keyDrugs: [
      { drug: 'Atropine', class: 'Anticholinergic', sideEffects: ['Tachycardia', 'Dry mouth', 'Blurred vision', 'Urinary retention', 'Hyperthermia (heat stroke risk)'] },
      { drug: 'Pralidoxime (2-PAM)', class: 'AChE reactivator', sideEffects: ['Dizziness', 'Blurred vision', 'Tachycardia', 'Muscle rigidity (rapid IV)', 'Hypertension'] },
    ],
    monitoring: 'HR, pupil size, secretions (tracheal). AChE activity. Pulse oximetry. RBS. Mental status. Atropine infusion rate (titrate to secretions).',
    mcqs: [
      { question: 'Endpoint for atropine therapy in organophosphate poisoning?', options: ['A. Heart rate >100', 'B. Pupils fully dilated', 'C. Drying of pulmonary secretions', 'D. Return of bowel sounds'], correctAnswer: 'C', explanation: 'Atropine is titrated to drying of pulmonary secretions (not tachycardia or mydriasis). Give 1-2mg IV q5min until chest clear.' },
    ],
  },

  // ─── Dermatology ────────────────────────────────────────────────
  {
    id: 'dnote-acne',
    name: 'Acne',
    unitId: 'cp-derm',
    specialty: 'Dermatology Pharmacotherapy',
    overview:
      'Chronic inflammatory pilosebaceous disorder. Pathogenesis: follicular hyperkeratinisation, sebum excess, C. acnes colonisation, inflammation. Topical first-line. Oral antibiotics/systemic retinoids for moderate-severe.',
    keyDrugs: [
      { drug: 'Benzoyl Peroxide', class: 'Topical antimicrobial', sideEffects: ['Skin irritation', 'Dryness', 'Bleaching of clothing/hair', 'Photosensitivity'] },
      { drug: 'Clindamycin 1% topical', class: 'Topical antibiotic', sideEffects: ['Skin irritation', 'Dryness', 'C. difficile (rare with topical)', 'Resistance (monotherapy avoid)'] },
      { drug: 'Isotretinoin', class: 'Retinoid (oral)', sideEffects: ['Teratogenicity (strict pregnancy prevention)', 'Dry skin/mucous membranes', 'Hypertriglyceridaemia', 'Mood changes (depression risk)', 'Hepatotoxicity'] },
    ],
    monitoring: 'Pregnancy test monthly (isotretinoin). LFTs, lipids at baseline + monthly (isotretinoin). FBC. Mood monitoring. Treatment adherence.',
    mcqs: [
      { question: 'Strict monitoring requirement for isotretinoin?', options: ['A. Blood glucose', 'B. Pregnancy test', 'C. Thyroid function', 'D. Bone density'], correctAnswer: 'B', explanation: 'Isotretinoin is highly teratogenic. Female patients must have monthly pregnancy tests and use two forms of contraception (iPLEDGE program).' },
    ],
  },

  // ─── Paediatrics ────────────────────────────────────────────────
  {
    id: 'dnote-child-pna',
    name: 'Childhood Pneumonia',
    unitId: 'cp-peds',
    specialty: 'Paediatric Pharmacotherapy',
    overview:
      'Leading infectious cause of death in children <5y. WHO IMCI classification: fast breathing (pneumonia) + chest indrawing (severe pneumonia). Treat with antibiotics + supportive care. Hypoxaemia = oxygen.',
    keyDrugs: [
      { drug: 'Amoxicillin', class: 'Penicillin', sideEffects: ['Rash', 'Diarrhoea', 'C. difficile'] },
      { drug: 'Gentamicin', class: 'Aminoglycoside', sideEffects: ['Nephrotoxicity', 'Ototoxicity', 'Neuromuscular blockade'] },
      { drug: 'Ceftriaxone', class: 'Cephalosporin (3rd gen)', sideEffects: ['Biliary sludge', 'C. difficile', 'Rash'] },
    ],
    monitoring: 'Respiratory rate, SpO₂, chest indrawing, feeding ability. Fever trend. Antibiotic response at 48h. Chest X-ray if severe.',
    mcqs: [
      { question: 'WHO classification for chest indrawing + fast breathing in a child?', options: ['A. No pneumonia', 'B. Pneumonia', 'C. Severe pneumonia', 'D. Very severe disease'], correctAnswer: 'C', explanation: 'Chest indrawing = severe pneumonia per WHO IMCI. Refer to hospital for injectable antibiotics (ampicillin + gentamicin).' },
    ],
  },

  // ─── Ophthalmology ─────────────────────────────────────────────
  {
    id: 'dnote-glaucoma',
    name: 'Glaucoma (Open Angle)',
    unitId: 'cp-ophth',
    specialty: 'Ophthalmology Pharmacotherapy',
    overview:
      'Progressive optic neuropathy → visual field loss. Major risk factor: elevated IOP. First-line: topical prostaglandin analogues. Target IOP individualised (usually <21 mmHg). Chronic therapy required.',
    keyDrugs: [
      { drug: 'Latanoprost', class: 'Prostaglandin analogue', sideEffects: ['Conjunctival hyperaemia', 'Eyelash growth (darkening, thickening)', 'Periocular pigmentation', 'Iris colour change', 'Cystoid macular oedema'] },
      { drug: 'Timolol', class: 'Beta-blocker (topical)', sideEffects: ['Bradycardia', 'Bronchospasm (contraindicated in asthma)', 'Hypotension', 'Fatigue', 'Depression'] },
    ],
    monitoring: 'IOP at each visit. Visual field (perimetry) q6-12mo. Optic nerve head exam (OCT). Corneal health. Systemic effects of drops.',
    mcqs: [
      { question: 'First-line topical therapy for POAG?', options: ['A. Timolol', 'B. Latanoprost', 'C. Dorzolamide', 'D. Brimonidine'], correctAnswer: 'B', explanation: 'Prostaglandin analogues (latanoprost) are first-line — once-daily dosing, well tolerated, most effective IOP reduction (25-30%).' },
    ],
  },

  // ─── OBGYN ──────────────────────────────────────────────────────
  {
    id: 'dnote-preeclampsia',
    name: 'Preeclampsia / Eclampsia',
    unitId: 'cp-obgyn',
    specialty: 'Obstetrics & Gynaecology Pharmacotherapy',
    overview:
      'Hypertensive disorder of pregnancy (≥20wk) + proteinuria/end-organ dysfunction. Eclampsia = seizures. Only cure is delivery. Antihypertensives + MgSO₄ for seizure prevention/treatment. Leading cause of maternal mortality in Kenya.',
    keyDrugs: [
      { drug: 'Magnesium Sulfate IV', class: 'Anticonvulsant', sideEffects: ['Facial flushing', 'Respiratory depression (toxic level)', 'Cardiac arrest (overdose)', 'Hypotension', 'Hyporeflexia'] },
      { drug: 'Nifedipine', class: 'CCB', sideEffects: ['Headache', 'Flushing', 'Ankle oedema', 'Palpitations', 'Hypotension'] },
      { drug: 'Hydralazine IV', class: 'Vasodilator', sideEffects: ['Reflex tachycardia', 'Headache', 'Nausea', 'Lupus-like syndrome (long-term)', 'Flushing'] },
    ],
    monitoring: 'BP q15min × 1h, then hourly. Patellar reflexes, RR (MgSO₄ toxicity — loss of reflexes at 8-10 mg/dL, resp depression >12). Urine output. Fetal wellbeing. Urine protein.',
    mcqs: [
      { question: 'Signs of magnesium sulfate toxicity?', options: ['A. Tachycardia, hypertension', 'B. Loss of patellar reflexes, respiratory depression', 'C. Hypoglycaemia, polyuria', 'D. Diarrhoea, abdominal pain'], correctAnswer: 'B', explanation: 'MgSO₄ toxicity: loss of DTRs at 8-10 mg/dL, respiratory depression at >12 mg/dL, cardiac arrest at >15 mg/dL. Antidote: 10% calcium gluconate 10mL IV.' },
    ],
  },
]

export function getDiseaseNoteByDiseaseId(diseaseId: string): DiseaseNote | undefined {
  return DISEASE_NOTES.find((n) => n.id === diseaseId)
}

export function getDiseaseNotesByUnit(unitId: string): DiseaseNote[] {
  return DISEASE_NOTES.filter((n) => n.unitId === unitId)
}

export function getDiseaseNotesBySpecialty(specialty: string): DiseaseNote[] {
  return DISEASE_NOTES.filter((n) => n.specialty === specialty)
}
