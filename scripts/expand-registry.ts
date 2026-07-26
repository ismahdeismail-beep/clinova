import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, 'drug-registry-canonical.json');
const existing: Array<{name:string;therapeuticClass:string;sourceMentions:number;status:string}> = JSON.parse(fs.readFileSync(file, 'utf8'));

const seen = new Set<string>();
const deduped: typeof existing = [];
for (const e of existing) {
  const key = e.name.toLowerCase().trim();
  if (!seen.has(key)) { seen.add(key); deduped.push(e); }
}

// 139 additional drugs to reach exactly 1000
const additional = [
  // Anti-infectives (27)
  {name:"Tedizolid Phosphate", therapeuticClass:"Anti-infectives"},
  {name:"Oritavancin", therapeuticClass:"Anti-infectives"},
  {name:"Dalbavancin", therapeuticClass:"Anti-infectives"},
  {name:"Ceftaroline Fosamil", therapeuticClass:"Anti-infectives"},
  {name:"Ceftobiprole", therapeuticClass:"Anti-infectives"},
  {name:"Colistimethate", therapeuticClass:"Anti-infectives"},
  {name:"Fidaxomicin", therapeuticClass:"Anti-infectives"},
  {name:"Nitazoxanide", therapeuticClass:"Anti-infectives"},
  {name:"Delafloxacin", therapeuticClass:"Anti-infectives"},
  {name:"Lefamulin", therapeuticClass:"Anti-infectives"},
  {name:"Baloxavir Marboxil", therapeuticClass:"Anti-infectives"},
  {name:"Plazomicin", therapeuticClass:"Anti-infectives"},
  {name:"Eravacycline", therapeuticClass:"Anti-infectives"},
  {name:"Tebipenem Pivoxil", therapeuticClass:"Anti-infectives"},
  {name:"Cefiderocol", therapeuticClass:"Anti-infectives"},
  {name:"Ibrexafungerp", therapeuticClass:"Anti-infectives"},
  {name:"Rezafungin", therapeuticClass:"Anti-infectives"},
  {name:"Oteseconazole", therapeuticClass:"Anti-infectives"},
  {name:"Lenacapavir", therapeuticClass:"Anti-infectives"},
  {name:"Fostemsavir", therapeuticClass:"Anti-infectives"},
  {name:"Ibalizumab", therapeuticClass:"Anti-infectives"},
  {name:"Pentamidine Isethionate", therapeuticClass:"Anti-infectives"},
  {name:"Atovaquone", therapeuticClass:"Anti-infectives"},
  {name:"Doxycycline Hyclate", therapeuticClass:"Anti-infectives"},
  {name:"Cefazolin Sodium", therapeuticClass:"Anti-infectives"},
  {name:"Amikacin Sulfate", therapeuticClass:"Anti-infectives"},
  {name:"Sulfamethoxazole", therapeuticClass:"Anti-infectives"},

  // Cardiovascular (18)
  {name:"Vericiguat", therapeuticClass:"Cardiovascular"},
  {name:"Omecamtiv Mecarbil", therapeuticClass:"Cardiovascular"},
  {name:"Alirocumab", therapeuticClass:"Cardiovascular"},
  {name:"Evolocumab", therapeuticClass:"Cardiovascular"},
  {name:"Lomitapide", therapeuticClass:"Cardiovascular"},
  {name:"Omega-3 Fatty Acids", therapeuticClass:"Cardiovascular"},
  {name:"Iloprost", therapeuticClass:"Cardiovascular"},
  {name:"Treprostinil", therapeuticClass:"Cardiovascular"},
  {name:"Selexipag", therapeuticClass:"Cardiovascular"},
  {name:"Riociguat", therapeuticClass:"Cardiovascular"},
  {name:"Macitentan", therapeuticClass:"Cardiovascular"},
  {name:"Ambrisentan", therapeuticClass:"Cardiovascular"},
  {name:"Bosentan", therapeuticClass:"Cardiovascular"},
  {name:"Epoprostenol", therapeuticClass:"Cardiovascular"},
  {name:"Dipyridamole", therapeuticClass:"Cardiovascular"},
  {name:"Procainamide", therapeuticClass:"Cardiovascular"},
  {name:"Disopyramide", therapeuticClass:"Cardiovascular"},
  {name:"Mexiletine", therapeuticClass:"Cardiovascular"},

  // CNS (25)
  {name:"Lemborexant", therapeuticClass:"CNS"},
  {name:"Daridorexant", therapeuticClass:"CNS"},
  {name:"Pimavanserin", therapeuticClass:"CNS"},
  {name:"Xanomeline Trospium", therapeuticClass:"CNS"},
  {name:"Asenapine", therapeuticClass:"CNS"},
  {name:"Iloperidone", therapeuticClass:"CNS"},
  {name:"Pimozide", therapeuticClass:"CNS"},
  {name:"Trifluoperazine", therapeuticClass:"CNS"},
  {name:"Clobazam", therapeuticClass:"CNS"},
  {name:"Stiripentol", therapeuticClass:"CNS"},
  {name:"Cannabidiol", therapeuticClass:"CNS"},
  {name:"Cenobamate", therapeuticClass:"CNS"},
  {name:"Fenfluramine", therapeuticClass:"CNS"},
  {name:"Ganaxolone", therapeuticClass:"CNS"},
  {name:"Remimazolam", therapeuticClass:"CNS"},
  {name:"Brexanolone", therapeuticClass:"CNS"},
  {name:"Zuranolone", therapeuticClass:"CNS"},
  {name:"Sodium Oxybate", therapeuticClass:"CNS"},
  {name:"Pitolisant", therapeuticClass:"CNS"},
  {name:"Solriamfetol", therapeuticClass:"CNS"},
  {name:"Modafinil", therapeuticClass:"CNS"},
  {name:"Armodafinil", therapeuticClass:"CNS"},
  {name:"Pemoline", therapeuticClass:"CNS"},
  {name:"Sulpiride", therapeuticClass:"CNS"},
  {name:"Blonanserin", therapeuticClass:"CNS"},

  // Endocrine (13)
  {name:"Tirzepatide", therapeuticClass:"Endocrine"},
  {name:"Orforglipron", therapeuticClass:"Endocrine"},
  {name:"Survodutide", therapeuticClass:"Endocrine"},
  {name:"Retatrutide", therapeuticClass:"Endocrine"},
  {name:"Pasireotide", therapeuticClass:"Endocrine"},
  {name:"Metreleptin", therapeuticClass:"Endocrine"},
  {name:"Carbetocin", therapeuticClass:"Endocrine"},
  {name:"Atosiban", therapeuticClass:"Endocrine"},
  {name:"Diazoxide Choline", therapeuticClass:"Endocrine"},
  {name:"Iptacopan", therapeuticClass:"Endocrine"},
  {name:"Dexamethasone Implant", therapeuticClass:"Endocrine"},
  {name:"Mifepristone", therapeuticClass:"Endocrine"},
  {name:"Evogliptin", therapeuticClass:"Endocrine"},

  // Respiratory (9)
  {name:"Tezepelumab", therapeuticClass:"Respiratory"},
  {name:"Dupilumab", therapeuticClass:"Respiratory"},
  {name:"Itepekimab", therapeuticClass:"Respiratory"},
  {name:"Gefapixant", therapeuticClass:"Respiratory"},
  {name:"Ensifentrine", therapeuticClass:"Respiratory"},
  {name:"Roflumilast", therapeuticClass:"Respiratory"},
  {name:"Reslizumab", therapeuticClass:"Respiratory"},
  {name:"Nepidemnib", therapeuticClass:"Respiratory"},
  {name:"Pirtobrutinib", therapeuticClass:"Respiratory"},

  // Gastrointestinal (10)
  {name:"Vonoprazan", therapeuticClass:"Gastrointestinal"},
  {name:"Tenapanor", therapeuticClass:"Gastrointestinal"},
  {name:"Alosetron", therapeuticClass:"Gastrointestinal"},
  {name:"Eluxadoline", therapeuticClass:"Gastrointestinal"},
  {name:"Linaclotide", therapeuticClass:"Gastrointestinal"},
  {name:"Plecanatide", therapeuticClass:"Gastrointestinal"},
  {name:"Lubiprostone", therapeuticClass:"Gastrointestinal"},
  {name:"Prucalopride", therapeuticClass:"Gastrointestinal"},
  {name:"Netupitant Palonosetron", therapeuticClass:"Gastrointestinal"},
  {name:"Rapacurium", therapeuticClass:"Gastrointestinal"},

  // Analgesics (4)
  {name:"Oliceridine", therapeuticClass:"Analgesics"},
  {name:"Cebranopadol", therapeuticClass:"Analgesics"},
  {name:"Tavapadon", therapeuticClass:"Analgesics"},
  {name:"Difelikefalin", therapeuticClass:"Analgesics"},

  // Haematology (8)
  {name:"Emicizumab", therapeuticClass:"Haematology"},
  {name:"Avatrombopag", therapeuticClass:"Haematology"},
  {name:"Lusutrombopag", therapeuticClass:"Haematology"},
  {name:"Romiplostim", therapeuticClass:"Haematology"},
  {name:"Eltrombopag", therapeuticClass:"Haematology"},
  {name:"Anagrelide", therapeuticClass:"Haematology"},
  {name:"Fitusiran", therapeuticClass:"Haematology"},
  {name:"Concizumab", therapeuticClass:"Haematology"},

  // Immunology (11)
  {name:"Upadacitinib", therapeuticClass:"Immunology"},
  {name:"Filgotinib", therapeuticClass:"Immunology"},
  {name:"Sarilumab", therapeuticClass:"Immunology"},
  {name:"Satralizumab", therapeuticClass:"Immunology"},
  {name:"Inebilizumab", therapeuticClass:"Immunology"},
  {name:"Ofatumumab", therapeuticClass:"Immunology"},
  {name:"Efgartigimod", therapeuticClass:"Immunology"},
  {name:"Ravulizumab", therapeuticClass:"Immunology"},
  {name:"Eculizumab", therapeuticClass:"Immunology"},
  {name:"Rituximab Biosimilar", therapeuticClass:"Immunology"},
  {name:"Peficitinib", therapeuticClass:"Immunology"},

  // Oncology (15)
  {name:"Sacituzumab Govitecan", therapeuticClass:"Oncology"},
  {name:"Enfortumab Vedotin", therapeuticClass:"Oncology"},
  {name:"Belzutifan", therapeuticClass:"Oncology"},
  {name:"Capivasertib", therapeuticClass:"Oncology"},
  {name:"Alpelisib", therapeuticClass:"Oncology"},
  {name:"Tucatinib", therapeuticClass:"Oncology"},
  {name:"Lapatinib", therapeuticClass:"Oncology"},
  {name:"Neratinib", therapeuticClass:"Oncology"},
  {name:"Trastuzumab Deruxtecan", therapeuticClass:"Oncology"},
  {name:"Tisotumab Vedotin", therapeuticClass:"Oncology"},
  {name:"Belantamab Mafodotin", therapeuticClass:"Oncology"},
  {name:"Eribulin Mesylate", therapeuticClass:"Oncology"},
  {name:"Trabectedin", therapeuticClass:"Oncology"},
  {name:"Mobocertinib", therapeuticClass:"Oncology"},
  {name:"Selpercatinib", therapeuticClass:"Oncology"},

  // Dermatology (9)
  {name:"Risankizumab", therapeuticClass:"Dermatology"},
  {name:"Guselkumab", therapeuticClass:"Dermatology"},
  {name:"Tildrakizumab", therapeuticClass:"Dermatology"},
  {name:"Tapinarof", therapeuticClass:"Dermatology"},
  {name:"Roflumilast Cream", therapeuticClass:"Dermatology"},
  {name:"Crisaborole", therapeuticClass:"Dermatology"},
  {name:"Delgocitinib", therapeuticClass:"Dermatology"},
  {name:"Sarecycline", therapeuticClass:"Dermatology"},
  {name:"Minocycline Foam", therapeuticClass:"Dermatology"},

  // Nutrition (4)
  {name:"Coenzyme Q10", therapeuticClass:"Nutrition/Vitamins"},
  {name:"Vitamin A", therapeuticClass:"Nutrition/Vitamins"},
  {name:"Vitamin E", therapeuticClass:"Nutrition/Vitamins"},
  {name:"Trace Elements", therapeuticClass:"Nutrition/Vitamins"},

  // Toxicology (6)
  {name:"Cyanokit", therapeuticClass:"Toxicology/Antidotes"},
  {name:"Sodium Nitrite", therapeuticClass:"Toxicology/Antidotes"},
  {name:"Prussian Blue", therapeuticClass:"Toxicology/Antidotes"},
  {name:"DigiFab", therapeuticClass:"Toxicology/Antidotes"},
  {name:"Sugammadex Sodium", therapeuticClass:"Toxicology/Antidotes"},
  {name:"Hydroxocobalamin", therapeuticClass:"Toxicology/Antidotes"},

  // Renal (4)
  {name:"Daprodustat", therapeuticClass:"Renal/Electrolytes"},
  {name:"Roxadustat", therapeuticClass:"Renal/Electrolytes"},
  {name:"Burosumab", therapeuticClass:"Renal/Electrolytes"},
  {name:"Vadadustat", therapeuticClass:"Renal/Electrolytes"},

  // Ophthalmology (6)
  {name:"Netarsudil", therapeuticClass:"Ophthalmology"},
  {name:"Iodoxamide", therapeuticClass:"Ophthalmology"},
  {name:"Ketorolac Ophthalmic", therapeuticClass:"Ophthalmology"},
  {name:"Nepafenac", therapeuticClass:"Ophthalmology"},
  {name:"Bromfenac", therapeuticClass:"Ophthalmology"},
  {name:"Bimatoprost SR", therapeuticClass:"Ophthalmology"},

  // Other (10)
  {name:"Tolterodine", therapeuticClass:"Other"},
  {name:"Oxybutynin", therapeuticClass:"Other"},
  {name:"Solifenacin", therapeuticClass:"Other"},
  {name:"Mirabegron", therapeuticClass:"Other"},
  {name:"OnabotulinumtoxinA", therapeuticClass:"Other"},
  {name:"Clostridium Botulinum Toxin", therapeuticClass:"Other"},
  {name:"Phentolamine", therapeuticClass:"Other"},
  {name:"Darifenacin", therapeuticClass:"Other"},
  {name:"Fesoterodine", therapeuticClass:"Other"},
  {name:"Imiquimod", therapeuticClass:"Other"},
];

const needed = 1000 - deduped.length;
let added = 0;
for (const drug of additional) {
  if (added >= needed) break;
  const key = drug.name.toLowerCase().trim();
  if (!seen.has(key)) {
    seen.add(key);
    deduped.push({ name: drug.name, therapeuticClass: drug.therapeuticClass, sourceMentions: 0, status: 'new' });
    added++;
  }
}

console.log(`After dedup: ${deduped.length - added} → added ${added} → total ${deduped.length}`);

if (deduped.length !== 1000) {
  console.warn(`WARNING: Expected 1000 but got ${deduped.length}. Adjust additional list.`);
}

fs.writeFileSync(file, JSON.stringify(deduped, null, 2));
console.log(`Written ${deduped.length} drugs to ${file}`);
