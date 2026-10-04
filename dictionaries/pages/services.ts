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
          descriptions: [
            "I help you develop your project from the initial idea to a design that meets your expectations, budget, and technical requirements.", 
            "Together, we can explore sketches, 3D models, visualisations, materials, aesthetics, production methods, costs, and feasibility.", 
            "A tailored approach to turn your ideas into something that can actually be made."
          ],
        },
        serviceTwo: {
          heading: "CNC Machining",
          descriptions: [
            "I bring your ideas to life in my workshop near Ostkreuz.", 
            "I create custom furniture, kitchens, signs, decorative pieces, sculptures, interior elements, prototypes, and small series.", 
            "I combine modern 2D cutting and 3D milling techniques with traditional craftsmanship to achieve precise results and a high-quality, durable finish."
          ],
        },
        serviceThree: {
          heading: "Materials",
          descriptions: [
            "Solid wood, plywood, MDF, plastics, polyurethane foam, acrylic, Corian, Forex, Trespa, HPL, melamine, Dibond, plaster, Styrofoam...",
            "For logistical reasons and to ensure consistent quality, I generally prefer to supply the materials myself. However, this is of course something we can discuss together.",
            "Can’t find the material you’re looking for in the list? I love experimenting with new materials and techniques. Get in touch and let’s see what we can create together."
          ],
        },
        serviceFour: {
          heading: "Quotes Based On",
          descriptions: [
            "Digital cutting and machining is priced based on machine time, the chosen material, and the quantity to be produced.", 
            "Additional charges may apply for handling, tool changes, or machine calibration when working with pre-cut parts.", 
            "Send me your file and any relevant information to receive a precise, fixed quote."
          ],
        },
        serviceFive: {
          heading: "Delivery",
          descriptions: [
            "I usually complete your cuts within 3 to 5 business days for commonly available materials.", 
            "Pick up your parts at the workshop or have them shipped to you."
          ],
        },
      },
    },
    schemas: {
      // → Service.audience, shared by every card's Service entity.
      audience: TODO,
      // → Service.termsOfService, a URL.
      termsOfServiceUrl: TODO,
      pageDates: { published: "2026-09-19", modified: "2026-10-05" },
      knowsAbout: [
        "Solid wood",
        "Plywood",
        "MDF",
        "Plastics",
        "Polyurethane foam",
        "Acrylic",
        "Corian",
        "Forex",
        "Trespa",
        "HPL",
        "Melamine",
        "Dibond",
        "Plaster",
        "Styrofoam"
      ],
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
          descriptions: [
            "Ich unterstütze Sie bei der Entwicklung Ihres Projekts, damit es Ihren Vorstellungen und Ihrem Budget entspricht.", 
            "Ich begleite Sie bei der Ideenfindung, von ersten Skizzen über 3D-Simulationen und Renderings bis hin zu Fragen der Fertigung, Ästhetik, Materialien, Kosten und Machbarkeit.", 
            "Eine individuelle Begleitung, um Ihre Zufriedenheit zu gewährleisten. "
          ],
        },
        serviceTwo: {
          heading: "CNC Leistungen",
          descriptions: [
            "Ich bringe Ihre Ideen in meiner Werkstatt in der Nähe des Ostkreuz zum Leben.", 
            "Ich fertige individuelle Möbel, Küchen, Schilder, Dekorationen, Skulpturen, Einrichtungselemente, Prototypen und Kleinserien.", 
            "Ich kombiniere moderne 2D-Schneid- und 3D-Frästechniken mit traditionellem Handwerk, um präzise Ergebnisse und eine hochwertige, langlebige Ausführung zu erzielen."
          ],
        },
        serviceThree: {
          heading: "Materialien",
          descriptions: [
            "Massivholz, Multiplex, MDF, Kunststoffe, Polyurethanschaum, Acrylglas, Corian, Forex, Trespa, HPL, Melamin, Dibond, Gips, Styropor ...",
            "Aus logistischen Gründen und um eine gleichbleibende Qualität zu gewährleisten, stelle ich das Material grundsätzlich lieber selbst zur Verfügung. Natürlich können wir das aber gemeinsam besprechen.",
            "Das gewünschte Material ist nicht in der Liste? Ich probiere gerne neue Materialien und Techniken aus. Schreib mir einfach und wir schauen gemeinsam, was wir daraus machen können."
      ],
        },
        serviceFour: {
          heading: "Angebote basieren auf",
          descriptions: [
            "CNC-Schneiden und -Fräsen wird auf Grundlage der Maschinenzeit, des gewählten Materials und der zu produzierenden Stückzahl berechnet.", 
            "Zusätzliche Kosten können für die Handhabung, Werkzeugwechsel oder die Kalibrierung der Maschine bei der Bearbeitung bereits zugeschnittener Werkstücke anfallen.", 
            "Sende mir deine Datei und alle relevanten Informationen, um ein präzises und verbindliches Angebot zu erhalten."
          ],
        },
        serviceFive: {
          heading: "Lieferung",
          descriptions: [
            "Ich fertige Ihre Zuschnitte bei gängigen Materialien in der Regel innerhalb von 3 bis 5 Werktagen an.", 
            "Sie können Ihre Teile in der Werkstatt abholen oder sich zuschicken lassen."
          ],
        },
      },
    },
    schemas: {
      audience: TODO,
      termsOfServiceUrl: TODO,
      pageDates: { published: "2026-09-19", modified: "2026-10-04" },
      knowsAbout: [
        "Massivholz",
        "Multiplex",
        "MDF",
        "Kunststoffe",
        "Polyurethanschaum",
        "Acrylglas",
        "Corian",
        "Forex",
        "Trespa",
        "HPL",
        "Melamin",
        "Dibond",
        "Gips",
        "Styropor"
      ],
    },
  },
};
