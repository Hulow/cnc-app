import type { ReactNode } from "react";

export interface CardLogo {
  src: string;
  width: number;
  height: number;
}

interface CardProps {
  heading: string;
  // Services/Cutting Salon always pass a logo wordmark (the visible
  // heading, with `heading` itself kept as sr-only real text — see
  // below). Contact's cards have no artwork of their own, so this is
  // optional: without it, `heading` renders as plain visible text
  // instead.
  logo?: CardLogo;
  // Plain bullet content (Services/Cutting Salon). Mutually exclusive
  // with `children` below — pass one or the other.
  descriptions?: readonly string[];
  // Arbitrary content (Contact's form card) for callers whose content
  // isn't a flat list of strings. Ignored when `descriptions` is set.
  children?: ReactNode;
}

// Server Component: a <details>/<summary> disclosure, closed by default.
// The content stays in the initial HTML either way — <details> itself
// hides everything but the summary until opened — so this needs no client
// JavaScript to open/close, and no JavaScript at all to stay readable by
// crawlers and no-JS clients.
export function Card({ heading, logo, descriptions, children }: CardProps) {
  return (
    <details className="card">
      <summary className="card-header">
        <h2>
          {logo ? (
            <>
              {/* Real text node for crawlers/SEO; the logo stays the
                  visible heading — same technique as before the
                  card-grid/card split. */}
              <span className="sr-only">{heading}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt=""
                aria-hidden="true"
                width={logo.width}
                height={logo.height}
                className="card-heading-logo"
              />
            </>
          ) : (
            heading
          )}
        </h2>
        <span aria-hidden="true" className="card-toggle" />
      </summary>
      <div className="card-content">
        {descriptions ? (
          <ul>
            {descriptions.map((description) => (
              <li className="card-content-item" key={description}>
                {description}
              </li>
            ))}
          </ul>
        ) : (
          children
        )}
      </div>
    </details>
  );
}
