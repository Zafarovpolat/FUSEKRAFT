'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Info } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, { useRef } from 'react';

const IntroCard = ({ title, children, delay }: { title: string, children: React.ReactNode, delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      className="relative rounded-xl p-6 border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden opacity-10"
      style={{
        background: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(0px) saturate(120%)',
      }}
    >


      <h3 className="font-bold text-primary text-lg mb-2 flex items-center gap-2 relative z-10">
        <Info className="w-5 h-5" />
        {title}
      </h3>
      <p className="text-foreground/80 text-sm relative z-10">{children}</p>
    </motion.div>
  );
};

export function HeroSection() {
  const heroBg = PlaceHolderImages.find(img => img.id === 'hero-background');

  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-center pt-20">
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
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase pt-8"
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
            onClick={scrollToContact}
            className="font-bold text-lg"
          >
            Meet the Fuse
          </Button>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
