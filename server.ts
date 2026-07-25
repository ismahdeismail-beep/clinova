import { RAGRouter } from './src/services/ragRouter';
import { KnowledgeEngine } from './src/engine/knowledgeEngine.service';
import { processAcademicRequest } from "./src/server/academicEngine.js";
import { orchestrateSkills, skillRegistry } from "./src/skills";
import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import crypto from 'crypto';

import multer from 'multer';
import { 
  generateContentWithFallback, 
  streamGenerateContent, 
  getProviderStatusList,
  getGlobalProviderOverride, 
  setGlobalProviderOverride, 
  providerStatuses,
  gatewayLogs,
  loadBalancingMode,
  setLoadBalancingMode,
  updateProviderConfig,
  embedText
} from './src/server/aiRouter.js';
import { processOneJob, processJobBatch } from './src/server/jobProcessor.js';
import { getPrompts, updatePrompt, resetPrompts } from './src/server/promptRegistry.js';
import { fetchOpenFdaLabel, resolveRxCui, fetchRxNormInteractions } from './src/server/externalMedicinesApi.js';
import { crawlSource, crawlMany, searchLibrary } from './src/server/bookCrawler.service.js';
import { LIBRARY_CATEGORY, isSupermemoryConfigured } from './src/server/supermemory.service.js';
import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client (service role) for privileged clinical-case writes.
// Uses the service-role key (never exposed to the browser) so RLS policies that
// block anonymous inserts do not prevent admin-authored cases from being persisted.
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const adminSupabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;

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

// Security headers (always on; dependency-free, safe defaults). Hardens
// against clickjacking, MIME sniffing, referrer leakage, and enforces HTTPS
// in production. Kept minimal to avoid interfering with the SPA / API.
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
    res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
  }
  next();
});

// Structured request logging (Phase 13). Logs method, path, status, duration
// for every API call. In production (VERCEL=1) uses compact JSON; in dev uses
// a concise coloured-ish format.
app.use((req, res, next) => {
  const start = Date.now();
  const originalEnd = res.end.bind(res);
  res.end = (...args: any[]) => {
    const ms = Date.now() - start;
    const line = `${req.method} ${req.path} ${res.statusCode} ${ms}ms`;
    if (process.env.VERCEL === '1') {
      console.log(JSON.stringify({ method: req.method, path: req.path, status: res.statusCode, ms, ts: new Date().toISOString() }));
    } else if (res.statusCode >= 500) {
      console.error(`[ERR] ${line}`);
    } else {
      console.log(`[API] ${line}`);
    }
    return originalEnd(...args);
  };
  next();
});

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health & readiness probes (additive; no auth required so infra can poll).
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), ts: Date.now() });
});

app.get('/api/ready', (_req, res) => {
  const deps = {
    gemini: Boolean(process.env.GEMINI_API_KEY),
    supabase: Boolean(adminSupabase),
    openrouter: Boolean(process.env.OPENROUTER_API_KEY),
  };
  const ready = deps.gemini; // Gemini is the minimum viable dependency.
  res.status(ready ? 200 : 503).json({ status: ready ? 'ready' : 'degraded', deps, ts: Date.now() });
});

// ----- Optional API protection (opt-in; safe defaults, NO breaking changes) -----
// Rate limiting + auth are DISABLED by default so existing clients keep working.
// Enable for production via env: RATE_LIMIT_ENABLED=true, API_REQUIRE_AUTH=true.
const RATE_LIMIT_ENABLED = process.env.RATE_LIMIT_ENABLED === 'true';
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60000);
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || 300);
const API_REQUIRE_AUTH = process.env.API_REQUIRE_AUTH === 'true';
const API_SHARED_SECRET = process.env.API_SHARED_SECRET || '';

const rateBuckets = new Map<string, number[]>();
function rateLimit(req: any, res: any, next: any) {
  if (!RATE_LIMIT_ENABLED) return next();
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown')
    .split(',')[0].trim();
  const now = Date.now();
  const hits = (rateBuckets.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_MAX) {
    res.set('Retry-After', String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)));
    return res.status(429).json({ error: 'Too many requests. Please slow down.' });
  }
  hits.push(now);
  rateBuckets.set(ip, hits);
  next();
}

