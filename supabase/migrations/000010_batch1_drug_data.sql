-- Item 1: Artemether-Lumefantrine - fill missing columns
-- ID: 9fdafaaa-ee6c-4020-b2dc-eee5f5d25b83
-- drug_class_id: 4d0824b6-cd19-4f5a-90eb-c37a43bb236a (Antimalarial ACT)

UPDATE drug_monographs
SET
  adult_dosing = '{
    "uncomplicated_malaria_35kg_plus": "4 tablets (80/480 mg) PO at 0, 8, 24, 36, 48, 60 hours; take with fatty food",
    "uncomplicated_malaria_25_34kg": "3 tablets (60/360 mg) PO at 0, 8, 24, 36, 48, 60 hours; take with fatty food",
    "uncomplicated_malaria_15_24kg": "2 tablets (40/240 mg) PO at 0, 8, 24, 36, 48, 60 hours; take with fatty food"
  }'::jsonb,

  pediatric_dosing = '{
    "uncomplicated_malaria_5_14kg": "1 tablet (20/120 mg) PO at 0, 8, 24, 36, 48, 60 hours; take with fatty food or breast milk",
    "uncomplicated_malaria_under_5kg": "5 mg/kg artemether + 30 mg/kg lumefantrine per dose (use weight-based dosing); insufficient data below 5 kg - consult specialist"
  }'::jsonb,

  mechanism_of_action = 'Artemether: rapidly acting artemisinin derivative. The endoperoxide bridge is cleaved by haem (iron(II)) released from haemoglobin digestion in the parasite food vacuole, generating carbon-centred free radicals that alkylate parasite proteins, damage membranes, and inhibit the sarcoplasmic/endoplasmic reticulum calcium ATPase (PfATP6/SERCA). Lumefantrine: aryl-amino alcohol that inhibits haem detoxification by binding to free haem, preventing its polymerisation into inert haemozoin. Synergy: artemether provides rapid (faster than any other antimalarial class) parasite clearance and symptom resolution, while lumefantrine has a longer half-life (~4-6 days), eliminating residual parasites and reducing the risk of recrudescence. This 6-dose fixed-ratio ACT is designed to achieve >98% cure rate for uncomplicated P. falciparum when adherence is complete.',

  pharmacokinetics = '{
    "artemether_absorption": "Rapidly absorbed (tmax ~2 hours); food increases AUC ~2-fold",
    "artemether_distribution": "High protein binding (~95%); widely distributed (Vd ~2 L/kg); crosses BBB in small amounts",
    "artemether_metabolism": "Extensively metabolised by CYP3A4 to active metabolite dihydroartemisinin (DHA); DHA is 5-10x more active than parent",
    "artemether_half_life": "~1 hour (artemether); ~1-2 hours (DHA)",
    "lumefantrine_absorption": "Slowly absorbed (tmax ~6-8 hours); highly lipophilic - absorption increases 2-16 fold with fatty food; critical for efficacy",
    "lumefantrine_distribution": "Very high protein binding (~99%); large Vd (~20 L/kg)",
    "lumefantrine_metabolism": "Primarily CYP3A4 - oxidised to desbutyl-lumefantrine (active metabolite) and other metabolites",
    "lumefantrine_half_life": "~4-6 days (terminal), enabling prolonged parasite elimination",
    "elimination": "Artemether/DHA: minimal renal elimination (<1%). Lumefantrine: eliminated via bile into faeces; negligible renal clearance"
  }'::jsonb,

  clinical_pearls = 'KEY COUNSELLING: The 6-dose regimen over 3 days is non-negotiable - partial courses are the single biggest driver of ACT resistance. Fatty food (milk, chapati, oil, avocado) is not optional for adults - lumefantrine absorption falls by 50-90% on an empty stomach. For infants, give with breast milk. If vomiting occurs within 1 hour of a dose, repeat the full dose. Artemether-Lumefantrine is the most widely used ACT in sub-Saharan Africa and remains highly effective (>95% cure) in most of Kenya, though emerging artemisinin partial resistance (delayed parasite clearance) has been reported in the Greater Mekong Subregion and, more recently, in East Africa (Rwanda, Uganda, Ethiopia). In Kenya, routine surveillance is ongoing but artemether-lumefantrine remains first-line for uncomplicated malaria per the Kenya National Malaria Control Programme and the Kenya STG 2023.',

  renal_dose_adjustment = 'No dose adjustment required - renal elimination is negligible for both components.',

  hepatic_dose_adjustment = 'Avoid in severe hepatic impairment (Child-Pugh C). Use with caution in moderate impairment - no formal PK studies exist; monitor for QTc prolongation and adverse effects. Lumefantrine is extensively hepatically metabolised.',

  administration_instructions = 'Take ALL 6 doses at exact times: 0, 8, 24, 36, 48, and 60 hours. ALWAYS take with fatty food or full-fat milk to ensure adequate absorption. For children unable to swallow tablets: tablets may be crushed and mixed with a teaspoon of water, breast milk, or porridge. If the patient vomits within 1 hour of a dose, administer a full repeat dose. Do not skip or delay doses - even a single missed dose increases the risk of treatment failure and resistance.',

  serious_adverse_reactions = ARRAY[
    'QTc interval prolongation (usually mild, rarely >30 ms; torsades de pointes extremely rare at therapeutic doses)',
    'Severe cutaneous adverse reactions (SCARs) - Stevens-Johnson syndrome / toxic epidermal necrolysis (very rare)',
    'Haemolytic anaemia - reported in patients with G6PD deficiency receiving artemisinin derivatives; monitor',
    'Anaphylaxis / angioedema (rare)',
    'Hepatotoxicity - transient transaminase elevation; acute liver injury (very rare)'
  ],

  food_interactions = ARRAY[
    'CRITICAL: Fatty food increases lumefantrine absorption 2-16 fold - always administer with fat-containing meal',
    'Grapefruit juice: may increase lumefantrine absorption - avoid concurrent use',
    'No significant interaction with caffeine or alcohol in usual amounts; alcohol should be avoided during acute illness'
  ],

  pregnancy_guidance = 'Artemether-Lumefantrine may be used in the second and third trimesters when indicated for uncomplicated falciparum malaria. First-trimester use is avoided unless the benefit clearly outweighs the risk (limited safety data; animal studies showed embryo-foetal toxicity at maternally toxic doses). The WHO recommends artemether-lumefantrine as a first-line ACT for pregnant women with uncomplicated malaria in the second and third trimesters. For first-trimester malaria, quinine + clindamycin (7-day regimen) remains the traditional alternative. The 6-dose regimen must be completed even in pregnancy.',

  lactation_guidance = 'Artemether and lumefantrine are excreted in human milk in small quantities (<0.5% of the maternal dose). The WHO and Kenya STG consider the use of artemether-lumefantrine compatible with breastfeeding. The infant receives a negligible dose and no adverse effects have been reported. Breastfeeding should continue during treatment, ensuring adequate maternal hydration and nutrition.',

  warnings = ARRAY[
    'Resistance monitoring: delayed parasite clearance (persistent parasitaemia >5% at 72 hours) may indicate emerging artemisinin resistance - report suspected treatment failures',
    'QTc prolongation: artemether-lumefantrine causes mild QTc prolongation (~7-10 ms mean increase). Avoid with other QT-prolonging drugs (halofantrine, quinine, chloroquine, amiodarone) and in patients with pre-existing QTc prolongation or electrolyte disturbances',
    'Cardiac effects: post-marketing cases of QT prolongation and cardiac arrhythmia reported; use caution in patients with bradycardia, cardiac disease, or uncorrected electrolyte imbalance',
    'Not for severe malaria: patients with severe malaria (impaired consciousness, respiratory distress, severe anaemia, renal failure, jaundice, hyperparasitaemia) require IV artesunate - switch to oral ACT only when clinically stable',
    'Do not use as monotherapy: artemether or lumefantrine alone - always use the fixed-dose combination'
  ],

  precautions = ARRAY[
    'ECG monitoring advisable in patients with pre-existing cardiac disease, electrolyte imbalance, or on QT-prolonging drugs',
    'Monitor blood glucose - artemisinin derivatives have been associated with hypoglycaemia',
    'Monitor parasitaemia at 24, 48, and 72 hours; by 72 hours parasitaemia should fall by >90%',
    'Caution in patients with G6PD deficiency - haemolysis reported with artemisinin derivatives; haemoglobin monitoring advisable',
    'Avoid repeat courses within 28 days unless confirmed recrudescence',
    'Not recommended for chemoprophylaxis - artemether-lumefantrine is only for treatment of confirmed malaria',
    'Ensure correct weight-based dosing - especially in children; underdosing drives resistance'
  ]

