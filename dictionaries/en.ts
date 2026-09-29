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
    impressum: PageMeta;
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
    impressum: string;
  };
  services: {
    cards: {
      cuttingServices: { heading: string; items: string[] };
      servicesCanInclude: { heading: string; items: string[] };
      quotesAreBasedOn: { heading: string; items: string[] };
      deliveryOptions: { heading: string; items: string[] };
    };
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
  // TODO: owner content — real German Impressum facts (§ 5 TMG), not
  // drafted by the agent (see P1.7 in SEO-SPEC.md). Only `name`,
  // `email` and `address` are filled in, because those are already
  // public elsewhere on the site (footer, contact page) — not new
  // facts. Everything else the law actually requires (phone,
  // VAT ID/Kleinunternehmer note, register entry if any) is `placeholder`
  // because it doesn't exist anywhere in this codebase to reuse.
  impressum: {
    title: string;
    fields: {
      name: string;
      address: string;
      email: string;
      phone: string;
      vatId: string;
      responsibleContent: string;
    };
    placeholder: string;
    homeLinkLabel: string;
  };
  notFound: {
    heading: string;
    body: string;
    homeLinkLabel: string;
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
      title: "CNC cutting services in Berlin",
      description:
        "Atelier Cut designs and CNC-machines prototypes, unique objects and small production series in Berlin — from a CAD file, sketch or idea to finished part.",
    },
    services: {
      title: "What I Offer",
      description:
        "CNC machining services in Berlin: prototypes, one-off products and small production series, from CAD design to CNC machining, assembly and finishing.",
    },
    workshop: {
      title: "Inside the Atelier",
      description:
        "Inside the CNC workshop in Berlin: a 3-axis machine with a 2.2 × 1.5 m working area, machining wood, aluminium and plastics for acoustics, furniture art, architecture, engineering and beyond.",
    },
    contact: {
      title: "Request a quote",
      description:
        "Request a CNC machining quote in Berlin: send your CAD file, sketch, dimensions, material and quantity — get workshop pickup or shipping options.",
    },
    privacy: {
      title: "Privacy Policy",
      description:
        "How Atelier Cut handles data: no analytics or tracking cookies, contact form messages are sent via Resend, and the site is hosted on Vercel.",
    },
    impressum: {
      title: "Legal Notice",
      description: "Legal notice (Impressum) for Atelier Cut, required under German law.",
    },
  },
  intro: {
    home: "I run a CNC workshop in Berlin, next to Ostkreuz, inside the Coppi community. I help companies, designers, and individuals turn ideas into real objects: precise cuts, complex designs, and consistent quality, thanks to automated machining. \n\n Whether you have a finished file or just a sketch, you can talk to me directly. No minimum order, flexible on timing, and I reply fast. One prototype or a small series, I'll help you get it done quickly. \n\n Send me your project, or come by the workshop.",
    services: "I help turn ideas into real objects, from precise cuts and complex designs to consistent, repeatable parts.\n\nWhether you have a CAD file, a sketch, or simply an idea, I can help you figure out how to make it, from design and CNC machining to assembly and finishing.\n\nEvery project is different, so I quote each one individually.\n\nPick up your parts at the workshop or have them shipped to you.",
    workshop: "The machine has 3 axes and a 2.2 × 1.5 m working area.\n\nWith full control over spindle speed, feed rate and tooling, I can machine a wide variety of woods, aluminium and plastics.\n\nI'm open to projects of all kinds, for clients across Berlin and Germany.",
    contact:
      "To request a quote, send me your project by email or through the form below. It helps to include:\n\n- A CAD file (DXF, DWG or STEP) or a sketch as a PDF or image\n- The dimensions\n- The material you'd like to use\n- The quantity.\n\nThe more details you share, the faster I can get back to you.\n\nNot sure about everything yet? Even if you only have a rough idea, or nothing at all, just get in touch and we'll figure it out together.",
  },
  nav: {
    home: "Home",
    services: "Service",
    workshop: "Cutting Salon",
    contact: "Contact",
  },
  footer: {
    privacy: "Privacy",
    impressum: "Legal Notice",
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
    attachmentHint: (maxMb) => `Max ${maxMb} MB`,
    attachmentTooLarge: (mb) => `The attachment is too large (${mb} MB).`,
    removeAttachment: "Remove attachment",
    sending: "Sending…",
    success: "Thanks for reaching out! I will get back to you soon.",
    help: "If you are experiencing any issues while filling out the form, please email me at victor@atelier-cut.com.",
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
  impressum: {
    title: "Legal Notice",
    fields: {
      name: "Name",
      address: "Address",
      email: "Email",
      phone: "Phone",
      vatId: "VAT ID",
      responsibleContent: "Responsible for content (§ 18 (2) MStV)",
    },
    placeholder: "TODO — to be confirmed by the owner",
    homeLinkLabel: "Back to Home",
  },
  notFound: {
    heading: "Page not found",
    body: "The page you are looking for does not exist.",
    homeLinkLabel: "Continue",
  },
};