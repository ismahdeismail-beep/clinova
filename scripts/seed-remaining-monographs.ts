import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const url = process.env.SUPABASE_URL!;
const svc = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(url, svc, { auth: { persistSession: false } });

async function loadMonographs(file: string): Promise<any[]> {
  let src = fs.readFileSync(file, 'utf8');
  const start = src.indexOf('const MONOGRAPHS');
  const end = src.indexOf('];', start);
  let arr = src.slice(start, end + 2);
  arr = arr.replace('const MONOGRAPHS: DrugMonograph[] =', 'const MONOGRAPHS =');
  arr += '\nexport default MONOGRAPHS;';
  const tmp = file.replace(/\.ts$/, '.tmp.mts');
  fs.writeFileSync(tmp, arr);
  const mod = await import(tmp);
  fs.unlinkSync(tmp);
  return mod.default as any[];
}

async function upsert(m: any): Promise<boolean> {
  const { data: existing } = await supabase
    .from('drug_monographs')
    .select('id')
    .eq('name', m.name)
    .maybeSingle();
  const payload = { ...m };
  delete (payload as any).id;
  let res;
  if (existing) {
    res = await supabase.from('drug_monographs').update(payload).eq('name', m.name);
  } else {
    res = await supabase.from('drug_monographs').insert(payload);
  }
  if (res.error) {
    console.error(`Failed ${m.name}: ${res.error.message}`);
    return false;
  }
  return true;
}

async function main() {
  let success = 0;
  let failed = 0;
  for (const b of [17, 18, 19, 20, 21, 22, 23, 24]) {
    const file = `scripts/seed-drug-monographs-batch${b}.ts`;
    const ms = await loadMonographs(file);
    for (const m of ms) {
      const ok = await upsert(m);
      if (ok) success++;
      else failed++;
    }
    console.log(`batch ${b}: ${ms.length} monographs processed`);
  }
  console.log(`\nDONE: ${success} ok, ${failed} failed`);
}

main().catch(console.error);
