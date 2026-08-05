import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const names = ['Clindamycin','Erythromycin','Betamethasone','Hydrocortisone','Mometasone','Fluticasone','Triamcinolone','Clotrimazole','Miconazole','Ketoconazole','Terbinafine','Ivermectin','Tacrolimus','Epinephrine','Adrenaline','Minocycline','Medroxyprogesterone','Cotrimoxazole','Co-trimoxazole']
for (const n of names) {
  const { data } = await admin.from('drug_monographs').select('generic_name').ilike('generic_name', `%${n}%`).limit(3)
  console.log(n.padEnd(20), '→', (data ?? []).map((r: any) => r.generic_name).join(' | ') || 'NOT IN DB')
}
