import { Message, type MessageInput } from "../domain/message";
import type { MessageFieldError } from "../domain/errors/message-errors";
import { toMessageFieldError } from "../domain/errors/to-message-field-error";
import type { ContactMailer } from "./contact-mailer";

export type SubmitContactResult =
  | { ok: true; messageId: string }
  | { ok: false; error: "validation_failed"; errors: MessageFieldError[] }
  | { ok: false; error: "delivery_failed"; messageId: string };

/**
 * Use case: validate the raw contact input into a `Message` and hand it
 * to the injected mailer. Callers (e.g. the API route) deal only in raw
 * input and results — they never construct domain objects themselves.
 * Any thrown/rejected delivery is turned into a controlled failure
 * result rather than re-thrown, so callers never see provider internals.
 */
export class SubmitContact {
  constructor(private readonly mailer: ContactMailer) {}

  async execute(input: MessageInput): Promise<SubmitContactResult> {
    let message: Message;
    try {
      message = Message.create(input);
    } catch (error) {
      const fieldError = toMessageFieldError(error);
      if (!fieldError) throw error;
      return { ok: false, error: "validation_failed", errors: [fieldError] };
    }

    try {
      await this.mailer.send(message);
      return { ok: true, messageId: message.id };
    } catch {
      return { ok: false, error: "delivery_failed", messageId: message.id };
    }
  }
}
