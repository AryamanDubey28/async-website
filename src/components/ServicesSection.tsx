'use client';

import { useEffect, useState, useRef } from 'react';
import { useRelativeMousePosition, useTilt } from '@/hooks/useMousePosition';

interface Service {
  id: string;
  title: string;
  description: string;
  expandedContent: string[];
  icon: React.ReactNode;
  featured?: boolean;
  wide?: boolean;
}

const services: Service[] = [
  {
    id: 'strategy',
    title: 'AI Strategy',
    description: 'Chart your course. Define a powerful AI strategy aligned precisely with your business objectives.',
    expandedContent: [
      'AI Readiness Assessment',
      'Opportunity Identification & Prioritisation',
      'Business Goal Alignment',
      'Technology Stack Evaluation',
      'Phased Implementation Roadmap',
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    featured: true,
  },
  {
    id: 'implementation',
    title: 'AI Implementation',
    description: 'Bring your AI strategy to life with seamless deployment and integration.',
    expandedContent: [
      'Secure Deployment Execution',
      'System & API Integration',
      'Rigorous Production Testing',
      'Infrastructure Optimisation',
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'custom',
    title: 'Custom AI Development',
    description: 'Bespoke solutions engineered precisely for your unique operational needs.',
    expandedContent: [
      'Privacy-First Design',
      'Solution Blueprint',
      'Tailored AI Architecture',
      'Core Logic Build',
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'training',
    title: 'AI Training & Workshops',
    description: 'Upskill your workforce with focused AI training for real-world impact.',
    expandedContent: [
      'Foundational AI Literacy',
      'Practical AI Tool Application',
      'Responsible AI Practice',
      'Workflow Integration Skills',
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
    wide: true,
  },
  {
    id: 'support',
    title: 'AI Support & Optimisation',
    description: 'Ongoing support to ensure your AI solutions continue to deliver peak performance.',
    expandedContent: [
      'Performance Monitoring',
      'Model Fine-tuning',
      'Issue Resolution',
      'Continuous Improvement',
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
      </svg>
    ),
    wide: true,
  },
];

const ServiceCard = ({ service, index, isVisible }: { service: Service; index: number; isVisible: boolean }) => {
  const isFeatured = service.featured;
  const isWide = service.wide;
  const cardRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRelativeMousePosition(cardRef);
  const tiltStyle = useTilt(cardRef, { max: 8, scale: 1.02 });

  const getGridClasses = () => {
    if (isFeatured) return 'lg:col-span-4 lg:row-span-2 md:col-span-2';
    if (isWide) return 'lg:col-span-3 md:col-span-1';
    return 'lg:col-span-2 md:col-span-1';
  };

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-2xl transition-opacity duration-500 ${getGridClasses()} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
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
          isFeatured ? 'p-8 md:p-10' : 'p-6'
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

        {/* Icon */}
        <div
          className={`relative z-10 inline-flex items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 group-hover:text-violet-300 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-sm ${
            isFeatured ? 'w-14 h-14 mb-6' : 'w-12 h-12 mb-4'
          }`}
        >
          {service.icon}
        </div>

        {/* Title */}
        <h3
          className={`relative z-10 font-bold text-white mb-3 group-hover:text-violet-100 transition-colors duration-300 ${
            isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className={`relative z-10 text-gray-400 group-hover:text-gray-300 transition-colors duration-300 ${
            isFeatured ? 'text-lg mb-6' : 'text-sm mb-4'
          }`}
        >
          {service.description}
        </p>

        {/* Expanded content for featured or on hover */}
        <div className={`relative z-10 ${isFeatured ? 'block' : 'hidden md:block'}`}>
          <div className="border-t border-white/10 pt-4 mt-4">
            <p className="text-xs uppercase tracking-wider text-violet-400 mb-3 font-medium">
              Services include
            </p>
            <ul className="space-y-2">
              {service.expandedContent.slice(0, isFeatured ? 5 : 3).map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 group-hover:bg-violet-400 transition-colors duration-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 orb orb-violet float-slow" />
      <div className="absolute bottom-1/4 -right-32 w-48 h-48 orb orb-cyan float" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-violet mb-6">
            <span className="text-sm font-medium text-violet-200">Our Services</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Unlock AI </span>
            <span className="gradient-text">Potential</span>
          </h2>

          <p className="text-lg text-gray-400 leading-relaxed">
            From strategy to implementation, we provide end-to-end AI services
            tailored to drive innovation and growth.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={handleContactClick}
            className="group relative px-8 py-4 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600" />
            <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-0 btn-shimmer" />
            <span className="relative z-10">Request a Consultation</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
