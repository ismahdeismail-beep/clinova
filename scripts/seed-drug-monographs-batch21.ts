/**
 * seed-drug-monographs-batch21.ts
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
    name: "Promethazine",
    generic_name: "Promethazine",
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
    name: "Rasagiline",
    generic_name: "Rasagiline",
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
    name: "Selegiline",
    generic_name: "Selegiline",
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
    name: "Sertraline",
    generic_name: "Sertraline",
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
    name: "Venlafaxine",
    generic_name: "Venlafaxine",
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
    name: "Zopiclone",
    generic_name: "Zopiclone",
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
    name: "Adapalene",
    generic_name: "Adapalene",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Anthralin",
    generic_name: "Anthralin",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Azelaic Acid",
    generic_name: "Azelaic Acid",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Bacitracin",
    generic_name: "Bacitracin",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Benzoyl Peroxide",
    generic_name: "Benzoyl Peroxide",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Betamethasone",
    generic_name: "Betamethasone",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Calamine",
    generic_name: "Calamine",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Calcipotriol",
    generic_name: "Calcipotriol",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Cetrimide",
    generic_name: "Cetrimide",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Chlorhexidine",
    generic_name: "Chlorhexidine",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Clobetasol",
    generic_name: "Clobetasol",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Coal Tar",
    generic_name: "Coal Tar",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Dapsone",
    generic_name: "Dapsone",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Dithranol",
    generic_name: "Dithranol",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Ethanol",
    generic_name: "Ethanol",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Fluocinolone",
    generic_name: "Fluocinolone",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Fusidic Acid",
    generic_name: "Fusidic Acid",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Hydrogen Peroxide",
    generic_name: "Hydrogen Peroxide",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Imiquimod",
    generic_name: "Imiquimod",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Isotretinoin",
    generic_name: "Isotretinoin",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Mometasone",
    generic_name: "Mometasone",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Mupirocin",
    generic_name: "Mupirocin",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Pimecrolimus",
    generic_name: "Pimecrolimus",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Podophyllotoxin",
    generic_name: "Podophyllotoxin",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Polymyxin B",
    generic_name: "Polymyxin B",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Potassium Permanganate",
    generic_name: "Potassium Permanganate",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Povidone-Iodine",
    generic_name: "Povidone-Iodine",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Salicylic Acid",
    generic_name: "Salicylic Acid",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Silver Sulfadiazine",
    generic_name: "Silver Sulfadiazine",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Tacrolimus",
    generic_name: "Tacrolimus",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Tazarotene",
    generic_name: "Tazarotene",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Tretinoin",
    generic_name: "Tretinoin",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Urea",
    generic_name: "Urea",
    drug_class: "Dermatological agent",
    indications: [ "Management of inflammatory skin conditions (eczema, psoriasis, dermatitis)", "Treatment of skin infections (bacterial, fungal, viral)", "Acne vulgaris management", "Skin barrier repair and protection"
],
    contraindications: [ "Hypersensitivity to active substance or excipients", "Untreated bacterial/fungal/viral infections at application site (corticosteroids)", "Skin ulceration / wounds (certain topical agents)", "Pregnancy and lactation (certain systemic agents: acitretin, isotretinoin)"
],
    side_effects: [ "Local irritation, burning, stinging, pruritus at application site", "Skin atrophy, striae, telangiectasia (prolonged topical corticosteroid use)", "Photosensitivity â€” use sun protection during treatment", "Contact dermatitis / allergic sensitization", "Skin discolouration (post-inflammatory hypo- or hyperpigmentation)"
],
    dosage: {
      "adult": {
      "Standard dosing (adult)": "Refer to current prescribing guidelines / summary of product characteristics for indication-specific dosing. Consider renal and hepatic function, age, weight, comorbidities, and concurrent medications."
    },
      "paediatric": {
      "Standard dosing (paediatric)": "Refer to current paediatric prescribing guidelines. Doses are typically weight-based (mg/kg) and age-adjusted. Verify all paediatric doses independently."
    },
      "geriatric": {
      "Standard dosing (geriatric)": "Start at lower end of dosing range; titrate slowly based on response and tolerability. Monitor renal function (CrCl) closely; many drugs require dose adjustment in elderly patients with reduced renal reserve."
    },
      "renalAdjustment": "Dose adjustment may be required depending on the drug's elimination pathway and degree of renal impairment. Check current prescribing guidelines. General principle: reduce dose or extend interval if eGFR <30 mL/min for renally cleared drugs.",
      "hepaticAdjustment": "Dose adjustment may be required for hepatically metabolized drugs in moderate-to-severe hepatic impairment (Child-Pugh B or C). Avoid hepatotoxic drugs in pre-existing liver disease where possible."

    },
    interactions: [ "Concurrent topical therapies â€” apply at different times to avoid interactions", "Systemic corticosteroids â€” additive HPA axis suppression with potent topical steroids", "Photosensitizing drugs â€” increased photosensitivity risk"
],
    monitoring: "Assess skin condition (body surface area affected, severity scores like PASI, EASI). Monitor for skin atrophy with prolonged steroid use. Assess for signs of secondary infection. Monitor growth velocity in children on potent topical steroids. For systemic agents: FBC, LFT, U&E, lipids at baseline and periodically.",
    patient_counselling: "Apply a thin layer to affected areas only. Avoid the face, groin, and axillae for potent steroids unless specifically directed. Wash hands after application. Do not use more than prescribed amount. Use emollients regularly for maintenance. Report any skin thinning, bruising, or new lesions.",
  },
  {
    name: "Alendronate",
    generic_name: "Alendronate",
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
  console.log(`\nBatch 21 complete: ${success} inserted, ${failed} failed`);
}

main().catch(console.error);