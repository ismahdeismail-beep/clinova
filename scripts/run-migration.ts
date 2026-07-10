import { readFileSync } from 'fs';
const SQL_FILE = 'supabase/migrations/000001_complete_schema.sql';

const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'bveztrtykjburdhewcdy';
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://bveztrtykjburdhewcdy.supabase.co';

if (!ACCESS_TOKEN) {
  console.error('❌ Missing SUPABASE_ACCESS_TOKEN');
  process.exit(1);
}

async function main() {
  const sql = readFileSync(SQL_FILE, 'utf-8');
  console.log(`📄 Sending migration SQL (${(sql.length / 1024).toFixed(0)} KB) as single query...`);

  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: sql }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.log(`❌ FAILED (${res.status})`);
    console.error(err);
    process.exit(1);
  }

  console.log('🎉 Migration executed successfully!');
}

main();
