/**
 * seed-drug-monographs-batch18.ts
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
    name: "Cefixime",
    generic_name: "Cefixime",
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
    name: "Cefotaxime",
    generic_name: "Cefotaxime",
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
    name: "Ceftriaxone",
    generic_name: "Ceftriaxone",
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
    name: "Cefuroxime",
    generic_name: "Cefuroxime",
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
    name: "Chloroquine",
    generic_name: "Chloroquine",
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
    name: "Clarithromycin",
    generic_name: "Clarithromycin",
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
    name: "Clindamycin",
    generic_name: "Clindamycin",
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
    name: "Clotrimazole",
    generic_name: "Clotrimazole",
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
    name: "Daclatasvir",
    generic_name: "Daclatasvir",
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
    name: "Daptomycin",
    generic_name: "Daptomycin",
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
    name: "Darunavir",
    generic_name: "Darunavir",
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
    name: "Efavirenz",
    generic_name: "Efavirenz",
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
    name: "Entecavir",
    generic_name: "Entecavir",
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
    name: "Erythromycin",
    generic_name: "Erythromycin",
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
    name: "Ethambutol",
    generic_name: "Ethambutol",
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
    name: "Flucloxacillin",
    generic_name: "Flucloxacillin",
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
    name: "Fluoroquinolone",
    generic_name: "Fluoroquinolone",
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
    name: "Fosfomycin",
    generic_name: "Fosfomycin",
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
    name: "Ganciclovir",
    generic_name: "Ganciclovir",
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
    name: "Griseofulvin",
    generic_name: "Griseofulvin",
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
    name: "Hydroxychloroquine",
    generic_name: "Hydroxychloroquine",
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
    name: "Imipenem",
    generic_name: "Imipenem",
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
    name: "Itraconazole",
    generic_name: "Itraconazole",
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
    name: "Ivermectin",
    generic_name: "Ivermectin",
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
    name: "Ketoconazole",
    generic_name: "Ketoconazole",
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
    name: "Lamivudine",
    generic_name: "Lamivudine",
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
    name: "Levofloxacin",
    generic_name: "Levofloxacin",
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
    name: "Linezolid",
    generic_name: "Linezolid",
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
    name: "Lopinavir",
    generic_name: "Lopinavir",
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
    name: "Lumefantrine",
    generic_name: "Lumefantrine",
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
    name: "Lymecycline",
    generic_name: "Lymecycline",
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
    name: "Malathion",
    generic_name: "Malathion",
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
    name: "Mebendazole",
    generic_name: "Mebendazole",
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
    name: "Meropenem",
    generic_name: "Meropenem",
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
    name: "Miconazole",
    generic_name: "Miconazole",
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
    name: "Moxifloxacin",
    generic_name: "Moxifloxacin",
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
    name: "Neomycin",
    generic_name: "Neomycin",
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
    name: "Nevirapine",
    generic_name: "Nevirapine",
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
    name: "Norfloxacin",
    generic_name: "Norfloxacin",
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
    name: "Nystatin",
    generic_name: "Nystatin",
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
  console.log(`\nBatch 18 complete: ${success} inserted, ${failed} failed`);
}

main().catch(console.error);