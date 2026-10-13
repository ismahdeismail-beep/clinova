import crypto from 'node:crypto'
import type { AddressInfo } from 'node:net'
import express from 'express'
import { describe, expect, it } from 'vitest'
import type { RagAnswer } from '../rag'
import { createWhatsAppRouter } from '../whatsappWebhook'

const stubAnswer = async (text: string): Promise<RagAnswer> => ({
  answer: `STUB:${text}`,
  chunks: [
    {
      id: 'c1',
      chunk_text: 'excerpt',
      section: null,
      monograph_id: null,
      source: 'monograph',
      similarity: 0.9,
    },
  ],
  no_chunks: false,
  embedding_model: 'test-model',
})

function makeApp(
  env: Record<string, string>,
  answer: (text: string) => Promise<RagAnswer> = stubAnswer,
) {
  const app = express()
  app.use(
    express.json({
      verify: (req: any, _res: any, buf: Buffer) => {
        req.rawBody = buf
      },
    }),
  )
  app.use(
    '/api/whatsapp',
    createWhatsAppRouter(env, { answer, send: async () => ({ sent: false, reason: 'stub' }) }),
  )
  return app
}

async function serve(app: express.Express, fn: (base: string) => Promise<void>) {
  const server = app.listen(0)
  await new Promise<void>((resolve) => server.once('listening', () => resolve()))
  const { port } = server.address() as AddressInfo
  try {
    await fn(`http://127.0.0.1:${port}`)
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()))
  }
}

const payload = (messages: any[]) => ({
  object: 'whatsapp_business_account',
  entry: [{ changes: [{ value: { messages } }] }],
})
const msg = (body: string, id = 'wamid.1', from = '254700000000') => ({
  from,
  id,
  text: { body },
})

function post(base: string, body: string, headers: Record<string, string> = {}) {
  return fetch(`${base}/api/whatsapp/incoming`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body,
  })
}

describe('GET /api/whatsapp/incoming (Meta handshake)', () => {
  it('echoes the challenge for the correct subscribe token', async () => {
    await serve(makeApp({ WHATSAPP_VERIFY_TOKEN: 'tok' }), async (base) => {
      const res = await fetch(
        `${base}/api/whatsapp/incoming?hub.mode=subscribe&hub.verify_token=tok&hub.challenge=abc123`,
      )
      expect(res.status).toBe(200)
      expect(await res.text()).toBe('abc123')
    })
  })

  it('rejects a wrong token or an unconfigured verify token', async () => {
    await serve(makeApp({ WHATSAPP_VERIFY_TOKEN: 'tok' }), async (base) => {
      const wrong = await fetch(
        `${base}/api/whatsapp/incoming?hub.mode=subscribe&hub.verify_token=bad&hub.challenge=x`,
      )
      expect(wrong.status).toBe(403)
    })
    await serve(makeApp({}), async (base) => {
      const unconfigured = await fetch(
        `${base}/api/whatsapp/incoming?hub.mode=subscribe&hub.verify_token=&hub.challenge=x`,
      )
      expect(unconfigured.status).toBe(403)
    })
  })
})

describe('POST /api/whatsapp/incoming', () => {
  it('answers inbound text and echoes replies when sending is unconfigured (dry run)', async () => {
    await serve(makeApp({ WHATSAPP_VERIFY_TOKEN: 'tok' }), async (base) => {
      const res = await post(base, JSON.stringify(payload([msg('What is the dose?')])))
      expect(res.status).toBe(200)
      const json: any = await res.json()
      expect(json.dry_run).toBe(true)
      expect(json.received).toBe(1)
      expect(json.replies).toHaveLength(1)
      expect(json.replies[0].answer).toBe('STUB:What is the dose?')
      expect(json.replies[0].chunks).toBe(1)
    })
  })

  it('enforces X-Hub-Signature-256 when an app secret is set', async () => {
    const secret = 's3cr3t'
    await serve(makeApp({ WHATSAPP_APP_SECRET: secret }), async (base) => {
      const body = JSON.stringify(payload([msg('signed')]))

      const bad = await post(base, body, { 'x-hub-signature-256': 'sha256=deadbeef' })
      expect(bad.status).toBe(401)

      const missing = await post(base, body)
      expect(missing.status).toBe(401)

      const sig = 'sha256=' + crypto.createHmac('sha256', secret).update(body).digest('hex')
      const ok = await post(base, body, { 'x-hub-signature-256': sig })
      expect(ok.status).toBe(200)
      const json: any = await ok.json()
      expect(json.replies[0].answer).toBe('STUB:signed')
    })
  })

  it('ignores redelivered message ids (dedupe)', async () => {
    await serve(makeApp({}), async (base) => {
      const res = await post(base, JSON.stringify(payload([msg('hi', 'dup'), msg('hi', 'dup')])))
      const json: any = await res.json()
      expect(json.received).toBe(2)
      expect(json.replies).toHaveLength(1)
    })
  })

  it('throttles per phone number', async () => {
    await serve(makeApp({ WHATSAPP_RATE_LIMIT_MAX: '1' }), async (base) => {
      const first = await post(base, JSON.stringify(payload([msg('one', 'id1')])))
      expect(((await first.json()) as any).replies[0].answer).toBe('STUB:one')

      const second = await post(base, JSON.stringify(payload([msg('two', 'id2')])))
      const json: any = await second.json()
      expect(json.replies[0].skipped).toBe('rate-limited')
    })
  })

  it('degrades gracefully when the RAG answer throws', async () => {
    const boom = async () => {
      throw new Error('quota exhausted')
    }
    await serve(makeApp({}, boom as any), async (base) => {
      const res = await post(base, JSON.stringify(payload([msg('anything')])))
      expect(res.status).toBe(200)
      const json: any = await res.json()
      expect(json.replies[0].answer).toContain('temporarily unavailable')
    })
  })
})
