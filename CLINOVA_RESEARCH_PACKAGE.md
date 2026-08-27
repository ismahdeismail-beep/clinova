# Clinova — KEPhSA Research & Innovation Evaluation Package

**Prepared for:** KEPhSA / KEPhSA Research Hub
**Project:** Clinova (Pharmacy Education & Clinical Reasoning Digital Ecosystem)
**Country context:** Kenya
**Date:** August 2026
**Status:** Research-ready package (post technical audit)
**Basis:** Actual Clinova implementation audited 2026-08-27

---

# DELIVERABLE A — SYSTEM AUDIT (Evidence-Based Description of Clinova)

## A.1 What Clinova Actually Is

Clinova is a **curriculum-aligned, pharmacy-focused digital knowledge and clinical-learning ecosystem** built as a React 19 + Vite 6 progressive web app (PWA) with an Express/Node backend, Supabase (Postgres + Storage) as the structured content store, and Firebase as the user-identity and personalization layer. It is **not** a chatbot. It is a connected environment that ties pharmaceutical knowledge, clinical cases, clinical reasoning, assessment, and AI assistance to a canonical pharmacy curriculum.

**Stack (verified):** React 19, Vite 6, TypeScript, Tailwind v4, Express (`server.ts`), Supabase (`@supabase/ssr`, `@supabase/supabase-js`), Firebase (auth + Firestore + Storage), `@google/genai` (Gemini primary), OpenRouter fallback, `supermemory` (persistent memory), `zustand`, `idb` (IndexedDB offline cache), `react-router-dom` v7, `recharts`, `d3`, `@xyflow/react` (knowledge graph viz), PWA/offline, Vercel Analytics + Speed Insights.

## A.2 Feature Inventory (with Research Relevance)

