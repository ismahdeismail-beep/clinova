import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const ACCEPTED_LICENSES = [
  'public domain',
  'cc0',
  'cc by',
  'cc by-sa',
  'creative commons attribution',
  'creative commons attribution-sharealike',
];

function isLicenseAccepted(license) {
  const l = license.toLowerCase();
  return ACCEPTED_LICENSES.some((a) => l.includes(a));
}

async function fetchWithRetry(url, retries = 4, backoff = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url.toString(), {
        headers: {
          'User-Agent': 'ClinovaBot/1.0 (educational project)',
          'Accept': 'application/json',
        },
      });
      if (res.status === 429) {
        const waitMs = backoff * (i + 1);
        console.log(`  Rate limited, waiting ${waitMs}ms...`);
        await new Promise((r) => setTimeout(r, waitMs));
        continue;
      }
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text.substring(0, 100)}`);
      }
      return res;
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, backoff * (i + 1)));
    }
  }
  throw new Error('All retries exhausted');
}

async function searchWikimedia(query, limit = 2) {
  const results = [];
  try {
    const searchUrl = new URL('https://commons.wikimedia.org/w/api.php');
    searchUrl.searchParams.set('action', 'query');
    searchUrl.searchParams.set('format', 'json');
    searchUrl.searchParams.set('list', 'search');
    searchUrl.searchParams.set('srsearch', `${query} filetype:bitmap`);
    searchUrl.searchParams.set('srnamespace', '6');
    searchUrl.searchParams.set('srlimit', String(limit));
    searchUrl.searchParams.set('srprop', '');

    const searchRes = await fetchWithRetry(searchUrl);
    const searchData = await searchRes.json();
    const pages = searchData?.query?.search || [];

    for (const page of pages) {
      const title = page.title;
      const imgInfo = await getWikimediaImageInfo(title);
      if (imgInfo && isLicenseAccepted(imgInfo.license)) {
        results.push(imgInfo);
      }
      if (results.length >= limit) break;
    }
  } catch (e) {
    console.error(`  [Wikimedia] search failed for "${query}":`, e.message);
  }
  return results;
}

async function getWikimediaImageInfo(fileTitle) {
  try {
    const url = new URL('https://commons.wikimedia.org/w/api.php');
    url.searchParams.set('action', 'query');
    url.searchParams.set('format', 'json');
    url.searchParams.set('titles', fileTitle);
    url.searchParams.set('prop', 'imageinfo');
    url.searchParams.set('iiprop', 'url|metadata|extmetadata');
    url.searchParams.set('iiurlwidth', '800');
    url.searchParams.set('iiurlheight', '800');

    const res = await fetchWithRetry(url);
    const data = await res.json();
    const pages = data?.query?.pages || {};
    const page = Object.values(pages)[0];
    if (!page?.imageinfo?.[0]) return null;

    const ii = page.imageinfo[0];
    const license = (ii.extmetadata?.LicenseShortName?.value || 'Unknown').toString();
    const author = (ii.extmetadata?.Artist?.value || 'Unknown').toString();
    const licenseUrl = (ii.extmetadata?.LicenseUrl?.value || '').toString();

    return {
      imageUrl: ii.url,
      thumbnailUrl: ii.thumburl || ii.url,
      pageUrl: ii.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle)}`,
      title: fileTitle.replace(/^File:/, ''),
      author,
      license,
      licenseUrl,
      source: 'Wikimedia Commons',
    };
  } catch (e) {
    return null;
  }
}

async function seedRemaining() {
  const { data: allDrugs } = await supabase
    .from('drug_monographs')
    .select('id, generic_name, name')
    .order('generic_name');

  const { data: drugsWithImages } = await supabase
    .from('drug_images')
    .select('drug_id')
    .limit(10000);

  const drugsWithImgSet = new Set((drugsWithImages || []).map((r) => r.drug_id));
  const missingDrugs = (allDrugs || []).filter((d) => !drugsWithImgSet.has(d.id));

  console.log(`Total drugs: ${allDrugs?.length || 0}`);
  console.log(`Drugs with images: ${drugsWithImgSet.size}`);
  console.log(`Drugs missing images: ${missingDrugs.length}`);

  let totalInserted = 0;
  const failures = [];

  for (const drug of missingDrugs) {
    const genericName = drug.generic_name || drug.name;
    if (!genericName) continue;

    console.log(`[CRAWL] ${genericName}...`);

    // Single query per drug to minimize API calls
    const queries = [`${genericName} tablet`];

    let insertedForDrug = 0;

    for (const query of queries) {
      if (insertedForDrug >= 2) break;

      const results = await searchWikimedia(query, 2);

      for (const result of results) {
        if (insertedForDrug >= 2) break;

        try {
          const { error: insertErr } = await supabase.from('drug_images').insert({
            drug_id: drug.id,
            generic_name: genericName,
            dosage_form: 'tablet',
            strength: '',
            image_url: result.imageUrl,
            thumbnail_url: result.thumbnailUrl,
            large_url: result.imageUrl,
            medium_url: result.imageUrl,
            source: result.source,
            license: result.license,
            license_url: result.licenseUrl,
            author: result.author,
            page_url: result.pageUrl,
            hash: `wikimedia-${drug.id}-${insertedForDrug}`,
            verified: false,
            quality_score: 0.5,
            rejection_reason: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

          if (insertErr) {
            console.error(`  Insert failed: ${insertErr.message}`);
            continue;
          }

          insertedForDrug++;
          totalInserted++;
        } catch (e) {
          console.error(`  Error inserting: ${e.message}`);
        }
      }
    }

    if (insertedForDrug === 0) {
      failures.push(genericName);
      console.log(`  [FAIL] No images found for ${genericName}`);
    } else {
      console.log(`  [OK] Inserted ${insertedForDrug} image(s) for ${genericName}`);
    }

    // Longer delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 6000));
  }

  console.log('\n=== Seeding Complete ===');
  console.log(`Total inserted: ${totalInserted}`);
  console.log(`Failures: ${failures.length}`);
  if (failures.length > 0) {
    console.log('Failed drugs:', failures.slice(0, 30));
  }
}

seedRemaining().catch((e) => {
  console.error('Fatal error:', e.message);
  process.exit(1);
});
