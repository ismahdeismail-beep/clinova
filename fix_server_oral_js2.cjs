const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const s = "evidence-based.\`;${specificItem";
const r = "evidence-based.\\n${specificItem";
content = content.replace(s, r);

const s2 = "}} : \"\"}Generate";
const r2 = "}} : \"\"}\\nGenerate";
content = content.replace(s2, r2);

const s3 = "correct.Provide";
const r3 = "correct.\\nProvide";
content = content.replace(s3, r3);

fs.writeFileSync('server.ts', content);
