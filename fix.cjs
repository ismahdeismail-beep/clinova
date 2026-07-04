const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// The `sed -i '/});/d'` deleted exactly the lines that were just `});` or had `});` anywhere.
// Let's replace the common patterns.

// 1. fetch closing:
code = code.replace(/body: formData as any,\n\s*if \(\!response\.ok\) {/g, 'body: formData as any,\n    });\n    if (!response.ok) {');

// 2. config blocks:
// e.g.
// config: {
//   systemInstruction: systemInstruction,
// },
// });
// replaced by
// config: {
//   systemInstruction: systemInstruction,
// }
// if it's followed by const text or catch, it might need });
code = code.replace(/config: {([\s\S]*?)}\n\s*const text/g, 'config: {$1}\n      });\n      const text');
code = code.replace(/config: {([\s\S]*?)}\n\s*} catch/g, 'config: {$1}\n      });\n  } catch');

// 3. catch block endings for Express routes
// They usually end with `res.status(...).json({ error: ... });\n  }`
// We need to add `});` after that.
code = code.replace(/res\.status\((.*?)\)\.json\((.*?)\);\n\s*}\n/g, 'res.status($1).json($2);\n  }\n});\n');

// 4. Any other missing `});` ?
// Let's look at the output of tsc --noEmit after applying these.
fs.writeFileSync('server.ts', code);
