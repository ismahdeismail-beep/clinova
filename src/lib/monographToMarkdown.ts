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

// Bold clinically important mechanism verbs so the eye lands on the "how".
function boldMechanism(text: string): string {
  return text
    .replace(/^\s*\d+(\.\d+)?\s+(?:Mechanism of Action|DESCRIPTION|CLINICAL PHARMACOLOGY|CLINICAL PHARMACOLOGY AND|PHARMACOKINETICS)\s*/i, '')
    .replace(
      /\b(inhibits?|blocks?|antagoni[sz]es?|agonists?|binds?|prevents?|reduces?|enhances?|stimulates?|suppresses?|disrupts?|interferes?|modulates?|potentiates?|activates?|increases?|decreases?)\b/gi,
      (m) => `**${m}**`,
    );
}

// Split prose into sentences, drop empties and truncated fragments.
// Protect common abbreviations so "e.g. X" / "i.e. Y" aren't split.
function sentences(text: string): string[] {
  const protected_ = text
    .replace(/\b(e\.g\.|i\.e\.|etc\.|vs\.|approx\.|U\.S\.|U\.K\.|min\.|max\.|hr\.|no\.|Fig\.|Ref\.|Vol\.|Nos?\.)\s*/gi, (m) => m.replace(/\./g, '\u2024'))
    .replace(/\s+/g, ' ');
  const parts = protected_
    .split(/(?<=[.;!?])\s+(?=[A-Z(])/)
    .map((s) => s.replace(/\u2024/g, '.').trim())
    .filter((s) => s.length > 8);
  return parts;
}

// Highlight a sentence fragment with a colored pill-like markdown emphasis.
function bullet(text: string): string {
  return `- ${boldMechanism(text)}`;
}

// ── Mechanism of Action ──────────────────────────────────────────────
// First sentence becomes a highlighted "How it works" callout; the rest
// become mechanism bullets with key verbs bolded.
function formatMoa(moa: string): string {
  const clean = moa.trim();
  if (!clean) return '';
  const parts = sentences(clean);
  const intro = parts[0] || clean;
  const rest = parts.slice(1);
  const lines: string[] = [];
  lines.push(`> **How it works —** ${boldMechanism(intro)}`);
  if (rest.length) lines.push('', rest.map(bullet).join('\n'));
  return lines.join('\n');
}

// ── Pharmacokinetics ─────────────────────────────────────────────────
// Three shapes handled:
//   1. structured "label: value" lines (curated rows, e.g. Artemether-Lumefantrine)
//   2. prose with ADME markers -> sub-headed bullets
//   3. free prose -> key-number bullets
function formatPk(pk: string): string {
  const clean = pk.trim();
  if (!clean) return '';

  const lines = clean.split(/\n+/).map((l) => l.trim()).filter(Boolean);

  // Shape 1: "label: value" lines (ours)
  const structured = lines.length >= 2 && lines.every((l) => /^[a-zA-Z_][a-zA-Z_ ]*:\s+.+/.test(l));
  if (structured) {
    return lines
      .map((l) => {
        const idx = l.indexOf(':');
        const label = l.slice(0, idx).replace(/[_-]/g, ' ').trim();
        const val = l.slice(idx + 1).trim();
        const pretty = label.charAt(0).toUpperCase() + label.slice(1);
        return `- **${pretty}:** ${val}`;
      })
      .join('\n');
  }

  // Shape 2: ADME markers in prose -> sub-headed bullets
  const adme = [
    { label: 'Absorption', re: /\b(absorption|absorbed|bioavailability|tmax|peak plasma)\b/i },
    { label: 'Distribution', re: /\b(distribution|distributed|volume of distribution|protein binding)\b/i },
    { label: 'Metabolism', re: /\b(metabolism|metabolised|metabolized|cyp\d|cytochrome)\b/i },
    { label: 'Elimination', re: /\b(elimination|eliminated|excretion|excreted|half-life|renal clearance)\b/i },
  ];
  const markers = adme.filter((a) => a.re.test(clean));
  if (markers.length >= 2) {
    const out: string[] = [];
    // If the text already starts with a marker, keep the whole text; otherwise
    // render each marker sentence group under its sub-heading.
    for (const { label, re } of markers) {
      const group = sentences(clean)
        .filter((s) => re.test(s))
        .map((s) => s.trim());
      if (!group.length) continue;
      out.push(`### ⬇ ${label}`);
      out.push(group.map(bullet).join('\n'));
    }
    // Any sentences without a marker get their own generic bucket.
    const generic = sentences(clean).filter((s) => !markers.some((m) => m.re.test(s)));
    if (generic.length) {
      out.push(`### ⏱ Other kinetics`);
      out.push(generic.map(bullet).join('\n'));
    }
    return out.join('\n\n');
  }

  // Shape 3: plain prose -> numbered bullets
  return sentences(clean).map((s) => bullet(s)).join('\n');
}

// Strip "Refer to current prescribing information..." boilerplate so those rows
// render as a graceful "pending AI enrichment" note instead of a fake bullet.
function isBoilerplate(text: string): boolean {
  return /^(refer to current|consult current|seek immediate medical)/i.test(text.trim());
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
  sections.push(section('🔎 Overview', overviewLines.join('\n')));

  if (!hasRealContent) {
    sections.push(
      '> *This entry is indexed in the Kenya Drug Index catalogue. A full clinical monograph ' +
      'with mechanism of action, dosing, contraindications, adverse effects, monitoring, and ' +
      'patient counselling is generated on demand via the Clinova AI Knowledge Engine. ' +
      'Select **Generate Monograph** or re-open this drug to load the complete profile.*'
    );

    sections.push('## 🗂 Classification');
    sections.push(`- **Therapeutic Class:** ${m.drug_class_name || m.drug_class}`);
    sections.push(`- **Index Reference:** \`${m.id}\``);
    sections.push(`- **Source:** Kenya Drug Index (KDI) bundled catalogue`);

    sections.push('## 📚 References\n'
      + '1. Kenya Medical Practitioners and Dentists Council. Kenya National Medicines List. Nairobi: KMPDC; 2023.\n'
      + '2. Ministry of Health, Kenya. Kenya Clinical Guidelines. Nairobi: MOH; 2022.\n'
      + `3. Clinova Drug Monograph Database. Index ID: \`${m.id}\`. Accessed via Kenya Drug Index.\n`
      + '4. WHO Model List of Essential Medicines. Geneva: World Health Organization; 2023.\n');

    sections.push('---');
    sections.push(`*This catalogue entry was compiled from the Kenya Drug Index — Clinova Drug Monograph Database. Clinical content should be verified against current Kenyan STG and formulary before clinical use.*`);
    return sections.join('\n\n');
  }

  // Classification
  sections.push(section('🗂 Classification', `- **Therapeutic Class:** ${m.drug_class_name || m.drug_class}`));

  // Brand Names
  if (m.brand_names && m.brand_names.length > 0) {
    sections.push(section('🏷 Brand Names', list(m.brand_names)));
  }

  // Mechanism of Action — creative: callout + mechanism bullets
  if (m.mechanism_of_action) {
    const body = isBoilerplate(m.mechanism_of_action)
      ? `> *${m.mechanism_of_action}*\n> *A tailored mechanism explanation can be generated on demand via the Clinova AI Knowledge Engine.*`
      : formatMoa(m.mechanism_of_action);
    sections.push(section('⚙️ Mechanism of Action', body));
  }

  // Pharmacokinetics — creative: structured ADME bullets / sub-heads
  if (m.pharmacokinetics) {
    const body = isBoilerplate(m.pharmacokinetics)
      ? `> *${m.pharmacokinetics}*\n> *Detailed ADME data can be generated on demand via the Clinova AI Knowledge Engine.*`
      : formatPk(m.pharmacokinetics);
    sections.push(section('⏱ Pharmacokinetics', body));
  }

  // Indications
  sections.push(m.indications.length > 0 ? section('🎯 Indications', list(m.indications)) : emptySection('🎯 Indications'));

  // Contraindications
  const contraindicationItems = [...m.contraindications];
  if (m.pregnancy_category) {
    contraindicationItems.push(`**Pregnancy Category ${m.pregnancy_category}** — see Warnings`);
  }
  sections.push(contraindicationItems.length > 0 ? section('⛔ Contraindications', list(contraindicationItems)) : emptySection('⛔ Contraindications'));

  // Black Box Warnings (critical — show early)
  if (m.black_box_warnings && m.black_box_warnings.length > 0) {
    sections.push(section('🚨 Black Box Warnings', m.black_box_warnings.map(w => `> ⚠ **${w}**`).join('\n\n')));
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
        dosageLines.push(`### 💊 ${label}`);
        for (const [subkey, val] of Object.entries(sectionData)) {
          dosageLines.push(`- **${subkey}:** ${val}`);
        }
        dosageLines.push('');
      }
    }

    if (dosage.renalAdjustment) {
      dosageLines.push(`### 🫘 Renal Adjustment\n${dosage.renalAdjustment}\n`);
    }
    if (dosage.hepaticAdjustment) {
      dosageLines.push(`### 🍃 Hepatic Adjustment\n${dosage.hepaticAdjustment}\n`);
    }

    if (dosageLines.length > 0) {
      sections.push(section('💊 Dosage', dosageLines.join('\n')));
    }
  } else {
    sections.push(emptySection('💊 Dosage'));
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
    sections.push(section('⚠️ Warnings & Precautions', list(warningItems)));
  }

  // Adverse Effects
  sections.push(m.side_effects.length > 0 ? section('😖 Adverse Effects', list(m.side_effects)) : emptySection('😖 Adverse Effects'));

  // Drug Interactions
  sections.push(m.interactions.length > 0 ? section('🔗 Drug Interactions', list(m.interactions)) : emptySection('🔗 Drug Interactions'));

  // Overdose Management
  if (m.overdose) {
    const body = isBoilerplate(m.overdose)
      ? `> *${m.overdose}*\n> *Specific overdose guidance can be generated on demand via the Clinova AI Knowledge Engine.*`
      : formatMoa(m.overdose);
    sections.push(section('🆘 Overdose Management', body));
  }

  // Monitoring
  sections.push(m.monitoring ? section('📈 Monitoring', m.monitoring) : emptySection('📈 Monitoring'));

  // Patient Counselling
  sections.push(m.patient_counselling ? section('🗣 Patient Counselling', m.patient_counselling) : emptySection('🗣 Patient Counselling'));

  // Clinical Pearls
  if (m.clinical_pearls && m.clinical_pearls.length > 0) {
    sections.push(section('💎 Clinical Pearls', list(m.clinical_pearls)));
  }

  // References
  sections.push('## 📚 References\n'
    + '1. Kenya Medical Practitioners and Dentists Council. Kenya National Medicines List. Nairobi: KMPDC; 2023.\n'
    + '2. Ministry of Health, Kenya. Kenya Clinical Guidelines. Nairobi: MOH; 2022.\n'
    + `3. Clinova Drug Monograph Database. Monograph ID: \`${m.id}\`. Accessed via Kenya Drug Index.\n`
    + '4. WHO Model List of Essential Medicines. Geneva: World Health Organization; 2023.\n');

  // Footer
  sections.push('---');
  sections.push(`*This monograph was compiled from the Kenya Drug Index — Clinova Drug Monograph Database. Clinical content should be verified against current Kenyan STG and formulary before clinical use.*`);

  return sections.join('\n\n');
}
