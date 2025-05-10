'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Client-only component for the animated particles (Adjusted colors)
const GlobeParticles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0"></div>;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[...Array(12)].map((_, i) => {
        const angle = (i * Math.PI/6);
        const radius = 45 + (i % 3) * 8; 
        const top = Number((50 + Math.sin(angle) * radius / 64 * 100).toFixed(2));
        const left = Number((50 + Math.cos(angle) * radius / 64 * 100).toFixed(2));
        const duration = 6 + i % 4;
        const delay = i * 0.3;
        const colorIndex = i % 3;
        // Changed teal to indigo
        const colors = ['indigo', 'purple', 'blue']; 
        
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

// Connection points component (Adjusted colors)
const ConnectionPoints = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0"></div>;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI/4);
        const radius = 30; 
        const top = Number((50 + Math.sin(angle) * radius / 64 * 100).toFixed(2)); 
        const left = Number((50 + Math.cos(angle) * radius / 64 * 100).toFixed(2));
        const delay = i * 0.2;
        const size = 2 + (i % 3) * 0.5; 
        const colorIndex = i % 3;
         // Changed teal to indigo
        const colors = ['indigo', 'purple', 'blue'];
        
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

// Define types for section data (Adjusted colors)
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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  // Data for Values section (Adjusted colors - teal -> indigo)
  const coreValues: ValueItem[] = [
    {
      title: "Innovation Leadership",
      description: "We continuously explore the cutting edge of AI to bring transformative solutions that keep our clients ahead of the competition.",
      icon: <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      borderColor: "border-indigo-400/70", // Changed from teal
      bgColor: "bg-indigo-500/10",     // Changed from teal
      textColor: "text-indigo-400",     // Changed from teal
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

  // Data for Thought Leadership section (Adjusted colors - teal -> indigo)
  const leadershipItems: LeadershipItem[] = [
      { title: "Conference Speakers", description: "Our team aims to present at technology conferences, sharing insights on practical AI implementation strategies.", hoverBorderColor: "hover:border-indigo-500/60", textColor: "text-indigo-300" }, // Changed from teal
      { title: "AI Workshops", description: "We are developing hands-on workshops to help businesses understand and leverage the latest AI technologies.", hoverBorderColor: "hover:border-purple-500/60", textColor: "text-purple-300" },
      { title: "Industry Publications", description: "We plan to contribute our research and case studies to industry publications, adding to the broader AI discourse.", hoverBorderColor: "hover:border-blue-500/60", textColor: "text-blue-300" },
  ];


  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      {/* Updated background to match blogs page style */}
      <div className="relative pt-36 pb-24 px-4 overflow-hidden">
         {/* Background elements from blogs page */}
        {/* <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute inset-y-0 left-[40%] w-px bg-gradient-to-b from-transparent via-indigo-400/30 to-transparent"></div>
          <div className="absolute inset-y-0 right-[40%] w-px bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"></div>
          <div className="absolute inset-x-0 top-[30%] h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-[30%] h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px]"></div>
        </div> */}
        
        {/* Floating gradient orbs from blogs page */}
        {/* <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div> */}
        
        {/* Custom scan line effect from blogs page */}
        {/* <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(79,70,229,0.05)_50%,transparent_100%)] animate-scan-slow"></div> */}

        {/* Container with load-in animation */}
        <div className={`container mx-auto relative z-10 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {/* Header (Updated gradient to match blogs page) */}
          <div className="text-center mb-20">
             <div className="relative inline-block mb-3">
                <span className="inline-block relative z-10 text-xs font-semibold tracking-widest text-indigo-300 uppercase after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-indigo-500/50">
                  Who We Are
                </span>
              </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300 animate-text-shine-slow">
                About Async Studios
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Empowering businesses to harness the power of AI for transformative growth. We craft bespoke AI agents, ensuring privacy and performance.
            </p>
            {/* Adjusted gradient bar */}
            <div className="flex justify-center mt-10">
              <div className="w-28 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/30"></div>
            </div>
          </div>

          {/* Mission Section (Adjusted colors and background) */}
          <div className="mb-28">
            <div className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-black/30 transition-all duration-500 hover:shadow-indigo-500/20"> 
              {/* Adjusted gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 opacity-50 transition-opacity duration-500 group-hover:opacity-80 rounded-3xl"></div>
              <div className="absolute inset-0 pattern-bg opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>

              <div className="relative p-8 md:p-12 lg:p-16">
                <h2 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-indigo-100"> 
                  Our Mission
                </h2>
                <p className="text-gray-300 mb-12 leading-relaxed text-lg max-w-3xl mx-auto text-center">
                  Our core mission is to empower your business by integrating cutting-edge AI solutions. We focus on optimizing performance, fostering sustainable growth, and are dedicated to the following key areas:
                </p>
                {/* Grid for Mission Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    // Changed teal to indigo
                    { text: "Educating businesses", detail: "Demystifying AI technologies and showcasing their transformative potential for organisations of all sizes", color: "indigo" },
                    { text: "Optimising performance", detail: "Creating tailored AI solutions that seamlessly integrate with existing workflows to enhance efficiency and productivity", color: "purple" },
                    { text: "Driving innovation", detail: "Leading the conversation about emerging AI technologies through industry talks, workshops, and collaborative partnerships", color: "blue" }
                  ].map((item, index) => (
                    <div key={index}
                         className={`group/item relative p-8 rounded-2xl bg-gray-900/60 border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:border-${item.color}-500/70 hover:shadow-xl hover:shadow-${item.color}-500/20 hover:-translate-y-1.5`}
                    >
                      <div className="flex items-center mb-5">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-${item.color}-500/15 border border-${item.color}-500/30 flex items-center justify-center mr-4 transition-all duration-300 group-hover/item:scale-105 group-hover/item:shadow-md group-hover/item:shadow-${item.color}-500/25`}>
                          <svg className={`w-5 h-5 text-${item.color}-300`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className={`text-xl font-semibold text-${item.color}-200`}>{item.text}</h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                      <div className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-${item.color}-500/40 opacity-0 group-hover/item:opacity-100 scale-75 group-hover/item:scale-100 transition-all duration-300`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Global Impact Section (Adjusted colors and background) */}
          <div className="mb-28">
             <div className="text-center mb-16">
                {/* Adjusted gradient */}
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-500 inline-block">
                  Global Reach, Local Expertise
                </h2>
             </div>
            <div className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-black/30 transition-all duration-500 hover:shadow-indigo-500/20"> 
              {/* Adjusted gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-50 transition-opacity duration-500 group-hover:opacity-80 rounded-3xl"></div>
              
              <div className="absolute inset-0 pattern-globe opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <div className="relative p-8 md:p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-gray-300 leading-relaxed text-lg space-y-5">
                    {/* Adjusted first letter color */}
                    <p className="first-letter:text-2xl first-letter:font-bold first-letter:text-indigo-300">
                      Founded in London, Async Studios is an emerging global AI consultancy with a vision to serve clients across diverse business environments.
                    </p>
                    <p>
                      We aspire to be thought leaders in the AI space, aiming to conduct workshops, speak at conferences, and publish insights on the latest developments in artificial intelligence. Our educational initiatives are designed to help organisations understand and implement AI strategies that can drive measurable business results.
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-4 border-t border-gray-800/50">
                      {[
                        { label: "Global Vision", description: "Aiming for worldwide impact with locally relevant solutions." },
                        { label: "Client-Focused", description: "Dedicated to building strong partnerships and delivering value." },
                        { label: "Emerging Solutions", description: "Pioneering innovative AI to meet future challenges." }
                      ].map((stat, index) => (
                        <div key={index} className="text-center p-2">
                          {/* Adjusted gradient for label */}
                          <div className="text-xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-blue-300 mb-1">{stat.label}</div>
                          <div className="text-gray-400 text-xs">{stat.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center items-center">
                    <div className="relative w-72 h-72 flex items-center justify-center">
                      {/* Adjusted glow gradient */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-blue-500/20 opacity-70 blur-2xl animate-pulse-slow"></div>
                      
                      {/* Orbital rings (Adjusted colors) */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-64 h-64">
                          {/* Changed teal to indigo */}
                          <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-spin-slow"></div> 
                          <div className="absolute inset-8 rounded-full border border-purple-500/30 animate-spin-reverse-slow"></div>
                          <div className="absolute inset-16 rounded-full border border-blue-500/30 animate-spin-slow" style={{ animationDuration: '25s' }}></div>
                        </div>
                      </div>
                      
                      <div className="relative w-64 h-64">
                        <ConnectionPoints /> {/* Uses updated colors */}
                        <GlobeParticles /> {/* Uses updated colors */}
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-40 h-40 rounded-full bg-gray-900/80 p-1 border border-gray-700/50 shadow-inner overflow-hidden">
                            {/* Adjusted globe background */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-500/30"></div> 
                            
                            <svg className="absolute inset-0 w-full h-full animate-spin-slow" style={{ animationDuration: '60s' }} viewBox="0 0 100 100" fill="none">
                              {/* Grid lines */}
                              <circle cx="50" cy="50" r="49" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                              <path d="M1,50 h98" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                              <path d="M50,1 v98" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                              <ellipse cx="50" cy="50" rx="49" ry="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" transform="rotate(0,50,50)" />
                              <ellipse cx="50" cy="50" rx="49" ry="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" transform="rotate(45,50,50)" />
                              <ellipse cx="50" cy="50" rx="49" ry="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" transform="rotate(90,50,50)" />
                              <ellipse cx="50" cy="50" rx="49" ry="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" transform="rotate(135,50,50)" />
                              
                              {/* Simplified continents in bright colors (Adjusted colors) */}
                              <path d="M40,20 Q45,25 50,20 Q60,15 55,25 Q65,30 60,35 Q55,45 45,40 Q40,30 40,20" fill="rgba(99, 102, 241, 0.6)" /> {/* North America (Indigo) */}
                              <path d="M65,45 Q70,50 75,45 Q80,50 75,55 Q70,60 65,55 Q60,50 65,45" fill="rgba(129,140,248,0.6)" /> {/* Europe */}
                              <path d="M70,65 Q75,60 80,65 Q85,70 80,75 Q75,80 70,75 Q65,70 70,65" fill="rgba(167,139,250,0.6)" /> {/* Australia (Purple) */}
                              <path d="M55,60 Q65,55 60,65 Q55,75 50,70 Q45,65 55,60" fill="rgba(245,158,11,0.5)" /> {/* Africa */}
                              <path d="M30,50 Q40,45 35,55 Q30,65 25,60 Q20,55 30,50" fill="rgba(59, 130, 246, 0.6)" /> {/* South America (Blue) */}
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

          {/* Values Section (Adjusted heading gradient and item colors) */}
          <div className="text-center mb-28">
            {/* Adjusted gradient */}
            <h2 className="text-4xl font-bold mb-16 inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-500">
              Our Core Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {coreValues.map((value, index) => {
                 // Determine the hover border color class based on textColor (now using indigo)
                const colorName = value.textColor.split('-')[1]; // e.g., 'indigo', 'purple', 'blue'
                const hoverBorderColorClass = `group-hover:border-${colorName}-500/50`;
                const shadowColorClass = `group-hover:shadow-${colorName}-500/30`; 
                const fromColorClass = value.bgColor.replace('bg-', 'from-').replace('/10','/15');
                
                return (
                  <div 
                    key={index} 
                    className="group relative p-8 rounded-2xl border border-gray-800/80 bg-gray-950/60 backdrop-blur-lg transition-all duration-300 ease-in-out hover:border-opacity-100 hover:shadow-xl hover:scale-[1.03] text-center"
                  >
                    <div 
                      className={`absolute -inset-px rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 ${hoverBorderColorClass} transition-opacity duration-300 pointer-events-none animate-pulse-border`}
                    ></div>
                    {/* Updated background glow */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${fromColorClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>

                    <div className="relative z-10">
                      {/* Uses updated border/bg/text colors from coreValues */}
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

          {/* Thought Leadership Section (Adjusted heading gradient and item colors) */}
          <div className="mb-28">
            {/* Adjusted gradient */}
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-500">
              Thought Leadership
            </h2>
            <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-black/30 p-8 md:p-12 lg:p-16">
                {/* Adjusted gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-transparent to-indigo-600/10 opacity-60 rounded-3xl"></div>
                 <div className="absolute inset-0 pattern-dots opacity-10"></div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                   {/* Uses updated border/text colors from leadershipItems */}
                  {leadershipItems.map((item, index) => (
                      <div key={index} className={`group relative p-6 rounded-xl border border-gray-700/50 bg-gray-950/50 backdrop-blur-md transition-all duration-300 ${item.hoverBorderColor} hover:bg-gray-900/70 hover:shadow-lg`}>
                          <h3 className={`text-xl font-semibold mb-3 ${item.textColor}`}>{item.title}</h3>
                          <p className="text-gray-400 text-base leading-relaxed">{item.description}</p>
                          {/* Adjusted gradient */}
                          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gray-600 group-hover:bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 scale-0 group-hover:scale-100"></div>
                      </div>
                  ))}
                </div>
            </div>
          </div>


          {/* Contact CTA (Adjusted background and button gradient) */}
          <div className="relative rounded-3xl overflow-hidden border border-gray-800 p-12 lg:p-16 max-w-5xl mx-auto bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-black/40">
             {/* Adjusted gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/15 via-purple-700/15 to-blue-700/15 opacity-60 animate-gradient-x pointer-events-none"></div>
            <div className="absolute inset-0 pattern-circuit opacity-5 pointer-events-none"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white leading-tight">Ready to Transform Your Business with AI?</h2>
              <p className="text-gray-300 text-lg mb-10 max-w-3xl mx-auto leading-relaxed">
                Let's discuss how our bespoke AI expertise can help optimise your operations, drive innovation, and achieve sustainable growth.
              </p>
              {/* Adjusted Button Gradient */}
              <button 
                onClick={() => scrollToSection('contact')}
                className="group relative inline-block px-10 py-5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white text-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-[0_0_25px] hover:shadow-purple-500/50 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-purple-500/40 overflow-hidden"
              >
                <span className="relative z-10 tracking-wide">Get in Touch</span>
                <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-in-out group-hover:left-[100%]"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* Updated CSS: Removed old gradients, added scan line, text shine, adjusted colors */}
      <style jsx global>{`
         /* Removed gradient-xy animation */
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 10s ease infinite;
           background-size: 200% 100%;
        }
         /* Removed text-gradient animation */
        
        /* Added text shine animation from blogs */
        @keyframes text-shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-text-shine-slow {
          background-size: 200% auto;
          animation: text-shine 4s linear infinite;
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
        
        /* Keep existing patterns */
        .pattern-bg {
          background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0.03) 75%, transparent 75%, transparent);
          background-size: 10px 10px;
        }
        .pattern-dots {
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 15px 15px;
        }
        .pattern-globe {
          background-image: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 40%), /* Blue */
                           radial-gradient(circle at 30% 70%, rgba(167, 139, 250, 0.03) 0%, transparent 30%), /* Purple */
                           radial-gradient(circle at 70% 30%, rgba(99, 102, 241, 0.03) 0%, transparent 30%); /* Indigo */
        }
        .pattern-circuit {
          background-image: url('/circuit-pattern.svg'); 
          background-repeat: repeat;
          background-size: 300px; 
        }

        @keyframes pulse-border {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.01); }
        }
        .animate-pulse-border {
          animation: pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Define root variables for colors (updated) */
        :root {
          --color-indigo: #818CF8; /* Example Indigo */
          --color-purple: #9F7AEA;
          --color-blue: #63B3ED;
        }
      `}</style>
    </main>
  );
} 