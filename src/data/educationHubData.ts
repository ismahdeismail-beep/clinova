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
    id: 'physio',
    title: 'Medical Physiology',
    description: 'Foundations of human body function and mechanisms.',
    icon: 'Activity',
    color: 'rose',
    units: [
      { id: 'physio-1', title: 'Cell Physiology', description: 'Study of cell functions, transport across membranes, action potentials, and signal transduction.', estimatedHours: 12 },
      { id: 'physio-2', title: 'Cardiovascular Physiology', description: 'Cardiac cycle, hemodynamics, blood pressure regulation, and microcirculation.', estimatedHours: 18 },
      { id: 'physio-3', title: 'Respiratory Physiology', description: 'Mechanics of breathing, pulmonary ventilation, gas transport, ventilation-perfusion matching, and neural regulation of respiration.', estimatedHours: 14 },
      { id: 'physio-4', title: 'Renal & Acid-Base Physiology', description: 'Glomerular filtration, tubular transport, renal clearance, concentration/dilution of urine, and body fluid pH regulation.', estimatedHours: 16 }
    ]
  },
  {
    id: 'anatomy',
    title: 'Human Anatomy',
    description: 'Structural organization of the human body.',
    icon: 'Accessibility',
    color: 'violet',
    units: [
      { id: 'anat-1', title: 'Gross Anatomy of the Thorax', description: 'Thoracic wall, lungs, mediastinum, heart, great vessels, and respiratory mechanics.', estimatedHours: 15 },
      { id: 'anat-2', title: 'Neuroanatomy', description: 'Cerebrum, cerebellum, brainstem, spinal cord, cranial nerves, ventricular system, and sensory/motor pathways.', estimatedHours: 20 },
      { id: 'anat-3', title: 'Musculoskeletal Anatomy', description: 'Structure of skeletal bones, muscle groupings, joint mechanisms, and innervation of upper and lower extremities.', estimatedHours: 18 }
    ]
  },
  {
    id: 'biochem',
    title: 'Biochemistry',
    description: 'Chemical processes within living organisms.',
    icon: 'Dna',
    color: 'indigo',
    units: [
      { id: 'bc-1', title: 'Carbohydrate Metabolism', description: 'Glycolysis, gluconeogenesis, glycogen metabolism, pentose phosphate pathway, and TCA cycle.', estimatedHours: 16 },
      { id: 'bc-2', title: 'Lipid & Amino Acid Metabolism', description: 'Fatty acid synthesis, beta-oxidation, cholesterol metabolism, urea cycle, and amino acid transamination pathways.', estimatedHours: 18 }
    ]
  },
  {
    id: 'pharmchem',
    title: 'Pharmaceutical Chemistry',
    description: 'Design, synthesis, and analysis of drugs.',
    icon: 'FlaskConical',
    color: 'amber',
    units: [
      { id: 'pc-1', title: 'Organic Drug Chemistry', description: 'Functional groups, stereochemistry, electronic configurations, and physicochemical properties affecting drug actions.', estimatedHours: 14 },
      { id: 'pc-2', title: 'Structure-Activity Relationships (SAR)', description: 'Structural optimization, bioisosterism, and SAR analysis of beta-lactams, sulfonamides, and cardiac glycosides.', estimatedHours: 16 }
    ]
  },
  {
    id: 'pharmaceutics',
    title: 'Pharmaceutics',
    description: 'Drug formulation and delivery systems.',
    icon: 'Droplets',
    color: 'teal',
    units: [
      { id: 'pceut-1', title: 'Dosage Form Design', description: 'Formulation principles of tablets, capsules, parenteral injections, ointments, aerosols, and suspensions.', estimatedHours: 15 },
      { id: 'pceut-2', title: 'Biopharmaceutics & Pharmacokinetics', description: 'LADMER process: Liberation, Absorption, Distribution, Metabolism, Excretion, and compartment model kinetics.', estimatedHours: 18 }
    ]
  },
  {
    id: 'pharmacognosy',
    title: 'Pharmacognosy',
    description: 'Medicines derived from natural sources.',
    icon: 'Flame',
    color: 'emerald',
    units: [
      { id: 'pcnosy-1', title: 'Phytochemistry & Alkaloids', description: 'Extraction, purification, and clinical applications of plant alkaloids, glycosides, terpenoids, and flavonoids.', estimatedHours: 14 },
      { id: 'pcnosy-2', title: 'Herbal Medicine & WHO Standards', description: 'Scientific validation, herbal drug interactions, toxicity profiles, and WHO monographs for natural product medicine.', estimatedHours: 12 }
    ]
  },
  {
    id: 'pharmacology',
    title: 'Pharmacology',
    description: 'Drug action and interactions in the body.',
    icon: 'Beaker',
    color: 'indigo',
    units: [
      { id: 'pharm-1', title: 'Autonomic Pharmacology', description: 'Drugs affecting adrenergic, cholinergic, nicotinic, and muscarinic receptors and synaptosomal release pathways.', estimatedHours: 16 },
      { id: 'pharm-2', title: 'Cardiovascular Pharmacology', description: 'Mechanisms of beta-blockers, ACE inhibitors, SGLT2 inhibitors, diuretics, antiarrhythmics, and vasodilators.', estimatedHours: 20 },
      { id: 'pharm-3', title: 'Antimicrobial Pharmacology', description: 'Mechanisms of cell-wall inhibitors, protein-synthesis inhibitors, nucleic acid synthesis inhibitors, and resistance evolution.', estimatedHours: 18 }
    ]
  },
  {
    id: 'clinical_pharm',
    title: 'Clinical Pharmacy & Therapeutics',
    description: 'Rational use of medicines in patient care.',
    icon: 'HeartPulse',
    color: 'red',
    units: [
      { id: 'clin-1', title: 'Cardiovascular Therapeutics', description: 'Evidence-based management of hypertension, ischemic heart disease, heart failure, and dyslipidemia (AHA/ESC standards).', estimatedHours: 22 },
      { id: 'clin-2', title: 'Endocrine Therapeutics', description: 'Pharmacotherapy for Type 1 & 2 Diabetes, thyroid storm, hypothyroidism, adrenal disorders, and insulin regimens.', estimatedHours: 20 },
      { id: 'clin-3', title: 'Infectious Disease Therapeutics', description: 'Rational empiric antibiotic choices for pneumonia, sepsis, malaria, meningitis, and tuberculosis according to national guidelines.', estimatedHours: 24 }
    ]
  },
  {
    id: 'pharm_practice',
    title: 'Pharmacy Practice',
    description: 'Professional roles and dispensing practices.',
    icon: 'BookOpen',
    color: 'blue',
    units: [
      { id: 'prac-1', title: 'Good Dispensing & Pharmacy Law', description: 'Prescription analysis, labeling protocols, cold chain maintenance, and regulations governing controlled substances.', estimatedHours: 14 },
      { id: 'prac-2', title: 'Clinical Counseling & Communication', description: 'Interactive patient consulting, inhaler use education, pediatric liquid dosing, barriers to adherence, and motivational interviewing.', estimatedHours: 12 }
    ]
  },
  {
    id: 'microbio',
    title: 'Pharmaceutical Microbiology',
    description: 'Microorganisms and disease.',
    icon: 'Bug',
    color: 'emerald',
    units: [
      { id: 'micro-1', title: 'Bacterial Physiology & Sterilization', description: 'Gram-positive/negative cell structure, culture techniques, autoclave parameters, and validation of sterilization cycles.', estimatedHours: 15 },
      { id: 'micro-2', title: 'Immunology & Vaccine Development', description: 'Innate vs. adaptive immunity, antigen-antibody interactions, and technology of mRNA, viral vector, and toxoid vaccines.', estimatedHours: 16 }
    ]
  },
  {
    id: 'pathology',
    title: 'Pathology',
    description: 'Nature and causes of disease.',
    icon: 'Skull',
    color: 'rose',
    units: [
      { id: 'path-1', title: 'Cell Injury & Inflammation', description: 'Mechanisms of cell death (necrosis, apoptosis), acute inflammatory mediators, chemotaxis, and chronic tissue healing processes.', estimatedHours: 16 },
      { id: 'path-2', title: 'Neoplastic Mechanisms', description: 'Oncogenes, tumor suppressors, hallmark cellular alterations in cancer, angiogenesis, metastasis, and histology staging.', estimatedHours: 18 }
    ]
  },
  {
    id: 'public_health',
    title: 'Public Health',
    description: 'Epidemiology and community health.',
    icon: 'Heart',
    color: 'emerald',
    units: [
      { id: 'pub-1', title: 'Epidemiology & Biostatistics', description: 'Measures of disease frequency (incidence, prevalence), relative risk, odds ratios, clinical trial designs, and biostatistical tests.', estimatedHours: 15 },
      { id: 'pub-2', title: 'Community Health & Sanitation', description: 'Clean water systems, vectors of infectious disease, vaccine campaign management, and primary healthcare delivery frameworks.', estimatedHours: 14 }
    ]
  },
  {
    id: 'biostats',
    title: 'Research & Biostatistics',
    description: 'Research methods and data analysis.',
    icon: 'Award',
    color: 'sky',
    units: [
      { id: 'stats-1', title: 'Biostatistical Methods', description: 'Hypothesis testing, p-values, confidence intervals, chi-square tests, t-tests, ANOVA, and multivariate regression models.', estimatedHours: 15 }
    ]
  },
  {
    id: 'drug_info',
    title: 'Drug Information',
    description: 'Evaluating literature and providing DI.',
    icon: 'FileText',
    color: 'indigo',
    units: [
      { id: 'di-1', title: 'Literature Evaluation & DI Services', description: 'Analyzing medical journals, identifying publication bias, utilizing tertiary/secondary databases, and writing clinical queries.', estimatedHours: 12 }
    ]
  },
  {
    id: 'cases',
    title: 'Clinical Cases',
    description: 'Simulated patient scenarios.',
    icon: 'Briefcase',
    color: 'orange',
    units: [
      { id: 'cs-1', title: 'Case Analysis Methodologies', description: 'SOAP formatting, identifying actual and potential DTPs, and constructing care plans.', estimatedHours: 10 }
    ]
  },
  {
    id: 'qbank',
    title: 'Question Bank',
    description: 'Practice questions for revision.',
    icon: 'HelpCircle',
    color: 'purple',
    units: [
      { id: 'qb-1', title: 'Clinical MCQ Revision Decks', description: 'High-yield multiple-choice collections covering therapeutics, pharmacology, and law.', estimatedHours: 15 }
    ]
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Spaced repetition decks.',
    icon: 'Layers',
    color: 'pink',
    units: [
      { id: 'fc-1', title: 'Pharmacology Drug Class Recall', description: 'Spaced repetition active-recall flashcards for drug classes and mechanism of actions.', estimatedHours: 12 }
    ]
  },
  {
    id: 'podcasts',
    title: 'Podcasts',
    description: 'Audio learning materials.',
    icon: 'Headphones',
    color: 'cyan',
    units: [
      { id: 'pod-1', title: 'Therapeutics Briefings', description: 'Audio summaries and breakdowns of clinical guidelines and hot pharmacy topics.', estimatedHours: 8 }
    ]
  },
  {
    id: 'past_papers',
    title: 'Past Papers',
    description: 'Previous examination papers.',
    icon: 'FileArchive',
    color: 'slate',
    units: [
      { id: 'pp-1', title: 'Board Exam Preparatory Papers', description: 'Simulated professional board and university past papers for practice.', estimatedHours: 20 }
    ]
  },
  {
    id: 'planner',
    title: 'Study Planner',
    description: 'Organize your revision schedule.',
    icon: 'Calendar',
    color: 'indigo',
    units: [
      { id: 'plan-1', title: 'Study Plan Customizer', description: 'Build structured schedules, track completion, and receive reminders.', estimatedHours: 4 }
    ]
  },
  {
    id: 'ai_tools',
    title: 'AI Study Tools',
    description: 'Generate summaries and quizzes.',
    icon: 'BrainCircuit',
    color: 'fuchsia',
    units: [
      { id: 'ai-1', title: 'Study Material Processor', description: 'AI-driven generation of personalized summaries, tables, flashcards, and quizzes.', estimatedHours: 6 }
    ]
  },
  {
    id: 'bookmarks',
    title: 'Bookmarks',
    description: 'Saved topics and resources.',
    icon: 'Bookmark',
    color: 'amber',
    units: [
      { id: 'bm-1', title: 'Saved Learning Items', description: 'Centralized repository of bookmarked study guides, guidelines, and drug records.', estimatedHours: 2 }
    ]
  },
  {
    id: 'downloads',
    title: 'Downloads',
    description: 'Offline materials.',
    icon: 'Download',
    color: 'teal',
    units: [
      { id: 'dl-1', title: 'Offline Resource Downloader', description: 'Manage offline database assets, local reference PDFs, and cached clinical cases.', estimatedHours: 2 }
    ]
  },
  {
    id: 'activity',
    title: 'Recent Activity',
    description: 'Your learning history.',
    icon: 'History',
    color: 'blue',
    units: [
      { id: 'act-1', title: 'Activity Logs and Analytics', description: 'Analyze your study time across modules, performance trends, and focus metrics.', estimatedHours: 3 }
    ]
  },
  {
    id: 'oral_practice',
    title: 'Oral Practice',
    description: 'Prepare for viva voce examinations, OSCE stations, and ward rounds with real-time timed AI voice practice.',
    icon: 'Mic',
    color: 'fuchsia',
    units: [
      { id: 'op-1', title: 'Vivas & OSCE OSCE Simulations', description: 'Simulated oral practice viva voces, hospital rounds, and OSCE communication stations with real-time feedback.', estimatedHours: 12 }
    ]
  }
];
