import type { Metadata } from 'next';
import { Inter, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import CustomCursor from '@/components/custom-cursor';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontCode = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
});

export const metadata: Metadata = {
  title: 'FuseKraft Studios: Ignite Your Sound',
  description:
    'FuseKraft is a music production studio specializing in phonk and related genres, offering composition, mixing, and mastering services with a futuristic, otherworldly aesthetic.',
  openGraph: {
    title: 'FuseKraft Studios: Ignite Your Sound',
    description: 'Ultra-modern music production for phonk and beyond.',
    images: [{ url: '/og-image.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FuseKraft Studios',
    description: 'Ignite your sound with our phonk production services.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'font-body antialiased animated-background',
          fontBody.variable,
          fontCode.variable
        )}
      >
        <CustomCursor />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
