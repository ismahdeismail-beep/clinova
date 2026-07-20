import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, ChevronRight, CheckCircle2, AlertCircle,
  GraduationCap, BookOpen, Target, FileText, Lightbulb,
  Download, RotateCcw, TrendingUp,
} from 'lucide-react'
import {
  BOARD_EXAM_QUESTIONS,
  getQuestionsByPredictionSet,
  type BoardExamQuestion,
} from '../data/boardExams'

const SET_INFO = [
  {
    id: 'prediction-set-1',
    title: 'Prediction Set 1',
    description: '30 authentic PPB-style MCQs, SAQs, and essays covering all 17 therapeutic units with detailed clinical explanations.',
    icon: Target,
    color: 'amber',
    gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
    border: 'border-amber-500/20',
  },
  {
    id: 'prediction-set-2',
    title: 'Prediction Set 2',
    description: '30 questions focusing on complex case scenarios, drug therapy problems, and regulatory pharmacy practice.',
    icon: BookOpen,
    color: 'purple',
    gradient: 'from-purple-500/20 via-purple-500/5 to-transparent',
    border: 'border-purple-500/20',
  },
  {
    id: 'prediction-set-3',
    title: 'Prediction Set 3',
    description: '30 questions covering advanced therapeutics, toxicology, emergency care, and specialty pharmacy practice.',
    icon: TrendingUp,
    color: 'emerald',
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    border: 'border-emerald-500/20',
  },
]

const SET_NUMBER: Record<string, 1 | 2 | 3> = {
  'prediction-set-1': 1,
  'prediction-set-2': 2,
  'prediction-set-3': 3,
}

const getSelectedLetter = (opt: string) => opt.charAt(0).toUpperCase()

