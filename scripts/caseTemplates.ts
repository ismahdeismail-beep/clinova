// ================================================================
// Clinova Clinical Case Template Definitions
// Core clinical scenarios for each disease across all 17 subjects
// Each template generates multiple unique cases with Kenyan patients
// ================================================================

import type { ClinicalCaseTemplate } from './generateCases';
import { RESPIRATORY_TEMPLATES } from './templates/respiratory';
import { GASTROINTESTINAL_TEMPLATES } from './templates/gastrointestinal';
import { ENDOCRINE_TEMPLATES } from './templates/endocrine';
import { VITAMINS_TEMPLATES } from './templates/vitamins';
import { CNS_TEMPLATES } from './templates/cns';
import { PAIN_INFLAMMATION_TEMPLATES } from './templates/painInflammation';
import { CHEMOTHERAPY_TEMPLATES } from './templates/chemotherapy';
import { ONCOLOGY_TEMPLATES } from './templates/oncology';
import { HEMATOLOGY_TEMPLATES } from './templates/hematology';
import { RENAL_TEMPLATES } from './templates/renal';
import { DERMATOLOGY_TEMPLATES } from './templates/dermatology';
import { OPHTHALMOLOGY_TEMPLATES } from './templates/ophthalmology';
import { TOXICOLOGY_TEMPLATES } from './templates/toxicology';
import { CLINICAL_PHARMACY_TEMPLATES } from './templates/clinicalPharmacy';

// ================================================================
// Helper to create templates
// ================================================================

function tpl(
  pharmacologySubject: string,
  specialty: string,
  disease: string,
  title: string,
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
  chiefComplaint: string,
  hpi: string,
  pmh: string,
  medHx: string,
  pe: string,
  labs: string,
  imaging: string,
  diagnosis: string,
  ddx: string[],
  goals: string,
  pharm: string,
  nonPharm: string,
  carePlan: string,
  dtps: string,
  monitoring: string,
  counselling: string,
  followUp: string,
  pearls: string,
  references: string[],
): ClinicalCaseTemplate {
  return {
    pharmacologySubject,
    specialty,
    disease,
    title,
    difficulty,
    chiefComplaintTemplate: chiefComplaint,
    hpiTemplate: hpi,
    pmhTemplate: pmh,
    medHxTemplate: medHx,
    peTemplate: pe,
    labsTemplate: labs,
    imagingTemplate: imaging,
    diagnosis,
    ddx,
    goalsTemplate: goals,
    pharmTemplate: pharm,
    nonPharmTemplate: nonPharm,
    carePlanTemplate: carePlan,
    dtpsTemplate: dtps,
    monitoringTemplate: monitoring,
    counsellingTemplate: counselling,
    followUpTemplate: followUp,
    pearlsTemplate: pearls,
    references,
  };
}

// ================================================================
// 1. GENERAL PHARMACOLOGY — 8 templates × ~6 variants each = ~48 cases
// ================================================================

