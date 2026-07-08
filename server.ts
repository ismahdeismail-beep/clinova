import { processAcademicRequest } from "./src/server/academicEngine.js";
import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import crypto from 'crypto';

import multer from 'multer';
import { 
  generateContentWithFallback, 
  getProviderStatusList, 
  getGlobalProviderOverride, 
  setGlobalProviderOverride, 
  providerStatuses,
  gatewayLogs,
  loadBalancingMode,
  setLoadBalancingMode,
  updateProviderConfig
} from './src/server/aiRouter.js';
import { getPrompts, updatePrompt, resetPrompts } from './src/server/promptRegistry.js';
import { fetchOpenFdaLabel, resolveRxCui, fetchRxNormInteractions } from './src/server/externalMedicinesApi.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;
const upload = multer({ storage: multer.memoryStorage() });

function safeJsonParse(text: string | null | undefined, fallback: any = {}): any {
  if (!text) return fallback;
  try {
    let cleaned = text.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/, '').trim();
    }
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn("[JSON Parse warning] Failed standard parse, trying regex extract:", err);
    try {
      const match = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (match) {
        return JSON.parse(match[0]);
      }
    } catch (regexErr) {
      console.error("[JSON Parse error] Regex extraction failed too:", regexErr);
    }
    return fallback;
  }
}

app.use(express.json());

// Proxy Cloudinary Upload
app.post('/api/cloudinary/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
    const uploadPreset = process.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

    const formData = new FormData();
    const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
    formData.append('file', blob, req.file.originalname);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: formData as any,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to upload to Cloudinary');
    }

    const data = await response.json();
    res.json({
      secure_url: data.secure_url,
      public_id: data.public_id,
    });
  } catch (error: any) {
    console.error('Cloudinary proxy upload error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'Failed to upload image' });
  }
});

function getPatientInitialsBackend(name: string): string {
  if (!name) return "";
  const trimmed = name.trim();
  
  // If it's already formatted as initials (e.g., "J. K." or "J.K."), return as is
  if (/^[A-Z](\.?\s*[A-Z]\.?)*$/.test(trimmed)) {
    return trimmed;
  }
  
  const parts = trimmed.split(/[\s\-_,\.]+/).filter(Boolean);
  if (parts.length === 0) return "";
  
  // Map each part of the name to its capitalized first character and join with ". "
  const initials = parts
    .map(p => p.charAt(0).toUpperCase())
    .join(". ");
  
  return initials + ".";
}

