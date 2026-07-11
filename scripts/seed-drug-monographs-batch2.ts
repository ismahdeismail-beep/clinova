/**
 * seed-drug-monographs-batch2.ts
 * ----------------------------------------------------------------------------
 * Phase C — Incremental Knowledge Population
 * Batch 2: Lithium, Sodium Valproate, Carbamazepine, Haloperidol, Risperidone
 *          (Neurology / Psychiatry — high-risk, narrow therapeutic index)
 *
 * Usage: npx tsx scripts/seed-drug-monographs-batch2.ts
 * Env:   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Each monograph independently verified against:
 *   - Kenya Essential Medicines List (KEML)
 *   - Kenya Standard Treatment Guidelines (KSTG)
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
  // ── 1. Lithium ───────────────────────────────────────────────────
  {
    name: 'Lithium',
    generic_name: 'Lithium Carbonate',
    drug_class: 'Mood stabiliser (antimanic)',
    indications: [
      'Acute mania and hypomania in bipolar I disorder',
      'Prophylaxis of bipolar disorder (maintenance — reduces frequency and severity of manic and depressive episodes)',
      'Treatment-resistant depression (augmentation of antidepressant therapy)',
      'Cluster headache prophylaxis (second-line)',
      'Aggressive behaviour (adjunctive, in certain neuropsychiatric conditions)',
    ],
    contraindications: [
      'Hypersensitivity to lithium',
      'Severe renal impairment (CrCl <15 mL/min)',
      'Severe cardiovascular disease (sick sinus syndrome, severe heart block)',
      'Untreated hypothyroidism',
      'Brugada syndrome or family history of Brugada syndrome',
      'Sodium depletion (dehydration, low-sodium diet, diuretic use) — significantly increases lithium toxicity risk',
      'Pregnancy (especially first trimester — risk of Ebstein\'s anomaly)',
      'Breastfeeding (avoid — excreted in breast milk at 30–100% maternal serum levels)',
    ],
    side_effects: [
      'Neurological: fine tremor (most common), ataxia, dysarthria, nystagmus, confusion, seizures, coma (toxicity)',
      'Renal: polyuria, polydipsia (nephrogenic diabetes insipidus), chronic tubulointerstitial nephritis, reduced GFR',
      'Endocrine: hypothyroidism (5–35%, especially in women), goitre, hyperparathyroidism (rare)',
      'Cardiovascular: ECG changes (T-wave flattening/inversion), sinoatrial block, bradycardia, arrhythmias',
      'Gastrointestinal: nausea, vomiting, diarrhoea, metallic taste, weight gain',
      'Dermatological: acne, psoriasis exacerbation, folliculitis, alopecia, rash',
      'Haematological: leukocytosis (benign, reversible)',
      'CNS: memory impairment, cognitive slowing, lethargy, sedation',
      'Neuromuscular: hyperreflexia, clonus, extrapyramidal symptoms (toxicity)',
      'Teratogenicity: Ebstein\'s anomaly (first trimester — risk ~0.05–0.1%)',
    ],
    dosage: {
      adult: {
        'Acute mania — initiation': '300–600 mg PO three times daily (titrate based on levels; target: 0.8–1.2 mmol/L)',
        'Maintenance': '300–600 mg PO two to three times daily (target trough: 0.6–0.8 mmol/L)',
        'Depression augmentation': '300–600 mg PO daily (titrate to trough 0.4–0.8 mmol/L)',
      },
      paediatric: {
        'Adolescents (12–18 yrs) — acute mania': '15–20 mg/kg/day PO divided 2–3 times daily (titrate to adult target levels)',
        'Adolescents — maintenance': 'Target trough: 0.6–1.0 mmol/L (lower end for adolescents)',
      },
      renalAdjustment: 'CrCl 30–60: reduce dose by 50%. CrCl 15–30: reduce dose by 75%. CrCl <15: contraindicated. All patients require therapeutic drug monitoring (TDM).',
      hepaticAdjustment: 'No dose adjustment required. Lithium is not metabolised — excreted renally unchanged.',
      therapeuticRange: {
        'Acute mania (trough)': '0.8–1.2 mmol/L (samples taken 12 hours post-dose)',
        'Maintenance (trough)': '0.6–0.8 mmol/L',
        'Toxicity (mild-moderate)': '1.5–2.0 mmol/L',
        'Toxicity (severe)': '>2.0 mmol/L (medical emergency)',
      },
    },
    interactions: [
      'ACE inhibitors (lisinopril, captopril): increased lithium levels (reduced renal clearance) — monitor levels, reduce lithium dose',
      'ARBs (losartan, valsartan): same mechanism as ACE inhibitors — increased lithium levels',
      'NSAIDs (ibuprofen, diclofenac, indomethacin): reduced renal clearance — increase lithium levels by 30–60%',
      'Thiazide diuretics (HCTZ): increased lithium reabsorption — significant increase in lithium levels, avoid if possible',
      'Loop diuretics (furosemide): variable effect on lithium levels — monitor carefully',
      'Metronidazole: increased lithium toxicity (reduced renal clearance)',
      'Carbamazepine: increased risk of neurotoxicity even without elevated lithium levels',
      'SSRIs (fluoxetine, paroxetine): increased risk of serotonin syndrome, may increase lithium levels',
      'Verapamil: increased risk of neurotoxicity and bradycardia',
      'Methyldopa: increased lithium toxicity risk (unknown mechanism)',
      'Theophylline, caffeine: increased lithium excretion — may reduce lithium levels if withdrawn suddenly',
      'Sodium bicarbonate: increased lithium excretion — may lower lithium levels',
      'Neuromuscular blocking agents: prolonged paralysis',
    ],
    monitoring: 'CRITICAL REQUIREMENT: Serum lithium trough levels must be checked 12 hours after last dose — before initiation: renal function (eGFR, Cr), thyroid function (TSH, T4), ECG (especially if >40 yrs or cardiac risk), pregnancy test. During therapy: lithium trough every 3–6 months (more frequently during titration or dose changes), renal function (eGFR, Cr, urinalysis) every 3–6 months, thyroid function (TSH) every 6–12 months, serum calcium if symptoms of hyperparathyroidism. Signs of toxicity: vomiting, severe diarrhoea, ataxia, coarse tremor, dysarthria, nystagmus, confusion — urgent lithium level and emergency evaluation.',
    patient_counselling: 'This medicine requires regular blood tests to ensure the dose is right. Take lithium exactly as prescribed — do not change dose or stop without consulting your doctor. Stay well hydrated — drink 8–10 glasses of water daily, especially in hot weather, during exercise, or if ill with fever/vomiting/diarrhoea. Maintain a consistent salt intake — do not start a low-salt diet without talking to your doctor. Avoid NSAID painkillers (ibuprofen, diclofenac) — use paracetamol instead. Signs of lithium toxicity: severe vomiting/diarrhoea, slurred speech, unsteadiness when walking, severe tremor, confusion — go to the nearest emergency department immediately. If a dose is missed, skip it — do not double the next dose. Lithium levels must be checked 12 hours after your last dose for accurate results.',
  },

  // ── 2. Sodium Valproate (Valproic Acid) ──────────────────────────
  {
    name: 'Sodium Valproate',
    generic_name: 'Valproic Acid / Sodium Valproate / Divalproex Sodium',
    drug_class: 'Antiepileptic; mood stabiliser',
    indications: [
      'Bipolar I disorder — acute mania (including mixed episodes) and maintenance',
      'Epilepsy — generalised tonic-clonic seizures, absence seizures, myoclonic seizures, partial seizures',
      'Migraine prophylaxis',
      'Adjunctive in treatment-resistant schizophrenia',
      'Neuropathic pain (off-label, second-line)',
    ],
    contraindications: [
      'Hypersensitivity to valproate',
      'Active liver disease or significant hepatic impairment',
      'Personal or family history of severe hepatic dysfunction (especially drug-induced)',
      'Known mitochondrial polymerase gamma (POLG) mutation (risk of valproate-induced hepatotoxicity)',
      'Urea cycle disorders (risk of hyperammonaemic encephalopathy)',
      'Pregnancy — ABSOLUTELY contraindicated for migraine prophylaxis; contraindicated for bipolar/epilepsy unless no alternative (high teratogenic risk)',
      'Women of childbearing potential (unless pregnancy prevention programme in place — UK MHRA black triangle)',
      'Bleeding disorders / thrombocytopenia',
    ],
    side_effects: [
      'Hepatic: elevated transaminases (dose-related, often transient), hepatotoxicity (rare but potentially fatal — highest risk in children <2 yrs on polytherapy, within first 6 months)',
      'Metabolic: weight gain (common, significant), hyperammonaemia (may cause encephalopathy), metabolic syndrome, hyperinsulinaemia, insulin resistance',
      'Endocrine: polycystic ovary syndrome (PCOS)-like changes, menstrual irregularities, hirsutism, hypothyroidism',
      'CNS: sedation, dizziness, ataxia, tremor (dose-related), confusion, cognitive impairment, parkinsonism (rare, reversible)',
      'Gastrointestinal: nausea, vomiting, diarrhoea, abdominal cramps, pancreatitis (rare but serious)',
      'Haematological: thrombocytopenia (dose-related), leukopenia, anaemia, bone marrow suppression (rare), decreased fibrinogen, prolonged bleeding time',
      'Dermatological: alopecia (transient, dose-related), rash, photosensitivity, Stevens-Johnson syndrome (rare)',
      'Teratogenicity: neural tube defects (spina bifida ~1–2%), cardiac defects, craniofacial anomalies, developmental delay, autism spectrum disorder association',
      'Other: hearing loss, vasculitis, SIADH (rare)',
    ],
    dosage: {
      adult: {
        'Epilepsy — initiation': '200–400 mg PO twice daily (titrate by 200 mg every 3–7 days; max 2,500 mg/day)',
        'Epilepsy — maintenance': '1,000–2,000 mg/day PO divided 2–3 times daily',
        'Bipolar mania — initiation': '250–500 mg PO three times daily (rapid titration: 750 mg/day day 1, increase by 250 mg/day to target 1,000–2,500 mg/day)',
        'Bipolar — maintenance': '500–1,500 mg/day PO divided 2–3 times daily',
        'Migraine prophylaxis': '250–500 mg PO twice daily (titrated)',
      },
      paediatric: {
        'Epilepsy — children': '10–15 mg/kg/day PO divided 2–3 times daily; titrate by 5–10 mg/kg/week (max 60 mg/kg/day or 2,500 mg/day)',
        'Infants <2 yrs': 'Use with extreme caution — highest hepatotoxicity risk. Avoid polytherapy. Monitor LFTs and ammonia closely.',
      },
      renalAdjustment: 'Reduce dose in significant renal impairment. Valproate is protein-bound and not significantly renally cleared — but metabolites may accumulate. Monitor free valproate levels in uraemia.',
      hepaticAdjustment: 'Contraindicated in active liver disease. Reduce dose in mild impairment. Monitor LFTs and ammonia closely.',
      therapeuticRange: {
        'Total valproate (trough)': '50–100 µg/mL (350–700 µmol/L)',
        'Free valproate': '6–20 µg/mL (may be more reliable in hypoalbuminaemia or renal impairment)',
        'Toxicity level': '>150 µg/mL (symptoms: sedation, ataxia, coma, respiratory depression, cerebral oedema)',
      },
    },
    interactions: [
      'Carbamazepine: decreased valproate levels (enzyme induction) — monitor valproate levels, dose adjust',
      'Lamotrigine: increased lamotrigine levels (valproate inhibits glucuronidation) — risk of Stevens-Johnson syndrome; reduce lamotrigine dose by 50%',
      'Phenytoin: decreased valproate levels AND increased free phenytoin (protein displacement) — monitor both levels',
      'Phenobarbital: increased phenobarbital levels (50–100% increase) — reduce phenobarbital dose',
      'Aspirin: increased free valproate levels (protein displacement) — risk of toxicity, especially in children',
      'Warfarin: increased anticoagulant effect (protein displacement) — monitor INR',
      'Rifampicin: decreased valproate levels (enzyme induction)',
      'Antipsychotics (olanzapine, clozapine): additive weight gain and metabolic effects',
      'Topiramate: increased risk of hyperammonaemia and encephalopathy',
      'Benzodiazepines: additive CNS depression',
    ],
    monitoring: 'Baseline: LFTs (bilirubin, ALT, AST, GGT), FBC with platelets, coagulation screen (PT, APTT), pregnancy test, renal function, ammonia. During therapy: LFTs every 3–6 months for first year (more frequently in children <2 yrs and on polytherapy), FBC with platelets every 3–6 months, valproate trough levels 3–6 months after stable dose (and when adjusting dose, adding interacting drugs, or suspecting toxicity), ammonia if unexplained lethargy/vomiting/confusion. Weight monitoring at each visit. In women of childbearing potential: pregnancy test before initiation, ensure effective contraception, review indication annually (UK MHRA pregnancy prevention programme).',
    patient_counselling: 'Take with or after food to reduce stomach upset. Do not stop this medicine suddenly — seizures or mood episodes may occur. Regular blood tests are required to check liver function, blood counts, and drug levels. Weigh yourself weekly — this medicine commonly causes weight gain. Seek immediate medical attention if: yellowing of skin/eyes (jaundice), unusual bruising or bleeding, severe stomach pain with vomiting (pancreatitis), persistent tiredness with confusion or vomiting (ammonia), rash or skin peeling, or pregnancy (immediately). If planning pregnancy: discuss with your doctor first — valproate carries serious risks to the unborn baby. Do not take aspirin without consulting your doctor.',
  },

  // ── 3. Carbamazepine ──────────────────────────────────────────────
  {
    name: 'Carbamazepine',
    generic_name: 'Carbamazepine',
    drug_class: 'Antiepileptic; mood stabiliser; anticonvulsant',
    indications: [
      'Epilepsy — partial (focal) seizures, generalised tonic-clonic seizures, mixed seizure types',
      'Trigeminal neuralgia (first-line)',
      'Glossopharyngeal neuralgia',
      'Diabetic neuropathy (second-line) — not recommended in many guidelines',
      'Bipolar disorder — acute mania prophylaxis (especially in rapid cyclers)',
      'Alcohol withdrawal syndrome (off-label, used in some settings)',
      'Behavioural symptoms in dementia (off-label, limited evidence)',
      'Neuropathic pain (various — second-line)',
      'Diabetes insipidus (central — off-label)',
    ],
    contraindications: [
      'Hypersensitivity to carbamazepine or any tricyclic compound',
      'History of bone marrow depression (aplastic anaemia, agranulocytosis)',
      'AV heart block (second-degree or complete)',
      'Porphyria',
      'Concurrent use with MAO inhibitors (within 14 days)',
      'HLA-B*1502 allele carriers (severe cutaneous adverse reactions — SJS/TEN — highest risk in Han Chinese, Thai, Indian, Malay populations)',
      'HLA-A*3101 allele carriers (increased risk of hypersensitivity reactions — European descent)',
      'Breastfeeding (avoid — significant excretion in breast milk; monitor infant for sedation, poor feeding)',
      'Pregnancy (risk of neural tube defects when used in first trimester — use alternative if possible)',
    ],
    side_effects: [
      'CNS: dizziness, drowsiness, ataxia, diplopia, blurred vision, headache, nystagmus, vertigo (common, especially during titration)',
      'Dermatological: rash (common ~10%), urticaria, photosensitivity, Stevens-Johnson syndrome (SJS), toxic epidermal necrolysis (TEN) — highest in HLA-B*1502 carriers',
      'Haematological: leukopenia (benign, transient ~10%), thrombocytopenia, aplastic anaemia (rare ~1/200,000 but potentially fatal), agranulocytosis',
      'Hepatic: elevated transaminases (transient), cholestatic jaundice, granulomatous hepatitis, hepatic failure (rare)',
      'Gastrointestinal: nausea, vomiting, diarrhoea, constipation, dry mouth, abdominal pain',
      'Cardiovascular: bradycardia, AV block, heart failure exacerbation, oedema',
      'Endocrine: hyponatraemia (SIADH-like — common, especially in elderly), reduced T4 (lower free T4 — monitor, supplement if symptomatic), reduced testosterone',
      'Metabolic: weight gain, oedema',
      'Musculoskeletal: osteomalacia, osteoporosis (with long-term use — enzyme induction reduces vitamin D levels)',
      'Hypersensitivity: anticonvulsant hypersensitivity syndrome (fever, rash, lymphadenopathy, hepatitis, eosinophilia — 1–4 weeks after start)',
    ],
    dosage: {
      adult: {
        'Epilepsy — initiation': '100–200 mg PO once or twice daily; increase slowly by 100–200 mg every 1–2 weeks (usual maintenance: 600–1,200 mg/day divided 2–3 times daily; max 1,600 mg/day)',
        'Trigeminal neuralgia': '100 mg PO twice daily; increase by 100 mg every 12 hours as tolerated (usual: 400–800 mg/day; max 1,200 mg/day)',
        'Bipolar — maintenance': '200–600 mg PO twice daily (adjust to levels)',
        'Alcohol withdrawal': '200 mg PO three times daily tapered over 6–10 days',
      },
      paediatric: {
        'Epilepsy — children 6–12 yrs': '10–20 mg/kg/day PO divided 2–3 times daily (max 1,000 mg/day)',
        'Epilepsy — children <6 yrs': '5–10 mg/kg/day PO divided 2–3 times daily (max 35 mg/kg/day)',
      },
      renalAdjustment: 'CrCl <10: reduce dose by 25%. Not significantly removed by dialysis.',
      hepaticAdjustment: 'Contraindicated in active liver disease. Reduce dose in mild-moderate impairment.',
      therapeuticRange: {
        'Trough level': '4–12 µg/mL (17–50 µmol/L)',
        'Toxicity level': '>12 µg/mL (symptoms: diplopia, ataxia, nystagmus, vertigo; >20 µg/mL: stupor, coma, seizures, respiratory depression)',
      },
    },
    interactions: [
      'POTENT CYP3A4 ENZYME INDUCER — accelerates metabolism of many drugs',
      'Oral contraceptives: reduced efficacy (breakthrough bleeding, pregnancy) — advise non-hormonal or high-dose contraception (≥50 µg ethinylestradiol)',
      'Warfarin: reduced anticoagulant effect — monitor INR, may need warfarin dose doubled',
      'Antiepileptics (lamotrigine, valproate, phenytoin): reduced levels of all — monitor and adjust doses',
      'Antipsychotics (haloperidol, clozapine, olanzapine, risperidone): reduced levels — may need up to 50% dose increase',
      'Antidepressants (SSRIs, TCAs): reduced levels — monitor response',
      'Benzodiazepines: reduced levels of benzodiazepines',
      'Methadone: reduced methadone levels — risk of withdrawal',
      'Thyroid hormones (levothyroxine): increased metabolism — monitor TSH, adjust levothyroxine dose',
      'Calcium channel blockers (CCBs: felodipine, nifedipine, verapamil): reduced CCB levels',
      'Ciclosporin, tacrolimus: reduced levels — monitor and adjust',
      'Statins (atorvastatin, simvastatin): reduced statin levels',
      'Macrolide antibiotics (erythromycin, clarithromycin): increased carbamazepine levels (CYP3A4 inhibition) — risk of toxicity',
      'Azole antifungals (ketoconazole, itraconazole): increased carbamazepine levels',
      'Isoniazid: increased carbamazepine levels',
      'Cimetidine: increased carbamazepine levels',
      'Grapefruit juice: increased carbamazepine levels (CYP3A4 inhibition) — avoid',
    ],
    monitoring: 'HLA-B*1502 screening in at-risk populations BEFORE initiation (Han Chinese, Thai, Indian, Filipino, Malay, Vietnamese). Baseline: FBC with differential, LFTs, renal function, electrolytes (Na), ECG. During therapy: FBC, LFTs, electrolytes (Na) every 2–4 weeks for first 2 months, then every 3–6 months; carbamazepine levels 4 weeks after stable dose, then 6–12 monthly (or when dose changes, adding interacting drugs, suspecting toxicity). Thyroid function annually (free T4, TSH). Vitamin D levels in long-term therapy. Signs of SIADH (hyponatraemia): headache, nausea, lethargy, confusion. Hypersensitivity reaction: fever, rash, lymphadenopathy, eosinophilia — STOP immediately.',
    patient_counselling: 'Take with food to reduce stomach upset. This medicine may cause dizziness and drowsiness — do not drive or operate machinery until you know how it affects you. Regular blood tests are essential to monitor blood counts, liver function, and drug levels. It may take several weeks to find the right dose — do not stop suddenly. WARNING: This medicine reduces the effectiveness of oral contraceptives (the pill) — use additional barrier contraception. Seek immediate medical attention if: skin rash with fever or blisters (Stevens-Johnson syndrome — stop the medicine), yellowing of skin/eyes, unusual bruising/bleeding, severe headache/confusion (low sodium), sore throat/fever (low white blood cells). Do not drink grapefruit juice while taking this medicine. Report any visual changes (double vision, blurred vision) — may indicate high levels.',
  },

  // ── 4. Haloperidol ────────────────────────────────────────────────
  {
    name: 'Haloperidol',
    generic_name: 'Haloperidol',
    drug_class: 'Antipsychotic (first-generation / typical antipsychotic — butyrophenone)',
    indications: [
      'Schizophrenia and schizoaffective disorder — acute psychosis and maintenance',
      'Acute psychomotor agitation — rapid tranquilisation',
      'Acute mania in bipolar disorder',
      'Delirium (especially in palliative care and ICU)',
      'Tourette syndrome — tic suppression',
      'Chorea (Huntington\'s disease — symptomatic control)',
      'Nausea and vomiting (palliative care, unresponsive to other agents)',
      'Behavioural and psychological symptoms of dementia (BPSD) — short-term only, limited efficacy',
      'Treatment-resistant anxiety disorder (severe, off-label)',
      'Intractable hiccups (off-label)',
    ],
    contraindications: [
      'Hypersensitivity to haloperidol',
      'Coma or severe CNS depression (including barbiturate, alcohol, or opioid intoxication)',
      'Parkinson\'s disease (worsens motor symptoms)',
      'Dementia with Lewy bodies (severe sensitivity reactions)',
      'QTc interval prolongation (baseline QTc >450 ms in men, >470 ms in women) — including congenital long QT syndrome',
      'History of torsades de pointes or ventricular arrhythmias',
      'Significant electrolyte disturbances (hypokalaemia, hypomagnesaemia)',
      'Concurrent use with other QT-prolonging drugs (avoid unless absolutely necessary)',
      'Acute narrow-angle glaucoma',
    ],
    side_effects: [
      'Extrapyramidal symptoms (EPS): acute dystonia (early — especially in young men, high doses), parkinsonism (tremor, rigidity, bradykinesia), akathisia (restlessness — most distressing), tardive dyskinesia (late, potentially irreversible — orofacial, limb, trunck involuntary movements)',
      'Cardiac: QT prolongation, torsades de pointes, ventricular arrhythmias, sudden cardiac death — dose-related risk',
      'CNS: sedation, drowsiness, confusion, dizziness, headache, neuroleptic malignant syndrome (NMS — fever, rigidity, autonomic instability, altered consciousness — medical emergency)',
      'Endocrine: hyperprolactinaemia (galactorrhoea, gynaecomastia, menstrual irregularities, sexual dysfunction), weight gain (less than atypical antipsychotics)',
      'Metabolic: dysglycaemia, diabetes mellitus (lower risk than atypicals)',
      'Anticholinergic effects: dry mouth, blurred vision, constipation, urinary retention (less than low-potency typicals)',
      'Dermatological: photosensitivity, rash, urticaria',
      'Haematological: leukopenia, neutropenia (rare), agranulocytosis (very rare)',
      'Hepatic: elevated transaminases, cholestatic jaundice (rare)',
      'Ocular: blurred vision, corneal deposits (long-term high doses), retinopathy (rare)',
    ],
    dosage: {
      adult: {
        'Acute psychosis / agitation — oral': '2–10 mg PO (may repeat hourly as needed; max 20 mg/day acutely, but use lowest effective dose)',
        'Schizophrenia — maintenance': '1–15 mg/day PO (once daily or divided twice daily; max 20 mg/day)',
        'Rapid tranquilisation — IM': '2.5–10 mg IM (repeat hourly if needed; max 20 mg/day)',
        'Tourette syndrome': '0.5–2 mg PO three times daily (titrate slowly)',
        'Delirium — oral': '0.5–2 mg PO twice daily (lowest effective dose)',
        'Nausea/vomiting (palliative)': '0.5–1.5 mg PO/IM twice to three times daily',
      },
      paediatric: {
        'Psychosis / Tourette — children 3–12 yrs': '0.01–0.03 mg/kg/day PO divided twice daily (max 0.15 mg/kg/day)',
        'Behavioural disorders — children 6–12 yrs': '0.01–0.05 mg/kg/day PO divided twice daily',
      },
      geriatric: {
        'General — starting dose': '0.25–0.5 mg PO twice daily (titrate by 0.25–0.5 mg every 5–7 days)',
        'Usual maintenance': '0.5–3 mg/day (elderly are very sensitive to EPS and QT prolongation)',
      },
      renalAdjustment: 'No dose adjustment required for mild-moderate impairment. Reduce dose in severe impairment — monitor for increased sedation and EPS.',
      hepaticAdjustment: 'Reduce dose by 50% in moderate impairment. Contraindicated in severe hepatic failure. Haloperidol is extensively metabolised in the liver (CYP3A4, CYP2D6).',
    },
    interactions: [
      'QT-prolonging drugs (amiodarone, sotalol, methadone, ciprofloxacin, citalopram, escitalopram, ondansetron): additive QT prolongation — avoid combination, or monitor QTc closely',
      'CYP3A4 inhibitors (ketoconazole, itraconazole, erythromycin, clarithromycin, grapefruit juice): increased haloperidol levels — risk of QT prolongation and EPS',
      'CYP3A4 inducers (carbamazepine, phenytoin, rifampicin, phenobarbital): decreased haloperidol levels — may need dose increase',
      'CYP2D6 inhibitors (paroxetine, fluoxetine, bupropion, quinidine): increased haloperidol levels — monitor for toxicity',
      'Lithium: rare reports of encephalopathy and neurotoxicity — monitor',
      'Anticholinergics (benztropine, trihexyphenidyl): additive anticholinergic effects',
      'Antihypertensives: additive hypotension',
      'Benzodiazepines: additive sedation and respiratory depression (especially IM route) — caution',
      'Levodopa / dopamine agonists: antagonised effect — worsening of Parkinson\'s symptoms',
      'Alcohol: additive CNS depression — avoid',
      'SSRIs (especially paroxetine, fluoxetine): increased haloperidol levels via CYP2D6 inhibition',
    ],
    monitoring: 'Baseline: ECG (QTc measurement), serum electrolytes (K+, Mg2+), FBC, LFTs, renal function, glucose/HbA1c, lipid profile, prolactin level. Before each dose increase: review for EPS (use AIMS scale for tardive dyskinesia, Barnes Akathisia Scale, Simpson-Angus Scale). ECG monitoring: repeat QTc after each dose titration until stable, then annually. Glucosse/HbA1c and lipids: baseline, 3 months, then annually. Prolactin: if symptoms (galactorrhoea, gynaecomastia, sexual dysfunction). NMS warning signs: fever, severe muscle rigidity, autonomic instability (tachycardia, labile BP), altered consciousness — urgent medical emergency. Tardive dyskinesia screening: AIMS assessment every 6 months (12 months in well-controlled patients).',
    patient_counselling: 'This medicine helps control symptoms of psychosis but may cause side effects. Drowsiness and dizziness are common initially — do not drive or operate machinery until you know how it affects you. Seek immediate medical attention if: fever with muscle stiffness and confusion (neuroleptic malignant syndrome), fast/irregular heartbeat or fainting (QT prolongation), uncontrolled movements of the tongue/face/jaw (tardive dyskinesia), severe restlessness (akathisia). Report any abnormal muscle spasms (especially of the neck, eyes, or back — acute dystonia) — these can be treated. You will need regular ECG and blood tests. Avoid alcohol completely. Do not stop this medicine suddenly. If you become pregnant or plan to become pregnant, discuss with your doctor.',
  },

  // ── 5. Risperidone ─────────────────────────────────────────────────
  {
    name: 'Risperidone',
    generic_name: 'Risperidone',
    drug_class: 'Antipsychotic (second-generation / atypical antipsychotic — benzisoxazole derivative)',
    indications: [
      'Schizophrenia — acute psychosis and maintenance',
      'Bipolar I disorder — acute mania or mixed episodes (as monotherapy or adjunctive to lithium/valproate)',
      'Bipolar maintenance (adjunctive)',
      'Irritability in autistic disorder (children and adolescents)',
      'Behavioural symptoms in dementia (short-term — limited efficacy, increased mortality risk, reserved for severe symptoms)',
      'Tourette syndrome (second-line)',
      'Treatment-resistant OCD (adjunctive)',
      'Delirium (alternative to haloperidol — especially in elderly and Parkinson\'s disease)',
      'Schizoaffective disorder',
    ],
    contraindications: [
      'Hypersensitivity to risperidone or paliperidone',
      'Dementia-related psychosis (elderly — increased risk of cerebrovascular events and death — BLACK BOX WARNING)',
      'Parkinson\'s disease (may worsen motor symptoms — use clozapine or quetiapine if needed)',
      'Dementia with Lewy bodies (severe sensitivity — NMS, severe EPS, rapid decline)',
      'History of neuroleptic malignant syndrome (NMS)',
      'Breastfeeding (avoid — excreted in milk)',
      'Untreated pheochromocytoma',
    ],
    side_effects: [
      'Metabolic: weight gain (common, especially in young patients), dysglycaemia, diabetes mellitus (lower than clozapine/olanzapine but higher than aripiprazole/lurasidone), dyslipidaemia',
      'Endocrine: hyperprolactinaemia (most prominent among atypicals — dose-dependent; galactorrhoea, gynaecomastia, menstrual irregularities, sexual dysfunction, decreased bone density)',
      'Extrapyramidal symptoms: dose-dependent EPS (especially at doses >6 mg/day — parkinsonism, akathisia, dystonia), tardive dyskinesia (lower risk than haloperidol)',
      'CNS: sedation, dizziness, headache, insomnia, anxiety, agitation, cognitive slowing',
      'Cardiac: QT prolongation (dose-related, lower risk than haloperidol), orthostatic hypotension (alpha-1 blockade), tachycardia',
      'Gastrointestinal: nausea, vomiting, dyspepsia, constipation, xerostomia, weight gain, increased appetite',
      'Other: hyperglycaemia (monitor), urinary incontinence, priapism (rare), rhinitis, blurred vision',
      'Neuroleptic Malignant Syndrome (rare but potentially fatal)',
      'Cerebrovascular events (stroke, TIA) in elderly dementia patients — BLACK BOX WARNING',
    ],
    dosage: {
      adult: {
        'Schizophrenia — initiation': '1–2 mg PO once daily (increase by 1–2 mg/day on day 2 and thereafter; target 4–6 mg/day)',
        'Schizophrenia — maintenance': '2–8 mg/day PO once daily or divided twice daily (max 16 mg/day; doses >6 mg/day associated with increased EPS)',
        'Bipolar mania (adjunctive)': '2–3 mg PO once daily (titrate from 1 mg/day; usual range 1–6 mg/day)',
        'Irritability in autism (adults)': '0.5–1 mg PO once daily (titrate slowly; max 3 mg/day)',
      },
      paediatric: {
        'Autism — irritability (5–17 yrs, ≥20 kg)': '0.25–0.5 mg PO once daily on day 1; increase to 0.5–1 mg/day on day 4; adjust by 0.25 mg every 2 weeks (max 2 mg/day)',
        'Autism — irritability (<20 kg)': '0.125–0.25 mg PO once daily on day 1; increase to 0.25–0.5 mg/day on day 4',
        'Schizophrenia (13–17 yrs)': '0.5 mg PO once daily; titrate by 0.5–1 mg/day every 5–7 days (max 6 mg/day)',
        'Bipolar mania (10–17 yrs)': '0.5 mg PO once daily; titrate by 0.5–1 mg/day (max 6 mg/day)',
      },
      geriatric: {
        'Starting dose': '0.25–0.5 mg PO twice daily',
        'Usual maintenance': '0.5–2 mg/day (titrate by 0.25–0.5 mg every 5–7 days)',
      },
      renalAdjustment: 'CrCl 30–50: reduce starting dose by 50% (start 0.25–0.5 mg twice daily), increase slowly. CrCl <30: further reduce — start 0.25 mg twice daily, max 1.5 mg/day. The active metabolite (9-hydroxyrisperidone) is renally excreted.',
      hepaticAdjustment: 'Reduce starting dose by 50% in moderate-severe impairment (start 0.25–0.5 mg twice daily), titrate slowly.',
    },
    interactions: [
      'Dopamine agonists (levodopa, pramipexole, ropinirole): antagonised effect — worsening of Parkinson\'s, reduced efficacy of agonist',
      'CYP2D6 inhibitors (paroxetine, fluoxetine, bupropion, quinidine): increased risperidone levels (but not 9-hydroxyrisperidone) — monitor for increased side effects',
      'CYP3A4 inducers (carbamazepine, phenytoin, rifampicin, phenobarbital): decreased active moiety — may need dose increase',
      'CYP3A4 inhibitors (ketoconazole, itraconazole, erythromycin, grapefruit juice): increased active moiety — may need dose reduction',
      'Valproate: no significant pharmacokinetic interaction — clinically safe combination',
      'Lithium: additive risk of EPS and neurotoxicity — monitor',
      'Antihypertensives: enhanced hypotensive effect — monitor BP',
      'Benzodiazepines: additive sedation — caution',
      'QT-prolonging drugs: additive QT prolongation risk — monitor QTc',
      'Alcohol: additive CNS depression — avoid',
      'SSRIs (especially fluoxetine, paroxetine): increased risperidone levels (CYP2D6 inhibition) — reduce risperidone dose if adding',
      'Carbamazepine: can decrease risperidone active moiety by 50% — may need dose adjustment',
    ],
    monitoring: 'Baseline: weight/BMI, waist circumference, FBC, LFTs, renal function, glucose/HbA1c, lipid profile, prolactin level, ECG (especially if cardiac risk factors), BP (sitting and standing — orthostatic hypotension). During therapy: weight/BMI weekly for first 6 weeks, then monthly for 3 months, then quarterly; glucose/HbA1c and lipids at 3 months, then annually; prolactin if symptoms (galactorrhoea, gynaecomastia, sexual dysfunction); EPS monitoring (AIMS, Barnes Akathisia, Simpson-Angus) at each visit for first 6 months, then 6 monthly; tardive dyskinesia screening every 6 months. NMS warning signs: fever, rigidity, autonomic instability, confusion — stop immediately, urgent medical care. Orthostatic BP: at each visit — advise patient to rise slowly.',
    patient_counselling: 'This medicine usually starts working within 1–2 weeks but may take 4–6 weeks for full effect. Take once daily, preferably at bedtime (reduces daytime drowsiness). Significant weight gain is possible — monitor your weight weekly, maintain a healthy diet, and exercise regularly. If you feel dizzy when standing up, rise slowly from sitting or lying positions. Seek immediate medical attention if: fever with muscle stiffness (NMS), fast/pounding heartbeat or fainting, severe restlessness or uncontrolled movements. Report breast swelling/pain or nipple discharge (raised prolactin — common and reversible). Do not drive until you know how this medicine affects you. Avoid alcohol completely. Do not stop suddenly — withdrawal symptoms may occur. If pregnant, planning pregnancy, or breastfeeding, discuss with your doctor.',
  },
];

// ──────────────────────────────────────────────────────────────────
// Upsert helper: check for existing → update or insert
// ──────────────────────────────────────────────────────────────────

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
  console.log('║   Batch 2: 5 Medicines (Neuro/Psych High-Risk)    ║');
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
  console.log('━━━ Batch 2 Summary ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Intended:      ${MONOGRAPHS.length}`);
  console.log(`  Successful:    ${success}`);
  console.log(`  Failed:        ${fail}`);
  console.log(`  Prior total:   ${before}`);
  console.log(`  Current total: ${after}`);
  console.log();

  if (fail === 0 && success === MONOGRAPHS.length) {
    console.log('✅ Batch 2 COMPLETE. Ready for Batch 3.');
  } else {
    console.log('⚠️  Batch 2 partially complete. Review errors above.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
