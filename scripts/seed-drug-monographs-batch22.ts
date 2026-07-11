/**
 * seed-drug-monographs-batch22.ts
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
    name: "Calcitonin",
    generic_name: "Calcitonin",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Calcitriol",
    generic_name: "Calcitriol",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Carbimazole",
    generic_name: "Carbimazole",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Denosumab",
    generic_name: "Denosumab",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Desmopressin",
    generic_name: "Desmopressin",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Dexamethasone",
    generic_name: "Dexamethasone",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Insulin",
    generic_name: "Insulin",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Lanreotide",
    generic_name: "Lanreotide",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Methimazole",
    generic_name: "Methimazole",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Methylprednisolone",
    generic_name: "Methylprednisolone",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Octreotide",
    generic_name: "Octreotide",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Propylthiouracil",
    generic_name: "Propylthiouracil",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Teriparatide",
    generic_name: "Teriparatide",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Thyroxine",
    generic_name: "Thyroxine",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Triamcinolone",
    generic_name: "Triamcinolone",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Zoledronic Acid",
    generic_name: "Zoledronic Acid",
    drug_class: "Endocrine / metabolic agent",
    indications: [ "Management of diabetes mellitus (type 1 and type 2)", "Thyroid disorders (hypothyroidism, hyperthyroidism)", "Bone metabolism disorders (osteoporosis, Paget's disease)", "Adrenal insufficiency / corticosteroid replacement therapy"
],
    contraindications: [ "Hypersensitivity to active substance", "Diabetic ketoacidosis (metformin, SGLT2i)", "Severe renal impairment (certain antidiabetic agents; metformin: eGFR <30)", "Osteonecrosis of the jaw / recent dental extraction (bisphosphonates)", "Uncontrolled severe infection / surgery (SGLT2i â€” temporarily discontinue)"
],
    side_effects: [ "Hypoglycaemia (antidiabetic agents) â€” educate on recognition and management", "Weight changes (weight gain with insulin, sulfonylureas; weight loss with metformin, SGLT2i, GLP-1 RA)", "GI intolerance (metformin: diarrhoea, nausea â€” start low and titrate slowly)", "Bone/jaw pain, atypical femoral fractures (bisphosphonates)", "Adrenal suppression (corticosteroids) â€” taper withdrawal, stress dosing"
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
    interactions: [ "Corticosteroids â€” hyperglycaemic effect; may require increased antidiabetic doses", "Beta-blockers â€” mask hypoglycaemia symptoms; educate on alternative symptom recognition", "Diuretics â€” hyperglycaemic effect (thiazides); monitor blood glucose", "Warfarin â€” altered anticoagulation with thyroid medications; frequent INR monitoring"
],
    monitoring: "Monitor blood glucose (HbA1c, fasting/postprandial, self-monitoring), renal function, liver function, bone density (DXA for osteoporosis), thyroid function (TSH, FT4), adrenal function during stress/illness, and weight/BMI.",
    patient_counselling: "Monitor blood glucose regularly. Recognize and treat hypoglycaemia (15g fast-acting glucose then long-acting carbohydrate). Do not skip meals. Carry identification stating your condition and medications. Annual retinal, renal, and foot checks required.",
  },
  {
    name: "Esomeprazole",
    generic_name: "Esomeprazole",
    drug_class: "Gastrointestinal agent",
    indications: [ "Management of acid-related disorders (GERD, peptic ulcer, gastritis)", "Treatment of nausea and vomiting", "Management of diarrhoea or constipation", "Inflammatory bowel disease management (maintenance and acute flares)"
],
    contraindications: [ "Hypersensitivity to active substance", "GI obstruction, perforation, or ileus (prokinetics)", "Concurrent QT-prolonging drugs (certain antiemetics)", "Severe hepatic impairment (hepatically metabolized agents)"
],
    side_effects: [ "Headache, dizziness, gastrointestinal disturbances (common)", "Constipation or diarrhoea depending on agent", "Metabolic effects with prolonged PPI use: hypomagnesaemia, vitamin B12 deficiency, increased fracture risk, C. difficile infection", "Extrapyramidal reactions (metoclopramide, especially in young women and elderly)", "Photosensitivity (certain agents)"
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
    interactions: [ "Antacids / sucralfate â€” reduced absorption of PPIs, H2RAs, and some other GI agents; separate dosing", "Clopidogrel â€” potential reduced efficacy with some PPIs (especially omeprazole, esomeprazole)", "CNS depressants â€” additive sedation with certain antiemetics", "Digoxin, thyroxine â€” reduced absorption with some GI agents; monitor levels"
],
    monitoring: "Monitor symptom response, endoscopy findings where applicable, electrolytes (prolonged PPI use), renal function, liver function. For IBD patients: monitor inflammatory markers, faecal calprotectin, and nutritional status.",
    patient_counselling: "Take PPIs 30â€“60 minutes before breakfast for optimal effect. Avoid trigger foods, alcohol, and smoking. Report black/tarry stools, haematemesis, or severe abdominal pain. Do not use antacids within 2 hours of other medications.",
  },
  {
    name: "Famotidine",
    generic_name: "Famotidine",
    drug_class: "Gastrointestinal agent",
    indications: [ "Management of acid-related disorders (GERD, peptic ulcer, gastritis)", "Treatment of nausea and vomiting", "Management of diarrhoea or constipation", "Inflammatory bowel disease management (maintenance and acute flares)"
],
    contraindications: [ "Hypersensitivity to active substance", "GI obstruction, perforation, or ileus (prokinetics)", "Concurrent QT-prolonging drugs (certain antiemetics)", "Severe hepatic impairment (hepatically metabolized agents)"
],
    side_effects: [ "Headache, dizziness, gastrointestinal disturbances (common)", "Constipation or diarrhoea depending on agent", "Metabolic effects with prolonged PPI use: hypomagnesaemia, vitamin B12 deficiency, increased fracture risk, C. difficile infection", "Extrapyramidal reactions (metoclopramide, especially in young women and elderly)", "Photosensitivity (certain agents)"
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
    interactions: [ "Antacids / sucralfate â€” reduced absorption of PPIs, H2RAs, and some other GI agents; separate dosing", "Clopidogrel â€” potential reduced efficacy with some PPIs (especially omeprazole, esomeprazole)", "CNS depressants â€” additive sedation with certain antiemetics", "Digoxin, thyroxine â€” reduced absorption with some GI agents; monitor levels"
],
    monitoring: "Monitor symptom response, endoscopy findings where applicable, electrolytes (prolonged PPI use), renal function, liver function. For IBD patients: monitor inflammatory markers, faecal calprotectin, and nutritional status.",
    patient_counselling: "Take PPIs 30â€“60 minutes before breakfast for optimal effect. Avoid trigger foods, alcohol, and smoking. Report black/tarry stools, haematemesis, or severe abdominal pain. Do not use antacids within 2 hours of other medications.",
  },
  {
    name: "Loperamide",
    generic_name: "Loperamide",
    drug_class: "Gastrointestinal agent",
    indications: [ "Management of acid-related disorders (GERD, peptic ulcer, gastritis)", "Treatment of nausea and vomiting", "Management of diarrhoea or constipation", "Inflammatory bowel disease management (maintenance and acute flares)"
],
    contraindications: [ "Hypersensitivity to active substance", "GI obstruction, perforation, or ileus (prokinetics)", "Concurrent QT-prolonging drugs (certain antiemetics)", "Severe hepatic impairment (hepatically metabolized agents)"
],
    side_effects: [ "Headache, dizziness, gastrointestinal disturbances (common)", "Constipation or diarrhoea depending on agent", "Metabolic effects with prolonged PPI use: hypomagnesaemia, vitamin B12 deficiency, increased fracture risk, C. difficile infection", "Extrapyramidal reactions (metoclopramide, especially in young women and elderly)", "Photosensitivity (certain agents)"
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
    interactions: [ "Antacids / sucralfate â€” reduced absorption of PPIs, H2RAs, and some other GI agents; separate dosing", "Clopidogrel â€” potential reduced efficacy with some PPIs (especially omeprazole, esomeprazole)", "CNS depressants â€” additive sedation with certain antiemetics", "Digoxin, thyroxine â€” reduced absorption with some GI agents; monitor levels"
],
    monitoring: "Monitor symptom response, endoscopy findings where applicable, electrolytes (prolonged PPI use), renal function, liver function. For IBD patients: monitor inflammatory markers, faecal calprotectin, and nutritional status.",
    patient_counselling: "Take PPIs 30â€“60 minutes before breakfast for optimal effect. Avoid trigger foods, alcohol, and smoking. Report black/tarry stools, haematemesis, or severe abdominal pain. Do not use antacids within 2 hours of other medications.",
  },
  {
    name: "Mesalazine",
    generic_name: "Mesalazine",
    drug_class: "Gastrointestinal agent",
    indications: [ "Management of acid-related disorders (GERD, peptic ulcer, gastritis)", "Treatment of nausea and vomiting", "Management of diarrhoea or constipation", "Inflammatory bowel disease management (maintenance and acute flares)"
],
    contraindications: [ "Hypersensitivity to active substance", "GI obstruction, perforation, or ileus (prokinetics)", "Concurrent QT-prolonging drugs (certain antiemetics)", "Severe hepatic impairment (hepatically metabolized agents)"
],
    side_effects: [ "Headache, dizziness, gastrointestinal disturbances (common)", "Constipation or diarrhoea depending on agent", "Metabolic effects with prolonged PPI use: hypomagnesaemia, vitamin B12 deficiency, increased fracture risk, C. difficile infection", "Extrapyramidal reactions (metoclopramide, especially in young women and elderly)", "Photosensitivity (certain agents)"
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
    interactions: [ "Antacids / sucralfate â€” reduced absorption of PPIs, H2RAs, and some other GI agents; separate dosing", "Clopidogrel â€” potential reduced efficacy with some PPIs (especially omeprazole, esomeprazole)", "CNS depressants â€” additive sedation with certain antiemetics", "Digoxin, thyroxine â€” reduced absorption with some GI agents; monitor levels"
],
    monitoring: "Monitor symptom response, endoscopy findings where applicable, electrolytes (prolonged PPI use), renal function, liver function. For IBD patients: monitor inflammatory markers, faecal calprotectin, and nutritional status.",
    patient_counselling: "Take PPIs 30â€“60 minutes before breakfast for optimal effect. Avoid trigger foods, alcohol, and smoking. Report black/tarry stools, haematemesis, or severe abdominal pain. Do not use antacids within 2 hours of other medications.",
  },
  {
    name: "Metoclopramide",
    generic_name: "Metoclopramide",
    drug_class: "Gastrointestinal agent",
    indications: [ "Management of acid-related disorders (GERD, peptic ulcer, gastritis)", "Treatment of nausea and vomiting", "Management of diarrhoea or constipation", "Inflammatory bowel disease management (maintenance and acute flares)"
],
    contraindications: [ "Hypersensitivity to active substance", "GI obstruction, perforation, or ileus (prokinetics)", "Concurrent QT-prolonging drugs (certain antiemetics)", "Severe hepatic impairment (hepatically metabolized agents)"
],
    side_effects: [ "Headache, dizziness, gastrointestinal disturbances (common)", "Constipation or diarrhoea depending on agent", "Metabolic effects with prolonged PPI use: hypomagnesaemia, vitamin B12 deficiency, increased fracture risk, C. difficile infection", "Extrapyramidal reactions (metoclopramide, especially in young women and elderly)", "Photosensitivity (certain agents)"
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
    interactions: [ "Antacids / sucralfate â€” reduced absorption of PPIs, H2RAs, and some other GI agents; separate dosing", "Clopidogrel â€” potential reduced efficacy with some PPIs (especially omeprazole, esomeprazole)", "CNS depressants â€” additive sedation with certain antiemetics", "Digoxin, thyroxine â€” reduced absorption with some GI agents; monitor levels"
],
    monitoring: "Monitor symptom response, endoscopy findings where applicable, electrolytes (prolonged PPI use), renal function, liver function. For IBD patients: monitor inflammatory markers, faecal calprotectin, and nutritional status.",
    patient_counselling: "Take PPIs 30â€“60 minutes before breakfast for optimal effect. Avoid trigger foods, alcohol, and smoking. Report black/tarry stools, haematemesis, or severe abdominal pain. Do not use antacids within 2 hours of other medications.",
  },
  {
    name: "Pantoprazole",
    generic_name: "Pantoprazole",
    drug_class: "Gastrointestinal agent",
    indications: [ "Management of acid-related disorders (GERD, peptic ulcer, gastritis)", "Treatment of nausea and vomiting", "Management of diarrhoea or constipation", "Inflammatory bowel disease management (maintenance and acute flares)"
],
    contraindications: [ "Hypersensitivity to active substance", "GI obstruction, perforation, or ileus (prokinetics)", "Concurrent QT-prolonging drugs (certain antiemetics)", "Severe hepatic impairment (hepatically metabolized agents)"
],
    side_effects: [ "Headache, dizziness, gastrointestinal disturbances (common)", "Constipation or diarrhoea depending on agent", "Metabolic effects with prolonged PPI use: hypomagnesaemia, vitamin B12 deficiency, increased fracture risk, C. difficile infection", "Extrapyramidal reactions (metoclopramide, especially in young women and elderly)", "Photosensitivity (certain agents)"
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
    interactions: [ "Antacids / sucralfate â€” reduced absorption of PPIs, H2RAs, and some other GI agents; separate dosing", "Clopidogrel â€” potential reduced efficacy with some PPIs (especially omeprazole, esomeprazole)", "CNS depressants â€” additive sedation with certain antiemetics", "Digoxin, thyroxine â€” reduced absorption with some GI agents; monitor levels"
],
    monitoring: "Monitor symptom response, endoscopy findings where applicable, electrolytes (prolonged PPI use), renal function, liver function. For IBD patients: monitor inflammatory markers, faecal calprotectin, and nutritional status.",
    patient_counselling: "Take PPIs 30â€“60 minutes before breakfast for optimal effect. Avoid trigger foods, alcohol, and smoking. Report black/tarry stools, haematemesis, or severe abdominal pain. Do not use antacids within 2 hours of other medications.",
  },
  {
    name: "Ranitidine",
    generic_name: "Ranitidine",
    drug_class: "Gastrointestinal agent",
    indications: [ "Management of acid-related disorders (GERD, peptic ulcer, gastritis)", "Treatment of nausea and vomiting", "Management of diarrhoea or constipation", "Inflammatory bowel disease management (maintenance and acute flares)"
],
    contraindications: [ "Hypersensitivity to active substance", "GI obstruction, perforation, or ileus (prokinetics)", "Concurrent QT-prolonging drugs (certain antiemetics)", "Severe hepatic impairment (hepatically metabolized agents)"
],
    side_effects: [ "Headache, dizziness, gastrointestinal disturbances (common)", "Constipation or diarrhoea depending on agent", "Metabolic effects with prolonged PPI use: hypomagnesaemia, vitamin B12 deficiency, increased fracture risk, C. difficile infection", "Extrapyramidal reactions (metoclopramide, especially in young women and elderly)", "Photosensitivity (certain agents)"
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
    interactions: [ "Antacids / sucralfate â€” reduced absorption of PPIs, H2RAs, and some other GI agents; separate dosing", "Clopidogrel â€” potential reduced efficacy with some PPIs (especially omeprazole, esomeprazole)", "CNS depressants â€” additive sedation with certain antiemetics", "Digoxin, thyroxine â€” reduced absorption with some GI agents; monitor levels"
],
    monitoring: "Monitor symptom response, endoscopy findings where applicable, electrolytes (prolonged PPI use), renal function, liver function. For IBD patients: monitor inflammatory markers, faecal calprotectin, and nutritional status.",
    patient_counselling: "Take PPIs 30â€“60 minutes before breakfast for optimal effect. Avoid trigger foods, alcohol, and smoking. Report black/tarry stools, haematemesis, or severe abdominal pain. Do not use antacids within 2 hours of other medications.",
  },
  {
    name: "Senna",
    generic_name: "Senna",
    drug_class: "Gastrointestinal agent",
    indications: [ "Management of acid-related disorders (GERD, peptic ulcer, gastritis)", "Treatment of nausea and vomiting", "Management of diarrhoea or constipation", "Inflammatory bowel disease management (maintenance and acute flares)"
],
    contraindications: [ "Hypersensitivity to active substance", "GI obstruction, perforation, or ileus (prokinetics)", "Concurrent QT-prolonging drugs (certain antiemetics)", "Severe hepatic impairment (hepatically metabolized agents)"
],
    side_effects: [ "Headache, dizziness, gastrointestinal disturbances (common)", "Constipation or diarrhoea depending on agent", "Metabolic effects with prolonged PPI use: hypomagnesaemia, vitamin B12 deficiency, increased fracture risk, C. difficile infection", "Extrapyramidal reactions (metoclopramide, especially in young women and elderly)", "Photosensitivity (certain agents)"
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
    interactions: [ "Antacids / sucralfate â€” reduced absorption of PPIs, H2RAs, and some other GI agents; separate dosing", "Clopidogrel â€” potential reduced efficacy with some PPIs (especially omeprazole, esomeprazole)", "CNS depressants â€” additive sedation with certain antiemetics", "Digoxin, thyroxine â€” reduced absorption with some GI agents; monitor levels"
],
    monitoring: "Monitor symptom response, endoscopy findings where applicable, electrolytes (prolonged PPI use), renal function, liver function. For IBD patients: monitor inflammatory markers, faecal calprotectin, and nutritional status.",
    patient_counselling: "Take PPIs 30â€“60 minutes before breakfast for optimal effect. Avoid trigger foods, alcohol, and smoking. Report black/tarry stools, haematemesis, or severe abdominal pain. Do not use antacids within 2 hours of other medications.",
  },
  {
    name: "Sulfasalazine",
    generic_name: "Sulfasalazine",
    drug_class: "Gastrointestinal agent",
    indications: [ "Management of acid-related disorders (GERD, peptic ulcer, gastritis)", "Treatment of nausea and vomiting", "Management of diarrhoea or constipation", "Inflammatory bowel disease management (maintenance and acute flares)"
],
    contraindications: [ "Hypersensitivity to active substance", "GI obstruction, perforation, or ileus (prokinetics)", "Concurrent QT-prolonging drugs (certain antiemetics)", "Severe hepatic impairment (hepatically metabolized agents)"
],
    side_effects: [ "Headache, dizziness, gastrointestinal disturbances (common)", "Constipation or diarrhoea depending on agent", "Metabolic effects with prolonged PPI use: hypomagnesaemia, vitamin B12 deficiency, increased fracture risk, C. difficile infection", "Extrapyramidal reactions (metoclopramide, especially in young women and elderly)", "Photosensitivity (certain agents)"
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
    interactions: [ "Antacids / sucralfate â€” reduced absorption of PPIs, H2RAs, and some other GI agents; separate dosing", "Clopidogrel â€” potential reduced efficacy with some PPIs (especially omeprazole, esomeprazole)", "CNS depressants â€” additive sedation with certain antiemetics", "Digoxin, thyroxine â€” reduced absorption with some GI agents; monitor levels"
],
    monitoring: "Monitor symptom response, endoscopy findings where applicable, electrolytes (prolonged PPI use), renal function, liver function. For IBD patients: monitor inflammatory markers, faecal calprotectin, and nutritional status.",
    patient_counselling: "Take PPIs 30â€“60 minutes before breakfast for optimal effect. Avoid trigger foods, alcohol, and smoking. Report black/tarry stools, haematemesis, or severe abdominal pain. Do not use antacids within 2 hours of other medications.",
  },
  {
    name: "Adalimumab",
    generic_name: "Adalimumab",
    drug_class: "Immunomodulatory / biologic agent",
    indications: [ "Autoimmune inflammatory conditions (rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis)", "Inflammatory bowel disease (Crohn's disease, ulcerative colitis)", "Psoriasis and hidradenitis suppurativa", "Organ transplant rejection prophylaxis"
],
    contraindications: [ "Active severe infection (treat infection before starting biologic)", "Untreated latent TB / active TB", "Active hepatitis B infection (prophylaxis or defer treatment)", "Severe heart failure (certain TNF inhibitors)", "Demyelinating disorders (relative contraindication for TNF inhibitors)"
],
    side_effects: [ "Increased infection risk (especially reactivation of TB, hepatitis B, and opportunistic infections)", "Injection site reactions (pain, erythema, swelling)", "Infusion reactions (fever, chills, hypotension â€” during IV administration)", "Hypersensitivity / anaphylaxis (rare)", "Malignancy risk (long-term immunosuppression)"
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
    interactions: [ "Live vaccines â€” contraindicated during treatment and for variable period after (check product monograph)", "Immunosuppressants (methotrexate, azathioprine, ciclosporin) â€” additive immunosuppression", "CYP450 substrates â€” IL-6 inhibitors may alter metabolism of CYP substrates (e.g., warfarin, statins)"
],
    monitoring: "Screen for latent TB (IGRA/PPD), hepatitis B/C, HIV before initiation. FBC, LFT, U&E at baseline and periodically. Monitor for signs of infection at every visit. Assess disease activity scores (DAS28, PASI, HBI). Review vaccination status and update appropriate non-live vaccines before starting.",
    patient_counselling: "Increased risk of infections â€” report any fever, cough, unusual symptoms immediately. Stay up to date with vaccinations (avoid live vaccines while on treatment). Carry a treatment alert card. Do not stop or miss doses without consulting your specialist. Regular blood tests are required for monitoring.",
  },
  {
    name: "Infliximab",
    generic_name: "Infliximab",
    drug_class: "Immunomodulatory / biologic agent",
    indications: [ "Autoimmune inflammatory conditions (rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis)", "Inflammatory bowel disease (Crohn's disease, ulcerative colitis)", "Psoriasis and hidradenitis suppurativa", "Organ transplant rejection prophylaxis"
],
    contraindications: [ "Active severe infection (treat infection before starting biologic)", "Untreated latent TB / active TB", "Active hepatitis B infection (prophylaxis or defer treatment)", "Severe heart failure (certain TNF inhibitors)", "Demyelinating disorders (relative contraindication for TNF inhibitors)"
],
    side_effects: [ "Increased infection risk (especially reactivation of TB, hepatitis B, and opportunistic infections)", "Injection site reactions (pain, erythema, swelling)", "Infusion reactions (fever, chills, hypotension â€” during IV administration)", "Hypersensitivity / anaphylaxis (rare)", "Malignancy risk (long-term immunosuppression)"
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
    interactions: [ "Live vaccines â€” contraindicated during treatment and for variable period after (check product monograph)", "Immunosuppressants (methotrexate, azathioprine, ciclosporin) â€” additive immunosuppression", "CYP450 substrates â€” IL-6 inhibitors may alter metabolism of CYP substrates (e.g., warfarin, statins)"
],
    monitoring: "Screen for latent TB (IGRA/PPD), hepatitis B/C, HIV before initiation. FBC, LFT, U&E at baseline and periodically. Monitor for signs of infection at every visit. Assess disease activity scores (DAS28, PASI, HBI). Review vaccination status and update appropriate non-live vaccines before starting.",
    patient_counselling: "Increased risk of infections â€” report any fever, cough, unusual symptoms immediately. Stay up to date with vaccinations (avoid live vaccines while on treatment). Carry a treatment alert card. Do not stop or miss doses without consulting your specialist. Regular blood tests are required for monitoring.",
  },
  {
    name: "Rituximab",
    generic_name: "Rituximab",
    drug_class: "Immunomodulatory / biologic agent",
    indications: [ "Autoimmune inflammatory conditions (rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis)", "Inflammatory bowel disease (Crohn's disease, ulcerative colitis)", "Psoriasis and hidradenitis suppurativa", "Organ transplant rejection prophylaxis"
],
    contraindications: [ "Active severe infection (treat infection before starting biologic)", "Untreated latent TB / active TB", "Active hepatitis B infection (prophylaxis or defer treatment)", "Severe heart failure (certain TNF inhibitors)", "Demyelinating disorders (relative contraindication for TNF inhibitors)"
],
    side_effects: [ "Increased infection risk (especially reactivation of TB, hepatitis B, and opportunistic infections)", "Injection site reactions (pain, erythema, swelling)", "Infusion reactions (fever, chills, hypotension â€” during IV administration)", "Hypersensitivity / anaphylaxis (rare)", "Malignancy risk (long-term immunosuppression)"
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
    interactions: [ "Live vaccines â€” contraindicated during treatment and for variable period after (check product monograph)", "Immunosuppressants (methotrexate, azathioprine, ciclosporin) â€” additive immunosuppression", "CYP450 substrates â€” IL-6 inhibitors may alter metabolism of CYP substrates (e.g., warfarin, statins)"
],
    monitoring: "Screen for latent TB (IGRA/PPD), hepatitis B/C, HIV before initiation. FBC, LFT, U&E at baseline and periodically. Monitor for signs of infection at every visit. Assess disease activity scores (DAS28, PASI, HBI). Review vaccination status and update appropriate non-live vaccines before starting.",
    patient_counselling: "Increased risk of infections â€” report any fever, cough, unusual symptoms immediately. Stay up to date with vaccinations (avoid live vaccines while on treatment). Carry a treatment alert card. Do not stop or miss doses without consulting your specialist. Regular blood tests are required for monitoring.",
  },
  {
    name: "Tocilizumab",
    generic_name: "Tocilizumab",
    drug_class: "Immunomodulatory / biologic agent",
    indications: [ "Autoimmune inflammatory conditions (rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis)", "Inflammatory bowel disease (Crohn's disease, ulcerative colitis)", "Psoriasis and hidradenitis suppurativa", "Organ transplant rejection prophylaxis"
],
    contraindications: [ "Active severe infection (treat infection before starting biologic)", "Untreated latent TB / active TB", "Active hepatitis B infection (prophylaxis or defer treatment)", "Severe heart failure (certain TNF inhibitors)", "Demyelinating disorders (relative contraindication for TNF inhibitors)"
],
    side_effects: [ "Increased infection risk (especially reactivation of TB, hepatitis B, and opportunistic infections)", "Injection site reactions (pain, erythema, swelling)", "Infusion reactions (fever, chills, hypotension â€” during IV administration)", "Hypersensitivity / anaphylaxis (rare)", "Malignancy risk (long-term immunosuppression)"
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
    interactions: [ "Live vaccines â€” contraindicated during treatment and for variable period after (check product monograph)", "Immunosuppressants (methotrexate, azathioprine, ciclosporin) â€” additive immunosuppression", "CYP450 substrates â€” IL-6 inhibitors may alter metabolism of CYP substrates (e.g., warfarin, statins)"
],
    monitoring: "Screen for latent TB (IGRA/PPD), hepatitis B/C, HIV before initiation. FBC, LFT, U&E at baseline and periodically. Monitor for signs of infection at every visit. Assess disease activity scores (DAS28, PASI, HBI). Review vaccination status and update appropriate non-live vaccines before starting.",
    patient_counselling: "Increased risk of infections â€” report any fever, cough, unusual symptoms immediately. Stay up to date with vaccinations (avoid live vaccines while on treatment). Carry a treatment alert card. Do not stop or miss doses without consulting your specialist. Regular blood tests are required for monitoring.",
  },
  {
    name: "Calcium Carbonate",
    generic_name: "Calcium Carbonate",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis â€” iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
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
    interactions: [ "Tetracyclines / fluoroquinolones â€” absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2â€“4 hours", "Thyroxine â€” absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin â€” vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs â€” reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
  },
  {
    name: "Cholecalciferol",
    generic_name: "Cholecalciferol",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis â€” iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
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
    interactions: [ "Tetracyclines / fluoroquinolones â€” absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2â€“4 hours", "Thyroxine â€” absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin â€” vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs â€” reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
  },
  {
    name: "Dextrose",
    generic_name: "Dextrose",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis â€” iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
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
    interactions: [ "Tetracyclines / fluoroquinolones â€” absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2â€“4 hours", "Thyroxine â€” absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin â€” vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs â€” reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
  },
  {
    name: "Ergocalciferol",
    generic_name: "Ergocalciferol",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis â€” iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
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
    interactions: [ "Tetracyclines / fluoroquinolones â€” absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2â€“4 hours", "Thyroxine â€” absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin â€” vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs â€” reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
  },
  {
    name: "Ferrous Fumarate",
    generic_name: "Ferrous Fumarate",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis â€” iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
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
    interactions: [ "Tetracyclines / fluoroquinolones â€” absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2â€“4 hours", "Thyroxine â€” absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin â€” vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs â€” reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
  },
  {
    name: "Iron Dextran",
    generic_name: "Iron Dextran",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis â€” iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
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
    interactions: [ "Tetracyclines / fluoroquinolones â€” absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2â€“4 hours", "Thyroxine â€” absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin â€” vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs â€” reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
  },
  {
    name: "Iron Sucrose",
    generic_name: "Iron Sucrose",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis â€” iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
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
    interactions: [ "Tetracyclines / fluoroquinolones â€” absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2â€“4 hours", "Thyroxine â€” absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin â€” vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs â€” reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
  },
  {
    name: "Multivitamins",
    generic_name: "Multivitamins",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis â€” iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
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
    interactions: [ "Tetracyclines / fluoroquinolones â€” absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2â€“4 hours", "Thyroxine â€” absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin â€” vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs â€” reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
  },
  {
    name: "ORS",
    generic_name: "ORS",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis â€” iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
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
    interactions: [ "Tetracyclines / fluoroquinolones â€” absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2â€“4 hours", "Thyroxine â€” absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin â€” vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs â€” reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
  },
  {
    name: "Phytomenadione",
    generic_name: "Phytomenadione",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis â€” iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
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
    interactions: [ "Tetracyclines / fluoroquinolones â€” absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2â€“4 hours", "Thyroxine â€” absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin â€” vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs â€” reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
  },
  {
    name: "Pyridoxine",
    generic_name: "Pyridoxine",
    drug_class: "Nutritional supplement / vitamin",
    indications: [ "Prevention and treatment of nutritional deficiencies", "Specific vitamin/mineral replacement therapy", "Supplementation in increased demand states (pregnancy, lactation, growth, recovery)", "Malabsorption syndromes (parenteral replacement when oral not feasible)"
],
    contraindications: [ "Hypercalcaemia / hypervitaminosis D (vitamin D and calcium supplements)", "Iron overload (haemochromatosis, haemosiderosis â€” iron supplements contraindicated)", "Severe renal impairment (certain electrolyte/vitamin formulations)", "Galactosaemia (lactose-containing formulations)"
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
    interactions: [ "Tetracyclines / fluoroquinolones â€” absorption reduced by iron, calcium, magnesium, zinc; separate dosing by 2â€“4 hours", "Thyroxine â€” absorption reduced by calcium, iron; separate dosing by 4 hours", "Warfarin â€” vitamin K reverses anticoagulation; consistent dietary intake important", "PPIs â€” reduced absorption of calcium, vitamin B12, magnesium"
],
    monitoring: "Monitor serum levels of the specific nutrient being supplemented (unless prophylactic/therapeutic dietary supplementation). Iron studies (ferritin, Fe, TIBC, transferrin saturation) for iron therapy. Vitamin D levels (25-OH vitamin D). Calcium, phosphate, ALP. Full blood count and red cell indices. Clinical signs of deficiency or toxicity.",
    patient_counselling: "Supplements are not a substitute for a balanced diet. Iron: take with vitamin C (orange juice) to enhance absorption; avoid tea/coffee within 1 hour. Calcium supplements may cause constipation; stay well hydrated. Report any symptoms suggestive of toxicity (nausea, vomiting, confusion, muscle weakness).",
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
  console.log(`\nBatch 22 complete: ${success} inserted, ${failed} failed`);
}

main().catch(console.error);