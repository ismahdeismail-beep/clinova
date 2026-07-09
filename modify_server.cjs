const fs = require('fs');

let content = fs.readFileSync('server.ts', 'utf8');

const injection = `    } else if (type === 'educational_resource') {
      prompt = \`You are Clinova's Educational Knowledge Engine. Analyze the uploaded educational resource (which could be a book chapter, clinical guideline, lecture note, research article, or case study).
Extract comprehensive metadata, classify the content within the medical/pharmacy curriculum, and generate AI-ready summaries.

Return a JSON object containing:
- title: The extracted or inferred title of the document.
- summary: A concise, high-yield summary of the entire document.
- learningObjectives: An array of 3-5 learning objectives covered.
- textContent: A well-formatted, extracted text representation of the document's core content, preserving important clinical guidelines, facts, and structure.
- classification: An object categorizing the resource within the curriculum.
- relationships: Related clinical concepts, diseases, and drugs mentioned.\`;
      
      responseSchema = {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          learningObjectives: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          textContent: { type: Type.STRING, description: "Full extracted readable text content, properly formatted." },
          classification: {
            type: Type.OBJECT,
            properties: {
              learningArea: { type: Type.STRING, description: "e.g., Clinical Pharmacy, Basic Sciences, Clinical Medicine" },
              unit: { type: Type.STRING },
              topic: { type: Type.STRING },
              subtopic: { type: Type.STRING },
              subject: { type: Type.STRING },
              therapeuticArea: { type: Type.STRING },
              clinicalSpecialty: { type: Type.STRING },
              educationalLevel: { type: Type.STRING },
              resourceType: { type: Type.STRING },
              keywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          },
          relationships: {
            type: Type.OBJECT,
            properties: {
              diseases: { type: Type.ARRAY, items: { type: Type.STRING } },
              drugs: { type: Type.ARRAY, items: { type: Type.STRING } },
              clinicalCases: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          suggestions: {
            type: Type.OBJECT,
            properties: {
              flashcards: { type: Type.ARRAY, items: { type: Type.STRING } },
              quizzes: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      };
    } else {`;

content = content.replace("    } else {", injection);
fs.writeFileSync('server.ts', content);
