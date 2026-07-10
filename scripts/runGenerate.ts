// ================================================================
// Clinova Clinical Case Generator — Entry Point
// Generates cases from all templates and writes to src/data/clinicalCases/
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

// How many variants to generate per template (~850 target / 65 templates ≈ 13 each)
// But that might be too many files. Let's aim for about 10-15 per template.
const VARIANTS_PER_TEMPLATE = 13;

async function main() {
  console.log('=== Clinova Clinical Case Generator ===');
  console.log(`Templates loaded: ${Object.keys(ALL_TEMPLATES).length} subjects`);
  
  const totalTemplates = Object.values(ALL_TEMPLATES).reduce((sum, t) => sum + t.length, 0);
  console.log(`Total templates: ${totalTemplates}`);
  console.log(`Target cases: ~${totalTemplates * VARIANTS_PER_TEMPLATE}`);
  console.log('');

  // Subjects that already have generated cases (keep existing)
  const existingSubjects = [
    'General Pharmacology',
    'Autonomic Pharmacology',
  ];

  // Generate for each subject — skip existing ones
  let globalCaseId = 91; // Start after existing cases (case-1 to case-90)
  const barrelExports: string[] = [];

  // First, include existing barrel imports
  barrelExports.push('GENERAL_PHARMACOLOGY_CASES', 'AUTONOMIC_PHARMACOLOGY_CASES_A', 'AUTONOMIC_PHARMACOLOGY_CASES_B');

  for (const [subject, templates] of Object.entries(ALL_TEMPLATES)) {
    if (templates.length === 0) {
      console.log(`Skipping ${subject} — no templates`);
      continue;
    }

    if (existingSubjects.includes(subject)) {
      console.log(`Skipping ${subject} — existing cases preserved (case-11 to case-90)`);
      continue;
    }

    const subjectCases: string[] = [];
    const subjectCaseCount = templates.length * VARIANTS_PER_TEMPLATE;

    console.log(`Generating ${subject}... (${templates.length} templates × ${VARIANTS_PER_TEMPLATE} = ~${subjectCaseCount} cases)`);

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

  // Write barrel export file — preserves existing + adds new
  const barrelContent = `// ================================================================
// Clinical Cases — Barrel Export (Auto-generated)
// Merges all subject-based case modules into a single array.
// Generated on: ${new Date().toISOString()}
// ================================================================

import type { ClinicalCase } from '../clinicalCasesData';

// Existing case modules (preserved)
import { GENERAL_PHARMACOLOGY_CASES } from './generalPharmacology';
import { AUTONOMIC_PHARMACOLOGY_CASES_A } from './autonomicPharmacology_a';
import { AUTONOMIC_PHARMACOLOGY_CASES_B } from './autonomicPharmacology_b';

// Newly generated case modules
${barrelExports.slice(3).map(e => `import { ${e} } from './${e.replace('_cases', '')}';`).join('\n')}

// Merge all generated case batches
export const GENERATED_CASES: ClinicalCase[] = [
  ...GENERAL_PHARMACOLOGY_CASES,
  ...AUTONOMIC_PHARMACOLOGY_CASES_A,
  ...AUTONOMIC_PHARMACOLOGY_CASES_B,
  ...${barrelExports.slice(3).join(',\n  ...')},
];

// Version tracking for cache invalidation
export const GENERATED_CASES_VERSION = '2.0.0';
export const GENERATED_CASES_COUNT = GENERATED_CASES.length;
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), barrelContent, 'utf-8');
  console.log(`\nBarrel export written to src/data/clinicalCases/index.ts`);
  console.log(`\n=== Done! Generated ${globalCaseId - 91} new cases ===`);
  console.log(`Total case IDs used: case-1 to case-${globalCaseId - 1}`);
}

main().catch(console.error);
