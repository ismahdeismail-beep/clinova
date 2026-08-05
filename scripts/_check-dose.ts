import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data } = await admin.from('drug_monographs').select('adult_dosing, pediatric_dosing, dosage').limit(200)
const adult = (data ?? []).filter((r: any) => r.adult_dosing && Object.keys(r.adult_dosing).length).length
const ped = (data ?? []).filter((r: any) => r.pediatric_dosing && Object.keys(r.pediatric_dosing).length).length
const dosage = (data ?? []).filter((r: any) => r.dosage && Object.keys(r.dosage).length).length
console.log('of 200:', 'adult_dosing:', adult, '| pediatric_dosing:', ped, '| dosage json:', dosage)
