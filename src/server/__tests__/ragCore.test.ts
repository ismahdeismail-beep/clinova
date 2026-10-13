import { describe, expect, it } from 'vitest'
import { buildRagPrompt, cosine, formatChunks, rankByCosine } from '../ragCore'

describe('cosine', () => {
  it('returns 1 for identical vectors', () => {
    expect(cosine([1, 2, 3], [1, 2, 3])).toBeCloseTo(1)
  })

  it('returns 0 for orthogonal vectors', () => {
    expect(cosine([1, 0], [0, 1])).toBeCloseTo(0)
  })

  it('is scale invariant', () => {
    expect(cosine([1, 2], [2, 4])).toBeCloseTo(1)
  })

  it('returns -1 for mismatched, empty or all-zero inputs', () => {
    expect(cosine([1, 2], [1])).toBe(-1)
    expect(cosine([], [])).toBe(-1)
    expect(cosine([0, 0], [1, 1])).toBe(-1)
  })
})

describe('rankByCosine', () => {
  const q = [1, 0]
  const items = [
    { id: 'a', embedding: [1, 0] },
    { id: 'b', embedding: [1, 1] },
    { id: 'c', embedding: [0, 1] },
    { id: 'd', embedding: [-1, 0] },
  ]

  it('orders by similarity desc and drops non-positive matches', () => {
    const ranked = rankByCosine(q, items, 3)
    expect(ranked.map((r) => r.item.id)).toEqual(['a', 'b'])
    expect(ranked[0].similarity).toBeCloseTo(1)
  })

  it('respects the top-n limit', () => {
    expect(rankByCosine(q, items, 1).map((r) => r.item.id)).toEqual(['a'])
  })
})

describe('formatChunks', () => {
  it('labels unknown sections', () => {
    expect(formatChunks([{ chunk_text: 'hi', section: null }])).toContain('section unknown')
    expect(formatChunks([{ chunk_text: 'hi', section: 'dosage' }])).toContain('section dosage')
  })
})

describe('buildRagPrompt', () => {
  it('injects the chunks and the question into a template', () => {
    const template = 'CTX:<chunks>{{chunks}}</chunks> Q:{{question}}'
    const prompt = buildRagPrompt(
      'What is the dose?',
      [{ chunk_text: 'Take 500 mg', section: 'dosage' }],
      template,
    )
    expect(prompt).toContain('Take 500 mg')
    expect(prompt).toContain('section dosage')
    expect(prompt).toContain('Q:What is the dose?')
  })

  it('loads the real template and leaves no placeholders behind', () => {
    const prompt = buildRagPrompt('Q?', [{ chunk_text: 'EXCERPT-X', section: null }])
    expect(prompt).toContain('EXCERPT-X')
    expect(prompt).not.toContain('{{chunks}}')
    expect(prompt).not.toContain('{{question}}')
  })
})
