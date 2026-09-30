// Workshop page (app/(en)/workshop/page.tsx, app/[lang]/werkstatt/page.tsx)
// — also feeds components/cutting-salon/cutting-salon.tsx's card grid.
export const workshopPage = {
  metaTitle: "Inside the Atelier",
  metaDescription:
    "Inside the CNC workshop in Berlin: a 3-axis machine with a 2.2 × 1.5 m working area, machining wood, aluminium and plastics for acoustics, furniture art, architecture, engineering and beyond.",
  // TODO: owner copy — see P1.4 in SEO-SPEC.md.
  intro:
    "The machine has 3 axes and a 2.2 × 1.5 m working area.\n\nWith full control over spindle speed, feed rate and tooling, I can machine a wide variety of woods, aluminium and plastics.\n\nI'm open to projects of all kinds, for clients across Berlin and Germany.",
  cards: {
    machineCapabilities: {
      heading: "Machine Capabilities",
      items: ["Working area: 2.2m × 1.5m", "3 axis CNC"],
    },
    materials: {
      heading: "Materials",
      items: ["Wood", "Aluminium", "Plastics"],
    },
    applications: {
      heading: "Applications",
      items: ["Art", "Acoustics", "Design", "Architecture", "Furniture", "Engineering", "Beyond"],
    },
    technology: {
      heading: "Technology",
      items: ["ESP32 · Dual-core 32-bit", "grblHAL", "Universal Gcode Sender", "Fusion 360"],
    },
  },
  imageAlt: "CNC machine cutting material",
};
