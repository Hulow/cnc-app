import type { FieldResult } from "./message-errors";

const MAX_NAME_LENGTH = 100;

/**
 * Value object: the visitor's last name.
 * Immutable; equality by value; invariant enforced at construction.
 */
export class LastName {
  private constructor(readonly value: string) {}

  static create(raw: string): FieldResult<LastName> {
    const trimmed = raw.trim();
    if (trimmed.length === 0) return { error: { field: "lastName", code: "required" } };
    if (trimmed.length > MAX_NAME_LENGTH) return { error: { field: "lastName", code: "too_long" } };
    return { value: new LastName(trimmed) };
  }

  equals(other: LastName): boolean {
    return this.value === other.value;
  }
}
