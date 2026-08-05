import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
});

const { data: drugs } = await admin
  .from('drug_monographs')
  .select('id, generic_name')
  .gte('created_at', '2026-08-01T00:00:00Z')
  .limit(1000);

if (!drugs) throw new Error('no drugs');

// Check which have images
const drugIds = drugs.map((d: any) => d.id);
const { data: images } = await admin
  .from('drug_images')
  .select('drug_id')
  .in('drug_id', drugIds);

const imageDrugIds = new Set((images || []).map((r: any) => r.drug_id));
const zeroImageDrugs = drugs.filter((d: any) => !imageDrugIds.has(d.id));

console.log('New drugs (>=2026-08-01):', drugs.length);
console.log('With images:', drugs.length - zeroImageDrugs.length);
console.log('Zero images:', zeroImageDrugs.length);

const ids = zeroImageDrugs.map((d: any) => d.id);
fs.writeFileSync(
  'storage/p7-newdrugs.json',
  JSON.stringify({ generatedAt: new Date().toISOString(), count: ids.length, ids }, null, 2)
);
console.log('Saved storage/p7-newdrugs.json with', ids.length, 'IDs');
