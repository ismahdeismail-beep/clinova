import { collection, doc, getDoc, getDocs, query, where, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Workflow, WorkflowNode } from '../types/engine';

const WORKFLOWS_COLLECTION = 'workflows';
const NODES_COLLECTION = 'workflow_nodes';

export const WorkflowService = {
  async getAllWorkflows(): Promise<Workflow[]> {
    const snap = await getDocs(collection(db, WORKFLOWS_COLLECTION));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Workflow));
  },

  async getWorkflow(id: string): Promise<Workflow | null> {
    const docRef = doc(db, WORKFLOWS_COLLECTION, id);
    const snap = await getDoc(docRef);
    if (snap.exists()) return { id: snap.id, ...snap.data() } as Workflow;
    return null;
  },

  async getWorkflowNodes(workflowId: string): Promise<WorkflowNode[]> {
    const q = query(collection(db, NODES_COLLECTION), where("workflowId", "==", workflowId));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as WorkflowNode);
  },

  async saveWorkflow(workflow: Workflow): Promise<void> {
    const docRef = doc(db, WORKFLOWS_COLLECTION, workflow.id);
    await setDoc(docRef, workflow);
  },

  async updateWorkflow(id: string, data: Partial<Workflow>): Promise<void> {
    const docRef = doc(db, WORKFLOWS_COLLECTION, id);
    await updateDoc(docRef, data);
  },

  async deleteWorkflow(id: string): Promise<void> {
    const docRef = doc(db, WORKFLOWS_COLLECTION, id);
    await deleteDoc(docRef);
  },

  async saveNode(node: WorkflowNode): Promise<void> {
    const docRef = doc(db, NODES_COLLECTION, node.id);
    await setDoc(docRef, node);
  },

  async updateNode(id: string, data: Partial<WorkflowNode>): Promise<void> {
    const docRef = doc(db, NODES_COLLECTION, id);
    await updateDoc(docRef, data);
  },

  async deleteNode(id: string): Promise<void> {
    const docRef = doc(db, NODES_COLLECTION, id);
    await deleteDoc(docRef);
  },
};