export const GENERAL_PHARMACOLOGY_TEMPLATES: ClinicalCaseTemplate[] = [
  tpl(
    'General Pharmacology', 'Internal Medicine', 'Adverse Drug Reaction',
    'NSAID-Induced Upper GI Bleed in a Peptic Ulcer Patient',
    'Intermediate',
    '3-day history of black, tarry stools and worsening epigastric pain',
    '{name}, a {age}-year-old {occupation} from {location}, presents with melaena and epigastric pain. Has been taking high-dose ibuprofen for chronic lower back pain for the past 2 weeks. Also uses low-dose aspirin for primary prevention. Reports passing dark, foul-smelling stools for 3 days and feeling increasingly weak and dizzy.',
    'Hypertension, Chronic low back pain, Occasional heartburn',
    'Ibuprofen 800mg TDS, Aspirin 75mg daily, Omeprazole 20mg PRN (rarely takes)',
    'Pale conjunctivae, mild epigastric tenderness, no rebound. Rectal exam: melaena present. BP slightly low with postural drop.',
    'Hb 7.8 g/dL (13-17), MCV 80 fL (80-100), BUN 32 mg/dL (7-20), Creatinine 1.1 mg/dL (0.6-1.2), INR 1.1. Stool occult blood: positive.',
    '',
    'Upper GI Bleed likely from NSAID-induced Gastric Ulcer, Acute Iron Deficiency Anaemia',
    ['Upper GI Bleed', 'Gastric Ulcer', 'NSAID-induced Gastropathy', 'Iron Deficiency Anaemia', 'Peptic Ulcer Disease'],
    'Stop active bleeding, haemodynamically stabilise, prevent rebleeding, manage anaemia, prevent future NSAID-induced ulcers',
    '1. IV fluids (Normal Saline 1L bolus, then maintenance). 2. IV Pantoprazole 80mg bolus then 8mg/hr infusion for 72 hours. 3. Hold Aspirin and Ibuprofen. 4. If haemodynamically unstable, consider blood transfusion. 5. After stabilisation, switch to oral PPI. 6. Discuss alternative analgesia (paracetamol, topical agents).',
    'NPO initially. Place NG tube if ongoing bleeding suspected. Monitor vitals and urine output strictly.',
    'Admit to medical ward/ICU. IV PPI infusion. Type and crossmatch for 2 units PRBC. Monitor Hb every 6-12 hours. EGD once haemodynamically stable for diagnosis and therapy. Discharge on oral PPI for 8 weeks when stable. Re-challenge aspirin only after cardiology consultation.',
    '1. Adverse drug reaction: NSAID-induced gastric ulcer with GI bleeding. 2. Drug interaction: Aspirin + Ibuprofen increases bleeding risk synergistically.',
    'Vital signs every 15mins until stable then every 4 hours. Daily Hb, BUN, creatinine. Stool colour and consistency. Monitor for signs of rebleeding (tachycardia, hypotension, haematemesis, fresh melaena).',
    'Avoid NSAIDs and aspirin going forward. Take PPI regularly as prescribed. Report any black stools, blood in vomit, or severe abdominal pain immediately. Discuss safer alternatives for chronic pain.',
    'Gastroenterology clinic review in 2 weeks for repeat EGD. Cardiology consult regarding aspirin cessation given cardiac history.',
    'NSAIDs cause gastric mucosal damage by inhibiting COX-1, reducing protective prostaglandins. Risk is highest in elderly, those on anticoagulants/aspirin, and those with prior PUD. Always prescribe PPI co-therapy with NSAIDs in at-risk patients.',
    ['WHO Model Formulary', 'Kenya Clinical Guidelines: Management of GI Bleeding'],
  ),

  tpl(
    'General Pharmacology', 'Internal Medicine', 'Adverse Drug Reaction',
    'ACE Inhibitor-Induced Angioedema',
    'Advanced',
    'Sudden onset of lip and tongue swelling, difficulty breathing for 2 hours',
    '{name}, a {age}-year-old {occupation} from {location}, presents with rapidly progressive swelling of the lips, tongue, and periorbital area starting 2 hours after taking lisinopril. Reports feeling a lump in the throat and some difficulty swallowing saliva. No urticaria or pruritus. Started lisinopril 5mg daily 3 weeks ago for hypertension.',
    'Hypertension diagnosed 3 months ago',
    'Lisinopril 5mg daily (started 3 weeks ago), No other medications',
    'Facial oedema, periorbital swelling, swollen lips and tongue. No urticaria. Lungs clear. No stridor at rest but mild voice change. BP 165/95 mmHg.',
    'Serum tryptase: normal. C4: normal. Complement levels: normal. CBC: normal. No eosinophilia.',
    '',
    'ACE Inhibitor-Induced Angioedema',
    ['ACEi Angioedema', 'Hereditary Angioedema', 'Allergic Reaction', 'Anaphylaxis'],
    'Secure airway, reverse ACEi-induced angioedema, control BP',
    '1. Immediately discontinue Lisinopril. 2. Airway assessment: if any stridor or respiratory distress, prepare for intubation. 3. IV Chlorphenamine 10mg. 4. IV Hydrocortisone 200mg stat. 5. Nebulised Adrenaline 2mg if laryngeal oedema progresses. 6. Fresh Frozen Plasma (FFP) 2 units if severe and not responding. 7. BP control: switch to Amlodipine 5mg daily.',
    'Airway monitoring, head elevation, IV access. Prepare intubation equipment at bedside.',
    'Admit to HDU/ICU. Airway observation for 24 hours. Give antihistamines and steroids. Monitor for recurrence. Educate patient to avoid all ACE inhibitors permanently. Discharge on Amlodipine for BP control.',
    '1. Adverse drug reaction: ACEi-induced angioedema via bradykinin accumulation. 2. Immediate safety concern: airway compromise requiring close monitoring.',
    'Airway patency, oxygen saturation, vitals every 15 mins initially. Assess for progression of swelling. Monitor for hypotension from histamine release.',
    'Never take any ACE inhibitor again (provide list: lisinopril, enalapril, captopril, ramipril, perindopril). Carry a medical alert card. Seek immediate medical attention if similar swelling occurs. ARBs (losartan) are safer alternatives but carry small cross-reaction risk.',
    'Allergy clinic follow-up in 4 weeks. Switch antihypertensive to Amlodipine. Educate family members on emergency recognition.',
    'ACEi angioedema is mediated by bradykinin accumulation, not histamine. Therefore antihistamines and steroids have limited efficacy. Airway protection is paramount. Black patients and smokers have higher risk. Always enquire about ACEi use in any patient presenting with angioedema.',
    ['Kenya Clinical Guidelines: Hypertension Management', 'UpToDate: ACE Inhibitor-Induced Angioedema'],
  ),

  tpl(
    'General Pharmacology', 'Internal Medicine', 'Drug Overdose',
    'Paracetamol Overdose with Hepatotoxicity Risk',
    'Advanced',
    'Accidental ingestion of excessive paracetamol 8 hours ago, now with nausea and RUQ pain',
    '{name}, a {age}-year-old {occupation} from {location}, presents 8 hours after ingesting approximately 15g of paracetamol (30 tablets of 500mg) in a suicidal gesture. Initially asymptomatic, now developing nausea, vomiting, and right upper quadrant abdominal pain. Reports feeling depressed recently.',
    'No significant PMH. No prior liver disease.',
    'Denies regular medications. Occasionally takes paracetamol for headaches.',
    'Icteric sclera. RUQ tenderness to palpation. No hepatomegaly. Alert and oriented. Mild confusion noted.',
    'Paracetamol level at 8 hours: 180 mcg/mL (treatment line: >150 at 4h, >37 at 8h). ALT 850 U/L (10-40), AST 920 U/L (10-40), INR 1.8 (0.9-1.2), Bilirubin 3.2 mg/dL (0.3-1.2), Creatinine 1.3 mg/dL (0.6-1.2), pH 7.38 (7.35-7.45).',
    '',
    'Acute Paracetamol Overdose with Hepatotoxicity (Rumack-Matthew Nomogram: probable hepatotoxicity)',
    ['Paracetamol Overdose', 'Acute Hepatitis', 'Acute Liver Failure', 'Viral Hepatitis'],
    'Prevent further hepatotoxicity, administer NAC within therapeutic window, monitor for acute liver failure, psychiatric evaluation',
    '1. Start IV N-Acetylcysteine (NAC) immediately per protocol: 150 mg/kg in 200mL D5W over 60 min, then 50 mg/kg in 500mL D5W over 4 hours, then 100 mg/kg in 1000mL D5W over 16 hours. 2. IV Metoclopramide 10mg for nausea. 3. IV Vitamin K 10mg if INR significantly elevated. 4. N-acetylcysteine may be continued beyond 21 hours if evidence of ongoing hepatotoxicity.',
    'Continuous cardiac monitoring. Strict input/output chart. Neuro observations for hepatic encephalopathy. Avoid hepatotoxic drugs.',
    'Admit to medical ward. Start NAC infusion immediately (do not wait for levels if >8 hours and significant ingestion). Monitor LFTs, INR, creatinine, pH every 6-12 hours. Consider transfer to liver unit if INR >3.0 or encephalopathy develops. Psychiatric consult for suicide risk assessment.',
    '1. Drug overdose with potential for fatal hepatotoxicity. 2. Acute psychological distress requiring mental health intervention.',
    'ALT, AST, INR, creatinine, pH every 6-12 hours. Urine output. Mental status for encephalopathy. Blood glucose monitoring.',
    'Explain the purpose of NAC therapy. Discuss the seriousness of paracetamol overdose. Ensure psychiatric follow-up. Avoid alcohol and any hepatotoxic medications. Complete the full NAC course even if feeling well.',
    'Psychiatric follow-up within 1 week. Hepatology review if LFTs remain elevated at discharge. Avoid paracetamol for 3 months.',
    'NAC is most effective when started within 8 hours of ingestion. After 8 hours, efficacy decreases but NAC should still be given. In staggered overdoses or chronic supratherapeutic ingestion, NAC is indicated regardless of levels. The Rumack-Matthew nomogram applies only to acute single ingestions.',
    ['WHO Model Formulary: Paracetamol Overdose Management', 'Kenya Clinical Guidelines: Poisoning Management'],
  ),
];

