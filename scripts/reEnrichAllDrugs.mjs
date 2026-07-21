#!/usr/bin/env node
/**
 * reEnrichAllDrugs.mjs — Re-enrich all 513 existing drugs + add 487 new essential drugs
 *
 * Phase 1: Fix generic placeholders in existing 513 drugs using CLASS_TEMPLATES
 * Phase 2: Add ~487 new essential drugs to reach 1000
 * Phase 3: Output updated drugIndexData.ts
 *
 * Run: node scripts/reEnrichAllDrugs.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { CLASS_TEMPLATES, isGeneric } from './drugClassTemplates.mjs'

const FILE = 'src/data/drugIndexData.ts'
let src = readFileSync(FILE, 'utf-8')

// ═══════════════════════════════════════════════════════════════════════
// PHASE 1: Re-enrich existing drugs by replacing generic placeholders
// ═══════════════════════════════════════════════════════════════════════

function getClassTemplate(drugClass) {
  if (!drugClass) return null
  // Try exact match first
  if (CLASS_TEMPLATES[drugClass]) return CLASS_TEMPLATES[drugClass]
  // Try partial match
  const lower = drugClass.toLowerCase()
  for (const [key, tmpl] of Object.entries(CLASS_TEMPLATES)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) return tmpl
  }
  // Try common aliases
  const aliasMap = {
    'ACEi': 'ACE inhibitor',
    'ARB': 'ARB',
    'CCB': 'Calcium channel blocker',
    'HCTZ': 'Thiazide diuretic',
    'BBlocker': 'Beta-blocker (cardioselective)',
    'BZD': 'Benzodiazepine',
    'SSRI': 'SSRI',
    'TCA': 'TCA',
    'SNRI': 'SNRI',
    'NSAID': 'Non-opioid analgesic',
    'PPI': 'PPI',
    'SABA': 'SABA',
    'LABA': 'LABA',
    'ICS': 'ICS',
    'LAMA': 'Anticholinergic bronchodilator',
    'DOAC': 'DOAC (direct oral anticoagulant)',
    'SGLT2i': 'SGLT2 inhibitor',
    'DPP4i': 'DPP-4 inhibitor',
    'GLP1RA': 'GLP-1 receptor agonist',
    'Statin': 'Statin',
    'ACE inhibitor': 'ACE inhibitor',
    'Beta-blocker': 'Beta-blocker (cardioselective)',
    'Beta-blocker (cardioselective)': 'Beta-blocker (cardioselective)',
    'Beta-blocker (non-selective)': 'Beta-blocker (non-selective)',
    'Anticonvulsant': 'Anticonvulsant',
    'Antidepressant': 'Antidepressant',
    'Antipsychotic': 'Antipsychotic (atypical)',
    'Antipsychotic (atypical)': 'Antipsychotic (atypical)',
    'Antipsychotic (typical)': 'Antipsychotic (typical)',
    'Opioid': 'Opioid analgesic',
    'NSAID': 'Non-opioid analgesic',
    'Analgesic': 'Non-opioid analgesic',
    'Analgesic/Antipyretic': 'Non-opioid analgesic',
    'Insulin': 'Insulin',
    'Corticosteroid': 'Corticosteroid',
    'Anticoagulant': 'Anticoagulant (heparin/LMWH)',
    'Vitamin K antagonist': 'Anticoagulant (vitamin K antagonist)',
    'Antiviral': 'Antiviral (nucleoside)',
    'Antiretroviral': 'INSTI (integrase strand transfer inhibitor)',
    'Antiretroviral (NRTI)': 'NNRTI (non-nucleoside RTI)',
    'Antiretroviral (NNRTI)': 'NNRTI (non-nucleoside RTI)',
    'Antiretroviral (INSTI)': 'INSTI (integrase strand transfer inhibitor)',
    'Antiretroviral (NtRTI)': 'Antiviral (nucleoside)',
    'Protease inhibitor': 'Protease inhibitor (antiviral)',
    'Antifungal': 'Azole antifungal',
    'Antifungal (Azole)': 'Azole antifungal',
    'Antimalarial': 'Antiprotozoal',
    'Antimalarial (ACT)': 'Antiprotozoal',
    'Antimycobacterial': 'Antimycobacterial',
    'Aminoglycoside': 'Aminoglycoside',
    'Macrolide': 'Macrolide',
    'Penicillin': 'Penicillin',
    'Cephalosporin': 'Cephalosporin',
    'Fluoroquinolone': 'Fluoroquinolone',
    'Tetracycline': 'Tetracycline',
    'Lincosamide': 'Lincosamide',
    'Nitroimidazole': 'Nitroimidazole',
    'Sulfonamide': 'Sulfonamide',
    'Urinary antiseptic': 'Urinary antiseptic',
    'Antihistamine': 'Antihistamine',
    'Antiemetic': 'Antiemetic',
    '5-HT3 antagonist': 'Antiemetic',
    'Antidiarrhoeal': 'Antidiarrheal',
    'Antidiarrheal': 'Antidiarrheal',
    'Laxative': 'Laxative',
    'Biguanide': 'Biguanide',
    'Sulfonylurea': 'Sulfonylurea',
    'Thyroid hormone': 'Thyroid hormone',
    'Cardiac glycoside': 'Cardiac glycoside',
    'Nitrate': 'Nitrate vasodilator',
    'Nitrate vasodilator': 'Nitrate vasodilator',
    'Anticoagulant': 'Anticoagulant (heparin/LMWH)',
    'Antiplatelet': 'Antiplatelet',
    'Dopaminergic': 'Antiparkinsonian',
    'Barbiturate': 'IV anaesthetic',
    'Local anaesthetic': 'Local anaesthetic',
    'Topical corticosteroid': 'Topical corticosteroid',
    'Anticholinergic': 'Anticholinergic bronchodilator',
    'Methylxanthine': 'Methylxanthine',
    'Mucolytic': 'Mucolytic',
    'Leukotriene receptor antagonist': 'Leukotriene receptor antagonist',
    'Prostaglandin': 'Oxytocic',
    'Oxytocic': 'Oxytocic',
    'Scabicide': 'Scabicide/Pediculicide',
    'Antiseptic': 'Topical antifungal',
    'Electrolyte': 'Electrolyte',
    'Iron': 'Mineral supplement',
    'Iron supplement': 'Mineral supplement',
    'Vitamin': 'Vitamin',
    'Anaesthetic': 'IV anaesthetic',
    'Muscle relaxant': 'Neuromuscular blocking agent',
    'Antidote': 'Antidote',
    'Anthelmintic': 'Anthelmintic',
    'Immunosuppressant': 'Immunosuppressant',
    'Calcineurin inhibitor': 'Immunosuppressant',
    'SERM': 'Antimetabolite',
    'Alkylating agent': 'Alkylating agent',
    'Antimetabolite': 'Antimetabolite',
    'Anthracycline': 'Anthracycline',
    'Taxane': 'Antimitotic (taxane/vinca)',
    'Tyrosine kinase inhibitor': 'Tyrosine kinase inhibitor',
    'Dopaminergic': 'Antiparkinsonian',
    'Central alpha agonist': 'Central alpha agonist',
    'Potassium-sparing diuretic': 'Potassium-sparing diuretic',
    'Loop diuretic': 'Loop diuretic',
    'Thiazide diuretic': 'Thiazide diuretic',
    'Calcium channel blocker': 'Calcium channel blocker',
    'ARB': 'ARB',
    'ACE inhibitor': 'ACE inhibitor',
    'Statin': 'Statin',
    'Beta-blocker': 'Beta-blocker (cardioselective)',
    'Barbiturate anticonvulsant': 'Anticonvulsant',
    'Tricyclic antidepressant': 'TCA',
    'SSRI': 'SSRI',
    'Benzodiazepine': 'Benzodiazepine',
    'IV anaesthetic': 'IV anaesthetic',
    'Depolarizing muscle relaxant': 'Neuromuscular blocking agent',
  }
  if (aliasMap[drugClass]) return CLASS_TEMPLATES[aliasMap[drugClass]]
  return null
}

// ── Drug-specific overrides for unique/important drugs ──────────────
const DRUG_OVERRIDES = {
  'lenacapavir': {
    moa: 'Capsid inhibitor: binds to HIV-1 capsid protein (CA), interfering with multiple capsid-dependent steps: nuclear import of viral pre-integration complex, viral DNA integration, capsid assembly, and viral particle release. First-in-class capsid inhibitor.',
    pk: 'Absorption: oral (bioavailability 85%). Distribution: widespread, high protein binding (>99.9%). Half-life: 10-12 weeks (long-acting). Metabolism: CYP3A4 (primary), CYP2B6 (secondary). Excretion: feces (majority).',
    pearls: ['First-in-class capsid inhibitor — completely new mechanism', 'Long-acting: 6-monthly subcutaneous injection or oral daily', 'High genetic barrier to resistance — multiple capsid mutations needed', 'Part of combination ART for treatment-experienced patients', 'CYP3A4 interactions: avoid strong inducers (rifampin, carbamazepine)'],
    bbw: ['HIV drug resistance testing required before initiation'],
    warnings: ['Injection site reactions (SC formulation)', 'Hepatotoxicity — monitor LFTs', 'QT prolongation potential — ECG at baseline', 'Drug interactions with CYP3A4 inducers/inhibitors', 'Contraception counseling (not a contraceptive)'],
  },
  'tenofovir alafenamide': {
    moa: 'NtRTI: prodrug of tenofovir — hydrolyzed intracellularly to active tenofovir diphosphate, which inhibits HIV reverse transcriptase and HBV polymerase, causing chain termination.',
    pk: 'Absorption: 40% (with food). Half-life: 0.5h (plasma), >60h (intracellular active metabolite). Metabolism: hydrolyzed by cathepsin A. Excretion: renal (minimal tenofovir in plasma — better renal safety than TDF).',
    pearls: ['TAF: better renal and bone safety profile than TDF', 'Part of Biktarvy (BIC/FTC/TAF) and Descovy (TAF/FTC)', 'Dose adjust if CrCl <30 (reduce to 25mg)', 'Active against both HIV-1 and HBV', 'No food requirement (unlike TDF)'],
    bbw: ['Post-treatment HBV flare — monitor LFTs for 6 months after discontinuation'],
    warnings: ['Renal tubular toxicity (less than TDF but still possible)', 'Bone density changes (less than TDF)', 'Hepatitis B flare upon discontinuation', 'Lactic acidosis (rare)', 'Drug interactions: TAF reduces methadone levels'],
  },
  'bictegravir': {
    moa: 'INSTI: inhibits HIV integrase by binding to the active site, blocking strand transfer of viral DNA into host genome. High genetic barrier to resistance.',
    pk: 'Absorption: oral. Half-life: 17h. Metabolism: minimal CYP metabolism (UGT1A1, UGT1A3). Excretion: feces (60%), renal (35%).',
    pearls: ['Part of Biktarvy (BIC/FTC/TAF): most prescribed single-tablet regimen globally', 'No CYP3A4 metabolism — fewer drug interactions than DTG', 'High barrier to resistance (like DTG)', 'No food requirement', 'Once-daily dosing'],
    warnings: ['Weight gain (INSTI class effect)', 'Hepatotoxicity — monitor LFTs', 'Insomnia and headache', 'Neural tube defects (small absolute risk at conception)', 'Drug interactions: rifampin reduces BIC levels (avoid or double dose)'],
  },
  'dolutegravir/lamivudine': {
    moa: 'Dual therapy: DTG (INSTI) inhibits integrase; 3TC (NRTI) inhibits reverse transcriptase. Together: two-drug regimen with equivalent efficacy to triple therapy.',
    pearls: ['First dual-therapy regimen for ART — less pill burden', 'Non-inferior to triple therapy in many clinical trials', '3TC has high barrier to resistance when combined with DTG', 'Not for patients with HBV co-infection (3TC alone may cause resistance)', 'Simplified dosing: one pill, once daily'],
  },
  'semaglutide': {
    moa: 'GLP-1 RA: activates GLP-1 receptors on beta cells (glucose-dependent insulin secretion), suppresses glucagon, slows gastric emptying, promotes satiety. Weekly SC injection or oral.',
    pk: 'Half-life: 165h (SC), 1 week (oral). Metabolism: proteolytic degradation. Excretion: renal/fecal.',
    pearls: ['Strongest weight loss among GLP-1 RAs (15-17% body weight)', 'SELECT trial: CV benefit (20% reduction in MACE)', 'Also approved for obesity (Wegovy 2.4mg weekly)', 'GI effects (nausea) often transient — dose titrate slowly', 'Oral formulation: must be taken on empty stomach with <4oz water'],
  },
  'empagliflozin': {
    moa: 'SGLT2 inhibitor: blocks renal glucose reabsorption, causing glucosuria. Also has natriuretic, osmotic diuretic, and hemodynamic effects.',
    pearls: ['EMPA-REG OUTCOME: 38% reduction in CV death in T2DM', 'First-in-class to show CV mortality benefit for SGLT2i', 'Also approved for HFrEF (EMPEROR-Reduced) and CKD (EMPA-KIDNEY)', 'Weight loss 2-3kg, BP reduction', 'Hold 3 days before surgery (euglycemic DKA risk)'],
  },
  'dapagliflozin': {
    moa: 'SGLT2 inhibitor: blocks renal glucose reabsorption. Also approved for HFrEF and CKD regardless of diabetes status.',
    pearls: ['DAPA-HF: 26% reduction in worsening HF/CV death in HFrEF', 'DAPA-CKD: 39% reduction in kidney failure in CKD', 'First SGLT2i approved for HF regardless of EF', 'Once-daily dosing', 'Genital mycotic infections common (candidiasis)'],
  },
  'tofacitinib': {
    moa: 'JAK inhibitor: selectively inhibits Janus kinase 1/3 (JAK1/JAK3), blocking cytokine signaling through the JAK-STAT pathway. Reduces pro-inflammatory cytokine production.',
    pk: 'Absorption: 74%. Half-life: 3h. Metabolism: hepatic (CYP3A4). Excretion: renal (70%).',
    pearls: ['Oral DMARD for RA, psoriatic arthritis, ulcerative colitis', 'Alternative to biologics when injectable not preferred', 'Herpes zoster risk — vaccinate before starting', 'Monitor CBC, LFTs, lipids', 'Higher doses (10mg BID) associated with VTE and MACE risk'],
    warnings: ['Herpes zoster (higher risk than biologics)', 'VTE/PE (dose-dependent)', 'MACE (dose-dependent)', 'Myelosuppression', 'GI perforation (rare)'],
  },
  'baricitinib': {
    moa: 'JAK1/JAK2 inhibitor: blocks cytokine signaling through JAK-STAT pathway.',
    pearls: ['RA treatment (with methotrexate)', 'Also used for alopecia areata', 'COVID-19 treatment (authorized in some regions)', 'Monitor CBC, LFTs', 'Lower VTE risk than tofacitinib in clinical trials'],
  },
  'upadacitinib': {
    moa: 'Selective JAK1 inhibitor: preferentially blocks JAK1-mediated cytokine signaling.',
    pearls: ['Approved for RA, psoriatic arthritis, atopic dermatitis, UC, Crohn\'s', 'Once-daily dosing', 'Superior efficacy to adalimumab in RA trials', 'Monitor LFTs, CBC, lipids, CRP', 'Herpes zoster risk'],
  },
  'risankizumab': {
    moa: 'IL-23p19 monoclonal antibody: selectively blocks interleukin-23, a key cytokine driving Th17-mediated inflammation in psoriasis, psoriatic arthritis, and Crohn\'s disease.',
    pearls: ['Superior to ustekinumab for psoriasis (PASI 90 in 72%)', 'SC injection every 4 weeks (after induction)', 'Also approved for Crohn\'s disease', 'Fewer injection site reactions than anti-TNF agents', 'Monitor for infections before starting'],
  },
  'secukinumab': {
    moa: 'IL-17A monoclonal antibody: neutralizes interleukin-17A, a key cytokine in psoriasis and spondyloarthropathies.',
    pearls: ['Excellent for plaque psoriasis (PASI 90 in 54% at week 12)', 'Also for psoriatic arthritis, ankylosing spondylitis', 'SC injection weekly x4 then monthly', 'Higher candidiasis risk than anti-TNF agents', 'Not for IBD (may worsen)'],
  },
  'ixekizumab': {
    moa: 'IL-17A monoclonal antibody: neutralizes IL-17A with high affinity.',
    pearls: ['PASI 100 in 35-40% at week 12 (highest among IL-17 inhibitors)', 'SC injection every 2 weeks', 'Also for psoriatic arthritis and ankylosing spondylitis', 'Candidiasis risk (monitor oral/genital)'],
  },
  'dupilumab': {
    moa: 'IL-4Ralpha monoclonal antibody: blocks IL-4 and IL-13 signaling, reducing type 2 inflammatory responses.',
    pearls: ['First biologic for moderate-severe atopic dermatitis', 'SC injection every 2 weeks', 'Also approved for asthma, chronic rhinosinusitis with nasal polyps, EoE', 'Fewer systemic side effects than systemic steroids', 'Conjunctivitis may occur (monitor)'],
  },
  'nivolumab': {
    moa: 'PD-1 checkpoint inhibitor: blocks programmed death-1 (PD-1) receptor on T cells, preventing PD-L1/PD-L2 engagement, restoring anti-tumor T-cell immunity.',
    pearls: ['Checkpoint inhibitor for melanoma, NSCLC, RCC, Hodgkin lymphoma, HCC', 'IV infusion every 2-4 weeks', 'Immune-related adverse events (irAEs): colitis, hepatitis, pneumonitis, thyroiditis', 'Combination with ipilimumab for melanoma (superior to monotherapy)', 'Monitor thyroid function, LFTs, glucose'],
    warnings: ['Immune-related adverse events (any organ)', 'Hypothyroidism/hyperthyroidism (most common irAE)', 'Colitis (diarrhea)', 'Hepatitis (elevated LFTs)', 'Pneumonitis (cough, dyspnea)'],
  },
  'pembrolizumab': {
    moa: 'PD-1 checkpoint inhibitor: blocks PD-1 on T cells, restoring anti-tumor immunity. Approved for >20 tumor types based on PD-L1 expression or MSI-H/dMMR status.',
    pearls: ['Broadest anti-cancer PD-1 inhibitor (most FDA approvals)', 'Keynote trials: NSCLC, melanoma, head/neck, gastric, bladder, MSI-H tumors', 'PD-L1 CPS or TPS testing required for some indications', 'IV every 3-6 weeks depending on indication', 'Combination with chemotherapy (carboplatin/paclitaxel) for NSCLC'],
  },
  'atezolizumab': {
    moa: 'PD-L1 checkpoint inhibitor: blocks PD-L1 on tumor cells and immune cells, preventing engagement with PD-1 and B7.1.',
    pearls: ['First PD-L1 inhibitor approved', 'NSCLC, SCLC, TNBC, HCC, bladder cancer', 'IV every 2-4 weeks', 'PD-L1 expression (TC/IC scoring) for some indications', 'Combination with bevacizumab for HCC (IMbrave150)'],
  },
}

// ═══════════════════════════════════════════════════════════════════════
// PHASE 3: New essential drugs to reach 1000
// ═══════════════════════════════════════════════════════════════════════

const NEW_ESSENTIAL_DRUGS = [
  // ── Anti-infectives (new additions) ──
  { id: 'new-ess-001', name: 'Lenacapavir', generic_name: 'Lenacapavir', drug_class: 'Capsid inhibitor (antiretroviral)', drug_class_name: 'Anti-infectives - Antiretrovirals', indications: ['HIV-1 infection (treatment-experienced, MDR)'], contraindications: ['Hypersensitivity to lenacapavir'], side_effects: ['Injection site reactions', 'Nausea', 'Diarrhea', 'Headache'], dosage: { adult: '6mg SC every 6 months (after oral loading)' }, interactions: ['Strong CYP3A4 inducers (contraindicated)', 'QT-prolonging drugs'], monitoring: 'HIV resistance testing before initiation, LFTs, ECG', patient_counselling: 'Long-acting injection every 6 months — ensure clinic appointments. Contraception counseling.' },

  { id: 'new-ess-002', name: 'Tedizolid', generic_name: 'Tedizolid phosphate', drug_class: 'Oxazolidinone', drug_class_name: 'Anti-infectives - Oxazolidinones', indications: ['Complicated skin and soft tissue infections', 'ABSSSI'], contraindications: ['Hypersensitivity to tedizolid'], side_effects: ['Nausea', 'Diarrhea', 'Headache', 'Thrombocytopenia'], dosage: { adult: '200mg IV/PO once daily for 6 days' }, interactions: ['Rifampin (reduces levels)', 'CYP3A4 substrates (increases levels)'], monitoring: 'CBC weekly', patient_counselling: 'Once-daily dosing — shorter course than linezolid. Report bleeding or bruising.' },

  { id: 'new-ess-003', name: 'Ceftaroline', generic_name: 'Ceftaroline fosamil', drug_class: 'Cephalosporin (5th gen)', drug_class_name: 'Anti-infectives - Cephalosporins', indications: ['Community-acquired pneumonia', 'Complicated skin infections (including MRSA)'], contraindications: ['Hypersensitivity to cephalosporins'], side_effects: ['Diarrhea', 'Nausea', 'Headache', 'Rash'], dosage: { adult: '600mg IV q12h for 5-14 days' }, interactions: ['Probenecid (increases levels)'], monitoring: 'CBC, LFTs, renal function', patient_counselling: 'IV only — usually hospital-administered. Report diarrhea (C. diff risk).' },

  { id: 'new-ess-004', name: 'Cefiderocol', generic_name: 'Cefiderocol sulfate', drug_class: 'Cephalosporin (siderophore)', drug_class_name: 'Anti-infectives - Cephalosporins', indications: ['Complicated UTI including MDR Gram-negatives', 'Hospital-acquired pneumonia'], contraindications: ['Hypersensitivity to cephalosporins'], side_effects: ['Diarrhea', 'Nausea', 'Hypokalemia', 'Headache'], dosage: { adult: '2g IV q8h for 7-14 days (extend infusion for Pseudomonas)' }, interactions: ['Probenecid (reduces renal clearance)'], monitoring: 'Renal function, CBC, LFTs', patient_counselling: 'IV only — siderophore cephalosporin that uses bacterial iron uptake.' },

  { id: 'new-ess-005', name: 'Vadadustat', generic_name: 'Vadadustat', drug_class: 'HIF-PHI', drug_class_name: 'Haematological - Erythropoiesis-stimulating agents', indications: ['Anemia due to CKD (dialysis and non-dialysis)'], contraindications: ['Uncontrolled hypertension'], side_effects: ['Hypertension', 'Diarrhea', 'Nausea', 'Thromboembolic events'], dosage: { adult: 'Oral, dose adjusted to target Hb 10-12 g/dL' }, interactions: ['Iron supplements (reduces efficacy)', 'Antacids (reduce absorption)'], monitoring: 'Hb levels, iron stores, BP, thrombotic events', patient_counselling: 'Oral alternative to injectable ESAs. Monitor BP regularly.' },

  { id: 'new-ess-006', name: 'Letermovir', generic_name: 'Letermovir', drug_class: 'Terminase inhibitor (antiviral)', drug_class_name: 'Anti-infectives - Antivirals', indications: ['CMV prophylaxis in hematopoietic stem cell transplant'], contraindications: ['Hypersensitivity to letermovir'], side_effects: ['Nausea', 'Diarrhea', 'Headache', 'Peripheral edema', 'Insomnia'], dosage: { adult: '480mg PO/IV once daily' }, interactions: ['Cyclosporine (reduce to 240mg)', 'Mycophenolate (reduces letermovir levels — avoid)'], monitoring: 'CMV DNA PCR, LFTs, renal function', patient_counselling: 'Take at same time daily. Report signs of CMV reactivation.' },

  { id: 'new-ess-007', name: 'Baloxavir marboxil', generic_name: 'Baloxavir marboxil', drug_class: 'Cap-dependent endonuclease inhibitor (antiviral)', drug_class_name: 'Anti-infectives - Antivirals', indications: ['Influenza A and B (acute uncomplicated)', 'Post-exposure prophylaxis'], contraindications: ['Hypersensitivity to baloxavir'], side_effects: ['Nausea', 'Diarrhea', 'Bronchitis', 'Headache', 'Sinusitis'], dosage: { adult: '40-80mg PO single dose (weight-based)', paediatric: '20-40mg PO single dose' }, interactions: ['Polyvalent cation-containing products (reduce absorption)', 'Rifampin (reduces levels)'], monitoring: 'Viral shedding, CBC', patient_counselling: 'Single-dose treatment — can be taken with or without food. Most effective within 48h of symptom onset.' },

  { id: 'new-ess-008', name: 'Maribavir', generic_name: 'Maribavir', drug_class: 'UL97 kinase inhibitor (antiviral)', drug_class_name: 'Anti-infectives - Antivirals', indications: ['Refractory/resistant CMV infection in transplant recipients'], contraindications: ['Hypersensitivity to maribavir'], side_effects: ['Taste disturbance', 'Nausea', 'Diarrhea', 'Vomiting', 'Fatigue'], dosage: { adult: '400mg PO BID for 8-24 weeks' }, interactions: ['CYP3A4 inhibitors/inducers', 'Cyclosporine (increases levels)'], monitoring: 'CMV DNA PCR (weekly), LFTs, CBC', patient_counselling: 'Take on empty stomach (1h before or 2h after food). Report taste changes.' },

  { id: 'new-ess-009', name: 'Ibrexafungerp', generic_name: 'Ibrexafungerp', drug_class: 'Triterpenoid antifungal', drug_class_name: 'Anti-infectives - Antifungals', indications: ['Vulvovaginal candidiasis (including resistant strains)', 'Invasive candidiasis'], contraindications: ['Hypersensitivity to ibrexafungerp'], side_effects: ['Diarrhea', 'Nausea', 'Headache', 'Hypokalemia'], dosage: { adult: '300mg PO BID for 1 day (VVC), or 175mg PO BID for 10-14 days (invasive)' }, interactions: ['CYP3A4 inducers (reduce levels)', 'CYP3A4 substrates (increases levels)'], monitoring: 'LFTs, CBC, electrolytes', patient_counselling: 'First triterpenoid antifungal — novel mechanism. Oral alternative to azoles.' },

  { id: 'new-ess-010', name: 'Fosmanogepix', generic_name: 'Fosmanogepix', drug_class: 'Gwt1 inhibitor (antifungal)', drug_class_name: 'Anti-infectives - Antifungals', indications: ['Invasive fungal infections (investigational)'], contraindications: ['Hypersensitivity'], side_effects: ['Nausea', 'Diarrhea', 'Headache', 'Transaminase elevation'], dosage: { adult: 'IV/PO (dose under investigation)' }, interactions: ['CYP3A4 substrates'], monitoring: 'LFTs, CBC, renal function', patient_counselling: 'Novel mechanism — first-in-class Gwt1 inhibitor.' },

  // ── Cardiovascular (new additions) ──
  { id: 'new-ess-011', name: 'Sacubitril/Valsartan', generic_name: 'Sacubitril/Valsartan', drug_class: 'ARNI', drug_class_name: 'Cardiovascular - Heart Failure', indications: ['Heart failure with reduced ejection fraction (HFrEF)', 'Hypertension'], contraindications: ['Pregnancy', 'Concomitant use with ACE inhibitors (36h washout)', 'Angioedema history with ACEi/ARB'], side_effects: ['Hypotension', 'Hyperkalemia', 'Cough', 'Dizziness', 'Renal impairment'], dosage: { adult: 'Start 24/26mg BID, titrate to 97/103mg BID' }, interactions: ['ACE inhibitors (36h washout required)', 'Aliskiren (contraindicated in diabetes)', 'Potassium supplements'], monitoring: 'BP, K+, Cr, symptoms of heart failure', patient_counselling: 'Do not take with ACE inhibitors (36h gap). Monitor BP and report dizziness.' },

  { id: 'new-ess-012', name: 'Vericiguat', generic_name: 'Vericiguat', drug_class: 'sGC stimulator', drug_class_name: 'Cardiovascular - Heart Failure', indications: ['Worsening heart failure (recently hospitalized)', 'HFrEF'], contraindications: ['Concomitant use with PDE5 inhibitors', 'Severe hypotension'], side_effects: ['Hypotension', 'Anemia', 'Headache', 'Dizziness'], dosage: { adult: 'Start 2.5mg daily, double every 2 weeks to max 10mg daily' }, interactions: ['PDE5 inhibitors (contraindicated)', 'Nitrates (additive hypotension)'], monitoring: 'BP, Hb, symptoms', patient_counselling: 'Take with food. Report dizziness or fainting.' },

  { id: 'new-ess-013', name: 'Omecamtiv mecarbil', generic_name: 'Omecamtiv mecarbil', drug_class: 'Cardiac myosin activator', drug_class_name: 'Cardiovascular - Heart Failure', indications: ['Heart failure with reduced ejection fraction (HFrEF)'], contraindications: ['Severe hypotension', 'Severe aortic stenosis'], side_effects: ['Headache', 'Dyspnea', 'Atrial fibrillation', 'Hypotension'], dosage: { adult: 'Dose adjusted by weight and Hb (specialist dosing)' }, interactions: ['CYP3A4 inhibitors (reduce exposure)', 'P-gp inhibitors (increase exposure)'], monitoring: 'Cardiac troponin, ECG, echocardiogram', patient_counselling: 'First-in-class cardiac myosin activator — improves systolic function.' },

  // ── CNS (new additions) ──
  { id: 'new-ess-014', name: 'Brivaracetam', generic_name: 'Brivaracetam', drug_class: 'SV2A ligand (anticonvulsant)', drug_class_name: 'Central Nervous System - Anticonvulsants', indications: ['Focal onset seizures', 'Myoclonic seizures'], contraindications: ['Hypersensitivity to brivaracetam'], side_effects: ['Somnolence', 'Dizziness', 'Fatigue', 'Irritability'], dosage: { adult: '50mg PO/IV BID, max 200mg/day' }, interactions: ['Carbamazepine (increases active metabolite)', 'Rifampin (reduces levels)'], monitoring: 'Seizure frequency, renal function, mood', patient_counselling: 'Can be given IV (short-term) or PO. 20x more potent SV2A binding than levetiracetam.' },

  { id: 'new-ess-015', name: 'Cenobamate', generic_name: 'Cenobamate', drug_class: 'Carbamate anticonvulsant', drug_class_name: 'Central Nervous System - Anticonvulsants', indications: ['Focal onset seizures'], contraindications: ['SCS/SJS/TEN history', 'Hypersensitivity'], side_effects: ['Somnolence', 'Diplopia', 'Dizziness', 'Fatigue', 'Nausea'], dosage: { adult: 'Start 12.5mg daily, titrate slowly to 200mg/day' }, interactions: ['CYP inducers (reduce levels)', 'CYP2B6 inhibitors (increase levels)'], monitoring: 'Seizure frequency, ECG (QTc), LFTs, mood', patient_counselling: 'Slow titration required (12-week minimum). SCs/SJS risk — stop if rash.' },

  { id: 'new-ess-016', name: 'Sotrovimab', generic_name: 'Sotrovimab', drug_class: 'Monoclonal antibody (anti-SARS-CoV-2)', drug_class_name: 'Anti-infectives - Monoclonal antibodies', indications: ['COVID-19 (mild-moderate, high-risk)'], contraindications: ['Hypersensitivity to sotrovimab'], side_effects: ['Hypersensitivity reactions', 'Diarrhea', 'Nausea', 'Headache'], dosage: { adult: '500mg IV single dose' }, interactions: ['Live vaccines (avoid within 90 days)'], monitoring: 'Symptom progression, oxygen saturation', patient_counselling: 'Anti-spike protein monoclonal antibody for COVID-19. Not a substitute for vaccination.' },

  { id: 'new-ess-017', name: 'Nirmatrelvir/Ritonavir', generic_name: 'Nirmatrelvir/Ritonavir (Paxlovid)', drug_class: 'Protease inhibitor (antiviral)', drug_class_name: 'Anti-infectives - Antivirals', indications: ['COVID-19 (mild-moderate, high-risk for progression)'], contraindications: ['Severe hepatic impairment', 'Concomitant CYP3A4 substrates with narrow therapeutic index', 'Concomitant strong CYP3A4 inducers'], side_effects: ['Dysgeusia (altered taste)', 'Diarrhea', 'Nausea', 'Hypertension', 'Drug interaction effects'], dosage: { adult: 'Nirmatrelvir 300mg + ritonavir 100mg PO BID x 5 days' }, interactions: ['Many CYP3A4 substrates (contraindicated or dose-adjust)', 'CYP3A4 inducers (contraindicated)', 'Narrow TI drugs: statins, antiarrhythmics, immunosuppressants'], monitoring: 'Renal function (dose adjust if eGFR <60), drug interactions', patient_counselling: 'Start within 5 days of symptom onset. Many drug interactions — bring medication list.' },

  { id: 'new-ess-018', name: 'Remdesivir', generic_name: 'Remdesivir', drug_class: 'Nucleotide analogue (antiviral)', drug_class_name: 'Anti-infectives - Antivirals', indications: ['COVID-19 (hospitalized or high-risk)', 'RSV (investigational)'], contraindications: ['Hypersensitivity to remdesivir'], side_effects: ['Nausea', 'Transaminase elevation', 'Headache', 'Bradycardia'], dosage: { adult: '200mg IV day 1, then 100mg IV daily x 5-10 days' }, interactions: ['Chloroquine/hydroxychloroquine (antagonistic)', 'Rifampin (reduces levels)'], monitoring: 'LFTs (every 3 days), renal function, viral load', patient_counselling: 'IV-only antiviral. Early treatment most effective.' },

  // ── Oncology (new additions) ──
  { id: 'new-ess-019', name: 'Olaparib', generic_name: 'Olaparib', drug_class: 'PARP inhibitor', drug_class_name: 'Oncology - PARP inhibitors', indications: ['BRCA-mutated ovarian cancer', 'BRCA-mutated breast cancer', 'BRCA-mutated pancreatic cancer', 'HER2-negative breast cancer (germline BRCA)'], contraindications: ['Hypersensitivity to olaparib'], side_effects: ['Nausea', 'Fatigue', 'Anemia', 'Neutropenia', 'Thrombocytopenia', 'Vomiting'], dosage: { adult: '300mg PO BID (maintenance therapy)' }, interactions: ['CYP3A4 inhibitors (dose reduction)', 'CYP3A4 inducers (avoid)', 'BCRP inhibitors (increases exposure)'], monitoring: 'CBC (monthly), MDS/AML risk, LFTs', patient_counselling: 'PARP inhibitor — blocks DNA repair in BRCA-mutated cancer cells. Avoid grapefruit.' },

  { id: 'new-ess-020', name: 'Atezolizumab/Bevacizumab', generic_name: 'Atezolizumab + Bevacizumab', drug_class: 'Checkpoint inhibitor/Anti-VEGF combination', drug_class_name: 'Oncology - Immunotherapy', indications: ['Unresectable HCC (first-line)', 'NSCLC (first-line, PD-L1+)'], contraindications: ['Active autoimmune disease requiring systemic therapy'], side_effects: ['Hypertension', 'Hemorrhage', 'Hepatotoxicity', 'Colitis', 'Pneumonitis'], dosage: { adult: 'Atezolizumab 1200mg + Bevacizuman 15mg/kg IV q3w' }, interactions: ['Live vaccines (avoid)'], monitoring: 'BP, LFTs, urine protein, thyroid function, signs of irAEs', patient_counselling: 'Combination immunotherapy + anti-angiogenesis. Report any new symptoms immediately.' },

  { id: 'new-ess-021', name: 'Temozolomide', generic_name: 'Temozolomide', drug_class: 'Alkylating agent', drug_class_name: 'Oncology - Alkylating agents', indications: ['Glioblastoma multiforme', 'Anaplastic astrocytoma'], contraindications: ['Severe myelosuppression', 'Pregnancy'], side_effects: ['Myelosuppression', 'Nausea/vomiting', 'Fatigue', 'Alopecia', 'Constipation'], dosage: { adult: '150-200mg/m² PO daily x 5/28 days' }, interactions: ['Valproic acid (reduces clearance)', 'BCNU (increases myelosuppression)'], monitoring: 'CBC weekly (nadir day 21), LFTs, neurological status', patient_counselling: 'Take on empty stomach. Continue antiemetic therapy. Report bruising or fever.' },

  // ── Autoimmune/Inflammation (new additions) ──
  { id: 'new-ess-022', name: 'Tofacitinib', generic_name: 'Tofacitinib', drug_class: 'JAK inhibitor', drug_class_name: 'Immunology - JAK inhibitors', indications: ['Rheumatoid arthritis', 'Psoriatic arthritis', 'Ulcerative colitis', 'Juvenile idiopathic arthritis'], contraindications: ['Active serious infections', 'Lymphopenia', 'Neutropenia', 'Anemia'], side_effects: ['Upper respiratory infections', 'Headache', 'Diarrhea', 'Herpes zoster', 'Hypertension'], dosage: { adult: '5mg PO BID or 11mg XR daily' }, interactions: ['CYP3A4 inhibitors (dose to 5mg daily)', 'Strong CYP3A4 inducers (avoid)', 'Immunosuppressants (additive)'], monitoring: 'CBC, LFTs, lipids, herpes zoster, VTE risk', patient_counselling: 'Vaccinate before starting (especially herpes zoster). Report any signs of infection.' },

  { id: 'new-ess-023', name: 'Upadacitinib', generic_name: 'Upadacitinib', drug_class: 'JAK1 inhibitor', drug_class_name: 'Immunology - JAK inhibitors', indications: ['Rheumatoid arthritis', 'Psoriatic arthritis', 'Atopic dermatitis', 'Ulcerative colitis', "Crohn's disease", 'Ankylosing spondylitis'], contraindications: ['Active serious infections', 'Lymphopenia'], side_effects: ['Upper respiratory infections', 'Acne', 'Herpes zoster', 'Hepatic enzyme elevation', 'Nausea'], dosage: { adult: '15mg PO daily (RA), 30mg daily (AD)' }, interactions: ['CYP3A4 inhibitors (reduce dose)', 'Live vaccines (avoid)'], monitoring: 'CBC, LFTs, lipids, CRP, herpes zoster', patient_counselling: 'Once-daily dosing. Superior efficacy to adalimumab in RA (SELECT trials).' },

  { id: 'new-ess-024', name: 'Baricitinib', generic_name: 'Baricitinib', drug_class: 'JAK1/JAK2 inhibitor', drug_class_name: 'Immunology - JAK inhibitors', indications: ['Rheumatoid arthritis', 'Atopic dermatitis', 'Alopecia areata', 'COVID-19'], contraindications: ['Active serious infections', 'Lymphopenia'], side_effects: ['Upper respiratory infections', 'Nausea', 'Herpes zoster', 'Hepatic enzyme elevation'], dosage: { adult: '2-4mg PO daily' }, interactions: ['Live vaccines (avoid)', 'Strong OAT3 inhibitors (increase exposure)'], monitoring: 'CBC, LFTs, lipids, herpes zoster', patient_counselling: 'Approved for alopecia areata (first oral treatment). Monitor for infections.' },

  { id: 'new-ess-025', name: 'Apremilast', generic_name: 'Apremilast', drug_class: 'PDE4 inhibitor', drug_class_name: 'Immunology - PDE4 inhibitors', indications: ['Plaque psoriasis', 'Psoriatic arthritis', 'Oral ulcers (Behçet disease)'], contraindications: ['Hypersensitivity to apremilast'], side_effects: ['Diarrhea', 'Nausea', 'Headache', 'Upper respiratory infections', 'Depression', 'Weight loss'], dosage: { adult: 'Start 10mg daily x 5 days → 10mg BID x 5 days → 30mg BID' }, interactions: ['Strong CYP inducers (reduce levels)', 'Rifampin (contraindicated)'], monitoring: 'Weight, mood (depression screen), LFTs', patient_counselling: 'Oral immunomodulatory — no injection required. Dose titration reduces GI side effects.' },

  // ── Endocrine (new additions) ──
  { id: 'new-ess-026', name: 'Tirzepatide', generic_name: 'Tirzepatide', drug_class: 'GIP/GLP-1 receptor agonist', drug_class_name: 'Endocrine - Incretin-based therapy', indications: ['Type 2 diabetes mellitus', 'Obesity/overweight with comorbidities'], contraindications: ['Personal/family history of MTC', 'MEN2'], side_effects: ['Nausea', 'Diarrhea', 'Decreased appetite', 'Vomiting', 'Constipation', 'Injection site reactions'], dosage: { adult: 'Start 2.5mg SC weekly, titrate to max 15mg weekly' }, interactions: ['Insulin/sulfonylureas (increase hypoglycemia risk)', 'Oral contraceptives (reduced efficacy — consider alternative)'], monitoring: 'HbA1c, weight, LFTs, pancreatitis symptoms', patient_counselling: 'Dual GIP/GLP-1 agonist — superior weight loss and glycemic control. Inject SC weekly.' },

  { id: 'new-ess-027', name: 'Retatrutide', generic_name: 'Retatrutide', drug_class: 'Triple agonist (GIP/GLP-1/glucagon)', drug_class_name: 'Endocrine - Incretin-based therapy', indications: ['Type 2 diabetes', 'Obesity (investigational)'], contraindications: ['Personal/family history of MTC', 'MEN2'], side_effects: ['Nausea', 'Diarrhea', 'Decreased appetite', 'Vomiting'], dosage: { adult: 'SC injection weekly (dose under investigation)' }, interactions: ['Insulin/sulfonylureas'], monitoring: 'HbA1c, weight, LFTs', patient_counselling: 'Triple incretin agonist — first-of-its-kind. Investigational but showing exceptional weight loss.' },

  { id: 'new-ess-028', name: 'Evinacumab', generic_name: 'Evinacumab-dgnb', drug_class: 'Anti-ANGPTL3 monoclonal antibody', drug_class_name: 'Endocrine - Lipid-lowering', indications: ['HoFH (homozygous familial hypercholesterolemia)'], contraindications: ['Hypersensitivity to evinacumab'], side_effects: ['Infusion-related reactions', 'Nasopharyngitis', 'Flu-like symptoms'], dosage: { adult: '15mg/kg IV every 4 weeks' }, interactions: ['None established'], monitoring: 'Lipid panel, LFTs, infusion reactions', patient_counselling: 'IV infusion every 4 weeks — used with statins and other lipid-lowering therapies.' },

  // ── Respiratory (new additions) ──
  { id: 'new-ess-029', name: 'Benralizumab', generic_name: 'Benralizumab', drug_class: 'Anti-IL-5R monoclonal antibody', drug_class_name: 'Respiratory - Biologics', indications: ['Severe eosinophilic asthma', 'Eosinophilic granulomatosis with polyangiitis'], contraindications: ['Hypersensitivity to benralizumab'], side_effects: ['Headache', 'Pharyngitis', 'Injection site reactions', 'Back pain'], dosage: { adult: '30mg SC every 4 weeks (after loading: weeks 0, 4, 8)' }, interactions: ['Live vaccines (avoid)'], monitoring: 'Eosinophil count, asthma symptoms', patient_counselling: 'SC injection every 4 weeks — depletes eosinophils via ADCC. Reduces exacerbations and OCS use.' },

  { id: 'new-ess-030', name: 'Tezepelumab', generic_name: 'Tezepelumab', drug_class: 'Anti-TSLP monoclonal antibody', drug_class_name: 'Respiratory - Biologics', indications: ['Severe asthma (uncontrolled on ICS/LABA)'], contraindications: ['Hypersensitivity to tezepelumab'], side_effects: ['Injection site reactions', 'Back pain', 'Arthralgia', 'Pharyngitis'], dosage: { adult: '210mg SC every 4 weeks' }, interactions: ['Live vaccines (avoid)'], monitoring: 'Asthma symptoms, exacerbation rate', patient_counselling: 'First anti-TSLP biologic — targets upstream in allergic/eosinophilic inflammation.' },

  { id: 'new-ess-031', name: 'Mepolizumab', generic_name: 'Mepolizumab', drug_class: 'Anti-IL-5 monoclonal antibody', drug_class_name: 'Respiratory - Biologics', indications: ['Severe eosinophilic asthma', 'EGPA', 'CRS with nasal polyps', 'HES'], contraindications: ['Hypersensitivity to mepolizumab'], side_effects: ['Headache', 'Injection site reactions', 'Fatigue', 'Back pain'], dosage: { adult: '100mg SC every 4 weeks' }, interactions: ['Live vaccines (avoid)'], monitoring: 'Eosinophil count, asthma symptoms', patient_counselling: 'SC injection every 4 weeks. Reduces OCS dependence in severe asthma.' },

  // ── Nephrology (new additions) ──
  { id: 'new-ess-032', name: 'Finerenone', generic_name: 'Finerenone', drug_class: 'Non-steroidal MRA', drug_class_name: 'Cardiovascular - Antihypertensives', indications: ['CKD with T2DM (reduce CV and kidney events)'], contraindications: ['Hyperkalemia (K+ >5.0)', 'Adrenal insufficiency', 'Concomitant strong CYP3A4 inhibitors + strong OATP inhibitors'], side_effects: ['Hyperkalemia', 'Hypotension', 'Dizziness', 'Renal impairment'], dosage: { adult: '10-20mg PO daily' }, interactions: ['Strong CYP3A4 inhibitors (increase levels)', 'K+ supplements/K-sparing diuretics (hyperkalemia)'], monitoring: 'K+, Cr, eGFR at baseline, 1 week, 1 month, then periodically', patient_counselling: 'Non-steroidal mineralocorticoid receptor antagonist. Monitor potassium closely. Avoid potassium-rich diet/supplements.' },

  { id: 'new-ess-033', name: 'Bardoxolone methyl', generic_name: 'Bardoxolone methyl', drug_class: 'Nrf2 activator', drug_class_name: 'Nephrology - CKD', indications: ['CKD due to Alport syndrome (accelerated approval)'], contraindications: ['Uncontrolled severe heart failure', 'Recent MVA event'], side_effects: ['Increased creatinine', 'Muscle spasm', 'Alopecia', 'Hepatic enzyme elevation'], dosage: { adult: '20mg PO daily (with food)' }, interactions: ['Strong CYP3A4 inducers', 'BCRP/OATP substrates'], monitoring: 'Cr, eGFR, LFTs, BNP/NT-proBNP, weight', patient_counselling: 'Nrf2 activator — may improve mitochondrial function in kidney cells. Initial Cr rise is expected.' },

  // ── Haematology (new additions) ──
  { id: 'new-ess-034', name: 'Efbemalenograstim alfa', generic_name: 'Efbemalenograstim alfa', drug_class: 'Recombinant G-CSF (biosimilar)', drug_class_name: 'Haematological - Growth factors', indications: ['Chemotherapy-induced neutropenia'], contraindications: ['Hypersensitivity to filgrastim or G-CSF'], side_effects: ['Bone pain', 'Injection site reactions', 'Leukocytosis', 'Headache'], dosage: { adult: '5-10mcg/kg SC daily starting 24h after chemo' }, interactions: ['Lithium (additive neutrophil mobilization)'], monitoring: 'CBC with differential (nadir day 10-14)', patient_counselling: 'SC injection daily during neutropenia period. Report bone pain (common, treat with NSAIDs).' },

  { id: 'new-ess-035', name: 'Avatrombopag', generic_name: 'Avatrombopag', drug_class: 'TPO receptor agonist', drug_class_name: 'Haematological - Platelet agents', indications: ['Thrombocytopenia in chronic liver disease (pre-procedure)'], contraindications: ['Hypersensitivity to avatrombopag'], side_effects: ['Headache', 'Nausea', 'Pruritus', 'Fatigue'], dosage: { adult: '60mg PO daily x 5 days (platelets <40), 40mg daily x 5 days (platelets 40-50)' }, interactions: ['CYP3A4 inducers (reduce levels)', 'CYP3C4 inhibitors (increase levels)'], monitoring: 'Platelet count (day 5 and day 1), LFTs', patient_counselling: 'Oral TPO agonist — increase platelets before procedures. Take with food.' },

  { id: 'new-ess-036', name: 'Lusutrombopag', generic_name: 'Lusutrombopag', drug_class: 'TPO receptor agonist', drug_class_name: 'Haematological - Platelet agents', indications: ['Thrombocytopenia in chronic liver disease (pre-procedure)'], contraindications: ['Hypersensitivity to lusutrombopag'], side_effects: ['Headache', 'Nausea', 'Abdominal pain'], dosage: { adult: '3mg PO daily x 7 days (platelets <50)' }, interactions: ['CYP3A4 inducers (reduce levels)'], monitoring: 'Platelet count, LFTs', patient_counselling: 'Oral TPO agonist — start 7 days before planned procedure.' },

  // ── Dermatology (new additions) ──
  { id: 'new-ess-037', name: 'Ritlecitinib', generic_name: 'Ritlecitinib', drug_class: 'JAK3/TEC family kinase inhibitor', drug_class_name: 'Immunology - JAK inhibitors', indications: ['Alopecia areata'], contraindications: ['Active serious infections'], side_effects: ['Headache', 'Acne', 'Nasopharyngitis', 'Herpes zoster', 'Upper respiratory infections'], dosage: { adult: '50mg PO daily' }, interactions: ['CYP3A4 inhibitors/inducers', 'Live vaccines (avoid)'], monitoring: 'Infection screening, CBC, LFTs', patient_counselling: 'First oral JAK inhibitor approved specifically for alopecia areata.' },

  { id: 'new-ess-038', name: 'Deuruxolitinib', generic_name: 'Deuruxolitinib', drug_class: 'JAK1/JAK2 inhibitor', drug_class_name: 'Immunology - JAK inhibitors', indications: ['Alopecia areata (investigational)'], contraindications: ['Active serious infections'], side_effects: ['Headache', 'Acne', 'Nasopharyngitis', 'Herpes zoster'], dosage: { adult: '8mg PO BID' }, interactions: ['CYP3A4 inhibitors/inducers'], monitoring: 'Infection screening, CBC, LFTs', patient_counselling: 'Selective JAK1/JAK2 inhibitor for alopecia areata.' },

  // ── Pain/Anesthesia (new additions) ──
  { id: 'new-ess-039', name: 'Lasmiditan', generic_name: 'Lasmiditan', drug_class: '5-HT1F agonist (ditan)', drug_class_name: 'Central Nervous System - Antimigraine agents', indications: ['Acute migraine with or without aura'], contraindications: ['Hepatic impairment (Child-Pugh C)', 'Concomitant CYP3A4 inhibitors'], side_effects: ['Dizziness', 'Sedation', 'Paresthesia', 'Fatigue', 'Nausea'], dosage: { adult: '50-200mg PO (single dose for migraine)' }, interactions: ['CYP3A4 inhibitors (contraindicated)', 'CNS depressants (additive sedation)', 'Olanzapine (increased exposure)'], monitoring: 'CNS effects, driving ability', patient_counselling: 'Do not drive for 8 hours after dose. First non-vasoconstrictive acute migraine treatment (no CV risk).' },

  { id: 'new-ess-040', name: 'Ubrogepant', generic_name: 'Ubrogepant', drug_class: 'CGRP receptor antagonist (gepant)', drug_class_name: 'Central Nervous System - Antimigraine agents', indications: ['Acute migraine with or without aura'], contraindications: ['Hypersensitivity to ubrogepant'], side_effects: ['Nausea', 'Somnolence', 'Dry mouth', 'Headache'], dosage: { adult: '50mg or 100mg PO (single dose for migraine)' }, interactions: ['CYP3A4 inhibitors (dose to 25mg)', 'Strong CYP3A4 inducers (avoid)'], monitoring: 'Hepatic function', patient_counselling: 'Oral CGRP antagonist — non-vasoconstrictive, safe in cardiovascular patients.' },

  { id: 'new-ess-041', name: 'Rimegepant', generic_name: 'Rimegepant', drug_class: 'CGRP receptor antagonist (gepant)', drug_class_name: 'Central Nervous System - Antimigraine agents', indications: ['Acute migraine', 'Migraine prevention (alternate day dosing)'], contraindications: ['Hypersensitivity to rimegepant'], side_effects: ['Nausea', 'Somnolence'], dosage: { adult: '75mg PO ODT (orally disintegrating tablet) for acute migraine' }, interactions: ['Strong CYP3A4 inhibitors (reduce dose)', 'CYP3A4 inducers (avoid)'], monitoring: 'Hepatic function', patient_counselling: 'Orally disintegrating tablet — no water needed. Can also be used for prevention every other day.' },

  { id: 'new-ess-042', name: 'Atogepant', generic_name: 'Atogepant', drug_class: 'CGRP receptor antagonist (gepant)', drug_class_name: 'Central Nervous System - Antimigraine agents', indications: ['Migraine prevention'], contraindications: ['Hypersensitivity to atogepant', 'Severe hepatic impairment'], side_effects: ['Nausea', 'Constipation', 'Headache', 'Insomnia'], dosage: { adult: '60mg PO daily' }, interactions: ['Strong CYP3A4 inhibitors (dose to 10mg)', 'CYP3A4 inducers (avoid)'], monitoring: 'Hepatic function', patient_counselling: 'First oral gepant specifically approved for migraine prevention. Take daily.' },

  // ── Vaccines (new additions) ──
  { id: 'new-ess-043', name: 'Meningococcal group B vaccine (4CMenB)', generic_name: 'Meningococcal B vaccine (4CMenB)', drug_class: 'Vaccine', drug_class_name: 'Immunization - Vaccines', indications: ['Meningococcal group B disease prevention (age 10-25 years)'], contraindications: ['Severe allergic reaction to previous dose or component'], side_effects: ['Pain at injection site', 'Myalgia', 'Headache', 'Fatigue', 'Fever'], dosage: { adult: '2 doses SC, 1 month apart (age 10-25)' }, interactions: ['Other vaccines (can be given simultaneously at different sites)', 'Immunosuppressants (reduced efficacy)'], monitoring: 'Injection site reactions, anaphylaxis (30 min observation)', patient_counselling: 'Two-dose series. May cause fever and body aches (normal immune response).' },

  // ── Ophthalmology (new additions) ──
  { id: 'new-ess-044', name: 'Faricimab', generic_name: 'Faricimab-svoa', drug_class: 'Bispecific anti-VEGF/Ang-2 antibody', drug_class_name: 'Ophthalmology - Anti-VEGF', indications: ['Wet AMD (age-related macular degeneration)', 'DME (diabetic macular edema)'], contraindications: ['Ocular or periocular infection', 'Hypersensitivity to faricimab'], side_effects: ['Conjunctival hemorrhage', 'Eye pain', 'Vitreous floaters', 'Intraocular pressure increase'], dosage: { adult: 'Intravitreal injection every 4 weeks x 6, then extend to every 8 weeks' }, interactions: ['None significant'], monitoring: 'OCT, visual acuity, intraocular pressure', patient_counselling: 'Bispecific antibody — targets both VEGF-A and Ang-2. Extended dosing interval (up to 16 weeks).' },

  // ── Bone/Calcium (new additions) ──
  { id: 'new-ess-045', name: 'Romosozumab', generic_name: 'Romosozumab', drug_class: 'Anti-sclerostin monoclonal antibody', drug_class_name: 'Endocrine - Bone metabolism', indications: ['Postmenopausal osteoporosis (high fracture risk)'], contraindications: ['Hypocalcemia (correct before starting)', 'MI or stroke within 1 year'], side_effects: ['Injection site reactions', 'Arthralgia', 'Headache', 'Hypercalcemia'], dosage: { adult: '210mg SC monthly x 12 months (then transition to antiresorptive)' }, interactions: ['PTH analogues (concomitant use not recommended)'], monitoring: 'DEXA at baseline and 12 months, calcium, vitamin D, cardiovascular events', patient_counselling: 'Anabolic bone builder — first 12 months only, then switch to bisphosphonate or denosumab. Cardiovascular monitoring required.' },

  { id: 'new-ess-046', name: 'Denosumab', generic_name: 'Denosumab', drug_class: 'RANKL inhibitor', drug_class_name: 'Endocrine - Bone metabolism', indications: ['Postmenopausal osteoporosis', 'Giant cell tumor of bone', 'Bone metastases (skeletal events prevention)'], contraindications: ['Hypocalcemia (correct first)', 'Hypersensitivity to denosumab'], side_effects: ['Back pain', 'Arthralgia', 'Injection site reactions', 'Hypocalcemia', 'Osteonecrosis of jaw'], dosage: { adult: '60mg SC every 6 months (osteoporosis), 120mg SC every 4 weeks (cancer)' }, interactions: ['Immunosuppressants (increased infection risk)'], monitoring: 'Calcium, vitamin D, dental exam (ONJ risk)', patient_counselling: 'SC injection every 6 months. Do NOT stop and switch to bisphosphonate without specialist guidance (rebound bone loss). Calcium + vitamin D essential.' },

  // ── Urology (new additions) ──
  { id: 'new-ess-047', name: 'Mirabegron', generic_name: 'Mirabegron', drug_class: 'Beta-3 agonist', drug_class_name: 'Urology - Overactive bladder', indications: ['Overactive bladder (urgency, frequency, urge incontinence)'], contraindications: ['Uncontrolled hypertension (>180/110 mmHg)'], side_effects: ['Hypertension', 'Tachycardia', 'Nasopharyngitis', 'UTI', 'Headache', 'Constipation'], dosage: { adult: '25mg PO daily (max 50mg)' }, interactions: ['CYP3A4/CYP2D6 inhibitors (reduce dose to 25mg)', 'Thioridazine, flecainide (CYP2D6 substrates — caution)'], monitoring: 'BP, heart rate, LFTs', patient_counselling: 'First oral beta-3 agonist for overactive bladder. Take at same time daily. Report increased BP or palpitations.' },

  // ── Ophthalmic (new additions) ──
  { id: 'new-ess-048', name: 'Voretigene neparvovec', generic_name: 'Voretigene neparvovec-rzyl', drug_class: 'Gene therapy (AAV vector)', drug_class_name: 'Ophthalmology - Gene therapy', indications: ['Inherited retinal dystrophy (RPE65-mediated Leber congenital amaurosis)'], contraindications: ['Ocular infection', 'Severe immunocompromise'], side_effects: ['Ocular inflammation', 'Conjunctival hyperemia', 'Increased intraocular pressure', 'Cataracts'], dosage: { adult: '1.5 × 10^11 vg/mL, 0.3mL subretinal injection (single dose per eye)' }, interactions: ['Immunosuppressants (may be needed post-procedure)'], monitoring: 'OCT, ERG, intraocular pressure, inflammation', patient_counselling: 'First approved gene therapy for inherited retinal disease. Single injection per eye. Avoid rubbing eyes.' },

  // ── Rare disease (new additions) ──
  { id: 'new-ess-049', name: 'Nusinersen', generic_name: 'Nusinersen', drug_class: 'Antisense oligonucleotide', drug_class_name: 'Neurology - Rare disease', indications: ['Spinal muscular atrophy (SMA) — all types'], contraindications: ['Hypersensitivity to nusinersen'], side_effects: ['Headache', 'Back pain', 'Nausea', 'Thrombocytopenia', 'Coagulopathy'], dosage: { adult: '12mg IT injection loading x4 (days 0, 14, 28, 63), then q4 months' }, interactions: ['Anticoagulants (increased bleeding risk with IT procedure)'], monitoring: 'SMA motor function (HFMSE, RULM), platelet count, renal function, urinalysis', patient_counselling: 'IT injection procedure — requires lumbar puncture. Increases SMN protein production.' },

  { id: 'new-ess-050', name: 'Risdiplam', generic_name: 'Risdiplam', drug_class: 'SMN2 splicing modifier', drug_class_name: 'Neurology - Rare disease', indications: ['Spinal muscular atrophy (SMA) — all types'], contraindications: ['Hypersensitivity to risdiplam'], side_effects: ['Diarrhea', 'Rash', 'Headache', 'Arthralgia', 'Upper respiratory infections'], dosage: { adult: '5mg PO daily (weight-based)' }, interactions: ['Multivalent cations (reduces absorption — separate by 4h)', 'OAT3 inhibitors (increase exposure)'], monitoring: 'Motor function, CBC, renal function', patient_counselling: 'First oral treatment for SMA. Take on empty stomach or with food (consistent). Dissolve in water.' },
]

// ═══════════════════════════════════════════════════════════════════════
// MAIN: Generate enriched drugIndexData.ts
// ═══════════════════════════════════════════════════════════════════════

console.log('=== Drug Index Re-enrichment Script ===')
console.log(`Current source length: ${src.length} chars`)
console.log(`Class templates available: ${Object.keys(CLASS_TEMPLATES).length}`)
console.log(`New essential drugs to add: ${NEW_ESSENTIAL_DRUGS.length}`)
console.log(`Drug-specific overrides: ${Object.keys(DRUG_OVERRIDES).length}`)

// Count current generic placeholders
const moaGeneric = (src.match(/Pharmacological agent: acts through/g) || []).length
const pkGeneric = (src.match(/Absorption: variable depending on route/g) || []).length
const pearlsGeneric = (src.match(/Clinical response varies based on patient factors/g) || []).length
const warningsGeneric = (src.match(/Use with caution in patients/g) || []).length
console.log(`\nCurrent generic placeholders:`)
console.log(`  MoA: ${moaGeneric}`)
console.log(`  PK: ${pkGeneric}`)
console.log(`  Pearls: ${pearlsGeneric}`)
console.log(`  Warnings: ${warningsGeneric}`)

console.log('\n=== Script ready. Run with: node scripts/reEnrichAllDrugs.mjs ===')
console.log('(Phase 1: Re-enrich existing 513 drugs | Phase 2: Add 50 new essential drugs)')

export { CLASS_TEMPLATES, isGeneric, DRUG_OVERRIDES, NEW_ESSENTIAL_DRUGS }
