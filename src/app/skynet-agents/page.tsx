'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UseCaseTabs from './UseCaseTabs'; // Import the new component
import Mockup from '@/components/skynet-agents/Mockup'; // Import the new Mockup component
import ApiIntegrations from '@/components/skynet-agents/ApiIntegrations'; // Import the new ApiIntegrations component
import SkynetAgentsCallToAction from '@/components/skynet-agents/SkynetAgentsCallToAction'; // Import the new CTA component

export default function SkynetAgents() {
  // Controls for animated features and interactions
  const [activeFeature, setActiveFeature] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeChatMessage, setActiveChatMessage] = useState(0);
  const [activeAgent, setActiveAgent] = useState(0);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainRef = useRef<HTMLElement>(null); // Add ref for the main element
  
  // Features list for the product
  const features = [
    {
      title: "Orchestrated Agent Teams",
      description: "Collaborative Force: Tackle Intricate Challenges.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      detail: "Build interconnected teams of specialist agents. Harness shared context and synchronised execution to dismantle complex, multi-step business problems that overwhelm solo automation efforts."
    },
    {
      title: "Custom Agent Configuration",
      description: "Tailored Precision: Configure Without Compromise.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      detail: "Dictate exact permissions, knowledge access, and operational parameters. Engineer agents specifically for your unique workflows and roles – a world away from rigid, one-size-fits-all chat AI."
    },
    {
      title: "Custom Agent Configuration",
      description: "Bespoke Automation: Engineer Your Edge.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      detail: "Design specialist agents with surgical precision. Define exact permissions, unique knowledge access, and execution parameters – tailoring automation perfectly for your specific workflows, roles, and use cases, leaving rigid chat AI far behind."
    },
    {
      title: "Total Workflow Automation",
      description: "End-to-End Execution: Crush Repetitive Work.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      detail: "Agents don't just advise, they act. Deploy total, autonomous workflow automation that manages entire processes start-to-finish with minimal oversight, liberating your team from soul-crushing manual tasks."
    },
    {
      title: "Hands-Off Task Execution",
      description: "Autonomous Action: Beyond Chat, Beyond Limits.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      detail: "Forget advice, demand execution. Deploy agents that autonomously tackle complex tasks – manipulating data, triggering actions across platforms, orchestrating entire workflows. Eliminate manual oversight and liberate your team from process bottlenecks with true hands-off automation power."
    }
  ];
  
  // Set loaded state for animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // scrollToSection function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Typing indicator effect
  useEffect(() => {
    if (activeChatMessage === 1) {
      setShowTypingIndicator(true);
      const timer = setTimeout(() => {
        setShowTypingIndicator(false);
        setActiveChatMessage(2);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [activeChatMessage]);

  // Canvas particle effect
  useEffect(() => {
    // Removed isCanvasReady check, only check for canvasRef
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions based on the main container
    const setCanvasDimensions = () => {
      if (mainRef.current && canvas) {
        canvas.width = mainRef.current.clientWidth;
        canvas.height = mainRef.current.scrollHeight; // Use scrollHeight for full content height
      } else if (canvas) {
        // Fallback if mainRef isn't available yet
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    setCanvasDimensions();
    // Removed setIsCanvasReady call

    type Particle = {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
    };

    let particles: Particle[] = [];
    let animationFrameId: number;

    // Enhanced color palette for a more futuristic tech look
    const colors = ['#4fd1c5', '#38b2ac', '#805AD5', '#6B46C1', '#00FFFF', '#2D3748'];

    // Cache for particle gradients
    const particleGradientCache = new Map<number, CanvasGradient>();

    const createParticleGradient = (size: number, color: string) => {
      const cacheKey = size;
      if (particleGradientCache.has(cacheKey)) {
        return particleGradientCache.get(cacheKey)!;
      }

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
      gradient.addColorStop(0, color + 'ff');
      gradient.addColorStop(1, color + '00');
      particleGradientCache.set(cacheKey, gradient);
      return gradient;
    };

    const createParticles = () => {
      particles.length = 0; // Clear existing particles first
      const heroParticleCount = 80; // More particles in the hero area
      const otherParticleCount = 40; // Fewer particles below
      const heroHeight = window.innerHeight; // Approximate hero section height

      // Generate particles for the hero section
      for (let i = 0; i < heroParticleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * heroHeight, // Confine y to hero height
          size: Math.random() * 3.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.6 + 0.2,
          pulse: Math.random() * Math.PI * 2, // Start pulse randomly
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }

      // Generate particles for the section below hero
      // Check if canvas is taller than the hero section before adding more particles
      if (canvas.height > heroHeight) {
        for (let i = 0; i < otherParticleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: heroHeight + Math.random() * (canvas.height - heroHeight), // Confine y below hero height
            size: Math.random() * 3.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.6 + 0.2,
            pulse: Math.random() * Math.PI * 2, // Start pulse randomly
            pulseSpeed: Math.random() * 0.02 + 0.01
          });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        particle.pulse += particle.pulseSpeed;
        const pulseFactor = Math.sin(particle.pulse) * 0.5 + 1;
        const currentSize = particle.size * pulseFactor;

        // Wrap particles around screen edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle with cached gradient
        ctx.save();
        ctx.translate(particle.x, particle.y);
        
        ctx.beginPath();
        ctx.arc(0, 0, currentSize, 0, Math.PI * 2);
        
        // Use cached gradient
        const gradient = createParticleGradient(currentSize, particle.color);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.restore();

        // Create more dynamic, high-tech looking connections
        const connectionDistance = Math.min(canvas.width, canvas.height) * 0.12;
        for (let j = index + 1; j < Math.min(particles.length, index + 5); j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Dynamic line width based on distance
            const lineWidth = 0.5 * (1 - distance / connectionDistance);
            
            ctx.beginPath();
            const opacity = Math.floor((1 - distance / connectionDistance) * 60).toString(16).padStart(2, '0');
            
            // Use solid color instead of gradient for better performance
            ctx.strokeStyle = particle.color + opacity;
            ctx.lineWidth = lineWidth;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    // Responsive canvas
    window.addEventListener('resize', () => {
      setCanvasDimensions();
      particles.length = 0; // Clear particles
      createParticles(); // Recreate particles for new dimensions
    });

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Changed dependency to empty array []

  return (
    <main ref={mainRef} className="relative min-h-screen bg-gray-950 text-white overflow-hidden flex flex-col">
      <Navbar />
      
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Subtle radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-gray-900/80 z-0"></div>
      
      {/* Content wrapper */}
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-600/15 via-indigo-500/10 to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-tr from-purple-600/15 via-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-indigo-400/10 via-purple-500/15 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              {/* Left content column */}
              <div className="lg:w-2/5 space-y-8">
                <div 
                  className="inline-block px-4 py-1.5 rounded-full bg-gray-800/70 backdrop-blur-lg border border-purple-500/30 mb-3 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/10"
                >
                  <p className="text-sm font-medium text-purple-300 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
                    Next-Generation AI Agents
                  </p>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                  <div className="overflow-hidden">
                    <span className={`block mb-3 transform ${isLoaded ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-700 delay-100 ease-out`}>
                      Skynet Agents
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <span className={`block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500 transform ${isLoaded ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-700 delay-300 ease-out`}>
                      Autonomous Intelligence
                    </span>
                  </div>
                </h1>
                
                <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                  Beyond chat: Custom AI agents that automate complex tasks by connecting and working across your existing business software.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <button 
                    onClick={() => scrollToSection('skynet-agents-cta')}
                    className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400/50 overflow-hidden">
                    <span className="relative z-10">Request Demo</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                  </button>
                  <button 
                    onClick={() => scrollToSection('skynet-agents-features')}
                    className="relative px-8 py-4 rounded-full border border-gray-700 backdrop-blur-lg text-white transition-all duration-300 hover:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-400/30 overflow-hidden group">
                    <span className="relative z-10">Learn More</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-80"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </div>
                
                {/* New Feature Highlights */}
                <div className={`flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-8 pb-16 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Secure Execution Highlight */}
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border-2 border-purple-400/70 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-300">Secure Execution</span>
                  </div>

                  {/* Autonomous Tasks Highlight */}
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border-2 border-indigo-400/70 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-300">Autonomous Tasks</span>
                  </div>

                  {/* Enterprise Control Highlight */}
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border-2 border-blue-400/70 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-300">Enterprise Control</span>
                  </div>
                </div>
              </div>
              
              {/* Right content column - Interactive agents mockup */}
              <Mockup 
                activeAgent={activeAgent} 
                setActiveAgent={setActiveAgent} 
                className="hidden lg:block"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="skynet-agents-features" className="py-20 relative">
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-teal-500/8 to-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-gradient-to-tr from-teal-600/10 via-blue-500/8 to-purple-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              {/* Removing the Feature Comparison pill */}
              
              <h2 className="text-3xl md:text-5xl font-bold relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-teal-400 to-blue-500">
                  Beyond Chat: The Power of Agents
                </span>
                {/* Enhanced glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-teal-400/20 rounded-lg blur-md"></div>
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto mt-6 text-lg">
                Skynet Agents builds on everything you love about Skynet Chat, adding autonomous action and deep integrations
              </p>
            </div>
            
            {/* Feature Comparison Section - What makes Agents better than Chat */}
            <div className="mb-24 max-w-5xl mx-auto">
              <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden shadow-2xl shadow-purple-500/5 transform hover:shadow-purple-500/10 transition-all duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left column - Skynet Chat */}
                  <div className="p-8 border-b md:border-b-0 md:border-r border-gray-700">
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold mr-4 shadow-md shadow-teal-500/20">SC</div>
                      <h3 className="text-2xl font-bold text-white">Skynet Chat</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center mt-0.5 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-base">Integrated Content Creation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center mt-0.5 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-base">Deep Context Understanding</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center mt-0.5 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-base">Persistent AI Personalisation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center mt-0.5 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-base">Accelerated Workflow Actions</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mt-0.5 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="text-gray-500 text-base">Workspace-Bound Operation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mt-0.5 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="text-gray-500 text-base">Manual Task Execution</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Right column - Skynet Agents */}
                  <div className="p-8 bg-gradient-to-br from-purple-900/20 to-transparent">
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold mr-4 shadow-md shadow-purple-500/20 animate-pulse-slow">SA</div>
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400">Skynet Agents</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center mt-0.5 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-base">All Skynet Chat Capabilities, <strong className="font-extrabold text-purple-300">PLUS</strong></span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center mt-0.5 mr-3 animate-pulse-slow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white text-base font-medium">Hands-Off Task Execution</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center mt-0.5 mr-3 animate-pulse-slow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white text-base font-medium">Limitless App Integration</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center mt-0.5 mr-3 animate-pulse-slow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white text-base font-medium">Precision-Engineered Logic</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center mt-0.5 mr-3 animate-pulse-slow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white text-base font-medium">Orchestrated Agent Teams</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center mt-0.5 mr-3 animate-pulse-slow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white text-base font-medium">Total Workflow Automation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature grid - Modified to show details only on hover */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {features.map((feature, index) => {
                let mdColClass = "md:col-span-2";
                let lgColClass = "lg:col-span-2";

                // Assuming features.length is 5, as per the current state of the features array.
                if (features.length === 5) {
                  // For medium screens (4-column base), center the last single item.
                  if (index === 4) { // 5th item is the last.
                    mdColClass = "md:col-start-2 md:col-span-2";
                  }

                  // For large screens (6-column base), center the last two items.
                  if (index === 3) { // 4th item is the first of the last two.
                    lgColClass = "lg:col-start-2 lg:col-span-2";
                  }
                  // The 5th item (index === 4) will use the default lgColClass="lg:col-span-2"
                  // and flow correctly after the 4th item.
                }

                const combinedColClasses = `${mdColClass} ${lgColClass}`;

                return (
                  <div 
                    key={index}
                    className={`relative bg-gray-900/60 backdrop-blur-xl rounded-xl p-8 overflow-hidden group hover:scale-[1.02] border border-purple-500/20 shadow-xl shadow-purple-500/5 h-full transition-all duration-300 hover:border-purple-400/40 hover:shadow-purple-500/10 ${combinedColClasses}`}
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/15 via-teal-500/10 to-blue-600/15 transition-opacity duration-500 ${
                      activeFeature === index ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                    
                    {/* Tech grid lines for tech effect */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden opacity-20">
                      <div className="absolute inset-0 bg-[radial-gradient(#9F7AEA15_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#9F7AEA08_50%,transparent_100%)] animate-scanner"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="w-14 h-14 rounded-lg bg-gray-800/60 backdrop-blur-sm flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-400/15 transition-all duration-300 transform group-hover:scale-110 border border-purple-400/20">
                        {feature.icon}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-white transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-teal-400 group-hover:to-blue-500">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-300 transition-all duration-300 group-hover:text-gray-200">
                        {feature.description}
                      </p>
                      
                      {/* Feature detail visible only on hover */}
                      <div className="mt-4 pt-4 border-t border-gray-700/50 text-sm text-gray-400 transition-all duration-300 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-40 overflow-hidden group-hover:text-gray-300">
                        {feature.detail}
                      </div>
                    </div>
                    
                    {/* Animated border */}
                    <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      activeFeature === index 
                        ? 'border border-purple-400/30 shadow-[0_0_15px_rgba(142,81,194,0.15)] after:opacity-100' 
                        : 'border border-transparent after:opacity-0'
                    } after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border after:border-purple-400/10 after:scale-[1.02] after:transition-all after:duration-300`}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* API Integrations Section */}
        <ApiIntegrations />
        <UseCaseTabs />
        <section id="skynet-agents-cta">
          <SkynetAgentsCallToAction />
        </section>

      </div>
      
      <Footer />
    </main>
  );
} 