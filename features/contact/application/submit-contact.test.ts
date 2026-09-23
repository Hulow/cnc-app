import { describe, expect, it } from "vitest";
import { Message } from "../domain/message";
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

function validMessage(): Message {
  const result = Message.create({
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    phone: "030 1234567",
    message: "I'd like a quote for a milled aluminum bracket.",
  });

  if (!result.ok) throw new Error("expected a valid message");
  return result.value;
}

describe("Given a mailer that delivers successfully", () => {
  describe("When a valid message is submitted", () => {
    it("Then the mailer receives it", async () => {
      const mailer = new FakeContactMailer();
      const submitContact = new SubmitContact(mailer);
      const message = validMessage();

      await submitContact.execute(message);

      expect(mailer.sentMessages).toEqual([message]);
    });

    it("Then the result reports success", async () => {
      const mailer = new FakeContactMailer();
      const submitContact = new SubmitContact(mailer);

      const result = await submitContact.execute(validMessage());

      expect(result).toEqual({ ok: true });
    });
  });
});

describe("Given a mailer that fails to deliver", () => {
  describe("When a valid message is submitted", () => {
    it("Then the result reports a delivery failure, not the thrown error", async () => {
      const mailer = new FakeContactMailer({ shouldReject: true });
      const submitContact = new SubmitContact(mailer);

      const result = await submitContact.execute(validMessage());

      expect(result).toEqual({ ok: false, error: "delivery_failed" });
    });
  });
});
