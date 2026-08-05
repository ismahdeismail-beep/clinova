import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })

// Check the 293 newly-seeded rows (created today) for enrichment quality
const { data } = await admin.from('drug_monographs').select('generic_name, mechanism_of_action, pharmacokinetics, overdose, clinical_pearls, brand_names, indications, contraindications').gte('created_at', '2026-08-03T00:00:00')
const rows = data ?? []
console.log('rows created today:', rows.length)
const hasMoa = rows.filter((r: any) => (r.mechanism_of_action || '').length > 60 && !/refer to current/i.test(r.mechanism_of_action)).length
const hasPk = rows.filter((r: any) => (r.pharmacokinetics || '').length > 60).length
const hasOd = rows.filter((r: any) => (r.overdose || '').length > 60).length
const hasPearls = rows.filter((r: any) => (r.clinical_pearls || []).length > 0).length
const hasBrands = rows.filter((r: any) => (r.brand_names || []).length > 0).length
const hasInd = rows.filter((r: any) => (r.indications || []).length >= 3).length
const hasCi = rows.filter((r: any) => (r.contraindications || []).length >= 2).length
console.log(`MOA: ${hasMoa}/${rows.length} | PK: ${hasPk} | OD: ${hasOd} | pearls: ${hasPearls} | brands: ${hasBrands} | indications≥3: ${hasInd} | CI≥2: ${hasCi}`)
