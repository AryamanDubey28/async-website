'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  zIndex?: number;
}

const ScrollProgress = ({ 
  color = 'bg-gradient-to-r from-teal-400 to-teal-500', 
  height = 3,
  zIndex = 50
}: ScrollProgressProps) => {
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Make progress bar animation smoother
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 ${color} origin-left z-${zIndex}`}
      style={{ 
        scaleX, 
        height 
      }}
    />
  );
};

export default ScrollProgress; 