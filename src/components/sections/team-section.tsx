'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SpotifyIcon } from '@/components/icons/SpotifyIcon';
import { YoutubeIcon } from '@/components/icons/YoutubeIcon';
import { InstagramIcon } from '@/components/icons/InstagramIcon';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, { useRef } from 'react';

const TeamMemberCard = ({ name, alias, bio, stats, socials, imageId }: { name: string, alias: string, bio: string, stats: { label: string, value: string }[], socials: { name: string, href: string, icon: React.ElementType }[], imageId: string }) => {

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
      className="flex flex-col items-center text-center overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl h-full"
      style={{
        background: 'rgba(255, 255, 255, 0.01)',
        backdropFilter: 'blur(10px) saturate(120%)',
      }}
    >
      <CardHeader className="items-center relative z-10">
        <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden border-2 border-foreground/30 opacity-[0.9]">
          <Image
            src={imageId === 'matthew-edward' ? '/sxr3ne.jpg' : '/vxntus.png'}
            alt={`Profile of ${name}`}
            fill
            className="object-cover"
          />
        </div>
        <CardTitle className="text-3xl font-black text-primary">{alias}</CardTitle>
        <CardDescription className="text-foreground/80">{name}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow relative z-10">
        <p className="text-foreground/90 mb-6">{bio}</p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {stats.map(stat => (
            <Badge key={stat.label} variant="outline" className="text-sm py-1 px-3 border-foreground/70 text-foreground/70">
              <span className="font-bold mr-2">{stat.value}</span> {stat.label}
            </Badge>
          ))}
        </div>
        <div className="flex justify-center space-x-4">
          {socials.map(social => (
            <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="group">
              <social.icon className="h-7 w-7 text-foreground/70 transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
            </Link>
          ))}
        </div>
      </CardContent>
    </motion.div>
  );
};

export function TeamSection() {
  const team = [
    {
      name: 'Matthew Edward',
      alias: 'SXR3NE',
      bio: 'A 17-year-old music producer from the Philippines, who’s made his career public at May 3, 2024. His well known songs are “Better To Forget,” “are you there?,” “Coping,” and a later release called “Love Pulse” in collaboration with VXNTUS. SXR3NE is featured in Tribal Trap, Nismo Records, Maniac, and Qaraqshy Records, amassing 900,000+ views on YouTube, and 60,000+ total streams on Spotify.',
      stats: [
        { label: 'Views', value: '60K+' },
        { label: 'Streams', value: '500K+' },
      ],
      socials: [
        { name: 'Spotify', href: '#', icon: SpotifyIcon },
        { name: 'Youtube', href: '#', icon: YoutubeIcon },
      ],
      imageId: 'matthew-edward'
    },
    {
      name: 'Zafarov Polat',
      alias: 'VXNTUS',
      bio: 'A 19-year-old music producer from Uzbekistan. He’s worked alongside fellow producers like UZBEKPHONK, TXALUSH, and notably CYTRENA. VXNTUS is featured in Tribal Trap, Maniac Records, Ryuzen Records, and Doom Media Records, amassing 70,000+ total streams on Spotify.',
      stats: [
        { label: 'Features', value: '20+' },
        { label: 'Projects', value: '5+' },
      ],
      socials: [
        { name: 'Spotify', href: 'https://open.spotify.com/artist/6UDdMkbWNGO0CkzMmMYhEX', icon: SpotifyIcon },
        { name: 'Instagram', href: '#', icon: InstagramIcon },
      ],
      imageId: 'zafarov-polat'
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">
            Meet Our Team
          </h2>
        </motion.div>
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <TeamMemberCard {...member} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
