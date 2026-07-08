const fs = require('fs');

let content = fs.readFileSync('server.ts', 'utf-8');

// The original case-tutor and hub-tutor
const oldCaseTutorStart = content.indexOf('// Clinical Case AI Tutor');
let afterOldTutors = content.indexOf('// Setup Vite Dev Server', oldCaseTutorStart);
if (afterOldTutors === -1) {
  afterOldTutors = content.indexOf('app.listen(PORT', oldCaseTutorStart);
}

// Remove the old tutors
if (oldCaseTutorStart !== -1 && afterOldTutors !== -1) {
  content = content.substring(0, oldCaseTutorStart) + content.substring(afterOldTutors);
} else {
  console.log("Could not find the block to remove.");
}

// Now we need to make sure the newly added endpoints are placed correctly if they aren't already.
// Wait, the fix_tutors.sh script probably just appended them at the end or before app.listen.
// Let's just rewrite the end of the file properly.
