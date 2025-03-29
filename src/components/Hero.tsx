'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match window
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }[] = [];

    // Enhanced color palette
    const colors = ['#4fd1c5', '#38b2ac', '#319795', '#2c7a7b', '#805AD5'];

    const createParticles = () => {
      // Increased number of particles for a richer effect
      for (let i = 0; i < 70; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.3, // Slowed down for more elegant movement
          speedY: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2 // Variable opacity
        });
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap particles around screen edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle with variable opacity
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Connect particles with dynamic connection distance based on screen size
        const connectionDistance = Math.min(canvas.width, canvas.height) * 0.1;
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = Math.floor((1 - distance / connectionDistance) * 40).toString(16).padStart(2, '0');
            ctx.strokeStyle = particle.color + opacity;
            ctx.lineWidth = 0.4;
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
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-8 pt-16 pb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left content column */}
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 mb-2">
                <p className="text-sm font-medium text-teal-300">
                  Welcome to Async Studios
                </p>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                <span className="block mb-3">AI Agents.</span>
                <span className="block mb-3">Private.</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-teal-300 to-purple-400">
                  Built for you
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                We help businesses harness the power of AI with custom solutions that drive growth, efficiency, and innovation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 pt-2">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 text-gray-900 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400/50">
                  Get Started
                </button>
                <button className="px-8 py-4 rounded-full border border-gray-600 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/10 hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/30">
                  Learn More
                </button>
              </div>
              
              {/* Social proof */}
              <div className="flex items-center pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-12 h-12 rounded-full border-2 border-gray-800 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center shadow-lg"
                    >
                      <span className="text-xs font-medium text-teal-300">{i}</span>
                    </div>
                  ))}
                </div>
                <p className="ml-5 text-gray-300">Trusted by innovative companies</p>
              </div>
            </div>
            
            {/* Right content column - visual element */}
            <div className="lg:w-1/2 relative">
              <div className="relative w-full max-w-xl mx-auto">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-purple-500/20 to-blue-600/20 rounded-full blur-3xl"></div>
                
                {/* Main circle */}
                <div className="relative aspect-square">
                  <div className="absolute inset-8 bg-gray-900/80 backdrop-blur-sm rounded-full border border-teal-500/20"></div>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-teal-300 to-purple-400">AI</div>
                      <div className="text-gray-300 text-sm font-medium">Powered by Async</div>
                    </div>
                  </div>
                  
                  {/* Orbital ring */}
                  <div className="absolute w-full h-full animate-spin-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-teal-400 shadow-lg shadow-teal-400/50"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-teal-400 shadow-lg shadow-teal-400/50"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50"></div>
                  </div>
                </div>
                
                {/* Floating Elements with improved animations */}
                <div className="absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl float-1 opacity-80 shadow-lg shadow-teal-500/30"></div>
                <div className="absolute bottom-4 -left-12 w-20 h-20 bg-gradient-to-br from-purple-500 to-teal-400 rounded-lg float-2 opacity-70 shadow-lg shadow-purple-500/20"></div>
                <div className="absolute top-1/3 -right-16 w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full float-3 opacity-60 shadow-lg shadow-blue-500/20"></div>
                <div className="absolute -bottom-10 right-20 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md float-4 opacity-50 shadow-lg shadow-purple-500/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 