/**
 * drugClassTemplates.mjs — Comprehensive drug class template library
 *
 * Each class template provides clinically accurate content for 8 enriched fields:
 *   moa, pk, bbw (black_box_warnings), pearls, warnings, overdose, preg, brands
 *
 * Used by reEnrichAllDrugs.mjs to enrich all 1000 drugs.
 */

// ── Helper to check if a value is generic/placeholder ──────────────
export function isGeneric(val) {
  if (!val) return true
  if (Array.isArray(val)) {
    if (val.length === 0) return true
    const j = val.join(' ').toLowerCase()
    return j.includes('clinical response varies') || j.includes('use with caution') || j === ''
  }
  const s = String(val).toLowerCase()
  return (
    s.includes('pharmacological agent: acts through') ||
    s.includes('absorption: variable depending on route') ||
    s.includes('dose-related adverse effects') ||
    s.includes('clinical response varies based') ||
    s.includes('use with caution in patients')
  )
}

// ── Drug class templates ───────────────────────────────────────────

export const CLASS_TEMPLATES = {

  // ═══════════════════════════════════════════════════════════════════
  // ANTI-INFECTIVES — Antibacterials
  // ═══════════════════════════════════════════════════════════════════

  'Penicillin': {
    moa: 'Bactericidal: inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins (PBPs), blocking transpeptidation and peptidoglycan cross-linking.',
    pk: 'Absorption: well absorbed orally (except penicillin G). Distribution: widespread, poor CNS penetration. Half-life: 30-90 min. Metabolism: hepatic. Excretion: renal (tubular secretion).',
    bbw: [],
    pearls: ['Complete full course even if symptoms improve', 'Take amoxicillin with food to reduce GI upset', 'Probenecid blocks renal excretion to prolong levels', 'Penicillin allergy cross-reactivity with cephalosporins <5%', 'Monitor for rash in mononucleosis patients on amoxicillin'],
    warnings: ['Serious hypersensitivity (anaphylaxis) occurs in 0.01% of patients', 'Cross-allergenicity with cephalosporins', 'High doses may cause neurotoxicity in renal impairment', 'Pseudomembranous colitis with prolonged therapy'],
    overdose: 'Symptoms: nausea, vomiting, diarrhea, seizures (high doses). Management: supportive care, activated charcoal, hemodialysis. No specific antidote.',
    preg: 'B', brands: ['Amoxicillin', 'Amoxil', 'Pen-V', 'Amoxicillin/Clavulanate'],
  },

  'Cephalosporin': {
    moa: 'Bactericidal: inhibits bacterial cell wall synthesis by binding to PBPs, disrupting peptidoglycan cross-linking. Spectrum varies by generation.',
    pk: 'Absorption: variable (oral 1st/2nd gen, IV 3rd/4th gen). Distribution: widespread, 3rd gen penetrate CSF. Half-life: 1-8h. Metabolism: minimal. Excretion: renal.',
    bbw: ['Ceftriaxone: do not mix with calcium-containing IV solutions in neonates — fatal precipitates'],
    pearls: ['1st gen: good Gram-positive; 2nd gen: expanded Gram-negative; 3rd gen: broad including Pseudomonas', 'Ceftriaxone once-daily simplifies outpatient therapy', 'Cross-allergy with penicillins ~5-10% if prior IgE-mediated reaction', 'Cefepime (4th gen) covers both Gram-positive and Pseudomonas', 'Monitor for superinfection with prolonged use'],
    warnings: ['Hypersensitivity cross-reactivity with penicillins', 'Ceftriaxone may cause biliary pseudolithiasis', 'Cefepime neurotoxicity in renal impairment', 'Bleeding with cefotetan/cefoxitin (hypoprothrombinemia)'],
    overdose: 'Symptoms: nausea, vomiting, seizures (cefepime). Management: supportive care, hemodialysis. No specific antidote.',
    preg: 'B', brands: ['Ceftriaxone', 'Cefixime', 'Cefuroxime', 'Cefepime', 'Cephalexin'],
  },

  'Carbapenem': {
    moa: 'Bactericidal: broad-spectrum PBP binding with stability against most beta-lactamases including ESBLs and AmpC. Inhibits cell wall synthesis.',
    pk: 'Absorption: IV only (imipenem requires cilastatin to prevent renal dehydropeptidase degradation). Distribution: widespread including CSF (meningitis). Half-life: 1-2h. Metabolism: renal (imipenem), hepatic (meropenem, doripenem). Excretion: renal.',
    bbw: [],
    pearls: ['Imipenem/cilastatin: broadest spectrum, but seizure risk higher than meropenem', 'Meropenem: lower seizure risk, covers Pseudomonas, safe in renal impairment with dose adjust', 'Doripenem: extended infusion (4h) optimizes PK/PD for Pseudomonas', 'Do not use for MRSA or viruses', 'Reserved for ESBL-producing organisms — antimicrobial stewardship'],
    warnings: ['Seizures (imipenem > meropenem — 3x higher risk)', 'Hypersensitivity (cross-reactivity with penicillins ~1-2%)', 'GI disturbances: nausea, diarrhea, C. difficile risk', 'Clostridioides difficile infection', 'Myoclonus and CNS toxicity in renal impairment'],
    overdose: 'Symptoms: seizures, nausea, vomiting, diarrhea. Management: supportive care, benzodiazepines for seizures, hemodialysis. No specific antidote.',
    preg: 'C', brands: ['Imipenem/Cilastatin', 'Meropenem', 'Doripenem', 'Ertapenem'],
  },

  'Macrolide': {
    moa: 'Bacteriostatic: binds to 50S ribosomal subunit (23S rRNA), inhibiting bacterial protein synthesis by blocking peptide chain elongation. Also has immunomodulatory and anti-inflammatory effects.',
    pk: 'Absorption: well absorbed orally. Distribution: excellent tissue penetration (concentrates in macrophages, PMNs). Half-life: azithromycin 68h (tissue), clarithromycin 3-7h, erythromycin 1.5h. Metabolism: hepatic (CYP3A4). Excretion: biliary/feces.',
    bbw: [],
    pearls: ['Azithromycin: short 3-5 day course due to long tissue half-life; single 1g dose for chlamydia', 'Clarithromycin: potent CYP3A4 inhibitor — check drug interactions', 'Azithromycin: QTc prolongation risk — caution with other QT drugs', 'Erythromycin: motilin agonist — used for gastroparesis', 'Macrolides first-line for MAC prophylaxis'],
    warnings: ['QTc prolongation (especially erythromycin, azithromycin)', 'Cholestatic hepatitis (erythromycin estolate)', 'Clarithromycin contraindicated with colchicine (fatal toxicity)', 'Hearing loss (reversible, high-dose IV erythromycin)', 'GI upset: nausea, vomiting, diarrhea'],
    overdose: 'Symptoms: nausea, vomiting, diarrhea, hearing loss, QT prolongation. Management: supportive care, ECG monitoring. No specific antidote.',
    preg: 'B', brands: ['Azithromycin', 'Clarithromycin', 'Erythromycin', 'Roxithromycin'],
  },

  'Fluoroquinolone': {
    moa: 'Bactericidal: inhibits DNA gyrase (topoisomerase II) and topoisomerase IV, preventing bacterial DNA replication and transcription. Concentration-dependent killing.',
    pk: 'Absorption: excellent oral bioavailability (90-100%). Distribution: widespread including prostate, lungs, urine. Half-life: ciprofloxacin 4h, levofloxacin 6-8h, moxifloxacin 12h. Metabolism: hepatic (partial). Excretion: renal (cipro, levo), hepatic (moxi).',
    bbw: ['Tendinitis and tendon rupture risk (especially >60yo, corticosteroids)', 'May exacerbate myasthenia gravis', 'Peripheral neuropathy potentially irreversible', 'CNS effects including seizures'],
    pearls: ['Absorption reduced by dairy, antacids, iron — separate by 2h', 'Ciprofloxacin: best anti-pseudomonal fluoroquinolone', 'Levofloxacin: respiratory fluoroquinolone (good S. pneumoniae coverage)', 'Tendon rupture can occur months after stopping', 'Avoid in children <18 except for serious infections (anthrax, CF)'],
    warnings: ['Tendonitis/tendon rupture — discontinue at first sign', 'QT prolongation (moxifloxacin highest risk)', 'CNS effects: dizziness, confusion, seizures', 'Photosensitivity — avoid UV exposure', 'Dysglycemia in diabetics on oral hypoglycemics'],
    overdose: 'Symptoms: nausea, vomiting, dizziness, seizures, QT prolongation. Management: supportive care, ECG monitoring. No specific antidote. Hemodialysis removes cipro/levo.',
    preg: 'C', brands: ['Ciprofloxacin', 'Levofloxacin', 'Moxifloxacin', 'Norfloxacin', 'Ofloxacin'],
  },

  'Tetracycline': {
    moa: 'Bacteriostatic: binds to 30S ribosomal subunit, blocking aminoacyl-tRNA binding. Also anti-inflammatory and anti-collagenase effects.',
    pk: 'Absorption: good oral absorption but chelated by divalent/trivalent cations. Half-life: doxycycline 18-22h, minocycline 11-17h, tetracycline 6-12h. Metabolism: hepatic (partial). Excretion: renal (tetracycline), biliary (doxycycline — safe in renal impairment).',
    bbw: [],
    pearls: ['Doxycycline: DOC for rickettsial infection, MRSA SSTI, malaria prophylaxis', 'Take with full glass of water, remain upright 30 min', 'Anti-inflammatory effects useful in rosacea', 'Minocycline: vestibular effects (dizziness) more common in women', 'Doxycycline: alternative to hydroxychloroquine for malaria prophylaxis'],
    warnings: ['Photosensitivity — severe sunburn', 'Esophageal ulceration — take with water, remain upright', 'Tooth discoloration in children <8 and pregnancy', 'Hepatotoxicity (IV tetracycline in pregnancy)', 'Minocycline: drug-induced lupus, autoimmune hepatitis'],
    overdose: 'Symptoms: nausea, vomiting, epigastric pain. Management: supportive care, do not induce emesis. No specific antidote.',
    preg: 'D', brands: ['Doxycycline', 'Minocycline', 'Tetracycline', 'Oxytetracycline'],
  },

  'Aminoglycoside': {
    moa: 'Bactericidal: irreversibly binds 30S ribosomal subunit, causing mRNA misreading and inhibiting protein synthesis. Concentration-dependent killing with post-antibiotic effect.',
    pk: 'Absorption: negligible orally, IM/IV for systemic infections. Distribution: extracellular fluid. Half-life: 2-4h (prolonged in renal impairment). Metabolism: minimal. Excretion: renal (>95% unchanged).',
    bbw: ['Nephrotoxicity and ototoxicity (both cochlear and vestibular, may be irreversible)', 'Neuromuscular blockade risk — caution in myasthenia gravis'],
    pearls: ['Once-daily extended-interval dosing reduces toxicity', 'Monitor trough: gentamicin <1 mcg/mL, amikacin <5 mcg/mL', 'Ototoxicity may be irreversible — baseline audiometry', 'Synergistic with beta-lactams against Pseudomonas', 'Contraindicated in pregnancy except life-threatening infections'],
    warnings: ['Nephrotoxicity — risk increased with loop diuretics, vancomycin', 'Vestibular ototoxicity', 'Neuromuscular blockade — avoid concurrent NMB agents', 'Monitor I/O, creatinine, trough levels'],
    overdose: 'Symptoms: renal failure, ototoxicity, neuromuscular blockade. Management: supportive care, hemodialysis, calcium gluconate for NMB reversal.',
    preg: 'D', brands: ['Gentamicin', 'Amikacin', 'Tobramycin', 'Streptomycin', 'Neomycin'],
  },

  'Nitroimidazole': {
    moa: 'Bactericidal: reduced intracellularly to reactive intermediates damaging bacterial DNA. Active against anaerobes and protozoa (Giardia, Trichomonas, Entamoeba).',
    pk: 'Absorption: excellent oral bioavailability >90%. Distribution: widespread including CNS, bone, abscesses. Half-life: 8h. Metabolism: hepatic. Excretion: renal (60-80%).',
    bbw: [],
    pearls: ['IV and oral bioequivalent — switch when patient tolerates oral', 'Avoid alcohol during and 48h after (disulfiram-like reaction)', 'Metallic taste common but harmless', 'DOC for C. difficile colitis (oral vancomycin alternative)', 'Tinidazole: single-dose for trichomoniasis'],
    warnings: ['Disulfiram-like reaction with alcohol', 'CNS: peripheral neuropathy, seizures (prolonged high doses)', 'QT prolongation', 'Neutropenia with prolonged therapy'],
    overdose: 'Symptoms: nausea, vomiting, ataxia, seizures. Management: supportive care, hemodialysis. No specific antidote.',
    preg: 'B', brands: ['Metronidazole', 'Flagyl', 'Tinidazole', 'Fasigyn'],
  },

  'Sulfonamide': {
    moa: 'Bacteriostatic: competitively inhibits bacterial dihydropteroate synthase (PABA antagonist), blocking folic acid synthesis and nucleic acid synthesis.',
    pk: 'Absorption: well absorbed orally. Distribution: widespread including CSF. Half-life: 6-12h. Metabolism: hepatic (acetylation). Excretion: renal.',
    bbw: [],
    pearls: ['Co-trimoxazole (SMX/TMP): DOC for Pneumocystis jirovecii pneumonia, Nocardia', 'Sulfasalazine: metabolized by gut bacteria to active 5-ASA (IBD, RA)', 'Maintain hydration to prevent crystalluria', 'Hypersensitivity risk — avoid if prior sulfonamide allergy', 'Active against MRSA when combined with trimethoprim'],
    warnings: ['SJS/TEN, DRESS syndrome — discontinue at first rash', 'Crystalluria — maintain urine output >1.5L/day', 'Photosensitivity', 'Hemolysis in G6PD deficiency', 'Hepatotoxicity (cholestatic jaundice)'],
    overdose: 'Symptoms: nausea, vomiting, crystalluria, CNS effects. Management: IV fluids, alkalinize urine, supportive care. No specific antidote.',
    preg: 'C', brands: ['Sulfamethoxazole/Trimethoprim', 'Co-trimoxazole', 'Sulfasalazine', 'Sulfadiazine'],
  },

  'Urinary antiseptic': {
    moa: 'Bactericidal: reduced by bacterial flavoproteins to reactive intermediates damaging DNA. Concentrated in urine by tubular secretion.',
    pk: 'Absorption: well absorbed orally (food increases absorption). Distribution: minimal tissue levels, concentrated in urine. Half-life: 20-60 min. Metabolism: hepatic (major). Excretion: renal (40% unchanged).',
    bbw: [],
    pearls: ['Effective only for uncomplicated lower UTI (cystitis)', 'Contraindicated if CrCl <30 mL/min', 'Short 3-5 day courses preferred', 'Take with food to reduce GI upset', 'Not active against Proteus or Pseudomonas'],
    warnings: ['Pulmonary fibrosis (acute or chronic)', 'Peripheral neuropathy (prolonged use, renal impairment)', 'Hepatotoxicity', 'Hemolysis in G6PD deficiency', 'GI intolerance'],
    overdose: 'Symptoms: vomiting, headache, dizziness. Management: supportive care, hemodialysis. No specific antidote.',
    preg: 'B', brands: ['Nitrofurantoin', 'Macrobid', 'Macrodantin'],
  },

  'Lincosamide': {
    moa: 'Bacteriostatic: binds 50S ribosomal subunit, inhibiting protein synthesis. Active against aerobic Gram-positive cocci and anaerobes.',
    pk: 'Absorption: 90% oral bioavailability. Distribution: excellent bone and abscess penetration. Half-life: 2-4h. Metabolism: hepatic. Excretion: renal/biliary.',
    bbw: [],
    pearls: ['Excellent bone penetration — DOC for osteomyelitis', 'Active against MRSA (SSTI)', 'C. difficile risk significantly higher', 'Topical + oral for moderate acne', 'Never use for meningitis (poor CNS penetration)'],
    warnings: ['C. difficile infection risk', 'Neuromuscular blockade potentiation', 'Hypersensitivity', 'Hepatotoxicity (rare)', 'GI intolerance'],
    overdose: 'Symptoms: nausea, vomiting, diarrhea. Management: supportive care. No specific antidote.',
    preg: 'B', brands: ['Clindamycin', 'Dalacin C', 'Lincomycin'],
  },

  'Glycylcycline': {
    moa: 'Bacteriostatic: binds to 30S ribosomal subunit (same as tetracyclines) but designed to overcome tetracycline resistance mechanisms (efflux pumps and ribosomal protection).',
    pk: 'Absorption: IV only. Distribution: widespread. Half-life: 37h (prolonged). Metabolism: hepatic. Excretion: biliary/feces.',
    bbw: [],
    pearls: ['Tigecycline: broad spectrum including MRSA, ESBL producers, anaerobes', 'Not for bloodstream infections (FDA boxed warning — increased mortality)', 'Dose adjust in severe hepatic impairment (Child-Pugh C: reduce dose)', 'Commonly causes nausea and vomiting', 'Use as last resort for MDR infections when other agents fail'],
    warnings: ['Increased all-cause mortality (FDA boxed warning) — not for BSI', 'Nausea and vomiting (up to 30%)', 'Photosensitivity', 'Pancreatitis (rare)', 'Fetal toxicity — avoid in pregnancy'],
    overdose: 'Symptoms: nausea, vomiting. Management: supportive care. No specific antidote. Hemodialysis not effective.',
    preg: 'D', brands: ['Tigecycline', 'Tygacil'],
  },

  'Lipopeptide': {
    moa: 'Bactericidal: binds to lipoteichoic acid (LTA) in the Gram-positive cell membrane, causing rapid depolarization and membrane permeability changes, leading to cell death.',
    pk: 'Absorption: IV only. Distribution: pulmonary epithelial lining fluid (high concentrations). Half-life: 8-10h. Metabolism: minimal. Excretion: renal.',
    bbw: ['Daptomycin: inactivated by pulmonary surfactant — do not use for pneumonia'],
    pearls: ['Daptomycin: once-daily IV for MRSA bacteremia, endocarditis, complicated SSTI', 'Check CPK weekly — discontinue if >5x ULN or symptoms of myopathy', 'Linezolid: alternative for VRE and MRSA pneumonia (only agent for VRE pneumonia)', 'Monitor for eosinophilic pneumonia (rare but serious)', 'Ceftaroline: 5th-gen cephalosporin active against MRSA'],
    warnings: ['Myopathy/CPK elevation — monitor weekly', 'Eosinophilic pneumonia (rare)', 'Peripheral neuropathy (prolonged therapy)', 'Renal impairment — dose adjust if CrCl <30', 'Pulmonary surfactant inactivation (no use in pneumonia)'],
    overdose: 'Symptoms: GI effects, myopathy. Management: supportive care. No specific antidote.',
    preg: 'C', brands: ['Daptomycin', 'Cubicin', 'Linezolid', 'Zyvox', 'Ceftaroline', 'Teflaro'],
  },

  'Oxazolidinone': {
    moa: 'Bacteriostatic: binds to 23S rRNA of the 50S ribosomal subunit, preventing formation of the 70S initiation complex. Unique mechanism — no cross-resistance with other agents.',
    pk: 'Absorption: 100% oral bioavailability (equivalent to IV). Distribution: excellent tissue penetration including lung, bone, CSF. Half-life: 5-7h. Metabolism: minimal (CYP3A4). Excretion: renal (65%) and fecal.',
    bbw: [],
    pearls: ['Linezolid: only oral agent for VRE (E. faecium and E. faecalis)', 'Also covers MRSA pneumonia, complicated SSTI', 'Do not use for >2 weeks without monitoring CBC (myelosuppression)', 'MAO inhibitor activity — avoid tyramine-rich foods and serotonergic drugs', 'Tedizolid: once-daily, fewer drug interactions, less myelosuppression'],
    warnings: ['Thrombocytopenia (dose-dependent, usually >2 weeks)', 'Serotonin syndrome with SSRIs, SNRIs, MAOIs', 'Peripheral neuropathy, optic neuritis (prolonged use)', 'Lactic acidosis (rare)', 'Myelosuppression with prolonged use'],
    overdose: 'Symptoms: nausea, vomiting, headache, visual disturbances. Management: supportive care. No specific antidote. Hemodialysis not effective.',
    preg: 'C', brands: ['Linezolid', 'Zyvox', 'Tedizolid', 'Sivextro'],
  },

  'Phosphonic acid antibiotic': {
    moa: 'Bactericidal: inhibits enolpyruvyl transferase (MurA), blocking the first step of peptidoglycan synthesis in the bacterial cell wall. Also inhibits CDP-diglyceride synthase.',
    pk: 'Absorption: 30-40% oral bioavailability (decreased with food). Distribution: excellent tissue penetration. Half-life: 2-3h (prolonged in renal impairment). Metabolism: minimal. Excretion: renal (>95% unchanged).',
    bbw: [],
    pearls: ['Fosfomycin: single 3g dose for uncomplicated UTI (women)', 'Also active against ESBL-producing E. coli', 'IV fosfomycin: available in some countries for MDR infections', 'Take on empty stomach (food reduces absorption)', 'Synergistic with beta-lactams and aminoglycosides'],
    warnings: ['GI upset (diarrhea, nausea)', 'Headache', 'Dizziness', 'Elevation of transaminases', 'Prolonged use may cause hypokalemia'],
    overdose: 'Symptoms: GI upset, electrolyte disturbances. Management: supportive care, hemodialysis (effective due to renal elimination). No specific antidote.',
    preg: 'B', brands: ['Fosfomycin', 'Monurol', 'Fosmicin'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ANTI-INFECTIVES — Antifungals
  // ═══════════════════════════════════════════════════════════════════

  'Azole antifungal': {
    moa: 'Antifungal: inhibits fungal cytochrome P450 14-alpha-demethylase (CYP51), blocking ergosterol synthesis. Disrupts fungal cell membrane integrity and function.',
    pk: 'Absorption: variable (fluconazole >90%, itraconazole requires acid, posaconazole with fatty food). Distribution: widespread, fluconazole excellent CSF penetration. Half-life: fluconazole 30h, voriconazole 6h, posaconazole 25h. Metabolism: hepatic (CYP2C9, CYP3A4). Excretion: renal (fluconazole), hepatic (others).',
    bbw: [],
    pearls: ['Fluconazole: excellent CSF penetration — DOC for cryptococcal meningitis', 'Voriconazole: first-line for invasive aspergillosis', 'Fluconazole 150mg single dose for vaginal candidiasis', 'Itraconazole: requires acidic gastric pH (take with cola on PPI)', 'All azoles inhibit CYP enzymes — check drug interactions'],
    warnings: ['Hepatotoxicity — monitor LFTs', 'QT prolongation (fluconazole >400mg/day)', 'Voriconazole: visual disturbances (reversible)', 'Itraconazole: negative inotropic effect (avoid in HF)', 'Fetal harm (fluconazole high doses in first trimester)'],
    overdose: 'Symptoms: nausea, vomiting, headache. Management: supportive care. No specific antidote.',
    preg: 'D', brands: ['Fluconazole', 'Itraconazole', 'Voriconazole', 'Posaconazole', 'Isavuconazole'],
  },

  'Polyene antifungal': {
    moa: 'Antifungal: binds directly to ergosterol in the fungal cell membrane, forming pores that cause leakage of intracellular contents (K+, Na+, small molecules), leading to cell death. Fungicidal.',
    pk: 'Absorption: negligible orally (nystatin topical only). Distribution: amphotericin B distributes to most tissues (poor CSF). Half-life: amphotericin B 24-48h (terminal phase 15 days). Metabolism: minimal. Excretion: renal (slow, persistent tissue levels).',
    bbw: ['Amphotericin B deoxycholate: serious infusion reactions (fever, chills, rigors) and nephrotoxicity — pre-hydrate with NS, consider lipid formulations'],
    pearls: ['Amphotericin B: broadest antifungal spectrum (Aspergillus, Candida, Mucor, Cryptococcus, Histoplasma)', 'Lipid formulations (AmBisome) reduce nephrotoxicity by 75%', 'Pre-hydrate with 1L NS before infusion, acetaminophen/diphenhydramine for infusion reactions', 'Nystatin: topical only for mucosal candidiasis (oral thrush, vulvovaginal)', 'Monitor K+, Mg2+, creatinine, CBC every 2-3 days during therapy'],
    warnings: ['Nephrotoxicity (dose-limiting) — monitor creatinine daily', 'Hypokalemia, hypomagnesemia — supplement aggressively', 'Infusion-related reactions (fever, chills, rigors, hypotension)', 'Anemia (erythropoietin suppression)', 'Hepatotoxicity (rare)'],
    overdose: 'Symptoms: severe infusion reactions, renal failure, electrolyte disturbances. Management: supportive care, aggressive hydration, electrolyte replacement.',
    preg: 'B', brands: ['Amphotericin B', 'AmBisome', 'Abelcet', 'Nystatin'],
  },

  'Echinocandin': {
    moa: 'Antifungal: inhibits beta-(1,3)-D-glucan synthase, disrupting fungal cell wall synthesis. Fungicidal against Candida, fungistatic against Aspergillus. No effect on mammalian cells (no glucan in human cells).',
    pk: 'Absorption: IV only. Distribution: tissue concentrations exceed serum. Half-life: caspofungin 9-11h, micafungin 11-14h, anidulafungin 24-30h. Metabolism: hepatic (not CYP-dependent). Excretion: hepatic/biliary.',
    bbw: [],
    pearls: ['First-line for invasive candidiasis and candidemia', 'No oral formulation (IV only)', 'Caspofungin: loading dose 70mg then 50mg daily', 'Very few drug interactions (not CYP-dependent)', 'Histamine-mediated infusion reactions (rare, slower infusion helps)'],
    warnings: ['Infusion-related reactions (histamine-mediated)', 'Hepatotoxicity (transaminase elevation)', 'Hypokalemia', 'Histamine-mediated flushing, rash, hypotension', 'Few drug interactions — safe with most medications'],
    overdose: 'Symptoms: nausea, vomiting, headache. Management: supportive care. No specific antidote.',
    preg: 'C', brands: ['Caspofungin', 'Cancidas', 'Micafungin', 'Mycamine', 'Anidulafungin', 'Eraxis'],
  },

  'Allylamine antifungal': {
    moa: 'Antifungal: inhibits squalene epoxidase (terbinafine) or geranylgeranyl transferase (naftifine), blocking ergosterol synthesis. Fungicidal against dermatophytes.',
    pk: 'Absorption: oral bioavailability >70% (terbinafine). Distribution: concentrates in skin, nails, adipose tissue. Half-life: 16-17h (accumulates in nails for weeks). Metabolism: hepatic (CYP2D6). Excretion: renal/fecal.',
    bbw: [],
    pearls: ['Terbinafine: DOC for dermatophyte onychomycosis (pulse or continuous)', 'First-line for tinea capitis in children (griseofulvin alternative)', 'Topical terbinafine 1% cream: effective for Tinea pedis, corporis, cruris', 'Hepatotoxicity: check LFTs if therapy >6 weeks', 'Fingernail: 6 weeks; Toenail: 12 weeks treatment course'],
    warnings: ['Hepatotoxicity (rare but can be serious) — check LFTs if >6 weeks', 'Taste disturbance (reversible, common)', 'GI upset (nausea, diarrhea)', 'Headache', 'Stevens-Johnson syndrome (very rare)'],
    overdose: 'Symptoms: GI upset, headache, dizziness. Management: supportive care. No specific antidote.',
    preg: 'B', brands: ['Terbinafine', 'Lamisil', 'Naftifine', 'Naftin'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ANTI-INFECTIVES — Antivirals & Antiretrovirals
  // ═══════════════════════════════════════════════════════════════════

  'Antiviral (nucleoside)': {
    moa: 'Antiviral: phosphorylated intracellularly to triphosphate, which competitively inhibits viral DNA polymerase and/or RNA-dependent RNA polymerase, causing chain termination. Active against HSV, VZV, CMV, HBV, HCV depending on agent.',
    pk: 'Absorption: variable (acyclovir 15-30%, valacyclovir 54-70%, entecavir 36%, sofosbuvir ~60%). Distribution: widespread. Half-life: acyclovir 2.5h, valacyclovir 2.5h, ganciclovir 2-4h, entecavir 15h, sofosbuvir 0.5h (metabolite 27h). Metabolism: hepatic (varies). Excretion: renal.',
    bbw: [],
    pearls: ['Acyclovir/valacyclovir: DOC for HSV and VZV infections', 'Valacyclovir: better bioavailability than acyclovir (same active metabolite)', 'Ganciclovir: DOC for CMV retinitis — bone marrow suppressive', 'Sofosbuvir: HCV NS5B polymerase inhibitor — backbone of HCV cure', 'Dose adjust all antivirals in renal impairment'],
    warnings: ['Acyclovir: nephrotoxicity (crystalluria) — hydrate well', 'Ganciclovir: bone marrow suppression (neutropenia, thrombocytopenia)', 'Valacyclovir: TTP/HUS in immunocompromised at high doses', 'Sofosbuvir: bradycardia with amiodarone', 'Pancreatitis (didanosine, stavudine — older NRTIs)'],
    overdose: 'Symptoms: nausea, headache, confusion, seizures (acyclovir), renal failure. Management: supportive care, hemodialysis. No specific antidote.',
    preg: 'B', brands: ['Acyclovir', 'Valacyclovir', 'Ganciclovir', 'Entecavir', 'Sofosbuvir', 'Tenofovir'],
  },

  'Protease inhibitor (antiviral)': {
    moa: 'Protease inhibitor: inhibits viral aspartyl protease (HIV protease, HCV NS3/4A protease), preventing viral polyprotein processing and maturation. Results in immature, non-infectious viral particles.',
    pk: 'Absorption: varies (ritonavir boosting improves levels of other PIs). Distribution: widespread. Half-life: varies (lopinavir 5-6h, darunavir 15h, atazanavir 7h). Metabolism: hepatic (CYP3A4, ritonavir/cobicistat inhibits CYP3A4 for boosting). Excretion: fecal (majority).',
    bbw: [],
    pearls: ['Ritonavir/cobicistat: pharmacokinetic "boosters" — inhibit CYP3A4 to increase PI levels', 'Darunavir/cobicistat: preferred PI (high genetic barrier to resistance)', 'Atazanavir: once-daily PI but may cause jaundice/hyperbilirubinemia', 'HCV PIs (glecaprevir, grazoprevir): with NS5A inhibitors for HCV cure', 'Take with food to improve absorption (most PIs)'],
    warnings: ['Hyperlipidemia (triglycerides, LDL)', 'Hepatotoxicity — monitor LFTs', 'Hyperbilirubinemia (atazanavir)', 'GI intolerance (nausea, diarrhea)', 'CYP3A4 interactions (many contraindicated drugs)'],
    overdose: 'Symptoms: GI upset, lipodystrophy, hyperlipidemia. Management: supportive care. No specific antidote.',
    preg: 'B', brands: ['Darunavir', 'Prezista', 'Atazanavir', 'Reyataz', 'Lopinavir', 'Kaletra', 'Glecaprevir', 'Mavyret'],
  },

  'NNRTI (non-nucleoside RTI)': {
    moa: 'Non-nucleoside reverse transcriptase inhibitor: binds directly and non-competitively to HIV reverse transcriptase, inducing conformational change that inhibits enzyme activity.',
    pk: 'Absorption: well absorbed orally. Distribution: widespread. Half-life: efavirenz 40-55h, rilpivirine 45-50h, doravirine 15h, etravirine 9h. Metabolism: hepatic (CYP2B6, CYP3A4). Excretion: renal (minimal).',
    bbw: ['Efavirenz: psychiatric symptoms (depression, suicide risk, psychosis)', 'Rilpivirine: must be taken with a meal (>400 kcal), not for VL >100,000'],
    pearls: ['Efavirenz: CNS effects (vivid dreams, dizziness) common first 2-4 weeks', 'Doravirine: newest NNRTI — better tolerability, fewer drug interactions', 'Low genetic barrier to resistance — single mutation confers cross-class resistance', 'NNRTI-based regimens alternatives when INSTIs contraindicated', 'Etravirine: second-generation, active against some NNRTI-resistant strains'],
    warnings: ['CYP interactions: NNRTIs are CYP inducers (reduce OCP, warfarin)', 'Efavirenz: CNS effects (dizziness, insomnia, abnormal dreams)', 'Rash: mild-moderate common; severe SJS/TEN possible', 'Hyperlipidemia (efavirenz)', 'Neuropsychiatric effects (depression, hallucinations)'],
    overdose: 'Symptoms: CNS effects (confusion, hallucinations). Management: supportive care. No specific antidote.',
    preg: 'C', brands: ['Efavirenz', 'Sustiva', 'Rilpivirine', 'Edurant', 'Doravirine', 'Pifeltro', 'Etravirine'],
  },

  'INSTI (integrase strand transfer inhibitor)': {
    moa: 'Inhibits HIV integrase by binding to the integrase active site, blocking strand transfer of viral DNA into the host genome. Prevents proviral DNA formation.',
    pk: 'Absorption: well absorbed orally. Distribution: widespread. Half-life: dolutegravir 14h, bictegravir 17h, cabotegravir 40 days (IM), raltegravir 9h. Metabolism: hepatic (UGT1A1 for DTG, CYP3A4 for EVG). Excretion: feces/renal.',
    bbw: [],
    pearls: ['High genetic barrier to resistance — preferred first-line ART', 'Dolutegravir: double dose (50mg BID) with rifampicin', 'Bictegravir: part of Biktarvy (single-tablet regimen)', 'Cabotegravir: long-acting IM every 2 months for PrEP and ART', 'INSTIs: fewer drug interactions than NNRTIs and PIs'],
    warnings: ['Neural tube defects with dolutegravir at conception (small absolute risk)', 'Weight gain more with INSTIs than other classes', 'Insomnia and headache (dolutegravir)', 'Cabotegravir: injection site reactions', 'Hypersensitivity (raltegravir — rare)'],
    overdose: 'Symptoms: nausea, headache, fatigue. Management: supportive care. No specific antidote.',
    preg: 'B', brands: ['Dolutegravir', 'Bictegravir', 'Cabotegravir', 'Raltegravir', 'Elvitegravir'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ANTI-INFECTIVES — Antimycobacterials
  // ═══════════════════════════════════════════════════════════════════

  'Antimycobacterial': {
    moa: 'Bactericidal: rifampicin inhibits DNA-dependent RNA polymerase; isoniazid inhibits mycolic acid synthesis; ethambutol inhibits arabinosyl transferase; pyrazinamide disrupts membrane energetics.',
    pk: 'Absorption: well absorbed orally. Distribution: widespread including CSF. Half-life: rifampicin 3-5h, INH 1-4h (acetylator-dependent), ethambutol 3-4h, PZA 9-10h. Metabolism: hepatic. Excretion: renal/biliary.',
    bbw: ['Rifampicin: severe hepatotoxicity — monitor LFTs', 'Isoniazid: severe/fatal hepatitis — discontinue if ALT >3-5x ULN'],
    pearls: ['RIPE therapy: INH + RIF + PZA (2 months) then INH + RIF (4 months) for drug-susceptible TB', 'INH: co-administer pyridoxine 10-25mg/day (prevent neuropathy)', 'Rifampicin: potent CYP3A4 inducer — reduces OCPs, warfarin, ARVs, many drugs', 'Ethambutol: monthly visual acuity/color vision testing mandatory', 'PZA: hyperuricemia common (gout rare); intensive phase only (2 months)'],
    warnings: ['Hepatotoxicity (all first-line agents) — monitor LFTs', 'Orange-red body fluids (rifampicin) — warn patients', 'Optic neuritis (ethambutol) — dose/duration dependent', 'Peripheral neuropathy (INH) — preventable with pyridoxine', 'Hypersensitivity including DRESS syndrome'],
    overdose: 'INH: seizures (GABA depletion), metabolic acidosis, coma — pyridoxine IV is antidote. RIF: hepatotoxicity. Management: AC, pyridoxine for INH overdose.',
    preg: 'C', brands: ['Rifampicin', 'Isoniazid', 'Ethambutol', 'Pyrazinamide', 'Rifabutin', 'Rifapentine'],
  },

  'Antileprotic': {
    moa: 'Varies by agent: dapsone inhibits dihydropteroate synthase (folate pathway); rifampicin inhibits RNA polymerase; clofazimine binds to mycobacterial DNA; thalidomide immunomodulatory.',
    pk: 'Absorption: well absorbed orally. Distribution: widespread (dapsone concentrates in skin). Half-life: dapsone 24-48h, rifampicin 3-5h, clofazimine 70 days. Metabolism: hepatic. Excretion: renal/biliary.',
    bbw: ['Thalidomide: severe birth defects — REMS program required for women of childbearing potential'],
    pearls: ['MDT (multidrug therapy) WHO-recommended for leprosy: rifampicin + dapsone + clofazimine', 'Dapsone: monitor for hemolysis (G6PD deficiency), methemoglobinemia', 'Clofazimine: orange-red skin discoloration (reversible)', 'Thalidomide: used for ENL (erythema nodosum leprosum)', 'Long treatment courses (6-12 months PB, 12 months MB)'],
    warnings: ['Hemolysis (dapsone) — check G6PD before starting', 'Hepatotoxicity (dapsone, rifampicin)', 'Orange-red discoloration (clofazimine)', 'Peripheral neuropathy (thalidomide)', 'Teratogenicity (thalidomide) — severe birth defects'],
    overdose: 'Symptoms: hemolysis, methemoglobinemia (dapsone), nausea, vomiting. Management: methylene blue 1-2mg/kg IV for methemoglobinemia, supportive care.',
    preg: 'C', brands: ['Dapsone', 'Rifampicin', 'Clofazimine', 'Thalidomide'],
  },

  'Antiprotozoal': {
    moa: 'Varies by agent: metronidazole disrupts DNA; chloroquine inhibits hemozoin; pentamidine interferes with DNA/RNA synthesis; suramin inhibits glycolytic enzymes; miltefosine disrupts cell membranes.',
    pk: 'Absorption: varies by agent. Distribution: widespread. Half-life: metronidazole 8h, chloroquine 30-60 days, pentamidine 6-8h. Metabolism: hepatic. Excretion: renal.',
    bbw: [],
    pearls: ['Metronidazole: DOC for amoebiasis, giardiasis, trichomoniasis', 'Pentamidine: IV for visceral leishmaniasis and Pneumocystis (alternative)', 'Miltefosine: first oral drug for visceral leishmaniasis', 'Avoid alcohol with metronidazole (disulfiram-like reaction)', 'Chloroquine-resistant malaria: use ACT (artemether-lumefantrine)'],
    warnings: ['Metronidazole: metallic taste, disulfiram-like reaction with alcohol', 'Pentamidine: nephrotoxicity, hypoglycemia (pancreatic damage)', 'Chloroquine: retinopathy (cumulative), cardiotoxicity', 'GI upset (most agents)', 'Hepatotoxicity (variable by agent)'],
    overdose: 'Symptoms: varies by agent. Metronidazole: seizures, neuropathy. Chloroquine: cardiac arrest, seizures. Management: supportive care, specific antidotes where available.',
    preg: 'C', brands: ['Metronidazole', 'Chloroquine', 'Pentamidine', 'Miltefosine', 'Suramin'],
  },

  'Anthelmintic': {
    moa: 'Anthelmintic: albendazole/mebendazole inhibit tubulin polymerization (glucose uptake); praziquantel increases membrane permeability to Ca2+ (muscle contraction); ivermectin binds GluCl channels (paralysis); diethylcarbamazine inhibits microfilarial motility.',
    pk: 'Absorption: variable (albendazole 1% when fasting, increased with fatty meal; mebendazole 5-10%; praziquantel 80%). Distribution: varies (albendazole: CNS cysts; ivermectin: widely distributed). Half-life: albendazole 8-12h, praziquantel 1-3h, ivermectin 18h. Metabolism: hepatic. Excretion: renal/biliary.',
    bbw: [],
    pearls: ['Albendazole 400mg single dose: WHO soil-transmitted helminth treatment', 'Praziquantel: DOC for schistosomiasis (single dose 40mg/kg)', 'Ivermectin: DOC for onchocerciasis (river blindness) and strongyloidiasis', 'Mebendazole: broad-spectrum STH treatment (but poor absorption)', 'Diethylcarbamazine: DOC for lymphatic filariasis (Wuchereria)'],
    warnings: ['Albendazole: teratogenic — avoid in pregnancy (first trimester)', 'Praziquantel: neurocysticercosis may cause CNS inflammation (give steroids)', 'Ivermectin: Mazzotti reaction (dying microfilariae — fever, pruritus, hypotension)', 'Hepatotoxicity (albendazole)', 'GI upset (most agents)'],
    overdose: 'Symptoms: GI upset, dizziness, headache. Management: supportive care. No specific antidote for most.',
    preg: 'C', brands: ['Albendazole', 'Mebendazole', 'Praziquantel', 'Ivermectin', 'Diethylcarbamazine', 'Niclosamide'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // CARDIOVASCULAR
  // ═══════════════════════════════════════════════════════════════════

  'ACE inhibitor': {
    moa: 'Competitively inhibits angiotensin-converting enzyme, preventing conversion of angiotensin I to angiotensin II. Reduces vasoconstriction, aldosterone secretion, and bradykinin degradation.',
    pk: 'Absorption: variable (prodrugs need hepatic activation). Distribution: widespread. Half-life: varies (captopril 2h, enalapril 11h, lisinopril 12h, ramipril 13-17h). Metabolism: hepatic (prodrug activation). Excretion: renal.',
    bbw: ['DO NOT USE IN PREGNANCY — fetal injury and death (oligohydramnios, renal failure, craniofacial malformations)'],
    pearls: ['First-line for hypertension, HFrEF, post-MI, diabetic nephropathy', 'Monitor K+ and creatinine 1-2 weeks after starting or dose increase', 'Dry cough 5-20% (bradykinin-mediated) — switch to ARB if intolerable', 'Angioedema 0.1-0.7%, more common in African descent — permanent discontinuation', 'Add diuresis in HF for optimal response'],
    warnings: ['Angioedema (can occur anytime even after years) — discontinue permanently', 'Hyperkalemia — especially with renal impairment, K+ supplements, K-sparing diuretics', 'Acute kidney injury (bilateral renal artery stenosis)', 'First-dose hypotension (especially in HF, volume-depleted)', 'Dry cough — often mistaken for respiratory infection'],
    overdose: 'Symptoms: severe hypotension, acute renal failure, hyperkalemia. Management: IV saline, vasopressors, angiotensin II if available. Hemodialysis removes some.',
    preg: 'D', brands: ['Enalapril', 'Lisinopril', 'Ramipril', 'Captopril', 'Perindopril', 'Benazepril'],
  },

  'ARB': {
    moa: 'Selectively blocks angiotensin II type 1 (AT1) receptors, preventing vasoconstriction, aldosterone secretion, sodium retention, and cellular proliferation. Does not affect bradykinin.',
    pk: 'Absorption: well absorbed (70-80%). Distribution: widespread. Half-life: losartan 2h (active metabolite 6-9h), valsartan 6h, candesartan 9h, telmisartan 24h. Metabolism: hepatic (CYP2C9). Excretion: renal/biliary.',
    bbw: ['DO NOT USE IN PREGNANCY — fetal injury and death (same mechanism as ACE inhibitors)'],
    pearls: ['Alternative when ACE inhibitors cause cough', 'Losartan: active metabolite 10-40x more potent, uricosuric effect', 'First-line for diabetic nephropathy (type 2 DM with proteinuria)', 'Candesartan: best evidence for HFrEF among ARBs', 'Telmisartan: longest half-life, once-daily dosing'],
    warnings: ['Hyperkalemia', 'Acute kidney injury (bilateral renal artery stenosis)', 'Fetal toxicity', 'First-dose hypotension (less than ACE inhibitors)', 'Angioedema (rare but reported)'],
    overdose: 'Symptoms: hypotension, dizziness, bradycardia. Management: IV fluids, vasopressors. No specific antidote.',
    preg: 'D', brands: ['Losartan', 'Valsartan', 'Candesartan', 'Irbesartan', 'Telmisartan'],
  },

  'Calcium channel blocker': {
    moa: 'Blocks L-type calcium channels. Dihydropyridines (amlodipine, nifedipine) preferentially vasodilate. Non-dihydropyridines (verapamil, diltiazem) also reduce heart rate and contractility.',
    pk: 'Absorption: well absorbed. Distribution: widespread, >90% protein bound. Half-life: amlodipine 30-50h, nifedipine 2-5h, verapamil 4-12h, diltiazem 4-6h. Metabolism: hepatic (CYP3A4). Excretion: renal.',
    bbw: ['Verapamil/diltiazem + beta-blockers: severe bradycardia, heart block, heart failure'],
    pearls: ['Amlodipine: most common CCB, once-daily, few CYP interactions', 'Amlodipine: peripheral edema — add ACEi/ARB to reduce', 'Verapamil/diltiazem: rate control in atrial fibrillation', 'Avoid grapefruit (CYP3A4 inhibition)', 'Nifedipine IR: avoid for hypertension (increased mortality)'],
    warnings: ['Peripheral edema (dose-dependent, dihydropyridines)', 'Headache, flushing, dizziness', 'Gingival hyperplasia', 'Constipation (verapamil)', 'Hepatotoxicity (rare)'],
    overdose: 'Symptoms: hypotension, bradycardia, AV block, hyperglycemia. Management: IV calcium gluconate, atropine, vasopressors, pacing. Multiple doses may be needed.',
    preg: 'C', brands: ['Amlodipine', 'Nifedipine', 'Verapamil', 'Diltiazem', 'Felodipine'],
  },

  'Beta-blocker (cardioselective)': {
    moa: 'Competitively blocks beta-1 adrenergic receptors predominantly in cardiac muscle, reducing heart rate, contractility, and myocardial oxygen demand.',
    pk: 'Absorption: well absorbed. Half-life: metoprolol 3-7h, bisoprolol 10-12h, atenolol 6-7h. Metabolism: hepatic (CYP2D6 for metoprolol). Excretion: renal (atenolol, bisoprolol), hepatic (metoprolol).',
    bbw: ['Do not abruptly discontinue — taper over 2-4 weeks to avoid rebound hypertension/tachycardia/MI'],
    pearls: ['Bisoprolol and metoprolol succinate: evidence-based for HFrEF (CIBIS-II, MERIT-HF)', 'Cardioselectivity is dose-dependent — lost at higher doses', 'Mask hypoglycemia symptoms (except sweating) in diabetics', 'Atenolol: renal elimination — less effective in CV outcomes than metoprolol', 'Nebivolol: third-generation, NO-mediated vasodilation, fewest side effects'],
    warnings: ['Bradycardia, heart block', 'Hypotension, fatigue, dizziness', 'Worsening of asthma/COPD (at high doses)', 'Depression, vivid dreams, insomnia', 'Cold extremities (beta-2 blockade at high doses)'],
    overdose: 'Symptoms: severe bradycardia, hypotension, AV block, seizures, hypoglycemia. Management: atropine, glucagon 3-10mg IV, norepinephrine, temporary pacing.',
    preg: 'C', brands: ['Bisoprolol', 'Metoprolol', 'Atenolol', 'Nebivolol', 'Betaxolol'],
  },

  'Beta-blocker (non-selective)': {
    moa: 'Blocks both beta-1 (cardiac) and beta-2 (bronchial/vascular) receptors. Carvedilol also blocks alpha-1 receptors (vasodilation).',
    pk: 'Absorption: well absorbed. Half-life: propranolol 3-6h, carvedilol 6-10h, sotalol 12h. Metabolism: hepatic. Excretion: renal (sotalol), hepatic (others).',
    bbw: ['Do not abruptly discontinue — taper over 2-4 weeks'],
    pearls: ['Carvedilol: gold standard for HFrEF (COPERNICUS, CAPRICORN)', 'Propranolol: only beta-blocker for migraine prophylaxis, also anxiety, tremor, portal hypertension', 'Sotalol: class III antiarrhythmic (QT prolongation risk)', 'Carvedilol: take with food', 'Nadolol: longest half-life among non-selective beta-blockers'],
    warnings: ['Bronchospasm — contraindicated in asthma', 'Bradycardia, heart block', 'Orthostatic hypotension (carvedilol alpha-blockade)', 'Fatigue, sexual dysfunction', 'Mask hypoglycemia'],
    overdose: 'Symptoms: severe bradycardia, hypotension, seizures, bronchospasm. Management: atropine, glucagon, calcium, norepinephrine.',
    preg: 'C', brands: ['Carvedilol', 'Propranolol', 'Sotalol', 'Nadolol', 'Timolol'],
  },

  'Thiazide diuretic': {
    moa: 'Inhibits Na+/Cl- cotransporter in the distal convoluted tubule, increasing sodium and water excretion. Chronic use reduces peripheral vascular resistance (vasodilation).',
    pk: 'Absorption: well absorbed. Half-life: HCTZ 6-15h, chlorthalidone 40-60h, indapamide 14-24h. Metabolism: minimal. Excretion: renal.',
    bbw: [],
    pearls: ['Take in morning (avoid nocturia)', 'Low-dose maximizes BP reduction while minimizing metabolic effects', 'Chlorthalidone: more potent and longer-acting than HCTZ', 'First-line for uncomplicated hypertension (ALLHAT trial)', 'Reduces calcium stones (hypercalciuria)'],
    warnings: ['Hypokalemia (dose-dependent)', 'Hyponatremia (especially elderly)', 'Hyperglycemia', 'Hyperuricemia (precipitate gout)', 'Hyperlipidemia, sexual dysfunction'],
    overdose: 'Symptoms: hypokalemia, hyponatremia, dehydration, hypotension. Management: fluid/electrolyte replacement. No specific antidote.',
    preg: 'B', brands: ['Hydrochlorothiazide', 'Chlorthalidone', 'Indapamide', 'Metolazone'],
  },

  'Loop diuretic': {
    moa: 'Inhibits Na+/K+/2Cl- cotransporter in the thick ascending limb of Henle, producing the most potent diuresis. Also causes venodilation (reduces preload).',
    pk: 'Absorption: 50-60% oral bioavailability. Distribution: highly protein bound (>95%). Half-life: furosemide 1-2h, bumetanide 1-2h, torsemide 3-4h. Metabolism: hepatic. Excretion: renal.',
    bbw: [],
    pearls: ['Bumetanide 1mg = furosemide 40mg = torsemide 20mg (equipotent)', 'Torsemide: more predictable absorption, longer half-life', 'Furosemide ceiling dose 40-80mg IV (doubling beyond doesn\'t increase diuresis)', 'IV furosemide: infuse slowly (max 4mg/min) to avoid ototoxicity', 'Continuous IV infusion may be more effective than bolus in acute HF'],
    warnings: ['Ototoxicity (dose-related, rapid IV, concurrent aminoglycosides)', 'Hypokalemia, hypomagnesemia, hypocalcemia', 'Dehydration, hypotension', 'Hyperuricemia', 'Sulfonamide cross-sensitivity (documented but low risk)'],
    overdose: 'Symptoms: dehydration, hypotension, electrolyte disturbances. Management: fluid/electrolyte replacement. No specific antidote.',
    preg: 'C', brands: ['Furosemide', 'Bumetanide', 'Torsemide', 'Ethacrynic acid'],
  },

  'Potassium-sparing diuretic': {
    moa: 'Spironolactone/eplerenone: aldosterone antagonists in collecting duct. Amiloride/triamterene: block ENaC directly. All reduce K+ and H+ excretion.',
    pk: 'Absorption: well absorbed. Half-life: spironolactone 1.4h (active metabolites 12-20h), eplerenone 4h, amiloride 6-9h. Metabolism: hepatic (spironolactone extensive first-pass). Excretion: renal.',
    bbw: [],
    pearls: ['Spironolactone 25mg for HFrEF (RALES mortality benefit)', 'Gynecomastia 10% spironolactone (less with eplerenone)', 'Monitor K+ and Cr within 1 week of starting', 'Combine with thiazide/loop for K+ sparing effect', 'Eplerenone: more selective — less gynecomastia'],
    warnings: ['Hyperkalemia (highest risk: renal impairment, DM, elderly, concurrent ACEi/ARB)', 'Gynecomastia/breast tenderness (spironolactone)', 'Metabolic acidosis', 'Renal impairment (avoid if CrCl <30)', 'Menstrual irregularities, impotence'],
    overdose: 'Symptoms: hyperkalemia (peaked T, widened QRS), hypotension. Management: IV calcium gluconate, insulin+glucose, albuterol, hemodialysis.',
    preg: 'C', brands: ['Spironolactone', 'Eplerenone', 'Amiloride', 'Triamterene'],
  },

  'Statin': {
    moa: 'Inhibits HMG-CoA reductase (rate-limiting step in cholesterol biosynthesis), reducing hepatic LDL-C synthesis. Pleiotropic anti-inflammatory and plaque-stabilizing effects.',
    pk: 'Absorption: well absorbed. Half-life: atorvastatin 14h, rosuvastatin 19h, simvastatin 3h. Metabolism: hepatic (CYP3A4 for atorvastatin/simvastatin). Excretion: biliary/feces.',
    bbw: [],
    pearls: ['Evening dosing for simvastatin/lovastatin (short half-life)', 'Any time for atorvastatin/rosuvastatin (long half-life)', 'Atorvastatin/rosuvastatin: high-intensity (>50% LDL reduction)', 'Avoid grapefruit with CYP3A4-metabolized statins', 'Rosuvastatin: fewest drug interactions (not CYP3A4)'],
    warnings: ['Myopathy/myalgia, rhabdomyolysis (rare but serious)', 'Hepatotoxicity (transaminase elevation)', 'New-onset diabetes (small absolute risk)', 'Drug interactions: gemfibrozil, clarithromycin, cyclosporine', 'Hemorrhagic stroke (in prior stroke patients — JUPITER)'],
    overdose: 'Symptoms: myalgia, elevated CK, hepatotoxicity. Management: supportive care, discontinue statin.',
    preg: 'X', brands: ['Atorvastatin', 'Rosuvastatin', 'Simvastatin', 'Pravastatin', 'Pitavastatin', 'Lovastatin'],
  },

  'Anticoagulant (heparin/LMWH)': {
    moa: 'Potentiates antithrombin III, accelerating inactivation of thrombin (IIa) and factor Xa. LMWH preferentially inhibits factor Xa.',
    pk: 'Absorption: IV/SC only. Half-life: UFH 1-2h, enoxaparin 4-5h, dalteparin 3-5h. Metabolism: hepatic (reticuloendothelial). Excretion: renal.',
    bbw: ['HIT (heparin-induced thrombocytopenia) — monitor platelets every 2-3 days', 'LMWH: spinal/epidural hematoma risk with neuraxial anesthesia'],
    pearls: ['UFH: immediate anticoagulation; monitor aPTT (target 1.5-2.5x)', 'LMWH: no routine monitoring needed (except pregnancy, obesity, renal impairment)', 'Protamine: 1mg per 100U UFH (full reversal); less effective for LMWH (~60%)', 'UFH: half-life 1-2h (advantage if rapid reversal needed)', 'Enoxaparin 1mg/kg BID or 1.5mg/kg QD for DVT treatment'],
    warnings: ['Bleeding (most common)', 'HIT type II (immune-mediated, 1-5%, high thrombosis risk)', 'Osteoporosis with prolonged heparin (>3 months)', 'Skin necrosis at injection sites', 'Hyperkalemia (aldosterone suppression)'],
    overdose: 'Symptoms: bleeding. Management: protamine sulfate (slow IV, 1mg per 100U heparin). LMWH: protamine less effective. Monitor anti-Xa levels.',
    preg: 'C', brands: ['Heparin', 'Enoxaparin', 'Dalteparin', 'Tinzaparin', 'Fondaparinux'],
  },

  'Anticoagulant (vitamin K antagonist)': {
    moa: 'Inhibits vitamin K epoxide reductase (VKORC1), blocking regeneration of active vitamin K required for synthesis of factors II, VII, IX, X and proteins C and S.',
    pk: 'Absorption: well absorbed. Distribution: highly protein bound (99%). Half-life: 40h. Metabolism: hepatic (CYP2C9, CYP3A4, VKORC1 polymorphism). Excretion: renal.',
    bbw: ['Major or fatal bleeding — monitor INR regularly', 'Teratogenic — contraindicated in pregnancy'],
    pearls: ['Target INR 2-3 (most indications), 2.5-3.5 (mechanical valves)', 'CYP2C9 and VKORC1 polymorphisms affect dose (genetic testing)', 'Many drug and food interactions', 'Vitamin K (phytomenadione) is antidote for elevated INR', 'Warfarin skin necrosis: days 3-8 (protein C deficiency)'],
    warnings: ['Bleeding (most common and serious)', 'Teratogenicity (warfarin embryopathy: weeks 6-9)', 'Skin necrosis (protein C deficiency)', 'Purple toe syndrome', 'Calciphylaxis (rare but serious in CKD)'],
    overdose: 'Symptoms: bleeding. Management: vitamin K (1-10mg PO/SC for mild-moderate INR elevation); PCC (4-factor) or FFP for life-threatening bleeding. INR target <5.',
    preg: 'X', brands: ['Warfarin', 'Coumadin', 'Marevan', 'Phenprocoumon'],
  },

  'DOAC (direct oral anticoagulant)': {
    moa: 'Direct inhibition of thrombin (dabigatran) or factor Xa (rivaroxaban, apixaban, edoxaban) without ATIII requirement. Predictable pharmacokinetics — no routine monitoring.',
    pk: 'Absorption: good (rivaroxaban 66-80% with food; dabigatran 6% with tartaric acid core). Half-life: dabigatran 12-17h, rivaroxaban 5-9h, apixaban 12h, edoxaban 10-14h. Metabolism: hepatic (CYP3A4 for Xa inhibitors; esterases for dabigatran). Excretion: renal (dabigatran 80%, others less).',
    bbw: [],
    pearls: ['No routine INR monitoring', 'Dose adjust for age/weight/renal function', 'Rivaroxaban: take with food (improves absorption)', 'Reversal: idarucizumab (dabigatran), andexanet alfa (Xa inhibitors), PCC', 'Avoid in mechanical heart valves and antiphospholipid syndrome'],
    warnings: ['Bleeding (lower ICH risk than warfarin)', 'Renal impairment — dose adjust or avoid', 'Dabigatran: dyspepsia (10%)', 'GI bleeding risk higher with dabigatran vs. apixaban', 'No routine monitoring available'],
    overdose: 'Symptoms: bleeding. Management: dabigatran — idarucizumab 5g IV. Xa inhibitors — andexanet alfa or PCC. AC within 2h.',
    preg: 'C', brands: ['Apixaban', 'Rivaroxaban', 'Dabigatran', 'Edoxaban'],
  },

  'Antiplatelet': {
    moa: 'Aspirin: irreversibly acetylates COX-1, blocking TXA2. P2Y12 inhibitors (clopidogrel, ticagrelor, prasugrel): block ADP-mediated platelet activation.',
    pk: 'Absorption: aspirin well absorbed. Clopidogrel: prodrug (CYP2C19). Ticagrelor: direct-acting. Half-life: aspirin 15-20 min (irreversible effect 7-10 days), clopidogrel 6h, ticagrelor 7-8h. Metabolism: hepatic. Excretion: renal.',
    bbw: ['Aspirin: Reye syndrome — do not use in children with viral infections', 'Clopidogrel: reduced efficacy in CYP2C19 poor metabolizers'],
    pearls: ['Aspirin 75-100mg QD for secondary CV prevention; 300mg chewed for acute MI', 'DAPT (aspirin + P2Y12) for ACS (12 months) and post-PCI (1-12 months)', 'Ticagrelor: faster onset, more consistent effect than clopidogrel', 'Hold clopidogrel 5 days, ticagrelor 3-5 days before surgery', 'PPI for GI protection during DAPT (pantoprazole preferred)'],
    warnings: ['Bleeding risk (especially with DAPT)', 'GI bleeding (add PPI if risk factors)', 'Aspirin: bronchospasm in AERD (Samter triad)', 'Ticagrelor: dyspnea (mild, reversible)', 'Prasugrel: avoid in prior CVA/TIA'],
    overdose: 'Aspirin: tinnitus, metabolic acidosis, seizures, coma. Management: AC, urinary alkalinization (pH 7.5-8.0), hemodialysis.',
    preg: 'C', brands: ['Aspirin', 'Clopidogrel', 'Ticagrelor', 'Prasugrel', 'Cilostazol'],
  },

  'Cardiac glycoside': {
    moa: 'Inhibits Na+/K+-ATPase, increasing intracellular Ca2+, enhancing myocardial contractility. Vagomimetic effects on SA/AV nodes reduce heart rate.',
    pk: 'Absorption: 60-80% (digoxin). Distribution: large Vd. Half-life: 36-48h. Metabolism: minimal. Excretion: renal.',
    bbw: [],
    pearls: ['Therapeutic range: 0.5-2.0 ng/mL (draw level 6-12h post-dose at steady state)', 'Check K+, Mg2+, Cr before starting (hypokalemia precipitates toxicity)', 'Hold if HR <60 bpm', 'Toxicity in elderly, renal impairment, hypothyroidism', 'Dose: 62.5-125 mcg/day for most'],
    warnings: ['Narrow therapeutic index', 'Cardiac toxicity: arrhythmias (PVCs, bigeminy, AT with block, bidirectional VT)', 'N/V (first sign), anorexia, visual changes (yellow-green halos)', 'Hypokalemia precipitates toxicity', 'Renal impairment: reduce dose 50% if CrCl <30'],
    overdose: 'Symptoms: bradycardia, AV block, ventricular arrhythmias, hyperkalemia (acute). ECG: ST depression, QT shortening. Management: digoxin immune Fab (Digibind) for life-threatening toxicity.',
    preg: 'C', brands: ['Digoxin', 'Lanoxin', 'Digitoxin'],
  },

  'Nitrate vasodilator': {
    moa: 'Metabolized to NO, activating guanylyl cyclase, increasing cGMP causing venous and arterial vasodilation (predominantly venous at low doses).',
    pk: 'Absorption: rapid but extensive first-pass. Bioavailability: sublingual 40-60%, oral <10%. Half-life: GTN 1-3 min, ISMN 4-6h. Metabolism: hepatic. Excretion: renal.',
    bbw: ['DO NOT USE WITH PDE-5 INHIBITORS — severe hypotension, potentially fatal'],
    pearls: ['Sit down before sublingual dose (orthostatic hypotension)', 'If pain persists after 3 x 5min, seek emergency care', 'Tolerance develops within 24h — daily nitrate-free interval 10-12h needed', 'Headache common initially (treat with analgesics)', 'Twice-daily ISMN (7AM/2PM) maintains nitrate-free interval'],
    warnings: ['Severe hypotension with syncope', 'Headache (dose-related)', 'Reflex tachycardia (use with beta-blocker)', 'Methemoglobinemia (rare, massive OD)', 'Tolerance with continuous use'],
    overdose: 'Symptoms: severe hypotension, reflex tachycardia, methemoglobinemia. Management: elevate legs, IV fluids, vasopressors. Methylene blue for methemoglobinemia.',
    preg: 'C', brands: ['Glyceryl Trinitrate', 'Isosorbide Dinitrate', 'Isosorbide Mononitrate'],
  },

  'Antianginal (other)': {
    moa: 'Ranolazine: inhibits late sodium current, reducing intracellular Ca2+ overload and diastolic wall tension. Trimetazidine: shifts myocardial metabolism from fatty acid to glucose oxidation.',
    pk: 'Absorption: ranolazine ER 75% (food increases). Half-life: ranolazine 7h, trimetazidine 5h. Metabolism: hepatic (CYP3A4). Excretion: renal.',
    bbw: [],
    pearls: ['Ranolazine: add-on for refractory angina (does not reduce HR or BP)', 'Trimetazidine: improves angina by metabolic modulation (available in some countries)', 'Ranolazine: QT prolongation risk — ECG baseline', 'Can combine with beta-blockers, CCBs, nitrates', 'Ranolazine: also reduces HbA1c in diabetic patients'],
    warnings: ['QT prolongation (ranolazine)', 'Dizziness, headache', 'Constipation', 'Nausea', 'Renal impairment: dose adjustment needed'],
    overdose: 'Symptoms: dizziness, QT prolongation. Management: supportive care, ECG monitoring.',
    preg: 'C', brands: ['Ranolazine', 'Ranexa', 'Trimetazidine', 'Vastarel'],
  },

  'Antiarrhythmic': {
    moa: 'Classified by Vaughan-Williams: IA (quinidine, procainamide): Na+ channel block + K+ block. IB (lidocaine, mexiletine): Na+ channel block. IC (flecainide, propafenone): strong Na+ channel block. III (amiodarone, sotalol): K+ channel block (QT prolongation). IV (verapamil, diltiazem): Ca2+ channel block.',
    pk: 'Absorption: varies. Distribution: varies. Half-life: amiodarone 40-55 days, flecainide 12-20h, sotalol 12h, propafenone 5-8h. Metabolism: hepatic (CYP3A4, CYP2D6). Excretion: renal (sotalol, flecainide), hepatic (amiodarone, propafenone).',
    bbw: ['Amiodarone: pulmonary toxicity, hepatotoxicity, thyroid dysfunction, corneal deposits, blue-gray skin', 'Flecainide: increased mortality in post-MI patients with asymptomatic VT (CAST trial)'],
    pearls: ['Amiodarone: broadest antiarrhythmic spectrum (all arrhythmias)', 'Amiodarone: half-life 40-55 days — effects persist weeks after stopping', 'Flecainide: for AF in structurally normal hearts (do not use post-MI)', 'Propafenone: weak beta-blocker effect + Na channel block', 'Sotalol: class III + non-selective beta-blocker — monitor QT, K+'],
    warnings: ['Amiodarone: pulmonary fibrosis, thyroid dysfunction (hypo or hyper), hepatotoxicity, corneal deposits', 'All class III: QT prolongation, torsades de pointes', 'Flecainide: proarrhythmic (do not use in structural heart disease)', 'Amiodarone: photosensitivity, blue-gray skin discoloration', 'Drug interactions: amiodarone CYP3A4/2D6 inhibitor'],
    overdose: 'Symptoms: varies by class. Amiodarone: bradycardia, hypotension, torsades. Flecainide: seizures, cardiac arrest. Management: isoproterenol or pacing for bradycardia, magnesium for torsades, lipid emulsion for local anesthetic toxicity.',
    preg: 'C', brands: ['Amiodarone', 'Flecainide', 'Propafenone', 'Sotalol', 'Mexiletine', 'Dronedarone'],
  },

  'SGLT2 inhibitor': {
    moa: 'Inhibits sodium-glucose co-transporter 2 in the proximal convoluted tubule, reducing renal glucose reabsorption. Increases urinary glucose excretion (glucosuria), lowering blood glucose. Also has natriuretic, osmotic diuretic, and hemodynamic effects.',
    pk: 'Absorption: well absorbed. Half-life: empagliflozin 12h, dapagliflozin 13h, canagliflozin 10-13h. Metabolism: hepatic (UGT1A9, UGT2B4). Excretion: renal/fecal.',
    bbw: ['Risk of euglycemic diabetic ketoacidosis (DKA) — hold 3 days before surgery', 'Fournier gangrene (necrotizing fasciitis of perineum — rare but serious)'],
    pearls: ['Cardiorenal benefits independent of glucose lowering (EMPA-REG, DAPA-HF, DAPA-CKD)', 'First-line for HFrEF (dapagliflozin, empagliflozin) — regardless of diabetes', 'First-line for CKD (dapagliflozin, empagliflozin) — proteinuria reduction', 'Weight loss (2-3 kg), BP reduction', 'Genital mycotic infections common (candidiasis)'],
    warnings: ['Genital mycotic infections (women > men)', 'UTI (slightly increased)', 'Volume depletion / hypotension', 'Euglycemic DKA (hold before surgery)', 'Fournier gangrene (very rare)'],
    overdose: 'Symptoms: polyuria, dehydration, hypotension. Management: supportive care, IV fluids.',
    preg: 'C', brands: ['Empagliflozin', 'Dapagliflozin', 'Canagliflozin', 'Ertugliflozin'],
  },

  'DPP-4 inhibitor': {
    moa: 'Inhibits dipeptidyl peptidase-4, preventing degradation of incretin hormones (GLP-1, GIP). Increases incretin levels, enhancing glucose-dependent insulin secretion and suppressing glucagon.',
    pk: 'Absorption: well absorbed. Half-life: sitagliptin 12h, vildagliptin 3h, saxagliptin 2.5h. Metabolism: hepatic (varies). Excretion: renal (sitagliptin, saxagliptin), hepatic (vildagliptin).',
    bbw: [],
    pearls: ['Weight neutral (unlike sulfonylureas and insulin)', 'Low hypoglycemia risk (glucose-dependent mechanism)', 'Once-daily or twice-daily depending on agent', 'Well tolerated — few drug interactions', 'Less effective than GLP-1 RAs for CV benefits'],
    warnings: ['Pancreatitis (rare)', 'Severe joint pain (arthralgia) — consider discontinuation', 'Hypoglycemia (when combined with sulfonylureas or insulin)', 'Renal impairment: dose adjustment needed', 'Bullous pemphigoid (very rare)'],
    overdose: 'Symptoms: hypoglycemia (if combined with other agents). Management: oral glucose or IV dextrose.',
    preg: 'B', brands: ['Sitagliptin', 'Januvia', 'Vildagliptin', 'Saxagliptin', 'Linagliptin'],
  },

  'GLP-1 receptor agonist': {
    moa: 'Glucagon-like peptide-1 receptor agonist: activates GLP-1 receptors on pancreatic beta cells, enhancing glucose-dependent insulin secretion. Also suppresses glucagon, slows gastric emptying, and promotes satiety.',
    pk: 'Absorption: SC injection (some oral). Half-life: exenatide 2.4h (ER 1 week), liraglutide 13h, semaglutide 165h (SC), dulaglutide 5 days. Metabolism: proteolytic degradation. Excretion: renal/fecal.',
    bbw: ['Risk of thyroid C-cell tumors (medullary thyroid carcinoma) in rodents — contraindicated in MEN2 and personal/family history of MTC'],
    pearls: ['Semaglutide: strongest weight loss (15-17% body weight)', 'Cardiovascular benefit: liraglutide (LEADER), semaglutide (SELECT)', 'Weekly dosing: semaglutide, dulaglutide, exenatide ER', 'Inject into abdomen, thigh, or upper arm (rotate sites)', 'GI side effects: nausea, vomiting (dose-dependent, often transient)'],
    warnings: ['Pancreatitis (rare but serious)', 'Gallbladder disease (cholelithiasis)', 'GI side effects: nausea, vomiting, diarrhea, constipation', 'Hypoglycemia (with insulin or sulfonylureas)', 'Renal impairment (dehydration from vomiting)'],
    overdose: 'Symptoms: severe nausea, vomiting, hypoglycemia. Management: supportive care, oral glucose.',
    preg: 'C', brands: ['Semaglutide', 'Ozempic', 'Wegovy', 'Liraglutide', 'Victoza', 'Dulaglutide', 'Exenatide'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // CNS
  // ═══════════════════════════════════════════════════════════════════

  'Benzodiazepine': {
    moa: 'Binds to benzodiazepine site on GABA-A receptors, increasing frequency of Cl- channel opening, potentiating GABA-mediated inhibition.',
    pk: 'Absorption: well absorbed. Distribution: highly lipophilic. Half-life: midazolam 2-5h, lorazepam 10-20h, diazepam 20-100h (active metabolites). Metabolism: hepatic (CYP3A4, glucuronidation). Excretion: renal.',
    bbw: ['Concurrent use with opioids: profound sedation, respiratory depression, coma, death', 'Risk of abuse, dependence — use shortest duration (<2-4 weeks)'],
    pearls: ['Lorazepam: preferred in elderly (no active metabolites)', 'Diazepam: long-acting, useful for status epilepticus and alcohol withdrawal', 'Flumazenil: reversal agent (risk of withdrawal seizures)', 'Tolerance develops to all effects with chronic use', 'Temazepam: preferred intermediate-acting hypnotic'],
    warnings: ['Sedation, cognitive impairment (especially elderly)', 'Falls risk', 'Respiratory depression with opioids/alcohol', 'Anterograde amnesia (especially triazolam, midazolam)', 'Dependence and withdrawal — taper slowly'],
    overdose: 'Symptoms: drowsiness, ataxia, respiratory depression, coma (rarely fatal alone). Management: supportive care, flumazenil (caution in chronic users).',
    preg: 'D', brands: ['Diazepam', 'Lorazepam', 'Alprazolam', 'Midazolam', 'Clonazepam', 'Temazepam'],
  },

  'Opioid analgesic': {
    moa: 'Mu-opioid receptor agonist: activates G-protein coupled receptors in CNS (periaqueductal gray, dorsal horn), reducing presynaptic neurotransmitter release and postsynaptic excitability. Produces analgesia, sedation, respiratory depression.',
    pk: 'Absorption: varies by route. Half-life: morphine 2-4h, oxycodone 3-5h, fentanyl 3-7h, methadone 15-40h, buprenorphine 24-60h. Metabolism: hepatic. Excretion: renal.',
    bbw: ['Concurrent use with benzodiazepines: respiratory depression, coma, death', 'Risk of addiction, abuse, misuse', 'Neonatal opioid withdrawal syndrome (NOWS) in pregnancy', 'Life-threatening respiratory depression — even at therapeutic doses'],
    pearls: ['Morphine: gold-standard, 10mg IM = 30mg oral', 'Fentanyl: 100x morphine potency, transdermal only for opioid-tolerant', 'Methadone: complex PK — specialist initiation only', 'Always prescribe bowel regimen with opioids', 'Naloxone: antidote (short half-life — monitor for renarcotization)'],
    warnings: ['Respiratory depression (most serious)', 'Constipation (does not develop tolerance)', 'Nausea/vomiting (transient)', 'Physical dependence — do not stop abruptly', 'Tolerance to analgesia, euphoria (not to miosis or constipation)'],
    overdose: 'Symptoms: respiratory depression, CNS depression, miosis (pinpoint pupils), pulmonary edema. Management: naloxone 0.04-0.4mg IV/IM/IN, titrate PRN, monitor for renarcotization.',
    preg: 'C', brands: ['Morphine', 'Oxycodone', 'Fentanyl', 'Hydromorphone', 'Codeine', 'Tramadol', 'Buprenorphine', 'Methadone'],
  },

  'Non-opioid analgesic': {
    moa: 'Paracetamol: centrally inhibits COX-2 and possibly TRPV1/endocannabinoid systems. Weak peripheral anti-inflammatory. NSAIDs: non-selective COX-1/COX-2 inhibitors reducing prostaglandin synthesis.',
    pk: 'Paracetamol: well absorbed, half-life 2-4h, hepatic metabolism (glucuronidation/sulfation, CYP2E1 to NAPQI). NSAIDs: well absorbed, highly protein bound, hepatic metabolism.',
    bbw: ['Paracetamol: hepatotoxicity in overdose — never exceed 4g/day', 'NSAIDs: cardiovascular thrombotic events, GI bleeding/ulceration'],
    pearls: ['Paracetamol: first-line mild-moderate pain/fever, safe in pregnancy', 'NSAIDs: take with food, use lowest effective dose for shortest duration', 'NAC: antidote for paracetamol overdose (most effective within 8h)', 'NSAIDs: contraindicated in 3rd trimester (premature ductus arteriosus closure)', 'Coxibs (celecoxib): selective COX-2, lower GI risk but CV risk'],
    warnings: ['Paracetamol: hepatotoxicity (max 4g/day, lower in alcoholics)', 'NSAIDs: GI bleeding, ulceration (add PPI if risk factors)', 'NSAIDs: CV thrombotic events (MI, stroke)', 'NSAIDs: renal impairment', 'NSAIDs: aspirin-exacerbated respiratory disease (AERD)'],
    overdose: 'Paracetamol: 4 phases (N/V → RUQ pain → hepatic necrosis → recovery). NAC is antidote. NSAIDs: GI bleeding, renal failure, seizures. Management: AC, supportive care.',
    preg: 'A', brands: ['Paracetamol', 'Ibuprofen', 'Naproxen', 'Diclofenac', 'Celecoxib', 'Indomethacin', 'Meloxicam'],
  },

  'SSRI': {
    moa: 'Selectively inhibits presynaptic serotonin transporter (SERT), blocking 5-HT reuptake and increasing synaptic serotonin availability.',
    pk: 'Absorption: well absorbed. Half-life: fluoxetine 4-6 days (norfluoxetine 4-16 days), sertraline 24h, citalopram 35h, escitalopram 27-32h, paroxetine 21h. Metabolism: hepatic (CYP2D6, CYP2C19). Excretion: renal.',
    bbw: ['Antidepressants increase suicidal thinking in children, adolescents, young adults'],
    pearls: ['All SSRIs equally efficacious — selection based on side effects', 'Fluoxetine: most activating (AM dosing), longest half-life, CYP2D6 inhibitor', 'Sertraline: fewest drug interactions, safe in pregnancy', 'Escitalopram: best tolerability, fewest interactions', 'Paroxetine: most anticholinergic, difficult withdrawal, teratogenic'],
    warnings: ['Serotonin syndrome (with MAOIs, linezolid, tramadol)', 'Suicidality in young patients (first 1-2 months)', 'Sexual dysfunction (30-60%)', 'GI bleeding risk (with NSAIDs)', 'SIADH (hyponatremia in elderly)'],
    overdose: 'Symptoms: serotonin syndrome, drowsiness, nausea. Fatalities rare. Management: supportive care, cyproheptadine for serotonin syndrome.',
    preg: 'C', brands: ['Fluoxetine', 'Sertraline', 'Citalopram', 'Escitalopram', 'Paroxetine', 'Fluvoxamine'],
  },

  'TCA': {
    moa: 'Non-selectively inhibits reuptake of serotonin and norepinephrine. Also blocks H1 (sedation), alpha-1 (orthostasis), and muscarinic (anticholinergic) receptors.',
    pk: 'Absorption: well absorbed. Half-life: amitriptyline 10-28h, nortriptyline 18-44h, imipramine 6-18h. Metabolism: hepatic (CYP2D6). Excretion: renal.',
    bbw: ['Antidepressants increase suicidal thinking in children, adolescents, young adults'],
    pearls: ['Amitriptyline: DOC for neuropathic pain (10-50mg nocte)', 'Nortriptyline: preferred in elderly (less anticholinergic)', 'Highly lethal in overdose — limit quantity prescribed', '2-4 weeks lag for antidepressant effect', 'Monitor nortriptyline levels (50-150 ng/mL therapeutic range)'],
    warnings: ['Cardiotoxicity: QT prolongation, arrhythmias', 'Orthostatic hypotension', 'Anticholinergic effects (dry mouth, constipation, urinary retention, confusion)', 'Sedation', 'Seizure threshold lowering'],
    overdose: 'Fatal — seizures, coma, cardiotoxicity (QRS widening >100ms). Management: IV sodium bicarbonate for QRS widening, benzodiazepines for seizures, vasopressors.',
    preg: 'C', brands: ['Amitriptyline', 'Nortriptyline', 'Imipramine', 'Clomipramine', 'Doxepin'],
  },

  'SNRI': {
    moa: 'Selectively inhibits reuptake of both serotonin and norepinephrine. NE effect increases at higher doses.',
    pk: 'Absorption: well absorbed. Half-life: venlafaxine 4-7h (active metabolite 10-13h), duloxetine 12h, desvenlafaxine 11h. Metabolism: hepatic (CYP2D6, CYP3A4). Excretion: renal.',
    bbw: ['Antidepressants increase suicidal thinking in children, adolescents, young adults'],
    pearls: ['Duloxetine: FDA-approved for diabetic neuropathy and fibromyalgia', 'Venlafaxine: NE effect at >150mg/day', 'Discontinuation syndrome prominent — taper slowly', 'Hypertension (venlafaxine dose-related)', 'Less sexual dysfunction than SSRIs (but still significant)'],
    warnings: ['Hypertension (venlafaxine >150mg/day)', 'Serotonin syndrome (with MAOIs)', 'Nausea, headache, insomnia', 'Sexual dysfunction', 'Discontinuation syndrome — taper slowly'],
    overdose: 'Venlafaxine: drowsiness, serotonin syndrome, seizures, cardiac toxicity. Management: supportive care, benzodiazepines.',
    preg: 'C', brands: ['Venlafaxine', 'Duloxetine', 'Desvenlafaxine', 'Milnacipran', 'Levomilnacipran'],
  },

  'Antipsychotic (typical)': {
    moa: 'Postsynaptic D2 dopamine receptor antagonist in mesolimbic pathway (antipsychotic), nigrostriatal (EPS), tuberoinfundibular (prolactin elevation).',
    pk: 'Absorption: well absorbed. Half-life: haloperidol 12-36h, chlorpromazine 30h. Metabolism: hepatic (CYP2D6, CYP3A4). Excretion: renal.',
    bbw: ['Elderly with dementia-related psychosis: increased risk of death — not FDA-approved for dementia'],
    pearls: ['Haloperidol: IM for acute agitation (2-5mg, onset 30-60 min)', 'Chlorpromazine: also antiemetic, used for intractable hiccups', 'EPS: acute dystonia → akathisia → parkinsonism → tardive dyskinesia', 'Available depot formulations for maintenance', 'Prolactin elevation: galactorrhea, menstrual irregularities'],
    warnings: ['EPS (dystonia, akathisia, parkinsonism)', 'Tardive dyskinesia (potentially irreversible)', 'QT prolongation (ECG baseline)', 'Neuroleptic malignant syndrome (NMS — emergency)', 'Prolactin elevation'],
    overdose: 'Symptoms: EPS, sedation, hypotension, QT prolongation, seizures. Management: supportive care, benztropine for EPS.',
    preg: 'C', brands: ['Haloperidol', 'Chlorpromazine', 'Fluphenazine', 'Thioridazine', 'Pimozide'],
  },

  'Antipsychotic (atypical)': {
    moa: 'Combined D2 and 5-HT2A receptor antagonism. Additional receptor effects vary by agent (H1: sedation, alpha-1: orthostasis, M1: anticholinergic).',
    pk: 'Absorption: well absorbed. Half-life: risperidone 4-6h (active metabolite 24h), olanzapine 21-54h, quetiapine 7h, aripiprazole 75h. Metabolism: hepatic (CYP2D6, CYP3A4). Excretion: renal/biliary.',
    bbw: ['Elderly with dementia-related psychosis: increased risk of death — not approved'],
    pearls: ['Risperidone: EPS dose-related (>6mg/day)', 'Olanzapine: most weight gain/metabolic effects', 'Quetiapine: dose-dependent (low = sedative, high = antipsychotic)', 'Aripiprazole: partial D2 agonist, lowest metabolic effects', 'Clozapine: treatment-resistant schizophrenia only — mandatory ANC monitoring'],
    warnings: ['Metabolic syndrome (weight, glucose, lipids)', 'EPS (less than typicals, except risperidone high-dose)', 'QT prolongation, orthostatic hypotension', 'Prolactin elevation (risperidone most)', 'Clozapine: agranulocytosis, myocarditis, seizures'],
    overdose: 'Symptoms: sedation, hypotension, tachycardia, EPS, seizures. Management: supportive care, ECG monitoring.',
    preg: 'C', brands: ['Risperidone', 'Olanzapine', 'Quetiapine', 'Aripiprazole', 'Ziprasidone', 'Lurasidone', 'Paliperidone', 'Clozapine'],
  },

  'Anticonvulsant': {
    moa: 'Diverse mechanisms: Na+ channel blockers (phenytoin, carbamazepine, lamotrigine); GABA enhancers (valproate, levetiracetam); Ca2+ channel blockers (gabapentin, pregabalin); SV2A modulators (levetiracetam).',
    pk: 'Varies widely by agent. Most metabolized hepatically. Levetiracetam: renally eliminated. Phenytoin: zero-order kinetics.',
    bbw: ['Carbamazepine: HLA-B*1502 screening in at-risk Asian populations (SJS/TEN)', 'Valproate: teratogenic, fatal hepatotoxicity in children <2', 'Lamotrigine: serious rash with rapid titration — slow titration essential'],
    pearls: ['Many AEDs have mood-stabilizing properties', 'Levetiracetam: no CYP metabolism, minimal drug interactions', 'Lamotrigine: slow titration to minimize SJS risk', 'Phenytoin: zero-order kinetics, check free levels in renal impairment', 'Gabapentinoids: also for neuropathic pain and anxiety'],
    warnings: ['Teratogenicity (valproate highest risk)', 'Hepatotoxicity', 'Bone marrow suppression (carbamazepine)', 'Cognitive/behavioral effects, sedation', 'Enzyme induction (carbamazepine, phenytoin) reduces other drug levels'],
    overdose: 'Symptoms: sedation, ataxia, seizures, respiratory depression, arrhythmias. Management: supportive care, benzodiazepines.',
    preg: 'D', brands: ['Carbamazepine', 'Valproate', 'Phenytoin', 'Lamotrigine', 'Levetiracetam', 'Oxcarbazepine', 'Gabapentin', 'Pregabalin'],
  },

  'Mood stabilizer': {
    moa: 'Diverse: lithium inhibits inositol monophosphatase and GSK-3beta; valproate increases GABA; carbamazepine blocks Na+ channels; lamotrigine blocks Na+ channels and reduces glutamate.',
    pk: 'Absorption: lithium well absorbed. Half-life: lithium 18-36h, valproate 9-16h, carbamazepine 15-30h. Metabolism: lithium not metabolized (renal), valproate/carbamazepine hepatic. Excretion: renal (lithium), hepatic (others).',
    bbw: ['Lithium: narrow therapeutic index — monitor levels closely', 'Valproate: teratogenic — avoid in pregnancy if possible'],
    pearls: ['Lithium: therapeutic range 0.6-1.2 mmol/L (draw 12h post-dose)', 'Lithium: check TSH (hypothyroidism), Cr (nephrogenic DI), Ca', 'Lithium toxicity: tremor, ataxia, vomiting, diarrhea, seizures, coma', 'Valproate: broadest spectrum (generalized epilepsy, bipolar, migraine)', 'Carbamazepine: rapid cycling bipolar — less effective in rapid cyclers'],
    warnings: ['Lithium: toxicity (narrow TI), nephrogenic DI, hypothyroidism, teratogenicity (Ebstein anomaly)', 'Valproate: hepatotoxicity, pancreatitis, teratogenicity', 'Carbamazepine: SJS/TEN, blood dyscrasias', 'All: weight gain, sedation, cognitive dulling', 'Drug interactions: lithium interacts with NSAIDs, thiazides'],
    overdose: 'Lithium: tremor → ataxia → seizures → coma. Management: whole bowel irrigation, hemodialysis. Valproate: CNS depression, hyperammonemia. L-carnitine for hyperammonemic encephalopathy.',
    preg: 'D', brands: ['Lithium', 'Valproate', 'Carbamazepine', 'Lamotrigine'],
  },

  'Antiparkinsonian': {
    moa: 'Levodopa: converted to dopamine in brain (carbidopa inhibits peripheral conversion). Dopamine agonists (pramipexole, ropinirole, rotigotine): directly stimulate D2/D3 receptors. MAO-B inhibitors (selegiline, rasagiline, safinamide): prevent dopamine breakdown. COMT inhibitors (entacapone, tolcapone): prolong levodopa effect.',
    pk: 'Levodopa: half-life 1-2h, short. Pramipexole: half-life 8-12h. Ropinirole: 6h. Selegiline: 1.5h (amphetamine metabolites longer). Entacapone: 1.6h (prolongs levodopa by 30-50%).',
    bbw: [],
    pearls: ['Take levodopa on empty stomach (food competes for absorption)', 'Carbidopa: allows 10x less levodopa, reduces peripheral side effects', 'Long-term: motor fluctuations (wearing-off, on-off) and dyskinesias', 'Entacapone: extends levodopa half-life, reduces wearing-off', 'Dopamine agonists: impulse control disorders (gambling, hypersexuality)'],
    warnings: ['Dyskinesias (peak-dose, dose-dependent)', 'Motor fluctuations after 3-5 years', 'Psychiatric effects: hallucinations, confusion (elderly)', 'Orthostatic hypotension', 'Impulse control disorders (dopamine agonists)'],
    overdose: 'Symptoms: dyskinesias, agitation, hallucinations, hypertension. Management: supportive care, D2 antagonists (risk worsening parkinsonism).',
    preg: 'C', brands: ['Levodopa/Carbidopa', 'Pramipexole', 'Ropinirole', 'Rotigotine', 'Selegiline', 'Rasagiline', 'Entacapone'],
  },

  'Cholinergic': {
    moa: 'Cholinesterase inhibitors (donepezil, rivastigmine, galantamine): inhibit acetylcholinesterase, increasing acetylcholine at synapses. Memantine: NMDA receptor antagonist, reducing glutamate excitotoxicity.',
    pk: 'Absorption: well absorbed. Half-life: donepezil 70h, rivastigmine 2h (TSMI 30h), galantamine 7h, memantine 60-80h. Metabolism: hepatic (CYP2D6, CYP3A4). Excretion: renal.',
    bbw: [],
    pearls: ['Cholinesterase inhibitors: mild-moderate Alzheimer disease', 'Memantine: moderate-severe Alzheimer (can combine with cholinesterase inhibitors)', 'Donepezil: longest half-life (once-daily dosing)', 'Rivastigmine: also available as transdermal patch (fewer GI effects)', 'Galantamine: dual mechanism (acetylcholinesterase inhibition + allosteric nicotinic receptor modulation)'],
    warnings: ['GI: nausea, vomiting, diarrhea, anorexia (dose-related)', 'Bradycardia, heart block (vagotonic)', 'Syncope', 'Bronchospasm (use caution in COPD/asthma)', 'Memantine: dizziness, headache, confusion'],
    overdose: 'Cholinesterase inhibitors: cholinergic crisis (SLUDGE: salivation, lacrimation, urination, defecation, GI distress, emesis). Management: atropine 0.5-1mg IV.',
    preg: 'C', brands: ['Donepezil', 'Rivastigmine', 'Galantamine', 'Memantine'],
  },

  'Antiemetic': {
    moa: 'Diverse: metoclopramide (D2 antagonist + prokinetic); ondansetron (5-HT3 antagonist); prochlorperazine (D2 antagonist); promethazine (H1/anticholinergic); dexamethasone (anti-inflammatory/antiemetic).',
    pk: 'Absorption: well absorbed. Half-life: metoclopramide 4-6h, ondansetron 3-5h, prochlorperazine 6-8h. Metabolism: hepatic. Excretion: renal.',
    bbw: ['Metoclopramide: tardive dyskinesia — limit <12 weeks'],
    pearls: ['Ondansetron: most effective for CINV', 'Metoclopramide: also prokinetic for gastroparesis', 'Dexamethasone: adjunctive for delayed CINV', 'Aprepitant (NK-1 antagonist): highly emetogenic chemo', 'Scopolamine patch: motion sickness prevention'],
    warnings: ['EPS (metoclopramide, prochlorperazine)', 'QT prolongation (ondansetron >16mg)', 'Serotonin syndrome (ondansetron with serotonergics)', 'Sedation', 'Falls risk (elderly)'],
    overdose: 'Symptoms: EPS, sedation, hypotension. Management: supportive care, benztropine for dystonic reactions.',
    preg: 'B', brands: ['Metoclopramide', 'Ondansetron', 'Prochlorperazine', 'Promethazine', 'Domperidone'],
  },

  'PPI': {
    moa: 'Irreversibly binds H+/K+-ATPase in gastric parietal cells, blocking final step of acid secretion. Profound, prolonged acid suppression.',
    pk: 'Absorption: enteric-coated. Half-life: 1-2h (but effect 24-36h due to irreversible binding). Metabolism: hepatic (CYP2C19, CYP3A4). Excretion: renal.',
    bbw: [],
    pearls: ['Take 30-60 min before breakfast', 'Max effect requires 3-5 days', 'Pantoprazole: fewest drug interactions', 'Long-term: monitor Mg, B12, Ca', 'Increased C. diff risk'],
    warnings: ['C. difficile infection', 'Osteoporosis fractures (long-term)', 'Hypomagnesemia (>1 year)', 'Vitamin B12 deficiency (>3 years)', 'Acute interstitial nephritis (rare)'],
    overdose: 'Symptoms: headache, drowsiness. Well-tolerated. Management: supportive care.',
    preg: 'B', brands: ['Omeprazole', 'Pantoprazole', 'Esomeprazole', 'Lansoprazole', 'Rabeprazole', 'Dexlansoprazole'],
  },

  'H2 receptor antagonist': {
    moa: 'Competitively blocks histamine H2 receptors on parietal cells, reducing basal and stimulated gastric acid secretion by 50-70%.',
    pk: 'Absorption: well absorbed. Half-life: ranitidine 2-4h, famotidine 2.5-4h, nizatidine 1-2h. Metabolism: hepatic. Excretion: renal.',
    bbw: [],
    pearls: ['Famotidine: most potent H2RA', 'Tachyphylaxis within 2 weeks', 'Useful for nocturnal acid breakthrough (add to PPI)', 'IV famotidine for ICU stress ulcer prophylaxis', 'Ranitidine: largely withdrawn (NDMA)'],
    warnings: ['Cimetidine: CYP450 inhibition (many drug interactions)', 'Confusion in elderly (cimetidine)', 'Gynecomastia (cimetidine)', 'GI upset', 'Thrombocytopenia (rare)'],
    overdose: 'Symptoms: CNS depression, tachycardia. Management: supportive care.',
    preg: 'B', brands: ['Famotidine', 'Cimetidine', 'Nizatidine'],
  },

  'Antidiarrheal': {
    moa: 'Loperamide: peripheral mu-opioid receptor agonist in gut wall, reducing motility and peristalsis. Bismuth subsalicylate: anti-inflammatory, antimicrobial, antisecretory.',
    pk: 'Loperamide: poor bioavailability (P-gp substrate), half-life 9-14h. Bismuth: minimal systemic absorption.',
    bbw: [],
    pearls: ['Loperamide: first-line for acute non-infectious diarrhea', 'Max: 4mg initial, 2mg PRN (max 16mg/day OTC)', 'Not for bloody diarrhea or fever', 'Bismuth: also for H. pylori triple therapy', 'Racecadotril: antisecretory (available in some countries)'],
    warnings: ['Do not use for bloody diarrhea, fever, C. difficile', 'Constipation with high doses', 'Cardiac toxicity (QT prolongation) with supratherapeutic doses (abuse)', 'Abdominal pain', 'Drowsiness'],
    overdose: 'Loperamide: CNS depression, QT prolongation, cardiac arrhythmias. Management: naloxone, ECG monitoring.',
    preg: 'C', brands: ['Loperamide', 'Bismuth Subsalicylate', 'Racecadotril'],
  },

  'Laxative': {
    moa: 'Stimulant (bisacodyl, senna): irritates colonic mucosa, increases peristalsis. Osmotic (PEG, lactulose): draws water into colon. Bulk-forming (psyllium): increases stool bulk.',
    pk: 'Onset: stimulant 6-12h, osmotic 24-48h, bulk-forming 12-72h. Minimal systemic absorption.',
    bbw: [],
    pearls: ['PEG: first-line for pediatric constipation and colonoscopy prep', 'Lactulose: also for hepatic encephalopathy', 'Stimulant laxatives: short-term only (<7 days)', 'Bulk-forming: take with adequate water', 'Avoid in suspected bowel obstruction'],
    warnings: ['Dehydration and electrolyte disturbances', 'Abdominal cramps', 'Laxative dependence with chronic stimulant use', 'Gas and bloating (lactulose)', 'Intestinal obstruction (do not use if suspected)'],
    overdose: 'Symptoms: severe diarrhea, dehydration, electrolyte disturbances. Management: fluid/electrolyte replacement.',
    preg: 'B', brands: ['Bisacodyl', 'Senna', 'PEG', 'Lactulose', 'Psyllium', 'Docusate'],
  },

  'Antiemetic (peripheral)': {
    moa: 'Domperidone: peripheral D2 antagonist (does not cross BBB significantly), prokinetic and antiemetic. Prucalopride: selective 5-HT4 agonist, prokinetic for chronic constipation.',
    pk: 'Domperidone: oral bioavailability 13-17% (high first-pass). Half-life: 7-8h. Prucalopride: half-life 24-30h. Metabolism: hepatic (CYP3A4). Excretion: renal.',
    bbw: ['Domperidone: QT prolongation risk (FDA not approved in US, available elsewhere)'],
    pearls: ['Domperidone: prokinetic for gastroparesis and functional dyspepsia', 'Prucalopride: for chronic constipation (women, when laxatives inadequate)', 'Domperidone: less CNS effects than metoclopramide', 'Take before meals for gastroparesis', 'Prucalopride: once-daily dosing'],
    warnings: ['QT prolongation (domperidone)', 'Cardiac arrhythmias (domperidone)', 'Headache (prucalopride)', 'GI cramps (prucalopride)', 'Drug interactions (CYP3A4 inhibitors increase domperidone levels)'],
    overdose: 'Symptoms: QT prolongation, seizures (rare). Management: supportive care, ECG monitoring.',
    preg: 'C', brands: ['Domperidone', 'Prucalopride', 'Mosapride'],
  },

  'Hepatoprotective': {
    moa: 'Ursodeoxycholic acid (UDCA): replaces toxic bile acids, reduces hydrophobic bile acid toxicity, protects hepatocyte membranes, immunomodulatory. Silymarin (milk thistle): antioxidant, anti-inflammatory.',
    pk: 'UDCA: absorption 60-80%, half-life 3.5-5.8 days, hepatic metabolism. Silymarin: oral absorption poor, concentrated in liver.',
    bbw: [],
    pearls: ['UDCA: DOC for primary biliary cholangitis (PBC)', 'UDCA: also for gallstone dissolution (cholesterol stones <1cm)', 'UDCA: dose 13-15mg/kg/day in divided doses', 'Silymarin: not FDA-approved but widely used for liver disease', 'Monitor LFTs during UDCA therapy'],
    warnings: ['GI upset (diarrhea with UDCA)', 'Gallstone calcification (UDCA)', 'Silymarin: GI upset, headache', 'Contraindicated in complete biliary obstruction', 'Hepatic decompensation (rare with UDCA in advanced PBC)'],
    overdose: 'Symptoms: diarrhea. Management: reduce dose, supportive care.',
    preg: 'B', brands: ['Ursodeoxycholic acid', 'UDCA', 'Ursodiol', 'Actigall', 'Silymarin'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // RESPIRATORY
  // ═══════════════════════════════════════════════════════════════════

  'SABA': {
    moa: 'Short-acting beta-2 agonist: selectively stimulates beta-2 receptors in bronchial smooth muscle, causing bronchodilation via cAMP. Also reduces mast cell mediator release.',
    pk: 'Onset: 5-15 min inhaled. Duration: 3-6h. Half-life: 3-6h. Metabolism: hepatic (COMT, sulfation). Excretion: renal.',
    bbw: [],
    pearls: ['Use as needed — regular use indicates poor asthma control', 'If >2x/week (excluding exercise), step up controller', 'Spacer improves lung deposition', 'Monitor inhaler technique at every visit', 'Levalbuterol: R-isomer (theoretical benefit, expensive)'],
    warnings: ['Tachycardia, palpitations (beta-1 at high doses)', 'Tremor (tolerance develops)', 'Hypokalemia (high doses)', 'Headache, restlessness', 'Paradoxical bronchospasm (rare)'],
    overdose: 'Symptoms: tachycardia, tremor, hypokalemia, hyperglycemia. Management: cardioselective beta-blocker, ECG monitoring.',
    preg: 'A', brands: ['Salbutamol', 'Albuterol', 'Ventolin', 'Terbutaline', 'Levalbuterol'],
  },

  'LABA': {
    moa: 'Long-acting beta-2 agonist: prolonged bronchodilation due to lipophilicity or unique binding. Duration >12h. Never use as monotherapy in asthma.',
    pk: 'Onset: 5-30 min. Duration: 12-24h. Half-life: salmeterol 5.5h, formoterol 10h, vilanterol <1h (prolonged binding).',
    bbw: ['LABA monotherapy increases asthma-related death risk — always combine with ICS'],
    pearls: ['Always use with ICS (never alone in asthma)', 'Formoterol: fast onset + long duration (SMART therapy)', 'Vilanterol: once-daily (in Breo/Relvar Ellipta)', 'LABA/ICS combos: Advair, Symbicort, Breo', 'Step down when controlled 3 months'],
    warnings: ['Asthma-related death (monotherapy)', 'Tachycardia, QT prolongation', 'Tremor, hypokalemia', 'Headache', 'Paradoxical bronchospasm'],
    overdose: 'Symptoms: tachycardia, tremor, hypokalemia. Management: cardioselective beta-blocker with caution.',
    preg: 'C', brands: ['Salmeterol', 'Formoterol', 'Vilanterol', 'Indacaterol', 'Olodaterol'],
  },

  'Anticholinergic bronchodilator': {
    moa: 'Blocks muscarinic M3 receptors in bronchial smooth muscle, reducing vagally-mediated bronchoconstriction and mucus secretion.',
    pk: 'Onset: 15-30 min (ipratropium), 20-30 min (tiotropium). Duration: 4-6h (ipratropium), 24h+ (tiotropium).',
    bbw: [],
    pearls: ['First-line in COPD exacerbations', 'Tiotropium (LAMA): first-line COPD maintenance', 'Glycopyrrolate: LAMA with rapid onset', 'Triple therapy (ICS/LABA/LAMA): severe COPD', 'Less effective than SABA in acute asthma'],
    warnings: ['Dry mouth', 'Urinary retention (BPH)', 'Glaucoma (avoid eye contact)', 'Paradoxical bronchospasm', 'Cough/throat irritation'],
    overdose: 'Symptoms: dry mouth, blurred vision, urinary retention, tachycardia. Management: supportive care.',
    preg: 'B', brands: ['Ipratropium', 'Tiotropium', 'Glycopyrrolate', 'Aclidinium', 'Revefenacin'],
  },

  'ICS': {
    moa: 'Inhaled glucocorticoid receptor agonist in airway epithelium. Suppresses pro-inflammatory genes, reduces airway hyperresponsiveness and mucosal edema.',
    pk: 'Absorption: inhaled (~20% lung deposition, rest swallowed). High first-pass hepatic metabolism. Half-life: budesonide 2-3h, fluticasone 7-8h.',
    bbw: [],
    pearls: ['Preventer — use regularly (not as needed)', 'Rinse mouth after each dose (prevent thrush)', 'SMART therapy: budesonide/formoterol (both ICS + LABA)', 'Step down when controlled 3 months', 'Fluticasone furoate: once-daily'],
    warnings: ['Oral candidiasis (thrush)', 'Dysphonia', 'Systemic effects at high doses (>800mcg BDP/day)', 'Pneumonia risk in COPD', 'Growth suppression in children'],
    overdose: 'Chronic high-dose: Cushing syndrome, adrenal suppression. Management: reduce dose slowly.',
    preg: 'B', brands: ['Beclometasone', 'Budesonide', 'Fluticasone', 'Fluticasone Furoate', 'Ciclesonide'],
  },

  'Methylxanthine': {
    moa: 'Non-selective PDE inhibitor, increasing cAMP. Also adenosine receptor antagonist. Bronchodilation and respiratory stimulant effects.',
    pk: 'Absorption: well absorbed. Half-life: theophylline 3-12h (CYP1A2-dependent). Metabolism: hepatic (CYP1A2). Excretion: renal.',
    bbw: [],
    pearls: ['Narrow therapeutic index (5-15 mcg/mL)', 'Third-line add-on for severe asthma/COPD', 'CYP1A2 interactions: smoking reduces, ciprofloxacin increases', 'Aminophylline: IV salt form (loading 5-6mg/kg)', 'Clearance affected by age, smoking, HF, liver disease'],
    warnings: ['Toxicity: seizures, arrhythmias (above 20 mcg/mL)', 'GI intolerance', 'Insomnia, tremor', 'Tachycardia, palpitations', 'Seizures may be refractory in severe OD'],
    overdose: 'Vomiting, seizures, arrhythmias, metabolic acidosis. Management: multiple-dose AC, hemodialysis.',
    preg: 'C', brands: ['Theophylline', 'Aminophylline'],
  },

  'Leukotriene receptor antagonist': {
    moa: 'Selectively blocks CysLT1 receptors, antagonizing cysteinyl leukotrienes. Reduces bronchoconstriction, airway edema, and eosinophilic inflammation.',
    pk: 'Absorption: well absorbed. Half-life: montelukast 2.7-5.5h. Metabolism: hepatic (CYP3A4, CYP2C9). Excretion: biliary.',
    bbw: [],
    pearls: ['Take in evening (leukotriene levels peak at night)', 'First-line for exercise-induced bronchoconstriction', 'Preferred add-on for mild asthma with allergic rhinitis', 'Less effective than low-dose ICS as monotherapy', 'Montelukast: once-daily, minimal drug interactions'],
    warnings: ['Neuropsychiatric events (FDA boxed warning 2020)', 'Headache', 'GI upset', 'Upper respiratory infection', 'Churg-Strauss (rare — unmasked on steroid reduction)'],
    overdose: 'Symptoms: headache, drowsiness. Management: supportive care.',
    preg: 'B', brands: ['Montelukast', 'Zafirlukast', 'Pranlukast'],
  },

  'Mucolytic': {
    moa: 'NAC: breaks disulfide bonds in mucus glycoproteins, reducing viscosity. Also glutathione precursor (paracetamol overdose antidote).',
    pk: 'Absorption: well absorbed. Half-life: 5-6h. Metabolism: hepatic. Excretion: renal.',
    bbw: [],
    pearls: ['NAC for paracetamol overdose: 3-bag protocol', 'Most effective within 8h of overdose', 'Nebulized NAC for thick secretions (bronchiectasis, CF)', 'May cause bronchospasm in hyperreactive airways', 'Carbocisteine: alternative mucolytic'],
    warnings: ['Anaphylactoid reactions (10% IV NAC)', 'Nausea/vomiting (oral)', 'Bronchospasm (nebulized)', 'Unpleasant odor (rotten eggs)', 'Rash (rare)'],
    overdose: 'NAC itself rarely toxic. Management: supportive care.',
    preg: 'B', brands: ['N-Acetylcysteine', 'Carbocisteine', 'Erdosteine', 'Ambroxol'],
  },

  'Antitussive': {
    moa: 'Dextromethorphan: NMDA antagonist and sigma-1 receptor agonist (cough suppression). Codeine: mu-opioid agonist (cough center in medulla). Benzonatate: local anesthetic effect on stretch receptors in lungs.',
    pk: 'Dextromethorphan: half-life 2-6h. Codeine: half-life 3-4h (CYP2D6-dependent). Benzonatate: half-life 8h. Metabolism: hepatic. Excretion: renal.',
    bbw: ['Codeine: respiratory depression in children (CYP2D6 ultrarapid metabolizers) — contraindicated <12 years', 'Benzonatate: risk of seizures and cardiac arrest in children <10 (keep in child-resistant packaging)'],
    pearls: ['Dextromethorphan: first-line non-narcotic antitussive', 'Codeine: for severe cough (short-term only)', 'Guaifenesin: expectorant (increases water content of mucus)', 'Combination products: DM + guaifenesin for productive cough', 'Benzonatate: capsule — do not chew or crush (can cause local anesthesia of oropharynx)'],
    warnings: ['Serotonin syndrome (dextromethorphan with SSRIs, MAOIs)', 'Respiratory depression (codeine)', 'Benzonatate: seizures, cardiac arrest in children', 'Drowsiness (codeine)', 'Addiction risk (codeine)'],
    overdose: 'Codeine: respiratory depression, miosis, CNS depression. Naloxone for reversal. Dextromethorphan: serotonin syndrome, seizures. Management: supportive care.',
    preg: 'C', brands: ['Dextromethorphan', 'Codeine', 'Benzonatate', 'Guaifenesin'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ENDOCRINE & METABOLIC
  // ═══════════════════════════════════════════════════════════════════

  'Biguanide': {
    moa: 'Activates AMPK, reducing hepatic gluconeogenesis, increasing insulin sensitivity, and decreasing intestinal glucose absorption. Does not stimulate insulin secretion.',
    pk: 'Absorption: absorbed in small intestine. Half-life: 4-8h. Metabolism: minimal. Excretion: renal (>90% unchanged).',
    bbw: ['Lactic acidosis (rare but fatal) — contraindicated if CrCl <30, acute HF, sepsis'],
    pearls: ['First-line for T2DM', 'Start low (500mg with dinner), titrate weekly to max 2g/day', 'XR: better GI tolerability', 'Hold 48h before contrast (eGFR <60)', 'Weight neutral or modest weight loss'],
    warnings: ['GI intolerance (10-30%)', 'Lactic acidosis (extremely rare)', 'Vitamin B12 deficiency (>4 years)', 'Metallic taste', 'Hypoglycemia only with other agents'],
    overdose: 'Lactic acidosis: malaise, dyspnea, abdominal pain, hypotension. Management: hemodialysis.',
    preg: 'B', brands: ['Metformin', 'Glucophage', 'Fortamet'],
  },

  'Sulfonylurea': {
    moa: 'Binds SUR1 on beta cells, closing K-ATP channels, causing depolarization and insulin secretion (glucose-independent component → hypoglycemia risk).',
    pk: 'Absorption: well absorbed. Half-life: glibenclamide 2-10h (active metabolites), gliclazide 8-24h, glipizide 2-5h. Metabolism: hepatic (CYP2C9). Excretion: renal/biliary.',
    bbw: [],
    pearls: ['Gliclazide: preferred in elderly (lower hypoglycemia risk)', 'Glibenclamide: avoid in elderly/renal impairment', 'Take with breakfast', 'Secondary failure at 5-10%/year', 'Weight gain 2-5kg'],
    warnings: ['Hypoglycemia (major — can be severe)', 'Weight gain', 'GI upset', 'Photosensitivity', 'Disulfiram-like reaction (rare)'],
    overdose: 'Hypoglycemia: confusion, diaphoresis, tachycardia, coma. Management: oral glucose, IV dextrose. Octreotide for refractory cases.',
    preg: 'C', brands: ['Gliclazide', 'Glibenclamide', 'Glipizide', 'Glimepiride'],
  },

  'Insulin': {
    moa: 'Exogenous insulin binds insulin receptors, activating tyrosine kinase, promoting GLUT4 translocation, glucose uptake, glycogenesis, lipogenesis. Inhibits gluconeogenesis and ketogenesis.',
    pk: 'Rapid: onset 5-15min, peak 30-90min, duration 3-5h. Short (regular): onset 30-60min, peak 2-4h. Intermediate (NPH): onset 1-2h, peak 4-10h. Long (glargine, degludec): onset 2-4h, no peak, duration 20-42h.',
    bbw: ['Never share pens between patients (bloodborne pathogen risk)'],
    pearls: ['Only regular insulin IV', 'Rapid-acting: inject 5-15 min before meals', 'Basal: glargine OD, degludec OD (ultra-long 42h)', 'NPH: must resuspend gently (cloudy)', 'Only rapid-acting for insulin pumps'],
    warnings: ['Hypoglycemia (most common, dangerous)', 'Weight gain', 'Lipohypertrophy (rotate sites)', 'Hypokalemia (drives K+ into cells)', 'Injection site reactions'],
    overdose: 'Hypoglycemia: adrenergic (tachycardia, diaphoresis) → neuroglycopenic (confusion, coma). Management: oral glucose, IM glucagon, IV dextrose.',
    preg: 'B', brands: ['Insulin Glargine', 'Insulin Lispro', 'Insulin Aspart', 'NPH', 'Regular Insulin', 'Insulin Degludec'],
  },

  'Thyroid hormone': {
    moa: 'Synthetic T4 (levothyroxine) converted to active T3 peripherally. T3 binds nuclear thyroid hormone receptors, regulating metabolic rate, thermogenesis, cardiac function.',
    pk: 'Absorption: 40-80% (fasting improves). Half-life: 6-7 days (T4), 1 day (T3). Metabolism: hepatic deiodination. Excretion: renal.',
    bbw: [],
    pearls: ['Take empty stomach 30-60 min before breakfast', 'Separate from Ca/Fe by 4h', 'Dosing: 1.6 mcg/kg (start 25-50mcg elderly/CAD)', 'Adjust 12.5-25mcg every 6-8 weeks', 'Target TSH 0.5-2.5 mIU/L'],
    warnings: ['Overtreatment: tachycardia, anxiety, osteoporosis', 'Undertreatment: fatigue, weight gain, myxedema', 'Hair loss (temporary)', 'Angina exacerbation', 'Adrenal insufficiency screen before starting'],
    overdose: 'Thyrotoxicosis: tachycardia, hyperthermia, seizures. Management: beta-blockers, cholestyramine.',
    preg: 'A', brands: ['Levothyroxine', 'Liothyronine'],
  },

  'Corticosteroid': {
    moa: 'Binds intracellular glucocorticoid receptors, modulating gene transcription. Upregulates anti-inflammatory genes, downregulates pro-inflammatory cytokines.',
    pk: 'Absorption: well absorbed. Half-life: prednisolone 2-3h (tissue effect 18-36h), dexamethasone 3-4h, hydrocortisone 1.5-2h. Metabolism: hepatic. Excretion: renal.',
    bbw: [],
    pearls: ['5mg prednisolone = 0.75mg dexamethasone = 20mg hydrocortisone', 'Morning dosing reduces HPA suppression', 'Taper after >3 weeks', 'Stress-dose: double/triple or 50-100mg hydrocortisone IV q8h', 'Bisphosphonate prophylaxis if >3 months'],
    warnings: ['HPA suppression (>7.5mg >3 weeks)', 'Osteoporosis', 'Hyperglycemia', 'Immunosuppression/infections', 'Cushingoid features'],
    overdose: 'Acute: hyperglycemia, hypertension, psychosis. Chronic: Cushing syndrome. Management: taper slowly.',
    preg: 'C', brands: ['Prednisolone', 'Dexamethasone', 'Hydrocortisone', 'Methylprednisolone', 'Betamethasone'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ONCOLOGY & IMMUNOMODULATORS
  // ═══════════════════════════════════════════════════════════════════

  'Alkylating agent': {
    moa: 'Alkylates DNA bases (guanine N7), causing cross-linking, strand breaks, and miscoding. Cell cycle non-specific.',
    pk: 'Absorption: IV (most), oral (some). Distribution: widespread (nitrosoureas cross BBB). Half-life: varies. Metabolism: hepatic. Excretion: renal.',
    bbw: ['Secondary malignancies (MDS, AML)', 'Hemorrhagic cystitis (cyclophosphamide) — prevent with mesna'],
    pearls: ['Cyclophosphamide: activated hepatically; mesna prevents hemorrhagic cystitis', 'Cisplatin: aggressive hydration (2-3L) to prevent nephrotoxicity', 'Carboplatin: dosed by AUC (Calvert formula)', 'Temozolomide: crosses BBB (brain tumors)', 'Cyclophosphamide: also immunosuppressant (lupus, vasculitis)'],
    warnings: ['Myelosuppression (nadir 10-14 days)', 'Nephrotoxicity (cisplatin)', 'Ototoxicity (cisplatin)', 'Nausea/vomiting (highly emetogenic)', 'Infertility, teratogenicity'],
    overdose: 'Myelosuppression, mucositis. Management: G-CSF, supportive care. No specific antidote.',
    preg: 'D', brands: ['Cyclophosphamide', 'Ifosfamide', 'Cisplatin', 'Carboplatin', 'Oxaliplatin', 'Temozolomide', 'Bendamustine'],
  },

  'Antimetabolite': {
    moa: 'Inhibits enzymes in DNA/RNA synthesis pathways (folate metabolism, pyrimidine/purine synthesis). Cell cycle-specific (S phase).',
    pk: 'Absorption: varies (methotrexate IM well absorbed, oral variable). Half-life: methotrexate 8-10h (prolonged with renal impairment), 5-FU 10-20min, gemcitabine 30min. Metabolism: varies. Excretion: renal (methotrexate).',
    bbw: ['Methotrexate: fatal toxicities (myelosuppression, hepatotoxicity, pulmonary fibrosis)', 'Caution: 5-FU in DPD deficiency (severe toxicity)'],
    pearls: ['Methotrexate ONCE WEEKLY for RA/lupus (not daily!)', 'Folic acid protects against side effects (1mg daily or 5mg weekly)', '5-FU: infusional better tolerated than bolus', 'Gemcitabine: for pancreatic cancer, NSCLC, bladder cancer', 'Azathioprine: TPMT genotyping recommended'],
    warnings: ['Myelosuppression', 'Hepatotoxicity (methotrexate)', 'Mucositis, stomatitis', 'Nephrotoxicity (methotrexate — alkalinize urine)', 'Teratogenicity (methotrexate)'],
    overdose: 'Myelosuppression, mucositis, renal failure. Management: leucovorin rescue (methotrexate), hydration, alkalinization.',
    preg: 'X', brands: ['Methotrexate', '5-Fluorouracil', 'Capecitabine', 'Gemcitabine', 'Pemetrexed', 'Azathioprine', 'Mercaptopurine'],
  },

  'Antimitotic (taxane/vinca)': {
    moa: 'Taxanes: promote microtubule polymerization and stabilization, blocking mitosis at G2/M. Vinca alkaloids: inhibit microtubule polymerization, blocking mitosis at metaphase.',
    pk: 'Absorption: IV only. Half-life: paclitaxel 3-9h, docetaxel 11-18h, vincristine 16-24h, vinblastine 24h. Metabolism: hepatic (CYP3A4). Excretion: biliary.',
    bbw: ['Taxanes: severe hypersensitivity — premedicate with steroids + antihistamines', 'Vinca alkaloids: neurotoxicity (dose-limiting, cumulative)'],
    pearls: ['Paclitaxel: premedicate 12h and 1h before (dexamethasone + diphenhydramine + H2 blocker)', 'Docetaxel: less neuropathy, more myelosuppression', 'Vincristine: dose-limiting neurotoxicity (constipation, peripheral neuropathy)', 'Vinblastine: myelosuppressive, used for Hodgkin lymphoma', 'Nab-paclitaxel: nanoparticle (less hypersensitivity, no Cremophor EL)'],
    warnings: ['Hypersensitivity reactions (taxanes)', 'Peripheral neuropathy (cumulative)', 'Myelosuppression', 'Alopecia', 'Mucositis'],
    overdose: 'Myelosuppression, mucositis, neurotoxicity. Management: G-CSF, supportive care.',
    preg: 'D', brands: ['Paclitaxel', 'Docetaxel', 'Vincristine', 'Vinblastine', 'Vinorelbine'],
  },

  'Anthracycline': {
    moa: 'Intercalates DNA, inhibits topoisomerase II, and generates reactive oxygen species causing DNA damage. Cell cycle non-specific.',
    pk: 'Absorption: IV only. Half-life: doxorubicin 20-48h (long terminal phase). Metabolism: hepatic. Excretion: biliary.',
    bbw: ['Cumulative cardiotoxicity — lifetime dose limit (doxorubicin 550 mg/m², 450 if mediastinal RT)', 'Anthracyclines are potent vesicants — extravasation causes severe tissue necrosis'],
    pearls: ['Doxorubicin: urine may turn red-pink (harmless)', 'Dexrazoxane: cardioprotective (free radical scavenger) — use if cumulative dose >300 mg/m²', 'Pegylated liposomal doxorubicin: less cardiotoxic, less alopecia, but hand-foot syndrome', 'Epirubicin: less cardiotoxic than doxorubicin per mg', 'Daunorubicin: for AML induction'],
    warnings: ['Cardiotoxicity (cumulative, irreversible) — echocardiogram at baseline and every 100 mg/m²', 'Myelosuppression (nadir 10-14 days)', 'Mucositis/stomatitis', 'Alopecia (complete in most)', 'Extravasation injury'],
    overdose: 'Myelosuppression, mucositis, cardiotoxicity. Management: dexrazoxane, G-CSF, supportive care.',
    preg: 'D', brands: ['Doxorubicin', 'Epirubicin', 'Daunorubicin', 'Idarubicin', 'Bleomycin'],
  },

  'Tyrosine kinase inhibitor': {
    moa: 'Selectively inhibits specific tyrosine kinase enzymes (BCR-ABL, EGFR, VEGFR, PDGFR), blocking cancer cell proliferation and inducing apoptosis.',
    pk: 'Absorption: well absorbed orally (most). Half-life: imatinib 18h, erlotinib 36h, gefitinib 48h, sunitinib 40-60h. Metabolism: hepatic (CYP3A4). Excretion: biliary/fecal.',
    pearls: ['Imatinib: DOC for CML (BCR-ABL), GIST (c-KIT)', 'Erlotinib/gefitinib: EGFR-mutated NSCLC', 'Sunitinib: multi-targeted TKI for RCC, GIST', 'Dasatinib: second-gen BCR-ABL inhibitor (T315I mutation exception)', 'Monitor BCR-ABL PCR for CML response'],
    warnings: ['Myelosuppression', 'Hepatotoxicity — monitor LFTs', 'Edema, fluid retention', 'Cardiac toxicity (imatinib, sunitinib)', 'Skin rash (EGFR inhibitors)'],
    overdose: 'Myelosuppression, hepatotoxicity, GI effects. Management: supportive care.',
    preg: 'D', brands: ['Imatinib', 'Erlotinib', 'Gefitinib', 'Sunitinib', 'Dasatinib', 'Nilotinib', 'Lapatinib'],
  },

  'Antineoplastic (monoclonal antibody)': {
    moa: 'Engineered antibodies targeting specific cancer cell surface antigens or growth factor receptors. Mechanisms include antibody-dependent cellular cytotoxicity (ADCC), complement-dependent cytotoxicity (CDC), receptor blockade, and drug conjugation (ADC).',
    pk: 'Absorption: IV only. Half-life: varies widely (trastuzumab 5-8 days, rituximab 3-6 days, bevacizumab 11-21 days). Metabolism: proteolytic degradation. Excretion: reticuloendothelial.',
    pearls: ['Trastuzumab: HER2+ breast cancer — cardiotoxicity monitoring (echo at baseline)', 'Rituximab: CD20+ B-cell lymphoma, RA, ANCA vasculitis', 'Bevacizumab: anti-VEGF — inhibits angiogenesis (GI perforation risk)', 'Infliximab: anti-TNF for IBD, RA, psoriasis', 'Infections: all carry infection risk (especially HBV reactivation)'],
    warnings: ['Infusion reactions (all monoclonal antibodies)', 'Cardiotoxicity (trastuzumab)', 'Hypertension (bevacizumab)', 'Immunosuppression, infections', 'HBV reactivation screening (rituximab)'],
    overdose: 'Infusion reactions, myelosuppression. Management: supportive care, steroids.',
    preg: 'C', brands: ['Trastuzumab', 'Rituximab', 'Bevacizumab', 'Infliximab', 'Adalimumab', 'Pembrolizumab', 'Nivolumab'],
  },

  'Immunosuppressant': {
    moa: 'Inhibits T-cell activation and proliferation. Calcineurin inhibitors block IL-2 transcription; antimetabolites block purine synthesis; mTOR inhibitors block IL-2 signal transduction.',
    pk: 'Absorption: variable. Half-life: cyclosporine 8-12h, tacrolimus 12-15h, mycophenolate 16-18h, sirolimus 57-63h. Metabolism: hepatic (CYP3A4). Excretion: biliary.',
    pearls: ['Cyclosporine: trough level monitoring essential', 'Tacrolimus: more potent than cyclosporine but more diabetogenic', 'Mycophenolate: preferred over azathioprene for renal transplant', 'Sirolimus: used for drug-eluting stents, Kaposi sarcoma', 'Azathioprine: TPMT genotyping — reduce dose if deficient'],
    warnings: ['Increased infection risk', 'Malignancy risk (lymphoma, skin cancer)', 'Nephrotoxicity (calcineurin inhibitors)', 'Bone marrow suppression', 'Metabolic: diabetes, hyperlipidemia, hypokalemia'],
    overdose: 'Nephrotoxicity, neurotoxicity, myelosuppression. Management: supportive care, reduce dose.',
    preg: 'D', brands: ['Cyclosporine', 'Tacrolimus', 'Mycophenolate', 'Sirolimus', 'Azathioprine', 'Everolimus'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ANAESTHESIA & ACUTE CARE
  // ═══════════════════════════════════════════════════════════════════

  'IV anaesthetic': {
    moa: 'Varies: propofol potentiates GABA-A (Cl- channel); etomidate potentiates GABA-A; ketamine NMDA antagonist (dissociative); thiopental barbiturate (GABA-A); dexmedetomidine alpha-2 agonist (sedation).',
    pk: 'Absorption: IV only (except ketamine: IM). Onset: propofol 15-30s, etomidate 30-60s, ketamine 30-60s. Duration: propofol 5-10min, etomidate 5-10min, ketamine 10-20min. Half-life: propofol 2-4h, etomidate 2-3h, ketamine 2-3h.',
    pearls: ['Propofol: most common IV induction agent', 'Propofol: pain on injection — give lidocaine before', 'Ketamine: safe in hemodynamically unstable patients (sympathomimetic)', 'Etomidate: minimal cardiovascular depression', 'Dexmedetomidine: ICU sedation (no respiratory depression)'],
    warnings: ['Propofol: hypotension, respiratory depression, injection pain', 'Ketamine: hallucinations, increased ICP, hypertension', 'Etomidate: adrenal suppression (single dose)', 'Propofol infusion syndrome (prolonged >48h high dose)', 'Pseudomonas risk (propofol)'],
    overdose: 'Respiratory depression, hypotension, coma. Management: supportive care, intubation, vasopressors.',
    preg: 'C', brands: ['Propofol', 'Ketamine', 'Etomidate', 'Thiopental', 'Dexmedetomidine'],
  },

  'Local anaesthetic': {
    moa: 'Blocks voltage-gated sodium channels in nerve fibers, preventing impulse conduction. Amides (lidocaine, bupivacaine) metabolized by liver. Esters (procaine, chloroprocaine) metabolized by plasma cholinesterase.',
    pk: 'Absorption: depends on site, vascularity, and epinephrine use. Onset: lidocaine 1-3min, bupivacaine 3-5min. Duration: lidocaine 1-2h, bupivacaine 4-8h. Metabolism: hepatic (amides), plasma (esters). Excretion: renal.',
    pearls: ['Max doses: lidocaine 3mg/kg (plain), 7mg/kg (with epi); bupivacaine 2.5mg/kg (plain)', 'Lipid emulsion: antidote for LAST (local anaesthetic systemic toxicity)', 'Levobupivacaine: less cardiotoxic than bupivacaine', 'Epinephrine prolongs duration and reduces systemic absorption', 'Ropivacaine: least cardiotoxic long-acting LA'],
    warnings: ['LAST (local anaesthetic systemic toxicity): seizures, cardiac arrest', 'Cardiac toxicity: bupivacaine most cardiotoxic', 'Methemoglobinemia (prilocaine, benzocaine)', 'Allergic reactions (esters more than amides)', 'Neurotoxicity (intraneural injection)'],
    overdose: 'LAST: seizures → cardiovascular collapse. Management: 20% lipid emulsion 1.5mL/kg IV bolus, then 0.25mL/kg/min infusion. ABCs, benzodiazepines for seizures.',
    preg: 'B', brands: ['Lidocaine', 'Bupivacaine', 'Ropivacaine', 'Levobupivacaine', 'Procaine'],
  },

  'Neuromuscular blocking agent': {
    moa: 'Depolarizing (succinylcholine): mimics ACh at NMJ, causing depolarization then paralysis. Non-depolarizing (rocuronium, vecuronium, atracurium): competitive ACh antagonists at NMJ.',
    pk: 'Absorption: IV only. Onset: succinylcholine 1min, rocuronium 1-2min. Duration: succinylcholine 5-10min, rocuronium 30-40min, vecuronium 25-40min. Metabolism: hepatic (rocuronium, vecuronium), plasma (succinylcholine, atracurium). Excretion: renal/biliary.',
    pearls: ['Succinylcholine: intubating dose 1-1.5mg/kg (fastest onset)', 'Rocuronium: intubating dose 0.6-1.2mg/kg (dose-dependent onset)', 'Sugammadex: reversal agent for rocuronium (selective relaxant binding)', 'Neostigmine: reversal for non-depolarizing NMBs (anticholinesterase)', 'Succinylcholine: only for RSI (rapid sequence intubation)'],
    warnings: ['Succinylcholine: hyperkalemia in burns, trauma, neuromuscular disease', 'Succinylcholine: malignant hyperthermia (genetic)', 'Prolonged paralysis: pseudocholinesterase deficiency (succinylcholine)', 'Residual neuromuscular blockade (post-op respiratory depression)', 'Anaphylaxis (rare but severe)'],
    overdose: 'Prolonged paralysis, respiratory arrest. Management: mechanical ventilation, sugammadex or neostigmine for reversal.',
    preg: 'C', brands: ['Succinylcholine', 'Rocuronium', 'Vecuronium', 'Atracurium', 'Cisatracurium'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // TOXICOLOGY & ANTIDOTES
  // ═══════════════════════════════════════════════════════════════════

  'Antidote': {
    moa: 'Naloxone: competitive mu-opioid receptor antagonist. N-acetylcysteine: glutathione precursor, binds NAPQI (paracetamol metabolite). Flumazenil: competitive benzodiazepine antagonist. Deferoxamine: iron chelator. Fomepizole: alcohol dehydrogenase inhibitor (ethylene glycol/methanol).',
    pk: 'Varies by agent. Naloxone: half-life 30-90min (shorter than opioids — renarcotization risk). NAC: half-life 5-6h. Flumazenil: half-life 40-80min.',
    pearls: ['Naloxone: titrate to respiratory improvement (not full reversal)', 'NAC: most effective within 8h of paracetamol overdose', 'Flumazenil: avoid in chronic BZD users (seizure risk)', 'Activated charcoal: within 1-2h of ingestion for most drugs', 'Deferoxamine: for iron poisoning (vinegar-colored urine = positive)'],
    warnings: ['Naloxone: precipitated withdrawal in opioid-dependent patients', 'Flumazenil: seizure risk in chronic BZD users', 'NAC: anaphylactoid reactions (10% IV)', 'Deferoxamine: hypotension, ARDS with prolonged infusion', 'Multiple-dose activated charcoal: aspiration risk'],
    overdose: 'N/A — these are antidotes for overdose.',
    preg: 'C', brands: ['Naloxone', 'N-Acetylcysteine', 'Flumazenil', 'Deferoxamine', 'Fomepizole', 'Atropine', 'Prussian Blue'],
  },

  'Chelating agent': {
    moa: 'Bind heavy metals, forming stable water-soluble complexes excreted by kidneys. DMSA/succimer: for lead, mercury. EDTA: for lead. Deferasirox: for iron overload. D-penicillamine: for Wilson disease (copper).',
    pk: 'Absorption: DMSA oral, EDTA IV, deferasirox oral. Half-life: DMSA 2-4h, deferasirox 8-16h. Metabolism: hepatic (deferasirox). Excretion: renal.',
    pearls: ['DMSA (succimer): oral lead chelation (mild-moderate)', 'EDTA CaNa2: IV lead chelation (severe, blood lead >70)', 'Deferasirox: oral iron chelator for transfusion-dependent anemias', 'D-penicillamine: for Wilson disease and severe rheumatoid arthritis', 'Prussian Blue: for thallium and cesium poisoning'],
    warnings: ['Nephrotoxicity (EDTA, deferasirox)', 'Hepatotoxicity (deferasirox)', 'GI upset (DMSA, deferasirox)', 'Hypokalemia (DMSA)', 'Bone marrow suppression (deferasirox)'],
    overdose: 'Symptoms: GI upset, electrolyte disturbances. Management: supportive care, discontinue chelator.',
    preg: 'C', brands: ['DMSA', 'EDTA', 'Deferasirox', 'D-Penicillamine', 'Prussian Blue'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // DERMATOLOGY & OPHTHALMOLOGY
  // ═══════════════════════════════════════════════════════════════════

  'Topical corticosteroid': {
    moa: 'Glucocorticoid receptor agonist in skin cells, reducing pro-inflammatory cytokines and immune cell migration.',
    pk: 'Absorption: topical (minimal systemic). Onset: 1-3 days. Duration: varies by potency and vehicle.',
    pearls: ['Low-potency (hydrocortisone): face, intertriginous areas', 'High-potency (clobetasol): body, palms, soles (limit 2 weeks)', 'Mid-potency (betamethasone): most body areas', 'Ointment > cream for potency; cream for weepy lesions', 'Avoid prolonged use on face, axillae, groin'],
    warnings: ['Skin atrophy (prolonged high potency)', 'Striae (irreversible)', 'Tachyphylaxis', 'Topical steroid withdrawal (rebound dermatitis)', 'Hirsutism, acneiform eruptions'],
    overdose: 'Systemic absorption in extensive use: HPA suppression, Cushing syndrome. Management: taper gradually.',
    preg: 'C', brands: ['Hydrocortisone', 'Betamethasone', 'Clobetasol', 'Mometasone', 'Fluticasone propionate'],
  },

  'Topical antifungal': {
    moa: 'Azoles: inhibit ergosterol synthesis (CYP50 14-alpha-demethylase). Allylamines: inhibit squalene epoxidase. Polyenes (nystatin): bind ergosterol directly.',
    pk: 'Absorption: topical (minimal systemic). Onset: varies. Duration: 1-4 weeks depending on infection.',
    pearls: ['Terbinafine 1% cream: first-line dermatophyte', 'Clotrimazole: broad-spectrum azole', 'Ketoconazole: also for seborrheic dermatitis (shampoo)', 'Continue 1-2 weeks after symptoms resolve', 'Nystatin: oral thrush (swish and swallow)'],
    warnings: ['Local irritation, stinging', 'Allergic contact dermatitis', 'Hepatotoxicity (rare, systemic azoles)', 'Photosensitivity (terbinafine)'],
    overdose: 'Local irritation. Management: discontinue if irritation persists.',
    preg: 'B', brands: ['Terbinafine', 'Clotrimazole', 'Ketoconazole', 'Miconazole', 'Nystatin'],
  },

  'Retinoid': {
    moa: 'Binds nuclear retinoic acid receptors (RARs, RXRs), modulating gene expression for cell differentiation, proliferation, and keratinization. Topical: reduces sebum production, comedolysis. Systemic: reduces sebum, anti-inflammatory, anti-keratinizing.',
    pk: 'Absorption: variable. Systemic retinoids: highly lipophilic, accumulate in fat. Half-life: isotretinoin 17-50h (metabolites longer). Metabolism: hepatic. Excretion: biliary.',
    bbw: ['Isotretinoin: severe birth defects (REMS program, pregnancy test before/during)', 'Isotretinoin: depression, suicidal ideation (monitor for mood changes)'],
    pearls: ['Isotretinoin: DOC for severe nodulocystic acne', 'Take with fatty meal (increases absorption 83%)', 'Topical retinoids (tretinoin, adapalene): first-line for mild-moderate acne', 'Tazarotene: most potent topical retinoid (psoriasis, acne)', 'Monitor LFTs and lipids monthly during isotretinoin'],
    warnings: ['Teratogenicity (major birth defects)', 'Hepatotoxicity', 'Hypertriglyceridemia, hypercholesterolemia', 'Dry skin, cheilitis, dry eyes (universal with systemic)', 'Depression, pseudotumor cerebri'],
    overdose: 'Teratogenicity (if pregnant during therapy). Management: vitamin A supplementation, pregnancy prevention.',
    preg: 'X', brands: ['Isotretinoin', 'Accutane', 'Tretinoin', 'Adapalene', 'Tazarotene'],
  },

  'Ophthalmic agent': {
    moa: 'Timolol: beta-blocker reduces aqueous humor production. Latanoprost: prostaglandin analogue increases uveoscleral outflow. Pilocarpine: miotic (contracts ciliary muscle). Dorzolamide: CA inhibitor reduces aqueous production.',
    pk: 'Absorption: ophthalmic (some systemic absorption). Onset: varies. Half-life: timolol 4h, latanoprost 2-3h (prodrug).',
    pearls: ['Latanoprost: first-line for open-angle glaucoma', 'Timolol: second-line; avoid in asthma/COPD', 'Latanoprost: iris color change (permanent) — warn patients', 'Apply nasolacrimal occlusion (reduce systemic absorption)', 'Dorzolamide: CA inhibitor — avoid in sulfonamide allergy'],
    warnings: ['Systemic absorption: bradycardia (timolol)', 'Iris color change (latanoprost)', 'Ciliary congestion (prostaglandin analogues)', 'Corneal edema', 'Allergic conjunctivitis'],
    overdose: 'Systemic: bradycardia, hypotension, bronchospasm. Management: atropine, beta-agonist inhaler.',
    preg: 'C', brands: ['Timolol', 'Latanoprost', 'Dorzolamide', 'Brimonidine', 'Pilocarpine', 'Travoprost'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // NUTRITION & SUPPLEMENTS
  // ═══════════════════════════════════════════════════════════════════

  'Vitamin': {
    moa: 'Provides essential micronutrients required for normal metabolic function, enzyme activity, and cellular processes.',
    pk: 'Absorption: water-soluble (B, C) well absorbed; fat-soluble (A, D, E, K) require fat for absorption. Excretion: water-soluble renal; fat-soluble hepatic/biliary.',
    pearls: ['Vitamin D: 800-2000 IU/day maintenance; measure 25(OH)D for status', 'Vitamin B12: IM injection for pernicious anemia', 'Folic acid: 400mcg preconception (neural tube defect prevention)', 'Vitamin C: enhances iron absorption', 'Vitamin K: needed for warfarin interaction — maintain consistent intake'],
    warnings: ['Fat-soluble vitamin toxicity (A, D, E, K)', 'Hypervitaminosis A (teratogenic, liver toxicity)', 'Vitamin D toxicity: hypercalcemia (rare)', 'Folic acid: masks B12 deficiency', 'Warfarin interaction with vitamin K-rich foods'],
    overdose: 'Fat-soluble vitamins accumulate. Management: discontinue supplement, supportive care.',
    preg: 'A', brands: ['Vitamin D', 'Vitamin C', 'Folic Acid', 'Vitamin B12', 'Vitamin A', 'Multivitamins'],
  },

  'Mineral supplement': {
    moa: 'Provides essential minerals: calcium (bone health, muscle function), iron (hemoglobin synthesis), magnesium (enzyme cofactor), zinc (immune function, wound healing), potassium (membrane potential).',
    pk: 'Absorption: varies (iron enhanced by vitamin C; calcium reduced by phytates). Distribution: varies. Excretion: renal.',
    pearls: ['Iron: take with vitamin C on empty stomach (but GI upset → take with food)', 'Calcium: split doses (max 500mg per dose for absorption)', 'Magnesium: oxide for constipation, citrate for absorption', 'Potassium: extended-release reduces GI irritation', 'Zinc: 20mg for 10-14 days reduces diarrhea duration in children'],
    warnings: ['Iron: constipation, GI upset; toxicity fatal in children', 'Calcium: hypercalcemia, kidney stones', 'Magnesium: diarrhea (oxide), hypermagnesemia (renal impairment)', 'Potassium: hyperkalemia (renal impairment)', 'Zinc: copper deficiency with chronic high-dose'],
    overdose: 'Iron toxicity (most dangerous in children): GI necrosis, hepatotoxicity, cardiovascular collapse. Management: deferoxamine. Calcium: hypercalcemia. Management: hydration, bisphosphonates.',
    preg: 'A', brands: ['Iron', 'Calcium', 'Magnesium', 'Zinc', 'Potassium', 'Ferrous Sulfate'],
  },

  'Electrolyte': {
    moa: 'Replaces essential electrolytes to correct deficits and maintain acid-base balance. Sodium chloride (volume expansion), sodium bicarbonate (alkalinization), potassium chloride (hypokalemia), calcium gluconate (hypocalcemia), magnesium sulfate (hypomagnesemia/eclampsia).',
    pk: 'Absorption: IV (immediate), oral (variable). Distribution: extracellular primarily. Excretion: renal.',
    pearls: ['IV potassium: always diluted and infused slowly (max 10-20 mEq/h through peripheral line)', 'Calcium gluconate: less irritating than CaCl2 — peripheral OK', 'Magnesium sulfate: monitor DTRs and respiratory rate (toxicity = loss of DTRs)', 'Sodium bicarbonate: for metabolic acidosis, hyperkalemia', 'ORS: WHO formula for dehydration from diarrhea'],
    warnings: ['Hyperkalemia (potassium supplementation)', 'Hypercalcemia (calcium supplementation)', 'Hypermagnesemia (magnesium — respiratory depression, cardiac arrest)', 'Volume overload (saline)', 'Tissue necrosis (IV potassium extravasation, CaCl2)'],
    overdose: 'Hyperkalemia: peaked T waves, widened QRS, sine wave. Hypercalcemia: lethargy, confusion, cardiac arrest. Hypermagnesemia: respiratory depression, cardiac arrest. Management: calcium gluconate for cardioprotection, insulin+glucose for hyperkalemia, calcium gluconate + furosemide for hypermagnesemia.',
    preg: 'A', brands: ['Sodium Chloride', 'Potassium Chloride', 'Calcium Gluconate', 'Magnesium Sulfate', 'Sodium Bicarbonate', 'ORS'],
  },

  // ═══════════════════════════════════════════════════════════════════
  // MISCELLANEOUS
  // ═══════════════════════════════════════════════════════════════════

  'Antihistamine': {
    moa: 'H1-receptor antagonist: competes with histamine at H1 receptors, blocking allergic responses (rhinitis, urticaria, pruritus). First-generation also blocks muscarinic, serotonergic, and alpha-adrenergic receptors (sedating, anticholinergic).',
    pk: 'Absorption: well absorbed. First-generation: cross BBB (sedation). Second-generation: limited BBB penetration (less sedation). Half-life: diphenhydramine 4-8h, cetirizine 8h, loratadine 8-12h, fexofenadine 14h.',
    pearls: ['Second-gen preferred (less sedation, less anticholinergic)', 'Cetirizine: most potent second-gen (but slightly more sedating)', 'Fexofenadine: least sedating, but do not take with fruit juice', 'Diphenhydramine: also for insomnia, motion sickness, acute dystonia', 'Hydroxyzine: anxiolytic, antipruritic, sedative'],
    warnings: ['First-gen: sedation, dry mouth, urinary retention, blurred vision', 'QT prolongation (diphenhydramine, hydroxyzine at high doses)', 'Paradoxical excitation (elderly, children)', 'Fall risk in elderly (first-gen)', 'Cetirizine: less sedating but still caution driving'],
    overdose: 'First-gen: anticholinergic toxidrome (red, hot, dry, blind, mad, fast). Management: physostigmine for severe. Second-gen: headache, tachycardia.',
    preg: 'B', brands: ['Cetirizine', 'Loratadine', 'Fexofenadine', 'Diphenhydramine', 'Chlorpheniramine', 'Hydroxyzine'],
  },

  'Scabicide/Pediculicide': {
    moa: 'Disrupts sodium channel function in arthropod nerve cells, causing paralysis and death. Permethrin: synthetic pyrethroid. Ivermectin: GluCl channel agonist (paralysis).',
    pk: 'Absorption: topical (minimal systemic). Half-life: permethrin 3-7h (topical). Ivermectin: 18h (oral).',
    pearls: ['Permethrin 5% cream: first-line for scabies (apply neck to soles, leave 8-14h)', 'Ivermectin: oral alternative for crusted scabies or treatment failure', 'Treat all household contacts simultaneously', 'Wash all clothing/linens in hot water', 'Repeat treatment in 1-2 weeks (kills newly hatched nymphs)'],
    warnings: ['Local irritation, stinging', 'Scabies eruption may persist 2-4 weeks post-treatment (immune response)', 'Permethrin: avoid eyes and mucous membranes', 'Ivermectin: avoid in pregnancy and children <15kg', 'Neurotoxicity (high doses of permethrin — rare with topical use)'],
    overdose: 'Local irritation. Ivermectin overdose: CNS depression, ataxia, blindness (in animals). Management: supportive care.',
    preg: 'B', brands: ['Permethrin', 'Ivermectin', 'Malathion', 'Spinosad'],
  },

  'Oxytocic': {
    moa: 'Oxytocin: stimulates uterine smooth muscle contraction via oxytocin receptors (Gq-coupled, increases intracellular Ca2+). Ergot alkaloids: direct myometrial contraction (also vasoconstrictive). Misoprostol: PGE1 analogue, ripens cervix and contracts uterus.',
    pk: 'Absorption: oxytocin IV (onset 1-3min), nasal spray (for lactation). Misoprostol: oral/sublingual/vaginal (absorption variable). Ergometrine: IM/IV (onset 2-5min IM).',
    pearls: ['Oxytocin: DOC for postpartum hemorrhage (40U in 1L NS infusion)', 'Misoprostol: cervical ripening, postpartum hemorrhage (600mcg sublingual)', 'Ergometrine: used with oxytocin (risk of hypertension)', 'Oxytocin: uterine rupture risk at high doses (avoid in previous C-section)', 'Carbetocin: long-acting oxytocin analogue (single-dose for PPH prevention)'],
    warnings: ['Uterine rupture (oxytocin — especially with previous C-section)', 'Water intoxication/hyponatremia (oxytocin — large IV volumes)', 'Hypertension (ergometrine)', 'Nausea, vomiting (ergometrine)', 'Diarrhea, fever (misoprostol)'],
    overdose: 'Uterine hyperstimulation, tetanic contractions, uterine rupture. Management: discontinue oxytocin, IV nitroglycerin (uterine relaxation).',
    preg: 'C', brands: ['Oxytocin', 'Misoprostol', 'Ergometrine', 'Carbetocin', 'Dinoprostone'],
  },

  'Vaccine/Immunoglobulin': {
    moa: 'Vaccines: stimulate active immunity by exposing to antigens (attenuated, inactivated, subunit, mRNA). Immunoglobulins: provide passive immunity (preformed antibodies).',
    pk: 'Absorption: IM/SC (vaccines, immunoglobulins), IV (immunoglobulins). Onset: vaccines 2-4 weeks for immunity. Immunoglobulins: immediate protection.',
    pearls: ['Live vaccines: MMR, varicella, yellow fever — avoid in immunocompromised', 'Hepatitis B vaccine: first dose within 12h of birth', 'Rabies post-exposure: HRIG + vaccine series', 'Tetanus prophylaxis: Td/Tdap depending on history', 'COVID-19 vaccines: mRNA and adenoviral vector platforms'],
    warnings: ['Injection site reactions (pain, swelling, erythema)', 'Anaphylaxis (rare but serious)', 'Fever, malaise (reactive — expected)', 'Lymphadenopathy', 'Guillain-Barré syndrome (very rare, some vaccines)'],
    overdose: 'Not applicable (vaccines/immunoglobulins are not "overdosed" in traditional sense). Management: monitor for allergic reactions.',
    preg: 'C', brands: ['MMR', 'Tdap', 'Hepatitis B', 'HPV', 'Influenza', 'Pneumococcal', 'Rabies Immune Globulin', 'IVIG'],
  },

  'Antipsoriatic': {
    moa: 'Methotrexate: inhibits dihydrofolate reductase, reducing DNA synthesis in rapidly dividing keratinocytes. Apremilast: PDE4 inhibitor, reducing inflammatory mediators. Acitretin: retinoid, normalizes keratinocyte differentiation.',
    pk: 'Absorption: varies. Half-life: methotrexate 8-10h, apremilast 7-9h, acitretin 49h (effective 100 days). Metabolism: hepatic. Excretion: renal.',
    pearls: ['Methotrexate: once-weekly dosing (NOT daily)', 'Folic acid co-prescription reduces side effects', 'Apremilast: oral, immunomodulatory (fewer side effects than MTX)', 'Acitretin: teratogenic (avoid pregnancy for 3 years after last dose)', 'Biologics (TNF inhibitors, IL-17/23 inhibitors) for moderate-severe psoriasis'],
    warnings: ['Methotrexate: myelosuppression, hepatotoxicity, pulmonary fibrosis', 'Acitretin: teratogenic, hyperlipidemia, cheilitis', 'Apremilast: diarrhea, nausea, depression', 'All: increased infection risk', 'Lymphoma risk (immunosuppressants)'],
    overdose: 'Methotrexate: myelosuppression, mucositis. Management: leucovorin rescue. Others: supportive care.',
    preg: 'X', brands: ['Methotrexate', 'Apremilast', 'Acitretin', 'Adalimumab', 'Secukinumab', 'Ixekizumab'],
  },

  'Smoking cessation': {
    moa: 'Nicotine replacement: provides controlled nicotine to reduce withdrawal symptoms and cravings. Varenicline: partial nicotinic acetylcholine receptor agonist — reduces cravings and reward from smoking. Bupropion: NE/DA reuptake inhibitor (same as Wellbutrin) — reduces withdrawal and reward.',
    pk: 'Nicotine: half-life 1-2h. Varenicline: half-life 24h. Bupropion: half-life 21h. Metabolism: hepatic. Excretion: renal.',
    pearls: ['Varenicline: most effective pharmacotherapy (NNT = 8)', 'Bupropion: start 1-2 weeks before quit date, take for 12 weeks', 'Nicotine patch: 21mg/day (smoke >10/day) → taper over 8-12 weeks', 'Combination NRT (patch + gum/lozenge) more effective than monotherapy', 'Counseling + pharmacotherapy doubles quit rates'],
    warnings: ['Varenicline: nausea (most common), vivid dreams, depression, cardiovascular events (controversial)', 'Bupropion: seizure risk (contraindicated in eating disorders, seizure history)', 'Nicotine: cardiovascular effects (hypertension, tachycardia)', 'Hiccups, dyspepsia (nicotine gum)', 'Insomnia (bupropion, nicotine)'],
    overdose: 'Nicotine toxicity: nausea, vomiting, salivation, tachycardia, seizures, respiratory failure. Management: IV fluids, activated charcoal, benzodiazepines for seizures.',
    preg: 'C', brands: ['Varenicline', 'Bupropion', 'Nicotine Patch', 'Nicotine Gum', 'Nicotine Lozenge', 'Nortriptyline'],
  },
}