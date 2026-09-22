// Server Component: the primary on-page copy, rendered as part of the
// initial HTML response so it's readable independently of the video and
// indexable without client-side JavaScript.
export function ProjectDescription() {
  return (
    <section aria-labelledby="about-heading">
      <h2 id="about-heading">From concept and design to realisation</h2>
      <p>
      From prototyping and unique products to small production series, I can take care of as much or as little of the process as needed.
      </p>
      <p>
      From concept and design to CAD, CNC machining and assembly, I can handle only the parts you need.
      </p>
      <p>
      I work primarily with wood and aluminium and am open to projects across art, audio, design, architecture, furniture, engineering and beyond.
      </p>
      <p>
      Whether you come with a finished CAD file, a sketch or simply an idea, I can help you figure out how to make it.
      </p>    
    </section>
  );
}
