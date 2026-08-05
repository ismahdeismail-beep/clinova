import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const names = ['Piperacillin/Tazobactam','Trimethoprim','Co-trimoxazole','Chloramphenicol','Artemether','Proguanil','Isoniazid','Colistin','Perindopril','Captopril','Timolol','Triamterene','Paracetamol','Lithium','Furosemide','Folic Acid','Cyanocobalamin','Levothyroxine','Tenofovir Alafenamide']
for (const n of names) {
  const { data } = await admin.from('drug_monographs').select('name, generic_name').eq('name', n).limit(2)
  console.log(n.padEnd(25), '→', (data ?? []).map((r: any) => `${r.name} [${r.generic_name}]`).join(' | ') || 'not found')
}