WHERE id = '9fdafaaa-ee6c-4020-b2dc-eee5f5d25b83';
-- 1b. Create KDI entry for Artemether-Lumefantrine
INSERT INTO kenya_drug_index (id, drug_name, generic_name, classification, formulary_status, notes, brand_names, atc_code, strengths, dosage_forms, routes, pregnancy_category, lactation_info, controlled_status, storage_recommendations, availability_status)
VALUES (
  'a0000000-0000-0000-0000-000000000009',
  'Artemether-Lumefantrine',
  'Artemether + Lumefantrine',
  'Artemisinin-based combination therapy (ACT)',
  'KEML core list',
  'First-line treatment for uncomplicated P. falciparum malaria — most widely used ACT in sub-Saharan Africa',
  ARRAY['Coartem', 'Riamet', 'Lumartem'],
  'P01BF01',
  ARRAY['20/120 mg (dispersible tablet)', '40/240 mg (tablet)', '60/360 mg (tablet)', '80/480 mg (tablet)'],
  ARRAY['tablet (dispersible)', 'tablet'],
  ARRAY['oral'],
  'May be used in 2nd/3rd trimester; first-trimester only if benefit > risk (WHO recommends quinine + clindamycin in 1st trimester)',
  'Excreted in milk in small amounts (<0.5% maternal dose); compatible with breastfeeding per WHO and Kenya STG',
  'Not controlled',
  'Store below 30°C. Protect from light and moisture. Keep in original packaging.',
  'Widely available'
)
ON CONFLICT (id) DO NOTHING;

