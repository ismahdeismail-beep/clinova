import type { DrugContraindication } from '../types/drugChecker'

export const DRUG_CONTRAINDICATIONS: DrugContraindication[] = [
  {
    drug_name: 'warfarin',
    condition: 'Pregnancy',
    severity: 'absolute',
    rationale:
      'Warfarin crosses the placenta and causes fetal warfarin syndrome (nasal hypoplasia, stippled epiphyses, CNS abnormalities), especially in first trimester.',
    alternative: 'LMWH (enoxaparin) or unfractionated heparin — do not cross placenta.',
  },
  {
    drug_name: 'methotrexate',
    condition: 'Pregnancy',
    severity: 'absolute',
    rationale:
      'Methotrexate is an antimetabolite that causes abortion, teratogenicity, and fetal death.',
    alternative: 'Azathioprine or ciclosporin for autoimmune conditions in pregnancy.',
  },
  {
    drug_name: 'ACE inhibitor',
    condition: 'Pregnancy (2nd/3rd trimester)',
    severity: 'absolute',
    rationale:
      'Causes fetal renal dysgenesis, oligohydramnios, pulmonary hypoplasia, skull defects, and neonatal death.',
    alternative: 'Labetalol, nifedipine, or methyldopa for hypertension in pregnancy.',
  },
  {
    drug_name: 'ARB',
    condition: 'Pregnancy',
    severity: 'absolute',
    rationale:
      'Same fetal toxicity as ACE inhibitors: renal agenesis, oligohydramnios, craniofacial abnormalities.',
    alternative: 'Labetalol or methyldopa.',
  },
  {
    drug_name: 'statin',
    condition: 'Pregnancy',
    severity: 'absolute',
    rationale:
      'Cholesterol is essential for fetal CNS development. Statins are teratogenic (limb abnormalities, CNS defects).',
    alternative: 'Bile acid sequestrants (cholestyramine) or diet modification.',
  },
  {
    drug_name: 'tetracycline',
    condition: 'Pregnancy',
    severity: 'absolute',
    rationale:
      'Chelates calcium in growing bones and teeth. Causes permanent tooth discoloration, enamel hypoplasia, and bone growth retardation.',
    alternative: 'Amoxicillin, azithromycin, or cephalosporins.',
  },
  {
    drug_name: 'fluoroquinolone',
    condition: 'Pregnancy',
    severity: 'absolute',
    rationale:
      'Cartilage damage in weight-bearing joints of developing fetus. FDA category C with human data suggesting risk.',
    alternative: 'Nitrofurantoin for UTI, amoxicillin/clavulanate for respiratory infections.',
  },
  {
    drug_name: 'isotretinoin',
    condition: 'Pregnancy',
    severity: 'absolute',
    rationale:
      'Severe teratogenicity: craniofacial, cardiac, thymic, and CNS malformations. Mandatory iPLEDGE programme.',
    alternative: 'Topical retinoids, azithromycin, or hormonal therapy for severe acne.',
  },
  {
    drug_name: 'valproate',
    condition: 'Pregnancy',
    severity: 'absolute',
    rationale:
      '1-2% neural tube defects (spina bifida), neurodevelopmental delay, reduced IQ, autism spectrum disorder.',
    alternative: 'Lamotrigine or levetiracetam for epilepsy in pregnancy.',
  },
  {
    drug_name: 'carbamazepine',
    condition: 'Pregnancy',
    severity: 'relative',
    rationale:
      '1% risk of neural tube defects. Less teratogenic than valproate but still significant risk.',
    alternative: 'Lamotrigine (lower teratogenicity profile).',
  },
  {
    drug_name: 'clozapine',
    condition: 'Neutropenia/agranulocytosis',
    severity: 'absolute',
    rationale:
      'Clozapine causes agranulocytosis in 1-2% of patients. Absolute neutrophil count must be monitored.',
    alternative: 'Olanzapine, quetiapine, or aripiprazole.',
  },
  {
    drug_name: 'lithium',
    condition: 'Severe renal impairment',
    severity: 'absolute',
    rationale:
      'Lithium is entirely renally excreted. Accumulation in renal failure causes severe toxicity.',
    alternative: 'Valproate or lamotrigine for mood stabilisation.',
  },
  {
    drug_name: 'metformin',
    condition: 'eGFR less than 15 mL/min',
    severity: 'absolute',
    rationale:
      'Risk of lactic acidosis due to accumulation when renal clearance is critically reduced.',
    alternative: 'Insulin for glycaemic control in severe CKD.',
  },
  {
    drug_name: 'digoxin',
    condition: 'Ventricular fibrillation',
    severity: 'absolute',
    rationale: 'Digoxin increases ventricular automaticity and can worsen ventricular arrhythmias.',
    alternative: 'Amiodarone or cardioversion.',
  },
  {
    drug_name: 'sumatriptan',
    condition: 'Coronary artery disease',
    severity: 'absolute',
    rationale:
      'Triptans cause coronary vasoconstriction. Risk of myocardial ischaemia and infarction.',
    alternative: 'Paracetamol, NSAIDs, or antiemetics (metoclopramide).',
  },
  {
    drug_name: 'MAOI',
    condition: 'Pheochromocytoma',
    severity: 'absolute',
    rationale: 'MAOIs can precipitate hypertensive crisis in catecholamine-secreting tumours.',
    alternative: 'Phenoxybenzamine for preoperative alpha-blockade.',
  },
  {
    drug_name: 'metoclopramide',
    condition: 'Parkinsons disease',
    severity: 'absolute',
    rationale: 'Metoclopramide is a D2 antagonist, directly worsening parkinsonian symptoms.',
    alternative: 'Domperidone (does not cross BBB), ondansetron, or prochlorperazine.',
  },
  {
    drug_name: 'thiazide diuretic',
    condition: 'Gout',
    severity: 'relative',
    rationale: 'Thiazides reduce renal uric acid excretion, potentially triggering gout flares.',
    alternative: 'Losartan (has uricosuric effect), amlodipine.',
  },
  {
    drug_name: 'beta-blocker',
    condition: 'Asthma/severe COPD',
    severity: 'absolute',
    rationale:
      'Non-selective beta-blockers cause bronchospasm via beta-2 blockade. Cardioselective agents also carry risk at higher doses.',
    alternative: 'Calcium channel blockers (amlodipine) for rate control in AF.',
  },
  {
    drug_name: 'amiodarone',
    condition: 'Severe thyroid disease',
    severity: 'absolute',
    rationale:
      'Amiodarone contains 37% iodine by weight. Causes both hypo- and hyperthyroidism. Contraindicated in severe pre-existing thyroid disease.',
    alternative: 'Sotalol (has class III action) or flecainide.',
  },
  {
    drug_name: 'penicillin',
    condition: 'Severe penicillin allergy (anaphylaxis)',
    severity: 'absolute',
    rationale: 'Risk of fatal anaphylaxis. Cross-reactivity with cephalosporins is 1-2%.',
    alternative: 'Azithromycin, fluoroquinolone, or vancomycin depending on infection.',
  },
  {
    drug_name: 'metronidazole',
    condition: 'First trimester pregnancy',
    severity: 'relative',
    rationale:
      'Historical concern about mutagenicity, but current evidence suggests safety. Reserved for trichomoniasis and C. difficile.',
    alternative: 'Ornidazole or secnidazole.',
  },
  {
    drug_name: 'trimethoprim',
    condition: 'Pregnancy (1st trimester)',
    severity: 'relative',
    rationale:
      'Folate antagonist. Possible association with neural tube defects when used in first trimester.',
    alternative: 'Nitrofurantoin for UTI in early pregnancy.',
  },
  {
    drug_name: 'leflunomide',
    condition: 'Pregnancy',
    severity: 'absolute',
    rationale:
      'Teratogenic in animals. Extremely long half-life requires cholestyramine washout before conception.',
    alternative: 'Hydroxychloroquine or azathioprine.',
  },
  {
    drug_name: 'methotrexate',
    condition: 'Hepatic impairment',
    severity: 'absolute',
    rationale:
      'Methotrexate is hepatically metabolised and causes hepatotoxicity. Accumulation in liver disease is dangerous.',
    alternative: 'Azathioprine or mycophenolate for autoimmune conditions.',
  },
  {
    drug_name: 'colchicine',
    condition: 'Severe renal impairment',
    severity: 'absolute',
    rationale:
      'Colchicine is renally cleared. Accumulation causes fatal toxicity (multi-organ failure, pancytopenia).',
    alternative: 'NSAIDs (with caution) or anakinra for acute gout.',
  },
  {
    drug_name: 'ciclosporin',
    condition: 'Uncontrolled hypertension',
    severity: 'absolute',
    rationale:
      'Ciclosporin causes hypertension via renal vasoconstriction and sodium retention. Uncontrolled BP increases nephrotoxicity risk.',
    alternative: 'Tacrolimus (less hypertensive) or mycophenolate.',
  },
  {
    drug_name: 'simvastatin',
    condition: 'Active liver disease',
    severity: 'absolute',
    rationale:
      'Statins are hepatotoxic. Active liver disease with unexplained transaminase elevation is a contraindication.',
    alternative: 'Ezetimibe or PCSK9 inhibitors for lipid lowering.',
  },
  {
    drug_name: 'lithium',
    condition: 'Severe dehydration',
    severity: 'absolute',
    rationale:
      'Dehydration concentrates lithium. Combined with reduced renal clearance, this causes rapid toxicity.',
    alternative: 'Valproate or quetiapine for acute mania.',
  },
  {
    drug_name: 'warfarin',
    condition: 'Active major bleeding',
    severity: 'absolute',
    rationale: 'Active haemorrhage with an anticoagulant will worsen bleeding and may be fatal.',
    alternative:
      'Haemostatic agents (tranexamic acid), treat underlying cause, reverse warfarin with PCC.',
  },
]
