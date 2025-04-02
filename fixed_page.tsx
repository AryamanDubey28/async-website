'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './page-animations.css'; // Import custom animations

export default function SkynetChat() {
  // Controls for the animated features and interactions
  const [activeFeature, setActiveFeature] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeChatMessage, setActiveChatMessage] = useState(0);
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  
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
    // Skip canvas setup during SSR
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas dimensions to match window
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    setIsCanvasReady(true);

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
    }[] = [];

    // Enhanced color palette for a more futuristic tech look
    const colors = ['#4fd1c5', '#38b2ac', '#805AD5', '#6B46C1', '#00FFFF', '#2D3748'];

    const createParticles = () => {
      // Reduced number of particles for a cleaner look
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, // Slightly smaller sizes
          speedX: (Math.random() - 0.5) * 0.2, // Slower movement
          speedY: (Math.random() - 0.5) * 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.6 + 0.2, // More varied opacity
          pulse: 0,
          pulseSpeed: Math.random() * 0.02 + 0.01 // For pulsing animation
        });
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      
      // More transparent clear for subtle trail effect
      ctx.fillStyle = 'rgba(10, 10, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position with slight mouse influence
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Pulsing size effect
        particle.pulse += particle.pulseSpeed;
        const pulseFactor = Math.sin(particle.pulse) * 0.5 + 1;
        const currentSize = particle.size * pulseFactor;

        // Wrap particles around screen edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        
        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentSize * 3 // Increased glow radius
        );
        
        gradient.addColorStop(0, particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, particle.color + '00'); // Transparent at the edge
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Create more subtle, high-tech looking connections
        // Only connect particles that are relatively close
        const connectionDistance = Math.min(canvas.width, canvas.height) * 0.06;
        
        // Limit the number of connections to reduce visual clutter
        for (let j = index + 1; j < Math.min(particles.length, index + 5); j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Thinner lines with lower opacity for a more subtle effect
            const lineWidth = 0.4 * (1 - distance / connectionDistance);
            const opacity = Math.floor((1 - distance / connectionDistance) * 25).toString(16).padStart(2, '0');
            
            // Create a gradient for lines
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, 
              particles[j].x, particles[j].y
            );
            
            gradient.addColorStop(0, particle.color + opacity);
            gradient.addColorStop(1, particles[j].color + opacity);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
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
    };
  }, [isCanvasReady]);

  // Features list for the product
  const features = [
    {
      title: "Content Creation",
      description: "Generate high-quality drafts, emails, reports, and creative content directly in the editor with just a few prompts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      detail: "From initial drafts to polished content, Skynet helps you create compelling documents in a fraction of the time."
    },
    {
      title: "Intelligent Editing",
      description: "Instruct Skynet to refine sections, adjust tone, or translate content through the intuitive chat interface.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      detail: "Simply highlight text and chat with Skynet to make specific edits, transform your writing style, or perfect your message."
    },
    {
      title: "Code Assistance",
      description: "Get help with code documentation, bug fixes, and even port between supported programming languages.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      detail: "Skynet understands multiple programming languages and can help optimize your code, fix bugs, or translate between languages with context-awareness."
    },
    {
      title: "Advanced Memory",
      description: "Benefit from our built-in memory system that learns your style and preferences over time.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      detail: "Unlike standard AI tools, Skynet remembers context from previous sessions, learning your preferences and adapting to your unique style."
    }
  ];

  // Chat demonstration messages
  const chatMessages = [
    { 
      role: "user",
      content: "Can you help me rewrite this paragraph to be more concise?"
    },
    { 
      role: "assistant",
      content: "I'd be happy to help make this more concise. I'll preserve the key points while trimming unnecessary words."
    },
    { 
      role: "assistant",
      content: "Here's a more concise version: \"Skynet Chat combines AI assistance with content creation in a secure environment. Deploy on your infrastructure for maximum privacy, while benefiting from personalized assistance that adapts to your style over time.\""
    }
  ];

  // Code demonstration for the interface
  const codeSample = `// Example function with Skynet assistance
function processData(data) {
  // Skynet helped optimize this algorithm
  const results = data.map(item => {
    return {
      id: item.id,
      value: item.value * 1.5,
      normalized: normalizeValue(item.value)
    };
  });
  
  return results.filter(item => item.normalized > 0.5);
}`;

  return (
    <main className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Canvas background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24">
          {/* Enhanced background decorations with better layering */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-teal-500/15 via-purple-500/10 to-blue-600/15 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute top-1/3 -right-20 w-96 h-96 bg-gradient-to-tr from-purple-600/15 via-blue-500/10 to-teal-500/15 rounded-full blur-3xl animate-pulse-slower"></div>
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-br from-teal-400/15 via-purple-400/10 to-blue-500/15 rounded-full blur-3xl"></div>
          </div>
          
          {/* Tech grid pattern - more subtle */}
          <div className="absolute inset-0 bg-[radial-gradient(#4fd1c510_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
          
          {/* Animated scanner line */}
          <div className="absolute inset-x-0 h-[50%] top-1/4 bg-gradient-to-b from-transparent via-teal-400/3 to-transparent opacity-70 animate-scanner-vertical"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              {/* Left content column */}
              <div className="lg:w-1/2 space-y-8">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full opacity-30 blur-sm group-hover:opacity-70 transition-opacity duration-500"></div>
                  <div 
                    className="relative px-6 py-2 rounded-full bg-gray-800/70 backdrop-blur-lg border border-teal-500/30 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/10 group-hover:shadow-teal-500/20"
                  >
                    <p className="text-sm font-medium text-teal-300 flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                      Secure Content Collaboration
                    </p>
                  </div>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                  <div className="overflow-hidden mb-2">
                    <span className={`block transform ${isLoaded ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-700 delay-100 ease-out`}>
                      Skynet Chat
                    </span>
                  </div>
                  <div className="overflow-hidden relative">
                    <span className={`block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500 transform ${isLoaded ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-700 delay-300 ease-out`}>
                      Intelligent<br className="sm:hidden" /> Collaboration
                    </span>
                    {/* Animated highlight accent */}
                    <div className={`absolute -bottom-2 left-0 h-1 w-24 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full transform ${isLoaded ? 'scale-x-100' : 'scale-x-0'} transition-transform duration-700 delay-500 origin-left`}></div>
                  </div>
                </h1>
                
                <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                  Your secure, intelligent content collaboration partner that transforms how you create, refine, and collaborate on written content and code.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400/50 overflow-hidden">
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    <span className="absolute -inset-px bg-gradient-to-r from-teal-400/80 to-purple-400/80 rounded-full opacity-0 group-hover:opacity-20"></span>
                    <span className="relative z-10 flex items-center">
                      Request Demo
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                  <button className="relative px-8 py-4 rounded-full border border-gray-700 backdrop-blur-lg text-white transition-all duration-300 hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/30 overflow-hidden group">
                    <span className="relative z-10">Learn More</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-80"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                  </button>
                </div>
                
                {/* Enhanced Social proof */}
                <div className={`flex items-center gap-4 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex -space-x-3">
                    {Array(4).fill(0).map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-800 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden shadow-inner">
                        <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-300">{i+1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">
                    <span className="text-teal-400 font-semibold">Trusted</span> by innovative companies
                  </div>
                </div>

                {/* New feature highlight tags */}
                <div className={`flex flex-wrap gap-3 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {['On-premise', 'Secure', 'Private', 'Customizable'].map((tag, i) => (
                    <span key={i} 
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800/80 text-gray-300 border border-gray-700 backdrop-blur-sm"
                      style={{ transitionDelay: `${i * 100 + 500}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Right content column - Interactive UI mockup with enhanced effects */}
              <div className="lg:w-1/2 relative">
                <div className="relative max-w-xl mx-auto">
                  {/* Animated glow effect behind the UI */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-purple-500/5 to-blue-500/5 rounded-xl blur-2xl animate-pulse-slow"></div>
                  
                  {/* Main UI mockup */}
                  <div className="aspect-[16/10] relative rounded-xl overflow-hidden border border-teal-500/30 shadow-xl shadow-teal-500/10 backdrop-blur-sm bg-gray-900/80">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-purple-500/10 to-blue-600/10"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(#4fd1c510_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                    
                    {/* Browser chrome */}
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
                          <span>app.skynet-chat.com</span>
                        </div>
                      </div>
                      
                      {/* App interface */}
                      <div className="flex-1 flex">
                        {/* Sidebar */}
                        <div className="w-14 bg-gray-900/90 backdrop-blur-md border-r border-gray-800 flex flex-col items-center py-4 gap-5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">S</div>
                          <div className="w-8 h-8 flex items-center justify-center text-teal-400 rounded-md hover:bg-gray-800/60">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 flex items-center justify-center text-gray-500 rounded-md hover:bg-gray-800/60">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 flex items-center justify-center text-gray-500 rounded-md hover:bg-gray-800/60">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
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
                        
                        {/* Main content area */}
                        <div className="flex-1 flex flex-col">
                          {/* Header with tabs */}
                          <div className="h-10 bg-gray-800/60 backdrop-blur-md border-b border-gray-800 flex items-center px-3">
                            <div className="flex gap-1">
                              <div className="px-3 py-1 text-xs rounded-t-md bg-gray-900/90 text-white border-t border-l border-r border-teal-500/30">
                                document.md
                              </div>
                              <div className="px-3 py-1 text-xs rounded-t-md bg-gray-800/50 text-gray-400 border-t border-l border-r border-gray-700/50">
                                notes.md
                              </div>
                            </div>
                            <div className="ml-auto flex gap-2">
                              <button className="w-6 h-6 rounded-md bg-gray-800/60 hover:bg-gray-700/60 flex items-center justify-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </button>
                              <button className="w-6 h-6 rounded-md bg-gray-800/60 hover:bg-gray-700/60 flex items-center justify-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          {/* Split view: Editor and Chat */}
                          <div className="flex-1 flex">
                            {/* Document editor */}
                            <div 
                              className={`flex-1 p-3 text-xs font-mono text-gray-300 overflow-hidden ${isEditorFocused ? 'ring-1 ring-teal-500/30 ring-inset' : ''}`}
                              onClick={() => setIsEditorFocused(true)}
                              onMouseLeave={() => setIsEditorFocused(false)}
                            >
                              <div className="mb-2 font-semibold text-teal-400"># Project Overview</div>
                              <div className="mb-2">The system integrates advanced AI capabilities with a secure, user-friendly interface to enable collaboration on documents and code.</div>
                              <div className="mb-2 font-semibold text-teal-400">## Key Features</div>
                              <div className={`mb-2 ${isEditorFocused ? 'bg-teal-500/10 px-1' : ''}`}>- Real-time collaboration with AI assistance</div>
                              <div className="mb-2">- Secure, on-premise deployment options</div>
                              <div className="mb-2">- Customizable AI models to suit specific needs</div>
                              <div className="mb-2 font-semibold text-teal-400">## Technical Specifications</div>
                              <div className="mb-2">Built with modern technologies...</div>
                            </div>
                            
                            {/* Chat interface */}
                            <div className="w-72 border-l border-gray-800 flex flex-col bg-gray-800/20 backdrop-blur-md">
                              {/* Chat header */}
                              <div className="h-10 bg-gray-800/60 backdrop-blur-md border-b border-gray-800 px-3 flex items-center">
                                <div className="text-xs font-medium text-white">Skynet Assistant</div>
                                <div className="ml-auto flex items-center gap-1">
                                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                                  <span className="text-[10px] text-teal-400">Online</span>
                                </div>
                              </div>
                              
                              {/* Chat messages */}
                              <div className="flex-1 p-3 overflow-auto space-y-3">
                                {chatMessages.map((msg, idx) => (
                                  <div 
                                    key={idx} 
                                    className={`text-xs rounded-lg p-2 max-w-[85%] ${
                                      msg.role === 'user' 
                                        ? 'bg-teal-500/20 ml-auto text-white' 
                                        : 'bg-gray-800/60 text-gray-300'
                                    } ${idx > activeChatMessage ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                                  >
                                    {msg.content}
                                  </div>
                                ))}
                                
                                {/* Typing indicator */}
                                {showTypingIndicator && (
                                  <div className="bg-gray-800/60 rounded-lg p-2 w-16 flex">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms] mx-1"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]"></div>
                                  </div>
                                )}
                              </div>
                              
                              {/* Chat input */}
                              <div className="p-3 border-t border-gray-800">
                                <div className="relative">
                                  <input 
                                    type="text" 
                                    className="w-full bg-gray-800/60 rounded-md border border-gray-700 text-white text-xs px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
                                    placeholder="Message Skynet..."
                                    onFocus={() => setActiveChatMessage(1)}
                                  />
                                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-teal-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced animated scan line */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/5 to-transparent opacity-70 animate-scanner-vertical"></div>
                  </div>
                  
                  {/* New pulsing corner accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                    <div className="absolute top-0 left-0 w-[1px] h-8 bg-gradient-to-b from-teal-400 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-8 h-[1px] bg-gradient-to-r from-teal-400 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-gradient-to-t from-teal-400 to-transparent"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-gradient-to-l from-teal-400 to-transparent"></div>
                  </div>
                </div>
                
                {/* Enhanced floating decorative elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-teal-400/30 to-blue-500/30 rounded-xl float-1 opacity-70 shadow-lg shadow-teal-500/20 backdrop-blur-sm border border-teal-400/30 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <div className="text-[8px] text-teal-100/70 font-mono overflow-hidden">
                      {codeSample.split('\n').slice(0, 6).map((line, i) => (
                        <div key={i} className="line-clamp-1">{line}</div>
                      ))}
                    </div>
                  </div>
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-6 h-6">
                    <div className="absolute top-0 right-0 w-[1px] h-3 bg-gradient-to-b from-teal-400 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-3 h-[1px] bg-gradient-to-l from-teal-400 to-transparent"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 -left-12 w-20 h-20 bg-gradient-to-br from-purple-500/30 to-teal-400/30 rounded-lg float-2 opacity-70 shadow-lg shadow-purple-500/20 backdrop-blur-sm border border-purple-400/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                
                <div className="absolute top-1/3 -left-6 w-12 h-12 bg-gradient-to-r from-blue-500/30 to-teal-400/30 rounded-full float-3 opacity-70 shadow-lg shadow-blue-500/20 backdrop-blur-sm border border-blue-400/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white/70 animate-ping-slow"></div>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 right-1/3 w-16 h-16 bg-gradient-to-r from-teal-500/30 to-purple-500/30 rounded-md float-2 opacity-70 transform rotate-12 shadow-lg shadow-purple-500/20 backdrop-blur-sm border border-teal-400/30"></div>
                
                {/* New floating data stream elements */}
                <div className="absolute h-full w-[1px] top-0 left-[10%] bg-gradient-to-b from-transparent via-teal-400/30 to-transparent animate-data-stream"></div>
                <div className="absolute h-full w-[1px] top-0 left-[60%] bg-gradient-to-b from-transparent via-purple-400/30 to-transparent animate-data-stream-alt"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main content sections to be added next */}
        <section className="py-24 relative">
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-gradient-to-br from-teal-500/10 via-purple-500/5 to-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-gradient-to-tr from-purple-600/10 via-blue-500/5 to-teal-500/10 rounded-full blur-3xl"></div>
          </div>
          
          {/* Subtle tech grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#4fd1c510_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-1.5 rounded-full bg-gray-800/70 backdrop-blur-lg border border-teal-500/30 mb-5 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/10">
                <p className="text-sm font-medium text-teal-300 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                  Supercharge Your Workflow
                </p>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold relative inline-block mb-5">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">
                  Powerful Features
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-purple-400/10 rounded-lg blur-sm"></div>
              </h2>
              
              <p className="text-gray-300 max-w-3xl mx-auto mt-4 text-lg">
                Skynet Chat combines AI power with unparalleled privacy to transform your content creation workflow
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="relative bg-gray-900/60 backdrop-blur-xl rounded-xl overflow-hidden group hover-scale border border-teal-500/20 shadow-xl shadow-teal-500/5 h-full transition-all duration-300 hover:border-teal-400/40 hover:shadow-teal-500/10"
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  {/* Glass morphism card effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm"></div>
                  
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-teal-500/15 via-purple-500/10 to-blue-600/15 transition-opacity duration-500 ${
                    activeFeature === index ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                  
                  {/* Tech grid lines for tech effect - more subtle */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(#4fd1c510_1px,transparent_1px)] [background-size:10px_10px] opacity-70"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#4fd1c510_50%,transparent_100%)] animate-scanner"></div>
                  </div>
                  
                  {/* Animated top highlight bar */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 via-purple-400 to-blue-400 transition-all duration-700 ${
                    activeFeature === index ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-8">
                    <div className="w-16 h-16 rounded-lg bg-gray-800/60 backdrop-blur-sm flex items-center justify-center mb-6 text-teal-400 group-hover:bg-teal-400/15 transition-all duration-300 transform group-hover:scale-110 border border-teal-400/20 shadow-lg shadow-teal-400/5">
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 text-white transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:via-purple-400 group-hover:to-blue-500">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-300 transition-all duration-300 group-hover:text-gray-200 mb-4">
                      {feature.description}
                    </p>
                    
                    {/* Feature detail - hidden by default, shown on hover */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      activeFeature === index ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-sm text-gray-400">{feature.detail}</p>
                      
                      <div className="mt-4">
                        <button className="inline-flex items-center text-sm text-teal-400 group/btn">
                          <span>Learn more</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated border */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    activeFeature === index 
                      ? 'border border-teal-400/30 shadow-[0_0_15px_rgba(56,178,172,0.15)] after:opacity-100' 
                      : 'border border-transparent after:opacity-0'
                  } after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border after:border-teal-400/10 after:scale-[1.02] after:transition-all after:duration-300`}></div>
                  
                  {/* Animated corner accents */}
                  <div className={`absolute top-0 right-0 w-12 h-12 transition-opacity duration-500 ${
                    activeFeature === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute top-0 right-0 w-[2px] h-6 bg-gradient-to-b from-teal-400 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-6 h-[2px] bg-gradient-to-l from-teal-400 to-transparent"></div>
                  </div>
                  
                  <div className={`absolute bottom-0 left-0 w-12 h-12 transition-opacity duration-500 ${
                    activeFeature === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute bottom-0 left-0 w-[2px] h-6 bg-gradient-to-t from-teal-400 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-[2px] bg-gradient-to-r from-teal-400 to-transparent"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* New call-to-action button */}
            <div className="mt-16 text-center">
              <button className="group relative px-8 py-4 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-teal-500/50 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 overflow-hidden">
                <span className="relative z-10">Explore All Features</span>
                <span className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 via-purple-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </button>
            </div>
          </div>
        </section>
        
        {/* Product Overview Section */}
        <section className="py-32 relative">
          {/* Enhanced background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 -left-20 w-80 h-80 bg-gradient-to-br from-teal-500/10 via-purple-500/5 to-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 -right-20 w-64 h-64 bg-gradient-to-tr from-purple-600/10 via-blue-500/5 to-teal-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Stats section above CTA */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {[
                  { value: '100%', label: 'Private & Secure', icon: 'shield' },
                  { value: '24/7', label: 'AI Assistance', icon: 'chat' },
                  { value: '90%', label: 'Time Savings', icon: 'clock' },
                  { value: '5x', label: 'Productivity Boost', icon: 'lightning' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-4 border border-teal-500/20 shadow-lg shadow-teal-500/5 text-center transform hover:scale-105 transition-all duration-300 hover:border-teal-400/40 group">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-800/80 flex items-center justify-center">
                      {stat.icon === 'shield' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400 group-hover:text-teal-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )}
                      {stat.icon === 'chat' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      )}
                      {stat.icon === 'clock' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {stat.icon === 'lightning' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Main CTA Card */}
              <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-teal-500/20 shadow-xl shadow-teal-500/5 overflow-hidden relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-teal-400/20 via-purple-400/15 to-transparent rounded-bl-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-400/20 via-teal-400/15 to-transparent rounded-tr-3xl"></div>
                
                {/* Tech pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#4fd1c515_1px,transparent_1px)] [background-size:8px_8px] opacity-50"></div>
                
                {/* Animated scanner effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/5 to-transparent opacity-30 animate-scanner"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-10">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-gray-800/70 backdrop-blur-lg border border-teal-500/30 mb-3">
                      <p className="text-sm font-medium text-teal-300 flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                        Limited Early Access Available
                      </p>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">Transform</span> Your Workflow?
                    </h2>
                    <p className="text-gray-300 max-w-3xl mx-auto">
                      Join innovative companies already using Skynet Chat to enhance their content creation and collaboration.
                    </p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-8 items-stretch">
                    {/* Form side */}
                    <div className="md:w-1/2">
                      <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 border border-gray-700 h-full">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                            <input type="text" className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent" placeholder="Your name" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input type="email" className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent" placeholder="your@email.com" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                            <input type="text" className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent" placeholder="Your company" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                            <textarea className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent h-24" placeholder="Tell us about your needs"></textarea>
                          </div>
                          <div className="pt-4">
                            <button className="w-full group relative px-8 py-4 rounded-lg bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-400/50 overflow-hidden">
                              <span className="relative z-10">Send Message</span>
                              <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Info side */}
                    <div className="md:w-1/2 space-y-6">
                      <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/30 p-4 rounded-lg cursor-pointer">
                        <div className="flex-shrink-0 h-12 w-12 rounded-md bg-teal-400/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.414 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-200 font-medium group-hover:text-teal-300 transition-colors duration-300">Contact Us</p>
                          <p className="text-gray-400">info@asyncstudios.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/30 p-4 rounded-lg cursor-pointer">
                        <div className="flex-shrink-0 h-12 w-12 rounded-md bg-purple-400/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-200 font-medium group-hover:text-purple-300 transition-colors duration-300">Schedule a Demo</p>
                          <p className="text-gray-400">See how Skynet Chat works in real-time</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/30 p-4 rounded-lg cursor-pointer">
                        <div className="flex-shrink-0 h-12 w-12 rounded-md bg-blue-400/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-200 font-medium group-hover:text-blue-300 transition-colors duration-300">Documentation</p>
                          <p className="text-gray-400">Explore our technical guides</p>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/70 backdrop-blur-sm border border-gray-700 text-gray-300">
                          <span className="inline-block w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                          <span>Limited early access program</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Testimonials ticker */}
              <div className="mt-20 overflow-hidden">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white">What Our Users Say</h3>
                </div>
                
                <div className="relative">
                  {/* Gradient overlays for smooth scrolling effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
                  
                  <div className="flex gap-6 animate-ticker">
                    {[
                      { name: 'Alex Chen', title: 'Content Director', quote: 'Skynet Chat has transformed how our team creates content. The AI assistance is like having an expert collaborator for every project.' },
                      { name: 'Sarah Johnson', title: 'Tech Lead', quote: 'The code assistance is remarkable. It helps our developers document and optimize code faster than ever before.' },
                      { name: 'Michael Torres', title: 'Product Manager', quote: 'Having the entire system deployed within our infrastructure gives us the security we need while still leveraging cutting-edge AI.' },
                      { name: 'Priya Patel', title: 'Marketing Strategist', quote: 'The memory feature is game-changing. It learns our brand voice and applies it consistently across all content.' },
                      { name: 'James Wilson', title: 'CTO', quote: 'Being able to customize the underlying AI model gives us exactly the right balance of performance and cost efficiency.' }
                    ].map((testimonial, idx) => (
                      <div key={idx} className="flex-shrink-0 w-80 bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                        <div className="text-gray-300 italic mb-4">"{testimonial.quote}"</div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 flex items-center justify-center text-white font-medium">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-white font-medium">{testimonial.name}</div>
                            <div className="text-gray-400 text-sm">{testimonial.title}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
} 