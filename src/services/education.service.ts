import { collection, doc, setDoc, getDocs, query, where, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface CustomUnit {
  id: string;
  userId: string;
  moduleId: string;
  title: string;
  description: string;
  estimatedHours: number;
  createdAt: number;
}

export interface SubFolder {
  id: string;
  userId: string;
  unitId: string;     // Top-level unit or custom unit ID
  parentId: string;   // 'root' or another subfolder ID
  title: string;
  description: string;
  createdAt: number;
}

export interface SavedFlashcard {
  id: string;
  unitId: string;
  question: string;
  answer: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface SavedQuiz {
  id: string;
  unitId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const CUSTOM_UNITS_COLLECTION = 'custom_units';
const FLASHCARDS_COLLECTION = 'custom_flashcards';
const QUIZZES_COLLECTION = 'custom_quizzes';
const SUMMARIES_COLLECTION = 'custom_summaries';

const withTimeout = <T>(promise: Promise<T>, timeoutMs = 2500): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Firebase operation timed out'));
    }, timeoutMs);
    promise.then(
      (res) => {
        clearTimeout(timer);
        resolve(res);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
};

export const EducationService = {
  // --- CUSTOM UNITS & SUB-FOLDERS ---
  async getCustomUnits(userId: string, moduleId: string): Promise<CustomUnit[]> {
    try {
      const q = query(
        collection(db, CUSTOM_UNITS_COLLECTION),
        where('userId', '==', userId),
        where('moduleId', '==', moduleId)
      );
      const snapshot = await withTimeout(getDocs(q), 2500);
      const units: CustomUnit[] = [];
      snapshot.forEach((doc) => {
        units.push({ id: doc.id, ...doc.data() } as CustomUnit);
      });
      
      // Cache locally
      localStorage.setItem(`custom_units_${userId}_${moduleId}`, JSON.stringify(units));
      return units;
    } catch (err) {
      console.warn('[EducationService] Firestore load failed, loading from local cache:', err);
      const cached = localStorage.getItem(`custom_units_${userId}_${moduleId}`);
      return cached ? JSON.parse(cached) : [];
    }
  },

  async createCustomUnit(userId: string, moduleId: string, title: string, description: string, estimatedHours: number): Promise<CustomUnit> {
    const unitId = `cust_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const newUnit: CustomUnit = {
      id: unitId,
      userId,
      moduleId,
      title,
      description,
      estimatedHours: estimatedHours || 10,
      createdAt: Date.now()
    };

    try {
      await withTimeout(setDoc(doc(db, CUSTOM_UNITS_COLLECTION, unitId), newUnit), 2500);
    } catch (err) {
      console.warn('[EducationService] Firestore save failed, using local storage backup:', err);
    }

    // Always update local cache
    const cached = localStorage.getItem(`custom_units_${userId}_${moduleId}`);
    const list: CustomUnit[] = cached ? JSON.parse(cached) : [];
    list.push(newUnit);
    localStorage.setItem(`custom_units_${userId}_${moduleId}`, JSON.stringify(list));

    return newUnit;
  },

  async deleteCustomUnit(userId: string, moduleId: string, unitId: string): Promise<void> {
    try {
      await withTimeout(deleteDoc(doc(db, CUSTOM_UNITS_COLLECTION, unitId)), 2500);
    } catch (err) {
      console.warn('[EducationService] Firestore delete failed:', err);
    }

    const cached = localStorage.getItem(`custom_units_${userId}_${moduleId}`);
    if (cached) {
      const list: CustomUnit[] = JSON.parse(cached);
      const filtered = list.filter((u) => u.id !== unitId);
      localStorage.setItem(`custom_units_${userId}_${moduleId}`, JSON.stringify(filtered));
    }
  },

  // --- SUB-FOLDERS (RECURSIVE STRUCTURES) ---
  async getSubFolders(userId: string, unitId: string): Promise<SubFolder[]> {
    try {
      const q = query(
        collection(db, 'custom_subfolders'),
        where('userId', '==', userId),
        where('unitId', '==', unitId)
      );
      const snapshot = await withTimeout(getDocs(q), 2500);
      const folders: SubFolder[] = [];
      snapshot.forEach((doc) => {
        folders.push({ id: doc.id, ...doc.data() } as SubFolder);
      });
      // Cache locally
      localStorage.setItem(`subfolders_${userId}_${unitId}`, JSON.stringify(folders));
      return folders;
    } catch (err) {
      console.warn('[EducationService] Firestore load failed, loading from local cache:', err);
      const cached = localStorage.getItem(`subfolders_${userId}_${unitId}`);
      return cached ? JSON.parse(cached) : [];
    }
  },

  async createSubFolder(userId: string, unitId: string, parentId: string, title: string, description?: string): Promise<SubFolder> {
    const folderId = `fold_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const newFolder: SubFolder = {
      id: folderId,
      userId,
      unitId,
      parentId,
      title,
      description: description || '',
      createdAt: Date.now()
    };

    try {
      await withTimeout(setDoc(doc(db, 'custom_subfolders', folderId), newFolder), 2500);
    } catch (err) {
      console.warn('[EducationService] Firestore save failed, using local backup:', err);
    }

    // Always update local cache
    const cached = localStorage.getItem(`subfolders_${userId}_${unitId}`);
    const list: SubFolder[] = cached ? JSON.parse(cached) : [];
    list.push(newFolder);
    localStorage.setItem(`subfolders_${userId}_${unitId}`, JSON.stringify(list));

    return newFolder;
  },

  async deleteSubFolder(userId: string, unitId: string, folderId: string): Promise<void> {
    try {
      await withTimeout(deleteDoc(doc(db, 'custom_subfolders', folderId)), 2500);
    } catch (err) {
      console.warn('[EducationService] Firestore delete failed:', err);
    }

    const cached = localStorage.getItem(`subfolders_${userId}_${unitId}`);
    if (cached) {
      const list: SubFolder[] = JSON.parse(cached);
      const filtered = list.filter((f) => f.id !== folderId);
      localStorage.setItem(`subfolders_${userId}_${unitId}`, JSON.stringify(filtered));
    }
  },

  // --- FLASHCARDS ---
  async getFlashcards(unitId: string): Promise<SavedFlashcard[]> {
    try {
      const q = query(
        collection(db, FLASHCARDS_COLLECTION),
        where('unitId', '==', unitId)
      );
      const snapshot = await getDocs(q);
      const cards: SavedFlashcard[] = [];
      snapshot.forEach((doc) => {
        cards.push({ id: doc.id, ...doc.data() } as SavedFlashcard);
      });
      localStorage.setItem(`flashcards_${unitId}`, JSON.stringify(cards));
      return cards;
    } catch (err) {
      console.warn('[EducationService] Failed to load flashcards from firestore:', err);
      const cached = localStorage.getItem(`flashcards_${unitId}`);
      return cached ? JSON.parse(cached) : [];
    }
  },

  async saveFlashcards(unitId: string, cards: Omit<SavedFlashcard, 'id' | 'unitId'>[]): Promise<SavedFlashcard[]> {
    const savedCards: SavedFlashcard[] = [];
    
    for (const card of cards) {
      const cardId = `fc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const newCard: SavedFlashcard = { id: cardId, unitId, ...card };
      try {
        await setDoc(doc(db, FLASHCARDS_COLLECTION, cardId), newCard);
      } catch (err) {
        console.warn('[EducationService] Failed to save individual flashcard to Firestore:', err);
      }
      savedCards.push(newCard);
    }

    localStorage.setItem(`flashcards_${unitId}`, JSON.stringify(savedCards));
    return savedCards;
  },

  async updateFlashcardDifficulty(cardId: string, difficulty: 'easy' | 'medium' | 'hard', unitId: string): Promise<void> {
    try {
      await updateDoc(doc(db, FLASHCARDS_COLLECTION, cardId), { difficulty });
    } catch (err) {
      console.warn('[EducationService] Failed to update card difficulty on firestore:', err);
    }

    const cached = localStorage.getItem(`flashcards_${unitId}`);
    if (cached) {
      const cards: SavedFlashcard[] = JSON.parse(cached);
      const updated = cards.map(c => c.id === cardId ? { ...c, difficulty } : c);
      localStorage.setItem(`flashcards_${unitId}`, JSON.stringify(updated));
    }
  },

  // --- QUIZZES (MCQS) ---
  async getQuizzes(unitId: string): Promise<SavedQuiz[]> {
    try {
      const q = query(
        collection(db, QUIZZES_COLLECTION),
        where('unitId', '==', unitId)
      );
      const snapshot = await getDocs(q);
      const quizzes: SavedQuiz[] = [];
      snapshot.forEach((doc) => {
        quizzes.push({ id: doc.id, ...doc.data() } as SavedQuiz);
      });
      localStorage.setItem(`quizzes_${unitId}`, JSON.stringify(quizzes));
      return quizzes;
    } catch (err) {
      console.warn('[EducationService] Failed to load quizzes from firestore:', err);
      const cached = localStorage.getItem(`quizzes_${unitId}`);
      return cached ? JSON.parse(cached) : [];
    }
  },

  async saveQuizzes(unitId: string, quizzes: Omit<SavedQuiz, 'id' | 'unitId'>[]): Promise<SavedQuiz[]> {
    const savedQuizzes: SavedQuiz[] = [];
    
    for (const q of quizzes) {
      const quizId = `qz_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const newQuiz: SavedQuiz = { id: quizId, unitId, ...q };
      try {
        await setDoc(doc(db, QUIZZES_COLLECTION, quizId), newQuiz);
      } catch (err) {
        console.warn('[EducationService] Failed to save individual quiz to Firestore:', err);
      }
      savedQuizzes.push(newQuiz);
    }

    localStorage.setItem(`quizzes_${unitId}`, JSON.stringify(savedQuizzes));
    return savedQuizzes;
  },

  // --- STUDY GUIDE SUMMARIES ---
  async getSummary(unitId: string): Promise<string | null> {
    try {
      const snapshot = await getDocs(
        query(collection(db, SUMMARIES_COLLECTION), where('unitId', '==', unitId))
      );
      if (!snapshot.empty) {
        const text = snapshot.docs[0].data().summaryText;
        localStorage.setItem(`summary_${unitId}`, text);
        return text;
      }
      return localStorage.getItem(`summary_${unitId}`);
    } catch (err) {
      console.warn('[EducationService] Summary fetch failed, reading local storage:', err);
      return localStorage.getItem(`summary_${unitId}`);
    }
  },

  async saveSummary(unitId: string, summaryText: string): Promise<void> {
    try {
      const summaryId = `sum_${unitId}`;
      await setDoc(doc(db, SUMMARIES_COLLECTION, summaryId), {
        unitId,
        summaryText,
        updatedAt: Date.now()
      });
    } catch (err) {
      console.warn('[EducationService] Summary save failed on Firestore:', err);
    }
    localStorage.setItem(`summary_${unitId}`, summaryText);
  }
};