// File Extraction Endpoint supporting multiple files and extracting the complete clinical form
app.post('/api/gemini/extract-file', upload.any(), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files provided' });
    }
    
    const { extractionType } = req.body;
    const type = extractionType || 'patient';
    
    let prompt = '';
    let responseSchema: any = {};

    if (type === 'patient') {
      prompt = `Extract patient demographic information from the provided files.
ANONYMITY REQUIREMENT: Extract the patient's name but convert it strictly to uppercase initials only (e.g., "Joseph Kimuge Chepyegon" -> "J. K. C."). Never output the full name.
Return a JSON object with:
- name (string)
- age (number)
- sex (string: "M", "F", or "Other")
- ipNumber (string, optional)
- ward (string, optional)`;
      
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          age: { type: Type.NUMBER },
          sex: { type: Type.STRING },
          ipNumber: { type: Type.STRING },
          ward: { type: Type.STRING }
        }
      };
    } else if (type === 'pharmacotherapy') {
      prompt = `You are Clinova's Pharmacotherapy Review Assistant. Analyze all the uploaded files (which can be clinical clerking notes, prescription charts, admitting sheets, lab results, etc.) and extract comprehensive clinical data to auto-fill the standardized Pharmacotherapy Review Form (Kabarak University School of Pharmacy format).

CRITICAL CONSTRAINTS:
1. Patient Anonymity: Extract the patient's name but render it strictly as UPPERCASE INITIALS only (e.g., "Joseph Kimuge Chepyegon" -> "J. K. C.") in the "patientName" field. Never output full names. Ensure relative or next-of-kin names are also converted to initials if mentioned.
2. Chief Complaint formatting: Must be stated strictly as "[duration] history of [symptom]" in order of clinical priority/urgency, NOT as a diagnosis (e.g., write "3-day history of a painful, swollen left leg", NOT "Deep Venous Thrombosis").
3. Systems & Vitals/Labs: Extract actual recorded numbers/findings. If a test is ordered but has no result, write "Pending — ordered [date], results awaited". If a system is not mentioned or examined, leave it blank or write "Not documented".
4. Medication History (pre-admission): List drugs taken prior to admission in "currentMedications".
5. Working Diagnoses (diagnosis): Number and list actual problems/diagnoses in clinical priority order.
6. Current Pharmacological Management: Extract up to 5 pharmacological treatments. Include continued pre-admission drugs and newly started inpatient drugs.
7. Care Plan & DTP categories: Identify drug therapy problems using DTP/MRP category types (e.g. Needs additional drug therapy, Wrong drug, Dosage too low, Adverse drug reaction, Dosage too high, Nonadherence).
8. If any data point is not documented anywhere in the files, write 'Not documented' or leave it blank rather than inventing clinical details.

Return a JSON object mapping to the complete review form:`;
      
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          patientName: { type: Type.STRING, description: "Capitalized initials only, e.g. J. K. C." },
          age: { type: Type.STRING },
          sex: { type: Type.STRING, description: "Male, Female, or Other" },
          weight: { type: Type.STRING },
          height: { type: Type.STRING },
          ipNumber: { type: Type.STRING },
          ward: { type: Type.STRING },
          bed: { type: Type.STRING },
          residence: { type: Type.STRING },
          dateOfAdmission: { type: Type.STRING },
          dateOfHistoryTaking: { type: Type.STRING },
          chiefComplaint: { type: Type.STRING },
          hpi: { type: Type.STRING },
          pastMedicalHistory: { type: Type.STRING },
          currentMedications: { type: Type.STRING },
          allergies: { type: Type.STRING },
          familyHistory: { type: Type.STRING },
          socialHistory: { type: Type.STRING },
          systems: {
            type: Type.OBJECT,
            properties: {
              "General Health": { type: Type.STRING },
              "CNS": { type: Type.STRING },
              "CVS": { type: Type.STRING },
              "Respiratory System": { type: Type.STRING },
              "Gastrointestinal System": { type: Type.STRING },
              "Genitourinary System": { type: Type.STRING },
              "Musculoskeletal System": { type: Type.STRING },
              "Skin & Integumentary System": { type: Type.STRING }
            }
          },
          vitals_labs: {
            type: Type.OBJECT,
            properties: {
              hr: { type: Type.STRING },
              bp: { type: Type.STRING },
              temp: { type: Type.STRING },
              po2: { type: Type.STRING },
              rr: { type: Type.STRING },
              bmi: { type: Type.STRING },
              na: { type: Type.STRING },
              k: { type: Type.STRING },
              cl: { type: Type.STRING },
              urea: { type: Type.STRING },
              creat: { type: Type.STRING },
              crcl: { type: Type.STRING },
              ast: { type: Type.STRING },
              alt: { type: Type.STRING },
              alp: { type: Type.STRING },
              t_bili: { type: Type.STRING },
              d_bili: { type: Type.STRING },
              albumin: { type: Type.STRING },
              wbc: { type: Type.STRING },
              neut: { type: Type.STRING },
              lymph: { type: Type.STRING },
              hb: { type: Type.STRING },
              plts: { type: Type.STRING },
              cxr: { type: Type.STRING },
              ecg: { type: Type.STRING },
              urinalysis: { type: Type.STRING }
            }
          },
          diagnosis: { type: Type.STRING },
          pharmacological_treatments: {
            type: Type.ARRAY,
            description: "Up to 5 pharmacological treatments active or initiated in the ward.",
            items: {
              type: Type.OBJECT,
              properties: {
                drug: { type: Type.STRING, description: "Generic drug name (INN)" },
                form: { type: Type.STRING, description: "Dosage form (e.g. Tab, IV Infusion, Cap)" },
                dose: { type: Type.STRING, description: "Dose (e.g. 500mg, 1g)" },
                frequency: { type: Type.STRING, description: "Frequency (e.g. TDS, BD, OD)" },
                start_date: { type: Type.STRING, description: "Start date if recorded" },
                duration: { type: Type.STRING, description: "Duration or ongoing" }
              },
              required: ["drug"]
            }
          },
          non_pharmacological_management: { type: Type.STRING },
          care_plans: {
            type: Type.ARRAY,
            description: "Up to 3 clinical care plan rows representing identified drug therapy problems (DTPs).",
            items: {
              type: Type.OBJECT,
              properties: {
                condition: { type: Type.STRING, description: "Condition or indication addressed" },
                problem: { type: Type.STRING, description: "Drug Therapy Problem (DTP) classification (e.g. Needs additional drug therapy, Dosage too low, Adverse drug reaction)" },
                goal: { type: Type.STRING, description: "Therapeutic goals" },
                intervention: { type: Type.STRING, description: "Pharmacist interventions recommended" },
                follow_up: { type: Type.STRING, description: "Monitoring and follow-up plan" }
              },
              required: ["condition", "problem", "goal", "intervention", "follow_up"]
            }
          },
          care_plan_non_pharma: { type: Type.STRING },
          care_plan_monitoring: { type: Type.STRING },
          counselling_points: { type: Type.STRING }
        }
      };
    } else if (type === 'medications') {
      prompt = `Analyze this prescription, treatment sheet, chart photo, or medical document and extract all medications/drugs listed.
ANONYMITY REQUIREMENT: Do not extract any patient names in full; if name is extracted, ensure it is sanitized.
For each medication, extract:
- name: The generic or brand name of the drug (e.g. "Metformin", "Amlodipine", "Ceftriaxone")
- dose: The strength/dosage (e.g. "500mg", "5mg", "1g", or empty if not specified)
- frequency: How often it is administered (e.g. "OD", "BD", "TDS", "QDS", "PRN", "Daily", "Twice daily", or empty if not specified)
- route: The route of administration (Must be one of: "Oral", "IV", "IM", "SC", "Topical", "Inhalation", or "Oral" as default if not specified)

Ensure that you return a list of these medications.`;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          medications: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                dose: { type: Type.STRING },
                frequency: { type: Type.STRING },
                route: { type: Type.STRING }
              },
              required: ['name']
            }
          }
        },
        required: ['medications']
      };
    } else if (type === 'clinical_notes') {
      prompt = `You are Clinova's Clinical Note Extraction Assistant. Analyze the uploaded clinical record, medical report, case history, or dictation and extract key clinical observations.
      
CRITICAL CONSTRAINTS:
1. Patient Anonymity: Extract the patient's name but convert it strictly to UPPERCASE INITIALS only (e.g., "John Doe" -> "J. D."). Never expose the full name.
2. Formulate a structured medical summary, including active chief complaints, history of present illness, primary diagnoses or clinical impressions, list of active medications, and recommended care plan interventions.
If any section is not documented, write "Not documented" or leave empty.`;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          patientName: { type: Type.STRING, description: "Capitalized initials only, e.g. J. D." },
          age: { type: Type.STRING },
          sex: { type: Type.STRING },
          summary: { type: Type.STRING, description: "A high-fidelity concise summary of the clinical presentation" },
          diagnoses: {
            type: Type.ARRAY,
            description: "List of working diagnoses, clinical impressions, or main problems",
            items: { type: Type.STRING }
          },
          medications: {
            type: Type.ARRAY,
            description: "List of current active medications with doses and frequencies if available",
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                dose: { type: Type.STRING },
                frequency: { type: Type.STRING }
              },
              required: ["name"]
            }
          },
          carePlan: { type: Type.STRING, description: "Pharmacist recommended care plan, DTP interventions, or follow-up actions" }
        }
      };
    } else {
      return res.status(400).json({ error: 'Invalid extraction type' });
    }

    const userParts: any[] = [{ text: prompt }];
    for (const file of files) {
      const filename = file.originalname || 'document.txt';
      const mimetype = file.mimetype || '';
      
      const isPdf = mimetype.includes('pdf') || filename.toLowerCase().endsWith('.pdf');
      const isImage = mimetype.includes('image') || /\.(png|jpe?g|webp|gif|heic|heif)$/i.test(filename);
      
      if (isPdf) {
        userParts.push({
          inlineData: {
            data: file.buffer.toString('base64'),
            mimeType: 'application/pdf'
          }
        });
      } else if (isImage) {
        let cleanMimetype = mimetype;
        if (!cleanMimetype.includes('image')) {
          if (filename.toLowerCase().endsWith('.png')) cleanMimetype = 'image/png';
          else if (filename.toLowerCase().endsWith('.webp')) cleanMimetype = 'image/webp';
          else if (filename.toLowerCase().endsWith('.gif')) cleanMimetype = 'image/gif';
          else cleanMimetype = 'image/jpeg';
        }
        userParts.push({
          inlineData: {
            data: file.buffer.toString('base64'),
            mimeType: cleanMimetype
          }
        });
      } else {
        // Safe check if it's a printable text file
        const textContent = file.buffer.toString('utf-8');
        const isBinary = textContent.includes('\u0000') || /[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(textContent);
        
        if (!isBinary) {
          userParts.push({
            text: `\n--- ATTACHED FILE CONTENT: ${filename} ---\n${textContent}\n--- END OF ATTACHED FILE ---\n`
          });
        } else {
          // Unsupported binary file format, gracefully include warning text instead of crashing the API with inlineData
          userParts.push({
            text: `\n[Attached File: ${filename} - This binary file format is not natively readable by the AI. For clinical records, please upload PDF files, high-quality images, or plain text document exports.]\n`
          });
        }
      }
    }

    const response = await generateContentWithFallback({
      model: 'gemini-3.5-flash',
      contents: [
        { role: 'user', parts: userParts }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        systemInstruction: `You are an expert clinical data extraction AI. You extract structured data from clinical documents, images, and dictations.
ANONYMITY MANDATE: You MUST strictly sanitize all patient names, relatives, and physicians mentioned in any notes. Render all names as capitalized initials only (e.g. "James Kamau" -> "J. K."). NEVER expose any full names.`
      }
    });

    const parsed = safeJsonParse(response.text, {});
    
    // Strict backend-side post-processing to enforce absolute anonymity of the patient name
    if (parsed.patientName) {
      parsed.patientName = getPatientInitialsBackend(parsed.patientName);
    }
    if (parsed.name) {
      parsed.name = getPatientInitialsBackend(parsed.name);
    }
    
    res.json(parsed);
  } catch (error: any) {
    console.error('Extraction error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'AI extraction failed' });
  }
});

