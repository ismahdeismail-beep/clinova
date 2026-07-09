const fs = require('fs');

let content = fs.readFileSync('src/screens/KnowledgeBaseManagerScreen.tsx', 'utf8');

const injection = `    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.textContent && doc.textContent.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doc.summary && doc.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doc.classification?.keywords && doc.classification.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())));`;

content = content.replace(/const matchesSearch =[\s\S]*?doc\.discipline\.toLowerCase\(\)\.includes\(searchTerm\.toLowerCase\(\)\);/m, injection);
fs.writeFileSync('src/screens/KnowledgeBaseManagerScreen.tsx', content);
