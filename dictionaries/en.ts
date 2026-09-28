// English dictionary — the source-of-truth wording; German (de.ts) is a
// drafted translation of this. Keep both files' shapes identical (see the
// Dictionary type below) so a missing German key is a type error, not a
// silent English fallback in a German page.

interface PageMeta {
  // Page portion only — the root layout's title.template appends
  // " · Atelier Cut" automatically. Keep title + " · Atelier Cut" under
  // 60 characters total, and description between 140-160 characters —
  // see P1.2 in SEO-SPEC.md.
  title: string;
  description: string;
}

export interface Dictionary {
  meta: {
    description: string;
    ogLocale: string;
    ogAlternateLocale: string;
  };
  // Per-page <title>/<meta description> — unique per page, each (except
  // privacy, a utility page with no search intent of its own) containing
  // its main term and "Berlin".
  pages: {
    home: PageMeta;
    services: PageMeta;
    workshop: PageMeta;
    contact: PageMeta;
    privacy: PageMeta;
  };
  // TODO: owner copy — one 60-150 word paragraph per page, rendered
  // under the h1 (see P1.4 in SEO-SPEC.md). Drafted from facts already
  // established elsewhere in the site (materials, machine specs,
  // application categories, delivery options, accepted file formats) —
  // no invented tolerances, prices, delivery times or client names.
  // Needs the owner's review before it's final; see the open questions
  // in the P1.4 hand-over.
  intro: {
    home: string;
    services: string;
    workshop: string;
    contact: string;
  };
  nav: {
    home: string;
    services: string;
    workshop: string;
    contact: string;
  };
  footer: {
    privacy: string;
  };
  languageSwitcher: {
    // Label for the link to the OTHER language's equivalent page — e.g.
    // on an English page this reads "Deutsch", linking to /de/...
    label: string;
  };
  services: {
    cards: {
      cuttingServices: { heading: string; items: string[] };
      servicesCanInclude: { heading: string; items: string[] };
      quotesAreBasedOn: { heading: string; items: string[] };
      deliveryOptions: { heading: string; items: string[] };
    };
    note: string;
  };
  workshop: {
    cards: {
      machineCapabilities: { heading: string; items: string[] };
      materials: { heading: string; items: string[] };
      applications: { heading: string; items: string[] };
      technology: { heading: string; items: string[] };
    };
    imageAlt: string;
  };
  contact: {
    fields: {
      company: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      message: string;
      attachment: string;
    };
    attachmentHint: (maxMb: string) => string;
    attachmentTooLarge: (mb: string) => string;
    removeAttachment: string;
    sending: string;
    success: string;
    help: string;
  };
  privacy: {
    title: string;
    paragraphs: string[];
    // Accessible name for the "back to home" link — describes the
    // destination, unlike the Continue graphic itself (an English-only
    // image asset kept as-is on both languages), so this is translated.
    homeLinkLabel: string;
  };
  notFound: {
    heading: string;
    body: string;
  };
}

export const en: Dictionary = {
  meta: {
    description:
      "Custom CNC fabrication in Berlin: CNC milling, CNC cutting and CNC woodworking for your projects.",
    ogLocale: "en_US",
    ogAlternateLocale: "de_DE",
  },
  pages: {
    home: {
      title: "CNC-made design objects & prototypes in Berlin",
      description:
        "Atelier Cut designs and CNC-machines prototypes, unique objects and small production series in Berlin — from a CAD file, sketch or idea to finished part.",
    },
    services: {
      title: "Prototypes, one-offs & small series in Berlin",
      description:
        "CNC machining services in Berlin: prototypes, one-off products and small production series, from CAD design to CNC machining, assembly and finishing.",
    },
    workshop: {
      title: "3-axis CNC workshop in Berlin — 2.2 × 1.5 m",
      description:
        "Inside the CNC workshop in Berlin: a 3-axis machine with a 2.2 × 1.5 m working area, machining wood, aluminium and plastics for acoustics, furniture and art.",
    },
    contact: {
      title: "Request a quote — CNC workshop Berlin",
      description:
        "Request a CNC machining quote in Berlin: send your CAD file, sketch, dimensions, material and quantity — get workshop pickup or shipping options.",
    },
    privacy: {
      title: "Privacy Policy",
      description:
        "How Atelier Cut handles data: no analytics or tracking cookies, contact form messages are sent via Resend, and the site is hosted on Vercel.",
    },
  },
  intro: {
    home: "Atelier Cut is a CNC workshop in Berlin run by Victor Le Fur, designing and machining objects, prototypes and small production series from wood, aluminium and plastics. Work ranges from one-off design pieces and art objects to functional parts for furniture, architecture models and acoustics — including loudspeaker cabinets and acoustic panels. Every project starts from a CAD file, a sketch or just an idea, and is machined in-house on a 3-axis CNC machine before pickup in Berlin or shipping further afield.",
    services: "Every project starts wherever you are: a finished CAD file, a rough sketch, or simply an idea to work out together. From there, Atelier Cut machines one-off pieces, prototypes and small production series in Berlin, matching the process to what you need — a single unique object or a short run of identical parts. Quotes are based on material, size, quantity and design complexity. Once a part is finished, you can pick it up at the workshop in Berlin or have it shipped to you.",
    workshop: "The workshop runs a 3-axis CNC machine with a 2.2 × 1.5 m working area, cutting wood, aluminium and plastics, programmed with grblHAL, Universal Gcode Sender and designed in Fusion 360. It's the machine behind a wide range of projects: loudspeaker cabinets and acoustic panels or diffusers, furniture parts, art pieces and architecture models, alongside prototypes and small production series for design and engineering work.",
    contact: "To request a quote, send a CAD file (DXF, DWG, STEP or STP) or a PDF/image sketch of what you need, along with the dimensions, the material you'd like it made from, and the quantity. The more detail you can share up front, the faster a quote can come back — but if you're not sure yet, a rough sketch and a description are enough to start the conversation.",
  },
  nav: {
    home: "Home",
    services: "Service",
    workshop: "Cutting Salon",
    contact: "Contact",
  },
  footer: {
    privacy: "Privacy",
  },
  languageSwitcher: {
    label: "Deutsch",
  },
  services: {
    cards: {
      cuttingServices: {
        heading: "Cutting Services",
        items: ["Prototypes", "Unique products", "Small production series"],
      },
      servicesCanInclude: {
        heading: "Services Can Include",
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
    note: "Whether you come with a CAD file, a sketch or simply an idea, I can help you figure out how to make it.",
  },
  workshop: {
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
  contact: {
    fields: {
      company: "Company",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      attachment: "Attachment",
    },
    attachmentHint: (maxMb) => `Max ${maxMb} MB.`,
    attachmentTooLarge: (mb) => `The attachment is too large (${mb} MB).`,
    removeAttachment: "Remove attachment",
    sending: "Sending…",
    success: "Thanks for reaching out! I will get back to you soon.",
    help: "If you are experiencing any issues while filling out the form, please email me at victor@gmail.com.",
  },
  privacy: {
    title: "Privacy",
    homeLinkLabel: "Back to Home",
    paragraphs: [
      "This website does not collect or track your personal data and does not use analytics, advertising or tracking cookies.",
      "If you use the contact form, your message and attachments are sent via Resend, an email delivery service, and are not stored in any database.",
      "The website is hosted by Vercel and uses Cloudinary to deliver video content. These providers may process technical information, such as your IP address and browser information, to deliver the website and its content.",
    ],
  },
  notFound: {
    heading: "Page not found",
    body: "The page you are looking for does not exist.",
  },
};