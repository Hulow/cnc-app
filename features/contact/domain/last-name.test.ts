import { describe, expect, it } from "vitest";
import { LastName } from "./last-name";

describe("Given a valid last name", () => {
  describe("When a last name is created", () => {
    it("Then it is accepted", () => {
      const result = LastName.create("Lovelace");

      expect(result.value?.value).toBe("Lovelace");
      expect(result.error).toBeUndefined();
    });

    it("Then surrounding whitespace is trimmed", () => {
      const result = LastName.create("  Lovelace  ");

      expect(result.value?.value).toBe("Lovelace");
    });
  });
});

describe("Given an empty last name", () => {
  describe("When a last name is created", () => {
    it("Then it is rejected", () => {
      const result = LastName.create("   ");

      expect(result.error).toEqual({ field: "lastName", code: "required" });
    });
  });
});

describe("Given a last name over 100 characters", () => {
  describe("When a last name is created", () => {
    it("Then it is rejected", () => {
      const result = LastName.create("a".repeat(101));

      expect(result.error).toEqual({ field: "lastName", code: "too_long" });
    });
  });
});

describe("Given two last names with the same value", () => {
  describe("When they are compared", () => {
    it("Then they are equal", () => {
      const first = LastName.create("Lovelace").value!;
      const second = LastName.create("Lovelace").value!;

      expect(first.equals(second)).toBe(true);
    });
  });
});
