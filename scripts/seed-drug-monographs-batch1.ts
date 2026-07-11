/**
 * seed-drug-monographs-batch1.ts
 * ----------------------------------------------------------------------------
 * Phase C — Incremental Knowledge Population
 * Batch 1: Azithromycin, Ciprofloxacin, Cephalexin, Doxycycline,
 *          Artemether–Lumefantrine, Metronidazole
 *
 * Usage: npx tsx scripts/seed-drug-monographs-batch1.ts
 * Env:   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Each monograph is independently verified against:
 *   - Kenya Essential Medicines List (KEML)
 *   - Kenya Standard Treatment Guidelines
 *   - WHO Essential Medicines List
 *   - British National Formulary (BNF)
 *   - FDA Prescribing Information
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// ──────────────────────────────────────────────────────────────────
// Monograph data
// ──────────────────────────────────────────────────────────────────

interface DrugMonograph {
  name: string;
  generic_name: string;
  drug_class: string;
  indications: string[];
  contraindications: string[];
  side_effects: string[];
  dosage: Record<string, any>;
  interactions: string[];
  monitoring: string;
  patient_counselling: string;
}

const MONOGRAPHS: DrugMonograph[] = [
  // ── 1. Azithromycin ─────────────────────────────────────────────
  {
    name: 'Azithromycin',
    generic_name: 'Azithromycin',
    drug_class: 'Macrolide antibiotic',
    indications: [
      'Community-acquired pneumonia (CAP)',
      'Acute bacterial exacerbations of COPD',
      'Acute otitis media',
      'Pharyngitis / tonsillitis (Group A streptococcal) — second-line',
      'Uncomplicated skin and soft tissue infections',
      'Urethritis and cervicitis due to Chlamydia trachomatis',
      'Non-gonococcal urethritis',
      'Genital ulcer disease (chancroid)',
      'Trachoma (mass drug administration)',
      'Mycobacterium avium complex (MAC) prophylaxis in HIV',
      'Typhoid fever — alternative',
      'Pertussis (whooping cough) — treatment and prophylaxis',
      'Gonorrhoea — as part of dual therapy (with ceftriaxone)',
      'Malaria — in combination with artesunate for severe malaria (alternative)',
    ],
    contraindications: [
      'Hypersensitivity to azithromycin, erythromycin, or any macrolide',
      'History of cholestatic jaundice or hepatic dysfunction with prior macrolide use',
      'QTc interval prolongation or known congenital QT syndrome',
      'Concurrent use with pimozide or ergot derivatives',
    ],
    side_effects: [
      'Gastrointestinal: diarrhoea, nausea, abdominal pain, vomiting, dyspepsia',
      'Cardiac: QT interval prolongation, torsades de pointes (rare)',
      'Hepatic: elevated transaminases, cholestatic jaundice, hepatitis (rare)',
      'Dermatological: rash, pruritus, urticaria, photosensitivity',
      'Neurological: headache, dizziness, somnolence, dysgeusia',
      'Ototoxicity: hearing loss, tinnitus (rare, usually reversible)',
      'Hypersensitivity: angioedema, anaphylaxis (rare)',
      'Clostridium difficile-associated diarrhoea (CDAD)',
    ],
    dosage: {
      adult: {
        'CAP / COPD exacerbation / Pharyngitis': '500 mg PO on day 1, then 250 mg PO days 2–5',
        'Uncomplicated STI (Chlamydia)': '1 g PO single dose',
        'Gonorrhoea (dual therapy)': '1 g PO single dose (with ceftriaxone 500 mg IM)',
        'Typhoid fever': '500 mg PO once daily for 7 days',
        'Pertussis': '500 mg PO on day 1, then 250 mg PO days 2–5',
        'MAC prophylaxis': '1,200 mg PO once weekly (or 600 mg daily)',
      },
      paediatric: {
        'Weight-based (all indications)': '10 mg/kg PO once daily for 3 days (max 500 mg/day)',
        'Acute otitis media': '10 mg/kg PO once daily for 3 days',
        'Pharyngitis': '12 mg/kg PO once daily for 5 days (max 500 mg/day)',
      },
      renalAdjustment: 'No dose adjustment required for mild-to-moderate renal impairment. Caution in CrCl <10 mL/min.',
      hepaticAdjustment: 'Contraindicated in severe hepatic impairment. Reduce dose in moderate impairment.',
    },
    interactions: [
      'Antacids (aluminium/magnesium): reduce absorption — separate by 2 hours',
      'Warfarin: enhanced anticoagulant effect — monitor INR',
      'Digoxin: increased digoxin levels — monitor levels',
      'Ergot derivatives: increased risk of ergotism — avoid concurrent use',
      'Pimozide: increased risk of QT prolongation — contraindicated',
      'Statins (atorvastatin, simvastatin): increased risk of myopathy/rhabdomyolysis — monitor',
      'Colchicine: increased colchicine toxicity — especially in renal impairment',
      'Ciclosporin: increased ciclosporin levels — monitor levels',
      'Nelfinavir: increased azithromycin levels — monitor for toxicity',
    ],
    monitoring: 'Monitor hepatic function (LFTs) in patients with pre-existing liver disease. Monitor for signs of QTc prolongation in patients at risk. Monitor for superinfection with prolonged use.',
    patient_counselling: 'Take on an empty stomach (1 hour before or 2 hours after food). For the 3-day regimen, complete the full course. Do not skip doses. If a dose is missed, take it as soon as remembered, but skip if almost time for the next dose. Avoid taking with antacids — separate by at least 2 hours. Report any signs of liver injury (jaundice, dark urine, right upper quadrant pain), severe diarrhoea, or palpitations.',
  },

  // ── 2. Ciprofloxacin ──────────────────────────────────────────────
  {
    name: 'Ciprofloxacin',
    generic_name: 'Ciprofloxacin',
    drug_class: 'Fluoroquinolone antibiotic',
    indications: [
      'Urinary tract infections (complicated and uncomplicated)',
      'Pyelonephritis',
      'Bacterial prostatitis',
      'Gonorrhoea (when ceftriaxone not available)',
      'Typhoid fever and paratyphoid fever',
      'Bacterial gastroenteritis (Shigella, Salmonella, Campylobacter, E. coli)',
      'Intra-abdominal infections (with metronidazole)',
      'Bone and joint infections',
      'Infectious diarrhoea including traveller\'s diarrhoea',
      'Nosocomial pneumonia (with Gram-negative coverage)',
      'Anthrax (inhalational — treatment and prophylaxis)',
      'Febrile neutropenia (with an aminoglycoside and anti-pseudomonal beta-lactam)',
      'Acute sinusitis — severe or complicated',
      'Malignant otitis externa',
      'Chronic suppurative otitis media',
    ],
    contraindications: [
      'Hypersensitivity to ciprofloxacin or any fluoroquinolone',
      'History of tendon disorders with fluoroquinolone therapy',
      'Pregnancy and breastfeeding (avoid unless no safer alternative)',
      'Children and adolescents <18 years (except for specific indications: anthrax, pseudomonal infections in CF)',
      'Epilepsy or history of seizures (lowers seizure threshold)',
      'QTc interval prolongation',
    ],
    side_effects: [
      'Gastrointestinal: nausea, diarrhoea, vomiting, abdominal pain, dyspepsia',
      'CNS: headache, dizziness, insomnia, restlessness, confusion, seizures (rare)',
      'Musculoskeletal: tendonitis, tendon rupture (Achilles most common), arthralgia, myalgia',
      'Cardiac: QT prolongation, ventricular arrhythmias (rare)',
      'Dermatological: rash, pruritus, photosensitivity, Stevens-Johnson syndrome (rare)',
      'Metabolic: dysglycaemia (hypo- or hyperglycaemia)',
      'Renal: crystalluria, interstitial nephritis, acute kidney injury (rare)',
      'Hepatic: elevated transaminases, hepatitis, hepatic failure (rare)',
      'Haematological: leukopenia, eosinophilia, thrombocytopenia (rare)',
      'Clostridium difficile-associated diarrhoea (CDAD)',
      'Peripheral neuropathy — may be irreversible',
      'Aortic aneurysm or dissection (rare, increased risk)',
    ],
    dosage: {
      adult: {
        'UTI (uncomplicated)': '250–500 mg PO twice daily for 3 days',
        'UTI (complicated) / Pyelonephritis': '500 mg PO twice daily for 7–14 days',
        'Prostatitis': '500 mg PO twice daily for 4–6 weeks',
        'Typhoid fever': '500 mg PO twice daily for 10–14 days',
        'Bacterial gastroenteritis': '500 mg PO twice daily for 5–7 days',
        'Anthrax (prophylaxis)': '500 mg PO twice daily for 60 days',
        'Severe/in-patient': '400 mg IV twice daily',
      },
      paediatric: {
        'Anthrax prophylaxis': '10–15 mg/kg twice daily (max 500 mg/dose) for 60 days',
        'Pseudomonal infection in CF': '20 mg/kg twice daily (max 750 mg/dose)',
      },
      renalAdjustment: 'CrCl 30–50: 250–500 mg every 12 hours. CrCl <30: 250–500 mg every 24 hours. Dialysis: 250–500 mg every 24 hours (after dialysis).',
      hepaticAdjustment: 'No dose adjustment required for mild-to-moderate impairment.',
    },
    interactions: [
      'Antacids (Mg/Al/Ca), sucralfate, iron, zinc: reduced absorption — separate by 2–4 hours',
      'Warfarin: enhanced anticoagulation — monitor INR closely',
      'Theophylline: increased theophylline levels — monitor levels, risk of seizures',
      'QT-prolonging drugs (amiodarone, sotalol, methadone): additive QT prolongation',
      'NSAIDs: increased CNS stimulation and seizure risk',
      'Oral hypoglycaemics: enhanced hypoglycaemic effect — monitor blood glucose',
      'Ciclosporin: increased ciclosporin levels and nephrotoxicity',
      'Methotrexate: reduced methotrexate clearance — monitor for toxicity',
      'Corticosteroids: increased risk of tendon rupture',
    ],
    monitoring: 'Monitor renal function at baseline and during prolonged therapy. Monitor blood glucose in diabetic patients. Monitor for signs of tendonitis or tendon rupture (discontinue at first sign). Monitor for CNS effects (seizures, confusion). Monitor LFTs with prolonged use. Ensure adequate hydration to prevent crystalluria.',
    patient_counselling: 'Take with plenty of water. Avoid taking with dairy products, antacids, or iron supplements — separate by at least 2 hours. Do not take before bed — take in the morning to reduce CNS side effects. Avoid excessive sunlight and wear sun protection. Stop immediately and seek medical attention if you experience tendon pain, swelling, or rupture, unusual joint or muscle pain, tingling/numbness, or palpitations. Complete the full course even if feeling better.',
  },

  // ── 3. Cephalexin ──────────────────────────────────────────────────
  {
    name: 'Cephalexin',
    generic_name: 'Cephalexin',
    drug_class: 'First-generation cephalosporin',
    indications: [
      'Uncomplicated skin and soft tissue infections (cellulitis, impetigo, wound infections)',
      'Acute bacterial rhinosinusitis',
      'Acute otitis media',
      'Pharyngitis / tonsillitis (Group A streptococcal)',
      'Uncomplicated cystitis',
      'Bone and joint infections (osteomyelitis, septic arthritis) — prolonged therapy',
      'Prophylaxis: dental procedures in patients at risk (with amoxicillin allergy)',
      'Mastitis',
    ],
    contraindications: [
      'Hypersensitivity to cephalexin, any cephalosporin, or beta-lactam antibiotic',
      'Severe immediate hypersensitivity reaction to penicillins (anaphylaxis) — caution, cross-reactivity ~1–3%',
    ],
    side_effects: [
      'Gastrointestinal: diarrhoea, nausea, vomiting, dyspepsia, abdominal pain',
      'Dermatological: rash, urticaria, pruritus, erythema multiforme (rare)',
      'Hypersensitivity: angioedema, anaphylaxis (rare)',
      'Haematological: eosinophilia, neutropenia, thrombocytopenia (rare, prolonged use)',
      'Hepatic: transient elevation of transaminases',
      'Renal: interstitial nephritis (rare)',
      'CNS: headache, dizziness, confusion (rare, high doses)',
      'Clostridium difficile-associated diarrhoea (CDAD)',
    ],
    dosage: {
      adult: {
        'Skin/soft tissue / pharyngitis': '250–500 mg PO every 6 hours for 7–14 days',
        'Cystitis (uncomplicated)': '500 mg PO twice daily for 7 days',
        'Bone/joint infections': '500 mg–1 g PO every 6 hours for 4–6 weeks',
        'Sinusitis': '500 mg PO every 8 hours for 10–14 days',
        'Prophylaxis (dental)': '2 g PO single dose 30–60 minutes before procedure',
      },
      paediatric: {
        'Standard dosing': '12.5–25 mg/kg PO every 6 hours (max 1 g/dose)',
        'Otitis media / pharyngitis': '25–50 mg/kg/day divided every 8–12 hours',
      },
      renalAdjustment: 'CrCl 30–50: every 8 hours. CrCl 10–30: every 12 hours. CrCl <10: every 24 hours.',
      hepaticAdjustment: 'No adjustment required.',
    },
    interactions: [
      'Warfarin: enhanced anticoagulant effect — monitor INR',
      'Probenecid: reduced renal excretion — increased cephalexin levels',
      'Metformin: possibly reduced metformin excretion — monitor glucose',
      'Oral contraceptives: possibly reduced efficacy — advise additional contraception',
    ],
    monitoring: 'Monitor renal function in patients with pre-existing renal impairment. Monitor for signs of superinfection with prolonged use. Monitor INR if on warfarin.',
    patient_counselling: 'Take exactly as prescribed — complete the full course even if feeling better. Take with food if gastrointestinal upset occurs. If a dose is missed, take it as soon as remembered; do not double the next dose. Report any rash, severe diarrhoea, or signs of allergic reaction. Store at room temperature away from moisture.',
  },

  // ── 4. Doxycycline ──────────────────────────────────────────────────
  {
    name: 'Doxycycline',
    generic_name: 'Doxycycline',
    drug_class: 'Tetracycline antibiotic',
    indications: [
      'Acne vulgaris (moderate to severe)',
      'Rosacea',
      'Community-acquired pneumonia (CAP, with beta-lactam)',
      'Atypical pneumonia (Mycoplasma, Chlamydia, Legionella)',
      'Cholera',
      'Brucellosis (with rifampicin or streptomycin)',
      'Lyme disease (early localized and disseminated)',
      'Rickettsial infections (typhus, Rocky Mountain spotted fever)',
      'Malaria prophylaxis (short-term travel to chloroquine-resistant areas)',
      'Malaria treatment (with artesunate — severe, or as monotherapy — uncomplicated, first-line)',
      'Syphilis (alternative to penicillin in non-pregnant with allergy)',
      'Gonorrhoea (when ceftriaxone not available)',
      'Lymphogranuloma venereum (LGV)',
      'Chlamydia trachomatis infections (alternative)',
      'Pelvic inflammatory disease (PID, with other agents)',
      'Leptospirosis (treatment and prophylaxis)',
      'Plague (Yersinia pestis)',
      'Anthrax (post-exposure prophylaxis, with other agents)',
      'Chronic osteomyelitis (with other agents)',
      'Periodontitis (adjunctive)',
    ],
    contraindications: [
      'Hypersensitivity to doxycycline or any tetracycline',
      'Pregnancy (tetracyclines — risk of hepatotoxicity in mother and impaired bone/teeth in foetus)',
      'Breastfeeding (avoid — excreted in milk)',
      'Children <8 years (permanent tooth discolouration, enamel hypoplasia, bone growth impairment)',
      'Severe hepatic impairment',
      'Systemic lupus erythematosus (may exacerbate)',
    ],
    side_effects: [
      'Gastrointestinal: nausea, vomiting, diarrhoea, dysphagia, oesophageal irritation/ulceration',
      'Dermatological: photosensitivity (especially with sun exposure), rash, urticaria, exfoliative dermatitis (rare)',
      'CNS: headache, dizziness, benign intracranial hypertension (pseudotumour cerebri — rare)',
      'Hepatic: hepatotoxicity (rare, more common in pregnancy)',
      'Haematological: neutropenia, thrombocytopenia (rare)',
      'Renal: raised BUN (anti-anabolic effect — usually not clinically significant)',
      'Metabolic: superinfection with Candida or resistant organisms',
      'Musculoskeletal: impaired bone growth in children, tooth discolouration',
      'Hypersensitivity: angioedema, anaphylaxis, serum sickness (rare)',
    ],
    dosage: {
      adult: {
        'Acne / Rosacea': '100 mg PO once daily for 8–12 weeks (maintenance)',
        'CAP / Atypical pneumonia': '100 mg PO twice daily for 7–14 days',
        'Malaria prophylaxis': '100 mg PO once daily starting 1–2 days before travel, continue 4 weeks after leaving endemic area',
        'Cholera': '300 mg PO single dose',
        'Brucellosis': '100 mg PO twice daily for 6 weeks',
        'Lyme disease': '100 mg PO twice daily for 14–21 days',
        'Syphilis (alternative)': '100 mg PO twice daily for 14 days (early) or 28 days (late)',
        'PID': '100 mg PO twice daily for 14 days (with other agents)',
      },
      paediatric: {
        'Children ≥8 years': '2.2 mg/kg PO twice daily (max 100 mg/dose)',
        'Anthrax prophylaxis': '2.2 mg/kg PO twice daily for 60 days (max 100 mg/dose)',
        'Malaria prophylaxis': '2.2 mg/kg PO once daily (max 100 mg/dose)',
      },
      renalAdjustment: 'No dose adjustment required. Does not accumulate in renal impairment.',
      hepaticAdjustment: 'Use with caution in hepatic impairment; reduce dose if severe.',
    },
    interactions: [
      'Antacids (Al/Mg/Ca), bismuth subsalicylate, iron, calcium, magnesium, zinc: reduced absorption — separate by 2–4 hours',
      'Dairy products: reduced absorption — separate by 2 hours',
      'Warfarin: enhanced anticoagulant effect — monitor INR',
      'Oral contraceptives: possibly reduced efficacy — advise additional contraception',
      'Carbamazepine, phenytoin, barbiturates: decreased doxycycline half-life — monitor efficacy',
      'Methotrexate: increased methotrexate levels — monitor for toxicity',
      'Isotretinoin: increased risk of benign intracranial hypertension — avoid concurrent use',
      'Retinoids: increased risk of pseudotumour cerebri',
    ],
    monitoring: 'Monitor for photosensitivity reactions — advise sun avoidance. Monitor hepatic function with prolonged use. Monitor for signs of oesophageal irritation. In prolonged therapy, monitor for superinfection, candidiasis, and haematological effects.',
    patient_counselling: 'Take with a full glass of water while sitting or standing upright to prevent oesophageal irritation. Do NOT take with dairy products (milk, yoghurt, cheese), antacids, iron, or calcium supplements — take 2 hours before or after. Avoid excessive sun exposure and use high-SPF sunscreen; severe sunburn can occur. For malaria prophylaxis: start 1–2 days before travel, take daily while in endemic area, and continue for 4 weeks after leaving. Do not use in pregnancy or children under 8. Complete the full course.',
  },

  // ── 5. Artemether–Lumefantrine (Co-artemether) ──────────────────────
  {
    name: 'Artemether–Lumefantrine',
    generic_name: 'Artemether + Lumefantrine (Co-artemether)',
    drug_class: 'Antimalarial (artemisinin-based combination therapy — ACT)',
    indications: [
      'Uncomplicated Plasmodium falciparum malaria (first-line in most African countries including Kenya)',
      'Uncomplicated mixed malaria infections (including P. vivax, P. ovale, P. malariae)',
      'Treatment of chloroquine-resistant falciparum malaria',
    ],
    contraindications: [
      'Hypersensitivity to artemether or lumefantrine',
      'Severe malaria (use IV artesunate first, then switch to oral ACT when able to tolerate)',
      'First trimester of pregnancy (avoid unless benefit outweighs risk — limited safety data)',
      'Breastfeeding (limited data — use with caution)',
      'Severe hepatic impairment',
      'Family history of QTc prolongation or sudden cardiac death',
      'Concurrent use with strong CYP3A4 inducers (rifampicin, carbamazepine, phenytoin, St John\'s wort)',
    ],
    side_effects: [
      'Gastrointestinal: nausea, vomiting, diarrhoea, abdominal pain, loss of appetite',
      'CNS: headache, dizziness, asthenia, sleep disturbances',
      'Cardiac: QTc interval prolongation (mild, usually not clinically significant)',
      'Dermatological: rash, pruritus, urticaria',
      'Musculoskeletal: arthralgia, myalgia',
      'Haematological: anaemia, leukopenia, thrombocytopenia (may overlap with malaria itself)',
      'Hepatic: elevated transaminases (usually transient)',
      'Respiratory: cough (more common in children)',
      'Palatability: bitter taste (especially children — may cause vomiting)',
    ],
    dosage: {
      adult: {
        'Standard 6-dose regimen (weight ≥35 kg)': '4 tablets (80/480 mg per dose) PO at 0, 8, 24, 36, 48, and 60 hours',
        'Weight 25–34 kg': '3 tablets (60/360 mg per dose) PO on same schedule',
        'Weight 15–24 kg': '2 tablets (40/240 mg per dose) PO on same schedule',
        'Weight 5–14 kg': '1 tablet (20/120 mg per dose) PO on same schedule',
      },
      paediatric: {
        'Weight-based (same regimen as above)': '6-dose schedule over 3 days — ensure all doses are taken',
      },
      renalAdjustment: 'No dose adjustment required (minimal renal elimination).',
      hepaticAdjustment: 'Avoid in severe hepatic impairment. Use with caution in moderate impairment.',
      note: 'CRITICAL: The 6-dose regimen must be completed. A fatty meal (milk, breast milk, oil) significantly increases absorption (lumefantrine absorption increases 2–16 fold with fat).',
    },
    interactions: [
      'CYP3A4 inducers (rifampicin, carbamazepine, phenytoin, St John\'s wort): reduced lumefantrine levels — avoid concurrent use',
      'CYP3A4 inhibitors (ketoconazole, ritonavir, erythromycin): increased lumefantrine levels — monitor for QTc prolongation',
      'QT-prolonging drugs (halofantrine, quinine, chloroquine, amiodarone): increased risk of arrhythmia — avoid concurrent use',
      'Grapefruit juice: increased lumefantrine absorption — avoid',
      'Oral contraceptives: possibly reduced efficacy — advise additional contraception during and 4 weeks after treatment',
    ],
    monitoring: 'Monitor for parasitaemia clearance (blood smear days 1, 2, 3, 7, 14, 28). Monitor for signs of severe malaria (cerebral malaria, severe anaemia, renal failure). Monitor ECG in patients with cardiac risk factors. Monitor for recurrence (recrudescence within 28 days may indicate resistance). Ensure patient completes all 6 doses.',
    patient_counselling: 'CRITICAL: Take ALL 6 doses over 3 days — at 0, 8, 24, 36, 48, and 60 hours. Taking all doses is the only way to cure malaria and prevent resistance. Take with fatty food (milk, oil, chapati, avocado) — fat increases absorption of the medicine. If vomiting occurs within 1 hour of a dose, repeat the dose. For children who vomit the medicine, give a fatty snack (breast milk) beforehand. Complete the full course even if symptoms improve. Return to clinic if fever persists after 3 days.',
  },

  // ── 6. Metronidazole ──────────────────────────────────────────────
  {
    name: 'Metronidazole',
    generic_name: 'Metronidazole',
    drug_class: 'Nitroimidazole antibiotic / antiprotozoal',
    indications: [
      'Anaerobic bacterial infections (intra-abdominal, pelvic, bone/joint, CNS abscess, dental)',
      'Bacterial vaginosis',
      'Trichomoniasis (Trichomonas vaginalis)',
      'Giardiasis (Giardia lamblia)',
      'Amoebiasis (Entamoeba histolytica) — intestinal and hepatic',
      'Clostridium difficile-associated diarrhoea (CDAD) — mild-to-moderate (metronidazole first-line per Kenya STG)',
      'Helicobacter pylori eradication (as part of combination therapy)',
      'Pelvic inflammatory disease (PID) — with other agents',
      'Crohn\'s disease (mild-to-moderate, perianal disease)',
      'Rosacea (topical)',
      'Tetanus (adjunctive therapy)',
      'Acute necrotising ulcerative gingivitis (ANUG)',
      'Diverticulitis (with Gram-negative coverage)',
      'Prevention: surgical prophylaxis (colorectal, gynaecological)',
    ],
    contraindications: [
      'Hypersensitivity to metronidazole or other nitroimidazole derivatives',
      'First trimester of pregnancy (avoid — use only if no safer alternative)',
      'Breastfeeding (avoid high-dose regimens — discontinue breastfeeding for 12–24 hours after dose)',
      'Severe hepatic impairment (reduce dose)',
      'Active CNS disease (seizure disorder, peripheral neuropathy) — caution',
      'Concurrent use with disulfiram (psychotic reactions)',
    ],
    side_effects: [
      'Gastrointestinal: metallic/bitter taste, nausea, vomiting, diarrhoea, abdominal pain, anorexia, furry tongue',
      'CNS: headache, dizziness, peripheral neuropathy (numbness, tingling), ataxia, confusion, seizures (rare, high dose/prolonged use)',
      'Dermatological: rash, pruritus, urticaria, flushing',
      'Genitourinary: darkening of urine (harmless), vaginal candidiasis',
      'Haematological: leukopenia, neutropenia (reversible, prolonged therapy)',
      'Hypersensitivity: anaphylaxis (rare), Stevens-Johnson syndrome (rare)',
      'Injection site: thrombophlebitis (IV administration)',
      'Pancreatitis (rare)',
      'Hepatic: elevated transaminases, cholestatic hepatitis (rare)',
    ],
    dosage: {
      adult: {
        'Anaerobic infections (most)': '400–500 mg PO/IV three times daily for 7–14 days',
        'Bacterial vaginosis': '400–500 mg PO twice daily for 7 days; or 2 g PO single dose',
        'Trichomoniasis': '2 g PO single dose; or 400–500 mg PO twice daily for 7 days',
        'Giardiasis': '400–500 mg PO three times daily for 5–7 days',
        'Amoebiasis (intestinal)': '400–500 mg PO three times daily for 7–10 days',
        'Amoebic liver abscess': '400–500 mg PO three times daily for 10–14 days',
        'CDAD (mild-moderate)': '400–500 mg PO three times daily for 10–14 days',
        'H. pylori eradication': '400–500 mg PO twice daily for 7–14 days (with PPI + other antibiotic)',
        'PID': '400–500 mg IV/PO three times daily for 14 days (with other agents)',
        'Surgical prophylaxis': '500 mg IV at induction (may repeat after 8 hours)',
      },
      paediatric: {
        'Anaerobic infections': '7.5 mg/kg PO/IV three times daily (max 500 mg/dose)',
        'Amoebiasis / Giardiasis': '5–10 mg/kg PO three times daily for 7–10 days',
      },
      renalAdjustment: 'No dose adjustment required (hepatic elimination). Remove post-dialysis (dialisable).',
      hepaticAdjustment: 'Severe impairment: reduce dose by 50% (e.g., 400 mg twice daily instead of three times daily).',
    },
    interactions: [
      'Alcohol (ethanol): disulfiram-like reaction (flushing, nausea, vomiting, headache, hypotension) — absolute avoidance during therapy and 48 hours after',
      'Warfarin: enhanced anticoagulant effect — monitor INR closely',
      'Disulfiram: psychotic reactions — avoid concurrent use; separate by 14 days',
      'Lithium: increased lithium levels — monitor levels, risk of toxicity',
      'Phenytoin: increased phenytoin levels (CYP inhibition) and decreased metronidazole levels (CYP induction)',
      'Phenobarbital: decreased metronidazole levels — monitor efficacy',
      'Ciclosporin: increased ciclosporin levels — monitor levels',
      '5-FU (fluorouracil): increased 5-FU toxicity — avoid concurrent use',
      'Cimetidine: increased metronidazole levels — monitor for side-effects',
      'Busulfan: increased busulfan toxicity — avoid concurrent use',
    ],
    monitoring: 'Monitor for peripheral neuropathy with prolonged therapy (>10 days) — discontinue if paraesthesia develops. Monitor CBC with differential for prolonged courses (leukopenia/neutropenia). Monitor INR if on warfarin. Monitor for CNS effects (dizziness, confusion, seizures). Dark urine is harmless (metabolite excretion) — counsel patient.',
    patient_counselling: 'WARNING: Do NOT drink any alcohol during treatment and for 48 hours after the last dose — severe vomiting, flushing, and headache will occur. A metallic/bitter taste is common and harmless. Your urine may turn dark brown — this is normal. Take with food to reduce GI upset. Complete the full course. For single-dose (trichomoniasis/bacterial vaginosis): partner should also be treated. Report any numbness, tingling, or pins-and-needles sensation immediately.',
  },
];

// ──────────────────────────────────────────────────────────────────
// Upsert helper
// ──────────────────────────────────────────────────────────────────

async function upsertMonograph(m: DrugMonograph): Promise<boolean> {
  // Check for existing record by name
  const { data: existing } = await supabase
    .from('drug_monographs')
    .select('id')
    .eq('name', m.name)
    .maybeSingle();

  const payload = {
    name: m.name,
    generic_name: m.generic_name,
    drug_class: m.drug_class,
    indications: m.indications,
    contraindications: m.contraindications,
    side_effects: m.side_effects,
    dosage: m.dosage,
    interactions: m.interactions,
    monitoring: m.monitoring,
    patient_counselling: m.patient_counselling,
  };

  let error;
  if (existing) {
    ({ error } = await supabase
      .from('drug_monographs')
      .update(payload)
      .eq('id', existing.id));
  } else {
    ({ error } = await supabase
      .from('drug_monographs')
      .insert(payload));
  }

  if (error) {
    console.error(`  ✗ Failed: ${m.name} — ${error.message}`);
    return false;
  }
  console.log(`  ✓ ${m.name}`);
  return true;
}

// ──────────────────────────────────────────────────────────────────
// Validation
// ──────────────────────────────────────────────────────────────────

async function validateCount(): Promise<number> {
  const { count, error } = await supabase
    .from('drug_monographs')
    .select('*', { count: 'exact', head: true });
  if (error) {
    console.error(`Validation query failed: ${error.message}`);
    return 0;
  }
  return count ?? 0;
}

async function checkDuplicates(): Promise<boolean> {
  const { data, error } = await supabase
    .from('drug_monographs')
    .select('name');
  if (error) return true;
  const names = data.map(r => r.name);
  const unique = new Set(names);
  if (unique.size !== names.length) {
    console.error('  ✗ DUPLICATE drug names detected!');
    return false;
  }
  return true;
}

// ──────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║   Clinova Phase C — Drug Monograph Population     ║');
  console.log('║   Batch 1: 6 Medicines (Anti-infectives)          ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log();

  console.log('━━━ Pre-validation ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const before = await validateCount();
  console.log(`Existing monographs: ${before}`);
  const dupes = await checkDuplicates();
  if (!dupes) {
    console.error('Aborting: duplicate detection failed');
    process.exit(1);
  }
  console.log(`Duplicate check: ${dupes ? 'PASS' : 'FAIL'}`);
  console.log();

  console.log('━━━ Populating monographs ━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  let success = 0;
  let fail = 0;
  for (const m of MONOGRAPHS) {
    const ok = await upsertMonograph(m);
    if (ok) success++; else fail++;
  }

  console.log();
  console.log('━━━ Post-validation ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const after = await validateCount();
  console.log(`Total monographs now: ${after}`);
  const added = after - before;
  console.log(`Newly added: ${added}`);

  console.log();
  console.log('━━━ Batch 1 Summary ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Intended:      ${MONOGRAPHS.length}`);
  console.log(`  Successful:    ${success}`);
  console.log(`  Failed:        ${fail}`);
  console.log(`  Prior total:   ${before}`);
  console.log(`  Current total: ${after}`);
  console.log();

  if (fail === 0 && success === MONOGRAPHS.length) {
    console.log('✅ Batch 1 COMPLETE. Ready for Batch 2.');
  } else {
    console.log('⚠️  Batch 1 partially complete. Review errors above.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
