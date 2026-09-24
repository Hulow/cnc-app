import { describe, expect, it } from "vitest";
import { MessageBody } from "./message-body";
import { InvalidMessageBodyError } from "./message-body-error";

describe("Given a valid message", () => {
  describe("When a contact message body is created", () => {
    it("Then it is accepted", () => {
      const body = MessageBody.create("I'd like a quote for a milled aluminum bracket.");

      expect(body.value).toBe("I'd like a quote for a milled aluminum bracket.");
    });

    it("Then surrounding whitespace is trimmed", () => {
      const body = MessageBody.create("  Hello.  ");

      expect(body.value).toBe("Hello.");
    });
  });
});

describe("Given an empty message", () => {
  describe("When a contact message body is created", () => {
    it("Then it is accepted", () => {
      const body = MessageBody.create("   ");

      expect(body.value).toBe("");
    });
  });
});

describe("Given an oversized message", () => {
  describe("When a contact message body is created", () => {
    it("Then it throws InvalidMessageBodyError", () => {
      expect(() => MessageBody.create("a".repeat(5001))).toThrow(InvalidMessageBodyError);

      try {
        MessageBody.create("a".repeat(5001));
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidMessageBodyError);
        expect((error as InvalidMessageBodyError).code).toBe("too_long");
      }
    });
  });
});
