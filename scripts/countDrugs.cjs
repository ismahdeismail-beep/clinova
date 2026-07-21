const fs = require('fs');
const data = fs.readFileSync('src/data/drugIndexData.ts', 'utf-8');

// Count by id patterns - handle both formats
const bundled = data.match(/id['"]*\s*:\s*['"]bundled-\d+/g);
const gen = data.match(/id['"]*\s*:\s*['"]gen-\d+/g);
const newEss = data.match(/id['"]*\s*:\s*['"]new-ess-\d+/g);
const newDrugs = data.match(/id['"]*\s*:\s*['"]new-\d+-\d+/g);

console.log('Bundled:', bundled ? bundled.length : 0);
console.log('Generated (gen-):', gen ? gen.length : 0);
console.log('New essential (new-ess-):', newEss ? newEss.length : 0);
console.log('New drugs (new-X-):', newDrugs ? newDrugs.length : 0);
console.log('---');
console.log('TOTAL:', (bundled?.length || 0) + (gen?.length || 0) + (newEss?.length || 0) + (newDrugs?.length || 0));
