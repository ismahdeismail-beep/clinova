const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const regex = /app\.post\('\/api\/gemini\/oral-practice\/generate'[\s\S]*?const parsed = safeJsonParse\(response\.text, \{\}\);\s*res\.json\(parsed\);\s*\} catch \(error: any\) {/g;

const replacement = \`app.post('/api/gemini/oral-practice/generate', async (req, res) => {
  try {
    const { mode, category, difficulty, specificItem, history, kbContext } = req.body;
    
    let prompt = "";
    let responseSchema: any = {};
    const contextStr = kbContext ? '\\n\\nUse this validated clinical knowledge to build the question:\\n' + kbContext : '';
    
    if (mode === 'mcq') {
      prompt = \\\`You are an expert Pharmacy and Clinical Education Examiner.
Generate a high-yield Multiple Choice Question (MCQ) for oral preparation in the category "\${category}".
Difficulty level: \${difficulty}. \${contextStr}
Ensure options are plausible distractors and correct answer is evidence-based.
\${specificItem ? '\\nFocus on this specific topic: ' + specificItem : ""}
\${history && history.length > 0 ? '\\nAvoid repeating these recently asked questions: ' + JSON.stringify(history) : ""}
Generate a realistic, clinically accurate question with exactly 4 options. One option must be correct.
Provide an in-depth explanation detailing why the correct answer is right and why the other options are incorrect.\\\`;
      responseSchema = {
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
      };
    } else if (mode === 'viva') {
      prompt = \\\`You are an elite Clinical Examiner conducting an oral Viva examination in "\${category}".
Difficulty level: \${difficulty}. \${contextStr}
\${specificItem ? '\\nFocus strictly on this topic/case: ' + specificItem : ""}
\${history && history.length > 0 ? '\\nAvoid repeating these recently asked questions: ' + JSON.stringify(history) : ""}
Generate a challenging, open-ended clinical question that tests critical thinking, diagnostic reasoning, or pharmacotherapy planning.
Provide prompt guidance/expected answer points that the examiner should look for.\\\`;
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          promptGuidance: { type: Type.STRING },
          patientScenario: { type: Type.STRING }
        },
        required: ['question', 'promptGuidance']
      };
    } else {
      // Default fallback
      prompt = \\\`Generate a practice question for \${category} at \${difficulty} difficulty.\\\`;
    }

    const response = await generateContentWithFallback({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        systemInstruction: "You are Clinova's Oral Examination Simulator. You generate accurate, highly relevant, and challenging questions for healthcare students preparing for OSCEs, Vivas, and Ward Rounds."
      }
    });
    
    const parsed = safeJsonParse(response.text, {});
    res.json(parsed);
  } catch (error: any) {\`;

content = content.replace(regex, replacement);
fs.writeFileSync('server.ts', content);
