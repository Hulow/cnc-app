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
        "CNC workshop in Berlin with a 3-axis machine and 2.2 × 1.5 m working area, machining wood, aluminium and plastics for art, acoustics, design, architecture, furniture and engineering.",
    },
    websiteContent: {
      readMore:
        "The machine has 3 axes and a 2.2 × 1.5 m working area.\n\nWith full control over spindle speed, feed rate and tooling, I can machine a wide variety of woods, aluminium and plastics.\n\nI'm open to projects of all kinds, for clients across Berlin and Germany.",
      cards: {
        machineCapabilities: {
          heading: "Machine Capabilities",
          items: [
            "Our CNC machine is a 3-axis milling machine with manual tool changing and a working area of 2200 × 1500 × 50 mm.",
            "I use CNC milling techniques to cut and machine your projects in both 2D and 3D, allowing for precise cuts, pockets, contours, and three-dimensional shapes."
          ],
        },
        applications: {
          heading: "Applications",
          items: [
            "I have experience working on a wide range of CNC projects across art, acoustics, design, architecture, furniture, and engineering — from sculptures and acoustic components to architectural elements, custom furniture, prototypes, and functional parts.",
            "These are just some of the areas where CNC machining can be useful. If you have a different project in mind, I’m always open to new ideas, unusual applications, and new challenges."
          ],
        },
        technology: {
          heading: "Technology",
          items: ["I use an ESP32 dual-core 32-bit controller running grblHAL to drive the machine, with Universal Gcode Sender for control and Fusion 360 for CAD and CAM."],
        },
      },
      imageAlt: "CNC machine cutting material",
    },
    schemas: {
      pageDates: { published: "2026-09-19", modified: "2026-10-04" },
      // → BreadcrumbList item for this page. Distinct from nav.workshop
      // ("Cutting Salon"), which is the shorter visible nav label.
      breadcrumbLabel: "Workshop",
      // → ProfessionalService.knowsAbout: concise CNC expertise +
      // application areas, not the prose in websiteContent.cards.
      knowsAbout: [
        "CNC machining",
        "CNC milling",
        "2D CNC cutting",
        "3D CNC milling",
        "Art",
        "Acoustics",
        "Design",
        "Architecture",
        "Furniture",
        "Engineering",
        "Prototyping",
      ],
      // → ProfessionalService.additionalProperty, one PropertyValue per
      // entry. The actual machine specs, not the explanatory sentences
      // in websiteContent.cards.machineCapabilities.
      machineSpecs: [
        { name: "Number of axes", value: "3" },
        { name: "Working area", value: "2200 × 1500 × 50 mm" },
        { name: "Tool changing", value: "Manual" },
        { name: "Machining", value: "2D and 3D CNC milling" },
      ],
      // → Person.knowsAbout: concise technical expertise, not the
      // technology sentence in websiteContent.cards.technology.
      personKnowsAbout: ["CNC machining", "CNC milling", "CAD", "CAM", "Fusion 360", "CNC machine control"],
    },
  },
  de: {
    metadata: {
      title: "Im Atelier",
      description:
        "CNC-Werkstatt in Berlin mit 3-Achs-Maschine und 2,2 × 1,5 m Arbeitsbereich für die Bearbeitung von Holz, Aluminium und Kunststoffen in Kunst, Akustik, Design, Architektur, Möbelbau und Technik.",
    },
    websiteContent: {
      readMore:
        "Die Maschine verfügt über 3 Achsen und einen Arbeitsbereich von 2,2 × 1,5 m.\n\nDurch die präzise Steuerung von Spindeldrehzahl, Vorschub und Werkzeugen kann ich eine große Auswahl an Hölzern, Aluminium und Kunststoffen bearbeiten.\n\nIch bin offen für Projekte aller Art: für Kunden und Kundinnen in Berlin und ganz Deutschland.",
      cards: {
        machineCapabilities: {
          heading: "Maschinenleistung",
          items: [
            "Unsere CNC-Maschine ist eine 3-Achs-Fräsmaschine mit manuellem Werkzeugwechsel und einem Arbeitsbereich von 2200 × 1500 × 50 mm.",
            "Ich bearbeite Ihre Projekte mit CNC-Frästechniken in 2D und 3D und ermögliche präzise Schnitte, Taschen, Konturen und dreidimensionale Formen."
          ],
        },
        applications: {
          heading: "Anwendungen",
          items: [
            "Ich habe Erfahrung mit einer Vielzahl von CNC-Projekten in den Bereichen Kunst, Akustik, Design, Architektur, Möbelbau und Technik – von Skulpturen und akustischen Komponenten über architektonische Elemente und individuelle Möbel bis hin zu Prototypen und funktionalen Bauteilen.",
            "Das sind nur einige der Bereiche, in denen CNC-Bearbeitung zum Einsatz kommen kann. Wenn Sie ein anderes Projekt im Sinn haben, bin ich immer offen für neue Ideen, ungewöhnliche Anwendungen und spannende Herausforderungen."
          ],
        },
        // ESP32/grblHAL/Universal Gcode Sender/Fusion 360 are product
        // names — left untranslated.
        technology: {
          heading: "Technologie",
          items: ["Ich steuere die Maschine über einen ESP32 Dual-Core 32-Bit-Controller mit grblHAL. Für die Maschinensteuerung nutze ich Universal Gcode Sender und für CAD und CAM Fusion 360."],
        },
      },
      imageAlt: "CNC-Maschine beim Fräsen von Material",
    },
    schemas: {
      pageDates: { published: "2026-09-19", modified: "2026-10-04" },
      breadcrumbLabel: "Werkstatt",
      knowsAbout: [
        "CNC-Bearbeitung",
        "CNC-Fräsen",
        "2D-CNC-Zuschnitt",
        "3D-CNC-Fräsen",
        "Kunst",
        "Akustik",
        "Design",
        "Architektur",
        "Möbelbau",
        "Technik",
        "Prototyping",
      ],
      machineSpecs: [
        { name: "Anzahl der Achsen", value: "3" },
        { name: "Arbeitsbereich", value: "2200 × 1500 × 50 mm" },
        { name: "Werkzeugwechsel", value: "Manuell" },
        { name: "Bearbeitung", value: "2D- und 3D-CNC-Fräsen" },
      ],
      personKnowsAbout: ["CNC-Bearbeitung", "CNC-Fräsen", "CAD", "CAM", "Fusion 360", "CNC-Maschinensteuerung"],
    },
  },
};
