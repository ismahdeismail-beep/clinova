export interface UnitStaticContent {
  summary: string
  keyPoints: string[]
  drugClasses?: string[]
}

const UNIT_CONTENT: Record<string, UnitStaticContent> = {
  // ================================================================
  // CLINICAL PHARMACY & THERAPEUTICS (21 units)
  // ================================================================

  'cp-intro': {
    summary: `## Introduction to Clinical Pharmacy

### Role of the Clinical Pharmacist
The clinical pharmacist is an integral member of the healthcare team, responsible for optimizing medication therapy, ensuring patient safety, and providing drug information. Key roles include medication reconciliation, therapeutic drug monitoring, patient counseling, and collaborative prescribing.

### Pharmaceutical Care Process
A systematic approach to patient care:
1. **Assess**: Collect and analyze patient data (history, labs, medications)
2. **Identify**: Recognize drug therapy problems (DTPs)
3. **Plan**: Develop a care plan with measurable outcomes
4. **Implement**: Execute the plan, order medications, educate patient
5. **Monitor**: Track efficacy, safety, adherence
6. **Follow-up**: Adjust therapy based on response

### Drug Therapy Problems (DTPs)
Seven categories: unnecessary drug therapy, needs additional drug therapy, ineffective drug, dosage too low, dosage too high, adverse drug reaction, non-adherence.

### Clinical Documentation
SOAP notes (Subjective, Objective, Assessment, Plan) are the standard. Maintain accurate, timely records in the patient's chart.`,
    keyPoints: [
      'Clinical pharmacist = integral healthcare team member',
      'Pharmaceutical care: Assess → Identify → Plan → Implement → Monitor',
      '7 DTP categories: unnecessary, needs add, ineffective, dose low, dose high, ADR, non-adherence',
      'SOAP notes standard for clinical documentation',
    ],
  },

  'cp-cv': {
    summary: `## Cardiovascular Pharmacotherapy

### Hypertension
First-line: ACE inhibitors, ARBs, CCBs, thiazide diuretics. Combination therapy for Stage 2 HTN. Target < 130/80 for most adults.

### Heart Failure
HFrEF: beta-blocker + ACEi/ARNI + MRA + SGLT2i. Loop diuretics for volume. Avoid NSAIDs, CCBs, most antiarrhythmics.

### Acute Coronary Syndrome
DAPT (aspirin + ticagrelor/prasugrel) + anticoagulation + statin (atorvastatin 80). Beta-blocker within 24h.

### Atrial Fibrillation
Rate: beta-blocker/diltiazem. Rhythm: flecainide/amiodarone. Stroke prevention: CHA₂DS₂-VASc → NOAC/warfarin.`,
    keyPoints: [
      'HTN: ACEi/ARB + CCB or thiazide',
      'HFrEF: BB + ACEi/ARNI + MRA + SGLT2i = Fantastic Four',
      'ACS: DAPT + atorvastatin 80',
      'NOAC preferred over warfarin for AF',
    ],
    drugClasses: ['ACE Inhibitors', 'ARBs', 'Beta-Blockers', 'CCBs', 'Diuretics', 'NOACs', 'Antiplatelets', 'Statins'],
  },

  'cp-endo': {
    summary: `## Endocrine Pharmacotherapy

### Type 2 Diabetes
Metformin first-line. Add SGLT2i/GLP-1 RA for CV/kidney benefit. DPP-4i and TZDs second-line. Insulin if HbA1c > 9%.

### Type 1 Diabetes
Basal-bolus: long-acting (glargine/degludec) + rapid-acting (lispro/aspart). Sick day rules: never skip insulin, check ketones.

### Thyroid
Hypothyroidism: levothyroxine 1.6 mcg/kg. Hyperthyroidism: methimazole (preferred) or PTU (first trimester).

### DKA
IV fluids first (0.9% NaCl) → IV insulin 0.1 U/kg/hr. Monitor potassium closely.`,
    keyPoints: [
      'Metformin first-line T2DM', 'SGLT2i/GLP-1 RA for CV benefit',
      'Basal-bolus for T1DM', 'DKA: fluids first, then insulin',
      'Levothyroxine: start 1.6 mcg/kg, adjust per TSH',
    ],
    drugClasses: ['Biguanides', 'SGLT2 Inhibitors', 'GLP-1 Agonists', 'Insulins', 'Antithyroid Drugs'],
  },

  'cp-resp': {
    summary: `## Respiratory Pharmacotherapy

### Asthma
Stepwise: SABA → ICS → LABA/ICS → add LAMA/LTRA/biologic. SMART therapy (formoterol/budesonide) preferred.

### COPD
LAMA ± LABA first-line. Add ICS if exacerbations + eosinophils ≥ 300. Smoking cessation is disease-modifying.

### Allergic Rhinitis
Intranasal corticosteroids first-line. Add oral/intranasal antihistamine. Immunotherapy for refractory.

### Inhaler Technique
Shake → exhale → seal lips → slow deep inhale (pMDI) or rapid (DPI) → hold 10s → rinse mouth after ICS.`,
    keyPoints: [
      'ICS at every step above SABA-only for asthma',
      'SMART: formoterol/budesonide single inhaler',
      'COPD: LAMA + LABA, add ICS if exacerbating',
      'Rinse mouth after ICS to prevent thrush',
    ],
    drugClasses: ['SABA', 'ICS', 'LABA', 'LAMA', 'LTRA', 'Biologics', 'Antihistamines'],
  },

  'cp-gi': {
    summary: `## Gastrointestinal Pharmacotherapy

### GERD
PPIs (omeprazole, pantoprazole) 30-60 min before breakfast. H2RAs for nocturnal breakthrough.

### PUD
Test and treat H. pylori: triple therapy (PPI + amoxicillin + clarithromycin) or bismuth quadruple. PPIs heal ulcers 4-8 weeks.

### IBD
UC: 5-ASA first-line; biologics for moderate-severe. Crohn's: budesonide/steroids for flares; biologics for maintenance.

### Cirrhosis
Lactulose for encephalopathy. Spironolactone for ascites. BB for variceal prophylaxis. Avoid acetaminophen > 2 g/day.`,
    keyPoints: [
      'PPIs 30-60 min before meals for GERD',
      'H. pylori: PPI + amoxicillin + clarithromycin',
      '5-ASA first-line UC; biologics for Crohn\'s',
      'Lactulose for hepatic encephalopathy',
    ],
    drugClasses: ['PPIs', 'H2RAs', '5-ASA', 'Biologics', 'Lactulose'],
  },

  'cp-renal': {
    summary: `## Renal Pharmacotherapy

### AKI
Identify cause (prerenal/intrinsic/postrenal). Stop nephrotoxins (NSAIDs, ACEi, aminoglycosides). Hyperkalemia: calcium gluconate + insulin + glucose + albuterol.

### CKD
Stage-based: BP < 130/80, ACEi/ARB for proteinuria, SGLT2i to slow progression. ESRD: prepare RRT, EPO for anemia, phosphate binders.

### Drug Dosing
Calculate CrCl/eGFR. Adjust antibiotics, LMWH, gabapentinoids, metformin (avoid if eGFR < 30), digoxin.

### Electrolytes
Hyperkalemia: insulin+glucose, calcium, albuterol. Hyponatremia: fluid restriction, correct max 8 mEq/L/24h.`,
    keyPoints: [
      'Calculate CrCl/eGFR before renally cleared drugs',
      'ACEi/ARB + SGLT2i slow CKD progression',
      'Hyperkalemia: insulin+glucose + calcium + albuterol',
      'Correct hyponatremia slowly — osmotic demyelination risk',
    ],
    drugClasses: ['ACE Inhibitors', 'ARBs', 'SGLT2 Inhibitors', 'Diuretics', 'Phosphate Binders', 'EPO'],
  },

  'cp-neuro': {
    summary: `## CNS Pharmacotherapy

### Epilepsy
Focal: lamotrigine, levetiracetam, carbamazepine. Generalized: valproate (avoid in women of childbearing age). Status epilepticus: benzodiazepine → phenytoin/fosphenytoin.

### Stroke
Ischemic: tPA within 4.5h. Thrombectomy 6-24h. Secondary prevention: antiplatelet + statin + BP control ± anticoagulation.

### Parkinson
Carbidopa-levodopa most effective. MAO-Bi or dopamine agonist for younger. Avoid antipsychotics (except quetiapine/clozapine).

### Depression & Psychosis
SSRI/SNRI first-line, allow 4-6 weeks. Antipsychotics: second-generation preferred, monitor metabolic parameters.`,
    keyPoints: [
      'AED by seizure type — valproate caution in childbearing women',
      'tPA within 4.5h for ischemic stroke',
      'Carbidopa-levodopa most effective for Parkinson motor symptoms',
      'SSRI/SNRI 4-6 weeks for full effect',
    ],
    drugClasses: ['AEDs', 'Antidepressants', 'Antipsychotics', 'Antiparkinson Agents', 'Mood Stabilizers'],
  },

  'cp-id': {
    summary: `## Infectious Diseases & Antimicrobial Pharmacotherapy

### Empiric Therapy
CAP: amoxicillin/doxycycline (outpatient), ceftriaxone + azithromycin (inpatient). UTI: nitrofurantoin/TMP-SMX. Meningitis: ceftriaxone + vancomycin + dexamethasone. Sepsis: broad-spectrum within 1 hour.

### Stewardship
De-escalate by cultures. Shortest effective duration. Avoid fluoroquinolones first-line when alternatives exist.

### HIV
ART for all: INSTI + 2 NRTIs (DTG/TAF/FTC). PrEP: TDF/FTC daily. PEP: within 72h, 28 days.

### TB
RIPE 2 months → RI 4 months. DOT recommended. Monitor: INH hepatitis, rifampin interactions.

### Malaria
Uncomplicated: ACT (artemether-lumefantrine). Severe: IV artesunate.

### Resistance
MRSA: vancomycin/daptomycin. ESBL: carbapenems. CRE: ceftazidime-avibactam. VRE: linezolid/daptomycin.`,
    keyPoints: [
      'Broad-spectrum empiric, de-escalate by culture',
      'Sepsis: antibiotics within 1 hour',
      'ART for all HIV regardless of CD4',
      'TB: RIPE 2 mo + RI 4 mo',
      'Severe malaria: IV artesunate',
    ],
    drugClasses: ['Beta-Lactams', 'Macrolides', 'Fluoroquinolones', 'Antivirals', 'Antituberculars', 'Antimalarials', 'Antifungals'],
  },

  'cp-onc': {
    summary: `## Haematology & Oncology Pharmacotherapy

### Solid Tumours
Breast: hormone therapy for HR+, trastuzumab for HER2+, chemo for TNBC. Prostate: ADT + abiraterone/enzalutamide. CRC: FOLFOX/FOLFIRI + bevacizumab. Lung: targeted based on molecular profile.

### Haematological
Leukemia: chemo + targeted (imatinib for CML, ATRA for APML). Lymphoma: R-CHOP for DLBCL, ABVD for Hodgkin.

### Toxicity Management
Nausea: NK1 + 5-HT3 antagonist ± dexamethasone. Febrile neutropenia: empiric antibiotics + G-CSF. Cardiotoxicity: anthracycline limit 450-550 mg/m².

### Anaemia
Iron deficiency: ferrous sulfate. B12: cyanocobalamin. Folic acid: 5 mg daily.`,
    keyPoints: [
      'Molecular profiling guides targeted therapy',
      'Antiemetics + G-CSF for supportive care',
      'Anthracycline: cumulative dose limit',
      'Iron deficiency: ferrous sulfate; B12: cyanocobalamin',
    ],
    drugClasses: ['Chemotherapy', 'Hormone Therapy', 'Targeted Therapy', 'Immunotherapy', 'Antiemetics', 'Anticoagulants'],
  },

  'cp-peds': {
    summary: `## Paediatric Pharmacotherapy

### Weight-Based Dosing
Most paediatric doses are calculated per kg body weight. Use ideal body weight for obese children. Verify all calculations independently. Common formulas: Clark's rule, Young's rule for age-based dosing.

### Neonatal Considerations
Hepatic and renal function immature at birth. Avoid sulfonamides (kernicterus), tetracyclines (tooth discoloration), fluoroquinolones (cartilage damage). Caffeine for apnoea of prematurity.

### Common Paediatric Conditions
- **Neonatal sepsis**: ampicillin + gentamicin or cefotaxime
- **Childhood pneumonia**: amoxicillin (outpatient), ampicillin/gentamicin (inpatient WHO protocol)
- **Childhood diarrhoea**: ORS + zinc. Antibiotics only for dysentery or cholera
- **Paediatric malaria**: ACT weight-based dosing

### Immunisations
Follow Kenya MOH/WHO schedule: BCG at birth, OPV/IPV, pentavalent (DTP-HepB-Hib), PCV, rotavirus, measles-rubella at 9 months.`,
    keyPoints: [
      'Weight-based dosing always — verify calculations independently',
      'Neonates: immature liver/kidneys, avoid certain drug classes',
      'ORS + zinc for diarrhoea, antibiotics only if dysentery',
      'WHO immunization schedule: BCG, pentavalent, PCV, rotavirus, MR',
    ],
    drugClasses: ['Antibiotics', 'Antimalarials', 'Vaccines', 'ORS', 'Antipyretics'],
  },

  'cp-obgyn': {
    summary: `## Obstetrics & Gynaecology Pharmacotherapy

### Pregnancy Drug Safety
US FDA categories (A, B, C, D, X). Safe options: paracetamol (analgesia), amoxicillin (most infections), methyldopa/labetalol/nifedipine (HTN). Avoid: ACEi/ARB, statins, warfarin, tetracyclines, valproate.

### Preeclampsia/Eclampsia
Prevention: low-dose aspirin (75-100 mg) from 12 weeks in high-risk. Treatment: MgSO₄ for seizure prophylaxis + labetalol/hydralazine for BP. Deliver after stabilization.

### Gestational Diabetes
Diet + exercise first-line. Metformin or insulin if uncontrolled. Glyburide second-line. Monitor fasting/postprandial glucose. Screen for T2DM postpartum.

### Contraception
COC (combined oral contraceptive), POP (progestin-only pill), IUD (Cu-IUD or LNG-IUS), implant (etonogestrel), DMPA (depot medroxyprogesterone), emergency contraception (ulipristal, LNG).

### Menopause
HRT: oestrogen + progestogen (if uterus intact). Vaginal oestrogen for GSM. Alternatives: SSRIs/SNRIs for vasomotor symptoms.`,
    keyPoints: [
      'Avoid ACEi, ARBs, statins, warfarin, tetracyclines in pregnancy',
      'Pre-eclampsia: MgSO₄ for seizures + labetalol for BP',
      'Gestational diabetes: metformin or insulin if diet fails',
      'Emergency contraception: ulipristal (up to 120h) or LNG (up to 72h)',
    ],
    drugClasses: ['Antihypertensives', 'Antidiabetics', 'Contraceptives', 'HRT', 'MgSO4'],
  },

  'cp-em': {
    summary: `## Emergency & Critical Care Pharmacotherapy

### ACLS Algorithms
- **VF/pulseless VT**: defibrillate (biphasic 200J) → CPR → epinephrine 1 mg q3-5min → amiodarone 300 mg → defibrillate
- **PEA/Asystole**: CPR → epinephrine 1 mg q3-5min → identify reversible causes (Hs and Ts)
- **Bradycardia**: atropine 0.5 mg q3-5min (max 3 mg) → transcutaneous pacing
- **Tachycardia stable**: adenosine (SVT), amiodarone/procainamide (wide complex)

### Sepsis and Septic Shock
Sepsis bundle: lactate, blood cultures, broad-spectrum antibiotics within 1h, fluids (30 mL/kg crystalloid), vasopressors (norepinephrine first-line) if MAP < 65.

### Anaphylaxis
Epinephrine IM (0.3-0.5 mg, anterolateral thigh) first-line. Adjunctive: antihistamine (diphenhydramine), steroids (methylprednisolone), albuterol for bronchospasm. ABC monitoring.

### Toxicologic Emergencies
- **Opioid overdose**: naloxone (0.4-2 mg IV/IM, repeat q2-3min)
- **Organophosphate**: atropine (2 mg IV q5min) + pralidoxime
- **Paracetamol overdose**: N-acetylcysteine (NAC) — most effective within 8h
- **Status epilepticus**: lorazepam IV/IM → fosphenytoin → levetiracetam → anaesthesia`,
    keyPoints: [
      'VF/VT: defibrillate + CPR + epinephrine + amiodarone',
      'Sepsis: antibiotics within 1h, fluids, norepinephrine if hypotensive',
      'Anaphylaxis: epinephrine IM first-line, not antihistamines',
      'Naloxone for opioid OD, NAC for paracetamol, atropine for OP',
    ],
    drugClasses: ['Vasopressors', 'Antiarrhythmics', 'Antidotes', 'Antibiotics', 'Sedatives'],
  },

  'cp-rheum': {
    summary: `## Rheumatology & Musculoskeletal Pharmacotherapy

### Rheumatoid Arthritis
DMARDs first-line: methotrexate (MTX) + folic acid. Add hydroxychloroquine or sulfasalazine if inadequate. Biologic DMARDs (anti-TNF: adalimumab, etanercept; anti-IL-6: tocilizumab) for moderate-severe.

### Osteoarthritis
Non-pharmacological: exercise, weight loss. Pharmacological: paracetamol first-line, topical NSAIDs, oral NSAIDs (lowest effective dose, shortest duration), capsaicin. Intra-articular corticosteroids. Avoid chronic opioids.

### Gout
Acute: NSAID (indomethacin, naproxen), colchicine (1.2 mg then 0.6 mg 1h later), or corticosteroid. ULT (allopurinol, febuxostat) start after inflammation resolved. Uricosurics (probenecid) second-line.

### SLE
Hydroxychloroquine for all. Steroids and immunosuppressants (MMF, cyclophosphamide) for organ-threatening. Avoid sun exposure. Vaccinate against pneumococcus, influenza, HPV.

### Pain Management
WHO analgesic ladder: Step 1 (non-opioid), Step 2 (weak opioid + non-opioid), Step 3 (strong opioid). Adjuvants: gabapentinoids for neuropathic pain, TCAs, SNRIs.`,
    keyPoints: [
      'RA: MTX first-line DMARD, add biologic if inadequate',
      'OA: paracetamol, topical/oral NSAIDs, avoid chronic opioids',
      'Gout: treat acute with NSAID/colchicine, start ULT after flare resolves',
      'SLE: hydroxychloroquine for all, immunosuppressants for organ disease',
      'WHO analgesic ladder: non-opioid → weak opioid → strong opioid',
    ],
    drugClasses: ['DMARDs', 'Biologics', 'NSAIDs', 'Corticosteroids', 'Colchicine', 'ULT Agents'],
  },

  'cp-derm': {
    summary: `## Dermatology Pharmacotherapy

### Acne Vulgaris
Mild: topical retinoid (tretinoin, adapalene) + benzoyl peroxide ± topical antibiotic (clindamycin). Moderate-severe: oral antibiotics (doxycycline, minocycline) + topical regimen. Isotretinoin for severe refractory.

### Psoriasis
Mild-moderate: topical corticosteroids, vitamin D analogues (calcipotriol), tar. Moderate-severe: phototherapy (UVB), systemic (MTX, cyclosporine, acitretin), biologics (anti-TNF, anti-IL-17, anti-IL-23).

### Eczema (Atopic Dermatitis)
Emollients (moisturizers) for all. Topical corticosteroids for flares (step down potency). Topical calcineurin inhibitors (tacrolimus, pimecrolimus) for sensitive areas. Severe: systemic immunosuppressants, dupilumab (anti-IL-4Rα).

### Skin Infections
- **Bacterial**: impetigo (topical mupirocin/fusidic acid, oral flucloxacillin/cephalexin), cellulitis (oral/IV antibiotics)
- **Fungal**: dermatophytes (terbinafine, clotrimazole), candida (clotrimazole, nystatin), tinea capitis (oral griseofulvin/terbinafine)
- **Scabies**: permethrin 5% cream (two applications 1 week apart), ivermectin oral for crusted scabies`,
    keyPoints: [
      'Acne: retinoid + BPO first-line; isotretinoin for severe',
      'Psoriasis: topical for mild, phototherapy/systemic/biologics for moderate-severe',
      'Eczema: emollients + topical steroids (step down) + TCIs',
      'Scabies: permethrin 5% cream, two applications 1 week apart',
    ],
    drugClasses: ['Topical Corticosteroids', 'Retinoids', 'Biologics', 'Antibiotics', 'Antifungals', 'Antihistamines'],
  },

  'cp-ophth': {
    summary: `## Ophthalmology Pharmacotherapy

### Glaucoma
First-line: prostaglandin analogues (latanoprost, travoprost) — once daily at night. Beta-blockers (timolol), alpha-agonists (brimonidine), carbonic anhydrase inhibitors (dorzolamide, brinzolamide), and combination drops.

### Conjunctivitis
- **Bacterial**: topical antibiotics (tobramycin, chloramphenicol, ciprofloxacin) — typically 5-7 days
- **Viral**: supportive (artificial tears, cold compresses) — self-limiting 1-2 weeks
- **Allergic**: topical antihistamine/mast cell stabilizer (olopatadine, ketotifen), artificial tears

### Ocular Infections
- **Corneal ulcer/keratitis**: topical fluoroquinolones (ciprofloxacin, moxifloxacin), fortified antibiotics. Refer urgently
- **Uveitis**: topical corticosteroids (prednisolone acetate) + cycloplegics (atropine, homatropine)
- **Endophthalmitis**: intravitreal antibiotics (vancomycin + ceftazidime) — emergency

### Dry Eye Disease
Artificial tears (carboxymethylcellulose, hyaluronic acid) first-line. Cyclosporine or lifitegrast for moderate-severe. Punctal plugs for refractory.

### Ocular Side Effects of Systemic Drugs
Topiramate → acute angle closure. Ethambutol → optic neuritis. Hydroxychloroquine → retinal toxicity (screen >5 yrs). Amiodarone → corneal deposits. Corticosteroids → cataracts, glaucoma.`,
    keyPoints: [
      'Glaucoma: prostaglandin analogues first-line, once at night',
      'Bacterial conjunctivitis: topical antibiotics 5-7 days',
      'Corneal ulcer: topical fluoroquinolones, urgent referral',
      'Hydroxychloroquine retinal screening annually after 5 years',
    ],
    drugClasses: ['Prostaglandin Analogues', 'Beta-Blockers', 'Antibiotics', 'Corticosteroids', 'Antihistamines', 'Artificial Tears'],
  },

  'cp-ent': {
    summary: `## ENT Pharmacotherapy

### Otitis Media
Acute otitis media (AOM): amoxicillin (80-90 mg/kg/day) for 5-7 days (10 days if <2 years). Alternative: amoxicillin-clavulanate if recent antibiotic or treatment failure. Myringotomy if complications.

### Sinusitis
Acute bacterial rhinosinusitis: amoxicillin-clavulanate first-line for 5-7 days. Doxycycline or respiratory fluoroquinolone (levofloxacin, moxifloxacin) if penicillin-allergic. Intranasal corticosteroids for symptom relief.

### Pharyngitis/Tonsillitis
Viral: supportive (analgesics, salt water gargle). Group A Strep (GAS): rapid test or culture. Antibiotics if GAS+: penicillin V or amoxicillin 10 days (prevents rheumatic fever). Alternatives: cephalexin, clindamycin.

### Allergic Rhinitis (ENT perspective)
Intranasal corticosteroids (fluticasone, mometasone) first-line. Oral or intranasal antihistamines (cetirizine, loratadine, azelastine). Montelukast for concomitant asthma. Immunotherapy for refractory.

### Hearing Disorders
Sudden sensorineural hearing loss: oral corticosteroids (prednisone 1 mg/kg) within 2 weeks. Ménière's: diuretics, betahistine, low-salt diet. Tinnitus: sound therapy, CBT, avoid exacerbating drugs (aspirin, NSAIDs, loop diuretics, aminoglycosides).`,
    keyPoints: [
      'AOM: amoxicillin 80-90 mg/kg/day, 5-10 days depending on age',
      'GAS pharyngitis: penicillin/amoxicillin 10 days to prevent ARF',
      'Acute sinusitis: amoxicillin-clavulanate 5-7 days',
      'Sudden hearing loss: oral steroids within 2 weeks',
    ],
    drugClasses: ['Antibiotics', 'Corticosteroids', 'Antihistamines', 'Decongestants', 'Analgesics'],
  },

  'cp-tox': {
    summary: `## Toxicology & Poison Management

### General Approach
ABCDE assessment: Airway, Breathing, Circulation, Disability, Exposure. Decontamination: activated charcoal (within 1h), whole bowel irrigation (sustained-release, metals), gastric lavage (rarely indicated). Antidote administration. Supportive care.

### Common Poisonings & Antidotes
- **Paracetamol**: N-acetylcysteine (NAC) — most effective within 8h of ingestion
- **Opioids**: naloxone (0.4-2 mg IV/IM, repeat as needed)
- **Organophosphates**: atropine (2 mg IV q5min until dry) + pralidoxime
- **Benzodiazepines**: flumazenil (use cautiously — risk of seizures in mixed OD)
- **Tricyclic antidepressants**: NaHCO₃ (for QRS widening >100 ms)
- **Iron**: deferoxamine
- **Methanol/Ethylene glycol**: fomepizole or ethanol + hemodialysis
- **Carbon monoxide**: 100% O₂, hyperbaric O₂ for severe
- **Cyanide**: hydroxocobalamin (preferred) or amyl nitrite + Na thiosulfate

### Withdrawal Syndromes
- **Alcohol**: CIWA protocol — benzodiazepines (diazepam, chlordiazepoxide) symptom-triggered, thiamine (to prevent Wernicke-Korsakoff)
- **Opioids**: methadone or buprenorphine for maintenance, clonidine for symptoms
- **Benzodiazepines**: slow taper (reduce 10% weekly)

### Toxidromes
- **Anticholinergic**: delirium, hyperthermia, flushed skin, dilated pupils, urinary retention (antihistamines, TCAs, antipsychotics)
- **Cholinergic**: SLUDGE/Bradycardia/bronchorrhea (OPs, carbamates)
- **Sympathomimetic**: hypertension, tachycardia, diaphoresis, seizures (cocaine, amphetamines)
- **Opioid**: CNS depression, respiratory depression, miosis (pinpoint pupils)`,
    keyPoints: [
      'ABC + decontamination + antidote + supportive care',
      'NAC for paracetamol, naloxone for opioids, atropine/2-PAM for OPs',
      'NaHCO₃ for TCA (wide QRS), fomepizole for methanol/EG',
      'Alcohol withdrawal: benzodiazepines + thiamine (CIWA protocol)',
      'Flumazenil: risk of seizures in mixed OD — use cautiously',
    ],
    drugClasses: ['Antidotes', 'Benzodiazepines', 'Anticonvulsants', 'Vasopressors', 'Activated Charcoal'],
  },

  'cp-ger': {
    summary: `## Geriatric Pharmacotherapy

### Polypharmacy
Use of 5+ medications increases risk of ADRs, falls, cognitive impairment, and hospitalizations. Deprescribing: STOPP/START criteria. Medication reconciliation at every visit. "Start low, go slow" dosing.

### Beers Criteria (Potentially Inappropriate Medications)
Key medications to avoid in older adults:
- **Anticholinergics**: diphenhydramine, amitriptyline, oxybutynin — confusion, falls, constipation
- **Benzodiazepines**: falls, cognitive impairment — avoid for insomnia, agitation, delirium
- **NSAIDs**: GI bleeding, renal impairment, HTN exacerbation
- **Sulfonylureas (long-acting)**: prolonged hypoglycemia — glipizide preferred
- **Antipsychotics**: increased mortality in dementia — avoid for behavioural symptoms

### Age-Related Pharmacokinetic Changes
- **Absorption**: decreased gastric acidity, delayed gastric emptying
- **Distribution**: increased fat, decreased water → larger Vd for lipophilic drugs, lower Vd for hydrophilic
- **Metabolism**: decreased hepatic mass and blood flow → reduced first-pass
- **Elimination**: decreased renal function (CKD stage G3a common) → CrCl-based dosing critical

### Common Geriatric Conditions
- **Delirium**: identify cause (PINCH ME: Pain, Infection, Nutrition, Constipation, Hydration, Medications, Environment). Avoid antipsychotics unless severe agitation
- **Falls**: review medications (especially sedatives, antihypertensives, hypoglycaemics). Vitamin D + calcium supplementation
- **Dementia**: cholinesterase inhibitors (donepezil, rivastigmine) for mild-moderate Alzheimer's. Memantine for moderate-severe
- **Osteoporosis**: bisphosphonates (alendronate weekly), vitamin D 800 IU, calcium 1200 mg daily`,
    keyPoints: [
      'Polypharmacy: STOPP/START criteria, deprescribe when possible',
      'Beers: avoid anticholinergics, BZDs, NSAIDs, high-risk antipsychotics',
      'Calculate CrCl for every drug — age-related renal decline',
      'Start low, go slow — especially for CNS-active drugs',
    ],
    drugClasses: ['Antihypertensives', 'Antidiabetics', 'Bisphosphonates', 'Cholinesterase Inhibitors', 'Vitamins'],
  },

  'cp-tdm': {
    summary: `## Therapeutic Drug Monitoring

### Principles
TDM measures drug concentrations to optimize efficacy and minimize toxicity. Indicated for drugs with narrow therapeutic index, large PK variability, or concentration-effect relationships. Timing: trough (most antibiotics, antiepileptics), peak (aminoglycosides), or steady-state (5 half-lives).

### Drugs Requiring TDM
- **Vancomycin**: trough 15-20 mg/L (serious infections). AUC/MIC ratio preferred: 400-600
- **Aminoglycosides**: gentamicin/tobramycin peak 4-10 mg/L, trough < 1-2 mg/L (conventional dosing); or 24h AUC/MIC
- **Lithium**: 0.6-1.2 mmol/L (acute), 0.4-0.8 (maintenance). Toxicity > 1.5
- **Digoxin**: 0.5-1.2 ng/mL (HF), 0.8-2 (AF). Toxicity > 2.5
- **Valproate**: 50-100 mg/mL (300-700 µmol/L)
- **Phenytoin**: 10-20 mg/mL (free 1-2 mg/mL)
- **Carbamazepine**: 4-12 mg/mL
- **Theophylline**: 5-15 mg/mL
- **Methotrexate (high-dose)**: < 10 µmol/L at 24h, < 1 at 48h, < 0.1 at 72h
- **Cyclosporine/tacrolimus**: whole blood trough levels, target depends on indication and time post-transplant

### PK Calculations
- **Loading dose**: LD = Vd × target C₀ / F
- **Maintenance dose**: MD = CL × Css,avg
- **Half-life**: t₁/₂ = 0.693 × Vd / CL
- **Creatinine clearance (Cockcroft-Gault)**: CrCl = [(140-age)×wt×0.85(female)]/(72×SCr)

### TDM Process
1. Appropriate indication for TDM
2. Correct timing (steady-state, trough vs peak)
3. Accurate sample collection (document time, dose, route)
4. Interpret in clinical context (not just the number)
5. Adjust dose based on PK principles
6. Recheck after dose change (after 5 half-lives)`,
    keyPoints: [
      'TDM for narrow therapeutic index drugs',
      'Trough: vancomycin, aminoglycosides, lithium, digoxin',
      'Steady-state reached after 5 half-lives',
      'CrCl = Cockcroft-Gault for renal dose adjustment',
      'Interpret result in clinical context, not as absolute number',
    ],
    drugClasses: ['Vancomycin', 'Aminoglycosides', 'Lithium', 'Digoxin', 'Immunosuppressants', 'AEDs'],
  },

  'cp-couns': {
    summary: `## Patient Counselling

### Communication Skills
Use the Calgary-Cambridge framework:
1. Initiation: establish rapport, identify agenda
2. Gathering: open-ended questions, active listening
3. Explanation: chunk and check, teach-back
4. Planning: shared decision-making, check understanding
5. Closing: safety net, next steps

### Medication Counselling Key Points
INHALE mnemonic:
- **I**ndication: What is this for?
- **N**ame: Generic and brand names
- **H**ow to take: Dose, route, timing, with/without food
- **A**ction: Expected onset and duration
- **L**arge concerns: Major side effects and what to do
- **E**nd date: Duration of therapy, follow-up

### Adherence Strategies
Assess barriers: forgetfulness, cost, complexity, side effects, lack of understanding. Strategies: simplify regimen (once-daily), pill organisers, blister packs, mobile reminders, motivational interviewing. Use the "teach-back" method to confirm understanding.

### Special Populations
- **Paediatric**: involve caregiver, use child-friendly language, check weight-based dosing
- **Geriatric**: large print, simplify instructions, check vision/hearing, involve family
- **Pregnancy/lactation**: discuss risk-benefit, check safety category
- **Language barriers**: use trained interpreter (not family), translated materials

### Inhaler Device Counselling
pMDI: shake → breathe out → seal lips → actuate → slow deep inhale → hold 10s → exhale. Use spacer. DPI: load dose → exhale (not into device) → rapid deep inhale → hold 10s. Rinse mouth after ICS.`,
    keyPoints: [
      'INHALE mnemonic for medication counselling: Indication, Name, How, Action, Large concerns, End',
      'Teach-back method: "Can you tell me in your own words..."',
      'Simplify regimen, pill organisers, blister packs for adherence',
      'Always check understanding — don\'t assume',
    ],
  },

  'cp-safety': {
    summary: `## Medication Safety

### Medication Error Prevention
Types: prescribing, omission, wrong dose, wrong route, wrong time, wrong patient, administration. Prevent with: CPOE, barcode scanning, tall-man lettering (e.g., DOBUTamine vs DOPamine), independent double-check for high-alert drugs.

### High-Alert Medications
Drugs with heightened risk of significant harm:
- **LASA pairs**: hydrALAZINE vs hydrOXYzine, cefTRIAXone vs cefTAZidime, METformin vs METoprolol
- **Cytotoxics**: vinca alkaloids (IV only, NOT intrathecal)
- **Anticoagulants**: warfarin, heparin, enoxaparin, NOACs
- **Insulin**: U-500 (5x concentrated), LANTUS vs LEVEMIR
- **Opioids**: morphine, hydromorphone, fentanyl patches
- **Potassium**: IV KCl concentrate — NEVER undiluted
- **Neuromuscular blockers**: confirm before administration

### Pharmacovigilance
ADR reporting: spontaneous reporting system. Causality assessment (WHO-UMC): certain, probable, possible, unlikely. Severity: mild, moderate, severe, fatal. Preventable ADRs: most are dose-related and predictable.

### Root Cause Analysis (RCA)
Process to identify underlying causes after a serious incident:
1. Define the event
2. Gather data (chart review, interviews)
3. Identify contributing factors (human, system, environmental)
4. Identify root causes
5. Develop action plan (not just "retrain staff")
6. Implement and monitor

### "Just Culture" Principles
Differentiate between:
- **Human error**: unintentional slip/lapse — console, support, system fix
- **At-risk behaviour**: choice to shortcut — coach, remove incentives
- **Reckless behaviour**: disregard for safety — disciplinary action`,
    keyPoints: [
      'High-alert: LASA pairs, anticoagulants, insulin, opioids, IV KCl',
      'Tall-man lettering differentiates look-alike drugs',
      'ADR reporting: WHO-UMC causality categories',
      'RCA: find system causes, not individual blame',
      'Just culture: distinguish error, at-risk behaviour, reckless behaviour',
    ],
  },

  'cp-pharmcare': {
    summary: `## Pharmaceutical Care

### Pharmaceutical Care Process
Systematic patient-centred approach:
1. **Assessment**: gather patient data, medications, conditions, labs
2. **DTP Identification**: classify each drug therapy problem
3. **Care Plan**: set therapeutic goals, interventions, monitoring
4. **Implementation**: prescribe, adjust, counsel, coordinate
5. **Evaluation**: assess outcomes, modify plan

### Drug Therapy Problems (DTPs)
Seven categories with interventions:
- **Unnecessary drug**: discontinue, taper if needed
- **Needs additional drug**: initiate guideline-directed therapy
- **Ineffective drug**: switch to more appropriate agent
- **Dosage too low**: increase dose, optimize regimen
- **Dosage too high**: reduce dose, adjust for organ function
- **ADR**: substitute, add protective therapy, monitor
- **Non-adherence**: simplify, educate, address barriers

### Clinical Documentation
SOAP format: Subjective (patient-reported), Objective (vitals, labs, exam), Assessment (diagnosis, DTPs, progress), Plan (therapy changes, monitoring, follow-up). FARM: Findings, Assessment, Recommendations, Monitoring.

### Medication Reconciliation
Process of comparing a patient's medication orders to all medications they have been taking. Perform at transitions of care: admission, transfer, discharge. Involve patient and caregivers. Reconcile: name, dose, route, frequency, indication.

### Interprofessional Collaboration
Pharmacist rounds with medical team. Medication therapy management (MTM) services. Collaborative practice agreements. Drug information consultations. Formulary management.`,
    keyPoints: [
      'Pharmaceutical care: assess → identify DTPs → plan → implement → evaluate',
      '7 DTP categories with specific interventions',
      'SOAP or FARM format for clinical documentation',
      'Medication reconciliation at all transitions of care',
    ],
  },

  // ================================================================
  // PHARMACOLOGY (20 units)
  // ================================================================

  'pharm-intro': {
    summary: `## Introduction to Pharmacology

### Definitions
Pharmacology: study of drugs and their interactions with living systems. Pharmacokinetics (what the body does to the drug): ADME — Absorption, Distribution, Metabolism, Excretion. Pharmacodynamics (what the drug does to the body): receptor binding, dose-response, efficacy, potency.

### Drug Nomenclature
Drugs have three names: chemical (scientific description), generic (non-proprietary, e.g., paracetamol), and brand/trade (proprietary, e.g., Panadol). Prescribe by generic name.

### Routes of Administration
Enteral: oral (most common, first-pass effect), sublingual (bypasses first-pass), rectal. Parenteral: IV (immediate onset, 100% bioavailability), IM, SC. Inhalation: rapid lung absorption. Topical: local effect. Transdermal: systemic via skin.

### Drug Development
Preclinical (animal studies) → Phase I (healthy volunteers, safety) → Phase II (patients, efficacy + dosing) → Phase III (large RCTs, confirm efficacy) → Phase IV (post-marketing surveillance). Average timeline: 10-15 years, cost > $1 billion.`,
    keyPoints: [
      'Pharmacokinetics = ADME; Pharmacodynamics = drug action on body',
      'Prescribe by generic name',
      'Oral: first-pass metabolism in liver',
      'Drug development: preclinical → Phase I-IV, 10-15 years',
    ],
  },

  'pharm-gen': {
    summary: `## General Pharmacology

### Receptor Theory
Drugs act through receptors (proteins on cell surface, enzymes, ion channels, transporters). Affinity: ability to bind. Efficacy: ability to activate. Agonist: binds + activates. Antagonist: binds + blocks. Partial agonist: submaximal efficacy. Inverse agonist: reduces constitutive activity.

### Dose-Response Relationships
Graded dose-response: increasing dose → increasing effect (until plateau). Potency (EC₅₀): dose for 50% maximal effect. Efficacy (Eₘₐₓ): maximum achievable effect. Therapeutic window: range between minimum effective concentration and toxic concentration.

### Drug-Receptor Interactions
Lock and key model. Receptors: GPCRs (largest family, e.g., β-adrenoceptors), ion channels (e.g., GABA-A), enzyme-linked (e.g., insulin receptor), nuclear receptors (e.g., steroid receptors). Signal transduction: second messengers (cAMP, IP₃, Ca²⁺, DAG).

### Pharmacokinetics Overview
ADME determines drug concentration at site of action. Bioavailability (F): fraction of unchanged drug reaching systemic circulation. Volume of distribution (Vd): apparent space drug distributes into. Clearance (CL): volume of plasma cleared per unit time. Half-life (t₁/₂): time for concentration to decrease by 50%.

### Factors Affecting Drug Response
Age, weight, genetics (pharmacogenomics), organ function (liver/kidney), pregnancy, drug interactions, tolerance, compliance.`,
    keyPoints: [
      'Agonist: activates; Antagonist: blocks; Partial agonist: submaximal',
      'Potency = EC₅₀; Efficacy = Eₘₐₓ',
      'GPCRs are the largest receptor family, targeted by ~30% of drugs',
      'ADME determines drug concentration at site of action',
    ],
  },

  'pharm-pk': {
    summary: `## Pharmacokinetics

### Absorption
Movement of drug from administration site to systemic circulation. Factors: route, solubility, blood flow, pH (ion trapping), formulation (immediate vs sustained release). Bioavailability (F): oral < IV due to first-pass metabolism.

### Distribution
Drug moves from blood to tissues. Factors: blood flow, protein binding (albumin for acidic drugs, α₁-acid glycoprotein for basic), Vd, tissue barriers (BBB, placenta). Only free (unbound) drug is pharmacologically active.

### Metabolism (Biotransformation)
Liver is the primary site. Phase I: oxidation, reduction, hydrolysis (cytochrome P450 — CYP3A4, CYP2D6, CYP2C9, CYP2C19). Phase II: conjugation (glucuronidation, sulfation, acetylation). Prodrugs: inactive until metabolized (e.g., codeine → morphine). Enzyme inducers (rifampin, carbamazepine, phenytoin) and inhibitors (ketoconazole, clarithromycin, grapefruit juice).

### Excretion
Kidneys (primary): glomerular filtration, tubular secretion, tubular reabsorption. Biliary excretion into faeces. Pulmonary excretion (volatile anaesthetics). Renal dosing adjustments for CKD.

### Compartmental Models
One-compartment: drug distributes instantly. Two-compartment: central (blood, well-perfused) + peripheral (tissues). Non-compartmental analysis for clinical PK.

### Key PK Equations
- Loading dose = Vd × C₀ / F
- Clearance = rate of elimination / Cₛₛ
- Half-life = 0.693 × Vd / CL
- Cₛₛ = (dosing rate × F) / CL (reached after ~5 half-lives)`,
    keyPoints: [
      'Bioavailability: IV = 100%, oral varies (first-pass)',
      'Only free drug is active — protein binding matters',
      'CYP450: 3A4 metabolizes ~50% of drugs, key for interactions',
      'Phase I (oxidation) → Phase II (conjugation)',
      'Steady-state after 5 half-lives',
    ],
  },

  'pharm-pd': {
    summary: `## Pharmacodynamics

### Drug-Receptor Interactions
Lock and key (fischer) vs induced fit (koshland). Bonds: ionic, hydrogen, van der Waals, covalent (irreversible). Receptors: GPCRs, ion channels, enzyme-linked, nuclear. Transduction pathways: G-proteins (Gs, Gi, Gq), tyrosine kinase, JAK-STAT.

### Agonists
Full agonist: maximal response. Partial agonist: submaximal response (useful for maintaining some effect while limiting overstimulation — e.g., buprenorphine). Inverse agonist: reduces constitutive activity (e.g., flumazenil).

### Antagonists
Competitive: reversible binding, surmountable (parallel right shift of DRC). Non-competitive: irreversible binding, insurmountable (reduced Eₘₐₓ). Allosteric: binds different site, modulates receptor activity.

### Quantal Dose-Response
Population-based: ED₅₀ (effective dose in 50%), TD₅₀ (toxic dose in 50%), LD₅₀ (lethal dose in 50%). Therapeutic index (TI): TD₅₀/ED₅₀ or LD₅₀/ED₅₀. Narrow TI drugs: digoxin, lithium, warfarin, theophylline, aminoglycosides.

### Spare Receptors
Maximal effect can be achieved without occupying all receptors. Receptor reserve allows full response even with partial receptor occupancy. Up-regulation (↑ receptor number with chronic antagonist) → supersensitivity. Down-regulation (↓ receptors with chronic agonist) → tolerance.

### Drug Tolerance
Pharmacodynamic tolerance: receptor desensitization, down-regulation. Pharmacokinetic tolerance: increased metabolism (enzyme induction). Tachyphylaxis: rapid, acute tolerance (e.g., nitroglycerin).`,
    keyPoints: [
      'Full agonist: maximal response. Partial: submaximal',
      'Competitive antagonist: surmountable, right-shift DRC',
      'Therapeutic index = TD₅₀/ED₅₀ — narrow TI drugs need TDM',
      'Receptor up/down-regulation → tolerance and supersensitivity',
    ],
  },

  'pharm-auto': {
    summary: `## Autonomic Pharmacology

### Autonomic Nervous System
Two divisions: Sympathetic (fight or flight) and Parasympathetic (rest and digest). ANS uses two neurotransmitters: acetylcholine (ACh, all preganglionic + parasympathetic postganglionic) and noradrenaline (NA, sympathetic postganglionic — except sweat glands).

### Cholinergic Transmission
ACh synthesis: choline + acetyl-CoA → ACh (ChAT). Storage in vesicles. Release: Ca²⁺-dependent. Degradation: acetylcholinesterase (AChE). Receptors: nicotinic (ion channel, Na+/K+) and muscarinic (GPCR, M1-M5).

### Cholinergic Agonists
Direct: bethanechol (GI/ GU), pilocarpine (glaucoma), cevimeline (dry mouth). Indirect (AChE inhibitors): neostigmine (post-op ileus, myasthenia gravis), physostigmine (crosses BBB), pyridostigmine (myasthenia gravis), donepezil/rivastigmine (Alzheimer's). Organophosphates: irreversible AChE inhibition → toxicity.

### Cholinergic Antagonists (Antimuscarinics)
Atropine: blocks all muscarinic receptors → mydriasis (dilated pupils), tachycardia, dry mouth, urinary retention, decreased GI motility. Ipratropium/tiotropium: inhaled for COPD/asthma. Scopolamine: motion sickness. Oxybutynin/tolterodine: overactive bladder.

### Adrenergic Transmission
NA synthesis: tyrosine → DOPA → dopamine → NA (vesicles). Release: Ca²⁺-dependent. Termination: reuptake (NET, 80%), metabolism (MAO, COMT). Adrenaline from adrenal medulla.

### Adrenergic Receptors
α₁: vascular smooth muscle (vasoconstriction), mydriasis, prostatic contraction. α₂: presynaptic (↓ NA release), CNS (↓ SNS outflow). β₁: heart (↑ HR, ↑ contractility), kidney (renin release). β₂: bronchodilation, vasodilation, uterine relaxation, liver (glycogenolysis). β₃: lipolysis.

### Adrenergic Agonists
Direct: adrenaline (α+β), noradrenaline (α>β₁), isoprenaline (β₁+β₂), dobutamine (β₁), salbutamol/albuterol (β₂), phenylephrine (α₁). Indirect: amphetamine, cocaine (↑ NA). Mixed: ephedrine.

### Adrenergic Antagonists
α-blockers: prazosin/doxazosin (HTN, BPH), tamsulosin (BPH — selective α₁A). β-blockers: propranolol (non-selective), metoprolol/bisoprolol (β₁-selective), carvedilol/labetalol (α+β).`,
    keyPoints: [
      'SNS: NA/Adr; PNS: ACh',
      'Muscarinic (M) receptors: atropine blocks all',
      'Nicotinic (N) receptors: ion channels at ganglia and NMJ',
      'β₂ agonists: bronchodilation (salbutamol)',
      'β₁: heart — β₁ selective blockers preferred in asthma',
    ],
    drugClasses: ['Cholinergics', 'Anticholinergics', 'Adrenergic Agonists', 'Beta-Blockers', 'Alpha-Blockers'],
  },

  'pharm-cv': {
    summary: `## Cardiovascular Pharmacology

### ACE Inhibitors
MOA: Inhibit ACE → ↓ Ang II → vasodilation, ↓ aldosterone. Uses: HTN, HF, post-MI, CKD. AE: cough (bradykinin), angioedema, hyperkalemia. Monitor K+, Cr, BP.

### ARBs
MOA: Block AT1 receptor. Uses: same as ACEi, better tolerated (no cough).

### Beta-Blockers
β₁-selective (metoprolol, bisoprolol): HTN, angina, HF. Non-selective (propranolol): migraine, performance anxiety. α+β (carvedilol, labetalol): HF, HTN. Caution in asthma.

### CCBs
DHP (amlodipine, nifedipine): vasodilators, no HR effect. Non-DHP (verapamil, diltiazem): ↓ HR + contractility — avoid in HFrEF.

### Diuretics
Thiazide: first-line HTN. Loop: HF/edema. K-sparing: spironolactone (HF, add MRA).

### Statins
MOA: HMG-CoA reductase inhibition. Atorvastatin 80 mg for ACS. Monitor myopathy, LFTs.`,
    keyPoints: [
      'ACEi/ARB: monitor K+ and Cr, avoid in pregnancy',
      'β-blockers: cardio-selective in COPD/asthma',
      'Verapamil/diltiazem: avoid in HFrEF',
      'Statins: atorvastatin 80 for ACS',
    ],
    drugClasses: ['ACE Inhibitors', 'ARBs', 'Beta-Blockers', 'CCBs', 'Diuretics', 'Statins'],
  },

  'pharm-renal': {
    summary: `## Renal Pharmacology

### Diuretics
- **Loop diuretics** (furosemide, bumetanide, torsemide): block Na-K-2Cl in thick ascending limb. Most potent, used in HF, CKD, edema. AE: hypokalemia, ototoxicity
- **Thiazides** (HCTZ, chlorthalidone): block NaCl in DCT. First-line HTN (chlorthalidone preferred). AE: hypokalemia, hyperglycemia, hyperuricemia
- **K-sparing** (spironolactone, eplerenone, amiloride): MRA (spironolactone) or Na channel block. AE: hyperkalemia
- **Carbonic anhydrase inhibitors** (acetazolamide): glaucoma, metabolic alkalosis, altitude sickness

### Drugs Affecting the Kidney
ACEi/ARB: protect kidneys in proteinuric CKD, but monitor Cr and K+. SGLT2i (dapagliflozin, empagliflozin): slow CKD progression. NSAIDs: nephrotoxic — reduce GFR, cause papillary necrosis. Aminoglycosides, vancomycin, amphotericin B, contrast: nephrotoxic.

### Drug Dosing in Renal Impairment
Calculate CrCl (Cockcroft-Gault) or eGFR (CKD-EPI). Adjust doses or extend intervals for renally cleared drugs. Drugs best avoided: nitrofurantoin (if CrCl < 30), metformin (if eGFR < 30), NSAIDs (if CKD G4+), spironolactone (if eGFR < 30 with K+ risk).

### Osmotic Diuretics
Mannitol: increases plasma osmolality → draws fluid from tissues. Uses: cerebral oedema, acute glaucoma. Contraindicated in anuric renal failure, pulmonary oedema.`,
    keyPoints: [
      'Loop diuretics most potent — furosemide for HF/edema',
      'Thiazides first-line HTN — chlorthalidone preferred',
      'ACEi/ARB + SGLT2i = renoprotective combination',
      'Calculate CrCl before dosing renally cleared drugs',
      'Avoid nitrofurantoin (CrCl <30), metformin (eGFR <30)',
    ],
    drugClasses: ['Loop Diuretics', 'Thiazides', 'MRAs', 'SGLT2 Inhibitors', 'ACE Inhibitors', 'ARBs'],
  },

  'pharm-resp': {
    summary: `## Respiratory Pharmacology

### Beta-2 Agonists
SABA (salbutamol, terbutaline): reliever, onset 5 min, duration 3-6h. LABA (salmeterol, formoterol): controller, duration 12-24h. Ultra-LABA (indacaterol, olodaterol): once daily. MOA: β₂ receptor → ↑ cAMP → bronchodilation. AE: tremor, tachycardia, hypokalemia.

### Inhaled Corticosteroids (ICS)
Beclometasone, budesonide, fluticasone, mometasone, ciclesonide. MOA: anti-inflammatory, ↓ eosinophils, ↓ airway hyperresponsiveness. AE: oropharyngeal candidiasis, dysphonia. Rinse mouth after use.

### Antimuscarinics (LAMA)
Ipratropium (SAMA): short-acting. Tiotropium (LAMA): once-daily. MOA: block M₃ receptors → bronchodilation. AE: dry mouth, urinary retention. Preferred in COPD over asthma.

### Combination Inhalers
ICS/LABA: fluticasone/salmeterol, budesonide/formoterol (SMART), mometasone/indacaterol. LAMA/LABA: tiotropium/olodaterol, umeclidinium/vilanterol. Triple: fluticasone/umeclidinium/vilanterol.

### Leukotriene Receptor Antagonists (LTRA)
Montelukast: oral, blocks CysLT₁ receptors. Uses: mild asthma (especially exercise-induced), allergic rhinitis. AE: neuropsychiatric effects (rare).

### Xanthines
Theophylline: non-selective PDE inhibitor → ↑ cAMP. Narrow therapeutic index (TDM: 5-15 mg/mL). Uses: severe asthma/COPD (third-line). AE: N&V, tremor, tachycardia, seizures.

### Mast Cell Stabilizers
Cromoglycate, nedocromil: prophylactic in mild asthma. Stabilizes mast cells → ↓ histamine release. Not for acute attacks.

### Biologics
Omalizumab (anti-IgE): moderate-severe allergic asthma. Mepolizumab, reslizumab (anti-IL-5): eosinophilic asthma. Dupilumab (anti-IL-4Rα): type 2 inflammation. Benralizumab (anti-IL-5Rα).`,
    keyPoints: [
      'SABA: reliever, LABA: controller — never LABA alone without ICS',
      'ICS: first-line controller, rinse mouth to prevent candidiasis',
      'LAMA: tiotropium first-line in COPD',
      'SMART: formoterol/budesonide as single inhaler',
      'Biologics: add-on for severe eosinophilic asthma',
    ],
    drugClasses: ['SABA', 'LABA', 'ICS', 'LAMA', 'LTRA', 'Xanthines', 'Biologics'],
  },

  'pharm-gi': {
    summary: `## Gastrointestinal Pharmacology

### Acid Suppressants
PPIs (omeprazole, lansoprazole, pantoprazole, esomeprazole, rabeprazole): irreversibly block H⁺/K⁺ ATPase (proton pump). Most potent acid suppressants. Take 30-60 min before meals. H2RAs (cimetidine, ranitidine, famotidine, nizatidine): block H₂ receptors. Faster onset but develop tolerance.

### Antacids
Aluminium/Magnesium hydroxide, calcium carbonate. Provide rapid symptom relief. Mg-containing: diarrhoea. Al-containing: constipation. Calcium: rebound acid secretion. Drug interactions: chelate other drugs (tetracyclines, iron, digoxin).

### Prokinetics
Metoclopramide: D₂ antagonist + 5-HT₄ agonist. Uses: gastroparesis, GERD, prevention of CINV. AE: extrapyramidal symptoms (dystonia, tardive dyskinesia). Domperidone: D₂ antagonist (doesn't cross BBB). Erythromycin (low dose): motilin agonist.

### Antiemetics
5-HT₃ antagonists (ondansetron, granisetron): CINV, post-op. NK₁ antagonists (aprepitant, fosaprepitant): CINV (delayed emesis). Antihistamines (cyclizine, promethazine): motion sickness. Anticholinergics (scopolamine): motion sickness. Neuroleptics (prochlorperazine, haloperidol): nausea from various causes.

### Laxatives
Bulk-forming (psyllium, ispaghula): fibre. Osmotic (lactulose, PEG, Mg-containing). Stimulant (senna, bisacodyl). Stool softeners (docusate). IBS treatments: mebeverine (antispasmodic), linaclotide (guanylate cyclase-C agonist), rifaximin (non-absorbable antibiotic for IBS-D).

### Antidiarrhoeals
Loperamide (μ-opioid receptor agonist): slows GI motility. Not for infectious diarrhoea with fever/blood. Oral rehydration salts (ORS): essential for all diarrhoeal illnesses.`,
    keyPoints: [
      'PPIs: most potent acid suppression, take before meals',
      'H2RAs: good for nocturnal acid breakthrough',
      'Metoclopramide: effective prokinetic but EPS risk',
      'ORS for all diarrhoea — lifesaving',
    ],
    drugClasses: ['PPIs', 'H2RAs', 'Antacids', 'Antiemetics', 'Laxatives', 'Antidiarrhoeals'],
  },

  'pharm-endo': {
    summary: `## Endocrine Pharmacology

### Insulin
Types based on onset/duration:
- **Rapid-acting** (lispro, aspart, glulisine): onset 5-15 min, peak 1h, duration 3-5h
- **Short-acting** (regular insulin): onset 30 min, peak 2-3h, duration 6-8h
- **Intermediate** (NPH): onset 2h, peak 4-6h, duration 12-16h
- **Long-acting** (glargine, detemir, degludec): onset 2h, no peak, duration 20-42h

### Oral Hypoglycaemics
Biguanides (metformin): ↓ hepatic gluconeogenesis, ↑ insulin sensitivity. First-line T2DM. SULs (glipizide, glibenclamide): ↑ insulin secretion — weight gain, hypoglycemia. TZDs (pioglitazone): ↑ insulin sensitivity — oedema, HF risk. DPP-4i (sitagliptin, vildagliptin): ↑ incretin half-life. SGLT2i (empagliflozin, dapagliflozin): ↓ glucose reabsorption — UTI, DKA risk. GLP-1 RA (exenatide, liraglutide, semaglutide): ↑ incretin, ↓ appetite — nausea, pancreatitis.

### Corticosteroids
Glucocorticoids (prednisolone, dexamethasone, hydrocortisone): anti-inflammatory, immunosuppressive. AE: osteoporosis, weight gain, hyperglycemia, hypertension, cataracts, adrenal suppression. Use lowest dose for shortest duration. Taper to avoid withdrawal.

### Thyroid Drugs
Hypothyroidism: levothyroxine (T4). Converted to T3 peripherally. Start 1.6 mcg/kg. Monitor TSH every 6-8 weeks. Hyperthyroidism: thionamides — methimazole (preferred) or PTU (first trimester). Beta-blockers for symptoms. Radioiodine or surgery.

### Sex Hormones
Oestrogen ± progestogen: HRT, contraception. GnRH agonists (leuprolide, goserelin): prostate/breast cancer, endometriosis. SERMs (tamoxifen, raloxifene): breast cancer, osteoporosis. 5α-reductase inhibitors (finasteride): BPH, male pattern baldness.

### Bisphosphonates
Alendronate, risedronate, zoledronic acid: inhibit osteoclasts. Uses: osteoporosis, Paget's. Administer: empty stomach, upright, with plain water, wait 30-60 min before food. AE: oesophagitis, ONJ (rare), atypical fractures.`,
    keyPoints: [
      'Metformin first-line for T2DM — monitor renal function',
      'Insulin: basal (long-acting) + bolus (rapid-acting)',
      'Corticosteroids: lowest effective dose, shortest duration, taper',
      'Levothyroxine: start 1.6 mcg/kg, TSH-guided',
      'Bisphosphonates: empty stomach, upright, wait 30-60 min',
    ],
    drugClasses: ['Insulins', 'Biguanides', 'SGLT2 Inhibitors', 'GLP-1 Agonists', 'Corticosteroids', 'Thyroid Drugs', 'Bisphosphonates'],
  },

  'pharm-vit': {
    summary: `## Vitamins & Minerals

### Fat-Soluble Vitamins (A, D, E, K)
- **Vitamin A** (retinol): vision, immune function. Deficiency: night blindness, xerophthalmia. Toxicity: hepatotoxicity, teratogenicity
- **Vitamin D** (cholecalciferol): Ca²⁺ homeostasis, bone health. Deficiency: rickets (children), osteomalacia (adults). Supplement: 400-800 IU/day, more if deficient
- **Vitamin E** (tocopherol): antioxidant. Deficiency: haemolysis, neuropathy (rare)
- **Vitamin K** (phylloquinone, menaquinone): coagulation factors II, VII, IX, X. Deficiency: bleeding. Antagonist: warfarin. Reversal: vitamin K or FFP/PCC

### Water-Soluble Vitamins (B-complex, C)
- **B₁ (thiamine)**: TPP cofactor. Deficiency: beriberi (wet = HF, dry = neuropathy), Wernicke-Korsakoff (alcoholism)
- **B₃ (niacin)**: NAD/NADP. Deficiency: pellagra (dermatitis, diarrhoea, dementia). Flushing side effect (prostaglandin-mediated)
- **B₆ (pyridoxine)**: PLP. Cofactor in transamination. Deficiency: neuropathy, sideroblastic anaemia. Used for INH-induced neuropathy
- **B₉ (folate)**: one-carbon metabolism. Deficiency: megaloblastic anaemia, neural tube defects. Periconceptional: 400 mcg/day to prevent NTDs
- **B₁₂ (cobalamin)**: methylation, myelination. Deficiency: pernicious anaemia, subacute combined degeneration. IM cyanocobalamin or high-dose oral
- **Vitamin C (ascorbic acid)**: collagen synthesis, antioxidant. Deficiency: scurvy (gingival hyperplasia, ecchymoses, poor wound healing)

### Minerals
- **Iron**: haemoglobin synthesis. Deficiency: microcytic hypochromic anaemia. Oral ferrous sulfate. IV iron for CKD/IBD
- **Calcium**: bone, muscle contraction, nerve transmission. Supplements: Ca carbonate (with food) or Ca citrate (anytime)
- **Magnesium**: enzyme cofactor. Deficiency: tetany, arrhythmias (torsades de pointes). MgSO₄ for pre-eclampsia, asthma
- **Zinc**: immune function, wound healing. Deficiency: growth retardation, diarrhoea
- **Iodine**: thyroid hormone synthesis. Deficiency: goitre, hypothyroidism, cretinism (in pregnancy)

### Vitamin-Drug Interactions
- Warfarin + vitamin K (↓ INR). Warfarin + vitamin E (↑ INR)
- INH + B₆ (→ peripheral neuropathy, supplement B₆)
- MTX + folate (↓ MTX toxicity)
- PPI long-term → B₁₂ malabsorption
- Metformin long-term → B₁₂ malabsorption`,
    keyPoints: [
      'Vitamin D: bone health, 400-800 IU daily',
      'B₁₂ deficiency: pernicious anaemia, subacute combined degeneration',
      'Folate: 400 mcg/day pre-conception to prevent NTDs',
      'Iron deficiency: microcytic hypochromic, give ferrous sulfate',
      'Warfarin reversal: vitamin K or FFP/PCC',
    ],
    drugClasses: ['Fat-Soluble Vitamins', 'B-Complex', 'Vitamin C', 'Iron Preparations', 'Calcium', 'Magnesium'],
  },

  'pharm-cns': {
    summary: `## CNS Pharmacology

### Sedative-Hypnotics
Benzodiazepines (diazepam, lorazepam, midazolam, temazepam): potentiate GABA-A → ↑ Cl⁻ influx → CNS depression. Uses: anxiety (short-term), insomnia, seizures, muscle spasm, alcohol withdrawal, procedural sedation. Z-drugs (zolpidem, zopiclone): similar to BZDs — hypnosis. Barbiturates (phenobarbital): GABA-A, but lower TI, more dependence — rarely used now. Tolerance + dependence with all.

### Antiepileptic Drugs (AEDs)
MOA: Na⁺ channel block (phenytoin, carbamazepine, lamotrigine), GABA potentiation (benzodiazepines, valproate, gabapentin), Ca²⁺ channel block (ethosuximide), SV2A modulation (levetiracetam). First-line: lamotrigine or levetiracetam (focal), valproate or lamotrigine (generalised). Valproate: avoid in women of childbearing age (teratogenic). Folic acid supplement for all women on AEDs.

### Antidepressants
- **SSRIs** (fluoxetine, sertraline, citalopram, escitalopram): block 5-HT reuptake. First-line. AE: GI upset, sexual dysfunction, insomnia. Serotonin syndrome (rare)
- **SNRIs** (venlafaxine, duloxetine): block 5-HT + NA reuptake. AE: HTN (venlafaxine), sweating
- **TCAs** (amitriptyline, nortriptyline): block 5-HT + NA + histamine + ACh. AE: sedation, dry mouth, constipation, arrhythmias (overdose)
- **MAOIs** (phenelzine, tranylcypromine): avoid tyramine (hypertensive crisis). Last-line
- **Atypicals** (mirtazapine, bupropion, agomelatine): unique mechanisms

### Antipsychotics
First-generation (haloperidol, chlorpromazine): D₂ antagonist. EPS (dystonia, parkinsonism, akathisia, tardive dyskinesia). Second-generation (risperidone, olanzapine, quetiapine, aripiprazole, clozapine): D₂ + 5-HT₂A antagonist. Less EPS, but metabolic syndrome (weight, lipids, glucose). Clozapine: for refractory — monitor WBC (agranulocytosis risk).

### Mood Stabilisers
Lithium: first-line for bipolar. Narrow TI (0.6-1.2 mmol/L). Monitor renal + thyroid function. Valproate, lamotrigine, carbamazepine: alternatives.

### Opioid Analgesics
Mild-moderate: codeine, tramadol, dihydrocodeine. Moderate-severe: morphine, hydromorphone, oxycodone, fentanyl. μ-receptor agonists. AE: respiratory depression, constipation, dependence, tolerance. Naloxone: reversal agent. Pathophysiology of pain: nociceptive, neuropathic, visceral.

### Drugs for Neurodegeneration
Parkinson's: levodopa/carbidopa (most effective), MAO-B inhibitors (rasagiline, selegiline), dopamine agonists (pramipexole, ropinirole), COMT inhibitors (entacapone). Alzheimer's: cholinesterase inhibitors (donepezil, rivastigmine), NMDA antagonist (memantine).`,
    keyPoints: [
      'BZDs: GABA-A potentiation, tolerance + dependence risk',
      'AED: drug choice by seizure type — valproate caution in women',
      'SSRI first-line for depression, 4-6 weeks for effect',
      'Li 0.6-1.2 mmol/L, monitor renal + thyroid',
      'Second-gen antipsychotics: less EPS, but metabolic syndrome',
    ],
    drugClasses: ['Benzodiazepines', 'AEDs', 'Antidepressants', 'Antipsychotics', 'Mood Stabilisers', 'Opioids', 'Antiparkinson Agents'],
  },

  'pharm-chemo': {
    summary: `## Chemotherapy (Principles)

### Cell Cycle
Cell cycle phases: G₀ (resting), G₁ (growth), S (DNA synthesis), G₂ (pre-mitosis), M (mitosis). Cell-cycle specific drugs: act during specific phases (antimetabolites S-phase, vinca alkaloids M-phase). Cell-cycle non-specific: act regardless of phase (alkylating agents).

### Major Drug Classes
- **Alkylating agents** (cyclophosphamide, cisplatin, busulfan): crosslink DNA. AE: myelosuppression, N&V, haemorrhagic cystitis (cyclophosphamide → mesna protection)
- **Antimetabolites** (methotrexate, 5-fluorouracil, cytarabine, gemcitabine): inhibit DNA/RNA synthesis. MTX: folic acid analogue, pulmonary and hepatic toxicity
- **Antitumour antibiotics** (doxorubicin, daunorubicin, bleomycin): intercalate DNA. Anthracyclines: cardiotoxicity (cumulative), bleomycin: pulmonary fibrosis
- **Vinca alkaloids** (vincristine, vinblastine): inhibit microtubule formation. Vincristine: peripheral neuropathy. Taxanes (paclitaxel, docetaxel): stabilise microtubules. Hypersensitivity reactions
- **Topoisomerase inhibitors** (etoposide: topo II, irinotecan/topotecan: topo I)
- **Platinum agents** (cisplatin, carboplatin, oxaliplatin): crosslink DNA. Cisplatin: nephrotoxicity, ototoxicity

### Adverse Effects & Management
- **Myelosuppression**: WBC (infection risk), platelets (bleeding), RBC (anaemia). Nadir ~7-14 days. G-CSF for febrile neutropenia
- **Nausea & vomiting**: acute (5-HT₃ antagonist), delayed (NK₁ antagonist). Dexamethasone + арrepitant
- **Mucositis**: oral care, topical treatments
- **Alopecia**: temporary, scalp cooling
- **Extravasation**: STOP infusion, aspirate, cold compresses (vinca: heat), antidotes (DMSO, hyaluronidase)

### Combination Chemotherapy
Rationale: target different cell cycle phases, overcome resistance, use synergistic drugs, minimise overlapping toxicities. Examples: CHOP (DLBCL), ABVD (Hodgkin), FOLFOX/FOLFIRI (CRC).

### Drug Resistance
Mechanisms: drug efflux (P-glycoprotein/MDR1), target mutation, DNA repair activation, drug inactivation, altered apoptosis. Strategies: combination therapy, dose intensification, targeted therapy.`,
    keyPoints: [
      'Cell cycle: S-phase (antimetabolites), M-phase (vincas)',
      'Alkylating agents: crosslink DNA, myelosuppression',
      'Anthracyclines: cumulative cardiotoxicity, limit dose',
      'Myelosuppression nadir 7-14 days, G-CSF if febrile neutropenia',
      'Combination therapy: different phases, less resistance',
    ],
    drugClasses: ['Alkylating Agents', 'Antimetabolites', 'Antitumour Antibiotics', 'Vinca Alkaloids', 'Taxanes', 'Platinum Agents', 'Topoisomerase Inhibitors'],
  },

  'pharm-anti': {
    summary: `## Antimicrobial Pharmacology

### Beta-Lactams
Penicillins, cephalosporins, carbapenems, monobactams. MOA: inhibit PBPs → cell wall lysis. AE: allergy (10% cross), C. diff. Resistance: β-lactamases (ESBL, KPC, NDM).

### Macrolides
Azithromycin, clarithromycin, erythromycin. MOA: 50S inhibition. Uses: CAP, atypical, MAC. AE: QT prolongation, GI, CYP3A4 inhibition.

### Fluoroquinolones
Ciprofloxacin, levofloxacin, moxifloxacin. MOA: DNA gyrase/topo IV. AE: tendon rupture (black box), QT, C. diff, CNS. Avoid in children.

### Aminoglycosides
Gentamicin, amikacin. MOA: 30S inhibition. AE: nephrotoxicity, ototoxicity. TDM required.

### Tetracyclines
Doxycycline: acne, CAP, malaria prophylaxis. AE: photosensitivity, tooth discolouration.

### Others
Metronidazole (anaerobes), clindamycin (skin, bone), linezolid (VRE/MRSA), daptomycin (MRSA/VRE, not for pneumonia).`,
    keyPoints: [
      'Beta-lactams: cell wall synthesis inhibition',
      'Fluoroquinolones: tendon rupture risk in all ages',
      'Aminoglycosides: TDM for nephro/ototoxicity',
      'MRSA: vancomycin/daptomycin/linezolid',
    ],
    drugClasses: ['Penicillins', 'Cephalosporins', 'Carbapenems', 'Macrolides', 'Fluoroquinolones', 'Aminoglycosides'],
  },

  'pharm-tox': {
    summary: `## Toxicology

### Principles of Poisoning
ABCDE approach. Decontamination: activated charcoal (1 g/kg, within 1h of ingestion, only if airway protected). Gastric lavage: rarely indicated. Enhanced elimination: multi-dose charcoal, urine alkalinisation, haemodialysis.

### Acetaminophen (Paracetamol) Poisoning
Most common overdose. Toxic dose: > 150 mg/kg (adults), > 200 mg/kg (children). Phase 1 (0-24h): asymptomatic/N&V. Phase 2 (24-72h): RUQ pain, ↑ LFTs. Phase 3 (72-96h): hepatic necrosis, coagulopathy, encephalopathy. Rumack-Matthew nomogram guides NAC therapy. NAC most effective within 8h.

### Opioid Overdose
Triad: CNS depression, respiratory depression, miosis. Naloxone: 0.4-2 mg IV/IM, repeat q2-3min. Higher doses for synthetic opioids (fentanyl 1-2 mg, tramadol). Naloxone infusion for long-acting opioids.

### Organophosphate Poisoning
SLUDGE: Salivation, Lacrimation, Urination, Defecation, GI upset, Emesis. Atropine: 2 mg IV q5min until drying of secretions. Pralidoxime: regenerates AChE (most effective within 24h). Midazolam for seizures.

### Alcohol Poisoning
Ethanol intoxication: supportive care, thiamine (to prevent Wernicke), monitor glucose. Methanol/Ethylene glycol: metabolic acidosis with increased anion gap + osmolal gap. Fomepizole (preferred) or ethanol + haemodialysis.

### Iron Poisoning
Severe: vomiting, metabolic acidosis, coagulopathy, hepatotoxicity. Stages: GI (0-6h), latent (6-24h), shock (24-48h), hepatic (48-72h), stricture (2-4 weeks). Deferoxamine chelation.

### Carbon Monoxide
Headache, nausea, confusion, cherry-red skin (rare). Pulse oximetry falsely normal (HbCO not differentiated). 100% O₂, hyperbaric O₂ for severe (loss of consciousness, neurological symptoms, pregnant, HbCO > 25%).

### Salicylate Poisoning
Tinnitus, hyperventilation (respiratory alkalosis), metabolic acidosis. Urine alkalinisation (target pH 7.5-8). Haemodialysis for severe.`,
    keyPoints: [
      'NAC for paracetamol OD — most effective within 8h',
      'Naloxone for opioid OD — may need high doses for fentanyl',
      'Atropine + pralidoxime for organophosphates',
      'Fomepizole for methanol/ethylene glycol',
      '100% O₂ for CO poisoning, hyperbaric for severe',
    ],
    drugClasses: ['Antidotes', 'Naloxone', 'NAC', 'Atropine', 'Pralidoxime', 'Fomepizole', 'Deferoxamine'],
  },

  'pharm-onc': {
    summary: `## Oncology Pharmacology

### Alkylating Agents
Cyclophosphamide, ifosfamide, cisplatin, carboplatin, busulfan. Crosslink DNA → cell death. AE: myelosuppression, N&V, alopecia. Cyclophosphamide: haemorrhagic cystitis (prevent with mesna + hydration). Cisplatin: nephrotoxicity (pre-hydrate), ototoxicity.

### Antimetabolites
Methotrexate (DHFR inhibitor): folic acid analogue. Uses: leukaemia, RA, ectopic pregnancy. Leucovorin rescue. 5-FU (TS inhibitor): colorectal. Capecitabine: oral prodrug of 5-FU. AE: hand-foot syndrome. Cytarabine (ARA-C): AML — cerebellar toxicity. Gemcitabine: pancreatic, lung.

### Cytotoxic Antibiotics
Anthracyclines (doxorubicin, daunorubicin, epirubicin, idarubicin): topo II inhibitor + free radical. Cumulative cardiotoxicity (limit 450-550 mg/m²). Dexrazoxane for cardioprotection. Bleomycin: pulmonary fibrosis (limit 400 U). Mitomycin: HUS.

### Microtubule Inhibitors
Vinca alkaloids (vincristine, vinblastine): M-phase, neurotoxicity (vincristine: peripheral neuropathy, constipation). Taxanes (paclitaxel, docetaxel): stabilise microtubules, hypersensitivity (pre-medicate), peripheral neuropathy.

### Topoisomerase Inhibitors
Etoposide (topo II): SCLC, testicular — myelosuppression. Irinotecan (topo I): CRC — diarrhoea (late-onset). Topotecan: ovarian, SCLC.

### Hormonal Therapy
Tamoxifen (SERM): breast cancer — hot flashes, DVT risk, endometrial cancer risk. Aromatase inhibitors (letrozole, anastrozole, exemestane): postmenopausal breast Ca. GnRH agonists (leuprolide, goserelin): prostate Ca — initial flare. Antiandrogens (bicalutamide, enzalutamide): prostate Ca.

### Targeted Therapy
TKIs: imatinib (CML, GIST), erlotinib/gefitinib (EGFR-mutant NSCLC), sorafenib/sunitinib (RCC, HCC). Monoclonal antibodies: trastuzumab (HER2+ breast — cardiotoxicity), rituximab (CD20+ lymphomas), bevacizumab (VEGF — HTN, bleeding). Checkpoint inhibitors (PD-1/PD-L1): pembrolizumab, nivolumab — immune-related AEs.`,
    keyPoints: [
      'Alkylating agents: crosslink DNA, myelosuppression',
      'Anthracyclines: cardiotoxicity limit 450-550 mg/m²',
      'Antimetabolites: S-phase specific, MTX uses leucovorin rescue',
      'Taxanes: hypersensitivity (pre-medicate with steroids + antihistamines)',
      'Targeted therapy: TKIs (imatinib, erlotinib), checkpoints (pembrolizumab)',
    ],
    drugClasses: ['Alkylating Agents', 'Antimetabolites', 'Anthracyclines', 'Vinca Alkaloids', 'Taxanes', 'Hormone Therapy', 'TKIs', 'Monoclonal Antibodies'],
  },

  'pharm-derm': {
    summary: `## Dermatological Pharmacology

### Topical Corticosteroids
Potency classes: I (superpotent: clobetasol propionate 0.05%) → VII (mildest: hydrocortisone 1%). Use shortest course, lowest effective potency. AE: skin atrophy (long-term), striae, rosacea, perioral dermatitis. Face, flexures, genitals: low potency only. Occlusion increases potency.

### Topical Retinoids
Tretinoin, adapalene, tazarotene: regulate cell turnover, comedolytic. Uses: acne, photoaging. AE: irritation, photosensitivity (use at night, sunscreen). Contraindicated in pregnancy (isotretinoin teratogenic).

### Topical Antibacterials
Mupirocin: impetigo, S. aureus (incl. MRSA). Fusidic acid: staph infections. Clindamycin ± BPO: acne. Metronidazole: rosacea. Retapamulin: impetigo.

### Topical Antifungals
Azoles (clotrimazole, miconazole, ketoconazole): dermatophytes + candida. Terbinafine: dermatophytes (tinea). Nystatin: candida only (not for dermatophytes). Selenium sulphide, ketoconazole shampoo: seborrhoeic dermatitis.

### Topical Immunomodulators
Tacrolimus, pimecrolimus (calcineurin inhibitors): atopic dermatitis — steroid-sparing. No skin atrophy. Black box: theoretical lymphoma risk (rare).

### Phototherapy
UVB (narrowband 311 nm): psoriasis, vitiligo, atopic dermatitis. PUVA (psoralen + UVA): psoriasis, CTCL. AE: burning, photoaging, skin cancer risk.

### Systemic Drugs for Dermatology
Isotretinoin: severe acne — teratogenic (iPLEDGE), dry skin/mucous membranes, ↑ triglycerides, mood changes. Methotrexate: psoriasis — myelosuppression, hepatotoxicity (folic acid supplement). Ciclosporin: severe eczema/psoriasis — nephrotoxicity, HTN. Acitretin: severe psoriasis — teratogenic. Dapsone: dermatitis herpetiformis, leprosy — haemolysis (check G6PD). Thalidomide: erythema nodosum leprosum, myeloma — teratogenic, neuropathy.`,
    keyPoints: [
      'Topical steroids: lowest potency for face/flexures, shortest course',
      'Retinoids: photosensitizing, use at night with sunscreen',
      'Terbinafine: best for dermatophyte infections (tinea)',
      'Isotretinoin: teratogenic, monitor LFTs/lipids/mood',
      'Tacrolimus/pimecrolimus: steroid-sparing for atopic dermatitis',
    ],
    drugClasses: ['Topical Corticosteroids', 'Retinoids', 'Topical Antibiotics', 'Antifungals', 'Calcineurin Inhibitors', 'Phototherapy'],
  },

  'pharm-ophth': {
    summary: `## Ophthalmic Pharmacology

### Glaucoma Drugs
Prostaglandin analogues (latanoprost, travoprost, bimatoprost): ↑ uveoscleral outflow, once daily at night. Beta-blockers (timolol): ↓ aqueous production, twice daily. Alpha-agonists (brimonidine): ↓ production + ↑ outflow. CAIs (dorzolamide, brinzolamide): ↓ aqueous production. Miotics (pilocarpine): ↑ outflow via ciliary muscle contraction.

### Anti-Infectives
Topical antibacterials: chloramphenicol (broad-spectrum), tobramycin (Gram -), ciprofloxacin/moxifloxacin (corneal ulcers), fusidic acid (staph). Topical antivirals: aciclovir, ganciclovir (herpes keratitis). Topical antifungals: natamycin, amphotericin B.

### Anti-Inflammatory Drugs
Corticosteroids (prednisolone acetate, dexamethasone): potent — use for uveitis, post-op, allergic conjunctivitis. AE: cataracts, glaucoma, infections. NSAIDs (ketorolac, diclofenac, nepafenac): milder, for allergic conjunctivitis, CME.

### Mydriatics and Cycloplegics
Phenylephrine (α₁ agonist): mydriasis only. Tropicamide: short-acting mydriasis + cycloplegia. Atropine, homatropine, cyclopentolate: longer-acting. Used for eye exams and uveitis.

### Dry Eye Treatments
Artificial tears: carboxymethylcellulose, hyaluronic acid, polyvinyl alcohol. Cyclosporine (Restasis): immunomodulator for moderate-severe dry eye. Lifitegrast (Xiidra): LFA-1 antagonist. Punctal plugs: physical occlusion.

### Ocular Side Effects
Corticosteroids: cataracts (posterior subcapsular), glaucoma. Ethambutol: optic neuritis (dose-dependent, colour vision loss). Hydroxychloroquine: retinal toxicity (>5 years, >5 mg/kg/day). Amiodarone: corneal deposits (verticillata). Topiramate: acute angle closure glaucoma. Sildenafil/tadalafil: blue-tinged vision.`,
    keyPoints: [
      'Prostaglandins first-line for glaucoma, nightly dosing',
      'Topical steroids: uveitis, post-op — watch for cataracts, glaucoma',
      'Chloramphenicol: broad-spectrum topical antibiotic',
      'Hydroxychloroquine retinal screening: after 5 years of use',
      'Corneal ulcers: topical fluoroquinolones are first-line',
    ],
    drugClasses: ['Prostaglandin Analogues', 'Beta-Blockers', 'CAIs', 'Topical Antibiotics', 'Corticosteroids', 'Artificial Tears'],
  },

  'pharm-vet': {
    summary: `## Veterinary Pharmacology

### Comparative Pharmacokinetics
Significant species differences in ADME. Cats: deficient glucuronidation (avoid paracetamol, aspirin). Dogs: can metabolize some drugs differently. Horses: large Vd, sensitive to NSAIDs (GI ulceration). Cattle: ruminant stomach affects oral absorption. Birds: high metabolic rate, rapid elimination.

### Antimicrobial Use in Animals
Avoid antibiotics used in human medicine as first-line in food animals (WHO guidelines). Withdrawal periods for food animals. Common indications: respiratory infections (pneumonia in cattle, cats), UTI (dogs), dermatitis, otitis externa.

### Anaesthesia and Sedation
Dissociative: ketamine (cats, horses — often with benzodiazepines). Alpha-2 agonists (xylazine, medetomidine): sedation, analgesia — reversed by atipamezole. Opioids: butorphanol, buprenorphine, morphine. Propofol: induction/maintenance.

### Pain Management
NSAIDs: carprofen (dogs), meloxicam (dogs, cats), flunixin (horses). Avoid in dehydrated/renal patients. Opioids: buprenorphine (cats — buccal), tramadol (dogs — questionable efficacy). Gabapentin: neuropathic pain (dogs, cats).

### Parasiticides
Endectocides (ivermectin, moxidectin, selamectin): nematodes + arthropods. Praziquantel: cestodes. Fenbendazole: roundworms, whipworms. Fipronil: fleas/ticks (topical). Heartworm prevention: macrocyclic lactones monthly.

### Euthanasia Agents
Pentobarbital (barbiturate): overdose → respiratory arrest. T-61 (combination). Potassium chloride (under anaesthesia).

### Drug Withdrawal Times
Food animals: milk and meat withdrawal periods must be observed. Extra-label drug use (ELDU) permitted under veterinary supervision with extended withdrawal.`,
    keyPoints: [
      'Species differences: cats lack glucuronidation (no paracetamol)',
      'Withdrawal periods for food animals — NEVER skip',
      'Avoid human-critical antibiotics as first-line in food animals',
      'Ketamine: dissociative anaesthetic for cats/horses',
      'Heartworm prevention: monthly macrocyclic lactones',
    ],
    drugClasses: ['Antibiotics', 'NSAIDs', 'Opioids', 'Parasiticides', 'Anaesthetics', 'Euthanasia Agents'],
  },

  // ================================================================
  // SUPPORTING SCIENCES (13 units)
  // ================================================================

  'sup-anat': {
    summary: `## Anatomy

### Cardiovascular
Heart: 4 chambers. RA → RV (pulmonary) → LA → LV (systemic). Coronary arteries: L main → LAD + circumflex. RCA → RV, SA/AV node. Conduction: SA node → AV node → His → bundle branches → Purkinje.

### Respiratory
Upper: nose → pharynx → larynx. Lower: trachea → bronchi → bronchioles → alveoli. Right lung: 3 lobes. Left: 2 lobes + cardiac notch.

### GI
Foregut (celiac): stomach, duodenum (proximal), liver, pancreas. Midgut (SMA): small intestine to proximal colon. Hindgut (IMA): distal colon, rectum.

### Renal
Kidneys retroperitoneal. Hilum: renal artery, vein, ureter. Nephron: cortex (glomerulus, PCT, DCT) + medulla (loop, collecting duct).

### Neuroanatomy
Brain lobes: frontal (motor, executive), parietal (sensory), temporal (memory), occipital (vision). Circle of Willis: ACA, MCA, PCA. CN I-XII: functions.`,
    keyPoints: [
      'Heart: RA→RV→LA→LV. RCA supplies SA/AV node in most people',
      'R lung 3 lobes, L lung 2 lobes',
      'Foregut (celiac), midgut (SMA), hindgut (IMA)',
      'Circle of Willis provides collateral circulation',
    ],
  },

  'sup-phys': {
    summary: `## Physiology

### Cardiovascular
CO = HR × SV. Preload, contractility, afterload. Baroreceptor reflex: ↓BP → ↑SNS. Frank-Starling: ↑preload → ↑contractility.

### Respiratory
Ventilation + perfusion = gas exchange. V/Q mismatch → hypoxemia. O₂-Hb curve: right shift = O₂ offloaded.

### Renal
Nephron: glomerulus → PCT → loop → DCT → collecting duct. GFR ~120 mL/min. RAAS: ↓BP → renin → Ang II → aldosterone.

### Endocrine
HPA: CRH → ACTH → cortisol. HPT: TRH → TSH → T4/T3. Insulin: ↓glucose. Glucagon: ↑glucose.`,
    keyPoints: [
      'CO = HR × SV, affected by preload + contractility + afterload',
      'V/Q mismatch = most common hypoxemia cause',
      'GFR ~120 mL/min, RAAS regulates BP',
      'Right shift = Bohr effect = more O₂ to tissues',
    ],
  },

  'sup-biochem': {
    summary: `## Biochemistry

### Glycolysis
Glucose → 2 pyruvate, net 2 ATP + 2 NADH. PFK-1 rate-limiting (AMP activates, ATP inhibits).

### TCA Cycle
Acetyl-CoA → CO₂ + 3 NADH + FADH₂ + GTP. Links to ETC for most ATP.

### Gluconeogenesis
Pyruvate → glucose (liver). Substrates: lactate, amino acids, glycerol.

### Lipid Metabolism
Beta-oxidation: fatty acids → acetyl-CoA. Carnitine shuttle required. Ketogenesis: excess acetyl-CoA → ketones.

### Urea Cycle
NH₃ → urea (liver). Defects → hyperammonemia.

### Key Enzymes
HMG-CoA reductase: cholesterol synthesis (statins target). Pyruvate dehydrogenase: links glycolysis to TCA.`,
    keyPoints: [
      'Glycolysis: 2 ATP, TCA: 30-32 ATP total per glucose',
      'PFK-1 rate-limiting (AMP ↑, ATP ↓)',
      'Statins target HMG-CoA reductase',
      'Beta-oxidation: carnitine shuttle required',
    ],
  },

  'sup-path': {
    summary: `## Pathology

### Cell Injury
Reversible: swelling, fatty change. Irreversible → necrosis: coagulative (MI), liquefactive (brain), caseous (TB), fat (pancreatitis). Apoptosis: programmed (intrinsic + extrinsic pathways).

### Inflammation
Acute: neutrophils + vasodilation. Roman: rubor, tumor, calor, dolor, functio laesa. Chronic: macrophages, lymphocytes, granulomas.

### Hemodynamics
Edema: ↑hydrostatic (HF) or ↓oncotic (cirrhosis). Virchow: injury + stasis + hypercoagulability. Embolism: PE, fat, air, amniotic.

### Neoplasia
Benign: well-differentiated, encapsulated. Malignant: invasive, metastatic. Carcinoma (epithelial), sarcoma (mesenchymal). p53 most common mutation.

### Genetic
Down: trisomy 21. CF: CFTR mutation. Mendelian: AD, AR, X-linked.`,
    keyPoints: [
      'Necrosis types: coagulative, liquefactive, caseous, fat',
      'Acute: neutrophils. Chronic: macrophages',
      'Virchow: injury + stasis + hypercoagulability',
      'p53: guardian of the genome, most common cancer mutation',
    ],
  },

  'sup-micro': {
    summary: `## Microbiology

### Gram-Positive
Staph aureus (coagulase+): MRSA → vancomycin. Strep pyogenes (GAS): penicillin. Strep pneumoniae: PCV vaccine. Enterococcus: VRE → linezolid.

### Gram-Negative
E. coli: UTI, ESBL → carbapenems. Klebsiella: pneumonia. Pseudomonas: nosocomial. Salmonella typhi: typhoid.

### AFB
TB: RIPE regimen. M. leprae: dapsone + rifampin + clofazimine.

### Viruses
HIV: ART (INSTI + NRTIs). HBV: vaccine, entecavir. HCV: curable with DAAs. Influenza: oseltamivir.

### Fungi & Parasites
Candida: fluconazole. Aspergillus: voriconazole. Malaria: ACT. Helminths: albendazole.`,
    keyPoints: [
      'MRSA: vancomycin. VRE: linezolid/daptomycin',
      'ESBL: carbapenems. CRE: ceftazidime-avibactam',
      'TB: RIPE 2 mo + RI 4 mo',
      'HIV: INSTI + 2 NRTIs',
      'HCV: curable with DAAs',
    ],
  },

  'sup-immuno': {
    summary: `## Immunology

### Innate vs Adaptive
Innate: immediate, barriers, complement, phagocytes, NK. Adaptive: specific, memory, T + B cells.

### Hypersensitivity
Type I (IgE): anaphylaxis. Type II (IgG): haemolytic anaemia. Type III (immune complex): SLE. Type IV (T cell): PPD, contact dermatitis.

### Immunodeficiency
Primary: SCID, CVID. Secondary: HIV/AIDS. AIDS: CD4 < 200.

### Autoimmunity
SLE: ANA + anti-dsDNA. RA: RF + anti-CCP. T1DM: autoimmune β-cell destruction.

### Vaccines
Live: MMR, varicella, yellow fever, BCG — contraindicated in pregnancy/immunocompromised. Inactivated: IPV, hep A. mRNA: COVID-19.`,
    keyPoints: [
      'Type I: IgE/mast cell. Type IV: T cell-mediated',
      'SLE: ANA screen, anti-dsDNA specific',
      'RA: symmetric polyarthritis, RF + anti-CCP, MTX first-line',
      'HIV: CD4 < 200 = AIDS',
      'Live vaccines contraindicated in pregnancy + immunocompromised',
    ],
  },

  'sup-medchem': {
    summary: `## Medicinal Chemistry

### Drug Design Principles
Structure-Activity Relationship (SAR): correlation between chemical structure and biological activity. Key molecular properties: lipophilicity (logP), pKa (ionization), molecular weight, hydrogen bond donors/acceptors. Lipinski's Rule of 5 for oral bioavailability: MW < 500, logP < 5, HBD ≤ 5, HBA ≤ 10.

### Drug Targets
Enzymes: active site (competitive, non-competitive, allosteric inhibition). Receptors: key pharmacophoric features (H-bond, ionic, hydrophobic, van der Waals). DNA intercalation. Transport proteins.

### Functional Groups in Drug Molecules
- **Carboxylic acids**: ionizable, improve water solubility (NSAIDs, ACEi)
- **Amines**: basic, enable salt formation (most drugs)
- **Esters**: prodrugs (enalapril → enalaprilat), hydrolysis in vivo
- **Amides**: more stable than esters (paracetamol, lidocaine)
- **Alcohols, phenols**: H-bond donors, conjugation sites
- **Halogens**: increase lipophilicity, metabolic stability (fluoroquinolones)
- **Aromatic rings**: π-stacking, hydrophobic interactions

### Isomerism in Drugs
Geometric (cis/trans): different activity (tamoxifen). Optical (R/S enantiomers): one enantiomer often more active (S-ibuprofen, R-albuterol, R-omeprazole — esomeprazole). Chiral switching: single enantiomer to improve safety/efficacy.

### Prodrug Design
Inactive compound activated in vivo. Improves absorption (oseltamivir, enalapril, valacyclovir, prednisone, codeine), reduces toxicity (sulindac), targets specific tissues (levodopa → dopamine in brain).

### Drug Metabolism Considerations
Phase I: oxidation (CYP450), reduction, hydrolysis — introduces/uncovers functional groups. Phase II: conjugation (glucuronidation, sulfation, acetylation, methylation, glutathione) — increases water solubility for excretion.

### Key Drug Classes SAR
Beta-lactams: β-lactam ring essential, side chain determines spectrum. SSRIs: basic amine + aromatic ring + halogenated phenyl. ACEi: proline analogue + zinc-binding group (SH or carboxyl).`,
    keyPoints: [
      'SAR: structure determines biological activity',
      'Lipinski Ro5: MW<500, logP<5, HBD≤5, HBA≤10',
      'Prodrugs: enalapril→enalaprilat, valacyclovir→acyclovir',
      'Chiral switching: single enantiomer for better profile',
      'CYP450: Phase I metabolism, glucuronidation: Phase II',
    ],
  },

  'sup-pharmchem': {
    summary: `## Pharmaceutical Chemistry

### Physicochemical Properties of Drugs
Solubility: aqueous (for formulation, absorption) and lipid (for membrane permeability). pKa and ionization: Henderson-Hasselbalch determines fraction ionized — affects absorption, distribution, excretion. Partition coefficient (logP): measure of lipophilicity, optimal for oral drugs ~2-3.

### Drug Stability
Chemical degradation: hydrolysis (esters, amides — most common), oxidation (phenols, thiols), photolysis, racemization. Factors: temperature, pH, light, oxygen, moisture. Arrhenius equation: reaction rate doubles per 10°C. Shelf life: time for 10% degradation (t₉₀).

### Formulation Science
Excipients: binders, fillers, disintegrants, lubricants, coatings, preservatives, antioxidants, chelating agents. Solid dosage forms: tablets (compression, coating), capsules (hard/soft). Liquid: solutions, suspensions, emulsions. Semi-solid: creams, ointments, gels.

### Analytical Methods
- **UV-Vis spectrophotometry**: quantitative analysis, Beer-Lambert law A = εbc
- **HPLC**: separation + quantification of drug and impurities. Reverse-phase (C18) most common
- **TLC**: rapid qualitative identification
- **Mass spectrometry**: molecular weight, structural identification
- **NMR**: structural elucidation (¹H, ¹³C)
- **IR spectroscopy**: functional group identification
- **Melting point**: purity indicator

### Quality Control
Tests: appearance, identity, assay, content uniformity, dissolution, disintegration, hardness, friability, pH, sterility, endotoxins, microbial limits. ICH guidelines: Q1 (stability), Q2 (validation), Q3 (impurities), Q6 (specifications).

### Impurities
Organic impurities: starting materials, intermediates, by-products, degradation products. Inorganic: reagents, catalysts, heavy metals. Residual solvents. Genotoxic impurities: control at ppm levels (TTC concept).`,
    keyPoints: [
      'Henderson-Hasselbalch: ionization depends on pKa and pH',
      'Stability: hydrolysis most common degradation, Arrhenius predicts shelf life',
      'HPLC: primary analytical tool for QC (reverse-phase C18)',
      'Excipients: essential for formulation, not pharmacologically inert',
      'ICH guidelines govern pharmaceutical quality worldwide',
    ],
  },

  'sup-orgchem': {
    summary: `## Organic Chemistry

### Functional Groups
- **Alkanes**: single bonds, sp³, non-polar
- **Alkenes**: double bond, sp², electrophilic addition
- **Alkynes**: triple bond, sp, acidic terminal H
- **Arenes**: aromatic, resonance stabilized, electrophilic substitution
- **Alcohols**: -OH, H-bond donor/acceptor, oxidation to carbonyls
- **Ethers**: R-O-R, good solvents
- **Aldehydes/Ketones**: carbonyl (C=O), nucleophilic addition
- **Carboxylic acids**: -COOH, acidic (pKa ~5), form amides/esters
- **Esters**: R-COOR', hydrolyzed to acid + alcohol
- **Amides**: R-CONR'₂, stable, peptide bonds
- **Amines**: basic, nucleophilic, H-bond donor
- **Nitriles**: -C≡N, hydrolysis to acids

### Reaction Mechanisms
- **Nucleophilic substitution**: SN1 (tertiary, carbocation, racemization) vs SN2 (primary, backside attack, inversion)
- **Elimination**: E1 (tertiary, carbocation) vs E2 (strong base, one step)
- **Addition**: electrophilic (alkenes + HX, Br₂) and nucleophilic (carbonyl)
- **Aromatic substitution**: electrophilic (nitration, sulfonation, halogenation, Friedel-Crafts)
- **Carbonyl reactions**: nucleophilic addition (aldol, Grignard), reduction (NaBH₄, LiAlH₄), oxidation (PCC, KMnO₄)
- **Rearrangements**: carbocation (hydride shift, alkyl shift), Beckmann, Claisen

### Stereochemistry
Chirality: asymmetric carbon with 4 different groups. Enantiomers: non-superimposable mirror images, identical physical properties except optical rotation and biological activity. Diastereomers: non-mirror image stereoisomers, different physical properties. R/S nomenclature (Cahn-Ingold-Prelog).

### Spectroscopy for Structure Elucidation
- **NMR**: ¹H (chemical shift δ, integration, splitting patterns n+1, coupling constants J). ¹³C (δ 0-220, DEPT for CH/CH₂/CH₃)
- **IR**: functional groups (C=O ~1700, O-H ~3300, N-H ~3300, C=C ~1650)
- **MS**: molecular ion (M⁺), fragmentation patterns, isotopes

### Drug-Relevant Organic Reactions
Ester hydrolysis: prodrug activation. Amide formation: peptide coupling. Reductive amination: amine drug synthesis. Alkylation: N- and O-alkylation. Acylation: amide/ester formation. Oxidation: CYP450 metabolism.`,
    keyPoints: [
      'SN1: tertiary, racemization. SN2: primary, inversion',
      'E1: tertiary carbocation. E2: strong base, one-step',
      'Carbonyl: nucleophilic addition (aldol, Grignard)',
      'Chirality: R/S, enantiomers/diastereomers',
      'NMR: n+1 splitting rule, chemical shift identifies functional groups',
    ],
  },

  'sup-pharmanal': {
    summary: `## Pharmaceutical Analysis

### Analytical Method Validation (ICH Q2)
Parameters: accuracy, precision (repeatability, intermediate, reproducibility), specificity, detection limit (LOD), quantitation limit (LOQ), linearity, range, robustness. LOD = 3.3σ/S, LOQ = 10σ/S.

### Spectroscopy
- **UV-Vis**: quantitative, λₘₐₓ for quantification, Beer-Lambert A = εbc. Derivative spectroscopy for resolving overlapping peaks
- **IR**: qualitative identification, fingerprint region (4000-400 cm⁻¹). NIR: rapid, non-destructive QC
- **Fluorescence**: higher sensitivity (10-100× vs UV), for compounds with fluorophores
- **AAS/AES**: elemental analysis (heavy metals), specific for metals

### Chromatography
- **HPLC**: gold standard. Modes: reverse-phase (C18, C8), normal-phase (silica), ion-exchange, size-exclusion. Detectors: UV-Vis (DAD/PDA), fluorescence, RI, MS
- **UPLC/HPLC**: faster, higher resolution, smaller particles
- **GC**: volatile compounds, FID or MS detection, headspace for residual solvents
- **TLC/HPTLC**: rapid screening, identity test

### Titrimetric Analysis
Acid-base: aqueous and non-aqueous. Complexometric: EDTA (Ca, Mg, Al). Redox: iodimetry, permanganometry, cerimetry. Precipitation: Mohr, Volhard. Potentiometric: endpoint detection.

### Method Development Considerations
Mobile phase: pH, buffer, organic modifier. Column: C18 most common, particle size (5 μm standard, 3 μm or sub-2 μm for UPLC). Flow rate, temperature, detection wavelength. System suitability: tailing factor ≤ 2, resolution ≥ 2, theoretical plates ≥ 2000.

### Pharmacopoeial Standards
Official methods: British Pharmacopoeia (BP), European Pharmacopoeia (Ph. Eur.), United States Pharmacopeia (USP), International Pharmacopoeia (Ph. Int.). Monographs: identification, tests, assay, storage conditions.

### Dissolution Testing
Solid oral dosage forms. Apparatus: basket (USP I), paddle (USP II), reciprocating cylinder (USP III). Media: water, buffer, SGF, SIF, surfactant. QC test: Q-point (e.g., Q = 80% in 45 min).`,
    keyPoints: [
      'Validation: accuracy, precision, specificity, linearity, LOD/LOQ',
      'HPLC with UV detection: gold standard pharmaceutical analysis',
      'Beer-Lambert: A = εbc for UV-Vis quantitation',
      'System suitability: tailing ≤ 2, resolution ≥ 2, plates ≥ 2000',
      'Dissolution: QC test for solid dosage forms, paddle/basket apparatus',
    ],
  },

  'sup-pharmaceutics': {
    summary: `## Pharmaceutics

### Dosage Forms Classification
- **Solid**: tablets (immediate release, controlled release, film-coated), capsules (hard/soft), powders, granules
- **Liquid**: solutions, syrups, suspensions, emulsions, elixirs
- **Semi-solid**: ointments, creams, gels, pastes, suppositories
- **Parenteral**: IV, IM, SC solutions/suspensions (sterile, pyrogen-free)
- **Novel**: liposomes, nanoparticles, transdermal patches, implants, ODTs

### Tablet Manufacturing
Wet granulation: mix → granulate → dry → mill → blend → compress. Dry granulation (slugging/roller compaction): for moisture-sensitive drugs. Direct compression: simple, fewer steps, requires good flow and compressibility.

### Biopharmaceutics
BCS classification:
- **Class I**: high solubility, high permeability (metoprolol, diltiazem) — well absorbed
- **Class II**: low solubility, high permeability (ibuprofen, carbamazepine) — dissolution rate-limited
- **Class III**: high solubility, low permeability (cimetidine, acyclovir) — permeability-limited
- **Class IV**: low solubility, low permeability (furosemide, MTX) — poor oral bioavailability

### Bioavailability and Bioequivalence
Absolute bioavailability (F): AUC_oral / AUC_IV. Relative bioavailability: comparing formulations. Bioequivalence: 90% CI of AUC and Cₘₐₓ within 80-125%. Food effect: can increase (lipophilic drugs) or decrease (acid-labile) absorption.

### Controlled Release
Types: extended (ER, XR), delayed (DR, enteric), targeted. Mechanisms: diffusion-controlled (matrix, reservoir), dissolution-controlled, erosion-controlled, osmotic pump. Advantages: fewer doses, stable levels, less side effects. Challenges: dose dumping, food effect.

### Sterile Products
Routes: IV, IM, SC, intrathecal, ophthalmic, inhalation. Requirements: sterile (SAL ≤ 10⁻⁶), pyrogen-free, particulate-free, isotonic, pH ~7.4. Aseptic processing vs terminal sterilization. Preservatives for multi-dose vials.

### Stability Testing
ICH Q1A: long-term (25°C/60% RH), accelerated (40°C/75% RH), intermediate (30°C/65% RH). Photostability. Freeze-thaw cycling. Package compatibility.`,
    keyPoints: [
      'Tablet: wet granulation (most common), direct compression (simple)',
      'BCS: Class I (high/high) — well absorbed. Class II (low/high) — dissolution-limited',
      'Bioequivalence: 80-125% CI for AUC and Cmax',
      'Controlled release: fewer doses, stable levels, no dose dumping',
      'Sterile: SAL ≤ 10⁻⁶, pyrogen-free, aseptic processing',
    ],
  },

  'sup-pharmacog': {
    summary: `## Pharmacognosy

### Natural Product Sources
Plants (morphine, digoxin, atropine, quinine, taxol, vincristine, artemisinin). Microorganisms (penicillin, tetracycline, cyclosporine, statins — originally from fungi). Marine (cone snail ω-conotoxin, sponge nucleosides — Ara-C).

### Plant Secondary Metabolites
- **Alkaloids**: nitrogen-containing, basic, potent (morphine, codeine, atropine, quinine, caffeine, nicotine, cocaine, reserpine, vincristine). Often extracted with acid-base shaking
- **Glycosides**: sugar + aglycone. Cardiac glycosides (digoxin), anthraquinone (senna, cascara), cyanogenic (amygdalin), saponins (licorice), flavanoids
- **Terpenoids**: built from isoprene units. Mono- (menthol, camphor), sesqui- (artemisinin), di- (taxol), tri- (ginsenosides). Steroids and cardiac glycosides are modified triterpenoids
- **Phenolics**: simple phenols, phenolic acids, coumarins, lignans, flavonoids, tannins. Antioxidant activity

### Extraction Methods
Maceration: plant material soaked in solvent. Percolation: solvent flows through powdered material. Soxhlet: continuous hot extraction. Supercritical fluid extraction (CO₂): selective, no residue. Steam distillation: volatile oils.

### Standardization
Marker compounds: chemically defined constituents used for quality control. Withania somnifera: withanolides. Ginkgo biloba: flavonol glycosides + terpene lactones. Panax ginseng: ginsenosides. St. John's Wort: hypericin, hyperforin. Echinacea: alkamides, cichoric acid.

### Herbal-Drug Interactions
St. John's Wort: CYP3A4/2C9 inducer (↓ efficacy of OCPs, warfarin, cyclosporine, statins, antiretrovirals). Ginkgo: antiplatelet (↑ bleeding with warfarin, aspirin). Ginseng: hypoglycaemic (↑ effect of antidiabetics). Echinacea: immunostimulant (contraindicated with immunosuppressants). Kava: hepatotoxicity.

### Pharmacopoeial Herbal Monographs
British Herbal Pharmacopoeia (BHP), WHO Monographs on Selected Medicinal Plants, European Pharmacopoeia (herbal drugs). Quality tests: identity, purity, assay, adulteration screening, microbial limits, heavy metals, pesticide residues, aflatoxins.

### Important Medicinal Plants in Kenya
Artemisia afra (wormwood): antimalarial. Cinchona ledgeriana: quinine. Catharanthus roseus (periwinkle): vinca alkaloids. Warburgia ugandensis: antimicrobial. Prunus africana: BPH. Aloe spp.: laxative, wound healing. Moringa oleifera: nutritional supplement.`,
    keyPoints: [
      'Alkaloids: nitrogen-containing, potent — morphine, quinine, vincristine',
      'Cardiac glycosides: digoxin from foxglove (Digitalis purpurea)',
      'St. John\'s Wort: potent CYP3A4 inducer — many drug interactions',
      'Artemisinin: from Artemisia annua, key antimalarial (ACTs)',
      'Standardization: marker compounds ensure batch-to-batch consistency',
    ],
  },

  'sup-pubhealth': {
    summary: `## Public Health

### Epidemiology Measures
- **Incidence**: new cases in a population over time
- **Prevalence**: all existing cases at a point in time (P = I × D)
- **Mortality rate**: deaths from a disease per population
- **Morbidity rate**: illness in a population
- **Measures of association**: Relative Risk (RR), Odds Ratio (OR), Attributable Risk (AR)
- **Standardization**: direct and indirect (age-standardized rates for comparison)

### Study Designs
- **Cross-sectional**: snapshot, prevalence, hypothesis-generating
- **Case-control**: retrospective, OR for rare diseases
- **Cohort**: prospective/retrospective, RR, incidence
- **RCT**: gold standard for efficacy, randomization reduces bias
- **Systematic review/meta-analysis**: highest level of evidence

### Disease Prevention
- **Primary**: prevent disease onset (vaccination, health education, sanitation)
- **Secondary**: early detection/treatment (screening — mammography, BP check, HIV testing)
- **Tertiary**: reduce complications/rehabilitation (diabetes foot care, cardiac rehab)

### Health Systems
Kenya Health System: MOH (national level) → County Health Dept → Sub-county → Health Centre → Dispensary/Community. Levels: primary (community level 1-2, health centres 3), secondary (hospitals level 4-5), tertiary (referral hospitals level 6). NHIF: mandatory health insurance.

### Key Public Health Programs in Kenya
- **HIV**: National AIDS Control Program (NASCOP) — ART scale-up, PMTCT, VMMC
- **TB**: National TB Program (NTP) — DOTS, contact tracing
- **Malaria**: National Malaria Control Program (NMCP) — LLINs, IPTp, ACT, RDT
- **Immunization**: KEPI — BCG, OPV/IPV, pentavalent, PCV, Rota, MR, HPV, Td
- **Maternal/Child Health**: focused antenatal care, skilled delivery, PNC, nutrition
- **NCDs**: Kenya STEPwise survey — HTN, DM, cancer screening

### Social Determinants of Health
Conditions in which people are born, grow, live, work, and age. Key domains: education, income, housing, food security, environment, social support, access to healthcare. Health inequities: avoidable, unfair differences in health outcomes.

### Essential Medicines Concept
WHO Essential Medicines List: evidence-based, cost-effective drugs that satisfy priority healthcare needs. Kenya EML (KEML): adapted national list. Formulary management: P&T committee, STGs, standard treatment guidelines.`,
    keyPoints: [
      'Incidence (new) vs Prevalence (total). P = I × D',
      'RCT: gold standard for efficacy. Cohort: incidence + RR',
      'Primary prevention: vaccination. Secondary: screening',
      'Kenya: devolved health system, NHIF, KEPI immunization schedule',
      'Essential medicines: WHO EML, adapted as KEML in Kenya',
    ],
  },
}

export function getStaticContent(unitId: string): UnitStaticContent | null {
  return UNIT_CONTENT[unitId] ?? null
}
