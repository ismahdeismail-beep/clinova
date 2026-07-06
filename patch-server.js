const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(
  `        inlineData: {\n          data: file.buffer.toString('base64'),\n          mimeType: file.mimetype\n        }`,
  `        inlineData: {\n          data: file.buffer.toString('base64'),\n          mimeType: file.mimetype.includes('pdf') ? 'application/pdf' : (file.mimetype.includes('image') ? file.mimetype : 'text/plain')\n        }`
);
code = code.replace(
  `        inlineData: {\n          mimeType: fileType,\n          data: cleanBase64\n        }`,
  `        inlineData: {\n          mimeType: fileType.includes('pdf') ? 'application/pdf' : (fileType.includes('image') ? fileType : 'text/plain'),\n          data: cleanBase64\n        }`
);
fs.writeFileSync('server.ts', code);
