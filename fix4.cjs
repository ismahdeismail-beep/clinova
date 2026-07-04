const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// The `generateContentWithFallback({` call is closed with `}` instead of `});` because the `});` was removed.
code = code.replace(/systemInstruction: ([^}]+)\n\s*}/g, 'systemInstruction: $1\n      }\n    });');

fs.writeFileSync('server.ts', code);
