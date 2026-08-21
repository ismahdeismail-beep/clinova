import type { DrugToxicityProfile } from '../types/drugChecker'

export const DRUG_TOXICITY_PROFILES: DrugToxicityProfile[] = [
  {
    drug_name: 'paracetamol',
    toxicities: [
      {
        condition: 'Acute overdose (greater than 150mg/kg)',
        symptoms: ['Nausea', 'Vomiting', 'RUQ pain', 'Jaundice', 'Coagulopathy', 'Encephalopathy'],
        severity: 'life-threatening',
        management:
          'N-acetylcysteine (NAC) within 8 hours is 100% effective. Measure paracetamol levels at 4 hours post-ingestion and plot on Rumack-Matthew nomogram. IV NAC protocol: 150mg/kg in 200mL D5W over 15min, then 50mg/kg over 4h, then 100mg/kg over 16h.',
        antidote: 'N-acetylcysteine (NAC)',
        dose_threshold: '150mg/kg (acute single ingestion)',
      },
      {
        condition: 'Chronic supratherapeutic ingestion',
        symptoms: ['Malaise', 'Anorexia', 'Nausea', 'RUQ tenderness', 'Elevated LFTs'],
        severity: 'serious',
        management:
          'Start NAC if high clinical suspicion. Levels may be unreliable in chronic overdose. Monitor LFTs, INR, renal function.',
        antidote: 'N-acetylcysteine (NAC)',
        dose_threshold: 'Greater than 150mg/kg/day for 48+ hours',
      },
    ],
  },
  {
    drug_name: 'warfarin',
    toxicities: [
      {
        condition: 'Over-anticoagulation (INR greater than 5)',
        symptoms: [
          'Bruising',
          'Gingival bleeding',
          'Epistaxis',
          'Haematuria',
          'GI haemorrhage',
          'Intracranial haemorrhage',
        ],
        severity: 'life-threatening',
        management:
          'INR 5-9 no bleeding: hold warfarin, give oral vitamin K 1-2.5mg. INR greater than 9 no bleeding: give vitamin K 2.5-5mg. Major bleeding: IV vitamin K 10mg + 4-factor PCC (25-50 units/kg).',
        antidote: 'Vitamin K (phytomenadione) + 4-factor PCC (Octaplex/Beriplex)',
        dose_threshold: 'INR greater than 5.0',
      },
    ],
  },
  {
    drug_name: 'digoxin',
    toxicities: [
      {
        condition: 'Digoxin toxicity',
        symptoms: [
          'Nausea',
          'Vomiting',
          'Visual disturbance (yellow-green halos)',
          'Bradyarrhythmia',
          'Heart block',
          'Bidirectional ventricular tachycardia',
        ],
        severity: 'life-threatening',
        management:
          'Withhold digoxin. Check K+ (hypokalaemia worsens toxicity). Atropine for bradycardia. Digoxin-specific antibody fragments (DigiFab) for life-threatening toxicity: 1 vial per 0.5mg ingested.',
        antidote: 'Digoxin-specific antibody fragments (DigiFab)',
        dose_threshold:
          'Level greater than 2.0 ng/mL (chronic) or acute ingestion greater than 10mg',
      },
    ],
  },
  {
    drug_name: 'opiate',
    toxicities: [
      {
        condition: 'Opioid overdose',
        symptoms: [
          'Respiratory depression (RR less than 8)',
          'Pinpoint pupils',
          'Coma',
          'Cyanosis',
          'Hypotension',
        ],
        severity: 'life-threatening',
        management:
          'IV naloxone 0.4-2mg, repeat every 2-3 minutes as needed. Large doses may be needed for fentanyl (up to 10mg+). Ventilatory support. Monitor for re-narcotisation (naloxone half-life 30-90 min vs opioid hours).',
        antidote: 'Naloxone',
        dose_threshold: 'Variable by agent',
      },
    ],
  },
  {
    drug_name: 'iron',
    toxicities: [
      {
        condition: 'Iron overdose',
        symptoms: [
          'Vomiting',
          'GI haemorrhage',
          'Metabolic acidosis',
          'Hepatotoxicity',
          'Shock',
          'Multi-organ failure',
        ],
        severity: 'life-threatening',
        management:
          'Whole bowel irrigation (polyethylene glycol). IV desferrioxamine 15mg/kg/hr (max 6g/day). Chelation for serum iron greater than 500 mcg/dL or symptoms. Haemodialysis for iron-desferrioxamine complex in renal failure.',
        antidote: 'Deferoxamine (desferrioxamine)',
        dose_threshold: 'Acute ingestion greater than 20mg elemental iron/kg',
      },
    ],
  },
  {
    drug_name: 'methotrexate',
    toxicities: [
      {
        condition: 'High-dose methotrexate toxicity',
        symptoms: ['Mucositis', 'Pancytopenia', 'Renal failure', 'Hepatotoxicity', 'Neurotoxicity'],
        severity: 'life-threatening',
        management:
          'Aggressive hydration, urinary alkalinisation (pH greater than 7), leucovorin rescue (begin at 24 hours post-MTX). Glucarpidase for severe renal failure. Monitor MTX levels at 24, 48, 72 hours.',
        antidote: 'Leucovorin (folinic acid) / Glucarpidase (Voraxar)',
        dose_threshold:
          'Plasma MTX greater than 10 micromol/L at 24h or greater than 1 micromol/L at 48h',
      },
    ],
  },
  {
    drug_name: 'lithium',
    toxicities: [
      {
        condition: 'Lithium toxicity',
        symptoms: [
          'Coarse tremor',
          'Ataxia',
          'Dysarthria',
          'Nausea',
          'Diarrhoea',
          'Confusion',
          'Seizures',
          'Renal failure',
        ],
        severity: 'life-threatening',
        management:
          'Discontinue lithium. IV normal saline hydration. Whole bowel irrigation if acute ingestion. Haemodialysis for levels greater than 4.0 mEq/L, or severe symptoms, or renal failure. Monitor levels every 4-6 hours.',
        antidote: 'None (supportive care + haemodialysis)',
        dose_threshold:
          'Level greater than 1.5 mEq/L (mild), greater than 2.5 (moderate), greater than 4.0 (severe)',
      },
    ],
  },
  {
    drug_name: 'salicylate',
    toxicities: [
      {
        condition: 'Salicylate toxicity',
        symptoms: [
          'Tinnitus',
          'Hearing loss',
          'Nausea',
          'Vomiting',
          'Hyperpnoea',
          'Metabolic acidosis',
          'Respiratory alkalosis',
          'Hyperthermia',
          'Seizures',
        ],
        severity: 'life-threatening',
        management:
          'Multiple-dose activated charcoal (MDAC) if sustained-release. IV sodium bicarbonate for alkalinisation of urine (target urine pH 7.5-8.0). Haemodialysis for severe toxicity (level greater than 100mg/dL acute, greater than 60mg/dL chronic). Correct dehydration.',
        antidote: 'None (sodium bicarbonate + haemodialysis)',
        dose_threshold: 'Acute: greater than 150mg/kg; Chronic: greater than 100mg/kg',
      },
    ],
  },
  {
    drug_name: 'theophylline',
    toxicities: [
      {
        condition: 'Theophylline toxicity',
        symptoms: [
          'Nausea',
          'Vomiting',
          'Tremor',
          'Tachycardia',
          'Seizures',
          'Cardiac arrhythmias',
          'Metabolic acidosis',
        ],
        severity: 'life-threatening',
        management:
          'Activated charcoal (single or multiple dose). Beta-blockers for tachycardia. Benzodiazepines for seizures. Haemodialysis for levels greater than 100 mcg/mL (acute) or greater than 60 mcg/mL (chronic) or seizures.',
        antidote: 'None (activated charcoal + haemodialysis)',
        dose_threshold: 'Level greater than 20 mcg/mL (therapeutic: 10-20)',
      },
    ],
  },
  {
    drug_name: 'benzodiazepine',
    toxicities: [
      {
        condition: 'Benzodiazepine overdose',
        symptoms: ['Drowsiness', 'Ataxia', 'Dysarthria', 'Respiratory depression', 'Coma'],
        severity: 'life-threatening',
        management:
          'Supportive care is primary (airway, ventilation). Flumazenil 0.2mg IV over 30 seconds, repeat 0.3mg then 0.5mg at 1-minute intervals. CAUTION: flumazenil can precipitate seizures in chronic benzodiazepine users.',
        antidote: 'Flumazenil (with caution)',
        dose_threshold: 'Variable by agent and route',
      },
    ],
  },
  {
    drug_name: 'methanol',
    toxicities: [
      {
        condition: 'Methanol poisoning',
        symptoms: [
          'Nausea',
          'Vomiting',
          'Visual disturbance (scotomata)',
          'Blindness',
          'Severe metabolic acidosis',
          'Pancreatitis',
        ],
        severity: 'life-threatening',
        management:
          'Fomepizole (ADH inhibitor) 15mg/kg IV loading dose. Haemodialysis. IV ethanol alternative if fomepizole unavailable. Sodium bicarbonate for acidosis. Folic acid 50mg IV every 4 hours.',
        antidote: 'Fomepizole (Antizol) or IV ethanol',
        dose_threshold: 'Greater than 10mL of pure methanol',
      },
    ],
  },
  {
    drug_name: 'ethylene glycol',
    toxicities: [
      {
        condition: 'Ethylene glycol poisoning',
        symptoms: [
          'CNS depression',
          'Nausea',
          'Calcium oxalate crystalluria',
          'Metabolic acidosis',
          'Renal failure',
          'Cardiotoxicity',
        ],
        severity: 'life-threatening',
        management:
          'Fomepizole 15mg/kg IV loading dose. Haemodialysis. IV ethanol alternative. Calcium gluconate for hypocalcaemia. Thiamine and pyridoxine.',
        antidote: 'Fomepizole (Antizol) or IV ethanol',
        dose_threshold: 'Greater than 100mL',
      },
    ],
  },
  {
    drug_name: 'digoxin',
    toxicities: [
      {
        condition: 'Acute digoxin ingestion',
        symptoms: ['Nausea', 'Vomiting', 'Bradyarrhythmia', 'Hyperkalaemia', 'Heart block'],
        severity: 'life-threatening',
        management:
          'Activated charcoal if within 1 hour. Atropine for bradycardia. DigiFab for life-threatening arrhythmias or K+ greater than 5.5. Haemodialysis ineffective (large volume of distribution).',
        antidote: 'Digoxin-specific antibody fragments (DigiFab)',
        dose_threshold: 'Acute ingestion greater than 10mg or level greater than 5 ng/mL',
      },
    ],
  },
  {
    drug_name: 'tricyclic antidepressant',
    toxicities: [
      {
        condition: 'TCA overdose',
        symptoms: [
          'QRS prolongation (greater than 100ms)',
          'Seizures',
          'Anticholinergic effects',
          'Cardiac arrest',
          'Respiratory depression',
          'Hypotension',
        ],
        severity: 'life-threatening',
        management:
          'Sodium bicarbonate 1-2 mEq/kg IV bolus for QRS greater than 100ms (target pH 7.50-7.55). Benzodiazepines for seizures. Sodium bicarbonate infusion. Whole bowel irrigation for sustained-release. Avoid physostigmine. Lipid emulsion for refractory cardiotoxicity.',
        antidote: 'Sodium bicarbonate (for QRS prolongation)',
        dose_threshold: 'Toxic ingestion greater than 10mg/kg',
      },
    ],
  },
  {
    drug_name: 'metformin',
    toxicities: [
      {
        condition: 'Metformin-associated lactic acidosis',
        symptoms: [
          'Nausea',
          'Vomiting',
          'Abdominal pain',
          'Kussmaul breathing',
          'Metabolic acidosis (pH less than 7.3)',
          'Lactate greater than 5 mmol/L',
        ],
        severity: 'life-threatening',
        management:
          'Haemodialysis (removes both metformin and lactate). IV sodium bicarbonate for severe acidosis (pH less than 7.1). Fluid resuscitation. Avoid vasopressors if possible. Monitor electrolytes.',
        antidote: 'None (haemodialysis is definitive treatment)',
        dose_threshold: 'Serum metformin greater than 100 mcg/mL',
      },
    ],
  },
  {
    drug_name: 'paraquat',
    toxicities: [
      {
        condition: 'Paraquat poisoning',
        symptoms: [
          'Oral ulceration',
          'Nausea',
          'Vomiting',
          'Pulmonary fibrosis',
          'Renal failure',
          'Hepatic failure',
          'Multi-organ failure',
        ],
        severity: 'life-threatening',
        management:
          'Activated charcoal or Fuller earth within 1 hour (reduces absorption by 90%). Haemoperfusion within 4 hours. Cyclophosphamide + methylprednisolone pulse therapy. No definitive antidote — mortality is high with large ingestions.',
        antidote: 'No specific antidote (supportive + Fuller earth)',
        dose_threshold:
          'Any significant ingestion (toxicity correlates with plasma level at 4 hours)',
      },
    ],
  },
  {
    drug_name: 'colchicine',
    toxicities: [
      {
        condition: 'Colchicine toxicity (therapeutic or overdose)',
        symptoms: [
          'Nausea',
          'Vomiting',
          'Diarrhoea',
          'Pancytopenia',
          'Alopecia',
          'Multi-organ failure',
        ],
        severity: 'life-threatening',
        management:
          'Activated charcoal. G-CSF for neutropenia. Supportive care. Whole bowel irrigation for sustained-release. Haemodialysis is ineffective. Death typically occurs at 1-3 days post-ingestion.',
        antidote: 'None (supportive care)',
        dose_threshold: 'Acute ingestion greater than 0.5mg/kg (fatal at greater than 0.8mg/kg)',
      },
    ],
  },
  {
    drug_name: 'quinine',
    toxicities: [
      {
        condition: 'Cinchonism / Quinine toxicity',
        symptoms: [
          'Tinnitus',
          'Visual disturbance',
          'Headache',
          'Nausea',
          'Blindness (Blackwater fever)',
          'Cardiac arrhythmia',
          'Hypoglycaemia',
        ],
        severity: 'life-threatening',
        management:
          'Activated charcoal. IV quinidine (reverses cinchonism). Glucose infusion for hypoglycaemia. Haemodialysis if levels greater than 15 mg/L.',
        antidote: 'None (supportive + IV quinidine for cinchonism)',
        dose_threshold: 'Level greater than 10 mg/L (therapeutic: 2-8)',
      },
    ],
  },
]
