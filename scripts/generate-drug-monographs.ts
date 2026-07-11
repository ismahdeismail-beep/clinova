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
}

function capitalize(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }

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
      'Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) â€” report persistent diarrhoea',
      'QT prolongation (certain classes) â€” ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities',
      'Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening â€” discontinue if rash with blistering or mucosal involvement)',
    ],
    classCI: [
      'Hypersensitivity to active substance or any excipient in the formulation',
      'Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)',
      'Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)',
    ],
    classInteractions: [
      'Warfarin / DOACs â€” many antimicrobials alter INR; monitor coagulation closely',
      'Oral contraceptives â€” reduced efficacy during and 7 days after therapy; advise additional barrier contraception',
      'Antacids / iron / calcium / magnesium / milk products â€” reduced absorption of tetracyclines and fluoroquinolones; space dosing 2â€“4 hours apart',
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
      'Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying',
      'Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope',
      'Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent',
      'Dry cough (ACE inhibitors) â€” consider ARB if intolerable',
    ],
    classCI: [
      'Hypersensitivity to active substance',
      'Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)',
      'Cardiogenic shock / decompensated heart failure (for certain negative inotropes)',
      'Severe hypotension (systolic BP <90 mmHg)',
    ],
    classInteractions: [
      'NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible',
      'Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining',
      'Diuretics â€” additive hypotension; monitor BP and electrolytes',
      'Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels',
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
      'Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known',
      'Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)',
      'Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia',
      'Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)',
    ],
    classCI: [
      'Hypersensitivity to active substance',
      'Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)',
      'Severe hepatic impairment (drugs extensively hepatically metabolized)',
      'MAOI co-administration or recent discontinuation (certain antidepressants)',
    ],
    classInteractions: [
      'Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use',
      'MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required',
      'Warfarin â€” altered metabolism with certain CNS agents; monitor INR',
      'Serotonergic drugs (triptans, tramadol, St John\'s Wort) â€” serotonin syndrome risk; avoid combination',
    ],
    monitoring: 'Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).',
    counselling: 'May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.',
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
      'Gastric ulceration / bleeding (NSAIDs) â€” risk increases with duration and dose',
      'Hepatotoxicity (paracetamol overdose) â€” adhere to maximum daily dose',
      'Respiratory depression (opioids) â€” risk highest in opioid-naÃ¯ve, elderly, or those with respiratory compromise',
    ],
    classCI: [
      'Hypersensitivity to active substance or NSAIDs (including aspirin-exacerbated respiratory disease)',
      'Active peptic ulceration / gastrointestinal bleeding (NSAIDs)',
      'Severe hepatic impairment (paracetamol, NSAIDs)',
      'Severe renal impairment (NSAIDs)',
      'Concurrent anticoagulation (NSAIDs)',
    ],
    classInteractions: [
      'Anticoagulants (warfarin, DOACs, heparin) â€” increased bleeding risk with NSAIDs; avoid combination',
      'Methotrexate â€” reduced clearance and increased toxicity with NSAIDs',
      'CNS depressants (alcohol, benzodiazepines) â€” additive sedation with opioids',
      'ACE inhibitors / diuretics â€” reduced antihypertensive efficacy and increased nephrotoxicity with NSAIDs',
    ],
    monitoring: 'Monitor pain scores, renal function (especially with NSAIDs in elderly/dehydrated), liver function (paracetamol), signs of bleeding/anaemia (NSAIDs), respiratory rate and sedation score (opioids), and bowel function (opioid-induced constipation).',
    counselling: 'Use the lowest effective dose for the shortest duration. Do not exceed maximum daily dose (especially paracetamol). Avoid alcohol. NSAIDs should be taken with food. Opioids may cause dependence â€” use exactly as prescribed. Report severe abdominal pain, black stools, or vomiting blood (NSAIDs).',
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
      'Antacids / sucralfate â€” reduced absorption of PPIs, H2RAs, and some other GI agents; separate dosing',
      'Clopidogrel â€” potential reduced efficacy with some PPIs (especially omeprazole, esomeprazole)',
      'CNS depressants â€” additive sedation with certain antiemetics',
      'Digoxin, thyroxine â€” reduced absorption with some GI agents; monitor levels',
    ],
    monitoring: 'Monitor symptom response, endoscopy findings where applicable, electrolytes (prolonged PPI use), renal function, liver function. For IBD patients: monitor inflammatory markers, faecal calprotectin, and nutritional status.',
    counselling: 'Take PPIs 30â€“60 minutes before breakfast for optimal effect. Avoid trigger foods, alcohol, and smoking. Report black/tarry stools, haematemesis, or severe abdominal pain. Do not use antacids within 2 hours of other medications.',
  },
  'Endocrine': {
    drugClass: 'Endocrine / metabolic agent',
    classIndications: [
      'Management of diabetes mellitus (type 1 and type 2)',
      'Thyroid disorders (hypothyroidism, hyperthyroidism)',
      'Bone metabolism disorders (osteoporosis, Paget\'s disease)',
      'Adrenal insufficiency / corticosteroid replacement therapy',
    ],
    classSE: [
      'Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management',
      'Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)',
      'GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)',
      'Bone/jaw pain, atypical femoral fractures (bisphosphonates)',
      'Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing',
    ],
    classCI: [
      'Hypersensitivity to active substance',
      'Diabetic ketoacidosis (metformin, SGLT2i)',
      'Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)',
      'Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)',
      'Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)',
    ],
    classInteractions: [
      'Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses',
      'Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition',
      'Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose',
      'Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring',
    ],
    monitoring: 'Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.',
    counselling: 'Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.',
  },
  'Respiratory': {
    drugClass: 'Respiratory agent',
    classIndications: [
      'Asthma management (preventer and reliever therapy)',
      'COPD management (bronchodilators, inhaled corticosteroids)',
      'Allergic rhinitis (intranasal corticosteroids, antihistamines)',
      'Pulmonary fibrosis / interstitial lung disease (antifibrotic agents)',
    ],
    classSE: [
      'Oropharyngeal candidiasis and dysphonia (inhaled corticosteroids) â€” rinse mouth after use',
      'Tremor, palpitations, tachycardia (beta-2 agonists) â€” dose-dependent; usually self-limiting',
      'Dry mouth, throat irritation, cough (inhaled therapies)',
      'Headache, dizziness, nausea (systemic effects)',
      'Paradoxical bronchospasm (rare â€” discontinue and use alternative)',
    ],
    classCI: [
      'Hypersensitivity to active substance or excipients',
      'Acute severe asthma / status asthmaticus (long-acting beta-agonists without concomitant ICS)',
      'Cardiac arrhythmias (certain bronchodilators â€” caution)',
    ],
    classInteractions: [
      'Beta-blockers (including ophthalmic) â€” antagonist effects on beta-agonists; avoid if possible',
      'Potassium-depleting diuretics â€” increased risk of hypokalaemia with beta-2 agonists',
      'MAOIs / tricyclic antidepressants â€” increased cardiovascular effects with beta-2 agonists',
      'CYP3A4 inhibitors (certain ICS) â€” increased systemic exposure; monitor for adrenal suppression',
    ],
    monitoring: 'Monitor peak expiratory flow (PEF), FEV1, symptom scores, inhaler technique at every visit, exacerbation frequency, oral corticosteroid use, bone density (long-term ICS), growth velocity in children, and adrenal function in high-dose ICS.',
    counselling: 'Rinse mouth with water after each inhaler use (not swallowing) to prevent thrush. Use your inhaler correctly â€” demonstrate technique at every visit. Know the difference between preventer (daily) and reliever (as needed). Have an action plan. Seek urgent care if reliever not lasting 4 hours or symptoms worsening.',
  },
  'Anticoagulants': {
    drugClass: 'Anticoagulant / antithrombotic agent',
    classIndications: [
      'Atrial fibrillation (stroke prevention)',
      'Venous thromboembolism treatment and prophylaxis (DVT, PE)',
      'Mechanical heart valve thromboprophylaxis',
      'Acute coronary syndrome (dual antiplatelet therapy)',
    ],
    classSE: [
      'Bleeding (major: intracranial, GI, retroperitoneal; minor: epistaxis, bruising, haematuria, gingival)',
      'Heparin-induced thrombocytopenia (HIT) â€” immune-mediated; monitor platelets',
      'Osteoporosis (long-term heparin use)',
      'Skin necrosis / purple toe syndrome (warfarin)',
      'Dyspepsia, GI disturbances (antiplatelets)',
    ],
    classCI: [
      'Active pathological bleeding / bleeding diathesis',
      'Severe uncontrolled hypertension',
      'Recent intracranial haemorrhage / spinal surgery / CNS tumour',
      'Severe hepatic impairment with coagulopathy',
      'Concurrent anticoagulant therapy (changeover protocols only)',
      'Pregnancy (warfarin teratogenic; LMWH preferred)',
    ],
    classInteractions: [
      'NSAIDs / aspirin â€” significantly increased bleeding risk; avoid combination',
      'Antiplatelets (clopidogrel, ticagrelor) â€” additive bleeding risk; use only if clearly indicated',
      'Antifungals (azoles) â€” altered anticoagulant metabolism',
      'Antibiotics â€” altered gut flora (warfarin) â€” increased INR; frequent monitoring',
      'Herbal: St John\'s Wort (reduced efficacy), ginkgo, ginger, garlic (increased bleeding risk)',
    ],
    monitoring: 'Warfarin: INR monitoring at least weekly until stable, then every 4â€“6 weeks. DOACs: renal function at baseline and annually (more frequent if eGFR <60). Antiplatelets: bleeding risk assessment. All: Hb, signs of occult blood loss. HIT screening (heparin/LMWH â€” platelets every 2â€“3 days).',
    counselling: 'Watch for signs of bleeding: unusual bruising, blood in urine/stool, black tarry stools, prolonged bleeding from cuts, coughing blood. Seek immediate help for severe headache, vision changes, or weakness (possible intracranial bleed). Carry anticoagulant card. Avoid NSAIDs. Consistent vitamin K intake for warfarin. Do not double dose if missed (DOACs: take if within 12 hours of missed dose).',
  },
  'Oncology': {
    drugClass: 'Antineoplastic / chemotherapeutic agent',
    classIndications: [
      'Adjuvant and neoadjuvant therapy for solid tumours',
      'Palliative chemotherapy for advanced/metastatic disease',
      'Haematological malignancies (leukaemia, lymphoma, myeloma)',
      'Targeted therapy for specific molecular subtypes',
    ],
    classSE: [
      'Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) â€” nadir typically 7â€“14 days post-treatment',
      'Nausea and vomiting (acute, delayed, anticipatory) â€” prophylactic antiemetics essential',
      'Alopecia (variable depending on agent) â€” usually reversible',
      'Mucositis / stomatitis â€” oral care protocol',
      'Cardiotoxicity (anthracyclines, trastuzumab) â€” baseline and serial echo',
    ],
    classCI: [
      'Hypersensitivity to active substance',
      'Severe myelosuppression (unless planned treatment of leukaemia with supportive care)',
      'Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)',
      'Pregnancy (teratogenic) â€” effective contraception required',
      'Live vaccines during and up to 6 months after chemotherapy',
    ],
    classInteractions: [
      'CYP450 inducers/inhibitors â€” may alter chemo efficacy/toxicity',
      'Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) â€” additive nephrotoxicity with platinum agents',
      'Cardiotoxic drugs (anthracyclines + trastuzumab) â€” cumulative cardiotoxicity',
      'Anticoagulants â€” thrombocytopenia increases bleeding risk',
    ],
    monitoring: 'Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.',
    counselling: 'Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38Â°C immediately (neutropenic sepsis â€” life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.',
  },
  'Dermatology': {
    drugClass: 'Dermatological agent',
    classIndications: [
      'Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)',
      'Treatment of skin infections (bacterial, fungal, viral)',
      'Acne vulgaris management',
      'Skin barrier repair and protection',
    ],
    classSE: [
      'Local irritation, burning, stinging, pruritus at application site',
      'Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)',
      'Photosensitivity â€” use sun protection during treatment',
      'Contact dermatitis / allergic sensitization',
      'Skin discolouration (post-inflammatory hypo- or hyperpigmentation)',
    ],
    classCI: [
      'Hypersensitivity to active substance or excipients',
      'Untreated bacterial/fungal/viral infections at application site (corticosteroids)',
      'Skin ulceration / wounds (certain topical agents)',
      'Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)',
    ],
    classInteractions: [
      'Concurrent topical therapies â€” apply at different times to avoid interactions',
      'Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids',
      'Photosensitizing drugs â€” increased photosensitivity risk',
    ],
    monitoring: 'Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.',
    counselling: 'Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.',
  },
  'Immunology': {
    drugClass: 'Immunomodulatory / biologic agent',
    classIndications: [
      'Autoimmune inflammatory conditions (rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis)',
      'Inflammatory bowel disease (Crohn\'s disease, ulcerative colitis)',
      'Psoriasis and hidradenitis suppurativa',
      'Organ transplant rejection prophylaxis',
    ],
    classSE: [
      'Increased infection risk (especially reactivation of TB, hepatitis B, and opportunistic infections)',
      'Injection site reactions (pain, erythema, swelling)',
      'Infusion reactions (fever, chills, hypotension â€” during IV administration)',
      'Hypersensitivity / anaphylaxis (rare)',
      'Malignancy risk (long-term immunosuppression)',
    ],
    classCI: [
      'Active severe infection (treat infection before starting biologic)',
      'Untreated latent TB / active TB',
      'Active hepatitis B infection (prophylaxis or defer treatment)',
      'Severe heart failure (certain TNF inhibitors)',
      'Demyelinating disorders (relative contraindication for TNF inhibitors)',
    ],
    classInteractions: [
      'Live vaccines â€” contraindicated during treatment and for variable period after (check product monograph)',
      'Immunosuppressants (methotrexate, azathioprine, ciclosporin) â€” additive immunosuppression',
      'CYP450 substrates â€” IL-6 inhibitors may alter metabolism of CYP substrates (e.g., warfarin, statins)',
    ],
    monitoring: 'Screen for latent TB (IGRA/PPD), hepatitis B/C, HIV before initiation. FBC, LFT, U&E at baseline and periodically. Monitor for signs of infection at every visit. Assess disease activity scores (DAS28, PASI, HBI). Review vaccination status and update appropriate non-live vaccines before starting.',
    counselling: 'Increased risk of infections â€” report any fever, cough, unusual symptoms immediately. Stay up to date with vaccinations (avoid live vaccines while on treatment). Carry a treatment alert card. Do not stop or miss doses without consulting your specialist. Regular blood tests are required for monitoring.',
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
      'Digitalis toxicity (calcium IV â€” risk of cardiac arrest)',
      'Extravasation risk (calcium solutions â€” IV access must be secure)',
    ],
    classInteractions: [
      'Digoxin â€” hypokalaemia/hypomagnesaemia increase digoxin toxicity; maintain normal levels',
      'Diuretics â€” increased electrolyte loss; monitor levels regularly',
      'ACE inhibitors / ARBs â€” hyperkalaemia risk (especially with potassium-sparing diuretics or K supplements)',
      'Corticosteroids â€” increased sodium retention and potassium loss',
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
      'Ileus / GI obstruction (activated charcoal â€” risk of aspiration and obstruction)',
      'Caustic ingestion (activated charcoal â€” contraindicated; endoscopy required)',
      'Petroleum distillate ingestion (activated charcoal â€” aspiration risk)',
    ],
    classInteractions: [
      'Activated charcoal â€” reduces absorption of ALL oral medications; separate all oral drugs by at least 2 hours',
      'Naloxone â€” concurrent use of other opioid antagonists',
      'Antivenoms â€” may interfere with vaccine efficacy',
      'Multiple antidote interactions depending on specific toxins',
    ],
    monitoring: 'Monitor vital signs continuously (BP, HR, SpO2, RR, GCS). Cardiac monitoring (ECG for toxin-induced arrhythmias). Serial toxin levels where available (paracetamol, salicylate, lithium, digoxin, theophylline, iron, carboxyhaemoglobin, methaemoglobin). Electrolytes, renal function, liver function, coagulation. Needle-stick and sharps precautions during administration.',
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
      'Iron overload (haemochromatosis, haemosiderosis â€” iron supplements contraindicated)',
      'Severe renal impairment (certain electrolyte/vitamin formulations)',
      'Galactosaemia (lactose-containing formulations)',
    ],
    classInteractions: [
      'Tetracyclines / fluoroquinolones â€” absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2â€“4 hours',
      'Thyroxine â€” absorption reduced by calcium, iron; separate dosing by 4 hours',
      'Warfarin â€” vitamin K reverses anticoagulation; consistent dietary intake important',
      'PPIs â€” reduced absorption of calcium, vitamin B12, magnesium',
    ],
    monitoring: 'Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.',
    counselling: 'Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).',
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
      'Respiratory depression (dose-dependent) â€” require airway management and ventilatory support',
      'Hypotension / haemodynamic instability (many anaesthetic agents)',
      'Post-operative nausea and vomiting (PONV)',
      'Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency',
      'Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)',
    ],
    classCI: [
      'Hypersensitivity to active substance',
      'Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)',
      'Severe cardiovascular instability / uncompensated shock',
      'Raised intracranial pressure (certain agents)',
      'Porphyria (barbiturates, etomidate)',
    ],
    classInteractions: [
      'Opioids / benzodiazepines â€” synergistic respiratory depression and sedation',
      'Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)',
      'Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents',
      'Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium',
    ],
    monitoring: 'Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.',
    counselling: 'Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.',
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
      'Narrow-angle glaucoma (mydriatics/cycloplegics â€” risk of acute angle closure)',
      'Severe asthma / COPD (topical beta-blockers)',
      'Sinus bradycardia / heart block (topical beta-blockers)',
    ],
    classInteractions: [
      'Beta-blockers (oral) â€” additive systemic beta-blockade with topical beta-blockers; monitor pulse/BP',
      'Calcium channel blockers / digoxin â€” additive cardiac effects with topical beta-blockers',
      'Adrenaline (topical) â€” mydriasis with anticholinergics',
      'Multiple eye drops â€” separate by at least 5 minutes to prevent washout',
    ],
    monitoring: 'Monitor intraocular pressure (tonometry), visual acuity, visual fields, optic disc assessment. For inflammatory conditions: anterior chamber activity (cells, flare). Corneal examination (slit lamp). Systemic effects: pulse, BP (especially with beta-blockers), lung auscultation in asthmatics.',
    counselling: 'Remove contact lenses before instilling drops (wait 15 minutes before reinserting). Apply pressure to the inner corner of the eye (nasolacrimal occlusion) for 1 minute after drops to reduce systemic absorption. Do not touch the dropper tip to your eye or any surface. Separate different eye drops by 5 minutes. Discard any solution that changes colour or becomes cloudy.',
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
      'Anticoagulants â€” may affect INR or bleeding risk',
      'Antihypertensives â€” additive hypotensive effects',
      'Alcohol â€” avoid or limit during therapy',
    ],
    monitoring: 'Monitor clinical response to therapy, renal function, liver function, full blood count as appropriate. Monitor for adverse effects based on specific drug profile. Therapeutic drug monitoring where applicable. Regular follow-up assessments to evaluate treatment efficacy and tolerability.',
    counselling: 'Take medication exactly as prescribed. Do not stop or adjust dose without consulting your doctor. Report any unusual symptoms, persistent side effects, or lack of therapeutic response. Keep all follow-up appointments for monitoring. Maintain a list of all medications you take.',
  },
};

