'use client';

import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { SpotifyIcon } from './icons/SpotifyIcon';
import { DiscordIcon } from './icons/DiscordIcon';
import { useState, useEffect } from 'react';

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    { name: 'FuseKraft Discord', href: '#', icon: DiscordIcon },
  ];

  return (
    <>
      <footer className="relative bg-transparent backdrop-blur-xl border-t border-border/10 py-8 text-center mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 mb-4">
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                <link.icon className="h-6 w-6 text-foreground/60 transition-colors hover:text-primary" />
              </Link>
            ))}
          </div>
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} FuseKraft Studios. All rights reserved.
          </p>
          <p className="text-xs text-foreground/40 mt-2">
            Powered by FuseKraft
          </p>
        </div>
      </footer>

      {/* Fixed Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/80 transition-all duration-300 shadow-lg"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
}
