import re

with open("src/server/aiRouter.ts", "r") as f:
    text = f.read()

text = text.replace("const data = await res.json();", "const data = await res.json() as any;")

with open("src/server/aiRouter.ts", "w") as f:
    f.write(text)

