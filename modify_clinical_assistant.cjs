const fs = require('fs');
let content = fs.readFileSync('src/screens/ClinicalAssistantScreen.tsx', 'utf8');

const importInjection = `import { useFileStore } from '../store/fileStore';
import { useAuth } from '../contexts/AuthContext';`;

content = content.replace('import { useAuth } from \'../contexts/AuthContext\';', importInjection);

const hookInjection = `  const { userData } = useAuth();
  const files = useFileStore(state => state.files);`;
content = content.replace('  const { userData } = useAuth();', hookInjection);

const functionInjection = `          const primaryFile = currentAttachments[0];

          // FIND RELEVANT KNOWLEDGE BASE RESOURCES
          const kbFiles = files.filter(f => (f.category === 'knowledge' || f.category === 'knowledge_base') && f.aiProcessed);
          
          let relevantKbContext = '';
          const keywords = userQuery.toLowerCase().split(/\\s+/).filter(w => w.length > 3);
          if (keywords.length > 0 && kbFiles.length > 0) {
            const matchedFiles = kbFiles.filter(f => {
              const searchText = \`\${f.title} \${f.originalName} \${f.summary || ''} \${f.classification?.keywords?.join(' ') || ''}\`.toLowerCase();
              return keywords.some(k => searchText.includes(k));
            }).slice(0, 3); // Max 3 to fit context limit
            
            if (matchedFiles.length > 0) {
              relevantKbContext = "\\n\\n=== KNOWLEDGE ENGINE RETRIEVED RESOURCES ===\\n";
              matchedFiles.forEach(f => {
                relevantKbContext += \`- \${f.title || f.originalName}\\n\`;
                if (f.summary) relevantKbContext += \`  Summary: \${f.summary}\\n\`;
                if (f.textContent) relevantKbContext += \`  Content: \${f.textContent.substring(0, 1500)}\\n\`;
              });
            }
          }`;

content = content.replace('          const primaryFile = currentAttachments[0];', functionInjection);

content = content.replace('              userMessage: userQuery,', '              userMessage: relevantKbContext ? userQuery + "\\n" + relevantKbContext : userQuery,');

fs.writeFileSync('src/screens/ClinicalAssistantScreen.tsx', content);