// ================================================================
// 2. AUTONOMIC PHARMACOLOGY — 9 templates × ~5 variants each = ~45 cases
// ================================================================

export const AUTONOMIC_PHARMACOLOGY_TEMPLATES: ClinicalCaseTemplate[] = [
  tpl(
    'Autonomic Pharmacology', 'Internal Medicine', 'Hypertension',
    'Essential Hypertension with Poor Control on Dual Therapy',
    'Intermediate',
    'Persistent headache and elevated BP readings despite two medications for 3 months',
    '{name}, a {age}-year-old {occupation} from {location}, presents with occipital headaches for 2 weeks, worse in the morning. BP readings at home consistently 155-165/95-105 despite taking Amlodipine 5mg and Losartan 50mg daily. Reports good adherence and no missed doses. Occasional palpitations but no chest pain, dyspnoea, or visual changes.',
    'Hypertension diagnosed 2 years ago. No diabetes, no renal disease.',
    'Amlodipine 5mg daily, Losartan 50mg daily, occasional paracetamol for headaches',
    'BP 162/98 mmHg in both arms. HR 82 bpm regular. Fundoscopy: mild arteriovenous nipping, no haemorrhages or exudates. BMI 31 kg/m². No pedal oedema.',
    'Serum Creatinine 0.9 mg/dL (0.6-1.2), eGFR >60, K+ 4.2 mEq/L (3.5-5.0), Na+ 138 mEq/L (136-145), Fasting glucose 5.2 mmol/L (<6.1), Lipid profile: LDL 3.8 mmol/L (<2.6), HDL 1.1 mmol/L (>1.0). Urinalysis: no proteinuria.',
    '',
    'Uncontrolled Essential Hypertension on Dual Therapy (Stage 2 HTN)',
    ['Essential Hypertension', 'Secondary Hypertension', 'White Coat Hypertension', 'Medication Non-adherence'],
    'Achieve BP target <140/90 mmHg, add third agent, investigate for secondary causes if resistant, cardiovascular risk reduction',
    '1. Add a thiazide-like diuretic: Indapamide 1.5mg MR daily (preferred over HCTZ per guidelines). 2. Consider adding a low-dose beta-blocker if HR remains >80: Bisoprolol 2.5mg daily. 3. Uptitrate Amlodipine to 10mg daily if tolerated. 4. Atorvastatin 20mg daily for dyslipidaemia. 5. Aspirin 75mg daily if 10-year CVD risk >10%.',
    'Dietary counselling: DASH diet, reduce sodium intake to <2g/day, weight loss plan, regular aerobic exercise 30min/day. Limit alcohol intake.',
    'Add Indapamide 1.5mg and uptitrate Amlodipine. Advise lifestyle modifications. Re-check BP in 2 weeks. If still uncontrolled, consider adding Spironolactone 12.5-25mg (especially if K+ normal and eGFR >45). Workup for secondary hypertension if BP remains >140/90 on triple therapy.',
    '1. Suboptimal response to first-line dual therapy requiring escalation. 2. Cardiovascular risk factors (hypertension, obesity, dyslipidaemia) requiring comprehensive management.',
    'BP monitoring at home and clinic visits. Serum creatinine, eGFR, K+, Na+ in 2 weeks. Monitor for side effects of new medications (gout with thiazide, bradycardia with beta-blocker).',
    'Explain that hypertension requires lifelong management. Demonstrate home BP monitoring technique. Discuss DASH diet, salt reduction, and regular exercise. Importance of medication adherence. Warning signs of hypertensive emergency (severe headache, visual changes, chest pain, shortness of breath).',
    'Revisit in 2 weeks for BP check and labs. If target achieved, follow-up every 3 months. If resistant, refer for secondary hypertension workup.',
    'Resistant hypertension = BP >140/90 on 3 or more antihypertensives including a diuretic. Always check adherence first. Amlodipine has a long half-life and once-daily dosing is sufficient. Combine ACEi/ARB + CCB + thiazide as first-line triple therapy.',
    ['Kenya Clinical Guidelines: Hypertension Management', 'WHO HEARTS Technical Package for Hypertension'],
  ),

  tpl(
    'Autonomic Pharmacology', 'Emergency & Critical Care', 'Anaphylaxis',
    'Anaphylactic Shock Following a Bee Sting',
    'Advanced',
    'Sudden collapse and difficulty breathing after a bee sting 15 minutes ago',
    '{name}, a {age}-year-old {occupation} from {location}, was stung by a bee while working on the farm. Within 5 minutes developed generalised urticaria, facial swelling, difficulty breathing, and wheezing. By the time of arrival at {setting}, patient is confused, hypotensive, and struggling to breathe. No known prior allergy, but had a similar milder reaction to a wasp sting 2 years ago.',
    'Mild asthma (uses salbutamol PRN)',
    'Salbutamol MDI 100mcg PRN, no regular medications',
    'Generalised urticaria, facial and periorbital oedema, stridor, expiratory wheeze, cyanotic lips. Confused, agitated. Unable to speak in full sentences. BP 80/50, HR 135, RR 32.',
    'ABG: pH 7.25 (7.35-7.45), pCO2 30 mmHg (35-45), pO2 75 mmHg on 15L O2 (80-100), HCO3 16 mmol/L (22-26), Lactate 4.5 mmol/L (0.5-2.2). Mast cell tryptase: pending.',
    '',
    'Anaphylactic Shock (Grade IV) — Bee Sting',
    ['Anaphylaxis', 'Severe Asthma Exacerbation', 'Septic Shock', 'Angioedema', 'Vasovagal Syncope'],
    'Reverse anaphylaxis immediately, support airway and circulation, prevent biphasic reaction',
    '1. IM Adrenaline (Epinephrine) 0.5mg (0.5mL of 1:1000) anterolateral thigh, repeat every 5-15 mins as needed. 2. IV Normal Saline 1L bolus rapidly, repeat as needed. 3. High-flow O2 15L/min via non-rebreather mask. 4. IV Chlorphenamine 10mg. 5. IV Hydrocortisone 200mg. 6. Nebulised Salbutamol 5mg + Ipratropium 0.5mg for bronchospasm. 7. If refractory, IV Adrenaline infusion: start at 0.05-0.1 mcg/kg/min and titrate.',
    'Intubation equipment at bedside. Elevated head of bed. Continuous cardiac monitoring. Prepare for possible surgical airway if stridor progresses.',
    'Admit to ICU. IM adrenaline immediately. IV fluids, antihistamines, steroids. Monitor for biphasic reaction (occurs in up to 20% of cases, typically 4-8 hours after initial presentation). Observe in ICU for minimum 12-24 hours after symptom resolution. Prescribe adrenaline auto-injector at discharge.',
    '1. Acute life-threatening hypersensitivity reaction requiring immediate adrenaline as first-line therapy. 2. Risk of biphasic reaction requiring prolonged observation.',
    'Continuous pulse oximetry, cardiac monitoring, BP every 5 mins until stable then every 15 mins. Respiratory rate and effort. Peak expiratory flow if able. Watch for biphasic reaction.',
    'Demonstrate correct use of Epinephrine auto-injector. Advise to carry auto-injector at all times. Wear medical alert bracelet. Avoid known triggers. Educate family members on emergency action plan.',
    'Allergy clinic referral for specific IgE testing and consideration of venom immunotherapy. Follow-up in 2 weeks to review auto-injector technique.',
    'Adrenaline is the FIRST-LINE treatment for anaphylaxis. Delay in adrenaline administration increases mortality. IM route is preferred (vastus lateralis) — not subcutaneous. Antihistamines and steroids are adjunctive, not primary therapy. Biphasic reactions cannot be predicted by initial severity.',
    ['WAO Anaphylaxis Guidelines', 'Kenya Clinical Guidelines: Emergency Medicine'],
  ),

  tpl(
    'Autonomic Pharmacology', 'Emergency & Critical Care', 'Organophosphate Poisoning',
    'Severe Organophosphate Poisoning from Agricultural Pesticide Exposure',
    'Advanced',
    'Found unconscious on the farm with excessive salivation, small pupils, and muscle twitching',
    '{name}, a {age}-year-old {occupation} from {location}, was found collapsed in a maize field near a sprayed area. Family reports he was spraying organophosphate pesticide without protective equipment. He has excessive salivation, lacrimation, urination, diarrhoea, vomiting, muscle fasciculations, and is unconscious. GCS 8/15. Pinpoint pupils bilaterally.',
    'Previously healthy, no significant PMH',
    'No regular medications',
    'GCS 8 (E2 M4 V2). Pinpoint pupils (1mm bilaterally). Profuse salivation and frothing at mouth. Generalised muscle fasciculations. Incontinent of urine and faeces. Lungs: diffuse crackles and wheeze. HR 55 bpm, BP 95/60.',
    'Pseudocholinesterase (butyrylcholinesterase) level: markedly decreased (<500 U/L, normal 3000-9000). ABG: pH 7.20, pCO2 48, pO2 78 on RA, HCO3 18. Electrolytes normal. RBS 6.2 mmol/L.',
    '',
    'Severe Organophosphate Poisoning with Cholinergic Crisis',
    ['Organophosphate Poisoning', 'Carbamate Poisoning', 'Intracranial Haemorrhage', 'Meningitis', 'Status Epilepticus'],
    'Atropinisation, reactivate cholinesterase, support ventilation, prevent intermediate syndrome',
    '1. Atropine 2mg IV every 5 minutes until atropinisation achieved (clear chest, HR >80, dry secretions). May require very high doses (10-50mg total). 2. Pralidoxime (2-PAM) 2g IV over 30 mins, then 1g IV every 6 hours for 3-5 days. 3. IV Diazepam 10mg for seizures/muscle fasciculations. 4. IV fluids. 5. Activated charcoal 50g if <2 hours post-ingestion and airway protected.',
    'Decontamination: Remove contaminated clothing, wash skin with soap and water. Airway management: intubate and ventilate if GCS <8 or respiratory failure. Suction secretions frequently.',
    'Admit to ICU. Aggressive atropinisation with continuous reassessment. Mechanical ventilation anticipated (may need prolonged ventilation due to intermediate syndrome). Monitor pseudocholinesterase levels. Pralidoxime most effective if given within 24 hours. Continue supportive care until recovery of spontaneous breathing and resolution of cholinergic signs.',
    '1. Life-threatening cholinergic crisis requiring intensive atropine therapy and ventilatory support. 2. Occupational exposure due to lack of protective equipment. 3. Risk of intermediate syndrome (days 1-4 post-exposure).',
    'Continuous cardiac and pulse oximetry monitoring. Atropinisation endpoints (HR, pupillary size, chest auscultation, secretions). Ventilatory parameters. Serial pseudocholinesterase levels. Watch for intermediate syndrome (proximal muscle weakness, neck flexor weakness, respiratory failure).',
    'Explain the dangers of handling pesticides without protective equipment. Occupational health counselling. Advise family on safe pesticide storage and handling. When recovered, counsel on changing occupation if continued exposure is likely.',
    'Psychiatric assessment for suicidal intent if deliberate ingestion. Occupational health follow-up. Long-term neurological assessment for delayed polyneuropathy.',
    'The required dose of atropine in OP poisoning is MUCH higher than standard doses — give 2mg IV q5min until atropinisation. Pralidoxime is most effective in the first 24 hours and works best for nicotinic effects (muscle weakness). Intermediate syndrome typically occurs 24-96 hours post-exposure and may require prolonged ventilation. Delayed polyneuropathy can occur 2-3 weeks later.',
    ['WHO: Organophosphate Poisoning Management', 'Kenya Clinical Guidelines: Pesticide Poisoning'],
  ),

  tpl(
    'Autonomic Pharmacology', 'Ophthalmology', 'Glaucoma',
    'Acute Angle-Closure Glaucoma: An Ocular Emergency Requiring Urgent Pharmacological Management',
    'Advanced',
    'Sudden onset of severe right eye pain, headache, nausea, and blurred vision for 6 hours',
    '{name}, a {age}-year-old {occupation} from {location}, presents with severe right eye pain radiating to the forehead, accompanied by a throbbing headache, nausea, and vomiting for the past 6 hours. Vision in the right eye is markedly blurred and she reports seeing haloes around lights. The symptoms began suddenly while she was watching television in a dimly lit room. She was unable to sleep on the affected side due to the pain. No history of prior eye trauma or surgery. She has never been diagnosed with glaucoma.',
    'Hypertension managed with Amlodipine. No history of diabetes, asthma, or eye disease.',
    'Amlodipine 5mg daily, occasional paracetamol for headaches',
    'Right eye: marked conjunctival injection and chemosis, cornea hazy and oedematous, anterior chamber very shallow, pupil mid-dilated (6mm) and fixed, no pupillary reflex to light. Eye feels rock-hard on palpation (estimated IOP >50 mmHg). Visual acuity reduced to hand movements. Left eye: quiet, clear cornea, shallow anterior chamber, patent peripheral iridotomy site from previous laser treatment. BP 145/90, HR 78, RR 18.',
    'Intraocular pressure (right eye): 52 mmHg (normal <21 mmHg). Left eye: 16 mmHg. Visual acuity: right eye hand movements, left eye 6/6. Slit-lamp examination right eye: shallow anterior chamber, crowded angle, microcystic corneal oedema, mild flare and cells in anterior chamber. Gonioscopy left eye: narrow angle (Shaffer grade 1-2). No afferent pupillary defect.',
    'B-scan ultrasonography of right eye: no vitreous haemorrhage, no retinal detachment, lens in situ with normal thickness.',
    'Acute Angle-Closure Glaucoma (Right Eye) — Medical Emergency',
    ['Acute Angle-Closure Glaucoma', 'Acute Primary Angle Closure', 'Acute Conjunctivitis', 'Migraine with Aura', 'Cluster Headache', 'Acute Uveitis'],
    'Urgently reduce intraocular pressure below 25 mmHg, relieve pupil block, reduce inflammation, preserve optic nerve function, prevent permanent vision loss',
    '1. Start immediately: Timolol 0.5% one drop in right eye (topical beta-blocker — reduces aqueous humour production by inhibiting ciliary body beta-2 adrenergic receptors, decreasing aqueous secretion by ~30%). 2. Pilocarpine 2% one drop in right eye every 15 minutes for 2 hours then every 6 hours (muscarinic agonist — constricts the pupil by stimulating the sphincter pupillae muscle, mechanically opening the drainage angle and relieving pupillary block; most effective once IOP has started to fall as very high IOP can cause sphincter paralysis). 3. Brinzolamide 1% one drop in right eye BID (carbonic anhydrase inhibitor — reduces aqueous humour production by inhibiting carbonic anhydrase II in the ciliary body, decreasing bicarbonate transport and aqueous secretion by ~50%). 4. Acetazolamide 500mg IV stat then 250mg QID (systemic carbonic anhydrase inhibitor — further reduces aqueous production; monitor for paraesthesia, metabolic acidosis, hypokalaemia). 5. IV Mannitol 20% (1-2 g/kg) over 45 minutes (osmotic diuretic — creates an osmotic gradient that draws fluid from the vitreous, rapidly reducing IOP; contraindicated in anuria, severe heart failure, or pulmonary oedema). 6. Prednisolone acetate 1% one drop every 15 minutes for the first hour then every 6 hours (topical corticosteroid — reduces secondary inflammation from angle closure). 7. Anti-emetic: IV Metoclopramide 10mg for nausea and vomiting.',
    'Position patient supine or semi-recumbent. Dim lighting to reduce discomfort. Do not administer atropine or any mydriatic agent. Prepare for laser peripheral iridotomy once IOP is controlled. Avoid prolonged darkness which can worsen pupil block.',
    'Admit to ophthalmology ward for urgent IOP management. Timolol and pilocarpine topically as above. IV acetazolamide and mannitol for acute IOP reduction. Monitor IOP every 30 minutes for the first 2 hours, then every hour. Once IOP is below 30 mmHg, schedule laser peripheral iridotomy (LPI) of the right eye. If corneal oedema persists despite IOP reduction, consider anterior chamber paracentesis by ophthalmologist. Review the left eye for prophylactic LPI. Discharge on topical timolol and prednisolone acetate after LPI. Refer to glaucoma clinic for long-term follow-up.',
    '1. Acute ophthalmological emergency: IOP of 52 mmHg causing progressive optic nerve damage and vision loss — each hour of delay increases risk of permanent blindness. 2. Systemic carbonic anhydrase inhibitor therapy: monitor for metabolic acidosis, hypokalaemia, and paraesthesia. 3. Osmotic agent: mannitol contraindicated in patients with renal impairment or heart failure — check creatinine and cardiac status before administration.',
    'IOP measured every 30 minutes initially then hourly. Visual acuity assessment. Pupillary response and corneal clarity. Monitor for systemic effects of acetazolamide (serum bicarbonate, potassium, pH). Monitor urine output with mannitol therapy. Blood pressure monitoring during IV mannitol infusion.',
    'Explain that acute angle-closure is a medical emergency that can cause permanent blindness if untreated. Educate on symptoms to watch for in either eye (pain, blurred vision, haloes around lights, nausea). Explain that the fellow eye is at high risk and should undergo prophylactic laser peripheral iridotomy. Discuss that the condition is related to anatomical predisposition (shallow anterior chamber) and is not caused by anything the patient did wrong. Advise wearing a medical alert bracelet noting glaucoma history.',
    'Ophthalmology clinic in 1 week for IOP check and assessment post-LPI. Glaucoma clinic follow-up in 4 weeks for left eye prophylactic LPI and right eye assessment. Long-term glaucoma monitoring every 3-6 months. Discuss screening of first-degree relatives who may have shallow anterior chambers.',
    'Pilocarpine is less effective at very high IOP (>50 mmHg) because the iris sphincter muscle becomes ischaemic and unresponsive — lower IOP first with timolol/acetazolamide/mannitol before pilocarpine takes full effect. Laser peripheral iridotomy is definitive treatment and should be performed within 24-48 hours once the cornea clears. Always treat the fellow eye prophylactically — 50% of patients develop acute angle-closure in the other eye within 5-10 years without prophylaxis. Topical beta-blockers are contraindicated in asthma/COPD and used cautiously in heart failure. Mannitol is contraindicated in anuria.',
    ['WHO Model Formulary: Glaucoma Management', 'Kenya Clinical Guidelines: Ophthalmology', 'American Academy of Ophthalmology: Management of Acute Angle-Closure Glaucoma'],
  ),
];

