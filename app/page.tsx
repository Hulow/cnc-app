import { BackgroundVideo } from "@/components/background-video";
import { Logo } from "@/components/logo";
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
        <p>Site content coming soon.</p>
      </main>
    </>
  );
}
