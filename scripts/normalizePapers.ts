import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const outDir = join(process.cwd(), 'scripts', 'out');

function flattenSections(sections: any[]): any[] {
  const result: any[] = [];
  for (const sec of sections) {
    const nested = sec.sections;
    delete sec.sections;
    result.push(sec);
    if (Array.isArray(nested)) {
      for (const n of flattenSections(nested)) result.push(n);
    }
  }
  return result;
}

function walk(node: any): boolean {
  let touched = false;
  if (Array.isArray(node)) {
    for (const item of node) if (walk(item)) touched = true;
  } else if (node && typeof node === 'object') {
    if (Array.isArray(node.sections)) {
      const before = JSON.stringify(node.sections);
      node.sections = flattenSections(node.sections);
      if (JSON.stringify(node.sections) !== before) touched = true;
    }
    for (const k of Object.keys(node)) {
      if (k === 'sections') continue;
      if (walk(node[k])) touched = true;
    }
  }
  return touched;
}

let changed = 0;
for (const f of readdirSync(outDir).filter((x) => x.endsWith('.json'))) {
  const p = join(outDir, f);
  const data = JSON.parse(readFileSync(p, 'utf8'));
  if (walk(data)) {
    writeFileSync(p, JSON.stringify(data, null, 2));
    console.log('normalized', f);
    changed++;
  }
}
console.log(`Done. ${changed} file(s) normalized.`);
