import Image from "next/image";

// Server Component: same rendering rationale as Service — see that file.
export function CuttingSalon() {
  return (
    <section aria-labelledby="cutting-salon-heading">
      <div className="cutting-salon-text">
        <h3>CNC size</h3>
          <p>2.2 × 1.5 m</p>
        <h3>Materials used</h3>
          <p>Wood</p>
          <p>Aluminium</p>
        <h3>Open to projects across</h3>
          <p>Art</p>
          <p>Acoustic</p>
          <p>Design</p>
          <p>Architecture</p>
          <p>Furniture</p>
          <p>Engineering</p>
          <p>and beyond</p>
        <h3>Hardware & Software</h3>
        <p>ESP32 · Dual-core 32-bit</p>
        <p>grblHAL G-code parser</p>
        <p>Fusion 360</p>
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
