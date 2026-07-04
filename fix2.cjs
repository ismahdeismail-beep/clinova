const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Replace ANY `  } catch (error: any) {` with `    });\n  } catch (error: any) {` if it's currently missing it.
code = code.replace(/([^;}\n\s])\n\s*} catch \(error: any\) {/g, '$1\n    });\n  } catch (error: any) {');
code = code.replace(/}\n\s*} catch \(error: any\) {/g, '}\n    });\n  } catch (error: any) {');

fs.writeFileSync('server.ts', code);
