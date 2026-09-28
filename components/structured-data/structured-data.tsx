import { siteConfig } from "@/shared/site-config";

// Schema.org LocalBusiness structured data.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.split(", ")[0],
      postalCode: siteConfig.contact.address.match(/\d{5}/)?.[0],
      addressLocality: siteConfig.serviceArea,
      addressCountry: "DE",
    },
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
