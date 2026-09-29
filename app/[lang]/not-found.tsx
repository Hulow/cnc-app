import { NotFoundPanel } from "@/components/not-found-panel/not-found-panel";
import { en } from "@/dictionaries/en";
import { routes } from "@/shared/routes";

// English-only by design (see NotFoundPanel's comment) — even under the
// /de section, a 404 renders the same English panel and links back to
// the English home page, rather than a separate German 404.
export default function GermanNotFound() {
  return <NotFoundPanel dict={en} homeHref={routes.home.en} />;
}
