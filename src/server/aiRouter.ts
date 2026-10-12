import { GoogleGenAI } from '@google/genai'
import { sanitizeClinicalText } from '../lib/clinicalTextSanitize.js'

export interface AIProviderStatus {
  id: string
  name: string
  isHealthy: boolean
  requestCount: number
  successCount: number
  errorCount: number
  totalLatency: number
  averageLatencyMs: number
  errorRate: number
  uptime: number // percentage
  priority: number // 1 = highest
  weight: number // for weighted routing (1 to 100)
  costInputPer1M: number // USD
  costOutputPer1M: number // USD
  tokenCountInput: number
  tokenCountOutput: number
  estimatedCost: number // USD
  latencyHistory: number[]
  apiKeyMasked: string
  status: 'active' | 'inactive'
}

export interface GatewayLog {
  id: string
  timestamp: string
  feature: string
  prompt: string
  provider: string
  latencyMs: number
  status: 'success' | 'failed'
  error?: string
  fallbackChain: string[]
  tokensInput: number
  tokensOutput: number
  cost: number
}

// Memory databases for runtime configurations and logs
export const gatewayLogs: GatewayLog[] = []
export let loadBalancingMode:
  'Priority' | 'Weighted' | 'Latency' | 'Cost' | 'Health' | 'RoundRobin' = 'Priority'

export const providerStatuses: Record<string, AIProviderStatus> = {
  'Google Gemini': createInitialStatus(
    'google',
    'Google Gemini',
    1,
    90,
    0.075,
    0.3,
    '••••••••••••',
  ),
  OpenRouter: createInitialStatus('openrouter', 'OpenRouter', 2, 80, 0.5, 1.5, '••••••••••••'),
  Cerebras: createInitialStatus('cerebras', 'Cerebras', 3, 50, 0.1, 0.4, '••••••••••••'),
  Cohere: createInitialStatus('cohere', 'Cohere', 4, 40, 1.0, 2.0, '••••••••••••'),
  Mistral: createInitialStatus('mistral', 'Mistral', 5, 50, 0.2, 0.6, '••••••••••••'),
  OpenAI: createInitialStatus('openai', 'OpenAI', 6, 70, 2.5, 10.0, '••••••••••••'),
  'Anthropic Claude': createInitialStatus(
    'anthropic',
    'Anthropic Claude',
    7,
    60,
    3.0,
    15.0,
    '••••••••••••',
  ),
  xAI: createInitialStatus('xai', 'xAI', 8, 40, 2.0, 10.0, '••••••••••••'),
  DeepSeek: createInitialStatus('deepseek', 'DeepSeek', 9, 85, 0.14, 0.28, '••••••••••••'),
}

// Fallback registry matching old structure for code compatibility
export const providerStatusesCompat: Record<string, any> = providerStatuses

function createInitialStatus(
  id: string,
  name: string,
  priority: number,
  weight: number,
  costInputPer1M: number,
  costOutputPer1M: number,
  apiKeyMasked: string,
): AIProviderStatus {
  return {
    id,
    name,
    isHealthy: true,
    requestCount: 0,
    successCount: 0,
    errorCount: 0,
    totalLatency: 0,
    averageLatencyMs: 0,
    errorRate: 0,
    uptime: 100,
    priority,
    weight,
    costInputPer1M,
    costOutputPer1M,
    tokenCountInput: 0,
    tokenCountOutput: 0,
    estimatedCost: 0,
    latencyHistory: [],
    apiKeyMasked,
    status: 'active',
  }
}

export function getProviderStatusList() {
  return Object.values(providerStatuses)
}

export function updateProviderConfig(
  name: string,
  updates: Partial<Pick<AIProviderStatus, 'priority' | 'weight' | 'status' | 'apiKeyMasked'>>,
) {
  const provider = providerStatuses[name]
  if (provider) {
    if (updates.priority !== undefined) provider.priority = updates.priority
    if (updates.weight !== undefined) provider.weight = updates.weight
    if (updates.status !== undefined) provider.status = updates.status
    if (updates.apiKeyMasked !== undefined) {
      provider.apiKeyMasked = updates.apiKeyMasked
    }
    return true
  }
  return false
}

