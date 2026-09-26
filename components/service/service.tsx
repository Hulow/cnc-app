// Server Component: the primary on-page copy, rendered as part of the
// initial HTML response so it's readable independently of the video and
// indexable without client-side JavaScript.
export function Service() {
  return (
    <section aria-labelledby="about-heading">
      <div className="service-text">
        <h3>I offer CNC cutting for:</h3>
        <p>
          Prototypes
        </p>
        <p>
        Unique products
        </p>
        <p>
        Small production series
        </p>

        <h3>I can support you with:</h3>

        <p>
        Concept & design
        </p>
        <p>
        CAD
        </p>
        <p>
        CNC machining
        </p>
        <p>
        Assembly
        </p>

        <h3>Pricing based on:</h3>
        <p>
        Volume
        </p>
        <p>
        Material
        </p>
        <p>
        Design complexity
        </p>

        <h3>Delivery</h3>
        <p>Workshop pickup</p>
        <p>
        Shipping
        </p>
        <p>
          <strong>Whether you come with a finished CAD file, a sketch or simply an idea, I can help you figure out how to make it.</strong>
        </p>
      </div>
    </section>
  );
}
