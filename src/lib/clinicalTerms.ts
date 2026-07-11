// Curated high-frequency medicine names used to highlight drug mentions inside
// clinical prose and link them to the Drug Index. Kept intentionally conservative
// to limit false positives (e.g. only full, distinctive names).

export const COMMON_DRUGS: string[] = [
  'Adrenaline', 'Epinephrine', 'Noradrenaline', 'Norepinephrine', 'Dopamine', 'Dobutamine',
  'Amiodarone', 'Adenosine', 'Atropine', 'Digoxin', 'Verapamil',
  'Aspirin', 'Paracetamol', 'Ibuprofen', 'Morphine', 'Fentanyl', 'Codeine', 'Tramadol', 'Pethidine',
  'Metformin', 'Insulin', 'Glibenclamide', 'Glipizide', 'Gliclazide',
  'Enalapril', 'Lisinopril', 'Ramipril', 'Captopril', 'Perindopril',
  'Losartan', 'Valsartan', 'Candesartan', 'Irbesartan',
  'Amlodipine', 'Nifedipine', 'Felodipine', 'Diltiazem', 'Nimodipine',
  'Bisoprolol', 'Metoprolol', 'Atenolol', 'Carvedilol', 'Propranolol',
  'Furosemide', 'Bumetanide', 'Hydrochlorothiazide', 'Spironolactone', 'Indapamide',
  'Warfarin', 'Heparin', 'Enoxaparin', 'Clopidogrel', 'Ticagrelor',
  'Rivaroxaban', 'Apixaban', 'Dabigatran', 'Edoxaban',
  'Simvastatin', 'Atorvastatin', 'Rosuvastatin', 'Pravastatin',
  'Omeprazole', 'Pantoprazole', 'Esomeprazole', 'Ranitidine', 'Famotidine',
  'Ondansetron', 'Metoclopramide', 'Domperidone',
  'Salbutamol', 'Salmeterol', 'Terbutaline', 'Beclometasone', 'Budesonide', 'Fluticasone',
  'Prednisolone', 'Hydrocortisone', 'Dexamethasone', 'Methylprednisolone',
  'Amoxicillin', 'Co-amoxiclav', 'Flucloxacillin', 'Benzylpenicillin', 'Phenoxymethylpenicillin',
  'Ceftriaxone', 'Cefalexin', 'Meropenem', 'Imipenem', 'Piperacillin',
  'Gentamicin', 'Amikacin', 'Vancomycin', 'Ciprofloxacin', 'Levofloxacin', 'Azithromycin', 'Clarithromycin',
  'Co-trimoxazole', 'Trimethoprim', 'Nitrofurantoin',
  'Acyclovir', 'Valaciclovir', 'Oseltamivir', 'Fluconazole', 'Flucytosine', 'Amphotericin',
  'Isoniazid', 'Rifampicin', 'Pyrazinamide', 'Ethambutol', 'Streptomycin',
  'Tenofovir', 'Efavirenz', 'Lamivudine', 'Zidovudine', 'Nevirapine', 'Dolutegravir', 'Lopinavir',
  'Artemether', 'Lumefantrine', 'Quinine', 'Chloroquine', 'Hydroxychloroquine', 'Artesunate', 'Primaquine',
  'Diazepam', 'Midazolam', 'Lorazepam', 'Phenytoin', 'Sodium valproate', 'Carbamazepine', 'Levetiracetam',
  'Propofol', 'Thiopental', 'Ketamine', 'Etomidate',
  'Suxamethonium', 'Vecuronium', 'Rocuronium', 'Atracurium', 'Mivacurium',
  'Magnesium sulphate', 'Magnesium sulfate', 'Calcium gluconate', 'Potassium chloride', 'Sodium bicarbonate',
  'Activated charcoal', 'Naloxone', 'Flumazenil', 'Glucagon', 'Neostigmine',
  'Nitroglycerin', 'Isosorbide mononitrate', 'Hydralazine', 'Labetalol', 'Methyldopa',
  'Tamsulosin', 'Finasteride', 'Sildenafil', 'Alteplase', 'Streptokinase',
  'Methotrexate', 'Azathioprine', 'Cyclophosphamide', 'Mycophenolate',
  'Levothyroxine', 'Carbimazole', 'Propylthiouracil',
  'Allopurinol', 'Colchicine', 'Febuxostat', 'Diclofenac', 'Naproxen',
  'Oxycodone', 'Gabapentin', 'Pregabalin',
];

export function extractMedicines(text: string): string[] {
  const found = new Set<string>();
  const lower = text.toLowerCase();
  for (const d of COMMON_DRUGS) {
    if (lower.includes(d.toLowerCase())) found.add(d);
  }
  return [...found];
}
