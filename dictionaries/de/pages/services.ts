// Services page (app/[lang]/leistungen/page.tsx) — also feeds
// components/service/service-de.tsx's card grid and
// shared/structured-data.ts's itemList.
export const servicesPage = {
  metaTitle: "Mein Angebot",
  metaDescription:
    "CNC-Fertigungsleistungen in Berlin: Prototypen, Einzelstücke und Kleinserien, von CAD-Design über CNC-Bearbeitung bis Montage und Veredelung.",
  readMore:
    "Ich helfe dabei, Ideen in echte Objekte zu verwandeln: von präzisen Schnitten und komplexen Designs bis hin zu gleichbleibend Einzelteilen.\n\nEgal, ob du eine CAD-Datei, eine Skizze oder einfach nur eine Idee hast: Ich kann dir dabei helfen, herauszufinden, wie sie umgesetzt werden kann, von Design und CNC-Bearbeitung bis hin zu Montage und Nachbearbeitung.\n\nJedes Projekt ist anders, deshalb erstelle ich für jedes Projekt ein individuelles Angebot.\n\nDu kannst deine fertigen Teile in der Werkstatt abholen oder sie dir zuschicken lassen.",
  cards: {
    cuttingServices: {
      heading: "Projektumfang",
      items: ["Prototypen", "Einzelstücke", "Kleinserien"],
    },
    services: {
      heading: "Leistungen",
      items: ["CAD & Design", "CNC-Bearbeitung", "Montage & Veredelung"],
    },
    quotesAreBasedOn: {
      heading: "Angebote basieren auf",
      items: ["Material", "Größe & Menge", "Designkomplexität"],
    },
    deliveryOptions: {
      heading: "Lieferoptionen",
      items: ["Abholung in der Werkstatt", "Versand"],
    },
  },
};
