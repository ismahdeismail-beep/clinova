import { 
  collection, doc, setDoc, getDocs, query, where, deleteDoc, updateDoc 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface GeneratedContent {
  id: string;
  userId: string;
  type: 'study_guide' | 'flashcards' | 'quiz' | 'summary' | 'clinical_case' | 'pharmacotherapy_review' | 'research_output' | 'ai_conversation';
  title: string;
  content: string;
  metadata?: {
    unitId?: string;
    unitName?: string;
    curriculumUnitId?: string;
    specialty?: string;
    disease?: string;
    difficulty?: string;
    tags?: string[];
    sourceRagSources?: string[];
    confidence?: number;
    wordCount?: number;
  };
  format: 'markdown' | 'json' | 'html' | 'text';
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  synced: boolean;
}

const GENERATED_CONTENT_COLLECTION = 'generated_content';

const withTimeout = <T>(promise: Promise<T>, timeoutMs = 5000): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Firestore operation timed out'));
    }, timeoutMs);
    promise.then(
      (res) => { clearTimeout(timer); resolve(res); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
};

export const AIContentService = {
  async saveContent(content: Omit<GeneratedContent, 'id' | 'createdAt' | 'updatedAt' | 'synced'>): Promise<string> {
    const contentId = `gen_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const now = new Date().toISOString();
    
    const contentData: GeneratedContent = {
      ...content,
      id: contentId,
      createdAt: now,
      updatedAt: now,
      synced: true,
    };

    try {
      await withTimeout(setDoc(doc(db, GENERATED_CONTENT_COLLECTION, contentId), contentData), 5000);
    } catch (err) {
      console.warn('[AIContentService] Firestore save failed, using local storage backup:', err);
    }

    // Always update local cache
    const cached = localStorage.getItem(`generated_content_${content.userId}`);
    const list: GeneratedContent[] = cached ? JSON.parse(cached) : [];
    list.unshift({ ...contentData, synced: true });
    localStorage.setItem(`generated_content_${content.userId}`, JSON.stringify(list));

    return contentId;
  },

  async getUserContent(userId: string): Promise<GeneratedContent[]> {
    try {
      const q = query(
        collection(db, GENERATED_CONTENT_COLLECTION),
        where('userId', '==', userId)
      );
      const snapshot = await withTimeout(getDocs(q), 5000);
      const content: GeneratedContent[] = [];
      snapshot.forEach((doc) => {
        content.push({ id: doc.id, ...doc.data() } as GeneratedContent);
      });
      
      // Sort by updatedAt descending
      content.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      
      // Cache locally
      localStorage.setItem(`generated_content_${userId}`, JSON.stringify(content));
      return content;
    } catch (err) {
      console.warn('[AIContentService] Firestore load failed, loading from local cache:', err);
      const cached = localStorage.getItem(`generated_content_${userId}`);
      return cached ? JSON.parse(cached) : [];
    }
  },

  async getContentByType(userId: string, type: GeneratedContent['type']): Promise<GeneratedContent[]> {
    const all = await this.getUserContent(userId);
    return all.filter(c => c.type === type);
  },

  async getContentByUnit(userId: string, unitId: string): Promise<GeneratedContent[]> {
    const all = await this.getUserContent(userId);
    return all.filter(c => c.metadata?.unitId === unitId);
  },

  async updateContent(userId: string, contentId: string, updates: Partial<GeneratedContent>): Promise<void> {
    const updatesData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    try {
      await withTimeout(updateDoc(doc(db, GENERATED_CONTENT_COLLECTION, contentId), updatesData), 5000);
    } catch (err) {
      console.warn('[AIContentService] Firestore update failed:', err);
    }

    const cached = localStorage.getItem(`generated_content_${userId}`);
    if (cached) {
      const list: GeneratedContent[] = JSON.parse(cached);
      const idx = list.findIndex(c => c.id === contentId);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...updatesData, synced: true };
        localStorage.setItem(`generated_content_${userId}`, JSON.stringify(list));
      }
    }
  },

  async deleteContent(userId: string, contentId: string): Promise<void> {
    try {
      await withTimeout(deleteDoc(doc(db, GENERATED_CONTENT_COLLECTION, contentId)), 5000);
    } catch (err) {
      console.warn('[AIContentService] Firestore delete failed:', err);
    }

    const cached = localStorage.getItem(`generated_content_${userId}`);
    if (cached) {
      const list: GeneratedContent[] = JSON.parse(cached);
      const filtered = list.filter(c => c.id !== contentId);
      localStorage.setItem(`generated_content_${userId}`, JSON.stringify(filtered));
    }
  },

  async syncLocalToCloud(userId: string): Promise<number> {
    const cached = localStorage.getItem(`generated_content_${userId}`);
    if (!cached) return 0;
    
    const localContent: GeneratedContent[] = JSON.parse(cached);
    const unsynced = localContent.filter(c => !c.synced);
    
    let syncedCount = 0;
    for (const content of unsynced) {
      try {
        const { id, createdAt, updatedAt, synced, ...data } = content;
        await this.saveContent(data);
        syncedCount++;
      } catch (err) {
        console.warn('[AIContentService] Failed to sync content:', content.id, err);
      }
    }
    
    return syncedCount;
  },

  // Helper to create content from AI generation results
  async saveGeneratedStudyGuide(
    userId: string,
    unitId: string,
    unitName: string,
    title: string,
    markdownContent: string,
    metadata?: Partial<GeneratedContent['metadata']>
  ): Promise<string> {
    return this.saveContent({
      userId,
      type: 'study_guide',
      title,
      content: markdownContent,
      format: 'markdown',
      status: 'published',
      metadata: {
        unitId,
        unitName,
        ...metadata,
        wordCount: markdownContent.split(/\s+/).length,
      },
    });
  },

  async saveGeneratedFlashcards(
    userId: string,
    unitId: string,
    unitName: string,
    title: string,
    flashcardsJson: string,
    metadata?: Partial<GeneratedContent['metadata']>
  ): Promise<string> {
    return this.saveContent({
      userId,
      type: 'flashcards',
      title,
      content: flashcardsJson,
      format: 'json',
      status: 'published',
      metadata: {
        unitId,
        unitName,
        ...metadata,
      },
    });
  },

  async saveGeneratedQuiz(
    userId: string,
    unitId: string,
    unitName: string,
    title: string,
    quizJson: string,
    metadata?: Partial<GeneratedContent['metadata']>
  ): Promise<string> {
    return this.saveContent({
      userId,
      type: 'quiz',
      title,
      content: quizJson,
      format: 'json',
      status: 'published',
      metadata: {
        unitId,
        unitName,
        ...metadata,
      },
    });
  },

  async saveGeneratedSummary(
    userId: string,
    unitId: string,
    unitName: string,
    title: string,
    markdownContent: string,
    metadata?: Partial<GeneratedContent['metadata']>
  ): Promise<string> {
    return this.saveContent({
      userId,
      type: 'summary',
      title,
      content: markdownContent,
      format: 'markdown',
      status: 'published',
      metadata: {
        unitId,
        unitName,
        ...metadata,
        wordCount: markdownContent.split(/\s+/).length,
      },
    });
  },

  async saveGeneratedClinicalCase(
    userId: string,
    unitId: string,
    unitName: string,
    title: string,
    caseJson: string,
    metadata?: Partial<GeneratedContent['metadata']>
  ): Promise<string> {
    return this.saveContent({
      userId,
      type: 'clinical_case',
      title,
      content: caseJson,
      format: 'json',
      status: 'published',
      metadata: {
        unitId,
        unitName,
        ...metadata,
      },
    });
  },

  async saveGeneratedPharmacotherapyReview(
    userId: string,
    unitId: string,
    unitName: string,
    title: string,
    markdownContent: string,
    metadata?: Partial<GeneratedContent['metadata']>
  ): Promise<string> {
    return this.saveContent({
      userId,
      type: 'pharmacotherapy_review',
      title,
      content: markdownContent,
      format: 'markdown',
      status: 'published',
      metadata: {
        unitId,
        unitName,
        ...metadata,
        wordCount: markdownContent.split(/\s+/).length,
      },
    });
  },

  async saveAIConversation(
    userId: string,
    title: string,
    messages: { role: string; content: string }[],
    metadata?: Partial<GeneratedContent['metadata']>
  ): Promise<string> {
    return this.saveContent({
      userId,
      type: 'ai_conversation',
      title,
      content: JSON.stringify(messages),
      format: 'json',
      status: 'published',
      metadata: {
        ...metadata,
        wordCount: messages.reduce((sum, m) => sum + m.content.length, 0),
      },
    });
  },
};