'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface RelativeMousePosition extends MousePosition {
  // Position relative to element (0-1 range)
  relativeX: number;
  relativeY: number;
  // Position from center (-1 to 1 range)
  centerX: number;
  centerY: number;
  // Is mouse inside the element
  isInside: boolean;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

export function useRelativeMousePosition(
  ref: RefObject<HTMLElement | null>
): RelativeMousePosition {
  const [position, setPosition] = useState<RelativeMousePosition>({
    x: 0,
    y: 0,
    relativeX: 0.5,
    relativeY: 0.5,
    centerX: 0,
    centerY: 0,
    isInside: false,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relativeX = x / rect.width;
    const relativeY = y / rect.height;
    const centerX = (relativeX - 0.5) * 2;
    const centerY = (relativeY - 0.5) * 2;
    const isInside =
      x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

    setPosition({
      x,
      y,
      relativeX,
      relativeY,
      centerX,
      centerY,
      isInside,
    });
  }, [ref]);

  const handleMouseLeave = useCallback(() => {
    setPosition((prev) => ({ ...prev, isInside: false }));
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseLeave]);

  return position;
}

// Hook for 3D tilt effect
export function useTilt(
  ref: RefObject<HTMLElement | null>,
  options: { max?: number; perspective?: number; scale?: number } = {}
) {
  const { max = 10, perspective = 1000, scale = 1.02 } = options;
  const [style, setStyle] = useState({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: 'transform 0.1s ease-out',
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -max;
      const rotateY = ((x - centerX) / centerX) * max;

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: 'transform 0.1s ease-out',
      });
    },
    [ref, max, perspective, scale]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.3s ease-out',
    });
  }, [perspective]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseLeave]);

  return style;
}
