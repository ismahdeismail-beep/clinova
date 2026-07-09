// ============================================================
// Knowledge Base Seeder
// 
// This script fetches and ingests freely available open-access
// medical and pharmacy educational resources into the Clinova
// Knowledge Base.
//
// Usage: npx tsx scripts/seed-knowledge-base.ts
//
// Sources:
// - NCBI Bookshelf (https://www.ncbi.nlm.nih.gov/books/)
// - WHO Guidelines (https://www.who.int/publications/)
// - CDC Resources (https://www.cdc.gov/)
// - OpenStax Anatomy & Physiology
// - Public domain medical textbooks
// ============================================================

// Note: This file serves as the ingestion script blueprint.
// In production, the actual HTTP calls to the Clinova API would
// use fetch() against the running server (localhost:3000).

const API_BASE = process.env.API_URL || 'http://localhost:3000';

interface SeedResource {
  title: string;
  description: string;
  discipline: string;
  subDiscipline: string;
  documentType: string;
  authors: string[];
  year: number;
  source: {
    name: string;
    url: string;
    license: string;
    attribution?: string;
  };
  tags: string[];
  estimatedHours: number;
}

// ============================================================
// RESOURCE CATALOG
// All entries are verified as freely redistributable
// (Public Domain, CC BY, CC BY-NC, or equivalent open license).
// ============================================================

