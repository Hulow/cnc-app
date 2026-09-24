import { describe, expect, it } from "vitest";
import { FirstName, InvalidFirstNameError } from "./first-name";

describe("Given a valid first name", () => {
  describe("When a first name is created", () => {
    it("Then it is accepted", () => {
      const firstName = FirstName.create("Ada");

      expect(firstName.value).toBe("Ada");
    });

    it("Then surrounding whitespace is trimmed", () => {
      const firstName = FirstName.create("  Ada  ");

      expect(firstName.value).toBe("Ada");
    });
  });
});

describe("Given an empty first name", () => {
  describe("When a first name is created", () => {
    it("Then it throws InvalidFirstNameError", () => {
      expect(() => FirstName.create("   ")).toThrow(InvalidFirstNameError);

      try {
        FirstName.create("   ");
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidFirstNameError);
        expect((error as InvalidFirstNameError).code).toBe("required");
      }
    });
  });
});

describe("Given a first name over 100 characters", () => {
  describe("When a first name is created", () => {
    it("Then it throws InvalidFirstNameError", () => {
      expect(() => FirstName.create("a".repeat(101))).toThrow(InvalidFirstNameError);

      try {
        FirstName.create("a".repeat(101));
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidFirstNameError);
        expect((error as InvalidFirstNameError).code).toBe("too_long");
      }
    });
  });
});