function generateMonograph(drug: CanonicalDrug): DrugMonograph {
  const template = CLASS_SPECIFIC_CONTENT[drug.therapeuticClass] || CLASS_SPECIFIC_CONTENT['Other'];
  const n = drug.name;

  return {
    name: n,
    generic_name: n,
    drug_class: template.drugClass,
    indications: template.classIndications,
    contraindications: template.classCI,
    side_effects: template.classSE,
    dosage: {
      adult: { 'Standard dosing (adult)': 'Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications.' },
      paediatric: { 'Standard dosing (paediatric)': 'Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently.' },
      geriatric: { 'Standard dosing (geriatric)': 'Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve.' },
      renalAdjustment: 'Dose adjustment may be required depending on the drug\'s elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.',
      hepaticAdjustment: 'Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible.',
    },
    interactions: template.classInteractions.map(s => s.replace(/{drug}/g, n)),
    monitoring: template.monitoring.replace(/{drug}/g, n),
    patient_counselling: template.counselling.replace(/{drug}/g, n),
  };
}

function generateBatchFile(monographs: DrugMonograph[], batchNumber: number, outputDir: string): void {
  const filename = `seed-drug-monographs-batch${batchNumber}.ts`;
  const lines: string[] = [
    `/**`,
    ` * seed-drug-monographs-batch${batchNumber}.ts`,
    ` * Auto-generated batch of drug monograph seed data`,
    ` * Generated from canonical drug registry`,
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
  const registry: CanonicalDrug[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'drug-registry-canonical.json'), 'utf-8')
  );

  const unseeded = registry.filter(d => d.status === 'new');
  console.log(`Generating monographs for ${unseeded.length} unseeded drugs...`);

  const monographs = unseeded.map(d => generateMonograph(d));
  const BATCH_SIZE = 40;
  let batchNum = 10; // Start from 10 (after existing batch1-8, plus we'll count batch9 if it exists)

  // Find highest existing batch number
  const existingBatches = fs.readdirSync(__dirname).filter(f => f.match(/seed-drug-monographs-batch(\d+)\.ts/));
  const existingNums = existingBatches.map(f => parseInt(f.match(/seed-drug-monographs-batch(\d+)\.ts/)![1]));
  if (existingNums.length > 0) batchNum = Math.max(...existingNums) + 1;

  for (let i = 0; i < monographs.length; i += BATCH_SIZE) {
    const batch = monographs.slice(i, i + BATCH_SIZE);
    generateBatchFile(batch, batchNum, __dirname);
    batchNum++;
  }

  console.log(`\nDone. Generated monographs for ${monographs.length} drugs across ${Math.ceil(monographs.length / BATCH_SIZE)} batch files.`);
}

main().catch(console.error);
