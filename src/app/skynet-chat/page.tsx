'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Mockup from '@/components/skynet-chat/Mockup';
import SkynetChatFeatures from '@/components/skynet-chat/SkynetChatFeatures';
import SkynetChatCallToAction from '@/components/skynet-chat/SkynetChatCallToAction';

// Define the ChatMessage type here to ensure consistency
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export default function SkynetChat() {
  // Controls for the animated features and interactions
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeChatMessage, setActiveChatMessage] = useState(1);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainRef = useRef<HTMLElement>(null); // Add ref for the main element
  
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
      if (!ctx || !canvas) return;
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
  const chatMessages: ChatMessage[] = [
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

  // Artefact content (example email in Markdown)
  const artefactContent = `
# Follow-up Email: Project Skynet Sync

**Subject: Sync on Project Skynet - Action Items**

Hi Team,

<mark>Great sync call today regarding the upcoming Project Skynet milestones.

Here's a summary of the key discussion points and action items:</mark>

*   **UI Mockup:** Finalize the design by EOD Friday. [@Alice]
*   **API Integration:** Begin integration testing next Monday. [@Bob]
*   **Deployment:** Schedule preliminary deployment for Wednesday week.

Let me know if I missed anything.

Best,
Charlie
`;

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
          {/* Background decorations - Adjusted for more depth */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-tr from-cyan-600/10 via-blue-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-teal-400/10 via-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              {/* Left content column */}
              <div className="lg:w-1/2 space-y-8">
                <div 
                  className="inline-block px-4 py-1.5 rounded-full bg-gray-800/70 backdrop-blur-lg border border-teal-500/30 mb-3 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/10"
                >
                  <p className="text-sm font-medium text-teal-300 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                    Secure Content Collaboration
                  </p>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                  {/* CSS Transition applied directly */}
                  <div className="overflow-hidden">
                    <span className={`block mb-3 transform ${isLoaded ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-700 delay-[100ms] ease-out`}>
                      Skynet Chat
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <span className={`block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 transform ${isLoaded ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-700 delay-[300ms] ease-out`}>
                      Intelligent Collaboration
                    </span>
                  </div>
                </h1>
                
                <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                  Your secure, intelligent content collaboration partner that transforms how you create, refine, and collaborate on written content and code.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400/50 overflow-hidden">
                    <span className="relative z-10">Request Demo</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                  </button>
                  <button className="relative px-8 py-4 rounded-full border border-gray-700 backdrop-blur-lg text-white transition-all duration-300 hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/30 overflow-hidden group">
                    <span className="relative z-10">Learn More</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-80"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </div>
                
                {/* Social proof */}
                {/* CSS Transition applied directly */}
                <div className={`flex items-center gap-4 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex -space-x-3">
                    {Array(4).fill(0).map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-800 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                        <span className="text-xs font-medium text-gray-300">{i+1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">
                    Trusted by innovative companies
                  </div>
                </div>
              </div>
              
              {/* Right content column - Interactive UI mockup -> Replaced with Mockup component */}
              <div className="lg:w-1/2 relative">
                <Mockup 
                  artefactContent={artefactContent}
                  chatMessages={chatMessages}
                  activeChatMessage={activeChatMessage}
                  showTypingIndicator={showTypingIndicator}
                  setActiveChatMessage={setActiveChatMessage}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Features Section -> Replaced with SkynetChatFeatures component */}
        <SkynetChatFeatures features={features} />
        
        {/* Product Overview Section (Keep as is for now) */}
        <section className="py-24 relative">
          {/* Background decorations - Enhanced with more vibrancy */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 -left-20 w-96 h-96 bg-gradient-to-br from-teal-500/10 via-purple-500/8 to-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-gradient-to-tr from-purple-600/10 via-blue-500/8 to-teal-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left side - Interactive Illustration */}
              <div className="lg:w-1/2 relative">
                <div className="relative max-w-lg mx-auto">
                  {/* Main illustration area */}
                  <div className="aspect-square relative rounded-2xl overflow-hidden border border-teal-500/30 shadow-xl shadow-teal-500/10 backdrop-blur-sm bg-gray-900/80">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-purple-500/10 to-blue-600/10"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(#4fd1c520_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
                    
                    {/* Interactive workspace visualization */}
                    <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 p-8">
                      <div className="w-20 h-20 rounded-full bg-teal-400/20 flex items-center justify-center mb-4 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        
                        {/* Orbital rings */}
                        <div className="absolute w-full h-full animate-spin-slow">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-teal-400 shadow-lg shadow-teal-400/50"></div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50"></div>
                        </div>
                        
                        <div className="absolute w-full h-full animate-spin-reverse-slow">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"></div>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal-400 shadow-lg shadow-teal-400/50"></div>
                        </div>
                      </div>
                      
                      <div className="text-center mb-4">
                        <h4 className="text-xl font-semibold text-teal-400 mb-2">Unified Workspace</h4>
                        <p className="text-gray-300 text-sm max-w-xs mx-auto">
                          Interact with AI and your content in one seamless interface that adapts to your workflow
                        </p>
                      </div>
                      
                      {/* Workspace Visualization */}
                      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                        {/* Document panel */}
                        <div className="bg-gray-800/60 backdrop-blur-md rounded-lg overflow-hidden border border-gray-700 col-span-1 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/10 hover:border-teal-500/30">
                          <div className="p-2 border-b border-gray-700 flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-400 mr-1.5"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-400 mr-1.5"></div>
                            <div className="w-2 h-2 rounded-full bg-green-400 mr-1.5"></div>
                            <div className="text-xs text-gray-400 ml-1">Document</div>
                          </div>
                          <div className="p-3 text-xs text-gray-300 font-mono">
                            <div className="mb-1.5 text-teal-400"># Project Plan</div>
                            <div className="text-gray-400 mb-1.5">The new system will...</div>
                            <div className="text-gray-400">Deliverables include...</div>
                          </div>
                        </div>
                        
                        {/* Chat panel */}
                        <div className="bg-gray-800/60 backdrop-blur-md rounded-lg overflow-hidden border border-gray-700 col-span-1 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30">
                          <div className="p-2 border-b border-gray-700 flex items-center">
                            <div className="w-2 h-2 rounded-full bg-purple-400 mr-1.5 animate-pulse"></div>
                            <div className="text-xs text-gray-400 ml-1">Skynet</div>
                          </div>
                          <div className="p-3 text-xs">
                            <div className="mb-1.5 bg-gray-700/60 p-1.5 rounded text-gray-300 text-[10px]">How can I help?</div>
                            <div className="mb-1.5 bg-teal-500/20 p-1.5 rounded text-white text-[10px] ml-auto max-w-[80%]">Summarize this</div>
                          </div>
                        </div>
                        
                        {/* Code panel */}
                        <div className="bg-gray-800/60 backdrop-blur-md rounded-lg overflow-hidden border border-gray-700 col-span-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30">
                          <div className="p-2 border-b border-gray-700 flex items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-400 mr-1.5"></div>
                            <div className="text-xs text-gray-400 ml-1">Code: app.js</div>
                          </div>
                          <div className="p-3 text-xs text-blue-300 font-mono flex space-x-2">
                            <div className="text-gray-500">1<br/>2<br/>3</div>
                            <div>
                              <span className="text-purple-400">const</span> <span className="text-teal-400">skynet</span> = <span className="text-purple-400">require</span>(<span className="text-amber-300">'skynet'</span>);<br/>
                              <span className="text-teal-400">skynet</span>.<span className="text-blue-300">init</span>();<br/>
                              <span className="text-purple-400">const</span> <span className="text-teal-400">app</span> = <span className="text-teal-400">skynet</span>.<span className="text-blue-300">createApp</span>();
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Connection paths - animated data flows */}
                      <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M200 120 L150 180" stroke="url(#grad1)" strokeWidth="1.5" strokeDasharray="5,5" className="animate-dash-slow" />
                          <path d="M200 120 L250 180" stroke="url(#grad2)" strokeWidth="1.5" strokeDasharray="5,5" className="animate-dash-slow-reverse" />
                          <path d="M150 220 L200 280" stroke="url(#grad3)" strokeWidth="1.5" strokeDasharray="5,5" className="animate-dash-slow" />
                          <path d="M250 220 L200 280" stroke="url(#grad4)" strokeWidth="1.5" strokeDasharray="5,5" className="animate-dash-slow-reverse" />
                          
                          <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#4fd1c5" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#4fd1c5" stopOpacity="0.6" />
                            </linearGradient>
                            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#805ad5" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#805ad5" stopOpacity="0.6" />
                            </linearGradient>
                            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#4fd1c5" stopOpacity="0.6" />
                              <stop offset="100%" stopColor="#4fd1c5" stopOpacity="0.2" />
                            </linearGradient>
                            <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#805ad5" stopOpacity="0.6" />
                              <stop offset="100%" stopColor="#805ad5" stopOpacity="0.2" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Animated scan line */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/5 to-transparent opacity-70 animate-scanner-vertical"></div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-teal-400/30 to-blue-500/30 rounded-xl float-1 opacity-70 shadow-lg shadow-teal-500/20 backdrop-blur-sm border border-teal-400/30 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <div className="text-[8px] text-teal-100/70 font-mono overflow-hidden">
                        {artefactContent.split('\n').slice(0, 6).map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 -left-12 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-teal-400/30 rounded-lg float-2 opacity-70 shadow-lg shadow-blue-500/20 backdrop-blur-sm border border-blue-400/30">
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
                  <div className="absolute -bottom-8 right-1/3 w-16 h-16 bg-gradient-to-r from-teal-500/30 to-blue-500/30 rounded-md float-2 opacity-70 transform rotate-12 shadow-lg shadow-teal-500/20 backdrop-blur-sm border border-teal-400/30"></div>
                </div>
              </div>
              
              {/* Right side - Content */}
              <div className="lg:w-1/2 space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">
                    What Skynet Chat Does
                  </span>
                </h2>
                
                <p className="text-xl text-gray-300 leading-relaxed">
                  Skynet Chat provides a unified workspace where you interact with a powerful AI assistant through a familiar chat interface, working directly alongside your content.
                </p>
                
                <div className="space-y-6">
                  {/* Benefit items */}
                  <div className="flex items-start group">
                    <div className="mr-4 mt-1">
                      <div className="w-10 h-10 rounded-lg bg-teal-400/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform duration-300 group-hover:bg-teal-400/30 group-hover:shadow-md group-hover:shadow-teal-400/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">Unparalleled Privacy & Security</h3>
                      <p className="text-gray-300">Deploy the entire application, including AI models, directly within your organization's infrastructure. Your data never leaves your control.</p>
                      
                      {/* Expandable detail */}
                      <div className="mt-2">
                        <button className="text-sm text-teal-400 flex items-center gap-1 hover:underline">
                          <span>Learn more</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="mr-4 mt-1">
                      <div className="w-10 h-10 rounded-lg bg-purple-400/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300 group-hover:bg-purple-400/30 group-hover:shadow-md group-hover:shadow-purple-400/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Deep Personalization & Context</h3>
                      <p className="text-gray-300">Our sophisticated memory system learns your style over time, remembering preferences and project-specific details for increasingly personalized outputs.</p>
                      
                      {/* Expandable detail */}
                      <div className="mt-2">
                        <button className="text-sm text-purple-400 flex items-center gap-1 hover:underline">
                          <span>Learn more</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="mr-4 mt-1">
                      <div className="w-10 h-10 rounded-lg bg-blue-400/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-400/30 group-hover:shadow-md group-hover:shadow-blue-400/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">Flexible & Adaptable AI Core</h3>
                      <p className="text-gray-300">Choose and customize the underlying AI model that best fits your specific performance requirements and budget constraints.</p>
                      
                      {/* Expandable detail */}
                      <div className="mt-2">
                        <button className="text-sm text-blue-400 flex items-center gap-1 hover:underline">
                          <span>Learn more</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional feature */}
                  <div className="flex items-start group">
                    <div className="mr-4 mt-1">
                      <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-300 group-hover:bg-amber-400/30 group-hover:shadow-md group-hover:shadow-amber-400/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">Seamless Workflow Integration</h3>
                      <p className="text-gray-300">By combining the chat interface directly with the content artifact, Skynet Chat eliminates the need to constantly copy and paste between different applications.</p>
                      
                      {/* Expandable detail */}
                      <div className="mt-2">
                        <button className="text-sm text-amber-400 flex items-center gap-1 hover:underline">
                          <span>Learn more</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400/50 overflow-hidden">
                    <span className="relative z-10">Get Early Access</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <SkynetChatCallToAction />
        
      </div>
      
      <Footer />
    </main>
  );
} 