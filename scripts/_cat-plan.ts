import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'

// Plan: map bundled drug_class_name → canonical drug_classes root name.
const MAP: Record<string, string> = {
  'Anti-infectives': 'Antimicrobial agent',
  Cardiovascular: 'Cardiovascular agent',
  CNS: 'Central nervous system agent',
  Oncology: 'Antineoplastic / chemotherapeutic agent',
  Endocrine: 'Endocrine / metabolic agent',
  Analgesics: 'Analgesic agent',
  Immunology: 'Immunomodulatory / biologic agent',
  Respiratory: 'Respiratory agent',
  Gastrointestinal: 'Gastrointestinal agent',
  Dermatology: 'Dermatological agent',
  'Nutrition/Vitamins': 'Nutritional supplement / vitamin',
  Haematology: 'Therapeutic agent',
  'Renal/Electrolytes': 'Renal / electrolyte agent',
  'Toxicology/Antidotes': 'Antidote / toxicology agent',
  Ophthalmology: 'Ophthalmic agent',
  Other: 'Therapeutic agent',
}
const dist = new Map<string, number>()
for (const d of BUNDLED_DRUGS) {
  const cat = (d as any).drug_class_name ?? 'Other'
  dist.set(MAP[cat] ?? 'Therapeutic agent', (dist.get(MAP[cat] ?? 'Therapeutic agent') ?? 0) + 1)
}
for (const [k, v] of [...dist.entries()].sort((a, b) => b[1] - a[1])) console.log('  →', k.padEnd(40), v)
