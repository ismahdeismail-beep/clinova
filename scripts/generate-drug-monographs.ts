import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CanonicalDrug {
  name: string;
  therapeuticClass: string;
  sourceMentions: number;
  status: 'seeded' | 'new';
  source?: string;
  priority?: string;
}

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
  mechanism_of_action: string;
  brand_names: string[];
  warnings: string[];
  pregnancy_category: string;
  overdose: string;
  pharmacokinetics: string;
  black_box_warnings: string[];
  clinical_pearls: string[];
}

interface OpenFdaLabel {
  openfda?: {
    generic_name?: string[];
    brand_name?: string[];
    substance_name?: string[];
    pharm_class_epc?: string[];
  };
  indications_and_usage?: string[];
  dosage_and_administration?: string[];
  contraindications?: string[];
  warnings?: string[];
  adverse_reactions?: string[];
  drug_interactions?: string[];
  boxed_warning?: string[];
  description?: string[];
  mechanism_of_action?: string[];
  pharmacokinetics?: string[];
  pregnancy?: string[];
  overdose?: string[];
}

function capitalize(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }

function sleep(ms: number): Promise<void> { return new Promise(r => setTimeout(r, ms)); }

/** Parse CLI flags */
function parseFlags(): { fdaOnly: boolean; dryRun: boolean; limit: number | null; offset: number } {
  const args = process.argv.slice(2);
  return {
    fdaOnly: args.includes('--fda-only'),
    dryRun: args.includes('--dry-run'),
    limit: args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1]) || null : null,
    offset: args.includes('--offset') ? parseInt(args[args.indexOf('--offset') + 1]) || 0 : 0,
  };
}

/** Fetch drug label data from OpenFDA */
async function fetchOpenFdaLabel(drugName: string): Promise<OpenFdaLabel | null> {
  try {
    const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(drugName)}"+OR+openfda.brand_name:"${encodeURIComponent(drugName)}"&limit=1`;
    const res = await fetch(url);
    if (!res.ok) {
      const fbUrl = `https://api.fda.gov/drug/label.json?search=search="${encodeURIComponent(drugName)}"&limit=1`;
      const fbRes = await fetch(fbUrl);
      if (!fbRes.ok) return null;
      const fbData = await fbRes.json();
      return fbData?.results?.[0] ?? null;
    }
    const data = await res.json();
    return data?.results?.[0] ?? null;
  } catch { return null; }
}

