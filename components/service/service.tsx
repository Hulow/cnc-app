// Server Component: the primary on-page copy, rendered as part of the
// initial HTML response so it's readable independently of the video and
// indexable without client-side JavaScript.
export function Service() {
  return (
    <section aria-labelledby="about-heading">
      <div className="service-grid">
        <div className="service-card">
          <h3>Cutting services</h3>
          <div className="service-item">Prototypes</div>
          <div className="service-item">Unique products</div>
          <div className="service-item">Small production series</div>
        </div>

        <div className="service-card">
          <h3>Services can include</h3>
          <div className="service-item">CAD & design</div>
          <div className="service-item">CNC machining</div>
          <div className="service-item">Assembly & finishing</div>
        </div>

        <div className="service-card">
          <h3>Quotes are based on</h3>
          <div className="service-item">Material</div>
          <div className="service-item">Size & quantity</div>
          <div className="service-item">Design complexity</div>
        </div>

        <div className="service-card">
          <h3>Delivery options</h3>
          <div className="service-item">Workshop pickup</div>
          <div className="service-item">Shipping</div>
        </div>
      </div>
      <p className="service-note">
        <strong>Whether you come with a CAD file, a sketch or simply an idea, I can help you figure out how to make it.</strong>
      </p>
    </section>
  );
}
