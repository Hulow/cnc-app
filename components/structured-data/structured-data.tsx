import { siteConfig } from "@/shared/site-config";

// Schema.org LocalBusiness structured data. Deliberately omits `address`:
// the business has no public customer-facing location, so Berlin is
// represented via `areaServed` instead of an invented street address.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    email: siteConfig.contact.email,
    areaServed: {
      "@type": "City",
      name: siteConfig.serviceArea,
    },
  };

  return (
    <script
      type="application/ld+json"
      // Static, build-time JSON derived from siteConfig — not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
