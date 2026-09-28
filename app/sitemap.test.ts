import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { siteConfig } from "@/shared/site-config";

describe("Given the sitemap is generated", () => {
  describe("When it runs", () => {
    it("Then it lists every public route in both languages under siteUrl", () => {
      const result = sitemap();

      expect(result.map((entry) => entry.url)).toEqual([
        siteConfig.siteUrl,
        `${siteConfig.siteUrl}/de`,
        `${siteConfig.siteUrl}/services`,
        `${siteConfig.siteUrl}/de/leistungen`,
        `${siteConfig.siteUrl}/workshop`,
        `${siteConfig.siteUrl}/de/werkstatt`,
        `${siteConfig.siteUrl}/contact`,
        `${siteConfig.siteUrl}/de/kontakt`,
        `${siteConfig.siteUrl}/privacy`,
        `${siteConfig.siteUrl}/de/datenschutz`,
      ]);
    });

    it("Then every entry has a lastModified date", () => {
      const result = sitemap();

      for (const entry of result) {
        expect(entry.lastModified).toBeInstanceOf(Date);
      }
    });

    it("Then the /services entry carries alternates for both languages plus x-default", () => {
      const result = sitemap();
      const servicesEntry = result.find((entry) => entry.url === `${siteConfig.siteUrl}/services`);

      expect(servicesEntry?.alternates?.languages).toEqual({
        en: `${siteConfig.siteUrl}/services`,
        de: `${siteConfig.siteUrl}/de/leistungen`,
        "x-default": `${siteConfig.siteUrl}/services`,
      });
    });

    it("Then the German /de/leistungen entry carries the same alternates as its English counterpart", () => {
      const result = sitemap();
      const leistungenEntry = result.find(
        (entry) => entry.url === `${siteConfig.siteUrl}/de/leistungen`,
      );

      expect(leistungenEntry?.alternates?.languages).toEqual({
        en: `${siteConfig.siteUrl}/services`,
        de: `${siteConfig.siteUrl}/de/leistungen`,
        "x-default": `${siteConfig.siteUrl}/services`,
      });
    });
  });
});
