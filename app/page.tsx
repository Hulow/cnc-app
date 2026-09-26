import { CuttingSalon } from "@/components/cutting-salon/cutting-salon";
import { ExperienceGate } from "@/components/experience-gate/experience-gate";
import { Logo } from "@/components/logo/logo";
import { PageView } from "@/components/page-view/page-view";
import { Service } from "@/components/service/service";
import { StructuredData } from "@/components/structured-data/structured-data";
import { siteConfig } from "@/shared/site-config";

export default function Home() {
  return (
    <>
      <StructuredData />
      <ExperienceGate>
        <PageView
          logo={<Logo />}
          service={<Service />}
          cuttingSalon={<CuttingSalon />}
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
