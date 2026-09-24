import { InvalidMessageBodyError } from "./message-body-error";

const MAX_MESSAGE_LENGTH = 5000;

/**
 * Value object: the body of the visitor's message.
 * Immutable; invariant enforced at construction.
 */
export class MessageBody {
  private constructor(readonly value: string) {}

  static create(raw: string): MessageBody {
    const trimmed = raw.trim();
    if (trimmed.length > MAX_MESSAGE_LENGTH) throw new InvalidMessageBodyError("too_long");
    return new MessageBody(trimmed);
  }
}
