// Script to set up the medicine-images storage bucket and run the image crawler.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { crawlAllMissing } from '../src/services/crawler/imageCrawler';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const BUCKET_NAME = 'medicine-images';

async function setupBucket() {
  console.log(`Checking if bucket "${BUCKET_NAME}" exists...`);
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    console.error('Failed to list buckets:', listError.message);
    process.exit(1);
  }

  const exists = buckets.some((b) => b.name === BUCKET_NAME);
  if (exists) {
    console.log(`Bucket "${BUCKET_NAME}" already exists.`);
  } else {
    console.log(`Creating bucket "${BUCKET_NAME}"...`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/webp', 'image/png', 'image/jpeg', 'image/gif'],
      fileSizeLimit: 10485760,
    });
    if (createError) {
      console.error('Failed to create bucket:', createError.message);
      process.exit(1);
    }
    console.log(`Bucket "${BUCKET_NAME}" created successfully.`);
  }
}

async function main() {
  await setupBucket();
  console.log('\nStarting image crawler...');
  try {
    const report = await crawlAllMissing();
    console.log('\n=== Crawl Report ===');
    console.log(`Medicines searched: ${report.medicines_searched}`);
    console.log(`Images found: ${report.images_found}`);
    console.log(`Images accepted: ${report.images_accepted}`);
    console.log(`Images rejected: ${report.images_rejected}`);
    console.log(`Coverage: ${report.coverage_percentage.toFixed(1)}%`);
    if (report.failures.length > 0) {
      console.log(`Failures: ${report.failures.length}`);
      report.failures.slice(0, 5).forEach((f) => console.log(`  - ${f}`));
    }
  } catch (e: any) {
    console.error('Crawler error:', e.message);
  }
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
