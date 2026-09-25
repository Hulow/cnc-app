import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// jsdom has no layout engine, so it can't compute a real rendered width from
// a media query. Instead, this parses the stylesheet text and asserts the
// six Bootstrap breakpoint rules exist with a percentage width. The actual
// percentages are tuned by hand in globals.css, so this doesn't pin exact
// values — just that every breakpoint sets a valid, non-empty width.
const css = readFileSync(join(__dirname, "globals.css"), "utf-8");

function widthInRule(selectorPattern: RegExp) {
  const match = css.match(selectorPattern);
  return match?.[1]?.trim();
}

// Only xs (default) and sm (576px) set a width; the remaining Bootstrap
// breakpoints (md/lg/xl/xxl) were dropped from globals.css because they
// repeated the same 70% and did nothing.
const breakpoints = [
  { name: "xs", minWidth: null },
  { name: "sm", minWidth: 576 },
];

describe(".content-layer responsive width", () => {
  for (const { name, minWidth } of breakpoints) {
    it(`sets a percentage width at ${name}${minWidth ? ` (>= ${minWidth}px)` : " (default)"}`, () => {
      const rule = minWidth
        ? widthInRule(
            new RegExp(`@media \\(min-width:\\s*${minWidth}px\\)\\s*{\\s*\\.content-layer\\s*{([^}]*)}`),
          )
        : widthInRule(/\.content-layer\s*{([^}]*)}/);

      expect(rule).toMatch(/width:\s*\d+(\.\d+)?%/);
    });
  }

  it("stays white and transparent", () => {
    const rule = widthInRule(/\.content-layer\s*{([^}]*)}/);
    expect(rule).toMatch(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.6\)/);
  });
});