// AI Autofill Endpoint
app.post('/api/gemini/autofill', async (req, res) => {
  try {
    const { formData, filesContext, options } = req.body;

    if (!formData) {
      return res.status(400).json({ error: 'Missing formData' });
    }

    const opt = options || { treatment: true, carePlan: true, counselling: true };

    // Prepare a descriptive context from the first part of the form
    const admission = formData.admission || {};
    const history = formData.history || {};
    const systems = formData.systems || {};
    const vitalsLabs = formData['vitals-labs'] || {};
    const diagnosis = formData.diagnosis || {};

    // Programmatic Renal & GFR calculation engine (Cockcroft-Gault Equation)
    let calculatedCrCl: number | null = null;
    let renalInsight = '';
    
    const age = parseFloat(admission.patient_age);
    const weight = parseFloat(admission.patient_weight);
    const scrStr = vitalsLabs.creat ? String(vitalsLabs.creat).trim() : '';
    const sex = admission.patient_sex ? String(admission.patient_sex).toLowerCase() : '';
    
    if (age && weight && scrStr) {
      const scrMatch = scrStr.match(/[\d.]+/);
      if (scrMatch) {
        const scrVal = parseFloat(scrMatch[0]);
        if (scrVal > 0) {
          // Detect unit: umol/L vs mg/dL
          let isUmol = true; 
          if (scrStr.toLowerCase().includes('mg') || scrVal < 8) {
            isUmol = false; // Probably mg/dL
          }
          
          let scrMg = scrVal;
          if (isUmol) {
            scrMg = scrVal / 88.4; // Convert umol/L to mg/dL
          }
          
          let crclVal = ((140 - age) * weight) / (72 * scrMg);
          if (sex === 'female') {
            crclVal *= 0.85;
          }
          calculatedCrCl = Math.round(crclVal * 10) / 10;
          
          if (calculatedCrCl >= 90) {
            renalInsight = `Normal Renal Function (Estimated CrCl: ${calculatedCrCl} mL/min)`;
          } else if (calculatedCrCl >= 60) {
            renalInsight = `Mild Renal Impairment (Estimated CrCl: ${calculatedCrCl} mL/min). Monitor drug doses.`;
          } else if (calculatedCrCl >= 30) {
            renalInsight = `Moderate Renal Impairment (Estimated CrCl: ${calculatedCrCl} mL/min). Dose adjustment required for renally cleared drugs (e.g. adjust Penicillins, Cephalosporins, Aminoglycosides, LMWH).`;
          } else if (calculatedCrCl >= 15) {
            renalInsight = `Severe Renal Impairment (Estimated CrCl: ${calculatedCrCl} mL/min). Critical dose adjustments required. Contraindicate Metformin, NSAIDs, etc.`;
          } else {
            renalInsight = `Kidney Failure / ESRD (Estimated CrCl: ${calculatedCrCl} mL/min). Avoid renally cleared nephrotoxins, max dose reductions mandatory.`;
          }
        }
      }
    }

    const patientContext = `
=== PATIENT DEMOGRAPHICS & ADMISSION ===
Name: ${admission.patient_name || 'N/A'}
Age: ${admission.patient_age || 'N/A'}
Sex: ${admission.patient_sex || 'N/A'}
IP Number: ${admission.patient_ip || 'N/A'}
Ward/Bed: ${admission.patient_ward || 'N/A'} / ${admission.patient_bed || 'N/A'}
Residence: ${admission.patient_residence || 'N/A'}
Date of Admission: ${admission.patient_adm_date || 'N/A'}

=== CLINICAL PRESENTATION & HISTORY ===
Chief Complaint: ${history.chief_complaint || 'N/A'}
History of Presenting Illness: ${history.hpi || 'N/A'}
Past Medical History: ${history.pmh || 'N/A'}
Previous Medications: ${history.history_meds || 'N/A'}
Family History: ${history.family_history || 'N/A'}
Social History: ${history.social_history || 'N/A'}

=== SYSTEMIC REVIEW ===
General Health: ${systems['General Health'] || 'N/A'}
CNS: ${systems['CNS'] || 'N/A'}
CVS: ${systems['CVS'] || 'N/A'}
Respiratory System: ${systems['Respiratory System'] || 'N/A'}
Gastrointestinal: ${systems['Gastrointestinal System'] || 'N/A'}
Genitourinary: ${systems['Genitourinary System'] || 'N/A'}
Musculoskeletal: ${systems['Musculoskeletal System'] || 'N/A'}
Skin/Integumentary: ${systems['Skin & Integumentary System'] || 'N/A'}

=== VITALS & LABS ===
Vitals: HR: ${vitalsLabs.hr || 'N/A'} bpm, BP: ${vitalsLabs.bp || 'N/A'} mmHg, Temp: ${vitalsLabs.temp || 'N/A'} °C, PO2: ${vitalsLabs.po2 || 'N/A'} %, RR: ${vitalsLabs.rr || 'N/A'} bpm, BMI: ${vitalsLabs.bmi || 'N/A'}
Labs Electrolytes: Na+: ${vitalsLabs.na || 'N/A'}, K+: ${vitalsLabs.k || 'N/A'}, Cl-: ${vitalsLabs.cl || 'N/A'}, Urea: ${vitalsLabs.urea || 'N/A'}, Creatinine: ${vitalsLabs.creat || 'N/A'}, CrCl: ${vitalsLabs.crcl || 'N/A'}
Labs LFTs: AST: ${vitalsLabs.ast || 'N/A'}, ALT: ${vitalsLabs.alt || 'N/A'}, ALP: ${vitalsLabs.alp || 'N/A'}, T. Bili: ${vitalsLabs.t_bili || 'N/A'}, D. Bili: ${vitalsLabs.d_bili || 'N/A'}, Albumin: ${vitalsLabs.albumin || 'N/A'}
Labs Hematology: WBC: ${vitalsLabs.wbc || 'N/A'}, Neutrophils: ${vitalsLabs.neut || 'N/A'}, Lymphocytes: ${vitalsLabs.lymph || 'N/A'}, Hb: ${vitalsLabs.hb || 'N/A'}, Platelets: ${vitalsLabs.plts || 'N/A'}
Other Tests: Chest X-ray: ${vitalsLabs.cxr || 'N/A'}, ECG/Echo: ${vitalsLabs.ecg || 'N/A'}, Urinalysis: ${vitalsLabs.urinalysis || 'N/A'}

=== WORKING DIAGNOSES / PROBLEM LIST ===
Diagnoses:
${diagnosis.diagnoses_list || 'N/A'}
    `;

    const prompt = `
You are Clinova OS, an advanced Clinical Pharmacy Assistant and AI Knowledge Engine.
Based on the provided Patient Context, uploaded reference notes, and Kenya Drug Index (KDI) clinical rules, generate recommendations.

=== PROGRAMMATIC RENAL CALCULUS ENGINE ===
Calculated CrCl Insight: ${renalInsight || 'Insufficient data (Age, Weight, or Serum Creatinine missing) to calculate Cockcroft-Gault CrCl.'}

=== ACTIVE SECTIONS TO GENERATE ===
- Pharmacological & Non-pharmacological Treatment Plan: ${opt.treatment ? 'YES, GENERATE IN FULL DETAIL' : 'NO, SKIP (leave empty or return empty fields)'}
- Pharmaceutical Care Plan: ${opt.carePlan ? 'YES, GENERATE IN FULL DETAIL' : 'NO, SKIP (leave empty or return empty fields)'}
- Patient Counselling Points: ${opt.counselling ? 'YES, GENERATE IN FULL DETAIL' : 'NO, SKIP (leave empty or return empty fields)'}

=== RELEVANT NOTES CONTEXT ===
${filesContext ? JSON.stringify(filesContext) : 'No uploaded notes context.'}

=== PATIENT CLINICAL CASE ===
${patientContext}

Generate appropriate, guideline-based recommendations. Ensure you adjust doses for renal function if CrCl or Creatinine is abnormal (e.g. adjust Amoxicillin, Ceftriaxone, or other drugs if renal clearance is impaired).
    `;

    // We use a structured JSON schema to populate the rest of the form perfectly!
    const response = await generateContentWithFallback({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert clinical pharmacist in Kenya, specializing in pharmacotherapy reviews, guideline-directed medical therapy, and local formularies (KDI). Your outputs must be highly clinical, precise, and evidence-based.

CRITICAL SAFETY & TRUTH CONSTRAINT: You must be extremely careful and NEVER assume, invent, or speculate patient details, clinical findings, histories, or laboratory results that are not explicitly provided in the Patient Context or the uploaded notes context.
- If a value or history detail is 'N/A' or missing, do NOT assume a pre-existing state, a standard normal value, or an active disease. Treat it strictly as unknown/unprovided.
- Do NOT assume that any diagnostic procedures have been done unless they are explicitly documented in the patient case.
- Base your treatment recommendations, care plans, and counselling points solely on actual, verified details present in the case context. If details are insufficient to make a recommendation, leave the corresponding fields blank or suggest monitoring/investigating first in the care plan, rather than guessing.
- For sections marked as SKIP, return empty arrays/strings.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pharmacological_treatments: {
              type: Type.ARRAY,
              description: 'Up to 5 pharmacological treatments. Map them to the treatment rows. Leave empty or skip if Treatment is marked as SKIP.',
              items: {
                type: Type.OBJECT,
                properties: {
                  drug: { type: Type.STRING, description: 'Generic drug name (INN)' },
                  form: { type: Type.STRING, description: 'Dosage form (e.g., Tab, IV Infusion, Cap)' },
                  dose: { type: Type.STRING, description: 'Dose (e.g., 500mg, 1g, 20/120mg)' },
                  frequency: { type: Type.STRING, description: 'Frequency (e.g., TDS, BD, OD, Q8H)' },
                  start_date: { type: Type.STRING, description: 'Start date in YYYY-MM-DD or leave blank' },
                  duration: { type: Type.STRING, description: 'Duration (e.g., 5 days, 3 days)' },
                },
                required: ['drug', 'form', 'dose', 'frequency', 'duration'],
              },
            },
            non_pharmacological_management: {
              type: Type.STRING,
              description: 'Text summarizing non-pharmacological interventions. Return empty if Treatment is marked as SKIP.',
            },
            care_plans: {
              type: Type.ARRAY,
              description: 'Up to 3 clinical rows representing the pharmaceutical care plan. Leave empty or skip if Care Plan is marked as SKIP.',
              items: {
                type: Type.OBJECT,
                properties: {
                  condition: { type: Type.STRING, description: 'Medical Condition being treated' },
                  problem: { type: Type.STRING, description: 'Drug Therapy Problem (DTP) identified or potential risks' },
                  goal: { type: Type.STRING, description: 'Therapeutic Goal' },
                  intervention: { type: Type.STRING, description: 'Pharmacist Intervention' },
                  follow_up: { type: Type.STRING, description: 'Monitoring and Follow-up plan' },
                },
                required: ['condition', 'problem', 'goal', 'intervention', 'follow_up'],
              },
            },
            care_plan_non_pharma: {
              type: Type.STRING,
              description: 'Non-pharmacological care plan details. Return empty if Care Plan is marked as SKIP.',
            },
            care_plan_monitoring: {
              type: Type.STRING,
              description: 'Detailed patient monitoring parameters (clinical, laboratory). Return empty if Care Plan is marked as SKIP.',
            },
            counselling_points: {
              type: Type.STRING,
              description: 'Actionable and clear counselling points for the patient or caregiver, clearly numbered or bulleted. Return empty if Counselling is marked as SKIP.',
            },
            safety_verification: {
              type: Type.OBJECT,
              description: 'Automatic clinical safety and guideline-directed verification checklist.',
              properties: {
                is_grounded_in_case: { type: Type.BOOLEAN, description: 'True if all recommendations are strictly grounded in actual case findings and no speculations are made' },
                renal_adjustment_checked: { type: Type.BOOLEAN, description: 'True if renal function (CrCl/Creatinine) was assessed and adjusted' },
                safety_flags_identified: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: 'Any high-risk clinical alerts or safety concerns identified for this regimen (e.g., "High-dose Amoxicillin in renal impairment", "Potential QT prolongation"). Leave empty if none.' 
                },
                clinical_evidence_sources: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Specific clinical guidelines, manuals, or standard references cited (e.g., "KDI Section 4.2", "WHO Model Formulary").'
                }
              },
              required: ['is_grounded_in_case', 'renal_adjustment_checked', 'safety_flags_identified', 'clinical_evidence_sources']
            }
          },
          required: [
            'pharmacological_treatments',
            'non_pharmacological_management',
            'care_plans',
            'care_plan_non_pharma',
            'care_plan_monitoring',
            'counselling_points',
            'safety_verification',
          ],
        },
      },
    });

    const result = safeJsonParse(response.text, {});
    res.json(result);
  } catch (error: any) {
    console.error('Autofill generation error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'AI generation failed' });
  }
});

