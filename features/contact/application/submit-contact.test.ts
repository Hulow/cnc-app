import { describe, expect, it } from "vitest";
import { Message, type MessageInput } from "../domain/message";
import type { ContactMailer } from "./contact-mailer";
import { SubmitContact } from "./submit-contact";

class FakeContactMailer implements ContactMailer {
  readonly sentMessages: Message[] = [];
  private readonly shouldReject: boolean;

  constructor(options: { shouldReject?: boolean } = {}) {
    this.shouldReject = options.shouldReject ?? false;
  }

  async send(message: Message): Promise<void> {
    if (this.shouldReject) {
      throw new Error("delivery failed");
    }
    this.sentMessages.push(message);
  }
}

function validInput(): MessageInput {
  return {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    phone: "030 1234567",
    message: "I'd like a quote for a milled aluminum bracket.",
  };
}

describe("Given a mailer that delivers successfully", () => {
  describe("When a valid submission is executed", () => {
    it("Then the mailer receives the validated message", async () => {
      const mailer = new FakeContactMailer();
      const submitContact = new SubmitContact(mailer);

      await submitContact.execute(validInput());

      expect(mailer.sentMessages).toHaveLength(1);
      expect(mailer.sentMessages[0].email).toBe("ada@example.com");
    });

    it("Then the result reports success with the created message's id", async () => {
      const mailer = new FakeContactMailer();
      const submitContact = new SubmitContact(mailer);

      const result = await submitContact.execute(validInput());

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.messageId).toBe(mailer.sentMessages[0].id);
    });
  });
});

describe("Given a mailer that fails to deliver", () => {
  describe("When a valid submission is executed", () => {
    it("Then the result reports a delivery failure with the message id, not the thrown error", async () => {
      const mailer = new FakeContactMailer({ shouldReject: true });
      const submitContact = new SubmitContact(mailer);

      const result = await submitContact.execute(validInput());

      expect(result.ok).toBe(false);
      if (result.ok || result.error !== "delivery_failed") throw new Error("expected a delivery failure");
      expect(result.messageId).toEqual(expect.any(String));
    });
  });
});

describe("Given invalid input", () => {
  describe("When it is executed", () => {
    it("Then the result reports validation errors and the mailer is never invoked", async () => {
      const mailer = new FakeContactMailer();
      const submitContact = new SubmitContact(mailer);

      const result = await submitContact.execute({ ...validInput(), email: "not-an-email" });

      expect(result).toEqual({
        ok: false,
        error: "validation_failed",
        errors: [{ field: "email", code: "invalid_format" }],
      });
      expect(mailer.sentMessages).toHaveLength(0);
    });
  });
});
