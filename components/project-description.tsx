// Server Component: the primary on-page copy, rendered as part of the
// initial HTML response so it's readable independently of the video and
// indexable without client-side JavaScript.
export function ProjectDescription() {
  return (
    <section aria-labelledby="about-heading">
      <h2 id="about-heading">Individuelle CNC-Fertigung in Berlin</h2>
      <p>
        Wir bieten individuelle CNC-Fertigung für Holz, Kunststoff und Metall
        an — von der ersten Zeichnung bis zum fertigen Bauteil. Unser
        Schwerpunkt liegt auf präzisem CNC Fräsen in Berlin für Prototypen,
        Kleinserien und Sonderanfertigungen.
      </p>
      <p>
        Neben klassischer CNC Fertigung in Berlin realisieren wir CNC
        Holzfräsen für Möbel- und Innenausbauprojekte sowie präzisen CNC
        Zuschnitt für Platten- und Flächenmaterial. Jedes Projekt wird
        individuell geplant und eng mit unseren Kundinnen und Kunden
        abgestimmt.
      </p>
    </section>
  );
}
