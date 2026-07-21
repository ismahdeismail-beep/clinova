/**
 * genCompact.cjs — Generate drugs from compact pipe-delimited definitions
 * Fixed dedup: only matches actual drug names (not drug_class_name etc.)
 * Run: node scripts/genCompact.cjs scripts/drugsCompact1.txt
 * Output: appended to scripts/compactDrugs.json
 */
const { readFileSync, writeFileSync, existsSync } = require('fs');

const existingRaw = readFileSync('src/data/drugIndexData.ts', 'utf-8');
const existingNames = new Set();

// Match name field that appears at start of drug object or as first field
// Pattern: "name": "X" or name: 'X' where it's the first name-like field in the entry
const lines = existingRaw.split('\n');
for (const line of lines) {
  // Match entries that start with { or { "id": and contain "name":
  const nameMatch = line.match(/"name"\s*:\s*"([^"]+)"/);
  if (nameMatch) {
    existingNames.add(nameMatch[1].toLowerCase().trim());
  }
  // Also match single-quote format: name: 'X'
  const sqMatch = line.match(/\bname:\s*'([^']+)'/);
  if (sqMatch) {
    existingNames.add(sqMatch[1].toLowerCase().trim());
  }
}
console.log(`Existing unique drug names: ${existingNames.size}`);

const inputFile = process.argv[2] || 'scripts/drugsCompact1.txt';
if (!existsSync(inputFile)) { console.error('File not found:', inputFile); process.exit(1); }

const lines2 = readFileSync(inputFile, 'utf-8').split('\n').filter(l => l.trim() && !l.startsWith('#'));
const drugs = [];
let skipped = 0;

lines2.forEach((line, i) => {
  const p = line.split('|').map(s => s.trim());
  if (p.length < 12) { console.log(`Line ${i+1}: skipping (${p.length} fields)`); return; }
  const name = p[0];
  if (existingNames.has(name.toLowerCase())) { skipped++; return; }
  existingNames.add(name.toLowerCase()); // prevent dupes within file
  const a = (s) => s ? s.split('~').map(x => x.trim()).filter(Boolean) : [];
  drugs.push({
    id: `bulk-${String(drugs.length+1).padStart(3,'0')}`,
    name, generic_name: p[1], drug_class: p[2], drug_class_id: null, drug_class_name: p[3],
    indications: a(p[4]), contraindications: a(p[5]), side_effects: a(p[6]),
    dosage: { adult: p[7] }, interactions: a(p[8]), monitoring: p[9] || '',
    patient_counselling: p[10] || '', mechanism_of_action: p[11] || '',
    brand_names: a(p[12]), pregnancy_category: p[13] || 'C',
    warnings: a(p[14]), overdose: p[15] || '', pharmacokinetics: p[16] || '',
    black_box_warnings: a(p[17]), clinical_pearls: a(p[18]), created_at: ''
  });
});

console.log(`New: ${drugs.length}, Skipped (existing): ${skipped}`);
const outFile = 'scripts/compactDrugs.json';
let existing = [];
if (existsSync(outFile)) existing = JSON.parse(readFileSync(outFile, 'utf-8'));
const merged = [...existing, ...drugs];
writeFileSync(outFile, JSON.stringify(merged, null, 2));
console.log(`Total output: ${merged.length}`);
