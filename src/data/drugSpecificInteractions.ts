import type { DrugInteraction } from '../types/drugChecker'

export const SPECIFIC_INTERACTIONS: DrugInteraction[] = [
  {
    id: 'si-001',
    drug_a: 'warfarin',
    drug_b: 'paracetamol',
    severity: 'moderate',
    effect:
      'INR elevation with regular paracetamol use (greater than 2g/day for more than 3 days).',
    mechanism:
      'Paracetamol metabolite (NAPQI) inhibits vitamin K-dependent clotting factor synthesis at high doses.',
    management: 'Monitor INR if regular paracetamol use. Keep dose below 2g/day.',
    evidence: 'established',
    dose_dependent: true,
    onset: 'delayed',
  },
  {
    id: 'si-002',
    drug_a: 'ciprofloxacin',
    drug_b: 'tizanidine',
    severity: 'contraindicated',
    effect:
      'Massive increase in tizanidine levels (10-fold AUC increase). Severe hypotension, sedation, respiratory depression.',
    mechanism:
      'Ciprofloxacin is a potent CYP1A2 inhibitor. Tizanidine is almost exclusively metabolised by CYP1A2.',
    management:
      'CONTRAINDICATED. Use alternative antibiotic or muscle relaxant (baclofen, diazepam).',
    evidence: 'established',
    dose_dependent: false,
    onset: 'rapid',
  },
  {
    id: 'si-003',
    drug_a: 'erythromycin',
    drug_b: 'statin',
    severity: 'major',
    effect:
      'Markedly elevated statin levels. Risk of rhabdomyolysis (especially with simvastatin).',
    mechanism:
      'Erythromycin potently inhibits CYP3A4 and P-glycoprotein, dramatically reducing statin metabolism.',
    management:
      'Avoid combination. If azole antibiotic needed, use pravastatin (not CYP3A4 metabolised).',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-004',
    drug_a: 'metformin',
    drug_b: 'iodinated contrast',
    severity: 'major',
    effect: 'Lactic acidosis risk when contrast is given to a patient with AKI while on metformin.',
    mechanism:
      'Contrast-induced nephropathy reduces metformin clearance. Metformin accumulates, inhibiting mitochondrial complex I.',
    management:
      'Withhold metformin 48 hours before and after IV contrast. Check renal function before restarting.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-005',
    drug_a: 'trimethoprim',
    drug_b: 'warfarin',
    severity: 'major',
    effect: 'Significant INR elevation and bleeding risk.',
    mechanism:
      'Trimethoprim is a weak CYP2C9 inhibitor and folate antagonist, reducing vitamin K-dependent factor synthesis.',
    management:
      'Monitor INR closely when starting/stopping co-trimoxazole. Consider temporary warfarin dose reduction.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-006',
    drug_a: 'fluconazole',
    drug_b: 'warfarin',
    severity: 'major',
    effect: 'Markedly elevated INR with concomitant fluconazole. High bleeding risk.',
    mechanism:
      'Fluconazole is a potent CYP2C9 inhibitor, blocking S-warfarin metabolism (the more active enantiomer).',
    management: 'Reduce warfarin dose by 25-50% when adding fluconazole. Monitor INR at days 3-5.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-007',
    drug_a: 'rifampicin',
    drug_b: 'ciclosporin',
    severity: 'major',
    effect: 'Markedly reduced ciclosporin levels, risk of graft rejection or disease flare.',
    mechanism:
      'Rifampicin is a potent CYP3A4 and PXR inducer, accelerating ciclosporin metabolism by 2-3 fold.',
    management:
      'Avoid combination. If unavoidable, increase ciclosporin dose 2-3 fold with trough level monitoring.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-008',
    drug_a: 'rifampicin',
    drug_b: 'methadone',
    severity: 'major',
    effect:
      'Reduced methadone levels leading to withdrawal symptoms and risk of illicit opioid use.',
    mechanism:
      'Rifampicin induces CYP3A4/2B6/2C8, accelerating methadone metabolism and reducing plasma levels by 30-60%.',
    management:
      'Increase methadone dose under supervision. Monitor for withdrawal. Consider buprenorphine as alternative.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-009',
    drug_a: 'tamoxifen',
    drug_b: 'paroxetine',
    severity: 'major',
    effect: 'Reduced efficacy of tamoxifen in breast cancer treatment.',
    mechanism:
      'Paroxetine is a potent CYP2D6 inhibitor. Tamoxifen requires CYP2D6 conversion to its active metabolite endoxifen.',
    management:
      'Avoid paroxetine in tamoxifen users. Use venlafaxine, desvenlafaxine, or escitalopram for hot flushes.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-010',
    drug_a: 'linezolid',
    drug_b: 'SSRI',
    severity: 'major',
    effect:
      'Risk of serotonin syndrome: hyperthermia, agitation, myoclonus, altered mental status.',
    mechanism:
      'Linezolid is a weak, reversible MAO inhibitor. Combined with SSRI reuptake inhibition, serotonin levels become dangerously high.',
    management:
      'If linezolid essential, discontinue SSRI 2 weeks before. Monitor for serotonin syndrome signs. Methylene blue contraindicated.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'rapid',
  },
  {
    id: 'si-011',
    drug_a: 'methotrexate',
    drug_b: 'trimethoprim',
    severity: 'major',
    effect: 'Additive antifolate toxicity: pancytopenia, mucositis, hepatotoxicity.',
    mechanism:
      'Both inhibit dihydrofolate reductase (DHFR). Combined folate depletion causes synergistic bone marrow suppression.',
    management:
      'Avoid combination. Monitor CBC weekly if unavoidable. Folinic acid rescue may be needed.',
    evidence: 'established',
    dose_dependent: true,
    onset: 'delayed',
  },
  {
    id: 'si-012',
    drug_a: 'methotrexate',
    drug_b: 'proton pump inhibitor',
    severity: 'moderate',
    effect: 'Elevated methotrexate levels, particularly with high-dose MTX regimens.',
    mechanism:
      'PPIs reduce renal tubular secretion of methotrexate and may alter gastrointestinal absorption and urinary pH.',
    management:
      'Monitor MTX levels with high-dose therapy. Consider H2 blocker alternative for acid suppression.',
    evidence: 'case-report',
    dose_dependent: true,
    onset: 'delayed',
  },
  {
    id: 'si-013',
    drug_a: 'methotrexate',
    drug_b: 'NSAID',
    severity: 'major',
    effect:
      'Reduced renal clearance of methotrexate leading to toxic levels, pancytopenia, mucositis.',
    mechanism:
      'NSAIDs reduce renal blood flow and inhibit tubular secretion of methotrexate, raising plasma levels.',
    management:
      'Avoid NSAIDs during MTX therapy. Use paracetamol for pain. Monitor CBC, LFTs, creatinine.',
    evidence: 'established',
    dose_dependent: true,
    onset: 'delayed',
  },
  {
    id: 'si-014',
    drug_a: 'theophylline',
    drug_b: 'ciprofloxacin',
    severity: 'major',
    effect: 'Theophylline levels increase 2-3 fold. Risk of seizures, arrhythmias, vomiting.',
    mechanism:
      'Ciprofloxacin is a potent CYP1A2 inhibitor. Theophylline is primarily metabolised by CYP1A2.',
    management:
      'Avoid combination. If unavoidable, reduce theophylline dose by 50% and monitor levels closely.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-015',
    drug_a: 'carbamazepine',
    drug_b: 'valproate',
    severity: 'major',
    effect: 'Carbamazepine epoxide levels rise (valproate inhibits its hydrolysis). Toxicity risk.',
    mechanism:
      'Valproate inhibits epoxide hydrolase, causing carbamazepine-10,11-epoxide accumulation. Also pharmacodynamic synergism.',
    management:
      'Monitor carbamazepine-epoxide levels. Reduce carbamazepine dose if toxicity develops. Consider alternative AED.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-016',
    drug_a: 'fluconazole',
    drug_b: 'QT-prolonging',
    severity: 'major',
    effect: 'QT prolongation risk with fluconazole (dose-dependent, especially above 400mg).',
    mechanism:
      'Fluconazole blocks cardiac hERG potassium channels, particularly at higher doses. Additive with other QT drugs.',
    management:
      'Avoid high-dose fluconazole with other QT-prolonging drugs. Monitor ECG if essential.',
    evidence: 'established',
    dose_dependent: true,
    onset: 'delayed',
  },
  {
    id: 'si-017',
    drug_a: 'fluoroquinolone',
    drug_b: 'steroid',
    severity: 'major',
    effect: 'Significantly increased tendon rupture risk. FDA Black Box Warning.',
    mechanism:
      'Fluoroquinolones and corticosteroids independently damage tendon collagen. Combined effect is synergistic.',
    management:
      'Avoid combination if possible. Warn patients about tendon pain. Discontinue fluoroquinolone at first sign of tendinitis.',
    evidence: 'established',
    dose_dependent: true,
    onset: 'delayed',
  },
  {
    id: 'si-018',
    drug_a: 'amiodarone',
    drug_b: 'simvastatin',
    severity: 'major',
    effect: 'Markedly elevated simvastatin levels (up to 4-fold). High rhabdomyolysis risk.',
    mechanism:
      'Amiodarone inhibits CYP3A4 and P-glycoprotein, dramatically reducing simvastatin clearance.',
    management:
      'Limit simvastatin to 20mg/day with amiodarone. Better to switch to pravastatin/rosuvastatin.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-019',
    drug_a: 'verapamil',
    drug_b: 'beta-blocker',
    severity: 'major',
    effect: 'Severe bradycardia, heart block, hypotension, heart failure.',
    mechanism: 'Additive negative chronotropic and inotropic effects on the SA and AV nodes.',
    management:
      'Avoid combination. If essential, monitor ECG and blood pressure closely. Have atropine available.',
    evidence: 'established',
    dose_dependent: true,
    onset: 'rapid',
  },
  {
    id: 'si-020',
    drug_a: 'digoxin',
    drug_b: 'amiodarone',
    severity: 'major',
    effect: 'Digoxin levels increase 70-100%. Risk of fatal arrhythmias.',
    mechanism: 'Amiodarone inhibits P-glycoprotein, reducing renal and biliary digoxin clearance.',
    management:
      'Reduce digoxin dose by 50% when starting amiodarone. Monitor digoxin levels and ECG.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-021',
    drug_a: 'ketoconazole',
    drug_b: 'methadone',
    severity: 'major',
    effect: 'Elevated methadone levels, risk of QT prolongation and respiratory depression.',
    mechanism:
      'Ketoconazole is a potent CYP3A4 inhibitor. Methadone is partially metabolised by CYP3A4.',
    management:
      'Monitor for opioid toxicity. Consider dose reduction. Use fluconazole (less CYP inhibition) if antifungal needed.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-022',
    drug_a: 'metoclopramide',
    drug_b: 'levodopa',
    severity: 'moderate',
    effect: 'Reduced levodopa efficacy due to dopamine receptor antagonism.',
    mechanism:
      'Metoclopramide is a D2 receptor antagonist, directly opposing levodopa mechanism in the CNS.',
    management:
      'Avoid metoclopramide in Parkinsons. Use domperidone (does not cross BBB) or ondansetron for nausea.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'rapid',
  },
  {
    id: 'si-023',
    drug_a: 'warfarin',
    drug_b: 'amiodarone',
    severity: 'major',
    effect:
      'Significant INR elevation. Enhanced anticoagulation persisting weeks after amiodarone discontinuation.',
    mechanism:
      'Amiodarone inhibits CYP2C9 and CYP3A4, reducing warfarin clearance. Effect persists due to extremely long half-life.',
    management:
      'Reduce warfarin dose by 30-50% when starting amiodarone. Monitor INR weekly. Continue monitoring for months after stopping amiodarone.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-024',
    drug_a: 'phenytoin',
    drug_b: 'isoniazid',
    severity: 'major',
    effect:
      'Phenytoin toxicity: ataxia, nystagmus, confusion. Isoniazid toxicity: seizures, hepatotoxicity.',
    mechanism:
      'Isoniazid inhibits CYP2C9 (phenytoin metabolism) and also competes for hepatic metabolism. Both are hepatotoxic.',
    management:
      'Monitor phenytoin levels. Consider alternative AED (levetiracetam). Monitor LFTs closely.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-025',
    drug_a: 'warfarin',
    drug_b: 'miconazole',
    severity: 'major',
    effect:
      'Markedly elevated INR with systemic miconazole. Even oral gel miconazole can affect INR.',
    mechanism:
      'Miconazole inhibits CYP2C9, blocking warfarin metabolism. Significant even with oral mucosal application.',
    management:
      'Monitor INR when starting/stopping miconazole oral gel. Consider alternative antifungal.',
    evidence: 'established',
    dose_dependent: true,
    onset: 'delayed',
  },
  {
    id: 'si-026',
    drug_a: 'clozapine',
    drug_b: 'ciprofloxacin',
    severity: 'major',
    effect: 'Clozapine toxicity: seizures, sedation, cardiovascular collapse.',
    mechanism:
      'Ciprofloxacin inhibits CYP1A2, the primary pathway for clozapine metabolism. Levels increase 2-3 fold.',
    management:
      'Avoid combination. Monitor clozapine levels. Reduce dose by 30-50% if unavoidable.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-027',
    drug_a: 'terfenadine',
    drug_b: 'erythromycin',
    severity: 'contraindicated',
    effect: 'Fatal cardiac arrhythmias (TdP). Terfenadine withdrawn from market in many countries.',
    mechanism:
      'Erythromycin inhibits CYP3A4, causing terfenadine accumulation. Terfenadine blocks hERG channels at high levels.',
    management:
      'CONTRAINDICATED. Use non-sedating antihistamines not requiring CYP3A4 metabolism (cetirizine, fexofenadine).',
    evidence: 'established',
    dose_dependent: false,
    onset: 'rapid',
  },
  {
    id: 'si-028',
    drug_a: 'metformin',
    drug_b: 'alcohol',
    severity: 'major',
    effect:
      'Lactic acidosis risk. Alcohol impairs hepatic gluconeogenesis and increases lactate production.',
    mechanism:
      'Alcohol inhibits hepatic lactate metabolism and gluconeogenesis while metformin inhibits mitochondrial complex I.',
    management:
      'Advise patients to limit alcohol. Avoid binge drinking. Monitor lactate if symptomatic.',
    evidence: 'established',
    dose_dependent: true,
    onset: 'rapid',
  },
  {
    id: 'si-029',
    drug_a: 'oxycodone',
    drug_b: 'ketoconazole',
    severity: 'major',
    effect: 'Elevated oxycodone levels. Increased respiratory depression and sedation.',
    mechanism: 'Ketoconazole inhibits CYP3A4, the primary pathway for oxycodone N-demethylation.',
    management:
      'Reduce oxycodone dose. Monitor respiratory status. Use alternative antifungal if possible.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-030',
    drug_a: 'pregabalin',
    drug_b: 'oxycodone',
    severity: 'moderate',
    effect:
      'Additive respiratory depression, especially in opioid-naive patients. FDA boxed warning.',
    mechanism:
      'Synergistic CNS depression through different mechanisms: gabapentinoid alpha-2-delta subunit binding + mu-opioid receptor agonism.',
    management:
      'Start at lowest doses. Monitor respiratory rate and SpO2. Avoid in respiratory compromise.',
    evidence: 'established',
    dose_dependent: true,
    onset: 'rapid',
  },
  {
    id: 'si-031',
    drug_a: 'isotretinoin',
    drug_b: 'tetracycline',
    severity: 'contraindicated',
    effect:
      'Pseudotumour cerebri (benign intracranial hypertension): severe headache, papilloedema, visual loss.',
    mechanism:
      'Both independently increase intracranial pressure. Isotretinoin may alter CSF dynamics; tetracyclines inhibit CSF absorption.',
    management:
      'CONTRAINDICATED. Use alternative antibiotic (amoxicillin, azithromycin) or alternative acne treatment.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-032',
    drug_a: 'orlistat',
    drug_b: 'ciclosporin',
    severity: 'major',
    effect: 'Markedly reduced ciclosporin levels. Risk of organ rejection.',
    mechanism:
      'Orlistat reduces fat absorption, decreasing ciclosporin bioavailability by up to 30%.',
    management: 'Separate administration by 3 hours. Monitor ciclosporin trough levels closely.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-033',
    drug_a: 'dolutegravir',
    drug_b: 'metformin',
    severity: 'moderate',
    effect: 'Elevated metformin levels (up to 79% increase). Increased hypoglycaemia risk.',
    mechanism:
      'Dolutegravir inhibits OCT2 and MATE1 transporters, reducing renal tubular secretion of metformin.',
    management:
      'Limit metformin to 1000mg/day when combined with dolutegravir. Monitor blood glucose.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-034',
    drug_a: 'bosentan',
    drug_b: 'simvastatin',
    severity: 'major',
    effect: 'Markedly reduced simvastatin levels (50% decrease), reducing efficacy.',
    mechanism: 'Bosentan induces CYP3A4 via PXR activation, accelerating simvastatin metabolism.',
    management:
      'Use alternative statin (pravastatin, rosuvastatin) or increase statin dose with monitoring.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-035',
    drug_a: 'ranolazine',
    drug_b: 'simvastatin',
    severity: 'moderate',
    effect: 'Elevated simvastatin levels (approximately 2-fold increase).',
    mechanism: 'Ranolazine inhibits CYP3A4, reducing simvastatin first-pass metabolism.',
    management: 'Limit simvastatin dose to 20mg/day when combined with ranolazine.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-036',
    drug_a: 'apixaban',
    drug_b: 'ketoconazole',
    severity: 'major',
    effect: 'Apixaban levels increase approximately 2-fold. Significant bleeding risk.',
    mechanism:
      'Ketoconazole is a dual P-gp inhibitor and strong CYP3A4 inhibitor, both pathways of apixaban elimination.',
    management:
      'Reduce apixaban dose by 50%. Avoid ketoconazole; use fluconazole or voriconazole instead.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-037',
    drug_a: 'rivaroxaban',
    drug_b: 'ketoconazole',
    severity: 'major',
    effect: 'Rivaroxaban levels increase 70-160%. High bleeding risk.',
    mechanism:
      'Ketoconazole inhibits both CYP3A4 and P-glycoprotein, the dual elimination pathways of rivaroxaban.',
    management: 'Avoid ketoconazole with rivaroxaban. Use fluconazole with caution and monitoring.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-038',
    drug_a: 'midazolam',
    drug_b: 'erythromycin',
    severity: 'major',
    effect: 'Prolonged sedation and respiratory depression with midazolam.',
    mechanism: 'Erythromycin inhibits CYP3A4, reducing midazolam clearance by approximately 50%.',
    management: 'Reduce midazolam dose by 50%. Monitor respiratory status closely.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'rapid',
  },
  {
    id: 'si-039',
    drug_a: 'sirolimus',
    drug_b: 'erythromycin',
    severity: 'major',
    effect: 'Sirolimus levels increase 5-10 fold. Risk of immunosuppressive toxicity.',
    mechanism:
      'Erythromycin inhibits CYP3A4 and P-glycoprotein, dramatically increasing sirolimus bioavailability.',
    management:
      'Avoid combination. Use azithromycin (less CYP3A4 inhibition) if macrolide antibiotic needed.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-040',
    drug_a: 'tacrolimus',
    drug_b: 'fluconazole',
    severity: 'major',
    effect: 'Tacrolimus levels increase 3-5 fold. Risk of nephrotoxicity and neurotoxicity.',
    mechanism: 'Fluconazole inhibits CYP3A4, the primary metabolic pathway for tacrolimus.',
    management:
      'Reduce tacrolimus dose by 50-75% when starting fluconazole. Monitor trough levels frequently.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-041',
    drug_a: 'colchicine',
    drug_b: 'clarithromycin',
    severity: 'contraindicated',
    effect: 'Fatal colchicine toxicity: multi-organ failure, pancytopenia, rhabdomyolysis.',
    mechanism:
      'Clarithromycin inhibits CYP3A4 and P-glycoprotein, causing massive colchicine accumulation.',
    management:
      'CONTRAINDICATED in patients with renal/hepatic impairment. If essential in normal renal function, reduce colchicine dose and monitor.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'rapid',
  },
  {
    id: 'si-042',
    drug_a: 'colchicine',
    drug_b: 'ketoconazole',
    severity: 'contraindicated',
    effect: 'Fatal colchicine toxicity. Even single doses can be lethal in renal impairment.',
    mechanism:
      'Ketoconazole inhibits CYP3A4 and P-glycoprotein, preventing colchicine elimination.',
    management:
      'CONTRAINDICATED. Use alternative antifungal. For gout prophylaxis, use allopurinol or febuxostat.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'rapid',
  },
  {
    id: 'si-043',
    drug_a: 'moxifloxacin',
    drug_b: 'amiodarone',
    severity: 'contraindicated',
    effect: 'Fatal QT prolongation and TdP. Both are potent QT prolongers.',
    mechanism: 'Additive hERG potassium channel blockade from two potent QT-prolonging agents.',
    management:
      'CONTRAINDICATED. Use azithromycin (macrolide with least QT effect) if antibiotic needed.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'rapid',
  },
  {
    id: 'si-044',
    drug_a: 'sumatriptan',
    drug_b: 'MAOI',
    severity: 'contraindicated',
    effect: 'Serotonin syndrome. Potentially fatal.',
    mechanism:
      'MAOIs prevent serotonin degradation. Triptans stimulate 5-HT1B/1D. Combined effect is life-threatening.',
    management: 'CONTRAINDICATED. Use non-triptan alternatives (paracetamol, NSAIDs) for migraine.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'rapid',
  },
  {
    id: 'si-045',
    drug_a: 'clozapine',
    drug_b: 'valproate',
    severity: 'moderate',
    effect: 'Valproate may increase clozapine levels modestly. Additive haematological toxicity.',
    mechanism:
      'Both cause agranulocytosis independently. Valproate may inhibit clozapine metabolism via CYP1A2.',
    management:
      'Monitor FBC closely (weekly for clozapine). Watch for signs of bone marrow suppression.',
    evidence: 'case-report',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-046',
    drug_a: 'lithium',
    drug_b: 'ibuprofen',
    severity: 'major',
    effect: 'Lithium levels increase 15-25%. Risk of toxicity.',
    mechanism: 'Ibuprofen inhibits renal prostaglandins, reducing GFR and lithium clearance.',
    management:
      'Monitor lithium levels when starting/stopping NSAIDs. Use paracetamol as first-line analgesic.',
    evidence: 'established',
    dose_dependent: true,
    onset: 'delayed',
  },
  {
    id: 'si-047',
    drug_a: 'enalapril',
    drug_b: 'potassium chloride',
    severity: 'major',
    effect: 'Severe hyperkalaemia (K+ above 6.0 mmol/L). Risk of fatal arrhythmia.',
    mechanism:
      'ACE inhibitors reduce aldosterone secretion, impairing renal potassium excretion. Exogenous potassium adds to the load.',
    management:
      'Monitor K+ closely. Avoid K+ supplements unless documented hypokalaemia. Use potassium-sparing diuretics cautiously.',
    evidence: 'established',
    dose_dependent: true,
    onset: 'delayed',
  },
  {
    id: 'si-048',
    drug_a: 'methotrexate',
    drug_b: 'probenecid',
    severity: 'major',
    effect: 'Markedly elevated methotrexate levels. Severe pancytopenia, mucositis.',
    mechanism: 'Probenecid competitively inhibits renal tubular secretion of methotrexate.',
    management:
      'CONTRAINDICATED with high-dose methotrexate. Monitor closely if low-dose MTX used with probenecid.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
  {
    id: 'si-049',
    drug_a: 'sildenafil',
    drug_b: 'amyl nitrite',
    severity: 'contraindicated',
    effect: 'Life-threatening hypotension. Can cause fatal cardiovascular collapse.',
    mechanism:
      'Both are potent vasodilators. Sildenafil inhibits PDE5 (cGMP), amyl nitrite stimulates NO (cGMP). Synergistic vasodilation.',
    management: 'CONTRAINDICATED. Do not use recreational nitrates with PDE5 inhibitors.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'rapid',
  },
  {
    id: 'si-050',
    drug_a: 'warfarin',
    drug_b: 'st johns wort',
    severity: 'major',
    effect: 'Reduced warfarin effect, subtherapeutic INR, risk of thromboembolism.',
    mechanism: 'St Johns wort induces CYP3A4 and CYP2C9, accelerating warfarin metabolism.',
    management:
      'Avoid St Johns wort. Monitor INR if patient insists on using it. Advise against herbal supplements with warfarin.',
    evidence: 'established',
    dose_dependent: false,
    onset: 'delayed',
  },
]
