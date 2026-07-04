import re

with open("server.ts", "r") as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if "const result =" in line or "const cases =" in line or "const parsed =" in line or "res.json(" in line:
        if i > 0 and "}" in lines[i-1]:
            if not "});" in lines[i-1]:
                lines[i-1] = lines[i-1].rstrip("\n").replace("},", "});").replace("}", "});") + "\n"
    
    if "catch (error: any)" in line:
        if i > 0 and "}" in lines[i-1]:
            if not "});" in lines[i-1] and not "}\n" == lines[i-1]:
                # actually, `} catch` usually follows `  }\n` from `res.status(...).json(...)`
                # wait, if the previous line is `  }`, it needs `});` BEFORE `  }` ? No, `});` is the closing of `app.post`.
                # Wait! The route closes at `});` AFTER `} catch (...) { ... }` !
                pass
new_lines = lines
with open("server.ts", "w") as f:
    f.writelines(new_lines)