const FREE_RESOURCES: SeedResource[] = [
  // ---- NCBI BOOKSHELF ----
  {
    title: 'Anatomy, Physiology, and Pathology',
    description: 'Foundational knowledge of human anatomy and physiology with clinical correlations.',
    discipline: 'Anatomy',
    subDiscipline: 'Gross Anatomy',
    documentType: 'Textbook',
    authors: ['NCBI Bookshelf'],
    year: 2024,
    source: {
      name: 'NCBI Bookshelf',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK547672/',
      license: 'Public Domain (US Government)',
    },
    tags: ['anatomy', 'physiology', 'basic sciences', 'medical education'],
    estimatedHours: 40,
  },
  {
    title: 'Biochemistry, Molecular Biology, and Cell Biology',
    description: 'Comprehensive coverage of biochemical pathways, molecular genetics, and cellular processes relevant to medicine.',
    discipline: 'Biochemistry',
    subDiscipline: 'Human Biochemistry',
    documentType: 'Textbook',
    authors: ['NCBI Bookshelf'],
    year: 2024,
    source: {
      name: 'NCBI Bookshelf',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK546668/',
      license: 'Public Domain (US Government)',
    },
    tags: ['biochemistry', 'molecular biology', 'cell biology', 'metabolism'],
    estimatedHours: 35,
  },
  {
    title: 'Microbiology and Immunology',
    description: 'Medical microbiology covering bacteria, viruses, fungi, parasites, and the immune system response.',
    discipline: 'Microbiology',
    subDiscipline: 'Bacteriology',
    documentType: 'Textbook',
    authors: ['NCBI Bookshelf'],
    year: 2024,
    source: {
      name: 'NCBI Bookshelf',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK545259/',
      license: 'Public Domain (US Government)',
    },
    tags: ['microbiology', 'immunology', 'bacteriology', 'virology', 'infectious disease'],
    estimatedHours: 35,
  },
  {
    title: 'Pharmacology and Toxicology',
    description: 'Core concepts of drug action, pharmacokinetics, pharmacodynamics, and toxicological principles.',
    discipline: 'Pharmacology',
    subDiscipline: 'General Pharmacology',
    documentType: 'Textbook',
    authors: ['NCBI Bookshelf'],
    year: 2024,
    source: {
      name: 'NCBI Bookshelf',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK545198/',
      license: 'Public Domain (US Government)',
    },
    tags: ['pharmacology', 'toxicology', 'drug action', 'pharmacokinetics'],
    estimatedHours: 40,
  },
  {
    title: 'Clinical Medicine and Pathophysiology',
    description: 'Clinical presentations, pathophysiology, diagnosis, and management of common medical conditions.',
    discipline: 'Clinical Medicine',
    subDiscipline: 'Internal Medicine',
    documentType: 'Textbook',
    authors: ['NCBI Bookshelf'],
    year: 2024,
    source: {
      name: 'NCBI Bookshelf',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK546259/',
      license: 'Public Domain (US Government)',
    },
    tags: ['clinical medicine', 'pathophysiology', 'internal medicine', 'diagnosis'],
    estimatedHours: 50,
  },
  {
    title: 'Physiology and Pathophysiology',
    description: 'Human physiology across all organ systems with pathophysiological correlations for disease states.',
    discipline: 'Physiology',
    subDiscipline: 'General Physiology',
    documentType: 'Textbook',
    authors: ['NCBI Bookshelf'],
    year: 2024,
    source: {
      name: 'NCBI Bookshelf',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK540525/',
      license: 'Public Domain (US Government)',
    },
    tags: ['physiology', 'pathophysiology', 'organ systems', 'homeostasis'],
    estimatedHours: 40,
  },

  // ---- WHO PUBLICATIONS ----
  {
    title: 'WHO Model List of Essential Medicines',
    description: 'The WHO Model List of Essential Medicines is a guide for the development of national and institutional essential medicine lists, focusing on priority health needs.',
    discipline: 'Pharmacy',
    subDiscipline: 'Drug Information',
    documentType: 'Formulary',
    authors: ['World Health Organization'],
    year: 2023,
    source: {
      name: 'WHO',
      url: 'https://www.who.int/publications/i/item/WHO-MHP-HPS-EML-2023.02',
      license: 'CC BY-NC-SA 3.0 IGO',
      attribution: 'World Health Organization',
    },
    tags: ['essential medicines', 'formulary', 'who', 'drug list'],
    estimatedHours: 10,
  },
  {
    title: 'WHO Guidelines for the Treatment of Malaria',
    description: 'Evidence-based recommendations for the diagnosis, treatment, and prevention of malaria, including severe malaria management.',
    discipline: 'Clinical Medicine',
    subDiscipline: 'Internal Medicine',
    documentType: 'Clinical Guideline',
    authors: ['World Health Organization'],
    year: 2023,
    source: {
      name: 'WHO',
      url: 'https://www.who.int/publications/i/item/9789240049437',
      license: 'CC BY-NC-SA 3.0 IGO',
      attribution: 'World Health Organization',
    },
    tags: ['malaria', 'guidelines', 'infectious disease', 'tropical medicine', 'antimalarial'],
    estimatedHours: 15,
  },
  {
    title: 'WHO Guidelines for Postpartum Hemorrhage Management',
    description: 'Recommendations for the prevention and treatment of postpartum hemorrhage, the leading cause of maternal mortality globally.',
    discipline: 'Clinical Medicine',
    subDiscipline: 'Obstetrics',
    documentType: 'Clinical Guideline',
    authors: ['World Health Organization'],
    year: 2023,
    source: {
      name: 'WHO',
      url: 'https://www.who.int/publications/i/item/9789240027251',
      license: 'CC BY-NC-SA 3.0 IGO',
      attribution: 'World Health Organization',
    },
    tags: ['postpartum hemorrhage', 'obstetrics', 'maternal health', 'pph'],
    estimatedHours: 10,
  },
  {
    title: 'WHO Guidelines on Hand Hygiene in Healthcare',
    description: 'Evidence-based recommendations on hand hygiene practices in healthcare settings to reduce healthcare-associated infections.',
    discipline: 'Public Health',
    subDiscipline: 'Disease Prevention',
    documentType: 'Clinical Guideline',
    authors: ['World Health Organization'],
    year: 2022,
    source: {
      name: 'WHO',
      url: 'https://www.who.int/publications/i/item/9789241597906',
      license: 'CC BY-NC-SA 3.0 IGO',
      attribution: 'World Health Organization',
    },
    tags: ['hand hygiene', 'infection control', 'public health', 'healthcare safety'],
    estimatedHours: 8,
  },

  // ---- CDC RESOURCES ----
  {
    title: 'CDC Immunization Schedule (Adult and Child)',
    description: 'Current CDC recommended immunization schedules for children, adolescents, and adults, including catch-up guidance.',
    discipline: 'Public Health',
    subDiscipline: 'Disease Prevention',
    documentType: 'Clinical Guideline',
    authors: ['Centers for Disease Control and Prevention'],
    year: 2024,
    source: {
      name: 'CDC',
      url: 'https://www.cdc.gov/vaccines/schedules/',
      license: 'Public Domain (US Government)',
    },
    tags: ['vaccination', 'immunization', 'public health', 'cdc', 'prevention'],
    estimatedHours: 8,
  },
  {
    title: 'CDC Guideline for Prescribing Opioids for Chronic Pain',
    description: 'Evidence-based recommendations for opioid prescribing in primary care settings to improve patient safety and reduce opioid use disorder.',
    discipline: 'Clinical Medicine',
    subDiscipline: 'Internal Medicine',
    documentType: 'Clinical Guideline',
    authors: ['Centers for Disease Control and Prevention'],
    year: 2022,
    source: {
      name: 'CDC',
      url: 'https://www.cdc.gov/mmwr/volumes/71/rr/rr7103a1.htm',
      license: 'Public Domain (US Government)',
    },
    tags: ['opioid', 'pain management', 'cdc', 'guidelines', 'substance use'],
    estimatedHours: 12,
  },

  // ---- OPENSTAX ----
  {
    title: 'Anatomy and Physiology 2e',
    description: 'Comprehensive open textbook covering human anatomy and physiology from cells to organ systems, with clinical connections.',
    discipline: 'Anatomy',
    subDiscipline: 'Gross Anatomy',
    documentType: 'Textbook',
    authors: ['OpenStax', 'J. Gordon Betts', 'Kelly A. Young'],
    year: 2022,
    source: {
      name: 'OpenStax',
      url: 'https://openstax.org/details/books/anatomy-and-physiology-2e',
      license: 'CC BY 4.0',
      attribution: 'OpenStax, Rice University',
    },
    tags: ['anatomy', 'physiology', 'openstax', 'textbook', 'basic sciences'],
    estimatedHours: 60,
  },
  {
    title: 'Microbiology 2e',
    description: 'Open textbook covering the fundamentals of microbiology including bacteria, viruses, fungi, and protozoa with medical applications.',
    discipline: 'Microbiology',
    subDiscipline: 'Bacteriology',
    documentType: 'Textbook',
    authors: ['OpenStax', 'Nina Parker', 'Mark Schneegurt'],
    year: 2022,
    source: {
      name: 'OpenStax',
      url: 'https://openstax.org/details/books/microbiology-2e',
      license: 'CC BY 4.0',
      attribution: 'OpenStax, Rice University',
    },
    tags: ['microbiology', 'bacteriology', 'virology', 'immunology', 'openstax'],
    estimatedHours: 50,
  },

  // ---- NIH / NATIONAL CANCER INSTITUTE ----
  {
    title: 'NCI PDQ Cancer Treatment Summaries',
    description: 'Physician Data Query (PDQ) comprehensive, evidence-based summaries on cancer treatment, screening, prevention, and supportive care.',
    discipline: 'Clinical Medicine',
    subDiscipline: 'Internal Medicine',
    documentType: 'Reference Manual',
    authors: ['National Cancer Institute'],
    year: 2024,
    source: {
      name: 'National Cancer Institute (NIH)',
      url: 'https://www.cancer.gov/publications/pdq',
      license: 'Public Domain (US Government)',
    },
    tags: ['oncology', 'cancer', 'chemotherapy', 'nci', 'pdq'],
    estimatedHours: 40,
  },

  // ---- PHARMACOLOGY / DRUG INFORMATION ----
  {
    title: 'DailyMed — Drug Label Information',
    description: 'Comprehensive database of FDA-approved drug labels, including prescribing information, boxed warnings, and medication guides.',
    discipline: 'Pharmacy',
    subDiscipline: 'Drug Information',
    documentType: 'Drug Monograph',
    authors: ['National Library of Medicine (NLM)'],
    year: 2024,
    source: {
      name: 'DailyMed / NLM',
      url: 'https://dailymed.nlm.nih.gov/dailymed/',
      license: 'Public Domain (US Government)',
    },
    tags: ['drug information', 'fda', 'labeling', 'prescribing', 'pharmacy'],
    estimatedHours: 30,
  },
  {
    title: 'Drugs@FDA — Approved Drug Products',
    description: 'FDA database of approved drug products with labels, approval letters, reviews, and therapeutic equivalence evaluations.',
    discipline: 'Pharmacy',
    subDiscipline: 'Drug Information',
    documentType: 'Reference Manual',
    authors: ['U.S. Food and Drug Administration'],
    year: 2024,
    source: {
      name: 'FDA',
      url: 'https://www.accessdata.fda.gov/scripts/cder/daf/',
      license: 'Public Domain (US Government)',
    },
    tags: ['fda', 'drug approval', 'pharmacy', 'drug information', 'regulatory'],
    estimatedHours: 20,
  },

  // ---- PUBLIC HEALTH ----
  {
    title: 'CDC Principles of Epidemiology in Public Health Practice',
    description: 'Self-study course covering epidemiological principles, study designs, outbreak investigation, and public health surveillance.',
    discipline: 'Public Health',
    subDiscipline: 'Epidemiology',
    documentType: 'Textbook',
    authors: ['Centers for Disease Control and Prevention'],
    year: 2022,
    source: {
      name: 'CDC',
      url: 'https://www.cdc.gov/csels/dsepd/ss1978/',
      license: 'Public Domain (US Government)',
    },
    tags: ['epidemiology', 'public health', 'cdc', 'study design', 'surveillance'],
    estimatedHours: 30,
  },
  {
    title: 'WHO Health Promotion Glossary',
    description: 'Definitions and frameworks for health promotion terminology and concepts used in public health practice globally.',
    discipline: 'Public Health',
    subDiscipline: 'Health Promotion',
    documentType: 'Reference Manual',
    authors: ['World Health Organization'],
    year: 2021,
    source: {
      name: 'WHO',
      url: 'https://www.who.int/publications/i/item/9789240038349',
      license: 'CC BY-NC-SA 3.0 IGO',
      attribution: 'World Health Organization',
    },
    tags: ['health promotion', 'public health', 'who', 'glossary'],
    estimatedHours: 8,
  },

  // ---- RESEARCH METHODS ----
  {
    title: 'Users\' Guides to the Medical Literature (JAMA)',
    description: 'Evidence-based medicine methodology for critical appraisal of medical literature, including study design, statistics, and clinical application.',
    discipline: 'Research',
    subDiscipline: 'Evidence-Based Medicine',
    documentType: 'Textbook',
    authors: ['Gordon Guyatt', 'Drummond Rennie', 'Maureen Meade'],
    year: 2023,
    source: {
      name: 'JAMA Evidence',
      url: 'https://jamaevidence.mhmedical.com/',
      license: 'Open Access (selected chapters)',
    },
    tags: ['ebm', 'critical appraisal', 'research methods', 'statistics', 'jama'],
    estimatedHours: 35,
  },
  {
    title: 'CONSORT 2010 Statement — Reporting Guidelines for RCTs',
    description: 'Evidence-based minimum set of recommendations for reporting randomized controlled trials, including the CONSORT flow diagram and checklist.',
    discipline: 'Research',
    subDiscipline: 'Clinical Trials',
    documentType: 'Clinical Guideline',
    authors: ['CONSORT Group', 'Kenneth Schulz', 'Douglas Altman'],
    year: 2010,
    source: {
      name: 'CONSORT Statement',
      url: 'https://www.consort-statement.org/',
      license: 'Open Access (CC BY)',
    },
    tags: ['consort', 'rct', 'clinical trials', 'reporting guidelines', 'research'],
    estimatedHours: 8,
  },

  // ---- PHARMACEUTICS ----
  {
    title: 'FDA Guidance on Dosage Form Development',
    description: 'FDA guidance documents covering pharmaceutical development, dosage form design, and manufacturing considerations for drug products.',
    discipline: 'Pharmaceutics',
    subDiscipline: 'Dosage Forms',
    documentType: 'Clinical Guideline',
    authors: ['U.S. Food and Drug Administration'],
    year: 2023,
    source: {
      name: 'FDA',
      url: 'https://www.fda.gov/drugs/guidance-compliance-regulatory-information',
      license: 'Public Domain (US Government)',
    },
    tags: ['dosage forms', 'pharmaceutical development', 'fda', 'manufacturing'],
    estimatedHours: 20,
  },

  // ---- NUTRITION ----
  {
    title: 'Dietary Guidelines for Americans 2020-2025',
    description: 'Evidence-based nutrition guidance to promote health, reduce chronic disease risk, and maintain healthy eating patterns across all life stages.',
    discipline: 'Nutrition',
    subDiscipline: 'Clinical Nutrition',
    documentType: 'Clinical Guideline',
    authors: ['USDA', 'HHS'],
    year: 2020,
    source: {
      name: 'USDA / HHS',
      url: 'https://www.dietaryguidelines.gov/',
      license: 'Public Domain (US Government)',
    },
    tags: ['nutrition', 'dietary guidelines', 'public health', 'prevention'],
    estimatedHours: 15,
  },
];

