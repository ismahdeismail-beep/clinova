// Open-source WhatsApp bot — protocol-client side.
//
// The Meta Cloud API (src/server/whatsapp.ts + whatsappWebhook.ts) is ONE way
// to run the bot. This module is the OTHER: it adapts an open-source protocol
// client (Baileys, QR-linked to a normal WhatsApp number) onto the exact same
// RAG serving path — so no Meta business account, no webhook URL and no Graph
// token are needed to get RAG answers on WhatsApp.
//
// Pure and free of a runtime Baileys import: only the structural message shapes
// are assumed, so this file stays unit-testable and type-checked without
// loading the dependency. The socket itself lives in
// scripts/whatsapp-baileys.ts, which injects the real answer/send handlers.

import { createDedupe, createRateLimiter } from './whatsapp.js'

/** A normalized inbound WhatsApp message (from either protocol client). */
export interface OpenIncoming {
  /** The chat to reply into (DM jid, or the group jid for group messages). */
  chat: string
  /** The real sender — the group participant, or the same as `chat` in a DM. */
  from: string
  /** Message id, used to dedupe redeliveries across reconnects. */
  id: string
  /** Trimmed body text. Empty for media-only messages. */
  text: string
  isGroup: boolean
  isFromMe: boolean
}

/** Minimal slice of `answerWithRag` that the bridge depends on. */
export interface OpenAnswer {
  answer: string
  chunks: Array<{ id?: string }>
  no_chunks: boolean
}

export interface OpenBridgeHandlers {
  answer: (text: string, opts: { limit: number }) => Promise<OpenAnswer>
  /** Deliver a reply to `chat`. Injected so tests never touch the network. */
  send: (chat: string, text: string) => Promise<void> | void
  log?: (line: string) => void
}

export interface OpenBridgeOptions {
  /** How many chunks each answer is grounded in. */
  topK?: number
  /** Answer group messages too (off by default — the bot only replies in DMs). */
  allowGroups?: boolean
  /** Compute the answer but only log it; never call `send`. */
  dryRun?: boolean
  rateLimitMax?: number
  rateLimitWindowMs?: number
  now?: () => number
}

export type OpenOutcome =
  | { handled: false; skipped: string }
  | {
      handled: true
      reply: string
      dryRun: boolean
      chunks: number
      noChunks: boolean
      error?: string
    }

/**
 * Pull the human-readable text out of an arbitrary WhatsApp message payload.
 *
 * Baileys wraps the real body in one of several message types, and frequently
 * nests it one level down (view-once / ephemeral / edited wrappers). Returns
 * '' when the message carries no text (media-only, protocol, revoke, reaction).
 */
export function extractOpenText(message: unknown): string {
  const root = (message ?? {}) as Record<string, any>
  const m =
    root.ephemeralMessage?.message ||
    root.viewOnceMessage?.message ||
    root.viewOnceMessageV2?.message ||
    root.viewOnceMessageV2Extension?.message ||
    root.documentWithCaptionMessage?.message ||
    root.editedMessage?.message ||
    root

  // Deliberately NOT handled: reactionMessage (a ❤️ must not trigger a reply),
  // protocolMessage (revoke/edit markers) and audio (no transcriber wired up).
  const candidates = [
    m.conversation,
    m.extendedTextMessage?.text,
    m.imageMessage?.caption,
    m.videoMessage?.caption,
    m.documentMessage?.caption,
    m.buttonsResponseMessage?.selectedDisplayText,
    m.buttonsResponseMessage?.selectedButtonId,
    m.templateButtonReplyMessage?.selectedDisplayText,
    m.listResponseMessage?.title,
    m.listResponseMessage?.singleSelectReply?.selectedRowId,
  ]
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c.trim()
  }
  return ''
}

/**
 * Normalize a Baileys `{ key, message }` pair into an `OpenIncoming`.
 * Returns null when the key is unusable (no id or no chat).
 */
