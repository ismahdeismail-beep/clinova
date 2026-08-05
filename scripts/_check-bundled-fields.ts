import { BUNDLED_DRUGS } from '../src/data/drugIndexData.js'
const real = (s: string) => (s || '').length > 40 && !/refer to prescribing|seek immediate/i.test(s)
let moa = 0, pk = 0, od = 0, hasInd = 0, hasDose = 0
for (const d of BUNDLED_DRUGS as any[]) {
  if (real(d.mechanism_of_action)) moa++
  if (real(d.pharmacokinetics)) pk++
  if (real(d.overdose)) od++
  if (d.indications?.length) hasInd++
  if (d.dosage && Object.keys(d.dosage).length) hasDose++
}
console.log('bundled real MOA:', moa, '| real PK:', pk, '| real OD:', od, '| has indications:', hasInd, '| has dosage:', hasDose, 'of', BUNDLED_DRUGS.length)
// sample one PK and one MOA
const s = BUNDLED_DRUGS.find((d: any) => d.generic_name === 'Cefalexin')
console.log('\nCefalexin MOA:', (s as any)?.mechanism_of_action?.slice(0, 120))
console.log('Cefalexin PK:', (s as any)?.pharmacokinetics?.slice(0, 120))
console.log('Cefalexin OD:', (s as any)?.overdose?.slice(0, 120))
