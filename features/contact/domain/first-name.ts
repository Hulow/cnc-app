import type { FieldResult } from "./message-errors";

const MAX_NAME_LENGTH = 100;

/**
 * Value object: the visitor's first name.
 * Immutable; equality by value; invariant enforced at construction.
 */
export class FirstName {
  private constructor(readonly value: string) {}

  static create(raw: string): FieldResult<FirstName> {
    const trimmed = raw.trim();
    if (trimmed.length === 0) return { error: { field: "firstName", code: "required" } };
    if (trimmed.length > MAX_NAME_LENGTH) return { error: { field: "firstName", code: "too_long" } };
    return { value: new FirstName(trimmed) };
  }

  equals(other: FirstName): boolean {
    return this.value === other.value;
  }
}