function requireAuth(req: any, res: any, next: any) {
  if (!API_REQUIRE_AUTH) return next();
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (API_SHARED_SECRET && token === API_SHARED_SECRET) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// Admin route guard (opt-in). When ADMIN_API_SECRET is set, all /api/admin/*
// routes require a matching `x-admin-secret` header. This protects the
// privileged, service-role write endpoints (clinical cases, embeddings
// reindex) in production. When unset, behavior is unchanged (open) so local
// dev and existing deploys keep working.
const ADMIN_API_SECRET = process.env.ADMIN_API_SECRET || '';
function requireAdmin(req: any, res: any, next: any) {
  if (!ADMIN_API_SECRET) return next();
  const provided = req.headers['x-admin-secret'] || '';
  if (provided === ADMIN_API_SECRET) return next();
  return res.status(403).json({ error: 'Forbidden' });
}

// Per-IP limiter for expensive AI endpoints (always on, generous default).
// Independent of the opt-in global limiter; prevents a single client from
// exhausting AI quota / driving cost. Tunable via AI_RATE_LIMIT_MAX.
const AI_RATE_LIMIT_MAX = Number(process.env.AI_RATE_LIMIT_MAX || 60);
const AI_RATE_LIMIT_WINDOW_MS = Number(process.env.AI_RATE_LIMIT_WINDOW_MS || 60000);
const aiRateBuckets = new Map<string, number[]>();
function aiRateLimit(req: any, res: any, next: any) {
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown')
    .split(',')[0].trim();
  const now = Date.now();
  const hits = (aiRateBuckets.get(ip) || []).filter((t) => now - t < AI_RATE_LIMIT_WINDOW_MS);
  if (hits.length >= AI_RATE_LIMIT_MAX) {
    res.set('Retry-After', String(Math.ceil(AI_RATE_LIMIT_WINDOW_MS / 1000)));
    return res.status(429).json({ error: 'AI request rate exceeded. Please slow down.' });
  }
  hits.push(now);
  aiRateBuckets.set(ip, hits);
  next();
}

// Apply to all /api routes. Health/ready declared above stay open.
app.use('/api', rateLimit, requireAuth);
app.use('/api/admin', requireAdmin);
app.use('/api/gemini', aiRateLimit);

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

// Multipart Chunked Upload API
app.post('/api/upload/chunk', upload.single('chunk'), async (req, res) => {
  try {
    const { uploadId, chunkIndex, totalChunks, fileName } = req.body;
    if (!uploadId || chunkIndex === undefined || !totalChunks || !fileName) {
      return res.status(400).json({ error: 'Missing required chunk upload fields.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No chunk file provided.' });
    }

    const chunkIdx = parseInt(chunkIndex, 10);
    const totalChks = parseInt(totalChunks, 10);

    const uploadsDir = path.join(process.cwd(), 'uploads');
    const tmpDir = path.join(uploadsDir, 'tmp', uploadId);

    // Create directories recursively
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    // Write current chunk
    const chunkPath = path.join(tmpDir, `chunk_${chunkIdx}`);
    fs.writeFileSync(chunkPath, req.file.buffer);

    // Check if we have received all chunks
    const files = fs.readdirSync(tmpDir);
    const uploadedChunksCount = files.filter(f => f.startsWith('chunk_')).length;

    if (uploadedChunksCount === totalChks) {
      // Ensure all individual chunks are actually written completely
      const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();
      const finalFileName = `${uploadId}_${safeName}`;
      const finalPath = path.join(uploadsDir, finalFileName);

      const writeStream = fs.createWriteStream(finalPath);

      await new Promise<void>((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);

        try {
          for (let i = 0; i < totalChks; i++) {
            const currentChunkPath = path.join(tmpDir, `chunk_${i}`);
            if (!fs.existsSync(currentChunkPath)) {
              throw new Error(`Missing chunk index: ${i}`);
            }
            const chunkData = fs.readFileSync(currentChunkPath);
            writeStream.write(chunkData);
          }
          writeStream.end();
        } catch (err) {
          writeStream.destroy();
          reject(err);
        }
      });

      // Clear chunk files and remove the temporary folder
      for (let i = 0; i < totalChks; i++) {
        const currentChunkPath = path.join(tmpDir, `chunk_${i}`);
        if (fs.existsSync(currentChunkPath)) {
          fs.unlinkSync(currentChunkPath);
        }
      }
      fs.rmdirSync(tmpDir);

      return res.json({
        status: 'completed',
        url: `/uploads/${finalFileName}`,
        fileName: finalFileName,
      });
    }

    return res.json({
      status: 'chunk_received',
      chunkIndex: chunkIdx,
      uploadedCount: uploadedChunksCount,
      totalChunks: totalChks
    });

  } catch (error: any) {
    console.error('Chunk upload error:', error);
    // Best-effort cleanup of partial chunks to avoid disk leak on failed assembly.
    try {
      const uid = req.body && (req.body.uploadId as string | undefined);
      if (uid) {
        const d = path.join(process.cwd(), 'uploads', 'tmp', uid);
        if (fs.existsSync(d)) fs.rmSync(d, { recursive: true, force: true });
      }
    } catch (_) { /* non-fatal */ }
    res.status(500).json({ error: error.message || 'Failed to process chunk upload.' });
  }
});

