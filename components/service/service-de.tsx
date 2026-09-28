import type { Dictionary } from "@/dictionaries/en";
import { ReadMoreButton } from "@/components/read-more-button/read-more-button";

interface ServiceDeProps {
  dict: Pick<Dictionary, "services" | "pages" | "intro">;
}

// German equivalent of Service (components/service/service.tsx). The
// English cards use SVG image headings (English-only assets — see P1.1
// in SEO-SPEC.md); rather than block on new German artwork, this renders
// real text headings instead, per the spec's own recommended option. No
// --card-heading-logo-max-ratio var needed here: unlike the image
// headings it replaces, a text h2 already uses the page's normal fluid
// font-size (see .service-card h2 in globals.css) with nothing to scale
// or overflow.
export function ServiceDe({ dict }: ServiceDeProps) {
  const { cards, note } = dict.services;

  return (
    <section aria-labelledby="about-heading">
      <div className="page-heading-row">
        <h1 id="about-heading">{dict.pages.services.title}</h1>
        {/* TODO: owner copy — see dictionaries/de.ts's intro.services comment */}
        <ReadMoreButton text={dict.intro.services} />
      </div>
      <div className="service-grid">
        {Object.values(cards).map(({ heading, items }) => (
          <div className="service-card" key={heading}>
            <h2>{heading}</h2>
            <ul>
              {items.map((item) => (
                <li className="service-item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="service-note">
        <strong>{note}</strong>
      </p>
    </section>
  );
}
