const fs = require('fs');
let config = fs.readFileSync('vite.config.ts', 'utf8');
config = config.replace("import { VitePWA } from 'vite-plugin-pwa';", '// PWA disabled');
fs.writeFileSync('vite.config.tmp.ts', config);
console.log('Temporary config written');
