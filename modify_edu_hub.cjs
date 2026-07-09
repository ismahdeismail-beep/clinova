const fs = require('fs');

let content = fs.readFileSync('src/screens/EducationHubScreen.tsx', 'utf8');

const helperInjection = `
const buildRichKnowledgeContext = (unitFiles: any[]) => {
  if (!unitFiles || unitFiles.length === 0) return '';
  let ctx = '\\n\\n=== CLINICAL KNOWLEDGE BASE EXPERT RESOURCES ===\\n';
  unitFiles.forEach(f => {
    ctx += \`- \${f.title || f.originalName} (\${f.type || 'Document'})\`;
    if (f.author) ctx += \` by \${f.author}\`;
    ctx += '\\n';
    if (f.aiProcessed && f.textContent) {
       ctx += \`  Content/Excerpts:\\n  \${f.textContent}\\n\`;
    } else if (f.aiProcessed && f.summary) {
       ctx += \`  Summary: \${f.summary}\\n\`;
    }
  });
  return ctx;
};
`;

content = content.replace("const MODULE_YEARS: Record<string, string> = {", helperInjection + "const MODULE_YEARS: Record<string, string> = {");

// Now let's inject it into the API calls
// 1. generate-unit-summary
content = content.replace(
  "      if (unitFiles.length > 0) {\n        context += `\\n--- INDEXED MATERIALS LIST ---\\n${unitFiles.map(f => `- ${f.originalName} (${f.mimeType})`).join('\\n')}\\n`;\n      }",
  "      context += buildRichKnowledgeContext(unitFiles);"
);

// 2. generate-unit-flashcards
content = content.replace(
  "      const notesCombined = `${savedCustomNotes}\\n\\n${savedSummary}`;",
  "      const notesCombined = `${savedCustomNotes}\\n\\n${savedSummary}\\n` + buildRichKnowledgeContext(unitFiles);"
);

// 3. generate-unit-quiz
// Same as flashcards
// Actually the previous replacement might replace both? No, it's specific. 
content = content.replace(
  /const notesCombined = `\$\{savedCustomNotes\}\\n\\n\$\{savedSummary\}`;/g,
  "const notesCombined = `${savedCustomNotes}\\n\\n${savedSummary}\\n` + buildRichKnowledgeContext(unitFiles);"
);

// 4. hub-tutor
content = content.replace(
  "      if (unitFiles.length > 0) {\n        context += `UPLOADED DOCUMENTS LIST:\\n${unitFiles.map(f => f.originalName).join(', ')}`;\n      }",
  "      context += buildRichKnowledgeContext(unitFiles);"
);


fs.writeFileSync('src/screens/EducationHubScreen.tsx', content);
