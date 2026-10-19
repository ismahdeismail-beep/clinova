import { describe, expect, it, vi } from 'vitest'
import {
  createOpenBridge,
  extractOpenText,
  incomingFromKey,
  shouldHandleOpenMessage,
  type OpenAnswer,
  type OpenIncoming,
} from '../whatsappOpen'

const dm = (over: Partial<OpenIncoming> = {}): OpenIncoming => ({
  chat: '254711111111@s.whatsapp.net',
  from: '254711111111@s.whatsapp.net',
  id: 'BAE5ABCD',
  text: 'What is the dose of amoxicillin?',
  isGroup: false,
  isFromMe: false,
  ...over,
})

const rag = (over: Partial<OpenAnswer> = {}): OpenAnswer => ({
  answer: 'Amoxicillin: 25 mg/kg/dose.',
  chunks: [{ id: 'chunk-1' }],
  no_chunks: false,
  ...over,
})

describe('extractOpenText', () => {
  it('reads a plain conversation string', () => {
    expect(extractOpenText({ conversation: 'hello there' })).toBe('hello there')
  })

  it('reads extended text and image captions', () => {
    expect(extractOpenText({ extendedTextMessage: { text: '  hi  ' } })).toBe('hi')
    expect(extractOpenText({ imageMessage: { caption: 'look at this' } })).toBe('look at this')
  })

  it('unwraps view-once and ephemeral envelopes', () => {
    expect(extractOpenText({ ephemeralMessage: { message: { conversation: 'inner' } } })).toBe(
      'inner',
    )
    expect(
      extractOpenText({
        viewOnceMessageV2: { message: { imageMessage: { caption: 'once' } } },
      }),
    ).toBe('once')
  })

  it('reads button and list replies', () => {
    expect(extractOpenText({ buttonsResponseMessage: { selectedDisplayText: 'Option A' } })).toBe(
      'Option A',
    )
    expect(extractOpenText({ listResponseMessage: { title: 'Picked row' } })).toBe('Picked row')
  })

  it('returns empty for reactions, revokes and media without a caption', () => {
    expect(extractOpenText({ reactionMessage: { text: '❤️' } })).toBe('')
    expect(extractOpenText({ protocolMessage: { type: 'REVOKE' } })).toBe('')
    expect(extractOpenText({ imageMessage: {} })).toBe('')
    expect(extractOpenText(undefined)).toBe('')
    expect(extractOpenText(null)).toBe('')
  })
})

describe('incomingFromKey', () => {
  it('normalizes a direct message (sender = chat)', () => {
    const out = incomingFromKey(
      { remoteJid: '254711111111@s.whatsapp.net', id: 'ABC', fromMe: false },
      { conversation: 'hi' },
    )
    expect(out).toEqual({
      chat: '254711111111@s.whatsapp.net',
      from: '254711111111@s.whatsapp.net',
      id: 'ABC',
      text: 'hi',
      isGroup: false,
      isFromMe: false,
    })
  })

  it('routes group messages to the group chat but throttles the participant', () => {
    const out = incomingFromKey(
      {
        remoteJid: '120363000000000000@g.us',
        id: 'GRP1',
        participant: '254722222222@s.whatsapp.net',
        fromMe: false,
      },
      { conversation: 'dose?' },
    )
    expect(out?.chat).toBe('120363000000000000@g.us')
    expect(out?.from).toBe('254722222222@s.whatsapp.net')
    expect(out?.isGroup).toBe(true)
  })

  it('returns null when the key is unusable', () => {
    expect(incomingFromKey({}, { conversation: 'x' })).toBeNull()
    expect(incomingFromKey({ remoteJid: 'a@s.whatsapp.net' }, { conversation: 'x' })).toBeNull()
  })
})

describe('shouldHandleOpenMessage', () => {
  it('accepts a normal direct message', () => {
    expect(shouldHandleOpenMessage(dm())).toBeNull()
  })

  it('rejects malformed, self-sent, empty and status messages', () => {
    expect(shouldHandleOpenMessage(null)).toBe('malformed')
    expect(shouldHandleOpenMessage(dm({ isFromMe: true }))).toBe('from-me')
    expect(shouldHandleOpenMessage(dm({ text: '' }))).toBe('no-text')
    expect(shouldHandleOpenMessage(dm({ chat: 'status@broadcast' }))).toBe('status-broadcast')
  })

  it('ignores groups unless explicitly allowed', () => {
    const group = dm({
      chat: '120363000000000000@g.us',
      from: '254722222222@s.whatsapp.net',
      isGroup: true,
    })
    expect(shouldHandleOpenMessage(group)).toBe('group-disabled')
    expect(shouldHandleOpenMessage(group, { allowGroups: true })).toBeNull()
  })

  it('refuses to treat a group as a DM even when isGroup was set wrong', () => {
    const misflagged = dm({ chat: '120363000000000000@g.us', isGroup: false })
    expect(shouldHandleOpenMessage(misflagged)).toBe('group-disabled')
  })
})

