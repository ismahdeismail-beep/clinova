/**
 * Clinova AI Resource Generation
 *
 * For each clinical case in Supabase, generate and link:
 *   - Study Guide
 *   - Flashcards (5 per case)
 *   - Quiz Questions (3 per case: 1 MCQ, 1 SAQ, 1 essay)
 *
 * Only generates resources for cases that don't already have them.
 *
 * Usage:
 *   npx tsx scripts/generate-ai-resources.ts
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL    = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const BATCH_SIZE = 10;

// ── Generate resources from case data ───────────────────────────────

interface CaseRecord {
  id: string;
  title: string;
  specialty: string;
  disease: string;
  diagnosis: string;
  chief_complaint: string;
  hpi: string;
  pharm: string;
  monitoring: string;
  counselling: string;
  pearls: string;
  goals: string;
  difficulty: string;
}

function generateStudyGuide(c: CaseRecord) {
  return {
    title: `Study Guide: ${c.title}`,
    content: {
      overview: `Clinical case covering ${c.disease} in ${c.specialty}.`,
      diagnosis: c.diagnosis,
      pharmacotherapy: c.pharm,
      monitoring: c.monitoring,
      counselling_points: c.counselling,
      key_pearls: c.pearls,
      learning_goals: c.goals,
      difficulty: c.difficulty,
    },
  };
}

function generateFlashcards(c: CaseRecord): { question: string; answer: string; difficulty: string }[] {
  return [
    {
      question: `What is the diagnosis in the case "${c.title}"?`,
      answer: c.diagnosis,
      difficulty: c.difficulty,
    },
    {
      question: `What pharmacotherapy is recommended for this ${c.disease} case?`,
      answer: c.pharm?.substring(0, 500) || 'See case details.',
      difficulty: c.difficulty,
    },
    {
      question: `What monitoring parameters are important in "${c.title}"?`,
      answer: c.monitoring || 'See case details.',
      difficulty: c.difficulty,
    },
    {
      question: `What counselling points should be covered for this patient?`,
      answer: c.counselling || 'See case details.',
      difficulty: c.difficulty,
    },
    {
      question: `What are the key learning pearls from "${c.title}"?`,
      answer: c.pearls || 'See case details.',
      difficulty: c.difficulty,
    },
  ];
}

function generateQuizQuestions(c: CaseRecord): {
  question_type: string;
  question_text: string;
  options: any;
  correct_answer: string;
  explanation: string;
  difficulty: string;
}[] {
  return [
    {
      question_type: 'MCQ',
      question_text: `What is the most likely diagnosis in a patient presenting with "${c.chief_complaint?.substring(0, 150)}"?`,
      options: {
        A: c.diagnosis,
        B: 'Alternative diagnosis based on similar presentation',
        C: 'Unrelated condition',
        D: 'Complication of existing condition',
      },
      correct_answer: 'A',
      explanation: `Based on the presentation, the diagnosis is ${c.diagnosis}. ${c.pearls?.substring(0, 200)}`,
      difficulty: c.difficulty,
    },
    {
      question_type: 'SAQ',
      question_text: `Outline the pharmacotherapeutic management plan for ${c.disease} as described in the case "${c.title}". Include drug selection, dosing, and monitoring.`,
      options: null,
      correct_answer: c.pharm?.substring(0, 1000) || '',
      explanation: c.monitoring || '',
      difficulty: c.difficulty,
    },
    {
      question_type: 'Essay',
      question_text: `Discuss the comprehensive management of ${c.disease} in the context of ${c.specialty}. Include pathophysiology, diagnostic approach, pharmacotherapy, patient counselling, and follow-up care.`,
      options: null,
      correct_answer: `Key points: ${c.diagnosis}. Pharmacotherapy: ${c.pharm?.substring(0, 500)}. Monitoring: ${c.monitoring}. Counselling: ${c.counselling}`,
      explanation: c.pearls || '',
      difficulty: c.difficulty === 'Advanced' ? 'Advanced' : 'Intermediate',
    },
  ];
}

// ── Main (bulk, idempotent) ──────────────────────────────────────────
async function main() {
  console.log('='.repeat(60));
  console.log('📝 AI RESOURCE GENERATION');
  console.log('='.repeat(60));

  // Fetch all published cases from Supabase
  const { data: cases, error: fetchErr } = await supabase
    .from('clinical_cases')
    .select('id, title, specialty, disease, diagnosis, chief_complaint, hpi, pharm, monitoring, counselling, pearls, goals, difficulty')
    .eq('status', 'published');

  if (fetchErr) {
    console.error('❌ Failed to fetch cases:', fetchErr.message);
    process.exit(1);
  }

  if (!cases || cases.length === 0) {
    console.log('📭 No published cases found. Run seed import first.');
    process.exit(0);
  }

  console.log(`📦 Found ${cases.length} published cases.`);

  // Bulk fetch which case_ids already have each resource type
  const { data: existingGuides } = await supabase.from('study_guides').select('case_id');
  const { data: existingFC }    = await supabase.from('flashcards').select('case_id');
  const { data: existingQuiz }  = await supabase.from('quiz_questions').select('case_id');

  const guideSet = new Set((existingGuides || []).map((r: any) => r.case_id));
  const fcSet    = new Set((existingFC || []).map((r: any) => r.case_id));
  const quizSet  = new Set((existingQuiz || []).map((r: any) => r.case_id));

  const guideRows: any[] = [];
  const fcRows: any[] = [];
  const quizRows: any[] = [];

  for (const c of cases as CaseRecord[]) {
    if (!guideSet.has(c.id)) {
      const g = generateStudyGuide(c);
      guideRows.push({ case_id: c.id, title: g.title, content: g.content });
    }
    if (!fcSet.has(c.id)) {
      for (const card of generateFlashcards(c)) fcRows.push({ ...card, case_id: c.id });
    }
    if (!quizSet.has(c.id)) {
      for (const q of generateQuizQuestions(c)) quizRows.push({ ...q, case_id: c.id });
    }
  }

  const CHUNK = 200;
  let guidesCreated = 0, flashcardsCreated = 0, quizzesCreated = 0;

  for (let i = 0; i < guideRows.length; i += CHUNK) {
    const { error } = await supabase.from('study_guides').insert(guideRows.slice(i, i + CHUNK));
    if (error) console.warn(`   ⚠️  Guide chunk ${i} failed: ${error.message}`);
    else guidesCreated += Math.min(CHUNK, guideRows.length - i);
  }
  for (let i = 0; i < fcRows.length; i += CHUNK) {
    const { error } = await supabase.from('flashcards').insert(fcRows.slice(i, i + CHUNK));
    if (error) console.warn(`   ⚠️  Flashcard chunk ${i} failed: ${error.message}`);
    else flashcardsCreated += Math.min(CHUNK, fcRows.length - i);
  }
  for (let i = 0; i < quizRows.length; i += CHUNK) {
    const { error } = await supabase.from('quiz_questions').insert(quizRows.slice(i, i + CHUNK));
    if (error) console.warn(`   ⚠️  Quiz chunk ${i} failed: ${error.message}`);
    else quizzesCreated += Math.min(CHUNK, quizRows.length - i);
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 GENERATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`   Study Guides:   ${guidesCreated} created (${guideRows.length} pending)`);
  console.log(`   Flashcards:     ${flashcardsCreated} created (${fcRows.length} pending)`);
  console.log(`   Quiz Questions: ${quizzesCreated} created (${quizRows.length} pending)`);
  console.log('✅ Done.');
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
