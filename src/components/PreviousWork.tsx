'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { workItems, WorkItem } from '@/data/workItems';
import CarouselWorkCard from '@/components/CarouselWorkCard';
import WorkModal from '@/components/WorkModal';

const PreviousWork = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);

  // Use all work items for infinite scroll effect
  const displayItems = [...workItems, ...workItems]; // Duplicate for seamless loop

  const FAST_SPEED = 1.5; // pixels per frame
  const SLOW_SPEED = 0.3; // pixels per frame when hovered

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-scroll animation
  const animate = useCallback(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const speed = isHovered ? SLOW_SPEED : FAST_SPEED;
    scrollPositionRef.current += speed;

    // Get the width of the first set of items (half since we duplicated)
    const halfWidth = scrollContainer.scrollWidth / 2;

    // Reset to beginning when we've scrolled past the first set
    if (scrollPositionRef.current >= halfWidth) {
      scrollPositionRef.current = 0;
    }

    scrollContainer.scrollLeft = scrollPositionRef.current;
    animationRef.current = requestAnimationFrame(animate);
  }, [isHovered]);

  // Start/stop animation based on visibility
  useEffect(() => {
    if (isVisible) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, animate]);

  const handleCardClick = (item: WorkItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <>
      <section
        id="work"
        ref={sectionRef}
        className="relative py-24 md:py-32 bg-background overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 mesh-gradient opacity-50" />

        {/* Floating orbs */}
        <div className="absolute top-1/3 -right-32 w-64 h-64 orb orb-violet float-slow" />
        <div className="absolute bottom-1/3 -left-32 w-48 h-48 orb orb-cyan float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 orb orb-indigo opacity-20" />

        {/* Noise overlay */}
        <div className="absolute inset-0 noise pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          {/* Section Header */}
          <div className="container mx-auto px-4">
            <div
              className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full glass-violet mb-6">
                <span className="text-sm font-medium text-violet-200">Our Work</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-white">Previous </span>
                <span className="gradient-text">Projects</span>
              </h2>

              <p className="text-lg text-gray-400 leading-relaxed">
                Explore our portfolio of successful AI implementations that have
                transformed businesses and delivered measurable results.
              </p>
            </div>
          </div>

          {/* Auto-scrolling Carousel */}
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-6 overflow-x-hidden pb-4"
          >
            {displayItems.map((item, index) => (
              <CarouselWorkCard
                key={`${item.id}-${index}`}
                item={item}
                index={index % workItems.length}
                isVisible={isVisible}
                onClick={() => handleCardClick(item)}
              />
            ))}
          </div>

          {/* See More CTA */}
          <div className="container mx-auto px-4">
            <div
              className={`mt-12 text-center transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link
                href="/work"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600" />
                <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 btn-shimmer" />
                <span className="relative z-10">See All Work</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <WorkModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default PreviousWork;