export function incomingFromKey(key: any, message: any): OpenIncoming | null {
  const chat = typeof key?.remoteJid === 'string' ? key.remoteJid : ''
  const id = typeof key?.id === 'string' ? key.id : ''
  if (!chat || !id) return null
  const isGroup =
    chat.endsWith('@g.us') || chat.endsWith('@newsletter') || chat.endsWith('@broadcast')
  const participant = typeof key?.participant === 'string' ? key.participant : ''
  const from = !isGroup && key?.senderPn ? key.senderPn : participant || chat
  return {
    chat,
    from,
    id,
    text: extractOpenText(message),
    isGroup,
    isFromMe: Boolean(key?.fromMe),
  }
}

/**
 * Why a message must not be answered, or null when it should be handled.
 * Returning the reason (instead of a boolean) keeps the decision testable.
 */
export function shouldHandleOpenMessage(
  msg: OpenIncoming | null | undefined,
  opts: Pick<OpenBridgeOptions, 'allowGroups'> = {},
): string | null {
  if (!msg) return 'malformed'
  if (msg.isFromMe) return 'from-me'
  if (!msg.id) return 'no-id'
  if (!msg.text) return 'no-text'
  if (msg.chat === 'status@broadcast' || msg.chat.endsWith('@broadcast')) return 'status-broadcast'
  // Infer from the JID as well as the flag: answering a group when groups are
  // disabled would broadcast a reply to every participant, so never rely on a
  // caller having set `isGroup` correctly.
  const isGroup = msg.isGroup || msg.chat.endsWith('@g.us') || msg.chat.endsWith('@newsletter')
  if (isGroup && !opts.allowGroups) return 'group-disabled'
  return null
}

export const DEFAULT_RATE_LIMIT = 10
export const DEFAULT_RATE_WINDOW_MS = 60_000
export const DEFAULT_TOP_K = 3

/**
 * Build the inbound-message handler: filter → dedupe → throttle → RAG answer →
 * send (or dry-run log). Mirrors the Cloud API webhook's behaviour so both
 * transports behave identically for the same question.
 */
export function createOpenBridge(handlers: OpenBridgeHandlers, opts: OpenBridgeOptions = {}) {
  const topK = opts.topK ?? DEFAULT_TOP_K
  const log = handlers.log ?? (() => {})
  const limiter = createRateLimiter(
    opts.rateLimitMax ?? DEFAULT_RATE_LIMIT,
    opts.rateLimitWindowMs ?? DEFAULT_RATE_WINDOW_MS,
    opts.now ?? Date.now,
  )
  const dedupe = createDedupe()

  return async function handle(msg: OpenIncoming | null | undefined): Promise<OpenOutcome> {
    const reason = shouldHandleOpenMessage(msg, opts)
    if (reason || !msg) return { handled: false, skipped: reason ?? 'malformed' }
    if (dedupe.isDuplicate(msg.id)) return { handled: false, skipped: 'duplicate' }
    if (!limiter.allow(msg.from)) return { handled: false, skipped: 'rate-limited' }

    let reply: string
    let chunks = 0
    let noChunks = false
    let error: string | undefined

    try {
      const rag = await handlers.answer(msg.text, { limit: topK })
      reply = rag.answer.trim()
      chunks = rag.chunks.length
      noChunks = rag.no_chunks
      if (!reply) {
        reply =
          "I don't have indexed knowledge-base excerpts covering that yet — the Clinova knowledge base is still being built, so I can't ground an answer right now."
        noChunks = true
        chunks = 0
      }
    } catch (err) {
      error = (err as Error)?.message || String(err)
      log(`[wa-open] RAG failed for ${msg.chat}: ${error}`)
      reply = 'Sorry — the knowledge service is temporarily unavailable. Please try again shortly.'
    }

    if (opts.dryRun) {
      log(`[wa-open] dry-run → ${msg.chat} (chunks=${chunks}, no_chunks=${noChunks}): ${reply}`)
      return { handled: true, reply, dryRun: true, chunks, noChunks, error }
    }

    try {
      await handlers.send(msg.chat, reply)
    } catch (err) {
      const sendErr = (err as Error)?.message || String(err)
      log(`[wa-open] send failed to ${msg.chat}: ${sendErr}`)
      return { handled: true, reply, dryRun: false, chunks, noChunks, error: sendErr }
    }
    return { handled: true, reply, dryRun: false, chunks, noChunks, error }
  }
}
