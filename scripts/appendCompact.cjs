/**
 * appendCompact.cjs — Append compactDrugs.json entries to drugIndexData.ts
 * Run: node scripts/appendCompact.cjs
 */
const { readFileSync, writeFileSync } = require('fs');

const newDrugs = JSON.parse(readFileSync('scripts/compactDrugs.json', 'utf-8'));
let ts = readFileSync('src/data/drugIndexData.ts', 'utf-8');

// Find last ];
const insertPoint = ts.lastIndexOf('];');
if (insertPoint === -1) { console.error('Could not find ];'); process.exit(1); }

const entries = newDrugs.map(d => '    ' + JSON.stringify(d)).join(',\n');
const newTs = ts.substring(0, insertPoint) + entries + ',\n];\n' + ts.substring(insertPoint + 2);

writeFileSync('src/data/drugIndexData.ts', newTs);

// Verify
const allNames = newTs.match(/\bname['" ]*:\s*['"][^'"]+['"]/g);
console.log(`Appended ${newDrugs.length} drugs. New total: ${allNames ? allNames.length : 0}`);
