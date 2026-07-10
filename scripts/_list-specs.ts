import { INITIAL_CASES, type ClinicalCase } from '../src/data/clinicalCasesData';
import { GENERATED_CASES } from '../src/data/clinicalCases/index';

const all: ClinicalCase[] = [...INITIAL_CASES, ...GENERATED_CASES];
const specs = new Set<string>();
for (const c of all) {
  if (c.specialty) specs.add(c.specialty);
}
console.log(`Unique specialties (${specs.size}):`);
for (const s of [...specs].sort()) {
  console.log(`  "${s}"`);
}