// AI Interactive Assistant / Chat Sidebar
app.post('/api/gemini/assistant', async (req, res) => {
  try {
    const { userMessage, chatHistory, currentFormState, fileData, fileType, fileName } = req.body;

    if (!userMessage && !fileData) {
      return res.status(400).json({ error: 'Missing userMessage or fileData' });
    }

    const stateSummary = currentFormState ? `
=== CURRENT CLINICAL FORM STATE ===
${JSON.stringify(currentFormState)}
    ` : '';

    const systemInstruction = `You are Clinova AI Assistant, a specialized Clinical Pharmacy mentor.
You support pharmacy students and practitioners in ward rounds, pharmacotherapy reviews, and Board exam prep.
When asked questions, refer to the Kenya Drug Index (KDI), WHO Essential Medicines, and local clinical guidelines.
Provide concise, authoritative, and actionable feedback. Be encouraging and highly educational.`;

    const contents = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      for (const msg of chatHistory) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    }

    const userParts: any[] = [];
    
    // Add file inline data or text content if available, handling binary gracefully
    if (fileData) {
      let cleanBase64 = fileData;
      if (fileData.includes(';base64,')) {
        cleanBase64 = fileData.split(';base64,')[1];
      }
      
      const filename = fileName || 'document.txt';
      const mimetype = fileType || '';
      
      const isPdf = mimetype.includes('pdf') || filename.toLowerCase().endsWith('.pdf');
      const isImage = mimetype.includes('image') || /\.(png|jpe?g|webp|gif|heic|heif)$/i.test(filename);
      
      if (isPdf) {
        userParts.push({
          inlineData: {
            data: cleanBase64,
            mimeType: 'application/pdf'
          }
        });
      } else if (isImage) {
        let cleanMimetype = mimetype;
        if (!cleanMimetype.includes('image')) {
          if (filename.toLowerCase().endsWith('.png')) cleanMimetype = 'image/png';
          else if (filename.toLowerCase().endsWith('.webp')) cleanMimetype = 'image/webp';
          else if (filename.toLowerCase().endsWith('.gif')) cleanMimetype = 'image/gif';
          else cleanMimetype = 'image/jpeg';
        }
        userParts.push({
          inlineData: {
            data: cleanBase64,
            mimeType: cleanMimetype
          }
        });
      } else {
        // Decode as text and check if it contains binary control characters
        try {
          const buf = Buffer.from(cleanBase64, 'base64');
          const textContent = buf.toString('utf-8');
          const isBinary = textContent.includes('\u0000') || /[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(textContent);
          
          if (!isBinary) {
            userParts.push({
              text: `\n--- ATTACHED FILE CONTENT: ${filename} ---\n${textContent}\n--- END OF ATTACHED FILE ---\n`
            });
          } else {
            userParts.push({
              text: `\n[Attached File: ${filename} - This binary file format is not natively readable by the AI. For clinical records, please upload PDF files, high-quality images, or plain text document exports.]\n`
            });
          }
        } catch (e) {
          userParts.push({
            text: `\n[Attached File: ${filename} - Failed to parse file content.]\n`
          });
        }
      }
    }

    userParts.push({
      text: `
${stateSummary}

User Clinical Query: "${userMessage || 'Analyze the attached file.'}"
${fileName ? `(Attached file: ${fileName})` : ''}
`
    });

    contents.push({
      role: 'user',
      parts: userParts,
    });

    const response = await generateContentWithFallback({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Clinical Assistant error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'AI assistant failed' });
  }
});

