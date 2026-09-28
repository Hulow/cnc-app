import { describe, expect, it } from "vitest";
import { de } from "@/dictionaries/de";
import { en } from "@/dictionaries/en";
import { siteConfig } from "./site-config";
import { routes } from "./routes";
import { buildBreadcrumbs, buildLocalBusiness, buildWebSite } from "./structured-data";

describe("Given buildLocalBusiness", () => {
  describe("When called with the English dictionary", () => {
    const data = buildLocalBusiness(en);

    it("Then it parses as valid JSON-LD with the required LocalBusiness fields", () => {
      expect(JSON.parse(JSON.stringify(data))).toBeTruthy();
      expect(data["@context"]).toBe("https://schema.org");
      expect(data["@type"]).toBe("LocalBusiness");
      expect(data["@id"]).toBe(`${siteConfig.siteUrl}/#business`);
      expect(data.name).toBe(siteConfig.name);
      expect(data.url).toBe(siteConfig.siteUrl);
      expect(data.logo).toBe(`${siteConfig.siteUrl}/logo.svg`);
      expect(data.email).toBe(siteConfig.contact.email);
    });

    it("Then it includes the public postal address matching site-config", () => {
      expect(data.address).toEqual({
        "@type": "PostalAddress",
        streetAddress: "Coppistraße 17",
        postalCode: "10365",
        addressLocality: siteConfig.serviceArea,
        addressCountry: "DE",
      });
    });

    it("Then areaServed covers Berlin and Germany", () => {
      expect(data.areaServed).toEqual([
        { "@type": "City", name: "Berlin" },
        { "@type": "Country", name: "Germany" },
      ]);
    });

    it("Then knowsLanguage lists en and de", () => {
      expect(data.knowsLanguage).toEqual(["en", "de"]);
    });

    it("Then sameAs mirrors siteConfig.social", () => {
      expect(data.sameAs).toEqual([...siteConfig.social]);
    });

    it("Then hasOfferCatalog lists the services offered", () => {
      expect(data.hasOfferCatalog["@type"]).toBe("OfferCatalog");
      expect(data.hasOfferCatalog.itemListElement).toEqual(
        en.services.cards.cuttingServices.items.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      );
    });
  });

  describe("When called with the German dictionary", () => {
    it("Then the description and offer catalog are in German", () => {
      const data = buildLocalBusiness(de);

      expect(data.description).toBe(de.meta.description);
      expect(data.hasOfferCatalog.itemListElement[0].itemOffered.name).toBe(
        de.services.cards.cuttingServices.items[0],
      );
    });
  });
});

describe("Given buildWebSite", () => {
  describe("When called for English", () => {
    it("Then it is a WebSite pointing at the English home page", () => {
      const data = buildWebSite("en");

      expect(data["@context"]).toBe("https://schema.org");
      expect(data["@type"]).toBe("WebSite");
      expect(data.name).toBe(siteConfig.name);
      expect(data.url).toBe(siteConfig.siteUrl);
      expect(data.inLanguage).toBe("en");
    });
  });

  describe("When called for German", () => {
    it("Then it points at the German home page", () => {
      const data = buildWebSite("de");

      expect(data.url).toBe(`${siteConfig.siteUrl}${routes.home.de}`);
      expect(data.inLanguage).toBe("de");
    });
  });
});

describe("Given buildBreadcrumbs", () => {
  describe("When called for the English services page", () => {
    it("Then it is a two-item BreadcrumbList: Home, then Service", () => {
      const data = buildBreadcrumbs("services", "en", en);

      expect(data["@context"]).toBe("https://schema.org");
      expect(data["@type"]).toBe("BreadcrumbList");
      expect(data.itemListElement).toEqual([
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Service",
          item: `${siteConfig.siteUrl}/services`,
        },
      ]);
    });
  });

  describe("When called for the German privacy page", () => {
    it("Then it uses the footer's Datenschutz label (privacy isn't in the nav)", () => {
      const data = buildBreadcrumbs("privacy", "de", de);

      expect(data.itemListElement[1]).toEqual({
        "@type": "ListItem",
        position: 2,
        name: "Datenschutz",
        item: `${siteConfig.siteUrl}/de/datenschutz`,
      });
    });
  });
});
