// Server Component: the primary on-page copy, rendered as part of the
// initial HTML response so it's readable independently of the video and
// indexable without client-side JavaScript.
export function Service() {
  return (
    <section aria-labelledby="about-heading">
      <div className="service-grid">
        <div className="service-card">
          <h3>I offer CNC cutting for:</h3>
          <ul>
            <li>Prototypes</li>
            <li>Unique products</li>
            <li>Small production series</li>
          </ul>
        </div>

        <div className="service-card">
          <h3>I can support you with:</h3>
          <ul>
            <li>Concept & design</li>
            <li>CAD</li>
            <li>CNC machining</li>
            <li>Assembly</li>
          </ul>
        </div>

        <div className="service-card">
          <h3>Pricing based on:</h3>
          <ul>
            <li>Volume</li>
            <li>Material</li>
            <li>Design complexity</li>
          </ul>
        </div>

        <div className="service-card">
          <h3>Delivery</h3>
          <ul>
            <li>Workshop pickup</li>
            <li>Shipping</li>
          </ul>
        </div>
      </div>
      <p className="service-note">
        <strong>Whether you come with a finished CAD file, a sketch or simply an idea, I can help you figure out how to make it.</strong>
      </p>
    </section>
  );
}
