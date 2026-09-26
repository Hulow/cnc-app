import Image from "next/image";

// Server Component: same rendering rationale as Service — see that file.
export function CuttingSalon() {
  return (
    <section aria-labelledby="cutting-salon-heading">
      <div className="cutting-salon-grid">
        <div className="cutting-salon-card">
          <h3>Machine capabilities</h3>
          <div className="cutting-salon-item">Working area: 2.2 m × 1.5 m</div>
          <div className="cutting-salon-item">Material thickness: ≤ 100 mm</div>
          <div className="cutting-salon-item">3 axis CNC</div>
        </div>

        <div className="cutting-salon-card">
          <h3>Materials</h3>
          <div className="cutting-salon-item">Wood</div>
          <div className="cutting-salon-item">Aluminium</div>
        </div>

        <div className="cutting-salon-card">
          <h3>Applications</h3>
          <div className="cutting-salon-item">Art</div>
          <div className="cutting-salon-item">Acoustics</div>
          <div className="cutting-salon-item">Design</div>
          <div className="cutting-salon-item">Architecture</div>
          <div className="cutting-salon-item">Furniture</div>
          <div className="cutting-salon-item">Engineering</div>
          <div className="cutting-salon-item">Beyond</div>
        </div>

        <div className="cutting-salon-card">
          <h3>Technology</h3>
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
