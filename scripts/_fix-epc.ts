import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data: classes } = await admin.from('drug_classes').select('id, name')
const clsByName = new Map<string, string>()
for (const c of classes ?? []) clsByName.set(c.name.toLowerCase(), c.id)

// keyword → root class text
const KW: [RegExp, string][] = [
  [/antibacterial|antimicrobial|antifungal|antimalarial|antiprotozoal|neuraminidase|antiviral|anthelmintic|bacteriophage/i, 'Antimicrobial agent'],
  [/angiotensin|diuretic|vasodilator|adrenergic blocker|calcium channel|nitrate|anti-anginal|aldosterone|cardiac|antiarrhythmic|statin/i, 'Cardiovascular agent'],
  [/interferon|interleukin|antibody|immunosuppress/i, 'Immunomodulatory / biologic agent'],
  [/antidepressant|antipsychotic|anxiolytic|anticonvulsant|barbiturate|benzodiazepine|stimulant|sedative|hypnotic|opioid|analgesic|antiparkinson/i, 'Central nervous system agent'],
  [/antihistamine|bronchodilator|corticosteroid|glucocorticoid|leukotriene|mast cell|decongestant|expectorant/i, 'Respiratory agent'],
  [/acid suppress|proton pump|antacid|antiemetic|laxative|antidiarrheal|antispasmodic|antiulcer|hepatic/i, 'Gastrointestinal agent'],
  [/insulin|antidiabetic|thyroid|estrogen|progestin|androgen|gonadotropin|antithyroid|bisphosphonate|corticosteroid|calcitonin|parathyroid|sulfonylurea/i, 'Endocrine / metabolic agent'],
  [/antineoplastic|chemotherap|cytotoxic|alkylating|antimetabolite|kinase inhibitor|topoisomerase|platinum/i, 'Antineoplastic / chemotherapeutic agent'],
  [/vitamin|mineral|electrolyte|supplement|nutritional/i, 'Nutritional supplement / vitamin'],
  [/anticoagulant|antithrombotic|thrombolytic|fibrinolytic|antiplatelet/i, 'Anticoagulant / antithrombotic agent'],
  [/chelating|antidote|toxicol/i, 'Antidote / toxicology agent'],
  [/dermatolog|acne|psoriasis|emollient|keratolytic/i, 'Dermatological agent'],
  [/anesthetic|anaesthetic|neuromuscular/i, 'Anaesthetic agent'],
  [/ophthalmic|eye/i, 'Ophthalmic agent'],
]

const { data } = await admin.from('drug_monographs').select('id, generic_name, drug_class').is('drug_class_id', null)
let fixed = 0, ophth = 0
for (const r of data ?? []) {
  const text = r.drug_class || ''
  const ophthHit = /ophthalmic|eye/i.test(text)
  if (ophthHit) { ophth++; continue }
  const hit = KW.find(([re]) => re.test(text))
  if (!hit) { console.log('unmapped:', r.generic_name, '|', text); continue }
  const id = clsByName.get(hit[1].toLowerCase())
  if (!id) continue
  const { error } = await admin.from('drug_monographs').update({ drug_class_id: id }).eq('id', r.id)
  if (error) console.log('err', r.generic_name, error.message)
  else fixed++
}
console.log('fixed:', fixed, '| ophthalmic expected:', ophth)
