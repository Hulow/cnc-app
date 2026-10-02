import { describe, expect, it } from "vitest";
import { de } from "@/dictionaries/de";
import { en } from "@/dictionaries/en";
import { siteConfig } from "../site-config";
import { routes } from "../routes";
import {
  buildBreadcrumbs,
  buildPageGraph,
  buildPerson,
  buildProfessionalService,
  buildServices,
  buildWebPage,
  buildWebSite,
  schemaIds,
} from "./schema-org";

describe("Given buildProfessionalService", () => {
  describe("When called with the English dictionary", () => {
    const data = buildProfessionalService(en);

    it("Then it parses as valid JSON-LD with the required ProfessionalService fields", () => {
      expect(JSON.parse(JSON.stringify(data))).toBeTruthy();
      expect(data["@context"]).toBe("https://schema.org");
      expect(data["@type"]).toBe("ProfessionalService");
      expect(data["@id"]).toBe(schemaIds.business);
      expect(data.name).toBe(en.business.name);
      expect(data.url).toBe(siteConfig.siteUrl);
      expect(data.logo).toBe(`${siteConfig.siteUrl}/logo.svg`);
      expect(data.description).toBe(en.meta.description);
    });

    it("Then it includes the public postal address matching dict.business", () => {
      expect(data.address).toEqual({
        "@type": "PostalAddress",
        streetAddress: "Coppistraße 17",
        postalCode: "10365",
        addressLocality: en.business.serviceArea,
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

    it("Then still-TODO fields (slogan, foundingDate, priceRange, image, sameAs) are left out", () => {
      expect(data.slogan).toBeUndefined();
      expect(data.foundingDate).toBeUndefined();
      expect(data.priceRange).toBeUndefined();
      expect(data.image).toBeUndefined();
      expect(data.sameAs).toBeUndefined();
    });
  });

  describe("When called with the German dictionary", () => {
    it("Then the description is in German", () => {
      const data = buildProfessionalService(de);

      expect(data.description).toBe(de.meta.description);
    });
  });
});

describe("Given buildServices", () => {
  describe("When called with the English dictionary", () => {
    const data = buildServices("en", en);

    it("Then it builds one Service per card item, each referencing the business", () => {
      expect(data).toHaveLength(en.services.cards.services.items.length);

      data.forEach((service, index) => {
        expect(service["@context"]).toBe("https://schema.org");
        expect(service["@type"]).toBe("Service");
        expect(service["@id"]).toBe(schemaIds.service(index));
        expect(service.name).toBe(en.services.cards.services.items[index]);
        expect(service.provider).toEqual({
          "@type": "ProfessionalService",
          "@id": schemaIds.business,
          name: en.business.name,
        });
        expect(service.url).toBe(`${siteConfig.siteUrl}${routes.services.en}`);
      });
    });

    it("Then still-TODO description/audience/termsOfService are left out", () => {
      expect(data[0].description).toBeUndefined();
      expect(data[0].audience).toBeUndefined();
      expect(data[0].termsOfService).toBeUndefined();
    });

    it("Then availableChannel lists the delivery options", () => {
      expect(data[0].availableChannel).toEqual(
        en.services.cards.deliveryOptions.items.map((name) => ({
          "@type": "ServiceChannel",
          name,
        })),
      );
    });
  });
});

describe("Given buildPerson", () => {
  describe("When called without a profile (impressum)", () => {
    it("Then it only names the person and who they work for", () => {
      const data = buildPerson(en, { profile: false });

      expect(data["@type"]).toBe("Person");
      expect(data["@id"]).toBe(schemaIds.person);
      expect(data.name).toBe(en.business.legalName);
      expect(data.worksFor).toEqual({
        "@type": "ProfessionalService",
        "@id": schemaIds.business,
        name: en.business.name,
      });
      expect(data.jobTitle).toBeUndefined();
      expect(data.knowsAbout).toBeUndefined();
    });
  });

  describe("When called with a profile (workshop)", () => {
    it("Then it adds knowsAbout from the workshop materials/technology", () => {
      const data = buildPerson(en, { profile: true });

      expect(data.knowsAbout).toEqual([
        ...en.workshop.cards.materials.items,
        ...en.workshop.cards.technology.items,
      ]);
    });
  });
});

describe("Given buildWebSite", () => {
  describe("When called for English", () => {
    it("Then it is a WebSite pointing at the English home page", () => {
      const data = buildWebSite("en", en);

      expect(data["@context"]).toBe("https://schema.org");
      expect(data["@type"]).toBe("WebSite");
      expect(data["@id"]).toBe(schemaIds.website("en"));
      expect(data.name).toBe(en.business.name);
      expect(data.url).toBe(siteConfig.siteUrl);
      expect(data.inLanguage).toBe("en");
      expect(data.publisher).toEqual({
        "@type": "ProfessionalService",
        "@id": schemaIds.business,
        name: en.business.name,
      });
    });
  });

  describe("When called for German", () => {
    it("Then it points at the German home page", () => {
      const data = buildWebSite("de", de);

      expect(data.url).toBe(`${siteConfig.siteUrl}${routes.home.de}`);
      expect(data.inLanguage).toBe("de");
    });
  });
});

describe("Given buildWebPage", () => {
  describe("When called for the English services page", () => {
    const data = buildWebPage("services", "en", en);

    it("Then it is a WebPage with the page's own title/description", () => {
      expect(data["@type"]).toBe("WebPage");
      expect(data["@id"]).toBe(schemaIds.webPage("services", "en"));
      expect(data.url).toBe(`${siteConfig.siteUrl}${routes.services.en}`);
      expect(data.name).toBe(`${en.pages.services.title} · ${en.business.name}`);
      expect(data.description).toBe(en.pages.services.description);
      expect(data.about).toEqual({
        "@type": "ProfessionalService",
        "@id": schemaIds.business,
        name: en.business.name,
      });
      expect(data.breadcrumb).toEqual({ "@id": schemaIds.breadcrumb("services", "en") });
    });

    it("Then mainEntity references every Service by id", () => {
      expect(data.mainEntity).toEqual(
        en.services.cards.services.items.map((_, index) => ({
          "@id": schemaIds.service(index),
        })),
      );
    });
  });

  describe("When called for the workshop page", () => {
    it("Then it uses the AboutPage subtype", () => {
      expect(buildWebPage("workshop", "en", en)["@type"]).toBe("AboutPage");
    });
  });

  describe("When called for the contact page", () => {
    it("Then it uses the ContactPage subtype", () => {
      expect(buildWebPage("contact", "en", en)["@type"]).toBe("ContactPage");
    });
  });

  describe("When called for the home page", () => {
    it("Then it has no breadcrumb reference", () => {
      expect(buildWebPage("home", "en", en).breadcrumb).toBeUndefined();
    });
  });
});

describe("Given buildBreadcrumbs", () => {
  describe("When called for the English services page", () => {
    it("Then it is a two-item BreadcrumbList: Home, then Service", () => {
      const data = buildBreadcrumbs("services", "en", en);

      expect(data["@context"]).toBe("https://schema.org");
      expect(data["@type"]).toBe("BreadcrumbList");
      expect(data["@id"]).toBe(schemaIds.breadcrumb("services", "en"));
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

  describe("When called for the English impressum page", () => {
    it("Then it uses the footer's Legal Notice label (impressum isn't in the nav either)", () => {
      const data = buildBreadcrumbs("impressum", "en", en);

      expect(data.itemListElement[1]).toEqual({
        "@type": "ListItem",
        position: 2,
        name: "Legal Notice",
        item: `${siteConfig.siteUrl}/impressum`,
      });
    });
  });
});

describe("Given buildPageGraph", () => {
  describe("When called for the home page", () => {
    it("Then the graph has the business, the website and the page itself, with no breadcrumb", () => {
      const data = buildPageGraph("home", "en", en);

      expect(data["@context"]).toBe("https://schema.org");
      const types = data["@graph"].map((node) => node["@type"]);
      expect(types).toEqual(["ProfessionalService", "WebSite", "WebPage"]);
    });
  });

  describe("When called for the workshop page", () => {
    it("Then the graph has the business, the person profile, the page and a breadcrumb", () => {
      const data = buildPageGraph("workshop", "en", en);

      const types = data["@graph"].map((node) => node["@type"]);
      expect(types).toEqual(["ProfessionalService", "Person", "AboutPage", "BreadcrumbList"]);
    });
  });

  describe("When called for the services page", () => {
    it("Then the graph has one node per service, then the page and a breadcrumb", () => {
      const data = buildPageGraph("services", "en", en);

      const types = data["@graph"].map((node) => node["@type"]);
      expect(types).toEqual([
        ...en.services.cards.services.items.map(() => "Service"),
        "WebPage",
        "BreadcrumbList",
      ]);
    });
  });

  describe("When called for the privacy page", () => {
    it("Then the graph is just the page and its breadcrumb", () => {
      const data = buildPageGraph("privacy", "en", en);

      const types = data["@graph"].map((node) => node["@type"]);
      expect(types).toEqual(["WebPage", "BreadcrumbList"]);
    });
  });

  describe("When called for the impressum page", () => {
    it("Then every node has @context stripped (hoisted to the top level)", () => {
      const data = buildPageGraph("impressum", "en", en);

      for (const node of data["@graph"]) {
        expect(node).not.toHaveProperty("@context");
      }
    });
  });
});
