// Services page (app/(en)/services/page.tsx, app/[lang]/leistungen/page.tsx)
// — also feeds components/service/service.tsx's card grid and
// shared/structured-data.ts's itemList.
export const servicesPage = {
  metaTitle: "What I Offer",
  metaDescription:
    "CNC machining services in Berlin: prototypes, one-off products and small production series, from CAD design to CNC machining, assembly and finishing.",
  // TODO: owner copy — see P1.4 in SEO-SPEC.md.
  intro:
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
};
