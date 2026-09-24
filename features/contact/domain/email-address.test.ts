import { describe, expect, it } from "vitest";
import { EmailAddress } from "./email-address";
import { InvalidEmailAddressError } from "./email-address-error";

describe("Given a valid email address", () => {
  describe("When a contact email address is created", () => {
    it("Then it is accepted", () => {
      const email = EmailAddress.create("ada@example.com");

      expect(email.value).toBe("ada@example.com");
    });
  });
});

describe("Given an empty email address", () => {
  describe("When a contact email address is created", () => {
    it("Then it throws InvalidEmailAddressError", () => {
      expect(() => EmailAddress.create("   ")).toThrow(InvalidEmailAddressError);

      try {
        EmailAddress.create("   ");
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidEmailAddressError);
        expect((error as InvalidEmailAddressError).code).toBe("required");
      }
    });
  });
});

describe("Given an invalid email address", () => {
  describe("When a contact email address is created", () => {
    it("Then it throws InvalidEmailAddressError", () => {
      expect(() => EmailAddress.create("not-an-email")).toThrow(InvalidEmailAddressError);

      try {
        EmailAddress.create("not-an-email");
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidEmailAddressError);
        expect((error as InvalidEmailAddressError).code).toBe("invalid_format");
      }
    });
  });
});