// ================================================================
// 3. CARDIOVASCULAR PHARMACOLOGY — 8 templates × ~6 variants each
// ================================================================

export const CARDIOVASCULAR_PHARMACOLOGY_TEMPLATES: ClinicalCaseTemplate[] = [
  tpl(
    'Cardiovascular Pharmacology', 'Cardiology', 'Heart Failure',
    'New Diagnosis of Heart Failure with Reduced Ejection Fraction',
    'Intermediate',
    'Progressive shortness of breath, leg swelling, and easy fatiguability for 3 weeks',
    '{name}, a {age}-year-old {occupation} from {location}, presents with progressively worsening exertional dyspnoea (now NYHA Class III), orthopnoea, paroxysmal nocturnal dyspnoea, and bilateral leg swelling. Reports sleeping on 3 pillows. No chest pain or palpitations. History of poorly controlled hypertension and recent admission for pneumonia.',
    'Hypertension (15 years), Type 2 Diabetes (5 years), Dyslipidaemia. No prior MI.',
    'Amlodipine 10mg daily, Losartan 50mg daily, Metformin 1000mg BID, Atorvastatin 20mg daily',
    'Elevated JVP (10cm), bilateral basal crackles, S3 gallop, displaced apical beat. 2+ pitting oedema to mid-calf bilaterally. Cool peripheries. BP 148/92, HR 95.',
    'BNP 850 pg/mL (<100). Echo: LVEF 35%, moderate MR, dilated LV. CXR: cardiomegaly, upper lobe diversion, small bilateral pleural effusions. Creatinine 1.1, K+ 4.3. HbA1c 7.5%.',
    '',
    'Heart Failure with Reduced Ejection Fraction (HFrEF, LVEF 35%): Acute Decompensation',
    ['HFrEF', 'Acute Coronary Syndrome', 'Pulmonary Embolism', 'COPD Exacerbation', 'Nephrotic Syndrome'],
    'Achieve euvolaemia, initiate GDMT, improve symptoms and quality of life, reduce hospitalisation and mortality',
    '1. IV Furosemide 40mg IV bolus (escalate to 80mg if inadequate response). Consider IV furosemide infusion if diuretic-resistant. 2. Start beta-blocker: Bisoprolol 1.25mg daily (initiate when euvolaemic). 3. Transition from Losartan to ARNI: Sacubitril/Valsartan 24/26mg BID (after 36h washout). 4. Add MRA: Spironolactone 25mg daily (check K+ and creatinine). 5. Add SGLT2i: Dapagliflozin 10mg daily. 6. Continue Atorvastatin.',
    'Sodium restriction <2g/day, fluid restriction 1.5-2L/day if hyponatraemic. Daily weights. Monitoring of fluid balance.',
    'Admit for IV diuresis. Daily weights and strict I/O. Start IV furosemide. Once euvolaemic, initiate/optimise oral GDMT per HF guidelines. Titrate medications every 2-4 weeks. Plan for sacubitril/valsartan initiation before discharge.',
    '1. Decompensated HF requiring aggressive diuresis and optimisation of guideline-directed medical therapy. 2. Multi-comorbidity (HTN, DM) requiring integrated management.',
    'Daily: weight, I/O, vitals, O2 sat, lung auscultation, oedema assessment. Labs: BMP (K+, Cr) daily during diuresis, BNP trend. Echo in 3-6 months to reassess LVEF.',
    'Explain HF as a chronic condition requiring lifelong medications. Importance of daily weighing and early recognition of fluid overload. Low salt diet. Medication adherence is critical. When to seek medical attention (dyspnoea, rapid weight gain, leg swelling).',
    'HF clinic follow-up in 2 weeks post-discharge. Titration clinic to optimise GDMT over 2-4 months. Repeat echo in 3-6 months.',
    'HFrEF quadruple therapy (ARNI/ACEi + BB + MRA + SGLT2i) is now standard of care, each adding mortality benefit. Start low, go slow with beta-blockers. Diuretics relieve symptoms but do not reduce mortality. Never start beta-blocker in acute decompensation — wait until euvolaemic.',
    ['ESC Guidelines for Heart Failure', 'Kenya Clinical Guidelines: Heart Failure Management'],
  ),

  tpl(
    'Cardiovascular Pharmacology', 'Cardiology', 'Atrial Fibrillation',
    'New-Onset Atrial Fibrillation with Rapid Ventricular Response',
    'Intermediate',
    'Palpitations, chest discomfort, and shortness of breath for 6 hours',
    '{name}, a {age}-year-old {occupation} from {location}, presents with sudden onset of rapid, irregular palpitations associated with mild chest discomfort and dyspnoea. Symptoms started 6 hours ago while at rest. No syncope or presyncope. Reports occasional alcohol intake. Previously well.',
    'Hypertension (diet-controlled), no prior cardiac history',
    'No regular medications',
    'Irregularly irregular pulse, HR 145, BP 128/80. No signs of HF. Lungs clear. No thyromegaly.',
    'ECG: Atrial fibrillation with rapid ventricular response (150 bpm). No ST changes. TTE: normal LVEF, no structural heart disease, left atrial size 4.0cm. Thyroid function: normal. Electrolytes: normal.',
    '',
    'New-Onset Atrial Fibrillation with Rapid Ventricular Response (CHA2DS2-VASc Score: 1)',
    ['Atrial Fibrillation', 'Atrial Flutter', 'SVT', 'Thyrotoxicosis', 'Acute MI'],
    'Rate control, symptom relief, stroke risk assessment, cardioversion if needed, long-term management',
    '1. Rate control: IV Metoprolol 5mg over 2 mins (repeat q5min to max 15mg) or IV Diltiazem 0.25 mg/kg over 2 mins. 2. If <48 hours since onset: consider cardioversion (electrical or pharmacological with Flecainide 300mg PO/IV if no structural disease, or Amiodarone IV if structural disease). 3. If >48 hours or unknown duration: anticoagulate with DOAC (Apixaban 5mg BID or Rivaroxaban 20mg daily) for minimum 3 weeks before cardioversion. 4. Long-term: CHA2DS2-VASc score = 1, consider anticoagulation vs aspirin.',
    'Continuous cardiac monitoring. Reassurance. Avoid alcohol and stimulants.',
    'Admit for rate control and monitoring. Start IV metoprolol. Once rate controlled (<110 bpm), transition to oral metoprolol. Discuss antithrombotic therapy based on CHA2DS2-VASc score. Plan for cardioversion if symptoms persist or haemodynamically unstable.',
    '1. Acute arrhythmia requiring rate control and rhythm assessment. 2. Thromboembolic risk requiring anticoagulation assessment.',
    'Heart rate and rhythm monitoring, BP. Monitor for symptomatic bradycardia or hypotension with rate control agents. Renal function before DOAC dosing.',
    'Explain AF and its management. Discuss anticoagulation benefits and risks (bleeding). Avoid excessive alcohol. Recognise symptoms of stroke (FAST). Maintain medication adherence.',
    'Cardiology clinic in 4 weeks. Repeat ECG at follow-up. Echo in 3 months to reassess LV function.',
    'AF management has 3 pillars: rate control, rhythm control, and anticoagulation. CHA2DS2-VASc determines who needs anticoagulation, HAS-BLED determines bleeding risk. DOACs are preferred over warfarin for non-valvular AF. Urgent cardioversion if haemodynamically unstable regardless of duration.',
    ['ESC Guidelines for Atrial Fibrillation', 'Kenya Clinical Guidelines: AF Management'],
  ),

  tpl(
    'Cardiovascular Pharmacology', 'Cardiology', 'Acute Coronary Syndrome',
    'Acute ST-Elevation Myocardial Infarction (STEMI) Requiring Thrombolysis in a Rural Kenyan Setting',
    'Intermediate',
    'Acute severe crushing central chest pain radiating to left arm and jaw for 2 hours',
    '{name}, a {age}-year-old {occupation} from {location}, presents with sudden onset of severe crushing retrosternal chest pain radiating to the left arm and jaw, associated with profuse sweating, nausea, and shortness of breath. Pain started 2 hours ago while working on the farm. Reports feeling "impending doom." Pain is 9/10 in severity and not relieved by rest or sublingual GTN (not taken). No prior heart disease.',
    'Hypertension diagnosed 5 years ago (poorly controlled), Type 2 Diabetes diagnosed 3 years ago. No prior MI, stroke, or PAD.',
    'Amlodipine 5mg daily, Metformin 500mg BID. Not on any antiplatelet or statin therapy.',
    'Anxious, diaphoretic, pale. BP 150/95 mmHg, HR 105 bpm regular. S4 gallop heard. Mild basal crackles bilaterally. JVP not elevated. No peripheral oedema. Chest wall non-tender.',
    'Troponin I: 4.5 ng/mL (<0.04) at 3 hours post-onset. CK-MB: 45 U/L (<5). HbA1c: 7.8%. LDL: 4.2 mmol/L. Creatinine: 1.0 mg/dL, K+: 4.0 mEq/L. CBC and INR: normal.',
    'ECG: Sinus tachycardia. ST-segment elevation 4mm in V1-V4 (anterior leads). Reciprocal ST depression in II, III, aVF. No pathological Q waves yet.',
    'Acute Anterior ST-Elevation Myocardial Infarction (STEMI) — Reperfusion indicated within 12 hours of symptom onset',
    ['STEMI', 'NSTEMI', 'Unstable Angina', 'Acute Pericarditis', 'Aortic Dissection', 'Pulmonary Embolism'],
    'Urgent reperfusion therapy, pain relief, prevent infarct expansion, manage arrhythmic and mechanical complications, initiate comprehensive secondary prevention',
    '1. Thrombolysis: IV Streptokinase 1.5 million units in 100mL NS over 60 minutes (monitor for hypotension and allergic reaction). 2. Dual antiplatelet therapy: Aspirin 300mg chewed stat then 75mg daily. Clopidogrel 300mg loading dose then 75mg daily. 3. Anticoagulation: Enoxaparin 30mg IV bolus then 1mg/kg SC BID (or UFH 60 U/kg bolus then 12 U/kg/hr if CrCl <30 mL/min). 4. Analgesia: IV Morphine 2.5mg increments titrated for pain relief. 5. Anti-emetic: IV Metoclopramide 10mg for nausea. 6. Oxygen via nasal cannula if SpO2 <90%.',
    'Strict bed rest in CCU/HDU. Continuous ECG monitoring for reperfusion arrhythmias. IV access x 2. NBM initially. Prepare defibrillator at bedside.',
    'Admit to CCU. Administer thrombolytic within 30 minutes of arrival (door-to-needle time <30 min). Monitor for successful reperfusion: >50% ST-segment resolution at 60-90 min, reperfusion arrhythmias (accelerated idioventricular rhythm), and relief of chest pain. If thrombolysis fails, arrange urgent transfer for rescue PCI. Start secondary prevention (bisoprolol, ramipril, atorvastatin) before discharge.',
    '1. Acute STEMI requiring immediate reperfusion with thrombolysis in a resource-limited setting where PCI is not immediately available. 2. Multiple uncontrolled cardiovascular risk factors (HTN, DM, dyslipidaemia) requiring aggressive secondary prevention.',
    'Continuous ECG and vitals monitoring. Monitor for bleeding (intracranial, GI, injection sites). Reperfusion assessment at 60-90 min post-thrombolysis. Cardiac enzymes q6-8h for 24 hours. Echocardiogram in 24-48 hours for LVEF assessment. Daily ECG for 3 days.',
    'Explain the diagnosis and why urgent thrombolysis was necessary. Discuss the importance of lifelong medication adherence. Provide cardiac rehabilitation counselling: low-salt low-fat diet, smoking cessation, graduated exercise after discharge. Recognise symptoms of recurrent MI and when to seek emergency care.',
    'Hospital stay 5-7 days with step-down monitoring. Start Bisoprolol 1.25mg daily once haemodynamically stable. Start Ramipril 2.5mg daily if systolic BP >100 and no contraindications. Atorvastatin 80mg daily (high-intensity statin). Cardiology follow-up in 4 weeks. Repeat echo in 6 weeks to reassess LVEF.',
    'Door-to-needle time must be <30 minutes for thrombolysis to be effective. Streptokinase is the preferred fibrinolytic in resource-limited settings due to low cost but carries risk of allergic reaction and hypotension (treat with IV fluids and slow infusion). Tenecteplase is a suitable alternative as a single IV bolus if available. In anterior STEMI, the combination of beta-blocker + ACEi + high-intensity statin + DAPT is the cornerstone of secondary prevention. Add Spironolactone 25mg daily if LVEF <40% on follow-up echo.',
    ['Kenya Clinical Guidelines: Management of Acute Coronary Syndrome', 'ESC Guidelines for the Management of Acute Myocardial Infarction in Patients Presenting with ST-Segment Elevation'],
  ),

  tpl(
    'Cardiovascular Pharmacology', 'Cardiology', 'Chronic Stable Angina',
    'Chronic Stable Angina Due to Significant LAD Stenosis',
    'Intermediate',
    'Exertional chest pressure for 3 months, relieved by rest',
    '{name}, a {age}-year-old {occupation} from {location}, presents with a 3-month history of retrosternal chest pressure or tightness brought on by physical exertion such as walking uphill or carrying heavy loads. The pain typically lasts 2-5 minutes and is promptly relieved by rest. No pain at rest. Pain is occasionally accompanied by mild dyspnoea but no palpitations, syncope, or nausea. Has been avoiding strenuous activity to prevent symptoms.',
    'Hypertension (8 years), Type 2 Diabetes (4 years), Dyslipidaemia (known but not treated). No prior MI or stroke.',
    'Amlodipine 5mg daily, Losartan 50mg daily, Metformin 1000mg BID. No statin or antiplatelet therapy.',
    'BP 138/85 mmHg, HR 78 bpm regular. CVS: normal heart sounds, no murmurs, S4 gallop. Lungs clear. No peripheral oedema. BMI 30 kg/m². Fundoscopy: mild hypertensive retinopathy.',
    'Fasting lipid profile: Total cholesterol 6.8 mmol/L (<5.2), LDL 4.5 mmol/L (<2.6), HDL 1.0 mmol/L (>1.0), Triglycerides 2.1 mmol/L (<1.7). HbA1c: 7.2%. Troponin I: negative. Creatinine: 1.0 mg/dL, eGFR >60. ECG at rest: normal sinus rhythm, no ST changes.',
    'Coronary angiography: 70% stenosis in the proximal left anterior descending (LAD) artery. Mild disease in RCA and LCx. LVEF 55%. Exercise stress ECG: positive for ischaemia at 6 METS (ST depression 2mm in V4-V6).',
    'Chronic Stable Angina (Canadian Cardiovascular Society Class II-III) due to Significant LAD Stenosis',
    ['Chronic Stable Angina', 'Unstable Angina', 'NSTEMI', 'Microvascular Angina', 'Costochondritis', 'GERD'],
    'Relieve anginal symptoms, prevent progression to ACS, control cardiovascular risk factors, improve quality of life, reduce long-term cardiovascular mortality',
    '1. Anti-anginal therapy: Bisoprolol 2.5mg daily (titrate to target HR 55-60 bpm). Sublingual GTN 0.5mg spray/tablets PRN for acute attacks. Add Amlodipine 5-10mg daily or Isosorbide Mononitrate 30mg daily (with 8-10 hour nitrate-free interval) if symptoms persist despite beta-blocker. 2. Antiplatelet: Aspirin 75mg daily. 3. High-intensity statin: Atorvastatin 40mg daily (target LDL <1.8 mmol/L). 4. ACE inhibitor: Ramipril 2.5mg daily for HTN and cardioprotection. 5. Optimise diabetes control with Metformin.',
    'Lifestyle modification: smoking cessation counselling, DASH diet, regular aerobic exercise (30 min brisk walking 5 days/week), weight reduction target BMI <25 kg/m², stress management, limit alcohol intake.',
    'Start Bisoprolol 2.5mg daily and Aspirin 75mg daily. Prescribe sublingual GTN with proper usage instruction. Add Atorvastatin 40mg daily with baseline LFTs. If symptoms persist after 2-4 weeks, add Amlodipine 5mg or Isosorbide Mononitrate 30mg. Advise comprehensive lifestyle changes. Discuss revascularisation (PCI to LAD) with cardiothoracic team if symptoms remain CCS Class II-III despite optimal medical therapy.',
    '1. Chronic stable angina with documented LAD stenosis requiring comprehensive medical management. 2. Multiple uncontrolled cardiovascular risk factors (HTN, DM, dyslipidaemia) requiring aggressive secondary prevention.',
    'Monitor symptom frequency and severity (angina diary). BP and HR at each visit. ECG if symptom pattern changes. Lipid profile and LFTs in 3 months. HbA1c every 3 months. Assess exercise tolerance at follow-up.',
    'Explain the mechanism of angina and proper use of sublingual GTN (take at first sign of pain, may repeat q5min up to 3 doses, seek emergency care if pain persists >15 min or occurs at rest). Importance of daily medication adherence. Lifestyle modification counselling including diet and exercise. When to seek urgent medical attention (unstable pattern, pain at rest, not relieved by GTN).',
    'Cardiology clinic review in 4 weeks to assess symptom control and medication tolerance. Repeat lipid profile and LFTs in 3 months. Echocardiogram in 6 months. Refer for coronary angiogram review and consideration of PCI if symptoms persist on optimal medical therapy.',
    'The goal of anti-anginal therapy is resting HR of 55-60 bpm with beta-blockers as first-line. Sublingual GTN is for acute symptom relief only, not for chronic prophylaxis. Nitrate tolerance develops with chronic scheduled use — ensure 8-10 hour nitrate-free interval with isosorbide mononitrate. Stable angina with single-vessel LAD disease can often be managed medically; revascularisation is reserved for those with persistent symptoms on optimal medical therapy or high-risk anatomy.',
    ['Kenya Clinical Guidelines: Management of Chronic Stable Angina', 'ESC Guidelines for the Management of Chronic Coronary Syndromes'],
  ),
];

