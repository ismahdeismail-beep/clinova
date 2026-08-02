// Therapeutic-category classification for the Kenya Drug Index (KDI).
//
// The Supabase `drug_classes` table stores granular names (e.g. "Analgesic agent",
// "Antimicrobial agent", "Antineoplastic / chemotherapeutic agent") that do not
// match the app's 16 browse categories ("Analgesics", "Anti-infectives", ...).
// This module maps every drug to exactly one browse category using ordered
// keyword rules, so category cards and counts are always derived from the
// drug's own class/name data (never hardcoded).

export const THERAPEUTIC_CATEGORIES = [
  'Anti-infectives',
  'Cardiovascular',
  'Central Nervous System',
  'Analgesics',
  'Gastrointestinal',
  'Endocrine',
  'Respiratory',
  'Anticoagulants',
  'Oncology',
  'Immunology',
  'Dermatology',
  'Renal/Electrolytes',
  'Nutrition/Vitamins',
  'Anaesthesia',
  'Ophthalmology',
  'Toxicology/Antidotes',
  'General',
] as const

export type TherapeuticCategory = (typeof THERAPEUTIC_CATEGORIES)[number]

export interface CategoryTarget {
  name?: string | null
  generic_name?: string | null
  drug_class?: string | null
  drug_class_name?: string | null
}