function QuestionCard({
  question,
  number,
  total,
  onNext,
  isLast,
}: {
  question: BoardExamQuestion
  number: number
  total: number
  onNext: () => void
  isLast: boolean
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    setSelectedAnswer(null)
    setIsAnswered(false)
    setShowExplanation(false)
  }, [question.id])

  const selectedLetter = selectedAnswer ? getSelectedLetter(selectedAnswer) : null
  const correctLetter = question.correctAnswer.trim().toUpperCase()
  const isCorrect = isAnswered && selectedLetter === correctLetter

  const getOptionStyle = (opt: string) => {
    const letter = getSelectedLetter(opt)
    if (!isAnswered) {
      return selectedAnswer === opt
        ? 'border-[var(--primary)] bg-[var(--primary)]/5'
        : 'border-[var(--border)] hover:border-[var(--primary)]/50'
    }
    if (letter === correctLetter) return 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    if (selectedAnswer === opt && letter !== correctLetter) return 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
    return 'border-[var(--border)] opacity-50'
  }

  const typeLabel = question.type === 'mcq' ? 'MCQ' : question.type === 'saq' ? 'SAQ' : 'Essay'
  const diffColor =
    question.difficulty === 'easy'
      ? 'text-emerald-500 bg-emerald-500/10'
      : question.difficulty === 'medium'
        ? 'text-amber-500 bg-amber-500/10'
        : 'text-red-500 bg-red-500/10'

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-bold text-[var(--text-muted)] bg-[var(--bg)] px-3 py-1 rounded-full">
          Q{number}/{total}
        </span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${diffColor}`}>
          {typeLabel} &middot; {question.difficulty}
        </span>
        <span className="text-xs text-[var(--text-muted)] ml-auto">
          {question.source} ({question.year})
        </span>
      </div>

      <p className="font-semibold text-[var(--text)] mb-5 leading-relaxed">{question.question}</p>

      {question.type === 'mcq' && question.options && (
        <div className="space-y-2 mb-5">
          {question.options.map((opt) => {
            const letter = getSelectedLetter(opt)
            const isCorrectOpt = letter === correctLetter
            const isSelectedOpt = selectedAnswer === opt
            return (
              <button
                key={opt}
                onClick={() => {
                  if (!isAnswered) setSelectedAnswer(opt)
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all text-sm ${getOptionStyle(opt)}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[var(--bg)] flex items-center justify-center text-xs font-bold shrink-0">
                    {letter}
                  </span>
                  <span className="flex-1">{opt.substring(3)}</span>
                  {isAnswered && isCorrectOpt && (
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  )}
                  {isAnswered && isSelectedOpt && !isCorrectOpt && (
                    <AlertCircle size={16} className="text-red-500 shrink-0" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {(question.type === 'saq' || question.type === 'essay') && (
        <div className="mb-5">
          <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-4 min-h-[80px]">
            {isAnswered ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-[var(--text-muted)] italic mb-2">Model answer:</p>
                <p className="whitespace-pre-wrap text-sm">{question.correctAnswer}</p>
              </div>
            ) : (
              <p className="text-[var(--text-muted)] text-sm italic">
                Write your answer, then tap Reveal Answer to check.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        {!isAnswered ? (
          <button
            onClick={() => {
              setIsAnswered(true)
              setShowExplanation(true)
            }}
            disabled={selectedAnswer === null && question.type === 'mcq'}
            className="px-5 py-2.5 bg-[var(--primary)] text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all disabled:opacity-40"
          >
            {question.type === 'mcq' ? 'Verify Answer' : 'Reveal Answer'}
          </button>
        ) : (
          <>
            {isAnswered && isCorrect && question.type === 'mcq' && (
              <span className="text-sm font-bold text-emerald-500 flex items-center gap-1">
                <CheckCircle2 size={16} /> Correct
              </span>
            )}
            {isAnswered && !isCorrect && question.type === 'mcq' && (
              <span className="text-sm font-bold text-red-500 flex items-center gap-1">
                <AlertCircle size={16} /> Incorrect
              </span>
            )}
            {isAnswered && !isLast && (
              <button
                onClick={onNext}
                className="ml-auto px-5 py-2.5 bg-[var(--primary)] text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2"
              >
                Next <ChevronRight size={14} />
              </button>
            )}
          </>
        )}
      </div>

      {showExplanation && (
        <div className="mt-5 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className="text-purple-500" />
            <span className="text-sm font-bold text-purple-500">Clinical Explanation</span>
          </div>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}

export default function BoardExamScreen() {
  const navigate = useNavigate()
  const { setId } = useParams<{ setId: string }>()
  const [selectedSet, setSelectedSet] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Sync URL param → selected set for back/forward navigation
  useEffect(() => {
    if (setId && setId !== selectedSet) {
      setSelectedSet(setId)
      setCurrentIndex(0)
    } else if (!setId && selectedSet) {
      setSelectedSet(null)
      setCurrentIndex(0)
    }
  }, [setId])

  const setNumber = selectedSet ? SET_NUMBER[selectedSet] : null
  const questions = setNumber ? getQuestionsByPredictionSet(setNumber) : []

  const handleBack = () => {
    if (selectedSet) {
      navigate('/board-exam')
    } else {
      navigate('/')
    }
  }

  const handleDownloadResults = () => {
    const content = questions
      .map(
        (q, i) =>
          `**Question ${i + 1}** (${q.type.toUpperCase()} | ${q.difficulty})\n\n${q.question}\n\n` +
          (q.options ? `Options:\n${q.options.map((o) => `  ${o}`).join('\n')}\n\n` : '') +
          `**Answer:** ${q.correctAnswer}\n\n**Explanation:** ${q.explanation}\n`
      )
      .join('\n---\n\n')

    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Clinova_Board_Exam_${selectedSet || 'all'}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const current = questions[currentIndex]
  const isLast = currentIndex === questions.length - 1

  if (!selectedSet) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <button onClick={handleBack} className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <GraduationCap size={20} className="text-amber-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Board Exam Prep</h1>
              <p className="text-sm text-[var(--text-muted)]">Pharmacy and Poisons Board (Kenya) — PPB Stage I &amp; II</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs bg-[var(--surface)] border border-[var(--border)] px-3 py-1 rounded-full">
              {BOARD_EXAM_QUESTIONS.length} Questions
            </span>
            <span className="text-xs bg-[var(--surface)] border border-[var(--border)] px-3 py-1 rounded-full">
              3 Prediction Sets
            </span>
            <span className="text-xs bg-[var(--surface)] border border-[var(--border)] px-3 py-1 rounded-full">
              Sources: PPB &middot; JKUAT &middot; MKU &middot; Maseno
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 sm:mb-8">
          {SET_INFO.map((set) => {
            const qs = getQuestionsByPredictionSet(SET_NUMBER[set.id])
            const mcqCount = qs.filter((q) => q.type === 'mcq').length
            const saqCount = qs.filter((q) => q.type === 'saq').length
            const essayCount = qs.filter((q) => q.type === 'essay').length

            return (
              <button
                key={set.id}
                onClick={() => navigate('/board-exam/' + set.id)}
                className={`text-left bg-[var(--surface)] border ${set.border} rounded-2xl p-5 hover:shadow-md transition-all group relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${set.gradient} opacity-50`} />
                <div className="relative">
                  <div className={`w-10 h-10 rounded-xl bg-${set.color}-500/15 flex items-center justify-center mb-3`}>
                    <set.icon size={20} className={`text-${set.color}-500`} />
                  </div>
                  <h3 className="font-bold text-sm mb-1 group-hover:text-[var(--primary)] transition-colors">{set.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">{set.description}</p>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span>{mcqCount} MCQs</span>
                    <span>{saqCount} SAQs</span>
                    <span>{essayCount} Essays</span>
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-xs font-bold text-[var(--primary)] group-hover:gap-2 transition-all">
                    Start Practice <ChevronRight size={12} />
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-[var(--primary)]" />
            <h3 className="font-bold text-sm">Exam Guide &amp; Strategy</h3>
          </div>
          <div className="space-y-2 text-sm text-[var(--text-muted)]">
            <p><strong>Stage I:</strong> For foreign degree holders — 100 MCQs · 15 SAQs · 3 Essays (3 hours)</p>
            <p><strong>Stage II:</strong> For Kenyan graduates after internship — same structure</p>
            <p><strong>Frequency:</strong> Exams held twice yearly (May/June &amp; October/November)</p>
            <p><strong>Clinical Pharmacy topics:</strong> CV, Respiratory, Endocrine, GI, Renal, ID, Neuro, Psychiatry, Oncology, Haematology, Rheumatology, Dermatology, Ophthalmology, ENT, OBGYN, Paediatrics, Critical Care, Toxicology</p>
            <p><strong>Pass mark:</strong> 50% overall with no section below 40%</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <button onClick={handleBack} className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] mb-4 transition-colors">
        <ArrowLeft size={16} />
        Back to Prediction Sets
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold">{SET_INFO.find((s) => s.id === selectedSet)?.title}</h2>
          <p className="text-xs text-[var(--text-muted)]">{questions.length} questions &middot; Mixed types</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleDownloadResults} className="px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-xs font-bold hover:border-[var(--primary)] transition-all flex items-center gap-1.5">
            <Download size={14} />
            Download All
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-6">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all flex-1 ${
              i === currentIndex
                ? 'bg-[var(--primary)]'
                : i < currentIndex
                  ? 'bg-[var(--primary)]/30'
                  : 'bg-[var(--border)]'
            }`}
          />
        ))}
      </div>

      {current && (
        <QuestionCard
          question={current}
          number={currentIndex + 1}
          total={questions.length}
          onNext={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
          isLast={isLast}
        />
      )}

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm font-bold disabled:opacity-30 hover:border-[var(--primary)] transition-all"
        >
          Previous
        </button>
        <span className="text-xs text-[var(--text-muted)]">
          {currentIndex + 1} of {questions.length}
        </span>
        <button
          onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
          disabled={currentIndex === questions.length - 1}
          className="px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm font-bold disabled:opacity-30 hover:border-[var(--primary)] transition-all"
        >
          Next
        </button>
      </div>
    </div>
  )
}