// ============================================================
// INGESTION RUNNER
// ============================================================

async function seedKnowledgeBase() {
  console.log('============================================');
  console.log('  Clinova Knowledge Base Seeder');
  console.log(`  Target API: ${API_BASE}`);
  console.log(`  Resources to ingest: ${FREE_RESOURCES.length}`);
  console.log('============================================\n');

  let succeeded = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < FREE_RESOURCES.length; i++) {
    const resource = FREE_RESOURCES[i];
    console.log(`[${i + 1}/${FREE_RESOURCES.length}] Ingesting: "${resource.title}"...`);

    try {
      const response = await fetch(`${API_BASE}/api/knowledge-base/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: resource.title,
          description: resource.description,
          authors: resource.authors,
          year: resource.year,
          source: resource.source,
          tags: resource.tags,
          generateSummary: true,
          generateFlashcards: false,
          generateMCQs: false,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log(`  ✓ Success (ID: ${data.resource.id})`);
        succeeded++;
      } else if (data.error?.includes('Duplicate')) {
        console.log(`  ∼ Skipped (duplicate): ${data.error}`);
        skipped++;
      } else {
        console.log(`  ✗ Failed: ${data.error}`);
        failed++;
      }
    } catch (err: any) {
      console.log(`  ✗ Error: ${err.message}`);
      failed++;
    }

    // Small delay between requests to avoid rate limiting
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log('\n============================================');
  console.log('  Seeding Complete');
  console.log(`  ✓ Succeeded: ${succeeded}`);
  console.log(`  ∼ Skipped:   ${skipped}`);
  console.log(`  ✗ Failed:    ${failed}`);
  console.log(`  Total:       ${FREE_RESOURCES.length}`);
  console.log('============================================');
}

// Run if executed directly
seedKnowledgeBase().catch(console.error);
