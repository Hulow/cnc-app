import { TODO } from "../shared/seo/todo";

// Language-dependent content the structured data (shared/seo/schema-org.ts)
// can use but the site doesn't state yet — English and German side by side,
// like ./meta.ts. Language-independent facts (phone, coordinates, dates…)
// are in ./business.ts instead.
//
// Everything set to `TODO` is left out of the JSON-LD until it has a real
// value. Fill each one in AND show it on the page named in its comment —
// search engines expect markup to match visible content.
export const schema = {
  en: {
    // → ProfessionalService.slogan. One short tagline.
    // Shown on: home (under the logo/heading).
    slogan: TODO,
    person: {
      // → Person.jobTitle, e.g. "CNC machinist and designer".
      // Shown on: workshop ("who I am").
      jobTitle: TODO,
      // → Person.description. Two or three sentences about you and your
      // background. Shown on: workshop.
      description: TODO,
    },
    services: {
      // → Service.audience. Who the work is for — e.g. "People in acoustics,
      // audio, art, furniture and design." Shown on: services.
      audience: TODO,
      // → Service.description, in the SAME ORDER as the services card
      // ("CAD & design", "CNC machining", "Assembly & finishing"). One or
      // two sentences each: what the customer receives. Shown on: services
      // (under each service).
      descriptions: [TODO, TODO, TODO] as string[],
    },
  },
  de: {
    slogan: TODO,
    person: {
      jobTitle: TODO,
      description: TODO,
    },
    services: {
      audience: TODO,
      descriptions: [TODO, TODO, TODO] as string[],
    },
  },
};
