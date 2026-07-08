const fs = require('fs');

let content = fs.readFileSync('server.ts', 'utf-8');

// 1. Remove module-tutor
const mtStart = content.indexOf('// Context-Aware Module AI Tutor');
if (mtStart !== -1) {
  let mtEnd = content.indexOf('// Secure Cloudinary Destroy API', mtStart);
  if (mtEnd !== -1) {
    content = content.substring(0, mtStart) + content.substring(mtEnd);
  }
}

// 2. Remove case-tutor
const ctStart = content.indexOf('// Clinical Case AI Tutor');
if (ctStart !== -1) {
  let ctEnd = content.indexOf('// Education Hub AI Tutor', ctStart);
  if (ctEnd === -1) {
    ctEnd = content.indexOf('app.listen(PORT', ctStart);
  }
  if (ctEnd !== -1) {
    content = content.substring(0, ctStart) + content.substring(ctEnd);
  }
}

// 3. Remove hub-tutor
const htStart = content.indexOf('// Education Hub AI Tutor');
if (htStart !== -1) {
  let htEnd = content.indexOf('app.listen(PORT', htStart);
  if (htEnd !== -1) {
    content = content.substring(0, htStart) + content.substring(htEnd);
  }
}

// 4. Inject the unified academic engine implementations just before app.listen
const insertionPoint = content.indexOf('app.listen(PORT');
if (insertionPoint !== -1) {
  const codeToInject = `
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
    
    let baseContext = \`MODULE TUTOR SESSION:
Discipline: \${disc}
Unit: \${moduleTitle}
Level: \${level}
Task:
Search ONLY within this unit's indexed knowledge base (the custom resources provided).
Generate a precise, highly accurate answer.
Show the references used at the bottom.
Gently pivot unrelated questions back to the study material.\`;

    if (customResources && customResources.length > 0) {
      const formattedResources = customResources.map((r) => 
        \`- SOURCE (\${r.sourceName || 'General'}): \${r.notes}\${r.url ? \` (Link: \${r.url})\` : ''}\`
      ).join('\\n');
      baseContext += \`\\n\\nCRITICAL GROUNDING REFERENCE NOTES FROM INSTRUCTORS (Unit Knowledge Base):\\nUse the following supplemental notes and guidelines to directly answer student questions.\\n\${formattedResources}\`;
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
    const baseContext = \`CASE TUTOR SESSION:
Specialty: \${specialty}
Disease: \${disease}
Case Title: \${caseTitle}
Case Data:
- Demographics: \${caseData?.demographics}
- Chief Complaint: \${caseData?.chiefComplaint}
- History of Present Illness: \${caseData?.hpi}
- Past Medical History: \${caseData?.pmh}
- Medications: \${caseData?.medHx}
- Allergies: \${caseData?.allergies}
- Physical Exam: \${caseData?.pe}
- Vitals: \${caseData?.vitals}
- Labs/Imaging: \${caseData?.labs} \${caseData?.imaging || ''}
- Diagnosis: \${caseData?.diagnosis}
- Plan: \${caseData?.carePlan}

Task:
Guide the student's clinical reasoning. Answer their specific question based on evidence-based guidelines for \${disease}, relating it back to these specific patient parameters.\`;

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
    const baseContext = \`EDUCATION HUB TUTOR:
Unit: \${unitTitle}
Module: \${moduleTitle}
Task:
Answer their question accurately using evidence-based medical and pharmaceutical knowledge.
At the end of your response, include a section with:
- **Confidence Score**: (e.g. 95%)
- **Sources**: (list simulated sources like WHO guidelines, Katzung Pharmacology, etc. depending on context)
- **Suggested Flashcards**: 2-3 flashcard Q&A pairs related to the topic.\`;

    const result = await processAcademicRequest(userMessage, baseContext, chatHistory);
    res.json({ reply: result.reply });
  } catch (error) {
    console.error('Hub Tutor Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

`;
  content = content.substring(0, insertionPoint) + codeToInject + content.substring(insertionPoint);
}

fs.writeFileSync('server.ts', content);
