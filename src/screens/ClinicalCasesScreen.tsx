import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Loader2, X, BookOpen, 
  Lightbulb, CheckCircle2, ChevronRight, BookMarked, Trash2, 
  BookOpenCheck, PenTool, Award, HelpCircle, ArrowRight, Trophy,
  Bookmark, Share2, Sparkles, ThumbsUp, Check, ExternalLink,
  Link, FileDown, FileText
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { 
  collection, getDocs, addDoc, deleteDoc, doc, updateDoc, 
  query, orderBy, Timestamp 
} from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-diagnostics';
import { jsPDF } from 'jspdf';
import { Patient } from '../components/PatientQuickSummary';

interface ClinicalCase {
  id: string;
  title: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  scenario: string;
  learningPoints: string;
  createdAt: any;
  status: 'published' | 'draft';
  createdBy: string;
  createdByName: string;
  likesCount?: number;
  likedBy?: string[];
}

const CURATED_CASES: ClinicalCase[] = [
  {
    id: 'curated-1',
    title: 'Digoxin Toxicity & Severe Hypokalemia in Geriatric Heart Failure',
    topic: 'Cardiology',
    difficulty: 'Advanced',
    scenario: `An 82-year-old female presents to the Emergency Department complaining of severe progressive fatigue, anorexia, nausea, and experiencing "yellow-green halos" around lights for the past 3 days.

=== CLINICAL PRESENTATION ===
- Vitals: HR 46 bpm (irregularly irregular), BP 98/54 mmHg, RR 18 breaths/min, Temp 36.6°C.
- ECG: Atrial fibrillation with slow ventricular response (45 bpm), frequent PVCs, and scooping of the ST-segment ("digoxin effect").

=== MEDICAL REGIMEN ===
- Digoxin 0.25 mg daily (for atrial fibrillation & HFrEF)
- Furosemide 40 mg daily (for chronic edema)
- Lisinopril 10 mg daily (for hypertension)

=== LAB RESULTS ===
- Serum Creatinine: 2.1 mg/dL (Baseline baseline: 0.9 mg/dL)
- eGFR: 22 mL/min/1.73m² (indicates stage 4 CKD)
- Serum Potassium: 3.1 mEq/L (Normal range: 3.5 - 5.0 mEq/L)
- Serum Digoxin Concentration: 3.4 ng/mL (Therapeutic range in HF: 0.5 - 0.9 ng/mL)

=== REFERENCE TEXTBOOK CASE ===
Source: Clinical Cases in Clinical Pharmacology (State Medical and Pharmaceutical University Library).`,
    learningPoints: `1. **Pharmacokinetics and Aging (Critical Clearance)**: Digoxin is primarily cleared by the kidneys (approx. 70%). Aging declines glomerular filtration. A daily dose of 0.25 mg is too high for geriatric patients, leading to accumulation.
2. **Drug-Related Problems (DRP) - Hypokalemia Interaction**: Concomitant use of Furosemide (loop diuretic) without potassium-sparing agents or potassium supplements caused hypokalemia. Hypokalemia increases digoxin binding to the Na+/K+ ATPase pump, exacerbating toxicity even at lower serum levels.
3. **Guideline-Directed Resolution**:
   - Hold Digoxin and Furosemide immediately.
   - Gently correct potassium deficits (target > 4.0 mEq/L) with IV/Oral Potassium, but avoid rapid hyperkalemia.
   - For life-threatening arrhythmias or hemodynamically unstable digoxin toxicity, administer Digoxin-specific antibody fragments (Digibind/Digifab).
   - In the future, optimize HFrEF with renal-adjusted GDMT (such as low-dose ACEi/ARB or ARNI, and beta-blockers when stable, avoiding digoxin if possible).`,
    createdAt: null,
    status: 'published',
    createdBy: 'system-curated',
    createdByName: 'Clinical Pharmacology Textbook'
  },
  {
    id: 'curated-2',
    title: 'Sulfonylurea-Induced Recurrent Hypoglycemia in Type 2 Diabetes',
    topic: 'Endocrinology',
    difficulty: 'Intermediate',
    scenario: `A 65-year-old male with a 12-year history of Type 2 Diabetes Mellitus visits the outpatient pharmaceutical care clinic.

=== CLINICAL PRESENTATION ===
- Chief Complaint: Recurrent "cold sweats", hand tremors, heart palpitations, and extreme confusion occurring late in the afternoon (around 4:00 PM to 5:00 PM), about 3 to 4 times a week.
- Patient states these episodes are worse on days when he works late and delays his evening meal.
- Vitals: BP 132/78 mmHg, HR 72 bpm, BMI 29.4 kg/m².

=== CURRENT MEDICATIONS ===
- Metformin 1000 mg twice daily with meals.
- Glimepiride 4 mg once daily in the morning.

=== LAB RESULTS ===
- HbA1c: 8.2% (Target: < 7.0%)
- Serum Creatinine: 1.1 mg/dL (eGFR 68 mL/min/1.73m²)

=== REFERENCE TEXTBOOK CASE ===
Source: Clinical Pharmacy and Pharmaceutical Care in Clinical Cases Workbook (ResearchGate).`,
    learningPoints: `1. **Drug-Related Problem (Safety/Adverse Event)**: The patient is experiencing recurrent moderate hypoglycemia due to Glimepiride, a long-acting sulfonylurea. Sulfonylureas trigger insulin release independently of ambient glucose levels, putting patients at risk when meals are delayed.
2. **Clinical Paradox**: Despite active hypoglycemia, his overall glycemic control (HbA1c 8.2%) is poor. This is because sulfonylurea-induced hypoglycemia often causes compensatory overeating (or defense snacking), causing rebound hyperglycemia and poor overall control.
3. **Guideline-Directed Management**:
   - Discontinue or taper down Glimepiride.
   - Replace with a safer oral anti-hyperglycemic agent that carries a low risk of hypoglycemia, such as an SGLT2 Inhibitor (e.g. Empagliflozin 10 mg daily) or a DPP-4 Inhibitor (e.g. Sitagliptin 100 mg daily), especially given his age and eGFR.
   - Educate the patient on the "Rule of 15" (consume 15g fast-acting sugar, re-test glucose in 15 mins) and the importance of consistent meal times.`,
    createdAt: null,
    status: 'published',
    createdBy: 'system-curated',
    createdByName: 'Pharmaceutical Care Workbook'
  },
  {
    id: 'curated-3',
    title: 'Empiric Antibiotic Therapy in Outpatient Community-Acquired Pneumonia (CAP)',
    topic: 'Infectious Disease',
    difficulty: 'Beginner',
    scenario: `A 34-year-old previously healthy male presents to the primary care clinic with a 5-day history of productive cough (greenish-rust colored sputum), high fever, shaking chills, and pleuritic chest pain on the right side.

=== CLINICAL PRESENTATION ===
- Vitals: BP 118/76 mmHg, HR 88 bpm, RR 18 breaths/min, Temp 38.8°C, SpO2 96% on room air.
- Physical Exam: Bronchial breath sounds and crackles in the right lower lobe.
- Chest X-Ray: Right lower lobe alveolar consolidation.
- CURB-65 Score: 0 (Confusion: No, Urea: Normal, RR < 30: Yes, BP normal: Yes, Age < 65: Yes), indicating safe candidacy for outpatient therapy.
- Medical History: Healthy, active, non-smoker, has no chronic comorbidities, no drug allergies, and has not taken any antibiotics in the preceding 90 days.

=== REFERENCE TEXTBOOK CASE ===
Source: Clinical Pharmacy: Case Studies (USC Faculty Series).`,
    learningPoints: `1. **First-line Outpatient CAP Selection**: According to ATS/IDSA guidelines, healthy outpatients with no comorbidities or risk factors for MRSA/Pseudomonas should receive:
   - Amoxicillin 1g orally three times daily OR
   - Doxycycline 100 mg orally twice daily OR
   - A macrolide (e.g., Azithromycin 500 mg Day 1, then 250 mg daily) ONLY if local macrolide resistance is < 25%.
2. **Guideline-Directed Stewardship**: Broader spectrum agents like respiratory fluoroquinolones (e.g., Levofloxacin 750 mg daily) or beta-lactam + macrolide combinations should be reserved for patients with significant comorbidities (e.g., COPD, Chronic Kidney Disease, Heart Failure) or recent antibiotic use, to avoid excessive side effects and prevent microbial resistance.
3. **Counseling Pearls**: Finished entire 5-day antibiotic course, remain hydrated, and return immediately if experiencing worsening shortness of breath or persistent fevers after 48-72 hours.`,
    createdAt: null,
    status: 'published',
    createdBy: 'system-curated',
    createdByName: 'USC Faculty Case Series'
  }
];

