export interface UnitStaticContent {
  summary: string
  keyPoints: string[]
  drugClasses?: string[]
}

const UNIT_CONTENT: Record<string, UnitStaticContent> = {
  'cp-cv': {
    summary: `## Cardiovascular Pharmacotherapy

### Hypertension
First-line therapy includes **ACE inhibitors** (lisinopril, enalapril), **ARBs** (losartan), **CCBs** (amlodipine), and **thiazide diuretics** (HCTZ). Start monotherapy for Stage 1 HTN; combine drug classes for Stage 2 or inadequate response.

### Heart Failure
HFrEF guideline-directed therapy is the "Fantastic Four":
- **Beta-blocker** (bisoprolol, carvedilol, metoprolol succinate)
- **ACEi/ARNI** (sacubitril/valsartan preferred over ACEi)
- **MRA** (spironolactone, eplerenone)
- **SGLT2i** (dapagliflozin, empagliflozin)

Loop diuretics (furosemide) are used for volume management. Avoid NSAIDs, most CCBs, and antiarrhythmics in HFrEF.

### Acute Coronary Syndrome
Dual antiplatelet therapy (aspirin + ticagrelor/prasugrel) plus anticoagulation. Statin (atorvastatin 80 mg) regardless of baseline LDL. Beta-blocker within 24 hours if no contraindication.

### Atrial Fibrillation
Rate control: beta-blocker or diltiazem/verapamil. Rhythm control: class Ic (flecainide) or III (amiodarone). Stroke prevention: CHA₂DS₂-VASc score guides NOAC (apixaban, rivaroxaban, edoxaban, dabigatran) or warfarin use.`,
    keyPoints: [
      'First-line HTN: ACEi/ARB + CCB or thiazide',
      'HFrEF: BB + ACEi/ARNI + MRA + SGLT2i',
      'DAPT for ACS: aspirin + ticagrelor/prasugrel',
      'NOACs preferred over warfarin for AF stroke prevention',
      'Avoid CCBs in HFrEF; avoid NSAIDs in HF',
    ],
    drugClasses: ['ACE Inhibitors', 'ARBs', 'Beta-Blockers', 'CCBs', 'Diuretics', 'NOACs', 'Antiplatelets', 'Statins'],
  },

  'cp-endo': {
    summary: `## Endocrine Pharmacotherapy

### Type 2 Diabetes
Metformin is first-line. Add SGLT2i (empagliflozin, dapagliflozin) or GLP-1 RA (semaglutide, liraglutide) for CV/kidney benefit. DPP-4 inhibitors (sitagliptin) and TZDs (pioglitazone) are second-line. Insulin is indicated when HbA1c > 9% or symptoms of hyperglycemia.

### Type 1 Diabetes
Basal-bolus insulin regimen: long-acting (glargine, degludec) + rapid-acting (lispro, aspart, glulisine). Insulin pump or MDI. Monitor for DKA: "sick day rules" — never skip insulin, check ketones, increase fluids.

### Thyroid Disorders
Hypothyroidism: levothyroxine (T4) — start 1.6 mcg/kg, adjust by TSH every 6 weeks. Hyperthyroidism: methimazole (preferred) or PTU (first trimester). Radioiodine or thyroidectomy for definitive treatment.

### Diabetic Ketoacidosis
IV fluids first (0.9% NaCl), then IV insulin (0.1 U/kg bolus + 0.1 U/kg/hr). Monitor potassium: insulin drives K+ into cells. Correct bicarbonate only if pH < 6.9.`,
    keyPoints: [
      'Metformin first-line for T2DM',
      'SGLT2i/GLP-1 RA preferred with CV disease',
      'Basal-bolus insulin for T1DM',
      'DKA: fluids first, then insulin, watch K+',
      'Levothyroxine: start 1.6 mcg/kg, adjust by TSH',
    ],
    drugClasses: ['Biguanides', 'SGLT2 Inhibitors', 'GLP-1 Agonists', 'DPP-4 Inhibitors', 'Insulins', 'Antithyroid Drugs'],
  },

  'cp-resp': {
    summary: `## Respiratory Pharmacotherapy

### Asthma
Stepwise approach: SABA as needed (albuterol) → low-dose ICS (fluticasone) → LABA/ICS combination → add LAMA, LTRA, or biologic (omalizumab, mepolizumab). SMART therapy (Single Maintenance and Reliever Therapy) with formoterol/budesonide is preferred.

### COPD
Bronchodilators first: LAMA (tiotropium) ± LABA (salmeterol). Add ICS if frequent exacerbations and eosinophils ≥ 300. GOLD group E: LAMA + LABA + ICS triple therapy. Smoking cessation is the only disease-modifying intervention.

### Allergic Rhinitis
Intranasal corticosteroids (fluticasone, mometasone) first-line. Add oral antihistamine (cetirizine, loratadine) or intranasal antihistamine (azelastine). Immunotherapy for refractory cases.

### Inhaler Technique
Key steps: shake, exhale, seal lips, slow deep inhalation (pMDI) or rapid inhalation (DPI), hold breath 10 seconds, rinse mouth after ICS. Use spacer with pMDI.`,
    keyPoints: [
      'Asthma: ICS-containing therapy at every step above SABA-only',
      'SMART: formoterol/budesonide as single inhaler',
      'COPD: LAMA + LABA, add ICS if exacerbations',
      'Smoking cessation is disease-modifying in COPD',
      'Rinse mouth after ICS to prevent thrush',
    ],
    drugClasses: ['SABA', 'ICS', 'LABA', 'LAMA', 'LTRA', 'Biologics', 'Antihistamines'],
  },

  'cp-gi': {
    summary: `## Gastrointestinal Pharmacotherapy

### GERD
PPIs (omeprazole, esomeprazole, pantoprazole) first-line — take 30-60 min before breakfast. H2RAs (famotidine) for nocturnal breakthrough or maintenance. Avoid chronic PPI > 8 weeks without need.

### Peptic Ulcer Disease
Test and treat H. pylori: triple therapy (PPI + amoxicillin + clarithromycin) or bismuth quadruple therapy. PPIs heal ulcers in 4-8 weeks. Avoid NSAIDs in ulcer patients.

### IBD
- **Ulcerative Colitis**: 5-ASA (mesalamine) first-line; biologics (infliximab, adalimumab) for moderate-severe
- **Crohn's Disease**: budesonide or systemic steroids for flares; biologics (infliximab, adalimumab, vedolizumab, ustekinumab) for maintenance

### Liver Cirrhosis
Manage complications: lactulose for hepatic encephalopathy, spironolactone for ascites, beta-blockers (propranolol, carvedilol) for variceal bleeding prophylaxis. Avoid acetaminophen > 2 g/day.`,
    keyPoints: [
      'PPIs 30-60 min before meals for GERD',
      'H. pylori triple therapy: PPI + amoxicillin + clarithromycin',
      '5-ASA first-line in UC; biologics for moderate-severe IBD',
      'Lactulose for hepatic encephalopathy',
      'Avoid NSAIDs and limit acetaminophen in liver disease',
    ],
    drugClasses: ['PPIs', 'H2RAs', '5-ASA', 'Biologics', 'Antibiotics', 'Lactulose', 'Diuretics'],
  },

  'cp-renal': {
    summary: `## Renal Pharmacotherapy

### Acute Kidney Injury
Identify and remove the cause (prerenal, intrinsic, postrenal). Discontinue nephrotoxins (NSAIDs, ACEi/ARB, aminoglycosides, contrast). Manage hyperkalemia: calcium gluconate for cardiac protection, insulin + glucose, albuterol, kayexalate, or dialysis.

### Chronic Kidney Disease
Stage-based management:
- **CKD G3a-G4**: BP target < 130/80. ACEi/ARB for proteinuria. SGLT2i (dapagliflozin) to slow progression.
- **CKD G5 (ESRD)**: Prepare for RRT (hemodialysis, peritoneal dialysis, transplant). EPO for anemia, phosphate binders (sevelamer, calcium acetate), vitamin D analogs.

### Drug Dosing in CKD
Calculate CrCl (Cockcroft-Gault) or eGFR (CKD-EPI). Common drugs requiring adjustment: antibiotics (penicillins, cephalosporins, carbapenems, vancomycin), LMWH, gabapentinoids, metformin (avoid if eGFR < 30), digoxin.

### Electrolyte Disorders
- **Hyperkalemia**: insulin + glucose, albuterol, calcium gluconate, loop diuretics, patiromer or ZS-9
- **Hyponatremia**: fluid restriction, vaptans (tolvaptan) for SIADH, correct slowly (max 8 mEq/L in 24h)`,
    keyPoints: [
      'Calculate CrCl or eGFR before dosing renally cleared drugs',
      'ACEi/ARB + SGLT2i slow CKD progression',
      'Hyperkalemia management: insulin+glucose, calcium, albuterol',
      'Correct hyponatremia slowly — osmotic demyelination risk',
      'Avoid metformin if eGFR < 30',
    ],
    drugClasses: ['ACE Inhibitors', 'ARBs', 'SGLT2 Inhibitors', 'Diuretics', 'Phosphate Binders', 'EPO'],
  },

  'cp-id': {
    summary: `## Infectious Diseases & Antimicrobial Pharmacotherapy

### Empiric Antibiotic Selection
By syndrome:
- **Community-acquired pneumonia**: amoxicillin or doxycycline (outpatient); ceftriaxone + azithromycin (inpatient)
- **UTI**: nitrofurantoin or TMP/SMX (uncomplicated); ceftriaxone or ciprofloxacin (complicated)
- **Meningitis**: ceftriaxone + vancomycin + dexamethasone (before or with first antibiotic)
- **Sepsis**: broad-spectrum (cefepime, piperacillin-tazobactam, meropenem) within 1 hour

### Antimicrobial Stewardship
Start smart, then focus: de-escalate based on cultures. Use shortest effective duration. Avoid fluoroquinolones as first-line when alternatives exist.

### HIV/AIDS
ART for all: INSTI + 2 NRTIs (DTG/TAF/FTC, BIC/FTC/TAF). PrEP: TDF/FTC or TAF/FTC daily. PEP: start within 72 hours, continue 28 days.

### Tuberculosis
RIPE regimen for 2 months (rifampin, INH, pyrazinamide, ethambutol), then RI for 4 months. Directly observed therapy (DOT). Monitor for INH hepatitis, rifampin interactions.

### Malaria
Uncomplicated: artemether-lumefantrine or artesunate-amodiaquine (AL/AS-AQ). Severe: IV artesunate, then full oral ACT course. Malaria in pregnancy: quinine + clindamycin (first trimester), ACT (second/third trimester).

### Antimicrobial Resistance
MRSA: vancomycin or daptomycin. ESBL: carbapenems. CRE: ceftazidime-avibactam, meropenem-vaborbactam. VRE: linezolid or daptomycin.`,
    keyPoints: [
      'Broad-spectrum empiric therapy, then de-escalate by culture',
      'Sepsis: antibiotics within 1 hour',
      'ART for all HIV patients regardless of CD4',
      'TB: RIPE 2 months, RI 4 months — monitor for INH hepatitis',
      'Severe malaria: IV artesunate first-line',
    ],
    drugClasses: ['Beta-Lactams', 'Macrolides', 'Fluoroquinolones', 'Antivirals', 'Antituberculars', 'Antimalarials', 'Antifungals'],
  },

  'cp-neuro': {
    summary: `## CNS Pharmacotherapy

### Epilepsy
First-line by seizure type:
- **Focal**: lamotrigine, levetiracetam, carbamazepine
- **Generalized**: valproate (first-line for all types), lamotrigine
- **Women of childbearing age**: avoid valproate (teratogenic); lamotrigine or levetiracetam preferred

### Stroke
Acute ischemic: IV alteplase (tPA) within 4.5 hours. Mechanical thrombectomy within 6-24 hours. Secondary prevention: antiplatelet (aspirin ± dipyridamole, clopidogrel), statin, BP control, anticoagulation for cardioembolic (AF).

### Parkinson Disease
First-line: carbidopa-levodopa (most effective) or MAO-B inhibitor (rasagiline, selegiline) or dopamine agonist (pramipexole, ropinirole) for younger patients. Avoid antipsychotics (except quetiapine, clozapine) — can worsen symptoms.

### Depression
First-line SSRIs (escitalopram, sertraline) or SNRIs (venlafaxine, duloxetine). Allow 4-6 weeks for full effect. Monitor for suicidality in first weeks.

### Schizophrenia
Antipsychotic therapy: second-generation (olanzapine, risperidone, aripiprazole) preferred over first-generation due to extrapyramidal side effect profile. Monitor metabolic parameters (weight, glucose, lipids).

### Bipolar Disorder
Mood stabilizer (lithium, valproate) first-line. Lithium: therapeutic level 0.6-1.2 mEq/L, monitor renal and thyroid function. Avoid antidepressants as monotherapy.`,
    keyPoints: [
      'Choose AED by seizure type — valproate avoids for women of childbearing age',
      'Stroke: tPA within 4.5 hours, mechanical thrombectomy if eligible',
      'Carbidopa-levodopa most effective for Parkinson motor symptoms',
      'SSRI/SNRI first-line for depression, allow 4-6 weeks',
      'Lithium level 0.6-1.2 mEq/L, monitor renal + thyroid',
    ],
    drugClasses: ['AEDs', 'Antidepressants', 'Antipsychotics', 'Antiparkinson Agents', 'Mood Stabilizers'],
  },

  'cp-onc': {
    summary: `## Haematology & Oncology Pharmacotherapy

### Solid Tumours
- **Breast cancer**: hormone therapy (tamoxifen, aromatase inhibitors) for HR+, trastuzumab for HER2+, chemotherapy for triple-negative
- **Prostate cancer**: ADT (GnRH agonists/antagonists), abiraterone, enzalutamide, chemotherapy
- **Colorectal**: FOLFOX or FOLFIRI + bevacizumab (anti-VEGF), panitumumab/cetuximab (anti-EGFR for RAS wild-type)
- **Lung cancer**: targeted therapy (EGFR TKIs, ALK inhibitors, PD-1/PD-L1 inhibitors) based on molecular profile

### Haematological Malignancies
- **Leukemia**: chemotherapy + targeted (imatinib, dasatinib for CML; all-trans retinoic acid for APML)
- **Lymphoma**: R-CHOP for DLBCL, ABVD for Hodgkin

### Chemotherapy Toxicity Management
- **Nausea**: NK1 antagonist (aprepitant) + 5-HT3 antagonist (ondansetron) ± dexamethasone
- **Febrile neutropenia**: empiric broad-spectrum antibiotics immediately, G-CSF (filgrastim)
- **Hand-foot syndrome**: dose interruption, skin care
- **Cardiotoxicity**: anthracycline dose limit (doxorubicin 450-550 mg/m²), trastuzumab monitor LVEF

### Anaemia
Iron deficiency: oral ferrous sulfate. Iron deficiency with CKD or IBD: IV iron. B12 deficiency: cyanocobalamin IM or high-dose oral. Folic acid: 5 mg daily.

### Anticoagulation
VTE treatment: LMWH (enoxaparin), fondaparinux, or rivaroxaban. Cancer-associated thrombosis: LMWH or DOAC, but DOACs less studied. DOAC reversal: idarucizumab (dabigatran), andexanet alfa (factor Xa).`,
    keyPoints: [
      'Molecular profiling guides targeted therapy in lung, breast, CRC',
      'Supportive care: antiemetics, G-CSF for febrile neutropenia',
      'Anthracycline cardiotoxicity: cumulative dose limit 450-550 mg/m²',
      'Iron deficiency: ferrous sulfate; B12: cyanocobalamin IM',
      'NOACs preferred for VTE; LMWH/NOAC for cancer-associated',
    ],
    drugClasses: ['Chemotherapy', 'Hormone Therapy', 'Targeted Therapy', 'Immunotherapy', 'Antiemetics', 'Anticoagulants'],
  },

  'pharm-cv': {
    summary: `## Cardiovascular Pharmacology

### ACE Inhibitors (lisinopril, enalapril, ramipril)
- **MOA**: Inhibit ACE → ↓ Ang II → vasodilation, ↓ aldosterone
- **Uses**: HTN, HF, post-MI, CKD with proteinuria, diabetes
- **AE**: cough (bradykinin), angioedema, hyperkalemia, AKI
- **Monitor**: K+, Cr, BP

### ARBs (losartan, valsartan, candesartan)
- **MOA**: Block AT1 receptor
- **Uses**: Same as ACEi but better tolerated (no cough)
- **AE**: hyperkalemia, AKI, avoid in pregnancy

### Beta-Blockers
- **BB** (metoprolol, bisoprolol): cardio-selective β1
- **Non-selective** (propranolol): β1 + β2 — caution in asthma
- **α-β** (carvedilol, labetalol): vasodilating
- **Uses**: HTN, angina, HFrEF, post-MI, migraine, performance anxiety

### CCBs
- **DHP** (amlodipine, nifedipine): vasodilation → ↓ BP, no heart rate effect
- **Non-DHP** (verapamil, diltiazem): ↓ HR + contractility — avoid in HFrEF
- **AE**: DHP → ankle edema; Non-DHP → bradycardia, constipation

### Diuretics
- **Thiazide** (HCTZ): mild, first-line HTN
- **Loop** (furosemide): potent, for HF/edema — watch K+, Mg+

### Statins (atorvastatin, rosuvastatin)
- **MOA**: HMG-CoA reductase inhibition
- **Uses**: Primary and secondary CV prevention
- **AE**: myopathy (check CK), hepatotoxicity (check LFTs), avoid in pregnancy`,
    keyPoints: [
      'ACEi/ARB: monitor K+ and Cr; avoid in pregnancy and bilateral RAS',
      'Beta-blockers: cardio-selective preferred in COPD/asthma',
      'Verapamil/diltiazem: avoid in HFrEF and with beta-blockers',
      'Statins: atorvastatin 80 mg for ACS; monitor for muscle symptoms',
      'Loop diuretics: watch K+, Mg+ in HF patients',
    ],
    drugClasses: ['ACE Inhibitors', 'ARBs', 'Beta-Blockers', 'CCBs', 'Diuretics', 'Statins'],
  },

  'pharm-anti': {
    summary: `## Antimicrobial Pharmacology

### Beta-Lactams
- **Penicillins**: amoxicillin, amoxicillin-clavulanate, piperacillin-tazobactam
- **Cephalosporins**: 1st (cefalexin), 2nd (cefuroxime), 3rd (ceftriaxone), 4th (cefepime)
- **Carbapenems**: meropenem, ertapenem — reserve for ESBL/CRE
- **MOA**: Inhibit cell wall synthesis (PBPs)
- **AE**: allergy (cross-reactivity 10%), seizures (imipenem), C. diff

### Macrolides (azithromycin, clarithromycin)
- **MOA**: 50S ribosomal inhibition
- **Uses**: CAP, atypical coverage, MAC prophylaxis
- **AE**: QT prolongation, GI upset; clarithromycin strong CYP3A4 inhibitor

### Fluoroquinolones (ciprofloxacin, levofloxacin, moxifloxacin)
- **MOA**: DNA gyrase/topoisomerase IV inhibition
- **Uses**: UTI, prostatitis, GI infections, anthrax
- **AE**: tendonitis/rupture (black box), QT prolongation, C. diff, CNS effects
- Warning: avoid in children, pregnancy; tendinopathy risk

### Aminoglycosides (gentamicin, amikacin)
- **MOA**: 30S ribosomal inhibition
- **Uses**: Severe Gram-negative infections, synergy for enterococcus
- **AE**: nephrotoxicity, ototoxicity — TDM required

### Tetracyclines (doxycycline)
- **MOA**: 30S inhibition
- **Uses**: Acne, CAP (doxycycline), malaria prophylaxis, STIs
- **AE**: photosensitivity, tooth discoloration (<8 years)`,
    keyPoints: [
      'Beta-lactams: check allergy history, 10% cross-reactivity',
      'Fluoroquinolones: tendon rupture risk, avoid in children',
      'Aminoglycosides: TDM for nephro/ototoxicity',
      'Macrolides: QT prolongation, drug interactions (CYP3A4)',
      'Carbapenems: reserve for ESBL/CRE, C. diff risk',
    ],
    drugClasses: ['Penicillins', 'Cephalosporins', 'Carbapenems', 'Macrolides', 'Fluoroquinolones', 'Aminoglycosides'],
  },

  'sup-phys': {
    summary: `## Physiology

### Cardiovascular Physiology
- Cardiac output = HR × SV. Preload, contractility, afterload determine SV
- Baroreceptor reflex: ↓ BP → ↑ SNS → ↑ HR, ↑ contractility, ↑ vasoconstriction
- Frank-Starling: ↑ preload → ↑ contractility (up to a point)
- Action potential phases: 0 (Na+), 1, 2 (Ca2+ plateau), 3 (K+ repolarization), 4 (resting)

### Respiratory Physiology
- Ventilation (air movement) + perfusion (blood flow) = gas exchange
- V/Q mismatch → hypoxemia. Shunt = V/Q = 0. Dead space = V/Q = ∞
- O2-Hb dissociation curve: right shift (↓ pH, ↑ CO2, ↑ temp, ↑ 2,3-DPG) → O2 offloaded
- Lung volumes: TLC, VC, FRC, RV. FEV1/FVC ratio for obstruction vs restriction

### Renal Physiology
- Nephron: glomerulus (filtration) → PCT (reabsorption) → loop of Henle (concentration) → DCT (fine-tuning) → collecting duct (water/salt)
- GFR ~120 mL/min. Regulated by afferent/efferent arteriolar tone
- RAAS: ↓ BP → renin → Ang I → Ang II → vasoconstriction + aldosterone
- Acid-base: kidneys excrete H+, reabsorb HCO3-. Cl- as a surrogate

### Endocrine Physiology
- HPA axis: CRH → ACTH → cortisol (negative feedback)
- HPT axis: TRH → TSH → T4/T3 (feedback to pituitary + hypothalamus)
- Insulin: ↓ blood glucose. Glucagon: ↑ blood glucose.
- Calcium regulation: PTH ↑ Ca2+ (bone resorption, kidney reabsorption, vitamin D), Calcitonin ↓ Ca2+`,
    keyPoints: [
      'CO = HR × SV; affected by preload, contractility, afterload',
      'V/Q mismatch most common cause of hypoxemia',
      'GFR ~120 mL/min; RAAS for BP and volume regulation',
      'O2-Hb curve right shift (Bohr) = more O2 delivery to tissues',
      'Insulin stores glucose; glucagon + cortisol + epi mobilize it',
    ],
  },

  'sup-biochem': {
    summary: `## Biochemistry

### Metabolism Overview
- **Glycolysis**: glucose → 2 pyruvate (cytoplasm). Net 2 ATP, 2 NADH
- **TCA cycle**: acetyl-CoA → CO2 + 3 NADH + 1 FADH2 + 1 GTP (mitochondria)
- **Oxidative phosphorylation**: NADH/FADH2 → ETC → ATP (most ATP generated here)
- **Gluconeogenesis**: pyruvate → glucose (liver). Substrates: lactate, amino acids, glycerol
- **Glycogenolysis**: glycogen → glucose (liver/muscle). Glycogenesis: glucose → glycogen

### Key Enzymes & Pathways
- **Hexokinase/glucokinase**: first step of glycolysis. Glucokinase = glucose sensor in pancreas
- **PFK-1**: rate-limiting step of glycolysis. Activated by AMP, inhibited by ATP/citrate
- **Pyruvate dehydrogenase**: links glycolysis to TCA. Defect → lactic acidosis
- **HMG-CoA reductase**: rate-limiting for cholesterol synthesis. Target of statins

### Lipid Metabolism
- **Lipoproteins**: chylomicrons (dietary TAG), VLDL (endogenous TAG), LDL (cholesterol to tissues), HDL (reverse cholesterol transport)
- **Beta-oxidation**: fatty acids → acetyl-CoA (mitochondria). Carnitine shuttle required for transport
- **Ketogenesis**: excess acetyl-CoA → ketone bodies (liver). Fuel for brain during starvation

### Amino Acid & Nitrogen Metabolism
- **Transamination**: transfers NH2 to α-ketoglutarate (ALT, AST)
- **Urea cycle**: converts NH3 to urea (liver). Defects → hyperammonemia
- **One-carbon metabolism**: folate, B12, SAM for methylation. Important in drug metabolism

### Vitamins & Cofactors
- **B1 (thiamine)**: TPP for pyruvate dehydrogenase, transketolase. Deficiency → beriberi
- **B6 (pyridoxine)**: PLP for transamination, homocysteine metabolism
- **B12 (cobalamin)**: methylmalonyl-CoA mutase, methionine synthase
- **Folate**: one-carbon transfer. Deficiency → megaloblastic anemia, neural tube defects`,
    keyPoints: [
      'Glycolysis: 2 ATP, TCA: 30-32 ATP total per glucose',
      'PFK-1 is rate-limiting for glycolysis (AMP activates, ATP inhibits)',
      'Statins target HMG-CoA reductase',
      'Beta-oxidation: carnitine shuttle required for mitochondrial entry',
      'Urea cycle converts ammonia to urea — defects cause hyperammonemia',
    ],
  },

  'sup-anat': {
    summary: `## Anatomy

### Cardiovascular
- **Heart**: 4 chambers. RA → RV (pulmonary circulation) → LA → LV (systemic circulation)
- **Coronary arteries**: L main → LAD (anterior wall, septum) + circumflex (lateral wall). RCA (inferior wall, SA node 60%, AV node 90%)
- **Conduction system**: SA node → AV node → bundle of His → bundle branches → Purkinje fibers

### Respiratory
- Upper airway: nasal cavity → pharynx → larynx. Lower: trachea → bronchi → bronchioles → alveoli
- Right lung: 3 lobes. Left lung: 2 lobes + cardiac notch
- Pleura: visceral (lung surface) + parietal (chest wall). Pleural space contains serous fluid

### Gastrointestinal
- Foregut (celiac trunk): stomach, duodenum to ampulla of Vater, liver, gallbladder, spleen, pancreas
- Midgut (SMA): duodenum from ampulla to splenic flexure
- Hindgut (IMA): descending colon, sigmoid, rectum
- Portal vein: drains GI tract → liver (first-pass metabolism)

### Renal
- Kidneys retroperitoneal. Renal hilum: renal artery, vein, ureter (AVU)
- Nephron: cortex (glomerulus, PCT, DCT) + medulla (loop of Henle, collecting duct)
- Blood supply: renal artery → segmental → interlobar → arcuate → interlobular → afferent → glomerulus

### Neurology
- Brain lobes: frontal (motor, executive), parietal (sensory), temporal (auditory, memory), occipital (vision)
- Circle of Willis: ACA, MCA, PCA + communicating arteries — collateral circulation
- Cranial nerves: CN I-XII. Key functions — CN III (oculomotor), CN VII (facial), CN IX/X (gag reflex)

### Musculoskeletal
- Upper limb: shoulder (glenohumeral, scapulothoracic) → elbow (humeroulnar, radiocapitellar) → wrist (radiocarpal)
- Lower limb: hip (acetabulofemoral) → knee (tibiofemoral, patellofemoral) → ankle (talocrural, subtalar)`,
    keyPoints: [
      'Heart: RA → RV → LA → LV. RCA supplies SA/AV node in most',
      'Lungs: right 3 lobes, left 2 lobes',
      'Foregut (celiac), midgut (SMA), hindgut (IMA)',
      'Renal hilum: renal artery, vein, ureter (anterior to posterior)',
      'Circle of Willis provides collateral cerebral circulation',
    ],
  },

  'sup-path': {
    summary: `## Pathology

### Cell Injury & Adaptation
- **Reversible**: cellular swelling, fatty change. Causes: hypoxia, toxins, infection
- **Irreversible → necrosis**: coagulative (most common, MI), liquefactive (brain), caseous (TB), fat necrosis (pancreatitis)
- **Apoptosis**: programmed cell death. Intrinsic (mitochondrial) + extrinsic (death receptor)
- **Adaptation**: atrophy (↓ size), hypertrophy (↑ cell size), hyperplasia (↑ cell number), metaplasia (cell type change), dysplasia (abnormal growth)

### Inflammation
- **Acute**: rapid onset. Vascular phase (vasodilation, ↑ permeability) + cellular phase (neutrophils). Cardinal signs: rubor, tumor, calor, dolor, functio laesa
- **Chronic**: mononuclear cells (macrophages, lymphocytes). Granulomas for TB, sarcoidosis, fungal
- **Chemical mediators**: histamine (mast cells), prostaglandins (COX), leukotrienes (LTB4), cytokines (IL-1, TNF-α), complement (C5a, C3a)

### Hemodynamics
- **Edema**: ↑ hydrostatic pressure (HF) or ↓ oncotic pressure (cirrhosis, nephrotic syndrome)
- **Thrombosis**: Virchow triad (endothelial injury, stasis, hypercoagulability)
- **Embolism**: thromboembolism → PE, fat embolism (long bone fracture), air embolism, amniotic fluid embolism
- **Shock**: cardiogenic, hypovolemic, distributive (septic, anaphylactic, neurogenic)

### Neoplasia
- **Benign**: well-differentiated, encapsulated, no metastasis. Named + "oma" (lipoma, adenoma)
- **Malignant**: poorly differentiated, invasive, metastatic. Carcinoma (epithelial), sarcoma (mesenchymal)
- **Carcinogenesis**: multistep — initiation → promotion → progression. Oncogenes (RAS, MYC, HER2), tumor suppressors (p53, RB, APC)
- **Metastasis**: lymphatic (carcinoma > sarcoma), hematogenous (liver, lung, bone, brain), seeding (peritoneal)

### Genetic & Pediatric
- **Mendelian**: autosomal dominant, recessive, X-linked
- **Down syndrome**: trisomy 21 → intellectual disability, heart defects, Alzheimer risk
- **Cystic fibrosis**: CFTR mutation → thick secretions, lung infections, pancreatic insufficiency`,
    keyPoints: [
      'Necrosis types: coagulative (MI), liquefactive (brain), caseous (TB), fat (pancreatitis)',
      'Acute inflammation: neutrophils, chronic: macrophages/lymphocytes',
      'Virchow triad for thrombosis: injury + stasis + hypercoagulability',
      'Carcinoma = epithelial malignancy, sarcoma = mesenchymal',
      'p53 is "guardian of the genome" — most common mutation in cancer',
    ],
  },

  'sup-micro': {
    summary: `## Microbiology

### Gram-Positive Cocci
- **Staph aureus**: coagulase-positive. MSSA → cefazolin/cloxacillin. MRSA → vancomycin. Toxins: TSST-1 (TSS), enterotoxin (food poisoning), exfoliatin (scalded skin)
- **Strep pyogenes (Group A)**: bacitracin-sensitive. Pharyngitis, cellulitis, necrotizing fasciitis. Post-strep: rheumatic fever, GN. Penicillin G
- **Strep pneumoniae**: optochin-sensitive. Pneumonia, meningitis, otitis media. PCV vaccine
- **Enterococcus**: VRE (vancomycin-resistant). Linezolid, daptomycin

### Gram-Negative Rods
- **E. coli**: most common UTI, neonatal meningitis, traveler's diarrhea. ESBL → carbapenems
- **Klebsiella pneumoniae**: community-acquired pneumonia (currant jelly sputum), UTI, nosocomial. ESBL/CRE
- **Pseudomonas aeruginosa**: non-lactose fermenter. Nosocomial pneumonia, burn infections, cystic fibrosis. Ceftazidime, cefepime, ciprofloxacin, carbapenems
- **Salmonella typhi**: typhoid fever. Ciprofloxacin or ceftriaxone

### Acid-Fast Bacilli
- **Mycobacterium tuberculosis**: AFB. Latent TB → INH 9 months. Active → RIPE regimen (2 mo RIPE, 4 mo RI)
- **M. leprae**: Hansen disease. Dapsone + rifampin + clofazimine

### Viruses
- **HIV**: RNA retrovirus. ART targets: reverse transcriptase, integrase, protease, entry
- **Hepatitis B**: DNA virus. Vaccine available. Chronic → entecavir, tenofovir
- **Hepatitis C**: RNA virus, now curable with DAAs (sofosbuvir + velpatasvir)
- **Influenza**: RNA orthomyxovirus. Oseltamivir (neuraminidase inhibitor). Vaccine

### Fungi & Parasites
- **Candida**: fluconazole (azole), caspofungin (echinocandin), amphotericin B
- **Aspergillus**: voriconazole first-line. Amphotericin B for severe
- **Plasmodium (malaria)**: P. falciparum most severe. ACT first-line. Chloroquine for sensitive
- **Helminths**: albendazole, mebendazole, praziquantel`,
    keyPoints: [
      'MRSA: vancomycin. VRE: linezolid/daptomycin',
      'ESBL: carbapenems. CRE: ceftazidime-avibactam',
      'TB: RIPE 2 months + RI 4 months (latent: INH 9 months)',
      'HIV: INSTI + 2 NRTIs first-line ART',
      'Hep C: now curable with DAAs (sofosbuvir + velpatasvir)',
    ],
  },

  'sup-immuno': {
    summary: `## Immunology

### Innate vs Adaptive
- **Innate**: immediate, non-specific. Barriers, complement, phagocytes (macrophages, neutrophils, NK cells)
- **Adaptive**: specific, memory. T cells (cell-mediated) + B cells (humoral). Antigen presentation via MHC

### Hypersensitivity (Gell-Coombs)
- **Type I (IgE)**: anaphylaxis, asthma, allergic rhinitis. Mast cell degranulation (histamine). Treatment: epinephrine, antihistamines
- **Type II (IgG/IgM)**: antibody against cell surface. Hemolytic anemia, Goodpasture, myasthenia gravis
- **Type III (immune complex)**: SLE, serum sickness, post-strep GN. Arthus reaction
- **Type IV (T cell)**: delayed-type. PPD test, contact dermatitis (poison ivy), granulomas (TB)

### Immunodeficiency
- **Primary**: SCID, CVID, IgA deficiency, chronic granulomatous disease
- **Secondary**: HIV/AIDS, chemotherapy, malnutrition, splenectomy
- **HIV**: CD4 depletion. AIDS = CD4 < 200 cells/µL or AIDS-defining illness

### Autoimmunity
- **SLE**: ANA + anti-dsDNA. Malar rash, nephritis, serositis. Hydroxychloroquine, steroids, immunosuppressants
- **Rheumatoid arthritis**: rheumatoid factor + anti-CCP. Symmetric polyarthritis. DMARDs (MTX, HCQ), biologics (anti-TNF)
- **Type 1 diabetes**: autoimmune destruction of beta cells. Insulin dependent

### Vaccines
- **Live attenuated**: MMR, varicella, yellow fever, oral polio, BCG — contraindicated in pregnancy and immunocompromised
- **Inactivated**: IPV, influenza (injectable), hepatitis A
- **Subunit/conjugate**: Hib, pneumococcal, meningococcal, HPV, hep B
- **mRNA**: COVID-19 (Pfizer, Moderna)`,
    keyPoints: [
      'Type I: IgE/mast cell → anaphylaxis. Type IV: T cell → delayed',
      'SLE: ANA screening, anti-dsDNA specific',
      'RA: symmetric polyarthritis, RF + anti-CCP, MTX first-line',
      'HIV: CD4 < 200 = AIDS. ART for all',
      'Live vaccines contraindicated in pregnancy and immunocompromised',
    ],
  },
}

export function getStaticContent(unitId: string): UnitStaticContent | null {
  return UNIT_CONTENT[unitId] ?? null
}
