import { describe, expect, it } from 'vitest'
import {
  buildChunks,
  contentHash,
  decideIngest,
  prioritizeChanged,
  type IngestDoc,
  type Monograph,
} from '../ingestChunks'

const monograph = (over: Partial<Monograph> = {}): Monograph => ({
  id: 'm-1',
  name: 'Amoxicillin',
  generic_name: 'Amoxicillin',
  drug_class: 'Penicillin antibiotic',
  indications: ['Otitis media', 'Tonsillitis', 'Sinusitis'],
  contraindications: ['Penicillin allergy', 'Previous cholestatic jaundice'],
  side_effects: ['Diarrhoea', 'Nausea', 'Rash', 'Urticaria'],
  dosage: { adult: '500 mg three times daily', paediatric: 'Weight based' },
  interactions: ['Warfarin', 'Methotrexate'],
  monitoring: 'Renal function; complete blood count if prolonged.',
  patient_counselling: 'Complete the full course even if you feel better.',
  ...over,
})

const doc = (over: Partial<IngestDoc> = {}): IngestDoc => ({
  source: 'monograph',
  sourceRef: 'm-1',
  label: 'Amoxicillin',
  contentHash: 'hash-1',
  ...over,
})

describe('buildChunks', () => {
  it('produces one chunk per populated section', () => {
    const sections = buildChunks(monograph()).map((c) => c.section)
    expect(sections).toEqual([
      'overview',
      'indications',
      'contraindications',
      'side_effects',
      'dosage',
      'interactions',
      'monitoring',
      'counselling',
    ])
  })

  it('drops sections that have no content', () => {
    const chunks = buildChunks(
      monograph({ indications: null, contraindications: [], monitoring: null }),
    )
    expect(chunks.map((c) => c.section)).not.toContain('indications')
    expect(chunks.map((c) => c.section)).not.toContain('contraindications')
    expect(chunks.map((c) => c.section)).not.toContain('monitoring')
  })

  it('names the drug and its class in the overview', () => {
    const overview = buildChunks(monograph())[0].text
    expect(overview).toContain('Amoxicillin')
    expect(overview).toContain('Penicillin antibiotic')
  })
})

describe('contentHash', () => {
  it('is stable for identical content', () => {
    const a = contentHash(buildChunks(monograph()))
    const b = contentHash(buildChunks(monograph()))
    expect(a).toBe(b)
    expect(a).toHaveLength(16)
  })

  it('changes when the content changes', () => {
    const before = contentHash(buildChunks(monograph()))
    const after = contentHash(buildChunks(monograph({ indications: ['Pneumonia'] })))
    expect(after).not.toBe(before)
  })

  it('changes when only a later section changes', () => {
    const before = contentHash(buildChunks(monograph()))
    const after = contentHash(buildChunks(monograph({ monitoring: 'Different monitoring text.' })))
    expect(after).not.toBe(before)
  })
})

describe('decideIngest', () => {
  it('embeds a document that has no chunks yet', () => {
    const { selected, decisions } = decideIngest([doc()], new Set(), new Map(), new Set())
    expect(selected.map((d) => d.label)).toEqual(['Amoxicillin'])
    expect(decisions.get('monograph:m-1')).toBe('missing')
  })

  it('skips a covered document that was not marked for re-embed', () => {
    const { selected, decisions } = decideIngest(
      [doc()],
      new Set(['monograph:m-1']),
      new Map([['monograph:m-1', 'hash-1']]),
      new Set(),
    )
    expect(selected).toHaveLength(0)
    expect(decisions.get('monograph:m-1')).toBe('current')
  })

  it('re-embeds a marked document whose content changed', () => {
    const { selected, decisions } = decideIngest(
      [doc({ contentHash: 'hash-2' })],
      new Set(['monograph:m-1']),
      new Map([['monograph:m-1', 'hash-1']]),
      new Set(['Amoxicillin']),
    )
    expect(selected.map((d) => d.contentHash)).toEqual(['hash-2'])
    expect(decisions.get('monograph:m-1')).toBe('changed')
  })

  it('re-embeds a marked document that has no stored hash yet', () => {
    const { selected, decisions } = decideIngest(
      [doc()],
      new Set(['monograph:m-1']),
      new Map(),
      new Set(['Amoxicillin']),
    )
    expect(selected).toHaveLength(1)
    expect(decisions.get('monograph:m-1')).toBe('changed')
  })

  it('does not re-embed a marked document whose content is unchanged', () => {
    const { selected, decisions } = decideIngest(
      [doc()],
      new Set(['monograph:m-1']),
      new Map([['monograph:m-1', 'hash-1']]),
      new Set(['Amoxicillin']),
    )
    expect(selected).toHaveLength(0)
    expect(decisions.get('monograph:m-1')).toBe('current')
  })

  it('never re-embeds an STG document by label', () => {
    const stg = doc({ source: 'stg', sourceRef: 'who-eml', label: 'Amoxicillin' })
    const { selected, decisions } = decideIngest(
      [stg],
      new Set(['stg:who-eml']),
      new Map([['stg:who-eml', 'hash-1']]),
      new Set(['Amoxicillin']),
    )
    expect(selected).toHaveLength(0)
    expect(decisions.get('stg:who-eml')).toBe('current')
  })

  it('separates monographs and STG documents in the key', () => {
    const mono = doc()
    const stg = doc({ source: 'stg', sourceRef: 'who-eml', label: 'EML' })
    const { selected } = decideIngest([mono, stg], new Set(['monograph:m-1']), new Map(), new Set())
    expect(selected.map((d) => d.source)).toEqual(['stg'])
  })
})

describe('prioritizeChanged', () => {
  it('puts marked documents first and keeps the rest in order', () => {
    const docs = [
      doc({ label: 'A', sourceRef: 'a' }),
      doc({ label: 'B', sourceRef: 'b' }),
      doc({ label: 'C', sourceRef: 'c' }),
    ]
    const out = prioritizeChanged(docs, new Set(['C']))
    expect(out.map((d) => d.label)).toEqual(['C', 'A', 'B'])
  })

  it('leaves the order untouched when nothing is marked', () => {
    const docs = [doc({ label: 'A' }), doc({ label: 'B' })]
    expect(prioritizeChanged(docs, new Set()).map((d) => d.label)).toEqual(['A', 'B'])
  })

  it('does not promote an STG document', () => {
    const docs = [
      doc({ label: 'A', sourceRef: 'a' }),
      doc({ source: 'stg', sourceRef: 's', label: 'B' }),
    ]
    expect(prioritizeChanged(docs, new Set(['B'])).map((d) => d.label)).toEqual(['A', 'B'])
  })
})
