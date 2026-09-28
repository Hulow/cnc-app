import Image from "next/image";
import type { Dictionary } from "@/dictionaries/en";

interface CuttingSalonDeProps {
  dict: Pick<Dictionary, "workshop" | "pages">;
}

// German equivalent of CuttingSalon (components/cutting-salon/cutting-salon.tsx)
// — see the comment on ServiceDe (components/service/service-de.tsx) for
// why this uses real text headings instead of the English-only SVG
// image headings.
export function CuttingSalonDe({ dict }: CuttingSalonDeProps) {
  const { cards, imageAlt } = dict.workshop;

  return (
    <section aria-labelledby="cutting-salon-heading">
      <h1 id="cutting-salon-heading">{dict.pages.workshop.title}</h1>
      <div className="cutting-salon-grid">
        {Object.values(cards).map(({ heading, items }) => (
          <div className="cutting-salon-card" key={heading}>
            <h2>{heading}</h2>
            <ul>
              {items.map((item) => (
                <li className="cutting-salon-item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Image
        src="/cnc.jpg"
        alt={imageAlt}
        width={4032}
        height={3024}
        className="cutting-salon-image"
      />
    </section>
  );
}
