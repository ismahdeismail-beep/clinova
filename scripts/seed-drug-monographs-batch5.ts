/**
 * seed-drug-monographs-batch5.ts
 * ----------------------------------------------------------------------------
 * Phase C — Incremental Knowledge Population
 * Batch 5: Prednisolone, Omeprazole, Ondansetron, Lactulose, Chlorphenamine,
 *          Morphine (Respiratory / GI / Palliative)
 *
 * Usage: npx tsx scripts/seed-drug-monographs-batch5.ts
 * Env:   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
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
  // ── 1. Prednisolone ──────────────────────────────────────────────
  {
    name: 'Prednisolone',
    generic_name: 'Prednisolone',
    drug_class: 'Corticosteroid (glucocorticoid — intermediate-acting)',
    indications: [
      'Acute severe asthma exacerbation',
      'Chronic asthma (maintenance in severe persistent asthma)',
      'COPD exacerbation (systemic corticosteroids 5–7 days)',
      'Rheumatoid arthritis (disease-modifying — low-dose maintenance)',
      'Systemic lupus erythematosus (SLE — flare management)',
      'Allergic reactions (severe, including anaphylaxis — adjunctive)',
      'Drug hypersensitivity reactions / DRESS / SJS (early high-dose)',
      'Idiopathic thrombocytopenic purpura (ITP)',
      'Nephrotic syndrome (first-line induction)',
      'Organ transplantation (immunosuppression — with other agents)',
      'Inflammatory bowel disease (UC and Crohn\'s — moderate-severe flares)',
      'Autoimmune hepatitis (first-line)',
      'Sarcoidosis',
      'Adrenal insufficiency (physiological replacement — hydrocortisone preferred but prednisolone used if necessary)',
      'Cerebral oedema (high-dose dexamethasone preferred but high-dose prednisolone alternative)',
      'Bell\'s palsy (short course)',
    ],
    contraindications: [
      'Hypersensitivity to prednisolone or any corticosteroid',
      'Systemic fungal infection (untreated — disseminates) — treat antifungal first',
      'Live or live-attenuated vaccines (contraindicated during high-dose immunosuppressive therapy)',
      'Peptic ulcer disease (active — relative: use PPI cover)',
      'Severe osteoporosis (relative — monitor BMD, supplement Ca/vitamin D)',
      'Uncontrolled diabetes (relative — monitor glucose closely, anticipate insulin dose increase)',
      'Uncontrolled hypertension (relative — monitor BP)',
      'Psychiatric illness (relative — corticosteroids can precipitate psychosis)',
      'Herpes simplex keratitis (relative — risk of corneal perforation)',
    ],
    side_effects: [
      'Endocrine/Metabolic: hyperglycaemia (diabetes induction or worsening), adrenal suppression (HPA axis — with prolonged therapy >3 weeks, caused by abrupt withdrawal; taper slowly), Cushing\'s syndrome (moon face, buffalo hump, central obesity, striae, hirsutism), growth suppression in children, hirsutism, menstrual irregularities',
      'Musculoskeletal: osteoporosis (dose and duration-dependent — 5% BMD loss/year), avascular necrosis of femoral head, proximal myopathy, tendon rupture, growth retardation (children)',
      'Gastrointestinal: peptic ulceration/gastritis (especially with NSAIDs), pancreatitis, oesophageal candidiasis, fatty liver',
      'Dermatological: skin thinning, easy bruising, impaired wound healing, acne, striae, purpura, hirsutism, perioral dermatitis',
      'CNS: insomnia, euphoria, depression, psychosis, agitation, pseudotumour cerebri (benign intracranial hypertension), epidural lipomatosis',
      'Cardiovascular: hypertension, fluid retention/oedema, hypokalaemia, accelerated atherosclerosis',
      'Ocular: posterior subcapsular cataracts, glaucoma (open-angle), increased intraocular pressure, exacerbation of herpes simplex keratitis',
      'Immunological: increased susceptibility to infections (TB reactivation, fungal, viral, bacterial — especially in high doses), impaired wound healing, masking of infection symptoms',
      'Haematological: leukocytosis (increased neutrophils, decreased lymphocytes/eosinophils), thrombosis risk increased',
    ],
    dosage: {
      adult: {
        'Acute asthma exacerbation': '40–50 mg PO once daily for 5–7 days (no taper needed if ≤7 days)',
        'COPD exacerbation': '30 mg PO once daily for 5 days',
        'Rheumatoid arthritis (low-dose maintenance)': '5–10 mg PO once daily (lowest effective dose; taper if used long-term)',
        'SLE flare': '0.5–1 mg/kg PO once daily for 4–8 weeks then taper',
        'Nephrotic syndrome induction': '1 mg/kg PO once daily (max 80 mg) for 4–8 weeks then taper',
        'Autoimmune hepatitis induction': '1 mg/kg PO once daily (max 60 mg) for 4 weeks, then taper by 5–10 mg/week',
        'IBD flare': '40–60 mg PO once daily for 1–2 weeks then taper by 5–10 mg/week',
        'Allergic reaction (severe)': '40–60 mg PO once daily for 3–7 days',
        'ITP': '0.5–2 mg/kg PO once daily until platelet response then taper',
        'Adrenal insufficiency (stress dosing)': 'Double or triple maintenance dose for acute illness (fever, surgery); typical stress dose: 20–30 mg PO daily',
      },
      paediatric: {
        'Asthma exacerbation': '1–2 mg/kg PO once daily (max 40 mg) for 3–5 days',
        'Nephrotic syndrome': '2 mg/kg PO once daily (max 60 mg) for 4–6 weeks then taper',
        'Croup': '1 mg/kg PO once daily for 3–5 days',
      },
      taperingSchedule: {
        'Short course (<7 days)': 'No taper needed — stop abruptly',
        'Medium course (7–21 days)': 'Taper over 1–2 weeks (e.g., reduce by 5 mg every 2–3 days)',
        'Long-term (>21 days)': 'Taper slowly over weeks to months (e.g., reduce by 2.5–5 mg every 1–4 weeks depending on dose and duration). Once ≤10 mg/day, reduce by 1 mg every 2–4 weeks. Consider morning vs alternate-day dosing to reduce HPA suppression.',
        'HPA axis recovery': 'Can take 6–12 months after stopping long-term steroids. Stress dosing needed during this period.',
      },
      renalAdjustment: 'No dose adjustment required.',
      hepaticAdjustment: 'Reduce dose in severe impairment. Prednisolone is activated from prednisone in the liver — conversion may be impaired. Prednisolone is the active form and preferred in hepatic impairment.',
    },
    interactions: [
      'NSAIDs (ibuprofen, diclofenac, naproxen, aspirin): SIGNIFICANTLY increased risk of GI bleeding and peptic ulceration — use PPI cover, avoid if possible, or use COX-2 inhibitor with caution',
      'Warfarin: either increased or decreased INR (variable — steroids affect clotting factors) — monitor INR',
      'Antidiabetic agents (insulin, sulphonylureas): hyperglycaemic effect antagonises diabetes drugs — monitor glucose, may need 2–3x increase in insulin or OAD dose',
      'Antihypertensives: corticosteroids cause fluid retention and hypertension — antagonise BP control, monitor BP',
      'Diuretics: additive hypokalaemia (especially with loop/thiazide diuretics) — monitor K+, supplement if needed',
      'Amphotericin B: additive hypokalaemia — monitor K+ closely',
      'Ciclosporin, tacrolimus: increased immunosuppression AND increased levels of both — monitor levels and side effects',
      'Phenytoin, carbamazepine, rifampicin, phenobarbital: increased corticosteroid metabolism (CYP3A4 induction) — may need 2–3x higher prednisolone dose',
      'Macrolides (erythromycin, clarithromycin): increased corticosteroid levels (CYP3A4 inhibition) — monitor for Cushing\'s syndrome',
      'Oestrogens (contraceptives, HRT): increased corticosteroid levels — may need dose reduction',
      'Live vaccines: CONTRAINDICATED during high-dose immunosuppression (risk of disseminated infection) — defer until prednisolone <20 mg/day for >2 weeks',
      'Anti-inflammatory effect: MASKS signs of infection (fever, inflammation) — maintain high index of suspicion',
    ],
    monitoring: 'Baseline: FBC, glucose/HbA1c, BP, weight/BMI, bone density (DEXA if prolonged therapy expected >3 months), eye exam (IOP, cataract screening), TB screening (chest X-ray, IGRA/TST in high-risk), hepatitis B/C serology. During therapy: glucose fasting — weekly for first month then monthly (if long-term); BP at each visit; weight monitoring at each visit; bone density annually (if on ≥7.5 mg/day for >3 months — give Ca 1,000–1,500 mg + vitamin D 800–1,000 IU daily + bisphosphonate if indicated); eye exam annually (cataract, glaucoma screening); growth monitoring in children (height chart every 3–6 months). HPA axis assessment: if prolonged >3 weeks, assume HPA suppression. Tapering: see tapering schedule. If acute illness, surgery, or trauma — stress dose steroids are required (do NOT stop abruptly). Monitor for infection — steroids mask signs.',
    patient_counselling: 'Take in the MORNING with breakfast to reduce insomnia and mimic the body\'s natural cortisol rhythm. Do NOT stop this medicine suddenly if you have been taking it for more than 3 weeks — the dose must be reduced gradually (tapered) under medical supervision to prevent adrenal crisis. You will need a steroid card or MedicAlert bracelet saying you are on steroids — carry this at all times. During illness, injury, or surgery, you may need extra steroids — inform any doctor treating you. Seek immediate medical attention if: severe abdominal pain (pancreatitis/ulcer), black/tarry stools (GI bleed), severe headache with visual changes (raised intracranial pressure), or leg swelling/pain (thrombosis). Weight gain and moon face are common — discuss dietary changes with your doctor. Monitor your blood sugar if you have diabetes. Take calcium and vitamin D supplements to protect bone health. Avoid NSAID painkillers (ibuprofen, diclofenac) — use paracetamol. Report any fever or signs of infection — steroids can hide infection symptoms.',
  },

  // ── 2. Omeprazole ─────────────────────────────────────────────────
  {
    name: 'Omeprazole',
    generic_name: 'Omeprazole',
    drug_class: 'Proton pump inhibitor (PPI) — substituted benzimidazole',
    indications: [
      'Gastro-oesophageal reflux disease (GORD/GERD) — healing oesophagitis and maintenance',
      'Peptic ulcer disease (PUD) — gastric and duodenal ulcer treatment and prevention of relapse',
      'Helicobacter pylori eradication — with amoxicillin + clarithromycin or metronidazole + tetracycline (triple/quadruple therapy)',
      'NSAID-associated ulcer prophylaxis — in high-risk patients (elderly, prior PUD, concurrent anticoagulants/corticosteroids/antiplatelets)',
      'Stress ulcer prophylaxis — in ICU patients (mechanical ventilation >48 hrs, coagulopathy, severe trauma/burns, major surgery)',
      'Zollinger-Ellison syndrome (gastrinoma) — high-dose PPI',
      'Barrett\'s oesophagus — long-term acid suppression',
      'Dyspepsia — functional (empiric trial) and organic',
      'Eosinophilic oesophagitis — off-label but commonly used (swallowed topical corticosteroids are first-line)',
      'Prophylaxis of rebleeding after endoscopic treatment of bleeding peptic ulcer — high-dose IV PPI infusion then oral',
      'Aspirin/antiplatelet GI protection — with low-dose aspirin or clopidogrel in high-risk patients',
    ],
    contraindications: [
      'Hypersensitivity to omeprazole or any PPI (substituted benzimidazole cross-reactivity)',
      'Concurrent use with nelfinavir or atazanavir (reduced ARV absorption — reduces therapeutic effect; use famotidine instead with careful timing)',
      'Concurrent use with methotrexate (high-dose — increased methotrexate levels and toxicity)',
      'Long-term use without appropriate indication (increased risks: Clostridium difficile, osteoporosis, hypomagnesaemia, vitamin B12 deficiency, chronic kidney disease, dementia association)',
    ],
    side_effects: [
      'Gastrointestinal: nausea, vomiting, diarrhoea, constipation, flatulence, abdominal pain, fundic gland polyps (long-term use)',
      'CNS: headache (common ~5%), dizziness, fatigue, insomnia, somnolence',
      'Dermatological: rash, pruritus, urticaria, erythema multiforme, Stevens-Johnson syndrome (rare)',
      'Infectious: Clostridium difficile-associated diarrhoea (CDAD — increased risk with PPI use, especially prolonged), community-acquired pneumonia (possible small increased risk), small intestinal bacterial overgrowth (SIBO)',
      'Metabolic: hypomagnesaemia (rare but serious — with prolonged use >1 year; presents: tetany, seizures, arrhythmias; check Mg2+ before and during long-term therapy), vitamin B12 deficiency (impaired absorption with long-term use), iron malabsorption',
      'Renal: acute interstitial nephritis (AIN — rare but potentially serious; may occur at any time; presents with AKI, fever, eosinophilia, sterile pyuria — discontinue, treat with corticosteroids, avoid rechallenge), chronic kidney disease (CKD — possible association with long-term use)',
      'Bone: osteoporosis, fractures (hip, spine, wrist — associated with high-dose prolonged use >1 year; mechanism: reduced calcium absorption), especially in postmenopausal women',
      'Electrolytes: hyponatraemia (rare — SIADH-like)',
      'Hepatic: elevated transaminases (rare), hepatitis, jaundice, hepatic failure (extremely rare)',
      'Haematological: leukopenia, thrombocytopenia, agranulocytosis (very rare)',
    ],
    dosage: {
      adult: {
        'GORD / Reflux oesophagitis': '20 mg PO once daily for 4–8 weeks (for oesophagitis healing, continue 8–12 weeks if severe)',
        'GORD maintenance': '10–20 mg PO once daily (lowest effective dose; consider on-demand therapy in non-erosive reflux disease)',
        'PUD (gastric/duodenal ulcer)': '20 mg PO once daily for 4–8 weeks (gastric: 8 weeks; duodenal: 4 weeks)',
        'H. pylori eradication': '20 mg PO twice daily for 7–14 days (with antibiotics: amoxicillin 1 g + clarithromycin 500 mg twice daily — standard triple therapy)',
        'NSAID prophylaxis': '20 mg PO once daily (for duration of NSAID therapy in at-risk patients)',
        'Stress ulcer prophylaxis (ICU)': '40 mg IV bolus, then 40 mg IV once daily (or 20 mg PO via NG tube once daily)',
        'Zollinger-Ellison syndrome': '60–120 mg PO once daily (dose individualised based on acid output; max 240 mg/day in divided doses)',
        'Upper GI bleed post-endoscopy': '80 mg IV bolus, then 8 mg/hour continuous IV infusion for 72 hours, then 20–40 mg PO once daily',
        'Functional dyspepsia': '20 mg PO once daily for 4–8 weeks',
      },
      paediatric: {
        'GORD infants (1–12 months, ≥5 kg)': '0.7–1 mg/kg PO once daily (use MUPS/dispersible tablet)',
        'GORD children 1–12 yrs': '5–20 mg PO once daily (weight-based: ≤10 kg: 5 mg, 10–20 kg: 10 mg, ≥20 kg: 20 mg)',
        'GORD adolescents ≥12 yrs': '20 mg PO once daily',
        'Erosive oesophagitis — children': 'Weight-based dosing; max 20–40 mg once daily',
      },
      renalAdjustment: 'No dose adjustment required. Omeprazole is extensively hepatically metabolised — <1% excreted unchanged renally. No accumulation in renal impairment including dialysis. Use standard doses.',
      hepaticAdjustment: 'Mild-moderate impairment: no adjustment needed. Severe impairment (Child-Pugh C): reduce dose to 10–20 mg PO once daily (omeprazole clearance is reduced by 30–40%; bioavailability increased). Monitor for side effects.',
    },
    interactions: [
      'CLOPIDOGREL: SIGNIFICANT REDUCTION in clopidogrel activation (omeprazole inhibits CYP2C19 which converts clopidogrel to its active metabolite) — INCREASED CV EVENTS in some studies; use pantoprazole or rabeprazole instead (less CYP2C19 inhibition); if omeprazole must be used, separate dosing by 12 hours (but still some interaction)',
      'ATAZANAVIR, NELFINAVIR (HIV protease inhibitors): markedly reduced ARV absorption (increased gastric pH reduces solubility) — CONTRAINDICATED for atazanavir; avoid for nelfinavir; use famotidine instead with staggered timing',
      'METHOTREXATE: increased methotrexate levels (omeprazole inhibits renal tubular secretion of methotrexate) — especially with high-dose methotrexate; temporarily hold PPI during high-dose methotrexate therapy',
      'PHENYTOIN: increased phenytoin levels (CYP2C19 inhibition) — monitor phenytoin levels',
      'WARFARIN: possibly increased INR (rare — but monitor when starting/stopping omeprazole)',
      'DIGOXIN: slightly increased digoxin levels (increased gastric pH alters digoxin hydrolysis) — monitor digoxin levels at high omeprazole doses',
      'CICLOSPORIN: increased ciclosporin levels (possible CYP3A4 inhibition at high doses) — monitor levels',
      'IRON, CALCIUM CARBONATE, MAGNESIUM, ZINC, FERROUS SULPHATE: reduced absorption (PPI reduces acid needed for dissolution/ionisation) — advise: iron/calcium supplements dissolve better in acidic environment, consider alternative dosing or different supplements',
      'CETOCONAZOLE, ITRACONAZOLE, POSACONAZOLE: reduced absorption (require acidic gastric pH for dissolution) — give with acidic drink (cola) or use alternative antifungal (fluconazole, voriconazole)',
      'MYCOPHENOLATE MOFETIL (MMF): reduced MMF absorption — monitor mycophenolate levels; effect less pronounced with enteric-coated mycophenolate sodium',
      'VITAMIN B12: impaired absorption with long-term PPI therapy — monitor B12 levels in long-term therapy (>1 year), especially in elderly or malnourished',
      'TACROLIMUS: possibly increased tacrolimus levels — monitor levels',
    ],
    monitoring: 'No routine monitoring required for short-term use (4–8 weeks). For long-term therapy (>1 year): serum magnesium level (before starting and periodically — if symptoms: tetany, arrhythmias, seizures), vitamin B12 level (annually in elderly or malnourished), renal function (Cr annually — risk of interstitial nephritis and CKD), bone density (if prolonged high-dose therapy, especially postmenopausal women). Assess ongoing need annually — attempt step-down to lowest effective dose or consider on-demand therapy. Rebound acid hypersecretion occurs when stopping — taper dose gradually if long-term use. Calcium and vitamin D supplementation: recommend adequate intake to offset fracture risk. C. diff risk counsel: report persistent diarrhoea.',
    patient_counselling: 'Take omeprazole FIRST THING IN THE MORNING, at least 30–60 minutes BEFORE breakfast (acid pumps are most active after fasting; food delays absorption). Swallow the capsule whole — do NOT crush or chew. If using the dispersible tablet (MUPS), mix with 1 tablespoon of water and drink immediately. Improvement usually occurs within 2–4 days — full effect may take 2–4 weeks for oesophagitis healing. Do NOT take this medicine long-term without your doctor reviewing the need — it is not intended for casual long-term use. Prolonged use (>1 year) can increase risk of bone fractures (especially hip/wrist/spine), vitamin B12 deficiency, and low magnesium levels. Report severe diarrhoea (C. difficile), muscle cramps/twitching (hypomagnesaemia), or bone pain. If you take clopidogrel (blood thinner for heart/stents), ask your doctor about switching to a different PPI. If you take iron or calcium supplements, take them at a different time of day.',
  },

  // ── 3. Ondansetron ────────────────────────────────────────────────
  {
    name: 'Ondansetron',
    generic_name: 'Ondansetron Hydrochloride',
    drug_class: '5-HT₃ receptor antagonist (antiemetic)',
    indications: [
      'Chemotherapy-induced nausea and vomiting (CINV) — acute phase (moderately to highly emetogenic chemotherapy)',
      'Postoperative nausea and vomiting (PONV) — prophylaxis and treatment',
      'Radiotherapy-induced nausea and vomiting',
      'Gastroenteritis-associated vomiting (especially in children — WHO Essential Medicine)',
      'Hyperemesis gravidarum (pregnancy — second line after antihistamines/pyridoxine; limited data in first trimester; some guidelines restrict use)',
      'Opioid-induced nausea (palliative care)',
      'Nausea and vomiting in terminal illness (palliative care)',
    ],
    contraindications: [
      'Hypersensitivity to ondansetron or any 5-HT₃ antagonist',
      'Congenital long QT syndrome (absolute contraindication — ondansetron prolongs QTc interval in a dose- and concentration-dependent manner)',
      'Concurrent use with apomorphine (severe hypotension and loss of consciousness reported)',
      'Severe hepatic impairment (Child-Pugh C — max 8 mg/day in divided doses)',
      'Phenylketonuria (oral dissolving tablets contain aspartame — use regular tablets instead)',
      'Intestinal obstruction (antiemetic may mask symptoms)',
    ],
    side_effects: [
      'Cardiac: QT interval prolongation (dose-dependent — especially at single IV doses >16 mg or with cumulative high doses; risk increased with electrolyte abnormalities, bradycardia, concurrent QT-prolonging drugs, congenital long QT), ECG changes',
      'CNS: headache (most common ~10–15%), dizziness, fatigue, drowsiness, warm sensation or flushing, extrapyramidal reactions (rare — dystonia, oculogyric crisis, dyskinesia — especially with repeated IV doses), seizures (rare)',
      'Gastrointestinal: constipation (common ~5–10%; especially with repeated use), diarrhoea, xerostomia (dry mouth), hiccups',
      'Hypersensitivity: rash, urticaria, pruritus, angioedema, anaphylaxis (rare), bronchospasm',
      'Ocular: transient visual disturbances (blurred vision, transient blindness — rare, usually resolves within minutes to hours)',
      'Hepatic: elevated transaminases (transient, usually asymptomatic)',
      'Local: injection site reaction (pain, erythema, burning)',
      'Cardiovascular: hypotension, bradycardia, syncope (especially with rapid IV administration)',
      'Serotonin syndrome (very rare — especially with concurrent serotonergic drugs: SSRIs, SNRIs, MAOIs — monitor for agitation, hyperthermia, hyperreflexia, clonus, tremor, diarrhoea)',
    ],
    dosage: {
      adult: {
        'CINV — moderately emetogenic chemotherapy': '8 mg PO 30 minutes before chemotherapy, then 8 mg PO twice daily for 1–2 days after chemotherapy',
        'CINV — highly emetogenic chemotherapy': '16 mg IV (over 15 minutes) 30 minutes before highly emetogenic chemotherapy (max single IV dose 16 mg due to QTc risk — some regulators no longer recommend the 32 mg single dose); then 8 mg PO twice daily for 2–3 days',
        'PONV prophylaxis': '4 mg IV at induction of anaesthesia (or 8 mg ODT 1 hour before surgery)',
        'PONV treatment': '1–4 mg IV (slow bolus over 2–5 minutes)',
        'Gastroenteritis — adults': '4–8 mg PO (or 4 mg IV) every 8 hours as needed (max 24 mg/day oral or 16 mg/day IV)',
        'Palliative care': '4–8 mg PO/sublingual every 8 hours as needed — consider scheduled + PRN',
        'Radiotherapy-induced': '8 mg PO 1–2 hours before radiotherapy, then 8 mg every 8 hours as needed',
      },
      paediatric: {
        'CINV — children 6 months–18 yrs': '5 mg/m² IV (max 8 mg) 30 minutes before chemotherapy, then 4 mg PO 12 hours later; then 4 mg PO 3 times daily for up to 5 days',
        'PONV — children 1 month–12 yrs, >40 kg': '4 mg IV at induction',
        'PONV — children 1 month–12 yrs, ≤40 kg': '0.1 mg/kg IV (max 4 mg) at induction',
        'Gastroenteritis — children ≥6 months': '2–4 mg PO/ODT (4–8 mg if ≥8 yrs or >30 kg) single dose (if vomiting persists, repeat once after 8 hours)',
        'Gastroenteritis — infants 6 months–2 yrs': '2 mg PO/ODT single dose (max 4 mg/day)',
      },
      geriatric: {
        'General dosing': 'Same as adult. Caution with QTc prolongation (elderly more susceptible). Use lowest effective dose. Monitor electrolytes and ECG.',
      },
      renalAdjustment: 'No dose adjustment required. Ondansetron is extensively hepatically metabolised — <5% renally excreted unchanged. No accumulation in renal impairment.',
      hepaticAdjustment: 'Child-Pugh A–B (mild-moderate): no dose adjustment. Child-Pugh C (severe): MAX 8 mg/day in divided doses (every 12 hours, not every 8). Ondansetron clearance is significantly reduced in severe hepatic impairment.',
    },
    interactions: [
      'QT-PROLONGING DRUGS (amiodarone, sotalol, citalopram, escitalopram, haloperidol, methadone, chlorpromazine, levofloxacin, moxifloxacin, clarithromycin, erythromycin): additive QT prolongation — avoid combination or monitor QTc closely',
      'APOMORPHINE: severe hypotension, loss of consciousness — CONTRAINDIATED (do not use within 48 hours of each other)',
      'SSRIs / SNRIs / MAOIs (fluoxetine, paroxetine, sertraline, venlafaxine, duloxetine): increased risk of serotonin syndrome — monitor for agitation, tremor, hyperreflexia, clonus, hyperthermia, diarrhoea',
      'TRAMADOL: reduced tramadol analgesic efficacy (ondansetron is a weak 5-HT₃ antagonist — may block tramadol\'s serotonergic analgesic component) — consider alternative antiemetic in tramadol-treated patients',
      'CYP3A4 INDUCERS (carbamazepine, phenytoin, rifampicin, phenobarbital): increased ondansetron clearance — may need higher ondansetron dose',
      'CYP3A4 INHIBITORS (ketoconazole, itraconazole, clarithromycin): reduced ondansetron clearance — monitor for ondansetron side effects (QTc prolongation, sedation)',
      'FENTANYL, SUFENTANIL: reduced opioid analgesic efficacy (possible 5-HT₃ antagonism) — monitor for increased pain',
    ],
    monitoring: 'ECG (QTc): before ondansetron in patients with cardiac risk factors (pre-existing heart disease, electrolyte abnormalities, elderly, concurrent QT-prolonging drugs). Correct hypokalaemia and hypomagnesaemia BEFORE administration. IV administration: give slow IV bolus over 2–5 minutes (not rapid push — hypotension/bradycardia risk). Monitor for extrapyramidal symptoms (dystonia, oculogyric crisis) especially in children receiving repeated IV doses. Serotonin syndrome vigilance: concurrent serotonergic drugs — educate patient to report agitation, tremor, diarrhoea, confusion. Efficacy assessment: first 24 hours after chemotherapy — number of emetic episodes and nausea severity (CTCAE scale).',
    patient_counselling: 'Take ondansetron as prescribed — usually BEFORE the trigger (chemotherapy, surgery) to prevent nausea. For chemotherapy: take the first dose 30 minutes before chemo. For motion sickness or morning sickness, other medicines are usually preferred. Do not drive or operate machinery if you feel drowsy or dizzy. This medicine can cause constipation with repeated use — increase fibre and fluid intake, use a stool softener if needed. Seek medical attention if: palpitations, shortness of breath, or fainting (QT prolongation signs), severe headache with vision changes, twitching or uncontrollable muscle movements (extrapyramidal symptoms). Avoid alcohol. If you have heart problems or take other QT-prolonging medicines, inform your doctor before taking ondansetron.',
  },

  // ── 4. Lactulose ──────────────────────────────────────────────────
  {
    name: 'Lactulose',
    generic_name: 'Lactulose',
    drug_class: 'Osmotic laxative; ammonia-lowering agent',
    indications: [
      'Constipation — acute and chronic (first-line in elderly, children, pregnancy, opioid-induced, and as alternative to stimulant laxatives)',
      'Hepatic encephalopathy (HE) — acute and prophylaxis (reduces ammonia by acidifying the colon, trapping NH₄⁺, and reducing NH₃ absorption — first-line therapy)',
      'Portal-systemic encephalopathy — prevention of recurrent episodes',
      'Bowel preparation (off-label) — as part of bowel-cleansing regimens (less common)',
    ],
    contraindications: [
      'Hypersensitivity to lactulose or any excipient',
      'Galactosaemia (lactulose contains galactose and lactose — CONTRAINDICATED in congenital galactosaemia)',
      'Intestinal obstruction or suspected obstruction (do NOT use if obstruction, perforation, or ileus)',
      'Acute inflammatory bowel disease (UC/Crohn\'s flare — relative, can cause gaseous distension which may worsen symptoms)',
      'Lactose intolerance (relative — can cause additional bloating/cramping; small amounts may not trigger in all; observe)',
      'Faecal impaction (treat impaction first with enema before oral laxatives)',
      'Undiagnosed abdominal pain (especially appendicitis — do not use until diagnosis confirmed)',
    ],
    side_effects: [
      'Gastrointestinal: flatulence, bloating, abdominal cramps, borborygmi (stomach rumbling — common, especially at initiation; usually subsides within a few days)',
      'Diarrhoea (dose-dependent — excessive dose leads to watery stools; in HE, titrate to 2–3 soft stools/day; excessive diarrhoea can cause: dehydration, electrolyte disturbances — hypokalaemia, hypernatraemia, metabolic alkalosis — especially in HE)',
      'Nausea, vomiting, abdominal discomfort — less common',
      'Hypernatraemia (with excessive doses — water loss > sodium loss)',
      'Taste disturbance (sweet, syrupy taste — may be unpleasant for some patients; can be chilled or mixed with fruit juice/cordial)',
      'Aspiration pneumonitis (if given via NG tube incorrectly — rare; ensure correct tube placement)',
    ],
    dosage: {
      adult: {
        'Constipation — initial': '15–30 mL (10–20 g) PO once daily or twice daily',
        'Constipation — maintenance': '15–30 mL PO once daily (titrate to produce 1–2 soft stools per day)',
        'Constipation — max': '60 mL/day in divided doses',
        'Hepatic encephalopathy — acute': '30–60 mL (20–40 g) PO 3–4 times daily (titrate to produce 2–3 soft stools per day)',
        'HE — via NG tube': '30–60 mL via NG tube every 1–2 hours until laxation, then reduce to 3–4 times daily',
        'HE — retention enema': '200–300 mL mixed with 700 mL water or normal saline, retained for 30–60 minutes every 4–8 hours (for severe HE or when oral/NG route not possible)',
        'HE — maintenance/prophylaxis': '15–45 mL PO 2–4 times daily (individualised to achieve 2–3 soft stools/day)',
      },
      paediatric: {
        'Constipation — children 1–16 yrs': '2.5–20 mL PO once daily (age/weight-based: 1–5 yrs: 2.5–5 mL; 5–10 yrs: 5–10 mL; 10–16 yrs: 10–20 mL)',
        'Constipation — infants': '2.5–5 mL PO once daily (for bottle-fed infants — mix with feed)',
        'Hepatic encephalopathy — children': 'Age/weight-based — titrate to 2–3 soft stools/day; consult specialist',
      },
      renalAdjustment: 'No dose adjustment required. Lactulose is not absorbed systemically. No renal clearance. Safe in all stages of CKD and dialysis.',
      hepaticAdjustment: 'Specifically indicated for hepatic encephalopathy in patients with liver disease. Use lower initial dose in advanced cirrhosis (risk of volume depletion from excessive diarrhoea). Monitor electrolytes closely in HE treatment (diarrhoea can worsen hyponatraemia, hypokalaemia which can worsen HE).',
    },
    interactions: [
      'OTHER LAXATIVES: additive effect with stimulant laxatives (senna, bisacodyl, sodium picosulphate) — may cause excessive diarrhoea and electrolyte disturbances',
      'DIURETICS: additive hypokalaemia (if excessive diarrhoea from lactulose) — monitor K+',
      'ANTIBIOTICS (neomycin, rifaximin, metronidazole, vancomycin): may reduce lactulose efficacy by altering the gut flora responsible for lactulose metabolism (acidification effect) — but rifaximin is synergistic with lactulose in HE; monitor stool output',
      'ORAL ANTACIDS: may reduce lactulose\'s colonic acidification effect — separate by 1–2 hours in HE patients',
      'DRUGS AFFECTED BY pH: lactulose acidifies the colon (lowers pH) — theoretically may affect pH-dependent drug release (e.g., mesalazine, certain enteric-coated formulations) — clinical significance unclear',
    ],
    monitoring: 'Constipation: monitor stool frequency and consistency (Bristol Stool Chart), abdominal symptoms (bloating, cramps). Hepatic encephalopathy: monitor stool output (target 2–3 soft stools/day), mental status (West Haven criteria for HE grading — asterixis, consciousness level, behaviour, intellectual function), daily weight, neurological examination, serum ammonia (trend — levels correlate poorly with clinical severity but useful for trend), serum electrolytes (Na+, K+, Cl-, HCO₃-), renal function. In both: assess for excessive diarrhoea, dehydration (skin turgor, mucous membranes, BP, pulse). Long-term: monitor for electrolyte disturbances, especially in elderly, hepatic impairment, or renal impairment.',
    patient_counselling: 'Lactulose may take 24–48 hours to produce a bowel movement for constipation — do not expect immediate results. The syrup is very sweet — you can mix it with fruit juice, water, or milk, or chill it to improve the taste. Bloating and gas are common in the first few days but usually settle — continue treatment. For constipation: start with one dose daily and adjust based on response (aim for 1–2 soft stools per day). Drink adequate fluids (6–8 glasses daily). For liver disease (hepatic encephalopathy): the dose is adjusted to produce 2–3 soft stools per day — this is INTENTIONAL and necessary for treatment. Do not reduce the dose without medical advice. If you develop persistent diarrhoea, dehydration, or weakness, contact your doctor. Store at room temperature — do not freeze.',
  },

  // ── 5. Chlorphenamine ─────────────────────────────────────────────
  {
    name: 'Chlorphenamine',
    generic_name: 'Chlorphenamine Maleate (Chlorpheniramine)',
    drug_class: 'First-generation antihistamine (H₁-receptor antagonist) — sedating alkylamine',
    indications: [
      'Allergic rhinitis (seasonal and perennial) — symptomatic relief of rhinorrhoea, sneezing, nasal itching',
      'Urticaria (acute and chronic — especially acute allergic urticaria)',
      'Angioedema (mild-moderate) — adjunct to adrenaline in anaphylaxis',
      'Allergic conjunctivitis',
      'Insect bite/sting reactions',
      'Drug-induced allergic reactions (urticarial, morbilliform rashes)',
      'Anaphylaxis — adjunctive (second-line after adrenaline, corticosteroids)',
      'Pruritus (itching) of various causes — eczema, atopic dermatitis, contact dermatitis, chickenpox',
      'Common cold — symptomatic relief of rhinorrhoea and sneezing (anticholinergic effect on nasal secretions)',
      'Allergic transfusion reactions — prophylaxis (pre-medication before blood products in patients with prior reactions)',
      'Symptomatic dermographism',
    ],
    contraindications: [
      'Hypersensitivity to chlorphenamine or any antihistamine',
      'Neonates and premature infants (paradoxical excitation risk)',
      'Breastfeeding (avoid — excreted in breast milk; may cause sedation, irritability, or paradoxical excitation in nursing infants; also may suppress lactation)',
      'MAO inhibitor use (within 14 days — enhanced anticholinergic and sedative effects; risk of hypertensive crisis)',
      'Severe hepatic impairment (relative — reduced clearance)',
      'Angle-closure glaucoma (anticholinergic effect — raises intraocular pressure)',
      'Urinary retention due to prostatic hyperplasia (anticholinergic effect)',
      'Severe cardiovascular disease (relative — can cause tachycardia and arrhythmias)',
      'Pyloroduodenal obstruction (anticholinergic effect — worsens obstruction)',
      'Pregnancy (third trimester — risk of paradoxical reactions in neonates; first/second trimester — use only if clearly needed; non-sedating antihistamines preferred in pregnancy)',
    ],
    side_effects: [
      'CNS: SEDATION (most prominent — drowsiness, somnolence, impaired concentration, psychomotor performance — 10–50%; may impair driving, machinery operation, and cognitive function; tolerance to sedation develops after 3–7 days), dizziness, headache, paradoxical excitation (especially in children — irritability, hyperactivity, insomnia), confusion (elderly), dystonia (rare)',
      'Anticholinergic: dry mouth, blurred vision (accommodation difficulty), urinary retention (especially in BPH), constipation, thickened bronchial secretions, tachycardia, mydriasis',
      'Gastrointestinal: nausea, vomiting, diarrhoea, epigastric distress, loss of appetite',
      'Dermatological: rash, urticaria, photosensitivity (rare), fixed drug eruption (rare)',
      'Haematological: haemolytic anaemia, thrombocytopenia, agranulocytosis (very rare — with prolonged high-dose use)',
      'Cardiovascular: palpitations, tachycardia, arrhythmias, hypotension (especially with rapid IV administration — in anaphylaxis, give slow IV push over 3–5 minutes)',
      'Respiratory: thickening of bronchial secretions — caution in asthma/COPD',
    ],
    dosage: {
      adult: {
        'Allergic rhinitis / urticaria (standard)': '4 mg PO every 4–6 hours as needed (max 24 mg/day)',
        'Anaphylaxis (adjunctive)': '10–20 mg IV/IM slow (over 3–5 minutes); may repeat every 6–8 hours (max 40 mg/day)',
        'Allergic transfusion reaction prophylaxis': '4 mg PO 1 hour before transfusion',
        'Common cold (symptomatic)': '4 mg PO every 4–6 hours as needed (max 24 mg/day)',
      },
      paediatric: {
        'Children 2–5 yrs': '1 mg PO every 4–6 hours as needed (max 6 mg/day)',
        'Children 6–11 yrs': '2 mg PO every 4–6 hours as needed (max 12 mg/day)',
        'Children ≥12 yrs': '4 mg PO every 4–6 hours as needed (max 24 mg/day)',
      },
      geriatric: {
        'Starting dose': '2 mg PO every 6–8 hours as needed (elderly more sensitive to CNS and anticholinergic effects — higher risk of confusion, falls, urinary retention, dry mouth). Prefer non-sedating antihistamines (loratadine, cetirizine) in elderly when possible.',
      },
      renalAdjustment: 'CrCl 30–50: use with caution (prolonged half-life). CrCl <30: avoid if possible — increased risk of CNS anticholinergic toxicity. If used, reduce dose and frequency — chlorphenamine is partially renally excreted.',
      hepaticAdjustment: 'Mild-moderate: reduce dose — prolonged half-life. Severe: avoid if possible; if necessary, use lowest effective dose and monitor for excessive sedation.',
    },
    interactions: [
      'ALCOHOL: additive CNS depression — significant impairment of driving and psychomotor skills; educate all patients, especially in first week of therapy',
      'CNS DEPRESSANTS (barbiturates, benzodiazepines, opioids, antipsychotics, anaesthetics, muscle relaxants): additive sedation and cognitive impairment',
      'MAO INHIBITORS (phenelzine, tranylcypromine, isocarboxazid, selegiline): increased anticholinergic effects AND risk of hypertensive crisis (MAOIs prolong and intensify anticholinergic effects) — CONTRAINDIATED within 14 days',
      'ANTICHOLINERGICS (TCAs, antispasmodics, antipsychotics, antiparkinsonian drugs, disopyramide): additive anticholinergic effects — dry mouth, blurred vision, urinary retention, constipation, cognitive impairment',
      'BETA-BLOCKERS: may reduce antihistamine efficacy (at beta-2 receptors) — monitor',
      'PHENYTOIN: chlorphenamine may inhibit phenytoin metabolism (rare) — monitor levels',
      'WARFARIN: chlorphenamine may reduce anticoagulant effect (reported, not well-established) — monitor INR',
      'LABORATORY TEST INTERFERENCE: antihistamines can suppress positive skin-prick allergy tests — discontinue antihistamines 48–72 hours BEFORE allergy skin testing',
    ],
    monitoring: 'Efficacy: symptom relief (rhinitis: nasal discharge, sneezing, itching; urticaria: wheal/flare suppression, pruritus relief). Tolerability: sedation (do not drive until effect known), anticholinergic side effects (dry mouth, blurred vision, constipation, urinary hesitancy). In children: monitor for paradoxical excitation. In elderly: assess for confusion, falls risk, urinary retention. Skin-prick testing: discontinue chlorphenamine 48–72 hours before. Counselling: first-generation antihistamines impair driving for 4–6 hours after dosing — patients must not drive, operate machinery, or perform hazardous activities.',
    patient_counselling: 'CRITICAL: This medicine causes significant DROWSINESS — do NOT drive, operate machinery, or engage in hazardous activities after taking it. Alcohol will worsen the drowsiness — avoid alcohol completely. The sedative effect may reduce after a few days of regular use. Dry mouth, blurred vision, and constipation are common — drink extra water, use sugar-free gum for dry mouth, and increase dietary fibre. In children, watch for unusual excitement or restlessness (paradoxical reaction) — if this occurs, stop and consult your doctor. For mild allergies, non-drowsy antihistamines (loratadine, cetirizine) may be preferred during the day — discuss with your pharmacist. If you are over 65, this medicine may increase your risk of falls, confusion, and difficulty urinating — use with caution. For allergy testing (skin prick), stop this medicine 2–3 days before your appointment.',
  },

  // ── 6. Morphine ───────────────────────────────────────────────────
  {
    name: 'Morphine',
    generic_name: 'Morphine Sulfate',
    drug_class: 'Opioid analgesic (full mu-opioid receptor agonist — natural alkaloid)',
    indications: [
      'Severe acute pain (trauma, burns, fractures, renal colic, post-surgical, MI — STEMI/NSTEMI analgesia and haemodynamic stabilisation)',
      'Chronic cancer pain (moderate–severe — WHO analgesic ladder step 3; first-line strong opioid)',
      'Palliative care — pain, dyspnoea, cough, terminal agitation',
      'Acute pulmonary oedema (cardiogenic) — reduces preload (venodilatation) and relieves distress',
      'Myocardial infarction (analgesic + haemodynamic benefits — reduces sympathetic tone, decreases myocardial O₂ demand)',
      'Sickle cell vaso-occlusive crisis (severe acute pain)',
      'Postoperative pain (IV, IM, SC, neuraxial — epidural/spinal)',
      'Neonatal abstinence syndrome (morphine is first-line — stabilisation and gradual weaning)',
      'Procedural sedation (with amnesia/anxiolysis — with benzodiazepine)',
    ],
    contraindications: [
      'Hypersensitivity to morphine or any opioid',
      'Respiratory depression (respiratory rate <10/min, hypoxia, hypercapnia, cor pulmonale)',
      'Acute severe asthma exacerbation (except in ICU/ventilated settings)',
      'Obstructive sleep apnoea (untreated, severe)',
      'Head injury / raised intracranial pressure (unless ventilated — morphine increases ICP, depresses respiratory drive, constricts pupils — interferes with neurological assessment)',
      'Paralytic ileus, GI obstruction, or suspected surgical abdomen (opioids delay gastric emptying and worsen ileus)',
      'MAO inhibitor use within 14 days (risk of serotonin syndrome or hypertensive crisis)',
      'Phaeochromocytoma (can stimulate catecholamine release)',
      'Acute pancreatitis (relative — can worsen biliary spasm; use cautiously)',
      'Biliary colic (morphine causes sphincter of Oddi spasm — may worsen biliary pain; pethidine preferred)',
      'Severe hepatic impairment (precipitates hepatic encephalopathy — reduce dose or avoid)',
      'Pregnancy (prolonged use — neonatal opioid withdrawal syndrome [NOWS]; avoid during labour — may cause respiratory depression in neonate)',
      'Breastfeeding (avoid chronic use — excreted in breast milk; short-term use for acute pain may be acceptable; observe infant for sedation and respiratory depression)',
    ],
    side_effects: [
      'RESPIRATORY: respiratory depression (dose-dependent — the most dangerous acute effect; decreased rate and depth; tolerance develops over 3–7 days; equilibrium: effect on CO₂ responsiveness; risk highest in opioid-naïve, elderly, COPD, sleep apnoea, and with other CNS depressants)',
      'CNS: sedation, drowsiness, dizziness, confusion, euphoria, dysphoria, delirium, hallucinations, miosis (pinpoint pupils — characteristic of opioid effect; useful for monitoring), tolerance, physical dependence, opioid-induced hyperalgesia (with prolonged high-dose use)',
      'GASTROINTESTINAL: constipation (most common chronic side effect — TOLERANCE DOES NOT DEVELOP; prophylactic laxatives are essential), nausea and vomiting (common at initiation — usually settles in 3–7 days; treat with antiemetic), delayed gastric emptying, biliary spasm, ileus',
      'CARDIOVASCULAR: hypotension (histamine release — especially with rapid IV; venodilatation → decreased preload), bradycardia, syncope (orthostatic)',
      'ENDOCRINE: opioid-induced androgen deficiency (OPIAD — reduced libido, erectile dysfunction, fatigue, depression, osteoporosis with prolonged use), hypogonadism, hyperprolactinaemia, adrenal insufficiency (rare with prolonged high-dose therapy)',
      'DERMATOLOGICAL: pruritus (histamine-mediated — common; especially with IV and neuraxial routes), urticaria, sweating, flushing',
      'GENITOURINARY: urinary retention (especially in elderly men with BPH), ureteric colic (increased ureteric tone), antidiuretic hormone release (decreased urine output)',
      'IMMUNOLOGICAL: immunosuppression (chronic opioid use — increased infection risk — mu-receptor-mediated modulation of immune function)',
      'DEPENDENCE AND ADDICTION: physical dependence (expected with >7–14 days of continuous use — withdrawal on abrupt cessation), addiction (psychological dependence — risk increased in those with personal/family history of substance use disorder; risk low in cancer pain and acute pain management)',
      'OVERDOSE: respiratory depression (rate <8/min, hypoxia, hypercapnia), miosis, stupor/coma, pulmonary oedema, hypotension, rhabdomyolysis — treat with NALOXONE (naloxone 0.04–0.4 mg IV/IM/SC, titrate to respiratory rate >10/min — avoid precipitating acute withdrawal)',
    ],
    dosage: {
      adult: {
        'Acute severe pain (opioid-naïve)': '5–10 mg IV/IM/SC every 2–4 hours as needed (IV: 1–2 mg/min slow bolus, titrate to pain relief/respiratory rate; max 30 mg in 4 hours for acute titration)',
        'Chronic cancer pain (oral)': '5–15 mg PO every 4 hours (starting dose; use immediate-release for breakthrough and for titration; then convert to sustained-release 12-hourly formulation: total daily dose / 2 every 12 hours)',
        'Sustained-release — maintenance': '10–100 mg PO every 12 hours (individualised; titrate to pain control)',
        'Breakthrough pain': '1/6th of total daily dose as immediate-release morphine every 2–4 hours PRN',
        'MI / Acute pulmonary oedema': '2.5–10 mg IV slow bolus (2 mg/min) — titrate to pain/dyspnoea relief and respiratory rate',
        'Patient-controlled analgesia (PCA)': 'Loading dose 2–5 mg IV; PCA dose 0.5–2 mg; lockout 5–10 minutes; background infusion optional (0.5–2 mg/hour for opioid-tolerant patients only)',
        'Sickle cell crisis (severe)': '5–10 mg IV/SC every 2–4 hours (or PCA) — titrate to effect, monitor respiratory rate',
      },
      paediatric: {
        'Acute severe pain — children': '0.1–0.2 mg/kg IV/IM/SC every 2–4 hours (max 15 mg/dose)',
        'Oral — children': '0.2–0.5 mg/kg PO every 4 hours (max 15 mg/dose)',
        'PCA — children ≥7 yrs': 'Loading dose 0.1 mg/kg; PCA dose 0.025–0.05 mg/kg; lockout 5–15 minutes',
        'Neonatal abstinence syndrome': '0.05–0.2 mg/kg PO/IV every 3–4 hours (weaning protocol per Finnegan scores)',
      },
      geriatric: {
        'Acute pain — starting dose': '2.5–5 mg IV/IM/SC every 4–6 hours (reduce dose by 25–50% — increased sensitivity, decreased clearance, higher risk of respiratory depression and delirium)',
        'Chronic pain — starting dose': '2.5–5 mg PO every 4–6 hours (titrate slowly — 25% increments every 3–5 days)',
      },
      renalAdjustment: 'CrCl 30–50: reduce dose by 25–50% (morphine-6-glucuronide [M6G] — active metabolite accumulates in renal impairment and is ~50x more potent than morphine — causes neurotoxicity: myoclonus, seizure, sedation, respiratory depression). CrCl <30: reduce dose by 50–75% and increase interval — prefer fentanyl or hydromorphone (less accumulation of active metabolites). Monitor for myoclonus and over-sedation — if signs of neurotoxicity, switch opioid.',
      hepaticAdjustment: 'Reduce dose and increase interval in hepatic impairment. Morphine has high first-pass metabolism — oral bioavailability increases in cirrhosis. Start with 25–33% of usual dose. Monitor for encephalopathy (opioids can precipitate hepatic encephalopathy). Prefer fentanyl (hepatic-independent clearance) in severe hepatic impairment.',
    },
    interactions: [
      'OTHER CNS DEPRESSANTS (benzodiazepines, alcohol, barbiturates, muscle relaxants, antipsychotics): additive respiratory depression and sedation — INCREASED MORTALITY RISK with opioid-benzodiazepine combination; avoid or reduce doses of both; titrate carefully',
      'MAO INHIBITORS (phenelzine, tranylcypromine, selegiline): serotonin syndrome (hyperthermia, agitation, hyperreflexia, rigidity, autonomic instability) OR severe respiratory depression — avoid; discontinue MAOI at least 14 days before starting morphine',
      'SSRIs, SNRIs, TCAs, TRAMADOL: increased risk of serotonin syndrome — monitor for agitation, tremor, clonus, hyperreflexia, hyperthermia, diarrhoea',
      'RIFAMPICIN, PHENYTOIN, CARBAMAZEPINE: reduced morphine levels (metabolism induction) — may need dose increase',
      'CIMETIDINE: increased morphine levels (CYP inhibition) — may cause over-sedation',
      'ANTICHOLINERGICS (TCAs, antispasmodics): additive constipation and urinary retention — prescribe prophylactic laxatives',
      'DIURETICS: reduced diuretic efficacy (morphine increases ADH release) — monitor urine output',
      'METOCLOPRAMIDE: opioid antagonises metoclopramide\'s prokinetic effect on gastric emptying',
      'MUSCLE RELAXANTS: additive constipation — laxative cover essential',
      'BUPROPION: lowers seizure threshold — caution in patients with history of seizures',
      'NALOXONE, NALTREXONE: opioid antagonists — precipitate withdrawal in opioid-dependent patients; used therapeutically for overdose and for opioid-induced constipation (peripherally-acting mu-opioid antagonists: methylnaltrexone, naloxegol, naldemedine)',
    ],
    monitoring: 'PAIN: assess pain using validated scale (NRS 0–10, VAS, FLACC in children, PAINAD in dementia) — reassess 30–60 minutes after parenteral dose, 60–90 minutes after oral dose. RESPIRATORY: respiratory rate (monitor during sleep too — most dangerous period); oxygen saturation (keep >92%); sedation score (e.g., Pasero Opioid-Induced Sedation Scale — if S >3, hold opioid; S=1: awake/alert, S=2: slightly drowsy, S=3: frequently drowsy, S=4: somnolent/minimal response, S=5: unrousable). BOWEL: monitor bowel frequency — prophylactic laxative (senna + docusate or bisacodyl + lactulose) for ALL regular morphine patients. TOLERANCE: reassess need for dose escalation — rule out disease progression/new pain. PHYSICAL DEPENDENCE: educate about not abruptly stopping (taper by 10–20% every 3–7 days). URINARY: monitor for retention (especially elderly men). RENAL FUNCTION: reassess Cr/eGFR regularly — accumulate M6G causes neurotoxicity. OVERDOSE PREVENTION: maximal naloxone kit prescription? (In high-risk patients — opioid dose >100 mg morphine equivalent/day, concurrent benzodiazepines, COPD, sleep apnoea, history of overdose).',
    patient_counselling: 'CRITICAL: This medicine can cause life-threatening respiratory depression — take exactly as prescribed. Do NOT drink alcohol, take benzodiazepines, or use any other sedative medicines without consulting your doctor. Only drive if you have been on a stable dose for at least 2–4 weeks without sedation — and NEVER drive if you feel drowsy. Constipation is expected and does NOT improve with time — you MUST take laxatives (stool softener + stimulant) from day 1. Report severe constipation, stomach pain, or vomiting (possible ileus). Store this medicine securely — out of reach of children and visitors. Do not share with anyone — even if they have similar pain. If you stop taking this medicine for more than a few days, your tolerance will decrease — any subsequent restart must be at a lower dose. Do NOT stop suddenly after taking for more than 1–2 weeks — withdrawal symptoms (anxiety, sweating, diarrhoea, muscle aches, runny nose, goosebumps) can occur; the dose must be gradually reduced. Signs of overdose: extreme drowsiness, slow/shallow breathing (RR <10/min), difficulty waking, pinpoint pupils, blue/grey lips — this is a medical emergency — call 911 or get to emergency immediately — naloxone may be given. Seek help if you feel you need more medicine than prescribed or are using it for reasons other than pain — this could be a sign of addiction.',
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
  console.log('║   Batch 5: 6 Medicines (Resp/GI/Palliative)       ║');
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
  console.log('━━━ Batch 5 Summary ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Intended:      ${MONOGRAPHS.length}`);
  console.log(`  Successful:    ${success}`);
  console.log(`  Failed:        ${fail}`);
  console.log(`  Prior total:   ${before}`);
  console.log(`  Current total: ${after}`);
  console.log();

  if (fail === 0 && success === MONOGRAPHS.length) {
    console.log('✅ Batch 5 COMPLETE. All Phase C batches done.');
  } else {
    console.log('⚠️  Batch 5 partially complete. Review errors above.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
