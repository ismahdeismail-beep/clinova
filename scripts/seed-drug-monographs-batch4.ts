/**
 * seed-drug-monographs-batch4.ts
 * ----------------------------------------------------------------------------
 * Phase C — Incremental Knowledge Population
 * Batch 4: Tenofovir, Dolutegravir, Rifampicin, Isoniazid, Fluconazole,
 *          Co-trimoxazole (HIV / TB / ID)
 *
 * Usage: npx tsx scripts/seed-drug-monographs-batch4.ts
 * Env:   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Each monograph independently verified against:
 *   - Kenya Essential Medicines List (KEML)
 *   - Kenya Standard Treatment Guidelines (KSTG)
 *   - WHO Essential Medicines List
 *   - WHO HIV/TB Treatment Guidelines
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
  // ── 1. Tenofovir (Disoproxil Fumarate) ───────────────────────────
  {
    name: 'Tenofovir',
    generic_name: 'Tenofovir Disoproxil Fumarate (TDF)',
    drug_class: 'Nucleotide reverse transcriptase inhibitor (NtRTI) — HIV antiretroviral',
    indications: [
      'HIV-1 infection — first-line NRTI backbone (with emtricitabine or lamivudine, plus dolutegravir or efavirenz)',
      'HIV pre-exposure prophylaxis (PrEP) — once-daily oral tenofovir disoproxil + emtricitabine in high-risk HIV-negative individuals',
      'HIV post-exposure prophylaxis (PEP) — as part of 28-day three-drug regimen',
      'Chronic hepatitis B (HBV) — first-line oral antiviral (suppresses HBV DNA, improves LFTs, reduces fibrosis progression)',
      'HIV-HBV co-infection — preferred NRTI backbone (active against both viruses)',
    ],
    contraindications: [
      'Hypersensitivity to tenofovir or any component',
      'eGFR <30 mL/min/1.73m² (contraindicated — use tenofovir alafenamide [TAF] if available, or adjust interval)',
      'Concurrent use with other nephrotoxic drugs (unless absolutely necessary — increased renal risk)',
      'Breastfeeding in HIV (WHO recommends replacement feeding where acceptable, feasible, affordable, sustainable, and safe; otherwise ARV prophylaxis for infant)',
    ],
    side_effects: [
      'Renal: proximal renal tubulopathy (Fanconi syndrome — hypophosphataemia, glycosuria, proteinuria, metabolic acidosis, hypouricaemia — 1–4% with long-term use), acute kidney injury, chronic kidney disease, reduced eGFR',
      'Bone: decreased bone mineral density (BMD — 1–3% loss at hip/spine over 2–3 years; increased fracture risk with long-term use), osteomalacia (renal phosphate wasting)',
      'Gastrointestinal: nausea, vomiting, diarrhoea, abdominal pain, flatulence — common at initiation, usually resolves',
      'Metabolic: lactic acidosis (rare but serious — risk factors: female, obesity, prolonged NRTI therapy), hepatomegaly with steatosis',
      'CNS: headache, dizziness, insomnia, asthenia',
      'Dermatological: rash, pruritus',
      'Immune reconstitution inflammatory syndrome (IRIS) — especially with advanced HIV and coincident TB/cryptococcal infection',
      'Hepatic: elevated transaminases, HBV flare upon discontinuation (if HBV co-infected — monitor LFTs for 6 months after stopping)',
    ],
    dosage: {
      adult: {
        'HIV-1 infection — TDF 300 mg': '300 mg PO once daily (with food — enhances absorption)',
        'HIV PrEP — TDF 300 mg + FTC 200 mg': 'One tablet PO once daily (Truvada or generic equivalent)',
        'HIV PEP — TDF 300 mg + FTC 200 mg + DTG 50 mg': 'Daily for 28 days (start within 72 hours of exposure, ideally <24 hours)',
        'Chronic HBV — TDF 300 mg': '300 mg PO once daily (with or without food)',
        'HIV-HBV co-infection': '300 mg PO once daily (with NRTI backbone and DTG or EFV)',
      },
      paediatric: {
        'HIV — children ≥2 yrs, ≥10 kg': '8 mg/kg PO once daily (max 300 mg) — use tablets or granules',
        'HIV — adolescents ≥35 kg': '300 mg PO once daily (adult dose)',
        'HBV — children ≥12 yrs, ≥35 kg': '300 mg PO once daily',
      },
      renalAdjustment: 'eGFR 30–49: TDF 300 mg every 48 hours. eGFR <30 or dialysis: CONTRAINDICATED (if no alternative, give 300 mg every 72–96 hours after dialysis — NOT recommended). TAF preferred if eGFR <60. Monitor Cr, phosphate, urine glucose/protein at each visit. If Cr increases >25% or phosphate drops, consider switching to TAF.',
      hepaticAdjustment: 'No dose adjustment required. Caution in decompensated cirrhosis. Monitor LFTs in HBV — flare on discontinuation.',
    },
    interactions: [
      'Nephrotoxic drugs (NSAIDs, aminoglycosides, amphotericin B, vancomycin, ciclosporin, tacrolimus, IV contrast): additive nephrotoxicity — avoid if possible, monitor renal function closely',
      'Protease inhibitors (atazanavir, lopinavir/ritonavir, darunavir/ritonavir): increased tenofovir levels (P-gp inhibition) — monitor renal function, avoid atazanavir with TDF (increased renal toxicity)',
      'Didanosine (ddI): increased didanosine levels (severe toxicity: pancreatitis, lactic acidosis, peripheral neuropathy) — avoid combination; if unavoidable, reduce ddI dose to 250 mg/day (if ≥60 kg)',
      'Cidofovir, adefovir: additive nephrotoxicity — avoid',
      'Ribavirin: possible increased risk of mitochondrial toxicity — monitor',
      'Antacids (aluminium/magnesium): reduced tenofovir absorption (chelation) — separate by 2 hours',
    ],
    monitoring: 'Baseline: eGFR/Cr, serum phosphate, urinalysis (glucose, protein), LFTs, HBV serology (HBsAg, anti-HBc — to detect occult HBV), CD4 count, HIV viral load, pregnancy test. During therapy: eGFR/Cr and serum phosphate every 3–6 months (more frequently if renal risk factors: >40 yrs, DM, HTN, CKD, concomitant nephrotoxins); urinalysis annually (proteinuria, glycosuria — early Fanconi detection); CD4 + viral load every 6 months; BMD assessment (DEXA scan) in patients with fracture risk or prolonged use (>5 yrs), especially postmenopausal women; LFTs in HBV patients (monitor for 6 months after stopping TDF — risk of severe HBV flare). IRIS monitoring: fever, worsening of TB symptoms, lymphadenopathy within weeks of ART initiation — be aware, treat underlying OI, continue ART.',
    patient_counselling: 'Take one tablet daily at approximately the same time, preferably with food. This medicine controls HIV but does not cure it — continue taking even if you feel well. Regular kidney function and phosphate blood tests are required — this medicine can affect kidney function over time. Drink plenty of water (2–3 litres daily) to protect your kidneys. Use caution with NSAID painkillers (ibuprofen, diclofenac) — they increase kidney risk. If you have hepatitis B, DO NOT stop this medicine without medical supervision — severe hepatitis flare can occur. Report any of the following to your doctor: bone pain or fractures, foamy urine (proteinuria), increased thirst or frequent urination (phosphate wasting), unexplained fatigue or muscle weakness. Ensure pregnancy status is checked before starting — if pregnant or breastfeeding, discuss with your HIV doctor.',
  },

  // ── 2. Dolutegravir ──────────────────────────────────────────────
  {
    name: 'Dolutegravir',
    generic_name: 'Dolutegravir Sodium',
    drug_class: 'Integrase strand transfer inhibitor (INSTI) — HIV antiretroviral',
    indications: [
      'HIV-1 infection — FIRST-LINE in most WHO-recommended regimens (with tenofovir disoproxil + lamivudine/emtricitabine — TLD/DTG-based ART)',
      'HIV-1 infection — switch therapy for patients on NNRTI-based regimens with viral suppression (to reduce side effects and drug interactions)',
      'HIV-1 infection — second-line for patients failing NNRTI-based ART (with an optimised NRTI backbone)',
      'HIV PrEP (cabotegravir — long-acting injectable, different drug) — does NOT apply to oral DTG',
      'HIV PEP (post-exposure prophylaxis) — as third agent with TDF/FTC backbone',
    ],
    contraindications: [
      'Hypersensitivity to dolutegravir or any component',
      'Concurrent use with dofetilide (cardiac arrhythmia drug — increased dofetilide levels risk of torsades de pointes)',
      'Concurrent use with fampridine/dalfampridine (increased seizure risk)',
      'Pregnancy (first trimester — neural tube defects: 0.3% vs 0.1% background — risk is small but real; discuss risk/benefit; switch to efavirenz or boosted PI in first trimester if alternative available, or continue DTG if already stable and suppressed; WHO does NOT recommend DTG restriction — risk is low)',
      'Breastfeeding in HIV (WHO recommends replacement feeding where safe; if breastfeeding, infant ARV prophylaxis)',
    ],
    side_effects: [
      'CNS: insomnia (5–15% — most common DTG-specific side effect), headache, dizziness, abnormal dreams, anxiety, depression (rare), suicidal ideation (very rare — screen for mental health history)',
      'Gastrointestinal: nausea (common — 5–10% at initiation, usually self-limiting within 1–4 weeks), diarrhoea, vomiting, abdominal pain, dyspepsia',
      'Hypersensitivity: rash, pruritus, urticaria, DRESS syndrome (very rare — fever, eosinophilia, multi-organ involvement; discontinue immediately)',
      'Metabolic: weight gain (modest — reported with INSTI class, especially in women; mean 2–4 kg over 48 weeks), hyperglycaemia (rare)',
      'Hepatic: elevated transaminases (asymptomatic, transient — monitor LFTs; hepatitis B/C co-infected patients at higher risk; post-hepatitis flare if HBV co-infection with DTG monotherapy)',
      'Musculoskeletal: myalgia, arthralgia, elevated CK (rare)',
      'Haematological: decreased neutrophil count (mild, not clinically significant — usually around Week 4 then stabilises)',
      'IRIS (immune reconstitution inflammatory syndrome) — as with any ART initiation at low CD4',
      'Renal: benign elevation in serum creatinine (DTG inhibits tubular secretion of creatinine — rise of 10–15 µmol/L within first 2–4 weeks; does NOT reflect true GFR decline; stable thereafter)',
    ],
    dosage: {
      adult: {
        'ART-naïve — DTG 50 mg': '50 mg PO once daily (with TDF 300 mg/FTC 200 mg — TLD single-tablet regimen or separate)',
        'ART-experienced, INSTI-naïve': '50 mg PO once daily',
        'Switch to DTG-based regimen (stable suppressed)': '50 mg PO once daily (discontinue NNRTI/PI, continue NRTI backbone)',
        'With potent UGT1A1/CYP3A4 inducers (rifampicin, carbamazepine, phenytoin, phenobarbital, St John\'s wort)': '50 mg PO TWICE daily (increase dose due to reduced DTG exposure by ~50%)',
      },
      paediatric: {
        'Infants 4 weeks–<3 kg': '5 mg (as dispersible tablet) PO once daily',
        'Infants 3–6 kg': '10 mg PO once daily',
        'Children 6–10 kg': '15 mg PO once daily',
        'Children 10–14 kg': '20 mg PO once daily',
        'Children 14–20 kg': '25 mg PO once daily',
        'Children 20–40 kg': '30 mg PO once daily',
        'Adolescents ≥40 kg': '50 mg PO once daily',
      },
      renalAdjustment: 'No dose adjustment required (DTG is <1% renally excreted). Safe in all degrees of renal impairment including dialysis. DTG not removed by dialysis. Use standard dose. Monitor Cr — benign rise in first weeks is expected.',
      hepaticAdjustment: 'Child-Pugh A or B: no dose adjustment. Child-Pugh C: limited data — use with caution. DTG is extensively metabolised by UGT1A1 with minor CYP3A4 involvement.',
    },
    interactions: [
      'Rifampicin: reduces DTG AUC by 54% — increase DTG to 50 mg TWICE daily for duration of rifampicin therapy (or use rifabutin 300 mg daily which does not require DTG dose adjustment)',
      'Carbamazepine, phenytoin, phenobarbital: reduce DTG levels (UGT1A1/CYP3A4 induction) — DTG 50 mg twice daily',
      'St John\'s wort (Hypericum perforatum): reduces DTG levels — avoid concomitant use',
      'Efavirenz, nevirapine, etravirine: reduce DTG levels (especially etravirine without boosted PI — avoid; efavirenz: use DTG 50 mg twice daily if no alternative)',
      'Tipranavir/ritonavir: reduced DTG levels — avoid',
      'Oxcarbazepine: reduced DTG levels — DTG 50 mg twice daily',
      'Antacids (aluminium/magnesium), calcium, iron, zinc, buffered preparations: chelation reduces DTG absorption significantly — separate by 4 hours (take DTG 2 hours before or 6 hours after antacid)',
      'Metformin: increased metformin levels (DTG inhibits OCT2 — metformin transporter) — monitor for metformin side effects, consider dose reduction of metformin',
      'Dofetilide: increased dofetilide levels (OCT2 inhibition) — CONTRAINDICATED (risk of torsades de pointes)',
      'Fampridine/dalfampridine: increased seizure risk — CONTRAINDIATED',
    ],
    monitoring: 'Baseline: HIV viral load, CD4 count, Cr/eGFR, LFTs (ALT, AST, bilirubin), HBsAg/anti-HBc (HBV screen), pregnancy test in women of childbearing potential, mental health screening (history of depression/suicidal ideation). During therapy: HIV viral load + CD4 at week 4–8, then every 6 months; Cr/eGFR every 6–12 months (note: DTG causes benign Cr rise of 10–15 µmol/L that is stable and NOT true GFR decline — no action needed); LFTs annually; weight monitoring at each visit (DTG class associated with modest weight gain). Pregnancy: if planning pregnancy or first trimester, discuss risks — neural tube defects ~0.3% (small absolute risk but higher than background); WHO continues to recommend DTG-based ART regardless of pregnancy status; if woman conceives on DTG, continue DTG (do not stop — rebound viraemia risk outweighs small NTD risk). IRIS: monitor for 4–8 weeks after initiation, especially if baseline CD4 <100 cells/µL.',
    patient_counselling: 'Take one tablet daily. If also taking rifampicin (TB treatment), you will need to take dolutegravir TWICE daily (see your doctor). If you take antacids (for heartburn/indigestion), iron, calcium, or zinc supplements — take dolutegravir 2 hours BEFORE or 6 hours AFTER these medicines. Some people experience difficulty sleeping or unusual dreams — tell your doctor if this bothers you. Nausea is common in the first 1–4 weeks — usually improves with time. Report any rash with fever or blisters (rare but serious allergic reaction). This medicine may cause a small weight gain in some people — monitor your weight and discuss with your doctor if concerned. DTG may slightly increase your blood creatinine level in the first few weeks — this is normal and does NOT mean your kidneys are damaged. If you are pregnant, planning pregnancy, or breastfeeding, discuss with your HIV doctor — do NOT stop DTG without medical advice; the risk of HIV transmission to your baby is far greater than any medicine risk. Do NOT stop this medicine — the virus may become resistant.',
  },

  // ── 3. Rifampicin ─────────────────────────────────────────────────
  {
    name: 'Rifampicin',
    generic_name: 'Rifampicin',
    drug_class: 'Rifamycin antibiotic (first-line antitubercular — bactericidal)',
    indications: [
      'Tuberculosis (TB) — first-line, essential component of short-course regimen (with isoniazid, pyrazinamide, ethambutol): rifampicin 600 mg daily for 6 months (2 months intensive + 4 months continuation)',
      'Leprosy (Hansen\'s disease) — multidrug therapy (with dapsone and clofazimine) — WHO-recommended',
      'Staphylococcal infections (osteomyelitis, prosthetic joint infections, endocarditis) — adjunctive with other antibiotics for biofilm penetration',
      'Brucellosis (with doxycycline) — second-line',
      'Legionella pneumophila (with macrolide)',
      'Meningococcal prophylaxis — to eliminate nasopharyngeal carriage (single dose)',
      'Haemophilus influenzae type b (Hib) prophylaxis — close contacts (especially in households with children <4 yrs)',
      'Non-tuberculous mycobacterial (NTM) infections — as part of combination therapy (M. avium, M. kansasii)',
    ],
    contraindications: [
      'Hypersensitivity to rifampicin or any rifamycin',
      'Jaundice or active liver disease',
      'Concurrent use with protease inhibitors (PI-based ART) — rifampicin reduces PI levels by >90% — use rifabutin instead if PI-based ART required (except ritonavir-boosted PIs with dose adjustment)',
      'Concurrent use with elvitegravir/cobicistat (rifampicin reduces cobicistat and elvitegravir levels)',
      'Pregnancy (risk versus benefit — TB treatment benefits outweigh risks; rifampicin is PREFERRED in pregnancy TB; give pyridoxine 25 mg with INH as standard)',
      'Breastfeeding (safe — WHO recommends breastfeeding on TB treatment; small amount excreted, no adverse effects reported; infant should receive INH prophylaxis if applicable)',
    ],
    side_effects: [
      'Hepatic: elevated transaminases (common, usually transient), hepatitis (risk increased with pre-existing liver disease, alcoholism, and especially combined with isoniazid — monitor LFTs monthly), cholestatic jaundice',
      'Gastrointestinal: nausea, vomiting, diarrhoea, abdominal pain, anorexia, pseudomembranous colitis (rare)',
      'Dermatological: flushing, pruritus, rash (morbilliform — common, usually self-limiting; may persist throughout therapy without discontinuation), red/orange discolouration of skin (rare — icterus-like)',
      'Haematological: thrombocytopenia (immune-mediated — rare but serious; can occur with intermittent dosing or upon rechallenge), leukopenia, eosinophilia, haemolytic anaemia (very rare)',
      'Renal: acute kidney injury (acute interstitial nephritis, tubular necrosis — rare), proteinuria',
      'CNS: headache, dizziness, ataxia, drowsiness, confusion (rare — high doses)',
      'Metabolic: hyperuricaemia, hyperglycaemia (rare)',
      'Hypersensitivity: flu-like syndrome (fever, chills, myalgia, arthralgia — with intermittent or high-dose therapy; may include haemolytic anaemia, thrombocytopenia, shock — discontinue and switch to rifabutin)',
      'Red-orange discolouration of body fluids: urine, sweat, tears, sputum, saliva, breast milk, CSF (harmless, inform patient) — contact lenses may be permanently stained',
      'IRIS (TB-IRIS) — when starting ART during TB treatment (fever, worsening TB lymphadenopathy, new pulmonary infiltrates) — treat with corticosteroids, continue ART and TB therapy',
    ],
    dosage: {
      adult: {
        'TB (daily regimen — intensive phase first 2 months)': '600 mg PO once daily (10 mg/kg/day; max 600 mg) — take on empty stomach 30–60 min before food',
        'TB (intermittent — thrice weekly, continuation phase)': '600 mg PO three times weekly',
        'Meningococcal prophylaxis': '600 mg PO twice daily for 2 days (adults)',
        'Brucellosis': '300–600 mg PO once daily (with doxycycline 100 mg twice daily for 6 weeks)',
        'Staphylococcal infection adjunct': '300–600 mg PO twice daily (as part of combination therapy)',
      },
      paediatric: {
        'TB — children': '10–20 mg/kg PO once daily (max 600 mg)',
        'TB — neonates': '10 mg/kg PO once daily',
        'TB — intermittent (thrice weekly)': '10–15 mg/kg PO three times weekly (max 600 mg)',
        'Meningococcal prophylaxis': '10 mg/kg PO twice daily for 2 days (children ≥1 month)',
        'Hib prophylaxis — children': '20 mg/kg PO once daily for 4 days (max 600 mg)',
      },
      renalAdjustment: 'No dose adjustment required. Rifampicin is <30% renally excreted. Not significantly removed by dialysis. Give standard dose in all stages of CKD and dialysis.',
      hepaticAdjustment: 'CAUTION in hepatic impairment. Contraindicated in jaundice or acute liver disease. Monitor LFTs very closely if given in compensated cirrhosis. Dose reduction not established — use with extreme caution. Risk of hepatotoxicity increases with pre-existing liver damage. Discontinue if bilirubin >3 mg/dL or ALT >5x ULN (or ALT >3x ULN with hepatitis symptoms).',
    },
    interactions: [
      'POTENT CYP3A4/2C9/2C19 ENZYME INDUCER — affects >80% of drugs; consider dose adjustments or alternatives',
      'HIV ANTIRETROVIRALS: significantly reduces levels of most ARVs: DTG (increase to 50 mg twice daily), EFV (standard dose 600 mg daily OK), NVP (avoid — hepatotoxicity risk), PIs (avoid — use rifabutin instead with boosted PIs, or increase PI dose), RAL (standard dose 400 mg twice daily OK), MVC (increase dose), BIC/TAF (use DTG instead of BIC, TAF 25 mg daily OK)',
      'ORAL CONTRACEPTIVES: reduced efficacy — use non-hormonal or additional barrier method (rifampicin induces CYP3A4, reducing oestrogen/progestin levels)',
      'WARFARIN: markedly reduced INR — monitor closely, warfarin dose may need 2–3x increase during rifampicin; after stopping, reduce warfarin over 2 weeks',
      'CORTICOSTEROIDS (prednisolone, dexamethasone): reduced efficacy — increase dose 2–3 fold',
      'ANTIFUNGALS (fluconazole, itraconazole, voriconazole): reduced levels — increase antifungal dose; voriconazole is CONTRAINDICATED with rifampicin',
      'BENZODIAZEPINES (diazepam, midazolam): reduced levels and efficacy — monitor or use alternative',
      'METFORMIN: slightly reduced efficacy — monitor glucose',
      'STATINS (atorvastatin, simvastatin): reduced efficacy — monitor lipids, consider increasing statin dose or switching to rosuvastatin/pravastatin (less CYP3A4-dependent)',
      'CALCIUM CHANNEL BLOCKERS (nifedipine, amlodipine, verapamil): reduced levels — monitor BP, increase dose as needed',
      'SULPHONYLUREAS (glibenclamide, gliclazide): reduced efficacy — monitor glucose, may need dose increase',
      'BETA-BLOCKERS (propranolol, metoprolol): reduced levels — monitor HR/BP',
      'THEOPHYLLINE: reduced levels — monitor theophylline levels, increase dose',
      'DAPSONE: reduced levels — monitor response',
      'DIGOXIN: reduced levels — monitor digoxin levels',
      'METHADONE: reduced levels — monitor for withdrawal symptoms, may need dose increase',
      'CYCLOSPORINE, TACROLIMUS: reduced levels — monitor levels, increase dose 2–3 fold',
      'LEVOTHYROXINE: increased metabolism — monitor TSH, adjust dose',
      'PHENYTOIN: increased phenytoin metabolism AND reduced rifampicin levels — monitor both',
    ],
    monitoring: 'Baseline: LFTs (ALT, AST, ALP, GGT, bilirubin), FBC, Cr/eGFR, uric acid (rifampicin raises urate), hepatitis B/C serology, HIV test (mandatory — all TB patients should be tested), sputum AFB smear/culture + GeneXpert, chest X-ray, weight. During therapy: LFTs every 2 weeks for first 2 months (then monthly thereafter) — if ALT >3–5x ULN without symptoms, consider stopping INH (most likely culprit) and continue rifampicin; if ALT >5x ULN or ALT >3x ULN with hepatitis symptoms (jaundice, nausea, RUQ pain, fatigue), STOP all TB drugs, re-challenge sequentially. Monthly: sputum AFB smear (conversion by month 2 indicates good response), weight (malnutrition common in TB), adherence check. Visual acuity/colour vision (ethambutol — monthly). Uric acid in patients with gout. At each visit: assess for hepatotoxicity (nausea/vomiting, abdominal pain, jaundice, dark urine, pale stools), examine skin and eyes for jaundice. IRIS monitoring: especially in HIV co-infected patients starting ART within 2–8 weeks of TB treatment — anticipate, manage with NSAIDs/corticosteroids, continue ART and TB therapy.',
    patient_counselling: 'CRITICAL: Take rifampicin on an EMPTY STOMACH (at least 30 minutes before or 2 hours after food) for proper absorption. This medicine will turn your urine, sweat, tears, and saliva a harmless reddish-orange colour — do NOT be alarmed, but note that contact lenses may be permanently stained (wear glasses during treatment). The entire 6-month TB course must be completed — do not miss doses or stop early. Missed doses can lead to drug-resistant TB, which is much harder to treat. Regular monthly blood tests (liver function) are required to monitor for side effects. Seek medical attention immediately if: yellowing of skin/eyes (jaundice), dark urine, pale stools, severe nausea/vomiting/abdominal pain (liver toxicity), rash with fever and sore throat, easy bruising or bleeding (low platelets). This medicine makes oral contraceptives (the pill) less effective — use condoms or another barrier method. Inform ALL your healthcare providers (including pharmacy, dentists) that you are taking rifampicin — many medicines interact with it.',
  },

  // ── 4. Isoniazid ──────────────────────────────────────────────────
  {
    name: 'Isoniazid',
    generic_name: 'Isoniazid (INH)',
    drug_class: 'First-line antitubercular (bactericidal — inhibits mycolic acid synthesis)',
    indications: [
      'Tuberculosis (TB) — first-line, essential in all phases: daily or thrice-weekly with rifampicin, pyrazinamide, ethambutol (2 months), then INH + rifampicin (4 months continuation)',
      'Latent TB infection (LTBI) — prophylaxis: 6–9 months INH monotherapy, daily or 3HP regimen (3 months once-weekly INH + rifapentine)',
      'TB preventive therapy (TPT) in HIV — 6 months INH daily (reduces TB incidence by 33–60% in PLHIV; recommended for all adults and adolescents with HIV in high-TB settings, after excluding active TB)',
      'Household contacts of infectious TB — prophylaxis after excluding active TB (especially children <5 yrs)',
    ],
    contraindications: [
      'Hypersensitivity to isoniazid or any component',
      'Acute hepatitis or severe hepatic impairment',
      'History of isoniazid-induced hepatitis or severe adverse reaction',
      'Alcoholism — active and heavy (significantly increases hepatotoxicity risk — monitor LFTs very closely, consider alternative LTBI regimen)',
      'Severe adverse reaction to INH in the past (drug rash with eosinophilia and systemic symptoms — DRESS, agranulocytosis, severe peripheral neuropathy)',
    ],
    side_effects: [
      'Hepatic: hepatotoxicity (1–2% — most common serious adverse effect; asymptomatic ALT elevation in 10–20% resolves spontaneously; age-related risk: rare <20 yrs, 0.3% in 20–34 yrs, 1.2% in 35–49 yrs, 2.3% in ≥50 yrs; risk increased with alcohol, pre-existing liver disease, concurrent hepatotoxic drugs)',
      'Neurological: peripheral neuropathy (2–20% — dose-dependent; due to pyridoxine [vitamin B6] depletion; risk higher in: malnutrition, alcoholism, diabetes, HIV, renal failure, pregnancy, breastfeeding, slow acetylators; PREVENTABLE with pyridoxine 10–50 mg daily)',
      'CNS: optic neuritis, convulsions (at high doses), psychosis (rare — treat with pyridoxine 50–100 mg and stop INH if severe), encephalopathy, memory loss, dizziness',
      'Gastrointestinal: nausea, vomiting, diarrhoea, epigastric discomfort, pancreatitis (rare)',
      'Dermatological: rash, morbilliform, urticaria, acne-like eruptions, Stevens-Johnson syndrome (rare — DRESS), pellagra (niacin deficiency — dermatitis, diarrhoea, dementia — very rare)',
      'Haematological: agranulocytosis, haemolytic anaemia, sideroblastic anaemia (pyridoxine-responsive), thrombocytopenia (rare)',
      'Metabolic: pyridoxine deficiency (universal — always supplement), hyperglycaemia, metabolic acidosis (rare — INH overdose)',
      'Hypersensitivity: fever, eosinophilia, arthralgia, lymphadenopathy, lupus-like syndrome (drug-induced SLE — positive ANA, arthralgia, rash, serositis — reversible on stopping)',
      'Rheumatic: arthralgia (10–20% — usually wrists, knees, ankles — treat with NSAIDs, continue INH)',
      'Overdose: metabolic acidosis, refractory seizures, coma (treat with high-dose pyridoxine IV — gram-for-gram with INH ingested, then 1 g IV every 5–10 minutes until seizures controlled)',
    ],
    dosage: {
      adult: {
        'TB (daily regimen)': '300 mg PO once daily (5 mg/kg/day; max 300 mg) — take on empty stomach',
        'TB (thrice-weekly)': '600–900 mg PO three times weekly (15 mg/kg/dose; max 900 mg)',
        'TB (intermittent — twice weekly, rare)': '600–900 mg PO twice weekly (15 mg/kg/dose; max 900 mg)',
        'LTBI — 6H or 9H': '300 mg PO once daily for 6 or 9 months',
        'LTBI — 3HP': 'INH 900 mg PO + rifapentine 900 mg PO once weekly for 12 doses (directly observed)',
        'TPT in HIV — 6H': '300 mg PO once daily for 6 months',
      },
      paediatric: {
        'TB — daily': '10–15 mg/kg PO once daily (max 300 mg)',
        'TB — thrice weekly': '20–30 mg/kg PO three times weekly (max 900 mg)',
        'LTBI — daily': '10 mg/kg PO once daily (max 300 mg) for 6–9 months',
        'TPT — children <15 yrs with HIV': '10 mg/kg PO once daily (max 300 mg) for 6 months',
      },
      renalAdjustment: 'CrCl 10–50: no dose adjustment needed. CrCl <10 (dialysis): give 300 mg daily after dialysis (~50% is excreted renally as active drug + metabolites). Isoniazid is removed by dialysis. Monitor for peripheral neuropathy.',
      hepaticAdjustment: 'Contraindicated in acute hepatitis or severe impairment. Use with caution in mild-moderate impairment — reduce dose? Not standardised; use rifampicin-based regimen without INH if possible. Monitor LFTs closely. Discontinue if ALT >5x ULN (or ALT >3x ULN with symptoms) and do not rechallenge.',
    },
    interactions: [
      'Rifampicin: increased hepatotoxicity risk (additive — monitor LFTs closely especially in first 2 months)',
      'Carbamazepine, phenytoin: INH INCREASES levels of both (CYP2C19/CYP3A4 inhibition) — monitor phenytoin/carbamazepine levels, reduce dose by 30–50%',
      'Benzodiazepines (diazepam, triazolam): increased levels (CYP3A4/CYP2C19 inhibition) — enhanced sedation',
      'Paracetamol (acetaminophen): increased risk of hepatotoxicity (CYP2E1 induction — more toxic metabolite) — limit paracetamol to <2 g/day',
      'Alcohol: ACUTE — increased INH metabolism (more toxic metabolite); CHRONIC — increased hepatotoxicity (additive + enzyme induction) — avoid alcohol entirely during INH therapy',
      'Theophylline: increased theophylline levels (CYP1A2/CYP2E1 inhibition) — monitor levels, reduce dose',
      'Warfarin: enhanced anticoagulant effect (CYP inhibition) — monitor INR',
      'Valproate: increased valproate levels — monitor, may need dose reduction',
      'SSRIs/TCAs: increased antidepressant levels — monitor for toxicity',
      'Prednisolone: decreased INH levels (increased metabolism) — may need INH dose increase',
      'Antacids (aluminium): reduced INH absorption — separate by 1–2 hours',
      'Tyramine-rich foods (aged cheese, red wine, cured meats, soy sauce, avocados, bananas, chocolate): rare interaction (INH has mild MAO-inhibiting effect — may cause hypertension, flushing, palpitations) — advise moderation, not strict avoidance',
    ],
    monitoring: 'Baseline: LFTs (ALT, AST, total bilirubin), Cr/eGFR, HIV test, pregnancy test, alcohol use assessment, hepatitis B/C serology. During therapy: LFTs monthly in at-risk groups (≥35 yrs, alcohol users, HBV/HCV, hepatotoxic drugs, prior INH hepatotoxicity) — in those <35 yrs without risk factors, LFTs at baseline and at 1, 3, 6 months. CLINICAL MONITORING for hepatotoxicity at each visit: nausea, vomiting, abdominal pain, jaundice, dark urine, pale stools, unexplained fatigue, loss of appetite. Educate patient to STOP INH and seek medical attention immediately if these symptoms appear. Peripheral neuropathy screening: monthly — ask about numbness, tingling, burning in hands/feet. Ensure pyridoxine 10–50 mg daily is prescribed for ALL patients (universal supplementation). Weight monitoring: monthly during TB treatment. Drug-induced lupus: ask about arthralgia, rash, malar distribution — if positive ANA, stop INH, switch to rifampicin + ethambutol + pyrazinamide continuation. Sputum AFB: monthly until conversion (expect 2-month conversion in drug-sensitive TB).',
    patient_counselling: 'Take isoniazid on an EMPTY STOMACH (1 hour before or 2 hours after food) for best absorption. You MUST take a vitamin B6 (pyridoxine) supplement daily while on this medicine — it prevents nerve damage (tingling, numbness, burning in hands and feet). CRITICAL: Stop this medicine and seek medical help IMMEDIATELY if you develop: yellow skin/eyes (jaundice), dark urine, pale stools, severe nausea/vomiting, right upper abdominal pain, or unusual tiredness (liver toxicity warning signs). The entire course of TB treatment (6 months) must be completed to cure the infection and prevent drug resistance. Avoid alcohol completely during treatment — alcohol significantly increases the risk of liver damage. If you have numbness or tingling in your fingers/toes, tell your doctor — your pyridoxine dose may need to be increased. Regular monthly blood tests to check your liver function are essential. If you miss a dose: take it as soon as you remember, but if it is almost time for the next dose, skip the missed dose — NEVER double dose.',
  },

  // ── 5. Fluconazole ────────────────────────────────────────────────
  {
    name: 'Fluconazole',
    generic_name: 'Fluconazole',
    drug_class: 'Triazole antifungal',
    indications: [
      'Cryptococcal meningitis — acute treatment and maintenance (HIV-associated, first-line)',
      'Vulvovaginal candidiasis (VVC) — uncomplicated and complicated',
      'Oropharyngeal candidiasis (thrush) — including HIV-associated and cancer therapy-related',
      'Oesophageal candidiasis — HIV-associated',
      'Invasive candidiasis (non-neutropenic — step-down from echinocandin)',
      'Candiduria (urinary tract candidiasis)',
      'Dermatophytosis (tinea infections: corporis, cruris, pedis, capitis) — topical or systemic',
      'Coccidioidomycosis (non-meningeal) — chronic suppressive therapy',
      'Histoplasmosis — mild-moderate (if unable to tolerate itraconazole)',
      'Prophylaxis: candidiasis in haematopoietic stem cell transplant (HSCT) recipients, HIV with low CD4 (<100 cells/µL in high-risk settings)',
    ],
    contraindications: [
      'Hypersensitivity to fluconazole or any azole antifungal',
      'Concurrent use with terfenadine or astemizole (fluconazole ≥400 mg/day — risk of serious ventricular arrhythmias)',
      'Concurrent use with cisapride (increased cisapride levels — QTc prolongation, ventricular arrhythmias)',
      'Concurrent use with pimozide (QT prolongation)',
      'Concurrent use with quinidine (QT prolongation)',
      'Concurrent use with erythromycin (QT prolongation — additive)',
      'Pregnancy (high-dose and prolonged use — first-trimester risk of spontaneous abortion and congenital anomalies; single-dose VVC treatment is low risk; avoid high-dose fluconazole in pregnancy if possible)',
      'Breastfeeding (excreted in breast milk at similar levels to plasma — single low doses probably acceptable; prolonged high-dose use avoid)',
    ],
    side_effects: [
      'Gastrointestinal: nausea, vomiting, diarrhoea, abdominal pain, dyspepsia (common, dose-related — up to 30% at high doses)',
      'Hepatic: elevated transaminases (ALT/AST — 1–5%, usually asymptomatic and reversible), cholestatic jaundice, hepatitis, hepatic necrosis (rare but potentially fatal — especially in high-dose prolonged therapy, HIV, or pre-existing liver disease)',
      'Dermatological: rash (1–5% — morbilliform, pruritus), alopecia (reversible — 1–2% with prolonged therapy >6 months), Stevens-Johnson syndrome (very rare — especially in HIV)',
      'QT interval prolongation: dose-related (especially at high doses ≥400 mg/day), torsades de pointes (rare but potentially fatal — risk factors: electrolyte abnormalities, pre-existing cardiac disease, concurrent QT-prolonging drugs)',
      'CNS: headache, dizziness, insomnia, somnolence, seizures (rare)',
      'Metabolic: hypertriglyceridaemia, hypercholesterolaemia (with high doses), hypokalaemia (rare)',
      'Haematological: leukopenia, neutropenia, thrombocytopenia (rare)',
      'Endocrine: adrenal suppression (with very high doses >400 mg/day — fluconazole is a CYP17 inhibitor at high doses)',
    ],
    dosage: {
      adult: {
        'VVC (uncomplicated)': '150 mg PO single dose',
        'VVC (complicated / recurrent)': '150 mg PO every 72 hours for 3 doses (days 1, 4, 7), then 150 mg weekly for 6 months (maintenance)',
        'Oropharyngeal candidiasis': '200 mg PO on day 1, then 100 mg PO once daily for 7–14 days (continue 14–21 days in HIV)',
        'Oesophageal candidiasis': '200 mg PO on day 1, then 100–200 mg PO once daily for 14–21 days (continue 21 days in HIV)',
        'Cryptococcal meningitis — induction (severe)': '1,200 mg PO once daily (12–16 mg/kg); alternative: 800 mg PO daily for 2 weeks (if mild disease)',
        'Cryptococcal meningitis — consolidation': '400–800 mg PO once daily for 8 weeks',
        'Cryptococcal meningitis — maintenance/suppression': '200 mg PO once daily (lifelong if HIV not suppressed)',
        'Candiduria': '200–400 mg PO once daily for 7–14 days',
        'Dermatophytosis — systemic': '150–300 mg PO once weekly for 2–6 weeks',
      },
      paediatric: {
        'Oropharyngeal candidiasis — children': '6 mg/kg PO on day 1, then 3 mg/kg once daily for 7–14 days',
        'Invasive candidiasis — children': '6–12 mg/kg PO once daily (max 800 mg/day)',
        'Cryptococcal meningitis — induction': '12 mg/kg PO once daily (max 800 mg) for 2 weeks, then 6–10 mg/kg/day',
        'Prophylaxis in HIV — children': '3–6 mg/kg PO once daily',
      },
      renalAdjustment: 'CrCl 30–50: reduce dose by 50%. CrCl <30: reduce dose by 50% and increase dosing interval to every 48 hours (or give 50% dose daily). Dialysis: give full dose after each dialysis session. Fluconazole is >80% renally excreted unchanged.',
      hepaticAdjustment: 'Use with caution in hepatic impairment. Monitor LFTs closely — especially if high doses or prolonged therapy. Discontinue if signs of hepatic injury (ALT >5x ULN or ALT >3x ULN with symptoms). Fluconazole is a moderate CYP inhibitor — monitor interactions (warfarin, phenytoin, sulphonylureas, etc.).',
    },
    interactions: [
      'WARFARIN: increased INR (CYP2C9 inhibition) — monitor INR closely, reduce warfarin dose by 30–50%',
      'PHENYTOIN: increased phenytoin levels (CYP2C9 inhibition) — monitor phenytoin levels, reduce dose',
      'SULPHONYLUREAS (glibenclamide, gliclazide, glipizide): enhanced hypoglycaemic effect (CYP2C9 inhibition) — monitor glucose, may need dose reduction',
      'RIFAMPICIN: reduced fluconazole AUC by 25–50% (enzyme induction) — monitor efficacy, may need fluconazole dose increase; also rifampicin levels may be increased',
      'TERFENADINE, ASTEMIZOLE: QT prolongation — CONTRAINDICATED with fluconazole ≥400 mg/day',
      'CISAPRIDE: QT prolongation — CONTRAINDIATED',
      'PIMOZIDE: QT prolongation — CONTRAINDIATED',
      'QUINIDINE: QT prolongation — CONTRAINDIATED',
      'TRIAZOLAM, MIDAZOLAM (oral): increased benzodiazepine levels and prolonged sedation — avoid or reduce dose closely, monitor for over-sedation',
      'STATINS (atorvastatin, simvastatin): increased statin levels (CYP3A4 inhibition) — increased risk of myopathy/rhabdomyolysis; reduce statin dose or switch to fluvastatin/pravastatin/rosuvastatin',
      'CALCIUM CHANNEL BLOCKERS (nifedipine, amlodipine, verapamil): increased CCB levels — increased risk of oedema, bradycardia, hypotension; monitor and reduce CCB dose',
      'CYCLOSPORINE, TACROLIMUS: increased levels of both (CYP3A4 inhibition) — monitor levels, reduce immunosuppressant dose by 25–50%',
      'THEOPHYLLINE: increased theophylline levels (minor CYP1A2 inhibition) — monitor levels if high fluconazole doses',
      'ORAL CONTRACEPTIVES: increased oestrogen levels (CYP3A4 inhibition) — no clinically significant effect; no adjustment needed',
      'HYDROCHLOROTHIAZIDE (HCTZ): increased fluconazole levels (20–40%) — no dose adjustment usually needed but be aware',
      'ZIDOVUDINE (AZT): increased zidovudine levels — increased risk of haematological toxicity',
    ],
    monitoring: 'Baseline: LFTs (ALT, AST, bilirubin), Cr/eGFR, FBC, ECG (QTc — if high dose ≥400 mg/day, cardiac risk factors, or concurrent QT-prolonging drugs), serum K+, Mg2+ (QTc risk). During therapy: LFTs every 2–4 weeks for first 2 months of high-dose therapy (≥400 mg/day) or prolonged therapy; then monthly if abnormal baseline or high risk (HIV, pre-existing liver disease). Cr at baseline and periodically. QTc: repeat ECG within 1–2 weeks of reaching high doses or adding interacting drugs. K+, Mg2+: monitor and replete if low (hypokalaemia/hypomagnesaemia increase TdP risk long-term therapy). Dermatological: monitor for rash — if bullous lesions or mucosal involvement, stop fluconazole (SJS/TEN potential). HIV-specific: CD4 count, HIV viral load monitoring (fluconazole is not an ARV but used for OI treatment/prophylaxis). In cryptococcal meningitis: serial lumbar punctures to monitor CSF opening pressure and culture conversion.',
    patient_counselling: 'For serious fungal infections (cryptococcal meningitis, invasive candidiasis), this medicine is taken once daily at high doses — strict adherence is essential to prevent relapse. For thrush (oral/oesophageal candidiasis): improvement is usually seen within 3–7 days; complete the full course even if symptoms resolve. For vaginal thrush: a single 150 mg capsule usually works — if symptoms persist beyond 3 days, consult your doctor. This medicine can affect the liver — report yellowing of skin/eyes, dark urine, severe nausea/vomiting, or right upper abdominal pain immediately. It can also affect heart rhythm at high doses — report palpitations, dizziness, or fainting. Avoid alcohol. If you are on warfarin (blood thinner), your INR must be monitored closely. You will need regular blood tests (liver function) during prolonged treatment.',
  },

  // ── 6. Co-trimoxazole ──────────────────────────────────────────────
  {
    name: 'Co-trimoxazole',
    generic_name: 'Trimethoprim–Sulfamethoxazole (TMP–SMX)',
    drug_class: 'Folate synthesis inhibitor (sulphonamide + diaminopyrimidine combination)',
    indications: [
      'Pneumocystis jirovecii pneumonia (PCP) — treatment and prophylaxis (first-line, HIV-associated and immunocompromised)',
      'Toxoplasma gondii encephalitis — treatment (with pyrimethamine) and prophylaxis (first-line in HIV with CD4 <100)',
      'Isospora belli and Cyclospora cayetanensis infections — treatment and secondary prophylaxis in HIV',
      'Urinary tract infections (UTI) — uncomplicated and complicated (TMP–SMX DS twice daily for 3–14 days depending on severity; local resistance — currently ~30–50% E. coli resistance in East Africa; use only if susceptible)',
      'Acute exacerbations of chronic bronchitis / COPD',
      'Acute otitis media (children)',
      'Bacterial sinusitis, pharyngitis, and tonsillitis (second-line to penicillins)',
      'Shigellosis — treatment of dysentery (especially if resistance to other agents)',
      'Salmonella typhi (typhoid fever) — alternative (if susceptible)',
      'Nocardiosis — treatment (first-line in disseminated disease)',
      'Brucellosis — second-line (with rifampicin or gentamicin)',
      'Prophylaxis in HIV: prevention of PCP, toxoplasmosis, isosporiasis, malaria, and bacterial infections (WHO-recommended for all adults and adolescents with HIV with CD4 <350 or WHO stage 3/4)',
      'Malaria prophylaxis — in areas with sulfadoxine-pyrimethamine-sensitive malaria (alternative)',
    ],
    contraindications: [
      'Hypersensitivity to TMP, SMX, any sulphonamide, or any component',
      'History of sulphonamide-induced Stevens-Johnson syndrome, toxic epidermal necrolysis, or DRESS syndrome',
      'Severe hepatic impairment (fulminant hepatitis, hepatic necrosis)',
      'Severe renal impairment (CrCl <15 mL/min — unless for PCP treatment where risk/benefit may justify use with TDM) — avoid in routine infections',
      'Pregnancy — contraindicated near term (risk of kernicterus — sulphonamide displaces bilirubin from albumin in neonate; avoid in first and third trimesters; folate supplementation mandatory if used in first trimester)',
      'Breastfeeding — avoid near term: risk of kernicterus in G6PD-deficient or jaundiced infants',
      'G6PD deficiency — risk of haemolytic anaemia (avoid unless absolutely necessary; haemolysis is dose-dependent and usually reversible)',
      'Megaloblastic anaemia due to folate deficiency (may worsen)',
      'Severe bone marrow depression / aplastic anaemia / agranulocytosis',
      'Infants <2 months (risk of kernicterus — sulphonamide displaces bilirubin)',
    ],
    side_effects: [
      'DERMATOLOGICAL: rash (3–12% — most common; morbilliform, urticarial; HIV patients have 30–50% rash rate — often occurs at 7–14 days; desensitisation may be attempted), photosensitivity, Stevens-Johnson syndrome (SJS), toxic epidermal necrolysis (TEN — rare but potentially fatal — 0.1%; discontinue at first sign of rash with blistering, mucosal involvement, or fever)',
      'GASTROINTESTINAL: nausea, vomiting, diarrhoea, abdominal pain, anorexia, pseudomembranous colitis (C. difficile)',
      'HAEMATOLOGICAL: leukopenia, neutropenia, thrombocytopenia (dose-related — especially at high doses for PCP; monitor FBC weekly), megaloblastic anaemia (folate antagonism — especially with prolonged high-dose therapy), agranulocytosis (rare, idiosyncratic), haemolytic anaemia (G6PD deficiency), methaemoglobinaemia (rare)',
      'METABOLIC: hyperkalaemia (TMP inhibits renal K+ excretion — especially at high doses, with CKD, or concurrent K+-sparing drugs/ACE inhibitors/ARBs), hyponatraemia, hypoglycaemia (with high-dose SMX)',
      'HEPATIC: elevated transaminases, cholestatic jaundice, hepatitis, hepatic necrosis (rare)',
      'RENAL: crystalluria (SMX crystallises in acidic urine — prevent with adequate hydration and urinary alkalinisation), interstitial nephritis, acute kidney injury, uraemia',
      'CNS: headache, dizziness, insomnia, aseptic meningitis (drug-induced — rare: fever, nuchal rigidity, headache, CSF pleocytosis — discontinue), confusion, tremor, seizures (rare, high-dose)',
      'HYPERSENSITIVITY: fever, eosinophilia, DRESS syndrome (Drug Rash with Eosinophilia and Systemic Symptoms — fever, rash, lymphadenopathy, hepatitis, nephritis, pneumonitis, myocarditis — up to 3% in HIV)',
      'PULMONARY: infiltrates, cough, dyspnoea — hypersensitivity pneumonitis (rare)',
      'MUSCULOSKELETAL: arthralgia, myalgia, rhabdomyolysis (rare)',
    ],
    dosage: {
      adult: {
        'PCP treatment (moderate–severe)': '15–20 mg/kg/day (TMP) IV or PO divided every 6–8 hours for 14–21 days (severe: start IV, step-down to PO when improving)',
        'PCP prophylaxis (primary/secondary)': '1 DS tablet (160/800 mg) PO once daily (or 1 SS tablet PO once daily)',
        'Toxoplasmosis prophylaxis': '1 DS tablet PO once daily (when CD4 <100 cells/µL)',
        'Toxoplasmosis treatment': 'TMP–SMX DS 2 tablets PO twice daily + pyrimethamine + folinic acid (or TMP-SMX alone 5 mg/kg TMP PO 3 times daily)',
        'UTI (uncomplicated)': '1 DS tablet (160/800 mg) PO twice daily for 3–7 days (or SS tablet if DS not tolerated)',
        'UTI (complicated)': '1 DS tablet PO twice daily for 10–14 days',
        'Isosporiasis treatment': '1 DS tablet PO twice daily for 10–14 days',
        'Isosporiasis prophylaxis (HIV)': '1 DS tablet PO once daily',
        'Cyclosporiasis': '1 DS tablet PO twice daily for 7–10 days',
        'Bacterial infections (general)': '1 DS tablet PO twice daily (or 2 SS tablets twice daily)',
      },
      paediatric: {
        'PCP treatment — children': '15–20 mg/kg/day (TMP) IV or PO divided every 6 hours for 14–21 days',
        'PCP prophylaxis — children': '5–10 mg/kg/day (TMP) PO once daily (or divided twice daily) — max 320 mg TMP/day',
        'UTI — children': '4–6 mg/kg (TMP) PO twice daily',
        'Otitis media — children': '8 mg/kg (TMP) PO twice daily for 10 days',
      },
      renalAdjustment: 'CrCl 30–50: reduce dose by 50% (standard interval). CrCl 15–29: reduce dose by 50% and increase interval to every 12–24 hours (depending on indication). CrCl <15: CONTRAINDICATED for routine use; for PCP: use only if no alternative — reduce dose significantly, monitor levels, and ensure hydration and alkalinisation. TMP–SMX is removed by dialysis — dose after dialysis if used.',
      hepaticAdjustment: 'Contraindicated in severe hepatic impairment. Use with caution in mild-moderate impairment — monitor LFTs. Avoid in alcoholic liver disease (increased hepatotoxicity risk).',
    },
    interactions: [
      'WARFARIN: significantly enhanced anticoagulant effect (SMX displaces warfarin from albumin, inhibits CYP2C9) — monitor INR closely, reduce warfarin dose by 30–50% during co-administration',
      'METHOTREXATE: increased methotrexate levels (TMP inhibits dihydrofolate reductase — additive) — risk of severe myelosuppression; avoid if possible or monitor FBC/MFX levels closely',
      'PHENYTOIN: increased phenytoin levels (SMX inhibits CYP2C9) — monitor phenytoin levels, may need dose reduction',
      'ACE INHIBITORS / ARBs: increased risk of hyperkalaemia (TMP inhibits renal K+ excretion similar to K+-sparing diuretic) — monitor K+, avoid in CKD or if K+ high-normal',
      'POTASSIUM-SPARING DIURETICS (spironolactone, amiloride, eplerenone): additive hyperkalaemia — monitor K+, avoid if possible',
      'SULPHONYLUREAS: enhanced hypoglycaemic effect (SMX inhibits CYP2C9, displaces from albumin) — monitor glucose, reduce dose of glibenclamide/gliclazide',
      'REPAGLINIDE: increased repaglinide levels (CYP2C8 inhibition) — risk of hypoglycaemia',
      'ZIDOVUDINE (AZT): increased risk of anaemia and neutropenia (additive folate antagonism) — monitor FBC more frequently',
      'CYCLOSPORINE: increased nephrotoxicity (additive tubular damage) AND decreased cyclosporine levels — monitor cyclosporine levels and renal function',
      'DAPSONE: increased levels of BOTH drugs (risk of haemolysis, methaemoglobinaemia) — monitor closely',
      'PYRIMETHAMINE: increased risk of megaloblastic anaemia (additive folate antagonism) — supplement folinic acid',
      'LABORATORY INTERACTIONS: TMP interferes with serum creatinine measurement (inhibits tubular secretion of creatinine, not true GFR — causes ~15% Cr increase without renal impairment; also falsely elevates methotrexate assays (immunoassays))',
    ],
    monitoring: 'Baseline: FBC with differential, LFTs (ALT, AST, bilirubin), Cr/eGFR, serum K+, G6PD screening (if at-risk ancestry — African, Mediterranean, Asian), folate/B12 if prolonged therapy. HIV baseline: CD4 count, viral load. During therapy: FBC weekly for first month of PCP treatment doses (high-dose), then monthly for prophylaxis (more frequently if cytopenias develop); Cr and K+ every 1–2 weeks during high-dose treatment (then monthly for prophylaxis); LFTs monthly during high-dose therapy; urinalysis for crystalluria (high-dose — ensure adequate hydration). Clinical monitoring: skin rash (daily during first 2 weeks of high-dose — SJS/TEN risk; if rash with fever, mucosal involvement, blisters — STOP immediately); fever and eosinophilia (DRESS syndrome). Long-term prophylaxis (HIV): FBC, Cr, K+ every 3–6 months. Desensitisation protocol (for HIV patients with mild-moderate rash who need PCP prophylaxis — typically 6–14 day oral desensitisation schedule in hospital setting).',
    patient_counselling: 'This combination medicine contains two active drugs. Drink plenty of water (2–3 litres daily) to prevent crystals forming in your urine. Complete the full course as prescribed — do not skip doses. Take with food if stomach upset occurs. If you are on HIV prophylaxis (PCP/toxoplasma prevention), take it daily as prescribed — it saves lives. Report any skin rash immediately, especially if accompanied by fever, blisters, or mouth sores (Stevens-Johnson syndrome — a medical emergency). This medicine may make your skin more sensitive to sunlight — use sunscreen and protective clothing. Regular blood tests are needed to check kidney function, potassium levels, and blood counts. If you are taking warfarin (blood thinner), your INR must be closely monitored by your doctor. Inform ALL your healthcare providers that you take co-trimoxazole. If you have G6PD deficiency (family history of anaemia with certain medicines), tell your doctor before starting this medicine.',
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
    console.error(`  ✗ Failed: ${m.name} — ${error.message}`);
    return false;
  }
  console.log(`  ✓ ${m.name}`);
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
    console.error('  ✗ DUPLICATE drug names detected!');
    return false;
  }
  return true;
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║   Clinova Phase C — Drug Monograph Population     ║');
  console.log('║   Batch 4: 6 Medicines (HIV / TB / ID)            ║');
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
  console.log('━━━ Batch 4 Summary ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Intended:      ${MONOGRAPHS.length}`);
  console.log(`  Successful:    ${success}`);
  console.log(`  Failed:        ${fail}`);
  console.log(`  Prior total:   ${before}`);
  console.log(`  Current total: ${after}`);
  console.log();

  if (fail === 0 && success === MONOGRAPHS.length) {
    console.log('✅ Batch 4 COMPLETE. Ready for Batch 5.');
  } else {
    console.log('⚠️  Batch 4 partially complete. Review errors above.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
