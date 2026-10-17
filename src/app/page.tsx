import HeroSection from "@/components/sections/home/hero-section";
import AboutSection from "@/components/sections/home/about-section";
import ServicesSection from "@/components/sections/home/services-2";
import PortfolioSection from "@/components/sections/home/portfolio-section";
import OfferSection from "@/components/sections/home/offer-section";
import ProcessSection from "@/components/sections/home/process-section";
import ContactSection from "@/components/contact";
import FaqSection from "@/components/sections/home/faq-section";
import FooterSection from "@/components/footer";

export default function Home() {
  return (
    <>
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <OfferSection />
        <ProcessSection />
        <ContactSection />
        <FaqSection />
      </main>
      <FooterSection />
    </>
  );
}
