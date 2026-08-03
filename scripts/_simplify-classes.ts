// Simplify drug_classes display names: short, scannable class names that match
// the frontend DRUG_CLASS_CONFIG color map (e.g. "Aminoglycoside antibiotic",
// "Benzodiazepine", "ARB"). The old verbose description is preserved in the
// `description` column when it's empty.
//
// Usage: npx tsx scripts/_simplify-classes.ts [--dry-run]
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const dryRun = process.argv.includes('--dry-run')
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
})

const SHORT_NAMES: Record<string, string> = {
  '5-HT₃ receptor antagonist (antiemetic)': '5-HT₃ antagonist (antiemetic)',
  'Aminoglycoside antibiotic — bactericidal, concentration-dependent killing': 'Aminoglycoside antibiotic',
  'Analgesic (non-opioid) and antipyretic — mechanism involves central COX inhibition, serotonergic descending pathways, and endocannabinoid system': 'Non-opioid analgesic / antipyretic',
  'Angiotensin II receptor blocker (ARB)': 'ARB (angiotensin II receptor blocker)',
  'Angiotensin-converting enzyme (ACE) inhibitor': 'ACE inhibitor',
  'Antiepileptic; mood stabiliser': 'Antiepileptic (mood stabiliser)',
  'Antiepileptic; mood stabiliser; anticonvulsant': 'Antiepileptic (anticonvulsant)',
  'Antimalarial (artemisinin-based combination therapy — ACT)': 'Antimalarial (ACT)',
  'Antipsychotic (first-generation / typical antipsychotic — butyrophenone)': 'Antipsychotic (typical)',
  'Antipsychotic (second-generation / atypical antipsychotic — benzisoxazole derivative)': 'Antipsychotic (atypical)',
  'Benzimidazole anthelmintic — microtubule disruptor (inhibits polymerisation of β-tubulin → impairs glucose uptake → death of helminth)': 'Anthelmintic (benzimidazole)',
  'Benzodiazepine — long-acting (half-life 20–100 hours; active metabolite desmethyldiazepam t½ 36–200 hours); anxiolytic, sedative, hypnotic, anticonvulsant, muscle relaxant': 'Benzodiazepine',
  'Beta-1 selective adrenergic receptor blocker (cardioselective beta-blocker)': 'Beta-blocker (cardioselective)',
  'Biguanide (oral antihyperglycaemic)': 'Biguanide (antidiabetic)',
  'Carbonic anhydrase inhibitor': 'Carbonic anhydrase inhibitor',
  'Cardiac glycoside': 'Cardiac glycoside',
  'Centrally acting alpha-2 adrenergic agonist': 'Central alpha-2 agonist',
  'Corticosteroid (glucocorticoid — intermediate-acting)': 'Corticosteroid (glucocorticoid)',
  'Corticosteroid (glucocorticoid with mineralocorticoid activity — short-acting)': 'Corticosteroid (glucocorticoid + mineralocorticoid)',
  'Direct-acting vasodilator (arteriolar dilator)': 'Vasodilator (arteriolar)',
  'First-generation antihistamine (H₁-receptor antagonist) — sedating alkylamine': 'Antihistamine (H₁, sedating)',
  'First-generation cephalosporin': 'First-generation cephalosporin',
  'First-line antitubercular (bactericidal — inhibits mycolic acid synthesis)': 'Antitubercular (first-line)',
  'Fluoroquinolone antibiotic': 'Fluoroquinolone antibiotic',
  'Folate synthesis inhibitor (sulphonamide + diaminopyrimidine combination)': 'Folate synthesis inhibitor (co-trimoxazole)',
  'HMG-CoA reductase inhibitor (statin)': 'Statin',
  'Integrase strand transfer inhibitor (INSTI) — HIV antiretroviral': 'HIV integrase inhibitor (INSTI)',
  'Intermediate-acting insulin (pre-mixed formulation)': 'Insulin (intermediate-acting)',
  'Loop diuretic': 'Loop diuretic',
  'Macrolide antibiotic': 'Macrolide antibiotic',
  'Mood stabiliser (antimanic)': 'Mood stabiliser',
  'Nitroimidazole antibiotic / antiprotozoal': 'Nitroimidazole antibiotic / antiprotozoal',
  'Non-steroidal anti-inflammatory drug (NSAID) — non-selective COX-1/COX-2 inhibitor (propionic acid derivative)': 'NSAID (non-selective)',
  'Nucleotide reverse transcriptase inhibitor (NtRTI) — HIV antiretroviral': 'HIV reverse transcriptase inhibitor (NtRTI)',
  'Opioid analgesic (full mu-opioid receptor agonist — natural alkaloid)': 'Opioid analgesic',
  'Oral iron preparation (haematinic)': 'Iron supplement',
  'Osmotic laxative; ammonia-lowering agent': 'Osmotic laxative',
  'Penicillin + beta-lactamase inhibitor': 'Penicillin + beta-lactamase inhibitor',
  'Penicillinase-resistant (anti-staphylococcal) penicillin — isoxazolyl penicillin': 'Penicillinase-resistant penicillin',
  'Potassium-sparing diuretic (mineralocorticoid receptor antagonist)': 'Potassium-sparing diuretic',
  'Proton pump inhibitor (PPI) — substituted benzimidazole': 'Proton pump inhibitor (PPI)',
  'Rifamycin antibiotic (first-line antitubercular — bactericidal)': 'Rifamycin antibiotic',
  'Short-acting insulin': 'Insulin (short-acting)',
  'Sulphonylurea (insulin secretagogue) — second-generation': 'Sulphonylurea (2nd generation)',
  'Tetracycline antibiotic': 'Tetracycline antibiotic',
  'Thyroid hormone (T₄) — synthetic': 'Thyroid hormone (T₄)',
  'Triazole antifungal': 'Triazole antifungal',
  'Vitamin K antagonist (anticoagulant)': 'Vitamin K antagonist',
  'Water-soluble B vitamin (cobalamin)': 'Vitamin B12 (cobalamin)',
  'Water-soluble B vitamin (folate)': 'Folate (vitamin B9)',
}

async function main() {
  const { data: classes, error } = await admin.from('drug_classes').select('id, name, parent_id, description')
  if (error || !classes) throw new Error(`fetch: ${error?.message}`)
  console.log(`total classes: ${classes.length}`)

  let renamed = 0
  for (const c of classes) {
    const short = SHORT_NAMES[c.name]
    if (!short || short === c.name) continue
    const updates: Record<string, unknown> = { name: short }
    if (!c.description || !c.description.trim()) {
      updates.description = c.name // preserve the verbose detail
    }
    console.log(`  ${c.name.substring(0, 60)}  →  ${short}`)
    if (!dryRun) {
      const { error: ue } = await admin.from('drug_classes').update(updates).eq('id', c.id)
      if (ue) throw new Error(`update ${c.name}: ${ue.message}`)
    }
    renamed++
  }
  console.log(dryRun ? `DRY RUN — ${renamed} would be renamed` : `done — ${renamed} renamed`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
