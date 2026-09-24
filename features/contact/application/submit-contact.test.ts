import { describe, expect, it } from "vitest";
import { Message, type MessageInput } from "../domain/message";
import { InvalidEmailAddressError } from "../domain/errors/email-address-error";
import type { ContactMailer } from "./contact-mailer";
import { EmailDeliveryError } from "./email-delivery-error";
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
    companyName: "Acme Corp",
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
      expect(mailer.sentMessages[0].toPrimitives().email).toBe("ada@example.com");
    });
  });
});

describe("Given a mailer that fails to deliver", () => {
  describe("When a valid submission is executed", () => {
    it("Then it throws an EmailDeliveryError wrapping the mailer's error", async () => {
      const mailer = new FakeContactMailer({ shouldReject: true });
      const submitContact = new SubmitContact(mailer);

      await expect(submitContact.execute(validInput())).rejects.toThrow(EmailDeliveryError);

      try {
        await submitContact.execute(validInput());
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(EmailDeliveryError);
        expect((error as EmailDeliveryError).message).toBe("delivery failed");
      }
    });
  });
});

describe("Given invalid input", () => {
  describe("When it is executed", () => {
    it("Then it throws the violated field's domain error and the mailer is never invoked", async () => {
      const mailer = new FakeContactMailer();
      const submitContact = new SubmitContact(mailer);

      await expect(
        submitContact.execute({ ...validInput(), email: "not-an-email" }),
      ).rejects.toThrow(InvalidEmailAddressError);
      expect(mailer.sentMessages).toHaveLength(0);
    });
  });
});
