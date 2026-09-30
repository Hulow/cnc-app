import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { SchemaOrg } from "./schema-org";

afterEach(() => {
  cleanup();
});

function renderScripts(data: object | object[]) {
  const { container } = render(<SchemaOrg data={data} />);
  return [...container.querySelectorAll('script[type="application/ld+json"]')].map((script) =>
    JSON.parse(script.innerHTML),
  );
}

describe("Given a single JSON-LD object", () => {
  describe("When it renders", () => {
    it("Then it is a single script tag with that object's content", () => {
      const parsed = renderScripts({ "@type": "WebSite", name: "Example" });

      expect(parsed).toHaveLength(1);
      expect(parsed[0]).toEqual({ "@type": "WebSite", name: "Example" });
    });
  });
});

describe("Given an array of JSON-LD objects", () => {
  describe("When it renders", () => {
    it("Then each renders as its own script tag, in order", () => {
      const parsed = renderScripts([
        { "@type": "WebSite", name: "Example" },
        { "@type": "LocalBusiness", name: "Example Business" },
      ]);

      expect(parsed).toHaveLength(2);
      expect(parsed[0]["@type"]).toBe("WebSite");
      expect(parsed[1]["@type"]).toBe("LocalBusiness");
    });
  });
});
