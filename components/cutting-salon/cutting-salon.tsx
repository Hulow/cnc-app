import Image from "next/image";
import type { CSSProperties } from "react";

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
      <div
        className="cutting-salon-grid"
        style={
          {
            "--card-heading-logo-max-ratio": MAX_LOGO_ASPECT_RATIO,
          } as CSSProperties
        }
      >
        <div className="cutting-salon-card">
          <h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/salon/machine-capabilities.svg"
              alt="Machine Capabilities"
              width={348}
              height={23}
              className="card-heading-logo"
            />
          </h3>
          <div className="cutting-salon-item">Working area: 2.2m × 1.5m</div>
          <div className="cutting-salon-item">3 axis CNC</div>
        </div>

        <div className="cutting-salon-card">
          <h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/salon/materials.svg"
              alt="Materials"
              width={179}
              height={23}
              className="card-heading-logo"
            />
          </h3>
          <div className="cutting-salon-item">Wood</div>
          <div className="cutting-salon-item">Aluminium</div>
          <div className="cutting-salon-item">Plastics</div>
        </div>

        <div className="cutting-salon-card">
          <h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/salon/applications.svg"
              alt="Applications"
              width={224}
              height={23}
              className="card-heading-logo"
            />
          </h3>
          <div className="cutting-salon-item">Art</div>
          <div className="cutting-salon-item">Acoustics</div>
          <div className="cutting-salon-item">Design</div>
          <div className="cutting-salon-item">Architecture</div>
          <div className="cutting-salon-item">Furniture</div>
          <div className="cutting-salon-item">Engineering</div>
          <div className="cutting-salon-item">Beyond</div>
        </div>

        <div className="cutting-salon-card">
          <h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/salon/technology.svg"
              alt="Technology"
              width={199}
              height={23}
              className="card-heading-logo"
            />
          </h3>
          <div className="cutting-salon-item">ESP32 · Dual-core 32-bit</div>
          <div className="cutting-salon-item">grblHAL</div>
          <div className="cutting-salon-item">Universal Gcode Sender</div>
          <div className="cutting-salon-item">Fusion 360</div>
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