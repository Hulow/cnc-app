import { describe, expect, it } from "vitest";
import { Message, type Attachment, type MessageInput } from "./message";

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
      const result = Message.create(validInput());

      expect(result.ok).toBe(true);
    });

    it("Then it is assigned a unique id", () => {
      const first = Message.create(validInput());
      const second = Message.create(validInput());

      expect(first.ok && second.ok).toBe(true);
      if (!first.ok || !second.ok) return;
      expect(first.value.id).toEqual(expect.any(String));
      expect(first.value.id).not.toBe(second.value.id);
    });

    it("Then the accepted value exposes the trimmed fields", () => {
      const result = Message.create(
        validInput({ firstName: "  Ada  ", lastName: "  Lovelace  ", message: "  Hello.  " }),
      );

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value.firstName).toBe("Ada");
      expect(result.value.lastName).toBe("Lovelace");
      expect(result.value.email).toBe("ada@example.com");
      expect(result.value.phone).toBe("030 1234567");
      expect(result.value.message).toBe("Hello.");
      expect(result.value.attachment).toBeUndefined();
    });
  });
});

describe("Given no phone number", () => {
  describe("When a contact message is created", () => {
    it("Then it is accepted with an empty phone number", () => {
      const result = Message.create(validInput({ phone: "" }));

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value.phone).toBe("");
    });
  });
});

describe("Given valid contact information with a supported attachment", () => {
  describe("When a contact message is created", () => {
    it("Then the attachment is exposed on the accepted value", () => {
      const attachment = validAttachment();
      const result = Message.create(validInput({ attachment }));

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value.attachment).toEqual(attachment);
    });
  });
});

describe("Given multiple invalid fields", () => {
  describe("When a contact message is created", () => {
    it("Then every violated field is reported", () => {
      const result = Message.create(validInput({ firstName: "", email: "bad", phone: "call me" }));

      expect(result).toEqual({
        ok: false,
        errors: [
          { field: "firstName", code: "required" },
          { field: "email", code: "invalid_format" },
          { field: "phone", code: "invalid_format" },
        ],
      });
    });
  });
});

describe("Given two messages created from the same input", () => {
  describe("When they are compared", () => {
    it("Then they are equal", () => {
      const first = Message.create(validInput());
      const second = Message.create(validInput());

      expect(first.ok && second.ok && first.value.equals(second.value)).toBe(true);
    });
  });
});

describe("Given two messages with different content", () => {
  describe("When they are compared", () => {
    it("Then they are not equal", () => {
      const first = Message.create(validInput());
      const second = Message.create(validInput({ message: "Different message." }));

      expect(first.ok && second.ok && first.value.equals(second.value)).toBe(false);
    });
  });
});
