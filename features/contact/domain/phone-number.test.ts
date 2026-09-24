import { describe, expect, it } from "vitest";
import { PhoneNumber } from "./phone-number";

describe("Given a phone number", () => {
  describe("When a contact phone number is created", () => {
    it("Then it is accepted", () => {
      const phone = PhoneNumber.create("+49 30 1234567");

      expect(phone.value).toBe("+49 30 1234567");
    });

    it("Then surrounding whitespace is trimmed", () => {
      const phone = PhoneNumber.create("  030 1234567  ");

      expect(phone.value).toBe("030 1234567");
    });

    it("Then no format is enforced", () => {
      const phone = PhoneNumber.create("call me maybe");

      expect(phone.value).toBe("call me maybe");
    });
  });
});

describe("Given a blank phone number", () => {
  describe("When a contact phone number is created", () => {
    it("Then it is null", () => {
      const phone = PhoneNumber.create("   ");

      expect(phone.value).toBeNull();
    });
  });
});

describe("Given a null phone number", () => {
  describe("When a contact phone number is created", () => {
    it("Then it is null", () => {
      const phone = PhoneNumber.create(null);

      expect(phone.value).toBeNull();
    });
  });
});
