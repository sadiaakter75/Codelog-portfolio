import Hero from "@/components/Hero";
import InteractiveSection from "@/components/InteractiveSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* Sticky Hero Wrapper */}
      <div className="sticky top-0 w-full h-screen">
        <Hero />
      </div>

      {/* Content that scrolls over the Hero */}
      <div id="projects">
        <InteractiveSection />
      </div>
      
      {/* Additional Scrollable Sections */}
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      
      {/* Cinematic Reveal Footer */}
      <div id="contact">
        <Footer />
      </div>
    </main>
  );
}
