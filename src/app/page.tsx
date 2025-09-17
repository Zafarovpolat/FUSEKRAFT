import { Header } from '@/components/header';
import { HeroSection } from '@/components/sections/hero-section';
import { TeamSection } from '@/components/sections/team-section';
import { ServicesSection } from '@/components/sections/services-section';
import { AudioVisualizerSection } from '@/components/sections/audio-visualizer-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TeamSection />
        <ServicesSection />
        <AudioVisualizerSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
