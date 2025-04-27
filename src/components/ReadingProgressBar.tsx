'use client';

import React, { useState, useEffect } from 'react';

const ReadingProgressBar: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const articleElement = document.querySelector('article.prose') as HTMLElement;
    const navElement = document.querySelector('nav'); 

    if (!articleElement || !navElement) {
      setScrollPercentage(0);
      return;
    }

    const navComputedStyle = window.getComputedStyle(navElement);
    const fixedNavbarHeight = navComputedStyle.position === 'fixed' ? navElement.offsetHeight : 0;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    // Use getBoundingClientRect which gives position relative to viewport
    const articleRect = articleElement.getBoundingClientRect();
    // Calculate the article's top position relative to the document top
    const articleTopRelativeToDoc = scrollTop + articleRect.top;
    // Use the height from getBoundingClientRect
    const articleHeight = articleRect.height;

    // scrollStartPoint: The scrollY value where the article's top edge aligns
    // with the bottom edge of the potentially fixed navbar.
    const scrollStartPoint = articleTopRelativeToDoc - fixedNavbarHeight;

    // scrollEndPoint: The scrollY value where the article's bottom edge aligns
    // with the bottom edge of the viewport.
    const scrollEndPoint = articleTopRelativeToDoc + articleHeight - windowHeight;

    // Total distance the scroll handle moves while the article is progressing
    // from 0% visible (at the start point) to 100% visible (at the end point).
    const totalScrollRange = scrollEndPoint - scrollStartPoint;

    // How far the current scroll position is past the designated start point.
    // We don't care about scroll positions before the start point.
    const scrolledPastStart = scrollTop - scrollStartPoint;

    let percentage = 0;
    if (totalScrollRange <= 0) {
      // Article is shorter than the available viewport below the navbar.
      // If we have scrolled past the start point, the entire (short) article
      // is effectively visible in the reading pane.
      percentage = scrollTop >= scrollStartPoint ? 100 : 0;
    } else {
      // Calculate the progress within the valid scroll range.
      percentage = (scrolledPastStart / totalScrollRange) * 100;
    }

    // Clamp the percentage between 0 and 100.
    // This ensures we don't get negative values before reaching the start
    // or values > 100 after passing the end.
    setScrollPercentage(Math.max(0, Math.min(100, percentage)));
  };

  useEffect(() => {
    const scrollHandler = () => handleScroll();
    const resizeHandler = () => handleScroll();

    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', resizeHandler);

    const timerId = setTimeout(() => {
      const animationFrameId = requestAnimationFrame(handleScroll);
      (window as any).__readingProgressAnimFrame = animationFrameId;
    }, 50);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
      clearTimeout(timerId);
      if ((window as any).__readingProgressAnimFrame) {
        cancelAnimationFrame((window as any).__readingProgressAnimFrame);
      }
    };
  }, []);

  return (
    // Container for the vertical bar on the left
    <div
      id="reading-progress-bar-container"
      className="fixed top-0 left-0 bottom-0 w-1.5 z-50 bg-gray-800/50 backdrop-blur-sm"
      role="progressbar"
      aria-valuenow={scrollPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      style={{ pointerEvents: 'none' }} // Prevent interaction
    >
      {/* The actual progress indicator */} 
      <div
        id="reading-progress-bar-indicator"
        className="w-full bg-gradient-to-b from-teal-400 via-purple-400 to-blue-500 transition-all duration-300 ease-linear"
        style={{ height: `${scrollPercentage}%` }} // Set height instead of width
      />
    </div>
  );
};

export default ReadingProgressBar; 