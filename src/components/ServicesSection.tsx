'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

// Add global styles at the top of the file
const globalStyles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  @keyframes bounce-x {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(5px);
    }
  }
  .animate-bounce-x {
    animation: bounce-x 1.5s infinite;
  }
  @keyframes scanner {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  .animate-scanner {
    animation: scanner 8s linear infinite;
  }
`;

const services = [
  {
    id: 'strategy',
    title: 'AI Strategy',
    description: 'Chart your course. Define a powerful AI strategy aligned precisely with your business objectives.',
    expandedContent: [
      'Embedded Privacy Architecture Design: Building your AI strategy upon a secure, bespoke architecture, designed ground-up to guarantee absolute data confidentiality even when deploying sophisticated AI capabilities.',
      'AI Readiness Assessment: Evaluate your current capabilities, data, and infrastructure.',
      'Opportunity Identification & Prioritisation: Pinpoint high-impact AI use cases for maximum ROI.',
      'Business Goal Alignment: Ensure your AI initiatives directly support core objectives.',
      'Technology Stack Evaluation: Select the right tools and platforms for your needs.',
      'Phased Implementation Roadmap: Create a clear, actionable plan for AI adoption.'
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'implementation',
    title: 'AI Implementation',
    description: 'Bring your AI strategy to life. Seamless deployment and integration into your live operations.',
    expandedContent: [
      'Secure Deployment Execution: Implement AI solutions securely across cloud, on-premise, or hybrid environments based on your architecture.',
      'System & API Integration: Connect AI tools seamlessly with your existing software, databases, and workflows for smooth operation.',
      'Rigorous Production Testing: Validate performance, accuracy, and stability within your live operational environment before final handover.',
      'Infrastructure Optimisation: Tune and configure the target environment for stable, scalable AI performance under real-world load.'
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'custom',
    title: 'Custom AI Development',
    description: 'Solutions built from the ground up, precisely engineered for your unique operational needs.',
    expandedContent: [
      'Privacy-First Design: Embedding robust data confidentiality principles directly into the solution architecture.',
      'Solution Blueprint: Defining precise functional and performance requirements for the custom build.',
      'Tailored AI Architecture: Crafting the specific AI models and technical structure matched precisely to requirements.',
      'Core Logic Build: Building the unique processing engine central to your specific AI solution.'
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'training',
    title: 'AI Training & Workshops',
    description: 'Upskill your workforce. Focused AI training and workshops designed for real-world operational impact.',
    expandedContent: [
      'Foundational AI Literacy: Demystifying core AI concepts, capabilities, and limitations for business users.',
      'Practical AI Tool Application: Hands-on sessions focused on leveraging specific AI tools relevant to operational roles.',
      'Responsible AI Practice: Understanding ethical considerations, data privacy, and identifying potential bias in AI usage.',
      'Workflow Integration Skills: Equipping teams to spot opportunities and effectively integrate AI into daily tasks.'
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
];

const ServicesSection = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  // Add effect to inject global styles once on mount
  useEffect(() => {
    // Check if the style element already exists
    const id = 'services-section-styles';
    if (!document.getElementById(id)) {
      const styleElement = document.createElement('style');
      styleElement.id = id;
      styleElement.innerHTML = globalStyles;
      document.head.appendChild(styleElement);
    }
    
    // Clean up on unmount
    return () => {
      const styleElement = document.getElementById(id);
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  const toggleService = (id: string) => {
    if (activeService === id) {
      setActiveService(null);
    } else {
      setActiveService(id);
      
      // Scroll the active card into view if needed
      setTimeout(() => {
        const activeElement = document.getElementById(`service-card-${id}`);
        if (activeElement && carouselRef.current) {
          const containerRect = carouselRef.current.getBoundingClientRect();
          const activeRect = activeElement.getBoundingClientRect();
          
          // Calculate if we need to scroll
          if (activeRect.left < containerRect.left || activeRect.right > containerRect.right) {
            carouselRef.current.scrollTo({
              left: activeElement.offsetLeft - 32,
              behavior: 'smooth'
            });
          }
        }
      }, 100);
    }
  };
  
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Modern background styling */}
      <div className="absolute inset-0 bg-gray-900"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,222,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,222,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      {/* Subtle floating elements */}
      <div className="absolute top-1/4 left-20 w-12 h-12 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-xl animate-float-1 opacity-60 shadow-lg shadow-teal-500/10 backdrop-blur-sm border border-teal-400/20"></div>
      <div className="absolute bottom-1/4 right-20 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-teal-400/20 rounded-lg animate-float-2 opacity-60 shadow-lg shadow-purple-500/10 backdrop-blur-sm border border-purple-400/20"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-purple-400/10 rounded-lg blur-sm"></div>
            <h2 className="relative text-3xl md:text-4xl font-bold mb-4">
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">Services</span>
            </h2>
          </div>
          <p className="text-gray-300 max-w-xl mx-auto mt-4">
            End-to-end AI consultancy to help you navigate the complex world of artificial intelligence and unlock its full potential.
          </p>
        </div>
        
        {/* Carousel navigation indicators */}
        <div className="flex justify-center mb-8 gap-2 md:hidden">
          {services.map((service) => (
            <button
              key={`nav-${service.id}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeService === service.id || hoveredService === service.id
                  ? 'bg-teal-400' 
                  : 'bg-gray-700'
              }`}
              onClick={() => {
                const element = document.getElementById(`service-card-${service.id}`);
                if (element && carouselRef.current) {
                  carouselRef.current.scrollTo({
                    left: element.offsetLeft - 32,
                    behavior: 'smooth'
                  });
                }
              }}
            />
          ))}
        </div>
        
        {/* Carousel scroll hint */}
        <div className="hidden md:flex items-center justify-center mb-8 text-gray-400">
          <div className="w-6 h-6 animate-bounce-x mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-sm">Scroll or swipe to explore</span>
          <div className="w-6 h-6 animate-bounce-x ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        {/* Horizontal scrollable carousel */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex gap-6">
            {services.map((service) => (
              <motion.div
                id={`service-card-${service.id}`}
                key={service.id}
                layout
                transition={{ 
                  layout: { duration: 0.4, ease: "easeOut" },
                  height: { duration: 0.4, ease: "easeOut" }
                }}
                className={`
                  snap-center flex-shrink-0 
                  ${activeService === service.id ? 'w-[calc(100vw-4rem)] max-w-4xl' : 'w-80'}
                  h-fit
                  transition-all duration-400
                `}
              >
                <div 
                  className={`
                    relative rounded-2xl h-full
                    bg-gray-900/60 backdrop-blur-sm overflow-hidden
                    border transition-all duration-300
                    hover:shadow-lg hover:shadow-teal-500/10
                    ${activeService === service.id 
                      ? 'border-teal-500/40 shadow-lg shadow-teal-500/10' 
                      : 'border-gray-700/50'}
                  `}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  {/* Tech grid background */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden opacity-15">
                    <div className="absolute inset-0 bg-[radial-gradient(#4fd1c515_1px,transparent_1px)] [background-size:8px_8px] opacity-70"></div>
                    {activeService === service.id && (
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#4fd1c508_50%,transparent_100%)] animate-scanner"></div>
                    )}
                  </div>
                  
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Card content - always visible */}
                    <div 
                      className={`
                        p-6 flex flex-col h-full cursor-pointer relative z-10
                        ${activeService === service.id ? 'md:w-80 border-b md:border-b-0 md:border-r border-gray-700/50' : 'w-full'}
                      `}
                      onClick={() => toggleService(service.id)}
                    >
                      {/* Service icon */}
                      <div className={`
                        w-12 h-12 rounded-lg flex items-center justify-center mb-5
                        transition-all duration-300
                        ${activeService === service.id || hoveredService === service.id
                          ? 'bg-gradient-to-br from-teal-500/15 to-purple-500/15 text-teal-400'
                          : 'bg-gray-800/70 text-gray-400'}
                      `}>
                        {service.icon}
                      </div>
                      
                      {/* Service title */}
                      <h3 className={`
                        text-xl font-bold mb-3 transition-all duration-300
                        ${activeService === service.id 
                          ? 'bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-400' 
                          : 'text-white'}
                      `}>
                        {service.title}
                      </h3>
                      
                      {/* Service description */}
                      <p className="text-gray-300 mb-5">
                        {service.description}
                      </p>
                      
                      {/* Expand/collapse indicator */}
                      <div className="mt-auto flex items-center">
                        <div className={`
                          h-px w-6 mr-3 transition-all duration-300
                          ${activeService === service.id || hoveredService === service.id
                            ? 'bg-teal-400'
                            : 'bg-gray-700'}
                        `}></div>
                        <span className={`
                          text-sm font-medium flex items-center gap-1.5
                          transition-all duration-300
                          ${activeService === service.id 
                            ? 'text-teal-400' 
                            : 'text-gray-500'}
                        `}>
                          {activeService === service.id ? 'View less' : 'View more'}
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-3.5 w-3.5 transition-transform duration-300 ${
                              activeService === service.id ? 'rotate-180' : ''
                            }`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    
                    {/* Expanded content */}
                    {activeService === service.id && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="p-6 md:flex-1 overflow-y-auto max-h-[600px]"
                      >
                        <h4 className="text-teal-400 text-lg font-medium mb-6">Services include:</h4>
                        <ul className="space-y-4 mb-6">
                          {service.expandedContent.map((item, i) => (
                            <motion.li 
                              key={i} 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                              className="flex items-start gap-3"
                            >
                              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-purple-400 mt-2"></span>
                              <span className="text-gray-300">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                        
                        {/* Action button */}
                        <motion.button 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          className="w-full py-3 rounded-lg
                            bg-gradient-to-r from-teal-500 to-purple-500
                            hover:shadow-lg hover:shadow-teal-500/20 
                            transition-all duration-300 text-white font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          Discuss Your Project
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Subtle hover effect */}
                  {!activeService && (
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-purple-500/0 to-blue-600/0 opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to action button */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-lg 
              group relative
              bg-gradient-to-r from-teal-500 to-purple-500 
              text-white font-medium 
              transition-all duration-300 
              hover:shadow-lg hover:shadow-teal-500/20 
              hover:scale-105 
              focus:outline-none focus:ring-2 focus:ring-teal-400/50
              overflow-hidden"
          >
            <span className="relative z-10">Book a Consultation</span>
            <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 