export function setLoadBalancingMode(mode: typeof loadBalancingMode) {
  loadBalancingMode = mode
  console.log(`[AI Router] Load balancing mode updated to: ${mode}`)
}

export function getLoadBalancingMode() {
  return loadBalancingMode
}

function recordProviderSuccess(
  providerName: string,
  latency: number,
  inputTokens: number,
  outputTokens: number,
) {
  const status = providerStatuses[providerName]
  if (!status) return
  status.requestCount++
  status.successCount++
  status.totalLatency += latency
  status.averageLatencyMs = Math.round(status.totalLatency / status.successCount)
  status.errorRate = Math.round((status.errorCount / status.requestCount) * 100)
  status.uptime = Math.round((status.successCount / status.requestCount) * 100)
  status.isHealthy = true

  // Track tokens and cost
  status.tokenCountInput += inputTokens
  status.tokenCountOutput += outputTokens
  const cost =
    (inputTokens * status.costInputPer1M + outputTokens * status.costOutputPer1M) / 1000000
  status.estimatedCost += cost

  // Track history
  status.latencyHistory.push(latency)
  if (status.latencyHistory.length > 10) {
    status.latencyHistory.shift()
  }
}

function recordProviderError(providerName: string) {
  const status = providerStatuses[providerName]
  if (!status) return
  status.requestCount++
  status.errorCount++
  status.errorRate = Math.round((status.errorCount / status.requestCount) * 100)
  status.uptime = Math.round((status.successCount / status.requestCount) * 100)
  if (status.errorRate > 40 && status.requestCount >= 3) {
    status.isHealthy = false
  }
}

// Convert Gemini API format to OpenAI structure
function mapToOpenAIFormat(request: any) {
  const messages: any[] = []

  if (request.config?.systemInstruction) {
    messages.push({
      role: 'system',
      content:
        typeof request.config.systemInstruction === 'string'
          ? request.config.systemInstruction
          : JSON.stringify(request.config.systemInstruction),
    })
  }

  if (typeof request.contents === 'string') {
    messages.push({ role: 'user', content: request.contents })
  } else if (Array.isArray(request.contents)) {
    for (const item of request.contents) {
      if (item.role && item.parts) {
        const contentStr = item.parts.map((p: any) => p.text || '').join('\n')
        messages.push({ role: item.role === 'model' ? 'assistant' : 'user', content: contentStr })
      } else if (typeof item === 'string') {
        messages.push({ role: 'user', content: item })
      }
    }
  } else {
    messages.push({ role: 'user', content: JSON.stringify(request.contents) })
  }

  const payload: any = { messages }

  if (request.config?.responseMimeType === 'application/json' || request.config?.responseSchema) {
    payload.response_format = { type: 'json_object' }
  }

  return payload
}

let globalProviderOverride: string | null = null

export function setGlobalProviderOverride(provider: string | null) {
  globalProviderOverride = provider
  console.log(`[AI Router] Global provider override set to: ${provider}`)
}

export function getGlobalProviderOverride() {
  return globalProviderOverride
}

// Select providers sorted based on selected load balancing algorithm
function selectProvidersSequence(): string[] {
  const available = Object.keys(providerStatuses).filter(
    (name) => providerStatuses[name].status === 'active' && providerStatuses[name].isHealthy,
  )

  if (available.length === 0) {
    // If all are marked unhealthy, return active ones as fallbacks
    return Object.keys(providerStatuses).filter(
      (name) => providerStatuses[name].status === 'active',
    )
  }

  switch (loadBalancingMode) {
    case 'Priority':
      return [...available].sort(
        (a, b) => providerStatuses[a].priority - providerStatuses[b].priority,
      )

    case 'Weighted':
      // Roulette-wheel sorted selection based on weights (descending)
      return [...available].sort((a, b) => providerStatuses[b].weight - providerStatuses[a].weight)

    case 'Latency':
      return [...available].sort((a, b) => {
        const latA = providerStatuses[a].averageLatencyMs || 100
        const latB = providerStatuses[b].averageLatencyMs || 100
        return latA - latB
      })

    case 'Cost':
      return [...available].sort((a, b) => {
        const costA = providerStatuses[a].costInputPer1M
        const costB = providerStatuses[b].costInputPer1M
        return costA - costB
      })

    case 'Health':
      return [...available].sort((a, b) => providerStatuses[b].uptime - providerStatuses[a].uptime)

    case 'RoundRobin':
    default:
      // Shuffle slightly or sort by requestCount ascending to balance load
      return [...available].sort(
        (a, b) => providerStatuses[a].requestCount - providerStatuses[b].requestCount,
      )
  }
}

