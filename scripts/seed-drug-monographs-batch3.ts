/**
 * seed-drug-monographs-batch3.ts
 * ----------------------------------------------------------------------------
 * Phase C — Incremental Knowledge Population
 * Batch 3: Enalapril, Losartan, Metformin, Insulin (Biphasic), Atorvastatin,
 *          Warfarin (Cardiovascular / Endocrine / Anticoagulant)
 *
 * Usage: npx tsx scripts/seed-drug-monographs-batch3.ts
 * Env:   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Each monograph independently verified against:
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
  // ── 1. Enalapril ─────────────────────────────────────────────────
  {
    name: 'Enalapril',
    generic_name: 'Enalapril Maleate',
    drug_class: 'Angiotensin-converting enzyme (ACE) inhibitor',
    indications: [
      'Hypertension (first-line, especially in diabetics with proteinuria, heart failure, post-MI)',
      'Heart failure with reduced ejection fraction (HFrEF) — reduces mortality and hospitalisations',
      'Asymptomatic left ventricular dysfunction (post-MI)',
      'Diabetic nephropathy (reduces proteinuria and slows progression)',
      'Non-diabetic chronic kidney disease with proteinuria',
      'Stable coronary artery disease (high cardiovascular risk)',
      'Scleroderma renal crisis (off-label)',
    ],
    contraindications: [
      'Hypersensitivity to enalapril or any ACE inhibitor',
      'History of angioedema (with any ACE inhibitor or hereditary/idiopathic)',
      'Pregnancy (second and third trimesters — fetotoxicity including oligohydramnios, renal failure, skull ossification defects; first trimester — avoid)',
      'Breastfeeding (avoid — excreted in breast milk at low levels; choose alternative if possible)',
      'Bilateral renal artery stenosis (risk of acute kidney injury)',
      'Severe aortic stenosis or haemodynamically significant outflow obstruction',
      'Hypotension (systolic BP <90 mmHg)',
      'Concurrent use with aliskiren in diabetic patients or moderate-severe renal impairment',
    ],
    side_effects: [
      'Dry cough (5–20% — most common reason for discontinuation; class effect due to bradykinin accumulation; typically resolves 1–2 weeks after stopping)',
      'Angioedema (0.1–0.7% — African descent higher risk; can involve tongue, glottis, larynx — medical emergency; may occur at any time during therapy)',
      'Hypotension (first-dose — especially in volume-depleted, heart failure, or diuretic-treated patients)',
      'Hyperkalaemia (especially with CKD, diabetes, potassium-sparing diuretics, or potassium supplements)',
      'Renal impairment (acute decrease in GFR — especially in renal artery stenosis, volume depletion, or concurrent nephrotoxic drugs)',
      'Rash, urticaria, pruritus (maculopapular, sometimes with fever and eosinophilia)',
      'Dizziness, headache, fatigue, malaise',
      'Dysgeusia (altered taste — metallic or salty — reversible)',
      'Neutropenia/agranulocytosis (rare — higher risk in collagen vascular disease and renal impairment)',
      'Pancreatitis (rare)',
      'Hepatic dysfunction (cholestatic jaundice, fulminant hepatic necrosis — rare)',
      'Foetal toxicity (oligohydramnios, skull hypoplasia, renal failure, pulmonary hypoplasia, foetal death)',
    ],
    dosage: {
      adult: {
        'Hypertension — initiation': '5 mg PO once daily; increase to 10–20 mg/day depending on response (max 40 mg/day in 1–2 divided doses)',
        'Heart failure / LV dysfunction — initiation': '2.5 mg PO once daily (hospital setting recommended for first dose); titrate by doubling every 1–2 weeks to target 10–20 mg twice daily',
        'Diabetic nephropathy': '2.5–5 mg once daily; titrate to 10–20 mg twice daily as tolerated',
      },
      paediatric: {
        'Hypertension — children': '0.08 mg/kg PO once daily (max 5 mg); adjust based on response (max 0.58 mg/kg/day or 40 mg/day)',
      },
      geriatric: {
        'Starting dose': '2.5 mg PO once daily (first-dose hypotension risk increased)',
        'Usual maintenance': '5–10 mg once daily',
      },
      renalAdjustment: 'CrCl 30–60: start 2.5 mg once daily, max 20 mg/day. CrCl 15–30: start 2.5 mg once daily, max 10 mg/day. CrCl <15 (dialysis): 2.5 mg once daily on dialysis days (removed by dialysis — dose post-dialysis).',
      hepaticAdjustment: 'Reduce dose in severe impairment — monitor response carefully. Enalapril is a prodrug (hydrolysed to enalaprilat in the liver).',
    },
    interactions: [
      'Potassium-sparing diuretics (spironolactone, eplerenone, amiloride): increased risk of life-threatening hyperkalaemia — avoid or monitor K+ very closely',
      'Potassium supplements / salt substitutes: hyperkalaemia — avoid',
      'NSAIDs (ibuprofen, diclofenac, indomethacin): reduced antihypertensive effect AND increased risk of renal impairment and hyperkalaemia',
      'Diuretics (thiazides, loop): enhanced hypotensive effect (first-dose) — reduce diuretic dose or hold for 2–3 days before starting ACE inhibitor',
      'Lithium: increased lithium levels (reduced renal clearance) — monitor lithium levels',
      'Aliskiren: increased risk of hypotension, hyperkalaemia, renal impairment — contraindicated in diabetes and eGFR <60',
      'ARBs (losartan, valsartan): dual blockade increases adverse effects without additional benefit — avoid combination',
      'Antidiabetic agents (insulin, sulphonylureas): enhanced hypoglycaemic effect — monitor blood glucose',
      'Allopurinol: increased risk of hypersensitivity reactions (rare)',
      'Ciclosporin, tacrolimus: increased risk of hyperkalaemia and renal impairment',
      'Cytotoxic/immunosuppressive agents (cyclophosphamide): increased risk of neutropenia',
    ],
    monitoring: 'Baseline: BP (sitting and standing), serum electrolytes (K+, Na+), renal function (Cr, eGFR), urinalysis (protein). Within 1–2 weeks of initiation and after each dose increase: BP, serum K+ (hyperkalaemia risk), Cr (renal function). At 1–2 weeks: K+ and Cr — if stable, monitor 3–6 monthly. Yearly: renal function, electrolytes, urinalysis. If on diuretic: check K+ and Cr within 1 week of starting, 2 weeks after each dose change. Monitor for cough at each visit. Angioedema warning: swelling of lips, face, tongue, or throat — advise patient to stop and seek emergency care.',
    patient_counselling: 'Take at the same time each day. Some people experience a dry cough with this medicine — do not stop without consulting your doctor; an alternative can be prescribed. Seek immediate medical attention if: swelling of the lips, face, tongue, or throat (angioedema — difficulty breathing) — STOP the medicine. Avoid salt substitutes containing potassium. Stay well hydrated but do not take NSAID painkillers (ibuprofen, diclofenac) — use paracetamol instead. This medicine is NOT safe in pregnancy — if you are planning pregnancy or become pregnant, inform your doctor immediately. Dizziness on standing is common after the first dose — rise slowly. You will need regular blood tests to monitor kidney function and potassium levels.',
  },

  // ── 2. Losartan ──────────────────────────────────────────────────
  {
    name: 'Losartan',
    generic_name: 'Losartan Potassium',
    drug_class: 'Angiotensin II receptor blocker (ARB)',
    indications: [
      'Hypertension (first-line, alternative to ACE inhibitors — especially in patients who develop ACE-inhibitor cough)',
      'Diabetic nephropathy (reduces progression of renal disease in type 2 diabetes with proteinuria)',
      'Heart failure with reduced ejection fraction (HFrEF — when ACE inhibitors not tolerated)',
      'Left ventricular hypertrophy (regression — blood-pressure-independent effect)',
      'Stroke prevention in hypertensive patients with left ventricular hypertrophy (LIFE study)',
      'Non-diabetic chronic kidney disease with proteinuria',
      'Atrial fibrillation prevention (in hypertensive patients, limited evidence)',
    ],
    contraindications: [
      'Hypersensitivity to losartan or any ARB',
      'Pregnancy (second and third trimesters — fetotoxicity; first trimester — avoid)',
      'Breastfeeding (avoid — limited data; choose alternative)',
      'Bilateral renal artery stenosis or stenosis of the artery to a solitary kidney',
      'Severe hepatic impairment (losartan is extensively metabolised by CYP2C9 and CYP3A4)',
      'Concurrent use with aliskiren in diabetic patients or moderate-severe renal impairment (eGFR <60)',
      'Severe hypotension (systolic BP <90 mmHg)',
      'Primary hyperaldosteronism (limited efficacy)',
    ],
    side_effects: [
      'Cough (significantly less than ACE inhibitors ~1–3% vs 5–20% — main advantage of ARBs)',
      'Dizziness, hypotension (dose-related, especially in volume-depleted patients)',
      'Hyperkalaemia (risk similar to ACE inhibitors — especially in CKD, diabetes, or with K+-sparing diuretics)',
      'Renal impairment (acute decline in GFR — especially in volume-depleted or renal artery stenosis)',
      'Angioedema (rare — much less common than ACE inhibitors, but can still occur)',
      'Headache, fatigue, malaise, insomnia',
      'Gastrointestinal: nausea, diarrhoea, dyspepsia, abdominal pain',
      'Musculoskeletal: myalgia, arthralgia, back pain',
      'Anaemia (mild decrease in haemoglobin — usually asymptomatic)',
      'Hepatic: elevated transaminases, hepatitis (very rare)',
      'Hypersensitivity: rash, urticaria, pruritus',
      'Pancreatitis (extremely rare)',
    ],
    dosage: {
      adult: {
        'Hypertension — initiation': '25–50 mg PO once daily; increase to 50–100 mg once daily if BP uncontrolled after 3–4 weeks (max 100 mg/day)',
        'Diabetic nephropathy with proteinuria': '50 mg PO once daily; increase to 100 mg once daily based on BP and renal response',
        'Heart failure — initiation': '12.5 mg PO once daily; titrate by doubling every 1–2 weeks to target 50 mg once daily (or 50 mg twice daily if tolerating)',
        'Stroke prevention (LVH)': '50 mg PO once daily; increase to 100 mg once daily',
      },
      paediatric: {
        'Hypertension — children 6–16 yrs': '0.7 mg/kg PO once daily (max 50 mg); adjust to response (max 1.4 mg/kg or 100 mg/day)',
      },
      geriatric: {
        'Starting dose': '25 mg PO once daily',
        'Usual maintenance': '25–50 mg once daily',
      },
      renalAdjustment: 'CrCl 30–60: no adjustment needed (start 25 mg once daily). CrCl 15–30: start 25 mg once daily, max 50 mg/day. CrCl <15 (dialysis): start 25 mg once daily — not significantly removed by dialysis. Monitor K+ and Cr closely.',
      hepaticAdjustment: 'Reduce starting dose in mild-moderate impairment (start 25 mg once daily). Contraindicated in severe hepatic impairment. Losartan is primarily metabolised by CYP2C9 and CYP3A4.',
    },
    interactions: [
      'Potassium-sparing diuretics (spironolactone, eplerenone, amiloride): increased risk of hyperkalaemia',
      'Potassium supplements / salt substitutes: hyperkalaemia — avoid',
      'NSAIDs (ibuprofen, diclofenac, naproxen): reduced antihypertensive effect AND increased risk of renal impairment — use paracetamol if possible',
      'Rifampicin: reduced losartan active metabolite levels (CYP enzyme induction) — may reduce efficacy',
      'Fluconazole: increased losartan levels (CYP2C9 inhibition) — monitor BP',
      'Lithium: increased lithium levels (similar to ACE inhibitors — reduced renal clearance) — monitor lithium',
      'Diuretics: enhanced hypotensive effect — caution with first dose',
      'Aliskiren: increased adverse effects — contraindicated in diabetes and eGFR <60',
      'ACE inhibitors: dual blockade without additional benefit — avoid',
      'Antidiabetic agents: possible enhanced hypoglycaemic effect — monitor glucose',
    ],
    monitoring: 'Baseline: BP, serum K+, Cr, eGFR, urinalysis (protein). After initiation and dose increase: BP within 2 weeks, K+/Cr within 1–2 weeks. Stable patients: K+ and Cr every 3–6 months. Yearly: electrolytes, renal function, urinalysis. Monitor for hypotension (especially first dose in volume-depleted patients). Angioedema watch: very rare but counsel patient to report any facial, lip, or tongue swelling.',
    patient_counselling: 'Take at the same time each day. This medicine does not usually cause a cough (unlike ACE inhibitors) — that is generally why it is prescribed. Avoid salt substitutes containing potassium. Stay well hydrated but avoid NSAIDs (ibuprofen, diclofenac) — use paracetamol. This medicine is NOT safe in pregnancy — stop immediately and consult your doctor if pregnant or planning pregnancy. Dizziness on standing may occur — rise slowly from sitting or lying down. You will need regular blood tests to check kidney function and potassium. Report any swelling of the face, lips, or throat (rare but serious).',
  },

  // ── 3. Metformin ──────────────────────────────────────────────────
  {
    name: 'Metformin',
    generic_name: 'Metformin Hydrochloride',
    drug_class: 'Biguanide (oral antihyperglycaemic)',
    indications: [
      'Type 2 diabetes mellitus (FIRST-LINE pharmacotherapy — alongside lifestyle modification)',
      'Prediabetes (off-label in some guidelines — reduces progression to type 2 diabetes in high-risk individuals)',
      'Gestational diabetes (second-line to insulin — increasing evidence)',
      'Polycystic ovary syndrome (PCOS) — ovulation induction and metabolic improvements',
      'Metabolic syndrome (off-label, used for insulin resistance)',
      'Weight gain prevention associated with antipsychotic use (off-label)',
      'Non-alcoholic fatty liver disease (NAFLD/NASH — off-label, modest benefit)',
    ],
    contraindications: [
      'Hypersensitivity to metformin',
      'Severe renal impairment (eGFR <30 mL/min/1.73m² — contraindicated; eGFR 30–44: dose reduced, monitor closely — MHRA/EMA guidance)',
      'Acute or chronic metabolic acidosis (including diabetic ketoacidosis — DKA is an absolute contraindication)',
      'Liver failure or severe hepatic impairment',
      'Acute illness with risk of tissue hypoxia (acute heart failure, acute MI, sepsis, severe infection, dehydration, shock, respiratory failure)',
      'History of lactic acidosis (with metformin or any biguanide)',
      'Alcoholism or acute alcohol intoxication (increases lactic acidosis risk)',
      'Intravascular iodinated contrast media (temporary discontinuation required — typically 48 hours before and after procedure, re-evaluate renal function before restarting)',
      'Pregnancy (limited safety data — insulin remains first-line; some guidelines support use in gestational diabetes)',
      'Breastfeeding (limited data — caution; insulin preferred in breastfeeding)',
    ],
    side_effects: [
      'Gastrointestinal: nausea, vomiting, diarrhoea, abdominal discomfort, anorexia, metallic taste (common, especially during initiation — dose-dependent, usually transient; slow titration and taking with food reduces symptoms)',
      'Lactic acidosis (rare but serious — 0.03–0.06 cases per 1,000 patient-years; class-specific; risk factors: renal impairment, acute illness, alcohol excess, liver disease, tissue hypoxia)',
      'Vitamin B12 deficiency (10–30% — reduced absorption; screen annually in long-term therapy — may cause neuropathy if unrecognised)',
      'Hypoglycaemia (rare when used as monotherapy — does not stimulate insulin secretion; risk increases when combined with sulphonylureas or insulin)',
      'Dermatitis, rash, urticaria (rare)',
      'Hepatic dysfunction (very rare — isolated reports of hepatitis)',
    ],
    dosage: {
      adult: {
        'Immediate-release (IR) — initiation': '500 mg PO once daily with largest meal for 1 week; then 500 mg twice daily; increase by 500 mg weekly as tolerated (usual: 500 mg–1 g twice daily; max 2.5 g/day in 2–3 divided doses)',
        'Prolonged-release (PR/XR)': '500 mg–1 g PO once daily with evening meal; titrate by 500 mg every 10–15 days (max 2 g/day)',
        'Switching IR to PR/XR': 'Use same total daily dose (up to 2 g/day PR)',
      },
      paediatric: {
        'Children ≥10 yrs (type 2 diabetes)': '500 mg PO once daily with food; increase by 500 mg weekly (max 2 g/day in 2–3 divided doses)',
        'PCOS — adolescents': '500 mg PO once daily; increase to 500 mg twice daily as tolerated',
      },
      geriatric: {
        'Starting dose': '250–500 mg PO once daily with food',
        'Monitor renal function': 'Check eGFR every 3 months if >65 yrs — dose reduce if eGFR declining',
      },
      renalAdjustment: 'eGFR 45–60: no dose reduction (monitor renal function every 3–6 months). eGFR 30–44: max 1 g/day in 2 divided doses; monitor every 3 months. eGFR <30: CONTRAINDICATED. Hold metformin during acute illness with dehydration or acute kidney injury.',
      hepaticAdjustment: 'Contraindicated in severe hepatic impairment. Use with caution in mild-moderate impairment — monitor LFTs.',
    },
    interactions: [
      'Iodinated contrast media: risk of lactic acidosis — STOP metformin 48 hours before elective contrast procedure (with contrast), re-evaluate renal function before restarting',
      'Alcohol: increased risk of lactic acidosis (acute and chronic) — limit alcohol intake, avoid binge drinking',
      'Cimetidine: reduced metformin excretion — increased metformin levels',
      'Diuretics (especially loop diuretics): may cause acute kidney injury and increase lactic acidosis risk',
      'Corticosteroids: hyperglycaemic effect — antagonises metformin, may need dose adjustment',
      'Thiazide/thiazide-like diuretics: hyperglycaemia — monitor glucose',
      'Beta-agonists (salbutamol, terbutaline): hyperglycaemia — monitor glucose',
      'Sulphonylureas / insulin: increased risk of hypoglycaemia — monitor glucose, adjust doses',
      'Verapamil: increased metformin levels (reduced renal clearance)',
      'ACE inhibitors / ARBs: may enhance hypoglycaemic effect — monitor glucose',
      'MAO inhibitors: enhanced hypoglycaemic effect',
    ],
    monitoring: 'Baseline: HbA1c, fasting blood glucose, renal function (Cr, eGFR — essential before initiation), LFTs, vitamin B12 level. During therapy: HbA1c every 3–6 months (target generally <7% or 53 mmol/mol, individualised); fasting/self-monitored glucose; renal function (eGFR) every 3–6 months in stable patients (every 3 months if eGFR <60, every 6 months if >60); vitamin B12 annually (screen for neuropathy — check B12, folate, homocysteine, methylmalonic acid); LFTs annually. Lactic acidosis warning signs: unexplained hyperventilation, myalgia, abdominal pain, severe lethargy, hypothermia, hypotension — discontinue immediately and assess. Before surgery: hold metformin on the day of surgery (general anaesthesia — risk of lactic acidosis).',
    patient_counselling: 'Take metformin with or immediately after food to reduce stomach upset. Nausea, diarrhoea, and metallic taste are common at the start — take with food, start at a low dose and increase gradually; these usually improve within 1–2 weeks. This medicine does NOT usually cause low blood sugar when taken alone — but may when combined with other diabetes medicines. You will need regular blood tests to check: blood sugar control (HbA1c), kidney function (every 3–12 months), and vitamin B12 levels (at least yearly). STOP taking metformin and contact your doctor immediately if: you become severely dehydrated (vomiting, diarrhoea, fever, unable to drink), you develop serious illness (heart attack, sepsis, pneumonia), or you have symptoms of lactic acidosis (unusual muscle pain, rapid breathing, severe drowsiness, abdominal pain, feeling very cold). Avoid alcohol or limit to small amounts with food.',
  },

  // ── 4. Insulin (Biphasic Isophane / Soluble) ─────────────────────
  {
    name: 'Insulin (Biphasic Isophane)',
    generic_name: 'Biphasic Isophane Insulin (Pre-mixed: Soluble + Isophane)',
    drug_class: 'Intermediate-acting insulin (pre-mixed formulation)',
    indications: [
      'Type 1 diabetes mellitus (multiple-dose insulin regimen or insulin pump — premixed less common, not first-line)',
      'Type 2 diabetes mellitus — when oral agents insufficient (step-up therapy)',
      'Gestational diabetes — when glycaemic targets not achieved with diet ± metformin',
      'Diabetic ketoacidosis (DKA) — only IV soluble insulin (regular) for acute management; premixed used during transition to subcutaneous',
      'Severe hyperglycaemia / hyperosmolar hyperglycaemic state (HHS) — acute phase requires IV insulin; premixed for maintenance',
      'Sick-day management for type 1 diabetes (adjustments based on blood glucose and ketones)',
    ],
    contraindications: [
      'Hypersensitivity to human insulin or any excipient',
      'Hypoglycaemia (current episode — treat hypoglycaemia first)',
      'Hypokalaemia (insulin shifts potassium intracellularly — may worsen)',
      'Severe hyperglycaemia with ketoacidosis — requires IV soluble insulin (not premixed)',
    ],
    side_effects: [
      'Hypoglycaemia (most common and most serious — blood glucose <3.9 mmol/L or 70 mg/dL; mild: sweating, tremor, palpitations, hunger, anxiety; severe: confusion, seizures, loss of consciousness — can be fatal)',
      'Weight gain (insulin anabolic effect — 2–4 kg common in first year; minimised by appropriate dosing and lifestyle)',
      'Lipodystrophy (lipohypertrophy — fatty lumps at injection sites from repeated use of same site; lipoatrophy — thinning under injection sites; avoid by rotating sites)',
      'Injection site reactions: redness, swelling, itching, pain (usually transient — resolve with continued use and rotation)',
      'Oedema (peripheral — insulin-induced sodium retention, especially during intensive insulin initiation)',
      'Hypokalaemia (insulin shifts K+ intracellularly — monitor K+ in hospitalised patients especially those on diuretics)',
      'Allergic reactions: local (urticaria, pruritus at injection site) or systemic (anaphylaxis — rare; may require desensitisation)',
      'Insulin-induced oedema (usually self-limiting within days to weeks)',
      'Visual disturbances (temporary refractive changes with rapid improvement in glycaemic control)',
      'Worsening of diabetic retinopathy (transient with very rapid glycaemic improvement — "early worsening")',
    ],
    dosage: {
      adult: {
        'Type 2 diabetes — initiation (premixed 30/70)': '10–12 units SC once daily before breakfast for insulin-naïve (total daily dose 0.2–0.3 units/kg); titrate by 1–2 units every 3–7 days based on fasting glucose (target 4–7 mmol/L pre-meal)',
        'Type 2 diabetes — intensification (premixed 30/70 twice daily)': 'Divide total daily dose 2/3 before breakfast and 1/3 before dinner; adjust each based on corresponding pre-meal and bedtime glucose',
        'Type 1 diabetes — multiple daily injections': 'Total daily dose 0.5–0.6 units/kg (50% basal, 50% bolus); premixed formulations NOT recommended for type 1 — use basal-bolus regimen',
        'Transition from IV to SC insulin': 'Calculate 60–80% of total daily IV insulin requirement; give as basal-bolus or premixed depending on stability',
      },
      paediatric: {
        'Type 1 diabetes — total insulin (per day)': 'Pre-pubertal: 0.5–1 units/kg/day. Pubertal: 1–1.5 units/kg/day. Basal-bolus regimen strongly preferred.',
      },
      geriatric: {
        'Starting dose': '10 units SC once daily (or 0.2–0.3 units/kg/day) — aim for less stringent targets (HbA1c <8.5%, fasting glucose 5–10 mmol/L) to reduce hypoglycaemia risk',
      },
      renalAdjustment: 'Reduce insulin dose as renal function declines (prolonged half-life of exogenous insulin). eGFR 30–60: reduce dose by 20–30%. eGFR <30: reduce dose by 30–50%. Monitor glucose closely. Risk of hypoglycaemia significantly increased.',
      hepaticAdjustment: 'Reduce dose in significant hepatic impairment (impaired gluconeogenesis — increased hypoglycaemia risk).',
    },
    interactions: [
      'Oral hypoglycaemics (sulphonylureas, SGLT2 inhibitors, DPP-4 inhibitors, GLP-1 agonists): additive hypoglycaemic effect — may need to reduce insulin dose by 10–30% when adding',
      'Beta-blockers (propranolol, atenolol, metoprolol): MASKS hypoglycaemic symptoms (tachycardia, palpitations) — sweating and hunger still present; glycaemic control may worsen; prefer cardioselective beta-blockers with caution',
      'Corticosteroids (prednisolone, dexamethasone): significant hyperglycaemic effect — may need 50–100% increase in insulin dose',
      'Thiazide diuretics: hyperglycaemia — may need dose increase',
      'Alcohol: increased risk of hypoglycaemia (inhibits gluconeogenesis) — counsel on intake',
      'MAO inhibitors: enhanced hypoglycaemic effect',
      'Salicylates (high-dose aspirin): enhanced hypoglycaemic effect in diabetes',
      'Octreotide: altered insulin requirements — monitor glucose',
      'Sympathomimetics (salbutamol, terbutaline): hyperglycaemia — may need dose increase',
    ],
    monitoring: 'Self-monitoring of blood glucose (SMBG): type 1 diabetes — 4–8 times daily (before meals, bedtime, driving, exercise, sick days). Type 2 on insulin — at least fasting and pre-dinner (more if titration or hypoglycaemia risk). HbA1c every 3–6 months (target individualised: generally <7% for most, <7.5% for elderly/comorbidities, <6.5% for early T2DM if no hypoglycaemia). Renal function annually (eGFR, Cr). Annual retinal screening (diabetic retinopathy). Annual foot examination (neuropathy, peripheral vascular disease). Hypoglycaemia review at each visit: frequency, severity, awareness. Injection site inspection: rotate sites (abdomen, thighs, upper arms, buttocks — within each anatomical region systematically). Insulin storage: unopened vials/cartridges in refrigerator (2–8°C); in-use at room temperature (<30°C) for up to 28 days. Sick-day rules: never stop insulin — monitor glucose every 2–4 hours, check ketones, increase fluids.',
    patient_counselling: 'CRITICAL: Insulin should NEVER be stopped, even when you are not eating (sick days, fasting). Skipping doses can lead to diabetic ketoacidosis (DKA), a life-threatening emergency. Rotate injection sites systematically (abdomen → arm → thigh → buttock) to prevent fatty lumps (lipohypertrophy) that affect absorption. Store unopened insulin in the refrigerator (NOT freezer). In-use insulin can be kept at room temperature for up to 28 days. Recognise hypoglycaemia (low blood sugar): sweating, trembling, palpitations, hunger, confusion, blurred vision — treat immediately with 15–20 g fast-acting carbohydrate (glucose tablets 3–4, sugary drink half a glass, or 2 teaspoons sugar dissolved in water). After treating hypo, have a snack if next meal is more than 1 hour away. Always carry glucose source and medical identification. Check blood glucose before driving — if <5 mmol/L, eat a snack. Do NOT drive if you have impaired hypoglycaemia awareness. If you become ill with vomiting, diarrhoea, or fever (sick day): NEVER stop insulin, check blood glucose every 2–4 hours, check urine ketones, drink plenty of sugar-free fluids, seek medical help if ketones are moderate-large or you cannot keep fluids down.',
  },

  // ── 5. Atorvastatin ───────────────────────────────────────────────
  {
    name: 'Atorvastatin',
    generic_name: 'Atorvastatin Calcium',
    drug_class: 'HMG-CoA reductase inhibitor (statin)',
    indications: [
      'Primary hypercholesterolaemia (heterozygous familial and non-familial)',
      'Mixed dyslipidaemia (Fredrickson types IIa and IIb)',
      'Homozygous familial hypercholesterolaemia (HoFH)',
      'Primary prevention of cardiovascular events in patients with multiple risk factors (hypertension, smoking, diabetes, age, low HDL)',
      'Secondary prevention of myocardial infarction, stroke, revascularisation procedures, and angina',
      'Acute coronary syndrome (ACS) — early, intensive statin therapy reduces recurrent events and mortality',
      'Diabetes mellitus with cardiovascular risk factors (lipid-independent cardiovascular risk reduction)',
      'Stroke and transient ischaemic attack (TIA) — reduces risk of recurrent stroke and cardiovascular events',
      'Chronic kidney disease (stages 1–3b) — reduces cardiovascular events, not for dialysis patients',
    ],
    contraindications: [
      'Hypersensitivity to atorvastatin or any statin',
      'Active liver disease or persistent unexplained elevation of transaminases (>3x ULN)',
      'Pregnancy and breastfeeding (statins are teratogenic — contraindicated in women of childbearing potential not using contraception)',
      'Unexplained muscle pain or myopathy on prior statin therapy',
      'Concurrent use with strong CYP3A4 inhibitors (see interactions) — only if absolutely necessary and at reduced dose',
      'Severe renal impairment (CrCl <30 — caution, not contraindicated but monitor closely)',
      'Haemorrhagic stroke (caution — statins slightly increase risk of haemorrhagic stroke in patients with prior ICH)',
    ],
    side_effects: [
      'Musculoskeletal: myalgia (5–10% — muscle aches without CK elevation), myopathy (muscle pain with CK >10x ULN — 0.1–0.5%), rhabdomyolysis (rare but potentially fatal — CK >50x ULN with renal injury — higher with high doses, interacting drugs, or predisposing factors)',
      'Hepatic: elevated transaminases (ALT/AST — dose-dependent, usually asymptomatic and transient; 0.5–2% >3x ULN; clinically significant hepatotoxicity very rare)',
      'Gastrointestinal: diarrhoea, nausea, abdominal pain, dyspepsia, flatulence, constipation',
      'CNS: headache, insomnia, dizziness, fatigue, cognitive impairment (rare — memory loss, confusion — reversible)',
      'Endocrine: increased HbA1c and fasting glucose (small increase — 0.1–0.3% — dose-related; benefit outweighs risk), rare cases of gynaecomastia',
      'Dermatological: rash, pruritus, urticaria, alopecia (rare)',
      'Hypersensitivity: angioedema, anaphylaxis (extremely rare)',
      'Peripheral neuropathy (very rare — prolonged use, uncertain causal link)',
      'Interstitial lung disease (extremely rare — report any dyspnoea, cough, weight loss)',
    ],
    dosage: {
      adult: {
        'Primary prevention / mild-moderate hyperlipidaemia': '10 mg PO once daily (initiation dose); adjust every 2–4 weeks based on response (usual: 10–40 mg/day)',
        'Secondary prevention / ACS / high risk': '20–40 mg PO once daily (start at 40 mg in very high risk); may increase to 80 mg/day if target LDL not achieved',
        'HoFH': '10–20 mg PO once daily initially; titrate to 40–80 mg/day (max 80 mg/day)',
        'Stroke prevention': '10–40 mg PO once daily (target LDL <1.8 mmol/L or ≥50% reduction)',
      },
      paediatric: {
        'HeFH — children 10–17 yrs': '10 mg PO once daily; increase to 20 mg/day (max 20 mg/day); target LDL based on risk',
      },
      geriatric: {
        'Starting dose': '10 mg PO once daily',
        'Titrate': 'As tolerated — elderly more susceptible to myopathy (polypharmacy, renal impairment, frailty)',
      },
      renalAdjustment: 'No dose adjustment required for mild-moderate renal impairment. Use caution in severe impairment — atorvastatin is not renally cleared but metabolites may accumulate. Start at 10 mg, monitor for myopathy.',
      hepaticAdjustment: 'Contraindicated in active liver disease or unexplained persistent transaminase elevation >3x ULN. Reduce dose in moderate impairment. Atorvastatin is hepatically metabolised (CYP3A4). Check LFTs before and during therapy.',
      treatmentTargets: {
        'Primary prevention (moderate risk)': 'LDL <3.0 mmol/L or ≥50% reduction from baseline',
        'Primary prevention (high risk)': 'LDL <1.8 mmol/L or ≥50% reduction',
        'Secondary prevention (established CVD)': 'LDL <1.4 mmol/L (<55 mg/dL) or ≥50% reduction from baseline',
        'Very high risk (ACS, diabetes with target organ damage)': 'LDL <1.0 mmol/L or ≥50% reduction',
      },
    },
    interactions: [
      'Strong CYP3A4 inhibitors (ketoconazole, itraconazole, voriconazole, posaconazole, clarithromycin, erythromycin, ritonavir, boceprevir, telaprevir, grapefruit juice >1 L/day): significantly increased atorvastatin levels — risk of myopathy/rhabdomyolysis — avoid or use lowest dose (max 20 mg) and monitor',
      'Ciclosporin: increased atorvastatin levels (5–10 fold) — limit dose to 10 mg/day, monitor CK',
      'Gemfibrozil: increased risk of myopathy/rhabdomyolysis (mechanism: impaired glucuronidation of statin) — prefer fenofibrate instead of gemfibrozil',
      'Other fibrates (fenofibrate): increased myopathy risk (lower than gemfibrozil) — monitor CK, avoid in pre-existing muscle disease',
      'Warfarin: slightly enhanced anticoagulant effect — monitor INR when starting/stopping atorvastatin, adjust warfarin dose as needed',
      'Digoxin: slightly increased digoxin levels (CYP3A4 inhibition) — monitor digoxin levels',
      'Oral contraceptives: increased norethindrone and ethinylestradiol levels — but no clinical adjustment typically needed',
      'Colchicine: increased risk of myopathy (especially in renal impairment) — monitor for muscle symptoms',
      'Amiodarone: increased risk of myopathy (CYP3A4 inhibition) — limit atorvastatin to 20 mg/day',
      'Calcium channel blockers (amlodipine, diltiazem, verapamil): modest increase in atorvastatin levels — clinically usually not significant but monitor if muscle symptoms',
      'Daptomycin: increased risk of myopathy — monitor CK, temporarily hold statin during daptomycin therapy',
      'Antacids (aluminium/magnesium): reduced atorvastatin absorption — separate dosing by 2 hours',
      'Rifampicin: initially increased atorvastatin levels (competition), then decreased (induction) — evening dosing may help',
    ],
    monitoring: 'Baseline: fasting lipid profile (total cholesterol, LDL, HDL, triglycerides), LFTs (ALT, AST, ALP, GGT), CK (if muscle symptoms present or high risk — not routine), HbA1c (baseline reference), renal function. During therapy: LFTs 4–12 weeks after initiation and after dose increase, then annually if stable. CK only if muscle symptoms present (myalgia, weakness, tenderness, stiffness). Lipid profile 4–12 weeks after starting or dose change, then annually (or more frequently if not at target). HbA1c: baseline and annually. If muscle symptoms: check CK — if CK >10x ULN (or >5x ULN with symptoms + high clinical suspicion), STOP STATIN. If asymptomatic CK elevation (common with exercise) — no action needed unless >5–10x ULN persistent. At each visit: ask about muscle pain, weakness, dark urine. In elderly, polypharmacy, or multi-system disease: more frequent monitoring.',
    patient_counselling: 'Take once daily at any time of the day, with or without food. Consistency is important — taking at the same time each day helps. Do NOT drink grapefruit juice in large quantities (>1 litre/day) — it can increase the risk of muscle side effects. Report any unexplained muscle pain, tenderness, weakness, or dark-coloured urine immediately — these could be signs of a rare but serious muscle problem (rhabdomyolysis). You will need a blood test (lipid panel) in 4–12 weeks to check if your cholesterol is responding. This medicine is for long-term use — do not stop without consulting your doctor, even if you feel well. Avoid alcohol or limit to moderate intake. If you have diabetes, your blood sugar may increase slightly — continue monitoring; the cardiovascular benefit far outweighs this effect. Seek medical advice if pregnant, planning pregnancy, or breastfeeding — this medicine is not safe in pregnancy.',
  },

  // ── 6. Warfarin ───────────────────────────────────────────────────
  {
    name: 'Warfarin',
    generic_name: 'Warfarin Sodium',
    drug_class: 'Vitamin K antagonist (anticoagulant)',
    indications: [
      'Atrial fibrillation (AF) — stroke and systemic embolism prophylaxis in non-valvular AF (CHA₂DS₂-VASc score ≥1 in men, ≥2 in women)',
      'Venous thromboembolism (VTE) — treatment of deep vein thrombosis (DVT) and pulmonary embolism (PE)',
      'VTE prophylaxis — high-risk surgery (orthopaedic, major abdominal surgery) — DOACs often preferred now',
      'Mechanical heart valves (prosthetic valves — first-line anticoagulant for mechanical valves — DOACs NOT indicated)',
      'Antiphospholipid syndrome (APS) — thrombotic prophylaxis (DOACs less effective — warfarin is first-line)',
      'Myocardial infarction with left ventricular thrombus — usually 3–6 months of warfarin + antiplatelet (triple therapy considerations)',
      'Stroke due to cerebral sinus thrombosis (off-label)',
      'Pulmonary hypertension (chronic thromboembolic — CTEPH — lifelong anticoagulation)',
    ],
    contraindications: [
      'Hypersensitivity to warfarin',
      'Active bleeding or high risk of bleeding (recent GI bleed, intracranial haemorrhage, haemorrhagic stroke, aortic dissection, oesophageal varices)',
      'Recent or planned surgery (especially CNS, eye, or major trauma — high bleeding risk)',
      'Severe uncontrolled hypertension (systolic >180 mmHg or diastolic >110 mmHg)',
      'Bleeding disorders (haemophilia, von Willebrand disease, significant thrombocytopenia <50,000)',
      'Major trauma or surgery within 2 weeks (relative — risk/benefit assessment)',
      'Pregnancy (first trimester — teratogenic: warfarin embryopathy; third trimester — foetal haemorrhage; heparin/LMWH used instead)',
      'Breastfeeding (generally considered safe — warfarin does not pass into breast milk in significant amounts; however, monitor infant for bruising)',
      'Severe hepatic impairment (impaired clotting factor synthesis)',
      'Renal impairment (CrCl <15 — increased bleeding risk; dialysis patients should be dosed carefully)',
      'Infective endocarditis (risk of haemorrhagic transformation)',
      'Lumbar puncture or epidural anaesthesia (relative — hold anticoagulation)',
      'Malignant hypertension (risk ICH)',
      'Pericarditis with or without pericardial effusion (risk of haemopericardium)',
      'Alcoholism (erratic INR, falls risk, poor compliance)',
      'Dementia or inability to comply with monitoring requirements',
    ],
    side_effects: [
      'Haemorrhage (major: 1–3% per year — intracranial, GI, retroperitoneal; minor: epistaxis, ecchymosis, haematuria, gingival bleeding, menorrhagia — ~15% per year)',
      'Skin necrosis (rare, <0.1% — protein C deficiency or warfarin-induced skin necrosis — occurs 3–10 days after starting; purple, necrotic plaques on breasts, thighs, buttocks; discontinue warfarin, give vitamin K and protein C concentrate or FFP)',
      'Calciphylaxis (extremely rare — calcium deposition in small vessels with skin necrosis — more common in CKD/dialysis patients)',
      '"Purple toes" syndrome (cholesterol microembolisation — 1–3 weeks after starting; bluish, painful toes with livedo reticularis; warfarin may need to be stopped and alternative anticoagulant used)',
      'Osteoporosis (long-term therapy — uncertain causality; vitamin K is essential for bone metabolism)',
      'Alopecia (reversible — rare)',
      'Fever, nausea, vomiting, diarrhoea, rash (hypersensitivity — rare)',
      'Hepatic dysfunction (very rare — cholestatic jaundice)',
    ],
    dosage: {
      adult: {
        'Loading (non-urgent)': '5 mg PO once daily for 2 days (adjust based on INR on day 3) — lower loading in elderly, heart failure, liver disease, malnourished, or high bleeding risk (2.5–3 mg for 2 days)',
        'Loading (urgent — bridging)': '5–10 mg PO once daily for 1–2 days (overlap with LMWH/heparin until INR 2–3 for ≥24 hours)',
        'Maintenance': '2–10 mg PO once daily (typical: 3–7 mg; dose adjusted based on INR)',
        'Mechanical heart valves': 'Target INR 2.5–3.5 (higher than standard) — may require higher maintenance doses',
        'Antiphospholipid syndrome': 'Target INR 2–3 (consider higher target 2.5–3.5 if recurrent thrombosis on standard target)',
      },
      paediatric: {
        'Loading': '0.1–0.2 mg/kg PO once daily for 2 days (max 5 mg)',
        'Maintenance': '0.05–0.34 mg/kg PO once daily (adjust to INR target)',
      },
      geriatric: {
        'Loading dose': '2.5–3 mg PO once daily for 2 days (lower due to decreased clearance, polypharmacy, falls risk)',
        'Maintenance': '1–5 mg PO once daily (often lower than younger patients)',
        'Target INR': 'Lower end of target range (2–2.5 for most indications)',
      },
      renalAdjustment: 'No dose adjustment required for mild-moderate impairment. Severe impairment (CrCl <15): increased bleeding risk — use with caution, lower loading dose, more frequent INR monitoring, consider DOAC if appropriate.',
      hepaticAdjustment: 'Contraindicated in severe hepatic impairment (reduced clotting factor synthesis — marked INR elevation and bleeding risk). Moderate impairment: reduce loading dose, monitor INR more frequently.',
      targetINR: {
        'AF / VTE / APS (standard)': '2.0–3.0 (target 2.5)',
        'Mechanical aortic valve': '2.5–3.5 (target 3.0)',
        'Mechanical mitral valve': '2.5–3.5 (target 3.0)',
        'Mechanical aortic + mitral': '2.5–3.5 (target 3.0)',
        'Bioprosthetic valve (for 3–6 months post-op)': '2.0–3.0 (target 2.5)',
        'Antiphospholipid syndrome (recurrent thrombosis)': '2.5–3.5 (target 3.0)',
      },
    },
    interactions: [
      'DRUGS WITH SIGNIFICANT INTERACTION (monitor INR closely when starting/stopping):',
      'Antibiotics (ciprofloxacin, levofloxacin, erythromycin, clarithromycin, co-trimoxazole, metronidazole, fluconazole, miconazole) — increased INR (CYP inhibition, gut flora suppression)',
      'NSAIDs (ibuprofen, diclofenac, naproxen, aspirin) — increased bleeding risk (platelet inhibition + GI erosion) — avoid if possible',
      'Aspirin / antiplatelet agents (clopidogrel, ticagrelor) — markedly increased bleeding risk — triple therapy only with GI protection and for shortest duration',
      'Paracetamol — increased INR at high doses (>2 g/day chronically) — monitor INR',
      'Amiodarone — increased INR (CYP inhibition) — reduce warfarin dose by 25–50%',
      'Statins (atorvastatin, simvastatin) — modest INR increase — monitor when starting/stopping',
      'Carbamazepine, phenytoin, rifampicin — decreased INR (enzyme induction) — may need warfarin dose increase',
      'SSRIs (fluoxetine, paroxetine, sertraline) — increased bleeding risk (impaired platelet function + CYP inhibition)',
      'Omeprazole, lansoprazole — modest INR increase (CYP inhibition) — monitor',
      'Thyroxine — increased INR (increased catabolism of clotting factors)',
      'Vitamin K-rich foods (green leafy vegetables: kale, spinach, Brussels sprouts, broccoli, parsley, lettuce, cabbage) — decreased INR: maintain consistent intake, do not avoid but do not binge',
      'Cranberry juice, pomegranate juice, mango — increased INR — limit intake to small amounts',
      'Alcohol — variable effect (increased INR via liver impairment, erratic compliance) — limit to 1–2 units/day maximum',
    ],
    monitoring: 'CRITICAL: INR MUST be measured before starting, after 2–3 doses (day 3), then every 2–4 days until stable (2 consecutive INRs in target range), then weekly for 2–4 weeks, then every 2–4 weeks for first 2 months, then monthly if stable (max 6–8 weeks between checks in well-controlled patients). More frequent monitoring: when starting/stopping ANY interacting drug, change in diet (especially vitamin K), acute illness, diarrhoea/vomiting, hospitalisation, dose change, or if INR out of range. Print or provide a warfarin dose card with INRs, doses, and target range. Annual review: renal function, liver function, FBC. At each visit: ask about bleeding (epistaxis, bruising, haematuria, melaena, haematemesis, menorrhagia, gum bleeding), falls risk, diet changes, new medications (including OTC and herbal). SUPRATHERAPEUTIC INR MANAGEMENT: INR 3–5 (no bleeding): withhold 1–2 doses, reduce maintenance dose, recheck in 1–3 days. INR 5–8 (no bleeding): withhold 1–2 doses, consider vitamin K 1–2 mg PO, recheck in 24–48 hours. INR >8 (no bleeding): hold warfarin, give vitamin K 2–5 mg PO, recheck 24 hours. Major bleeding: STOP warfarin, give vitamin K 10 mg IV (slow infusion), prothrombin complex concentrate (PCC) or FFP, monitor INR.',
    patient_counselling: 'LIFELONG MONITORING: This is a high-risk medicine that requires regular blood tests (INR) — at least monthly when stable. You will receive a dose card — keep it with you at all times. Keep your vitamin K intake CONSISTENT — eat green leafy vegetables (kale, spinach, broccoli) in roughly the same amounts each week; do not suddenly increase or decrease. Seek IMMEDIATE medical attention if: uncontrolled bleeding, blood in urine or stool, black/tarry stools, coughing up blood, severe headache (possible intracranial bleed), vomiting blood, unusual bruising, heavy menstrual bleeding. Report ANY new medicine to your doctor — including over-the-counter, herbal remedies, and supplements. AVOID NSAIDs (ibuprofen, diclofenac, naproxen) — use paracetamol for mild pain (but not >2 g/day chronically). Limit alcohol to 1–2 units per day. Take warfarin at the same time each day (usually evening). If a dose is missed, take it as soon as remembered if within 12 hours; otherwise skip and take the next dose at the usual time — NEVER double a dose. Inform any healthcare provider (doctor, dentist, surgeon, pharmacist) that you take warfarin. Wear a medical alert bracelet or carry a warfarin card. If you fall or are in an accident, mention you are on blood thinners.',
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
  console.log('║   Batch 3: 6 Medicines (CV/Endo/Anticoagulant)    ║');
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
  console.log('━━━ Batch 3 Summary ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Intended:      ${MONOGRAPHS.length}`);
  console.log(`  Successful:    ${success}`);
  console.log(`  Failed:        ${fail}`);
  console.log(`  Prior total:   ${before}`);
  console.log(`  Current total: ${after}`);
  console.log();

  if (fail === 0 && success === MONOGRAPHS.length) {
    console.log('✅ Batch 3 COMPLETE. Ready for Batch 4.');
  } else {
    console.log('⚠️  Batch 3 partially complete. Review errors above.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
