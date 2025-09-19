'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }}
    className="px-4 py-2 text-sm text-foreground/80 transition-colors duration-300 hover:text-primary focus:text-primary focus:outline-none"
  >
    {children}
  </a>
);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/30 backdrop-blur-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link href="/" className="text-2xl font-black tracking-wider">
          FuseKraft
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#songs">Songs</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>

        {/* Mobile Burger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-20 bg-black/50 backdrop-blur-md"
              style={{
                height: '100vh',
              }}
              onClick={closeMenu}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed left-0 right-0 top-20 z-30 border-t border-white/10"
              style={{
                height: 'calc(100vh - 80px)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)'
              }}
            >
              <motion.div
                className="flex flex-col items-center justify-center h-full space-y-10 px-6"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                {[
                  { href: '#about', label: 'About' },
                  { href: '#services', label: 'Services' },
                  { href: '#songs', label: 'Songs' },
                  { href: '#contact', label: 'Contact' }
                ].map((item) => (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="text-2xl font-medium text-white hover:text-primary transition-colors duration-300 py-3 relative group"
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 }
                    }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
