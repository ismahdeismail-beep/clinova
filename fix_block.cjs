const fs = require('fs');
let c = fs.readFileSync('server.ts', 'utf8');

c = c.replace(/\\nEnsure options are plausible distractors and correct answer is evidence-based\.\\\`;\\n\\\$\\{specificItem \? \\\`Focus on this specific topic: \\\$\\{specificItem\\}\\\` : ""\\}\\n\\\$\\{history && history\.length > 0 \? \\\`Avoid repeating these recently asked questions: \\\$\\{JSON\.stringify\\(history\\)\\}\\\` : ""\\}\\nGenerate a realistic, clinically accurate question with exactly 4 options\. One option must be correct\.\\nProvide an in-depth explanation detailing why the correct answer is right and why the other options are incorrect\.\\\`;/, 
\`\\nEnsure options are plausible distractors and correct answer is evidence-based.
\${specificItem ? '\\\\nFocus on this specific topic: ' + specificItem : ""}
\${history && history.length > 0 ? '\\\\nAvoid repeating these recently asked questions: ' + JSON.stringify(history) : ""}
Generate a realistic, clinically accurate question with exactly 4 options. One option must be correct.
Provide an in-depth explanation detailing why the correct answer is right and why the other options are incorrect.\`;\`);

fs.writeFileSync('server.ts', c);
