import { Contact } from "@/components/contact/contact";
import { ExperienceGate } from "@/components/experience-gate/experience-gate";
import { Logo } from "@/components/logo/logo";
import { Navbar } from "@/components/navbar/navbar";
import { ProjectDescription } from "@/components/project-description/project-description";
import { StructuredData } from "@/components/structured-data/structured-data";
import { siteConfig } from "@/shared/site-config";

export default function Home() {
  return (
    <>
      <StructuredData />
      <ExperienceGate>
        <div className="content-layer page-content">
          <header>
            <Logo />
            <Navbar />
          </header>
          <main>
            <h1 className="sr-only">{siteConfig.name}</h1>
            <ProjectDescription />
            <Contact />
          </main>
          <footer>
            <p>
              &copy; {new Date().getFullYear()} -  Victor Le Fur -
              Design & fabrication in {siteConfig.serviceArea}
            </p>
          </footer>
        </div>
      </ExperienceGate>
    </>
  );
}
