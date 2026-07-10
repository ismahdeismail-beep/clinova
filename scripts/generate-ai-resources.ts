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

// ── Main ────────────────────────────────────────────────────────────
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

  // For each case, check if resources already exist
  let guidesCreated = 0;
  let guidesSkipped = 0;
  let flashcardsCreated = 0;
  let flashcardsSkipped = 0;
  let quizzesCreated = 0;
  let quizzesSkipped = 0;

  for (let i = 0; i < cases.length; i += BATCH_SIZE) {
    const batch = cases.slice(i, i + BATCH_SIZE);

    for (const c of batch as CaseRecord[]) {
      // Check existing study guide
      const { data: existingGuide } = await supabase
        .from('study_guides')
        .select('id')
        .eq('case_id', c.id)
        .limit(1);

      if (!existingGuide || existingGuide.length === 0) {
        const guide = generateStudyGuide(c);
        const { error } = await supabase
          .from('study_guides')
          .insert({ case_id: c.id, title: guide.title, content: guide.content });
        if (error) {
          console.warn(`   ⚠️  Study guide failed for "${c.title}": ${error.message}`);
        } else {
          guidesCreated++;
        }
      } else {
        guidesSkipped++;
      }

      // Check existing flashcards
      const { data: existingFC } = await supabase
        .from('flashcards')
        .select('id')
        .eq('case_id', c.id)
        .limit(1);

      if (!existingFC || existingFC.length === 0) {
        const cards = generateFlashcards(c);
        const { error } = await supabase
          .from('flashcards')
          .insert(cards.map(card => ({ ...card, case_id: c.id })));
        if (error) {
          console.warn(`   ⚠️  Flashcards failed for "${c.title}": ${error.message}`);
        } else {
          flashcardsCreated += cards.length;
        }
      } else {
        flashcardsSkipped += 5;
      }

      // Check existing quiz questions
      const { data: existingQuiz } = await supabase
        .from('quiz_questions')
        .select('id')
        .eq('case_id', c.id)
        .limit(1);

      if (!existingQuiz || existingQuiz.length === 0) {
        const questions = generateQuizQuestions(c);
        const { error } = await supabase
          .from('quiz_questions')
          .insert(questions.map(q => ({ ...q, case_id: c.id })));
        if (error) {
          console.warn(`   ⚠️  Quiz questions failed for "${c.title}": ${error.message}`);
        } else {
          quizzesCreated += questions.length;
        }
      } else {
        quizzesSkipped += 3;
      }
    }

    console.log(`   Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(cases.length / BATCH_SIZE)} processed`);
    
    if (i + BATCH_SIZE < cases.length) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  // ── Report ──────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(60));
  console.log('📊 GENERATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`   Study Guides:   ${guidesCreated} created, ${guidesSkipped} skipped`);
  console.log(`   Flashcards:     ${flashcardsCreated} created, ${flashcardsSkipped} skipped`);
  console.log(`   Quiz Questions: ${quizzesCreated} created, ${quizzesSkipped} skipped`);
  console.log('✅ Done.');
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