// Ordered rules — the FIRST rule whose keyword matches wins.
// Order matters: Analgesics before CNS (opioids), Cardiovascular before
// Renal/Nutrition (diuretics, CCBs), Respiratory before Immunology
// (inhaled corticosteroids), Anticoagulants before everything generic.
const CATEGORY_RULES: { category: TherapeuticCategory; keywords: string[] }[] = [
  {
    category: 'Anti-infectives',
    keywords: [
      'antimicrobial', 'antibiotic', 'antibacterial', 'antifungal', 'antimycotic',
      'antiviral', 'antimalarial', 'antiparasitic', 'antiprotozoal', 'anthelmintic',
      'antitubercular', 'antileprosy', 'antiseptic', 'disinfectant', 'penicillin',
      'cephalosporin', 'carbapenem', 'macrolide', 'tetracycline', 'fluoroquinolone',
      'aminoglycoside', 'nitroimidazole', 'sulfonamide', 'sulphonamide', 'rifamycin',
      'monobactam', 'nitrofuran', 'polyene', 'echinocandin', 'azole', 'artemisinin',
      'nucleoside analog', 'nucleoside analogue', 'reverse transcriptase',
      'integrase strand', 'neuraminidase', 'antiretroviral', 'cd4-directed',
      'anti-infectives', 'antiinfective',
    ],
  },
  {
    category: 'Anticoagulants',
    keywords: [
      'anticoagulant', 'antithrombotic', 'antiplatelet', 'vitamin k antagonist',
      'thrombolytic', 'fibrinolytic', 'heparin', 'warfarin', 'clopidogrel',
    ],
  },
  {
    category: 'Analgesics',
    keywords: [
      'analgesic', 'opioid', 'nsaid', 'non-steroidal anti-inflammatory', 'antipyretic',
      'cox-1', 'cox-2', 'cyclooxygenase', 'narcotic', 'morphine', 'tramadol',
      'codeine', 'fentanyl', 'paracetamol', 'acetaminophen', 'ibuprofen',
      'diclofenac', 'naproxen', 'ketorolac', 'indomethacin', 'meloxicam',
      'piroxicam', 'celecoxib', 'etoricoxib', 'aspirin', 'pain management',
    ],
  },
  {
    category: 'Cardiovascular',
    keywords: [
      'cardiovascular', 'antihypertensive', 'beta-adrenergic', 'beta blocker',
      'beta-blocker', 'calcium channel', 'ace inhibitor', 'angiotensin', 'diuretic',
      'nitrate', 'vasodilator', 'anti-anginal', 'antianginal', 'cardiac glycoside',
      'digoxin', 'statin', 'hmg-coa', 'fibrate', 'antiarrhythmic',
      'aldosterone antagonist', 'alpha-1', 'alpha blocker', 'alpha-adrenergic',
      'sympatholytic', 'inotrope', 'vasopressor', 'pressor', 'nitroprusside',
      'ranolazine', 'ivabradine', 'sacubitril', 'tamsulosin', 'alfuzosin',
      'terazosin', 'doxazosin', 'loop diuretic', 'thiazide', 'potassium-sparing',
      'beta-1 selective', 'sotalol', 'amlodipine', 'nifedipine', 'lisinopril',
      'enalapril', 'losartan', 'valsartan', 'atorvastatin', 'simvastatin',
      'metoprolol', 'propranolol', 'carvedilol', 'bisoprolol', 'atenolol',
      'clonidine', 'methyldopa', 'hydralazine', 'isosorbide', 'nitroglycerin',
      'timolol', 'nebivolol', 'pindolol', 'labetalol', 'acebutolol', 'moexipril',
      'fosinopril', 'quinapril', 'perindopril', 'trandolapril', 'captopril',
      'irbesartan', 'olmesartan', 'azilsartan', 'telmisartan', 'eplerenone',
      'spironolactone', 'amiloride', 'triamterene', 'chlorthalidone', 'metolazone',
      'torsemide', 'furosemide', 'bumetanide', 'hydrochlorothiazide', 'indapamide',
      'verapamil', 'diltiazem', 'felodipine', 'nimodipine', 'isradipine',
      'milrinone', 'dobutamine', 'dopamine', 'adrenaline', 'epinephrine',
    ],
  },
  {
    category: 'Endocrine',
    keywords: [
      'endocrine', 'metabolic agent', 'insulin', 'hypoglycaemic', 'hypoglycemic',
      'antidiabetic', 'anti-diabetic', 'thyroid', 'antithyroid', 'thyroxine',
      'levothyroxine', 'carbimazole', 'propylthiouracil', 'sulphonylurea',
      'sulfonylurea', 'biguanide', 'metformin', 'dpp-4', 'glp-1', 'sglt2',
      'sodium-glucose', 'glibenclamide', 'glimepiride', 'gliclazide', 'glipizide',
      'pioglitazone', 'rosiglitazone', 'sitagliptin', 'empagliflozin',
      'dapagliflozin', 'canagliflozin', 'bisphosphonate', 'alendronate',
      'sex hormone', 'oestrogen', 'estrogen', 'progesterone', 'testosterone',
      'contraceptive', 'gonadotropin', 'oxytocin', 'ergometrine', 'antiandrogen',
      'finasteride', 'dutasteride', 'growth hormone', 'antidiuretic',
      'desmopressin', 'vasopressin', 'glucagon', 'pre-mixed insulin',
      'short-acting insulin', 'intermediate-acting insulin',
    ],
  },
  {
    category: 'Gastrointestinal',
    keywords: [
      'gastrointestinal', 'proton pump', 'h2 receptor', 'h2-receptor', 'antacid',
      'antiemetic', 'laxative', 'antidiarrhoeal', 'antidiarrheal', '5-ht3',
      '5-ht₃', 'ammonia-lowering', 'osmotic laxative', 'peptic', 'ulcer',
      'helicobacter', 'antispasmodic', 'antiflatulent', 'bowel', 'crohn',
      'ulcerative colitis', 'inflammatory bowel', 'omeprazole', 'esomeprazole',
      'lansoprazole', 'pantoprazole', 'rabeprazole', 'cimetidine', 'ranitidine',
      'famotidine', 'ondansetron', 'metoclopramide', 'domperidone', 'bismuth',
      'loperamide', 'oral rehydration',
    ],
  },
  {
    category: 'Respiratory',
    keywords: [
      'respiratory', 'bronchodilator', 'inhaled', 'inhaler', 'antihistamine',
      'leukotriene', 'montelukast', 'expectorant', 'mucolytic', 'antitussive',
      'decongestant', 'theophylline', 'aminophylline', 'salbutamol', 'albuterol',
      'salmeterol', 'formoterol', 'budesonide', 'fluticasone', 'ipratropium',
      'tiotropium', 'nasal', 'beclometasone', 'beclomethasone', 'xanthine',
    ],
  },
  {
    category: 'Central Nervous System',
    keywords: [
      'central nervous system', 'antiepileptic', 'anticonvulsant', 'mood stabiliser',
      'mood stabilizer', 'antipsychotic', 'antidepressant', 'anxiolytic',
      'benzodiazepine', 'hypnotic', 'sedative', 'muscle relaxant', 'antiparkinson',
      'neuromuscular', 'serotonin', 'ssri', 'snri', 'tricyclic', 'mao inhibitor',
      'stimulant', 'antimigraine', 'triptan', 'nootropic', 'diazepam', 'lorazepam',
      'alprazolam', 'clonazepam', 'phenytoin', 'carbamazepine', 'oxcarbazepine',
      'valproate', 'valproic', 'lamotrigine', 'levetiracetam', 'topiramate',
      'gabapentin', 'pregabalin', 'haloperidol', 'olanzapine', 'risperidone',
      'quetiapine', 'clozapine', 'aripiprazole', 'chlorpromazine', 'fluoxetine',
      'sertraline', 'citalopram', 'escitalopram', 'paroxetine', 'venlafaxine',
      'duloxetine', 'amitriptyline', 'imipramine', 'clomipramine', 'nortriptyline',
      'mirtazapine', 'bupropion', 'methylphenidate', 'atomoxetine', 'donepezil',
      'rivastigmine', 'memantine', 'levodopa', 'carbidopa', 'ropinirole',
      'pramipexole', 'baclofen', 'tizanidine', 'cns agent',
    ],
  },
  {
    category: 'Anaesthesia',
    keywords: [
      'anaesthetic', 'anesthetic', 'anaesthesia', 'anesthesia', 'neuromuscular blocker',
      'local anaesthetic', 'general anaesthetic', 'lidocaine', 'lignocaine',
      'bupivacaine', 'ropivacaine', 'procaine', 'prilocaine', 'ketamine',
      'propofol', 'thiopental', 'thiopentone', 'etomidate', 'sevoflurane',
      'isoflurane', 'desflurane', 'halothane', 'nitrous oxide', 'anaesthetic agent',
    ],
  },
  {
    category: 'Dermatology',
    keywords: [
      'dermatological', 'dermatology', 'topical', 'emollient', 'keratolytic',
      'scabicide', 'permethrin', 'benzoyl peroxide', 'salicylic acid',
      'dermal', 'skin', 'wound care',
    ],
  },
  {
    category: 'Oncology',
    keywords: [
      'antineoplastic', 'chemotherap', 'cytotoxic', 'tyrosine kinase',
      'checkpoint inhibitor', 'imatinib', 'dasatinib', 'nilotinib', 'tamoxifen',
      'anastrozole', 'letrozole', 'exemestane', 'capecitabine', 'fluorouracil',
      'doxorubicin', 'daunorubicin', 'epirubicin', 'idarubicin', 'cisplatin',
      'carboplatin', 'oxaliplatin', 'paclitaxel', 'docetaxel', 'vincristine',
      'vinblastine', 'etoposide', 'methotrexate',
    ],
  },
  {
    category: 'Immunology',
    keywords: [
      'immunomodulatory', 'immunosuppress', 'immunomodulator', 'biologic',
      'monoclonal antibody', 'corticosteroid', 'glucocorticoid', 'mineralocorticoid',
      'cytokine', 'immunoglobulin', 'vaccine', 'interferon', 'interleukin',
      'calcineurin', 'disease-modifying', 'dmard', 'immune', 'antithymocyte',
      'cortisone', 'prednisolone', 'prednisone', 'dexamethasone', 'hydrocortisone',
      'methylprednisolone', 'betamethasone', 'triamcinolone', 'azathioprine',
      'mycophenolate', 'cyclosporine', 'tacrolimus', 'sirolimus', 'ibalizumab',
      'adalimumab', 'infliximab', 'ustekinumab', 'etanercept', 'tocilizumab',
    ],
  },
  {
    category: 'Ophthalmology',
    keywords: [
      'ophthalmological', 'ophthalmic', 'ocular', 'intraocular', 'eye drop',
      'eye drops', 'mydriatic', 'cycloplegic', 'glaucoma', 'artificial tears',
      'latanoprost', 'travoprost', 'bimatoprost', 'dorzolamide', 'brinzolamide',
      'pilocarpine', 'tropicamide',
    ],
  },
  {
    category: 'Renal/Electrolytes',
    keywords: [
      'renal', 'electrolyte', 'carbonic anhydrase', 'phosphate binder', 'sevelamer',
      'calcium acetate', 'sodium bicarbonate', 'potassium citrate',
      'potassium chloride', 'magnesium sulfate', 'magnesium sulphate', 'urate',
      'gout', 'allopurinol', 'febuxostat', 'colchicine', 'xanthine oxidase',
      'dialysis', 'hyperkalaemia', 'hyperkalemia', 'citrate',
    ],
  },
  {
    category: 'Nutrition/Vitamins',
    keywords: [
      'nutritional', 'vitamin', 'supplement', 'mineral', 'iron', 'ferrous',
      'ferric', 'folate', 'folic', 'cobalamin', 'haematinic', 'oral iron',
      'zinc', 'calcium carbonate', 'calcium supplement', 'multivitamin',
      'parenteral nutrition', 'oral rehydration salts', 'thiamine', 'riboflavin',
      'pyridoxine', 'cyanocobalamin', 'folic acid',
    ],
  },
  {
    category: 'Toxicology/Antidotes',
    keywords: [
      'antidote', 'toxicology', 'poison', 'chelation', 'chelat', 'naloxone',
      'flumazenil', 'n-acetylcysteine', 'acetylcysteine', 'activated charcoal',
      'pralidoxime', 'deferoxamine', 'desferrioxamine', 'dimercaprol',
      'sodium thiosulfate', 'methylene blue', 'atropine', 'antivenom',
      'antivenin', 'penicillamine',
    ],
  },
]

function buildHaystack(m: CategoryTarget): string {
  return [
    m.drug_class_name,
    m.drug_class,
    m.name,
    m.generic_name,
  ]
    .filter(Boolean)
    .map((s) => String(s).toLowerCase())
    .join(' ')
}

/** Classify a drug into one browse category. Falls back to "General". */
export function getDrugCategory(m: CategoryTarget): TherapeuticCategory {
  const haystack = buildHaystack(m)
  if (haystack) {
    for (const rule of CATEGORY_RULES) {
      for (const kw of rule.keywords) {
        if (haystack.includes(kw)) return rule.category
      }
    }
  }
  return 'General'
}
