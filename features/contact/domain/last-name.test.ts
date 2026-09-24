import { describe, expect, it } from "vitest";
import { LastName } from "./last-name";
import { InvalidLastNameError } from "./errors/last-name-error";

describe("Given a valid last name", () => {
  describe("When a last name is created", () => {
    it("Then it is accepted", () => {
      const lastName = LastName.create("Lovelace");

      expect(lastName.value).toBe("Lovelace");
    });

    it("Then surrounding whitespace is trimmed", () => {
      const lastName = LastName.create("  Lovelace  ");

      expect(lastName.value).toBe("Lovelace");
    });
  });
});

describe("Given an empty last name", () => {
  describe("When a last name is created", () => {
    it("Then it throws InvalidLastNameError", () => {
      expect(() => LastName.create("   ")).toThrow(InvalidLastNameError);

      try {
        LastName.create("   ");
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidLastNameError);
        expect((error as InvalidLastNameError).code).toBe("required");
      }
    });
  });
});

describe("Given a last name over 100 characters", () => {
  describe("When a last name is created", () => {
    it("Then it throws InvalidLastNameError", () => {
      expect(() => LastName.create("a".repeat(101))).toThrow(InvalidLastNameError);

      try {
        LastName.create("a".repeat(101));
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidLastNameError);
        expect((error as InvalidLastNameError).code).toBe("too_long");
      }
    });
  });
});
