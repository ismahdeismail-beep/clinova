// ================================================================
// Clinova Clinical Case Generator
// Generates 850+ curriculum-mapped clinical cases with Kenyan
// localization (patient names, settings, healthcare context)
// ================================================================

import * as fs from 'fs';
import * as path from 'path';

// ================================================================
// Kenyan Patient Name Database (diverse, fictional)
// ================================================================

const KENYAN_FIRST_NAMES_MALE = [
  'James', 'Peter', 'John', 'Samuel', 'Daniel', 'David', 'Joseph', 'Brian',
  'Kevin', 'Michael', 'Stephen', 'Paul', 'Charles', 'Simon', 'Patrick',
  'Kenneth', 'Edward', 'George', 'Francis', 'Robert', 'William', 'Thomas',
  'Philip', 'Andrew', 'Christopher', 'Anthony', 'Nicholas', 'Erick',
  'Vincent', 'Bernard', 'Duncan', 'Collins', 'Felix', 'Dennis', 'Alex',
  'Moses', 'Abraham', 'Isaac', 'Jacob', 'Elijah', 'Timothy', 'Lucas',
  'Mark', 'Mathew', 'Luke', 'Raymond', 'Dominic', 'Martin', 'Henry',
  'Lawrence', 'Benson', 'Cyrus', 'Elvis', 'Fredrick', 'Geoffrey',
  'Harrison', 'Ian', 'Joel', 'Kelvin', 'Leonard', 'Morris',
];

const KENYAN_FIRST_NAMES_FEMALE = [
  'Grace', 'Faith', 'Mercy', 'Esther', 'Lucy', 'Mary', 'Margaret', 'Jane',
  'Sarah', 'Ruth', 'Elizabeth', 'Ann', 'Alice', 'Rose', 'Agnes', 'Nancy',
  'Joyce', 'Catherine', 'Dorothy', 'Monica', 'Teresa', 'Veronica', 'Rebecca',
  'Deborah', 'Naomi', 'Judith', 'Lillian', 'Florence', 'Emily', 'Hannah',
  'Sophia', 'Victoria', 'Caroline', 'Diana', 'Lydia', 'Martha', 'Patricia',
  'Susan', 'Brenda', 'Sharon', 'Cynthia', 'Doris', 'Eunice', 'Gladys',
  'Helen', 'Irene', 'Jackline', 'Linet', 'Millicent', 'Phyllis',
];

const KENYAN_LAST_NAMES = [
  'Mwangi', 'Wanjiku', 'Kiptoo', 'Atieno', 'Otieno', 'Chebet', 'Kiprono',
  'Akinyi', 'Mutiso', 'Njeri', 'Kamau', 'Ochieng', 'Wambui', 'Njoroge',
  'Kiprop', 'Kosgei', 'Kipkemboi', 'Toroitich', 'Koech', 'Kirui',
  'Omondi', 'Odhiambo', 'Wanjala', 'Barasa', 'Wekesa', 'Wafula',
  'Kimutai', 'Kipkorir', 'Kemei', 'Mibei', 'Ngetich', 'Langat',
  'Mutua', 'Mbithe', 'Munyao', 'Muema', 'Nzomo', 'Ndung\'u',
  'Gachiri', 'Njoroge', 'Chege', 'Wanyama', 'Sitati', 'Maloba',
  'Oduor', 'Obiero', 'Nyongesa', 'Wakhungu', 'Mukhongo', 'Okoth',
  'Kemboi', 'Bett', 'Yegen', 'Cheruiyot', 'Rono', 'Kangogo',
];

const KENYAN_LOCATIONS = [
  'Nairobi', 'Kisumu', 'Mombasa', 'Eldoret', 'Nakuru', 'Machakos',
  'Nyeri', 'Meru', 'Thika', 'Kitale', 'Kakamega', 'Nanyuki',
  'Malindi', 'Narok', 'Embu', 'Busia', 'Bungoma', 'Garissa',
  'Isiolo', 'Kilifi', 'Lamu', 'Lodwar', 'Marsabit', 'Voi',
  'Murang\'a', 'Naivasha', 'Kericho', 'Nandi Hills', 'Kisii',
  'Migori', 'Homa Bay', 'Siaya', 'Kendu Bay', 'Ukunda',
];

