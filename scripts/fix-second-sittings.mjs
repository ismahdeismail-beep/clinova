// Curate the 3 second-sitting papers (3306b, 5111b, 5112b) parsed by
// scripts/parse-old-papers.mjs into clean question structures.
// Mirrors the hand-curation in scripts/fix-old-papers.mjs for the 12 base papers:
// - splits merged adjacent questions (next stem+options appended as extra options)
// - rebuilds B/C sections from the raw source text as discrete questions
// Run AFTER parse-old-papers.mjs (per-paper): npx tsx/ node scripts/fix-second-sittings.mjs
import fs from 'fs'
import path from 'path'

const DIR = 'scripts/out/parsed-papers'
const load = (code) => JSON.parse(fs.readFileSync(path.join(DIR, code + '.json'), 'utf8'))
const save = (code, p) => fs.writeFileSync(path.join(DIR, code + '.json'), JSON.stringify(p, null, 2))
const A = (p) => p.sections.A
const B = (p) => p.sections.B
const C = (p) => p.sections.C

function findIdx(arr, sub) {
  const i = arr.findIndex((q) => q.stem.includes(sub))
  if (i === -1) throw new Error('NOT FOUND: ' + sub)
  return i
}

function splitOptions(q, optCount) {
  // q.options = first optCount real options + [next stem, ...next options]
  if (q.options.length <= optCount) throw new Error('splitOptions: not merged, len=' + q.options.length)
  const next = { stem: q.options[optCount], options: q.options.slice(optCount + 1) }
  q.options = q.options.slice(0, optCount)
  return next
}

