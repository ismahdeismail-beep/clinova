import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DrugEntry { name: string; mentions: number }
interface CanonicalDrug { name: string; therapeuticClass: string; sourceMentions: number; status: 'seeded' | 'new' }

const CLASSIFICATION: [string, string[]][] = [
  ['Anti-infectives', [
    'Amoxicillin', 'Ampicillin', 'Co-trimoxazole', 'Ciprofloxacin', 'Moxifloxacin', 'Levofloxacin',
    'Ofloxacin', 'Norfloxacin', 'Fluoroquinolone', 'Tetracycline', 'Doxycycline', 'Lymecycline',
    'Azithromycin', 'Clarithromycin', 'Erythromycin', 'Metronidazole', 'Clindamycin', 'Vancomycin',
    'Daptomycin', 'Teicoplanin', 'Linezolid', 'Flucloxacillin', 'Penicillin', 'Phenoxymethylpenicillin',
    'Benzylpenicillin', 'Gentamicin', 'Tobramycin', 'Streptomycin', 'Neomycin', 'Fosfomycin',
    'Ceftriaxone', 'Cefixime', 'Cefuroxime', 'Cefazolin', 'Cefotaxime', 'Cefepime', 'Cephalexin',
    'Meropenem', 'Imipenem', 'Rifampicin', 'Isoniazid', 'Pyrazinamide', 'Ethambutol',
    'Artemether', 'Lumefantrine', 'Artesunate', 'Quinine', 'Primaquine', 'Chloroquine', 'Amodiaquine',
    'Sulfadoxine', 'Pyrimethamine', 'Aciclovir', 'Valaciclovir', 'Ganciclovir',
    'Oseltamivir', 'Ribavirin', 'Sofosbuvir', 'Daclatasvir', 'Entecavir',
    'Tenofovir', 'Dolutegravir', 'Nevirapine', 'Efavirenz', 'Zidovudine', 'Lamivudine',
    'Abacavir', 'Ritonavir', 'Lopinavir', 'Atazanavir', 'Darunavir', 'Raltegravir',
    'Fluconazole', 'Itraconazole', 'Voriconazole', 'Ketoconazole', 'Nystatin', 'Clotrimazole',
    'Miconazole', 'Terbinafine', 'Griseofulvin',
    'Albendazole', 'Mebendazole', 'Praziquantel', 'Ivermectin',
    'Permethrin', 'Benzyl Benzoate', 'Malathion', 'Hydroxychloroquine',
  ]],
  ['Cardiovascular', [
    'Amlodipine', 'Nifedipine', 'Felodipine', 'Bisoprolol', 'Metoprolol', 'Propranolol',
    'Nadolol', 'Atenolol', 'Carvedilol', 'Losartan', 'Candesartan', 'Valsartan',
    'Lisinopril', 'Ramipril', 'Enalapril', 'Atorvastatin', 'Simvastatin', 'Rosuvastatin',
    'Pravastatin', 'Furosemide', 'Spironolactone', 'Bumetanide', 'Hydrochlorothiazide', 'Indapamide',
    'Amiodarone', 'Lidocaine', 'Adenosine', 'Verapamil', 'Diltiazem', 'Digoxin',
    'Methyldopa', 'Hydralazine', 'Minoxidil', 'Prazosin', 'Doxazosin',
    'Adrenaline', 'Noradrenaline', 'Dobutamine', 'Dopamine', 'Milrinone',
    'Sacubitril',
  ]],
  ['Central Nervous System', [
    'Diazepam', 'Lorazepam', 'Midazolam', 'Chlordiazepoxide', 'Phenobarbital',
    'Carbamazepine', 'Lamotrigine', 'Levetiracetam', 'Amitriptyline', 'Duloxetine',
    'Milnacipran', 'Mirtazapine', 'Sertraline', 'Venlafaxine', 'Olanzapine', 'Zopiclone',
    'Pregabalin', 'Gabapentin', 'Hydroxyzine', 'Chlorphenamine', 'Cetirizine',
    'Loratadine', 'Promethazine', 'Entacapone', 'Rasagiline', 'Selegiline',
  ]],
  ['Analgesics', [
    'Morphine', 'Tramadol', 'Paracetamol', 'Ibuprofen', 'Aspirin',
    'Diclofenac', 'Naproxen', 'Indomethacin', 'Piroxicam', 'Meloxicam',
    'Celecoxib', 'Etoricoxib', 'Nimesulide',
  ]],
  ['Gastrointestinal', [
    'Omeprazole', 'Esomeprazole', 'Pantoprazole', 'Ranitidine', 'Famotidine',
    'Loperamide', 'Mesalazine', 'Sulfasalazine', 'Lactulose',
    'Metoclopramide', 'Ondansetron', 'Senna',
  ]],
  ['Endocrine', [
    'Metformin', 'Insulin', 'Carbimazole', 'Methimazole', 'Propylthiouracil',
    'Levothyroxine', 'Thyroxine', 'Desmopressin', 'Octreotide', 'Lanreotide',
    'Teriparatide', 'Calcitonin', 'Dexamethasone', 'Prednisolone', 'Hydrocortisone',
    'Methylprednisolone', 'Triamcinolone', 'Alendronate', 'Denosumab', 'Zoledronic Acid',
    'Calcitriol',
  ]],
  ['Respiratory', [
    'Salbutamol', 'Ipratropium', 'Tiotropium', 'Montelukast',
    'Beclometasone', 'Fluticasone', 'Budesonide', 'Theophylline', 'Aminophylline',
  ]],
  ['Anticoagulants', [
    'Warfarin', 'Rivaroxaban', 'Apixaban', 'Enoxaparin', 'Heparin', 'Dabigatran',
    'Clopidogrel', 'Ticagrelor',
  ]],
  ['Oncology', [
    'Cyclophosphamide', 'Doxorubicin', 'Cisplatin', 'Carboplatin', 'Oxaliplatin',
    'Paclitaxel', 'Docetaxel', 'Fluorouracil', 'Capecitabine', 'Gemcitabine', 'Pemetrexed',
    'Vincristine', 'Vinblastine', 'Bleomycin', 'Methotrexate', 'Hydroxyurea',
    'Abiraterone', 'Bicalutamide', 'Goserelin', 'Letrozole', 'Anastrozole',
    'Trastuzumab', 'Pertuzumab', 'Filgrastim', 'Pegfilgrastim', 'Leucovorin',
    'Mesna', 'Asparaginase',
  ]],
  ['Immunology', [
    'Adalimumab', 'Infliximab', 'Tocilizumab', 'Rituximab',
  ]],
  ['Renal/Electrolytes', [
    'Calcium Gluconate', 'Calcium Chloride', 'Sodium Bicarbonate', 'Magnesium Sulfate',
    'Mannitol', 'Sodium Chloride', "Ringer's Lactate", 'Water for Injection',
  ]],
  ['Dermatology', [
    'Betamethasone', 'Clobetasol', 'Fluocinolone', 'Mometasone',
    'Calcipotriol', 'Tazarotene', 'Isotretinoin', 'Tretinoin', 'Adapalene',
    'Dapsone', 'Tacrolimus', 'Pimecrolimus', 'Mupirocin', 'Fusidic Acid',
    'Silver Sulfadiazine', 'Bacitracin', 'Polymyxin B',
    'Azelaic Acid', 'Benzoyl Peroxide', 'Salicylic Acid',
    'Coal Tar', 'Calamine', 'Urea', 'Podophyllotoxin', 'Imiquimod', 'Dithranol', 'Anthralin',
    'Chlorhexidine', 'Povidone-Iodine', 'Ethanol', 'Cetrimide', 'Hydrogen Peroxide', 'Potassium Permanganate',
  ]],
  ['Toxicology/Antidotes', [
    'Activated Charcoal', 'Acetylcysteine', 'N-acetylcysteine', 'Pralidoxime',
    'Atropine', 'Antivenom', 'Flumazenil', 'Naloxone', 'Deferoxamine',
  ]],
  ['Nutrition/Vitamins', [
    'Vitamin K', 'Phytomenadione', 'Thiamine', 'Pyridoxine', 'Cyanocobalamin',
    'Folic Acid', 'Ferrous Sulphate', 'Ferrous Fumarate', 'Iron Dextran', 'Iron Sucrose',
    'Calcium Carbonate', 'Ergocalciferol', 'Cholecalciferol',
    'Multivitamins', 'Zinc Sulfate', 'ORS', 'Dextrose',
  ]],
  ['Anaesthesia', [
    'Propofol', 'Ketamine', 'Thiopental', 'Etomidate', 'Halothane', 'Isoflurane',
    'Sevoflurane', 'Desflurane', 'Nitrous Oxide',
    'Suxamethonium', 'Atracurium', 'Vecuronium', 'Rocuronium', 'Neostigmine', 'Sugammadex',
    'Bupivacaine', 'Ropivacaine', 'Prilocaine',
  ]],
  ['Ophthalmology', ['Acetazolamide']],
  ['Other', [
    'Oxybutynin', 'Tolterodine', 'Mirabegron', 'Finasteride',
    'Epoetin Alfa', 'Darbepoetin Alfa', 'Tranexamic Acid',
    'Allopurinol', 'Rasburicase',
    'Tamsulosin',
  ]],
];

