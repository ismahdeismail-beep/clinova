import { collection, doc, getDoc, getDocs, query, where, setDoc, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Drug, Condition, Interaction } from '../types/engine';

const DRUGS_COLLECTION = 'drugs';
const CONDITIONS_COLLECTION = 'conditions';
const INTERACTIONS_COLLECTION = 'interactions';

export const KnowledgeService = {
  async getDrug(id: string): Promise<Drug | null> {
    const docRef = doc(db, DRUGS_COLLECTION, id);
    const snap = await getDoc(docRef);
    if (snap.exists()) return { id: snap.id, ...snap.data() } as Drug;
    return null;
  },

  async searchDrugs(queryStr: string, maxResults = 20): Promise<Drug[]> {
    const q = query(
      collection(db, DRUGS_COLLECTION),
      where("name", ">=", queryStr),
      where("name", "<=", queryStr + '\uf8ff'),
      limit(maxResults)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Drug));
  },

  async getDrugsByClass(drugClass: string): Promise<Drug[]> {
    const q = query(collection(db, DRUGS_COLLECTION), where("class", "==", drugClass));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Drug));
  },

  async saveDrug(drug: Drug): Promise<void> {
    const docRef = doc(db, DRUGS_COLLECTION, drug.id);
    await setDoc(docRef, drug);
  },

  async getCondition(id: string): Promise<Condition | null> {
    const docRef = doc(db, CONDITIONS_COLLECTION, id);
    const snap = await getDoc(docRef);
    if (snap.exists()) return { id: snap.id, ...snap.data() } as Condition;
    return null;
  },

  async getAllConditions(): Promise<Condition[]> {
    const snap = await getDocs(collection(db, CONDITIONS_COLLECTION));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Condition));
  },

  async searchConditions(queryStr: string, maxResults = 20): Promise<Condition[]> {
    const q = query(
      collection(db, CONDITIONS_COLLECTION),
      where("name", ">=", queryStr),
      where("name", "<=", queryStr + '\uf8ff'),
      limit(maxResults)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Condition));
  },

  async checkInteraction(drugAId: string, drugBId: string): Promise<Interaction | null> {
    const q = query(
      collection(db, INTERACTIONS_COLLECTION),
      where("drugA", "in", [drugAId, drugBId]),
      where("drugB", "in", [drugAId, drugBId])
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      return { id: snap.docs[0].id, ...snap.docs[0].data() } as Interaction;
    }
    return null;
  },

  async getInteractionsForDrug(drugId: string): Promise<Interaction[]> {
    const q = query(
      collection(db, INTERACTIONS_COLLECTION),
      where("drugs", "array-contains", drugId)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Interaction));
  },

  async saveInteraction(interaction: Interaction): Promise<void> {
    const docRef = doc(db, INTERACTIONS_COLLECTION, interaction.id);
    await setDoc(docRef, interaction);
  },

  // Kenya Drug Index (KDI) specific lookups
  async getKDIDrugs(): Promise<Drug[]> {
    const q = query(
      collection(db, DRUGS_COLLECTION),
      where("kdi_approved", "==", true)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Drug));
  },

  async getDrugByKEMSCode(kemsCode: string): Promise<Drug | null> {
    const q = query(
      collection(db, DRUGS_COLLECTION),
      where("kemsCode", "==", kemsCode),
      limit(1)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      return { id: snap.docs[0].id, ...snap.docs[0].data() } as Drug;
    }
    return null;
  }
};
