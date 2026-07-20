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

  const hasRealContent =
    m.indications.length > 0 ||
    m.contraindications.length > 0 ||
    m.side_effects.length > 0 ||
    m.interactions.length > 0 ||
    !!m.monitoring ||
    !!m.patient_counselling ||
    (m.dosage && Object.keys(m.dosage).length > 0);

  // Overview — always shown
  const overviewLines: string[] = [];
  if (m.generic_name) overviewLines.push(`- **Generic Name:** ${m.generic_name}`);
  overviewLines.push(`- **Drug Class:** ${m.drug_class_name || m.drug_class}`);
  sections.push(section('Overview', overviewLines.join('\n')));

  if (!hasRealContent) {
    // Thin catalog entry: present a clean summary instead of empty placeholder sections.
    sections.push(
      '> *This entry is indexed in the Kenya Drug Index catalogue. A full clinical monograph ' +
      'with mechanism of action, dosing, contraindications, adverse effects, monitoring, and ' +
      'patient counselling is generated on demand via the Clinova AI Knowledge Engine. ' +
      'Select **Generate Monograph** or re-open this drug to load the complete profile.*'
    );

    sections.push('## Classification');
    sections.push(`- **Therapeutic Class:** ${m.drug_class_name || m.drug_class}`);
    sections.push(`- **Index Reference:** \`${m.id}\``);
    sections.push(`- **Source:** Kenya Drug Index (KDI) bundled catalogue`);

    sections.push('## References\n'
      + '1. Kenya Medical Practitioners and Dentists Council. Kenya National Medicines List. Nairobi: KMPDC; 2023.\n'
      + '2. Ministry of Health, Kenya. Kenya Clinical Guidelines. Nairobi: MOH; 2022.\n'
      + `3. Clinova Drug Monograph Database. Index ID: \`${m.id}\`. Accessed via Kenya Drug Index.\n`
      + '4. WHO Model List of Essential Medicines. Geneva: World Health Organization; 2023.\n');

    sections.push('---');
    sections.push(`*This catalogue entry was compiled from the Kenya Drug Index — Clinova Drug Monograph Database. Clinical content should be verified against current Kenyan STG and formulary before clinical use.*`);
    return sections.join('\n\n');
  }

  // Classification
  sections.push(section('Classification', `- **Therapeutic Class:** ${m.drug_class_name || m.drug_class}`));

  // Brand Names
  if (m.brand_names && m.brand_names.length > 0) {
    sections.push(section('Brand Names', list(m.brand_names)));
  }

  // Mechanism of Action
  if (m.mechanism_of_action) {
    sections.push(section('Mechanism of Action', m.mechanism_of_action));
  }

  // Pharmacokinetics
  if (m.pharmacokinetics) {
    sections.push(section('Pharmacokinetics', m.pharmacokinetics));
  }

  // Indications
  sections.push(m.indications.length > 0 ? section('Indications', list(m.indications)) : emptySection('Indications'));

  // Contraindications
  const contraindicationItems = [...m.contraindications];
  if (m.pregnancy_category) {
    contraindicationItems.push(`**Pregnancy Category ${m.pregnancy_category}** — see Warnings`);
  }
  sections.push(contraindicationItems.length > 0 ? section('Contraindications', list(contraindicationItems)) : emptySection('Contraindications'));

  // Black Box Warnings (critical — show early)
  if (m.black_box_warnings && m.black_box_warnings.length > 0) {
    sections.push(section('Black Box Warnings', m.black_box_warnings.map(w => `> ⚠ **${w}**`).join('\n\n')));
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

  // Warnings & Precautions
  const warningItems: string[] = [];
  if (m.warnings && m.warnings.length > 0) {
    warningItems.push(...m.warnings);
  }
  if (m.pregnancy_category) {
    warningItems.push(`**Pregnancy Category ${m.pregnancy_category}**: Refer to manufacturer prescribing information for pregnancy and lactation guidance.`);
  }
  if (warningItems.length > 0) {
    sections.push(section('Warnings & Precautions', list(warningItems)));
  }

  // Adverse Effects
  sections.push(m.side_effects.length > 0 ? section('Adverse Effects', list(m.side_effects)) : emptySection('Adverse Effects'));

  // Drug Interactions
  sections.push(m.interactions.length > 0 ? section('Drug Interactions', list(m.interactions)) : emptySection('Drug Interactions'));

  // Overdose Management
  if (m.overdose) {
    sections.push(section('Overdose Management', m.overdose));
  }

  // Monitoring
  sections.push(m.monitoring ? section('Monitoring', m.monitoring) : emptySection('Monitoring'));

  // Patient Counselling
  sections.push(m.patient_counselling ? section('Patient Counselling', m.patient_counselling) : emptySection('Patient Counselling'));

  // Clinical Pearls
  if (m.clinical_pearls && m.clinical_pearls.length > 0) {
    sections.push(section('Clinical Pearls', list(m.clinical_pearls)));
  }

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
