import type { FieldResult } from "./message-errors";

const MAX_MESSAGE_LENGTH = 5000;

/**
 * Value object: the body of the visitor's message.
 * Immutable; equality by value; invariant enforced at construction.
 */
export class MessageBody {
  private constructor(readonly value: string) {}

  static create(raw: string): FieldResult<MessageBody> {
    const trimmed = raw.trim();
    if (trimmed.length > MAX_MESSAGE_LENGTH) return { error: { field: "message", code: "too_long" } };
    return { value: new MessageBody(trimmed) };
  }

  equals(other: MessageBody): boolean {
    return this.value === other.value;
  }
}