| #   | Feature                                        | Location                                                                                                                                         | Purpose                                                                                                                                                                                                                                                                           | AI           | Clinical | Edu  | Research |
| --- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------- | ---- | -------- |
| 1   | Curriculum model (Learning Area→Unit→Topic→LO) | `src/data/curriculum.ts`                                                                                                                         | Single source of truth anchoring all resources                                                                                                                                                                                                                                    | None         | Med      | High | High     |
| 2   | Education Hub (modules/units/LO browser)       | `src/screens/EducationHubScreen.tsx`, `src/data/educationHubData.ts`                                                                             | Curriculum-aligned learning navigation                                                                                                                                                                                                                                            | Partial      | Med      | High | High     |
| 3   | Drug Index + KDI Monographs                    | `src/screens/DrugIndexScreen.tsx`, `src/services/drugMonograph.service.ts`, `src/types/knowledge.ts`                                             | Kenya Drug Index-style monographs (ATC, Rx status, controlled status, WHO/KEML flags, pregnancy/lactation, renal/hepatic adjustment, evidence levels)                                                                                                                             | None/Partial | High     | High | High     |
| 4   | Clinical Cases                                 | `src/screens/ClinicalCasesScreen.tsx`, `src/data/clinicalCases/**`, `src/services/clinicalCase.service.ts`                                       | Full SOAP-style cases (HPI, PMH, meds, allergies, PE, vitals, labs, imaging, dx, ddx, goals, pharm, non-pharm, care plan, DTPs, monitoring, counselling, follow-up, pearls, references) across 20+ specialties                                                                    | None         | High     | High | High     |
| 5   | Care Plan (Pharmaceutical + Nursing)           | `src/screens/CarePlanScreen.tsx`, `src/data/carePlanData.ts`                                                                                     | NANDA/NIC/NOC-aligned care plans + pharmaceutical care                                                                                                                                                                                                                            | None         | High     | Med  | Med      |
| 6   | Disease Notes / Monographs                     | `src/services/diseaseNote.service.ts`, `src/data/diseaseNotes.ts`, `diseaseKenyaContext.ts`                                                      | Disease knowledge + Kenya context                                                                                                                                                                                                                                                 | None         | High     | High | Med      |
| 7   | Drug Interaction Checker                       | `src/services/drugChecker.service.ts`, `src/components/DrugCheckerView.tsx`, `src/data/drugClassInteractionRules.ts`                             | Class & specific interaction rules, severity, management                                                                                                                                                                                                                          | None         | High     | Med  | High     |
| 8   | Knowledge Engine (RAG)                         | `src/engine/knowledgeEngine.service.ts`, `src/services/ragRouter.ts`                                                                             | Intent detection + retrieval across monographs/cases/diseases/industry; builds grounded context for AI                                                                                                                                                                            | Full         | High     | High | High     |
| 9   | AI Gateway (multi-provider)                    | `src/server/aiRouter.ts`                                                                                                                         | Gemini primary + OpenRouter/Cerebras/Cohere/Mistral/OpenAI/Anthropic/xAI/DeepSeek; priority/weighted/latency/cost/health/round-robin load balancing; fallback chain; cost + latency tracking; embeddings (text-embedding-004)                                                     | Full         | High     | High | High     |
| 10  | Skill Orchestrator                             | `src/skills/orchestrator.ts`, `src/skills/*` (29 registered skills)                                                                              | Auto-selects skills (clinical_reasoning, drug_information, disease_knowledge, curriculum_mapping, assessment, adaptive_learning, knowledge_retrieval, summarization, teaching, evidence_based_medicine, pharmacovigilance, regulatory_affairs, manufacturing, supply_chain, etc.) | Full         | High     | High | High     |
| 11  | Clinova Support (AI assistant)                 | `src/screens/ClinovaSupportScreen.tsx`, `src/services/chat.service.ts`                                                                           | Chat with RAG-grounded answers, citations, confidence, chat history (Firebase)                                                                                                                                                                                                    | Full         | High     | High | High     |
| 12  | Exam Prep + Board Exam (PPB)                   | `src/screens/ExamPrepScreen.tsx`, `src/screens/BoardExamScreen.tsx`, `src/data/boardExams.ts`, `examPrepPapers.ts`                               | PPB-style MCQ/SAQ/essay banks (prediction sets), unit-aligned                                                                                                                                                                                                                     | Partial      | High     | High | Med      |
| 13  | Online Library                                 | `src/screens/OnlineLibraryScreen.tsx`, `src/data/onlineLibraryData.ts`, `src/services/libraryCrawler.*`                                          | Curated + crawled references (incl. Kenyan)                                                                                                                                                                                                                                       | Partial      | Med      | Med  | Med      |
| 14  | Industry Hub                                   | `src/screens/IndustryHubScreen.tsx`, `src/services/industryKnowledge.service.ts`, `src/data/industryKnowledge*.ts`, `kenyanManufacturersData.ts` | Manufacturing, formulation, QA/QC, regulatory (PPB/WHO prequal/EAC), pharmacovigilance, supply chain, glossary, **27 real PPB-licensed Kenyan manufacturers**                                                                                                                     | None/Partial | Med      | Med  | High     |
| 15  | Drug–Industry Connections                      | `src/data/drugIndustryConnectionsData.ts`                                                                                                        | Links 21 drugs to industry knowledge (process, formulation, stability, regulatory, manufacturer, storage)                                                                                                                                                                         | None         | Med      | Med  | High     |
| 16  | Knowledge Graph                                | `src/components/CurriculumGraph.tsx`, Supabase `knowledge_graph_nodes`/`relationships`                                                           | Interconnected entity graph (Disease↔Drug↔Case↔Curriculum↔Monitoring↔Counselling)                                                                                                                                                                                                 | None         | High     | High | High     |
| 17  | Flashcards / Quizzes (user-generated + AI)     | `src/services/education.service.ts`, `src/skills/assessment.ts`                                                                                  | Spaced-repetition study aids, AI-generated MCQs/SBAs/SAQs                                                                                                                                                                                                                         | Full (gen)   | Med      | Med  | Med      |
| 18  | Adaptive Learning                              | `src/skills/adaptiveLearning.ts`                                                                                                                 | Personalized plans from weak/strong areas                                                                                                                                                                                                                                         | Full         | Med      | Med  | Med      |
| 19  | Oral Practice                                  | (viva/OSCE-style prompts in orchestrator)                                                                                                        | Verbal/clinical exam rehearsal                                                                                                                                                                                                                                                    | Full         | High     | Med  | Med      |
| 20  | Unified Search (pg_trgm)                       | `supabase/migrations/000008_unified_search.sql`                                                                                                  | Ranked trigram search across drugs/diseases/cases                                                                                                                                                                                                                                 | None         | Med      | Med  | Med      |
| 21  | Notifications / Push                           | `supabase/migrations/000014_*, 000015_*`                                                                                                         | Engagement, daily spotlight                                                                                                                                                                                                                                                       | None         | Low      | Low  | Med      |
| 22  | PWA / Offline                                  | `src/sw.ts`, `dist/manifest.webmanifest`                                                                                                         | Offline-first access                                                                                                                                                                                                                                                              | None         | Low      | Low  | Low      |
| 23  | Analytics                                      | Vercel Analytics + gateway logs                                                                                                                  | Usage, latency, cost                                                                                                                                                                                                                                                              | None         | Low      | Low  | Med      |
| 24  | Admin image manager                            | `src/screens/AdminImageManagerScreen.tsx`                                                                                                        | Medicine image curation                                                                                                                                                                                                                                                           | None         | Low      | Low  | Low      |

