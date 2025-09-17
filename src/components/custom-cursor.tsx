'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const CustomCursor = () => {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
      );
    };

    const onMouseOut = () => {
      setPosition({ x: -100, y: -100 });
    }

    document.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseOut);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseOut);
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return null;
};

export default CustomCursor;
