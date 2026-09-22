import { describe, expect, it } from "vitest";
import { FirstName } from "./first-name";

describe("Given a valid first name", () => {
  describe("When a first name is created", () => {
    it("Then it is accepted", () => {
      const result = FirstName.create("Ada");

      expect(result.value?.value).toBe("Ada");
      expect(result.error).toBeUndefined();
    });

    it("Then surrounding whitespace is trimmed", () => {
      const result = FirstName.create("  Ada  ");

      expect(result.value?.value).toBe("Ada");
    });
  });
});

describe("Given an empty first name", () => {
  describe("When a first name is created", () => {
    it("Then it is rejected", () => {
      const result = FirstName.create("   ");

      expect(result.error).toEqual({ field: "firstName", code: "required" });
    });
  });
});

describe("Given a first name over 100 characters", () => {
  describe("When a first name is created", () => {
    it("Then it is rejected", () => {
      const result = FirstName.create("a".repeat(101));

      expect(result.error).toEqual({ field: "firstName", code: "too_long" });
    });
  });
});

describe("Given two first names with the same value", () => {
  describe("When they are compared", () => {
    it("Then they are equal", () => {
      const first = FirstName.create("Ada").value!;
      const second = FirstName.create("Ada").value!;

      expect(first.equals(second)).toBe(true);
    });
  });
});
