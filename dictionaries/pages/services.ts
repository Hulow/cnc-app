// Services page (app/(en)/services/page.tsx, app/[lang]/leistungen/page.tsx)
// — also feeds components/service/service.tsx's card grid and
// shared/seo/schema-org.ts's itemList. Both languages live here side by
// side so they stay easy to compare and keep in sync.
export const servicesPage = {
  en: {
    metaTitle: "What I Offer",
    metaDescription:
      "CNC machining services in Berlin: prototypes, one-off products and small production series, from CAD design to CNC machining, assembly and finishing.",
    // TODO: owner copy.
    readMore:
      "I help turn ideas into real objects, from precise cuts and complex designs to consistent, repeatable parts.\n\nWhether you have a CAD file, a sketch, or simply an idea, I can help you figure out how to make it, from design and CNC machining to assembly and finishing.\n\nEvery project is different, so I quote each one individually.\n\nPick up your parts at the workshop or have them shipped to you.",
    cards: {
      cuttingServices: {
        heading: "Project Size",
        items: ["Prototypes", "Unique products", "Small production series"],
      },
      services: {
        heading: "Services",
        items: ["CAD & design", "CNC machining", "Assembly & finishing"],
      },
      quotesAreBasedOn: {
        heading: "Quotes Are Based On",
        items: ["Material", "Size & quantity", "Design complexity"],
      },
      deliveryOptions: {
        heading: "Delivery Options",
        items: ["Workshop pickup", "Shipping"],
      },
    },
  },
  de: {
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
  },
};
