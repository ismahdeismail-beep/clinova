import React, { useState } from "react";
import { Search, UserPlus, FileText, ChevronRight } from "lucide-react";
import {
  PatientQuickSummary,
  Patient,
} from "../components/PatientQuickSummary";

const MOCK_PATIENTS: Patient[] = [
  {
    id: "1",
    name: "James Kamau",
    ipNumber: "IP-2023-1001",
    age: 45,
    sex: "M",
    ward: "Medical Ward A",
    lastAdmission: "Oct 12, 2023",
    vitals: { bp: "140/90", hr: 88, temp: 37.2, rr: 18, spo2: 96 },
    vitalsHistory: [
      { time: "08:00", hr: 82, temp: 36.8, spo2: 98 },
      { time: "12:00", hr: 85, temp: 37.0, spo2: 97 },
      { time: "16:00", hr: 88, temp: 37.2, spo2: 96 },
    ],
    alerts: [
      {
        id: "a1",
        type: "warning",
        message: "Elevated blood pressure observed in last 2 readings.",
      },
    ],
  },
  {
    id: "2",
    name: "Grace Wanjiku",
    ipNumber: "IP-2023-1002",
    age: 32,
    sex: "F",
    ward: "Maternity Wing",
    lastAdmission: "Oct 14, 2023",
    vitals: { bp: "120/80", hr: 76, temp: 36.8, rr: 16, spo2: 99 },
    vitalsHistory: [
      { time: "08:00", hr: 72, temp: 36.5, spo2: 99 },
      { time: "12:00", hr: 75, temp: 36.7, spo2: 99 },
      { time: "16:00", hr: 76, temp: 36.8, spo2: 99 },
    ],
    alerts: [],
  },
  {
    id: "3",
    name: "Samuel Ochieng",
    ipNumber: "IP-2023-1003",
    age: 58,
    sex: "M",
    ward: "ICU",
    lastAdmission: "Oct 15, 2023",
    vitals: { bp: "90/60", hr: 110, temp: 38.5, rr: 24, spo2: 88 },
    vitalsHistory: [
      { time: "08:00", hr: 95, temp: 37.5, spo2: 92 },
      { time: "10:00", hr: 102, temp: 38.0, spo2: 90 },
      { time: "12:00", hr: 108, temp: 38.2, spo2: 89 },
      { time: "14:00", hr: 110, temp: 38.5, spo2: 88 },
    ],
    alerts: [
      {
        id: "a2",
        type: "critical",
        message: "Desaturation alert: SpO2 dropped below 90%.",
      },
      {
        id: "a3",
        type: "critical",
        message: "Tachycardia and fever present. Suspected sepsis.",
      },
    ],
  },
  {
    id: "4",
    name: "Aisha Hassan",
    ipNumber: "IP-2023-1004",
    age: 27,
    sex: "F",
    ward: "Surgical Ward",
    lastAdmission: "Oct 16, 2023",
    vitals: { bp: "115/75", hr: 82, temp: 37.0, rr: 14, spo2: 98 },
    vitalsHistory: [
      { time: "08:00", hr: 80, temp: 36.9, spo2: 98 },
      { time: "12:00", hr: 82, temp: 37.0, spo2: 98 },
    ],
    alerts: [
      {
        id: "a4",
        type: "info",
        message: "Scheduled for dressing change at 14:00.",
      },
    ],
  },
  {
    id: "5",
    name: "David Mutua",
    ipNumber: "IP-2023-1005",
    age: 64,
    sex: "M",
    ward: "Medical Ward B",
    lastAdmission: "Oct 10, 2023",
    vitals: { bp: "135/85", hr: 70, temp: 36.5, rr: 16, spo2: 95 },
    vitalsHistory: [
      { time: "08:00", hr: 72, temp: 36.4, spo2: 96 },
      { time: "12:00", hr: 70, temp: 36.5, spo2: 95 },
    ],
    alerts: [
      {
        id: "a5",
        type: "warning",
        message: "Pending fasting blood sugar results.",
      },
    ],
  },
];

export default function PatientsScreen() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null,
  );

  const selectedPatient =
    MOCK_PATIENTS.find((p) => p.id === selectedPatientId) || null;

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">
            Patients
          </h1>
          <p className="text-[var(--text-muted)] text-sm">
            Patient registry and demographic profiles.
          </p>
        </div>
        <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
          <UserPlus size={18} />
          New Patient
        </button>
      </div>

      <div className="bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] shadow-sm flex items-center gap-3">
        <Search size={20} className="text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Search by name, IP number, or ID..."
          className="flex-1 bg-transparent border-none outline-none text-[var(--text)]"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Table Section */}
        <div
          className={`transition-all duration-300 ${selectedPatient ? "lg:w-2/3" : "w-full"}`}
        >
          <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[var(--surface-dim)] text-[var(--text-muted)] text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4 font-medium">Patient Name</th>
                    <th className="px-6 py-4 font-medium">IP Number</th>
                    <th className="px-6 py-4 font-medium hidden sm:table-cell">
                      Age/Sex
                    </th>
                    <th className="px-6 py-4 font-medium hidden md:table-cell">
                      Ward
                    </th>
                    <th className="px-6 py-4 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
                  {MOCK_PATIENTS.map((patient) => (
                    <tr
                      key={patient.id}
                      className={`transition-colors cursor-pointer ${
                        selectedPatientId === patient.id
                          ? "bg-[var(--primary-container)]"
                          : "hover:bg-[var(--surface-dim)]"
                      }`}
                      onClick={() => setSelectedPatientId(patient.id)}
                    >
                      <td className="px-6 py-4 font-medium text-[var(--text)]">
                        {patient.name}
                        {patient.alerts.some((a) => a.type === "critical") && (
                          <span className="ml-2 inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-[var(--text-muted)]">
                        {patient.ipNumber}
                      </td>
                      <td className="px-6 py-4 text-[var(--text-muted)] hidden sm:table-cell">
                        {patient.age} / {patient.sex}
                      </td>
                      <td className="px-6 py-4 text-[var(--text-muted)] hidden md:table-cell">
                        {patient.ward}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[var(--primary)] hover:underline font-medium text-xs inline-flex items-center gap-1">
                          View
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Summary Section */}
        {selectedPatient && (
          <div className="lg:w-1/3">
            <div className="sticky top-24 h-[calc(100vh-8rem)]">
              <PatientQuickSummary
                patient={selectedPatient}
                onClose={() => setSelectedPatientId(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
