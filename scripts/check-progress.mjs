import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function main() {
  // Check progress file
  if (fs.existsSync('scripts/seed-progress.json')) {
    const progress = JSON.parse(fs.readFileSync('scripts/seed-progress.json', 'utf-8'));
    console.log('Progress file exists:', progress.processedIds.length, 'drugs processed');
    console.log('Last update:', progress.timestamp);
    console.log('Total inserted so far:', progress.totalInserted);
  } else {
    console.log('No progress file found');
  }

  // Check total images in DB
  const { data: imgCount, error: iErr } = await supabase.from('drug_images').select('count');
  if (iErr) console.error('Image count error:', iErr.message);
  else console.log('Total images in DB:', imgCount[0]?.count);

  // Check total drugs
  const { data: drugCount, error: dErr } = await supabase.from('drug_monographs').select('count');
  if (dErr) console.error('Drug count error:', dErr.message);
  else console.log('Total drugs in DB:', drugCount[0]?.count);
}
main();