function getPatientInitialsBackend(name: string): string {
  if (!name) return "";
  const trimmed = name.trim();
  
  // If it's already formatted as initials (e.g., "J. K." or "J.K."), return as is
  if (/^[A-Z](\.?\s*[A-Z]\.?)*$/.test(trimmed)) {
    return trimmed;
  }
  
  const parts = trimmed.split(/[\s\-_,.]+/).filter(Boolean);
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
    } else if (type === 'educational_resource') {
      prompt = `You are Clinova's Educational Knowledge Engine. Analyze the uploaded educational resource (which could be a book chapter, clinical guideline, lecture note, research article, or case study).
Extract comprehensive metadata, classify the content within the medical/pharmacy curriculum, and generate AI-ready summaries.

Return a JSON object containing:
- title: The extracted or inferred title of the document.
- summary: A concise, high-yield summary of the entire document.
- learningObjectives: An array of 3-5 learning objectives covered.
- textContent: A well-formatted, extracted text representation of the document's core content, preserving important clinical guidelines, facts, and structure.
- classification: An object categorizing the resource within the curriculum.
- relationships: Related clinical concepts, diseases, and drugs mentioned.`;
      
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          learningObjectives: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          textContent: { type: Type.STRING, description: "Full extracted readable text content, properly formatted." },
          classification: {
            type: Type.OBJECT,
            properties: {
              learningArea: { type: Type.STRING, description: "e.g., Clinical Pharmacy, Basic Sciences, Clinical Medicine" },
              unit: { type: Type.STRING },
              topic: { type: Type.STRING },
              subtopic: { type: Type.STRING },
              subject: { type: Type.STRING },
              therapeuticArea: { type: Type.STRING },
              clinicalSpecialty: { type: Type.STRING },
              educationalLevel: { type: Type.STRING },
              resourceType: { type: Type.STRING },
              keywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          },
          relationships: {
            type: Type.OBJECT,
            properties: {
              diseases: { type: Type.ARRAY, items: { type: Type.STRING } },
              drugs: { type: Type.ARRAY, items: { type: Type.STRING } },
              clinicalCases: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          suggestions: {
            type: Type.OBJECT,
            properties: {
              flashcards: { type: Type.ARRAY, items: { type: Type.STRING } },
              quizzes: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
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
        // eslint-disable-next-line no-control-regex
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
      model: 'gemini-flash-latest',
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
      model: 'gemini-flash-latest',
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

// ----- Context-window optimization helpers (Phase 7) -----
// Drop empty fields and truncate overly long values so the full form state
// does not blow the prompt on every assistant request.
function optimizeFormContext(formState: any): string {
  if (!formState || typeof formState !== 'object') return '';
  try {
    const compact = (val: any): any => {
      if (Array.isArray(val)) {
        const arr = val.map(compact).filter(v => v !== null && v !== '' && v !== undefined);
        return arr;
      }
      if (val && typeof val === 'object') {
        const out: any = {};
        for (const [k, v] of Object.entries(val)) {
          const cv = compact(v);
          const empty = cv === null || cv === '' ||
            (Array.isArray(cv) && cv.length === 0) ||
            (cv && typeof cv === 'object' && Object.keys(cv).length === 0);
          if (!empty) {
            out[k] = (typeof cv === 'string' && cv.length > 1500) ? cv.slice(0, 1500) + '…' : cv;
          }
        }
        return out;
      }
      return val;
    };
    const trimmed = compact(formState);
    return JSON.stringify(trimmed);
  } catch {
    return '';
  }
}

// Builds the Gemini request contents + system instruction for the assistant.
// Shared by the buffered and streaming endpoints. Caps history to the last 8
// turns and compacts the form state to keep the context window lean.
async function buildAssistantRequest(body: any) {
  const { userMessage, chatHistory, currentFormState, fileData, fileType, fileName } = body;

  let ragContext = '';
  if (userMessage) {
    const route = await RAGRouter.route(userMessage, adminSupabase);
    if (route.requiresRag) {
      ragContext = RAGRouter.buildContextForAi(route.engineResult);
    }
  }

  const systemInstruction = `You are Clinova AI Assistant, a specialized Clinical Pharmacy mentor for healthcare students and professionals in Kenya and East Africa.

=== CORE ROLE ===
You assist with ward rounds, pharmacotherapy reviews, Board exam prep, drug information queries, clinical case analysis, and evidence-based practice questions. You are authoritative, concise, and educational.

=== RAG DATA INTEGRATION (CRITICAL) ===
${ragContext ? `The following RETRIEVED KNOWLEDGE SOURCES have been found in the Clinova database (Kenya Drug Index, clinical cases, disease registry):

${ragContext}

INSTRUCTIONS FOR USING RETRIEVED DATA:
1. Use the retrieved data as the PRIMARY basis for your answer — do not override it with generic knowledge when the data is present.
2. For drug queries: cite exact indications, contraindications, side effects, interactions, dosing, and monitoring from the monographs above.
3. For clinical cases: reference the specific case title, disease, and specialty in your response.
4. For disease queries: use the disease information above (ICD-10, specialty) as context.
5. Always cite your sources using brackets like [DRUG: Amoxicillin] or [CASE: Patient J.K.] or [DISEASE: Pneumonia].
6. If retrieved data is partially relevant, use it as context and supplement with your knowledge — clearly noting what came from the database vs general clinical knowledge.
7. If retrieved data is insufficient or absent, say so honestly and provide general clinical guidance without fabricating database-specific data.

` : `NO SPECIFIC DATABASE MATCHES found for this query. Provide general clinical guidance based on your training, referencing WHO guidelines and standard clinical practice where applicable.

`}

=== BEHAVIORAL RULES ===
- Be concise and actionable — students need clear, exam-ready answers.
- Use markdown formatting with headings for clarity.
- When discussing drug dosing, always specify: indication, dose, route, frequency, and duration where applicable.
- For drug interactions, state: severity (major/moderate/minor), mechanism, and clinical management.
- For clinical cases, follow: assessment → differential → investigation → management → monitoring.
- Be encouraging — you are a mentor, not just an information source.
- For Kenyan context: reference the Kenya Essential Medicines List, KDI, and local treatment guidelines when relevant.`;

  const contents: any[] = [];
  const limitedHistory = Array.isArray(chatHistory) ? chatHistory.slice(-8) : [];
  for (const msg of limitedHistory) {
    contents.push({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    });
  }

  const userParts: any[] = [];

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
      userParts.push({ inlineData: { data: cleanBase64, mimeType: 'application/pdf' } });
    } else if (isImage) {
      let cleanMimetype = mimetype;
      if (!cleanMimetype.includes('image')) {
        if (filename.toLowerCase().endsWith('.png')) cleanMimetype = 'image/png';
        else if (filename.toLowerCase().endsWith('.webp')) cleanMimetype = 'image/webp';
        else if (filename.toLowerCase().endsWith('.gif')) cleanMimetype = 'image/gif';
        else cleanMimetype = 'image/jpeg';
      }
      userParts.push({ inlineData: { data: cleanBase64, mimeType: cleanMimetype } });
    } else {
      try {
        const buf = Buffer.from(cleanBase64, 'base64');
        const textContent = buf.toString('utf-8');
        // eslint-disable-next-line no-control-regex
        const isBinary = textContent.includes('\u0000') || /[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(textContent);
        if (!isBinary) {
          userParts.push({ text: `\n--- ATTACHED FILE CONTENT: ${filename} ---\n${textContent}\n--- END OF ATTACHED FILE ---\n` });
        } else {
          userParts.push({ text: `\n[Attached File: ${filename} - binary format not natively readable. Upload PDF, image, or text.]\n` });
        }
      } catch {
        userParts.push({ text: `\n[Attached File: ${filename} - Failed to parse file content.]\n` });
      }
    }
  }

  const stateSummary = currentFormState ? `
=== CURRENT CLINICAL FORM STATE (compact) ===
${optimizeFormContext(currentFormState)}
  ` : '';

  userParts.push({
    text: `
${stateSummary}

User Clinical Query: "${userMessage || 'Analyze the attached file.'}"
${fileName ? `(Attached file: ${fileName})` : ''}
`
  });

  contents.push({ role: 'user', parts: userParts });

  return { contents, systemInstruction };
}

// AI Interactive Assistant / Chat Sidebar (buffered)
app.post('/api/gemini/assistant', async (req, res) => {
  try {
    const { userMessage, fileData } = req.body;

    if (!userMessage && !fileData) {
      return res.status(400).json({ error: 'Missing userMessage or fileData' });
    }

    const { contents, systemInstruction } = await buildAssistantRequest(req.body);

    const response = await generateContentWithFallback({
      model: 'gemini-flash-latest',
      contents,
      config: { systemInstruction },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Clinova Support error:', error);
    res.status(500).json({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'AI assistant failed' });
  }
});

// AI Interactive Assistant / Chat Sidebar (streaming, SSE)
app.post('/api/gemini/assistant/stream', async (req, res) => {
  const send = (obj: any) => res.write(`data: ${JSON.stringify(obj)}\n\n`);
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  if (typeof (res as any).flushHeaders === 'function') (res as any).flushHeaders();

  let closed = false;
  req.on('close', () => { closed = true; });

  try {
    const { userMessage, fileData } = req.body;
    if (!userMessage && !fileData) {
      if (!closed) send({ error: 'Missing userMessage or fileData' });
      return res.end();
    }

    const { contents, systemInstruction } = await buildAssistantRequest(req.body);

    await streamGenerateContent(
      { model: 'gemini-flash-latest', contents, config: { systemInstruction } },
      (chunk) => { if (!closed) send({ text: chunk }); },
      undefined,
      'Clinova Support'
    );

    if (!closed) send({ done: true });
    res.end();
  } catch (error: any) {
    console.error('Clinova Support stream error:', error);
    if (!closed) send({ error: error.message ? (error.message.includes('{') ? 'Service temporarily unavailable (Model high demand or API Error)' : error.message) : 'AI assistant failed' });
    res.end();
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
      model: 'gemini-flash-latest',
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

// AI Flashcards Generator for Educational Units
app.post('/api/gemini/generate-unit-flashcards', async (req, res) => {
  try {
    const { unitTitle, moduleTitle, notesText } = req.body;
    if (!unitTitle) {
      return res.status(400).json({ error: 'Missing unitTitle' });
    }

    const prompt = `Generate 5-8 high-yield active-recall study flashcards for the educational unit: "${unitTitle}" (part of "${moduleTitle || 'General Studies'}").
${notesText ? `\nUse the following student-uploaded notes as the source of truth for custom topics, guidelines, or points:\n${notesText}\n` : 'Focus on the standard clinical, pharmacological, or physiological curriculum for this topic.'}

Return a list of flashcard objects, where each flashcard has:
1. question: A clear, concise active recall question or clinical scenario (e.g. "What is the primary mechanism of action of paclitaxel?").
2. answer: A high-yield, punchy, informative answer explaining the concept or facts cleanly.`;

    const response = await generateContentWithFallback({
      model: 'gemini-flash-latest',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            flashcards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  answer: { type: Type.STRING }
                },
                required: ['question', 'answer']
              }
            }
          },
          required: ['flashcards']
        },
        systemInstruction: `You are an expert clinical pharmacy professor and OSCE board examiner. You construct high-yield, active recall flashcards to help trainees memorize core mechanisms, drug classes, side effects, guidelines, and diagnostic criteria. Keep questions highly specific and answers comprehensive yet punchy.`
      }
    });

    const parsed = JSON.parse(response.text || '{"flashcards": []}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Flashcard generation error:', error);
    res.status(500).json({ error: 'Failed to generate flashcards' });
  }
});

// AI Quiz/MCQ Generator for Educational Units
app.post('/api/gemini/generate-unit-quiz', async (req, res) => {
  try {
    const { unitTitle, moduleTitle, notesText } = req.body;
    if (!unitTitle) {
      return res.status(400).json({ error: 'Missing unitTitle' });
    }

    const prompt = `Generate 5 clinical-case-based or core-pharmacological multiple choice questions (MCQs) for the unit: "${unitTitle}" (under "${moduleTitle || 'General Studies'}").
${notesText ? `\nBasing on these student-uploaded notes:\n${notesText}\n` : 'Basing on standard academic board requirements.'}

Return a list of quiz question objects, where each object has:
1. question: The clinical vignette or conceptual question.
2. options: An array of exactly 4 strings (distractors and 1 correct answer).
3. correctAnswer: The exact string corresponding to the correct option.
4. explanation: A comprehensive explanation explaining why that answer is correct and why other options are incorrect, citing relevant mechanisms or guidelines.`;

    const response = await generateContentWithFallback({
      model: 'gemini-flash-latest',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quizzes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctAnswer: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ['question', 'options', 'correctAnswer', 'explanation']
              }
            }
          },
          required: ['quizzes']
        },
        systemInstruction: `You are an expert MCQ item writer for clinical board exams (such as the Pharmacy and Poisons Board OSCE exams or USMLE). You write highly realistic clinical vignettes, challenging distractors, and extremely educational explanation rationales based on evidence-based guidelines.`
      }
    });

    const parsed = JSON.parse(response.text || '{"quizzes": []}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Quiz generation error:', error);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

// AI Exam-Prep Paper Generator — mirrors a real clinical-pharmacy exam pattern
app.post('/api/gemini/generate-exam-paper', async (req, res) => {
  try {
    const { title, topics, structure, variant } = req.body;
    if (!title || !Array.isArray(topics) || !Array.isArray(structure)) {
      return res.status(400).json({ error: 'Missing title, topics, or structure' });
    }

    const variantNote = variant === 2
      ? 'This is PAPER 2 (a second, distinct mock paper). Produce DIFFERENT questions, different vignettes, and different distractors from any paper you may have produced before. Do not repeat questions from Paper 1.'
      : 'This is PAPER 1 (the first mock paper).';

    const structureText = structure
      .map((s: any) => `SECTION ${s.letter}: ${s.name} — ${s.count} question(s), ${s.marks} marks. Instruction: ${s.instruction}`)
      .join('\n');

    const topicsText = topics.map((t: string, i: number) => `${i + 1}. ${t}`).join('\n');

    const prompt = `You are an expert clinical-pharmacy examination item writer. Generate a complete, realistic mock examination paper for the subject: "${title}".

EXAM STRUCTURE (follow EXACTLY — same sections, same question counts, same marks):
${structureText}

TOPIC AREAS THE PAPER MUST COVER (draw questions from these, weighted to the unit):
${topicsText}

${variantNote}

QUESTION STYLE (match a real university clinical-pharmacy exam):
- Section A: clinical-vignette or concept Multiple Choice Questions with exactly 4 options (a, b, c, d) and one correct answer. Include "EXCEPT"/"NOT" style questions where natural.
- Section B: concise Short Answer Questions (1-3 mark points each) testing applied knowledge.
- Section C: Long Answer Questions requiring structured, exam-style responses (mechanism, management, monitoring, counselling).

Return a single JSON object with this exact shape:
{
  "title": "${title}",
  "variant": ${variant || 1},
  "sections": [
    {
      "letter": "A",
      "name": "Multiple Choice Questions",
      "marks": <number>,
      "questions": [
        { "stem": "<question text / vignette>", "options": ["a", "b", "c", "d"], "answer": "<exact correct option text>", "explanation": "<1-2 sentence rationale>" }
      ]
    },
    {
      "letter": "B",
      "name": "Short Answer Questions",
      "marks": <number>,
      "questions": [
        { "stem": "<question text>", "modelAnswer": "<concise expected answer>" }
      ]
    },
    {
      "letter": "C",
      "name": "Long Answer Questions",
      "marks": <number>,
      "questions": [
        { "stem": "<question text>", "modelAnswer": "<structured exam-style answer with key headings>" }
      ]
    }
  ]
}`;

    const response = await generateContentWithFallback({
      model: 'gemini-flash-latest',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            variant: { type: Type.NUMBER },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  letter: { type: Type.STRING },
                  name: { type: Type.STRING },
                  marks: { type: Type.NUMBER },
                  questions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        stem: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING } },
                        answer: { type: Type.STRING },
                        explanation: { type: Type.STRING },
                        modelAnswer: { type: Type.STRING }
                      },
                      required: ['stem']
                    }
                  }
                },
                required: ['letter', 'name', 'questions']
              }
            }
          },
          required: ['sections']
        },
        systemInstruction: `You are a senior clinical-pharmacy examiner. You write board-style exam papers that are clinically accurate, guideline-aligned (WHO/KDI), and pedagogically sound. Every MCQ has exactly one unambiguously correct answer. Short and long answers are concise but complete.`
      }
    });

    const parsed = JSON.parse(response.text || '{"sections": []}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Exam paper generation error:', error);
    res.status(500).json({ error: 'Failed to generate exam paper' });
  }
});

