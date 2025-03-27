'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealContainerProps {
  children: ReactNode;
  className?: string;
  direction?: 'fromTop' | 'fromBottom' | 'fromLeft' | 'fromRight';
  duration?: number;
  offset?: [string, string];
  overflow?: boolean;
}

const ScrollRevealContainer = ({
  children,
  className = '',
  direction = 'fromBottom',
  duration = 1.2,
  offset = ['0 1', '1.33 1'],
  overflow = false,
}: ScrollRevealContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as any
  });
  
  // Determine animation styles based on direction
  const getTransformValues = () => {
    switch (direction) {
      case 'fromTop':
        return {
          clipPath: useTransform(
            scrollYProgress,
            [0, 1],
            ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
          ),
          y: useTransform(
            scrollYProgress,
            [0, 1],
            ['-20%', '0%']
          )
        };
      case 'fromBottom':
        return {
          clipPath: useTransform(
            scrollYProgress,
            [0, 1],
            ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)']
          ),
          y: useTransform(
            scrollYProgress,
            [0, 1],
            ['20%', '0%']
          )
        };
      case 'fromLeft':
        return {
          clipPath: useTransform(
            scrollYProgress,
            [0, 1],
            ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)']
          ),
          x: useTransform(
            scrollYProgress,
            [0, 1],
            ['-20%', '0%']
          )
        };
      case 'fromRight':
        return {
          clipPath: useTransform(
            scrollYProgress,
            [0, 1],
            ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)']
          ),
          x: useTransform(
            scrollYProgress,
            [0, 1],
            ['20%', '0%']
          )
        };
      default:
        return {
          clipPath: useTransform(
            scrollYProgress,
            [0, 1],
            ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)']
          ),
          y: useTransform(
            scrollYProgress,
            [0, 1],
            ['20%', '0%']
          )
        };
    }
  };

  const transformValues = getTransformValues();

  return (
    <div
      ref={containerRef}
      className={`${className} ${!overflow ? 'overflow-hidden' : ''}`}
    >
      <motion.div
        style={{
          ...transformValues,
          transition: `all ${duration}s cubic-bezier(0.17, 0.55, 0.55, 1)`,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollRevealContainer; 