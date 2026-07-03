import React, { useState, useEffect } from "react";
import {
  BrainCircuit,
  AlertTriangle,
  Activity,
  Users,
  ChevronRight,
  ShieldAlert,
  HeartPulse,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getPatientInitials } from "../lib/patientUtils";

interface TriagePatient {
  id: string;
  name: string;
  ward: string;
  condition: string;
  vitals: { hr: number; spo2: number; bp: string; temp: number };
  score: number;
  urgency: "Critical" | "High" | "Moderate" | "Low";
}

const MOCK_TRIAGE_PATIENTS: TriagePatient[] = [
  {
    id: "1",
    name: "J. K.",
    ward: "Medical Ward A",
    condition: "Hypertension",
    vitals: { hr: 88, spo2: 96, bp: "140/90", temp: 37.2 },
    score: 0,
    urgency: "Low",
  },
  {
    id: "3",
    name: "S. O.",
    ward: "ICU",
    condition: "Sepsis Suspected",
    vitals: { hr: 112, spo2: 88, bp: "85/55", temp: 38.6 },
    score: 0,
    urgency: "Low",
  },
  {
    id: "4",
    name: "A. H.",
    ward: "Surgical Ward",
    condition: "Post-op Recovery",
    vitals: { hr: 82, spo2: 98, bp: "115/75", temp: 37.0 },
    score: 0,
    urgency: "Low",
  },
  {
    id: "6",
    name: "M. N.",
    ward: "Emergency",
    condition: "Asthma Exacerbation",
    vitals: { hr: 105, spo2: 91, bp: "130/80", temp: 36.8 },
    score: 0,
    urgency: "Low",
  },
  {
    id: "5",
    name: "D. M.",
    ward: "Medical Ward B",
    condition: "Diabetes Type II",
    vitals: { hr: 70, spo2: 95, bp: "135/85", temp: 36.5 },
    score: 0,
    urgency: "Low",
  },
];

function calculateRiskScore(vitals: TriagePatient["vitals"]): number {
  let score = 0;
  const systolic = parseInt(vitals.bp.split("/")[0]) || 120;

  if (vitals.hr >= 110 || vitals.hr <= 50) score += 3;
  else if (vitals.hr > 100) score += 1;

  if (vitals.spo2 <= 90) score += 4;
  else if (vitals.spo2 <= 94) score += 2;

  if (systolic >= 180 || systolic <= 90) score += 3;
  else if (systolic > 140) score += 1;

  if (vitals.temp >= 38.5 || vitals.temp <= 35.0) score += 2;
  else if (vitals.temp >= 38.0) score += 1;

  return score;
}

function assignUrgency(score: number): TriagePatient["urgency"] {
  if (score >= 6) return "Critical";
  if (score >= 4) return "High";
  if (score >= 2) return "Moderate";
  return "Low";
}

function getUrgencyColors(urgency: string) {
  switch (urgency) {
    case "Critical":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    case "High":
      return "bg-orange-500/10 text-orange-600 border-orange-500/20";
    case "Moderate":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    default:
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
  }
}

export function PatientTriage() {
  const [patients, setPatients] =
    useState<TriagePatient[]>(MOCK_TRIAGE_PATIENTS);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      const analyzed = MOCK_TRIAGE_PATIENTS.map((p) => {
        const score = calculateRiskScore(p.vitals);
        return { ...p, score, urgency: assignUrgency(score) };
      });
      // Sort descending by score
      analyzed.sort((a, b) => b.score - a.score);
      setPatients(analyzed);
      setIsAnalyzing(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-dim)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] flex items-center justify-center">
            <ShieldAlert size={20} className="text-[var(--primary)]" />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--text)] text-lg tracking-tight">
              AI Patient Triage
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-medium">
              Dynamically sorting by clinical risk score
            </p>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 rounded-full animate-pulse shadow-sm">
            <BrainCircuit
              size={14}
              className="text-[var(--primary)] animate-spin-slow"
            />
            Analyzing Vitals...
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-medium bg-[var(--primary-container)] text-[var(--primary)] px-3 py-1.5 rounded-full">
            <BrainCircuit size={14} />
            Triage Complete
          </div>
        )}
      </div>

      <div className="divide-y divide-[var(--border)]">
        {patients.slice(0, 4).map((patient, index) => (
          <div
            key={patient.id}
            className={`p-4 flex items-center gap-4 transition-colors ${
              !isAnalyzing && patient.urgency === "Critical"
                ? "bg-red-500/5 hover:bg-red-500/10"
                : "hover:bg-[var(--surface-dim)]"
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-bold text-[var(--text)] truncate">
                  {getPatientInitials(patient.name)}
                </p>
                {!isAnalyzing && (
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getUrgencyColors(patient.urgency)}`}
                  >
                    {patient.urgency} (Score: {patient.score})
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-muted)] font-medium">
                <span className="flex items-center gap-1">
                  <Users size={12} /> {patient.ward}
                </span>
                <span className="flex items-center gap-1">
                  <Activity size={12} /> {patient.condition}
                </span>
                <span className="flex items-center gap-1">
                  <HeartPulse
                    size={12}
                    className={
                      !isAnalyzing && patient.vitals.hr > 100
                        ? "text-red-500"
                        : ""
                    }
                  />{" "}
                  HR: {patient.vitals.hr}
                </span>
                <span className="flex items-center gap-1">
                  <Activity
                    size={12}
                    className={
                      !isAnalyzing && parseInt(patient.vitals.bp) < 100
                        ? "text-red-500"
                        : ""
                    }
                  />{" "}
                  BP: {patient.vitals.bp}
                </span>
              </div>
            </div>

            <Link
              to="/patients"
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-container)] transition-colors shrink-0"
            >
              <ChevronRight size={18} />
            </Link>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-[var(--border)] bg-[var(--surface-dim)]">
        <Link
          to="/patients"
          className="text-xs font-semibold text-[var(--primary)] w-full text-center block hover:underline"
        >
          View All Patients in Ward
        </Link>
      </div>
    </div>
  );
}
