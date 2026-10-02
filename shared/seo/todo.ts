// Placeholder for dictionary content that doesn't exist yet (see
// dictionaries/schema.ts and the new fields in dictionaries/business.ts).
// It's a plain empty string, not `undefined`, so a builder in
// ./schema-org.ts can use it exactly like real (if absent) content —
// `"".startsWith(...)`, `[...emptyString]` — without special-casing it
// before `prune` gets a chance to run.
export const TODO = "";

function isEmpty(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === "string") return value.length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return isMeaninglessObject(value as Record<string, unknown>);
  return false;
}

// An object that survived cleaning but carries nothing beyond its own
// "@type" is just a label with no data — e.g. a GeoCoordinates whose
// latitude/longitude are both still TODO. Not worth shipping either.
function isMeaninglessObject(obj: Record<string, unknown>): boolean {
  const keys = Object.keys(obj);
  return keys.length === 0 || (keys.length === 1 && keys[0] === "@type");
}

function clean(value: unknown): unknown {
  if (isEmpty(value)) return undefined;

  if (Array.isArray(value)) {
    const items = value.map(clean).filter((item) => item !== undefined);
    return items.length === 0 ? undefined : items;
  }

  if (typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      const cleaned = clean(item);
      if (cleaned !== undefined) result[key] = cleaned;
    }
    return isMeaninglessObject(result) ? undefined : result;
  }

  return value;
}

// Recursively drops TODO values (and anything else with no real content —
// undefined, empty strings/arrays, an object left with only "@type") from
// a JSON-LD node, so published markup never claims a property the site
// doesn't actually have content for yet.
export function prune<T extends Record<string, unknown>>(node: T): T {
  return (clean(node) ?? {}) as T;
}
