import { describe, expect, it } from "vitest";
import { Message, type Attachment, type MessageInput } from "./message";
import { InvalidFirstNameError } from "./errors/first-name-error";
import { InvalidEmailAddressError } from "./errors/email-address-error";

function validInput(overrides: Partial<MessageInput> = {}): MessageInput {
  return {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    phone: "030 1234567",
    message: "I'd like a quote for a milled aluminum bracket.",
    ...overrides,
  };
}

function validAttachment(overrides: Partial<Attachment> = {}): Attachment {
  return {
    filename: "part.step",
    mimeType: "application/step",
    sizeBytes: 1024,
    content: new Uint8Array([1, 2, 3]),
    ...overrides,
  };
}

describe("Given valid contact information", () => {
  describe("When a contact message is created", () => {
    it("Then it is accepted", () => {
      expect(() => Message.create(validInput())).not.toThrow();
    });

    it("Then it is assigned a unique id", () => {
      const first = Message.create(validInput());
      const second = Message.create(validInput());

      expect(first.id).toEqual(expect.any(String));
      expect(first.id).not.toBe(second.id);
    });

    it("Then the accepted value exposes the trimmed fields", () => {
      const message = Message.create(
        validInput({ firstName: "  Ada  ", lastName: "  Lovelace  ", message: "  Hello.  " }),
      );

      expect(message.firstName).toBe("Ada");
      expect(message.lastName).toBe("Lovelace");
      expect(message.email).toBe("ada@example.com");
      expect(message.phone).toBe("030 1234567");
      expect(message.message).toBe("Hello.");
      expect(message.attachment).toBeUndefined();
    });
  });
});

describe("Given no phone number", () => {
  describe("When a contact message is created", () => {
    it("Then it is accepted with a null phone number", () => {
      const message = Message.create(validInput({ phone: null }));

      expect(message.phone).toBeNull();
    });
  });
});

describe("Given valid contact information with a supported attachment", () => {
  describe("When a contact message is created", () => {
    it("Then the attachment is exposed on the accepted value", () => {
      const attachment = validAttachment();
      const message = Message.create(validInput({ attachment }));

      expect(message.attachment).toEqual(attachment);
    });
  });
});

describe("Given an invalid first name", () => {
  describe("When a contact message is created", () => {
    it("Then it throws the first name's domain error", () => {
      expect(() => Message.create(validInput({ firstName: "" }))).toThrow(InvalidFirstNameError);
    });
  });
});

describe("Given multiple invalid fields", () => {
  describe("When a contact message is created", () => {
    it("Then only the first violated field is reported", () => {
      expect(() => Message.create(validInput({ firstName: "", email: "bad" }))).toThrow(
        InvalidFirstNameError,
      );
    });

    it("Then a later field's error does not surface once an earlier one already threw", () => {
      expect(() => Message.create(validInput({ firstName: "", email: "bad" }))).not.toThrow(
        InvalidEmailAddressError,
      );
    });
  });
});

describe("Given two messages created from the same input", () => {
  describe("When they are compared", () => {
    it("Then they are equal", () => {
      const first = Message.create(validInput());
      const second = Message.create(validInput());

      expect(first.equals(second)).toBe(true);
    });
  });
});

describe("Given two messages with different content", () => {
  describe("When they are compared", () => {
    it("Then they are not equal", () => {
      const first = Message.create(validInput());
      const second = Message.create(validInput({ message: "Different message." }));

      expect(first.equals(second)).toBe(false);
    });
  });
});
