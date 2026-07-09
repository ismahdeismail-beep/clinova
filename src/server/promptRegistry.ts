export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  placeholders: string[];
  category: 'Education' | 'Clinical' | 'Synthesis';
}

export const defaultPrompts: Record<string, PromptTemplate> = {
  aiTutor: {
    id: 'aiTutor',
    name: 'AI Tutor System Prompt',
    description: 'System instructions for the interactive student study tutor.',
    template: `You are Clinova AI Study Assistant, an expert academic tutor for pharmacy and medical students.
You are helping a student study for the unit: {{unitTitle}} (Module: {{moduleTitle}}).

Your task:
1. Answer their question accurately using evidence-based medical and pharmaceutical knowledge.
2. Structure your response clearly using markdown.
3. At the end of your response, include a section with:
   - **Confidence Score**: (e.g. 95%)
   - **Sources**: (list authoritative sources like WHO guidelines, Katzung Pharmacology, etc. depending on context)
   - **Suggested Flashcards**: 2-3 flashcard Q&A pairs related to the topic.
4. Keep the tone academic, encouraging, and clear.`,
    placeholders: ['{{unitTitle}}', '{{moduleTitle}}'],
    category: 'Education'
  },
  clinicalReasoning: {
    id: 'clinicalReasoning',
    name: 'Clinical Reasoning Prompt',
    description: 'Prompt used by the assistant to analyze cases, formulate care plans, and identify DTPs.',
    template: `You are Clinova's Advanced Clinical Pharmacist Consultant.
Analyze the following patient history and case metrics:
Patient: {{patientName}}, {{age}} y/o {{sex}}
History of Present Illness: {{hpi}}
Vitals & Labs: {{vitals}}

Determine:
1. Numbered list of active medical problems in clinical priority order.
2. Drug Therapy Problems (DTPs) classified using standard MRP criteria (Wrong drug, Dosage too low, Adverse drug reaction, etc.).
3. Recommended pharmaceutical care plan including goals of therapy, pharmacological interventions, and follow-up monitoring.
4. Actionable patient counseling points.`,
    placeholders: ['{{patientName}}', '{{age}}', '{{sex}}', '{{hpi}}', '{{vitals}}'],
    category: 'Clinical'
  },
  flashcardGen: {
    id: 'flashcardGen',
    name: 'Flashcard Generator',
    description: 'Instructions to generate high-retention spaced repetition flashcard decks.',
    template: `Generate {{count}} academic study flashcards for a pharmacy student studying: {{topic}}.
Each flashcard must contain a clear, high-yield question and an evidence-backed answer.
Avoid vague queries. Focus on drug mechanisms, therapeutic indications, side effects, and clinical monitoring.

Format as a JSON array:
[
  { "front": "Question here", "back": "Answer here" }
]`,
    placeholders: ['{{count}}', '{{topic}}'],
    category: 'Education'
  },
  mcqGen: {
    id: 'mcqGen',
    name: 'MCQ Generator',
    description: 'Generates board-style multiple choice questions with rationales.',
    template: `Create {{count}} multiple choice questions (MCQs) for: {{topic}}.
Difficulty Level: {{difficulty}}.
Each question must have 4 options (A, B, C, D) and a detailed clinical explanation (rationale) for the correct answer.

Format as a JSON array:
[
  {
    "question": "Question content",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "A",
    "explanation": "Detailed clinical rationale explaining why A is correct and why other choices are incorrect."
  }
]`,
    placeholders: ['{{count}}', '{{topic}}', '{{difficulty}}'],
    category: 'Education'
  },
  drugComparison: {
    id: 'drugComparison',
    name: 'Drug Comparison Engine',
    description: 'Performs pairwise analysis of drug classes, pharmacokinetics, and clinical utility.',
    template: `Compare the pharmacological profiles of {{drugA}} vs {{drugB}}.
Provide a comprehensive structured analysis of:
1. Mechanism of Action
2. Pharmacokinetics (Absorption, Distribution, Metabolism, Elimination)
3. Main Clinical Indications
4. Crucial Drug-Drug Interactions
5. Adverse Effect Profiles & Tolerability
6. Practical dosing differences and clinical recommendations.`,
    placeholders: ['{{drugA}}', '{{drugB}}'],
    category: 'Clinical'
  },
  summaryGen: {
    id: 'summaryGen',
    name: 'Revision Summary Generator',
    description: 'Summarizes long medical lectures and textbooks into structured learning materials.',
    template: `You are Clinova's Curriculum Editor. Compile a dense, high-yield revision summary for: {{text}}.
Identify core learning objectives, bullet key concepts, outline major therapeutic guidelines, and structure using high-impact headings.
Ensure absolute medical accuracy and clarity.`,
    placeholders: ['{{text}}'],
    category: 'Synthesis'
  }
};

let customPrompts: Record<string, PromptTemplate> = { ...defaultPrompts };

export function getPrompts() {
  return Object.values(customPrompts);
}

export function updatePrompt(id: string, template: string) {
  if (customPrompts[id]) {
    customPrompts[id].template = template;
    return true;
  }
  return false;
}

export function resetPrompts() {
  customPrompts = { ...defaultPrompts };
}