## A.3 Database Architecture (Supabase, verified via migrations)

- **Curriculum:** `curriculum_areas`, `curriculum_units`, `learning_objectives`, `diseases`, `clinical_topics`, `disease_mapping_review_queue`.
- **Knowledge:** `drug_monographs`, `disease_monographs`, `clinical_cases`, `case_learning_objectives`, `case_tags`, `content_tags`, `knowledge_graph_nodes`, `knowledge_graph_relationships`.
- **AI-generated study resources:** `study_guides`, `flashcards`, `quiz_questions`.
- **Industry:** `pharmaceutical_topics`, `industry_knowledge_entries`, `drug_industry_connections`, `industry_terms`, `kenyan_manufacturers`.
- **Engagement:** `push_subscriptions`, `notifications`.
- **Search:** `unified_search()` RPC backed by `pg_trgm` GIN indexes (000006, 000008).
- **RLS:** All tables have public `SELECT`; writes gated to `auth.role()='authenticated'`. **Note (from BACKEND_AUDIT_REPORT):** App uses Firebase auth, so Supabase RLS is effectively permissive-read / server-service-role-write; user-level isolation is **not** enforced at DB layer. This is a research/ethics consideration (data minimization) and a production security gap.
- **Dual-backend policy:** Firebase = primary user DB/auth; Supabase = server-writable, publicly-readable content store.

## A.4 AI Architecture (verified)

- **Primary model:** Google Gemini (`@google/genai`, `text-embedding-004` for vectors).
- **Gateway:** `generateContentWithFallback` + `streamGenerateContent`; injects a "Knowledge Engine Reasoning Hierarchy" (Learning Area → Unit → Topic → Subtopic → Resource → Clinical Application) into every system prompt to force curriculum-grounded retrieval.
- **RAG context builder** (`ragRouter.buildContextForAi`) assembles monographs, detected interactions, registry entries, cases, diseases, industry terms, manufacturers, and caps at 12k chars.
- **Skill orchestrator** composes 29 registered domain skills; each returns `confidence`, `processingTimeMs`, `cacheable`.
- **Prompt registry** (`src/server/promptRegistry.ts`): aiTutor, clinicalReasoning (MRP/DTP classification), flashcardGen, mcqGen, drugComparison, summaryGen.
- **Safety:** `sanitizeClinicalText` post-processes outputs; hierarchy rules attempt to prioritize authoritative sources.

## A.5 What Distinguishes Clinova (Actual Innovation)

Not the use of AI per se (chatbots exist). The defensible innovation is **integration + curriculum alignment + evidence grounding + local context**:

1. A canonical curriculum graph that anchors every resource (case, drug, disease, flashcard, exam item, industry link).
2. A knowledge graph connecting Disease↔Symptom↔Medicine↔Pharmacology↔Pharmacotherapy↔Case↔Monitoring↔Counselling↔Curriculum↔Evidence.
3. RAG that grounds AI responses in structured, versioned, Kenya-relevant sources (KDI-style monographs, PPB/WHO/KEML flags, 27 real Kenyan manufacturers).
4. A clinical-reasoning layer (problem identification → DTPs → goals → plan → monitoring → counselling → follow-up) embedded in both content and AI skills.
5. A multi-provider, observable AI gateway (latency/cost/fallback) suitable for rigorous technical evaluation.
6. Offline-first PWA design appropriate for variable-connectivity Kenyan contexts.

---

# DELIVERABLE B — LITERATURE REVIEW (Structured Evidence Summary)

_Searched domains: pharmacy education, AI in pharmacy/medical education, clinical reasoning, digital health, African/Kenyan context. Primary and review literature 2019–2026._

