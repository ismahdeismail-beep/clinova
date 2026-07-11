/**
 * seed-drug-monographs-batch17.ts
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
    name: "Atracurium",
    generic_name: "Atracurium",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Bupivacaine",
    generic_name: "Bupivacaine",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Desflurane",
    generic_name: "Desflurane",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Etomidate",
    generic_name: "Etomidate",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Halothane",
    generic_name: "Halothane",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Isoflurane",
    generic_name: "Isoflurane",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Ketamine",
    generic_name: "Ketamine",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Neostigmine",
    generic_name: "Neostigmine",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Nitrous Oxide",
    generic_name: "Nitrous Oxide",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Prilocaine",
    generic_name: "Prilocaine",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Propofol",
    generic_name: "Propofol",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Rocuronium",
    generic_name: "Rocuronium",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Ropivacaine",
    generic_name: "Ropivacaine",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Sevoflurane",
    generic_name: "Sevoflurane",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Sugammadex",
    generic_name: "Sugammadex",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Suxamethonium",
    generic_name: "Suxamethonium",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Thiopental",
    generic_name: "Thiopental",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Vecuronium",
    generic_name: "Vecuronium",
    drug_class: "Anaesthetic agent",
    indications: [ "Induction and maintenance of general anaesthesia", "Local and regional anaesthesia for surgical procedures", "Sedation for procedures / intensive care", "Muscle relaxation for intubation and surgery"
],
    contraindications: [ "Hypersensitivity to active substance", "Malignant hyperthermia susceptibility (triggering agents: volatile anaesthetics, suxamethonium)", "Severe cardiovascular instability / uncompensated shock", "Raised intracranial pressure (certain agents)", "Porphyria (barbiturates, etomidate)"
],
    side_effects: [ "Respiratory depression (dose-dependent) â€” require airway management and ventilatory support", "Hypotension / haemodynamic instability (many anaesthetic agents)", "Post-operative nausea and vomiting (PONV)", "Malignant hyperthermia (volatile anaesthetics + suxamethonium) â€” MH protocol emergency", "Allergic reactions / anaphylaxis (neuromuscular blocking agents most commonly implicated)"
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
    interactions: [ "Opioids / benzodiazepines â€” synergistic respiratory depression and sedation", "Volatile anaesthetics â€” sensitize myocardium to catecholamines (arrhythmia risk)", "Antihypertensives â€” exaggerated hypotension with anaesthetic induction agents", "Neuromuscular blocking agents â€” potentiated by volatile anaesthetics, aminoglycosides, magnesium"
],
    monitoring: "Continuous ECG, non-invasive BP (every 1â€“5 min), SpO2, end-tidal CO2 (capnography), anaesthetic gas agent concentration, temperature, neuromuscular blockade monitoring (train-of-four), urine output. Monitored by anaesthetist throughout procedure. Recovery monitoring: Aldrete / Steward score.",
    patient_counselling: "Do not eat or drink before surgery as instructed (fasting guidelines). Arrange transportation home after day surgery. Do not drive, operate machinery, or make important decisions for 24â€“48 hours after anaesthesia. Report any post-procedure complications: persistent numbness/weakness (regional anaesthesia), fever, severe headache.",
  },
  {
    name: "Aspirin",
    generic_name: "Aspirin",
    drug_class: "Analgesic agent",
    indications: [ "Acute pain management (mild to severe depending on agent)", "Chronic pain conditions (neuropathic, nociceptive, or mixed)", "Post-operative pain control", "Fever reduction (antipyretic effect of certain agents)"
],
    contraindications: [ "Hypersensitivity to active substance or NSAIDs (including aspirin-exacerbated respiratory disease)", "Active peptic ulceration / gastrointestinal bleeding (NSAIDs)", "Severe hepatic impairment (paracetamol, NSAIDs)", "Severe renal impairment (NSAIDs)", "Concurrent anticoagulation (NSAIDs)"
],
    side_effects: [ "Gastrointestinal: nausea, vomiting, dyspepsia, constipation (especially opioids)", "Sedation, dizziness (centrally-acting agents)", "Gastric ulceration / bleeding (NSAIDs) â€” risk increases with duration and dose", "Hepatotoxicity (paracetamol overdose) â€” adhere to maximum daily dose", "Respiratory depression (opioids) â€” risk highest in opioid-naÃ¯ve, elderly, or those with respiratory compromise"
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
    interactions: [ "Anticoagulants (warfarin, DOACs, heparin) â€” increased bleeding risk with NSAIDs; avoid combination", "Methotrexate â€” reduced clearance and increased toxicity with NSAIDs", "CNS depressants (alcohol, benzodiazepines) â€” additive sedation with opioids", "ACE inhibitors / diuretics â€” reduced antihypertensive efficacy and increased nephrotoxicity with NSAIDs"
],
    monitoring: "Monitor pain scores, renal function (especially with NSAIDs in elderly/dehydrated), liver function (paracetamol), signs of bleeding/anaemia (NSAIDs), respiratory rate and sedation score (opioids), and bowel function (opioid-induced constipation).",
    patient_counselling: "Use the lowest effective dose for the shortest duration. Do not exceed maximum daily dose (especially paracetamol). Avoid alcohol. NSAIDs should be taken with food. Opioids may cause dependence â€” use exactly as prescribed. Report severe abdominal pain, black stools, or vomiting blood (NSAIDs).",
  },
  {
    name: "Celecoxib",
    generic_name: "Celecoxib",
    drug_class: "Analgesic agent",
    indications: [ "Acute pain management (mild to severe depending on agent)", "Chronic pain conditions (neuropathic, nociceptive, or mixed)", "Post-operative pain control", "Fever reduction (antipyretic effect of certain agents)"
],
    contraindications: [ "Hypersensitivity to active substance or NSAIDs (including aspirin-exacerbated respiratory disease)", "Active peptic ulceration / gastrointestinal bleeding (NSAIDs)", "Severe hepatic impairment (paracetamol, NSAIDs)", "Severe renal impairment (NSAIDs)", "Concurrent anticoagulation (NSAIDs)"
],
    side_effects: [ "Gastrointestinal: nausea, vomiting, dyspepsia, constipation (especially opioids)", "Sedation, dizziness (centrally-acting agents)", "Gastric ulceration / bleeding (NSAIDs) â€” risk increases with duration and dose", "Hepatotoxicity (paracetamol overdose) â€” adhere to maximum daily dose", "Respiratory depression (opioids) â€” risk highest in opioid-naÃ¯ve, elderly, or those with respiratory compromise"
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
    interactions: [ "Anticoagulants (warfarin, DOACs, heparin) â€” increased bleeding risk with NSAIDs; avoid combination", "Methotrexate â€” reduced clearance and increased toxicity with NSAIDs", "CNS depressants (alcohol, benzodiazepines) â€” additive sedation with opioids", "ACE inhibitors / diuretics â€” reduced antihypertensive efficacy and increased nephrotoxicity with NSAIDs"
],
    monitoring: "Monitor pain scores, renal function (especially with NSAIDs in elderly/dehydrated), liver function (paracetamol), signs of bleeding/anaemia (NSAIDs), respiratory rate and sedation score (opioids), and bowel function (opioid-induced constipation).",
    patient_counselling: "Use the lowest effective dose for the shortest duration. Do not exceed maximum daily dose (especially paracetamol). Avoid alcohol. NSAIDs should be taken with food. Opioids may cause dependence â€” use exactly as prescribed. Report severe abdominal pain, black stools, or vomiting blood (NSAIDs).",
  },
  {
    name: "Diclofenac",
    generic_name: "Diclofenac",
    drug_class: "Analgesic agent",
    indications: [ "Acute pain management (mild to severe depending on agent)", "Chronic pain conditions (neuropathic, nociceptive, or mixed)", "Post-operative pain control", "Fever reduction (antipyretic effect of certain agents)"
],
    contraindications: [ "Hypersensitivity to active substance or NSAIDs (including aspirin-exacerbated respiratory disease)", "Active peptic ulceration / gastrointestinal bleeding (NSAIDs)", "Severe hepatic impairment (paracetamol, NSAIDs)", "Severe renal impairment (NSAIDs)", "Concurrent anticoagulation (NSAIDs)"
],
    side_effects: [ "Gastrointestinal: nausea, vomiting, dyspepsia, constipation (especially opioids)", "Sedation, dizziness (centrally-acting agents)", "Gastric ulceration / bleeding (NSAIDs) â€” risk increases with duration and dose", "Hepatotoxicity (paracetamol overdose) â€” adhere to maximum daily dose", "Respiratory depression (opioids) â€” risk highest in opioid-naÃ¯ve, elderly, or those with respiratory compromise"
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
    interactions: [ "Anticoagulants (warfarin, DOACs, heparin) â€” increased bleeding risk with NSAIDs; avoid combination", "Methotrexate â€” reduced clearance and increased toxicity with NSAIDs", "CNS depressants (alcohol, benzodiazepines) â€” additive sedation with opioids", "ACE inhibitors / diuretics â€” reduced antihypertensive efficacy and increased nephrotoxicity with NSAIDs"
],
    monitoring: "Monitor pain scores, renal function (especially with NSAIDs in elderly/dehydrated), liver function (paracetamol), signs of bleeding/anaemia (NSAIDs), respiratory rate and sedation score (opioids), and bowel function (opioid-induced constipation).",
    patient_counselling: "Use the lowest effective dose for the shortest duration. Do not exceed maximum daily dose (especially paracetamol). Avoid alcohol. NSAIDs should be taken with food. Opioids may cause dependence â€” use exactly as prescribed. Report severe abdominal pain, black stools, or vomiting blood (NSAIDs).",
  },
  {
    name: "Etoricoxib",
    generic_name: "Etoricoxib",
    drug_class: "Analgesic agent",
    indications: [ "Acute pain management (mild to severe depending on agent)", "Chronic pain conditions (neuropathic, nociceptive, or mixed)", "Post-operative pain control", "Fever reduction (antipyretic effect of certain agents)"
],
    contraindications: [ "Hypersensitivity to active substance or NSAIDs (including aspirin-exacerbated respiratory disease)", "Active peptic ulceration / gastrointestinal bleeding (NSAIDs)", "Severe hepatic impairment (paracetamol, NSAIDs)", "Severe renal impairment (NSAIDs)", "Concurrent anticoagulation (NSAIDs)"
],
    side_effects: [ "Gastrointestinal: nausea, vomiting, dyspepsia, constipation (especially opioids)", "Sedation, dizziness (centrally-acting agents)", "Gastric ulceration / bleeding (NSAIDs) â€” risk increases with duration and dose", "Hepatotoxicity (paracetamol overdose) â€” adhere to maximum daily dose", "Respiratory depression (opioids) â€” risk highest in opioid-naÃ¯ve, elderly, or those with respiratory compromise"
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
    interactions: [ "Anticoagulants (warfarin, DOACs, heparin) â€” increased bleeding risk with NSAIDs; avoid combination", "Methotrexate â€” reduced clearance and increased toxicity with NSAIDs", "CNS depressants (alcohol, benzodiazepines) â€” additive sedation with opioids", "ACE inhibitors / diuretics â€” reduced antihypertensive efficacy and increased nephrotoxicity with NSAIDs"
],
    monitoring: "Monitor pain scores, renal function (especially with NSAIDs in elderly/dehydrated), liver function (paracetamol), signs of bleeding/anaemia (NSAIDs), respiratory rate and sedation score (opioids), and bowel function (opioid-induced constipation).",
    patient_counselling: "Use the lowest effective dose for the shortest duration. Do not exceed maximum daily dose (especially paracetamol). Avoid alcohol. NSAIDs should be taken with food. Opioids may cause dependence â€” use exactly as prescribed. Report severe abdominal pain, black stools, or vomiting blood (NSAIDs).",
  },
  {
    name: "Indomethacin",
    generic_name: "Indomethacin",
    drug_class: "Analgesic agent",
    indications: [ "Acute pain management (mild to severe depending on agent)", "Chronic pain conditions (neuropathic, nociceptive, or mixed)", "Post-operative pain control", "Fever reduction (antipyretic effect of certain agents)"
],
    contraindications: [ "Hypersensitivity to active substance or NSAIDs (including aspirin-exacerbated respiratory disease)", "Active peptic ulceration / gastrointestinal bleeding (NSAIDs)", "Severe hepatic impairment (paracetamol, NSAIDs)", "Severe renal impairment (NSAIDs)", "Concurrent anticoagulation (NSAIDs)"
],
    side_effects: [ "Gastrointestinal: nausea, vomiting, dyspepsia, constipation (especially opioids)", "Sedation, dizziness (centrally-acting agents)", "Gastric ulceration / bleeding (NSAIDs) â€” risk increases with duration and dose", "Hepatotoxicity (paracetamol overdose) â€” adhere to maximum daily dose", "Respiratory depression (opioids) â€” risk highest in opioid-naÃ¯ve, elderly, or those with respiratory compromise"
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
    interactions: [ "Anticoagulants (warfarin, DOACs, heparin) â€” increased bleeding risk with NSAIDs; avoid combination", "Methotrexate â€” reduced clearance and increased toxicity with NSAIDs", "CNS depressants (alcohol, benzodiazepines) â€” additive sedation with opioids", "ACE inhibitors / diuretics â€” reduced antihypertensive efficacy and increased nephrotoxicity with NSAIDs"
],
    monitoring: "Monitor pain scores, renal function (especially with NSAIDs in elderly/dehydrated), liver function (paracetamol), signs of bleeding/anaemia (NSAIDs), respiratory rate and sedation score (opioids), and bowel function (opioid-induced constipation).",
    patient_counselling: "Use the lowest effective dose for the shortest duration. Do not exceed maximum daily dose (especially paracetamol). Avoid alcohol. NSAIDs should be taken with food. Opioids may cause dependence â€” use exactly as prescribed. Report severe abdominal pain, black stools, or vomiting blood (NSAIDs).",
  },
  {
    name: "Meloxicam",
    generic_name: "Meloxicam",
    drug_class: "Analgesic agent",
    indications: [ "Acute pain management (mild to severe depending on agent)", "Chronic pain conditions (neuropathic, nociceptive, or mixed)", "Post-operative pain control", "Fever reduction (antipyretic effect of certain agents)"
],
    contraindications: [ "Hypersensitivity to active substance or NSAIDs (including aspirin-exacerbated respiratory disease)", "Active peptic ulceration / gastrointestinal bleeding (NSAIDs)", "Severe hepatic impairment (paracetamol, NSAIDs)", "Severe renal impairment (NSAIDs)", "Concurrent anticoagulation (NSAIDs)"
],
    side_effects: [ "Gastrointestinal: nausea, vomiting, dyspepsia, constipation (especially opioids)", "Sedation, dizziness (centrally-acting agents)", "Gastric ulceration / bleeding (NSAIDs) â€” risk increases with duration and dose", "Hepatotoxicity (paracetamol overdose) â€” adhere to maximum daily dose", "Respiratory depression (opioids) â€” risk highest in opioid-naÃ¯ve, elderly, or those with respiratory compromise"
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
    interactions: [ "Anticoagulants (warfarin, DOACs, heparin) â€” increased bleeding risk with NSAIDs; avoid combination", "Methotrexate â€” reduced clearance and increased toxicity with NSAIDs", "CNS depressants (alcohol, benzodiazepines) â€” additive sedation with opioids", "ACE inhibitors / diuretics â€” reduced antihypertensive efficacy and increased nephrotoxicity with NSAIDs"
],
    monitoring: "Monitor pain scores, renal function (especially with NSAIDs in elderly/dehydrated), liver function (paracetamol), signs of bleeding/anaemia (NSAIDs), respiratory rate and sedation score (opioids), and bowel function (opioid-induced constipation).",
    patient_counselling: "Use the lowest effective dose for the shortest duration. Do not exceed maximum daily dose (especially paracetamol). Avoid alcohol. NSAIDs should be taken with food. Opioids may cause dependence â€” use exactly as prescribed. Report severe abdominal pain, black stools, or vomiting blood (NSAIDs).",
  },
  {
    name: "Naproxen",
    generic_name: "Naproxen",
    drug_class: "Analgesic agent",
    indications: [ "Acute pain management (mild to severe depending on agent)", "Chronic pain conditions (neuropathic, nociceptive, or mixed)", "Post-operative pain control", "Fever reduction (antipyretic effect of certain agents)"
],
    contraindications: [ "Hypersensitivity to active substance or NSAIDs (including aspirin-exacerbated respiratory disease)", "Active peptic ulceration / gastrointestinal bleeding (NSAIDs)", "Severe hepatic impairment (paracetamol, NSAIDs)", "Severe renal impairment (NSAIDs)", "Concurrent anticoagulation (NSAIDs)"
],
    side_effects: [ "Gastrointestinal: nausea, vomiting, dyspepsia, constipation (especially opioids)", "Sedation, dizziness (centrally-acting agents)", "Gastric ulceration / bleeding (NSAIDs) â€” risk increases with duration and dose", "Hepatotoxicity (paracetamol overdose) â€” adhere to maximum daily dose", "Respiratory depression (opioids) â€” risk highest in opioid-naÃ¯ve, elderly, or those with respiratory compromise"
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
    interactions: [ "Anticoagulants (warfarin, DOACs, heparin) â€” increased bleeding risk with NSAIDs; avoid combination", "Methotrexate â€” reduced clearance and increased toxicity with NSAIDs", "CNS depressants (alcohol, benzodiazepines) â€” additive sedation with opioids", "ACE inhibitors / diuretics â€” reduced antihypertensive efficacy and increased nephrotoxicity with NSAIDs"
],
    monitoring: "Monitor pain scores, renal function (especially with NSAIDs in elderly/dehydrated), liver function (paracetamol), signs of bleeding/anaemia (NSAIDs), respiratory rate and sedation score (opioids), and bowel function (opioid-induced constipation).",
    patient_counselling: "Use the lowest effective dose for the shortest duration. Do not exceed maximum daily dose (especially paracetamol). Avoid alcohol. NSAIDs should be taken with food. Opioids may cause dependence â€” use exactly as prescribed. Report severe abdominal pain, black stools, or vomiting blood (NSAIDs).",
  },
  {
    name: "Nimesulide",
    generic_name: "Nimesulide",
    drug_class: "Analgesic agent",
    indications: [ "Acute pain management (mild to severe depending on agent)", "Chronic pain conditions (neuropathic, nociceptive, or mixed)", "Post-operative pain control", "Fever reduction (antipyretic effect of certain agents)"
],
    contraindications: [ "Hypersensitivity to active substance or NSAIDs (including aspirin-exacerbated respiratory disease)", "Active peptic ulceration / gastrointestinal bleeding (NSAIDs)", "Severe hepatic impairment (paracetamol, NSAIDs)", "Severe renal impairment (NSAIDs)", "Concurrent anticoagulation (NSAIDs)"
],
    side_effects: [ "Gastrointestinal: nausea, vomiting, dyspepsia, constipation (especially opioids)", "Sedation, dizziness (centrally-acting agents)", "Gastric ulceration / bleeding (NSAIDs) â€” risk increases with duration and dose", "Hepatotoxicity (paracetamol overdose) â€” adhere to maximum daily dose", "Respiratory depression (opioids) â€” risk highest in opioid-naÃ¯ve, elderly, or those with respiratory compromise"
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
    interactions: [ "Anticoagulants (warfarin, DOACs, heparin) â€” increased bleeding risk with NSAIDs; avoid combination", "Methotrexate â€” reduced clearance and increased toxicity with NSAIDs", "CNS depressants (alcohol, benzodiazepines) â€” additive sedation with opioids", "ACE inhibitors / diuretics â€” reduced antihypertensive efficacy and increased nephrotoxicity with NSAIDs"
],
    monitoring: "Monitor pain scores, renal function (especially with NSAIDs in elderly/dehydrated), liver function (paracetamol), signs of bleeding/anaemia (NSAIDs), respiratory rate and sedation score (opioids), and bowel function (opioid-induced constipation).",
    patient_counselling: "Use the lowest effective dose for the shortest duration. Do not exceed maximum daily dose (especially paracetamol). Avoid alcohol. NSAIDs should be taken with food. Opioids may cause dependence â€” use exactly as prescribed. Report severe abdominal pain, black stools, or vomiting blood (NSAIDs).",
  },
  {
    name: "Piroxicam",
    generic_name: "Piroxicam",
    drug_class: "Analgesic agent",
    indications: [ "Acute pain management (mild to severe depending on agent)", "Chronic pain conditions (neuropathic, nociceptive, or mixed)", "Post-operative pain control", "Fever reduction (antipyretic effect of certain agents)"
],
    contraindications: [ "Hypersensitivity to active substance or NSAIDs (including aspirin-exacerbated respiratory disease)", "Active peptic ulceration / gastrointestinal bleeding (NSAIDs)", "Severe hepatic impairment (paracetamol, NSAIDs)", "Severe renal impairment (NSAIDs)", "Concurrent anticoagulation (NSAIDs)"
],
    side_effects: [ "Gastrointestinal: nausea, vomiting, dyspepsia, constipation (especially opioids)", "Sedation, dizziness (centrally-acting agents)", "Gastric ulceration / bleeding (NSAIDs) â€” risk increases with duration and dose", "Hepatotoxicity (paracetamol overdose) â€” adhere to maximum daily dose", "Respiratory depression (opioids) â€” risk highest in opioid-naÃ¯ve, elderly, or those with respiratory compromise"
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
    interactions: [ "Anticoagulants (warfarin, DOACs, heparin) â€” increased bleeding risk with NSAIDs; avoid combination", "Methotrexate â€” reduced clearance and increased toxicity with NSAIDs", "CNS depressants (alcohol, benzodiazepines) â€” additive sedation with opioids", "ACE inhibitors / diuretics â€” reduced antihypertensive efficacy and increased nephrotoxicity with NSAIDs"
],
    monitoring: "Monitor pain scores, renal function (especially with NSAIDs in elderly/dehydrated), liver function (paracetamol), signs of bleeding/anaemia (NSAIDs), respiratory rate and sedation score (opioids), and bowel function (opioid-induced constipation).",
    patient_counselling: "Use the lowest effective dose for the shortest duration. Do not exceed maximum daily dose (especially paracetamol). Avoid alcohol. NSAIDs should be taken with food. Opioids may cause dependence â€” use exactly as prescribed. Report severe abdominal pain, black stools, or vomiting blood (NSAIDs).",
  },
  {
    name: "Tramadol",
    generic_name: "Tramadol",
    drug_class: "Analgesic agent",
    indications: [ "Acute pain management (mild to severe depending on agent)", "Chronic pain conditions (neuropathic, nociceptive, or mixed)", "Post-operative pain control", "Fever reduction (antipyretic effect of certain agents)"
],
    contraindications: [ "Hypersensitivity to active substance or NSAIDs (including aspirin-exacerbated respiratory disease)", "Active peptic ulceration / gastrointestinal bleeding (NSAIDs)", "Severe hepatic impairment (paracetamol, NSAIDs)", "Severe renal impairment (NSAIDs)", "Concurrent anticoagulation (NSAIDs)"
],
    side_effects: [ "Gastrointestinal: nausea, vomiting, dyspepsia, constipation (especially opioids)", "Sedation, dizziness (centrally-acting agents)", "Gastric ulceration / bleeding (NSAIDs) â€” risk increases with duration and dose", "Hepatotoxicity (paracetamol overdose) â€” adhere to maximum daily dose", "Respiratory depression (opioids) â€” risk highest in opioid-naÃ¯ve, elderly, or those with respiratory compromise"
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
    interactions: [ "Anticoagulants (warfarin, DOACs, heparin) â€” increased bleeding risk with NSAIDs; avoid combination", "Methotrexate â€” reduced clearance and increased toxicity with NSAIDs", "CNS depressants (alcohol, benzodiazepines) â€” additive sedation with opioids", "ACE inhibitors / diuretics â€” reduced antihypertensive efficacy and increased nephrotoxicity with NSAIDs"
],
    monitoring: "Monitor pain scores, renal function (especially with NSAIDs in elderly/dehydrated), liver function (paracetamol), signs of bleeding/anaemia (NSAIDs), respiratory rate and sedation score (opioids), and bowel function (opioid-induced constipation).",
    patient_counselling: "Use the lowest effective dose for the shortest duration. Do not exceed maximum daily dose (especially paracetamol). Avoid alcohol. NSAIDs should be taken with food. Opioids may cause dependence â€” use exactly as prescribed. Report severe abdominal pain, black stools, or vomiting blood (NSAIDs).",
  },
  {
    name: "Abacavir",
    generic_name: "Abacavir",
    drug_class: "Antimicrobial agent",
    indications: [ "Treatment of susceptible bacterial/fungal/parasitic infections", "Empiric therapy based on local susceptibility patterns and clinical presentation", "Prophylaxis in immunocompromised patients where indicated", "Combination therapy for mixed infections or to prevent resistance development"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient in the formulation", "Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)", "Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)"
],
    side_effects: [ "Gastrointestinal disturbances: nausea, vomiting, diarrhoea (common; usually self-limiting)", "Allergic reactions: skin rash, urticaria, pruritus; rarely anaphylaxis (discontinue immediately)", "Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) â€” report persistent diarrhoea", "QT prolongation (certain classes) â€” ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities", "Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening â€” discontinue if rash with blistering or mucosal involvement)"
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
    interactions: [ "Warfarin / DOACs â€” many antimicrobials alter INR; monitor coagulation closely", "Oral contraceptives â€” reduced efficacy during and 7 days after therapy; advise additional barrier contraception", "Antacids / iron / calcium / magnesium / milk products â€” reduced absorption of tetracyclines and fluoroquinolones; space dosing 2â€“4 hours apart"
],
    monitoring: "Monitor for signs of hypersensitivity, renal and hepatic function at baseline and during prolonged therapy, complete blood count for prolonged courses. Therapeutic drug monitoring required for aminoglycosides and vancomycin.",
    patient_counselling: "Complete the full course as prescribed even if symptoms improve. Do not share with others. Report any rash, severe diarrhoea, or signs of superinfection. Take at evenly spaced intervals to maintain effective drug levels.",
  },
  {
    name: "Aciclovir",
    generic_name: "Aciclovir",
    drug_class: "Antimicrobial agent",
    indications: [ "Treatment of susceptible bacterial/fungal/parasitic infections", "Empiric therapy based on local susceptibility patterns and clinical presentation", "Prophylaxis in immunocompromised patients where indicated", "Combination therapy for mixed infections or to prevent resistance development"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient in the formulation", "Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)", "Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)"
],
    side_effects: [ "Gastrointestinal disturbances: nausea, vomiting, diarrhoea (common; usually self-limiting)", "Allergic reactions: skin rash, urticaria, pruritus; rarely anaphylaxis (discontinue immediately)", "Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) â€” report persistent diarrhoea", "QT prolongation (certain classes) â€” ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities", "Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening â€” discontinue if rash with blistering or mucosal involvement)"
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
    interactions: [ "Warfarin / DOACs â€” many antimicrobials alter INR; monitor coagulation closely", "Oral contraceptives â€” reduced efficacy during and 7 days after therapy; advise additional barrier contraception", "Antacids / iron / calcium / magnesium / milk products â€” reduced absorption of tetracyclines and fluoroquinolones; space dosing 2â€“4 hours apart"
],
    monitoring: "Monitor for signs of hypersensitivity, renal and hepatic function at baseline and during prolonged therapy, complete blood count for prolonged courses. Therapeutic drug monitoring required for aminoglycosides and vancomycin.",
    patient_counselling: "Complete the full course as prescribed even if symptoms improve. Do not share with others. Report any rash, severe diarrhoea, or signs of superinfection. Take at evenly spaced intervals to maintain effective drug levels.",
  },
  {
    name: "Amodiaquine",
    generic_name: "Amodiaquine",
    drug_class: "Antimicrobial agent",
    indications: [ "Treatment of susceptible bacterial/fungal/parasitic infections", "Empiric therapy based on local susceptibility patterns and clinical presentation", "Prophylaxis in immunocompromised patients where indicated", "Combination therapy for mixed infections or to prevent resistance development"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient in the formulation", "Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)", "Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)"
],
    side_effects: [ "Gastrointestinal disturbances: nausea, vomiting, diarrhoea (common; usually self-limiting)", "Allergic reactions: skin rash, urticaria, pruritus; rarely anaphylaxis (discontinue immediately)", "Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) â€” report persistent diarrhoea", "QT prolongation (certain classes) â€” ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities", "Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening â€” discontinue if rash with blistering or mucosal involvement)"
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
    interactions: [ "Warfarin / DOACs â€” many antimicrobials alter INR; monitor coagulation closely", "Oral contraceptives â€” reduced efficacy during and 7 days after therapy; advise additional barrier contraception", "Antacids / iron / calcium / magnesium / milk products â€” reduced absorption of tetracyclines and fluoroquinolones; space dosing 2â€“4 hours apart"
],
    monitoring: "Monitor for signs of hypersensitivity, renal and hepatic function at baseline and during prolonged therapy, complete blood count for prolonged courses. Therapeutic drug monitoring required for aminoglycosides and vancomycin.",
    patient_counselling: "Complete the full course as prescribed even if symptoms improve. Do not share with others. Report any rash, severe diarrhoea, or signs of superinfection. Take at evenly spaced intervals to maintain effective drug levels.",
  },
  {
    name: "Amoxicillin",
    generic_name: "Amoxicillin",
    drug_class: "Antimicrobial agent",
    indications: [ "Treatment of susceptible bacterial/fungal/parasitic infections", "Empiric therapy based on local susceptibility patterns and clinical presentation", "Prophylaxis in immunocompromised patients where indicated", "Combination therapy for mixed infections or to prevent resistance development"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient in the formulation", "Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)", "Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)"
],
    side_effects: [ "Gastrointestinal disturbances: nausea, vomiting, diarrhoea (common; usually self-limiting)", "Allergic reactions: skin rash, urticaria, pruritus; rarely anaphylaxis (discontinue immediately)", "Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) â€” report persistent diarrhoea", "QT prolongation (certain classes) â€” ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities", "Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening â€” discontinue if rash with blistering or mucosal involvement)"
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
    interactions: [ "Warfarin / DOACs â€” many antimicrobials alter INR; monitor coagulation closely", "Oral contraceptives â€” reduced efficacy during and 7 days after therapy; advise additional barrier contraception", "Antacids / iron / calcium / magnesium / milk products â€” reduced absorption of tetracyclines and fluoroquinolones; space dosing 2â€“4 hours apart"
],
    monitoring: "Monitor for signs of hypersensitivity, renal and hepatic function at baseline and during prolonged therapy, complete blood count for prolonged courses. Therapeutic drug monitoring required for aminoglycosides and vancomycin.",
    patient_counselling: "Complete the full course as prescribed even if symptoms improve. Do not share with others. Report any rash, severe diarrhoea, or signs of superinfection. Take at evenly spaced intervals to maintain effective drug levels.",
  },
  {
    name: "Ampicillin",
    generic_name: "Ampicillin",
    drug_class: "Antimicrobial agent",
    indications: [ "Treatment of susceptible bacterial/fungal/parasitic infections", "Empiric therapy based on local susceptibility patterns and clinical presentation", "Prophylaxis in immunocompromised patients where indicated", "Combination therapy for mixed infections or to prevent resistance development"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient in the formulation", "Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)", "Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)"
],
    side_effects: [ "Gastrointestinal disturbances: nausea, vomiting, diarrhoea (common; usually self-limiting)", "Allergic reactions: skin rash, urticaria, pruritus; rarely anaphylaxis (discontinue immediately)", "Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) â€” report persistent diarrhoea", "QT prolongation (certain classes) â€” ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities", "Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening â€” discontinue if rash with blistering or mucosal involvement)"
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
    interactions: [ "Warfarin / DOACs â€” many antimicrobials alter INR; monitor coagulation closely", "Oral contraceptives â€” reduced efficacy during and 7 days after therapy; advise additional barrier contraception", "Antacids / iron / calcium / magnesium / milk products â€” reduced absorption of tetracyclines and fluoroquinolones; space dosing 2â€“4 hours apart"
],
    monitoring: "Monitor for signs of hypersensitivity, renal and hepatic function at baseline and during prolonged therapy, complete blood count for prolonged courses. Therapeutic drug monitoring required for aminoglycosides and vancomycin.",
    patient_counselling: "Complete the full course as prescribed even if symptoms improve. Do not share with others. Report any rash, severe diarrhoea, or signs of superinfection. Take at evenly spaced intervals to maintain effective drug levels.",
  },
  {
    name: "Artemether",
    generic_name: "Artemether",
    drug_class: "Antimicrobial agent",
    indications: [ "Treatment of susceptible bacterial/fungal/parasitic infections", "Empiric therapy based on local susceptibility patterns and clinical presentation", "Prophylaxis in immunocompromised patients where indicated", "Combination therapy for mixed infections or to prevent resistance development"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient in the formulation", "Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)", "Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)"
],
    side_effects: [ "Gastrointestinal disturbances: nausea, vomiting, diarrhoea (common; usually self-limiting)", "Allergic reactions: skin rash, urticaria, pruritus; rarely anaphylaxis (discontinue immediately)", "Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) â€” report persistent diarrhoea", "QT prolongation (certain classes) â€” ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities", "Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening â€” discontinue if rash with blistering or mucosal involvement)"
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
    interactions: [ "Warfarin / DOACs â€” many antimicrobials alter INR; monitor coagulation closely", "Oral contraceptives â€” reduced efficacy during and 7 days after therapy; advise additional barrier contraception", "Antacids / iron / calcium / magnesium / milk products â€” reduced absorption of tetracyclines and fluoroquinolones; space dosing 2â€“4 hours apart"
],
    monitoring: "Monitor for signs of hypersensitivity, renal and hepatic function at baseline and during prolonged therapy, complete blood count for prolonged courses. Therapeutic drug monitoring required for aminoglycosides and vancomycin.",
    patient_counselling: "Complete the full course as prescribed even if symptoms improve. Do not share with others. Report any rash, severe diarrhoea, or signs of superinfection. Take at evenly spaced intervals to maintain effective drug levels.",
  },
  {
    name: "Artesunate",
    generic_name: "Artesunate",
    drug_class: "Antimicrobial agent",
    indications: [ "Treatment of susceptible bacterial/fungal/parasitic infections", "Empiric therapy based on local susceptibility patterns and clinical presentation", "Prophylaxis in immunocompromised patients where indicated", "Combination therapy for mixed infections or to prevent resistance development"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient in the formulation", "Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)", "Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)"
],
    side_effects: [ "Gastrointestinal disturbances: nausea, vomiting, diarrhoea (common; usually self-limiting)", "Allergic reactions: skin rash, urticaria, pruritus; rarely anaphylaxis (discontinue immediately)", "Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) â€” report persistent diarrhoea", "QT prolongation (certain classes) â€” ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities", "Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening â€” discontinue if rash with blistering or mucosal involvement)"
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
    interactions: [ "Warfarin / DOACs â€” many antimicrobials alter INR; monitor coagulation closely", "Oral contraceptives â€” reduced efficacy during and 7 days after therapy; advise additional barrier contraception", "Antacids / iron / calcium / magnesium / milk products â€” reduced absorption of tetracyclines and fluoroquinolones; space dosing 2â€“4 hours apart"
],
    monitoring: "Monitor for signs of hypersensitivity, renal and hepatic function at baseline and during prolonged therapy, complete blood count for prolonged courses. Therapeutic drug monitoring required for aminoglycosides and vancomycin.",
    patient_counselling: "Complete the full course as prescribed even if symptoms improve. Do not share with others. Report any rash, severe diarrhoea, or signs of superinfection. Take at evenly spaced intervals to maintain effective drug levels.",
  },
  {
    name: "Atazanavir",
    generic_name: "Atazanavir",
    drug_class: "Antimicrobial agent",
    indications: [ "Treatment of susceptible bacterial/fungal/parasitic infections", "Empiric therapy based on local susceptibility patterns and clinical presentation", "Prophylaxis in immunocompromised patients where indicated", "Combination therapy for mixed infections or to prevent resistance development"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient in the formulation", "Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)", "Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)"
],
    side_effects: [ "Gastrointestinal disturbances: nausea, vomiting, diarrhoea (common; usually self-limiting)", "Allergic reactions: skin rash, urticaria, pruritus; rarely anaphylaxis (discontinue immediately)", "Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) â€” report persistent diarrhoea", "QT prolongation (certain classes) â€” ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities", "Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening â€” discontinue if rash with blistering or mucosal involvement)"
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
    interactions: [ "Warfarin / DOACs â€” many antimicrobials alter INR; monitor coagulation closely", "Oral contraceptives â€” reduced efficacy during and 7 days after therapy; advise additional barrier contraception", "Antacids / iron / calcium / magnesium / milk products â€” reduced absorption of tetracyclines and fluoroquinolones; space dosing 2â€“4 hours apart"
],
    monitoring: "Monitor for signs of hypersensitivity, renal and hepatic function at baseline and during prolonged therapy, complete blood count for prolonged courses. Therapeutic drug monitoring required for aminoglycosides and vancomycin.",
    patient_counselling: "Complete the full course as prescribed even if symptoms improve. Do not share with others. Report any rash, severe diarrhoea, or signs of superinfection. Take at evenly spaced intervals to maintain effective drug levels.",
  },
  {
    name: "Benzyl Benzoate",
    generic_name: "Benzyl Benzoate",
    drug_class: "Antimicrobial agent",
    indications: [ "Treatment of susceptible bacterial/fungal/parasitic infections", "Empiric therapy based on local susceptibility patterns and clinical presentation", "Prophylaxis in immunocompromised patients where indicated", "Combination therapy for mixed infections or to prevent resistance development"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient in the formulation", "Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)", "Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)"
],
    side_effects: [ "Gastrointestinal disturbances: nausea, vomiting, diarrhoea (common; usually self-limiting)", "Allergic reactions: skin rash, urticaria, pruritus; rarely anaphylaxis (discontinue immediately)", "Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) â€” report persistent diarrhoea", "QT prolongation (certain classes) â€” ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities", "Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening â€” discontinue if rash with blistering or mucosal involvement)"
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
    interactions: [ "Warfarin / DOACs â€” many antimicrobials alter INR; monitor coagulation closely", "Oral contraceptives â€” reduced efficacy during and 7 days after therapy; advise additional barrier contraception", "Antacids / iron / calcium / magnesium / milk products â€” reduced absorption of tetracyclines and fluoroquinolones; space dosing 2â€“4 hours apart"
],
    monitoring: "Monitor for signs of hypersensitivity, renal and hepatic function at baseline and during prolonged therapy, complete blood count for prolonged courses. Therapeutic drug monitoring required for aminoglycosides and vancomycin.",
    patient_counselling: "Complete the full course as prescribed even if symptoms improve. Do not share with others. Report any rash, severe diarrhoea, or signs of superinfection. Take at evenly spaced intervals to maintain effective drug levels.",
  },
  {
    name: "Benzylpenicillin",
    generic_name: "Benzylpenicillin",
    drug_class: "Antimicrobial agent",
    indications: [ "Treatment of susceptible bacterial/fungal/parasitic infections", "Empiric therapy based on local susceptibility patterns and clinical presentation", "Prophylaxis in immunocompromised patients where indicated", "Combination therapy for mixed infections or to prevent resistance development"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient in the formulation", "Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)", "Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)"
],
    side_effects: [ "Gastrointestinal disturbances: nausea, vomiting, diarrhoea (common; usually self-limiting)", "Allergic reactions: skin rash, urticaria, pruritus; rarely anaphylaxis (discontinue immediately)", "Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) â€” report persistent diarrhoea", "QT prolongation (certain classes) â€” ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities", "Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening â€” discontinue if rash with blistering or mucosal involvement)"
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
    interactions: [ "Warfarin / DOACs â€” many antimicrobials alter INR; monitor coagulation closely", "Oral contraceptives â€” reduced efficacy during and 7 days after therapy; advise additional barrier contraception", "Antacids / iron / calcium / magnesium / milk products â€” reduced absorption of tetracyclines and fluoroquinolones; space dosing 2â€“4 hours apart"
],
    monitoring: "Monitor for signs of hypersensitivity, renal and hepatic function at baseline and during prolonged therapy, complete blood count for prolonged courses. Therapeutic drug monitoring required for aminoglycosides and vancomycin.",
    patient_counselling: "Complete the full course as prescribed even if symptoms improve. Do not share with others. Report any rash, severe diarrhoea, or signs of superinfection. Take at evenly spaced intervals to maintain effective drug levels.",
  },
  {
    name: "Cefazolin",
    generic_name: "Cefazolin",
    drug_class: "Antimicrobial agent",
    indications: [ "Treatment of susceptible bacterial/fungal/parasitic infections", "Empiric therapy based on local susceptibility patterns and clinical presentation", "Prophylaxis in immunocompromised patients where indicated", "Combination therapy for mixed infections or to prevent resistance development"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient in the formulation", "Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)", "Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)"
],
    side_effects: [ "Gastrointestinal disturbances: nausea, vomiting, diarrhoea (common; usually self-limiting)", "Allergic reactions: skin rash, urticaria, pruritus; rarely anaphylaxis (discontinue immediately)", "Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) â€” report persistent diarrhoea", "QT prolongation (certain classes) â€” ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities", "Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening â€” discontinue if rash with blistering or mucosal involvement)"
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
    interactions: [ "Warfarin / DOACs â€” many antimicrobials alter INR; monitor coagulation closely", "Oral contraceptives â€” reduced efficacy during and 7 days after therapy; advise additional barrier contraception", "Antacids / iron / calcium / magnesium / milk products â€” reduced absorption of tetracyclines and fluoroquinolones; space dosing 2â€“4 hours apart"
],
    monitoring: "Monitor for signs of hypersensitivity, renal and hepatic function at baseline and during prolonged therapy, complete blood count for prolonged courses. Therapeutic drug monitoring required for aminoglycosides and vancomycin.",
    patient_counselling: "Complete the full course as prescribed even if symptoms improve. Do not share with others. Report any rash, severe diarrhoea, or signs of superinfection. Take at evenly spaced intervals to maintain effective drug levels.",
  },
  {
    name: "Cefepime",
    generic_name: "Cefepime",
    drug_class: "Antimicrobial agent",
    indications: [ "Treatment of susceptible bacterial/fungal/parasitic infections", "Empiric therapy based on local susceptibility patterns and clinical presentation", "Prophylaxis in immunocompromised patients where indicated", "Combination therapy for mixed infections or to prevent resistance development"
],
    contraindications: [ "Hypersensitivity to active substance or any excipient in the formulation", "Severe renal impairment (dose adjustment or contraindication depending on drug and degree of impairment)", "Severe hepatic impairment (dose adjustment or contraindication depending on hepatic metabolism)"
],
    side_effects: [ "Gastrointestinal disturbances: nausea, vomiting, diarrhoea (common; usually self-limiting)", "Allergic reactions: skin rash, urticaria, pruritus; rarely anaphylaxis (discontinue immediately)", "Antimicrobial-associated diarrhoea / Clostridioides difficile infection (pseudomembranous colitis) â€” report persistent diarrhoea", "QT prolongation (certain classes) â€” ECG monitoring if concurrent QT-prolonging drugs or electrolyte abnormalities", "Hypersensitivity reactions: Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but life-threatening â€” discontinue if rash with blistering or mucosal involvement)"
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
    interactions: [ "Warfarin / DOACs â€” many antimicrobials alter INR; monitor coagulation closely", "Oral contraceptives â€” reduced efficacy during and 7 days after therapy; advise additional barrier contraception", "Antacids / iron / calcium / magnesium / milk products â€” reduced absorption of tetracyclines and fluoroquinolones; space dosing 2â€“4 hours apart"
],
    monitoring: "Monitor for signs of hypersensitivity, renal and hepatic function at baseline and during prolonged therapy, complete blood count for prolonged courses. Therapeutic drug monitoring required for aminoglycosides and vancomycin.",
    patient_counselling: "Complete the full course as prescribed even if symptoms improve. Do not share with others. Report any rash, severe diarrhoea, or signs of superinfection. Take at evenly spaced intervals to maintain effective drug levels.",
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
  console.log(`\nBatch 17 complete: ${success} inserted, ${failed} failed`);
}

main().catch(console.error);