// AI Study and Exam Material Generator Endpoint
app.post('/api/gemini/generate-study-material', async (req, res) => {
  try {
    const { source, outputType, questionTypes, includePodcast } = req.body;

    if (!source) {
      return res.status(400).json({ error: 'Missing source' });
    }

    let prompt = `You are Clinova OS, an advanced Clinical Pharmacy Assistant and AI Knowledge Engine.
You need to generate high-quality clinical study materials for the resource: "${source}".
Requested Output Type: ${outputType}
`;

    if (outputType === 'All Form Questions') {
      prompt += `Generate a comprehensive exam questions pool including: ${questionTypes ? questionTypes.join(', ') : 'MCQs'}.
Provide 3 highly relevant clinical board-style questions with answers, detailed explanations, and clinical pearls based on Kenyan clinical pharmacy guidelines and KDI.`;
    } else {
      prompt += `Generate high-yield short notes containing:
1. Clinical Pharmacology & Mechanism of Action.
2. Formulary Dosing & Adjustments (specifically highlighting renal clearance and CrCl guidance if applicable, citing KDI standards).
3. Critical Contraindications & Drug Interactions.
4. OSCE/Exam Pearls (high-yield tips for boards).`;
    }

    if (includePodcast) {
      prompt += `\n\n=== PODCAST SECTION ===\nAlso generate a simulated educational audio podcast transcript between two clinical hosts (Dr. Clara and Dr. Noah) discussing this topic. Keep it lively, engaging, and highly educational. Start the transcript with "[Dr. Clara]:" or "[Dr. Noah]:".`;
    }

    const response = await generateContentWithFallback({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert clinical pharmacy professor and OSCE examiner in Kenya. You draft official medical board exam questions, high-yield summary guides, and professional medical educational materials based on the Kenya Drug Index (KDI) and international clinical standards. Ensure your outputs are formatted clearly using markdown.`,
      }
    });

    const text = response.text || '';
    
    let content = text;
    let podcastTranscript = '';
    
    if (includePodcast) {
      const parts = text.split(/=== PODCAST SECTION ===|PODCAST SECTION/i);
      if (parts.length > 1) {
        content = parts[0].trim();
        podcastTranscript = parts.slice(1).join('\n').trim();
      } else {
        const hostIndex = text.indexOf('[Dr.');
        if (hostIndex !== -1) {
          content = text.substring(0, hostIndex).trim();
          podcastTranscript = text.substring(hostIndex).trim();
        }
      }
    }

    res.json({
      content,
      podcastTranscript: podcastTranscript || (includePodcast ? text : undefined),
    });
  } catch (error: any) {
    console.error('Study generation error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'AI generation failed' });
  }
});

// KDI & WHO Drug Profile Lookup Endpoint
app.post('/api/gemini/search-drug', async (req, res) => {
  try {
    const { drugName, category } = req.body;

    if (!drugName && !category) {
      return res.status(400).json({ error: 'Missing drugName or category' });
    }

    const queryInfo = drugName ? `Search Name: "${drugName}"` : `Browse Category: "${category}"`;
    
    let fdaContext = "";
    let resolvedCui = "";

    if (drugName) {
      try {
        const [rxcui, fdaLabel] = await Promise.all([
          resolveRxCui(drugName),
          fetchOpenFdaLabel(drugName)
        ]);
        
        if (rxcui) {
          resolvedCui = rxcui;
        }
        
        if (fdaLabel) {
          fdaContext = `
=== OFFICIAL NLM/FDA CLINICAL REFERENCES (GROUNDED DATA) ===
- RxNorm Concept ID (RxCUI): ${resolvedCui || 'Resolved'}
- Generic Name: ${fdaLabel.genericName || drugName}
- Brand Name(s): ${fdaLabel.brandName || 'N/A'}

[INDICATIONS & USAGE]:
${fdaLabel.indicationsAndUsage ? fdaLabel.indicationsAndUsage.slice(0, 1000) : 'N/A'}

[DOSAGE & ADMINISTRATION]:
${fdaLabel.dosageAndAdministration ? fdaLabel.dosageAndAdministration.slice(0, 1000) : 'N/A'}

[CONTRAINDICATIONS]:
${fdaLabel.contraindications ? fdaLabel.contraindications.slice(0, 1000) : 'N/A'}

[WARNINGS & PRECAUTIONS]:
${fdaLabel.warningsAndPrecautions ? fdaLabel.warningsAndPrecautions.slice(0, 1000) : 'N/A'}

[ADVERSE REACTIONS]:
${fdaLabel.adverseReactions ? fdaLabel.adverseReactions.slice(0, 1000) : 'N/A'}

[DRUG INTERACTIONS]:
${fdaLabel.drugInteractions ? fdaLabel.drugInteractions.slice(0, 1000) : 'N/A'}

[BOXED WARNING]:
${fdaLabel.boxedWarning ? fdaLabel.boxedWarning.slice(0, 800) : 'N/A'}
`;
        }
      } catch (err) {
        console.warn('Failed to pre-fetch openFDA details in search-drug:', err);
      }
    }

    const prompt = `You are Clinova OS, an advanced Clinical Pharmacy Assistant and AI Knowledge Engine.
Please provide a complete, clinical-grade medical profile for the medication search query.
Query Info: ${queryInfo}

${fdaContext ? `We have retrieved the following official FDA clinical label data for this medication from openFDA and RxNorm. Use it as the absolute source of clinical truth to synthesize the profile, but ensure you adapt it to include standard Kenyan brand names, local KDI clinical conventions, WHO essential medicine status, and standard formatting:
${fdaContext}` : 'No local openFDA label was cached. Use your clinical pharmacotherapy knowledge base to draft a highly precise profile.'}

If a specific drug name is entered, return the profile for that drug. If a category is selected, return a list of 3-5 prominent drugs in that category, and describe each in brief, structured clinical notes.

For each drug profile, include:
1. **Generic Name & Class**: Generic name, pharmacologic class, and common brand names in Kenya.
2. **Key Indications & Recommended Dosages**: Adult/pediatric doses for typical indications based on Kenya Drug Index (KDI) standards.
3. **Renal & Hepatic Adjustments**: Crucial CrCl-based or child-pugh based adjustments.
4. **Important Contraindications & Key Interaction Alerts**: Life-threatening combinations or critical warnings.
5. **Key Patient Monitoring Guidelines**: Crucial clinical/lab monitoring indices (e.g., serum Cr, electrolytes, INR).

ATTRIBUTION: This response uses clinical data sourced from the U.S. National Library of Medicine (NLM) and openFDA. Ensure you append an attribution line at the end of the text.
`;

    const response = await generateContentWithFallback({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert clinical pharmacologist and KDI committee editor. Provide highly structured, precise, and guideline-directed monographs. Always format using structured markdown with clear headings, bullets, and tables where helpful.`,
      }
    });

    res.json({ 
      text: response.text,
      rxnormId: resolvedCui || undefined,
      hasFdaData: !!fdaContext,
      attribution: "This product uses publicly available data from the U.S. National Library of Medicine and openFDA."
    });
  } catch (error: any) {
    console.error('Drug profile search error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'AI drug lookup failed' });
  }
});

// AI Real-Time Drug Interaction Checker Endpoint
app.post('/api/gemini/check-interactions', async (req, res) => {
  try {
    const { medications, patientContext } = req.body;

    if (!medications || !Array.isArray(medications) || medications.length === 0) {
      return res.status(400).json({ error: 'Please provide at least one medication to evaluate.' });
    }

    const medsStr = medications.map(m => `- ${m.name} (${m.dose || 'dose unstated'} ${m.frequency || 'frequency unstated'} ${m.route || 'route unstated'})`).join('\n');

    // Live NLM RxNorm/RxNav interaction API lookup
    const rxnormPromises = medications.map(async (m) => {
      const rxnormId = await resolveRxCui(m.name);
      return { name: m.name, rxnormId };
    });
    const resolvedMeds = await Promise.all(rxnormPromises);
    const validRxcuis = resolvedMeds.map(m => m.rxnormId).filter(Boolean) as string[];

    let nlmInteractions: any[] = [];
    if (validRxcuis.length >= 2) {
      try {
        nlmInteractions = await fetchRxNormInteractions(validRxcuis);
      } catch (err) {
        console.warn('Failed to pre-fetch RxNorm interactions:', err);
      }
    }

    let nlmContext = "";
    if (nlmInteractions.length > 0) {
      nlmContext = `
=== NLM RXNORM DOCUMENTED INTERACTIONS ===
The following drug interactions were retrieved directly from the official U.S. National Library of Medicine (RxNav API) for the resolved RxCUIs of the active medications:
${nlmInteractions.map(i => `- [${i.severity}] ${i.title}: ${i.description}`).join('\n')}
Please incorporate these NLM safety alerts into your evaluation, providing localized therapeutic instructions and actions for clinicians.
`;
    }

    let patientInfoStr = 'No specific patient context provided (Evaluation based on general demographic averages).';
    if (patientContext) {
      const vitals = patientContext.vitals || {};
      const alerts = patientContext.alerts || [];
      const labs = patientContext.labs || [];
      patientInfoStr = `
=== PATIENT DEMOGRAPHICS ===
Name/Initials: ${patientContext.name || 'Anonymous'}
Age: ${patientContext.age || 'Unknown'} years old
Sex: ${patientContext.sex || 'Unknown'}
Ward/Location: ${patientContext.ward || 'General ward'}

=== VITALS ===
BP: ${vitals.bp || 'N/A'} mmHg, HR: ${vitals.hr || 'N/A'} bpm, Temp: ${vitals.temp || 'N/A'} °C, SpO2: ${vitals.spo2 || 'N/A'}%, RR: ${vitals.rr || 'N/A'} bpm

=== CLINICAL ALERTS & FLAGGED CONDITIONS ===
${alerts.length > 0 ? alerts.map((a: any) => `- [${a.type.toUpperCase()}] ${a.message}`).join('\n') : '- No active security flags or alerts registered in chart.'}

=== LAB VALUES ===
${labs.length > 0 ? labs.map((l: any) => `- ${l.name}: ${l.value} ${l.unit} (${l.status}, Ref Range: ${l.referenceRange})`).join('\n') : '- No lab blood panels loaded.'}
      `;
    }

    const prompt = `You are Clinova OS, an advanced Clinical Pharmacy Interaction Engine.
Please perform a rigorous, multi-dimensional clinical safety evaluation for the following medication treatment plan, cross-referencing patient-specific physiology (demographics, vital signs, clinical alerts, and laboratory results if provided).

=== PROPOSED MEDICATION TREATMENT PLAN ===
${medsStr}

=== CLINICAL PATIENT CONTEXT ===
${patientInfoStr}

${nlmContext}

Please evaluate and return a detailed response in the requested structured JSON format, examining:
1. **Drug-Drug Interactions**: Identify critical combinations (e.g., Amiodarone + Warfarin, Sildenafil + Nitrates, Spironolactone + Potassium Supplements). Specify Severity ("Critical", "Moderate", or "Minor"), Mechanism, and specific, safe Recommendation (dose adjustment, alternative medication, or separate administration times).
2. **Drug-Patient Context Hazards**: Screen for age-related safety (e.g., Beers Criteria for Geriatrics), sex-specific contraindications (e.g., pregnancy safety), vitals hazards (e.g., beta-blockers in severe bradycardia), and laboratory hazards (e.g., renally-cleared medications or nephrotoxins like NSAIDs/Aminoglycosides in impaired kidney function/AKI).
3. **Food/Lifestyles and Monitoring Guidelines**: Highlight any crucial monitoring parameters needed during this therapy (e.g., monitor serum creatinine, blood pressure, or liver function tests).

Ensure your guidance is highly clinical, accurate, aligned with the Kenya Drug Index (KDI), WHO Essential Medicines, and international guidelines (e.g., Beers Criteria). Avoid vague generalities. Provide high-yield clinical value.`;

    const response = await generateContentWithFallback({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert clinical pharmacologist and KDI clinical safety checker. Your mission is to provide extremely accurate, non-redundant, and evidence-based drug safety checks. You MUST return your output in strict JSON conforming to the requested schema. Do not include markdown wrappers or other text outside the JSON.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hasInteractions: { type: Type.BOOLEAN, description: 'True if any interactions or patient safety alerts are flagged.' },
            summary: { type: Type.STRING, description: 'A highly cohesive, professional clinical summary of the safety check.' },
            interactions: {
              type: Type.ARRAY,
              description: 'All drug-drug, drug-food, or direct therapeutic duplication interactions.',
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, description: 'Interaction type: "Drug-Drug", "Drug-Food", or "Therapeutic Duplication"' },
                  severity: { type: Type.STRING, description: 'Must be "Critical" (high clinical danger/contraindicated), "Moderate" (requires monitoring/adjustment), or "Minor" (caution advised)' },
                  title: { type: Type.STRING, description: 'Conscise title, e.g., "Aspirin + Warfarin Co-administration"' },
                  description: { type: Type.STRING, description: 'Clear mechanism explaining what happens biologically.' },
                  recommendation: { type: Type.STRING, description: 'Actionable clinical strategy (e.g., hold drug, swap with alternative X, adjust dose).' }
                },
                required: ['type', 'severity', 'title', 'description', 'recommendation']
              }
            },
            patientSafetyFlags: {
              type: Type.ARRAY,
              description: 'Alerts detailing conflicts between the drugs and the patient’s clinical state (demographics, vitals, alerts, labs).',
              items: {
                type: Type.OBJECT,
                properties: {
                  severity: { type: Type.STRING, description: 'Must be "Critical", "Warning", or "Info"' },
                  message: { type: Type.STRING, description: 'Specific safety warning (e.g., "Gentamicin in Severe Renal Impairment").' },
                  rational: { type: Type.STRING, description: 'Biochemical or physiological reason for concern.' }
                },
                required: ['severity', 'message', 'rational']
              }
            },
            monitoringParameters: {
              type: Type.ARRAY,
              description: 'Key parameters that clinicians must monitor during co-administration.',
              items: {
                type: Type.OBJECT,
                properties: {
                  parameter: { type: Type.STRING, description: 'Parameter name (e.g., Serum Potassium, Blood Glucose, Blood Pressure).' },
                  frequency: { type: Type.STRING, description: 'Proposed frequency (e.g., Daily, Weekly, Prior to each dose).' },
                  rationale: { type: Type.STRING, description: 'Specific reason why this monitoring is necessary.' }
                },
                required: ['parameter', 'frequency', 'rationale']
              }
            }
          },
          required: ['hasInteractions', 'summary', 'interactions', 'patientSafetyFlags', 'monitoringParameters']
        }
      }
    });

    const result = safeJsonParse(response.text, {});
    res.json(result);
  } catch (error: any) {
    console.error('Drug interaction check error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'AI interaction evaluation failed' });
  }
});

