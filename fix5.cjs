const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// The `generateContentWithFallback` has been opened but not closed properly.
// The pattern usually is:
//     const response = await generateContentWithFallback({
//        ...
//     },
//     const result = ...
// We need to replace `    },\n    const` with `    });\n    const`
// Or `    }\n    const` with `    });\n    const`

code = code.replace(/    },\n    const /g, '    });\n    const ');
code = code.replace(/    }\n    const /g, '    });\n    const ');
code = code.replace(/      },\n    const /g, '      });\n    const ');
code = code.replace(/      }\n    const /g, '      });\n    const ');

// also replace before `res.json`
code = code.replace(/      },\n    res\.json/g, '      });\n    res.json');
code = code.replace(/      }\n    res\.json/g, '      });\n    res.json');

// And what about `app.get('*'` block at the end?
code = code.replace(/    app\.get\('\*', \(req, res\) => {\n      res\.sendFile\(path\.join\(distPath, 'index\.html'\)\);\n    }\n  }/g, 
`    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }`);

code = code.replace(/  app\.listen\(PORT, '0\.0\.0\.0', \(\) => {\n    console\.log\(`Clinova core backend running on port \$\{PORT\}`\);\n  }/g,
`  app.listen(PORT, '0.0.0.0', () => {
    console.log(\`Clinova core backend running on port \$\{PORT\}\`);
  });`);

fs.writeFileSync('server.ts', code);
