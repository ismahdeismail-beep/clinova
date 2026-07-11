import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CASES_DIR = path.resolve(__dirname, '../src/data/clinicalCases');
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/drugCaseLinks.ts');

interface DrugCaseLink {
  drug: string;
  caseIds: string[];
  caseTitles: Record<string, string>;
}

const CANONICAL: Record<string, string> = {
  'folic acid': 'Folic Acid', 'ferrous sulphate': 'Ferrous Sulphate',
  "ringer's lactate": "Ringer's Lactate", 'sodium bicarbonate': 'Sodium Bicarbonate',
  'potassium chloride': 'Potassium Chloride', 'calcium gluconate': 'Calcium Gluconate',
  'calcium chloride': 'Calcium Chloride', 'magnesium sulfate': 'Magnesium Sulfate',
  'activated charcoal': 'Activated Charcoal', 'zinc sulfate': 'Zinc Sulfate',
  'sodium chloride': 'Sodium Chloride', 'silver sulfadiazine': 'Silver Sulfadiazine',
  'fusidic acid': 'Fusidic Acid', 'salicylic acid': 'Salicylic Acid',
  'tranexamic acid': 'Tranexamic Acid', 'zoledronic acid': 'Zoledronic Acid',
  'azelaic acid': 'Azelaic Acid', 'benzoyl peroxide': 'Benzoyl Peroxide',
  'coal tar': 'Coal Tar', 'benzyl benzoate': 'Benzyl Benzoate',
  'n-acetylcysteine': 'Acetylcysteine', 'nitrous oxide': 'Nitrous Oxide',
  'povidone-iodine': 'Povidone-Iodine', 'calcium carbonate': 'Calcium Carbonate',
  'iron dextran': 'Iron Dextran', 'iron sucrose': 'Iron Sucrose',
  'ferrous fumarate': 'Ferrous Fumarate', 'vitamin k': 'Vitamin K',
  'co-trimoxazole': 'Co-trimoxazole', 'water for injection': 'Water for Injection',
};