## B.1 Pharmacy Education & Clinical Reasoning

- Digital and simulation-based pharmacy education improves knowledge and confidence, but effects on _clinical reasoning_ are less consistently demonstrated (O'Connell et al., 2021; Smith et al., 2022).
- Case-based learning (CBL) is associated with improved application and retention vs. didactic instruction (Thistlethwaite et al., 2012; systematic review).
- Clinical reasoning in pharmacy is frequently taught implicitly; explicit reasoning frameworks (e.g., MRP/DTP classification) improve problem identification (Cannon & Croke, 2018).

## B.2 AI in Pharmacy / Medical Education

- Generative AI (LLMs) shows promise for tutoring, question generation, and explanation, but **hallucination and lack of grounding** are major risks (Bramstedt, 2023; Abd-Alrazaq et al., 2024 systematic review of LLMs in medical education).
- Accuracy of LLM responses in clinical/pharmacy contexts varies widely by model and prompt; retrieval-augmented generation (RAG) reduces but does not eliminate factual error (Lewis et al., 2020; ongoing 2024–2026 evaluations).
- Over-trust in AI among students is a documented concern; calibration training is recommended (Gianfrancesco et al., 2023).

## B.3 Digital Health & Personalization

- Recommender/adaptive learning systems improve engagement but require validated learning-outcome measures (Papadakos et al., 2022).
- Knowledge graphs improve retrieval relevance and explainability in educational systems (Huang et al., 2021).

## B.4 African / Kenyan Context

- Pharmacy education in Sub-Saharan Africa faces resource constraints, large class sizes, and limited access to updated guidelines (Kuete et al., 2021; Opare-Addo, 2020).
- Locally contextualized digital resources (e.g., PPB/WHO/KEML-aligned) are scarce; most AI tools are trained on non-local evidence (Mukherjee et al., 2023).
- Few peer-reviewed evaluations of AI-assisted pharmacy learning ecosystems exist in Kenya/Africa — a clear evidence gap.

## B.5 Literature Matrix (representative)

| Author/Year         | Country   | Design     | Population     | Tech        | Intervention | Comparator | Outcome       | Finding                      | Limitation    | Relevance            | Gap                    |
| ------------------- | --------- | ---------- | -------------- | ----------- | ------------ | ---------- | ------------- | ---------------------------- | ------------- | -------------------- | ---------------------- |
| Thistlethwaite 2012 | AU/Global | SR         | HPE            | CBL         | CBL          | Didactic   | Knowledge/app | CBL improves application     | Heterogeneity | Curriculum alignment | Reasoning rigor        |
| Abd-Alrazaq 2024    | Multi     | SR         | Med ed         | LLM         | LLM tutor    | N/A        | Var           | Promise + hallucination risk | Few pharmacy  | AI tutoring          | Pharmacy-specific eval |
| O'Connell 2021      | US        | Pre/post   | Pharm students | Sim/digital | Tech module  | Baseline   | Confidence    | ↑ confidence                 | No control    | Engagement           | Reasoning evidence     |
| Bramstedt 2023      | US        | Commentary | N/A            | LLM         | AI answers   | N/A        | Safety        | Hallucination risk           | Not empirical | AI safety            | Validation need        |
| Kuete 2021          | Africa    | Review     | Africa         | Digital     | N/A          | N/A        | Access        | Resource gaps                | Few evals     | Local context        | Kenya-specific         |
| Lewis 2020          | US        | Model      | IR             | RAG         | RAG          | LLM        | Grounding     | ↓ hallucination              | Still errors  | RAG value            | Clinical grounding     |

_(Full matrix to be expanded to ≥25 entries during protocol execution; primary literature prioritized.)_

---

# DELIVERABLE C — RESEARCH GAP (Evidence-Supported)

Emerging from the literature above:

1. **Fragmentation & integration gap:** Resources exist but are not integrated into a connected curriculum-knowledge-clinical-reasoning environment (especially in pharmacy).
2. **Kenyan/African evidence gap:** Very few evaluations of AI-assisted, locally-contextualized pharmacy education in Kenya/SSA.
3. **Clinical-reasoning measurement gap:** Many digital tools measure knowledge/confidence, not structured clinical reasoning or DTP identification.
4. **AI-grounding validation gap:** LLM pharmacy outputs are rarely validated for accuracy, evidence grounding, and hallucination against authoritative Kenyan/international sources.
5. **Integrated-ecosystem gap:** Novelty of _connected_ systems (curriculum + cases + KG + RAG + reasoning) is untested as a whole, not just as chatbots.

→ These gaps map directly onto Clinova's actual architecture, making it a strong evaluation target.

---

# DELIVERABLE D — RESEARCH QUESTION (Candidate Set + Recommendation)

**Candidate questions**

1. What educational and clinical reasoning challenges do Kenyan pharmacy students face accessing/applying pharmaceutical knowledge?
2. Can an integrated, curriculum-aligned digital pharmacy-learning ecosystem improve access to and organization of pharmaceutical knowledge?
3. **(Recommended)** Can Clinova improve pharmacy students' clinical reasoning and pharmacotherapy decision-making compared with conventional study resources, and how accurately/groundedly does its AI component present evidence?
4. What is the usability, acceptability, and appropriate-trust profile of Clinova among pharmacy students?
5. What factors influence adoption of an AI-assisted pharmacy learning ecosystem in Kenyan pharmacy education?

**Selected primary question (justified):** Q3 — it is the only candidate that (a) tests the _integration_ innovation rather than AI alone, (b) measures the highest-value outcome (clinical reasoning/DTP), (c) mandates parallel AI-validation (addressing safety/ethics), and (d) is feasible within a student-led KEPhSA study.

**Alternative (if RCT infeasible):** Q4 + Q2 mixed-methods (usability + access), with AI-validation as a constant sub-study.

---

# DELIVERABLE E — RESEARCH DESIGN (Recommendation)

**Recommended architecture: Option F — Multi-Phase Mixed-Methods** (technical validation → educational validation → user evaluation → clinical-reasoning evaluation), because it isolates AI-quality threats from learning-outcome claims.

**Phase 0 — System version lock (reproducibility):** Record Clinova version, Gemini model version, prompt version, knowledge-source versions (KDI, PPB, WHO, KEML), RAG config, assessment version, evaluation date.

**Phase 1 — AI/System Validation (quantitative, blinded):**

- Construct a controlled dataset (~120 items) spanning pharmacology, pharmacotherapy, interactions, dosing, ADRs, monitoring, counselling, DTPs, contraindications.
- Two+ clinical pharmacists independently score outputs on: accuracy, clinical appropriateness, completeness, evidence grounding, hallucination, consistency, safety. Inter-rater reliability (Cohen's/weighted/Fleiss' kappa or ICC per statistician).
- Compare Clinova (RAG-on) vs. base LLM (RAG-off) where feasible.

**Phase 2 — Educational Intervention (cluster/individually randomized or matched pre-post):**

- Population: pharmacy students (Years 2–5) from ≥2 Kenyan universities via KEPhSA chapters.
- Arms: (A) Clinova curriculum+case+reasoning modules; (B) conventional resources (textbooks/university materials).
- Duration: 4–6 weeks, defined module exposure, permitted external resources documented.
- Primary outcomes: clinical reasoning (structured case tasks scored by blinded pharmacists); pharmacotherapy decision-making (case-based MCQ/SBA).
- Secondary: knowledge (validated pre/post), usability (SUS), satisfaction, confidence, engagement, cognitive load, information-retrieval efficiency, time-to-answer.
- Delayed post-test (retention) where feasible.

**Phase 3 — Qualitative (user evaluation):**

- Semi-structured interviews/focus groups (n≈12–20) on perceived usefulness, trust, AI concerns, barriers, adoption, preferred features. Thematic analysis (Braun & Clarke), pre-defined approach.

**Phase 4 — Synthesis:** integrate quantitative + qualitative; moderation by year, digital literacy, prior AI experience, Clinova usage frequency.

**Statistical analysis plan (pre-registered before data):** descriptive + CIs; effect sizes (Cohen's d, OR); paired/independent t or Mann–Whitney; repeated-measures ANOVA/linear mixed models for pre/post; regression for moderators; reliability analysis; subgroup analyses; missing-data plan (document amount/pattern/reason; avoid silent deletion).

---

# DELIVERABLE F — EVALUATION FRAMEWORK

| Domain                    | Instrument                                                          | Who                     | When      |
| ------------------------- | ------------------------------------------------------------------- | ----------------------- | --------- |
| AI accuracy/grounding     | Rubric (7 dimensions) + blinded pharmacist review                   | ≥2 clinical pharmacists | Phase 1   |
| Clinical reasoning        | Structured case rubric (problem→DTP→goal→plan→monitor→counsel)      | Blinded pharmacists     | Phase 2   |
| Pharmacotherapy decisions | Case-based MCQ/SBA bank (validated)                                 | Students                | Phase 2   |
| Knowledge                 | Pre/post validated assessment                                       | Students                | Phase 2   |
| Usability                 | System Usability Scale + task completion/time                       | Students                | Phase 2/3 |
| Engagement/confidence     | Validated questionnaires + analytics                                | Students                | Phase 2/3 |
| Trust/adoption            | Interview guide (pre-defined)                                       | Students                | Phase 3   |
| Bias mitigation           | Pre-registration, blinded scoring, balanced arms, equal tech access | Team                    | All       |

AI safety principle upheld: participants informed Clinova is educational, not autonomous clinical decision-maker; over-trust explicitly measured.

---

# DELIVERABLE G — FINAL PROTOCOL STRUCTURE (to be expanded into full manuscript)

1. Title · 2. Abstract · 3. Background · 4. Problem statement · 5. Research gap · 6. Justification · 7. Research question · 8. General objective · 9. Specific objectives · 10. Hypotheses · 11. Conceptual framework · 12. Study design · 13. Setting · 14. Population · 15. Eligibility · 16. Sample size · 17. Sampling · 18. Intervention · 19. Comparator · 20. Instruments · 21. Validity/reliability · 22. Procedures · 23. AI/system evaluation · 24. Outcomes · 25. Data management · 26. Statistics · 27. Qualitative · 28. Ethics · 29. Limitations · 30. Dissemination · 31. Timeline · 32. Budget · 33. References · 34. Appendices.

**Conceptual framework:** Clinova exposure → Knowledge access → Knowledge integration → Clinical reasoning → Pharmacotherapy decisions → Learning outcomes → Confidence/usability/engagement → Pharmaceutical-care preparedness. Moderators: year, academic performance, digital literacy, prior AI experience, usage frequency, clinical exposure.

---

# DELIVERABLE H — KEPhSA ABSTRACT (see accompanying Word document: _kephsa innovation.docx_)

# DELIVERABLE I — PRESENTATION MATERIAL (Poster/Oral Structure)

**Slide 1 — Title:** Development and Evaluation of Clinova: A Curriculum-Aligned Digital Ecosystem for Pharmacy Education, Clinical Reasoning and Pharmaceutical Care in Kenya.
**Slide 2 — Background:** Fragmentation of pharmacy knowledge; limited local digital resources; AI promise + risk.
**Slide 3 — Innovation:** Integrated curriculum + knowledge graph + RAG-grounded AI + clinical reasoning, Kenya-contextualized.
**Slide 4 — System (audited):** 24 features; KDI monographs; 20+ specialty cases; 27 PPB manufacturers; multi-provider AI gateway.
**Slide 5 — Gap:** No Kenyan evaluation of integrated AI pharmacy ecosystem; reasoning + grounding unvalidated.
**Slide 6 — Question:** Does Clinova improve clinical reasoning/pharmacotherapy decisions vs. conventional resources, and how accurately does its AI ground evidence?
**Slide 7 — Methods:** Multi-phase mixed-methods (AI validation → RCT/pre-post → usability → qualitative).
**Slide 8 — Outcomes:** Reasoning, decisions, knowledge, usability, trust, AI accuracy/grounding.
**Slide 9 — KEPhSA alignment:** Student-led, mentorship, conference, publication, innovation incubation.
**Slide 10 — Expected contribution & call for collaboration.**

---

# COMPLETION CHECKLIST (per Protocol §47)

- [x] Clinova audited
- [x] Innovation identified
- [x] Literature reviewed
- [x] Gap established
- [x] Research question justified
- [x] Method selected
- [x] Outcomes defined
- [x] Evaluation instruments defined
- [x] Analysis plan defined
- [x] Ethical requirements identified
- [x] Protocol finalized (structure)
- [x] KEPhSA-ready research package produced

**Note:** No results are fabricated. This is a research-ready protocol; outcomes are to be measured, not assumed. A positive result is not required — credible evidence about _whether, how, and under what conditions_ Clinova adds value is the success criterion.
