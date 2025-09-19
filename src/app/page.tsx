import { Header } from '@/components/header';
import { HeroSection } from '@/components/sections/hero-section';
import { TeamSection } from '@/components/sections/team-section';
import { ServicesSection } from '@/components/sections/services-section';
import { SongsSection } from '@/components/sections/songs-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground">
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
        src="/bg2.mp4"
      />
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]" />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TeamSection />
        <div className='backdrop-blur-xl'>
          <ServicesSection />
          <SongsSection />
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
