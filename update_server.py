import re

with open("server.ts", "r") as f:
    text = f.read()

# 1. Insert the imports after the multer import
text = text.replace("import multer from 'multer';", "import multer from 'multer';\nimport { generateContentWithFallback, getProviderStatusList } from './src/server/aiRouter.js';")

# 2. Remove the old generateContentWithFallback function and variable declarations
# Find where it starts
start_pattern = r"// Multi-Key Gemini Initialization & Fallback handling"
end_pattern = r"// File Extraction Endpoint using Gemini inlineData"

start_idx = text.find("// Multi-Key Gemini Initialization & Fallback handling")
end_idx = text.find("// File Extraction Endpoint using Gemini inlineData")

if start_idx != -1 and end_idx != -1:
    text = text[:start_idx] + text[end_idx:]
else:
    print("Could not find blocks to remove")

# 3. Add the admin endpoint at the end of the file, but before export default app
text = text.replace("export default app;", "export default app;\n\n// AI Provider Admin Endpoint\napp.get('/api/admin/providers', (req, res) => {\n  res.json(getProviderStatusList());\n});\n")

with open("server.ts", "w") as f:
    f.write(text)

