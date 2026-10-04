export interface CardLogo {
  src: string;
  width: number;
  height: number;
}

interface CardProps {
  heading: string;
  logo: CardLogo;
  descriptions: readonly string[];
}

// Server Component: a <details>/<summary> disclosure, closed by default.
// The descriptions stay in the initial HTML either way — <details> itself
// hides everything but the summary until opened — so this needs no client
// JavaScript to open/close, and no JavaScript at all to stay readable by
// crawlers and no-JS clients.
export function Card({ heading, logo, descriptions }: CardProps) {
  return (
    <details className="card">
      <summary className="card-header">
        <h2>
          {/* Real text node for crawlers/SEO; the logo stays the visible
              heading — same technique as before the card-grid/card split. */}
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
        </h2>
        <span aria-hidden="true" className="card-toggle" />
      </summary>
      <div className="card-content">
        <ul>
          {descriptions.map((description) => (
            <li className="card-content-item" key={description}>
              {description}
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
