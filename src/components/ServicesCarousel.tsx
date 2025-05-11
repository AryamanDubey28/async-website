'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import ServiceCard from './ServiceCard';

// Define service type
interface Service {
  id: string;
  title: string;
  description: string;
  expandedContent: string[];
  icon: React.ReactNode;
}

interface ServicesCarouselProps {
  services: Service[];
}

// Add global styles for the carousel
const carouselStyles = `
  /* Carousel container styles */
  .carousel-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 1rem 0 1.5rem;
  }
  
  .carousel-track {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Carousel card styles */
  .carousel-card {
    min-width: 80%;
    width: 80%;
    flex-shrink: 0;
    padding: 1rem;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.35;
    transform: scale(0.92);
    filter: blur(1px);
    cursor: pointer;
  }
  
  .carousel-card.active {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
    z-index: 10;
    position: relative;
  }
  
  .carousel-card-content {
    display: flex;
    flex-direction: column;
    background-color: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 1.5rem;
    overflow: hidden;
    height: 100%;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 80px rgba(45, 212, 191, 0.15) inset;
    
    @media (min-width: 768px) {
      flex-direction: row;
    }
  }
  
  .carousel-card-content:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1.5rem;
    padding: 1.5px;
    background: linear-gradient(to right, rgba(45, 212, 191, 0.1), rgba(168, 85, 247, 0.1));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    transition: all 0.5s ease;
    pointer-events: none;
  }
  
  .carousel-card.active .carousel-card-content:before {
    background: linear-gradient(60deg, rgba(45, 212, 191, 0.6), rgba(168, 85, 247, 0.6), rgba(59, 130, 246, 0.6));
    box-shadow: 0 0 30px rgba(45, 212, 191, 0.3);
  }

  /* Pulsating glow effect for active card */
  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 
        0 0 20px rgba(45, 212, 191, 0.3),
        0 0 50px rgba(45, 212, 191, 0.15),
        0 0 80px rgba(45, 212, 191, 0.15) inset;
    }
    50% {
      box-shadow: 
        0 0 30px rgba(168, 85, 247, 0.4),
        0 0 70px rgba(59, 130, 246, 0.25),
        0 0 100px rgba(45, 212, 191, 0.2) inset;
    }
  }
  
  .carousel-card.active .carousel-card-content {
    animation: pulse-glow 3s ease-in-out infinite;
  }
  
  /* New style for active AND paused card */
  .carousel-card.active.paused .carousel-card-content {
    animation: none; /* Stop the pulsing */
    box-shadow:
      0 0 35px rgba(45, 212, 191, 0.45), /* Slightly stronger teal glow */
      0 0 60px rgba(168, 85, 247, 0.25), /* Slightly stronger purple glow */
      0 0 90px rgba(45, 212, 191, 0.20) inset, /* Slightly stronger inner glow */
      0 20px 40px rgba(0, 0, 0, 0.3); /* Original structural shadow */
  }

  .carousel-card.active.paused .carousel-card-content:before {
    /* Make the border gradient slightly more opaque/vibrant when paused */
    background: linear-gradient(60deg, rgba(45, 212, 191, 0.7), rgba(168, 85, 247, 0.7), rgba(59, 130, 246, 0.7));
    box-shadow: 0 0 40px rgba(45, 212, 191, 0.4); /* Stronger border shadow */
  }
  
  /* Card sections */
  .card-summary {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    background-color: rgba(15, 23, 42, 0.35);
    transition: background-color 0.5s ease;
    
    @media (min-width: 768px) {
      width: 40%;
      border-right: 1px solid rgba(59, 130, 246, 0.2);
    }
  }
  
  .card-expanded {
    padding: 1.5rem;
    background-color: rgba(15, 23, 42, 0.15);
    transition: background-color 0.5s ease;
    
    @media (min-width: 768px) {
      width: 60%;
    }
  }
  
  /* Active card styling */
  .active-card-section {
    position: relative;
  }
  
  .active-card-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(45, 212, 191, 0.08) 0%,
      rgba(168, 85, 247, 0.08) 70%,
      transparent 100%
    );
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 0;
  }
  
  .carousel-card.active .active-card-section::before {
    opacity: 1;
  }
  
  .card-summary.active-card-section {
    background-color: rgba(15, 23, 42, 0.45);
  }
  
  .card-expanded.active-card-section {
    background-color: rgba(15, 23, 42, 0.25);
  }
  
  /* Navigation controls */
  .carousel-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  
  .carousel-nav-button {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(30, 41, 59, 0.75);
    color: white;
    border: 1px solid rgba(71, 85, 105, 0.4);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.25);
  }
  
  .carousel-nav-button:hover {
    background: linear-gradient(135deg, rgba(45, 212, 191, 1), rgba(168, 85, 247, 1));
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 10px 30px rgba(45, 212, 191, 0.4);
    border-color: transparent;
  }
  
  .carousel-nav-button:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.6);
  }
  
  .carousel-nav-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: rgba(55, 65, 81, 0.5);
    box-shadow: none;
    transform: none;
  }
  
  /* Indicators */
  .carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
  
  .carousel-indicator {
    width: 2rem;
    height: 0.25rem;
    border-radius: 0.125rem;
    background-color: rgba(100, 116, 139, 0.4);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    position: relative;
  }
  
  .carousel-indicator:hover {
    background-color: rgba(100, 116, 139, 0.6);
  }
  
  .carousel-indicator.active {
    width: 3rem;
    position: relative;
  }
  
  /* NEW: Style for the dynamically controlled indicator fill */
  .carousel-indicator-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, rgb(56, 224, 204), rgb(185, 105, 254), rgb(75, 141, 250));
    background-size: 200% 100%; /* Optional: keep for gradient animation within the fill */
    width: 0%; /* Initial width */
    border-radius: 0.125rem; /* Match parent indicator */
    /* Transition will be set by JS */
  }
  
  @keyframes fill-duration {
    from { width: 0%; }
    to { width: 100%; }
  }
`;

