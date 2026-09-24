import { describe, expect, it } from "vitest";
import { CompanyName } from "./company-name";

describe("Given a company name", () => {
  describe("When a contact company name is created", () => {
    it("Then it is accepted", () => {
      const companyName = CompanyName.create("Acme Corp");

      expect(companyName.value).toBe("Acme Corp");
    });

    it("Then surrounding whitespace is trimmed", () => {
      const companyName = CompanyName.create("  Acme Corp  ");

      expect(companyName.value).toBe("Acme Corp");
    });

    it("Then no format is enforced", () => {
      const companyName = CompanyName.create("!!! not a real company ???");

      expect(companyName.value).toBe("!!! not a real company ???");
    });
  });
});

describe("Given a blank company name", () => {
  describe("When a contact company name is created", () => {
    it("Then it is null", () => {
      const companyName = CompanyName.create("   ");

      expect(companyName.value).toBeNull();
    });
  });
});

describe("Given a null company name", () => {
  describe("When a contact company name is created", () => {
    it("Then it is null", () => {
      const companyName = CompanyName.create(null);

      expect(companyName.value).toBeNull();
    });
  });
});