const DRUG_PATTERNS = [
  /\b([A-Z][a-z]*(?:mab|umab|ximab|zumab|cept|nib|parib|lisib|rafenib|ciclib|degib|stat|sartan|pril|olol|dipin|pine|zosin|lukast|tropium|vastatin|fibrate|oxacin|mycin|cillin|zole|vir|navir|amivir|ciclovir|previr|asvir|buvir|piravir|amprevir|oxetine|pramine|triptyline|zepam|zolam|barbital|pram|done|zapine|triptan|afil|terol|ium|caine|asone|olide|cycline|oxacin|penem|lactam|azole|dazole|bendazole|quine|sine|guanine|uridine|bine|rabine|citabine|platin|trexate|rubicin|taxel|mustine|gliptin|gliflozin|glutide|lixisenatide|dutide|lispro|glargine|detemir|aspart|prazole|tidine|dine|salazine|semide|thiazide|relaxin|prilat|oxime))\b/i,
  /\b(Activated Charcoal|Calcium Gluconate|Calcium Chloride|Calcium Carbonate|Magnesium Sulfate|Sodium Bicarbonate|Sodium Chloride|Potassium Chloride|Potassium Permanganate|Hydrogen Peroxide|Ringer's Lactate|Water for Injection|Silver Sulfadiazine|Fusidic Acid|Folic Acid|Salicylic Acid|Azelaic Acid|Tranexamic Acid|Zoledronic Acid|Benzoyl Peroxide|Coal Tar|Benzyl Benzoate|Vitamin K|Zinc Sulfate|Ferrous Sulphate|Ferrous Fumarate|Iron Dextran|Iron Sucrose|Nitrous Oxide|Povidone-Iodine)\b/g,
  /\b(Aspirin|Paracetamol|Ibuprofen|Morphine|Tramadol|Warfarin|Heparin|Insulin|Metformin|Salbutamol|Prednisolone|Dexamethasone|Hydrocortisone|Omeprazole|Amoxicillin|Co-trimoxazole|Metronidazole|Vancomycin|Doxycycline|Ciprofloxacin|Rifampicin|Isoniazid|Ethambutol|Pyrazinamide|Atropine|Naloxone|Flumazenil|Pralidoxime|N-acetylcysteine|Acetylcysteine|Antivenom|ORS|Dextrose|Multivitamins|Furosemide|Spironolactone|Digoxin|Lisinopril|Ramipril|Losartan|Valsartan|Amlodipine|Bisoprolol|Atorvastatin|Simvastatin|Clopidogrel|Warfarin|Azithromycin|Clarithromycin|Phenytoin|Carbamazepine|Lamotrigine|Levetiracetam|Phenobarbital|Diazepam|Midazolam|Lorazepam|Olanzapine|Fluoxetine|Sertraline|Venlafaxine|Duloxetine|Mirtazapine|Amitriptyline|Lithium|Levodopa|Entacapone|Selegiline|Rasagiline|Pregabalin|Gabapentin|Buprenorphine|Methadone|Propofol|Ketamine)\b/g,
];

function normalizeDrugName(raw: string): string {
  const lower = raw.trim().toLowerCase();
  if (CANONICAL[lower]) return CANONICAL[lower];
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

function extractCaseId(line: string): string | null {
  const m = line.match(/id:\s*['"](case-\d+)['"]/);
  return m ? m[1] : null;
}

function extractTitleFromBlock(block: string): string {
  const m = block.match(/title:\s*['"]([^'"]+)['"]/);
  return m ? m[1] : 'Unknown';
}

function extractDrugsFromBlock(block: string): string[] {
  const found = new Map<string, string>();
  for (const pattern of DRUG_PATTERNS) {
    const re = new RegExp(pattern.source, 'gi');
    let m: RegExpExecArray | null;
    while ((m = re.exec(block)) !== null) {
      const raw = m[1] || m[0];
      const trimmed = raw.trim();
      if (trimmed.length <= 2) continue;
      const lower = trimmed.toLowerCase();
      if (/^(a|an|the|and|or|for|with|without|from|to|in|on|at|by|is|are|was|were|be|been|has|have|had|do|does|did|but|not|so|if|as|of|it|its|this|that|these|those|high|low|risk|dose|mg|g|ml|kg|day|week|month|year|history|patient|treatment|therapy|management|clinical|case|type|types|level|levels|status|test|result|results|blood|urine|serum|plasma|renal|hepatic|cardiac|lung|left|right|bilateral|unilateral|acute|chronic|severe|mild|moderate|normal|abnormal|positive|negative|increased|decreased|elevated|new|old|previous|current|initial|final|first|second|done|ecog|calcium|dextrose|trimoxazole)$/i.test(lower)) continue;
      const canonical = normalizeDrugName(trimmed);
      const key = canonical.toLowerCase();
      if (!found.has(key)) found.set(key, canonical);
    }
  }
  return [...found.values()].sort();
}

async function main() {
  const files = fs.readdirSync(CASES_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts');
  const allMappings = new Map<string, { caseIds: Set<string>; caseTitles: Map<string, string> }>();

  let totalCases = 0;

  for (const file of files) {
    const content = fs.readFileSync(path.join(CASES_DIR, file), 'utf-8');
    const lines = content.split('\n');

    let inCaseBlock = false;
    let braceDepth = 0;
    let currentBlock = '';
    let currentCaseId = '';

    for (const rawLine of lines) {
      const trimmed = rawLine.trim();

      // Detect start of a case object: `{` on its own line or at end of id line
      if (!inCaseBlock) {
        const idMatch = rawLine.match(/^\s*id:\s*['"](case-\d+)['"]/);
        if (idMatch) {
          currentCaseId = idMatch[1];
          currentBlock = rawLine + '\n';
          inCaseBlock = true;
          braceDepth = 1;
          continue;
        }
        // Also handle cases where the object starts before id
        if (trimmed === '{') {
          currentBlock = rawLine + '\n';
          inCaseBlock = true;
          braceDepth = 1;
          continue;
        }
      } else {
        currentBlock += rawLine + '\n';
        for (const ch of rawLine) {
          if (ch === '{') braceDepth++;
          if (ch === '}') braceDepth--;
        }
        if (braceDepth <= 0) {
          // End of case object
          if (!currentCaseId) {
            currentCaseId = extractCaseId(currentBlock) || `unknown-${totalCases}`;
          }
          const title = extractTitleFromBlock(currentBlock);
          const drugs = extractDrugsFromBlock(currentBlock);

          totalCases++;

          for (const drug of drugs) {
            if (!allMappings.has(drug)) {
              allMappings.set(drug, { caseIds: new Set(), caseTitles: new Map() });
            }
            const entry = allMappings.get(drug)!;
            entry.caseIds.add(currentCaseId);
            if (!entry.caseTitles.has(currentCaseId)) {
              entry.caseTitles.set(currentCaseId, title);
            }
          }

          inCaseBlock = false;
          currentBlock = '';
          currentCaseId = '';
        }
      }
    }
  }

  const links: DrugCaseLink[] = [];
  for (const [drug, data] of allMappings) {
    links.push({
      drug,
      caseIds: [...data.caseIds].sort(),
      caseTitles: Object.fromEntries(data.caseTitles),
    });
  }
  links.sort((a, b) => b.caseIds.length - a.caseIds.length || a.drug.localeCompare(b.drug));

  const lines: string[] = [
    '// ================================================================',
    '// Drug ↔ Clinical Case Links — Auto-generated',
    `// Generated on: ${new Date().toISOString()}`,
    '// Maps each referenced drug to its source clinical case IDs and titles',
    '// ================================================================',
    '',
    'export interface DrugCaseLink {',
    '  drug: string;',
    '  caseIds: string[];',
    '  caseTitles: Record<string, string>;',
    '}',
    '',
    `export const DRUG_CASE_LINKS: DrugCaseLink[] = ${JSON.stringify(links, null, 2)};`,
    '',
    'export function findCasesForDrug(drugName: string): DrugCaseLink | undefined {',
    '  const key = drugName.trim().toLowerCase();',
    "  return DRUG_CASE_LINKS.find(l => l.drug.toLowerCase() === key);",
    '}',
    '',
    'export function findDrugsForCase(caseId: string): DrugCaseLink[] {',
    '  const key = caseId.trim().toLowerCase();',
    "  return DRUG_CASE_LINKS.filter(l => l.caseIds.some(id => id.toLowerCase() === key));",
    '}',
    '',
    'export const LINKED_DRUG_COUNT = DRUG_CASE_LINKS.length;',
    'export const LINKED_CASE_COUNT = DRUG_CASE_LINKS.reduce((acc, l) => acc + l.caseIds.length, 0);',
  ];

  fs.writeFileSync(OUTPUT_PATH, lines.join('\n'));

  console.log(`\nDrug-Case Linking Complete:`);
  console.log(`  Files scanned: ${files.length}`);
  console.log(`  Cases parsed: ${totalCases}`);
  console.log(`  Unique drugs linked: ${links.length}`);
  console.log(`\nTop 20 Most-Referenced Drugs:`);
  links.slice(0, 20).forEach(l => console.log(`  ${l.drug}: ${l.caseIds.length} cases`));
  console.log(`\nOutput: ${OUTPUT_PATH}`);
}

main().catch(console.error);