-- 1c. Link KDI to drug monograph
UPDATE drug_monographs
SET kenya_drug_index_id = 'a0000000-0000-0000-0000-000000000009'
WHERE id = '9fdafaaa-ee6c-4020-b2dc-eee5f5d25b83';

-- 1d. Add disease-drug relationships
INSERT INTO disease_drug_relationships (disease_id, drug_monograph_id, relationship_type, notes) VALUES
  ('malaria', '9fdafaaa-ee6c-4020-b2dc-eee5f5d25b83', 'first_line', 'First-line treatment for uncomplicated P. falciparum malaria per Kenya STG 2023 and WHO; use with strict adherence to 6-dose weight-based regimen'),
  ('pediatric_malaria', '9fdafaaa-ee6c-4020-b2dc-eee5f5d25b83', 'first_line', 'First-line ACT for pediatric uncomplicated malaria; weight-based dosing (5-14 kg: 1 tablet; 15-24 kg: 2 tablets; 25-34 kg: 3 tablets; >=35 kg: 4 tablets per dose)')
ON CONFLICT ON CONSTRAINT disease_drug_relationships_disease_id_drug_monograph_id_rel_key DO NOTHING;
-- Item 2: KDI entries for well-populated drugs missing links
-- Using sequential UUIDs a0000000-0000-0000-0000-00000000000A through 00F

