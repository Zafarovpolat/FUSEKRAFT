'use client';

import Link from 'next/link';

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
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/30 backdrop-blur-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link href="/" className="text-2xl font-black tracking-wider text-glitch" data-text="FuseKraft">
          FuseKraft
        </Link>
        <div className="hidden md:flex items-center space-x-2">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#visualizer">Visualizer</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>
      </nav>
    </header>
  );
}