// ================================================================
// ALL TEMPLATES BY SUBJECT (for batch generation)
// ================================================================

export const ALL_TEMPLATES: Record<string, ClinicalCaseTemplate[]> = {
  'General Pharmacology': GENERAL_PHARMACOLOGY_TEMPLATES,
  'Autonomic Pharmacology': AUTONOMIC_PHARMACOLOGY_TEMPLATES,
  'Cardiovascular Pharmacology': CARDIOVASCULAR_PHARMACOLOGY_TEMPLATES,
  'Respiratory Pharmacology': RESPIRATORY_TEMPLATES,
  'Gastrointestinal Pharmacology': GASTROINTESTINAL_TEMPLATES,
  'Endocrine Pharmacology': ENDOCRINE_TEMPLATES,
  'Vitamins & Nutrition': VITAMINS_TEMPLATES,
  'Central Nervous System Pharmacology': CNS_TEMPLATES,
  'Pain & Inflammation': PAIN_INFLAMMATION_TEMPLATES,
  'Chemotherapy & Antimicrobial Pharmacology': CHEMOTHERAPY_TEMPLATES,
  'Oncology': ONCOLOGY_TEMPLATES,
  'Hematology': HEMATOLOGY_TEMPLATES,
  'Renal Pharmacology': RENAL_TEMPLATES,
  'Dermatology': DERMATOLOGY_TEMPLATES,
  'Ophthalmology': OPHTHALMOLOGY_TEMPLATES,
  'Toxicology': TOXICOLOGY_TEMPLATES,
  'Clinical Pharmacy': CLINICAL_PHARMACY_TEMPLATES,
};

export const ALL_TEMPLATE_COUNT = Object.values(ALL_TEMPLATES).reduce((sum, t) => sum + t.length, 0);
