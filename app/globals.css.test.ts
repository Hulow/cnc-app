import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// jsdom has no layout engine, so it can't compute a real rendered width from
// a media query. Instead, this parses the stylesheet text and asserts the
// six Bootstrap breakpoint rules are present with the expected widths.
const css = readFileSync(join(__dirname, "globals.css"), "utf-8");

function widthInRule(selectorPattern: RegExp) {
  const match = css.match(selectorPattern);
  return match?.[1]?.trim();
}

const breakpoints = [
  { name: "xs", minWidth: null, width: "70%" },
  { name: "sm", minWidth: 576, width: "70%" },
  { name: "md", minWidth: 768, width: "50%" },
  { name: "lg", minWidth: 992, width: "50%" },
  { name: "xl", minWidth: 1200, width: "50%" },
  { name: "xxl", minWidth: 1400, width: "50%" },
];

describe(".content-layer responsive width", () => {
  for (const { name, minWidth, width } of breakpoints) {
    it(`is ${width} at ${name}${minWidth ? ` (>= ${minWidth}px)` : " (default)"}`, () => {
      const rule = minWidth
        ? widthInRule(
            new RegExp(`@media \\(min-width:\\s*${minWidth}px\\)\\s*{\\s*\\.content-layer\\s*{([^}]*)}`),
          )
        : widthInRule(/\.content-layer\s*{([^}]*)}/);

      expect(rule).toMatch(new RegExp(`width:\\s*${width}`));
    });
  }

  it("stays black and transparent", () => {
    const rule = widthInRule(/\.content-layer\s*{([^}]*)}/);
    expect(rule).toMatch(/background:\s*rgba\(10,\s*10,\s*10,\s*0\.6\)/);
  });
});