// ---------------------------------------------------------------- 3306b (July 2019)
{
  const p = load('3306b')
  const a = A(p)
  // anticoagulant factors: split "Low molecular weight heparin" question out of the 11-option blob
  const iAnt = findIdx(a, 'important factor regarding the use of anticoagulant drugs')
  const next = splitOptions(a[iAnt], 5)
  if (!/^Low molecular weight heparin/i.test(next.stem)) throw new Error('3306b LMWH stem mismatch: ' + next.stem)
  a.splice(iAnt + 1, 0, next)
  // B: 8 SAQs from the July-2019 paper (rebuild)
  p.sections.B = [
    {
      stem:
        'A patient suffering from Deep Venous Thrombosis is admitted in the hospital.\n' +
        'a) Which drug would you recommend she be given and what is the mode of action of this drug? (3 marks)\n' +
        'b) After 4 days, she might be discharged, which drug would you recommend she be given? (1 mark)\n' +
        'c) What advice would you give to the prescriber and to the patient about the drug mentioned above? (2 marks)',
    },
    {
      stem:
        'A 70 year old Kenyan patient presents to the hospital and the BP is 160/95. He has no other symptoms apart from gout.\n' +
        'a) What is your target when reducing the blood pressure? (1 mark)\n' +
        'b) Which drugs would you give him? (1 mark)\n' +
        'c) What is the mode of action of the above drugs? (3 marks)\n' +
        'd) What are the side effects you should look out for? (2 marks)',
    },
    {
      stem:
        'A patient is diagnosed of HEART FAILURE.\n' +
        'a) Which drugs should you give him? (2 marks)\n' +
        'b) What is the mode of action of the above drugs? (4 marks)\n' +
        'c) What are the side effects you should look out for? (4 marks)',
    },
    { stem: 'List the classes of antiarrythmic drugs and give an example in each case. (4 marks)' },
    { stem: 'What is the mode of action and clinical applications of chlorthalidone? (4 marks)' },
    { stem: 'Compare and contrast the mode of action of heparin and that of warfarin. (4 marks)' },
    { stem: 'Aspirin may be used in management of angina. State its indication and its mode of action in this case. (2 marks)' },
    {
      stem:
        'What is the mode of action of the following drugs in management of hypertension? (4 marks)\n' +
        'a) candesartan\n' +
        'b) hydralazine',
    },
  ]
  // C: 3 LAQs
  p.sections.C = [
    {
      stem:
        'Describe ENALAPRIL in terms of the\n' +
        'a) mode of action (4 marks)\n' +
        'b) clinical applications (3 marks)\n' +
        'c) side effects (3 marks)\n' +
        'd) drug-drug interactions (3 marks)\n' +
        'e) contraindications (3 marks)\n' +
        'f) pharmacokinetics (4 marks)',
    },
    {
      stem:
        'Describe FUROSEMIDE in terms of the\n' +
        'a) mode of action (2 marks)\n' +
        'b) clinical applications (4 marks)\n' +
        'c) side effects (4 marks)\n' +
        'd) contraindications (3 marks)\n' +
        'e) drug-drug interactions (3 marks)\n' +
        'f) pharmacokinetics (4 marks)',
    },
    {
      stem:
        'Describe ORAL ANTICOAGULANTS in terms of\n' +
        'a) classes and examples (2 marks)\n' +
        'b) mode of action (4 marks)\n' +
        'c) clinical applications (3 marks)\n' +
        'd) side effects (3 marks)\n' +
        'e) contraindications (2 marks)\n' +
        'f) pharmacokinetics (3 marks)\n' +
        'g) drug-drug interactions (3 marks)',
    },
  ]
  save('3306b', p)
  console.log('3306b fixed: A=' + a.length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- 5111b (Special Exam)
{
  const p = load('5111b')
  const a = A(p)
  // merge split stem Q1 (A[0] + A[1])
  const a0 = a[0]
  const a1 = a[1]
  if (a0.options.length !== 0) throw new Error('5111b A1 expected 0 options')
  a0.stem = a0.stem + '\n' + a1.stem
  a0.options = a1.options
  a.splice(1, 1)
  // CML / leucovorin split
  const iCml = findIdx(a, 'most common forms of leukemia is Chronic Myelogenous Leukemia')
  const lv = splitOptions(a[iCml], 4)
  if (!/When combined with leucovorin/i.test(lv.stem)) throw new Error('5111b leucovorin mismatch: ' + lv.stem)
  a.splice(iCml + 1, 0, lv)
  // emetogenic / prodrug split
  const iEme = findIdx(a, 'high emetogenic potential')
  const pd = splitOptions(a[iEme], 4)
  if (!/prodrug that must be first activated/i.test(pd.stem)) throw new Error('5111b prodrug mismatch: ' + pd.stem)
  a.splice(iEme + 1, 0, pd)
  // adenocarcinoma / allopurinol split
  const iAde = findIdx(a, 'used systemically to treat adenocarcinomas')
  const al = splitOptions(a[iAde], 4)
  if (!/concurrently with allopurinol/i.test(al.stem)) throw new Error('5111b allopurinol mismatch: ' + al.stem)
  a.splice(iAde + 1, 0, al)
  // fluorouracil-nonresponsive / anthracycline split
  const iFur = findIdx(a, 'fluorouracil-nonresponsive colon cancer')
  const an = splitOptions(a[iFur], 4)
  if (!/antracycline anticancer antibiotic/i.test(an.stem)) throw new Error('5111b anthracycline mismatch: ' + an.stem)
  a.splice(iFur + 1, 0, an)
  // B: 3 SAQs
  p.sections.B = [
    {
      stem:
        'Primary open-angle glaucoma can be treated by drugs.\n' +
        'a) Mention any three classes of drugs that can be used for its treatment and an example in each case. (3 marks)\n' +
        'b) What is the mode of action of the above mentioned drugs in this case? (6 marks)',
    },
    {
      stem:
        'Kinase inhibitors can be used as anticancer drugs.\n' +
        'a) Mention any two classes of kinase inhibitors with an example in each case. (2 marks)\n' +
        'b) State any two clinical applications of each of the drugs mentioned in a) above. (4 marks)',
    },
    { stem: 'Mention any 2 topical drugs that can be used for management of acne and describe their mode of action. (5 marks)' },
  ]
  // C: 1 LAQ
  p.sections.C = [
    {
      stem:
        'A patient is diagnosed with non-Hodgkin\'s lymphoma. He is prescribed CHOPP.\n' +
        'a) What are the drugs represented by CHOPP? (4 marks)\n' +
        'b) What is the mode of action of each of the drugs in a) above? (8 marks)\n' +
        'c) State 2 side effects of each of the drugs mentioned in a) above. (8 marks)',
    },
  ]
  save('5111b', p)
  console.log('5111b fixed: A=' + a.length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- 5112b (Special Exam)
{
  const p = load('5112b')
  const a = A(p)
  // glucocorticoid / adrenal-neoplasm split
  const iGlu = findIdx(a, 'most common complication of glucocorticoid therapy')
  const ad = splitOptions(a[iGlu], 4)
  if (!/adrenocortical carcinoma/i.test(ad.stem)) throw new Error('5112b adrenal mismatch: ' + ad.stem)
  a.splice(iGlu + 1, 0, ad)
  // TBG / thyroid-replacement split
  const iTbg = findIdx(a, 'displaces thyroid hormones from TBG')
  const tr = splitOptions(a[iTbg], 4)
  if (!/Preparation of choice for thyroid replacement therapy/i.test(tr.stem)) throw new Error('5112b TBG mismatch: ' + tr.stem)
  a.splice(iTbg + 1, 0, tr)
  // octreotide / TRH split
  const iOct = findIdx(a, 'not a clinical use of octreotide')
  const trh = splitOptions(a[iOct], 4)
  if (!/TRH\) infusion causes/i.test(trh.stem)) throw new Error('5112b TRH mismatch: ' + trh.stem)
  a.splice(iOct + 1, 0, trh)
  // mini pill: "These pills are potent suppressors" is the LAST option of the mini-pill question, not its own question
  const iMini = findIdx(a, 'progestin-only mini pill for contraception')
  const iPills = findIdx(a, 'These pills are potent suppressors of ovulation')
  if (iPills !== iMini + 1) throw new Error('5112b mini pill order changed')
  a[iMini].options.push(...a[iPills].options.length ? a[iPills].options : [a[iPills].stem])
  a.splice(iPills, 1)
  // B: 3 SAQs
  p.sections.B = [
    { stem: 'A pregnant lady in her first trimester is diagnosed with hypothyroidism. Which drug would you recommend be given to the patient? (1 mark)' },
    {
      stem:
        'A 35-year old patient is diagnosed with type II diabetes, hypertension and heart failure.\n' +
        'a) Which 4 drugs would you recommend be administered to this patient? (4 marks)\n' +
        'b) What is the mode of action of the drugs mentioned in a) above? (8 marks)\n' +
        'c) State 4 potential drug-drug interactions you would be wary about. (4 marks)',
    },
    { stem: 'Compare and contrast Depo Provera and combined oral contraceptive pills. (3 marks)' },
  ]
  // C: 1 LAQ
  p.sections.C = [
    {
      stem:
        'Describe CORTICOSTEROIDS in terms of\n' +
        'a) classes and examples (2 marks)\n' +
        'b) mode of action (2 marks)\n' +
        'c) clinical applications (4 marks)\n' +
        'd) side effects (4 marks)\n' +
        'e) contraindications (2 marks)\n' +
        'f) pharmacokinetics (3 marks)\n' +
        'g) drug-drug interactions (3 marks)',
    },
  ]
  save('5112b', p)
  console.log('5112b fixed: A=' + a.length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- summary
let total = 0
for (const code of ['3306b', '5111b', '5112b']) {
  const p = load(code)
  const bad = A(p).filter((q) => q.options.length < 3 || q.options.length > 5)
  const n = A(p).length + B(p).length + C(p).length
  total += n
  console.log(`${code}: A=${A(p).length} B=${B(p).length} C=${C(p).length} TOTAL=${n}  badA=${bad.length}`)
}
console.log('GRAND TOTAL:', total)
