import { describe, expect, it } from 'vitest'
import { buildStgChunks, parseFrontMatter } from '../stgMarkdown'

const DOC = `---
title: Amoxicillin
category: Antibiotic
atcCode: J01CA04
lastUpdated: 2026-01-01
sourceMonograph: amoxicillin
---

# Amoxicillin

Intro paragraph about the medicine.

## Indications
- Respiratory tract infections
- Otitis media

## Dosage
Adults: 500 mg every 8 hours.

## Notes
`

describe('parseFrontMatter', () => {
  it('parses key/value front-matter (keys lower-cased) and keeps the body', () => {
    const { attrs, body } = parseFrontMatter(DOC)
    expect(attrs.title).toBe('Amoxicillin')
    expect(attrs.atccode).toBe('J01CA04')
    expect(attrs.sourcesmonograph).toBeUndefined() // key is sourceMonograph
    expect(attrs.sourcemonograph).toBe('amoxicillin')
    expect(body).toContain('# Amoxicillin')
    expect(body).not.toContain('title:')
  })

  it('returns the raw text when there is no front-matter', () => {
    expect(parseFrontMatter('# Title\nbody')).toEqual({ attrs: {}, body: '# Title\nbody' })
  })
})

describe('buildStgChunks', () => {
  it('uses the YAML title, emits one chunk per section and drops empty ones', () => {
    const doc = buildStgChunks(DOC, 'amoxicillin')
    expect(doc.title).toBe('Amoxicillin')
    expect(doc.slug).toBe('amoxicillin')
    expect(doc.chunks.map((c) => c.section)).toEqual(['overview', 'Indications', 'Dosage'])
  })

  it('prefixes each chunk with the medicine name for self-contained retrieval', () => {
    const { chunks } = buildStgChunks(DOC, 'amoxicillin')
    expect(chunks[0].text).toContain('Amoxicillin — overview:')
    expect(chunks[0].text).toContain('Intro paragraph')
    const indications = chunks.find((c) => c.section === 'Indications')!
    expect(indications.text).toContain('Amoxicillin — Indications:')
    expect(indications.text).toContain('Otitis media')
    expect(chunks.find((c) => c.section === 'Dosage')!.text).toContain('500 mg')
  })

  it('falls back to the H1 (then the slug) when there is no YAML title', () => {
    expect(buildStgChunks('# Paracetamol\n\n## Dosage\n500 mg', 'para').title).toBe('Paracetamol')
    expect(buildStgChunks('## Dosage\n500 mg', 'para').title).toBe('para')
  })

  it('produces no chunks for an empty / heading-only document', () => {
    expect(buildStgChunks('# Empty\n## Indications\n', 'empty').chunks).toEqual([])
  })
})
