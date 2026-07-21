const fs = require('fs');
const c = fs.readFileSync('src/data/drugIndexData.ts', 'utf-8');
// Check for places where a closing brace is immediately followed by another object without comma
const lines = c.split('\n');
let issues = [];
for (let i = 0; i < lines.length; i++) {
  const trimmed = lines[i].trim();
  if (trimmed === '}' && i + 1 < lines.length) {
    const next = lines[i + 1].trim();
    if (next.startsWith('{"id":')) {
      issues.push({ line: i + 1, nextLine: i + 2, context: trimmed + ' / ' + next.substring(0, 60) });
    }
  }
}
console.log('Missing commas found:', issues.length);
issues.forEach(x => console.log(`  Line ${x.nextLine}: ${x.context}`));
