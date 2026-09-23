import type { FieldResult } from "./message-errors";

const MAX_PHONE_LENGTH = 30;

// Deliberately simple: good enough to reject obviously malformed input
// without trying to fully validate every regional phone format.
const PHONE_PATTERN = /^[+\d][\d\s()-]*$/;

/**
 * Value object: the visitor's phone number. Optional — an empty value is
 * accepted, but a non-empty one must look like a phone number.
 * Immutable; equality by value; invariant enforced at construction.
 */
export class PhoneNumber {
  private constructor(readonly value: string) {}

  static create(raw: string): FieldResult<PhoneNumber> {
    const trimmed = raw.trim();
    if (trimmed.length === 0) return { value: new PhoneNumber("") };
    if (trimmed.length > MAX_PHONE_LENGTH) return { error: { field: "phone", code: "too_long" } };
    if (!PHONE_PATTERN.test(trimmed)) return { error: { field: "phone", code: "invalid_format" } };
    return { value: new PhoneNumber(trimmed) };
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }
}
