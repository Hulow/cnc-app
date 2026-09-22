import type { Message } from "../domain/message";
import type { ContactMailer } from "./contact-mailer";

export type SubmitContactResult = { ok: true } | { ok: false; error: "delivery_failed" };

/**
 * Use case: hand an already-validated message to the injected mailer.
 * Any thrown/rejected delivery is turned into a controlled failure
 * result rather than re-thrown, so callers never see provider internals.
 */
export class SubmitContact {
  constructor(private readonly mailer: ContactMailer) {}

  async execute(message: Message): Promise<SubmitContactResult> {
    try {
      await this.mailer.send(message);
      return { ok: true };
    } catch {
      return { ok: false, error: "delivery_failed" };
    }
  }
}
