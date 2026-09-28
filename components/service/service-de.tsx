import type { Dictionary } from "@/dictionaries/en";

interface ServiceDeProps {
  dict: Pick<Dictionary, "services">;
}

// German equivalent of Service (components/service/service.tsx). The
// English cards use SVG image headings (English-only assets — see P1.1
// in SEO-SPEC.md); rather than block on new German artwork, this renders
// real text headings instead, per the spec's own recommended option. No
// --card-heading-logo-max-ratio var needed here: unlike the image
// headings it replaces, a text h3 already uses the page's normal fluid
// font-size (see .service-card h3 in globals.css) with nothing to scale
// or overflow.
export function ServiceDe({ dict }: ServiceDeProps) {
  const { cards, note } = dict.services;

  return (
    <section aria-labelledby="about-heading">
      <div className="service-grid">
        {Object.values(cards).map(({ heading, items }) => (
          <div className="service-card" key={heading}>
            <h3>{heading}</h3>
            {items.map((item) => (
              <div className="service-item" key={item}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="service-note">
        <strong>{note}</strong>
      </p>
    </section>
  );
}
