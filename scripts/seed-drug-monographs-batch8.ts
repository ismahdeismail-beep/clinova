/**
 * seed-drug-monographs-batch8.ts
 * Phase C â€” Batch 8: Gentamicin, Cloxacillin, Paracetamol,
 *          Ibuprofen, Diazepam, Albendazole (Antibiotics / Analgesics / CNS / Anthelmintics)
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
  // â”€â”€ 1. Gentamicin â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    name: 'Gentamicin',
    generic_name: 'Gentamicin',
    drug_class: 'Aminoglycoside antibiotic â€” bactericidal, concentration-dependent killing',
    indications: [
      'Serious Gram-negative infections â€” Escherichia coli, Klebsiella spp., Pseudomonas aeruginosa, Proteus spp., Serratia marcescens, Enterobacter spp., Citrobacter spp.',
      'Septic shock (empiric with broad-spectrum cover until cultures available)',
      'Complicated urinary tract infections (UTIs) â€” pyelonephritis, urosepsis, complicated UTI caused by resistant Gram-negatives',
      'Intra-abdominal infections (in combination with anaerobic cover â€” e.g., metronidazole or clindamycin)',
      'Hospital-acquired / ventilator-associated pneumonia (HAP/VAP â€” in combination with anti-pseudomonal beta-lactam)',
      'Bone and joint infections (osteomyelitis, septic arthritis â€” in combination)',
      'Meningitis (Gram-negative â€” IV gentamicin does NOT cross BBB well; intrathecal/intraventricular gentamicin used as adjunct)',
      'Endocarditis (enterococcal â€” synergy with ampicillin; staphylococcal â€” adjunctive with flucloxacillin; native valve Gram-negative endocarditis)',
      'Burns infections (Pseudomonas cover â€” topical and systemic)',
      'Peritonitis (CAPD-associated â€” intraperitoneal gentamicin)',
      'Ophthalmic â€” topical gentamicin eye drops/ointment for bacterial conjunctivitis, keratitis, blepharitis',
      'Neonatal sepsis â€” gentamicin + ampicillin is standard empiric regimen',
    ],
    contraindications: [
      'Hypersensitivity to gentamicin or any aminoglycoside (neomycin, tobramycin, amikacin)',
      'Severe renal impairment (eGFR <30 mL/min) â€” CONTRAINDICATED unless no alternative and dialysis can be arranged; dose adjust carefully if eGFR 30â€“59',
      'Pre-existing severe hearing loss (relative â€” risk of ototoxicity)',
      'Myasthenia gravis (relative â€” aminoglycosides worsen neuromuscular blockade)',
      'Concurrent neuromuscular blocking agents (relative â€” enhanced blockade)',
      'Concurrent potent ototoxic agents (loop diuretics, cisplatin, vancomycin) â€” increased ototoxicity risk (use with extreme caution)',
    ],
    side_effects: [
      'Nephrotoxicity (10â€“20% â€” reversible acute kidney injury; mechanism: proximal tubular cell uptake via megalin/cubilin â†’ lysosomal dysfunction â†’ tubular necrosis; risk factors: prolonged therapy >5 days, high trough levels, concurrent nephrotoxins, pre-existing CKD, dehydration, sepsis; usually reversible on discontinuation)',
      'Ototoxicity (vestibular > cochlear â€” 3â€“14%; mechanism: irreversible sensory hair cell damage in organ of Corti and vestibular apparatus; vestibular: vertigo, oscillopsia, ataxia, nausea/vomiting; cochlear: high-frequency hearing loss progressing to speech frequencies â†’ tinnitus, deafness; risk factors: prolonged therapy, high peak/trough, concurrent loop diuretics, cisplatin, vancomycin, pre-existing hearing loss, renal impairment; IRREVERSIBLE once established)',
      'Neuromuscular blockade (rare but life-threatening â€” aminoglycosides inhibit presynaptic ACh release and block postsynaptic NM receptors â†’ weakness, respiratory paralysis; risk: myasthenia gravis, concurrent neuromuscular blockers, hypocalcaemia, hypomagnesaemia, electrolyte imbalance; treat with calcium gluconate, neostigmine, ventilatory support)',
      'Gastrointestinal: nausea, vomiting, diarrhoea (uncommon)',
      'Hypersensitivity: rash, fever, anaphylaxis (rare)',
      'Haematological: eosinophilia, rarely agranulocytosis, thrombocytopenia',
      'Hepatic: transient elevated transaminases (rare)',
      'Neurotoxicity: peripheral neuropathy (rare â€” paresthesias), confusion, seizures (very rare)',
    ],
    dosage: {
      adult: {
        'Severe infection â€” once-daily dosing (preferred)': '5â€“7 mg/kg IV once daily (ideal body weight for obese patients); adjust interval based on renal function â€” interval determined by eGFR',
        'Severe infection â€” traditional (multiple daily dosing)': '1â€“2 mg/kg IV every 8 hours (adjust interval and dose based on renal function and drug levels)',
        'Gentamicin + ampicillin (enterococcal endocarditis â€” synergy)': 'Gentamicin 1â€“2 mg/kg IV every 8 hours (for 4â€“6 weeks with ampicillin 2 g IV every 4 hours)',
        'Peritonitis (CAPD-associated)': 'Intraperitoneal: 40â€“80 mg/L per exchange (once daily) or 8 mg/L continuously',
        'Ophthalmic (topical)': 'Eye drops 0.3%: 1â€“2 drops every 2â€“4 hours for first 48 hours, then every 6 hours; Eye ointment 0.3%: apply 2â€“3 times daily',
        'Neonatal sepsis (empiric with ampicillin)': '4 mg/kg IV/IM once daily if gestational age â‰¥34 weeks and postnatal age >7 days; or per local neonatal protocol',
      },
      paediatric: {
        'Neonates <7 days â€” gestational age â‰¥34 weeks': '4 mg/kg IV/IM once daily',
        'Neonates <7 days â€” gestational age 29â€“33 weeks': '5 mg/kg IV/IM every 36 hours',
        'Neonates <7 days â€” gestational age <29 weeks': '5 mg/kg IV/IM every 48 hours',
        'Neonates â‰¥7 days â€” gestational age â‰¥34 weeks': '4 mg/kg IV/IM every 24 hours',
        'Children >7 days â€” gestational age 29â€“33 weeks': '4 mg/kg IV/IM every 24 hours',
        'Children >7 days â€” gestational age <29 weeks': '4 mg/kg IV/IM every 36 hours',
        'Children 1 monthâ€“12 years': '5â€“7 mg/kg IV once daily (preferred) or 2â€“2.5 mg/kg IV every 8 hours',
        'Adolescents >12 years': 'Adult dosing',
      },
      geriatric: {
        'Once-daily dosing': '5 mg/kg IV once daily (use ideal body weight; elderly have reduced renal reserve â€” drug levels essential)',
        'Traditional dosing': '1â€“1.5 mg/kg IV every 8â€“12 hours (longer interval due to age-related GFR decline)',
      },
      renalAdjustment: 'eGFR >50: no adjustment needed. eGFR 30â€“49: extend interval (once-daily: every 36 hours; traditional: every 12 hours). eGFR 10â€“29: once-daily: every 48 hours; traditional: every 24 hours. eGFR <10: once-daily: every 48â€“72 hours with levels; traditional: every 24â€“48 hours with levels. Haemodialysis: 40â€“60 mg after dialysis (depending on remaining levels). CAPD: intraperitoneal route preferred. CRITICAL: Use therapeutic drug monitoring (TDM) â€” peak and trough levels mandatory for all patients with altered renal function.',
      hepaticAdjustment: 'No dose adjustment required â€” gentamicin is not hepatically metabolised. Monitor renal function closely as hepatic failure may cause renal impairment (hepatorenal syndrome).',
    },
    interactions: [
      'LOOP DIURETICS (furosemide, bumetanide): SYNERGISTIC OTOTOXICITY â€” both damage inner ear hair cells; risk of permanent deafness â€” avoid combination if possible; if unavoidable, monitor hearing closely',
      'CISPLATIN: SYNERGISTIC OTOTOXICITY AND NEPHROTOXICITY â€” avoid combination; if unavoidable, monitor renal function and hearing at baseline and during treatment',
      'VANCOMYCIN: increased nephrotoxicity and ototoxicity (additive â€” triple whammy with diuretics) â€” monitor renal function, vancomycin levels, and gentamicin levels if concurrent use essential',
      'NEUROMUSCULAR BLOCKERS (suxamethonium, tubocurarine, vecuronium, rocuronium): ENHANCED NEUROMUSCULAR BLOCKADE â€” may cause prolonged respiratory paralysis â€” avoid; if unavoidable, ventilatory support must be immediately available',
      'NESTIGMINE / PYRIDOSTIGMINE (anticholinesterases): gentamicin may antagonise cholinesterase inhibitors (reduced efficacy in myasthenia gravis) â€” use alternative antibiotic if possible',
      'POLYMIXINS: additive nephrotoxicity â€” avoid combination',
      'NSAIDS (indomethacin â€” in neonates): increased gentamicin levels and nephrotoxicity â€” monitor levels in neonates on indomethacin',
      'METAMIZOLE (dipyrone â€” common in some LMIC): additive nephrotoxicity â€” monitor renal function',
      'CAPTOPRIL: synergistic hypotension â€” monitor BP',
      'MAGNESIUM SUPPLEMENTS / ANTACIDS: reduced gentamicin absorption (oral/enteral â€” chelation) â€” separate by 2 hours; IV gentamicin not affected',
    ],
    monitoring: 'THERAPEUTIC DRUG MONITORING IS MANDATORY for IV gentamicin. Once-daily dosing: draw trough level before next dose (target trough <1 Âµg/mL â€” ideally <0.5 Âµg/mL). If using extended-interval dosing (5â€“7 mg/kg), draw level 6â€“14 hours post-dose. Traditional dosing: target peak 6â€“10 Âµg/mL (30 min after end of infusion), trough <2 Âµg/mL (30 min before next dose). Renal function: baseline Cr/eGFR, then every 24 hours during therapy, every 48 hours if prolonged therapy. Ototoxicity: baseline audiometry (if possible) and pure tone audiogram if therapy >5 days; monitor for tinnitus, hearing loss, vertigo, ataxia; if tinnitus develops â€” STOP gentamicin and check levels. Nephrotoxicity: daily Cr and electrolytes; creatinine rise >26 Âµmol/L or >50% from baseline = AKI â€” stop gentamicin, rehydrate, monitor until Cr returns to baseline. Electrolytes: check MgÂ²âº, Kâº, CaÂ²âº daily (aminoglycosides cause renal MgÂ²âº/Kâº wasting â†’ hypomagnesaemia â†’ arrhythmias). Monitor vestibular function: Romberg test, finger-nose test, gait assessment if prolonged therapy.',
    patient_counselling: 'Gentamicin is given by injection (IV or IM) in hospital â€” you will be monitored closely during treatment. Report any of the following IMMEDIATELY: ringing in the ears (tinnitus), feeling dizzy or unsteady (vertigo), hearing changes, reduced urine output, ankle swelling, or difficulty breathing. These may indicate kidney damage or ear toxicity â€” early detection is critical. Gentamicin should NOT be taken at home without medical supervision. You will have regular blood tests â€” these are essential to ensure safe dosing. If you are being discharged with gentamicin (e.g., OPAT â€” outpatient parenteral antimicrobial therapy), you must attend all scheduled monitoring appointments. After treatment, you may need follow-up hearing tests (audiometry) if you received more than 5 days of therapy. If you experience new hearing loss or balance problems after completing gentamicin, contact your doctor â€” early intervention may help.',
  },

  // â”€â”€ 2. Cloxacillin â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    name: 'Cloxacillin',
    generic_name: 'Cloxacillin Sodium',
    drug_class: 'Penicillinase-resistant (anti-staphylococcal) penicillin â€” isoxazolyl penicillin',
    indications: [
      'Methicillin-susceptible Staphylococcus aureus (MSSA) infections â€” skin and soft tissue infections (cellulitis, abscess, wound infection, impetigo, folliculitis, erysipelas)',
      'MSSA osteomyelitis and septic arthritis',
      'MSSA bacteraemia and endocarditis (drug of choice â€” IV flucloxacillin is preferred but oral cloxacillin used in step-down therapy)',
      'MSSA pneumonia (community-acquired)',
      'MSSA prosthetic joint infections (debridement + antibiotics)',
      'MSSA device-related infections (catheter-related â€” if device can be removed)',
      'Carriage eradications of MSSA (nasal carriage â€” mupirocin + oral cloxacillin)',
      'Staphylococcal scalded skin syndrome (SSSS)',
      'Carbuncles and furuncles (boils â€” MSSA)',
      'Breast abscess (MSSA or mixed infection)',
      'Post-surgical wound infections (MSSA)',
    ],
    contraindications: [
      'Hypersensitivity to cloxacillin, flucloxacillin, any penicillin, or cephalosporins (cross-reactivity 1â€“2%)',
      'Methicillin-resistant Staphylococcus aureus (MRSA) â€” cloxacillin has NO activity against MRSA',
      'History of penicillin-associated cholestatic jaundice/hepatitis (flucloxacillin/cloxacillin â€” risk of recurrence; avoid all isoxazolyl penicillins)',
      'Severe hepatic impairment (relative â€” cholestatic hepatitis risk increased)',
      'Severe renal impairment (dose adjustment needed, not absolute contraindication)',
      'Infectious mononucleosis (high risk of maculopapular rash)',
    ],
    side_effects: [
      'Gastrointestinal: nausea, vomiting, diarrhoea, abdominal pain, dyspepsia, glossitis (common â€” 5â€“10%)',
      'Hepatic: cholestatic jaundice/hepatitis (important â€” 1â€“10% with flucloxacillin; less common with cloxacillin but still reported; mechanism: hypersensitivity cholestasis; risk factors: age >55, treatment >2 weeks, repeated courses; usually reversible but may be prolonged; AVOID flucloxacillin in patients with previous cloxacillin-related liver injury)',
      'Hypersensitivity: rash (maculopapular, morbilliform â€” common; 1â€“10%), urticaria, pruritus, fever, serum sickness-like reaction',
      'Allergic: anaphylaxis (rare â€” 0.01â€“0.05%), angioedema, bronchospasm',
      'Haematological: eosinophilia (common), thrombocytopenia, neutropenia, agranulocytosis (very rare)',
      'Dermatological: Stevens-Johnson syndrome, toxic epidermal necrolysis (very rare)',
      'Renal: interstitial nephritis, crystaluria (very rare)',
      'CNS: headache, dizziness (uncommon)',
      'Gastrointestinal: Clostridioides difficile-associated diarrhoea (CDAD) â€” uncommon',
      'Superinfection: oral and vaginal candidiasis (with prolonged use)',
    ],
    dosage: {
      adult: {
        'Mild-moderate SSTI â€” oral': '500 mg PO every 6 hours (qid) for 5â€“7 days',
        'Severe infection / osteomyelitis â€” oral': '500 mgâ€“1 g PO every 6 hours for 4â€“6 weeks (osteomyelitis); may increase to 1 g every 6 hours for severe infections',
        'MSSA bacteraemia/endocarditis â€” step-down oral': '500 mgâ€“1 g PO every 6 hours (after initial IV flucloxacillin, 4â€“6 weeks total)',
        'Surgical prophylaxis (MSSA risk â€” orthopaedic)': '2 g IV 30â€“60 minutes pre-operatively',
        'Carriage eradications (nasal + skin)': '500 mg PO every 6 hours for 5 days + mupirocin nasal ointment TDS',
        'Breast abscess (adjunct)': '500 mg PO every 6 hours for 7â€“10 days',
      },
      paediatric: {
        'Children 1 monthâ€“12 years â€” mild-moderate': '12.5â€“25 mg/kg PO every 6 hours (max 500 mg per dose)',
        'Children 1 monthâ€“12 years â€” severe': '25â€“50 mg/kg PO every 6 hours (max 1 g per dose)',
        'Neonates': '25 mg/kg PO/IV every 6 hours (not first-line â€” flucloxacillin preferred if available)',
        'Adolescents >12 years': 'Adult dosing',
      },
      geriatric: {
        'Standard': '500 mg PO every 6 hours (reduce interval to every 8â€“12 hours if CrCl <30 mL/min; monitor LFTs at 2 weeks)',
      },
      renalAdjustment: 'eGFR >30: no adjustment needed. eGFR 10â€“29: 500 mg PO every 8 hours (or every 12 hours if severe). eGFR <10: 500 mg PO every 12 hours. Haemodialysis: give after dialysis session. CAPD: 500 mg PO every 12 hours.',
      hepaticAdjustment: 'Mild-moderate: no dose adjustment but monitor LFTs at 1â€“2 weeks. Severe (Child-Pugh C): AVOID if possible â€” increased cholestasis risk. If essential, use lowest effective dose for shortest duration, monitor LFTs weekly.',
    },
    interactions: [
      'WARFARIN: penicillins may enhance warfarin effect (reduced vitamin K-producing gut flora) â€” monitor INR',
      'PROBENECID: reduced renal tubular secretion of cloxacillin â†’ increased levels and prolonged half-life â€” used therapeutically to boost levels (e.g., in gonorrhoea)',
      'METHOTREXATE: penicillins reduce MTX clearance (renal tubular secretion competition) â€” monitor for MTX toxicity',
      'ORAL CONTRACEPTIVES: theoretical reduction in OCP efficacy (broad-spectrum antibiotics â†’ reduced enterohepatic recirculation of ethinylestradiol â€” evidence is limited for penicillins; advise extra precautions during course and 7 days after)',
      'ALLOPURINOL: increased hypersensitivity rash risk (allopurinol + ampicillin/amoxicillin â€” less well-documented with cloxacillin but caution)',
      'TETRACYCLINES: bacteriostatic tetracyclines may antagonise bactericidal penicillins â€” avoid concurrent use in serious infections',
      'CHOLESTYRAMINE: reduced oral absorption of cloxacillin â€” separate by 2 hours',
      'AMINOSIDES (gentamicin): physical inactivation if mixed in same IV line â€” flush line between infusions; synergy for some organisms (e.g., enterococci)',
      'MYPHEENATE (mycophenolate): reduced mycophenolate exposure â€” monitor for rejection in transplant patients',
    ],
    monitoring: 'Baseline: FBC, LFTs, U&E, Cr/eGFR. During therapy: LFTs at 1â€“2 weeks (especially if treatment >14 days â€” cholestatic hepatitis risk); repeat if symptoms (jaundice, dark urine, RUQ pain, pruritus). If LFTs elevated >2Ã— ULN: STOP cloxacillin and investigate. Clinical response: fever should resolve within 48â€“72 hours; wound infections should show improvement within 3â€“5 days; if no response by 72 hours, review diagnosis (consider MRSA, resistant organism, abscess requiring drainage). C. difficile toxin: if diarrhoea develops during or after treatment. Renal function: if therapy >7 days or if pre-existing renal impairment. MRSA exclusion: cultures with sensitivity must confirm MSSA â€” cloxacillin is ineffective against MRSA. Follow-up cultures if bacteraemia: repeat blood cultures at 48â€“72 hours to confirm clearance.',
    patient_counselling: 'Take cloxacillin on an EMPTY STOMACH (1 hour before or 2 hours after meals) for best absorption â€” but if it upsets your stomach, take with a light snack. Complete the full course â€” even if you feel better, stopping early can cause the infection to return or become resistant. If you develop severe diarrhoea (more than 6 loose stools in 24 hours), bloody diarrhoea, or severe abdominal cramps â€” STOP cloxacillin and see your doctor immediately (possible C. difficile infection). If you develop yellowing of the skin or eyes, dark urine, or upper right abdominal pain â€” STOP cloxacillin and see your doctor immediately (possible liver injury). Report any rash, swelling, or difficulty breathing â€” you may be allergic to penicillins. Do NOT take cloxacillin if you have ever had a reaction to any penicillin or cephalosporin antibiotic. If you miss a dose, take it as soon as you remember â€” but if it is nearly time for the next dose, skip the missed dose. Do NOT double dose.',
  },

  // â”€â”€ 3. Paracetamol â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    name: 'Paracetamol',
    generic_name: 'Paracetamol (Acetaminophen)',
    drug_class: 'Analgesic (non-opioid) and antipyretic â€” mechanism involves central COX inhibition, serotonergic descending pathways, and endocannabinoid system',
    indications: [
      'Mild-moderate pain (headache, dental pain, musculoskeletal pain, post-operative pain, dysmenorrhoea, renal colic adjunct)',
      'Fever (antipyretic â€” first-line for all ages including neonates)',
      'Osteoarthritis (analgesic of choice â€” preferred over NSAIDs in elderly, renal impairment, GI disease, cardiovascular disease)',
      'Chronic pain (adjunctive â€” especially in elderly where NSAIDs and opioids are high-risk)',
      'Post-surgical pain (multimodal analgesia backbone)',
      'Cancer pain (mild â€” WHO analgesic ladder step 1)',
      'Neonatal abstinence syndrome (NAS â€” part of management protocol)',
    ],
    contraindications: [
      'Severe hepatic impairment (Child-Pugh C â€” or active liver disease; paracetamol is hepatically metabolised; toxic metabolite NAPQI accumulates)',
      'Hypersensitivity to paracetamol (extremely rare â€” <1 in 10,000; true allergy vs. NSAID cross-reactivity confusion)',
      'Glucose-6-phosphate dehydrogenase (G6PD) deficiency (HAEMOLYTIC RISK â€” paracetamol causes oxidative stress; avoid or use with extreme caution)',
      'Chronic alcohol use / active liver disease (reduced glutathione stores â†’ increased NAPQI toxicity at lower doses)',
      'Severe malnutrition / fasting states (reduced glutathione â†’ lower toxic threshold)',
    ],
    side_effects: [
      'OVERDOSE is the major concern â€” not therapeutic side effects:',
      'Hepatotoxicity (therapeutic dose: rare â€” <0.01%; OVERDOSE: dose-dependent, responsible for ~50% of acute liver failure in UK/US; mechanism: CYP2E1 converts paracetamol to toxic NAPQI (N-acetyl-p-benzoquinone imine) â†’ normally detoxified by glutathione; in overdose, glutathione depleted â†’ NAPQI binds hepatocyte proteins â†’ centrilobular hepatic necrosis; risk factors: chronic alcohol, malnutrition, fasting, CYP inducers (rifampicin, phenytoin, carbamazepine, isoniazid), G6PD deficiency)',
      'Allergic reactions: rash (rare â€” urticarial, morbilliform), anaphylaxis (very rare)',
      'Haematological: thrombocytopenia (very rare), neutropenia (very rare), pancytopenia (very rare)',
      'Renal: acute interstitial nephritis (very rare), papillary necrosis (with chronic excessive use >4 g/day for years)',
      'GI: nausea (uncommon), vomiting (uncommon) â€” less GI irritation than NSAIDs',
      'Dermatological: Stevens-Johnson syndrome / toxic epidermal necrolysis (extremely rare â€” debated causality)',
    ],
    dosage: {
      adult: {
        'Standard dose â€” oral': '500 mgâ€“1 g PO every 4â€“6 hours (max 4 g/day in 4 divided doses)',
        'Acute pain â€” loading (if needed)': '1 g PO then 1 g every 4â€“6 hours (max 4 g/day)',
        'Renal impairment (eGFR <30)': '500 mg PO every 6 hours (max 3 g/day)',
        'Weight-based dosing (if <50 kg)': '15 mg/kg PO every 4â€“6 hours (max 75 mg/kg/day, max 4 g/day)',
        'IV paracetamol (hospital only)': '1 g IV over 15 minutes every 6 hours (max 4 g/day); no oral equivalent in some patients',
        'Rectal (when oral/IV not possible)': '1 g PR every 4â€“6 hours (max 4 g/day)',
        'Chronic liver disease': '500 mg PO every 6 hours (max 2 g/day)',
        'Alcohol dependence / malnutrition': '500 mg PO every 6 hours (max 2 g/day)',
      },
      paediatric: {
        'Children 1 monthâ€“12 years': '15 mg/kg PO every 4â€“6 hours (max 60 mg/kg/day in 4â€“5 doses)',
        'Neonates (â‰¥32 weeks GA, 10â€“45 days postnatal)': '10â€“15 mg/kg PO every 6â€“8 hours (max 60 mg/kg/day)',
        'Children >12 years (>45 kg)': 'Adult dosing',
        'IV (children)': '15 mg/kg IV every 6 hours (max 60 mg/kg/day)',
      },
      geriatric: {
        'Standard': '500 mg PO every 6 hours (max 3 g/day if >65 years â€” reduced hepatic metabolism; avoid >3 g/day in frail elderly)',
        'Very elderly (>80 years)': '500 mg PO every 8 hours (max 1.5â€“2 g/day)',
      },
      renalAdjustment: 'eGFR >30: no adjustment needed. eGFR 10â€“29: 500 mg every 6 hours (max 3 g/day). eGFR <10: 500 mg every 8 hours (max 1.5 g/day). Haemodialysis: give standard dose (not removed by dialysis). CAPD: standard dosing. Avoid prolonged high-dose use in CKD (renal papillary necrosis risk).',
      hepaticAdjustment: 'Mild (Child-Pugh A): 500 mg every 6 hours (max 3 g/day). Moderate (Child-Pugh B): 500 mg every 8 hours (max 2 g/day). Severe (Child-Pugh C): AVOID if possible â€” use alternative analgesic (tramadol with caution, or low-dose codeine with extreme caution). Active liver disease: CONTRAINDICATED.',
    },
    interactions: [
      'WARFARIN: paracetamol >2 g/day for >1 week may enhance anticoagulant effect (INR increase) â€” monitor INR; safe at â‰¤2 g/day',
      'ALCOHOL (chronic): enhanced hepatotoxicity (CYP2E1 induction â†’ more NAPQI; reduced glutathione â†’ less detoxification) â€” limit to â‰¤2 g/day or avoid; acute alcohol ingestion may actually be protective (inhibits CYP2E1)',
      'CYP2E1 INDUCERS (rifampicin, isoniazid, phenytoin, carbamazepine, phenobarbital, chronic alcohol): increased NAPQI production â†’ lower toxic threshold â€” may need N-acetylcysteine (NAC) at lower-than-standard overdose doses',
      'WARFARIN: at high doses (>4 g/day), paracetamol may increase INR by inhibiting vitamin K-dependent clotting factor synthesis â€” not clinically significant at â‰¤2 g/day',
      'CHARCOAL (activated charcoal): given in overdose â€” reduces paracetamol absorption if given within 1â€“2 hours of ingestion',
      'METOCLOPRAMIDE / DOMPERIDONE: increased paracetamol absorption rate (faster gastric emptying) â€” no clinical significance',
      'ORAL CONTRACEPTIVES: paracetamol may increase ethinylestradiol levels (inhibits glucuronidation) â€” no clinical significance',
      'COAL-TAR DERIVATIVES (benzocaine lozenges, orabase): theoretical increased methemoglobinemia risk â€” very rare',
      'PROPRANOLOL: paracetamol may be less effective as antipyertensive adjunct â€” minor interaction',
    ],
    monitoring: 'At therapeutic doses: minimal monitoring needed â€” liver function rarely affected. Baseline LFTs if chronic use planned or risk factors present (alcohol, malnutrition, liver disease). OVERDOSE monitoring is critical: serum paracetamol levels at 4+ hours post-ingestion (NOT before 4 hours â€” levels may still be rising); plot on Prescott nomogram (Rumack-Matthew); if above treatment line â†’ N-acetylcysteine (NAC) within 8 hours of ingestion (most effective) â€” continue NAC even if >8 hours; LFTs at 12â€“24 hours (AST/ALT peak at 24â€“72 hours); INR at 12â€“24 hours (coagulopathy indicates severe hepatotoxicity); renal function, blood glucose, blood gas, lactate. Chronic use (>4 g/day for >1 week): monitor LFTs every 2â€“4 weeks. If AST/ALT >2Ã— ULN: STOP paracetamol immediately.',
    patient_counselling: 'Do NOT exceed the recommended dose â€” MAXIMUM 4 tablets (4 g) in 24 hours for adults. Taking more than the recommended dose can cause SEVERE LIVER DAMAGE that can be fatal â€” even if you feel well initially (symptoms may not appear for 24â€“48 hours after overdose). Do NOT take paracetamol with other medicines containing paracetamol (many cold/flu remedies contain paracetamol â€” check labels). Do NOT take more than recommended even if the pain/fever is severe. If you are taking paracetamol regularly, wait at least 4 hours between doses. If you drink alcohol regularly (3+ drinks/day), consult your doctor before taking paracetamol â€” your liver is more vulnerable. If you overdose (take more than the recommended amount), go to the emergency department IMMEDIATELY even if you feel well â€” early treatment with N-acetylcysteine prevents liver damage. Signs of overdose: nausea, vomiting, abdominal pain, sweating, pallor in the first 24 hours (may seem to improve, then deteriorate rapidly on day 2â€“3 with jaundice, confusion, liver failure). Paracetamol is safe in pregnancy at recommended doses and is the preferred analgesic/antipyretic. Safe to take with blood pressure medicines, diabetes medicines, and most other medications.',
  },

  // â”€â”€ 4. Ibuprofen â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    name: 'Ibuprofen',
    generic_name: 'Ibuprofen',
    drug_class: 'Non-steroidal anti-inflammatory drug (NSAID) â€” non-selective COX-1/COX-2 inhibitor (propionic acid derivative)',
    indications: [
      'Mild-moderate pain (headache, dental pain, musculoskeletal pain, post-operative pain, dysmenorrhoea)',
      'Inflammatory conditions (rheumatoid arthritis, osteoarthritis, ankylosing spondylitis, psoriatic arthritis)',
      'Fever (antipyretic â€” second-line to paracetamol in most guidelines)',
      'Dysmenorrhoea (first-line NSAID)',
      'Soft tissue inflammation (sprains, strains, tendonitis, bursitis)',
      'Pericarditis (first-line â€” high-dose ibuprofen 600 mg TDS per ESC guidelines)',
      'Patent ductus arteriosus (PDA) closure in preterm neonates (IV ibuprofen lysine)',
      'Juvenile idiopathic arthritis (JIA)',
      'Gout (acute flare â€” as adjunct to colchicine/steroids)',
      'Mild-moderate renal colic (adjunct to antispasmodics)',
    ],
    contraindications: [
      'Hypersensitivity to ibuprofen, aspirin, or any NSAID (cross-reactivity among NSAIDs)',
      'Aspirin-exacerbated respiratory disease (AERD â€” Samter\'s triad: asthma, nasal polyps, aspirin sensitivity)',
      'Active peptic ulcer disease or GI bleeding',
      'Severe heart failure (NYHA IIIâ€“IV) â€” NSAIDs cause sodium/water retention â†’ worsening oedema, may precipitate acute decompensation',
      'Severe renal impairment (eGFR <30 mL/min â€” absolute; eGFR 30â€“59 â€” relative with caution)',
      'Severe hepatic impairment (Child-Pugh C)',
      'Third trimester of pregnancy (pregnancy >30 weeks â€” premature closure of ductus arteriosus, oligohydramnios, neonatal renal impairment)',
      'First trimester pregnancy (relative â€” increased risk of miscarriage and cardiac malformations â€” avoid if possible)',
      'Coronary artery bypass graft (CABG) surgery â€” contraindicated for peri-operative pain (increased thrombotic events; FDA black box)',
      'Active cerebrovascular bleeding',
      'History of NSAID-induced GI bleeding or perforation',
      'Inflammatory bowel disease (active â€” may worsen)',
    ],
    side_effects: [
      'Gastrointestinal (most common â€” dose-dependent): dyspepsia, nausea, abdominal pain, diarrhoea, constipation (5â€“15%); peptic ulceration (2â€“4% on long-term); GI bleeding/perforation (1â€“2% on long-term; higher in elderly, concurrent anticoagulants, corticosteroids, H. pylori); NSAID gastropathy',
      'Cardiovascular: hypertension (NSAIDs cause sodium/water retention + vasoconstriction via renal prostaglandin inhibition), peripheral oedema, heart failure exacerbation, increased risk of MI and stroke (dose-dependent â€” especially with high-dose >2400 mg/day and long-term use; regulatory warnings)',
      'Renal: acute kidney injury (AKI â€” especially in dehydrated patients, elderly, CKD, concurrent ACEi/diuretic use â€” "triple whammy"); chronic interstitial nephritis, renal papillary necrosis (chronic use), hyperkalaemia, sodium/water retention',
      'Haematological: increased bleeding time (platelet COX-1 inhibition â†’ reduced TXA2 â†’ impaired platelet aggregation; reversible â€” unlike aspirin irreversible inhibition)',
      'Hypersensitivity: anaphylaxis, bronchospasm (aspirin-sensitive asthma), urticaria, angioedema',
      'Dermatological: rash, photosensitivity, Stevens-Johnson syndrome (very rare), toxic epidermal necrolysis (very rare)',
      'Hepatic: elevated transaminases (1â€“10%), hepatic failure (very rare)',
      'CNS: headache, dizziness, tinnitus (aspirin-like effect), aseptic meningitis (very rare â€” more in SLE)',
      'Haematological: anaemia (GI blood loss), agranulocytosis, thrombocytopenia (very rare)',
    ],
    dosage: {
      adult: {
        'Mild-moderate pain / fever': '200â€“400 mg PO every 4â€“6 hours (max 1200 mg/day OTC; max 2400 mg/day prescription)',
        'Inflammatory conditions (RA, OA)': '400â€“800 mg PO every 6â€“8 hours (max 2400â€“3200 mg/day in divided doses)',
        'Dysmenorrhoea': '400 mg PO every 6â€“8 hours for 2â€“3 days (start at onset of pain)',
        'Acute gout': '400 mg PO every 6â€“8 hours for 3â€“5 days (then taper)',
        'Pericarditis': '600 mg PO TDS for 1 week, then 400 mg TDS for 1 week, then 200 mg TDS for 1 week (ESC guidelines)',
        'Soft tissue injury': '400 mg PO every 6â€“8 hours for 5â€“7 days (with RICE protocol)',
        'Renal colic (adjunct)': '400 mg PO/IV every 6 hours (IV preferred in acute setting)',
        'PDA closure (preterm neonates)': '10 mg/kg IV once, then 5 mg/kg IV at 24h and 48h (total 3 doses)',
      },
      paediatric: {
        'Fever / pain (>3 months)': '5â€“10 mg/kg PO every 6â€“8 hours (max 20â€“30 mg/kg/day; max 1200 mg/day)',
        'Inflammatory conditions (JIA)': '20â€“40 mg/kg/day divided TDS-QDS (max 40 mg/kg/day)',
        'PDA closure (preterm neonates)': '10 mg/kg IV once, then 5 mg/kg IV at 24h and 48h (3 doses total)',
        'Children <6 months': 'Not recommended without medical supervision',
      },
      geriatric: {
        'Standard': '200â€“400 mg PO every 8 hours (use LOWEST effective dose for SHORTEST duration; max 1200 mg/day preferred in >65 yrs)',
        'Alternative first-line': 'Consider paracetamol instead â€” lower risk profile in elderly',
      },
      renalAdjustment: 'eGFR >60: no adjustment. eGFR 30â€“59: use with caution â€” lowest dose, shortest duration, monitor Cr/Kâº; avoid if possible. eGFR <30: CONTRAINDICATED (worsens renal function, fluid retention, hyperkalaemia). Haemodialysis: AVOID if possible â€” if essential, use 200 mg every 8 hours with monitoring.',
      hepaticAdjustment: 'Mild-moderate: use with caution â€” lowest dose, shortest duration. Severe (Child-Pugh C): CONTRAINDICATED (impaired metabolism â†’ accumulation; GI bleeding risk increased). Monitor LFTs if >7 days use.',
    },
    interactions: [
      'ANTICOAGULANTS (warfarin, DOACs): SIGNIFICANTLY INCREASED GI BLEEDING RISK â€” combination of antiplatelet + anticoagulant + NSAID is highest risk; avoid if possible; if essential, use PPI cover',
      'ANTIPLATELETS (aspirin, clopidogrel): increased bleeding risk â€” AVOID concurrent use if possible; if aspirin cardioprotection needed, take aspirin 30 min BEFORE ibuprofen (ibuprofen competitively blocks aspirin\'s COX-1 binding â†’ reduced cardioprotection)',
      'ACE INHIBITORS (ramipril, enalapril): reduced antihypertensive effect + increased renal impairment risk â€” monitor BP and renal function; "dual RAAS blockade" risk',
      'ARBs (losartan, valsartan): same as ACE inhibitors â€” avoid combination with NSAIDs',
      'DIURETICS (furosemide, HCTZ): reduced diuretic/antihypertensive effect; increased AKI risk â€” "triple whammy" with ACEi + diuretic + NSAID; monitor Cr/Kâº',
      'LITHIUM: NSAIDs reduce lithium clearance â†’ increased lithium levels â†’ toxicity â€” monitor lithium levels if combination unavoidable',
      'METHOTREXATE: NSAIDs reduce MTX renal clearance â†’ increased MTX levels â†’ toxicity (pancytopenia, mucositis) â€” avoid high-dose MTX + NSAIDs; low-dose MTX: monitor FBC and renal function',
      'SSRIS: increased GI bleeding risk (SSRIs inhibit serotonin reuptake in platelets â†’ impaired platelet aggregation) â€” add PPI if concurrent NSAID',
      'CORTICOSTEROIDS: synergistic GI ulceration/bleeding risk â€” add PPI if concurrent use unavoidable',
      'CYCLOSPORINE: increased nephrotoxicity â€” avoid combination; monitor renal function',
      'QUINOLONE ANTIBIOTICS (ciprofloxacin): increased seizure risk (NSAIDs lower seizure threshold) â€” monitor',
      'DIGOXIN: NSAIDs reduce renal clearance of digoxin â†’ increased levels â€” monitor digoxin levels',
      'POTASSIUM-SPARING DIURETICS (amiloride, spironolactone): hyperkalaemia â€” monitor Kâº',
    ],
    monitoring: 'Baseline: FBC, U&E (Cr, Kâº, Naâº), LFTs, Cr/eGFR, BP, history of GI disease, cardiovascular risk factors. During short-term use (<2 weeks): clinical response (pain, inflammation), GI symptoms, BP, Cr/Kâº at 1â€“2 weeks if risk factors. During long-term use (>4 weeks): FBC every 3â€“6 months; Cr/eGFR every 3â€“6 months; LFTs every 6 months; BP at each visit; stool for occult blood if anaemia or GI symptoms. High-risk patients: consider co-prescribing PPI (omeprazole 20 mg daily) if age >65, history of peptic ulcer, concurrent anticoagulant/corticosteroid, or other GI risk factors. Cardiovascular monitoring: symptoms of heart failure (weight, oedema, dyspnoea); BP control. If Cr rises >30% from baseline or Kâº >5.5 mmol/L: STOP ibuprofen and investigate. Renal function: check Cr before starting and within 1 week if risk factors (elderly, CKD, dehydration, concurrent ACEi/diuretic).',
    patient_counselling: 'Take with food or after meals to reduce stomach upset. Do NOT take on an empty stomach. Do NOT exceed the recommended dose â€” more is NOT better and increases risk of serious side effects (stomach bleeding, heart attack, kidney damage). Maximum 3 tablets (1200 mg) in 24 hours without medical advice. Do NOT take for more than 3 days for pain or 5 days for fever without seeing your doctor. Do NOT take if you have had a stomach ulcer or bleeding. Do NOT take in the last 3 months of pregnancy (after 30 weeks). Avoid alcohol â€” increases stomach bleeding risk. If you are taking blood thinners (warfarin, DOACs), blood pressure medicines, or diuretics ("water tablets"), consult your doctor before taking ibuprofen. Stop ibuprofen and seek urgent medical attention if you: develop severe stomach pain, vomit blood or material that looks like coffee grounds, have black tarry stools, develop sudden shortness of breath or chest pain, or develop swelling of the face/limbs.',
  },

  // â”€â”€ 5. Diazepam â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    name: 'Diazepam',
    generic_name: 'Diazepam',
    drug_class: 'Benzodiazepine â€” long-acting (half-life 20â€“100 hours; active metabolite desmethyldiazepam tÂ½ 36â€“200 hours); anxiolytic, sedative, hypnotic, anticonvulsant, muscle relaxant',
    indications: [
      'Anxiety disorders (short-term only â€” max 4 weeks; chronic anxiety: SSRI/SNRI preferred)',
      'Acute anxiety / panic attacks (PRN â€” not first-line for chronic use)',
      'Status epilepticus (IV/PR/rectal â€” first-line for established tonic-clonic status)',
      'Febrile seizures (PR/rectal â€” only if seizure >5 minutes or recurrent)',
      'Alcohol withdrawal syndrome (CIWA-based dosing â€” reduces risk of seizures and delirium tremens)',
      'Muscle spasm (acute â€” musculoskeletal spasm, spasticity from CNS lesions, tetanus, cerebral palsy)',
      'Sedation for medical procedures (IV â€” endoscopy, cardioversion, minor surgical procedures)',
      'Preoperative sedation (anxiolysis before surgery)',
      'Neonatal seizures (IV â€” phenobarbital first-line)',
      'Tetanus (muscle relaxation + sedation)',
      'Vertigo / MÃ©niÃ¨re\'s disease (short-term symptomatic relief)',
      'Insomnia (short-term â€” NOT first-line; zopiclone/zolpidem preferred)',
    ],
    contraindications: [
      'Hypersensitivity to diazepam, any benzodiazepine, or excipients',
      'Severe respiratory insufficiency (e.g., severe COPD â€” respiratory depression)',
      'Sleep apnoea syndrome (exacerbation of respiratory depression)',
      'Myasthenia gravis (worsens muscle weakness)',
      'Severe hepatic impairment (prolonged half-life, accumulation â€” use alternative)',
      'Acute narrow-angle glaucoma (relative â€” increased IOP)',
      'Concurrent opioids (risk of fatal respiratory depression â€” FDA black box warning)',
      'Children <6 months (relative â€” respiratory depression risk)',
      'Pregnancy (first trimester â€” risk of cleft palate; third trimester â€” floppy infant syndrome, neonatal withdrawal)',
      'Breastfeeding (excreted in breast milk â€” sedation, poor suckling in neonate)',
    ],
    side_effects: [
      'CNS: sedation/drowsiness (most common â€” 5â€“10%), dizziness, ataxia, confusion (especially elderly), impaired concentration, anterograde amnesia (common â€” "day after" memory loss), paradoxical agitation (rare â€” more in elderly and children)',
      'Respiratory: respiratory depression (dose-dependent â€” especially with concurrent opioids, in respiratory disease, or after IV administration)',
      'Psychological: dependence (physical AND psychological â€” develops rapidly with regular use >2â€“4 weeks; tolerance to anxiolytic effects occurs; dependence is the MAJOR concern with benzodiazepines)',
      'Withdrawal syndrome (if stopped abruptly after >2â€“4 weeks of use): insomnia, anxiety, agitation, tremor, perceptual disturbances (hyperacusis, paraesthesias), seizures (potentially fatal â€” especially with short-acting benzos, but diapezam\'s long-acting metabolites mask withdrawal initially)',
      'Gastrointestinal: nausea, constipation, dry mouth (uncommon)',
      'Cardiovascular: hypotension (especially IV â€” too rapid injection), bradycardia (rare)',
      'Dermatological: rash, urticaria, injection site pain/thrombophlebitis (IV)',
      'Haematological: blood dyscrasias (very rare â€” agranulocytosis, thrombocytopenia)',
      'Musculoskeletal: muscle weakness (therapeutic effect at high doses â€” may be unwanted)',
      'Local: phlebitis (IV administration), pain at injection site (IM)',
    ],
    dosage: {
      adult: {
        'Anxiety â€” oral': '2â€“10 mg PO 2â€“4 times daily (start 2 mg TDS; max 40 mg/day; LIMIT to 2â€“4 weeks)',
        'Status epilepticus â€” IV': '10 mg IV slowly (over 3â€“5 minutes; max 20 mg total; can repeat once after 5 minutes if seizures persist)',
        'Status epilepticus â€” rectal ( Buccolam )': '10 mg PR (adults >18 yrs)',
        'Alcohol withdrawal â€” loading': '10â€“20 mg PO initially, then 5â€“20 mg every 1â€“2 hours as needed (CIWA protocol); usual total 40â€“80 mg first day',
        'Alcohol withdrawal â€” maintenance': '5 mg PO every 6 hours or 10 mg PO TDS (taper over 5â€“7 days)',
        'Muscle spasm â€” oral': '2â€“15 mg PO 3â€“4 times daily (start low, titrate)',
        'Sedation for procedures â€” IV': '2â€“10 mg IV slowly (start 2 mg, titrate; monitor respiratory rate, SpOâ‚‚, consciousness)',
        'Preoperative sedation': '5â€“15 mg PO 1â€“2 hours before surgery',
        'Insomnia (short-term)': '5â€“15 mg PO at bedtime (max 2 weeks; not first-line)',
        'Tetanus': '1â€“5 mg/kg/day IV continuous infusion or intermittent boluses (intensive care)',
      },
      paediatric: {
        'Status epilepticus (>5 years â€” IV)': '0.2â€“0.5 mg/kg IV slowly (max 10 mg; can repeat once after 5 minutes)',
        'Status epilepticus (1 monthâ€“5 years â€” IV)': '0.2â€“0.5 mg/kg IV slowly (max 5 mg; PR/rectal preferred if IV access difficult)',
        'Status epilepticus â€” rectal': '0.5â€“1 mg/kg PR (max 10 mg for >5 years; 5 mg for <5 years)',
        'Febrile seizures (acute â€” PR)': '0.5 mg/kg PR (max 10 mg; 0.5 mg/kg for 6 monthsâ€“5 years; 1 mg/kg for >5 years)',
        'Muscle spasm (children)': '0.1â€“0.3 mg/kg PO every 8 hours (max 10 mg TDS)',
        'Sedation for procedures (IV)': '0.2â€“0.5 mg/kg IV slowly (max 10 mg)',
        'Neonatal seizures (IV)': '0.2â€“0.5 mg/kg IV slowly (first-line or adjunct to phenobarbital)',
      },
      geriatric: {
        'Anxiety': '1â€“2 mg PO once to twice daily (start very low â€” 1 mg; titrate slowly; max 10 mg/day; increased sensitivity to sedation, ataxia, confusion, falls)',
        'Sedation for procedures': '1â€“2 mg IV slowly (start 1 mg; titrate in small increments)',
      },
      renalAdjustment: 'No dose adjustment required â€” diazepam and its active metabolite (desmethyldiazepam) are hepatically metabolised. However, in severe renal impairment, accumulation of inactive metabolites may occur â€” use with caution in CKD stage 4â€“5. Monitor for excessive sedation.',
      hepaticAdjustment: 'Mild-moderate: use with caution â€” reduced metabolism, prolonged half-life, accumulation. Start at 25â€“50% of standard dose. Severe (Child-Pugh C): AVOID if possible â€” extremely prolonged half-life (up to 200 hours), risk of hepatic encephalopathy worsening, accumulation. If essential, use lorazepam instead (no active metabolites, glucuronidation not affected by liver disease).',
    },
    interactions: [
      'OPIOIDS (morphine, codeine, tramadol, oxycodone, fentanyl, methadone): SYNERGISTIC RESPIRATORY DEPRESSION â€” potentially FATAL; FDA black box warning â€” avoid concurrent use if possible; if essential, use lowest effective doses, monitor respiratory rate and SpOâ‚‚ closely',
      'ALCOHOL: synergistic CNS depression, respiratory depression, enhanced sedation â€” AVOID concurrent use',
      'OTHER CNS DEPRESSANTS (antihistamines, TCAs, antipsychotics, gabapentin, pregabalin, baclofen): additive sedation and respiratory depression â€” use with extreme caution, reduced doses',
      'CYP3A4 INDUCERS (rifampicin, carbamazepine, phenytoin, phenobarbital): reduced diazepam levels (increased metabolism) â€” may need higher doses; but CYP inducers also induce GABA-A receptors â†’ complex interaction',
      'CYP3A4 INHIBITORS (ketoconazole, itraconazole, erythromycin, clarithromycin, grapefruit juice): increased diazepam levels â€” may need dose reduction',
      'CYP2C19 INHIBITORS (omeprazole, fluconazole): increased diazepam levels â€” monitor for sedation',
      'ORAL CONTRACEPTIVES: possibly reduced diazepam metabolism (CYP3A4 inhibition by OCP) â€” monitor',
      'PROBENECID: reduced diazepam clearance â€” monitor for excessive sedation',
      'LEVODOPA: diazepam may reduce levodopa efficacy â€” monitor Parkinson\'s symptoms',
      'CLOZAPINE: additive sedation and respiratory depression â€” monitor closely',
      'VALPROIC ACID: reduced diazepam metabolism â€” increased levels â€” monitor',
    ],
    monitoring: 'Short-term use: respiratory rate (must be >12/min before each dose during acute use), SpOâ‚‚, level of consciousness (GCS), sedation score, blood pressure. Long-term use: signs of dependence (escalating dose, doctor shopping, continued use despite side effects, inability to stop, withdrawal symptoms between doses); psychological assessment for dependence; liver function (if >2 weeks use). Elderly: falls risk assessment, cognitive function, confusion, ataxia. Alcohol withdrawal: CIWA-Ar scoring every 1â€“2 hours, vital signs, mental status. Status epilepticus: continuous monitoring of respiratory function, cardiac rhythm, seizure activity, GCS. Driving: patients should not drive or operate heavy machinery while on diapezam; DVLA must be notified if long-term use affecting fitness to drive.',
    patient_counselling: 'Diazepam is for SHORT-TERM use only (maximum 2â€“4 weeks for anxiety). Taking diazepam regularly for more than 2â€“4 weeks can cause DEPENDENCE â€” your body becomes physically dependent, and stopping suddenly can cause serious withdrawal symptoms (insomnia, anxiety, tremors, seizures, psychosis). If you have been taking diazepam for more than 2â€“4 weeks, do NOT stop suddenly â€” your doctor will reduce the dose GRADUALLY over several weeks or months. Do NOT drink alcohol while taking diazepam â€” it causes dangerous drowsiness and breathing problems. Do NOT drive or operate machinery if you feel drowsy. Take the lowest dose for the shortest possible time. Do NOT increase the dose without consulting your doctor â€” tolerance develops and you may need more for the same effect (leading to dependence). If you are prescribed diazepam for seizures/epilepsy, ALWAYS carry your MedicAlert bracelet and inform your doctor before any procedures or surgery. Store securely â€” diazepam is a controlled substance (Schedule IV/CDSA Class B). If you miss a dose, take it when you remember unless it is almost time for the next dose â€” never double dose.',
  },

  // â”€â”€ 6. Albendazole â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    name: 'Albendazole',
    generic_name: 'Albendazole',
    drug_class: 'Benzimidazole anthelmintic â€” microtubule disruptor (inhibits polymerisation of Î²-tubulin â†’ impairs glucose uptake â†’ death of helminth)',
    indications: [
      'Soil-transmitted helminthiases â€” ascariasis (Ascaris lumbricoides), trichuriasis (Trichuris trichiura), hookworm (Ancylostoma duodenale, Necator americanus), strongyloidiasis (Strongyloides stercoralis)',
      'Neurocysticercosis (NCC) â€” cysticerci of Taenia solium in CNS (causes seizures, raised ICP); treatment of viable cysts; must use with corticosteroids and anticonvulsants',
      'Hydatid disease (cystic echinococcosis) â€” Echinococcus granulosus (liver, lung, peritoneal cysts); treatment or pre-surgical adjunct; long courses 3â€“6 months',
      'Giardiasis (Giardia lamblia / duodenalis) â€” alternative to metronidazole/tinidazole',
      'Microsporidiosis (Microsporidium â€” intestinal) â€” in immunocompromised (HIV/AIDS)',
      'Enterobiasis (pinworm â€” Enterobius vermicularis) â€” alternative to mebendazole',
      'Mass drug administration (MDA) â€” WHO-preventive chemotherapy for STH in endemic areas (school-age children, pregnant women in 2nd/3rd trimester in endemic regions)',
      'Capillariasis (Capillaria philippinensis)',
      'Cutaneous larva migrans (Ancylostoma braziliense â€” creeping eruption)',
      'Gnathostomiasis (Gnathostoma spinigerum)',
      'Fascioliasis (Fasciola hepatica â€” albendazole has limited efficacy; triclabendazole preferred)',
    ],
    contraindications: [
      'Hypersensitivity to albendazole or any benzimidazole (mebendazole)',
      'Pregnancy (first trimester â€” teratogenic in animals; embryotoxic; CONTRAINDICATED in first trimester; may be used in 2nd/3rd trimester for STH in endemic areas per WHO MDA guidelines when benefit outweighs risk)',
      'Breastfeeding (excreted in breast milk â€” avoid or discontinue breastfeeding during treatment and 3 days after)',
      'Hepatic impairment (active liver disease â€” significantly elevated transaminases with treatment)',
      'Cysticercosis involving the eyes (ocular cysticercosis â€” albendazole can cause inflammatory damage to retinal cysts â†’ visual loss; ophthalmic examination required before treatment)',
      'Bone marrow suppression (relative â€” albendazole causes bone marrow suppression; avoid if pre-existing cytopenias)',
    ],
    side_effects: [
      'Gastrointestinal: nausea, vomiting, abdominal pain, diarrhoea, constipation (common â€” 1â€“10%)',
      'Hepatic: elevated transaminases (ALT/AST >2Ã— ULN in 5â€“10% during long-term therapy for hydatid/Neurocysticercosis; rarely hepatotoxicity â€” monitor LFTs)',
      'Haematological: bone marrow suppression (dose-dependent â€” especially with prolonged therapy >3 months; leucopenia, neutropenia, thrombocytopenia, pancytopenia; reversible on discontinuation; monitor FBC every 2 weeks during prolonged therapy)',
      'Neurocysticercosis-related inflammatory reaction: headache, seizures, meningeal signs, increased ICP, fever (ARISE from dying cysts â€” must use corticosteroids + anticonvulsants prophylactically)',
      'Hydatid cyst-related: anaphylaxis if cyst ruptures during treatment (rare but life-threatening â€” albendazole kills cysts â†’ release of antigenic fluid)',
      'Dermatological: rash, urticaria, alopecia (transient â€” with prolonged therapy)',
      'Renal: elevated creatinine (rare)',
      'CNS: dizziness, headache (uncommon)',
      'Local: abdominal discomfort from hydatid cyst inflammation',
    ],
    dosage: {
      adult: {
        'Soil-transmitted helminthiases (single dose)': '400 mg PO as single dose (ascariasis, hookworm, trichuriasis, enterobiasis)',
        'Strongyloidiasis': '400 mg PO once daily for 7 days',
        'Neurocysticercosis (viable cysts)': '15 mg/kg/day PO divided BID for 8â€“30 days (standard: 15 mg/kg/day for 14â€“28 days); USE WITH corticosteroids (dexamethasone/prednisone) and anticonvulsants',
        'Hydatid disease (E. granulosus)': '15 mg/kg/day PO divided BID (400 mg BID for 60 kg adult) for 3 cycles of 28 days on / 14 days off (total 3â€“6 cycles; may extend to 6 months)',
        'Giardiasis': '400 mg PO once daily for 5â€“7 days (alternative to metronidazole)',
        'Microsporidiosis': '400 mg PO twice daily for 2â€“4 weeks (or longer in immunocompromised)',
        'Cutaneous larva migrans': '400 mg PO once daily for 3â€“7 days',
        'Mass drug administration (WHO â€” STH)': '400 mg PO as single dose (annual or biannual in endemic areas)',
        'Enterobiasis': '400 mg PO as single dose (repeat in 2 weeks)',
      },
      paediatric: {
        'STH (children â‰¥2 years â€” single dose)': '400 mg PO as single dose (same as adult)',
        'Strongyloidiasis': '15 mg/kg/day PO divided BID for 7 days',
        'Neurocysticercosis': '15 mg/kg/day PO divided BID for 14â€“28 days (with corticosteroids and anticonvulsants)',
        'Hydatid disease': '15 mg/kg/day PO divided BID for 3 cycles (28 days on / 14 days off)',
        'Giardiasis': '400 mg PO once daily for 5â€“7 days (children â‰¥2 years)',
        'Mass drug administration (WHO)': '200 mg for children 12â€“23 months; 400 mg for children â‰¥24 months',
        'Children <2 years': 'Not recommended for single-dose MDA (limited safety data); use mebendazole if available',
      },
      geriatric: {
        'STH': '400 mg PO as single dose (standard dosing)',
        'Long-term therapy': '15 mg/kg/day PO divided BID â€” use with caution; increased bone marrow suppression risk in elderly; monitor FBC and LFTs more frequently',
      },
      renalAdjustment: 'No dose adjustment required â€” albendazole sulfoxide (active metabolite) is primarily hepatically metabolised. Renal excretion is minor. In severe renal impairment (eGFR <15 mL/min): monitor for metabolite accumulation (limited data). Haemodialysis: not significantly removed by dialysis.',
      hepaticAdjustment: 'Mild (Child-Pugh A): no dose adjustment but monitor LFTs. Moderate (Child-Pugh B): use with caution â€” reduced clearance of active metabolite â†’ increased levels and toxicity; monitor LFTs every 2 weeks. Severe (Child-Pugh C): CONTRAINDICATED â€” markedly increased levels, risk of hepatotoxicity, bone marrow suppression. Check LFTs at baseline and every 2 weeks during therapy.',
    },
    interactions: [
      'DEXAMETHASONE / PREDNISONE: REQUIRED concurrent use in neurocysticercosis (to reduce inflammatory response from dying cysts) â€” not an interaction per se but essential co-medication',
      'ANTICONVULSANTS (carbamazepine, phenytoin, phenobarbital, valproic acid): carbamazepine and phenytoin INDUCE CYP enzymes â†’ reduce albendazole sulfoxide levels â€” may need higher albendazole doses in neurocysticercosis; monitor levels',
      'CYP1A2 INHIBITORS (fluvoxamine, ciprofloxacin): increased albendazole sulfoxide levels â€” limited clinical significance',
      'CYP3A4 INHIBITORS (ketoconazole, itraconazole, grapefruit juice): increased albendazole sulfoxide levels â€” monitor for increased toxicity',
      'THEOPHYLLINE: albendazole may reduce theophylline levels (CYP induction) â€” monitor theophylline levels',
      'WARFARIN: albendazole may reduce warfarin effect (CYP induction) â€” monitor INR',
      'CORTICOSTEROIDS (systemic): in neurocysticercosis, concurrent dexamethasone/prednisone increases albendazole sulfoxide bioavailability (CYP3A4 inhibition by corticosteroids) â€” monitor for increased albendazole levels and adjust if needed',
      'CIMETIDINE: increases albendazole sulfoxide levels (CYP inhibition) â€” monitor for increased efficacy/toxicity',
      'LIPID-LOWERING AGENTS (statins): no significant interaction but monitor',
    ],
    monitoring: 'Short-term single-dose therapy (STH): minimal monitoring needed. Long-term therapy (>2 weeks): LFTs (ALT, AST) at baseline, every 2 weeks during treatment, and 1 month after completing therapy; FBC (WBC, platelets, ANC) every 2 weeks during treatment (bone marrow suppression risk); Cr/eGFR at baseline and monthly. Neurocysticercosis: monitor for inflammatory reaction â€” daily neurological assessment for first 72 hours; seizures may worsen (have anticonvulsant levels checked); CT/MRI brain before treatment (assess cyst burden â€” heavy infection â†’ risk of cerebral oedema with treatment); consider starting dexamethasone 0.1 mg/kg/day before albendazole; monitor ICP (headache, vomiting, papilloedema). Hydatid disease: ultrasound/MRI of affected organ at baseline and after each cycle (assess cyst size/response); LFTs every 2 weeks; FBC every 2 weeks (bone marrow); if cyst ruptures during treatment â†’ anaphylaxis risk â†’ emergency management. Giardiasis: stool microscopy/culture at 2â€“4 weeks post-treatment (test of cure). Mass drug administration: post-MDA surveys (prevalence intensity monitoring).',
    patient_counselling: 'Take albendazole with FOOD (especially fatty food) â€” increases absorption of the active metabolite by up to 5-fold. If treating a family member or household contacts for pinworm (enterobiasis), treat everyone simultaneously. For long-term therapy (hydatid disease, neurocysticercosis): you will have regular blood tests every 2 weeks â€” these are essential to check your blood count and liver function. Report any unusual bruising, bleeding, sore throat, fever, or mouth ulcers immediately (may indicate bone marrow suppression). If you are being treated for neurocysticercosis (brain cysts), you may experience worsening headaches, new seizures, or fever in the first few days of treatment â€” this is expected as the cysts die and cause inflammation. Your doctor will give you steroids to reduce this reaction. Go to hospital IMMEDIATELY if you develop severe headache, visual changes, confusion, or severe seizures. Do NOT take albendazole if you are pregnant or think you may be pregnant (first trimester). If you are breastfeeding, stop breastfeeding during treatment and for 3 days after. For single-dose treatment of threadworm/pinworm: treat the whole household at the same time; wash all bedding and underwear in hot water; repeat dose in 2 weeks.',
  },
];

async function upsertMonograph(m: DrugMonograph): Promise<boolean> {
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
    console.error(`  âœ— Failed: ${m.name} â€” ${error.message}`);
    return false;
  }
  console.log(`  âœ“ ${m.name}`);
  return true;
}

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
    console.error('  âœ— DUPLICATE drug names detected!');
    return false;
  }
  return true;
}

async function main() {
  console.log('â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—');
  console.log('â•‘   Clinova Phase C â€” Drug Monograph Population     â•‘');
  console.log('â•‘   Batch 8: 6 Medicines (Antibiotics / Analgesics  â•‘');
  console.log('â•‘             / CNS / Anthelmintics)                 â•‘');
  console.log('â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');
  console.log();

  console.log('â”â”â” Pre-validation â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
  const before = await validateCount();
  console.log(`Existing monographs: ${before}`);
  const dupes = await checkDuplicates();
  if (!dupes) {
    console.error('Aborting: duplicate detection failed');
    process.exit(1);
  }
  console.log(`Duplicate check: ${dupes ? 'PASS' : 'FAIL'}`);
  console.log();

  console.log('â”â”â” Populating monographs â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
  let success = 0;
  let fail = 0;
  for (const m of MONOGRAPHS) {
    const ok = await upsertMonograph(m);
    if (ok) success++; else fail++;
  }

  console.log();
  console.log('â”â”â” Post-validation â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
  const after = await validateCount();
  console.log(`Total monographs now: ${after}`);
  const added = after - before;
  console.log(`Newly added: ${added}`);

  console.log();
  console.log('â”â”â” Batch 8 Summary â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
  console.log(`  Intended:      ${MONOGRAPHS.length}`);
  console.log(`  Successful:    ${success}`);
  console.log(`  Failed:        ${fail}`);
  console.log(`  Prior total:   ${before}`);
  console.log(`  Current total: ${after}`);
  console.log();

  if (fail === 0 && success === MONOGRAPHS.length) {
    console.log('âœ… Batch 8 COMPLETE. Proceed to Batch 9.');
  } else {
    console.log('âš ï¸  Batch 8 partially complete. Review errors above.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