// Fallback logic
export async function generateContentWithFallback(
  request: any,
  providerOverride?: string,
  featureName: string = 'General Inquiry',
) {
  // Inject Universal Knowledge Engine Rules
  if (!request.config) {
    request.config = {}
  }

  const hierarchyRules = `\n\n=== CLINOVA AI KNOWLEDGE ENGINE REASONING HIERARCHY ===\nYou must organize and retrieve information using the following structural priority: Learning Area → Unit → Topic → Subtopic → Educational Resource → Clinical Application.\nTreat every educational resource (books, notes, clinical cases, guidelines, drug information, flashcards, quizzes) as part of a single interconnected knowledge graph.\nPrioritize authoritative educational resources (Guidelines, Official Notes) over general knowledge. Connect foundational sciences directly with clinical applications. Explain concepts progressively as structured teaching. Relate topics across disciplines when appropriate.`

  if (request.config.systemInstruction) {
    if (
      typeof request.config.systemInstruction === 'string' &&
      !request.config.systemInstruction.includes('Learning Area → Unit')
    ) {
      request.config.systemInstruction += hierarchyRules
    }
  } else {
    request.config.systemInstruction = hierarchyRules
  }

  const activeOverride = providerOverride || globalProviderOverride
  const executionId = 'gw-' + Math.random().toString(36).substr(2, 9)

  // Extract user message snippet for log display
  let logPrompt = ''
  if (typeof request.contents === 'string') {
    logPrompt = request.contents
  } else if (Array.isArray(request.contents)) {
    const lastItem = request.contents[request.contents.length - 1]
    if (typeof lastItem === 'string') {
      logPrompt = lastItem
    } else if (lastItem?.parts) {
      logPrompt = lastItem.parts.map((p: any) => p.text || '').join(' ')
    }
  }
  if (logPrompt.length > 80) {
    logPrompt = logPrompt.substring(0, 80) + '...'
  }

  if (activeOverride) {
    const startTime = Date.now()
    try {
      console.log(`[AI Gateway] FORCING override provider: ${activeOverride}`)
      const response = await executeProvider(activeOverride, request)
      const duration = Date.now() - startTime

      const inputTok = Math.round(JSON.stringify(request).length / 4)
      const outputTok = Math.round((response.text || '').length / 4)

      recordProviderSuccess(activeOverride, duration, inputTok, outputTok)

      addGatewayLog({
        id: executionId,
        timestamp: new Date().toISOString(),
        feature: featureName,
        prompt: logPrompt,
        provider: activeOverride,
        latencyMs: duration,
        status: 'success',
        fallbackChain: [],
        tokensInput: inputTok,
        tokensOutput: outputTok,
        cost:
          (inputTok * providerStatuses[activeOverride].costInputPer1M +
            outputTok * providerStatuses[activeOverride].costOutputPer1M) /
          1000000,
      })

      return { ...response, text: sanitizeClinicalText(response.text) }
    } catch (err: any) {
      console.warn(
        `[AI Gateway] Forced provider override ${activeOverride} failed. Falling back. Error: ${err.message}`,
      )
      recordProviderError(activeOverride)
    }
  }

  const providersSequence = selectProvidersSequence()
  const attemptedProviders: string[] = []
  let lastError = null

  for (const provider of providersSequence) {
    const startTime = Date.now()
    try {
      console.log(
        `[AI Gateway] Routing request to ${provider} using ${loadBalancingMode} load-balancer...`,
      )
      attemptedProviders.push(provider)

      const response = await executeProvider(provider, request)
      const duration = Date.now() - startTime

      const inputTok = Math.round(JSON.stringify(request).length / 4)
      const outputTok = Math.round((response.text || '').length / 4)

      recordProviderSuccess(provider, duration, inputTok, outputTok)

      addGatewayLog({
        id: executionId,
        timestamp: new Date().toISOString(),
        feature: featureName,
        prompt: logPrompt,
        provider,
        latencyMs: duration,
        status: 'success',
        fallbackChain: attemptedProviders.slice(0, -1),
        tokensInput: inputTok,
        tokensOutput: outputTok,
        cost:
          (inputTok * providerStatuses[provider].costInputPer1M +
            outputTok * providerStatuses[provider].costOutputPer1M) /
          1000000,
      })

      return { ...response, text: sanitizeClinicalText(response.text) }
    } catch (err: any) {
      console.error(`[AI Gateway] ${provider} failed: ${err.message}`)
      recordProviderError(provider)
      lastError = err
      // Continue loop for failover
    }
  }

  const errorMsg = lastError?.message || 'Upstream service timed out'
  console.error(`[AI Engine] All services failed. Last error: ${errorMsg}`)

  addGatewayLog({
    id: executionId,
    timestamp: new Date().toISOString(),
    feature: featureName,
    prompt: logPrompt,
    provider: 'Fallback Cache',
    latencyMs: 150,
    status: 'failed',
    error: errorMsg,
    fallbackChain: attemptedProviders,
    tokensInput: 200,
    tokensOutput: 150,
    cost: 0,
  })

  throw new Error(`AI service unavailable: ${errorMsg}`)
}

