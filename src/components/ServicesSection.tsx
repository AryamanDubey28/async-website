'use client';

import { useEffect, useState } from 'react';
import ServicesCarousel from './ServicesCarousel';

// Keep the existing global styles but remove the noise overlay
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
  
  /* Floating particles animations */
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
  
  @keyframes fade-in-out {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.3; } /* Increased max opacity */
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
    animation: fade-in-out 5s ease-in-out infinite;
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

// Define the type for background particles
type BackgroundParticle = {
  id: number;
  style: {
    width: string;
    height: string;
    top: string;
    left: string;
    opacity: number;
    animationDelay: string;
    zIndex: number;
  };
  className: string;
};

// Function to generate background particles - Adjusted for darker background
const generateBackgroundParticles = (count = 20): BackgroundParticle[] => {
  return Array(count).fill(0).map((_, i) => {
    const size = Math.floor(Math.random() * 18) + 6;
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    const opacity = Math.random() * 0.2 + 0.1; // Slightly higher opacity
    const delay = Math.floor(Math.random() * 18);

    const animationClasses = [
      'floating-particle-1',
      'floating-particle-2',
      'floating-particle-3',
      'fade-in-out',
      'float-vertical',
      'float-horizontal',
      'pulse-size'
    ];
    const numAnimations = Math.random() > 0.6 ? 2 : 1;
    let selectedAnimations = [];
    for (let j = 0; j < numAnimations; j++) {
        selectedAnimations.push(animationClasses[Math.floor(Math.random() * animationClasses.length)]);
    }
    const animationClass = [...new Set(selectedAnimations)].join(' ');

    const shapes = [
      'rounded-full',
      'rounded-lg',
    ];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    // Adjusted gradients for better visibility on dark background
    const gradients = [
      'from-teal-400/20 to-blue-500/20',
      'from-purple-500/20 to-blue-400/20',
      'from-teal-500/20 to-purple-400/20',
      'from-sky-500/20 to-indigo-500/20',
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
        zIndex: 1
      },
      className: `absolute bg-gradient-to-br ${gradientType} ${shape} ${animationClass}`
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
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
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
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
];

const ServicesSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [backgroundParticles, setBackgroundParticles] = useState<BackgroundParticle[]>([]);

  useEffect(() => {
    setIsClient(true);
    const styleEl = document.createElement('style');
    styleEl.id = 'services-section-global-styles';
    styleEl.innerHTML = globalStyles;
    if (!document.getElementById(styleEl.id)) {
      document.head.appendChild(styleEl);
    }
    
    setBackgroundParticles(generateBackgroundParticles(25)); // Slightly more particles
    
    return () => {
      const el = document.getElementById(styleEl.id);
      if (el) document.head.removeChild(el);
    };
  }, []);

  return (
    <section 
      id="services" 
      className="py-16 md:py-20 bg-gray-950 relative overflow-hidden" // Changed background to bg-gray-950
    >
      {/* Subtle radial gradient overlay for depth (matches Hero) */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-gray-950/80 z-0 pointer-events-none"></div>

      {/* Render particles if on client */}
      {isClient && backgroundParticles.map(particle => (
        <div key={particle.id} style={particle.style} className={particle.className}></div>
      ))}
      
      {/* Removed the grid pattern overlay */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(#38b2ac0d_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div> */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500">
              Unlock AI Potential
            </span>
          </h2>
          <p className="text-lg text-gray-300/90 mt-3 font-light leading-relaxed max-w-2xl mx-auto">
            From strategy to implementation, we provide end-to-end AI services tailored to drive innovation and growth.
          </p>
        </div>

        <ServicesCarousel services={services} />

        <div className="mt-10 text-center"> 
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-lg 
              group relative
              bg-gradient-to-r from-cyan-500 to-purple-500 
              text-white font-medium 
              shadow-lg shadow-cyan-500/20 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-cyan-400/50
              overflow-hidden
              transition-all duration-300 ease-in-out 
              hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(45,212,191,0.3)] hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-400"
          >
            <span className="relative z-10">Request a Consultation</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-lg"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;