import { describe, expect, it } from 'vitest'
import { getPatientInitials } from '../patientUtils'

describe('getPatientInitials', () => {
  it('returns an empty string for empty input', () => {
    expect(getPatientInitials('')).toBe('')
    expect(getPatientInitials('   ')).toBe('')
  })

  it('passes through already-formatted initials', () => {
    expect(getPatientInitials('J. K.')).toBe('J. K.')
    expect(getPatientInitials('J.K.')).toBe('J.K.')
  })

  it('capitalizes the first letters of a full name', () => {
    expect(getPatientInitials('john smith')).toMatch(/^J\.\s?S\./)
  })
})
