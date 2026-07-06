import React, { useState, useEffect, useRef } from "react";
import { Search, UserPlus, FileText, ChevronRight, Loader2, X, User, UploadCloud, Sparkles } from "lucide-react";
import {
  PatientQuickSummary,
  Patient,
} from "../components/PatientQuickSummary";
import { db } from "../lib/firebase";
import { collection, getDocs, doc, setDoc, addDoc, updateDoc } from "firebase/firestore";
import { handleFirestoreError, OperationType } from "../lib/firestore-diagnostics";
import { getPatientInitials } from "../lib/patientUtils";

const MOCK_PATIENTS: Patient[] = [
  {
    id: "1",
    name: "J. K.",
    ipNumber: "IP-2023-1001",
    age: 45,
    sex: "M",
    ward: "Medical Ward A",
    lastAdmission: "Oct 12, 2023",
    vitals: { bp: "140/90", hr: 88, temp: 37.2, rr: 18, spo2: 96 },
    vitalsHistory: [
      {
        time: "08:00",
        date: "Oct 24",
        hr: 82,
        temp: 36.8,
        spo2: 98,
        bpSystolic: 130,
        bpDiastolic: 85,
      },
      {
        time: "12:00",
        date: "Oct 24",
        hr: 85,
        temp: 37.0,
        spo2: 97,
        bpSystolic: 135,
        bpDiastolic: 88,
      },
      {
        time: "16:00",
        date: "Oct 24",
        hr: 88,
        temp: 37.2,
        spo2: 96,
        bpSystolic: 140,
        bpDiastolic: 90,
      },
    ],
    alerts: [
      {
        id: "a1",
        type: "warning",
        message: "Elevated blood pressure observed in last 2 readings.",
      },
    ],
    notes: [],
  },
  {
    id: "2",
    name: "G. W.",
    ipNumber: "IP-2023-1002",
    age: 32,
    sex: "F",
    ward: "Maternity Wing",
    lastAdmission: "Oct 14, 2023",
    vitals: { bp: "120/80", hr: 76, temp: 36.8, rr: 16, spo2: 99 },
    vitalsHistory: [
      {
        time: "08:00",
        date: "Oct 24",
        hr: 72,
        temp: 36.5,
        spo2: 99,
        bpSystolic: 118,
        bpDiastolic: 78,
      },
    ],
    alerts: [],
    notes: [],
  },
  {
    id: "3",
    name: "S. O.",
    ipNumber: "IP-2023-1003",
    age: 58,
    sex: "M",
    ward: "ICU",
    lastAdmission: "Oct 15, 2023",
    vitals: { bp: "90/60", hr: 110, temp: 38.5, rr: 24, spo2: 88 },
    vitalsHistory: [
      {
        time: "08:00",
        date: "Oct 24",
        hr: 95,
        temp: 37.5,
        spo2: 92,
        bpSystolic: 100,
        bpDiastolic: 70,
      },
    ],
    alerts: [
      {
        id: "a2",
        type: "critical",
        message: "Desaturation alert: SpO2 dropped below 90%.",
      },
    ],
    notes: [],
  },
];

