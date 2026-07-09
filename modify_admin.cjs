const fs = require('fs');

let content = fs.readFileSync('src/screens/AdminDashboardScreen.tsx', 'utf8');

const injection = `  const filteredFiles = files.filter(f => 
    (f.originalName && f.originalName.toLowerCase().includes(fileSearch.toLowerCase())) ||
    (f.uploadedByName && f.uploadedByName.toLowerCase().includes(fileSearch.toLowerCase())) ||
    (f.title && f.title.toLowerCase().includes(fileSearch.toLowerCase())) ||
    (f.summary && f.summary.toLowerCase().includes(fileSearch.toLowerCase())) ||
    (f.textContent && f.textContent.toLowerCase().includes(fileSearch.toLowerCase()))
  );`;

content = content.replace(/const filteredFiles = files\.filter\([\s\S]*?f\.uploadedByName\?\.toLowerCase\(\)\.includes\(fileSearch\.toLowerCase\(\)\)\n\s*\);/m, injection);
fs.writeFileSync('src/screens/AdminDashboardScreen.tsx', content);
