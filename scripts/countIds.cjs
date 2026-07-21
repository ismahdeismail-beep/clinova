const fs = require('fs');
const d = fs.readFileSync('src/data/drugIndexData.ts', 'utf-8');

// More specific: look for lines that start with { or {"id": pattern
const lines = d.split('\n');
let counts = { bundled: 0, 'new-ess': 0, 'new-drugs': 0, other: 0 };
let examples = [];

for (const line of lines) {
  const m = line.match(/\bid['"]*\s*:\s*['"]([^'"]+)['"]/);
  if (m) {
    const val = m[1];
    if (val.startsWith('bundled')) counts.bundled++;
    else if (val.startsWith('new-ess')) counts['new-ess']++;
    else if (val.startsWith('new-')) counts['new-drugs']++;
    else counts.other++;
  }
}

console.log('Counts:', counts);
console.log('Total:', counts.bundled + counts['new-ess'] + counts['new-drugs'] + counts.other);
