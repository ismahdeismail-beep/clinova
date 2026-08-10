/**
 * seed-drug-monographs-batch24.ts
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
    name: "Tamsulosin",
    generic_name: "Tamsulosin",
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
    name: "Tolterodine",
    generic_name: "Tolterodine",
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
    name: "Tranexamic Acid",
    generic_name: "Tranexamic Acid",
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
    name: "Calcium Chloride",
    generic_name: "Calcium Chloride",
    drug_class: "Renal / electrolyte agent",
    indications: [ "Correction of electrolyte abnormalities (hyperkalaemia, hypocalcaemia, hypomagnesaemia)", "Fluid and electrolyte replacement therapy", "Acid-base balance correction (metabolic acidosis)", "Management of hyperkalaemia emergencies"
],
    contraindications: [ "Hypercalcaemia / hypermagnesaemia / hypernatraemia (for respective replacement therapies)", "Severe renal impairment with oliguria/anuria", "Digitalis toxicity (calcium IV — risk of cardiac arrest)", "Extravasation risk (calcium solutions — IV access must be secure)"
],
    side_effects: [ "Local injection site reactions (pain, phlebitis, extravasation risk with calcium solutions)", "Hypercalcaemia / hypermagnesaemia / hypernatraemia with excessive replacement", "Cardiac arrhythmias (rapid correction of electrolytes)", "Metabolic alkalosis (excessive bicarbonate administration)", "Volume overload (sodium-containing solutions)"
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
    interactions: [ "Digoxin — hypokalaemia/hypomagnesaemia increase digoxin toxicity; maintain normal levels", "Diuretics — increased electrolyte loss; monitor levels regularly", "ACE inhibitors / ARBs — hyperkalaemia risk (especially with potassium-sparing diuretics or K supplements)", "Corticosteroids — increased sodium retention and potassium loss"
],
    monitoring: "Monitor serum electrolytes (Na, K, Ca, Mg, PO4), renal function (Cr, eGFR, BUN), fluid balance (input/output chart), ECG (for electrolyte-related arrhythmias), acid-base status (pH, bicarbonate, base excess), and signs of volume overload (oedema, JVP, lung auscultation).",
    patient_counselling: "Report any muscle cramps, weakness, palpitations, or shortness of breath. Take electrolyte supplements exactly as prescribed. Do not take additional potassium-containing products without consulting your doctor. Regular blood tests are essential for safe therapy.",
  },
  {
    name: "Calcium Gluconate",
    generic_name: "Calcium Gluconate",
    drug_class: "Renal / electrolyte agent",
    indications: [ "Correction of electrolyte abnormalities (hyperkalaemia, hypocalcaemia, hypomagnesaemia)", "Fluid and electrolyte replacement therapy", "Acid-base balance correction (metabolic acidosis)", "Management of hyperkalaemia emergencies"
],
    contraindications: [ "Hypercalcaemia / hypermagnesaemia / hypernatraemia (for respective replacement therapies)", "Severe renal impairment with oliguria/anuria", "Digitalis toxicity (calcium IV — risk of cardiac arrest)", "Extravasation risk (calcium solutions — IV access must be secure)"
],
    side_effects: [ "Local injection site reactions (pain, phlebitis, extravasation risk with calcium solutions)", "Hypercalcaemia / hypermagnesaemia / hypernatraemia with excessive replacement", "Cardiac arrhythmias (rapid correction of electrolytes)", "Metabolic alkalosis (excessive bicarbonate administration)", "Volume overload (sodium-containing solutions)"
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
    interactions: [ "Digoxin — hypokalaemia/hypomagnesaemia increase digoxin toxicity; maintain normal levels", "Diuretics — increased electrolyte loss; monitor levels regularly", "ACE inhibitors / ARBs — hyperkalaemia risk (especially with potassium-sparing diuretics or K supplements)", "Corticosteroids — increased sodium retention and potassium loss"
],
    monitoring: "Monitor serum electrolytes (Na, K, Ca, Mg, PO4), renal function (Cr, eGFR, BUN), fluid balance (input/output chart), ECG (for electrolyte-related arrhythmias), acid-base status (pH, bicarbonate, base excess), and signs of volume overload (oedema, JVP, lung auscultation).",
    patient_counselling: "Report any muscle cramps, weakness, palpitations, or shortness of breath. Take electrolyte supplements exactly as prescribed. Do not take additional potassium-containing products without consulting your doctor. Regular blood tests are essential for safe therapy.",
  },
  {
    name: "Magnesium Sulfate",
    generic_name: "Magnesium Sulfate",
    drug_class: "Renal / electrolyte agent",
    indications: [ "Correction of electrolyte abnormalities (hyperkalaemia, hypocalcaemia, hypomagnesaemia)", "Fluid and electrolyte replacement therapy", "Acid-base balance correction (metabolic acidosis)", "Management of hyperkalaemia emergencies"
],
    contraindications: [ "Hypercalcaemia / hypermagnesaemia / hypernatraemia (for respective replacement therapies)", "Severe renal impairment with oliguria/anuria", "Digitalis toxicity (calcium IV — risk of cardiac arrest)", "Extravasation risk (calcium solutions — IV access must be secure)"
],
    side_effects: [ "Local injection site reactions (pain, phlebitis, extravasation risk with calcium solutions)", "Hypercalcaemia / hypermagnesaemia / hypernatraemia with excessive replacement", "Cardiac arrhythmias (rapid correction of electrolytes)", "Metabolic alkalosis (excessive bicarbonate administration)", "Volume overload (sodium-containing solutions)"
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
    interactions: [ "Digoxin — hypokalaemia/hypomagnesaemia increase digoxin toxicity; maintain normal levels", "Diuretics — increased electrolyte loss; monitor levels regularly", "ACE inhibitors / ARBs — hyperkalaemia risk (especially with potassium-sparing diuretics or K supplements)", "Corticosteroids — increased sodium retention and potassium loss"
],
    monitoring: "Monitor serum electrolytes (Na, K, Ca, Mg, PO4), renal function (Cr, eGFR, BUN), fluid balance (input/output chart), ECG (for electrolyte-related arrhythmias), acid-base status (pH, bicarbonate, base excess), and signs of volume overload (oedema, JVP, lung auscultation).",
    patient_counselling: "Report any muscle cramps, weakness, palpitations, or shortness of breath. Take electrolyte supplements exactly as prescribed. Do not take additional potassium-containing products without consulting your doctor. Regular blood tests are essential for safe therapy.",
  },
  {
    name: "Mannitol",
    generic_name: "Mannitol",
    drug_class: "Renal / electrolyte agent",
    indications: [ "Correction of electrolyte abnormalities (hyperkalaemia, hypocalcaemia, hypomagnesaemia)", "Fluid and electrolyte replacement therapy", "Acid-base balance correction (metabolic acidosis)", "Management of hyperkalaemia emergencies"
],
    contraindications: [ "Hypercalcaemia / hypermagnesaemia / hypernatraemia (for respective replacement therapies)", "Severe renal impairment with oliguria/anuria", "Digitalis toxicity (calcium IV — risk of cardiac arrest)", "Extravasation risk (calcium solutions — IV access must be secure)"
],
    side_effects: [ "Local injection site reactions (pain, phlebitis, extravasation risk with calcium solutions)", "Hypercalcaemia / hypermagnesaemia / hypernatraemia with excessive replacement", "Cardiac arrhythmias (rapid correction of electrolytes)", "Metabolic alkalosis (excessive bicarbonate administration)", "Volume overload (sodium-containing solutions)"
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
    interactions: [ "Digoxin — hypokalaemia/hypomagnesaemia increase digoxin toxicity; maintain normal levels", "Diuretics — increased electrolyte loss; monitor levels regularly", "ACE inhibitors / ARBs — hyperkalaemia risk (especially with potassium-sparing diuretics or K supplements)", "Corticosteroids — increased sodium retention and potassium loss"
],
    monitoring: "Monitor serum electrolytes (Na, K, Ca, Mg, PO4), renal function (Cr, eGFR, BUN), fluid balance (input/output chart), ECG (for electrolyte-related arrhythmias), acid-base status (pH, bicarbonate, base excess), and signs of volume overload (oedema, JVP, lung auscultation).",
    patient_counselling: "Report any muscle cramps, weakness, palpitations, or shortness of breath. Take electrolyte supplements exactly as prescribed. Do not take additional potassium-containing products without consulting your doctor. Regular blood tests are essential for safe therapy.",
  },
  {
    name: "Ringer's Lactate",
    generic_name: "Ringer's Lactate",
    drug_class: "Renal / electrolyte agent",
    indications: [ "Correction of electrolyte abnormalities (hyperkalaemia, hypocalcaemia, hypomagnesaemia)", "Fluid and electrolyte replacement therapy", "Acid-base balance correction (metabolic acidosis)", "Management of hyperkalaemia emergencies"
],
    contraindications: [ "Hypercalcaemia / hypermagnesaemia / hypernatraemia (for respective replacement therapies)", "Severe renal impairment with oliguria/anuria", "Digitalis toxicity (calcium IV — risk of cardiac arrest)", "Extravasation risk (calcium solutions — IV access must be secure)"
],
    side_effects: [ "Local injection site reactions (pain, phlebitis, extravasation risk with calcium solutions)", "Hypercalcaemia / hypermagnesaemia / hypernatraemia with excessive replacement", "Cardiac arrhythmias (rapid correction of electrolytes)", "Metabolic alkalosis (excessive bicarbonate administration)", "Volume overload (sodium-containing solutions)"
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
    interactions: [ "Digoxin — hypokalaemia/hypomagnesaemia increase digoxin toxicity; maintain normal levels", "Diuretics — increased electrolyte loss; monitor levels regularly", "ACE inhibitors / ARBs — hyperkalaemia risk (especially with potassium-sparing diuretics or K supplements)", "Corticosteroids — increased sodium retention and potassium loss"
],
    monitoring: "Monitor serum electrolytes (Na, K, Ca, Mg, PO4), renal function (Cr, eGFR, BUN), fluid balance (input/output chart), ECG (for electrolyte-related arrhythmias), acid-base status (pH, bicarbonate, base excess), and signs of volume overload (oedema, JVP, lung auscultation).",
    patient_counselling: "Report any muscle cramps, weakness, palpitations, or shortness of breath. Take electrolyte supplements exactly as prescribed. Do not take additional potassium-containing products without consulting your doctor. Regular blood tests are essential for safe therapy.",
  },
  {
    name: "Sodium Bicarbonate",
    generic_name: "Sodium Bicarbonate",
    drug_class: "Renal / electrolyte agent",
    indications: [ "Correction of electrolyte abnormalities (hyperkalaemia, hypocalcaemia, hypomagnesaemia)", "Fluid and electrolyte replacement therapy", "Acid-base balance correction (metabolic acidosis)", "Management of hyperkalaemia emergencies"
],
    contraindications: [ "Hypercalcaemia / hypermagnesaemia / hypernatraemia (for respective replacement therapies)", "Severe renal impairment with oliguria/anuria", "Digitalis toxicity (calcium IV — risk of cardiac arrest)", "Extravasation risk (calcium solutions — IV access must be secure)"
],
    side_effects: [ "Local injection site reactions (pain, phlebitis, extravasation risk with calcium solutions)", "Hypercalcaemia / hypermagnesaemia / hypernatraemia with excessive replacement", "Cardiac arrhythmias (rapid correction of electrolytes)", "Metabolic alkalosis (excessive bicarbonate administration)", "Volume overload (sodium-containing solutions)"
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
    interactions: [ "Digoxin — hypokalaemia/hypomagnesaemia increase digoxin toxicity; maintain normal levels", "Diuretics — increased electrolyte loss; monitor levels regularly", "ACE inhibitors / ARBs — hyperkalaemia risk (especially with potassium-sparing diuretics or K supplements)", "Corticosteroids — increased sodium retention and potassium loss"
],
    monitoring: "Monitor serum electrolytes (Na, K, Ca, Mg, PO4), renal function (Cr, eGFR, BUN), fluid balance (input/output chart), ECG (for electrolyte-related arrhythmias), acid-base status (pH, bicarbonate, base excess), and signs of volume overload (oedema, JVP, lung auscultation).",
    patient_counselling: "Report any muscle cramps, weakness, palpitations, or shortness of breath. Take electrolyte supplements exactly as prescribed. Do not take additional potassium-containing products without consulting your doctor. Regular blood tests are essential for safe therapy.",
  },
  {
    name: "Sodium Chloride",
    generic_name: "Sodium Chloride",
    drug_class: "Renal / electrolyte agent",
    indications: [ "Correction of electrolyte abnormalities (hyperkalaemia, hypocalcaemia, hypomagnesaemia)", "Fluid and electrolyte replacement therapy", "Acid-base balance correction (metabolic acidosis)", "Management of hyperkalaemia emergencies"
],
    contraindications: [ "Hypercalcaemia / hypermagnesaemia / hypernatraemia (for respective replacement therapies)", "Severe renal impairment with oliguria/anuria", "Digitalis toxicity (calcium IV — risk of cardiac arrest)", "Extravasation risk (calcium solutions — IV access must be secure)"
],
    side_effects: [ "Local injection site reactions (pain, phlebitis, extravasation risk with calcium solutions)", "Hypercalcaemia / hypermagnesaemia / hypernatraemia with excessive replacement", "Cardiac arrhythmias (rapid correction of electrolytes)", "Metabolic alkalosis (excessive bicarbonate administration)", "Volume overload (sodium-containing solutions)"
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
    interactions: [ "Digoxin — hypokalaemia/hypomagnesaemia increase digoxin toxicity; maintain normal levels", "Diuretics — increased electrolyte loss; monitor levels regularly", "ACE inhibitors / ARBs — hyperkalaemia risk (especially with potassium-sparing diuretics or K supplements)", "Corticosteroids — increased sodium retention and potassium loss"
],
    monitoring: "Monitor serum electrolytes (Na, K, Ca, Mg, PO4), renal function (Cr, eGFR, BUN), fluid balance (input/output chart), ECG (for electrolyte-related arrhythmias), acid-base status (pH, bicarbonate, base excess), and signs of volume overload (oedema, JVP, lung auscultation).",
    patient_counselling: "Report any muscle cramps, weakness, palpitations, or shortness of breath. Take electrolyte supplements exactly as prescribed. Do not take additional potassium-containing products without consulting your doctor. Regular blood tests are essential for safe therapy.",
  },
  {
    name: "Water for Injection",
    generic_name: "Water for Injection",
    drug_class: "Renal / electrolyte agent",
    indications: [ "Correction of electrolyte abnormalities (hyperkalaemia, hypocalcaemia, hypomagnesaemia)", "Fluid and electrolyte replacement therapy", "Acid-base balance correction (metabolic acidosis)", "Management of hyperkalaemia emergencies"
],
    contraindications: [ "Hypercalcaemia / hypermagnesaemia / hypernatraemia (for respective replacement therapies)", "Severe renal impairment with oliguria/anuria", "Digitalis toxicity (calcium IV — risk of cardiac arrest)", "Extravasation risk (calcium solutions — IV access must be secure)"
],
    side_effects: [ "Local injection site reactions (pain, phlebitis, extravasation risk with calcium solutions)", "Hypercalcaemia / hypermagnesaemia / hypernatraemia with excessive replacement", "Cardiac arrhythmias (rapid correction of electrolytes)", "Metabolic alkalosis (excessive bicarbonate administration)", "Volume overload (sodium-containing solutions)"
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
    interactions: [ "Digoxin — hypokalaemia/hypomagnesaemia increase digoxin toxicity; maintain normal levels", "Diuretics — increased electrolyte loss; monitor levels regularly", "ACE inhibitors / ARBs — hyperkalaemia risk (especially with potassium-sparing diuretics or K supplements)", "Corticosteroids — increased sodium retention and potassium loss"
],
    monitoring: "Monitor serum electrolytes (Na, K, Ca, Mg, PO4), renal function (Cr, eGFR, BUN), fluid balance (input/output chart), ECG (for electrolyte-related arrhythmias), acid-base status (pH, bicarbonate, base excess), and signs of volume overload (oedema, JVP, lung auscultation).",
    patient_counselling: "Report any muscle cramps, weakness, palpitations, or shortness of breath. Take electrolyte supplements exactly as prescribed. Do not take additional potassium-containing products without consulting your doctor. Regular blood tests are essential for safe therapy.",
  },
  {
    name: "Aminophylline",
    generic_name: "Aminophylline",
    drug_class: "Respiratory agent",
    indications: [ "Asthma management (preventer and reliever therapy)", "COPD management (bronchodilators, inhaled corticosteroids)", "Allergic rhinitis (intranasal corticosteroids, antihistamines)", "Pulmonary fibrosis / interstitial lung disease (antifibrotic agents)"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Acute severe asthma / status asthmaticus (long-acting beta-agonists without concomitant ICS)", "Cardiac arrhythmias (certain bronchodilators — caution)"
],
    side_effects: [ "Oropharyngeal candidiasis and dysphonia (inhaled corticosteroids) — rinse mouth after use", "Tremor, palpitations, tachycardia (beta-2 agonists) — dose-dependent; usually self-limiting", "Dry mouth, throat irritation, cough (inhaled therapies)", "Headache, dizziness, nausea (systemic effects)", "Paradoxical bronchospasm (rare — discontinue and use alternative)"
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
    interactions: [ "Beta-blockers (including ophthalmic) — antagonist effects on beta-agonists; avoid if possible", "Potassium-depleting diuretics — increased risk of hypokalaemia with beta-2 agonists", "MAOIs / tricyclic antidepressants — increased cardiovascular effects with beta-2 agonists", "CYP3A4 inhibitors (certain ICS) — increased systemic exposure; monitor for adrenal suppression"
],
    monitoring: "Monitor peak expiratory flow (PEF), FEV1, symptom scores, inhaler technique at every visit, exacerbation frequency, oral corticosteroid use, bone density (long-term ICS), growth velocity in children, and adrenal function in high-dose ICS.",
    patient_counselling: "Rinse mouth with water after each inhaler use (not swallowing) to prevent thrush. Use your inhaler correctly — demonstrate technique at every visit. Know the difference between preventer (daily) and reliever (as needed). Have an action plan. Seek urgent care if reliever not lasting 4 hours or symptoms worsening.",
  },
  {
    name: "Beclometasone",
    generic_name: "Beclometasone",
    drug_class: "Respiratory agent",
    indications: [ "Asthma management (preventer and reliever therapy)", "COPD management (bronchodilators, inhaled corticosteroids)", "Allergic rhinitis (intranasal corticosteroids, antihistamines)", "Pulmonary fibrosis / interstitial lung disease (antifibrotic agents)"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Acute severe asthma / status asthmaticus (long-acting beta-agonists without concomitant ICS)", "Cardiac arrhythmias (certain bronchodilators — caution)"
],
    side_effects: [ "Oropharyngeal candidiasis and dysphonia (inhaled corticosteroids) — rinse mouth after use", "Tremor, palpitations, tachycardia (beta-2 agonists) — dose-dependent; usually self-limiting", "Dry mouth, throat irritation, cough (inhaled therapies)", "Headache, dizziness, nausea (systemic effects)", "Paradoxical bronchospasm (rare — discontinue and use alternative)"
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
    interactions: [ "Beta-blockers (including ophthalmic) — antagonist effects on beta-agonists; avoid if possible", "Potassium-depleting diuretics — increased risk of hypokalaemia with beta-2 agonists", "MAOIs / tricyclic antidepressants — increased cardiovascular effects with beta-2 agonists", "CYP3A4 inhibitors (certain ICS) — increased systemic exposure; monitor for adrenal suppression"
],
    monitoring: "Monitor peak expiratory flow (PEF), FEV1, symptom scores, inhaler technique at every visit, exacerbation frequency, oral corticosteroid use, bone density (long-term ICS), growth velocity in children, and adrenal function in high-dose ICS.",
    patient_counselling: "Rinse mouth with water after each inhaler use (not swallowing) to prevent thrush. Use your inhaler correctly — demonstrate technique at every visit. Know the difference between preventer (daily) and reliever (as needed). Have an action plan. Seek urgent care if reliever not lasting 4 hours or symptoms worsening.",
  },
  {
    name: "Budesonide",
    generic_name: "Budesonide",
    drug_class: "Respiratory agent",
    indications: [ "Asthma management (preventer and reliever therapy)", "COPD management (bronchodilators, inhaled corticosteroids)", "Allergic rhinitis (intranasal corticosteroids, antihistamines)", "Pulmonary fibrosis / interstitial lung disease (antifibrotic agents)"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Acute severe asthma / status asthmaticus (long-acting beta-agonists without concomitant ICS)", "Cardiac arrhythmias (certain bronchodilators — caution)"
],
    side_effects: [ "Oropharyngeal candidiasis and dysphonia (inhaled corticosteroids) — rinse mouth after use", "Tremor, palpitations, tachycardia (beta-2 agonists) — dose-dependent; usually self-limiting", "Dry mouth, throat irritation, cough (inhaled therapies)", "Headache, dizziness, nausea (systemic effects)", "Paradoxical bronchospasm (rare — discontinue and use alternative)"
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
    interactions: [ "Beta-blockers (including ophthalmic) — antagonist effects on beta-agonists; avoid if possible", "Potassium-depleting diuretics — increased risk of hypokalaemia with beta-2 agonists", "MAOIs / tricyclic antidepressants — increased cardiovascular effects with beta-2 agonists", "CYP3A4 inhibitors (certain ICS) — increased systemic exposure; monitor for adrenal suppression"
],
    monitoring: "Monitor peak expiratory flow (PEF), FEV1, symptom scores, inhaler technique at every visit, exacerbation frequency, oral corticosteroid use, bone density (long-term ICS), growth velocity in children, and adrenal function in high-dose ICS.",
    patient_counselling: "Rinse mouth with water after each inhaler use (not swallowing) to prevent thrush. Use your inhaler correctly — demonstrate technique at every visit. Know the difference between preventer (daily) and reliever (as needed). Have an action plan. Seek urgent care if reliever not lasting 4 hours or symptoms worsening.",
  },
  {
    name: "Fluticasone",
    generic_name: "Fluticasone",
    drug_class: "Respiratory agent",
    indications: [ "Asthma management (preventer and reliever therapy)", "COPD management (bronchodilators, inhaled corticosteroids)", "Allergic rhinitis (intranasal corticosteroids, antihistamines)", "Pulmonary fibrosis / interstitial lung disease (antifibrotic agents)"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Acute severe asthma / status asthmaticus (long-acting beta-agonists without concomitant ICS)", "Cardiac arrhythmias (certain bronchodilators — caution)"
],
    side_effects: [ "Oropharyngeal candidiasis and dysphonia (inhaled corticosteroids) — rinse mouth after use", "Tremor, palpitations, tachycardia (beta-2 agonists) — dose-dependent; usually self-limiting", "Dry mouth, throat irritation, cough (inhaled therapies)", "Headache, dizziness, nausea (systemic effects)", "Paradoxical bronchospasm (rare — discontinue and use alternative)"
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
    interactions: [ "Beta-blockers (including ophthalmic) — antagonist effects on beta-agonists; avoid if possible", "Potassium-depleting diuretics — increased risk of hypokalaemia with beta-2 agonists", "MAOIs / tricyclic antidepressants — increased cardiovascular effects with beta-2 agonists", "CYP3A4 inhibitors (certain ICS) — increased systemic exposure; monitor for adrenal suppression"
],
    monitoring: "Monitor peak expiratory flow (PEF), FEV1, symptom scores, inhaler technique at every visit, exacerbation frequency, oral corticosteroid use, bone density (long-term ICS), growth velocity in children, and adrenal function in high-dose ICS.",
    patient_counselling: "Rinse mouth with water after each inhaler use (not swallowing) to prevent thrush. Use your inhaler correctly — demonstrate technique at every visit. Know the difference between preventer (daily) and reliever (as needed). Have an action plan. Seek urgent care if reliever not lasting 4 hours or symptoms worsening.",
  },
  {
    name: "Ipratropium",
    generic_name: "Ipratropium",
    drug_class: "Respiratory agent",
    indications: [ "Asthma management (preventer and reliever therapy)", "COPD management (bronchodilators, inhaled corticosteroids)", "Allergic rhinitis (intranasal corticosteroids, antihistamines)", "Pulmonary fibrosis / interstitial lung disease (antifibrotic agents)"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Acute severe asthma / status asthmaticus (long-acting beta-agonists without concomitant ICS)", "Cardiac arrhythmias (certain bronchodilators — caution)"
],
    side_effects: [ "Oropharyngeal candidiasis and dysphonia (inhaled corticosteroids) — rinse mouth after use", "Tremor, palpitations, tachycardia (beta-2 agonists) — dose-dependent; usually self-limiting", "Dry mouth, throat irritation, cough (inhaled therapies)", "Headache, dizziness, nausea (systemic effects)", "Paradoxical bronchospasm (rare — discontinue and use alternative)"
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
    interactions: [ "Beta-blockers (including ophthalmic) — antagonist effects on beta-agonists; avoid if possible", "Potassium-depleting diuretics — increased risk of hypokalaemia with beta-2 agonists", "MAOIs / tricyclic antidepressants — increased cardiovascular effects with beta-2 agonists", "CYP3A4 inhibitors (certain ICS) — increased systemic exposure; monitor for adrenal suppression"
],
    monitoring: "Monitor peak expiratory flow (PEF), FEV1, symptom scores, inhaler technique at every visit, exacerbation frequency, oral corticosteroid use, bone density (long-term ICS), growth velocity in children, and adrenal function in high-dose ICS.",
    patient_counselling: "Rinse mouth with water after each inhaler use (not swallowing) to prevent thrush. Use your inhaler correctly — demonstrate technique at every visit. Know the difference between preventer (daily) and reliever (as needed). Have an action plan. Seek urgent care if reliever not lasting 4 hours or symptoms worsening.",
  },
  {
    name: "Montelukast",
    generic_name: "Montelukast",
    drug_class: "Respiratory agent",
    indications: [ "Asthma management (preventer and reliever therapy)", "COPD management (bronchodilators, inhaled corticosteroids)", "Allergic rhinitis (intranasal corticosteroids, antihistamines)", "Pulmonary fibrosis / interstitial lung disease (antifibrotic agents)"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Acute severe asthma / status asthmaticus (long-acting beta-agonists without concomitant ICS)", "Cardiac arrhythmias (certain bronchodilators — caution)"
],
    side_effects: [ "Oropharyngeal candidiasis and dysphonia (inhaled corticosteroids) — rinse mouth after use", "Tremor, palpitations, tachycardia (beta-2 agonists) — dose-dependent; usually self-limiting", "Dry mouth, throat irritation, cough (inhaled therapies)", "Headache, dizziness, nausea (systemic effects)", "Paradoxical bronchospasm (rare — discontinue and use alternative)"
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
    interactions: [ "Beta-blockers (including ophthalmic) — antagonist effects on beta-agonists; avoid if possible", "Potassium-depleting diuretics — increased risk of hypokalaemia with beta-2 agonists", "MAOIs / tricyclic antidepressants — increased cardiovascular effects with beta-2 agonists", "CYP3A4 inhibitors (certain ICS) — increased systemic exposure; monitor for adrenal suppression"
],
    monitoring: "Monitor peak expiratory flow (PEF), FEV1, symptom scores, inhaler technique at every visit, exacerbation frequency, oral corticosteroid use, bone density (long-term ICS), growth velocity in children, and adrenal function in high-dose ICS.",
    patient_counselling: "Rinse mouth with water after each inhaler use (not swallowing) to prevent thrush. Use your inhaler correctly — demonstrate technique at every visit. Know the difference between preventer (daily) and reliever (as needed). Have an action plan. Seek urgent care if reliever not lasting 4 hours or symptoms worsening.",
  },
  {
    name: "Salbutamol",
    generic_name: "Salbutamol",
    drug_class: "Respiratory agent",
    indications: [ "Asthma management (preventer and reliever therapy)", "COPD management (bronchodilators, inhaled corticosteroids)", "Allergic rhinitis (intranasal corticosteroids, antihistamines)", "Pulmonary fibrosis / interstitial lung disease (antifibrotic agents)"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Acute severe asthma / status asthmaticus (long-acting beta-agonists without concomitant ICS)", "Cardiac arrhythmias (certain bronchodilators — caution)"
],
    side_effects: [ "Oropharyngeal candidiasis and dysphonia (inhaled corticosteroids) — rinse mouth after use", "Tremor, palpitations, tachycardia (beta-2 agonists) — dose-dependent; usually self-limiting", "Dry mouth, throat irritation, cough (inhaled therapies)", "Headache, dizziness, nausea (systemic effects)", "Paradoxical bronchospasm (rare — discontinue and use alternative)"
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
    interactions: [ "Beta-blockers (including ophthalmic) — antagonist effects on beta-agonists; avoid if possible", "Potassium-depleting diuretics — increased risk of hypokalaemia with beta-2 agonists", "MAOIs / tricyclic antidepressants — increased cardiovascular effects with beta-2 agonists", "CYP3A4 inhibitors (certain ICS) — increased systemic exposure; monitor for adrenal suppression"
],
    monitoring: "Monitor peak expiratory flow (PEF), FEV1, symptom scores, inhaler technique at every visit, exacerbation frequency, oral corticosteroid use, bone density (long-term ICS), growth velocity in children, and adrenal function in high-dose ICS.",
    patient_counselling: "Rinse mouth with water after each inhaler use (not swallowing) to prevent thrush. Use your inhaler correctly — demonstrate technique at every visit. Know the difference between preventer (daily) and reliever (as needed). Have an action plan. Seek urgent care if reliever not lasting 4 hours or symptoms worsening.",
  },
  {
    name: "Theophylline",
    generic_name: "Theophylline",
    drug_class: "Respiratory agent",
    indications: [ "Asthma management (preventer and reliever therapy)", "COPD management (bronchodilators, inhaled corticosteroids)", "Allergic rhinitis (intranasal corticosteroids, antihistamines)", "Pulmonary fibrosis / interstitial lung disease (antifibrotic agents)"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Acute severe asthma / status asthmaticus (long-acting beta-agonists without concomitant ICS)", "Cardiac arrhythmias (certain bronchodilators — caution)"
],
    side_effects: [ "Oropharyngeal candidiasis and dysphonia (inhaled corticosteroids) — rinse mouth after use", "Tremor, palpitations, tachycardia (beta-2 agonists) — dose-dependent; usually self-limiting", "Dry mouth, throat irritation, cough (inhaled therapies)", "Headache, dizziness, nausea (systemic effects)", "Paradoxical bronchospasm (rare — discontinue and use alternative)"
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
    interactions: [ "Beta-blockers (including ophthalmic) — antagonist effects on beta-agonists; avoid if possible", "Potassium-depleting diuretics — increased risk of hypokalaemia with beta-2 agonists", "MAOIs / tricyclic antidepressants — increased cardiovascular effects with beta-2 agonists", "CYP3A4 inhibitors (certain ICS) — increased systemic exposure; monitor for adrenal suppression"
],
    monitoring: "Monitor peak expiratory flow (PEF), FEV1, symptom scores, inhaler technique at every visit, exacerbation frequency, oral corticosteroid use, bone density (long-term ICS), growth velocity in children, and adrenal function in high-dose ICS.",
    patient_counselling: "Rinse mouth with water after each inhaler use (not swallowing) to prevent thrush. Use your inhaler correctly — demonstrate technique at every visit. Know the difference between preventer (daily) and reliever (as needed). Have an action plan. Seek urgent care if reliever not lasting 4 hours or symptoms worsening.",
  },
  {
    name: "Tiotropium",
    generic_name: "Tiotropium",
    drug_class: "Respiratory agent",
    indications: [ "Asthma management (preventer and reliever therapy)", "COPD management (bronchodilators, inhaled corticosteroids)", "Allergic rhinitis (intranasal corticosteroids, antihistamines)", "Pulmonary fibrosis / interstitial lung disease (antifibrotic agents)"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Acute severe asthma / status asthmaticus (long-acting beta-agonists without concomitant ICS)", "Cardiac arrhythmias (certain bronchodilators — caution)"
],
    side_effects: [ "Oropharyngeal candidiasis and dysphonia (inhaled corticosteroids) — rinse mouth after use", "Tremor, palpitations, tachycardia (beta-2 agonists) — dose-dependent; usually self-limiting", "Dry mouth, throat irritation, cough (inhaled therapies)", "Headache, dizziness, nausea (systemic effects)", "Paradoxical bronchospasm (rare — discontinue and use alternative)"
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
    interactions: [ "Beta-blockers (including ophthalmic) — antagonist effects on beta-agonists; avoid if possible", "Potassium-depleting diuretics — increased risk of hypokalaemia with beta-2 agonists", "MAOIs / tricyclic antidepressants — increased cardiovascular effects with beta-2 agonists", "CYP3A4 inhibitors (certain ICS) — increased systemic exposure; monitor for adrenal suppression"
],
    monitoring: "Monitor peak expiratory flow (PEF), FEV1, symptom scores, inhaler technique at every visit, exacerbation frequency, oral corticosteroid use, bone density (long-term ICS), growth velocity in children, and adrenal function in high-dose ICS.",
    patient_counselling: "Rinse mouth with water after each inhaler use (not swallowing) to prevent thrush. Use your inhaler correctly — demonstrate technique at every visit. Know the difference between preventer (daily) and reliever (as needed). Have an action plan. Seek urgent care if reliever not lasting 4 hours or symptoms worsening.",
  },
  {
    name: "Acetylcysteine",
    generic_name: "Acetylcysteine",
    drug_class: "Antidote / toxicology agent",
    indications: [ "Acute poisoning / overdose management (specific antidote for known toxin)", "Reversal of drug toxicity (e.g., opioid reversal, benzodiazepine reversal)", "Enhanced elimination of toxins (multiple-dose activated charcoal)", "Chemical exposure management (specific antidotes for organophosphates, cyanide, heavy metals)"
],
    contraindications: [ "Hypersensitivity (for specific antidotes)", "Ileus / GI obstruction (activated charcoal — risk of aspiration and obstruction)", "Caustic ingestion (activated charcoal — contraindicated; endoscopy required)", "Petroleum distillate ingestion (activated charcoal — aspiration risk)"
],
    side_effects: [ "Nausea, vomiting, diarrhoea (activated charcoal)", "Tachycardia, hypertension, agitation (certain reversal agents)", "Anaphylaxis / hypersensitivity reactions (antivenoms, specific antidotes)", "Rebound toxicity as antidote wears off (naloxone in long-acting opioids)", "Electrolyte disturbances (specific chelating agents)"
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
    interactions: [ "Activated charcoal — reduces absorption of ALL oral medications; separate all oral drugs by at least 2 hours", "Naloxone — concurrent use of other opioid antagonists", "Antivenoms — may interfere with vaccine efficacy", "Multiple antidote interactions depending on specific toxins"
],
    monitoring: "Monitor vital signs continuously (BP, HR, SpO2, RR, GCS). Cardiac monitoring (ECG for toxin-induced arrhythmias). Serial toxin levels where available (paracetamol, salicylate, lithium, digoxin, theophylline, iron, carboxyhaemoglobin, methaemoglobin). Electrolytes, renal function, liver function, coagulation. Needle-stick and sharps precautions during administration.",
    patient_counselling: "Poisoning is a medical emergency. Provide details of substance ingested, quantity, and time of ingestion to medical staff. Do not induce vomiting unless specifically directed. Bring containers/packaging to hospital. Antidotes work best when given early after exposure.",
  },
  {
    name: "Activated Charcoal",
    generic_name: "Activated Charcoal",
    drug_class: "Antidote / toxicology agent",
    indications: [ "Acute poisoning / overdose management (specific antidote for known toxin)", "Reversal of drug toxicity (e.g., opioid reversal, benzodiazepine reversal)", "Enhanced elimination of toxins (multiple-dose activated charcoal)", "Chemical exposure management (specific antidotes for organophosphates, cyanide, heavy metals)"
],
    contraindications: [ "Hypersensitivity (for specific antidotes)", "Ileus / GI obstruction (activated charcoal — risk of aspiration and obstruction)", "Caustic ingestion (activated charcoal — contraindicated; endoscopy required)", "Petroleum distillate ingestion (activated charcoal — aspiration risk)"
],
    side_effects: [ "Nausea, vomiting, diarrhoea (activated charcoal)", "Tachycardia, hypertension, agitation (certain reversal agents)", "Anaphylaxis / hypersensitivity reactions (antivenoms, specific antidotes)", "Rebound toxicity as antidote wears off (naloxone in long-acting opioids)", "Electrolyte disturbances (specific chelating agents)"
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
    interactions: [ "Activated charcoal — reduces absorption of ALL oral medications; separate all oral drugs by at least 2 hours", "Naloxone — concurrent use of other opioid antagonists", "Antivenoms — may interfere with vaccine efficacy", "Multiple antidote interactions depending on specific toxins"
],
    monitoring: "Monitor vital signs continuously (BP, HR, SpO2, RR, GCS). Cardiac monitoring (ECG for toxin-induced arrhythmias). Serial toxin levels where available (paracetamol, salicylate, lithium, digoxin, theophylline, iron, carboxyhaemoglobin, methaemoglobin). Electrolytes, renal function, liver function, coagulation. Needle-stick and sharps precautions during administration.",
    patient_counselling: "Poisoning is a medical emergency. Provide details of substance ingested, quantity, and time of ingestion to medical staff. Do not induce vomiting unless specifically directed. Bring containers/packaging to hospital. Antidotes work best when given early after exposure.",
  },
  {
    name: "Antivenom",
    generic_name: "Antivenom",
    drug_class: "Antidote / toxicology agent",
    indications: [ "Acute poisoning / overdose management (specific antidote for known toxin)", "Reversal of drug toxicity (e.g., opioid reversal, benzodiazepine reversal)", "Enhanced elimination of toxins (multiple-dose activated charcoal)", "Chemical exposure management (specific antidotes for organophosphates, cyanide, heavy metals)"
],
    contraindications: [ "Hypersensitivity (for specific antidotes)", "Ileus / GI obstruction (activated charcoal — risk of aspiration and obstruction)", "Caustic ingestion (activated charcoal — contraindicated; endoscopy required)", "Petroleum distillate ingestion (activated charcoal — aspiration risk)"
],
    side_effects: [ "Nausea, vomiting, diarrhoea (activated charcoal)", "Tachycardia, hypertension, agitation (certain reversal agents)", "Anaphylaxis / hypersensitivity reactions (antivenoms, specific antidotes)", "Rebound toxicity as antidote wears off (naloxone in long-acting opioids)", "Electrolyte disturbances (specific chelating agents)"
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
    interactions: [ "Activated charcoal — reduces absorption of ALL oral medications; separate all oral drugs by at least 2 hours", "Naloxone — concurrent use of other opioid antagonists", "Antivenoms — may interfere with vaccine efficacy", "Multiple antidote interactions depending on specific toxins"
],
    monitoring: "Monitor vital signs continuously (BP, HR, SpO2, RR, GCS). Cardiac monitoring (ECG for toxin-induced arrhythmias). Serial toxin levels where available (paracetamol, salicylate, lithium, digoxin, theophylline, iron, carboxyhaemoglobin, methaemoglobin). Electrolytes, renal function, liver function, coagulation. Needle-stick and sharps precautions during administration.",
    patient_counselling: "Poisoning is a medical emergency. Provide details of substance ingested, quantity, and time of ingestion to medical staff. Do not induce vomiting unless specifically directed. Bring containers/packaging to hospital. Antidotes work best when given early after exposure.",
  },
  {
    name: "Atropine",
    generic_name: "Atropine",
    drug_class: "Antidote / toxicology agent",
    indications: [ "Acute poisoning / overdose management (specific antidote for known toxin)", "Reversal of drug toxicity (e.g., opioid reversal, benzodiazepine reversal)", "Enhanced elimination of toxins (multiple-dose activated charcoal)", "Chemical exposure management (specific antidotes for organophosphates, cyanide, heavy metals)"
],
    contraindications: [ "Hypersensitivity (for specific antidotes)", "Ileus / GI obstruction (activated charcoal — risk of aspiration and obstruction)", "Caustic ingestion (activated charcoal — contraindicated; endoscopy required)", "Petroleum distillate ingestion (activated charcoal — aspiration risk)"
],
    side_effects: [ "Nausea, vomiting, diarrhoea (activated charcoal)", "Tachycardia, hypertension, agitation (certain reversal agents)", "Anaphylaxis / hypersensitivity reactions (antivenoms, specific antidotes)", "Rebound toxicity as antidote wears off (naloxone in long-acting opioids)", "Electrolyte disturbances (specific chelating agents)"
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
    interactions: [ "Activated charcoal — reduces absorption of ALL oral medications; separate all oral drugs by at least 2 hours", "Naloxone — concurrent use of other opioid antagonists", "Antivenoms — may interfere with vaccine efficacy", "Multiple antidote interactions depending on specific toxins"
],
    monitoring: "Monitor vital signs continuously (BP, HR, SpO2, RR, GCS). Cardiac monitoring (ECG for toxin-induced arrhythmias). Serial toxin levels where available (paracetamol, salicylate, lithium, digoxin, theophylline, iron, carboxyhaemoglobin, methaemoglobin). Electrolytes, renal function, liver function, coagulation. Needle-stick and sharps precautions during administration.",
    patient_counselling: "Poisoning is a medical emergency. Provide details of substance ingested, quantity, and time of ingestion to medical staff. Do not induce vomiting unless specifically directed. Bring containers/packaging to hospital. Antidotes work best when given early after exposure.",
  },
  {
    name: "Deferoxamine",
    generic_name: "Deferoxamine",
    drug_class: "Antidote / toxicology agent",
    indications: [ "Acute poisoning / overdose management (specific antidote for known toxin)", "Reversal of drug toxicity (e.g., opioid reversal, benzodiazepine reversal)", "Enhanced elimination of toxins (multiple-dose activated charcoal)", "Chemical exposure management (specific antidotes for organophosphates, cyanide, heavy metals)"
],
    contraindications: [ "Hypersensitivity (for specific antidotes)", "Ileus / GI obstruction (activated charcoal — risk of aspiration and obstruction)", "Caustic ingestion (activated charcoal — contraindicated; endoscopy required)", "Petroleum distillate ingestion (activated charcoal — aspiration risk)"
],
    side_effects: [ "Nausea, vomiting, diarrhoea (activated charcoal)", "Tachycardia, hypertension, agitation (certain reversal agents)", "Anaphylaxis / hypersensitivity reactions (antivenoms, specific antidotes)", "Rebound toxicity as antidote wears off (naloxone in long-acting opioids)", "Electrolyte disturbances (specific chelating agents)"
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
    interactions: [ "Activated charcoal — reduces absorption of ALL oral medications; separate all oral drugs by at least 2 hours", "Naloxone — concurrent use of other opioid antagonists", "Antivenoms — may interfere with vaccine efficacy", "Multiple antidote interactions depending on specific toxins"
],
    monitoring: "Monitor vital signs continuously (BP, HR, SpO2, RR, GCS). Cardiac monitoring (ECG for toxin-induced arrhythmias). Serial toxin levels where available (paracetamol, salicylate, lithium, digoxin, theophylline, iron, carboxyhaemoglobin, methaemoglobin). Electrolytes, renal function, liver function, coagulation. Needle-stick and sharps precautions during administration.",
    patient_counselling: "Poisoning is a medical emergency. Provide details of substance ingested, quantity, and time of ingestion to medical staff. Do not induce vomiting unless specifically directed. Bring containers/packaging to hospital. Antidotes work best when given early after exposure.",
  },
  {
    name: "Flumazenil",
    generic_name: "Flumazenil",
    drug_class: "Antidote / toxicology agent",
    indications: [ "Acute poisoning / overdose management (specific antidote for known toxin)", "Reversal of drug toxicity (e.g., opioid reversal, benzodiazepine reversal)", "Enhanced elimination of toxins (multiple-dose activated charcoal)", "Chemical exposure management (specific antidotes for organophosphates, cyanide, heavy metals)"
],
    contraindications: [ "Hypersensitivity (for specific antidotes)", "Ileus / GI obstruction (activated charcoal — risk of aspiration and obstruction)", "Caustic ingestion (activated charcoal — contraindicated; endoscopy required)", "Petroleum distillate ingestion (activated charcoal — aspiration risk)"
],
    side_effects: [ "Nausea, vomiting, diarrhoea (activated charcoal)", "Tachycardia, hypertension, agitation (certain reversal agents)", "Anaphylaxis / hypersensitivity reactions (antivenoms, specific antidotes)", "Rebound toxicity as antidote wears off (naloxone in long-acting opioids)", "Electrolyte disturbances (specific chelating agents)"
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
    interactions: [ "Activated charcoal — reduces absorption of ALL oral medications; separate all oral drugs by at least 2 hours", "Naloxone — concurrent use of other opioid antagonists", "Antivenoms — may interfere with vaccine efficacy", "Multiple antidote interactions depending on specific toxins"
],
    monitoring: "Monitor vital signs continuously (BP, HR, SpO2, RR, GCS). Cardiac monitoring (ECG for toxin-induced arrhythmias). Serial toxin levels where available (paracetamol, salicylate, lithium, digoxin, theophylline, iron, carboxyhaemoglobin, methaemoglobin). Electrolytes, renal function, liver function, coagulation. Needle-stick and sharps precautions during administration.",
    patient_counselling: "Poisoning is a medical emergency. Provide details of substance ingested, quantity, and time of ingestion to medical staff. Do not induce vomiting unless specifically directed. Bring containers/packaging to hospital. Antidotes work best when given early after exposure.",
  },
  {
    name: "N-acetylcysteine",
    generic_name: "N-acetylcysteine",
    drug_class: "Antidote / toxicology agent",
    indications: [ "Acute poisoning / overdose management (specific antidote for known toxin)", "Reversal of drug toxicity (e.g., opioid reversal, benzodiazepine reversal)", "Enhanced elimination of toxins (multiple-dose activated charcoal)", "Chemical exposure management (specific antidotes for organophosphates, cyanide, heavy metals)"
],
    contraindications: [ "Hypersensitivity (for specific antidotes)", "Ileus / GI obstruction (activated charcoal — risk of aspiration and obstruction)", "Caustic ingestion (activated charcoal — contraindicated; endoscopy required)", "Petroleum distillate ingestion (activated charcoal — aspiration risk)"
],
    side_effects: [ "Nausea, vomiting, diarrhoea (activated charcoal)", "Tachycardia, hypertension, agitation (certain reversal agents)", "Anaphylaxis / hypersensitivity reactions (antivenoms, specific antidotes)", "Rebound toxicity as antidote wears off (naloxone in long-acting opioids)", "Electrolyte disturbances (specific chelating agents)"
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
    interactions: [ "Activated charcoal — reduces absorption of ALL oral medications; separate all oral drugs by at least 2 hours", "Naloxone — concurrent use of other opioid antagonists", "Antivenoms — may interfere with vaccine efficacy", "Multiple antidote interactions depending on specific toxins"
],
    monitoring: "Monitor vital signs continuously (BP, HR, SpO2, RR, GCS). Cardiac monitoring (ECG for toxin-induced arrhythmias). Serial toxin levels where available (paracetamol, salicylate, lithium, digoxin, theophylline, iron, carboxyhaemoglobin, methaemoglobin). Electrolytes, renal function, liver function, coagulation. Needle-stick and sharps precautions during administration.",
    patient_counselling: "Poisoning is a medical emergency. Provide details of substance ingested, quantity, and time of ingestion to medical staff. Do not induce vomiting unless specifically directed. Bring containers/packaging to hospital. Antidotes work best when given early after exposure.",
  },
  {
    name: "Naloxone",
    generic_name: "Naloxone",
    drug_class: "Antidote / toxicology agent",
    indications: [ "Acute poisoning / overdose management (specific antidote for known toxin)", "Reversal of drug toxicity (e.g., opioid reversal, benzodiazepine reversal)", "Enhanced elimination of toxins (multiple-dose activated charcoal)", "Chemical exposure management (specific antidotes for organophosphates, cyanide, heavy metals)"
],
    contraindications: [ "Hypersensitivity (for specific antidotes)", "Ileus / GI obstruction (activated charcoal — risk of aspiration and obstruction)", "Caustic ingestion (activated charcoal — contraindicated; endoscopy required)", "Petroleum distillate ingestion (activated charcoal — aspiration risk)"
],
    side_effects: [ "Nausea, vomiting, diarrhoea (activated charcoal)", "Tachycardia, hypertension, agitation (certain reversal agents)", "Anaphylaxis / hypersensitivity reactions (antivenoms, specific antidotes)", "Rebound toxicity as antidote wears off (naloxone in long-acting opioids)", "Electrolyte disturbances (specific chelating agents)"
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
    interactions: [ "Activated charcoal — reduces absorption of ALL oral medications; separate all oral drugs by at least 2 hours", "Naloxone — concurrent use of other opioid antagonists", "Antivenoms — may interfere with vaccine efficacy", "Multiple antidote interactions depending on specific toxins"
],
    monitoring: "Monitor vital signs continuously (BP, HR, SpO2, RR, GCS). Cardiac monitoring (ECG for toxin-induced arrhythmias). Serial toxin levels where available (paracetamol, salicylate, lithium, digoxin, theophylline, iron, carboxyhaemoglobin, methaemoglobin). Electrolytes, renal function, liver function, coagulation. Needle-stick and sharps precautions during administration.",
    patient_counselling: "Poisoning is a medical emergency. Provide details of substance ingested, quantity, and time of ingestion to medical staff. Do not induce vomiting unless specifically directed. Bring containers/packaging to hospital. Antidotes work best when given early after exposure.",
  },
  {
    name: "Pralidoxime",
    generic_name: "Pralidoxime",
    drug_class: "Antidote / toxicology agent",
    indications: [ "Acute poisoning / overdose management (specific antidote for known toxin)", "Reversal of drug toxicity (e.g., opioid reversal, benzodiazepine reversal)", "Enhanced elimination of toxins (multiple-dose activated charcoal)", "Chemical exposure management (specific antidotes for organophosphates, cyanide, heavy metals)"
],
    contraindications: [ "Hypersensitivity (for specific antidotes)", "Ileus / GI obstruction (activated charcoal — risk of aspiration and obstruction)", "Caustic ingestion (activated charcoal — contraindicated; endoscopy required)", "Petroleum distillate ingestion (activated charcoal — aspiration risk)"
],
    side_effects: [ "Nausea, vomiting, diarrhoea (activated charcoal)", "Tachycardia, hypertension, agitation (certain reversal agents)", "Anaphylaxis / hypersensitivity reactions (antivenoms, specific antidotes)", "Rebound toxicity as antidote wears off (naloxone in long-acting opioids)", "Electrolyte disturbances (specific chelating agents)"
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
    interactions: [ "Activated charcoal — reduces absorption of ALL oral medications; separate all oral drugs by at least 2 hours", "Naloxone — concurrent use of other opioid antagonists", "Antivenoms — may interfere with vaccine efficacy", "Multiple antidote interactions depending on specific toxins"
],
    monitoring: "Monitor vital signs continuously (BP, HR, SpO2, RR, GCS). Cardiac monitoring (ECG for toxin-induced arrhythmias). Serial toxin levels where available (paracetamol, salicylate, lithium, digoxin, theophylline, iron, carboxyhaemoglobin, methaemoglobin). Electrolytes, renal function, liver function, coagulation. Needle-stick and sharps precautions during administration.",
    patient_counselling: "Poisoning is a medical emergency. Provide details of substance ingested, quantity, and time of ingestion to medical staff. Do not induce vomiting unless specifically directed. Bring containers/packaging to hospital. Antidotes work best when given early after exposure.",
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
  console.log(`\nBatch 24 complete: ${success} inserted, ${failed} failed`);
}

main().catch(console.error);