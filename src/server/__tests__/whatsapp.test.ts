import crypto from 'node:crypto'
import { describe, expect, it } from 'vitest'
import {
  createDedupe,
  createRateLimiter,
  parseWebhookMessages,
  verifyMetaSignature,
  whatsappVerifyChallenge,
} from '../whatsapp'

function payload(...messages: any[]) {
  return {
    object: 'whatsapp_business_account',
    entry: [{ id: 'W', changes: [{ field: 'messages', value: { messages } }] }],
  }
}

describe('parseWebhookMessages', () => {
  it('extracts text messages with sender + id and trims the text', () => {
    const out = parseWebhookMessages(
      payload({ from: '254700000000', id: 'wamid.A', text: { body: '  paracetamol dose?  ' } }),
    )
    expect(out).toEqual([
      { from: '254700000000', text: 'paracetamol dose?', id: 'wamid.A', timestamp: undefined },
    ])
  })

  it('ignores non-text messages and malformed payloads', () => {
    expect(parseWebhookMessages(payload({ from: 'x', id: 'w', image: { id: 'y' } }))).toEqual([])
    expect(parseWebhookMessages(payload({ from: 'x', id: 'w', text: { body: '   ' } }))).toEqual([])
    expect(parseWebhookMessages({})).toEqual([])
    expect(parseWebhookMessages(null)).toEqual([])
  })
})

describe('verifyMetaSignature', () => {
  const secret = 's3cr3t'
  const raw = Buffer.from(JSON.stringify({ hello: 'world' }))
  const good = 'sha256=' + crypto.createHmac('sha256', secret).update(raw).digest('hex')

  it('accepts a valid signature', () => {
    expect(verifyMetaSignature(raw, good, secret)).toBe(true)
  })

  it('rejects a tampered body or missing/malformed header', () => {
    expect(verifyMetaSignature(Buffer.from('{}'), good, secret)).toBe(false)
    expect(verifyMetaSignature(raw, undefined, secret)).toBe(false)
    expect(verifyMetaSignature(raw, 'sha1=abc', secret)).toBe(false)
  })

  it('is permissive when no app secret is configured', () => {
    expect(verifyMetaSignature(raw, undefined, '')).toBe(true)
  })
})

describe('createRateLimiter', () => {
  it('allows up to max then blocks within the window, and resets after it', () => {
    let t = 0
    const rl = createRateLimiter(2, 1000, () => t)
    expect(rl.allow('a')).toBe(true)
    expect(rl.allow('a')).toBe(true)
    expect(rl.allow('a')).toBe(false)
    expect(rl.allow('b')).toBe(true)
    t = 1001
    expect(rl.allow('a')).toBe(true)
  })
})

describe('createDedupe', () => {
  it('flags repeats and forgets ids beyond the limit', () => {
    const d = createDedupe(2)
    expect(d.isDuplicate('1')).toBe(false)
    expect(d.isDuplicate('1')).toBe(true)
    d.isDuplicate('2')
    d.isDuplicate('3') // evicts '1'
    expect(d.isDuplicate('1')).toBe(false)
  })

  it('never treats an empty id as a duplicate', () => {
    const d = createDedupe()
    expect(d.isDuplicate('')).toBe(false)
    expect(d.isDuplicate('')).toBe(false)
  })
})

describe('whatsappVerifyChallenge', () => {
  it('returns the challenge only for the correct subscribe token', () => {
    expect(whatsappVerifyChallenge('subscribe', 'tok', '123', 'tok')).toBe('123')
    expect(whatsappVerifyChallenge('subscribe', 'bad', '123', 'tok')).toBeNull()
    expect(whatsappVerifyChallenge('subscribe', 'tok', '123', '')).toBeNull()
  })
})
