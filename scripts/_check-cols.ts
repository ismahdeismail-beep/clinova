import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
const { data, error } = await admin.from('drug_images').select('*').limit(1)
console.log('columns:', data && data[0] ? Object.keys(data[0]).join(', ') : error?.message)
