const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Use precise replacements for these lines.

code = code.replace(/      },\n    const result = /g, '      });\n    const result = ');
code = code.replace(/      },\n    const cases = /g, '      });\n    const cases = ');
code = code.replace(/      }\n    res\.json\(/g, '      });\n    res.json(');
code = code.replace(/      },\n    res\.json\(/g, '      });\n    res.json(');
code = code.replace(/      },\n  } catch/g, '      });\n  } catch');

// Also for `      },` before `    const data = await response.json();`
code = code.replace(/    if \(\!response\.ok\) {\n      const errorData = await response\.json\(\);\n      throw new Error\(errorData\.error\?\.message \|\| 'Failed to upload to Cloudinary'\);\n    }\n    const data = await response\.json\(\);/g, 
`    });\n    if (!response.ok) {\n      const errorData = await response.json();\n      throw new Error(errorData.error?.message || 'Failed to upload to Cloudinary');\n    }\n    const data = await response.json();`);


fs.writeFileSync('server.ts', code);
