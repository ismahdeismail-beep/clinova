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