function addGatewayLog(log: GatewayLog) {
  gatewayLogs.unshift(log)
  if (gatewayLogs.length > 50) {
    gatewayLogs.pop()
  }
}

// Streaming variant — emits chunks as they arrive to cut perceived latency.
// Primary path is Gemini (generateContentStream); on failure it falls back to
// the non-streaming gateway so callers still receive a complete response.
export async function streamGenerateContent(
  request: any,
  onChunk: (text: string) => void,
  providerOverride?: string,
  featureName: string = 'General Inquiry',
): Promise<string> {
  if (!request.config) request.config = {}

  const hierarchyRules = `\n\n=== CLINOVA AI KNOWLEDGE ENGINE REASONING HIERARCHY ===\nYou must organize and retrieve information using the following structural priority: Learning Area → Unit → Topic → Subtopic → Educational Resource → Clinical Application.\nTreat every educational resource as part of a single interconnected knowledge graph. Prioritize authoritative educational resources over general knowledge.`

  if (request.config.systemInstruction) {
    if (
      typeof request.config.systemInstruction === 'string' &&
      !request.config.systemInstruction.includes('Learning Area → Unit')
    ) {
      request.config.systemInstruction += hierarchyRules
    }
  } else {
    request.config.systemInstruction = hierarchyRules
  }

  const activeOverride = providerOverride || globalProviderOverride

  // Streaming is only wired for Gemini; honor an explicit override if it is Gemini.
  const useGemini = !activeOverride || activeOverride === 'Google Gemini'
  if (useGemini && process.env.GEMINI_API_KEY) {
    try {
      const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
      const result = await client.models.generateContentStream(request)
      let full = ''
      for await (const chunk of result) {
        const t = chunk.text || ''
        if (t) {
          full += t
          onChunk(t)
        }
      }
      console.log(`[AI Gateway] Gemini stream completed: ${full.length} chars`)
      if (full.length === 0) {
        console.warn(
          '[AI Gateway] Gemini returned empty response — possible safety filter or oversized prompt',
        )
      }
      return full
    } catch (err: any) {
      console.warn(
        `[AI Gateway] Gemini stream failed, falling back to buffered call: ${err.message}`,
      )
    }
  }

  // Fallback: buffered generation, emitted as a single chunk.
  const response = await generateContentWithFallback(request, undefined, featureName)
  if (response.text) {
    onChunk(response.text)
    return response.text
  }
  return ''
}

