import AboutUsSection from "@/components/sections/home/about-section";
import FullVersionSection from "@/components/sections/home/full-version-section";
import HeroSection from "@/components/sections/home/hero-section";
import PortfolioSection from "@/components/sections/home/portfolio-section";
// import ServicesSection from "@/components/sections/home/services";
import ServicesSection2 from "@/components/sections/home/services-2";
import StatsSection from "@/components/sections/home/stats";
import Testimonials from "@/components/testimonials";
import FooterSection from "@/components/footer";
import ContactSection from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutUsSection />
      {/* <ServicesSection /> */}
      <ServicesSection2 />
      <PortfolioSection />
      <StatsSection />
      <Testimonials />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
