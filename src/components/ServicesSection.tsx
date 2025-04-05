'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import ScrollRevealContainer from './ScrollRevealContainer';
import StaggeredGrid from './StaggeredGrid';

const services = [
  {
    id: 'strategy',
    title: 'AI Strategy',
    description: 'Develop a comprehensive AI roadmap tailored to your business goals and industry challenges.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'implementation',
    title: 'AI Implementation',
    description: 'Expert guidance and technical support to seamlessly integrate AI solutions into your existing systems.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'custom',
    title: 'Custom Development',
    description: 'Bespoke AI applications designed and developed specifically for your unique business requirements.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'training',
    title: 'AI Training & Workshops',
    description: 'Empower your team with the knowledge and skills to leverage AI effectively in their daily operations.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
];

const ServicesSection = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const expandRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [expandHeights, setExpandHeights] = useState<{ [key: string]: number }>({});

  // Measure the height of each expandable content section
  useEffect(() => {
    const heights: { [key: string]: number } = {};
    
    services.forEach(service => {
      if (expandRefs.current[service.id]) {
        heights[service.id] = expandRefs.current[service.id]?.scrollHeight || 0;
      }
    });
    
    setExpandHeights(heights);
  }, []);

  return (
    <div className="relative bg-gray-900 py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-teal-500/20 via-purple-500/15 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-tr from-purple-600/20 via-blue-500/15 to-teal-500/20 rounded-full blur-3xl animate-pulse-slower"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-teal-400/20 via-purple-400/15 to-blue-500/20 rounded-full blur-3xl"></div>
        
        {/* Adding dynamic floating elements with varied animations */}
        <div className="absolute top-1/4 left-20 w-12 h-12 bg-gradient-to-br from-teal-400/30 to-blue-500/30 rounded-xl float-1 opacity-70 shadow-lg shadow-teal-500/20 backdrop-blur-sm border border-teal-400/30"></div>
        <div className="absolute bottom-1/4 right-20 w-10 h-10 bg-gradient-to-br from-purple-500/30 to-teal-400/30 rounded-lg float-2 opacity-70 shadow-lg shadow-purple-500/20 backdrop-blur-sm border border-purple-400/30"></div>
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-r from-teal-500/30 to-blue-500/30 rounded-full float-3 opacity-70 shadow-lg shadow-blue-500/20 backdrop-blur-sm border border-blue-400/30"></div>
        <div className="absolute top-[35%] right-[30%] w-14 h-14 bg-gradient-to-br from-teal-500/30 to-purple-400/30 rounded-lg float-4 opacity-70 shadow-lg shadow-purple-500/20 backdrop-blur-sm border border-purple-400/30"></div>
        <div className="absolute bottom-[15%] left-[15%] w-6 h-6 bg-gradient-to-br from-purple-400/30 to-teal-400/30 rounded-full float-2 opacity-70 shadow-lg shadow-teal-500/20 backdrop-blur-sm border border-teal-400/30"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-block relative mb-3">
            {/* Even more reduced glow on the "Our Services" heading */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-purple-400/10 rounded-lg blur-sm"></div>
            <h2 className="relative text-3xl md:text-4xl font-bold">
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">Services</span>
            </h2>
          </div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            End-to-end AI consultancy to help you navigate the complex world of artificial intelligence and unlock its full potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            // Alternate between left and right reveal directions for a more dynamic effect
            const direction = index % 2 === 0 ? "fromLeft" : "fromRight";
            
            return (
              <ScrollRevealContainer 
                key={service.id} 
                direction={direction}
                duration={0.6} 
                offset={['0 0.9', '0.3 0.9']}
                className="h-full"
              >
                <div 
                  className="relative bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 overflow-visible group hover-scale border border-teal-500/20 shadow-xl shadow-teal-500/5 h-full transition-all duration-300 hover:z-20"
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  {/* Animated background gradient - lighter */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-teal-500/15 via-purple-500/10 to-blue-600/15 transition-all duration-500 ${
                    activeService === service.id ? 'opacity-100 scale-[1.03]' : 'opacity-0 scale-100'
                  } rounded-xl`}></div>
                  
                  {/* Tech grid lines for tech effect - lighter */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(#4fd1c515_1px,transparent_1px)] [background-size:8px_8px] opacity-70"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#4fd1c508_50%,transparent_100%)] animate-scanner"></div>
                  </div>
                  
                  {/* Card Wrapper with transform effect */}
                  <div className={`relative z-10 transition-all duration-300 ${
                    activeService === service.id ? 'transform scale-[1.03]' : ''
                  }`}>
                    <div className="w-12 h-12 rounded-lg bg-gray-800/60 backdrop-blur-sm flex items-center justify-center mb-6 text-teal-400 group-hover:bg-teal-400/15 transition-all duration-300 transform group-hover:scale-110 border border-teal-400/20">
                      {service.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:via-purple-400 group-hover:to-blue-500">{service.title}</h3>
                    <p className="text-gray-300 transition-all duration-300 group-hover:text-gray-200">{service.description}</p>
                  </div>
                  
                  {/* Expandable content */}
                  <div 
                    ref={(el) => {
                      expandRefs.current[service.id] = el;
                    }}
                    className="absolute left-0 right-0 mt-2 overflow-hidden bg-gray-900/90 backdrop-blur-xl rounded-b-xl border border-teal-400/20 shadow-lg shadow-teal-500/10 px-6 py-4 z-30 transform transition-all duration-300"
                    style={{
                      top: '100%',
                      opacity: activeService === service.id ? 1 : 0,
                      visibility: activeService === service.id ? 'visible' : 'hidden',
                      transform: activeService === service.id ? 'translateY(0) scale(1.03)' : 'translateY(-10px) scale(0.98)',
                      transformOrigin: 'top center',
                      pointerEvents: activeService === service.id ? 'auto' : 'none',
                      transition: 'opacity 200ms ease, visibility 0ms linear ' + 
                        (activeService === service.id ? '0ms' : '200ms') + ', transform 300ms ease'
                    }}
                  >
                    <button className="text-teal-400 flex items-center group px-3 py-2 rounded-lg hover:bg-teal-400/5 transition-all duration-200 w-full">
                      <span>Learn more</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-200 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Animated border - lighter */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    activeService === service.id 
                      ? 'border border-teal-400/30 shadow-[0_0_20px_rgba(56,178,172,0.15)] after:opacity-100 scale-[1.03]' 
                      : 'border border-transparent after:opacity-0 scale-100'
                  } after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border after:border-teal-400/10 after:scale-[1.02] after:transition-all after:duration-300`}></div>
                </div>
              </ScrollRevealContainer>
            );
          })}
        </div>
        
        <div className="mt-24 mb-12 text-center">
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-purple-400/10 rounded-full blur-sm opacity-30 group-hover:opacity-100 transition-opacity duration-200"></div>
            <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400/50 overflow-hidden">
              <span className="relative z-10">Book a Consultation</span>
              <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection; 