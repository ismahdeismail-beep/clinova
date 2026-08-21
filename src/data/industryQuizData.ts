import type { IndustryDifficulty } from '../types/knowledge'

export interface IndustryQuizQuestion {
  id: string
  topic_slug: string
  category: string
  type: 'mcq' | 'clinical_scenario' | 'true_false'
  difficulty: IndustryDifficulty
  question: string
  options: string[]
  correct_answer: number
  explanation: string
  source?: string
}

export const BUNDLED_INDUSTRY_QUIZ: IndustryQuizQuestion[] = [
  // ── Manufacturing & Formulation ──────────────────────────────
  {
    id: 'quiz-001',
    topic_slug: 'tablets',
    category: 'Manufacturing',
    type: 'mcq',
    difficulty: 'basic',
    question:
      'Which manufacturing process is most suitable for a drug substance with excellent compressibility and flow properties?',
    options: [
      'Wet granulation',
      'Dry granulation (roller compaction)',
      'Direct compression',
      'Hot melt extrusion',
    ],
    correct_answer: 2,
    explanation:
      'Direct compression is the preferred method when the API has good compressibility and flow characteristics. It eliminates the granulation step, reducing processing time, equipment needs, and cost. Paracetamol is a classic example of a drug manufactured by direct compression in Kenya.',
    source: 'Remington: The Science and Practice of Pharmacy',
  },
  {
    id: 'quiz-002',
    topic_slug: 'wet-granulation',
    category: 'Manufacturing',
    type: 'mcq',
    difficulty: 'intermediate',
    question:
      'In wet granulation, what is the primary purpose of the binder solution?',
    options: [
      'To improve the dissolution rate of the API',
      'To bind particles together into granules for improved flow and compressibility',
      'To act as a preservative during storage',
      'To enhance the bioavailability of the drug',
    ],
    correct_answer: 1,
    explanation:
      'The binder solution (e.g., PVP in water, HPMC solution) wets the powder particles and creates liquid bridges that, upon drying, form solid bridges binding particles into granules. This improves flow properties, compressibility, and content uniformity.',
    source: 'Industrial Pharmacy, Lachman & Lieberman',
  },
  {
    id: 'quiz-003',
    topic_slug: 'capsules',
    category: 'Manufacturing',
    type: 'mcq',
    difficulty: 'basic',
    question:
      'What is the maximum moisture content typically allowed for hard gelatin capsules during manufacturing?',
    options: [
      '1–2%',
      '5–8%',
      '10–12%',
      '15–20%',
    ],
    correct_answer: 0,
    explanation:
      'Hard gelatin capsules are hygroscopic and must be manufactured and stored at low humidity. The moisture content is typically maintained at 1–2% to prevent brittleness (too dry) or softening/sticking (too wet). Gelatin capsules require storage below 25°C and 60% RH.',
    source: 'Pharmaceutical Capsule Dosage Forms, Eli Lilly',
  },
  {
    id: 'quiz-004',
    topic_slug: 'stability-testing',
    category: 'Quality',
    type: 'mcq',
    difficulty: 'intermediate',
    question:
      'According to ICH Q1A(R2), what are the conditions for long-term stability testing for Zone II (tropical) climates?',
    options: [
      '25°C ± 2°C / 60% RH ± 5% RH',
      '30°C ± 2°C / 65% RH ± 5% RH',
      '30°C ± 2°C / 75% RH ± 5% RH',
      '25°C ± 2°C / 75% RH ± 5% RH',
    ],
    correct_answer: 2,
    explanation:
      'Zone II (tropical) climate uses 30°C ± 2°C / 75% RH ± 5% RH for long-term testing. This is relevant for Kenya and other tropical countries. The standard Zone IIa conditions (25°C/60% RH) apply to subtropical climates. Zone IVa (30°C/65% RH) is for hot/dry regions.',
    source: 'ICH Q1A(R2) Stability Testing',
  },
  {
    id: 'quiz-005',
    topic_slug: 'gmp',
    category: 'Quality',
    type: 'mcq',
    difficulty: 'basic',
    question:
      'What does GMP stand for and what is its primary purpose?',
    options: [
      'General Manufacturing Practices — to standardize production costs',
      'Good Manufacturing Practices — to ensure products are consistently produced and controlled to quality standards',
      'Good Marketing Practices — to promote pharmaceutical products',
      'General Management Procedures — to manage factory workforce',
    ],
    correct_answer: 1,
    explanation:
      'Good Manufacturing Practices (GMP) are guidelines that ensure pharmaceutical products are consistently produced and controlled according to quality standards. GMP covers all aspects of production from raw materials, premises, and equipment to the training and hygiene of staff.',
    source: 'WHO GMP Guidelines',
  },
  // ── Regulatory Affairs ────────────────────────────────────────
  {
    id: 'quiz-006',
    topic_slug: 'product-registration',
    category: 'Regulatory',
    type: 'mcq',
    difficulty: 'intermediate',
    question:
      'What is the primary document format used for pharmaceutical product registration worldwide, as defined by ICH?',
    options: [
      'NDA (New Drug Application)',
      'CTD (Common Technical Document)',
      'ANDA (Abbreviated New Drug Application)',
      'DMF (Drug Master File)',
    ],
    correct_answer: 1,
    explanation:
      'The Common Technical Document (CTD) is the internationally agreed format for submitting applications to register pharmaceutical products. Defined by ICH M4, it organizes information into 5 modules: Quality, Non-clinical, Clinical, Clinical summaries, and Regional information.',
    source: 'ICH M4 — Common Technical Document',
  },
  {
    id: 'quiz-007',
    topic_slug: 'ppb-regulation',
    category: 'Regulatory',
    type: 'mcq',
    difficulty: 'basic',
    question:
      'What is the role of the Pharmacy and Poisons Board (PPB) in Kenya?',
    options: [
      'Manufacturing and distributing medicines',
      'Regulating pharmaceutical products, professionals, and premises to protect public health',
      'Setting drug prices in the private sector',
      'Training pharmacy students at universities',
    ],
    correct_answer: 1,
    explanation:
      'The PPB is Kenya\'s national regulatory authority for pharmaceuticals. Its mandate includes product registration, facility licensing, practitioner licensing, pharmacovigilance, and enforcement against counterfeit and substandard medicines. It operates under the Pharmacy and Poisons Act (Cap 244).',
    source: 'PPB Official Mandate',
  },
  {
    id: 'quiz-008',
    topic_slug: 'regulatory-compliance',
    category: 'Regulatory',
    type: 'true_false',
    difficulty: 'basic',
    question:
      'True or False: PPB GMP inspections in Kenya are always announced in advance to the manufacturing facility.',
    options: ['True', 'False'],
    correct_answer: 1,
    explanation:
      'False. While PPB conducts scheduled inspections, it also has the authority to conduct unannounced inspections at any time. This is a critical element of GMP enforcement — the ability to inspect without prior notice ensures facilities maintain continuous compliance readiness.',
    source: 'PPB Inspection Guidelines',
  },
  // ── Pharmacovigilance ────────────────────────────────────────
  {
    id: 'quiz-009',
    topic_slug: 'pharmacovigilance',
    category: 'Pharmacovigilance',
    type: 'mcq',
    difficulty: 'basic',
    question:
      'What is the Naranjo algorithm used for in pharmacovigilance?',
    options: [
      'Calculating drug dosages',
      'Assessing the causality of adverse drug reactions',
      'Determining drug-drug interactions',
      'Estimating drug half-life',
    ],
    correct_answer: 1,
    explanation:
      'The Naranjo Adverse Drug Reaction Probability Scale is a standardized questionnaire used to assess the likelihood that an adverse drug reaction was caused by a specific drug. It assigns a score from -4 to +10, categorizing causality as definite, probable, possible, or doubtful.',
    source: 'Naranjo et al., 1981, J Clin Pharmacol',
  },
  {
    id: 'quiz-010',
    topic_slug: 'safety-reporting',
    category: 'Pharmacovigilance',
    type: 'mcq',
    difficulty: 'intermediate',
    question:
      'In Kenya, which mobile application does the PPB promote for reporting adverse drug reactions?',
    options: [
      'mPedigree',
      'MedSafety',
      'Sproxil',
      'DrugDash',
    ],
    correct_answer: 1,
    explanation:
      'The MedSafety app, developed by WHO and maintained by the Uppsala Monitoring Centre, is actively promoted by Kenya\'s PPB for healthcare professionals and patients to report adverse drug reactions. It allows real-time ADR reporting directly to the national pharmacovigilance centre.',
    source: 'PPB Pharmacovigilance Guidelines',
  },
  {
    id: 'quiz-011',
    topic_slug: 'adverse-drug-reactions',
    category: 'Pharmacovigilance',
    type: 'clinical_scenario',
    difficulty: 'intermediate',
    question:
      'A 45-year-old patient develops a maculopapular rash 3 days after starting amoxicillin for a urinary tract infection. The rash resolves within 48 hours of discontinuing the antibiotic. Using the WHO-UMC causality assessment system, how would you classify this adverse reaction?',
    options: [
      'Certain — the reaction is consistent with the time relationship and cannot be explained by disease or other drugs',
      'Probable/Likely — a reasonable time relationship, unlikely to be attributed to disease or other drugs',
      'Possible — the reaction could be explained by disease or other drugs',
      'Unlikely — the temporal relationship is improbable',
    ],
    correct_answer: 0,
    explanation:
      'This is classified as "Certain" because: (1) there is a plausible time relationship to amoxicillin administration, (2) the reaction is consistent with the known profile of amoxicillin-induced rash, (3) it resolved upon dechallenge, and (4) there is no evidence suggesting an alternative cause. Amoxicillin rash is well-documented and typically appears 3–10 days after starting therapy.',
    source: 'WHO-UMC Causality Assessment System',
  },
  // ── Supply Chain ──────────────────────────────────────────────
  {
    id: 'quiz-012',
    topic_slug: 'cold-chain',
    category: 'Supply Chain',
    type: 'mcq',
    difficulty: 'basic',
    question:
      'What is the temperature range for the "cold chain" in pharmaceutical storage?',
    options: [
      '-20°C to -10°C',
      '2°C to 8°C',
      '8°C to 15°C',
      '15°C to 25°C',
    ],
    correct_answer: 1,
    explanation:
      'The pharmaceutical cold chain maintains products between 2°C and 8°C. This is critical for vaccines, insulin, certain antibiotics, and biologics. Temperature excursions outside this range can cause degradation, reduced efficacy, or complete loss of therapeutic activity.',
    source: 'WHO Temperature Monitoring Guidelines',
  },
  {
    id: 'quiz-013',
    topic_slug: 'procurement',
    category: 'Supply Chain',
    type: 'mcq',
    difficulty: 'basic',
    question:
      'What is the primary role of KEMSA in Kenya\'s pharmaceutical supply chain?',
    options: [
      'Manufacturing essential medicines locally',
      'Procuring and distributing medicines and health products to public health facilities',
      'Regulating pharmaceutical imports',
      'Setting drug prices for the private market',
    ],
    correct_answer: 1,
    explanation:
      'Kenya Medical Supplies Authority (KEMSA) is the central medical supplies agency responsible for procuring, storing, and distributing medicines and medical supplies to all public health facilities in Kenya. It operates under the KEMSA Act 2013 and is a key pillar of the national supply chain.',
    source: 'KEMSA Act 2013',
  },
  {
    id: 'quiz-014',
    topic_slug: 'distribution-storage',
    category: 'Supply Chain',
    type: 'clinical_scenario',
    difficulty: 'advanced',
    question:
      'A shipment of insulin cartridges arrives at a county hospital in Kenya. The temperature logger shows the truck reached 22°C for 4 hours during transit through a rural area. The insulin was otherwise stored at 2–8°C before and after this excursion. What should the pharmacist do?',
    options: [
      'Reject the shipment and return to KEMSA immediately',
      'Use the insulin immediately, as brief excursions are acceptable',
      'Quarantine the shipment, assess the excursion data, consult the manufacturer\'s stability data, and make a documented decision',
      'Distribute the insulin to lower-volume facilities where monitoring is easier',
    ],
    correct_answer: 2,
    explanation:
      'Temperature excursion management requires a documented risk assessment. The pharmacist should: (1) quarantine the affected products, (2) review the temperature logger data (duration and extent of excursion), (3) consult the manufacturer\'s stability data for allowable short-term excursions, (4) make a go/no-go decision documented in writing. Insulin is relatively stable for short excursions up to 25°C, but each case requires individual assessment.',
    source: 'WHO Temperature Excursion Guidelines',
  },
  // ── Quality Control ───────────────────────────────────────────
  {
    id: 'quiz-015',
    topic_slug: 'quality-control',
    category: 'Quality',
    type: 'mcq',
    difficulty: 'intermediate',
    question:
      'What is the primary purpose of dissolution testing in pharmaceutical QC?',
    options: [
      'To determine the tablet\'s weight uniformity',
      'To measure how quickly and completely the drug releases from the dosage form under standardized conditions',
      'To test the microbial contamination level',
      'To assess the physical appearance of the tablet',
    ],
    correct_answer: 1,
    explanation:
      'Dissolution testing measures the rate and extent of drug release from a dosage form. It is a critical quality attribute that correlates with in vivo bioavailability. It is used for batch release, stability testing, and as a surrogate for bioequivalence in some cases.',
    source: 'USP <711> Dissolution',
  },
  {
    id: 'quiz-016',
    topic_slug: 'validation',
    category: 'Quality',
    type: 'mcq',
    difficulty: 'advanced',
    question:
      'In process validation, what are the three stages as defined by the FDA 2011 guidance?',
    options: [
      'Planning, execution, and reporting',
      'Process Design, Process Qualification, and Continued Process Verification',
      'Installation Qualification, Operational Qualification, and Performance Qualification',
      'Pre-validation, Validation, and Post-validation',
    ],
    correct_answer: 1,
    explanation:
      'The FDA\'s 2011 guidance defines a lifecycle approach: Stage 1 — Process Design (developing the manufacturing process based on development knowledge), Stage 2 — Process Qualification (confirming the design capable of reproducible commercial manufacturing), Stage 3 — Continued Process Verification (ongoing assurance during routine production).',
    source: 'FDA Process Validation Guidance 2011',
  },
  // ── Kenyan Industry ───────────────────────────────────────────
  {
    id: 'quiz-017',
    topic_slug: 'kenyan-manufacturers',
    category: 'Kenyan Industry',
    type: 'mcq',
    difficulty: 'basic',
    question:
      'How many pharmaceutical companies are currently PPB-licensed for manufacturing in Kenya?',
    options: [
      'Approximately 10 companies',
      'Approximately 27 companies',
      'Approximately 50 companies',
      'Over 100 companies',
    ],
    correct_answer: 1,
    explanation:
      'As of 2026, Kenya has approximately 27 PPB-licensed pharmaceutical manufacturers, including major companies like Cosmos Pharmaceuticals, Dawa Life Sciences, Beta Healthcare, Biodeal Laboratories, and Cipla QC. This represents significant growth in local manufacturing capacity.',
    source: 'PPB Registry, medstatus.co.ke',
  },
  {
    id: 'quiz-018',
    topic_slug: 'ppb-regulation',
    category: 'Kenyan Industry',
    type: 'mcq',
    difficulty: 'intermediate',
    question:
      'What digital platform did the PPB launch for manufacturing facility management in 2025?',
    options: [
      'PharmaTrack',
      'Facility360',
      'MedPortal',
      'RegHub',
    ],
    correct_answer: 1,
    explanation:
      'Facility360 is the PPB\'s digital platform for manufacturing facility management, launched as part of the 2025–2026 regulatory reforms. It enables online facility licensing, inspection scheduling, and compliance tracking. The companion platform Practice360 handles practitioner licensing.',
    source: 'PPB Digital Transformation 2025',
  },
  // ── Essential Medicines ────────────────────────────────────────
  {
    id: 'quiz-019',
    topic_slug: 'essential-medicines',
    category: 'Supply Chain',
    type: 'mcq',
    difficulty: 'basic',
    question:
      'How often does the WHO update its Model List of Essential Medicines?',
    options: [
      'Every year',
      'Every 2 years',
      'Every 5 years',
      'Every 10 years',
    ],
    correct_answer: 1,
    explanation:
      'The WHO Expert Committee on Selection and Use of Essential Medicines updates the Model List every two years. The current list (24th edition, 2023) includes 518 medicines for adults and 361 for children. National lists like Kenya\'s KEML are typically aligned with the WHO EML.',
    source: 'WHO EML 2023',
  },
  // ── Counterfeit Medicines ──────────────────────────────────────
  {
    id: 'quiz-020',
    topic_slug: 'counterfeit-medicines',
    category: 'Supply Chain',
    type: 'mcq',
    difficulty: 'intermediate',
    question:
      'Which of the following field-deployable technologies can detect falsified medicines WITHOUT destroying the sample?',
    options: [
      'High-performance liquid chromatography (HPLC)',
      'Thin-layer chromatography (TLC)',
      'Raman spectroscopy',
      'Microbiological assay',
    ],
    correct_answer: 2,
    explanation:
      'Raman spectroscopy is a non-destructive analytical technique that identifies molecular composition through light scattering. It can be deployed in the field using handheld devices to verify medicine authenticity without opening packaging or destroying the sample. HPLC and TLC require sample preparation and are destructive.',
    source: 'WHO SF Detection Methods',
  },
  // ── Clinical Scenarios ─────────────────────────────────────────
  {
    id: 'quiz-021',
    topic_slug: 'formulation-development',
    category: 'Manufacturing',
    type: 'clinical_scenario',
    difficulty: 'advanced',
    question:
      'A pharmaceutical company wants to develop an oral liquid formulation of a poorly water-soluble drug (BCS Class II) for the Kenyan market. The drug has a bitter taste. Which formulation strategy would be MOST appropriate?',
    options: [
      'Simple aqueous solution with sweetener',
      'Suspension formulation with taste-masking agents and suspending polymers',
      'Effervescent tablet dissolved before use',
      'Soft gelatin capsule filled with syrup',
    ],
    correct_answer: 1,
    explanation:
      'For a BCS Class II drug (low solubility, high permeability), a suspension is the most practical oral liquid approach. The suspended drug particles provide higher drug loading than a solution. Taste-masking agents (e.g., sweeteners, flavouring agents, ion-exchange resins) address the bitter taste. Suspending polymers (e.g., xanthan gum, CMC) maintain uniform drug distribution.',
    source: 'Remington: The Science and Practice of Pharmacy',
  },
  {
    id: 'quiz-022',
    topic_slug: 'continuous-manufacturing',
    category: 'Manufacturing',
    type: 'mcq',
    difficulty: 'advanced',
    question:
      'Which ICH guideline specifically addresses the continuous manufacturing of drug substances and drug products?',
    options: [
      'ICH Q1A — Stability Testing',
      'ICH Q7 — GMP for Active Pharmaceutical Ingredients',
      'ICH Q13 — Continuous Manufacturing',
      'ICH Q8 — Pharmaceutical Development',
    ],
    correct_answer: 2,
    explanation:
      'ICH Q13, finalized in 2023, provides the definitive international guideline for continuous manufacturing of drug substances and drug products. It covers development, manufacturing, and regulatory considerations, complementing the WHO TRS 1067 Annex 2 guidance.',
    source: 'ICH Q13',
  },
  {
    id: 'quiz-023',
    topic_slug: 'safety-reporting',
    category: 'Pharmacovigilance',
    type: 'mcq',
    difficulty: 'basic',
    question:
      'What does the acronym PSUR stand for in pharmacovigilance?',
    options: [
      'Patient Safety Update Report',
      'Periodic Safety Update Report',
      'Pharmacovigilance System Under Review',
      'Post-Sale Usage Report',
    ],
    correct_answer: 1,
    explanation:
      'A Periodic Safety Update Report (PSUR) is a comprehensive document submitted at defined intervals that provides a global safety update for a marketed medicine. It evaluates the benefit-risk balance based on cumulative safety data. In the EU, the equivalent is called PBRER (Periodic Benefit-Risk Evaluation Report).',
    source: 'ICH E2C(R2)',
  },
  {
    id: 'quiz-024',
    topic_slug: 'quality-assurance',
    category: 'Quality',
    type: 'mcq',
    difficulty: 'intermediate',
    question:
      'What is CAPA in pharmaceutical quality management?',
    options: [
      'Central Analytical Protocol for Assay',
      'Corrective and Preventive Action',
      'Certified Active Pharmaceutical Analysis',
      'Controlled Access Pharmaceutical Area',
    ],
    correct_answer: 1,
    explanation:
      'CAPA (Corrective and Preventive Action) is a systematic approach to investigating deviations, identifying root causes, implementing corrective actions to address the immediate issue, and preventive actions to avoid recurrence. It is a cornerstone of pharmaceutical quality management systems.',
    source: 'ICH Q10',
  },
  {
    id: 'quiz-025',
    topic_slug: 'drug-industry-connections',
    category: 'Cross-cutting',
    type: 'clinical_scenario',
    difficulty: 'advanced',
    question:
      'A hospital pharmacist in Nairobi notices that the amoxicillin suspension they received from KEMSA has a shorter expiry date than expected. The label says "use within 14 days of reconstitution." Why is this the case?',
    options: [
      'The product was manufactured incorrectly',
      'Amoxicillin suspensions have limited stability after reconstitution due to hydrolysis of the ester bond in aqueous media',
      'The PPB requires shorter expiry dates for all antibiotics',
      'KEMSA stored the product improperly before distribution',
    ],
    correct_answer: 1,
    explanation:
      'Amoxicillin trihydrate powder for oral suspension is stable for 24+ months when dry, but once reconstituted with water, the drug undergoes hydrolysis. The reconstituted suspension typically has a stability of only 14 days at 25°C (or 7 days at higher temperatures). This is a formulation stability limitation, not a manufacturing or storage issue.',
    source: 'Amoxicillin SPC/Package Insert',
  },
]
