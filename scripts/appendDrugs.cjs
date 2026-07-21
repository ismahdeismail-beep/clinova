/**
 * appendDrugs.js — Appends new drugs from newDrugs.json to drugIndexData.ts
 * Converts JSON format to TypeScript format and inserts before closing ];
 */
const fs = require('fs');

const newDrugs = JSON.parse(fs.readFileSync('scripts/newDrugs.json', 'utf-8'));
let ts = fs.readFileSync('src/data/drugIndexData.ts', 'utf-8');

// Convert each drug JSON to TypeScript object string
const tsEntries = newDrugs.map(drug => {
  // Convert to TS format with proper quoting
  const entry = {
    id: drug.id,
    name: drug.name,
    generic_name: drug.generic_name,
    drug_class: drug.drug_class,
    drug_class_id: null,
    drug_class_name: drug.drug_class_name,
    indications: drug.indications,
    contraindications: drug.contraindications,
    side_effects: drug.side_effects,
    dosage: drug.dosage,
    interactions: drug.interactions,
    monitoring: drug.monitoring,
    patient_counselling: drug.patient_counselling,
    mechanism_of_action: drug.mechanism_of_action,
    brand_names: drug.brand_names || [],
    pregnancy_category: drug.pregnancy_category || 'C',
    warnings: drug.warnings || [],
    overdose: drug.overdose || '',
    pharmacokinetics: drug.pharmacokinetics || '',
    black_box_warnings: drug.black_box_warnings || [],
    clinical_pearls: drug.clinical_pearls || [],
    created_at: ''
  };

  // Use JSON.stringify then convert double quotes to single for TS consistency
  let str = JSON.stringify(entry, null, 2);
  // Ensure consistent formatting
  return '    ' + str;
});

// Find the last drug entry and append after it
// The file ends with: \n]; 
const insertPoint = ts.lastIndexOf('];');
if (insertPoint === -1) {
  console.error('Could not find closing ]; in drugIndexData.ts');
  process.exit(1);
}

const newContent = ts.substring(0, insertPoint) + 
  tsEntries.join(',\n') + 
  '\n];\n' + 
  ts.substring(insertPoint + 2);

fs.writeFileSync('src/data/drugIndexData.ts', newContent);
console.log(`Appended ${newDrugs.length} drugs to drugIndexData.ts`);

// Verify new count
const allIds = newContent.match(/\bid['"]*\s*:\s*['"][^'"]+['"]/g);
console.log('New total drug count:', allIds ? allIds.length : 0);
