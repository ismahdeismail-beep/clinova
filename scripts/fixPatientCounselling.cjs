const fs = require('fs');
let content = fs.readFileSync('src/data/drugIndexData.ts', 'utf-8');

// Split into individual drug entries - find all entries that are missing patient_counselling
// Strategy: find all JSON object blocks and check if they have patient_counselling
const lines = content.split('\n');
let fixes = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Look for lines with "clinical_pearls" followed by "created_at" without patient_counselling in between
  // OR look for entries missing patient_counselling before created_at
  
  // Check for pattern: "created_at" appears right after "clinical_pearls" array closes or after other fields
  // without patient_counselling in between
  if (line.includes('"created_at": ""') || line.includes('"created_at":""')) {
    // Look backwards to check if patient_counselling exists in this entry
    let hasPatientCounselling = false;
    let entryStart = -1;
    
    for (let j = i - 1; j >= Math.max(0, i - 60); j--) {
      if (lines[j].includes('"clinical_pearls"') || lines[j].includes('"clinical_pearls":')) {
        entryStart = j;
      }
      if (lines[j].includes('"patient_counselling"') || lines[j].includes('"patient_counselling":')) {
        hasPatientCounselling = true;
        break;
      }
      // Stop if we hit another entry boundary
      if (j < i - 1 && (lines[j].trim() === '},' || lines[j].trim() === '},')) {
        break;
      }
    }
    
    if (!hasPatientCounselling && entryStart >= 0) {
      // Find the right place to insert - after monitoring or after interactions
      let insertAfterLine = -1;
      for (let j = i - 1; j >= entryStart; j--) {
        if (lines[j].includes('"monitoring"') || lines[j].includes('"monitoring":')) {
          insertAfterLine = j;
          break;
        }
        if (lines[j].includes('"interactions"') && !lines[j-1].includes('"monitoring"')) {
          // Check if monitoring is on the same line or next lines
          insertAfterLine = j;
        }
      }
      
      // Simpler approach: insert patient_counselling before created_at
      // Get the indentation from the created_at line
      const indent = lines[i].match(/^(\s*)/)[1];
      
      // Find a field value to use - extract drug name for context
      let drugName = 'Unknown';
      for (let j = entryStart; j < i; j++) {
        const nameMatch = lines[j].match(/"name"\s*:\s*"([^"]+)"/);
        if (nameMatch) {
          drugName = nameMatch[1];
          break;
        }
      }
      
      // Insert patient_counselling line before created_at
      lines.splice(i, 0, `${indent}"patient_counselling": "Consult healthcare provider for ${drugName}. Complete full course as prescribed. Report any adverse effects.",`);
      fixes++;
      i++; // Skip the inserted line
    }
  }
}

if (fixes > 0) {
  fs.writeFileSync('src/data/drugIndexData.ts', lines.join('\n'));
  console.log(`Fixed ${fixes} entries missing patient_counselling`);
} else {
  console.log('No entries needed fixing');
}