const KENYAN_SETTINGS = [
  'Kenyatta National Hospital', 'Moi Teaching and Referral Hospital',
  'Kenyatta University Teaching Hospital', 'Aga Khan University Hospital',
  'Nairobi Hospital', 'Mater Hospital', 'MP Shah Hospital',
  'Kakamega County Referral Hospital', 'Kisumu County Referral Hospital',
  'Coast General Teaching and Referral Hospital',
  'Nyeri County Referral Hospital', 'Embu Level 5 Hospital',
  'Thika Level 5 Hospital', 'Machakos Level 5 Hospital',
  'Kitale County Referral Hospital', 'Busia County Referral Hospital',
  'Nakuru Level 5 Hospital', 'Eldoret Teaching and Referral Hospital',
  'Meru Level 5 Hospital', 'Malindi Sub-County Hospital',
  'Naivasha Sub-County Hospital', 'Murang\'a County Hospital',
  'Nanyuki Cottage Hospital', 'Garissa Provincial Hospital',
  'JOOTRH Kisumu', 'Kapkatet Hospital', 'Tenwek Hospital',
  'Kijabe Mission Hospital', 'PCEA Kikuyu Hospital',
  'Community Pharmacy - Westlands', 'Community Pharmacy - CBD',
  'Kitui County Referral Hospital', 'Narok County Hospital',
];

// ================================================================
// Helper: Random selection utilities
// ================================================================

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, arr.length));
}

function randomAge(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roundTo(val: number, decimals: number): number {
  return parseFloat(val.toFixed(decimals));
}

// ================================================================
// Patient Profile Generator
// ================================================================

interface PatientProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  gender: 'male' | 'female';
  age: number;
  weight: number;
  location: string;
  setting: string;
  occupation: string;
}

const MALE_OCCUPATIONS = ['Teacher', 'Farmer', 'Businessman', 'Driver', 'Security Guard', 'Mechanic', 'Carpenter', 'Civil Servant', 'Police Officer', 'Electrician', 'Plumber', 'Chef', 'Soldier', 'Office Clerk', 'Lecturer'];
const FEMALE_OCCUPATIONS = ['Teacher', 'Housewife', 'Nurse', 'Businesswoman', 'Secretary', 'Tailor', 'Hairdresser', 'Civil Servant', 'Shop Attendant', 'Farmer', 'Receptionist', 'Cleaner', 'Social Worker', 'Lecturer', 'Bank Teller'];

function generatePatient(): PatientProfile {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const firstName = gender === 'male' ? pick(KENYAN_FIRST_NAMES_MALE) : pick(KENYAN_FIRST_NAMES_FEMALE);
  const lastName = pick(KENYAN_LAST_NAMES);
  const occupations = gender === 'male' ? MALE_OCCUPATIONS : FEMALE_OCCUPATIONS;

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    gender,
    age: randomAge(18, 85),
    weight: gender === 'male' ? randomAge(55, 95) : randomAge(45, 80),
    location: pick(KENYAN_LOCATIONS),
    setting: pick(KENYAN_SETTINGS),
    occupation: pick(occupations),
  };
}

// ================================================================
// Vital Signs Generator (age-appropriate)
// ================================================================

interface VitalSigns {
  hr: number;
  bpSystolic: number;
  bpDiastolic: number;
  rr: number;
  temp: number;
  spo2: number;
}

function generateVitals(condition: 'normal' | 'abnormal' | 'critical' = 'abnormal'): VitalSigns {
  switch (condition) {
    case 'normal':
      return {
        hr: randomAge(60, 85),
        bpSystolic: randomAge(110, 130),
        bpDiastolic: randomAge(70, 85),
        rr: randomAge(12, 18),
        temp: roundTo(36.5 + Math.random() * 0.5, 1),
        spo2: randomAge(96, 100),
      };
    case 'critical':
      return {
        hr: randomAge(110, 150),
        bpSystolic: randomAge(70, 90),
        bpDiastolic: randomAge(40, 60),
        rr: randomAge(24, 40),
        temp: roundTo(38.5 + Math.random() * 1.5, 1),
        spo2: randomAge(82, 91),
      };
    default: // abnormal
      return {
        hr: randomAge(90, 115),
        bpSystolic: randomAge(90, 160),
        bpDiastolic: randomAge(60, 100),
        rr: randomAge(18, 28),
        temp: roundTo(37.5 + Math.random() * 1.5, 1),
        spo2: randomAge(88, 95),
      };
  }
}

function vitalsString(v: VitalSigns): string {
  return `HR: ${v.hr} bpm, BP: ${v.bpSystolic}/${v.bpDiastolic} mmHg, RR: ${v.rr} breaths/min, Temp: ${v.temp}°C, SpO2: ${v.spo2}%`;
}

// ================================================================
// Clinical Case Type Definition
// ================================================================

export interface ClinicalCaseTemplate {
  pharmacologySubject: string;
  specialty: string;
  disease: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  chiefComplaintTemplate: string;
  hpiTemplate: string;
  pmhTemplate: string;
  medHxTemplate: string;
  peTemplate: string;
  labsTemplate: string;
  imagingTemplate?: string;
  diagnosis: string;
  ddx: string[];
  goalsTemplate: string;
  pharmTemplate: string;
  nonPharmTemplate: string;
  carePlanTemplate: string;
  dtpsTemplate: string;
  monitoringTemplate: string;
  counsellingTemplate: string;
  followUpTemplate: string;
  pearlsTemplate: string;
  references: string[];
}

