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

const MAX_IMAGES_PER_DRUG = 2;
const MAX_DRUGS = Number(process.env.SEED_MAX_DRUGS || '0'); // 0 = no limit
const BASE_DELAY_MS = Number(process.env.SEED_DELAY_MS || '8000');

function isLicenseAccepted(license) {
  const l = (license || '').toLowerCase();
  return ACCEPTED_LICENSES.some((a) => l.includes(a));
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Jittered delay to avoid synchronized bursts (Wikimedia burst limiter is the 429 trigger)
function politeDelay() {
  const jitter = Math.floor(Math.random() * 4000);
  return sleep(BASE_DELAY_MS + jitter);
}

function parseRetryAfter(header) {
  if (!header) return 0;
  const seconds = Number(header);
  if (Number.isFinite(seconds)) return Math.min(seconds, 120);
  const when = Date.parse(header);
  if (Number.isFinite(when)) return Math.min(Math.max(Math.ceil((when - Date.now()) / 1000), 0), 120);
  return 0;
}

// Self-contained fetch with retry/backoff that respects Retry-After + maxlag waits.
async function fetchWithRetry(url) {
  let lastErr = null;
  for (let attempt = 0; attempt < 6; attempt++) {
    let res;
    try {
      res = await fetch(url.toString(), {
        headers: {
          'User-Agent': 'ClinovaBot/1.0 (educational project; contact admin@clinova.example)',
          'Accept': 'application/json',
        },
      });
    } catch (e) {
      lastErr = e;
      await sleep(3000 * (attempt + 1));
      continue;
    }

    if (res.status === 429) {
      const waitMs = parseRetryAfter(res.headers.get('retry-after')) * 1000 || 15000 * (attempt + 1);
      console.log(`  [429] rate limited — waiting ${Math.round(waitMs / 1000)}s (attempt ${attempt + 1}/6)`);
      await sleep(waitMs);
      continue;
    }

    // Wikimedia maxlag: 503 "Waiting for X" — always retry, never counts as failure
    if (res.status === 503 && res.headers.get('retry-after')) {
      const waitMs = parseRetryAfter(res.headers.get('retry-after')) * 1000;
      console.log(`  [503] maxlag wait — retrying in ${Math.round(waitMs / 1000)}s`);
      await sleep(waitMs);
      continue;
    }

    if (!res.ok) {
      lastErr = new Error(`HTTP ${res.status}: ${(await res.text()).substring(0, 100)}`);
      if (res.status >= 500) {
        await sleep(3000 * (attempt + 1));
        continue;
      }
      throw lastErr;
    }

    return res;
  }
  throw lastErr || new Error('All retries exhausted');
}

// ── Provider 1: Wikimedia Commons ──────────────────────────────────
// One API call per query: generator=search embeds imageinfo directly.
async function searchWikimedia(query, limit = 2) {
  const results = [];
  try {
    const url = new URL('https://commons.wikimedia.org/w/api.php');
    url.searchParams.set('action', 'query');
    url.searchParams.set('format', 'json');
    url.searchParams.set('formatversion', '2');
    url.searchParams.set('generator', 'search');
    url.searchParams.set('gsrsearch', `${query} filetype:bitmap`);
    url.searchParams.set('gsrnamespace', '6');
    url.searchParams.set('gsrlimit', String(limit));
    url.searchParams.set('gsrprop', '');
    url.searchParams.set('prop', 'imageinfo');
    url.searchParams.set('iiprop', 'url|metadata|extmetadata');
    url.searchParams.set('iiurlwidth', '800');
    url.searchParams.set('iiurlheight', '800');
    url.searchParams.set('maxlag', '5');

    const res = await fetchWithRetry(url);
    const data = await res.json();
    const pages = (data?.query?.pages || []).filter((p) => Array.isArray(p.imageinfo) && p.imageinfo.length);

    for (const page of pages) {
      const ii = page.imageinfo[0];
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
      if (results.length >= limit) break;
    }
  } catch (e) {
    console.error(`  [Wikimedia] search failed for "${query}":`, e.message);
  }
  return results;
}

// ── Provider 2: Openverse (CC aggregator — Flickr, Europeana, Smithsonian, etc.) ──
function normalizeOpenverseLicense(code) {
  switch ((code || '').toLowerCase()) {
    case 'cc0': return 'cc0';
    case 'by': return 'cc by';
    case 'by-sa': return 'cc by-sa';
    case 'pd': case 'pdm': case 'publicdomain': case 'public domain': return 'public domain';
    default: return code || 'Unknown';
  }
}

async function searchOpenverse(query, limit = 2) {
  const results = [];
  try {
    const url = new URL('https://api.openverse.org/v1/images/');
    url.searchParams.set('q', query);
    url.searchParams.set('page_size', String(limit));
    url.searchParams.set('license', 'cc0,by,by-sa,pdm');
    url.searchParams.set('mature', 'false');

    const res = await fetchWithRetry(url);
    const data = await res.json();

    for (const r of data?.results || []) {
      const license = normalizeOpenverseLicense(r.license);
      if (!isLicenseAccepted(license)) continue;
      const imageUrl = r.url;
      if (/\.(svg|tiff?|bmp)$/i.test(imageUrl)) continue; // raster only — renderable in the app

      results.push({
        imageUrl,
        thumbnailUrl: r.thumbnail || imageUrl,
        pageUrl: r.foreign_landing_url || '',
        title: r.title || query,
        author: r.creator || 'Unknown',
        license,
        licenseUrl: r.license_url || '',
        source: `Openverse (${r.source || 'open'})`,
      });
      if (results.length >= limit) break;
    }
  } catch (e) {
    console.error(`  [Openverse] search failed for "${query}":`, e.message);
  }
  return results;
}

// ── Query generation: rescue salt/combo/formulation drug names ─────
// Generic first, then DB alias (`name` field), then curated brand names —
// so users see real-world branded boxes/pills when the generic image is missed.
const SALT_SUFFIXES = ['sodium', 'hydrochloride', 'maleate', 'sulfate', 'sulphate', 'hydrobromide', 'besylate', 'mesylate', 'tartrate', 'nitrate', 'phosphate', 'succinate', 'citrate'];

// Well-known brand/trade names — fallback queries for real-world packaging photos
const BRAND_ALIASES = {
  'oxaliplatin': 'Eloxatin',
  'oxybutynin': 'Ditropan',
  'paclitaxel': 'Taxol',
  'pegfilgrastim': 'Neulasta',
  'pemetrexed': 'Alimta',
  'permethrin': 'Nix',
  'pertuzumab': 'Perjeta',
  'phenoxymethylpenicillin': 'Penicillin V',
  'phytomenadione': 'Konakion',
  'piroxicam': 'Feldene',
  'podophyllotoxin': 'Condylox',
  'potassium permanganate': 'Condy crystals',
  'povidone-iodine': 'Betadine',
  'pralidoxime': '2-PAM',
  'praziquantel': 'Biltricide',
  'prazosin': 'Minipress',
  'prilocaine': 'Citanest',
  'propofol': 'Diprivan',
  'pyrimethamine': 'Daraprim',
  'ranitidine': 'Zantac',
  'rasagiline': 'Azilect',
  'rasburicase': 'Elitek',
  'ribavirin': 'Rebetol',
  'rifampicin': 'Rifadin',
  "ringer's lactate": "Hartmann's solution",
  'rituximab': 'MabThera',
  'rocuronium': 'Zemuron',
  'ropivacaine': 'Naropin',
  'sacubitril': 'Entresto',
  'sacubitril/valsartan': 'Entresto',
  'selegiline': 'Eldepryl',
  'sevoflurane': 'Sevorane',
  'silver sulfadiazine': 'Silvadene',
  'simvastatin': 'Zocor',
  'sofosbuvir': 'Sovaldi',
  'sugammadex': 'Bridion',
  'sulfasalazine': 'Salazopyrin',
  'suxamethonium': 'Scoline',
  'tacrolimus': 'Prograf',
  'tazarotene': 'Tazorac',
  'teicoplanin': 'Targocid',
  'tenofovir': 'Viread',
  'tenofovir disoproxil fumarate (tdf)': 'Viread',
  'teriparatide': 'Forsteo',
  'tobramycin': 'Tobrex',
  'tocilizumab': 'Actemra',
  'tolterodine': 'Detrusitol',
  'trastuzumab': 'Herceptin',
  'tretinoin': 'Retin-A',
  'triamcinolone': 'Kenalog',
  'trimethoprim-sulfamethoxazole (tmp-smx)': 'Bactrim',
  'trimethoprim–sulfamethoxazole (tmp–smx)': 'Bactrim',
  'valproic acid / sodium valproate / divalproex sodium': 'Depakote',
  'vancomycin': 'Vancocin',
  'vecuronium': 'Norcuron',
  'vinblastine': 'Velbe',
  'vincristine': 'Oncovin',
  'vitamin k': 'Konakion',
  'zidovudine': 'Retrovir',
  'zoledronic acid': 'Zometa',
};

function stripSalts(name) {
  let stripped = name;
  for (const s of SALT_SUFFIXES) {
    if (stripped.toLowerCase().endsWith(` ${s}`)) {
      stripped = stripped.slice(0, -s.length - 1).trim();
      break;
    }
  }
  return stripped.replace(/\s*\(?dried\)?\s*$/i, '').trim();
}

function stripParens(name) {
  return name.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
}

function pushUnique(list, name) {
  const n = (name || '').trim();
  if (n && n.length > 1 && !list.some((x) => x.toLowerCase() === n.toLowerCase())) list.push(n);
}

function buildQueryCandidates(genericName, aliasName) {
  const out = [];

  // 1. Generic name variants
  pushUnique(out, genericName);
  const noParen = stripParens(genericName);
  pushUnique(out, noParen);
  const stripped = stripSalts(noParen || genericName);
  pushUnique(out, stripped);

  // 2. Combo components (split on " + " and " / ")
  for (const sep of [' + ', ' / ']) {
    if ((noParen || genericName).includes(sep)) {
      for (const part of (noParen || genericName).split(sep)) pushUnique(out, part.trim());
    }
  }

  // 3. DB alias field (e.g. Tenofovir Disoproxil Fumarate → Tenofovir)
  if (aliasName && aliasName.toLowerCase() !== genericName.toLowerCase()) {
    pushUnique(out, aliasName);
    pushUnique(out, stripSalts(stripParens(aliasName)));
  }

  // 4. Curated brand name — real-world box/packaging photos
  const brand = BRAND_ALIASES[genericName.trim().toLowerCase()];
  if (brand) {
    pushUnique(out, brand);
    pushUnique(out, stripSalts(brand));
  }

  if (/insulin/i.test(genericName)) pushUnique(out, 'Insulin');

  return out.slice(0, 5);
}

function dosageFormFromQuery(query) {
  const q = query.toLowerCase();
  if (q.includes('tablet')) return 'tablet';
  if (q.includes('capsule')) return 'capsule';
  if (q.includes('injection') || q.includes('vial')) return 'injection';
  if (q.includes('syrup') || q.includes('suspension')) return 'syrup';
  if (q.includes('cream') || q.includes('ointment')) return 'cream';
  if (q.includes('inhaler')) return 'inhaler';
  if (q.includes('eye drops')) return 'eye drops';
  if (q.includes('suppository')) return 'suppository';
  return '';
}

async function seedRemaining() {
  const { data: allDrugs, error: drugsErr } = await supabase
    .from('drug_monographs')
    .select('id, generic_name, name')
    .order('generic_name');
  if (drugsErr) throw new Error(`Failed to load drugs: ${drugsErr.message}`);

  const { data: drugsWithImages } = await supabase
    .from('drug_images')
    .select('drug_id')
    .limit(10000);

  const drugsWithImgSet = new Set((drugsWithImages || []).map((r) => r.drug_id));
  let missingDrugs = (allDrugs || []).filter((d) => !drugsWithImgSet.has(d.id));

  console.log(`Total drugs: ${allDrugs?.length || 0}`);
  console.log(`Drugs with images: ${drugsWithImgSet.size}`);
  console.log(`Drugs missing images: ${missingDrugs.length}`);

  if (MAX_DRUGS > 0) {
    missingDrugs = missingDrugs.slice(0, MAX_DRUGS);
    console.log(`This run capped at ${MAX_DRUGS} drugs (SEED_MAX_DRUGS)`);
  }

  let totalInserted = 0;
  const failures = [];

  for (let i = 0; i < missingDrugs.length; i++) {
    const drug = missingDrugs[i];
    const genericName = drug.generic_name || drug.name;
    if (!genericName) continue;

    let insertedForDrug = 0;
    const candidates = buildQueryCandidates(genericName, drug.name);

    for (const query of candidates) {
      if (insertedForDrug >= MAX_IMAGES_PER_DRUG) break;

      await politeDelay(); // Wikimedia politeness
      let results = await searchWikimedia(query, MAX_IMAGES_PER_DRUG);

      if (results.length === 0) {
        await sleep(1500);
        results = await searchOpenverse(query, MAX_IMAGES_PER_DRUG);
        await sleep(1500);
      }
      if (results.length === 0) continue;

      for (const result of results) {
        if (insertedForDrug >= MAX_IMAGES_PER_DRUG) break;
        try {
          const prefix = result.source.toLowerCase().startsWith('openverse') ? 'openverse' : 'wikimedia';
          const { error: insertErr } = await supabase.from('drug_images').insert({
            drug_id: drug.id,
            generic_name: genericName,
            dosage_form: dosageFormFromQuery(query),
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
            hash: `${prefix}-${drug.id}-${insertedForDrug}`,
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

      if (insertedForDrug >= MAX_IMAGES_PER_DRUG) break;
    }

    if (insertedForDrug === 0) failures.push(genericName);
    const src = candidates.length > 1 ? ` (queries: ${candidates.join(' | ')})` : '';
    console.log(
      `[${i + 1}/${missingDrugs.length}] ${genericName} → ${insertedForDrug > 0 ? `+${insertedForDrug} image(s)` : 'no images found'}${src}`
    );
  }

  console.log('\n=== Seeding Complete ===');
  console.log(`Total inserted: ${totalInserted}`);
  console.log(`Failures (no image found): ${failures.length}`);
  if (failures.length > 0) console.log('Failed drugs:', failures.slice(0, 40));
}

seedRemaining().catch((e) => {
  console.error('Fatal error:', e.message);
  process.exit(1);
});