-- 1. Metronidazole (0b989608-489e-4322-b4c4-d5cf89ecdbbb)
INSERT INTO kenya_drug_index (id, drug_name, generic_name, classification, formulary_status, notes, brand_names, atc_code, strengths, dosage_forms, routes, pregnancy_category, lactation_info, controlled_status, storage_recommendations, availability_status, synonyms, abbreviations)
VALUES (
  'a0000000-0000-0000-0000-00000000000A',
  'Metronidazole',
  'Metronidazole',
  'Nitroimidazole antibiotic / antiprotozoal',
  'KEML core list',
  'First-line for anaerobic infections, trichomoniasis, bacterial vaginosis, amoebiasis, giardiasis, and mild-moderate CDAD',
  ARRAY['Flagyl', 'Metrogyl', 'Rozex', 'Metrocream'],
  'P01AB01',
  ARRAY['200 mg', '400 mg', '500 mg (tablet)', '500 mg/100 mL (IV infusion)'],
  ARRAY['tablet', 'oral suspension', 'IV infusion', 'vaginal gel', 'topical gel', 'topical cream'],
  ARRAY['oral', 'intravenous', 'topical', 'vaginal'],
  'Avoid first trimester for trichomoniasis; later-trimester use acceptable when indicated; cross-placental transfer documented',
  'Present in milk at near-maternal levels; pump-and-discard during therapy + 48 hours post-last-dose, or weigh risks',
  'Not controlled',
  'Store below 25°C. Protect from light. Keep tablets in original container.',
  'Widely available',
  ARRAY['Metronidazole hydrochloride'],
  ARRAY['MTZ', 'MNZ']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Azithromycin (c2bad801-6b2d-43dd-a27e-8b495846d405)
INSERT INTO kenya_drug_index (id, drug_name, generic_name, classification, formulary_status, notes, brand_names, atc_code, strengths, dosage_forms, routes, pregnancy_category, lactation_info, controlled_status, storage_recommendations, availability_status, synonyms, abbreviations)
VALUES (
  'a0000000-0000-0000-0000-00000000000B',
  'Azithromycin',
  'Azithromycin (as dehydrate)',
  'Macrolide antibiotic',
  'KEML core list',
  'Broad-spectrum macrolide with long tissue half-life enabling short-course therapy; key in STIs, CAP, and MAC prophylaxis',
  ARRAY['Zithromax', 'Azithrocin', 'Sumamed', 'Zmax'],
  'J01FA10',
  ARRAY['250 mg (capsule/tablet)', '500 mg (tablet)', '200 mg/5 mL (oral suspension)', '1 g (sachet or powder for oral suspension)'],
  ARRAY['tablet', 'capsule', 'oral suspension', 'IV infusion (as powder for injection)'],
  ARRAY['oral', 'intravenous'],
  'Decades of human data show no increased risk; considered safe in pregnancy when indicated',
  'Present in human milk; non-serious effects (diarrhoea, rash) reported; monitor infant',
  'Not controlled',
  'Store below 30°C. Reconstituted suspension stable for 5 days at room temperature or 10 days refrigerated.',
  'Widely available',
  ARRAY['Azithromycin dihydrate'],
  ARRAY['AZM', 'AZT']
)
ON CONFLICT (id) DO NOTHING;

-- 3. Ciprofloxacin (788d2f7d-93db-4db1-ab2e-dfadee158352)
INSERT INTO kenya_drug_index (id, drug_name, generic_name, classification, formulary_status, notes, brand_names, atc_code, strengths, dosage_forms, routes, pregnancy_category, lactation_info, controlled_status, storage_recommendations, availability_status, synonyms, abbreviations)
VALUES (
  'a0000000-0000-0000-0000-00000000000C',
  'Ciprofloxacin',
  'Ciprofloxacin (hydrochloride)',
  'Fluoroquinolone antibiotic',
  'KEML core list',
  'Broad-spectrum fluoroquinolone; key in typhoid, complicated UTIs, infectious diarrhoea, and anthrax prophylaxis',
  ARRAY['Ciproxin', 'Cipro', 'Ciflox', 'Ciprobay'],
  'J01MA02',
  ARRAY['250 mg (tablet)', '500 mg (tablet)', '750 mg (tablet)', '200 mg/100 mL (IV infusion)', '400 mg/200 mL (IV infusion)', '3 mg/mL (ear drops)', '0.3% (eye drops)'],
  ARRAY['tablet', 'oral suspension', 'IV infusion', 'eye drops', 'ear drops', 'ointment'],
  ARRAY['oral', 'intravenous', 'ophthalmic', 'otic'],
  'Published data over decades no increased birth defects; arthropathy risk from juvenile animal data not confirmed in human pregnancy; use where clearly needed',
  'Present in human milk; potential arthropathy risk in infants theoretical; caution advised, or use alternative if available',
  'Not controlled',
  'Store below 25°C. Protect from light. Avoid prolonged refrigeration of IV solution.',
  'Widely available',
  ARRAY['Ciprofloxacin hydrochloride'],
  ARRAY['CIP', 'CPFX']
)
ON CONFLICT (id) DO NOTHING;

-- 4. Doxycycline (1fd7196e-bd14-462f-93d1-565ed6e1abfe)
INSERT INTO kenya_drug_index (id, drug_name, generic_name, classification, formulary_status, notes, brand_names, atc_code, strengths, dosage_forms, routes, pregnancy_category, lactation_info, controlled_status, storage_recommendations, availability_status, synonyms, abbreviations)
VALUES (
  'a0000000-0000-0000-0000-00000000000D',
  'Doxycycline',
  'Doxycycline (hyclate / monohydrate)',
  'Tetracycline antibiotic',
  'KEML core list',
  'Broad-spectrum tetracycline used in respiratory infections, acne, rickettsial infections, malaria prophylaxis, and cholera',
  ARRAY['Doxylin', 'Vibramycin', 'Doxitab', 'Monodox'],
  'J01AA02',
  ARRAY['100 mg (tablet/capsule)', '200 mg (tablet prolonged-release)', '100 mg/5 mL (oral suspension)'],
  ARRAY['tablet', 'capsule', 'prolonged-release tablet', 'oral suspension', 'IV infusion (as powder for injection)'],
  ARRAY['oral', 'intravenous'],
  'Crosses placenta; concentrates in fetal bone/teeth; avoid in pregnancy (prefer alternatives) unless no safer option',
  'Tetracyclines excreted milk; doxycycline binds milk calcium more than others, reducing absorption; caution, use alternative if available',
  'Not controlled',
  'Store below 25°C. Protect from light and moisture.',
  'Widely available',
  ARRAY['Doxycycline hyclate', 'Doxycycline monohydrate'],
  ARRAY['DOX', 'DOXY']
)
ON CONFLICT (id) DO NOTHING;

-- 5. Cephalexin (8adb3d7f-141f-48e0-936b-2641088ca58b)
INSERT INTO kenya_drug_index (id, drug_name, generic_name, classification, formulary_status, notes, brand_names, atc_code, strengths, dosage_forms, routes, pregnancy_category, lactation_info, controlled_status, storage_recommendations, availability_status, synonyms, abbreviations)
VALUES (
  'a0000000-0000-0000-0000-00000000000E',
  'Cephalexin',
  'Cephalexin (monohydrate)',
  'First-generation cephalosporin',
  'KEML core list',
  'Oral first-generation cephalosporin for uncomplicated UTIs, skin/soft tissue infections, streptococcal pharyngitis, and bone infections',
  ARRAY['Keflex', 'Ceporex', 'Cephalex', 'Larixin'],
  'J01DB01',
  ARRAY['250 mg (tablet/capsule)', '500 mg (tablet/capsule)', '125 mg/5 mL (oral suspension)', '250 mg/5 mL (oral suspension)'],
  ARRAY['capsule', 'tablet', 'oral suspension', 'prolonged-release tablet'],
  ARRAY['oral'],
  'Decades of data no increased birth defects; widely used safely where indicated',
  'Present in human milk at low levels (RID <1%); considered compatible with breastfeeding',
  'Not controlled',
  'Store below 25°C. Reconstituted suspension store in refrigerator; use within 14 days.',
  'Widely available',
  ARRAY['Cephalexin monohydrate'],
  ARRAY['CEX', 'CPH']
)
ON CONFLICT (id) DO NOTHING;

-- 6. Insulin (Biphasic Isophane) (d2f84d78-91b9-48c6-8f12-7e11e26ee9e0)
INSERT INTO kenya_drug_index (id, drug_name, generic_name, classification, formulary_status, notes, brand_names, atc_code, strengths, dosage_forms, routes, pregnancy_category, lactation_info, controlled_status, storage_recommendations, availability_status, synonyms, abbreviations)
VALUES (
  'a0000000-0000-0000-0000-00000000000F',
  'Insulin (Biphasic Isophane)',
  'Human insulin (biphasic isophane)',
  'Intermediate-acting insulin (pre-mixed formulation)',
  'KEML core list',
  'Fixed-ratio pre-mixed insulin (typically 30% soluble / 70% isophane) for twice-daily dosing in type 1 and type 2 diabetes',
  ARRAY['Mixtard 30/70', 'Humulin 30/70', 'NovoMix 30', 'Insuman Comb 30'],
  'A10AD01',
  ARRAY['100 IU/mL (10 mL vial)', '100 IU/mL (3 mL cartridge)', '100 IU/mL (3 mL pre-filled pen)'],
  ARRAY['injection (vial)', 'injection (cartridge)', 'injection (pre-filled pen)'],
  ARRAY['subcutaneous', 'intravenous (only soluble component in emergency; not routine)'],
  'Insulin is the gold standard pregnancy treatment for diabetes; biphasic formulations used where basal-bolus not feasible',
  'Exogenous human insulin transfers into milk but is digested by infant gut, no adverse effects expected; compatible',
  'Not controlled',
  'Refrigerate 2-8°C unopened; in-use pen/vial stable at room temperature (up to 30°C) for up to 28 days; protect from light and freezing',
  'Widely available',
  ARRAY['Pre-mixed insulin', 'Biphasic human insulin'],
  ARRAY['BHI', 'PMI']
)
ON CONFLICT (id) DO NOTHING;

-- Link KDI IDs to drug_monographs
UPDATE drug_monographs SET kenya_drug_index_id = 'a0000000-0000-0000-0000-00000000000A' WHERE id = '0b989608-489e-4322-b4c4-d5cf89ecdbbb';
UPDATE drug_monographs SET kenya_drug_index_id = 'a0000000-0000-0000-0000-00000000000B' WHERE id = 'c2bad801-6b2d-43dd-a27e-8b495846d405';
UPDATE drug_monographs SET kenya_drug_index_id = 'a0000000-0000-0000-0000-00000000000C' WHERE id = '788d2f7d-93db-4db1-ab2e-dfadee158352';
UPDATE drug_monographs SET kenya_drug_index_id = 'a0000000-0000-0000-0000-00000000000D' WHERE id = '1fd7196e-bd14-462f-93d1-565ed6e1abfe';
UPDATE drug_monographs SET kenya_drug_index_id = 'a0000000-0000-0000-0000-00000000000E' WHERE id = '8adb3d7f-141f-48e0-936b-2641088ca58b';
UPDATE drug_monographs SET kenya_drug_index_id = 'a0000000-0000-0000-0000-00000000000F' WHERE id = 'd2f84d78-91b9-48c6-8f12-7e11e26ee9e0';
-- Item 4: Metronidazole disease links
-- Drug ID: 0b989608-489e-4322-b4c4-d5cf89ecdbbb
-- Metronidazole (Nitroimidazole antibiotic / antiprotozoal)

INSERT INTO disease_drug_relationships (disease_id, drug_monograph_id, relationship_type, notes) VALUES
  ('trichomoniasis', '0b989608-489e-4322-b4c4-d5cf89ecdbbb', 'first_line',
   'First-line treatment for Trichomonas vaginalis infection; options include 2 g PO single dose or 250-500 mg PO three times daily for 7 days. Partner must be treated simultaneously to prevent reinfection.'),
  ('bacterial_vaginosis', '0b989608-489e-4322-b4c4-d5cf89ecdbbb', 'first_line',
   'First-line per Kenya STG and CDC guidelines; options include 400-500 mg PO twice daily for 7 days or 2 g single dose (single dose less effective — 7-day regimen preferred).'),
  ('amoebiasis', '0b989608-489e-4322-b4c4-d5cf89ecdbbb', 'first_line',
   'First-line for intestinal amoebiasis and amoebic liver abscess; 400-500 mg PO three times daily for 7-10 days (intestinal) or 10-14 days (hepatic). Followed by a luminal amoebicide (paromomycin or diloxanide furoate) to clear cysts.'),
  ('giardiasis', '0b989608-489e-4322-b4c4-d5cf89ecdbbb', 'first_line',
   'First-line treatment for Giardia lamblia infection; 400-500 mg PO three times daily for 5-7 days. Alternative first-line; tinidazole (single dose) is an alternative with similar efficacy.'),
  ('c_difficile_infection', '0b989608-489e-4322-b4c4-d5cf89ecdbbb', 'first_line',
   'First-line for mild-to-moderate Clostridioides difficile infection per Kenya STG; 400-500 mg PO three times daily for 10-14 days. Vancomycin PO is first-line for severe or recurrent CDAD per international guidelines.')
ON CONFLICT ON CONSTRAINT disease_drug_relationships_disease_id_drug_monograph_id_rel_key DO NOTHING;
