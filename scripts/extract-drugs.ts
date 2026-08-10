import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const casesDir = path.resolve(__dirname, '../src/data/clinicalCases');
const files = fs.readdirSync(casesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

// Drug name patterns
const DOSE_PATTERN = /\b\d+\s*(mg|mcg|µg|g|IU|units?|mL|tab|caps?|capsules?|tablets?)\b/i;
const SPLITTER = /[,;.\n\r]+/;

// common drug name endings (INN suffixes)
const DRUG_SUFFIXES = /(?:lol|pril|sartan|statin|pam|lam|cillin|mycin|cycline|vir|navir|previr|conazole|azole|mab|nib|cic|cog|parin|xaban|gatran|setron|prazole|dipine|oxacin|thromycin|asone|olone|quine|metacin|asone|phil|rel|vastatin|caine|done|tidine|zosin|afin|lisib|degib|parib|ciclib|tinib|zomib)\.?$/i;

// Common drugs not caught by suffix matching
const COMMON_DRUGS = new Set([
  'aspirin', 'warfarin', 'insulin', 'metformin', 'paracetamol', 'ibuprofen',
  'morphine', 'digoxin', 'furosemide', 'amlodipine', 'atropine', 'naloxone',
  'heparin', 'enoxaparin', 'diazepam', 'midazolam', 'propofol', 'ketamine',
  'phenytoin', 'valproate', 'carbamazepine', 'phenobarbital', 'levothyroxine',
  'prednisolone', 'prednisone', 'dexamethasone', 'hydrocortisone',
  'methotrexate', 'cyclophosphamide', 'cisplatin', 'doxorubicin', 'etoposide',
  'nitroglycerin', 'salbutamol', 'ipratropium', 'theophylline', 'budesonide',
  'fluticasone', 'salmeterol', 'formoterol', 'tiotropium', 'montelukast',
  'zopiclone', 'zolpidem', 'tramadol', 'codeine', 'oxycodone', 'fentanyl',
  'buprenorphine', 'naltrexone', 'methadone', 'lidocaine', 'bupivacaine',
  'rocuronium', 'vecuronium', 'suxamethonium', 'neostigmine', 'glycopyrrolate',
  'ondansetron', 'metoclopramide', 'domperidone', 'loperamide', 'bisacodyl',
  'senna', 'lactulose', 'polyethylene glycol', 'mesalazine', 'sulfasalazine',
  'azathioprine', 'mercaptopurine', 'infliximab', 'adalimumab', 'vedolizumab',
  'ustekinumab', 'tofacitinib', 'allopurinol', 'febuxostat', 'colchicine',
  'hydroxychloroquine', 'sulfasalazine', 'leflunomide', 'etanercept', 'rituximab',
  'tocilizumab', 'denosumab', 'teriparatide', 'raloxifene', 'alendronate',
  'risedronate', 'zoledronic acid', 'ibandronate', 'calcitonin',
  'desmopressin', 'octreotide', 'bromocriptine', 'cabergoline',
  'spironolactone', 'amiloride', 'triamterene', 'acetazolamide',
  'mannitol', 'sodium bicarbonate', 'potassium chloride', 'calcium gluconate',
  'magnesium sulfate', 'sodium polystyrene', 'patiromer',
  'rivaroxaban', 'apixaban', 'edoxaban', 'dabigatran', 'fondaparinux',
  'clopidogrel', 'ticagrelor', 'prasugrel', 'dipyridamole', 'ticlopidine',
  'alteplase', 'tenecteplase', 'streptokinase', 'tranexamic acid',
  'aminocaproic acid', 'protamine', 'vitamin k', 'phytomenadione',
  'filgrastim', 'pegfilgrastim', 'epoetin alfa', 'darbepoetin alfa',
  'sargramostim', 'lenalidomide', 'pomalidomide', 'thalidomide',
  'bortezomib', 'carfilzomib', 'ixazomib', 'panobinostat',
  'imatinib', 'dasatinib', 'nilotinib', 'ponatinib', 'bosutinib',
  'erlotinib', 'gefitinib', 'afatinib', 'osimertinib', 'crizotinib',
  'alectinib', 'ceritinib', 'lorlatinib', 'sorafenib', 'lenvatinib',
  'regorafenib', 'cabozantinib', 'pazopanib', 'sunitinib',
  'bevacizumab', 'trastuzumab', 'pertuzumab', 'cetuximab', 'panitumumab',
  'nivolumab', 'pembrolizumab', 'atezolizumab', 'durvalumab', 'avelumab',
  'ipilimumab', 'tremelimumab', 'blinatumomab', 'gemtuzumab',
  'tamoxifen', 'anastrozole', 'letrozole', 'exemestane', 'fulvestrant',
  'bicalutamide', 'enzalutamide', 'abiraterone', 'leuprolide', 'goserelin',
  'triptorelin', 'degarelix', 'fluorouracil', 'capecitabine', 'tegafur',
  'mercaptopurine', 'fludarabine', 'cladribine', 'cytarabine', 'gemcitabine',
  'decitabine', 'azacitidine', 'hydroxyurea', 'procarbazine', 'dacarbazine',
  'temozolomide', 'carmustine', 'lomustine', 'busulfan', 'melphalan',
  'chlorambucil', 'ifosfamide', 'mesna', 'vincristine', 'vinblastine',
  'vinorelbine', 'paclitaxel', 'docetaxel', 'cabazitaxel', 'irinotecan',
  'topotecan', 'etoposide', 'teniposide', 'bleomycin', 'mitomycin',
  'dactinomycin', 'daunorubicin', 'idarubicin', 'epirubicin', 'valrubicin',
  'asparaginase', 'pegaspargase', 'calcium leucovorin', 'leucovorin',
  'rasburicase', 'sodium polystyrene sulfonate',
  'acetylcysteine', 'n-acetylcysteine', 'naloxone', 'flumazenil',
  'deferoxamine', 'deferasirox', 'deferiprone', 'dimercaprol',
  'edetate calcium disodium', 'succimer', 'pralidoxime', 'fomepizole',
  'digoxin immune fab', 'glucagon', 'calcium chloride',
  'sodium nitrite', 'sodium thiosulfate', 'methylene blue',
  'dantrolene', 'botulism antitoxin', 'antivenom', 'crotalidae immune fab',
  'sorbitol', 'activated charcoal', 'whole bowel irrigation',
  'nitrous oxide', 'sevoflurane', 'isoflurane', 'desflurane', 'halothane',
  'thiopental', 'etomidate', 'propofol', 'ketamine', 'dexmedetomidine',
  'remifentanil', 'sufentanil', 'alfentanil',
  'carbidopa', 'entacapone', 'tolcapone', 'rasagiline', 'selegiline',
  'pramipexole', 'ropinirole', 'apomorphine', 'amantadine',
  'donepezil', 'rivastigmine', 'galantamine', 'memantine',
  'methylphenidate', 'dexamfetamine', 'lisdexamfetamine', 'atomoxetine',
  'modafinil', 'armodafinil', 'caffeine citrate',
  'baclofen', 'tizanidine', 'cyclobenzaprine', 'methocarbamol',
  'carisoprodol', 'orphenadrine', 'dantrolene', 'botulinum toxin',
  'gabapentin', 'pregabalin', 'duloxetine', 'venlafaxine', 'desvenlafaxine',
  'milnacipran', 'levetiracetam', 'lamotrigine', 'topiramate',
  'zonisamide', 'lacosamide', 'rufinamide', 'stiripentol', 'vigabatrin',
  'ethosuximide', 'primidone', 'clobazam', 'clonazepam', 'nitrazepam',
  'temazepam', 'flunitrazepam', 'triazolam', 'alprazolam', 'lorazepam',
  'bromazepam', 'chlordiazepoxide', 'clorazepate', 'prazepam',
  'buspirone', 'hydroxyzine', 'meprobamate',
  'citalopram', 'escitalopram', 'fluoxetine', 'paroxetine', 'sertraline',
  'fluvoxamine', 'vilazodone', 'vortioxetine', 'agomelatine',
  'amitriptyline', 'nortriptyline', 'imipramine', 'clomipramine',
  'desipramine', 'doxepin', 'trimipramine', 'protriptyline',
  'phenelzine', 'tranylcypromine', 'isocarboxazid', 'moclobemide',
  'selegiline transdermal', 'mirtazapine', 'trazodone', 'nefazodone',
  'aripiprazole', 'brexpiprazole', 'cariprazine', 'lurasidone',
  'ziprasidone', 'asenapine', 'iloperidone', 'lurasidone',
  'olanzapine', 'quetiapine', 'risperidone', 'paliperidone',
  'clozapine', 'haloperidol', 'droperidol', 'fluphenazine',
  'perphenazine', 'trifluoperazine', 'thioridazine', 'chlorpromazine',
  'pimozide', 'loxapine', 'molindone', 'thiothixene',
  'lithium', 'valproate', 'valproic acid', 'divalproex', 'carbamazepine',
  'oxcarbazepine', 'lamotrigine', 'topiramate', 'gabapentin',
  'lamotrigine',
]);

function isDrugName(word: string): boolean {
  const clean = word.replace(/^\d+%?\s*/, '').replace(/\(.*?\)/, '').trim();
  if (!clean || clean.length < 3) return false;
  if (/^\d/.test(clean)) return false;
  if (['the', 'and', 'for', 'with', 'without', 'plus', 'or'].includes(clean.toLowerCase())) return false;
  if (DRUG_SUFFIXES.test(clean)) return true;
  if (COMMON_DRUGS.has(clean.toLowerCase())) return true;
  return false;
}

interface DrugEntry {
  name: string;
  count: number;
  sourceCases: string[];
}

const drugMap = new Map<string, DrugEntry>();

function extractDrugs(text: string, caseId: string, caseTitle: string) {
  if (!text || text.length < 3) return;
  const segments = text.split(SPLITTER);
  for (const segment of segments) {
    const hasDose = DOSE_PATTERN.test(segment);
    const words = segment.split(/\s+/).filter(w => w.length > 2);
    for (let i = 0; i < words.length; i++) {
      const word = words[i].replace(/^["'([]|["')}\]]$/g, '').replace(/^\d+%?\s*/, '');
      if (!word || word.length < 3) continue;
      const isDoseContext = hasDose || (i < words.length - 1 && DOSE_PATTERN.test(words[i + 1] + ' ' + words[Math.min(i + 2, words.length - 1)]));
      if (!isDoseContext && !/^\d/.test(word) && word.length > 4) {
        // Check if it might be a drug name by context
        continue;
      }
      const clean = word.replace(/^["'([]|["')}\]]$/g, '').replace(/[\d.]+%?/g, '').trim();
      if (!clean) continue;
      if (isDrugName(clean)) {
        const key = clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
        if (!drugMap.has(key)) {
          drugMap.set(key, { name: key, count: 0, sourceCases: [] });
        }
        const entry = drugMap.get(key)!;
        entry.count++;
      }
    }
  }
  
  // Also search for multi-word drug names from COMMON_DRUGS
  for (const drugName of COMMON_DRUGS) {
    if (drugName.includes(' ')) {
      const escaped = drugName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'gi');
      const match = text.match(regex);
      if (match) {
        const key = drugName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        if (!drugMap.has(key)) {
          drugMap.set(key, { name: key, count: 0, sourceCases: [] });
        }
        const entry = drugMap.get(key)!;
        entry.count += match.length;
        if (!entry.sourceCases.includes(caseId)) {
          entry.sourceCases.push(caseTitle);
        }
      }
    }
  }
}

// Read each case file
for (const file of files) {
  const content = fs.readFileSync(path.join(casesDir, file), 'utf-8');
  // Find case objects: look for patterns like `id: "case-..."` and capture nearby fields
  const caseBlocks = content.split(/{\s*\n\s*id:\s*"/);
  
  for (const block of caseBlocks) {
    if (!block.startsWith('case-')) continue;
    const caseIdMatch = block.match(/^case-(\d+)/);
    if (!caseIdMatch) continue;
    const caseId = 'case-' + caseIdMatch[1];
    
    // Extract title
    const titleMatch = block.match(/title:\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : caseId;
    
    // Extract medication fields
    const medHxMatch = block.match(/medHx:\s*"([^"]*)"/);
    const pharmMatch = block.match(/pharm:\s*"([^"]*)"/);
    const carePlanMatch = block.match(/carePlan:\s*"([^"]*)"/);
    const monitoringMatch = block.match(/monitoring:\s*"([^"]*)"/);
    const counsellingMatch = block.match(/counselling:\s*"([^"]*)"/);
    const dtpsMatch = block.match(/dtps:\s*"([^"]*)"/);
    
    if (medHxMatch) extractDrugs(medHxMatch[1], caseId, title);
    if (pharmMatch) extractDrugs(pharmMatch[1], caseId, title);
    if (carePlanMatch) extractDrugs(carePlanMatch[1], caseId, title);
    if (monitoringMatch) extractDrugs(monitoringMatch[1], caseId, title);
    if (counsellingMatch) extractDrugs(counsellingMatch[1], caseId, title);
    if (dtpsMatch) extractDrugs(dtpsMatch[1], caseId, title);
  }
  
  // Also search for multi-word drug names in the entire file
  for (const drugName of COMMON_DRUGS) {
    if (!drugName.includes(' ')) continue;
    const escaped = drugName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    const matches = content.match(regex);
    if (matches) {
      const key = drugName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      if (!drugMap.has(key)) {
        drugMap.set(key, { name: key, count: 0, sourceCases: [] });
      }
      const entry = drugMap.get(key)!;
      entry.count += matches.length;
    }
  }
}

// Sort alphabetically
const sorted = Array.from(drugMap.entries()).sort(([a], [b]) => a.localeCompare(b));

// Generate output files
const outputDir = path.resolve(__dirname);
const registry = sorted.map(([, entry]) => entry);

fs.writeFileSync(
  path.join(outputDir, 'drug-registry.json'),
  JSON.stringify(registry, null, 2)
);

const summaryLines: string[] = [];
summaryLines.push(`Drug Registry Summary`);
summaryLines.push(`====================`);
summaryLines.push(`Total unique drugs found: ${sorted.length}`);
summaryLines.push(`Total drug mentions: ${sorted.reduce((sum, [, e]) => sum + e.count, 0)}`);
summaryLines.push(`\nAlphabetical Drug List:\n`);
for (const [name, entry] of sorted) {
  summaryLines.push(`  ${name.padEnd(35)} mentions: ${entry.count}`);
}

fs.writeFileSync(path.join(outputDir, 'drug-registry-summary.txt'), summaryLines.join('\n'));

console.log(`Drug extraction complete!`);
console.log(`Total unique drugs: ${sorted.length}`);
console.log(`Total mentions: ${sorted.reduce((sum, [, e]) => sum + e.count, 0)}`);
console.log(`Files written:`);
console.log(`  - scripts/drug-registry.json`);
console.log(`  - scripts/drug-registry-summary.txt`);

// Show first 30 drugs
console.log(`\nFirst 30 drugs:`);
sorted.slice(0, 30).forEach(([name, entry]) => {
  console.log(`  ${name}: ${entry.count} mentions`);
});
