import { TODO } from "../../shared/seo/todo";

// Services page (app/(en)/services/page.tsx, app/[lang]/leistungen/page.tsx)
// — also feeds components/service/service.tsx's card grid and
// shared/seo/schemas/services.ts's itemList. Both languages live here side
// by side so they stay easy to compare and keep in sync.
export const servicesPage = {
  en: {
    metadata: {
      title: "What I Offer",
      description:
        "CNC machining services in Berlin: prototypes, one-off products and small production series, from CAD design to CNC machining, assembly and finishing.",
    },
    websiteContent: {
      // TODO: owner copy.
      readMore:
        "I help turn ideas into real objects, from precise cuts and complex designs to consistent, repeatable parts.\n\nWhether you have a CAD file, a sketch, or simply an idea, I can help you figure out how to make it, from design and CNC machining to assembly and finishing.\n\nEvery project is different, so I quote each one individually.\n\nPick up your parts at the workshop or have them shipped to you.",
      cards: {
        serviceOne: {
          heading: "CAD Design",
          descriptions: ["Prototypes", "Unique products", "Small production series"],
        },
        serviceTwo: {
          heading: "CNC Machining",
          descriptions: ["CAD & design", "CNC machining", "Assembly & finishing"],
        },
        serviceThree: {
          heading: "Materials",
          descriptions: ["will describe it later"],
        },
        serviceFour: {
          heading: "Quotes Based On",
          descriptions: ["Material", "Size & quantity", "Design complexity"],
        },
        serviceFive: {
          heading: "Delivery",
          descriptions: ["Workshop pickup", "Shipping"],
        },
      },
    },
    schemas: {
      // → Service.audience. Who the work is for.
      audience: TODO,
      // → Service.description, in the SAME ORDER as the serviceTwo card
      // ("CAD & design", "CNC machining", "Assembly & finishing"). One or
      // two sentences each: what the customer receives.
      descriptions: [TODO, TODO, TODO] as string[],
      // → Service.termsOfService, a URL.
      termsOfServiceUrl: TODO,
      pageDates: { published: TODO, modified: TODO },
    },
  },
  de: {
    metadata: {
      title: "Mein Angebot",
      description:
        "CNC-Fertigungsleistungen in Berlin: Prototypen, Einzelstücke und Kleinserien, von CAD-Design über CNC-Bearbeitung bis Montage und Veredelung.",
    },
    websiteContent: {
      readMore:
        "Ich helfe dabei, Ideen in echte Objekte zu verwandeln: von präzisen Schnitten und komplexen Designs bis hin zu gleichbleibend Einzelteilen.\n\nEgal, ob du eine CAD-Datei, eine Skizze oder einfach nur eine Idee hast: Ich kann dir dabei helfen, herauszufinden, wie sie umgesetzt werden kann, von Design und CNC-Bearbeitung bis hin zu Montage und Nachbearbeitung.\n\nJedes Projekt ist anders, deshalb erstelle ich für jedes Projekt ein individuelles Angebot.\n\nDu kannst deine fertigen Teile in der Werkstatt abholen oder sie dir zuschicken lassen.",
      cards: {
        serviceOne: {
          heading: "CAD Design",
          descriptions: ["Prototypen", "Einzelstücke", "Kleinserien"],
        },
        serviceTwo: {
          heading: "CNC Leistungen",
          descriptions: ["CAD & Design", "CNC-Bearbeitung", "Montage & Veredelung"],
        },
        serviceThree: {
          heading: "Materialien",
          descriptions: ["Wird später beschrieben"],
        },
        serviceFour: {
          heading: "Angebote basieren auf",
          descriptions: ["Material", "Größe & Menge", "Designkomplexität"],
        },
        serviceFive: {
          heading: "Lieferung",
          descriptions: ["Abholung in der Werkstatt", "Versand"],
        },
      },
    },
    schemas: {
      audience: TODO,
      descriptions: [TODO, TODO, TODO] as string[],
      termsOfServiceUrl: TODO,
      pageDates: { published: TODO, modified: TODO },
    },
  },
};
