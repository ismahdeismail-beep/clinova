const fs = require('fs');
const path = 'src/data/drugIndexData.ts';
const dataPath = 'scripts/reEnrichData.json';

let content = fs.readFileSync(path, 'utf-8');
const enrichments = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

let changes = 0;

for (const [id, enrich] of Object.entries(enrichments)) {
  // Find the entry by ID
  const idPattern = new RegExp('"id":"' + id + '"');
  if (!idPattern.test(content)) {
    console.log('SKIP: ' + id + ' not found');
    continue;
  }

  // Find entry boundaries: from {"id":"xxx" to the next ,\n    {"id" or ];
  const idIdx = content.indexOf('"id":"' + id + '"');
  
  // Find the start (look back for { or start of line)
  let start = idIdx;
  while (start > 0 && content[start] !== '\n') start--;
  if (content[start] === '\n') start++;
  // Skip leading whitespace
  while (content[start] === ' ' || content[start] === '\t') start++;
  // If starts with { we're good, otherwise find it
  if (content[start] !== '{') {
    // Search backward from idIdx
    for (let i = idIdx; i >= 0; i--) {
      if (content[i] === '{') { start = i; break; }
    }
  }

  // Find the end: look for next entry start or ];
  // Count braces to find matching }
  let depth = 0;
  let end = start;
  for (let i = start; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }

  let entry = content.substring(start, end);
  let changed = false;

  // Replace mechanism_of_action
  if (enrich.mechanism_of_action) {
    const moaRe = /"mechanism_of_action"\s*:\s*"[^"]*"/;
    const newMOA = '"mechanism_of_action":"' + enrich.mechanism_of_action.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    if (moaRe.test(entry)) {
      entry = entry.replace(moaRe, newMOA);
      changed = true;
    }
  }

  // Replace overdose
  if (enrich.overdose) {
    const odRe = /"overdose"\s*:\s*"[^"]*"/;
    const newOD = '"overdose":"' + enrich.overdose.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    if (odRe.test(entry)) {
      entry = entry.replace(odRe, newOD);
      changed = true;
    }
  }

  // Replace clinical_pearls (array)
  if (enrich.clinical_pearls) {
    const pearlsRe = /"clinical_pearls"\s*:\s*\[[^\]]*\]/;
    const pearls = enrich.clinical_pearls.map(function(p) { return '"' + p.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'; });
    const newPearls = '"clinical_pearls":[' + pearls.join(',') + ']';
    if (pearlsRe.test(entry)) {
      entry = entry.replace(pearlsRe, newPearls);
      changed = true;
    }
  }

  // Replace pharmacokinetics
  if (enrich.pharmacokinetics) {
    const pkRe = /"pharmacokinetics"\s*:\s*"[^"]*"/;
    const newPK = '"pharmacokinetics":"' + enrich.pharmacokinetics.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    if (pkRe.test(entry)) {
      entry = entry.replace(pkRe, newPK);
      changed = true;
    }
  }

  // Replace patient_counselling
  if (enrich.patient_counselling) {
    const pcRe = /"patient_counselling"\s*:\s*"[^"]*"/;
    const newPC = '"patient_counselling":"' + enrich.patient_counselling.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    if (pcRe.test(entry)) {
      entry = entry.replace(pcRe, newPC);
      changed = true;
    }
  }

  if (changed) {
    content = content.substring(0, start) + entry + content.substring(end);
    changes++;
    console.log('OK: ' + id);
  } else {
    console.log('NO MATCH: ' + id);
  }
}

fs.writeFileSync(path, content, 'utf-8');
console.log('\nDone. Re-enriched ' + changes + ' drugs.');
