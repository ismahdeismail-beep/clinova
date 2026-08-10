// One-off fixer: re-escape unescaped single quotes inside single-quoted
// string literals in the legacy generated clinical-case files.
// These files were produced by an older generator that did not escape
// apostrophes (e.g. "Ndung'u", "patient's"), breaking the TS compile.
// Strategy: process line-by-line. Each field is a single-line assignment.
//   key: 'value',            → re-emit with JSON.stringify(value)
//   key: ['a', 'b'],         → re-emit each item with JSON.stringify
// Other lines (objects, code) are left untouched.

import * as fs from 'fs';
import * as path from 'path';

const files = [
  'src/data/clinicalCases/generalPharmacology.ts',
  'src/data/clinicalCases/autonomicPharmacology_a.ts',
  'src/data/clinicalCases/autonomicPharmacology_b.ts',
];

const strLine = /^(\s*)([A-Za-z_$][\w$]*):\s+'([\s\S]*)'(\s*,?)\s*$/;
const arrLine = /^(\s*)([A-Za-z_$][\w$]*):\s*\[([\s\S]*)\](\s*,?)\s*$/;

function fixArrayItems(inner: string): string {
  // Walk char-by-char to extract each '...' item, tolerating unescaped quotes.
  const items: string[] = [];
  let i = 0;
  const n = inner.length;
  while (i < n) {
    // skip whitespace and commas between items
    while (i < n && (inner[i] === ',' || /\s/.test(inner[i]))) i++;
    if (i >= n) break;
    if (inner[i] !== "'") {
      // not a quoted item (e.g. number); capture raw token
      let j = i;
      while (j < n && inner[j] !== ',' && !/\s/.test(inner[j])) j++;
      items.push(inner.slice(i, j));
      i = j;
      continue;
    }
    // find the LAST quote that closes this item: scan to the final `'`
    // that is followed by optional whitespace + (comma | `]`) | end
    const start = i + 1;
    let end = start;
    // greedy: find last `'` in the remaining string
    const lastQuote = inner.lastIndexOf("'", n);
    // ensure it's a real terminator (followed by , or ] or end/whitespace)
    end = lastQuote;
    items.push(JSON.stringify(inner.slice(start, end)));
    i = end + 1;
  }
  return items.join(', ');
}

let totalFixed = 0;
for (const f of files) {
  const full = path.resolve(f);
  const lines = fs.readFileSync(full, 'utf-8').split('\n');
  const out: string[] = [];
  let fixedInFile = 0;
  for (const line of lines) {
    const sm = line.match(strLine);
    if (sm) {
      const value = sm[3];
      out.push(`${sm[1]}${sm[2]}: ${JSON.stringify(value)}${sm[4]}`);
      fixedInFile++;
      continue;
    }
    const am = line.match(arrLine);
    if (am) {
      const inner = am[3];
      out.push(`${am[1]}${am[2]}: [${fixArrayItems(inner)}]${am[4]}`);
      fixedInFile++;
      continue;
    }
    out.push(line);
  }
  fs.writeFileSync(full, out.join('\n'), 'utf-8');
  totalFixed += fixedInFile;
  console.log(`Fixed ${fixedInFile} lines in ${f}`);
}
console.log(`Total lines fixed: ${totalFixed}`);
