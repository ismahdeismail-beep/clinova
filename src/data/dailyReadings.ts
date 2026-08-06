import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  GraduationCap,
  Pill,
  Stethoscope,
  Heart,
  Droplets,
} from 'lucide-react'

export interface ReadingSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  callout?: string
}

export interface DailyReading {
  id: string
  title: string
  summary: string
  category: string
  readTime: string
  badge: string
  icon: LucideIcon
  theme: {
    gradient: string
    text: string
    chip: string
    border: string
    button: string
    dot: string
  }
  sections: ReadingSection[]
}

export const DAILY_READINGS: DailyReading[] = [
  {
    id: 'clinova-companion',
    title: 'Clinova: Your Complete Clinical Learning Companion',
    summary:
      'Explore disease monographs, care plans, exam prep, and clinical support — all in one platform designed for pharmacy and medicine students.',
    category: 'Platform',
    readTime: '4 min read',
    badge: 'Welcome',
    icon: BookOpen,
    theme: {
      gradient: 'from-indigo-500 to-blue-600',
      text: 'text-indigo-600 dark:text-indigo-400',
      chip: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-500/20',
      button: 'from-indigo-500 to-blue-600',
      dot: 'bg-indigo-500',
    },
    sections: [
      {
        heading: 'What Clinova is',
        paragraphs: [
          'Clinova is a clinical learning platform built for pharmacy and medicine students in Kenya — a single workspace that brings together the reference material, practice tools, and revision support you need across your entire course.',
          'Instead of juggling PDFs, printed formularies, and scattered notes, Clinova keeps everything in one place: the Kenya Drug Index, disease monographs, nursing care plans, mock exam papers, clinical cases, and your own notes and flashcards.',
        ],
      },
      {
        heading: 'The learning ecosystem',
        paragraphs: [
          'Every module is designed to reinforce the same material in a different way, so you see each topic from multiple angles:',
        ],
        bullets: [
          'Education Hub — modules for board exams, exam prep, clinical pharmacy and therapeutics, online books, clinical cases, and more.',
          'Drug Index — drug-specific monographs grounded in the Kenya Drug Index and FDA/NLM references, with dosing, interactions, and renal adjustments.',
          'Clinical Cases — realistic patient scenarios that build diagnostic reasoning and treatment planning.',
          'Care Plans — NANDA-NIC-NOC structured nursing care plans across 19 specialties.',
          'Exam Prep — mock papers and practice questions that mirror board exam formats.',
          'Clinova Support — instant answers to clinical questions, grounded in trusted references.',
        ],
      },
      {
        heading: 'How to get the most out of Clinova',
        paragraphs: [
          'Start with the Education Hub to see your curriculum mapped out, then use the Drug Index and Clinical Cases to apply what you learn. Use the search bar anywhere in the app to jump straight to a drug, disease, or case.',
          'Bookmark the Daily Spotlight — every day you get a new drug and a fresh reading to keep your revision moving.',
        ],
      },
      {
        heading: 'Getting started checklist',
        paragraphs: ['If you are new here, work through this in order:'],
        bullets: [
          'Open the Education Hub and pick your module of study.',
          'Search your current topic (e.g. "amoxicillin" or "heart failure").',
          'Read the monograph, then attempt a related clinical case.',
          'Generate flashcards or a quiz from the topic you just studied.',
          'Check the dashboard each day for the Drug of the Day and Today\u2019s Reading.',
        ],
      },
    ],
  },
  {
    id: 'education-hub-guide',
    title: 'How to Use the Education Hub Effectively',
    summary:
      'Five modules — Exam (Board Exam & Exam Prep), Clinical Pharmacy & Therapeutics, Online Books, Clinical Cases, and Clinova Support. Navigate modules, track your progress, and use the curriculum graph to plan your study path.',
    category: 'Guide',
    readTime: '5 min read',
    badge: 'Tips',
    icon: GraduationCap,
    theme: {
      gradient: 'from-teal-500 to-emerald-600',
      text: 'text-teal-600 dark:text-teal-400',
      chip: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
      border: 'border-teal-500/20',
      button: 'from-teal-500 to-emerald-600',
      dot: 'bg-teal-500',
    },
    sections: [
      {
        heading: 'The five modules',
        paragraphs: [
          'The Education Hub is organised into five core modules so you always know where to find the right tool:',
        ],
        bullets: [
          'Exam — Board Exam and Exam Prep. Full mock papers, timed practice, and answer breakdowns that mirror real board formats.',
          'Clinical Pharmacy & Therapeutics — structured therapeutic areas with learning objectives, disease overviews, and treatment pathways.',
          'Online Books — reference texts organised by subject for quick lookup and deep reading.',
          'Clinical Cases — scenario-based practice that links diagnosis to rational prescribing.',
          'Clinova Support — clinical Q&A for when you need a concept explained in context.',
        ],
      },
      {
        heading: 'Planning with the curriculum graph',
        paragraphs: [
          'The curriculum graph maps topics to learning objectives across your course. Use it to see how a single drug connects to a disease, a case, and an exam question — then plan your study path around those connections.',
          'A good rule of thumb: study the topic in the graph, read the monograph, work one case, then test yourself with a quiz. That loop covers recall, application, and exam readiness.',
        ],
      },
      {
        heading: 'Tracking your progress',
        paragraphs: [
          'Clinova records the units you study, cases you complete, and quiz scores you earn. Check your dashboard stats and study tracks regularly — they tell you where you are strong and where you need more reps.',
        ],
        bullets: [
          'Units studied: the ground you have covered.',
          'Cases completed: your application practice.',
          'Assessment scores: your exam readiness signal.',
          'Study tracks: personalised focus areas based on your clinical interests.',
        ],
      },
      {
        heading: 'Pro tips',
        paragraphs: ['Small habits make the biggest difference:'],
        bullets: [
          'Keep notes inside the hub so they sync with the subfolder they belong to.',
          'Use flashcards after every module, not just before exams.',
          'Attempt mock papers under timed conditions — then review every wrong answer.',
          'Revisit the curriculum graph weekly to keep your plan on track.',
        ],
      },
    ],
  },
  {
    id: 'understanding-drug-monographs',
    title: 'Understanding Drug Monographs',
    summary:
      'Learn how to read and use drug monographs for safe prescribing — from dosing and interactions to contraindications and therapeutic monitoring.',
    category: 'Reference',
    readTime: '5 min read',
    badge: 'Essential',
    icon: Pill,
    theme: {
      gradient: 'from-violet-500 to-purple-600',
      text: 'text-violet-600 dark:text-violet-400',
      chip: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
      border: 'border-violet-500/20',
      button: 'from-violet-500 to-purple-600',
      dot: 'bg-violet-500',
    },
    sections: [
      {
        heading: 'What a monograph is',
        paragraphs: [
          'A drug monograph is the complete, structured summary of a medicine: what it is, what it treats, how it is dosed, and what you must watch for. It is the single most important reference when you are prescribing, dispensing, or counselling a patient.',
          'In Clinova, monographs are grounded in the Kenya Drug Index and FDA/NLM sources, so the dosing reflects both international evidence and local formulary context.',
        ],
      },
      {
        heading: 'Anatomy of a monograph',
        paragraphs: [
          'Learn where to look first by memorising the standard sections:',
        ],
        bullets: [
          'Indications & therapeutic use — when the drug is appropriate.',
          'Dosing & administration — route, strength, frequency, and special adjustments.',
          'Pharmacokinetics — how the body handles the drug (absorption, metabolism, elimination).',
          'Contraindications — when you must NOT give it.',
          'Interactions — other drugs, foods, and disease states that change its effect.',
          'Adverse effects & monitoring — what to watch for and what to check.',
        ],
      },
      {
        heading: 'Using a monograph safely',
        paragraphs: [
          'Always check the contraindications before the indications. A drug that is perfect for one patient can be harmful for another — pregnancy, renal function, liver function, and existing medications all change the risk.',
          'When in doubt, check the interaction section and the renal/liver adjustment guidance. When documenting, record the indication, the dose, the route, and the monitoring plan together.',
        ],
        callout:
          'Clinical pearl: before prescribing, ask yourself three questions — Is it indicated? Is it safe in this patient? What will I monitor?',
      },
      {
        heading: 'High-yield habits',
        bullets: [
          'Compare the monograph against the Kenyan STG/EML when available — local first-line choices may differ from global ones.',
          'Practise writing a mini-monograph from memory for common drugs (amoxicillin, metformin, furosemide, warfarin).',
          'Use the Drug Index search to check an unfamiliar drug the moment you meet it in a case.',
        ],
      },
    ],
  },
  {
    id: 'clinical-cases-reasoning',
    title: 'Clinical Cases: Build Diagnostic Reasoning',
    summary:
      'Work through real-world clinical scenarios across multiple therapeutic areas. Build diagnostic reasoning and treatment planning skills with guided feedback.',
    category: 'Practice',
    readTime: '5 min read',
    badge: 'Featured',
    icon: Stethoscope,
    theme: {
      gradient: 'from-rose-500 to-orange-500',
      text: 'text-rose-600 dark:text-rose-400',
      chip: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      border: 'border-rose-500/20',
      button: 'from-rose-500 to-orange-500',
      dot: 'bg-rose-500',
    },
    sections: [
      {
        heading: 'Why cases matter',
        paragraphs: [
          'Exams test knowledge, but practice tests judgement. Clinical cases connect your pharmacology to real patients — they are the bridge between memorising a drug and knowing when to use it, in what dose, and for whom.',
          'Working cases repeatedly builds the pattern recognition you will rely on in clinical rotations and practice.',
        ],
      },
      {
        heading: 'The clinical reasoning framework',
        paragraphs: [
          'Work every case with the same disciplined sequence — it keeps you organised under exam pressure and at the bedside:',
        ],
        bullets: [
          '1. Read the presentation — age, sex, presenting complaint, vital signs, key examination findings.',
          '2. Generate a differential — list the likely causes before you commit to one.',
          '3. Identify the red flags — what must not be missed (shock, airway, arrhythmia, sepsis).',
          '4. Plan the workup — the investigations that would confirm or exclude your top diagnoses.',
          '5. Build the treatment plan — first-line therapy per guidelines, with dose, route, and monitoring.',
        ],
      },
      {
        heading: 'How to work a case in Clinova',
        paragraphs: [
          'Open a case in your therapeutic area, read the scenario, and commit to an answer before revealing the guidance. Then compare your reasoning to the structured feedback: what did you catch, and what did you miss?',
          'Re-do cases you failed after studying the related monograph — the second pass is where the learning sticks.',
        ],
      },
      {
        heading: 'Common pitfalls',
        bullets: [
          'Jumping to a diagnosis before listing a differential.',
          'Choosing a second-line drug when a first-line one is indicated.',
          'Forgetting renal or liver adjustment in elderly or comorbid patients.',
          'Ignoring monitoring parameters (INR, potassium, renal function, glucose).',
          'Missing the contraindication that rules out your first choice.',
        ],
        callout:
          'Clinical pearl: in every case, name your most feared diagnosis and explain why it is not it. That one habit upgrades your reasoning more than any other.',
      },
    ],
  },
  {
    id: 'nursing-care-plans',
    title: 'Nursing Care Plans: NANDA-NIC-NOC Standards',
    summary:
      "An overview of the standardized nursing language system powering Clinova's Care Plan module. Includes 19 specialties and 92 evidence-based care plans.",
    category: 'Nursing',
    readTime: '4 min read',
    badge: 'New',
    icon: Heart,
    theme: {
      gradient: 'from-cyan-500 to-sky-600',
      text: 'text-cyan-600 dark:text-cyan-400',
      chip: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
      border: 'border-cyan-500/20',
      button: 'from-cyan-500 to-sky-600',
      dot: 'bg-cyan-500',
    },
    sections: [
      {
        heading: 'What NANDA-NIC-NOC means',
        paragraphs: [
          'NANDA (North American Nursing Diagnosis Association), NIC (Nursing Interventions Classification), and NOC (Nursing Outcomes Classification) form the standardised language of modern nursing care planning.',
          'A NANDA-NIC-NOC care plan links three things: a nursing diagnosis (what the patient is experiencing), expected outcomes (what we aim to achieve), and interventions (what the nurse will do). Using one consistent language makes care measurable, documented, and comparable across facilities.',
        ],
      },
      {
        heading: 'How care plans are structured',
        paragraphs: [
          'Each care plan in Clinova follows the same evidence-based skeleton, so once you learn the structure you can read any plan:',
        ],
        bullets: [
          'Nursing diagnosis — the NANDA label and the defining characteristics that justify it.',
          'Assessment cues — subjective and objective data that support the diagnosis.',
          'NOC outcomes — measurable goals with target indicators.',
          'NIC interventions — independent nursing actions and collaborative orders.',
          'Evaluation — how to know whether the outcomes were met.',
        ],
      },
      {
        heading: 'How to use them',
        paragraphs: [
          'Use the Care Plan module to study plans by specialty — from Critical Care and ICU to Community Health. Pick the diagnosis that matches your patient, then adapt the interventions to the actual clinical picture.',
          'In exams, examiners look for three things: the right diagnosis, outcomes that are measurable, and interventions that are specific and safe. Practise writing all three.',
        ],
      },
      {
        heading: 'Charting pearls',
        bullets: [
          'Always link your interventions to the assessment finding that justified them.',
          'Make outcomes SMART — specific, measurable, achievable, relevant, time-bound.',
          'Update the evaluation section at every shift; a static care plan is a red flag.',
          'Know the NANDA taxonomy priorities: airway, breathing, circulation, elimination, safety.',
        ],
      },
    ],
  },
  {
    id: 'renal-dose-adjustments',
    title: 'Renal Dose Adjustments: A Quick Reference',
    summary:
      'CrCl-based dosing pearls for the most commonly renally-cleared medications. Includes aminoglycosides, DOACs, antifungals, and antimicrobials.',
    category: 'Reference',
    readTime: '4 min read',
    badge: 'High-Yield',
    icon: Droplets,
    theme: {
      gradient: 'from-amber-500 to-orange-600',
      text: 'text-amber-600 dark:text-amber-400',
      chip: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      border: 'border-amber-500/20',
      button: 'from-amber-500 to-orange-600',
      dot: 'bg-amber-500',
    },
    sections: [
      {
        heading: 'Why renal dosing matters',
        paragraphs: [
          'The kidney clears a large share of the drugs you will prescribe. When renal function falls, drug accumulation rises — and so does the risk of toxicity, from gentamicin nephrotoxicity to bleeding on DOACs.',
          'Dosing for the kidney is one of the most frequently examined and most commonly applied skills in clinical pharmacy.',
        ],
      },
      {
        heading: 'CrCl: the foundation',
        paragraphs: [
          'Adjustments are driven by creatinine clearance (CrCl), not serum creatinine alone. Use Cockcroft-Gault (or the formula your guideline prefers) and remember it needs an accurate body weight:',
        ],
        bullets: [
          'CrCl (mL/min) = [(140 \u2212 age) \u00d7 weight (kg) \u00d7 0.85 if female] \u00f7 (72 \u00d7 serum creatinine).',
          'Use ideal body weight for obese patients and actual weight for normal-range patients.',
          'In acute kidney injury, treat the patient as severely impaired regardless of the number.',
          'Elderly patients: an apparently normal creatinine can hide a low CrCl — always calculate.',
        ],
      },
      {
        heading: 'Common drugs that need adjustment',
        paragraphs: [
          'Memorise the highest-yield renally-cleared classes:',
        ],
        bullets: [
          'Aminoglycosides (gentamicin, amikacin) — dose by interval extension or adjusted dosing; monitor troughs.',
          'Beta-lactams (cefazolin, ceftazidime, piperacillin) — extend intervals as CrCl falls.',
          'Fluoroquinolones (ciprofloxacin, levofloxacin) — reduce dose in moderate-severe impairment.',
          'DOACs (dabigatran, rivaroxaban, edoxaban) — dose-specific cut-offs; dabigatran is contraindicated in CrCl < 30.',
          'Antifungals (fluconazole, amphotericin B) — fluconazole needs interval extension; amphotericin needs hydration and monitoring.',
          'Metformin — avoid initiation when eGFR < 30; review dosing between 30 and 45.',
        ],
        callout:
          'Clinical pearl: for every renally-cleared drug, document the CrCl, the adjusted dose, AND the monitoring plan in one line. That is exactly what examiners and preceptors look for.',
      },
      {
        heading: 'Practice pearls',
        bullets: [
          'Check renal function before EVERY dose of an aminoglycoside, not just on admission.',
          'Beware the additive nephrotoxins: NSAIDs + ACE inhibitors + diuretics together are a classic AKI recipe.',
          'Recheck CrCl after any clinical deterioration, surgery, or contrast exposure.',
          'In dialysis patients, know which drugs are removed by dialysis (dose after HD) versus not.',
        ],
      },
    ],
  },
]

export function getDailyReadingById(id: string): DailyReading | undefined {
  return DAILY_READINGS.find((r) => r.id === id)
}

export function getReadingOfTheDay(now: Date = new Date()): DailyReading {
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return DAILY_READINGS[dayOfYear % DAILY_READINGS.length]
}
