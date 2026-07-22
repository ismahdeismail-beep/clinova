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
