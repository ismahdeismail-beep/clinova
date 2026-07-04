import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import crypto from 'crypto';

import multer from 'multer';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;
const upload = multer({ storage: multer.memoryStorage() });

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

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
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

// Initialize Gemini Client (Lazy Initialization to prevent startup crashes when API key is missing)
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is not configured. Please add your Gemini API Key in the AI Studio Settings menu to power the AI features of Clinova.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// File Extraction Endpoint using Gemini inlineData
app.post('/api/gemini/extract-file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided' });
    const { extractionType } = req.body;
    
    // Fallback if not provided
    const type = extractionType || 'patient';
    
    const inlineData = {
      data: req.file.buffer.toString('base64'),
      mimeType: req.file.mimetype
    };

    let prompt = '';
    let responseSchema: any = {};

    if (type === 'patient') {
      prompt = `Extract patient demographic information from this document, image, or audio.
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
      prompt = `Extract pharmacotherapy review data from this document, image, or audio transcript.
Return a JSON object with fields mapping to a clinical review form:
- patientName (string)
- age (string)
- weight (string)
- height (string)
- chiefComplaint (string)
- pastMedicalHistory (string)
- diagnosis (string)
- currentMedications (string)
- allergies (string)
If a field is not found, omit it.`;
      
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          patientName: { type: Type.STRING },
          age: { type: Type.STRING },
          weight: { type: Type.STRING },
          height: { type: Type.STRING },
          chiefComplaint: { type: Type.STRING },
          pastMedicalHistory: { type: Type.STRING },
          diagnosis: { type: Type.STRING },
          currentMedications: { type: Type.STRING },
          allergies: { type: Type.STRING },
        }
      };
    } else {
      return res.status(400).json({ error: 'Invalid extraction type' });
    }

    const response = await getGeminiClient().models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        { role: 'user', parts: [ { text: prompt }, { inlineData } ] }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        systemInstruction: "You are an expert clinical data extraction AI. You extract structured data from clinical documents, images, and dictations."
      }
    });

    const parsed = JSON.parse(response.text || '{}');
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
    const response = await getGeminiClient().models.generateContent({
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

    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (error: any) {
    console.error('Autofill generation error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'AI generation failed' });
  }
});

// AI Interactive Assistant / Chat Sidebar
app.post('/api/gemini/assistant', async (req, res) => {
  try {
    const { userMessage, chatHistory, currentFormState } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: 'Missing userMessage' });
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

    contents.push({
      role: 'user',
      parts: [{ text: `
${stateSummary}

User Clinical Query: "${userMessage}"
      ` }],
    });

    const response = await getGeminiClient().models.generateContent({
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

    const response = await getGeminiClient().models.generateContent({
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

    const prompt = `You are Clinova OS, an advanced Clinical Pharmacy Assistant and AI Knowledge Engine.
Please provide a complete, clinical-grade medical profile for the medication search query.
Query Info: ${queryInfo}

If a specific drug name is entered, return the profile for that drug. If a category is selected, return a list of 3-5 prominent drugs in that category, and describe each in brief, structured clinical notes.

For each drug profile, include:
1. **Generic Name & Class**: Generic name, pharmacologic class, and common brand names in Kenya.
2. **Key Indications & Recommended Dosages**: Adult/pediatric doses for typical indications based on Kenya Drug Index (KDI) standards.
3. **Renal & Hepatic Adjustments**: Crucial CrCl-based or child-pugh based adjustments.
4. **Important Contraindications & Key Interaction Alerts**: Life-threatening combinations or critical warnings.
5. **Key Patient Monitoring Guidelines**: Crucial clinical/lab monitoring indices (e.g., serum Cr, electrolytes, INR).
`;

    const response = await getGeminiClient().models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert clinical pharmacologist and KDI committee editor. Provide highly structured, precise, and guideline-directed monographs. Always format using structured markdown with clear headings, bullets, and tables where helpful.`,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Drug profile search error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'AI drug lookup failed' });
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

    const response = await getGeminiClient().models.generateContent({
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

    const cases = JSON.parse(response.text || '[]');
    res.json(cases);
  } catch (error: any) {
    console.error('Case extraction error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'AI case extraction failed' });
  }
});

// AI Integrated Learning Module Content Generator
app.post('/api/gemini/generate-module-content', async (req, res) => {
  try {
    const { moduleTitle, academicLevel } = req.body;

    if (!moduleTitle) {
      return res.status(400).json({ error: 'Missing moduleTitle' });
    }

    const level = academicLevel || 'Senior Pharmacy Student';

    const prompt = `You are Clinova Curriculum Engine, an expert clinical pharmacy professor and OSCE examiner.
Generate a comprehensive clinical education module for the topic "${moduleTitle}", tailored for a "${level}" level.

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

    const response = await getGeminiClient().models.generateContent({
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

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Module content generation error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable' : error.message) : 'AI module generation failed' });
  }
});

// Context-Aware Module AI Tutor
app.post('/api/gemini/module-tutor', async (req, res) => {
  try {
    const { moduleTitle, chatHistory, userMessage } = req.body;

    if (!moduleTitle || !userMessage) {
      return res.status(400).json({ error: 'Missing moduleTitle or userMessage' });
    }

    const systemInstruction = `You are Clinova AI Module Tutor, an expert Clinical Pharmacy Professor and OSCE Mentor.
You are strictly context-locked to the selected module: "${moduleTitle}".
Your objective is to answer questions, guide patient cases, teach clinical pearls, and review OSCE practice STRICTLY within the scope of "${moduleTitle}".

If the user asks questions unrelated to clinical pharmacy, pharmacology, or specifically the therapeutics of "${moduleTitle}", gently pivot them back to the study material.
Always reference reliable resources such as the Kenya Drug Index (KDI), Kenya National Guidelines, WHO Essential Medicines, and established pharmacotherapy standards. Keep answers highly interactive, clear, and clinical-grade.`;

    const contents = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      for (const msg of chatHistory) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    const response = await getGeminiClient().models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Module Tutor error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable' : error.message) : 'Module Tutor failed' });
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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Clinova core backend running on port ${PORT}`);  });
}

// Only start the server if not running in a serverless environment like Vercel
if (process.env.VERCEL !== '1') {
  startServer();
}

export default app;
