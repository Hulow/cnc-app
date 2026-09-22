import type { FieldResult } from "./message-errors";

// Deliberately simple: good enough to reject obviously malformed input
// without trying to fully validate the email spec.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Value object: the address the site owner should reply to.
 * Immutable; equality by value; invariant enforced at construction.
 */
export class EmailAddress {
  private constructor(readonly value: string) {}

  static create(raw: string): FieldResult<EmailAddress> {
    const trimmed = raw.trim();
    if (trimmed.length === 0) return { error: { field: "email", code: "required" } };
    if (!EMAIL_PATTERN.test(trimmed)) return { error: { field: "email", code: "invalid_format" } };
    return { value: new EmailAddress(trimmed) };
  }

  equals(other: EmailAddress): boolean {
    return this.value === other.value;
  }
}
