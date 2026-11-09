import Hero from "@/components/sections/home/Hero";
import TrustIntro from "@/components/sections/home/TrustIntro";
import ServicesOverview from "@/components/sections/home/ServicesOverview";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import ProductsShowcase from "@/components/sections/home/ProductsShowcase";
import IndustriesSection from "@/components/sections/home/IndustriesSection";
import AmcHighlight from "@/components/sections/home/AmcHighlight";
import WorkingProcess from "@/components/sections/home/WorkingProcess";
import ProjectsShowcase from "@/components/sections/home/ProjectsShowcase";
import ContactCtaSection from "@/components/sections/home/ContactCtaSection";
export default function Home() {
  return <>
      <Hero />
      <TrustIntro />
      <ServicesOverview />
      <WhyChooseUs />
      <ProductsShowcase />
      <IndustriesSection />
      <AmcHighlight />
      <WorkingProcess />
      <ProjectsShowcase />
      <ContactCtaSection />
    </>;
}
