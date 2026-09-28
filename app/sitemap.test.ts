import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { siteConfig } from "@/shared/site-config";

describe("Given the sitemap is generated", () => {
  describe("When it runs", () => {
    it("Then it lists every public route under siteUrl", () => {
      const result = sitemap();

      expect(result.map((entry) => entry.url)).toEqual([
        siteConfig.siteUrl,
        `${siteConfig.siteUrl}/services`,
        `${siteConfig.siteUrl}/workshop`,
        `${siteConfig.siteUrl}/contact`,
      ]);
    });

    it("Then every entry has a lastModified date", () => {
      const result = sitemap();

      for (const entry of result) {
        expect(entry.lastModified).toBeInstanceOf(Date);
      }
    });
  });
});
