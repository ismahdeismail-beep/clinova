import type { DrugClassInteractionRule } from '../types/drugChecker'

export const CLASS_INTERACTION_RULES: DrugClassInteractionRule[] = [
  {
    class_a: [
      'QT-prolonging',
      'antiarrhythmic',
      'antipsychotic',
      'macrolide antibiotic',
      'fluoroquinolone antibiotic',
      'antimalarial',
    ],
    class_b: [
      'QT-prolonging',
      'antiarrhythmic',
      'antipsychotic',
      'macrolide antibiotic',
      'fluoroquinolone antibiotic',
      'antimalarial',
    ],
    severity: 'major',
    mechanism:
      'Additive QT interval prolongation via blockade of cardiac potassium channels (hERG/IKr). Risk of torsades de pointes (TdP).',
    effect: 'Synergistic QT prolongation, risk of fatal ventricular arrhythmia (TdP).',
    management:
      'Avoid combination where possible. If essential: baseline and periodic ECG monitoring, correct electrolytes (K+, Mg2+), avoid other QT-risk factors.',
    onset: 'variable',
  },
  {
    class_a: ['anticoagulant', 'antiplatelet', 'NSAID', 'COX-2 inhibitor', 'SSRI', 'SNRI'],
    class_b: ['anticoagulant', 'antiplatelet', 'NSAID', 'COX-2 inhibitor', 'SSRI', 'SNRI'],
    severity: 'major',
    mechanism:
      'Additive inhibition of haemostasis: anticoagulants impair clotting factors, antiplatelets inhibit platelet aggregation, NSAIDs inhibit COX-1/TXA2, SSRIs/SNRIs impair platelet serotonin uptake.',
    effect:
      'Significantly increased bleeding risk: GI haemorrhage, bruising, haematomas, surgical bleeding.',
    management:
      'Use lowest effective doses. Add PPI gastroprotection. Monitor for signs of bleeding. Consider paracetamol instead of NSAIDs.',
    onset: 'rapid',
  },
  {
    class_a: [
      'ACE inhibitor',
      'ARB',
      'ARNI',
      'mineralocorticoid antagonist',
      'potassium-sparing diuretic',
    ],
    class_b: [
      'ACE inhibitor',
      'ARB',
      'ARNI',
      'mineralocorticoid antagonist',
      'potassium-sparing diuretic',
      'NSAID',
      'potassium supplement',
    ],
    severity: 'major',
    mechanism:
      'Combined suppression of RAAS reduces renal potassium excretion. NSAIDs further reduce GFR and potassium clearance.',
    effect:
      'Serum K+ >6.0 mmol/L with risk of fatal cardiac arrhythmias (peaked T-waves, sine wave, cardiac arrest).',
    management:
      'Monitor serum K+ and renal function at 1-2 weeks. Avoid triple RAAS blockade. If K+ >5.5, hold/reduce dose, consider kayexalate or insulin/dextrose.',
    onset: 'delayed',
  },
  {
    class_a: ['NSAID', 'COX-2 inhibitor', 'aminoglycoside', 'ACE inhibitor', 'ARB'],
    class_b: [
      'NSAID',
      'COX-2 inhibitor',
      'aminoglycoside',
      'ACE inhibitor',
      'ARB',
      'Immunosuppressant',
      'loop diuretic',
    ],
    severity: 'major',
    mechanism:
      'NSAIDs inhibit renal prostaglandins (afferent arteriole vasodilatation), aminoglycosides cause proximal tubular necrosis, ACEi/ARB dilate efferent arteriole: combined effect collapses GFR.',
    effect: 'Acute kidney injury (AKI), elevated creatinine, electrolyte derangements.',
    management:
      'Monitor Cr/eGFR closely. Hydrate well. Avoid triple-whammy (NSAID + diuretic + ACEi/ARB). Hold ACEi/ARB if AKI develops.',
    onset: 'rapid',
  },
  {
    class_a: ['opioid', 'benzodiazepine', 'sedative-hypnotic', 'antipsychotic', 'antihistamine'],
    class_b: ['opioid', 'benzodiazepine', 'sedative-hypnotic', 'antipsychotic', 'antihistamine'],
    severity: 'major',
    mechanism:
      'Synergistic depression of CNS via different receptor pathways (mu-opioid + GABA-A + histamine H1).',
    effect:
      'Respiratory depression, coma, and death. FDA Black Box Warning for opioid+benzo combination.',
    management:
      'Avoid concurrent use where possible. If essential: start low, titrate slowly, monitor respiratory rate and SpO2, have naloxone/flumazenil available.',
    onset: 'rapid',
  },
  {
    class_a: [
      'SSRI',
      'SNRI',
      'MAOI',
      'triptan',
      'meperidine',
      'fentanyl',
      'tapentadol',
      'oxazolidinone',
    ],
    class_b: [
      'SSRI',
      'SNRI',
      'MAOI',
      'triptan',
      'meperidine',
      'fentanyl',
      'tapentadol',
      'oxazolidinone',
    ],
    severity: 'contraindicated',
    mechanism:
      'Excessive serotonergic activity: MAOIs block serotonin degradation, SSRIs/SNRIs block reuptake, triptans stimulate 5-HT1B/1D, serotonergic opioids (meperidine, fentanyl, tapentadol, tramadol, methadone) inhibit reuptake or MAO.',
    effect:
      'Serotonin syndrome: mental status changes, autonomic instability, neuromuscular hyperactivity. Can be fatal.',
    management:
      'CONTRAINDICATED with MAOIs. Washout: 2 weeks (SSRI to MAOI), 5 weeks (fluoxetine to MAOI). Cyproheptadine for acute treatment.',
    onset: 'rapid',
  },
  {
    class_a: ['MAOI'],
    class_b: ['sympathomimetic', 'meperidine'],
    severity: 'contraindicated',
    mechanism:
      'MAOIs prevent breakdown of tyramine and sympathomimetic amines: massive norepinephrine release.',
    effect: 'Hypertensive crisis: BP >180/120 mmHg, headache, intracranial haemorrhage, death.',
    management:
      'CONTRAINDICATED. Avoid tyramine-rich foods. If crisis: IV phentolamine or sublingual nifedipine.',
    onset: 'rapid',
  },
  {
    class_a: ['Statin'],
    class_b: [
      'azole antifungal',
      'macrolide antibiotic',
      'protease inhibitor',
      'fibrate',
      'Immunosuppressant',
      'amiodarone',
    ],
    severity: 'major',
    mechanism:
      'CYP3A4/2C8/2C9 inhibition increases statin plasma levels. Gemfibrozil inhibits statin glucuronidation.',
    effect: 'Rhabdomyolysis: severe muscle pain, elevated CK, myoglobinuria, AKI.',
    management:
      'Limit simvastatin dose with interacting drugs. Use pravastatin/rosuvastatin. Monitor CK. If CK >10x ULN, stop statin.',
    onset: 'delayed',
  },
  {
    class_a: ['NSAID', 'trimethoprim', 'probenecid', 'penicillin', 'proton pump inhibitor'],
    class_b: ['methotrexate'],
    severity: 'major',
    mechanism:
      'Reduced renal tubular secretion of methotrexate or reduced renal clearance: elevated MTX levels.',
    effect: 'Bone marrow suppression (pancytopenia), mucositis, hepatotoxicity, nephrotoxicity.',
    management: 'Monitor CBC, LFTs, renal function. Folinic acid rescue if high-dose MTX.',
    onset: 'delayed',
  },
  {
    class_a: [
      'azole antifungal',
      'macrolide antibiotic',
      'fluoroquinolone',
      'metronidazole',
      'amiodarone',
      'cimetidine',
    ],
    class_b: ['warfarin'],
    severity: 'major',
    mechanism:
      'CYP2C9/3A4 inhibition reduces warfarin metabolism. Reduced vitamin K synthesis by gut flora (antibiotics).',
    effect:
      'Elevated INR, risk of life-threatening haemorrhage (intracranial, GI, retroperitoneal).',
    management:
      'Reduce warfarin dose by 25-50%. Monitor INR within 3-5 days. Educate on bleeding signs.',
    onset: 'delayed',
  },
  {
    class_a: [
      'NSAID',
      'ACE inhibitor',
      'ARB',
      'thiazide diuretic',
      'tetracycline',
      'metronidazole',
    ],
    class_b: ['lithium'],
    severity: 'major',
    mechanism:
      'Reduced renal lithium clearance: NSAIDs reduce GFR, ACEi/ARB dilate efferent arteriole, thiazides increase proximal reabsorption.',
    effect:
      'Lithium toxicity: tremor, ataxia, nausea, confusion, seizures, renal failure (narrow TI: 0.6-1.2 mmol/L).',
    management:
      'Monitor lithium levels when adding/removing interacting drugs. Target 0.6-0.8 mmol/L. If toxic: IV saline, haemodialysis for severe cases.',
    onset: 'delayed',
  },
  {
    class_a: ['amiodarone', 'verapamil', 'diltiazem', 'macrolide antibiotic', 'spironolactone'],
    class_b: ['digoxin'],
    severity: 'major',
    mechanism:
      'P-glycoprotein (P-gp) and/or CYP3A4 inhibition increases digoxin bioavailability and reduces renal clearance.',
    effect: 'Digoxin toxicity: visual disturbances, bradycardia, heart block, fatal arrhythmias.',
    management:
      'Reduce digoxin dose by 50% when adding amiodarone/verapamil. Monitor levels (target 0.5-0.9 ng/mL). Correct hypokalemia.',
    onset: 'delayed',
  },
  {
    class_a: ['macrolide antibiotic', 'fluoroquinolone antibiotic', 'cimetidine'],
    class_b: ['theophylline', 'aminophylline'],
    severity: 'major',
    mechanism: 'CYP1A2 inhibition reduces theophylline metabolism to toxic levels.',
    effect:
      'Theophylline toxicity: seizures, cardiac arrhythmias, vomiting, metabolic acidosis (narrow TI: 10-20 mcg/mL).',
    management:
      'Avoid theophylline + ciprofloxacin/erythromycin. Monitor levels. If toxicity: activated charcoal, benzodiazepines for seizures.',
    onset: 'delayed',
  },
  {
    class_a: ['sulfonylurea', 'insulin', 'meglitinide'],
    class_b: [
      'sulfonamide antibiotic',
      'ACE inhibitor',
      'MAOI',
      'fluoroquinolone',
      'beta-blocker',
      'salicylate',
    ],
    severity: 'moderate',
    mechanism:
      'Reduced renal clearance of sulfonylureas, enhanced insulin sensitivity, or impaired counter-regulatory response.',
    effect: 'Hypoglycaemia (<3.9 mmol/L): sweating, tremor, confusion, seizures, coma.',
    management:
      'Monitor blood glucose closely. Beta-blockers mask symptoms: use cardioselective (bisoprolol). Have glucose available.',
    onset: 'delayed',
  },
  {
    class_a: ['beta-blocker', 'non-DHP calcium channel blocker'],
    class_b: ['beta-agonist inotrope', 'dobutamine', 'dopamine', 'milrinone'],
    severity: 'major',
    mechanism:
      'Beta-blockers competitively antagonise beta-1 receptors, directly opposing inotrope mechanism.',
    effect: 'Loss of inotropic support, haemodynamic collapse, refractory heart failure.',
    management:
      'Avoid combination. If unavoidable: monitor haemodynamics closely. Consider milrinone (works independently of beta-receptors).',
    onset: 'rapid',
  },
  {
    class_a: [
      'rifampicin',
      'carbamazepine',
      'phenytoin',
      'phenobarbital',
      'efavirenz',
      'modafinil',
    ],
    class_b: [
      'combined oral contraceptive',
      'ethinylestradiol',
      'warfarin',
      'ciclosporin',
      'tacrolimus',
    ],
    severity: 'major',
    mechanism:
      'CYP3A4/PXR induction accelerates metabolism of co-administered drugs, reducing plasma levels below therapeutic threshold.',
    effect: 'Contraceptive failure, subtherapeutic immunosuppression, loss of anticoagulation.',
    management:
      'Use alternative contraception (IUD, implant). Increase doses of interacting drugs with monitoring. Consider non-enzyme-inducing alternatives.',
    onset: 'delayed',
  },
]
