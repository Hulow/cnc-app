import { BackgroundVideo } from "@/components/background-video";
import { Contact } from "@/components/contact";
import { Logo } from "@/components/logo";
import { ProjectDescription } from "@/components/project-description";
import { StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      <StructuredData />
      <BackgroundVideo />
      <div className="content-layer page-content">
        <header>
          <Logo />
        </header>
        <main>
          <h1>{siteConfig.name}</h1>
          <ProjectDescription />
          <Contact />
        </main>
        <footer>
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name} — CNC-Fertigung
            in {siteConfig.serviceArea}
          </p>
        </footer>
      </div>
    </>
  );
}
