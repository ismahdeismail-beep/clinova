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
      "Paracetamol tablets are manufactured by direct compression in Kenya due to the API's excellent compressibility and flow properties.",
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
  // ── Amoxicillin/Clavulanate ─────────────────────────────────
  {
    id: 'dic-021',
    drug_id: 'bundled-002',
    drug_name: 'Amoxicillin/Clavulanate',
    knowledge_entry_id: 'entry-002',
    connection_type: 'manufacturing_process',
    context:
      'Amoxicillin/clavulanate tablets are manufactured by wet granulation. The clavulanate component is moisture-sensitive and degrades rapidly in aqueous environments, requiring careful process control.',
    relevance_score: 0.95,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-022',
    drug_id: 'bundled-002',
    drug_name: 'Amoxicillin/Clavulanate',
    knowledge_entry_id: 'entry-016',
    connection_type: 'manufacturer_info',
    context:
      'Amoxicillin/clavulanate combinations are manufactured by several Kenyan companies. The fixed-dose combination is widely used for upper respiratory tract infections and is on the KEML.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
  // ── Ceftriaxone ─────────────────────────────────────────────
  {
    id: 'dic-023',
    drug_id: 'bundled-011',
    drug_name: 'Ceftriaxone',
    knowledge_entry_id: 'entry-023',
    connection_type: 'manufacturing_process',
    context:
      'Ceftriaxone for injection is a sterile lyophilised powder requiring aseptic manufacturing. It is reconstituted with sterile water or lidocaine before administration.',
    relevance_score: 0.95,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-024',
    drug_id: 'bundled-011',
    drug_name: 'Ceftriaxone',
    knowledge_entry_id: 'entry-008',
    connection_type: 'stability_note',
    context:
      'Ceftriaxone reconstituted solution is stable for 10 days at 2–8°C or 24 hours at room temperature. Lyophilised powder is stable for 24 months at 25°C.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-025',
    drug_id: 'bundled-011',
    drug_name: 'Ceftriaxone',
    knowledge_entry_id: 'entry-033',
    connection_type: 'regulatory_note',
    context:
      'Ceftriaxone is included in the KEML as a third-generation cephalosporin for serious infections. Multiple Kenyan manufacturers produce the injectable form.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
  // ── Azithromycin ────────────────────────────────────────────
  {
    id: 'dic-026',
    drug_id: 'bundled-034',
    drug_name: 'Azithromycin',
    knowledge_entry_id: 'entry-001',
    connection_type: 'formulation_type',
    context:
      'Azithromycin is formulated as tablets (250mg, 500mg), oral suspension (powder for reconstitution), and ophthalmic solution. The dihydrate form is used for solid dosage forms.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-027',
    drug_id: 'bundled-034',
    drug_name: 'Azithromycin',
    knowledge_entry_id: 'entry-016',
    connection_type: 'manufacturer_info',
    context:
      'Azithromycin is widely manufactured in Kenya for both domestic use and regional export. It is a key antibiotic on the KEML for respiratory and sexually transmitted infections.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-028',
    drug_id: 'bundled-034',
    drug_name: 'Azithromycin',
    knowledge_entry_id: 'entry-021',
    connection_type: 'formulation_type',
    context:
      'Azithromycin oral suspension has a bitter taste. Microencapsulation and taste-masking techniques are used to improve palatability for paediatric formulations.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
  // ── Ciprofloxacin ───────────────────────────────────────────
  {
    id: 'dic-029',
    drug_id: 'bundled-038',
    drug_name: 'Ciprofloxacin',
    knowledge_entry_id: 'entry-001',
    connection_type: 'formulation_type',
    context:
      'Ciprofloxacin is manufactured as tablets (250mg, 500mg, 750mg), oral suspension, IV infusion, and ophthalmic preparations. The hydrochloride salt is used in oral formulations.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-030',
    drug_id: 'bundled-038',
    drug_name: 'Ciprofloxacin',
    knowledge_entry_id: 'entry-008',
    connection_type: 'stability_note',
    context:
      'Ciprofloxacin tablets are light-sensitive and should be stored in tight, light-resistant containers. Photodegradation is a concern in clear glass or plastic packaging.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-031',
    drug_id: 'bundled-038',
    drug_name: 'Ciprofloxacin',
    knowledge_entry_id: 'entry-016',
    connection_type: 'manufacturer_info',
    context:
      'Ciprofloxacin is one of the most widely manufactured fluoroquinolones in Kenya. It is produced by Cosmos, Dawa, and several other local manufacturers.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
  // ── Metronidazole ───────────────────────────────────────────
  {
    id: 'dic-032',
    drug_id: 'bundled-045',
    drug_name: 'Metronidazole',
    knowledge_entry_id: 'entry-001',
    connection_type: 'formulation_type',
    context:
      'Metronidazole is manufactured as tablets (200mg, 400mg, 500mg), IV infusion, oral suspension, and topical gel. The bitter taste requires coating or formulation as film-coated tablets.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-033',
    drug_id: 'bundled-045',
    drug_name: 'Metronidazole',
    knowledge_entry_id: 'entry-004',
    connection_type: 'manufacturing_process',
    context:
      'Metronidazole tablets are commonly manufactured by direct compression or wet granulation. The API has good compressibility but poor flow properties, requiring glidant addition.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-034',
    drug_id: 'bundled-045',
    drug_name: 'Metronidazole',
    knowledge_entry_id: 'entry-033',
    connection_type: 'regulatory_note',
    context:
      'Metronidazole is on the WHO Essential Medicines List and the KEML. It is a first-line treatment for amoebiasis and trichomoniasis in Kenya.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
  // ── Doxycycline ─────────────────────────────────────────────
  {
    id: 'dic-035',
    drug_id: 'bundled-035',
    drug_name: 'Doxycycline',
    knowledge_entry_id: 'entry-001',
    connection_type: 'formulation_type',
    context:
      'Doxycycline is available as capsules (100mg), tablets (doxycycline hyclate — soluble form), and oral suspension. Capsules are the most common formulation.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-036',
    drug_id: 'bundled-035',
    drug_name: 'Doxycycline',
    knowledge_entry_id: 'entry-008',
    connection_type: 'stability_note',
    context:
      "Doxycycline capsules are hygroscopic and light-sensitive. Storage in aluminium blister packs in a dry, dark location is essential. In Kenya's humid climate, moisture-resistant packaging is critical.",
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-037',
    drug_id: 'bundled-035',
    drug_name: 'Doxycycline',
    knowledge_entry_id: 'entry-016',
    connection_type: 'manufacturer_info',
    context:
      'Doxycycline is manufactured locally and also imported. It is used for malaria prophylaxis, respiratory infections, and STIs in Kenya.',
    relevance_score: 0.8,
    metadata: {},
    created_at: '2026-08-17',
  },
  // ── Co-trimoxazole ──────────────────────────────────────────
  {
    id: 'dic-038',
    drug_id: 'bundled-044',
    drug_name: 'Co-trimoxazole',
    knowledge_entry_id: 'entry-004',
    connection_type: 'manufacturing_process',
    context:
      'Co-trimoxazole (trimethoprim/sulfamethoxazole) fixed-dose combination tablets are manufactured by wet granulation or direct compression. The 1:5 ratio requires careful blending for content uniformity.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-039',
    drug_id: 'bundled-044',
    drug_name: 'Co-trimoxazole',
    knowledge_entry_id: 'entry-016',
    connection_type: 'manufacturer_info',
    context:
      'Co-trimoxazole is widely manufactured in Kenya and is a critical drug for HIV-positive patients (prophylaxis against opportunistic infections). It is on the KEML.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-040',
    drug_id: 'bundled-044',
    drug_name: 'Co-trimoxazole',
    knowledge_entry_id: 'entry-021',
    connection_type: 'formulation_type',
    context:
      'Co-trimoxazole oral suspension is an essential paediatric formulation. It requires homogenisation to ensure uniform distribution of both active ingredients in the suspension.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
  // ── Gentamicin ──────────────────────────────────────────────
  {
    id: 'dic-041',
    drug_id: 'bundled-028',
    drug_name: 'Gentamicin',
    knowledge_entry_id: 'entry-023',
    connection_type: 'manufacturing_process',
    context:
      'Gentamicin injection is a sterile aqueous solution requiring aseptic manufacturing. It is heat-stable and can be terminally sterilised by autoclaving.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-042',
    drug_id: 'bundled-028',
    drug_name: 'Gentamicin',
    knowledge_entry_id: 'entry-015',
    connection_type: 'storage_requirement',
    context:
      'Gentamicin injection should be stored at 2–8°C (refrigerated) before opening. Multi-dose vials contain preservative and can be stored at room temperature after opening.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
  // ── Vancomycin ──────────────────────────────────────────────
  {
    id: 'dic-043',
    drug_id: 'bundled-023',
    drug_name: 'Vancomycin',
    knowledge_entry_id: 'entry-023',
    connection_type: 'manufacturing_process',
    context:
      'Vancomycin for injection is a sterile lyophilised powder produced by fermentation of Amycolatopsis orientalis. It requires specialised sterile manufacturing and extensive purification.',
    relevance_score: 0.95,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-044',
    drug_id: 'bundled-023',
    drug_name: 'Vancomycin',
    knowledge_entry_id: 'entry-015',
    connection_type: 'storage_requirement',
    context:
      'Vancomycin reconstituted solution is stable for 14 days at 2–8°C. It should be protected from light. Infusion bags should be used within 24 hours.',
    relevance_score: 0.9,
    metadata: {},
    created_at: '2026-08-17',
  },
  // ── Linezolid ───────────────────────────────────────────────
  {
    id: 'dic-045',
    drug_id: 'bundled-025',
    drug_name: 'Linezolid',
    knowledge_entry_id: 'entry-001',
    connection_type: 'formulation_type',
    context:
      'Linezolid is available as tablets (400mg, 600mg), IV infusion, and oral suspension. It is one of the few oxazolidinone antibiotics available.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-046',
    drug_id: 'bundled-025',
    drug_name: 'Linezolid',
    knowledge_entry_id: 'entry-008',
    connection_type: 'stability_note',
    context:
      'Linezolid tablets are stable at controlled room temperature (25°C). The IV infusion should be used within 48 hours. Oral suspension is stable for 21 days after reconstitution.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
  // ── Clindamycin ─────────────────────────────────────────────
  {
    id: 'dic-047',
    drug_id: 'bundled-049',
    drug_name: 'Clindamycin',
    knowledge_entry_id: 'entry-001',
    connection_type: 'formulation_type',
    context:
      'Clindamycin is available as capsules (150mg, 300mg), IV injection, topical gel, and vaginal cream. The phosphate salt is used for parenteral formulations.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-048',
    drug_id: 'bundled-049',
    drug_name: 'Clindamycin',
    knowledge_entry_id: 'entry-032',
    connection_type: 'regulatory_note',
    context:
      'Clindamycin is included in the KEML for serious anaerobic infections and severe community-acquired pneumonia. Due to C. difficile risk, stewardship programmes are important.',
    relevance_score: 0.8,
    metadata: {},
    created_at: '2026-08-17',
  },
  // ── Chloramphenicol ─────────────────────────────────────────
  {
    id: 'dic-049',
    drug_id: 'bundled-050',
    drug_name: 'Chloramphenicol',
    knowledge_entry_id: 'entry-023',
    connection_type: 'manufacturing_process',
    context:
      'Chloramphenicol eye drops and ointment require sterile manufacturing. The API is chemically synthesised and has broad-spectrum activity.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
  {
    id: 'dic-050',
    drug_id: 'bundled-050',
    drug_name: 'Chloramphenicol',
    knowledge_entry_id: 'entry-008',
    connection_type: 'stability_note',
    context:
      'Chloramphenicol eye drops should be stored at 2–8°C after opening and used within 28 days. The palmitate ester (oral suspension) improves taste for paediatric use.',
    relevance_score: 0.85,
    metadata: {},
    created_at: '2026-08-17',
  },
]
