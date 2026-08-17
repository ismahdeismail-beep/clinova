import type { DrugIndustryConnection } from '../types/knowledge'

export const BUNDLED_DRUG_INDUSTRY_CONNECTIONS: Array<
  DrugIndustryConnection & { drug_name: string }
> = [
  // ── Paracetamol ──────────────────────────────────────────────
  {
    id: 'dic-001',
    drug_id: 'acetaminophen',
    drug_name: 'Paracetamol',
    knowledge_entry_id: 'entry-004',
    connection_type: 'manufacturing_process',
    context:
      'Paracetamol tablets are manufactured by direct compression in Kenya due to the API\'s excellent compressibility and flow properties.',
    relevance_score: 0.95,
    metadata: {},
    created_at: '2026-01-15',
  },
  {
    id: 'dic-002',
    drug_id: 'acetaminophen',
    drug_name: 'Paracetamol',
    knowledge_entry_id: 'entry-016',
    connection_type: 'manufacturer_info',
    context:
      'Paracetamol is manufactured by multiple Kenyan companies including Cosmos, Dawa, and Medisel. It is one of the most widely produced medicines locally.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-01-15',
  },
  // ── Amoxicillin ──────────────────────────────────────────────
  {
    id: 'dic-003',
    drug_id: 'amoxicillin',
    drug_name: 'Amoxicillin',
    knowledge_entry_id: 'entry-002',
    connection_type: 'manufacturing_process',
    context:
      'Amoxicillin capsules and tablets are typically manufactured by wet granulation. The trihydrate form requires careful moisture control during processing.',
    relevance_score: 0.95,
    metadata: {},
    created_at: '2026-01-15',
  },
  {
    id: 'dic-004',
    drug_id: 'amoxicillin',
    drug_name: 'Amoxicillin',
    knowledge_entry_id: 'entry-008',
    connection_type: 'stability_note',
    context:
      'Amoxicillin suspensions have limited stability — 14 days after reconstitution when stored at 25°C. Powder for oral suspension is stable for 24 months dry.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-01-15',
  },
  {
    id: 'dic-005',
    drug_id: 'amoxicillin',
    drug_name: 'Amoxicillin',
    knowledge_entry_id: 'entry-016',
    connection_type: 'manufacturer_info',
    context:
      'Amoxicillin is manufactured by several Kenyan companies and is included in the Kenya Essential Medicines List (KEML) as a first-line antibiotic.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-01-15',
  },
  // ── Artemether/Lumefantrine (Coartem) ────────────────────────
  {
    id: 'dic-006',
    drug_id: 'artemether-lumefantrine',
    drug_name: 'Artemether/Lumefantrine',
    knowledge_entry_id: 'entry-001',
    connection_type: 'formulation_type',
    context:
      'Artemether/lumefantrine is formulated as a fixed-dose combination tablet. The tablet contains lumefantrine in a solid dispersion with artemether.',
    relevance_score: 0.95,
    metadata: {},
    created_at: '2026-01-15',
  },
  {
    id: 'dic-007',
    drug_id: 'artemether-lumefantrine',
    drug_name: 'Artemether/Lumefantrine',
    knowledge_entry_id: 'entry-016',
    connection_type: 'manufacturer_info',
    context:
      'Cipla Quality Chemical Industries (Nairobi) is a major manufacturer of artemether/lumefantrine in East Africa, with WHO prequalification for some products.',
    relevance_score: 0.95,
    metadata: {},
    created_at: '2026-01-15',
  },
  {
    id: 'dic-008',
    drug_id: 'artemether-lumefantrine',
    drug_name: 'Artemether/Lumefantrine',
    knowledge_entry_id: 'entry-010',
    connection_type: 'regulatory_note',
    context:
      'Artemisinin-based combinations are subject to WHO prequalification for international procurement. PPB registration required for Kenyan market.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-01-15',
  },
  // ── Metformin ────────────────────────────────────────────────
  {
    id: 'dic-009',
    drug_id: 'metformin',
    drug_name: 'Metformin',
    knowledge_entry_id: 'entry-002',
    connection_type: 'manufacturing_process',
    context:
      'Metformin hydrochloride tablets are manufactured by wet granulation or direct compression. The hydrochloride salt is hygroscopic and requires controlled humidity during processing.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-01-15',
  },
  {
    id: 'dic-010',
    drug_id: 'metformin',
    drug_name: 'Metformin',
    knowledge_entry_id: 'entry-008',
    connection_type: 'stability_note',
    context:
      'Metformin tablets are stable at 25°C/60%RH. Store in a dry place. Moisture-sensitive packaging is critical in tropical climates like Kenya.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-01-15',
  },
  // ── Enalapril ────────────────────────────────────────────────
  {
    id: 'dic-011',
    drug_id: 'enalapril',
    drug_name: 'Enalapril',
    knowledge_entry_id: 'entry-008',
    connection_type: 'stability_note',
    context:
      'Enalapril maleate tablets are moisture-sensitive. Blister packaging (PVC/aluminium) is preferred over bottle packaging in tropical climates.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-01-15',
  },
  {
    id: 'dic-012',
    drug_id: 'enalapril',
    drug_name: 'Enalapril',
    knowledge_entry_id: 'entry-016',
    connection_type: 'manufacturer_info',
    context:
      'Enalapril is manufactured locally by several Kenyan companies and is included in the KEML for hypertension management.',
    relevance_score: 0.8,
    metadata: {},
    created_at: '2026-01-15',
  },
  // ── Fluconazole ──────────────────────────────────────────────
  {
    id: 'dic-013',
    drug_id: 'fluconazole',
    drug_name: 'Fluconazole',
    knowledge_entry_id: 'entry-001',
    connection_type: 'formulation_type',
    context:
      'Fluconazole is available as capsules (50mg, 150mg, 200mg) and oral suspension. Capsules are manufactured by wet granulation followed by encapsulation.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-01-15',
  },
  {
    id: 'dic-014',
    drug_id: 'fluconazole',
    drug_name: 'Fluconazole',
    knowledge_entry_id: 'entry-010',
    connection_type: 'regulatory_note',
    context:
      'Fluconazole 150mg (single dose for vaginal candidiasis) is on the WHO Essential Medicines List. PPB registration required for Kenyan market.',
    relevance_score: 0.8,
    metadata: {},
    created_at: '2026-01-15',
  },
  // ── Omeprazole ───────────────────────────────────────────────
  {
    id: 'dic-015',
    drug_id: 'omeprazole',
    drug_name: 'Omeprazole',
    knowledge_entry_id: 'entry-001',
    connection_type: 'formulation_type',
    context:
      'Omeprazole enteric-coated pellets in capsules. Acid-labile API requires enteric coating to prevent degradation in gastric acid.',
    relevance_score: 0.95,
    metadata: {},
    created_at: '2026-01-15',
  },
  {
    id: 'dic-016',
    drug_id: 'omeprazole',
    drug_name: 'Omeprazole',
    knowledge_entry_id: 'entry-008',
    connection_type: 'storage_requirement',
    context:
      'Omeprazole capsules should be stored below 25°C in a dry place. Enteric coating may degrade under high humidity conditions typical of Kenyan storage.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-01-15',
  },
  // ── Insulin ──────────────────────────────────────────────────
  {
    id: 'dic-017',
    drug_id: 'insulin',
    drug_name: 'Insulin',
    knowledge_entry_id: 'entry-015',
    connection_type: 'storage_requirement',
    context:
      'Insulin requires cold chain storage (2–8°C). Opened vials can be kept at room temperature (below 30°C) for 28 days. Critical cold chain product.',
    relevance_score: 0.98,
    metadata: {},
    created_at: '2026-01-15',
  },
  {
    id: 'dic-018',
    drug_id: 'insulin',
    drug_name: 'Insulin',
    knowledge_entry_id: 'entry-016',
    connection_type: 'supply_note',
    context:
      'Insulin is not manufactured locally in Kenya. It is imported and distributed by KEMSA. Cold chain infrastructure is critical for insulin supply nationwide.',
    relevance_score: 0.95,
    metadata: {},
    created_at: '2026-01-15',
  },
  // ── AZT/Zidovudine ──────────────────────────────────────────
  {
    id: 'dic-019',
    drug_id: 'zidovudine',
    drug_name: 'Zidovudine',
    knowledge_entry_id: 'entry-016',
    connection_type: 'manufacturer_info',
    context:
      'Zidovudine (AZT) and other ARVs are manufactured locally by Cipla QC under WHO prequalification. Kenya is a major ARV production hub in East Africa.',
    relevance_score: 0.95,
    metadata: {},
    created_at: '2026-01-15',
  },
  {
    id: 'dic-020',
    drug_id: 'zidovudine',
    drug_name: 'Zidovudine',
    knowledge_entry_id: 'entry-010',
    connection_type: 'regulatory_note',
    context:
      'ARVs require WHO prequalification for international procurement (PEPFAR, Global Fund). PPB registration required for domestic use.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-01-15',
  },
]
