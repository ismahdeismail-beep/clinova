const fs = require('fs');
let c = fs.readFileSync('server.ts', 'utf8');

const s = '      prompt = `You are an expert Pharmacy and Clinical Education Examiner.Generate a high-yield Multiple Choice Question (MCQ) for oral preparation in the category "${category}".Difficulty level: ${difficulty}. ${contextStr}Ensure options are plausible distractors and correct answer is evidence-based.`;${specificItem ? `Focus on this specific topic: ${specificItem}` : ""}${history && history.length > 0 ? `Avoid repeating these recently asked questions: ${JSON.stringify(history)}` : ""}Generate a realistic, clinically accurate question with exactly 4 options. One option must be correct.Provide an in-depth explanation detailing why the correct answer is right and why the other options are incorrect.`;';

const r = `      prompt = \`You are an expert Pharmacy and Clinical Education Examiner.
Generate a high-yield Multiple Choice Question (MCQ) for oral preparation in the category "\${category}".
Difficulty level: \${difficulty}. \${contextStr}
Ensure options are plausible distractors and correct answer is evidence-based.
\${specificItem ? '\\nFocus on this specific topic: ' + specificItem : ""}
\${history && history.length > 0 ? '\\nAvoid repeating these recently asked questions: ' + JSON.stringify(history) : ""}
Generate a realistic, clinically accurate question with exactly 4 options. One option must be correct.
Provide an in-depth explanation detailing why the correct answer is right and why the other options are incorrect.\`;`;

c = c.replace(s, r);
fs.writeFileSync('server.ts', c);