export default function ClinicalCasesScreen() {
  const { userData } = useAuth();
  const [cases, setCases] = useState<ClinicalCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Tab management: session = AI Session cases, textbook = standard, saved = portfolio, shared = community network
  const [activeTab, setActiveTab] = useState<'session' | 'textbook' | 'saved' | 'shared'>('session');
  
  // AI Extraction States
  const [sessionCases, setSessionCases] = useState<ClinicalCase[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionTopic, setExtractionTopic] = useState('Cardiology');
  const [extractionBook, setExtractionBook] = useState('Clinical Cases in Clinical Pharmacology');

  // Saved & Shared Cases Portfolio States
  const [savedCases, setSavedCases] = useState<ClinicalCase[]>([]);
  const [sharedCases, setSharedCases] = useState<ClinicalCase[]>([]);
  const [isSavedLoading, setIsSavedLoading] = useState(false);
  const [isSharedLoading, setIsSharedLoading] = useState(false);

  // Interactive learning workflow states
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
  const [subTab, setSubTab] = useState<'scenario' | 'reflect' | 'guideline'>('scenario');
  
  // Patient Context States
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');

  useEffect(() => {
    const fetchPatientsList = async () => {
      try {
        const qSnapshot = await getDocs(collection(db, 'patients'));
        const list: Patient[] = [];
        qSnapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Patient);
        });
        setPatients(list);
      } catch (err) {
        console.error('Error loading patients context in ClinicalCasesScreen:', err);
      }
    };
    fetchPatientsList();
  }, []);
  
  // Persistence state
  const [userReflections, setUserReflections] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('clinova_reflections');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [revealedCases, setRevealedCases] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('clinova_revealed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [masteredCases, setMasteredCases] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('clinova_mastered');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states for creating new custom cases (Textbook list only)
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState('Cardiology');
  const [newDifficulty, setNewDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [newScenario, setNewScenario] = useState('');
  const [newLearningPoints, setNewLearningPoints] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto save persistence
  useEffect(() => {
    localStorage.setItem('clinova_reflections', JSON.stringify(userReflections));
  }, [userReflections]);

  useEffect(() => {
    localStorage.setItem('clinova_revealed', JSON.stringify(revealedCases));
  }, [revealedCases]);

  useEffect(() => {
    localStorage.setItem('clinova_mastered', JSON.stringify(masteredCases));
  }, [masteredCases]);

  // Listen for storage changes (e.g., from Supabase Sync restoration)
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedReflections = localStorage.getItem('clinova_reflections');
        if (savedReflections) {
          const parsed = JSON.parse(savedReflections);
          // Only update if actually different to prevent re-renders
          if (JSON.stringify(parsed) !== JSON.stringify(userReflections)) {
            setUserReflections(parsed);
          }
        }
        
        const savedRevealed = localStorage.getItem('clinova_revealed');
        if (savedRevealed) {
          const parsed = JSON.parse(savedRevealed);
          if (JSON.stringify(parsed) !== JSON.stringify(revealedCases)) {
            setRevealedCases(parsed);
          }
        }
        
        const savedMastered = localStorage.getItem('clinova_mastered');
        if (savedMastered) {
          const parsed = JSON.parse(savedMastered);
          if (JSON.stringify(parsed) !== JSON.stringify(masteredCases)) {
            setMasteredCases(parsed);
          }
        }
      } catch (e) {
        console.warn("Failed to load synced local storage keys", e);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('clinova-storage-synced', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('clinova-storage-synced', handleStorageChange);
    };
  }, [userReflections, revealedCases, masteredCases]);

  const triggerRandomRotation = (isAuto: boolean = false) => {
    const user = auth.currentUser;
    if (!user) return;

    let TOPICS = [
      "Cardiology",
      "Endocrinology",
      "Infectious Disease",
      "Nephrology",
      "Neurology",
      "Oncology",
      "Critical Care"
    ];

    if (userData?.clinicalInterests && userData.clinicalInterests.length > 0) {
      TOPICS = userData.clinicalInterests;
    }

    const BOOK_SOURCES = [
      "Clinical Cases in Clinical Pharmacology",
      "Clinical Pharmacy & Pharmaceutical Care",
      "Clinical Pharmacy: Case Studies",
      "Pharmacy Case Studies"
    ];

    const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const randomBook = BOOK_SOURCES[Math.floor(Math.random() * BOOK_SOURCES.length)];

    setExtractionTopic(randomTopic);
    setExtractionBook(randomBook);

    localStorage.setItem(`clinova_rotation_topic_${user.uid}`, randomTopic);
    localStorage.setItem(`clinova_rotation_book_${user.uid}`, randomBook);
    sessionStorage.setItem(`clinova_session_loaded_${user.uid}`, 'true');

    extractAICases(randomTopic, randomBook, isAuto);
  };

  // Load resources based on login status
  useEffect(() => {
    const user = auth.currentUser;
    fetchCases();
    fetchSharedCases();

    if (user) {
      fetchSavedCases();
      
      const sessionLoaded = sessionStorage.getItem(`clinova_session_loaded_${user.uid}`);
      const stored = localStorage.getItem(`clinova_session_cases_${user.uid}`);
      const savedTopic = localStorage.getItem(`clinova_rotation_topic_${user.uid}`);
      const savedBook = localStorage.getItem(`clinova_rotation_book_${user.uid}`);

      if (savedTopic) setExtractionTopic(savedTopic);
      if (savedBook) setExtractionBook(savedBook);

      if (stored && sessionLoaded) {
        try {
          setSessionCases(JSON.parse(stored));
        } catch {
          triggerRandomRotation(true);
        }
      } else {
        // Automatically generate different cases on fresh login/session to keep user intrigued!
        triggerRandomRotation(true);
      }
    } else {
      setSessionCases([]);
      setSavedCases([]);
    }
  }, [auth.currentUser]);

  const extractAICases = async (topic: string, bookName: string, isAuto: boolean = false) => {
    const user = auth.currentUser;
    if (!user) return;

    setIsExtracting(true);
    try {
      const res = await fetch('/api/gemini/extract-cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, bookName })
      });

      if (!res.ok) {
        throw new Error('AI extraction failed');
      }

      const data = await res.json();
      
      const extractedList: ClinicalCase[] = data.map((c: any, index: number) => ({
        id: `ai-extracted-${Date.now()}-${index}`,
        title: c.title,
        topic: c.topic || topic,
        difficulty: c.difficulty || 'Intermediate',
        scenario: c.scenario,
        learningPoints: c.learningPoints,
        createdAt: new Date().toISOString(),
        status: 'published',
        createdBy: 'ai-extracted',
        createdByName: bookName || 'AI Extracted Textbook Case'
      }));

      setSessionCases(extractedList);
      localStorage.setItem(`clinova_session_cases_${user.uid}`, JSON.stringify(extractedList));
      localStorage.setItem(`clinova_rotation_topic_${user.uid}`, topic);
      localStorage.setItem(`clinova_rotation_book_${user.uid}`, bookName);
    } catch (error) {
      console.error('Case extraction error:', error);
      if (!isAuto) {
        alert('AI case extraction failed. Please check your internet connection or try again later.');
      }
    } finally {
      setIsExtracting(false);
    }
  };

  const fetchCases = async () => {
    setIsLoading(true);
    const path = 'clinical_cases';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const caseList: ClinicalCase[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        caseList.push({
          id: docSnap.id,
          title: data.title || 'Untitled Case',
          topic: data.topic || 'General Practice',
          difficulty: data.difficulty || 'Intermediate',
          scenario: data.scenario || 'No scenario provided.',
          learningPoints: data.learningPoints || 'No learning points documented.',
          createdAt: data.createdAt,
          status: 'published',
          createdBy: data.createdBy || '',
          createdByName: data.createdByName || 'Clinical Educator',
        });
      });
      setCases(caseList);
    } catch (error) {
      console.warn("Firestore clinical_cases collection read skipped or empty.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPDF = (c: ClinicalCase) => {
    if (!c) return;

    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yOffset = 20;

    // Helper to add a new page with running footer
    const addNewPage = () => {
      // Draw running footer on current page before adding a new one
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Clinova CoreOS - Automated Clinical Portlet Summary", margin, pageHeight - 12);
      doc.text(`Page ${doc.internal.pages.length - 1}`, pageWidth - margin - 15, pageHeight - 12);

      doc.addPage();
      yOffset = 20;
      drawHeaderBand(true);
    };

    const checkSpace = (needed: number) => {
      if (yOffset + needed > pageHeight - 25) {
        addNewPage();
      }
    };

    const drawHeaderBand = (isSubsequentPage = false) => {
      // Draw a sleek top border line or decorative banner
      doc.setFillColor(30, 58, 138); // Navy
      doc.rect(0, 0, pageWidth, 8, 'F');
      yOffset = Math.max(yOffset, 15);

      if (!isSubsequentPage) {
        // Document Title Block
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(30, 58, 138);
        doc.text("CLINICAL CASE STUDY SUMMARY", margin, yOffset + 10);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text("Clinova CoreOS • Diagnostic & Therapeutic Review Portlet", margin, yOffset + 15);
        
        // Horizontal divider line
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.5);
        doc.line(margin, yOffset + 19, pageWidth - margin, yOffset + 19);
        
        yOffset += 26;
      }
    };

    drawHeaderBand(false);

    // Section 1: CASE STUDY METADATA
    checkSpace(40);
    doc.setFillColor(248, 250, 252); // Soft light background
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, yOffset, contentWidth, 32, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text("CASE METADATA", margin + 6, yOffset + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    
    // Left Column
    doc.text(`Title: ${c.title.length > 55 ? c.title.substring(0, 52) + '...' : c.title}`, margin + 6, yOffset + 13);
    doc.text(`Topic / Therapeutic Area: ${c.topic}`, margin + 6, yOffset + 19);
    doc.text(`Difficulty: ${c.difficulty}`, margin + 6, yOffset + 25);

    // Right Column
    const authorName = c.createdByName || 'Clinova Clinical Faculty';
    doc.text(`Author: ${authorName}`, margin + 100, yOffset + 13);
    doc.text(`Review Date: ${new Date().toLocaleDateString()}`, margin + 100, yOffset + 19);
    const userEmail = auth.currentUser?.email || 'N/A';
    doc.text(`Reviewer: ${userEmail}`, margin + 100, yOffset + 25);

    yOffset += 40;

    // Section 2: LINKED PATIENT CONTEXT (LEVERAGING EXISTING PATIENT DATA CONTEXT)
    const selectedPatient = patients.find(p => p.id === selectedPatientId);
    if (selectedPatient) {
      checkSpace(65);
      doc.setFillColor(239, 246, 255); // Blue tint light bg
      doc.setDrawColor(191, 219, 254);
      doc.rect(margin, yOffset, contentWidth, 54, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(29, 78, 216); // Blue-700
      doc.text("🔗 ASSOCIATED PATIENT CLINICAL CONTEXT", margin + 6, yOffset + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);

      // Col 1: Demographics
      doc.setFont('helvetica', 'bold');
      doc.text("Patient Demographics:", margin + 6, yOffset + 13);
      doc.setFont('helvetica', 'normal');
      doc.text(`Initials/Name: ${selectedPatient.name}`, margin + 6, yOffset + 19);
      doc.text(`IP Number: ${selectedPatient.ipNumber}`, margin + 6, yOffset + 25);
      doc.text(`Age / Sex: ${selectedPatient.age}y / ${selectedPatient.sex}`, margin + 6, yOffset + 31);
      doc.text(`Location: ${selectedPatient.ward}`, margin + 6, yOffset + 37);
      doc.text(`Last Admission: ${selectedPatient.lastAdmission}`, margin + 6, yOffset + 43);

      // Col 2: Vitals
      doc.setFont('helvetica', 'bold');
      doc.text("Real-time Vitals:", margin + 65, yOffset + 13);
      doc.setFont('helvetica', 'normal');
      doc.text(`Blood Pressure: ${selectedPatient.vitals?.bp || 'N/A'} mmHg`, margin + 65, yOffset + 19);
      doc.text(`Heart Rate: ${selectedPatient.vitals?.hr || 'N/A'} bpm`, margin + 65, yOffset + 25);
      doc.text(`Temperature: ${selectedPatient.vitals?.temp || 'N/A'} °C`, margin + 65, yOffset + 31);
      doc.text(`Respiratory Rate: ${selectedPatient.vitals?.rr || 'N/A'} breaths/min`, margin + 65, yOffset + 37);
      doc.text(`Oxygen Saturation: ${selectedPatient.vitals?.spo2 || 'N/A'}% SpO2`, margin + 65, yOffset + 43);

      // Col 3: Alerts or Labs snippet
      doc.setFont('helvetica', 'bold');
      doc.text("Clinical Safety Flags:", margin + 120, yOffset + 13);
      doc.setFont('helvetica', 'normal');
      
      const activeAlerts = selectedPatient.alerts || [];
      if (activeAlerts.length > 0) {
        activeAlerts.slice(0, 3).forEach((alert, idx) => {
          const alertText = `• [${alert.type.toUpperCase()}] ${alert.message}`;
          const splitAlert = doc.splitTextToSize(alertText, 45);
          doc.text(splitAlert[0] || '', margin + 120, yOffset + 19 + (idx * 9));
        });
      } else {
        doc.setTextColor(100, 116, 139);
        doc.text("• No active clinical alerts", margin + 120, yOffset + 19);
        doc.text("• Hemodynamically stable", margin + 120, yOffset + 25);
      }

      yOffset += 62;
    }

    // Section 3: CLINICAL PATIENT PRESENTATION / SCENARIO
    checkSpace(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text("1. CLINICAL PRESENTATION & CASE VIGNETTE", margin, yOffset);
    yOffset += 4;
    
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, yOffset, pageWidth - margin, yOffset);
    yOffset += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    
    const splitScenario = doc.splitTextToSize(c.scenario, contentWidth);
    splitScenario.forEach((line: string) => {
      checkSpace(6);
      doc.text(line, margin, yOffset);
      yOffset += 5.2;
    });

    yOffset += 10;

    // Section 4: YOUR DIAGNOSTIC INTERVENTION PLAN (NOTES)
    checkSpace(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text("2. FORMULATED THERAPEUTIC & INTERVENTION PLAN", margin, yOffset);
    yOffset += 4;

    doc.line(margin, yOffset, pageWidth - margin, yOffset);
    yOffset += 6;

    const userNote = userReflections[c.id] || "No clinical reasoning or care plan notes drafted for this case study.";
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);

    const splitNotes = doc.splitTextToSize(userNote, contentWidth);
    splitNotes.forEach((line: string) => {
      checkSpace(6);
      doc.text(line, margin, yOffset);
      yOffset += 5.2;
    });

    yOffset += 10;

    // Section 5: GUIDELINE RESOLUTION & KEY CLINICAL LEARNED POINTS
    checkSpace(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text("3. TEXTBOOK GUIDELINE RESOLUTION & LEARNING POINTS", margin, yOffset);
    yOffset += 4;

    doc.line(margin, yOffset, pageWidth - margin, yOffset);
    yOffset += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);

    const splitPoints = doc.splitTextToSize(c.learningPoints, contentWidth);
    splitPoints.forEach((line: string) => {
      checkSpace(6);
      doc.text(line, margin, yOffset);
      yOffset += 5.2;
    });

    yOffset += 12;

    // Section 6: EVALUATION STATUS
    checkSpace(25);
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.rect(margin, yOffset, contentWidth, 18, 'FD');

    const isMastered = masteredCases.includes(c.id);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text("MASTERY STATUS:", margin + 6, yOffset + 11);

    doc.setFont('helvetica', 'bold');
    if (isMastered) {
      doc.setTextColor(22, 101, 52); // Green-800
      doc.text("MASTERED ✓  (The student has reviewed standard reference criteria and verified proficiency.)", margin + 43, yOffset + 11);
    } else {
      doc.setTextColor(194, 65, 12); // Orange-700
      doc.text("UNDER REVIEW  (Currently being evaluated in the student's clinical portfolio.)", margin + 43, yOffset + 11);
    }

    // Write final footer on current page
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Clinova CoreOS - Automated Clinical Portlet Summary", margin, pageHeight - 12);
    doc.text(`Page ${doc.internal.pages.length - 1}`, pageWidth - margin - 15, pageHeight - 12);

    // Save
    const sanitizedTitle = c.title.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 35);
    doc.save(`Clinova_CaseSummary_${sanitizedTitle}.pdf`);
  };

  const handleSaveToPortfolio = async (c: ClinicalCase) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to save clinical cases to your personal portfolio.");
      return;
    }

    const path = 'saved_cases';
    try {
      const alreadySaved = savedCases.some(sc => sc.scenario === c.scenario || sc.title === c.title);
      if (alreadySaved) {
        alert("This clinical case is already saved in your portfolio.");
        return;
      }

      const caseData = {
        title: c.title,
        topic: c.topic,
        difficulty: c.difficulty,
        scenario: c.scenario,
        learningPoints: c.learningPoints,
        savedBy: user.uid,
        savedByName: user.displayName || user.email?.split('@')[0] || 'Clinova Scholar',
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, path), caseData);
      alert("Case successfully added to your Saved Portfolio!");
      await fetchSavedCases();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const fetchSavedCases = async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    setIsSavedLoading(true);
    const path = 'saved_cases';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const list: ClinicalCase[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.savedBy === user.uid) {
          list.push({
            id: docSnap.id,
            title: data.title,
            topic: data.topic,
            difficulty: data.difficulty as any,
            scenario: data.scenario,
            learningPoints: data.learningPoints,
            createdAt: data.createdAt,
            status: 'published',
            createdBy: 'saved',
            createdByName: data.savedByName || 'Clinova Scholar'
          });
        }
      });
      setSavedCases(list);
    } catch (error) {
      console.warn("Firestore saved_cases read error:", error);
    } finally {
      setIsSavedLoading(false);
    }
  };

  const handleShareCase = async (c: ClinicalCase) => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to publish cases to the Shared Network.");
      return;
    }

    const path = 'shared_cases';
    try {
      const alreadyShared = sharedCases.some(sc => sc.scenario === c.scenario || sc.title === c.title);
      if (alreadyShared) {
        alert("This clinical case has already been shared on the Clinova network.");
        return;
      }

      const caseData = {
        title: c.title,
        topic: c.topic,
        difficulty: c.difficulty,
        scenario: c.scenario,
        learningPoints: c.learningPoints,
        sharedBy: user.uid,
        sharedByName: user.displayName || user.email?.split('@')[0] || 'Clinova Scholar',
        createdAt: Timestamp.now(),
        likesCount: 0,
        likedBy: []
      };

      await addDoc(collection(db, path), caseData);
      
      const shareUrl = `${window.location.origin}/clinical-cases?caseId=${c.id}`;
      navigator.clipboard.writeText(shareUrl).catch(() => {});
      
      alert(`Case successfully shared with the Clinova Medical Network!\nClipboard updated with case link.`);
      await fetchSharedCases();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const fetchSharedCases = async () => {
    setIsSharedLoading(true);
    const path = 'shared_cases';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const list: ClinicalCase[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          title: data.title,
          topic: data.topic,
          difficulty: data.difficulty as any,
          scenario: data.scenario,
          learningPoints: data.learningPoints,
          createdAt: data.createdAt,
          status: 'published',
          createdBy: 'shared',
          createdByName: data.sharedByName || 'Anonymous Clinician',
          likesCount: data.likesCount || 0,
          likedBy: data.likedBy || []
        });
      });
      setSharedCases(list);
    } catch (error) {
      console.warn("Firestore shared_cases read skipped or empty.");
    } finally {
      setIsSharedLoading(false);
    }
  };

  const handleLikeSharedCase = async (caseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to upvote shared cases.");
      return;
    }

    const path = `shared_cases/${caseId}`;
    try {
      const target = sharedCases.find(sc => sc.id === caseId);
      if (!target) return;

      const likedBy = target.likedBy || [];
      let newLikes = target.likesCount || 0;
      let newLikedBy = [...likedBy];

      if (likedBy.includes(user.uid)) {
        newLikes = Math.max(0, newLikes - 1);
        newLikedBy = newLikedBy.filter(uid => uid !== user.uid);
      } else {
        newLikes += 1;
        newLikedBy.push(user.uid);
      }

      await updateDoc(doc(db, 'shared_cases', caseId), {
        likesCount: newLikes,
        likedBy: newLikedBy
      });

      setSharedCases(prev => prev.map(sc => sc.id === caseId ? { ...sc, likesCount: newLikes, likedBy: newLikedBy } : sc));
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newScenario.trim()) return;

    setIsSubmitting(true);
    const path = 'clinical_cases';
    try {
      const user = auth.currentUser;
      const caseData = {
        title: newTitle.trim(),
        topic: newTopic,
        difficulty: newDifficulty,
        scenario: newScenario.trim(),
        learningPoints: newLearningPoints.trim(),
        createdAt: Timestamp.now(),
        status: 'published',
        createdBy: user?.uid || 'anonymous',
        createdByName: user?.displayName || user?.email?.split('@')[0] || 'Clinical Educator',
      };

      await addDoc(collection(db, path), caseData);
      
      setNewTitle('');
      setNewTopic('Cardiology');
      setNewDifficulty('Beginner');
      setNewScenario('');
      setNewLearningPoints('');
      setShowNewModal(false);
      
      await fetchCases();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCase = async (caseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (caseId.startsWith('curated-')) return;
    if (!window.confirm('Are you sure you want to delete this custom case study?')) return;

    const path = `clinical_cases/${caseId}`;
    try {
      await deleteDoc(doc(db, 'clinical_cases', caseId));
      if (selectedCase?.id === caseId) {
        setSelectedCase(null);
      }
      setCases(prev => prev.filter(c => c.id !== caseId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const handleSelectCase = (c: ClinicalCase) => {
    setSelectedCase(c);
    setSubTab('scenario');
  };

  const handleUpdateReflection = (caseId: string, text: string) => {
    setUserReflections(prev => ({ ...prev, [caseId]: text }));
  };

  const handleRevealGuidelines = (caseId: string) => {
    if (!revealedCases.includes(caseId)) {
      setRevealedCases(prev => [...prev, caseId]);
    }
    setSubTab('guideline');
  };

  const handleToggleMastered = (caseId: string) => {
    if (masteredCases.includes(caseId)) {
      setMasteredCases(prev => prev.filter(id => id !== caseId));
    } else {
      setMasteredCases(prev => [...prev, caseId]);
    }
  };

  // Compute Active Tab Cases
  const getActiveTabCases = () => {
    switch (activeTab) {
      case 'session':
        return sessionCases;
      case 'saved':
        return savedCases;
      case 'shared':
        return sharedCases;
      case 'textbook':
      default:
        return [...CURATED_CASES, ...cases];
    }
  };

  const activeTabCases = getActiveTabCases();

  const filteredCases = activeTabCases.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.topic.toLowerCase().includes(q) ||
      c.scenario.toLowerCase().includes(q)
    );
  });

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/45';
      case 'Intermediate': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/45';
      case 'Advanced': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/45';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Deduped progress calculations across all sources
  const allKnownCases = [...CURATED_CASES, ...cases, ...sessionCases, ...savedCases, ...sharedCases];
  const uniqueKnownCases = allKnownCases.reduce((acc, current) => {
    const isDup = acc.some(item => item.title.toLowerCase() === current.title.toLowerCase());
    return isDup ? acc : acc.concat([current]);
  }, [] as ClinicalCase[]);

  const totalCasesCount = uniqueKnownCases.length;
  const masteredCount = uniqueKnownCases.filter(c => masteredCases.includes(c.id)).length;
  const attemptedCount = uniqueKnownCases.filter(c => revealedCases.includes(c.id)).length;
  const progressPercent = totalCasesCount > 0 ? Math.round((masteredCount / totalCasesCount) * 100) : 0;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-24 selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Case Studies Library</h1>
          <p className="text-[var(--text-muted)] text-sm">Review real open-access textbooks cases, draft your diagnostic interventions, and verify with guidelines.</p>
        </div>
        <button 
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus size={18} />
          Create Case Study
        </button>
      </div>

      {/* Free Open Access Books References Panel */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
          <BookOpen size={16} className="text-[var(--primary)]" />
          Recommended Open Access Clinical Case Books
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Clinical Cases in Clinical Pharmacology",
              description: "Interactive clinical scenarios covering pharmacokinetics, analgesics, respiratory drugs, and cardiac therapies.",
              source: "State Medical Library",
              url: "https://library.usmf.md/sites/default/files/2019-10/Clinical%20cases%20in%20clinical%20pharmacology.pdf"
            },
            {
              title: "Clinical Pharmacy & Pharmaceutical Care",
              description: "Focuses on identifying drug-related problems (DRPs) and building care plans via interactive cases.",
              source: "ResearchGate Repository",
              url: "https://www.researchgate.net/publication/329587422_Clinical_Pharmacy_and_Pharmaceutical_Care_in_Clinical_Cases_Workbook"
            },
            {
              title: "Clinical Pharmacy: Case Studies",
              description: "USC Faculty compilation guiding readers through laboratory test evaluations and therapeutic clinical cases.",
              source: "Academia.edu",
              url: "https://www.academia.edu/37402517/Clinical_Pharmacy_Case_Studies"
            },
            {
              title: "Pharmacy Case Studies",
              description: "Therapeutic compilation focusing on complex clinical decision-making, counseling, and risk factors.",
              source: "Academia.edu Compile",
              url: "https://www.academia.edu/resource/work/38115682"
            }
          ].map((book, i) => (
            <a 
              key={i} 
              href={book.url} 
              target="_blank" 
              rel="noreferrer"
              className="bg-[var(--surface-dim)] hover:bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--primary)] p-4 rounded-xl transition-all flex flex-col group cursor-pointer"
            >
              <h4 className="font-bold text-xs text-[var(--text)] mb-1 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{book.title}</h4>
              <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mb-3 flex-1 leading-normal">{book.description}</p>
              <span className="text-[9px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded w-fit uppercase tracking-wider flex items-center gap-1">
                {book.source} <ExternalLink size={10} />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Segmented Control / Case Source Tabs */}
      <div className="flex border-b border-[var(--border)] overflow-x-auto pb-px gap-2">
        <button
          onClick={() => { setActiveTab('session'); setSelectedCase(null); }}
          className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'session'
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          <Sparkles size={16} />
          AI Session Cases
        </button>
        <button
          onClick={() => { setActiveTab('textbook'); setSelectedCase(null); }}
          className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'textbook'
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          <BookOpen size={16} />
          Textbook Library
        </button>
        <button
          onClick={() => { setActiveTab('saved'); setSelectedCase(null); }}
          className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'saved'
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          <BookMarked size={16} />
          My Saved Portfolio
        </button>
        <button
          onClick={() => { setActiveTab('shared'); setSelectedCase(null); }}
          className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'shared'
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          <Share2 size={16} />
          Shared Network
        </button>
      </div>

      {/* Active Specialty Rotation Banner */}
      {activeTab === 'session' && auth.currentUser && (
        <div className="bg-gradient-to-r from-[var(--primary)]/10 via-indigo-500/10 to-purple-500/10 border border-[var(--primary)]/20 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-[var(--primary)] to-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-[var(--primary)]/20 text-[var(--primary)] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping shrink-0" /> Specialty Rotation
                </span>
                <span className="text-xs text-[var(--text-muted)] font-medium">New scenario on login</span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[var(--text)] mt-1">
                Active clinical focus: <span className="text-[var(--primary)]">{extractionTopic}</span>
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                Sourced from: <span className="italic">{extractionBook}</span>
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => triggerRandomRotation(false)}
            disabled={isExtracting}
            className="px-3.5 py-1.5 bg-[var(--surface)] hover:bg-[var(--surface-dim)] text-[var(--text)] border border-[var(--border)] rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer select-none self-stretch sm:self-auto justify-center disabled:opacity-50"
          >
            <Sparkles size={12} className="text-[var(--primary)]" />
            Spin New Specialty
          </button>
        </div>
      )}

      {/* Main Grid Layout: Progress, List, Detail View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Cases List & Progress Side */}
        <div className="md:col-span-1 space-y-4">
          
          {/* Progress Tracker Widget */}
          <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-sm space-y-3 text-left">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                <Trophy size={14} className="text-amber-500 animate-bounce" /> Board Prep Tracker
              </span>
              <span className="text-xs font-mono font-bold text-[var(--primary)]">
                {masteredCount}/{totalCasesCount} Mastered
              </span>
            </div>
            
            <div className="w-full bg-[var(--surface-dim)] h-2.5 rounded-full overflow-hidden border border-[var(--border)]">
              <div 
                className="bg-gradient-to-r from-amber-500 to-[var(--primary)] h-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
              <span>{attemptedCount} Attempted</span>
              <span>{progressPercent}% Mastery Target</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)] shadow-sm flex items-center gap-3">
            <Search size={18} className="text-[var(--text-dim)]" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, conditions..." 
              className="flex-1 bg-transparent border-none outline-none text-[var(--text)] text-sm focus:ring-0"
            />
          </div>

          {/* AI Case Extractor Control Panel (shown only in Session Cases tab) */}
          {activeTab === 'session' && auth.currentUser && (
            <div className="bg-gradient-to-r from-teal-50/40 via-blue-50/40 to-indigo-50/40 dark:from-teal-950/10 dark:via-blue-950/10 dark:to-indigo-950/10 border border-[var(--border)] p-4 rounded-xl space-y-3 shadow-inner">
              <div className="flex items-start gap-2.5">
                <Sparkles size={16} className="text-[var(--primary)] mt-0.5 animate-pulse" />
                <div className="text-left">
                  <h4 className="font-bold text-xs text-[var(--text)]">AI Textbook Case Extractor</h4>
                  <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mt-0.5">
                    Extract custom, board-grade diagnostic cases in real-time.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Topic</label>
                  <select
                    value={extractionTopic}
                    onChange={(e) => setExtractionTopic(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] text-xs focus:outline-none focus:ring-1 focus:ring-[var(--primary)] cursor-pointer"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Infectious Disease">Infectious Disease</option>
                    <option value="Nephrology">Nephrology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Critical Care">Critical Care</option>
                  </select>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Source Textbook</label>
                  <select
                    value={extractionBook}
                    onChange={(e) => setExtractionBook(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] text-xs focus:outline-none focus:ring-1 focus:ring-[var(--primary)] cursor-pointer"
                  >
                    <option value="Clinical Cases in Clinical Pharmacology">Clinical Pharmacology (USMF)</option>
                    <option value="Clinical Pharmacy & Pharmaceutical Care">Pharmacy & Care Workbook (RG)</option>
                    <option value="Clinical Pharmacy: Case Studies">Case Studies Compilation (USC)</option>
                    <option value="Pharmacy Case Studies">Pharmacy Case Studies (Academia)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => extractAICases(extractionTopic, extractionBook)}
                  disabled={isExtracting}
                  className="w-full py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold rounded-lg hover:opacity-95 transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExtracting ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Extracting cases...
                    </>
                  ) : (
                    <>
                      <Sparkles size={12} />
                      Extract New Cases
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Left Cases Scroll List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {isLoading || (activeTab === 'saved' && isSavedLoading) || (activeTab === 'shared' && isSharedLoading) || isExtracting ? (
              <div className="p-8 text-center bg-[var(--surface)] rounded-xl border border-[var(--border)] py-16">
                <Loader2 size={24} className="animate-spin text-[var(--primary)] mx-auto mb-2" />
                <span className="text-xs font-semibold text-[var(--text)]">Clinova AI is extracting cases...</span>
                <p className="text-[10px] text-[var(--text-muted)] mt-1 animate-pulse">Analyzing document &amp; formulating clinical scenarios</p>
              </div>
            ) : filteredCases.length === 0 ? (
              <div className="bg-[var(--surface)] p-12 rounded-xl border border-[var(--border)] shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mb-3">
                  <BookMarked size={24} className="text-[var(--text-muted)]" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text)] mb-1">No cases found</h3>
                <p className="text-[var(--text-muted)] text-xs max-w-xs leading-normal">
                  {searchQuery ? 'Try adjusting your search query.' : 
                    activeTab === 'session' ? 'Extract some customized daily cases with the AI Textbook Case Extractor tool above!' : 
                    activeTab === 'saved' ? 'Your Portfolio is empty! Save cases from textbooks or AI extractions.' :
                    activeTab === 'shared' ? 'No cases shared yet. Be the first to share a case with the Clinova network!' : 
                    'No case studies found.'}
                </p>
              </div>
            ) : (
              filteredCases.map((item) => {
                const isSelected = selectedCase?.id === item.id;
                const isCurated = item.id.startsWith('curated-');
                const isMastered = masteredCases.includes(item.id);
                const isRevealed = revealedCases.includes(item.id);
                
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleSelectCase(item)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer text-left space-y-3 group ${
                      isSelected 
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent shadow-md' 
                        : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--primary)] text-[var(--text)]'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider border ${
                        isSelected ? 'bg-[var(--primary-foreground)]/20 text-[var(--primary-foreground)] border-[var(--primary-foreground)]/10' : getDifficultyColor(item.difficulty)
                      }`}>
                        {item.difficulty}
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        {isMastered ? (
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1 ${
                            isSelected ? 'bg-[var(--primary-foreground)]/25 text-[var(--primary-foreground)]' : 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                          }`}>
                            ✓ Mastered
                          </span>
                        ) : isRevealed ? (
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1 ${
                            isSelected ? 'bg-[var(--primary-foreground)]/20 text-[var(--primary-foreground)]' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                          }`}>
                            Attempted
                          </span>
                        ) : (
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            isSelected ? 'bg-[var(--primary-foreground)]/10 text-[var(--primary-foreground)]/80' : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                          }`}>
                            Unopened
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm tracking-tight leading-tight group-hover:underline line-clamp-2">{item.title}</h4>
                      <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-[var(--primary-foreground)]/80' : 'text-[var(--text-muted)]'}`}>
                        {item.scenario}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] pt-2 border-t border-dashed border-[var(--border)] group-hover:border-transparent">
                      <span className={isSelected ? 'text-[var(--primary-foreground)]/80' : 'text-[var(--text-muted)]'}>
                        {isCurated ? '📚 Curated Textbook' : 
                         item.createdBy === 'ai-extracted' ? `🤖 AI Extracted` : 
                         item.createdBy === 'saved' ? `💾 Saved Portfolio` :
                         item.createdBy === 'shared' ? `🌐 Shared Case` :
                         `👤 Drafted by ${item.createdByName}`}
                      </span>
                      
                      {activeTab === 'shared' && (
                        <button
                          onClick={(e) => handleLikeSharedCase(item.id, e)}
                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${
                            item.likedBy?.includes(auth.currentUser?.uid || '') ? 'text-red-500' : 'text-gray-400'
                          }`}
                        >
                          <ThumbsUp size={11} />
                          <span>{item.likesCount || 0}</span>
                        </button>
                      )}

                      {!isCurated && activeTab === 'textbook' && (
                        <button 
                          onClick={(e) => handleDeleteCase(item.id, e)}
                          title="Delete case"
                          className={`p-1 rounded hover:bg-black/10 transition-colors ${isSelected ? 'text-[var(--primary-foreground)]' : 'text-red-500'}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Detailed Case View Panel */}
        <div className="md:col-span-2">
          {selectedCase ? (
            <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              
              {/* Detailed Card Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[var(--border)]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border ${getDifficultyColor(selectedCase.difficulty)}`}>
                      {selectedCase.difficulty}
                    </span>
                    <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">
                      {selectedCase.topic}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--text)] tracking-tight leading-tight">{selectedCase.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="p-1.5 hover:bg-[var(--surface-dim)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Action Buttons: Save, Share, & Export */}
              <div className="flex flex-wrap items-center gap-2.5 bg-[var(--surface-dim)] p-3 rounded-xl border border-[var(--border)]">
                <span className="text-xs font-bold text-[var(--text-muted)] mr-1">Case Actions:</span>
                
                <button
                  onClick={() => handleSaveToPortfolio(selectedCase)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
                    savedCases.some(sc => sc.title === selectedCase.title || sc.scenario === selectedCase.scenario)
                      ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/40 cursor-default'
                      : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--surface-dim)]'
                  }`}
                >
                  <Bookmark size={12} />
                  {savedCases.some(sc => sc.title === selectedCase.title || sc.scenario === selectedCase.scenario) ? 'Saved to Portfolio ✓' : 'Save to Portfolio'}
                </button>

                <button
                  onClick={() => handleShareCase(selectedCase)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
                    sharedCases.some(sc => sc.title === selectedCase.title || sc.scenario === selectedCase.scenario)
                      ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/40 cursor-default'
                      : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--surface-dim)]'
                  }`}
                >
                  <Share2 size={12} />
                  {sharedCases.some(sc => sc.title === selectedCase.title || sc.scenario === selectedCase.scenario) ? 'Shared with Network' : 'Share with Network'}
                </button>

                <button
                  onClick={() => handleExportPDF(selectedCase)}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent hover:opacity-90 ml-auto"
                >
                  <FileDown size={12} />
                  Export Summary (PDF)
                </button>
              </div>

              {/* Linked Patient Context Selector */}
              <div className="bg-[var(--surface-dim)] p-4 rounded-xl border border-[var(--border)] space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1 text-left">
                    <h4 className="text-xs font-bold text-[var(--primary)] flex items-center gap-1.5 uppercase tracking-wider">
                      <Link size={14} /> Link Patient Context
                    </h4>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                      Select an active ward patient to overlay real-time lab values, vitals, and safety flags onto this clinical summary report.
                    </p>
                  </div>
                  <div className="w-full sm:w-auto shrink-0 flex items-center gap-2">
                    <select
                      id="patient-context-select"
                      value={selectedPatientId}
                      onChange={(e) => setSelectedPatientId(e.target.value)}
                      className="bg-[var(--surface)] text-xs text-[var(--text)] border border-[var(--border)] rounded-lg px-2.5 py-1.5 outline-none font-semibold cursor-pointer w-full sm:w-48"
                    >
                      <option value="">-- No Patient Record Linked --</option>
                      {patients.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.ipNumber}) - {p.ward}
                        </option>
                      ))}
                    </select>
                    {selectedPatientId && (
                      <button
                        onClick={() => setSelectedPatientId('')}
                        className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Patient Micro Dashboard if Linked */}
                {selectedPatientId && (() => {
                  const p = patients.find(pat => pat.id === selectedPatientId);
                  if (!p) return null;
                  return (
                    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-3 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-in fade-in duration-200">
                      <div className="space-y-0.5 text-left">
                        <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Patient Profile</span>
                        <p className="text-xs font-bold text-[var(--text)]">{p.name} ({p.sex}, {p.age}y)</p>
                        <p className="text-[10px] text-[var(--text-muted)]">{p.ipNumber}</p>
                      </div>
                      <div className="space-y-0.5 text-left">
                        <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Location / Adm</span>
                        <p className="text-xs font-bold text-[var(--text)]">{p.ward}</p>
                        <p className="text-[10px] text-[var(--text-muted)]">Adm: {p.lastAdmission}</p>
                      </div>
                      <div className="space-y-0.5 col-span-2 text-left">
                        <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Active Clinical Vitals</span>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                          <span className="text-xs font-semibold text-[var(--text)]">
                            BP: <span className="font-bold text-[var(--primary)]">{p.vitals?.bp || 'N/A'}</span>
                          </span>
                          <span className="text-xs font-semibold text-[var(--text)]">
                            HR: <span className="font-bold">{p.vitals?.hr || 'N/A'}</span> bpm
                          </span>
                          <span className="text-xs font-semibold text-[var(--text)]">
                            Temp: <span className="font-bold">{p.vitals?.temp || 'N/A'}</span>°C
                          </span>
                          <span className="text-xs font-semibold text-[var(--text)]">
                            SpO2: <span className="font-bold text-green-600">{p.vitals?.spo2 || 'N/A'}%</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Sub-tabs Learning Stepper */}
              <div className="flex border-b border-[var(--border)]">
                <button 
                  onClick={() => setSubTab('scenario')}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 text-center transition-all flex items-center justify-center gap-2 ${
                    subTab === 'scenario' 
                      ? 'border-[var(--primary)] text-[var(--primary)]' 
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <BookOpen size={16} />
                  1. Patient Scenario
                </button>
                
                <button 
                  onClick={() => setSubTab('reflect')}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 text-center transition-all flex items-center justify-center gap-2 ${
                    subTab === 'reflect' 
                      ? 'border-[var(--primary)] text-[var(--primary)]' 
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <PenTool size={16} />
                  2. Your Intervention Plan
                </button>

                <button 
                  onClick={() => setSubTab('guideline')}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 text-center transition-all flex items-center justify-center gap-2 ${
                    subTab === 'guideline' 
                      ? 'border-[var(--primary)] text-[var(--primary)]' 
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <BookOpenCheck size={16} />
                  3. Compare & Master
                </button>
              </div>

              {/* Step Content */}
              <div className="space-y-6">
                
                {/* Step 1: Scenario Content */}
                {subTab === 'scenario' && (
                  <div className="space-y-4 animate-in fade-in duration-200 text-left">
                    <h3 className="text-sm font-bold text-[var(--text)] flex items-center gap-2 uppercase tracking-wider">
                      <BookOpen size={16} className="text-[var(--primary)]" />
                      Clinical Scenario Vignette
                    </h3>
                    <div className="text-[var(--text)] leading-relaxed bg-[var(--surface-dim)] p-5 rounded-xl border border-[var(--border)] whitespace-pre-wrap text-[15px] font-medium shadow-inner">
                      {selectedCase.scenario}
                    </div>

                    <div className="flex justify-end pt-4">
                      <button 
                        onClick={() => setSubTab('reflect')}
                        className="px-5 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-95 transition-all shadow-md cursor-pointer"
                      >
                        Start Diagnostic Intervention
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: User Reflection Pad */}
                {subTab === 'reflect' && (
                  <div className="space-y-4 animate-in fade-in duration-200 text-left">
                    <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100/50 dark:border-blue-900/40 p-4 rounded-xl space-y-2">
                      <h4 className="font-bold text-sm text-[var(--primary)] flex items-center gap-1.5">
                        <PenTool size={16} /> Learning Prompt
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        Identify key drug-related problems (DRPs), analyze pharmacokinetics, calculate any dosing modifications based on renal values, and draft a guideline-directed patient monitoring plan.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider block">Your Care Plan Notepad</label>
                      <textarea 
                        value={userReflections[selectedCase.id] || ''}
                        onChange={(e) => handleUpdateReflection(selectedCase.id, e.target.value)}
                        placeholder="Type your notes, clinical reasoning, drug interactions, or dosing adjustments here..."
                        rows={10}
                        className="w-full p-4 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] font-medium leading-relaxed resize-y"
                      />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <button 
                        onClick={() => setSubTab('scenario')}
                        className="px-4 py-2 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                      >
                        ← Back to Scenario
                      </button>
                      <button 
                        onClick={() => handleRevealGuidelines(selectedCase.id)}
                        className="px-5 py-3 bg-gradient-to-r from-[var(--primary)] to-indigo-600 text-[var(--primary-foreground)] rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-95 transition-all shadow-md cursor-pointer"
                      >
                        Reveal Textbook Guidelines
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Compare Side-By-Side & Guidelines */}
                {subTab === 'guideline' && (
                  <div className="space-y-6 animate-in fade-in duration-200 text-left">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left: User Answer */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                          <PenTool size={14} className="text-blue-500" /> Your Formulated Notes
                        </h4>
                        <div className="bg-[var(--surface-dim)] p-4 rounded-xl border border-[var(--border)] min-h-[220px] text-xs font-medium leading-relaxed text-[var(--text-muted)] whitespace-pre-wrap">
                          {userReflections[selectedCase.id] ? userReflections[selectedCase.id] : "No care plan notes drafted for this case study."}
                        </div>
                      </div>

                      {/* Right: Expert Guidelines */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                          <Lightbulb size={14} className="text-amber-500" /> Guideline Resolution
                        </h4>
                        <div className="bg-amber-500/5 p-4 rounded-xl border border-amber-500/20 min-h-[220px] text-xs leading-relaxed text-[var(--text)] whitespace-pre-wrap font-medium">
                          {selectedCase.learningPoints}
                        </div>
                      </div>
                    </div>

                    {/* Master Action Panel */}
                    <div className="bg-[var(--surface-dim)] border border-[var(--border)] p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div>
                        <h4 className="font-bold text-sm text-[var(--text)]">Mastery Evaluation</h4>
                        <p className="text-xs text-[var(--text-muted)] mt-1">If you have reviewed the diagnostic points and feel confident in this therapeutic area, mark this case study as mastered.</p>
                      </div>
                      
                      <button 
                        onClick={() => handleToggleMastered(selectedCase.id)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm border cursor-pointer ${
                          masteredCases.includes(selectedCase.id)
                            ? 'bg-green-600 hover:bg-green-700 text-white border-transparent'
                            : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface-dim)]'
                        }`}
                      >
                        <Award size={15} />
                        {masteredCases.includes(selectedCase.id) ? 'Mastered ✓' : 'Mark as Mastered'}
                      </button>
                    </div>

                    <div className="flex justify-start pt-2">
                      <button 
                        onClick={() => setSubTab('reflect')}
                        className="px-4 py-2 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                      >
                        ← Edit Care Plan Notes
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Card Footer Metadata */}
              <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center text-[10px] text-[var(--text-muted)] gap-2">
                <span>Case Unique Identifier: {selectedCase.id}</span>
                <span>Clinical Author / Compilation: {selectedCase.createdByName}</span>
              </div>
            </div>
          ) : (
            <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12 text-center h-[500px] flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center text-[var(--text-dim)]">
                <BookOpen size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text)]">No Clinical Case Selected</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 max-w-sm mx-auto leading-relaxed">
                  Select a case study from the sidebar on the left, or extract a new clinical vignette using the AI Extractor to start your review.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Modal: Create Custom Case Study */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-dim)]">
              <h3 className="font-bold text-[var(--text)] flex items-center gap-2">
                <PenTool size={18} className="text-[var(--primary)]" />
                Draft Custom Case Study
              </h3>
              <button 
                onClick={() => setShowNewModal(false)}
                className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="flex flex-col overflow-y-auto">
              <div className="p-6 space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Case Title</label>
                  <input 
                    type="text" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    placeholder="e.g., Gentamicin Dosing and AKI Risk in Sepsis"
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Clinical Topic</label>
                    <select 
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Endocrinology">Endocrinology</option>
                      <option value="Infectious Disease">Infectious Disease</option>
                      <option value="Nephrology">Nephrology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Oncology">Oncology</option>
                      <option value="Critical Care">Critical Care</option>
                      <option value="General Practice">General Practice</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Target Level</label>
                    <select 
                      value={newDifficulty}
                      onChange={(e) => setNewDifficulty(e.target.value as any)}
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
                    >
                      <option value="Beginner">Beginner (P1/P2 Level)</option>
                      <option value="Intermediate">Intermediate (P3/P4 Level)</option>
                      <option value="Advanced">Advanced (Board Level)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Clinical Scenario (Vignette)</label>
                  <textarea 
                    value={newScenario}
                    onChange={(e) => setNewScenario(e.target.value)}
                    required
                    placeholder="Describe the patient presentation, history of present illness, vitals, labs, and current medications..."
                    rows={6}
                    className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-y"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Key Learning Points & Resolution</label>
                  <textarea 
                    value={newLearningPoints}
                    onChange={(e) => setNewLearningPoints(e.target.value)}
                    placeholder="Provide the rationale, guidelines to reference, and the correct pharmacotherapy intervention..."
                    rows={4}
                    className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-y"
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end gap-3 bg-[var(--surface-dim)]">
                <button 
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2.5 border border-[var(--border)] hover:bg-[var(--surface-dim)] text-[var(--text)] font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold text-sm rounded-xl hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <BookOpen size={16} />}
                  Publish Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
