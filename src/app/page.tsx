import AboutUsSection from "@/components/sections/home/about-section";
import HeroSection from "@/components/sections/home/hero-section";
import PortfolioSection from "@/components/sections/home/portfolio-section";
import ServicesSection2 from "@/components/sections/home/services-2";
import ProcessSection from "@/components/sections/home/process-section";
import FaqSection from "@/components/sections/home/faq-section";
import StatsSection from "@/components/sections/home/stats-section";
import TestimonialsSection from "@/components/sections/home/testimonials-section";
import FooterSection from "@/components/footer";
import ContactSection from "@/components/contact";
import { HeroHeader } from "@/components/header";

export default function Home() {
  return (
    <>
      <HeroHeader />
      <main id="main" className="min-h-screen">
        <HeroSection />
        <AboutUsSection />
        <ServicesSection2 />
        <ProcessSection />
        <PortfolioSection />
        <StatsSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
