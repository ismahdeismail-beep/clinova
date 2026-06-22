import { collection, doc, getDoc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Workflow, WorkflowNode } from '../types/engine';

const WORKFLOWS_COLLECTION = 'workflows';
const NODES_COLLECTION = 'workflow_nodes';

export const WorkflowService = {
  async getWorkflow(id: string): Promise<Workflow | null> {
    const docRef = doc(db, WORKFLOWS_COLLECTION, id);
    const snap = await getDoc(docRef);
    if (snap.exists()) return snap.data() as Workflow;
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

  async saveNode(node: WorkflowNode): Promise<void> {
    const docRef = doc(db, NODES_COLLECTION, node.id);
    await setDoc(docRef, node);
  }
};
