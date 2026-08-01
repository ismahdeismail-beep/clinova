import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const ACCEPTED_LICENSES = [
  'public domain', 'cc0', 'cc by', 'cc by-sa',
  'creative commons attribution', 'creative commons attribution-sharealike',
];

function isLicenseAccepted(license) {
  return ACCEPTED_LICENSES.some((a) => license.toLowerCase().includes(a));
}

async function fetchJson(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url.toString(), {
        headers: { 'User-Agent': 'ClinovaBot/1.0', 'Accept': 'application/json' },
      });
      if (res.status === 429) {
        const w = 20000 * (i + 1);
        console.log(`  [RATE] waiting ${w}ms`);
        await new Promise((r) => setTimeout(r, w));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, 10000 * (i + 1)));
    }
  }
  throw new Error('retries exhausted');
}

async function main() {
  const { data: allDrugs } = await supabase.from('drug_monographs').select('id, generic_name, name').order('generic_name');
  const { data: drugsWithImages } = await supabase.from('drug_images').select('drug_id').limit(10000);

  const hasImg = new Set((drugsWithImages || []).map((r) => r.drug_id));
  const missing = (allDrugs || []).filter((d) => !hasImg.has(d.id));

  console.log(`Total: ${allDrugs?.length}, With images: ${hasImg.size}, Missing: ${missing.length}`);

  // Build a single search query for ALL missing drugs at once
  // Wikimedia search supports OR queries
  const drugNames = missing.map((d) => d.generic_name || d.name).filter(Boolean);

  // Split into batches of 10 drugs per search query
  const batchSize = 10;
  let inserted = 0;
  let failed = 0;

  for (let i = 0; i < drugNames.length; i += batchSize) {
    const batch = drugNames.slice(i, i + batchSize);
    const batchDrugNames = batch.join(' tablet ');

    console.log(`[Batch ${Math.floor(i / batchSize) + 1}] Searching for ${batch.length} drugs...`);

    try {
      // Search for images for all drugs in this batch
      const sUrl = new URL('https://commons.wikimedia.org/w/api.php');
      sUrl.searchParams.set('action', 'query');
      sUrl.searchParams.set('format', 'json');
      sUrl.searchParams.set('list', 'search');
      sUrl.searchParams.set('srsearch', `${batchDrugNames} filetype:bitmap`);
      sUrl.searchParams.set('srnamespace', '6');
      sUrl.searchParams.set('srlimit', '50');
      sUrl.searchParams.set('srprop', '');

      const sData = await fetchJson(sUrl);
      const pages = sData?.query?.search || [];

      console.log(`  Found ${pages.length} image results`);

      // For each result, get image info and try to match to a drug
      for (const page of pages) {
        const title = page.title.replace(/^File:/, '');

        // Try to match this image to a drug in our batch
        let matchedDrug = null;
        for (const d of missing) {
          const name = d.generic_name || d.name;
          if (title.toLowerCase().includes(name.toLowerCase().split(' ')[0])) {
            matchedDrug = d;
            break;
          }
        }

        if (!matchedDrug) continue;
        if (hasImg.has(matchedDrug.id)) continue;

        try {
          const iUrl = new URL('https://commons.wikimedia.org/w/api.php');
          iUrl.searchParams.set('action', 'query');
          iUrl.searchParams.set('format', 'json');
          iUrl.searchParams.set('titles', page.title);
          iUrl.searchParams.set('prop', 'imageinfo');
          iUrl.searchParams.set('iiprop', 'url|extmetadata');
          iUrl.searchParams.set('iiurlwidth', '800');

          const iData = await fetchJson(iUrl);
          const ip = Object.values(iData?.query?.pages || {})[0];
          const ii = ip?.imageinfo?.[0];
          if (!ii) continue;

          const license = (ii.extmetadata?.LicenseShortName?.value || 'Unknown').toString();
          if (!isLicenseAccepted(license)) continue;

          const { error } = await supabase.from('drug_images').insert({
            drug_id: matchedDrug.id,
            generic_name: matchedDrug.generic_name || matchedDrug.name,
            dosage_form: 'tablet',
            strength: '',
            image_url: ii.url,
            thumbnail_url: ii.thumburl || ii.url,
            large_url: ii.url,
            medium_url: ii.url,
            source: 'Wikimedia Commons',
            license,
            license_url: (ii.extmetadata?.LicenseUrl?.value || '').toString(),
            author: (ii.extmetadata?.Artist?.value || 'Unknown').toString(),
            page_url: ii.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
            hash: `wikimedia-${matchedDrug.id}-0`,
            verified: false,
            quality_score: 0.5,
            rejection_reason: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

          if (error) { console.error(`  Insert error for ${matchedDrug.generic_name}: ${error.message}`); failed++; }
          else { inserted++; hasImg.add(matchedDrug.id); console.log(`  [OK] ${matchedDrug.generic_name}`); }
        } catch (e) { failed++; }
      }
    } catch (e) {
      console.error(`  Batch failed: ${e.message}`);
      failed += batch.length;
    }

    // Wait 15 seconds between batches to avoid rate limiting
    if (i + batchSize < drugNames.length) {
      console.log(`  Waiting 15s before next batch...`);
      await new Promise((r) => setTimeout(r, 15000));
    }
  }

  console.log(`\nDone: +${inserted} images, ${failed} failures`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
