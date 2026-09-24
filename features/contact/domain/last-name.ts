import { InvalidLastNameError } from "./last-name-error";

const MAX_NAME_LENGTH = 100;

/**
 * Value object: the visitor's last name.
 * Immutable; invariant enforced at construction.
 */
export class LastName {
  private constructor(readonly value: string) {}

  static create(raw: string): LastName {
    const trimmed = raw.trim();
    if (trimmed.length === 0) throw new InvalidLastNameError("required");
    if (trimmed.length > MAX_NAME_LENGTH) throw new InvalidLastNameError("too_long");
    return new LastName(trimmed);
  }
}
