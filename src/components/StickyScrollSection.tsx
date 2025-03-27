'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StickyScrollSectionProps {
  children: ReactNode;
  className?: string;
  height?: string;
  bgColor?: string;
  index?: number; // For staggered animations when multiple sticky sections are used
  reverse?: boolean; // Whether to reverse the animation direction
}

export const StickyScrollSection = ({
  children,
  className = '',
  height = '200vh',
  bgColor = 'transparent',
  index = 0,
  reverse = false,
}: StickyScrollSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  // Use scrollYProgress to create opacity and scale transformations
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.85, 1], 
    [0, 1, 1, 0]
  );
  
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.85, 1], 
    [0.85, 1, 1, 0.85]
  );
  
  const translateY = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    reverse ? ['-20%', '0%', '20%'] : ['20%', '0%', '-20%']
  );
  
  // Skip motion during server-side rendering
  if (!isClient) {
    return (
      <div
        ref={containerRef}
        className={`relative ${className}`}
        style={{ height, backgroundColor: bgColor }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height, backgroundColor: bgColor }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ 
            opacity, 
            scale, 
            y: translateY,
            transition: `all 0.1s ease-out`,
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default StickyScrollSection; 