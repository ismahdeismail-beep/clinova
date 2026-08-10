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
        const wait = 10000 * (i + 1);
        console.log(`  Rate limited, waiting ${wait}ms...`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, 5000 * (i + 1)));
    }
  }
  throw new Error('All retries exhausted');
}

async function searchWikimedia(query) {
  try {
    const url = new URL('https://commons.wikimedia.org/w/api.php');
    url.searchParams.set('action', 'query');
    url.searchParams.set('format', 'json');
    url.searchParams.set('list', 'search');
    url.searchParams.set('srsearch', `${query} filetype:bitmap`);
    url.searchParams.set('srnamespace', '6');
    url.searchParams.set('srlimit', '2');
    url.searchParams.set('srprop', '');

    const data = await fetchJson(url);
    const pages = data?.query?.search || [];
    const results = [];

    for (const page of pages) {
      try {
        const infoUrl = new URL('https://commons.wikimedia.org/w/api.php');
        infoUrl.searchParams.set('action', 'query');
        infoUrl.searchParams.set('format', 'json');
        infoUrl.searchParams.set('titles', page.title);
        infoUrl.searchParams.set('prop', 'imageinfo');
        infoUrl.searchParams.set('iiprop', 'url|extmetadata');
        infoUrl.searchParams.set('iiurlwidth', '800');

        const infoData = await fetchJson(infoUrl);
        const infoPage = Object.values(infoData?.query?.pages || {})[0];
        const ii = infoPage?.imageinfo?.[0];
        if (!ii) continue;

        const license = (ii.extmetadata?.LicenseShortName?.value || 'Unknown').toString();
        if (!isLicenseAccepted(license)) continue;

        results.push({
          imageUrl: ii.url,
          thumbnailUrl: ii.thumburl || ii.url,
          pageUrl: ii.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
          title: page.title.replace(/^File:/, ''),
          author: (ii.extmetadata?.Artist?.value || 'Unknown').toString(),
          license,
          licenseUrl: (ii.extmetadata?.LicenseUrl?.value || '').toString(),
          source: 'Wikimedia Commons',
        });
      } catch { /* skip this image */ }
      if (results.length >= 2) break;
    }
    return results;
  } catch {
    return [];
  }
}

async function main() {
  const { data: allDrugs } = await supabase.from('drug_monographs').select('id, generic_name, name').order('generic_name');
  const { data: drugsWithImages } = await supabase.from('drug_images').select('drug_id').limit(10000);

  const hasImg = new Set((drugsWithImages || []).map((r) => r.drug_id));
  const missing = (allDrugs || []).filter((d) => !hasImg.has(d.id));

  console.log(`Total: ${allDrugs?.length}, With images: ${hasImg.size}, Missing: ${missing.length}`);

  let inserted = 0, failed = 0;

  for (const drug of missing) {
    const name = drug.generic_name || drug.name;
    if (!name) continue;

    console.log(`[${inserted + failed}/${missing.length}] ${name}...`);

    const results = await searchWikimedia(`${name} tablet`);
    let count = 0;

    for (const img of results) {
      try {
        const { error } = await supabase.from('drug_images').insert({
          drug_id: drug.id,
          generic_name: name,
          dosage_form: 'tablet',
          strength: '',
          image_url: img.imageUrl,
          thumbnail_url: img.thumbnailUrl,
          large_url: img.imageUrl,
          medium_url: img.imageUrl,
          source: img.source,
          license: img.license,
          license_url: img.licenseUrl,
          author: img.author,
          page_url: img.pageUrl,
          hash: `wikimedia-${drug.id}-${count}`,
          verified: false,
          quality_score: 0.5,
          rejection_reason: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        if (error) { console.error(`  Insert error: ${error.message}`); continue; }
        count++;
        inserted++;
      } catch { /* skip */ }
    }

    if (count === 0) { failed++; console.log(`  [FAIL]`); }
    else { console.log(`  [OK] ${count} image(s)`); }

    await new Promise((r) => setTimeout(r, 5000));
  }

  console.log(`\nDone: +${inserted} images, ${failed} failures`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
