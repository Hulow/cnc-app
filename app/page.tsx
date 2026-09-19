import { BackgroundVideo } from "@/components/background-video";
import { Contact } from "@/components/contact";
import { Logo } from "@/components/logo";
import { ProjectDescription } from "@/components/project-description";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      <BackgroundVideo />
      <header className="content-layer">
        <Logo />
      </header>
      <main className="content-layer">
        <h1>{siteConfig.name}</h1>
        <ProjectDescription />
        <Contact />
      </main>
    </>
  );
}