describe('createOpenBridge', () => {
  it('answers a message and sends the reply to the chat', async () => {
    const send = vi.fn()
    const answer = vi.fn().mockResolvedValue(rag())
    const bridge = createOpenBridge({ answer, send })

    const out = await bridge(dm())

    expect(out).toMatchObject({ handled: true, chunks: 1, noChunks: false, dryRun: false })
    expect(send).toHaveBeenCalledWith('254711111111@s.whatsapp.net', 'Amoxicillin: 25 mg/kg/dose.')
    expect(answer).toHaveBeenCalledWith('What is the dose of amoxicillin?', { limit: 3 })
  })

  it('skips repeated message ids (redelivery after reconnect)', async () => {
    const send = vi.fn()
    const bridge = createOpenBridge({ answer: vi.fn().mockResolvedValue(rag()), send })

    expect(await bridge(dm())).toMatchObject({ handled: true })
    expect(await bridge(dm())).toEqual({ handled: false, skipped: 'duplicate' })
    expect(send).toHaveBeenCalledTimes(1)
  })

  it('throttles a single sender but lets others through', async () => {
    const send = vi.fn()
    const bridge = createOpenBridge(
      { answer: vi.fn().mockResolvedValue(rag()), send },
      { rateLimitMax: 1, rateLimitWindowMs: 60_000, now: () => 1_000 },
    )

    expect(await bridge(dm({ id: '1' }))).toMatchObject({ handled: true })
    expect(await bridge(dm({ id: '2' }))).toEqual({ handled: false, skipped: 'rate-limited' })

    const other = dm({
      id: '3',
      chat: '254733333333@s.whatsapp.net',
      from: '254733333333@s.whatsapp.net',
    })
    expect(await bridge(other)).toMatchObject({ handled: true })
  })

  it('never sends in dry-run mode but still returns the reply', async () => {
    const send = vi.fn()
    const logs: string[] = []
    const bridge = createOpenBridge(
      { answer: vi.fn().mockResolvedValue(rag()), send, log: (l) => logs.push(l) },
      { dryRun: true },
    )

    const out = await bridge(dm())

    expect(out).toMatchObject({ handled: true, dryRun: true, reply: expect.any(String) })
    expect(send).not.toHaveBeenCalled()
    expect(logs.join('\n')).toContain('dry-run')
  })

  it('replies with a service message when RAG throws, without throwing', async () => {
    const send = vi.fn()
    const bridge = createOpenBridge({
      answer: vi.fn().mockRejectedValue(new Error('quota exhausted')),
      send,
    })

    const out = await bridge(dm())

    expect(out).toMatchObject({ handled: true, error: 'quota exhausted' })
    expect(send).toHaveBeenCalledWith(
      '254711111111@s.whatsapp.net',
      expect.stringContaining('temporarily unavailable'),
    )
  })

  it('falls back to a grounded no-answer when the model returns nothing', async () => {
    const send = vi.fn()
    const bridge = createOpenBridge({
      answer: vi.fn().mockResolvedValue(rag({ answer: '   ', chunks: [], no_chunks: true })),
      send,
    })

    const out = await bridge(dm())

    expect(out).toMatchObject({ handled: true, noChunks: true, chunks: 0 })
    expect(send).toHaveBeenCalledWith(
      '254711111111@s.whatsapp.net',
      expect.stringContaining('still being built'),
    )
  })

  it('propagates filter reasons as unhandled outcomes', async () => {
    const send = vi.fn()
    const bridge = createOpenBridge({ answer: vi.fn().mockResolvedValue(rag()), send })

    expect(await bridge(null)).toEqual({ handled: false, skipped: 'malformed' })
    expect(await bridge(dm({ text: '' }))).toEqual({ handled: false, skipped: 'no-text' })
    expect(await bridge(dm({ isFromMe: true }))).toEqual({ handled: false, skipped: 'from-me' })
    expect(send).not.toHaveBeenCalled()
  })
})
