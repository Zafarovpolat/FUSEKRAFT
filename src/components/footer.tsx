'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { SpotifyIcon } from './icons/SpotifyIcon';

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const socialLinks = [
    { name: 'SXR3NE Spotify', href: '#', icon: SpotifyIcon },
    { name: 'VXNTUS Spotify', href: '#', icon: SpotifyIcon },
    { name: 'FuseKraft YouTube', href: '#', icon: YoutubeIcon },
  ];

  return (
    <footer className="relative bg-background border-t border-border/10 py-8 text-center mt-24">
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

      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full flex items-center justify-center bg-primary text-primary-foreground"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </footer>
  );
}
