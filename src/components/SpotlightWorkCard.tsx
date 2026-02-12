'use client';

import { useRef } from 'react';
import { WorkItem } from '@/data/workItems';
import { useRelativeMousePosition, useTilt } from '@/hooks/useMousePosition';

interface SpotlightWorkCardProps {
  item: WorkItem;
  index: number;
  isVisible: boolean;
  onClick: () => void;
  variant: 'spotlight' | 'secondary';
  isHovered?: boolean;
  onHover?: (isHovered: boolean) => void;
}

const SpotlightWorkCard = ({
  item,
  index,
  isVisible,
  onClick,
  variant,
  isHovered = false,
  onHover,
}: SpotlightWorkCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRelativeMousePosition(cardRef);
  const tiltStyle = useTilt(cardRef, { max: variant === 'spotlight' ? 5 : 8, scale: 1.02 });

  const isSpotlight = variant === 'spotlight';

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className={`group relative rounded-2xl cursor-pointer transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        ...tiltStyle,
      }}
    >
      {/* Mouse-tracking spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: mousePosition.isInside
            ? `radial-gradient(${isSpotlight ? '800px' : '500px'} circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.2), transparent 40%)`
            : 'none',
        }}
      />

      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card content */}
      <div
        className={`relative h-full glass rounded-2xl overflow-hidden transition-all duration-500 group-hover:bg-white/[0.06] ${
          isSpotlight ? 'min-h-[500px] md:min-h-[550px]' : 'min-h-[260px]'
        }`}
      >
        {/* Mouse-tracking inner glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: mousePosition.isInside
              ? `radial-gradient(${isSpotlight ? '600px' : '300px'} circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.1), transparent 40%)`
              : 'none',
          }}
        />

        {/* Background glow on hover */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Thumbnail Area - Full card background for spotlight */}
        <div
          className={`relative w-full bg-gradient-to-br from-violet-500/20 via-indigo-500/20 to-cyan-500/20 overflow-hidden ${
            isSpotlight ? 'h-64 md:h-72' : 'h-28'
          }`}
        >
          {/* Animated mesh gradient */}
          <div className="absolute inset-0 mesh-gradient opacity-40" />


          {/* Floating icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`rounded-2xl bg-violet-500/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow border border-violet-500/20 ${
                isSpotlight ? 'w-24 h-24' : 'w-14 h-14'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`text-violet-400 transition-all duration-300 group-hover:text-violet-300 ${
                  isSpotlight ? 'h-12 w-12' : 'h-7 w-7'
                }`}
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

          {/* Gradient overlay at bottom */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(5,5,8,1)] via-[rgba(5,5,8,0.8)] to-transparent ${
            isSpotlight ? 'h-32' : 'h-16'
          }`} />
        </div>

        {/* Content */}
        <div className={`relative z-10 ${isSpotlight ? 'p-8' : 'p-5'}`}>
          {/* Tags */}
          <div className={`flex flex-wrap gap-2 ${isSpotlight ? 'mb-4' : 'mb-3'}`}>
            {item.tags.slice(0, isSpotlight ? 3 : 2).map((tag) => (
              <span
                key={tag}
                className={`font-medium rounded-full glass-violet text-violet-200 transition-all duration-300 group-hover:bg-violet-500/20 ${
                  isSpotlight ? 'px-3 py-1 text-xs' : 'px-2 py-0.5 text-[10px]'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-white mb-3 group-hover:text-violet-100 transition-colors duration-300 ${
              isSpotlight ? 'text-2xl md:text-3xl' : 'text-base md:text-lg'
            }`}
          >
            {item.title}
          </h3>

          {/* Description */}
          <p
            className={`text-gray-400 group-hover:text-gray-300 transition-colors duration-300 ${
              isSpotlight ? 'text-base md:text-lg leading-relaxed line-clamp-4' : 'text-xs md:text-sm line-clamp-2'
            }`}
          >
            {item.shortDescription}
          </p>

          {/* View Project Indicator */}
          <div className={`flex items-center gap-2 text-violet-400 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${
            isSpotlight ? 'mt-6 text-base' : 'mt-4 text-sm'
          }`}>
            <span>View Project</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`transform group-hover:translate-x-1 transition-transform duration-300 ${
                isSpotlight ? 'h-5 w-5' : 'h-4 w-4'
              }`}
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

        {/* Spotlight badge for featured item */}
        {isSpotlight && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold">
            Featured
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotlightWorkCard;
