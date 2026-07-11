/**
 * seed-drug-monographs-batch7.ts
 * Phase C — Batch 7: Gliclazide, Levothyroxine, Hydrocortisone,
 *          Ferrous Sulphate, Folic Acid, Cyanocobalamin (Endocrine / Anaemia)
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
  // ── 1. Gliclazide ────────────────────────────────────────────────
  {
    name: 'Gliclazide',
    generic_name: 'Gliclazide',
    drug_class: 'Sulphonylurea (insulin secretagogue) — second-generation',
    indications: [
      'Type 2 diabetes mellitus — second-line after metformin (when glycaemic targets not met)',
      'Type 2 diabetes mellitus — first-line if metformin contraindicated or not tolerated',
    ],
    contraindications: [
      'Hypersensitivity to gliclazide, any sulphonylurea, or sulphonamides',
      'Type 1 diabetes mellitus (insulin-dependent — no efficacy)',
      'Diabetic ketoacidosis (DKA) or hyperosmolar hyperglycaemic state (HHS) — requires insulin',
      'Severe hepatic impairment',
      'Severe renal impairment (CrCl <15 mL/min) — gliclazide MR may be used with caution if CrCl 15–29',
      'Pregnancy (insulin is preferred; avoid sulphonylureas in pregnancy — risk of neonatal hypoglycaemia)',
      'Breastfeeding (excreted in breast milk — risk of neonatal hypoglycaemia; insulin preferred)',
      'Acute porphyria (sulphonylureas can precipitate attacks)',
      'Stress (severe infection, trauma, surgery) — may require temporary insulin',
    ],
    side_effects: [
      'Hypoglycaemia (most common and most dangerous — 1–2% severe episodes/year; risk increased with: missed meals, excessive alcohol, renal impairment, age >65, concurrent insulin/other OADs; prolonged hypoglycaemia can cause brain damage; gliclazide MR has lower hypo risk than glibenclamide)',
      'Gastrointestinal: nausea, vomiting, diarrhoea, constipation, dyspepsia (common at initiation; usually transient)',
      'Weight gain (2–4 kg — insulin secretagogues stimulate appetite and increase insulin levels)',
      'Dermatological: rash, pruritus, urticaria, erythema, photosensitivity, Stevens-Johnson syndrome (very rare)',
      'Haematological: leukopenia, thrombocytopenia, agranulocytosis, aplastic anaemia, haemolytic anaemia (very rare — sulphonamide-related)',
      'Hepatic: elevated transaminases, cholestatic jaundice, hepatitis (very rare)',
      'CNS: headache, dizziness, visual disturbances (transient — related to changes in blood glucose)',
      'Hypersensitivity: cross-reactivity with sulphonamide antibiotics (theoretical — clinically very rare with second-generation sulphonylureas)',
    ],
    dosage: {
      adult: {
        'Standard release (80 mg) — initiation': '40–80 mg PO once daily (with breakfast); increase by 40–80 mg every 2–4 weeks based on HbA1c/glucose (max 320 mg/day in 2 divided doses — 160 mg morning + 160 mg evening)',
        'Modified release (MR/XR 30 mg) — initiation': '30 mg PO once daily (with breakfast); increase by 30 mg every 4 weeks as needed (max 120 mg/day)',
        'Modified release (MR 60 mg)': '60 mg PO once daily (or 30 mg MR 2 tablets); max 120 mg/day',
        'Switching from standard to MR': 'Standard 80 mg ≈ MR 30 mg; Standard 160 mg ≈ MR 60 mg; Standard 240–320 mg ≈ MR 90–120 mg',
      },
      paediatric: {
        'default': 'Not recommended in children and adolescents <18 yrs (no established safety/efficacy)',
      },
      geriatric: {
        'Starting dose (standard)': '40 mg PO once daily (increased sensitivity to hypoglycaemia)',
        'Starting dose (MR)': '30 mg PO once daily',
        'Max (standard)': '160 mg/day in divided doses (use lower end of range)',
        'Max (MR)': '60 mg once daily (higher hypo risk in elderly)',
      },
      renalAdjustment: 'eGFR 30–60: use with caution (prolonged half-life). MR preferred over standard. Start 30 mg MR once daily. eGFR 15–29: use only gliclazide MR with caution — start 30 mg MR on alternate days. eGFR <15: CONTRAINDIATED. Gliclazide is metabolised in the liver and excreted renally as metabolites — accumulation risk.',
      hepaticAdjustment: 'Mild-moderate: use with caution — start low, monitor glucose. Severe: CONTRAINDIATED (impaired gluconeogenesis → severe/persistent hypoglycaemia).',
    },
    interactions: [
      'INSULIN / OTHER OADs (metformin, SGLT2i, DPP-4i, GLP-1 RA, TZDs): additive hypoglycaemic effect — may need gliclazide dose reduction, monitor glucose',
      'ALCOHOL: enhanced hypoglycaemic effect (acute alcohol inhibits gluconeogenesis) — AVOID or limit to small amounts with food; can also cause disulfiram-like reaction (rare with gliclazide)',
      'BETA-BLOCKERS (atenolol, propranolol): MASKS hypoglycaemic symptoms (tachycardia, palpitations, tremor); sweating still present; may worsen glycaemic control — use cardioselective beta-blockers with caution',
      'NSAIDs (high-dose salicylates, ibuprofen): enhanced hypoglycaemic effect (protein displacement) — monitor glucose',
      'WARFARIN: enhanced anticoagulant effect (sulphonylurea potentiates warfarin — protein displacement) — monitor INR',
      'MAO INHIBITORS: enhanced hypoglycaemic effect — monitor glucose',
      'FLUCONAZOLE, MICONAZOLE: enhanced hypoglycaemic effect (CYP2C9 inhibition) — monitor glucose, may need gliclazide dose reduction',
      'RIFAMPICIN: reduced gliclazide efficacy (CYP2C9 induction) — may need gliclazide dose increase',
      'THIAZIDE DIURETICS (HCTZ): hyperglycaemic effect — may worsen glycaemic control, increase gliclazide dose if needed',
      'CORTICOSTEROIDS: hyperglycaemic effect — increase gliclazide dose',
      'BETA-2 AGONISTS (salbutamol): hyperglycaemic effect — monitor glucose',
      'ORAL CONTRACEPTIVES: hyperglycaemic effect — monitor glucose',
    ],
    monitoring: 'Baseline: HbA1c, fasting plasma glucose (FPG), Cr/eGFR, LFTs, FBC. During therapy: HbA1c every 3–6 months (target: individualised; generally <7% [53 mmol/mol] for most, <7.5% for elderly/complex); FPG/self-monitored glucose (frequency based on therapy intensity and risk); Cr/eGFR annually (or more frequently if risk factors); weight at each visit. Hypoglycaemia review: at every visit — frequency, severity (mild vs severe requiring assistance), presence of warning symptoms, time of day, awareness (impaired awareness increases risk of severe hypoglycaemia). If hypoglycaemia occurs: reduce gliclazide dose, review meal timings, review alcohol intake. Driving warning: counsel about driving regulations — hypoglycaemia while driving is dangerous; check blood glucose before driving and every 2 hours on long journeys; if hypo occurs while driving, stop, treat, wait 45 minutes after recovery before driving.',
    patient_counselling: 'Take gliclazide WITH meals (usually breakfast) — do NOT skip meals. Modified release (MR/XR): swallow whole, do NOT crush or chew. CRITICAL: Low blood sugar (hypoglycaemia) can occur — recognise the warning signs: sweating, trembling, shaking, rapid heartbeat, hunger, dizziness, blurred vision, confusion. Always carry glucose tablets (or sugar, sweets, fruit juice) and treat immediately with 15–20 g fast-acting carbohydrate. If you miss a meal, exercise more than usual, or drink alcohol — your blood sugar may drop. Do NOT drink alcohol on an empty stomach — always with food. If you have a hypo while driving: STOP the car, remove the keys, treat the hypo, wait 45 minutes after recovery before driving again. Weight gain is possible — maintain a healthy diet and exercise. Regular blood sugar monitoring and HbA1c checks (every 3–6 months) are essential.',
  },

  // ── 2. Levothyroxine ─────────────────────────────────────────────
  {
    name: 'Levothyroxine',
    generic_name: 'Levothyroxine Sodium (L-Thyroxine)',
    drug_class: 'Thyroid hormone (T₄) — synthetic',
    indications: [
      'Primary hypothyroidism (autoimmune/Hashimoto\'s, post-thyroidectomy, post-radioiodine, congenital)',
      'Secondary (central) hypothyroidism (pituitary/hypothalamic disease)',
      'Subclinical hypothyroidism (TSH >10 mIU/L or TSH 4.5–10 with symptoms, positive TPO antibodies, goitre, pregnancy planning, pregnancy)',
      'Myxoedema coma — IV levothyroxine (or liothyronine T₃) under ICU monitoring',
      'Thyroid hormone suppression therapy — TSH suppression in thyroid cancer (post-thyroidectomy)',
      'Goitre (non-toxic — TSH suppression reduces goitre size)',
      'Congenital hypothyroidism (neonatal screening — lifelong therapy)',
    ],
    contraindications: [
      'Hypersensitivity to levothyroxine or any excipient',
      'Untreated thyrotoxicosis (hyperthyroidism — any cause)',
      'Untreated adrenal insufficiency (Addison\'s disease — thyroid hormone increases cortisol metabolism → precipitates adrenal crisis)',
      'Acute myocardial infarction (untreated or within 6 weeks)',
      'Acute myocarditis',
    ],
    side_effects: [
      'SIDE EFFECTS ARE DUE TO EXCESS/OVERDOSE (thyrotoxicosis factitia) — NOT the drug itself at appropriate doses:',
      'Cardiovascular: palpitations, tachycardia (common), atrial fibrillation (especially elderly >60 yrs), hypertension, angina, heart failure exacerbation, sudden cardiac death (with overdosage)',
      'CNS: anxiety, irritability, nervousness, insomnia, tremor, headache, pseudotumour cerebri (children — with rapid replacement)',
      'Metabolic: weight loss, increased appetite, sweating, heat intolerance, hyperthermia, increased metabolic rate',
      'Gastrointestinal: diarrhoea, vomiting, abdominal cramps',
      'Dermatological: hair loss (transient — during first few months as body adjusts), flushing, sweating',
      'Musculoskeletal: muscle cramps, tremor, myopathy, palpitations — thyrotoxic periodic paralysis (rare)',
      'Endocrine: menstrual irregularities (oligomenorrhoea/amenorrhoea), reduced bone density (with prolonged TSH suppression — especially postmenopausal women)',
      'Psychiatric: agitation, psychosis (rare — with severe or rapid-onset thyrotoxicosis)',
      'Allergic: rash, urticaria, angioedema (very rare — to dye/excipient in tablets; may try another brand)',
    ],
    dosage: {
      adult: {
        'Hypothyroidism — young healthy (<60 yrs, no cardiac disease)': '1.6 µg/kg PO once daily (typical: 75–100 µg/day; start 50–100 µg/day, full replacement dose)',
        'Hypothyroidism — elderly or cardiac disease': '12.5–25 µg PO once daily; increase by 12.5–25 µg every 4–6 weeks (titrate slowly — risk of angina, arrhythmia)',
        'Subclinical hypothyroidism': '25–75 µg PO once daily (start low, titrate to TSH target)',
        'Myxoedema coma (IV)': '200–400 µg IV once (loading), then 1.6 µg/kg/day IV (reduce to oral when able) + stress-dose hydrocortisone 50–100 mg IV every 6–8 hours',
        'Thyroid cancer — TSH suppression': 'Dose titrated to TSH 0.1 mIU/L (low-risk) or <0.1 mIU/L (high-risk) — often 100–200 µg/day',
        'Pregnancy — hypothyroidism': 'Increase dose by 20–50% immediately upon confirmation of pregnancy; titrate to TSH 0.25–2.5 mIU/L (first trimester), 0.3–3.0 (second/third)',
        'Postpartum — hypothyroidism': 'Reduce dose to pre-pregnancy level (within 6–8 weeks postpartum) — recheck TSH 6 weeks postpartum',
      },
      paediatric: {
        'Neonates/congenital hypothyroidism': '10–15 µg/kg PO once daily (start immediately after confirmation — critical for neurodevelopment)',
        'Children 1–3 yrs': '5–6 µg/kg PO once daily',
        'Children 3–10 yrs': '4–5 µg/kg PO once daily',
        'Children 10–16 yrs': '2–4 µg/kg PO once daily',
        'Adolescents >16 yrs': '1.6 µg/kg PO once daily (adult dose)',
      },
      geriatric: {
        'Starting dose': '12.5–25 µg PO once daily (very slow titration — increased risk of atrial fibrillation, myocardial ischaemia)',
        'Target dose': '50–100 µg/day (often less than full replacement 1.6 µg/kg — lower lean body mass, decreased clearance)',
      },
      renalAdjustment: 'No dose adjustment required — levothyroxine is >99% protein-bound and not significantly renally cleared. Monitor TSH normally. In nephrotic syndrome (massive proteinuria): may need higher doses (free T₄ lost in urine). In ESRD/dialysis: no dose adjustment needed; hypothyroidism common in CKD — treat normally.',
      hepaticAdjustment: 'No dose adjustment required. Levothyroxine is deiodinated (activated to T₃) and conjugated in the liver. In severe cirrhosis: impaired T₄→T₃ conversion may require liothyronine (T₃) supplementation? Monitor TSH and free T₄ — T₃ not routinely measured.',
    },
    interactions: [
      'CALCIUM CARBONATE: markedly reduced levothyroxine absorption (chelation) — separate by at least 4 hours',
      'IRON (ferrous sulphate): reduced levothyroxine absorption — separate by 4 hours',
      'ALUMINIUM/MAGNESIUM ANTACIDS: reduced absorption — separate by 4 hours',
      'PROTON PUMP INHIBITORS (omeprazole, pantoprazole): reduced levothyroxine absorption (increased gastric pH reduces dissolution) — may need higher dose; monitor TSH',
      'SUCRALFATE: reduced levothyroxine absorption — separate by 4 hours',
      'SEVELAMER (phosphate binder in CKD): reduced levothyroxine absorption — separate by 4 hours',
      'OESTROGENS (oral contraceptives, HRT): increased TBG (thyroid-binding globulin) — may require levothyroxine dose increase (20–30%)',
      'RIFAMPICIN: increased levothyroxine metabolism (induction of hepatic clearance) — may need dose increase',
      'PHENYTOIN, CARBAMAZEPINE: increased levothyroxine metabolism (induction) — monitor TSH',
      'SERTRALINE, CHLOROQUINE: increased levothyroxine requirements — monitor TSH',
      'TYROSINE KINASE INHIBITORS (imatinib, sunitinib, sorafenib): increased levothyroxine metabolism — may need substantial dose increase',
      'WARFARIN: levothyroxine INCREASES warfarin effect (increases catabolism of vitamin K-dependent clotting factors) — monitor INR closely when starting/stopping levothyroxine, reduce warfarin dose as needed',
      'INSULIN / ORAL HYPOGLYCAEMICS: levothyroxine may increase insulin requirements (increases metabolic rate → increases glucose turnover) — monitor glucose',
      'BETA-BLOCKERS: reduced efficacy of beta-blockers in hyperthyroid state — ensure euthyroid before expecting beta-blocker effect',
    ],
    patientAbsorptionInteractions: [
      'Take levothyroxine on an EMPTY STOMACH at least 30–60 minutes BEFORE breakfast (first thing in the morning).',
      'Separate from calcium supplements, iron supplements, antacids, PPIs, sucralfate, sevelamer, and orlistat by at least 4 HOURS.',
      'Take with a FULL GLASS OF WATER (not other beverages).',
      'Consistency matters most — whatever time you choose, take it the same way every day.',
    ],
    monitoring: 'Baseline: TSH, free T₄ (FT₄), TPO antibodies (if autoimmune suspected), pregnancy test (if considering pregnancy). During therapy: TSH every 4–6 weeks after initiation or dose change (until target reached); once stable, TSH every 6–12 months; more frequent in pregnancy, elderly, cardiac disease, or when interacting drugs are started/stopped. Target TSH: primary hypothyroidism — 0.5–2.5 mIU/L (young), 4–6 mIU/L (elderly? no — target same range but slower titration); pregnancy — first trimester 0.25–2.5, second 0.3–3.0, third 0.3–3.0; thyroid cancer — <0.1 (high-risk), 0.1–0.5 (low-risk). NEVER monitor T₃ (liothyronine) for dose adjustment — T₃ fluctuates too rapidly. AM duration: take sample BEFORE levothyroxine dose (after overnight fast) for accurate TSH. If FT₄ is high but TSH is normal: patient may be taking levothyroxine just before blood draw — no dose change needed. If FT₄ is high and TSH is suppressed: over-replacement — reduce dose. If FT₄ is low and TSH is high: under-replacement — increase dose. Thyroid cancer surveillance: Tg (thyroglobulin) + anti-Tg antibodies as tumour marker — annually.',
    patient_counselling: 'Take on an EMPTY STOMACH, first thing in the morning, with a full glass of water — wait at least 30–60 minutes before eating or drinking (except water). Do NOT take with coffee — coffee significantly reduces absorption. Do NOT take within 4 hours of calcium supplements, iron tablets, antacids, or multivitamins. This is a LIFELONG medicine for most people — do NOT stop even if you feel well. Missing a dose: if forgotten, take it as soon as remembered within 2–3 hours; if remembered later, skip and take the next dose at the usual time — NEVER double dose. Regular blood tests (TSH) every 6–12 months are essential to ensure the dose is correct. If you become pregnant, inform your doctor IMMEDIATELY — your dose will likely need to be increased (by ~30–50%) as early as possible to protect the baby\'s brain development. If you stop taking it for more than a few days, restart at the same dose. Too much medicine: heart racing, anxiety, sweating, weight loss, palpitations, diarrhoea. Too little: tiredness, weight gain, feeling cold, constipation, depression. Report either to your doctor — dose adjustment takes effect over 4–6 weeks.',
  },

  // ── 3. Hydrocortisone ────────────────────────────────────────────
  {
    name: 'Hydrocortisone',
    generic_name: 'Hydrocortisone',
    drug_class: 'Corticosteroid (glucocorticoid with mineralocorticoid activity — short-acting)',
    indications: [
      'Adrenal insufficiency (Addison\'s disease, secondary/central adrenal insufficiency) — PHYSIOLOGICAL REPLACEMENT',
      'Adrenal crisis (acute) — IV hydrocortisone is LIFESAVING',
      'Congenital adrenal hyperplasia (CAH) — glucocorticoid replacement to suppress ACTH excess',
      'Septic shock — stress-dose/physiological-dose hydrocortisone (200–300 mg/day IV) if vasopressor-resistant (SSC guidelines)',
      'Severe allergic reactions / anaphylaxis — adjunctive (after adrenaline)',
      'Acute severe asthma exacerbation — IV/oral (alternative to prednisolone)',
      'Rheumatic/connective tissue disease flares — high-dose pulse therapy',
      'Topical: inflammatory skin conditions (eczema, dermatitis, psoriasis — various potencies from HC 0.5–2.5% cream/ointment)',
      'Cerebral oedema (high-dose dexamethasone preferred, but hydrocortisone used if dexamethasone unavailable)',
      'Inflammatory bowel disease — acute severe UC/Crohn\'s (IV hydrocortisone 100 mg four times daily)',
    ],
    contraindications: [
      'Hypersensitivity to hydrocortisone or any corticosteroid',
      'Systemic fungal infection (untreated — relative: treat infection first, then use cautiously)',
      'Live virus vaccines (during high-dose immunosuppressive therapy)',
      'Peptic ulcer disease (active — relative, use with PPI)',
      'Severe osteoporosis (relative — monitor BMD)',
      'Uncontrolled diabetes (relative — monitor glucose)',
    ],
    side_effects: [
      'SIDE EFFECTS ARE DOSE- AND DURATION-DEPENDENT — physiological replacement doses have minimal side effects; supraphysiological doses cause Cushing\'s syndrome with prolonged use.',
      'Endocrine: hyperglycaemia (common with high doses), Cushing\'s syndrome (moon face, buffalo hump, central obesity, striae, hirsutism, acne), HPA axis suppression, growth suppression (children)',
      'Metabolic: weight gain, sodium/water retention (mineralocorticoid activity — oedema, hypertension, hypokalaemia — more than prednisolone but less than fludrocortisone; at high IV doses >100 mg/day, mineralocorticoid effect is significant)',
      'Musculoskeletal: osteoporosis (dose- and duration-dependent), avascular necrosis (especially femoral head), myopathy (proximal muscle weakness), tendon rupture',
      'Gastrointestinal: peptic ulceration/gastritis (especially with NSAIDs), pancreatitis, oesophageal candidiasis',
      'Dermatological: skin thinning, fragile skin, impaired wound healing, bruising, striae, acne, hirsutism, hyperpigmentation (deposition of fragmented elastin fibres)',
      'CNS: insomnia, euphoria, depression, psychosis, pseudotumour cerebri (children), mood lability',
      'Cardiovascular: hypertension (sodium retention), heart failure exacerbation (fluid overload), hypokalaemic metabolic alkalosis (at high doses)',
      'Ocular: posterior subcapsular cataracts, glaucoma (open-angle), central serous chorioretinopathy, exacerbation of ocular infections',
      'Immunological: increased susceptibility to infections (TB reactivation, fungal, viral, bacterial), impaired wound healing, masking of infection signs',
    ],
    dosage: {
      adult: {
        'Physiological replacement (adrenal insufficiency)': '15–25 mg PO once daily in divided doses (usually 10 mg AM + 5 mg early PM (16:00) + 5 mg (or 2.5–5 mg) late afternoon (20:00) — mimic diurnal rhythm; minimal dose to avoid metabolic side effects)',

        'Stress dosing (adrenal insufficiency) — minor illness (fever, URTI)': 'Double or triple maintenance dose for 3–5 days (e.g., 20 mg AM + 10 mg early PM + 10 mg late PM)',
        'Stress dosing — moderate illness (fever >38.5°C, vomiting, diarrhoea, surgery)': '50–100 mg IV/IM every 6–8 hours until recovery',
        'Stress dosing — major surgery / critical illness': '100 mg IV bolus then 50–100 mg IV every 6 hours for 24–48 hours (post-op, taper by 50% per day to maintenance)',
        'Adrenal crisis (acute)': '100 mg IV bolus immediately, then 100–200 mg IV over 24 hours (continuous infusion or 50 mg IM/IV every 6 hours) + NS/D5W fluid resuscitation',
        'CAH — maintenance': '10–20 mg/m²/day PO divided 3 times daily (individualised based on 17-OHP levels, growth, and clinical status)',
        'Septic shock (vasopressor-resistant)': '200 mg/day IV (as 50 mg IV every 6 hours or 200 mg continuous infusion) for 7 days or until shock resolution (then taper)',
        'Severe asthma exacerbation': '200 mg IV stat, then 100–200 mg IV every 6 hours for 24 hours, then switch to prednisolone 40–50 mg PO once daily',
        'Acute severe UC': '100 mg IV every 6–8 hours for 5–7 days, then switch to oral prednisolone 40 mg once daily taper',
      },
      paediatric: {
        'Physiological replacement': '8–12 mg/m²/day PO divided 3 times daily (age-appropriate dosing: 2.5–5 mg AM, 1.25–2.5 mg early PM, 1.25–2.5 mg late PM)',
        'Stress dosing': '50–100 mg/m² IV/IM bolus then 50–100 mg/m²/day divided every 6 hours',
        'CAH — children': '10–15 mg/m²/day PO divided 3 times daily (individualised)',
        'Congenital adrenal hyperplasia — neonatal/salt-wasting': 'Also requires fludrocortisone 0.05–0.2 mg PO daily + sodium chloride supplementation',
      },
      renalAdjustment: 'No dose adjustment required. Hydrocortisone is primarily hepatically metabolised and not significantly renally cleared. Monitor for fluid overload at high IV doses (Na+ retention).',
      hepaticAdjustment: 'Moderate-severe hepatic impairment: reduced cortisol clearance → may need lower doses (reduced 11β-HSD2 activity → increased cortisol half-life). Monitor clinical response. In severe cirrhosis, oral hydrocortisone may have reduced bioavailability — consider IV for acute stress.',
    },
    interactions: [
      'NSAIDs (ibuprofen, diclofenac, naproxen): SIGNIFICANTLY increased GI bleeding/ulcer risk — use PPI cover, avoid if possible',
      'WARFARIN: variable effect on INR (steroids affect clotting factor metabolism) — monitor INR when starting/stopping',
      'ANTIDIABETIC AGENTS (insulin, sulphonylureas): hyperglycaemic effect may require 50–100% increase in insulin/OAD dose — monitor glucose very closely',
      'ANTIHYPERTENSIVES: reduced antihypertensive efficacy (Na+/water retention) — monitor BP',
      'DIURETICS (loop, thiazide): additive hypokalaemia — monitor K+, supplement if needed',
      'AMPHOTERICIN B: additive hypokalaemia — monitor K+ closely',
      'RIFAMPICIN, PHENYTOIN, CARBAMAZEPINE, PHENOBARBITAL: increased hydrocortisone metabolism (CYP3A4 induction) — may need dose increase',
      'KETOCONAZOLE, ITRACONAZOLE: reduced hydrocortisone metabolism (CYP3A4 inhibition) — may need dose reduction',
      'OESTROGENS (OCP, HRT): increased corticosteroid levels — may need dose reduction',
      'LIVE VACCINES: CONTRAINDIATED during high-dose immunosuppression — defer vaccine until HC <20 mg/day for >2 weeks',
      'ANTICHOLINESTERASES (neostigmine, pyridostigmine): severe weakness in myasthenia gravis — corticosteroids may antagonise these drugs',
      'GROWTH HORMONE: reduced GH efficacy — may need dose adjustment',
    ],
    monitoring: 'Physiological replacement: clinical symptoms (fatigue, hyperpigmentation, GI symptoms, weight loss, postural hypotension), BP (sitting/standing), glucose, electrolytes (Na+, K+ — ensure replacement not causing HTN or hypokalaemia), weight. CAH: 17-OHP levels (maintain mid-normal range), androstenedione, renin, growth (children — height velocity), bone age, signs of hyperandrogenism. Stress dosing: haemodynamics, glucose (hyperglycaemia common), electrolytes, mental status. Adrenal crisis: clinical response (BP, glucose, electrolytes within 4–6 hours). Long-term supraphysiological dosing: bone density (DEXA annually — if on >7.5 mg/day prednisolone equivalent for >3 months); glucose/HbA1c every 3–6 months; eye exam (cataract, glaucoma) annually. HPA axis status: if adrenal insufficiency suspected, perform SST (Synacthen/ACTH stimulation test) at baseline and periodically after stopping supraphysiological steroids.',
    patient_counselling: 'LIFELONG REPLACEMENT (if you have adrenal insufficiency): NEVER stop taking this medicine — your body cannot produce cortisol on its own. If you stop, you may develop an adrenal crisis (vomiting, abdominal pain, low BP, loss of consciousness, death). SICK DAY RULES: If you have fever (≥38°C), vomiting, diarrhoea, or infection — DOUBLE or TRIPLE your oral dose. If you cannot keep tablets down due to vomiting — go to the emergency department immediately for an injection. Wear a MedicAlert bracelet or carry a steroid card stating "Adrenal Insufficiency — Requires Hydrocortisone". On this card, include your name, diagnosis, daily dose, emergency contact, and doctor\'s details. If you are having surgery, dental procedures, or any procedure under anaesthesia — you MUST receive stress-dose steroids. Inform all healthcare providers. Take doses at set times (mimicking the body\'s rhythm: largest dose in the morning, smaller dose(s) in the afternoon/evening). Do NOT take with NSAIDs (ibuprofen, diclofenac) — increased risk of stomach ulcers. If you have diabetes, monitor blood sugar closely — steroids can raise glucose levels.',
  },

  // ── 4. Ferrous Sulphate ──────────────────────────────────────────
  {
    name: 'Ferrous Sulphate',
    generic_name: 'Ferrous Sulfate (Dried)',
    drug_class: 'Oral iron preparation (haematinic)',
    indications: [
      'Iron deficiency anaemia (IDA) — treatment and correction of iron stores (most common cause of anaemia worldwide)',
      'Iron deficiency without anaemia — to replete stores (fatigue, restless legs syndrome, pica, hair loss, brittle nails)',
      'Prophylaxis in high-risk groups: pregnancy (universal supplementation in many LMIC — standard: 60 mg elemental iron + 400 µg folic acid daily), preterm/low birth weight infants, heavy menstrual bleeding, bariatric surgery, chronic kidney disease (with ESA therapy), malabsorption (IBD, coeliac)',
    ],
    contraindications: [
      'Hypersensitivity to ferrous sulphate or any component',
      'Haemochromatosis, haemosiderosis, or iron overload (primary hereditary or secondary)',
      'Anaemia NOT due to iron deficiency: thalassaemia (iron overload risk), sideroblastic anaemia (can overload), anaemia of chronic disease (inflammation — iron may be harmful), megaloblastic anaemia (B12/folate deficiency — iron may mask)',
      'Peptic ulcer disease (active — oral iron can exacerbate gastritis)',
      'Repeated blood transfusions (increased iron overload risk)',
      'Haemolytic anaemia (may worsen haemolysis — unclear, but avoid unless iron-deficient)',
    ],
    side_effects: [
      'Gastrointestinal (dose-related — most common cause of non-adherence): nausea, epigastric pain, abdominal cramps, diarrhoea, constipation (common — iron hardens stools), black/dark stools (harmless — due to unabsorbed ferrous sulphide), metallic taste, staining of teeth (liquid preparations — use straw, rinse mouth)',
      'Gastric irritation is less with ferrous bisglycinate or ferrous gluconate (alternative formulations if intolerant)',
      'Hypersensitivity: rash, pruritus, urticaria, anaphylaxis (very rare)',
      'Iron overload (with prolonged unnecessary therapy — suspect if ferritin >300 µg/L)',
      'Acute iron poisoning (ingestion in children >20 mg/kg elemental iron — serious toxicity: vomiting, diarrhoea, haematemesis, metabolic acidosis, hepatic necrosis, coagulopathy, cardiovascular collapse — urgent medical care; treat with IV desferrioxamine)',
    ],
    dosage: {
      adult: {
        'Treatment of IDA — elemental iron': '100–200 mg elemental iron PO per day (e.g., ferrous sulphate 200 mg = 65 mg elemental — give 1 tablet 2–3 times daily; ferrous sulphate 300 mg = 60 mg elemental — give 1 tablet 2–3 times daily)',
        'Treatment — duration': 'Continue for 3–6 months AFTER Hb normalisation to replete iron stores (ferritin >30 µg/L)',
        'Prophylaxis (pregnancy)': '60 mg elemental iron + 400 µg folic acid PO once daily (Kenya guidelines — all pregnant women, throughout pregnancy and postpartum)',
        'Prophylaxis (heavy menses)': '60 mg elemental iron PO once daily (or intermittently: every other day or 1 week per menstrual cycle — less GI side effects)',
        'CKD with ESA therapy': 'Supplement to maintain ferritin >200–500 µg/L and TSAT >20–30% (oral iron often insufficient → IV iron preferred in dialysis)',
      },
      paediatric: {
        'Treatment — infants and children': '3–6 mg/kg/day elemental iron PO divided 1–2 times daily (max 200 mg/day; liquid formulations: ferrous sulphate drops 25 mg Fe/mL)',
        'Treatment — adolescents': '60–120 mg elemental iron PO once daily to twice daily',
        'Prophylaxis — preterm infants': '2–4 mg/kg/day elemental iron PO once daily from 2 weeks of age until 12 months',
        'Prophylaxis — term infants': '<6 months: 1 mg/kg/day (if exclusively breastfed after 4 months); 6–24 months: 11 mg/day if inadequate iron in diet',
      },
      geriatric: {
        'Treatment': '65 mg elemental iron PO once daily to twice daily (start lower — increased GI sensitivity; assess for B12/folate deficiency before initiating)',
      },
      renalAdjustment: 'No dose adjustment for oral iron per se — but oral iron absorption and tolerance are impaired in advanced CKD (hepcidin blocks absorption). IV iron often needed for patients on dialysis. Monitor ferritin and TSAT to avoid overload.',
      hepaticAdjustment: 'Contraindicated in haemochromatosis and iron overload. In cirrhosis (especially alcoholic), iron overload can occur even with normal iron intake — check ferritin, TSAT before starting. Monitor for hepatic iron overload.',
      formulationComparison: {
        'Ferrous sulphate (dried) 200 mg': '65 mg elemental iron (most common — high bioavailability, low cost, more GI side effects)',
        'Ferrous fumarate 200 mg': '65 mg elemental iron (similar bioavailability, slightly less GI irritation)',
        'Ferrous gluconate 300 mg': '35 mg elemental iron (lowest elemental iron content, best GI tolerance, more tablets needed)',
        'Ferrous bisglycinate 25 mg': '25 mg elemental iron (best tolerated, no constipation, more expensive)',
      },
    },
    interactions: [
      'TETRACYCLINES (doxycycline, tetracycline): markedly reduced absorption of both (chelation) — separate by 2–4 hours',
      'FLUOROQUINOLONES (ciprofloxacin, levofloxacin): reduced absorption of quinolone — separate by 2–4 hours',
      'PENICILLAMINE: reduced penicillamine absorption — separate by 2–3 hours',
      'LEVOTHYROXINE: reduced levothyroxine absorption — separate by 4 hours',
      'BISPHOSPHONATES (alendronate, risedronate): reduced bisphosphonate absorption — separate by 2 hours',
      'CALCIUM SUPPLEMENTS, DAIRY PRODUCTS: reduced iron absorption — separate by 1–2 hours or take iron with vitamin C source (e.g., orange juice) to enhance absorption',
      'ANTACIDS (aluminium, magnesium, calcium): reduced iron absorption — separate by 2 hours',
      'PROTON PUMP INHIBITORS (omeprazole): reduced iron absorption (decreased gastric acid reduces Fe³⁺→Fe²⁺ conversion) — may require higher iron dose or IV iron',
      'H₂ BLOCKERS (ranitidine, famotidine): reduced iron absorption — same mechanism as PPIs',
      'TANNINS (in tea, coffee, red wine): significantly reduced iron absorption — avoid taking within 1 hour before or 2 hours after iron. Take iron with vitamin C (e.g., orange juice) to enhance absorption and counteract tannin effect',
      'CHOLESTYRAMINE: reduced iron absorption — separate by 2–3 hours',
      'VITAMIN C (ascorbic acid): ENHANCES iron absorption (250–500 mg vitamin C with iron dose increases absorption 2–3 fold — Fe³⁺ → Fe²⁺ conversion at acidic pH)',
      'ERYTHROPOIETIN (EPO, darbepoetin): oral iron combined with ESA is essential to prevent functional iron deficiency — adequate iron stores enhance erythropoiesis',
    ],
    monitoring: 'Baseline: FBC with indices (MCV, MCH, Hb, RDW), ferritin, iron studies (serum iron, TIBC, TSAT), CRP (to rule out functional deficiency in inflammation), vitamin B12, folate, haemoglobin electrophoresis (thalassaemia screen). During therapy: FBC, Hb reticulocyte count at 2–4 weeks — if Hb rise <10 g/L at 4 weeks → assess adherence, ongoing blood loss, incorrect diagnosis (B12/folate/thalassaemia/ACD) or malabsorption (coeliac, H. pylori, atrophic gastritis). Ferritin — recheck after completing therapy (3–6 months) to confirm repleted stores. If ferritin is >100–150 µg/L after treatment while still anaemic → investigate for mixed/generic anaemia (B12, folate, haemolysis, bone marrow). Stool for occult blood if persistent iron deficiency. Upper GI endoscopy / colonoscopy: in men and postmenopausal women with confirmed iron deficiency anaemia (to exclude GI bleeding — cancer, angiodysplasia, peptic ulcer, IBD).',
    patient_counselling: 'Your stools will turn DARK BLACK or greenish-black — this is HARMLESS (due to unabsorbed iron). If they become tarry and foul-smelling, that could be blood — seek medical attention. Take iron on an EMPTY STOMACH (1 hour before or 2 hours after meals) for best absorption — but if stomach upset occurs, take with a small amount of food (avoid dairy, tea, coffee, whole grains at the same time). Do NOT take with tea, coffee, or milk — they reduce absorption. Take with vitamin C (orange juice, vitamin C supplement) to increase absorption. Side effects (nausea, constipation, stomach cramps) are common — if constipated, increase fluid and fibre intake, consider a stool softener. Liquid iron may stain teeth — use a straw and rinse mouth after. Keep iron tablets out of reach of children — overdose can be fatal. It takes 2–4 weeks to feel better, and 3–6 months to fully replete iron stores — continue taking even once your anaemia is corrected.',
  },

  // ── 5. Folic Acid ─────────────────────────────────────────────────
  {
    name: 'Folic Acid',
    generic_name: 'Folic Acid (Vitamin B₉)',
    drug_class: 'Water-soluble B vitamin (folate)',
    indications: [
      'Megaloblastic anaemia due to folate deficiency',
      'Prophylaxis in pregnancy — prevents neural tube defects (NTDs: spina bifida, anencephaly) — start before conception and continue through first 12 weeks',
      'Chronic haemolytic anaemias (sickle cell disease, thalassaemia) — increased folate demand — standard supplementation',
      'Malabsorption states (coeliac disease, IBD, bariatric surgery, tropical sprue)',
      'Chronic renal failure (folate loss during dialysis)',
      'Methotrexate therapy — minimise MTX side effects (but MTX is a DHFR inhibitor — HIGH-DOSE FOLATE or leucovorin rescue is given, NOT folic acid during MTX course; low-dose folic acid on non-MTX days is safe)',
      'Alcoholism (folate deficiency common — poor diet, malabsorption, increased excretion)',
      'Phenytoin, phenobarbital, primidone (anticonvulsants reduce folate levels — supplementation recommended; but folate can reduce phenytoin levels — monitor)',
      'Age-related hearing loss (trials show high-dose folate may slow progression)',
      'Depression (adjunctive — in folate-deficient patients, supplementation may enhance SSRI response)',
    ],
    contraindications: [
      'Hypersensitivity to folic acid or any component',
      'Untreated pernicious anaemia (vitamin B12 deficiency) — folic acid can CORRECT the anaemia of B12 deficiency but ALLOWS NEUROLOGICAL DAMAGE to progress (subacute combined degeneration of the cord — irreversible) — ALWAYS rule out B12 deficiency before starting folic acid',
      'Malignancy (relative — folate can theoretically promote tumour growth in existing cancer — is unclear; avoid in active malignancy unless treating deficiency)',
      'Allergy to any component (rare)',
    ],
    side_effects: [
      'Folic acid is very well tolerated — side effects are rare and usually mild:',
      'Gastrointestinal: nausea, abdominal distension, flatulence, bitter taste, anorexia (rare)',
      'CNS: irritability, excitability, sleep disturbances, difficulty concentrating (very rare)',
      'Dermatological: rash, pruritus, urticaria, erythema, anaphylactic reaction (very rare — usually to yellow dye in tablets)',
      'Masking of B12 deficiency: if folic acid is given without B12 in undiagnosed pernicious anaemia, the haematological response (Hb rise, MCV normalisation) may occur while NEUROLOGICAL DAMAGE progresses — this is the most important safety concern',
      'Hypersensitivity: fever, bronchospasm (very rare)',
    ],
    dosage: {
      adult: {
        'Treatment of folate deficiency anaemia': '5 mg PO once daily for 4 months (until Hb normalised and red cells repleted) — OR until term in pregnancy if found to be folate deficient',
        'Prophylaxis — pregnancy (standard)': '400 µg (0.4 mg) PO once daily — start at least 1 month before conception, continue through first 12 weeks of pregnancy (all women of childbearing potential in many countries)',
        'Prophylaxis — pregnancy (high-risk: previous NTD, family history, anti-epileptic drugs, diabetes, obesity, maternal coeliac)': '5 mg PO once daily — start 3 months before conception, continue through first 12 weeks',
        'Prophylaxis — SCD / thalassaemia / haemolytic anaemia': '5 mg PO once daily',
        'Prophylaxis — IBD / coeliac / malabsorption': '5 mg PO once daily',
        'Prophylaxis — haemodialysis': '1–5 mg PO once daily (post-dialysis)',
        'Prophylaxis — methotrexate therapy': '5 mg PO once weekly on a DIFFERENT DAY from MTX (not daily — daily folate may reduce MTX efficacy)',
        'Alcoholism — prevention': '1 mg PO once daily',
      },
      paediatric: {
        'Treatment of folate deficiency': '0.5–5 mg PO once daily (weight-based: 0.5 mg if <1 yr, 2.5 mg if 1–4 yrs, 5 mg if ≥5 yrs) for 4 months',
        'SCD prophylaxis': '1 mg PO once daily (children; adult dose 5 mg from age 12)',
        'Prophylaxis — all infants (some LMIC guidelines)': '0.4 mg/day from 6 months (or iron-folate combination)',
      },
      renalAdjustment: 'Haemodialysis: 1–5 mg after dialysis (folate is removed by dialysis). Peritoneal dialysis: 0.5–1 mg PO daily. No dose adjustment in CKD not on dialysis.',
      hepaticAdjustment: 'No dose adjustment required. Folic acid is reduced to tetrahydrofolate (active form) in the liver. In severe cirrhosis: absorption and conversion may be impaired — consider folinic acid (leucovorin) if needed.',
    },
    interactions: [
      'METHOTREXATE: folic acid and MTX compete for DHFR. HIGH-DOSE FOLATE can reduce MTX efficacy (especially in rheumatoid arthritis and psoriasis). In RA/psoriasis: give folic acid 5 mg PO once weekly on a DIFFERENT DAY from MTX (not daily). In malignancy (high-dose MTX): use folinic acid (leucovorin) rescue protocol.',
      'PHENYTOIN: folic acid can increase phenytoin metabolism and REDUCE phenytoin levels (increased clearance) — monitor phenytoin levels, adjust phenytoin dose when starting/stopping folic acid',
      'PHENOBARBITAL, PRIMIDONE: reduced anticonvulsant levels (same mechanism as phenytoin) — monitor seizure control',
      'PYRIMETHAMINE: pyrimethamine is a DHFR inhibitor (antimalarial/toxoplasmosis) — folic acid can reduce pyrimethamine efficacy at high doses — use folinic acid 5–15 mg/day instead (bypasses DHFR)',
      'TRIMETHOPRIM (co-trimoxazole): TMP is a weak DHFR inhibitor — high-dose folic acid may reduce efficacy — no dose adjustment needed for standard TMP-SMX prophylaxis',
      'SULFASALAZINE: reduced folic acid absorption (competitive inhibition of folate absorption in the jejunum) — may need higher folate doses (5 mg daily) in patients on sulfasalazine',
      'ORAL CONTRACEPTIVES: possibly reduced folate levels (impaired absorption) — no dose adjustment needed but ensure adequate folate intake if deficiency is confirmed',
      'CHOLESTYRAMINE: reduced folic acid absorption — separate by 2–3 hours',
      'METFORMIN: mildly reduced folate levels (reduced absorption? uncertain) — no dose adjustment needed',
      'ALCOHOL: reduced folate absorption and increased excretion — supplement 1–5 mg/day in chronic alcoholism',
    ],
    monitoring: 'Baseline: FBC (Hb, MCV, MCH — macrocytic anaemia), reticulocyte count, serum folate, vitamin B12 (ESSENTIAL — to rule out B12 deficiency before starting folate), ferritin (if combined deficiency), LFTs. During therapy: FBC and reticulocyte count: 7–10 days after starting — reticulocytosis confirms response; FBC every 2–4 weeks until Hb normalised. Serum folate: if response inadequate. Serum B12: monitor if initially low — replace B12 simultaneously. Long-term: FBC every 3–6 months if on maintenance therapy (SCD, chronic haemolysis). B12 levels annually (if on long-term high-dose folate — to prevent masked B12 deficiency). In pregnancy: red cell folate at booking (optimally >906 nmol/L for NTD prevention). If on phenytoin: phenytoin levels 2–4 weeks after starting/stopping folic acid.',
    patient_counselling: 'Take exactly as prescribed. If you are or could become pregnant, it is ESSENTIAL to take folic acid BEFORE pregnancy and during the first 12 weeks — it prevents serious birth defects of the spine and brain (neural tube defects). For pregnant women at high risk (previous NTD, epilepsy medicines, diabetes, obesity): take 5 mg daily, not the standard 400 µg. BEFORE starting folic acid, your doctor must check your vitamin B12 level — giving folic acid without B12 in someone with B12 deficiency can mask the B12 deficiency and allow nerve damage to progress. This is rare (pernicious anaemia is most common in older adults of northern European descent). If you take methotrexate for arthritis, take folic acid on a DIFFERENT DAY of the week (e.g., if MTX on Monday, take folic acid on Friday) — do NOT take daily. If you have sickle cell disease or thalassaemia, take folic acid daily as prescribed — your body needs extra due to increased blood cell production.',
  },

  // ── 6. Cyanocobalamin (Vitamin B12) ───────────────────────────────
  {
    name: 'Cyanocobalamin',
    generic_name: 'Cyanocobalamin (Vitamin B₁₂)',
    drug_class: 'Water-soluble B vitamin (cobalamin)',
    indications: [
      'Pernicious anaemia (autoimmune — lack of intrinsic factor → B12 malabsorption) — lifelong parenteral B12 required',
      'Vitamin B12 deficiency (nutritional, malabsorption, post-bariatric surgery, gastrectomy, ileal resection, Crohn\'s disease, coeliac disease, pancreatic insufficiency, chronic atrophic gastritis, HIV, chronic PPI/H₂ blocker use, metformin use, nitrous oxide abuse, vegetarian/vegan diets, pregnancy)',
      'Megaloblastic anaemia due to B12 deficiency',
      'Subacute combined degeneration of the spinal cord (neuropsychiatric manifestations of B12 deficiency — irreversible if untreated for too long)',
      'Peripheral neuropathy associated with B12 deficiency',
      'Cognitive decline / dementia (if B12 deficient — replacing B12 may improve cognition; no evidence for supplementation in non-deficient)',
      'Prophylaxis after total gastrectomy, ileal resection, or bariatric surgery (lifelong B12)',
      'Prophylaxis in strict vegans (oral B12 supplements 50–100 µg daily or 2,000 µg weekly)',
      'Tobacco amblyopia / nutritional optic neuropathy (toxic-nutritional — high-dose hydroxocobalamin preferred)',
      'Cyanide poisoning (hydroxocobalamin — a different formulation — is the specific antidote; cyanocobalamin is NOT used for this)',
    ],
    contraindications: [
      'Hypersensitivity to cyanocobalamin, cobalt, or any component',
      'Leber\'s hereditary optic atrophy (LHON) — cyanocobalamin can precipitate severe and rapid optic atrophy — use hydroxocobalamin instead or avoid if confirmed LHON',
      'Polycythaemia vera (can stimulate erythropoiesis — may exacerbate)',
      'Severe hypokalaemia (B12 therapy rapidly corrects anaemia, consuming K+ for erythropoiesis — can cause fatal hypokalaemia in severe deficiency — monitor K+ and supplement if needed)',
      'Infectious mononucleosis? (some historical concerns — not a true contraindication)',
    ],
    side_effects: [
      'B12 is very well tolerated — most side effects are injection-related or very rare:',
      'Injection site: pain, redness, swelling, itching, induration (common — especially IM injection)',
      'Hypersensitivity: rash, pruritus, urticaria, angioedema, anaphylaxis (very rare — <0.01%)',
      'Hypokalaemia (treatment-induced — expected in first 48 hours of severe B12 replacement as erythropoiesis consumes potassium — monitor K+ in initial treatment of severe deficiency)',
      'Cardiovascular: transient tachycardia, palpitations (as anaemia corrects), peripheral oedema, CHF exacerbation (in severe anaemia — rapid Hb increase can overload circulation — "transfusion-like reaction")',
      'Dermatological: acneiform eruption, exfoliative dermatitis (very rare)',
      'GI: nausea, vomiting, diarrhoea (rare)',
      'Haematological: polycythaemia (with excessive or unnecessary B12 therapy)',
      'CNS: mild transient diarrhoea — or peripheral neuropathy (rarely, with injections)',
      'Electrolyte: gout (increased uric acid — from rapid cell turnover as anaemia corrects — treat with allopurinol if symptomatic)',
    ],
    dosage: {
      adult: {
        'Pernicious anaemia / severe deficiency — loading (parenteral)': 'cyanocobalamin 1,000 µg IM every other day for 1–2 weeks (total 5–7 doses in 2 weeks), then 1,000 µg IM weekly for 4–8 weeks, then 1,000 µg IM monthly for life',
        'B12 deficiency without neurological involvement — maintenance': '1,000 µg IM monthly (or 1,000–2,000 µg sublingual/PO daily if absorption intact — only if intrinsic factor not required)',
        'B12 deficiency WITH neurological involvement': '1,000 µg IM every other day for 2 weeks (until no further improvement), then 1,000 µg IM weekly for 4 weeks, then monthly for life',
        'Post-gastrectomy / bariatric surgery — prophylaxis': '1,000 µg IM monthly (lifelong)',
        'Vegan — oral prophylaxis': '50–100 µg PO once daily (or 2,000 µg PO once weekly) — if absorption is normal (check B12 levels after 3 months)',
        'Metformin-associated B12 deficiency': '1,000 µg PO once daily or 1,000 µg IM monthly (oral high-dose is often sufficient if absorption intact)',
      },
      paediatric: {
        'B12 deficiency — loading': '1,000 µg IM for 5–7 doses over 2 weeks (children: 50–100 µg IM for 5–7 doses over 2 weeks — then weekly × 4)',
        'Maintenance': '100–1,000 µg IM monthly (adjust based on response and B12 levels)',
        'Infants with inborn errors of B12 metabolism (methylmalonic acidaemia, homocystinuria)': 'Hydroxocobalamin 1,000 µg IM 1–2 times weekly (NOT cyanocobalamin — hydroxocobalamin is preferred)',
      },
      renalAdjustment: 'No dose adjustment required. B12 is excreted renally — excess is lost in urine. In ESRD/dialysis: B12 may be removed by dialysis — monitor B12 levels and supplement as needed (usually standard doses). Higher rates of B12 deficiency in dialysis patients.',
      hepaticAdjustment: 'No dose adjustment required. B12 is stored extensively in the liver (~2,500 µg in healthy adults — up to 3–5 years\' supply). In severe cirrhosis: stores may be depleted — treat as per standard dosing.',
      formulations: {
        'Hydroxocobalamin': 'Preferred in the UK and many countries — longer half-life (retained longer in body), less frequent injections (1,000 µg IM every 2–3 months). Also FIRST-LINE for cyanide poisoning (5 g IV).',
        'Cyanocobalamin': 'Most common in USA/Asia — shorter half-life, requires monthly injections or high-dose sublingual/oral.',
        'Methylcobalamin': 'The active form for neurological function — oral/sublingual 1,000–5,000 µg daily; parenteral used in Japan. No clear superiority over cyanocobalamin for routine deficiency.',
      },
    },
    interactions: [
      'METFORMIN: reduces B12 absorption (10–30% of metformin users develop low B12 — especially with long-term use >4 years, high dose, and in elderly). Mechanism: metformin interferes with calcium-dependent B12–IF complex absorption at terminal ileum. Monitor B12 annually in diabetic patients on metformin. Supplement 1,000 µg PO daily if deficient.',
      'PROTON PUMP INHIBITORS (omeprazole, pantoprazole, lansoprazole): reduce B12 absorption (impaired gastric acid and pepsin release → reduced B12 cleavage from food proteins). Long-term use (>2 years) increases risk of B12 deficiency. Supplement PO B12 50–100 µg or monitor B12 levels. Sublingual formulation may partially bypass this — but high-dose PO B12 (1,000 µg) — no gastric acid needed for absorption',
      'H₂ BLOCKERS (ranitidine, famotidine, cimetidine): same mechanism as PPIs (less potent) — monitor B12',
      'ALCOHOL (chronic): B12 deficiency due to poor diet, malabsorption, and liver storage depletion — supplement 1,000 µg PO/IM',
      'CHOLESTYRAMINE: reduced B12 absorption — separate by 2–3 hours; potentially reduces B12 levels with long-term use',
      'COLCHICINE: reduced B12 absorption (inhibits ileal B12 uptake) — monitor B12 with long-term use',
      'NEOMYCIN, AMINOSALICYLIC ACID (PAS): reduced B12 absorption — monitor levels',
      'NITROUS OXIDE (laughing gas): INACTIVATES B12 (oxidises cobalt in B12) — can cause rapid B12 deficiency with neurological damage if used repeatedly (recreational use, occupational exposure, repeated anaesthesia). In B12-deficient patients, even a single N₂O exposure can cause acute neurological deterioration.',
      'POTASSIUM SUPPLEMENTS (slow-K, KCl): reduced B12 absorption in terminal ileum? — theoretical, controversial — no clear clinical significance',
    ],
    monitoring: 'Baseline: FBC with indices (Hb, MCV, MCH — macrocytic), reticulocyte count, serum B12, serum folate (ALWAYS check B12 and folate together — treat B12 deficiency BEFORE giving folate), ferritin (combined deficiency common), anti-intrinsic factor antibodies, anti-parietal cell antibodies (if pernicious anaemia suspected), serum homocysteine and methylmalonic acid (MMA — more sensitive markers of B12 deficiency if serum B12 borderline 150–300 pg/mL), LDH, indirect bilirubin (elevated in megaloblastic anaemia due to ineffective erythropoiesis). During therapy: FBC and reticulocyte count — 5–10 days after starting: reticulocytosis (peak at 5–8 days) confirms response; Hb increases 10–20 g/L every 2 weeks; MCV normalises over 6–8 weeks. Serum B12: recheck after 3–6 months of therapy — if low despite oral supplementation, consider parenteral route. K+: monitor in first 48 hours of treating severe deficiency (can drop rapidly). If NEUROLOGICAL symptoms present: monitor resolution (paraesthesia, gait, cognition, vibration sense) — may take 6–12 months; irreversible damage after ~6 months of uncorrected deficiency. Annual monitoring in patients on long-term therapy (pernicious anaemia, post-gastrectomy) — check B12 levels regularly, maintain >300 pg/mL.',
    patient_counselling: 'If you have pernicious anaemia (antibodies against intrinsic factor preventing B12 absorption), you need B12 injections for the rest of your life — oral or sublingual B12 will NOT work because your body cannot absorb B12 from the gut. For most other B12 deficiency (dietary, vegan, metformin-related), high-dose oral B12 tablets (1,000 µg daily) or sublingual B12 are usually effective because a small amount of B12 is absorbed passively (without intrinsic factor) when given at high doses. Improvement in fatigue: usually within 1–2 weeks. Tongue soreness: improves within days. Neurological symptoms (numbness, tingling, unsteadiness): may take 6–12 months to improve — some damage may be permanent if deficiency was long-standing. This vitamin is safe and non-toxic — excess is excreted in urine (bright yellow urine after injection — harmless). Store injections in the refrigerator. Alcohol can worsen B12 deficiency — moderate intake.',
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
  console.log('║   Batch 7: 6 Medicines (Endocrine / Anaemia)      ║');
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
  console.log('━━━ Batch 7 Summary ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Intended:      ${MONOGRAPHS.length}`);
  console.log(`  Successful:    ${success}`);
  console.log(`  Failed:        ${fail}`);
  console.log(`  Prior total:   ${before}`);
  console.log(`  Current total: ${after}`);
  console.log();

  if (fail === 0 && success === MONOGRAPHS.length) {
    console.log('✅ Batch 7 COMPLETE. Proceed to Batch 8.');
  } else {
    console.log('⚠️  Batch 7 partially complete. Review errors above.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
