import Image from "next/image";
import type { CSSProperties } from "react";
import { en } from "@/dictionaries/en";

// Widest heading logo below (machine-capabilities.svg, 348x23) — feeds
// .card-heading-logo's shrink formula in globals.css so every heading in
// this grid shrinks by the same factor if the grid gets too narrow for
// this one, instead of only this one shrinking. Keep in sync with the
// img width/height attributes below.
const MAX_LOGO_ASPECT_RATIO = 348 / 23;

// Server Component: same rendering rationale as Service — see that file.
export function CuttingSalon() {
  return (
    <section aria-labelledby="cutting-salon-heading">
      <h1 id="cutting-salon-heading">{en.pages.workshop.title}</h1>
      {/* TODO: owner copy — see dictionaries/en.ts's intro.workshop comment */}
      <p className="page-intro">{en.intro.workshop}</p>
      <div
        className="cutting-salon-grid"
        style={
          {
            "--card-heading-logo-max-ratio": MAX_LOGO_ASPECT_RATIO,
          } as CSSProperties
        }
      >
        <div className="cutting-salon-card">
          <h2>
            {/* Real text node for crawlers/SEO (see P1.3 in
                SEO-SPEC.md); the SVG stays the visible heading — same
                technique on every card below. */}
            <span className="sr-only">Machine Capabilities</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/salon/machine-capabilities.svg"
              alt=""
              aria-hidden="true"
              width={348}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            <li className="cutting-salon-item">Working area: 2.2m × 1.5m</li>
            <li className="cutting-salon-item">3 axis CNC</li>
          </ul>
        </div>

        <div className="cutting-salon-card">
          <h2>
            <span className="sr-only">Materials</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/salon/materials.svg"
              alt=""
              aria-hidden="true"
              width={179}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            <li className="cutting-salon-item">Wood</li>
            <li className="cutting-salon-item">Aluminium</li>
            <li className="cutting-salon-item">Plastics</li>
          </ul>
        </div>

        <div className="cutting-salon-card">
          <h2>
            <span className="sr-only">Applications</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/salon/applications.svg"
              alt=""
              aria-hidden="true"
              width={224}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            <li className="cutting-salon-item">Art</li>
            <li className="cutting-salon-item">Acoustics</li>
            <li className="cutting-salon-item">Design</li>
            <li className="cutting-salon-item">Architecture</li>
            <li className="cutting-salon-item">Furniture</li>
            <li className="cutting-salon-item">Engineering</li>
            <li className="cutting-salon-item">Beyond</li>
          </ul>
        </div>

        <div className="cutting-salon-card">
          <h2>
            <span className="sr-only">Technology</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/salon/technology.svg"
              alt=""
              aria-hidden="true"
              width={199}
              height={23}
              className="card-heading-logo"
            />
          </h2>
          <ul>
            <li className="cutting-salon-item">ESP32 · Dual-core 32-bit</li>
            <li className="cutting-salon-item">grblHAL</li>
            <li className="cutting-salon-item">Universal Gcode Sender</li>
            <li className="cutting-salon-item">Fusion 360</li>
          </ul>
        </div>
      </div>
      <Image
        src="/cnc.jpg"
        alt="CNC machine cutting material"
        width={4032}
        height={3024}
        className="cutting-salon-image"
      />
    </section>
  );
}
