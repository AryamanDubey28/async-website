'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

// Add global styles at the top of the file
const globalStyles = `
  @keyframes pulse-glow {
    0%, 100% {
      opacity: 0.8;
    }
    50% {
      opacity: 1;
    }
  }
  .pulse-glow {
    animation: pulse-glow 3s ease-in-out infinite;
  }
  
  .service-card-wrapper {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    min-height: 280px;
    will-change: transform;
  }
  
  .service-card-wrapper:hover {
    transform: rotate(0deg) scale(1.03) !important;
    z-index: 20;
  }
  
  /* Ensure the expanded content has room to grow */
  .service-card-wrapper:hover .service-card {
    height: auto;
    min-height: 450px; /* Give extra space for expanded content */
  }
  
  /* Fix for services section content */
  .service-card {
    display: flex;
    flex-direction: column;
  }
  
  /* Ensure the content doesn't get cut off */
  .service-card-wrapper:hover .expandable-content {
    pointer-events: auto !important;
    visibility: visible !important;
    display: block !important;
  }
  
  @keyframes float-particle-1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(10px, -15px) rotate(5deg); }
    50% { transform: translate(20px, 10px) rotate(10deg); }
    75% { transform: translate(-5px, 15px) rotate(5deg); }
  }
  
  @keyframes float-particle-2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-15px, 10px) rotate(-5deg); }
    50% { transform: translate(10px, 20px) rotate(-10deg); }
    75% { transform: translate(15px, -10px) rotate(-15deg); }
  }
  
  @keyframes float-particle-3 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(15px, 15px) rotate(15deg); }
    66% { transform: translate(-15px, -15px) rotate(-15deg); }
  }
  
  .floating-particle-1 {
    animation: float-particle-1 15s ease-in-out infinite;
  }
  
  .floating-particle-2 {
    animation: float-particle-2 20s ease-in-out infinite;
  }
  
  .floating-particle-3 {
    animation: float-particle-3 18s ease-in-out infinite;
  }
  
  /* New animations for more dynamic elements */
  @keyframes fade-in-out {
    0%, 100% { opacity: 0.05; }
    50% { opacity: 0.2; }
  }
  
  @keyframes pulse-size {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes float-vertical {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes float-horizontal {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(20px); }
  }
  
  @keyframes rotate-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .fade-in-out {
    animation: fade-in-out 4s ease-in-out infinite;
  }
  
  .pulse-size {
    animation: pulse-size 8s ease-in-out infinite;
  }
  
  .float-vertical {
    animation: float-vertical 12s ease-in-out infinite;
  }
  
  .float-horizontal {
    animation: float-horizontal 10s ease-in-out infinite;
  }
  
  .rotate-slow {
    animation: rotate-slow 30s linear infinite;
  }
`;

// Define random offsets for each service card - using numbers instead of strings
const randomOffsets = [
  { rotate: -1, translateY: 0, scale: 1.02 },
  { rotate: 1.5, translateY: 25, scale: 0.98 },
  { rotate: -0.7, translateY: 45, scale: 1 },
  { rotate: 0.9, translateY: 10, scale: 1.01 }
];

