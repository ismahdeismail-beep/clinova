---
name: gemini-api
description: Use when the user asks about using Gemini in an enterprise environment or explicitly mentions Vertex AI, Google Cloud, or Agent Platform. Guides the usage of the Gemini API on Agent Platform with the Google Gen AI SDK. Covers SDK usage (Python, JS/TS, Go, Java, C#), capabilities like multimodal inputs, tools, media generation, caching, batch prediction, and Live API.
compatibility: Requires active Google Cloud credentials and Agent Platform API enabled.
---

IMPORTANT: Agent Platform (full name Gemini Enterprise Agent Platform) was previously named "Vertex AI" and many web resources use the legacy branding.

# Gemini API in Agent Platform

Access Google's most advanced AI models built for enterprise use cases using the Gemini API in Agent Platform.

## Core Directives

- **Unified SDK**: ALWAYS use the Gen AI SDK (`google-genai` for Python, `@google/genai` for JS/TS, `google.golang.org/genai` for Go, `com.google.genai:google-genai` for Java, `Google.GenAI` for C#).
- **Legacy SDKs**: DO NOT use `google-cloud-aiplatform`, `@google-cloud/vertexai`, or `google-generativeai`.

## SDKs

- **Python**: `pip install google-genai`
- **JavaScript/TypeScript**: `npm install @google/genai`
- **Go**: `go get google.golang.org/genai`
- **C#/.NET**: `dotnet add package Google.GenAI`
- **Java**: `com.google.genai:google-genai`

## Authentication & Configuration

Prefer environment variables:
```bash
export GOOGLE_CLOUD_PROJECT='your-project-id'
export GOOGLE_CLOUD_LOCATION='global'
export GOOGLE_GENAI_USE_ENTERPRISE=true
```

## Models

- `gemini-3.1-pro-preview` for complex reasoning, coding, research (1M tokens)
- `gemini-3.5-flash` for fast, balanced performance, multimodal (1M tokens)
- `gemini-3.1-flash-lite` for high-frequency, lightweight tasks (1M tokens)
- `gemini-3-pro-image` (Nano Banana Pro) for high-quality image generation
- `gemini-3.1-flash-image` (Nano Banana 2) for fast image generation

## Quick Start

### TypeScript/JavaScript
```typescript
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ enterprise: { project: "your-project-id", location: "global" } });
const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: "Explain quantum computing"
});
console.log(response.text);
```

### Python
```python
from google import genai

client = genai.Client()
response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents="Explain quantum computing",
)
print(response.text)
```

## API spec & Documentation

- **Agent Platform Documentation**: https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview.md.txt
- **REST API Reference**: https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest.md.txt
