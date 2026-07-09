export interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  units: LearningUnit[];
}

export interface LearningUnit {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
}

export const MODULES: LearningModule[] = [
  {
    id: 'pharmacology',
    title: 'Pharmacology',
    description: 'Drug mechanisms, kinetics, dynamics, and toxicology.',
    icon: 'Beaker',
    color: 'indigo',
    units: [
      { id: 'pharm-intro', title: 'Introduction to Pharmacology', description: 'Basic principles of drug action and discovery.', estimatedHours: 4 },
      { id: 'pharm-gen', title: 'General Pharmacology', description: 'Receptors, dose-response, and signaling pathways.', estimatedHours: 8 },
      { id: 'pharm-pk', title: 'Pharmacokinetics', description: 'Absorption, Distribution, Metabolism, and Excretion (ADME).', estimatedHours: 12 },
      { id: 'pharm-pd', title: 'Pharmacodynamics', description: 'Drug-receptor interactions and mechanisms of effect.', estimatedHours: 10 },
      { id: 'pharm-auto', title: 'Autonomic Pharmacology', description: 'Sympathetic and parasympathetic nervous system drugs.', estimatedHours: 14 },
      { id: 'pharm-cv', title: 'Cardiovascular Pharmacology', description: 'Anti-hypertensives, antiarrhythmics, and heart failure drugs.', estimatedHours: 18 },
      { id: 'pharm-renal', title: 'Renal Pharmacology', description: 'Diuretics and drugs affecting fluid/electrolyte balance.', estimatedHours: 10 },
      { id: 'pharm-resp', title: 'Respiratory Pharmacology', description: 'Bronchodilators, anti-inflammatories, and asthma/COPD drugs.', estimatedHours: 12 },
      { id: 'pharm-gi', title: 'Gastrointestinal Pharmacology', description: 'Antacids, antiemetics, laxatives, and prokinetics.', estimatedHours: 10 },
      { id: 'pharm-endo', title: 'Endocrine Pharmacology', description: 'Insulin, oral hypoglycemics, thyroid drugs, and corticosteroids.', estimatedHours: 16 },
      { id: 'pharm-vit', title: 'Vitamins & Minerals', description: 'Therapeutic uses and deficiencies of essential nutrients.', estimatedHours: 6 },
      { id: 'pharm-cns', title: 'Central Nervous System Pharmacology', description: 'Antidepressants, antipsychotics, anxiolytics, and anesthetics.', estimatedHours: 20 },
      { id: 'pharm-chemo', title: 'Chemotherapy', description: 'Principles of antimicrobial and antineoplastic therapy.', estimatedHours: 8 },
      { id: 'pharm-anti', title: 'Antimicrobial Pharmacology', description: 'Antibiotics, antivirals, antifungals, and antiparasitics.', estimatedHours: 24 },
      { id: 'pharm-tox', title: 'Toxicology', description: 'Principles of poisoning, antidotes, and environmental toxins.', estimatedHours: 12 },
      { id: 'pharm-onc', title: 'Oncology Pharmacology', description: 'Targeted therapies, immunotherapies, and traditional cytotoxics.', estimatedHours: 16 },
      { id: 'pharm-derm', title: 'Dermatological Pharmacology', description: 'Topical agents, acne treatments, and immunosuppressants.', estimatedHours: 8 },
      { id: 'pharm-ophth', title: 'Ophthalmic Pharmacology', description: 'Glaucoma drops, mydriatics, and ocular therapeutics.', estimatedHours: 6 },
      { id: 'pharm-vet', title: 'Veterinary Pharmacology', description: 'Cross-species pharmacology and animal therapeutics.', estimatedHours: 5 }
    ]
  },
  {
    id: 'clinical_pharm',
    title: 'Clinical Pharmacy & Therapeutics',
    description: 'Disease management, patient care, and rational prescribing.',
    icon: 'HeartPulse',
    color: 'red',
    units: [
      { id: 'cp-intro', title: 'Introduction to Clinical Pharmacy', description: 'Roles of the clinical pharmacist and pharmaceutical care.', estimatedHours: 5 },
      { id: 'cp-cv', title: 'Cardiovascular Disorders', description: 'Hypertension, heart failure, ischemic heart disease, and arrhythmias.', estimatedHours: 25 },
      { id: 'cp-endo', title: 'Endocrine Disorders', description: 'Diabetes mellitus, thyroid disorders, and adrenal insufficiency.', estimatedHours: 18 },
      { id: 'cp-resp', title: 'Respiratory Disorders', description: 'Asthma, COPD, and allergic rhinitis.', estimatedHours: 15 },
      { id: 'cp-gi', title: 'Gastrointestinal Disorders', description: 'PUD, GERD, IBD, and liver cirrhosis.', estimatedHours: 16 },
      { id: 'cp-renal', title: 'Renal Disorders', description: 'Acute kidney injury and chronic kidney disease.', estimatedHours: 14 },
      { id: 'cp-neuro', title: 'Neurological Disorders', description: 'Epilepsy, Parkinson\'s, Alzheimer\'s, and pain management.', estimatedHours: 20 },
      { id: 'cp-id', title: 'Infectious Diseases', description: 'Pneumonia, UTI, meningitis, HIV/AIDS, and tuberculosis.', estimatedHours: 30 },
      { id: 'cp-onc', title: 'Oncology', description: 'Breast cancer, lung cancer, leukemia, and supportive care.', estimatedHours: 22 },
      { id: 'cp-hem', title: 'Hematology', description: 'Anemias, coagulopathies, and venous thromboembolism.', estimatedHours: 12 },
      { id: 'cp-psych', title: 'Psychiatry', description: 'Depression, schizophrenia, bipolar disorder, and anxiety.', estimatedHours: 18 },
      { id: 'cp-peds', title: 'Pediatrics', description: 'Neonatal intensive care, pediatric dosing, and immunizations.', estimatedHours: 15 },
      { id: 'cp-obgyn', title: 'Obstetrics & Gynecology', description: 'Pregnancy, contraception, and menopause management.', estimatedHours: 14 },
      { id: 'cp-em', title: 'Emergency Medicine', description: 'ACLS, toxicology, trauma, and hypertensive crises.', estimatedHours: 20 },
      { id: 'cp-cc', title: 'Critical Care', description: 'Sepsis, shock, sedation, and mechanical ventilation.', estimatedHours: 22 },
      { id: 'cp-ger', title: 'Geriatrics', description: 'Polypharmacy, altered pharmacokinetics, and Beers criteria.', estimatedHours: 10 },
      { id: 'cp-tdm', title: 'Therapeutic Drug Monitoring', description: 'Clinical pharmacokinetics of narrow therapeutic index drugs.', estimatedHours: 15 },
      { id: 'cp-couns', title: 'Patient Counselling', description: 'Communication skills and medication adherence strategies.', estimatedHours: 10 },
      { id: 'cp-safety', title: 'Medication Safety', description: 'Error prevention, pharmacovigilance, and root cause analysis.', estimatedHours: 12 },
      { id: 'cp-pharmcare', title: 'Pharmaceutical Care', description: 'Comprehensive medication management and care planning.', estimatedHours: 8 }
    ]
  },
  {
    id: 'cases',
    title: 'Clinical Cases',
    description: 'Integrated patient cases for therapeutic areas.',
    icon: 'Briefcase',
    color: 'orange',
    units: [
      { id: 'cc-cv', title: 'Cardiovascular Cases', description: 'Interactive cases on hypertension, heart failure, and ischemic heart disease.', estimatedHours: 15 },
      { id: 'cc-endo', title: 'Endocrine Cases', description: 'Interactive cases on diabetes, thyroid, and adrenal disorders.', estimatedHours: 12 },
      { id: 'cc-resp', title: 'Respiratory Cases', description: 'Interactive cases on asthma, COPD, and allergic rhinitis.', estimatedHours: 10 },
      { id: 'cc-gi', title: 'Gastrointestinal Cases', description: 'Interactive cases on PUD, IBD, and liver cirrhosis.', estimatedHours: 10 },
      { id: 'cc-renal', title: 'Renal Cases', description: 'Interactive cases on AKI and CKD management.', estimatedHours: 10 },
      { id: 'cc-neuro', title: 'Neurological Cases', description: 'Interactive cases on epilepsy, stroke, and Parkinson\'s disease.', estimatedHours: 12 },
      { id: 'cc-id', title: 'Infectious Disease Cases', description: 'Interactive cases on meningitis, pneumonia, and HIV.', estimatedHours: 18 },
      { id: 'cc-onc', title: 'Oncology Cases', description: 'Interactive cases on solid tumors and hematological malignancies.', estimatedHours: 14 },
      { id: 'cc-hem', title: 'Hematology Cases', description: 'Interactive cases on anemia and anticoagulation.', estimatedHours: 10 },
      { id: 'cc-psych', title: 'Psychiatry Cases', description: 'Interactive cases on depression, bipolar, and schizophrenia.', estimatedHours: 12 },
      { id: 'cc-peds', title: 'Pediatric Cases', description: 'Interactive cases on neonatal care and childhood infections.', estimatedHours: 10 },
      { id: 'cc-obgyn', title: 'Obstetrics & Gynecology Cases', description: 'Interactive cases on preeclampsia, pregnancy, and contraception.', estimatedHours: 10 },
      { id: 'cc-em', title: 'Critical Care & Emergency Cases', description: 'Interactive cases on sepsis, trauma, and toxicology.', estimatedHours: 15 }
    ]
  },
  {
    id: 'drug_info',
    title: 'Drug Information & Guidelines',
    description: 'Clinical guidelines, monographs, and evidence.',
    icon: 'FileText',
    color: 'teal',
    units: [
      { id: 'di-guidelines', title: 'Clinical Guidelines', description: 'Latest WHO, AHA, IDSA, and national therapeutic guidelines.', estimatedHours: 20 },
      { id: 'di-monographs', title: 'Drug Monographs', description: 'Detailed prescribing information, adverse effects, and interactions.', estimatedHours: 25 },
      { id: 'di-formulary', title: 'Formulary Management', description: 'Pharmacy and Therapeutics (P&T) committee processes and drug selection.', estimatedHours: 10 }
    ]
  },
  {
    id: 'ebm',
    title: 'Evidence-Based Medicine',
    description: 'Research methods, biostatistics, and critical appraisal.',
    icon: 'Search',
    color: 'sky',
    units: [
      { id: 'ebm-research', title: 'Research Methods', description: 'Study designs, clinical trials, and epidemiological studies.', estimatedHours: 15 },
      { id: 'ebm-biostats', title: 'Biostatistics', description: 'Statistical testing, p-values, confidence intervals, and regression.', estimatedHours: 20 },
      { id: 'ebm-literature', title: 'Literature Evaluation', description: 'Critical appraisal of journal articles and identifying bias.', estimatedHours: 12 },
      { id: 'ebm-trials', title: 'Clinical Trials', description: 'Phases of drug development and regulatory approval processes.', estimatedHours: 10 }
    ]
  },
  {
    id: 'supporting',
    title: 'Supporting Sciences',
    description: 'Foundational sciences for pharmacy and medicine.',
    icon: 'FlaskConical',
    color: 'emerald',
    units: [
      { id: 'sup-anat', title: 'Anatomy', description: 'Gross anatomy, neuroanatomy, and histology.', estimatedHours: 30 },
      { id: 'sup-phys', title: 'Physiology', description: 'Human body systems and homeostatic mechanisms.', estimatedHours: 35 },
      { id: 'sup-biochem', title: 'Biochemistry', description: 'Metabolism, enzymology, and molecular biology.', estimatedHours: 30 },
      { id: 'sup-path', title: 'Pathology', description: 'Cell injury, inflammation, and systemic disease processes.', estimatedHours: 25 },
      { id: 'sup-micro', title: 'Microbiology', description: 'Bacteriology, virology, mycology, and parasitology.', estimatedHours: 25 },
      { id: 'sup-immuno', title: 'Immunology', description: 'Innate and adaptive immunity, hypersensitivity, and vaccines.', estimatedHours: 15 },
      { id: 'sup-medchem', title: 'Medicinal Chemistry', description: 'Drug design, SAR, and targets.', estimatedHours: 25 },
      { id: 'sup-pharmchem', title: 'Pharmaceutical Chemistry', description: 'Analytical techniques and quality control.', estimatedHours: 20 },
      { id: 'sup-orgchem', title: 'Organic Chemistry', description: 'Reaction mechanisms and functional groups.', estimatedHours: 25 },
      { id: 'sup-pharmanal', title: 'Pharmaceutical Analysis', description: 'Spectroscopy and chromatography.', estimatedHours: 20 },
      { id: 'sup-pharmaceutics', title: 'Pharmaceutics', description: 'Dosage forms and biopharmaceutics.', estimatedHours: 30 },
      { id: 'sup-pharmacog', title: 'Pharmacognosy', description: 'Natural products and herbal medicines.', estimatedHours: 15 },
      { id: 'sup-pubhealth', title: 'Public Health', description: 'Epidemiology, health systems, and disease prevention.', estimatedHours: 15 }
    ]
  },
  {
    id: 'tools',
    title: 'Study & AI Tools',
    description: 'Flashcards, Q-banks, Oral Practice, and Planning.',
    icon: 'BrainCircuit',
    color: 'fuchsia',
    units: [
      { id: 'tool-qbank', title: 'Question Bank', description: 'MCQs and practice exams for all subjects.', estimatedHours: 30 },
      { id: 'tool-flashcards', title: 'Spaced Repetition Flashcards', description: 'Active recall decks for pharmacology and therapeutics.', estimatedHours: 20 },
      { id: 'tool-oral', title: 'Oral Practice (OSCE)', description: 'AI-driven voice practice for clinical encounters and vivas.', estimatedHours: 15 },
      { id: 'tool-podcasts', title: 'Podcasts & Audio', description: 'Audio summaries of clinical topics and guidelines.', estimatedHours: 10 },
      { id: 'tool-papers', title: 'Past Papers', description: 'Historical board and university examination papers.', estimatedHours: 15 },
      { id: 'tool-planner', title: 'AI Study Planner', description: 'Generate personalized study schedules and track progress.', estimatedHours: 5 },
      { id: 'tool-saved', title: 'Downloads & Bookmarks', description: 'Access saved resources, PDFs, and offline content.', estimatedHours: 2 }
    ]
  }
];
