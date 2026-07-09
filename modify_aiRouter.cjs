const fs = require('fs');

let content = fs.readFileSync('src/server/aiRouter.ts', 'utf8');

const injection = `
  // Inject Universal Knowledge Engine Rules
  if (!request.config) {
    request.config = {};
  }
  
  const hierarchyRules = \`\\n\\n=== CLINOVA AI KNOWLEDGE ENGINE REASONING HIERARCHY ===\\nYou must organize and retrieve information using the following structural priority: Learning Area -> Unit -> Topic -> Subtopic -> Educational Resource -> Clinical Application.\\nTreat every educational resource (books, notes, clinical cases, guidelines, drug information, flashcards, quizzes) as part of a single interconnected knowledge graph.\\nPrioritize authoritative educational resources (Guidelines, Official Notes) over general knowledge. Connect foundational sciences directly with clinical applications. Explain concepts progressively as structured teaching. Relate topics across disciplines when appropriate.\`;

  if (request.config.systemInstruction) {
     if (typeof request.config.systemInstruction === 'string' && !request.config.systemInstruction.includes('Learning Area -> Unit')) {
        request.config.systemInstruction += hierarchyRules;
     }
  } else {
     request.config.systemInstruction = hierarchyRules;
  }
`;

content = content.replace("export async function generateContentWithFallback(request: any, providerOverride?: string, featureName: string = 'General Inquiry') {", "export async function generateContentWithFallback(request: any, providerOverride?: string, featureName: string = 'General Inquiry') {" + injection);

// Fix the Gemini API model to ensure it uses the Google AI provider model: google/gemini-2.5-pro or gemini-2.5-flash
// The user asks to use Google AI models. We can change 'gemini-3.5-flash' to 'gemini-2.5-flash' everywhere.
// But actually we only need to change it in server.ts and academicEngine.ts. Wait, aiRouter.ts might not have it.

fs.writeFileSync('src/server/aiRouter.ts', content);