// AI Study Guide Summary Generator for Educational Units
app.post('/api/gemini/generate-unit-summary', async (req, res) => {
  try {
    const { unitTitle, moduleTitle, notesText } = req.body;
    if (!unitTitle) {
      return res.status(400).json({ error: 'Missing unitTitle' });
    }

    const prompt = `Generate an elegant, comprehensive, and highly structured medical study guide for the educational unit: "${unitTitle}" (part of "${moduleTitle || 'General Studies'}").
${notesText ? `\nAnalyze and summarize the following student-uploaded materials, consolidating key details, names of medications, and guidelines:\n${notesText}\n` : 'Create a comprehensive guide following the standard medical/pharmacy curriculum.'}

Structure the output beautifully using Markdown with the following key sections:
1. **Overview & High-Yield Summary**: A high-level introduction to the physiological, clinical, or pharmacotherapy context.
2. **Core Pharmacology & Mechanism of Action**: Detailed therapeutic classifications, receptor interactions, and pathways.
3. **Formulary Dosing & Critical Adjustments**: Emphasize standard guidelines (e.g., KDI, WHO), dosing regimens, and any special patient conditions (like renal clearance, hepatic adjustments, or CrCl-based calculations).
4. **Key Safety Profiles & Interactions**: Highlight high-alert adverse reactions, key contraindications, and major drug-drug or drug-food interactions.
5. **Clinical OSCE Pearls**: Golden high-yield tips, diagnostic rules of thumb, or common board pitfalls for this unit.`;

    const response = await generateContentWithFallback({
      model: 'gemini-flash-latest',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert clinical pharmacotherapist and esteemed academic professor. You write publication-quality, structured, evidence-based study summaries, highlighting critical guidelines, safety profiles, and OSCE board review concepts.`
      }
    });

    res.json({ summary: response.text || 'Failed to generate summary content.' });
  } catch (error: any) {
    console.error('Summary generation error:', error);
    res.status(500).json({ error: 'Failed to generate study summary' });
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
2. **Mechanism of Action**: A concise, accurate pharmacologic mechanism.
3. **Key Indications & Recommended Dosages**: Adult/pediatric doses for typical indications based on Kenya Drug Index (KDI) standards.
4. **Renal & Hepatic Adjustments**: Crucial CrCl-based or child-pugh based adjustments.
5. **Important Contraindications & Key Interaction Alerts**: Life-threatening combinations or critical warnings.
6. **Key Patient Monitoring Guidelines**: Crucial clinical/lab monitoring indices (e.g., serum Cr, electrolytes, INR).
7. **Patient Counselling**: Practical advice the patient should receive at dispensing.

CRITICAL OUTPUT RULES:
- DO NOT include any section about where to obtain, purchase, buy, or source the medicine, and DO NOT write "where to get", "available at", "consult a pharmacist", "we do not have data on availability", or any placeholder availability text. The monograph must be fully self-sufficient clinical content.
- DO NOT write "information being compiled", "data not yet available", or any placeholder/empty sections. If a detail is genuinely unknown, omit that sub-point rather than stating it is missing.
- Every heading you include must contain substantive clinical content.

ATTRIBUTION: This response uses clinical data sourced from the U.S. National Library of Medicine (NLM) and openFDA. Ensure you append an attribution line at the end of the text.
`;

    const response = await generateContentWithFallback({
      model: 'gemini-flash-latest',
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
      model: 'gemini-flash-latest',
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
      model: 'gemini-flash-latest',
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
      model: 'gemini-flash-latest',
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

    // ── Library ingestion (Supermemory + Firecrawl) ───────────────────────────
    app.post('/api/library/crawl', async (req, res) => {
      if (!isSupermemoryConfigured()) {
        return res.status(400).json({ error: 'Supermemory not configured (set SUPERMEMORY_API_KEY)' })
      }
      const source = req.body?.source
      if (!source || !source.url) {
        return res.status(400).json({ error: 'source.url is required' })
      }
      const result = await crawlSource({
        id: source.id || source.url,
        title: source.title || source.url,
        url: source.url,
        authors: source.authors,
        type: source.type,
        subject: source.subject,
      })
      res.json({ ok: !result.skipped, result })
    })

    app.post('/api/library/crawl-many', async (req, res) => {
      if (!isSupermemoryConfigured()) {
        return res.status(400).json({ error: 'Supermemory not configured (set SUPERMEMORY_API_KEY)' })
      }
      const sources = Array.isArray(req.body?.sources) ? req.body.sources : []
      if (sources.length === 0) return res.status(400).json({ error: 'sources[] required' })
      const results = await crawlMany(
        sources.map((s: any) => ({
          id: s.id || s.url,
          title: s.title || s.url,
          url: s.url,
          authors: s.authors,
          type: s.type,
          subject: s.subject,
        }))
      )
      res.json({ ok: true, results })
    })

    app.get('/api/library/search', async (req, res) => {
      const q = req.query.q as string
      if (!q) return res.status(400).json({ error: 'q required' })
      const results = await searchLibrary(q, Number(req.query.limit) || 5)
      res.json({ ok: true, category: LIBRARY_CATEGORY, results })
    })

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

// Dynamic Full Case Generator Endpoint
app.post('/api/gemini/generate-full-case', async (req, res) => {
  try {
    const { specialty, disease, title, difficulty } = req.body;
    if (!specialty || !disease || !title) {
      return res.status(400).json({ error: 'Missing specialty, disease, or title' });
    }

    const diff = difficulty || 'Intermediate';

    const prompt = `You are Clinova's AI Curriculum Case Generator.
Generate a highly detailed, medically realistic, and curriculum-appropriate patient case study matching these clinical parameters:
- Specialty: ${specialty}
- Disease / Clinical Topic: ${disease}
- Case Title: ${title}
- Target Difficulty: ${diff}

The patient should have a unique realistic name (e.g., local Kenyan or standard clinical name) and a detailed clinical story. The case MUST focus on a Drug-Therapy Problem (DTP) (such as inappropriate dosing, renal adjustment required, untreated indication, adverse drug reaction, drug-drug interaction, or therapeutic duplication).

Provide:
1. Detailed patient demographics and a chief complaint.
2. History of Present Illness (HPI) and Past Medical History (PMH).
3. Medication History (medHx), Allergies, physical exam (pe), vitals, and specific labs/imaging values (especially renal clearance like Creatinine and eGFR).
4. Full clinical care plan details, including pharmacotherapy (pharm) and non-pharmacotherapy (nonPharm) interventions, goals of therapy, drug-therapy problems (dtps), monitoring parameters, and patient counseling pearls.
5. In-depth clinical pearls and official guideline-directed references.

You must respond with a strictly formatted JSON object matching the required schema.`;

    const response = await generateContentWithFallback({
      model: 'gemini-flash-latest',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert clinical pharmacy and pharmacology examiner. Generate high-fidelity patient case studies conforming to the requested JSON schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            specialty: { type: Type.STRING },
            disease: { type: Type.STRING },
            title: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            patientName: { type: Type.STRING },
            facilitySetting: { type: Type.STRING },
            demographics: { type: Type.STRING },
            chiefComplaint: { type: Type.STRING },
            hpi: { type: Type.STRING },
            pmh: { type: Type.STRING },
            medHx: { type: Type.STRING },
            allergies: { type: Type.STRING },
            pe: { type: Type.STRING },
            vitals: { type: Type.STRING },
            labs: { type: Type.STRING },
            imaging: { type: Type.STRING },
            diagnosis: { type: Type.STRING },
            ddx: { type: Type.ARRAY, items: { type: Type.STRING } },
            goals: { type: Type.STRING },
            pharm: { type: Type.STRING },
            nonPharm: { type: Type.STRING },
            carePlan: { type: Type.STRING },
            dtps: { type: Type.STRING },
            monitoring: { type: Type.STRING },
            counselling: { type: Type.STRING },
            followUp: { type: Type.STRING },
            pearls: { type: Type.STRING },
            references: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: [
            'id', 'specialty', 'disease', 'title', 'difficulty', 'patientName',
            'facilitySetting', 'demographics', 'chiefComplaint', 'hpi', 'pmh',
            'medHx', 'allergies', 'pe', 'vitals', 'labs', 'imaging', 'diagnosis',
            'ddx', 'goals', 'pharm', 'nonPharm', 'carePlan', 'dtps', 'monitoring',
            'counselling', 'followUp', 'pearls', 'references'
          ]
        }
      }
    });

    const parsedCase = safeJsonParse(response.text, {});
    // Ensure all mandatory fields are populated
    const finalCase = {
      ...parsedCase,
      id: parsedCase.id || `case_gen_${Date.now()}`,
      specialty: specialty,
      disease: disease,
      title: title,
      difficulty: diff,
      createdAt: new Date().toISOString(),
      status: 'published',
      createdBy: 'system',
      createdByName: 'Clinical Faculty'
    };

    res.json(finalCase);
  } catch (error: any) {
    console.error('Case generation error:', error);
    res.status(500).json({ error: 'Failed to generate clinical case' });
  }
});

// Education Hub AI Tutor
app.post('/api/gemini/hub-tutor', async (req, res) => {
  try {
    const { unitTitle, moduleTitle, chatHistory, userMessage, notesContext } = req.body;
    if (!unitTitle || !userMessage) {
      return res.status(400).json({ error: 'Missing unitTitle or userMessage' });
    }
    const baseContext = `EDUCATION HUB TUTOR:
Unit: ${unitTitle}
Module: ${moduleTitle}

${notesContext ? `=== STUDENT UPLOADED NOTES / STUDY GUIDE CONTEXT ===\n${notesContext}\n==================================================\n` : ''}

Task:
Answer their question accurately using evidence-based medical and pharmaceutical knowledge. Prefer utilizing the provided notes context if relevant.
At the end of your response, include a section with:
- **Confidence Score**: (e.g. 95%)
- **Sources**: (list sources, including Student Notes if utilized, alongside standard sources like WHO guidelines, Katzung Pharmacology, etc. depending on context)
- **Suggested Flashcards**: 2-3 flashcard Q&A pairs related to the topic.`;

    const result = await processAcademicRequest(userMessage, baseContext, chatHistory);
    res.json({ reply: result.reply });
  } catch (error) {
    console.error('Hub Tutor Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// ================================================================
// CLINOVA AI SKILLS — ORCHESTRATED ENDPOINT
// Routes a query through the modular skills system: intent
// detection -> skill selection -> parallel execution -> merge.
// ================================================================

function buildEducationalContext(query: string): any {
  const q = query.toLowerCase();
  let queryType = 'general';
  if (/what is|explain|define|describe|how does|mechanism/.test(q)) queryType = 'concept_explanation';
  else if (/diagnosis|treatment|management|care plan|case|patient|vignette/.test(q)) queryType = 'clinical_case';
  else if (/drug|medicine|dosage|side effect|interaction|contraindication/.test(q)) queryType = 'drug_info';
  else if (/guideline|recommend|evidence/.test(q)) queryType = 'guideline';
  else if (/compare|vs\b|difference| versus /.test(q)) queryType = 'comparison';
  else if (/study|revise|notes|flashcard|summary/.test(q)) queryType = 'study_material';
  else if (/mcq|quiz|question|exam|viva|test me/.test(q)) queryType = 'practice_question';

  return {
    learningArea: '', subject: '', unit: '', topic: '', subtopic: '',
    educationalLevel: 'Intermediate', queryType,
  };
}

// List registered skills (for admin/debug/UI)
app.get('/api/ai/skills', (_req, res) => {
  res.json({
    success: true,
    count: skillRegistry.count,
    skills: skillRegistry.getDefinitions().map((d) => ({
      id: d.id, name: d.name, category: d.category, description: d.description,
      priority: d.priority, cacheable: !!d.cacheable,
    })),
  });
});

// Orchestrated skill execution
app.post('/api/ai/orchestrate', async (req, res) => {
  try {
    const { query, chatHistory, attachedResources, userId, preferences, disease, drug, level } = req.body;
    if (!query) return res.status(400).json({ error: 'Missing query' });

    const ctx = buildEducationalContext(query);
    if (disease) ctx.disease = disease;
    if (drug) ctx.drug = drug;
    if (level) ctx.educationalLevel = level;

    const result = await orchestrateSkills(query, ctx, {
      chatHistory, attachedResources, userId, preferences,
    });

    res.json({
      success: true,
      text: result.consolidatedContent,
      plan: result.plan,
      skillsApplied: Array.from(result.skillResults.keys()),
      recommendations: result.recommendations,
      references: result.references,
      processingTimeMs: result.processingTimeMs,
    });
  } catch (error: any) {
    console.error('Skill Orchestration error:', error);
    res.status(500).json({ error: error.message || 'Orchestration failed' });
  }
});

// Oral Practice - Question Generator
app.post('/api/gemini/oral-practice/generate', async (req, res) => {
  try {
    const { mode, category, difficulty, specificItem, history, kbContext } = req.body;
    
    let prompt = "";
    let responseSchema: any = {};
    const contextStr = kbContext ? `\n\nUse this validated clinical knowledge to build the question:\n${kbContext}` : '';
    
    if (mode === 'mcq') {
      prompt = `You are an expert Pharmacy and Clinical Education Examiner.
Generate a high-yield Multiple Choice Question (MCQ) for oral preparation in the category "${category}".
Difficulty level: ${difficulty}. ${contextStr}
Ensure options are plausible distractors and correct answer is evidence-based.
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
      model: 'gemini-flash-latest',
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
      model: 'gemini-flash-latest',
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

// ── Admin Clinical Case persistence (Supabase is the canonical store) ────────
// AdminDashboard writes clinical cases here (server-side service role) so they
// become visible in the case browser, which reads from Supabase `clinical_cases`.

function isValidUuid(v: any): boolean {
  return typeof v === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
}

// Map the AdminDashboard ClinicalCase shape (camelCase) to Supabase row columns.
// Text columns default to '' (never null) to satisfy NOT NULL constraints;
// array columns default to [].
function mapAdminCaseToRow(p: any): Record<string, any> {
  const t = (v: any) => (v === undefined || v === null ? '' : v);
  const arr = (v: any) => (Array.isArray(v) ? v : []);
  return {
    title: t(p.title),
    specialty: t(p.specialty ?? p.topic),
    difficulty: t(p.difficulty) || 'Intermediate',
    chief_complaint: t(p.chiefComplaint ?? p.scenario),
    dtps: t(p.dtps ?? p.learningPoints),
    status: t(p.status) || 'published',
    created_by: p.createdBy ?? p.created_by ?? null,
    created_by_name: p.createdByName ?? p.created_by_name ?? null,
    disease: t(p.disease ?? p.specialty ?? p.topic) || 'General Medicine',
    unit_id: p.unitId ?? p.unit_id ?? null,
    patient_name: t(p.patientName ?? p.patient_name),
    facility_setting: t(p.facilitySetting ?? p.facility_setting),
    demographics: t(p.demographics),
    hpi: t(p.hpi),
    pmh: t(p.pmh),
    med_hx: t(p.medHx ?? p.med_hx),
    allergies: t(p.allergies),
    pe: t(p.pe),
    vitals: t(p.vitals),
    labs: t(p.labs),
    imaging: t(p.imaging),
    diagnosis: t(p.diagnosis),
    ddx: arr(p.ddx),
    goals: t(p.goals),
    pharm: t(p.pharm),
    non_pharm: t(p.nonPharm ?? p.non_pharm),
    care_plan: t(p.carePlan ?? p.care_plan),
    monitoring: t(p.monitoring),
    counselling: t(p.counselling ?? p.counselling),
    follow_up: t(p.followUp ?? p.follow_up),
    pearls: t(p.pearls),
    references: arr(p.references),
  };
}

app.post('/api/admin/clinical-cases', async (req, res) => {
  if (!adminSupabase) return res.status(500).json({ error: 'Supabase service client not configured' });
  try {
    const body = req.body;
    const items: any[] = Array.isArray(body)
      ? body
      : (body?.cases && Array.isArray(body.cases) ? body.cases : [body]);
    const rows = items
      .filter((p) => p && p.title)
      .map((p) => {
        const row = mapAdminCaseToRow(p);
        row.id = isValidUuid(p.id) ? p.id : crypto.randomUUID();
        row.created_at = new Date().toISOString();
        return row;
      });
    if (rows.length === 0) return res.status(400).json({ error: 'No valid case payloads provided' });
    const { data, error } = await adminSupabase.from('clinical_cases').insert(rows).select();
    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true, cases: data });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/admin/clinical-cases/:id', async (req, res) => {
  if (!adminSupabase) return res.status(500).json({ error: 'Supabase service client not configured' });
  try {
    const row = mapAdminCaseToRow(req.body);
    const { data, error } = await adminSupabase
      .from('clinical_cases')
      .update(row)
      .eq('id', req.params.id)
      .select();
    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true, case: data?.[0] ?? null });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/admin/clinical-cases/:id', async (req, res) => {
  if (!adminSupabase) return res.status(500).json({ error: 'Supabase service client not configured' });
  try {
    const { error } = await adminSupabase.from('clinical_cases').delete().eq('id', req.params.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ================================================================
// Embeddings ingestion pipeline (Phase 10)
// Populates document_embeddings for semantic search / RAG. Runs in
// bounded batches so it stays within provider rate limits and the
// serverless request budget. Call repeatedly (or from a cron) until
// { remaining: 0 }. Writes use the service-role client (bypasses RLS).
// ================================================================

function truncateForEmbedding(text: string, max = 2000): string {
  const t = (text || '').replace(/\s+/g, ' ').trim();
  return t.length > max ? t.slice(0, max) : t;
}

function buildEmbeddingText(contentType: string, row: any): string {
  if (contentType === 'drug') {
    return [
      `Drug: ${row.name}`,
      row.generic_name ? `Generic: ${row.generic_name}` : '',
      row.drug_class ? `Class: ${row.drug_class}` : '',
      Array.isArray(row.indications) ? `Indications: ${row.indications.join('; ')}` : '',
      Array.isArray(row.contraindications) ? `Contraindications: ${row.contraindications.join('; ')}` : '',
      Array.isArray(row.side_effects) ? `Side effects: ${row.side_effects.join('; ')}` : '',
    ].filter(Boolean).join('\n');
  }
  if (contentType === 'disease') {
    return [
      `Disease: ${row.name}`,
      row.specialty ? `Specialty: ${row.specialty}` : '',
      row.icd10_code ? `ICD-10: ${row.icd10_code}` : '',
      row.aliases ? `Aliases: ${row.aliases}` : '',
    ].filter(Boolean).join('\n');
  }
  // clinical case
  return [
    `Case: ${row.title}`,
    row.disease ? `Disease: ${row.disease}` : '',
    row.diagnosis ? `Diagnosis: ${row.diagnosis}` : '',
    row.specialty ? `Specialty: ${row.specialty}` : '',
  ].filter(Boolean).join('\n');
}

const EMBED_SOURCES: { contentType: string; table: string; select: string; filter?: (q: any) => any }[] = [
  { contentType: 'drug', table: 'drug_monographs', select: 'id, name, generic_name, drug_class, indications, contraindications, side_effects' },
  { contentType: 'disease', table: 'diseases', select: 'id, name, specialty, icd10_code, aliases' },
  { contentType: 'case', table: 'clinical_cases', select: 'id, title, disease, diagnosis, specialty', filter: (q: any) => q.eq('status', 'published') },
];

app.post('/api/admin/embeddings/reindex', async (req, res) => {
  if (!adminSupabase) return res.status(500).json({ error: 'Supabase service client not configured' });
  if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  const contentTypeFilter: string | undefined = req.body?.contentType;
  const batchSize: number = Math.min(Math.max(Number(req.body?.batchSize) || 25, 1), 100);

  try {
    const { data: existing } = await adminSupabase
      .from('document_embeddings')
      .select('content_type, content_id');
    const done = new Set((existing ?? []).map((e: any) => `${e.content_type}:${e.content_id}`));

    let processed = 0;
    let remaining = 0;
    const errors: string[] = [];

    for (const src of EMBED_SOURCES) {
      if (contentTypeFilter && src.contentType !== contentTypeFilter) continue;

      let q = adminSupabase.from(src.table).select(src.select);
      if (src.filter) q = src.filter(q);
      const { data: rows, error } = await q;
      if (error) { errors.push(`${src.table}: ${error.message}`); continue; }

      const pending = (rows ?? []).filter((r: any) => !done.has(`${src.contentType}:${r.id}`));
      remaining += pending.length;

      for (const row of pending) {
        if (processed >= batchSize) break;
        try {
          const text = truncateForEmbedding(buildEmbeddingText(src.contentType, row));
          if (!text) continue;
          const embedding = await embedText(text);
          const { error: insErr } = await adminSupabase.from('document_embeddings').insert({
            content_type: src.contentType,
            content_id: String(row.id),
            chunk_index: 0,
            chunk_text: text,
            embedding,
            metadata: { title: row.name || row.title || '' },
          });
          if (insErr) { errors.push(`insert ${src.contentType}/${row.id}: ${insErr.message}`); continue; }
          processed++;
          remaining--;
        } catch (e: any) {
          errors.push(`embed ${src.contentType}/${row.id}: ${e.message}`);
        }
      }
      if (processed >= batchSize) break;
    }

    res.json({ success: true, processed, remaining, errors: errors.slice(0, 10) });
  } catch (e: any) {
    console.error('Embeddings reindex error:', e);
    res.status(500).json({ error: e.message });
  }
});

// Lightweight status: how many items are embedded vs total.
app.get('/api/admin/embeddings/status', async (_req, res) => {
  if (!adminSupabase) return res.status(500).json({ error: 'Supabase service client not configured' });
  try {
    const { count: embedded } = await adminSupabase
      .from('document_embeddings')
      .select('*', { count: 'exact', head: true });
    res.json({ success: true, embedded: embedded ?? 0 });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ================================================================
// Background Job Queue (Phase 9)
// Enqueue + process async jobs (document ingestion, embedding gen).
// ================================================================

// Enqueue a new job
app.post('/api/admin/jobs/enqueue', async (req, res) => {
  if (!adminSupabase) return res.status(500).json({ error: 'Supabase service client not configured' });
  try {
    const { job_type, payload, priority, user_id } = req.body;
    if (!job_type) return res.status(400).json({ error: 'Missing job_type' });
    const { data, error } = await adminSupabase.from('processing_jobs').insert({
      job_type,
      payload: payload ?? {},
      priority: priority ?? 0,
      user_id: user_id ?? null,
    }).select();
    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true, job: data?.[0] ?? null });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Process the next batch of pending jobs
app.post('/api/admin/jobs/process', async (req, res) => {
  if (!adminSupabase) return res.status(500).json({ error: 'Supabase service client not configured' });
  try {
    const max = Math.min(Math.max(Number(req.body?.batchSize) || 5, 1), 50);
    const jobType: string | undefined = req.body?.jobType || undefined;
    const count = await processJobBatch(max, jobType);
    res.json({ success: true, processed: count });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Get pending job counts grouped by type
app.get('/api/admin/jobs/status', async (_req, res) => {
  if (!adminSupabase) return res.status(500).json({ error: 'Supabase service client not configured' });
  try {
    const { data, error } = await adminSupabase
      .from('processing_jobs')
      .select('job_type, status, count:job_type.count()', { count: 'exact' })
      .in('status', ['pending', 'processing', 'failed']);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true, jobs: data ?? [] });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});