// Embeddings — used by the background ingestion pipeline (Phase 10) and the RAG
// pipeline. Uses Gemini gemini-embedding-2 locked to 768-dim (matches the
// vector(768) contract). Free tier: the batch endpoint (≤100 texts/request)
// keeps the 1000 requests/day per-model quota happy — a full 1072-monograph
// ingest is ~160 requests. Per-minute throttling is handled by retrying on 429
// with the server's retryDelay and by callers pacing batches (see
// ensure-rag --pace-ms). Daily-quota exhaustion (hours-long retryDelay) throws
// immediately instead of hanging.
export const EMBEDDING_MODEL = 'gemini-embedding-2'
const EMBEDDING_DIM = 768

function parseGoogleDelay(body: string): number {
  const h = /([\d.]+)h/.exec(body)
  const m = /([\d.]+)m/.exec(body)
  const s = /([\d.]+)s/.exec(body)
  const secs =
    (h ? parseFloat(h[1]) * 3600 : 0) + (m ? parseFloat(m[1]) * 60 : 0) + (s ? parseFloat(s[1]) : 0)
  return Math.round(secs * 1000)
}

async function embedRequest(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured for embeddings')
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:batchEmbedContents?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: texts.map((t) => ({
          model: `models/${EMBEDDING_MODEL}`,
          content: { parts: [{ text: t }] },
          outputDimensionality: EMBEDDING_DIM,
        })),
      }),
    },
  )
  if (!res.ok) {
    const body = await res.text()
    const err: any = new Error(
      `Embedding request failed (HTTP ${res.status}): ${body.slice(0, 200)}`,
    )
    err.status = res.status
    err.body = body
    err.retryDelayMs = parseGoogleDelay(body)
    throw err
  }
  const json: any = await res.json()
  const embeddings: number[][] = (json.embeddings ?? []).map((e: any) => e.values)
  if (embeddings.length !== texts.length || embeddings.some((v) => !v?.length)) {
    throw new Error(`Embedding provider returned ${embeddings.length}/${texts.length} vectors`)
  }
  return embeddings
}

/** Embed many texts in batches (API cap is 100/request). Retries transient 429/5xx. */
export async function embedTexts(texts: string[], batchSize = 50): Promise<number[][]> {
  const out: number[][] = []
  for (let i = 0; i < texts.length; i += batchSize) {
    const slice = texts.slice(i, i + batchSize)
    let lastErr: any
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        out.push(...(await embedRequest(slice)))
        lastErr = undefined
        break
      } catch (e: any) {
        lastErr = e
        if (e.status !== 429 && !(e.status >= 500 && e.status < 600)) throw e
        // A daily-quota 429 asks for hours — retrying would only hang. Fail fast.
        if (e.status === 429 && e.retryDelayMs > 90_000) throw e
        const wait = e.retryDelayMs > 0 ? e.retryDelayMs : 1000 * 2 ** attempt
        await new Promise((r) => setTimeout(r, Math.min(wait, 90_000)))
      }
    }
    if (lastErr) throw lastErr
  }
  return out
}

export async function embedText(text: string): Promise<number[]> {
  return (await embedTexts([text], 1))[0]
}

/** @deprecated prefer `embedTexts` — kept for existing callers. */
export async function embedTextBatch(texts: string[]): Promise<number[][]> {
  return embedTexts(texts)
}

// Mock-and-Live Execution for Gateway APIs
async function executeProvider(provider: string, request: any): Promise<{ text: string }> {
  // Let's implement live calls for Gemini and OpenRouter if key exists, otherwise elegant medical simulation

  if (provider === 'Google Gemini') {
    const mainKeyEnv = process.env.GEMINI_API_KEY
    if (mainKeyEnv) {
      // Execute live Gemini API call
      const client = new GoogleGenAI({ apiKey: mainKeyEnv })
      const response = await client.models.generateContent(request)
      return { text: response.text || '' }
    }
  }

  if (provider === 'OpenRouter') {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (apiKey) {
      const payload = mapToOpenAIFormat(request)
      payload.model = 'google/gemini-2.0-flash'
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const data = (await res.json()) as any
        return { text: data.choices?.[0]?.message?.content || '' }
      }
    }
  }

  throw new Error(`The requested AI service is not available. Please contact support.`)
}
