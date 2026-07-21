const fs = require('fs');
let content = fs.readFileSync('src/data/drugIndexData.ts', 'utf-8');

// Find where the last proper entry ends (line 4564: })
// and the bulk entries start (line 4565: {"id":"bulk-001")
// We need to add a comma after the closing brace before the bulk entries
const pattern = '}\n    {"id":"bulk-001"';
const idx = content.indexOf(pattern);
if (idx >= 0) {
  content = content.slice(0, idx) + '},\n    {"id":"bulk-001"' + content.slice(idx + pattern.length);
  fs.writeFileSync('src/data/drugIndexData.ts', content);
  console.log('Fixed comma between last proper entry and first bulk entry at index', idx);
} else {
  console.log('Primary pattern not found. Checking CRLF...');
  const crlfPattern = '}\r\n    {"id":"bulk-001"';
  const idx2 = content.indexOf(crlfPattern);
  if (idx2 >= 0) {
    content = content.slice(0, idx2) + '},\r\n    {"id":"bulk-001"' + content.slice(idx2 + crlfPattern.length);
    fs.writeFileSync('src/data/drugIndexData.ts', content);
    console.log('Fixed CRLF comma at index', idx2);
  } else {
    console.log('Pattern not found at all!');
  }
}
