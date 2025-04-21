'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UseCaseTabs from './UseCaseTabs'; // Import the new component

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
      title: "Autonomous Agents",
      description: "Go beyond chat with AI agents that autonomously execute complex tasks across multiple platforms without human intervention.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      detail: "While Skynet Chat assists with content, Skynet Agents takes action, autonomously performing tasks from scheduling meetings to data analysis."
    },
    {
      title: "8,000+ API Integrations",
      description: "Seamlessly connect with thousands of services including Google Workspace, Microsoft 365, Salesforce, and custom enterprise tools.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      detail: "Our robust API ecosystem allows your agents to interact with virtually any digital service, dramatically expanding their capabilities beyond simple chat."
    },
    {
      title: "Custom Agent Configuration",
      description: "Design specialized agents for specific workflows with customizable permissions, knowledge bases, and execution parameters.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      detail: "Unlike one-size-fits-all chat interfaces, Skynet Agents can be precisely tailored for specific roles, departments, and use cases."
    },
    {
      title: "Agent Collaboration",
      description: "Create systems of specialized agents that work together to solve complex problems, sharing context and coordinating tasks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      detail: "Move beyond single-agent limitations with collaborative agent systems that divide work efficiently while maintaining unified goals."
    },
    {
      title: "Advanced Security & Control",
      description: "Enterprise-grade controls with comprehensive audit trails, permission management, and secure execution environments.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      detail: "With autonomous agents comes enhanced security. Monitor actions, set boundaries, and enforce compliance with your organization's policies."
    },
    {
      title: "Workflow Automation",
      description: "Transform manual processes into automated workflows that agents execute with minimal supervision.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      detail: "Unlike chat-based assistance, agents can execute entire workflows end-to-end, freeing your team from repetitive tasks."
    }
  ];
  
  // Set loaded state for animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

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
                  Beyond chat: Task-driven AI agents that integrate with over 8,000 APIs to autonomously execute complex workflows on your behalf.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400/50 overflow-hidden">
                    <span className="relative z-10">Request Demo</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                  </button>
                  <button className="relative px-8 py-4 rounded-full border border-gray-700 backdrop-blur-lg text-white transition-all duration-300 hover:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-400/30 overflow-hidden group">
                    <span className="relative z-10">Learn More</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-80"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </div>
                
                {/* Social proof */}
                <div className={`flex items-center gap-4 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex -space-x-3">
                    {Array(4).fill(0).map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-800 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                        <span className="text-xs font-medium text-gray-300">{i+1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">
                    Trusted by innovative enterprises
                  </div>
                </div>
              </div>
              
              {/* Right content column - Interactive agents mockup */}
              <div className="lg:w-3/5 relative">
                <div className="relative max-w-2xl mx-auto">
                  {/* Main UI mockup */}
                  <div className="aspect-[16/10] relative rounded-xl overflow-hidden border border-purple-500/40 shadow-xl shadow-purple-500/15 backdrop-blur-sm bg-gray-900/80 group">
                    {/* Animated border shine on hover */}
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md animate-pulse-slow"></div>
                    <div className="relative z-10 h-full w-full rounded-xl bg-gray-900/80">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-600/10"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(#9F7AEA20_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
                      
                      {/* UI chrome */}
                      <div className="absolute inset-0 flex flex-col">
                        <div className="h-8 bg-gray-800/60 backdrop-blur-md flex items-center px-3 border-b border-gray-700">
                          <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          </div>
                          <div className="mx-auto px-4 py-0.5 rounded-md bg-gray-700/50 text-xs text-gray-400 flex items-center gap-1.5 w-64">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>app.skynet-agents.com</span>
                          </div>
                        </div>
                        
                        {/* App interface */}
                        <div className="flex-1 flex">
                          {/* Sidebar */}
                          <div className="w-14 bg-gray-900/90 backdrop-blur-md border-r border-gray-800 flex flex-col items-center py-4 gap-5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold">S</div>
                            <div className="w-8 h-8 flex items-center justify-center text-purple-400 rounded-md bg-gray-800/60">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center text-gray-500 rounded-md hover:bg-gray-800/60">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center text-gray-500 rounded-md hover:bg-gray-800/60">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center text-gray-500 rounded-md hover:bg-gray-800/60">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div className="mt-auto w-8 h-8 rounded-full overflow-hidden bg-gradient-to-b from-gray-700 to-gray-800 flex items-center justify-center text-white text-xs">
                              <span>U</span>
                            </div>
                          </div>
                          
                          {/* Agents dashboard */}
                          <div className="flex-1 flex flex-col">
                            {/* Header with tabs */}
                            <div className="h-10 bg-gray-800/60 backdrop-blur-md border-b border-gray-800 flex items-center px-3">
                              <div className="text-sm font-medium text-white">Agents Dashboard</div>
                              <div className="ml-auto flex gap-2">
                                <button className="w-6 h-6 rounded-md bg-gray-800/60 hover:bg-gray-700/60 flex items-center justify-center text-gray-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                </button>
                                <button className="w-6 h-6 rounded-md bg-gray-800/60 hover:bg-gray-700/60 flex items-center justify-center text-gray-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            
                            {/* Agents List and Details */}
                            <div className="flex-1 flex bg-gray-900/50 backdrop-blur-sm p-3">
                              <div className="grid grid-cols-12 gap-3 w-full">
                                {/* Active Agents */}
                                <div className="col-span-5 bg-gray-800/40 rounded-lg border border-gray-700 p-3 flex flex-col">
                                  <div className="text-xs font-medium text-purple-300 mb-2">Active Agents</div>
                                  <div className="space-y-2 flex-1 overflow-hidden">
                                    {[
                                      { name: "Data Analyst", status: "Running", icon: "📊" },
                                      { name: "Calendar Manager", status: "Idle", icon: "📅" },
                                      { name: "Email Assistant", status: "Running", icon: "📧" },
                                    ].map((agent, idx) => (
                                      <div 
                                        key={idx} 
                                        className={`text-xs p-2 rounded-md flex items-center gap-2 transition-colors duration-200 cursor-pointer ${
                                          activeAgent === idx 
                                            ? 'bg-purple-500/20 border border-purple-500/30' 
                                            : 'bg-gray-800/60 border border-gray-700 hover:border-purple-500/20'
                                        }`}
                                        onClick={() => setActiveAgent(idx)}
                                      >
                                        <div className="w-6 h-6 rounded-md bg-gray-700 flex items-center justify-center">{agent.icon}</div>
                                        <div className="flex-1">
                                          <div className="font-medium text-white">{agent.name}</div>
                                          <div className="text-[10px] text-gray-400">v1.2.0</div>
                                        </div>
                                        <div className="flex items-center">
                                          <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Running' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'} mr-1`}></div>
                                          <span className="text-[10px] text-gray-400">{agent.status}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <button className="w-full mt-2 text-xs py-1 rounded-md border border-gray-700 bg-gray-800/40 text-gray-300 hover:bg-gray-800 hover:border-purple-500/20 transition-colors duration-200">
                                    + New Agent
                                  </button>
                                </div>
                                
                                {/* Agent Details */}
                                <div className="col-span-7 bg-gray-800/40 rounded-lg border border-gray-700 overflow-hidden flex flex-col">
                                  <div className="flex items-center border-b border-gray-700 p-3">
                                    <div className="w-8 h-8 rounded-md bg-purple-500/20 flex items-center justify-center text-lg mr-2">📊</div>
                                    <div>
                                      <div className="text-xs font-medium text-white">Data Analyst Agent</div>
                                      <div className="text-[10px] text-gray-400">Processing financial reports</div>
                                    </div>
                                    <div className="ml-auto flex space-x-2">
                                      <button className="text-[10px] px-2 py-0.5 rounded-md border border-gray-700 bg-gray-800/40 text-gray-300">
                                        Configure
                                      </button>
                                      <button className="text-[10px] px-2 py-0.5 rounded-md border border-gray-700 bg-gray-800/40 text-gray-300">
                                        Pause
                                      </button>
                                    </div>
                                  </div>
                                  
                                  <div className="flex-1 p-3 space-y-2 overflow-auto">
                                    <div className="text-[10px] font-medium text-gray-400">CURRENT TASKS</div>
                                    <div className="space-y-1.5">
                                      {[
                                        { task: "Analyzing Q2 financial data", progress: 70, eta: "2 min" },
                                        { task: "Generating expense report", progress: 30, eta: "5 min" },
                                        { task: "Forecasting Q3 projections", progress: 10, eta: "10 min" },
                                      ].map((task, idx) => (
                                        <div key={idx} className="text-xs rounded-md bg-gray-800/60 border border-gray-700 p-2">
                                          <div className="flex justify-between items-center mb-1">
                                            <div className="text-white">{task.task}</div>
                                            <div className="text-[10px] text-gray-400">ETA: {task.eta}</div>
                                          </div>
                                          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div 
                                              className="h-full bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"
                                              style={{ width: `${task.progress}%` }}
                                            ></div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    
                                    <div className="text-[10px] font-medium text-gray-400 mt-3">CONNECTED SERVICES</div>
                                    <div className="grid grid-cols-4 gap-1.5">
                                      {[
                                        { name: "Sheets", icon: "📊" },
                                        { name: "Slack", icon: "💬" },
                                        { name: "Email", icon: "📧" },
                                        { name: "CRM", icon: "👥" },
                                      ].map((service, idx) => (
                                        <div key={idx} className="bg-gray-800/60 rounded-md border border-gray-700 p-1.5 flex flex-col items-center text-[10px] text-gray-300">
                                          <div>{service.icon}</div>
                                          <div>{service.name}</div>
                                        </div>
                                      ))}
                                    </div>
                                    
                                    <div className="text-[10px] font-medium text-gray-400 mt-3">AGENT LOG</div>
                                    <div className="text-[10px] font-mono bg-gray-900/60 rounded-md p-2 h-14 overflow-auto">
                                      <div className="text-green-400">[10:22:15] Connected to Google Sheets API</div>
                                      <div className="text-white">[10:22:30] Fetching Q2 financial data...</div>
                                      <div className="text-white">[10:23:45] Processing data rows: 1-500</div>
                                      <div className="text-yellow-400">[10:24:10] Warning: Missing values in column H</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Animated scan line */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/5 to-transparent opacity-70 animate-scanner-vertical"></div>
                    </div>
                    
                    {/* Floating decorative elements */}
                    <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-400/30 to-blue-500/30 rounded-xl float-1 opacity-70 shadow-lg shadow-purple-500/20 backdrop-blur-sm border border-purple-400/30 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[10px] text-white/70 text-center">
                          <div>8,000+</div>
                          <div>API</div>
                          <div>Integrations</div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 -left-12 w-20 h-20 bg-gradient-to-br from-indigo-500/30 to-purple-400/30 rounded-lg float-2 opacity-70 shadow-lg shadow-purple-500/20 backdrop-blur-sm border border-purple-400/30">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[10px] text-white/70 text-center">
                          <div className="text-xl">📧</div>
                          <div>Notification</div>
                          <div>System</div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-8 right-1/3 w-16 h-16 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 rounded-md float-2 opacity-70 transform rotate-12 shadow-lg shadow-purple-500/20 backdrop-blur-sm border border-purple-400/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
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
                        <span className="text-gray-300 text-base">Intelligent conversation & assistance</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center mt-0.5 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-base">Content creation & refinement</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center mt-0.5 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-base">Code assistance</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center mt-0.5 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-base">Context-aware memory</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mt-0.5 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="text-gray-500 text-base">Limited to conversational interface</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mt-0.5 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="text-gray-500 text-base">Requires human execution of suggestions</span>
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
                        <span className="text-gray-300 text-base">Everything in Skynet Chat, plus:</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center mt-0.5 mr-3 animate-pulse-slow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white text-base font-medium">Autonomous task execution</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center mt-0.5 mr-3 animate-pulse-slow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white text-base font-medium">8,000+ API integrations</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center mt-0.5 mr-3 animate-pulse-slow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white text-base font-medium">Custom agent configuration</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center mt-0.5 mr-3 animate-pulse-slow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white text-base font-medium">Multi-agent collaboration</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center mt-0.5 mr-3 animate-pulse-slow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white text-base font-medium">End-to-end workflow automation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature grid - Modified to show details only on hover */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.slice(0, 6).map((feature, index) => (
                <div 
                  key={index}
                  className="relative bg-gray-900/60 backdrop-blur-xl rounded-xl p-8 overflow-hidden group hover:scale-[1.02] border border-purple-500/20 shadow-xl shadow-purple-500/5 h-full transition-all duration-300 hover:border-purple-400/40 hover:shadow-purple-500/10"
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
              ))}
            </div>
          </div>
        </section>

        {/* API Integrations Section */}
        <section className="py-24 relative">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 -left-20 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-teal-500/8 to-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-gradient-to-tr from-teal-600/10 via-blue-500/8 to-purple-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 rounded-full bg-gray-800/70 backdrop-blur-lg border border-purple-500/30 mb-3">
                <p className="text-sm font-medium text-purple-300 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
                  Unmatched Integration Ecosystem
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-teal-400 to-blue-500">
                  8,000+ API Integrations
                </span>
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Skynet Agents connects seamlessly with thousands of services, empowering your agents to interact with virtually any digital platform.
              </p>
            </div>
            
            {/* Integration logos carousel - full width */}
            <div className="relative mx-auto max-w-[100vw] overflow-hidden py-10 mb-20">
              {/* Left gradient fade */}
              <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
              {/* Right gradient fade */}
              <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
              
              {/* First row - left to right */}
              <div className="flex animate-scroll-left whitespace-nowrap py-5">
                <div className="flex space-x-10 animated-carousel">
                  {[
                    { name: "GitHub", logo: "/logos/github.svg", bg: "bg-gray-800/80", border: "border-gray-700" },
                    { name: "Slack", logo: "/logos/slack.svg", bg: "bg-purple-900/80", border: "border-purple-700" },
                    { name: "Notion", logo: "/logos/notion.svg", bg: "bg-gray-800/80", border: "border-gray-700" },
                    { name: "Google Drive", logo: "/logos/google-drive.svg", bg: "bg-blue-900/80", border: "border-blue-700" },
                    { name: "Google Sheets", logo: "/logos/google-sheets.svg", bg: "bg-green-900/80", border: "border-green-700" },
                    { name: "Airtable", logo: "/logos/airtable.svg", bg: "bg-teal-900/80", border: "border-teal-700" },
                    { name: "Microsoft Excel", logo: "/logos/excel.svg", bg: "bg-green-900/80", border: "border-green-700" },
                    { name: "Brave", logo: "/logos/brave.svg", bg: "bg-orange-900/80", border: "border-orange-700" },
                    { name: "GitLab", logo: "/logos/gitlab.svg", bg: "bg-red-900/80", border: "border-red-700" },
                    { name: "Jira", logo: "/logos/jira.svg", bg: "bg-blue-900/80", border: "border-blue-700" },
                    { name: "GitHub", logo: "/logos/github.svg", bg: "bg-gray-800/80", border: "border-gray-700" },
                    { name: "Slack", logo: "/logos/slack.svg", bg: "bg-purple-900/80", border: "border-purple-700" },
                    { name: "Notion", logo: "/logos/notion.svg", bg: "bg-gray-800/80", border: "border-gray-700" },
                    { name: "Google Drive", logo: "/logos/google-drive.svg", bg: "bg-blue-900/80", border: "border-blue-700" },
                    { name: "Google Sheets", logo: "/logos/google-sheets.svg", bg: "bg-green-900/80", border: "border-green-700" },
                    { name: "Airtable", logo: "/logos/airtable.svg", bg: "bg-teal-900/80", border: "border-teal-700" }
                  ].map((service, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-shrink-0 w-20 h-20 rounded-xl ${service.bg} ${service.border} backdrop-blur-md border flex items-center justify-center p-4 transform hover:scale-110 transition-transform duration-300 hover:shadow-md hover:shadow-purple-500/20`}
                    >
                      <img src={service.logo} alt={service.name} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Second row - right to left */}
              <div className="flex animate-scroll-right whitespace-nowrap py-5">
                <div className="flex space-x-10 animated-carousel">
                  {[
                    { name: "Figma", logo: "/logos/figma.svg", bg: "bg-purple-900/80", border: "border-purple-700" },
                    { name: "Dropbox", logo: "/logos/dropbox.svg", bg: "bg-blue-900/80", border: "border-blue-700" },
                    { name: "Stripe", logo: "/logos/stripe.svg", bg: "bg-indigo-900/80", border: "border-indigo-700" },
                    { name: "AWS", logo: "/logos/aws.svg", bg: "bg-orange-900/80", border: "border-orange-700" },
                    { name: "Trello", logo: "/logos/github.svg", bg: "bg-blue-900/80", border: "border-blue-700" },
                    { name: "Discord", logo: "/logos/github.svg", bg: "bg-indigo-900/80", border: "border-indigo-700" },
                    { name: "Salesforce", logo: "/logos/github.svg", bg: "bg-blue-900/80", border: "border-blue-700" },
                    { name: "Zoom", logo: "/logos/github.svg", bg: "bg-blue-900/80", border: "border-blue-700" },
                    { name: "Linear", logo: "/logos/github.svg", bg: "bg-gray-800/80", border: "border-gray-700" },
                    { name: "MongoDB", logo: "/logos/github.svg", bg: "bg-green-900/80", border: "border-green-700" },
                    { name: "Figma", logo: "/logos/github.svg", bg: "bg-purple-900/80", border: "border-purple-700" },
                    { name: "Dropbox", logo: "/logos/github.svg", bg: "bg-blue-900/80", border: "border-blue-700" },
                    { name: "Stripe", logo: "/logos/github.svg", bg: "bg-indigo-900/80", border: "border-indigo-700" },
                    { name: "AWS", logo: "/logos/github.svg", bg: "bg-orange-900/80", border: "border-orange-700" },
                    { name: "Trello", logo: "/logos/github.svg", bg: "bg-blue-900/80", border: "border-blue-700" },
                    { name: "Discord", logo: "/logos/github.svg", bg: "bg-indigo-900/80", border: "border-indigo-700" }
                  ].map((service, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-shrink-0 w-20 h-20 rounded-xl ${service.bg} ${service.border} backdrop-blur-md border flex items-center justify-center p-4 transform hover:scale-110 transition-transform duration-300 hover:shadow-md hover:shadow-purple-500/20`}
                    >
                      <img src={service.logo} alt={service.name} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Custom integrations CTA */}
            <div className="mt-16 text-center">
              <div className="inline-block rounded-xl bg-gradient-to-r from-purple-500/10 via-teal-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-500/30 p-0.5">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg py-4 px-8">
                  <p className="text-gray-300 mb-3">Don't see the integration you need?</p>
                  <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105">
                    Request Custom Integration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section - Replaced with component */}
        <UseCaseTabs />

      </div>
      
      <Footer />
    </main>
  );
} 