export default function PatientsScreen() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // New Patient modal states
  const [showNewModal, setShowNewModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("40");
  const [newSex, setNewSex] = useState("M");
  const [newWard, setNewWard] = useState("Medical Ward A");
  const [newIpNumber, setNewIpNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AI Extraction State
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('extractionType', 'patient');

      const res = await fetch('/api/gemini/extract-file', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to extract patient data');
      
      const data = await res.json();
      
      if (data.name) setNewName(getPatientInitials(data.name));
      if (data.age) setNewAge(String(data.age));
      if (data.sex) setNewSex(data.sex);
      if (data.ipNumber) setNewIpNumber(data.ipNumber);
      if (data.ward) setNewWard(data.ward);
      
    } catch (error) {
      console.error('Extraction error:', error);
      alert('Could not extract data from the uploaded file.');
    } finally {
      setIsExtracting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const fetchPatients = async () => {
    setIsLoading(true);
    const path = "patients";
    try {
      const querySnapshot = await getDocs(collection(db, path));
      if (querySnapshot.empty) {
        // Seed patients to Firestore if empty
        const seededPatients: Patient[] = [];
        for (const p of MOCK_PATIENTS) {
          const docRef = doc(collection(db, "patients"));
          const patientWithId = { ...p, id: docRef.id };
          await setDoc(docRef, patientWithId);
          seededPatients.push(patientWithId);
        }
        setPatients(seededPatients);
      } else {
        const patientList: Patient[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          patientList.push({
            id: docSnap.id,
            name: data.name || "",
            ipNumber: data.ipNumber || "",
            age: Number(data.age) || 0,
            sex: data.sex || "M",
            ward: data.ward || "",
            lastAdmission: data.lastAdmission || "",
            vitals: data.vitals || { bp: "120/80", hr: 70, temp: 36.5, rr: 16, spo2: 98 },
            vitalsHistory: data.vitalsHistory || [],
            alerts: data.alerts || [],
            labs: data.labs || [],
            notes: data.notes || [],
          });
        });
        setPatients(patientList);
      }
    } catch (error) {
      console.error("Error fetching patients from Firestore:", error);
      // Fallback gracefully to MOCK if off-line or error
      setPatients(MOCK_PATIENTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const selectedPatient =
    patients.find((p) => p.id === selectedPatientId) || null;

  const filteredPatients = patients.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.ipNumber.toLowerCase().includes(q) ||
      p.ward.toLowerCase().includes(q)
    );
  });

  const handleUpdateVitals = async (
    patientId: string,
    updatedVitals: Patient["vitals"],
  ) => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const dateString = now.toLocaleDateString(undefined, { month: "short", day: "numeric" });

    const patient = patients.find((p) => p.id === patientId);
    if (!patient) return;

    const newHistoryItem = {
      time: timeString,
      date: dateString,
      hr: Number(updatedVitals.hr),
      temp: Number(updatedVitals.temp),
      spo2: Number(updatedVitals.spo2),
      bpSystolic: parseInt(updatedVitals.bp.split("/")[0]) || 120,
      bpDiastolic: parseInt(updatedVitals.bp.split("/")[1]) || 80,
    };

    const updatedHistory = [...(patient.vitalsHistory || []), newHistoryItem];

    // Optimistic Local state update
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          return {
            ...p,
            vitals: updatedVitals,
            vitalsHistory: updatedHistory,
          };
        }
        return p;
      }),
    );

    // Save to Firestore
    const path = `patients/${patientId}`;
    try {
      await updateDoc(doc(db, "patients", patientId), {
        vitals: updatedVitals,
        vitalsHistory: updatedHistory,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const handleAddNote = async (patientId: string, noteText: string) => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const patient = patients.find((p) => p.id === patientId);
    if (!patient) return;

    const updatedNotes = [...(patient.notes || []), { time: timeString, text: noteText }];

    // Optimistic local update
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          return {
            ...p,
            notes: updatedNotes,
          };
        }
        return p;
      }),
    );

    // Save to Firestore
    const path = `patients/${patientId}`;
    try {
      await updateDoc(doc(db, "patients", patientId), {
        notes: updatedNotes,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsSubmitting(true);
    const path = "patients";
    try {
      const now = new Date();
      const dateString = now.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
      
      const newPatientData = {
        name: getPatientInitials(newName),
        age: Number(newAge),
        sex: newSex,
        ward: newWard,
        ipNumber: newIpNumber.trim() || `IP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        lastAdmission: dateString,
        vitals: { bp: "120/80", hr: 72, temp: 36.8, rr: 16, spo2: 98 },
        vitalsHistory: [],
        alerts: [],
        labs: [],
        notes: [],
      };

      const docRef = await addDoc(collection(db, path), newPatientData);
      
      // Clear forms
      setNewName("");
      setNewAge("40");
      setNewSex("M");
      setNewWard("Medical Ward A");
      setNewIpNumber("");
      setShowNewModal(false);

      // Refresh list
      await fetchPatients();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-[1400px] mx-auto space-y-4 md:space-y-6 pb-24 selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">
            Patients
          </h1>
          <p className="text-[var(--text-muted)] text-sm">
            Patient registry, demographics, clinical notes, and vitals plotting.
          </p>
        </div>
        <button 
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-95 transition-opacity shadow-sm"
        >
          <UserPlus size={18} />
          Add Patient
        </button>
      </div>

      <div className="bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)] shadow-sm flex items-center gap-3">
        <Search size={20} className="text-[var(--text-dim)]" />
        <input
          type="text"
          placeholder="Search by name, IP number, or ward..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-[var(--text)] text-sm focus:ring-0"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Table Section */}
        <div
          className={`transition-all duration-300 ${selectedPatient ? "lg:w-2/3" : "w-full"}`}
        >
          {isLoading ? (
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-12 text-center shadow-sm">
              <Loader2 size={32} className="animate-spin text-[var(--primary)] mx-auto mb-3" />
              <p className="text-sm text-[var(--text-muted)]">Fetching patient clinical records...</p>
            </div>
          ) : (
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden animate-in fade-in duration-300">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[var(--surface-dim)] text-[var(--text-muted)] text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 font-bold">Patient Name</th>
                      <th className="px-6 py-4 font-bold">IP Number</th>
                      <th className="px-6 py-4 font-bold hidden sm:table-cell">
                        Age/Sex
                      </th>
                      <th className="px-6 py-4 font-bold hidden md:table-cell">
                        Ward
                      </th>
                      <th className="px-6 py-4 font-bold text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient) => (
                        <tr
                          key={patient.id}
                          className={`transition-colors cursor-pointer ${
                            selectedPatientId === patient.id
                              ? "bg-[var(--primary-container)]"
                              : "hover:bg-[var(--surface-dim)]"
                          }`}
                          onClick={() => setSelectedPatientId(patient.id)}
                        >
                          <td className="px-6 py-4 font-semibold text-[var(--text)]">
                            {getPatientInitials(patient.name)}
                            {patient.alerts?.some(
                              (a) => a.type === "critical",
                            ) && (
                              <span className="ml-2 inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-[var(--text-muted)] font-mono text-xs">
                            {patient.ipNumber}
                          </td>
                          <td className="px-6 py-4 text-[var(--text-muted)] hidden sm:table-cell font-medium">
                            {patient.age} / {patient.sex}
                          </td>
                          <td className="px-6 py-4 text-[var(--text-muted)] hidden md:table-cell font-medium">
                            {patient.ward}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-[var(--primary)] hover:underline font-bold text-xs inline-flex items-center gap-1">
                              View Profile
                              <ChevronRight size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-8 text-center text-[var(--text-muted)] font-medium"
                        >
                          No patients found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Quick Summary Section */}
        {selectedPatient && (
          <div className="lg:w-1/3">
            <div className="sticky top-24 h-[calc(100vh-8rem)]">
              <PatientQuickSummary
                patient={selectedPatient}
                onClose={() => setSelectedPatientId(null)}
                onUpdateVitals={handleUpdateVitals}
                onAddNote={handleAddNote}
              />
            </div>
          </div>
        )}
      </div>

      {/* New Patient Modal Dialog */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--surface)] w-full max-w-md rounded-2xl border border-[var(--border)] shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-dim)]">
              <h3 className="text-lg font-bold text-[var(--text)]">Register New Patient</h3>
              <button 
                onClick={() => setShowNewModal(false)}
                className="p-1.5 hover:bg-[var(--surface-dim)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* AI Extraction Banner */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b border-[var(--border)] text-left flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[var(--primary)] flex items-center gap-1">
                  <Sparkles size={14} /> AI Auto-Fill
                </span>
                <span className="text-xs text-[var(--text-muted)] mt-0.5">Upload a document, image, or audio to extract patient details.</span>
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*,audio/*,application/pdf"
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isExtracting}
                className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-gray-800 border border-[var(--border)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap disabled:opacity-50"
              >
                {isExtracting ? (
                  <><Loader2 size={14} className="animate-spin" /> Extracting...</>
                ) : (
                  <><UploadCloud size={14} /> Upload</>
                )}
              </button>
            </div>

            <form onSubmit={handleCreatePatient}>
              <div className="p-6 space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Patient Full Name</label>
                  <input 
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Age</label>
                    <input 
                      type="number"
                      required
                      value={newAge}
                      onChange={(e) => setNewAge(e.target.value)}
                      placeholder="40"
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Sex</label>
                    <select 
                      value={newSex}
                      onChange={(e) => setNewSex(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--primary)]"
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">IP / OP Number</label>
                  <input 
                    type="text"
                    value={newIpNumber}
                    onChange={(e) => setNewIpNumber(e.target.value)}
                    placeholder="Leave blank to auto-generate"
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--primary)] font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Ward Assignment</label>
                  <select 
                    value={newWard}
                    onChange={(e) => setNewWard(e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--primary)]"
                  >
                    <option value="Medical Ward A">Medical Ward A</option>
                    <option value="Medical Ward B">Medical Ward B</option>
                    <option value="Surgical Ward">Surgical Ward</option>
                    <option value="ICU">ICU</option>
                    <option value="Maternity Wing">Maternity Wing</option>
                  </select>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end gap-3 bg-[var(--surface-dim)]">
                <button 
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 border border-[var(--border)] hover:bg-[var(--surface-dim)] text-[var(--text)] font-semibold text-sm rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold text-sm rounded-lg hover:opacity-95 transition-opacity flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
