// Fix known parsing issues in scripts/out/parsed-papers/*.json
// Each fix asserts on the current parsed state so failures are loud.
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

function stripLeadingInstr(stem) {
  const lines = stem.split('\n')
  const i = lines.findIndex((l) => !/^SECTION\b/i.test(l) && !/^answer (all|any|both|questions)/i.test(l.trim()) && l.trim() !== '')
  return lines.slice(i === -1 ? 0 : i).join('\n').trim()
}

// ---------------------------------------------------------------- 3101
{
  const p = load('3101')
  // remove instruction "question"
  const a = A(p)
  const inst = findIdx(a, 'Choose the ONE best answer')
  a.splice(inst, 1)
  // merge "80.5%" into elimination question
  const i4 = findIdx(a, 'Elimination after 4 half-lives')
  const i5 = findIdx(a, '80.5%')
  a[i4].options.push(a[i5].stem, ...a[i5].options)
  a.splice(i5, 1)
  // orphan receptor cluster: merge A16+A17 into A15, then promote macromolecular question
  const i15 = findIdx(a, "best describes an \"orphan\" receptor")
  const i16 = findIdx(a, 'A receptor associated with a rare disease?')
  const i17 = findIdx(a, 'A receptor which is associated with disease but which has not attracted')
  if (i16 !== i15 + 1 || i17 !== i15 + 2) throw new Error('3101 orphan cluster order changed')
  const macOpts = a[i17].options
  a[i15].options.push(a[i16].stem, a[i17].stem)
  a.splice(i17, 1)
  a.splice(i16, 1)
  a.splice(i15 + 1, 0, {
    stem: 'The pharmacological action of this agent is not mediated by a "macromolecular" receptor molecule.',
    options: macOpts,
  })
  const defs = [
    'is a science that deals with evolving a quantitative relationship between exposure to the drug (pharmacokinetics) and its response (pharmacodynamics), derived by constructing mathematical models based on few observations',
    'are drugs meant for the diagnosis, prevention or treatment of rare diseases.',
    'A pharmacologic antagonist that can be overcome by increasing the concentration of agonist',
    'A pharmacologic antagonist that cannot be overcome by increasing agonist concentration',
    'A drug that counters the effects of another by binding the agonist drug (not the receptor)',
    'The dose required to achieve a specific plasma drug concentration level with a single administration.',
    'The dose required for regular administration to maintain a target plasma level.',
    'The ratio of the amount of drug in the body to the drug concentration in the plasma or blood',
    'The ratio of the rate of elimination of a drug to the concentration of the drug in the plasma or blood',
    'represents the maximal ability of a drug to accomplish a particular type of effect.',
    'Reflects the amount of drug (the dose) required to cause a specific amount of effect.',
    'Reactions that convert the parent drug to a more polar (water-soluble) or more reactive product by unmasking or inserting a polar functional group',
    'Reactions that increase water solubility by conjugation of the drug molecule with a polar moiety',
  ]
  p.sections.B = [
    {
      stem:
        'Give the term that BEST defines the following terminologies (2 Marks each):\n' +
        defs.map((d, i) => `${i + 1}. ${d}`).join('\n'),
    },
    {
      stem:
        'COVID-19 Pandemic has had a huge Global impact, Central to the fight against Covid-19 is the clinical development of drugs. You have been tasked as a drug Specialist to assist in undertaking Pharmacovigilance. Give a description of the SIX manifestations of Adverse Drug Reactions. (12 Marks)',
    },
    {
      stem:
        '500 mg of a drug is administered orally, 70% of the drug is absorbed. The hepatic extraction ratio is 65%. What is the overall bioavailability for this drug? (2 Marks)',
    },
  ]
  p.sections.C = [
    {
      stem:
        'A patient presents to your Pharmacy Drug Store with a prescription. Unfortunately, you do not have the drug prescribed. You however wish to change the Generic Drug prescribed with a branded drug available. The Patient does not understand this and thus you ought to explain to him to understand.\n' +
        'a) How will you explain and distinguish between: Branded Drug and Generic Drug? (8 Marks)\n' +
        'b) The patient further asks you what is a Chemical Name. (2 Marks)\n' +
        'c) Discuss five ideal properties of drugs. (5 Marks)',
    },
    { stem: 'Discuss any 3 sources of drugs. (3 Marks)' },
    {
      stem:
        'COVID-19 Pandemic has had a huge Global impact, Central to the fight against Covid-19 is the clinical development of drugs. You have been tasked as a drug Specialist to assist in undertaking research on New Drug Development. Give a description of the four Clinical phases of New Drug Development. (12 Marks)',
    },
  ]
  save('3101', p)
  console.log('3101 fixed: A=' + a.length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- 3102
{
  const p = load('3102')
  const b = B(p)
  b.forEach((q) => (q.stem = stripLeadingInstr(q.stem)))
  // C: split merged Atropine/Propranolol block
  const c = C(p)
  const c1 = c[0]
  const lines = c1.stem.split('\n')
  const at = lines.findIndex((l) => l.startsWith('Describe PROPRANOLOL'))
  p.sections.C = [
    { stem: lines.slice(0, at).join('\n').trim() },
    { stem: lines.slice(at).join('\n').trim() },
  ]
  save('3102', p)
  console.log('3102 fixed: A=' + A(p).length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- 3203
{
  const p = load('3203')
  const a = A(p)
  // H1 antihistamines: merge A34 into A33
  const i33 = findIdx(a, 'concerning H1 antihistamines is correct')
  const i34 = findIdx(a, 'Because of the established long-term safety of first-generation')
  if (i34 !== i33 + 1) throw new Error('3203 H1 order changed')
  a[i33].options.push(a[i34].stem, ...a[i34].options)
  a.splice(i34, 1)
  // salicylism: split ketorolac question
  const i49 = findIdx(a, 'Characteristic findings of salicylism include')
  const ket = a[i49].options.findIndex((o) => o.startsWith('The main advantage of ketorolac'))
  if (ket === -1) throw new Error('3203 ketorolac not an option')
  const ketOpts = a[i49].options.slice(ket + 1)
  a.splice(i49 + 1, 0, { stem: a[i49].options[ket], options: ketOpts })
  a[i49].options = a[i49].options.slice(0, ket)
  // ibuprofen: merge "What is the drug?" question back
  const i56 = findIdx(a, 'being treated with ibuprofen, but joint pain')
  const i57 = findIdx(a, 'What is the drug?')
  if (i57 !== i56 + 1) throw new Error('3203 ibuprofen order changed')
  a[i56].stem = a[i56].stem + '\nWhat is the drug?'
  a[i56].options = a[i57].options
  a.splice(i57, 1)
  // rebuild B (4 questions) and C (4 questions)
  p.sections.B = [
    {
      stem:
        'a) Using a suitable flow chart illustrate the metabolic pathway of acetaminophen that is associated with toxic metabolite (4 Marks)\n' +
        'b) Explain why you would be less concerned if a mother reports to you that her 18-month old son took an overdose of paracetamol syrup. (2 Marks)',
    },
    {
      stem:
        'Y.S is a 19-year-old college student who is brought to the health Centre where you are currently doing your community health rotation. The Chief complaint is breathing difficulties, generalized body swelling and fainting after being stung severally by bees. Formulate a stepwise management plan for this patient (4 Marks)',
    },
    {
      stem:
        'PQ is a 67-year-old retired labour officer who recently was diagnosed with prinzmetal angina. She has a long standing history of sporadic migraine attacks. She is brought at night to a hospital where you are the drug information pharmacist. The MO on call wants to find out which classes of drug effective for acute migraine attack will be safe for her.\n' +
        'a) Using suitable examples identify two classes of drugs that are contraindicated in such a patient. (2 Marks)\n' +
        'b) Illustrate using suitable examples 3 classes of drugs that you would recommend for migraine prophylaxis in that patient (3 Marks)',
    },
    {
      stem:
        'For each numbered item in category A, select the one lettered option in category B that is most closely associated with it (each lettered option can be selected once, more than once, or not at all). (5 Marks)\n' +
        'Category A\n' +
        '1. A partial agonist at μ (mu) opioid receptors and antagonist at κ (kappa) opioid receptors\n' +
        '2. A full opioid agonist with the highest oral bioavailability\n' +
        '3. A drug with very weak opioid activity used in the treatment of diarrhea\n' +
        '4. A partial agonist at μ (mu) opioid receptors and full agonist at κ (kappa) opioid receptors\n' +
        '5. A drug with high affinity but no intrinsic activity at opioid receptors\n' +
        'Category B\n' +
        'Codeine, Buprenorphine, Fentanyl, Loperamide, Methadone, Morphine, Naloxone, Pentazocine',
    },
  ]
  p.sections.C = [
    {
      stem:
        'D.W, a 48-year old man with a history of hay fever is diagnosed with CKD stage 2. He has been complaining of poor appetite for the last 3 weeks which has seen him lose 2 kgs. The senior house officer calls you regarding a drug that would work for both his hay fever and Appetite.\n' +
        'a) Identify a drug that you would recommend (2 Marks)\n' +
        'b) Describe the mechanism of action of this drug (2 Marks)\n' +
        'c) Using suitable examples, examine 2 other different clinical applications of H1 receptor antagonists (2 Marks)\n' +
        'd) Outline three adverse effects and two drug-drug interactions associated with the drug you identified in (a) above',
    },
    {
      stem:
        'After careful history taking D.W is also diagnosed with Migraine headaches. He admits that he has been taking a drug which had been prescribed by a neurologist for prophylaxis against his headaches. He is also complaining of dyspnea, tightness and pain in the chest. Examination findings reveal; pleural friction rubs, aortic murmur and pleural effusion. These findings (fibrotic changes in the pleuropulmonary & cardiac regions) are confirmed by chest x-ray and echo.\n' +
        'a) Identify and classify the most likely drug that he was using which is associated with these fibrotic changes (3 Marks)\n' +
        'b) Outline 3 other adverse effects and 3 contraindications of the drug in (a) above (6 Marks)',
    },
    {
      stem:
        'AW is a 42-year old patient with advanced liver disease. She is involved in a road traffic accident and sustains a fractured tibia of her left leg. Her eGFR is about 28 mL/min/1.73 m2 (Normal 90 to 120 mL/min/1.73 m2). She is in severe pain and required an analgesic to relieve her pain.\n' +
        'a) Identify a suitable opioid analgesic that you would recommend which would not require dose adjustment and which could be used for induction of anesthesia, maintenance of anaesthesia and analgesic in immediate postoperative period (2 Marks)\n' +
        'b) List two other opioids that could be considered safe for use in this patient but require dose adjustment (1 Mark)\n' +
        'c) Outline the mode of action of the drug you identified in (a) above (2 Marks)\n' +
        'd) Using appropriate examples Examine 3 other clinical applications, 3 adverse effects and 3 contraindications of opioid analgesics (9 Marks)\n' +
        'After surgery, the orthopedic surgeon notices that A.W’s leg is inflamed and thus she requires a short course of an NSAID.\n' +
        'e) Identify one NSAID considered relatively safe in renal insufficiency that you would recommend (2 Marks)\n' +
        'f) Outline two drug-drug interactions and two contraindications of the drug you have identified in (e) above (4 Marks)',
    },
  ]
  save('3203', p)
  console.log('3203 fixed: A=' + a.length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- 3305
{
  const p = load('3305')
  const a = A(p)
  const i6 = findIdx(a, 'generalized tonic-clonic seizure')
  const i7 = findIdx(a, 'Another antiepileptic drug may be added')
  const newStem = 'Which of the following is not a known principle of antiepileptic drug therapy'
  const q = a[i6]
  const ki = q.options.findIndex((o) => o.startsWith(newStem))
  if (ki === -1) throw new Error('3305 principle not in options')
  const newOpts = q.options.slice(ki + 1)
  newOpts.push(i7 < a.length ? a[i7].stem : '')
  a.splice(i6 + 1, 0, { stem: newStem, options: newOpts })
  q.options = q.options.slice(0, ki)
  if (i7 > i6) a.splice(i7 + 1, 1)
  else a.splice(i7, 1)
  p.sections.B = [
    {
      stem:
        'A 30 year old female patient suffering from status epilepticus is admitted in the hospital.\n' +
        'a) Which drug would you recommend she be given and what is the mode of action of this drug? (3 marks)\n' +
        'b) After 4 days, she might be discharged, which drug would you recommend she be given? (1 mark)\n' +
        'c) What are the side effects you would look out for the drug mentioned in b above? (2 marks)',
    },
    {
      stem:
        'A 70 year old Kenyan patient presents to the hospital and the BP is 160/95. He is also diagnosed of parkinsonism.\n' +
        'a) What is your target when reducing the blood pressure? (1 mark)\n' +
        'b) Which drug would you give him for the hypertension? (1 mark)\n' +
        'c) Which drug would you give him for the parkinsonism? (1 mark)\n' +
        'd) What is the mode of action of the drugs mentioned in b and c above? (4 marks)\n' +
        'e) What are the side effects that you should look out for? (4 marks)',
    },
    {
      stem:
        'A patient is diagnosed of INSOMNIA.\n' +
        'a) Which drug should you give him (1 mark)\n' +
        'b) What is the mode of action of the above drug? (2 marks)\n' +
        'c) What are the side effects that you should look out for? (3 marks)',
    },
    { stem: 'GABA is a target for different drugs. Describe with an example in each case how drugs can target GABA. (4 marks)' },
    { stem: 'Some anticonvulsants are used in bipolar disorder. Give 3 examples of anticonvulsants used in bipolar disorder and describe their mode action. (6 marks)' },
    { stem: 'Give 2 examples of hallucinogens and describe their mode of action. (4 marks)' },
    { stem: 'What are the pharmacological actions of methylxanthines (3 marks)' },
  ]
  p.sections.C = [
    {
      stem:
        'Describe DIAZEPAM in terms of the\n' +
        'a) mode of action (2 marks)\n' +
        'b) clinical applications (5 marks)\n' +
        'c) side effects (3 marks)\n' +
        'd) drug-drug interactions (3 marks)\n' +
        'e) contraindications (3 marks)\n' +
        'f) pharmacokinetics (4 marks)',
    },
    {
      stem:
        'Compare and contrast Baclofen and Dantrolene in terms of the\n' +
        'a) mode of action (4 marks)\n' +
        'b) clinical applications (4 marks)\n' +
        'c) side effects (6 marks)\n' +
        'd) contraindications (3 marks)\n' +
        'e) drug-drug interactions (3 marks)',
    },
    {
      stem:
        'Describe DRUGS USED IN MANAGEMENT OF PARKINSONISM in terms of\n' +
        'a) Classes and examples (4 marks)\n' +
        'b) mode of action (6 marks)\n' +
        'c) Side effects (6 marks)\n' +
        'd) Drug-drug interactions (4 marks)',
    },
  ]
  save('3305', p)
  console.log('3305 fixed: A=' + a.length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- 3306
{
  const p = load('3306')
  p.sections.B = [
    {
      stem:
        'A patient is diagnosed with atrial fibrillation.\n' +
        'a) State THREE (3) drugs that you can give in management of this patient. (3 marks)\n' +
        'b) Explain the mode of action of each of the drugs mentioned in a) above. (6 marks)',
    },
    {
      stem:
        'A 70-year-old Kenyan patient presents to the hospital and the BP is 160/95. He has also been diagnosed with gout and diabetes mellitus.\n' +
        'a) Recommend an appropriate drug that you would give him for management of hypertension. (1 mark)\n' +
        'b) State any other TWO (2) clinical applications of the drug mentioned in a) above. (2 marks)\n' +
        'c) Outline any FOUR (4) side effects that you would look out for. (2 marks)',
    },
    { stem: 'Aspirin is an antiplatelet and an anti-inflammatory. Compare and contrast its mode of action as an antiplatelet and as an anti-inflammatory. (4 marks)' },
    { stem: 'Identify TWO (2) fibrinolytic drugs and TWO (2) antifibrinolytic drugs and describe their mechanism of action. (8 marks)' },
    { stem: 'Atorvastatin is a popular medicine. Elucidate THREE (3) clinical applications and THREE (3) side effects of atorvastatin. (6 marks)' },
    { stem: 'Propose TWO (2) drugs that can be used for management of microcytic hypochromic anemia. (2 marks)' },
    { stem: 'Mention the different types of angina and recommend a drug for management of each type of angina. (6 marks)' },
  ]
  p.sections.C = [
    {
      stem:
        'A 70-year old Kenyan patient presents to the hospital and the average BP is 160/95. He is also diagnosed with STEMI.\n' +
        'a) Formulate a pharmaceutical plan for this patient. (3 marks)\n' +
        'b) Describe the mode of action of the SIX (6) drugs you recommended in a) above (8 marks)\n' +
        'c) State TWO (2) side effects for each drug that you would look out for. (4 marks)',
    },
    {
      stem:
        'A patient suffering from Deep Venous Thrombosis is admitted in the public hospital you are working at.\n' +
        'a) Propose a drug that you would recommend for this patient. (1 mark)\n' +
        'b) Describe the mode of action of the drug mentioned in a) above (2 marks)\n' +
        'c) The patient develops bleeding which is caused by the drug given. Propose an antidote that would counteract the bleeding. (1 mark)\n' +
        'd) Describe the mechanism of action of the antidote mentioned in c) above. (2 marks)\n' +
        'e) After 4 days, she might be discharged, propose a drug that you would recommend for this patient. (1 mark)\n' +
        'f) Describe the mode of action of the drug mentioned in e) above (2 marks)\n' +
        'g) Outline any FOUR (4) side effects of the drug mentioned in e) above (2 marks)\n' +
        'h) Describe any TWO (2) drug-drug interactions that may occur when given with the drug mentioned in e) (4 marks)',
    },
  ]
  save('3306', p)
  console.log('3306 fixed: A=' + A(p).length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- 3307
{
  const p = load('3307')
  const a = A(p)
  // methylxanthine PK merge
  const i4 = findIdx(a, 'pharmacokinetics of methylxanthines')
  const i5 = findIdx(a, 'Theophylline is rapidly and completely absorbed')
  if (i5 !== i4 + 1) throw new Error('3307 i5 order')
  a[i4].options.push(a[i5].stem)
  a.splice(i5, 1)
  // inhaled route split
  const i7 = findIdx(a, 'effectiveness of the inhaled route')
  const q7 = a[i7]
  const antIdx = q7.options.findIndex((o) => o.startsWith('The following statements regarding anticholinergic agents'))
  if (antIdx === -1) throw new Error('3307 anticholinergic not found')
  a.splice(i7 + 1, 0, { stem: q7.options[antIdx], options: q7.options.slice(antIdx + 1) })
  q7.options = q7.options.slice(0, antIdx)
  // leukotriene merge
  const i11 = findIdx(a, 'leukotriene pathway inhibitors EXCEPT')
  const i12 = findIdx(a, 'have been shown to improve asthma control')
  if (i12 !== i11 + 1) throw new Error('3307 i12 order')
  a[i11].options.push(a[i12].stem, ...a[i12].options)
  a.splice(i12, 1)
  // corticosteroid PK merge
  const i13 = findIdx(a, 'pharmacokinetics of corticosteroids EXCEPT')
  const i14 = findIdx(a, 'The half-life of cortisol')
  if (i14 !== i13 + 1) throw new Error('3307 i14 order')
  a[i13].options.push(a[i14].stem, ...a[i14].options)
  a.splice(i14, 1)
  // corticosteroid clinical merge
  const i15 = findIdx(a, 'clinical use of corticosteroids EXCEPT')
  const i16 = findIdx(a, 'High doses of inhaled steroids cause mild adrenal suppression')
  if (i16 !== i15 + 1) throw new Error('3307 i16 order')
  a[i15].options.push(a[i16].stem, ...a[i16].options)
  a.splice(i16, 1)
  // cromolyn AE split
  const i18 = findIdx(a, 'adverse effects of cromolyn EXCEPT')
  const q18 = a[i18]
  const lkIdx = q18.options.findIndex((o) => o.startsWith('The following statements are correct regarding leukotriene'))
  if (lkIdx === -1) throw new Error('3307 leukotriene2 not found')
  a.splice(i18 + 1, 0, { stem: q18.options[lkIdx], options: q18.options.slice(lkIdx + 1) })
  q18.options = q18.options.slice(0, lkIdx)
  B(p).forEach((q) => (q.stem = stripLeadingInstr(q.stem)))
  C(p).forEach((q) => (q.stem = stripLeadingInstr(q.stem)))
  save('3307', p)
  console.log('3307 fixed: A=' + a.length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- 4108
{
  const p = load('4108')
  const a = A(p)
  const i4 = findIdx(a, 'statements about Helicobacter pylori')
  const q4 = a[i4]
  const ibd = q4.options.findIndex((o) => o.includes('irritable bowel disease'))
  const lax = q4.options.findIndex((o) => o.startsWith('Choose the correct statement below concerning laxatives'))
  if (ibd === -1 || lax === -1) throw new Error('4108 split points not found')
  a.splice(i4 + 1, 0, { stem: q4.options[ibd].replace(/^\.\s*/, ''), options: q4.options.slice(ibd + 1, lax) })
  a.splice(i4 + 2, 0, { stem: q4.options[lax], options: q4.options.slice(lax + 1) })
  q4.options = q4.options.slice(0, ibd)
  // regurgitation merge
  const i16 = findIdx(a, 'regurgitation of foul-tasting fluid')
  const i17 = findIdx(a, 'of the drug in the patient’s disease?')
  if (i17 !== i16 + 1) throw new Error('4108 regurgitation order')
  a[i16].stem = a[i16].stem + '\n' + a[i17].stem
  a[i16].options = a[i17].options
  a.splice(i17, 1)
  // rebuild B (5 questions)
  p.sections.B = [
    {
      stem:
        'Match each gastrointestinal drug with the appropriate description (7 Marks)\n' +
        'Drugs: Erythromycin, omeprazole, Magnesium hydroxide, Misoprostol, Sucralfate, metoclopramide, Docusate, Aprepitant, Aluminium hydroxide, Ranitidine, Mesalamine, Bisacodyl\n' +
        'Descriptions:\n' +
        '1. A drug that can increase intestinal peristalsis by activating motilin receptors\n' +
        '2. An antiulcer agent that can inhibit 24-hour gastric acid secretion up to 95%\n' +
        '3. A salicylate derivative used in inflammatory bowel diseases\n' +
        '4. An antiemetic drug used primarily for chemotherapy-induced vomiting\n' +
        '5. An antacid that also has laxative properties\n' +
        '6. A prostaglandin E1 analogue that can have a cytoprotective effect on gastric mucosa\n' +
        '7. An antiulcer agent that binds to necrotic peptic ulcer tissue, thus acting as a barrier to gastric juice (This is a small molecule that polymerizes in stomach acid and coats the ulcer bed, resulting in accelerated healing and reduction of symptoms.)',
    },
    { stem: 'Using a suitable example illustrate the mode of action and clinical use of one emetic agent (3 Marks)' },
    { stem: 'A patient who has been diabetic for the last 25 years is diagnosed with gastroparesis. Recommend an antibiotic drug that could be used to manage this condition and describe the mode of action of this drug (3 Marks)' },
    { stem: 'A patient travelling from Japan visits Nakuru and is diagnosed with traveler’s diarrhea. Identify and explain the mechanism of action of a drug that you would recommend to reduce the number of bowel movements (3 Marks)' },
    {
      stem:
        'S.W is a 32-year-old lady who is 5 months pregnant. She calls you for advice regarding her heartburn which seems to be worsening. Currently she is not on any medication. With reason(s), identify the antacids you would advise her to chew and the one(s) you would advise her to avoid. (4 Marks)',
    },
  ]
  C(p).forEach((q) => (q.stem = stripLeadingInstr(q.stem)))
  save('4108', p)
  console.log('4108 fixed: A=' + a.length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- 4109
{
  const p = load('4109')
  const a = A(p)
  const splits = [
    ['Regarding erythromycin', 'All of the following are recognized adverse effects of isoniazid EXCEPT'],
    ['Methicillin-resistant staphylococci', 'The mechanism of antibacterial action of tetracycline involves'],
    ['Concerning quinupristin-dalfopristin', 'All of the following statements about the clinical uses of the aminoglycosides are accurate'],
  ]
  for (const [qsub, splitAt] of splits) {
    const i = findIdx(a, qsub)
    const q = a[i]
    const ki = q.options.findIndex((o) => o.startsWith(splitAt))
    if (ki === -1) throw new Error('4109 split not found for ' + qsub)
    a.splice(i + 1, 0, { stem: q.options[ki], options: q.options.slice(ki + 1) })
    q.options = q.options.slice(0, ki)
  }
  // fix "Lt" OCR artifacts → "It"
  for (const q of a) {
    q.options = q.options.map((o) => o.replace(/\bLt\b/g, 'It'))
  }
  p.sections.B = [
    { stem: 'Giving examples, explain the rationale behind combination of antibiotics (5 Marks)' },
    { stem: 'Describe 5 general mechanisms through which bacteria develop resistance against antibiotics (5 Marks)' },
    { stem: 'Explain the 4 different generations of cephalosporins clearly showing the spectrum of anti-microbial activity of each generation (8 Marks)' },
    { stem: 'a) Explain the mechanism of action of sulfonamides (2 Marks)\nb) Outline 3 adverse effects of sulfonamides' },
    { stem: 'a) Explain the mechanism of action of aminoglycosides (2 Marks)\nb) Outline 3 adverse effects of aminoglycosides (3 Marks)' },
    {
      stem:
        'You are discussing the microbiological results of a fecal sample with the hospital microbiologist. They are reporting that the patient has acquired a C. difficile infection.\n' +
        'a) Clostridium difficile infection (CDI) is often precipitated by the use of broad spectrum antibiotics. Describe what is meant by the term ‘broad-spectrum’ antibiotics (1 Mark)\n' +
        'b) Identify two antibiotics in different classes that are associated with an increased risk of developing pseudomembranous colitis as a result of infection with C. difficile (2 Marks)\n' +
        'c) Name 2 antibiotics (include the preferred route of administration) that can be used to manage this infection (2 Marks)',
    },
    { stem: 'List 2 adverse effects and 2 therapeutic uses associated with metronidazole (2 Marks)' },
    {
      stem:
        'A 59-year-old woman presents to an urgent care clinic with a 4-day history of frequent and painful urination. She has had fevers, chills, and flank pain for the past 2 days. Her physician advised her to come immediately to the clinic for evaluation. In the clinic she is febrile (38.5°C) but otherwise stable and states she is not experiencing any nausea or vomiting. Her urine dipstick test is positive for leukocyte esterase. Urinalysis and urine culture are ordered. Her past medical history is significant for three urinary tract infections in the past year. Each episode was uncomplicated, treated with trimethoprim-sulfamethoxazole, and promptly resolved. She also has osteoporosis for which she takes a daily calcium supplement. The decision is made to treat her with oral antibiotics for a complicated urinary tract infection with close follow-up.\n' +
        'a) Give 3 reasonable empiric antibiotics for this patient (3 Marks)\n' +
        'b) Depending on the antibiotic choice are there potential drug interactions? Explain (2 Marks)',
    },
  ]
  C(p).forEach((q) => (q.stem = stripLeadingInstr(q.stem)))
  save('4109', p)
  console.log('4109 fixed: A=' + a.length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- 4209
{
  const p = load('4209')
  const a = A(p)
  const splits = [
    ['most effective against Wuchereria bancrofti', 'An infant with severe respiratory syncytial virus'],
    ['Rationale for the use of leucovorin calcium', 'Concerning sulfonamides'],
  ]
  for (const [qsub, splitAt] of splits) {
    const i = findIdx(a, qsub)
    const q = a[i]
    const ki = q.options.findIndex((o) => o.startsWith(splitAt))
    if (ki === -1) throw new Error('4209 split not found for ' + qsub)
    a.splice(i + 1, 0, { stem: q.options[ki], options: q.options.slice(ki + 1) })
    q.options = q.options.slice(0, ki)
  }
  B(p).forEach((q) => (q.stem = stripLeadingInstr(q.stem)))
  C(p).forEach((q) => (q.stem = stripLeadingInstr(q.stem)))
  save('4209', p)
  console.log('4209 fixed: A=' + a.length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- 5111
{
  const p = load('5111')
  p.sections.B = [
    {
      stem:
        'A patient is diagnosed with Hodgkin’s lymphoma. He is prescribed ABVD.\n' +
        'a) What are the drugs represented by ABVD? (2 marks)\n' +
        'b) Describe the mode of action of each of the drugs in a) above (8 marks)\n' +
        'c) Outline any TWO (2) side effects of each of the drugs mentioned in a) above (8 marks)',
    },
    { stem: 'Outline any TWO (2) topical drugs that can be used for management of acne and describe their mode of action. (6 marks)' },
    { stem: 'Apraclonidine and pilocarpine can be used for glaucoma. Compare and contrast their mode of action in management of glaucoma (4 marks)' },
    {
      stem: 'Describe the mode of action of the following drugs:\n' + 'a) Sirolimus (2 marks)\n' + 'b) Azathioprine (2 marks)\n' + 'c) Mycophenolate mofetil (2 marks)',
    },
    {
      stem:
        'Checkpoint inhibitors are relatively new anticancer agents.\n' +
        'a) Mention any THREE (3) classes of checkpoint inhibitors with one example in each case. (3 marks)\n' +
        'b) State any two side effects of each of the drugs mentioned in a) above (3 marks)',
    },
  ]
  const c = C(p)
  const c1 = c[0]
  const lines = c1.stem.split('\n')
  const fundo = lines.findIndex((l) => l.startsWith('For fundoscopic examination'))
  if (fundo === -1) throw new Error('5111 fundoscopic not found')
  p.sections.C = [{ stem: lines.slice(0, fundo).join('\n').trim() }, { stem: lines.slice(fundo).join('\n').trim() }]
  save('5111', p)
  console.log('5111 fixed: A=' + A(p).length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- 5112
{
  const p = load('5112')
  const a = A(p)
  const i19 = findIdx(a, 'complication of mineralocorticoid treatment')
  a[i19].options = a[i19].options.filter((o) => !/^Answer:\s*C$/i.test(o))
  const i29 = findIdx(a, 'mini pill for contraception')
  const i30 = findIdx(a, 'These pills are potent suppressors of ovulation')
  if (i30 !== i29 + 1) throw new Error('5112 mini pill order')
  a[i29].options.push(a[i30].stem, ...a[i30].options)
  a.splice(i30, 1)
  B(p).forEach((q) => (q.stem = stripLeadingInstr(q.stem)))
  const c = C(p)
  const c1 = c[0]
  const cl = c1.stem.split('\n')
  const cort = cl.findIndex((l) => l.startsWith('Describe CORTICOSTEROIDS'))
  if (cort === -1) throw new Error('5112 corticosteroids not found')
  p.sections.C = [{ stem: cl.slice(0, cort).join('\n').trim() }, { stem: cl.slice(cort).join('\n').trim() }]
  save('5112', p)
  console.log('5112 fixed: A=' + a.length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- 5314
{
  const p = load('5314')
  // Rebuild A from raw (statement-style stems)
  const raw = fs
    .readFileSync(
      'scripts/out/old-papers/pharmacology_kabarak_university_PHAM_5314Pharmacology_XIV_(Toxicology_and_drug_discovery_and_development).txt',
      'utf8'
    )
    .replace(/\r/g, '')
  const lines = raw.split('\n')
  const aIdx = lines.findIndex((l) => /^SECTION A: MULTIPLE CHOICE/i.test(l))
  const bIdx = lines.findIndex((l, i) => i > aIdx && /^SECTION\s*B\b/i.test(l))
  const aLines = lines.slice(aIdx + 1, bIdx).filter((l) => l.trim() !== '')
  const questions = []
  let cur = null
  for (const l of aLines) {
    const t = l.trim()
    if (cur === null) cur = { stem: t, options: [] }
    else if (cur.options.length < 4) cur.options.push(t)
    else {
      questions.push(cur)
      cur = { stem: t, options: [] }
    }
  }
  if (cur) questions.push(cur)
  p.sections.A = questions
  p.sections.B = [
    { stem: 'Give six approaches that could be used in the discovery of drugs (6 marks)' },
    { stem: 'Describe five fundamental points of good laboratory practices (GLP) to be considered during pre-clinical safety testing (10 marks)' },
    { stem: 'Giving examples, describe the concepts of bioaccumulation and biomagnification in relation to environmental pollutants (4 marks)' },
    {
      stem:
        'Give the common clinical effect expected to be observed in the following cases of poisoning (5 marks)\n' +
        'a) Acute SO2 inhalation\n' +
        'b) Acute chloroform inhalation\n' +
        'c) Chronic benzene exposure\n' +
        'd) Acute NO2 inhalation\n' +
        'e) Chronic asbestos exposure',
    },
    { stem: 'Give three examples of botanical pesticides of toxicological importance (3 marks)' },
    { stem: 'Describe the four phases of clinical studies during drug development (8 marks)' },
    {
      stem:
        'Z.T. is a 53 year old male patient who was started on warfarin (5 m.g. o.d) one month ago following an episode of deep venous thrombosis in his left femoral vein which he developed during when he was admitted for acute complications of T.B. that was the cause of the above admission. He is visiting your anticoagulation clinic for international normalized ratio (INR) monitoring. The INR is 1.2 (desired target 2-3). A doppler ultra sound of the affected region shows no change in clot size from baseline. Swelling of the left lower limb has also not reduced. He reports that he is faithfully taking his anti-TB medication and attends TB clinic.\n' +
        'a) Describe the drug-drug interaction that is likely to be at play in Z.T. (2 marks)\n' +
        'b) Describe two interventions that you could initiate to overcome or avoid the above interaction (2 marks)',
    },
  ]
  p.sections.C = [
    {
      stem:
        'S.K. is a 16 year old male patient admitted to your in-patient unit with altered consciousness and several episodes of seizures. His caregivers report that he drank a bottle-full of insecticide whose container they carried. He is producing copious secretions from his mouth and nose and eyes, has emptied his bowels and bladder several times and vomited. Wheezing is audible on chest auscultation. The musculoskeletal examination reveals profound weakness in his arms and legs; muscle twitches are also present. His respiratory muscle effort is also diminished. On admission the heart rate was 51 beats per minute and the respiratory rate was 10 breaths per minute. Other vital signs are within the normal range. After establishing that his airway is clear and instituting supportive care to stabilize vitals and fluid status you are able to identify chlorpyrifos (an organophosphate) as the active agent.\n' +
        'a) Describe the mechanism of anticholinesterase insecticides (both organophosphates and carbamate) (3 marks)\n' +
        'b) Outline the clinical effects of anticholinesterase insecticide poisoning on S.K. based on Ach activity on each of the following receptors\n' +
        '   Muscarinic (5 marks)\n' +
        '   CNS receptors (mixed type) (2 marks)\n' +
        '   Nicotinic-neuromuscular neurons (2 marks)\n' +
        '   Nicotinic-sympathetic (2 marks)\n' +
        'c) State the antidote that is likely to improve symptoms of muscle weakness in S.K. (1 mark)',
    },
    { stem: 'Describe seven problems likely to be encountered during drug administration to pediatric patients through the intravenous route and suggest solutions (13 marks)' },
    { stem: 'Define the role of compound optimization and the end product of this process in the drug development process (2 marks)' },
  ]
  save('5314', p)
  console.log('5314 fixed: A=' + questions.length + ' B=' + B(p).length + ' C=' + C(p).length)
}

// ---------------------------------------------------------------- summary
console.log('\n=== FINAL COUNTS ===')
let total = 0
for (const code of Object.keys(load('3101')).length ? ['3101', '3102', '3203', '3305', '3306', '3307', '4108', '4109', '4209', '5111', '5112', '5314'] : []) {
  const p = load(code)
  const bad = A(p).filter((q) => q.options.length < 3 || q.options.length > 5)
  const n = A(p).length + B(p).length + C(p).length
  total += n
  console.log(`${code}: A=${A(p).length} B=${B(p).length} C=${C(p).length} TOTAL=${n}  badA=${bad.length}`)
}
console.log('GRAND TOTAL:', total)
