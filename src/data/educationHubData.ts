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
      { id: 'physio-1', title: 'Cell Physiology', description: 'Study of cell functions and processes.', estimatedHours: 12 },
      { id: 'physio-2', title: 'Cardiovascular Physiology', description: 'Heart and circulatory system.', estimatedHours: 18 }
    ]
  },
  {
    id: 'anatomy',
    title: 'Human Anatomy',
    description: 'Structural organization of the human body.',
    icon: 'Accessibility',
    color: 'violet',
    units: [
      { id: 'anat-1', title: 'Gross Anatomy of the Thorax', description: 'Thoracic cavity structures.', estimatedHours: 15 },
      { id: 'anat-2', title: 'Neuroanatomy', description: 'Structure of the nervous system.', estimatedHours: 20 }
    ]
  },
  {
    id: 'biochem',
    title: 'Biochemistry',
    description: 'Chemical processes within living organisms.',
    icon: 'Dna',
    color: 'indigo',
    units: [
      { id: 'bc-1', title: 'Carbohydrate Metabolism', description: 'Glycolysis, Krebs cycle, and gluconeogenesis.', estimatedHours: 16 }
    ]
  },
  {
    id: 'pharmchem',
    title: 'Pharmaceutical Chemistry',
    description: 'Design, synthesis, and analysis of drugs.',
    icon: 'FlaskConical',
    color: 'amber',
    units: [
      { id: 'pc-1', title: 'Organic Drug Chemistry', description: 'Functional groups and drug interactions.', estimatedHours: 14 }
    ]
  },
  {
    id: 'pharmaceutics',
    title: 'Pharmaceutics',
    description: 'Drug formulation and delivery systems.',
    icon: 'Droplets',
    color: 'teal',
    units: [
      { id: 'pceut-1', title: 'Dosage Form Design', description: 'Principles of formulation.', estimatedHours: 15 }
    ]
  },
  {
    id: 'pharmacognosy',
    title: 'Pharmacognosy',
    description: 'Medicines derived from natural sources.',
    icon: 'Flame',
    color: 'emerald',
    units: []
  },
  {
    id: 'pharmacology',
    title: 'Pharmacology',
    description: 'Drug action and interactions in the body.',
    icon: 'Beaker',
    color: 'indigo',
    units: [
      { id: 'pharm-1', title: 'Autonomic Pharmacology', description: 'Drugs affecting the sympathetic and parasympathetic systems.', estimatedHours: 16 },
      { id: 'pharm-2', title: 'Cardiovascular Pharmacology', description: 'Antihypertensives, antiarrhythmics.', estimatedHours: 20 }
    ]
  },
  {
    id: 'clinical_pharm',
    title: 'Clinical Pharmacy & Therapeutics',
    description: 'Rational use of medicines in patient care.',
    icon: 'HeartPulse',
    color: 'red',
    units: []
  },
  {
    id: 'pharm_practice',
    title: 'Pharmacy Practice',
    description: 'Professional roles and dispensing practices.',
    icon: 'BookOpen',
    color: 'blue',
    units: []
  },
  {
    id: 'microbio',
    title: 'Pharmaceutical Microbiology',
    description: 'Microorganisms and disease.',
    icon: 'Bug',
    color: 'emerald',
    units: []
  },
  {
    id: 'pathology',
    title: 'Pathology',
    description: 'Nature and causes of disease.',
    icon: 'Skull',
    color: 'rose',
    units: []
  },
  {
    id: 'public_health',
    title: 'Public Health',
    description: 'Epidemiology and community health.',
    icon: 'Heart',
    color: 'emerald',
    units: []
  },
  {
    id: 'biostats',
    title: 'Research & Biostatistics',
    description: 'Research methods and data analysis.',
    icon: 'Award',
    color: 'sky',
    units: []
  },
  {
    id: 'drug_info',
    title: 'Drug Information',
    description: 'Evaluating literature and providing DI.',
    icon: 'FileText',
    color: 'indigo',
    units: []
  },
  {
    id: 'cases',
    title: 'Clinical Cases',
    description: 'Simulated patient scenarios.',
    icon: 'Briefcase',
    color: 'orange',
    units: []
  },
  {
    id: 'qbank',
    title: 'Question Bank',
    description: 'Practice questions for revision.',
    icon: 'HelpCircle',
    color: 'purple',
    units: []
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Spaced repetition decks.',
    icon: 'Layers',
    color: 'pink',
    units: []
  },
  {
    id: 'podcasts',
    title: 'Podcasts',
    description: 'Audio learning materials.',
    icon: 'Headphones',
    color: 'cyan',
    units: []
  },
  {
    id: 'past_papers',
    title: 'Past Papers',
    description: 'Previous examination papers.',
    icon: 'FileArchive',
    color: 'slate',
    units: []
  },
  {
    id: 'planner',
    title: 'Study Planner',
    description: 'Organize your revision schedule.',
    icon: 'Calendar',
    color: 'indigo',
    units: []
  },
  {
    id: 'ai_tools',
    title: 'AI Study Tools',
    description: 'Generate summaries and quizzes.',
    icon: 'BrainCircuit',
    color: 'fuchsia',
    units: []
  },
  {
    id: 'bookmarks',
    title: 'Bookmarks',
    description: 'Saved topics and resources.',
    icon: 'Bookmark',
    color: 'amber',
    units: []
  },
  {
    id: 'downloads',
    title: 'Downloads',
    description: 'Offline materials.',
    icon: 'Download',
    color: 'teal',
    units: []
  },
  {
    id: 'activity',
    title: 'Recent Activity',
    description: 'Your learning history.',
    icon: 'History',
    color: 'blue',
    units: []
  },
  {
    id: 'oral_practice',
    title: 'Oral Practice',
    description: 'Prepare for viva voce examinations, OSCE stations, and ward rounds with real-time timed AI voice practice.',
    icon: 'Mic',
    color: 'fuchsia',
    units: []
  }
];
