// Helpers for the WhatsApp Cloud API webhook.
//
// Pure (aside from sendWhatsAppText) and free of express/env-reads at import
// time so they can be unit-tested in isolation. server.ts wires them together.

import crypto from 'node:crypto'

export interface IncomingMessage {
  from: string
  text: string
  id: string
  timestamp?: string
}

export interface WhatsAppSendConfig {
  token: string
  phoneNumberId: string
  version?: string
}

export interface WhatsAppSendResult {
  sent: boolean
  status?: number
  reason?: string
}

/** Extract text messages from a WhatsApp Cloud API webhook payload. */
export function parseWebhookMessages(body: unknown): IncomingMessage[] {
  const out: IncomingMessage[] = []
  const entries = (body as any)?.entry
  if (!Array.isArray(entries)) return out
  for (const entry of entries) {
    const changes = entry?.changes
    if (!Array.isArray(changes)) continue
    for (const change of changes) {
      const messages = change?.value?.messages
      if (!Array.isArray(messages)) continue
      for (const msg of messages) {
        const text = msg?.text?.body
        const from = msg?.from
        if (typeof text === 'string' && text.trim() && typeof from === 'string') {
          out.push({
            from,
            text: text.trim(),
            id: typeof msg?.id === 'string' ? msg.id : '',
            timestamp: typeof msg?.timestamp === 'string' ? msg.timestamp : undefined,
          })
        }
      }
    }
  }
  return out
}

/**
 * Constant-time verification of Meta's X-Hub-Signature-256 HMAC over the raw
 * body. Returns true when no app secret is configured (verification disabled).
 */
export function verifyMetaSignature(
  rawBody: Buffer | string | undefined,
  signatureHeader: string | undefined,
  appSecret: string | undefined,
): boolean {
  if (!appSecret) return true
  if (!rawBody || typeof signatureHeader !== 'string' || !signatureHeader.startsWith('sha256=')) {
    return false
  }
  const expected = 'sha256=' + crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex')
  const a = Buffer.from(signatureHeader)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export interface RateLimiter {
  allow(key: string): boolean
}

/** Fixed-window in-memory limiter (per-phone for the WhatsApp bot). */
export function createRateLimiter(
  max: number,
  windowMs: number,
  now: () => number = Date.now,
): RateLimiter {
  const buckets = new Map<string, number[]>()
  return {
    allow(key: string) {
      const t = now()
      const hits = (buckets.get(key) ?? []).filter((x) => t - x < windowMs)
      if (hits.length >= max) {
        buckets.set(key, hits)
        return false
      }
      hits.push(t)
      buckets.set(key, hits)
      return true
    },
  }
}

export interface Dedupe {
  /** true if this id was already seen (Meta redelivers on non-2xx / timeouts). */
  isDuplicate(id: string): boolean
}

/** Bounded FIFO of recently seen message ids. */
export function createDedupe(limit = 500): Dedupe {
  const set = new Set<string>()
  return {
    isDuplicate(id: string) {
      if (!id) return false
      if (set.has(id)) return true
      set.add(id)
      if (set.size > limit) {
        const oldest = set.values().next().value
        if (oldest !== undefined) set.delete(oldest)
      }
      return false
    },
  }
}

/**
 * Meta webhook (GET) subscription handshake: echo `hub.challenge` only when
 * `hub.mode=subscribe` and the token matches the configured verify token.
 */
export function whatsappVerifyChallenge(
  mode: unknown,
  token: unknown,
  challenge: unknown,
  expected: string,
): string | null {
  if (mode === 'subscribe' && expected && token === expected) return String(challenge ?? '')
  return null
}

/** Send a plain-text WhatsApp message via the Graph API. */
export async function sendWhatsAppText(
  cfg: WhatsAppSendConfig,
  to: string,
  text: string,
): Promise<WhatsAppSendResult> {
  if (!cfg.token || !cfg.phoneNumberId) return { sent: false, reason: 'not-configured' }
  const version = cfg.version || 'v21.0'
  try {
    const res = await fetch(`https://graph.facebook.com/${version}/${cfg.phoneNumberId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: text.slice(0, 4096) },
      }),
    })
    return { sent: res.ok, status: res.status }
  } catch (err) {
    return { sent: false, reason: (err as Error).message }
  }
}
