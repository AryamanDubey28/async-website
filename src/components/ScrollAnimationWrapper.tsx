'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  animationVariant?: 'fadeIn' | 'fadeUp' | 'fadeRight' | 'fadeLeft' | 'scale';
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  viewportMargin?: string;
  duration?: number;
  easing?: string;
}

export const ScrollAnimationWrapper = ({
  children,
  className = '',
  animationVariant = 'fadeUp',
  delay = 0,
  threshold = 0.2,
  triggerOnce = true,
  viewportMargin = '-130px',
  duration = 0.6,
  easing = 'cubic-bezier(0.22, 1, 0.36, 1)',
}: ScrollAnimationWrapperProps) => {
  const { ref, inView } = useInView({
    triggerOnce: triggerOnce,
    threshold: threshold,
    rootMargin: viewportMargin,
  });
  
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const getAnimationClasses = () => {
    switch (animationVariant) {
      case 'fadeIn':
        return 'animate-fade-in';
      case 'fadeUp':
        return 'animate-fade-up';
      case 'fadeRight':
        return 'animate-fade-right';
      case 'fadeLeft':
        return 'animate-fade-left';
      case 'scale':
        return 'animate-scale';
      default:
        return 'animate-fade-up';
    }
  };

  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`${className} ${getAnimationClasses()} ${inView ? 'is-in-view' : ''}`}
      style={{
        transitionDelay: `${delay}s`,
        transitionDuration: `${duration}s`,
        transitionTimingFunction: easing,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper; 