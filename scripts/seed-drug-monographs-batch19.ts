/**
 * seed-drug-monographs-batch19.ts
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
    name: "Ofloxacin",
    generic_name: "Ofloxacin",
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
    name: "Oseltamivir",
    generic_name: "Oseltamivir",
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
    name: "Penicillin",
    generic_name: "Penicillin",
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
    name: "Permethrin",
    generic_name: "Permethrin",
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
    name: "Phenoxymethylpenicillin",
    generic_name: "Phenoxymethylpenicillin",
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
    name: "Praziquantel",
    generic_name: "Praziquantel",
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
    name: "Primaquine",
    generic_name: "Primaquine",
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
    name: "Pyrazinamide",
    generic_name: "Pyrazinamide",
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
    name: "Pyrimethamine",
    generic_name: "Pyrimethamine",
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
    name: "Quinine",
    generic_name: "Quinine",
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
    name: "Raltegravir",
    generic_name: "Raltegravir",
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
    name: "Ribavirin",
    generic_name: "Ribavirin",
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
    name: "Ritonavir",
    generic_name: "Ritonavir",
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
    name: "Sofosbuvir",
    generic_name: "Sofosbuvir",
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
    name: "Streptomycin",
    generic_name: "Streptomycin",
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
    name: "Sulfadoxine",
    generic_name: "Sulfadoxine",
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
    name: "Teicoplanin",
    generic_name: "Teicoplanin",
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
    name: "Terbinafine",
    generic_name: "Terbinafine",
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
    name: "Tetracycline",
    generic_name: "Tetracycline",
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
    name: "Tobramycin",
    generic_name: "Tobramycin",
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
    name: "Valaciclovir",
    generic_name: "Valaciclovir",
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
    name: "Vancomycin",
    generic_name: "Vancomycin",
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
    name: "Voriconazole",
    generic_name: "Voriconazole",
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
    name: "Zidovudine",
    generic_name: "Zidovudine",
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
    name: "Apixaban",
    generic_name: "Apixaban",
    drug_class: "Anticoagulant / antithrombotic agent",
    indications: [ "Atrial fibrillation (stroke prevention)", "Venous thromboembolism treatment and prophylaxis (DVT, PE)", "Mechanical heart valve thromboprophylaxis", "Acute coronary syndrome (dual antiplatelet therapy)"
],
    contraindications: [ "Active pathological bleeding / bleeding diathesis", "Severe uncontrolled hypertension", "Recent intracranial haemorrhage / spinal surgery / CNS tumour", "Severe hepatic impairment with coagulopathy", "Concurrent anticoagulant therapy (changeover protocols only)", "Pregnancy (warfarin teratogenic; LMWH preferred)"
],
    side_effects: [ "Bleeding (major: intracranial, GI, retroperitoneal; minor: epistaxis, bruising, haematuria, gingival)", "Heparin-induced thrombocytopenia (HIT) â€” immune-mediated; monitor platelets", "Osteoporosis (long-term heparin use)", "Skin necrosis / purple toe syndrome (warfarin)", "Dyspepsia, GI disturbances (antiplatelets)"
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
    interactions: [ "NSAIDs / aspirin â€” significantly increased bleeding risk; avoid combination", "Antiplatelets (clopidogrel, ticagrelor) â€” additive bleeding risk; use only if clearly indicated", "Antifungals (azoles) â€” altered anticoagulant metabolism", "Antibiotics â€” altered gut flora (warfarin) â€” increased INR; frequent monitoring", "Herbal: St John's Wort (reduced efficacy), ginkgo, ginger, garlic (increased bleeding risk)"
],
    monitoring: "Warfarin: INR monitoring at least weekly until stable, then every 4â€“6 weeks. DOACs: renal function at baseline and annually (more frequent if eGFR <60). Antiplatelets: bleeding risk assessment. All: Hb, signs of occult blood loss. HIT screening (heparin/LMWH â€” platelets every 2â€“3 days).",
    patient_counselling: "Watch for signs of bleeding: unusual bruising, blood in urine/stool, black tarry stools, prolonged bleeding from cuts, coughing blood. Seek immediate help for severe headache, vision changes, or weakness (possible intracranial bleed). Carry anticoagulant card. Avoid NSAIDs. Consistent vitamin K intake for warfarin. Do not double dose if missed (DOACs: take if within 12 hours of missed dose).",
  },
  {
    name: "Clopidogrel",
    generic_name: "Clopidogrel",
    drug_class: "Anticoagulant / antithrombotic agent",
    indications: [ "Atrial fibrillation (stroke prevention)", "Venous thromboembolism treatment and prophylaxis (DVT, PE)", "Mechanical heart valve thromboprophylaxis", "Acute coronary syndrome (dual antiplatelet therapy)"
],
    contraindications: [ "Active pathological bleeding / bleeding diathesis", "Severe uncontrolled hypertension", "Recent intracranial haemorrhage / spinal surgery / CNS tumour", "Severe hepatic impairment with coagulopathy", "Concurrent anticoagulant therapy (changeover protocols only)", "Pregnancy (warfarin teratogenic; LMWH preferred)"
],
    side_effects: [ "Bleeding (major: intracranial, GI, retroperitoneal; minor: epistaxis, bruising, haematuria, gingival)", "Heparin-induced thrombocytopenia (HIT) â€” immune-mediated; monitor platelets", "Osteoporosis (long-term heparin use)", "Skin necrosis / purple toe syndrome (warfarin)", "Dyspepsia, GI disturbances (antiplatelets)"
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
    interactions: [ "NSAIDs / aspirin â€” significantly increased bleeding risk; avoid combination", "Antiplatelets (clopidogrel, ticagrelor) â€” additive bleeding risk; use only if clearly indicated", "Antifungals (azoles) â€” altered anticoagulant metabolism", "Antibiotics â€” altered gut flora (warfarin) â€” increased INR; frequent monitoring", "Herbal: St John's Wort (reduced efficacy), ginkgo, ginger, garlic (increased bleeding risk)"
],
    monitoring: "Warfarin: INR monitoring at least weekly until stable, then every 4â€“6 weeks. DOACs: renal function at baseline and annually (more frequent if eGFR <60). Antiplatelets: bleeding risk assessment. All: Hb, signs of occult blood loss. HIT screening (heparin/LMWH â€” platelets every 2â€“3 days).",
    patient_counselling: "Watch for signs of bleeding: unusual bruising, blood in urine/stool, black tarry stools, prolonged bleeding from cuts, coughing blood. Seek immediate help for severe headache, vision changes, or weakness (possible intracranial bleed). Carry anticoagulant card. Avoid NSAIDs. Consistent vitamin K intake for warfarin. Do not double dose if missed (DOACs: take if within 12 hours of missed dose).",
  },
  {
    name: "Dabigatran",
    generic_name: "Dabigatran",
    drug_class: "Anticoagulant / antithrombotic agent",
    indications: [ "Atrial fibrillation (stroke prevention)", "Venous thromboembolism treatment and prophylaxis (DVT, PE)", "Mechanical heart valve thromboprophylaxis", "Acute coronary syndrome (dual antiplatelet therapy)"
],
    contraindications: [ "Active pathological bleeding / bleeding diathesis", "Severe uncontrolled hypertension", "Recent intracranial haemorrhage / spinal surgery / CNS tumour", "Severe hepatic impairment with coagulopathy", "Concurrent anticoagulant therapy (changeover protocols only)", "Pregnancy (warfarin teratogenic; LMWH preferred)"
],
    side_effects: [ "Bleeding (major: intracranial, GI, retroperitoneal; minor: epistaxis, bruising, haematuria, gingival)", "Heparin-induced thrombocytopenia (HIT) â€” immune-mediated; monitor platelets", "Osteoporosis (long-term heparin use)", "Skin necrosis / purple toe syndrome (warfarin)", "Dyspepsia, GI disturbances (antiplatelets)"
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
    interactions: [ "NSAIDs / aspirin â€” significantly increased bleeding risk; avoid combination", "Antiplatelets (clopidogrel, ticagrelor) â€” additive bleeding risk; use only if clearly indicated", "Antifungals (azoles) â€” altered anticoagulant metabolism", "Antibiotics â€” altered gut flora (warfarin) â€” increased INR; frequent monitoring", "Herbal: St John's Wort (reduced efficacy), ginkgo, ginger, garlic (increased bleeding risk)"
],
    monitoring: "Warfarin: INR monitoring at least weekly until stable, then every 4â€“6 weeks. DOACs: renal function at baseline and annually (more frequent if eGFR <60). Antiplatelets: bleeding risk assessment. All: Hb, signs of occult blood loss. HIT screening (heparin/LMWH â€” platelets every 2â€“3 days).",
    patient_counselling: "Watch for signs of bleeding: unusual bruising, blood in urine/stool, black tarry stools, prolonged bleeding from cuts, coughing blood. Seek immediate help for severe headache, vision changes, or weakness (possible intracranial bleed). Carry anticoagulant card. Avoid NSAIDs. Consistent vitamin K intake for warfarin. Do not double dose if missed (DOACs: take if within 12 hours of missed dose).",
  },
  {
    name: "Enoxaparin",
    generic_name: "Enoxaparin",
    drug_class: "Anticoagulant / antithrombotic agent",
    indications: [ "Atrial fibrillation (stroke prevention)", "Venous thromboembolism treatment and prophylaxis (DVT, PE)", "Mechanical heart valve thromboprophylaxis", "Acute coronary syndrome (dual antiplatelet therapy)"
],
    contraindications: [ "Active pathological bleeding / bleeding diathesis", "Severe uncontrolled hypertension", "Recent intracranial haemorrhage / spinal surgery / CNS tumour", "Severe hepatic impairment with coagulopathy", "Concurrent anticoagulant therapy (changeover protocols only)", "Pregnancy (warfarin teratogenic; LMWH preferred)"
],
    side_effects: [ "Bleeding (major: intracranial, GI, retroperitoneal; minor: epistaxis, bruising, haematuria, gingival)", "Heparin-induced thrombocytopenia (HIT) â€” immune-mediated; monitor platelets", "Osteoporosis (long-term heparin use)", "Skin necrosis / purple toe syndrome (warfarin)", "Dyspepsia, GI disturbances (antiplatelets)"
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
    interactions: [ "NSAIDs / aspirin â€” significantly increased bleeding risk; avoid combination", "Antiplatelets (clopidogrel, ticagrelor) â€” additive bleeding risk; use only if clearly indicated", "Antifungals (azoles) â€” altered anticoagulant metabolism", "Antibiotics â€” altered gut flora (warfarin) â€” increased INR; frequent monitoring", "Herbal: St John's Wort (reduced efficacy), ginkgo, ginger, garlic (increased bleeding risk)"
],
    monitoring: "Warfarin: INR monitoring at least weekly until stable, then every 4â€“6 weeks. DOACs: renal function at baseline and annually (more frequent if eGFR <60). Antiplatelets: bleeding risk assessment. All: Hb, signs of occult blood loss. HIT screening (heparin/LMWH â€” platelets every 2â€“3 days).",
    patient_counselling: "Watch for signs of bleeding: unusual bruising, blood in urine/stool, black tarry stools, prolonged bleeding from cuts, coughing blood. Seek immediate help for severe headache, vision changes, or weakness (possible intracranial bleed). Carry anticoagulant card. Avoid NSAIDs. Consistent vitamin K intake for warfarin. Do not double dose if missed (DOACs: take if within 12 hours of missed dose).",
  },
  {
    name: "Heparin",
    generic_name: "Heparin",
    drug_class: "Anticoagulant / antithrombotic agent",
    indications: [ "Atrial fibrillation (stroke prevention)", "Venous thromboembolism treatment and prophylaxis (DVT, PE)", "Mechanical heart valve thromboprophylaxis", "Acute coronary syndrome (dual antiplatelet therapy)"
],
    contraindications: [ "Active pathological bleeding / bleeding diathesis", "Severe uncontrolled hypertension", "Recent intracranial haemorrhage / spinal surgery / CNS tumour", "Severe hepatic impairment with coagulopathy", "Concurrent anticoagulant therapy (changeover protocols only)", "Pregnancy (warfarin teratogenic; LMWH preferred)"
],
    side_effects: [ "Bleeding (major: intracranial, GI, retroperitoneal; minor: epistaxis, bruising, haematuria, gingival)", "Heparin-induced thrombocytopenia (HIT) â€” immune-mediated; monitor platelets", "Osteoporosis (long-term heparin use)", "Skin necrosis / purple toe syndrome (warfarin)", "Dyspepsia, GI disturbances (antiplatelets)"
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
    interactions: [ "NSAIDs / aspirin â€” significantly increased bleeding risk; avoid combination", "Antiplatelets (clopidogrel, ticagrelor) â€” additive bleeding risk; use only if clearly indicated", "Antifungals (azoles) â€” altered anticoagulant metabolism", "Antibiotics â€” altered gut flora (warfarin) â€” increased INR; frequent monitoring", "Herbal: St John's Wort (reduced efficacy), ginkgo, ginger, garlic (increased bleeding risk)"
],
    monitoring: "Warfarin: INR monitoring at least weekly until stable, then every 4â€“6 weeks. DOACs: renal function at baseline and annually (more frequent if eGFR <60). Antiplatelets: bleeding risk assessment. All: Hb, signs of occult blood loss. HIT screening (heparin/LMWH â€” platelets every 2â€“3 days).",
    patient_counselling: "Watch for signs of bleeding: unusual bruising, blood in urine/stool, black tarry stools, prolonged bleeding from cuts, coughing blood. Seek immediate help for severe headache, vision changes, or weakness (possible intracranial bleed). Carry anticoagulant card. Avoid NSAIDs. Consistent vitamin K intake for warfarin. Do not double dose if missed (DOACs: take if within 12 hours of missed dose).",
  },
  {
    name: "Rivaroxaban",
    generic_name: "Rivaroxaban",
    drug_class: "Anticoagulant / antithrombotic agent",
    indications: [ "Atrial fibrillation (stroke prevention)", "Venous thromboembolism treatment and prophylaxis (DVT, PE)", "Mechanical heart valve thromboprophylaxis", "Acute coronary syndrome (dual antiplatelet therapy)"
],
    contraindications: [ "Active pathological bleeding / bleeding diathesis", "Severe uncontrolled hypertension", "Recent intracranial haemorrhage / spinal surgery / CNS tumour", "Severe hepatic impairment with coagulopathy", "Concurrent anticoagulant therapy (changeover protocols only)", "Pregnancy (warfarin teratogenic; LMWH preferred)"
],
    side_effects: [ "Bleeding (major: intracranial, GI, retroperitoneal; minor: epistaxis, bruising, haematuria, gingival)", "Heparin-induced thrombocytopenia (HIT) â€” immune-mediated; monitor platelets", "Osteoporosis (long-term heparin use)", "Skin necrosis / purple toe syndrome (warfarin)", "Dyspepsia, GI disturbances (antiplatelets)"
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
    interactions: [ "NSAIDs / aspirin â€” significantly increased bleeding risk; avoid combination", "Antiplatelets (clopidogrel, ticagrelor) â€” additive bleeding risk; use only if clearly indicated", "Antifungals (azoles) â€” altered anticoagulant metabolism", "Antibiotics â€” altered gut flora (warfarin) â€” increased INR; frequent monitoring", "Herbal: St John's Wort (reduced efficacy), ginkgo, ginger, garlic (increased bleeding risk)"
],
    monitoring: "Warfarin: INR monitoring at least weekly until stable, then every 4â€“6 weeks. DOACs: renal function at baseline and annually (more frequent if eGFR <60). Antiplatelets: bleeding risk assessment. All: Hb, signs of occult blood loss. HIT screening (heparin/LMWH â€” platelets every 2â€“3 days).",
    patient_counselling: "Watch for signs of bleeding: unusual bruising, blood in urine/stool, black tarry stools, prolonged bleeding from cuts, coughing blood. Seek immediate help for severe headache, vision changes, or weakness (possible intracranial bleed). Carry anticoagulant card. Avoid NSAIDs. Consistent vitamin K intake for warfarin. Do not double dose if missed (DOACs: take if within 12 hours of missed dose).",
  },
  {
    name: "Ticagrelor",
    generic_name: "Ticagrelor",
    drug_class: "Anticoagulant / antithrombotic agent",
    indications: [ "Atrial fibrillation (stroke prevention)", "Venous thromboembolism treatment and prophylaxis (DVT, PE)", "Mechanical heart valve thromboprophylaxis", "Acute coronary syndrome (dual antiplatelet therapy)"
],
    contraindications: [ "Active pathological bleeding / bleeding diathesis", "Severe uncontrolled hypertension", "Recent intracranial haemorrhage / spinal surgery / CNS tumour", "Severe hepatic impairment with coagulopathy", "Concurrent anticoagulant therapy (changeover protocols only)", "Pregnancy (warfarin teratogenic; LMWH preferred)"
],
    side_effects: [ "Bleeding (major: intracranial, GI, retroperitoneal; minor: epistaxis, bruising, haematuria, gingival)", "Heparin-induced thrombocytopenia (HIT) â€” immune-mediated; monitor platelets", "Osteoporosis (long-term heparin use)", "Skin necrosis / purple toe syndrome (warfarin)", "Dyspepsia, GI disturbances (antiplatelets)"
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
    interactions: [ "NSAIDs / aspirin â€” significantly increased bleeding risk; avoid combination", "Antiplatelets (clopidogrel, ticagrelor) â€” additive bleeding risk; use only if clearly indicated", "Antifungals (azoles) â€” altered anticoagulant metabolism", "Antibiotics â€” altered gut flora (warfarin) â€” increased INR; frequent monitoring", "Herbal: St John's Wort (reduced efficacy), ginkgo, ginger, garlic (increased bleeding risk)"
],
    monitoring: "Warfarin: INR monitoring at least weekly until stable, then every 4â€“6 weeks. DOACs: renal function at baseline and annually (more frequent if eGFR <60). Antiplatelets: bleeding risk assessment. All: Hb, signs of occult blood loss. HIT screening (heparin/LMWH â€” platelets every 2â€“3 days).",
    patient_counselling: "Watch for signs of bleeding: unusual bruising, blood in urine/stool, black tarry stools, prolonged bleeding from cuts, coughing blood. Seek immediate help for severe headache, vision changes, or weakness (possible intracranial bleed). Carry anticoagulant card. Avoid NSAIDs. Consistent vitamin K intake for warfarin. Do not double dose if missed (DOACs: take if within 12 hours of missed dose).",
  },
  {
    name: "Adenosine",
    generic_name: "Adenosine",
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
    name: "Adrenaline",
    generic_name: "Adrenaline",
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
    name: "Amiodarone",
    generic_name: "Amiodarone",
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
    name: "Amlodipine",
    generic_name: "Amlodipine",
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
    name: "Bisoprolol",
    generic_name: "Bisoprolol",
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
    name: "Bumetanide",
    generic_name: "Bumetanide",
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
    name: "Candesartan",
    generic_name: "Candesartan",
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
    name: "Carvedilol",
    generic_name: "Carvedilol",
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
    name: "Diltiazem",
    generic_name: "Diltiazem",
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
  console.log(`\nBatch 19 complete: ${success} inserted, ${failed} failed`);
}

main().catch(console.error);