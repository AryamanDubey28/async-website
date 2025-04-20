'use client';

import { useEffect, useState } from 'react';
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
    50% { opacity: 0.3; }
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
  
  /* New service card styles */
  .service-card-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .service-card {
    background-color: rgba(17, 24, 39, 0.6);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(75, 85, 99, 0.5);
    border-radius: 1rem;
    padding: 1.75rem;
    height: 100%;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .service-card:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1rem;
    padding: 2px;
    background: linear-gradient(to right, rgba(45, 212, 191, 0), rgba(168, 85, 247, 0));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    transition: all 0.3s ease;
    pointer-events: none;
  }
  
  .service-card:hover:before {
    background: linear-gradient(to right, rgba(45, 212, 191, 0.5), rgba(168, 85, 247, 0.5));
  }
  
  .service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px -5px rgba(45, 212, 191, 0.3);
  }
  
  .service-card-front {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    z-index: 1;
  }
  
  .service-icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, rgba(45, 212, 191, 0.2), rgba(168, 85, 247, 0.2));
    color: rgb(45, 212, 191);
    transition: transform 0.3s ease;
  }
  
  .service-card:hover .service-icon {
    transform: scale(1.1);
  }
  
  .service-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    background: linear-gradient(to right, rgb(45, 212, 191), rgb(168, 85, 247));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transition: transform 0.3s ease;
  }
  
  .service-description {
    color: rgb(209, 213, 219);
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }
  
  .learn-more-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(45, 212, 191);
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 0;
    transition: color 0.3s ease;
    margin-top: auto;
    border-radius: 0.375rem;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  
  .learn-more-btn:hover {
    color: rgb(168, 85, 247);
  }
  
  /* Service detail modal */
  .service-detail-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    padding: 1rem;
  }
  
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
    z-index: -1;
    animation: fadeIn 0.2s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { 
      opacity: 0;
      transform: scale(0.9); 
    }
    to { 
      opacity: 1;
      transform: scale(1); 
    }
  }
  
  .service-detail-content {
    background: linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95));
    backdrop-filter: blur(16px);
    border: 1px solid rgba(75, 85, 99, 0.5);
    border-radius: 1rem;
    padding: 2rem;
    max-width: 650px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px 5px rgba(45, 212, 191, 0.2);
    animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .service-detail-content::-webkit-scrollbar {
    width: 5px;
  }
  
  .service-detail-content::-webkit-scrollbar-track {
    background: rgba(75, 85, 99, 0.1);
    border-radius: 10px;
  }
  
  .service-detail-content::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, rgba(45, 212, 191, 0.5), rgba(168, 85, 247, 0.5));
    border-radius: 10px;
  }
  
  .service-detail-header {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(75, 85, 99, 0.5);
  }
  
  .service-icon-large {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(45, 212, 191, 0.2), rgba(168, 85, 247, 0.2));
    color: rgb(45, 212, 191);
    flex-shrink: 0;
  }
  
  .service-icon-large svg {
    width: 2rem;
    height: 2rem;
  }
  
  .service-title-large {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(to right, rgb(45, 212, 191), rgb(168, 85, 247));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .service-description-large {
    color: rgb(209, 213, 219);
  }
  
  .service-offerings {
    padding-bottom: 1rem;
  }
  
  .offerings-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, rgb(45, 212, 191), rgb(168, 85, 247));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .offerings-list {
    display: grid;
    gap: 1.25rem;
  }
  
  .offering-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .offering-bullet {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: linear-gradient(to right, rgb(45, 212, 191), rgb(168, 85, 247));
    margin-top: 0.5rem;
    flex-shrink: 0;
  }
  
  .offering-text {
    color: rgb(209, 213, 219);
  }
  
  .close-modal-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(31, 41, 55, 0.7);
    color: rgb(209, 213, 219);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .close-modal-btn:hover {
    background: rgba(45, 212, 191, 0.2);
    color: rgb(45, 212, 191);
    transform: rotate(90deg);
  }
`;

// Function to generate background particles - Refined for subtlety & visibility
const generateBackgroundParticles = (count = 20) => {
  return Array(count).fill(0).map((_, i) => {
    const size = Math.floor(Math.random() * 18) + 6;
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    const opacity = Math.random() * 0.1 + 0.05;
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

    const gradients = [
      'from-teal-400/10 to-blue-500/10',
      'from-purple-500/10 to-blue-400/10',
      'from-teal-500/10 to-purple-400/10',
      'from-sky-500/10 to-indigo-500/10',
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
  const [isClient, setIsClient] = useState(false);
  const [backgroundParticles, setBackgroundParticles] = useState<Array<any>>([]);

  useEffect(() => {
    setIsClient(true);
    const styleEl = document.createElement('style');
    styleEl.id = 'services-section-global-styles';
    styleEl.innerHTML = globalStyles;
    if (!document.getElementById(styleEl.id)) {
      document.head.appendChild(styleEl);
    }
    
    setBackgroundParticles(generateBackgroundParticles(20));
    
    return () => {
      const el = document.getElementById(styleEl.id);
      if (el) document.head.removeChild(el);
    };
  }, []);

  return (
    <section 
      id="services" 
      className="py-28 md:py-32 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 relative overflow-hidden"
    >
      {isClient && backgroundParticles.map(particle => (
        <div key={particle.id} style={particle.style} className={particle.className}></div>
      ))}
      
      <div className="absolute inset-0 bg-[radial-gradient(#38b2ac0d_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">
              Unlock AI Potential
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mt-5">
            From strategy to implementation, we provide end-to-end AI services tailored to drive innovation and growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              expandedContent={service.expandedContent}
              icon={service.icon}
            />
          ))}
        </div>

        <div className="mt-24 text-center"> 
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-lg 
              group relative
              bg-gradient-to-r from-teal-500 to-purple-500 
              text-white font-medium 
              shadow-lg shadow-teal-500/20 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-teal-400/50
              overflow-hidden
              transition-all duration-300 ease-in-out 
              hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(45,212,191,0.3)] hover:bg-gradient-to-r hover:from-teal-400 hover:to-purple-400"
          >
            <span className="relative z-10">Request a Consultation</span>
            <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-lg"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 