import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import crypto from 'crypto';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Autofill Endpoint
app.post('/api/gemini/autofill', async (req, res) => {
  try {
    const { formData, filesContext } = req.body;

    if (!formData) {
      return res.status(400).json({ error: 'Missing formData' });
    }

    // Prepare a descriptive context from the first part of the form
    const admission = formData.admission || {};
    const history = formData.history || {};
    const systems = formData.systems || {};
    const vitalsLabs = formData['vitals-labs'] || {};
    const diagnosis = formData.diagnosis || {};

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
Based on the provided Patient Context, uploaded reference notes, and Kenya Drug Index (KDI) clinical rules, generate the optimal pharmacological treatment plan, non-pharmacological plan, pharmaceutical care plan, and patient counselling points.

=== RELEVANT NOTES CONTEXT ===
${filesContext ? JSON.stringify(filesContext) : 'No uploaded notes context.'}

=== PATIENT CLINICAL CASE ===
${patientContext}

Generate appropriate, guideline-based recommendations. Ensure you adjust doses for renal function if CrCl or Creatinine is abnormal (e.g. adjust Amoxicillin, Ceftriaxone, or other drugs if renal clearance is impaired).
    `;

    // We use a structured JSON schema to populate the rest of the form perfectly!
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert clinical pharmacist in Kenya, specializing in pharmacotherapy reviews, guideline-directed medical therapy, and local formularies (KDI). Your outputs must be highly clinical, precise, and evidence-based.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pharmacological_treatments: {
              type: Type.ARRAY,
              description: 'Up to 5 pharmacological treatments. Map them to the treatment rows.',
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
              description: 'Text summarizing non-pharmacological interventions (e.g. oxygen support, fluid restriction, dietary changes).',
            },
            care_plans: {
              type: Type.ARRAY,
              description: 'Up to 3 clinical rows representing the pharmaceutical care plan.',
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
              description: 'Non-pharmacological care plan details.',
            },
            care_plan_monitoring: {
              type: Type.STRING,
              description: 'Detailed patient monitoring parameters (clinical, laboratory).',
            },
            counselling_points: {
              type: Type.STRING,
              description: 'Actionable and clear counselling points for the patient or caregiver, clearly numbered or bulleted.',
            },
          },
          required: [
            'pharmacological_treatments',
            'non_pharmacological_management',
            'care_plans',
            'care_plan_non_pharma',
            'care_plan_monitoring',
            'counselling_points',
          ],
        },
      },
    });

    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (error: any) {
    console.error('Autofill generation error:', error);
    res.status(500).json({ error: error.message || 'AI generation failed' });
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

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Clinical Assistant error:', error);
    res.status(500).json({ error: error.message || 'AI assistant failed' });
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
    res.status(500).json({ error: error.message || 'Failed to destroy Cloudinary image' });
  }
});

// Setup Vite Dev Server / Static files for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
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
    console.log(`Clinova core backend running on port ${PORT}`);
  });
}

startServer();
