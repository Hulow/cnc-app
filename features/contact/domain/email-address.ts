import { InvalidEmailAddressError } from "./email-address-error";

// Deliberately simple: good enough to reject obviously malformed input
// without trying to fully validate the email spec.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Value object: the address the site owner should reply to.
 * Immutable; invariant enforced at construction.
 */
export class EmailAddress {
  private constructor(readonly value: string) {}

  static create(raw: string): EmailAddress {
    const trimmed = raw.trim();
    if (trimmed.length === 0) throw new InvalidEmailAddressError("required");
    if (!EMAIL_PATTERN.test(trimmed)) throw new InvalidEmailAddressError("invalid_format");
    return new EmailAddress(trimmed);
  }
}
