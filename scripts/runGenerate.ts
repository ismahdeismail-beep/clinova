// ================================================================
// Clinova Clinical Case Generator — Entry Point
// Generates cases from ALL templates across 17 pharmacology subjects
// Run with: npx tsx scripts/runGenerate.ts
// ================================================================

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { ALL_TEMPLATES } from './caseTemplates';
import { generateCasesFromTemplate, writeBatchFile } from './generateCases';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data', 'clinicalCases');

// How many variants to generate per template
const VARIANTS_PER_TEMPLATE = 13;

async function main() {
  console.log('=== Clinova Clinical Case Generator ===');
  console.log(`Templates loaded: ${Object.keys(ALL_TEMPLATES).length} subjects`);

  const totalTemplates = Object.values(ALL_TEMPLATES).reduce((sum, t) => sum + t.length, 0);
  console.log(`Total templates: ${totalTemplates}`);
  console.log(`Target cases: ~${totalTemplates * VARIANTS_PER_TEMPLATE}`);
  console.log('');

  // Generate ALL subjects from scratch
  let globalCaseId = 1;
  const barrelExports: string[] = [];

  for (const [subject, templates] of Object.entries(ALL_TEMPLATES)) {
    if (templates.length === 0) {
      console.log(`Skipping ${subject} — no templates`);
      continue;
    }

    const subjectCases: string[] = [];
    const subjectCaseCount = templates.length * VARIANTS_PER_TEMPLATE;

    console.log(`Generating ${subject}... (${templates.length} templates × ${VARIANTS_PER_TEMPLATE} = ${subjectCaseCount} cases)`);

    for (const template of templates) {
      const newCases = generateCasesFromTemplate(template, VARIANTS_PER_TEMPLATE, globalCaseId);
      subjectCases.push(...newCases);
      globalCaseId += VARIANTS_PER_TEMPLATE;
    }

    // Create a safe filename from subject name
    const safeName = subject
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');

    const exportName = `${safeName}_cases`;
    const filename = path.join(OUTPUT_DIR, `${safeName}.ts`);

    writeBatchFile(filename, subjectCases, exportName);
    barrelExports.push(exportName);
    console.log(`  → ${filename} (${subjectCases.length} cases)`);
  }

  // Write barrel export file — all generated case modules merged
  const barrelContent = `// ================================================================
// Clinical Cases — Barrel Export (Auto-generated)
// Merges all subject-based case modules into a single array.
// Version: 3.0.0 — Full regeneration from all templates
// Generated on: ${new Date().toISOString()}
// ================================================================

import type { ClinicalCase } from '../clinicalCasesData';

${barrelExports.map(e => `import { ${e} } from './${e.replace('_cases', '')}';`).join('\n')}

// Merge all generated case batches into one array
export const GENERATED_CASES: ClinicalCase[] = [
  ...${barrelExports.join(',\n  ...')},
];

// Version tracking for cache invalidation
export const GENERATED_CASES_VERSION = '3.0.0';
export const GENERATED_CASES_COUNT = GENERATED_CASES.length;
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), barrelContent, 'utf-8');
  console.log(`\nBarrel export written to src/data/clinicalCases/index.ts`);
  console.log(`\n=== Done! Generated ${barrelExports.length} subject modules ===`);
  console.log(`Total cases generated: ${globalCaseId - 1}`);
  console.log(`Case IDs used: case-1 to case-${globalCaseId - 1}`);
}

main().catch(console.error);
