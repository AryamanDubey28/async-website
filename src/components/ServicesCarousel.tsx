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
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 23, 42, 0.65);
    color: white;
    border: 1px solid rgba(59, 130, 246, 0.25);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(8px);
  }
  
  .carousel-nav-button:hover {
    background: linear-gradient(135deg, rgba(56, 224, 204, 0.9), rgba(185, 105, 254, 0.9));
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(56, 224, 204, 0.4);
    border-color: transparent;
  }
  
  .carousel-nav-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(56, 224, 204, 0.5);
  }
  
  .carousel-nav-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  /* Indicators */
  .carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
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
  
  .carousel-indicator.active::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, rgb(56, 224, 204), rgb(185, 105, 254), rgb(75, 141, 250));
    background-size: 200% 100%;
    animation: shimmer 2s infinite linear;
  }
  
  @keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: 0 0; }
  }
`;

const ServicesCarousel = ({ services }: ServicesCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);
  const autoPlayDuration = 7000; // 7 seconds per slide
  const trackRef = useRef<HTMLDivElement>(null);

  // Calculate the correct transform for the track
  const getTrackTransform = useCallback(() => {
    if (!trackRef.current) return 'translateX(0)';
    
    const trackWidth = trackRef.current.offsetWidth;
    const cardWidth = trackWidth * 0.8; // 80% of track width
    
    // For large screens, center the active card
    if (window.innerWidth >= 1024) {
      const offset = (trackWidth - cardWidth) / 2;
      return `translateX(calc(-${activeIndex * cardWidth}px + ${offset}px))`;
    }
    
    // For smaller screens, simple translation
    return `translateX(-${activeIndex * cardWidth}px)`;
  }, [activeIndex]);

  const goToNext = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
  }, [services.length]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  }, [services.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (!isAutoPlaying) return;
    
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }
    
    autoPlayInterval.current = setInterval(goToNext, autoPlayDuration);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Setup auto-play
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.id = 'services-carousel-styles';
    styleEl.innerHTML = carouselStyles;
    if (!document.getElementById(styleEl.id)) {
      document.head.appendChild(styleEl);
    }
    
    if (isAutoPlaying) {
      autoPlayInterval.current = setInterval(goToNext, autoPlayDuration);
    } else {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    }
    
    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
      const el = document.getElementById(styleEl.id);
      if (el) document.head.removeChild(el);
    };
  }, [isAutoPlaying, goToNext]);

  // Reset auto-play when active index changes
  useEffect(() => {
    resetAutoPlay();
  }, [activeIndex]);

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
          onClick={toggleAutoPlay}
          aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
        >
          {isAutoPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          )}
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
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;