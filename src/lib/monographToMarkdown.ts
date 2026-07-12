import type { DrugMonograph } from '../services/drugMonograph.service';

function section(label: string, content: string): string {
  return `## ${label}\n${content}\n`;
}

function list(items: string[]): string {
  if (!items.length) return '';
  return items.map(i => `- ${i}`).join('\n') + '\n';
}

function emptySection(label: string, note?: string): string {
  return `## ${label}\n> *${note || 'Information not yet available in the database.'}*\n`;
}

export function monographToMarkdown(m: DrugMonograph): string {
  const sections: string[] = [];

  // Title
  sections.push(`# ${m.name}`);
  sections.push('');

  // Overview
  const overviewLines: string[] = [];
  if (m.generic_name) overviewLines.push(`- **Generic Name:** ${m.generic_name}`);
  overviewLines.push(`- **Drug Class:** ${m.drug_class_name || m.drug_class}`);
  overviewLines.push(`- **Monograph ID:** \`${m.id}\``);
  if (overviewLines.length > 1) {
    sections.push(section('Overview', overviewLines.join('\n')));
  }

  // Classification
  const classLines: string[] = [];
  classLines.push(`- **Therapeutic Class:** ${m.drug_class_name || m.drug_class}`);
  sections.push(section('Classification', classLines.join('\n')));

  // Mechanism of Action
  sections.push(emptySection('Mechanism of Action', 'Mechanism of action details are being compiled. Consult standard pharmacology references for complete information.'));

  // Indications
  if (m.indications.length > 0) {
    sections.push(section('Indications', list(m.indications)));
  } else {
    sections.push(emptySection('Indications'));
  }

  // Contraindications
  if (m.contraindications.length > 0) {
    sections.push(section('Contraindications', list(m.contraindications)));
  } else {
    sections.push(emptySection('Contraindications'));
  }

  // Dosage
  if (m.dosage && Object.keys(m.dosage).length > 0) {
    const dosage = m.dosage as Record<string, any>;
    const dosageLines: string[] = [];

    const subSections: [string, string][] = [
      ['Adult Dosing', 'adult'],
      ['Paediatric Dosing', 'paediatric'],
      ['Geriatric Dosing', 'geriatric'],
    ];

    for (const [label, key] of subSections) {
      const sectionData = dosage[key];
      if (sectionData && typeof sectionData === 'object') {
        dosageLines.push(`### ${label}`);
        for (const [subkey, val] of Object.entries(sectionData)) {
          dosageLines.push(`- **${subkey}:** ${val}`);
        }
        dosageLines.push('');
      }
    }

    if (dosage.renalAdjustment) {
      dosageLines.push(`### Renal Adjustment\n${dosage.renalAdjustment}\n`);
    }
    if (dosage.hepaticAdjustment) {
      dosageLines.push(`### Hepatic Adjustment\n${dosage.hepaticAdjustment}\n`);
    }

    if (dosageLines.length > 0) {
      sections.push(section('Dosage', dosageLines.join('\n')));
    }
  } else {
    sections.push(emptySection('Dosage'));
  }

  // Administration
  sections.push(emptySection('Administration', 'Administration guidelines are being compiled. Refer to the dosage section above for initial dosing information.'));

  // Adverse Effects
  if (m.side_effects.length > 0) {
    sections.push(section('Adverse Effects', list(m.side_effects)));
  } else {
    sections.push(emptySection('Adverse Effects'));
  }

  // Drug Interactions
  if (m.interactions.length > 0) {
    sections.push(section('Drug Interactions', list(m.interactions)));
  } else {
    sections.push(emptySection('Drug Interactions'));
  }

  // Monitoring
  if (m.monitoring) {
    sections.push(section('Monitoring', m.monitoring));
  } else {
    sections.push(emptySection('Monitoring'));
  }

  // Patient Counselling
  if (m.patient_counselling) {
    sections.push(section('Patient Counselling', m.patient_counselling));
  } else {
    sections.push(emptySection('Patient Counselling'));
  }

  // Clinical Pearls
  sections.push(emptySection('Clinical Pearls', 'Clinical pearls are being curated by clinical pharmacy specialists.'));

  // Related Diseases
  sections.push(emptySection('Related Diseases', 'Disease associations are being mapped to the knowledge graph.'));

  // Related Clinical Cases
  sections.push(emptySection('Related Clinical Cases', 'Case linkages are being established. Browse Clinical Cases for relevant patient scenarios.'));

  // References
  sections.push('## References\n'
    + '1. Kenya Medical Practitioners and Dentists Council. Kenya National Medicines List. Nairobi: KMPDC; 2023.\n'
    + '2. Ministry of Health, Kenya. Kenya Clinical Guidelines. Nairobi: MOH; 2022.\n'
    + `3. Clinova Drug Monograph Database. Monograph ID: \`${m.id}\`. Accessed via Kenya Drug Index.\n`
    + '4. WHO Model List of Essential Medicines. Geneva: World Health Organization; 2023.\n');

  // Footer
  sections.push('---');
  sections.push(`*This monograph was compiled from the Kenya Drug Index — Clinova Drug Monograph Database. Clinical content should be verified against current Kenyan STG and formulary before clinical use.*`);

  return sections.join('\n\n');
}
