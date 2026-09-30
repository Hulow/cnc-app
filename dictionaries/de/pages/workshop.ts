// Workshop page (app/[lang]/werkstatt/page.tsx) — also feeds
// components/cutting-salon/cutting-salon-de.tsx's card grid.
export const workshopPage = {
  metaTitle: "Im Atelier",
  metaDescription:
    "Die CNC-Werkstatt in Berlin: eine 3-Achs-Maschine mit 2,2 × 1,5 m Arbeitsbereich, für Holz, Aluminium und Kunststoffe — für Akustik, Möbel und Kunst.",
  intro:
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
    // ESP32/grblHAL/Universal Gcode Sender/Fusion 360 are product names —
    // left untranslated.
    technology: {
      heading: "Technologie",
      items: ["ESP32 · Dual-core 32-bit", "grblHAL", "Universal Gcode Sender", "Fusion 360"],
    },
  },
  imageAlt: "CNC-Maschine beim Fräsen von Material",
};
