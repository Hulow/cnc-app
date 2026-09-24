import { Message, type MessageInput } from "../domain/message";
import { EmailDeliveryError } from "./email-delivery-error";
import type { ContactMailer } from "./contact-mailer";

/**
 * Use case: validate the raw contact input into a `Message` and hand it
 * to the injected mailer. Callers (e.g. the API route) deal only in raw
 * input — they never construct domain objects themselves.
 *
 * Throws rather than returning a result: `Message.create` propagates the
 * violated field's domain error on invalid input, and a failed delivery
 * is wrapped in `EmailDeliveryError` so callers depend on one
 * application-level error type instead of whatever the mailer
 * implementation happens to throw.
 */
export class SubmitContact {
  constructor(private readonly mailer: ContactMailer) {}

  async execute(input: MessageInput): Promise<void> {
    const message = Message.create(input);

    try {
      await this.mailer.send(message);
    } catch (error) {
      throw new EmailDeliveryError(error instanceof Error ? error.message : String(error), {
        cause: error,
      });
    }
  }
}
