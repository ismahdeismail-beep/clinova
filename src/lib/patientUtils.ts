/**
 * Formats any patient name into uppercase initials to ensure compliance
 * with patient confidentiality and privacy guidelines (e.g., Kenya Data Protection Act 2019).
 * E.g., "James Kamau" → "J. K."
 */
export function getPatientInitials(name: string): string {
  if (!name) return "";
  const trimmed = name.trim();
  
  // If it's already formatted as initials (e.g., "J. K." or "J.K."), return as is
  if (/^[A-Z](\.?\s*[A-Z]\.?)*$/.test(trimmed)) {
    return trimmed;
  }
  
  const parts = trimmed.split(/[\s\-_,.]+/).filter(Boolean);
  if (parts.length === 0) return "";
  
  // Map each part of the name to its capitalized first character and join with ". "
  const initials = parts
    .map(p => p.charAt(0).toUpperCase())
    .join(". ");
  
  return initials + ".";
}
