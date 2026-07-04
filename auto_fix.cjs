const fs = require('fs');
const { execSync } = require('child_process');

let code = fs.readFileSync('server.ts', 'utf8').split('\n');

for (let i = 0; i < 5; i++) {
  try {
    execSync('npx tsc server.ts --noEmit', { encoding: 'utf8' });
    console.log("No more errors!");
    break;
  } catch (err) {
    const output = err.stdout;
    const lines = output.split('\n');
    let fixed = false;
    // we only look at the first error
    const firstErr = lines.find(l => l.includes('error TS1005'));
    if (firstErr) {
      const match = firstErr.match(/server\.ts\((\d+),/);
      if (match) {
        const lineNum = parseInt(match[1]) - 1;
        // insert `});` before this line
        console.log(`Fixing near line ${lineNum + 1}`);
        if (code[lineNum].includes('const result') || code[lineNum].includes('const cases') || code[lineNum].includes('res.json')) {
            code[lineNum - 1] = code[lineNum - 1].replace('},', '});').replace('}', '});');
        } else if (code[lineNum].includes('catch (error')) {
            // express route closing
            code.splice(lineNum + 2, 0, '});');
        } else {
            // generic
            code.splice(lineNum, 0, '    });');
        }
        fixed = true;
      }
    }
    
    if (fixed) {
      fs.writeFileSync('server.ts', code.join('\n'));
    } else {
      break;
    }
  }
}
