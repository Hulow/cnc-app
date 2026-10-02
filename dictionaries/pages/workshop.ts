import { TODO } from "../../shared/seo/todo";

// Workshop page (app/(en)/workshop/page.tsx, app/[lang]/werkstatt/page.tsx)
// — also feeds components/cutting-salon/cutting-salon.tsx's card grid.
// Both languages live here side by side so they stay easy to compare and
// keep in sync.
export const workshopPage = {
  en: {
    metadata: {
      title: "Inside the Atelier",
      //what is see on the link at whatsapp for instance
      description:
        "Inside the CNC workshop in Berlin: a 3-axis machine with a 2.2 × 1.5 m working area, machining wood, aluminium and plastics for acoustics, furniture art, architecture, engineering and beyond.",
    },
    websiteContent: {
      readMore:
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
    },
    schemas: {
      // → Person.jobTitle, e.g. "CNC machinist and designer".
      jobTitle: TODO,
      // → Person.description. Two or three sentences about you and your
      // background.
      description: TODO,
      // → Person.image, a portrait.
      personImage: TODO,
      pageDates: { published: TODO, modified: TODO },
    },
  },
  de: {
    metadata: {
      title: "Im Atelier",
      description:
        "Die CNC-Werkstatt in Berlin: eine 3-Achs-Maschine mit 2,2 × 1,5 m Arbeitsbereich, für Holz, Aluminium und Kunststoffe — für Akustik, Möbel und Kunst.",
    },
    websiteContent: {
      readMore:
        "Die Maschine verfügt über 3 Achsen und einen Arbeitsbereich von 2,2 × 1,5 m.\n\nDurch die präzise Steuerung von Spindeldrehzahl, Vorschub und Werkzeugen kann ich eine große Auswahl an Hölzern, Aluminium und Kunststoffen bearbeiten.\n\nIch bin offen für Projekte aller Art: für Kunden und Kundinnen in Berlin und ganz Deutschland.",
      cards: {
        machineCapabilities: {
          heading: "Maschinenleistung",
          items: ["Arbeitsbereich: 2,2 m × 1,5 m", "3-Achs-CNC"],
        },
        materials: {
          heading: "Materialien",
          items: ["Holz", "Aluminium", "Kunststoffe"],
        },
        applications: {
          heading: "Anwendungen",
          items: ["Kunst", "Akustik", "Design", "Architektur", "Möbel", "Technik", "Und mehr"],
        },
        // ESP32/grblHAL/Universal Gcode Sender/Fusion 360 are product
        // names — left untranslated.
        technology: {
          heading: "Technologie",
          items: ["ESP32 · Dual-core 32-bit", "grblHAL", "Universal Gcode Sender", "Fusion 360"],
        },
      },
      imageAlt: "CNC-Maschine beim Fräsen von Material",
    },
    schemas: {
      jobTitle: TODO,
      description: TODO,
      personImage: TODO,
      pageDates: { published: TODO, modified: TODO },
    },
  },
};
