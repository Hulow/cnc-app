import { NotFoundPanel } from "@/components/not-found-panel/not-found-panel";
import { en } from "@/dictionaries/en";
import { routes } from "@/shared/routes";

export default function NotFound() {
  return <NotFoundPanel dict={en} homeHref={routes.home.en} />;
}
