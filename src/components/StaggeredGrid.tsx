'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

interface StaggeredGridProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  columns?: { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: string;
  staggerDelay?: number;
  animationVariant?: 'fadeUp' | 'fadeIn' | 'scale';
}

export const StaggeredGrid = ({
  children,
  className = '',
  itemClassName = '',
  columns = { sm: 1, md: 2, lg: 3, xl: 3 },
  gap = 'gap-8',
  staggerDelay = 0.05,
  animationVariant = 'fadeUp',
}: StaggeredGridProps) => {
  const getGridColumns = () => {
    const colClasses = [];
    
    if (columns.sm) colClasses.push(`grid-cols-${columns.sm}`);
    if (columns.md) colClasses.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) colClasses.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) colClasses.push(`xl:grid-cols-${columns.xl}`);
    
    return colClasses.join(' ');
  };
  
  // Animation variants for individual children
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * staggerDelay,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <ScrollAnimationWrapper
      animationVariant="stagger"
      staggerChildren={staggerDelay}
      className={`grid ${getGridColumns()} ${gap} ${className}`}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: index * staggerDelay,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          }}
          className={itemClassName}
        >
          {child}
        </motion.div>
      ))}
    </ScrollAnimationWrapper>
  );
};

export default StaggeredGrid; 