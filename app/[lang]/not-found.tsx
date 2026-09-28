import Link from "next/link";
import { de } from "@/dictionaries/de";
import { routes } from "@/shared/routes";

export default function GermanNotFound() {
  return (
    <div>
      <h2>{de.notFound.heading}</h2>
      <p>{de.notFound.body}</p>
      <nav aria-label="Hauptseiten">
        <ul>
          <li>
            <Link href={routes.home.de}>{de.nav.home}</Link>
          </li>
          <li>
            <Link href={routes.services.de}>{de.nav.services}</Link>
          </li>
          <li>
            <Link href={routes.workshop.de}>{de.nav.workshop}</Link>
          </li>
          <li>
            <Link href={routes.contact.de}>{de.nav.contact}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
