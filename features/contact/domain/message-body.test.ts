import { describe, expect, it } from "vitest";
import { MessageBody } from "./message-body";

describe("Given a valid message", () => {
  describe("When a contact message body is created", () => {
    it("Then it is accepted", () => {
      const result = MessageBody.create("I'd like a quote for a milled aluminum bracket.");

      expect(result.value?.value).toBe("I'd like a quote for a milled aluminum bracket.");
      expect(result.error).toBeUndefined();
    });

    it("Then surrounding whitespace is trimmed", () => {
      const result = MessageBody.create("  Hello.  ");

      expect(result.value?.value).toBe("Hello.");
    });
  });
});

describe("Given an empty message", () => {
  describe("When a contact message body is created", () => {
    it("Then it is accepted", () => {
      const result = MessageBody.create("   ");

      expect(result.value?.value).toBe("");
      expect(result.error).toBeUndefined();
    });
  });
});

describe("Given an oversized message", () => {
  describe("When a contact message body is created", () => {
    it("Then it is rejected", () => {
      const result = MessageBody.create("a".repeat(5001));

      expect(result.error).toEqual({ field: "message", code: "too_long" });
    });
  });
});

describe("Given two message bodies with the same value", () => {
  describe("When they are compared", () => {
    it("Then they are equal", () => {
      const first = MessageBody.create("Hello.").value!;
      const second = MessageBody.create("Hello.").value!;

      expect(first.equals(second)).toBe(true);
    });
  });
});
