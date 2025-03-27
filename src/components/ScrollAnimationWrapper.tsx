'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  animationVariant?: 'fadeIn' | 'fadeUp' | 'fadeRight' | 'fadeLeft' | 'scale' | 'stagger';
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  staggerChildren?: number;
  staggerDelay?: number;
  viewportMargin?: string;
}

export const ScrollAnimationWrapper = ({
  children,
  className = '',
  animationVariant = 'fadeUp',
  delay = 0,
  threshold = 0.2,
  triggerOnce = true,
  staggerChildren = 0.1,
  staggerDelay = 0,
  viewportMargin = '-130px',
}: ScrollAnimationWrapperProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: triggerOnce,
    threshold: threshold,
    rootMargin: viewportMargin,
  });
  
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [controls, inView, triggerOnce]);

  // Animation variants definition
  const fadeUp: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.6, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const fadeRight: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const fadeLeft: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const scale: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const stagger: Variants = {
    hidden: {},
    visible: {
      transition: { 
        staggerChildren: staggerChildren,
        delayChildren: staggerDelay + delay
      }
    }
  };

  const getVariant = (): Variants => {
    switch (animationVariant) {
      case 'fadeIn':
        return fadeIn;
      case 'fadeUp':
        return fadeUp;
      case 'fadeRight':
        return fadeRight;
      case 'fadeLeft':
        return fadeLeft;
      case 'scale':
        return scale;
      case 'stagger':
        return stagger;
      default:
        return fadeUp;
    }
  };

  // Handle server-side rendering
  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariant()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper; 