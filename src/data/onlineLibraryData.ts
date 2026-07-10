// ================================================================
// Clinova Online Library Data
// Integrated library of textbooks, OERs, guidelines, and companion
// resources relevant to the Brain Tree International Pharmacy
// Curriculum and Kenyan clinical practice.
// ================================================================

// ================================================================
// Library Resource Type
// ================================================================

export interface LibraryResource {
  id: string;
  title: string;
  authors: string;
  edition?: string;
  year: number;
  publisher: string;
  publisherUrl?: string;
  isFree: boolean;
  /** Comma-separated keywords for search matching */
  keywords: string;
  /** Main subject areas this resource covers */
  subjects: string[];
  /** Type of resource */
  type: 'textbook' | 'guideline' | 'oer' | 'reference' | 'companion' | 'handbook' | 'formulary';
  /** Language (default English) */
  language?: string;
}

// ================================================================
// Core Textbook & Resource Collection
// Comprehensive pharmacy/medicine library aligned with the
// Brain Tree International Pharmacy Curriculum and Kenyan practice.
// ================================================================

const LIBRARY: LibraryResource[] = [
  // ---- Pharmacology & Therapeutics (Core) ----
  {
    id: 'lib_katzung',
    title: 'Basic & Clinical Pharmacology',
    authors: 'Bertram G. Katzung, Todd W. Vanderah',
    edition: '16th',
    year: 2024,
    publisher: 'McGraw-Hill',
    publisherUrl: 'https://accessmedicine.mhmedical.com/book.aspx?bookid=3383',
    isFree: false,
    keywords: 'pharmacology, clinical pharmacology, drug action, pharmacokinetics, pharmacodynamics, autonomic, cardiovascular, renal, CNS',
    subjects: ['General Pharmacology', 'Autonomic Pharmacology', 'Cardiovascular Pharmacology', 'CNS Pharmacology', 'Renal Pharmacology'],
    type: 'textbook',
  },
  {
    id: 'lib_goodman',
    title: 'Goodman & Gilman\'s: The Pharmacological Basis of Therapeutics',
    authors: 'Laurence L. Brunton, Randa Hilal-Dandan, Björn C. Knollmann',
    edition: '14th',
    year: 2023,
    publisher: 'McGraw-Hill',
    publisherUrl: 'https://accessmedicine.mhmedical.com/book.aspx?bookid=3190',
    isFree: false,
    keywords: 'pharmacology, therapeutics, drug mechanisms, pharmacokinetics, pharmacodynamics, drug therapy',
    subjects: ['General Pharmacology', 'Clinical Pharmacy', 'Therapeutics'],
    type: 'textbook',
  },
  {
    id: 'lib_rang_dale',
    title: 'Rang and Dale\'s Pharmacology',
    authors: 'Humphrey P. Rang, James M. Ritter, Rod J. Flower, Graeme Henderson',
    edition: '10th',
    year: 2023,
    publisher: 'Elsevier',
    publisherUrl: 'https://www.elsevier.com/books/rang-and-dales-pharmacology/rang/978-0-7020-8099-2',
    isFree: false,
    keywords: 'pharmacology, drug action, receptor theory, drug development, autonomic, cardiovascular, respiratory, endocrine',
    subjects: ['General Pharmacology', 'Autonomic Pharmacology', 'Cardiovascular Pharmacology', 'Respiratory Pharmacology', 'Endocrine Pharmacology'],
    type: 'textbook',
  },
  {
    id: 'lib_whalen',
    title: 'Lippincott\'s Illustrated Reviews: Pharmacology',
    authors: 'Karen Whalen, Sarah W. M. Lee',
    edition: '8th',
    year: 2024,
    publisher: 'Wolters Kluwer',
    publisherUrl: 'https://shop.lww.com/Lippincott-s-Illustrated-Reviews--Pharmacology/p/9781975190872',
    isFree: false,
    keywords: 'pharmacology review, USMLE, illustrated pharmacology, drug mechanisms, autonomic, cardiovascular, CNS, antimicrobial',
    subjects: ['General Pharmacology', 'Autonomic Pharmacology', 'Cardiovascular Pharmacology', 'CNS Pharmacology', 'Chemotherapy & Antimicrobial Pharmacology'],
    type: 'textbook',
  },

  // ---- Clinical Pharmacy & Therapeutics ----
  {
    id: 'lib_dipiro',
    title: 'Pharmacotherapy: A Pathophysiologic Approach',
    authors: 'Joseph T. DiPiro, Robert L. Talbert, Gary C. Yee, Gary R. Matzke, Barbara G. Wells, L. Michael Posey',
    edition: '12th',
    year: 2023,
    publisher: 'McGraw-Hill',
    publisherUrl: 'https://accesspharmacy.mhmedical.com/book.aspx?bookid=3200',
    isFree: false,
    keywords: 'pharmacotherapy, clinical pharmacy, therapeutics, disease management, drug therapy, cardiovascular, respiratory, endocrine, oncology',
    subjects: ['Clinical Pharmacy', 'Cardiovascular Pharmacology', 'Respiratory Pharmacology', 'Endocrine Pharmacology', 'Oncology'],
    type: 'textbook',
  },
  {
    id: 'lib_ktg',
    title: 'Kenya Clinical Guidelines: Management of Common Conditions in Kenya',
    authors: 'Ministry of Health, Kenya',
    edition: '6th',
    year: 2022,
    publisher: 'Ministry of Health, Kenya',
    publisherUrl: 'https://www.health.go.ke/resources/guidelines',
    isFree: true,
    keywords: 'Kenya, clinical guidelines, standard treatment, Kenyan formulary, essential medicines, hypertension, diabetes, malaria, HIV, TB',
    subjects: ['Clinical Pharmacy', 'General Pharmacology', 'All Subjects'],
    type: 'guideline',
  },
  {
    id: 'lib_who_formulary',
    title: 'WHO Model Formulary',
    authors: 'World Health Organization',
    edition: '2023',
    year: 2023,
    publisher: 'WHO',
    publisherUrl: 'https://www.who.int/publications/i/item/WHO-EMP-2023',
    isFree: true,
    keywords: 'WHO, essential medicines, model formulary, drug information, dosing, adverse effects, international nonproprietary names',
    subjects: ['General Pharmacology', 'Clinical Pharmacy', 'All Subjects'],
    type: 'formulary',
  },
  {
    id: 'lib_bnf',
    title: 'British National Formulary (BNF)',
    authors: 'Joint Formulary Committee',
    edition: '87th',
    year: 2024,
    publisher: 'BMJ Group & Pharmaceutical Press',
    publisherUrl: 'https://bnf.nice.org.uk/',
    isFree: true,
    keywords: 'BNF, UK formulary, drug information, dosing, interactions, adverse effects, prescribing, medicines',
    subjects: ['Clinical Pharmacy', 'General Pharmacology'],
    type: 'formulary',
  },

  // ---- Kenyan Pharmacy & Public Health ----
  {
    id: 'lib_kenya_eml',
    title: 'Kenya Essential Medicines List (KEML)',
    authors: 'Ministry of Health, Kenya',
    edition: '2023',
    year: 2023,
    publisher: 'Ministry of Health, Kenya',
    publisherUrl: 'https://www.health.go.ke/resources/essential-medicines',
    isFree: true,
    keywords: 'Kenya, essential medicines, EML, drug list, formulary, procurement, prescribing, Kenyan health system',
    subjects: ['Clinical Pharmacy', 'General Pharmacology', 'Public Health'],
    type: 'reference',
  },
  {
    id: 'lib_pharmacy_kenya',
    title: 'Pharmacy Practice in Kenya: A Comprehensive Guide',
    authors: 'Pharmacy and Poisons Board Kenya',
    edition: '3rd',
    year: 2023,
    publisher: 'Pharmacy and Poisons Board',
    publisherUrl: 'https://pharmacyboardkenya.org/publications',
    isFree: true,
    keywords: 'Kenya, pharmacy practice, pharmaceutical care, dispensing, ethics, regulations, Pharmacy and Poisons Board',
    subjects: ['Clinical Pharmacy', 'General Pharmacology'],
    type: 'reference',
  },
  {
    id: 'lib_kenya_pharmacopoeia',
    title: 'Kenya Pharmacopoeia: Quality Standards for Medicines',
    authors: 'Kenya Bureau of Standards',
    edition: '4th',
    year: 2022,
    publisher: 'KEBS',
    publisherUrl: 'https://www.kebs.org/standards/',
    isFree: false,
    keywords: 'Kenya, pharmacopoeia, quality standards, medicine quality, drug standards, pharmaceutical analysis',
    subjects: ['General Pharmacology', 'Clinical Pharmacy'],
    type: 'reference',
  },

  // ---- Cardiovascular ----
  {
    id: 'lib_esc_guidelines',
    title: 'ESC Clinical Practice Guidelines (Cardiology)',
    authors: 'European Society of Cardiology',
    edition: '2024',
    year: 2024,
    publisher: 'ESC',
    publisherUrl: 'https://www.escardio.org/Guidelines',
    isFree: true,
    keywords: 'ESC, cardiology, hypertension, heart failure, atrial fibrillation, ACS, dyslipidaemia, guidelines, cardiovascular',
    subjects: ['Cardiovascular Pharmacology'],
    type: 'guideline',
  },
  {
    id: 'lib_aha_guidelines',
    title: 'AHA/ACC Clinical Practice Guidelines',
    authors: 'American Heart Association / American College of Cardiology',
    edition: '2024',
    year: 2024,
    publisher: 'AHA/ACC',
    publisherUrl: 'https://www.ahajournals.org/guidelines',
    isFree: true,
    keywords: 'AHA, ACC, cardiovascular, heart disease, stroke, hypertension, cholesterol, guidelines',
    subjects: ['Cardiovascular Pharmacology'],
    type: 'guideline',
  },

  // ---- Respiratory ----
  {
    id: 'lib_gina',
    title: 'Global Initiative for Asthma (GINA) Report',
    authors: 'GINA Science Committee',
    edition: '2024',
    year: 2024,
    publisher: 'GINA',
    publisherUrl: 'https://ginasthma.org/gina-reports/',
    isFree: true,
    keywords: 'asthma, GINA, respiratory, guidelines, inhaler, COPD, management, paediatric asthma',
    subjects: ['Respiratory Pharmacology'],
    type: 'guideline',
  },
  {
    id: 'lib_gold',
    title: 'Global Strategy for the Diagnosis, Management, and Prevention of COPD (GOLD)',
    authors: 'GOLD Science Committee',
    edition: '2024',
    year: 2024,
    publisher: 'GOLD',
    publisherUrl: 'https://goldcopd.org/gold-reports/',
    isFree: true,
    keywords: 'COPD, GOLD, chronic obstructive pulmonary disease, respiratory, guidelines, smoking cessation, pulmonary rehabilitation',
    subjects: ['Respiratory Pharmacology'],
    type: 'guideline',
  },

  // ---- Endocrine & Metabolic ----
  {
    id: 'lib_ada',
    title: 'American Diabetes Association Standards of Care in Diabetes',
    authors: 'American Diabetes Association',
    edition: '2024',
    year: 2024,
    publisher: 'ADA',
    publisherUrl: 'https://diabetesjournals.org/care/issue/47/Supplement_1',
    isFree: true,
    keywords: 'diabetes, ADA, standards of care, type 1 diabetes, type 2 diabetes, insulin, SGLT2i, GLP-1, guidelines',
    subjects: ['Endocrine Pharmacology'],
    type: 'guideline',
  },
  {
    id: 'lib_thyroid',
    title: 'ATA Guidelines for Thyroid Disease Management',
    authors: 'American Thyroid Association',
    edition: '2023',
    year: 2023,
    publisher: 'ATA',
    publisherUrl: 'https://www.thyroid.org/thyroid-guidelines/',
    isFree: true,
    keywords: 'thyroid, hypothyroidism, hyperthyroidism, thyroid nodules, thyroid cancer, ATA guidelines, levothyroxine',
    subjects: ['Endocrine Pharmacology'],
    type: 'guideline',
  },

  // ---- CNS & Pain ----
  {
    id: 'lib_nice_cns',
    title: 'NICE Guidelines: Neurological and Mental Health Conditions',
    authors: 'National Institute for Health and Care Excellence (UK)',
    edition: '2024',
    year: 2024,
    publisher: 'NICE',
    publisherUrl: 'https://www.nice.org.uk/guidance/conditions-and-diseases',
    isFree: true,
    keywords: 'NICE, neurological, mental health, depression, anxiety, epilepsy, Parkinson, dementia, bipolar, schizophrenia, guidelines',
    subjects: ['Central Nervous System Pharmacology', 'Pain & Inflammation'],
    type: 'guideline',
  },
  {
    id: 'lib_who_pain',
    title: 'WHO Guidelines for the Pharmacological Treatment of Pain',
    authors: 'World Health Organization',
    edition: '2023',
    year: 2023,
    publisher: 'WHO',
    publisherUrl: 'https://www.who.int/publications/i/item/9789240077290',
    isFree: true,
    keywords: 'WHO, pain, analgesia, pain ladder, opioids, neuropathic pain, nociceptive pain, cancer pain, palliative care',
    subjects: ['Pain & Inflammation', 'Clinical Pharmacy'],
    type: 'guideline',
  },

  // ---- Infection & Antimicrobial ----
  {
    id: 'lib_sanford',
    title: 'Sanford Guide to Antimicrobial Therapy',
    authors: 'David N. Gilbert, Henry F. Chambers, Michael S. Saag, Andrew T. Pavia, Helen W. Boucher',
    edition: '54th',
    year: 2024,
    publisher: 'Antimicrobial Therapy Inc.',
    publisherUrl: 'https://www.sanfordguide.com/',
    isFree: false,
    keywords: 'antibiotics, antimicrobial therapy, infections, empiric therapy, resistance, dosing, Sanford, ID',
    subjects: ['Chemotherapy & Antimicrobial Pharmacology', 'Clinical Pharmacy'],
    type: 'reference',
  },
  {
    id: 'lib_who_antibiotic',
    title: 'WHO AWaRe Classification of Antibiotics',
    authors: 'World Health Organization',
    edition: '2023',
    year: 2023,
    publisher: 'WHO',
    publisherUrl: 'https://www.who.int/publications/i/item/WHOEMPIAU2023.07',
    isFree: true,
    keywords: 'WHO, AWaRe, antibiotics, antimicrobial stewardship, access, watch, reserve, resistance, Kenya',
    subjects: ['Chemotherapy & Antimicrobial Pharmacology', 'Clinical Pharmacy'],
    type: 'guideline',
  },
  {
    id: 'lib_kenya_tb',
    title: 'Kenya National Tuberculosis Program Guidelines',
    authors: 'Ministry of Health, Kenya, Division of TB & Leprosy',
    edition: '2023',
    year: 2023,
    publisher: 'Ministry of Health, Kenya',
    publisherUrl: 'https://www.nltp.co.ke/guidelines',
    isFree: true,
    keywords: 'Kenya, tuberculosis, TB, DOTS, anti-TB drugs, MDR-TB, HIV-TB, NTBLCP, guidelines',
    subjects: ['Chemotherapy & Antimicrobial Pharmacology', 'Clinical Pharmacy'],
    type: 'guideline',
  },
  {
    id: 'lib_kenya_malaria',
    title: 'Kenya National Malaria Control Programme Guidelines',
    authors: 'Ministry of Health, Kenya, Division of Malaria Control',
    edition: '2023',
    year: 2023,
    publisher: 'Ministry of Health, Kenya',
    publisherUrl: 'https://www.nmcp.or.ke/resources/guidelines',
    isFree: true,
    keywords: 'Kenya, malaria, antimalarials, artemisinin, ACT, malaria diagnosis, prevention, pregnancy, NMCP',
    subjects: ['Chemotherapy & Antimicrobial Pharmacology', 'Clinical Pharmacy'],
    type: 'guideline',
  },
  {
    id: 'lib_kenya_hiv',
    title: 'Kenya HIV Prevention and Treatment Guidelines',
    authors: 'Ministry of Health, Kenya, NASCOP',
    edition: '2022',
    year: 2022,
    publisher: 'Ministry of Health, Kenya',
    publisherUrl: 'https://www.nascop.or.ke/guidelines',
    isFree: true,
    keywords: 'Kenya, HIV, ARV, antiretroviral, ART, prevention, PrEP, PEP, PMTCT, NASCOP, guidelines',
    subjects: ['Chemotherapy & Antimicrobial Pharmacology', 'Clinical Pharmacy'],
    type: 'guideline',
  },

  // ---- Oncology & Chemotherapy ----
  {
    id: 'lib_nccn',
    title: 'NCCN Clinical Practice Guidelines in Oncology',
    authors: 'National Comprehensive Cancer Network',
    edition: '2024',
    year: 2024,
    publisher: 'NCCN',
    publisherUrl: 'https://www.nccn.org/guidelines/category_1',
    isFree: true,
    keywords: 'NCCN, oncology, cancer, chemotherapy, targeted therapy, immunotherapy, breast cancer, lung cancer, guidelines',
    subjects: ['Oncology', 'Chemotherapy & Antimicrobial Pharmacology'],
    type: 'guideline',
  },
  {
    id: 'lib_asco',
    title: 'ASCO Clinical Practice Guidelines',
    authors: 'American Society of Clinical Oncology',
    edition: '2024',
    year: 2024,
    publisher: 'ASCO',
    publisherUrl: 'https://ascopubs.org/guidelines',
    isFree: true,
    keywords: 'ASCO, oncology, cancer care, chemotherapy, survivorship, palliative care, guidelines',
    subjects: ['Oncology'],
    type: 'guideline',
  },

  // ---- Renal & Electrolytes ----
  {
    id: 'lib_kdigo',
    title: 'KDIGO Clinical Practice Guidelines (Nephrology)',
    authors: 'Kidney Disease: Improving Global Outcomes',
    edition: '2024',
    year: 2024,
    publisher: 'KDIGO',
    publisherUrl: 'https://kdigo.org/guidelines/',
    isFree: true,
    keywords: 'KDIGO, nephrology, CKD, acute kidney injury, dialysis, glomerulonephritis, electrolytes, hypertension, guidelines',
    subjects: ['Renal Pharmacology'],
    type: 'guideline',
  },

  // ---- Gastrointestinal & Hepatology ----
  {
    id: 'lib_bsg',
    title: 'BSG Guidelines in Gastroenterology',
    authors: 'British Society of Gastroenterology',
    edition: '2023',
    year: 2023,
    publisher: 'BSG',
    publisherUrl: 'https://www.bsg.org.uk/clinical-guidelines/',
    isFree: true,
    keywords: 'BSG, gastroenterology, GI, liver, IBD, IBS, hepatitis, dyspepsia, PUD, guidelines',
    subjects: ['Gastrointestinal Pharmacology'],
    type: 'guideline',
  },

  // ---- Haematology ----
  {
    id: 'lib_ash',
    title: 'ASH Clinical Practice Guidelines (Haematology)',
    authors: 'American Society of Hematology',
    edition: '2024',
    year: 2024,
    publisher: 'ASH',
    publisherUrl: 'https://www.hematology.org/education/clinicians/guidelines',
    isFree: true,
    keywords: 'ASH, haematology, anaemia, coagulation, thrombosis, anticoagulation, haemophilia, sickle cell, guidelines',
    subjects: ['Hematology'],
    type: 'guideline',
  },

  // ---- Dermatology ----
  {
    id: 'lib_nice_derm',
    title: 'NICE Guidelines: Skin Conditions',
    authors: 'National Institute for Health and Care Excellence (UK)',
    edition: '2024',
    year: 2024,
    publisher: 'NICE',
    publisherUrl: 'https://www.nice.org.uk/guidance/conditions-and-diseases/skin',
    isFree: true,
    keywords: 'NICE, dermatology, skin, eczema, psoriasis, acne, skin cancer, guidelines, topical therapy',
    subjects: ['Dermatology'],
    type: 'guideline',
  },

  // ---- Ophthalmology ----
  {
    id: 'lib_aaoo',
    title: 'American Academy of Ophthalmology Preferred Practice Patterns',
    authors: 'American Academy of Ophthalmology',
    edition: '2023',
    year: 2023,
    publisher: 'AAO',
    publisherUrl: 'https://www.aao.org/guidelines',
    isFree: true,
    keywords: 'AAO, ophthalmology, eye, glaucoma, cataract, conjunctivitis, retinal disease, guidelines',
    subjects: ['Ophthalmology'],
    type: 'guideline',
  },

  // ---- Toxicology ----
  {
    id: 'lib_toxicology',
    title: 'Goldfrank\'s Toxicologic Emergencies',
    authors: 'Robert S. Hoffman, Lewis S. Nelson, Mary Ann Howland, Neal A. Lewin, Silas W. Smith',
    edition: '12th',
    year: 2024,
    publisher: 'McGraw-Hill',
    publisherUrl: 'https://accessemergencymedicine.mhmedical.com/book.aspx?bookid=3223',
    isFree: false,
    keywords: 'toxicology, poisoning, overdose, antidotes, venom, toxic exposure, emergency, clinical toxicology',
    subjects: ['Toxicology'],
    type: 'textbook',
  },
  {
    id: 'lib_kenya_poison',
    title: 'Kenya Poisoning Management Guidelines',
    authors: 'Ministry of Health, Kenya',
    edition: '2022',
    year: 2022,
    publisher: 'Ministry of Health, Kenya',
    publisherUrl: 'https://www.health.go.ke/resources/poisoning-guidelines',
    isFree: true,
    keywords: 'Kenya, poisoning, toxicology, organophosphate, snake bite, pesticide, antidote, emergency, guidelines',
    subjects: ['Toxicology'],
    type: 'guideline',
  },

  // ---- Open Educational Resources (OERs) ----
  {
    id: 'lib_oer_pharma1',
    title: 'Open Textbook of Pharmacology (BCcampus)',
    authors: 'BCcampus Open Education',
    edition: '1st',
    year: 2023,
    publisher: 'BCcampus',
    publisherUrl: 'https://open.bccampus.ca/browse-our-collection/',
    isFree: true,
    keywords: 'OER, open textbook, pharmacology, free, BCcampus, drug action, pharmacokinetics',
    subjects: ['General Pharmacology'],
    type: 'oer',
  },
  {
    id: 'lib_oer_ncbi',
    title: 'NCBI Bookshelf: Pharmacology & Toxicology',
    authors: 'National Center for Biotechnology Information',
    edition: 'Online',
    year: 2024,
    publisher: 'NCBI / NLM / NIH',
    publisherUrl: 'https://www.ncbi.nlm.nih.gov/books/',
    isFree: true,
    keywords: 'NCBI, bookshelf, pharmacology, toxicology, free, online, textbooks, reference, PubMed',
    subjects: ['General Pharmacology', 'Toxicology', 'All Subjects'],
    type: 'oer',
  },
  {
    id: 'lib_oer_merck',
    title: 'Merck Manual: Professional Edition',
    authors: 'Merck Publishing',
    edition: 'Online',
    year: 2024,
    publisher: 'Merck & Co.',
    publisherUrl: 'https://www.merckmanuals.com/professional',
    isFree: true,
    keywords: 'Merck manual, medical reference, free, online, diagnosis, treatment, clinical pharmacology',
    subjects: ['All Subjects', 'Clinical Pharmacy'],
    type: 'reference',
  },

  // ---- Clinical Pharmacy & Pharmaceutical Care ----
  {
    id: 'lib_pharm_care',
    title: 'Pharmaceutical Care Practice: The Patient-Centered Approach to Medication Management',
    authors: 'Robert J. Cipolle, Linda M. Strand, Peter C. Morley',
    edition: '4th',
    year: 2023,
    publisher: 'McGraw-Hill',
    publisherUrl: 'https://accesspharmacy.mhmedical.com/book.aspx?bookid=3188',
    isFree: false,
    keywords: 'pharmaceutical care, medication therapy management, patient-centred, clinical pharmacy, drug therapy problems',
    subjects: ['Clinical Pharmacy'],
    type: 'textbook',
  },
  {
    id: 'lib_drug_interactions',
    title: 'Drug Interaction Facts: The Authority on Drug Interactions',
    authors: 'David S. Tatro',
    edition: '2024',
    year: 2024,
    publisher: 'Wolters Kluwer',
    publisherUrl: 'https://www.wolterskluwer.com/en/solutions/drug-interaction-facts',
    isFree: false,
    keywords: 'drug interactions, adverse reactions, pharmacokinetics, polypharmacy, clinical pharmacy, safety',
    subjects: ['Clinical Pharmacy', 'General Pharmacology'],
    type: 'reference',
  },

  // ---- Curriculum & Education ----
  {
    id: 'lib_brain_tree',
    title: 'Brain Tree International Pharmacy Curriculum',
    authors: 'Brain Tree International',
    edition: '2024',
    year: 2024,
    publisher: 'Brain Tree International',
    publisherUrl: 'https://www.braintreeinternational.com',
    isFree: true,
    keywords: 'Brain Tree, curriculum, pharmacy education, integrated pharmacotherapy, learning objectives, Kenyan curriculum',
    subjects: ['All Subjects'],
    type: 'reference',
  },
  {
    id: 'lib_pharmacotherapy_review',
    title: 'Pharmacotherapy Review and Assessment',
    authors: 'Karen R. Sando, Terry L. Schwinghammer',
    edition: '4th',
    year: 2023,
    publisher: 'McGraw-Hill',
    publisherUrl: 'https://accesspharmacy.mhmedical.com/book.aspx?bookid=3211',
    isFree: false,
    keywords: 'pharmacotherapy review, cases, assessment, board exam, clinical pharmacy, therapeutics, NAPLEX',
    subjects: ['Clinical Pharmacy', 'All Subjects'],
    type: 'textbook',
  },

  // ---- Pharmacokinetics ----
  {
    id: 'lib_shargel',
    title: 'Applied Biopharmaceutics & Pharmacokinetics',
    authors: 'Leon Shargel, Susanna Wu-Pong, Andrew B. C. Yu',
    edition: '8th',
    year: 2023,
    publisher: 'McGraw-Hill',
    publisherUrl: 'https://accesspharmacy.mhmedical.com/book.aspx?bookid=3193',
    isFree: false,
    keywords: 'pharmacokinetics, biopharmaceutics, ADME, drug absorption, distribution, metabolism, excretion, clinical PK',
    subjects: ['General Pharmacology', 'Clinical Pharmacy'],
    type: 'textbook',
  },
  {
    id: 'lib_winter',
    title: 'Basic Clinical Pharmacokinetics',
    authors: 'Michael E. Winter',
    edition: '6th',
    year: 2023,
    publisher: 'Wolters Kluwer',
    publisherUrl: 'https://shop.lww.com/Basic-Clinical-Pharmacokinetics/p/9781975170966',
    isFree: false,
    keywords: 'clinical pharmacokinetics, therapeutic drug monitoring, TDM, vancomycin, aminoglycosides, phenytoin, dosing',
    subjects: ['Clinical Pharmacy', 'General Pharmacology'],
    type: 'textbook',
  },
];

