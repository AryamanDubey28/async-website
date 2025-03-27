'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  bgColor?: string;
  speed?: number;
  direction?: 'up' | 'down';
  overflow?: 'visible' | 'hidden';
}

export const ParallaxSection = ({
  children,
  className = '',
  bgColor = 'transparent',
  speed = 0.2,
  direction = 'up',
  overflow = 'hidden',
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Calculate y position based on scroll progress
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, direction === 'up' ? -(speed * 100) : (speed * 100)]
  );
  
  // Skip motion during server-side rendering
  if (!isClient) {
    return (
      <div
        ref={ref}
        className={`relative ${overflow === 'hidden' ? 'overflow-hidden' : ''} ${className}`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`relative ${overflow === 'hidden' ? 'overflow-hidden' : ''} ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <motion.div 
        className="relative z-10"
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection; 