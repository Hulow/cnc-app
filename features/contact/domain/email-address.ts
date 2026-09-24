import { EMAIL_PATTERN } from "@/shared/contact-email";
import { InvalidEmailAddressError } from "./errors/email-address-error";

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
