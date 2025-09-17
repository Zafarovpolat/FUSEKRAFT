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

  return (
    <>
      <div
        className={cn(
          "fixed pointer-events-none z-[9999] rounded-full mix-blend-difference transition-transform duration-300 ease-out",
          isPointer ? "scale-[2.5] bg-primary" : "scale-100 bg-accent"
        )}
        style={{
          left: position.x,
          top: position.y,
          width: isPointer ? 12 : 8,
          height: isPointer ? 12 : 8,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className={cn(
          "fixed pointer-events-none z-[9999] rounded-full border-2 mix-blend-difference transition-[width,height,border,transform] duration-300 ease-out",
          isPointer ? "h-10 w-10 border-primary" : "h-8 w-8 border-accent"
        )}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%)`,
        }}
      />
    </>
  );
};

export default CustomCursor;
