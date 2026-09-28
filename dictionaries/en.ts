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
