import type { Message } from "../domain/message";

/**
 * Port: delivers a validated contact message. Implemented by an
 * infrastructure adapter (e.g. Resend); the application layer knows
 * nothing about how delivery actually happens.
 */
export interface ContactMailer {
  send(message: Message): Promise<void>;
}
