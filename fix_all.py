import re

with open("server.ts", "r") as f:
    text = f.read()

# Fix `generateContentWithFallback` calls
text = re.sub(r'(\s+systemInstruction: [^\}]+)\s+\}', r'\1\n      }\n    });', text)

# Fix empty config blocks or other configs
text = re.sub(r'(\s+responseMimeType: [^\}]+)\s+\}', r'\1\n      }\n    });', text)
text = re.sub(r'(\s+responseSchema: [^\}]+)\s+\}', r'\1\n      }\n    });', text)

# Let's fix missing `});` at the end of `app.get` or `app.post` by finding all `app.post(` and `app.get(`
# and ensuring they end with `});`. This is harder with regex.
# Actually, the error lines are very specific: 353, 384, 394, 400, 441, 500, 557, 710, 737, 743, 784, 797, 809.
