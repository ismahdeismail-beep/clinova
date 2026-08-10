// Nursing Care Plan Data — follows NANDA International diagnoses,
// Nursing Interventions Classification (NIC), and Nursing Outcomes
// Classification (NOC) standards.

export interface NursingDiagnosis {
  id: string
  diagnosis: string          // NANDA label
  relatedFactors?: string[]  // etiology / related-to
  definingCharacteristics?: string[]
}

export interface NursingGoal {
  id: string
  shortTerm?: string         // achievable within hours / shift
  longTerm?: string          // discharge / weeks
  targetDate?: string
}

export interface NursingIntervention {
  id: string
  category: 'independent' | 'dependent' | 'collaborative'
  action: string
  rationale?: string
  frequency?: string
}

export interface EvaluationCriteria {
  id: string
  expected: string
  actual?: string
  status: 'met' | 'partially_met' | 'not_met'
}

export interface PatientEducation {
  topic: string
  keyPoints: string[]
  method?: string
}

export interface DischargePlanning {
  checklist: string[]
  followUp: string
  referrals?: string[]
  warningSigns: string[]
}

export interface DiseaseCarePlan {
  id: string
  disease: string
  specialty: string
  overview: string
  pathophysiology: string
  commonCauses?: string[]
  riskFactors?: string[]
  subjectiveData: string[]
  objectiveData: string[]
  nursingDiagnoses: NursingDiagnosis[]
  goals: NursingGoal[]
  interventions: NursingIntervention[]
  evaluation: EvaluationCriteria[]
  patientEducation: PatientEducation[]
  dischargePlanning: DischargePlanning
  complications?: string[]
  nursingNotes?: string[]
}

export interface CarePlanSpecialty {
  id: string
  title: string
  description: string
  icon: string
  color: string
  diseases: string[]         // disease names that belong to this specialty
}

// ── Specialty Registry ────────────────────────────────────────────
export const CARE_PLAN_SPECIALTIES: CarePlanSpecialty[] = [
  {
    id: 'cardiovascular',
    title: 'Cardiovascular Care',
    description: 'Nursing care plans for heart failure, hypertension, ACS, arrhythmias, DVT/PE, and dyslipidaemia.',
    icon: 'HeartPulse',
    color: 'red',
    diseases: ['Heart Failure', 'Hypertension', 'Acute Coronary Syndrome', 'Cardiac Arrhythmias', 'Deep Vein Thrombosis', 'Pulmonary Embolism'],
  },
  {
    id: 'respiratory',
    title: 'Respiratory Care',
    description: 'Nursing care plans for asthma, COPD, pneumonia, tuberculosis, and COVID-19.',
    icon: 'Stethoscope',
    color: 'sky',
    diseases: ['Asthma', 'COPD', 'Community Acquired Pneumonia', 'Tuberculosis', 'COVID-19'],
  },
  {
    id: 'infectious-diseases',
    title: 'Infectious Disease Care',
    description: 'Nursing care plans for sepsis, HIV/AIDS, malaria, and antimicrobial stewardship.',
    icon: 'Bug',
    color: 'amber',
    diseases: ['Sepsis', 'HIV/AIDS', 'Malaria', 'Bacterial Infections'],
  },
  {
    id: 'endocrine',
    title: 'Endocrine Care',
    description: 'Nursing care plans for diabetes mellitus, thyroid disorders, DKA, and adrenal disorders.',
    icon: 'FlaskConical',
    color: 'violet',
    diseases: ['Diabetes Mellitus', 'Diabetic Emergencies', 'Thyroid Disorders', 'Osteoporosis'],
  },
  {
    id: 'gastrointestinal',
    title: 'Gastrointestinal Care',
    description: 'Nursing care plans for PUD, GERD, IBD, liver disease, cirrhosis, and pancreatitis.',
    icon: 'Activity',
    color: 'orange',
    diseases: ['Peptic Ulcer Disease', 'Gastro-oesophageal Reflux Disease', 'Inflammatory Bowel Disease', 'Liver Disease', 'Cirrhosis', 'Pancreatitis'],
  },
  {
    id: 'renal',
    title: 'Renal & Electrolyte Care',
    description: 'Nursing care plans for AKI, CKD, nephrotic syndrome, dialysis care, and electrolyte disorders.',
    icon: 'Droplets',
    color: 'blue',
    diseases: ['Acute Kidney Injury', 'Chronic Kidney Disease', 'Nephrotic Syndrome', 'Dialysis Care', 'Electrolyte Disorders'],
  },
  {
    id: 'neurological',
    title: 'Neurological & Psychiatric Care',
    description: 'Nursing care plans for epilepsy, stroke, Parkinson\'s, depression, schizophrenia, and pain management.',
    icon: 'BrainCircuit',
    color: 'indigo',
    diseases: ['Epilepsy', 'Stroke', 'Parkinson\'s Disease', 'Alzheimer\'s Disease', 'Depression', 'Schizophrenia', 'Neuropathic Pain'],
  },
  {
    id: 'oncology',
    title: 'Haematology & Oncology Care',
    description: 'Nursing care plans for anaemia, leukaemia, lymphoma, chemotherapy supportive care, and palliative care.',
    icon: 'FileText',
    color: 'purple',
    diseases: ['Iron Deficiency Anaemia', 'Sickle Cell Disease', 'Leukaemia', 'Lymphoma', 'Chemotherapy Supportive Care', 'Palliative Care'],
  },
  {
    id: 'obstetrics',
    title: 'Obstetric & Gynaecological Care',
    description: 'Nursing care plans for antenatal care, pre-eclampsia, gestational diabetes, labour, and postpartum care.',
    icon: 'Heart',
    color: 'pink',
    diseases: ['Antenatal Care', 'Hypertensive Disorders of Pregnancy', 'Gestational Diabetes', 'Labour & Delivery', 'Postpartum Care'],
  },
  {
    id: 'paediatric',
    title: 'Paediatric Care',
    description: 'Nursing care plans for neonatal care, childhood infections, paediatric asthma, and malnutrition.',
    icon: 'Baby',
    color: 'teal',
    diseases: ['Neonatal Care', 'Childhood Infections', 'Paediatric Asthma', 'Malnutrition', 'Common Paediatric Emergencies'],
  },
  {
    id: 'geriatric',
    title: 'Geriatric Care',
    description: 'Nursing care plans for polypharmacy, falls, frailty, dementia, delirium, and medication optimisation.',
    icon: 'Users',
    color: 'slate',
    diseases: ['Polypharmacy', 'Falls', 'Frailty', 'Dementia', 'Delirium'],
  },
  {
    id: 'emergency',
    title: 'Emergency & Critical Care',
    description: 'Nursing care plans for shock, cardiac arrest, poisoning, anaphylaxis, and trauma.',
    icon: 'Siren',
    color: 'rose',
    diseases: ['Shock', 'Cardiac Arrest', 'Anaphylaxis', 'Status Epilepticus', 'Trauma'],
  },
  {
    id: 'dermatology',
    title: 'Dermatology Care',
    description: 'Nursing care plans for eczema, psoriasis, acne, and drug-induced skin reactions.',
    icon: 'Scan',
    color: 'fuchsia',
    diseases: ['Eczema', 'Psoriasis', 'Acne', 'Drug-Induced Skin Reactions'],
  },
  {
    id: 'ophthalmology',
    title: 'Ophthalmology Care',
    description: 'Nursing care plans for glaucoma, conjunctivitis, and ocular infections.',
    icon: 'Eye',
    color: 'cyan',
    diseases: ['Glaucoma', 'Conjunctivitis', 'Ocular Infections'],
  },
  {
    id: 'fundamental',
    title: 'Fundamental Nursing Care',
    description: 'Essential procedural care plans for wound dressing, IV therapy, catheter care, oxygen therapy, blood transfusion, NG tube care, post-operative care, pressure injury prevention, and chest drain management.',
    icon: 'HandHeart',
    color: 'emerald',
    diseases: ['Wound Dressing', 'Intravenous Therapy', 'Urinary Catheter Care', 'Oxygen Therapy', 'Post-Operative Care', 'Blood Transfusion', 'Nasogastric Tube Care', 'Pressure Injury Prevention', 'Chest Drain Care'],
  },
  {
    id: 'critical-care',
    title: 'Critical Care & ICU Nursing',
    description: 'Nursing care plans for mechanical ventilation, ARDS, sepsis management, and multi-organ dysfunction in the intensive care setting.',
    icon: 'Activity',
    color: 'red',
    diseases: ['Mechanical Ventilation', 'ARDS', 'Sepsis Management', 'Multi-Organ Dysfunction'],
  },
  {
    id: 'burns',
    title: 'Burns Care',
    description: 'Nursing care plans for minor burns, major burns, inhalation injury, and burn wound sepsis across all settings.',
    icon: 'Flame',
    color: 'orange',
    diseases: ['Minor Burns', 'Major Burns', 'Inhalation Injury', 'Burn Wound Sepsis'],
  },
  {
    id: 'community-health',
    title: 'Community & Public Health Nursing',
    description: 'Nursing care plans for immunisation programmes, chronic disease management in the community, and health promotion.',
    icon: 'Home',
    color: 'lime',
    diseases: ['Immunisation Programme', 'Community Chronic Disease Management', 'Health Promotion & Disease Prevention'],
  },
  {
    id: 'perioperative',
    title: 'Perioperative & Surgical Nursing',
    description: 'Nursing care plans for pre-operative assessment, intra-operative care, post-anaesthesia recovery, and surgical site infection prevention.',
    icon: 'Scissors',
    color: 'teal',
    diseases: ['Pre-Operative Assessment', 'Intra-Operative Care', 'Post-Anaesthesia Recovery', 'Surgical Site Infection Prevention'],
  },
]

// ── Seed Care Plans (comprehensive for key diseases) ──────────────

export const CARE_PLAN_DISEASES: Record<string, DiseaseCarePlan> = {

  // ═══════════════════════════════════════════════════════════════
  // CARDIOVASCULAR
  // ═══════════════════════════════════════════════════════════════

  'Heart Failure': {
    id: 'cp-heart-failure',
    disease: 'Heart Failure',
    specialty: 'Cardiovascular Care',
    overview: 'Heart failure (HF) is a complex clinical syndrome resulting from structural or functional impairment of ventricular filling or ejection of blood. Nursing care focuses on haemodynamic stabilisation, fluid balance, symptom management, medication titration, and patient education for self-management.',
    pathophysiology: 'The heart fails to pump sufficient blood to meet metabolic demands, leading to pulmonary and systemic congestion (HFpEF/HFmrEF) or low output (HFrEF). Neurohormonal activation (RAAS, SNS) compensates initially but drives remodelling and decompensation over time.',
    commonCauses: ['Ischaemic heart disease', 'Hypertension', 'Valvular heart disease', 'Dilated cardiomyopathy', 'Arrhythmias'],
    riskFactors: ['Age > 65', 'Male sex', 'Diabetes mellitus', 'Obesity', 'Smoking', 'Family history of cardiomyopathy'],
    subjectiveData: [
      'Progressive dyspnoea on exertion (DOE), orthopnoea, paroxysmal nocturnal dyspnoea (PND)',
      'Fatigue and reduced exercise tolerance',
      'Ankle swelling / weight gain',
      'Cough — worse when lying down',
      'Reduced appetite, nausea',
      'Chest tightness or palpitations',
    ],
    objectiveData: [
      'Elevated JVP, S3 gallop rhythm',
      'Bibasal crackles / wheeze on auscultation',
      'Bilateral pitting oedema (ankles, sacral)',
      'Tachycardia, pulsus alternans',
      'Weight gain > 1 kg/day or > 2 kg/week',
      'Reduced SpO2, tachypnoea',
      'BNP / NT-proBNP elevated',
      'Echocardiogram: reduced EF (HFrEF) or diastolic dysfunction (HFpEF)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-hf-1',
        diagnosis: 'Decreased Cardiac Output',
        relatedFactors: ['Impaired myocardial contractility', 'Altered heart rhythm', 'Fluid overload'],
        definingCharacteristics: ['Tachycardia', 'Fatigue', 'Weak peripheral pulses', 'Decreased urine output', 'Pulse alternans'],
      },
      {
        id: 'nd-hf-2',
        diagnosis: 'Excess Fluid Volume',
        relatedFactors: ['Compromised regulatory mechanisms', 'Excessive fluid intake', 'Impaired cardiac pump function'],
        definingCharacteristics: ['Oedema', 'Crackles in lungs', 'Weight gain', 'Distended neck veins', 'Altered BP'],
      },
      {
        id: 'nd-hf-3',
        diagnosis: 'Impaired Gas Exchange',
        relatedFactors: ['Pulmonary congestion', 'Alveolar oedema', 'Increased work of breathing'],
        definingCharacteristics: ['Dyspnoea', 'Orthopnoea', 'Tachypnoea', 'Decreased SpO2', 'Abnormal ABG'],
      },
      {
        id: 'nd-hf-4',
        diagnosis: 'Activity Intolerance',
        relatedFactors: ['Imbalance between oxygen supply and demand', 'Generalised weakness'],
        definingCharacteristics: ['Fatigue', 'Exertional dyspnoea', 'Reluctance to move', 'Abnormal vital signs on exertion'],
      },
    ],
    goals: [
      {
        id: 'g-hf-1',
        shortTerm: 'Patient will demonstrate improved fluid balance (daily weight stable, oedema reduced) within 48 hours.',
        longTerm: 'Patient will maintain fluid balance and stable weight at discharge with no re-admission within 30 days.',
      },
      {
        id: 'g-hf-2',
        shortTerm: 'Patient will report reduced dyspnoea (ability to perform ADLs without distress) within 24 hours.',
        longTerm: 'Patient will achieve functional capacity (NYHA Class II or better) within 4–6 weeks.',
      },
      {
        id: 'g-hf-3',
        shortTerm: 'SpO2 will be maintained ≥ 94% within 24 hours.',
        longTerm: 'Patient will maintain adequate oxygenation throughout daily activities.',
      },
    ],
    interventions: [
      {
        id: 'i-hf-1',
        category: 'independent',
        action: 'Monitor and record daily weight at the same time each morning, after voiding, before breakfast.',
        rationale: 'Daily weights are the most sensitive indicator of fluid retention. A gain of > 1 kg/day suggests fluid overload.',
        frequency: 'Every shift + morning',
      },
      {
        id: 'i-hf-2',
        category: 'independent',
        action: 'Assess and document fluid intake and output (I&O) strictly. Maintain strict fluid restriction (typically 1.5–2 L/day) as prescribed.',
        rationale: 'Fluid restriction reduces preload and prevents worsening congestion.',
        frequency: 'Continuous',
      },
      {
        id: 'i-hf-3',
        category: 'independent',
        action: 'Monitor vital signs (HR, BP, RR, SpO2) every 4 hours and as needed. Report HR < 50 or > 120, SBP < 90, or SpO2 < 92%.',
        rationale: 'Haemodynamic monitoring guides diuretic dosing and detects deterioration early.',
        frequency: 'Q4H',
      },
      {
        id: 'i-hf-4',
        category: 'independent',
        action: 'Assess lung sounds, JVP, and peripheral oedema every shift. Document changes from baseline.',
        rationale: 'Progressive crackles, rising JVP, or worsening oedema indicate decompensation requiring intervention.',
        frequency: 'Every shift',
      },
      {
        id: 'i-hf-5',
        category: 'independent',
        action: 'Elevate oedematous extremities above heart level. Apply compression stockings if ordered.',
        rationale: 'Elevation promotes venous return and reduces dependent oedema.',
        frequency: 'As tolerated',
      },
      {
        id: 'i-hf-6',
        category: 'dependent',
        action: 'Administer diuretics (e.g., furosemide IV/PO) as prescribed. Monitor for over-diuresis (hypotension, hypokalaemia).',
        rationale: 'Loop diuretics promote natriuresis and reduce preload.',
        frequency: 'As prescribed',
      },
      {
        id: 'i-hf-7',
        category: 'dependent',
        action: 'Administer ACEi/ARNI, beta-blockers, and MRA as per GDMT protocol. Monitor BP and HR pre-dose.',
        rationale: 'GDMT reduces mortality and hospitalisation in HFrEF. Titrate carefully to avoid hypotension and bradycardia.',
        frequency: 'As prescribed',
      },
      {
        id: 'i-hf-8',
        category: 'collaborative',
        action: 'Collaborate with multidisciplinary team (cardiology, pharmacy, dietitian, physiotherapy) for optimal management.',
        rationale: 'HF management requires coordinated care across disciplines for medication optimisation, dietary guidance, and cardiac rehabilitation.',
        frequency: 'Daily rounds',
      },
      {
        id: 'i-hf-9',
        category: 'independent',
        action: 'Position patient in semi-Fowler\'s or high-Fowler\'s position to ease breathing.',
        rationale: 'Semi-Fowler\'s position reduces venous return to the heart and decreases pulmonary congestion, improving breathing comfort.',
        frequency: 'As needed',
      },
    ],
    evaluation: [
      {
        id: 'e-hf-1',
        expected: 'Daily weight stable (± 0.2 kg), oedema reduced by at least one grade, clear lung sounds.',
        status: 'met',
      },
      {
        id: 'e-hf-2',
        expected: 'Patient reports ability to perform ADLs with minimal or no dyspnoea.',
        status: 'met',
      },
      {
        id: 'e-hf-3',
        expected: 'SpO2 ≥ 94% on room air, respiratory rate 12–20/min.',
        status: 'met',
      },
    ],
    patientEducation: [
      {
        topic: 'Daily Weight Monitoring',
        keyPoints: [
          'Weigh yourself every morning after voiding, before eating, wearing the same clothing.',
          'Record weight in a diary or app.',
          'Call your healthcare provider if you gain more than 1 kg in a day or 2 kg in a week.',
        ],
      },
      {
        topic: 'Fluid & Sodium Restriction',
        keyPoints: [
          'Limit fluids to 1.5–2 litres per day (including soups, ice cream).',
          'Avoid high-sodium foods: processed foods, canned soups, fast food, pickles.',
          'Aim for less than 2 g sodium per day.',
          'Use herbs, spices, lemon juice, and vinegar for flavouring instead of salt.',
        ],
      },
      {
        topic: 'Medication Adherence',
        keyPoints: [
          'Take all medications exactly as prescribed, even when you feel better.',
          'Never stop ACEi, ARNI, beta-blocker, or MRA abruptly without consulting your doctor.',
          'Report dizziness, fainting, or persistent cough to your provider.',
        ],
      },
      {
        topic: 'Activity & Rest',
        keyPoints: [
          'Rest when tired; balance activity with rest periods.',
          'Walk 10–20 minutes daily as tolerated; gradually increase.',
          'Avoid strenuous exercise until cleared by your cardiologist.',
          'Refer to cardiac rehabilitation programme when available.',
        ],
      },
      {
        topic: 'When to Seek Emergency Help',
        keyPoints: [
          'Severe breathlessness at rest or unable to lie flat.',
          'Chest pain or palpitations.',
          'Weight gain > 1 kg/day despite diuretics.',
          'Confusion, inability to think clearly.',
          'Fainting or near-fainting episodes.',
        ],
      },
    ],
    dischargePlanning: {
      checklist: [
        'Medications reconciled and discharge prescriptions provided',
        'Patient/family education completed (diet, weight, medications, symptoms)',
        'Follow-up appointment scheduled (within 7 days)',
        'Cardiac rehabilitation referral made',
        'Dietitian referral for sodium restriction counselling',
        'Home care services arranged if needed',
        'Weighing scale provided or confirmed at home',
        'Emergency contact numbers provided',
      ],
      followUp: 'Cardiology clinic within 7 days of discharge. GP review within 3 days. Repeat bloods (U&E, BNP) at 1–2 weeks.',
      referrals: ['Cardiology', 'Dietitian', 'Physiotherapy / Cardiac Rehab', 'Community Nursing'],
      warningSigns: [
        'Rapid weight gain (> 1 kg/day)',
        'Increasing breathlessness, especially at rest',
        'New or worsening ankle swelling',
        'Persistent cough or wheeze',
        'Chest pain or palpitations',
        'Dizziness, confusion, or fainting',
      ],
    },
    complications: ['Pulmonary oedema', 'Cardiogenic shock', 'Arrhythmias (AF, VT)', 'Thromboembolism', 'Renal impairment', 'Hepatic congestion'],
    nursingNotes: [
      'Always compare current weight to admission and baseline weights.',
      'Fluid restriction includes all liquids — ice chips count.',
      'ACEi can cause first-dose hypotension — give at bedtime initially.',
      'Monitor potassium closely when combining loop diuretics with ACEi/ARB/MRA.',
      'Elevate legs when sitting but avoid prolonged dependency in immobile patients (DVT risk).',
    ],
  },

  'Hypertension': {
    id: 'cp-hypertension',
    disease: 'Hypertension',
    specialty: 'Cardiovascular Care',
    overview: 'Hypertension is a sustained systolic BP ≥ 140 mmHg and/or diastolic BP ≥ 90 mmHg. It is a major modifiable risk factor for stroke, MI, heart failure, CKD, and peripheral vascular disease. Nursing care focuses on BP monitoring, lifestyle modification, medication adherence, and target-organ damage prevention.',
    pathophysiology: 'Chronic elevated BP causes endothelial damage, arterial remodelling, and accelerated atherosclerosis. The renin-angiotensin-aldosterone system and sympathetic nervous system are key mediators. End-organ effects include LVH, retinopathy, nephropathy, and cerebrovascular disease.',
    commonCauses: ['Essential (primary) hypertension — 90–95% of cases', 'Secondary: renal artery stenosis, phaeochromocytoma, Cushing\'s, primary aldosteronism, coarctation of aorta'],
    riskFactors: ['Age > 55 (M) / > 65 (F)', 'Family history', 'Obesity (BMI > 30)', 'High sodium intake', 'Physical inactivity', 'Excess alcohol', 'Smoking', 'Diabetes', 'Dyslipidaemia', 'Chronic kidney disease'],
    subjectiveData: [
      'Often asymptomatic ("silent killer")',
      'Headache (usually posterior, morning)',
      'Dizziness, blurred vision',
      'Epistaxis (nosebleeds)',
      'Dyspnoea on exertion',
      'Palpitations',
    ],
    objectiveData: [
      'BP ≥ 140/90 mmHg on ≥ 2 separate readings',
      'Elevated BP on ambulatory monitoring (ABPM) or home monitoring',
      'LVH on ECG or echocardiogram',
      'Retinal changes on fundoscopy',
      'Elevated serum creatinine / proteinuria',
      'BMI > 30',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-ht-1',
        diagnosis: 'Ineffective Health Maintenance',
        relatedFactors: ['Lack of knowledge', 'Sedentary lifestyle', 'Poor dietary habits', 'Medication non-adherence'],
        definingCharacteristics: ['Elevated BP', 'Unhealthy BMI', 'High sodium diet', 'Irregular medication use'],
      },
      {
        id: 'nd-ht-2',
        diagnosis: 'Risk for Decreased Cardiac Output',
        relatedFactors: ['Increased systemic vascular resistance', 'LVH', 'Chronic pressure overload'],
        definingCharacteristics: ['Sustained elevated BP', 'Abnormal ECG findings'],
      },
      {
        id: 'nd-ht-3',
        diagnosis: 'Risk for Unstable Blood Glucose Level',
        relatedFactors: ['Metabolic syndrome association', 'Corticosteroid or thiazide use'],
        definingCharacteristics: ['Co-existing diabetes', 'Medication interactions'],
      },
    ],
    goals: [
      {
        id: 'g-ht-1',
        shortTerm: 'BP will be reduced to < 140/90 mmHg within 4–6 weeks of initiating treatment.',
        longTerm: 'BP will be maintained at target (< 130/80 mmHg for most patients) through adherence to pharmacotherapy and lifestyle changes.',
      },
      {
        id: 'g-ht-2',
        shortTerm: 'Patient will verbalise understanding of hypertension and its complications within 24 hours.',
        longTerm: 'Patient will demonstrate consistent medication adherence and lifestyle modifications at 3-month follow-up.',
      },
    ],
    interventions: [
      {
        id: 'i-ht-1',
        category: 'independent',
        action: 'Measure BP using correct technique: patient seated, arm supported at heart level, appropriate cuff size, after 5 minutes rest.',
        rationale: 'Accurate measurement is essential for diagnosis and treatment monitoring.',
        frequency: 'Every 4 hours while inpatient; daily at home',
      },
      {
        id: 'i-ht-2',
        category: 'independent',
        action: 'Educate patient on the DASH diet: rich in fruits, vegetables, whole grains, low-fat dairy; reduce sodium to < 2 g/day.',
        rationale: 'DASH diet can reduce SBP by 8–14 mmHg. Sodium restriction is a cornerstone of non-pharmacological management.',
        frequency: 'Daily reinforcement',
      },
      {
        id: 'i-ht-3',
        category: 'independent',
        action: 'Encourage regular aerobic exercise: 150 minutes/week of moderate-intensity activity (brisk walking, cycling).',
        rationale: 'Regular exercise reduces SBP by 5–8 mmHg and improves cardiovascular health.',
        frequency: 'Daily',
      },
      {
        id: 'i-ht-4',
        category: 'independent',
        action: 'Advise weight loss if BMI > 25: target 5–10% reduction over 6 months.',
        rationale: 'Each 1 kg of weight loss reduces SBP by approximately 1 mmHg.',
        frequency: 'Ongoing',
      },
      {
        id: 'i-ht-5',
        category: 'dependent',
        action: 'Administer antihypertensives as prescribed (ACEi, ARB, CCB, thiazide, beta-blocker). Monitor for side effects.',
        rationale: 'Pharmacotherapy is essential when lifestyle modifications are insufficient.',
        frequency: 'As prescribed',
      },
      {
        id: 'i-ht-6',
        category: 'independent',
        action: 'Educate on medication adherence: never skip doses, take at the same time daily, do not stop abruptly.',
        rationale: 'Non-adherence is the leading cause of uncontrolled hypertension.',
        frequency: 'Every visit',
      },
    ],
    evaluation: [
      {
        id: 'e-ht-1',
        expected: 'BP consistently < 140/90 mmHg (or individualised target) without adverse effects.',
        status: 'met',
      },
      {
        id: 'e-ht-2',
        expected: 'Patient demonstrates correct BP measurement technique and can verbalise medication purpose and side effects.',
        status: 'met',
      },
    ],
    patientEducation: [
      {
        topic: 'Understanding Hypertension',
        keyPoints: [
          'Hypertension is usually symptomless but damages organs over time.',
          'It increases risk of stroke, heart attack, kidney disease, and vision loss.',
          'Control requires both medication AND lifestyle changes.',
        ],
      },
      {
        topic: 'Lifestyle Modifications',
        keyPoints: [
          'Reduce salt to < 2 g/day (avoid processed foods, read labels).',
          'Eat the DASH diet: fruits, vegetables, whole grains, low-fat dairy.',
          'Exercise 30 minutes, 5 days per week.',
          'Maintain healthy weight (BMI 18.5–24.9).',
          'Limit alcohol to ≤ 2 drinks/day (men) or ≤ 1 drink/day (women).',
          'Quit smoking — smoking raises BP acutely and damages blood vessels.',
        ],
      },
      {
        topic: 'Home Blood Pressure Monitoring',
        keyPoints: [
          'Use a validated automatic upper-arm cuff device.',
          'Measure at the same time daily — morning and evening.',
          'Sit quietly for 5 minutes before measuring.',
          'Record readings in a logbook to share with your doctor.',
        ],
      },
    ],
    dischargePlanning: {
      checklist: [
        'BP at target or appropriate individualised goal',
        'Home BP monitor provided / technique demonstrated',
        'Medication education completed',
        'DASH diet leaflet provided',
        'Exercise plan discussed',
        'Follow-up appointment scheduled (2–4 weeks)',
      ],
      followUp: 'GP or hypertension clinic within 2–4 weeks. Repeat U&E at 1–2 weeks if started on ACEi/ARB/diuretic.',
      referrals: ['Dietitian', 'Physiotherapy', 'Smoking cessation service'],
      warningSigns: [
        'BP > 180/120 mmHg (hypertensive emergency)',
        'Severe headache, visual changes, chest pain',
        'Signs of stroke: facial droop, arm weakness, speech difficulty',
        'Severe nosebleed that does not stop',
      ],
    },
    complications: ['Stroke', 'Myocardial infarction', 'Heart failure', 'Chronic kidney disease', 'Retinopathy', 'Peripheral vascular disease', 'Aortic dissection'],
  },

  'Acute Coronary Syndrome': {
    id: 'cp-acs',
    disease: 'Acute Coronary Syndrome',
    specialty: 'Cardiovascular Care',
    overview: 'ACS encompasses unstable angina (UA), NSTEMI, and STEMI — acute conditions caused by reduced coronary blood flow. Nursing care is time-critical: rapid assessment, ECG acquisition, pain management, anticoagulation, and preparation for reperfusion (PCI or fibrinolysis).',
    pathophysiology: 'Atherosclerotic plaque rupture or erosion triggers thrombus formation in a coronary artery, causing myocardial ischaemia and, if prolonged, necrosis (infarction). The degree of occlusion determines whether the presentation is UA, NSTEMI, or STEMI.',
    commonCauses: ['Atherosclerotic plaque rupture', 'Coronary vasospasm', 'Coronary embolism', 'Demand ischaemia (anaemia, sepsis)'],
    riskFactors: ['Smoking', 'Diabetes', 'Hypertension', 'Dyslipidaemia', 'Family history of premature CAD', 'Obesity', 'Sedentary lifestyle', 'Male sex, Age > 45 (M) / > 55 (F)'],
    subjectiveData: [
      'Chest pain/pressure — central, crushing, may radiate to left arm, jaw, neck, back',
      'Associated dyspnoea, diaphoresis, nausea/vomiting',
      'Sense of impending doom',
      'Pain unrelieved by rest or GTN',
      'Atypical presentations (especially in women, elderly, diabetics): epigastric pain, fatigue, isolated dyspnoea',
    ],
    objectiveData: [
      'Elevated ST segments (STEMI), ST depression / T-wave inversion (NSTEMI/UA)',
      'Elevated cardiac biomarkers (troponin I/T, CK-MB) — serial measurements',
      'Tachycardia, hypertension or hypotension, S3/S4 gallop',
      'Crackles (if LV failure), pallor, diaphoresis',
      'Reduced SpO2, tachypnoea',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-acs-1',
        diagnosis: 'Acute Pain',
        relatedFactors: ['Myocardial ischaemia / necrosis', 'Coronary artery occlusion'],
        definingCharacteristics: ['Chest pain/pressure', 'Radiation to arm/jaw', 'Diaphoresis', 'Nausea', 'Anxiety'],
      },
      {
        id: 'nd-acs-2',
        diagnosis: 'Fear / Anxiety',
        relatedFactors: ['Threat to life', 'Unpredictable clinical course', 'Chest pain'],
        definingCharacteristics: ['Verbalisation of fear', 'Restlessness', 'Increased HR/BP', 'Crying'],
      },
      {
        id: 'nd-acs-3',
        diagnosis: 'Risk for Decreased Cardiac Output',
        relatedFactors: ['Myocardial damage / necrosis', 'Arrhythmias', 'Pump failure'],
        definingCharacteristics: ['Arrhythmias', 'Hypotension', 'Pulse deficit', 'Decreased urine output'],
      },
    ],
    goals: [
      {
        id: 'g-acs-1',
        shortTerm: 'Pain will be reduced to ≤ 3/10 within 30 minutes of administration of analgesics.',
        longTerm: 'Patient will be pain-free at rest and with activity by discharge.',
      },
      {
        id: 'g-acs-2',
        shortTerm: 'Patient will verbalise reduced anxiety and understanding of condition within 4 hours.',
        longTerm: 'Patient will demonstrate effective coping and adherence to cardiac rehab by 6 weeks.',
      },
    ],
    interventions: [
      {
        id: 'i-acs-1',
        category: 'independent',
        action: 'Obtain 12-lead ECG within 10 minutes of presentation. Repeat if symptoms recur or at 15–30 minute intervals for STEMI.',
        rationale: 'ECG is the primary tool for diagnosing STEMI and determining reperfusion strategy.',
        frequency: 'On presentation + PRN',
      },
      {
        id: 'i-acs-2',
        category: 'independent',
        action: 'Assess and document chest pain using a standardised scale (0–10), location, quality, radiation, duration, and triggers.',
        rationale: 'Standardised pain assessment guides treatment efficacy and detects recurrence.',
        frequency: 'Every 15 minutes until pain-free, then every 4 hours',
      },
      {
        id: 'i-acs-3',
        category: 'dependent',
        action: 'Administer aspirin 300 mg stat (chewed), sublingual GTN, IV morphine 2–4 mg PRN, and oxygen only if SpO2 < 94%.',
        rationale: 'Aspirin reduces mortality by inhibiting platelet aggregation. Morphine relieves pain and reduces myocardial oxygen demand. Oxygen only when hypoxic.',
        frequency: 'Stat + PRN',
      },
      {
        id: 'i-acs-4',
        category: 'dependent',
        action: 'Initiate dual antiplatelet therapy (DAPT): aspirin + P2Y12 inhibitor (clopidogrel/ticagrelor) as per protocol. Start anticoagulation (heparin) if indicated.',
        rationale: 'DAPT prevents further thrombus formation. Anticoagulation is critical in ACS management.',
        frequency: 'As prescribed',
      },
      {
        id: 'i-acs-5',
        category: 'independent',
        action: 'Monitor continuous telemetry for arrhythmias (VT, VF, heart block). Ensure defibrillator and crash cart are immediately available.',
        rationale: 'Arrhythmias are the leading cause of death in the first 24 hours of ACS.',
        frequency: 'Continuous',
      },
      {
        id: 'i-acs-6',
        category: 'collaborative',
        action: 'Prepare patient for primary PCI (door-to-balloon < 90 minutes) or administer fibrinolysis if PCI unavailable within 120 minutes.',
        rationale: 'Reperfusion therapy is time-critical: "time is myocardium". Every 30-minute delay increases mortality.',
        frequency: 'Emergency',
      },
    ],
    evaluation: [
      {
        id: 'e-acs-1',
        expected: 'Pain resolved or significantly reduced within 30 minutes. Patient comfortable, relaxed.',
        status: 'met',
      },
      {
        id: 'e-acs-2',
        expected: 'ECG shows resolution of ST changes (STEMI). Troponin trending down.',
        status: 'met',
      },
    ],
    patientEducation: [
      {
        topic: 'Heart Attack Warning Signs',
        keyPoints: [
          'Chest pain/pressure, arm/jaw pain, breathlessness, sweating, nausea.',
          'Call emergency services immediately — do not drive yourself.',
          'Chew aspirin 300 mg while waiting if not allergic.',
          'Women may have atypical symptoms: fatigue, back pain, indigestion.',
        ],
      },
      {
        topic: 'After a Heart Attack',
        keyPoints: [
          'Take all medications as prescribed — never skip antiplatelets.',
          'Cardiac rehabilitation is strongly recommended.',
          'Return to driving only when cleared by your cardiologist.',
          'Manage risk factors: stop smoking, control BP and diabetes.',
        ],
      },
    ],
    dischargePlanning: {
      checklist: [
        'DAPT (aspirin + clopidogrel/ticagrelor) — provide 12-month supply plan',
        'Statin therapy initiated / continued',
        'Echocardiogram performed (assess EF)',
        'Cardiac rehabilitation referral',
        'Smoking cessation support',
        'Cardiac rehab referral',
        'Follow-up appointment (1–2 weeks)',
      ],
      followUp: 'Cardiology clinic within 1–2 weeks. Repeat bloods at 4–6 weeks. Cardiac rehab programme.',
      referrals: ['Cardiac Rehabilitation', 'Smoking Cessation', 'Dietitian', 'Psychology / Counselling'],
      warningSigns: [
        'Recurrent chest pain or discomfort',
        'New or worsening breathlessness',
        'Heart palpitations or irregular heartbeat',
        'Dizziness or fainting',
        'Signs of wound infection at catheter site',
      ],
    },
    complications: ['Cardiogenic shock', 'Arrhythmias (VT/VF)', 'Heart failure', 'Pericarditis', 'Papillary muscle rupture', 'Ventricular septal defect', 'Dressler syndrome'],
  },

  // ═══════════════════════════════════════════════════════════════
  // RESPIRATORY
  // ═══════════════════════════════════════════════════════════════

  'Asthma': {
    id: 'cp-asthma',
    disease: 'Asthma',
    specialty: 'Respiratory Care',
    overview: 'Asthma is a chronic inflammatory airway disease characterised by reversible airflow obstruction, bronchial hyper-responsiveness, and underlying inflammation. Nursing care focuses on acute exacerbation management, inhaler technique education, trigger avoidance, and asthma action plan development.',
    pathophysiology: 'Exposure to triggers causes bronchial smooth muscle contraction, mucosal oedema, and mucus hypersecretion, leading to airflow limitation. Chronic inflammation leads to airway remodelling over time.',
    commonCauses: ['Allergens (dust mites, pollen, pet dander)', 'Respiratory infections', 'Exercise', 'Cold air', 'Smoke / pollution', 'Occupational exposures', 'Drugs (NSAIDs, beta-blockers)'],
    riskFactors: ['Family history of atopy', 'Personal history of eczema / allergic rhinitis', 'Obesity', 'Smoking / secondhand smoke', 'Occupational exposures', 'Viral respiratory infections in childhood'],
    subjectiveData: [
      'Wheezing, chest tightness, breathlessness',
      'Cough — worse at night or early morning',
      'Symptoms triggered by allergens, exercise, cold air, or infections',
      'Difficulty speaking in full sentences during exacerbation',
      'Use of accessory muscles',
    ],
    objectiveData: [
      'Expiratory wheeze on auscultation',
      'Prolonged expiratory phase',
      'Tachypnoea (RR > 20), tachycardia (HR > 100)',
      'SpO2 < 94% in moderate-severe attack',
      'Peak expiratory flow rate (PEFR) reduced (< 50% of personal best)',
      'Use of accessory muscles, inability to speak in full sentences',
      'Pulsus paradoxus (> 10 mmHg drop in SBP during inspiration)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-asthma-1',
        diagnosis: 'Ineffective Airway Clearance',
        relatedFactors: ['Bronchospasm', 'Mucosal oedema', 'Mucus hypersecretion'],
        definingCharacteristics: ['Wheezing', 'Prolonged expiration', 'Cough', 'Dyspnoea', 'Reduced PEFR'],
      },
      {
        id: 'nd-asthma-2',
        diagnosis: 'Impaired Gas Exchange',
        relatedFactors: ['Airway obstruction', 'V/Q mismatch'],
        definingCharacteristics: ['Decreased SpO2', 'Tachypnoea', 'Restlessness', 'Confusion (severe)'],
      },
      {
        id: 'nd-asthma-3',
        diagnosis: 'Deficient Knowledge',
        relatedFactors: ['Lack of exposure to information', 'Misunderstanding of inhaler technique'],
        definingCharacteristics: ['Incorrect inhaler use', 'Inability to describe triggers', 'No written action plan'],
      },
    ],
    goals: [
      {
        id: 'g-asthma-1',
        shortTerm: 'Airway patency restored: wheezing resolved, PEFR > 80% personal best, SpO2 ≥ 95% within 2 hours of treatment.',
        longTerm: 'Patient will maintain well-controlled asthma (no night symptoms, no activity limitation) at 3-month review.',
      },
      {
        id: 'g-asthma-2',
        shortTerm: 'Patient will demonstrate correct inhaler technique before discharge.',
        longTerm: 'Patient will have a written asthma action plan and demonstrate trigger avoidance within 2 weeks.',
      },
    ],
    interventions: [
      {
        id: 'i-asthma-1',
        category: 'independent',
        action: 'Assess respiratory status: auscultate lung sounds, monitor RR, SpO2, and work of breathing. Use asthma severity scoring if available.',
        rationale: 'Serial assessment guides treatment response and escalation.',
        frequency: 'Every 15 minutes during acute attack, then every 1–2 hours',
      },
      {
        id: 'i-asthma-2',
        category: 'dependent',
        action: 'Administer short-acting beta-2 agonist (SABA): salbutamol 2.5–5 mg nebulised or 4–8 puffs via MDI + spacer every 20 minutes for 1 hour.',
        rationale: 'SABA is the first-line reliever. Nebulised or MDI + spacer are equally effective.',
        frequency: 'Q20 min x 3, then Q1–4H PRN',
      },
      {
        id: 'i-asthma-3',
        category: 'dependent',
        action: 'Administer systemic corticosteroids: prednisolone 40–50 mg PO daily (adults) or IV hydrocortisone if unable to take PO. Course: 5–7 days.',
        rationale: 'Corticosteroids reduce airway inflammation and prevent relapse.',
        frequency: 'Once daily x 5–7 days',
      },
      {
        id: 'i-asthma-4',
        category: 'independent',
        action: 'Administer oxygen via nasal cannula or face mask to maintain SpO2 94–98%.',
        rationale: 'Hypoxia occurs in moderate-severe attacks and requires supplemental oxygen.',
        frequency: 'Continuous during attack',
      },
      {
        id: 'i-asthma-5',
        category: 'independent',
        action: 'Position patient upright (high Fowler\'s) to maximise lung expansion.',
        rationale: 'Sitting upright reduces diaphragmatic pressure and improves ventilation.',
        frequency: 'Continuous',
      },
      {
        id: 'i-asthma-6',
        category: 'independent',
        action: 'Educate on correct inhaler technique using the "show-back" method. Demonstrate MDI, DPI, and spacer use.',
        rationale: 'Up to 80% of patients use inhalers incorrectly, leading to poor disease control.',
        frequency: 'Before discharge',
      },
      {
        id: 'i-asthma-7',
        category: 'independent',
        action: 'Develop a written asthma action plan with the patient: green (well), yellow (worsening), red (emergency) zones with specific actions.',
        rationale: 'Written action plans reduce emergency visits and hospitalisations.',
        frequency: 'Before discharge',
      },
    ],
    evaluation: [
      {
        id: 'e-asthma-1',
        expected: 'No wheezing, RR 12–20, SpO2 ≥ 95%, PEFR > 80% personal best.',
        status: 'met',
      },
      {
        id: 'e-asthma-2',
        expected: 'Patient demonstrates correct inhaler technique and can verbalise 3 trigger avoidance strategies.',
        status: 'met',
      },
    ],
    patientEducation: [
      {
        topic: 'Inhaler Technique',
        keyPoints: [
          'Shake MDI well. Breathe out fully. Place mouthpiece in mouth or use spacer.',
          'Press canister once while breathing in slowly over 5–10 seconds.',
          'Hold breath for 10 seconds. Wait 1 minute between puffs.',
          'Rinse mouth after corticosteroid inhaler.',
          'For DPI: breathe in quickly and deeply — do not shake.',
        ],
      },
      {
        topic: 'Trigger Avoidance',
        keyPoints: [
          'Identify personal triggers (keep a symptom diary).',
          'Use allergen-proof covers for pillows and mattresses.',
          'Keep windows closed during high pollen counts.',
          'Avoid smoking and smoky environments.',
          'Use a scarf over nose and mouth in cold weather.',
        ],
      },
      {
        topic: 'Asthma Action Plan',
        keyPoints: [
          'GREEN ZONE: No symptoms, PEFR > 80% — take preventer inhaler daily.',
          'YELLOW ZONE: Symptoms worsening, PEFR 50–80% — increase reliever, start steroid course, seek medical review.',
          'RED ZONE: Severe symptoms, PEFR < 50% — use reliever every 20 min, call emergency services.',
        ],
      },
    ],
    dischargePlanning: {
      checklist: [
        'Inhaler technique assessed and correct',
        'Written asthma action plan provided',
        'Preventer inhaler (ICS) prescribed / continued',
        'Spacer provided',
        'Trigger avoidance advice given',
        'Follow-up scheduled (within 2–4 weeks)',
        'Smoking cessation referral if applicable',
      ],
      followUp: 'GP or respiratory clinic within 2–4 weeks. Annual asthma review. Spirometry at 3–6 months.',
      referrals: ['Respiratory / Asthma Nurse Specialist', 'Smoking Cessation', 'Allergist (if severe)'],
      warningSigns: [
        'Reliever inhaler needed more than 3 times per week',
        'Night-time waking due to symptoms',
        'Reduced PEFR or activity limitation',
        'Increasing breathlessness or inability to speak in sentences',
      ],
    },
    complications: ['Status asthmaticus', 'Pneumothorax', 'Respiratory failure', 'Airway remodelling', 'Psychological impact (anxiety, depression)'],
  },

  'COPD': {
    id: 'cp-copd',
    disease: 'COPD',
    specialty: 'Respiratory Care',
    overview: 'Chronic Obstructive Pulmonary Disease (COPD) is a progressive, largely irreversible airflow limitation caused by chronic bronchitis and/or emphysema. Nursing care focuses on symptom management, oxygen therapy, pulmonary rehabilitation, infection prevention, and advance care planning.',
    pathophysiology: 'Chronic exposure to noxious particles (primarily cigarette smoke) triggers airway inflammation, mucus hypersecretion, ciliary dysfunction (chronic bronchitis), and destruction of alveolar walls (emphysema). This leads to airflow limitation, air trapping, V/Q mismatch, and eventually cor pulmonale.',
    commonCauses: ['Cigarette smoking (80–90% of cases)', 'Occupational dusts and chemicals', 'Indoor/outdoor air pollution', 'Alpha-1 antitrypsin deficiency (rare)'],
    riskFactors: ['Age > 40', 'Smoking history > 10 pack-years', 'Occupational exposures', 'Indoor biomass fuel smoke', 'Family history of alpha-1 antitrypsin deficiency'],
    subjectiveData: [
      'Chronic productive cough (sputum production)',
      'Progressive exertional dyspnoea',
      'Frequent respiratory infections',
      'Fatigue, reduced exercise tolerance',
      'Peripheral oedema (if cor pulmonale)',
      'Weight loss / muscle wasting in advanced disease',
    ],
    objectiveData: [
      'Barrel chest, pursed-lip breathing, use of accessory muscles',
      'Decreased breath sounds, prolonged expiratory phase',
      'Wheeze and crackles on auscultation',
      'Chronic hypoxia: SpO2 85–92% (chronic stable COPD)',
      'Polycythaemia (elevated Hb/Hct)',
      'ABG: chronic respiratory acidosis with metabolic compensation',
      'FEV1/FVC < 0.70 on spirometry',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-copd-1',
        diagnosis: 'Impaired Gas Exchange',
        relatedFactors: ['Airflow limitation', 'Air trapping', 'V/Q mismatch', 'Destroyed alveolar walls'],
        definingCharacteristics: ['Chronic hypoxia', 'Hypercapnia', 'Pursed-lip breathing', 'Barrel chest'],
      },
      {
        id: 'nd-copd-2',
        diagnosis: 'Ineffective Airway Clearance',
        relatedFactors: ['Excessive mucus production', 'Ciliary dysfunction', 'Bronchospasm'],
        definingCharacteristics: ['Productive cough', 'Abnormal breath sounds', 'Rhonchi'],
      },
      {
        id: 'nd-copd-3',
        diagnosis: 'Activity Intolerance',
        relatedFactors: ['Imbalance between O2 supply and demand', 'Deconditioning', 'Dyspnoea'],
        definingCharacteristics: ['Dyspnoea on exertion', 'Fatigue', 'Reluctance to move'],
      },
      {
        id: 'nd-copd-4',
        diagnosis: 'Imbalanced Nutrition: Less Than Body Requirements',
        relatedFactors: ['Increased work of breathing', 'Increased metabolic rate', 'Anorexia'],
        definingCharacteristics: ['Weight loss', 'Muscle wasting', 'BMI < 20'],
      },
    ],
    goals: [
      {
        id: 'g-copd-1',
        shortTerm: 'SpO2 maintained at 88–92% (target for COPD) on prescribed oxygen. Respiratory distress resolved within 24 hours.',
        longTerm: 'Patient will participate in pulmonary rehabilitation and maintain stable weight and exercise tolerance at 3 months.',
      },
    ],
    interventions: [
      {
        id: 'i-copd-1',
        category: 'independent',
        action: 'Monitor respiratory status: RR, SpO2, breath sounds, work of breathing, sputum colour and volume.',
        rationale: 'Changes in respiratory status may indicate exacerbation requiring treatment escalation.',
        frequency: 'Every shift',
      },
      {
        id: 'i-copd-2',
        category: 'dependent',
        action: 'Administer controlled oxygen therapy via Venturi mask (24–28%) or nasal cannula (1–2 L/min). Target SpO2 88–92%.',
        rationale: 'High-flow oxygen can suppress hypoxic drive in chronic CO2 retainers, leading to hypercapnic respiratory failure.',
        frequency: 'Continuous / as prescribed',
      },
      {
        id: 'i-copd-3',
        category: 'dependent',
        action: 'Administer bronchodilators (SABA + SAMA nebulised), corticosteroids, and antibiotics during exacerbation as prescribed.',
        rationale: 'Acute exacerbations require aggressive bronchodilation, anti-inflammation, and infection treatment.',
        frequency: 'As prescribed',
      },
      {
        id: 'i-copd-4',
        category: 'independent',
        action: 'Encourage controlled coughing technique, chest physiotherapy, and adequate hydration to mobilise secretions.',
        rationale: 'Secretions cause airway obstruction and infection. Physiotherapy and hydration help mobilise thick sputum.',
        frequency: 'Every shift',
      },
      {
        id: 'i-copd-5',
        category: 'independent',
        action: 'Encourage pursed-lip breathing and diaphragmatic breathing exercises.',
        rationale: 'Pursed-lip breathing reduces air trapping and improves ventilation efficiency.',
        frequency: 'Daily practice',
      },
      {
        id: 'i-copd-6',
        category: 'independent',
        action: 'Refer to pulmonary rehabilitation programme. Encourage graded exercise.',
        rationale: 'Pulmonary rehabilitation reduces dyspnoea, improves exercise tolerance, and reduces hospitalisation.',
        frequency: 'At discharge',
      },
      {
        id: 'i-copd-7',
        category: 'independent',
        action: 'Ensure annual influenza vaccination and pneumococcal vaccination are up to date.',
        rationale: 'Respiratory infections are the leading cause of COPD exacerbations and mortality.',
        frequency: 'Annually',
      },
    ],
    evaluation: [
      {
        id: 'e-copd-1',
        expected: 'SpO2 88–92% on prescribed O2. Sputum volume and purulence reduced. Patient comfortable at rest.',
        status: 'met',
      },
    ],
    patientEducation: [
      {
        topic: 'Oxygen Therapy',
        keyPoints: [
          'Use oxygen as prescribed — at least 15 hours/day for long-term therapy.',
          'Do NOT increase oxygen flow without medical advice.',
          'No smoking near oxygen — fire risk.',
          'Keep nasal cannula clean; replace weekly.',
        ],
      },
      {
        topic: 'Breathing Techniques',
        keyPoints: [
          'Pursed-lip breathing: breathe in through nose, out through pursed lips (as if blowing out a candle).',
          'Diaphragmatic breathing: place hand on belly, feel it rise on inhale.',
          'Combine both techniques during activity to reduce breathlessness.',
        ],
      },
      {
        topic: 'Smoking Cessation',
        keyPoints: [
          'Stopping smoking is the single most important intervention.',
          'Quitting at any stage improves outcomes.',
          'Refer to smoking cessation support and pharmacotherapy.',
        ],
      },
    ],
    dischargePlanning: {
      checklist: [
        'Oxygen prescription documented and equipment arranged',
        'Inhaler technique assessed and correct',
        'Pulmonary rehabilitation referral',
        'Smoking cessation support',
        'Vaccinations up to date',
        'Advance care planning discussed (if advanced COPD)',
        'Follow-up within 1–2 weeks',
      ],
      followUp: 'GP within 1–2 weeks post-exacerbation. Pulmonary rehab within 2 weeks. Annual spirometry.',
      referrals: ['Pulmonary Rehabilitation', 'Smoking Cessation', 'Dietitian', 'Palliative Care (if advanced)'],
      warningSigns: [
        'Increased breathlessness at rest',
        'Change in sputum colour (green/yellow) or volume',
        'Increased sputum production',
        'New or worsening fever',
        'Confusion or excessive drowsiness',
        'Peripheral oedema worsening',
      ],
    },
    complications: ['Acute exacerbations', 'Pneumonia', 'Pneumothorax', 'Cor pulmonale', 'Respiratory failure', 'Depression and anxiety', 'Muscle wasting / cachexia'],
  },

  // ═══════════════════════════════════════════════════════════════
  // ENDOCRINE
  // ═══════════════════════════════════════════════════════════════

  'Diabetes Mellitus': {
    id: 'cp-diabetes',
    disease: 'Diabetes Mellitus',
    specialty: 'Endocrine Care',
    overview: 'Diabetes mellitus is a group of metabolic disorders characterised by chronic hyperglycaemia resulting from defects in insulin secretion, insulin action, or both. Nursing care focuses on blood glucose monitoring, insulin/oral medication management, dietary education, foot care, and complication prevention.',
    pathophysiology: 'Type 1: autoimmune destruction of pancreatic beta-cells → absolute insulin deficiency. Type 2: insulin resistance + progressive beta-cell dysfunction → relative insulin deficiency. Chronic hyperglycaemia leads to microvascular (retinopathy, nephropathy, neuropathy) and macrovascular (CAD, PVD, stroke) complications.',
    commonCauses: ['Type 1: autoimmune, genetic', 'Type 2: obesity, sedentary lifestyle, genetic predisposition', 'Gestational: placental hormones causing insulin resistance'],
    riskFactors: ['Family history', 'Obesity (BMI > 30)', 'Sedentary lifestyle', 'Ethnicity (South Asian, African, Hispanic)', 'Gestational diabetes history', 'PCOS', 'Age > 45 (Type 2)'],
    subjectiveData: [
      'Polyuria, polydipsia, polyphagia, weight loss (Type 1)',
      'Fatigue, blurred vision, slow wound healing',
      'Numbness / tingling in extremities (neuropathy)',
      'Recurrent infections (UTI, skin, candidiasis)',
      'Erectile dysfunction',
    ],
    objectiveData: [
      'Random blood glucose ≥ 11.1 mmol/L or fasting ≥ 7.0 mmol/L',
      'HbA1c ≥ 6.5% (48 mmol/mol)',
      'BMI > 30 (Type 2)',
      'Peripheral neuropathy on monofilament testing',
      'Foot ulcers, calluses, deformities',
      'Retinopathy on fundoscopy',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-dm-1',
        diagnosis: 'Deficient Knowledge',
        relatedFactors: ['Complexity of disease management', 'Lack of exposure to education'],
        definingCharacteristics: ['Inability to describe self-care', 'Incorrect insulin technique', 'Poor dietary choices'],
      },
      {
        id: 'nd-dm-2',
        diagnosis: 'Risk for Unstable Blood Glucose Level',
        relatedFactors: ['Insufficient diabetes self-management', 'Infection', 'Medication errors'],
        definingCharacteristics: ['Hypoglycaemic episodes', 'Persistent hyperglycaemia'],
      },
      {
        id: 'nd-dm-3',
        diagnosis: 'Risk for Infection',
        relatedFactors: ['Impaired leucocyte function', 'Hyperglycaemia', 'Peripheral vascular disease'],
        definingCharacteristics: ['Recurrent skin infections', 'Slow wound healing', 'Glycosuria'],
      },
      {
        id: 'nd-dm-4',
        diagnosis: 'Impaired Skin Integrity',
        relatedFactors: ['Peripheral neuropathy', 'Peripheral vascular disease', 'Hyperglycaemia'],
        definingCharacteristics: ['Foot ulcers', 'Calluses', 'Dry, cracked skin'],
      },
    ],
    goals: [
      {
        id: 'g-dm-1',
        shortTerm: 'Blood glucose will be maintained within target range (4–10 mmol/L) during hospitalisation.',
        longTerm: 'HbA1c < 7% (53 mmol/mol) at 3-month review. Patient will demonstrate self-management skills.',
      },
      {
        id: 'g-dm-2',
        shortTerm: 'Patient will demonstrate correct insulin injection technique before discharge.',
        longTerm: 'Patient will perform independent blood glucose monitoring and insulin administration at 1-month follow-up.',
      },
    ],
    interventions: [
      {
        id: 'i-dm-1',
        category: 'independent',
        action: 'Monitor blood glucose at least QDS (before meals and bedtime). More frequently during acute illness or insulin titration.',
        rationale: 'Regular monitoring guides treatment adjustments and detects hypo/hyperglycaemia.',
        frequency: 'QDS minimum',
      },
      {
        id: 'i-dm-2',
        category: 'independent',
        action: 'Educate on insulin injection technique: correct site rotation (abdomen, thighs, arms), needle disposal, storage.',
        rationale: 'Incorrect technique leads to lipodystrophy, erratic absorption, and poor glycaemic control.',
        frequency: 'Before discharge',
      },
      {
        id: 'i-dm-3',
        category: 'independent',
        action: 'Teach recognise and manage hypoglycaemia: symptoms (tremor, sweating, confusion), glucose tablets, when to seek help.',
        rationale: 'Hypoglycaemia can be life-threatening. Every patient on insulin or sulfonylureas must know how to manage it.',
        frequency: 'Before discharge + ongoing',
      },
      {
        id: 'i-dm-4',
        category: 'independent',
        action: 'Provide comprehensive foot care education: daily foot inspection, proper footwear, nail care, when to seek podiatry.',
        rationale: 'Diabetic foot ulcers are the leading cause of non-traumatic amputation. Prevention is key.',
        frequency: 'Before discharge',
      },
      {
        id: 'i-dm-5',
        category: 'independent',
        action: 'Refer to diabetes educator and dietitian for individualised self-management education (DSMES).',
        rationale: 'Structured education improves HbA1c, reduces complications, and empowers patients.',
        frequency: 'At discharge',
      },
      {
        id: 'i-dm-6',
        category: 'dependent',
        action: 'Administer insulin / oral hypoglycaemics as prescribed. Verify dose and timing before administration.',
        rationale: 'Medication errors with insulin are a significant safety concern.',
        frequency: 'As prescribed',
      },
    ],
    evaluation: [
      {
        id: 'e-dm-1',
        expected: 'Blood glucose consistently 4–10 mmol/L. No hypo/hyperglycaemic episodes.',
        status: 'met',
      },
      {
        id: 'e-dm-2',
        expected: 'Patient demonstrates correct insulin technique and can describe hypoglycaemia management.',
        status: 'met',
      },
    ],
    patientEducation: [
      {
        topic: 'Blood Glucose Monitoring',
        keyPoints: [
          'Wash hands before testing. Use side of fingertip for less pain.',
          'Record results in a logbook or app.',
          'Target: 4–7 mmol/L before meals, < 10 mmol/L 2 hours after meals.',
          'Bring your logbook to every appointment.',
        ],
      },
      {
        topic: 'Healthy Eating',
        keyPoints: [
          'No "diabetic diet" — eat the same healthy food as everyone else.',
          'Carb counting: consistent carbohydrate portions at meals.',
          'Limit sugary drinks, sweets, and processed foods.',
          'Eat regular meals — do not skip.',
          'Refer to dietitian for individualised plan.',
        ],
      },
      {
        topic: 'Foot Care',
        keyPoints: [
          'Inspect feet daily for cuts, blisters, redness, swelling.',
          'Wash feet daily in warm (not hot) water. Dry thoroughly.',
          'Wear well-fitting shoes. Never walk barefoot.',
          'Cut toenails straight across. See podiatry for corns/calluses.',
          'Report any wound or infection immediately.',
        ],
      },
      {
        topic: 'Sick Day Rules',
        keyPoints: [
          'Never stop insulin — you may need MORE when ill.',
          'Monitor blood glucose every 2–4 hours.',
          'Stay hydrated: sip fluids regularly.',
          'Seek medical help if: vomiting, blood glucose > 25 mmol/L, or unable to eat/drink.',
        ],
      },
    ],
    dischargePlanning: {
      checklist: [
        'Blood glucose monitoring technique assessed',
        'Insulin technique demonstrated and documented',
        'Hypoglycaemia management explained',
        'Foot care advice given',
        'Diabetes educator / dietitian referral',
        'Follow-up arranged (GP + diabetes clinic within 2–4 weeks)',
        'Sick day rules leaflet provided',
      ],
      followUp: 'Diabetes clinic within 2–4 weeks. HbA1c at 3 months. Annual review: eyes, feet, kidneys, cardiovascular risk.',
      referrals: ['Diabetes Educator', 'Dietitian', 'Podiatrist', 'Ophthalmologist (annual retinopathy screening)'],
      warningSigns: [
        'Blood glucose consistently > 15 mmol/L despite medication',
        'Recurrent hypoglycaemia',
        'New foot wound or signs of infection',
        'Signs of DKA: nausea, vomiting, fruity breath, Kussmaul breathing',
      ],
    },
    complications: ['Diabetic ketoacidosis (DKA)', 'Hyperosmolar hyperglycaemic state (HHS)', 'Hypoglycaemia', 'Diabetic retinopathy', 'Diabetic nephropathy', 'Diabetic neuropathy', 'Diabetic foot ulcer / amputation', 'Cardiovascular disease'],
  },

  // ═══════════════════════════════════════════════════════════════
  // INFECTIOUS DISEASES
  // ═══════════════════════════════════════════════════════════════

  'Sepsis': {
    id: 'cp-sepsis',
    disease: 'Sepsis',
    specialty: 'Infectious Disease Care',
    overview: 'Sepsis is life-threatening organ dysfunction caused by a dysregulated host response to infection. Nursing care is time-critical: the "Sepsis Six" must be completed within 1 hour. Early recognition, aggressive fluid resuscitation, broad-spectrum antibiotics, and organ support are essential.',
    pathophysiology: 'Infection triggers a systemic inflammatory response (SIRS) with vasodilation, capillary leak, and microthrombi formation, leading to tissue hypoperfusion and multi-organ dysfunction syndrome (MODS). The balance between pro- and anti-inflammatory mediators determines outcome.',
    commonCauses: ['Bacterial pneumonia', 'UTI / pyelonephritis', 'Abdominal infection (peritonitis, cholangitis)', 'Skin / soft tissue infection', 'Meningitis', 'Line-related infection'],
    riskFactors: ['Immunosuppression', 'Extremes of age', 'Chronic disease (diabetes, liver, kidney)', 'Invasive devices (catheters, ventilators)', 'Recent surgery', 'Neutropenia'],
    subjectiveData: [
      'Fever or hypothermia',
      'Altered mental status / confusion',
      'Malaise, myalgia',
      'Dyspnoea',
      'Reduced urine output',
      'Nausea / vomiting / diarrhoea',
    ],
    objectiveData: [
      'Temperature > 38.3°C or < 36°C',
      'Heart rate > 90 bpm',
      'Respiratory rate > 20 breaths/min',
      'WCC > 12 or < 4 x 10⁹/L',
      'SBP < 90 mmHg or MAP < 65 mmHg',
      'Elevated lactate (> 2 mmol/L)',
      'Creatinine rising, bilirubin rising',
      'mSOFA / qSOFA score ≥ 2',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-sepsis-1',
        diagnosis: 'Ineffective Tissue Perfusion',
        relatedFactors: ['Vasodilation', 'Capillary leak', 'Microthrombi', 'Hypovolaemia'],
        definingCharacteristics: ['Hypotension', 'Tachycardia', 'Delayed capillary refill', 'Cool extremities', 'Reduced urine output', 'Elevated lactate'],
      },
      {
        id: 'nd-sepsis-2',
        diagnosis: 'Hyperthermia / Hypothermia',
        relatedFactors: ['Infection', 'Inflammatory cascade'],
        definingCharacteristics: ['Temperature > 38.3°C or < 36°C', 'Chills', 'Diaphoresis'],
      },
      {
        id: 'nd-sepsis-3',
        diagnosis: 'Risk for Impaired Skin Integrity',
        relatedFactors: ['Tissue hypoperfusion', 'Oedema', 'Immobility', 'Vasopressor therapy'],
        definingCharacteristics: ['Mottled skin', 'Prolonged capillary refill', 'Pressure injury risk'],
      },
    ],
    goals: [
      {
        id: 'g-sepsis-1',
        shortTerm: 'Sepsis Six completed within 1 hour: blood cultures, lactate, antibiotics, fluid resuscitation, urine output monitoring, oxygen.',
        longTerm: 'Patient survives to discharge with no organ damage. MAP > 65 mmHg, lactate < 2 mmol/L, urine output > 0.5 mL/kg/hr.',
      },
    ],
    interventions: [
      {
        id: 'i-sepsis-1',
        category: 'collaborative',
        action: 'Complete the Sepsis Six within 1 HOUR of recognition:\n1. Give O2 (target SpO2 ≥ 94%)\n2. Take blood cultures\n3. Give IV antibiotics\n4. Give IV fluids (30 mL/kg crystalloid)\n5. Measure lactate\n6. Measure urine output (catheterise if needed)',
        rationale: 'Each hour of delay in antibiotics increases mortality by ~7.6%. The Sepsis Six is a proven bundle to reduce mortality.',
        frequency: 'Within 1 hour of sepsis recognition',
      },
      {
        id: 'i-sepsis-2',
        category: 'dependent',
        action: 'Administer broad-spectrum IV antibiotics within 1 hour (e.g., piperacillin-tazobactam, meropenem). Modify based on culture results.',
        rationale: 'Empiric antibiotics must cover likely pathogens. De-escalation based on cultures reduces resistance.',
        frequency: 'Stat, then as prescribed',
      },
      {
        id: 'i-sepsis-3',
        category: 'dependent',
        action: 'Administer IV crystalloid (0.9% NaCl or Hartmann\'s) 30 mL/kg bolus. Reassess after each bolus. Start vasopressors (noradrenaline) if MAP < 65 mmHg despite fluids.',
        rationale: 'Fluid resuscitation restores intravascular volume and tissue perfusion. Vasopressors are second-line for refractory hypotension.',
        frequency: 'Stat, then as prescribed',
      },
      {
        id: 'i-sepsis-4',
        category: 'independent',
        action: 'Monitor vital signs every 15 minutes during resuscitation, then hourly. Track MAP, lactate clearance, urine output, and GCS.',
        rationale: 'Frequent monitoring detects deterioration and guides titration of fluids and vasopressors.',
        frequency: 'Q15 min x 4, then hourly',
      },
      {
        id: 'i-sepsis-5',
        category: 'independent',
        action: 'Maintain strict aseptic technique for all invasive lines and catheters. Ensure timely removal of unnecessary invasive devices.',
        rationale: 'Catheter-related infections are a common source of secondary sepsis.',
        frequency: 'Continuous',
      },
      {
        id: 'i-sepsis-6',
        category: 'independent',
        action: 'Monitor for signs of organ dysfunction: GCS changes, rising creatinine, liver enzymes, coagulopathy, skin mottling.',
        rationale: 'Organ dysfunction is the defining feature of sepsis (SOFA score). Early detection guides escalation to ICU.',
        frequency: 'Every 1–2 hours',
      },
    ],
    evaluation: [
      {
        id: 'e-sepsis-1',
        expected: 'MAP ≥ 65 mmHg. Lactate < 2 mmol/L. Urine output > 0.5 mL/kg/hr. SpO2 ≥ 94%.',
        status: 'met',
      },
      {
        id: 'e-sepsis-2',
        expected: 'Blood cultures negative by 48–72 hours. Antibiotics de-escalated. No new organ dysfunction.',
        status: 'met',
      },
    ],
    patientEducation: [
      {
        topic: 'Understanding Sepsis',
        keyPoints: [
          'Sepsis is a medical emergency — it is the body\'s extreme response to infection.',
          'It can progress rapidly to organ failure and death if not treated promptly.',
          'Early treatment with antibiotics and fluids saves lives.',
        ],
      },
      {
        topic: 'Preventing Sepsis',
        keyPoints: [
          'Keep wounds clean and covered.',
          'Complete all courses of prescribed antibiotics.',
          'Seek medical help promptly for signs of infection (fever, confusion, rapid breathing).',
          'Keep vaccinations up to date.',
        ],
      },
    ],
    dischargePlanning: {
      checklist: [
        'Source of infection identified and treated',
        'IV antibiotics completed or step-down to PO arranged',
        'Organ function normalised (renal, hepatic, haematological)',
        'Nutritional status assessed and supported',
        'Rehabilitation / physiotherapy referral',
        'Follow-up arranged (1–2 weeks)',
      ],
      followUp: 'GP within 1–2 weeks. Infectious diseases if source unclear. Psychology for post-sepsis syndrome.',
      referrals: ['Physiotherapy', 'Occupational Therapy', 'Dietitian', 'Psychology', 'Infectious Diseases'],
      warningSigns: [
        'Fever returning or new fever',
        'Confusion or drowsiness',
        'Rapid breathing or heart rate',
        'Worsening wound redness or discharge',
        'Reduced urine output',
      ],
    },
    complications: ['Multi-organ dysfunction syndrome (MODS)', 'ARDS', 'Acute kidney injury', 'DIC', 'Septic shock', 'Death', 'Post-sepsis syndrome (PTSD, fatigue, cognitive impairment)'],
  },

  // ═══════════════════════════════════════════════════════════════
  // NEUROLOGICAL
  // ═══════════════════════════════════════════════════════════════

  'Stroke': {
    id: 'cp-stroke',
    disease: 'Stroke',
    specialty: 'Neurological & Psychiatric Care',
    overview: 'Stroke is a neurological deficit resulting from acute disruption of blood supply to the brain (ischaemic or haemorrhagic). Nursing care focuses on rapid assessment (FAST), neuroprotection, thrombolysis/thrombectomy preparation, swallow screening, pressure injury prevention, and rehabilitation.',
    pathophysiology: 'Ischaemic stroke (85%): thrombus/embolus occludes a cerebral artery → ischaemic core + penumbra. Haemorrhagic stroke (15%): rupture of a blood vessel → mass effect + raised ICP. The ischaemic penumbra is salvageable if reperfusion occurs within the therapeutic window.',
    commonCauses: ['Atrial fibrillation (cardioembolic)', 'Atherosclerosis (large vessel)', 'Small vessel occlusion (lacunar)', 'Intracerebral haemorrhage', 'Subarachnoid haemorrhage'],
    riskFactors: ['Hypertension', 'Atrial fibrillation', 'Diabetes', 'Smoking', 'Dyslipidaemia', 'Obesity', 'Excessive alcohol', 'Age > 65', 'Previous TIA/stroke'],
    subjectiveData: [
      'Sudden onset focal neurological deficit',
      'Facial drooping, arm weakness, speech difficulty (FAST)',
      'Severe headache (haemorrhagic stroke)',
      'Visual field loss',
      'Dizziness, ataxia, nausea',
    ],
    objectiveData: [
      'Unilateral facial droop',
      'Arm drift / weakness on one side',
      'Dysphasia / aphasia',
      'GCS reduced',
      'NIH Stroke Scale score elevated',
      'CT head: rules out haemorrhage',
      'CT angiography: identifies large vessel occlusion',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-stroke-1',
        diagnosis: 'Impaired Physical Mobility',
        relatedFactors: ['Hemiplegia / hemiparesis', 'Neurological deficit'],
        definingCharacteristics: ['Inability to move one side', 'Muscle weakness', 'Impaired balance'],
      },
      {
        id: 'nd-stroke-2',
        diagnosis: 'Impaired Verbal Communication',
        relatedFactors: ['Damage to speech centres (Broca\'s / Wernicke\'s area)'],
        definingCharacteristics: ['Aphasia / dysphasia', 'Inability to speak or comprehend', 'Difficulty finding words'],
      },
      {
        id: 'nd-stroke-3',
        diagnosis: 'Risk for Aspiration',
        relatedFactors: ['Dysphagia', 'Impaired gag reflex', 'Reduced consciousness'],
        definingCharacteristics: ['Difficulty swallowing', 'Coughing during oral intake', 'Wet voice quality'],
      },
      {
        id: 'nd-stroke-4',
        diagnosis: 'Impaired Skin Integrity',
        relatedFactors: ['Immobility', 'Incontinence', 'Sensory loss'],
        definingCharacteristics: ['Pressure areas', 'Immobile / paralysed side'],
      },
    ],
    goals: [
      {
        id: 'g-stroke-1',
        shortTerm: 'Thrombolysis/thrombectomy completed within therapeutic window if eligible. Swallow screen performed within 24 hours.',
        longTerm: 'Patient will achieve maximum functional recovery through rehabilitation. Discharge to appropriate setting with care plan.',
      },
    ],
    interventions: [
      {
        id: 'i-stroke-1',
        category: 'collaborative',
        action: 'Perform FAST assessment immediately. Obtain CT head within 25 minutes. Activate stroke team. Determine last-known-well time.',
        rationale: 'Time-critical: IV thrombolysis (alteplase) within 4.5 hours; thrombectomy within 24 hours for LVO.',
        frequency: 'Emergency',
      },
      {
        id: 'i-stroke-2',
        category: 'independent',
        action: 'Perform swallow screen (e.g., water swallow test) within 24 hours. Keep nil by mouth until safe swallow confirmed.',
        rationale: 'Aspiration pneumonia occurs in 30–40% of stroke patients. Early swallow screening reduces this risk.',
        frequency: 'Within 24 hours',
      },
      {
        id: 'i-stroke-3',
        category: 'independent',
        action: 'Position affected side supported. Reposition every 2 hours. Use pressure-relieving mattress. Monitor skin integrity.',
        rationale: 'Immobile stroke patients are at high risk of pressure injuries.',
        frequency: 'Every 2 hours',
      },
      {
        id: 'i-stroke-4',
        category: 'independent',
        action: 'Monitor neurological status: GCS, pupil reactivity, limb power, speech — every 1 hour for first 24 hours.',
        rationale: 'Neurological deterioration may indicate haemorrhagic transformation, cerebral oedema, or raised ICP.',
        frequency: 'Hourly x 24, then Q2H',
      },
      {
        id: 'i-stroke-5',
        category: 'independent',
        action: 'Encourage early mobilisation (within 24–48 hours if stable). Refer to physiotherapy, occupational therapy, and speech therapy.',
        rationale: 'Early rehabilitation improves functional outcomes and reduces complications.',
        frequency: 'Within 24–48 hours',
      },
      {
        id: 'i-stroke-6',
        category: 'dependent',
        action: 'Administer antiplatelet (aspirin ± clopidogrel) or anticoagulant (heparin → warfarin/DOAC for AF) as prescribed. Monitor for bleeding.',
        rationale: 'Antiplatelets reduce recurrence in ischaemic stroke. Anticoagulation is for cardioembolic sources.',
        frequency: 'As prescribed',
      },
      {
        id: 'i-stroke-7',
        category: 'independent',
        action: 'Assess and manage bladder/bowel function. Insert catheter only if necessary. Establish a toileting schedule.',
        rationale: 'Urinary retention and incontinence are common. Catheter use increases infection risk.',
        frequency: 'Every shift',
      },
    ],
    evaluation: [
      {
        id: 'e-stroke-1',
        expected: 'NIHSS score improving. No haemorrhagic transformation. Safe swallow confirmed. Skin intact.',
        status: 'met',
      },
    ],
    patientEducation: [
      {
        topic: 'Stroke Warning Signs (FAST)',
        keyPoints: [
          'FACE: Is one side of the face drooping?',
          'ARMS: Can both arms be raised?',
          'SPEECH: Is speech slurred or garbled?',
          'TIME: Call emergency services immediately.',
          'Note the time symptoms started — this determines treatment options.',
        ],
      },
      {
        topic: 'After a Stroke',
        keyPoints: [
          'Recovery is a gradual process — improvement can continue for months.',
          'Attend all rehabilitation sessions (physio, OT, speech therapy).',
          'Take medications as prescribed — antiplatelets/anticoagulants prevent recurrence.',
          'Manage risk factors: blood pressure, diabetes, smoking, cholesterol.',
        ],
      },
    ],
    dischargePlanning: {
      checklist: [
        'Swallow screen completed — diet texture determined',
        'Bladder/bowel management plan in place',
        'Rehabilitation team assessment completed',
        'Medication education (antiplatelet / anticoagulant)',
        'Caregiver education on mobility assistance and skin care',
        'Discharge destination decided: home / rehab facility / nursing home',
        'Follow-up arranged (stroke clinic, GP, rehab)',
      ],
      followUp: 'Stroke clinic within 2–4 weeks. GP within 1 week. Ongoing rehabilitation.',
      referrals: ['Physiotherapy', 'Occupational Therapy', 'Speech and Language Therapy', 'Clinical Psychology', 'Social Work'],
      warningSigns: [
        'New or worsening weakness or numbness',
        'Sudden severe headache',
        'Difficulty speaking or understanding',
        'Vision loss',
        'Signs of infection (fever, cough, UTI symptoms)',
      ],
    },
    complications: ['Haemorrhagic transformation', 'Cerebral oedema', 'Aspiration pneumonia', 'Deep vein thrombosis', 'Pressure injuries', 'Depression (post-stroke)', 'Falls', 'Urinary tract infection'],
  },

  // ═══════════════════════════════════════════════════════════════
  // OBSTETRICS
  // ═══════════════════════════════════════════════════════════════

  'Antenatal Care': {
    id: 'cp-antenatal',
    disease: 'Antenatal Care',
    specialty: 'Obstetric & Gynaecological Care',
    overview: 'Antenatal care is the routine care of pregnant women to monitor maternal and fetal wellbeing, detect complications early, and prepare the mother for labour and parenting. Nursing care focuses on screening, health promotion, risk assessment, and psychosocial support.',
    pathophysiology: 'Pregnancy induces physiological changes in all organ systems: increased blood volume, hypercoagulability, renal vasodilation, insulin resistance, and respiratory changes. These adaptations can unmask or worsen pre-existing conditions and create new risks (gestational diabetes, pre-eclampsia, VTE).',
    commonCauses: ['Normal pregnancy', 'Pre-eclampsia', 'Gestational diabetes', 'Antepartum haemorrhage', 'Preterm labour', 'Intrauterine growth restriction'],
    riskFactors: ['Advanced maternal age (> 35)', 'Obesity', 'Pre-existing hypertension / diabetes', 'Multiple pregnancy', 'Smoking', 'Substance use', 'Previous obstetric complications'],
    subjectiveData: [
      'Menstrual history and estimated date of delivery (EDD)',
      'Gravidity and parity',
      'Previous pregnancy complications',
      'Current symptoms: nausea, fatigue, vaginal bleeding, headache, visual changes',
      'Psychosocial: support system, mental health, domestic situation',
    ],
    objectiveData: [
      'Fundal height measurement (cm ≈ gestational weeks from 20 weeks)',
      'Fetal heart rate (from 12 weeks with Doppler)',
      'Blood pressure at every visit',
      'Urine protein and glucose testing',
      'Weight gain tracking',
      'Blood tests: FBC, blood group, antibodies, HIV, Hep B, syphilis, glucose screen',
      'Ultrasound: dating (12 weeks), anomaly (20 weeks), growth (28–36 weeks)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-anc-1',
        diagnosis: 'Deficient Knowledge',
        relatedFactors: ['New experience', 'Complexity of antenatal care', 'Health literacy'],
        definingCharacteristics: ['Unable to describe warning signs', 'Incorrect dietary practices', 'Missed appointments'],
      },
      {
        id: 'nd-anc-2',
        diagnosis: 'Anxiety',
        relatedFactors: ['New pregnancy', 'Previous loss', 'Fear of complications'],
        definingCharacteristics: ['Verbalisation of worry', 'Insomnia', 'Excessive questions'],
      },
      {
        id: 'nd-anc-3',
        diagnosis: 'Risk for Impaired Fetal Gas Exchange',
        relatedFactors: ['Maternal hypertension', 'Placental insufficiency', 'Smoking'],
        definingCharacteristics: ['Reduced fetal movements', 'Abnormal Doppler results'],
      },
    ],
    goals: [
      {
        id: 'g-anc-1',
        shortTerm: 'Patient will attend all scheduled antenatal visits and complete recommended screening tests.',
        longTerm: 'Patient will have a healthy pregnancy outcome with no preventable complications.',
      },
    ],
    interventions: [
      {
        id: 'i-anc-1',
        category: 'independent',
        action: 'Perform routine assessments at each visit: BP, weight, fundal height, fetal heart rate, urinalysis.',
        rationale: 'Serial assessments detect deviations from normal (hypertension, proteinuria, growth restriction).',
        frequency: 'Every visit (monthly until 28 weeks, fortnightly to 36 weeks, then weekly)',
      },
      {
        id: 'i-anc-2',
        category: 'independent',
        action: 'Educate on warning signs requiring immediate medical attention: vaginal bleeding, severe headache, visual changes, reduced fetal movements, abdominal pain, leaking liquor.',
        rationale: 'Early recognition of complications improves maternal and fetal outcomes.',
        frequency: 'Every visit',
      },
      {
        id: 'i-anc-3',
        category: 'independent',
        action: 'Provide health promotion: folic acid (400–500 mcg daily), balanced diet, regular exercise, smoking cessation, avoid alcohol, adequate hydration.',
        rationale: 'Optimising maternal health reduces pregnancy complications and improves fetal outcomes.',
        frequency: 'Ongoing',
      },
      {
        id: 'i-anc-4',
        category: 'independent',
        action: 'Screen for gestational diabetes (OGTT at 24–28 weeks) and pre-eclampsia (BP + proteinuria).',
        rationale: 'Gestational diabetes and pre-eclampsia are common and potentially dangerous if undetected.',
        frequency: '24–28 weeks (GDM); every visit (pre-eclampsia)',
      },
      {
        id: 'i-anc-5',
        category: 'independent',
        action: 'Assess psychosocial wellbeing: depression screening (Edinburgh Postnatal Depression Scale), domestic violence screening, social support.',
        rationale: 'Perinatal mental health problems affect 10–20% of women. Early identification and support improve outcomes.',
        frequency: 'At booking and each trimester',
      },
      {
        id: 'i-anc-6',
        category: 'independent',
        action: 'Prepare for labour: birth plan discussion, antenatal classes, breastfeeding education, cord blood donation information.',
        rationale: 'Preparation reduces anxiety and improves birth experience.',
        frequency: 'Third trimester',
      },
    ],
    evaluation: [
      {
        id: 'e-anc-1',
        expected: 'All screening tests completed. BP and urinalysis normal. Fundal height consistent with gestational age. Patient attends all appointments.',
        status: 'met',
      },
    ],
    patientEducation: [
      {
        topic: 'Healthy Pregnancy',
        keyPoints: [
          'Take folic acid daily until 12 weeks (ideally from pre-conception).',
          'Eat a balanced diet: protein, calcium, iron-rich foods.',
          'Stay active — walking, swimming, prenatal yoga are safe.',
          'Avoid smoking, alcohol, and recreational drugs.',
          'Get adequate rest — sleep on your left side.',
        ],
      },
      {
        topic: 'Warning Signs',
        keyPoints: [
          'Vaginal bleeding at any stage.',
          'Severe headache or visual disturbances (flashing lights, blurred vision).',
          'Reduced or absent fetal movements (after 28 weeks).',
          'Severe abdominal pain.',
          'Leaking clear fluid (possible ruptured membranes).',
          'Signs of pre-eclampsia: swelling of face/hands, severe headache, RUQ pain.',
          'Go to hospital immediately if any of these occur.',
        ],
      },
    ],
    dischargePlanning: {
      checklist: [
        'All routine screening completed',
        'Blood group and antibodies confirmed',
        'GDM screening completed',
        'Birth plan discussed',
        'Labour bag prepared',
        'Emergency contact numbers provided',
        'Hospital location and route confirmed',
      ],
      followUp: 'Routine antenatal schedule: monthly until 28 weeks, fortnightly to 36 weeks, weekly thereafter.',
      referrals: ['Midwifery', 'Obstetrician (if high-risk)', 'Dietitian', 'Mental Health', 'Antenatal classes'],
      warningSigns: [
        'Vaginal bleeding',
        'Severe headache or visual changes',
        'Reduced fetal movements',
        'Severe abdominal pain',
        'Fever or chills',
        'Leaking liquor',
      ],
    },
    complications: ['Pre-eclampsia / eclampsia', 'Gestational diabetes', 'Placenta praevia', 'Placental abruption', 'Preterm labour', 'IUGR', 'Antepartum haemorrhage', 'VTE'],
  },

  // ═══════════════════════════════════════════════════════════════
  // EMERGENCY & CRITICAL CARE
  // ═══════════════════════════════════════════════════════════════

  'Shock': {
    id: 'cp-shock',
    disease: 'Shock',
    specialty: 'Emergency & Critical Care',
    overview: 'Shock is a state of inadequate tissue perfusion and cellular oxygen delivery relative to metabolic demand. Types include hypovolaemic, cardiogenic, distributive (septic, anaphylactic, neurogenic), and obstructive. Nursing care focuses on haemodynamic support, organ perfusion, and identifying/treating the underlying cause.',
    pathophysiology: 'All types of shock share a final common pathway: reduced cardiac output or severe vasodilation → inadequate tissue perfusion → cellular hypoxia → anaerobic metabolism → lactic acidosis → cellular death → organ failure. Compensatory mechanisms (SNS, RAAS) maintain BP initially but eventually decompensate.',
    commonCauses: [
      'Hypovolaemic: haemorrhage, dehydration, burns',
      'Cardiogenic: MI, arrhythmia, cardiac tamponade, PE',
      'Septic: infection (most common distributive)',
      'Anaphylactic: allergen exposure',
      'Neurogenic: spinal cord injury',
      'Obstructive: cardiac tamponade, tension pneumothorax, massive PE',
    ],
    riskFactors: ['Severe infection / sepsis', 'Major trauma', 'Cardiac disease', 'Severe dehydration', 'Anaphylaxis history', 'Major surgery'],
    subjectiveData: [
      'Altered mental status (agitation, confusion, drowsiness)',
      'Chest pain (cardiogenic)',
      'Severe breathlessness',
      'Abdominal pain (if intra-abdominal haemorrhage)',
      'Palpitations',
    ],
    objectiveData: [
      'Hypotension: SBP < 90 mmHg or MAP < 65 mmHg',
      'Tachycardia (HR > 100)',
      'Tachypnoea (RR > 20)',
      'Cool, clammy, mottled peripheries',
      'Prolonged capillary refill (> 3 seconds)',
      'Reduced urine output (< 0.5 mL/kg/hr)',
      'Elevated lactate (> 2 mmol/L)',
      'Narrowed pulse pressure (hypovolaemic)',
      'Elevated JVP (cardiogenic/obstructive)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-shock-1',
        diagnosis: 'Ineffective Tissue Perfusion',
        relatedFactors: ['Decreased cardiac output', 'Vasodilation', 'Hypovolaemia'],
        definingCharacteristics: ['Hypotension', 'Tachycardia', 'Cool peripheries', 'Reduced urine output', 'Elevated lactate', 'Altered consciousness'],
      },
      {
        id: 'nd-shock-2',
        diagnosis: 'Deficient Fluid Volume',
        relatedFactors: ['Haemorrhage', 'Dehydration', 'Third-space losses'],
        definingCharacteristics: ['Hypotension', 'Tachycardia', 'Dry mucous membranes', 'Sunken eyes', 'Reduced skin turgor'],
      },
      {
        id: 'nd-shock-3',
        diagnosis: 'Risk for Impaired Skin Integrity',
        relatedFactors: ['Tissue hypoperfusion', 'Vasopressor therapy', 'Immobility', 'Oedema'],
        definingCharacteristics: ['Mottled skin', 'Pressure areas', 'Cool extremities'],
      },
    ],
    goals: [
      {
        id: 'g-shock-1',
        shortTerm: 'MAP ≥ 65 mmHg. Lactate normalising (< 2 mmol/L). Urine output > 0.5 mL/kg/hr. GCS improving.',
        longTerm: 'Patient survives to discharge with no residual organ damage.',
      },
    ],
    interventions: [
      {
        id: 'i-shock-1',
        category: 'independent',
        action: 'Assess and monitor haemodynamic status continuously: HR, BP (invasive if needed), MAP, CVP, lactate, urine output.',
        rationale: 'Continuous monitoring guides fluid and vasopressor therapy and detects deterioration.',
        frequency: 'Continuous / every 15 min',
      },
      {
        id: 'i-shock-2',
        category: 'dependent',
        action: 'Establish IV access (2 large-bore cannulae). Administer IV fluid bolus (crystalloid 500 mL stat, reassess, repeat).',
        rationale: 'Rapid volume expansion restores intravascular volume and tissue perfusion.',
        frequency: 'Stat, then reassess',
      },
      {
        id: 'i-shock-3',
        category: 'dependent',
        action: 'Administer vasopressors (noradrenaline first-line for septic/distributive) via central line. Titrate to MAP ≥ 65 mmHg.',
        rationale: 'Vasopressors restore vascular tone when fluid resuscitation alone is insufficient.',
        frequency: 'Continuous infusion, titrated',
      },
      {
        id: 'i-shock-4',
        category: 'independent',
        action: 'Identify and treat the underlying cause: control bleeding (pressure, surgery), treat infection (antibiotics), treat arrhythmia (cardioversion/medication), relieve obstruction.',
        rationale: 'Treating the cause is essential — fluid/vasopressors are temporising measures.',
        frequency: 'Immediate',
      },
      {
        id: 'i-shock-5',
        category: 'independent',
        action: 'Maintain normothermia. Use warming blankets. Monitor core temperature.',
        rationale: 'Hypothermia worsens coagulopathy and acidosis in shock.',
        frequency: 'Continuous',
      },
      {
        id: 'i-shock-6',
        category: 'independent',
        action: 'Elevate legs (Trendelenburg) in hypovolaemic shock if no spinal injury suspected.',
        rationale: 'Leg elevation increases venous return and cardiac output.',
        frequency: 'As tolerated',
      },
    ],
    evaluation: [
      {
        id: 'e-shock-1',
        expected: 'MAP ≥ 65 mmHg. Lactate < 2 mmol/L. Urine output > 0.5 mL/kg/hr. Patient alert and oriented.',
        status: 'met',
      },
    ],
    patientEducation: [
      {
        topic: 'Understanding Shock',
        keyPoints: [
          'Shock is a life-threatening condition where the body\'s organs do not get enough blood flow.',
          'It requires immediate treatment in hospital.',
          'Causes include severe bleeding, infection, heart problems, and allergic reactions.',
        ],
      },
    ],
    dischargePlanning: {
      checklist: [
        'Haemodynamically stable for ≥ 24 hours off vasopressors',
        'Organ function normalised',
        'Underlying cause identified and treated',
        'Nutritional support initiated',
        'Rehabilitation referral',
        'Follow-up arranged',
      ],
      followUp: 'Depends on underlying cause. ICU follow-up clinic if available. GP within 1–2 weeks.',
      referrals: ['ICU Follow-up', 'Physiotherapy', 'Psychology', 'Specialist services as needed'],
      warningSigns: [
        'Dizziness or fainting',
        'Rapid heart rate or palpitations',
        'Confusion or drowsiness',
        'Reduced urine output',
        'Cool or mottled skin',
        'Signs of infection (fever, wound redness)',
      ],
    },
    complications: ['Multi-organ failure', 'ARDS', 'DIC', 'Acute kidney injury', 'Hepatic dysfunction', 'Death'],
  },

  // ═══════════════════════════════════════════════════════════════
  // GASTROINTESTINAL
  // ═══════════════════════════════════════════════════════════════

  'Peptic Ulcer Disease': {
    id: 'cp-pud',
    disease: 'Peptic Ulcer Disease',
    specialty: 'Gastrointestinal Care',
    overview: 'Peptic ulcer disease (PUD) involves mucosal erosion in the stomach (gastric ulcer) or duodenum (duodenal ulcer) extending through the muscularis mucosae. Common presentations include epigastric pain, nausea, and haematemesis. H. pylori infection and NSAID use are the leading causes.',
    pathophysiology: 'Imbalance between aggressive factors (acid, pepsin, H. pylori, NSAIDs) and protective factors (mucus, bicarbonate, prostaglandins, mucosal blood flow). H. pylori削弱sthe mucosal barrier via urease production and chronic inflammation. NSAIDs inhibit COX-1, reducing protective prostaglandin synthesis.',
    commonCauses: ['H. pylori infection (60-70% of duodenal, 50-60% of gastric ulcers)', 'NSAID use', 'Smoking', 'Physiological stress (Curling/Cushing ulcers)', 'Zollinger-Ellison syndrome (rare)'],
    riskFactors: ['H. pylori infection', 'NSAID / aspirin use', 'Smoking', 'Alcohol use', 'Older age', 'Family history of PUD', 'Corticosteroid use', 'Anticoagulant therapy'],
    subjectiveData: [
      'Burning or gnawing epigastric pain, often worse on empty stomach (duodenal) or after eating (gastric)',
      'Nausea, bloating, early satiety',
      'Haematemesis (vomiting bright red blood or coffee-ground material)',
      'Melaena (black, tarry stools)',
      'History of NSAID use or known H. pylori infection',
    ],
    objectiveData: [
      'Epigastric tenderness on palpation',
      'Tachycardia, hypotension if actively bleeding',
      'Pallor if chronic blood loss / anaemia',
      'Positive faecal occult blood test',
      'H. pylori positive on urea breath test or stool antigen',
      'Haemoglobin may be low (chronic blood loss)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-pud-1',
        diagnosis: 'Acute Pain related to mucosal erosion and exposure to gastric acid as evidenced by verbal report of epigastric pain and guarding',
        relatedFactors: ['Mucosal erosion by acid/pepsin', 'H. pylori-induced inflammation', 'NSAID-induced prostaglandin depletion'],
        definingCharacteristics: ['Epigastric burning pain', 'Pain worsened by fasting or eating', 'Guarding of abdomen'],
      },
      {
        id: 'nd-pud-2',
        diagnosis: 'Risk for Deficient Fluid Volume related to active gastrointestinal bleeding',
        relatedFactors: ['Haematemesis', 'Melaena', 'NPO status'],
        definingCharacteristics: ['Coffee-ground emesis', 'Black tarry stools', 'Tachycardia', 'Orthostatic hypotension'],
      },
      {
        id: 'nd-pud-3',
        diagnosis: 'Imbalanced Nutrition: Less Than Body Requirements related to pain-induced anorexia and dietary restrictions',
        definingCharacteristics: ['Weight loss', 'Poor appetite', 'Early satiety'],
      },
    ],
    goals: [
      {
        id: 'g-pud-1',
        shortTerm: 'Pain reduced to ≤ 3/10 within 24 hours of initiating PPI therapy and dietary modification.',
        longTerm: 'Complete ulcer healing confirmed on endoscopy at 6–8 weeks. Pain-free between meals.',
      },
    ],
    interventions: [
      { id: 'i-pud-1', category: 'dependent', action: 'Administer proton pump inhibitor (PPI) as prescribed (e.g. omeprazole 40 mg OD for 8 weeks). Time doses 30 min before breakfast.', rationale: 'PPIs reduce gastric acid secretion, creating optimal pH for ulcer healing.', frequency: 'Once daily' },
      { id: 'i-pud-2', category: 'dependent', action: 'Administer H. pylori eradication regimen if positive: PPI + clarithromycin + amoxicillin (or metronidazole) for 14 days (quadruple therapy if penicillin-allergic).', rationale: 'Eradication of H. pylori reduces ulcer recurrence from 60% to < 5%.', frequency: 'As prescribed (14-day course)' },
      { id: 'i-pud-3', category: 'independent', action: 'Assess pain character, location, severity (0–10 scale), and relationship to meals. Document patterns.', rationale: 'Pain patterns help differentiate gastric vs duodenal ulcer and monitor treatment response.', frequency: 'Every shift' },
      { id: 'i-pud-4', category: 'independent', action: 'Monitor for signs of bleeding: haematemesis, melaena, tachycardia, hypotension, falling haemoglobin. Weigh stools if visible blood.', rationale: 'PUD complicated by bleeding carries 5–10% mortality; early detection is critical.', frequency: 'Every shift; continuously if active bleed' },
      { id: 'i-pud-5', category: 'independent', action: 'Provide small, frequent bland meals (6 per day). Avoid spicy, acidic, and fried foods. No alcohol or caffeine.', rationale: 'Small meals reduce gastric acid stimulation. Dietary modification reduces mucosal irritation.', frequency: 'With each meal' },
      { id: 'i-pud-6', category: 'independent', action: 'Elevate head of bed 15–20 cm. Avoid lying flat within 2 hours of eating.', rationale: 'Reduces gastric acid reflux and aspiration risk, especially in gastric ulcer.', frequency: 'With meals and at night' },
      { id: 'i-pud-7', category: 'independent', action: 'Encourage smoking cessation. Provide nicotine replacement or counselling referral.', rationale: 'Smoking delays ulcer healing, increases acid secretion, and doubles recurrence risk.', frequency: 'Daily' },
      { id: 'i-pud-8', category: 'collaborative', action: 'Review all medications with medical team. Discontinue or substitute NSAIDs. If NSAID essential, co-prescribe PPI.', rationale: 'NSAIDs are the second most common cause of PUD and significantly impair healing.', frequency: 'On admission and with any medication change' },
    ],
    evaluation: [
      { id: 'e-pud-1', expected: 'Epigastric pain ≤ 3/10 or resolved within 48–72 hours of PPI initiation.', status: 'met' },
      { id: 'e-pud-2', expected: 'No signs of GI bleeding (stable vitals, Hb stable, no haematemesis/melaena).', status: 'met' },
      { id: 'e-pud-3', expected: 'Tolerating small frequent meals without exacerbation of pain.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Medication Adherence',
        keyPoints: [
          'Take your PPI 30 minutes before breakfast — do not skip doses.',
          'Complete the full 14-day course of H. pylori antibiotics even if you feel better.',
          'Avoid NSAIDs (ibuprofen, diclofenac) unless your doctor says it is safe.',
          'If you need pain relief, use paracetamol instead.',
        ],
        method: 'Verbal + written leaflet',
      },
      {
        topic: 'Diet and Lifestyle',
        keyPoints: [
          'Eat small, frequent meals. Avoid spicy, acidic, and fried foods.',
          'Do not drink alcohol — it delays healing and increases bleeding risk.',
          'Stop smoking — it doubles the chance of ulcer recurrence.',
          'Manage stress through relaxation techniques.',
        ],
      },
    ],
    dischargePlanning: {
      checklist: [
        'PPI prescription dispensed with clear instructions',
        'H. pylori eradication regimen provided (if positive)',
        'Follow-up urea breath test scheduled at 4 weeks post-treatment',
        'Smoking cessation referral (if applicable)',
        'No NSAIDs without medical advice',
        'Dietary advice provided',
      ],
      followUp: 'GP within 2–4 weeks. Repeat H. pylori testing at 4 weeks post-eradication. Endoscopy at 6–8 weeks if gastric ulcer (to confirm healing and exclude malignancy).',
      referrals: ['Gastroenterology (if complicated or gastric ulcer)', 'Smoking Cessation', 'Dietitian'],
      warningSigns: [
        'Vomiting blood or coffee-ground material',
        'Black, tarry, or bloody stools',
        'Severe worsening abdominal pain',
        'Feeling faint, dizzy, or very weak',
        'Unexplained weight loss',
      ],
    },
    complications: ['GI haemorrhage (15–20%)', 'Perforation', 'Gastric outlet obstruction', 'Penetration into adjacent organ', 'Mortality 5–10% with complicated bleeding'],
  },

  'Cirrhosis': {
    id: 'cp-cirrhosis',
    disease: 'Cirrhosis',
    specialty: 'Gastrointestinal Care',
    overview: 'Cirrhosis is irreversible fibrosis of the liver leading to disrupted architecture, portal hypertension, and progressive hepatic insufficiency. Common complications include ascites, variceal bleeding, hepatic encephalopathy, and hepatorenal syndrome.',
    pathophysiology: 'Chronic liver injury (alcohol, viral hepatitis, NASH) → hepatocyte death → fibrosis → regenerative nodules → distorted architecture → portal hypertension → decreased synthetic function (albumin, clotting factors) and detoxification (ammonia).',
    commonCauses: ['Chronic alcohol use (most common in Kenya)', 'Chronic hepatitis B / C', 'Non-alcoholic steatohepatitis (NASH)', 'Autoimmune hepatitis', 'Primary biliary cholangitis'],
    riskFactors: ['Chronic alcohol use', 'Hepatitis B / C infection', 'Obesity / metabolic syndrome', 'Family history of liver disease', 'IV drug use', 'Tattoos / body piercings'],
    subjectiveData: [
      'Fatigue, weakness, anorexia',
      'Abdominal distension (ascites)',
      'Easy bruising or bleeding',
      'Confusion, difficulty concentrating (encephalopathy)',
      'Pruritus',
      'Jaundice (yellow skin/eyes)',
      'History of alcohol use or viral hepatitis',
    ],
    objectiveData: [
      'Jaundice, spider naevi, palmar erythema',
      'Ascites (shifting dullness, fluid thrill)',
      'Hepatosplenomegaly or shrunken liver',
      'Asterixis (flapping tremour) in encephalopathy',
      'Caput medusae (distended periumbilical veins)',
      'Elevated bilirubin, INR; low albumin, platelets',
      'Low serum sodium (dilutional hyponatraemia)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-cir-1',
        diagnosis: 'Excess Fluid Volume related to portal hypertension and decreased albumin synthesis as evidenced by ascites and peripheral oedema',
        relatedFactors: ['Portal hypertension', 'Hypoalbuminaemia', 'Sodium and water retention'],
        definingCharacteristics: ['Abdominal distension', 'Peripheral oedema', 'Weight gain', 'Shifting dullness positive'],
      },
      {
        id: 'nd-cir-2',
        diagnosis: 'Impaired Mental Status related to hepatic encephalopathy and elevated serum ammonia levels',
        relatedFactors: ['Inability to convert ammonia to urea', 'Portosystemic shunting'],
        definingCharacteristics: ['Confusion', 'Asterixis', 'Altered sleep-wake cycle', 'Coarse flapping tremour'],
      },
      {
        id: 'nd-cir-3',
        diagnosis: 'Risk for Bleeding related to coagulopathy and portal hypertension',
        relatedFactors: ['Decreased clotting factor synthesis', 'Thrombocytopenia', 'Oesophageal varices'],
        definingCharacteristics: ['Elevated INR', 'Low platelets', 'Easy bruising'],
      },
    ],
    goals: [
      {
        id: 'g-cir-1',
        shortTerm: 'Abdominal girth reduced by ≥ 2 cm within 48 hours of diuretic therapy. No respiratory compromise from ascites.',
        longTerm: 'Stable fluid balance without recurrent tense ascites. INR < 1.5. No variceal bleeding episode.',
      },
    ],
    interventions: [
      { id: 'i-cir-1', category: 'independent', action: 'Monitor fluid balance: daily weight, strict intake/output, abdominal girth measurement at same level and time.', rationale: 'Accurate fluid balance guides diuretic dosing and detects fluid overload early.', frequency: 'Every shift (weight daily before breakfast)' },
      { id: 'i-cir-2', category: 'dependent', action: 'Administer spironolactone (100 mg OD) ± furosemide (40 mg OD) as prescribed. Monitor electrolytes (K+, Na+, creatinine).', rationale: 'Diuretics mobilise ascitic fluid. Spironolactone counters aldosterone-mediated sodium retention. K+ monitoring prevents hyperkalaemia.', frequency: 'Once daily' },
      { id: 'i-cir-3', category: 'independent', action: 'Assess mental status every shift: orientation, asterixis, ability to follow commands. Use West Haven scale for encephalopathy grading.', rationale: 'Hepatic encephalopathy may progress rapidly. Early detection allows timely lactulose adjustment.', frequency: 'Every shift' },
      { id: 'i-cir-4', category: 'dependent', action: 'Administer lactulose (15–30 mL TDS) titrated to 2–3 soft stools per day. Add rifaximin 550 mg BD if recurrent encephalopathy.', rationale: 'Lactulose acidifies the colon, converting NH3 to NH4+ (non-absorbable). Rifaximin reduces ammonia-producing bacteria.', frequency: 'TDS (lactulose); BD (rifaximin)' },
      { id: 'i-cir-5', category: 'independent', action: 'Restrict sodium to < 2 g/day. Restrict fluid to 1–1.5 L/day if hyponatraemic (Na+ < 130). Provide dietitian referral.', rationale: 'Sodium restriction is the cornerstone of ascites management. Fluid restriction prevents dilutional hyponatraemia.', frequency: 'Ongoing' },
      { id: 'i-cir-6', category: 'independent', action: 'Monitor for signs of variceal bleeding: haematemesis, melaena, tachycardia, hypotension. Keep blood products on standby if high risk.', rationale: 'Variceal haemorrhage has 20–30% mortality. Early detection enables emergent endoscopy.', frequency: 'Every shift' },
      { id: 'i-cir-7', category: 'collaborative', action: 'Administer antibiotic prophylaxis (norfloxacin or ciprofloxacin) if ascitic fluid PMN > 250/mm³ (spontaneous bacterial peritonitis).', rationale: 'SBP carries 20% in-hospital mortality. Empiric antibiotics pending culture results are life-saving.', frequency: 'As prescribed' },
      { id: 'i-cir-8', category: 'independent', action: 'Provide meticulous skin care. Avoid trauma. Use electric razor. Apply gentle pressure after venepuncture for ≥ 5 minutes.', rationale: 'Coagulopathy and thrombocytopenia increase bleeding risk from minor trauma.', frequency: 'Ongoing' },
    ],
    evaluation: [
      { id: 'e-cir-1', expected: 'Abdominal girth reduced, weight trending down, no respiratory compromise.', status: 'met' },
      { id: 'e-cir-2', expected: 'Mental status clear and oriented. Asterixis resolved. West Haven grade ≤ 1.', status: 'met' },
      { id: 'e-cir-3', expected: 'No active bleeding. INR improving. Platelets stable.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Alcohol Cessation',
        keyPoints: [
          'Complete alcohol abstinence is essential — even small amounts accelerate liver damage.',
          'Counselling and support groups can help.',
          'Some medications can help with cravings — ask your doctor.',
        ],
        method: 'Verbal + written leaflet + referral',
      },
      {
        topic: 'Ascites and Fluid Management',
        keyPoints: [
          'Weigh yourself every morning before breakfast. Report a gain of > 1 kg in 2 days.',
          'Follow your low-salt diet strictly — avoid processed foods, canned soups, and salt.',
          'Take your diuretics exactly as prescribed.',
          'Report increased abdominal swelling, difficulty breathing, or ankle swelling.',
        ],
      },
    ],
    dischargePlanning: {
      checklist: [
        'Diuretic prescriptions with clear dosing schedule',
        'Lactulose prescription with titration instructions',
        'Low-sodium diet plan provided',
        'Alcohol cessation support arranged',
        'Daily weight monitoring equipment provided',
        'Follow-up bloods (LFTs, U&E, INR) scheduled at 1 week',
        'Contact details for liver clinic',
      ],
      followUp: 'Liver clinic within 1–2 weeks. Repeat bloods at 1 week. Endoscopy for variceal screening if not done. Hepatology referral for transplant assessment if decompensated.',
      referrals: ['Hepatology', 'Alcohol Cessation Service', 'Dietitian', 'Social Work', 'Palliative Care (if end-stage)'],
      warningSigns: [
        'Vomiting blood or passing black stools',
        'Sudden increase in abdominal swelling',
        'Confusion, drowsiness, or difficulty waking',
        'Fever or abdominal pain (possible SBP)',
        'Severe ankle swelling or breathlessness',
        'Yellowing of skin or eyes worsening',
      ],
    },
    complications: ['Variceal haemorrhage', 'Spontaneous bacterial peritonitis', 'Hepatorenal syndrome', 'Hepatocellular carcinoma', 'Hepatic encephalopathy', 'Death (5-year survival 35–50%)'],
  },

  // ═══════════════════════════════════════════════════════════════
  // RENAL
  // ═══════════════════════════════════════════════════════════════

  'Acute Kidney Injury': {
    id: 'cp-aki',
    disease: 'Acute Kidney Injury',
    specialty: 'Renal & Electrolyte Care',
    overview: 'Acute kidney injury (AKI) is a rapid decline in renal function over hours to days, manifesting as rising serum creatinine and/or reduced urine output. It is classified by KDIGO stages and may be prerenal, intrinsic renal, or postrenal in origin.',
    pathophysiology: 'Prerenal: reduced renal perfusion (dehydration, heart failure, sepsis). Intrinsic: direct tubular damage (ATN from ischaemia/toxins), glomerulonephritis, interstitial nephritis. Postrenal: urinary obstruction. Most cases (60–70%) are prerenal and reversible if treated promptly.',
    commonCauses: ['Sepsis (most common cause of AKI in hospital)', 'Dehydration / hypovolaemia', 'Nephrotoxic drugs (NSAIDs, aminoglycosides, contrast)', 'Urinary obstruction (BPH, stones)', 'Acute tubular necrosis', 'Heart failure'],
    riskFactors: ['Advanced age', 'Chronic kidney disease', 'Diabetes mellitus', 'Heart failure', 'Sepsis', 'Nephrotoxic medications', 'Dehydration', 'Major surgery'],
    subjectiveData: [
      'Reduced urine output (oliguria < 400 mL/day or anuria < 100 mL/day)',
      'Fatigue, lethargy, confusion',
      'Nausea, vomiting, anorexia',
      'Shortness of breath (fluid overload)',
      'Pruritus',
      'Flank pain (obstructive causes)',
    ],
    objectiveData: [
      'Rising serum creatinine (≥ 26.5 µmol/L within 48 hours or ≥ 1.5× baseline)',
      'Oliguria or anuria',
      'Fluid overload: peripheral oedema, pulmonary crackles, raised JVP',
      'Hyperkalaemia (ECG changes: peaked T waves, widened QRS)',
      'Metabolic acidosis (low bicarbonate, high anion gap)',
      'Uraemic signs: asterixis, pericardial friction rub',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-aki-1',
        diagnosis: 'Risk for Impaired Urinary Elimination related to acute tubular necrosis and reduced renal perfusion',
        definingCharacteristics: ['Oliguria', 'Rising creatinine', 'Elevated urea'],
      },
      {
        id: 'nd-aki-2',
        diagnosis: 'Excess Fluid Volume related to decreased glomerular filtration as evidenced by peripheral oedema and pulmonary crackles',
        relatedFactors: ['Decreased urine output', 'IV fluid overload', 'Impaired sodium excretion'],
        definingCharacteristics: ['Weight gain', 'Peripheral oedema', 'Dyspnoea', 'Crackles on auscultation'],
      },
      {
        id: 'nd-aki-3',
        diagnosis: 'Risk for Cardiac Arrhythmia related to hyperkalaemia',
        definingCharacteristics: ['K+ > 5.5 mmol/L', 'Peaked T waves on ECG', 'Muscle weakness'],
      },
    ],
    goals: [
      {
        id: 'g-aki-1',
        shortTerm: 'Urine output ≥ 0.5 mL/kg/hr maintained. K+ < 5.5 mmol/L. No fluid overload symptoms within 24 hours.',
        longTerm: 'Creatinine returns to baseline. Independence from renal replacement therapy. No residual renal impairment.',
      },
    ],
    interventions: [
      { id: 'i-aki-1', category: 'independent', action: 'Monitor strict intake and output hourly. Weigh patient daily. Measure urine output via indwelling catheter if oliguric.', rationale: 'Accurate I&O guides fluid management and detects worsening renal function early.', frequency: 'Hourly (I&O); daily (weight)' },
      { id: 'i-aki-2', category: 'dependent', action: 'Administer IV fluids (0.9% NaCl or Plasmalyte) for prerenal AKI. Restrict fluids if overload. Target urine output ≥ 0.5 mL/kg/hr.', rationale: 'Volume resuscitation corrects prerenal causes. Fluid restriction prevents pulmonary oedema in established AKI.', frequency: 'As prescribed' },
      { id: 'i-aki-3', category: 'dependent', action: 'Manage hyperkalaemia: calcium gluconate 10% IV (cardioprotection), insulin/dextrose IV, salbutamol nebs, sodium zirconium cyclosilicate or calcium resonium PO.', rationale: 'Severe hyperkalaemia (K+ > 6.5 or ECG changes) is a medical emergency requiring immediate treatment.', frequency: 'Emergency; then as prescribed' },
      { id: 'i-aki-4', category: 'independent', action: 'Withhold nephrotoxic drugs: NSAIDs, aminoglycosides, ACE inhibitors/ARBs (in acute phase), IV contrast. Review all medications with pharmacy.', rationale: 'Nephrotoxins worsen AKI and delay recovery. Drug review is a key nursing intervention.', frequency: 'On admission and daily review' },
      { id: 'i-aki-5', category: 'collaborative', action: 'Monitor for referral to nephrology for renal replacement therapy (RRT) if: refractory hyperkalaemia, severe acidosis, fluid overload unresponsive to diuretics, or uraemic symptoms.', rationale: 'RRT is life-saving when conservative measures fail. Early nephrology involvement improves outcomes.', frequency: 'As needed' },
      { id: 'i-aki-6', category: 'independent', action: 'Monitor electrolytes (K+, Na+, Ca2+, PO4) and ABGs every 6–12 hours. Report K+ > 5.5 or pH < 7.2 immediately.', rationale: 'Electrolyte and acid-base disturbances in AKI can be fatal if not corrected promptly.', frequency: 'Every 6–12 hours' },
    ],
    evaluation: [
      { id: 'e-aki-1', expected: 'Urine output ≥ 0.5 mL/kg/hr. Creatinine stable or improving. K+ within normal range.', status: 'met' },
      { id: 'e-aki-2', expected: 'No fluid overload (clear lung fields, no peripheral oedema, stable weight).', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Kidney Recovery',
        keyPoints: [
          'AKI is often reversible if the cause is treated early.',
          'Drink adequate fluids (unless your doctor restricts them).',
          'Avoid NSAIDs (ibuprofen, diclofenac) and check with your pharmacist before taking any new medicines.',
          'Report any reduction in urine output immediately.',
        ],
        method: 'Verbal + written leaflet',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Renal function tests scheduled at 1 and 2 weeks post-discharge',
        'Nephrotoxic medications avoided or dose-adjusted',
        'Fluid and dietary advice provided',
        'Nephrology follow-up arranged if incomplete recovery',
        'Medication reconciliation completed',
      ],
      followUp: 'Nephrology or GP within 1 week. Repeat U&E at 1 and 2 weeks. Renal ultrasound if obstruction suspected. Monitor for CKD development at 3 months.',
      referrals: ['Nephrology', 'Pharmacy (medication review)', 'Dietitian (renal diet if persistent impairment)'],
      warningSigns: [
        'Reduced urine output',
        'Severe fatigue or confusion',
        'Swelling of legs or breathlessness',
        'Nausea and vomiting',
        'Muscle cramps or twitching',
      ],
    },
    complications: ['Progression to CKD', 'Refractory hyperkalaemia', 'Pulmonary oedema', 'Uraemic encephalopathy', 'Pericarditis', 'Need for dialysis', 'Death'],
  },

  'Chronic Kidney Disease': {
    id: 'cp-ckd',
    disease: 'Chronic Kidney Disease',
    specialty: 'Renal & Electrolyte Care',
    overview: 'Chronic kidney disease (CKD) is a progressive, irreversible loss of renal function lasting > 3 months, classified in 5 stages by GFR. Management focuses on slowing progression, managing complications, and preparing for renal replacement therapy (RRT) when indicated.',
    pathophysiology: 'Progressive nephron loss → compensatory hyperfiltration of remaining nephrons → glomerulosclerosis → further nephron loss (vicious cycle). Leads to retention of uraemic toxins, fluid overload, electrolyte imbalances, metabolic acidosis, and secondary hyperparathyroidism.',
    commonCauses: ['Diabetic nephropathy (most common globally)', 'Hypertensive nephrosclerosis', 'Chronic glomerulonephritis', 'Polycystic kidney disease', 'Obstructive uropathy'],
    riskFactors: ['Diabetes mellitus', 'Hypertension', 'Obesity', 'Smoking', 'Family history of kidney disease', 'Age > 60', 'ACE inhibitor/ARB use (may slow progression)', 'Low birth weight'],
    subjectiveData: [
      'Fatigue, reduced energy (anaemia)',
      'Nocturia, polyuria (early) → oliguria (late)',
      'Pruritus (uraemic toxin accumulation)',
      'Anorexia, nausea, metallic taste',
      'Peripheral oedema, dyspnoea on exertion',
      'Bone pain (renal osteodystrophy)',
      'Difficulty concentrating, restless legs',
    ],
    objectiveData: [
      'GFR < 60 mL/min/1.73m² (stages 3–5)',
      'Elevated creatinine, urea',
      'Proteinuria (ACR > 3 mg/mmol)',
      'Anaemia (low Hb, low reticulocytes)',
      'Hyperkalaemia, hyperphosphataemia, hypocalcaemia',
      'Metabolic acidosis',
      'Renal osteodystrophy on X-ray (late)',
      'Small, echogenic kidneys on ultrasound',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-ckd-1',
        diagnosis: 'Fatigue related to anaemia and uraemic toxin accumulation as evidenced by reduced activity tolerance and verbal report of tiredness',
        relatedFactors: ['Anaemia (decreased erythropoietin)', 'Uraemic toxins', 'Sleep disturbance'],
        definingCharacteristics: ['Reduced activity tolerance', 'Pallor', 'Lethargy'],
      },
      {
        id: 'nd-ckd-2',
        diagnosis: 'Imbalanced Nutrition: Less Than Body Requirements related to uraemic anorexia, nausea, and dietary restrictions',
        definingCharacteristics: ['Weight loss', 'Anorexia', 'Nausea', 'Altered taste'],
      },
      {
        id: 'nd-ckd-3',
        diagnosis: 'Risk for Decreased Cardiac Output related to fluid overload and hyperkalaemia',
        definingCharacteristics: ['Peripheral oedema', 'Elevated K+', 'BP fluctuations'],
      },
    ],
    goals: [
      {
        id: 'g-ckd-1',
        shortTerm: 'Hb ≥ 100 g/L with ESA therapy. Electrolytes within acceptable range. Fluid balance maintained.',
        longTerm: 'GFR decline slowed (stable creatinine). Patient prepared for and transitioned to RRT if needed. Quality of life maintained.',
      },
    ],
    interventions: [
      { id: 'i-ckd-1', category: 'dependent', action: 'Administer erythropoiesis-stimulating agent (ESA) — darbepoetin or epoetin — as prescribed. Monitor Hb target 100–120 g/L. Administer IV iron if ferritin < 200 µg/L.', rationale: 'Anaemia is the main cause of fatigue in CKD. ESAs stimulate red cell production. Iron is needed for ESA efficacy.', frequency: 'Weekly to monthly per protocol' },
      { id: 'i-ckd-2', category: 'independent', action: 'Monitor fluid status: daily weight, I&O, oedema assessment, lung sounds. Restrict fluids if oliguric. Low-sodium diet (< 2 g/day).', rationale: 'Fluid overload is a major cause of morbidity in CKD. Sodium restriction reduces thirst and fluid retention.', frequency: 'Daily weight; every shift (oedema)' },
      { id: 'i-ckd-3', category: 'dependent', action: 'Administer phosphate binders (calcium acetate, sevelamer, or lanthanum) with meals. Administer calcitriol or vitamin D analogues as prescribed.', rationale: 'Phosphate binders prevent hyperphosphataemia and secondary hyperparathyroidism. Vitamin D manages bone disease.', frequency: 'With each meal' },
      { id: 'i-ckd-4', category: 'independent', action: 'Monitor potassium intake. Avoid high-K+ foods (bananas, oranges, tomatoes, dried fruit). Teach patient to read food labels.', rationale: 'Hyperkalaemia is life-threatening in CKD due to reduced renal K+ excretion.', frequency: 'Ongoing dietary education' },
      { id: 'i-ckd-5', category: 'collaborative', action: 'Prepare patient for RRT if GFR < 15 mL/min or symptomatic uraemia: vascular access planning (AV fistula creation 6 months before dialysis), transplant workup, peritoneal dialysis education.', rationale: 'Timely RRT preparation reduces emergency dialysis and improves outcomes. AV fistula needs time to mature.', frequency: 'CKD stage 4 onwards' },
      { id: 'i-ckd-6', category: 'independent', action: 'Administer sodium bicarbonate if serum HCO3- < 22 mmol/L. Target serum bicarbonate ≥ 22 mmol/L.', rationale: 'Metabolic acidosis accelerates muscle wasting and bone disease in CKD.', frequency: 'As prescribed' },
    ],
    evaluation: [
      { id: 'e-ckd-1', expected: 'Hb ≥ 100 g/L with reduced fatigue. Electrolytes (K+, PO4, Ca2+) within acceptable range.', status: 'met' },
      { id: 'e-ckd-2', expected: 'Patient demonstrates dietary knowledge. Fluid balance maintained. GFR decline slowed.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'CKD Self-Management',
        keyPoints: [
          'CKD is chronic but you can slow it down with good control of diabetes, BP, and diet.',
          'Follow your low-salt, low-potassium diet. A dietitian will help you.',
          'Take your phosphate binders with every meal — they work by binding phosphorus in food.',
          'Weigh yourself daily. Report sudden weight gain (> 1 kg/day or > 2 kg/week).',
          'Avoid NSAIDs and check with your pharmacist before taking new medications.',
        ],
        method: 'Verbal + written + dietitian session',
      },
      {
        topic: 'Preparing for Dialysis',
        keyPoints: [
          'If your kidneys continue to lose function, dialysis may become necessary.',
          'An AV fistula (connection between an artery and vein in your arm) is the best access for haemodialysis — it should be created months before you need dialysis.',
          'Peritoneal dialysis can be done at home.',
          'Kidney transplant is the best option if you are eligible.',
        ],
      },
    ],
    dischargePlanning: {
      checklist: [
        'ESA and phosphate binder prescriptions with clear instructions',
        'Dietitian referral completed',
        'AV fistula surgical referral (if GFR < 20)',
        'Bloods scheduled at 1 month (U&E, Ca2+, PO4, PTH, Hb)',
        'BP monitoring at home arranged',
        'Patient education on fluid and dietary restrictions',
      ],
      followUp: 'Nephrology every 1–3 months (stage 3–4) or every 1–4 weeks (stage 5). Bloods every 1–3 months. Renal ultrasound if cause unknown. Transplant assessment if eligible.',
      referrals: ['Nephrology', 'Dietitian', 'Vascular Surgery (AV fistula)', 'Transplant Centre', 'Palliative Care (if conservative pathway)'],
      warningSigns: [
        'Severe fatigue or drowsiness',
        'Very reduced or absent urine output',
        'Severe nausea and vomiting',
        'Swelling of legs or difficulty breathing',
        'Muscle twitching or seizures',
        'Chest pain',
      ],
    },
    complications: ['Cardiovascular disease (leading cause of death in CKD)', 'Hyperkalaemia', 'Metabolic acidosis', 'Renal osteodystrophy', 'Anaemia', 'Uraemic pericarditis', 'Progression to ESRD'],
  },

  // ═══════════════════════════════════════════════════════════════
  // HAEMATOLOGY & ONCOLOGY
  // ═══════════════════════════════════════════════════════════════

  'Sickle Cell Disease': {
    id: 'cp-scd',
    disease: 'Sickle Cell Disease',
    specialty: 'Haematology & Oncology Care',
    overview: 'Sickle cell disease (SCD) is an inherited haemoglobinopathy where abnormal haemoglobin S (HbS) polymerises under deoxygenation, causing red blood cells to sickle. This leads to chronic haemolytic anaemia, vaso-occlusive crises, organ damage, and increased infection risk. SCD is highly prevalent in Kenya and sub-Saharan Africa.',
    pathophysiology: 'HbS polymerisation under low O2 → rigid sickle-shaped RBCs → microvascular occlusion → tissue ischaemia and infarction. Chronic haemolysis releases free Hb, scavenging nitric oxide → endothelial dysfunction. Vaso-occlusion causes the hallmark painful crises and progressive organ damage (spleen, kidneys, lungs, brain).',
    commonCauses: ['Inherited (autosomal recessive) — HbSS is the most severe form', 'HbSC, HbSβ-thalassaemia (intermediate severity)', 'High prevalence in malaria-endemic regions (heterozygote advantage)'],
    riskFactors: ['HbSS genotype (most severe)', 'Dehydration', 'Hypoxia (altitude, anaesthesia, sleep apnoea)', 'Infection', 'Cold exposure', 'Strenuous exercise', 'Acidosis', 'Pregnancy'],
    subjectiveData: [
      'Severe bone/joint/chest pain (vaso-occlusive crisis)',
      'Fever (infection or sequestration)',
      'Fatigue, pallor (chronic anaemia)',
      'Abdominal pain (splenic sequestration, hepatic crisis)',
      'Headache, visual changes, seizures (stroke)',
      'Priapism (in males)',
      'History of previous crises and transfusions',
    ],
    objectiveData: [
      'Pallor, jaundice (chronic haemolysis)',
      'Tachycardia, flow murmur (anaemia)',
      'Fever ≥ 38°C (infection)',
      'Splenomegaly (children) or autosplenectomy (adults)',
      'Hb 50–90 g/L (baseline varies)',
      'Raised reticulocytes, LDH, unconjugated bilirubin',
      'Low Hb electrophoresis (HbS predominant)',
      'Dactylitis, joint swelling in children',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-scd-1',
        diagnosis: 'Acute Pain related to vaso-occlusion and tissue ischaemia as evidenced by severe pain report and guarding',
        relatedFactors: ['HbS polymerisation', 'Microvascular occlusion', 'Tissue hypoxia'],
        definingCharacteristics: ['Severe bone/joint pain', 'Guarding', 'Restlessness', 'Tachycardia'],
      },
      {
        id: 'nd-scd-2',
        diagnosis: 'Risk for Infection related to functional asplenia and impaired immune response',
        relatedFactors: ['Splenic infarction (autosplenectomy)', 'Impaired complement function'],
        definingCharacteristics: ['Fever', 'Absent splenic palpation', 'Raised WCC'],
      },
      {
        id: 'nd-scd-3',
        diagnosis: 'Deficient Fluid Volume related to increased metabolic demands, fever, and decreased oral intake during crisis',
        definingCharacteristics: ['Dehydration', 'Dry mucous membranes', 'Reduced urine output', 'Tachycardia'],
      },
    ],
    goals: [
      {
        id: 'g-scd-1',
        shortTerm: 'Pain controlled to ≤ 3/10 within 1–2 hours of analgesic administration. Adequate hydration maintained. Fever resolved within 48 hours if infectious.',
        longTerm: 'Reduced crisis frequency. Hb stable at baseline. Patient demonstrates self-management skills for crisis prevention.',
      },
    ],
    interventions: [
      { id: 'i-scd-1', category: 'dependent', action: 'Administer analgesics per WHO ladder: paracetamol + NSAID (mild), codeine/tramadol (moderate), morphine PCA or titrated IV (severe). Reassess pain 30 min after each dose.', rationale: 'Prompt, adequate analgesia is the cornerstone of vaso-occlusive crisis management. Delayed treatment increases suffering and prolongs admission.', frequency: 'As prescribed; pain reassessment every 1–2 hours' },
      { id: 'i-scd-2', category: 'independent', action: 'Aggressive hydration: IV 0.9% NaCl at 1.5–2× maintenance. Encourage oral fluids ≥ 3 L/day if able. Monitor I&O and urine specific gravity.', rationale: 'Dehydration worsens HbS polymerisation and sickling. Adequate hydration improves blood flow and reduces crisis severity.', frequency: 'Continuous IV; hourly intake monitoring' },
      { id: 'i-scd-3', category: 'dependent', action: 'Administer exchange transfusion if: severe crisis unresponsive to analgesia, acute chest syndrome, stroke, or Hb > 150 g/L post-simple transfusion (to avoid hyperviscosity).', rationale: 'Exchange transfusion replaces sickle cells with normal HbS, improving oxygen delivery and reducing sickling.', frequency: 'As prescribed' },
      { id: 'i-scd-4', category: 'independent', action: 'Administer pneumococcal and influenza vaccines. Administer prophylactic antibiotics (penicillin V 250 mg BD) from 2 months to at least 5 years. Folic acid 5 mg daily.', rationale: 'Infection is a leading cause of death in SCD, especially in children. Prophylactic penicillin reduces pneumococcal sepsis by 84%. Folic acid supports erythropoiesis.', frequency: 'Daily (penicillin, folic acid); per schedule (vaccines)' },
      { id: 'i-scd-5', category: 'independent', action: 'Monitor for complications: fever > 38°C (emergent — blood cultures + empirical IV antibiotics within 1 hour), signs of stroke (neuro exam), acute chest syndrome (chest pain, fever, hypoxia, infiltrate on CXR), splenic sequestration (rapid splenomegaly, falling Hb).', rationale: 'These complications are life-threatening and require immediate intervention. Early detection saves lives.', frequency: 'Every shift; continuously during crisis' },
      { id: 'i-scd-6', category: 'independent', action: 'Warm compresses to painful areas. Encourage gentle movement and repositioning every 2 hours. Avoid cold exposure.', rationale: 'Warmth promotes vasodilation and blood flow. Immobility increases stasis and worsening of vaso-occlusion.', frequency: 'Every 2 hours' },
    ],
    evaluation: [
      { id: 'e-scd-1', expected: 'Pain ≤ 3/10 within 2 hours of analgesic. Patient comfortable and resting.', status: 'met' },
      { id: 'e-scd-2', expected: 'Adequate hydration (urine output > 0.5 mL/kg/hr, moist mucous membranes). No fever.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Crisis Prevention',
        keyPoints: [
          'Drink plenty of fluids every day (at least 2–3 litres) — dehydration triggers crises.',
          'Avoid extreme cold and hot temperatures.',
          'Take your folic acid and penicillin every day.',
          'Keep all vaccination appointments.',
          'Avoid strenuous exercise but stay gently active.',
          'Learn to recognise early signs of a crisis and seek treatment promptly.',
        ],
        method: 'Verbal + written + clinic follow-up',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Oral analgesics prescribed for breakthrough pain',
        'Folic acid and penicillin prescriptions dispensed',
        'Vaccination schedule reviewed and up to date',
        'Hydration advice provided',
        'Follow-up haematology appointment scheduled (2–4 weeks)',
        'Crisis action plan documented',
        'Genetic counselling referral (if family planning)',
      ],
      followUp: 'Haematology every 1–3 months. Hb electrophoresis every 6 months. Annual transcranial Doppler (children). Renal, cardiac, and ophthalmology screening annually.',
      referrals: ['Haematology', 'Genetic Counselling', 'Psychology', 'Social Work', 'Pain Management Clinic'],
      warningSigns: [
        'Fever > 38°C (seek emergency care immediately)',
        'Severe pain not responding to oral analgesics at home',
        'Sudden weakness, numbness, or difficulty speaking (stroke)',
        'Chest pain or difficulty breathing (acute chest syndrome)',
        'Sudden increase in abdominal swelling (splenic sequestration)',
        'Priapism lasting > 2 hours',
      ],
    },
    complications: ['Acute chest syndrome', 'Stroke', 'Splenic sequestration', 'Aplastic crisis (parvovirus B19)', 'Osteomyelitis', 'Avascular necrosis', 'Renal papillary necrosis', 'Leg ulcers', 'Increased mortality'],
  },

  'Iron Deficiency Anaemia': {
    id: 'cp-ida',
    disease: 'Iron Deficiency Anaemia',
    specialty: 'Haematology & Oncology Care',
    overview: 'Iron deficiency anaemia (IDA) is the most common anaemia worldwide, caused by insufficient iron for haemoglobin synthesis. It results in microcytic, hypochromic red blood cells. In Kenya, causes include dietary insufficiency, hookworm infestation, menorrhagia, and chronic GI blood loss.',
    pathophysiology: 'Depleted iron stores (ferritin < 15 µg/L) → insufficient iron for erythropoiesis → microcytic, hypochromic RBCs → reduced oxygen-carrying capacity → tissue hypoxia symptoms (fatigue, dyspnoea, tachycardia).',
    commonCauses: ['Chronic menstrual blood loss (most common in women of reproductive age)', 'Dietary insufficiency (low bioavailability plant-based diets)', 'Hookworm and other intestinal parasites', 'Chronic GI blood loss (ulcers, cancer, NSAIDs)', 'Pregnancy and lactation', 'Growth in children and adolescents'],
    riskFactors: ['Female sex (menstruation)', 'Pregnancy', 'Low socioeconomic status', 'Vegetarian/vegan diet', 'History of GI disease', 'Hookworm endemic areas', 'Frequent blood donation'],
    subjectiveData: [
      'Fatigue, weakness, reduced exercise tolerance',
      'Dyspnoea on exertion',
      'Dizziness, lightheadedness',
      'Pica (craving non-food items: ice, clay, soil)',
      'Angular cheilosis (sore corners of mouth)',
      'Brittle nails, hair loss',
      'Pica, restless legs',
    ],
    objectiveData: [
      'Pallor (conjunctivae, nail beds, palmar creases)',
      'Tachycardia, flow murmur',
      'Koilonychia (spoon nails), angular stomatitis',
      'Glossitis (smooth, red tongue)',
      'Hb low, MCV low (< 80 fL), MCH low',
      'Ferritin low (< 15 µg/L) — most specific test',
      'Iron studies: low ferritin, low iron, high TIBC, low transferrin saturation',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-ida-1',
        diagnosis: 'Fatigue related to decreased oxygen-carrying capacity of blood as evidenced by reduced activity tolerance and verbal report of tiredness',
        relatedFactors: ['Low haemoglobin', 'Tissue hypoxia', 'Nutritional deficiency'],
        definingCharacteristics: ['Reduced activity tolerance', 'Pallor', 'Tachycardia on exertion'],
      },
      {
        id: 'nd-ida-2',
        diagnosis: 'Imbalanced Nutrition: Less Than Body Requirements related to inadequate iron intake and/or chronic blood loss',
        definingCharacteristics: ['Pica', 'Poor dietary intake', 'Angular cheilosis', 'Low ferritin'],
      },
    ],
    goals: [
      {
        id: 'g-ida-1',
        shortTerm: 'Hb rising (≥ 10 g/L increase in 2–4 weeks). Reduced fatigue. No adverse effects from iron therapy.',
        longTerm: 'Hb normalised (> 120 g/L women, > 130 g/L men). Ferritin > 50 µg/L. Underlying cause identified and treated.',
      },
    ],
    interventions: [
      { id: 'i-ida-1', category: 'dependent', action: 'Administer oral iron (ferrous sulfate 200 mg 2–3 times daily) on an empty stomach with vitamin C (orange juice) to enhance absorption. If intolerant, try every-other-day dosing.', rationale: 'Oral iron is first-line. Vitamin C enhances non-haeme iron absorption by 2–3×. Alternate-day dosing improves absorption and reduces GI side effects.', frequency: '2–3 times daily' },
      { id: 'i-ida-2', category: 'independent', action: 'Educate patient on dietary iron sources: red meat, liver, beans, lentils, spinach, fortified cereals. Separate iron-rich foods from tea, coffee, and calcium (which inhibit absorption).', rationale: 'Dietary education addresses the root cause. Understanding food interactions maximises absorption.', frequency: 'On admission and at discharge' },
      { id: 'i-ida-3', category: 'independent', action: 'Monitor for GI side effects of oral iron: constipation, nausea, dark stools (expected). Educate that dark stools are normal and not blood.', rationale: 'GI side effects are the main reason for non-compliance. Reassurance about dark stools prevents unnecessary concern.', frequency: 'Daily' },
      { id: 'i-ida-4', category: 'collaborative', action: 'Investigate and treat underlying cause: menstrual history, stool for occult blood and oesophagostomiasis, GI endoscopy if indicated.', rationale: 'Treating the cause is essential — iron replacement alone is insufficient if blood loss continues.', frequency: 'As indicated' },
      { id: 'i-ida-5', category: 'dependent', action: 'Administer IV iron (ferric carboxymaltose or iron sucrose) if oral iron is not tolerated, not absorbed, or rapid correction is needed (e.g. third trimester pregnancy, pre-surgery).', rationale: 'IV iron bypasses GI absorption issues and rapidly replenishes stores.', frequency: 'As prescribed' },
    ],
    evaluation: [
      { id: 'e-ida-1', expected: 'Hb rising by ≥ 10 g/L in 2–4 weeks. Ferritin > 50 µg/L at 3 months.', status: 'met' },
      { id: 'e-ida-2', expected: 'Patient reports improved energy and exercise tolerance. No GI intolerance.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Iron Replacement Therapy',
        keyPoints: [
          'Take iron tablets with vitamin C (orange juice) on an empty stomach for best absorption.',
          'Dark or black stools are normal — this is not blood.',
          'If tablets upset your stomach, take them with a small amount of food or try every other day.',
          'Avoid tea, coffee, and calcium supplements within 2 hours of taking iron.',
          'Continue iron for 3–6 months after Hb normalises to rebuild stores.',
        ],
        method: 'Verbal + written leaflet',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Iron supplement prescription with clear dosing instructions',
        'Dietary advice sheet provided',
        'Follow-up bloods (FBC, ferritin) at 4–6 weeks',
        'Underlying cause investigation plan documented',
        'Return if symptoms worsen or new symptoms develop',
      ],
      followUp: 'GP or haematology at 4–6 weeks for repeat FBC and ferritin. Continue iron for 3–6 months after normalisation. Repeat ferritin at 3 months.',
      referrals: ['Gynaecology (if menorrhagia)', 'Gastroenterology (if GI source suspected)', 'Dietitian', 'Parasitology (if hookworm suspected)'],
      warningSigns: [
        'Worsening fatigue or breathlessness',
        'Chest pain or palpitations',
        'Severe constipation unresponsive to laxatives',
        'Blood in stools (different from the expected dark colour)',
        'Fainting or severe dizziness',
      ],
    },
    complications: ['Severe anaemia (Hb < 60 g/L) requiring transfusion', 'Heart failure from chronic anaemia', 'Pica-related complications (lead poisoning from paint/soil)', 'Impaired growth in children', 'Increased perioperative risk'],
  },

  // ═══════════════════════════════════════════════════════════════
  // PAEDIATRIC
  // ═══════════════════════════════════════════════════════════════

  'Paediatric Asthma': {
    id: 'cp-paeds-asthma',
    disease: 'Paediatric Asthma',
    specialty: 'Paediatric Care',
    overview: 'Paediatric asthma is a chronic inflammatory airway disease characterised by reversible airflow obstruction, bronchial hyperresponsiveness, and recurrent episodes of wheezing, cough, and dyspnoea. It is the most common chronic disease of childhood and a leading cause of school absenteeism and hospital admission.',
    pathophysiology: 'Allergen/trigger exposure → IgE-mediated mast cell degranulation → release of histamine, leukotrienes → bronchial smooth muscle contraction → mucosal oedema → mucus hypersecretion → airway obstruction. Chronic inflammation leads to airway remodelling.',
    commonCauses: ['Viral respiratory infections (most common trigger in children)', 'Allergens (dust mites, pet dander, cockroach, mould)', 'Exercise', 'Cold air', 'Tobacco smoke exposure', 'Emotional stress'],
    riskFactors: ['Atopic triad (asthma, eczema, allergic rhinitis)', 'Family history of asthma/atopy', 'Exposure to tobacco smoke', 'Obesity', 'Viral bronchiolitis in infancy', 'Low socioeconomic status'],
    subjectiveData: [
      'Recurrent wheezing, especially at night or with exercise',
      'Cough (worse at night, with colds, or with exercise)',
      'Chest tightness (older children)',
      'Shortness of breath',
      'Difficulty sleeping due to cough/wheeze',
      'Parental report of "noisy chest" during illness',
    ],
    objectiveData: [
      'Expiratory wheeze on auscultation',
      'Prolonged expiratory phase',
      'Tachypnoea, tachycardia during exacerbation',
      'Use of accessory muscles (older children)',
      'Reduced air entry bilaterally (severe — "silent chest")',
      'SpO2 < 94% during exacerbation',
      'Peak flow < 80% predicted (school-age children)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-paeds-asthma-1',
        diagnosis: 'Ineffective Airway Clearance related to bronchospasm, mucosal oedema, and mucus hypersecretion as evidenced by wheezing and cough',
        relatedFactors: ['Bronchospasm', 'Airway inflammation', 'Mucus production'],
        definingCharacteristics: ['Wheezing', 'Cough', 'Prolonged expiration', 'Tachypnoea'],
      },
      {
        id: 'nd-paeds-asthma-2',
        diagnosis: 'Impaired Gas Exchange related to airway obstruction as evidenced by SpO2 < 94% and tachypnoea',
        definingCharacteristics: ['Low SpO2', 'Tachypnoea', 'Tachycardia', 'Irritability'],
      },
    ],
    goals: [
      {
        id: 'g-paeds-asthma-1',
        shortTerm: 'Wheezing resolved or minimal. SpO2 ≥ 94%. Child comfortable and able to speak in full sentences. RR and HR within normal range for age.',
        longTerm: 'Child maintains well-controlled asthma (no daytime symptoms > 1×/week, no night symptoms, no exacerbations). Correct inhaler technique demonstrated.',
      },
    ],
    interventions: [
      { id: 'i-paeds-asthma-1', category: 'dependent', action: 'Administer salbutamol via MDI + spacer (4–8 puffs every 20 min for 1 hour in acute exacerbation). For mild-moderate: 2–4 puffs every 4–6 hours PRN.', rationale: 'Salbutamol (SABA) is first-line for acute relief. Spacer device improves lung deposition in children who cannot use a dry powder inhaler.', frequency: 'PRN (mild); every 20 min (acute)' },
      { id: 'i-paeds-asthma-2', category: 'dependent', action: 'Administer preventer: inhaled corticosteroid (ICS) — beclometasone 100–200 mcg BD or fluticasone 50–100 mcg BD. Step up/down per GINA/BNF-c guidelines.', rationale: 'ICS is the cornerstone of preventer therapy, reducing airway inflammation and exacerbation frequency by 40–50%.', frequency: 'Twice daily (preventer)' },
      { id: 'i-paeds-asthma-3', category: 'independent', action: 'Teach and assess inhaler technique: MDI + spacer with mask (under 4 years) or mouthpiece (≥ 4 years). Hold breath 10 seconds or 6 tidal breaths.', rationale: 'Up to 80% of children use inhalers incorrectly. Spacer with mask is essential for preschool children.', frequency: 'Every visit' },
      { id: 'i-paeds-asthma-4', category: 'independent', action: 'Develop a written Asthma Action Plan with parent: Green (well), Yellow (worsening), Red (emergency). Include specific medication doses for each zone.', rationale: 'Written action plans reduce hospitalisations and emergency visits by up to 40%.', frequency: 'At diagnosis and reviewed every visit' },
      { id: 'i-paeds-asthma-5', category: 'independent', action: 'Educate parents on trigger avoidance: no smoking in the home, dust mite reduction (mattress covers, hot wash bedding), avoid pet dander if sensitised.', rationale: 'Trigger avoidance reduces symptom frequency and medication requirements.', frequency: 'At every clinic visit' },
    ],
    evaluation: [
      { id: 'e-paeds-asthma-1', expected: 'SpO2 ≥ 94%. Wheezing resolved. Child comfortable and active.', status: 'met' },
      { id: 'e-paeds-asthma-2', expected: 'Parent demonstrates correct inhaler technique and can explain the asthma action plan.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Asthma Management for Parents',
        keyPoints: [
          'Asthma cannot be cured but can be well controlled with daily preventer medication.',
          'Give the preventer inhaler every day, even when your child feels well.',
          'The reliever inhaler (blue) is for symptoms only — if needed more than 2×/week, see the doctor.',
          'Learn the traffic-light action plan: Green = well, Yellow = worsening, Red = emergency.',
          'Keep a peak flow diary if your child is old enough.',
        ],
        method: 'Verbal + written action plan + demonstration',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Preventer and reliever prescriptions with clear dosing',
        'Written Asthma Action Plan provided and understood',
        'Inhaler technique demonstrated and assessed',
        'Spacer device provided (with mask if < 4 years)',
        'Trigger avoidance advice provided',
        'Follow-up scheduled within 2–4 weeks',
      ],
      followUp: 'Paediatric respiratory clinic or GP within 2–4 weeks. Review every 3–6 months. Spirometry at school age. Step-up or step-down therapy as needed.',
      referrals: ['Paediatric Respiratory', 'Asthma Nurse Specialist', 'Allergist (if severe/uncontrolled)', 'School health service'],
      warningSigns: [
        'Reliever needed more than 2 times per week',
        'Night-time cough waking the child',
        'Difficulty speaking in full sentences',
        'Blue lips or fingernails',
        'Reliever not helping within 15 minutes',
      ],
    },
    complications: ['Status asthmaticus', 'Pneumothorax', 'Respiratory failure', 'Hospital admission', 'Impaired quality of life', 'Growth suppression from high-dose ICS (rare)'],
  },

  'Malnutrition': {
    id: 'cp-malnutrition',
    disease: 'Malnutrition',
    specialty: 'Paediatric Care',
    overview: 'Malnutrition in children encompasses undernutrition (stunting, wasting, underweight), micronutrient deficiencies, and in older children, overnutrition. Severe acute malnutrition (SAM) is a medical emergency with high mortality. Kenya has a high burden of childhood malnutrition, particularly in arid and semi-arid regions.',
    pathophysiology: 'Inadequate nutrient intake or absorption → catabolism of fat and muscle stores → impaired immune function → increased infection risk → further anorexia and malabsorption (vicious cycle). SAM leads to oedematous (kwashiorkor) or marasmic presentations.',
    commonCauses: ['Inadequate dietary intake (poverty, food insecurity)', 'Repeated infections (diarrhoea, pneumonia, malaria)', 'Malabsorption (coeliac disease, parasites)', 'Chronic disease (HIV,TB, cardiac disease)', 'Poor feeding practices (early cessation of breastfeeding, inappropriate complementary feeding)'],
    riskFactors: ['Poverty and food insecurity', 'HIV-positive mother/child', 'Low birth weight', 'Exclusive breastfeeding < 6 months', 'Poor sanitation and water', 'Maternal malnutrition', 'Lack of breast-feeding knowledge'],
    subjectiveData: [
      'Weight loss or failure to gain weight',
      'Reduced appetite, poor feeding',
      'Lethargy, irritability',
      'Delayed developmental milestones',
      'Recurrent infections',
      'Mother reports poor dietary intake',
    ],
    objectiveData: [
      'Weight-for-age Z-score < -2 (underweight)',
      'Height-for-age Z-score < -2 (stunting)',
      'Weight-for-height Z-score < -2 (wasting) or < -3 (SAM)',
      'Bilateral pitting oedema (kwashiorkor)',
      'Visible wasting of muscles, loss of subcutaneous fat',
      'Thin, dry, flaky skin; sparse, depigmented hair',
      'Moon face, distended abdomen (kwashiorkor)',
      'MUAC < 11.5 cm (6–59 months) = SAM',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-malnutrition-1',
        diagnosis: 'Imbalanced Nutrition: Less Than Body Requirements related to inadequate nutrient intake and/or absorption as evidenced by weight loss and low MUAC',
        relatedFactors: ['Inadequate dietary intake', 'Infections', 'Poverty', 'Poor feeding practices'],
        definingCharacteristics: ['Weight loss', 'Low MUAC', 'Visible wasting', 'Oedema'],
      },
      {
        id: 'nd-malnutrition-2',
        diagnosis: 'Risk for Infection related to malnutrition-induced immune suppression',
        definingCharacteristics: ['Lymphopenia', 'Impaired skin integrity', 'Recurrent infections'],
      },
    ],
    goals: [
      {
        id: 'g-malnutrition-1',
        shortTerm: 'Weight gain ≥ 5–10 g/kg/day during inpatient rehabilitation. Oedema resolving. Appetite improving. No active infection.',
        longTerm: 'Weight-for-height Z-score > -2. No oedema. Developmental milestones age-appropriate. Sustainable feeding plan in place.',
      },
    ],
    interventions: [
      { id: 'i-malnutrition-1', category: 'dependent', action: 'Initiate therapeutic feeding per WHO guidelines: F-75 (phase 1, stabilisation) → F-100 (phase 2, rehabilitation) → Ready-to-Use Therapeutic Food (RUTF). Start at 10 mL/kg/hr on day 1, increasing gradually.', rationale: 'Refeeding too quickly can cause refeeding syndrome (hypophosphataemia, hypokalaemia, fluid overload). Gradual escalation is life-saving.', frequency: 'Every 2–3 hours (F-75); 3 meals + 1 snack (RUTF)' },
      { id: 'i-malnutrition-2', category: 'independent', action: 'Monitor for refeeding syndrome: electrolytes (K+, PO4, Mg2+) daily for first 3 days, then twice weekly. Supplement thiamine before starting feeds.', rationale: 'Refeeding syndrome occurs in malnourished patients when feeding is restarted — it can cause cardiac arrhythmias and death.', frequency: 'Daily (electrolytes); once (thiamine)' },
      { id: 'i-malnutrition-3', category: 'dependent', action: 'Treat concurrent infections: empirical antibiotics per WHO (amoxicillin + gentamicin for SAM with complications). Treat dehydration cautiously (reduced volume, slower rate).', rationale: 'Infections are the leading cause of death in SAM. Treat aggressively but fluid overload is a risk.', frequency: 'As prescribed' },
      { id: 'i-malnutrition-4', category: 'independent', action: 'Provide warmth (hypothermia prevention). Skin-to-skin contact (kangaroo mother care if infant). Monitor temperature 4-hourly.', rationale: 'Hypothermia is a common and dangerous complication of malnutrition. Maintaining体温 is critical.', frequency: 'Every 4 hours' },
      { id: 'i-malnutrition-5', category: 'independent', action: 'Growth monitoring: daily weight, weekly MUAC, weekly length/height. Plot on Road-to-Health chart. Track weight gain velocity.', rationale: 'Growth monitoring is the primary measure of treatment response and guides feeding adjustments.', frequency: 'Daily (weight); weekly (MUAC, length)' },
      { id: 'i-malnutrition-6', category: 'independent', action: 'Stimulate development: encourage play, interaction, and age-appropriate activities. Refer to early childhood development programme.', rationale: 'Malnutrition impairs brain development. Early stimulation supports cognitive and motor recovery.', frequency: 'Daily' },
    ],
    evaluation: [
      { id: 'e-malnutrition-1', expected: 'Weight gain ≥ 5–10 g/kg/day. Oedema resolved. Appetite returning.', status: 'met' },
      { id: 'e-malnutrition-2', expected: 'No active infection. Temperature stable. Electrolytes normal.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Feeding and Nutrition',
        keyPoints: [
          'Continue breastfeeding — it is the best food for your child.',
          'Give small, frequent meals. A malnourished child\'s stomach is small.',
          'RUTF (Plumpy\'Nut) is a high-energy paste — give as prescribed.',
          'Wash hands before preparing food and before feeding.',
          'Do not give herbal remedies for feeding — they can be harmful.',
        ],
        method: 'Verbal + demonstration + caregiver practice',
      },
    ],
    dischargePlanning: {
      checklist: [
        'RUTF supply for home-based therapeutic feeding (≥ 1 month)',
        'Growth monitoring appointment scheduled (within 1 week)',
        'Mothers\' support group or community health volunteer linked',
        'Vaccinations up to date',
        'Deworming given (if > 12 months)',
        'Safe water and sanitation advice provided',
      ],
      followUp: 'Community health volunteer (weekly MUAC check). Outpatient therapeutic programme (weekly weight). Hospital review if no weight gain after 2 weeks.',
      referrals: ['Community Health Volunteer', 'Mothers\' Support Group', 'WASH Programme', 'HIV Testing (if not done)', 'Early Childhood Development'],
      warningSigns: [
        'Child stops eating or drinking',
        'Fever or cough worsening',
        'Watery stools increasing',
        'Lethargy or inability to suck/drink',
        'New oedema developing',
        'No weight gain after 2 weeks of treatment',
      ],
    },
    complications: ['Hypothermia', 'Hypoglycaemia', 'Refeeding syndrome', 'Dehydration', 'Infections (pneumonia, UTI, sepsis)', 'Death (mortality 3–40% for SAM depending on setting)'],
  },

  // ═══════════════════════════════════════════════════════════════
  // GERIATRIC
  // ═══════════════════════════════════════════════════════════════

  'Dementia': {
    id: 'cp-dementia',
    disease: 'Dementia',
    specialty: 'Geriatric Care',
    overview: 'Dementia is a progressive syndrome of cognitive decline that interferes with daily functioning. Alzheimer\'s disease (60–70%) and vascular dementia (20–30%) are the most common types. Management focuses on maintaining function, managing behavioural symptoms, and supporting caregivers.',
    pathophysiology: 'Alzheimer\'s: amyloid-beta plaques and tau neurofibrillary tangles → neuronal loss → brain atrophy (hippocampus first). Vascular: cerebrovascular disease → stepwise cognitive decline. Both lead to progressive loss of memory, executive function, language, and behaviour regulation.',
    commonCauses: ['Alzheimer\'s disease (60–70%)', 'Vascular dementia (20–30%)', 'Dementia with Lewy bodies', 'Frontotemporal dementia', 'Mixed dementia', 'Reversible causes: B12 deficiency, hypothyroidism, normal pressure hydrocephalus'],
    riskFactors: ['Advanced age (> 65)', 'Low education level', 'Cardiovascular risk factors (hypertension, diabetes, smoking)', 'Family history of dementia', 'Depression', 'Social isolation', 'Hearing loss'],
    subjectiveData: [
      'Progressive memory loss (especially recent events)',
      'Difficulty with familiar tasks (cooking, managing finances)',
      'Word-finding difficulties',
      'Confusion about time and place',
      'Personality or behavioural changes',
      'Wandering, agitation, aggression',
      'Caregiver reports of functional decline',
    ],
    objectiveData: [
      'MMSE < 24 / MoCA < 26 (cognitive impairment)',
      'Disoriented to time, place, or person',
      'Impaired recall (3-word test failure)',
      'Apraxia, agnosia, executive dysfunction',
      'Behavioural disturbances: agitation, wandering, sundowning',
      'Functional decline in ADLs and IADLs',
      'CT/MRI: cortical atrophy, ventricular enlargement (Alzheimer\'s)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-dementia-1',
        diagnosis: 'Chronic Confusion related to progressive cognitive decline as evidenced by disorientation and impaired memory',
        relatedFactors: ['Neurodegenerative process', 'Neuronal loss', 'Cerebrovascular disease'],
        definingCharacteristics: ['Disorientation', 'Memory impairment', 'Difficulty with familiar tasks', 'Impaired judgement'],
      },
      {
        id: 'nd-dementia-2',
        diagnosis: 'Risk for Injury related to wandering, impaired judgement, and disorientation',
        definingCharacteristics: ['Wandering', 'Falls', 'Inability to recognise hazards', 'Leaving home unsupervised'],
      },
      {
        id: 'nd-dementia-3',
        diagnosis: 'Caregiver Role Strain related to progressive nature of disease and increasing care demands',
        definingCharacteristics: ['Caregiver exhaustion', 'Social isolation', 'Emotional distress'],
      },
    ],
    goals: [
      {
        id: 'g-dementia-1',
        shortTerm: 'Patient safe from injury. Behavioural symptoms managed without resorting to restraint. Caregiver coping strategies identified.',
        longTerm: 'Maintenance of remaining function for as long as possible. Safe living environment established. Caregiver supported and connected to services.',
      },
    ],
    interventions: [
      { id: 'i-dementia-1', category: 'independent', action: 'Provide structured daily routine: same wake time, meals, activities, bedtime. Use visual schedules and calendars. Keep familiar objects in the environment.', rationale: 'Routine and familiarity reduce confusion and anxiety. Environmental consistency provides safety and orientation.', frequency: 'Daily' },
      { id: 'i-dementia-2', category: 'dependent', action: 'Administer cholinesterase inhibitors (donepezil 5–10 mg, rivastigmine, galantamine) for mild-moderate Alzheimer\'s. Memantine 10–20 mg for moderate-severe.', rationale: 'Cholinesterase inhibitors modestly improve cognitive function and delay functional decline. Memantine has a different mechanism (NMDA antagonist).', frequency: 'Once daily (donepezil); twice daily (memantine)' },
      { id: 'i-dementia-3', category: 'independent', action: 'Use non-pharmacological strategies for behavioural symptoms: music therapy, reminiscence, redirection, calming environment. Avoid physical/chemical restraint.', rationale: 'Non-drug approaches are first-line for behavioural symptoms. Restraints increase confusion, falls, and mortality.', frequency: 'As needed' },
      { id: 'i-dementia-4', category: 'independent', action: 'Fall prevention: remove hazards (rugs, clutter), adequate lighting, bed rails down, non-slip footwear, call bell within reach. Assess fall risk using validated tool.', rationale: 'Dementia patients have 2–3× higher fall risk. Falls cause fractures, head injuries, and loss of independence.', frequency: 'Ongoing' },
      { id: 'i-dementia-5', category: 'independent', action: 'Support caregiver: educate about disease progression, provide respite care information, connect to Alzheimer\'s support groups, screen for caregiver depression.', rationale: 'Caregiver burnout is common and leads to poorer patient outcomes. Support services reduce institutionalisation.', frequency: 'Weekly' },
      { id: 'i-dementia-6', category: 'independent', action: 'Manage nutrition: offer finger foods for late-stage patients, maintain pleasant mealtime atmosphere, monitor weight monthly, assess swallowing if weight loss > 5%.', rationale: 'Dysphagia and weight loss are common in advanced dementia. Nutritional support maintains quality of life.', frequency: 'Every meal' },
    ],
    evaluation: [
      { id: 'e-dementia-1', expected: 'No falls or injuries. Patient safe in structured environment.', status: 'met' },
      { id: 'e-dementia-2', expected: 'Behavioural symptoms managed without restraint. Caregiver reports reduced stress.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Living with Dementia',
        keyPoints: [
          'Dementia is progressive, but good care can maintain quality of life.',
          'Keep a daily routine — it reduces confusion and anxiety.',
          'Safety-proof the home: remove trip hazards, install grab bars, keep doors locked.',
          'Label rooms and use visual cues to help with orientation.',
          'Join a support group — you are not alone.',
        ],
        method: 'Verbal + written + caregiver session',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Medications prescribed with clear instructions for caregiver',
        'Home safety assessment completed',
        'Caregiver education and support plan in place',
        'Alzheimer\'s/dementia support group details provided',
        'Power of attorney / advance directive discussed',
        'Follow-up with memory clinic or GP',
      ],
      followUp: 'Memory clinic or GP every 3–6 months. Repeat cognitive assessment annually. Review medications quarterly. Caregiver assessment at each visit.',
      referrals: ['Memory Clinic', 'Social Work', 'Occupational Therapy (home assessment)', 'Alzheimer\'s Kenya', 'Respite Care', 'Palliative Care (advanced stage)'],
      warningSigns: [
        'Sudden worsening of confusion (may indicate infection, dehydration, medication issue)',
        'Falls or injuries',
        'Refusal to eat or drink',
        'Severe agitation or aggression',
        'Caregiver crisis (burnout, abuse risk)',
      ],
    },
    complications: ['Aspiration pneumonia', 'Pressure ulcers', 'Falls and fractures', 'Malnutrition', 'Urinary incontinence', 'Caregiver depression', 'Premature institutionalisation', 'Death'],
  },

  'Falls': {
    id: 'cp-falls',
    disease: 'Falls',
    specialty: 'Geriatric Care',
    overview: 'Falls are the leading cause of injury-related morbidity and mortality in older adults. A single fall can result in fractures (especially hip), head injury, loss of independence, fear of falling, and institutionalisation. Falls are multifactorial — 30% of community-dwelling and 50% of institutionalised older adults fall annually.',
    pathophysiology: 'Falls result from the interaction of intrinsic factors (muscle weakness, visual impairment, postural hypotension, polypharmacy, cognitive impairment) and extrinsic factors (wet floors, poor lighting, inappropriate footwear). The consequence spectrum ranges from no injury to hip fracture, head injury, or death.',
    commonCauses: ['Muscle weakness and deconditioning', 'Postural hypotension', 'Visual impairment', 'Polypharmacy (≥ 4 medications)', 'Cognitive impairment', 'Environmental hazards', 'Gait and balance disorders', 'Foot problems'],
    riskFactors: ['Age > 65', 'History of previous falls', 'Polypharmacy (especially sedatives, antihypertensives)', 'Visual impairment', 'Cognitive impairment', 'Muscle weakness', 'Postural hypotension', 'Urinary incontinence', 'Depression'],
    subjectiveData: [
      'History of falls (number, circumstances, injuries)',
      'Dizziness or lightheadedness on standing',
      'Difficulty walking or maintaining balance',
      'Visual changes',
      'Fear of falling',
      'Taking ≥ 4 medications (especially sedatives, antihypertensives)',
    ],
    objectiveData: [
      'Positive Timed Up and Go test (> 12 seconds)',
      'Impaired balance on Romberg or Tinetti assessment',
      'Postural hypotension (> 20 mmHg systolic drop)',
      'Muscle weakness (MRC grading < 4/5)',
      'Visual acuity impairment',
      'Appropriate footwear not being used',
      'Environmental hazards present (rugs, poor lighting)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-falls-1',
        diagnosis: 'Risk for Falls related to age-related physiological changes, polypharmacy, and environmental hazards',
        definingCharacteristics: ['History of falls', 'Impaired balance', 'Muscle weakness', 'Postural hypotension'],
      },
      {
        id: 'nd-falls-2',
        diagnosis: 'Fear of Falling related to previous fall experience as evidenced by activity restriction and anxiety',
        definingCharacteristics: ['Avoidance of activities', 'Anxiety about walking', 'Reluctance to leave home'],
      },
    ],
    goals: [
      {
        id: 'g-falls-1',
        shortTerm: 'Patient identified as high/low fall risk. Modifiable risk factors addressed. Safe environment established.',
        longTerm: 'No further falls during admission or within 6 months of discharge. Patient demonstrates safe mobility techniques. Fear of falling reduced.',
      },
    ],
    interventions: [
      { id: 'i-falls-1', category: 'independent', action: 'Conduct fall risk assessment on admission (Morse Fall Scale, STRATIFY, or Tinetti). Reassess weekly and after any fall.', rationale: 'Validated fall risk tools identify high-risk patients and guide targeted interventions.', frequency: 'On admission, weekly, and post-fall' },
      { id: 'i-falls-2', category: 'independent', action: 'Medication review: identify and minimise fall-risk drugs (sedatives, antihypertensives, anticholinergics, opioids). Recommend dose reduction or discontinuation where safe.', rationale: 'Polypharmacy is a major modifiable risk factor. Sedatives increase fall risk by 40–60%.', frequency: 'On admission and with any medication change' },
      { id: 'i-falls-3', category: 'independent', action: 'Implement environmental safety measures: non-slip footwear, night lights, grab bars in bathroom, remove loose rugs, keep pathways clear, bed at lowest height.', rationale: 'Environmental modification reduces fall risk by 20–30%. Simple measures are highly effective.', frequency: 'Ongoing' },
      { id: 'i-falls-4', category: 'independent', action: 'Encourage and assist with mobility and strength exercises: sit-to-stand, heel raises, walking aid assessment. Physiotherapy referral.', rationale: 'Progressive resistance exercise reduces falls by 20–30% in older adults. Muscle strength is the strongest modifiable predictor.', frequency: 'Daily' },
      { id: 'i-falls-5', category: 'dependent', action: 'Correct postural hypotension: adequate hydration, compression stockings, gradual position changes, review antihypertensives.', rationale: 'Postural hypotension causes 20–30% of falls in older adults.', frequency: 'Ongoing' },
      { id: 'i-falls-6', category: 'independent', action: 'Address fear of falling: graded exposure to activity, balance confidence training, cognitive behavioural strategies, encouragement.', rationale: 'Fear of falling leads to self-imposed activity restriction → deconditioning → increased fall risk (vicious cycle).', frequency: 'Daily' },
    ],
    evaluation: [
      { id: 'e-falls-1', expected: 'No falls during admission. Environment assessed and hazards removed. Medications optimised.', status: 'met' },
      { id: 'e-falls-2', expected: 'Patient demonstrates safe mobility techniques. Fear of falling reduced. Exercise programme in place.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Fall Prevention',
        keyPoints: [
          'Always wear well-fitting, non-slip footwear — not loose slippers or bare feet.',
          'Use night lights. Get up slowly from bed or chair — sit for 1 minute first.',
          'Remove loose rugs, clutter, and tripping hazards from your home.',
          'Keep frequently used items within easy reach.',
          'Tell your doctor if you feel dizzy or unsteady — many medications can be adjusted.',
          'Exercise regularly — even gentle walking and standing exercises help.',
        ],
        method: 'Verbal + written + home assessment',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Fall risk assessment documented and communicated to GP',
        'Medications reviewed and fall-risk drugs reduced/stopped',
        'Home safety assessment completed (or referred to OT)',
        'Walking aid provided and demonstrated (if needed)',
        'Exercise programme initiated',
        'Follow-up falls clinic appointment scheduled',
        'Emergency call system considered (pendant alarm)',
      ],
      followUp: 'Falls clinic or GP within 2–4 weeks. Repeat fall risk assessment at 1 and 3 months. Physiotherapy review at 4 weeks. Occupational therapy home visit if high risk.',
      referrals: ['Physiotherapy', 'Occupational Therapy', 'Falls Clinic', 'Optometry (visual assessment)', 'Podiatry (foot care)'],
      warningSigns: [
        'Dizziness or lightheadedness on standing',
        'New unsteadiness or difficulty walking',
        'Pain in joints or back limiting mobility',
        'Vision changes',
        'Feeling faint or losing consciousness',
      ],
    },
    complications: ['Hip fracture (30% of fall-related injuries)', 'Head injury / subdural haematoma', 'Soft tissue injuries', 'Loss of independence', 'Institutionalisation', 'Prolonged hospital stay', 'Mortality (hip fracture: 20–30% 1-year mortality in frail elderly)'],
  },

  // ═══════════════════════════════════════════════════════════════
  // DERMATOLOGY
  // ═══════════════════════════════════════════════════════════════

  'Eczema': {
    id: 'cp-eczema',
    disease: 'Eczema',
    specialty: 'Dermatology Care',
    overview: 'Eczema (atopic dermatitis) is a chronic, relapsing inflammatory skin condition characterised by dry, itchy, erythematous skin with papules, vesicles, and lichenification. It affects 10–20% of children and 3–7% of adults, significantly impacting quality of life.',
    pathophysiology: 'Genetic barrier dysfunction (filaggrin mutations) → impaired skin barrier → transepidermal water loss → dry skin → allergen/pathogen penetration → Th2-mediated immune activation → inflammation → pruritus → scratching → further barrier damage (itch-scratch cycle).',
    commonCauses: ['Genetic predisposition (filaggrin mutations)', 'Allergens (dust mites, food in children)', 'Irritants (soaps, detergents, wool)', 'Dry skin / low humidity', 'Stress', 'Infection (S. aureus)'],
    riskFactors: ['Personal or family history of atopy (asthma, allergic rhinitis)', 'Low socioeconomic status', 'Urban living', 'Low humidity climate', 'Occupational exposure to irritants'],
    subjectiveData: [
      'Intense pruritus (often worse at night)',
      'Dry, scaly skin',
      'Burning or stinging on application of emollients',
      'Sleep disturbance due to itching',
      'Social and psychological impact',
    ],
    objectiveData: [
      'Dry, erythematous, scaly plaques',
      'Papules, vesicles, oozing in acute flares',
      'Lichenification (thickened skin) in chronic areas',
      'Distribution: flexural (elbows, knees, neck) in adults; extensor (knees, elbows) in infants',
      'Excoriation marks from scratching',
      'Secondary infection: honey-coloured crusting (impetiginisation)',
      'Positive skin prick tests or elevated IgE (atopic individuals)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-eczema-1',
        diagnosis: 'Impaired Skin Integrity related to inflammatory process and scratching as evidenced by erythema, scaling, and excoriation',
        relatedFactors: ['Barrier dysfunction', 'Th2-mediated inflammation', 'Scratching'],
        definingCharacteristics: ['Erythema', 'Scaling', 'Excoriation', 'Lichenification'],
      },
      {
        id: 'nd-eczema-2',
        diagnosis: 'Disturbed Sleep Pattern related to nocturnal pruritus',
        definingCharacteristics: ['Sleep disruption', 'Night-time scratching', 'Fatigue'],
      },
    ],
    goals: [
      {
        id: 'g-eczema-1',
        shortTerm: 'Pruritus controlled to tolerable level. Skin barrier improved (reduced dryness and erythema). Sleep not disrupted.',
        longTerm: 'Flare-free periods maintained for ≥ 3 months. Emollient and treatment regimen established. Patient/family self-managing.',
      },
    ],
    interventions: [
      { id: 'i-eczema-1', category: 'independent', action: 'Emollient therapy: liberal application of emollient (white soft paraffin, Cetraben, Diprobase) at least twice daily and within 3 minutes of bathing ("soak and seal").', rationale: 'Emollients restore the skin barrier, reduce water loss, and decrease flares by 50%. Must be applied generously and consistently.', frequency: 'At least twice daily' },
      { id: 'i-eczema-2', category: 'dependent', action: 'Administer topical corticosteroids (TCS) during flares: mild (hydrocortisone 1%) for face/folds, moderate (betamethasone valerate 0.1%) for body, potent (clobetasol) for thickened areas. Apply once daily for 7–14 days.', rationale: 'TCS are first-line anti-inflammatory treatment. Potency should match severity and body site. Short courses prevent skin atrophy.', frequency: 'Once daily during flares' },
      { id: 'i-eczema-3', category: 'independent', action: 'Teach emollient technique: apply in direction of hair growth, avoid broken skin, use separate pot for each family member to prevent infection.', rationale: 'Correct technique maximises effectiveness and prevents infection from shared containers.', frequency: 'At every consultation' },
      { id: 'i-eczema-4', category: 'independent', action: 'Identify and avoid triggers: recommend fragrance-free products, soft cotton clothing, avoid wool, use mild soap substitutes, lukewarm baths.', rationale: 'Trigger avoidance reduces flare frequency and medication requirements.', frequency: 'Ongoing' },
      { id: 'i-eczema-5', category: 'dependent', action: 'For moderate-severe eczema unresponsive to TCS: consider second-line agents — tacrolimus/pimecrolimus (calcineurin inhibitors), dupilumab (anti-IL-4/IL-13) for adults.', rationale: 'Steroid-sparing agents are useful for sensitive areas (face, eyelids) and chronic disease.', frequency: 'As prescribed' },
      { id: 'i-eczema-6', category: 'independent', action: 'Manage secondary infection: if signs of bacterial infection (honey crusting, weeping), add topical mupirocin or oral flucloxacillin/emmetrazine.', rationale: 'S. aureus colonisation/infection occurs in 90% of eczema flares and worsens inflammation.', frequency: 'As needed' },
    ],
    evaluation: [
      { id: 'e-eczema-1', expected: 'Pruritus reduced. Skin smoother, less erythematous. Sleep quality improved.', status: 'met' },
      { id: 'e-eczema-2', expected: 'Patient/family demonstrates correct emollient and TCS application technique.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Eczema Self-Management',
        keyPoints: [
          'Emollients are the most important treatment — apply every day, even when skin looks clear.',
          'Use the "soak and seal" method: bath in lukewarm water, pat dry gently, apply emollient within 3 minutes.',
          'Topical steroids are safe when used correctly — they are not "strong" steroids for the body.',
          'Avoid triggers: fragranced products, wool, harsh soaps, overheating.',
          'Keep fingernails short to reduce scratching damage.',
        ],
        method: 'Verbal + written + demonstration',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Emollient prescribed in adequate quantity (500 g/week for adults)',
        'Topical steroid prescribed with clear instructions on potency and duration',
        'Written eczema action plan provided',
        'Trigger avoidance advice documented',
        'Follow-up scheduled in 2–4 weeks (or sooner if flaring)',
      ],
      followUp: 'Dermatology or GP within 2–4 weeks. Review and step down TCS. Referral to eczema nurse specialist if available. Patch testing if contact allergy suspected.',
      referrals: ['Dermatology', 'Eczema Nurse Specialist', 'Allergy Clinic (if food allergy suspected)', 'Psychology (if significant QoL impact)'],
      warningSigns: [
        'Signs of infection (oozing, yellow crusts, fever, increasing redness)',
        'Eczema not improving despite treatment',
        'Steroid phobia leading to non-compliance',
        'Significant impact on sleep, school, or work',
        'Widespread red, hot, painful skin (erythroderma — seek emergency care)',
      ],
    },
    complications: ['Secondary bacterial infection (impetigo)', 'Eczema herpeticum (HSV — emergency)', 'Sleep disturbance', 'Psychological impact (anxiety, depression)', 'Skin lichenification', 'Erythroderma (rare, life-threatening)'],
  },

  'Psoriasis': {
    id: 'cp-psoriasis',
    disease: 'Psoriasis',
    specialty: 'Dermatology Care',
    overview: 'Psoriasis is a chronic, immune-mediated inflammatory skin disease characterised by well-demarcated, erythematous plaques with silvery scales. It affects 2–3% of the global population and is associated with psoriatic arthritis, cardiovascular disease, and significant psychosocial burden.',
    pathophysiology: 'T-cell-mediated autoimmune disease → IL-23/IL-17 axis activation → keratinocyte hyperproliferation (turnover accelerated from 28 to 3–4 days) → accumulation of immature keratinocytes → thick, scaly plaques. Genetically influenced (HLA-Cw6) and triggered by environmental factors.',
    commonCauses: ['Genetic predisposition (HLA-Cw6)', 'Stress', 'Infection (streptococcal pharyngitis → guttate psoriasis)', 'Skin trauma (Koebner phenomenon)', 'Certain medications (lithium, beta-blockers, antimalarials)', 'Alcohol', 'Smoking'],
    riskFactors: ['Family history (30% have affected relative)', 'HIV infection', 'Obesity', 'Smoking', 'Stress', 'Northern European descent (higher prevalence)'],
    subjectiveData: [
      'Visible plaques on elbows, knees, scalp, trunk',
      'Pruritus (mild to severe)',
      'Pain or soreness of plaques',
      'Emotional distress, embarrassment',
      'Joint pain (psoriatic arthritis in 30%)',
      'Nail changes (pitting, discolouration)',
    ],
    objectiveData: [
      'Well-demarcated, erythematous plaques with silvery-white scales',
      'Classic distribution: extensor surfaces (elbows, knees), scalp, lumbosacral area',
      'Auspitz sign (pinpoint bleeding on scale removal)',
      'Nail changes: pitting, onycholysis, oil-drop sign',
      'Koebner phenomenon (new lesions at trauma sites)',
      'Erythrodermic psoriasis (rare, severe — generalised redness)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-psoriasis-1',
        diagnosis: 'Impaired Skin Integrity related to autoimmune-mediated keratinocyte hyperproliferation as evidenced by scaly plaques',
        relatedFactors: ['T-cell mediated inflammation', 'Keratinocyte hyperproliferation', 'Impaired skin barrier'],
        definingCharacteristics: ['Erythematous plaques', 'Silvery scales', 'Pruritus', 'Skin cracking/bleeding'],
      },
      {
        id: 'nd-psoriasis-2',
        diagnosis: 'Disturbed Body Image related to visible skin lesions as evidenced by social withdrawal and verbal expression of embarrassment',
        definingCharacteristics: ['Social avoidance', 'Covering skin', 'Low self-esteem', 'Depression symptoms'],
      },
    ],
    goals: [
      {
        id: 'g-psoriasis-1',
        shortTerm: 'Plaques softened and reduced in thickness. Pruritus controlled. Patient comfortable and able to apply treatments independently.',
        longTerm: 'PASI 75 response (75% improvement) maintained. Quality of life improved. No progression to psoriatic arthritis.',
      },
    ],
    interventions: [
      { id: 'i-psoriasis-1', category: 'independent', action: 'Emollient therapy: apply liberally twice daily to hydrate plaques and reduce scaling. Urea-based or salicylic acid-based emollients for thick plaques.', rationale: 'Emollients soften scales, reduce itching, and enhance penetration of topical treatments.', frequency: 'Twice daily' },
      { id: 'i-psoriasis-2', category: 'dependent', action: 'Administer topical treatments: corticosteroids (calcipotriol + betamethasone combination first-line), vitamin D analogues (calcipotriol), coal tar preparations. Rotate to avoid tachyphylaxis.', rationale: 'Combination topical therapy is more effective than monotherapy. Steroid-sparing agents prevent skin atrophy.', frequency: 'Once to twice daily as prescribed' },
      { id: 'i-psoriasis-3', category: 'independent', action: 'Scalp psoriasis management: medicated shampoos (coal tar, selenium sulphide, ketoconazole), topical solutions (clobetasol solution, calcipotriol solution).', rationale: 'Scalp psoriasis is the most common site and often most distressing to patients.', frequency: '2–3 times per week (shampoo); daily (solution)' },
      { id: 'i-psoriasis-4', category: 'collaborative', action: 'For moderate-severe psoriasis (PASI > 10): refer for phototherapy (UVB) or systemic therapy (methotrexate, ciclosporin, acitretin, biologics).', rationale: 'Systemic therapy is needed when topical treatment fails or psoriasis significantly impacts quality of life.', frequency: 'As referred' },
      { id: 'i-psoriasis-5', category: 'independent', action: 'Screen for psoriatic arthritis: ask about joint pain, stiffness (especially morning), dactylitis, nail changes. Refer to rheumatology if suspected.', rationale: 'Psoriatic arthritis affects 30% of psoriasis patients and requires early treatment to prevent joint destruction.', frequency: 'Every visit' },
      { id: 'i-psoriasis-6', category: 'independent', action: 'Provide psychological support: acknowledge visible nature of disease, address stigma, screen for depression/anxiety, provide support group information.', rationale: 'Psoriasis has a profound psychosocial impact — depression rates are 2× higher than general population.', frequency: 'Every visit' },
    ],
    evaluation: [
      { id: 'e-psoriasis-1', expected: 'Plaques reduced in thickness and extent. Pruritus controlled. Skin smoother.', status: 'met' },
      { id: 'e-psoriasis-2', expected: 'Patient applies treatments correctly. Reports improved quality of life and reduced embarrassment.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Psoriasis Self-Management',
        keyPoints: [
          'Psoriasis is a chronic condition — it cannot be cured but can be well controlled.',
          'Emollients are essential — use them every day even when plaques look clear.',
          'Apply topical treatments as directed, not "as needed".',
          'Identify and manage your personal triggers (stress, infection, skin injury).',
          'Avoid picking scales — this worsens plaques (Koebner phenomenon).',
          'Seek help for emotional wellbeing — psoriasis affects mental health.',
        ],
        method: 'Verbal + written leaflet',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Topical treatments prescribed with clear instructions',
        'Emollient prescribed in adequate quantity',
        'Scalp treatment prescribed if scalp involved',
        'Follow-up scheduled in 6–8 weeks',
        'Phototherapy or systemic referral if moderate-severe',
        'Psoriatic arthritis screening documented',
      ],
      followUp: 'Dermatology every 6–8 weeks initially, then every 3–6 months. PASI scoring at each visit. Rheumatology referral if joint symptoms. Cardiovascular risk assessment annually.',
      referrals: ['Dermatology', 'Rheumatology (if psoriatic arthritis)', 'Psychology', 'Phototherapy Unit', 'Psoriasis Support Group'],
      warningSigns: [
        'Sudden worsening or widespread redness (erythroderma — emergency)',
        'Joint pain, swelling, or stiffness',
        'Skin infection (increased redness, warmth, pus)',
        'Significant emotional distress or depression',
        'New medications that may worsen psoriasis',
      ],
    },
    complications: ['Psoriatic arthritis (30%)', 'Cardiovascular disease', 'Metabolic syndrome', 'Depression and anxiety', 'Erythrodermic psoriasis (emergency)', 'Secondary infection', 'Social isolation'],
  },

  // ═══════════════════════════════════════════════════════════════
  // OPHTHALMOLOGY
  // ═══════════════════════════════════════════════════════════════

  'Glaucoma': {
    id: 'cp-glaucoma',
    disease: 'Glaucoma',
    specialty: 'Ophthalmology Care',
    overview: 'Glaucoma is a progressive optic neuropathy characterised by optic disc cupping and visual field loss, typically associated with elevated intraocular pressure (IOP). It is the second leading cause of blindness worldwide (after cataract) and the leading cause of irreversible blindness. Open-angle glaucoma (OAG) accounts for 70–80% of cases.',
    pathophysiology: 'Elevated IOP (or normal IOP in normal-tension glaucoma) → mechanical compression and ischaemia of the optic nerve head → retinal ganglion cell death → progressive, irreversible visual field loss starting peripherally. Angle-closure glaucoma involves physical obstruction of the drainage angle.',
    commonCauses: ['Open-angle glaucoma: trabecular meshwork dysfunction → reduced aqueous outflow', 'Angle-closure glaucoma: pupillary block → iris bowed forward → angle closure', 'Secondary: trauma, steroids, uveitis, neovascularisation'],
    riskFactors: ['Age > 40 (OAG)', 'High myopia', 'Family history (4× risk)', 'African descent (higher prevalence, more severe)', 'Diabetes', 'Hypertension', 'Steroid use', 'High IOP', 'Thin central cornea'],
    subjectiveData: [
      'Usually asymptomatic in early OAG (silent thief of sight)',
      'Gradual peripheral vision loss (often unnoticed until advanced)',
      'Tunnel vision in advanced disease',
      'Acute angle-closure: sudden painful red eye, blurred vision, halos around lights, nausea/vomiting',
      'History of family members with glaucoma',
    ],
    objectiveData: [
      'Elevated IOP (> 21 mmHg — though normal-tension glaucoma exists)',
      'Optic disc cupping (cup:disc ratio > 0.6 or asymmetry > 0.2)',
      'Visual field defects: arcuate scotoma, nasal step',
      'Thinned retinal nerve fibre layer on OCT',
      'Shallow anterior chamber (angle-closure)',
      'Corneal oedema, fixed dilated pupil, conjunctival injection (acute attack)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-glaucoma-1',
        diagnosis: 'Sensory/Perceptual Alterations (Visual) related to progressive optic nerve damage as evidenced by visual field loss',
        relatedFactors: ['Elevated IOP', 'Optic nerve ischaemia', 'Retinal ganglion cell death'],
        definingCharacteristics: ['Peripheral vision loss', 'Tunnel vision', 'Difficulty navigating unfamiliar environments'],
      },
      {
        id: 'nd-glaucoma-2',
        diagnosis: 'Risk for Unstable Vital Signs related to acute angle-closure attack (nausea, vomiting, severe pain)',
        definingCharacteristics: ['Nausea', 'Vomiting', 'Severe eye pain', 'Tachycardia'],
      },
    ],
    goals: [
      {
        id: 'g-glaucoma-1',
        shortTerm: 'IOP reduced to target range (typically < 18 mmHg or 30% reduction). Eye pain relieved (angle-closure). Patient tolerating eye drops.',
        longTerm: 'IOP maintained at target. Visual field stable. No further optic nerve deterioration. Patient adherent to lifelong treatment.',
      },
    ],
    interventions: [
      { id: 'i-glaucoma-1', category: 'dependent', action: 'Administer topical hypotensive drops: prostaglandin analogues (latanoprost OD — first-line), beta-blockers (timolol BD), alpha-agonists (brimonidine BD), CAIs (dorzolamide TID).', rationale: 'Topical drops reduce IOP by increasing outflow or decreasing aqueous production. Prostaglandin analogues have best efficacy and adherence (once daily).', frequency: 'As prescribed (1–3 times daily)' },
      { id: 'i-glaucoma-2', category: 'independent', action: 'Teach correct eye drop technique: tilt head back, pull down lower lid, drop into conjunctival sac, close eye for 1–2 minutes, press nasolacrimal duct for 1 minute (to reduce systemic absorption).', rationale: 'Correct technique ensures therapeutic effect. Nasolacrimal compression reduces systemic side effects (especially with beta-blockers).', frequency: 'At every visit' },
      { id: 'i-glaucoma-3', category: 'dependent', action: 'For acute angle-closure: emergency treatment — pilocarpine 2% (constricts pupil), IV acetazolamide 500 mg, topical timolol, prednisolone eye drops. Laser peripheral iridotomy when stable.', rationale: 'Acute angle-closure is an ophthalmic emergency. Rapid IOP reduction prevents permanent optic nerve damage.', frequency: 'Emergency' },
      { id: 'i-glaucoma-4', category: 'independent', action: 'Monitor IOP at each visit. Perform visual field testing every 6–12 months. OCT of RNFL annually.', rationale: 'Regular monitoring detects progression early. Visual field loss is irreversible — early detection is critical.', frequency: 'Per schedule' },
      { id: 'i-glaucoma-5', category: 'independent', action: 'Adherence counselling: emphasise lifelong nature of treatment, asymptomatic early disease, consequences of stopping drops. Use pill Organisers, phone reminders, involve family.', rationale: 'Non-adherence is the leading cause of treatment failure in glaucoma. Up to 50% of patients are non-adherent within 1 year.', frequency: 'Every visit' },
      { id: 'i-glaucoma-6', category: 'independent', action: 'Lifestyle advice: regular exercise (moderate — may lower IOP), avoid head-down positions, limit caffeine, avoid tight clothing around neck, protect eyes from injury.', rationale: 'These measures may modestly reduce IOP and protect the optic nerve.', frequency: 'At discharge and follow-up' },
    ],
    evaluation: [
      { id: 'e-glaucoma-1', expected: 'IOP at target (< 18 mmHg or 30% reduction). Eye drops administered correctly.', status: 'met' },
      { id: 'e-glaucoma-2', expected: 'Visual field stable. Patient adherent to treatment regimen.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Glaucoma — Living with the Condition',
        keyPoints: [
          'Glaucoma has no cure, but treatment prevents further vision loss. Early treatment is essential.',
          'You will need eye drops for life — stopping them allows IOP to rise and vision to worsen.',
          'Put drops in correctly: close your eye and press the corner for 1 minute after each drop.',
          'Have regular eye check-ups — even if your vision feels fine.',
          'Tell your optometrist/ophthalmologist about all your medications (some worsen glaucoma).',
          'Glaucoma can run in families — encourage relatives to get screened.',
        ],
        method: 'Verbal + written leaflet + drop technique demonstration',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Eye drop prescriptions dispensed with clear instructions',
        'Drop technique demonstrated and patient can replicate',
        'Follow-up appointment scheduled (2–4 weeks after initiation)',
        'Visual field and OCT testing scheduled',
        'Medication adherence plan in place',
        'Family screening encouraged',
      ],
      followUp: 'Ophthalmology every 3–6 months initially, then every 6–12 months if stable. IOP check at each visit. Visual field every 6–12 months. OCT annually.',
      referrals: ['Ophthalmology', 'Low Vision Services (if significant field loss)', 'Support Group', 'Optometry (community monitoring)'],
      warningSigns: [
        'Sudden painful red eye with blurred vision (acute attack — emergency)',
        'New visual field defects or difficulty seeing in dim light',
        'Side effects from eye drops (redness, stinging, breathing difficulty with beta-blockers)',
        'Missed appointments or running out of medication',
      ],
    },
    complications: ['Irreversible blindness (if untreated)', 'Visual field progression', 'Surgical failure', 'Cataract (especially after glaucoma surgery)', 'Chronic eye discomfort from drops', 'Psychosocial impact of vision loss'],
  },

  // ═══════════════════════════════════════════════════════════════
  // FUNDAMENTAL NURSING CARE
  // ═══════════════════════════════════════════════════════════════

  'Wound Dressing': {
    id: 'cp-wound-dressing',
    disease: 'Wound Dressing',
    specialty: 'Fundamental Nursing Care',
    overview: 'Wound dressing is a fundamental nursing intervention for surgical wounds, traumatic wounds, pressure injuries, diabetic ulcers, and burns. Proper wound assessment, cleansing, and dressing selection promote healing, prevent infection, and reduce complications. This care plan covers acute and chronic wound management across all settings.',
    pathophysiology: 'Wound healing proceeds through 4 overlapping phases: haemostasis (platelet aggregation, clot formation), inflammation (neutrophil/macrophage recruitment, debris removal), proliferation (granulation tissue, angiogenesis, epithelialisation), and remodelling (collagen reorganisation, scar maturation). Impaired healing occurs with infection, poor nutrition, diabetes, immunosuppression, and inadequate blood supply.',
    commonCauses: ['Surgical incisions', 'Traumatic lacerations', 'Pressure injuries (stage 1–4)', 'Diabetic foot ulcers', 'Venous leg ulcers', 'Burns', 'Abscess drainage sites', 'Amputation stumps'],
    riskFactors: ['Diabetes mellitus', 'Malnutrition (low albumin)', 'Immunosuppression', 'Peripheral vascular disease', 'Obesity', 'Smoking', 'Advanced age', 'Corticosteroid use', 'Moisture-associated skin damage'],
    subjectiveData: [
      'Pain at wound site (severity, character, timing)',
      'Patient report of wound not healing or getting worse',
      'History of wound cause (surgical, traumatic, chronic)',
      'History of diabetes, vascular disease, or immunosuppression',
      'Allergies to dressings or adhesives',
    ],
    objectiveData: [
      'Wound assessment: location, size (length × width × depth), wound bed (granulation, slough, necrotic), edges (undermined, rolled), exudate (serous, sanguineous, purulent, amount)',
      'Signs of infection: erythema, warmth, swelling, pus, malodor, fever',
      'Periwound skin condition: maceration, callus, erythema, dryness',
      'Wound healing progress (measured weekly with ruler or wound tracing)',
      'Nutritional status: albumin, BMI, pre-albumin',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-wound-1',
        diagnosis: 'Impaired Skin Integrity related to surgical incision, trauma, or pressure as evidenced by open wound',
        relatedFactors: ['Surgical intervention', 'Trauma', 'Prolonged pressure', 'Impaired perfusion'],
        definingCharacteristics: ['Open wound', 'Deviated wound edges', 'Exudate present'],
      },
      {
        id: 'nd-wound-2',
        diagnosis: 'Risk for Infection related to open wound and disrupted skin barrier',
        definingCharacteristics: ['Open wound', 'Contamination risk', 'Impaired immune function'],
      },
      {
        id: 'nd-wound-3',
        diagnosis: 'Acute Pain related to tissue damage and wound dressing procedures',
        definingCharacteristics: ['Pain on dressing change', 'Guarding', 'Verbal pain report'],
      },
    ],
    goals: [
      {
        id: 'g-wound-1',
        shortTerm: 'Wound clean with no signs of infection. Pain managed during dressing changes. Correct dressing technique demonstrated.',
        longTerm: 'Wound fully healed (epithelialised). No wound-related complications. Patient/caregiver can perform dressing changes if needed.',
      },
    ],
    interventions: [
      { id: 'i-wound-1', category: 'independent', action: 'Assess wound using structured tool: document size (L × W × D in cm), wound bed (% granulation, slough, necrotic), exudate type and amount, periwound condition, signs of infection. Photograph if possible.', rationale: 'Systematic wound assessment guides dressing selection and monitors healing progress.', frequency: 'At every dressing change' },
      { id: 'i-wound-2', category: 'independent', action: 'Cleanse wound with normal saline (0.9% NaCl) using gentle irrigation or swab technique. Avoid cytotoxic agents (povidone-iodine on granulation tissue, hydrogen peroxide). Clean from centre outward.', rationale: 'Normal saline is isotonic and non-cytotoxic. Aggressive cleaning damages granulation tissue and delays healing.', frequency: 'At every dressing change' },
      { id: 'i-wound-3', category: 'independent', action: 'Select dressing based on wound assessment: hydrocolloid (low-medium exudate, partial thickness), foam (moderate-high exudate), alginate (heavy exudation, cavity wounds), silver (infected or at risk), transparent film (superficial, low exudate).', rationale: 'Dressing selection should match wound characteristics. Wrong dressing can macerate periwound skin or dry out wound bed.', frequency: 'At every dressing change' },
      { id: 'i-wound-4', category: 'independent', action: 'Apply non-touch technique: wash hands, use sterile gloves for open wounds, clean wound, apply dressing, secure with tape or bandage without excessive tension.', rationale: 'Aseptic technique prevents wound infection. Tension-free securing maintains blood flow.', frequency: 'At every dressing change' },
      { id: 'i-wound-5', category: 'dependent', action: 'Administer analgesia 30 minutes before painful dressing changes (paracetamol ± codeine). For chronic wounds, consider topical lidocaine.', rationale: 'Pre-emptive analgesia reduces procedural pain and improves patient cooperation.', frequency: 'Before dressing change' },
      { id: 'i-wound-6', category: 'independent', action: 'Monitor for wound infection signs: increasing pain, erythema > 2 cm from wound edge, purulent exudate, malodor, fever. Obtain wound swab if infection suspected (Levine technique).', rationale: 'Early infection detection allows timely antibiotics and prevents sepsis.', frequency: 'Every dressing change; daily observation' },
      { id: 'i-wound-7', category: 'collaborative', action: 'Optimise nutrition: high-protein diet, vitamin C (500 mg BD), zinc (220 mg OD), adequate calories. Refer to dietitian if albumin < 30 g/L.', rationale: 'Malnutrition is the most common reversible cause of delayed wound healing.', frequency: 'Ongoing' },
    ],
    evaluation: [
      { id: 'e-wound-1', expected: 'Wound clean, no signs of infection. Granulation tissue healthy (red, moist). Exudate reducing.', status: 'met' },
      { id: 'e-wound-2', expected: 'Pain managed (≤ 3/10 during dressing change). Patient/caregiver demonstrates correct technique.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Wound Care at Home',
        keyPoints: [
          'Keep the wound dry and clean between dressing changes.',
          'Wash your hands thoroughly before touching the wound or dressing.',
          'Change dressings as directed — do not leave wet or soiled dressings on.',
          'Watch for signs of infection: increasing redness, swelling, pus, fever, or bad smell.',
          'Eat well — protein, fruits, and vegetables help wounds heal.',
          'Do not apply home remedies (toothpaste, herbs, petrol) to wounds.',
        ],
        method: 'Verbal + written leaflet + demonstration',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Dressing supplies provided (dressings, saline, gloves, tape)',
        'Dressing change schedule documented',
        'Wound care technique demonstrated to patient/caregiver',
        'Follow-up wound clinic appointment scheduled',
        'Nutritional advice provided',
        'Signs of infection reviewed',
      ],
      followUp: 'Wound clinic or GP within 1–2 weeks. Weekly wound assessment until healed. Surgical review if wound dehiscence.',
      referrals: ['Wound Care Nurse Specialist', 'Dietitian', 'Vascular Surgery (if vascular cause)', 'Plastic Surgery (if complex wound)', 'Diabetology (if diabetic wound)'],
      warningSigns: [
        'Increasing pain, redness, or swelling around the wound',
        'Pus or foul-smelling discharge',
        'Fever > 38°C',
        'Wound edges opening (dehiscence)',
        'Bleeding that does not stop with pressure',
        'Black or grey wound bed (necrosis)',
      ],
    },
    complications: ['Surgical site infection (5–10%)', 'Wound dehiscence', 'Evisceration (rare, life-threatening)', 'Chronic non-healing wound', 'Scarring and contractures', 'Sepsis'],
  },

  'Intravenous Therapy': {
    id: 'cp-iv-therapy',
    disease: 'Intravenous Therapy',
    specialty: 'Fundamental Nursing Care',
    overview: 'Intravenous (IV) therapy is the administration of fluids, medications, blood products, and nutrition directly into the venous system via peripheral or central venous access. It is one of the most common hospital interventions and carries risks of phlebitis, infiltration, infection, and fluid overload.',
    pathophysiology: 'IV access bypasses the GI tract for rapid onset of action. Peripheral IV catheters access veins in the extremities (hand, forearm, antecubital fossa). Central lines access larger veins (subclavian, jugular, femoral) for long-term use, caustic medications, or haemodynamic monitoring. Complications arise from mechanical irritation, chemical irritation, or microbial contamination.',
    commonCauses: ['Fluid resuscitation (dehydration, sepsis, haemorrhage)', 'Antibiotic administration', 'Analgesia (PCA, continuous infusion)', 'Chemotherapy', 'Blood transfusion', 'Nutrition (parenteral)', 'Electrolyte replacement'],
    riskFactors: ['Poor insertion technique', 'Prolonged catheter dwell time', 'Immunosuppression', 'Peripheral vascular disease', 'Obesity (difficult access)', 'Frequent cannulation', 'Caustic medications via peripheral line'],
    subjectiveData: [
      'Pain, burning, or stinging at IV site',
      'Swelling of the hand/arm',
      'Redness along the vein',
      'Coldness of the extremity',
      'History of difficult IV access',
    ],
    objectiveData: [
      'IV site assessment: redness, swelling, tenderness, purulence, phlebitis scale (0–4)',
      'Infusion running correctly (drip rate, pump alarms)',
      'Fluid balance (intake vs output)',
      'IV site patency: flushes easily, blood return present',
      'Skin condition around insertion site: maceration, induration',
      'Temperature at IV site vs contralateral limb',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-iv-1',
        diagnosis: 'Risk for Infection related to invasive vascular access device',
        definingCharacteristics: ['Percutaneous catheter', 'Potential microbial entry', 'Prolonged dwell time'],
      },
      {
        id: 'nd-iv-2',
        diagnosis: 'Risk for Peripheral Neurovascular Dysfunction related to IV infiltration or phlebitis',
        definingCharacteristics: ['Swelling', 'Pain', 'Redness', 'Cool extremity'],
      },
    ],
    goals: [
      {
        id: 'g-iv-1',
        shortTerm: 'IV site patent with no signs of phlebitis or infiltration. Fluid and medications administering at correct rate. Pain at site ≤ 2/10.',
        longTerm: 'IV therapy completed without complications. No catheter-related bloodstream infection. Peripheral veins preserved for future use.',
      },
    ],
    interventions: [
      { id: 'i-iv-1', category: 'independent', action: 'Assess IV site every 1–2 hours: check for redness, swelling, tenderness, hardness along vein, blood return, infusion rate. Document using Visual Infusion Phlebitis (VIP) scale.', rationale: 'Early detection of phlebitis/infiltration prevents tissue damage and allows timely site rotation.', frequency: 'Every 1–2 hours' },
      { id: 'i-iv-2', category: 'independent', action: 'Secure IV catheter with transparent dressing (Tegaderm) to allow site inspection. Change dressing every 7 days or when soiled. Secure tubing to prevent traction.', rationale: 'Transparent dressings allow continuous visual assessment. Secure tubing prevents accidental dislodgement.', frequency: 'Continuous; dressing change weekly' },
      { id: 'i-iv-3', category: 'independent', action: 'Rotate peripheral IV sites every 72–96 hours (or per policy). Use smallest gauge catheter for the prescribed therapy. Prefer distal sites (hand) over proximal (antecubital).', rationale: 'Scheduled rotation reduces phlebitis and infiltration rates. Distal sites preserve proximal veins.', frequency: 'Per schedule' },
      { id: 'i-iv-4', category: 'independent', action: 'Administer IV medications at correct rate using infusion pump. Verify medication, dose, route, rate, and patient identity (5 Rights). Check compatibility if running concurrent infusions.', rationale: 'Medication errors via IV route can be fatal. Pumps prevent dangerous rate deviations.', frequency: 'At every medication administration' },
      { id: 'i-iv-5', category: 'independent', action: 'Maintain strict aseptic technique during insertion and maintenance: hand hygiene, skin preparation (chlorhexidine 2%), sterile gloves, sterile dressing.', rationale: 'Catheter-related bloodstream infections (CRBSIs) have 12–25% mortality. Aseptic technique is the single most effective prevention.', frequency: 'At insertion and every dressing change' },
      { id: 'i-iv-6', category: 'independent', action: 'Manage IV fluid balance: monitor strict I&O, weigh patient daily, assess for fluid overload (crackles, oedema, JVP). Adjust rate as prescribed.', rationale: 'Fluid overload can cause pulmonary oedema and heart failure. Accurate monitoring prevents this.', frequency: 'Hourly (I&O); daily (weight)' },
    ],
    evaluation: [
      { id: 'e-iv-1', expected: 'IV site patent, no phlebitis/infiltration. Medications/fluids running at correct rate.', status: 'met' },
      { id: 'e-iv-2', expected: 'No IV-related infection. Peripheral veins preserved. Patient comfortable.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Living with an IV Line',
        keyPoints: [
          'Keep your hand/arm still — avoid lifting heavy objects with the IV arm.',
          'Press the call bell if you feel pain, swelling, or coldness at the IV site.',
          'Do not adjust the drip rate yourself.',
          'Keep the dressing dry and clean — inform nursing staff if it becomes wet.',
          'Report any redness, swelling, or warmth at the IV site immediately.',
        ],
        method: 'Verbal',
      },
    ],
    dischargePlanning: {
      checklist: [
        'IV therapy completed or transitioned to oral medications',
        'Peripheral IV removed and site dressed',
        'No signs of phlebitis or infection at removal',
        'Oral medications prescribed if IV antibiotics were used',
        'Follow-up bloods if indicated',
      ],
      followUp: 'Oral medication review at discharge. Follow-up bloods if on IV antibiotics (renal function, CRP). Wound clinic if complex IV access was needed.',
      referrals: ['Pharmacy (medication reconciliation)', 'Vascular Access Team (if difficult access)', 'Infection Control (if CRBSI)'],
      warningSigns: [
        'Redness, swelling, or pain at the IV site',
        'Fever during or after IV therapy',
        'Red streak along the vein',
        'Swelling of the hand or arm',
        'Difficulty breathing during IV infusion (possible reaction)',
      ],
    },
    complications: ['Phlebitis (chemical, mechanical, bacterial)', 'Infiltration and extravasation', 'Catheter-related bloodstream infection (CRBSI)', 'Fluid overload', 'Air embolism (central lines)', 'Nerve damage', 'Thrombosis'],
  },

  'Urinary Catheter Care': {
    id: 'cp-catheter-care',
    disease: 'Urinary Catheter Care',
    specialty: 'Fundamental Nursing Care',
    overview: 'Urinary catheterisation involves insertion of a catheter through the urethra into the bladder for urine drainage. Indwelling catheters (Foley) are the most common type in hospitals. Catheter-associated urinary tract infection (CAUTI) is the most common healthcare-associated infection worldwide, making catheter care a critical nursing responsibility.',
    pathophysiology: 'Catheter insertion bypasses natural urinary tract defences (urethral sphincter, acidic pH, mucosal immunity). Biofilm forms on catheter surfaces within hours, providing a reservoir for bacteria. CAUTI risk increases 3–7% per day of catheterisation. Organisms ascend from the urethral meatus along the catheter surface.',
    commonCauses: ['Acute urinary retention', 'Post-surgical monitoring (urological, gynaecological, orthopaedic)', 'Critical care (strict I&O monitoring)', 'Pressure injury prevention (incontinent patients)', 'Terminal care comfort'],
    riskFactors: ['Prolonged catheterisation (> 2 days)', 'Female sex (shorter urethra)', 'Diabetes mellitus', 'Immunosuppression', 'Lack of catheter care', 'Open drainage system', 'Catheter manipulation by patient'],
    subjectiveData: [
      'Suprapubic discomfort or pain',
      'Urgency, frequency, dysuria (if UTI develops)',
      'Patient report of burning around catheter',
      'Difficulty draining (blockage)',
    ],
    objectiveData: [
      'Catheter secure and not pulling on urethra',
      'Drainage bag below bladder level',
      'Urine clear, pale yellow, no血 (haematuria)',
      'Meatal area clean, no discharge',
      'Urine output ≥ 0.5 mL/kg/hr',
      'Fever, flank pain if pyelonephritis develops',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-catheter-1',
        diagnosis: 'Risk for Infection related to indwelling urinary catheter and disrupted urinary tract defences',
        definingCharacteristics: ['Foreign body in bladder', 'Biofilm formation', 'Bacterial colonisation'],
      },
      {
        id: 'nd-catheter-2',
        diagnosis: 'Impaired Urinary Elimination related to catheter dependency',
        definingCharacteristics: ['Indwelling catheter', 'Unable to void naturally', 'Catheter dependency'],
      },
    ],
    goals: [
      {
        id: 'g-catheter-1',
        shortTerm: 'Catheter patent with adequate urine output. No signs of CAUTI. Periurethral area clean. Catheter secured and comfortable.',
        longTerm: 'Catheter removed as soon as clinically appropriate. No CAUTI. Patient returns to spontaneous voiding.',
      },
    ],
    interventions: [
      { id: 'i-catheter-1', category: 'independent', action: 'Perform daily catheter care: clean periurethral area with warm water and mild soap (or chlorhexidine wipes if prescribed). Clean from meatus outward. Dry thoroughly.', rationale: 'Daily meatal cleaning reduces bacterial colonisation and CAUTI risk. Evidence supports routine cleaning over antiseptic solutions.', frequency: 'Twice daily and after each bowel movement' },
      { id: 'i-catheter-2', category: 'independent', action: 'Maintain closed drainage system: do not disconnect the system. Keep drainage bag below bladder level at all times. Empty bag when 2/3 full using aseptic technique.', rationale: 'Closed system reduces bacterial entry. Bag below bladder prevents urine backflow and bacterial ascent.', frequency: 'Continuous; empty as needed' },
      { id: 'i-catheter-3', category: 'independent', action: 'Secure catheter to thigh (female) or abdomen (male) with tape or catheter strap. Allow slack for movement to prevent traction on urethra.', rationale: 'Unsecured catheter causes urethral erosion, bladder spasm, and increased infection risk.', frequency: 'Check security every shift' },
      { id: 'i-catheter-4', category: 'independent', action: 'Monitor urine output hourly. Document colour, clarity, and odour. Report output < 0.5 mL/kg/hr or cloudy/malodorous urine. Maintain fluid intake ≥ 1.5 L/day.', rationale: 'Low output may indicate obstruction or renal impairment. Adequate hydration flushes the urinary tract.', frequency: 'Hourly (output); daily (intake)' },
      { id: 'i-catheter-5', category: 'independent', action: 'Catheter removal review: assess daily if catheter is still indicated. Remove promptly when no longer needed. Encourage spontaneous voiding post-removal.', rationale: 'Each day of catheterisation increases CAUTI risk by 3–7%. Prompt removal is the single most effective CAUTI prevention strategy.', frequency: 'Daily review' },
      { id: 'i-catheter-6', category: 'independent', action: 'Educate patient: do not pull on catheter, keep bag below bladder, report pain, burning, or reduced output.', rationale: 'Patient education prevents accidental dislodgement and promotes early detection of complications.', frequency: 'On insertion and daily' },
    ],
    evaluation: [
      { id: 'e-catheter-1', expected: 'Urine output ≥ 0.5 mL/kg/hr. Catheter patent. No signs of CAUTI.', status: 'met' },
      { id: 'e-catheter-2', expected: 'Periurethral area clean and dry. Catheter secured. Patient comfortable.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Catheter Care',
        keyPoints: [
          'Keep the drainage bag below the level of your bladder at all times.',
          'Do not pull or tug on the catheter.',
          'Keep the area around the catheter clean and dry.',
          'Drink plenty of fluids (unless restricted) to keep urine flowing.',
          'Report pain, burning, fever, or cloudy/malodorous urine immediately.',
          'The catheter will be removed as soon as you no longer need it.',
        ],
        method: 'Verbal',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Catheter removed or home catheter care plan in place',
        'Post-void residual assessed if indicated',
        'Fluid intake advice provided',
        'Signs of UTI reviewed',
      ],
      followUp: 'If catheter removed: monitor voiding pattern for 24–48 hours. If home catheter: community nurse review weekly. GP follow-up if UTI symptoms develop.',
      referrals: ['Urology (if recurrent UTI or retention)', 'Community Nursing (home catheter care)', 'Infection Control'],
      warningSigns: [
        'Fever > 38°C',
        'Cloudy, dark, or foul-smelling urine',
        'Burning or pain when urinating',
        'Suprapubic pain or swelling',
        'No urine output for > 4 hours',
        'Blood in urine',
      ],
    },
    complications: ['CAUTI (most common)', 'Urethral erosion', 'Bladder spasm', 'Catheter blockage', 'Phimosis (males)', 'Urethral stricture', 'Bladder stones (long-term)'],
  },

  'Oxygen Therapy': {
    id: 'cp-oxygen-therapy',
    disease: 'Oxygen Therapy',
    specialty: 'Fundamental Nursing Care',
    overview: 'Oxygen therapy involves administration of supplemental oxygen to treat or prevent hypoxaemia. It is one of the most common interventions in hospitals. Oxygen is a drug — it must be prescribed with a target saturation range, and nursing staff must titrate delivery based on continuous monitoring.',
    pathophysiology: 'Hypoxaemia (SpO2 < 90% or PaO2 < 8 kPa) causes cellular hypoxia → anaerobic metabolism → lactic acidosis → organ dysfunction. Supplemental oxygen increases alveolar O2 concentration → improves arterial oxygenation. However, excessive O2 can suppress hypoxic drive in CO2 retainers (COPD), cause absorption atelectasis, and produce free radicals.',
    commonCauses: ['Pneumonia', 'COPD exacerbation', 'Heart failure (pulmonary oedema)', 'Acute asthma', 'Sepsis', 'Post-operative hypoxia', 'Pneumothorax', 'Anaemia', 'Carbon monoxide poisoning'],
    riskFactors: ['COPD with chronic CO2 retention', 'Obesity hypoventilation syndrome', 'Extremes of age', 'Reduced consciousness', 'Chest wall abnormalities', 'High-altitude exposure'],
    subjectiveData: [
      'Dyspnoea (patient report)',
      'Chest tightness or pain',
      'Anxiety or restlessness (hypoxia)',
      'History of chronic lung disease',
    ],
    objectiveData: [
      'SpO2 < 90% on room air (or below target range)',
      'Tachypnoea (RR > 20)',
      'Tachycardia (HR > 100)',
      'Cyanosis (central or peripheral)',
      'Use of accessory muscles',
      'Confusion or altered consciousness',
      'ABG: PaO2 < 8 kPa, PaCO2 elevated in CO2 retainers',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-o2-1',
        diagnosis: 'Impaired Gas Exchange related to ventilation-perfusion mismatch as evidenced by SpO2 < 90% and dyspnoea',
        relatedFactors: ['Airway obstruction', 'Alveolar consolidation', 'Pulmonary oedema', 'Anaemia'],
        definingCharacteristics: ['Low SpO2', 'Tachypnoea', 'Tachycardia', 'Cyanosis', 'Restlessness'],
      },
      {
        id: 'nd-o2-2',
        diagnosis: 'Risk for Oxygen Toxicity related to prolonged high-concentration oxygen therapy',
        definingCharacteristics: ['FiO2 > 0.6 for > 24 hours', 'Hypercapnia', 'Absorption atelectasis'],
      },
    ],
    goals: [
      {
        id: 'g-o2-1',
        shortTerm: 'SpO2 within target range (88–92% for COPD/CO2 retainers; 94–98% for others). Patient comfortable, no dyspnoea at rest. RR and HR normalising.',
        longTerm: 'Oxygen weaned to minimum effective dose. Patient transitioned to room air if possible. No oxygen toxicity.',
      },
    ],
    interventions: [
      { id: 'i-o2-1', category: 'dependent', action: 'Administer oxygen via correct device: Nasal cannulae (1–6 L/min, FiO2 24–44%), simple face mask (5–10 L/min, FiO2 40–60%), non-rebreather mask (10–15 L/min, FiO2 60–90%), Venturi mask (precise FiO2 for COPD).', rationale: 'Device selection determines FiO2 delivered. Venturi mask is preferred for COPD patients where precise control is needed.', frequency: 'Continuous' },
      { id: 'i-o2-2', category: 'independent', action: 'Monitor SpO2 continuously via pulse oximetry. Titrate O2 to maintain target range: 94–98% (most patients) or 88–92% (COPD/CO2 retainers). Document readings hourly.', rationale: 'Continuous monitoring detects desaturation and hyperoxia. COPD patients need lower targets to avoid suppressing hypoxic drive.', frequency: 'Continuous monitoring; hourly documentation' },
      { id: 'i-o2-3', category: 'independent', action: 'Assess respiratory status hourly: RR, depth, pattern, breath sounds, work of breathing, level of consciousness. Report deterioration immediately.', rationale: 'Clinical assessment complements SpO2. Worsening respiratory function may indicate need for escalation.', frequency: 'Every hour' },
      { id: 'i-o2-4', category: 'independent', action: 'Maintain oxygen delivery equipment: humidify O2 if Flow > 4 L/min (nasal cannulae) or if patient has thick secretions. Check tubing for kinks. Ensure adequate supply.', rationale: 'Dry oxygen damages mucous membranes and thickens secretions. Humidification improves comfort.', frequency: 'Continuous' },
      { id: 'i-o2-5', category: 'collaborative', action: 'Request ABG if SpO2 not improving, CO2 retention suspected, or patient on high-flow O2. Escalate to CPAP/BiPAP or intubation if respiratory failure.', rationale: 'ABGs assess ventilation (PaCO2) and oxygenation (PaO2) more accurately than SpO2 alone.', frequency: 'As indicated' },
    ],
    evaluation: [
      { id: 'e-o2-1', expected: 'SpO2 within target range. Patient comfortable. RR and HR normal.', status: 'met' },
      { id: 'e-o2-2', expected: 'Oxygen weaned appropriately. No oxygen toxicity. Patient transitioned to room air when stable.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Oxygen Safety',
        keyPoints: [
          'Oxygen makes fire burn faster — no smoking, no open flames, no candles near you.',
          'Keep nasal prongs in place and the tubing untangled.',
          'Do not adjust the flow rate yourself — tell the nurse if you feel breathless.',
          'Report any nose dryness, nosebleeds, or skin irritation.',
          'You will be weaned off oxygen gradually as your lungs improve.',
        ],
        method: 'Verbal',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Oxygen weaned to minimum effective dose or discontinued',
        'SpO2 stable on room air (or home O2 prescription if chronic)',
        'Smoking cessation advice provided',
        'Home O2 equipment arranged (if long-term O2 therapy)',
        'Pulmonary rehabilitation referral (if COPD)',
      ],
      followUp: 'Respiratory medicine or GP within 1–2 weeks. Repeat ABG if CO2 retention. Pulmonary rehabilitation if COPD. Home O2 assessment if PaO2 < 7.3 kPa on air.',
      referrals: ['Respiratory Medicine', 'Smoking Cessation', 'Pulmonary Rehabilitation', 'Physiotherapy', 'Home Oxygen Service'],
      warningSigns: [
        'Return of breathlessness at rest',
        'SpO2 dropping below target range',
        'Confusion or drowsiness',
        'Blue lips or fingernails',
        'Chest pain',
      ],
    },
    complications: ['Oxygen toxicity (prolonged high FiO2)', 'Absorption atelectasis', 'CO2 narcosis (in COPD)', 'Dry nasal mucosa', 'Fire hazard', 'Retinopathy of prematurity (neonates)'],
  },

  'Post-Operative Care': {
    id: 'cp-postop',
    disease: 'Post-Operative Care',
    specialty: 'Fundamental Nursing Care',
    overview: 'Post-operative nursing care encompasses the immediate and ongoing management of surgical patients from recovery room to discharge. Key responsibilities include monitoring vital signs, managing pain, preventing complications (DVT, pneumonia, UTI, wound infection), and facilitating early mobilisation and recovery.',
    pathophysiology: 'Surgical stress response → sympathetic activation → tachycardia, hypertension, hyperglycaemia. Tissue trauma → inflammatory response → pain, oedema, fever. Immobility → venous stasis → DVT risk. Anaesthesia → respiratory depression, hypothermia, urinary retention. Pain → splinting → poor cough → atelectasis → pneumonia.',
    commonCauses: ['Any surgical procedure (minor to major)', 'General or regional anaesthesia', 'Abdominal surgery (highest complication rate)', 'Orthopaedic surgery (high DVT risk)', 'Cardiovascular surgery'],
    riskFactors: ['Major surgery (> 2 hours)', 'Advanced age', 'Obesity', 'Diabetes', 'Smoking', 'Malnutrition', 'Immunosuppression', 'Previous DVT/PE', 'Prolonged immobility'],
    subjectiveData: [
      'Pain at surgical site (severity, character)',
      'Nausea and vomiting',
      'Drowsiness (residual anaesthesia)',
      'Thirst and hunger',
      'Anxiety about surgical outcome',
    ],
    objectiveData: [
      'Vital signs: HR, BP, RR, SpO2, temperature',
      'Wound: dressing intact, no bleeding or discharge',
      'Drains: type, amount, colour of drainage',
      'Urine output (if catheterised)',
      'Pain score (NRS 0–10)',
      'Level of consciousness',
      'Bowel sounds, abdominal distension',
      'Extremity warmth, pulses, sensation (compartment syndrome risk)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-postop-1',
        diagnosis: 'Acute Pain related to surgical tissue trauma as evidenced by verbal pain report and guarding',
        relatedFactors: ['Surgical incision', 'Tissue manipulation', 'Inflammatory mediators'],
        definingCharacteristics: ['Pain at surgical site', 'Guarding', 'Tachycardia', 'Elevated BP'],
      },
      {
        id: 'nd-postop-2',
        diagnosis: 'Risk for Infection related to surgical wound and invasive devices',
        definingCharacteristics: ['Open wound', 'IV lines', 'Catheter', 'Drains'],
      },
      {
        id: 'nd-postop-3',
        diagnosis: 'Risk for Peripheral Neurovascular Dysfunction related to post-operative oedema and immobility',
        definingCharacteristics: ['Swelling', 'Pain', 'Reduced pulses', 'Numbness'],
      },
    ],
    goals: [
      {
        id: 'g-postop-1',
        shortTerm: 'Pain controlled (≤ 4/10). Vital signs stable. Wound clean and dry. Tolerating oral fluids. Mobilising with assistance.',
        longTerm: 'Wound healed without infection. Full mobilisation achieved. Bowel and bladder function restored. Discharged safely.',
      },
    ],
    interventions: [
      { id: 'i-postop-1', category: 'independent', action: 'Monitor vital signs every 15 min (first 2 hours), then hourly for 4 hours, then every 4 hours. Report: HR > 100, BP < 90/60 or > 160/100, RR < 10 or > 24, SpO2 < 94%, Temp > 38°C.', rationale: 'Post-operative monitoring detects haemorrhage, shock, respiratory depression, and infection early.', frequency: '15 min → 1 hr → 4 hr (step-down)' },
      { id: 'i-postop-2', category: 'dependent', action: 'Administer analgesia regularly (not PRN): paracetamol QDS + NSAID (if safe) + opioid for breakthrough. Use PCA if available. Pain target ≤ 4/10 at rest.', rationale: 'Regular analgesia is more effective than PRN dosing. Adequate pain control enables early mobilisation and deep breathing.', frequency: 'QDS (paracetamol); PRN (opioid)' },
      { id: 'i-postop-3', category: 'independent', action: 'Promote early mobilisation: sit on edge of bed on day 0/1, stand and walk with assistance day 1–2. Use physiotherapy. Encourage deep breathing and coughing exercises.', rationale: 'Early mobilisation reduces DVT, pneumonia, ileus, and muscle wasting. Deep breathing prevents atelectasis.', frequency: 'At least 3 times daily' },
      { id: 'i-postop-4', category: 'independent', action: 'DVT prophylaxis: administer LMWH (enoxaparin 40 mg SC OD) as prescribed. Apply TED stockings. Encourage ankle rotations and calf exercises.', rationale: 'Surgical patients are at high DVT/PE risk. LMWH + TED stockings + mobilisation is the standard protocol.', frequency: 'Daily (LMWH); continuous (TEDs)' },
      { id: 'i-postop-5', category: 'independent', action: 'Wound care: keep dressing dry and intact for 24–48 hours (or per surgeon). Inspect for bleeding, discharge, dehiscence. Report immediately if concerned.', rationale: 'Early wound assessment detects dehiscence, haematoma, and infection.', frequency: 'Every shift; dressing change per protocol' },
      { id: 'i-postop-6', category: 'independent', action: 'Monitor fluid balance: strict I&O, replace IV fluids as prescribed, transition to oral fluids when bowel sounds present and tolerating sips.', rationale: 'Fluid balance maintenance prevents dehydration and overload. Early oral hydration promotes recovery.', frequency: 'Hourly (I&O)' },
    ],
    evaluation: [
      { id: 'e-postop-1', expected: 'Pain ≤ 4/10. Vital signs stable. Mobilising independently. Tolerating oral diet.', status: 'met' },
      { id: 'e-postop-2', expected: 'Wound clean, no infection. DVT prophylaxis in place. No post-operative complications.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Recovery After Surgery',
        keyPoints: [
          'Take your pain medication regularly — do not wait for severe pain.',
          'Move as much as you can — walk with assistance from day 1.',
          'Do your breathing exercises — breathe deeply and cough to keep your lungs clear.',
          'Keep your wound dry and clean. Do not remove the dressing unless instructed.',
          'Eat small, frequent meals. Start with light foods and increase gradually.',
          'Contact your doctor if you develop fever, wound redness, or increasing pain.',
        ],
        method: 'Verbal + written discharge leaflet',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Pain managed with oral analgesics',
        'Wound care instructions provided',
        'DVT prophylaxis prescribed (if outpatient)',
        'Follow-up surgical appointment scheduled (1–2 weeks)',
        'Activity restrictions documented (lifting, driving, wound care)',
        'Dietary advice provided',
        'Return-to-work/school timeline discussed',
      ],
      followUp: 'Surgical clinic at 1–2 weeks for wound check and suture/staple removal. GP at 4–6 weeks. Pathology results reviewed. Physiotherapy if indicated.',
      referrals: ['Physiotherapy', 'Dietitian', 'Occupational Therapy', 'Pain Management (if chronic pain)', 'Stoma Care (if applicable)'],
      warningSigns: [
        'Fever > 38°C',
        'Wound opening, redness, swelling, or pus',
        'Increasing pain not controlled by medication',
        'Redness, swelling, or pain in the leg (DVT)',
        'Difficulty breathing or chest pain (PE)',
        'Nausea and vomiting preventing oral intake',
        'No bowel movement for > 3 days',
      ],
    },
    complications: ['Surgical site infection (5–10%)', 'DVT/PE', 'Pneumonia', 'Urinary retention', 'Ileus', 'Wound dehiscence', 'Haemorrhage', 'Anaesthetic complications', 'Death (1–2% for major surgery)'],
  },

  'Blood Transfusion': {
    id: 'cp-blood-transfusion',
    disease: 'Blood Transfusion',
    specialty: 'Fundamental Nursing Care',
    overview: 'Blood transfusion is the administration of blood components (packed red blood cells, platelets, fresh frozen plasma, cryoprecipitate) to replace lost or deficient components. It is a high-risk procedure requiring strict adherence to protocols to prevent haemolytic transfusion reactions, which can be fatal.',
    pathophysiology: 'Transfusion introduces donor antigens into recipient circulation. ABO incompatibility → donor RBCs destroyed by recipient antibodies → intravascular haemolysis → haemoglobinuria → renal failure → death. Non-haemolytic reactions (febrile, allergic) are more common but less dangerous. TRALI and TACO are rare but life-threatening.',
    commonCauses: ['Acute haemorrhage (trauma, surgery, GI bleed)', 'Severe anaemia (Hb < 70 g/L or symptomatic)', 'Coagulopathy (massive transfusion, liver disease)', 'Thrombocytopenia (platelets < 10 × 10⁹/L)', 'DIC', 'Sickle cell disease (exchange transfusion)'],
    riskFactors: ['Previous transfusion reactions', 'Multiple prior transfusions', 'Known antibodies', 'Autoimmune disease', 'Massive transfusion (> 10 units)', 'Cold patient (hypothermia)', 'Cardiac disease (fluid overload risk)'],
    subjectiveData: [
      'Symptoms of severe anaemia: dyspnoea, fatigue, dizziness, angina',
      'History of previous transfusion reactions',
      'Active bleeding or recent major blood loss',
      'Patient anxiety about transfusion',
    ],
    objectiveData: [
      'Hb < 70 g/L (or < 100 g/L if symptomatic or cardiac disease)',
      'Active bleeding with haemodynamic instability',
      'Coagulopathy: elevated INR, low fibrinogen',
      'Low platelets (< 10 × 10⁹/L or active bleeding)',
      'Tachycardia, hypotension, pallor (severe anaemia/haemorrhage)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-transfusion-1',
        diagnosis: 'Risk for Decreased Cardiac Output related to acute blood loss and severe anaemia',
        definingCharacteristics: ['Hb < 70 g/L', 'Tachycardia', 'Hypotension', 'Active bleeding'],
      },
      {
        id: 'nd-transfusion-2',
        diagnosis: 'Risk for Allergic Reaction related to transfusion of blood products',
        definingCharacteristics: ['Donor plasma proteins', 'Previous sensitisation', 'Antibody formation'],
      },
    ],
    goals: [
      {
        id: 'g-transfusion-1',
        shortTerm: 'Transfusion completed without reaction. Hb improved by ≥ 10 g/L. Vital signs stable. No signs of transfusion reaction.',
        longTerm: 'Anaemia corrected. Haemostasis achieved. No transfusion-related complications.',
      },
    ],
    interventions: [
      { id: 'i-transfusion-1', category: 'independent', action: 'Perform bedside check: verify patient identity (name, DOB, hospital number) against blood bag label and blood transfusion request form. TWO nurses must check. Document.', rationale: 'Wrong-blood-in-tube is the most dangerous transfusion error. Two-nurse verification is mandatory.', frequency: 'Before each unit' },
      { id: 'i-transfusion-2', category: 'independent', action: 'Vital signs: baseline (temp, HR, BP, RR, SpO2) → at 15 min → 30 min → 1 hour → completion → 1 hour post. Document on transfusion observation chart.', rationale: 'Most severe reactions occur in the first 15 minutes. Early detection enables immediate response.', frequency: '15 min, 30 min, 1 hr, completion, 1 hr post' },
      { id: 'i-transfusion-3', category: 'independent', action: 'Start transfusion slowly (1 mL/min for first 15 min). Observe for reactions: fever, rigors, rash, wheeze, back pain, haemoglobinuria. If reaction suspected: STOP immediately, disconnect, keep vein open with NS, notify medical team.', rationale: 'Slow initial rate allows early detection of severe reactions. Immediate stopping prevents further antigen exposure.', frequency: 'First 15 minutes' },
      { id: 'i-transfusion-4', category: 'dependent', action: 'Administer pre-medications if prescribed: paracetamol and chlorphenamine (for patients with previous febrile/allergic reactions).', rationale: 'Pre-medication reduces the incidence and severity of recurrent reactions.', frequency: '30 min before transfusion' },
      { id: 'i-transfusion-5', category: 'independent', action: 'Use blood warmer and 18G or larger IV cannula for rapid transfusion. Each unit should be completed within 4 hours (2 hours for paediatric). Do not add medications to blood.', rationale: 'Slow transfusion increases infection risk. Warmers prevent hypothermia. Large cannulae prevent haemolysis.', frequency: 'During transfusion' },
      { id: 'i-transfusion-6', category: 'independent', action: 'Post-transfusion: check Hb, monitor for delayed reactions (fever at 7–10 days from alloimmunisation). Document transfusion completed and any reactions.', rationale: 'Delayed reactions may occur days later. Documenting completion ensures accurate records.', frequency: 'Post-transfusion' },
    ],
    evaluation: [
      { id: 'e-transfusion-1', expected: 'Transfusion completed without reaction. Hb improved. Vital signs stable throughout.', status: 'met' },
      { id: 'e-transfusion-2', expected: 'Patient tolerating transfusion. No fever, rash, rigors, or haemodynamic changes.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Blood Transfusion Safety',
        keyPoints: [
          'Tell the nurse immediately if you feel feverish, itchy, have back pain, or feel unwell during the transfusion.',
          'Do not worry — most transfusions go smoothly.',
          'The transfusion takes 2–4 hours per unit.',
          'You may feel better within hours as your blood counts improve.',
          'Report any unusual symptoms for up to 24 hours after the transfusion.',
        ],
        method: 'Verbal',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Transfusion completed and documented',
        'Post-transfusion Hb checked',
        'No delayed reactions within 24 hours',
        'Haemostasis achieved (if transfused for bleeding)',
        'Iron supplementation if ongoing blood loss',
      ],
      followUp: 'Repeat FBC at 1 week. Haematology referral if unexplained anaemia or recurrent transfusion need. Group and save for future transfusions.',
      referrals: ['Haematology', 'Dietitian (iron-rich diet)', 'Blood Bank (if recurrent need)'],
      warningSigns: [
        'Fever developing hours to days after transfusion',
        'Dark urine (haemoglobinuria)',
        'Jaundice or yellow skin',
        'Severe back pain during transfusion',
        'Difficulty breathing or chest tightness',
        'Widespread rash or itching',
      ],
    },
    complications: ['Acute haemolytic transfusion reaction (1:100,000 — high mortality)', 'Febrile non-haemolytic reaction (1–3%)', 'Allergic reaction (1–3%)', 'TRALI (1:5,000)', 'TACO (1:700)', 'Transfusion-transmitted infection (very rare)', 'Iron overload (chronic transfusion)'],
  },

  'Nasogastric Tube Care': {
    id: 'cp-ng-tube',
    disease: 'Nasogastric Tube Care',
    specialty: 'Fundamental Nursing Care',
    overview: 'Nasogastric (NG) tube insertion and management is a core nursing skill for enteral feeding, gastric decompression, and medication administration in patients who cannot eat orally. Correct placement verification and ongoing care are critical to prevent aspiration pneumonia, the most dangerous complication.',
    pathophysiology: 'NG tube passes through the nose → nasopharynx → oropharynx → oesophagus → stomach. Incorrect placement (in trachea/lungs) causes direct instillation of feed/medication into lungs → aspiration pneumonia → sepsis → death. Gastric placement must be confirmed before every feed or medication.',
    commonCauses: ['Dysphagia (stroke, neurological disease)', 'Post-surgical patients (head/neck, abdominal)', 'Critical care (ventilated patients)', 'Gastric decompression (bowel obstruction, ileus)', 'Malnutrition (supplemental feeding)', 'Medication administration when oral route unavailable'],
    riskFactors: ['Incorrect placement (tracheal)', 'Aspiration', 'Nasal pressure necrosis', 'Sinusitis', 'Oesophageal erosion (long-term)', 'Tube dislodgement', 'Tube blockage'],
    subjectiveData: [
      'Difficulty swallowing (dysphagia)',
      'Inability to take oral nutrition or medications',
      'Nausea, vomiting, abdominal distension',
      'Patient discomfort from tube',
    ],
    objectiveData: [
      'NG tube in situ — check length marking at nostril',
      'Aspirate pH ( gastric: pH < 5.5; respiratory: pH > 6)',
      'X-ray confirmation of tip position (gold standard)',
      'Tube patency (flushes easily)',
      'Nostril redness or pressure injury',
      'Respiratory status: no new crackles, no desaturation during feeds',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-ng-1',
        diagnosis: 'Risk for Aspiration related to NG tube placement and enteral feeding',
        definingCharacteristics: ['NG tube in situ', 'Reduced consciousness', 'Impaired swallowing', 'Gastroparesis'],
      },
      {
        id: 'nd-ng-2',
        diagnosis: 'Impaired Skin Integrity related to NG tube pressure on nares',
        definingCharacteristics: ['Nasal redness', 'Pressure injury at nares', 'Tube securing tape causing skin irritation'],
      },
    ],
    goals: [
      {
        id: 'g-ng-1',
        shortTerm: 'NG tube correctly placed in stomach (pH < 5.5, X-ray confirmed). Tolerating feeds without aspiration. Skin at nares intact.',
        longTerm: 'Nutritional goals met via NG tube. Tube removed when oral intake restored. No aspiration or skin breakdown.',
      },
    ],
    interventions: [
      { id: 'i-ng-1', category: 'independent', action: 'Verify NG tube placement BEFORE every feed, medication, or continuous feed restart: aspirate gastric contents and check pH (< 5.5 = gastric). If pH > 6 or uncertain → X-ray.', rationale: 'Aspiration into lungs from misplaced NG tube is the most dangerous complication. pH testing is the bedside standard.', frequency: 'Before every feed and medication' },
      { id: 'i-ng-2', category: 'independent', action: 'Monitor tube position: check length marking at nostril every shift. Document any change. If tube migrated > 3 cm, re-verify placement.', rationale: 'Tube migration can cause oesophageal or pulmonary placement. Regular checks detect movement early.', frequency: 'Every shift' },
      { id: 'i-ng-3', category: 'independent', action: 'Administer enteral feed at prescribed rate via pump. Start at half rate, increase every 6–12 hours as tolerated. Keep head of bed ≥ 30° during feeds and 30 min after.', rationale: 'Gradual rate increase prevents dumping syndrome. Head elevation reduces aspiration risk by 50%.', frequency: 'Continuous or bolus per prescription' },
      { id: 'i-ng-4', category: 'independent', action: 'Flush tube with 20–30 mL warm water before and after each feed bolus, and every 4–6 hours during continuous feeds. Flush after medications (crush and dissolve in water first).', rationale: 'Flushing prevents tube blockage from formula residue and medication particles.', frequency: 'Before and after feeds; every 4–6 hours' },
      { id: 'i-ng-5', category: 'independent', action: 'Secure tube to nose with tape (triangle or bridle) and to cheek. Relieve pressure on nares with foam padding. Rotate tube nostril weekly if long-term.', rationale: 'Proper securing prevents dislodgement. Pressure relief prevents nasal necrosis.', frequency: 'Daily; rotate weekly' },
      { id: 'i-ng-6', category: 'independent', action: 'Monitor for complications: aspiration (coughing during feed, desaturation), diarrhoea (too rapid infusion), tube blockage (unable to flush), tube dislodgement (marking changed).', rationale: 'Early detection of complications allows prompt intervention.', frequency: 'Every feed' },
    ],
    evaluation: [
      { id: 'e-ng-1', expected: 'NG tube in correct position. Tolerating feeds at prescribed rate. No aspiration events.', status: 'met' },
      { id: 'e-ng-2', expected: 'Tube patent and flushed regularly. Skin at nares intact. Nutritional goals met.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'NG Tube Care',
        keyPoints: [
          'Do not pull or adjust the tube yourself.',
          'Report any coughing, choking, or difficulty breathing during feeds — this may mean the tube has moved.',
          'Keep the tube taped securely to your nose and cheek.',
          'If the tube comes out, do not try to reinsert it yourself — call the nurse.',
          'When you can swallow safely, the tube will be removed.',
        ],
        method: 'Verbal',
      },
    ],
    dischargePlanning: {
      checklist: [
        'If continuing NG feeding at home: supply of feed, pumps, syringes, sterile water',
        'Caregiver trained in NG tube care and feed administration',
        'Home health nursing visits arranged',
        'Follow-up SALT (speech and language therapy) for swallowing assessment',
        'GP follow-up for tube management',
      ],
      followUp: 'Speech and Language Therapy assessment for swallowing. Dietitian review of nutritional plan. GP or community nurse for tube management if long-term. Nasogastric tube review at 4–6 weeks.',
      referrals: ['Speech and Language Therapy', 'Dietitian', 'Community Nursing', 'Gastroenterology (if long-term needed)'],
      warningSigns: [
        'Coughing or choking during feeds',
        'Tube comes out or moves',
        'Tube blocked (unable to flush)',
        'Blood from nose around tube',
        'Abdominal distension or vomiting',
        'Diarrhoea during feeds',
      ],
    },
    complications: ['Aspiration pneumonia (most serious)', 'Tube malposition', 'Nasal pressure necrosis', 'Sinusitis', 'Tube blockage', 'Tube dislodgement', 'Diarrhoea (from feeds)', 'Oesophageal erosion (long-term)'],
  },

  'Pressure Injury Prevention': {
    id: 'cp-pressure-injury',
    disease: 'Pressure Injury Prevention',
    specialty: 'Fundamental Nursing Care',
    overview: 'Pressure injuries (pressure ulcers, bedsores) are localised damage to skin and underlying tissue resulting from sustained pressure or pressure combined with shear. They are a significant patient safety concern and a quality indicator in healthcare. Prevention is far more effective and cost-efficient than treatment.',
    pathophysiology: 'Sustained pressure → capillary occlusion → tissue ischaemia → cell death → necrosis. Damage begins at the bone-muscle interface and progresses outward. Shear forces (sliding in bed) stretch and tear blood vessels, exacerbating ischaemia. Moisture (urine, faeces, sweat) softens skin and increases vulnerability.',
    commonCauses: ['Prolonged immobility (stroke, spinal cord injury, critical illness)', 'Post-surgical (anaesthesia-induced immobility)', 'Incontinence (moisture-associated skin damage)', 'Poor nutrition (low albumin, dehydration)', 'Ageing skin (thin, less elastic)'],
    riskFactors: ['Immobility or reduced mobility', 'Impaired sensation (neuropathy, spinal cord injury)', 'Incontinence', 'Malnutrition (albumin < 30 g/L)', 'Obesity or very low BMI', 'Diabetes', 'Peripheral vascular disease', 'Advanced age', 'Previous pressure injury'],
    subjectiveData: [
      'Patient reports discomfort or pain at pressure points',
      'History of prolonged bed rest or chair-bound',
      'Inability to reposition independently',
      'Poor nutritional intake',
    ],
    objectiveData: [
      'Braden Scale score ≤ 12 (high risk) or 13–14 (moderate risk)',
      'Skin assessment: redness over bony prominences (non-blanchable erythema = Stage 1)',
      'Bony prominences: sacrum, heels, ischial tuberosities, elbows, occiput',
      'Skin moisture level',
      'Nutritional status: albumin, BMI',
      'Mobility assessment',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-pressure-1',
        diagnosis: 'Risk for Impaired Skin Integrity related to sustained pressure and immobility',
        definingCharacteristics: ['Immobility', 'Prolonged bed rest', 'Reduced sensation', 'Incontinence'],
      },
      {
        id: 'nd-pressure-2',
        diagnosis: 'Impaired Physical Mobility related to neurological deficit or post-surgical restrictions',
        definingCharacteristics: ['Unable to reposition independently', 'Dependent on nursing staff', 'Prolonged sitting or lying'],
      },
    ],
    goals: [
      {
        id: 'g-pressure-1',
        shortTerm: 'Skin intact over all pressure points. Braden score improved through interventions. Patient repositioned regularly.',
        longTerm: 'No pressure injury develops during admission. Patient/caregiver demonstrates prevention strategies. Nutritional status optimised.',
      },
    ],
    interventions: [
      { id: 'i-pressure-1', category: 'independent', action: 'Perform risk assessment on admission and every 48 hours using Braden Scale (sensory, moisture, activity, mobility, nutrition, friction/shear). Document and act on score.', rationale: 'Validated risk tools identify high-risk patients. Braden ≤ 12 = high risk; 13–14 = moderate risk.', frequency: 'On admission; every 48 hours' },
      { id: 'i-pressure-2', category: 'independent', action: 'Reposition bed-bound patients every 2 hours using 30° tilt. Use pressure-redistribution mattress (alternating pressure or high-density foam). Limit chair sitting to 2 hours.', rationale: 'Regular repositioning relieves pressure and restores blood flow. Pressure-redistribution surfaces reduce interface pressure.', frequency: 'Every 2 hours' },
      { id: 'i-pressure-3', category: 'independent', action: 'Keep skin clean and dry. Use pH-balanced cleanser. Apply moisture barrier cream (zinc oxide, dimethicone) for incontinent patients. Avoid massage over bony prominences.', rationale: 'Moisture softens skin and increases friction. Barrier creams protect. Massage over reddened areas can worsen deep tissue damage.', frequency: 'After each incontinence episode; twice daily' },
      { id: 'i-pressure-4', category: 'collaborative', action: 'Optimise nutrition: high-protein diet (1.5 g/kg/day), adequate calories, vitamin C, zinc. Refer to dietitian if albumin < 30 g/L.', rationale: 'Malnutrition is the strongest modifiable risk factor. Adequate protein is essential for tissue integrity and repair.', frequency: 'Ongoing' },
      { id: 'i-pressure-5', category: 'independent', action: 'Use heel offloading devices (pillows, heel suspension boots). Avoid ring cushions. Ensure bed linen is smooth and wrinkle-free.', rationale: 'Heels are the most vulnerable pressure point. Wrinkled linen creates focal pressure.', frequency: 'Continuous' },
      { id: 'i-pressure-6', category: 'independent', action: 'Educate patient and family: importance of repositioning, skin inspection, nutrition, and avoiding prolonged pressure. Involve in repositioning schedule.', rationale: 'Patient engagement improves compliance and outcomes. Education is essential for discharge planning.', frequency: 'Daily' },
    ],
    evaluation: [
      { id: 'e-pressure-1', expected: 'Skin intact over all pressure points. No new redness or breakdown.', status: 'met' },
      { id: 'e-pressure-2', expected: 'Repositioning schedule followed. Braden score stable or improved. Nutritional goals met.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Preventing Pressure Injuries',
        keyPoints: [
          'Change position every 2 hours — even small shifts help.',
          'Keep skin clean and dry. Use barrier cream if incontinent.',
          'Eat well — protein and vitamins keep your skin strong.',
          'Report any redness, pain, or broken skin immediately.',
          'Avoid sitting in the same position for more than 2 hours.',
          'If you cannot reposition yourself, ask for help.',
        ],
        method: 'Verbal + written leaflet',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Risk assessment completed and documented',
        'Pressure-redistribution mattress provided (if high risk)',
        'Skin care regimen established',
        'Nutritional support in place',
        'Repositioning schedule documented and followed',
        'Caregiver education completed',
      ],
      followUp: 'Community nursing review within 1 week (if high risk). Dietitian follow-up. Wound clinic if pressure injury develops.',
      referrals: ['Tissue Viability/Wound Nurse', 'Dietitian', 'Physiotherapy (mobilisation)', 'Occupational Therapy (seating)', 'Community Nursing'],
      warningSigns: [
        'New redness over bony prominence that does not fade',
        'Pain at pressure point',
        'Broken skin or blister',
        'Skin discolouration (purple/brown)',
        'Wound not healing',
      ],
    },
    complications: ['Stage 1–4 pressure injury', 'Unstageable pressure injury', 'Deep tissue injury', 'Sepsis (from infected pressure injury)', 'Osteomyelitis', 'Prolonged hospital stay', 'Increased mortality (advanced pressure injury)'],
  },

  'Chest Drain Care': {
    id: 'cp-chest-drain',
    disease: 'Chest Drain Care',
    specialty: 'Fundamental Nursing Care',
    overview: 'Chest drains (intercostal drains, thoracostomy tubes) are inserted to evacuate air (pneumothorax), fluid (pleural effusion, haemothorax), or pus (empyema) from the pleural space. Proper nursing care ensures effective drainage, prevents complications, and enables timely removal.',
    pathophysiology: 'The pleural space is normally a negative-pressure potential space. Air or fluid accumulation → lung compression → atelectasis → reduced gas exchange → respiratory failure. Chest drain restores negative pressure → lung re-expansion. Underwater seal system allows one-way drainage: air/fluid exits pleural space but cannot re-enter.',
    commonCauses: ['Pneumothorax (spontaneous, traumatic, iatrogenic)', 'Pleural effusion (malignant, cardiac, infectious)', 'Haemothorax (trauma, surgery)', 'Empyema', 'Post-thoracic surgery', 'Chylothorax'],
    riskFactors: ['Thoracic trauma', 'Thoracic surgery', 'COPD (bullae, blebs)', 'Malignancy', 'Central line insertion (pneumothorax risk)', 'Mechanical ventilation'],
    subjectiveData: [
      'Dyspnoea, chest pain',
      'History of chest trauma or surgery',
      'Patient reports gurgling in chest',
      'Anxiety about chest tube',
    ],
    objectiveData: [
      'Chest drain in situ — check insertion site dressing',
      'Underwater seal bubbling (continuous = air leak; intermittent = resolving)',
      'Fluid output: volume, colour, consistency',
      'Tidalling (fluid movement with respiration — indicates patency)',
      'Subcutaneous emphysema (crepitus around wound)',
      'Respiratory assessment: SpO2, RR, breath sounds, tracheal position',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-chest-1',
        diagnosis: 'Impaired Gas Exchange related to pleural space air/fluid accumulation as evidenced by dyspnoea and reduced breath sounds',
        relatedFactors: ['Lung compression', 'Pneumothorax', 'Pleural effusion'],
        definingCharacteristics: ['Dyspnoea', 'Reduced breath sounds', 'Tachypnoea', 'Low SpO2'],
      },
      {
        id: 'nd-chest-2',
        diagnosis: 'Risk for Infection related to open chest drain insertion site',
        definingCharacteristics: ['Percutaneous tube', 'Pleural space entry', 'Break in skin barrier'],
      },
    ],
    goals: [
      {
        id: 'g-chest-1',
        shortTerm: 'Chest drain patent with tidalling. Air leak resolving (reduced bubbling). SpO2 ≥ 94%. Patient breathing comfortably.',
        longTerm: 'Lung fully re-expanded on X-ray. Drain removed. No infection. No recurrence of pneumothorax/effusion.',
      },
    ],
    interventions: [
      { id: 'i-chest-1', category: 'independent', action: 'Monitor underwater seal chamber: check tidalling (present = drain patent and lung not fully expanded), bubbling (continuous = active air leak; stopping = leak sealed). Document hourly.', rationale: 'Tidalling and bubbling patterns indicate drain function and air leak status. Loss of tidalling may mean drain blockage or lung re-expanded.', frequency: 'Hourly' },
      { id: 'i-chest-2', category: 'independent', action: 'Keep drainage system below chest level at all times. Never clamp chest drain (unless specifically instructed for bottle change). Ensure all connections are secure and airtight.', rationale: 'System below chest prevents backflow. Clamping causes tension pneumothorax if air leak present. Secure connections prevent air entry.', frequency: 'Continuous' },
      { id: 'i-chest-3', category: 'independent', action: 'Monitor fluid output: measure and document hourly. Note colour (serous = clear yellow; sanguineous = bloody; purulent = infected). Total output documented per shift.', rationale: 'Fluid characteristics indicate underlying cause. Sudden increase may indicate rebleeding.', frequency: 'Hourly (measurement); every shift (documentation)' },
      { id: 'i-chest-4', category: 'independent', action: 'Encourage deep breathing, coughing, and spirometry exercises. Assist with positioning (sitting upright or affected side down). Mobilise early.', rationale: 'Deep breathing promotes lung re-expansion and prevents atelectasis. Upright position increases pleural space drainage.', frequency: 'Every 2 hours' },
      { id: 'i-chest-5', category: 'independent', action: 'Monitor for complications: subcutaneous emphysema (crepitus), tension pneumothorax (sudden deterioration, tracheal deviation, absent breath sounds — EMERGENCY), infection (fever, purulent drainage).', rationale: 'Tension pneumothorax is a life-threatening emergency requiring immediate decompression.', frequency: 'Every shift; continuously if unstable' },
      { id: 'i-chest-6', category: 'independent', action: 'Dressing care: keep insertion site clean and dry. Occlusive dressing (petroleum gauze + adhesive). Change if soiled. Note any air leak through wound.', rationale: 'Occlusive dressing prevents air entry through the wound site.', frequency: 'Every 48 hours or when soiled' },
    ],
    evaluation: [
      { id: 'e-chest-1', expected: 'Drain patent with tidalling. Air leak resolving. Lung re-expanded on X-ray. SpO2 ≥ 94%.', status: 'met' },
      { id: 'e-chest-2', expected: 'No infection at insertion site. No subcutaneous emphysema. Patient mobilising and breathing comfortably.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Living with a Chest Drain',
        keyPoints: [
          'Keep the drainage bottle below your chest level at all times.',
          'Do not clamp or disconnect the tubing.',
          'Press the call button if you feel breathless or the bottle gets knocked over.',
          'Breathe deeply and cough regularly — this helps your lung re-expand.',
          'You may feel air moving under your skin — tell the nurse immediately.',
          'The drain will be removed once your lung has fully re-expanded.',
        ],
        method: 'Verbal',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Chest drain removed (chest X-ray confirms no recurrence)',
        'Wound site dressed after removal',
        'Post-removal chest X-ray completed',
        'Analgesia prescribed for post-removal pain',
        'Activity restrictions for 24–48 hours post-removal',
      ],
      followUp: 'Chest X-ray at 1 week post-removal. Respiratory clinic at 4–6 weeks. Smoking cessation if applicable. Physiotherapy for lung recovery.',
      referrals: ['Thoracic Surgery', 'Respiratory Medicine', 'Physiotherapy', 'Smoking Cessation'],
      warningSigns: [
        'Return of breathlessness',
        'Chest pain worsening',
        'Swelling or crepitus around the wound',
        'Fever or wound redness',
        'Drain falls out or disconnects',
      ],
    },
    complications: ['Tension pneumothorax (life-threatening)', 'Re-expansion pulmonary oedema', 'Infection (empyema, wound)', 'Blocked drain', 'Accidental removal', 'Subcutaneous emphysema', 'Organ injury (during insertion)', 'Recurrence of pneumothorax'],
  },

  // ═══════════════════════════════════════════════════════════════
  // CRITICAL CARE / ICU
  // ═══════════════════════════════════════════════════════════════

  'Mechanical Ventilation': {
    id: 'cp-mech-vent',
    disease: 'Mechanical Ventilation',
    specialty: 'Critical Care & ICU Nursing',
    overview: 'Mechanical ventilation is a life-sustaining intervention that replaces or supplements spontaneous breathing in patients with respiratory failure. It is indicated for acute respiratory distress syndrome (ARDS), severe pneumonia, post-operative respiratory failure, neuromuscular weakness, and cardiac arrest. Nursing care focuses on monitoring ventilator parameters, preventing ventilator-associated complications, and facilitating weaning.',
    pathophysiology: 'Mechanical ventilation delivers positive-pressure breaths via an endotracheal tube or tracheostomy. It improves oxygenation by increasing FiO₂ and PEEP, and assists ventilation by providing tidal volume or pressure support. Key complications include ventilator-associated pneumonia (VAP), barotrauma (pneumothorax), volutrauma, diaphragm atrophy, haemodynamic compromise (reduced venous return), and oxygen toxicity. Weaning failure occurs when the patient cannot sustain spontaneous breathing due to respiratory muscle fatigue, excessive secretions, or ongoing pathology.',
    commonCauses: ['ARDS', 'Severe pneumonia', 'Status asthmaticus', 'COPD exacerbation with respiratory failure', 'Post-operative respiratory failure', 'Neuromuscular disease (Guillain-Barré, myasthenia gravis)', 'Pulmonary oedema', 'Cardiac arrest (post-ROSC)', 'Sepsis-related respiratory failure'],
    riskFactors: ['Prolonged intubation (> 48 h)', 'Immunosuppression', 'Supine positioning', 'Poor oral hygiene', 'Enteral feeding', 'Sedation depth', 'Pre-existing COPD', 'Obesity', 'Advanced age'],
    subjectiveData: [
      'Patient unable to speak (intubated) — assess via writing, gestures, communication boards',
      'Report of dyspnoea or anxiety before intubation',
      'History of precipitating illness (pneumonia, ARDS, trauma, surgery)',
      'Pain assessment using BPS (Behavioral Pain Scale) or CPOT (Critical-Care Pain Observation Tool)',
    ],
    objectiveData: [
      'Ventilator parameters: mode (AC, SIMV, PSV), tidal volume (6–8 mL/kg IBW), respiratory rate (12–20), FiO₂, PEEP (5–15 cmH₂O), peak/plateau pressures',
      'Pulse oximetry (SpO₂ target 92–96%), arterial blood gas (pH, PaCO₂, PaO₂, HCO₃⁻, lactate)',
      'End-tidal CO₂ (EtCO₂) if capnography in use',
      'Chest X-ray: tube position, lung aeration, infiltrates, pneumothorax',
      'Secretion amount, colour, consistency; cuff pressure (20–25 cmH₂O)',
      'Haemodynamic status: HR, BP, CVP, fluid balance',
      'Sedation level: RASS (Richmond Agitation-Sedation Scale) target −2 to 0',
      'Glasgow Coma Scale (if not paralysed)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-mv-1',
        diagnosis: 'Impaired Gas Exchange related to ventilator dependence and underlying lung pathology as evidenced by abnormal ABGs and SpO₂',
        relatedFactors: ['Alveolar-capillary membrane damage', 'Ventilator-patient asynchrony', 'Secretion retention'],
        definingCharacteristics: ['SpO₂ < 92%', 'PaO₂ < 60 mmHg on FiO₂ > 0.5', 'PaCO₂ > 45 mmHg', 'Cyanosis', 'Altered respiratory pattern'],
      },
      {
        id: 'nd-mv-2',
        diagnosis: 'Risk for Ventilator-Associated Pneumonia related to endotracheal intubation and impaired airway clearance',
        definingCharacteristics: ['Endotracheal tube in situ', 'Impaired cough reflex', 'Supine positioning', 'Mechanical disruption of airway defences'],
      },
      {
        id: 'nd-mv-3',
        diagnosis: 'Impaired Verbal Communication related to endotracheal intubation',
        definingCharacteristics: ['Inability to speak', 'Frustration', 'Attempts to remove tube'],
      },
      {
        id: 'nd-mv-4',
        diagnosis: 'Risk for Disuse Syndrome related to immobility and sedation during mechanical ventilation',
        definingCharacteristics: ['Prolonged bed rest', 'Sedation and/or paralysis', 'Critical illness polyneuromyopathy'],
      },
    ],
    goals: [
      {
        id: 'g-mv-1',
        shortTerm: 'SpO₂ ≥ 92% on current ventilator settings. ABGs within acceptable range (pH 7.35–7.45, PaCO₂ 35–45, PaO₂ > 60). Patient synchronised with ventilator. Secretions managed.',
        longTerm: 'Successful extubation and return to spontaneous breathing. No ventilator-associated complications. Patient weaned from ventilator within expected timeframe.',
      },
    ],
    interventions: [
      { id: 'i-mv-1', category: 'independent', action: 'Monitor ventilator parameters hourly: mode, tidal volume, respiratory rate, FiO₂, PEEP, peak/plateau pressures. Titrate FiO₂ to maintain SpO₂ 92–96%. Alert team if plateau pressure > 30 cmH₂O or auto-PEEP detected.', rationale: 'Continuous monitoring prevents barotrauma and ensures adequate oxygenation/ventilation. Plateau pressure > 30 cmH₂O increases volutrauma risk.', frequency: 'Hourly minimum; continuous SpO₂' },
      { id: 'i-mv-2', category: 'independent', action: 'Perform regular ABG analysis and interpret: pH, PaCO₂, PaO₂, HCO₃⁻, lactate. Maintain permissive hypercapnia in ARDS (pH > 7.20) to allow lung-protective low tidal volume strategy.', rationale: 'ABGs guide ventilator adjustments. Permissive hypercapnia reduces ventilator-induced lung injury in ARDS.', frequency: 'Every 4–6 h; after ventilator changes; PRN' },
      { id: 'i-mv-3', category: 'independent', action: 'Implement VAP bundle: head-of-bed elevation 30–45°, daily sedation vacation and spontaneous breathing trial (SBT), oral care with chlorhexidine 0.12% every 6 h, DVT prophylaxis, peptic ulcer prophylaxis, subglottic secretion drainage.', rationale: 'VAP bundle reduces ventilator-associated pneumonia incidence by 40–60%. Head-of-bed elevation prevents aspiration.', frequency: 'Every shift; continuous HOB elevation' },
      { id: 'i-mv-4', category: 'independent', action: 'Assess and manage secretions: suction only when indicated (visible secretions, desaturation, peak pressure rise), use closed suction system, normal saline instillation NOT routinely recommended, perform mini-BAL if infection suspected.', rationale: 'Routine suctioning damages airway mucosa. Closed suction reduces VAP risk compared to open suction.', frequency: 'PRN; assess every 2 h' },
      { id: 'i-mv-5', category: 'independent', action: 'Manage sedation using RASS target −2 to 0. Implement daily sedation interruption (SAT) followed by SBT when patient meets readiness criteria (FiO₂ ≤ 40%, PEEP ≤ 8, haemodynamically stable, alert).', rationale: 'Lighter sedation reduces ventilation duration, ICU stay, and delirium. SBT is the gold standard for extubation readiness.', frequency: 'Daily SAT + SBT per protocol' },
      { id: 'i-mv-6', category: 'independent', action: 'Promote early mobilisation: passive ROM exercises when paralysed, active ROM and dangling when alert, sit-to-stand and ambulation when haemodynamically stable. Use ICU Liberation ABCDEF bundle.', rationale: 'Early mobilisation prevents ICU-acquired weakness, reduces ventilation duration, and improves functional outcomes.', frequency: 'Daily; per physiotherapy assessment' },
      { id: 'i-mv-7', category: 'collaborative', action: 'Facilitate communication: provide communication board, writing materials, picture cards. Acknowledge patient\'s attempts to communicate. Explain procedures before performing them.', rationale: 'Intubated patients experience anxiety and frustration from inability to communicate. Communication aids reduce distress.', frequency: 'Ongoing; every interaction' },
      { id: 'i-mv-8', category: 'dependent', action: 'Administer prescribed sedatives (propofol, midazolam, dexmedetomidine) and analgesics (fentanyl, morphine) titrated to RASS and pain scores. Avoid over-sedation.', rationale: 'Adequate analgesia before sedation ("analgesia-first" approach) reduces total sedative requirements and delirium risk.', frequency: 'Per prescription; titrate per RASS/pain scores' },
      { id: 'i-mv-9', category: 'independent', action: 'Monitor for complications: pneumothorax (sudden desaturation, decreased breath sounds, increased peak pressure), haemodynamic instability (hypotension from PEEP), self-extubation, tube displacement, tracheal erosion.', rationale: 'Vigilant monitoring enables early detection and intervention for life-threatening complications.', frequency: 'Continuous monitoring; assessment every 1–2 h' },
    ],
    evaluation: [
      { id: 'e-mv-1', expected: 'SpO₂ ≥ 92%, ABGs within target. Patient synchronised with ventilator. Secretions manageable.', status: 'met' },
      { id: 'e-mv-2', expected: 'No VAP episode. Successful extubation or SBT passed. No barotrauma or self-extubation.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Ventilator Care & Communication',
        keyPoints: [
          'You are connected to a machine that helps you breathe. It is temporary.',
          'We will try to wake you regularly and help you communicate (writing board, gestures).',
          'Try to relax and breathe with the machine — do not fight the ventilator.',
          'We will raise the head of your bed to help your breathing and prevent infection.',
          'Daily "breathing trials" will test if you are ready to come off the ventilator.',
          'You may feel anxious — this is normal. Tell us how you are feeling.',
        ],
        method: 'Verbal communication (when able), written materials for family, visual aids',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Successful extubation documented',
        'Post-extubation monitoring (stridor, respiratory rate, SpO₂) for 24–48 h',
        'Speech and language therapy assessment (post-extubation voice/swallowing)',
        'Weaning plan documented if still ventilated',
        'Physiotherapy referral for rehabilitation',
        'Family updated on ventilator course and weaning progress',
      ],
      followUp: 'ICU follow-up clinic at 4–6 weeks. Pulmonology review if ongoing respiratory issues. Cognitive and psychological screening for post-ICU syndrome.',
      referrals: ['Speech and Language Therapy', 'Physiotherapy', 'Psychology (post-ICU PTSD/depression)', 'Pulmonology', 'Nutrition/Dietetics'],
      warningSigns: [
        'Stridor or increased work of breathing after extubation',
        'Drooling or inability to swallow',
        'SpO₂ dropping below 92% on room air',
        'New confusion or agitation',
        'Sudden chest pain or desaturation (pneumothorax risk)',
      ],
    },
    complications: ['Ventilator-associated pneumonia (VAP)', 'Barotrauma / pneumothorax', 'Volutrauma', 'Oxygen toxicity', 'Diaphragm atrophy', 'ICU-acquired weakness', 'Delirium', 'Self-extubation', 'Tracheal stenosis (late)', 'Post-ICU syndrome (PTSD, depression, cognitive impairment)'],
  },

  'ARDS': {
    id: 'cp-ards',
    disease: 'ARDS',
    specialty: 'Critical Care & ICU Nursing',
    overview: 'Acute Respiratory Distress Syndrome (ARDS) is a severe form of acute lung injury characterised by diffuse alveolar damage, non-cardiogenic pulmonary oedema, and refractory hypoxaemia. It is classified by the Berlin definition (mild, moderate, severe) based on PaO₂/FiO₂ ratio. Nursing care centres on lung-protective ventilation, prone positioning, fluid management, and prevention of complications.',
    pathophysiology: 'ARDS results from direct lung injury (pneumonia, aspiration, inhalation) or indirect lung injury (sepsis, pancreatitis, trauma). The inflammatory cascade damages the alveolar-capillary membrane, increasing permeability and causing protein-rich oedema fluid to flood the alveoli. Surfactant dysfunction leads to alveolar collapse (atelectasis). The result is intrapulmonary shunting, refractory hypoxaemia, and reduced lung compliance. The exudative phase (days 1–7) is followed by a proliferative phase (days 7–21) and potentially fibrotic phase (> 21 days).',
    commonCauses: ['Sepsis (most common, 40%)', 'Pneumonia (direct lung injury)', 'Aspiration of gastric contents', 'Trauma / major surgery', 'Pancreatitis', 'Multiple blood transfusions (TRALI)', 'Inhalation injury', 'Near-drowning', 'Drug overdose'],
    riskFactors: ['Sepsis', 'Major trauma', 'High-risk surgery (cardiac, abdominal)', 'Multiple transfusions', 'Aspiration risk (GCS < 8, NG tube)', 'Obesity', 'Diabetes', 'Chronic lung disease', 'Alcohol use disorder'],
    subjectiveData: [
      'Acute onset dyspnoea (hours to days)',
      'Patient unable to describe symptoms if sedated — use surrogate markers (haemodynamic changes, ventilator resistance)',
      'History of precipitating event (sepsis, pneumonia, trauma, surgery)',
    ],
    objectiveData: [
      'PaO₂/FiO₂ ratio: mild (200–300), moderate (100–200), severe (< 100) (with PEEP ≥ 5 cmH₂O)',
      'Bilateral pulmonary infiltrates on chest X-ray (not fully explained by effusions, atelectasis, or nodules)',
      'SpO₂ < 92% despite FiO₂ ≥ 0.5',
      'Reduced lung compliance (plateau pressure > 30 cmH₂O if not paralysed)',
      'PEEP requirement > 10 cmH₂O to maintain oxygenation',
      'FiO₂ requirement > 0.6',
      'Fluid balance: positive in acute phase',
      'Lactate, CRP, procalcitonin (infection screen)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-ards-1',
        diagnosis: 'Impaired Gas Exchange related to alveolar-capillary membrane damage and pulmonary oedema as evidenced by refractory hypoxaemia',
        relatedFactors: ['Alveolar flooding', 'Surfactant dysfunction', 'Intrapulmonary shunting', 'V/Q mismatch'],
        definingCharacteristics: ['SpO₂ < 90% on high FiO₂', 'PaO₂/FiO₂ < 200', 'Cyanosis', 'Tachypnoea', 'Bilateral infiltrates'],
      },
      {
        id: 'nd-ards-2',
        diagnosis: 'Risk for Deficient Fluid Volume related to fluid restriction and diuretic therapy',
        definingCharacteristics: ['Positive fluid balance', 'Oedema', 'Fluid restriction ordered'],
      },
      {
        id: 'nd-ards-3',
        diagnosis: 'Risk for Infection related to invasive monitoring, mechanical ventilation, and immunosuppression',
        definingCharacteristics: ['Endotracheal tube', 'Central venous access', 'Immunocompromised state'],
      },
    ],
    goals: [
      {
        id: 'g-ards-1',
        shortTerm: 'PaO₂/FiO₂ ratio improving. SpO₂ ≥ 92% on FiO₂ ≤ 0.6. Plateau pressure ≤ 30 cmH₂O. Fluid balance neutral or negative.',
        longTerm: 'Lung injury resolving. Successful weaning from ventilator. No VAP or other complications. Alive at 28 days.',
      },
    ],
    interventions: [
      { id: 'i-ards-1', category: 'independent', action: 'Implement lung-protective ventilation: tidal volume 4–6 mL/kg IBW, plateau pressure ≤ 30 cmH₂O, permissive hypercapnia (pH > 7.20), FiO₂ titrated to SpO₂ 88–95% (conservative oxygenation target in ARDS).', rationale: 'Low tidal volume ventilation reduces mortality in ARDS by 22% (ARDSNet trial). Plateau pressure > 30 cmH₂O causes barotrauma.', frequency: 'Continuous ventilator monitoring; reassess every 2 h' },
      { id: 'i-ards-2', category: 'independent', action: 'Position patient prone for 16–24 h/day if PaO₂/FiO₂ < 150 on FiO₂ ≥ 0.6 and PEEP ≥ 10. Ensure all lines secured, eyes protected, pressure points padded. Monitor for facial oedema and pressure injuries.', rationale: 'Prone positioning improves V/Q matching, reduces dorsal atelectasis, and reduces mortality in severe ARDS (PROSEVA trial).', frequency: '16–24 h daily until PaO₂/FiO₂ > 150 on FiO₂ ≤ 0.6' },
      { id: 'i-ards-3', category: 'independent', action: 'Implement conservative fluid strategy after initial resuscitation: target CVP < 4 mmH₂O, negative fluid balance with furosemide. Monitor fluid balance strictly (input/output every hour). Weigh daily.', rationale: 'Conservative fluid management reduces ventilation duration and lung injury severity in ARDS (FACTT trial). Positive balance worsens oxygenation.', frequency: 'Hourly I&O; daily weight; CVP monitoring' },
      { id: 'i-ards-4', category: 'independent', action: 'Monitor for and manage complications: barotrauma (sudden desaturation, absent breath sounds → needle decompression), ventilator dyssynchrony, auto-PEEP, haemodynamic compromise from prone positioning.', rationale: 'ARDS patients are at high risk for multiple complications. Early detection enables timely intervention.', frequency: 'Continuous monitoring; assessment every 1–2 h' },
      { id: 'i-ards-5', category: 'collaborative', action: 'Collaborate with medical team on: neuromuscular blockade (cisatracurium) for first 48 h if PaO₂/FiO₂ < 150, prone positioning protocol, ECMO referral if refractory hypoxaemia (PaO₂/FiO₂ < 80 despite optimal therapy).', rationale: 'Early neuromuscular blockade reduces ventilator dyssynchrony and oxygen consumption. ECMO is rescue therapy for refractory ARDS.', frequency: 'Per protocol and medical team guidance' },
      { id: 'i-ards-6', category: 'independent', action: 'Implement sedation protocol targeting light sedation (RASS 0 to −2) with daily SAT. Use analgesia-first approach. Monitor for delirium using CAM-ICU every shift.', rationale: 'Light sedation reduces ventilation duration, ICU stay, and delirium. Daily SAT improves extubation success.', frequency: 'Continuous RASS monitoring; CAM-ICU every 8–12 h' },
    ],
    evaluation: [
      { id: 'e-ards-1', expected: 'PaO₂/FiO₂ improving. SpO₂ ≥ 92% on reduced FiO₂. Plateau pressure ≤ 30. Fluid balance negative.', status: 'met' },
      { id: 'e-ards-2', expected: 'No VAP, barotrauma, or prone-positioning complications. Successful weaning trajectory.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'ARDS Recovery',
        keyPoints: [
          'ARDS is a severe lung condition, but recovery is possible.',
          'You may be placed face-down (prone) to help your lungs — this is normal and safe.',
          'We are using a ventilator to rest your lungs while they heal.',
          'Recovery can take weeks to months. Fatigue and weakness are common after ICU.',
          'Follow-up with a respiratory specialist will be arranged.',
          'Psychological support is available — many ICU survivors experience anxiety or low mood.',
        ],
        method: 'Verbal (when able), family communication, written recovery guide',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Successful extubation or tracheostomy for long-term ventilation',
        'Weaning protocol in place',
        'Physiotherapy and rehabilitation plan initiated',
        'Post-ICU follow-up clinic appointment scheduled',
        'Psychological screening planned (PTSD, depression)',
        'Family counselled on recovery timeline',
      ],
      followUp: 'ICU follow-up clinic at 4–6 weeks. Pulmonology review. Pulmonary function tests at 3 and 12 months. Neuropsychological assessment if cognitive symptoms.',
      referrals: ['Pulmonology', 'Physiotherapy', 'Psychology/Psychiatry', 'Occupational Therapy', 'Speech and Language Therapy', 'Nutrition'],
      warningSigns: [
        'Worsening breathlessness after discharge',
        'New fever or productive cough',
        'Persistent cough or wheeze',
        'Inability to exercise or perform ADLs',
        'Flashbacks, nightmares, or severe anxiety',
      ],
    },
    complications: ['Ventilator-associated pneumonia', 'Barotrauma (pneumothorax)', 'Pulmonary fibrosis (late)', 'ICU-acquired weakness', 'Delirium', 'ARDS recurrence', 'Multi-organ failure', 'Death (mortality 30–50%)'],
  },

  'Sepsis Management': {
    id: 'cp-sepsis-icu',
    disease: 'Sepsis Management',
    specialty: 'Critical Care & ICU Nursing',
    overview: 'Sepsis is a life-threatening organ dysfunction caused by a dysregulated host response to infection. It is a medical emergency requiring rapid recognition and the implementation of the Hour-1 Bundle (fluid resuscitation, blood cultures, lactate, broad-spectrum antibiotics, vasopressors if hypotensive). This care plan focuses on ICU-level sepsis management including haemodynamic support, organ perfusion, and source control.',
    pathophysiology: 'Infection triggers a systemic inflammatory response. Pro-inflammatory cytokines (TNF-α, IL-1, IL-6) cause vasodilation, increased capillary permeability, and endothelial dysfunction. This leads to distributive shock (warm shock initially), microcirculatory failure, and organ hypoperfusion. The coagulation cascade is activated (DIC risk). Mitochondrial dysfunction impairs cellular oxygen use (cytopathic hypoxia). Septic shock (vasopressor requirement + lactate > 2 mmol/L despite fluids) carries 40% mortality.',
    commonCauses: ['Pneumonia (most common source)', 'Urinary tract infection', 'Intra-abdominal infection', 'Skin/soft tissue infection', 'Line-related infection', 'Meningitis', 'Endocarditis', 'Unknown source (30%)'],
    riskFactors: ['Extremes of age (< 2 months, > 65 years)', 'Immunosuppression (HIV, chemotherapy, transplant, steroids)', 'Chronic disease (diabetes, liver disease, renal disease)', 'Invasive devices (catheters, ventilators, IV lines)', 'Recent surgery or trauma', 'Malnutrition', 'Indwelling urinary catheter', 'Prolonged ICU stay'],
    subjectiveData: [
      'Altered mental status (new confusion, agitation, or reduced GCS)',
      'Rigors or chills',
      'Pain at infection site',
      'Dyspnoea',
      'Patient unable to communicate if sedated — rely on clinical signs and surrogate markers',
    ],
    objectiveData: [
      'Sepsis-3 criteria: suspected infection + SOFA score increase ≥ 2',
      'Vital signs: fever > 38.3°C or hypothermia < 36°C, tachycardia > 90, tachypnoea > 20 or PaCO₂ < 32 mmHg, hypotension (SBP < 90 or MAP < 65)',
      'Lactate > 2 mmol/L (elevated) or > 4 mmol/L (severe)',
      'Blood cultures (at least 2 sets) before antibiotics',
      'Procalcitonin, CRP, WCC, neutrophil count',
      'Organ function: creatinine, bilirubin, platelets, INR, PaO₂/FiO₂',
      'Urine output < 0.5 mL/kg/h (renal hypoperfusion)',
      'Mottled skin, prolonged capillary refill > 3 s',
      'Echocardiography if septic shock (assess cardiac function)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-sepsis-icu-1',
        diagnosis: 'Ineffective Peripheral Tissue Perfusion related to distributive shock and vasodilation as evidenced by hypotension, raised lactate, and mottled skin',
        relatedFactors: ['Vasodilation', 'Capillary leak', 'Microcirculatory failure', 'Myocardial dysfunction'],
        definingCharacteristics: ['MAP < 65 mmHg', 'Lactate > 2 mmol/L', 'Urine output < 0.5 mL/kg/h', 'Mottled skin', 'Prolonged capillary refill'],
      },
      {
        id: 'nd-sepsis-icu-2',
        diagnosis: 'Risk for Infection Progression related to inadequate source control and immune dysfunction',
        definingCharacteristics: ['Source not controlled', 'Immunocompromised', 'Device-related infection'],
      },
      {
        id: 'nd-sepsis-icu-3',
        diagnosis: 'Deficient Knowledge (family) related to complex critical illness and treatment',
        definingCharacteristics: ['Family unable to describe condition', 'Multiple questions about prognosis', 'Emotional distress'],
      },
    ],
    goals: [
      {
        id: 'g-sepsis-icu-1',
        shortTerm: 'Hour-1 Bundle completed within 1 hour of sepsis recognition. MAP ≥ 65 mmHg with/without vasopressors. Lactate trending down. Urine output ≥ 0.5 mL/kg/h. Source identified and controlled.',
        longTerm: 'Sepsis resolved. Vasopressors weaned. Organ function recovered (SOFA score improving). Patient alive and free of organ support.',
      },
    ],
    interventions: [
      { id: 'i-sepsis-icu-1', category: 'collaborative', action: 'Activate Sepsis Bundle on recognition: (1) Measure lactate, (2) Obtain blood cultures × 2 before antibiotics, (3) Administer broad-spectrum antibiotics within 1 hour, (4) Give 30 mL/kg crystalloid for hypotension or lactate ≥ 4, (5) Start vasopressors (noradrenaline first-line) if MAP < 65 mmHg after fluids.', rationale: 'Each hour of antibiotic delay increases mortality by 7.6%. The Hour-1 Bundle is the evidence-based standard of care.', frequency: 'Immediate on sepsis recognition; document time of each element' },
      { id: 'i-sepsis-icu-2', category: 'dependent', action: 'Administer broad-spectrum antibiotics as prescribed (e.g., piperacillin-tazobactam, meropenem, vancomycin + cefepime). Ensure correct dose, route, and timing. Reassess at 48–72 h for de-escalation based on culture results.', rationale: 'Early appropriate antibiotics are the single most important intervention in sepsis. De-escalation reduces resistance.', frequency: 'Within 1 hour of recognition; reassess at 48–72 h' },
      { id: 'i-sepsis-icu-3', category: 'independent', action: 'Monitor haemodynamics continuously: arterial line for beat-to-beat BP, CVP, ScvO₂ (target ≥ 70%). Titrate noradrenaline to MAP ≥ 65 mmHg. Add vasopressin (0.03 U/min fixed) if noradrenaline > 0.25 μg/kg/min. Consider dobutamine if ScvO₂ < 70% despite adequate MAP.', rationale: 'Noradrenaline is first-line vasopressor in septic shock. Vasopressin reduces noradrenaline dose. ScvO₂ < 70% suggests inadequate oxygen delivery.', frequency: 'Continuous haemodynamic monitoring; titrate vasopressors as needed' },
      { id: 'i-sepsis-icu-4', category: 'independent', action: 'Perform source control assessment: identify and address the infection source within 6–12 h (drainage of abscess, debridement of necrotic tissue, removal of infected devices, surgical intervention). Coordinate with surgical team.', rationale: 'Source control is essential. Delayed source control increases mortality. Remove any potentially infected device.', frequency: 'Within 6–12 h of sepsis recognition; ongoing assessment' },
      { id: 'i-sepsis-icu-5', category: 'independent', action: 'Monitor organ function hourly: urine output (catheter), GCS/mental status, lactate clearance (repeat every 2–4 h), respiratory function (SpO₂, ABGs), coagulation (INR, platelets), liver function (bilirubin). Use SOFA score to track trajectory.', rationale: 'SOFA score trajectory guides prognosis and treatment intensity. Lactate clearance > 20% at 6 h is associated with survival.', frequency: 'Lactate every 2–4 h; SOFA daily; organ function continuous/ hourly' },
      { id: 'i-sepsis-icu-6', category: 'independent', action: 'Implement sepsis nursing care bundle: glucose control (target 6–10 mmol/L), DVT prophylaxis, stress ulcer prophylaxis, early nutrition (enteral preferred), mobilisation when stable, oral care, eye care, skin care.', rationale: 'Bundled supportive care reduces complications and improves outcomes in sepsis. Glycaemic control reduces infection risk.', frequency: 'Every shift; per unit protocol' },
      { id: 'i-sepsis-icu-7', category: 'independent', action: 'Communicate with family: provide regular updates on condition, treatment plan, and prognosis. Use clear, empathetic language. Involve family in care decisions. Offer spiritual and psychological support.', rationale: 'Families of sepsis patients experience significant psychological distress. Transparent communication improves satisfaction and trust.', frequency: 'At least daily; more frequently during acute deterioration' },
    ],
    evaluation: [
      { id: 'e-sepsis-icu-1', expected: 'Hour-1 Bundle completed. MAP ≥ 65 on decreasing vasopressor dose. Lactate clearing (> 20% reduction). Urine output normalised. Source controlled.', status: 'met' },
      { id: 'e-sepsis-icu-2', expected: 'SOFA score improving. Organ function recovering. Vasopressors weaned off. Patient alive and extubated (or weaning).', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Understanding Sepsis (for Family)',
        keyPoints: [
          'Sepsis is a life-threatening response to infection that can affect any organ.',
          'Treatment involves powerful antibiotics, fluids, and sometimes vasopressors to support blood pressure.',
          'Recovery can take weeks to months. Many patients experience ongoing fatigue, weakness, and cognitive changes (post-sepsis syndrome).',
          'It is normal to feel overwhelmed. Our team is here to support you.',
          'Ask questions at any time — there are no silly questions.',
          'After discharge, follow all medication and appointment instructions carefully.',
        ],
        method: 'Verbal, written sepsis recovery guide, family meetings',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Vasopressors discontinued for ≥ 24 h',
        'Antibiotics completed or transitioned to oral',
        'Organ function stable (renal, hepatic, respiratory)',
        'Infection source controlled',
        'Nutritional status assessed',
        'Rehabilitation plan in place',
        'Post-sepsis follow-up clinic booked',
        'Family educated on post-sepsis syndrome',
      ],
      followUp: 'Sepsis follow-up clinic at 4–6 weeks. GP review at 1 week. Screen for post-sepsis syndrome (fatigue, cognitive impairment, PTSD, depression). Bloods at 2 weeks (CRP, renal, liver).',
      referrals: ['Infectious Diseases', 'Physiotherapy', 'Occupational Therapy', 'Psychology', 'Nutrition/Dietetics', 'GP'],
      warningSigns: [
        'Fever or chills returning',
        'Worsening confusion or new neurological symptoms',
        'Worsening breathlessness',
        'Redness, swelling, or discharge from wound or line site',
        'Unable to eat or drink',
        'Severe fatigue preventing normal activities',
      ],
    },
    complications: ['Septic shock (40% mortality)', 'Multi-organ dysfunction syndrome (MODS)', 'DIC (disseminated intravascular coagulation)', 'ARDS', 'Acute kidney injury', 'Hepatic dysfunction', 'Ileus', 'Critical illness polyneuropathy', 'Post-sepsis syndrome', 'Death'],
  },

  'Multi-Organ Dysfunction': {
    id: 'cp-mods',
    disease: 'Multi-Organ Dysfunction',
    specialty: 'Critical Care & ICU Nursing',
    overview: 'Multi-Organ Dysfunction Syndrome (MODS) is the progressive, potentially irreversible dysfunction of two or more organ systems following a critical illness or insult. It is the leading cause of death in ICUs. Management is supportive, focusing on organ-specific interventions while treating the underlying cause. Nursing care is complex and requires continuous monitoring, anticipating deterioration, and coordinating multidisciplinary interventions.',
    pathophysiology: 'MODS can be primary (direct organ injury, e.g., crush injury to kidneys) or secondary (dysregulation of systemic inflammation, e.g., sepsis-induced). The systemic inflammatory response syndrome (SIRS) triggers a cascade of cytokine release, endothelial damage, microcirculatory failure, and mitochondrial dysfunction. Organs fail sequentially, typically starting with the lungs (ARDS), then kidneys (AKI), liver (ischaemic hepatitis), haematological system (DIC), and GI tract (stress ulcers, ileus). Mortality increases by 15–20% per additional organ system failing.',
    commonCauses: ['Sepsis (most common cause)', 'Major trauma', 'Burns > 40% TBSA', 'Prolonged cardiogenic shock', 'Acute pancreatitis', 'Post-cardiac arrest', 'Massive blood transfusion', 'Drug overdose (multi-organ)'],
    riskFactors: ['Advanced age', 'Pre-existing organ dysfunction', 'Immunosuppression', 'Severity of initial insult (APACHE II > 25)', 'Delayed resuscitation', 'Persistent infection or inflammation', 'Malnutrition', 'Multiple blood transfusions'],
    subjectiveData: [
      'Unable to self-report if sedated or encephalopathic',
      'History of progressive organ dysfunction over 24–72 h',
      'Family report of deteriorating condition',
      'Documentation of Sequential Organ Failure Assessment (SOFA) score trajectory',
    ],
    objectiveData: [
      'SOFA score ≥ 2 organ systems with dysfunction',
      'Respiratory: PaO₂/FiO₂ < 300, mechanical ventilation required',
      'Renal: Creatinine > 2 mg/dL or urine output < 0.5 mL/kg/h, renal replacement therapy',
      'Hepatic: Bilirubin > 2 mg/dL, INR > 1.5, transaminases elevated',
      'Haematological: Platelets < 100,000, INR > 1.5, DIC (schistocytes on film)',
      'Cardiovascular: Vasopressor requirement, MAP < 65 despite fluids',
      'Neurological: GCS < 15 (non-seizure), encephalopathy',
      'GI: Ileus, stress ulcer bleeding, elevated liver enzymes',
      'Metabolic: Lactate > 2 mmol/L, pH < 7.35, glucose dysregulation',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-mods-1',
        diagnosis: 'Decreased Cardiac Output related to myocardial depression and vasodilation as evidenced by hypotension and vasopressor requirement',
        relatedFactors: ['Myocardial dysfunction', 'Vasodilation', 'Hypovolaemia', 'Acidosis'],
        definingCharacteristics: ['MAP < 65 mmHg', 'Vasopressor dependent', 'Tachycardia', 'Low ScvO₂', 'Elevated lactate'],
      },
      {
        id: 'nd-mods-2',
        diagnosis: 'Impaired Gas Exchange related to ARDS and fluid overload as evidenced by requiring mechanical ventilation with high FiO₂/PEEP',
        relatedFactors: ['Pulmonary oedema', 'Alveolar damage', 'Atelectasis', 'Infection'],
        definingCharacteristics: ['PaO₂/FiO₂ < 200', 'FiO₂ > 0.6', 'PEEP > 10', 'Bilateral infiltrates'],
      },
      {
        id: 'nd-mods-3',
        diagnosis: 'Risk for Acute Kidney Injury related to renal hypoperfusion and nephrotoxic insults',
        definingCharacteristics: ['Rising creatinine', 'Oliguria', 'Nephrotoxic drugs in use', 'Vasopressor dependent'],
      },
      {
        id: 'nd-mods-4',
        diagnosis: 'Risk for Bleeding related to DIC and coagulopathy',
        definingCharacteristics: ['Elevated INR', 'Low platelets', 'Schistocytes on blood film', 'Oozing from puncture sites'],
      },
    ],
    goals: [
      {
        id: 'g-mods-1',
        shortTerm: 'Haemodynamic stability achieved (MAP ≥ 65) on decreasing vasopressor support. Oxygenation maintained. Urine output ≥ 0.5 mL/kg/h. Coagulopathy corrected. Underlying cause treated.',
        longTerm: 'Organ function recovering (SOFA score declining). Vasopressors and organ supports weaned. Patient alive with reasonable prognosis. Transition to rehabilitation.',
      },
    ],
    interventions: [
      { id: 'i-mods-1', category: 'independent', action: 'Perform comprehensive SOFA scoring every 12–24 h. Track trajectory — rising score indicates deterioration, declining score indicates improvement. Document organ-specific interventions and responses.', rationale: 'SOFA score trajectory is the best predictor of outcomes in MODS. It guides treatment intensity and goals-of-care discussions.', frequency: 'Every 12–24 h; more frequently if deteriorating' },
      { id: 'i-mods-2', category: 'independent', action: 'Provide organ-specific supportive care: (1) Lungs — lung-protective ventilation, prone positioning if ARDS, (2) Kidneys — fluid balance, avoid nephrotoxins, RRT when indicated, (3) Liver — avoid hepatotoxins, manage encephalopathy, (4) Haematological — blood product support, DIC management, (5) CV — vasopressors, fluid optimisation.', rationale: 'MODS requires simultaneous management of multiple organ failures. Each organ system needs targeted interventions.', frequency: 'Continuous monitoring; organ-specific assessments per protocol' },
      { id: 'i-mods-3', category: 'independent', action: 'Optimise perfusion: target MAP ≥ 65 mmHg, ScvO₂ ≥ 70%, lactate clearance > 20% per 6 h. Use fluid challenge (250 mL crystalloid over 15 min) and assess response. If fluid-refractory, escalate vasopressors (noradrenaline → vasopressin → adrenaline).', rationale: 'Adequate perfusion is the cornerstone of MODS management. Lactate clearance guides resuscitation adequacy.', frequency: 'Continuous haemodynamic monitoring; fluid challenges as needed' },
      { id: 'i-mods-4', category: 'independent', action: 'Implement strict infection prevention: aseptic technique for all invasive procedures, daily review of line necessity (remove when no longer needed), oral care with chlorhexidine, catheter care, ventilator bundle, hand hygiene compliance.', rationale: 'Hospital-acquired infections are the leading cause of secondary MODS and death in the ICU. Line removal is the most effective infection prevention.', frequency: 'Ongoing; daily line review' },
      { id: 'i-mods-5', category: 'collaborative', action: 'Coordinate multidisciplinary care: daily rounds with ICU consultant, nursing, pharmacy, physiotherapy, nutrition, and social work. Ensure clear communication between teams. Document goals and plans clearly.', rationale: 'MODS requires complex, coordinated care. Multidisciplinary rounding improves communication, reduces errors, and aligns goals.', frequency: 'Daily multidisciplinary rounds' },
      { id: 'i-mods-6', category: 'independent', action: 'Support family through critical illness: provide honest, compassionate updates. Discuss prognosis realistically. Involve family in goals-of-care discussions. Arrange family meetings with the ICU team. Provide psychological and spiritual support.', rationale: 'MODS carries high mortality (50–80% with > 3 organs). Families need clear communication and support for decision-making.', frequency: 'Daily updates; formal family meetings at least weekly' },
    ],
    evaluation: [
      { id: 'e-mods-1', expected: 'SOFA score stable or declining. Haemodynamically stable on decreasing vasopressors. Oxygenation improving. Urine output adequate. No new organ failure.', status: 'met' },
      { id: 'e-mods-2', expected: 'Underlying cause treated. No nosocomial infections. Family informed and involved in care decisions.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Understanding Multi-Organ Failure (for Family)',
        keyPoints: [
          'Multiple organs are not working properly. This is a very serious condition.',
          'We are supporting each organ system while treating the cause.',
          'The ventilator helps your loved one breathe. Vasopressors support blood pressure. Dialysis may be needed if the kidneys fail.',
          'Recovery is possible but may take a very long time. Some effects may be permanent.',
          'We will provide regular updates and involve you in all decisions.',
          'Counselling and support are available for you and your family.',
        ],
        method: 'Verbal updates, written information, family meetings with ICU team',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Organ function stable or improving',
        'Underlying cause treated or controlled',
        'Vasopressors discontinued',
        'Ventilator weaned or weaning protocol in place',
        'Rehabilitation plan initiated',
        'Family meetings completed',
        'Goals-of-care discussions documented',
        'Post-ICU follow-up arranged',
      ],
      followUp: 'ICU follow-up clinic at 4–6 weeks. Specialist reviews per affected organs (renal, hepatic, respiratory). Functional assessment. Psychological screening. Long-term rehabilitation plan.',
      referrals: ['ICU Follow-up Clinic', 'Physiotherapy', 'Occupational Therapy', 'Psychology', 'Nephrology (if RRT)', 'Hepatology (if liver failure)', 'Palliative Care (if appropriate)'],
      warningSigns: [
        'Worsening organ function after initial improvement',
        'New infection or fever',
        'Bleeding from any site',
        'Worsening confusion or consciousness',
        'Inability to wean from organ support',
      ],
    },
    complications: ['Progressive organ failure', 'Hospital-acquired infections', 'DIC and bleeding', 'ICU-acquired weakness', 'Delirium and cognitive impairment', 'Death (mortality 50–80% with ≥ 3 organ failures)', 'Post-ICU syndrome', 'Chronic organ dysfunction (renal, pulmonary)'],
  },

  // ═══════════════════════════════════════════════════════════════
  // BURNS CARE
  // ═══════════════════════════════════════════════════════════════

  'Minor Burns': {
    id: 'cp-minor-burns',
    disease: 'Minor Burns',
    specialty: 'Burns Care',
    overview: 'Minor burns are defined as partial-thickness burns affecting < 15% TBSA in adults (< 10% in children/elderly), or superficial burns of any size without involvement of critical areas (face, hands, feet, genitalia, major joints). Management includes pain control, wound care, infection prevention, and patient education. Most minor burns heal without surgery.',
    pathophysiology: 'Burn injury causes coagulative necrosis of skin layers. Superficial burns (epidermis only) are red and painful. Superficial partial-thickness burns (into papillary dermis) form blisters and are very painful. Deep partial-thickness burns (into reticular dermis) appear pale/waxy and may require surgical intervention. The inflammatory response causes oedema, pain, and increased infection risk. Burn wound conversion occurs in the first 48–72 h (zone of stasis may progress to necrosis if poorly managed).',
    commonCauses: ['Scalds (hot liquids, most common in children)', 'Flame burns', 'Contact burns (hot surfaces)', 'Electrical burns (minor)', 'Chemical burns (minor, after irrigation)', 'Sunburn'],
    riskFactors: ['Diabetes (impaired healing)', 'Peripheral neuropathy (reduced pain perception)', 'Extremes of age', 'Immunosuppression', 'Pre-existing skin conditions', 'Smoking', 'Poor nutrition', 'Delayed presentation'],
    subjectiveData: [
      'Pain at burn site (severity 1–10, character, timing)',
      'Sensation of heat or burning at time of injury',
      'Mechanism of injury (scald, flame, contact, chemical)',
      'Duration of exposure',
      'First aid already provided',
      'Tetanus status',
      'Allergies (especially to dressings or topical agents)',
    ],
    objectiveData: [
      'Burn depth: superficial (red, painful, no blisters), superficial partial-thickness (blisters, wet, very painful), deep partial-thickness (pale, waxy, reduced pain)',
      'Burn size: Rule of Nines (adults: head 9%, each arm 9%, anterior trunk 18%, posterior trunk 18%, each leg 18%, perineum 1%) or Lund-Browder chart (more accurate for children)',
      'Location: critical areas (face, hands, feet, genitalia, joints)',
      'Signs of infection: erythema spreading beyond burn margin, purulent discharge, malodor, fever, increasing pain',
      'Wound bed: moist, dry, blistered, necrotic',
      'Surrounding skin: maceration, erythema',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-burns-minor-1',
        diagnosis: 'Acute Pain related to thermal tissue damage and wound dressing procedures',
        relatedFactors: ['Tissue destruction', 'Nerve ending exposure', 'Inflammatory mediators', 'Dressing changes'],
        definingCharacteristics: ['Verbal pain report', 'Guarding', 'Facial grimacing', 'Tachycardia', 'Refusal to allow wound care'],
      },
      {
        id: 'nd-burns-minor-2',
        diagnosis: 'Risk for Infection related to disrupted skin barrier and burn wound',
        definingCharacteristics: ['Open wound', 'Loss of skin barrier', 'Devitalised tissue', 'Possible immunosuppression'],
      },
      {
        id: 'nd-burns-minor-3',
        diagnosis: 'Impaired Skin Integrity related to thermal injury as evidenced by burn wound',
        relatedFactors: ['Thermal injury', 'Epidermal/dermal destruction'],
        definingCharacteristics: ['Redness, blistering, or necrosis', 'Open wound', 'Exudate'],
      },
    ],
    goals: [
      {
        id: 'g-burns-minor-1',
        shortTerm: 'Pain controlled (≤ 3/10 at rest, ≤ 5/10 during dressing change). Wound clean, no signs of infection. Appropriate dressing applied. Tetanus status up to date.',
        longTerm: 'Wound fully healed (re-epithelialised). No scarring requiring intervention. Patient/caregiver can manage wound care at home. Prevention strategies understood.',
      },
    ],
    interventions: [
      { id: 'i-burns-minor-1', category: 'independent', action: 'Assess burn using: mechanism, depth (superficial, superficial partial, deep partial), size (% TBSA using Rule of Nines or Lund-Browder), location (critical areas), and patient factors (age, comorbidities). Document and photograph.', rationale: 'Accurate burn assessment determines management plan. Depth and size guide dressing selection and whether referral is needed.', frequency: 'Initial assessment; at every dressing change' },
      { id: 'i-burns-minor-2', category: 'independent', action: 'Manage pain: administer paracetamol 1 g QDS ± ibuprofen 400 mg TDS (if no contraindications). For dressing changes, give simple analgesia 30 min before. Consider codeine for moderate-severe pain. Use pain scale (NRS 0–10) before and after.', rationale: 'Burns are among the most painful injuries. Regular analgesia with pre-medication for dressing changes is essential.', frequency: 'Regular analgesia; pre-medication 30 min before dressing change' },
      { id: 'i-burns-minor-3', category: 'independent', action: 'Provide wound care: (1) Clean with lukewarm normal saline or burn-specific cleanser, (2) Debride loose epidermis, (3) Apply topical agent as prescribed (silver sulfadiazine, Aquacel Ag, Mepilex Ag, or paraffin gauze), (4) Cover with appropriate dressing. Avoid ice, toothpaste, butter, or other home remedies.', rationale: 'Evidence-based wound care promotes healing, reduces infection, and minimises pain. Home remedies cause further tissue damage.', frequency: 'At every dressing change; frequency depends on dressing type (every 1–3 days)' },
      { id: 'i-burns-minor-4', category: 'independent', action: 'Monitor for wound infection: increasing pain, erythema spreading beyond wound margin, purulent discharge, malodor, fever. Obtain wound swab if infection suspected. Escalate if signs of cellulitis or systemic infection.', rationale: 'Burn wounds are highly susceptible to infection. Early detection prevents wound conversion and sepsis.', frequency: 'At every dressing change; daily if high risk' },
      { id: 'i-burns-minor-5', category: 'collaborative', action: 'Ensure tetanus prophylaxis is up to date. Administer tetanus toxoid (if not immunised within 5 years) and/or tetanus immunoglobulin (TIG) for contaminated wounds per protocol.', rationale: 'Tetanus prophylaxis is essential for all burn wounds, especially contaminated or deep burns.', frequency: 'On initial presentation' },
      { id: 'i-burns-minor-6', category: 'independent', action: 'Educate patient on: wound care at home (hand hygiene, dressing changes, signs of infection), pain management, nutrition for healing, sun protection of healed skin (SPF 30+ for 12 months), scar management (silicone sheets, massage after healing), when to seek medical help.', rationale: 'Patient education improves healing outcomes, reduces complications, and empowers self-management.', frequency: 'At discharge and dressing change appointments' },
    ],
    evaluation: [
      { id: 'e-burns-minor-1', expected: 'Pain managed (≤ 3/10 at rest). Wound clean, no infection. Healing progressing (re-epithelialisation visible). Patient/caregiver confident with wound care.', status: 'met' },
      { id: 'e-burns-minor-2', expected: 'Wound fully healed. No infection or scarring complications. Prevention strategies understood and implemented.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Home Burn Wound Care',
        keyPoints: [
          'Wash your hands before touching the wound or changing dressings.',
          'Clean the wound gently with saline or as instructed — do not scrub.',
          'Apply the prescribed cream or dressing as shown.',
          'Change dressings as directed. Do not leave wet or soiled dressings on.',
          'Watch for infection: increasing redness, swelling, pus, bad smell, fever.',
          'Eat plenty of protein, fruits, and vegetables to help healing.',
          'Keep the burn out of the sun for at least 12 months — use SPF 30+ sunscreen.',
          'After healing, massage the area with moisturiser and use silicone sheets if advised.',
          'Do not pop blisters — they protect the skin underneath.',
          'Seek medical help if: pain worsens, wound looks infected, or fever develops.',
        ],
        method: 'Verbal + written burn care leaflet + demonstration of dressing technique',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Appropriate dressings and topical agents provided',
        'Pain management plan documented',
        'Tetanus prophylaxis administered or documented',
        'Wound care technique demonstrated',
        'Signs of infection reviewed',
        'Follow-up appointment scheduled',
        'Sun protection advice given',
        'Scar management advice given',
      ],
      followUp: 'Burns clinic or GP within 48–72 h for dressing change. Weekly review until healed. If not healing at 2 weeks, reassess for surgical intervention.',
      referrals: ['Burns Nurse Specialist', 'Plastic Surgery (if deep partial-thickness or critical area)', 'Physiotherapy (if joint involvement)', 'Psychology (if traumatic mechanism)', 'Social Services (if safeguarding concern)'],
      warningSigns: [
        'Increasing pain despite analgesia',
        'Spreading redness around the burn',
        'Pus or foul-smelling discharge',
        'Fever > 38°C',
        'Burn not healing after 2 weeks',
        'New blistering or wound deepening',
      ],
    },
    complications: ['Wound infection (5–10%)', 'Wound conversion (deepening)', 'Hypertrophic scarring', 'Contractures (if over joint)', 'Keloid formation', 'Psychological trauma', 'Hypothermia (if large surface area)'],
  },

  'Major Burns': {
    id: 'cp-major-burns',
    disease: 'Major Burns',
    specialty: 'Burns Care',
    overview: 'Major burns are defined as partial-thickness burns ≥ 20% TBSA in adults (≥ 10% in children/elderly), or full-thickness burns of any size, or burns involving critical areas (face, hands, feet, genitalia, circumferential limbs). These require fluid resuscitation, specialist burn centre admission, surgical management (escharotomy, skin grafting), and multidisciplinary critical care.',
    pathophysiology: 'Major burns trigger a systemic inflammatory response ("burn shock") with massive fluid shifts, capillary leak, and oedema. The hypermetabolic response (up to 200% of basal metabolic rate) causes muscle wasting, weight loss, and immunosuppression. Burn wound sepsis is a leading cause of death. The "rule of nines" or Lund-Browder chart estimates % TBSA. Parkland formula (4 mL × kg × %TBSA) guides initial fluid resuscitation in the first 24 h. Escharotomy may be needed for circumferential burns causing compartment syndrome.',
    commonCauses: ['House fires / structure fires', 'Industrial accidents (chemical, electrical)', 'Explosion / blast injury', 'Large scalds (bath, hot water)', 'Gas burns', 'Electrical burns (high voltage)'],
    riskFactors: ['Enclosed space fire (inhalation injury)', 'Delayed rescue', 'Elderly or very young', 'Pre-existing cardiac/pulmonary disease', 'Diabetes', 'Peripheral vascular disease', 'Immunosuppression', 'Delayed fluid resuscitation'],
    subjectiveData: [
      'Mechanism of injury (flame, electrical, chemical, scald)',
      'Duration of exposure',
      'Enclosed space (inhalation injury risk)',
      'Loss of consciousness',
      'Pain (may be absent in full-thickness burns due to nerve destruction)',
      'Co-morbidities and medications',
    ],
    objectiveData: [
      'Burn depth and % TBSA using Lund-Browder chart',
      'Signs of inhalation injury: singed nasal hairs, soot in oropharynx, hoarse voice, stridor, carbonaceous sputum',
      'Circumferential burns: distal pulses, capillary refill, compartment pressures',
      'Burn shock: tachycardia, hypotension, reduced urine output (< 0.5 mL/kg/h), cool peripheries',
      'Fluid balance: input/output hourly, urine output target 0.5–1 mL/kg/h (adults), 1–1.5 mL/kg/h (children)',
      'Lactate, base deficit, ABGs',
      'Eschar assessment: tight, leathery, non-blanching, circumferential',
      'ESCHAR score or Baux score for mortality estimation',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-burns-major-1',
        diagnosis: 'Deficient Fluid Volume related to massive capillary leak and evaporative losses from burn wound as evidenced by tachycardia, hypotension, and oliguria',
        relatedFactors: ['Capillary leak syndrome', 'Evaporative fluid loss', 'Third-spacing', 'Hypermetabolic state'],
        definingCharacteristics: ['Urine output < 0.5 mL/kg/h', 'Tachycardia > 100', 'Hypotension', 'Dry mucous membranes', 'Reduced skin turgor'],
      },
      {
        id: 'nd-burns-major-2',
        diagnosis: 'Acute Pain related to extensive tissue damage, wound debridement, and dressing changes',
        relatedFactors: ['Extensive tissue destruction', 'Inflammatory mediators', 'Surgical procedures', 'Dressing changes'],
        definingCharacteristics: ['Verbal pain report', 'Guarding', 'Tachycardia', 'Diaphoresis', 'Refusal of care'],
      },
      {
        id: 'nd-burns-major-3',
        diagnosis: 'Risk for Infection related to loss of skin barrier, devitalised tissue, immunosuppression, and invasive devices',
        definingCharacteristics: ['Extensive open wound', 'Immunosuppression from burn injury', 'Invasive monitoring lines', 'Mechanical ventilation'],
      },
      {
        id: 'nd-burns-major-4',
        diagnosis: 'Impaired Physical Mobility related to pain, oedema, and bandaging of affected areas',
        definingCharacteristics: ['Unable to move limbs freely', 'Dressing restrictions', 'Pain with movement', 'Fear of injury'],
      },
    ],
    goals: [
      {
        id: 'g-burns-major-1',
        shortTerm: 'Fluid resuscitation adequate (urine output 0.5–1 mL/kg/h, lactate clearing). Pain controlled. Escharotomy performed if needed. Inhalation injury managed. Wound cleaned and dressed.',
        longTerm: 'Wound healed or grafted successfully. No burn wound sepsis. Nutrition optimised. Mobility preserved. Patient survives and transitions to rehabilitation.',
      },
    ],
    interventions: [
      { id: 'i-burns-major-1', category: 'collaborative', action: 'Initiate Parkland fluid resuscitation: 4 mL Lactated Ringer\'s × kg × %TBSA (50% in first 8 h, 50% in next 16 h). Titrate to urine output 0.5–1 mL/kg/h. Monitor hourly. Adjust for delayed resuscitation (> 6 h from injury) by giving fluid bolus.', rationale: 'Parkland formula provides initial guide. Urine output is the best end-point for resuscitation adequacy. Delayed resuscitation increases mortality.', frequency: 'Hourly urine output; fluid rate adjusted every 1–2 h' },
      { id: 'i-burns-major-2', category: 'independent', action: 'Assess for inhalation injury: check for singed nasal hairs, soot in mouth/nose, hoarse voice, stridor, carbonaceous sputum, facial burns. If suspected, early intubation (oedema will worsen over hours). Administer 100% FiO₂ until COHb levels checked.', rationale: 'Inhalation injury increases mortality by 20–30%. Airway oedema progresses rapidly — early intubation is safer than emergency intubation after swelling.', frequency: 'Initial assessment; continuous respiratory monitoring' },
      { id: 'i-burns-major-3', category: 'independent', action: 'Monitor for compartment syndrome in circumferential burns: distal pulses (Doppler), capillary refill, sensation, compartment pressure (> 30 mmHg or within 30 mmHg of diastolic BP). Prepare for escharotomy if compartment syndrome develops.', rationale: 'Circumferential eschar restricts blood flow and can cause limb ischaemia. Escharotomy is a life- and limb-saving procedure.', frequency: 'Hourly neurovascular checks; compartment pressures if indicated' },
      { id: 'i-burns-major-4', category: 'independent', action: 'Implement burn-specific infection prevention: strict aseptic technique for all wound care, daily wound assessment (swab if infection suspected), early wound debridement and excision, topical antimicrobials (silver sulfadiazine, silver-impregnated dressings), environmental controls (isolation room if immunosuppressed).', rationale: 'Burn wound sepsis is the leading cause of death after the first 48 h. Early excision reduces infection and mortality.', frequency: 'Every wound care episode; daily wound review' },
      { id: 'i-burns-major-5', category: 'collaborative', action: 'Provide nutritional support: start enteral feeding within 6–12 h of injury. High-protein (1.5–2 g/kg/day), high-calorie (25–35 kcal/kg/day) diet. Supplement with vitamin C (500 mg BD), zinc (220 mg OD), and multivitamins. Monitor weight daily.', rationale: 'The hypermetabolic response in major burns increases energy and protein requirements dramatically. Early nutrition reduces infection and improves healing.', frequency: 'Enteral feeding within 6–12 h; daily weight; dietitian review' },
      { id: 'i-burns-major-6', category: 'independent', action: 'Manage pain: multimodal approach — regular paracetamol, NSAIDs (if no contraindication), opioids for severe pain (morphine PCA or IV titrated), anxiolytics if needed (lorazepam). Pre-medicate before dressing changes. Use NRS or VAS pain scale.', rationale: 'Burns are extremely painful. Multimodal analgesia with scheduled and breakthrough medications is essential.', frequency: 'Regular analgesia; PCA; pre-medication 30 min before procedures' },
      { id: 'i-burns-major-7', category: 'independent', action: 'Maintain thermoregulation: ambient temperature 28–32°C, use overhead warming lamps, warmed IV fluids, Bair Hugger or similar. Monitor core temperature frequently.', rationale: 'Major burns impair thermoregulation. Hypothermia worsens coagulopathy, increases metabolic demand, and delays healing.', frequency: 'Continuous temperature monitoring; ambient temperature maintained' },
      { id: 'i-burns-major-8', category: 'independent', action: 'Implement early mobilisation and rehabilitation: passive ROM exercises from day 1, active ROM as tolerated, positioning to prevent contractures (anti-contracture positioning), splinting of hands and neck, progressive mobilisation. Refer to physiotherapy.', rationale: 'Early mobilisation prevents contractures, reduces deconditioning, and improves functional outcomes. Anti-contracture positioning prevents hypertrophic scarring.', frequency: 'Daily physiotherapy; continuous positioning management' },
    ],
    evaluation: [
      { id: 'e-burns-major-1', expected: 'Urine output ≥ 0.5 mL/kg/h. Lactate clearing. Haemodynamically stable. Pain managed (NRS ≤ 4/10). Inhalation injury managed (intubated if needed).', status: 'met' },
      { id: 'e-burns-major-2', expected: 'Wound debrided and grafted. No burn wound sepsis. Nutrition meeting targets. Mobility maintained. Patient on rehabilitation trajectory.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Major Burns Recovery',
        keyPoints: [
          'Major burns require specialist care in a burns centre. Treatment may include surgery (skin grafts).',
          'Recovery takes months. Multiple operations may be needed.',
          'You will work with physiotherapists daily to keep your joints moving and prevent scarring.',
          'Nutrition is crucial — eat high-protein, high-calorie foods to support healing.',
          'Pain medication will be given regularly. Tell us if pain is not controlled.',
          'After discharge, ongoing scar management (pressure garments, silicone, massage) is essential.',
          'Psychological support is available — burns often cause significant emotional distress.',
        ],
        method: 'Verbal, written recovery guide, family meetings, psychology support',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Wound healed or stable graft take',
        'Pain controlled on oral medication',
        'Nutritional intake adequate',
        'Mobility and ROM maintained',
        'Scar management plan in place (pressure garments, silicone)',
        'Physiotherapy exercises demonstrated',
        'Psychological support arranged',
        'Home environment assessed (safety, accessibility)',
        'Follow-up appointments scheduled',
        'Family educated on ongoing care',
      ],
      followUp: 'Burns clinic weekly for wound review and dressing changes. Physiotherapy 3× per week. Psychology if needed. Scar management clinic at 4–6 weeks. Pressure garments fitted. Review at 3, 6, 12 months.',
      referrals: ['Burns Surgeon', 'Plastic Surgery', 'Physiotherapy', 'Occupational Therapy', 'Psychology/Psychiatry', 'Nutrition/Dietetics', 'Social Services', 'Occupational Health (return to work)'],
      warningSigns: [
        'Wound breakdown or graft loss',
        'Signs of infection (redness, pus, fever)',
        'Increasing pain not relieved by medication',
        'Joint stiffness or contracture development',
        'Flashbacks, nightmares, or severe anxiety',
        'Inability to cope at home',
      ],
    },
    complications: ['Burn wound sepsis', 'Inhalation injury / ARDS', 'Contractures and hypertrophic scarring', 'Hypothermia', 'DIC', 'Acute kidney injury', 'Gastric ileus / Curling\'s ulcer', 'Heterotopic ossification', 'Post-traumatic stress disorder', 'Death (mortality 3–10% with modern care for 20–40% TBSA)'],
  },

  'Inhalation Injury': {
    id: 'cp-inhalation',
    disease: 'Inhalation Injury',
    specialty: 'Burns Care',
    overview: 'Inhalation injury occurs when hot gases, smoke, steam, or chemicals are inhaled during a fire. It is the leading cause of death in fire victims. Injury can be thermal (upper airway), chemical (lower airway), or systemic (carboxyhaemoglobinemia, cyanide poisoning). It significantly increases mortality and complication rates in burn patients. Early intubation and aggressive pulmonary toilet are essential.',
    pathophysiology: 'Thermal injury is usually limited to the upper airway (supraglottic structures) because the larynx is an efficient heat exchanger. Smoke and chemical inhalation affect the lower airways (bronchi, bronchioles, alveoli) causing mucosal oedema, sloughing, atelectasis, and ARDS. Carbon monoxide binds haemoglobin 250× more tightly than oxygen (COHb), causing tissue hypoxia. Cyanide (from burning plastics) inhibits cytochrome oxidase, preventing cellular oxygen use. The combined effect causes severe tissue hypoxia, respiratory failure, and potentially death.',
    commonCauses: ['Structure fire (house, building)', 'Industrial fire / explosion', 'Vehicle fire', 'Enclosed space fire (increased smoke exposure)', 'Chemical plant accident'],
    riskFactors: ['Enclosed space exposure', 'Prolonged exposure', 'Unconsciousness during fire', 'Facial burns', 'Soot in oropharynx', 'Hoarse voice at presentation', 'Pre-existing respiratory disease', 'Smoking (impaired mucociliary clearance)'],
    subjectiveData: [
      'Mechanism: fire exposure, type of materials burned, duration of exposure',
      'Was the patient in an enclosed space?',
      'Was the patient conscious or unconscious?',
      'Was the patient rescued or self-evacuated?',
      'Any pre-existing respiratory conditions?',
    ],
    objectiveData: [
      'Signs of upper airway injury: singed nasal hairs, facial burns, soot in nose/mouth, hoarse voice, stridor, drooling',
      'Signs of lower airway injury: wheezing, rhonchi, carbonaceous sputum, increasing FiO₂ requirement',
      'ABG: PaO₂ (may be normal on 100% O₂), COHb level (> 10% is significant, > 30% is severe)',
      'Cyanide level if available (venous blood gas: metabolic acidosis with high lactate)',
      'Chest X-ray: may be normal initially; infiltrates develop over 24–48 h',
      'Bronchoscopy: erythema, oedema, sloughing mucosa, soot deposits',
      'SpO₂ may be falsely elevated in CO poisoning (use co-oximetry)',
      'Neurological status (CO and cyanide cause altered consciousness)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-inhale-1',
        diagnosis: 'Ineffective Airway Clearance related to mucosal oedema, sloughing, and excessive secretions from chemical/thermal injury',
        relatedFactors: ['Airway oedema', 'Mucosal sloughing', 'Impaired mucociliary clearance', 'Carbonaceous debris'],
        definingCharacteristics: ['Stridor', 'Wheezing', 'Carbonaceous sputum', 'Increasing oxygen requirement', 'Need for suctioning'],
      },
      {
        id: 'nd-inhale-2',
        diagnosis: 'Impaired Gas Exchange related to bronchospasm, atelectasis, and chemical pneumonitis',
        relatedFactors: ['Bronchospasm', 'Atelectasis', 'Chemical alveolar damage', 'COHb elevation'],
        definingCharacteristics: ['SpO₂ < 92% on high FiO₂', 'COHb > 10%', 'Metabolic acidosis', 'Tachypnoea', 'Wheezing'],
      },
      {
        id: 'nd-inhale-3',
        diagnosis: 'Risk for Aspiration related to impaired swallowing and airway oedema',
        definingCharacteristics: ['Facial/neck burns', 'Stridor', 'Altered consciousness', 'Oropharyngeal oedema'],
      },
    ],
    goals: [
      {
        id: 'g-inhale-1',
        shortTerm: 'Airway secured (intubated if needed). COHb < 10%. SpO₂ ≥ 92% on FiO₂ ≤ 0.6. Secretions manageable. Bronchospasm controlled.',
        longTerm: 'Airway oedema resolved. Extubated safely. No ARDS or pneumonia. Pulmonary function returning to baseline.',
      },
    ],
    interventions: [
      { id: 'i-inhale-1', category: 'collaborative', action: 'Assess airway urgently: look for signs of upper airway obstruction (stridor, hoarse voice, facial/neck burns). If any signs present, perform EARLY PROPHYLACTIC INTUBATION before oedema progresses (oedema worsens over 12–24 h). Do not wait for stridor to worsen.', rationale: 'Airway oedema in inhalation injury progresses rapidly. Delayed intubation can lead to cannot-intubate/cannot-ventilate emergency. Prophylactic intubation saves lives.', frequency: 'Immediate assessment; intubate if any concern' },
      { id: 'i-inhale-2', category: 'collaborative', action: 'Administer 100% FiO₂ until COHb level is checked and < 10%. Carbon monoxide has a half-life of 4–6 h on room air but 40–80 min on 100% O₂. Hyperbaric oxygen if COHb > 25% or neurological symptoms.', rationale: 'CO binds haemoglobin 250× more tightly than O₂. 100% O₂ displaces CO. Hyperbaric O₂ is indicated for severe poisoning.', frequency: 'Immediate; continue until COHb < 10%' },
      { id: 'i-inhale-3', category: 'independent', action: 'Perform aggressive pulmonary toilet: regular suctioning (closed suction system), nebulised salbutamol (2.5–5 mg) and ipratropium (0.5 mg) every 4 h, chest physiotherapy, humidified oxygen. Monitor sputum colour and amount.', rationale: 'Inhalation injury causes bronchospasm, mucus plugging, and atelectasis. Aggressive pulmonary toilet maintains airway patency and prevents pneumonia.', frequency: 'Suction PRN; nebulisers every 4 h; chest physio daily' },
      { id: 'i-inhale-4', category: 'independent', action: 'Monitor for cyanide poisoning: metabolic acidosis with elevated lactate (lactate > 8 mmol/L disproportionately high), altered consciousness, fixed dilated pupils. Administer cyanide antidote kit (hydroxocobalamin) if suspected.', rationale: 'Cyanide poisoning from burning plastics (synthetic materials) is common in structure fires. It causes cellular asphyxiation. Hydroxocobalamin is first-line antidote.', frequency: 'Monitor lactate and acid-base status; antidote per protocol' },
      { id: 'i-inhale-5', category: 'independent', action: 'Manage ventilator settings for inhalation injury: low tidal volumes (6 mL/kg), PEEP to recruit atelectatic lung, frequent sigh breaths or recruitment manoeuvres, meticulous airway hygiene. Monitor for ARDS development (usually 24–72 h post-injury).', rationale: 'Inhalation injury causes progressive lower airway damage and ARDS. Lung-protective ventilation and aggressive airway management are essential.', frequency: 'Continuous ventilator monitoring; ABG every 4–6 h' },
      { id: 'i-inhale-6', category: 'independent', action: 'Monitor respiratory status closely for 72 h: respiratory rate, SpO₂, FiO₂ requirement, secretions, breath sounds, chest X-ray at 24 h. ARDS typically develops 24–72 h post-injury. Escalate early if deterioration.', rationale: 'Inhalation injury is a dynamic process. ARDS, pneumonia, and airway necrosis may develop days after the initial insult.', frequency: 'Continuous SpO₂; assessment every 2 h; CXR at 24 h' },
    ],
    evaluation: [
      { id: 'e-inhale-1', expected: 'Airway secure and patent. COHb < 10%. SpO₂ ≥ 92% on weaning FiO₂. Secretions reducing. Bronchospasm controlled.', status: 'met' },
      { id: 'e-inhale-2', expected: 'No ARDS or pneumonia. Successful extubation. Pulmonary function improving.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Inhalation Injury Recovery',
        keyPoints: [
          'Smoke and heat inhaled during the fire can damage your airways and lungs.',
          'You may be intubated (tube in your throat) to protect your airway while swelling subsides.',
          'Treatment includes nebulisers (breathing treatments), suctioning, and chest physiotherapy.',
          'Your breathing may worsen over the first few days before improving.',
          'Blood tests will monitor for carbon monoxide and cyanide poisoning.',
          'After discharge, you may have a cough or wheeze for several weeks. Follow up with a respiratory specialist.',
        ],
        method: 'Verbal (when able), family communication, written respiratory recovery guide',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Successfully extubated',
        'SpO₂ stable on room air or low-flow O₂',
        'Secretions manageable without regular suctioning',
        'No ARDS or pneumonia',
        'Chest X-ray improving',
        'Pulmonary function test performed (if feasible)',
        'Respiratory follow-up arranged',
        'Smoking cessation support if applicable',
      ],
      followUp: 'Respiratory clinic at 2–4 weeks. Pulmonary function tests at 1, 3, and 12 months. If ventilated, ICU follow-up clinic. Smoking cessation support.',
      referrals: ['Respiratory Medicine', 'Physiotherapy', 'Smoking Cessation Service', 'Psychology (PTSD)', 'Burns Surgery (if concurrent burns)'],
      warningSigns: [
        'Worsening breathlessness or new wheeze',
        'Fever or productive cough',
        'Sputum becoming purulent or bloody',
        'Stridor or hoarseness returning',
        'Chest pain or tightness',
      ],
    },
    complications: ['ARDS (24–72 h post-injury)', 'Pneumonia', 'Airway necrosis and sloughing', 'Pneumothorax', 'Bronchospasm', 'Pulmonary oedema', 'CO poisoning (cardiac, neurological)', 'Cyanide poisoning', 'Death (mortality 5–8% with inhalation injury alone, up to 50% with major burns + inhalation injury)'],
  },

  'Burn Wound Sepsis': {
    id: 'cp-burn-sepsis',
    disease: 'Burn Wound Sepsis',
    specialty: 'Burns Care',
    overview: 'Burn wound sepsis is a systemic infection originating from the burn wound. It is a leading cause of mortality in major burn patients after the first 48 h. The immunosuppressive effect of major burns, combined with loss of the skin barrier, creates ideal conditions for wound colonisation and invasive infection. Management requires aggressive wound care, systemic antibiotics, and organ support.',
    pathophysiology: 'Major burns cause profound immunosuppression: reduced T-cell function, impaired neutrophil activity, decreased IgG levels, and increased susceptibility to bacterial and fungal infections. The burn wound undergoes predictable colonisation: skin flora (Staphylococcus) in the first 48 h, then gut-derived organisms (Pseudomonas, Enterobacteriaceae) from day 3–5, and eventually multi-resistant organisms. Invasive wound sepsis occurs when bacteria penetrate the eschar and enter the bloodstream, causing bacteraemia, septic shock, and multi-organ failure.',
    commonCauses: ['Pseudomonas aeruginosa (most common in burn wounds)', 'Staphylococcus aureus (including MRSA)', 'Klebsiella pneumoniae', 'Candida species (fungal burn wound sepsis)', 'Acinetobacter baumannii', 'Polymicrobial infection'],
    riskFactors: ['Major burns (> 20% TBSA)', 'Delayed wound excision (> 5 days)', 'Immunosuppression', 'Invasive devices (lines, catheters, ventilators)', 'Antibiotic overuse (resistance)', 'Prolonged ICU stay', 'Malnutrition', 'Diabetes', 'Age extremes'],
    subjectiveData: [
      'Altered mental status (new confusion, agitation, or obtundation)',
      'Fever or hypothermia',
      'Chills or rigors',
      'Wound becoming more painful or conversely painless (nerve destruction)',
      'Family report of deterioration',
    ],
    objectiveData: [
      'Temperature > 38.5°C or < 36°C',
      'Tachycardia > 110 bpm',
      'Hypotension (MAP < 65 mmHg)',
      'Wound changes: new dark discolouration, haemorrhage within wound, separation of eschar, green/black discolouration, foul odour',
      'Blood cultures positive (≥ 2 sets)',
      'Wound culture: quantitative > 10⁵ organisms/g tissue (diagnostic of invasive infection)',
      'Lactate > 2 mmol/L',
      'Procalcitonin elevated',
      'WCC elevated or inappropriately low',
      'Organ dysfunction: rising creatinine, bilirubin, falling platelets',
      'Eschar biopsy: bacteria invading beneath the eschar (histological confirmation)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-burn-sep-1',
        diagnosis: 'Infection related to loss of skin barrier, immunosuppression, and burn wound colonisation as evidenced by wound changes and positive blood cultures',
        relatedFactors: ['Loss of skin barrier', 'Immunosuppression from burn injury', 'Invasive devices', 'Prolonged wound exposure'],
        definingCharacteristics: ['Wound colour change', 'Purulent or foul-smelling discharge', 'Positive blood cultures', 'Tachycardia', 'Fever or hypothermia'],
      },
      {
        id: 'nd-burn-sep-2',
        diagnosis: 'Ineffective Peripheral Tissue Perfusion related to septic shock as evidenced by hypotension and elevated lactate',
        definingCharacteristics: ['MAP < 65 mmHg', 'Vasopressor dependent', 'Lactate > 2 mmol/L', 'Mottled skin', 'Reduced urine output'],
      },
    ],
    goals: [
      {
        id: 'g-burn-sep-1',
        shortTerm: 'Antibiotics administered within 1 hour of sepsis recognition. Blood cultures obtained. Wound debrided. Vasopressors initiated if needed. Lactate monitored.',
        longTerm: 'Wound infection controlled. Blood cultures cleared. Vasopressors weaned. Wound healing progressing. No further septic episodes.',
      },
    ],
    interventions: [
      { id: 'i-burn-sep-1', category: 'collaborative', action: 'Recognise burn wound sepsis early: new wound changes (dark discolouration, haemorrhage, separation), haemodynamic instability (hypotension, tachycardia), fever/hypothermia, altered mental status. Obtain blood cultures and wound swab immediately.', rationale: 'Early recognition and treatment of burn wound sepsis reduces mortality. Wound changes often precede systemic signs.', frequency: 'Daily wound assessment; more frequently if concern' },
      { id: 'i-burn-sep-2', category: 'collaborative', action: 'Administer broad-spectrum antibiotics within 1 hour: cover Gram-positive (vancomycin or linezolid) and Gram-negative (piperacillin-tazobactam or meropenem). Add antifungal (fluconazole or caspofungin) if fungal infection suspected. De-escalate based on cultures.', rationale: 'Empirical antibiotics must cover likely burn wound pathogens. Antifungal cover is essential if fungal infection suspected (green-black wound, non-resolving sepsis).', frequency: 'Within 1 hour of sepsis recognition; reassess at 48–72 h' },
      { id: 'i-burn-sep-3', category: 'independent', action: 'Manage wound aggressively: surgical excision of infected eschar (tangential or fascial excision), wound swab (quantitative culture if available), topical antimicrobials (silver sulfadiazine, silver-impregnated dressings, mafenide acetate for pseudomonal coverage), daily wound assessment with photographs.', rationale: 'Surgical excision is the most effective source control for burn wound sepsis. Infected eschar must be removed.', frequency: 'Surgical excision as planned; daily wound assessment' },
      { id: 'i-burn-sep-4', category: 'independent', action: 'Support haemodynamics: fluid resuscitation (4 mL/kg/%TBSA Parkland, adjusted for sepsis), vasopressors (noradrenaline first-line), monitor MAP ≥ 65, ScvO₂ ≥ 70%, lactate clearance every 2–4 h.', rationale: 'Burn wound sepsis causes distributive shock. Haemodynamic support is essential for organ perfusion.', frequency: 'Continuous haemodynamic monitoring; lactate every 2–4 h' },
      { id: 'i-burn-sep-5', category: 'independent', action: 'Implement strict infection control: single room (ideally positive pressure), aseptic wound care technique, strict hand hygiene, dedicated nursing staff if possible, environmental cleaning, visitor screening.', rationale: 'Burn wound sepsis can be caused by exogenous organisms. Strict infection control prevents cross-contamination and spread of resistant organisms.', frequency: 'Ongoing; every interaction' },
      { id: 'i-burn-sep-6', category: 'independent', action: 'Monitor organ function and provide organ support: ventilator management (ARDS prevention), renal support (RRT if AKI), nutrition (enteral within 6–12 h), glucose control (6–10 mmol/L), DVT prophylaxis.', rationale: 'Burn wound sepsis frequently causes multi-organ failure. Organ support is essential while treating the underlying infection.', frequency: 'Continuous organ function monitoring; SOFA scoring daily' },
    ],
    evaluation: [
      { id: 'e-burn-sep-1', expected: 'Blood cultures clearing. Wound infection controlled (debrided, topical antimicrobials in place). Vasopressors weaning. Lactate normalising. Organ function stable.', status: 'met' },
      { id: 'e-burn-sep-2', expected: 'Wound healing progressing. No further septic episodes. Patient transitioning to rehabilitation.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Burn Wound Sepsis (for Family)',
        keyPoints: [
          'A serious infection has developed from the burn wound. This is a known complication of major burns.',
          'Treatment includes powerful antibiotics, possible surgery to remove infected wound tissue, and support for blood pressure and organs.',
          'The first 48–72 hours are critical. We will monitor closely.',
          'The burn wound may look different (darker, more discoloured) — this is part of the infection process.',
          'Recovery depends on controlling the infection and supporting the body\'s healing.',
          'We will keep you updated regularly and involve you in decisions.',
        ],
        method: 'Verbal updates, family meetings, written information',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Infection resolved (negative blood cultures, improving wound)',
        'Vasopressors discontinued',
        'Antibiotics completed or transitioned',
        'Wound healing or grafted',
        'Organ function stable',
        'Nutrition meeting targets',
        'Rehabilitation plan in place',
        'Post-ICU follow-up arranged',
      ],
      followUp: 'Burns clinic weekly. ICU follow-up clinic at 4–6 weeks. Wound culture surveillance. Physiotherapy. Psychology support.',
      referrals: ['Burns Surgeon', 'Infectious Diseases', 'Physiotherapy', 'Psychology', 'Nutrition', 'ICU Follow-up Clinic'],
      warningSigns: [
        'Fever returning after treatment',
        'Wound changes (new discolouration, odour, discharge)',
        'Worsening confusion or altered consciousness',
        'Worsening breathlessness',
        'Unable to tolerate oral intake',
      ],
    },
    complications: ['Septic shock', 'Multi-organ failure', 'ARDS', 'Acute kidney injury', 'DIC', 'Wound failure / graft loss', 'Deep fungal infection', 'Death (mortality 30–80% depending on extent and organism)'],
  },

  // ═══════════════════════════════════════════════════════════════
  // COMMUNITY & PUBLIC HEALTH NURSING
  // ═══════════════════════════════════════════════════════════════

  'Immunisation Programme': {
    id: 'cp-immunisation',
    disease: 'Immunisation Programme',
    specialty: 'Community & Public Health Nursing',
    overview: 'Immunisation is one of the most effective public health interventions, preventing diseases such as measles, polio, diphtheria, tetanus, pertussis, hepatitis B, influenza, and COVID-19. Community nurses play a key role in delivering immunisation programmes, educating the public, managing vaccine hesitancy, ensuring cold chain maintenance, and monitoring adverse events. This care plan covers both paediatric and adult immunisation schedules.',
    pathophysiology: 'Vaccines work by stimulating the immune system to produce antibodies and memory cells without causing the disease itself. Live attenuated vaccines (MMR, varicella) contain weakened pathogens that replicate minimally. Inactivated vaccines (IPV, hepatitis A) contain killed pathogens. Subunit/conjugate vaccines (pertussis, pneumococcal, HPV) contain purified antigens. mRNA vaccines (COVID-19) instruct cells to produce the spike protein. Booster doses maintain immunity over time. Herd immunity requires 80–95% coverage depending on the disease.',
    commonCauses: ['Routine childhood immunisation (schedule-based)', 'Catch-up immunisation (missed doses)', 'Adult boosters (tetanus, diphtheria, influenza)', 'Travel immunisation', 'Occupational immunisation (healthcare workers)', 'Outbreak response (measles, meningococcal)', 'COVID-19 vaccination programme'],
    riskFactors: ['Vaccine hesitancy / refusal', 'Cold chain breach (vaccine wastage)', 'Immunosuppressed patients (contraindicated for live vaccines)', 'Anaphylaxis history (contraindication to specific vaccines)', 'Needle phobia', 'Access barriers (transport, language, socioeconomic)', 'Misinformation on social media'],
    subjectiveData: [
      'Patient/parent report of vaccination history',
      'Previous adverse reactions to vaccines',
      'Allergies (especially egg, gelatin, neomycin — relevant to specific vaccines)',
      'Immunosuppressive conditions or medications',
      'Pregnancy status (live vaccines contraindicated)',
      'Travel plans (destination-specific requirements)',
      'Concerns or questions about vaccines',
    ],
    objectiveData: [
      'Vaccination records (health passport, GP records, national registry)',
      'Cold chain documentation (vaccine storage temperature 2–8°C, no freezing for most vaccines)',
      'Injection site and technique (correct site, needle gauge and length)',
      'Observation period post-vaccination (15–20 min for all vaccines, 30 min if previous reaction)',
      'Adverse event monitoring (local: redness, swelling, pain; systemic: fever, malaise, rash; rare: anaphylaxis, GBS)',
      'Coverage rates (herd immunity thresholds)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-imm-1',
        diagnosis: 'Deficient Knowledge related to vaccine schedule, benefits, and risks',
        relatedFactors: ['Lack of exposure to immunisation information', 'Misinformation', 'Language barriers', 'Health literacy level'],
        definingCharacteristics: ['Unable to describe vaccine schedule', 'Expresses concerns based on misinformation', 'Has not returned for scheduled doses'],
      },
      {
        id: 'nd-imm-2',
        diagnosis: 'Risk for Infection related to incomplete immunisation status',
        definingCharacteristics: ['Missed vaccine doses', 'Outbreak exposure', 'Travel to endemic area', 'Immunosuppression'],
      },
      {
        id: 'nd-imm-3',
        diagnosis: 'Anxiety related to needle phobia or fear of adverse reactions',
        definingCharacteristics: ['Verbalised fear', 'Avoidance of appointments', 'Physical distress during vaccination', 'Needle phobia'],
      },
    ],
    goals: [
      {
        id: 'g-imm-1',
        shortTerm: 'Patient/parent informed about vaccine benefits and risks. Informed consent obtained. Vaccine administered correctly. Cold chain maintained. Observation period completed. No adverse reaction.',
        longTerm: 'Full immunisation schedule completed. Patient/parent confident in vaccination. Community coverage rates maintained. Outbreak risk minimised.',
      },
    ],
    interventions: [
      { id: 'i-imm-1', category: 'independent', action: 'Assess vaccination status: review health records, national immunisation register, GP records. Identify missed doses and schedule catch-up. Use age-appropriate schedule (paediatric, adolescent, adult, pregnancy).', rationale: 'Accurate assessment of vaccination status is essential to identify gaps and plan catch-up immunisation.', frequency: 'At each encounter; before administering any vaccine' },
      { id: 'i-imm-2', category: 'independent', action: 'Educate patient/parent: explain vaccine benefits (disease prevention, herd immunity), risks (common side effects, rare serious events), schedule, and what to expect after vaccination. Address concerns empathetically. Use evidence-based resources (WHO, CDC, national health authority).', rationale: 'Education is the primary tool for addressing vaccine hesitancy. Empathetic, non-judgemental communication is essential.', frequency: 'Before each vaccination; at every encounter' },
      { id: 'i-imm-3', category: 'independent', action: 'Maintain cold chain: check vaccine storage temperature (2–8°C) at start of each session. Use digital thermometer with alarm. Do not freeze most vaccines (except some live vaccines). Record temperatures. Discard vaccines exposed to temperature excursions.', rationale: 'Cold chain breach renders vaccines ineffective. Temperature monitoring is a legal and clinical requirement.', frequency: 'At start of each session; continuous monitoring if digital' },
      { id: 'i-imm-4', category: 'independent', action: 'Administer vaccines correctly: verify vaccine name, dose, route, and site. Use correct needle gauge (23–25G) and length (for age and body habitus). IM injection: deltoid (adults, children > 12 months), anterolateral thigh (infants < 12 months). Aspirate before injecting (some guidelines). Apply pressure (do not rub).', rationale: 'Correct technique ensures vaccine efficacy and reduces injection site reactions. Wrong site or route can cause injury or reduced immunogenicity.', frequency: 'At each vaccination' },
      { id: 'i-imm-5', category: 'independent', action: 'Observe post-vaccination: 15 min observation for all vaccines; 30 min if history of fainting or previous reaction. Have anaphylaxis management kit immediately available (adrenaline 1:1000, IM). Document any reactions.', rationale: 'Anaphylaxis after vaccination is rare (1–2 per million doses) but potentially fatal. Immediate treatment saves lives.', frequency: 'After every vaccination' },
      { id: 'i-imm-6', category: 'independent', action: 'Document and report: record vaccine name, batch number, dose, site, route, date, and administering nurse. Report adverse events to pharmacovigilance system (Yellow Card, VAERS, or equivalent). Update national register.', rationale: 'Accurate documentation ensures continuity of care. Adverse event reporting is a legal requirement and supports vaccine safety monitoring.', frequency: 'After every vaccination' },
      { id: 'i-imm-7', category: 'independent', action: 'Address vaccine hesitancy: use motivational interviewing techniques (open questions, affirmation, reflection, summaries). Understand the patient\'s concerns. Provide accurate information without dismissing fears. Avoid confrontation. Offer written materials.', rationale: 'Motivational interviewing is the evidence-based approach for vaccine hesitancy. Confrontation increases resistance.', frequency: 'When hesitancy identified' },
    ],
    evaluation: [
      { id: 'e-imm-1', expected: 'Vaccine administered correctly. Cold chain maintained. No adverse reaction during observation. Documentation complete. Patient/parent satisfied.', status: 'met' },
      { id: 'e-imm-2', expected: 'Immunisation schedule up to date. Patient/parent confident with vaccination. Next appointment scheduled.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Vaccination Information',
        keyPoints: [
          'Vaccines protect you and your community from serious diseases.',
          'Common side effects (sore arm, mild fever, tiredness) are normal and usually last 1–2 days.',
          'Serious side effects are very rare. Stay for 15–30 minutes after vaccination for observation.',
          'Keep your vaccination records up to date — bring them to every appointment.',
          'If you miss a dose, it\'s never too late to catch up.',
          'Talk to your nurse or doctor if you have any concerns about vaccines.',
          'Vaccines are safe, effective, and the best protection against preventable diseases.',
        ],
        method: 'Verbal, written vaccine information leaflets, national health authority websites',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Vaccine administered and documented',
        'Next dose date provided',
        'Side effects information given (written)',
        'Anaphylaxis warning signs reviewed',
        'Cold chain maintained',
        'Adverse event reporting completed (if applicable)',
        'National register updated',
      ],
      followUp: 'Return for next scheduled dose. Contact GP or clinic if significant adverse reaction. Review immunisation status before travel.',
      referrals: ['GP for catch-up immunisation', 'Travel clinic for travel vaccines', 'Immunology if suspected immunodeficiency', 'Public health for outbreak response'],
      warningSigns: [
        'Severe allergic reaction (difficulty breathing, swelling of face/throat, widespread rash)',
        'High fever > 39°C lasting > 48 hours',
        'Seizure after vaccination',
        'Persistent crying > 3 hours',
        'Limp or unresponsive baby',
        'Any unusual symptoms after vaccination',
      ],
    },
    complications: ['Anaphylaxis (very rare)', 'Febrile seizure (1 in 3,000 for MMR)', 'Injection site reactions', 'Fainting (adolescents)', 'Vaccine failure (rare)', 'Adverse events following immunisation (AEFI)', 'Cold chain breach (ineffective vaccines)'],
  },

  'Community Chronic Disease Management': {
    id: 'cp-community-cdm',
    disease: 'Community Chronic Disease Management',
    specialty: 'Community & Public Health Nursing',
    overview: 'Community chronic disease management involves supporting patients with long-term conditions (diabetes, hypertension, COPD, heart failure, asthma) in the primary care and community setting. The nurse\'s role includes health assessment, medication optimisation, self-management support, lifestyle modification, screening for complications, and coordination with the multidisciplinary team. The goal is to prevent deterioration, reduce hospital admissions, and improve quality of life.',
    pathophysiology: 'Chronic diseases share common pathophysiological mechanisms: chronic inflammation, oxidative stress, insulin resistance, endothelial dysfunction, and progressive organ damage. They are influenced by modifiable risk factors (diet, physical activity, smoking, alcohol, stress) and non-modifiable factors (genetics, age, ethnicity). Effective management requires addressing both the disease pathophysiology and the behavioural/social determinants. Self-management is key because chronic diseases require daily management by the patient, not just intermittent clinical intervention.',
    commonCauses: ['Type 2 diabetes mellitus', 'Hypertension', 'COPD', 'Heart failure (stable)', 'Asthma', 'Chronic kidney disease', 'Osteoarthritis', 'Depression and anxiety (comorbid)', 'Obesity', 'Dyslipidaemia'],
    riskFactors: ['Low health literacy', 'Polypharmacy', 'Social isolation', 'Poverty / food insecurity', 'Limited access to healthcare', 'Smoking', 'Physical inactivity', 'Poor diet', 'Non-adherence to medication', 'Mental health comorbidity', 'Cultural/language barriers'],
    subjectiveData: [
      'Patient report of symptoms, medication adherence, lifestyle habits',
      'Understanding of their condition and management',
      'Barriers to self-management (cost, access, knowledge, motivation)',
      'Goals and preferences for care',
      'Psychological wellbeing (anxiety, depression, stress)',
      'Social support network',
      'Previous hospital admissions and emergency department visits',
    ],
    objectiveData: [
      'Vital signs: BP, HR, RR, SpO₂, weight, BMI, waist circumference',
      'Disease-specific measurements: HbA1c (diabetes), PEFR (asthma), spirometry (COPD), BNP/NT-proBNP (heart failure), eGFR (CKD)',
      'Medication review: current medications, adherence (pill counts, pharmacy records, self-report), inhaler technique, side effects',
      'Complication screening: foot checks (diabetes), retinopathy screening, renal function, cardiovascular risk assessment',
      'Functional status: ADLs, exercise tolerance, quality of life (validated questionnaires)',
      'Social determinants: housing, food security, transport, financial situation',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-cdm-1',
        diagnosis: 'Deficient Self-Management related to inadequate knowledge of chronic disease and self-care strategies',
        relatedFactors: ['Low health literacy', 'Complex medication regimen', 'Cultural barriers', 'Lack of support'],
        definingCharacteristics: ['Unable to describe disease management', 'Poor medication adherence', 'Missed appointments', 'Uncontrolled risk factors'],
      },
      {
        id: 'nd-cdm-2',
        diagnosis: 'Nonadherence to Treatment related to complex regimen, side effects, and psychosocial factors',
        definingCharacteristics: ['Inconsistent medication use', 'Missed doses', 'Unfilled prescriptions', 'Lifestyle not modified'],
      },
      {
        id: 'nd-cdm-3',
        diagnosis: 'Risk for Unstable Blood Glucose Level (diabetes) related to inconsistent self-management',
        definingCharacteristics: ['HbA1c above target', 'Variable blood glucose readings', 'Hypoglycaemic episodes', 'Irregular meal patterns'],
      },
    ],
    goals: [
      {
        id: 'g-cdm-1',
        shortTerm: 'Patient can describe their condition and management plan. Medication adherence assessed and barriers addressed. Disease-specific targets identified. Lifestyle modification goals set.',
        longTerm: 'Disease controlled (HbA1c < 53, BP < 140/90, FEV₁ stable). No preventable hospital admissions. Patient confident in self-management. Quality of life improved.',
      },
    ],
    interventions: [
      { id: 'i-cdm-1', category: 'independent', action: 'Perform comprehensive chronic disease assessment: disease history, current symptoms, medication review (adherence, side effects, interactions), lifestyle assessment (diet, exercise, smoking, alcohol, sleep), psychological screening (PHQ-9, GAD-7), functional assessment, social determinants.', rationale: 'Comprehensive assessment identifies all factors affecting disease control. It is the foundation for person-centred care planning.', frequency: 'Initial assessment; review every 3–6 months' },
      { id: 'i-cdm-2', category: 'independent', action: 'Provide self-management education: use teach-back method to confirm understanding. Cover: disease pathophysiology (simplified), medication purpose and administration, monitoring (blood glucose, BP, PEFR), warning signs, when to seek help, lifestyle modifications.', rationale: 'Self-management education improves adherence, disease control, and quality of life. Teach-back confirms understanding.', frequency: 'At every encounter; focus on different topics each visit' },
      { id: 'i-cdm-3', category: 'independent', action: 'Set collaborative goals using SMART framework (Specific, Measurable, Achievable, Relevant, Time-bound). Examples: "Walk 20 minutes daily for 4 weeks", "Take medication at the same time each day", "Reduce salt intake to < 6 g/day". Review and adjust regularly.', rationale: 'Collaborative goal-setting improves motivation and adherence. SMART goals are actionable and measurable.', frequency: 'At every review; adjust as needed' },
      { id: 'i-cdm-4', category: 'independent', action: 'Screen for complications: annual diabetic foot check, retinopathy screening referral, renal function (eGFR, urine ACR), cardiovascular risk assessment (QRISK), COPD exacerbation review, asthma control assessment (ACT score).', rationale: 'Complication screening enables early detection and intervention, preventing hospitalisation and deterioration.', frequency: 'Per national screening schedule (annual for most)' },
      { id: 'i-cdm-5', category: 'independent', action: 'Support medication adherence: simplify regimens where possible, use pill boxes/dosette boxes, coordinate with pharmacy for monitored dosage systems, address side effects, involve family/caregivers, use text message reminders.', rationale: 'Non-adherence is the most common reason for poor chronic disease control. Practical support addresses barriers.', frequency: 'At every medication review' },
      { id: 'i-cdm-6', category: 'collaborative', action: 'Coordinate multidisciplinary care: GP referral for medication changes, dietitian for dietary advice, physiotherapy for exercise programmes, podiatry for diabetic foot, social services for support needs, mental health services for comorbid depression/anxiety.', rationale: 'Chronic disease management requires a team approach. Coordination prevents fragmented care.', frequency: 'As needed; review at every visit' },
      { id: 'i-cdm-7', category: 'independent', action: 'Implement lifestyle modification support: smoking cessation (brief advice + referral), alcohol reduction (AUDIT screening + brief intervention), physical activity prescription (150 min/week moderate intensity), dietary advice (Mediterranean diet, DASH diet, diabetes-specific).', rationale: 'Lifestyle modifications are first-line management for all chronic diseases. Addressing risk factors reduces disease progression.', frequency: 'Every encounter; brief intervention model' },
    ],
    evaluation: [
      { id: 'e-cdm-1', expected: 'Patient can describe condition and management plan. Medication adherence assessed. Disease-specific targets met. Lifestyle modifications initiated.', status: 'met' },
      { id: 'e-cdm-2', expected: 'No preventable hospital admissions. Disease controlled. Patient confident in self-management. Quality of life improved.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Living Well with Chronic Disease',
        keyPoints: [
          'Your condition is manageable. You are the most important person in managing it.',
          'Take your medications as prescribed. If you have problems, tell your nurse or doctor — do not stop without advice.',
          'Healthy eating, regular exercise, not smoking, and limiting alcohol are the best things you can do.',
          'Know your warning signs and when to seek help.',
          'Keep all your appointments and screening tests.',
          'You are not alone — your healthcare team is here to support you.',
          'Small changes make a big difference over time.',
        ],
        method: 'Verbal, written self-management guides, goal-setting sheets, community resources list',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Self-management plan documented and understood',
        'Medication list provided and reviewed',
        'Next appointment scheduled',
        'Screening tests up to date or referred',
        'Lifestyle goals set collaboratively',
        'Community resources provided',
        'Emergency contact numbers available',
      ],
      followUp: 'Review every 3–6 months (or more frequently if unstable). Annual comprehensive review. Screening per national schedule.',
      referrals: ['GP', 'Dietitian', 'Physiotherapy', 'Podiatry', 'Diabetology', 'Cardiology', 'Respiratory', 'Mental Health', 'Social Services', 'Smoking Cessation', 'Community Support Groups'],
      warningSigns: [
        'Symptoms worsening despite medication',
        'Blood glucose consistently above or below target (diabetes)',
        'Blood pressure consistently above target',
        'New or worsening breathlessness',
        'Chest pain or palpitations',
        'Foot ulcer or infection (diabetes)',
        'Low mood or inability to cope',
      ],
    },
    complications: ['Disease progression', 'Preventable hospital admission', 'Medication adverse effects', 'Hypoglycaemia (diabetes)', 'Cardiovascular event (MI, stroke)', 'End-organ damage (renal, retinal, neuropathic)', 'Depression and anxiety', 'Social isolation and functional decline'],
  },

  'Health Promotion & Disease Prevention': {
    id: 'cp-health-promotion',
    disease: 'Health Promotion & Disease Prevention',
    specialty: 'Community & Public Health Nursing',
    overview: 'Health promotion and disease prevention are core functions of community and public health nursing. This care plan covers health screening programmes, lifestyle modification, health education, and population-level interventions. The nurse acts as educator, advocate, counsellor, and coordinator, working with individuals, families, and communities to improve health outcomes and reduce health inequalities.',
    pathophysiology: 'Health promotion operates at three levels: primary prevention (prevent disease before it occurs — vaccination, screening, health education), secondary prevention (detect disease early — screening programmes, early intervention), and tertiary prevention (reduce impact of established disease — rehabilitation, self-management support). The social determinants of health (housing, education, income, employment, social support) account for 60–80% of health outcomes. Effective health promotion addresses these upstream factors alongside individual behaviour change.',
    commonCauses: ['Cancer screening (breast, cervical, bowel, prostate)', 'Cardiovascular risk screening (BP, cholesterol, diabetes)', 'Sexual health screening (STIs, HIV)', 'Mental health screening (depression, anxiety)', 'Maternal and child health (antenatal, postnatal, child health surveillance)', 'Smoking cessation programmes', 'Obesity prevention and management', 'Substance misuse prevention', 'Falls prevention in elderly', 'Injury prevention (road safety, home safety)'],
    riskFactors: ['Health illiteracy', 'Poverty and deprivation', 'Social isolation', 'Unhealthy diet', 'Physical inactivity', 'Smoking', 'Excessive alcohol use', 'Unsafe sexual behaviour', 'Low uptake of screening', 'Vaccine hesitancy', 'Cultural and linguistic barriers', 'Mental health conditions'],
    subjectiveData: [
      'Self-reported health status and wellbeing',
      'Understanding of health risks and prevention',
      'Screening participation history',
      'Lifestyle habits (diet, exercise, smoking, alcohol, sleep)',
      'Barriers to healthy behaviours',
      'Social and environmental factors affecting health',
      'Mental health and emotional wellbeing',
      'Family history of chronic disease',
    ],
    objectiveData: [
      'Vital signs: BP, HR, weight, BMI, waist circumference',
      'Screening test results (where applicable)',
      'Lifestyle assessment: validated tools (AUDIT for alcohol, PHQ-9 for depression, IPAQ for physical activity)',
      'Risk factor assessment: QRISK, Framingham, diabetes risk score',
      'Health literacy assessment',
      'Social determinants assessment (housing, employment, income, transport)',
      'Community health needs assessment data',
      'Population health indicators (deprivation indices, disease prevalence)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-hp-1',
        diagnosis: 'Deficient Health Maintenance related to lack of knowledge of preventive health measures and screening',
        relatedFactors: ['Low health literacy', 'Lack of access to services', 'Cultural barriers', 'Prioritisation of other needs'],
        definingCharacteristics: ['Not up to date with screening', 'Unaware of risk factors', 'Does not attend health checks', 'Unhealthy lifestyle behaviours'],
      },
      {
        id: 'nd-hp-2',
        diagnosis: 'Readiness for Enhanced Health Management related to motivation to improve health and modify risk factors',
        definingCharacteristics: ['Expresses desire to change', 'Asks questions about health', 'Attends appointments', 'Engages with health education'],
      },
      {
        id: 'nd-hp-3',
        diagnosis: 'Risk for Injury related to unhealthy lifestyle behaviours and environmental hazards',
        definingCharacteristics: ['Smoking', 'Excessive alcohol', 'Unsafe sexual behaviour', 'Poor home safety', 'Inadequate nutrition'],
      },
    ],
    goals: [
      {
        id: 'g-hp-1',
        shortTerm: 'Health screening status assessed. Risk factors identified. Health education provided. Screening referrals made. Lifestyle modification goals set.',
        longTerm: 'Patient engaging in preventive health behaviours. Screening up to date. Risk factors reduced. Health literacy improved. Community health outcomes improving.',
      },
    ],
    interventions: [
      { id: 'i-hp-1', category: 'independent', action: 'Conduct health screening assessment: check status of all relevant screening programmes (cervical, breast, bowel, prostate, AAA, cardiovascular, diabetes, STIs, mental health). Identify gaps and arrange screening. Explain benefits of each.', rationale: 'Screening programmes detect disease early when treatment is most effective. Many eligible people do not attend.', frequency: 'At each health assessment; annually' },
      { id: 'i-hp-2', category: 'independent', action: 'Provide health education using evidence-based, culturally sensitive materials. Cover: nutrition, physical activity, smoking cessation, alcohol reduction, sexual health, mental wellbeing, sleep hygiene, injury prevention. Use plain language and teach-back method.', rationale: 'Health education empowers individuals to make informed choices. Culturally sensitive approaches improve engagement in diverse populations.', frequency: 'Every encounter; tailored to individual needs' },
      { id: 'i-hp-3', category: 'independent', action: 'Implement brief interventions for modifiable risk factors: brief advice on smoking (5 As), alcohol (SBIRT model), physical activity (exercise prescription), diet (healthy eating advice). Refer to specialist services if needed.', rationale: 'Brief interventions in primary care are evidence-based, cost-effective, and can achieve meaningful behaviour change.', frequency: 'At every encounter; opportunistic' },
      { id: 'i-hp-4', category: 'independent', action: 'Address social determinants: assess housing, employment, financial situation, transport, social support. Connect patients with community resources (food banks, housing services, employment support, social groups, exercise programmes).', rationale: 'Social determinants are the biggest drivers of health inequalities. Addressing them is essential for effective health promotion.', frequency: 'At each assessment; ongoing referral' },
      { id: 'i-hp-5', category: 'independent', action: 'Support mental health: screen for depression (PHQ-9) and anxiety (GAD-7) at every health assessment. Provide brief psychological support. Refer to mental health services if indicated. Reduce stigma through normalising conversations about mental health.', rationale: 'Mental health is integral to overall health. Depression and anxiety are common and treatable but often unrecognised.', frequency: 'Every health assessment' },
      { id: 'i-hp-6', category: 'independent', action: 'Engage with community groups and populations: deliver health education sessions in community settings (schools, workplaces, faith groups, community centres). Participate in public health campaigns (Stoptober, Mental Health Awareness Week, etc.).', rationale: 'Community-level interventions reach populations that do not engage with healthcare services. They address health at a population level.', frequency: 'Ongoing; per community needs assessment' },
    ],
    evaluation: [
      { id: 'e-hp-1', expected: 'Screening status assessed and gaps addressed. Risk factors identified and being modified. Health education delivered. Patient engaged with preventive care.', status: 'met' },
      { id: 'e-hp-2', expected: 'Patient adopting healthier behaviours. Screening up to date. Mental health stable. Community engagement improved.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Preventive Health',
        keyPoints: [
          'Prevention is better than cure. Regular health checks can detect problems early.',
          'Keep up to date with screening tests — they save lives.',
          'Small changes to diet, exercise, smoking, and alcohol make a big difference.',
          'Mental health is as important as physical health. Talk to someone if you are struggling.',
          'Your community has resources to help you — ask your nurse about local services.',
          'Health is not just about medicine — it includes housing, food, social connections, and purpose.',
        ],
        method: 'Verbal, written health promotion materials, community resources directory',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Health screening status reviewed and referrals made',
        'Health education provided and understood',
        'Lifestyle modification goals set',
        'Mental health screening completed',
        'Community resources provided',
        'Next health check appointment scheduled',
        'Social needs assessed and addressed',
      ],
      followUp: 'Annual health check. Screening per national programme schedule. Follow-up on any referrals made.',
      referrals: ['GP for health screening', 'Smoking Cessation Service', 'Weight Management Service', 'Mental Health Services', 'Community Groups', 'Social Services', 'Sexual Health Clinic', 'Substance Misuse Services'],
      warningSigns: [
        'New symptoms or health concerns',
        'Worsening mental health',
        'Inability to access healthy food or safe housing',
        'Social isolation or loss of support',
        'Missed screening appointments',
      ],
    },
    complications: ['Missed screening opportunities', 'Late detection of disease', 'Health inequalities persisting', 'Chronic disease development', 'Mental health deterioration', 'Social isolation', 'Preventable hospital admissions'],
  },

  // ═══════════════════════════════════════════════════════════════
  // PERIOPERATIVE & SURGICAL NURSING
  // ═══════════════════════════════════════════════════════════════

  'Pre-Operative Assessment': {
    id: 'cp-preop',
    disease: 'Pre-Operative Assessment',
    specialty: 'Perioperative & Surgical Nursing',
    overview: 'Pre-operative assessment is a systematic evaluation of a surgical patient\'s fitness for anaesthesia and surgery. It identifies modifiable risk factors, ensures informed consent, and plans post-operative care. The assessment includes medical history, physical examination, functional capacity, investigation review, risk stratification (ASA grade), and patient education. Effective pre-operative assessment reduces cancellations, complications, and mortality.',
    pathophysiology: 'Surgical stress triggers a neuroendocrine response (sympathetic activation, cortisol release, hyperglycaemia, fluid retention) and inflammatory cascade. Patients with pre-existing conditions are at higher risk of perioperative decompensation. Cardiovascular risk is assessed using functional capacity (METs), Revised Cardiac Risk Index (RCRI), and ACS NSQIP calculator. Pulmonary risk is assessed using ARISCAT score. Nutritional status, coagulation, renal function, and diabetes control all affect surgical outcomes.',
    commonCauses: ['Scheduled elective surgery (all types)', 'Emergency surgery (abbreviated assessment)', 'High-risk surgery (cardiac, abdominal, vascular)', 'Patients with multiple comorbidities', 'Patients on anticoagulants or antiplatelets', 'Patients with previous anaesthetic complications'],
    riskFactors: ['Advanced age (> 70)', 'ASA grade ≥ 3', 'Poor functional capacity (< 4 METs)', 'Uncontrolled diabetes (HbA1c > 8.5%)', 'Uncontrolled hypertension', 'Recent MI (< 6 weeks)', 'Active cardiac failure', 'COPD or asthma (poorly controlled)', 'Renal impairment (eGFR < 30)', 'Obesity (BMI > 35)', 'Anaemia (Hb < 10 g/dL)', 'Malnutrition (BMI < 18.5, albumin < 30)', 'Anticoagulant use', 'Previous anaesthetic complications (malignant hyperthermia, difficult intubation)'],
    subjectiveData: [
      'Medical history: comorbidities, previous surgeries and anaesthetics, allergies, family history of anaesthetic complications',
      'Current medications (especially anticoagulants, antihypertensives, insulin, steroids, herbal remedies)',
      'Functional capacity: can they climb stairs, walk on flat, do housework? (METs score)',
      'Smoking and alcohol history',
      'Previous surgical complications (DVT, PE, wound infection, bleeding)',
      'Patient expectations, fears, and concerns about surgery',
      'Consent understanding (procedure, risks, benefits, alternatives)',
      'Social history: living situation, support, transportation home',
      'Advance directives / resuscitation status',
    ],
    objectiveData: [
      'Vital signs: BP, HR, RR, SpO₂, temperature, weight, BMI',
      'Airway assessment: Mallampati score, mouth opening, neck movement, dentition, BMI',
      'Cardiovascular: heart sounds, JVP, peripheral oedema, peripheral pulses',
      'Respiratory: auscultation, peak flow (if indicated)',
      'Investigations: FBC (Hb, WCC, platelets), U&Es (creatinine, eGFR, K⁺), coagulation (INR, APTT), glucose/HbA1c, ECG (if > 60 or cardiac history), CXR (if indicated), Group & Save/Crossmatch',
      'ASA physical status classification (I–V)',
      'RCRI (Revised Cardiac Risk Index) score',
      'ARISCAT (pulmonary risk) score',
      'Nutritional assessment (MUST score)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-preop-1',
        diagnosis: 'Deficient Knowledge related to surgical procedure, risks, and post-operative expectations',
        relatedFactors: ['Unfamiliarity with procedure', 'Health literacy level', 'Anxiety'],
        definingCharacteristics: ['Unable to describe procedure', 'Expresses fear or anxiety', 'Multiple questions about surgery', 'Asks about risks repeatedly'],
      },
      {
        id: 'nd-preop-2',
        diagnosis: 'Anxiety related to impending surgery and uncertainty of outcome',
        relatedFactors: ['Fear of pain', 'Fear of death', 'Previous negative surgical experience', 'Unknown anaesthetic experience'],
        definingCharacteristics: ['Verbalised anxiety', 'Tachycardia', 'Insomnia', 'Restlessness', 'Inability to concentrate'],
      },
      {
        id: 'nd-preop-3',
        diagnosis: 'Risk for Perioperative Hypothermia related to anaesthesia-induced thermoregulatory impairment and surgical exposure',
        definingCharacteristics: ['Core temperature < 36°C', 'Prolonged surgery', 'Large surgical site exposure', 'Anaesthetic vasodilation'],
      },
    ],
    goals: [
      {
        id: 'g-preop-1',
        shortTerm: 'Patient fully assessed and optimised for surgery. Informed consent obtained. Anxiety addressed. NBM status confirmed. Pre-operative medications given as prescribed.',
        longTerm: 'Patient proceeds to surgery with optimised risk factors. Post-operative care plan in place. Complications minimised.',
      },
    ],
    interventions: [
      { id: 'i-preop-1', category: 'independent', action: 'Perform systematic pre-operative assessment: (1) Verify patient identity, consent, and surgical site (WHO Surgical Safety Checklist), (2) Complete medical and surgical history, (3) Physical examination (airway, cardiovascular, respiratory, neurological), (4) Review investigations, (5) Risk stratification (ASA, RCRI, ARISCAT).', rationale: 'Systematic assessment ensures no critical factor is missed. Standardised tools improve consistency and risk prediction.', frequency: 'Before every surgical procedure' },
      { id: 'i-preop-2', category: 'independent', action: 'Optimise modifiable risk factors: correct anaemia (iron, transfusion), optimise diabetes (HbA1c < 8.5%), control hypertension (BP < 160/100), Smoking cessation (ideally 4–8 weeks pre-op), adjust anticoagulants per protocol, manage malnutrition (dietitian referral).', rationale: 'Modifiable risk factors significantly affect surgical outcomes. Prehabilitation improves recovery.', frequency: '4–8 weeks before elective surgery; as time allows' },
      { id: 'i-preop-3', category: 'independent', action: 'Educate patient on: procedure description (in plain language), expected recovery timeline, pain management plan, deep breathing exercises (incentive spirometry), early mobilisation, wound care, drains and catheters, when to seek help. Use teach-back method.', rationale: 'Patient education reduces anxiety, improves cooperation, and enhances post-operative recovery. Teach-back confirms understanding.', frequency: 'Before surgery; use pre-operative education materials' },
      { id: 'i-preop-4', category: 'independent', action: 'Manage pre-operative fasting: NBM for solids 6 h, clear fluids up to 2 h (per Enhanced Recovery After Surgery — ERAS guidelines). Document NBM time. Administer pre-operative carbohydrate drink if ERAS protocol in use.', rationale: 'Prolonged fasting causes insulin resistance, dehydration, and discomfort. ERAS protocols shorten fasting and improve outcomes.', frequency: 'Day of surgery' },
      { id: 'i-preop-5', category: 'independent', action: 'Administer pre-operative medications as prescribed: anxiolytics (lorazepam if anxious), PPI (if GORD or aspiration risk), antibiotic prophylaxis (within 60 min of incision), thromboprophylaxis (LMWH if high VTE risk), bowel preparation if required.', rationale: 'Pre-operative medications reduce anxiety, aspiration risk, infection risk, and VTE risk.', frequency: 'Per prescription; timing critical for antibiotics' },
      { id: 'i-preop-6', category: 'independent', action: 'Complete WHO Surgical Safety Checklist (Sign In): verify patient identity, procedure, site, consent, anaesthesia safety check, anticipated blood loss, antibiotic prophylaxis given, essential imaging displayed.', rationale: 'The WHO checklist reduces surgical complications by 36% and mortality by 47%. It is a mandatory safety intervention.', frequency: 'Before every surgical procedure' },
    ],
    evaluation: [
      { id: 'e-preop-1', expected: 'Patient fully assessed and risk factors identified. Modifiable factors optimised. Informed consent obtained. Anxiety reduced. Pre-operative preparations complete.', status: 'met' },
      { id: 'e-preop-2', expected: 'Patient proceeding to surgery with optimised risk profile. Post-operative care plan documented. WHO checklist completed.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Preparing for Surgery',
        keyPoints: [
          'You will be assessed by the nurse and anaesthetist before your operation.',
          'Tell us about ALL your medications, especially blood thinners, insulin, and herbal remedies.',
          'Do not eat solid food for 6 hours before surgery. You may drink clear fluids (water, black tea) up to 2 hours before.',
          'Practice deep breathing exercises — this helps prevent chest infection after surgery.',
          'Arrange someone to take you home after surgery.',
          'Tell us about any previous problems with anaesthesia.',
          'It is normal to feel anxious — talk to us about your concerns.',
        ],
        method: 'Verbal, pre-operative education leaflet, video, teach-back',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Pre-operative assessment complete',
        'Informed consent signed',
        'Investigations reviewed and normalised',
        'Medications adjusted (anticoagulants, insulin, etc.)',
        'NBM confirmed and documented',
        'Pre-operative medications administered',
        'WHO checklist completed',
        'Post-operative care plan documented',
        'Discharge planning initiated (expected length of stay, home support)',
      ],
      followUp: 'Surgery as planned. Post-operative review in recovery. Ward-based post-operative care per ERAS protocol.',
      referrals: ['Anaesthetics for pre-anaesthetic review', 'Dietitian for nutritional optimisation', 'Physiotherapy for prehabilitation', 'Medicine for comorbidity optimisation', 'Smoking Cessation', 'Social Services for discharge planning'],
      warningSigns: [
        'New chest pain or palpitations before surgery',
        'Fever or infection before surgery (may need to cancel)',
        'Uncontrolled blood pressure',
        'Uncontrolled diabetes',
        'Inability to stop anticoagulants safely',
      ],
    },
    complications: ['Anaesthetic complications (difficult intubation, aspiration)', 'Cardiac event (MI, arrhythmia)', 'Pulmonary complication (atelectasis, pneumonia)', 'VTE (DVT, PE)', 'Surgical site infection', 'Post-operative ileus', 'Acute kidney injury', 'Perioperative mortality (varies with ASA grade)'],
  },

  'Intra-Operative Care': {
    id: 'cp-intraop',
    disease: 'Intra-Operative Care',
    specialty: 'Perioperative & Surgical Nursing',
    overview: 'Intra-operative care encompasses the nursing responsibilities during surgery, including surgical preparation, maintaining the sterile field, monitoring the patient, managing equipment, and ensuring patient safety. The scrub nurse maintains the sterile field and assists the surgical team. The circulating nurse manages the overall environment, documentation, and patient safety. This care plan addresses both roles.',
    pathophysiology: 'Anaesthesia suppresses protective reflexes (cough, gag, thermoregulation) and causes vasodilation, hypotension, respiratory depression, and hypothermia. Surgical trauma triggers inflammation, blood loss, fluid shifts, and coagulation activation. The patient is at risk for: positioning injuries, nerve damage, pressure injuries, hypothermia, infection (from breach of sterile technique), wrong-site surgery, retained swabs/instruments, and anaesthetic complications. Vigilant monitoring and strict aseptic technique are essential.',
    commonCauses: ['All surgical procedures (general, orthopaedic, cardiac, neuro, urological, gynaecological, ENT)', 'Emergency surgery', 'Day-case surgery', 'Procedures under regional or local anaesthesia with sedation'],
    riskFactors: ['Prolonged surgery (> 2 h)', 'Major blood loss', 'Multiple team members in theatre', 'Emergency surgery (rushed preparation)', 'Complex instrumentation', 'Reusable instruments (cross-contamination risk)', 'Immunosuppressed patient', 'Diabetes', 'Obesity', 'Old age'],
    subjectiveData: [
      'Patient is under anaesthesia and cannot self-report',
      'Pre-operative assessment data from pre-op checklist',
      'Anaesthetic plan (general, regional, local)',
      'Surgical procedure and expected duration',
      'Anticipated blood loss and special requirements',
      'Patient allergies confirmed',
    ],
    objectiveData: [
      'WHO Surgical Safety Checklist: Time Out completed (confirm procedure, site, team introduction, antibiotic prophylaxis, anticipated critical events)',
      'Anaesthetic monitoring: ECG, SpO₂, EtCO₂, NIBP/arterial line, temperature, urine output, blood loss',
      'Surgical field: sterile technique maintained, instrument count (initial, closing, final), swab count, needle count',
      'Patient positioning: pressure points padded, limbs supported, nerves protected, eyes protected',
      'Equipment functioning: diathermy, suction, lighting, tourniquet (if used)',
      'Environmental: temperature maintained (warm IV fluids, Bair Hugger), humidity, noise',
      'Specimen management: correctly labelled, stored, sent to pathology',
      'Implants/prostheses: checked, documented, lot numbers recorded',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-intraop-1',
        diagnosis: 'Risk for Perioperative Hypothermia related to anaesthesia, surgical exposure, and cold environment',
        definingCharacteristics: ['Core temperature < 36°C', 'Anaesthetic vasodilation', 'Cold theatre environment', 'Cold IV fluids', 'Large surgical site'],
      },
      {
        id: 'nd-intraop-2',
        diagnosis: 'Risk for Infection related to breach of sterile technique and invasive surgical procedure',
        definingCharacteristics: ['Surgical incision', 'Invasive monitoring', 'Prolonged procedure', 'Immunosuppression', 'Multiple instrument exchanges'],
      },
      {
        id: 'nd-intraop-3',
        diagnosis: 'Risk for Injury related to surgical positioning and prolonged immobility under anaesthesia',
        definingCharacteristics: ['Anaesthesia-induced immobility', 'Prolonged position', 'Pressure points', 'Nerve compression risk'],
      },
    ],
    goals: [
      {
        id: 'g-intraop-1',
        shortTerm: 'Patient positioned safely. Sterile field maintained. Instrument counts correct. Vital signs within acceptable range. WHO checklist completed. Hypothermia prevented.',
        longTerm: 'Surgical procedure completed safely. No intra-operative complications (injury, infection, bleeding). Patient transferred to recovery in stable condition.',
      },
    ],
    interventions: [
      { id: 'i-intraop-1', category: 'independent', action: 'Complete WHO Surgical Safety Checklist (Time Out): before skin incision, confirm patient identity, procedure, surgical site, consent, team members introduced, antibiotic prophylaxis given, anticipated critical events, essential imaging displayed, and any patient-specific concerns raised.', rationale: 'Time Out is the most critical safety step in surgery. It prevents wrong-site, wrong-patient, and wrong-procedure surgery.', frequency: 'Before every skin incision' },
      { id: 'i-intraop-2', category: 'independent', action: 'Maintain sterile technique: surgical hand scrub, gowning and gloving, sterile field preparation, draping technique, instrument handling (never reach over sterile field), water test for sterilisation, regular sterility checks.', rationale: 'Breaks in sterile technique are the leading cause of surgical site infections. Every team member is responsible for maintaining sterility.', frequency: 'Continuously throughout procedure' },
      { id: 'i-intraop-3', category: 'independent', action: 'Perform instrument, swab, and needle counts: initial count before skin incision, count at cavity closure, count at skin closure, final count before patient leaves theatre. Count with scrub nurse and circulating nurse. Document and report discrepancies immediately.', rationale: 'Retained foreign bodies (swabs, instruments) are a never event. Counts are the primary prevention method.', frequency: 'Initial, closing, final counts per protocol' },
      { id: 'i-intraop-4', category: 'independent', action: 'Prevent perioperative hypothermia: warm IV fluids and blood products, use forced-air warming device (Bair Hugger), maintain theatre temperature > 21°C, use warm irrigation fluids, monitor core temperature continuously. Target ≥ 36°C.', rationale: 'Hypothermia increases surgical site infection risk (40%), bleeding (16% increase in transfusion), cardiac events, and prolongs recovery.', frequency: 'Continuous temperature monitoring; warming measures throughout' },
      { id: 'i-intraop-5', category: 'independent', action: 'Ensure safe patient positioning: pad all pressure points (sacrum, heels, elbows), ensure eyes are closed and padded, arms on armboards (not > 90° abduction), neutral wrist position, leg position avoids nerve stretch, use gel pads for bony prominences. Reposition every 2 h for long procedures.', rationale: 'Positioning injuries (pressure sores, nerve palsies, eye injury) are preventable complications of anaesthesia and surgery.', frequency: 'At positioning; reassess regularly' },
      { id: 'i-intraop-6', category: 'independent', action: 'Document intra-operative events: procedure start and end times, anaesthetic type, fluid balance (input/output/blood loss), specimens sent, implants used (lot numbers), any complications, skin integrity check, instruments counted and correct.', rationale: 'Accurate documentation ensures continuity of care and medicolegal protection.', frequency: 'Real-time documentation throughout procedure' },
    ],
    evaluation: [
      { id: 'e-intraop-1', expected: 'WHO checklist completed. Sterile technique maintained. Counts correct. Patient normothermic. Positioning safe. Documentation complete.', status: 'met' },
      { id: 'e-intraop-2', expected: 'Surgical procedure completed without complications. Patient stable on transfer to recovery.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'What Happens in Theatre',
        keyPoints: [
          'While you are asleep, a specialist team looks after you.',
          'We use a safety checklist (WHO) to make sure everything is correct.',
          'Your body temperature is kept warm to help healing.',
          'Instruments are counted before and after to make sure nothing is left inside.',
          'You will be moved to the recovery room when the operation is finished.',
        ],
        method: 'Verbal (pre-operative); this is for family information',
      },
    ],
    dischargePlanning: {
      checklist: [
        'WHO Sign Out completed (procedure confirmed, specimens labelled, instruments counted)',
        'Intra-operative documentation complete',
        'Patient transferred safely to recovery',
        'Handover to recovery nurse (procedure, blood loss, fluids, medications, concerns)',
        'Specimens sent to pathology',
        'Implant documentation complete',
      ],
      followUp: 'Immediate post-operative care in recovery. Ward-based care per ERAS protocol.',
      referrals: ['Recovery team', 'Ward nursing team', 'Pain team (if complex pain management)'],
      warningSigns: [
        'Instrument count discrepancy (never event — immediate escalation)',
        'Unexpected bleeding or haemodynamic instability',
        'Temperature < 36°C on arrival to recovery',
        'Positioning injury identified post-operatively',
      ],
    },
    complications: ['Surgical site infection', 'Hypothermia', 'Positioning injury (pressure sore, nerve palsy)', 'Wrong-site surgery (never event)', 'Retained foreign body (never event)', 'Intra-operative awareness', 'Anaesthetic complications (malignant hyperthermia, anaphylaxis)', 'Haemorrhage', 'Cardiac arrest'],
  },

  'Post-Anaesthesia Recovery': {
    id: 'cp-pacu',
    disease: 'Post-Anaesthesia Recovery',
    specialty: 'Perioperative & Surgical Nursing',
    overview: 'Post-Anaesthesia Recovery (PACU / Recovery) care involves the monitoring and management of patients immediately after surgery as they emerge from anaesthesia. This critical phase typically lasts 1–2 hours and involves managing airway, breathing, circulation, consciousness, temperature, pain, nausea/vomiting, and surgical site. The Modified Aldrete Score guides discharge from recovery to the ward.',
    pathophysiology: 'General anaesthesia suppresses consciousness, protective reflexes (cough, gag, swallowing), thermoregulation, and respiratory drive. Regional anaesthesia causes motor and sensory blockade. As anaesthetic agents are metabolised, patients gradually regain consciousness, airway reflexes, and spontaneous ventilation. Common post-anaesthetic complications include: respiratory depression/obstruction, hypotension (vasodilation, bleeding, fluid shifts), hypothermia (residual vasodilation), nausea/vomiting (opioid and volatile agent effects), pain (surgical and procedural), and delayed emergence (residual anaesthetic, electrolyte imbalance).',
    commonCauses: ['Recovery from general anaesthesia', 'Recovery from regional anaesthesia (spinal, epidural)', 'Post-sedation recovery (procedural sedation)', 'Day-case and inpatient surgical recovery'],
    riskFactors: ['Obesity (BMI > 35)', 'OSA (obstructive sleep apnoea)', 'Extremes of age', 'Difficult intubation history', 'Prolonged surgery (> 2 h)', 'Major surgery', 'Opioid use', 'Motion sickness history', 'Previous PONV', 'Anaesthetic type (volatile > TIVA for PONV)', 'Fluid shifts and blood loss'],
    subjectiveData: [
      'Patient is emerging from anaesthesia and may be confused, drowsy, or agitated',
      'Verbal pain assessment when patient is able to communicate (NRS 0–10)',
      'Patient\'s report of nausea (if able to communicate)',
      'Previous post-anaesthetic experiences',
    ],
    objectiveData: [
      'Airway: patent, obstructed (snoring, stridor), endotracheal tube/tracheostomy in situ',
      'Breathing: rate, depth, SpO₂, EtCO₂ (if monitored), chest movement, breath sounds',
      'Circulation: HR, BP (NIBP every 5 min initially), capillary refill, peripheral pulses, fluid balance, drains',
      'Consciousness: GCS, AVPU, Aldrete score components (activity, respiration, circulation, consciousness, SpO₂)',
      'Temperature: core temperature (target ≥ 36°C), cold peripheries, shivering',
      'Pain: NRS (0–10), location, character, effective analgesia',
      'Nausea and vomiting: presence, severity, treatment given',
      'Surgical site: dressing intact, drainage, bleeding, swelling',
      'Urine output (if catheterised)',
      'Residual neuromuscular blockade (train-of-four if indicated)',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-pacu-1',
        diagnosis: 'Ineffective Airway Clearance related to residual anaesthetic effects, sedation, and upper airway muscle relaxation',
        relatedFactors: ['Residual anaesthetic', 'Opioid effect', 'Oropharyngeal oedema', 'Obesity', 'OSA'],
        definingCharacteristics: ['Snoring', 'Stridor', 'SpO₂ < 92%', 'Obstructed breathing pattern', 'Need for airway adjunct'],
      },
      {
        id: 'nd-pacu-2',
        diagnosis: 'Acute Pain related to surgical incision and tissue trauma',
        relatedFactors: ['Surgical trauma', 'Tissue manipulation', 'Inflammatory response'],
        definingCharacteristics: ['Verbal pain report', 'Guarding', 'Tachycardia', 'Hypertension', 'Diaphoresis', 'Grimacing'],
      },
      {
        id: 'nd-pacu-3',
        diagnosis: 'Risk for Hypothermia related to residual anaesthetic vasodilation and surgical exposure',
        definingCharacteristics: ['Core temperature < 36°C', 'Shivering', 'Cold peripheries', 'Prolonged surgery'],
      },
      {
        id: 'nd-pacu-4',
        diagnosis: 'Nausea related to opioid and volatile anaesthetic effects',
        definingCharacteristics: ['Verbal report of nausea', 'Retching', 'Vomiting', 'Pallor', 'Diaphoresis'],
      },
    ],
    goals: [
      {
        id: 'g-pacu-1',
        shortTerm: 'Airway patent and maintained. SpO₂ ≥ 94% on supplemental O₂. Pain managed (NRS ≤ 4/10). Nausea controlled. Temperature ≥ 36°C. Aldrete score ≥ 9/10.',
        longTerm: 'Patient safely transferred to ward or discharged home (day-case). No post-anaesthetic complications. Patient satisfied with pain management.',
      },
    ],
    interventions: [
      { id: 'i-pacu-1', category: 'independent', action: 'Monitor airway and breathing continuously: assess airway patency (head-tilt, jaw thrust, recovery position if needed), apply jaw thrust or oral/nasal airway if obstructed, call for anaesthetic help if unable to maintain airway, monitor SpO₂ continuously.', rationale: 'Airway obstruction is the most common and dangerous post-anaesthetic complication. Early intervention prevents hypoxic brain injury.', frequency: 'Continuous monitoring; assessment every 1–2 min initially' },
      { id: 'i-pacu-2', category: 'independent', action: 'Manage haemodynamics: NIBP every 5 min until stable (then every 15 min), HR continuous, assess for hypotension (BP < 90/60 or > 20% below baseline). If hypotensive: check fluid balance, surgical bleeding, vasodilation. Treat per protocol (fluid bolus, vasopressor).', rationale: 'Hypotension is common post-anaesthesia (vasodilation, blood loss, fluid shifts). Prompt treatment prevents organ hypoperfusion.', frequency: 'NIBP every 5 min initially; continuous ECG' },
      { id: 'i-pacu-3', category: 'independent', action: 'Manage pain: assess using NRS (0–10) when patient can communicate. Administer prescribed analgesia: IV opioids (morphine 2–4 mg titrated, fentanyl 25–50 μg), paracetamol 1 g, NSAIDs (if no contraindication). For regional anaesthesia, assess block level. Reassess pain 15 min after each intervention.', rationale: 'Adequate pain management in recovery prevents tachycardia, hypertension, and poor wound healing. Titrated IV opioids allow precise dosing.', frequency: 'NRS assessment every 15 min; reassess after each analgesic' },
      { id: 'i-pacu-4', category: 'independent', action: 'Prevent and treat hypothermia: check core temperature on arrival, apply forced-air warming if < 36°C, warm IV fluids, cover with blankets. If shivering: administer pethidine 25 mg IV or tramadol 50 mg IV (per protocol).', rationale: 'Hypothermia increases bleeding, infection risk, and cardiac events. Shivering increases oxygen consumption by 100%.', frequency: 'Temperature on arrival; every 15 min until ≥ 36°C' },
      { id: 'i-pacu-5', category: 'independent', action: 'Manage PONV (post-operative nausea and vomiting): assess using visual analogue scale. Administer antiemetics: ondansetron 4 mg IV, dexamethasone 4–8 mg IV (if not already given intra-op), or droperidol 0.625 mg IV. Offer sips of clear fluid if tolerated. Sit patient up if able.', rationale: 'PONV occurs in 30% of surgical patients and is the leading cause of delayed recovery and unplanned admission. Multimodal antiemetics are most effective.', frequency: 'Every 15 min; treat when NRS nausea ≥ 4/10' },
      { id: 'i-pacu-6', category: 'independent', action: 'Monitor for delayed emergence: if GCS < 15 at 30 min post-extubation, assess: residual anaesthetic (especially with long-acting agents), opioids (naloxone if opioid-induced sedation), benzodiazepines (flumazenil if indicated), hypothermia, hypoglycaemia, electrolyte imbalance, intracranial pathology. Escalate to anaesthetist.', rationale: 'Delayed emergence requires systematic evaluation to identify and treat the cause. Empirical reversal agents should be used cautiously.', frequency: 'GCS every 5 min until GCS 15' },
      { id: 'i-pacu-7', category: 'independent', action: 'Assess readiness for discharge using Modified Aldrete Score (≥ 9/10): Activity (4), Respiration (2), Circulation (2), Consciousness (2), SpO₂ (2). Also assess: pain controlled, nausea resolved, surgical site stable, no bleeding, voided (if required), escort arranged.', rationale: 'The Aldrete Score is the standard tool for assessing post-anaesthetic recovery readiness. Score ≥ 9 indicates safe transfer to ward.', frequency: 'Every 15 min; when score ≥ 9, prepare for transfer' },
    ],
    evaluation: [
      { id: 'e-pacu-1', expected: 'Airway patent. SpO₂ ≥ 94%. Pain NRS ≤ 4/10. Nausea resolved. Temperature ≥ 36°C. Aldrete ≥ 9. Patient alert and oriented.', status: 'met' },
      { id: 'e-pacu-2', expected: 'Safe transfer to ward or discharge home. No post-anaesthetic complications. Patient satisfied with care.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Recovery After Anaesthesia',
        keyPoints: [
          'You will be monitored closely in the recovery room after your operation.',
          'It is normal to feel drowsy, confused, or shivery at first — this wears off.',
          'Tell us if you are in pain or feel sick — we can give you medication.',
          'You may have oxygen on via a face mask — this helps while you recover.',
          'Do not try to get up until the nurse says it is safe.',
          'Once you are stable, you will be moved to the ward or discharged home.',
        ],
        method: 'Verbal (when patient is alert); written recovery information for day-case patients',
      },
    ],
    dischargePlanning: {
      checklist: [
        'Aldrete score ≥ 9/10',
        'Airway maintained independently',
        'SpO₂ ≥ 94% on room air (or baseline)',
        'Pain controlled (NRS ≤ 4/10)',
        'Nausea resolved',
        'Temperature ≥ 36°C',
        'Surgical site stable, no active bleeding',
        'Drains and catheters documented',
        'Ward or discharge destination confirmed',
        'Escort arranged (if day-case)',
        'Discharge medications and instructions provided (day-case)',
      ],
      followUp: 'Ward-based care per ERAS protocol. Day-case follow-up phone call at 24–48 h. Surgical follow-up as per protocol.',
      referrals: ['Ward nursing team', 'Pain team (if complex pain)', 'Physiotherapy (post-op mobilisation)', 'Dietitian (if nutritional concerns)', 'Social Services (discharge planning)'],
      warningSigns: [
        'Airway obstruction (stridor, snoring, desaturation)',
        'Uncontrolled pain despite analgesia',
        'Persistent nausea and vomiting',
        'Active bleeding from surgical site',
        'Temperature < 36°C or > 38.5°C',
        'Confusion or agitation not resolving',
      ],
    },
    complications: ['Airway obstruction', 'Hypoxaemia', 'Hypotension', 'Hypothermia', 'Post-operative nausea and vomiting (PONV)', 'Uncontrolled pain', 'Delayed emergence', 'Aspiration', 'Laryngospasm', 'Cardiac arrhythmia', 'Unplanned ICU admission'],
  },

  'Surgical Site Infection Prevention': {
    id: 'cp-ssi-prevention',
    disease: 'Surgical Site Infection Prevention',
    specialty: 'Perioperative & Surgical Nursing',
    overview: 'Surgical site infection (SSI) is the most common healthcare-associated infection, occurring in 2–5% of surgical patients. SSIs increase mortality, hospital stay (7–10 extra days), and healthcare costs. Prevention requires a multimodal approach: pre-operative optimisation, antibiotic prophylaxis, skin preparation, maintenance of normothermia, glycaemic control, sterile technique, and post-operative wound care. This care plan covers the perioperative SSI prevention bundle.',
    pathophysiology: 'SSIs result from bacterial contamination of the surgical wound during or after surgery. Sources include: patient skin flora (most common), endogenous flora (GI, respiratory), operating theatre air, surgical instruments, and personnel. The wound infection threshold depends on: bacterial load, host immune status, and local wound factors (blood supply, foreign material, dead space). SSIs are classified as: superficial incisional (skin/subcutaneous), deep incisional (fascia/muscle), and organ/space (any structure opened during surgery). Most SSIs manifest within 30 days (or 90 days for implant surgery).',
    commonCauses: ['Skin flora contamination (Staphylococcus aureus, coagulase-negative staphylococci)', 'Endogenous contamination (GI organisms in abdominal surgery)', 'Theatre air contamination', 'Break in sterile technique', 'Inadequate antibiotic prophylaxis', 'Foreign material (implants, sutures)', 'Haematoma (culture medium for bacteria)', 'Tissue ischaemia (poor blood supply)'],
    riskFactors: ['Emergency surgery', 'Prolonged surgery (> 2 h)', 'Contaminated/dirty wound class', 'Obesity (BMI > 30)', 'Diabetes (HbA1c > 8.5%)', 'Smoking', 'Malnutrition', 'Immunosuppression', 'Pre-operative nasal carriage of MRSA', 'Inadequate antibiotic timing', 'Hypothermia (< 36°C)', 'Hyperglycaemia intra-operatively', 'Multiple procedures at same operation'],
    subjectiveData: [
      'Patient is usually under anaesthesia or in recovery at time of prevention interventions',
      'Pre-operative assessment: risk factors for SSI',
      'Patient\'s understanding of wound care (if providing education pre-operatively)',
    ],
    objectiveData: [
      'Wound class: clean (1–2%), clean-contaminated (3–5%), contaminated (5–10%), dirty (> 10%)',
      'Pre-operative: nasal swabs (MRSA screen), HbA1c, albumin, BMI',
      'Intra-operative: antibiotic timing (within 60 min of incision), antibiotic redosing (> 3 h or > 1500 mL blood loss), normothermia (≥ 36°C), glycaemic control (< 10 mmol/L), sterile technique',
      'Post-operative: wound assessment (dressing intact, erythema, swelling, discharge, dehiscence), temperature monitoring, pain assessment',
      'SSI surveillance data: wound swab if infection suspected, surveillance forms',
    ],
    nursingDiagnoses: [
      {
        id: 'nd-ssi-1',
        diagnosis: 'Risk for Surgical Site Infection related to surgical wound, invasive procedures, and modifiable risk factors',
        definingCharacteristics: ['Surgical incision', 'Invasive devices', 'Prolonged surgery', 'Contaminated wound class', 'Diabetes', 'Obesity'],
      },
      {
        id: 'nd-ssi-2',
        diagnosis: 'Deficient Knowledge (patient) related to wound care and infection prevention after surgery',
        definingCharacteristics: ['Unable to describe wound care', 'Unaware of signs of infection', 'Does not understand medication regimen'],
      },
    ],
    goals: [
      {
        id: 'g-ssi-1',
        shortTerm: 'SSI prevention bundle implemented: antibiotic given within 60 min, normothermia maintained, glycaemic control achieved, sterile technique maintained, wound class assessed.',
        longTerm: 'No SSI within 30 days of surgery. Wound healed. Patient can identify and report signs of infection. Post-operative wound care completed.',
      },
    ],
    interventions: [
      { id: 'i-ssi-1', category: 'collaborative', action: 'Ensure timely antibiotic prophylaxis: administer within 60 min before skin incision (within 120 min for vancomycin/fluoroquinolones). Re-dose if surgery > 2 half-lives of antibiotic or blood loss > 1500 mL. Use correct antibiotic for procedure type (e.g., co-amoxiclav for abdominal, glycopeptide if MRSA risk).', rationale: 'Timing is critical: antibiotics must be in tissue before bacterial contamination. Late administration reduces efficacy by 50%.', frequency: 'Within 60 min of incision; redose per protocol' },
      { id: 'i-ssi-2', category: 'independent', action: 'Maintain normothermia throughout perioperative period: active warming (forced-air, warm IV fluids), monitor core temperature, target ≥ 36°C. Hypothermia reduces oxygen delivery to wound, impairs immune function, and increases SSI risk (OR 2.1).', rationale: 'Perioperative normothermia reduces SSI by 50% (NICE guideline). It is one of the most effective single interventions.', frequency: 'Continuous temperature monitoring; warming throughout' },
      { id: 'i-ssi-3', category: 'independent', action: 'Optimise glycaemic control: target blood glucose < 10 mmol/L (180 mg/dL) intra-operatively and post-operatively. Monitor blood glucose 1–2 hourly in diabetic patients. Administer insulin sliding scale as prescribed. Avoid dextrose-containing fluids.', rationale: 'Hyperglycaemia (> 10 mmol/L) doubles SSI risk by impairing neutrophil function and promoting bacterial growth. Tight control is essential.', frequency: 'Blood glucose every 1–2 h if diabetic; every 4–6 h if not' },
      { id: 'i-ssi-4', category: 'independent', action: 'Implement wound care bundle: aseptic dressing application, wound assessment at every dressing change (redness, swelling, discharge, dehiscence), early mobilisation, nutrition optimisation (high-protein diet), patient education on wound care and signs of infection.', rationale: 'Post-operative wound care is the final barrier against SSI. Patient education enables early detection and treatment.', frequency: 'At every dressing change; daily wound assessment' },
      { id: 'i-ssi-5', category: 'independent', action: 'Educate patient on SSI prevention and wound care: signs of infection (redness, swelling, warmth, pus, fever, increasing pain), when to seek help, hand hygiene before touching wound, keeping wound dry, avoiding irritants (perfumes, tight clothing over wound), completing antibiotic course.', rationale: 'Patient education enables early detection and treatment of SSI, reducing complications and readmissions.', frequency: 'Pre-operatively and at discharge' },
      { id: 'i-ssi-6', category: 'independent', action: 'Conduct SSI surveillance: document wound class, follow up at 30 days (or 90 days for implants). Report SSIs to infection control team. Participate in national SSI surveillance programmes (e.g., SURGINF, NSSA).', rationale: 'SSI surveillance identifies trends, risk factors, and opportunities for improvement. It is a quality indicator for surgical services.', frequency: 'At surgery; follow-up at 30 days' },
    ],
    evaluation: [
      { id: 'e-ssi-1', expected: 'SSI prevention bundle fully implemented. Normothermia maintained. Glycaemic control achieved. Antibiotic timing correct. Sterile technique maintained.', status: 'met' },
      { id: 'e-ssi-2', expected: 'No SSI at 30-day follow-up. Wound healed. Patient can identify signs of infection. Post-operative care completed.', status: 'met' },
    ],
    patientEducation: [
      {
        topic: 'Wound Care and Infection Prevention After Surgery',
        keyPoints: [
          'Keep your wound clean and dry for the first 48 hours (or as instructed).',
          'Wash your hands with soap and water before touching near your wound.',
          'Watch for signs of infection: increasing redness, swelling, warmth, pus, bad smell, fever, or increasing pain.',
          'Take your antibiotics as prescribed — complete the full course.',
          'Eat well — protein and vitamin C help wound healing.',
          'Do not apply creams, lotions, or home remedies to the wound unless advised.',
          'Contact your surgeon or GP immediately if you suspect infection.',
          'Keep your wound out of the sun for at least 6 months to reduce scarring.',
        ],
        method: 'Verbal, written wound care leaflet, teach-back',
      },
    ],
    dischargePlanning: {
      checklist: [
        'SSI prevention bundle documented',
        'Wound class documented',
        'Antibiotic prophylaxis documented (drug, dose, timing)',
        'Normothermia maintained intra-operatively',
        'Glycaemic control documented',
        'Wound care instructions provided',
        'Signs of infection reviewed',
        'Follow-up wound check scheduled',
        'SSI surveillance follow-up planned (30 days)',
      ],
      followUp: 'Wound check at 7–10 days (or earlier if concerns). SSI surveillance at 30 days. 90-day follow-up for implant surgery.',
      referrals: ['GP for wound review', 'Surgical team for wound concerns', 'Infection Control for SSI reporting', 'Dietitian for nutritional optimisation'],
      warningSigns: [
        'Increasing redness around the wound',
        'Swelling or warmth at the wound site',
        'Pus or foul-smelling discharge',
        'Fever > 38°C',
        'Increasing pain at the wound',
        'Wound opening (dehiscence)',
      ],
    },
    complications: ['Superficial SSI (2–5%)', 'Deep incisional SSI', 'Organ/space SSI (abscess)', 'Wound dehiscence', 'Sepsis from wound infection', 'Prolonged hospital stay (7–10 extra days)', 'Readmission', 'Implant failure', 'Death (rare for clean surgery; higher for contaminated)'],
  },

  // ═══════════════════════════════════════════════════════════════
  // BATCH: Cardiovascular — Cardiac Arrhythmias, DVT, PE
  // ═══════════════════════════════════════════════════════════════

  'Cardiac Arrhythmias': {
    id: 'cp-cardiac-arrhythmias', disease: 'Cardiac Arrhythmias', specialty: 'Cardiovascular Care',
    overview: 'Cardiac arrhythmias are disorders of heart rate or rhythm caused by abnormal electrical impulse generation or conduction. Nursing care focuses on haemodynamic monitoring, rhythm assessment, medication titration, and patient safety.',
    pathophysiology: 'Abnormalities in the SA node, AV node, or ventricular conduction system lead to tachyarrhythmias, bradyarrhythmias, or irregular rhythms, reducing cardiac output and causing haemodynamic instability.',
    commonCauses: ['Ischaemic heart disease', 'Electrolyte imbalances', 'Drug toxicity', 'Structural heart disease', 'Autonomic dysfunction'],
    riskFactors: ['Age > 65', 'Hypertension', 'Heart failure', 'Valvular disease', 'Excessive caffeine or alcohol', 'Thyroid disorders'],
    subjectiveData: ['Palpitations', 'Dizziness or lightheadedness', 'Syncope or presyncope', 'Chest discomfort', 'Fatigue and exercise intolerance', 'Shortness of breath'],
    objectiveData: ['Irregular pulse on palpation', 'Heart rate < 60 or > 100 bpm', 'ECG abnormalities (AF, VT, heart block)', 'Hypotension', 'Altered mental status', 'Pulse deficit'],
    nursingDiagnoses: [
      { id: 'nd-ca-1', diagnosis: 'Decreased Cardiac Output related to disrupted electrical conduction as evidenced by palpitations, dizziness, and ECG changes', definingCharacteristics: ['Irregular heart rhythm', 'Dizziness', 'Exercise intolerance'] },
      { id: 'nd-ca-2', diagnosis: 'Risk for Injury related to syncope secondary to reduced cerebral perfusion', definingCharacteristics: ['History of falls', 'Presyncope episodes', 'Postural hypotension'] },
      { id: 'nd-ca-3', diagnosis: 'Anxiety related to unpredictable cardiac rhythm as evidenced by restlessness and expressed fear', definingCharacteristics: ['Verbalisation of fear', 'Restlessness', 'Sleep disturbance'] },
    ],
    goals: [
      { id: 'g-ca-1', shortTerm: 'Heart rate maintained within 60-100 bpm; haemodynamic stability achieved within the shift.', longTerm: 'Patient maintains stable cardiac rhythm; no recurrence of syncope; anxiety managed at discharge.' },
      { id: 'g-ca-2', shortTerm: 'Patient free from injury related to falls or syncope during hospitalisation.', longTerm: 'Patient demonstrates safe self-care practices and medication adherence post-discharge.' },
    ],
    interventions: [
      { id: 'i-ca-1', category: 'independent', action: 'Perform continuous cardiac monitoring: assess rhythm strip every 4 hours, document rate, rhythm, and any ectopy. Monitor for haemodynamic compromise (hypotension, altered consciousness, chest pain).', rationale: 'Continuous monitoring enables early detection of dangerous rhythm changes.', frequency: 'Continuous telemetry; rhythm strip every 4 h' },
      { id: 'i-ca-2', category: 'dependent', action: 'Administer prescribed antiarrhythmics (amiodarone, beta-blockers, calcium channel blockers) as ordered. Verify heart rate before administration. Monitor for adverse effects (hypotension, bradycardia, QT prolongation).', rationale: 'Antiarrhythmics require precise timing and dose adjustment based on cardiac rate and rhythm.', frequency: 'As prescribed; before each dose check HR and BP' },
      { id: 'i-ca-3', category: 'independent', action: 'Ensure patient safety: bed in lowest position, call bell within reach, bed rails as indicated. Assist with mobilisation. Apply fall precautions. Avoid Valsalva manoeuvre and sudden position changes.', rationale: 'Arrhythmias increase fall risk due to syncope and dizziness.', frequency: 'Continuously; reassess with each position change' },
      { id: 'i-ca-4', category: 'independent', action: 'Monitor and correct electrolyte imbalances: check serum potassium, magnesium, and calcium. Report K < 3.5 or Mg < 0.7 mmol/L. Administer supplementation as prescribed.', rationale: 'Hypokalaemia and hypomagnesaemia predispose to arrhythmias and reduce antiarrhythmic efficacy.', frequency: 'Serum electrolytes every 12-24 h' },
      { id: 'i-ca-5', category: 'collaborative', action: 'Prepare patient for cardioversion or catheter ablation if indicated. Ensure informed consent, NPO status, IV access, and anticoagulation per protocol.', rationale: 'Electrical or catheter-based interventions may be indicated for refractory arrhythmias.', frequency: 'Pre-procedure; post-procedure every 15 min x 4, then hourly' },
    ],
    evaluation: [
      { id: 'e-ca-1', expected: 'Cardiac rhythm stabilised within target range (60-100 bpm). No episodes of syncope.', status: 'met' },
      { id: 'e-ca-2', expected: 'Patient verbalises understanding of condition, medications, and when to seek emergency care.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Living with Cardiac Arrhythmias', keyPoints: ['Take all antiarrhythmic medications exactly as prescribed.', 'Avoid triggers: excess caffeine, alcohol, nicotine, and recreational drugs.', 'Learn to take your own pulse and keep a rhythm diary.', 'Seek emergency care for prolonged palpitations, fainting, or chest pain.', 'Attend all follow-up ECG and cardiology appointments.'], method: 'Verbal, written pamphlet, teach-back' },
    ],
    dischargePlanning: { checklist: ['Stable rhythm confirmed on discharge ECG', 'Medications reconciled and prescriptions provided', 'Patient education completed', 'Fall risk assessment documented', 'Follow-up cardiology appointment scheduled'], followUp: 'Cardiology review in 1-2 weeks. Repeat ECG at 1 month.', referrals: ['Cardiology for ongoing management', 'Anticoagulation clinic if on DOAC/warfarin'], warningSigns: ['Prolonged or recurrent palpitations', 'Syncope or near-fainting', 'Chest pain or severe shortness of breath', 'Unusual fatigue'] },
    complications: ['Stroke (AF-related)', 'Thromboembolism', 'Cardiac arrest', 'Drug-induced proarrhythmia', 'Syncope-related injury', 'Heart failure exacerbation'],
  },

  'Deep Vein Thrombosis': {
    id: 'cp-dvt', disease: 'Deep Vein Thrombosis', specialty: 'Cardiovascular Care',
    overview: 'Deep vein thrombosis (DVT) is the formation of a blood clot in a deep vein, usually in the lower extremities. Nursing care centres on anticoagulation management, limb assessment, and prevention of pulmonary embolism.',
    pathophysiology: "Virchow's triad -- venous stasis, endothelial injury, and hypercoagulability -- leads to thrombus formation. Clot propagation can cause local venous obstruction and potentially fatal pulmonary embolism.",
    commonCauses: ['Surgery (especially orthopaedic)', 'Prolonged immobility', 'Malignancy', 'Thrombophilia', 'Oral contraceptive use'],
    riskFactors: ['Obesity', 'Pregnancy', 'History of DVT/PE', 'Smoking', 'Older age', 'Long-distance travel'],
    subjectiveData: ['Unilateral leg pain and tenderness', 'Swelling of affected limb', 'Warmth over affected area', 'Anxiety about PE symptoms'],
    objectiveData: ['Unilateral pitting oedema', 'Calf circumference difference > 3 cm', 'Erythema and warmth', 'D-dimer elevated', 'Duplex ultrasound confirming thrombus'],
    nursingDiagnoses: [
      { id: 'nd-dvt-1', diagnosis: 'Risk for Pulmonary Embolism related to venous thrombus and potential dislodgement', definingCharacteristics: ['Confirmed DVT', 'Proximal vein involvement', 'Immobility'] },
      { id: 'nd-dvt-2', diagnosis: 'Impaired Venous Traffic Flow related to intravascular clot as evidenced by unilateral oedema and erythema', definingCharacteristics: ['Unilateral swelling', 'Erythema', 'Increased calf circumference'] },
      { id: 'nd-dvt-3', diagnosis: 'Deficient Knowledge related to anticoagulation therapy and DVT prevention', definingCharacteristics: ['Unable to describe medication regimen', 'Unaware of bleeding precautions'] },
    ],
    goals: [
      { id: 'g-dvt-1', shortTerm: 'Limb swelling reduces; pain controlled; no signs of PE within 24 hours.', longTerm: 'Complete anticoagulation course; no recurrent DVT or PE; patient demonstrates self-management.' },
      { id: 'g-dvt-2', shortTerm: 'Patient verbalises understanding of anticoagulation therapy and bleeding precautions.', longTerm: 'Patient adheres to anticoagulation schedule and attends follow-up monitoring.' },
    ],
    interventions: [
      { id: 'i-dvt-1', category: 'dependent', action: 'Administer anticoagulants (heparin infusion, LMWH, or DOAC) as prescribed. Monitor aPTT for UFH or anti-Xa levels. Watch for signs of bleeding.', rationale: 'Anticoagulation prevents clot propagation and PE.', frequency: 'UFH: aPTT every 6 h; LMWH: anti-Xa per protocol' },
      { id: 'i-dvt-2', category: 'independent', action: 'Elevate affected leg above heart level at rest. Apply graduated compression stockings. Encourage early ambulation. Avoid prolonged sitting or standing.', rationale: 'Elevation and compression promote venous return and reduce oedema.', frequency: 'Elevation continuously; compression stockings during waking hours' },
      { id: 'i-dvt-3', category: 'independent', action: 'Assess affected limb every 4 hours: measure calf circumference, assess colour, temperature, sensation. Monitor for signs of PE.', rationale: 'Serial limb assessments detect worsening. PE surveillance is critical.', frequency: 'Limb assessment every 4 h; PE assessment continuously' },
      { id: 'i-dvt-4', category: 'independent', action: 'Educate patient on anticoagulation: purpose, duration, timing, missed dose protocol, bleeding precautions, and medical alert identification.', rationale: 'Patient education ensures medication adherence and early recognition of complications.', frequency: 'Daily during admission; reinforced at discharge' },
    ],
    evaluation: [
      { id: 'e-dvt-1', expected: 'Limb swelling reducing. No signs of PE. Therapeutic anticoagulation achieved. No bleeding.', status: 'met' },
      { id: 'e-dvt-2', expected: 'Patient demonstrates understanding of anticoagulation and can describe bleeding precautions.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Anticoagulation and DVT Self-Care', keyPoints: ['Take your anticoagulant at the same time every day.', 'Watch for signs of bleeding: blood in urine/stool, unusual bruising.', 'Avoid contact sports and high fall risk activities.', 'Wear compression stockings as directed.', 'Seek emergency care for sudden breathlessness or chest pain.', 'Attend all blood test appointments.'], method: 'Verbal, bleeding precautions card, medication schedule handout' },
    ],
    dischargePlanning: { checklist: ['Anticoagulation prescription and duration confirmed', 'Compression stockings fitted', 'Patient education completed', 'Follow-up blood tests scheduled', 'Falls risk assessed'], followUp: 'INR in 3-5 days (warfarin). Duplex ultrasound at 3-6 months.', referrals: ['Haematology for thrombophilia screen', 'Anticoagulation clinic'], warningSigns: ['Sudden shortness of breath or chest pain', 'Coughing blood', 'Severe or unexplained bleeding', 'Worsening leg swelling'] },
    complications: ['Pulmonary embolism', 'Post-thrombotic syndrome', 'Chronic venous insufficiency', 'Venous ulceration', 'Bleeding from anticoagulation', 'Recurrence'],
  },

  'Pulmonary Embolism': {
    id: 'cp-pe', disease: 'Pulmonary Embolism', specialty: 'Cardiovascular Care',
    overview: 'Pulmonary embolism (PE) is a potentially fatal obstruction of the pulmonary vasculature by thrombus, usually from DVT. Nursing care focuses on haemodynamic support, anticoagulation, oxygenation, and vigilance for right heart failure.',
    pathophysiology: 'Thrombus embolises from DVT and lodges in pulmonary arteries, increasing pulmonary vascular resistance and right ventricular afterload, leading to RV dilatation, reduced cardiac output, and potentially cardiovascular collapse.',
    commonCauses: ['Deep vein thrombosis', 'Prolonged immobilisation', 'Post-surgical state', 'Malignancy', 'Thrombophilia'],
    riskFactors: ['Recent surgery or trauma', 'Cancer', 'Obesity', 'Pregnancy', 'OCP/HRT use', 'Long-haul travel'],
    subjectiveData: ['Sudden onset dyspnoea', 'Pleuritic chest pain', 'Palpitations', 'Anxiety and sense of doom', 'Haemoptysis', 'Syncope (massive PE)'],
    objectiveData: ['Tachycardia (HR > 100)', 'Tachypnoea (RR > 20)', 'Hypotension (massive PE)', 'Elevated JVP', 'Hypoxia (SpO2 < 94%)', 'CT pulmonary angiography confirmation'],
    nursingDiagnoses: [
      { id: 'nd-pe-1', diagnosis: 'Ineffective Breathing Pattern related to pulmonary vascular obstruction as evidenced by dyspnoea, tachypnoea, and hypoxia', definingCharacteristics: ['Sudden dyspnoea', 'Tachypnoea', 'SpO2 < 94%'] },
      { id: 'nd-pe-2', diagnosis: 'Decreased Cardiac Output related to right ventricular dysfunction secondary to pulmonary vascular obstruction', definingCharacteristics: ['Tachycardia', 'Hypotension', 'Elevated JVP'] },
      { id: 'nd-pe-3', diagnosis: 'Anxiety related to respiratory distress and threat to life', definingCharacteristics: ['Restlessness', 'Verbalisation of fear', 'Diaphoresis'] },
    ],
    goals: [
      { id: 'g-pe-1', shortTerm: 'SpO2 ≥ 94% on supplemental oxygen; respiratory rate < 20; haemodynamic stability within 2 hours.', longTerm: 'Complete anticoagulation course; no recurrent PE; patient resumes normal activities.' },
    ],
    interventions: [
      { id: 'i-pe-1', category: 'independent', action: 'Administer supplemental oxygen to maintain SpO2 ≥ 94%. Position in semi-Fowlers (45 degrees). Monitor ABGs and respiratory status continuously.', rationale: 'Oxygenation is the immediate priority. Semi-Fowlers position improves ventilation-perfusion matching.', frequency: 'Continuous SpO2 monitoring; ABGs every 2-4 h' },
      { id: 'i-pe-2', category: 'dependent', action: 'Administer anticoagulants (UFH bolus + infusion or LMWH) as prescribed. Prepare for thrombolysis (alteplase) if massive PE with haemodynamic compromise.', rationale: 'Anticoagulation prevents further clot formation. Thrombolysis restores pulmonary perfusion.', frequency: 'UFH: aPTT every 6 h; thrombolysis within 30 min of order' },
      { id: 'i-pe-3', category: 'independent', action: 'Monitor haemodynamics: continuous ECG, invasive BP, CVP. Assess for right heart failure. Maintain fluid balance -- avoid overload.', rationale: 'Right heart failure is the primary cause of death in massive PE.', frequency: 'Continuous haemodynamic monitoring; fluid balance every 4 h' },
      { id: 'i-pe-4', category: 'collaborative', action: 'Prepare for embolectomy or IVC filter if anticoagulation contraindicated. Ensure consent and post-procedure monitoring.', rationale: 'Surgical options reserved for massive PE with contraindications to anticoagulation.', frequency: 'As clinically indicated; post-procedure every 15 min x 4' },
    ],
    evaluation: [
      { id: 'e-pe-1', expected: 'SpO2 ≥ 94% on room air. Haemodynamic stability achieved. No further embolic events.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Pulmonary Embolism Recovery', keyPoints: ['Anticoagulation therapy is essential -- take medications exactly as prescribed.', 'Report any new symptoms: chest pain, shortness of breath, coughing blood.', 'Gradually increase activity as tolerated.', 'Stay hydrated and avoid prolonged immobility.', 'Attend all follow-up appointments and blood tests.'], method: 'Verbal, written discharge summary, teach-back' },
    ],
    dischargePlanning: { checklist: ['Anticoagulation therapy initiated and therapeutic', 'Oxygen requirements resolved', 'Haemodynamic stability confirmed', 'Follow-up imaging scheduled', 'Patient education completed'], followUp: 'Haematology/cardiology review in 1-2 weeks. Repeat imaging at 3-6 months.', referrals: ['Haematology for thrombophilia workup', 'Cardiology for RV function'], warningSigns: ['Sudden worsening breathlessness', 'Chest pain', 'Coughing blood', 'Leg swelling or pain', 'Syncope'] },
    complications: ['Right heart failure', 'Cardiovascular collapse', 'Pulmonary infarction', 'Chronic thromboembolic pulmonary hypertension', 'Bleeding from anticoagulation', 'Death (massive untreated PE)'],
  },

  // ═══════════════════════════════════════════════════════════════
  // BATCH: Respiratory — CAP, TB, COVID-19
  // ═══════════════════════════════════════════════════════════════

  'Community Acquired Pneumonia': {
    id: 'cp-cap', disease: 'Community Acquired Pneumonia', specialty: 'Respiratory Care',
    overview: 'Community acquired pneumonia (CAP) is an acute infection of the lung parenchyma acquired outside hospital. Nursing care focuses on respiratory support, antimicrobial therapy, hydration, and monitoring for complications.',
    pathophysiology: 'Inhalation or aspiration of pathogens triggers an inflammatory response in the alveoli, leading to consolidation, impaired gas exchange, and potentially sepsis. CURB-65 scoring guides severity assessment.',
    commonCauses: ['Streptococcus pneumoniae', 'Haemophilus influenzae', 'Mycoplasma pneumoniae', 'Legionella pneumophila', 'Respiratory viruses'],
    riskFactors: ['Age > 65', 'Smoking', 'COPD', 'Immunosuppression', 'Alcoholism', 'Aspiration risk'],
    subjectiveData: ['Productive cough (purulent/rusty sputum)', 'Fever with rigors', 'Pleuritic chest pain', 'Dyspnoea', 'Malaise', 'Confusion (elderly)'],
    objectiveData: ['Temperature > 38 C', 'Tachypnoea (RR > 20)', 'Crackles/crepitations on auscultation', 'Elevated WCC and CRP', 'Chest X-ray: lobar or patchy consolidation'],
    nursingDiagnoses: [
      { id: 'nd-cap-1', diagnosis: 'Impaired Gas Exchange related to alveolar consolidation as evidenced by dyspnoea, tachypnoea, and crackles', definingCharacteristics: ['Dyspnoea', 'Tachypnoea', 'Crackles'] },
      { id: 'nd-cap-2', diagnosis: 'Hyperthermia related to infectious process as evidenced by elevated temperature', definingCharacteristics: ['Temperature > 38 C', 'Rigors', 'Diaphoresis'] },
      { id: 'nd-cap-3', diagnosis: 'Ineffective Airway Clearance related to excessive sputum production', definingCharacteristics: ['Productive cough', 'Crackles', 'Sputum production'] },
    ],
    goals: [
      { id: 'g-cap-1', shortTerm: 'Temperature < 38 C; SpO2 ≥ 94%; respiratory rate < 24 within 24 hours.', longTerm: 'Complete antimicrobial course; chest X-ray clear; no complications at discharge.' },
    ],
    interventions: [
      { id: 'i-cap-1', category: 'independent', action: 'Administer supplemental oxygen to maintain SpO2 ≥ 94%. Encourage deep breathing exercises and incentive spirometry every 2 hours. Assist with position changes every 2 hours.', rationale: 'Deep breathing and position changes promote lung expansion and prevent further consolidation.', frequency: 'Continuous SpO2; incentive spirometry every 2 h' },
      { id: 'i-cap-2', category: 'dependent', action: 'Administer prescribed antimicrobials per CURB-65. Ensure first dose within 4 hours of admission. Monitor for allergic reactions. Administer antipyretics for temperature > 38.5 C.', rationale: 'Timely antimicrobial therapy is the cornerstone of CAP management.', frequency: 'Antimicrobials as prescribed; antipyretics PRN' },
      { id: 'i-cap-3', category: 'independent', action: 'Encourage oral hydration (2-3 L/day). Monitor sputum colour, volume, and consistency. Perform chest physiotherapy as indicated.', rationale: 'Hydration thins secretions. Airway clearance prevents atelectasis.', frequency: 'Fluid monitoring hourly; sputum assessment every shift' },
      { id: 'i-cap-4', category: 'independent', action: 'Monitor for complications: pleural effusion, empyema, sepsis, and respiratory failure.', rationale: 'Early detection enables timely intervention.', frequency: 'Clinical assessment every 4 h' },
    ],
    evaluation: [
      { id: 'e-cap-1', expected: 'Temperature normalised. SpO2 ≥ 94% on room air. Able to cough and clear secretions.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Pneumonia Recovery and Prevention', keyPoints: ['Complete the full course of antibiotics.', 'Drink plenty of fluids to thin mucus.', 'Practice deep breathing exercises daily.', 'Get vaccinated: pneumococcal and influenza.', 'Stop smoking.'], method: 'Verbal, written discharge leaflet' },
    ],
    dischargePlanning: { checklist: ['Temperature normalised for ≥ 24 hours', 'SpO2 ≥ 94% on room air', 'Tolerating oral intake', 'Antimicrobial prescription provided', 'Follow-up CXR scheduled'], followUp: 'GP review in 1 week. Repeat CXR at 6 weeks.', referrals: ['GP for follow-up', 'Smoking cessation service', 'Pulmonology if recurrent pneumonia'], warningSigns: ['Return of fever', 'Worsening breathlessness', 'Chest pain', 'Coughing blood', 'Confusion'] },
    complications: ['Pleural effusion', 'Empyema', 'Lung abscess', 'Sepsis', 'Respiratory failure', 'ARDS'],
  },

  'Tuberculosis': {
    id: 'cp-tb', disease: 'Tuberculosis', specialty: 'Respiratory Care',
    overview: 'Tuberculosis (TB) is a chronic infectious disease caused by Mycobacterium tuberculosis. Nursing care focuses on infection control, directly observed therapy (DOT), nutritional support, and monitoring for drug side effects.',
    pathophysiology: 'Inhalation of aerosolised droplet nuclei leads to pulmonary infection. The immune response forms granulomas. Reactivation occurs when immunity wanes, causing tissue necrosis and cavitary disease.',
    commonCauses: ['Mycobacterium tuberculosis', 'Reactivation of latent TB', 'Primary infection in immunocompromised'],
    riskFactors: ['HIV co-infection', 'Malnutrition', 'Close household contacts', 'Diabetes mellitus', 'Immunosuppressive therapy', 'Overcrowded living conditions', 'Smoking'],
    subjectiveData: ['Chronic cough > 2 weeks', 'Haemoptysis', 'Night sweats', 'Weight loss and anorexia', 'Low-grade fever', 'Fatigue'],
    objectiveData: ['Chest X-ray: upper lobe infiltrates, cavitation', 'Sputum AFB smear positive', 'Mantoux test or IGRA positive', 'BMI < 18.5', 'Tachycardia, low-grade fever'],
    nursingDiagnoses: [
      { id: 'nd-tb-1', diagnosis: 'Infection related to Mycobacterium tuberculosis as evidenced by positive AFB sputum and pulmonary infiltrates', definingCharacteristics: ['Positive sputum AFB', 'Pulmonary infiltrates', 'Chronic cough'] },
      { id: 'nd-tb-2', diagnosis: 'Imbalanced Nutrition: Less Than Body Requirements related to chronic infection and anorexia', definingCharacteristics: ['Weight loss', 'BMI < 18.5', 'Anorexia'] },
      { id: 'nd-tb-3', diagnosis: 'Deficient Knowledge related to DOT regimen and infection control measures', definingCharacteristics: ['Unable to describe medication schedule', 'Unaware of cough etiquette'] },
    ],
    goals: [
      { id: 'g-tb-1', shortTerm: 'Sputum AFB conversion by 2 months. Nutritional intake improved. Infection control measures in place.', longTerm: 'Sputum culture negative at 6 months. Completion of DOT regimen. BMI normalised.' },
    ],
    interventions: [
      { id: 'i-tb-1', category: 'independent', action: 'Implement airborne infection isolation: single room with negative pressure, N95 respirator for staff, door closed. Educate on cough etiquette.', rationale: 'TB is airborne. Airborne precautions prevent nosocomial transmission.', frequency: 'Continuous during admission' },
      { id: 'i-tb-2', category: 'dependent', action: 'Administer DOT regimen (2RHZE/4RH). Monitor for hepatotoxicity, peripheral neuropathy, and visual changes.', rationale: 'DOT ensures adherence and prevents drug resistance.', frequency: 'Daily DOT; LFTs at baseline, 2 weeks, then monthly' },
      { id: 'i-tb-3', category: 'independent', action: 'Provide nutritional support: high-calorie, high-protein diet. Supplement with vitamin B6 if on isoniazid. Monitor daily intake, weight weekly.', rationale: 'TB causes hypermetabolism. Adequate nutrition supports immune function.', frequency: 'Dietary assessment daily; weight weekly' },
      { id: 'i-tb-4', category: 'independent', action: 'Monitor for drug adverse effects: hepatotoxicity, optic neuritis (ethambutol), peripheral neuropathy (isoniazid), orange body fluids (rifampicin).', rationale: 'Early detection enables dose adjustment without compromising treatment.', frequency: 'LFTs monthly; visual acuity monthly' },
      { id: 'i-tb-5', category: 'collaborative', action: 'Contact tracing: identify and screen all household contacts. Initiate preventive therapy for latent TB contacts. Report to public health.', rationale: 'Contact tracing breaks the chain of transmission.', frequency: 'Within 24 hours of TB notification' },
    ],
    evaluation: [
      { id: 'e-tb-1', expected: 'Sputum AFB converted by month 2. No drug side effects. Patient adheres to DOT.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'TB Treatment and Prevention', keyPoints: ['Take ALL TB medications daily for 6 months.', 'Rifampicin turns urine orange -- this is harmless.', 'Avoid alcohol completely.', 'Cover your mouth when coughing.', 'All family members need testing.', 'Return immediately for jaundice, visual changes, or numbness.'], method: 'Verbal, DOT education, cough etiquette demonstration' },
    ],
    dischargePlanning: { checklist: ['DOT plan with community health worker', 'Contact tracing initiated', 'Nutritional support in place', 'Drug side effects education completed', 'Follow-up sputum samples scheduled'], followUp: 'Monthly clinic for DOT. Sputum AFB at 2, 5, and 6 months.', referrals: ['Community health worker for DOT', 'Public health for contact tracing', 'HIV testing for all TB patients'], warningSigns: ['Jaundice', 'Severe nausea', 'Visual changes', 'Numbness in extremities', 'Worsening cough or haemoptysis'] },
    complications: ['Drug-resistant TB (MDR-TB)', 'Hepatotoxicity', 'Optic neuritis', 'Peripheral neuropathy', 'Pneumothorax', 'Haemoptysis'],
  },

  'COVID-19': {
    id: 'cp-covid19', disease: 'COVID-19', specialty: 'Respiratory Care',
    overview: 'COVID-19 is a respiratory illness caused by SARS-CoV-2, ranging from mild symptoms to severe ARDS and multi-organ failure. Nursing care focuses on respiratory support, infection prevention, and isolation management.',
    pathophysiology: 'SARS-CoV-2 binds to ACE2 receptors on alveolar cells, causing direct viral damage and cytokine storm, leading to diffuse alveolar damage, ARDS, and multi-organ involvement.',
    commonCauses: ['SARS-CoV-2 infection', 'Respiratory droplet transmission', 'Aerosol transmission'],
    riskFactors: ['Age > 60', 'Obesity (BMI > 30)', 'Diabetes mellitus', 'Hypertension', 'Immunosuppression', 'Chronic lung disease'],
    subjectiveData: ['Fever', 'Dry cough', 'Anosmia/ageusia', 'Myalgia and fatigue', 'Dyspnoea (moderate-severe)', 'Headache', 'Diarrhoea'],
    objectiveData: ['SpO2 < 94% on room air', 'Tachypnoea', 'Bilateral ground-glass opacities on CT', 'Elevated CRP, ferritin, D-dimer', 'Lymphopenia'],
    nursingDiagnoses: [
      { id: 'nd-cv-1', diagnosis: 'Impaired Gas Exchange related to alveolar inflammation and ARDS as evidenced by hypoxia', definingCharacteristics: ['SpO2 < 94%', 'Tachypnoea', 'Ground-glass opacities'] },
      { id: 'nd-cv-2', diagnosis: 'Risk for Infection Transmission related to highly contagious SARS-CoV-2', definingCharacteristics: ['Confirmed COVID-19', 'Aerosol-generating procedures'] },
      { id: 'nd-cv-3', diagnosis: 'Anxiety and Social Isolation related to quarantine and fear of illness', definingCharacteristics: ['Expressed worry', 'Social isolation', 'Sleep disturbance'] },
    ],
    goals: [
      { id: 'g-cv-1', shortTerm: 'SpO2 ≥ 94% on supplemental oxygen; respiratory rate < 24; fever controlled within 24 hours.', longTerm: 'No progression to ARDS; successful weaning from oxygen; recovery without complications.' },
    ],
    interventions: [
      { id: 'i-cv-1', category: 'independent', action: 'Implement strict transmission-based precautions: N95, face shield, gown, gloves for AGPs. Monitor PPE compliance.', rationale: 'SARS-CoV-2 is highly transmissible. Full PPE protects healthcare workers.', frequency: 'Continuous; PPE check at every entry' },
      { id: 'i-cv-2', category: 'independent', action: 'Administer supplemental oxygen per WHO protocol: nasal cannula to NRB to HFNC to NIV to intubation. Prone positioning for moderate-severe hypoxia.', rationale: 'Prone positioning improves V/Q matching and reduces mortality in ARDS.', frequency: 'Continuous SpO2; prone positioning 16 h/day if SpO2 < 93%' },
      { id: 'i-cv-3', category: 'dependent', action: 'Administer dexamethasone 6 mg daily for 10 days if requiring oxygen. Anticoagulation as prescribed.', rationale: 'Dexamethasone reduces mortality in severe COVID-19 (RECOVERY trial).', frequency: 'Dexamethasone daily; LMWH as prescribed' },
      { id: 'i-cv-4', category: 'independent', action: 'Provide psychosocial support: facilitate video calls with family, address isolation concerns, screen for anxiety and depression.', rationale: 'Prolonged isolation causes significant psychological distress.', frequency: 'Daily check-in; family calls facilitated daily' },
    ],
    evaluation: [
      { id: 'e-cv-1', expected: 'SpO2 ≥ 94% on room air. Fever resolved. No progression to ARDS.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'COVID-19 Recovery and Long COVID', keyPoints: ['Complete your isolation period as directed.', 'Monitor oxygen levels at home with a pulse oximeter.', 'Rest and gradually increase activity.', 'Be aware of Long COVID symptoms.', 'Get vaccinated.', 'Practice good hand hygiene.'], method: 'Verbal, written discharge instructions' },
    ],
    dischargePlanning: { checklist: ['SpO2 ≥ 94% on room air for ≥ 24 hours', 'Afebrile for ≥ 24 hours', 'Isolation period completed', 'Home monitoring plan provided', 'Follow-up scheduled'], followUp: 'Telehealth review in 1-2 weeks. Long COVID clinic if persistent symptoms.', referrals: ['Pulmonology if persistent symptoms', 'Long COVID rehabilitation', 'Mental health if needed'], warningSigns: ['SpO2 < 94% at home', 'Worsening breathlessness', 'Return of fever', 'Persistent chest pain', 'Confusion'] },
    complications: ['ARDS', 'Cytokine storm', 'Thromboembolism', 'Cardiac injury', 'Secondary bacterial infection', 'Multi-organ failure', 'Long COVID syndrome'],
  },

  // ═══════════════════════════════════════════════════════════════
  // BATCH: Infectious Disease — HIV/AIDS, Malaria, Bacterial Infections
  // ═══════════════════════════════════════════════════════════════

  'HIV/AIDS': {
    id: 'cp-hiv', disease: 'HIV/AIDS', specialty: 'Infectious Disease Care',
    overview: 'HIV/AIDS is a chronic immunodeficiency caused by Human Immunodeficiency Virus. Nursing care focuses on antiretroviral therapy adherence, opportunistic infection prevention, and psychosocial support.',
    pathophysiology: 'HIV infects CD4+ T-helper cells, causing progressive viral replication and CD4 cell destruction. AIDS is defined as CD4 < 200 cells/uL or presence of opportunistic infections.',
    commonCauses: ['HIV-1 and HIV-2 infection', 'Sexual transmission', 'Mother-to-child transmission', 'Blood-borne transmission'],
    riskFactors: ['Unprotected sexual contact', 'Injecting drug use', 'Occupational needlestick injury', 'Vertical transmission', 'High viral load in partner'],
    subjectiveData: ['Acute retroviral syndrome (fever, rash, lymphadenopathy)', 'Chronic fatigue', 'Recurrent infections', 'Weight loss', 'Oral thrush', 'Night sweats'],
    objectiveData: ['CD4 count < 200 cells/uL', 'Viral load > 1000 copies/mL', 'Oral candidiasis, PCP pneumonia', 'Generalised lymphadenopathy', 'BMI < 18.5', 'Anaemia'],
    nursingDiagnoses: [
      { id: 'nd-hiv-1', diagnosis: 'Risk for Infection related to immunodeficiency secondary to HIV-induced CD4 cell depletion', definingCharacteristics: ['CD4 < 200', 'Recurrent infections', 'Oral thrush'] },
      { id: 'nd-hiv-2', diagnosis: 'Deficient Knowledge related to ART regimen, adherence, and opportunistic infection prevention', definingCharacteristics: ['Unable to describe medication schedule', 'Unaware of side effects'] },
      { id: 'nd-hiv-3', diagnosis: 'Anticipatory Grieving related to chronic illness, stigma, and life changes', definingCharacteristics: ['Expressed sadness', 'Verbalisation of fear', 'Social withdrawal'] },
    ],
    goals: [
      { id: 'g-hiv-1', shortTerm: 'ART initiated within 24 hours of diagnosis. Patient demonstrates correct pill-taking technique.', longTerm: 'Viral load suppressed to < 50 copies/mL. CD4 count > 500 cells/uL. No opportunistic infections. Adherence ≥ 95%.' },
    ],
    interventions: [
      { id: 'i-hiv-1', category: 'dependent', action: 'Initiate ART as prescribed (typically TDF/3TC/DTG first-line). Monitor for immune reconstitution inflammatory syndrome (IRIS) in first 2-4 weeks. Ensure drug interactions checked.', rationale: 'Same-day ART improves outcomes. IRIS monitoring prevents dangerous inflammatory reactions.', frequency: 'Daily during initiation; VL at 6 months' },
      { id: 'i-hiv-2', category: 'independent', action: 'Educate on ART adherence: same time daily, never skip doses, what to do if a dose is missed, common side effects (nausea, headache, dizziness) that usually resolve in 2-4 weeks.', rationale: 'Adherence ≥ 95% is required for viral suppression and preventing drug resistance.', frequency: 'Daily during admission; reinforced at every visit' },
      { id: 'i-hiv-3', category: 'independent', action: 'Monitor for opportunistic infections: screen for TB (cough > 2 weeks), check oral cavity for thrush, assess for chronic diarrhoea, monitor weight. Ensure prophylaxis (cotrimoxazole for CD4 < 200).', rationale: 'OI prophylaxis significantly reduces morbidity and mortality in advanced HIV.', frequency: 'Screening at every visit; cotrimoxazole daily if CD4 < 200' },
      { id: 'i-hiv-4', category: 'independent', action: 'Provide psychosocial support: address stigma concerns, connect with support groups, ensure confidentiality, screen for depression, facilitate disclosure discussions.', rationale: 'Psychosocial support improves adherence and quality of life.', frequency: 'Assessment at every visit' },
    ],
    evaluation: [
      { id: 'e-hiv-1', expected: 'ART initiated. Patient demonstrates correct pill-taking. No opportunistic infections. Adherence plan in place.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'HIV Self-Management and ART', keyPoints: ['Take ART every day at the same time -- adherence is critical.', 'Side effects like nausea and headache usually resolve in 2-4 weeks.', 'Do not stop ART without consulting your doctor.', 'Attend all clinic appointments for viral load and CD4 monitoring.', 'Use condoms to prevent transmission.', 'Report any new symptoms: persistent cough, chronic diarrhoea, weight loss, oral thrush.'], method: 'Verbal, ART adherence booklet, demonstration' },
    ],
    dischargePlanning: { checklist: ['ART prescription and adherence plan', 'Cotrimoxazole prophylaxis if CD4 < 200', 'TB screening completed', 'STI screening completed', 'Condoms provided', 'Support group information'], followUp: 'Clinic review in 2 weeks for ART tolerance. Viral load at 6 months.', referrals: ['HIV clinic for ongoing care', 'Support group', 'Psychosocial services', 'Nutritionist if BMI < 18.5'], warningSigns: ['Fever lasting > 2 weeks', 'Chronic cough', 'Weight loss > 10%', 'Severe headache', 'Jaundice'] },
    complications: ['Opportunistic infections (TB, PCP, Cryptococcal meningitis)', 'IRIS', 'Drug resistance (poor adherence)', 'HIV-associated nephropathy', 'Kaposi sarcoma', 'Wasting syndrome'],
  },

  'Malaria': {
    id: 'cp-malaria', disease: 'Malaria', specialty: 'Infectious Disease Care',
    overview: 'Malaria is a life-threatening parasitic disease caused by Plasmodium species, transmitted by Anopheles mosquitoes. Nursing care focuses on antimalarial therapy, fever management, hydration, and monitoring for severe malaria complications.',
    pathophysiology: 'Plasmodium parasites infect red blood cells, causing cyclical lysis (fever paroxysms). P. falciparum can cause sequestration in microvasculature, leading to cerebral malaria, severe anaemia, and multi-organ failure.',
    commonCauses: ['Plasmodium falciparum (most severe)', 'Plasmodium vivax', 'Plasmodium ovale', 'Plasmodium malariae', 'Plasmodium knowlesi'],
    riskFactors: ['Travel to endemic areas', 'No chemoprophylaxis', 'Pregnancy', 'Sickle cell trait (partial protection)', 'Age < 5 years', 'Immunosuppression', 'Asplenia'],
    subjectiveData: ['Cyclical fever with rigors (every 48-72 hours)', 'Headache', 'Myalgia and body aches', 'Nausea and vomiting', 'Fatigue', 'Abdominal pain'],
    objectiveData: ['Fever > 38.5 C with rigors', 'Splenohepatomegaly', 'Anaemia (pallor, conjunctival pallor)', 'Thrombocytopenia', 'Parasitaemia on blood smear', 'Rapid diagnostic test (RDT) positive'],
    nursingDiagnoses: [
      { id: 'nd-mal-1', diagnosis: 'Hyperthermia related to Plasmodium infection as evidenced by cyclical fever and rigors', definingCharacteristics: ['Cyclical fever > 38.5 C', 'Rigors', 'Diaphoresis'] },
      { id: 'nd-mal-2', diagnosis: 'Risk for Decreased Cardiac Output related to severe anaemia from haemolysis', definingCharacteristics: ['Haemoglobin < 7 g/dL', 'Tachycardia', 'Pallor'] },
      { id: 'nd-mal-3', diagnosis: 'Deficient Knowledge related to malaria prevention, treatment completion, and mosquito avoidance', definingCharacteristics: ['Unable to describe prevention measures', 'Unaware of chemoprophylaxis'] },
    ],
    goals: [
      { id: 'g-mal-1', shortTerm: 'Temperature < 38 C within 24 hours of antimalarial therapy. Parasite clearance confirmed.', longTerm: 'Complete antimalarial course. No recurrence. Patient demonstrates prevention measures.' },
    ],
    interventions: [
      { id: 'i-mal-1', category: 'dependent', action: 'Administer antimalarials as prescribed: ACT (artemether-lumefanine) for uncomplicated P. falciparum; IV artesunate for severe malaria. Monitor for GI side effects. Ensure full course completed.', rationale: 'ACT is first-line for uncomplicated P. falciparum. IV artesunate reduces mortality in severe malaria by 35%.', frequency: 'ACT: 0, 8, 24, 36, 48, 60 hours; IV artesunate: 0, 12, 24 h then daily' },
      { id: 'i-mal-2', category: 'independent', action: 'Manage fever: tepid sponging, antipyretics (paracetamol), light clothing, adequate hydration. Monitor temperature every 4 hours. Record fever pattern (tertian, quartan).', rationale: 'Fever management reduces metabolic demand and improves comfort. Pattern documentation aids diagnosis.', frequency: 'Temperature every 4 h; tepid sponging PRN' },
      { id: 'i-mal-3', category: 'independent', action: 'Monitor for severe malaria: cerebral signs (confusion, seizures, coma), severe anaemia (Hb < 7), renal impairment, hypoglycaemia, respiratory distress, jaundice. Check blood glucose every 6 hours.', rationale: 'Severe malaria (P. falciparum) can progress rapidly. Early detection of complications saves lives.', frequency: 'Neurological assessment every 4 h; blood glucose every 6 h' },
      { id: 'i-mal-4', category: 'independent', action: 'Educate on prevention: insecticide-treated nets (ITNs), repellent (DEET), chemoprophylaxis for travellers, eliminating stagnant water, wearing long sleeves at dusk.', rationale: 'Prevention reduces recurrence and transmission. ITNs reduce malaria incidence by 50%.', frequency: 'At admission and discharge' },
    ],
    evaluation: [
      { id: 'e-mal-1', expected: 'Temperature normalised. Parasite clearance on repeat smear. No complications. Full course completed.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Malaria Prevention and Treatment', keyPoints: ['Complete the full course of antimalarials even if you feel better.', 'Sleep under an insecticide-treated net every night.', 'Use insect repellent on exposed skin in the evening.', 'Seek treatment immediately for fever after visiting a malaria area.', 'Chemoprophylaxis is essential for travellers to endemic areas.', 'Eliminate stagnant water around your home.'], method: 'Verbal, ITN demonstration, written prevention leaflet' },
    ],
    dischargePlanning: { checklist: ['Antimalarial course completed or prescribed for home completion', 'Fever resolved', 'Haemoglobin stable', 'Prevention education completed', 'ITN provided if applicable'], followUp: 'Review in 1 week if P. vivax/ovale (risk of relapse -- consider primaquine for hypnozoites). Repeat smear at day 7.', referrals: ['Public health for vector control', 'Haematology if severe anaemia'], warningSigns: ['Return of fever', 'Confusion or seizures', 'Dark urine', 'Severe weakness', 'Jaundice'] },
    complications: ['Severe anaemia', 'Cerebral malaria', 'Acute kidney injury', 'Hypoglycaemia', 'ARDS', 'Disseminated intravascular coagulation', 'Death (P. falciparum)'],
  },

  'Bacterial Infections': {
    id: 'cp-bacterial', disease: 'Bacterial Infections', specialty: 'Infectious Disease Care',
    overview: 'Bacterial infections range from localised skin infections to life-threatening sepsis. Nursing care focuses on antimicrobial stewardship, source control, haemodynamic monitoring, and infection prevention.',
    pathophysiology: 'Bacterial invasion triggers a systemic inflammatory response. In severe cases, this progresses to sepsis (SOFA score ≥ 2), septic shock (vasopressor requirement + lactate > 2 mmol/L), and multi-organ dysfunction.',
    commonCauses: ['Staphylococcus aureus (skin/bone)', 'Escherichia coli (UTI)', 'Streptococcus pneumoniae (pneumonia)', 'Klebsiella spp.', 'Pseudomonas aeruginosa'],
    riskFactors: ['Immunosuppression', 'Diabetes mellitus', 'Indwelling devices (catheters, IV lines)', 'Surgical wounds', 'Chronic lung disease', 'Extremes of age'],
    subjectiveData: ['Fever or hypothermia', 'Pain and swelling at infection site', 'Malaise and fatigue', 'Dyspnoea (if pulmonary)', 'Dysuria (if UTI)', 'Confusion (sepsis)'],
    objectiveData: ['Temperature > 38 C or < 36 C', 'Heart rate > 90 bpm', 'Respiratory rate > 20', 'WCC > 12,000 or < 4,000', 'Elevated CRP/procalcitonin', 'Positive blood cultures', 'Lactate > 2 mmol/L (sepsis)'],
    nursingDiagnoses: [
      { id: 'nd-bi-1', diagnosis: 'Hyperthermia or Hypothermia related to infectious process as evidenced by abnormal temperature', definingCharacteristics: ['Temperature > 38 C or < 36 C', 'Rigors', 'Diaphoresis'] },
      { id: 'nd-bi-2', diagnosis: 'Risk for Septic Shock related to systemic bacterial infection and inflammatory response', definingCharacteristics: ['Tachycardia', 'Hypotension', 'Elevated lactate'] },
      { id: 'nd-bi-3', diagnosis: 'Deficient Knowledge related to antimicrobial therapy and infection prevention measures', definingCharacteristics: ['Unable to describe medication regimen', 'Unaware of hand hygiene importance'] },
    ],
    goals: [
      { id: 'g-bi-1', shortTerm: 'Temperature normalised within 24 hours. Source controlled. Antimicrobials administered within 1 hour of sepsis recognition.', longTerm: 'Complete antimicrobial course. No recurrent infections. Patient demonstrates prevention measures.' },
    ],
    interventions: [
      { id: 'i-bi-1', category: 'dependent', action: 'Administer empiric antimicrobials within 1 hour of sepsis recognition (broad-spectrum: piperacillin-tazobactam or meropenem + vancomycin if MRSA risk). De-escalate based on culture results. Monitor for allergic reactions.', rationale: 'Each hour of delay in antimicrobial administration increases sepsis mortality by 7.6%.', frequency: 'Within 1 hour of sepsis recognition; de-escalate at 48-72 h based on cultures' },
      { id: 'i-bi-2', category: 'independent', action: 'Implement sepsis bundle: 30 mL/kg crystalloid for hypotension or lactate ≥ 4; vasopressors (noradrenaline) if MAP < 65 after fluids; blood cultures before antibiotics; lactate every 2-4 hours.', rationale: 'The sepsis bundle (Surviving Sepsis Campaign) reduces mortality by 20% when fully compliant.', frequency: 'Hour-1 and hour-3 bundle elements; lactate every 2-4 h' },
      { id: 'i-bi-3', category: 'independent', action: 'Implement infection prevention: hand hygiene, aseptic technique for device care, timely removal of indwelling catheters, wound care, skin assessment. Monitor device-associated infection rates.', rationale: 'Healthcare-associated infections add 7-10 days to hospital stay and increase mortality.', frequency: 'Continuous; device assessment daily' },
      { id: 'i-bi-4', category: 'independent', action: 'Educate on antimicrobial stewardship and prevention: complete full course, never share antibiotics, hand hygiene, wound care, recognise signs of infection.', rationale: 'Patient education supports antimicrobial stewardship and prevents recurrent infections.', frequency: 'Daily during admission; reinforced at discharge' },
    ],
    evaluation: [
      { id: 'e-bi-1', expected: 'Temperature normalised. Antimicrobials de-escalated to narrow-spectrum based on cultures. Source controlled. No organ dysfunction.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Bacterial Infection Treatment and Prevention', keyPoints: ['Complete the full course of antibiotics.', 'Practice good hand hygiene to prevent spread.', 'Keep wounds clean and covered.', 'Never share or self-prescribe antibiotics.', 'Seek care early for signs of infection: fever, redness, swelling, pus.', 'Ensure vaccinations are up to date (pneumococcal, influenza).'], method: 'Verbal, written discharge instructions' },
    ],
    dischargePlanning: { checklist: ['Temperature normalised for ≥ 24 hours', 'Antimicrobial prescription and duration confirmed', 'Source controlled', 'Infection prevention measures understood', 'Follow-up cultures scheduled if needed'], followUp: 'GP review in 1 week. Repeat cultures if complicated infection. Review antimicrobial duration.', referrals: ['Infectious disease if resistant organism', 'Surgery for source control if needed'], warningSigns: ['Return of fever', 'Worsening pain or swelling', 'Pus or wound breakdown', 'Confusion or drowsiness', 'Difficulty breathing'] },
    complications: ['Sepsis and septic shock', 'Multi-organ failure', 'Metastatic infection', 'Antimicrobial resistance', 'Superinfection (C. difficile)', 'Death (septic shock mortality 40%)'],
  },

  // ═══════════════════════════════════════════════════════════════
  // BATCH: Endocrine — Diabetic Emergencies, Thyroid, Osteoporosis
  // ═══════════════════════════════════════════════════════════════

  'Diabetic Emergencies': {
    id: 'cp-dme', disease: 'Diabetic Emergencies', specialty: 'Endocrine & Metabolic Care',
    overview: 'Diabetic emergencies include diabetic ketoacidosis (DKA) and hyperosmolar hyperglycaemic state (HHS), both requiring urgent intervention. Nursing care focuses on fluid resuscitation, insulin therapy, electrolyte correction, and monitoring.',
    pathophysiology: 'DKA: absolute insulin deficiency leads to ketogenesis, metabolic acidosis, and dehydration. HHS: relative insulin deficiency causes severe hyperglycaemia (> 33 mmol/L), profound dehydration, and hyperosmolality without significant ketosis.',
    commonCauses: ['Missed insulin doses', 'Infection/illness', 'New-onset Type 1 DM', 'Steroid use', 'Alcohol', 'Pancreatitis'],
    riskFactors: ['Type 1 diabetes', 'Poorly controlled Type 2 DM', 'Insulin pump failure', 'Infection', 'Cardiovascular disease', 'Older age (HHS)'],
    subjectiveData: ['Polyuria and polydipsia', 'Nausea and vomiting', 'Abdominal pain (DKA)', 'Altered mental status (HHS)', 'Weakness and fatigue', 'Fruity breath odour (DKA)'],
    objectiveData: ['Blood glucose > 11 mmol/L (DKA) or > 33 mmol/L (HHS)', 'pH < 7.3 and bicarbonate < 18 (DKA)', 'Ketones in blood/urine (DKA)', 'Serum osmolality > 320 mOsm/kg (HHS)', 'Dehydration signs', 'Kussmaul breathing (DKA)'],
    nursingDiagnoses: [
      { id: 'nd-dme-1', diagnosis: 'Deficient Fluid Volume related to osmotic diuresis and vomiting as evidenced by dehydration signs', definingCharacteristics: ['Dry mucous membranes', 'Reduced skin turgor', 'Tachycardia', 'Low urine output'] },
      { id: 'nd-dme-2', diagnosis: 'Imbalanced Nutrition: Less Than Body Requirements related to insulin deficiency and metabolic derangement', definingCharacteristics: ['Hyperglycaemia', 'Ketosis', 'Weight loss'] },
      { id: 'nd-dme-3', diagnosis: 'Risk for Electrolyte Imbalance related to fluid shifts and insulin therapy', definingCharacteristics: ['Hypokalaemia risk', 'Sodium shifts', 'Phosphate depletion'] },
    ],
    goals: [
      { id: 'g-dme-1', shortTerm: 'Blood glucose < 15 mmol/L within 2 hours. Fluid deficit corrected by 50% in first 4 hours. pH > 7.3 in DKA.', longTerm: 'Complete metabolic recovery. Insulin regimen stabilised. Patient demonstrates sick-day rules.' },
    ],
    interventions: [
      { id: 'i-dme-1', category: 'dependent', action: 'Administer IV fluid resuscitation: 0.9% NaCl 1L in first hour (adjust for cardiac status). Switch to 0.45% NaCl when glucose < 14 mmol/L. Add 5% dextrose when glucose < 11 mmol/L.', rationale: 'Fluid resuscitation corrects dehydration and restores tissue perfusion. Dextrose prevents hypoglycaemia while continuing insulin for ketosis.', frequency: 'Hourly fluid assessment; blood glucose every 1 h' },
      { id: 'i-dme-2', category: 'dependent', action: 'Administer IV insulin infusion (0.1 units/kg/h regular insulin). Ensure potassium is ≥ 3.3 mmol/L before starting insulin. Monitor blood glucose hourly. Reduce to SC insulin when DKA resolves (pH > 7.3, bicarb > 15, anion gap normalised).', rationale: 'Insulin halts ketogenesis and lowers glucose. Potassium check prevents fatal hypokalaemia.', frequency: 'Continuous insulin infusion; blood glucose hourly; potassium every 2 h' },
      { id: 'i-dme-3', category: 'independent', action: 'Monitor electrolytes every 2-4 hours: potassium, sodium, bicarbonate, phosphate, magnesium. Replace as prescribed. Monitor ECG for potassium-related changes.', rationale: 'Insulin drives potassium intracellularly, risking fatal hypokalaemia. Careful replacement is essential.', frequency: 'Electrolytes every 2 h initially; ECG monitoring' },
      { id: 'i-dme-4', category: 'independent', action: 'Monitor neurological status (GCS) every 2 hours for HHS. Monitor urine output hourly (target > 0.5 mL/kg/h). Assess for fluid overload (lung crackles, JVP).', rationale: 'HHS causes altered consciousness from hyperosmolality. Fluid overload is a common complication of resuscitation.', frequency: 'GCS every 2 h; urine output hourly; lung assessment every 4 h' },
    ],
    evaluation: [
      { id: 'e-dme-1', expected: 'Blood glucose controlled. pH normalised (DKA). Electrolytes balanced. Patient transitioned to SC insulin safely.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Diabetic Emergency Prevention and Sick-Day Rules', keyPoints: ['Never skip insulin doses -- even when sick.', 'Check blood glucose more often when ill (every 2-4 hours).', 'Sick-day rules: continue insulin, increase fluids, test ketones if glucose > 15 mmol/L.', 'Seek emergency care for persistent vomiting, confusion, or deep breathing.', 'Keep a sick-day management plan from your diabetes team.', 'Always carry rapid-acting glucose (glucose tablets, juice).'], method: 'Verbal, sick-day rules card, insulin technique demonstration' },
    ],
    dischargePlanning: { checklist: ['Stable blood glucose on SC insulin regimen', 'Ketone-negative', 'Electrolytes normalised', 'Fluid balance restored', 'Sick-day rules provided', 'Follow-up with diabetes team scheduled'], followUp: 'Diabetes clinic in 1 week. HbA1c at 3 months. Review insulin technique.', referrals: ['Diabetes specialist nurse', 'Endocrinologist', 'Dietitian', 'Ophthalmology for retinopathy screening'], warningSigns: ['Blood glucose > 20 mmol/L', 'Ketones in urine', 'Persistent vomiting', 'Confusion or drowsiness', 'Deep/laboured breathing'] },
    complications: ['Cerebral oedema (DKA, especially children)', 'Hypokalaemia', 'Hypoglycaemia', 'Pulmonary oedema', 'Venous thromboembolism', 'ARDS', 'Death'],
  },

  'Thyroid Disorders': {
    id: 'cp-thyroid', disease: 'Thyroid Disorders', specialty: 'Endocrine & Metabolic Care',
    overview: 'Thyroid disorders encompass hypothyroidism, hyperthyroidism, and thyroid emergencies (myxoedema coma, thyroid storm). Nursing care focuses on hormone replacement or suppression, vital sign monitoring, and complication prevention.',
    pathophysiology: 'Hypothyroidism: insufficient thyroid hormone production causes metabolic slowing. Hyperthyroidism: excess thyroid hormone causes metabolic acceleration. Thyroid storm is a life-threatening exacerbation of hyperthyroidism.',
    commonCauses: ['Hashimoto thyroiditis (hypothyroidism)', "Graves' disease (hyperthyroidism)", 'Iodine deficiency', 'Thyroid surgery', 'Radiation therapy', 'Medications (amiodarone, lithium)'],
    riskFactors: ['Female sex', 'Family history of thyroid disease', 'Autoimmune conditions', 'Iodine deficiency or excess', 'Age > 60'],
    subjectiveData: ['Hypothyroidism: fatigue, weight gain, constipation, cold intolerance, dry skin', 'Hyperthyroidism: weight loss, heat intolerance, palpitations, diarrhoea, anxiety', 'Myxoedema coma: altered consciousness, hypothermia', 'Thyroid storm: high fever, tachycardia, delirium'],
    objectiveData: ['Hypothyroidism: bradycardia, delayed reflexes, periorbital oedema, elevated TSH', 'Hyperthyroidism: tachycardia, tremor, exophthalmos, goitre, suppressed TSH', 'Thyroid storm: fever > 40 C, HR > 140, altered consciousness', 'Myxoedema coma: hypothermia, hypoventilation, hyponatraemia'],
    nursingDiagnoses: [
      { id: 'nd-thy-1', diagnosis: 'Imbalanced Nutrition related to metabolic dysfunction as evidenced by weight changes', definingCharacteristics: ['Weight gain (hypothyroid) or loss (hyperthyroid)', 'Appetite changes'] },
      { id: 'nd-thy-2', diagnosis: 'Risk for Decreased Cardiac Output related to thyroid hormone imbalance', definingCharacteristics: ['Bradycardia (hypo) or tachycardia (hyper)', 'Arrhythmias'] },
      { id: 'nd-thy-3', diagnosis: 'Deficient Knowledge related to thyroid hormone replacement or antithyroid therapy', definingCharacteristics: ['Unable to describe medication regimen', 'Unaware of monitoring requirements'] },
    ],
    goals: [
      { id: 'g-thy-1', shortTerm: 'Thyroid storm: HR < 100, temperature < 38 C within 12 hours. Myxoedema: consciousness improving, ventilation adequate.', longTerm: 'TSH within normal range. Stable thyroid hormone replacement/suppression. No complications.' },
    ],
    interventions: [
      { id: 'i-thy-1', category: 'dependent', action: 'Administer thyroid medications as prescribed: levothyroxine for hypothyroidism (empty stomach, 30-60 min before food); antithyroid drugs (carbimazole, PTU) for hyperthyroidism; block-and-replace regimen if indicated.', rationale: 'Consistent administration timing and conditions ensure optimal absorption and therapeutic levels.', frequency: 'Levothyroxine: morning, empty stomach; antithyroid: with meals' },
      { id: 'i-thy-2', category: 'dependent', action: 'Thyroid storm management: administer PTU/methimazole, beta-blockers (propranolol), iodine solution (Lugols) 1 hour after antithyroid, dexamethasone, cooling measures. Myxoedema: IV levothyroxine, hydrocortisone, active rewarming, ventilation support.', rationale: 'Thyroid storm requires urgent multi-drug approach. Myxoedema coma requires IV hormone replacement and supportive care.', frequency: 'As per thyroid storm protocol; continuous monitoring' },
      { id: 'i-thy-3', category: 'independent', action: 'Monitor vital signs: heart rate, blood pressure, temperature, respiratory rate every 2-4 hours. Monitor for cardiac arrhythmias (ECG). Weigh daily. Assess for oedema, tremor, and reflexes.', rationale: 'Vital sign trends indicate treatment response and detect deterioration.', frequency: 'Vitals every 4 h; weight daily; ECG as indicated' },
      { id: 'i-thy-4', category: 'independent', action: 'Educate on thyroid medication: take levothyroxine consistently; avoid calcium, iron, and PPI within 4 hours. Report signs of over- or under-replacement. Regular blood test monitoring.', rationale: 'Thy lifelong medication requires consistent adherence and monitoring.', frequency: 'At admission and discharge' },
    ],
    evaluation: [
      { id: 'e-thy-1', expected: 'Thyroid function normalising (TSH in range). Vital signs stable. No cardiac complications. Patient demonstrates medication management.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Thyroid Medication Management', keyPoints: ['Take levothyroxine on an empty stomach, 30-60 minutes before breakfast.', 'Avoid calcium, iron supplements, and antacids within 4 hours of levothyroxine.', 'Report symptoms of over-replacement: palpitations, weight loss, tremor, insomnia.', 'Report symptoms of under-replacement: fatigue, weight gain, constipation, cold intolerance.', 'Blood tests for thyroid function are needed every 6-8 weeks until stable.'], method: 'Verbal, medication timing chart, written instructions' },
    ],
    dischargePlanning: { checklist: ['Thyroid function tests at baseline and follow-up scheduled', 'Medication prescription and timing instructions', 'Drug interaction education', 'Follow-up with endocrinology', 'Emergency signs reviewed'], followUp: 'Endocrinology in 4-6 weeks. TFTs every 6-8 weeks until stable, then every 6-12 months.', referrals: ['Endocrinology', 'Cardiology if arrhythmias', 'Ophthalmology if Graves eye disease'], warningSigns: ['Chest pain or palpitations', 'High fever with rapid heart rate', 'Confusion or drowsiness', 'Difficulty breathing', 'Severe swelling'] },
    complications: ['Thyroid storm (mortality 20-30%)', 'Myxoedema coma (mortality 25-60%)', 'Cardiac arrhythmias', 'Heart failure', 'Osteoporosis (hyperthyroidism)', 'Infertility'],
  },

  'Osteoporosis': {
    id: 'cp-osteo', disease: 'Osteoporosis', specialty: 'Endocrine & Metabolic Care',
    overview: 'Osteoporosis is a systemic skeletal disorder characterised by low bone density and micro-architectural deterioration, leading to increased fracture risk. Nursing care focuses on fracture prevention, calcium/vitamin D supplementation, and bone-protective therapy.',
    pathophysiology: 'Bone resorption by osteoclasts exceeds bone formation by osteoblasts, leading to reduced bone mass and structural deterioration. Oestrogen deficiency (menopause), ageing, and secondary causes accelerate this process.',
    commonCauses: ['Postmenopausal oestrogen deficiency', 'Ageing', 'Glucocorticoid use', 'Vitamin D deficiency', 'Immobilisation', 'Hyperthyroidism'],
    riskFactors: ['Female sex', 'Age > 65', 'Low BMI (< 19)', 'Family history of fracture', 'Smoking', 'Excessive alcohol', 'Previous fragility fracture', 'Prolonged immobility'],
    subjectiveData: ['Loss of height', 'Back pain (vertebral fractures)', 'Reduced mobility', 'Fear of falling', 'Reduced quality of life'],
    objectiveData: ['T-score < -2.5 on DEXA scan', 'Vertebral compression fractures', 'Kyphosis (dowagers hump)', 'Height loss > 3 cm', 'Low calcium/vitamin D levels', 'FRAX score indicating high fracture risk'],
    nursingDiagnoses: [
      { id: 'nd-ost-1', diagnosis: 'Risk for Frailty Syndrome related to bone demineralisation and fracture risk', definingCharacteristics: ['T-score < -2.5', 'History of fragility fracture', 'Falls history'] },
      { id: 'nd-ost-2', diagnosis: 'Chronic Pain related to vertebral fractures as evidenced by back pain and postural changes', definingCharacteristics: ['Back pain', 'Kyphosis', 'Reduced mobility'] },
      { id: 'nd-ost-3', diagnosis: 'Deficient Knowledge related to osteoporosis management, fall prevention, and medication adherence', definingCharacteristics: ['Unable to describe prevention measures', 'Unaware of calcium/vitamin D requirements'] },
    ],
    goals: [
      { id: 'g-ost-1', shortTerm: 'Pain managed. Calcium and vitamin D supplementation initiated. Fall risk assessment completed.', longTerm: 'No new fractures. T-score stable or improved. Patient demonstrates fall prevention strategies.' },
    ],
    interventions: [
      { id: 'i-ost-1', category: 'dependent', action: 'Administer bisphosphonates (alendronate 70 mg weekly or risedronate) on empty stomach with 200 mL water. Ensure patient remains upright for 30 minutes. Monitor for GI side effects and atypical femur fractures.', rationale: 'Bisphosphonates inhibit osteoclast activity and reduce fracture risk by 40-70%. Upright positioning prevents oesophageal irritation.', frequency: 'Weekly or monthly as prescribed; DEXA scan every 2 years' },
      { id: 'i-ost-2', category: 'independent', action: 'Ensure adequate calcium (1000-1200 mg/day) and vitamin D (800-1000 IU/day) intake through diet and supplements. Encourage dairy, fortified foods, and leafy greens.', rationale: 'Calcium and vitamin D are essential for bone mineralisation. Supplementation reduces fracture risk.', frequency: 'Daily dietary assessment; serum calcium and vitamin D every 3-6 months' },
      { id: 'i-ost-3', category: 'independent', action: 'Implement fall prevention: remove hazards, ensure adequate lighting, non-slip footwear, grab rails, balance and strength exercises (weight-bearing exercises 30 min/day).', rationale: 'Falls are the primary cause of osteoporotic fractures. Multi-factorial fall prevention reduces fracture incidence by 24%.', frequency: 'Daily exercise programme; environmental assessment at every visit' },
      { id: 'i-ost-4', category: 'independent', action: 'Educate on posture, safe lifting techniques, and vertebral fracture prevention. Encourage weight-bearing exercise. Review medications that increase fall risk (sedatives, antihypertensives).', rationale: 'Patient education and exercise improve bone density and reduce fall risk.', frequency: 'At admission and at every follow-up visit' },
    ],
    evaluation: [
      { id: 'e-ost-1', expected: 'Pain controlled. Calcium/vitamin D supplementation in place. No new fractures. Fall prevention measures implemented.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Osteoporosis Management and Fall Prevention', keyPoints: ['Take bisphosphonates on an empty stomach with water, and remain upright for 30 minutes.', 'Eat calcium-rich foods: dairy, fortified cereals, leafy greens.', 'Get 15-30 minutes of sunlight daily for vitamin D.', 'Do weight-bearing exercises: walking, dancing, light resistance training.', 'Remove trip hazards at home: loose rugs, poor lighting, clutter.', 'Do not smoke and limit alcohol.'], method: 'Verbal, exercise demonstration, written fall prevention guide' },
    ],
    dischargePlanning: { checklist: ['Bisphosphonate prescription and instructions', 'Calcium and vitamin D supplementation', 'Fall risk assessment and prevention plan', 'DEXA scan scheduled', 'Exercise programme provided'], followUp: 'DEXA scan in 2 years. Calcium/vitamin D levels in 3 months. Repeat FRAX assessment annually.', referrals: ['Rheumatology/endocrinology', 'Physiotherapy for exercise programme', 'Falls clinic if recurrent falls'], warningSigns: ['Sudden severe back pain', 'Loss of height', 'Groin pain (atypical femur fracture)', 'Difficulty swallowing (bisphosphonate)', 'Jaw pain (osteonecrosis)'] },
    complications: ['Hip fracture (20% mortality in 1 year)', 'Vertebral compression fractures', 'Chronic pain', 'Kyphosis and respiratory compromise', 'Depression and social isolation', 'Atypical femur fractures (rare with bisphosphonates)'],
  },

  'Gastro-oesophageal Reflux Disease': {
    id: 'cp-gerd', disease: 'Gastro-oesophageal Reflux Disease', specialty: 'Gastrointestinal Care',
    overview: 'GERD is a chronic condition where gastric acid frequently flows back into the oesophagus, causing symptoms and complications. Nursing care focuses on symptom control, lifestyle modification, and prevention of oesophageal damage.',
    pathophysiology: 'Transient lower oesophageal sphincter (LOS) relaxations or hypotonic LOS allow gastric acid to reflux into the oesophagus. Chronic exposure leads to mucosal inflammation (oesophagitis), Barrett metaplasia, and potential adenocarcinoma.',
    commonCauses: ['Lower oesophageal sphincter incompetence', 'Hiatus hernia', 'Obesity', 'Pregnancy', 'Gastric acid hypersecretion', 'Impaired oesophageal motility'],
    riskFactors: ['Obesity (BMI > 30)', 'Hiatus hernia', 'Smoking', 'Pregnancy', 'NSAID/aspirin use', 'Delayed gastric emptying', 'Connective tissue disorders (scleroderma)'],
    subjectiveData: ['Heartburn (retrosternal burning)', 'Regurgitation of sour or bitter fluid', 'Dysphagia', 'Odynophagia', 'Chronic cough', 'Laryngitis', 'Chest pain (non-cardiac)'],
    objectiveData: ['Erythema/erosions on endoscopy', 'Positive pH monitoring (DeMeester score > 14.7)', 'Barrett oesophagus on biopsy', 'Los Angeles classification of oesophagitis', 'Hiatus hernia on imaging'],
    nursingDiagnoses: [
      { id: 'nd-gerd-1', diagnosis: 'Chronic Pain related to gastric acid irritation of oesophageal mucosa as evidenced by heartburn and regurgitation', definingCharacteristics: ['Heartburn after meals', 'Regurgitation', 'Worse when supine'] },
      { id: 'nd-gerd-2', diagnosis: 'Imbalanced Nutrition: Less Than Body Requirements related to pain-associated food avoidance and dietary restrictions', definingCharacteristics: ['Avoidance of trigger foods', 'Weight loss', 'Reduced intake'] },
      { id: 'nd-gerd-3', diagnosis: 'Deficient Knowledge related to lifestyle modifications and medication adherence for GERD management', definingCharacteristics: ['Unable to describe trigger foods', 'Incorrect medication timing'] },
    ],
    goals: [
      { id: 'g-gerd-1', shortTerm: 'Heartburn and regurgitation reduced. PPI therapy initiated correctly. Trigger foods identified.', longTerm: 'Symptom-free on lifestyle modifications and minimal medication. No oesophageal complications.' },
    ],
    interventions: [
      { id: 'i-gerd-1', category: 'dependent', action: 'Administer PPIs (omeprazole 20-40 mg, lansoprazole 30 mg) 30-60 minutes before breakfast. For breakthrough symptoms, add H2-receptor antagonist (ranitidine/famotidine) at bedtime. Review need for long-term PPI vs step-down therapy.', rationale: 'PPIs suppress acid secretion by blocking H+/K+ ATPase pumps, providing most effective acid suppression for oesophagitis healing.', frequency: 'Once or twice daily as prescribed; review every 8-12 weeks' },
      { id: 'i-gerd-2', category: 'independent', action: 'Advise lifestyle modifications: elevate head of bed 15-20 cm, avoid eating 2-3 hours before lying down, lose weight if obese, avoid trigger foods (fatty foods, caffeine, alcohol, chocolate, spicy foods, citrus, mint), stop smoking, avoid tight-fitting clothing.', rationale: 'Lifestyle changes reduce transient LOS relaxations and gastric volume, decreasing reflux episodes by up to 70%.', frequency: 'At diagnosis and every follow-up' },
      { id: 'i-gerd-3', category: 'independent', action: 'Monitor for complications: progressive dysphagia (stricture), unexplained weight loss, GI bleeding (iron deficiency anaemia), Barrett oesophagus. Refer for endoscopy if red-flag symptoms present.', rationale: 'Early detection of complications allows timely intervention and prevents progression to oesophageal adenocarcinoma.', frequency: 'At every visit; endoscopy per guidelines' },
      { id: 'i-gerd-4', category: 'independent', action: 'Educate on medication adherence: take PPIs consistently, not just when symptomatic. Discuss long-term PPI risks (bone fractures, hypomagnesaemia, C. difficile, vitamin B12 deficiency) and periodic review.', rationale: 'PPIs are most effective when taken before meals. Long-term use requires risk-benefit assessment.', frequency: 'At discharge and every 3-month follow-up' },
    ],
    evaluation: [
      { id: 'e-gerd-1', expected: 'Heartburn resolved or minimal. Patient tolerating modified diet. PPI taken correctly. No complications.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'GERD Self-Management', keyPoints: ['Take PPIs 30-60 minutes before breakfast on an empty stomach.', 'Elevate the head of your bed by 15-20 cm (blocks under bed legs or wedge pillow).', 'Avoid eating within 2-3 hours of bedtime.', 'Limit trigger foods: fatty/fried foods, caffeine, alcohol, chocolate, spicy food, citrus.', 'Lose weight gradually if overweight — even 5 kg can reduce symptoms.', 'Avoid smoking and tight-fitting clothing around the abdomen.'], method: 'Verbal, trigger food diary, written lifestyle guide' },
    ],
    dischargePlanning: { checklist: ['PPI prescription with timing instructions', 'Lifestyle modification checklist provided', 'Trigger food diary initiated', 'Red-flag symptom education', 'Follow-up endoscopy scheduled if Barrett oesophagus'], followUp: 'GP review in 4-6 weeks. Repeat endoscopy in 8-12 weeks if oesophagitis, or 1-2 years if Barrett oesophagus.', referrals: ['Gastroenterology for refractory symptoms or Barrett oesophagus', 'Dietitian for dietary modification', 'Bariatric referral if BMI > 35'], warningSigns: ['Difficulty swallowing (progressive)', 'Vomiting blood or black tarry stools', 'Unexplained weight loss', 'Severe chest pain', 'Chronic hoarseness or cough'] },
    complications: ['Oesophageal stricture', 'Barrett oesophagus', 'Oesophageal adenocarcinoma', 'Aspiration pneumonia', 'Dental erosion', 'Chronic laryngitis'],
  },

  'Inflammatory Bowel Disease': {
    id: 'cp-ibd', disease: 'Inflammatory Bowel Disease', specialty: 'Gastrointestinal Care',
    overview: 'IBD encompasses Crohn disease and ulcerative colitis — chronic immune-mediated inflammatory conditions of the GI tract. Nursing care focuses on flare management, nutritional support, medication adherence, and psychosocial well-being.',
    pathophysiology: 'Dysregulated mucosal immune response to gut microbiota in genetically susceptible individuals. Crohn disease can affect any GI segment (skip lesions, transmural); ulcerative colitis is limited to the colon (continuous, mucosal).',
    commonCauses: ['Autoimmune dysregulation', 'Genetic predisposition (NOD2/CARD15, HLA)', 'Environmental triggers (smoking, diet, infections)', 'Gut microbiome dysbiosis'],
    riskFactors: ['Family history of IBD', 'Smoking (Crohn disease)', 'Appendectomy (protective in UC)', 'NSAID use', 'Western diet', 'Urban/developed country residence'],
    subjectiveData: ['Chronic diarrhoea (may be bloody in UC)', 'Abdominal pain (right iliac fossa in Crohn, left in UC)', 'Weight loss', 'Fatigue', 'Joint pain', 'Perianal pain/discharge'],
    objectiveData: ['Anaemia (iron deficiency, B12 deficiency)', 'Elevated CRP/ESR', 'Faecal calprotectin > 250 mcg/g', 'Colonoscopy: skip lesions (Crohn), continuous inflammation (UC)', 'Imaging: strictures, fistulae (Crohn)'],
    nursingDiagnoses: [
      { id: 'nd-ibd-1', diagnosis: 'Diarrhoea related to intestinal inflammation as evidenced by increased frequency and volume of loose stools', definingCharacteristics: ['> 3 loose stools/day', 'Bloody stools', 'Urgency'] },
      { id: 'nd-ibd-2', diagnosis: 'Acute Pain related to intestinal inflammation and cramping as evidenced by abdominal pain and tenderness', definingCharacteristics: ['Cramping abdominal pain', 'Rebound tenderness', 'Pain relieved by defecation'] },
      { id: 'nd-ibd-3', diagnosis: 'Imbalanced Nutrition: Less Than Body Requirements related to malabsorption, anorexia, and increased metabolic demands', definingCharacteristics: ['Weight loss', 'Low albumin', 'Micronutrient deficiencies'] },
    ],
    goals: [
      { id: 'g-ibd-1', shortTerm: 'Flare controlled. Nutritional status stabilised. Pain managed. Fluid/electrolyte balance restored.', longTerm: 'Sustained remission. Adequate nutrition. Medication adherence. Improved quality of life.' },
    ],
    interventions: [
      { id: 'i-ibd-1', category: 'dependent', action: 'Administer 5-ASA agents (mesalazine 1-4 g/day), corticosteroids (prednisolone 40 mg tapering for flares, budesonide for ileal/right colonic Crohn), immunomodulators (azathioprine 2-2.5 mg/kg, methotrexate), and biologics (infliximab 5 mg/kg, adalimumab, vedolizumab) as prescribed.', rationale: 'Step-up or top-down therapy targets mucosal inflammation. Biologics achieve mucosal healing and reduce surgery rates.', frequency: 'As per induction/maintenance protocol; biologic infusion every 4-8 weeks' },
      { id: 'i-ibd-2', category: 'independent', action: 'Monitor stool frequency, consistency, and blood content. Track nocturnal symptoms. Monitor for dehydration: skin turgor, mucous membranes, urine output, electrolytes.', rationale: 'Stool diary guides treatment response assessment. Nocturnal symptoms suggest organic disease rather than functional.', frequency: 'Stool chart; daily fluid balance; electrolytes during flares' },
      { id: 'i-ibd-3', category: 'independent', action: 'Nutritional assessment: daily weight, albumin/pre-albumin, iron studies, B12, folate, vitamin D. Dietitian referral for high-calorie, low-residue diet during flares. Consider enteral nutrition for growth failure in paediatric patients.', rationale: 'Malnutrition affects 20-55% of IBD patients. Nutritional optimisation supports mucosal healing and immune function.', frequency: 'Weekly weight; monthly biochemistry; dietitian review at flare onset' },
      { id: 'i-ibd-4', category: 'independent', action: 'Psychosocial support: screen for anxiety and depression (PHQ-9, GAD-7), assess coping strategies, refer to IBD specialist nurse or psychologist. Support groups and peer mentoring.', rationale: 'Psychological distress affects 40% of IBD patients and worsens disease outcomes. Integrated care improves adherence.', frequency: 'At every flare admission and every 3-month review' },
    ],
    evaluation: [
      { id: 'e-ibd-1', expected: 'Stool frequency normalised. No bloody stools. CRP normalised. Nutritional markers improving. Patient reports improved quality of life.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'IBD Management and Flare Prevention', keyPoints: ['Take medications exactly as prescribed — do not stop during remission.', 'Keep a symptom diary to identify flare triggers.', 'Eat small, frequent meals. During flares, choose low-fibre, low-residue foods.', 'Stay hydrated: aim for 2-3 litres of fluid daily.', 'Report blood in stools, fever, or severe abdominal pain immediately.', 'Attend regular blood tests to monitor medication side effects.', 'Smoking worsens Crohn disease — cessation is essential.'], method: 'Verbal, symptom diary, written IBD guide, Flare Action Plan' },
    ],
    dischargePlanning: { checklist: ['Medication prescriptions and administration guide', 'Flare action plan provided', 'Blood monitoring schedule', 'Dietitian referral', 'Psychosocial support referral', 'Smoking cessation support if applicable'], followUp: 'IBD clinic in 2-4 weeks post-flare. Colonoscopy at 12 months for dysplasia surveillance. Annual bloods for medication monitoring.', referrals: ['IBD specialist nurse', 'Gastroenterology', 'Dietitian', 'Psychology/psychiatry', 'Surgery if refractory disease'], warningSigns: ['Bloody diarrhoea > 3 episodes/day', 'Severe abdominal pain with fever', 'Signs of dehydration', 'Weight loss > 5% in 1 month', 'Perianal pain or discharge'] },
    complications: ['Colorectal cancer (UC)', 'Small bowel cancer (Crohn)', 'Strictures and bowel obstruction', 'Fistulae and abscesses', 'Toxic megacolon', 'Osteoporosis (steroid use)', 'Thromboembolism'],
  },

  'Liver Disease': {
    id: 'cp-liver', disease: 'Liver Disease', specialty: 'Gastrointestinal Care',
    overview: 'Chronic liver disease progresses through fibrosis to cirrhosis, with complications including portal hypertension, variceal bleeding, ascites, hepatic encephalopathy, and hepatorenal syndrome. Nursing care centres on complication prevention, nutritional support, and transplant assessment.',
    pathophysiology: 'Chronic hepatocyte injury leads to fibrosis, nodular regeneration, and altered liver architecture. Portal hypertension develops, causing varices, ascites, and splenomegaly. Synthetic failure causes coagulopathy, hypoalbuminaemia, and encephalopathy.',
    commonCauses: ['Chronic alcohol use', 'Chronic viral hepatitis (HBV, HCV)', 'Non-alcoholic steatohepatitis (NASH)', 'Autoimmune hepatitis', 'Primary biliary cholangitis', 'Wilson disease', 'Alpha-1 antitrypsin deficiency'],
    riskFactors: ['Alcohol excess (> 14 units/week women, > 21 units/week men)', 'IV drug use', 'Obesity and metabolic syndrome', 'Tattoos/piercings (unsterile)', 'Family history of liver disease', 'Co-infection HIV/HCV'],
    subjectiveData: ['Fatigue and weakness', 'Abdominal distension', 'Pruritus', 'Right upper quadrant discomfort', 'Confusion (encephalopathy)', 'Easy bruising', 'Loss of libido'],
    objectiveData: ['Jaundice', 'Ascites', 'Spider naevi, palmar erythema', 'Caput medusae', 'Hepatosplenomegaly', 'Asterixis (flapping tremor)', 'Elevated INR, low albumin', 'Elevated ammonia'],
    nursingDiagnoses: [
      { id: 'nd-liv-1', diagnosis: 'Risk for Bleeding related to coagulopathy and portal hypertension', definingCharacteristics: ['Elevated INR', 'Platelet dysfunction', 'Oesophageal varices'] },
      { id: 'nd-liv-2', diagnosis: 'Impaired Hepatic Function related to hepatocellular damage as evidenced by jaundice and elevated liver enzymes', definingCharacteristics: ['Jaundice', 'Elevated transaminases', 'Coagulopathy'] },
      { id: 'nd-liv-3', diagnosis: 'Risk for Infection related to impaired immune function in chronic liver disease', definingCharacteristics: ['Spontaneous bacterial peritonitis risk', 'Impaired complement synthesis'] },
    ],
    goals: [
      { id: 'g-liv-1', shortTerm: 'No active bleeding. Nutritional intake optimised. Fluid balance maintained. Encephalopathy managed if present.', longTerm: 'Complications prevented. Nutritional status improved. Transplant assessment completed if indicated. Quality of life maintained.' },
    ],
    interventions: [
      { id: 'i-liv-1', category: 'dependent', action: 'Administer lactulose 15-30 mL TDS to maintain 2-3 soft stools/day for encephalopathy. Give rifaximin 550 mg BD if refractory. Administer beta-blockers (carvedilol, propranolol) for primary variceal prophylaxis (HVPG > 10 mmHg). Band ligation for secondary prophylaxis.', rationale: 'Lactulose reduces ammonia absorption. Non-selective beta-blockers reduce portal pressure and variceal bleeding risk by 50%.', frequency: 'Lactulose titrated to bowel habit; beta-blockers BD; endoscopy every 1-2 years for variceal screening' },
      { id: 'i-liv-2', category: 'independent', action: 'Nutritional support: high-calorie (35-40 kcal/kg/day), high-protein (1.2-1.5 g/kg/day) diet. Small frequent meals with late evening snack. Avoid protein restriction unless severe encephalopathy. Monitor nutritional status (BMI, albumin, handgrip).', rationale: 'Malnutrition affects 80% of cirrhotic patients. Adequate protein prevents sarcopenia and improves outcomes.', frequency: 'Daily dietary assessment; monthly nutritional review; dietitian referral' },
      { id: 'i-liv-3', category: 'independent', action: 'Ascites management: daily weight, abdominal girth, strict fluid balance. Administer spironolactone 100 mg + furosemide 40 mg (4:1 ratio). Monitor electrolytes (K+, Na+). Paracentesis with albumin replacement if tense ascites.', rationale: 'Diuretic ratio prevents hypokalaemia. Albumin replacement (6-8 g/L removed) prevents post-paracentesis circulatory dysfunction.', frequency: 'Daily weights; weekly electrolytes; paracentesis as needed' },
      { id: 'i-liv-4', category: 'independent', action: 'Infection prevention: SBP prophylaxis with norfloxacin 400 mg/day or co-amoxiclav if ascitic fluid protein < 1.5 g/dL. Pneumococcal and hepatitis A/B vaccination. Monitor for signs of infection (fever, abdominal pain, rising WCC).', rationale: 'SBP carries 20-40% mortality. Prophylaxis reduces SBP incidence by 60%. Vaccination prevents superinfection.', frequency: 'SBP prophylaxis ongoing; vaccinations as per schedule' },
    ],
    evaluation: [
      { id: 'e-liv-1', expected: 'No variceal bleeding. Encephalopathy resolved or stable. Nutritional intake adequate. No SBP episode. Fluid balance maintained.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Liver Disease Self-Management', keyPoints: ['Complete alcohol cessation — no safe level with liver disease.', 'Take lactulose regularly; aim for 2-3 bowel movements per day.', 'Eat a high-protein, high-calorie diet with small frequent meals.', 'Have a late evening snack to prevent overnight muscle breakdown.', 'Avoid sedatives, opioids, and benzodiazepines (worsen encephalopathy).', 'Weigh yourself daily; report weight gain > 2 kg in a week.', 'Avoid raw shellfish and undercooked food (infection risk).'], method: 'Verbal, written self-management plan, family education session' },
    ],
    dischargePlanning: { checklist: ['Lactulose and rifaximin prescriptions', 'Diuretic prescriptions with monitoring plan', 'Alcohol cessation support', 'Vaccination status reviewed', 'Nutritional assessment and dietitian referral', 'SBP prophylaxis initiated if indicated', 'Transplant referral discussed'], followUp: 'Hepatology clinic in 2 weeks. Liver function tests weekly. Endoscopy for variceal screening. MELD score assessment every 3 months.', referrals: ['Hepatology', 'Dietitian', 'Addiction services', 'Transplant team', 'Psychology'], warningSigns: ['Vomiting blood or black stools', 'Increasing confusion or drowsiness', 'Abdominal swelling or rapid weight gain', 'Fever with abdominal pain', 'Severe jaundice worsening'] },
    complications: ['Variceal haemorrhage (30% mortality)', 'Spontaneous bacterial peritonitis', 'Hepatorenal syndrome', 'Hepatocellular carcinoma', 'Hepatic encephalopathy', 'Portopulmonary hypertension', 'Malnutrition and sarcopenia'],
  },

  'Pancreatitis': {
    id: 'cp-panc', disease: 'Pancreatitis', specialty: 'Gastrointestinal Care',
    overview: 'Pancreatitis is acute or chronic inflammation of the pancreas. Acute pancreatitis ranges from mild oedematous to severe necrotising with multi-organ failure. Chronic pancreatitis leads to progressive exocrine/endocrine insufficiency. Nursing care focuses on pain management, nutritional support, and complication monitoring.',
    pathophysiology: 'Premature intracellular activation of trypsinogen to trypsin triggers autodigestion of pancreatic parenchyma. Acute: gallstones and alcohol cause 80% of cases. Chronic: persistent inflammation leads to fibrosis, calcification, and irreversible exocrine/endocrine insufficiency.',
    commonCauses: ['Gallstones (40%)', 'Alcohol excess (30%)', 'Hypertriglyceridaemia', 'Medications (azathioprine, valproate, thiazides)', 'ERCP-related', 'Autoimmune pancreatitis', 'Genetic (PRSS1, SPINK1)'],
    riskFactors: ['Alcohol excess', 'Gallstones', 'Hypercalcaemia', 'Hypertriglyceridaemia', 'Smoking', 'Family history of pancreatitis', 'Obesity'],
    subjectiveData: ['Severe epigastric pain radiating to back', 'Nausea and vomiting', 'Anorexia', 'Abdominal distension', 'Steatorrhoea (chronic)', 'Weight loss', 'New-onset diabetes (chronic)'],
    objectiveData: ['Epigastric tenderness', 'Guarding (severe cases)', 'Elevated lipase > 3x normal (diagnostic)', 'Elevated amylase', 'CT: pancreatic oedema, necrosis, collections', 'Ranson score ≥ 3 or APACHE II ≥ 8 (severe)'],
    nursingDiagnoses: [
      { id: 'nd-panc-1', diagnosis: 'Acute Pain related to pancreatic inflammation and enzymatic autodigestion as evidenced by severe epigastric pain radiating to back', definingCharacteristics: ['Severe epigastric pain', 'Pain radiating to back', 'Worse after eating'] },
      { id: 'nd-panc-2', diagnosis: 'Risk for Infection related to pancreatic necrosis and devitalised tissue', definingCharacteristics: ['Pancreatic necrosis on CT', 'Immune suppression', 'Invasive procedures'] },
      { id: 'nd-panc-3', diagnosis: 'Imbalanced Nutrition: Less Than Body Requirements related to fasting, malabsorption, and increased metabolic demands', definingCharacteristics: ['Weight loss', 'Steatorrhoea', 'Low albumin'] },
    ],
    goals: [
      { id: 'g-panc-1', shortTerm: 'Pain controlled (VAS < 4). Nutritional support initiated. No infection. Fluid balance restored.', longTerm: 'Pancreatitis resolved (acute) or stable (chronic). Pain-free on oral analgesia. Nutritional status normalised. Exocrine/endocrine function optimised.' },
    ],
    interventions: [
      { id: 'i-panc-1', category: 'dependent', action: 'Pain management: IV paracetamol and NSAIDs first-line. For severe pain, PCA with morphine or patient-controlled fentanyl. Avoid meperidine (neurotoxic metabolite). Add gabapentin/pregabalin for neuropathic component. Pain team referral for refractory pain.', rationale: 'WHO analgesic ladder with modifications for pancreatitis. Opioids are not contraindicated but titrate carefully.', frequency: 'Regular analgesia with breakthrough; VAS every 2-4 hours; pain team review if VAS > 6' },
      { id: 'i-panc-2', category: 'independent', action: 'Nutritional support: early oral feeding within 24-48 hours with low-fat solid diet (not liquid-only). For severe pancreatitis: trophic enteral feeding via nasojejunal tube within 24 hours. Monitor for feeding intolerance (vomiting, abdominal distension). Pancreatic enzyme replacement (PERT) for chronic pancreatitis.', rationale: 'Early enteral feeding maintains gut integrity and reduces infection. Jejunostomy feeding bypasses pancreatic stimulation.', frequency: 'Daily nutritional assessment; lipase/weight monitoring; PERT with every meal for chronic' },
      { id: 'i-panc-3', category: 'independent', action: 'Monitor for complications: infected necrosis (FNA if clinical deterioration), organ failure (SOFA score), pseudocyst (persistent collections > 4 weeks), splenic vein thrombosis. Serial CRP and procalcitonin. CT at 72-96 hours if no improvement.', rationale: 'Infected necrosis requires intervention (drainage/necrosectomy). Delayed intervention (> 72 hours) improves outcomes.', frequency: 'Daily organ function monitoring; CT at 72-96 h if severe; CRP every 48 h' },
      { id: 'i-panc-4', category: 'independent', action: 'Alcohol and smoking cessation: brief intervention, referral to addiction services. Alcohol abstinence is critical in alcoholic pancreatitis. Smoking cessation reduces progression of chronic pancreatitis.', rationale: 'Continued alcohol use causes recurrent acute pancreatitis and accelerates chronic disease. Smoking doubles pancreatic fibrosis progression.', frequency: 'At admission and every follow-up; Fagerström assessment; referral to cessation services' },
    ],
    evaluation: [
      { id: 'e-panc-1', expected: 'Pain controlled with oral analgesia. Tolerating oral diet. No infection or organ failure. Nutritional markers improving.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Pancreatitis Self-Management', keyPoints: ['Take pancreatic enzyme capsules (Creon) with every meal and snack.', 'Eat small, frequent, low-fat meals (avoid fried and fatty foods).', 'Complete alcohol cessation — any amount can trigger recurrence.', 'Stop smoking — it accelerates pancreatic damage.', 'Take pain medications as prescribed; use non-drug methods (heat, relaxation).', 'Report severe abdominal pain, fever, or vomiting immediately.', 'Monitor blood sugar if diabetes has developed.'], method: 'Verbal, Creon titration guide, written dietary plan, alcohol cessation resources' },
    ],
    dischargePlanning: { checklist: ['Pain medication prescription', 'Pancreatic enzyme replacement (Creon) if needed', 'Low-fat diet plan', 'Alcohol cessation referral', 'Smoking cessation referral', 'Diabetes management plan if applicable', 'Follow-up bloods (FBC, CRP, glucose, lipase)'], followUp: 'Gastroenterology in 2-4 weeks. Repeat CT if collections present. Endocrine review for new-onset diabetes. Annual screening for chronic pancreatitis.', referrals: ['Gastroenterology', 'Pain management', 'Dietitian', 'Addiction services', 'Endocrinology', 'Surgery if complications'], warningSigns: ['Severe abdominal pain returning', 'Fever > 38.5°C', 'Vomiting unable to keep fluids down', 'Weight loss > 5 kg', 'Steatorrhoea (fatty, foul-smelling stools)'] },
    complications: ['Pancreatic necrosis and infection', 'Organ failure (renal, respiratory, cardiovascular)', 'Pseudocyst formation', 'Pancreatic abscess', 'Splenic vein thrombosis', 'Pancreatic duct strictures', 'Diabetes mellitus (type 3c)', 'Malnutrition'],
  },

  'Nephrotic Syndrome': {
    id: 'cp-nephrotic', disease: 'Nephrotic Syndrome', specialty: 'Renal Care',
    overview: 'Nephrotic syndrome is a kidney disorder characterised by heavy proteinuria (> 3.5 g/day), hypoalbuminaemia, generalised oedema, and hyperlipidaemia. Nursing care focuses on oedema management, infection prevention, nutritional support, and medication management.',
    pathophysiology: 'Damage to glomerular podocytes increases permeability to albumin, causing heavy proteinuria. Low serum albumin reduces oncotic pressure, causing oedema. The liver compensates by increasing lipoprotein synthesis, causing hyperlipidaemia.',
    commonCauses: ['Minimal change disease (children)', 'Focal segmental glomerulosclerosis', 'Membranous nephropathy (adults)', 'Diabetic nephropathy', 'Lupus nephritis', 'Amyloidosis'],
    riskFactors: ['Diabetes mellitus', 'Systemic lupus erythematosus', 'Infections (HBV, HCV, HIV)', 'NSAID use', 'Malignancy', 'Family history of kidney disease'],
    subjectiveData: ['Swelling (periorbital, pedal, ascites)', 'Foamy urine', 'Fatigue', 'Anorexia', 'Abdominal distension', 'Shortness of breath (pleural effusion)'],
    objectiveData: ['Proteinuria > 3.5 g/24 h', 'Serum albumin < 30 g/L', 'Hyperlipidaemia', 'Oedema (pitting, periorbital, pedal, sacral)', 'Ascites', 'Pleural effusion', 'Increased BMI from fluid retention'],
    nursingDiagnoses: [
      { id: 'nd-neph-1', diagnosis: 'Excess Fluid Volume related to decreased plasma oncotic pressure as evidenced by generalised oedema and weight gain', definingCharacteristics: ['Pitting oedema', 'Weight gain > 2 kg/week', 'Ascites', 'Pleural effusion'] },
      { id: 'nd-neph-2', diagnosis: 'Risk for Infection related to immunoglobulin loss and complement factor urinary loss', definingCharacteristics: ['Hypoimmunoglobulinaemia', 'Oedema as culture medium', 'Immunosuppressive therapy'] },
      { id: 'nd-neph-3', diagnosis: 'Risk for Impaired Skin Integrity related to severe oedema and skin fragility', definingCharacteristics: ['Tense oedema', 'Skin breakdown', 'Weeping oedema'] },
    ],
    goals: [
      { id: 'g-neph-1', shortTerm: 'Oedema reduced. Fluid balance maintained. Infection prevented. Skin integrity preserved.', longTerm: 'Proteinuria reduced. Albumin normalised. Nutritional status optimised. Medication regimen stable.' },
    ],
    interventions: [
      { id: 'i-neph-1', category: 'dependent', action: 'Administer diuretics: furosemide 40-80 mg BD-TD (high doses may be needed due to diuretic resistance in hypoalbuminaemia). Add metolazone 2.5-5 mg for synergistic effect if refractory. Monitor daily weight, fluid balance, electrolytes (K+, Na+, Mg2+). Consider albumin infusion with furosemide for severe hypoalbuminaemia.', rationale: 'Loop diuretics inhibit Na/K/2Cl cotransporter in ascending limb. Adding thiazide blocks compensatory distal reabsorption.', frequency: 'Diuretics BD-TD; daily weight; fluid balance chart; electrolytes every 2-3 days' },
      { id: 'i-neph-2', category: 'dependent', action: 'Administer ACE inhibitors/ARBs (ramipril 5-10 mg, losartan 50-100 mg) for proteinuria reduction. Monitor serum creatinine and potassium 1-2 weeks after initiation. Administer statins (atorvastatin 20-40 mg) for hyperlipidaemia. Consider immunosuppression (corticosteroids, calcineurin inhibitors) for specific histological subtypes.', rationale: 'ACE inhibitors reduce intraglomerular pressure and proteinuria by 30-50%. Statins address cardiovascular risk from dyslipidaemia.', frequency: 'ACE-I/ARB daily; creatinine/K+ at 1-2 weeks then every 3 months; statins at night' },
      { id: 'i-neph-3', category: 'independent', action: 'Skin care: keep skin clean and dry, moisturise oedematous areas, elevate oedematous limbs, use pressure-relieving mattresses, avoid skin trauma. Monitor for cellulitis (redness, warmth, tenderness over oedematous areas). Pneumococcal and influenza vaccination.', rationale: 'Oedematous skin is prone to breakdown and infection. Pneumococcal infection is a leading cause of mortality in nephrotic syndrome.', frequency: 'Skin assessment every shift; daily limb elevation; vaccinations as scheduled' },
      { id: 'i-neph-4', category: 'independent', action: 'Nutritional management: moderate protein (0.8-1 g/kg/day for non-nephrotic, 1 g/kg/day if nephrotic), low salt (< 2 g/day), fluid restriction if hyponatraemic. Monitor serum albumin, pre-albumin, and nutritional status.', rationale: 'High protein intake worsens proteinuria; very low protein risks malnutrition. Salt restriction enhances diuretic efficacy.', frequency: 'Daily dietary assessment; monthly biochemistry; dietitian referral' },
    ],
    evaluation: [
      { id: 'e-neph-1', expected: 'Oedema reduced or resolved. Weight stable. No infection episodes. Skin intact. Proteinuria reduced.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Nephrotic Syndrome Self-Management', keyPoints: ['Weigh yourself daily at the same time — report gain > 2 kg in a week.', 'Follow a low-salt diet: avoid processed foods, canned soups, and adding salt.', 'Take diuretics in the morning to avoid nocturia.', 'Elevate swollen legs when sitting or lying down.', 'Report signs of infection: fever, red/warm skin, sore throat.', 'Wear compression stockings as recommended.', 'Avoid NSAIDs — they worsen kidney function.'], method: 'Verbal, daily weight chart, written dietary guide, skin care instructions' },
    ],
    dischargePlanning: { checklist: ['Diuretic and ACE-I/ARB prescriptions', 'Low-salt diet plan', 'Daily weight monitoring instructions', 'Infection warning signs reviewed', 'Vaccination schedule confirmed', 'Skin care plan', 'Follow-up blood tests scheduled'], followUp: 'Nephrology in 2-4 weeks. 24-hour urine protein every 1-3 months. Serum albumin and renal function every month.', referrals: ['Nephrology', 'Dietitian', 'Dermatology for skin complications', 'Immunology if autoimmune cause'], warningSigns: ['Sudden weight gain > 2 kg/week', 'Fever or signs of infection', 'Red, hot, swollen skin (cellulitis)', 'Severe breathlessness (pleural effusion)', 'Foamy urine worsening'] },
    complications: ['Pulmonary embolism (hypercoagulable state)', 'Infection/sepsis (immunoglobulin loss)', 'Acute kidney injury', 'Thrombosis (renal vein DVT)', 'Malnutrition', 'Cardiovascular disease (hyperlipidaemia)', 'Growth retardation (children)'],
  },

  'Dialysis Care': {
    id: 'cp-dial', disease: 'Dialysis Care', specialty: 'Renal Care',
    overview: 'Dialysis (haemodialysis and peritoneal dialysis) replaces lost kidney function in end-stage renal disease. Nursing care focuses on vascular/peritoneal access care, fluid and electrolyte management, complication prevention, and patient education for self-management.',
    pathophysiology: 'When GFR falls below 15 mL/min, uraemic toxins accumulate, fluid overload occurs, and metabolic acidosis develops. Haemodialysis filters blood through an extracorporeal circuit; peritoneal dialysis uses the peritoneal membrane as a filter.',
    commonCauses: ['Diabetic nephropathy', 'Hypertensive nephrosclerosis', 'Glomerulonephritis', 'Polycystic kidney disease', 'Chronic pyelonephritis'],
    riskFactors: ['Diabetes', 'Hypertension', 'Obesity', 'Smoking', 'Family history of kidney disease', 'Prolonged NSAID use', 'Black/African descent'],
    subjectiveData: ['Fatigue and lethargy', 'Nausea and anorexia', 'Pruritus', 'Restless legs', 'Dyspnoea (fluid overload)', 'Difficulty concentrating', 'Muscle cramps during dialysis'],
    objectiveData: ['Uraemic frost (severe)', 'Asterixis', 'Elevated urea and creatinine', 'Hyperkalaemia', 'Metabolic acidosis', 'Fluid overload (raised JVP, pulmonary crackles, oedema)', 'AV fistula/graft or peritoneal catheter in situ'],
    nursingDiagnoses: [
      { id: 'nd-dial-1', diagnosis: 'Excess Fluid Volume related to impaired renal excretion as evidenced by oedema, pulmonary crackles, and weight gain between dialysis sessions', definingCharacteristics: ['Interdialytic weight gain > 4% of dry weight', 'Peripheral oedema', 'Dyspnoea'] },
      { id: 'nd-dial-2', diagnosis: 'Risk for Infection related to vascular access or peritoneal catheter', definingCharacteristics: ['Open wound at catheter site', 'Immunosuppression', 'Frequent invasive procedures'] },
      { id: 'nd-dial-3', diagnosis: 'Deficient Knowledge related to dialysis self-care, fluid restriction, dietary management, and access care', definingCharacteristics: ['Unable to describe fluid limits', 'Inadequate access care'] },
    ],
    goals: [
      { id: 'g-dial-1', shortTerm: 'Dialysis session completed without complication. Fluid balance restored. Access site clean and functioning. Electrolytes normalised.', longTerm: 'Adequate dialysis achieved (Kt/V > 1.4). Dry weight maintained. Access preserved. Patient demonstrates self-care.' },
    ],
    interventions: [
      { id: 'i-dial-1', category: 'dependent', action: 'Haemodialysis care: check pre-dialysis weight, BP, and access site. Administer heparin bolus as per protocol. Monitor for intradialytic complications: hypotension, cramps, arrhythmias, air embolism. Calculate ultrafiltration goal. Post-dialysis: apply pressure to needle sites for 10-15 minutes. Check fistula thrill/bruit.', rationale: 'Systematic pre/during/post assessment prevents complications. Hypotension is the most common intradialytic complication (20-30%).', frequency: '3 sessions/week (4 h each); pre/during/post monitoring per protocol' },
      { id: 'i-dial-2', category: 'independent', action: 'Peritoneal dialysis care: strict aseptic technique for exchanges. Monitor drain volumes, colour (clear vs cloudy = possible peritonitis), and ultrafiltration. Exit site care with saline/antiseptic. Assess for catheter migration, leaks, and hernia. Peritonitis protocol: cloudy effluent → send for cell count, start empiric IP antibiotics.', rationale: 'Peritonitis is the most common PD complication (1 episode every 18-24 months). Aseptic technique reduces infection rates by 50%.', frequency: '4-5 exchanges/day (CAPD); exit site care daily; peritoneal equilibration test every 6 months' },
      { id: 'i-dial-3', category: 'independent', action: 'Vascular access preservation: no BP measurements, venepuncture, or IV cannulation on fistula arm. Assess fistula: thrill (palpable), bruit (audible), arm circumference. Educate on fistula care: avoid sleeping on arm, no tight clothing, exercise to strengthen fistula arm.', rationale: 'AV fistula is the preferred access with lowest complication rates. Preserving fistula patency avoids central venous catheter complications.', frequency: 'Every dialysis session; patient education at every visit' },
      { id: 'i-dial-4', category: 'independent', action: 'Dialysis diet management: fluid restriction (interdialytic weight gain < 4% dry weight), potassium restriction (< 1 g/day if hyperkalaemic), phosphate restriction (avoid processed foods, take phosphate binders with meals), adequate protein (1.2 g/kg/day on HD, 1.0-1.2 g/kg/day on PD).', rationale: 'Dietary non-adherence is the primary cause of interdialytic complications. Phosphate control prevents renal bone disease.', frequency: 'Daily dietary assessment; monthly dietitian review; serum phosphate every month' },
    ],
    evaluation: [
      { id: 'e-dial-1', expected: 'Dialysis adequate (Kt/V > 1.4). Interdialytic weight gain < 4%. No access complications. Electrolytes within range. Patient demonstrates self-care.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Dialysis Self-Care', keyPoints: ['Weigh yourself daily — know your dry weight.', 'Fluid restriction: measure all fluids, use small cups, suck ice chips, rinse mouth without swallowing.', 'Take phosphate binders with meals — they prevent high phosphate.', 'Protect your fistula: no BP, needles, or tight clothing on that arm.', 'Check your fistula daily: feel the thrill, listen for the bruit.', 'Report signs of infection: redness, swelling, pus, fever.', 'Eat adequate protein: meat, fish, eggs, dairy.'], method: 'Verbal, fluid restriction chart, written dietary guide, access care demonstration' },
    ],
    dischargePlanning: { checklist: ['Dialysis schedule confirmed', 'Fluid restriction and diet education completed', 'Phosphate binders prescribed', 'Access care instructions provided', 'Warning signs of complications reviewed', 'Support group information'], followUp: 'Haemodialysis unit 3x/week. PD clinic monthly. Nephrology review every 3 months. Renal dietitian every 3 months.', referrals: ['Nephrology', 'Renal dietitian', 'Access surgeon if fistula problems', 'Social worker for disability support', 'Transplant assessment team'], warningSigns: ['No thrill/bruit in fistula', 'Swollen arm (fistula stealing)', 'Cloudy peritoneal dialysate', 'Fever > 38°C', 'Severe fluid overload (breathlessness, orthopnoea)', 'Severe muscle cramps during dialysis'] },
    complications: ['Vascular access failure/thrombosis', 'Peritonitis (PD)', 'Hypotension during dialysis', 'Hyperkalaemia and cardiac arrhythmias', 'Renal bone disease', 'Amyloidosis (long-term HD)', 'Depression and reduced quality of life'],
  },

  'Electrolyte Disorders': {
    id: 'cp-electro', disease: 'Electrolyte Disorders', specialty: 'Renal Care',
    overview: 'Electrolyte disorders (sodium, potassium, calcium, magnesium, phosphate abnormalities) are common in hospitalised patients and can cause life-threatening cardiac and neurological complications. Nursing care focuses on early detection, safe correction, and monitoring.',
    pathophysiology: 'Imbalances result from altered intake, excessive losses (renal, GI, skin), or redistribution between body compartments. Rapid correction of chronic imbalances can cause osmotic demyelination (hyponatraemia) or rebound effects.',
    commonCauses: ['Renal failure', 'Diuretic use', 'GI losses (vomiting, diarrhoea)', 'Endocrine disorders (SIADH, diabetes insipidus, hyperaldosteronism)', 'Poor nutritional intake', 'Iatrogenic fluid management'],
    riskFactors: ['Elderly patients', 'Renal impairment', 'Diuretic therapy', 'Critical illness', 'NPO status', 'GI losses', 'Medications affecting electrolytes'],
    subjectiveData: ['Muscle weakness or cramps', 'Palpitations', 'Nausea and vomiting', 'Confusion or drowsiness', 'Paraesthesia', 'Tetany', 'Polyuria or oliguria'],
    objectiveData: ['Cardiac arrhythmias (ECG changes)', 'Muscle weakness/flaccidity', 'Hypertension or hypotension', 'Altered consciousness', 'Trousseau/Chvostek signs (hypocalcaemia)', 'U waves (hypokalaemia), peaked T waves (hyperkalaemia)'],
    nursingDiagnoses: [
      { id: 'nd-electro-1', diagnosis: 'Risk for Decreased Cardiac Output related to electrolyte-induced cardiac arrhythmias', definingCharacteristics: ['Hypokalaemia or hyperkalaemia', 'Hypocalcaemia', 'ECG changes'] },
      { id: 'nd-electro-2', diagnosis: 'Risk for Injury related to muscle weakness, tetany, or altered consciousness from electrolyte imbalances', definingCharacteristics: ['Muscle weakness', 'Paraesthesia', 'Confusion'] },
      { id: 'nd-electro-3', diagnosis: 'Deficient Knowledge related to dietary management and medication effects on electrolytes', definingCharacteristics: ['Unable to describe dietary modifications', 'Unaware of medication-electrolyte interactions'] },
    ],
    goals: [
      { id: 'g-electro-1', shortTerm: 'Life-threatening electrolyte abnormalities corrected. Cardiac rhythm stable. Symptoms resolved.', longTerm: 'Electrolytes maintained within normal range. Root cause identified and treated. Patient demonstrates dietary awareness.' },
    ],
    interventions: [
      { id: 'i-electro-1', category: 'dependent', action: 'Hypokalaemia (K+ < 3.5): oral KCl supplementation (40-80 mmol/day in divided doses with food). For severe (< 2.5) or symptomatic: IV KCl infusion via central line (max 10 mmol/h, cardiac monitor). Check magnesium (hypomagnesaemia causes refractory hypokalaemia). Hyperkalaemia (K+ > 5.5): calcium gluconate 10% (cardioprotection), insulin/dextrose, salbutamol nebuliser, calcium resonium. Urgent dialysis if refractory.', rationale: 'Potassium is the most dangerous electrolyte to correct. IV correction requires cardiac monitoring to prevent rebound hyperkalaemia.', frequency: 'K+ check every 2-6 hours during correction; continuous cardiac monitoring for severe cases' },
      { id: 'i-electro-2', category: 'dependent', action: 'Hyponatraemia (Na+ < 135): assess volume status. Hypovolaemic: normal saline. Euvolaemic (SIADH): fluid restrict 500-1000 mL/day. Hypervolaemic: fluid restrict + diuretics. Correct slowly: max 8-10 mmol/L per 24 hours to prevent osmotic demyelination. Hypernatraemia (Na+ > 145): slow correction with D5W or hypotonic saline. Max 10-12 mmol/L per 24 hours.', rationale: 'Rapid sodium correction causes osmotic demyelination syndrome (central pontine myelinolysis) with permanent neurological damage.', frequency: 'Na+ every 4-6 hours during correction; strict fluid balance; neurological observations' },
      { id: 'i-electro-3', category: 'dependent', action: 'Hypocalcaemia (Ca2+ < 2.1): IV calcium gluconate 10% 10-20 mL over 10 min with cardiac monitoring. Oral calcium and vitamin D supplementation. Check magnesium. Hypercalcaemia (Ca2+ > 2.6): IV normal saline, calcitonin, bisphosphonates (zoledronic acid). Monitor for shortened QT interval.', rationale: 'Calcium is critical for cardiac contractility and neuromuscular function. Hypocalcaemia can cause fatal arrhythmias.', frequency: 'Ca2+ every 6-12 hours during correction; ECG monitoring; IV access secured' },
      { id: 'i-electro-4', category: 'independent', action: 'Dietary education: high-K+ foods to avoid (bananas, oranges, tomatoes, potatoes, chocolate) for hyperkalaemia; low-K+ diet for hypokalaemia. Calcium-rich foods (dairy, fortified alternatives). Monitor drug interactions: ACE inhibitors, ARBs, K+-sparing diuretics raise K+; loop diuretics lower K+.', rationale: 'Dietary management prevents recurrence. Drug interactions are a common cause of electrolyte disturbances.', frequency: 'At diagnosis and at every follow-up; dietitian referral for complex cases' },
    ],
    evaluation: [
      { id: 'e-electro-1', expected: 'Electrolytes normalised. No cardiac arrhythmia. Symptoms resolved. Patient demonstrates dietary awareness.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Electrolyte Management', keyPoints: ['Know which electrolyte is affected and its dietary implications.', 'Take supplements exactly as prescribed — do not skip doses.', 'Report muscle cramps, weakness, palpitations, or tingling immediately.', 'Stay hydrated but follow fluid restrictions if prescribed.', 'Avoid salt substitutes (contain potassium chloride) if on potassium-restricted diet.', 'Have regular blood tests to monitor electrolytes.'], method: 'Verbal, dietary leaflet, written medication guide, blood test schedule' },
    ],
    dischargePlanning: { checklist: ['Electrolyte supplements prescribed', 'Dietary modification plan provided', 'Blood test monitoring schedule', 'Medication-electrolyte interactions reviewed', 'Root cause treatment plan'], followUp: 'Electrolyte blood tests in 1 week, then every 1-3 months as needed. Review medication-related causes.', referrals: ['Nephrology if renal cause', 'Dietitian for dietary modification', 'Endocrinology if hormonal cause'], warningSigns: ['Muscle weakness or paralysis', 'Heart palpitations or irregular pulse', 'Confusion or drowsiness', 'Tingling around mouth or in fingers', 'Tetany or seizures'] },
    complications: ['Fatal cardiac arrhythmias', 'Osmotic demyelination syndrome', 'Rhabdomyolysis', 'Seizures', 'Respiratory failure', 'Acute kidney injury'],
  },

  'Epilepsy': {
    id: 'cp-epilep', disease: 'Epilepsy', specialty: 'Neurological Care',
    overview: 'Epilepsy is a chronic neurological disorder characterised by recurrent unprovoked seizures due to abnormal excessive neuronal synchrony. Nursing care focuses on seizure management, AED adherence, safety, and psychosocial support.',
    pathophysiology: 'Imbalance between excitatory (glutamate) and inhibitory (GABA) neurotransmission leads to abnormal hypersynchronous neuronal firing. Seizures may be focal (partial) or generalised, depending on the area of cortex involved.',
    commonCauses: ['Genetic/idiopathic', 'Structural (tumour, stroke, traumatic brain injury)', 'Infections (meningitis, encephalitis)', 'Metabolic', 'Immune-mediated', 'Perinatal injury'],
    riskFactors: ['Previous head trauma', 'Stroke', 'Brain tumour', 'CNS infections', 'Family history of epilepsy', 'Alcohol withdrawal', 'Sleep deprivation'],
    subjectiveData: ['Recurrent seizures (tonic-clonic, focal, absence)', 'Post-ictal confusion and drowsiness', 'Aura (déjà vu, visual disturbance, epigastric sensation)', 'Injury during seizures', 'Tongue biting', 'Urinary incontinence during seizure'],
    objectiveData: ['Witnessed seizure activity', 'Post-ictal Todd paralysis', 'Abnormal EEG (spike-and-wave, focal slowing)', 'Brain MRI abnormalities', 'AED drug levels', 'Injuries from falls (tongue lacerations, shoulder dislocations)'],
    nursingDiagnoses: [
      { id: 'nd-epi-1', diagnosis: 'Risk for Injury related to recurrent seizures with loss of consciousness', definingCharacteristics: ['History of seizures', 'Loss of consciousness', 'Falls during seizures'] },
      { id: 'nd-epi-2', diagnosis: 'Deficient Knowledge related to AED adherence, seizure triggers, and safety precautions', definingCharacteristics: ['Missed medication doses', 'Unaware of seizure triggers', 'No seizure action plan'] },
      { id: 'nd-epi-3', diagnosis: 'Impaired Social Interaction related to stigma, driving restrictions, and seizure unpredictability', definingCharacteristics: ['Social withdrawal', 'Employment difficulties', 'Depression'] },
    ],
    goals: [
      { id: 'g-epi-1', shortTerm: 'Seizure controlled or status epilepticus managed. AED levels therapeutic. Safety measures in place. Patient/family educated on seizure first aid.', longTerm: 'Seizure-free for ≥ 12 months (driving licence consideration). AED adherence maintained. Quality of life optimised. Social participation improved.' },
    ],
    interventions: [
      { id: 'i-epi-1', category: 'dependent', action: 'Acute seizure management: protect from injury (lower to ground, pad head), do NOT restrain or insert objects in mouth, time the seizure. If tonic-clonic > 5 minutes (status epilepticus): IV lorazepam 0.1 mg/kg, followed by IV levetiracetam or phenytoin. Monitor airway, breathing, and oxygen saturation.', rationale: 'Status epilepticus (> 5 minutes) is a medical emergency with rising mortality. First-line benzodiazepines terminate 60-80% of seizures.', frequency: 'As needed for seizures; continuous monitoring during status epilepticus' },
      { id: 'i-epi-2', category: 'dependent', action: 'AED management: ensure adherence, monitor drug levels (phenytoin 10-20 mcg/mL, carbamazepine 4-12 mcg/mL, valproate 50-100 mcg/mL), watch for side effects (sedation, rash, hepatotoxicity, blood dyscrasias). Monitor for interactions (enzyme inducers/inhibitors). Lamotrigine: titrate slowly to prevent SJS.', rationale: 'AED non-adherence is the most common cause of breakthrough seizures. Therapeutic drug monitoring ensures efficacy and prevents toxicity.', frequency: 'AED levels every 3-6 months; FBC and LFTs every 6-12 months; seizure diary daily' },
      { id: 'i-epi-3', category: 'independent', action: 'Safety education: avoid swimming alone, no driving until seizure-free (6-12 months depending on jurisdiction), shower instead of bath, avoid heights and heavy machinery without clearance, medical alert bracelet. Seizure action plan for family/caregivers.', rationale: 'Driving restrictions and safety precautions prevent seizure-related injuries and deaths. A seizure action plan empowers caregivers.', frequency: 'At diagnosis and every review; driving advice per local regulations' },
      { id: 'i-epi-4', category: 'independent', action: 'Trigger identification and avoidance: sleep hygiene (7-8 hours), stress management, avoid alcohol excess, avoid flashing lights if photosensitive, manage febrile illness promptly. Screen for depression and anxiety (PHQ-9, GAD-7). Refer to epilepsy nurse specialist.', rationale: 'Identifiable triggers contribute to 30-50% of breakthrough seizures. Depression affects 30-50% of epilepsy patients and worsens outcomes.', frequency: 'At every clinic visit; seizure diary review; psychosocial screening annually' },
    ],
    evaluation: [
      { id: 'e-epi-1', expected: 'Seizure-free or seizure frequency reduced. AED levels therapeutic. No seizure-related injuries. Patient/family demonstrate seizure management.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Epilepsy Self-Management', keyPoints: ['Take AEDs at the same time every day — never skip doses.', 'Keep a seizure diary: date, time, type, duration, possible triggers.', 'Seizure first aid: lay person on side, time it, do not restrain, do not put anything in mouth.', 'Avoid driving until seizure-free as per local regulations.', 'Avoid swimming alone; shower instead of bath.', 'Wear a medical alert bracelet.', 'Avoid alcohol excess and sleep deprivation.', 'Report any new rash, dizziness, or unusual symptoms to your doctor.'], method: 'Verbal, seizure diary, written seizure action plan, medication reminder app' },
    ],
    dischargePlanning: { checklist: ['AED prescriptions with administration instructions', 'Seizure action plan for family/caregivers', 'Driving restrictions explained', 'Medical alert bracelet provided', 'Seizure diary initiated', 'Safety precautions reviewed'], followUp: 'Neurology clinic in 3-6 months. AED levels every 3-6 months. EEG as indicated. Annual review of driving status.', referrals: ['Neurology', 'Epilepsy nurse specialist', 'Psychology for anxiety/depression', 'Social services for employment support', 'Driving assessment if indicated'], warningSigns: ['Seizure lasting > 5 minutes', 'Seizure clusters (repeated seizures without recovery)', 'Injury during seizure', 'New or different type of seizure', 'Rash or fever (drug reaction)'] },
    complications: ['Status epilepticus (mortality 10-20%)', 'Sudden unexpected death in epilepsy (SUDEP)', 'Seizure-related injuries', 'Aspiration pneumonia', 'Depression and anxiety', 'Cognitive impairment', 'Social stigma and isolation'],
  },

  'Parkinson\'s Disease': {
    id: 'cp-park', disease: 'Parkinson\'s Disease', specialty: 'Neurological Care',
    overview: 'Parkinson\'s disease is a progressive neurodegenerative disorder caused by loss of dopaminergic neurons in the substantia nigra. Nursing care focuses on motor symptom management, fall prevention, medication optimisation, and maintenance of independence.',
    pathophysiology: 'Progressive loss of dopaminergic neurons in the substantia nigra pars compacta leads to striatal dopamine deficiency. Accumulation of alpha-synuclein (Lewy bodies) is the pathological hallmark. Non-dopaminergic systems (noradrenergic, cholinergic) are also affected.',
    commonCauses: ['Idiopathic (90%)', 'Genetic (LRRK2, SNCA, PARK2)', 'Toxin-induced (MPTP, rotenone)', 'Drug-induced (antipsychotics)', 'Post-encephalitic'],
    riskFactors: ['Age > 60 (prevalence 1-2%)', 'Male sex (1.5x risk)', 'Family history', 'Pesticide/herbicide exposure', 'Head trauma', 'Rural living'],
    subjectiveData: ['Resting tremor (pill-rolling)', 'Bradykinesia (slowness of movement)', 'Muscular rigidity', 'Postural instability', 'Shuffling gait', 'Micrographia', 'Fatigue', 'Depression'],
    objectiveData: ['Resting tremor (4-6 Hz)', 'Rigidity (cogwheel or lead-pipe)', 'Reduced arm swing', 'Shuffling gait with festination', 'Masked facies (hypomimia)', 'Seborrhoea', 'Sialorrhoea', 'MBS (MDS-UPDRS scoring)'],
    nursingDiagnoses: [
      { id: 'nd-park-1', diagnosis: 'Impaired Physical Mobility related to bradykinesia, rigidity, and postural instability as evidenced by shuffling gait and frequent falls', definingCharacteristics: ['Shuffling gait', 'Reduced arm swing', 'Postural instability', 'Falls history'] },
      { id: 'nd-park-2', diagnosis: 'Risk for Injury related to postural instability and falls', definingCharacteristics: ['Festination', 'Freezing of gait', 'Postural reflex impairment'] },
      { id: 'nd-park-3', diagnosis: 'Impaired Verbal Communication related to hypophonia and facial masking', definingCharacteristics: ['Quiet speech (hypophonia)', 'Monotone voice', 'Masked facies'] },
    ],
    goals: [
      { id: 'g-park-1', shortTerm: 'Medications optimised for motor symptom control. No falls during admission. Swallowing assessment completed. Mobility aids assessed.', longTerm: 'Functional independence maintained. Falls prevented. Medication regimen optimised. Quality of life maintained. Carer burden minimised.' },
    ],
    interventions: [
      { id: 'i-park-1', category: 'dependent', action: 'Administer dopaminergic medications: levodopa/carbidopa (Sinemet) 25/100 TDS-TID (titrate gradually). For motor fluctuations: add COMT inhibitor (entacapone), MAO-B inhibitor (rasagiline, selegiline), or dopamine agonist (pramipexole, ropinirole). Monitor for dyskinesias (peak-dose), wearing-off, and on-off fluctuations. Administer levodopa on empty stomach (protein interaction).', rationale: 'Levodopa remains the most effective PD medication. Timing with meals affects absorption. Motor fluctuations affect 50% of patients after 5 years.', frequency: 'TDS-TID as prescribed; review every 3-6 months; MDS-UPDRS scoring at each visit' },
      { id: 'i-park-2', category: 'independent', action: 'Fall prevention: physiotherapy referral for balance and gait training (cueing strategies, LSVT BIG), home hazard assessment, appropriate walking aid, non-slip footwear, exercise programme (tai chi, boxing, treadmill). Assess for freezing of gait and provide strategies (rhythmic cueing, turning techniques).', rationale: 'Falls affect 60-80% of PD patients. Exercise improves balance, gait speed, and reduces fall frequency by 25-50%.', frequency: 'Weekly physiotherapy; home assessment at discharge; exercise programme daily' },
      { id: 'i-park-3', category: 'independent', action: 'Nutritional and swallowing assessment: dietitian referral for high-fibre diet (constipation is common). Swallowing assessment for aspiration risk (thin liquids, pureed diet if needed). Monitor weight (dysphagia and depression cause weight loss). Sialorrhoea management (botulinum toxin to salivary glands if severe).', rationale: 'Dysphagia affects 80% of advanced PD patients and causes aspiration pneumonia (second most common cause of death). Constipation affects 70%.', frequency: 'Swallowing assessment at diagnosis and annually; dietitian every 3 months; weight monthly' },
      { id: 'i-park-4', category: 'independent', action: 'Non-motor symptom management: screen and treat depression (SSRI/SNRI preferred), psychosis (clozapine, pimavanserin — avoid typical antipsychotics), sleep disturbances (sleep hygiene, melatonin), constipation (macrogol, dietary fibre), orthostatic hypotension (compression stockings, fludrocortisone, midodrine).', rationale: 'Non-motor symptoms (depression, psychosis, sleep, autonomic dysfunction) contribute more to disability than motor symptoms in advanced disease.', frequency: 'Non-motor symptom screening at every visit (NMS questionnaire)' },
    ],
    evaluation: [
      { id: 'e-park-1', expected: 'Motor symptoms controlled with minimal dyskinesia. No falls. Adequate nutrition and hydration. Non-motor symptoms addressed. Patient demonstrates medication management.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Parkinson\'s Disease Self-Management', keyPoints: ['Take levodopa at the same times each day — do not take with high-protein meals.', 'Exercise daily: walking, stretching, tai chi, or LSVT BIG programme.', 'Use cueing strategies for freezing: rhythmic counting, marching, laser line.', 'Keep a symptom diary to track on/off periods and medication response.', 'Report hallucinations, confusion, or impulsive behaviours (medication side effects).', 'Maintain a high-fibre diet and adequate fluids for constipation.', 'Wear flat, supportive shoes. Remove trip hazards at home.'], method: 'Verbal, symptom diary, exercise programme handout, medication timing chart' },
    ],
    dischargePlanning: { checklist: ['Adequate medication supply', 'Exercise programme from physiotherapy', 'Home hazard assessment completed', 'Swallowing diet modifications if applicable', 'Carer education session', 'Parking permit if applicable', 'Support group information'], followUp: 'Neurology/PD specialist every 3-6 months. Physiotherapy weekly. Dietitian every 3 months. Annual MDS-UPDRS assessment.', referrals: ['Neurology/PD specialist', 'Physiotherapy', 'Occupational therapy', 'Speech and language therapy', 'Dietitian', 'Social services', 'PD support group'], warningSigns: ['Sudden worsening of symptoms', 'Falls increasing in frequency', 'Difficulty swallowing (choking, coughing after meals)', 'Hallucinations or confusion', 'Severe orthostatic dizziness'] },
    complications: ['Falls and fractures', 'Aspiration pneumonia', 'Pressure injuries (advanced disease)', 'Dementia (40-80% in late disease)', 'Depression and anxiety', 'Hallucinations and psychosis (medication-related)', 'Dyskinesias (long-term levodopa)'],
  },

  'Alzheimer\'s Disease': {
    id: 'cp-alz', disease: 'Alzheimer\'s Disease', specialty: 'Neurological Care',
    overview: 'Alzheimer\'s disease is a progressive neurodegenerative disorder and the most common cause of dementia, characterised by memory loss, cognitive decline, and behavioural changes. Nursing care focuses on safety, behaviour management, maintaining function, and supporting caregivers.',
    pathophysiology: 'Extracellular amyloid-beta plaques and intracellular neurofibrillary tangles (hyperphosphorylated tau protein) cause neuronal death, starting in the hippocampus (memory) and spreading to the cortex (language, reasoning, behaviour). Cholinergic neuron loss reduces acetylcholine.',
    commonCauses: ['Alzheimer disease (60-70% of dementia)', 'Vascular dementia', 'Lewy body dementia', 'Frontotemporal dementia', 'Mixed dementia', 'Reversible causes (B12 deficiency, thyroid, normal pressure hydrocephalus)'],
    riskFactors: ['Age > 65 (prevalence doubles every 5 years)', 'Family history', 'APOE e4 genotype', 'Down syndrome', 'Cardiovascular risk factors', 'Depression', 'Low education level', 'Hearing loss'],
    subjectiveData: ['Progressive memory loss (recent > remote)', 'Word-finding difficulty', 'Disorientation to time and place', 'Difficulty with familiar tasks', 'Personality and mood changes', 'Apathy', 'Wandering'],
    objectiveData: ['MMSE < 24 / MoCA < 26', 'Impaired recent memory', 'Executive dysfunction', 'Apraxia', 'Agnosia', 'Neuropsychiatric symptoms (agitation, psychosis)', 'Brain MRI: hippocampal atrophy, widened sulci'],
    nursingDiagnoses: [
      { id: 'nd-alz-1', diagnosis: 'Chronic Confusion related to progressive cognitive decline as evidenced by memory loss, disorientation, and impaired judgement', definingCharacteristics: ['Memory impairment', 'Disorientation', 'Poor judgement', 'Inability to perform familiar tasks'] },
      { id: 'nd-alz-2', diagnosis: 'Risk for Injury related to wandering, impaired judgement, and spatial disorientation', definingCharacteristics: ['Wandering behaviour', 'Falls', 'Getting lost', 'Unsafe driving'] },
      { id: 'nd-alz-3', diagnosis: 'Caregiver Role Strain related to progressive patient dependency and behavioural symptoms', definingCharacteristics: ['Caregiver exhaustion', 'Emotional distress', 'Social isolation of caregiver'] },
    ],
    goals: [
      { id: 'g-alz-1', shortTerm: 'Safe environment maintained. Behavioural symptoms managed. Caregiver education completed. Medications initiated.', longTerm: 'Patient remains in safe environment (home or care facility). Functional ability maintained as long as possible. Behavioural symptoms minimised. Caregiver supported.' },
    ],
    interventions: [
      { id: 'i-alz-1', category: 'dependent', action: 'Administer cognitive-enhancing medications: donepezil 5-10 mg OD, rivastigmine 6-12 mg BD, galantamine 8-24 mg OD (cholinesterase inhibitors). For moderate-severe: memantine 10-20 mg BD (NMDA receptor antagonist). Monitor for cholinergic side effects (nausea, diarrhoea, bradycardia). Avoid anticholinergics, benzodiazepines, and antipsychotics where possible.', rationale: 'Cholinesterase inhibitors provide modest symptomatic benefit for 6-12 months. Memantine may provide additional benefit in moderate-severe stages.', frequency: 'Cholinesterase inhibitors daily; memantine daily; cognitive assessment every 3-6 months' },
      { id: 'i-alz-2', category: 'independent', action: 'Safety interventions: GPS tracker for wanderers, door alarms, remove hazards (rugs, sharp objects), lock medications and cleaning products, install stair gates, ensure adequate lighting (reduce night-time confusion), labelled doors and drawers, simplified environment. Driving assessment and cessation if unsafe.', rationale: 'Environmental modification reduces injury risk by 50%. Early safety assessment prevents institutionalisation.', frequency: 'Home safety assessment at diagnosis and every 6 months; environmental review at every visit' },
      { id: 'i-alz-3', category: 'independent', action: 'Behavioural symptom management: validate and redirect rather than confront. Establish structured daily routine. Reduce environmental stimuli. Address underlying causes (pain, constipation, infection). For agitation: music therapy, aromatherapy, person-centred care. For wandering: purposeful walking programmes. Use non-pharmacological approaches first.', rationale: 'Behavioural symptoms affect 90% of Alzheimer patients. Non-pharmacological approaches are first-line. Antipsychotics increase mortality in dementia.', frequency: 'Daily behavioural monitoring; person-centred care plan review monthly' },
      { id: 'i-alz-4', category: 'independent', action: 'Caregiver support: education on disease progression, communication strategies (short sentences, calm tone, yes/no questions), respite care, support groups (Alzheimer\'s Society), assessment of caregiver mental health, advance care planning discussions.', rationale: 'Caregiver burnout affects 40-70% of dementia caregivers. Support reduces caregiver mortality and delays patient institutionalisation.', frequency: 'At diagnosis and every 3-6 months; caregiver assessment at every visit' },
    ],
    evaluation: [
      { id: 'e-alz-1', expected: 'Patient safe in current environment. Behavioural symptoms managed with non-pharmacological approaches. Caregiver feels supported and educated. Medications tolerated.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Alzheimer\'s Disease Management', keyPoints: ['Maintain a structured daily routine — consistency reduces confusion.', 'Use memory aids: labelled cupboards, large clocks, photo albums.', 'Encourage gentle exercise: walking, gardening, seated exercises.', 'Offer simple choices: "Tea or coffee?" rather than open-ended questions.', 'Reminiscence therapy: photos, music, familiar objects.', 'Do not argue or correct — validate and redirect.', 'Plan for future care: Power of Attorney, advance directives.'], method: 'Verbal to caregiver, written carer guide, Alzheimer\'s Society resources, support group referral' },
    ],
    dischargePlanning: { checklist: ['Medication prescriptions', 'Home safety assessment completed', 'GPS tracker arranged if wandering', 'Carer education session completed', 'Support group information provided', 'Advance care planning discussed', 'Social services referral', 'Day care/respite care arranged'], followUp: 'Memory clinic every 3-6 months. Annual cognitive assessment (MMSE/MoCA). Medication review every 6 months. Social services review every 6 months.', referrals: ['Memory clinic/neurology', 'Occupational therapy (home assessment)', 'Social services', 'Alzheimer\'s Society', 'Day care services', 'Respite care', 'GP for ongoing management'], warningSigns: ['Sudden worsening of confusion (check for UTI, constipation, pain)', 'Falls or new mobility problems', 'Refusal to eat or drink', 'Severe agitation or aggression', 'Aspiration (coughing during meals)'] },
    complications: ['Aspiration pneumonia (leading cause of death)', 'Falls and fractures', 'Malnutrition and dehydration', 'Pressure injuries', 'Urinary tract infections', 'Seizures (10-20%)', 'Caregiver burnout and depression'],
  },

  'Depression': {
    id: 'cp-depres', disease: 'Depression', specialty: 'Mental Health Care',
    overview: 'Major depressive disorder is a common, treatable mental health condition characterised by persistent low mood, anhedonia, and associated cognitive and physical symptoms. Nursing care focuses on safety (suicide prevention), medication management, psychological therapy support, and psychosocial recovery.',
    pathophysiology: 'Monoamine hypothesis: reduced serotonin, noradrenaline, and dopamine neurotransmission. Neuroplasticity model: hippocampal atrophy, reduced BDNF, HPA axis dysregulation, neuroinflammation. Genetic, psychological, and environmental factors interact (diathesis-stress model).',
    commonCauses: ['Biological (genetic predisposition, neurotransmitter imbalance)', 'Psychological (low self-esteem, rumination, perfectionism)', 'Social (adverse childhood experiences, bereavement, isolation)', 'Medical (hypothyroidism, chronic pain, stroke)'],
    riskFactors: ['Previous depression episode', 'Family history', 'Female sex (2x risk)', 'Adverse childhood experiences', 'Chronic illness', 'Substance misuse', 'Social isolation', 'Recent stressful life event'],
    subjectiveData: ['Persistent low mood (most of day, nearly every day)', 'Anhedonia (loss of interest or pleasure)', 'Sleep disturbance (insomnia or hypersomnia)', 'Fatigue and low energy', 'Poor concentration', 'Feelings of worthlessness or guilt', 'Suicidal ideation', 'Psychomotor retardation or agitation'],
    objectiveData: ['Flat or tearful affect', 'Psychomotor retardation or agitation', 'Weight loss or gain (> 5% in 1 month)', 'Insomnia or hypersomnia', 'Poor eye contact', 'Reduced speech volume and rate', 'PHQ-9 score ≥ 10', 'BDI-II score > 14'],
    nursingDiagnoses: [
      { id: 'nd-dep-1', diagnosis: 'Risk for Suicide related to hopelessness and depressive cognition as evidenced by suicidal ideation and plan', definingCharacteristics: ['Suicidal thoughts', 'Hopelessness', 'Social withdrawal', 'Giving away possessions'] },
      { id: 'nd-dep-2', diagnosis: 'Social Isolation related to anhedonia and low self-esteem as evidenced by withdrawal from social activities', definingCharacteristics: ['Social withdrawal', 'Anhedonia', 'Avoids contact'] },
      { id: 'nd-dep-3', diagnosis: 'Imbalanced Nutrition: Less Than Body Requirements related to reduced appetite and motivation', definingCharacteristics: ['Poor appetite', 'Weight loss', 'Irregular meals'] },
    ],
    goals: [
      { id: 'g-dep-1', shortTerm: 'Safety ensured (suicide risk assessed and managed). Medication initiated. Sleep improved. Engagement with therapy established.', longTerm: 'PHQ-9 score reduced by ≥ 50% or < 10. Return to baseline functioning. Medication adherence maintained. Relapse prevention plan in place.' },
    ],
    interventions: [
      { id: 'i-dep-1', category: 'independent', action: 'Suicide risk assessment: use structured tool (Columbia Suicide Severity Rating Scale). Assess ideation, plan, intent, means, and protective factors. Implement 1:1 observation if high risk. Remove environmental risks. Document risk level and plan. Reassess regularly.', rationale: 'Depression is the leading cause of suicide. Systematic risk assessment reduces suicide by identifying those needing escalation.', frequency: 'At admission, every shift if high risk, every 3-7 days if moderate risk, every visit if low risk' },
      { id: 'i-dep-2', category: 'dependent', action: 'Antidepressant management: SSRI first-line (sertraline 50-200 mg, fluoxetine 20-60 mg, citalopram 20-40 mg). Onset 2-4 weeks. Monitor for initial anxiety, suicidality (under 25), serotonin syndrome. Switch or augment (lithium, atypical antipsychotic) if partial response after 6-8 weeks. TCA for refractory cases (monitor cardiac and anticholinergic effects).', rationale: 'All antidepressants carry initial increased suicide risk in under-25s. Monitor closely in first 2-4 weeks. SSRIs are first-line due to safety profile.', frequency: 'SSRI daily; review at 2 and 6 weeks; PHQ-9 at every visit; consider switching at 8 weeks if inadequate response' },
      { id: 'i-dep-3', category: 'independent', action: 'Psychological therapy support: facilitate referral to CBT (first-line, 12-16 sessions), behavioural activation, or interpersonal therapy. Support engagement: transport, scheduling reminders, psychoeducation about therapy. Monitor homework completion and skill application.', rationale: 'CBT is as effective as medication for mild-moderate depression and reduces relapse by 50%. Combined treatment is superior for severe depression.', frequency: 'Weekly CBT sessions; review progress at each nursing contact' },
      { id: 'i-dep-4', category: 'independent', action: 'Behavioural activation: establish daily routine, schedule pleasurable activities (activity scheduling), graded exercise (30 min moderate exercise 3x/week), sleep hygiene, social engagement. Monitor activity levels and mood using mood diary.', rationale: 'Behavioural activation targets the withdrawal-inactivity cycle. Exercise has moderate-to-large antidepressant effect (comparable to SSRIs for mild-moderate).', frequency: 'Daily activity schedule; weekly mood diary review; exercise 3x/week minimum' },
    ],
    evaluation: [
      { id: 'e-dep-1', expected: 'No suicidal ideation. PHQ-9 score improving. Engagement with therapy. Medication tolerated. Sleep and appetite improved.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Depression Self-Management', keyPoints: ['Antidepressants take 2-4 weeks to work — do not stop if no immediate improvement.', 'Attend all therapy appointments — CBT helps change negative thinking patterns.', 'Exercise regularly — even a 15-minute walk can improve mood.', 'Maintain a routine: regular sleep, meals, and activities.', 'Talk to someone you trust about how you feel.', 'Avoid alcohol — it worsens depression and interferes with medication.', 'If suicidal thoughts return, contact your crisis team or call 999/Samaritans (116 123).'], method: 'Verbal, written safety plan, crisis numbers card, mood diary, medication guide' },
    ],
    dischargePlanning: { checklist: ['Antidepressant prescription and titration schedule', 'Safety plan completed with crisis contacts', 'Therapy referral confirmed', 'Follow-up appointment within 1-2 weeks', 'GP letter with treatment plan', 'Medication review date', 'Inform GP/family of discharge plan'], followUp: 'Mental health team in 1-2 weeks post-discharge. GP medication review at 4-6 weeks. Continue antidepressants for minimum 6-12 months after remission (2 years if recurrent).', referrals: ['Mental health team/psychiatry', 'CBT therapist', 'Social prescriber', 'GP', 'Crisis team', 'Support groups (Depression Alliance)'], warningSigns: ['Suicidal thoughts or self-harm', 'Worsening mood despite treatment', 'Severe anxiety or panic attacks', 'Psychotic symptoms (hallucinations, delusions)', 'Rapid mood swings'] },
    complications: ['Suicide (15% lifetime risk if untreated)', 'Substance misuse', 'Relationship breakdown', 'Employment loss', 'Physical health deterioration', 'Chronic treatment-resistant depression', 'Social exclusion'],
  },

  'Schizophrenia': {
    id: 'cp-schizo', disease: 'Schizophrenia', specialty: 'Mental Health Care',
    overview: 'Schizophrenia is a severe, chronic psychotic disorder characterised by positive symptoms (hallucinations, delusions), negative symptoms (flat affect, avolition), and cognitive impairment. Nursing care focuses on medication adherence, relapse prevention, psychosocial rehabilitation, and safety.',
    pathophysiology: 'Dopamine hypothesis: hyperactive mesolimbic pathway (positive symptoms), hypoactive mesocortical pathway (negative symptoms). Glutamate and serotonin dysregulation also implicated. Structural brain changes (enlarged ventricles, reduced grey matter).',
    commonCauses: ['Multifactorial: genetic + environmental interaction', 'Dopaminergic dysregulation', 'Neurodevelopmental abnormalities', 'Prenatal stress/infection'],
    riskFactors: ['First-degree relative with schizophrenia (10% risk)', 'Urban birth/upbringing', 'Cannabis use in adolescence', 'Migration/minority status', 'Obstetric complications', 'Childhood adversity'],
    subjectiveData: ['Hallucinations (auditory > visual)', 'Delusions (persecutory, grandiose, referential)', 'Disorganised speech and behaviour', 'Negative symptoms (flat affect, alogia, avolition)', 'Social withdrawal', 'Poor self-care', 'Anxiety'],
    objectiveData: ['Thought disorder (derailment, tangentiality)', 'Bizarre behaviour', 'Flat or inappropriate affect', 'Poor hygiene and grooming', 'Lack of motivation', 'CAT score elevated', 'Negative symptoms (SANS scale)'],
    nursingDiagnoses: [
      { id: 'nd-schiz-1', diagnosis: 'Disturbed Sensory Perception related to altered cerebral neurochemical function as evidenced by auditory and visual hallucinations', definingCharacteristics: ['Hearing voices', 'Visual disturbances', 'Responding to internal stimuli'] },
      { id: 'nd-schiz-2', diagnosis: 'Impaired Social Interaction related to negative symptoms and paranoia as evidenced by social withdrawal and distrust', definingCharacteristics: ['Social withdrawal', 'Suspiciousness', 'Flat affect'] },
      { id: 'nd-schiz-3', diagnosis: 'Risk for Violence related to paranoid delusions and command hallucinations', definingCharacteristics: ['Persecutory delusions', 'Command hallucinations', 'History of aggression'] },
    ],
    goals: [
      { id: 'g-schiz-1', shortTerm: 'Positive symptoms controlled. Medication adherence established. Safe environment maintained. Basic self-care re-established.', longTerm: 'Relapse prevented. Community integration achieved. Medication adherence sustained. Social functioning improved.' },
    ],
    interventions: [
      { id: 'i-schiz-1', category: 'dependent', action: 'Antipsychotic management: second-generation (paliperidone, olanzapine, aripiprazole, quetiapine, clozapine) preferred. Clozapine for treatment-resistant cases (absolute neutrophil count monitoring mandatory). Monitor EPS (extrapyramidal symptoms), metabolic syndrome (weight, glucose, lipids), prolactin, sedation. Long-acting injectable (LAI) for adherence issues (paliperidone LAI, aripiprazole LAI).', rationale: 'Antipsychotics block D2 receptors (positive symptoms). Second-generation preferred due to lower EPS risk. Clozapine is only effective medication for treatment-resistant schizophrenia.', frequency: 'Oral antipsychotics daily; LAI monthly/3-monthly; metabolic monitoring at 3, 6, 12 months then annually; clozapine ANC weekly/monthly' },
      { id: 'i-schiz-2', category: 'independent', action: 'Therapeutic relationship: non-judgmental, calm, clear communication. Avoid arguing about delusions. Acknowledge distress without reinforcing beliefs. Structured environment. Consistent staff. Clear expectations. Reality orientation when safe.', rationale: 'A trusting therapeutic relationship is the foundation of schizophrenia care. Validation reduces agitation without reinforcing psychotic beliefs.', frequency: 'Every interaction; document therapeutic engagement' },
      { id: 'i-schiz-3', category: 'independent', action: 'Relapse prevention: identify early warning signs (sleep disturbance, increased suspiciousness, social withdrawal), develop written relapse plan, ensure depot injections or supervised medication, regular community mental health contact, avoid cannabis and substance use, stress management.', rationale: 'Relapse occurs in 70-80% within 1 year if medication stopped. Early warning sign recognition enables prompt intervention.', frequency: 'Relapse plan reviewed every 3-6 months; community mental health contact weekly-monthly' },
      { id: 'i-schiz-4', category: 'independent', action: 'Social rehabilitation: encourage self-care activities (shower, dress, eat meals), social skills training, supported employment, peer support groups, occupational therapy. For negative symptoms: graded activity scheduling, behavioural activation, cognitive remediation therapy.', rationale: 'Negative symptoms and functional disability are the greatest long-term burdens. Social rehabilitation improves quality of life and community functioning.', frequency: 'Daily self-care encouragement; weekly social skills group; occupational therapy assessment' },
    ],
    evaluation: [
      { id: 'e-schiz-1', expected: 'Positive symptoms reduced or resolved. Medication adherence confirmed. No relapse. Patient engaging with social activities. Self-care maintained.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Schizophrenia Self-Management', keyPoints: ['Take antipsychotics every day — even when feeling better. Stopping causes relapse.', 'Report side effects early — many can be managed by changing medication.', 'Avoid cannabis and recreational drugs — they worsen psychosis.', 'Learn your early warning signs and share your relapse plan with family.', 'Attend regular appointments with your community mental health team.', 'Structured routine: regular sleep, meals, exercise, and social activities.', 'If you hear voices, remember they are a symptom — you do not have to obey them.'], method: 'Verbal, written relapse plan, medication cards, early warning signs leaflet, family psychoeducation' },
    ],
    dischargePlanning: { checklist: ['Antipsychotic prescription or LAI arranged', 'Relapse action plan completed', 'GP and CMHT notified', 'Follow-up within 1 week', 'Housing and social circumstances assessed', 'Financial/benefits advice', 'Family psychoeducation arranged'], followUp: 'Community mental health team within 1 week of discharge. Psychiatrist review in 4-6 weeks. Metabolic monitoring at 3 months. LAI injection as scheduled.', referrals: ['Community mental health team', 'Psychiatrist', 'Occupational therapy', 'Social services', 'Supported employment', 'Housing support', 'Hearing Voices Network', 'Family support groups'], warningSigns: ['Not taking medication', 'Sleep disturbance or agitation', 'Increasing suspiciousness or paranoia', 'Hearing voices returning or worsening', 'Threatening behaviour or self-harm'] },
    complications: ['Relapse and rehospitalisation (high if non-adherent)', 'Medication side effects (metabolic syndrome, EPS, tardive dyskinesia)', 'Substance misuse (50% co-morbid)', 'Suicide (5-10% lifetime risk)', 'Social isolation and homelessness', 'Physical health disparities (15-20 year reduced life expectancy)'],
  },

  'Neuropathic Pain': {
    id: 'cp-neuropain', disease: 'Neuropathic Pain', specialty: 'Neurological Care',
    overview: 'Neuropathic pain is caused by a lesion or disease of the somatosensory nervous system (e.g. diabetic neuropathy, post-herpetic neuralgia, trigeminal neuralgia). Nursing care focuses on pain assessment, titration of adjuvant analgesics, safety, and functional improvement.',
    pathophysiology: 'Peripheral nerve damage leads to ectopic discharges, up-regulation of voltage-gated sodium channels, central sensitisation in the dorsal horn, and altered descending inhibitory pathways, resulting in spontaneous pain and allodynia.',
    commonCauses: ['Diabetic neuropathy', 'Post-herpetic neuralgia', 'Trigeminal neuralgia', 'Radiculopathy', 'Central post-stroke pain', 'Chemotherapy-induced peripheral neuropathy', 'HIV neuropathy'],
    riskFactors: ['Poorly controlled diabetes', 'Advanced age', 'Shingles (herpes zoster) history', 'Neurotoxic chemotherapy', 'Spinal cord injury', 'Alcohol abuse'],
    subjectiveData: ['Burning, shooting, or electric shock-like pain', 'Allodynia (pain from non-painful stimuli like light touch)', 'Hyperalgesia (heightened pain to painful stimuli)', 'Paraesthesia (tingling, numbness)', 'Sleep disturbance due to pain', 'Depression and anxiety'],
    objectiveData: ['Altered sensation to pinprick, temperature, or light touch', 'Autonomic dysfunction in affected area', 'Reduced reflexes', 'Numeric Rating Scale (NRS) or DN4 score ≥ 4', 'Functional impairment in daily activities'],
    nursingDiagnoses: [
      { id: 'nd-np-1', diagnosis: 'Chronic Pain related to peripheral or central nervous system lesion as evidenced by burning pain and allodynia', definingCharacteristics: ['Shooting/burning pain', 'Allodynia', 'Sleep disruption'] },
      { id: 'nd-np-2', diagnosis: 'Sleep Deprivation related to chronic neuropathic pain as evidenced by daytime fatigue and difficulty falling asleep', definingCharacteristics: ['Frequent night waking', 'Daytime fatigue', 'Irritability'] },
      { id: 'nd-np-3', diagnosis: 'Anxiety and Depression related to chronic intractable pain', definingCharacteristics: ['Depressed mood', 'Feelings of helplessness', 'Pain catastrophising'] },
    ],
    goals: [
      { id: 'g-np-1', shortTerm: 'Pain intensity reduced (NRS < 4). Adjuvant analgesics initiated and titrated. Sleep quality improved.', longTerm: 'Stable pain control. Improved functional ability and quality of life. Coping strategies established.' },
    ],
    interventions: [
      { id: 'i-np-1', category: 'dependent', action: 'Administer adjuvant analgesics: calcium channel alpha-2-delta ligands (gabapentin 300-3600 mg/day, pregabalin 150-600 mg/day) or SNRIs (duloxetine 60-120 mg/day, venlafaxine). Topical treatments for localised pain (capsaicin 8% patch, lidocaine 5% plaster). Tricyclic antidepressants (amitriptyline 10-75 mg nocte). Titrate slowly over weeks to minimise sedation and dizziness.', rationale: 'First-line neuropathic pain medications (gabapentinoids, SNRIs, TCAs) modulate central and peripheral hyperexcitability. Traditional opioids are less effective and carry addiction risk.', frequency: 'Daily titration per protocol; pain score every shift; review efficacy at 2-4 weeks' },
      { id: 'i-np-2', category: 'independent', action: 'Comprehensive pain assessment: use validated tools (DN4 questionnaire, PainDETECT, Brief Pain Inventory). Assess pain quality, location, exacerbating factors, and impact on sleep and mood. Monitor for medication side effects (somnolence, dizziness, peripheral oedema, dry mouth).', rationale: 'Neuropathic pain has distinct sensory descriptors (burning, shooting) that differentiate it from nociceptive pain and guide targeted treatment.', frequency: 'Pain assessment every shift; side effect screening weekly' },
      { id: 'i-np-3', category: 'independent', action: 'Non-pharmacological pain management: transcutaneous electrical nerve stimulation (TENS), physical therapy, gentle range-of-motion exercises, heat/cold therapy (avoid if sensory loss present), cognitive behavioural therapy (CBT) for pain coping, mindfulness, and relaxation techniques.', rationale: 'Multimodal management improves pain control and reduces reliance on pharmacotherapy. TENS stimulates large afferent fibres, gating pain transmission.', frequency: 'Daily non-pharmacological interventions; weekly physiotherapy review' },
      { id: 'i-np-4', category: 'independent', action: 'Safety precautions for sensory loss: inspect feet daily (especially in diabetic neuropathy), test bathwater temperature with elbow, wear well-fitting supportive shoes, ensure adequate home lighting to prevent trips and burns.', rationale: 'Impaired protective sensation places patients at high risk for painless burns, cuts, and foot ulcers.', frequency: 'Daily foot check by patient/nurse; safety assessment at admission' },
    ],
    evaluation: [
      { id: 'e-np-1', expected: 'Pain score reduced by ≥ 30%. Sleep duration improved. Adjuvant medications tolerated without severe side effects. Patient demonstrates foot care safety.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Neuropathic Pain Self-Management', keyPoints: ['Take nerve pain medications regularly as prescribed — they take 2-4 weeks to reach full effect.', 'Report side effects like dizziness or somnolence so dose can be adjusted.', 'Inspect your feet daily for cuts, blisters, or redness if you have numbness.', 'Avoid extreme temperatures; test water with your elbow before bathing.', 'Stay active with gentle exercise to prevent stiffness.', 'Practice relaxation techniques and pacing activities.'], method: 'Verbal, written pain management guide, foot care leaflet' },
    ],
    dischargePlanning: { checklist: ['Adjuvant medication prescriptions and titration schedule', 'DN4 assessment summary', 'Foot care and sensory safety instructions', 'Physiotherapy referral', 'Pain clinic follow-up'], followUp: 'Pain clinic in 6-8 weeks. GP medication review every 4 weeks during titration. Annual diabetic foot check if applicable.', referrals: ['Pain management clinic', 'Physiotherapy', 'Diabetic foot clinic if neuropathy', 'Counselling/psychology'], warningSigns: ['Sudden worsening of pain or spreading numbness', 'New skin breakdown or infection on feet', 'Severe sedation or confusion from medications', 'Signs of depression or suicidal ideation'] },
    complications: ['Chronic intractable pain', 'Neuropathic foot ulcers and amputation', 'Severe sleep deprivation', 'Depression and suicide risk', 'Medication side effects (falls, confusion)', 'Social isolation'],
  },

  'Leukaemia': {
    id: 'cp-leuk', disease: 'Leukaemia', specialty: 'Oncology Care',
    overview: 'Leukaemia is a malignant clonal disorder of haematopoietic stem cells characterised by uncontrolled proliferation of abnormal white blood cells in bone marrow and blood. Nursing care focuses on infection prevention, bleeding precautions, chemotherapy administration support, and psychosocial support.',
    pathophysiology: 'Genetic mutations in haematopoietic progenitors block normal differentiation and promote unchecked proliferation. Leukaemic cells infiltrate bone marrow, suppressing normal haematopoiesis (anaemia, neutropenia, thrombocytopenia) and infiltrate extramedullary sites.',
    commonCauses: ['Genetic mutations (translocations like Philadelphia chromosome)', 'Ionizing radiation exposure', 'Chemical exposure (benzene)', 'Previous chemotherapy/radiotherapy', 'Genetic syndromes (Down syndrome, Fanconi anaemia)'],
    riskFactors: ['Family history', 'Smoking', 'Previous cancer treatment (alkylating agents)', 'Radiation exposure', 'Genetic disorders', 'Myelodysplastic syndrome progression'],
    subjectiveData: ['Fatigue and weakness (anaemia)', 'Fever and recurrent infections (neutropenia)', 'Easy bruising and bleeding gums (thrombocytopenia)', 'Bone and joint pain', 'Night sweats and weight loss', 'Abdominal fullness (splenomegaly)'],
    objectiveData: ['Pallor, petechiae, purpura, ecchymoses', 'Lymphadenopathy and hepatosplenomegaly', 'Fever (> 38°C)', 'Elevated or severely depressed WBC count with blast cells', 'Severe anaemia (Hb < 8 g/dL)', 'Thrombocytopenia (platelets < 50 x 10^9/L)', 'Bone marrow biopsy: > 20% blasts (acute leukaemia)'],
    nursingDiagnoses: [
      { id: 'nd-leuk-1', diagnosis: 'Risk for Infection related to severe neutropenia and impaired immune function', definingCharacteristics: ['ANC < 0.5 x 10^9/L', 'Fever', 'Invasive lines', 'Mucositis'] },
      { id: 'nd-leuk-2', diagnosis: 'Risk for Bleeding related to profound thrombocytopenia', definingCharacteristics: ['Platelets < 20 x 10^9/L', 'Petechiae/ecchymoses', 'Epistaxis/gingival bleeding'] },
      { id: 'nd-leuk-3', diagnosis: 'Fatigue related to anaemia and malignancy-related metabolic demands', definingCharacteristics: ['Severe fatigue', 'Exertional dyspnoea', 'Pale skin'] },
    ],
    goals: [
      { id: 'g-leuk-1', shortTerm: 'Infection prevented or promptly treated. Bleeding episodes avoided. Chemotherapy tolerated. Nutritional status supported.', longTerm: 'Remission achieved. Bone marrow function recovered. Complications managed. Quality of life maintained.' },
    ],
    interventions: [
      { id: 'i-leuk-1', category: 'dependent', action: 'Chemotherapy and supportive care: administer induction/consolidation chemotherapy regimens as prescribed. Pre-medicate with antiemetics (5-HT3 antagonists, dexamethasone). Administer G-CSF (filgrastim) post-chemotherapy to accelerate neutrophil recovery. Blood product support: irradiated PRBCs for Hb < 8 g/dL, platelet transfusion for platelets < 10 x 10^9/L or active bleeding.', rationale: 'Intensive chemotherapy eradicates leukaemic clone but causes profound bone marrow suppression. Supportive transfusions and growth factors prevent fatal bleeding and infection.', frequency: 'Chemotherapy per protocol; daily FBC; transfusion as triggered by blood counts' },
      { id: 'i-leuk-2', category: 'independent', action: 'Strict neutropenic precautions: protective isolation room, meticulous hand hygiene by all staff and visitors, no fresh flowers or potted plants, low-microbial diet (cooked foods only, no raw fruit/veg), daily chlorhexidine mouthwashes, strict aseptic technique for central venous catheter care. Monitor temperature q4h; report fever (> 38°C) immediately for urgent blood cultures and broad-spectrum IV antibiotics within 1 hour.', rationale: 'Neutropenic sepsis is a medical emergency with high mortality. Strict precautions and immediate empiric antibiotics reduce sepsis mortality.', frequency: 'Temperature q4h; neutropenic diet ongoing; central line care daily; blood cultures at first fever spike' },
      { id: 'i-leuk-3', category: 'independent', action: 'Bleeding precautions: use soft toothbrushes or foam swabs, electric razors only (no wet razors), avoid IM injections and rectal temperatures, minimise blood draws (bundle labs), monitor for petechiae, purpura, melaena, haematuria, and epistaxis. Neurological checks for intracranial haemorrhage if platelets extremely low.', rationale: 'Thrombocytopenia increases spontaneous haemorrhage risk. Avoiding trauma prevents major bleeding episodes.', frequency: 'Bleeding assessment every shift; platelet count daily' },
      { id: 'i-leuk-4', category: 'independent', action: 'Nutritional and hydration support: high-calorie, high-protein diet. Aggressive IV hydration and allopurinol/rasburicase during induction to prevent tumour lysis syndrome (monitor uric acid, K+, PO4, creatinine). Total parenteral nutrition (TPN) if severe mucositis prevents oral intake.', rationale: 'Tumour lysis syndrome from rapid cell lysis causes hyperkalaemia, hyperuricaemia, and acute renal failure. Hydration and urate-oxidase prevent this.', frequency: 'Daily weight and fluid balance; electrolytes q12h during induction; dietitian review' },
    ],
    evaluation: [
      { id: 'e-leuk-1', expected: 'No episodes of severe infection or neutropenic sepsis. No major bleeding. Chemotherapy completed. Tumour lysis prevented.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Leukaemia Care and Neutropenic Precautions', keyPoints: ['Meticulous hand hygiene: wash hands frequently with soap and water.', 'Avoid crowds, sick people, and children with viral illnesses during neutropenia.', 'Eat only thoroughly cooked foods — avoid raw salads, unpasteurised dairy, and sushi.', 'Report fever > 38°C, chills, or cough immediately — this is an emergency.', 'Use an electric shaver and soft toothbrush to prevent bleeding.', 'Watch for bruising, bleeding gums, or blood in urine/stool.'], method: 'Verbal, written neutropenic precautions guide, infection warning sign card' },
    ],
    dischargePlanning: { checklist: ['Discharge medications (prophylactic antimicrobials, antiemetics)', 'FBC monitoring schedule', 'Fever and bleeding emergency protocol', 'Central line care plan if applicable', 'Dietary restrictions (neutropenic diet)', 'Psychosocial and financial support referral'], followUp: 'Haematology clinic weekly or bi-weekly. Bone marrow aspirate as scheduled for remission status. FBC check 2-3x/week during nadir.', referrals: ['Haematology/oncology team', 'Dietitian', 'Social work/financial counselling', 'Psycho-oncology', 'Palliative care if advanced disease'], warningSigns: ['Fever > 38°C or chills (emergency)', 'Uncontrolled bleeding or bruising', 'Severe shortness of breath or chest pain', 'Confusion or severe headache', 'Inability to keep fluids down due to nausea'] },
    complications: ['Neutropenic sepsis and septic shock', 'Severe haemorrhage (intracranial, GI)', 'Tumour lysis syndrome', 'Bone marrow failure', 'Opportunistic infections (fungal, viral)', 'Infertility from chemotherapy', 'Secondary malignancies'],
  },

  'Lymphoma': {
    id: 'cp-lympho', disease: 'Lymphoma', specialty: 'Oncology Care',
    overview: 'Lymphoma encompasses Hodgkin lymphoma and non-Hodgkin lymphoma — malignant neoplasms of lymphocytes originating in lymph nodes or lymphoid tissues. Nursing care focuses on chemotherapy administration, management of B-symptoms, infection prevention, and psychosocial support.',
    pathophysiology: 'Malignant transformation of B-cells, T-cells, or NK cells leads to clonal expansion and accumulation in lymph nodes, spleen, bone marrow, and extranodal sites. Hodgkin lymphoma is characterised by Reed-Sternberg cells; non-Hodgkin lymphoma is more heterogeneous.',
    commonCauses: ['Genetic translocations (e.g. t(14;18) in follicular lymphoma, t(8;14) in Burkitt)', 'Viral infections (EBV in Hodgkin/Burkitt, HTLV-1, HCV)', 'Immunodeficiency (HIV, post-transplant)', 'Autoimmune conditions'],
    riskFactors: ['Family history', 'Immunosuppression (HIV, immunosuppressive drugs)', 'Viral infections (EBV, HIV, H. pylori for gastric MALT)', 'Age (varies by subtype: Hodgkin peaks in young adults and > 55)', 'Chemical exposure'],
    subjectiveData: ['Painless, rubbery lymphadenopathy (cervical, axillary, inguinal)', 'B-symptoms: drenching night sweats, unexplained fever (> 38°C), weight loss > 10% in 6 months', 'Pruritus', 'Fatigue', 'Chest discomfort or cough (mediastinal lymphadenopathy)', 'Abdominal fullness (splenomegaly)'],
    objectiveData: ['Palpable lymphadenopathy', 'Splenomegaly or hepatomegaly', 'Superior vena cava obstruction signs (facial oedema, dilated chest veins) if bulky mediastinal disease', 'PET-CT: fluorodeoxyglucose-avid lesions', 'Lymph node biopsy confirming histology'],
    nursingDiagnoses: [
      { id: 'nd-lymph-1', diagnosis: 'Risk for Infection related to bone marrow suppression and lymph node malignancy', definingCharacteristics: ['Neutropenia post-chemotherapy', 'Impaired immune response'] },
      { id: 'nd-lymph-2', diagnosis: 'Fatigue related to B-symptoms, malignancy, and chemotherapy side effects', definingCharacteristics: ['Night sweats', 'Weight loss', 'Exhaustion'] },
      { id: 'nd-lymph-3', diagnosis: 'Ineffective Breathing Pattern related to mediastinal lymphadenopathy or pleural effusion', definingCharacteristics: ['Dyspnoea', 'Cough', 'Superior vena cava obstruction risk'] },
    ],
    goals: [
      { id: 'g-lymph-1', shortTerm: 'B-symptoms managed. Chemotherapy initiated safely. Respiratory status stable. Infection prevented.', longTerm: 'Complete remission achieved (negative PET-CT). Quality of life restored. Long-term survivorship support established.' },
    ],
    interventions: [
      { id: 'i-lymph-1', category: 'dependent', action: 'Chemotherapy and immunotherapy: administer ABVD (doxorubicin, bleomycin, vinblastine, dacarbazine) for Hodgkin lymphoma, or R-CHOP (rituximab, cyclophosphamide, doxorubicin, vincristine, prednisolone) for diffuse large B-cell lymphoma. Monitor cardiac function (doxorubicin cardiotoxicity — baseline and serial ECHO/MUGA). Monitor pulmonary function for bleomycin (avoid high FiO2). Administer G-CSF post-chemotherapy.', rationale: 'Combination chemoimmunotherapy achieves high cure rates (70-90% in Hodgkin lymphoma). Specific agents require organ toxicity monitoring (doxorubicin heart, bleomycin lungs).', frequency: 'Chemotherapy per cycle (e.g., every 14-21 days); ECHO baseline and end of treatment; FBC pre-cycle' },
      { id: 'i-lymph-2', category: 'independent', action: 'Monitor and manage B-symptoms: track temperature daily, record weight weekly, manage night sweats (cool environment, frequent linen changes), provide high-calorie nutritional supplements for weight loss. Monitor for superior vena cava obstruction (SVCO) in mediastinal disease (head fullness, facial oedema — elevate head of bed, emergency oncology review).', rationale: 'B-symptoms indicate active disease and high metabolic demand. SVCO is an oncogenic emergency requiring urgent corticosteroids and radiotherapy/chemotherapy.', frequency: 'Daily temperature and symptom review; weekly weight; respiratory assessment every shift' },
      { id: 'i-lymph-3', category: 'independent', action: 'Infection prevention and blood product support: neutropenic precautions during chemotherapy nadir. PRBC and platelet transfusions as indicated. Prophylactic antimicrobials (co-trimoxazole for PCP prevention if on intensive regimens, anti-fungals/anti-virals).', rationale: 'Chemotherapy causes neutropenia and lymphopaenia, increasing infection risk. Prophylaxis prevents opportunistic infections like Pneumocystis jirovecii pneumonia.', frequency: 'Neutropenic precautions during nadir; transfusions per protocol; daily temperature monitoring' },
      { id: 'i-lymph-4', category: 'independent', action: 'Psychosocial support: address cancer diagnosis anxiety, body image changes (alopecia from ABVD/CHOP), fertility preservation discussion prior to starting chemotherapy (sperm banking, egg harvesting), referral to psycho-oncology and lymphoma support groups.', rationale: 'Lymphoma diagnosis in young adults (Hodgkin) impacts fertility, career, and body image. Early fertility referral is essential.', frequency: 'Psychosocial screening at diagnosis and every cycle; fertility discussion pre-treatment' },
    ],
    evaluation: [
      { id: 'e-lymph-1', expected: 'B-symptoms resolved. Chemotherapy cycles completed on schedule. No severe infection or cardiotoxicity. Interim PET-CT showing metabolic response.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Lymphoma Care and Treatment', keyPoints: ['Take prescribed antiemetics and medications exactly as directed.', 'Report fever > 38°C or chills immediately (neutropenic sepsis risk).', 'Manage night sweats with breathable cotton sleepwear and cool room temperature.', 'Protect skin and hair: hair loss is temporary with CHOP/ABVD; use gentle skin care.', 'Report shortness of breath, chest pain, or swelling in neck/face immediately.', 'Attend all follow-up PET-CT scans to assess treatment response.'], method: 'Verbal, written chemotherapy guide, side effect management leaflet, fertility preservation information' },
    ],
    dischargePlanning: { checklist: ['Chemotherapy schedule and premedication instructions', 'Fever and infection emergency protocol', 'Fertility preservation referral completed', 'ECHO/cardiac monitoring scheduled', 'Follow-up PET-CT scan booked', 'Psycho-oncology support referral'], followUp: 'Oncology clinic prior to each cycle. Interim and post-treatment PET-CT scans. Long-term survivorship clinic post-treatment.', referrals: ['Medical/radiation oncology', 'Fertility clinic', 'Psycho-oncology', 'Dietitian', 'Lymphoma support groups'], warningSigns: ['Fever > 38°C or chills', 'Severe shortness of breath or cough (bleomycin lung toxicity / SVCO)', 'New swelling in neck, armpits, or groin', 'Unexplained bruising or bleeding', 'Severe fatigue or dizziness'] },
    complications: ['Neutropenic sepsis', 'Cardiotoxicity (doxorubicin heart failure)', 'Pulmonary toxicity (bleomycin fibrosis)', 'Secondary malignancies (leukaemia, solid tumours)', 'Infertility', 'Hypothyroidism post-neck radiotherapy', 'Relapsed or refractory lymphoma'],
  },

  'Chemotherapy Supportive Care': {
    id: 'cp-chemosup', disease: 'Chemotherapy Supportive Care', specialty: 'Oncology Care',
    overview: 'Chemotherapy supportive care encompasses prevention and management of toxicities associated with cancer treatment, including CINV, myelosuppression, mucositis, extravasation, and tumour lysis syndrome. Nursing care focuses on proactive symptom prevention and rapid intervention.',
    pathophysiology: 'Cytotoxic chemotherapy targets rapidly dividing cells (tumour cells as well as bone marrow, GI mucosa, hair follicles), leading to predictable organ toxicities and side effects requiring proactive supportive interventions.',
    commonCauses: ['Cytotoxic chemotherapy administration', 'Targeted cancer therapies', 'Immunotherapy-related adverse events', 'Radiotherapy'],
    riskFactors: ['Emetogenic potential of chemotherapy regimen', 'Young age or female sex (higher CINV risk)', 'Baseline nutritional deficits', 'Pre-existing renal/hepatic impairment', 'Poor performance status'],
    subjectiveData: ['Nausea and vomiting (acute and anticipatory)', 'Mouth pain and dysphagia (mucositis)', 'Fatigue and weakness', 'Diarrhoea or constipation', 'Pain at infusion site (extravasation risk)', 'Numbness and tingling in fingers/toes (neuropathy)'],
    objectiveData: ['Oral ulceration and erythema on examination', 'Weight loss and dehydration', 'Severe neutropenia (ANC < 0.5)', 'Thrombocytopenia and anaemia', 'Electrolyte derangements (TLS)', 'Infusion site erythema, swelling, or blistering'],
    nursingDiagnoses: [
      { id: 'nd-cs-1', diagnosis: 'Nausea related to chemotherapy-induced emetogenic stimulation as evidenced by vomiting and retching', definingCharacteristics: ['Nausea/vomiting', 'Anorexia', 'Dehydration risk'] },
      { id: 'nd-cs-2', diagnosis: 'Impaired Oral Mucous Membrane related to cytotoxic effects on GI epithelium as evidenced by oral ulceration and pain', definingCharacteristics: ['Oral ulcers', 'Mucosal erythema', 'Dysphagia'] },
      { id: 'nd-cs-3', diagnosis: 'Risk for Impaired Tissue Integrity related to chemotherapy extravasation risk', definingCharacteristics: ['Peripheral IV infusion', 'Vesicant chemotherapy agents'] },
    ],
    goals: [
      { id: 'g-cs-1', shortTerm: 'Nausea and vomiting controlled. Mucositis managed with pain relief and mouth care. No extravasation injury. Electrolytes balanced.', longTerm: 'Supportive care measures maintained throughout treatment. Nutritional status preserved. Treatment tolerance optimised.' },
    ],
    interventions: [
      { id: 'i-cs-1', category: 'dependent', action: 'CINV prophylaxis: administer antiemetics according to emetogenic risk of chemotherapy. High risk (e.g. cisplatin, anthracycline/cyclophosphamide): 4-drug regimen (NK1 receptor antagonist e.g. aprepitant, 5-HT3 antagonist e.g. palonosetron, dexamethasone, olanzapine). Moderate/low risk: 2-3 drug regimen. Breakthrough antiemetics prescribed (metoclopramide, levomepromazine).', rationale: 'Preventing CINV is significantly more effective than treating established nausea. MASCC/ESMO guidelines recommend guideline-adherent multi-drug prophylaxis.', frequency: 'Pre-chemotherapy premedication; scheduled or PRN breakthrough antiemetics' },
      { id: 'i-cs-2', category: 'independent', action: 'Oral mucositis care: baseline and daily oral cavity assessment (WHO grading). Implement mouth care protocol: normal saline or sodium bicarbonate mouthwashes qid, soft toothbrush, alcohol-free mouthwash. Pain management: topical viscous lidocaine, oral opioids for severe pain. TPN or enteral nutrition if unable to swallow.', rationale: 'Good oral hygiene reduces the severity and duration of mucositis. Pain control allows adequate oral intake and prevents malnutrition.', frequency: 'Oral assessment daily; mouth care qid; pain assessment q4h' },
      { id: 'i-cs-3', category: 'independent', action: 'Vesicant extravasation prevention and management: inspect peripheral IV site prior to and during vesicant infusion (doxorubicin, vincristine). Infuse via central venous catheter (PICC/Port-a-Cath) when possible. If extravasation suspected: STOP infusion immediately, aspirate residual drug from cannula, leave cannula in place temporarily, notify oncology team, apply cold compress (anthracyclines) or warm compress (vinca alkaloids), administer specific antidote (dexrazoxane for anthracyclines) if indicated.', rationale: 'Vesicant extravasation causes severe tissue necrosis and ulceration. Immediate cessation and antidote administration prevent permanent tissue damage.', frequency: 'Check blood return every 5-10 mL during vesicant infusion; site check continuously' },
      { id: 'i-cs-4', category: 'dependent', action: 'Myelosuppression and infection management: monitor FBC nadir. Administer G-CSF (filgrastim, pegfilgrastim) 24-72 hours post-chemotherapy as prescribed. Administer erythropoiesis-stimulating agents or blood transfusions for anaemia. Broad-spectrum IV antibiotics immediately for febrile neutropenia (Door-to-Antibiotic time < 60 minutes).', rationale: 'Colony-stimulating factors reduce duration of neutropenia and febrile neutropenia risk. Prompt antibiotics save lives in neutropenic sepsis.', frequency: 'FBC monitoring per protocol; G-CSF timing per protocol; urgent antibiotics at first fever' },
    ],
    evaluation: [
      { id: 'e-cs-1', expected: 'Nausea well-controlled (no vomiting). Mucositis healing without severe pain. No extravasation injury. Neutropenic episodes managed promptly.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Chemotherapy Side Effect Management', keyPoints: ['Take antiemetics on schedule as prescribed — do not wait until you feel sick.', 'Practice gentle mouth care after every meal using soft brush and baking soda mouthwash.', 'Eat small, bland meals (crackers, toast, rice) and sip fluids throughout the day.', 'Report pain, burning, or swelling at your IV site immediately during infusion.', 'Report fever > 38°C immediately to your oncology team.', 'Keep a side effect diary to discuss with your nurse at each visit.'], method: 'Verbal, written side effect management booklet, emergency contact card' },
    ],
    dischargePlanning: { checklist: ['Breakthrough antiemetic prescriptions', 'Pain medication for mucositis', 'Fever and infection emergency instructions', 'Dietary guidance for nausea/mucositis', 'Oncology triage contact numbers'], followUp: 'Oncology clinic review as scheduled. Weekly nurse telephone triage calls during high-risk cycles.', referrals: ['Oncology nursing team', 'Dietitian', 'Pain clinic', 'Palliative care if symptom burden high'], warningSigns: ['Nausea/vomiting preventing fluid intake for > 24 hours', 'Fever > 38°C or chills', 'Severe mouth pain preventing swallowing', 'Pain, redness, or swelling at IV site', 'Diarrhoea > 6 episodes/day'] },
    complications: ['Severe dehydration from CINV', 'Severe mucositis and malnutrition', 'Tissue necrosis from vesicant extravasation', 'Febrile neutropenia and sepsis', 'Tumour lysis syndrome', 'Peripheral neuropathy'],
  },

  'Palliative Care': {
    id: 'cp-palli', disease: 'Palliative Care', specialty: 'Oncology Care',
    overview: 'Palliative care focuses on improving the quality of life of patients and families facing life-limiting illness through prevention and relief of suffering by means of early identification, comprehensive assessment, and management of pain and other physical, psychosocial, and spiritual problems.',
    pathophysiology: 'Advanced progressive illness (cancer, organ failure, neurodegenerative disease) leads to multi-system decline, progressive functional impairment, cachexia, and symptom burden as death approaches.',
    commonCauses: ['Advanced cancer', 'End-stage heart failure or COPD', 'End-stage renal or liver disease', 'Advanced dementia', 'Motor neurone disease'],
    riskFactors: ['Advanced age', 'Metastatic malignancy', 'Multiple co-morbidities with functional decline', 'Recurrent hospital admissions for end-stage illness', 'Uncontrolled symptom burden'],
    subjectiveData: ['Pain (total pain: physical, emotional, spiritual)', 'Dyspnoea and air hunger', 'Fatigue and weakness', 'Nausea and loss of appetite', 'Existential distress and anxiety', 'Spiritual distress'],
    objectiveData: ['ECOG Performance Status 3-4 / Palliative Performance Scale (PPS) < 50%', 'Cachexia and muscle wasting', 'Dyspnoea at rest or minimal exertion', 'Respiratory pattern changes (Cheyne-Stokes)', 'Decreased level of consciousness (terminal phase)'],
    nursingDiagnoses: [
      { id: 'nd-pall-1', diagnosis: 'Chronic Pain or Acute Pain related to advanced disease progression as evidenced by verbal report of pain and restlessness', definingCharacteristics: ['Pain report', 'Restlessness', 'Grimacing', 'Tachycardia'] },
      { id: 'nd-pall-2', diagnosis: 'Compromised Family Coping related to impending death of family member as evidenced by emotional distress and crying', definingCharacteristics: ['Family distress', 'Exhaustion', 'Grief responses'] },
      { id: 'nd-pall-3', diagnosis: 'Risk for Impaired Comfort related to terminal symptom burden', definingCharacteristics: ['Dyspnoea', 'Dry mouth', 'Nausea', 'Agitation'] },
    ],
    goals: [
      { id: 'g-pall-1', shortTerm: 'Pain and symptoms effectively controlled (Comfort Score / ESAS optimised). Patient and family goals of care established. Advance care plan documented.', longTerm: 'Peaceful, dignified death in accordance with patient wishes. Family supported through bereavement.' },
    ],
    interventions: [
      { id: 'i-pall-1', category: 'dependent', action: 'Symptom management in end-of-life care: regular and breakthrough analgesia (morphine, oxycodone, fentanyl). Subcutaneous or IV route if oral route lost. Anticholinergics (glycopyrronium or hyoscine butylbromide) for terminal secretions (death rattle). Anti-emetics (levomepromazine, haloperidol) and sedatives (midazolam) via subcutaneous syringe driver (continuous infusion pump) for terminal restlessness or nausea.', rationale: 'Subcutaneous syringe drivers provide continuous, reliable symptom control when oral medications are no longer tolerated in the dying patient.', frequency: 'PRN breakthrough medications q1h; continuous syringe driver reviewed 24-hourly; ESAS symptom assessment daily' },
      { id: 'i-pall-2', category: 'independent', action: 'Comfort care measures: oral care q2h (moisten lips, sponge mouth, artificial saliva for xerostomia), regular repositioning with pressure-relieving mattress for skin integrity, gentle eye care, keep environment calm and quiet with soft lighting, encourage family presence and physical touch.', rationale: 'Basic comfort measures alleviate distressing terminal symptoms (dry mouth, pressure sores) and maintain dignity when active treatment ceases.', frequency: 'Oral care q2h; repositioning q2-4h; environmental adjustment continuously' },
      { id: 'i-pall-3', category: 'independent', action: 'Psychosocial and spiritual support: facilitate conversations about goals of care, advance care planning, and preferred place of care (home, hospice, hospital). Provide emotional support to patient and family. Inure chaplaincy or spiritual care as requested. Facilitate cultural and religious death rituals.', rationale: 'Addressing existential and spiritual distress promotes a peaceful transition and reduces complicated grief in surviving family members.', frequency: 'Daily check-in with patient and family; multi-disciplinary family meeting as needed' },
      { id: 'i-pall-4', category: 'independent', action: 'Care of the dying patient and post-mortem care: recognise signs of active dying (irregular breathing, cold extremities, mottling, diminished urinary output, altered breathing sounds). Educate family on normal dying process. Provide bereavement support and practical guidance post-death.', rationale: 'Educating family on the dying process reduces fear and anxiety. Respectful post-mortem care honours the deceased and supports family closure.', frequency: 'Continuous monitoring during active dying; bereavement follow-up post-death' },
    ],
    evaluation: [
      { id: 'e-pall-1', expected: 'Patient comfortable, pain-free, and calm (ESAS scores minimal). Family informed and supported. Peaceful death achieved according to patient wishes.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'End-of-Life Care Guidance for Family', keyPoints: ['Understand the signs of the dying process: cooling of hands/feet, changes in breathing pattern, sleeping more.', 'Moisten lips and mouth frequently with sponge swabs as swallowing decreases.', 'Soft music, familiar voices, and gentle touch provide comfort even when unresponsive.', 'Syringe drivers deliver continuous, pain-free symptom relief automatically.', 'Support is available 24/7 from the palliative care and hospice team.'], method: 'Verbal, written family guide on end-of-life care, bereavement support pamphlets' },
    ],
    dischargePlanning: { checklist: ['Preferred place of care established', 'Advance care plan and DNACPR documented', 'Syringe driver and end-of-life medication pack at home', 'District nurse and hospice community team notified', 'Equipment arranged (hospital bed, mattress)', 'Bereavement support contact provided'], followUp: 'District nurse daily visits at home. Hospice community nurse telephone support. Bereavement follow-up call at 4-6 weeks.', referrals: ['Palliative care team', 'Hospice services', 'District nursing', 'Social work / chaplaincy', 'Bereavement services'], warningSigns: ['Uncontrolled pain or agitation (administer PRN breakthrough medication and call palliative nurse)', 'Family distress or crisis', 'Difficulty breathing or severe respiratory secretions'] },
    complications: ['Uncontrolled terminal pain or dyspnoea', 'Terminal restlessness and agitation', 'Death rattle (secretions)', 'Family grief and complicated bereavement', 'Pressure injuries in terminal phase'],
  },

  'Hypertensive Disorders of Pregnancy': {
    id: 'cp-hyppreg', disease: 'Hypertensive Disorders of Pregnancy', specialty: 'Obstetric & Gynecological Care',
    overview: 'Hypertensive disorders of pregnancy (gestational hypertension, pre-eclampsia, eclampsia) are serious pregnancy complications characterised by high blood pressure and end-organ dysfunction. Nursing care focuses on BP monitoring, seizure prophylaxis, fetal monitoring, and timely delivery planning.',
    pathophysiology: 'Abnormal trophoblastic invasion of spiral arteries leads to placental ischaemia, release of anti-angiogenic factors (sFlt-1), systemic endothelial dysfunction, vasoconstriction, increased vascular permeability, and multi-organ hypoperfusion.',
    commonCauses: ['Abnormal placentation and spiral artery remodelling', 'Endothelial dysfunction', 'Genetic predisposition', 'Immune maladaptation'],
    riskFactors: ['Nulliparity', 'Previous pre-eclampsia', 'Chronic hypertension or renal disease', 'Diabetes mellitus', 'Multi-fetal gestation', 'Advanced maternal age (> 40)', 'BMI > 30', 'Autoimmune conditions (lupus, antiphospholipid syndrome)'],
    subjectiveData: ['Severe frontal headache', 'Visual disturbances (blurring, scotomata, photophobia)', 'Right upper quadrant or epigastric pain', 'Nausea and vomiting', 'Sudden facial and hand oedema', 'Decreased urine output'],
    objectiveData: ['Blood pressure ≥ 140/90 mmHg on two occasions 4 hours apart (severe: ≥ 160/110 mmHg)', 'Proteinuria ≥ 300 mg/24h or protein:creatinine ratio ≥ 30 mg/mmol', 'Hyperreflexia and clonus', 'Elevated LFTs, thrombocytopenia (< 100 x 10^9/L), elevated creatinine (HELLP features)', 'Fetal growth restriction or abnormal CTG'],
    nursingDiagnoses: [
      { id: 'nd-hp-1', diagnosis: 'Risk for Ineffective Cerebral Tissue Perfusion related to cerebral vasoconstriction and oedema in pre-eclampsia', definingCharacteristics: ['Severe headache', 'Visual changes', 'Hyperreflexia', 'Hypertension'] },
      { id: 'nd-hp-2', diagnosis: 'Risk for Injury (Fetal) related to reduced uteroplacental blood flow from maternal vasoconstriction', definingCharacteristics: ['Fetal growth restriction', 'Abnormal CTG', 'Oligohydramnios'] },
      { id: 'nd-hp-3', diagnosis: 'Excess Fluid Volume related to capillary leak and sodium/water retention', definingCharacteristics: ['Generalised oedema', 'Rapid weight gain', 'Pulmonary oedema risk'] },
    ],
    goals: [
      { id: 'g-hp-1', shortTerm: 'Blood pressure controlled (systolic 130-150, diastolic 80-100 mmHg). Seizures prevented. Fetal well-being confirmed. End-organ function monitored.', longTerm: 'Safe delivery of healthy infant. Maternal blood pressure normalised postpartum. No maternal or neonatal morbidity.' },
    ],
    interventions: [
      { id: 'i-hp-1', category: 'dependent', action: 'Antihypertensive therapy: administer labetalol (first-line, oral or IV), nifedipine (extended-release oral), or hydralazine (IV) for severe hypertension (BP ≥ 160/110 mmHg). Target BP: systolic 130-150 mmHg, diastolic 80-100 mmHg (avoid precipitous drops to maintain uteroplacental perfusion).', rationale: 'Acute control of severe hypertension prevents maternal cerebrovascular accidents (stroke) and placental abruption.', frequency: 'BP q15-30m during acute titration; q4h when stable; antihypertensives per protocol' },
      { id: 'i-hp-2', category: 'dependent', action: 'Magnesium sulphate administration for pre-eclampsia seizure prophylaxis: loading dose 4 g IV over 15-20 minutes, followed by maintenance infusion of 1 g/h IV. Monitor for magnesium toxicity hourly: loss of patellar reflexes, respiratory depression (< 12 breaths/min), oliguria (< 30 mL/h), serum Mg levels (therapeutic 2.0-3.5 mmol/L). Keep calcium gluconate (1 g IV) at bedside as antidote.', rationale: 'Magnesium sulphate reduces the risk of eclamptic seizures by 50% compared to placebo and is superior to other anticonvulsants.', frequency: 'Magnesium infusion continuous; hourly reflexes, respirations, urine output; Mg levels q6h' },
      { id: 'i-hp-3', category: 'independent', action: 'Maternal and fetal assessment: continuous electronic fetal monitoring (CTG) and kick counts. Monitor maternal intake/output strictly (indwelling urinary catheter for severe pre-eclampsia). Assess for pre-eclampsia symptoms (headache, visual changes, epigastric pain) q4h. Serial bloods: FBC, LFTs, renal function, uric acid, coag profile.', rationale: 'Strict fluid balance and close monitoring detect early signs of HELLP syndrome, renal failure, or pulmonary oedema. CTG assesses fetal well-being.', frequency: 'I/O hourly; symptoms q4h; bloods daily or twice daily; CTG per obstetric protocol' },
      { id: 'i-hp-4', category: 'independent', action: 'Delivery planning: timing of delivery depends on gestational age and maternal/fetal stability. Delivery indicated at 37 weeks for mild gestational hypertension/pre-eclampsia, or earlier (immediate delivery) for uncontrolleble hypertension, eclampsia, pulmonary oedema, placental abruption, or non-reassuring fetal status.', rationale: 'Definitive treatment of pre-eclampsia is delivery of the placenta. Balancing gestational age maturity against maternal risk guides timing.', frequency: 'Multidisciplinary obstetric/neonatal review daily' },
    ],
    evaluation: [
      { id: 'e-hp-1', expected: 'Blood pressure stabilised. No eclamptic seizures. Fetal well-being maintained. Safe delivery achieved without maternal organ damage.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Pre-eclampsia Awareness and Self-Management', keyPoints: ['Report severe headache, blurred vision, spots before eyes, or upper abdominal pain immediately.', 'Monitor blood pressure and urine protein as instructed at home.', 'Attend all antenatal appointments and fetal monitoring sessions.', 'Understand the signs of labour and when to return to hospital.', 'Postpartum: continue BP monitoring for several weeks as BP can rise after delivery.'], method: 'Verbal, written pre-eclampsia warning sign sheet, BP log sheet' },
    ],
    dischargePlanning: { checklist: ['Postpartum antihypertensive prescription if needed', 'Blood pressure monitoring schedule at home/GP', 'Pre-eclampsia warning signs education', 'Neonatal follow-up confirmed', 'Postnatal maternal review booked at 6 weeks'], followUp: 'GP blood pressure check at 5-7 days postpartum. Postnatal clinic review at 6 weeks. Cardiovascular risk review if chronic hypertension or recurrent pre-eclampsia.', referrals: ['Obstetrics/maternal-fetal medicine', 'Neonatology', 'GP', 'Cardiology if persistent hypertension'], warningSigns: ['Severe headache not responding to paracetamol', 'Visual disturbances (blurring, flashes)', 'Epigastric or right upper quadrant pain', 'Sudden swelling of face, hands, or feet', 'Decreased urine output'] },
    complications: ['Eclampsia (grand mal seizures)', 'HELLP syndrome', 'Placental abruption', 'Stroke / cerebral haemorrhage', 'Pulmonary oedema', 'Acute kidney injury', 'Fetal growth restriction and stillbirth'],
  },

  'Gestational Diabetes': {
    id: 'cp-gdm', disease: 'Gestational Diabetes', specialty: 'Obstetric & Gynecological Care',
    overview: 'Gestational diabetes mellitus (GDM) is carbohydrate intolerance diagnosed for the first time during pregnancy. Nursing care focuses on blood glucose monitoring, dietary management, insulin or oral agent titration, fetal surveillance, and prevention of macrosomia.',
    pathophysiology: 'Placental hormones (human placental lactogen, progesterone, cortisol) induce insulin resistance during the second and third trimesters. When maternal pancreatic insulin secretion cannot compensate, maternal hyperglycaemia occurs, crossing the placenta and causing fetal hyperinsulinaemia and macrosomia.',
    commonCauses: ['Placental hormone-induced insulin resistance', 'Inadequate maternal pancreatic beta-cell compensation'],
    riskFactors: ['BMI > 30', 'Previous GDM', 'Family history of diabetes (first-degree relative)', 'Previous macrosomia (baby > 4.5 kg)', 'Ethnicity (South Asian, Black, Hispanic, Indigenous)', 'Advanced maternal age (> 35)', 'PCOS'],
    subjectiveData: ['Polydipsia and polyuria (often mild or absent in GDM)', 'Fatigue', 'Blurred vision', 'History of recurrent thrush'],
    objectiveData: ['Oral Glucose Tolerance Test (OGTT) abnormal: fasting ≥ 5.1 mmol/L, 1-hour ≥ 10.0 mmol/L, or 2-hour ≥ 8.5 mmol/L', 'Capillary blood glucose above target (fasting > 5.3 mmol/L, 1-hour postprandial > 7.8 mmol/L)', 'Fetal macrosomia on ultrasound (abdominal circumference > 90th centile)', 'Polyhydramnios'],
    nursingDiagnoses: [
      { id: 'nd-gdm-1', diagnosis: 'Risk for Ineffective Blood Glucose Control related to pregnancy-induced insulin resistance', definingCharacteristics: ['Elevated blood glucose levels', 'Abnormal OGTT'] },
      { id: 'nd-gdm-2', diagnosis: 'Risk for Fetal Injury (Macrosomia, Birth Trauma) related to maternal hyperglycaemia and fetal hyperinsulinaemia', definingCharacteristics: ['Macrosomia on ultrasound', 'Polyhydramnios', 'Poor glycaemic control'] },
      { id: 'nd-gdm-3', diagnosis: 'Deficient Knowledge related to self-monitoring of blood glucose, carbohydrate counting, and insulin administration', definingCharacteristics: ['Unfamiliar with blood glucose targets', 'Unsure of carbohydrate choices'] },
    ],
    goals: [
      { id: 'g-gdm-1', shortTerm: 'Blood glucose levels within target range (fasting ≤ 5.3, 1-h postprandial ≤ 7.8 mmol/L). Dietary modification established. Self-monitoring technique mastered.', longTerm: 'Normoglycaemia maintained throughout pregnancy. Fetal growth appropriate for gestational age. Safe delivery without birth trauma.' },
    ],
    interventions: [
      { id: 'i-gdm-1', category: 'dependent', action: 'Blood glucose monitoring and pharmacotherapy: capillary blood glucose testing 4 times daily (fasting and 1 hour post-breakfast, lunch, dinner). If diet and exercise fail to maintain targets after 1-2 weeks (fasting > 5.3, postprandial > 7.8 mmol/L), initiate insulin therapy (basal-bolus or NPH/regular) or oral agents (metformin, glyburide as approved). Titrate insulin doses weekly based on glucose logs.', rationale: 'Strict glycaemic control prevents fetal hyperinsulinaemia, macrosomia, shoulder dystocia, and neonatal hypoglycaemia.', frequency: '4x daily blood glucose; weekly insulin titration; HbA1c monthly' },
      { id: 'i-gdm-2', category: 'independent', action: 'Dietary and lifestyle management: dietitian referral for individualized meal plan focusing on complex carbohydrates, consistent carbohydrate distribution, adequate fibre, and lean protein. Avoid simple sugars and sugary beverages. Encourage moderate postprandial exercise (15-30 minute walk after meals).', rationale: 'Medical nutrition therapy is the first-line treatment for GDM, controlling postprandial glycaemic excursions.', frequency: 'Daily dietary adherence; postprandial walks daily; dietitian review at 1-2 weeks' },
      { id: 'i-gdm-3', category: 'independent', action: 'Fetal surveillance: serial growth scans via ultrasound (every 3-4 weeks from 28-30 weeks) to monitor fetal abdominal circumference and amniotic fluid volume. Antenatal fetal surveillance (CTG or biophysical profile) starting at 36-38 weeks or earlier if poorly controlled.', rationale: 'Ultrasound surveillance detects macrosomia and polyhydramnios early, guiding timing and mode of delivery.', frequency: 'Growth scans q3-4w; CTG weekly from 36-38 weeks' },
      { id: 'i-gdm-4', category: 'independent', action: 'Labour and delivery planning: plan delivery between 38+0 and 39+6 weeks for well-controlled GDM (or earlier if poorly controlled or complications). Intrapartum blood glucose monitoring hourly; maintain maternal blood glucose 4.0-7.0 mmol/L using IV insulin and D5W infusion if needed. Neonatal blood glucose monitoring post-delivery to detect neonatal hypoglycaemia.', rationale: 'Prolonged pregnancy in GDM increases stillbirth and macrosomia risk. Intrapartum glucose control prevents neonatal hypoglycaemia.', frequency: 'Hourly intrapartum glucose; neonatal glucose at 2, 4, 6, 12 hours post-birth' },
    ],
    evaluation: [
      { id: 'e-gdm-1', expected: 'Blood glucose consistently within target range. Fetal growth appropriate for gestational age. Neonatal transition normal without hypoglycaemia.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Gestational Diabetes Self-Management', keyPoints: ['Test your blood glucose 4 times daily: fasting and 1 hour after each main meal.', 'Target glucose: fasting ≤ 5.3 mmol/L, 1-hour postprandial ≤ 7.8 mmol/L.', 'Carbohydrate awareness: choose whole grains, legumes, vegetables, and lean protein; avoid sugary foods and drinks.', 'Take 15-30 minute walks after meals to help lower blood glucose.', 'Learn how to inject insulin if prescribed and how to treat hypoglycaemia (fast-acting glucose).', 'Postpartum oral glucose tolerance test at 6-12 weeks is essential to check if diabetes has resolved.'], method: 'Verbal, written GDM guide, blood glucose logbook, carbohydrate counting leaflet' },
    ],
    dischargePlanning: { checklist: ['Blood glucose meter and test strips provided', 'Insulin prescription and injection technique verified (if applicable)', 'Postpartum glucose tolerance test scheduled at 6-12 weeks', 'Neonatal discharge instructions', 'Dietary follow-up plan'], followUp: 'Postpartum OGTT at 6-12 weeks. Annual diabetes screening with HbA1c thereafter (lifetime risk of Type 2 diabetes is 50%).', referrals: ['Obstetrics / endocrinology', 'Diabetes specialist nurse', 'Dietitian', 'Paediatrics / neonatology', 'GP'], warningSigns: ['Blood glucose persistently > 7.0 mmol/L fasting or > 10 mmol/L postprandial', 'Symptoms of hypoglycaemia (shakiness, sweating, confusion)', 'Decreased fetal movements', 'Signs of labour or pre-eclampsia'] },
    complications: ['Fetal macrosomia and birth trauma (shoulder dystocia)', 'Neonatal hypoglycaemia, respiratory distress, and jaundice', 'Polyhydramnios and preterm labour', 'Increased risk of Cesarean delivery', 'Future maternal development of Type 2 diabetes (50% risk)'],
  },

  'Labour & Delivery': {
    id: 'cp-labour', disease: 'Labour & Delivery', specialty: 'Obstetric & Gynecological Care',
    overview: 'Labour and delivery encompass the physiological process of childbirth, divided into three stages (dilation, expulsion, placental delivery). Nursing care focuses on maternal and fetal monitoring, pain management, progress assessment, and psychological support.',
    pathophysiology: 'Uterine contractions driven by oxytocin, prostaglandins, and uterotonin receptor up-regulation cause cervical effacement and dilation, followed by fetal descent through the pelvis and placental separation.',
    commonCauses: ['Spontaneous onset of labour at term (37-42 weeks)', 'Induction of labour for medical indications'],
    riskFactors: ['Nulliparity', 'Previous Cesarean delivery', 'Multi-fetal gestation', 'Fetal malpresentation (breech)', 'Hypertensive disorders', 'Gestational diabetes', 'Advanced maternal age'],
    subjectiveData: ['Regular painful uterine contractions', 'Show (mucus plug with blood)', 'Rupture of membranes (waters breaking)', 'Pelvic pressure and urge to push'],
    objectiveData: ['Uterine contractions regular and increasing in frequency/intensity', 'Cervical effacement and dilation on vaginal examination', 'Fetal heart rate baseline 110-160 bpm with normal variability and accelerations on CTG', 'Progress of descent of presenting part'],
    nursingDiagnoses: [
      { id: 'nd-lab-1', diagnosis: 'Acute Pain related to uterine contractions and cervical dilation as evidenced by facial expression, verbal report, and physiological stress responses', definingCharacteristics: ['Intense contractions', 'Pain scores 8-10', 'Tachycardia', 'Anxiety'] },
      { id: 'nd-lab-2', diagnosis: 'Risk for Fetal Injury related to uteroplacental hypoperfusion during contractions', definingCharacteristics: ['Fetal heart rate decelerations', 'Meconium-stained liquor', 'Prolonged second stage'] },
      { id: 'nd-lab-3', diagnosis: 'Risk for Deficient Fluid Volume related to restriction of oral intake and hyperventilation during labour', definingCharacteristics: ['Dry mucous membranes', 'Ketones in urine', 'Reduced urine output'] },
    ],
    goals: [
      { id: 'g-lab-1', shortTerm: 'Labour progress normal (cervical dilation ~1 cm/hour in active phase). Pain managed effectively. Fetal well-being maintained.', longTerm: 'Safe vaginal or Cesarean delivery of healthy infant. Minimum maternal trauma. Positive birth experience.' },
    ],
    interventions: [
      { id: 'i-lab-1', category: 'dependent', action: 'Pain management in labour: offer non-pharmacological methods (massage, water immersion, birth ball, hypnotherapy, breathing techniques). Pharmacological options: Entonox (nitrous oxide/oxygen), opioids (diamorphine or pethidine IM), and regional analgesia (epidural or spinal anaesthesia). Monitor maternal BP, respiration, and fetal heart rate following regional or systemic analgesia.', rationale: 'Pain management options range from non-pharmacological to neuraxial block (epidural), which provides the most effective pain relief without systemic sedative effects on the neonate.', frequency: 'Continuous pain assessment; analgesia administered per request and clinical status' },
      { id: 'i-lab-2', category: 'independent', action: 'Fetal monitoring and maternal assessment: continuous electronic fetal monitoring (CTG) or intermittent auscultation per risk stratification. Assess contraction frequency, duration, and intensity every 30 minutes in first stage, every 15 minutes in second stage. Vaginal examinations to assess cervical dilation, effacement, station, and membrane status (every 4 hours or when clinically indicated). Monitor maternal vital signs (BP, pulse, temperature q4h).', rationale: 'Regular monitoring detects fetal hypoxia or maternal deterioration early, allowing timely obstetric intervention.', frequency: 'Contractions q30m; vitals q4h; vag exams q4h; CTG continuous or q15m intermittent' },
      { id: 'i-lab-3', category: 'independent', action: 'Supportive care during labour: encourage upright positions, mobility, and birth ball use in first stage. Provide continuous emotional support and reassurance. Maintain hydration with clear oral fluids (isotonic sports drinks) or IV fluids if epidural in place. Encourage regular voiding every 2 hours (distended bladder obstructs fetal descent).', rationale: 'Upright posture shortens first stage of labour. Adequate hydration and bladder emptiness promote efficient uterine contractions and fetal descent.', frequency: 'Continuous supportive presence; offer fluids hourly; encourage voiding q2h' },
      { id: 'i-lab-4', category: 'independent', action: 'Second and third stage management: assist with maternal pushing during second stage. Prepare for delivery (sterile delivery pack, neonatal resuscitation equipment checked). Active management of third stage: administer oxytocin 10 IU IM/IV with delivery of anterior shoulder or immediately post-delivery, controlled cord traction, and uterine massage.', rationale: 'Active management of the third stage of labour reduces postpartum haemorrhage (PPH) risk by 60%.', frequency: 'Second stage pushing guidance; oxytocin at delivery; APGAR scoring at 1 and 5 minutes' },
    ],
    evaluation: [
      { id: 'e-lab-1', expected: 'Normal progression of labour. Effective pain management achieved. Healthy infant delivered with APGAR ≥ 8 at 5 minutes. No postpartum haemorrhage.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Labour and Delivery Guidance', keyPoints: ['Use relaxation and breathing techniques during contractions between pushes.', 'Stay hydrated and try to empty your bladder every 2 hours.', 'Communicate your pain relief preferences to your midwife (Entonox, epidural, etc.).', 'In the second stage, push with contractions as directed by your midwife.', 'Skin-to-skin contact with your baby immediately after birth supports bonding and breastfeeding.'], method: 'Verbal encouragement, birth plan review, positioning demonstrations' },
    ],
    dischargePlanning: { checklist: ['Postpartum maternal monitoring initiated (vital signs, lochia, fundus)', 'Neonatal APGAR and initial assessment documented', 'Skin-to-skin contact and early breastfeeding established', 'Vitamin K administered to neonate', 'Postnatal ward transfer completed'], followUp: 'Postnatal ward care for 24-48 hours. Midwife home visits post-discharge. Postnatal check at 6 weeks.', referrals: ['Obstetrics and Midwifery', 'Neonatology / Paediatrics', 'Lactation consultant / breastfeeding support', 'GP'], warningSigns: ['Heavy vaginal bleeding (soaking > 1 pad/hour or large clots)', 'Severe headache or visual changes', 'Fever or foul-smelling lochia', 'Severe perineal or abdominal pain', 'Difficulty establishing breastfeeding or infant lethargy'] },
    complications: ['Postpartum haemorrhage (PPH)', 'Fetal distress / hypoxia', 'Perineal tears (3rd/4th degree)', 'Uterine atony', 'Chorioamnionitis (infection)', 'Emergency Cesarean delivery', 'Birth asphyxia'],
  },

  'Postpartum Care': {
    id: 'cp-postpart', disease: 'Postpartum Care', specialty: 'Obstetric & Gynecological Care',
    overview: 'Postpartum care (the puerperium) spans the 6 weeks following childbirth, during which anatomical and physiological maternal changes return to the pre-pregnant state. Nursing care focuses on monitoring for postpartum haemorrhage, infection, perineal healing, lactation support, and mental health screening.',
    pathophysiology: 'Involution of the uterus occurs via uterine smooth muscle contraction and autolysis. Lochia (rubra, serosa, alba) is shed from the placental site. Lactogenesis is triggered by a drop in oestrogen/progesterone and surge in prolactin and oxytocin.',
    commonCauses: ['Physiological recovery from pregnancy and childbirth'],
    riskFactors: ['Postpartum haemorrhage risk (uterine atony, lacerations, retained products)', 'Cesarean delivery (infection, DVT risk)', 'Gestational diabetes or hypertension', 'History of depression or anxiety', 'Difficult or traumatic birth'],
    subjectiveData: ['Afterpains (uterine contractions)', 'Perineal or incision pain', 'Breast fullness and tenderness (engorgement)', 'Fatigue and sleep deprivation', 'Mood changes (baby blues vs postpartum depression)', 'Lochia progression'],
    objectiveData: ['Uterine fundus firm, midline, descending ~1 cm/day', 'Lochia rubra (days 1-3) transitioning to serosa then alba', 'Perineal wound clean, intact, minimal swelling', 'Cesarean incision clean and dry', 'Vital signs stable (BP, pulse, temp)', 'Breasts soft/full, milk coming in'],
    nursingDiagnoses: [
      { id: 'nd-pp-1', diagnosis: 'Risk for Bleeding (Postpartum Haemorrhage) related to uterine atony or retained placental tissue', definingCharacteristics: ['Boggy uterus', 'Heavy lochia (> 1 pad/hour)', 'Clots'] },
      { id: 'nd-pp-2', diagnosis: 'Acute Pain related to uterine involution, perineal trauma, or Cesarean incision', definingCharacteristics: ['Afterpains', 'Perineal pain', 'Incision pain', 'Pain score 4-7'] },
      { id: 'nd-pp-3', diagnosis: 'Ineffective Breastfeeding related to lack of knowledge or infant latch difficulties', definingCharacteristics: ['Sore nipples', 'Poor latch', 'Engorgement', 'Infant weight loss'] },
    ],
    goals: [
      { id: 'g-pp-1', shortTerm: 'Uterus firm and involuting normally. No postpartum haemorrhage. Perineal pain managed. Breastfeeding initiated successfully.', longTerm: 'Full maternal recovery without complications. Successful infant feeding and bonding. Postpartum mental health stable.' },
    ],
    interventions: [
      { id: 'i-pp-1', category: 'dependent', action: 'Postpartum haemorrhage monitoring and prevention: assess fundal height, consistency (firm vs boggy), and lochia amount/colour every 15 minutes for the first 2 hours, then hourly, then every 4-8 hours. If uterus is boggy or lochia heavy: perform fundal massage to stimulate contraction, administer uterotonins (oxytocin infusion, ergometrine, carboprost, or misoprostol) as prescribed, empty bladder (catheterise if needed), and notify obstetric team if bleeding persists (> 500 mL vaginal or > 1000 mL Cesarean).', rationale: 'Uterine atony is the cause of 70-80% of postpartum haemorrhages. Early recognition and fundal massage prevent life-threatening blood loss.', frequency: 'Q15m for 2h; q1h for 4h; q4-8h thereafter; fundus/lochia checks' },
      { id: 'i-pp-2', category: 'independent', action: 'Perineal and wound care: inspect perineum for haematoma, oedema, and suture integrity (REEDA scale: Redness, Oedema, Ecchymosis, Discharge, Approximation). Provide ice packs for perineal oedema in first 24 hours, warm sitz baths thereafter. Analgesia (paracetamol, ibuprofen). For Cesarean incisions: inspect dressing, keep clean and dry, remove sutures/staples per protocol.', rationale: 'Perineal hygiene and pain control promote healing and prevent infection (puerperal sepsis).', frequency: 'Perineal assessment q8h; analgesia scheduled; wound check daily' },
      { id: 'i-pp-3', category: 'independent', action: 'Lactation and breastfeeding support: assist with skin-to-skin contact, correct latch techniques, and positioning. Assess for engorgement, sore nipples, and mastitis. Recommend lanolin cream for sore nipples, warm compresses before feeding and cold compresses after feeding for engorgement. Lactation consultant referral if latch difficulties persist.', rationale: 'Early, effective breastfeeding support prevents mastitis, nipple trauma, and premature cessation of breastfeeding.', frequency: 'Breastfeeding support with every feed in hospital; lactation review daily' },
      { id: 'i-pp-4', category: 'independent', action: 'Postpartum mental health screening: screen for "baby blues" (tearfulness, mood lability in first week — normal) vs postpartum depression (persistent depressed mood, anhedonia, inability to care for infant beyond 2 weeks, using EPDS scale). Provide reassurance, involve family support, and refer to perinatal mental health team if score > 12 or suicidal ideation present.', rationale: 'Postpartum depression affects 10-15% of women and impacts maternal-infant bonding. Early screening enables prompt psychological intervention.', frequency: 'Daily mood check in hospital; EPDS screening at 2-6 weeks postpartum review' },
    ],
    evaluation: [
      { id: 'e-pp-1', expected: 'Uterus firm and involuting. Lochia normal progression. Perineal wound healing without infection. Breastfeeding established. Maternal mood stable.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Postpartum Self-Care and Recovery', keyPoints: ['Rest when baby sleeps; accept help with household chores.', 'Eat a balanced, nutritious diet and drink plenty of water, especially if breastfeeding.', 'Perineal hygiene: wash with warm water from a peri-bottle after using the toilet; change pads frequently.', 'Report heavy bleeding (soaking > 1 pad/hour), large clots, foul-smelling lochia, or fever.', 'Baby blues are common for a few days, but if low mood persists past 2 weeks, contact your GP or midwife.', 'Avoid heavy lifting, strenuous exercise, and sexual intercourse until cleared at your 6-week postnatal check.'], method: 'Verbal, written postpartum recovery guide, danger sign card' },
    ],
    dischargePlanning: { checklist: ['Postpartum recovery instructions and danger signs reviewed', 'Contraception discussion and prescription if desired', 'Baby\'s newborn screening and paediatric follow-up confirmed', 'Midwife community visit scheduled', 'Postnatal 6-week check booked with GP'], followUp: 'Midwife home visit at 3-5 days postpartum. GP postnatal check at 6 weeks. Perinatal mental health follow-up if indicated.', referrals: ['Community midwifery', 'GP', 'Health visitor / public health nurse', 'Lactation consultant', 'Perinatal mental health team if indicated'], warningSigns: ['Heavy vaginal bleeding (soaking pad in < 1 hour or passing golf-ball-sized clots)', 'Severe lower abdominal pain or foul-smelling discharge (infection)', 'Fever > 38°C or chills', 'Red, warm, painful area on breast with flu-like symptoms (mastitis)', 'Severe headache, visual changes, or chest pain (pre-eclampsia / PE)', 'Persistent depressed mood or thoughts of harming baby'] },
    complications: ['Postpartum haemorrhage (PPH)', 'Puerperal sepsis / endometritis', 'Mastitis and breast abscess', 'Perineal wound breakdown or haematoma', 'Postpartum depression and psychosis', 'Thromboembolism (DVT / PE)', 'Postpartum urinary retention or incontinence'],
  },

  'Neonatal Care': {
    id: 'cp-neonat', disease: 'Neonatal Care', specialty: 'Obstetric & Gynecological Care',
    overview: 'Neonatal care encompasses the immediate adaptation of the newborn to extrauterine life (transition) and ongoing care of healthy or premature/sick neonates. Nursing care focuses on thermoregulation, respiratory support, infection prevention, feeding establishment, and parental bonding.',
    pathophysiology: 'Transition from placental gas exchange and nutrition to independent cardiopulmonary and metabolic function requires closure of fetal shunts (foramen ovale, ductus arteriosus), clearance of lung fluid, and initiation of thermoregulation.',
    commonCauses: ['Normal newborn physiological transition', 'Prematurity (< 37 weeks gestation)', 'Neonatal sepsis', 'Birth asphyxia / hypoxic-ischaemic encephalopathy', 'Respiratory distress syndrome (RDS)', 'Neonatal jaundice (hyperbilirubinemia)'],
    riskFactors: ['Prematurity or low birth weight (< 2500 g)', 'Chorioamnionitis or prolonged rupture of membranes (> 18h)', 'Meconium-stained amniotic fluid', 'Gestational diabetes or maternal hypertension', 'Congenital anomalies', 'Difficult delivery / instrumentation'],
    subjectiveData: ['Poor feeding or refusal to feed', 'Lethargy or irritability', 'Breathing difficulty (grunting, flaring, retractions)', 'Jaundice (yellow skin/sclera)', 'Vomiting or abnormal stools'],
    objectiveData: ['Apgar score < 7 at 5 minutes', 'Tachypnoea (respiratory rate > 60 breaths/min), nasal flaring, intercostal retractions, expiratory grunting', 'Temperature instability (< 36.5°C or > 37.5°C)', 'Jaundice on Kramer scale or elevated serum bilirubin', 'Hypoglycaemia (blood glucose < 2.6 mmol/L)', 'Signs of sepsis (poor perfusion, lethargy, unstable temp)'],
    nursingDiagnoses: [
      { id: 'nd-neo-1', diagnosis: 'Ineffective Breathing Pattern / Gas Exchange related to immature lung development or retained lung fluid (RDS)', definingCharacteristics: ['Tachypnoea', 'Retractions', 'Cyanosis', 'Desaturations'] },
      { id: 'nd-neo-2', diagnosis: 'Risk for Ineffective Thermothermoregulation related to immature subcutaneous fat and large surface-to-mass ratio', definingCharacteristics: ['Hypothermia', 'Cold stress', 'Cool skin'] },
      { id: 'nd-neo-3', diagnosis: 'Risk for Infection related to immature neonatal immune system', definingCharacteristics: ['Prematurity', 'Invasive lines', 'Maternal infection risk factors'] },
    ],
    goals: [
      { id: 'g-neo-1', shortTerm: 'Successful cardiopulmonary transition. Normal temperature maintained (36.5-37.5°C). Respiratory distress managed. Feeding established.', longTerm: 'Optimal neonatal growth and development. Infection prevented. Successful discharge home with empowered parents.' },
    ],
    interventions: [
      { id: 'i-neo-1', category: 'independent', action: 'Immediate newborn stabilization and transition care: dry infant immediately with warm towels to prevent evaporative heat loss, place skin-to-skin on mother\'s chest or under radiant warmer. Clear airway gently if needed. APGAR scoring at 1 and 5 minutes. Administer Vitamin K (1 mg IM) to prevent haemorrhagic disease of the newborn and apply erythromycin eye ointment. Perform newborn physical examination.', rationale: 'Immediate thermoregulation and airway clearance ensure successful transition. Vitamin K prevents fatal neonatal bleeding.', frequency: 'Immediate birth care; APGAR at 1 and 5 min; Vitamin K within 1 hour of birth' },
      { id: 'i-neo-2', category: 'independent', action: 'Thermoregulation and vital sign monitoring: maintain neutral thermal environment (axillary temperature 36.5-37.5°C). Monitor vital signs (HR, RR, temp) every 30 minutes until stable, then every 4-8 hours. Prevent cold stress, which causes hypoxia, hypoglycaemia, and acidosis.', rationale: 'Neonates have high surface-to-mass ratio and lack brown adipose tissue if premature, making them highly susceptible to hypothermia and metabolic decompensation.', frequency: 'Temp q30m x 2h, then q4-8h; vitals per nursery protocol' },
      { id: 'i-neo-3', category: 'independent', action: 'Feeding establishment and nutritional support: encourage early initiation of breastfeeding within 1 hour of birth or formula feeding per parents\' choice. Assess latch, swallow, and infant satiety. Monitor output (wet diapers and stooling frequency). Supplemental feeding or gavage feeding if premature or unable to suck. Blood glucose monitoring for at-risk infants (infants of diabetic mothers, SGA, LGA, premature).', rationale: 'Early feeding establishes lactation, provides essential nutrients, and prevents neonatal hypoglycaemia and jaundice.', frequency: 'Feed every 2-3 hours on demand; monitor wet/dirty diapers daily; blood glucose per protocol' },
      { id: 'i-neo-4', category: 'dependent', action: 'Phototherapy for neonatal jaundice: assess for jaundice daily (transcutaneous bilirubin or serum bilirubin). If bilirubin exceeds threshold for gestational age, initiate phototherapy (blue light wavelength 460-490 nm). Shield infant eyes, maintain hydration, monitor temperature and bilirubin levels every 12-24 hours. Exchange transfusion for severe hyperbilirubinemia.', rationale: 'Phototherapy converts unconjugated bilirubin into water-soluble isomers (lumirubin) that can be excreted in bile and urine, preventing bilirubin encephalopathy (kernicterus).', frequency: 'Bilirubin checks daily; phototherapy continuous with feed breaks; eye shielding at all times' },
    ],
    evaluation: [
      { id: 'e-neo-1', expected: 'Stable vital signs and normal temperature. Effective feeding established. Jaundice resolved or controlled. Parents confident in newborn care.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Newborn Care and Parent Guidance', keyPoints: ['Feeding: feed baby on demand, approximately every 2-3 hours (8-12 feeds in 24 hours).', 'Diapers: expect 6+ wet diapers and regular yellow stools by day 4-5 of life.', 'Sleeping: always place baby on their back to sleep on a firm, flat mattress in a cot (SIDS prevention). Do not co-sleep on sofas.', 'Temperature: dress baby in one more layer than you wear; keep room at comfortable temperature (18-20°C).', 'Jaundice: report yellowing of skin or eyes, extreme lethargy, or poor feeding immediately.', 'Umbilical cord: keep clean and dry; let it fall off naturally (usually 1-3 weeks).'], method: 'Verbal, written newborn care booklet, safe sleep demonstration, discharge class' },
    ],
    dischargePlanning: { checklist: ['Newborn physical examination completed', 'Hearing screening and newborn blood spot (heel prick) test done', 'Vitamin K administration documented', 'Safe sleep education completed', 'Car seat safety check', 'GP and health visitor notification'], followUp: 'Health visitor home visit at 7-10 days. GP 6-week postnatal check. Weight check at 10-14 days.', referrals: ['Paediatrics / Neonatology', 'Health visitor / Public health nurse', 'Lactation consultant if feeding issues', 'GP'], warningSigns: ['Poor feeding or refusal to feed for > 2-3 feeds', 'Fever > 38°C or hypothermia (< 36.5°C)', 'Persistent vomiting or green (bilious) vomit', 'Breathing difficulty (fast breathing, grunting, chest retractions)', 'Jaundice spreading to palms and soles or worsening after 2 weeks', 'Lethargy or difficulty waking baby'] },
    complications: ['Neonatal respiratory distress syndrome (RDS)', 'Neonatal sepsis and meningitis', 'Hypoxic-ischaemic encephalopathy (HIE)', 'Severe hyperbilirubinemia and kernicterus', 'Hypoglycaemia and hypothermia', 'Sudden Infant Death Syndrome (SIDS)', 'Necrotising enterocolitis (NEC in preterm)'],
  },

  'Polypharmacy': {
    id: 'cp-polypharm', disease: 'Polypharmacy', specialty: 'Geriatric & Palliative Care',
    overview: 'Polypharmacy (commonly defined as the concurrent use of 5 or more medications) is prevalent in older adults and carries high risk of drug-drug interactions, adverse drug reactions, falls, and cognitive impairment. Nursing care focuses on medication reconciliation, screening for potentially inappropriate medications (Beers criteria), and supporting medication optimisation.',
    pathophysiology: 'Age-related changes in pharmacokinetics (decreased renal clearance, hepatic metabolism, body water, increased body fat) and pharmacodynamics (increased sensitivity to CNS agents, anticholinergics) heighten susceptibility to drug toxicity.',
    commonCauses: ['Multiple co-morbidities requiring disease-specific guidelines', 'Prescribing cascade (treating side effects as new conditions)', 'Multiple prescribing clinicians without coordination'],
    riskFactors: ['Age ≥ 65 years', 'Multiple chronic conditions', 'Visits to multiple specialists', 'Cognitive impairment', 'History of non-adherence', 'Frailty'],
    subjectiveData: ['Confusion or worsening memory (anticholinergic burden)', 'Dizziness and orthostatic hypotension (fall risk)', 'Fatigue or excessive daytime somnolence', 'Gastrointestinal upset or nausea', 'Unexplained falls or cognitive decline'],
    objectiveData: ['Concurrent use of ≥ 5 medications', 'Beers criteria or STOPP/START criteria flags', 'Orthostatic drop in blood pressure', 'Elevated anticholinergic cognitive burden score', 'Impaired renal function (eGFR < 60 mL/min)'],
    nursingDiagnoses: [
      { id: 'nd-poly-1', diagnosis: 'Risk for Adverse Drug Reaction related to altered pharmacokinetics and complex medication regimen', definingCharacteristics: ['Polypharmacy (≥ 5 drugs)', 'Beers criteria medications', 'Renal impairment'] },
      { id: 'nd-poly-2', diagnosis: 'Risk for Injury (Falls, Confusion) related to sedative, hypotensive, and anticholinergic medication side effects', definingCharacteristics: ['Sedative use', 'Orthostatic hypotension', 'History of falls'] },
      { id: 'nd-poly-3', diagnosis: 'Ineffective Health Management related to complex dosing schedules and cognitive impairment', definingCharacteristics: ['Missed doses', 'Incorrect timing', 'Confusion over pill bottles'] },
    ],
    goals: [
      { id: 'g-poly-1', shortTerm: 'Medication reconciliation completed. Potentially inappropriate medications identified. Adverse drug reactions assessed.', longTerm: 'Medication regimen streamlined (deprescribing where appropriate). Fall risk reduced. Patient/carer educated on medication schedule.' },
    ],
    interventions: [
      { id: 'i-poly-1', category: 'independent', action: 'Medication reconciliation and review: obtain complete, accurate medication history including OTC drugs, herbals, and supplements. Review regimen using Beers criteria or STOPP/START screening tools to identify potentially inappropriate medications (PIMs), unnecessary duplication, or missing preventive drugs.', rationale: 'Systematic medication review identifies 30-50% inappropriate prescribing in older adults, reducing adverse drug events and hospital readmissions.', frequency: 'At admission, transfer, and discharge; multidisciplinary review with pharmacist and physician' },
      { id: 'i-poly-2', category: 'dependent', action: 'Deprescribing and titration: collaborate with geriatrician and pharmacist to deprescribe medications where risks outweigh benefits (e.g. stopping PPIs without indication, reducing benzodiazepines or anticholinergics, stopping statins in terminal palliative phase). Taper medications gradually to prevent withdrawal or rebound effects.', rationale: 'Deprescribing reduces pill burden, anticholinergic load, fall risk, and cognitive impairment in older adults without compromising disease control.', frequency: 'Gradual tapering per protocol; monitor withdrawal symptoms weekly' },
      { id: 'i-poly-3', category: 'independent', action: 'Fall risk and adverse reaction monitoring: assess for drug-induced sedation, dizziness, orthostatic hypotension, and confusion. Monitor renal function (eGFR) and electrolytes, especially with diuretics, ACE-I/ARBs, and NSAIDs. Educate patient and carer on warning signs of drug toxicity.', rationale: 'Older adults are disproportionately affected by drug-induced falls and acute kidney injury due to age-related physiological decline.', frequency: 'Daily adverse effect screening; baseline and follow-up renal panel' },
      { id: 'i-poly-4', category: 'independent', action: 'Simplify medication regimen: collaborate with pharmacist to consolidate dosing times (once-daily formulations), use blister packs (dosette boxes/multidose pill organisers), large-print labels, and clear administration charts.', rationale: 'Simplifying regimens improves adherence by 20-35% in older adults with complex regimens or mild cognitive impairment.', frequency: 'Implemented at discharge; reviewed at GP follow-up' },
    ],
    evaluation: [
      { id: 'e-poly-1', expected: 'Medication count reduced or streamlined. No adverse drug reactions or falls. Patient/carer managing simplified blister pack successfully.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Medication Safety and Polypharmacy Management', keyPoints: ['Bring an updated list of all medications, OTC drugs, and supplements to every doctor visit.', 'Use a blister pack or pill organiser to keep track of daily doses.', 'Never stop prescription medications abruptly without talking to your doctor.', 'Report new dizziness, confusion, drowsiness, or stomach upset immediately.', 'Review all your medications with your pharmacist or doctor at least once a year.'], method: 'Verbal, written medication schedule, blister pack demonstration' },
    ],
    dischargePlanning: { checklist: ['Streamlined discharge medication summary', 'Dosette box / blister pack dispensed', 'Deprescribing plan communicated to GP', 'Medication reconciliation completed', 'Carer education on simplified regimen'], followUp: 'GP medication review in 2-4 weeks post-discharge. Geriatrician or pharmacist follow-up if complex.', referrals: ['Geriatrician / Clinical Pharmacist', 'GP', 'District nursing for medication administration support if needed', 'Social work for pill organiser support'], warningSigns: ['Sudden confusion or worsening memory', 'Dizziness, lightheadedness, or fainting (falls risk)', 'Severe fatigue or excessive daytime sleepiness', 'Unexplained nausea, vomiting, or diarrhoea', 'New rash or swelling'] },
    complications: ['Adverse drug reactions and drug-drug interactions', 'Falls and traumatic fractures', 'Drug-induced cognitive impairment and delirium', 'Acute kidney injury', 'Medication non-adherence and hospital readmission'],
  },

  'Frailty': {
    id: 'cp-frailty', disease: 'Frailty', specialty: 'Geriatric & Palliative Care',
    overview: 'Frailty is a clinically recognisable state of increased vulnerability resulting from age-associated decline in reserve and function across multiple physiological systems, leaving the person unable to cope with minor stressors. Nursing care focuses on comprehensive geriatric assessment (CGA), nutrition, mobility, and prevention of hospital-associated deconditioning.',
    pathophysiology: 'Cumulative multisystem decline (sarcopenia, immunosenescence, endocrine dysregulation, chronic low-grade inflammation) leads to reduced physiological reserve, impaired homeostatic mechanisms, and high vulnerability to adverse outcomes.',
    commonCauses: ['Advanced age', 'Sarcopenia (age-related muscle loss)', 'Chronic disease burden', 'Malnutrition', 'Sedentary lifestyle'],
    riskFactors: ['Age > 80 years', 'Multiple chronic conditions', 'Low BMI / malnutrition', 'Social isolation', 'Previous falls', 'Cognitive impairment', 'Polypharmacy'],
    subjectiveData: ['Generalised weakness and exhaustion', 'Slow walking speed and reduced mobility', 'Unintentional weight loss', 'Frequent falls', 'Reduced physical activity'],
    objectiveData: ['Clinical Frailty Scale (CFS) score 5-9', 'Fried Frailty Phenotype criteria met (weakness, slow gait, exhaustion, weight loss, low activity)', 'Handgrip weakness (dynamometer)', 'Timed Up and Go (TUG) test prolonged', 'Low serum albumin / malnutrition indicators'],
    nursingDiagnoses: [
      { id: 'nd-frail-1', diagnosis: 'Risk for Frailty Syndrome / Deconditioning related to multisystem physiological reserve depletion', definingCharacteristics: ['Clinical Frailty Scale ≥ 5', 'Sarcopenia', 'Exhaustion'] },
      { id: 'nd-frail-2', diagnosis: 'Risk for Falls related to muscle weakness, impaired balance, and gait instability', definingCharacteristics: ['History of falls', 'Grip weakness', 'Unsteady gait'] },
      { id: 'nd-frail-3', diagnosis: 'Imbalanced Nutrition: Less Than Body Requirements related to anorexia, fatigue, and functional disability', definingCharacteristics: ['Weight loss', 'Low BMI', 'Poor oral intake'] },
    ],
    goals: [
      { id: 'g-frail-1', shortTerm: 'Comprehensive Geriatric Assessment completed. Nutritional support initiated. Mobility encouraged safely. Acute stressors managed.', longTerm: 'Maximal functional independence maintained. Falls prevented. Quality of life optimised. Frailty progression slowed.' },
    ],
    interventions: [
      { id: 'i-frail-1', category: 'independent', action: 'Comprehensive Geriatric Assessment (CGA): multidisciplinary evaluation addressing physical health, functional ability, cognition, mental health, polypharmacy, and social/environmental circumstances. Develop individualised care plan based on CGA findings.', rationale: 'CGA is the gold standard of care for frail older adults, improving survival, independence, and reducing nursing home admissions by 25-30%.', frequency: 'Comprehensive assessment at admission; multidisciplinary review weekly' },
      { id: 'i-frail-2', category: 'independent', action: 'Nutritional optimisation: dietitian referral for high-calorie, high-protein diet and oral nutritional supplements (ONS). Assist with feeding at mealtimes, ensure comfortable upright dining position, provide adaptive cutlery, and respect food preferences. Monitor weight weekly.', rationale: 'Malnutrition affects 30-50% of frail hospitalised older adults. Protein supplementation combined with exercise combats sarcopenia.', frequency: 'Daily intake monitoring; weekly weight; dietitian review within 48h of admission' },
      { id: 'i-frail-3', category: 'independent', action: 'Early mobilisation and exercise: physiotherapy referral for progressive resistance exercise and balance training ( Otago exercise programme). Prevent hospital-associated deconditioning: avoid bedrest, encourage sitting out of bed for meals, walk corridors with assistance as soon as medically stable.', rationale: 'Bedrest in frail older adults causes rapid muscle loss (up to 5% muscle mass loss per day). Early mobilisation preserves functional independence.', frequency: 'Daily mobilisation; physiotherapy assessment within 24h of admission' },
      { id: 'i-frail-4', category: 'independent', action: 'Multifactorial fall prevention: medication review (deprescribe sedatives and hypotensives), vision check, footwear assessment, environmental hazard removal, appropriate walking aids, and hip protectors for high-risk patients.', rationale: 'Frail older adults have high fall rates. Multifactorial interventions reduce fall incidence by 20-30%.', frequency: 'Daily fall risk assessment; environmental check on admission and ongoing' },
    ],
    evaluation: [
      { id: 'e-frail-1', expected: 'Nutritional intake improved with weight stabilisation. Mobilising safely with physiotherapy support. No falls during hospital stay. CGA care plan established.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Frailty Management and Strength Preservation', keyPoints: ['Stay active: perform gentle resistance and balance exercises daily to maintain muscle strength.', 'Eat protein-rich foods (meat, fish, eggs, dairy, beans) and fortify meals with extra calories if appetite is low.', 'Get up and move regularly — avoid staying in bed all day.', 'Use walking aids as recommended by your physiotherapist to prevent falls.', 'Ask for help when needed with heavy tasks or shopping.'], method: 'Verbal, written exercise and nutrition guide for older adults' },
    ],
    dischargePlanning: { checklist: ['Comprehensive Geriatric Assessment summary forwarded to GP', 'Physiotherapy exercise programme provided', 'Dietitian nutritional plan and ONS arranged', 'Home care package / social services evaluated', 'Aids and adaptations installed at home'], followUp: 'Geriatrician outpatient or day hospital review in 4-6 weeks. GP follow-up within 1 week of discharge.', referrals: ['Geriatric medicine / CGA team', 'Physiotherapy and occupational therapy', 'Dietitian', 'Social services / care package coordinator', 'Falls clinic'], warningSigns: ['Sudden decline in functional ability or mobility', 'New confusion or delirium', 'Unintentional weight loss or cessation of eating', 'Frequent falls or injury', 'Carer exhaustion or crisis'] },
    complications: ['Hospital-associated deconditioning and loss of independence', 'Falls and fragility fractures', 'Malnutrition and sarcopenia', 'Delirium', 'Institutionalisation (nursing home admission)', 'Increased 1-year mortality'],
  },

  'Delirium': {
    id: 'cp-delirium', disease: 'Delirium', specialty: 'Geriatric & Palliative Care',
    overview: 'Delirium is an acute, fluctuating confusional state characterised by disturbance in attention, awareness, and cognition. It is a medical emergency frequently triggered by underlying medical illness, infection, or medication toxicity in vulnerable older adults. Nursing care focuses on identifying triggers, non-pharmacological reorientation, and safety.',
    pathophysiology: 'Complex multifactorial neurochemical imbalance (neurotransmitter deficiency such as acetylcholine, excess dopamine/serotonin, neuroinflammation, and cerebral hypoperfusion) disrupting cortical and subcortical pathways.',
    commonCauses: ['Infection (UTI, chest infection)', 'Medication toxicity (anticholinergics, sedatives, opioids)', 'Metabolic derangements (electrolyte imbalance, hypoxia, uraemia)', 'Pain or urinary retention', 'Constipation', 'Sensory deprivation (deafness, blindness)'],
    riskFactors: ['Age ≥ 65 years', 'Pre-existing dementia or cognitive impairment', 'Previous delirium', 'Sensory impairment (vision/hearing loss)', 'Severe illness or multi-morbidity', 'Polypharmacy', 'Sleep deprivation'],
    subjectiveData: ['Acute onset of confusion or altered mental status', 'Fluctuating course throughout the day (worse at sundown)', 'Hallucinations or delusions', 'Disturbed sleep-wake cycle'],
    objectiveData: ['Positive Confusion Assessment Method (CAM) screen (acute onset/fluctuating course + inattention + altered level of consciousness or disorganised thinking)', 'Hyperactive (agitated, restless), hypoactive (withdrawn, lethargic), or mixed motor subtypes', 'Disorientation to time and place', 'Impaired attention span'],
    nursingDiagnoses: [
      { id: 'nd-del-1', diagnosis: 'Acute Confusion related to underlying physiological disturbance (infection, metabolic imbalance, medication toxicity) as evidenced by positive CAM screen', definingCharacteristics: ['Acute onset confusion', 'Inattention', 'Disorientation', 'Fluctuating course'] },
      { id: 'nd-del-2', diagnosis: 'Risk for Injury related to agitation, restlessness, and impaired judgement', definingCharacteristics: ['Wandering', 'Removing IV lines/catheters', 'Falls risk'] },
      { id: 'nd-del-3', diagnosis: 'Sleep Pattern Disturbance related to environmental noise, illness, and circadian disruption', definingCharacteristics: ['Day-night reversal', 'Frequent night waking', 'Agitation at night'] },
    ],
    goals: [
      { id: 'g-del-1', shortTerm: 'Underlying trigger identified and treated. Patient safe from injury. Non-pharmacological reorientation implemented.', longTerm: 'Resolution of delirium and return to baseline cognitive function. Prevention of complications (falls, pressure ulcers).' },
    ],
    interventions: [
      { id: 'i-del-1', category: 'independent', action: 'Delirium screening and trigger identification: screen all at-risk patients using CAM or 4AT tool at least daily. Investigate underlying medical causes: check urinalysis/cultures for UTI, chest X-ray, blood gas (hypoxia), electrolytes, calcium, glucose, renal/liver function, and review medication chart for deliriogenic drugs (anticholinergics, benzodiazepines, opioids).', rationale: 'Delirium is a symptom of organic illness. Identifying and treating the root cause (infection, hypoxia, drug toxicity) is the cornerstone of management.', frequency: 'CAM screening daily; urgent medical investigation upon acute confusion onset' },
      { id: 'i-del-2', category: 'independent', action: 'Non-pharmacological reorientation and environment: implement Hospital Elder Life Program (HELP) strategies. Reorient frequently (clock, calendar, nurse introduction), use calm, reassuring voice, keep familiar personal items and family photos nearby. Ensure sensory aids (glasses, hearing aids) are worn. Maintain normal day-night cycle (open blinds in daytime, dim lights and reduce noise at night).', rationale: 'Non-pharmacological multicomponent interventions reduce delirium incidence by 30-50% and are safer than antipsychotics.', frequency: 'Reorientation every interaction; environmental adjustments day and night' },
      { id: 'i-del-3', category: 'independent', action: 'Safety and least restrictive care: maintain patient safety without physical restraints (restraints worsen agitation and delirium). Use bed alarms, low beds, sensor mats, and 1:1 supervision (special observer) if patient is at high risk of falls or pulling out lines/catheters. Mobilise early.', rationale: 'Physical restraints increase agitation, injury risk, and mortality in delirium. Observation and environmental modifications are safer.', frequency: 'Continuous safety monitoring; hourly rounding' },
      { id: 'i-del-4', category: 'dependent', action: 'Pharmacological management (last resort): if severe agitation poses an immediate danger to self or others and non-pharmacological measures fail, administer low-dose atypical antipsychotic (haloperidol 0.5 mg oral/IM, or quetiapine 25 mg) as prescribed. Avoid benzodiazepines (except for alcohol or sedative withdrawal). Review and discontinue ASAP.', rationale: 'Antipsychotics do not shorten delirium duration but control severe agitation that threatens safety. Benzodiazepines worsen delirium.', frequency: 'As-needed (PRN) for severe agitation; daily medical review for cessation' },
    ],
    evaluation: [
      { id: 'e-del-1', expected: 'Underlying cause treated. CAM score negative (cognitive function returned to baseline). Patient calm and safe without physical restraints.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Understanding Delirium for Families', keyPoints: ['Delirium is an acute, temporary confusional state caused by physical illness, infection, or medication.', 'It often fluctuates, with patients being more confused or agitated in the evening ("sundowning").', 'Family presence and reassurance are powerful tools — bring familiar photos, clocks, and glasses.', 'Reorient gently — do not argue with hallucinations or false beliefs; instead, reassure and validate feelings.', 'Delirium usually resolves once the underlying medical cause is treated.'], method: 'Verbal to family, written delirium information leaflet for carers' },
    ],
    dischargePlanning: { checklist: ['Underlying trigger fully investigated and treated', 'Delirium resolution confirmed by negative CAM', 'Medication review completed (deliriogenic drugs stopped)', 'Family debriefed on delirium episode', 'GP informed of delirium history'], followUp: 'GP review in 1-2 weeks. Cognitive reassessment in 3 months (dementia screening if cognitive deficit persists).', referrals: ['Geriatric medicine', 'Old age psychiatry / mental health liaison', 'GP', 'Memory clinic if cognitive impairment persists'], warningSigns: ['Sudden recurrence of acute confusion or agitation', 'Inability to eat or drink', 'Fever or signs of new infection', 'Persistent cognitive decline not returning to baseline'] },
    complications: ['Prolonged hospital stay and institutionalisation', 'Falls and physical injury', 'Aspiration pneumonia', 'Pressure injuries', 'Long-term cognitive decline / dementia unmasking', 'Increased mortality'],
  },

  'Cardiac Arrest': {
    id: 'cp-cardiac', disease: 'Cardiac Arrest', specialty: 'Emergency & Critical Care',
    overview: 'Cardiac arrest is the abrupt cessation of cardiac mechanical activity resulting in unresponsiveness, absence of arterial pulse, and apnea. Nursing care focuses on immediate Basic Life Support (BLS), Advanced Life Support (ALS) support, defibrillation, emergency medication administration, and post-resuscitation care.',
    pathophysiology: 'Sudden cessation of effective blood flow due to lethal arrhythmias (ventricular fibrillation, pulseless ventricular tachycardia) or non-shockable rhythms (pulseless electrical activity, asystole), leading to immediate global cerebral and myocardial ischaemia.',
    commonCauses: ['Acute myocardial infarction / coronary artery disease', 'Lethal arrhythmias (VF/pVT)', 'Hypovolaemia, hypoxia, hydrogen ions (acidosis)', 'Hypo/hyperkalaemia, hypothermia', 'Tension pneumothorax, tamponade (cardiac), toxins, thrombosis (pulmonary/coronary)', 'Severe heart failure'],
    riskFactors: ['Known coronary artery disease or previous MI', 'Heart failure with reduced ejection fraction', 'Severe electrolyte imbalance', 'Long QT syndrome', 'Previous cardiac arrest', 'Severe hypoxia or shock'],
    subjectiveData: ['Sudden collapse and loss of consciousness', 'Unresponsiveness to verbal and painful stimuli', 'No normal breathing (gasping or agonal breathing)'],
    objectiveData: ['Absence of carotid or femoral pulse', 'Apnea or agonal gasps', 'Cyanosis or pallor', 'ECG rhythm: VF, pVT, PEA, or asystole', 'Unresponsive pupil reflex (late sign)'],
    nursingDiagnoses: [
      { id: 'nd-ca-1', diagnosis: 'Decreased Cardiac Output / ineffective tissue perfusion related to cessation of cardiac mechanical activity as evidenced by pulselessness and collapse', definingCharacteristics: ['Cardiac arrest', 'No pulse', 'Unresponsive', 'Apnea'] },
      { id: 'nd-ca-2', diagnosis: 'Spontaneous Ventilation Impairment related to respiratory arrest', definingCharacteristics: ['Apnea', 'Agonal breathing', 'Cyanosis'] },
      { id: 'nd-ca-3', diagnosis: 'Risk for Cerebral Tissue Perfusion Ineffective related to global brain ischaemia during cardiac arrest', definingCharacteristics: ['Cardiac arrest', 'Prolonged downtime', 'Coma post-resuscitation'] },
    ],
    goals: [
      { id: 'g-ca-1', shortTerm: 'Immediate CPR initiated within 10 seconds. Defibrillation delivered within 3 minutes for shockable rhythms. Return of spontaneous circulation (ROSC) achieved.', longTerm: 'Post-resuscitation care optimised. Targeted temperature management (TTM) implemented. Neurological recovery maximised.' },
    ],
    interventions: [
      { id: 'i-ca-1', category: 'independent', action: 'Immediate Resuscitation (BLS/ALS): shout for help, press emergency/arrest buzzer, check responsiveness and breathing. Start high-quality chest compressions immediately (rate 100-120/min, depth 5-6 cm, minimal interruption, allow full recoil). Attach AED/defibrillator as soon as available, analyse rhythm. Deliver shock if shockable (VF/pVT), resume CPR immediately for 2 minutes. Secure airway (bag-valve-mask or advanced airway endotracheal intubation) and high-flow oxygen.', rationale: 'Immediate high-quality CPR and early defibrillation are the single most important determinants of survival from cardiac arrest (doubles or triples survival).', frequency: 'Continuous chest compressions and ventilation cycles (30:2 or continuous with advanced airway)' },
      { id: 'i-ca-2', category: 'dependent', action: 'Advanced Life Support (ALS) medication administration: establish IV/IO access. Administer adrenaline 1 mg IV every 3-5 minutes (immediately for non-shockable; after 3rd shock for shockable). Administer amiodarone 300 mg IV after 3rd shock for refractory VF/pVT (repeat 150 mg after 5th shock). Identify and treat reversible causes (4Hs and 4Ts: Hypoxia, Hypovolaemia, Hydrogen ion, Hypo/hyperkalaemia, Hypothermia, Tension pneumothorax, Tamponade, Toxins, Thrombosis).', rationale: 'Adrenaline promotes coronary and cerebral perfusion via vasoconstriction. Amiodarone is an antiarrhythmic for shock-resistant VF/pVT. Reversing H\'s and T\'s treats underlying precipitant.', frequency: 'Adrenaline every 3-5 min during arrest; amiodarone post-3rd and 5th shocks' },
      { id: 'i-ca-3', category: 'independent', action: 'Post-resuscitation care (ROSC): once ROSC is achieved, monitor vital signs, 12-lead ECG (identify ST-elevation myocardial infarction for emergent PCI), arterial blood gas, chest X-ray. Targeted temperature management (TTM): maintain core temperature between 32-36°C for 24 hours using cooling devices to prevent hypoxic-ischaemic brain injury. Maintain MAP > 65 mmHg with vasopressors/inotropes (noradrenaline, dobutamine).', rationale: 'Post-resuscitation care prevents secondary brain injury (via TTM and normoxia/normotension) and treats the underlying trigger (e.g., primary PCI for STEMI).', frequency: 'Continuous monitoring post-ROSC; temperature monitoring q1h; ABG serial checks' },
      { id: 'i-ca-4', category: 'independent', action: 'Critical care monitoring and family support: continuous invasive arterial pressure monitoring, central venous pressure, end-tidal CO2, urine output (indwelling catheter). Provide compassionate support and communication to family members (allow family presence during resuscitation if desired).', rationale: 'Invasive monitoring guides goal-directed haemodynamic therapy. Family presence during resuscitation aids grief and closure.', frequency: 'Continuous critical care monitoring; family updates by medical/nursing team' },
    ],
    evaluation: [
      { id: 'e-ca-1', expected: 'ROSC achieved. Stable haemodynamics (MAP > 65). Targeted temperature management initiated. Underlying cause identified and treated.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Post-Cardiac Arrest Recovery Education (for Patient and Family)', keyPoints: ['Explanation of cardiac arrest resuscitation and post-resuscitation intensive care unit (ICU) management.', 'Targeted temperature management and neurological monitoring phase.', 'Investigation of underlying cause (angiogram for coronary blockages, electrophysiology studies).', 'Implantable cardioverter-defibrillator (ICD) counseling if indicated.', 'Cardiac rehabilitation programme enrolment post-discharge.'], method: 'Verbal and written ICU family guide, cardiology consultation, cardiac rehab referral' },
    ],
    dischargePlanning: { checklist: ['Cardiology investigation completed (PCI, echo, electrophysiology)', 'ICD device implanted and tested (if indicated)', 'Cardiac rehabilitation program scheduled', 'Medication regimen optimised (beta-blockers, statins, antiplatelets)', 'Follow-up appointments booked with cardiology'], followUp: 'Cardiology clinic in 2-4 weeks. Cardiac rehabilitation sessions starting 4-6 weeks post-discharge. ICD check at 6 weeks.', referrals: ['Cardiology / Electrophysiology', 'Critical care follow-up clinic', 'Cardiac rehabilitation', 'ICD specialist nurse', 'Implantable device clinic'], warningSigns: ['Chest pain, palpitations, or shortness of breath', 'Dizziness, lightheadedness, or fainting', 'ICD device firing or beeping', 'Signs of heart failure (swelling, dyspnoea)'] },
    complications: ['Anoxic brain injury / hypoxic-ischaemic encephalopathy', 'Rib fractures and sternal trauma from CPR', 'Aspiration pneumonia', 'Myocardial stunning and cardiogenic shock', 'Multi-organ dysfunction syndrome', 'Recurrent cardiac arrest'],
  },

  'Anaphylaxis': {
    id: 'cp-anaphy', disease: 'Anaphylaxis', specialty: 'Emergency & Critical Care',
    overview: 'Anaphylaxis is a severe, life-threatening generalised or systemic hypersensitivity reaction characterised by rapid onset of airway, breathing, or circulatory problems, usually associated with skin and mucosal changes. Nursing care focuses on immediate adrenaline administration, airway management, fluid resuscitation, and allergen avoidance.',
    pathophysiology: 'IgE-mediated (Type I hypersensitivity) immune response where re-exposure to an allergen triggers massive mast cell and basophil degranulation, releasing histamine, tryptase, leukotrienes, and cytokines, causing systemic vasodilation, bronchospasm, and capillary leak.',
    commonCauses: ['Foods (peanuts, tree nuts, shellfish, milk, eggs)', 'Insect stings (wasp, bee)', 'Medications (antibiotics like penicillin, NSAIDs, neuromuscular blockers, radiocontrast media)', 'Latex', 'Idiopathic or exercise-induced'],
    riskFactors: ['Previous anaphylaxis history', 'Asthma (especially poorly controlled - higher risk of fatal anaphylaxis)', 'Atopy (eczema, allergic rhinitis)', 'Underlying mast cell disorders', 'Delayed adrenaline administration'],
    subjectiveData: ['Feeling of impending doom or anxiety', 'Pruritus, flushing, or urticaria (hives)', 'Angioedema (swelling of lips, tongue, uvula)', 'Dyspnoea, throat tightness, or wheezing', 'Nausea, vomiting, abdominal cramps, or diarrhoea', 'Dizziness or lightheadedness'],
    objectiveData: ['Airway swelling (stridor, hoarseness, tongue swelling)', 'Breathing difficulty (tachypnoea, wheeze, cyanosis, SpO2 < 92%)', 'Circulatory shock (hypotension: SBP < 90 mmHg, tachycardia, delayed capillary refill, collapse)', 'Skin signs: urticaria, angioedema, erythema (absent in 10-20% of cases)'],
    nursingDiagnoses: [
      { id: 'nd-ana-1', diagnosis: 'Ineffective Airway Clearance / Breathing Pattern related to laryngeal oedema and bronchospasm from severe allergic reaction', definingCharacteristics: ['Stridor', 'Wheezing', 'Throat tightness', 'Dyspnoea'] },
      { id: 'nd-ana-2', diagnosis: 'Decreased Cardiac Output related to systemic vasodilation and capillary leak (anaphylactic shock)', definingCharacteristics: ['Hypotension', 'Tachycardia', 'Syncope', 'Cardiovascular collapse'] },
      { id: 'nd-ana-3', diagnosis: 'Risk for Deficient Fluid Volume related to third-spacing and capillary permeability', definingCharacteristics: ['Hypotension', 'Capillary leak', 'Oedema'] },
    ],
    goals: [
      { id: 'g-ana-1', shortTerm: 'Immediate adrenaline administered within minutes of symptom onset. Airway secured. Blood pressure and oxygen saturation restored.', longTerm: 'Allergen identified and avoided. Auto-injector prescribed and patient trained in use. Allergy clinic follow-up arranged.' },
    ],
    interventions: [
      { id: 'i-ana-1', category: 'dependent', action: 'Immediate Adrenaline (Epinephrine) Administration: administer adrenaline 0.5 mg IM (1:1000, 0.5 mL) into the anterolateral middle third of the thigh immediately. Repeat after 5 minutes if no clinical improvement. (Pediatric dose: 0.01 mg/kg up to 0.5 mg). Establish high-flow oxygen (15 L/min via non-rebreather mask).', rationale: 'Adrenaline is the first-line and most critical treatment for anaphylaxis. IM route is superior and safer than IV in initial resuscitation (causes alpha-1 vasoconstriction, beta-1 cardiac inotropy, and beta-2 bronchodilation).', frequency: 'Immediate IM injection; repeat q5m PRN' },
      { id: 'i-ana-2', category: 'independent', action: 'Positioning and Airway Management: place patient flat with legs elevated (if hypotensive/shocked) to improve venous return. DO NOT sit or stand abruptly (risk of empty ventricle syndrome and cardiac arrest). If breathing difficulty or vomiting, place in recovery position or comfortable sitting position if dyspnoeic. Assess airway patency constantly; prepare for emergency intubation or surgical airway if laryngeal oedema causes complete obstruction.', rationale: 'Upright posture in anaphylactic shock can cause fatal cardiac arrest due to venous pooling. Flat with leg elevation restores cardiac preload.', frequency: 'Continuous positioning and airway monitoring' },
      { id: 'i-ana-3', category: 'dependent', action: 'Fluid resuscitation and adjunctive medications: establish IV access rapidly. Administer rapid fluid bolus of 0.9% normal saline (20 mL/kg in children, 500-1000 mL in adults) to restore intravascular volume lost to capillary leak. Administer second-line adjuncts: antihistamines (chlorphenamine 10 mg IV) and corticosteroids (hydrocortisone 200 mg IV) to prevent protracted reactions (though not effective for acute rescue). Administer nebulised salbutamol (2.5-5 mg) for persistent bronchospasm.', rationale: 'Massive capillary leak causes third-spacing of up to 35% of intravascular volume within 10 minutes, requiring crystalloid fluid resuscitation.', frequency: 'Rapid fluid bolus stat; repeat as needed; IV antihistamines/steroids stat' },
      { id: 'i-ana-4', category: 'independent', action: 'Observation and Biphasic Reaction Monitoring: observe patient in a monitored setting for a minimum of 4 to 6 hours (up to 24 hours if severe or refractory anaphylaxis), as biphasic reactions can occur without re-exposure to the allergen.', rationale: 'Biphasic anaphylaxis occurs in up to 20% of cases, where symptoms recur 1-72 hours after initial recovery without new allergen contact.', frequency: 'Continuous monitoring for 4-6 hours minimum post-resolution' },
    ],
    evaluation: [
      { id: 'e-ana-1', expected: 'Airway patent, breathing normal (SpO2 > 94%), blood pressure normalised. No biphasic recurrence during observation period.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Anaphylaxis and Epinephrine Auto-Injector Training', keyPoints: ['Identify and strictly avoid confirmed or suspected triggers.', 'Carry two epinephrine auto-injectors (e.g. EpiPen, Jext) at all times.', 'Know when and how to use the auto-injector: remove safety cap, swing and firmly jab into outer thigh (can go through clothing), hold for 3 seconds.', 'Call 999 immediately after using the auto-injector.', 'Wear a medical alert bracelet (e.g. MedicAlert) detailing your allergy.'], method: 'Verbal, auto-injector trainer device demonstration, written allergy action plan' },
    ],
    dischargePlanning: { checklist: ['Two epinephrine auto-injectors prescribed and demonstrated', 'Personalised Allergy Action Plan provided', 'Medical alert bracelet information given', 'Allergy clinic referral booked', 'Trigger avoidance education completed'], followUp: 'Allergy immunology clinic in 6-12 weeks for skin prick testing or RAST testing. GP review in 1 week.', referrals: ['Allergy / Immunology specialist', 'GP', 'Emergency department follow-up clinic', 'MedicAlert foundation'], warningSigns: ['Sudden recurrence of hives, itching, or swelling (biphasic reaction)', 'Throat tightness, hoarseness, or difficulty breathing', 'Wheezing or persistent cough', 'Dizziness, lightheadedness, or feeling faint'] },
    complications: ['Anaphylactic shock and cardiovascular collapse', 'Hypoxic-ischaemic encephalopathy from respiratory/cardiac arrest', 'Biphasic anaphylactic reaction', 'Upper airway obstruction from laryngeal oedema', 'Death (if adrenaline delayed or omitted)'],
  },

  'Status Epilepticus': {
    id: 'cp-statsepi', disease: 'Status Epilepticus', specialty: 'Emergency & Critical Care',
    overview: 'Status epilepticus is a neurological emergency defined as continuous seizure activity lasting longer than 5 minutes or recurrent seizures without full recovery of consciousness between episodes. Nursing care focuses on airway management, rapid-sequence benzodiazepine and second-line AED administration, continuous monitoring, and preventing systemic complications.',
    pathophysiology: 'Failure of normal termination mechanisms for seizures leads to prolonged hypersynchronous neuronal firing. Prolonged seizure activity (> 30 minutes) causes permanent neuronal damage, cerebral oedema, hyperthermia, rhabdomyolysis, and autonomic instability.',
    commonCauses: ['Non-adherence or abrupt withdrawal of anti-epileptic drugs (AEDs)', 'Acute symptomatic seizures (stroke, intracranial haemorrhage, trauma, CNS infection)', 'Hypoxia, severe metabolic derangements (hypoglycaemia, hyponatraemia)', 'Alcohol or drug withdrawal', 'Central nervous system tumour'],
    riskFactors: ['Known epilepsy history', 'History of previous status epilepticus', 'Structural brain lesion', 'Substance abuse or alcohol withdrawal', 'Inadequate AED levels'],
    subjectiveData: ['Witnessed continuous seizure activity lasting > 5 minutes', 'Failure to regain consciousness between seizure episodes', 'Aura preceding seizure onset'],
    objectiveData: ['Continuous tonic-clonic or focal seizure activity > 5 minutes', 'Tachypnoea, tachycardia, hypertension, diaphoresis (autonomic instability)', 'Cyanosis and oxygen desaturation during seizure', 'Fever and metabolic acidosis', 'Impaired level of consciousness (Glasgow Coma Scale < 8)'],
    nursingDiagnoses: [
      { id: 'nd-se-1', diagnosis: 'Ineffective Breathing Pattern / Gas Exchange related to prolonged seizure activity and respiratory muscle spasm', definingCharacteristics: ['Apnea/hypoventilation', 'Cyanosis', 'Desaturations', 'Continuous seizure'] },
      { id: 'nd-se-2', diagnosis: 'Risk for Cerebral Tissue Perfusion Ineffective related to status epilepticus-induced metabolic crisis and excitotoxicity', definingCharacteristics: ['Continuous seizure > 5 min', 'Cerebral hypoxia', 'Risk of permanent brain damage'] },
      { id: 'nd-se-3', diagnosis: 'Risk for Injury related to uncontrolled motor activity and loss of consciousness', definingCharacteristics: ['Tonic-clonic movements', 'Falls', 'Tongue biting'] },
    ],
    goals: [
      { id: 'g-se-1', shortTerm: 'Seizure activity terminated within 5-10 minutes of arrival. Airway secured and oxygenation maintained. First-line benzodiazepines administered promptly.', longTerm: 'Status epilepticus resolved. Underlying precipitant identified and managed. Neurological baseline restored.' },
    ],
    interventions: [
      { id: 'i-se-1', category: 'dependent', action: 'Immediate Emergency Management (First-line): time the seizure from onset. Maintain airway, administer high-flow oxygen (15 L/min) via non-rebreather mask. Establish IV access and check blood glucose immediately (treat hypoglycaemia with IV 50% dextrose if indicated). Administer first-line benzodiazepine: IV lorazepam 4 mg (0.1 mg/kg) over 2 minutes, OR IV diazepam 10 mg, OR buccal midazolam 10 mg / rectal diazepam 10 mg if no IV access. Repeat once after 5-10 minutes if seizure persists.', rationale: 'Benzodiazepines enhance GABA-A inhibitory neurotransmission and terminate 75-80% of status epilepticus episodes when given early. Delay increases refractoriness.', frequency: 'STAT administration; repeat at 5-10 minutes if seizure continues' },
      { id: 'i-se-2', category: 'dependent', action: 'Second-line Anti-Epileptic Drugs (Refractory Status Epilepticus): if seizures persist after benzodiazepines (at 10-20 minutes), administer second-line IV AED infusion: levetiracetam (60 mg/kg, max 4500 mg over 10 min), OR sodium valproate (40 mg/kg over 10 min), OR phenytoin / fosphenytoin (20 mg PE/kg at max 50 mg/min). Monitor ECG and blood pressure continuously during infusion (hypotension and arrhythmia risk with phenytoin).', rationale: 'Second-line non-sedating IV AEDs prevent seizure recurrence and treat benzodiazepine-refractory status epilepticus.', frequency: 'Administer over 10-20 min; continuous ECG and BP monitoring' },
      { id: 'i-se-3', category: 'dependent', action: 'Third-line Anaesthetic Treatment (Super-refractory Status Epilepticus): if seizures persist past 30-40 minutes (refractory to first and second line), secure definitive airway via endotracheal intubation and transfer to Intensive Care Unit. Initiate continuous IV general anaesthesia infusion: propofol, midazolam, or thiopental, titrated to burst suppression on continuous EEG monitoring.', rationale: 'Super-refractory status epilepticus requires general anaesthesia to induce burst suppression, halting excitotoxic neuronal destruction.', frequency: 'Continuous ICU infusion; continuous EEG monitoring' },
      { id: 'i-se-4', category: 'independent', action: 'Monitoring systemic complications: monitor vital signs q15m post-seizure. Assess for rhabdomyolysis (check creatine kinase, urine myoglobin, maintain high urine output with IV fluids), aspiration pneumonia, hyperthermia (active cooling), and metabolic acidosis.', rationale: 'Prolonged muscle contraction and hypoxia in status epilepticus cause multi-organ complications including rhabdomyolysis and acute renal failure.', frequency: 'Vitals q15m until stable; serial bloods (CK, lactate, renal function, AED levels)' },
    ],
    evaluation: [
      { id: 'e-se-1', expected: 'Seizures terminated. Airway and breathing secure. Normal oxygen saturation. No neurological deficit or complications.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Epilepsy and Status Epilepticus Prevention', keyPoints: ['Take anti-epileptic medications strictly as prescribed — never miss doses or stop abruptly.', 'Keep emergency rescue medication (e.g. buccal midazolam) accessible at home and ensure family/carers know how to use it.', 'Know seizure triggers (sleep deprivation, stress, alcohol excess, illness) and avoid them.', 'Call 999 immediately if a seizure lasts longer than 5 minutes or if seizures occur back-to-back without recovery.'], method: 'Verbal, written rescue medication protocol, family emergency instruction sheet' },
    ],
    dischargePlanning: { checklist: ['AED regimen reviewed and optimised', 'Rescue medication (buccal midazolam) prescribed with instructions', 'Neurology follow-up appointment booked', 'Seizure diary and safety advice provided', 'Driving restrictions reiterated'], followUp: 'Neurology clinic in 4-6 weeks. Therapeutic AED blood levels checked in 1-2 weeks. EEG as indicated.', referrals: ['Neurology', 'Epilepsy specialist nurse', 'Intensive care follow-up clinic', 'GP'], warningSigns: ['Seizure lasting > 5 minutes', 'Recurrent seizures without regaining consciousness', 'Severe drowsiness or confusion post-seizure', 'New neurological weakness (Todd paresis lasting > 24 hours)', 'Fever or rash (possible infection or drug reaction)'] },
    complications: ['Permanent neuronal damage and cognitive impairment', 'Aspiration pneumonia and acute respiratory distress syndrome', 'Rhabdomyolysis and acute kidney injury', 'Cardiovascular instability (hypotension, arrhythmia)', 'Sudden unexpected death in epilepsy (SUDEP)', 'Cerebral oedema'],
  },

  'Trauma': {
    id: 'cp-trauma', disease: 'Trauma', specialty: 'Emergency & Critical Care',
    overview: 'Trauma care encompasses the systematic resuscitation and management of patients with severe physical injuries (blunt or penetrating). Nursing care follows the Advanced Trauma Life Support (ATLS) ABCDE framework to rapidly identify and treat life-threatening injuries.',
    pathophysiology: 'Severe mechanical force causes tissue disruption, haemorrhage, and cellular hypoxia. The "lethal triad" of trauma (hypothermia, coagulopathy, and metabolic acidosis) exacerbates bleeding and increases mortality if uncorrected.',
    commonCauses: ['Motor vehicle collisions', 'Falls from height', 'Assault / penetrating trauma (stab/gunshot wounds)', 'Crush injuries', 'Industrial or sports accidents'],
    riskFactors: ['High-speed mechanisms', 'Lack of seatbelt or helmet use', 'Substance intoxication (alcohol/drugs)', 'Extreme age (elderly or paediatric)', 'Pre-existing medical co-morbidities'],
    subjectiveData: ['Pain at injury sites', 'Shortness of breath or chest pain', 'Loss of consciousness or amnesia', 'Inability to move limbs', 'Abdominal pain or tenderness'],
    objectiveData: ['ATLS ABCDE assessment findings: Airway obstruction, tension pneumothorax, flail chest, massive haemothorax', 'Haemodynamic instability (hypotension SBP < 90 mmHg, tachycardia)', 'External bleeding, deformities, swelling, lacerations', 'Altered GCS (Glasgow Coma Scale < 13)', 'Positive FAST ultrasound or CT trauma scan findings'],
    nursingDiagnoses: [
      { id: 'nd-tr-1', diagnosis: 'Ineffective Airway Clearance / Breathing Pattern related to facial trauma, rib fractures, or pneumothorax', definingCharacteristics: ['Airway obstruction', 'Decreased breath sounds', 'Tracheal deviation', 'Dyspnoea'] },
      { id: 'nd-tr-2', diagnosis: 'Ineffective Tissue Perfusion / Shock related to acute blood loss (haemorrhagic shock)', definingCharacteristics: ['Hypotension', 'Tachycardia', 'Delayed capillary refill', 'Cool clammy skin', 'Low urine output'] },
      { id: 'nd-tr-3', diagnosis: 'Acute Pain related to tissue trauma, fractures, and surgical interventions', definingCharacteristics: ['Severe pain report', 'Grimacing', 'Guarding', 'Tachycardia'] },
    ],
    goals: [
      { id: 'g-tr-1', shortTerm: 'Primary survey (ABCDE) completed within minutes. Life-threatening injuries identified and managed. Haemodynamic stability restored. Lethal triad prevented.', longTerm: 'Definitive surgical repair of injuries achieved. Complications prevented. Rehabilitation and functional recovery maximised.' },
    ],
    interventions: [
      { id: 'i-tr-1', category: 'dependent', action: 'Primary Survey (ATLS ABCDE Approach): \n- A (Airway): assess patency, clear secretions/debris, maintain cervical spine immobilisation (collar, blocks, head ties), secure definitive airway (intubation) if GCS < 8 or airway threatened.\n- B (Breathing): assess chest rise, breath sounds, SpO2. Treat tension pneumothorax immediately with needle decompression followed by chest tube thoracostomy. Provide high-flow oxygen.\n- C (Circulation): assess pulse, BP, perfusion. Control external haemorrhage with direct pressure, tourniquets, or pelvic binder. Establish large-bore IV access (2 x 14G) or intraosseous line. Initiate massive transfusion protocol (MTP) for haemorrhagic shock (1:1:1 ratio of PRBCs, plasma, and platelets).\n- D (Disability): assess GCS and pupillary reflexes.\n- E (Exposure/Environment): completely expose patient for examination while preventing hypothermia (warm blankets, fluid warmers).', rationale: 'The ABCDE approach prioritises life-threatening injuries in order of immediate lethality, ensuring airway and circulation take precedence.', frequency: 'Primary survey immediate (< 5 min); continuous re-evaluation' },
      { id: 'i-tr-2', category: 'independent', action: 'Haemorrhage control and blood product resuscitation: monitor vital signs continuously. Administer tranexamic acid (TXA 1 g IV over 10 min, followed by 1 g infusion over 8h) within 3 hours of injury. Monitor for signs of the lethal triad (hypothermia < 35°C, coagulopathy, acidosis pH < 7.25). Warm all IV fluids and blood products.', rationale: 'TXA reduces mortality in bleeding trauma patients by inhibiting fibrinolysis. Preventing hypothermia prevents worsening coagulopathy.', frequency: 'Vitals q5-15m during resuscitation; temperature monitoring continuous' },
      { id: 'i-tr-3', category: 'independent', action: 'Secondary survey and diagnostic imaging: perform thorough head-to-toe physical examination once primary survey is stabilised. Facilitate trauma CT scan (head, cervical spine, chest, abdomen, pelvis) or FAST (Focused Assessment with Sonography for Trauma) ultrasound. Monitor urine output via indwelling urinary catheter (target > 0.5 mL/kg/h).', rationale: 'Secondary survey uncovers less immediate but serious injuries. CT trauma scan provides definitive anatomical diagnosis.', frequency: 'Secondary survey post-stabilisation; CT scan per trauma protocol' },
      { id: 'i-tr-4', category: 'dependent', action: 'Pain management and surgical preparation: administer IV analgesia (fentanyl, morphine in titrated boluses). Prepare patient for emergency surgery (damage control surgery, laparotomy, orthopaedic fixation) or interventional radiology embolisation. Ensure blood products are available and consent obtained if possible.', rationale: 'Adequate analgesia reduces physiological stress response. Emergency surgery controls non-compressible haemorrhage and repairs organ damage.', frequency: 'Analgesia titrated q15m; surgical prep STAT' },
    ],
    evaluation: [
      { id: 'e-tr-1', expected: 'ABCDE parameters stabilised. Haemorrhagic shock reversed. Lethal triad avoided. Patient successfully transferred to operating theatre or critical care.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Trauma Recovery and Rehabilitation (for Conscious Patients / Families)', keyPoints: ['Explanation of emergency trauma resuscitation, monitoring, and surgical interventions.', 'Pain management plan and gradual mobilisation expectations.', 'Wound and fracture care instructions during recovery.', 'Psychological support for post-traumatic stress or anxiety.'], method: 'Verbal updates to family, written ICU/trauma recovery guide, multidisciplinary team meeting' },
    ],
    dischargePlanning: { checklist: ['Surgical repairs completed and wounds stable', 'Orthopaedic weight-bearing restrictions established', 'Physiotherapy and occupational therapy rehabilitation plan', 'Pain management prescription', 'Psychological trauma support referral'], followUp: 'Trauma surgery / orthopaedic clinic in 4-6 weeks. Physiotherapy outpatient sessions. Psychological screening at 6 weeks.', referrals: ['Trauma surgery / orthopaedics', 'Physiotherapy and occupational therapy', 'Intensive care follow-up', 'Clinical psychology / PTSD support', 'Social services'], warningSigns: ['Worsening pain, swelling, or redness at surgical/injury sites', 'Fever or chills (infection)', 'Shortness of breath or chest pain (PE / fat embolism)', 'Neurological changes or confusion', 'Bleeding or wound dehiscence'] },
    complications: ['Haemorrhagic shock and exsanguination', 'Lethal triad (hypothermia, coagulopathy, acidosis)', 'Traumatic brain injury / intracranial haemorrhage', 'Acute respiratory distress syndrome (ARDS)', 'Fat embolism syndrome', 'Sepsis and multi-organ dysfunction syndrome', 'Post-traumatic stress disorder (PTSD)'],
  },

  'Acne': {
    id: 'cp-acne', disease: 'Acne Vulgaris', specialty: 'Dermatological Care',
    overview: 'Acne vulgaris is a chronic inflammatory disease of the pilosebaceous units characterised by comedones, papules, pustules, nodules, and potential scarring. Nursing care focuses on topical and systemic medication education, skin care routines, monitoring for side effects (especially with oral isotretinoin), and psychosocial support.',
    pathophysiology: 'Four key pathogenetic factors: follicular hyperkeratinisation, excess sebum production (stimulated by androgens), proliferation of Cutibacterium acnes bacteria, and subsequent cutaneous inflammation.',
    commonCauses: ['Androgenic hormonal stimulation during puberty', 'Genetic predisposition', 'Follicular hyperkeratinisation', 'Bacterial colonization (Cutibacterium acnes)'],
    riskFactors: ['Family history of severe acne', 'Adolescence and hormonal changes', 'High-glycaemic diet or dairy intake (contributory)', 'Comedogenic cosmetics or oily skin products', 'Stress', 'Endocrine disorders (PCOS)'],
    subjectiveData: ['Facial, chest, or back spots (comedones, pimples)', 'Painful, tender nodules or cysts', 'Pruritus or skin irritation', 'Psychological distress, low self-esteem, or depression due to appearance'],
    objectiveData: ['Open comedones (blackheads) and closed comedones (whiteheads)', 'Inflammatory papules, pustules, and erythematous nodules', 'Cysts and abscesses in severe nodulocystic acne', 'Atrophic (ice-pick, boxcar) or hypertrophic scarring / hyperpigmentation'],
    nursingDiagnoses: [
      { id: 'nd-acne-1', diagnosis: 'Impaired Skin Integrity related to inflammatory pilosebaceous lesions as evidenced by pustules, nodules, and scarring', definingCharacteristics: ['Papules/pustules', 'Cysts', 'Scarring', 'Inflammation'] },
      { id: 'nd-acne-2', diagnosis: 'Disturbed Body Image related to visible facial blemishes and scarring as evidenced by social withdrawal and verbalisation of negative self-worth', definingCharacteristics: ['Negative body image', 'Social avoidance', 'Distress over appearance'] },
      { id: 'nd-acne-3', diagnosis: 'Deficient Knowledge related to proper skin care regimen and systemic acne medication side effects', definingCharacteristics: ['Incorrect topical application', 'Unaware of sun sensitivity or teratogenicity'] },
    ],
    goals: [
      { id: 'g-acne-1', shortTerm: 'Inflammatory lesions reduced. Topical/systemic treatment initiated correctly. Skin care routine optimized.', longTerm: 'Clear skin achieved. Scarring minimized. Psychosocial distress resolved. Patient adheres to maintenance therapy.' },
    ],
    interventions: [
      { id: 'i-acne-1', category: 'dependent', action: 'Topical and systemic pharmacotherapy: \n- Mild acne: topical retinoids (adapalene, tretinoin) + antimicrobial (benzoyl peroxide or topical clindamycin).\n- Moderate acne: oral antibiotics (doxycycline, lymecycline for max 3-4 months) + topical retinoid/benzoyl peroxide.\n- Severe nodulocystic acne: oral isotretinoin (referral to dermatology). Monitor LFTs, lipid profile, and enforce strict pregnancy prevention (IPLEDGE / Pregnancy Prevention Programme due to teratogenicity).', rationale: 'Step-up therapy addresses the four pathogenic factors of acne. Isotretinoin is highly effective for severe scarring acne but requires strict teratogenicity precautions.', frequency: 'Topical daily; oral antibiotics daily for 3-4 months; isotretinoin monthly monitoring' },
      { id: 'i-acne-2', category: 'independent', action: 'Skin care education: recommend gentle, non-comedogenic, soap-free cleansers twice daily. Avoid harsh scrubbing or picking/squeezing lesions (worsens inflammation and scarring). Use oil-free, non-comedogenic moisturisers and sunscreens (topical retinoids and tetracyclines increase UV sensitivity).', rationale: 'Harsh cleansers and physical trauma disrupt the skin barrier, increase irritation, and worsen acne scarring.', frequency: 'Education provided at initiation and reviewed at follow-up' },
      { id: 'i-acne-3', category: 'independent', action: 'Isotretinoin side effect monitoring: educate patient on common side effects: cheilitis (severe dry lips — use petroleum jelly), dry skin and mucous membranes, epistaxis, photosensitivity, myalgia, and mood changes (screen for depression and suicidal ideation). Monthly blood tests (LFTs, lipids, pregnancy tests).', rationale: 'Isotretinoin has predictable mucocutaneous and systemic side effects. Mandatory monitoring ensures early detection of hepatotoxicity, hyperlipidaemia, and pregnancy prevention.', frequency: 'Monthly clinic visits and blood tests during isotretinoin course' },
      { id: 'i-acne-4', category: 'independent', action: 'Psychosocial support: screen for anxiety, depression, and social withdrawal using validated tools (e.g. CADI - Cardiff Acne Disability Index). Provide empathetic listening, validate emotional impact, and refer to dermatology psychology or support groups if severe.', rationale: 'Acne causes significant psychosocial morbidity (anxiety, depression, body dysmorphic disorder) regardless of clinical severity.', frequency: 'Psychosocial screening at every dermatology visit' },
    ],
    evaluation: [
      { id: 'e-acne-1', expected: 'Inflammatory lesions cleared by ≥ 50%. Patient tolerating treatment without severe adverse effects. Improved scores on acne disability index.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Acne Treatment and Skin Care Guide', keyPoints: ['Be patient: acne treatments take 6 to 12 weeks to show significant improvement.', 'Apply topical retinoids at night to clean, dry skin; use a pea-sized amount for the whole face.', 'Always wear oil-free sunscreen daily, as acne treatments make skin more sensitive to the sun.', 'Never squeeze, pick, or pop pimples — this drives bacteria deeper and causes permanent scars.', 'If taking isotretinoin, strict contraception is mandatory; report any low mood or depression immediately.'], method: 'Verbal, written skin care routine sheet, isotretinoin pregnancy prevention guide' },
    ],
    dischargePlanning: { checklist: ['Topical or systemic prescription provided with clear instructions', 'Sun protection and gentle skin care advice given', 'Isotretinoin Pregnancy Prevention Programme agreement signed (if applicable)', 'Monthly blood test schedule booked', 'Dermatology follow-up appointment arranged'], followUp: 'Dermatology or GP review in 6-8 weeks for topicals/antibiotics, or monthly for isotretinoin.', referrals: ['Dermatology specialist', 'GP', 'Dermatology psychology service if severe distress'], warningSigns: ['Severe mood changes, depression, or suicidal ideation (isotretinoin)', 'Severe skin peeling, blistering, or allergic reaction to topicals', 'Unexplained abdominal pain or severe diarrhoea (oral tetracycline/isotretinoin GI effects)', 'Severe headache and visual changes (pseudotumor cerebri with tetracyclines/isotretinoin)'] },
    complications: ['Permanent facial and body scarring (atrophic and hypertrophic)', 'Post-inflammatory hyperpigmentation or erythema', 'Severe psychological distress, anxiety, and depression', 'Teratogenicity (foetal malformations from isotretinoin)', 'Gram-negative folliculitis (from long-term antibiotic use)'],
  },

  'Drug-Induced Skin Reactions': {
    id: 'cp-skinrxn', disease: 'Drug-Induced Skin Reactions', specialty: 'Dermatological Care',
    overview: 'Drug-induced skin reactions range from mild exanthematous eruptions to severe, life-threatening cutaneous adverse reactions (SCARs) such as Stevens-Johnson syndrome (SJS), toxic epidermal necrolysis (TEN), and DRESS syndrome. Nursing care focuses on immediate offending drug withdrawal, skin barrier protection, fluid/electrolyte management, and supportive critical care.',
    pathophysiology: 'Immunologically mediated (Type IV delayed hypersensitivity T-cell reactions) or non-immunological mechanisms where drug metabolites bind to skin proteins, triggering cytotoxic T-cell destruction of keratinocytes (in SJS/TEN) or systemic eosinophilic inflammation (in DRESS).',
    commonCauses: ['Anticonvulsants (carbamazepine, lamotrigine, phenytoin)', 'Antibiotics (sulphonamides, penicillins, vancomycin)', 'Allopurinol', 'NSAIDs', 'ARVs', 'Immune checkpoint inhibitors'],
    riskFactors: ['Genetic predisposition (e.g. HLA-B*1502 for carbamazepine in Asian populations, HLA-B*5801 for allopurinol)', 'HIV infection', 'Immunosuppression', 'Previous drug allergy', 'Polypharmacy'],
    subjectiveData: ['Widespread rash appearing days to weeks after starting a new medication', 'Skin pain, burning, or tenderness (especially in SJS/TEN)', 'Pruritus', 'Fever, malaise, and sore throat (prodrome before rash)', 'Facial swelling and painful mucous membranes (mouth, eyes, genitals)'],
    objectiveData: ['Erythematous macules, targetoid lesions, or diffuse erythroderma', 'Positive Nikolsky sign (epidermis detaches with lateral thumb pressure in SJS/TEN)', 'Widespread blistering and epidermal detachment (< 10% BSA in SJS, 10-30% overlap, > 30% in TEN)', 'Mucosal erosions (conjunctivitis, oral stomatitis, genital ulcers)', 'Facial oedema and generalised lymphadenopathy (DRESS syndrome)', 'Fever > 38.5°C'],
    nursingDiagnoses: [
      { id: 'nd-skin-1', diagnosis: 'Impaired Skin Integrity related to drug-induced immune-mediated keratinocyte necrosis and blistering (SJS/TEN)', definingCharacteristics: ['Epidermal detachment', 'Blistering', 'Positive Nikolsky sign', 'Skin pain'] },
      { id: 'nd-skin-2', diagnosis: 'Risk for Fluid Volume Deficit / Electrolyte Imbalance related to massive trans-epidermal fluid loss from denuded skin', definingCharacteristics: ['Denuded skin surface', 'Third-spacing', 'Dehydration risk', 'Electrolyte wasting'] },
      { id: 'nd-skin-3', diagnosis: 'Risk for Infection (Sepsis) related to extensive loss of epidermal skin barrier', definingCharacteristics: ['Open skin erosions', 'Immunosuppressive treatment', 'Fever'] },
    ],
    goals: [
      { id: 'g-skin-1', shortTerm: 'Offended drug identified and discontinued immediately. Fluid and electrolyte balance maintained. Skin pain managed.', longTerm: 'Complete re-epithelialisation of skin. No secondary sepsis or permanent visual impairment. Offender drug documented on allergy record.' },
    ],
    interventions: [
      { id: 'i-skin-1', category: 'dependent', action: 'Immediate Offending Drug Withdrawal: review all medications started within the past 1-8 weeks. Discontinue all suspect culprit drugs immediately. (Withdrawal of the causative agent is the single most important intervention determining mortality in SJS/TEN).', rationale: 'Continuing the culprit drug even for 24-30 hours after rash onset significantly increases mortality in SJS/TEN.', frequency: 'Immediate cessation upon suspicion' },
      { id: 'i-skin-2', category: 'independent', action: 'Supportive Wound Care and Barrier Protection: transfer patient to Burns Unit or Intensive Care Unit for severe SJS/TEN (> 10% BSA). Handle patient minimally using draw sheets (avoid shearing skin). Apply non-adherent silicone or lipid wound dressings to denuded areas. DO NOT debride intact blister roofs (serve as natural biological dressings). Maintain neutral thermal environment.', rationale: 'Denuded skin resembles a second-degree thermal burn. Burn unit protocols prevent hypothermia, fluid loss, and secondary bacterial colonisation.', frequency: 'Wound care daily or per burn protocol; minimal friction handling' },
      { id: 'i-skin-3', category: 'independent', action: 'Fluid Resuscitation and Nutritional Support: calculate fluid replacement based on modified Parkland formula (less fluid than thermal burns to prevent pulmonary oedema). Monitor strict fluid balance and hourly urine output via catheter. High-calorie, high-protein enteral nutrition via nasogastric tube to support hypermetabolic healing state.', rationale: 'Extensive skin detachment causes significant evaporative fluid loss, electrolyte wasting, and hypermetabolism requiring specialised nutritional support.', frequency: 'Hourly fluid balance and urine output; daily weight and nutritional assessment' },
      { id: 'i-skin-4', category: 'dependent', action: 'Multidisciplinary Specialist Care: \n- Ophthalmology review daily for mucosal eye involvement (saline flushes, lubricating drops, amniotic membrane grafting to prevent symblepharon and blindness).\n- Dermatology and burn surgery review.\n- Immunomodulatory therapy (systemic corticosteroids, ciclosporin, IVIG, or TNF-alpha inhibitors) per specialist protocol.\n- Pain management (opioids and topical anaesthetics for excruciating skin pain).', rationale: 'Ocular involvement occurs in 80% of SJS/TEN cases and can cause permanent blindness without urgent specialist ophthalmology care. Multidisciplinary care reduces mortality.', frequency: 'Ophthalmology daily; specialist reviews daily; pain management q4h' },
    ],
    evaluation: [
      { id: 'e-skin-1', expected: 'No further epidermal detachment. Skin re-epithelialisation progressing. Fluid balance stable. No secondary sepsis or vision loss.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Drug Allergy Education and Prevention', keyPoints: ['You have experienced a severe, life-threatening drug reaction to [Medication Name].', 'Never take this medication or any drug in the same chemical family again.', 'Always inform all doctors, dentists, and pharmacists about this drug allergy.', 'Wear a medical alert bracelet (e.g. MedicAlert) identifying this severe drug allergy.', 'Keep a written record of the culprit drug in your wallet or phone.'], method: 'Verbal, written drug allergy warning card, medical alert bracelet registration form' },
    ],
    dischargePlanning: { checklist: ['Culprit drug formally documented as severe allergy in medical record and GP summary', 'Allergy warning card issued', 'Medical alert bracelet ordered', 'Ophthalmology and dermatology follow-up appointments booked', 'Skin care and emollient regimen provided'], followUp: 'Dermatology and ophthalmology follow-up in 2-4 weeks. GP review within 1 week of discharge.', referrals: ['Dermatology / Burns unit', 'Ophthalmology', 'Clinical Immunology / Allergy specialist', 'GP', 'Plastic surgery if scarring'], warningSigns: ['New rash, redness, or blisters developing', 'Eye pain, redness, or blurred vision', 'Difficulty swallowing or mouth sores', 'Fever, chills, or spreading skin infection', 'Shortness of breath or chest pain'] },
    complications: ['Sepsis and septic shock (leading cause of death in SJS/TEN)', 'Permanent visual impairment or blindness (symblepharon, corneal scarring)', 'Cutaneous scarring and pigmentary changes', 'Oesophageal strictures and vaginal/genital synechiae', 'Multi-organ failure (liver/kidney in DRESS)', 'Death (mortality 10-30% in TEN)'],
  },

  'Conjunctivitis': {
    id: 'cp-conjunct', disease: 'Conjunctivitis', specialty: 'Ophthalmological Care',
    overview: 'Conjunctivitis (pink eye) is inflammation of the conjunctiva, which can be infectious (viral, bacterial) or non-infectious (allergic, irritant). Nursing care focuses on infection control, eye hygiene, correct eye drop administration, and patient education to prevent spreading.',
    pathophysiology: 'Infectious agents (adenovirus, Staph aureus, Strep pneumoniae, Pseudomonas) or allergens trigger vasodilation of conjunctival vessels, cellular infiltration, and exudate formation, causing redness, discharge, and irritation.',
    commonCauses: ['Viral infection (adenovirus — highly contagious)', 'Bacterial infection (Staphylococcus aureus, Streptococcus pneumoniae, Haemophilus influenzae)', 'Allergic reaction (pollen, dust mites, animal dander)', 'Chemical or mechanical irritation'],
    riskFactors: ['Contact lens wear (especially poor hygiene)', 'Upper respiratory tract infection (viral)', 'Exposure to infected individuals (schools, daycares)', 'Allergic rhinitis history', 'Ocular trauma or foreign body'],
    subjectiveData: ['Redness in one or both eyes', 'Foreign body sensation, gritty feeling, or burning', 'Pruritus (prominent in allergic conjunctivitis)', 'Eye discharge (watery in viral/allergic; thick purulent in bacterial)', 'Matted eyelids upon waking', 'Mild photophobia'],
    objectiveData: ['Conjunctival hyperaemia (pink/red eye)', 'Exudate (purulent crusting in bacterial; watery in viral; stringy mucoid in allergic)', 'Eyelid oedema and chemosis', 'Pre-auricular lymphadenopathy (often in viral adenoviral conjunctivitis)', 'Cornea clear (differentiates from keratitis/iritis)'],
    nursingDiagnoses: [
      { id: 'nd-conj-1', diagnosis: 'Risk for Infection Transmission related to highly contagious nature of viral/bacterial conjunctivitis', definingCharacteristics: ['Purulent/watery discharge', 'Contagious pathogen', 'Close contact'] },
      { id: 'nd-conj-2', diagnosis: 'Acute Pain / Discomfort related to conjunctival inflammation and foreign body sensation', definingCharacteristics: ['Gritty sensation', 'Burning', 'Eye redness'] },
      { id: 'nd-conj-3', diagnosis: 'Risk for Impaired Corneal Integrity related to severe infection or contact lens misuse', definingCharacteristics: ['Contact lens wear', 'Purulent discharge', 'Corneal risk'] },
    ],
    goals: [
      { id: 'g-conj-1', shortTerm: 'Infection transmission prevented via hygiene measures. Treatment initiated (antibiotic drops for bacterial; supportive for viral). Comfort improved.', longTerm: 'Complete resolution of conjunctivitis within 7-14 days. No corneal complications or vision loss.' },
    ],
    interventions: [
      { id: 'i-conj-1', category: 'dependent', action: 'Pharmacological management: \n- Bacterial: prescribe topical broad-spectrum antibiotic eye drops or ointment (chloramphenicol 0.5% or fusidic acid) for 5-7 days.\n- Viral: supportive care (artificial tears, cool compresses, lubricating ointments) as antibiotics are ineffective; self-limiting over 1-3 weeks.\n- Allergic: topical antihistamines/mast cell stabilizers (olopatadine, ketotifen) or artificial tears.', rationale: 'Treatment targets the underlying etiology. Bacterial conjunctivitis responds to topical antibiotics, whereas viral conjunctivitis requires strict hygiene and supportive care.', frequency: 'Topical drops qid for 5-7 days' },
      { id: 'i-conj-2', category: 'independent', action: 'Strict Infection Control Measures: educate patient and family on high contagiousness. Meticulous hand hygiene (wash hands with soap and water before and after touching eyes). Do not share towels, pillowcases, or eye makeup. Avoid touching or rubbing eyes. Discard eye makeup used during infection. Stay home from school/work until 24 hours after starting antibiotic treatment (bacterial) or until symptoms resolve (viral).', rationale: 'Viral conjunctivitis (adenovirus) spreads rapidly in households, schools, and workplaces via fomites and hand-to-eye contact.', frequency: 'Infection control measures reinforced continuously' },
      { id: 'i-conj-3', category: 'independent', action: 'Eye Hygiene and Administration Technique: clean eyelids and lashes gently with a clean, damp cloth or cotton ball (wipe from inner canthus to outer canthus, using a fresh clean area for each wipe) to remove crusting. Demonstrate correct eye drop administration (pull down lower lid, instil drop into conjunctival sac, close eye gently, press punctum to prevent systemic absorption).', rationale: 'Proper cleaning removes purulent discharge that traps bacteria. Correct drop administration ensures adequate drug contact time on conjunctiva.', frequency: 'Eyelid cleaning before each drop instillation; drops administered qid' },
      { id: 'i-conj-4', category: 'independent', action: 'Contact lens and safety precautions: advise patient to discontinue contact lens wear immediately until infection has completely resolved and treatment is finished. Discard contaminated contact lenses and disinfection cases.', rationale: 'Contact lens wear during conjunctivitis significantly increases the risk of sight-threatening microbial keratitis (corneal ulceration).', frequency: 'Lens cessation enforced immediately' },
    ],
    evaluation: [
      { id: 'e-conj-1', expected: 'Conjunctival redness and discharge resolved. No family members infected (strict hygiene maintained). Vision normal.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Conjunctivitis Hygiene and Treatment', keyPoints: ['Wash your hands frequently with soap and water, especially after touching your eyes.', 'Use a clean washcloth or tissue for each eye and do not share towels or pillows.', 'Apply eye drops or ointment exactly as directed; wash hands before and after.', 'Stop wearing contact lenses immediately until your eyes are fully healed and treatment is complete.', 'Stay home from school or work until non-contagious (typically 24 hours after starting antibiotics for bacterial conjunctivitis).'], method: 'Verbal, hand hygiene demonstration, written discharge guidance' },
    ],
    dischargePlanning: { checklist: ['Antibiotic eye drops prescribed (if bacterial) with instructions', 'Infection control and handwashing education completed', 'Contact lens cessation enforced', 'Return precautions and red-flag symptoms reviewed'], followUp: 'GP or optometrist follow-up only if symptoms do not improve after 5-7 days or if pain/blurring develops.', referrals: ['Optometrist', 'GP', 'Ophthalmology if non-responsive or suspected keratitis'], warningSigns: ['Severe eye pain or deep ache (not just gritty discomfort)', 'Marked blurring of vision or decreased visual acuity', 'Extreme sensitivity to light (photophobia)', 'Purulent discharge worsening or corneal clouding', 'Lack of improvement after 48-72 hours of treatment'] },
    complications: ['Microbial keratitis and corneal ulceration (especially in contact lens wearers)', 'Chronic conjunctivitis', 'Pre-septal cellulitis (rare)', 'Corneal scarring (if severe adenovirus keratitis)'],
  },

  'Ocular Infections': {
    id: 'cp-ocular', disease: 'Ocular Infections (Keratitis, Endophthalmitis, Uveitis)', specialty: 'Ophthalmological Care',
    overview: 'Ocular infections encompass severe, sight-threatening conditions such as infectious keratitis (corneal ulceration), endophthalmitis (intraocular infection), and orbital/pre-septal cellulitis. Nursing care focuses on urgent ophthalmological assessment, frequent topical or intravitreal antimicrobial administration, pain management, and preventing permanent vision loss.',
    pathophysiology: 'Pathogens (bacteria such as Pseudomonas aeruginosa in contact lens wearers, fungi, acanthamoeba, herpes simplex virus, or intraocular inoculation post-surgery/trauma) breach corneal epithelium or globe integrity, causing severe intraocular inflammation, tissue destruction, and risk of blindness.',
    commonCauses: ['Contact lens wear (Pseudomonas keratitis)', 'Ocular trauma or foreign body', 'Post-intraocular surgery (cataract surgery endophthalmitis)', 'Herpes simplex keratitis', 'Extension of sinusitis (orbital cellulitis)'],
    riskFactors: ['Contact lens misuse (overnight wear, poor hygiene)', 'Recent eye surgery or trauma', 'Ocular surface disease', 'Immunosuppression', 'Diabetes mellitus'],
    subjectiveData: ['Severe, deep eye pain and ache', 'Marked reduction in visual acuity or blurred vision', 'Extreme photophobia (sensitivity to light)', 'Profuse tearing and redness', 'Foreign body sensation or inability to open eye'],
    objectiveData: ['Corneal infiltrate or epithelial defect (ulcer) on fluorescein staining', 'Hypopyon (pus in anterior chamber)', 'Cells and flare in anterior chamber (uveitis/endophthalmitis)', 'Reduced visual acuity (Snellen chart)', 'Eyelid swelling, chemosis, and proptosis (orbital cellulitis)'],
    nursingDiagnoses: [
      { id: 'nd-oc-1', diagnosis: 'Risk for Decreased Visual Acuity / Blindness related to corneal ulceration, keratitis, or intraocular infection', definingCharacteristics: ['Corneal infiltrate', 'Hypopyon', 'Severe pain', 'Reduced visual acuity'] },
      { id: 'nd-oc-2', diagnosis: 'Acute Pain related to severe intraocular inflammation and corneal nerve irritation', definingCharacteristics: ['Severe eye pain', 'Photophobia', 'Ciliary flush'] },
      { id: 'nd-oc-3', diagnosis: 'Deficient Knowledge related to intensive round-the-clock eye drop schedule and contact lens hygiene', definingCharacteristics: ['Complex eye drop regimen', 'Inability to perform drop instillation'] },
    ],
    goals: [
      { id: 'g-oc-1', shortTerm: 'Urgent ophthalmology review completed. Antimicrobial therapy initiated immediately (round-the-clock drops or intravitreal injections). Pain managed.', longTerm: 'Infection eradicated. Corneal clarity or intraocular integrity preserved. Maximum possible visual acuity restored.' },
    ],
    interventions: [
      { id: 'i-oc-1', category: 'dependent', action: 'Urgent Antimicrobial Administration: \n- Infectious Keratitis: fortified topical antibiotic eye drops (e.g., fortified tobramycin + cefuroxime) administered every 30-60 minutes around the clock initially. Antiviral drops (aciclovir) for HSV keratitis.\n- Endophthalmitis: emergency intravitreal injection of broad-spectrum antibiotics (vancomycin + ceftazidime/amikacin) +/- vitrectomy surgery.\n- Orbital Cellulitis: IV broad-spectrum antibiotics (co-amoxiclav or ceftriaxone).', rationale: 'Severe ocular infections can destroy the eye within 24-48 hours. Round-the-clock intensive topical therapy or intravitreal injection achieves bactericidal drug levels rapidly.', frequency: 'Hourly round-the-clock drops; intravitreal injection STAT' },
      { id: 'i-oc-2', category: 'independent', action: 'Pain and Photophobia Management: administer systemic analgesia (paracetamol, NSAIDs, or opioids for severe pain). Administer cycloplegic eye drops (cyclopentolate or atropine) as prescribed to dilate pupil, prevent painful ciliary spasm (posterior synechiae), and rest the eye. Keep room lights dimmed (photophobia reduction).', rationale: 'Cycloplegia paralyzes the iris sphincter and ciliary body, relieving severe ciliary spasm pain and preventing adhesions.', frequency: 'Cycloplegic drops bd-tds; analgesia scheduled' },
      { id: 'i-oc-3', category: 'independent', action: 'Assisting with Diagnostic Procedures: prepare patient and tray for corneal scraping (for Gram stain, culture, and sensitivity) performed by ophthalmologist prior to starting antibiotics. Assist with ultrasound B-scan if media opacities prevent fundoscopy in endophthalmitis.', rationale: 'Corneal scraping identifies specific causative organism, allowing targeted antimicrobial therapy modification.', frequency: 'Prior to antibiotic initiation' },
      { id: 'i-oc-4', category: 'independent', action: 'Safety and Vision Support: orient patient to hospital room due to severe visual impairment or patching. Keep bed in low position with call bell within reach. Never patch an eye with suspected microbial keratitis or endophthalmitis unless explicitly ordered by ophthalmologist (trapping discharge worsens infection).', rationale: 'Severe visual loss increases fall risk. Eye patching in bacterial keratitis creates a warm, anaerobic culture medium that worsens infection.', frequency: 'Fall precautions implemented; avoid unauthorised eye patching' },
    ],
    evaluation: [
      { id: 'e-oc-1', expected: 'Corneal infiltrate shrinking or hypopyon resolved. Eye pain and photophobia improving. Visual acuity stabilising or improving.', status: 'met' },
    ],
    patientEducation: [
      { topic: 'Severe Ocular Infection Care', keyPoints: ['This is a sight-threatening emergency requiring intensive, round-the-clock eye drops (sometimes every 30-60 minutes, even through the night).', 'Never miss or delay an eye drop dose — compliance is vital to save your sight.', 'Do NOT wear contact lenses ever again if microbial keratitis was caused by lens misuse, or follow strict future hygiene rules.', 'Keep follow-up ophthalmology appointments daily until infection is controlled.', 'Report worsening pain, decreasing vision, or spreading swelling immediately.'], method: 'Verbal, written intensive drop schedule chart, emergency ophthalmology contact details' },
    ],
    dischargePlanning: { checklist: ['Intensive eye drop prescription with tapering schedule provided', 'Daily ophthalmology outpatient follow-up booked', 'Contact lens cessation enforced permanently or temporarily', 'Warning signs of worsening infection reviewed'], followUp: 'Ophthalmology clinic review daily initially, then reducing frequency as infection resolves. Visual rehabilitation post-infection.', referrals: ['Ophthalmology / Cornea specialist', 'Retina specialist (for endophthalmitis)', 'Low-vision rehabilitation if permanent visual loss'], warningSigns: ['Sudden increase in severe eye pain', 'Rapid worsening of blurred vision or loss of sight', 'Increasing redness, swelling, or pus in the eye', 'Fever or systemic symptoms (orbital cellulitis)'] },
    complications: ['Permanent corneal scarring and visual impairment', 'Corneal perforation and endophthalmitis', 'Glaucoma or cataract secondary to inflammation', 'Phthisis bulbi (shrunken, non-functional eye)', 'Loss of the eye (enucleation/evisceration in severe endophthalmitis)'],
  },

}

// ── Helper functions ──────────────────────────────────────────────

export function getCarePlanForDisease(disease: string): DiseaseCarePlan | undefined {
  return CARE_PLAN_DISEASES[disease]
}

export function getCarePlanSpecialties(): CarePlanSpecialty[] {
  return CARE_PLAN_SPECIALTIES
}

export function getDiseasesForSpecialty(specialtyId: string): string[] {
  const specialty = CARE_PLAN_SPECIALTIES.find(s => s.id === specialtyId)
  return specialty?.diseases || []
}

export function getAllCarePlanDiseases(): string[] {
  return Object.keys(CARE_PLAN_DISEASES)
}

export function getSpecialtyByDisease(disease: string): CarePlanSpecialty | undefined {
  return CARE_PLAN_SPECIALTIES.find(s => s.diseases.includes(disease))
}
