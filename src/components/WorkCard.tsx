'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { WorkItem, PLACEHOLDER_IMAGE } from '@/data/workItems';
import { useRelativeMousePosition, useTilt } from '@/hooks/useMousePosition';

interface WorkCardProps {
  item: WorkItem;
  index: number;
  isVisible: boolean;
  onClick: () => void;
  featured?: boolean;
}

const WorkCard = ({ item, index, isVisible, onClick, featured = false }: WorkCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRelativeMousePosition(cardRef);
  const tiltStyle = useTilt(cardRef, { max: 8, scale: 1.02 });
  const [imgError, setImgError] = useState(false);

  const imageSrc = item.thumbnail && !imgError ? item.thumbnail : PLACEHOLDER_IMAGE;
  const isPlaceholder = !item.thumbnail || imgError;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`group relative rounded-2xl cursor-pointer transition-all duration-500 ${
        featured ? 'lg:col-span-2 lg:row-span-2' : ''
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        ...tiltStyle,
      }}
    >
      {/* Mouse-tracking spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: mousePosition.isInside
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`
            : 'none',
        }}
      />

      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card content */}
      <div
        className={`relative h-full glass rounded-2xl overflow-hidden transition-all duration-300 group-hover:bg-white/[0.04] ${
          featured ? 'min-h-[400px]' : 'min-h-[280px]'
        }`}
      >
        {/* Mouse-tracking inner glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: mousePosition.isInside
              ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.08), transparent 40%)`
              : 'none',
          }}
        />

        {/* Background glow on hover */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Thumbnail Area */}
        <div
          className={`relative w-full bg-gradient-to-br from-violet-500/20 via-indigo-500/20 to-cyan-500/20 overflow-hidden ${
            featured ? 'h-48' : 'h-32'
          }`}
        >
          {isPlaceholder ? (
            <>
              <div className="absolute inset-0 mesh-gradient opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`rounded-xl bg-violet-500/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-sm ${
                    featured ? 'w-16 h-16' : 'w-12 h-12'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`text-violet-400 ${featured ? 'h-8 w-8' : 'h-6 w-6'}`}
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
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          )}
          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[rgba(5,5,8,0.8)] to-transparent" />
        </div>

        {/* Content */}
        <div className={`relative z-10 ${featured ? 'p-6' : 'p-4'}`}>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tags.slice(0, featured ? 3 : 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium rounded-full glass-violet text-violet-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-white mb-2 group-hover:text-violet-100 transition-colors duration-300 ${
              featured ? 'text-xl md:text-2xl' : 'text-lg'
            }`}
          >
            {item.title}
          </h3>

          {/* Description */}
          <p
            className={`text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3 ${
              featured ? 'text-sm md:text-base' : 'text-xs md:text-sm'
            }`}
          >
            {item.shortDescription}
          </p>

          {/* View Project Indicator */}
          <div className="mt-4 flex items-center gap-2 text-violet-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
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

export default WorkCard;
