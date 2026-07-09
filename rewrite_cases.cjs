const fs = require('fs');

let file = fs.readFileSync('src/data/clinicalCasesData.ts', 'utf8');

file = file.replace(/export const SPECIALTIES = \[[\s\S]*?\];/, `export const SPECIALTIES = [
  'Cardiovascular Disorders',
  'Respiratory Disorders',
  'Endocrine Disorders',
  'Infectious Diseases',
  'Renal Disorders',
  'Gastrointestinal Disorders',
  'Neurological Disorders',
  'Psychiatric Disorders',
  'Hematology & Oncology',
  'Pediatrics',
  'Obstetrics & Gynecology',
  'Emergency & Critical Care'
];`);

file = file.replace(/export const DISEASES_BY_SPECIALTY: Record<string, string\[\]> = \{[\s\S]*?\};/, `export const DISEASES_BY_SPECIALTY: Record<string, string[]> = {
  'Cardiovascular Disorders': ['Hypertension', 'Heart Failure', 'Acute Coronary Syndrome', 'Stable Angina', 'Atrial Fibrillation', 'Infective Endocarditis'],
  'Respiratory Disorders': ['Asthma', 'COPD', 'Pneumonia', 'Tuberculosis', 'Pulmonary Embolism'],
  'Endocrine Disorders': ['Diabetes Mellitus', 'Diabetic Ketoacidosis', 'Hyperthyroidism', 'Hypothyroidism'],
  'Infectious Diseases': ['HIV/AIDS', 'Malaria', 'Typhoid Fever', 'Urinary Tract Infection', 'Sepsis', 'Meningitis', 'Cellulitis'],
  'Renal Disorders': ['Acute Kidney Injury', 'Chronic Kidney Disease', 'Nephrotic Syndrome'],
  'Gastrointestinal Disorders': ['GERD', 'Peptic Ulcer Disease', 'Liver Cirrhosis', 'Hepatitis', 'Acute Pancreatitis'],
  'Neurological Disorders': ['Stroke', 'Epilepsy', 'Parkinson Disease', 'Migraine'],
  'Psychiatric Disorders': ['Depression', 'Schizophrenia', 'Bipolar Disorder', 'Anxiety Disorders'],
  'Hematology & Oncology': ['Iron Deficiency Anaemia', 'Sickle Cell Disease', 'Leukemia', 'Venous Thromboembolism', 'Breast Cancer', 'Colorectal Cancer', 'Prostate Cancer', 'Chemotherapy Supportive Care'],
  'Pediatrics': ['Neonatal Sepsis', 'Childhood Pneumonia', 'Acute Diarrhea', 'Pediatric Malaria'],
  'Obstetrics & Gynecology': ['Preeclampsia', 'Eclampsia', 'Gestational Diabetes', 'Postpartum Hemorrhage'],
  'Emergency & Critical Care': ['Poisoning', 'Anaphylaxis', 'Status Epilepticus', 'Septic Shock', 'Cardiac Arrest']
};`);

// Update cases specialties to match new names
file = file.replace(/specialty: 'Cardiology'/g, "specialty: 'Cardiovascular Disorders'");
file = file.replace(/specialty: 'Respiratory Medicine'/g, "specialty: 'Respiratory Disorders'");
file = file.replace(/specialty: 'Endocrinology'/g, "specialty: 'Endocrine Disorders'");
file = file.replace(/specialty: 'Nephrology'/g, "specialty: 'Renal Disorders'");
file = file.replace(/specialty: 'Gastroenterology'/g, "specialty: 'Gastrointestinal Disorders'");
file = file.replace(/specialty: 'Neurology'/g, "specialty: 'Neurological Disorders'");
file = file.replace(/specialty: 'Psychiatry'/g, "specialty: 'Psychiatric Disorders'");
file = file.replace(/specialty: 'Hematology'/g, "specialty: 'Hematology & Oncology'");
file = file.replace(/specialty: 'Oncology'/g, "specialty: 'Hematology & Oncology'");
file = file.replace(/specialty: 'Emergency Medicine'/g, "specialty: 'Emergency & Critical Care'");

fs.writeFileSync('src/data/clinicalCasesData.ts', file);
