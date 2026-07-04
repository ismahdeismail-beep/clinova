import { GoogleGenAI } from '@google/genai';
import fetch from 'node-fetch'; // We can use global fetch if available in Node 18+, but let's assume global fetch is available

export interface AIProviderStatus {
  name: string;
  isHealthy: boolean;
  requestCount: number;
  averageLatencyMs: number;
  errorRate: number;
  uptime: number; // percentage
  successCount: number;
  errorCount: number;
  totalLatency: number;
}

export const providerStatuses: Record<string, AIProviderStatus> = {
  'Google AI': createInitialStatus('Google AI'),
  'Cerebras': createInitialStatus('Cerebras'),
  'OpenRouter': createInitialStatus('OpenRouter'),
  'Mistral': createInitialStatus('Mistral'),
  'Cohere': createInitialStatus('Cohere'),
  'Jina': createInitialStatus('Jina'),
  'NIH': createInitialStatus('NIH')
};

function createInitialStatus(name: string): AIProviderStatus {
  return {
    name,
    isHealthy: true,
    requestCount: 0,
    averageLatencyMs: 0,
    errorRate: 0,
    uptime: 100,
    successCount: 0,
    errorCount: 0,
    totalLatency: 0
  };
}

function recordProviderSuccess(providerName: string, latency: number) {
  const status = providerStatuses[providerName];
  if (!status) return;
  status.requestCount++;
  status.successCount++;
  status.totalLatency += latency;
  status.averageLatencyMs = status.totalLatency / status.successCount;
  status.errorRate = (status.errorCount / status.requestCount) * 100;
  status.uptime = ((status.successCount) / status.requestCount) * 100;
  status.isHealthy = true;
}

function recordProviderError(providerName: string) {
  const status = providerStatuses[providerName];
  if (!status) return;
  status.requestCount++;
  status.errorCount++;
  status.errorRate = (status.errorCount / status.requestCount) * 100;
  status.uptime = ((status.successCount) / status.requestCount) * 100;
  if (status.errorRate > 50 && status.requestCount > 5) {
    status.isHealthy = false;
  }
}

export function getProviderStatusList() {
  return Object.values(providerStatuses);
}

// Map the Google GenAI request to an OpenAI-compatible request where needed
function mapToOpenAIFormat(request: any) {
  const messages: any[] = [];
  
  if (request.config?.systemInstruction) {
    messages.push({
      role: 'system',
      content: typeof request.config.systemInstruction === 'string' ? request.config.systemInstruction : JSON.stringify(request.config.systemInstruction)
    });
  }

  if (typeof request.contents === 'string') {
    messages.push({ role: 'user', content: request.contents });
  } else if (Array.isArray(request.contents)) {
    for (const item of request.contents) {
      if (item.role && item.parts) {
        // complex structure
        const contentStr = item.parts.map((p: any) => p.text || '').join('\n');
        messages.push({ role: item.role === 'model' ? 'assistant' : 'user', content: contentStr });
      } else if (typeof item === 'string') {
        messages.push({ role: 'user', content: item });
      }
    }
  } else {
    // Catch-all
    messages.push({ role: 'user', content: JSON.stringify(request.contents) });
  }

  const payload: any = {
    messages,
  };

  if (request.config?.responseMimeType === 'application/json' || request.config?.responseSchema) {
    payload.response_format = { type: 'json_object' };
  }
  
  return payload;
}

let globalProviderOverride: string | null = null;

export function setGlobalProviderOverride(provider: string | null) {
  globalProviderOverride = provider;
  console.log(`[AI Router] Global provider override set to: ${provider}`);
}

export function getGlobalProviderOverride() {
  return globalProviderOverride;
}

// Fallback logic
export async function generateContentWithFallback(request: any, providerOverride?: string) {
  const activeOverride = providerOverride || globalProviderOverride;
  const providers = ['Google AI', 'Cerebras', 'OpenRouter', 'Mistral', 'Cohere', 'Jina'];
  
  if (activeOverride) {
    try {
      console.log(`[AI Router] FORCING override provider: ${activeOverride}`);
      const startTime = Date.now();
      const response = await executeProvider(activeOverride, request);
      recordProviderSuccess(activeOverride, Date.now() - startTime);
      return response;
    } catch (err: any) {
      console.warn(`[AI Router] Forced provider override ${activeOverride} failed. Falling back to multi-provider chain. Error: ${err.message}`);
      // If forced provider fails, we fall back to other providers so the app doesn't break
    }
  }

  let lastError = null;

  for (const provider of providers) {
    if (!providerStatuses[provider].isHealthy) {
       console.warn(`[AI Router] Bypassing ${provider} (unhealthy)`);
       continue;
    }

    try {
      console.log(`[AI Router] Attempting with ${provider}...`);
      const startTime = Date.now();
      const response = await executeProvider(provider, request);
      recordProviderSuccess(provider, Date.now() - startTime);
      return response;
    } catch (err: any) {
      console.error(`[AI Router] ${provider} failed: ${err.message}`);
      recordProviderError(provider);
      lastError = err;
      // Continue to next provider
    }
  }
  
  throw new Error(`All available AI providers failed. Last error: ${lastError?.message}`);
}

