'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

// Client-only component for the animated particles
const GlobeParticles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted (client-side), return empty div to avoid hydration mismatch
  if (!mounted) return <div className="absolute inset-0"></div>;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[...Array(12)].map((_, i) => {
        // Calculate positions in a circle around the globe
        const angle = (i * Math.PI/6);
        // Position particles around the rings
        const radius = 45 + (i % 3) * 8; // Vary radius for depth effect
        // Fix precision to avoid hydration errors
        const top = Number((50 + Math.sin(angle) * radius / 64 * 100).toFixed(2));
        const left = Number((50 + Math.cos(angle) * radius / 64 * 100).toFixed(2));
        const duration = 6 + i % 4;
        const delay = i * 0.3;
        const colorIndex = i % 3;
        const colors = ['teal', 'purple', 'blue'];
        
        return (
          <div 
            key={`particle-${i}`} 
            className={`absolute w-1.5 h-1.5 rounded-full bg-${colors[colorIndex]}-400 opacity-80`}
            style={{ 
              top: `${top}%`, 
              left: `${left}%`,
              animation: `float-particle ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`
            }}
          />
        );
      })}
    </div>
  );
};

// Connection points component to avoid hydration issues
const ConnectionPoints = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted (client-side), return empty div to avoid hydration mismatch
  if (!mounted) return <div className="absolute inset-0"></div>;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[...Array(8)].map((_, i) => {
        // Calculate positions in a circle directly on the globe's border
        const angle = (i * Math.PI/4);
        const radius = 30; // Position on edge of the core globe (which is 40px)
        // Fix precision to avoid hydration errors
        const top = Number((50 + Math.sin(angle) * radius / 64 * 100).toFixed(2)); 
        const left = Number((50 + Math.cos(angle) * radius / 64 * 100).toFixed(2));
        const delay = i * 0.2;
        const size = 2 + (i % 3) * 0.5; // Vary size slightly for visual interest
        const colorIndex = i % 3;
        const colors = ['teal', 'purple', 'blue'];
        
        return (
          <div 
            key={`point-${i}`}
            className={`absolute rounded-full bg-${colors[colorIndex]}-400 animate-pulse`}
            style={{ 
              top: `${top}%`, 
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`
            }}
          />
        );
      })}
    </div>
  );
};

// Define types for section data for better structure (Optional but good practice)
interface ValueItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  bgColor: string;
  textColor: string;
}

interface LeadershipItem {
  title: string;
  description: string;
  hoverBorderColor: string;
  textColor: string;
}

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Data for Values section - makes rendering cleaner
  const coreValues: ValueItem[] = [
    {
      title: "Innovation Leadership",
      description: "We continuously explore the cutting edge of AI to bring transformative solutions that keep our clients ahead of the competition.",
      icon: <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      borderColor: "border-teal-400/70",
      bgColor: "bg-teal-500/10",
      textColor: "text-teal-400",
    },
    {
      title: "Business Transformation",
      description: "We focus on delivering measurable business impact, not just implementing technology for technology's sake.",
      icon: <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
      borderColor: "border-purple-400/70",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-400",
    },
    {
      title: "Educational Empowerment",
      description: "We believe in demystifying AI through education, enabling our clients to make informed decisions about their technological future.",
      icon: <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      borderColor: "border-blue-400/70",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-400",
    },
  ];

  // Data for Thought Leadership section
  const leadershipItems: LeadershipItem[] = [
      { title: "Conference Speakers", description: "Our team regularly presents at leading technology conferences, sharing insights on practical AI implementation strategies.", hoverBorderColor: "hover:border-teal-500/60", textColor: "text-teal-300" },
      { title: "AI Workshops", description: "We conduct hands-on workshops to help businesses understand and leverage the latest AI technologies for their specific needs.", hoverBorderColor: "hover:border-purple-500/60", textColor: "text-purple-300" },
      { title: "Industry Publications", description: "Our research and case studies are regularly featured in leading industry publications, contributing to the broader AI discourse.", hoverBorderColor: "hover:border-blue-500/60", textColor: "text-blue-300" },
  ];


  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      {/* Use a more dynamic background effect */}
      <div className="relative pt-36 pb-24 px-4 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-gray-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-gray-950 via-purple-950/20 to-teal-950/20 animate-gradient-xy"></div>

        {/* Container with load-in animation */}
        <div className={`container mx-auto transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500 animate-text-gradient">
                About Async Studios
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Empowering businesses to harness the power of AI for transformative growth. We craft bespoke AI agents, ensuring privacy and performance.
            </p>
            <div className="flex justify-center mt-10">
              <div className="w-28 h-1.5 bg-gradient-to-r from-teal-500 via-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/30"></div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-28">
             {/* Enhanced card with hover effect */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-black/30 transition-all duration-500 hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/10 via-transparent to-purple-600/10 opacity-50 transition-opacity duration-500 group-hover:opacity-80 rounded-3xl"></div>
              <div className="absolute inset-0 pattern-bg opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>

              <div className="relative p-8 md:p-12 lg:p-16">
                <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-100">
                  Our Mission
                </h2>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg max-w-4xl">
                  At Async Studios, our mission is to help businesses incorporate powerful AI solutions that optimise performance and drive sustainable growth. Based in London but operating worldwide, we are dedicated to:
                </p>
                <ul className="space-y-6 text-gray-300 text-lg">
                  {/* Interactive list items */}
                  {[
                    { text: "Educating businesses", detail: "Demystifying AI technologies and showcasing their transformative potential for organisations of all sizes", color: "teal" },
                    { text: "Optimising performance", detail: "Creating tailored AI solutions that seamlessly integrate with existing workflows to enhance efficiency and productivity", color: "purple" },
                    { text: "Driving innovation", detail: "Leading the conversation about emerging AI technologies through industry talks, workshops, and collaborative partnerships", color: "blue" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start group/item transition-all duration-300 hover:translate-x-1">
                      <div className={`flex-shrink-0 w-7 h-7 rounded-full bg-${item.color}-500/20 border-2 border-${item.color}-500/60 flex items-center justify-center mr-4 mt-1 transition-all duration-300 group-hover/item:scale-110 group-hover/item:shadow-[0_0_15px] group-hover/item:shadow-${item.color}-500/50`}>
                        <svg className={`w-4 h-4 text-${item.color}-400`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span><span className={`font-semibold text-${item.color}-300`}>{item.text}</span> — {item.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Global Impact Section */}
          <div className="mb-28">
             <div className="text-center mb-16">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500 inline-block">
                  Global Reach, Local Expertise
                </h2>
             </div>
             {/* Enhanced card styling with improved visual effects */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-black/30 transition-all duration-500 hover:shadow-teal-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-50 transition-opacity duration-500 group-hover:opacity-80 rounded-3xl"></div>
              
              {/* Improved background pattern */}
              <div className="absolute inset-0 pattern-globe opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <div className="relative p-8 md:p-12 lg:p-16">
                 {/* Improved grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-gray-300 leading-relaxed text-lg space-y-5">
                    <p className="first-letter:text-2xl first-letter:font-bold first-letter:text-teal-300">
                      Founded in London, Async Studios has quickly grown into a global AI consultancy with clients spanning multiple continents. Our team combines local market insights with cutting-edge technical expertise to deliver solutions that resonate with diverse business environments.
                    </p>
                    <p>
                      We pride ourselves on being thought leaders in the AI space, regularly conducting workshops, speaking at conferences, and publishing insights on the latest developments in artificial intelligence. Our educational initiatives have helped countless organisations understand and implement AI strategies that drive measurable business results.
                    </p>
                    
                    {/* Added stats to enhance the section */}
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-4 border-t border-gray-800/50">
                      {[
                        { number: "20+", label: "Countries" },
                        { number: "100+", label: "Clients" },
                        { number: "50+", label: "AI Solutions" }
                      ].map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-300">{stat.number}</div>
                          <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Completely redesigned globe visualization */}
                  <div className="flex justify-center items-center">
                    <div className="relative w-72 h-72 flex items-center justify-center">
                      {/* Main glow effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500/20 via-purple-500/20 to-blue-500/20 opacity-70 blur-2xl animate-pulse-slow"></div>
                      
                      {/* Orbital rings */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-64 h-64">
                          <div className="absolute inset-0 rounded-full border border-teal-500/30 animate-spin-slow"></div>
                          <div className="absolute inset-8 rounded-full border border-purple-500/30 animate-spin-reverse-slow"></div>
                          <div className="absolute inset-16 rounded-full border border-blue-500/30 animate-spin-slow" style={{ animationDuration: '25s' }}></div>
                        </div>
                      </div>
                      
                      {/* Connection points and particles are positioned relative to the container */}
                      <div className="relative w-64 h-64">
                        {/* Connection points - simulating global network */}
                        <ConnectionPoints />
                        
                        {/* Animated particles representing data flow */}
                        <GlobeParticles />
                        
                        {/* Core globe with detailed SVG */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-40 h-40 rounded-full bg-gray-900/80 p-1 border border-gray-700/50 shadow-inner overflow-hidden">
                            {/* Earth gradient background */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-teal-500/30"></div>
                            
                            {/* Improved Globe SVG with continents */}
                            <svg className="absolute inset-0 w-full h-full animate-spin-slow" style={{ animationDuration: '60s' }} viewBox="0 0 100 100" fill="none">
                              {/* Grid lines */}
                              <circle cx="50" cy="50" r="49" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                              <path d="M1,50 h98" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                              <path d="M50,1 v98" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                              <ellipse cx="50" cy="50" rx="49" ry="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" transform="rotate(0,50,50)" />
                              <ellipse cx="50" cy="50" rx="49" ry="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" transform="rotate(45,50,50)" />
                              <ellipse cx="50" cy="50" rx="49" ry="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" transform="rotate(90,50,50)" />
                              <ellipse cx="50" cy="50" rx="49" ry="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" transform="rotate(135,50,50)" />
                              
                              {/* Simplified continents in bright colors */}
                              <path d="M40,20 Q45,25 50,20 Q60,15 55,25 Q65,30 60,35 Q55,45 45,40 Q40,30 40,20" fill="rgba(56,178,172,0.6)" /> {/* North America */}
                              <path d="M65,45 Q70,50 75,45 Q80,50 75,55 Q70,60 65,55 Q60,50 65,45" fill="rgba(129,140,248,0.6)" /> {/* Europe */}
                              <path d="M70,65 Q75,60 80,65 Q85,70 80,75 Q75,80 70,75 Q65,70 70,65" fill="rgba(167,139,250,0.6)" /> {/* Australia */}
                              <path d="M55,60 Q65,55 60,65 Q55,75 50,70 Q45,65 55,60" fill="rgba(245,158,11,0.5)" /> {/* Africa */}
                              <path d="M30,50 Q40,45 35,55 Q30,65 25,60 Q20,55 30,50" fill="rgba(16,185,129,0.6)" /> {/* South America */}
                              <path d="M80,30 Q90,35 85,45 Q80,40 75,45 Q70,40 80,30" fill="rgba(239,68,68,0.5)" /> {/* Asia */}
                            </svg>
                            
                            {/* Glow overlay */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-blue-500/10 to-transparent"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center mb-28">
            <h2 className="text-4xl font-bold mb-16 inline-block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">
              Our Core Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {coreValues.map((value, index) => {
                // Determine the hover border color class based on textColor
                const hoverBorderColorClass = `group-hover:border-${value.textColor.split('-')[1]}-500/50`;
                const shadowColorClass = `group-hover:shadow-${value.textColor.split('-')[1]}-500/30`; // For potential glow effect
                
                return (
                  <div 
                    key={index} 
                    className="group relative p-8 rounded-2xl border border-gray-800/80 bg-gray-950/60 backdrop-blur-lg transition-all duration-300 ease-in-out hover:border-opacity-100 hover:shadow-xl hover:scale-[1.03] text-center"
                  >
                    {/* Glowing border effect on hover - Apply dynamic class here */}
                    <div 
                      className={`absolute -inset-px rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 ${hoverBorderColorClass} transition-opacity duration-300 pointer-events-none animate-pulse-border`}
                    ></div>

                    {/* Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${value.bgColor.replace('bg-', 'from-').replace('/10','/15')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>

                    <div className="relative z-10">
                      <div className={`w-16 h-16 rounded-full border-2 ${value.borderColor} ${value.bgColor} flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ${shadowColorClass}`}>
                         <span className={value.textColor}>{value.icon}</span>
                      </div>
                      <h3 className="text-2xl font-semibold mb-3 text-white">{value.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Thought Leadership Section */}
          <div className="mb-28">
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">
              Thought Leadership
            </h2>
            <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-black/30 p-8 md:p-12 lg:p-16">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-transparent to-teal-600/10 opacity-60 rounded-3xl"></div>
                 <div className="absolute inset-0 pattern-dots opacity-10"></div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                  {leadershipItems.map((item, index) => (
                      <div key={index} className={`group relative p-6 rounded-xl border border-gray-700/50 bg-gray-950/50 backdrop-blur-md transition-all duration-300 ${item.hoverBorderColor} hover:bg-gray-900/70 hover:shadow-lg`}>
                          <h3 className={`text-xl font-semibold mb-3 ${item.textColor}`}>{item.title}</h3>
                          <p className="text-gray-400 text-base leading-relaxed">{item.description}</p>
                          {/* Subtle indicator */}
                          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gray-600 group-hover:bg-gradient-to-r from-teal-500 to-purple-500 transition-all duration-300 scale-0 group-hover:scale-100"></div>
                      </div>
                  ))}
                </div>
            </div>
          </div>


          {/* Contact CTA */}
          <div className="relative rounded-3xl overflow-hidden border border-gray-800 p-12 lg:p-16 max-w-5xl mx-auto bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-black/40">
             {/* More prominent background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-700/15 via-purple-700/15 to-blue-700/15 opacity-60 animate-gradient-x pointer-events-none"></div>
            <div className="absolute inset-0 pattern-circuit opacity-5 pointer-events-none"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white leading-tight">Ready to Transform Your Business with AI?</h2>
              <p className="text-gray-300 text-lg mb-10 max-w-3xl mx-auto leading-relaxed">
                Let's discuss how our bespoke AI expertise can help optimise your operations, drive innovation, and achieve sustainable growth.
              </p>
              {/* Enhanced Button Style */}
              <a 
                href="#contact" // Assuming you have a contact section with id="contact"
                className="group relative inline-block px-10 py-5 rounded-full bg-gradient-to-r from-teal-500 via-purple-500 to-blue-500 text-white text-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-[0_0_25px] hover:shadow-purple-500/50 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-purple-500/40 overflow-hidden"
              >
                <span className="relative z-10 tracking-wide">Get in Touch</span>
                {/* Shine effect on hover */}
                <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-in-out group-hover:left-[100%]"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* Add CSS for custom animations/patterns if needed */}
      <style jsx global>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
          background-size: 200% 200%; /* Ensure gradient covers area */
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 10s ease infinite;
           background-size: 200% 100%;
        }
        @keyframes text-gradient {
          to {
            background-position: 200% center;
          }
        }
        .animate-text-gradient {
          background-size: 200% auto;
          animation: text-gradient 3s linear infinite;
        }
        
        /* Animation for spinning globes and rings */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        @keyframes spin-reverse-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 20s linear infinite;
        }
        
        /* Animation for floating particles */
        @keyframes float-particle {
          0% { transform: translate(-3px, -3px) scale(0.8); opacity: 0.2; }
          50% { transform: translate(3px, 3px) scale(1.5); opacity: 0.9; }
          100% { transform: translate(-3px, -3px) scale(0.8); opacity: 0.2; }
        }
        
        /* New pulse animation for enhanced effect */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .pattern-bg {
          background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0.03) 75%, transparent 75%, transparent);
          background-size: 10px 10px;
        }
        .pattern-dots {
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 15px 15px;
        }
        .pattern-globe {
          background-image: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.03) 0%, transparent 40%),
                           radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.03) 0%, transparent 30%),
                           radial-gradient(circle at 70% 30%, rgba(45, 212, 191, 0.03) 0%, transparent 30%);
        }
        .pattern-circuit {
          background-image: url('/circuit-pattern.svg'); /* Make sure you have this */
          background-repeat: repeat;
          background-size: 300px; /* Adjust size */
        }

        @keyframes pulse-border {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.01); }
        }
        .animate-pulse-border {
          animation: pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Define root variables for colors if needed, simplifies hover style binding */
        :root {
          --color-teal: #4FD1C5;
          --color-purple: #9F7AEA;
          --color-blue: #63B3ED;
        }
      `}</style>
    </main>
  );
} 