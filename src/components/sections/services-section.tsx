'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, { useRef } from 'react';

const ServiceCard = ({ title, description, price, revisions, genres, notes }: { title: string, description: string, price: number, revisions: number, genres: string[], notes: string }) => {
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
      onMouseMove={handleMouseMove}
      className="flex flex-col h-full overflow-hidden relative rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(0px) saturate(120%)',
      }}
    >
      <CardHeader className="relative z-10">
        <CardTitle className="text-2xl font-bold text-primary">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between relative z-10">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {genres.map(genre => (
              <Badge key={genre} variant="secondary">{genre}</Badge>
            ))}
          </div>
          <p className="text-4xl font-black mb-2">${price}<span className="text-lg font-normal text-foreground/70">/song</span></p>
          <p className="text-sm text-foreground/50 font-bold">+${revisions} per revision</p>
        </div>
      </CardContent>
    </motion.div>
  );
};

export function ServicesSection() {
  const services = [
    {
      title: 'Composition',
      description: 'Full track creation from scratch, tailored to your vision.',
      price: 25,
      revisions: 5,
      genres: ['Phonk', 'Trap', 'Ambient', 'Experimental'],
      notes: 'Low introductory price for the first 10 clients!'
    },
    {
      title: 'Mixing & Mastering',
      description: 'Professional polish to make your tracks radio-ready.',
      price: 30,
      revisions: 5,
      genres: ['All Genres', 'Vocal Processing', 'Stem Mastering'],
      notes: 'Supported by both SXR3NE and VXNTUS for quality assurance.'
    }
  ];

  return (
    <section id="services" className="py-20 sm:py-32 bg-[transparent]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">
            Our Services
          </h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Crafting the future of sound, one beat at a time.
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-6 pt-4 text-center flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center text-default text-foreground/80">
            <Check className="h-4 w-4 mr-2 text-green-400" />
            <span>Low introductory price for the first 10 clients!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
