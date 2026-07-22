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
