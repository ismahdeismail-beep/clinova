import React from 'react'
import {
  FileText, AlertTriangle, Pill, ClipboardList, Stethoscope,
} from 'lucide-react'
import type { ClinicalFormSchema, FormValues } from './FormBuilder'

const SEVERITY_OPTIONS = [
  { value: 'minor', label: 'Minor' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'severe', label: 'Severe' },
  { value: 'life-threatening', label: 'Life-threatening' },
  { value: 'fatal', label: 'Fatal' },
]

const DTP_OPTIONS = [
  { value: 'unnecessary-drug', label: 'Unnecessary drug' },
  { value: 'needs-additional-drug', label: 'Needs additional drug' },
  { value: 'ineffective-drug', label: 'Ineffective drug' },
  { value: 'dosage-too-low', label: 'Dosage too low' },
  { value: 'dosage-too-high', label: 'Dosage too high' },
  { value: 'adr', label: 'Adverse drug reaction' },
  { value: 'non-adherence', label: 'Non-adherence' },
  { value: 'interaction', label: 'Drug interaction' },
  { value: 'monitoring-needed', label: 'Monitoring needed' },
  { value: 'cost-concern', label: 'Cost concern' },
]

export const SOAP_FORM: ClinicalFormSchema = {
  id: 'soap-note',
  title: 'SOAP Note',
  description: 'Structured subjective, objective, assessment, and plan documentation.',
  icon: <FileText size={18} />,
  sections: [
    {
      id: 'subjective',
      title: 'Subjective',
      description: 'Patient-reported information.',
      fields: [
        { name: 'chiefComplaint', label: 'Chief Complaint', type: 'text', required: true, columns: 2 },
        { name: 'hpi', label: 'History of Presenting Illness', type: 'textarea', required: true, columns: 2 },
        { name: 'medications', label: 'Current Medications', type: 'list', placeholder: 'Add medication…', columns: 2 },
        { name: 'allergies', label: 'Allergies', type: 'list', placeholder: 'Add allergen…', columns: 2 },
      ],
    },
    {
      id: 'objective',
      title: 'Objective',
      description: 'Measurable, observable findings.',
      fields: [
        { name: 'vitals', label: 'Vital Signs', type: 'textarea', placeholder: 'BP, HR, RR, Temp, SpO2…', columns: 2 },
        { name: 'exam', label: 'Examination Findings', type: 'textarea', columns: 2 },
        { name: 'investigations', label: 'Investigations / Results', type: 'list', placeholder: 'Add result…', columns: 2 },
      ],
    },
    {
      id: 'assessment',
      title: 'Assessment',
      fields: [
        { name: 'workingDiagnosis', label: 'Working Diagnosis', type: 'text', required: true, columns: 2 },
        { name: 'differential', label: 'Differential Diagnoses', type: 'list', placeholder: 'Add differential…', columns: 2 },
        { name: 'problems', label: 'Problem List', type: 'textarea', columns: 2 },
      ],
    },
    {
      id: 'plan',
      title: 'Plan',
      fields: [
        { name: 'pharmacological', label: 'Pharmacological Plan', type: 'textarea', columns: 2 },
        { name: 'nonPharmacological', label: 'Non-Pharmacological Plan', type: 'textarea', columns: 2 },
        { name: 'monitoring', label: 'Monitoring', type: 'list', placeholder: 'Add monitoring item…', columns: 2 },
        { name: 'followUp', label: 'Follow-up', type: 'text', placeholder: 'e.g. 2 weeks', columns: 2 },
      ],
    },
  ],
}

