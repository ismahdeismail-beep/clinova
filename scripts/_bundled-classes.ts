import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'
const cls = new Map<string, number>()
const dcn = new Map<string, number>()
for (const d of BUNDLED_DRUGS) {
  const dc = (d as any).drug_class ?? 'NULL'
  const cn = (d as any).drug_class_name ?? 'NULL'
  cls.set(dc, (cls.get(dc) ?? 0) + 1)
  dcn.set(cn, (dcn.get(cn) ?? 0) + 1)
}
console.log('bundled drug_class values:')
for (const [k, v] of [...cls.entries()].sort((a, b) => b[1] - a[1])) console.log('  ', k.padEnd(45), v)
console.log('\nCATEGORY_SYMBOLS keys check:')
