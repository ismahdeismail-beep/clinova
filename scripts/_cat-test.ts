import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'
import { getDrugCategory } from '../src/lib/drugCategory.js'

// 1) What categories do bundled entries get classified into?
const byCat = new Map<string, number>()
for (const d of BUNDLED_DRUGS) {
  const c = getDrugCategory(d as any)
  byCat.set(c, (byCat.get(c) ?? 0) + 1)
}
console.log('Bundled → categories (with drug_class_name + drug_class):')
for (const [c, n] of [...byCat.entries()].sort((a, b) => b[1] - a[1])) console.log('  ', c.padEnd(25), n)

// 2) What if drug_class_name were missing (DB case) and only drug_class text exists?
const dbLike = BUNDLED_DRUGS.map((d) => ({
  ...d,
  drug_class_name: null,
  drug_class: (d as any).drug_class || (d as any).drug_class_name,
}))
const byCat2 = new Map<string, number>()
for (const d of dbLike) {
  const c = getDrugCategory(d as any)
  byCat2.set(c, (byCat2.get(c) ?? 0) + 1)
}
console.log('\nIf only drug_class text used (no drug_class_name):')
for (const [c, n] of [...byCat2.entries()].sort((a, b) => b[1] - a[1])) console.log('  ', c.padEnd(25), n)

// 3) What does DB actually store in drug_class for the 440?
console.log('\ndrug_class_name values in bundled data:')
const dcn = new Map<string, number>()
for (const d of BUNDLED_DRUGS) {
  const k = (d as any).drug_class_name ?? 'NULL'
  dcn.set(k, (dcn.get(k) ?? 0) + 1)
}
for (const [k, v] of [...dcn.entries()].sort((a, b) => b[1] - a[1])) console.log('  ', k.padEnd(25), v)