async function executeProvider(provider: string, request: any) {
  if (provider === 'Google AI') {
    return executeGoogleAI(request);
  } else if (provider === 'OpenRouter') {
    return executeOpenRouter(request);
  } else if (provider === 'Cerebras') {
    return executeCerebras(request);
  } else if (provider === 'Mistral') {
    return executeMistral(request);
  } else if (provider === 'Cohere') {
    return executeCohere(request);
  } else if (provider === 'Jina') {
    return executeJina(request);
  } else if (provider === 'NIH') {
    return executeNIH(request);
  }
  throw new Error(`Unknown provider: ${provider}`);
}

// Provider Implementations
let aiClients: GoogleGenAI[] = [];
let currentClientIndex = 0;

function getGoogleClient() {
  if (aiClients.length === 0) {
    const keys = new Set<string>();
    const mainKeyEnv = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (mainKeyEnv) mainKeyEnv.split(',').forEach(k => k.trim() && keys.add(k.trim()));
    
    for (let i = 1; i <= 10; i++) {
      const fallbackKey = process.env[`GEMINI_API_KEY_${i}`];
      if (fallbackKey) fallbackKey.split(',').forEach(k => k.trim() && keys.add(k.trim()));
    }

    if (keys.size > 0) {
      aiClients = Array.from(keys).map(apiKey => new GoogleGenAI({ apiKey, httpOptions: { headers: { 'User-Agent': 'aistudio-build' } } }));
    }
  }

  if (aiClients.length === 0) throw new Error("No Google AI API keys configured");
  
  // Basic load balancing
  const client = aiClients[currentClientIndex];
  currentClientIndex = (currentClientIndex + 1) % aiClients.length;
  return client;
}

async function executeGoogleAI(request: any) {
  const maxAttempts = aiClients.length || 1;
  let lastErr = null;
  
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const client = getGoogleClient();
      const response = await client.models.generateContent(request);
      return response;
    } catch (err: any) {
      lastErr = err;
      const isQuota = err.message?.includes('429') || err.message?.includes('quota') || err.message?.includes('Too Many Requests');
      if (isQuota && aiClients.length > 1) {
        console.warn(`[Google AI] Quota exceeded on current key, trying next...`);
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}

async function executeOpenRouter(request: any) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("No OpenRouter API key configured");

  const payload = mapToOpenAIFormat(request);
  payload.model = "google/gemini-2.5-flash"; // Default fast model for OpenRouter

  // Some payloads contain inlineData which openrouter doesn't like unless formatted for vision
  // Simple mitigation: if there's inlineData, we assume it's for Google API only for now
  if (request.contents && Array.isArray(request.contents) && request.contents[0]?.parts?.some((p: any) => p.inlineData)) {
     throw new Error("File extraction not supported natively by this fallback provider yet");
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://clinova.ai", 
      "X-Title": "Clinova OS"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error(`OpenRouter Error: ${res.status}`);
  const data = await res.json() as any;
  
  return {
    text: () => data.choices[0].message.content,
  };
}

async function executeCerebras(request: any) {
  const apiKey = process.env.CEREBRAS_API_KEY;
  if (!apiKey) throw new Error("No Cerebras API key configured");

  const payload = mapToOpenAIFormat(request);
  payload.model = "llama3.1-8b"; // Cerebras model

  if (request.contents && Array.isArray(request.contents) && request.contents[0]?.parts?.some((p: any) => p.inlineData)) {
    throw new Error("File extraction not supported by Cerebras");
  }

  const res = await fetch("https://api.cerebras.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error(`Cerebras Error: ${res.status}`);
  const data = await res.json() as any;
  
  return {
    text: () => data.choices[0].message.content,
  };
}

async function executeMistral(request: any) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) throw new Error("No Mistral API key configured");

  const payload = mapToOpenAIFormat(request);
  payload.model = "mistral-small-latest"; 
  
  if (request.contents && Array.isArray(request.contents) && request.contents[0]?.parts?.some((p: any) => p.inlineData)) {
    throw new Error("File extraction not supported by Mistral");
  }

  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error(`Mistral Error: ${res.status}`);
  const data = await res.json() as any;
  
  return {
    text: () => data.choices[0].message.content,
  };
}

async function executeCohere(request: any) {
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) throw new Error("No Cohere API key configured");

  const payload = mapToOpenAIFormat(request);
  
  if (request.contents && Array.isArray(request.contents) && request.contents[0]?.parts?.some((p: any) => p.inlineData)) {
    throw new Error("File extraction not supported by Cohere");
  }

  const res = await fetch("https://api.cohere.com/v1/chat", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
       message: payload.messages[payload.messages.length - 1]?.content || "",
       preamble: payload.messages.find((m: any) => m.role === 'system')?.content || "",
    })
  });

  if (!res.ok) throw new Error(`Cohere Error: ${res.status}`);
  const data = await res.json() as any;
  
  return {
    text: () => data.text,
  };
}

async function executeJina(request: any) {
  throw new Error("Jina AI chat not supported for this prompt, usually used for embeddings");
}

async function executeNIH(request: any) {
  throw new Error("NIH provider reserved for PubMed specific queries");
}