// AI Clinical Cases Extraction Endpoint
app.post('/api/gemini/extract-cases', async (req, res) => {
  try {
    const { topic, bookName } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Missing topic' });
    }

    const bookContext = bookName ? `using the open-access reference book "${bookName}"` : "using standard open-access clinical pharmacology resources";

    const prompt = `You are Clinova OS, an advanced Clinical Pharmacy Assistant.
Please extract/generate 3 highly realistic, high-fidelity clinical case studies in the topic "${topic}" ${bookContext}.

Ensure each case contains:
1. A clear, specific title focusing on drug-related problems (DRPs), pharmacokinetics, or guideline-directed therapy.
2. A difficulty level: "Beginner", "Intermediate", or "Advanced".
3. A detailed patient scenario vignette following this pattern:
   - Chief Complaint & Patient Demographics (e.g. age, weight).
   - Clinical Presentation / Vitals / Laboratory Results (specifically including renal function e.g. Creatinine, eGFR or liver functions where appropriate).
   - Current Drug Regimen.
   - Reference Textbook Case source attribution.
4. Key learning points and guideline-directed resolution (answering how to correct the drug therapy problem, adjustments required, and counseling pearls).

Ensure the output is highly educational, precise, and matches the clinical standards of KDI (Kenya Drug Index).`;

    const response = await generateContentWithFallback({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert clinical pharmacy examiner and KDI board editor. Extract clinical pharmacology and clinical pharmacy cases with high fidelity. Ensure all outputs strictly follow the requested JSON schema.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          description: 'A list of extracted clinical case study objects',
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'Clinical case title' },
              difficulty: { 
                type: Type.STRING, 
                description: 'Must be Beginner, Intermediate, or Advanced',
                enum: ['Beginner', 'Intermediate', 'Advanced']
              },
              topic: { type: Type.STRING, description: 'Therapeutic area / topic' },
              scenario: { type: Type.STRING, description: 'Detailed patient scenario vignette with demographics, clinical presentation, medications, labs, and source citation' },
              learningPoints: { type: Type.STRING, description: 'Learning points, guideline-directed pharmacotherapy resolution, and counseling pearls' },
            },
            required: ['title', 'difficulty', 'topic', 'scenario', 'learningPoints'],
          },
        },
      }
    });

    const cases = safeJsonParse(response.text, []);
    res.json(cases);
  } catch (error: any) {
    console.error('Case extraction error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'AI case extraction failed' });
  }
});