// ================================================================
// Case Generator — Converts template + patient into full case
// ================================================================

export function generateCaseFromTemplate(
  tpl: ClinicalCaseTemplate,
  id: string,
  patient: PatientProfile,
): string {
  const v = generateVitals(tpl.difficulty === 'Advanced' ? 'critical' : 'abnormal');

  // Safely serialize a string as a JS string literal (escapes quotes, newlines, etc.)
  const q = (s: string): string => JSON.stringify(s);
  // Safely serialize an array of strings as a JS array literal
  const qa = (arr: string[]): string => `[${arr.map(q).join(', ')}]`;

  const fields = {
    id: q(id),
    pharmacologySubject: q(tpl.pharmacologySubject),
    specialty: q(tpl.specialty),
    disease: q(tpl.disease),
    title: q(tpl.title.replace('{name}', patient.fullName).replace('{age}', patient.age.toString()).replace('{location}', patient.location)),
    difficulty: q(tpl.difficulty),
    demographics: q(`${patient.fullName}, ${patient.age}-year-old ${patient.gender}, ${patient.weight} kg, ${patient.occupation} from ${patient.location}`),
    chiefComplaint: q(tpl.chiefComplaintTemplate.replace(/{name}/g, patient.fullName)),
    hpi: q(tpl.hpiTemplate.replace(/{name}/g, patient.fullName).replace(/{age}/g, patient.age.toString()).replace(/{occupation}/g, patient.occupation).replace(/{location}/g, patient.location)),
    pmh: q(tpl.pmhTemplate),
    medHx: q(tpl.medHxTemplate),
    allergies: q(Math.random() > 0.8 ? 'Penicillin (rash)' : 'NKDA'),
    pe: q(tpl.peTemplate),
    vitals: q(vitalsString(v)),
    labs: q(tpl.labsTemplate),
    imaging: tpl.imagingTemplate ? q(tpl.imagingTemplate) : undefined,
    diagnosis: q(tpl.diagnosis),
    ddx: qa(tpl.ddx),
    goals: q(tpl.goalsTemplate),
    pharm: q(tpl.pharmTemplate),
    nonPharm: q(tpl.nonPharmTemplate),
    carePlan: q(tpl.carePlanTemplate),
    dtps: q(tpl.dtpsTemplate),
    monitoring: q(tpl.monitoringTemplate),
    counselling: q(tpl.counsellingTemplate),
    followUp: q(tpl.followUpTemplate),
    pearls: q(tpl.pearlsTemplate),
    references: qa(tpl.references),
    createdAt: `new Date().toISOString()`,
    status: q('published'),
    createdBy: q('system'),
    createdByName: q('Clinical Faculty'),
  };

  // Build object string without optional undefined fields
  const lines: string[] = ['  {'];
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined) continue;
    lines.push(`    ${key}: ${value},`);
  }
  lines.push('  },');
  return lines.join('\n');
}

// ================================================================
// Write a batch of cases to a file
// ================================================================

export function writeBatchFile(
  filename: string,
  cases: string[],
  batchExportName: string,
): void {
  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const content = `// Auto-generated clinical cases batch
// Pharmacology Subject: ${batchExportName}
// All patients are fictional Kenyan identities created for educational purposes

import type { ClinicalCase } from '../clinicalCasesData';

export const ${batchExportName}: ClinicalCase[] = [
${cases.join('\n')}
];
`;

  fs.writeFileSync(filename, content, 'utf-8');
  console.log(`Written ${cases.length} cases to ${filename}`);
}

// ================================================================
// Utility: Generate multiple cases from one template
// ================================================================

export function generateCasesFromTemplate(
  tpl: ClinicalCaseTemplate,
  count: number,
  startId: number,
): string[] {
  const cases: string[] = [];

  for (let i = 0; i < count; i++) {
    // Vary the template slightly per case to make cases unique
    const variantTpl: ClinicalCaseTemplate = {
      ...tpl,
      title: i > 0 ? `${tpl.title} — Variant ${i + 1}` : tpl.title,
      pmhTemplate: i > 0 ? `${tpl.pmhTemplate}. Also has ${['Type 2 Diabetes', 'Hypertension', 'Dyslipidaemia', 'Obesity', 'Hypothyroidism'][Math.floor(Math.random() * 5)]}.` : tpl.pmhTemplate,
    };
    const patient = generatePatient();
    const id = `case-${startId + i}`;
    cases.push(generateCaseFromTemplate(variantTpl, id, patient));
  }

  return cases;
}

export { generatePatient, vitalsString };
