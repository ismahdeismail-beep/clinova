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

async function fetchJson(url, retries = 4) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url.toString(), {
        headers: { 'User-Agent': 'ClinovaBot/1.0 (educational)', 'Accept': 'application/json' },
      });
      if (res.status === 429) {
        const w = 15000 * (i + 1);
        console.log(`  [RATE] waiting ${w}ms`);
        await new Promise((r) => setTimeout(r, w));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, 8000 * (i + 1)));
    }
  }
  throw new Error('retries exhausted');
}

async function searchOneDrug(name) {
  try {
    // Search for bitmap images of this drug
    const sUrl = new URL('https://commons.wikimedia.org/w/api.php');
    sUrl.searchParams.set('action', 'query');
    sUrl.searchParams.set('format', 'json');
    sUrl.searchParams.set('list', 'search');
    sUrl.searchParams.set('srsearch', `${name} tablet filetype:bitmap`);
    sUrl.searchParams.set('srnamespace', '6');
    sUrl.searchParams.set('srlimit', '3');
    sUrl.searchParams.set('srprop', '');

    const sData = await fetchJson(sUrl);
    const pages = sData?.query?.search || [];

    for (const page of pages) {
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

        return {
          imageUrl: ii.url,
          thumbnailUrl: ii.thumburl || ii.url,
          pageUrl: ii.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
          title: page.title.replace(/^File:/, ''),
          author: (ii.extmetadata?.Artist?.value || 'Unknown').toString(),
          license,
          licenseUrl: (ii.extmetadata?.LicenseUrl?.value || '').toString(),
          source: 'Wikimedia Commons',
        };
      } catch { /* try next */ }
    }
  } catch { /* drug failed */ }
  return null;
}

async function main() {
  const { data: allDrugs } = await supabase.from('drug_monographs').select('id, generic_name, name').order('generic_name');
  const { data: drugsWithImages } = await supabase.from('drug_images').select('drug_id').limit(10000);

  const hasImg = new Set((drugsWithImages || []).map((r) => r.drug_id));
  const missing = (allDrugs || []).filter((d) => !hasImg.has(d.id));

  console.log(`Total: ${allDrugs?.length}, With images: ${hasImg.size}, Missing: ${missing.length}`);

  let inserted = 0, failed = 0;

  for (let idx = 0; idx < missing.length; idx++) {
    const drug = missing[idx];
    const name = drug.generic_name || drug.name;
    if (!name) continue;

    console.log(`[${idx + 1}/${missing.length}] ${name}...`);

    const img = await searchOneDrug(name);

    if (img) {
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
          hash: `wikimedia-${drug.id}-0`,
          verified: false,
          quality_score: 0.5,
          rejection_reason: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        if (error) { console.error(`  Insert error: ${error.message}`); failed++; }
        else { inserted++; console.log(`  [OK]`); }
      } catch { failed++; }
    } else {
      failed++;
      console.log(`  [FAIL]`);
    }

    // 10 second delay between drugs
    await new Promise((r) => setTimeout(r, 10000));
  }

  console.log(`\nDone: +${inserted} images, ${failed} failures`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
