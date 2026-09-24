import { InvalidFirstNameError } from "./errors/first-name-error";

const MAX_NAME_LENGTH = 100;

/**
 * Value object: the visitor's first name.
 * Immutable; invariant enforced at construction.
 */
export class FirstName {
  private constructor(readonly value: string) {}

  static create(raw: string): FirstName {
    const trimmed = raw.trim();
    if (trimmed.length === 0) throw new InvalidFirstNameError("required");
    if (trimmed.length > MAX_NAME_LENGTH) throw new InvalidFirstNameError("too_long");
    return new FirstName(trimmed);
  }
}