// ================================================================
// Search Library Function
// Used by skills to find relevant resources from the library
// ================================================================

export function searchLibrary(
  query: string,
  options: {
    subjects?: string[];
    types?: LibraryResource['type'][];
    freeOnly?: boolean;
    maxResults?: number;
  } = {},
): LibraryResource[] {
  const { subjects, types, freeOnly, maxResults } = options;

  const q = query.toLowerCase();

  // Score each resource against the query
  const scored = LIBRARY.map((resource) => {
    let score = 0;

    // Keyword match
    const keywords = resource.keywords.toLowerCase();
    const queryTerms = q.split(/\s+/).filter((t) => t.length > 2);

    for (const term of queryTerms) {
      if (keywords.includes(term)) {
        score += 2;
      }
      if (resource.title.toLowerCase().includes(term)) {
        score += 3;
      }
      if (resource.subjects.some((s) => s.toLowerCase().includes(term))) {
        score += 2;
      }
    }

    // Exact phrase match gets bonus
    if (keywords.includes(q)) score += 5;

    // Apply filters
    if (subjects && !resource.subjects.some((s) => subjects.includes(s))) {
      score = 0;
    }
    if (types && !types.includes(resource.type)) {
      score = 0;
    }
    if (freeOnly && !resource.isFree) {
      score = 0;
    }

    return { resource, score };
  });

  // Sort by score descending, filter out zero scores
  const results = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults ?? 10)
    .map((s) => s.resource);

  return results;
}

// ================================================================
// Utility: Get all subjects covered by the library
// ================================================================

export function getLibrarySubjects(): string[] {
  const subjects = new Set<string>();
  for (const r of LIBRARY) {
    for (const s of r.subjects) {
      subjects.add(s);
    }
  }
  return Array.from(subjects).sort();
}

// ================================================================
// Utility: Get resources by type
// ================================================================

export function getResourcesByType(type: LibraryResource['type']): LibraryResource[] {
  return LIBRARY.filter((r) => r.type === type);
}

// ================================================================
// Library statistics
// ================================================================

export const LIBRARY_RESOURCE_COUNT = LIBRARY.length;
export const FREE_RESOURCE_COUNT = LIBRARY.filter((r) => r.isFree).length;
