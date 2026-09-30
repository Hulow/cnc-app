// Contact page (app/(en)/contact/page.tsx, app/[lang]/kontakt/page.tsx) —
// also feeds components/contact/contact-form.tsx's fields and messages.
export const contactPage = {
  metaTitle: "Request a quote",
  metaDescription:
    "Request a CNC machining quote in Berlin: send your CAD file, sketch, dimensions, material and quantity — get workshop pickup or shipping options.",
  // TODO: owner copy — see P1.4 in SEO-SPEC.md.
  intro:
    "To request a quote, send me your project by email or through the form below. It helps to include:\n\n- A CAD file (DXF, DWG or STEP) or a sketch as a PDF or image\n- The dimensions\n- The material you'd like to use\n- The quantity.\n\nThe more details you share, the faster I can get back to you.\n\nNot sure about everything yet? Even if you only have a rough idea, or nothing at all, just get in touch and we'll figure it out together.",
  fields: {
    company: "Company",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    attachment: "Attachment",
  },
  attachmentHint: (maxMb: string) => `Max ${maxMb} MB`,
  attachmentTooLarge: (mb: string) => `The attachment is too large (${mb} MB).`,
  removeAttachment: "Remove attachment",
  sending: "Sending…",
  success: "Thanks for reaching out! I will get back to you soon.",
  help: "If you are experiencing any issues while filling out the form, please email me at victor@atelier-cut.com.",
};
