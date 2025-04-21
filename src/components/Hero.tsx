'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import React from 'react';

// Define prop types for FloatingElement
interface FloatingElementProps {
  position: string;
  size: string;
  gradient: string;
  className: string;
  children?: React.ReactNode;
}

// Memoized floating element component to reduce re-renders
const FloatingElement = React.memo(({ position, size, gradient, className, children }: FloatingElementProps) => (
  <div className={`absolute ${position} ${size} ${gradient} ${className}`}>
    {children}
  </div>
));

FloatingElement.displayName = 'FloatingElement';

// Define prop types for BrainImage
interface BrainImageProps {
  hoverEffect: boolean;
}

// Memoized brain image component
const BrainImage = React.memo(({ hoverEffect }: BrainImageProps) => (
  <div className="relative w-72 h-72 overflow-hidden">
    <Image
      src="/brain.png"
      alt="AI Brain"
      width={320}
      height={320}
      className={`object-contain transition-all duration-700 ${hoverEffect ? 'scale-110' : 'scale-100'}`}
      style={{ 
        filter: 'drop-shadow(0 0 8px rgba(79, 209, 197, 0.5))',
      }}
      priority
    />
    
    {/* Animated scan line overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/10 to-transparent opacity-70 animate-scanner-vertical"></div>
  </div>
));

BrainImage.displayName = 'BrainImage';

// Define prop types for FeatureIcon
interface FeatureIconProps {
  icon: React.ReactNode;
  label: string;
}

// Memoized feature icon component
const FeatureIcon = React.memo(({ icon, label }: FeatureIconProps) => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 rounded-full border-2 border-teal-400/70 flex items-center justify-center transition-transform duration-300 hover:scale-110 group">
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-300">{label}</span>
  </div>
));

FeatureIcon.displayName = 'FeatureIcon';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverEffect, setHoverEffect] = useState(false);
  // Client-side state for particles to prevent hydration mismatch
  const [particlePositions, setParticlePositions] = useState<Array<{top: string, left: string, animClass: string}>>([]);
  // Client-side state for canvas particles
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({ isMobile: false, isLowPower: false });
  
  // Memoize the particle generation to avoid recalculation on each render
  const generateStaticParticles = useCallback(() => {
    const newParticles = [];
    for (let i = 0; i < 6; i++) {
      newParticles.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animClass: `float-${i % 3 + 1} ${3 + i * 0.5}s infinite ease-in-out`
      });
    }
    return newParticles;
  }, []);

  // Client-side effect to generate random particles
  useEffect(() => {
    // Initialize particle positions on client side only
    setParticlePositions(generateStaticParticles());
    
    // Set loaded state for animation timing - delay slightly
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Detect device capabilities
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      const isLowPower = navigator.hardwareConcurrency <= 4;
      setDeviceInfo({ isMobile, isLowPower });
    }
    
    return () => clearTimeout(timer);
  }, [generateStaticParticles]);

  // Memoize the colors array to prevent recreation on each render
  const particleColors = useMemo(() => [
    '#4FD1C5', // Brighter teal
    '#38B2AC', 
    '#9F7AEA', // Brighter purple
    '#805AD5', 
    '#00FFFF', // Cyan
    '#38B2FF', // Bright blue
    '#F687B3', // Pink
    '#FC8181'  // Red
  ], []);
  
  // Memoize the number of particles based on device capabilities
  const particleCount = useMemo(() => {
    if (deviceInfo.isMobile || deviceInfo.isLowPower) {
      return 40; // Fewer particles for mobile/low-power devices
    }
    return 90; // Full particles for powerful devices
  }, [deviceInfo]);

  // Optimize canvas setup and animation
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

    let particles: {
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
    let animationFrameId: number;
    let isTabVisible = true;

    // Cache for particle gradients - improved with color in cache key
    const particleGradientCache = new Map<string, CanvasGradient>();

    const createParticleGradient = (size: number, color: string) => {
      // Include color in the cache key for more precise caching
      const cacheKey = `${size.toFixed(2)}_${color}`;
      if (particleGradientCache.has(cacheKey)) {
        return particleGradientCache.get(cacheKey)!;
      }

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.5);
      gradient.addColorStop(0, color + 'ff');
      gradient.addColorStop(0.6, color + 'aa');
      gradient.addColorStop(1, color + '00');
      particleGradientCache.set(cacheKey, gradient);
      return gradient;
    };

    const createParticles = () => {
      // Use the memoized particle count
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1, // Increased size for better visibility
          speedX: (Math.random() - 0.5) * 0.4, 
          speedY: (Math.random() - 0.5) * 0.4,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          opacity: Math.random() * 0.8 + 0.3, // Increased opacity
          pulse: 0,
          pulseSpeed: Math.random() * 0.02 + 0.01 // For pulsing animation
        });
      }
    };

    // Visibility API for throttling animations when tab is not visible
    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        // Update particle position
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
        
        // Use cached gradient with improved key
        const gradient = createParticleGradient(currentSize, particle.color);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.restore();

        // Create connections - optimized for device capabilities
        // Adjust connection distance for mobile/low-power
        const baseConnectionDistance = Math.min(canvas.width, canvas.height) * 0.12;
        const connectionDistance = deviceInfo.isMobile || deviceInfo.isLowPower 
          ? baseConnectionDistance * 0.7 
          : baseConnectionDistance;
          
        // Limit connections search - reduced number for better performance
        const maxConnections = deviceInfo.isMobile || deviceInfo.isLowPower ? 3 : 5;
        
        for (let j = index + 1; j < Math.min(particles.length, index + maxConnections); j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          // Use approximate distance for performance when possible
          // Avoid square root for performance when checking against thresholds
          const distSquared = dx * dx + dy * dy;
          const connectionDistSquared = connectionDistance * connectionDistance;
          
          if (distSquared < connectionDistSquared) {
            // Only calculate exact distance when needed
            const distance = Math.sqrt(distSquared);
            // Dynamic line width based on distance
            const lineWidth = 0.5 * (1 - distance / connectionDistance);
            
            ctx.beginPath();
            // Increase opacity for better visibility on black background
            const opacity = Math.floor((1 - distance / connectionDistance) * 90).toString(16).padStart(2, '0');
            
            // Use solid color instead of gradient for better performance
            ctx.strokeStyle = particle.color + opacity;
            ctx.lineWidth = lineWidth;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      // Throttle animation when tab not visible
      if (isTabVisible) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Throttle to ~10 FPS when tab not visible to save resources
        setTimeout(() => {
          animationFrameId = requestAnimationFrame(animate);
        }, 100);
      }
    };

    createParticles();
    animate();

    // Responsive canvas - debounced resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasDimensions();
        particles.length = 0; // Clear particles
        createParticles(); // Recreate particles for new dimensions
        
        // Update device info on resize
        const isMobile = window.innerWidth < 768;
        const isLowPower = navigator.hardwareConcurrency <= 4;
        setDeviceInfo({ isMobile, isLowPower });
      }, 200); // Debounce resize events
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isCanvasReady, particleColors, particleCount, deviceInfo]); // Dependencies include memoized values

  // Memoize handlers
  const handleMouseEnter = useCallback(() => setHoverEffect(true), []);
  const handleMouseLeave = useCallback(() => setHoverEffect(false), []);

  // Memoize feature icons to prevent recreation on each render
  const featureIcons = useMemo(() => [
    {
      icon: <svg className="w-5 h-5 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>,
      label: "Functional"
    },
    {
      icon: <svg className="w-5 h-5 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>,
      label: "High-Performance"
    },
    {
      icon: <svg className="w-5 h-5 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>,
      label: "Enterprise Security"
    }
  ], []);

  // Memoize the get started and learn more handlers to prevent recreation on each render
  const handleGetStarted = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleLearnMore = useCallback(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Rest of your component remains the same
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-950">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Subtle radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-gray-950/80 z-0"></div>
      
      <div className={`relative z-10 h-full flex items-center justify-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 lg:px-8 pt-16 pb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Left content column */}
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-gray-950/70 backdrop-blur-lg border border-teal-500/30 mb-3 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/10">
                <p className="text-sm font-medium text-teal-300 flex items-center">
                  Welcome to Async Studios
                </p>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                <div className="overflow-hidden">
                  <span className="block mb-3 transform translate-y-0 transition-transform duration-700 delay-100 ease-out">AI Agents.</span>
                </div>
                <div className="overflow-hidden">
                  <span className="block mb-3 transform translate-y-0 transition-transform duration-700 delay-300 ease-out">Private.</span>
                </div>
                <div className="overflow-hidden">
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500 transform translate-y-0 transition-transform duration-700 delay-500 ease-out">
                    Built for you
                  </span>
                </div>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                Ditch generic AI. Get private, custom agents built for your challenges, delivering results that actually matter.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <button 
                  onClick={handleGetStarted}
                  className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400/50 overflow-hidden">
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                </button>
                <button 
                  onClick={handleLearnMore}
                  className="relative px-8 py-4 rounded-full border border-gray-700 backdrop-blur-lg text-white transition-all duration-300 hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/30 overflow-hidden group">
                  <span className="relative z-10">Learn More</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-950 to-gray-950 opacity-80"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
              
              {/* Feature highlights with teal outlined icons - using memoized components */}
              <div className="flex flex-wrap items-center gap-6 pt-8">
                {featureIcons.map((feature, index) => (
                  <FeatureIcon 
                    key={index}
                    icon={feature.icon}
                    label={feature.label}
                  />
                ))}
              </div>
            </div>
            
            {/* Right content column - Enhanced visual element */}
            <div className="lg:w-1/2 relative">
              <div className="relative w-full max-w-xl mx-auto">
                {/* Animated background glow with multiple layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-purple-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute inset-10 -inset-x-10 bg-gradient-to-tr from-purple-600/10 via-blue-500/10 to-teal-500/10 rounded-full blur-2xl animate-pulse-slower"></div>
                
                {/* Main holographic effect */}
                <div className="relative aspect-square">
                  {/* Glowing ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-teal-400/30 animate-ping-slow"></div>
                  
                  {/* Main circle with glass effect */}
                  <div className="absolute inset-8 bg-gray-950/60 backdrop-blur-xl rounded-full border border-teal-500/30 shadow-2xl shadow-teal-500/10"></div>
                  
                  {/* Animated grid lines for tech effect */}
                  <div className="absolute inset-8 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#4fd1c520_1px,transparent_1px)] [background-size:8px_8px] opacity-70"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#4fd1c510_50%,transparent_100%)] animate-scanner"></div>
                  </div>
                  
                  {/* Center content with enhanced visual treatment */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div 
                      className="text-center transform hover:scale-105 transition-transform duration-500"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Brain image with animation and effects - EVEN LARGER SIZE */}
                      <div className="relative w-80 h-80 mx-auto">
                        {/* Glowing background for the brain */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-teal-500/30 to-purple-500/30 rounded-full blur-md transition-opacity duration-500 ${hoverEffect ? 'opacity-100' : 'opacity-50'}`}></div>
                        
                        {/* Brain image with mask and effects - using memoized component */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BrainImage hoverEffect={hoverEffect} />
                          
                          {/* Animated particles around the brain - CLIENT-SIDE RENDERING */}
                          <div className="absolute inset-0">
                            {isLoaded && particlePositions.map((particle, i) => (
                              <div 
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-teal-400/90"
                                style={{
                                  top: particle.top,
                                  left: particle.left,
                                  animation: particle.animClass,
                                  backgroundColor: i % 2 === 0 ? '#4FD1C5' : (i % 3 === 0 ? '#9F7AEA' : '#38B2FF')
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Tech circuit overlay */}
                        <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
                          <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-center bg-no-repeat bg-contain"></div>
                        </div>
                        
                        {/* Interactive pulse rings on hover */}
                        <div className={`absolute inset-4 rounded-full border border-teal-400/30 transition-all duration-500 ${hoverEffect ? 'opacity-100 scale-90' : 'opacity-40 scale-100'}`}></div>
                        <div className={`absolute inset-8 rounded-full border border-purple-400/20 transition-all duration-700 delay-100 ${hoverEffect ? 'opacity-100 scale-95' : 'opacity-30 scale-100'}`}></div>
                      </div>
                      
                      {/* Powered by text with better positioning and styling */}
                      <div className="text-gray-300 text-sm font-medium inline-flex items-center px-3 py-1 rounded-full bg-gray-950/70 backdrop-blur-md border border-gray-700 mt-3 hover:border-teal-500/50 transition-colors duration-300">
                        <span className="inline-block w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                        Powered by Async
                      </div>
                    </div>
                  </div>
                  
                  {/* Code snippets floating around the brain */}
                  <div className="absolute inset-0">
                    {isLoaded && (
                      <>
                        <div className="absolute top-[15%] -left-32 max-w-[120px] rounded-md bg-gray-950/80 backdrop-blur-sm border border-gray-800 p-2 transform rotate-12 float-2 hidden lg:block">
                          <div className="text-[8px] font-mono">
                            <span className="text-purple-400">async</span> <span className="text-teal-300">function</span> <span className="text-amber-300">processData</span>() {'{'}
                            <br/>
                            <span className="text-gray-400 pl-2">// AI magic</span>
                            <br/>
                            {'}'}
                          </div>
                        </div>
                        
                        <div className="absolute bottom-[20%] -right-36 max-w-[130px] rounded-md bg-gray-950/80 backdrop-blur-sm border border-gray-800 p-2 transform -rotate-6 float-3 hidden lg:block">
                          <div className="text-[8px] font-mono">
                            <span className="text-purple-400">class</span> <span className="text-teal-300">AsyncAgent</span> {'{'}
                            <br/>
                            <span className="text-amber-300 pl-2">constructor</span>() {'{'}
                            <br/>
                            <span className="text-gray-400 pl-4">// Init</span>
                            <br/>
                            <span className="pl-2">{'}'}</span>
                            <br/>
                            {'}'}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Multi-layered orbital rings */}
                  <div className="absolute w-full h-full animate-spin-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-teal-400 shadow-lg shadow-teal-400/70"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-400 shadow-lg shadow-purple-400/70"></div>
                  </div>
                  
                  <div className="absolute w-full h-full animate-spin-reverse-slow">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-400 shadow-lg shadow-blue-400/70"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-400 shadow-lg shadow-teal-400/70"></div>
                  </div>
                  
                  {/* Data stream effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div className="absolute left-1/4 top-0 h-full w-1 bg-gradient-to-b from-transparent via-teal-400/30 to-transparent animate-data-stream"></div>
                    <div className="absolute right-1/3 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-purple-400/30 to-transparent animate-data-stream-alt"></div>
                  </div>
                </div>
                
                {/* Floating Elements with improved animations and tech look - using memoized FloatingElement component */}
                <FloatingElement 
                  position="-top-8 -right-8" 
                  size="w-28 h-28" 
                  gradient="bg-gradient-to-br from-teal-400/80 to-blue-500/80" 
                  className="rounded-xl float-1 opacity-70 shadow-lg shadow-teal-500/30 backdrop-blur-sm border border-teal-400/30 overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/workflow.png"
                      alt="Workflow"
                      width={112}
                      height={112}
                      className="object-cover opacity-90"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.2)_25%,rgba(68,68,68,0.2)_50%,transparent_50%,transparent_75%,rgba(68,68,68,0.2)_75%)] bg-[length:4px_4px] mix-blend-overlay"></div>
                </FloatingElement>
                
                <FloatingElement 
                  position="bottom-4 -left-12" 
                  size="w-20 h-20" 
                  gradient="bg-gradient-to-br from-purple-500/80 to-teal-400/80" 
                  className="rounded-lg float-2 opacity-70 shadow-lg shadow-purple-500/20 backdrop-blur-sm border border-purple-400/30"
                >
                  <div className="absolute inset-0 text-[6px] text-white/20 overflow-hidden p-1 font-mono">10110101010101</div>
                </FloatingElement>
                
                <FloatingElement 
                  position="top-1/3 -right-16" 
                  size="w-16 h-16" 
                  gradient="bg-gradient-to-r from-teal-500/70 to-blue-500/70" 
                  className="rounded-full float-3 opacity-70 shadow-lg shadow-blue-500/20 backdrop-blur-sm border border-blue-400/30"
                >
                  <div className="absolute -inset-1 border border-blue-400/40 rounded-full animate-ping-slow"></div>
                </FloatingElement>
                
                <FloatingElement 
                  position="-bottom-10 right-20" 
                  size="w-14 h-14" 
                  gradient="bg-gradient-to-r from-purple-500/70 to-pink-500/70" 
                  className="rounded-md float-4 opacity-70 shadow-lg shadow-purple-500/20 backdrop-blur-sm border border-purple-400/30"
                />
                
                {/* Additional futuristic elements */}
                <div className="absolute left-1/4 top-1/4 w-8 h-2 bg-teal-400/50 rounded-full shadow-lg shadow-teal-400/30 animate-pulse-fast"></div>
                <div className="absolute right-1/3 bottom-1/4 w-2 h-8 bg-purple-400/50 rounded-full shadow-lg shadow-purple-400/30 animate-pulse-fast"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Hero); 