// Function to generate background particles
const generateBackgroundParticles = (count = 30) => {
  return Array(count).fill(0).map((_, i) => {
    const size = Math.floor(Math.random() * 30) + 5; // Random size between 5px and 35px
    const top = Math.floor(Math.random() * 100); // Random top position (0-100%)
    const left = Math.floor(Math.random() * 100); // Random left position (0-100%)
    const opacity = Math.random() * 0.15 + 0.05; // Random opacity between 0.05 and 0.2
    const delay = Math.floor(Math.random() * 20); // Random animation delay
    
    // More variety in animations
    const animationClasses = [
      'floating-particle-1',
      'floating-particle-2',
      'floating-particle-3',
      'fade-in-out',
      'pulse-size',
      'float-vertical',
      'float-horizontal',
      'rotate-slow'
    ];
    
    const animationClass = animationClasses[Math.floor(Math.random() * animationClasses.length)];
    
    // More shape variety
    const shapes = [
      'rounded-full',
      'rounded-md',
      'rounded-xl',
      'rounded-sm',
      'rotate-45',
      'rounded-tr-2xl rounded-bl-2xl',
      'rounded-tl-2xl rounded-br-2xl',
      'rounded-full border-4',
      'rounded-md rotate-12'
    ];
    
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    // More gradient variety
    const gradients = [
      'from-teal-500/10 to-blue-500/10',
      'from-purple-500/10 to-blue-500/10', 
      'from-teal-500/10 to-purple-500/10',
      'from-blue-500/10 to-purple-500/10',
      'from-pink-500/10 to-teal-500/10',
      'from-indigo-500/10 to-blue-500/10',
      'from-amber-500/5 to-rose-500/10'
    ];
    
    const gradientType = gradients[Math.floor(Math.random() * gradients.length)];
    
    return {
      id: i,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`,
        left: `${left}%`,
        opacity: opacity,
        animationDelay: `${delay}s`,
        zIndex: Math.floor(Math.random() * 5) // Random z-index for layering effect
      },
      className: `absolute bg-gradient-to-br ${gradientType} ${shape} backdrop-blur-md ${animationClass} border border-white/5 shadow-lg shadow-teal-500/5`
    };
  });
};

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
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
];

const ServicesSection = () => {
  // State for background particles
  const [backgroundParticles, setBackgroundParticles] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

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
    
    // Generate particles only on the client side
    setBackgroundParticles(generateBackgroundParticles(40)); // Increased count to 40
    setIsMounted(true);
    
    // Clean up on unmount
    return () => {
      const styleElement = document.getElementById(id);
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);
  
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Modern background styling */}
      <div className="absolute inset-0 bg-gray-900"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,222,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,222,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      {/* Enhanced background glow effects - pulsing and moving */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pulse-size"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl float-vertical"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl fade-in-out"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl float-horizontal"></div>
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 rotate-slow opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 border-2 border-teal-500/30 rounded-full"></div>
        <div className="absolute inset-[10%] border border-purple-500/20 rounded-full"></div>
        <div className="absolute inset-[20%] border border-blue-500/10 rounded-full"></div>
      </div>
      
      {/* Floating background particles - Only render on client side */}
      {isMounted && backgroundParticles.map(particle => (
        <div 
          key={particle.id}
          className={particle.className}
          style={particle.style}
        />
      ))}
      
      {/* Enhanced subtle floating elements with new animations */}
      <div className="absolute top-1/4 left-20 w-12 h-12 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-xl float-vertical opacity-60 shadow-lg shadow-teal-500/10 backdrop-blur-sm border border-teal-400/20"></div>
      <div className="absolute bottom-1/4 right-20 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-teal-400/20 rounded-lg float-horizontal opacity-60 shadow-lg shadow-purple-500/10 backdrop-blur-sm border border-purple-400/20"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-blue-500/15 to-pink-400/15 rounded-full rotate-slow opacity-50 shadow-lg shadow-blue-500/10 backdrop-blur-sm border border-blue-400/15"></div>
      <div className="absolute bottom-1/3 right-1/3 w-14 h-14 bg-gradient-to-br from-amber-500/15 to-rose-400/15 rounded-md pulse-size opacity-40 shadow-lg shadow-amber-500/10 backdrop-blur-sm border border-amber-400/15"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
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
        
        {/* Randomized Grid Layout for Services using CSS transforms and transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="relative service-card-wrapper"
              style={{
                transform: `rotate(${randomOffsets[index].rotate}deg) translateY(${randomOffsets[index].translateY}px) scale(${randomOffsets[index].scale})`,
                transformOrigin: index % 2 === 0 ? 'right center' : 'left center'
              }}
            >
              <ServiceCard
                id={service.id}
                title={service.title}
                description={service.description}
                expandedContent={service.expandedContent}
                icon={service.icon}
              />
              
              {/* Random decorative element */}
              {index % 2 === 0 && (
                <div className="absolute -top-5 -right-5 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-teal-500/5 to-purple-500/5 rounded-xl rotate-12 backdrop-blur-sm border border-teal-500/10"></div>
              )}
              {index % 2 === 1 && (
                <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-md -rotate-6 backdrop-blur-sm border border-purple-500/10"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Call to action button */}
        <div className="mt-20 text-center">
          <motion.button 
            whileHover={{ y: -4, boxShadow: "0 15px 30px -5px rgba(45, 212, 191, 0.3)" }}
            transition={{ duration: 0.3 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-lg 
              group relative
              bg-gradient-to-r from-teal-500 to-purple-500 
              text-white font-medium 
              transition-all duration-500 
              shadow-lg shadow-teal-500/20 
              focus:outline-none focus:ring-2 focus:ring-teal-400/50
              overflow-hidden"
          >
            <span className="relative z-10">Book a Consultation</span>
            <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 