// AI Integrated Learning Module Content Generator
app.post('/api/gemini/generate-module-content', async (req, res) => {
  try {
    const { moduleTitle, academicLevel, customResources } = req.body;

    if (!moduleTitle) {
      return res.status(400).json({ error: 'Missing moduleTitle' });
    }

    const level = academicLevel || 'Year 3: Systems & Clinical Intro';

    let prompt = `You are Clinova Curriculum Engine, an expert clinical pharmacology and therapeutics instructor.
Generate a comprehensive clinical education module for the topic "${moduleTitle}", tailored for a "${level}" level.

Strictly calibrate the academic depth based on the requested level of education:
- Year 1: Focus heavily on normal anatomy, normal physiology, foundational biochemistry, basic chemistry principles, introductory microbiology, and basic pharmacy orientation. Emphasize the physical, biochemical, and anatomical foundations rather than complex clinical therapeutics.
- Year 2: Focus heavily on foundational pharmacology (ADME, basic PK/PD, receptor interactions, agonism/antagonism).
- Year 3: Integrate systems pharmacology (e.g., cardiovascular, autonomic) with introductory clinical practice skills (patient profile analysis, medication histories, care planning).
- Year 4: Focus on advanced pharmacotherapy of complex body systems (endocrine, respiratory) and infectious diseases therapeutics (chemotherapy, antimicrobial stewardship).
- Year 5: Focus on specialized clinical practice (pediatric, geriatric, oncology), advanced clinical rounds, clinical toxicology, and Therapeutic Drug Monitoring (TDM).

The module MUST contain high-yield information structured exactly matching this requirement:
- Overview: concise topic introduction and clinical importance.
- Learning Objectives: 3 key outcomes the student should achieve.
- Anatomy & Physiology Review: normal structure and function relevant to this topic.
- Pathophysiology: disease mechanism and progression.
- Pharmacology details:
  * Drug Classes: main drug classes in this therapeutic area.
  * Individual Drugs: key exemplary medications.
  * Mechanism of Action: how these drugs work.
  * Pharmacokinetics & Pharmacodynamics: absorption, metabolism, renal clearance, or receptor binding notes.
  * Indications, Contraindications, Adverse Effects, Drug Interactions, and Monitoring Parameters.
- Clinical Pharmacy & Therapeutics:
  * Therapeutic Guidelines: first-line/second-line selections (incorporate Kenyan National Guidelines / KEML or KDI standards if applicable).
  * Patient Assessment: key clinical exams, vital signs, lab markers (especially CrCl, renal adjustments).
  * Medication Review, Clinical Decision Making, and Care Plans.
  * Patient Counselling & Clinical Pearls.
- Disease Management: brief management algorithm/guide.
- Clinical Cases: 1 detailed, high-yield patient scenario with questions and answers.
- OSCE Practice: 1 practical counseling station or clinical OSCE scenario with clear instructions.
- Practice Questions: 2 board-style MCQs with multiple options, correct answer, and detailed explanations.
- Flashcards: 2 high-yield study flashcards with front and back.
- Mnemonics: 1 creative memory aid with a title, the phrase, and a breakdown.
- Summary Notes: a quick markdown review summary.

Ensure the content is medically accurate, authoritative, and strictly integrated (combining physiology, pharmacology, and clinical therapeutics seamlessly). Keep explanations highly focused, practical, and in bullet points to avoid truncation.`;

    if (customResources && customResources.length > 0) {
      const formattedResources = customResources.map((r: any) => 
        `- NOTES/REFERENCE FROM INSTRUCTOR (${r.sourceName || 'General Reference'}): ${r.notes}${r.url ? ` (Source URL: ${r.url})` : ''}`
      ).join('\n');
      
      prompt += `\n\nCRITICAL KNOWLEDGE ENRICHMENT:\nAn instructor or administrator has uploaded the following authoritative, localized guidelines or specific notes for this topic. You MUST integrate this information fully into the pharmacology details, therapeutic guidelines, patient counseling, clinical cases, or summary notes as applicable:\n${formattedResources}`;
    }

    const response = await generateContentWithFallback({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert clinical pharmacy curriculum builder. Generate medically accurate clinical modules based on official guidelines. Respond with a strictly formatted JSON object matching the requested schema.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: { type: Type.STRING, description: 'Concise overview' },
            learningObjectives: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: '3 clear learning objectives'
            },
            anatomyReview: { type: Type.STRING, description: 'Anatomy and physiology review' },
            pathophysiology: { type: Type.STRING, description: 'Pathophysiology notes' },
            pharmacology: {
              type: Type.OBJECT,
              properties: {
                drugClasses: { type: Type.STRING },
                individualDrugs: { type: Type.STRING },
                moa: { type: Type.STRING },
                pkpd: { type: Type.STRING },
                monitoring: { type: Type.STRING }
              },
              required: ['drugClasses', 'individualDrugs', 'moa', 'pkpd', 'monitoring']
            },
            clinicalPharmacy: {
              type: Type.OBJECT,
              properties: {
                guidelines: { type: Type.STRING },
                carePlans: { type: Type.STRING },
                counseling: { type: Type.STRING },
                pearls: { type: Type.STRING }
              },
              required: ['guidelines', 'carePlans', 'counseling', 'pearls']
            },
            diseaseManagement: { type: Type.STRING },
            clinicalCases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  scenario: { type: Type.STRING },
                  questions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        q: { type: Type.STRING },
                        a: { type: Type.STRING }
                      },
                      required: ['q', 'a']
                    }
                  }
                },
                required: ['title', 'scenario', 'questions']
              }
            },
            oscePractice: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  answer: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ['question', 'options', 'answer', 'explanation']
              }
            },
            flashcards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  front: { type: Type.STRING },
                  back: { type: Type.STRING }
                },
                required: ['front', 'back']
              }
            },
            mnemonics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  phrase: { type: Type.STRING },
                  breakdown: { type: Type.STRING }
                },
                required: ['title', 'phrase', 'breakdown']
              }
            },
            summaryNotes: { type: Type.STRING }
          },
          required: [
            'overview', 'learningObjectives', 'anatomyReview', 'pathophysiology', 
            'pharmacology', 'clinicalPharmacy', 'diseaseManagement', 'clinicalCases', 
            'oscePractice', 'questions', 'flashcards', 'mnemonics', 'summaryNotes'
          ]
        }
      }
    });

    res.json(safeJsonParse(response.text, {}));
  } catch (error: any) {
    console.error('Module content generation error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable' : error.message) : 'AI module generation failed' });
  }
});

// Secure Cloudinary Destroy API
app.post('/api/cloudinary/destroy', async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ error: 'Missing publicId' });
    }

    const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiKey || !apiSecret) {
      console.warn('Cloudinary API credentials missing. Skipping cloud asset deletion.');
      return res.json({ result: 'skipped', message: 'No API credentials configured on server' });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const signatureInput = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(signatureInput).digest('hex');

    const formData = new URLSearchParams();
    formData.append('public_id', publicId);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', apiKey);
    formData.append('signature', signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(`Cloudinary deletion response for ${publicId}:`, data);
    res.json({ result: data.result || 'ok', details: data });
  } catch (error: any) {
    console.error('Cloudinary destroy proxy error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'Failed to destroy Cloudinary image' });
  }
});

// Setup Vite Dev Server / Static files for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const viteModule = await import('vite');
    const vite = await viteModule.createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  
// ==================== CLINOVA ACADEMIC ENGINE ====================
// Context-Aware Module AI Tutor
app.post('/api/gemini/module-tutor', async (req, res) => {
  try {
    const { discipline, moduleTitle, chatHistory, userMessage, academicLevel, customResources } = req.body;
    if (!moduleTitle || !userMessage) {
      return res.status(400).json({ error: 'Missing moduleTitle or userMessage' });
    }
    const level = academicLevel || 'Year 1: Basic Medical Sciences';
    const disc = discipline || 'Clinical Pharmacy';
    
    let baseContext = `MODULE TUTOR SESSION:
Discipline: ${disc}
Unit: ${moduleTitle}
Level: ${level}
Task:
Search ONLY within this unit's indexed knowledge base (the custom resources provided).
Generate a precise, highly accurate answer.
Show the references used at the bottom.
Gently pivot unrelated questions back to the study material.`;

    if (customResources && customResources.length > 0) {
      const formattedResources = customResources.map((r) => 
        `- SOURCE (${r.sourceName || 'General'}): ${r.notes}${r.url ? ` (Link: ${r.url})` : ''}`
      ).join('\n');
      baseContext += `\n\nCRITICAL GROUNDING REFERENCE NOTES FROM INSTRUCTORS (Unit Knowledge Base):\nUse the following supplemental notes and guidelines to directly answer student questions.\n${formattedResources}`;
    }

    const result = await processAcademicRequest(userMessage, baseContext, chatHistory);
    res.json({ text: result.reply });
  } catch (error) {
    console.error('Module Tutor error:', error);
    res.status(500).json({ error: 'Module Tutor failed' });
  }
});

