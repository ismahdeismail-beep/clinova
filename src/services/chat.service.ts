import { 
  collection, doc, setDoc, getDocs, query, where, deleteDoc, updateDoc 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { ChatSession } from '../lib/localDb';

const CHAT_SESSIONS_COLLECTION = 'chat_sessions';

const withTimeout = <T>(promise: Promise<T>, timeoutMs = 5000): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Firestore operation timed out'));
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

export const ChatService = {
  async getChatSessions(userId: string): Promise<ChatSession[]> {
    try {
      const q = query(
        collection(db, CHAT_SESSIONS_COLLECTION),
        where('userId', '==', userId)
      );
      const snapshot = await withTimeout(getDocs(q), 5000);
      const sessions: ChatSession[] = [];
      snapshot.forEach((doc) => {
        sessions.push({ id: doc.id, ...doc.data() } as ChatSession);
      });
      
      // Sort by updatedAt descending
      sessions.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      
      // Cache locally
      localStorage.setItem(`chat_sessions_${userId}`, JSON.stringify(sessions));
      return sessions;
    } catch (err) {
      console.warn('[ChatService] Firestore load failed, loading from local cache:', err);
      const cached = localStorage.getItem(`chat_sessions_${userId}`);
      return cached ? JSON.parse(cached) : [];
    }
  },

  async saveChatSession(session: ChatSession): Promise<void> {
    const sessionId = session.id;
    const sessionData = {
      ...session,
      updatedAt: new Date().toISOString(),
      synced: true,
    };

    try {
      await withTimeout(setDoc(doc(db, CHAT_SESSIONS_COLLECTION, sessionId), sessionData), 5000);
    } catch (err) {
      console.warn('[ChatService] Firestore save failed, using local storage backup:', err);
    }

    // Always update local cache
    const cached = localStorage.getItem(`chat_sessions_${session.userId}`);
    const list: ChatSession[] = cached ? JSON.parse(cached) : [];
    const index = list.findIndex((s) => s.id === sessionId);
    if (index >= 0) {
      list[index] = { ...sessionData, synced: true };
    } else {
      list.unshift({ ...sessionData, synced: true });
    }
    localStorage.setItem(`chat_sessions_${session.userId}`, JSON.stringify(list));
  },

  async deleteChatSession(userId: string, sessionId: string): Promise<void> {
    try {
      await withTimeout(deleteDoc(doc(db, CHAT_SESSIONS_COLLECTION, sessionId)), 5000);
    } catch (err) {
      console.warn('[ChatService] Firestore delete failed:', err);
    }

    const cached = localStorage.getItem(`chat_sessions_${userId}`);
    if (cached) {
      const list: ChatSession[] = JSON.parse(cached);
      const filtered = list.filter((s) => s.id !== sessionId);
      localStorage.setItem(`chat_sessions_${userId}`, JSON.stringify(filtered));
    }
  },

  async renameChatSession(userId: string, sessionId: string, newTitle: string): Promise<void> {
    const updates = {
      title: newTitle,
      updatedAt: new Date().toISOString(),
    };

    try {
      await withTimeout(updateDoc(doc(db, CHAT_SESSIONS_COLLECTION, sessionId), updates), 5000);
    } catch (err) {
      console.warn('[ChatService] Firestore rename failed:', err);
    }

    const cached = localStorage.getItem(`chat_sessions_${userId}`);
    if (cached) {
      const list: ChatSession[] = JSON.parse(cached);
      const idx = list.findIndex((s) => s.id === sessionId);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...updates, synced: true };
        localStorage.setItem(`chat_sessions_${userId}`, JSON.stringify(list));
      }
    }
  },

  async syncLocalToCloud(userId: string): Promise<number> {
    const cached = localStorage.getItem(`chat_sessions_${userId}`);
    if (!cached) return 0;
    
    const localSessions: ChatSession[] = JSON.parse(cached);
    const unsynced = localSessions.filter(s => !s.synced);
    
    let syncedCount = 0;
    for (const session of unsynced) {
      try {
        await this.saveChatSession({ ...session, synced: true });
        syncedCount++;
      } catch (err) {
        console.warn('[ChatService] Failed to sync session:', session.id, err);
      }
    }
    
    return syncedCount;
  },
};