import { describe, expect, it } from "vitest";
import { EmailAddress } from "./email-address";

describe("Given a valid email address", () => {
  describe("When a contact email address is created", () => {
    it("Then it is accepted", () => {
      const result = EmailAddress.create("ada@example.com");

      expect(result.value?.value).toBe("ada@example.com");
      expect(result.error).toBeUndefined();
    });
  });
});

describe("Given an empty email address", () => {
  describe("When a contact email address is created", () => {
    it("Then it is rejected", () => {
      const result = EmailAddress.create("   ");

      expect(result.error).toEqual({ field: "email", code: "required" });
    });
  });
});

describe("Given an invalid email address", () => {
  describe("When a contact email address is created", () => {
    it("Then it is rejected", () => {
      const result = EmailAddress.create("not-an-email");

      expect(result.error).toEqual({ field: "email", code: "invalid_format" });
    });
  });
});

describe("Given two email addresses with the same value", () => {
  describe("When they are compared", () => {
    it("Then they are equal", () => {
      const first = EmailAddress.create("ada@example.com").value!;
      const second = EmailAddress.create("ada@example.com").value!;

      expect(first.equals(second)).toBe(true);
    });
  });
});
