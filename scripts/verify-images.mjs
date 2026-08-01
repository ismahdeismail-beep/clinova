import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function main() {
  // Check total images
  const { data: allImages, error: allErr } = await supabase.from('drug_images').select('*');
  if (allErr) { console.error('Error:', allErr.message); return; }
  console.log('Total images in DB:', allImages.length);

  // Check a specific drug that should have images (Abacavir)
  const { data: drugs, error: dErr } = await supabase.from('drug_monographs').select('id, generic_name, name').limit(5);
  if (dErr) { console.error('Drug error:', dErr.message); return; }

  for (const drug of drugs) {
    const { data: imgs, error: iErr } = await supabase
      .from('drug_images')
      .select('id, generic_name, dosage_form, image_url, thumbnail_url, source')
      .eq('drug_id', drug.id);
    if (iErr) { console.error(`Image error for ${drug.generic_name}:`, iErr.message); continue; }
    console.log(`${drug.generic_name}: ${imgs?.length || 0} images`);
    if (imgs && imgs.length > 0) {
      console.log(`  First image URL: ${imgs[0].image_url?.substring(0, 100)}...`);
    }
  }

  // Test the API endpoint for a drug with images
  if (drugs && drugs.length > 0) {
    const testDrug = drugs[0];
    const testDrugId = testDrug.id;

    // Find a drug with images
    const { data: drugWithImages } = await supabase
      .from('drug_images')
      .select('drug_id')
      .limit(1);

    if (drugWithImages && drugWithImages.length > 0) {
      const targetDrugId = drugWithImages[0].drug_id;
      console.log(`\nTesting API endpoint for drug: ${targetDrugId}`);

      try {
        const apiUrl = `http://localhost:3000/api/drugs/${targetDrugId}/images`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log(`API status: ${res.status}`);
        console.log(`API response:`, JSON.stringify(data).substring(0, 500));
      } catch (e) {
        console.error(`API test failed: ${e.message}`);
        console.log('Note: API server may not be running. Start it with: npm run dev');
      }
    }
  }
}
main();
