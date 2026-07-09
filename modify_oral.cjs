const fs = require('fs');
let content = fs.readFileSync('src/screens/OralPracticeScreen.tsx', 'utf8');

const importInjection = `import { useFileStore } from '../store/fileStore';`;

content = content.replace('import { useState, useRef, useEffect } from "react";', `import { useState, useRef, useEffect } from "react";\n${importInjection}`);

const hookInjection = `  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const files = useFileStore(state => state.files);`;
content = content.replace('  const [sessions, setSessions] = useState<SessionRecord[]>([]);', hookInjection);

const functionInjection = `    setIsSpeakingQuestion(false);
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

      const response = await fetch('/api/gemini/oral-practice/generate', {`;

content = content.replace(/    setIsSpeakingQuestion\(false\);\s*try {\s*const response = await fetch\('\/api\/gemini\/oral-practice\/generate', {/m, functionInjection);

content = content.replace(
  '          specificItem: (selectedMode === \'drug\' || selectedMode === \'disease\') ? specificItem : undefined,',
  '          specificItem: (selectedMode === \'drug\' || selectedMode === \'disease\') ? specificItem : undefined,\n          kbContext: relevantKbContext || undefined,'
);

fs.writeFileSync('src/screens/OralPracticeScreen.tsx', content);
