import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { siteConfig } from "@/shared/site-config";
import { StructuredData } from "./structured-data";

afterEach(() => {
  cleanup();
});

function renderJsonLd() {
  const { container } = render(<StructuredData />);
  const script = container.querySelector('script[type="application/ld+json"]');
  return JSON.parse(script?.innerHTML ?? "{}");
}

describe("Given the structured data script", () => {
  describe("When it renders", () => {
    it("Then it is a LocalBusiness with the site's name and url", () => {
      const data = renderJsonLd();

      expect(data["@type"]).toBe("LocalBusiness");
      expect(data.name).toBe(siteConfig.name);
      expect(data.url).toBe(siteConfig.siteUrl);
    });

    it("Then it includes a public postal address matching site-config", () => {
      const data = renderJsonLd();

      expect(data.address).toEqual({
        "@type": "PostalAddress",
        streetAddress: "Coppistraße 17",
        postalCode: "10365",
        addressLocality: siteConfig.serviceArea,
        addressCountry: "DE",
      });
    });
  });
});
