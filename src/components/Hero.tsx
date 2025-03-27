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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];

    const colors = ['#4fd1c5', '#38b2ac', '#319795', '#2c7a7b'];

    const createParticles = () => {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + '40'; // Add transparency
        ctx.fill();

        // Connect particles
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color + Math.floor((1 - distance / 100) * 20).toString(16);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
    };

    createParticles();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="relative z-10 pt-32 pb-20 container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6 md:pr-12 mb-12 md:mb-0">
          <div className="inline-block px-4 py-1 rounded-full bg-gray-800 border border-gray-700 mb-4">
            <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-200">
              AI Agents. Private. Built for you
            </p>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="block">Revolutionize your business</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-200">
              with Intelligent AI Solutions
            </span>
          </h1>
          
          <p className="text-xl text-gray-300">
            We help businesses harness the power of AI with custom solutions that drive growth, efficiency, and innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 text-gray-900 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-3 rounded-full border border-gray-700 text-white transition-all duration-300 hover:bg-gray-800 hover:border-teal-400">
              Learn More
            </button>
          </div>
          
          <div className="flex items-center mt-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center">
                  <span className="text-xs font-medium">{i}</span>
                </div>
              ))}
            </div>
            <p className="ml-4 text-gray-400">Trusted by innovative companies</p>
          </div>
        </div>
        
        <div className="md:w-1/2 relative">
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
            <div className="absolute inset-8 bg-gray-900 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 relative">
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-200">AI</div>
                    <div className="text-gray-400 text-sm">Powered by Async</div>
                  </div>
                </div>
                <div className="absolute w-full h-full animate-spin-slow">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-teal-400"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-teal-400"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-400"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-400"></div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl floating opacity-80"></div>
            <div className="absolute bottom-4 -left-12 w-16 h-16 bg-gradient-to-br from-purple-500 to-teal-400 rounded-lg floating delay-500 opacity-60"></div>
            <div className="absolute top-1/2 -right-16 w-12 h-12 bg-teal-500 rounded-full floating delay-1000 opacity-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 