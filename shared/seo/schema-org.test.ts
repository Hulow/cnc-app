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
  buildServicesProfessionalService,
  buildWebPage,
  buildWebSite,
  schemaIds,
  SERVICE_CARD_KEYS,
  SERVICE_ENTITY_KEYS,
} from "./schema-org";

describe("Given buildProfessionalService", () => {
  describe("When called with the English dictionary", () => {
    const data = buildProfessionalService(en);

    it("Then it parses as valid JSON-LD with the required ProfessionalService fields", () => {
      expect(JSON.parse(JSON.stringify(data))).toBeTruthy();
      expect(data["@context"]).toBe("https://schema.org");
      expect(data["@type"]).toBe("ProfessionalService");
      expect(data["@id"]).toBe(schemaIds.business);
      expect(data.name).toBe(en.site.name);
      expect(data.url).toBe(siteConfig.siteUrl);
      expect(data.logo).toBe(`${siteConfig.siteUrl}/logo.svg`);
      expect(data.description).toBe(en.meta.description);
    });

    it("Then it includes the public postal address matching dict.site", () => {
      expect(data.address).toEqual({
        "@type": "PostalAddress",
        streetAddress: "Coppistraße 17",
        postalCode: "10365",
        addressLocality: en.site.serviceArea,
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

    it("Then still-TODO fields (slogan, foundingDate, priceRange, image) pass through as empty", () => {
      expect(data.slogan).toBe("");
      expect(data.foundingDate).toBe("");
      expect(data.priceRange).toBe("");
      expect(data.image).toBe("");
      expect(data.sameAs).toEqual([]);
    });
  });

  describe("When called with the German dictionary", () => {
    it("Then the description is in German", () => {
      const data = buildProfessionalService(de);

      expect(data.description).toBe(de.meta.description);
    });
  });
});

describe("Given buildServicesProfessionalService", () => {
  describe("When called with the English dictionary", () => {
    const data = buildServicesProfessionalService("en", en);

    it("Then it is the business, identified by the same @id as the home page", () => {
      expect(data["@context"]).toBe("https://schema.org");
      expect(data["@type"]).toBe("ProfessionalService");
      expect(data["@id"]).toBe(schemaIds.business);
      expect(data.name).toBe(en.site.name);
    });

    it("Then hasOfferCatalog wraps one Offer per SERVICE_ENTITY_KEYS card", () => {
      expect(data.hasOfferCatalog["@type"]).toBe("OfferCatalog");
      expect(data.hasOfferCatalog.itemListElement).toHaveLength(SERVICE_ENTITY_KEYS.length);

      data.hasOfferCatalog.itemListElement.forEach((offer, i) => {
        const key = SERVICE_ENTITY_KEYS[i];
        const index = SERVICE_CARD_KEYS.indexOf(key);
        const service = offer.itemOffered;

        expect(offer["@type"]).toBe("Offer");
        expect(service["@type"]).toBe("Service");
        expect(service["@id"]).toBe(schemaIds.service(index));
        expect(service.name).toBe(en.services.websiteContent.cards[key].heading);
        expect(service.serviceType).toBe(en.services.websiteContent.cards[key].heading);
        expect(service.description).toBe(en.services.websiteContent.cards[key].descriptions.join(" "));
        expect(service.url).toBe(`${siteConfig.siteUrl}${routes.services.en}`);
        // Service itself carries no audience/areaServed/dates — the type
        // of buildServiceEntity's return has no such properties, since
        // those live once on the ProfessionalService instead.
      });
    });

    it("Then audience lists who the business serves, not each Service", () => {
      expect(data.audience).toEqual({
        "@type": "Audience",
        audienceType: [...en.services.schemas.audience],
      });
    });

    it("Then knowsAbout lists the services page's materials", () => {
      expect(data.knowsAbout).toEqual([...en.services.schemas.knowsAbout]);
    });

    it("Then additionalProperty carries the Quotes Based On and Delivery cards", () => {
      expect(data.additionalProperty).toEqual([
        {
          "@type": "PropertyValue",
          name: en.services.websiteContent.cards.serviceFour.heading,
          value: en.services.websiteContent.cards.serviceFour.descriptions.join(" "),
        },
        {
          "@type": "PropertyValue",
          name: en.services.websiteContent.cards.serviceFive.heading,
          value: en.services.websiteContent.cards.serviceFive.descriptions.join(" "),
        },
      ]);
    });

    it("Then areaServed covers Berlin and Germany", () => {
      expect(data.areaServed).toEqual([
        { "@type": "City", name: "Berlin" },
        { "@type": "Country", name: "Germany" },
      ]);
    });
  });
});

describe("Given buildPerson", () => {
  describe("When called without a profile (impressum)", () => {
    it("Then it only names the person and who they work for", () => {
      const data = buildPerson(en, { profile: false });

      expect(data["@type"]).toBe("Person");
      expect(data["@id"]).toBe(schemaIds.person);
      expect(data.name).toBe(en.site.legalName);
      expect(data.worksFor).toEqual({
        "@type": "ProfessionalService",
        "@id": schemaIds.business,
        name: en.site.name,
      });
      expect(data.jobTitle).toBeUndefined();
      expect(data.knowsAbout).toBeUndefined();
    });
  });

  describe("When called with a profile (workshop)", () => {
    it("Then it adds knowsAbout from the workshop technology", () => {
      const data = buildPerson(en, { profile: true });

      expect(data.knowsAbout).toEqual([...en.workshop.websiteContent.cards.technology.items]);
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
      expect(data.name).toBe(en.site.name);
      expect(data.url).toBe(siteConfig.siteUrl);
      expect(data.inLanguage).toBe("en");
      expect(data.publisher).toEqual({
        "@type": "ProfessionalService",
        "@id": schemaIds.business,
        name: en.site.name,
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
      expect(data.name).toBe(`${en.services.metadata.title} · ${en.site.name}`);
      expect(data.description).toBe(en.services.metadata.description);
      expect(data.about).toBeUndefined();
      expect(data.breadcrumb).toEqual({ "@id": schemaIds.breadcrumb("services", "en") });
    });

    it("Then mainEntity references the business by id", () => {
      expect(data.mainEntity).toEqual({ "@id": schemaIds.business });
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
    it("Then it is a two-item BreadcrumbList: Home, then Services", () => {
      const data = buildBreadcrumbs("services", "en", en);

      expect(data["@context"]).toBe("https://schema.org");
      expect(data["@type"]).toBe("BreadcrumbList");
      expect(data["@id"]).toBe(schemaIds.breadcrumb("services", "en"));
      expect(data.itemListElement).toEqual([
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${siteConfig.siteUrl}/services`,
        },
      ]);
    });
  });

  describe("When called for the German services page", () => {
    it("Then it uses the Leistungen label", () => {
      const data = buildBreadcrumbs("services", "de", de);

      expect(data.itemListElement[1]).toEqual({
        "@type": "ListItem",
        position: 2,
        name: "Leistungen",
        item: `${siteConfig.siteUrl}${routes.services.de}`,
      });
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
    it("Then the graph has the business, the page and a breadcrumb", () => {
      const data = buildPageGraph("services", "en", en);

      const types = data["@graph"].map((node) => node["@type"]);
      expect(types).toEqual(["ProfessionalService", "WebPage", "BreadcrumbList"]);
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
