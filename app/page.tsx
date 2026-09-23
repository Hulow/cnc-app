import { ExperienceGate } from "@/components/experience-gate/experience-gate";
import { Logo } from "@/components/logo/logo";
import { PageView } from "@/components/page-view/page-view";
import { ProjectDescription } from "@/components/project-description/project-description";
import { StructuredData } from "@/components/structured-data/structured-data";
import { siteConfig } from "@/shared/site-config";

export default function Home() {
  return (
    <>
      <StructuredData />
      <ExperienceGate>
        <PageView
          logo={<Logo />}
          service={<ProjectDescription />}
          footer={
            <footer>
              <p>
                &copy; {new Date().getFullYear()} -  Victor Le Fur -
                Design & fabrication in {siteConfig.serviceArea}
              </p>
            </footer>
          }
        />
      </ExperienceGate>
    </>
  );
}
