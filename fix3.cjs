const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// The `sed` command was `sed -i '/});/d' server.ts`. This deleted ALL lines containing `});`.
// Which means ANY line that had `});` is gone.
// What are the lines that usually have `});` ?
// 1. End of express routes: `});`
// 2. End of fetch blocks: `});`
// 3. End of GoogleGenAI config blocks: `});`
// 4. End of `app.listen` or `app.get('*'`

// Let's manually restore them by inserting `});` before every `app.post(`, `app.get(`, `app.listen(`, and at the end of the file.
// Wait, not before every `app.post`. A route might end with:
//   } catch (error) {
//     res.status(500).json(...);
//   }
// << missing `});` here
// So we insert `});` after `  }\n` if the next line is `app.post` or `app.get` or `// ...`

code = code.replace(/}\n(app\.(get|post|listen))/g, '}\n});\n$1');
code = code.replace(/}\n(\/\/ )/g, '}\n});\n$1');
code = code.replace(/}\n(export default app)/g, '}\n});\n$1');

// also `app.get('*'` is inside `if (process.env.NODE_ENV !== 'production') { ... } else { ... }`
// Let's just fix it manually.
fs.writeFileSync('server.ts.fixed', code);