const ServicesCarousel = ({ services }: ServicesCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);
  const autoPlayDuration = 7000; // 7 seconds per slide
  const trackRef = useRef<HTMLDivElement>(null);

  // Refs for resumable timer
  const currentSlideTimeLeftRef = useRef<number>(autoPlayDuration);
  const lastTickTimestampRef = useRef<number | null>(null);
  const indicatorFillRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Calculate the correct transform for the track
  const getTrackTransform = useCallback(() => {
    if (!trackRef.current) return 'translateX(0)';
    
    // Assuming cards are 80% of the container width.
    // This calculation needs to be robust.
    // Consider getting card width directly if possible, or ensuring this matches CSS.
    const cardScreenWidthPercentage = 0.8;
    
    // On large screens (lg, 1024px and up), center the active card.
    // The card itself is 80% of its parent's width (the track).
    // The visible area for one card is 80% of the carousel container.
    // We want to offset the track so the active card is centered.
    // Total track width isn't directly used here, rather the width of a single card.
    
    const carouselContainerWidth = trackRef.current.parentElement?.offsetWidth || 0;
    const singleCardWidth = carouselContainerWidth * cardScreenWidthPercentage;

    if (window.innerWidth >= 1024) {
      // Offset to center the active card:
      // (Container width - Card width) / 2
      // This is the space on one side of the centered card.
      const centeringOffset = (carouselContainerWidth - singleCardWidth) / 2;
      return `translateX(calc(-${activeIndex * singleCardWidth}px + ${centeringOffset}px))`;
    }
    
    // For smaller screens, align to the left.
    return `translateX(-${activeIndex * singleCardWidth}px)`;
  }, [activeIndex]);

  // Reset all indicator fills to 0 and remove transitions
  const resetAllIndicatorFills = () => {
    indicatorFillRefs.current.forEach(fill => {
      if (fill) {
        fill.style.transition = 'none';
        fill.style.width = '0%';
      }
    });
  };

  const animateIndicatorFill = (index: number, duration: number, startWidthPercent: number = 0) => {
    const fillEl = indicatorFillRefs.current[index];
    if (fillEl) {
      fillEl.style.transition = 'none';
      fillEl.style.width = `${startWidthPercent}%`;
      // Force reflow to apply start width before transition
      void fillEl.offsetHeight;
      fillEl.style.transition = `width ${duration / 1000}s linear`;
      fillEl.style.width = '100%';
    }
  };

  const freezeIndicatorFill = (index: number) => {
    const fillEl = indicatorFillRefs.current[index];

    if (fillEl) {
      // This function is called when we need to stop the animation and set a static progress.
      // The most crucial call is from handleCardClick when PAUSING an active slide.
      if (index === activeIndex && lastTickTimestampRef.current) {
        // We are pausing the currently active, playing slide.
        // currentSlideTimeLeftRef.current (in the outer scope) has just been updated in handleCardClick
        // to be the true total time left for this slide across all pause/resume cycles.
        const timeTrulyLeftForSlide = currentSlideTimeLeftRef.current;
        const timeShownSoFarForSlide = autoPlayDuration - timeTrulyLeftForSlide;
        let currentProgressPercent = (timeShownSoFarForSlide / autoPlayDuration) * 100;
        currentProgressPercent = Math.min(100, Math.max(0, currentProgressPercent));

        fillEl.style.transition = 'none';
        fillEl.style.width = `${currentProgressPercent}%`;
      } else if (index === activeIndex && !isAutoPlaying && currentSlideTimeLeftRef.current === autoPlayDuration) {
        // This handles a slide that is active, paused, and has its full duration left
        // (e.g., a new slide was clicked, which starts paused by default).
        fillEl.style.transition = 'none';
        fillEl.style.width = '0%';
      }
      // Non-active indicators should have been reset by resetAllIndicatorFills already.
    }
  };

  const goToNext = useCallback(() => {
    if (autoPlayInterval.current) clearTimeout(autoPlayInterval.current);
    resetAllIndicatorFills();
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex === services.length - 1 ? 0 : prevIndex + 1;
      currentSlideTimeLeftRef.current = autoPlayDuration;
      if (isAutoPlaying) lastTickTimestampRef.current = Date.now(); // Start tick for new slide if autoplaying
      else lastTickTimestampRef.current = null;
      return nextIndex;
    });
  }, [services.length, isAutoPlaying]);

  const goToPrev = useCallback(() => {
    if (autoPlayInterval.current) clearTimeout(autoPlayInterval.current);
    resetAllIndicatorFills();
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex === 0 ? services.length - 1 : prevIndex - 1;
      currentSlideTimeLeftRef.current = autoPlayDuration;
      if (isAutoPlaying) lastTickTimestampRef.current = Date.now();
      else lastTickTimestampRef.current = null;
      return nextIndex;
    });
  }, [services.length, isAutoPlaying]);

  const goToSlide = useCallback((index: number) => {
    if (autoPlayInterval.current) clearTimeout(autoPlayInterval.current);
    resetAllIndicatorFills();
    setActiveIndex(index);
    currentSlideTimeLeftRef.current = autoPlayDuration;
    if (isAutoPlaying) lastTickTimestampRef.current = Date.now();
    else lastTickTimestampRef.current = null;
  }, [isAutoPlaying]);

  // This function will be called when a card is clicked
  const handleCardClick = (index: number) => {
    if (autoPlayInterval.current) clearTimeout(autoPlayInterval.current);

    if (index === activeIndex) {
      // If the active card is clicked, toggle autoplay
      if (isAutoPlaying) {
        // PAUSING
        if (lastTickTimestampRef.current) {
          const elapsedTime = Date.now() - lastTickTimestampRef.current;
          currentSlideTimeLeftRef.current = Math.max(0, currentSlideTimeLeftRef.current - elapsedTime);
        }
        freezeIndicatorFill(activeIndex);
        setIsAutoPlaying(false);
        lastTickTimestampRef.current = null;
      } else {
        // RESUMING
        lastTickTimestampRef.current = Date.now(); // Start new tick
        setIsAutoPlaying(true);
        // The useEffect for autoplay will handle the indicator animation
      }
    } else {
      // If a different card is clicked, make it active and pause autoplay
      resetAllIndicatorFills();
      setActiveIndex(index);
      currentSlideTimeLeftRef.current = autoPlayDuration;
      setIsAutoPlaying(false); // New card starts paused
      lastTickTimestampRef.current = null;
      // Ensure new active indicator is reset (or will be set by effect if we were to make it play)
      if(indicatorFillRefs.current[index]) {
        indicatorFillRefs.current[index]!.style.transition = 'none';
        indicatorFillRefs.current[index]!.style.width = '0%';
      }
    }
  };

  // Effect to manage the autoplay interval and indicator animation
  useEffect(() => {
    if (autoPlayInterval.current) {
      clearTimeout(autoPlayInterval.current);
    }

    if (services.length === 0) return;

    // Ensure indicator refs are setup for the current services
    indicatorFillRefs.current = indicatorFillRefs.current.slice(0, services.length);

    if (isAutoPlaying) {
      if (lastTickTimestampRef.current === null) { // Check if tick needs to start
        lastTickTimestampRef.current = Date.now();
      }
      // Ensure timeLeft is not negative or excessively small
      const timeForThisSlide = Math.max(50, currentSlideTimeLeftRef.current); 

      autoPlayInterval.current = setTimeout(goToNext, timeForThisSlide);
      
      const progressAlreadyMadePercent = ((autoPlayDuration - timeForThisSlide) / autoPlayDuration) * 100;
      animateIndicatorFill(activeIndex, timeForThisSlide, progressAlreadyMadePercent);

    } else {
      // PAUSED state: freeze the current indicator if it was playing
      if (lastTickTimestampRef.current !== null) { // Was playing before this render
         // This implies we just paused. The freezing should be handled by handleCardClick.
         // Or, if state changed causing isAutoPlaying to be false, ensure it's frozen.
         freezeIndicatorFill(activeIndex);
         lastTickTimestampRef.current = null; // Mark tick as ended
      }
    }

    return () => {
      if (autoPlayInterval.current) {
        clearTimeout(autoPlayInterval.current);
      }
    };
  }, [isAutoPlaying, activeIndex, services.length, autoPlayDuration, goToNext]);

  // Setup global styles
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.id = 'services-carousel-styles';
    styleEl.innerHTML = carouselStyles;
    if (!document.getElementById(styleEl.id)) {
      document.head.appendChild(styleEl);
    }
    
    return () => {
      const el = document.getElementById(styleEl.id);
      if (el) document.head.removeChild(el);
    };
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  // Recalculate transform on window resize for responsive centering
  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        trackRef.current.style.transform = getTrackTransform();
      }
    };
    window.addEventListener('resize', handleResize);
    // Initial call to set transform
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, [getTrackTransform]);

  return (
    <div className="carousel-container">
      <div 
        className="carousel-track" 
        ref={trackRef}
        style={{ transform: getTrackTransform() }}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            expandedContent={service.expandedContent}
            icon={service.icon}
            isActive={index === activeIndex}
            onCardClick={() => handleCardClick(index)}
            isPaused={!isAutoPlaying}
          />
        ))}
      </div>
      
      <div className="carousel-controls">
        <button 
          className="carousel-nav-button"
          onClick={goToPrev}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button 
          className="carousel-nav-button"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="carousel-indicators">
        {services.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span 
              className="carousel-indicator-fill"
              ref={el => { indicatorFillRefs.current[index] = el; }}
            ></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;