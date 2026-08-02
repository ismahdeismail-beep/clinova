// Kenyan-market brand packaging images — curated, verified product shots from
// Kenyan manufacturers/distributors (Laboratory & Allied Ltd, Nairobi).
// Generic→brand mappings were verified against Kenyan pharmacy registries
// (Pharmacy and Poisons Board listings, Kenyan e-pharmacies) so learners see
// the exact packaging they will encounter in Kenyan pharmacies.
// Images are manufacturer marketing shots (educational use with attribution).
import { LAB_ALLIED_PRODUCTS } from '../../../scripts/lab-allied-catalog'

const BRAND_IMG: Record<string, { brand: string; imageUrl: string }[]> = {
  'amoxicillin': [{ brand: 'Kemoxyl', imageUrl: LAB_ALLIED_PRODUCTS['Kemoxyl'] }],
  'enalapril': [
    { brand: 'Acepril', imageUrl: LAB_ALLIED_PRODUCTS['Acepril-5'] },
    { brand: 'Acepril (box)', imageUrl: LAB_ALLIED_PRODUCTS['Acepril-5 box'] },
  ],
  'amlodipine': [{ brand: 'Amolab', imageUrl: LAB_ALLIED_PRODUCTS['Amolab-5'] }],
  'aspirin': [{ brand: 'Aspirin', imageUrl: LAB_ALLIED_PRODUCTS['Aspirin'] }],
  'salbutamol': [
    { brand: 'Brotaline', imageUrl: LAB_ALLIED_PRODUCTS['Brotaline Syrup'] },
    { brand: 'Lastmol', imageUrl: LAB_ALLIED_PRODUCTS['Lastmol'] },
  ],
  'cetirizine': [{ brand: 'Cetriz', imageUrl: LAB_ALLIED_PRODUCTS['Cetriz'] }],
  'chlorpheniramine': [{ brand: 'Chaleate', imageUrl: LAB_ALLIED_PRODUCTS['Chaleate'] }],
  'erythromycin': [{ brand: 'Erocin', imageUrl: LAB_ALLIED_PRODUCTS['Erocin-500 tabs'] }],
  'ferrous sulfate': [{ brand: 'Ferous Sulphate', imageUrl: LAB_ALLIED_PRODUCTS['Ferous sulphate'] }],
  'haloperidol': [{ brand: 'Haloperidol', imageUrl: LAB_ALLIED_PRODUCTS['hALOPERIDOL'] }],
  'metformin': [{ brand: 'Hymet', imageUrl: LAB_ALLIED_PRODUCTS['hYMET'] }],
  'loperamide': [{ brand: 'Immolab', imageUrl: LAB_ALLIED_PRODUCTS['Immolab'] }],
  'loratadine': [{ brand: 'Lorata', imageUrl: LAB_ALLIED_PRODUCTS['Lorata'] }],
  'metoclopramide': [{ brand: 'Melasil', imageUrl: LAB_ALLIED_PRODUCTS['Melasil-10'] }],
  'aminophylline': [{ brand: 'Minoline', imageUrl: LAB_ALLIED_PRODUCTS['Minoline tin'] }],
  'ketoconazole': [{ brand: 'Nazole', imageUrl: LAB_ALLIED_PRODUCTS['Nazole'] }],
  'nifedipine': [{ brand: 'Nicardin', imageUrl: LAB_ALLIED_PRODUCTS['Nicardin'] }],
  'paracetamol': [{ brand: 'Paratal', imageUrl: LAB_ALLIED_PRODUCTS['Paratal'] }],
  'prednisolone': [{ brand: 'Pedsol', imageUrl: LAB_ALLIED_PRODUCTS['Pedsol'] }],
  'phenoxymethylpenicillin': [{ brand: 'LAe-Pen V', imageUrl: LAB_ALLIED_PRODUCTS['LAe-Pen+V'] }],
  'piroxicam': [{ brand: 'Pirocam', imageUrl: LAB_ALLIED_PRODUCTS['Pirocam 20'] }],
  'promethazine': [{ brand: 'Prometin', imageUrl: LAB_ALLIED_PRODUCTS['Prometin'] }],
  'diclofenac': [{ brand: 'Rheumac', imageUrl: LAB_ALLIED_PRODUCTS['Rheumac-50'] }],
  'metronidazole': [{ brand: 'Tricozole', imageUrl: LAB_ALLIED_PRODUCTS['Tricozole'] }],
  'fluconazole': [{ brand: 'Ucozole', imageUrl: LAB_ALLIED_PRODUCTS['Ucozole'] }],
  'azithromycin': [{ brand: 'Zerocin', imageUrl: LAB_ALLIED_PRODUCTS['Zerocin'] }],
  'mebendazole': [{ brand: 'Natoa', imageUrl: LAB_ALLIED_PRODUCTS['Natoa'] }],
}

const KE_KEYWORDS = [
  'amoxicillin', 'enalapril', 'amlodipine', 'aspirin', 'salbutamol',
  'cetirizine', 'chlorpheniramine', 'erythromycin', 'ferrous sulfate',
  'haloperidol', 'metformin', 'loperamide', 'loratadine', 'metoclopramide',
  'aminophylline', 'ketoconazole', 'nifedipine', 'paracetamol',
  'prednisolone', 'phenoxymethylpenicillin', 'piroxicam', 'promethazine',
  'diclofenac', 'metronidazole', 'fluconazole', 'azithromycin', 'mebendazole',
]

// Second active ingredients in fixed-dose combinations. A generic name that
// mentions one of these (amoxicillin/clavulanate, artemether + lumefantrine)
// is a combo product, so a single-ingredient brand image must never attach.
const COMBINATION_PARTNERS = new Set([
  'clavulanate', 'clavulanic', 'sulbactam', 'tazobactam', 'lumefantrine',
  'artemether', 'trimethoprim', 'sulfamethoxazole', 'isoniazid', 'rifampicin',
  'pyrazinamide', 'ethambutol', 'dolutegravir', 'tenofovir', 'emtricitabine',
  'lamivudine', 'abacavir', 'efavirenz', 'nevirapine', 'dapsone', 'primaquine',
])

/** Kenyan-brand packaging images for a generic name (curated + verified). */
export function kenyanBrandImagesFor(genericName: string): { brand: string; imageUrl: string }[] {
  if (!genericName) return []
  const norm = genericName.toLowerCase().replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim()
  const tokens = norm.split(' ')
  // Combination products never get a single-ingredient brand image.
  if (tokens.some((t) => COMBINATION_PARTNERS.has(t))) return []
  for (const key of KE_KEYWORDS) {
    // Word-boundary match so 'amoxicillin' never hits 'amoxicillin/clavulanate'
    if (norm === key || norm.startsWith(`${key} `) || norm.includes(` ${key} `) || norm.endsWith(` ${key}`)) {
      const entries = BRAND_IMG[key] || []
      return entries.filter((e) => e.imageUrl)
    }
  }
  return []
}

/** Does this drug have a curated Kenyan-brand packaging image? */
export function hasKenyanBrandImage(genericName: string): boolean {
  return kenyanBrandImagesFor(genericName).length > 0
}
