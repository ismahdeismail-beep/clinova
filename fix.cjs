const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const regex = /prompt = \`You are an expert Pharmacy and Clinical Education Examiner\.Generate a high-yield Multiple Choice Question \(MCQ\) for oral preparation in the category "\$\{category\}"\.Difficulty level: \$\{difficulty\}\. \$\{contextStr\}Ensure options are plausible distractors and correct answer is evidence-based\.\`;\$\{specificItem \? \`Focus on this specific topic: \$\{specificItem\}\` : ""\}\$\{history && history\.length > 0 \? \`Avoid repeating these recently asked questions: \$\{JSON\.stringify\(history\)\}\` : ""\}Generate a realistic, clinically accurate question with exactly 4 options\. One option must be correct\.Provide an in-depth explanation detailing why the correct answer is right and why the other options are incorrect\.\`;/g;

const replacement = \`prompt = \\\`You are an expert Pharmacy and Clinical Education Examiner.
Generate a high-yield Multiple Choice Question (MCQ) for oral preparation in the category "\${category}".
Difficulty level: \${difficulty}. \${contextStr}
Ensure options are plausible distractors and correct answer is evidence-based.
\${specificItem ? \\\`Focus on this specific topic: \${specificItem}\\\` : ""}
\${history && history.length > 0 ? \\\`Avoid repeating these recently asked questions: \${JSON.stringify(history)}\\\` : ""}
Generate a realistic, clinically accurate question with exactly 4 options. One option must be correct.
Provide an in-depth explanation detailing why the correct answer is right and why the other options are incorrect.\\\`;\`;

content = content.replace(regex, replacement);
fs.writeFileSync('server.ts', content);
