// English dictionary — the source-of-truth wording; German (de.ts) is a
// drafted translation of this. Keep both files' shapes identical (see the
// Dictionary type below) so a missing German key is a type error, not a
// silent English fallback in a German page.

export interface Dictionary {
  meta: {
    description: string;
    ogLocale: string;
    ogAlternateLocale: string;
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
