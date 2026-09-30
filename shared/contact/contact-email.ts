// Single source of truth for what counts as a well-formed email address.
// Consumed by the domain (server-side validation) and the form UI
// (client-side, on-blur validation) so the rule never drifts between layers.
//
// Deliberately simple: good enough to reject obviously malformed input
// without trying to fully validate the email spec.
//   - at least one non-space, non-"@" character before the "@"
//   - exactly one "@", followed by at least one non-space, non-"@" character
//   - a "." somewhere after the "@", followed by at least one non-space,
//     non-"@" character (the TLD)
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmailFormat(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}