/** Extract first paragraph from FDA text field, cleaning bracket notation */
function fdaText(field: string[] | undefined): string {
  if (!field?.length) return '';
  return field[0]
    .replace(/\[.*?\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Extract array from FDA text field by splitting on semicolons, periods, or newlines */
function fdaArray(field: string[] | undefined): string[] {
  if (!field?.length) return [];
  const raw = field.join(' ').replace(/\s+/g, ' ').trim();
  if (!raw) return [];
  return raw
    .split(/(?:;|(?:\.\s+)|(?:\r?\n))/)
    .map(s => s.replace(/\[.*?\]/g, '').trim())
    .filter(s => s.length > 3 && s.length < 500);
}

const CLASS_SPECIFIC_CONTENT: Record<string, {
  drugClass: string;
  classIndications: string[];
  classSE: string[];
  classCI: string[];
  classInteractions: string[];
  monitoring: string;
  counselling: string;
}> = {
  'Anti-infectives': {
    drugClass: 'Antimicrobial agent',
    classIndications: [
      'Treatment of susceptible bacterial/fungal/parasitic infections',
      'Empiric therapy based on local susceptibility patterns and clinical presentation',
      'Prophylaxis in immunocompromised patients where indicated',
      'Combination therapy for mixed infections or to prevent resistance development',
    ],
    classSE: [
      'Gastrointestinal disturbances: nausea, vomiting, diarrhoea (common; usually self-limiting)',
      'Allergic reactions: skin rash, urticaria, pruritus; rarely anaphylaxis (discontinue immediately)',
      'Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) — report persistent diarrhoea',
      'QT prolongation (certain classes) — ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities',
      'Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening — discontinue if rash with blistering or mucosal involvement)',
    ],
    classCI: [
      'Hypersensitivity to active substance or any excipient in the formulation',
      'Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)',
      'Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)',
    ],
    classInteractions: [
      'Warfarin / DOACs — many antimicrobials alter INR; monitor coagulation closely',
      'Oral contraceptives — reduced efficacy during and 7 days after therapy; advise additional barrier contraception',
      'Antacids / iron / calcium / magnesium / milk products — reduced absorption of tetracyclines and fluoroquinolones; space dosing 2–4 hours apart',
    ],
    monitoring: 'Monitor for signs of hypersensitivity, renal and hepatic function at baseline and during prolonged therapy, complete blood count for prolonged courses. Therapeutic drug monitoring required for aminoglycosides and vancomycin.',
    counselling: 'Complete the full course as prescribed even if symptoms improve. Do not share with others. Report any rash, severe diarrhoea, or signs of superinfection. Take at evenly spaced intervals to maintain effective drug levels.',
  },
  'Cardiovascular': {
    drugClass: 'Cardiovascular agent',
    classIndications: [
      'Hypertension management (monotherapy or combination therapy)',
      'Heart failure with reduced or preserved ejection fraction',
      'Coronary artery disease / stable angina management',
      'Arrhythmia control (rate or rhythm control depending on agent)',
    ],
    classSE: [
      'Dizziness, headache, fatigue (common during initial titration; usually resolve)',
      'Postural hypotension (especially elderly) — advise rising slowly from sitting/lying',
      'Bradycardia / heart block (rate-slowing agents) — monitor pulse; report syncope or presyncope',
      'Peripheral oedema (dihydropyridine calcium channel blockers) — usually dose-dependent',
      'Dry cough (ACE inhibitors) — consider ARB if intolerable',
    ],
    classCI: [
      'Hypersensitivity to active substance',
      'Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)',
      'Cardiogenic shock / decompensated heart failure (for certain negative inotropes)',
      'Severe hypotension (systolic BP <90 mmHg)',
    ],
    classInteractions: [
      'NSAIDs — reduce antihypertensive efficacy; avoid chronic use if possible',
      'Beta-blockers / calcium channel blockers (verapamil, diltiazem) — additive bradycardia; caution when combining',
      'Diuretics — additive hypotension; monitor BP and electrolytes',
      'Digoxin — increased digoxin levels with some cardiovascular agents; monitor levels',
    ],
    monitoring: 'Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.',
    counselling: 'Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.',
  },
  'Central Nervous System': {
    drugClass: 'Central nervous system agent',
    classIndications: [
      'Management of neuropsychiatric disorders as per approved indications',
      'Symptom control and prevention of relapse in chronic CNS conditions',
      'Acute treatment of CNS emergencies (seizures, acute psychosis)',
      'Adjunctive therapy in treatment-resistant cases',
    ],
    classSE: [
      'Drowsiness, sedation, cognitive dulling (especially during initial titration)',
      'Psychomotor impairment — avoid driving and operating heavy machinery until effect is known',
      'Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)',
      'Extrapyramidal symptoms (antipsychotics) — dystonia, parkinsonism, akathisia, tardive dyskinesia',
      'Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)',
    ],
    classCI: [
      'Hypersensitivity to active substance',
      'Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)',
      'Severe hepatic impairment (drugs extensively hepatically metabolized)',
      'MAOI co-administration or recent discontinuation (certain antidepressants)',
    ],
    classInteractions: [
      'Alcohol / other CNS depressants — additive sedation; avoid concurrent use',
      'MAOIs — hypertensive crisis risk with certain antidepressants; washout period required',
      'Warfarin — altered metabolism with certain CNS agents; monitor INR',
      "Serotonergic drugs (triptans, tramadol, St John's Wort) — serotonin syndrome risk; avoid combination",
    ],
    monitoring: 'Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).',
    counselling: 'May cause drowsiness — avoid driving until you know how it affects you. Take as prescribed — do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.',
  },
  'Analgesics': {
    drugClass: 'Analgesic agent',
    classIndications: [
      'Acute pain management (mild to severe depending on agent)',
      'Chronic pain conditions (neuropathic, nociceptive, or mixed)',
      'Post-operative pain control',
      'Fever reduction (antipyretic effect of certain agents)',
    ],
    classSE: [
      'Gastrointestinal: nausea, vomiting, dyspepsia, constipation (especially opioids)',
      'Sedation, dizziness (centrally-acting agents)',
      'Gastric ulceration / bleeding (NSAIDs) — risk increases with duration and dose',
      'Hepatotoxicity (paracetamol overdose) — adhere to maximum daily dose',
      'Respiratory depression (opioids) — risk highest in opioid-naive, elderly, or those with respiratory compromise',
    ],
    classCI: [
      'Hypersensitivity to active substance or NSAIDs (including aspirin-exacerbated respiratory disease)',
      'Active peptic ulceration / gastrointestinal bleeding (NSAIDs)',
      'Severe hepatic impairment (paracetamol, NSAIDs)',
      'Severe renal impairment (NSAIDs)',
      'Concurrent anticoagulation (NSAIDs)',
    ],
    classInteractions: [
      'Anticoagulants (warfarin, DOACs, heparin) — increased bleeding risk with NSAIDs; avoid combination',
      'Methotrexate — reduced clearance and increased toxicity with NSAIDs',
      'CNS depressants (alcohol, benzodiazepines) — additive sedation with opioids',
      'ACE inhibitors / diuretics — reduced antihypertensive efficacy and increased nephrotoxicity with NSAIDs',
    ],
    monitoring: 'Monitor pain scores, renal function (especially with NSAIDs in elderly/dehydrated), liver function (paracetamol), signs of bleeding/anaemia (NSAIDs), respiratory rate and sedation score (opioids), and bowel function (opioid-induced constipation).',
    counselling: 'Use the lowest effective dose for the shortest duration. Do not exceed maximum daily dose (especially paracetamol). Avoid alcohol. NSAIDs should be taken with food. Opioids may cause dependence — use exactly as prescribed. Report severe abdominal pain, black stools, or vomiting blood (NSAIDs).',
  },
  'Gastrointestinal': {
    drugClass: 'Gastrointestinal agent',
    classIndications: [
      'Management of acid-related disorders (GERD, peptic ulcer, gastritis)',
      'Treatment of nausea and vomiting',
      'Management of diarrhoea or constipation',
      'Inflammatory bowel disease management (maintenance and acute flares)',
    ],
    classSE: [
      'Headache, dizziness, gastrointestinal disturbances (common)',
      'Constipation or diarrhoea depending on agent',
      'Metabolic effects with prolonged PPI use: hypomagnesaemia, vitamin B12 deficiency, increased fracture risk, C. difficile infection',
      'Extrapyramidal reactions (metoclopramide, especially in young women and elderly)',
      'Photosensitivity (certain agents)',
    ],
    classCI: [
      'Hypersensitivity to active substance',
      'GI obstruction, perforation, or ileus (prokinetics)',
      'Concurrent QT-prolonging drugs (certain antiemetics)',
      'Severe hepatic impairment (hepatically metabolized agents)',
    ],
    classInteractions: [
      'PPIs — reduced absorption of ketoconazole, iron salts, digoxin, mycophenolate; separate dosing',
      'H2 receptor antagonists — absorption altered with pH-dependent drugs',
      'Antiemetics (metoclopramide, domperidone) — additive prokinetic effect; QT prolongation with domperidone',
      'Methotrexate — PPIs may reduce clearance; monitor for toxicity',
    ],
    monitoring: 'Monitor symptoms (dyspepsia, abdominal pain, bowel habit), renal function, magnesium levels with prolonged PPI use, vitamin B12 status (long-term PPI), signs of GI bleeding (stool occult blood). For IBD: inflammatory markers (CRP, ESR), faecal calprotectin.',
    counselling: 'PPIs should be taken 30–60 minutes before meals. Antacids should be taken as needed but not within 2 hours of other medications. Stay hydrated during diarrhoeal illness. Report persistent vomiting, blood in stools, or unexplained weight loss.',
  },
  'Endocrine/Metabolic': {
    drugClass: 'Endocrine / metabolic agent',
    classIndications: [
      'Diabetes mellitus management (Type 1 and Type 2)',
      'Thyroid disorder management (hypo- and hyperthyroidism)',
      'Corticosteroid replacement therapy (adrenal insufficiency)',
      'Metabolic syndrome / dyslipidaemia management',
    ],
    classSE: [
      'Hypoglycaemia (insulin, sulfonylureas) — educate on recognition and management',
      'Weight gain (certain antidiabetics, corticosteroids, insulin)',
      'GI disturbances: nausea, diarrhoea (metformin, GLP-1 agonists)',
      'Osteoporosis with prolonged corticosteroid use',
      'Adrenal suppression with chronic corticosteroid therapy',
    ],
    classCI: [
      'Hypersensitivity to active substance',
      'Severe renal impairment (metformin, certain antidiabetics)',
      'Active diabetic ketoacidosis (metformin — discontinue)',
      'Uncontrolled heart failure ( certain agents)',
    ],
    classInteractions: [
      'Alcohol — increased risk of hypoglycaemia with insulin and sulfonylureas; disulfiram-like reaction with metformin',
      'Corticosteroids — reduce antidiabetic efficacy; monitor blood glucose',
      'Warfarin — thyroid hormones and certain antidiabetics alter INR',
      'Beta-blockers — mask hypoglycaemic symptoms',
    ],
    monitoring: 'Monitor blood glucose (self-monitoring and HbA1c every 3 months), renal function, liver function, lipid profile, bone density with prolonged corticosteroid use, thyroid function tests (TSH, free T4), electrolytes, weight, and signs of hypoglycaemia or hyperglycaemia.',
    counselling: 'Diabetes: rotate injection sites (insulin), never skip meals on sulfonylureas, recognise signs of hypoglycaemia (shakiness, sweating, confusion). Thyroid: take on empty stomach (levothyroxine). Corticosteroids: do not stop abruptly — taper under medical guidance. Report any unusual symptoms.',
  },
  'Respiratory': {
    drugClass: 'Respiratory agent',
    classIndications: [
      'Asthma management (maintenance and rescue therapy)',
      'COPD management (maintenance therapy and exacerbation prevention)',
      'Allergic rhinitis treatment',
      'Cough and cold symptom management',
    ],
    classSE: [
      'Oral thrush (inhaled corticosteroids) — rinse mouth after use',
      'Tremor, tachycardia (beta-agonists)',
      'Hoarseness, throat irritation (inhaled corticosteroids)',
      'Systemic effects with high-dose inhaled corticosteroids (adrenal suppression, osteoporosis)',
      'Paradoxical bronchospasm (rare with inhalers)',
    ],
    classCI: [
      'Hypersensitivity to active substance',
      'Acute severe asthma (oral corticosteroids indicated — do not rely on reliever alone)',
      'Severe cardiac arrhythmias (systemic sympathomimetics)',
    ],
    classInteractions: [
      'Beta-blockers — may antagonize bronchodilation; avoid in asthma',
      'MAOIs — risk of hypertensive crisis with sympathomimetics',
      'CYP3A4 inhibitors (ritonavir, ketoconazole) — increase systemic corticosteroid levels',
      'Diuretics — hypokalaemia risk with high-dose beta-agonists',
    ],
    monitoring: 'Monitor peak expiratory flow rate (PEFR), FEV1, symptom control (ACT/CAT scores), inhaler technique, growth in children (inhaled corticosteroids), adrenal function with high-dose inhaled or oral corticosteroids, bone density with prolonged corticosteroid use.',
    counselling: 'Rinse mouth after inhaled corticosteroids to prevent thrush. Use reliever inhaler only as needed — overuse indicates poor control. Shake metered-dose inhalers well. Use spacer device with MDIs. Report worsening symptoms or increased reliever use.',
  },
  'Haematology/Oncology': {
    drugClass: 'Haematological / oncological agent',
    classIndications: [
      'Solid tumour chemotherapy',
      'Haematological malignancy treatment',
      'Thromboembolic disease prevention and treatment',
      'Supportive care during chemotherapy (antiemetics, growth factors)',
    ],
    classSE: [
      'Myelosuppression (neutropenia, thrombocytopenia, anaemia) — monitor FBC regularly',
      'Nausea, vomiting, mucositis (chemotherapy)',
      'Alopecia (certain cytotoxic agents)',
      'Peripheral neuropathy (taxanes, platinum agents, vinca alkaloids)',
      'Cardiotoxicity (anthracyclines) — cumulative dose-dependent',
    ],
    classCI: [
      'Severe myelosuppression (active neutropenia, thrombocytopenia)',
      'Severe hepatic or renal impairment (dose adjustment required)',
      'Pregnancy (most cytotoxic agents are teratogenic)',
      'Active uncontrolled infection (for immunosuppressive agents)',
    ],
    classInteractions: [
      'Live vaccines — contraindicated during immunosuppressive chemotherapy',
      'CYP450 substrates — many chemotherapy agents are CYP substrates/inhibitors',
      'Anticoagulants — increased bleeding risk with thrombocytopenia',
      'Nephrotoxic drugs — additive nephrotoxicity with platinum agents',
    ],
    monitoring: 'Monitor FBC with differential (before each cycle), renal function, liver function, tumour markers as appropriate, cardiac function (echocardiogram with anthracyclines), neurological assessment (peripheral neuropathy scoring), nutritional status, and signs of infection.',
    counselling: 'Report fever >38°C immediately (neutropenic sepsis risk). Maintain adequate hydration. Avoid live vaccines and contact with infectious individuals. Use effective contraception during and after treatment. Report mouth sores, unusual bleeding/bruising, or signs of infection.',
  },
  'Musculoskeletal': {
    drugClass: 'Musculoskeletal agent',
    classIndications: [
      'Rheumatoid arthritis and other inflammatory joint diseases',
      'Osteoarthritis pain management',
      'Gout (acute flares and urate-lowering therapy)',
      'Osteoporosis prevention and treatment',
    ],
    classSE: [
      'GI disturbance (NSAIDs, DMARDs)',
      'Hepatotoxicity (methotrexate, leflunomide) — monitor LFTs',
      'Bone marrow suppression (methotrexate, leflunomide, ciclosporin)',
      'Injection site reactions (biologic DMARDs)',
      'Increased infection risk (immunosuppressive DMARDs)',
    ],
    classCI: [
      'Active severe infection',
      'Severe hepatic or renal impairment',
      'Pregnancy and lactation (many DMARDs are teratogenic)',
      'Live vaccines during immunosuppressive therapy',
    ],
    classInteractions: [
      'NSAIDs — increased GI bleeding risk with corticosteroids and DMARDs',
      'Methotrexate — increased toxicity with trimethoprim/sulfamethoxazole, penicillins',
      'Live vaccines — contraindicated with immunosuppressive doses',
      'Warfarin — altered INR with NSAIDs and certain DMARDs',
    ],
    monitoring: 'Monitor disease activity scores (DAS28 for RA), FBC, LFT, U&E at baseline and regularly during DMARD therapy. Screen for TB before biologic therapy. Monitor for injection site reactions and infusion reactions. Assess bone density with prolonged corticosteroid use.',
    counselling: 'Take DMARDs regularly even if feeling well — they prevent disease progression. Report signs of infection immediately. Methotrexate: take once weekly with folic acid supplementation. Avoid pregnancy during and after DMARD therapy (check washout periods).',
  },
  'Immunology/Allergy': {
    drugClass: 'Immunological / anti-allergic agent',
    classIndications: [
      'Allergic rhinitis and urticaria management',
      'Autoimmune disease management (immunosuppressants)',
      'Transplant rejection prophylaxis',
      'Hypersensitivity reactions (desensitization protocols)',
    ],
    classSE: [
      'Drowsiness, sedation (first-generation antihistamines)',
      'Dry mouth, urinary retention (anticholinergic effects)',
      'Increased infection risk (immunosuppressants)',
      'Increased infection risk (especially reactivation of TB, hepatitis B, and opportunistic infections)',
      'Injection site reactions (pain, erythema, swelling)',
    ],
    classCI: [
      'Active severe infection',
      'Untreated latent TB / active TB',
      'Severe heart failure (certain biologics)',
      'Hypersensitivity to active substance',
    ],
    classInteractions: [
      'Live vaccines — contraindicated during treatment and for variable period after',
      'Immunosuppressants — additive immunosuppression',
      'CNS depressants — additive sedation with first-generation antihistamines',
      'CYP450 substrates — IL-6 inhibitors may alter metabolism of CYP substrates',
    ],
    monitoring: 'Screen for latent TB (IGRA/PPD), hepatitis B/C, HIV before initiating immunosuppressive therapy. FBC, LFT, U&E at baseline and periodically. Monitor for signs of infection at every visit. Assess disease activity scores. Review vaccination status before starting.',
    counselling: 'Increased risk of infections — report any fever, cough, unusual symptoms immediately. Stay up to date with vaccinations (avoid live vaccines while on treatment). Carry a treatment alert card. Do not stop or miss doses without consulting your specialist.',
  },
  'Renal/Electrolytes': {
    drugClass: 'Renal / electrolyte agent',
    classIndications: [
      'Correction of electrolyte abnormalities (hyperkalaemia, hypocalcaemia, hypomagnesaemia)',
      'Fluid and electrolyte replacement therapy',
      'Acid-base balance correction (metabolic acidosis)',
      'Management of hyperkalaemia emergencies',
    ],
    classSE: [
      'Local injection site reactions (pain, phlebitis, extravasation risk with calcium solutions)',
      'Hypercalcaemia / hypermagnesaemia / hypernatraemia with excessive replacement',
      'Cardiac arrhythmias (rapid correction of electrolytes)',
      'Metabolic alkalosis (excessive bicarbonate administration)',
      'Volume overload (sodium-containing solutions)',
    ],
    classCI: [
      'Hypercalcaemia / hypermagnesaemia / hypernatraemia (for respective replacement therapies)',
      'Severe renal impairment with oliguria/anuria',
      'Digitalis toxicity (calcium IV — risk of cardiac arrest)',
      'Extravasation risk (calcium solutions — IV access must be secure)',
    ],
    classInteractions: [
      'Digoxin — hypokalaemia/hypomagnesaemia increase digoxin toxicity; maintain normal levels',
      'Diuretics — increased electrolyte loss; monitor levels regularly',
      'ACE inhibitors / ARBs — hyperkalaemia risk (especially with potassium-sparing diuretics or K supplements)',
      'Corticosteroids — increased sodium retention and potassium loss',
    ],
    monitoring: 'Monitor serum electrolytes (Na, K, Ca, Mg, PO4), renal function (Cr, eGFR, BUN), fluid balance (input/output chart), ECG (for electrolyte-related arrhythmias), acid-base status (pH, bicarbonate, base excess), and signs of volume overload (oedema, JVP, lung auscultation).',
    counselling: 'Report any muscle cramps, weakness, palpitations, or shortness of breath. Take electrolyte supplements exactly as prescribed. Do not take additional potassium-containing products without consulting your doctor. Regular blood tests are essential for safe therapy.',
  },
  'Toxicology/Antidotes': {
    drugClass: 'Antidote / toxicology agent',
    classIndications: [
      'Acute poisoning / overdose management (specific antidote for known toxin)',
      'Reversal of drug toxicity (e.g., opioid reversal, benzodiazepine reversal)',
      'Enhanced elimination of toxins (multiple-dose activated charcoal)',
      'Chemical exposure management (specific antidotes for organophosphates, cyanide, heavy metals)',
    ],
    classSE: [
      'Nausea, vomiting, diarrhoea (activated charcoal)',
      'Tachycardia, hypertension, agitation (certain reversal agents)',
      'Anaphylaxis / hypersensitivity reactions (antivenoms, specific antidotes)',
      'Rebound toxicity as antidote wears off (naloxone in long-acting opioids)',
      'Electrolyte disturbances (specific chelating agents)',
    ],
    classCI: [
      'Hypersensitivity (for specific antidotes)',
      'Ileus / GI obstruction (activated charcoal — risk of aspiration and obstruction)',
      'Caustic ingestion (activated charcoal — contraindicated; endoscopy required)',
      'Petroleum distillate ingestion (activated charcoal — aspiration risk)',
    ],
    classInteractions: [
      'Activated charcoal — reduces absorption of ALL oral medications; separate all oral drugs by at least 2 hours',
      'Naloxone — concurrent use of other opioid antagonists',
      'Antivenoms — may interfere with vaccine efficacy',
      'Multiple antidote interactions depending on specific toxins',
    ],
    monitoring: 'Monitor vital signs continuously (BP, HR, SpO2, RR, GCS). Cardiac monitoring (ECG for toxin-induced arrhythmias). Serial toxin levels where available (paracetamol, salicylate, lithium, digoxin, theophylline, iron). Electrolytes, renal function, liver function, coagulation.',
    counselling: 'Poisoning is a medical emergency. Provide details of substance ingested, quantity, and time of ingestion to medical staff. Do not induce vomiting unless specifically directed. Bring containers/packaging to hospital. Antidotes work best when given early after exposure.',
  },
  'Nutrition/Vitamins': {
    drugClass: 'Nutritional supplement / vitamin',
    classIndications: [
      'Prevention and treatment of nutritional deficiencies',
      'Specific vitamin/mineral replacement therapy',
      'Supplementation in increased demand states (pregnancy, lactation, growth, recovery)',
      'Malabsorption syndromes (parenteral replacement when oral not feasible)',
    ],
    classSE: [
      'Gastrointestinal: nausea, constipation (iron preparations), diarrhoea (magnesium)',
      'Flushing / pruritus (niacin)',
      'Soft tissue calcification (excessive vitamin D / calcium)',
      'Iron overload (hereditary haemochromatosis or excessive supplementation)',
      'Injection site reactions (parenteral administration)',
    ],
    classCI: [
      'Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)',
      'Iron overload (haemochromatosis, haemosiderosis — iron supplements contraindicated)',
      'Severe renal impairment (certain electrolyte/vitamin formulations)',
      'Galactosaemia (lactose-containing formulations)',
    ],
    classInteractions: [
      'Tetracyclines / fluoroquinolones — absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2–4 hours',
      'Thyroxine — absorption reduced by calcium, iron; separate dosing by 4 hours',
      'Warfarin — vitamin K reverses anticoagulation; consistent dietary intake important',
      'PPIs — reduced absorption of calcium, vitamin B12, magnesium',
    ],
    monitoring: 'Monitor serum levels of the specific nutrient being supplemented. Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices.',
    counselling: 'Supplements are not a substitute for a balanced diet. Iron: take with vitamin C to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity.',
  },
  'Anaesthesia': {
    drugClass: 'Anaesthetic agent',
    classIndications: [
      'Induction and maintenance of general anaesthesia',
      'Local and regional anaesthesia for surgical procedures',
      'Sedation for procedures / intensive care',
      'Muscle relaxation for intubation and surgery',
    ],
    classSE: [
      'Respiratory depression (dose-dependent) — require airway management and ventilatory support',
      'Hypotension / haemodynamic instability (many anaesthetic agents)',
      'Post-operative nausea and vomiting (PONV)',
      'Malignant hyperthermia (volatile anaesthetics + suxamethonium)',
      'Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)',
    ],
    classCI: [
      'Hypersensitivity to active substance',
      'Malignant hyperthermia susceptibility (triggering agents)',
      'Severe cardiovascular instability / uncompensated shock',
      'Raised intracranial pressure (certain agents)',
      'Porphyria (barbiturates, etomidate)',
    ],
    classInteractions: [
      'Opioids / benzodiazepines — synergistic respiratory depression and sedation',
      'Volatile anaesthetics — sensitize myocardium to catecholamines (arrhythmia risk)',
      'Antihypertensives — exaggerated hypotension with anaesthetic induction agents',
      'Neuromuscular blocking agents — potentiated by volatile anaesthetics, aminoglycosides, magnesium',
    ],
    monitoring: 'Continuous ECG, non-invasive BP (every 1–5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Recovery monitoring: Aldrete / Steward score.',
    counselling: 'Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24–48 hours after anaesthesia.',
  },
  'Ophthalmology': {
    drugClass: 'Ophthalmic agent',
    classIndications: [
      'Treatment of glaucoma (reduction of intraocular pressure)',
      'Management of ocular infections (conjunctivitis, keratitis, endophthalmitis)',
      'Control of ocular inflammation (uveitis, post-operative inflammation)',
      'Diagnostic mydriasis / cycloplegia for eye examination',
    ],
    classSE: [
      'Local irritation: burning, stinging, blurred vision upon instillation (transient)',
      'Systemic absorption effects (beta-blockers: bradycardia, bronchospasm; anticholinergics: dry mouth, tachycardia)',
      'Allergic conjunctivitis / contact dermatitis (preservatives especially benzalkonium chloride)',
      'Increased intraocular pressure (certain agents in susceptible individuals)',
      'Periorbital skin changes / discolouration (prostaglandin analogues)',
    ],
    classCI: [
      'Hypersensitivity to active substance or preservatives',
      'Narrow-angle glaucoma (mydriatics/cycloplegics — risk of acute angle closure)',
      'Severe asthma / COPD (topical beta-blockers)',
      'Sinus bradycardia / heart block (topical beta-blockers)',
    ],
    classInteractions: [
      'Beta-blockers (oral) — additive systemic beta-blockade with topical beta-blockers',
      'Calcium channel blockers / digoxin — additive cardiac effects with topical beta-blockers',
      'Multiple eye drops — separate by at least 5 minutes to prevent washout',
    ],
    monitoring: 'Monitor intraocular pressure (tonometry), visual acuity, visual fields, optic disc assessment. Corneal examination (slit lamp). Systemic effects: pulse, BP (especially with beta-blockers).',
    counselling: 'Remove contact lenses before instilling drops (wait 15 minutes before reinserting). Apply pressure to the inner corner of the eye for 1 minute after drops. Do not touch the dropper tip to your eye. Separate different eye drops by 5 minutes.',
  },
  'Other': {
    drugClass: 'Therapeutic agent',
    classIndications: [
      'Management of specific conditions as per approved indications',
      'Symptom control and improvement of quality of life',
      'Prevention of disease progression or complications',
      'Treatment of refractory cases where first-line options have failed',
    ],
    classSE: [
      'Gastrointestinal disturbances (nausea, diarrhoea, constipation)',
      'Headache, dizziness, fatigue',
      'Allergic / hypersensitivity reactions (rash, urticaria; rarely anaphylaxis)',
      'Hepatic enzyme elevations (monitor LFTs during therapy)',
      'Effect on renal function (monitor U&E at baseline and during therapy)',
    ],
    classCI: [
      'Hypersensitivity to active substance or any excipient',
      'Severe hepatic impairment (hepatically metabolized drugs)',
      'Severe renal impairment (renally excreted drugs)',
      'Pregnancy and lactation (where applicable)',
    ],
    classInteractions: [
      'CYP450 interactions: potential for altered metabolism with CYP inducers/inhibitors',
      'Anticoagulants — may affect INR or bleeding risk',
      'Antihypertensives — additive hypotensive effects',
      'Alcohol — avoid or limit during therapy',
    ],
    monitoring: 'Monitor clinical response to therapy, renal function, liver function, full blood count as appropriate. Monitor for adverse effects based on specific drug profile. Therapeutic drug monitoring where applicable.',
    counselling: 'Take medication exactly as prescribed. Do not stop or adjust dose without consulting your doctor. Report any unusual symptoms, persistent side effects, or lack of therapeutic response. Keep all follow-up appointments for monitoring.',
  },
};

function generateMonograph(drug: CanonicalDrug, fdaData: OpenFdaLabel | null): DrugMonograph {
  const template = CLASS_SPECIFIC_CONTENT[drug.therapeuticClass] || CLASS_SPECIFIC_CONTENT['Other'];
  const n = drug.name;

  // Use FDA data where available, fall back to class-specific content
  const fdaIndications = fdaArray(fdaData?.indications_and_usage);
  const fdaSE = fdaArray(fdaData?.adverse_reactions);
  const fdaCI = fdaArray(fdaData?.contraindications);
  const fdaInteractions = fdaArray(fdaData?.drug_interactions);
  const fdaWarnings = fdaArray(fdaData?.warnings);
  const fdaBBW = fdaArray(fdaData?.boxed_warning);
  const fdaMOA = fdaText(fdaData?.mechanism_of_action) || fdaText(fdaData?.description);
  const fdaPK = fdaText(fdaData?.pharmacokinetics);
  const fdaOverdose = fdaText(fdaData?.overdose);
  const fdaPregnancy = fdaText(fdaData?.pregnancy);
  const fdaGeneric = fdaData?.openfda?.generic_name?.[0] || n;
  const fdaBrands = fdaData?.openfda?.brand_name?.slice(0, 5) || [];

  return {
    name: n,
    generic_name: fdaGeneric !== n ? fdaGeneric : n,
    drug_class: fdaData?.openfda?.pharm_class_epc?.[0] || template.drugClass,
    indications: fdaIndications.length > 0 ? fdaIndications : template.classIndications,
    contraindications: fdaCI.length > 0 ? fdaCI : template.classCI,
    side_effects: fdaSE.length > 0 ? fdaSE : template.classSE,
    dosage: {
      adult: { 'Standard dosing (adult)': 'Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications.' },
      paediatric: { 'Standard dosing (paediatric)': 'Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently.' },
      geriatric: { 'Standard dosing (geriatric)': 'Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely.' },
      renalAdjustment: "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines.",
      hepaticAdjustment: 'Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C).',
    },
    interactions: fdaInteractions.length > 0 ? fdaInteractions : template.classInteractions.map(s => s.replace(/{drug}/g, n)),
    monitoring: fdaData ? `${template.monitoring.replace(/{drug}/g, n)} FDA-specific monitoring data available in prescribing information.` : template.monitoring.replace(/{drug}/g, n),
    patient_counselling: template.counselling.replace(/{drug}/g, n),
    mechanism_of_action: fdaMOA || `Mechanism of action for ${n} (${template.drugClass}). Refer to prescribing information for detailed pharmacological properties.`,
    brand_names: fdaBrands.length > 0 ? fdaBrands : [],
    warnings: fdaWarnings.length > 0 ? fdaWarnings : [],
    pregnancy_category: fdaPregnancy ? fdaPregnancy.slice(0, 200) : 'Consult current prescribing information',
    overdose: fdaOverdose ? fdaOverdose.slice(0, 500) : `Seek immediate medical attention in case of overdose. Symptoms and management depend on the specific drug. No specific antidote available for most agents.`,
    pharmacokinetics: fdaPK ? fdaPK.slice(0, 500) : 'Refer to prescribing information for detailed pharmacokinetic data including absorption, distribution, metabolism, and elimination.',
    black_box_warnings: fdaBBW.length > 0 ? fdaBBW : [],
    clinical_pearls: [],
  };
}

function generateBatchFile(monographs: DrugMonograph[], batchNumber: number, outputDir: string): void {
  const filename = `seed-drug-monographs-batch${batchNumber}.ts`;
  const lines: string[] = [
    `/**`,
    ` * seed-drug-monographs-batch${batchNumber}.ts`,
    ` * Auto-generated batch of drug monograph seed data`,
    ` * Generated from canonical drug registry with OpenFDA enrichment`,
    ` */`,
    ``,
    `import 'dotenv/config';`,
    `import { createClient } from '@supabase/supabase-js';`,
    ``,
    `const SUPABASE_URL = process.env.SUPABASE_URL!;`,
    `const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;`,
    ``,
    `if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {`,
    `  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');`,
    `  process.exit(1);`,
    `}`,
    ``,
    `const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);`,
    ``,
    `interface DrugMonograph {`,
    `  name: string;`,
    `  generic_name: string;`,
    `  drug_class: string;`,
    `  indications: string[];`,
    `  contraindications: string[];`,
    `  side_effects: string[];`,
    `  dosage: Record<string, any>;`,
    `  interactions: string[];`,
    `  monitoring: string;`,
    `  patient_counselling: string;`,
    `  mechanism_of_action: string;`,
    `  brand_names: string[];`,
    `  warnings: string[];`,
    `  pregnancy_category: string;`,
    `  overdose: string;`,
    `  pharmacokinetics: string;`,
    `  black_box_warnings: string[];`,
    `  clinical_pearls: string[];`,
    `}`,
    ``,
    `const MONOGRAPHS: DrugMonograph[] = [`,
  ];

  for (const m of monographs) {
    lines.push(`  {`);
    lines.push(`    name: ${JSON.stringify(m.name)},`);
    lines.push(`    generic_name: ${JSON.stringify(m.generic_name)},`);
    lines.push(`    drug_class: ${JSON.stringify(m.drug_class)},`);
    lines.push(`    indications: ${JSON.stringify(m.indications, null, 6).replace(/\n\s{6}/g, ' ').replace(/\n\s{4}\]/g, ' ]')},`);
    lines.push(`    contraindications: ${JSON.stringify(m.contraindications, null, 6).replace(/\n\s{6}/g, ' ').replace(/\n\s{4}\]/g, ' ]')},`);
    lines.push(`    side_effects: ${JSON.stringify(m.side_effects, null, 6).replace(/\n\s{6}/g, ' ').replace(/\n\s{4}\]/g, ' ]')},`);
    const dosageJson = JSON.stringify(m.dosage, null, 4)
      .replace(/^\{/, '')
      .replace(/\}$/, '')
      .split('\n').map((l, i) => {
        if (i === 0) return l.trimEnd();
        if (l.trimStart().startsWith('"')) return `      ${l.trimStart()}`;
        return l;
      }).join('\n');
    lines.push(`    dosage: {${dosageJson}`);
    lines.push(`    },`);
    lines.push(`    interactions: ${JSON.stringify(m.interactions, null, 6).replace(/\n\s{6}/g, ' ').replace(/\n\s{4}\]/g, ' ]')},`);
    lines.push(`    monitoring: ${JSON.stringify(m.monitoring)},`);
    lines.push(`    patient_counselling: ${JSON.stringify(m.patient_counselling)},`);
    lines.push(`    mechanism_of_action: ${JSON.stringify(m.mechanism_of_action)},`);
    lines.push(`    brand_names: ${JSON.stringify(m.brand_names)},`);
    lines.push(`    warnings: ${JSON.stringify(m.warnings, null, 6).replace(/\n\s{6}/g, ' ').replace(/\n\s{4}\]/g, ' ]')},`);
    lines.push(`    pregnancy_category: ${JSON.stringify(m.pregnancy_category)},`);
    lines.push(`    overdose: ${JSON.stringify(m.overdose)},`);
    lines.push(`    pharmacokinetics: ${JSON.stringify(m.pharmacokinetics)},`);
    lines.push(`    black_box_warnings: ${JSON.stringify(m.black_box_warnings)},`);
    lines.push(`    clinical_pearls: ${JSON.stringify(m.clinical_pearls)},`);
    lines.push(`  },`);
  }

  lines.push(`];`);
  lines.push(``);
  lines.push(`async function upsertMonograph(m: DrugMonograph): Promise<boolean> {`);
  lines.push(`  const { error } = await supabase.from('drug_monographs').upsert(`);
  lines.push(`    { ...m, id: undefined },`);
  lines.push(`    { onConflict: 'name', ignoreDuplicates: false }`);
  lines.push(`  );`);
  lines.push(`  if (error) {`);
  lines.push(`    console.error(\`Failed to upsert \${m.name}: \${error.message}\`);`);
  lines.push(`    return false;`);
  lines.push(`  }`);
  lines.push(`  console.log(\`Upserted: \${m.name}\`);`);
  lines.push(`  return true;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`async function main() {`);
  lines.push(`  let success = 0, failed = 0;`);
  lines.push(`  for (const m of MONOGRAPHS) {`);
  lines.push(`    const ok = await upsertMonograph(m);`);
  lines.push(`    if (ok) success++; else failed++;`);
  lines.push(`  }`);
  lines.push(`  console.log(\`\\nBatch ${batchNumber} complete: \${success} inserted, \${failed} failed\`);`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`main().catch(console.error);`);

  const outputPath = path.join(outputDir, filename);
  fs.writeFileSync(outputPath, lines.join('\n'));
  console.log(`Wrote ${outputPath}`);
}

async function main() {
  const flags = parseFlags();
  console.log(`Flags: FDA-only=${flags.fdaOnly}, dry-run=${flags.dryRun}, limit=${flags.limit ?? 'all'}, offset=${flags.offset}`);

  const registry: CanonicalDrug[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'drug-registry-canonical.json'), 'utf-8')
  );

  let candidates = registry.filter(d => d.status === 'new');
  if (flags.offset > 0) candidates = candidates.slice(flags.offset);
  if (flags.limit) candidates = candidates.slice(0, flags.limit);

  console.log(`Processing ${candidates.length} drugs (of ${registry.filter(d => d.status === 'new').length} unseeded total)...`);

  const monographs: DrugMonograph[] = [];
  let fdaHits = 0;

  for (let i = 0; i < candidates.length; i++) {
    const drug = candidates[i];
    process.stdout.write(`[${i + 1}/${candidates.length}] ${drug.name} ... `);

    const fdaData = await fetchOpenFdaLabel(drug.name);
    if (fdaData) {
      fdaHits++;
      console.log(`FDA ✓`);
    } else {
      console.log(`FDA ✗ (using class template)`);
    }

    if (flags.fdaOnly && !fdaData) continue;

    monographs.push(generateMonograph(drug, fdaData));

    // Rate limit: 300ms between requests
    if (i < candidates.length - 1) await sleep(300);
  }

  console.log(`\nFDA data found for ${fdaHits}/${candidates.length} drugs (${monographs.length} monographs generated)`);

  if (flags.dryRun) {
    console.log('\n--- DRY RUN: Output to console ---');
    for (const m of monographs.slice(0, 5)) {
      console.log(`\n${m.name} (${m.drug_class})`);
      console.log(`  Generic: ${m.generic_name}`);
      console.log(`  Brands: ${m.brand_names.join(', ') || 'N/A'}`);
      console.log(`  Indications: ${m.indications.slice(0, 3).join('; ')}`);
      console.log(`  MOA: ${m.mechanism_of_action.slice(0, 100)}...`);
      console.log(`  BBW: ${m.black_box_warnings.length > 0 ? m.black_box_warnings.join('; ') : 'None'}`);
    }
    console.log(`\n... and ${monographs.length - 5} more. Use without --dry-run to write files.`);
    return;
  }

  // Generate batch files
  const BATCH_SIZE = 40;
  let batchNum = 1;

  // Find highest existing batch number
  const existingBatches = fs.readdirSync(__dirname).filter(f => f.match(/seed-drug-monographs-batch(\d+)\.ts/));
  const existingNums = existingBatches.map(f => parseInt(f.match(/seed-drug-monographs-batch(\d+)\.ts/)![1]));
  if (existingNums.length > 0) batchNum = Math.max(...existingNums) + 1;

  for (let i = 0; i < monographs.length; i += BATCH_SIZE) {
    const batch = monographs.slice(i, i + BATCH_SIZE);
    generateBatchFile(batch, batchNum, __dirname);
    batchNum++;
  }

  console.log(`\nDone. Generated ${monographs.length} monographs across ${Math.ceil(monographs.length / BATCH_SIZE)} batch files.`);
}

main().catch(console.error);