// Clinical Case AI Tutor
app.post('/api/gemini/case-tutor', async (req, res) => {
  try {
    const { specialty, disease, caseTitle, caseData, chatHistory, userMessage } = req.body;
    if (!caseTitle || !userMessage) {
      return res.status(400).json({ error: 'Missing caseTitle or userMessage' });
    }
    const baseContext = `CASE TUTOR SESSION:
Specialty: ${specialty}
Disease: ${disease}
Case Title: ${caseTitle}
Case Data:
- Demographics: ${caseData?.demographics}
- Chief Complaint: ${caseData?.chiefComplaint}
- History of Present Illness: ${caseData?.hpi}
- Past Medical History: ${caseData?.pmh}
- Medications: ${caseData?.medHx}
- Allergies: ${caseData?.allergies}
- Physical Exam: ${caseData?.pe}
- Vitals: ${caseData?.vitals}
- Labs/Imaging: ${caseData?.labs} ${caseData?.imaging || ''}
- Diagnosis: ${caseData?.diagnosis}
- Plan: ${caseData?.carePlan}

Task:
Guide the student's clinical reasoning. Answer their specific question based on evidence-based guidelines for ${disease}, relating it back to these specific patient parameters.`;

    const result = await processAcademicRequest(userMessage, baseContext, chatHistory);
    res.json({ reply: result.reply });
  } catch (error) {
    console.error('Case Tutor Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Education Hub AI Tutor
app.post('/api/gemini/hub-tutor', async (req, res) => {
  try {
    const { unitTitle, moduleTitle, chatHistory, userMessage } = req.body;
    if (!unitTitle || !userMessage) {
      return res.status(400).json({ error: 'Missing unitTitle or userMessage' });
    }
    const baseContext = `EDUCATION HUB TUTOR:
Unit: ${unitTitle}
Module: ${moduleTitle}
Task:
Answer their question accurately using evidence-based medical and pharmaceutical knowledge.
At the end of your response, include a section with:
- **Confidence Score**: (e.g. 95%)
- **Sources**: (list simulated sources like WHO guidelines, Katzung Pharmacology, etc. depending on context)
- **Suggested Flashcards**: 2-3 flashcard Q&A pairs related to the topic.`;

    const result = await processAcademicRequest(userMessage, baseContext, chatHistory);
    res.json({ reply: result.reply });
  } catch (error) {
    console.error('Hub Tutor Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Oral Practice - Question Generator
app.post('/api/gemini/oral-practice/generate', async (req, res) => {
  try {
    const { mode, category, difficulty, specificItem, history } = req.body;
    
    let prompt = "";
    let responseSchema: any = {};
    
    if (mode === 'mcq') {
      prompt = `You are an expert Pharmacy and Clinical Education Examiner.
Generate a high-yield Multiple Choice Question (MCQ) for oral preparation in the category "${category}".
Difficulty level: ${difficulty}.
${specificItem ? `Focus on this specific topic: ${specificItem}` : ""}
${history && history.length > 0 ? `Avoid repeating these recently asked questions: ${JSON.stringify(history)}` : ""}

Generate a realistic, clinically accurate question with exactly 4 options. One option must be correct.
Provide an in-depth explanation detailing why the correct answer is right and why the other options are incorrect.`;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          answerIndex: { type: Type.NUMBER, description: "0-based index of the correct answer" },
          explanation: { type: Type.STRING, description: "Detailed clinical explanation for correct/incorrect answers" }
        },
        required: ["question", "options", "answerIndex", "explanation"]
      };
    } else {
      prompt = `You are a clinical examiner for medical, pharmacy, and healthcare students (such as in OSCEs, ward rounds, viva voce, or oral exams).
Generate a high-yield oral practice question.
Mode: ${mode}
Category: ${category}
Difficulty: ${difficulty}
${specificItem ? `Focus item (drug/disease/scenario): ${specificItem}` : ""}
${history && history.length > 0 ? `Avoid repeating these recently asked questions: ${JSON.stringify(history)}` : ""}

Depending on the mode, tailor the output:
- 'viva': Classic oral viva question. A direct, academic yet practical question.
- 'rapid': Short, high-intensity question.
- 'case': Present a realistic patient scenario (e.g. including age, chief complaint, vitals or labs) followed by a direct oral question.
- 'drug': Ask a detailed clinical question focused on the mechanism, side effects, interactions, or counseling for the specified drug.
- 'disease': Ask a clinical pharmacy or pharmacotherapy management question around the specified disease.

Provide brief "promptGuidance" (a 1-sentence hint or tip for the student on what they should cover in their answer).`;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING, description: "The oral examiner's question" },
          promptGuidance: { type: Type.STRING, description: "1-sentence hint or focus tip for the student" },
          patientScenario: { type: Type.STRING, description: "Detailed patient scenario if mode is case, otherwise empty" }
        },
        required: ["question", "promptGuidance"]
      };
    }
    
    const response = await generateContentWithFallback({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        systemInstruction: "You are Clinova's Oral Examination Simulator. You generate accurate, highly relevant, and challenging questions for healthcare students preparing for OSCEs, Vivas, and Ward Rounds."
      }
    });
    
    const parsed = safeJsonParse(response.text, {});
    res.json(parsed);
  } catch (error: any) {
    console.error('Oral practice question generation error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate oral practice question' });
  }
});

// Oral Practice - Student Answer Evaluator
app.post('/api/gemini/oral-practice/evaluate', async (req, res) => {
  try {
    const { question, studentResponse, mode, category, difficulty, specificItem, patientScenario } = req.body;
    
    if (!studentResponse) {
      return res.status(400).json({ error: 'Missing student response' });
    }
    
    const prompt = `You are a strict yet constructive clinical examiner evaluating a student's oral or typed response.
Evaluate the response based on clinical accuracy, completeness, structure, and professional language.

Examiner Context:
- Question Asked: ${question}
${patientScenario ? `- Patient Scenario: ${patientScenario}` : ""}
- Mode: ${mode}
- Category: ${category}
- Difficulty: ${difficulty}
${specificItem ? `- Specific Topic: ${specificItem}` : ""}

Student's Response:
"${studentResponse}"

Evaluate and score the answer out of 100.
Provide:
1. Overall score (0-100)
2. 2-4 key Strengths (what they got right, accurate clinical points, etc.)
3. 2-4 key Areas for Improvement (what they missed, contraindications they forgot to mention, counseling points omitted, etc.)
4. Ideal Answer: A gold-standard model response an expert clinical pharmacist or consultant physician would give.
5. Key Learning Points: 2-3 critical facts, pearls, clinical mnemonics, or common mistakes related to this specific topic.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER },
        strengths: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        improvements: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        idealAnswer: { type: Type.STRING },
        learningPoints: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: ["score", "strengths", "improvements", "idealAnswer", "learningPoints"]
    };
    
    const response = await generateContentWithFallback({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        systemInstruction: "You are an elite clinical medical and pharmacy oral board examiner. You evaluate student responses critically and constructively, offering accurate, evidence-based feedback."
      }
    });
    
    const parsed = safeJsonParse(response.text, {});
    res.json(parsed);
  } catch (error: any) {
    console.error('Oral practice evaluation error:', error);
    res.status(500).json({ error: error.message || 'Failed to evaluate response' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Clinova core backend running on port ${PORT}`);  });
}

// Only start the server if not running in a serverless environment like Vercel
if (process.env.VERCEL !== '1') {
  startServer();
}

export default app;

// GET AI Providers Status and configurations
app.get('/api/admin/providers', (req, res) => {
  res.json({
    providers: getProviderStatusList(),
    loadBalancingMode: loadBalancingMode,
    globalProviderOverride: getGlobalProviderOverride()
  });
});

// POST Update a specific provider's metadata/status
app.post('/api/admin/providers/update', (req, res) => {
  const { providerName, priority, weight, status, apiKeyMasked } = req.body;
  if (!providerName || !providerStatuses[providerName]) {
    return res.status(400).json({ error: 'Invalid provider name' });
  }
  
  updateProviderConfig(providerName, { priority, weight, status, apiKeyMasked });
  res.json({ success: true, provider: providerStatuses[providerName] });
});

// POST Toggle Provider Health (Outage Simulation)
app.post('/api/admin/providers/toggle-healthy', (req, res) => {
  const { providerName } = req.body;
  if (!providerName || !providerStatuses[providerName]) {
    return res.status(400).json({ error: 'Invalid provider name' });
  }
  
  const provider = providerStatuses[providerName];
  provider.isHealthy = !provider.isHealthy;
  
  if (!provider.isHealthy) {
    provider.errorRate = 100;
  } else {
    provider.errorRate = Math.round((provider.errorCount / Math.max(1, provider.requestCount)) * 100);
  }
  
  res.json({
    success: true,
    providerName,
    isHealthy: provider.isHealthy,
    errorRate: provider.errorRate
  });
});

// GET Global Router Configuration
app.get('/api/admin/config', (req, res) => {
  res.json({
    globalProviderOverride: getGlobalProviderOverride(),
    loadBalancingMode: loadBalancingMode
  });
});

// POST Global Router Configuration
app.post('/api/admin/config', (req, res) => {
  const { globalProviderOverride, loadBalancingMode: newMode } = req.body;
  
  if (globalProviderOverride !== undefined) {
    setGlobalProviderOverride(globalProviderOverride);
  }
  if (newMode !== undefined) {
    setLoadBalancingMode(newMode);
  }
  
  res.json({
    success: true,
    globalProviderOverride: getGlobalProviderOverride(),
    loadBalancingMode: loadBalancingMode
  });
});

// GET Gateway logs
app.get('/api/admin/ai/logs', (req, res) => {
  res.json(gatewayLogs);
});

// GET Current prompt templates
app.get('/api/admin/ai/prompts', (req, res) => {
  res.json(getPrompts());
});

// POST Update a prompt template
app.post('/api/admin/ai/prompts/update', (req, res) => {
  const { id, template } = req.body;
  if (!id || template === undefined) {
    return res.status(400).json({ error: 'Missing id or template' });
  }
  
  const updated = updatePrompt(id, template);
  res.json({ success: updated });
});

// POST Reset prompt templates
app.post('/api/admin/ai/prompts/reset', (req, res) => {
  resetPrompts();
  res.json({ success: true, prompts: getPrompts() });
});

// POST Live Test Endpoint through the AI Gateway
app.post('/api/admin/ai/gateway/test', async (req, res) => {
  const { prompt, provider, feature } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await generateContentWithFallback(
      { contents: prompt },
      provider || undefined,
      feature || 'Admin Live Test'
    );
    res.json({
      success: true,
      text: response.text,
      logs: gatewayLogs.slice(0, 5) // Return recent logs to show fallback details
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Execution failed' });
  }
});


