const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const search = `Ensure options are plausible distractors and correct answer is evidence-based.\`;
\${specificItem ? \`Focus on this specific topic: \${specificItem}\` : ""}
\${history && history.length > 0 ? \`Avoid repeating these recently asked questions: \${JSON.stringify(history)}\` : ""}
Generate a realistic, clinically accurate question with exactly 4 options. One option must be correct.
Provide an in-depth explanation detailing why the correct answer is right and why the other options are incorrect.\`;`;

const replace = `Ensure options are plausible distractors and correct answer is evidence-based.
\${specificItem ? \`Focus on this specific topic: \${specificItem}\` : ""}
\${history && history.length > 0 ? \`Avoid repeating these recently asked questions: \${JSON.stringify(history)}\` : ""}
Generate a realistic, clinically accurate question with exactly 4 options. One option must be correct.
Provide an in-depth explanation detailing why the correct answer is right and why the other options are incorrect.\`;`;

content = content.replace(search, replace);
fs.writeFileSync('server.ts', content);