const CLASS_LOOKUP: Record<string, string> = {};
for (const [cls, drugs] of CLASSIFICATION) {
  for (const drug of drugs) {
    CLASS_LOOKUP[drug] = cls;
  }
}

const SPURIOUS = new Set(['-pam', 'Done', 'Ecog', 'Metocloprazole']);

function normalizeName(name: string): string {
  return name.trim();
}

async function main() {
  const extracted: DrugEntry[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'drug-registry.json'), 'utf-8')
  );

  const seedFiles = fs.readdirSync(__dirname).filter(f => f.startsWith('seed-drug-monographs-batch'));
  const seededDrugs = new Set<string>();
  for (const fname of seedFiles) {
    const content = fs.readFileSync(path.join(__dirname, fname), 'utf-8');
    for (const line of content.split('\n')) {
      const m = line.match(/name:\s*['"]([^'"]+)['"]/);
      if (m) seededDrugs.add(m[1]);
    }
  }

  const registry: CanonicalDrug[] = [];
  const seen = new Set<string>();

  for (const drug of extracted) {
    const name = normalizeName(drug.name);
    if (SPURIOUS.has(name)) continue;

    let canonicalName = name;
    if (canonicalName === 'N-acetylcysteine') canonicalName = 'Acetylcysteine';
    if (canonicalName === 'Metocloprazole') canonicalName = 'Metoclopramide';

    if (seen.has(canonicalName)) {
      const existing = registry.find(d => d.name === canonicalName);
      if (existing) existing.sourceMentions += drug.mentions;
    } else {
      seen.add(canonicalName);
      registry.push({
        name: canonicalName,
        therapeuticClass: CLASS_LOOKUP[canonicalName] || 'Other',
        sourceMentions: drug.mentions,
        status: seededDrugs.has(canonicalName) ? 'seeded' : 'new',
      });
    }
  }

  const essentialAdditions = [
    'Ceftriaxone', 'Cefixime', 'Cefuroxime', 'Cefazolin', 'Cefotaxime', 'Cefepime',
    'Meropenem', 'Imipenem', 'Erythromycin', 'Gentamicin', 'Rifampicin', 'Isoniazid',
    'Pyrazinamide', 'Ethambutol', 'Streptomycin', 'Nevirapine', 'Efavirenz',
    'Zidovudine', 'Lamivudine', 'Abacavir', 'Ritonavir', 'Lopinavir',
    'Atazanavir', 'Darunavir', 'Raltegravir', 'Artemether', 'Lumefantrine',
    'Artesunate', 'Quinine', 'Primaquine', 'Chloroquine', 'Amodiaquine',
    'Sulfadoxine', 'Pyrimethamine', 'Aciclovir', 'Valaciclovir', 'Ganciclovir',
    'Oseltamivir', 'Sofosbuvir', 'Daclatasvir', 'Entecavir',
    'Adrenaline', 'Noradrenaline', 'Dobutamine', 'Dopamine', 'Milrinone',
    'Digoxin', 'Amiodarone', 'Lidocaine', 'Adenosine', 'Verapamil', 'Diltiazem',
    'Nifedipine', 'Felodipine', 'Methyldopa', 'Hydralazine', 'Propylthiouracil',
    'Thyroxine', 'Calcitriol', 'Folic Acid', 'Ferrous Sulphate', 'Thiamine',
    'Pyridoxine', 'Cyanocobalamin', 'Diclofenac', 'Naproxen', 'Celecoxib',
    'Chlorphenamine', 'Cetirizine', 'Loratadine', 'Promethazine',
    'Fluorouracil', 'Carboplatin', 'Oxaliplatin', 'Vincristine', 'Vinblastine',
    'Bleomycin', 'Gemcitabine', 'Mesna',
  ];

  for (const name of essentialAdditions) {
    if (!seen.has(name)) {
      seen.add(name);
      registry.push({
        name,
        therapeuticClass: CLASS_LOOKUP[name] || 'Other',
        sourceMentions: 0,
        status: seededDrugs.has(name) ? 'seeded' : 'new',
      });
    }
  }

  // Also add remaining classification drugs not yet in registry
  for (const [, drugs] of CLASSIFICATION) {
    for (const name of drugs) {
      if (!seen.has(name)) {
        seen.add(name);
        registry.push({
          name,
          therapeuticClass: CLASS_LOOKUP[name] || 'Other',
          sourceMentions: 0,
          status: seededDrugs.has(name) ? 'seeded' : 'new',
        });
      }
    }
  }

  registry.sort((a, b) => {
    if (a.therapeuticClass !== b.therapeuticClass) return a.therapeuticClass.localeCompare(b.therapeuticClass);
    return a.name.localeCompare(b.name);
  });

  fs.writeFileSync(path.join(__dirname, 'drug-registry-canonical.json'), JSON.stringify(registry, null, 2));

  const seeded = registry.filter(d => d.status === 'seeded');
  const unseeded = registry.filter(d => d.status === 'new');

  fs.writeFileSync(path.join(__dirname, 'drug-registry-seeded.txt'),
    `Drugs Already Seeded (${seeded.length})\n${'='.repeat(50)}\n` +
    seeded.map(d => `  ${d.name} (${d.therapeuticClass})`).join('\n')
  );

  fs.writeFileSync(path.join(__dirname, 'drug-registry-unseeded.txt'),
    `Drugs Needing Monographs (${unseeded.length})\n${'='.repeat(50)}\n` +
    unseeded.map(d => `  ${d.name} (${d.therapeuticClass})`).join('\n')
  );

  const byClass: Record<string, { seeded: number; unseeded: number }> = {};
  for (const d of registry) {
    if (!byClass[d.therapeuticClass]) byClass[d.therapeuticClass] = { seeded: 0, unseeded: 0 };
    byClass[d.therapeuticClass][d.status === 'seeded' ? 'seeded' : 'unseeded']++;
  }

  console.log(`\nCanonical Drug Registry Summary:`);
  console.log(`  Total drugs: ${registry.length}`);
  console.log(`  Already seeded: ${seeded.length}`);
  console.log(`  Need monographs: ${unseeded.length}`);
  console.log(`\nBy Therapeutic Class:`);
  for (const [cls, counts] of Object.entries(byClass).sort()) {
    console.log(`  ${cls}: ${counts.seeded + counts.unseeded} (${counts.seeded} seeded, ${counts.unseeded} to create)`);
  }
}

main().catch(console.error);
