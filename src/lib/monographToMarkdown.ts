import type { DrugMonograph } from '../services/drugMonograph.service';

export function monographToMarkdown(m: DrugMonograph): string {
  const lines: string[] = [];

  lines.push(`# ${m.name} Monograph`);
  lines.push('');
  lines.push(`**Drug Class:** ${m.drug_class_name || m.drug_class}`);
  lines.push('');

  if (m.indications.length > 0) {
    lines.push('## Indications');
    m.indications.forEach(i => lines.push(`- ${i}`));
    lines.push('');
  }

  if (m.contraindications.length > 0) {
    lines.push('## Contraindications');
    m.contraindications.forEach(c => lines.push(`- ${c}`));
    lines.push('');
  }

  if (m.dosage && Object.keys(m.dosage).length > 0) {
    lines.push('## Dosage');
    const dosage = m.dosage as Record<string, any>;

    const sections: [string, string][] = [
      ['Adult', 'adult'],
      ['Paediatric', 'paediatric'],
      ['Geriatric', 'geriatric'],
    ];

    for (const [label, key] of sections) {
      const section = dosage[key];
      if (section && typeof section === 'object') {
        lines.push(`### ${label} Dosing`);
        for (const [subkey, val] of Object.entries(section)) {
          lines.push(`- **${subkey}:** ${val}`);
        }
        lines.push('');
      }
    }

    if (dosage.renalAdjustment) {
      lines.push('### Renal Adjustment');
      lines.push(dosage.renalAdjustment);
      lines.push('');
    }

    if (dosage.hepaticAdjustment) {
      lines.push('### Hepatic Adjustment');
      lines.push(dosage.hepaticAdjustment);
      lines.push('');
    }
  }

  if (m.side_effects.length > 0) {
    lines.push('## Side Effects');
    m.side_effects.forEach(s => lines.push(`- ${s}`));
    lines.push('');
  }

  if (m.interactions.length > 0) {
    lines.push('## Drug Interactions');
    m.interactions.forEach(i => lines.push(`- ${i}`));
    lines.push('');
  }

  if (m.monitoring) {
    lines.push('## Monitoring');
    lines.push(m.monitoring);
    lines.push('');
  }

  if (m.patient_counselling) {
    lines.push('## Patient Counselling');
    lines.push(m.patient_counselling);
    lines.push('');
  }

  lines.push('---');
  lines.push(`*Source: Kenya Drug Index — Clinova Drug Monograph Database*`);
  lines.push('');

  return lines.join('\n');
}
