import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "./robots";
import { siteConfig } from "@/shared/site-config";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("Given VERCEL_ENV is production", () => {
  describe("When robots is generated", () => {
    it("Then it allows all crawlers except /api/ and links the sitemap", () => {
      vi.stubEnv("VERCEL_ENV", "production");

      const result = robots();

      expect(result.rules).toEqual({
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      });
      expect(result.sitemap).toBe(`${siteConfig.siteUrl}/sitemap.xml`);
    });
  });
});

describe("Given VERCEL_ENV is preview", () => {
  describe("When robots is generated", () => {
    it("Then it disallows everything", () => {
      vi.stubEnv("VERCEL_ENV", "preview");

      const result = robots();

      expect(result.rules).toEqual({
        userAgent: "*",
        disallow: "/",
      });
      expect(result.sitemap).toBeUndefined();
    });
  });
});

describe("Given VERCEL_ENV is unset (e.g. a local build)", () => {
  describe("When robots is generated", () => {
    it("Then it disallows everything", () => {
      vi.stubEnv("VERCEL_ENV", undefined);

      const result = robots();

      expect(result.rules).toEqual({
        userAgent: "*",
        disallow: "/",
      });
    });
  });
});
