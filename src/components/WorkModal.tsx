'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { WorkItem, PLACEHOLDER_IMAGE } from '@/data/workItems';

interface WorkModalProps {
  item: WorkItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const WorkModal = ({ item, isOpen, onClose }: WorkModalProps) => {
  const [imgError, setImgError] = useState(false);

  const imageSrc = item?.thumbnail && !imgError ? item.thumbnail : PLACEHOLDER_IMAGE;
  const isPlaceholder = !item?.thumbnail || imgError;

  // Reset image error state when item changes
  useEffect(() => {
    setImgError(false);
  }, [item?.id]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !item) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Thumbnail */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-violet-500/20 via-indigo-500/20 to-cyan-500/20 overflow-hidden">
          {isPlaceholder ? (
            <>
              <div className="absolute inset-0 mesh-gradient opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-violet-500/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-violet-400"
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
              alt={item?.title || 'Project thumbnail'}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
              onError={() => setImgError(true)}
            />
          )}
          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0f1c] to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full glass-violet text-violet-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {item.title}
          </h2>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed text-base md:text-lg">
            {item.fullDescription}
          </p>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="group relative px-6 py-3 rounded-full text-white font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600" />
              <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 btn-shimmer" />
              <span className="relative z-10">Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkModal;