export const ADR_FORM: ClinicalFormSchema = {
  id: 'adr-report',
  title: 'ADR Reporting Form',
  description: 'Suspected adverse drug reaction reporting (pharmacovigilance).',
  icon: <AlertTriangle size={18} />,
  sections: [
    {
      id: 'reporter',
      title: 'Reporter & Patient',
      fields: [
        { name: 'reporterName', label: 'Reporter Name', type: 'text', required: true },
        { name: 'reporterRole', label: 'Role', type: 'select', options: [
          { value: 'pharmacist', label: 'Pharmacist' },
          { value: 'doctor', label: 'Physician' },
          { value: 'nurse', label: 'Nurse' },
          { value: 'other', label: 'Other' },
        ] },
        { name: 'patientAge', label: 'Patient Age', type: 'number', required: true, min: 0, max: 130 },
        { name: 'patientSex', label: 'Sex', type: 'select', options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ] },
      ],
    },
    {
      id: 'reaction',
      title: 'Reaction Details',
      fields: [
        { name: 'suspectDrug', label: 'Suspected Drug', type: 'medicine', required: true, columns: 2 },
        { name: 'reaction', label: 'Description of Reaction', type: 'textarea', required: true, columns: 2 },
        { name: 'severity', label: 'Severity', type: 'select', required: true, options: SEVERITY_OPTIONS },
        { name: 'onsetDate', label: 'Onset Date', type: 'date' },
        { name: 'outcome', label: 'Outcome', type: 'select', options: [
          { value: 'recovered', label: 'Recovered' },
          { value: 'recovering', label: 'Recovering' },
          { value: 'ongoing', label: 'Ongoing' },
          { value: 'fatal', label: 'Fatal' },
        ] },
        { name: 'serious', label: 'Serious ADR (hospitalization, disability, life-threatening)', type: 'checkbox' },
      ],
    },
    {
      id: 'actions',
      title: 'Actions',
      fields: [
        { name: 'actionTaken', label: 'Action Taken with Drug', type: 'textarea', columns: 2 },
        { name: 'concomitant', label: 'Concomitant Medications', type: 'list', placeholder: 'Add medication…', columns: 2 },
        { name: 'notes', label: 'Additional Notes', type: 'textarea', columns: 2 },
      ],
    },
  ],
}

export const MED_RECON_FORM: ClinicalFormSchema = {
  id: 'med-reconciliation',
  title: 'Medication Reconciliation',
  description: 'Reconcile home medications against the hospital order set.',
  icon: <Pill size={18} />,
  sections: [
    {
      id: 'admission',
      title: 'Admission (Home) Medications',
      fields: [
        { name: 'homeMeds', label: 'Home Medication List', type: 'list', required: true, placeholder: 'Add drug + dose + frequency…', columns: 2 },
        { name: 'adherence', label: 'Adherence', type: 'select', options: [
          { value: 'good', label: 'Good' },
          { value: 'partial', label: 'Partial' },
          { value: 'poor', label: 'Poor' },
          { value: 'unknown', label: 'Unknown' },
        ] },
        { name: 'otc', label: 'OTC / Herbal / Traditional', type: 'list', placeholder: 'Add product…', columns: 2 },
      ],
    },
    {
      id: 'reconciliation',
      title: 'Reconciliation',
      fields: [
        { name: 'discrepancies', label: 'Discrepancies Found', type: 'textarea', columns: 2 },
        { name: 'omitted', label: 'Omitted Medications', type: 'list', placeholder: 'Add omitted drug…', columns: 2 },
        { name: 'added', label: 'Newly Started', type: 'list', placeholder: 'Add started drug…', columns: 2 },
        { name: 'verifiedBy', label: 'Verified By', type: 'text' },
      ],
    },
  ],
}

export const PHARM_REVIEW_FORM: ClinicalFormSchema = {
  id: 'pharmacotherapy-review',
  title: 'Pharmacotherapy Review',
  description: 'Structured pharmaceutical care review with drug-related problems.',
  icon: <Stethoscope size={18} />,
  sections: [
    {
      id: 'context',
      title: 'Context',
      fields: [
        { name: 'patientId', label: 'Patient Identifier', type: 'text' },
        { name: 'indication', label: 'Primary Indication', type: 'text', required: true, columns: 2 },
        { name: 'currentTreatment', label: 'Current Treatment', type: 'textarea', required: true, columns: 2 },
      ],
    },
    {
      id: 'problems',
      title: 'Drug-Related Problems',
      fields: [
        { name: 'problemTypes', label: 'Problem Categories', type: 'multiselect', options: DTP_OPTIONS, columns: 2 },
        { name: 'problemDetail', label: 'Problem Detail & Recommendations', type: 'textarea', columns: 2 },
        { name: 'effectiveness', label: 'Effectiveness Assessment', type: 'textarea' },
        { name: 'safety', label: 'Safety Assessment', type: 'textarea' },
      ],
    },
    {
      id: 'plan',
      title: 'Care Plan',
      fields: [
        { name: 'monitoring', label: 'Monitoring Needs', type: 'list', placeholder: 'Add monitoring parameter…', columns: 2 },
        { name: 'counseling', label: 'Patient Counseling Points', type: 'textarea', columns: 2 },
        { name: 'cost', label: 'Cost Considerations', type: 'textarea', columns: 2 },
      ],
    },
  ],
}

export const CLINICAL_FORMS: ClinicalFormSchema[] = [
  SOAP_FORM,
  ADR_FORM,
  MED_RECON_FORM,
  PHARM_REVIEW_FORM,
]

export type { FormValues }
