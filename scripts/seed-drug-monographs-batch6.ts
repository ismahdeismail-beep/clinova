/**
 * seed-drug-monographs-batch6.ts
 * Phase C — Batch 6: Digoxin, Furosemide, Spironolactone, Atenolol,
 *          Methyldopa, Hydralazine (CV / Renal / Pregnancy HTN)
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
  // ── 1. Digoxin ───────────────────────────────────────────────────
  {
    name: 'Digoxin',
    generic_name: 'Digoxin',
    drug_class: 'Cardiac glycoside',
    indications: [
      'Heart failure with reduced ejection fraction (HFrEF) — added to standard therapy for symptom control, reduces hospitalisations (no mortality benefit)',
      'Atrial fibrillation — rate control (especially in HFrEF; first-line for rate control in AF with HF)',
      'Atrial flutter — rate control',
      'Supraventricular tachycardia (SVT) — acute termination (less common now — adenosine preferred)',
    ],
    contraindications: [
      'Hypersensitivity to digoxin or any cardiac glycoside',
      'Ventricular tachycardia or ventricular fibrillation (can provoke malignant arrhythmias)',
      'Hypertrophic obstructive cardiomyopathy (HOCM) — increased outflow gradient',
      'Wolff-Parkinson-White (WPW) syndrome with AF — accelerates accessory pathway conduction — risk of VF',
      'Second- or third-degree AV block (unless pacemaker-protected)',
      'Sick sinus syndrome (unless pacemaker-protected)',
      'Severe bradycardia (<50 bpm)',
      'Hypokalaemia, hypomagnesaemia, hypercalcaemia (marked ↑ digoxin toxicity risk)',
      'Renal impairment (CrCl <30 — marked accumulation risk; use low dose, monitor levels)',
      'Acute myocarditis (increased sensitivity to toxicity)',
      'Constrictive pericarditis / cardiac amyloidosis (increased sensitivity)',
    ],
    side_effects: [
      'Cardiac: arrhythmias (ANY arrhythmia except sinus tachycardia — most common toxicity manifestation; PVCs, bigeminy, atrial tachycardia with block, junctional rhythm, ventricular tachycardia, bidirectional VT, AV block, sinus bradycardia), ECG changes (ST segment "scooping"/sagging — digitalis effect — NOT toxicity)',
      'Gastrointestinal: anorexia, nausea, vomiting, diarrhoea, abdominal pain (common early signs of toxicity)',
      'CNS: visual disturbances (blurred/yellow-green vision — chromatopsia, halos, photophobia, scotomata — classic but not always present), headache, dizziness, confusion, delirium, hallucinations (elderly), fatigue, weakness',
      'Endocrine: gynaecomastia (with prolonged therapy — oestrogenic effect), hyperkalaemia (acute toxicity — inhibition of Na+/K+-ATPase causes K+ efflux from cells — poor prognostic sign)',
      'Hypersensitivity: rash, urticaria, eosinophilia (rare), thrombocytopenia (very rare)',
    ],
    dosage: {
      adult: {
        'HFrEF — loading (if rapid digitalisation needed)': '0.5–1 mg PO/IV in divided doses over 12–24 hours (e.g., 0.5 mg, then 0.25–0.5 mg 6–8 hourly)',
        'HFrEF — no loading (maintenance initiation)': '0.0625–0.125 mg PO once daily (especially in elderly, renal impairment, low BMI)',
        'HFrEF — standard maintenance': '0.125–0.25 mg PO once daily (max 0.5 mg/day; rarely exceeds 0.25 mg in modern practice)',
        'AF rate control': '0.125–0.25 mg PO once daily (titrate to ventricular rate <80 bpm at rest, <110 bpm on mild exertion)',
      },
      paediatric: {
        'Loading — neonates': '10–20 µg/kg PO; 5–10 µg/kg IV (in 3 divided doses over 12–24 hours)',
        'Loading — children 1 month–2 yrs': '15–30 µg/kg PO; 10–15 µg/kg IV',
        'Loading — children 2–10 yrs': '10–20 µg/kg PO; 7.5–12 µg/kg IV',
        'Loading — children >10 yrs': '8–12 µg/kg PO (max 1 mg)',
        'Maintenance — all ages': '5–10 µg/kg PO once daily (max 250 µg/day); adjust based on levels and renal function',
      },
      geriatric: {
        'Starting dose': '62.5 µg (0.0625 mg) PO once daily',
        'Usual max': '125 µg (0.125 mg) PO once daily',
      },
      renalAdjustment: 'CrCl 30–60: reduce dose by 25–50% (e.g., 0.125 mg every 36–48 hours or 0.0625 mg daily). CrCl 15–30: 0.0625 mg once daily or 0.125 mg every 48 hours. CrCl <15 (dialysis): 0.0625 mg every 48 hours (adjust based on levels). Digoxin is predominantly renally excreted unchanged (60–80%). Not significantly removed by dialysis (large Vd).',
      hepaticAdjustment: 'No dose adjustment required. Digoxin is minimally hepatically metabolised.',
      therapeuticRange: {
        'HF (trough)': '0.5–0.9 ng/mL (0.6–1.2 nmol/L) — lower target now standard',
        'AF (trough)': '0.8–2.0 ng/mL (1.0–2.6 nmol/L) — higher levels needed for rate control',
        'Toxicity likely': '>2.0 ng/mL (>2.6 nmol/L) — but toxicity can occur at lower levels with hypokalaemia/hypomagnesaemia/hypothyroidism',
      },
    },
    interactions: [
      'DIURETICS (loop, thiazide): hypokalaemia and hypomagnesaemia → increased digoxin toxicity — monitor K+, Mg2+; supplement if low',
      'AMIODARONE: increased digoxin levels (50–100%) — reduce digoxin dose by 50% when starting amiodarone, monitor levels',
      'VERAPAMIL: increased digoxin levels (40–80%) — reduce digoxin dose by 30–50%, monitor levels and HR',
      'QUINIDINE: increased digoxin levels (100–200%) — reduce digoxin dose by 50%, monitor levels — avoid if possible',
      'PROPAFENONE, FLECAINIDE: increased digoxin levels — reduce dose, monitor',
      'SPIRONOLACTONE: increased digoxin levels (reduced renal clearance) — also, spironolactone can falsely elevate digoxin immunoassay levels',
      'MACROLIDES (erythromycin, clarithromycin, azithromycin): increased digoxin levels (eliminates gut bacteria that metabolise digoxin in some patients (~10%) — "digoxin-reducing bacteria") — monitor levels',
      'TETRACYCLINES: increased digoxin levels (same mechanism as macrolides)',
      'PROTON PUMP INHIBITORS: increased digoxin levels (minor — altered gut pH increases absorption)',
      'ALUMINIUM/MAGNESIUM ANTACIDS: reduced digoxin absorption — separate by 2 hours',
      'KAOLIN-PECTIN, CHOLESTYRAMINE, CHOLESTIPOL: reduced digoxin absorption — separate by 2–3 hours',
      'BETA-BLOCKERS, CALCIUM CHANNEL BLOCKERS (diltiazem, verapamil): additive bradycardia and AV block — monitor HR and ECG',
      'SUXAMETHONIUM: increased risk of arrhythmias (ventricular) — caution with concurrent digoxin',
    ],
    monitoring: 'Baseline: ECG (rate, rhythm, PR interval, signs of digoxin effect), renal function (Cr, eGFR), serum electrolytes (K+, Mg2+, Ca2+), thyroid function (TSH — hyperthyroidism increases clearance, hypothyroidism decreases clearance and increases sensitivity), digoxin level if rapid loading. During therapy: digoxin trough levels at steady state (5–7 days after starting or dose change) — more frequently in renal impairment, elderly, or if interacting drugs added; ECG if symptoms of arrhythmia or dose change >0.125 mg; renal function and electrolytes (K+, Mg2+) every 3–6 months. Toxicity monitoring: signs of toxicity at each visit — anorexia, nausea, vomiting, diarrhoea, visual disturbances (yellow-green halos), confusion, palpitations, syncope. If toxicity suspected: stat digoxin level, ECG, electrolytes. Bradycardia (HR <50): consider holding dose, check level and ECG. Digoxin-Fab (Digibind): indicated for life-threatening toxicity (ventricular arrhythmias, severe bradycardia unresponsive to atropine, hyperkalaemia >5.5 mmol/L in acute toxicity, digoxin level >10 ng/mL in acute or >4 ng/mL in chronic).',
    patient_counselling: 'Take digoxin at the same time each day. Do NOT change dose or stop without consulting your doctor — sudden worsening of heart failure or AF may occur. Learn to check your pulse daily — if pulse is <50 beats per minute, hold the dose and contact your doctor. Report any of these symptoms promptly: nausea, vomiting, loss of appetite (may indicate high digoxin levels), blurred vision or seeing yellow-green halos around lights (classic sign of toxicity), palpitations or feeling faint (dangerous arrhythmia), unusual tiredness or weakness. Regular blood tests to check digoxin level, kidney function, and potassium are essential. Avoid taking digoxin with antacids or fibre supplements — separate by at least 2 hours. If you miss a dose, skip it — NEVER double the next dose. If overdose is suspected (especially in children), go to the emergency department immediately — Digibind (antidote) is available.',
  },

  // ── 2. Furosemide ────────────────────────────────────────────────
  {
    name: 'Furosemide',
    generic_name: 'Furosemide (Frusemide)',
    drug_class: 'Loop diuretic',
    indications: [
      'Acute and chronic heart failure — pulmonary oedema (IV) and peripheral oedema (oral)',
      'Hypertension — mild-to-moderate (thiazides preferred; furosemide used in CKD or resistant HTN)',
      'Chronic kidney disease — oedema and volume overload (when thiazides insufficient; higher doses required)',
      'Nephrotic syndrome — oedema management',
      'Hepatic cirrhosis with ascites — with spironolactone (caution: risk of hypokalaemia precipitating hepatic encephalopathy)',
      'Acute pulmonary oedema — IV furosemide (vasodilator effect before diuresis begins)',
      'Acute hypercalcaemia — forced diuresis (with IV normal saline) to increase calcium excretion',
      'Acute oliguric renal failure (to convert to non-oliguric — trial, limited evidence)',
    ],
    contraindications: [
      'Hypersensitivity to furosemide or any sulphonamide (sulphonamide cross-reactivity risk ~3–5%; true cross-reactivity debated but caution advised)',
      'Anuria or severe oliguria unresponsive to furosemide trial',
      'Severe hypovolaemia or dehydration',
      'Severe hypokalaemia, hyponatraemia, or hypomagnesaemia (correct before initiation)',
      'Hepatic coma (precipitated by hypokalaemia)',
      'Breastfeeding (may suppress lactation; excreted in breast milk)',
      'Digitalis toxicity (hypokalaemia exacerbates toxicity — correct K+ first)',
    ],
    side_effects: [
      'Electrolyte disturbances: hypokalaemia (most common — K+ wasting), hyponatraemia, hypomagnesaemia, hypocalcaemia, hypochloraemic metabolic alkalosis',
      'Metabolic: hyperglycaemia (decreased insulin secretion), hyperlipidaemia (transient increase in LDL/TG), hyperuricaemia (increased reabsorption — can precipitate gout), hypophosphataemia',
      'Cardiovascular: hypotension (volume depletion), orthostatic hypotension, tachycardia',
      'Renal: volume depletion/dehydration, pre-renal AKI (especially with concurrent ACEi/ARB, NSAIDs, or sepsis), interstitial nephritis (rare), increased BUN/Cr (pre-renal)',
      'Ototoxicity: tinnitus, hearing loss (dose-related — usually reversible; risk increased with: rapid IV push >4 mg/min, high cumulative doses, concurrent aminoglycosides/cisplatin/vancomycin, renal impairment)',
      'Gastrointestinal: nausea, vomiting, diarrhoea, constipation, pancreatitis (rare)',
      'Dermatological: photosensitivity, rash, pruritus, urticaria, Stevens-Johnson syndrome (rare)',
      'Haematological: thrombocytopenia, agranulocytosis, aplastic anaemia (rare)',
      'CNS: dizziness, headache, blurred vision, confusion (especially elderly — dehydration/hyponatraemia)',
    ],
    dosage: {
      adult: {
        'Acute pulmonary oedema': '40–80 mg IV slow bolus (over 1–2 minutes) — may repeat after 1–2 hours; max 200 mg in first 2 hours. Consider higher doses if CKD or chronic HF',
        'Acute heart failure (decompensated) — IV': '20–80 mg IV once or twice daily (titrate to urine output; if insufficient, double dose)',
        'Chronic heart failure — oral': '20–80 mg PO once daily (morning); may increase to twice daily if needed (max 600 mg/day in severe HF or CKD)',
        'HTN': '20–40 mg PO twice daily',
        'CKD — oedema': '80–250 mg PO once daily or twice daily (high doses required due to reduced tubular secretion; max 1.5 g/day in severe CKD, but toxicity risk high)',
        'Nephrotic syndrome': '40–120 mg PO once daily (or IV if poor absorption due to oedema)',
        'Hypercalcaemia': '80–120 mg IV every 12–24 hours (with normal saline repletion)',
      },
      paediatric: {
        'IV/IM — children': '0.5–2 mg/kg IV/IM every 6–12 hours (max 40 mg/dose; titrate up to 6 mg/kg/dose if needed)',
        'Oral — children': '0.5–2 mg/kg PO once daily to twice daily (max 6 mg/kg/day; start low, titrate)',
        'Neonates': '0.5–1 mg/kg IV/IM every 12–24 hours (prolonged half-life in neonates)',
      },
      geriatric: {
        'Starting dose (oral)': '20 mg PO once daily (morning) — increased sensitivity to hypovolaemia and electrolyte disturbances',
        'Starting dose (IV)': '20 mg IV slow bolus',
        'Maximum': 'Reduce usual max by 50% — monitor carefully',
      },
      renalAdjustment: 'CrCl <30: significantly reduced efficacy (furosemide must reach tubular lumen via tubular secretion — impaired in CKD). Higher doses required (250–500 mg IV or 500–1,000 mg PO — risk of ototoxicity). Consider metolazone (thiazide) synergy for sequential nephron blockade. Monitor ototoxicity: avoid rapid IV push (>4 mg/min).',
      hepaticAdjustment: 'Use with caution in cirrhosis — hypokalaemia can precipitate hepatic encephalopathy. Combine with spironolactone to maintain K+. Monitor NH₃ and mental status. If encephalopathy develops, discontinue and correct K+.',
    },
    interactions: [
      'ACE INHIBITORS/ARBs: additive hypotension AND increased risk of AKI (especially in volume-depleted patients) — hold furosemide for 24–48 hours before starting ACEi if possible; otherwise, start low and monitor Cr',
      'NSAIDs (ibuprofen, diclofenac, indomethacin): reduced diuretic efficacy (prostaglandin inhibition reduces renal blood flow) AND increased risk of AKI — avoid if possible',
      'DIGOXIN: increased digoxin toxicity (hypokalaemia, hypomagnesaemia) — monitor K+, Mg2+, digoxin levels',
      'AMINOGLYCOSIDES (gentamicin, amikacin): additive ototoxicity (especially with rapid IV furosemide) AND nephrotoxicity — avoid or monitor auditory and renal function',
      'CISPLATIN: additive ototoxicity and nephrotoxicity — avoid combination',
      'LITHIUM: increased lithium levels (reduced clearance — volume depletion increases proximal reabsorption) — monitor lithium levels',
      'CORTICOSTEROIDS, ACTH: additive hypokalaemia — monitor K+',
      'CARBAMAZEPINE: increased risk of hyponatraemia (additive SIADH-like effect)',
      'ANTIDIABETIC AGENTS: hyperglycaemic effect — may worsen glucose control in diabetes; monitor glucose',
      'ALLOPURINOL: increased risk of hypersensitivity reactions (rare)',
      'SUXAMETHONIUM: prolonged neuromuscular blockade (furosemide-induced K+ shifts)',
      'PROBENECID: reduced furosemide efficacy (inhibits tubular secretion) — may need higher furosemide dose',
      'PHENYTOIN: reduced diuretic efficacy — may need higher furosemide dose',
    ],
    monitoring: 'Baseline: BP (sitting/standing), pulse, weight, oedema assessment, serum K+, Na+, Mg2+, Ca2+, Cr/eGFR, glucose, uric acid, LFTs (cirrhosis). During therapy: daily weight (best objective measure of fluid status); BP (target dependent on indication); input/output chart (especially during IV therapy or acute decompensation); electrolytes (K+, Na+) every 24–48 hours during IV therapy, then 1–2 weeks after oral initiation, then every 3–6 months stable; Mg2+ at baseline and periodically — especially if prolonged high-dose therapy; Cr/eGFR every 1–2 weeks during dose titration, then every 3–6 months; glucose and uric acid annually (long-term). Ototoxicity vigilance: avoid IV push >4 mg/min; cumulative dose monitoring; avoid concurrent ototoxic drugs. In cirrhosis: monitor NH₃ and mental status — hypokalaemia can cause hepatic encephalopathy.',
    patient_counselling: 'Take in the MORNING (to avoid nocturia disrupting sleep). If a second dose is needed, take it in the early afternoon. Weigh yourself daily (same time, same scale, after voiding but before breakfast) — a weight gain of >1–2 kg in 2 days or >2–3 kg in a week may indicate fluid retention — contact your doctor. Seek medical attention if you are unable to take the medicine due to vomiting or diarrhoea. Dizziness on standing (orthostatic hypotension) is common — rise slowly from sitting/lying. Avoid NSAID painkillers (ibuprofen, diclofenac) — they reduce the effect of this medicine and can damage kidneys. You will need regular blood tests to check potassium levels and kidney function. If you feel weak, tired, or have muscle cramps, tell your doctor — these may be signs of low potassium. Eat potassium-rich foods (bananas, orange juice, potatoes, tomatoes, avocados) — unless your doctor tells you otherwise. If you have diabetes, monitor your blood sugar — furosemide can raise glucose levels. Report any hearing loss, ringing in the ears, or dizziness — especially if you have kidney disease.',
  },

  // ── 3. Spironolactone ────────────────────────────────────────────
  {
    name: 'Spironolactone',
    generic_name: 'Spironolactone',
    drug_class: 'Potassium-sparing diuretic (mineralocorticoid receptor antagonist)',
    indications: [
      'Heart failure with reduced ejection fraction (HFrEF) — reduces mortality and hospitalisations (RALES trial)',
      'Resistant hypertension (with 3 agents including a diuretic)',
      'Primary hyperaldosteronism (Conn\'s syndrome) — diagnostic and therapeutic',
      'Cirrhotic ascites — first-line (with furosemide for synergy and K+ balance)',
      'Nephrotic syndrome — adjunctive diuretic (K+-sparing effect counteracts K+ loss from loop/thiazide diuretics)',
      'Acne vulgaris (in women — off-label, anti-androgen effect)',
      'Hirsutism (in women — off-label, anti-androgen effect)',
      'Polycystic ovary syndrome (PCOS) — off-label for hyperandrogenism',
    ],
    contraindications: [
      'Hypersensitivity to spironolactone',
      'Hyperkalaemia (serum K+ >5.0 mmol/L — absolute contraindication)',
      'Severe renal impairment (eGFR <30 mL/min/1.73m² — risk of life-threatening hyperkalaemia)',
      'Addison\'s disease (adrenal insufficiency — risk of hyperkalaemia, volume depletion)',
      'Concurrent use with other K+-sparing diuretics (amiloride, triamterene, eplerenone) OR potassium supplements — severe hyperkalaemia',
      'Anuria, acute renal failure, or rapid decline in renal function',
      'Pregnancy (anti-androgenic effects — feminisation of male foetus; avoid; use eplerenone if essential)',
      'Breastfeeding (metabolite canrenone excreted in breast milk — avoid or use alternative)',
    ],
    side_effects: [
      'HYPERKALAEMIA: most serious side effect (incidence ~5–15% in HF — dose-dependent and renal-function-dependent; especially with high K+ intake, CKD, diabetes, concurrent ACEi/ARB/NSAIDs)',
      'Endocrine/anti-androgenic: gynaecomastia (10–30% of men — dose-related; often painful; may persist after stopping; most common reason for discontinuation), breast tenderness, decreased libido, erectile dysfunction, menstrual irregularities, amenorrhoea, hirsutism reduction, deepening of voice (irreversible — rare)',
      'Gastrointestinal: nausea, vomiting, diarrhoea, gastritis, peptic ulcer, abdominal cramps, anorexia',
      'CNS: headache, dizziness, drowsiness, lethargy, ataxia, confusion',
      'Renal: dehydration, hyponatraemia (dilutional — especially in cirrhosis), hyperchloraemic metabolic acidosis (mild), increased BUN',
      'Dermatological: rash, pruritus, urticaria, Stevens-Johnson syndrome (rare), alopecia, hypertrichosis',
      'Haematological: agranulocytosis (very rare), thrombocytopenia (very rare)',
      'Hepatic: hepatotoxicity (very rare — cholestatic or mixed)',
      'Carcinogenicity: (animal studies — chronic high-dose; human relevance unclear — but no increase in human cancers observed)',
    ],
    dosage: {
      adult: {
        'HFrEF — initiation': '12.5–25 mg PO once daily (start low; check K+ and Cr within 1 week)',
        'HFrEF — target (RALES)': '25 mg PO once daily (max 50 mg/day; titrate up from 25 mg to 50 mg if K+ <5.0 and Cr stable)',
        'Resistant HTN': '25–50 mg PO once daily (max 100 mg/day; start when on ≥3 other agents)',
        'Primary hyperaldosteronism (diagnostic)': '100–400 mg PO once daily for 3–4 weeks (saline infusion suppression test)',
        'Primary hyperaldosteronism (maintenance)': '50–200 mg PO once daily (lowest effective dose)',
        'Cirrhotic ascites': '100–400 mg PO once daily (with furosemide 40–160 mg/day; start ratio 100:40; target 0.5–1 kg weight loss/day if peripheral oedema, 0.5 kg/day if ascites only)',
        'Acne / hirsutism (off-label)': '50–200 mg PO once daily (can divide twice daily for GI tolerance; titrate)',
      },
      paediatric: {
        'Diuretic — children': '1–3 mg/kg/day PO divided once daily or twice daily',
        'HF — children': '1–2 mg/kg/day PO divided once daily or twice daily (max 4 mg/kg/day)',
      },
      geriatric: {
        'Starting dose': '12.5 mg PO once daily (high risk of hyperkalaemia in elderly — check K+ and Cr within 1 week, then every 2–4 weeks during titration)',
        'Max dose': '25–50 mg PO once daily (in most cases)',
      },
      renalAdjustment: 'eGFR 30–60: start 12.5 mg once daily; monitor K+ weekly; max 25 mg/day. eGFR <30: CONTRAINDIATED (risk of life-threatening hyperkalaemia). If Cr increases >30% or K+ >5.0 mmol/L during therapy, reduce dose or stop. Spironolactone and its active metabolites are not significantly renally cleared.',
      hepaticAdjustment: 'Mild-moderate cirrhosis: use cautiously. Severe cirrhosis: risk of volume depletion, hyponatraemia, and hyperkalaemia (combined with reduced albumin → reduced distribution). Start 12.5–25 mg once daily. Monitor electrolytes, NH₃, and mental status. Can precipitate hepatic encephalopathy via volume depletion.',
    },
    interactions: [
      'ACE INHIBITORS / ARBs: SIGNIFICANTLY INCREASED RISK OF HYPERKALAEMIA — most important interaction; monitor K+ and Cr very closely (within 1 week of starting, then monthly); if K+ >5.5, reduce or stop one agent; avoid if eGFR <45',
      'POTASSIUM SUPPLEMENTS: severe hyperkalaemia — CONTRAINDIATED (do not prescribe K+ supplements with spironolactone)',
      'K+-SPARING DIURETICS (amiloride, triamterene, eplerenone): severe hyperkalaemia — avoid combination',
      'NSAIDs (ibuprofen, diclofenac, indomethacin, COX-2 inhibitors): reduced diuretic efficacy AND increased hyperkalaemia risk (inhibits renal K+ excretion) AND increased nephrotoxicity — avoid if possible',
      'DIGOXIN: increased digoxin levels (reduced renal clearance) AND spironolactone can FALSELY ELEVATE digoxin immunoassay (spironolactone metabolite cross-reacts) — use LC-MS/MS or Roche digoxin assay which is less affected',
      'LITHIUM: increased lithium levels (volume depletion → increased reabsorption) — monitor lithium',
      'CHOLESTYRAMINE: reduced spironolactone absorption — separate by 2–3 hours',
      'TRIMETHOPRIM: additive hyperkalaemia (TMP is a weak K+-sparing diuretic) — monitor K+',
      'ANTIHYPERTENSIVES: additive hypotensive effect — monitor BP',
      'BARBITURATES, OPIOIDS: orthostatic hypotension — caution',
      'WARFARIN: reduced anticoagulant effect (reported — spironolactone may reduce Factor II/IX/X activity) — monitor INR',
    ],
    monitoring: 'Baseline: K+ (must be <5.0), Cr/eGFR, BP (supine and standing), weight, ECG (if HF — baseline QTc). Within 1 week of initiation: K+ and Cr. During titration (first 3 months): K+ and Cr every 1–2 weeks. Stable: K+ and Cr every 3–6 months. Additional: BP at each visit; gynaecomastia monitoring (ask about breast tenderness/enlargement in men); weight monitoring (daily in HF patients). If K+ rises to 5.0–5.5: reduce spironolactone dose or adjust diet. If K+ >5.5: HOLD spironolactone and reassess (check Cr, review diet, other K+-sparing drugs, ACEi/ARB dose). If K+ >6.0: medical emergency — hold diuretic, give calcium gluconate + insulin/glucose + salbutamol + consider polystyrene sulfonate or dialysis.',
    patient_counselling: 'This medicine spares potassium — so you should NOT take potassium supplements or potassium-containing salt substitutes. Avoid high-potassium foods in large amounts (bananas, oranges, avocado, spinach, potatoes with skin, dried fruit, coconut water) unless your doctor advises otherwise. Regular blood tests to check potassium and kidney function are ESSENTIAL — especially in the first few weeks. If you experience breast swelling or tenderness (men), painful or enlarged breasts — this is common with spironolactone and may be reversible. Tell your doctor if this bothers you — the dose can be adjusted or an alternative (eplerenone) considered. Dizziness on standing is common — rise slowly. Seek help immediately if: severe muscle weakness, irregular heartbeat, numbness/tingling (signs of high potassium), if you become ill with vomiting/diarrhoea and cannot drink fluids. Take in the morning to avoid nighttime urination.',
  },

  // ── 4. Atenolol ──────────────────────────────────────────────────
  {
    name: 'Atenolol',
    generic_name: 'Atenolol',
    drug_class: 'Beta-1 selective adrenergic receptor blocker (cardioselective beta-blocker)',
    indications: [
      'Hypertension (first-line in younger patients, post-MI, angina, HFrEF (only bisoprolol/carvedilol/metoprolol succinate have HF evidence — atenolol NOT preferred in HF))',
      'Angina pectoris (stable chronic angina — reduces myocardial O₂ demand, increases exercise tolerance)',
      'Post-myocardial infarction (reduces mortality — atenolol has evidence from ISIS-1)',
      'Supraventricular tachyarrhythmias (SVT, AF rate control, atrial flutter)',
      'Migraine prophylaxis (off-label — first-line with propranolol)',
      'Essential tremor (off-label — propranolol preferred)',
      'Thyrotoxicosis / thyroid storm (symptom control — tachycardia, palpitations, anxiety)',
      'Hypertensive urgency (PO atenolol for gradual BP reduction)',
    ],
    contraindications: [
      'Hypersensitivity to atenolol or any beta-blocker',
      'Cardiogenic shock',
      'Second- or third-degree AV block (without pacemaker)',
      'Severe bradycardia (<50 bpm; or symptomatic bradycardia)',
      'Sick sinus syndrome (without pacemaker)',
      'Uncompensated heart failure (acute pulmonary oedema, hypotension) — atenolol not recommended in HF; use bisoprolol/carvedilol/metoprolol succinate',
      'Severe asthma or COPD with bronchospasm (cardioselectivity is dose-dependent and not absolute — risk of bronchospasm. Use if necessary with caution, start low)',
      'Severe peripheral arterial disease (can worsen claudication — use with caution)',
      'Phaeochromocytoma (must use with alpha-blocker — unopposed alpha constriction)',
      'Prinzmetal (vasospastic) angina (beta-blockers can worsen spasm — use nifedipine/diltiazem)',
      'Metabolic acidosis',
    ],
    side_effects: [
      'Cardiovascular: bradycardia (most common dose-limiting effect), hypotension, cold extremities (Raynaud\'s-like — peripheral vasoconstriction from unopposed alpha), heart failure precipitation (in decompensated patients), first-degree AV block, worsening of intermittent claudication',
      'CNS: fatigue (common), lethargy, dizziness, headache, sleep disturbances (insomnia, vivid dreams, nightmares — less than propranolol but can occur), depression (controversial), confusion (elderly)',
      'Respiratory: bronchospasm (dose-dependent — especially in asthmatics/COPD; cardioselectivity lost at higher doses), dyspnoea',
      'Metabolic/Endocrine: hypoglycaemia masking (tachycardia, tremor, palpitations — warning signs masked; sweating, hunger still present), hyperglycaemia (minor — reduces insulin sensitivity), increased triglycerides, decreased HDL, hyperuricaemia (mild)',
      'Gastrointestinal: nausea, vomiting, diarrhoea, constipation, abdominal cramps',
      'Dermatological: rash, psoriasiform eruptions, alopecia (rare), urticaria',
      'Haematological: thrombocytopenia (very rare), purpura',
      'Sexual dysfunction: impotence/erectile dysfunction (reported but uncertain causal relationship — ~1–5%), decreased libido',
      'Other: dry eyes (reduced tear production — especially with prolonged use), reduced exercise tolerance, sodium/water retention (early — especially in diabetics)',
      'Rebound phenomenon: abrupt withdrawal after chronic therapy causes REBOUND HYPERTENSION, tachycardia, angina worsening, MI risk — taper over 2–4 weeks',
    ],
    dosage: {
      adult: {
        'HTN — initiation': '25–50 mg PO once daily',
        'HTN — maintenance': '50–100 mg PO once daily (max 100 mg/day; no additional benefit above 100 mg)',
        'Angina': '50–100 mg PO once daily (max 100 mg/day)',
        'Post-MI': '50–100 mg PO once daily (start 25 mg once daily, titrate over 1–2 weeks if tolerated)',
        'SVT / AF rate control': '25–100 mg PO once daily (titrate to target HR <80 bpm at rest)',
        'Thyrotoxicosis (adjunctive)': '25–50 mg PO once daily (titrate to symptom control; usually 25–50 mg)',
        'Migraine prophylaxis': '50–100 mg PO once daily',
      },
      paediatric: {
        'HTN — children': '0.5–1 mg/kg PO once daily (max 50 mg/day initially; titrate to max 2 mg/kg/day or 100 mg/day)',
        'Arrhythmias — children': '0.5–1 mg/kg PO once daily; max 2 mg/kg/day',
      },
      geriatric: {
        'Starting dose': '25 mg PO once daily (elderly more sensitive to bradycardia and hypotension)',
        'Max dose': '50 mg once daily (often sufficient)',
      },
      renalAdjustment: 'CrCl 30–60: max 50 mg once daily (extend interval to every 36–48 hours if on higher dose). CrCl 15–30: max 25 mg once daily (or 50 mg every 48 hours). CrCl <15 (dialysis): max 25 mg once daily (or 50 mg every 48 hours — atenolol is removed by haemodialysis, give dose after dialysis). Atenolol is predominantly renally excreted unchanged (>85%).',
      hepaticAdjustment: 'No dose adjustment required. Atenolol is minimally hepatically metabolised (<10%). Prefer atenolol in hepatic impairment over propranolol/metoprolol.',
    },
    interactions: [
      'VERAPAMIL, DILTIAZEM: additive bradycardia, AV block, and negative inotropy — CAN BE DANGEROUS; avoid IV verapamil and beta-blocker combination; oral combination possible with caution (monitor HR and ECG)',
      'DIGOXIN: additive bradycardia and AV block — monitor HR, ECG',
      'AMIODARONE, DRONEDARONE: additive bradycardia and AV block — caution',
      'CLONIDINE: severe bradycardia and rebound hypertension upon clonidine withdrawal (beta-blocker exacerbates alpha-mediated vasoconstriction) — stop beta-blocker SEVERAL DAYS before clonidine withdrawal',
      'NSAIDs (ibuprofen, diclofenac, indomethacin): reduced antihypertensive efficacy (inhibits prostaglandin-mediated vasodilatation) — monitor BP',
      'ANTIDIABETIC AGENTS (insulin, sulphonylureas): beta-blockade MASKS hypoglycaemic symptoms (tachycardia, tremor, palpitations — but sweating, hunger, and confusion still occur) — educate patient to recognise other hypo symptoms',
      'CALCIUM CHANNEL BLOCKERS (nifedipine, amlodipine — dihydropyridines): increased risk of hypotension and heart failure (negative inotropy) — monitor BP, HR',
      'MAO INHIBITORS: enhanced hypotensive effect — avoid concomitant use',
      'SYMPATHOMIMETICS (adrenaline, noradrenaline, salbutamol): beta-blockade may cause unopposed alpha-agonism → severe hypertension and bradycardia — caution with adrenaline-containing local anaesthetics; may reduce bronchodilator response to beta-agonists',
      'CLASS I ANTIARRHYTHMICS (flecainide, propafenone, disopyramide): additive negative inotropy — caution',
      'FINGOLIMOD: additive bradycardia (especially during initiation) — monitor HR during first dose',
    ],
    monitoring: 'Baseline: HR, BP (sitting + standing), ECG (PR interval, HR), serum electrolytes, Cr/eGFR, blood glucose (in diabetics). During therapy: HR and BP at each visit (target HR 55–65 bpm at rest for angina/HTN, but not <50 bpm); ECG annually (or if symptoms of bradycardia/block); renal function (especially if CrCl <60); glucose in diabetics; respiratory status (wheezing, dyspnoea) — discontinue if bronchospasm occurs. Abrupt withdrawal: must NEVER occur — taper by 25 mg every 1–2 weeks over 4–6 weeks. Monitor for overshoot hypertension, tachycardia, angina worsening, MI. Before surgery: continue atenolol (perioperative beta-blockade reduces cardiac risk in patients already on beta-blockers — do NOT stop before surgery).',
    patient_counselling: 'Take at the same time each day, usually in the morning. Do NOT stop this medicine suddenly — stopping suddenly can cause dangerous rebound hypertension, chest pain, or heart attack; the dose must be reduced gradually over 2–4 weeks. Check your pulse daily before taking — if <50 bpm, skip the dose and consult your doctor. This medicine may cause tiredness, cold hands/feet, and dizziness on standing — these usually improve over time. Rise slowly from sitting or lying. If you have diabetes, this medicine can hide the warning signs of low blood sugar (rapid heartbeat, trembling) — sweat hunger and confusion are still present; monitor blood glucose regularly. Avoid taking with NSAIDs (ibuprofen, diclofenac) — they reduce the blood-pressure-lowering effect. Report any of these: slow heart rate with dizziness/fainting, shortness of breath or wheezing, worsening of cold/blue hands/feet, depression or vivid nightmares. If you are having surgery, tell your anaesthetist that you take atenolol.',
  },

  // ── 5. Methyldopa ─────────────────────────────────────────────────
  {
    name: 'Methyldopa',
    generic_name: 'Methyldopa',
    drug_class: 'Centrally acting alpha-2 adrenergic agonist',
    indications: [
      'Hypertension in pregnancy — FIRST-LINE (safest antihypertensive in pregnancy; decades of safety data — no teratogenicity)',
      'Chronic hypertension — not first-line; reserved for patients who respond well (many better-tolerated alternatives exist)',
      'Hypertensive urgency (oral) — not for emergency (onset 4–6 hours)',
    ],
    contraindications: [
      'Hypersensitivity to methyldopa',
      'Active hepatic disease (acute hepatitis, cirrhosis, active liver disease)',
      'Prior methyldopa-induced liver disease (hepatitis, jaundice, elevated LFTs)',
      'On MAO inhibitors (within 14 days)',
      'Phaeochromocytoma (methyldopa may cause false-positive urinary catecholamines AND may stimulate tumour)',
      'Depression (severe, active — may worsen)',
      'Use in children <12 yrs (limited evidence, except for neonatal hypertension)',
    ],
    side_effects: [
      'CNS: sedation/drowsiness (most common — 20–40%; often transient, resolves in 1–2 weeks), dizziness, headache, weakness, fatigue, depression (1–5%), impaired concentration, nightmares, Parkinsonism (rare), Bell\'s palsy (rare)',
      'Cardiovascular: orthostatic hypotension (dose-related), bradycardia, peripheral oedema (sodium/water retention — may require diuretic), myocarditis (rare — granulomatous or hypersensitivity)',
      'Gastrointestinal: dry mouth, nausea, vomiting, diarrhoea, constipation, pancreatitis (rare), sialadenitis (salivary gland inflammation)',
      'Hepatic: elevated transaminases (common, usually reversible), hepatitis (hypersensitivity-mediated — fever, jaundice, eosinophilia — 0.3%; usually within first 12 weeks; may progress to fulminant hepatic failure if not stopped), cholestasis',
      'Haematological: positive direct Coombs test (10–20% — dose-related and duration-related; usually appears at 6–12 months; haemolytic anaemia in <5% of Coombs-positive patients — if develops, STOP methyldopa; haemolysis resolves over weeks to months), leukopenia, thrombocytopenia (rare), haemolytic anaemia, eosinophilia',
      'Endocrine: hyperprolactinaemia (galactorrhoea, gynaecomastia, amenorrhoea), weight gain',
      'Immunological: drug-induced lupus (positive ANA, arthralgia, myalgia, rash — rare; resolves on stopping), fever (hypersensitivity — within first 3 weeks)',
      'Dermatological: rash (morbilliform, lichenoid), urticaria',
    ],
    dosage: {
      adult: {
        'HTN (non-pregnant) — initiation': '250 mg PO twice daily (increase every 2–3 days as needed; usual 500 mg–2 g/day in 2–4 divided doses; max 3 g/day)',
        'HTN in pregnancy — initiation': '250 mg PO twice to three times daily (max 2 g/day)',
        'HTN in pregnancy — maintenance': '250–750 mg PO three times daily (guided by BP; doses >2 g/day rarely needed)',
      },
      paediatric: {
        'HTN — children': '5–10 mg/kg/day PO divided 2–3 times daily (increase every 2–3 days as needed; max 65 mg/kg/day or 3 g/day)',
      },
      geriatric: {
        'Starting dose': '125 mg PO twice daily (elderly more sensitive: increased sedation, orthostatic hypotension, depression)',
        'Max dose': '1–1.5 g/day in divided doses (reduced renal clearance → accumulation)',
      },
      renalAdjustment: 'CrCl 30–60: increase dosing interval (every 12–24 hours). CrCl 15–30: every 24–48 hours. CrCl <15 (dialysis): every 48–72 hours (or use alternative). Methyldopa is renally excreted (>50% unchanged). Accumulation in CKD leads to prolonged sedation. Methyldopa is removed by dialysis (give dose after haemodialysis). Avoid in patients on dialysis if possible.',
      hepaticAdjustment: 'CONTRANDICATED in active hepatic disease (hepatitis, cirrhosis, prior methyldopa-induced liver disease). Use only with extreme caution and close LFT monitoring in mild impairment.',
    },
    interactions: [
      'MAO INHIBITORS (phenelzine, tranylcypromine, isocarboxazid): CONTRAINDIATED (hypertensive crisis, CNS excitation, hallucinations) within 14 days',
      'LITHIUM: increased lithium toxicity (reduced renal clearance) — monitor lithium levels',
      'LEVODOPA: reduced anti-Parkinsonian effect (methyldopa is a DOPA decarboxylase inhibitor) OR enhanced hypotension — monitor',
      'HALOPERIDOL: additive CNS depression and hypotension — monitor',
      'SYMPATHOMIMETICS (ephedrine, pseudoephedrine, phenylephrine): reduced antihypertensive efficacy AND paradoxical hypertension — avoid OTC decongestants',
      'ANTIDEPRESSANTS (TCAs, SSRIs): reduced antihypertensive effect — monitor BP',
      'ANAESTHETICS: enhanced hypotensive effect during general anaesthesia — inform anaesthetist',
      'IRON SUPPLEMENTS (ferrous sulphate): reduced methyldopa absorption (chelation) — separate by 2 hours',
      'BETA-BLOCKERS: additive bradycardia — monitor HR',
      'LABORATORY INTERACTIONS: methyldopa causes FALSE ELEVATION of urinary catecholamines (HPLC methods — interferes with fluorescence); FALSE positive direct Coombs test; may interfere with creatinine measurement (alkaline picrate method)',
    ],
    monitoring: 'Baseline: BP (sitting + standing + lying), Cr/eGFR, LFTs (ALT, AST, bilirubin), FBC with differential, direct Coombs test. During therapy: LFTs every 2–4 weeks for first 6 months (hepatitis risk highest in first 3 months) — if fever, jaundice, or elevated LFTs develop, STOP methyldopa immediately; FBC and Coombs test every 3–6 months (Coombs positivity: 10–20% at 6–12 months — if haemolytic anaemia, stop methyldopa); BP at each visit; weight monitoring (fluid retention). In pregnancy: BP, UTI screening, urine protein, foetal growth monitoring, LFTs monthly. Clinical monitoring: sedation (expect in first 1–2 weeks — warn patient), depression screening, orthostatic BP. If direct Coombs becomes positive without haemolysis: continue methyldopa but monitor for haemolysis (falling Hb, reticulocytosis, elevated LDH, bilirubin, low haptoglobin).',
    patient_counselling: 'This medicine is the safest and most established antihypertensive in pregnancy — it has been used safely for over 50 years without evidence of harm to the baby. Drowsiness is common (20–40%) in the first 1–2 weeks and usually improves — if it persists, tell your doctor. Do not drive or operate machinery until you know how this medicine affects you. Dizziness on standing (orthostatic hypotension) is common — rise slowly from sitting or lying down. You will need regular blood tests to check liver function and blood count every few months. Report: yellowing of skin/eyes (jaundice), dark urine, pale stools, unusual tiredness, unexplained fever, sore throat, or persistent drowsiness. If you take iron tablets (ferrous sulphate), take methyldopa 2 hours apart from iron. Store in a dry place away from light. Do not stop suddenly — gradual withdrawal is needed to avoid rebound hypertension.',
  },

  // ── 6. Hydralazine ────────────────────────────────────────────────
  {
    name: 'Hydralazine',
    generic_name: 'Hydralazine Hydrochloride',
    drug_class: 'Direct-acting vasodilator (arteriolar dilator)',
    indications: [
      'Hypertension — moderate-severe (especially in CKD, resistant HTN, and pregnancy)',
      'Hypertensive urgency — oral (not emergency — onset 45–60 min)',
      'Hypertensive emergency — IV (reduces BP without causing reflex tachycardia as monotherapy — always combine with beta-blocker)',
      'Heart failure with reduced ejection fraction (HFrEF) — in African American patients (A-HeFT trial: hydralazine + isosorbide dinitrate reduces mortality in self-identified Black patients with HFrEF NYHA III–IV already on ACEi/BB)',
      'Pregnancy-induced hypertension (preeclampsia) — severe HTN not controlled by methyldopa/nifedipine/labetalol',
      'Hypertension in pregnancy — alternative to methyldopa',
    ],
    contraindications: [
      'Hypersensitivity to hydralazine',
      'Mitral valve rheumatic heart disease (may increase pulmonary artery pressure)',
      'High-output heart failure (e.g., thyrotoxicosis, Paget\'s disease, AV fistula — not indicated)',
      'Cor pulmonale (right HF due to lung disease — may worsen pulmonary HTN)',
      'Dissecting aortic aneurysm (increased shear stress on aortic wall)',
      'Systemic lupus erythematosus (SLE) — active (hydralazine can induce drug-induced lupus — positive ANA, symptoms)',
      'Severe tachycardia or high-output states (unopposed reflex tachycardia causes angina/MI)',
      'Myocardial infarction (acute — increases O₂ demand)',
      'Coronary artery disease (relative — use with beta-blocker to prevent reflex tachycardia)',
    ],
    side_effects: [
      'Cardiovascular: reflex tachycardia (dose-related — most common; can precipitate angina, MI, arrhythmias — always use with beta-blocker), palpitations, flushing, hypotension, peripheral oedema, angina pectoris, myocardial ischaemia (without beta-blocker cover), sodium and water retention (requires concurrent diuretic)',
      'CNS: headache (common — throbbing, due to vasodilatation), dizziness, anxiety, tremors, peripheral neuritis (rare — respond to pyridoxine), psychosis (rare)',
      'Gastrointestinal: nausea, vomiting, diarrhoea, anorexia, ileus (rare)',
      'Dermatological: rash (morbilliform, maculopapular), pruritus, urticaria',
      'Nasal congestion, lacrimation, conjunctivitis',
      'Hepatic: granulomatous hepatitis (rare — fever, hepatomegaly, elevated LFTs — reversible on stopping), cholestasis',
      'Haematological: neutropenia, leukopenia, agranulocytosis (rare), thrombocytopenia (rare), eosinophilia',
      'LABORATORY: positive ANA (30–50% with high-dose prolonged therapy — most asymptomatic; 10–15% of ANA-positive develop drug-induced lupus syndrome)',
      'DRUG-INDUCED LUPUS: arthralgia, myalgia, fever, malaise, rash (malar, discoid), serositis (pleurisy, pericarditis), positive ANA, anti-histone antibodies (classic for drug-induced lupus) — dose-related and duration-related: rare <100 mg/day, 5–10% at 100–200 mg/day for >1 year — slow acetylators at higher risk; typically resolves within weeks to months of stopping hydralazine; can persist up to 5 years in some',
    ],
    dosage: {
      adult: {
        'HTN — initiation': '25 mg PO twice daily (with beta-blocker and diuretic to prevent reflex tachycardia and fluid retention)',
        'HTN — titration': 'Increase by 25 mg/dose every 2–5 days as tolerated (usual maintenance: 50–100 mg twice daily; max 200 mg/day in 2–3 divided doses — higher doses increase lupus risk substantially)',
        'Hypertensive urgency': '10–25 mg PO (may repeat after 30–60 minutes; monitor BP)',
        'Hypertensive emergency — IV': '5–10 mg IV slow bolus over 2–5 minutes; may repeat after 20–30 minutes (max 40 mg) or start IV infusion: 0.5–10 mg/hour',
        'HFrEF (A-HeFT protocol)': 'Start with hydralazine 25–50 mg PO three times daily + isosorbide dinitrate 20–30 mg PO three times daily; titrate to target: hydralazine 75 mg + ISDN 40 mg three times daily (max: hydralazine 100 mg three times daily + ISDN 40 mg three times daily)',
        'Pregnancy HTN': '25–50 mg PO twice daily to three times daily (max 200 mg/day); IV for severe preeclampsia: 5–10 mg IV bolus every 20–30 minutes',
      },
      paediatric: {
        'HTN — children': '0.75–1 mg/kg/day PO divided 3–4 times daily; increase over 3–4 weeks (max 5 mg/kg/day or 200 mg/day)',
        'Hypertensive emergency — children': '0.1–0.2 mg/kg IV bolus (max 10 mg) every 4–6 hours as needed',
      },
      geriatric: {
        'Starting dose': '10–25 mg PO twice daily (elderly more sensitive to hypotension; reflex tachycardia risk increased)',
        'Max dose': '50 mg twice daily (try to keep below 100 mg/day to minimise lupus risk)',
      },
      renalAdjustment: 'CrCl 30–60: extend interval to every 12–24 hours. CrCl 15–30: every 24–48 hours. CrCl <15 (dialysis): every 24–48 hours. Hydralazine is renally excreted after hepatic acetylation. Slow acetylators eliminate hydralazine more slowly and are at HIGHER risk of drug-induced lupus. Dialysis removes hydralazine — give dose after dialysis if on maintenance.',
      hepaticAdjustment: 'Reduce dose in moderate-severe impairment (reduced first-pass metabolism → increased bioavailability). Contraindicated in active hepatitis or cirrhosis (granulomatous hepatitis risk). Hydralazine is extensively metabolised by N-acetyltransferase (NAT2) in the liver.',
      acetylatorStatus: 'SLOW ACETYLATORS (50% of Europeans, 30–40% of Africans, 10–20% of Asians) have higher hydralazine levels and higher lupus risk — use lower doses (max 100–150 mg/day) and monitor ANA every 6–12 months. FAST ACETYLATORS tolerate higher doses (up to 200 mg/day) with lower lupus risk.',
    },
    interactions: [
      'BETA-BLOCKERS (atenolol, bisoprolol, carvedilol, metoprolol): ESSENTIAL CO-THERAPY — hydralazine-induced reflex tachycardia is blunted by beta-blockers; without beta-blocker, risk of angina/MI; do not use hydralazine without beta-blocker cover in patients with CAD',
      'DIURETICS: essential co-therapy — hydralazine causes sodium and water retention; combine with thiazide or loop diuretic to prevent volume overload and pseudo-tolerance',
      'ANTIHYPERTENSIVES (all classes): additive hypotensive effect — monitor BP, may need dose reduction of other agents',
      'MAO INHIBITORS: enhanced hypotensive effect — caution',
      'ALCOHOL: enhanced hypotensive effect — avoid excessive intake',
      'NSAIDs (ibuprofen, diclofenac, indomethacin): reduced antihypertensive efficacy (sodium retention, prostaglandin inhibition) — avoid if possible',
      'CORTICOSTEROIDS: reduced antihypertensive efficacy (sodium retention) — monitor BP',
      'OESTROGENS / ORAL CONTRACEPTIVES: reduced antihypertensive efficacy (sodium retention) — monitor BP',
      'ADRENALINE, NORADRENALINE: reduced pressor response (hydralazine attenuates vasoconstrictor effect of catecholamines)',
      'DIAZOXIDE: additive hypotensive effect — may cause severe hypotension',
      'ANAESTHETICS (general): enhanced hypotensive effect — inform anaesthetist',
    ],
    monitoring: 'Baseline: BP (sitting + standing), HR, ECG, Cr/eGFR, LFTs, FBC, ANA (if prolonged therapy planned), pregnancy test (women of childbearing potential). During therapy: BP and HR at each visit (target BP with beta-blocker cover; HR should be <80–85 bpm at rest); ANA every 6–12 months if on maintenance therapy (rising ANA titres may precede lupus symptoms); LFTs monthly for first 3 months (hepatitis risk), then 3–6 monthly; FBC if symptoms (unusual bruising/bleeding, fever). Monitor for lupus symptoms: arthralgia (small joints of hands/wrists/ankles — symmetrical), myalgia, fever, malaise, rash (malar/discoid), pleuritic chest pain — STOP hydralazine if suspected; symptoms should resolve within weeks with supportive care (NSAIDs, corticosteroids if severe). Reflex tachycardia: if resting HR >85–90 bpm, increase beta-blocker dose or add/start beta-blocker. Fluid retention: assess for peripheral oedema, weight gain, pulmonary crackles — increase diuretic or restart if not on one.',
    patient_counselling: 'This medicine works by relaxing and widening your blood vessels. It is almost always prescribed with two other medicines: a beta-blocker (to prevent rapid heartbeat) and a diuretic (to prevent fluid retention). Take all three as prescribed — do not take hydralazine alone. Dizziness and headache are common when starting — they usually improve within a week. Rise slowly from sitting or lying to prevent falls. Seek immediate medical attention if: rapid or pounding heartbeat (tachycardia), chest pain or pressure, shortness of breath, swelling of the legs/ankles (fluid retention). Regular blood tests are required — this medicine can rarely cause a lupus-like syndrome (joint pain, fever, rash, muscle aches) that resolves when the medicine is stopped. Report any new joint pain, skin rash, or persistent fever. Do NOT stop suddenly — gradually reduce the dose under medical supervision to avoid rebound hypertension. If you are pregnant or planning pregnancy, this medicine is used safely to control high blood pressure in pregnancy.',
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
  console.log('║   Batch 6: 6 Medicines (CV / Renal)               ║');
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
  console.log('━━━ Batch 6 Summary ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Intended:      ${MONOGRAPHS.length}`);
  console.log(`  Successful:    ${success}`);
  console.log(`  Failed:        ${fail}`);
  console.log(`  Prior total:   ${before}`);
  console.log(`  Current total: ${after}`);
  console.log();

  if (fail === 0 && success === MONOGRAPHS.length) {
    console.log('✅ Batch 6 COMPLETE. Proceed to Batch 7.');
  } else {
    console.log('⚠️  Batch 6 partially complete. Review errors above.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
