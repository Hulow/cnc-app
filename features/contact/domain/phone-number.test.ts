import { describe, expect, it } from "vitest";
import { PhoneNumber } from "./phone-number";

describe("Given a valid phone number", () => {
  describe("When a contact phone number is created", () => {
    it("Then it is accepted", () => {
      const result = PhoneNumber.create("+49 30 1234567");

      expect(result.value?.value).toBe("+49 30 1234567");
      expect(result.error).toBeUndefined();
    });

    it("Then surrounding whitespace is trimmed", () => {
      const result = PhoneNumber.create("  030 1234567  ");

      expect(result.value?.value).toBe("030 1234567");
    });
  });
});

describe("Given an empty phone number", () => {
  describe("When a contact phone number is created", () => {
    it("Then it is accepted", () => {
      const result = PhoneNumber.create("   ");

      expect(result.value?.value).toBe("");
      expect(result.error).toBeUndefined();
    });
  });
});

describe("Given an invalid phone number", () => {
  describe("When a contact phone number is created", () => {
    it("Then it is rejected", () => {
      const result = PhoneNumber.create("call me maybe");

      expect(result.error).toEqual({ field: "phone", code: "invalid_format" });
    });
  });
});

describe("Given an oversized phone number", () => {
  describe("When a contact phone number is created", () => {
    it("Then it is rejected", () => {
      const result = PhoneNumber.create("+" + "1".repeat(30));

      expect(result.error).toEqual({ field: "phone", code: "too_long" });
    });
  });
});

describe("Given two phone numbers with the same value", () => {
  describe("When they are compared", () => {
    it("Then they are equal", () => {
      const first = PhoneNumber.create("030 1234567").value!;
      const second = PhoneNumber.create("030 1234567").value!;

      expect(first.equals(second)).toBe(true);
    });
  });
});
