'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface StaggeredGridProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  columns?: { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: string;
  staggerDelay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  viewportMargin?: string;
  duration?: number;
  easing?: string;
}

export const StaggeredGrid = ({
  children,
  className = '',
  itemClassName = '',
  columns = { sm: 1, md: 2, lg: 3, xl: 3 },
  gap = 'gap-8',
  staggerDelay = 0.05,
  threshold = 0.1,
  triggerOnce = true,
  viewportMargin = '-100px',
  duration = 0.5,
  easing = 'cubic-bezier(0.22, 1, 0.36, 1)',
}: StaggeredGridProps) => {
  const [isClient, setIsClient] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin: viewportMargin,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getGridColumns = () => {
    const colClasses = [];
    
    if (columns.sm) colClasses.push(`grid-cols-${columns.sm}`);
    if (columns.md) colClasses.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) colClasses.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) colClasses.push(`xl:grid-cols-${columns.xl}`);
    
    return colClasses.join(' ');
  };
  
  // Handle server-side rendering
  if (!isClient) {
    return (
      <div className={`grid ${getGridColumns()} ${gap} ${className}`}>
        {children.map((child, index) => (
          <div key={index} className={itemClassName}>{child}</div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`grid ${getGridColumns()} ${gap} ${className}`}
    >
      {React.Children.map(children, (child, index) => {
        // Ensure we are working with valid React elements
        if (!React.isValidElement(child)) {
          return child; 
        }
        
        const childStyle: React.CSSProperties = {
          transitionDelay: `${index * staggerDelay}s`,
          transitionDuration: `${duration}s`,
          transitionTimingFunction: easing,
        };

        // Clone the element to add the animation class and inline styles
        // Safely access props with type checking
        const existingProps = child.props as { className?: string; style?: React.CSSProperties };
        const existingClassName = existingProps.className || '';
        const existingStyle = existingProps.style || {};

        return React.cloneElement(child as React.ReactElement<{ className?: string; style?: React.CSSProperties }>, {
          className: `${existingClassName} ${itemClassName} grid-item-animate ${inView ? 'is-in-view' : ''}`.trim(), // Added trim for safety
          style: { ...existingStyle, ...childStyle },
        });
      })}
    </div>
  );
};

export default StaggeredGrid; 