/**
 * seed-drug-monographs-batch20.ts
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
    name: "Dobutamine",
    generic_name: "Dobutamine",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Dopamine",
    generic_name: "Dopamine",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Doxazosin",
    generic_name: "Doxazosin",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Felodipine",
    generic_name: "Felodipine",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Hydrochlorothiazide",
    generic_name: "Hydrochlorothiazide",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Indapamide",
    generic_name: "Indapamide",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Lidocaine",
    generic_name: "Lidocaine",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Lisinopril",
    generic_name: "Lisinopril",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Metoprolol",
    generic_name: "Metoprolol",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Milrinone",
    generic_name: "Milrinone",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Minoxidil",
    generic_name: "Minoxidil",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Nadolol",
    generic_name: "Nadolol",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Nifedipine",
    generic_name: "Nifedipine",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Noradrenaline",
    generic_name: "Noradrenaline",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Pravastatin",
    generic_name: "Pravastatin",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Prazosin",
    generic_name: "Prazosin",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Propranolol",
    generic_name: "Propranolol",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Ramipril",
    generic_name: "Ramipril",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Rosuvastatin",
    generic_name: "Rosuvastatin",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Sacubitril",
    generic_name: "Sacubitril",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Simvastatin",
    generic_name: "Simvastatin",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Valsartan",
    generic_name: "Valsartan",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Verapamil",
    generic_name: "Verapamil",
    drug_class: "Cardiovascular agent",
    indications: [ "Hypertension management (monotherapy or combination therapy)", "Heart failure with reduced or preserved ejection fraction", "Coronary artery disease / stable angina management", "Arrhythmia control (rate or rhythm control depending on agent)"
],
    contraindications: [ "Hypersensitivity to active substance", "Severe bradycardia / sick sinus syndrome / advanced heart block (unless pacemaker fitted)", "Cardiogenic shock / decompensated heart failure (for certain negative inotropes)", "Severe hypotension (systolic BP <90 mmHg)"
],
    side_effects: [ "Dizziness, headache, fatigue (common during initial titration; usually resolve)", "Postural hypotension (especially elderly) â€” advise rising slowly from sitting/lying", "Bradycardia / heart block (rate-slowing agents) â€” monitor pulse; report syncope or presyncope", "Peripheral oedema (dihydropyridine calcium channel blockers) â€” usually dose-dependent", "Dry cough (ACE inhibitors) â€” consider ARB if intolerable"
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
    interactions: [ "NSAIDs â€” reduce antihypertensive efficacy; avoid chronic use if possible", "Beta-blockers / calcium channel blockers (verapamil, diltiazem) â€” additive bradycardia; caution when combining", "Diuretics â€” additive hypotension; monitor BP and electrolytes", "Digoxin â€” increased digoxin levels with some cardiovascular agents; monitor levels"
],
    monitoring: "Monitor blood pressure, heart rate, ECG at baseline and during titration. Check renal function and electrolytes (especially with ACEi/ARB and diuretics). Monitor for signs of fluid overload or decompensation in heart failure patients.",
    patient_counselling: "Take medication at the same time each day. Do not stop suddenly without consulting your doctor (risk of rebound hypertension/tachycardia). Rise slowly from sitting to prevent falls. Avoid excessive salt intake. Report significant dizziness, syncope, or palpitations.",
  },
  {
    name: "Amitriptyline",
    generic_name: "Amitriptyline",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Cetirizine",
    generic_name: "Cetirizine",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Chlordiazepoxide",
    generic_name: "Chlordiazepoxide",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Duloxetine",
    generic_name: "Duloxetine",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Entacapone",
    generic_name: "Entacapone",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Gabapentin",
    generic_name: "Gabapentin",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Hydroxyzine",
    generic_name: "Hydroxyzine",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Lamotrigine",
    generic_name: "Lamotrigine",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Levetiracetam",
    generic_name: "Levetiracetam",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Loratadine",
    generic_name: "Loratadine",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Lorazepam",
    generic_name: "Lorazepam",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Midazolam",
    generic_name: "Midazolam",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Milnacipran",
    generic_name: "Milnacipran",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Mirtazapine",
    generic_name: "Mirtazapine",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Olanzapine",
    generic_name: "Olanzapine",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Phenobarbital",
    generic_name: "Phenobarbital",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
  },
  {
    name: "Pregabalin",
    generic_name: "Pregabalin",
    drug_class: "Central nervous system agent",
    indications: [ "Management of neuropsychiatric disorders as per approved indications", "Symptom control and prevention of relapse in chronic CNS conditions", "Acute treatment of CNS emergencies (seizures, acute psychosis)", "Adjunctive therapy in treatment-resistant cases"
],
    contraindications: [ "Hypersensitivity to active substance", "Acute narrow-angle glaucoma (certain antidepressants/antipsychotics with anticholinergic effects)", "Severe hepatic impairment (drugs extensively hepatically metabolized)", "MAOI co-administration or recent discontinuation (certain antidepressants)"
],
    side_effects: [ "Drowsiness, sedation, cognitive dulling (especially during initial titration)", "Psychomotor impairment â€” avoid driving and operating heavy machinery until effect is known", "Weight gain / metabolic changes (certain antipsychotics and mood stabilizers)", "Extrapyramidal symptoms (antipsychotics) â€” dystonia, parkinsonism, akathisia, tardive dyskinesia", "Headache, dizziness, gastrointestinal disturbances (common; usually self-limiting)"
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
    interactions: [ "Alcohol / other CNS depressants â€” additive sedation; avoid concurrent use", "MAOIs â€” hypertensive crisis risk with certain antidepressants; washout period required", "Warfarin â€” altered metabolism with certain CNS agents; monitor INR", "Serotonergic drugs (triptans, tramadol, St John's Wort) â€” serotonin syndrome risk; avoid combination"
],
    monitoring: "Monitor mental state, suicidal ideation (especially in young adults during early treatment), weight, metabolic parameters, ECG (QT interval for certain agents), liver function, renal function, and drug levels where applicable (lithium, valproate, carbamazepine).",
    patient_counselling: "May cause drowsiness â€” avoid driving until you know how it affects you. Take as prescribed â€” do not adjust dose or stop suddenly. Report any worsening of mood, suicidal thoughts, or unusual behavioural changes immediately. Avoid alcohol. Regular follow-up appointments are essential for monitoring.",
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
  console.log(`\nBatch 20 complete: ${success} inserted, ${failed} failed`);
}

main().catch(console.error);