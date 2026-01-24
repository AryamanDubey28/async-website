'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import WorkCard from '@/components/WorkCard';
import WorkModal from '@/components/WorkModal';
import { workItems, WorkItem } from '@/data/workItems';

export default function WorkPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleCardClick = (item: WorkItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <main className="min-h-screen bg-background text-white">
      <ScrollProgress />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 aurora-bg">
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="absolute inset-0 noise pointer-events-none" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 orb orb-violet float-slow" />
        <div className="absolute bottom-1/4 -right-32 w-48 h-48 orb orb-cyan float" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-violet mb-6">
            <span className="text-sm font-medium text-violet-200">Portfolio</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="gradient-text">Work</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover how we&apos;ve helped businesses transform their operations
            with cutting-edge AI solutions.
          </p>
        </div>
      </section>

      {/* Work Grid Section */}
      <section
        ref={sectionRef}
        className="relative py-16 md:py-24 bg-background overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="absolute inset-0 noise pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {workItems.map((item, index) => (
              <WorkCard
                key={item.id}
                item={item}
                index={index}
                isVisible={isVisible}
                onClick={() => handleCardClick(item)}
                featured={item.featured}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 bg-background overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 orb orb-indigo opacity-30" />
        <div className="absolute inset-0 noise pointer-events-none" />

        {/* Content */}
        <div
          className={`relative z-10 container mx-auto px-4 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Ready to </span>
            <span className="gradient-text">Start Your Project?</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Let&apos;s discuss how AI can transform your business and deliver
            measurable results.
          </p>

          <button
            onClick={() => {
              window.location.href = '/#contact';
            }}
            className="group relative inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600" />
            <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-0 btn-shimmer" />
            <span className="relative z-10">Get in Touch</span>
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
          </button>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      <WorkModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
