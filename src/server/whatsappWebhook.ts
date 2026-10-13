// Express router for the WhatsApp Cloud API webhook.
//
// Extracted from server.ts so the endpoint is integration-testable in isolation
// (server.ts mounts it at /api/whatsapp before the opt-in /api guard). `env` and
// the RAG/send dependencies are injectable so tests avoid any network calls.

import express from 'express'
import { answerWithRag, type RagAnswer } from './rag.js'
import {
  createDedupe,
  createRateLimiter,
  parseWebhookMessages,
  sendWhatsAppText,
  verifyMetaSignature,
  whatsappVerifyChallenge,
  type WhatsAppSendResult,
} from './whatsapp.js'

export interface WhatsAppDeps {
  answer: (text: string, opts?: { limit?: number }) => Promise<RagAnswer>
  send: (cfg: any, to: string, text: string) => Promise<WhatsAppSendResult>
}

/**
 * Build the `/incoming` router (handshake GET + message POST). Production calls
 * `createWhatsAppRouter()` with the process env and the real RAG/send functions.
 */
export function createWhatsAppRouter(
  env: Record<string, string | undefined> = process.env,
  deps: Partial<WhatsAppDeps> = {},
) {
  const verifyToken = env.WHATSAPP_VERIFY_TOKEN || ''
  const token = env.WHATSAPP_TOKEN || ''
  const phoneNumberId = env.WHATSAPP_PHONE_NUMBER_ID || ''
  const appSecret = env.WHATSAPP_APP_SECRET || ''
  const graphVersion = env.WHATSAPP_GRAPH_VERSION || 'v21.0'
  const topK = Number(env.WHATSAPP_RAG_TOP_K || 3)
  const answer = deps.answer ?? answerWithRag
  const send = deps.send ?? sendWhatsAppText
  const limiter = createRateLimiter(
    Number(env.WHATSAPP_RATE_LIMIT_MAX || 10),
    Number(env.WHATSAPP_RATE_LIMIT_WINDOW_MS || 60000),
  )
  const dedupe = createDedupe()
  const sendingConfigured = Boolean(token && phoneNumberId)

  const router = express.Router()

  // Meta subscription handshake.
  router.get('/incoming', (req, res) => {
    const challenge = whatsappVerifyChallenge(
      req.query['hub.mode'],
      req.query['hub.verify_token'],
      req.query['hub.challenge'],
      verifyToken,
    )
    if (challenge === null) return res.status(403).send('Forbidden')
    res.status(200).send(challenge)
  })

  // Inbound messages → RAG answer → WhatsApp reply.
  router.post('/incoming', async (req: any, res) => {
    // Meta retries/marks failures on non-2xx, so always acknowledge; log failures.
    try {
      if (!verifyMetaSignature(req.rawBody, req.headers['x-hub-signature-256'], appSecret)) {
        return res.status(401).json({ ok: false, error: 'invalid signature' })
      }

      const messages = parseWebhookMessages(req.body)
      const replies: any[] = []
      for (const m of messages) {
        if (dedupe.isDuplicate(m.id)) continue
        if (!limiter.allow(m.from)) {
          replies.push({ from: m.from, skipped: 'rate-limited' })
          continue
        }

        let answerText: string
        try {
          const rag = await answer(m.text, { limit: topK })
          answerText = rag.answer
          replies.push({
            from: m.from,
            chunks: rag.chunks.length,
            no_chunks: rag.no_chunks,
            answer: rag.answer,
          })
        } catch (err: any) {
          console.error('[whatsapp] RAG failed:', err?.message || err)
          answerText =
            'Sorry — the knowledge service is temporarily unavailable. Please try again shortly.'
          replies.push({ from: m.from, error: err?.message, answer: answerText })
        }

        await send({ token, phoneNumberId, version: graphVersion }, m.from, answerText)
      }

      res.status(200).json({
        ok: true,
        received: messages.length,
        // Local/testing convenience: when sending isn't configured, echo the
        // generated replies so the endpoint can be exercised via curl.
        ...(sendingConfigured ? {} : { dry_run: true, replies }),
      })
    } catch (err: any) {
      console.error('[whatsapp] webhook error:', err?.message || err)
      res.status(200).json({ ok: false })
    }
  })

  return router
}
