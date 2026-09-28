import Link from "next/link";
import { en } from "@/dictionaries/en";
import { routes } from "@/shared/routes";

export default function NotFound() {
  return (
    <div>
      <h2>{en.notFound.heading}</h2>
      <p>{en.notFound.body}</p>
      <nav aria-label="Main pages">
        <ul>
          <li>
            <Link href={routes.home.en}>{en.nav.home}</Link>
          </li>
          <li>
            <Link href={routes.services.en}>{en.nav.services}</Link>
          </li>
          <li>
            <Link href={routes.workshop.en}>{en.nav.workshop}</Link>
          </li>
          <li>
            <Link href={routes.contact.en}>{en.nav.contact}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
