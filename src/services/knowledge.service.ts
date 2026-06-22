import { collection, doc, getDoc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Drug, Condition, Interaction } from '../types/engine';

const DRUGS_COLLECTION = 'drugs';
const CONDITIONS_COLLECTION = 'conditions';
const INTERACTIONS_COLLECTION = 'interactions';

export const KnowledgeService = {
  async getDrug(id: string): Promise<Drug | null> {
    const docRef = doc(db, DRUGS_COLLECTION, id);
    const snap = await getDoc(docRef);
    if (snap.exists()) return snap.data() as Drug;
    return null;
  },

  async getDrugsByClass(drugClass: string): Promise<Drug[]> {
    const q = query(collection(db, DRUGS_COLLECTION), where("class", "==", drugClass));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as Drug);
  },

  async getCondition(id: string): Promise<Condition | null> {
    const docRef = doc(db, CONDITIONS_COLLECTION, id);
    const snap = await getDoc(docRef);
    if (snap.exists()) return snap.data() as Condition;
    return null;
  },

  async checkInteraction(drugAId: string, drugBId: string): Promise<Interaction | null> {
    const q = query(
      collection(db, INTERACTIONS_COLLECTION), 
      where("drugA", "in", [drugAId, drugBId]),
      where("drugB", "in", [drugAId, drugBId])
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs[0].data() as Interaction;
    }
    return null;
  }
};
