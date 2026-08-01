import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
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
  const l = (license || '').toLowerCase();
  return ACCEPTED_LICENSES.some((a) => l.includes(a));
}

async function fetchWithRetry(url, retries = 4, backoff = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url.toString(), {
        headers: {
          'User-Agent':
            'ClinovaBot/1.0 (educational-research; mailto:clinova@example.com)',
          Accept: 'application/json',
        },
      });

      if (res.status === 429) {
        const retryAfter = res.headers.get('Retry-After');
        const waitMs = retryAfter ? parseInt(retryAfter) * 1000 : backoff * (i + 1);
        console.log(`  · Rate limited, waiting ${waitMs}ms...`);
        await new Promise((r) => setTimeout(r, waitMs));
        continue;
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text.substring(0, 120)}`);
      }

      return res;
    } catch (e) {
      if (i === retries - 1) throw e;
      console.log(`  · Retry ${i + 1}/${retries} — ${e.message}`);
      await new Promise((r) => setTimeout(r, backoff * (i + 1)));
    }
  }
  throw new Error('All retries exhausted');
}

async function searchWikimedia(query, limit = 5) {
  const results = [];
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

  for (const page of pages.slice(0, limit)) {
    const imgInfo = await getWikimediaImageInfo(page.title);
    if (imgInfo && isLicenseAccepted(imgInfo.license)) {
      results.push(imgInfo);
    }
    if (results.length >= 2) break;
    await new Promise((r) => setTimeout(r, 500));
  }

  return results;
}

async function getWikimediaImageInfo(fileTitle) {
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  url.searchParams.set('action', 'query');
  url.searchParams.set('format', 'json');
  url.searchParams.set('titles', fileTitle);
  url.searchParams.set('prop', 'imageinfo');
  url.searchParams.set('iiprop', 'url|metadata|extmetadata');
  url.searchParams.set('iiurlwidth', '800');
  url.searchParams.set('iiurlheight', '800');

  try {
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
  } catch {
    return null;
  }
}

async function seedImages() {
  let processedIds = new Set();
  let totalInserted = 0;
  let totalSkipped = 0;

  try {
    const fs = await import('fs');
    if (fs.existsSync('scripts/seed-progress.json')) {
      const progress = JSON.parse(fs.readFileSync('scripts/seed-progress.json', 'utf-8'));
      processedIds = new Set(progress.processedIds || []);
      totalInserted = progress.totalInserted || 0;
      totalSkipped = processedIds.size;
      console.log(`Resuming: ${processedIds.size} drugs already done, ${totalInserted} images inserted`);
    }
  } catch {
    console.log('No previous progress file, starting fresh');
  }

  const { data: drugs, error: dErr } = await supabase
    .from('drug_monographs')
    .select('id, generic_name, name')
    .order('generic_name')
    .limit(1000);

  if (dErr || !drugs) {
    console.error('Failed to fetch drugs:', dErr?.message);
    return;
  }

  console.log(`DB has ${drugs.length} drugs`);

  const remaining = drugs.filter((d) => !processedIds.has(d.id));
  console.log(`Remaining to process: ${remaining.length}`);

  let consecutiveFailures = 0;
  const CONSEC_FAIL_LIMIT = 10;

  for (let i = 0; i < remaining.length; i++) {
    const drug = remaining[i];
    const genericName = (drug.generic_name || drug.name || '').trim();
    if (!genericName) {
      processedIds.add(drug.id);
      totalSkipped++;
      continue;
    }

    const { count: existing } = await supabase
      .from('drug_images')
      .select('*', { count: 'exact', head: true })
      .eq('drug_id', drug.id);

    if (existing && existing >= 1) {
      processedIds.add(drug.id);
      totalSkipped++;
      if (i % 50 === 0) console.log(`[SKIP/${i}/${remaining.length}] ${genericName} already has ${existing} image(s)`);
      continue;
    }

    const queries = [`${genericName} tablet`, `${genericName} capsule`, `${genericName} injection`, `Generic ${genericName}`];

    let insertedForDrug = 0;
    let drugFailed = true;

    for (const query of queries) {
      if (insertedForDrug >= 2) break;

      try {
        const results = await searchWikimedia(query, 3);

        for (const result of results) {
          if (insertedForDrug >= 2) break;

          const dosageForm = query.toLowerCase().includes('tablet')
            ? 'tablet'
            : query.toLowerCase().includes('capsule')
              ? 'capsule'
              : query.toLowerCase().includes('injection')
                ? 'injection'
                : 'unknown';

          const { error: insertErr } = await supabase
            .from('drug_images')
            .insert({
              drug_id: drug.id,
              generic_name: genericName,
              dosage_form: dosageForm,
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
              hash: `wm-${drug.id}-${insertedForDrug}-${Date.now()}`,
              verified: false,
              quality_score: 0.5,
              rejection_reason: '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });

          if (insertErr) {
            if (i % 50 <= 1) console.log(`  [ERR-INSERT] ${genericName}/${dosageForm}: ${insertErr.message}`);
            continue;
          }

          insertedForDrug++;
          totalInserted++;
          drugFailed = false;
          if (i % 50 <= 1) console.log(`  [OK] ${genericName}/${dosageForm}: image #${insertedForDrug}`);
        }

        if (insertedForDrug >= 2) break;
      } catch (e) {
        if (i % 50 <= 1) console.log(`  [ERR-SEARCH] ${genericName} "${query}": ${e.message}`);
      }

      await new Promise((r) => setTimeout(r, 1500));
    }

    if (drugFailed) {
      consecutiveFailures++;
      if (i % 50 <= 1 || consecutiveFailures % 5 === 0) {
        console.log(`  [FAIL] ${genericName} — ${consecutiveFailures} consecutive no-image drugs`);
      }
    } else {
      consecutiveFailures = 0;
    }

    processedIds.add(drug.id);

    if (i % 10 === 0 || i === remaining.length - 1) {
      try {
        const fs = await import('fs');
        fs.writeFileSync(
          'scripts/seed-progress.json',
          JSON.stringify(
            { processedIds: [...processedIds], totalInserted, timestamp: new Date().toISOString() },
            null,
            2,
          ),
        );
      } catch {}
      console.log(
        `[${i + 1}/${remaining.length}] ${genericName} | total=${totalInserted} since_resume=${
          totalInserted - (processedIds.size - i - 1 >= 0 ? 0 : 0)
        }`,
      );
    }

    await new Promise((r) => setTimeout(r, 2500));
  }

  const progress = require('fs').existsSync('scripts/seed-progress.json')
    ? JSON.parse(require('fs').readFileSync('scripts/seed-progress.json', 'utf-8'))
    : {};
  const failures = remaining.filter((d) => !processedIds.has(d.id)).length + (consecutiveFailures > 0 ? 0 : 0);

  console.log('\n=== Seeding Complete ===');
  console.log(`Processed drugs:      ${processedIds.size}`);
  console.log(`Total skipped (existing images): ${totalSkipped}`);
  console.log(`Total images inserted in this run: ${totalInserted}`);
}

seedImages().catch((e) => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
