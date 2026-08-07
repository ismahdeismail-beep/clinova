// Per-subclass color system for the Kenya Drug Index (KDI) drill-down.
//
// Level 2/3 of the browse flow previously painted every subclass card and every
// monograph card inside a category with the category's single color. This module
// gives each pharmacological subclass its own relatable hue (beta-lactams in the
// red family, antivirals in the purple/indigo family, antifungals in teal/cyan,
// diuretics in amber, ...) so adjacent monographs are visually distinct while
// related subclasses still share a color family.

export interface SubclassColorConfig {
  card: string
  hover: string
  tile: string
  text: string
}

const PALETTE: Record<string, SubclassColorConfig> = {
  red: {
    card: 'from-[var(--surface)] to-red-500/10',
    hover: 'hover:border-red-400 hover:shadow-lg hover:shadow-red-500/10',
    tile: 'from-red-500 to-rose-500',
    text: 'text-red-600 dark:text-red-400',
  },
  rose: {
    card: 'from-[var(--surface)] to-rose-500/10',
    hover: 'hover:border-rose-400 hover:shadow-lg hover:shadow-rose-500/10',
    tile: 'from-rose-500 to-pink-500',
    text: 'text-rose-600 dark:text-rose-400',
  },
  orange: {
    card: 'from-[var(--surface)] to-orange-500/10',
    hover: 'hover:border-orange-400 hover:shadow-lg hover:shadow-orange-500/10',
    tile: 'from-orange-500 to-amber-500',
    text: 'text-orange-600 dark:text-orange-400',
  },
  amber: {
    card: 'from-[var(--surface)] to-amber-500/10',
    hover: 'hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10',
    tile: 'from-amber-500 to-yellow-500',
    text: 'text-amber-600 dark:text-amber-400',
  },
  yellow: {
    card: 'from-[var(--surface)] to-yellow-500/10',
    hover: 'hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/10',
    tile: 'from-yellow-500 to-amber-400',
    text: 'text-yellow-600 dark:text-yellow-400',
  },
  lime: {
    card: 'from-[var(--surface)] to-lime-500/10',
    hover: 'hover:border-lime-400 hover:shadow-lg hover:shadow-lime-500/10',
    tile: 'from-lime-500 to-green-500',
    text: 'text-lime-600 dark:text-lime-400',
  },
  green: {
    card: 'from-[var(--surface)] to-green-500/10',
    hover: 'hover:border-green-400 hover:shadow-lg hover:shadow-green-500/10',
    tile: 'from-green-500 to-emerald-500',
    text: 'text-green-600 dark:text-green-400',
  },
  emerald: {
    card: 'from-[var(--surface)] to-emerald-500/10',
    hover: 'hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10',
    tile: 'from-emerald-500 to-teal-500',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  teal: {
    card: 'from-[var(--surface)] to-teal-500/10',
    hover: 'hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/10',
    tile: 'from-teal-500 to-cyan-600',
    text: 'text-teal-600 dark:text-teal-400',
  },
  cyan: {
    card: 'from-[var(--surface)] to-cyan-500/10',
    hover: 'hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10',
    tile: 'from-cyan-500 to-sky-500',
    text: 'text-cyan-600 dark:text-cyan-400',
  },
  sky: {
    card: 'from-[var(--surface)] to-sky-500/10',
    hover: 'hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/10',
    tile: 'from-sky-500 to-cyan-500',
    text: 'text-sky-600 dark:text-sky-400',
  },
  blue: {
    card: 'from-[var(--surface)] to-blue-500/10',
    hover: 'hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10',
    tile: 'from-blue-500 to-indigo-500',
    text: 'text-blue-600 dark:text-blue-400',
  },
  indigo: {
    card: 'from-[var(--surface)] to-indigo-500/10',
    hover: 'hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10',
    tile: 'from-indigo-500 to-violet-500',
    text: 'text-indigo-600 dark:text-indigo-400',
  },
  violet: {
    card: 'from-[var(--surface)] to-violet-500/10',
    hover: 'hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/10',
    tile: 'from-violet-500 to-purple-500',
    text: 'text-violet-600 dark:text-violet-400',
  },
  purple: {
    card: 'from-[var(--surface)] to-purple-500/10',
    hover: 'hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/10',
    tile: 'from-purple-500 to-fuchsia-500',
    text: 'text-purple-600 dark:text-purple-400',
  },
  fuchsia: {
    card: 'from-[var(--surface)] to-fuchsia-500/10',
    hover: 'hover:border-fuchsia-400 hover:shadow-lg hover:shadow-fuchsia-500/10',
    tile: 'from-fuchsia-500 to-pink-500',
    text: 'text-fuchsia-600 dark:text-fuchsia-400',
  },
  pink: {
    card: 'from-[var(--surface)] to-pink-500/10',
    hover: 'hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/10',
    tile: 'from-pink-500 to-rose-500',
    text: 'text-pink-600 dark:text-pink-400',
  },
  slate: {
    card: 'from-[var(--surface)] to-slate-500/10',
    hover: 'hover:border-slate-400 hover:shadow-lg hover:shadow-slate-500/10',
    tile: 'from-slate-500 to-slate-600',
    text: 'text-slate-600 dark:text-slate-400',
  },
}

// Explicit per-subclass color assignment — grouped so related subclasses share
// a color family (relatable) while each subclass stays visually distinct.
const SUBCLASS_COLOR_KEY: Record<string, string> = {
  // ── Anti-infectives — red/orange family for beta-lactams, purple for antivirals, teal for antifungals
  Penicillins: 'red',
  Cephalosporins: 'orange',
  Carbapenems: 'amber',
  Macrolides: 'rose',
  Aminoglycosides: 'pink',
  Tetracyclines: 'fuchsia',
  Fluoroquinolones: 'violet',
  Antimalarials: 'lime',
  'Sulfonamides & folate inhibitors': 'yellow',
  'Anti-MRSA agents': 'indigo',
  'Antivirals (HIV)': 'purple',
  'Antivirals (herpes, flu & other)': 'blue',
  'Antifungals (azoles)': 'teal',
  'Antifungals (polyenes & other)': 'cyan',
  'Antituberculars & antileprosy': 'green',
  Anthelmintics: 'emerald',
  'Nitroimidazoles & antiprotozoals': 'violet',
  'Other antibiotics': 'slate',
  'Antiseptics & disinfectants': 'sky',

  // ── Cardiovascular — rose family for RAAS/HR control, amber for volume, fuchsia for clotting
  'ACE inhibitors': 'rose',
  'Angiotensin receptor blockers': 'rose',
  'Beta-blockers': 'pink',
  'Calcium channel blockers': 'red',
  Diuretics: 'amber',
  'Statins & lipid-lowering': 'orange',
  Antiarrhythmics: 'violet',
  'Nitrates & anti-anginals': 'fuchsia',
  'Inotropes & vasopressors': 'cyan',
  'Alpha-blockers & central agents': 'teal',
  'Vasodilators & PAH agents': 'sky',
  'Anticoagulant reversal & haemostatics': 'yellow',
  'Immunosuppressants & transplant agents': 'green',
  'Other cardiovascular agents': 'slate',

  // ── Central Nervous System — violet family, stimulants amber
  'Antidepressants (SSRIs & SNRIs)': 'violet',
  'Antidepressants (tricyclics & others)': 'purple',
  Antipsychotics: 'indigo',
  'Mood stabilisers & antiepileptics': 'blue',
  'Anxiolytics & hypnotics': 'sky',
  'Sedatives & hypnotics (non-benzodiazepine)': 'cyan',
  'Anti-Parkinson agents': 'teal',
  'Antimigraine agents': 'fuchsia',
  'Stimulants & ADHD agents': 'amber',
  'Drugs for dementia & cognition': 'orange',
  'Antispastics & neuromuscular agents': 'emerald',
  'Addiction & substance-use agents': 'lime',

  // ── Analgesics — red for opioids, orange for NSAIDs
  Opioids: 'red',
  NSAIDs: 'orange',
  'Paracetamol & other simple analgesics': 'amber',
  'Antimigraine agents (triptans & ergots)': 'fuchsia',
  'Muscle relaxants & antispastics': 'violet',
  'Topical & local analgesics': 'cyan',
  'Other analgesics': 'slate',

  // ── Gastrointestinal — emerald family for acid suppression
  'Proton pump inhibitors': 'emerald',
  'H2 antagonists': 'green',
  'Antacids & alginates': 'teal',
  'Antiemetics & prokinetics': 'violet',
  Laxatives: 'amber',
  Antidiarrhoeals: 'orange',
  'Antispasmodics (GI)': 'fuchsia',
  'Ulcer protectants & other GI agents': 'lime',
  'Other gastrointestinal agents': 'slate',

  // ── Respiratory — sky family for bronchodilators
  'Inhaled corticosteroids': 'sky',
  'Beta-2 agonists (short-acting)': 'cyan',
  'Beta-2 agonists (long-acting)': 'teal',
  'Antimuscarinics (anticholinergics)': 'blue',
  'Leukotriene modifiers & mast-cell stabilisers': 'indigo',
  Antihistamines: 'pink',
  'Antitussives & mucolytics': 'rose',
  'Biologics & targeted asthma agents': 'violet',
  'Respiratory stimulants & other agents': 'amber',
  'Other respiratory agents': 'slate',

  // ── Anticoagulants — fuchsia/rose family
  Heparins: 'rose',
  'Vitamin K antagonists': 'amber',
  'Direct oral anticoagulants': 'fuchsia',
  Antiplatelets: 'red',
  Thrombolytics: 'indigo',
  'Antithrombin agents & other': 'teal',

  // ── Oncology — indigo/violet family
  'Alkylating agents': 'indigo',
  Antimetabolites: 'violet',
  'Antitumour antibiotics': 'fuchsia',
  'Taxanes & vinca alkaloids': 'purple',
  'Kinase inhibitors & targeted therapy': 'blue',
  'Hormonal agents & antihormones': 'pink',
  'Topoisomerase inhibitors': 'cyan',
  'Miscellaneous antineoplastics': 'slate',

  // ── Immunology — green family
  'Corticosteroids (systemic)': 'amber',
  'DMARDs (disease-modifying antirheumatic drugs)': 'green',
  'Biologic DMARDs & targeted agents': 'indigo',
  'Immunosuppressants (transplant & autoimmunity)': 'violet',
  'Immunoglobulins & vaccines': 'teal',
  'Immunostimulants & interferons': 'sky',

  // ── Dermatology
  'Topical corticosteroids': 'amber',
  'Antifungals (topical)': 'teal',
  'Antibacterials (topical)': 'red',
  'Antivirals (topical)': 'violet',
  'Acne & rosacea agents': 'rose',
  'Eczema, psoriasis & emollients': 'green',
  'Antiseborrheic & antidandruff agents': 'cyan',
  'Hair & nail preparations': 'pink',
  'Other dermatologicals': 'slate',

  // ── Renal/Electrolytes — teal family
  'Potassium & potassium-sparing agents': 'rose',
  'Calcium & calcium-modifying agents': 'amber',
  'Magnesium & other electrolytes': 'teal',
  'Fluid & dialysis agents': 'sky',
  'Renal bone disease & metabolic agents': 'lime',
  'Diuretics & carbonic anhydrase inhibitors': 'cyan',
  'Antigout agents': 'violet',

  // ── Nutrition/Vitamins — lime/amber family
  'Iron & haematinics': 'red',
  'Folic acid & B-vitamins': 'amber',
  'Vitamin A, D & fat-soluble vitamins': 'orange',
  'Vitamin C & antioxidants': 'lime',
  'Trace elements & minerals': 'teal',
  'Enteral & parenteral nutrition': 'sky',
  'Other nutritional supplements': 'slate',

  // ── Endocrine — amber family for glucose, violet for thyroid
  Insulins: 'amber',
  'Oral antidiabetics': 'orange',
  'Thyroid hormones': 'violet',
  'Antithyroid agents': 'indigo',
  'Bisphosphonates & bone agents': 'teal',
  'Sex hormones & contraceptives': 'pink',
  'Gonadotropins & reproductive agents': 'fuchsia',
  'Uterotonics & labour agents': 'rose',
  'Pituitary & other endocrine agents': 'green',

  // ── Anaesthesia — violet/cyan family
  'General anaesthetics (intravenous)': 'violet',
  'General anaesthetics (inhalational)': 'cyan',
  'Local anaesthetics': 'amber',
  'Neuromuscular blockers': 'indigo',
  'Anaesthesia adjuncts & reversal agents': 'teal',

  // ── Ophthalmology — teal family
  'Glaucoma agents': 'teal',
  'Mydriatics & cycloplegics': 'violet',
  'Ocular anti-infectives': 'red',
  'Ocular anti-inflammatories': 'amber',
  'Lubricants & other ocular agents': 'sky',

  // ── Toxicology/Antidotes — yellow family
  'Opioid reversal': 'red',
  'Poison-specific antidotes': 'yellow',
  'Anticholinergic reversal & general': 'orange',

  // ── General
  'Benzodiazepines & related (general)': 'violet',
  'Antimuscarinics & anticholinergics (general)': 'teal',
  'Sympathomimetics & vasoactive agents': 'rose',
  'Anti-inflammatory agents': 'amber',
  'Other general agents': 'slate',
}

const FALLBACK_KEYS = [
  'slate', 'violet', 'teal', 'amber', 'sky', 'emerald', 'rose', 'indigo',
  'cyan', 'lime', 'orange', 'fuchsia', 'blue', 'pink', 'green', 'yellow', 'red',
]

function hashCode(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

/** Color config for a subclass — explicit relatable mapping with a deterministic hash fallback. */
export function getSubclassColor(subclass: string): SubclassColorConfig {
  const key = SUBCLASS_COLOR_KEY[subclass] ?? FALLBACK_KEYS[hashCode(subclass) % FALLBACK_KEYS.length]
  return PALETTE[key] ?? PALETTE.slate
}
