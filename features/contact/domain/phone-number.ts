/**
 * Value object: the visitor's phone number. Optional — raw input may be
 * null or blank, in which case the value is null. No format is enforced.
 * Immutable.
 */
export class PhoneNumber {
  private constructor(readonly value: string | null) {}

  static create(raw: string | null): PhoneNumber {
    const trimmed = raw?.trim() ?? "";
    return new PhoneNumber(trimmed.length === 0 ? null : trimmed);
  }
}
