'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { WorkItem, PLACEHOLDER_IMAGE } from '@/data/workItems';
import { useRelativeMousePosition } from '@/hooks/useMousePosition';

interface CarouselWorkCardProps {
  item: WorkItem;
  index: number;
  isVisible: boolean;
  onClick: () => void;
}

const CarouselWorkCard = ({
  item,
  index,
  isVisible,
  onClick,
}: CarouselWorkCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRelativeMousePosition(cardRef);
  const [imgError, setImgError] = useState(false);

  const imageSrc = item.thumbnail && !imgError ? item.thumbnail : PLACEHOLDER_IMAGE;
  const isPlaceholder = !item.thumbnail || imgError;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`group relative flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] snap-center cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Mouse-tracking spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: mousePosition.isInside
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.2), transparent 40%)`
            : 'none',
        }}
      />

      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card content */}
      <div className="relative h-full glass rounded-2xl overflow-hidden transition-all duration-500 group-hover:bg-white/[0.06] group-hover:scale-[1.02]">
        {/* Background glow on hover */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Thumbnail Area */}
        <div className="relative w-full h-52 bg-gradient-to-br from-violet-500/20 via-indigo-500/20 to-cyan-500/20 overflow-hidden">
          {isPlaceholder ? (
            <>
              {/* Animated mesh gradient */}
              <div className="absolute inset-0 mesh-gradient opacity-40" />

              {/* Floating icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-violet-500/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow border border-violet-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-violet-400 transition-all duration-300 group-hover:text-violet-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <Image
              src={imageSrc}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 85vw, 450px"
              priority={item.featured}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          )}

          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[rgba(10,10,15,1)] via-[rgba(10,10,15,0.8)] to-transparent" />

          {/* Featured badge */}
          {item.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold z-10">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full glass-violet text-violet-200 transition-all duration-300 group-hover:bg-violet-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-violet-100 transition-colors duration-300">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
            {item.shortDescription}
          </p>

          {/* View Project Indicator */}
          <div className="flex items-center gap-2 text-violet-400 font-medium mt-5 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span>View Project</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselWorkCard;
