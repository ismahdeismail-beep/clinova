const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const injection = `app.post('/api/gemini/oral-practice/generate', async (req, res) => {
  try {
    const { mode, category, difficulty, specificItem, history, kbContext } = req.body;
    
    let prompt = "";
    let responseSchema: any = {};
    const contextStr = kbContext ? \`\\n\\nUse this validated clinical knowledge to build the question:\\n\${kbContext}\` : '';
    
    if (mode === 'mcq') {
      prompt = \`You are an expert Pharmacy and Clinical Education Examiner.
Generate a high-yield Multiple Choice Question (MCQ) for oral preparation in the category "\${category}".
Difficulty level: \${difficulty}. \${contextStr}
Ensure options are plausible distractors and correct answer is evidence-based.\`;`;

content = content.replace(/app\.post\('\/api\/gemini\/oral-practice\/generate', async \(req, res\) => \{\s*try \{\s*const \{ mode, category, difficulty, specificItem, history \} = req\.body;\s*let prompt = "";\s*let responseSchema: any = \{\};\s*if \(mode === 'mcq'\) \{\s*prompt = `You are an expert Pharmacy and Clinical Education Examiner\.\nGenerate a high-yield Multiple Choice Question \(MCQ\) for oral preparation in the category "\$\{category\}"\.\nDifficulty level: \$\{difficulty\}\./m, injection);


const evalInjection = `app.post('/api/gemini/oral-practice/evaluate', async (req, res) => {
  try {
    const { question, answer, mode, category, expectedAnswer, kbContext } = req.body;
    
    const contextStr = kbContext ? \`\\n\\nUse this validated clinical knowledge to verify the student's answer:\\n\${kbContext}\` : '';
    let prompt = "";
    let responseSchema: any = {};
    
    if (mode === 'mcq') {
      prompt = \`Evaluate the student's MCQ answer.
Question: \${question}
Expected Correct Answer: \${expectedAnswer}
Student's Selected Answer: \${answer} \${contextStr}\`;`;

content = content.replace(/app\.post\('\/api\/gemini\/oral-practice\/evaluate', async \(req, res\) => \{\s*try \{\s*const \{ question, answer, mode, category, expectedAnswer \} = req\.body;\s*let prompt = "";\s*let responseSchema: any = \{\};\s*if \(mode === 'mcq'\) \{\s*prompt = `Evaluate the student's MCQ answer\.\nQuestion: \$\{question\}\nExpected Correct Answer: \$\{expectedAnswer\}\nStudent's Selected Answer: \$\{answer\}`/m, evalInjection);

fs.writeFileSync('server.ts', content);
