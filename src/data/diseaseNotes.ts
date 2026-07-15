import {
  HTN_RAAS_DIAGRAM, HF_GDMT_DIAGRAM, ACS_DIAGRAM, DM_TREATMENT_DIAGRAM,
  ASTHMA_STEPS, COPD_DIAGRAM, TB_DIAGRAM, MALARIA_DIAGRAM, HIV_DIAGRAM,
  SEPSIS_DIAGRAM, EPILEPSY_DIAGRAM,
} from './diseaseDiagrams'

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
  diagram?: string
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
  // ══════════════════════════════════════════════════════════════════
  // 1. CARDIOVASCULAR DISORDERS (cp-cv)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-htn',
    name: 'Hypertension',
    unitId: 'cp-cv',
    specialty: 'Cardiovascular Disorders',
    overview: 'Chronic elevation of arterial BP ≥140/90 mmHg. Major risk factor for stroke, MI, HF, CKD. First-line therapy differs by ethnicity, age, and comorbidities. Target BP <130/80 in most adults; <140/90 in uncomplicated. Pathophysiology involves RAAS activation, SNS overactivity, and vascular remodelling. Non-pharmacological: DASH diet, Na⁺ restriction <2g/d, exercise, weight loss, alcohol moderation.',
    diagram: HTN_RAAS_DIAGRAM,
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
    id: 'dnote-htn-emergency',
    name: 'Hypertensive Emergency',
    unitId: 'cp-cv',
    specialty: 'Cardiovascular Disorders',
    overview: 'Severe hypertension (BP >180/120) with acute target organ damage (CNS, CV, renal). Requires immediate BP reduction (IV therapy) but not to normal — reduce MAP by 20-25% in first hour to prevent organ hypoperfusion. Agents: labetalol, nitroprusside, nicardipine.',
    keyDrugs: [
      { drug: 'Labetalol IV', class: 'Alpha/beta blocker', sideEffects: ['Bradycardia', 'Hypotension', 'Bronchospasm', 'Heart block', 'Nausea'] },
      { drug: 'Sodium Nitroprusside IV', class: 'Vasodilator', sideEffects: ['Cyanide toxicity (prolonged use)', 'Thiocyanate toxicity (renal)', 'Hypotension', 'Nausea'] },
    ],
    monitoring: 'BP q5-15min × 1h, then q1h. MAP. Neurological exam. ECG. Cr, eGFR. Fundoscopy. Target 20-25% MAP reduction.',
    mcqs: [
      { question: 'Target BP reduction in first hour of hypertensive emergency?', options: ['A. 50%', 'B. 10-15%', 'C. 20-25%', 'D. Normalize immediately'], correctAnswer: 'C', explanation: 'Aggressive BP lowering can cause organ hypoperfusion. Reduce MAP by 20-25% in the first hour, then to 160/100 over next 2-6h.' },
    ],
  },
  {
    id: 'dnote-hf',
    name: 'Heart Failure (HFrEF)',
    unitId: 'cp-cv',
    specialty: 'Cardiovascular Disorders',
    overview: 'Clinical syndrome of inadequate cardiac output. Classified as HFrEF (EF≤40%), HFmrEF (41-49%), HFpEF (≥50%). GDMT quadruple therapy: ACEi/ARNI + beta-blocker + MRA + SGLT2i. Pathophysiology: reduced CO → RAAS + SNS activation → fluid retention + remodelling.',
    diagram: HF_GDMT_DIAGRAM,
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
    id: 'dnote-ahf',
    name: 'Acute Heart Failure',
    unitId: 'cp-cv',
    specialty: 'Cardiovascular Disorders',
    overview: 'Rapid onset/worsening of HF symptoms requiring urgent therapy. Presents with pulmonary oedema, hypoperfusion, or both (cold + wet). Treatment: IV furosemide, vasodilators (nitroglycerin), inotropes if low output. Identify precipitant (ACS, infection, non-adherence).',
    keyDrugs: [
      { drug: 'Furosemide IV', class: 'Loop diuretic', sideEffects: ['Hypotension', 'Hypokalaemia', 'Ototoxicity', 'Dehydration'] },
      { drug: 'Nitroglycerin IV', class: 'Vasodilator', sideEffects: ['Headache', 'Hypotension', 'Reflex tachycardia', 'Tolerance (prolonged use)'] },
      { drug: 'Dobutamine', class: 'Inotrope', sideEffects: ['Tachycardia', 'Arrhythmias', 'Hypotension (beta2)', 'Myocardial ischaemia'] },
    ],
    monitoring: 'HR, BP, SpO₂, urine output hourly. CXR (pulmonary oedema). Echo. Troponin (ACS rule-out). Electrolytes, Cr daily.',
    mcqs: [
      { question: 'First-line diuretic for acute pulmonary oedema?', options: ['A. HCTZ', 'B. Furosemide IV', 'C. Spironolactone', 'D. Acetazolamide'], correctAnswer: 'B', explanation: 'IV loop diuretic (furosemide 20-40mg IV, double if chronic use) is first-line for acute pulmonary oedema. Monitor urine output.' },
    ],
  },
  {
    id: 'dnote-afib',
    name: 'Atrial Fibrillation',
    unitId: 'cp-cv',
    specialty: 'Cardiovascular Disorders',
    overview: 'Most common sustained arrhythmia. Chaotic atrial activity → irregularly irregular ventricular response. Management: rate vs rhythm control + stroke prevention (CHA₂DS₂-VASc score). Ablation if refractory. Anticoagulate if CHA₂DS₂-VASc ≥2 (men) or ≥3 (women).',
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
    overview: 'Spectrum from unstable angina to NSTEMI/STEMI. Plaque rupture → thrombus → myocardial ischaemia. Immediate antiplatelet + anticoagulation ± reperfusion. Post-ACS: DAPT + high-intensity statin + beta-blocker + ACEi.',
    diagram: ACS_DIAGRAM,
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
  {
    id: 'dnote-angina',
    name: 'Angina Pectoris',
    unitId: 'cp-cv',
    specialty: 'Cardiovascular Disorders',
    overview: 'Myocardial ischaemia from coronary artery stenosis. Stable: predictable with exertion, relieved by rest/GTN. Unstable: crescendo pattern, at rest — medical emergency. Anti-anginals: beta-blockers, CCBs, nitrates, ranolazine, ivabradine.',
    keyDrugs: [
      { drug: 'GTN (Glyceryl Trinitrate) SL', class: 'Nitrate', sideEffects: ['Headache', 'Hypotension', 'Flushing', 'Dizziness', 'Tolerance (prolonged use)'] },
      { drug: 'Atenolol', class: 'Beta-blocker', sideEffects: ['Bradycardia', 'Fatigue', 'Cold extremities', 'Bronchospasm', 'Sexual dysfunction'] },
      { drug: 'Amlodipine', class: 'CCB', sideEffects: ['Ankle oedema', 'Flushing', 'Headache', 'Gingival hyperplasia'] },
    ],
    monitoring: 'Symptom diary (frequency, triggers). ECG during pain. Exercise tolerance test. Lipid panel. BP, HR control.',
    mcqs: [
      { question: 'First-line anti-anginal for stable angina?', options: ['A. GTN as needed + Beta-blocker', 'B. Ranolazine alone', 'C. Ivabradine alone', 'D. Nicorandil'], correctAnswer: 'A', explanation: 'First-line = beta-blocker (reduce HR, O₂ demand) + GTN SL for acute attacks. Add CCB or long-acting nitrate if persistent.' },
    ],
  },
  {
    id: 'dnote-dvt-pe',
    name: 'DVT / Pulmonary Embolism',
    unitId: 'cp-cv',
    specialty: 'Cardiovascular Disorders',
    overview: 'Venous thromboembolism (VTE). DVT: unilateral leg swelling, pain, Homan sign. PE: dyspnoea, chest pain, haemoptysis, hypoxia. Anticoagulate: LMWH → DOAC or warfarin. Duration: 3-6mo (provoked), indefinite (unprovoked/recurrent).',
    keyDrugs: [
      { drug: 'Enoxaparin', class: 'LMWH', sideEffects: ['Bleeding', 'HIT (less than heparin)', 'Osteoporosis (long-term)', 'Hypoaldosteronism'] },
      { drug: 'Rivaroxaban', class: 'DOAC (Factor Xa)', sideEffects: ['Bleeding', 'GI upset', 'Hepatic impairment (caution)'] },
      { drug: 'Warfarin', class: 'VKA', sideEffects: ['Bleeding', 'INR variability', 'Drug interactions', 'Diet interactions'] },
    ],
    monitoring: 'Bleeding signs. INR (warfarin 2.0-3.0). Cr/eGFR (DOACs). Platelets (HIT). D-dimer. Compression US (DVT). CTPA (PE).',
    mcqs: [
      { question: 'Duration of anticoagulation for unprovoked PE?', options: ['A. 3 months', 'B. 6 months', 'C. 12 months', 'D. Indefinite'], correctAnswer: 'D', explanation: 'Unprovoked/recurrent VTE requires indefinite anticoagulation. Provoked VTE (surgery, trauma) → 3-6 months. Assess bleeding risk annually.' },
    ],
  },
  {
    id: 'dnote-hld',
    name: 'Hyperlipidaemia',
    unitId: 'cp-cv',
    specialty: 'Cardiovascular Disorders',
    overview: 'Elevated LDL-C, TG, or low HDL-C. Major CV risk factor. Calculate 10-year ASCVD risk. Statins first-line. Target LDL-C: <1.4 mmol/L (ASCVD), <1.8 mmol/L (high risk), <2.6 mmol/L (moderate risk). Add ezetimibe/PCSK9i if not at target.',
    keyDrugs: [
      { drug: 'Atorvastatin', class: 'Statin', sideEffects: ['Myopathy', 'Rhabdomyolysis', 'ALT elevation', 'New-onset diabetes', 'Cognitive effects'] },
      { drug: 'Ezetimibe', class: 'Cholesterol absorption inhibitor', sideEffects: ['GI upset', 'Headache', 'Fatigue', 'Myalgia'] },
      { drug: 'Fenofibrate', class: 'Fibrate', sideEffects: ['Myopathy (especially with statin)', 'Gallstones', 'LFT elevation', 'Renal impairment'] },
    ],
    monitoring: 'Lipid panel (TC, LDL, HDL, TG) at baseline, 3mo after therapy change, then annually. LFTs, CK (if myalgia). ASCVD risk score.',
    mcqs: [
      { question: 'Target LDL-C for patients with established ASCVD?', options: ['A. <3.0 mmol/L', 'B. <2.6 mmol/L', 'C. <1.8 mmol/L', 'D. <1.4 mmol/L'], correctAnswer: 'D', explanation: 'Very high risk (ASCVD) target LDL-C <1.4 mmol/L (<55 mg/dL). Use high-intensity statin + ezetimibe if needed.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 2. RESPIRATORY DISORDERS (cp-resp)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-asthma',
    name: 'Asthma',
    unitId: 'cp-resp',
    specialty: 'Respiratory Disorders',
    overview: 'Chronic inflammatory airway disease with reversible airflow obstruction. Triggers: allergens, exercise, cold air, infections. Stepwise management based on symptom control and exacerbation risk. GINA guidelines: ICS-formoterol as both maintenance and reliever (SMART).',
    diagram: ASTHMA_STEPS,
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
    overview: 'Chronic, progressive lung disease (emphysema + chronic bronchitis). Irreversible airflow limitation. Caused primarily by smoking. GOLD groups A vs E guide therapy. Management: smoking cessation, bronchodilators, pulmonary rehab, exacerbation prevention. Vaccination (flu, pneumococcal).',
    diagram: COPD_DIAGRAM,
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
    overview: 'Acute lung infection in non-hospitalised patients. Pathogens: S. pneumoniae, H. influenzae, M. pneumoniae, C. pneumoniae, viruses. CURB-65 score guides severity and site of care. Empiric antibiotics based on local guidelines. Macrolide + beta-lactam for hospitalised (non-ICU).',
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
    id: 'dnote-bronchitis',
    name: 'Acute Bronchitis',
    unitId: 'cp-resp',
    specialty: 'Respiratory Disorders',
    overview: 'Acute inflammation of bronchial mucosa, usually viral (>90%). Productive cough lasting 1-3 weeks. Antibiotics NOT indicated unless pertussis suspected. Symptomatic: cough suppressants, fluids, honey. Differentiate from pneumonia (no focal signs, no high fever).',
    keyDrugs: [
      { drug: 'Dextromethorphan', class: 'Cough suppressant', sideEffects: ['Drowsiness', 'Dizziness', 'GI upset', 'Serotonin syndrome (with SSRIs)'] },
      { drug: 'Guaifenesin', class: 'Expectorant', sideEffects: ['Nausea', 'Vomiting', 'Dizziness', 'Rash'] },
    ],
    monitoring: 'Symptom progression. Fever trend. Warning signs: dyspnoea, high fever, haemoptysis → reassess for pneumonia.',
    mcqs: [
      { question: 'When are antibiotics indicated for acute bronchitis?', options: ['A. Green sputum', 'B. Fever >38°C', 'C. Suspected pertussis', 'D. Cough >5 days'], correctAnswer: 'C', explanation: 'Antibiotics are not routinely indicated for acute bronchitis (viral). Exceptions: pertussis (azithromycin), high risk of complications.' },
    ],
  },
  {
    id: 'dnote-pleural',
    name: 'Pleural Effusion',
    unitId: 'cp-resp',
    specialty: 'Respiratory Disorders',
    overview: 'Fluid in pleural space. Transudative: HF, cirrhosis, nephrotic. Exudative: pneumonia (parapneumonic), TB, malignancy, PE. Light criteria to differentiate. Diagnostic thoracentesis + pleural fluid analysis.',
    keyDrugs: [
      { drug: 'Furosemide', class: 'Loop diuretic (transudative)', sideEffects: ['Hypokalaemia', 'Dehydration', 'Ototoxicity'] },
      { drug: 'Doxycycline', class: 'Pleurodesis agent', sideEffects: ['Chest pain', 'Fever', 'Nausea'] },
    ],
    monitoring: 'Chest X-ray/US resolution. Dyspnoea assessment. Pleural fluid LDH, protein, pH, cytology, culture. Repeat thoracentesis if reaccumulates.',
    mcqs: [
      { question: 'Light criteria differentiate transudate vs exudate using which ratio?', options: ['A. Pleural/serum protein >0.5', 'B. Pleural LDH/serum LDH >0.6', 'C. Both', 'D. Neither'], correctAnswer: 'C', explanation: 'Light criteria: pleural/serum protein >0.5 OR pleural LDH/serum LDH >0.6 OR pleural LDH >2/3 upper normal serum LDH → exudate.' },
    ],
  },
  {
    id: 'dnote-ild',
    name: 'Interstitial Lung Disease',
    unitId: 'cp-resp',
    specialty: 'Respiratory Disorders',
    overview: 'Heterogeneous group of pulmonary parenchymal disorders. IPF most common. Insidious dyspnoea + dry cough + crackles. HRCT shows honeycombing. Antifibrotic therapy: pirfenidone, nintedanib. Avoid smoking.',
    keyDrugs: [
      { drug: 'Pirfenidone', class: 'Antifibrotic', sideEffects: ['Nausea', 'Photosensitivity', 'Rash', 'Fatigue', 'LFT elevation'] },
      { drug: 'Nintedanib', class: 'Tyrosine kinase inhibitor', sideEffects: ['Diarrhoea', 'Nausea', 'LFT elevation', 'GI bleeding (rare)'] },
      { drug: 'Prednisolone', class: 'Corticosteroid', sideEffects: ['Weight gain', 'Osteoporosis', 'Immunosuppression', 'Hyperglycaemia'] },
    ],
    monitoring: 'PFTs (FVC, DLCO) q3-6mo. 6MWT. HRCT progression. LFTs (pirfenidone, nintedanib). Oxygen saturation. Exacerbation frequency.',
    mcqs: [
      { question: 'First-line antifibrotic for IPF?', options: ['A. Prednisolone', 'B. Pirfenidone', 'C. Azathioprine', 'D. N-acetylcysteine'], correctAnswer: 'B', explanation: 'Pirfenidone and nintedanib are approved antifibrotics for IPF. Pirfenidone reduces FVC decline by ~50%. Avoid corticosteroids (not beneficial).' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 3. ENDOCRINE DISORDERS (cp-endo)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-t1dm',
    name: 'Type 1 Diabetes',
    unitId: 'cp-endo',
    specialty: 'Endocrine Disorders',
    overview: 'Autoimmune destruction of pancreatic beta-cells → absolute insulin deficiency. Presents in children/young adults with polyuria, polydipsia, weight loss, DKA. Requires lifelong insulin therapy. Basal-bolus regimen (long-acting + rapid-acting). Carbohydrate counting essential.',
    keyDrugs: [
      { drug: 'Insulin Glargine (Lantus)', class: 'Long-acting insulin', sideEffects: ['Hypoglycaemia', 'Weight gain', 'Lipodystrophy', 'Oedema'] },
      { drug: 'Insulin Lispro (Humalog)', class: 'Rapid-acting insulin', sideEffects: ['Hypoglycaemia', 'Weight gain', 'Injection site reaction'] },
      { drug: 'Insulin Pump (CSII)', class: 'Continuous insulin delivery', sideEffects: ['Infection at site', 'Ketoacidosis (pump failure)', 'Weight gain'] },
    ],
    monitoring: 'HbA1c q3mo. SMBG 4-6x/day (before meals + bedtime). CGM if available. Ketones during illness. Thyroid function, coeliac screen annually.',
    mcqs: [
      { question: 'Which type of insulin is used for basal coverage in T1DM?', options: ['A. Insulin Lispro', 'B. Insulin Glargine', 'C. Regular Insulin', 'D. Insulin Aspart'], correctAnswer: 'B', explanation: 'Long-acting insulin (glargine/detemir/degludec) provides basal coverage once daily. Rapid-acting (lispart/aspart/glulisine) covers meals.' },
    ],
  },
  {
    id: 'dnote-t2dm',
    name: 'Type 2 Diabetes',
    unitId: 'cp-endo',
    specialty: 'Endocrine Disorders',
    overview: 'Insulin resistance + progressive beta-cell dysfunction. Target HbA1c <7% (individualised). First-line: metformin + lifestyle. Add SGLT2i/GLP1-RA if ASCVD/HF/CKD. Complications: CVD, nephropathy, retinopathy, neuropathy.',
    diagram: DM_TREATMENT_DIAGRAM,
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
    overview: 'Life-threatening complication of DM (more common in T1DM). Hyperglycaemia + ketonaemia + metabolic acidosis (anion gap). Precipitated by infection, insulin omission, stress. Management: IVF + insulin infusion + K+ replacement + treat underlying cause.',
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
    id: 'dnote-hhs',
    name: 'Hyperosmolar Hyperglycaemic State',
    unitId: 'cp-endo',
    specialty: 'Endocrine Disorders',
    overview: 'Life-threatening complication of T2DM. Severe hyperglycaemia (>33.3 mmol/L) + hyperosmolality + profound dehydration WITHOUT significant ketosis. Slower onset than DKA. Management: aggressive IV fluids + insulin + electrolyte replacement.',
    keyDrugs: [
      { drug: '0.9% NaCl IV (large volume)', class: 'Crystalloid', sideEffects: ['Fluid overload (HF patients)', 'Hyperchloraemic acidosis', 'Oedema'] },
      { drug: 'Insulin Regular IV', class: 'Short-acting', sideEffects: ['Hypoglycaemia', 'Hypokalaemia'] },
    ],
    monitoring: 'Blood glucose hourly. Na+, K+, osmolality q2-4h. Fluid balance. Neurological status. Cr, BUN. Correct Na+ for glucose.',
    mcqs: [
      { question: 'Key difference between HHS and DKA?', options: ['A. HHS has higher glucose but no ketones', 'B. HHS only occurs in T1DM', 'C. HHS requires less fluid', 'D. HHS has more severe acidosis'], correctAnswer: 'A', explanation: 'HHS: glucose >33.3 mmol/L, osmolality >320, NO ketones/acidosis. DKA: ketones + acidosis. HHS requires more aggressive fluid replacement.' },
    ],
  },
  {
    id: 'dnote-thyroid',
    name: 'Hyperthyroidism / Hypothyroidism',
    unitId: 'cp-endo',
    specialty: 'Endocrine Disorders',
    overview: 'Hyperthyroidism: excess thyroid hormone → weight loss, tremor, heat intolerance, palpitations, diarrhoea. Graves disease most common (autoimmune). Hypothyroidism: deficiency → fatigue, weight gain, cold intolerance, constipation, bradycardia. Hashimoto thyroiditis most common.',
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
  {
    id: 'dnote-osteoporosis',
    name: 'Osteoporosis',
    unitId: 'cp-endo',
    specialty: 'Endocrine Disorders',
    overview: 'Systemic skeletal disease: low bone mass + microarchitectural deterioration → fragility fractures. DXA scan (T-score ≤ -2.5). FRAX tool for 10-year fracture risk. Calcium + vitamin D for all. Antiresorptive: bisphosphonates first-line.',
    keyDrugs: [
      { drug: 'Alendronate', class: 'Bisphosphonate', sideEffects: ['Oesophageal ulceration (take upright, empty stomach)', 'Osteonecrosis of jaw (rare, long-term)', 'Atypical femur fracture', 'Hypocalcaemia', 'Flu-like reaction (first dose)'] },
      { drug: 'Denosumab', class: 'RANKL inhibitor', sideEffects: ['Hypocalcaemia', 'Osteonecrosis of jaw', 'Atypical fracture', 'Infections (rare)'] },
      { drug: 'Calcium + Vitamin D', class: 'Supplement', sideEffects: ['Constipation (calcium)', 'Hypercalciuria', 'Renal stones (excess)'] },
    ],
    monitoring: 'DXA q1-2y. Ca, PO₄, vitamin D, Cr. FRAX reassessment. Dental exam before bisphosphonate (consider drug holiday after 3-5y).',
    mcqs: [
      { question: 'Proper administration of alendronate?', options: ['A. With breakfast', 'B. On empty stomach with water, stay upright 30min', 'C. Before bed', 'D. With milk'], correctAnswer: 'B', explanation: 'Alendronate: take upon waking with plain water, remain upright for 30-60min. Food/drink (except water) reduces absorption by 90%.' },
    ],
  },
  {
    id: 'dnote-adrenal',
    name: 'Adrenal Insufficiency',
    unitId: 'cp-endo',
    specialty: 'Endocrine Disorders',
    overview: 'Primary (Addison disease): adrenal destruction → deficient cortisol + aldosterone. Secondary: pituitary ACTH deficiency → cortisol only. Manifests: fatigue, hyperpigmentation (primary), hyponatraemia, hyperkalaemia (primary), hypotension. Adrenal crisis is life-threatening.',
    keyDrugs: [
      { drug: 'Hydrocortisone', class: 'Glucocorticoid', sideEffects: ['Weight gain', 'Osteoporosis (long-term)', 'Hyperglycaemia', 'Adrenal suppression', 'Immunosuppression'] },
      { drug: 'Fludrocortisone', class: 'Mineralocorticoid', sideEffects: ['Hypertension', 'Hypokalaemia', 'Oedema', 'Cardiac hypertrophy'] },
    ],
    monitoring: 'Symptoms (fatigue, BP). Electrolytes. ACTH, cortisol levels. Bone density if long-term steroids. Sick-day rule: double/triple steroid dose during illness.',
    mcqs: [
      { question: 'Adrenal crisis management — which agent is given first?', options: ['A. Fludrocortisone', 'B. IV Hydrocortisone 100mg bolus', 'C. Oral Prednisolone', 'D. Dexamethasone'], correctAnswer: 'B', explanation: 'Adrenal crisis: IV hydrocortisone 100mg bolus, then 200mg/day infusion or q6h. IV NS for volume. Treat underlying precipitant.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 4. GASTROINTESTINAL DISORDERS (cp-gi)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-pud',
    name: 'Peptic Ulcer Disease',
    unitId: 'cp-gi',
    specialty: 'Gastrointestinal Disorders',
    overview: 'Mucosal erosion in stomach or duodenum. Causes: H. pylori (60-80%), NSAIDs, stress, Zollinger-Ellison. Epigastric pain, relieved by food (duodenal) or worsened (gastric). Triple/quadruple therapy for H. pylori eradication. PPI for acid suppression.',
    keyDrugs: [
      { drug: 'Omeprazole', class: 'PPI', sideEffects: ['Headache', 'GI upset', 'C. difficile risk', 'B12 deficiency (long-term)', 'Hypomagnesaemia', 'Osteoporosis (long-term)'] },
      { drug: 'Amoxicillin + Clarithromycin + Omeprazole', class: 'Triple therapy', sideEffects: ['Diarrhoea', 'Metallic taste (clarithromycin)', 'Nausea', 'QT prolongation', 'C. difficile'] },
      { drug: 'Bismuth subsalicylate', class: 'Bismuth compound', sideEffects: ['Black tongue', 'Black stools', 'Constipation', 'Tinnitus (high dose)', 'Encephalopathy (long-term)'] },
    ],
    monitoring: 'Symptom resolution. Urea breath test or stool antigen for H. pylori eradication (≥4wk after therapy). Endoscopy for alarm features (GI bleeding, weight loss, dysphagia).',
    mcqs: [
      { question: 'First-line H. pylori eradication in Kenya?', options: ['A. PPI + Amoxicillin + Metronidazole', 'B. PPI + Amoxicillin + Clarithromycin', 'C. PPI + Tetracycline + Bismuth', 'D. PPI alone'], correctAnswer: 'B', explanation: 'Standard triple therapy = PPI + amoxicillin 1g + clarithromycin 500mg BID for 14 days. Quadruple therapy if macrolide resistance suspected.' },
    ],
  },
  {
    id: 'dnote-gerd',
    name: 'GERD',
    unitId: 'cp-gi',
    specialty: 'Gastrointestinal Disorders',
    overview: 'Reflux of gastric contents → heartburn, regurgitation, chest pain. Complications: oesophagitis, Barrett oesophagus, stricture. Lifestyle: elevate head, avoid trigger foods, weight loss. PPI first-line. H2RA or antacids for mild/intermittent.',
    keyDrugs: [
      { drug: 'Omeprazole', class: 'PPI', sideEffects: ['Headache', 'C. difficile risk', 'B12 deficiency (long-term)', 'Hypomagnesaemia'] },
      { drug: 'Ranitidine', class: 'H2RA', sideEffects: ['Headache', 'Dizziness', 'Fatigue', 'Confusion (elderly)'] },
      { drug: 'Aluminium/Magnesium Hydroxide', class: 'Antacid', sideEffects: ['Diarrhoea (Mg)', 'Constipation (Al)', 'Hypophosphataemia'] },
    ],
    monitoring: 'Symptom control (frequency, severity). OGD if alarm features or long-standing. Barium swallow if dysphagia. Barrett surveillance q3-5y.',
    mcqs: [
      { question: 'PPI vs H2RA for erosive oesophagitis?', options: ['A. PPI equally effective', 'B. PPI superior for healing', 'C. H2RA heals faster', 'D. No difference'], correctAnswer: 'B', explanation: 'PPIs are superior to H2RAs for healing erosive oesophagitis (~85% vs ~50% at 8 weeks). PPIs provide better acid suppression.' },
    ],
  },
  {
    id: 'dnote-hepatitis',
    name: 'Hepatitis (Viral)',
    unitId: 'cp-gi',
    specialty: 'Gastrointestinal Disorders',
    overview: 'Hepatitis A (faecal-oral, self-limited), B (blood/sexual → chronic), C (blood → chronic). Hepatitis B: treat if HBV DNA >2000 IU/mL + ALT elevated (PegIFN or NAs). Hepatitis C: DAA therapy cures >95%. Vaccinate for A & B.',
    keyDrugs: [
      { drug: 'Tenofovir', class: 'NRTI (HBV)', sideEffects: ['Renal toxicity', 'Fanconi syndrome', 'Bone loss', 'Lactic acidosis'] },
      { drug: 'Entecavir', class: 'NRTI (HBV)', sideEffects: ['Headache', 'Fatigue', 'Dizziness', 'Lactic acidosis (rare)', 'GI upset'] },
      { drug: 'Sofosbuvir/Velpatasvir', class: 'DAA (HCV)', sideEffects: ['Fatigue', 'Headache', 'Nausea', 'Anaemia (with ribavirin)'] },
    ],
    monitoring: 'HBV: HBsAg, HBV DNA, ALT, AFP, US liver q6mo (HCC). HCV: HCV RNA, genotype, LFTs. DAA: SVR12 (cure).',
    mcqs: [
      { question: 'Cure rate of DAA therapy for HCV?', options: ['A. 50-60%', 'B. 70-80%', 'C. >95%', 'D. 100%'], correctAnswer: 'C', explanation: 'Direct-acting antivirals achieve SVR (sustained virologic response) in >95% of patients after 8-12 weeks of therapy, regardless of genotype.' },
    ],
  },
  {
    id: 'dnote-ibd',
    name: 'Inflammatory Bowel Disease',
    unitId: 'cp-gi',
    specialty: 'Gastrointestinal Disorders',
    overview: 'Chronic intestinal inflammation. Crohn: skip lesions, transmural → fistulae, strictures. UC: continuous colonic inflammation → bloody diarrhoea. 5-ASA first-line. Immunomodulators (azathioprine, methotrexate) and biologics (anti-TNF) for moderate-severe.',
    keyDrugs: [
      { drug: 'Mesalazine (5-ASA)', class: 'Aminosalicylate', sideEffects: ['Nausea', 'Diarrhoea', 'Pancreatitis (rare)', 'Nephrotoxicity (interstitial nephritis)', 'Rash'] },
      { drug: 'Infliximab', class: 'Anti-TNF', sideEffects: ['Infusion reaction', 'Infections (TB reactivation)', 'Demyelination', 'Lupus-like syndrome', 'HF worsening'] },
      { drug: 'Azathioprine', class: 'Immunomodulator', sideEffects: ['Myelosuppression (check TPMT)', 'Hepatotoxicity', 'Pancreatitis', 'Nausea', 'Lymphoma (rare)'] },
      { drug: 'Prednisolone', class: 'Corticosteroid', sideEffects: ['Weight gain', 'Osteoporosis', 'Hyperglycaemia', 'Adrenal suppression'] },
    ],
    monitoring: 'Symptoms (stool diary). CRP, ESR, Hb, ferritin. Faecal calprotectin. Colonoscopy with biopsies q1-3y. TPMT before azathioprine. TB screen before anti-TNF. LFTs, FBC.',
    mcqs: [
      { question: 'First-line therapy for mild-moderate UC?', options: ['A. Infliximab', 'B. Mesalazine (5-ASA)', 'C. Prednisolone', 'D. Azathioprine'], correctAnswer: 'B', explanation: '5-ASA (mesalazine/sulfasalazine) is first-line for mild-moderate UC. Topical (enema/suppository) for distal; oral for extensive. Biologics reserved for moderate-severe.' },
    ],
  },
  {
    id: 'dnote-ibs',
    name: 'Irritable Bowel Syndrome',
    unitId: 'cp-gi',
    specialty: 'Gastrointestinal Disorders',
    overview: 'Functional GI disorder: abdominal pain + altered bowel habits WITHOUT organic pathology. Rome IV criteria. Subtypes: IBS-C, IBS-D, IBS-M. Multimodal: diet (low FODMAP), probiotics, antispasmodics, antidepressants, psychological therapy.',
    keyDrugs: [
      { drug: 'Mebeverine', class: 'Antispasmodic', sideEffects: ['Dizziness', 'Headache', 'Constipation', 'Allergic reaction (rare)'] },
      { drug: 'Loperamide', class: 'Antidiarrhoeal', sideEffects: ['Constipation', 'Abdominal cramps', 'Dizziness', 'Nausea'] },
      { drug: 'Prucalopride', class: 'Prokinetic (IBS-C)', sideEffects: ['Headache', 'Nausea', 'Diarrhoea', 'Abdominal pain'] },
    ],
    monitoring: 'Symptoms, stool frequency/consistency (Bristol stool chart). QoL assessment. Psychological comorbidity screen. Red flags: weight loss, bleeding, nocturnal symptoms, FHx CRC.',
    mcqs: [
      { question: 'Which dietary approach is evidence-based for IBS?', options: ['A. Gluten-free diet', 'B. Low FODMAP diet', 'C. High fibre diet', 'D. Ketogenic diet'], correctAnswer: 'B', explanation: 'Low FODMAP diet (fermentable oligo-, di-, mono-saccharides and polyols) reduces symptoms in ~50-80% of IBS patients. Implement with dietitian guidance.' },
    ],
  },
  {
    id: 'dnote-pancreatitis',
    name: 'Pancreatitis (Acute)',
    unitId: 'cp-gi',
    specialty: 'Gastrointestinal Disorders',
    overview: 'Inflammation of pancreas. Causes: gallstones (40%), alcohol (30%), idiopathic, drugs, triglycerides, trauma. Epigastric pain radiating to back, nausea/vomiting. Ranson/APACHE II score for severity. Management: aggressive IVF, analgesia, NBM → oral feeding when tolerated.',
    keyDrugs: [
      { drug: '0.9% NaCl IV', class: 'Crystalloid', sideEffects: ['Fluid overload', 'Hyperchloraemic acidosis'] },
      { drug: 'Morphine', class: 'Opioid analgesic', sideEffects: ['Nausea', 'Constipation', 'Respiratory depression', 'Biliary spasm'] },
      { drug: 'Imipenem/Cilastatin', class: 'Carbapenem (if infected necrosis)', sideEffects: ['Seizures', 'C. difficile', 'Nausea', 'Rash'] },
    ],
    monitoring: 'Lipase/amylase. Ranson score at 48h. CT abdomen with contrast (if severe). CRP. Fluid balance. Ca²⁺, Mg²⁺, glucose. Oxygen saturation.',
    mcqs: [
      { question: 'Most important initial therapy in acute pancreatitis?', options: ['A. Antibiotics', 'B. Aggressive IV fluids', 'C. ERCP', 'D. NPO + NG tube'], correctAnswer: 'B', explanation: 'Aggressive IV fluid resuscitation (Hartmann or NS) within first 12-24h reduces morbidity and mortality. Lactated Ringer preferred over NS.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 5. RENAL DISORDERS (cp-renal)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-ckd',
    name: 'Chronic Kidney Disease',
    unitId: 'cp-renal',
    specialty: 'Renal Disorders',
    overview: 'Progressive loss of kidney function (eGFR <60 for >3mo or albuminuria). Stages 1-5. Complications: anaemia, CKD-MBD, metabolic acidosis, CV disease. Renoprotective: ACEi/ARB + SGLT2i. Avoid nephrotoxins (NSAIDs, contrast, aminoglycosides).',
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
    overview: 'Rapid decline in GFR → rise in Cr and/or ↓ urine output. KDIGO stages 1-3. Causes: pre-renal (dehydration, hypotension), renal (ATN, AIN, GN, vascular), post-renal (obstruction). Avoid nephrotoxins, adjust drug doses for GFR.',
    keyDrugs: [
      { drug: '0.9% NaCl IV', class: 'Crystalloid', sideEffects: ['Fluid overload', 'Hyperchloraemic acidosis', 'Pulmonary oedema (excess)'] },
      { drug: 'Furosemide IV', class: 'Loop diuretic', sideEffects: ['Ototoxicity', 'Hypokalaemia', 'Dehydration', 'Hypomagnesaemia'] },
    ],
    monitoring: 'Cr, BUN, K+, HCO₃, urine output hourly. Urine microscopy (casts, crystals). Renal US (obstruction). Drug levels. Fluid balance.',
    mcqs: [
      { question: 'The "triple whammy" causing AKI involves which drug combo?', options: ['A. ACEi + Diuretic + NSAID', 'B. Metformin + SGLT2i + Statin', 'C. PPI + Aspirin + Clopidogrel', 'D. Warfarin + Amiodarone + Digoxin'], correctAnswer: 'A', explanation: 'ACEi/ARB + diuretic + NSAID = triple whammy. NSAID reduces afferent arteriolar flow, ACEi dilates efferent arteriole, diuretic depletes volume → severe AKI.' },
    ],
  },
  {
    id: 'dnote-nephrotic',
    name: 'Nephrotic Syndrome',
    unitId: 'cp-renal',
    specialty: 'Renal Disorders',
    overview: 'Proteinuria >3.5g/d + hypoalbuminaemia + oedema + hyperlipidaemia. Causes: minimal change (children), FSGS, membranous (adults). Complications: VTE, infections, AKI. Treatment: corticosteroids + ACEi/ARB + diuretics + statin.',
    keyDrugs: [
      { drug: 'Prednisolone', class: 'Corticosteroid', sideEffects: ['Weight gain', 'Osteoporosis', 'Hyperglycaemia', 'Immunosuppression'] },
      { drug: 'Furosemide', class: 'Loop diuretic', sideEffects: ['Hypokalaemia', 'Ototoxicity', 'Dehydration'] },
      { drug: 'Enalapril', class: 'ACEi (antiproteinuric)', sideEffects: ['Cough', 'Hyperkalaemia', 'AKI'] },
    ],
    monitoring: 'Urine protein/Cr ratio (UPCR). Serum albumin. Cr, eGFR. Oedema (weight). BP. Cholesterol. DVT/PE signs. Infection surveillance.',
    mcqs: [
      { question: 'Antiproteinuric agent of choice in nephrotic syndrome?', options: ['A. Furosemide', 'B. Enalapril', 'C. Prednisolone', 'D. Atorvastatin'], correctAnswer: 'B', explanation: 'ACEi/ARBs reduce proteinuria by reducing intraglomerular pressure. Titrate to maximum tolerated dose. Add SGLT2i for additional renoprotection.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 6. NEUROLOGICAL & PSYCHIATRIC (cp-neuro)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-epilepsy',
    name: 'Epilepsy',
    unitId: 'cp-neuro',
    specialty: 'Neurological Disorders',
    overview: 'Recurrent unprovoked seizures due to abnormal electrical brain activity. Classification: focal (simple/complex partial), generalised (tonic-clonic, absence, myoclonic, atonic), unknown onset. Treatment: first-line AED based on seizure type. Goal = seizure freedom without side effects.',
    diagram: EPILEPSY_DIAGRAM,
    keyDrugs: [
      { drug: 'Sodium Valproate', class: 'Broad-spectrum AED', sideEffects: ['Hepatotoxicity', 'Thrombocytopenia', 'Tremor', 'Weight gain', 'Teratogenicity (neural tube defects)', 'PCOS'] },
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
    name: 'Stroke (Ischaemic)',
    unitId: 'cp-neuro',
    specialty: 'Neurological Disorders',
    overview: 'Acute neurological deficit from vascular cause. Ischaemic (85%) vs haemorrhagic (15%). Time-critical: thrombolysis within 4.5h (alteplase), thrombectomy up to 24h (large vessel occlusion). Secondary prevention: antiplatelet + statin + BP control + lifestyle.',
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
    name: 'Major Depressive Disorder',
    unitId: 'cp-neuro',
    specialty: 'Psychiatric Disorders',
    overview: 'Persistent low mood, anhedonia, sleep/appetite changes, poor concentration, suicidal thoughts, fatigue. PHQ-9 for screening and monitoring. First-line: SSRI. Consider CBT + pharmacotherapy. Watch for increased suicidality on initiation (first 2-4 weeks).',
    keyDrugs: [
      { drug: 'Fluoxetine', class: 'SSRI', sideEffects: ['Nausea', 'Insomnia', 'Sexual dysfunction', 'Serotonin syndrome', 'Suicidal ideation (initial)'] },
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
    overview: 'Progressive neurodegenerative disorder with loss of dopaminergic neurons in substantia nigra. Triad: tremor (pill-rolling), rigidity (cogwheel), bradykinesia, postural instability. Levodopa is gold standard. Motor fluctuations and dyskinesias develop after 3-5 years.',
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
  {
    id: 'dnote-bipolar',
    name: 'Bipolar Disorder',
    unitId: 'cp-neuro',
    specialty: 'Psychiatric Disorders',
    overview: 'Mood disorder with alternating mania/hypomania and depression. Mania: elevated mood, grandiosity, decreased need for sleep, rapid speech, risky behaviour. Mood stabiliser (lithium first-line) + atypical antipsychotic for acute mania.',
    keyDrugs: [
      { drug: 'Lithium Carbonate', class: 'Mood stabiliser', sideEffects: ['Tremor', 'Polyuria/polydipsia (nephrogenic DI)', 'Hypothyroidism', 'Nausea', 'Toxicity (narrow therapeutic index)'] },
      { drug: 'Valproate', class: 'Mood stabiliser', sideEffects: ['Hepatotoxicity', 'Thrombocytopenia', 'Weight gain', 'Tremor', 'PCOS'] },
      { drug: 'Olanzapine', class: 'Atypical antipsychotic', sideEffects: ['Weight gain', 'Sedation', 'Hyperglycaemia', 'Dyslipidaemia', 'EPS (less than typical)'] },
    ],
    monitoring: 'Lithium levels (0.6-1.2 mmol/L). TSH, Cr, eGFR q6mo. Fasting glucose, lipids (olanzapine). Weight. Mood diary (MoodChart).',
    mcqs: [
      { question: 'First-line maintenance therapy for bipolar disorder?', options: ['A. Olanzapine', 'B. Lithium', 'C. Carbamazepine', 'D. Lamotrigine'], correctAnswer: 'B', explanation: 'Lithium is first-line for maintenance — reduces suicide risk and prevents both manic and depressive episodes. Target level 0.6-0.8 mmol/L for maintenance.' },
    ],
  },
  {
    id: 'dnote-schizophrenia',
    name: 'Schizophrenia',
    unitId: 'cp-neuro',
    specialty: 'Psychiatric Disorders',
    overview: 'Chronic psychotic disorder: positive (hallucinations, delusions, disorganised speech), negative (avolition, social withdrawal), cognitive symptoms. Antipsychotic first-line. Early intervention improves outcomes. Long-acting injectables for adherence.',
    keyDrugs: [
      { drug: 'Risperidone', class: 'Atypical antipsychotic', sideEffects: ['EPS (dose-dependent)', 'Hyperprolactinaemia (galactorrhoea, gynaecomastia)', 'Sedation', 'Weight gain', 'QT prolongation'] },
      { drug: 'Clozapine', class: 'Atypical antipsychotic', sideEffects: ['Agranulocytosis (mandatory FBC monitoring)', 'Myocarditis (rare)', 'Seizures', 'Hypersalivation', 'Weight gain'] },
      { drug: 'Haloperidol', class: 'Typical antipsychotic', sideEffects: ['EPS (dystonia, parkinsonism, akathisia)', 'Tardive dyskinesia (long-term)', 'QT prolongation'] },
    ],
    monitoring: 'PANSS or CGI-S score. EPS screening (AIMS). Prolactin (risperidone). FBC (clozapine weekly × 18wk, then monthly). ECG. Glucose, lipids, weight.',
    mcqs: [
      { question: 'Clozapine is reserved for which indication?', options: ['A. First-episode psychosis', 'B. Treatment-resistant schizophrenia', 'C. Bipolar depression', 'D. Acute mania'], correctAnswer: 'B', explanation: 'Clozapine is indicated for treatment-resistant schizophrenia (failed ≥2 antipsychotics). Requires mandatory FBC monitoring due to agranulocytosis risk (1-2%).' },
    ],
  },
  {
    id: 'dnote-anxiety',
    name: 'Anxiety Disorders (GAD/Panic)',
    unitId: 'cp-neuro',
    specialty: 'Psychiatric Disorders',
    overview: 'Excessive worry, restlessness, fatigue, poor concentration, muscle tension, sleep disturbance. GAD: worry about multiple domains ≥6mo. Panic disorder: recurrent unexpected panic attacks + fear of recurrence. First-line: SSRI/SNRI + CBT. Benzodiazepines short-term only.',
    keyDrugs: [
      { drug: 'Sertraline', class: 'SSRI', sideEffects: ['Nausea', 'Sexual dysfunction', 'Insomnia', 'Weight changes', 'Initial anxiety worsening'] },
      { drug: 'Diazepam', class: 'Benzodiazepine (short-term)', sideEffects: ['Sedation', 'Tolerance', 'Dependence', 'Cognitive impairment', 'Falls (elderly)'] },
    ],
    monitoring: 'GAD-7 score. Panic diary. Side effects. Suicidality screening. Benzodiazepine use (limit to 2-4 weeks).',
    mcqs: [
      { question: 'First-line pharmacotherapy for GAD?', options: ['A. Diazepam', 'B. Sertraline', 'C. Propranolol', 'D. Buspirone'], correctAnswer: 'B', explanation: 'SSRIs (sertraline, escitalopram) and SNRIs (venlafaxine, duloxetine) are first-line for GAD. Benzodiazepines only for short-term relief (max 2-4 weeks).' },
    ],
  },
  {
    id: 'dnote-alzheimer',
    name: 'Alzheimer Disease',
    unitId: 'cp-neuro',
    specialty: 'Neurological Disorders',
    overview: 'Most common cause of dementia. Progressive cognitive decline: memory loss → language → visuospatial → executive function. Brain: amyloid plaques + neurofibrillary tangles. Cholinesterase inhibitors for mild-moderate. Memantine for moderate-severe.',
    keyDrugs: [
      { drug: 'Donepezil', class: 'Cholinesterase inhibitor', sideEffects: ['Nausea/vomiting', 'Diarrhoea', 'Bradycardia', 'Insomnia', 'Muscle cramps'] },
      { drug: 'Rivastigmine', class: 'Cholinesterase inhibitor', sideEffects: ['GI upset', 'Weight loss', 'Bradycardia', 'Dizziness'] },
      { drug: 'Memantine', class: 'NMDA antagonist', sideEffects: ['Dizziness', 'Headache', 'Constipation', 'Hypertension', 'Somnolence'] },
    ],
    monitoring: 'MMSE/MoCA q6-12mo. Functional status (ADLs). Behavioural symptoms (BPSD). Weight. ECG (bradycardia). Drug interactions (anticholinergics avoid).',
    mcqs: [
      { question: 'Which medication is approved for moderate-severe Alzheimer disease?', options: ['A. Donepezil', 'B. Rivastigmine', 'C. Memantine', 'D. Both A and C'], correctAnswer: 'D', explanation: 'Donepezil (mild-moderate) and memantine (moderate-severe) are both approved. Combination therapy may provide additional benefit.' },
    ],
  },
  {
    id: 'dnote-migraine',
    name: 'Migraine',
    unitId: 'cp-neuro',
    specialty: 'Neurological Disorders',
    overview: 'Recurrent moderate-severe headache (often unilateral, throbbing) + nausea, photophobia, phonophobia ± aura. Triptans for acute. Preventive: beta-blockers, amitriptyline, topiramate, CGRP mAbs (refractory). Lifestyle: avoid triggers, regular sleep/meals.',
    keyDrugs: [
      { drug: 'Sumatriptan', class: 'Triptan (5-HT1B/1D)', sideEffects: ['Chest tightness', 'Paraesthesia', 'Fatigue', 'Nausea', 'Coronary vasospasm (contraindicated in CAD)'] },
      { drug: 'Propranolol', class: 'Beta-blocker (preventive)', sideEffects: ['Bradycardia', 'Fatigue', 'Cold extremities', 'Bronchospasm'] },
      { drug: 'Topiramate', class: 'Anticonvulsant (preventive)', sideEffects: ['Paraesthesia', 'Cognitive dulling', 'Weight loss', 'Nephrolithiasis', 'Closed-angle glaucoma'] },
    ],
    monitoring: 'Headache diary (frequency, severity, triggers, response). MIDAS score (disability). BP, HR (beta-blockers). Renal function (topiramate).',
    mcqs: [
      { question: 'Contraindication to triptan use?', options: ['A. Nausea', 'B. History of stroke or CAD', 'C. Photophobia', 'D. Age >50'], correctAnswer: 'B', explanation: 'Triptans cause vasoconstriction — contraindicated in CAD, stroke, PVD, uncontrolled HTN. Also avoid within 24h of ergotamine.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 7. INFECTIOUS DISEASES (cp-id)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-tb',
    name: 'Tuberculosis',
    unitId: 'cp-id',
    specialty: 'Infectious Diseases',
    overview: 'M. tuberculosis infection — pulmonary most common. 2-month intensive phase (RIPE: Rifampicin, Isoniazid, Pyrazinamide, Ethambutol) + 4-month continuation phase (Rifampicin + Isoniazid). DOTS strategy. Kenya: high burden — screen all cough >2 weeks. MDR-TB: fluoroquinolone + injectable + 2nd-line.',
    diagram: TB_DIAGRAM,
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
  {
    id: 'dnote-malaria',
    name: 'Malaria',
    unitId: 'cp-id',
    specialty: 'Infectious Diseases',
    overview: 'P. falciparum most common in Kenya. Uncomplicated: artemisinin-based combination therapy (ACT). Severe: IV artesunate. Avoid monotherapy. Test before treat (mRDT or smear). Chemoprophylaxis for travellers. Seasonal chemoprevention in Sahel.',
    diagram: MALARIA_DIAGRAM,
    keyDrugs: [
      { drug: 'Artemether/Lumefantrine', class: 'ACT', sideEffects: ['Nausea/vomiting', 'Headache', 'Dizziness', 'QT prolongation', 'Arthralgia'] },
      { drug: 'Artesunate IV', class: 'Artemisinin', sideEffects: ['Post-artemisinin haemolytic anaemia (rare)', 'Nausea', 'QT prolongation'] },
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
    overview: 'Retrovirus → CD4 depletion → immunodeficiency. ART for all PLHIV regardless of CD4. Kenya: TLD (TLD — Tenofovir/Lamivudine/Dolutegravir) first-line (TLD once daily). Treat comorbid TB, OIs. U=U (undetectable = untransmittable).',
    diagram: HIV_DIAGRAM,
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
    id: 'dnote-uti',
    name: 'Urinary Tract Infection',
    unitId: 'cp-id',
    specialty: 'Infectious Diseases',
    overview: 'Bacterial infection of urinary tract. Uncomplicated cystitis: nitrofurantoin, TMP-SMX (if susceptible), fosfomycin. Pyelonephritis: fluoroquinolone or ceftriaxone ± gentamicin. Complicated: treat based on culture. Avoid unnecessary antibiotics (asymptomatic bacteriuria in elderly).',
    keyDrugs: [
      { drug: 'Nitrofurantoin', class: 'Urinary antiseptic', sideEffects: ['Nausea', 'Pulmonary fibrosis (chronic use)', 'Peripheral neuropathy', 'Hepatotoxicity'] },
      { drug: 'Ceftriaxone', class: 'Cephalosporin (3rd gen)', sideEffects: ['Biliary sludge', 'C. difficile', 'Rash'] },
      { drug: 'Ciprofloxacin', class: 'Fluoroquinolone', sideEffects: ['Tendonitis/tendon rupture', 'QT prolongation', 'CNS effects', 'Photosensitivity'] },
    ],
    monitoring: 'Urinalysis (nitrites, LE). Urine culture + sensitivity. Symptoms (dysuria, frequency). Temp (pyelonephritis). Cr (complicated UTI).',
    mcqs: [
      { question: 'First-line for uncomplicated cystitis?', options: ['A. Ciprofloxacin', 'B. Nitrofurantoin', 'C. Amoxicillin', 'D. Ceftriaxone'], correctAnswer: 'B', explanation: 'Nitrofurantoin (100mg BID × 5 days) is first-line for uncomplicated cystitis due to low resistance and minimal ecological impact.' },
    ],
  },
  {
    id: 'dnote-meningitis',
    name: 'Meningitis (Bacterial)',
    unitId: 'cp-id',
    specialty: 'Infectious Diseases',
    overview: 'Inflammation of meninges. Fever + headache + neck stiffness + photophobia ± altered consciousness. LP for CSF analysis (glucose, protein, WBC, culture). Empiric: ceftriaxone + vancomycin ± ampicillin (elderly). Dexamethasone adjunct (pneumococcal).',
    keyDrugs: [
      { drug: 'Ceftriaxone', class: 'Cephalosporin (3rd gen)', sideEffects: ['Biliary sludge', 'C. difficile', 'Rash'] },
      { drug: 'Vancomycin', class: 'Glycopeptide', sideEffects: ['Red man syndrome', 'Nephrotoxicity', 'Ototoxicity', 'Thrombocytopenia'] },
      { drug: 'Dexamethasone', class: 'Corticosteroid (adjunct)', sideEffects: ['Hyperglycaemia', 'GI bleeding', 'Immunosuppression'] },
    ],
    monitoring: 'CSF Gram stain, culture, glucose, protein. WBC, CRP, procalcitonin. Blood cultures. Neurological exam (GCS). Hearing test post-recovery.',
    mcqs: [
      { question: 'Adjuvant dexamethasone in bacterial meningitis benefits which pathogen most?', options: ['A. N. meningitidis', 'B. S. pneumoniae', 'C. H. influenzae', 'D. L. monocytogenes'], correctAnswer: 'B', explanation: 'Dexamethasone (0.15mg/kg q6h × 4 days) before/with first antibiotics reduces mortality and neurological sequelae in pneumococcal meningitis.' },
    ],
  },
  {
    id: 'dnote-gonorrhoea',
    name: 'Gonorrhoea',
    unitId: 'cp-id',
    specialty: 'Infectious Diseases',
    overview: 'N. gonorrhoeae — STI with urethritis, cervicitis, pharyngitis, proctitis. Rising antimicrobial resistance (ceftriaxone + azithromycin dual therapy). Kenya: ceftriaxone 500mg IM + azithromycin 2g oral. Screen for chlamydia co-infection.',
    keyDrugs: [
      { drug: 'Ceftriaxone 500mg IM', class: 'Cephalosporin (3rd gen)', sideEffects: ['Pain at injection site', 'Allergic reaction', 'C. difficile'] },
      { drug: 'Azithromycin 2g oral', class: 'Macrolide', sideEffects: ['GI upset', 'QT prolongation', 'Taste disturbance'] },
    ],
    monitoring: 'Symptom resolution (discharge, dysuria). Test of cure (if pharyngeal). Partner notification/treatment. Screen for HIV, syphilis, chlamydia. Re-test at 3mo.',
    mcqs: [
      { question: 'Current first-line for gonorrhoea in Kenya?', options: ['A. Ciprofloxacin', 'B. Ceftriaxone 500mg IM + Azithromycin 2g', 'C. Doxycycline', 'D. Metronidazole'], correctAnswer: 'B', explanation: 'Due to widespread fluoroquinolone resistance, ceftriaxone 500mg IM + azithromycin 2g oral is first-line. Test of cure recommended for pharyngeal.' },
    ],
  },
  {
    id: 'dnote-typhoid',
    name: 'Typhoid Fever',
    unitId: 'cp-id',
    specialty: 'Infectious Diseases',
    overview: 'S. typhi — faecal-oral transmission. Prolonged fever, headache, abdominal pain, rose spots, relative bradycardia. Blood/stool culture. Increasing antimicrobial resistance. Azithromycin or ceftriaxone first-line (avoid ciprofloxacin in endemic areas).',
    keyDrugs: [
      { drug: 'Azithromycin', class: 'Macrolide', sideEffects: ['QT prolongation', 'GI upset', 'Hepatotoxicity'] },
      { drug: 'Ceftriaxone', class: 'Cephalosporin (3rd gen)', sideEffects: ['Biliary sludge', 'C. difficile', 'Rash'] },
    ],
    monitoring: 'Temperature chart. Blood cultures, Widal test. Abdominal exam. Complications: GI bleeding, perforation, encephalopathy. Stool clearance (3 negative stools).',
    mcqs: [
      { question: 'Drug of choice for MDR typhoid fever?', options: ['A. Ciprofloxacin', 'B. Chloramphenicol', 'C. Azithromycin', 'D. Amoxicillin'], correctAnswer: 'C', explanation: 'Azithromycin is effective for MDR typhoid. Ceftriaxone IV for severe. Avoid ciprofloxacin in South Asia/East Africa due to high resistance.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 8. ONCOLOGY & HAEMATOLOGY (cp-onc)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-breast-cancer',
    name: 'Breast Cancer',
    unitId: 'cp-onc',
    specialty: 'Haematology & Oncology',
    overview: 'Most common cancer in women. Subtypes: HR+/HER2-, HER2+, triple-negative (TNBC). Treatment: surgery + (neo)adjuvant chemo + targeted therapy + endocrine therapy (if HR+). Early detection significantly improves outcomes. Tamoxifen SERM for premenopausal; AI for postmenopausal.',
    keyDrugs: [
      { drug: 'Tamoxifen', class: 'SERM', sideEffects: ['Hot flushes', 'VTE risk', 'Endometrial cancer (long-term)', 'Weight gain', 'Nausea'] },
      { drug: 'Trastuzumab (Herceptin)', class: 'Anti-HER2 mAb', sideEffects: ['Cardiotoxicity (LVEF decline)', 'Infusion reaction', 'Diarrhoea', 'Fatigue'] },
      { drug: 'Doxorubicin', class: 'Anthracycline', sideEffects: ['Cardiomyopathy (cumulative dose-dependent)', 'Myelosuppression', 'Alopecia', 'Nausea/vomiting', 'Extravasation tissue necrosis'] },
      { drug: 'Paclitaxel', class: 'Taxane', sideEffects: ['Peripheral neuropathy', 'Myelosuppression (neutropenia)', 'Hypersensitivity', 'Alopecia', 'Arthralgia/myalgia'] },
    ],
    monitoring: 'LVEF (trastuzumab, anthracyclines). FBC before each chemo cycle. LFTs. Nerve conduction (taxanes). Bone density (aromatase inhibitors). Mammogram annually.',
    mcqs: [
      { question: 'Life-threatening side effect of doxorubicin?', options: ['A. Peripheral neuropathy', 'B. Cardiomyopathy', 'C. Pulmonary fibrosis', 'D. Renal failure'], correctAnswer: 'B', explanation: 'Doxorubicin causes cumulative dose-dependent cardiomyopathy. Maximum lifetime dose: 450-550 mg/m². Monitor LVEF before each cycle.' },
    ],
  },
  {
    id: 'dnote-lung-cancer',
    name: 'Lung Cancer',
    unitId: 'cp-onc',
    specialty: 'Haematology & Oncology',
    overview: 'Leading cause of cancer death. NSCLC (85%) vs SCLC (15%). Staging determines operability. Targeted therapy if EGFR/ALK/ROS1+. Immunotherapy (PD-1/PD-L1) for advanced NSCLC. SCLC responds to chemo but relapses quickly.',
    keyDrugs: [
      { drug: 'Cisplatin', class: 'Platinum agent', sideEffects: ['Nephrotoxicity', 'Ototoxicity', 'Severe nausea/vomiting', 'Peripheral neuropathy', 'Myelosuppression'] },
      { drug: 'Pembrolizumab', class: 'Anti-PD1', sideEffects: ['Immune-related: pneumonitis, colitis, hepatitis, dermatitis, thyroiditis', 'Fatigue', 'Infusion reaction'] },
      { drug: 'Osimertinib', class: 'EGFR TKI (3rd gen)', sideEffects: ['Rash', 'Diarrhoea', 'Cardiotoxicity (QT, HF)', 'Interstitial lung disease', 'Nail changes'] },
    ],
    monitoring: 'CT scan q3mo. LFTs, Cr. Thyroid function (immunotherapy). EGFR mutation status. PD-L1 expression. Smoking cessation counselling.',
    mcqs: [
      { question: 'Which biomarker predicts response to gefitinib/osimertinib?', options: ['A. PD-L1 expression', 'B. EGFR mutation', 'C. ALK rearrangement', 'D. KRAS mutation'], correctAnswer: 'B', explanation: 'EGFR-activating mutations (exon 19 deletion, L858R) predict response to EGFR TKIs. Osimertinib is first-line for EGFR-mutant NSCLC.' },
    ],
  },
  {
    id: 'dnote-anaemia',
    name: 'Iron Deficiency Anaemia',
    unitId: 'cp-onc',
    specialty: 'Haematology & Oncology',
    overview: 'Most common anaemia worldwide. Causes: blood loss (GI, menstruation), malabsorption, poor intake. Microcytic hypochromic indices. Low ferritin, low iron saturation. Oral iron first-line. IV iron if intolerance, malabsorption, or severe.',
    keyDrugs: [
      { drug: 'Ferrous Sulphate', class: 'Oral iron', sideEffects: ['Constipation', 'Nausea', 'Dark stools', 'Epigastric pain', 'Metallic taste'] },
      { drug: 'Iron Sucrose IV', class: 'IV iron', sideEffects: ['Hypotension (infusion reaction)', 'Nausea', 'Headache', 'Anaphylaxis (rare, with iron dextran)'] },
    ],
    monitoring: 'Hb, MCV, ferritin, transferrin saturation. Reticulocyte count at 1-2 weeks (expect increase). Hb should rise 1-2 g/dL per 2-3 weeks. GI workup if no clear cause.',
    mcqs: [
      { question: 'Expected Hb rise after 2 weeks of oral iron?', options: ['A. 0.5 g/dL', 'B. 1-2 g/dL', 'C. 3-4 g/dL', 'D. No change'], correctAnswer: 'B', explanation: 'Hb typically rises 1-2 g/dL after 2-3 weeks of adequate oral iron therapy. Continue iron for 3-6 months after normalisation to replenish stores.' },
    ],
  },
  {
    id: 'dnote-leukaemia',
    name: 'Leukaemia (AML/CLL)',
    unitId: 'cp-onc',
    specialty: 'Haematology & Oncology',
    overview: 'AML: clonal proliferation of myeloid blasts in marrow/blood. Rapidly fatal if untreated. Induction chemo (7+3: cytarabine + anthracycline). CLL: mature B-cell neoplasm in elderly. Watchful waiting if asymptomatic. BTK inhibitors (ibrutinib) for symptomatic.',
    keyDrugs: [
      { drug: 'Cytarabine', class: 'Antimetabolite', sideEffects: ['Myelosuppression', 'Cerebellar toxicity (high dose)', 'GI upset', 'Rash', 'Conjunctivitis'] },
      { drug: 'Ibrutinib', class: 'BTK inhibitor', sideEffects: ['Bleeding (increased with anticoagulants)', 'Atrial fibrillation', 'Hypertension', 'Diarrhoea', 'Arthralgia'] },
    ],
    monitoring: 'FBC + differential + blast count. Bone marrow biopsy. Cr, LFTs. TLS prophylaxis (allopurinol, hydration). Echo/ECG (anthracycline).',
    mcqs: [
      { question: 'TLS prophylaxis for leukaemia induction includes?', options: ['A. Furosemide', 'B. Allopurinol + aggressive IV fluids', 'C. Potassium supplementation', 'D. Sodium bicarbonate alone'], correctAnswer: 'B', explanation: 'Tumour lysis syndrome prophylaxis: aggressive IV fluids + allopurinol (or rasburicase if high risk). Monitor K+, PO₄, Ca²⁺, uric acid, Cr.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 9. PAEDIATRICS (cp-peds)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-child-pna',
    name: 'Childhood Pneumonia',
    unitId: 'cp-peds',
    specialty: 'Paediatric Pharmacotherapy',
    overview: 'Leading infectious cause of death in children <5y. WHO IMCI classification: fast breathing (pneumonia) + chest indrawing (severe pneumonia). Treat with antibiotics + supportive care. Hypoxaemia = oxygen. Vaccinate: PCV, Hib.',
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
  {
    id: 'dnote-neonatal-sepsis',
    name: 'Neonatal Sepsis',
    unitId: 'cp-peds',
    specialty: 'Paediatric Pharmacotherapy',
    overview: 'Systemic infection in first 28 days. Early-onset (<72h): vertical transmission (GBS, E. coli). Late-onset (3-28d): hospital/community (Staph, Klebsiella). Non-specific signs: poor feeding, lethargy, temp instability, respiratory distress. Empiric: ampicillin + gentamicin (or cefotaxime).',
    keyDrugs: [
      { drug: 'Ampicillin IV', class: 'Penicillin', sideEffects: ['Rash', 'Diarrhoea', 'C. difficile', 'Seizures (high dose)'] },
      { drug: 'Gentamicin IV', class: 'Aminoglycoside', sideEffects: ['Nephrotoxicity', 'Ototoxicity', 'Neuromuscular blockade'] },
    ],
    monitoring: 'Blood culture, CRP. FBC, platelets. Lumbar puncture if indicated. Temperature, HR, RR, SpO₂, feeding. Aminoglycoside levels (trough).',
    mcqs: [
      { question: 'Empiric antibiotics for neonatal sepsis in Kenya?', options: ['A. Ceftriaxone alone', 'B. Ampicillin + Gentamicin', 'C. Vancomycin + Metronidazole', 'D. Ciprofloxacin'], correctAnswer: 'B', explanation: 'WHO: ampicillin + gentamicin (or cefotaxime) for neonatal sepsis. Gentamicin once daily dosing is safe and effective.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 10. OBSTETRICS & GYNAECOLOGY (cp-obgyn)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-preeclampsia',
    name: 'Preeclampsia / Eclampsia',
    unitId: 'cp-obgyn',
    specialty: 'Obstetrics & Gynaecology Pharmacotherapy',
    overview: 'Hypertensive disorder of pregnancy (≥20wk) + proteinuria/end-organ dysfunction. Eclampsia = seizures. Only cure is delivery. Antihypertensives + MgSO₄ for seizure prevention/treatment. Leading cause of maternal mortality in Kenya. Low-dose aspirin prophylaxis in high-risk.',
    keyDrugs: [
      { drug: 'Magnesium Sulfate IV', class: 'Anticonvulsant', sideEffects: ['Facial flushing', 'Respiratory depression (toxic level)', 'Cardiac arrest (overdose)', 'Hypotension', 'Hyporeflexia'] },
      { drug: 'Nifedipine', class: 'CCB', sideEffects: ['Headache', 'Flushing', 'Ankle oedema', 'Palpitations', 'Hypotension'] },
      { drug: 'Hydralazine IV', class: 'Vasodilator', sideEffects: ['Reflex tachycardia', 'Headache', 'Nausea', 'Lupus-like syndrome (long-term)', 'Flushing'] },
    ],
    monitoring: 'BP q15min during MgSO₄ loading. DTRs hourly (loss of DTR = Mg toxicity). RR, SpO₂. Urine output. Fetal wellbeing (CTG). LFTs, platelets, Cr.',
    mcqs: [
      { question: 'Most dangerous toxicity of magnesium sulfate?', options: ['A. Flushing', 'B. Respiratory depression', 'C. Headache', 'D. Nausea'], correctAnswer: 'B', explanation: 'MgSO₄ toxicity progression: loss of DTRs (8-10 mEq/L) → respiratory depression (12-14) → cardiac arrest (>15). Monitor DTRs and RR hourly.' },
    ],
  },
  {
    id: 'dnote-menopause',
    name: 'Menopause & HRT',
    unitId: 'cp-obgyn',
    specialty: 'Obstetrics & Gynaecology Pharmacotherapy',
    overview: 'Cessation of menstruation for 12mo (average age 51). Symptoms: hot flushes, vaginal dryness, mood changes, sleep disturbance, bone loss. HRT most effective for vasomotor symptoms. Risk-benefit individualised: oestrogen + progestin (if uterus intact).',
    keyDrugs: [
      { drug: 'Conjugated Oestrogen + Medroxyprogesterone', class: 'HRT', sideEffects: ['Breast tenderness', 'VTE risk', 'GI upset', 'Mood changes', 'Breakthrough bleeding'] },
      { drug: 'Raloxifene', class: 'SERM', sideEffects: ['Hot flushes', 'VTE risk', 'Leg cramps', 'Flu-like symptoms'] },
    ],
    monitoring: 'BMD (DXA) at baseline. Mammogram annually. BP. Gynaecological exam. Lipid profile. Reassess HRT need annually (lowest effective dose, shortest duration).',
    mcqs: [
      { question: 'HRT is contraindicated in which condition?', options: ['A. Osteoporosis', 'B. History of breast cancer', 'C. Severe hot flushes', 'D. Early menopause'], correctAnswer: 'B', explanation: 'HRT is contraindicated in hormone-sensitive cancers (breast, endometrial). Also contraindicated in VTE, liver disease, and unexplained vaginal bleeding.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 11. EMERGENCY & CRITICAL CARE (cp-em)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-sepsis',
    name: 'Sepsis / Septic Shock',
    unitId: 'cp-em',
    specialty: 'Emergency & Critical Care',
    overview: 'Life-threatening organ dysfunction from infection. SOFA/qSOFA score (altered mentation, RR≥22, SBP≤100). Hour-1 bundle: blood cultures, lactate, broad-spectrum ABx, IVF (30mL/kg), vasopressors if shock. Source control (drain abscess, remove line).',
    diagram: SEPSIS_DIAGRAM,
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
  {
    id: 'dnote-anaphylaxis',
    name: 'Anaphylaxis',
    unitId: 'cp-em',
    specialty: 'Emergency & Critical Care',
    overview: 'Severe, life-threatening systemic hypersensitivity reaction. Rapid onset: respiratory (stridor, wheeze), cardiovascular (hypotension, syncope), skin (urticaria, angioedema), GI (nausea, vomiting, diarrhoea). IM epinephrine is first-line and life-saving. Delayed epinephrine = increased mortality.',
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
    id: 'dnote-cardiac-arrest',
    name: 'Cardiac Arrest',
    unitId: 'cp-em',
    specialty: 'Emergency & Critical Care',
    overview: 'Sudden cessation of cardiac output. VF/pVT (shockable) vs PEA/asystole (non-shockable). CPR 30:2, defibrillation for shockable rhythms, IV epinephrine q3-5min. Amiodarone for refractory VF/pVT. Reversible causes: 4Hs (hypoxia, hypo/hyperkalaemia, hypothermia, hypovolaemia) + 4Ts (tension PTX, tamponade, toxins, thrombosis).',
    keyDrugs: [
      { drug: 'Epinephrine IV 1mg q3-5min', class: 'Vasopressor', sideEffects: ['Tachyarrhythmia', 'Hypertension post-ROSC', 'Tissue ischaemia'] },
      { drug: 'Amiodarone IV 300mg', class: 'Antiarrhythmic', sideEffects: ['Hypotension', 'Bradycardia', 'Phlebitis'] },
    ],
    monitoring: 'Rhythm on defibrillator. CPR quality (depth, rate, recoil). ETCO₂ (target >10 mmHg). ROSC signs (pulse, BP, ETCO₂ rise). Temperature management post-ROSC.',
    mcqs: [
      { question: 'First shockable rhythm in adult cardiac arrest?', options: ['A. Asystole', 'B. PEA', 'C. VF/pVT', 'D. Sinus bradycardia'], correctAnswer: 'C', explanation: 'VF/pVT are shockable rhythms. Defibrillate immediately (200J biphasic), then CPR 2min, then epinephrine + repeat defib. Non-shockable: epinephrine ASAP.' },
    ],
  },
  {
    id: 'dnote-status-epilepticus',
    name: 'Status Epilepticus',
    unitId: 'cp-em',
    specialty: 'Emergency & Critical Care',
    overview: 'Seizure lasting >5min or recurrent without return to baseline. Emergency — neuronal injury after 30min. ABC, check glucose. Benzodiazepine first-line (IV lorazepam/diazepam or IM midazolam). Second-line: levetiracetam/phenytoin/valproate IV. Third-line: anaesthetic doses (propofol, thiopental).',
    keyDrugs: [
      { drug: 'Lorazepam IV 4mg', class: 'Benzodiazepine', sideEffects: ['Respiratory depression', 'Hypotension', 'Sedation'] },
      { drug: 'Levetiracetam IV 60mg/kg', class: 'AED', sideEffects: ['Somnolence', 'Behavioural changes', 'Dizziness'] },
      { drug: 'Propofol IV', class: 'Anaesthetic (third-line)', sideEffects: ['Hypotension', 'Respiratory depression', 'PRIS (propofol infusion syndrome)'] },
    ],
    monitoring: 'EEG monitoring (if refractory). GCS. HR, BP, SpO₂, RR. Drug levels (phenytoin). Glucose. Electrolytes (Na, Mg, Ca). ABG.',
    mcqs: [
      { question: 'First-line therapy for established status epilepticus?', options: ['A. IV Phenytoin', 'B. IV Lorazepam/Diazepam', 'C. IV Levetiracetam', 'D. IV Propofol'], correctAnswer: 'B', explanation: 'Benzodiazepines are first-line: IV lorazepam (0.1mg/kg) or diazepam (0.15-0.2mg/kg), or IM midazolam (10mg) if no IV access.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 12. RHEUMATOLOGY (cp-rheum)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-ra',
    name: 'Rheumatoid Arthritis',
    unitId: 'cp-rheum',
    specialty: 'Rheumatology & Musculoskeletal',
    overview: 'Chronic autoimmune inflammatory arthritis. Symmetrical small joint involvement (hands, wrists, feet). Treat-to-target: start DMARD early (methotrexate first-line). Add biologics if inadequate response. Monitor for extra-articular (RA, lung, skin, CV).',
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
  {
    id: 'dnote-gout',
    name: 'Gout',
    unitId: 'cp-rheum',
    specialty: 'Rheumatology & Musculoskeletal',
    overview: 'Monosodium urate crystal arthritis. Acute: sudden, severe monoarticular pain (MTP1 = podagra). NSAIDs/colchicine/steroids for acute flare. ULT: allopurinol (first-line) or febuxostat. Start ULT after flare resolves. Target uric acid <360 μmol/L (<300 with tophi).',
    keyDrugs: [
      { drug: 'Naproxen', class: 'NSAID', sideEffects: ['GI bleeding', 'AKI', 'HTN worsening', 'Cardiovascular risk'] },
      { drug: 'Colchicine', class: 'Antimicrotubule', sideEffects: ['Diarrhoea (dose-limiting)', 'Nausea', 'Myelosuppression (overdose)', 'Neuromuscular toxicity'] },
      { drug: 'Allopurinol', class: 'Xanthine oxidase inhibitor', sideEffects: ['Rash (SJS — stop immediately)', 'GI upset', 'Hepatotoxicity', 'Renal impairment (dose adjust)'] },
    ],
    monitoring: 'Serum uric acid q3-6mo (target). Cr, eGFR (allopurinol dose adjustment). LFTs. Flare frequency. Acute ULT initiation: cover with NSAID/colchicine for 3-6mo.',
    mcqs: [
      { question: 'When should allopurinol be started after a gout flare?', options: ['A. Immediately during flare', 'B. 2-4 weeks after flare resolves', 'C. Only if another flare occurs', 'D. Never — treat flares only'], correctAnswer: 'B', explanation: 'Starting ULT during an acute flare can worsen/prolong it. Start 2-4 weeks after flare resolution. Cover with NSAID or colchicine for 3-6 months.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 13. DERMATOLOGY (cp-derm)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-acne',
    name: 'Acne Vulgaris',
    unitId: 'cp-derm',
    specialty: 'Dermatology Pharmacotherapy',
    overview: 'Chronic inflammatory pilosebaceous disorder. Pathogenesis: follicular hyperkeratinisation, sebum excess, C. acnes colonisation, inflammation. Topical first-line (benzoyl peroxide, retinoid, antibiotic). Oral antibiotics/systemic retinoids for moderate-severe.',
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
  {
    id: 'dnote-psoriasis',
    name: 'Psoriasis',
    unitId: 'cp-derm',
    specialty: 'Dermatology Pharmacotherapy',
    overview: 'Chronic immune-mediated inflammatory skin disease. Well-demarcated erythematous plaques with silvery scale. Extent: localized (plaque, guttate) vs generalised. Topical: corticosteroids, vitamin D analogues. Systemic: methotrexate, cyclosporine, biologics (anti-TNF, IL-17, IL-23).',
    keyDrugs: [
      { drug: 'Betamethasone Valerate', class: 'Topical corticosteroid', sideEffects: ['Skin atrophy', 'Telangiectasia', 'Hypopigmentation', 'Striae', 'Adrenal suppression (prolonged)'] },
      { drug: 'Calcipotriol', class: 'Vitamin D analogue', sideEffects: ['Skin irritation', 'Photosensitivity', 'Hypercalcaemia (excessive use)'] },
      { drug: 'Methotrexate', class: 'csDMARD (systemic)', sideEffects: ['Hepatotoxicity', 'Myelosuppression', 'Pulmonary fibrosis', 'Nausea'] },
    ],
    monitoring: 'Body surface area (BSA), PASI score. LFTs, Cr, FBC (systemic therapy). TB screen before biologics. Liver biopsy (MTX cumulative dose >1.5g).',
    mcqs: [
      { question: 'Biologic target for psoriasis?', options: ['A. CD20', 'B. TNF-alpha / IL-17 / IL-23', 'C. IgE', 'D. IL-5'], correctAnswer: 'B', explanation: 'Anti-TNF (adalimumab), anti-IL-17 (secukinumab), anti-IL-23 (guselkumab) are effective biologics for moderate-severe psoriasis. Screen for TB before starting.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 14. OPHTHALMOLOGY (cp-ophth)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-glaucoma',
    name: 'Glaucoma (Open Angle)',
    unitId: 'cp-ophth',
    specialty: 'Ophthalmology Pharmacotherapy',
    overview: 'Progressive optic neuropathy → visual field loss. Major risk factor: elevated IOP. First-line: topical prostaglandin analogues (latanoprost). Target IOP individualised (usually <21 mmHg). Chronic therapy required. Laser/surgery if poorly controlled.',
    keyDrugs: [
      { drug: 'Latanoprost', class: 'Prostaglandin analogue', sideEffects: ['Conjunctival hyperaemia', 'Eyelash growth (darkening, thickening)', 'Periocular pigmentation', 'Iris colour change', 'Cystoid macular oedema'] },
      { drug: 'Timolol', class: 'Beta-blocker (topical)', sideEffects: ['Bradycardia', 'Bronchospasm (contraindicated in asthma)', 'Hypotension', 'Fatigue', 'Depression'] },
    ],
    monitoring: 'IOP at each visit. Visual field (perimetry) q6-12mo. Optic nerve head exam (OCT). Corneal health. Systemic effects of drops.',
    mcqs: [
      { question: 'First-line topical therapy for POAG?', options: ['A. Timolol', 'B. Latanoprost', 'C. Dorzolamide', 'D. Brimonidine'], correctAnswer: 'B', explanation: 'Prostaglandin analogues (latanoprost) are first-line — once-daily dosing, well tolerated, most effective IOP reduction (25-30%).' },
    ],
  },
  {
    id: 'dnote-conjunctivitis',
    name: 'Conjunctivitis',
    unitId: 'cp-ophth',
    specialty: 'Ophthalmology Pharmacotherapy',
    overview: 'Inflammation of conjunctiva. Viral (most common, watery discharge, preauricular node) vs bacterial (purulent) vs allergic (itching, clear discharge). Viral: self-limited, supportive. Bacterial: topical antibiotics. Allergic: antihistamine/ mast cell stabiliser.',
    keyDrugs: [
      { drug: 'Chloramphenicol eye drops', class: 'Topical antibiotic', sideEffects: ['Aplastic anaemia (rare, systemic absorption)', 'Stinging', 'Hypersensitivity'] },
      { drug: 'Ketotifen eye drops', class: 'Mast cell stabiliser + antihistamine', sideEffects: ['Eye irritation', 'Headache', 'Dry eye'] },
    ],
    monitoring: 'Symptom resolution. Visual acuity. No improvement in 48h → refer. Avoid topical steroids (can worsen herpetic keratitis).',
    mcqs: [
      { question: 'Most common cause of acute conjunctivitis?', options: ['A. Bacteria', 'B. Virus (adenovirus)', 'C. Allergen', 'D. Fungus'], correctAnswer: 'B', explanation: 'Viral conjunctivitis (adenovirus) is most common — highly contagious, starts in one eye, watery discharge. No antibiotics needed. Supportive care.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 15. ENT (cp-ent)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-otitis-media',
    name: 'Otitis Media (Acute)',
    unitId: 'cp-ent',
    specialty: 'ENT Pharmacotherapy',
    overview: 'Middle ear infection — common in children <5y. Ear pain, fever, hearing loss, bulging TM. Watchful waiting for mild cases (48-72h). Amoxicillin first-line (high dose 80-90mg/kg/day). Recurrent: consider grommets.',
    keyDrugs: [
      { drug: 'Amoxicillin', class: 'Penicillin', sideEffects: ['Rash', 'Diarrhoea', 'C. difficile'] },
      { drug: 'Amoxicillin/Clavulanate', class: 'Penicillin/BLI', sideEffects: ['Diarrhoea', 'Nausea', 'Rash', 'Hepatotoxicity'] },
      { drug: 'Paracetamol/Ibuprofen', class: 'Analgesic', sideEffects: ['GI upset (ibuprofen)', 'Hepatotoxicity (paracetamol overdose)'] },
    ],
    monitoring: 'Pain, fever. TM appearance. Hearing assessment. Recurrent episodes (≥3 in 6mo): ENT referral. Speech/language development.',
    mcqs: [
      { question: 'First-line antibiotic for acute otitis media?', options: ['A. Azithromycin', 'B. Amoxicillin high dose', 'C. Co-trimoxazole', 'D. Cefuroxime'], correctAnswer: 'B', explanation: 'High-dose amoxicillin (80-90mg/kg/day) is first-line for AOM. Covers S. pneumoniae, H. influenzae, M. catarrhalis. 10-day course for severe.' },
    ],
  },
  {
    id: 'dnote-allergic-rhinitis',
    name: 'Allergic Rhinitis',
    unitId: 'cp-ent',
    specialty: 'ENT Pharmacotherapy',
    overview: 'IgE-mediated inflammation of nasal mucosa. Seasonal (pollen) vs perennial (dust mites, pet dander). Symptoms: sneezing, rhinorrhoea, nasal congestion, itching. Intranasal corticosteroids first-line. Oral antihistamines for mild/intermittent.',
    keyDrugs: [
      { drug: 'Fluticasone nasal spray', class: 'Intranasal corticosteroid', sideEffects: ['Nasal irritation', 'Epistaxis', 'Headache', 'Septal perforation (rare)'] },
      { drug: 'Cetirizine', class: '2nd-gen antihistamine', sideEffects: ['Drowsiness (less than 1st gen)', 'Dry mouth', 'Headache', 'Fatigue'] },
    ],
    monitoring: 'Symptom control (sneeze, runny, congest, itch score). Peak nasal inspiratory flow. Allergen avoidance measures. Step-down therapy when controlled.',
    mcqs: [
      { question: 'Most effective pharmacotherapy for allergic rhinitis?', options: ['A. Oral antihistamine', 'B. Intranasal corticosteroid', 'C. Oral decongestant', 'D. Montelukast'], correctAnswer: 'B', explanation: 'Intranasal corticosteroids are the most effective single therapy for allergic rhinitis, superior to oral antihistamines for all symptoms including congestion.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 16. TOXICOLOGY (cp-tox)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-overdose',
    name: 'Paracetamol Overdose',
    unitId: 'cp-tox',
    specialty: 'Toxicology & Poison Management',
    overview: 'Leading cause of acute liver failure. Toxic dose: >150mg/kg (adults) or >7.5g. Metabolism via CYP2E1 → NAPQI → glutathione depletion → hepatotoxicity. Use Rumack-Matthew nomogram to guide NAC therapy. NAC most effective within 8h of ingestion.',
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
    overview: 'Inhibits acetylcholinesterase → excessive cholinergic stimulation (SLUDGE syndrome: salivation, lacrimation, urination, defecation, GI upset, emesis). Also: muscle fasciculations, weakness, bradycardia, seizures. Treatment: atropine + pralidoxime.',
    keyDrugs: [
      { drug: 'Atropine', class: 'Anticholinergic', sideEffects: ['Tachycardia', 'Dry mouth', 'Blurred vision', 'Urinary retention', 'Hyperthermia (heat stroke risk)'] },
      { drug: 'Pralidoxime (2-PAM)', class: 'AChE reactivator', sideEffects: ['Dizziness', 'Blurred vision', 'Tachycardia', 'Muscle rigidity (rapid IV)', 'Hypertension'] },
    ],
    monitoring: 'HR, pupil size, secretions (tracheal). AChE activity. Pulse oximetry. RBS. Mental status. Atropine infusion rate (titrate to secretions).',
    mcqs: [
      { question: 'Endpoint for atropine therapy in organophosphate poisoning?', options: ['A. Heart rate >100', 'B. Pupils fully dilated', 'C. Drying of pulmonary secretions', 'D. Return of bowel sounds'], correctAnswer: 'C', explanation: 'Atropine is titrated to drying of pulmonary secretions (not tachycardia or mydriasis). Give 1-2mg IV q5min until chest clear.' },
    ],
  },
  {
    id: 'dnote-opioid-od',
    name: 'Opioid Overdose',
    unitId: 'cp-tox',
    specialty: 'Toxicology & Poison Management',
    overview: 'Respiratory depression + miosis + CNS depression (triad). Naloxone is specific antidote. High mortality if untreated. Naloxone IM/IV 0.4-2mg, repeat q2-3min. Long-acting opioids (methadone, buprenorphine) may require infusion. ABC + airway support.',
    keyDrugs: [
      { drug: 'Naloxone', class: 'Opioid antagonist', sideEffects: ['Acute withdrawal (agitation, vomiting, diarrhoea)', 'Pulmonary oedema (rare)', 'Tachycardia', 'Hypertension'] },
    ],
    monitoring: 'RR, SpO₂, GCS. Pupil size. Response to naloxone (duration of effect 20-90min — may wear off before opioid). ECG (QT with methadone). Cardiac monitoring 12-24h.',
    mcqs: [
      { question: 'Naloxone duration of effect vs most opioids?', options: ['A. Longer than most opioids', 'B. Shorter (20-90min) — may need repeat doses', 'C. Same duration', 'D. Does not wear off'], correctAnswer: 'B', explanation: 'Naloxone half-life is 30-90min, shorter than most opioids. Repeat doses q2-3min or start infusion. Observe 4-6h after last naloxone.' },
    ],
  },
  {
    id: 'dnote-snake-bite',
    name: 'Snake Bite Envenoming',
    unitId: 'cp-tox',
    specialty: 'Toxicology & Poison Management',
    overview: 'Medical emergency. Kenya: saw-scaled viper, puff adder, black mamba, cobra, boomslang. WHO 20-minute whole blood clotting test to assess coagulopathy. Antivenom (specific or polyvalent). ABC, treat anaphylaxis to antivenom. Avoid tourniquets, cutting, suction.',
    keyDrugs: [
      { drug: 'Polyvalent Antivenom IV', class: 'Antivenom', sideEffects: ['Early anaphylactic reaction (treat with epinephrine)', 'Serum sickness (days 5-14) — rash, fever, arthralgia', 'Hypotension'] },
    ],
    monitoring: '20WBCT q6h. Bleeding signs (gums, wound, urine). Progression of local swelling. Neurotoxicity (ptosis, bulbar, respiratory). FBC, INR, Cr. Renal function.',
    mcqs: [
      { question: 'First-line test for venom-induced coagulopathy?', options: ['A. INR', 'B. 20-minute whole blood clotting test', 'C. aPTT', 'D. Platelet count'], correctAnswer: 'B', explanation: 'WHO recommends 20WBCT as bedside test for venom-induced consumptive coagulopathy. Unclotted blood at 20min = positive. Indicates need for antivenom.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // 17. GERIATRICS (cp-ger)
  // ══════════════════════════════════════════════════════════════════
  {
    id: 'dnote-polypharmacy',
    name: 'Polypharmacy in Elderly',
    unitId: 'cp-ger',
    specialty: 'Geriatric Pharmacotherapy',
    overview: 'Use of ≥5 medications concurrently (or ≥10 = hyperpolypharmacy). Increased risk of ADRs, drug interactions, falls, cognitive impairment, hospitalisation. Beers Criteria (potentially inappropriate meds in elderly). STOPP/START criteria for deprescribing.',
    keyDrugs: [],
    monitoring: 'Medication reconciliation at each visit. Renal function (dose adjust). Beers list review. Deprescribe inappropriate meds (benzodiazepines, anticholinergics, PPIs without indication).',
    mcqs: [
      { question: 'Which medication class is potentially inappropriate in elderly per Beers criteria?', options: ['A. Statins', 'B. Benzodiazepines', 'C. ACE inhibitors', 'D. SSRIs'], correctAnswer: 'B', explanation: 'Benzodiazepines are potentially inappropriate in older adults due to increased risk of falls, cognitive impairment, and sedation. Avoid for insomnia, anxiety, or delirium.' },
    ],
  },
]
