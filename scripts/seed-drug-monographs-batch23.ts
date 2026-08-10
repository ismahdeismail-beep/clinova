/**
 * seed-drug-monographs-batch23.ts
 * Auto-generated batch of drug monograph seed data
 * Generated from canonical drug registry
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
  {
    name: "Thiamine",
    generic_name: "Thiamine",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis — iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
],
    side_effects: [ "Gastrointestinal: nausea, constipation (iron preparations), diarrhoea (magnesium)", "Flushing / pruritus (niacin)", "Soft tissue calcification (excessive vitamin D / calcium)", "Iron overload (hereditary haemochromatosis or excessive supplementation)", "Injection site reactions (parenteral administration)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Tetracyclines / fluoroquinolones — absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2–4 hours", "Thyroxine — absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin — vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs — reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
  },
  {
    name: "Vitamin K",
    generic_name: "Vitamin K",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis — iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
],
    side_effects: [ "Gastrointestinal: nausea, constipation (iron preparations), diarrhoea (magnesium)", "Flushing / pruritus (niacin)", "Soft tissue calcification (excessive vitamin D / calcium)", "Iron overload (hereditary haemochromatosis or excessive supplementation)", "Injection site reactions (parenteral administration)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Tetracyclines / fluoroquinolones — absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2–4 hours", "Thyroxine — absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin — vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs — reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
  },
  {
    name: "Zinc Sulfate",
    generic_name: "Zinc Sulfate",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis — iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
],
    side_effects: [ "Gastrointestinal: nausea, constipation (iron preparations), diarrhoea (magnesium)", "Flushing / pruritus (niacin)", "Soft tissue calcification (excessive vitamin D / calcium)", "Iron overload (hereditary haemochromatosis or excessive supplementation)", "Injection site reactions (parenteral administration)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Tetracyclines / fluoroquinolones — absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2–4 hours", "Thyroxine — absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin — vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs — reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
  },
  {
    name: "Abiraterone",
    generic_name: "Abiraterone",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Anastrozole",
    generic_name: "Anastrozole",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Asparaginase",
    generic_name: "Asparaginase",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Bicalutamide",
    generic_name: "Bicalutamide",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Bleomycin",
    generic_name: "Bleomycin",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Capecitabine",
    generic_name: "Capecitabine",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Carboplatin",
    generic_name: "Carboplatin",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Cisplatin",
    generic_name: "Cisplatin",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Cyclophosphamide",
    generic_name: "Cyclophosphamide",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Docetaxel",
    generic_name: "Docetaxel",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Doxorubicin",
    generic_name: "Doxorubicin",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Filgrastim",
    generic_name: "Filgrastim",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Fluorouracil",
    generic_name: "Fluorouracil",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Gemcitabine",
    generic_name: "Gemcitabine",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Goserelin",
    generic_name: "Goserelin",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Hydroxyurea",
    generic_name: "Hydroxyurea",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Letrozole",
    generic_name: "Letrozole",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Leucovorin",
    generic_name: "Leucovorin",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Mesna",
    generic_name: "Mesna",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Methotrexate",
    generic_name: "Methotrexate",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Oxaliplatin",
    generic_name: "Oxaliplatin",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Paclitaxel",
    generic_name: "Paclitaxel",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Pegfilgrastim",
    generic_name: "Pegfilgrastim",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Pemetrexed",
    generic_name: "Pemetrexed",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Pertuzumab",
    generic_name: "Pertuzumab",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Trastuzumab",
    generic_name: "Trastuzumab",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Vinblastine",
    generic_name: "Vinblastine",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Vincristine",
    generic_name: "Vincristine",
    drug_class: "Antineoplastic / chemotherapeutic agent",
    indications: [ "Adjuvant and neoadjuvant therapy for solid tumours", "Palliative chemotherapy for advanced/metastatic disease", "Haematological malignancies (leukaemia, lymphoma, myeloma)", "Targeted therapy for specific molecular subtypes"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe myelosuppression (unless planned treatment of leukaemia with supportive care)", "Severe hepatic or renal impairment (dose adjustment or contraindication depending on drug)", "Pregnancy (teratogenic) — effective contraception required", "Live vaccines during and up to 6 months after chemotherapy"
],
    side_effects: [ "Myelosuppression: neutropenia (infection risk), anaemia (fatigue), thrombocytopenia (bleeding risk) — nadir typically 7–14 days post-treatment", "Nausea and vomiting (acute, delayed, anticipatory) — prophylactic antiemetics essential", "Alopecia (variable depending on agent) — usually reversible", "Mucositis / stomatitis — oral care protocol", "Cardiotoxicity (anthracyclines, trastuzumab) — baseline and serial echo"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 inducers/inhibitors — may alter chemo efficacy/toxicity", "Nephrotoxic drugs (aminoglycosides, NSAIDs, contrast) — additive nephrotoxicity with platinum agents", "Cardiotoxic drugs (anthracyclines + trastuzumab) — cumulative cardiotoxicity", "Anticoagulants — thrombocytopenia increases bleeding risk"
],
    monitoring: "Full blood count with differential at baseline and before each cycle. Renal function, liver function, electrolytes. Cardiac function (echo/MUGA) for cardiotoxic agents. Tumour markers and imaging for response assessment. Nutritional status. Performance status (ECOG/KPS). Adverse events graded per CTCAE criteria.",
    patient_counselling: "Use effective contraception during and for 6 months after treatment (both men and women). Report fever >38°C immediately (neutropenic sepsis — life-threatening emergency). Maintain oral hygiene. Avoid crowds and sick contacts during nadir. Eat small frequent meals. You will need regular blood tests before each cycle.",
  },
  {
    name: "Acetazolamide",
    generic_name: "Acetazolamide",
    drug_class: "Ophthalmic agent",
    indications: [ "Treatment of glaucoma (reduction of intraocular pressure)", "Management of ocular infections (conjunctivitis, keratitis, endophthalmitis)", "Control of ocular inflammation (uveitis, post-operative inflammation)", "Diagnostic mydriasis / cycloplegia for eye examination"
],
    contraindications: [ "Hypersensitivity to active substance or preservatives", "Narrow-angle glaucoma (mydriatics/cycloplegics — risk of acute angle closure)", "Severe asthma / COPD (topical beta-blockers)", "Sinus bradycardia / heart block (topical beta-blockers)"
],
    side_effects: [ "Local irritation: burning, stinging, blurred vision upon instillation (transient)", "Systemic absorption effects (beta-blockers: bradycardia, bronchospasm; anticholinergics: dry mouth, tachycardia)", "Allergic conjunctivitis / contact dermatitis (preservatives especially benzalkonium chloride)", "Increased intraocular pressure (certain agents in susceptible individuals)", "Periorbital skin changes / discolouration (prostaglandin analogues)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Beta-blockers (oral) — additive systemic beta-blockade with topical beta-blockers; monitor pulse/BP", "Calcium channel blockers / digoxin — additive cardiac effects with topical beta-blockers", "Adrenaline (topical) — mydriasis with anticholinergics", "Multiple eye drops — separate by at least 5 minutes to prevent washout"
],
    monitoring: "Monitor intraocular pressure (tonometry), visual acuity, visual fields, optic disc assessment. For inflammatory conditions: anterior chamber activity (cells, flare). Corneal examination (slit lamp). Systemic effects: pulse, BP (especially with beta-blockers), lung auscultation in asthmatics.",
    patient_counselling: "Remove contact lenses before instilling drops (wait 15 minutes before reinserting). Apply pressure to the inner corner of the eye (nasolacrimal occlusion) for 1 minute after drops to reduce systemic absorption. Do not touch the dropper tip to your eye or any surface. Separate different eye drops by 5 minutes. Discard any solution that changes colour or becomes cloudy.",
  },
  {
    name: "Allopurinol",
    generic_name: "Allopurinol",
    drug_class: "Therapeutic agent",
    indications: [ "Management of specific conditions as per approved indications", "Symptom control and improvement of quality of life", "Prevention of disease progression or complications", "Treatment of refractory cases where first-line options have failed"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient", "Severe hepatic impairment (hepatically metabolized drugs)", "Severe renal impairment (renally excreted drugs)", "Pregnancy and lactation (where applicable)"
],
    side_effects: [ "Gastrointestinal disturbances (nausea, diarrhoea, constipation)", "Headache, dizziness, fatigue", "Allergic / hypersensitivity reactions (rash, urticaria; rarely anaphylaxis)", "Hepatic enzyme elevations (monitor LFTs during therapy)", "Effect on renal function (monitor U&E at baseline and during therapy)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 interactions: potential for altered metabolism with CYP inducers/inhibitors", "Anticoagulants — may affect INR or bleeding risk", "Antihypertensives — additive hypotensive effects", "Alcohol — avoid or limit during therapy"
],
    monitoring: "Monitor clinical response to therapy, renal function, liver function, full blood count as appropriate. Monitor for adverse effects based on specific drug profile. Therapeutic drug monitoring where applicable. Regular follow-up assessments to evaluate treatment efficacy and tolerability.",
    patient_counselling: "Take medication exactly as prescribed. Do not stop or adjust dose without consulting your doctor. Report any unusual symptoms, persistent side effects, or lack of therapeutic response. Keep all follow-up appointments for monitoring. Maintain a list of all medications you take.",
  },
  {
    name: "Darbepoetin Alfa",
    generic_name: "Darbepoetin Alfa",
    drug_class: "Therapeutic agent",
    indications: [ "Management of specific conditions as per approved indications", "Symptom control and improvement of quality of life", "Prevention of disease progression or complications", "Treatment of refractory cases where first-line options have failed"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient", "Severe hepatic impairment (hepatically metabolized drugs)", "Severe renal impairment (renally excreted drugs)", "Pregnancy and lactation (where applicable)"
],
    side_effects: [ "Gastrointestinal disturbances (nausea, diarrhoea, constipation)", "Headache, dizziness, fatigue", "Allergic / hypersensitivity reactions (rash, urticaria; rarely anaphylaxis)", "Hepatic enzyme elevations (monitor LFTs during therapy)", "Effect on renal function (monitor U&E at baseline and during therapy)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 interactions: potential for altered metabolism with CYP inducers/inhibitors", "Anticoagulants — may affect INR or bleeding risk", "Antihypertensives — additive hypotensive effects", "Alcohol — avoid or limit during therapy"
],
    monitoring: "Monitor clinical response to therapy, renal function, liver function, full blood count as appropriate. Monitor for adverse effects based on specific drug profile. Therapeutic drug monitoring where applicable. Regular follow-up assessments to evaluate treatment efficacy and tolerability.",
    patient_counselling: "Take medication exactly as prescribed. Do not stop or adjust dose without consulting your doctor. Report any unusual symptoms, persistent side effects, or lack of therapeutic response. Keep all follow-up appointments for monitoring. Maintain a list of all medications you take.",
  },
  {
    name: "Epoetin Alfa",
    generic_name: "Epoetin Alfa",
    drug_class: "Therapeutic agent",
    indications: [ "Management of specific conditions as per approved indications", "Symptom control and improvement of quality of life", "Prevention of disease progression or complications", "Treatment of refractory cases where first-line options have failed"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient", "Severe hepatic impairment (hepatically metabolized drugs)", "Severe renal impairment (renally excreted drugs)", "Pregnancy and lactation (where applicable)"
],
    side_effects: [ "Gastrointestinal disturbances (nausea, diarrhoea, constipation)", "Headache, dizziness, fatigue", "Allergic / hypersensitivity reactions (rash, urticaria; rarely anaphylaxis)", "Hepatic enzyme elevations (monitor LFTs during therapy)", "Effect on renal function (monitor U&E at baseline and during therapy)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 interactions: potential for altered metabolism with CYP inducers/inhibitors", "Anticoagulants — may affect INR or bleeding risk", "Antihypertensives — additive hypotensive effects", "Alcohol — avoid or limit during therapy"
],
    monitoring: "Monitor clinical response to therapy, renal function, liver function, full blood count as appropriate. Monitor for adverse effects based on specific drug profile. Therapeutic drug monitoring where applicable. Regular follow-up assessments to evaluate treatment efficacy and tolerability.",
    patient_counselling: "Take medication exactly as prescribed. Do not stop or adjust dose without consulting your doctor. Report any unusual symptoms, persistent side effects, or lack of therapeutic response. Keep all follow-up appointments for monitoring. Maintain a list of all medications you take.",
  },
  {
    name: "Finasteride",
    generic_name: "Finasteride",
    drug_class: "Therapeutic agent",
    indications: [ "Management of specific conditions as per approved indications", "Symptom control and improvement of quality of life", "Prevention of disease progression or complications", "Treatment of refractory cases where first-line options have failed"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient", "Severe hepatic impairment (hepatically metabolized drugs)", "Severe renal impairment (renally excreted drugs)", "Pregnancy and lactation (where applicable)"
],
    side_effects: [ "Gastrointestinal disturbances (nausea, diarrhoea, constipation)", "Headache, dizziness, fatigue", "Allergic / hypersensitivity reactions (rash, urticaria; rarely anaphylaxis)", "Hepatic enzyme elevations (monitor LFTs during therapy)", "Effect on renal function (monitor U&E at baseline and during therapy)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 interactions: potential for altered metabolism with CYP inducers/inhibitors", "Anticoagulants — may affect INR or bleeding risk", "Antihypertensives — additive hypotensive effects", "Alcohol — avoid or limit during therapy"
],
    monitoring: "Monitor clinical response to therapy, renal function, liver function, full blood count as appropriate. Monitor for adverse effects based on specific drug profile. Therapeutic drug monitoring where applicable. Regular follow-up assessments to evaluate treatment efficacy and tolerability.",
    patient_counselling: "Take medication exactly as prescribed. Do not stop or adjust dose without consulting your doctor. Report any unusual symptoms, persistent side effects, or lack of therapeutic response. Keep all follow-up appointments for monitoring. Maintain a list of all medications you take.",
  },
  {
    name: "Mirabegron",
    generic_name: "Mirabegron",
    drug_class: "Therapeutic agent",
    indications: [ "Management of specific conditions as per approved indications", "Symptom control and improvement of quality of life", "Prevention of disease progression or complications", "Treatment of refractory cases where first-line options have failed"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient", "Severe hepatic impairment (hepatically metabolized drugs)", "Severe renal impairment (renally excreted drugs)", "Pregnancy and lactation (where applicable)"
],
    side_effects: [ "Gastrointestinal disturbances (nausea, diarrhoea, constipation)", "Headache, dizziness, fatigue", "Allergic / hypersensitivity reactions (rash, urticaria; rarely anaphylaxis)", "Hepatic enzyme elevations (monitor LFTs during therapy)", "Effect on renal function (monitor U&E at baseline and during therapy)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 interactions: potential for altered metabolism with CYP inducers/inhibitors", "Anticoagulants — may affect INR or bleeding risk", "Antihypertensives — additive hypotensive effects", "Alcohol — avoid or limit during therapy"
],
    monitoring: "Monitor clinical response to therapy, renal function, liver function, full blood count as appropriate. Monitor for adverse effects based on specific drug profile. Therapeutic drug monitoring where applicable. Regular follow-up assessments to evaluate treatment efficacy and tolerability.",
    patient_counselling: "Take medication exactly as prescribed. Do not stop or adjust dose without consulting your doctor. Report any unusual symptoms, persistent side effects, or lack of therapeutic response. Keep all follow-up appointments for monitoring. Maintain a list of all medications you take.",
  },
  {
    name: "Oxybutynin",
    generic_name: "Oxybutynin",
    drug_class: "Therapeutic agent",
    indications: [ "Management of specific conditions as per approved indications", "Symptom control and improvement of quality of life", "Prevention of disease progression or complications", "Treatment of refractory cases where first-line options have failed"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient", "Severe hepatic impairment (hepatically metabolized drugs)", "Severe renal impairment (renally excreted drugs)", "Pregnancy and lactation (where applicable)"
],
    side_effects: [ "Gastrointestinal disturbances (nausea, diarrhoea, constipation)", "Headache, dizziness, fatigue", "Allergic / hypersensitivity reactions (rash, urticaria; rarely anaphylaxis)", "Hepatic enzyme elevations (monitor LFTs during therapy)", "Effect on renal function (monitor U&E at baseline and during therapy)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 interactions: potential for altered metabolism with CYP inducers/inhibitors", "Anticoagulants — may affect INR or bleeding risk", "Antihypertensives — additive hypotensive effects", "Alcohol — avoid or limit during therapy"
],
    monitoring: "Monitor clinical response to therapy, renal function, liver function, full blood count as appropriate. Monitor for adverse effects based on specific drug profile. Therapeutic drug monitoring where applicable. Regular follow-up assessments to evaluate treatment efficacy and tolerability.",
    patient_counselling: "Take medication exactly as prescribed. Do not stop or adjust dose without consulting your doctor. Report any unusual symptoms, persistent side effects, or lack of therapeutic response. Keep all follow-up appointments for monitoring. Maintain a list of all medications you take.",
  },
  {
    name: "Rasburicase",
    generic_name: "Rasburicase",
    drug_class: "Therapeutic agent",
    indications: [ "Management of specific conditions as per approved indications", "Symptom control and improvement of quality of life", "Prevention of disease progression or complications", "Treatment of refractory cases where first-line options have failed"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient", "Severe hepatic impairment (hepatically metabolized drugs)", "Severe renal impairment (renally excreted drugs)", "Pregnancy and lactation (where applicable)"
],
    side_effects: [ "Gastrointestinal disturbances (nausea, diarrhoea, constipation)", "Headache, dizziness, fatigue", "Allergic / hypersensitivity reactions (rash, urticaria; rarely anaphylaxis)", "Hepatic enzyme elevations (monitor LFTs during therapy)", "Effect on renal function (monitor U&E at baseline and during therapy)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 interactions: potential for altered metabolism with CYP inducers/inhibitors", "Anticoagulants — may affect INR or bleeding risk", "Antihypertensives — additive hypotensive effects", "Alcohol — avoid or limit during therapy"
],
    monitoring: "Monitor clinical response to therapy, renal function, liver function, full blood count as appropriate. Monitor for adverse effects based on specific drug profile. Therapeutic drug monitoring where applicable. Regular follow-up assessments to evaluate treatment efficacy and tolerability.",
    patient_counselling: "Take medication exactly as prescribed. Do not stop or adjust dose without consulting your doctor. Report any unusual symptoms, persistent side effects, or lack of therapeutic response. Keep all follow-up appointments for monitoring. Maintain a list of all medications you take.",
  },
  {
    name: "Sacubitril/valsartan",
    generic_name: "Sacubitril/valsartan",
    drug_class: "Therapeutic agent",
    indications: [ "Management of specific conditions as per approved indications", "Symptom control and improvement of quality of life", "Prevention of disease progression or complications", "Treatment of refractory cases where first-line options have failed"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient", "Severe hepatic impairment (hepatically metabolized drugs)", "Severe renal impairment (renally excreted drugs)", "Pregnancy and lactation (where applicable)"
],
    side_effects: [ "Gastrointestinal disturbances (nausea, diarrhoea, constipation)", "Headache, dizziness, fatigue", "Allergic / hypersensitivity reactions (rash, urticaria; rarely anaphylaxis)", "Hepatic enzyme elevations (monitor LFTs during therapy)", "Effect on renal function (monitor U&E at baseline and during therapy)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "CYP450 interactions: potential for altered metabolism with CYP inducers/inhibitors", "Anticoagulants — may affect INR or bleeding risk", "Antihypertensives — additive hypotensive effects", "Alcohol — avoid or limit during therapy"
],
    monitoring: "Monitor clinical response to therapy, renal function, liver function, full blood count as appropriate. Monitor for adverse effects based on specific drug profile. Therapeutic drug monitoring where applicable. Regular follow-up assessments to evaluate treatment efficacy and tolerability.",
    patient_counselling: "Take medication exactly as prescribed. Do not stop or adjust dose without consulting your doctor. Report any unusual symptoms, persistent side effects, or lack of therapeutic response. Keep all follow-up appointments for monitoring. Maintain a list of all medications you take.",
  },
];

async function upsertMonograph(m: DrugMonograph): Promise<boolean> {
  const { error } = await supabase.from('drug_monographs').upsert(
    { ...m, id: undefined },
    { onConflict: 'name', ignoreDuplicates: false }
  );
  if (error) {
    console.error(`Failed to upsert ${m.name}: ${error.message}`);
    return false;
  }
  console.log(`Upserted: ${m.name}`);
  return true;
}

async function main() {
  let success = 0, failed = 0;
  for (const m of MONOGRAPHS) {
    const ok = await upsertMonograph(m);
    if (ok) success++; else failed++;
  }
  console.log(`\nBatch 23 complete: ${success} inserted, ${failed} failed`);
}

main().catch(console.error);