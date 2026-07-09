const fs = require('fs');
let content = fs.readFileSync('src/screens/OralPracticeScreen.tsx', 'utf8');

const functionInjection = `    setIsEvaluating(true);
    try {
      
      // KNOWLEDGE BASE INTEGRATION
      const kbFiles = files.filter(f => (f.category === 'knowledge' || f.category === 'knowledge_base') && f.aiProcessed);
      let relevantKbContext = '';
      const topic = specificItem || selectedCategory;
      const keywords = topic.toLowerCase().split(/\\s+/).filter(w => w.length > 3);
      if (keywords.length > 0 && kbFiles.length > 0) {
        const matchedFiles = kbFiles.filter(f => {
          const searchText = \`\${f.title} \${f.originalName} \${f.summary || ''} \${f.classification?.keywords?.join(' ') || ''}\`.toLowerCase();
          return keywords.some(k => searchText.includes(k));
        }).slice(0, 3);
        
        if (matchedFiles.length > 0) {
          relevantKbContext = "\\n\\n=== KNOWLEDGE ENGINE RETRIEVED RESOURCES ===\\n";
          matchedFiles.forEach(f => {
            relevantKbContext += \`- \${f.title || f.originalName}\\n\`;
            if (f.summary) relevantKbContext += \`  Summary: \${f.summary}\\n\`;
            if (f.textContent) relevantKbContext += \`  Content: \${f.textContent.substring(0, 1500)}\\n\`;
          });
        }
      }

      const response = await fetch('/api/gemini/oral-practice/evaluate', {`;

content = content.replace(/    setIsEvaluating\(true\);\s*try {\s*const response = await fetch\('\/api\/gemini\/oral-practice\/evaluate', {/m, functionInjection);

content = content.replace(
  '          expectedAnswer: currentMcqAnswer',
  '          expectedAnswer: currentMcqAnswer,\n          kbContext: relevantKbContext || undefined'
);

fs.writeFileSync('src/screens/OralPracticeScreen.tsx', content);
