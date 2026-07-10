/**
 * Clinova Full Population Pipeline
 *
 * Orchestrates the complete seed + sync + generation workflow:
 *   1. Seed clinical cases into Supabase
 *   2. Sync Knowledge Engine (graph, curricula, monographs)
 *   3. Generate AI study resources
 *   4. Validate and report
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/populate-all.ts
 */

import { execSync } from 'child_process';

const SCRIPTS_DIR = './scripts';

const steps = [
  { name: 'Seed Clinical Cases',      file: 'seed-clinical-cases.ts' },
  { name: 'Sync Knowledge Engine',     file: 'sync-knowledge-engine.ts' },
  { name: 'Generate AI Resources',     file: 'generate-ai-resources.ts' },
];

async function runStep(name: string, file: string): Promise<boolean> {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`▶️  STEP: ${name}`);
  console.log(`${'='.repeat(60)}\n`);

  try {
    execSync(`npx tsx "${SCRIPTS_DIR}/${file}"`, {
      stdio: 'inherit',
      env: { ...process.env },
    });
    console.log(`\n✅ Step "${name}" completed successfully.`);
    return true;
  } catch (err) {
    console.error(`\n❌ Step "${name}" FAILED.`, (err as Error).message);
    return false;
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('🏥 CLINOVA — FULL POPULATION PIPELINE');
  console.log('='.repeat(60));

  for (const step of steps) {
    const ok = await runStep(step.name, step.file);
    if (!ok) {
      console.error(`\n🛑 Pipeline aborted at step "${step.name}".`);
      process.exit(1);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('🎉 FULL POPULATION COMPLETE');
  console.log('='.repeat(60));
  console.log('\nNext steps:');
  console.log('   1. Run validation: npx tsx scripts/validate-population.ts');
  console.log('   2. Apply Supabase migrations against your remote project');
  console.log('   3. Update RLS policies for production');
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
