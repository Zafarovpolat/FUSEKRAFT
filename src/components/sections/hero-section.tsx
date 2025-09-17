'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';

const IntroCard = ({ title, children, delay }: { title: string, children: React.ReactNode, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, rotateX: -10, rotateY: 10 }}
    animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
    transition={{ duration: 0.5, delay }}
    className="liquid-glass liquid-glass-interactive rounded-xl p-6"
    style={{ transformStyle: 'preserve-3d' }}
  >
    <h3 className="font-bold text-primary text-lg mb-2 flex items-center gap-2">
      <Info className="w-5 h-5" />
      {title}
    </h3>
    <p className="text-foreground/80 text-sm">{children}</p>
  </motion.div>
);


export function HeroSection() {
  const heroBg = PlaceHolderImages.find(img => img.id === 'hero-background');

  const scrollToTeam = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-center text-white pt-20">
      {heroBg && (
        <Image
          src={heroBg.imageUrl}
          alt={heroBg.description}
          fill
          className="object-cover -z-10 brightness-50"
          data-ai-hint={heroBg.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-glitch"
          data-text="FuseKraft: Ignite Your Sound"
        >
          FuseKraft: Ignite Your Sound
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-foreground/80"
        >
          An ultra-modern music production studio specializing in phonk and related genres.
        </motion.p>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8">
          <Button
            size="lg"
            onClick={scrollToTeam}
            className="pulse-glow-primary font-bold text-lg"
          >
            Meet the Fuse
          </Button>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" style={{ perspective: '1000px' }}>
           <IntroCard title="Introduction" delay={0.7}>
            Welcome to FuseKraft, where sound gets a soul and beats get a backbone. We are a duo of producers, Matthew "SXR3NE" Edward and Polat "VXNTUS" Zafarov, united by a passion for the raw, unfiltered energy of phonk music. Our mission is to forge unforgettable audio experiences, blending gritty textures with hypnotic melodies to create tracks that resonate deep in the digital underground.
          </IntroCard>
          <IntroCard title="About Us" delay={0.9}>
            At FuseKraft, we don't just make music; we build worlds. Inspired by the cyberpunk aesthetic of a future that never was, we craft sounds that are both nostalgic and cutting-edge. Whether you're an emerging artist looking to define your sound or an established act wanting to push boundaries, we provide the creative firepower to bring your vision to life. Let's create something legendary together.
          </IntroCard>
        </div>
      </div>
    </section>
  );
}
