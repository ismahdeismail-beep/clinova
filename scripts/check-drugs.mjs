import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

async function main() {
  // Check drugs
  const { data: drugs, error: dErr } = await supabase.from('drug_monographs').select('id, generic_name, name').limit(20);
  if (dErr) console.error('Drug error:', dErr.message);
  else console.log('Drugs:', JSON.stringify(drugs, null, 2));

  // Check image count
  const { data: imgs, error: iErr } = await supabase.from('drug_images').select('count');
  if (iErr) console.error('Image error:', iErr.message);
  else console.log('Image count:', imgs);

  // Test Wikimedia Commons API
  try {
    const url = new URL('https://commons.wikimedia.org/w/api.php');
    url.searchParams.set('action', 'query');
    url.searchParams.set('format', 'json');
    url.searchParams.set('list', 'search');
    url.searchParams.set('srsearch', 'amoxicillin tablet filetype:bitmap');
    url.searchParams.set('srnamespace', '6');
    url.searchParams.set('srlimit', '3');
    url.searchParams.set('srprop', '');
    const res = await fetch(url.toString());
    const data = await res.json();
    console.log('Wikimedia test:', JSON.stringify(data, null, 2).substring(0, 800));
  } catch (e) {
    console.error('Wikimedia error:', e.message);
  }
}
main();
