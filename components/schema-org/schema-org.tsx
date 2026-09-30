interface SchemaOrgProps {
  // One JSON-LD object, or several — each renders as its own
  // <script type="application/ld+json"> block (multiple blocks per page
  // is standard). Untyped: schema.org shapes vary per @type, and the
  // builders in shared/seo/schema-org.ts are
  // the source of truth for what's actually in each one.
  data: object | object[];
}

export function SchemaOrg({ data }: SchemaOrgProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Static, build-time JSON derived from siteConfig/dictionaries
          // — not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
