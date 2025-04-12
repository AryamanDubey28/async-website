'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state for animation timing
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className={`container mx-auto transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">
              About Async Studios
            </span>
          </h1>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12 text-lg">
            We build private, custom AI agents that solve real business challenges
          </p>
          <div className="flex justify-center mb-16">
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-300 rounded-full"></div>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 via-transparent to-purple-500/10 rounded-2xl"></div>
                <div className="relative p-8">
                  <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-200">
                    Our Mission
                  </h2>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    At Async Studios, our mission is to help businesses close the AI gap and seamlessly integrate artificial intelligence into their existing workflows. We believe that:
                  </p>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center mr-3 mt-1">
                        <svg className="w-4 h-4 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span><span className="font-semibold text-teal-300">Every business can benefit from AI</span> — Regardless of your industry or current tech stack, we can create custom AI solutions that deliver real value</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center mr-3 mt-1">
                        <svg className="w-4 h-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span><span className="font-semibold text-purple-300">Workflow integration is essential</span> — AI tools should enhance your existing processes, not force you to rebuild them from scratch</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-400/20 flex items-center justify-center mr-3 mt-1">
                        <svg className="w-4 h-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span><span className="font-semibold text-blue-300">Privacy and security cannot be compromised</span> — Your sensitive data deserves protection at every stage of AI implementation</span>
                    </li>
                  </ul>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.1)_25%,rgba(68,68,68,0.1)_50%,transparent_50%,transparent_75%,rgba(68,68,68,0.1)_75%)] bg-[length:8px_8px]"></div>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-purple-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-lg flex items-center justify-center">
                  <Image
                    src="/mission.png"
                    alt="Our Mission"
                    width={320}
                    height={320}
                    className="object-contain p-8"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/5 to-transparent animate-scanner-vertical"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-12 inline-block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">
              Our Core Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="relative p-6 rounded-xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm group hover:border-teal-500/50 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-2 border-teal-400/70 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Privacy First</h3>
                  <p className="text-gray-400">We design our systems with privacy as a foundational principle, not an afterthought. Your data remains yours.</p>
                </div>
              </div>
              
              {/* Value 2 */}
              <div className="relative p-6 rounded-xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm group hover:border-purple-500/50 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-2 border-purple-400/70 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Continuous Innovation</h3>
                  <p className="text-gray-400">We stay at the forefront of AI research, constantly refining our approach to deliver state-of-the-art solutions.</p>
                </div>
              </div>
              
              {/* Value 3 */}
              <div className="relative p-6 rounded-xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm group hover:border-blue-500/50 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-2 border-blue-400/70 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Client Partnership</h3>
                  <p className="text-gray-400">We don't just build and leave. We form lasting partnerships, ensuring our agents evolve with your business needs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">
              Our Team
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full relative mb-4 overflow-hidden border-2 border-teal-500/30 bg-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20"></div>
                  <div className="flex items-center justify-center h-full">
                    <span className="text-4xl text-teal-400">AD</span>
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#4fd1c510_50%,transparent_100%)] animate-scanner"></div>
                </div>
                <h3 className="text-xl font-bold mb-1">Aryaman Dubey</h3>
                <p className="text-teal-400 mb-2">Founder & CEO</p>
                <p className="text-gray-400 text-center max-w-xs">Expert in AI systems with a passion for bringing cutting-edge technology to businesses.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full relative mb-4 overflow-hidden border-2 border-purple-500/30 bg-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                  <div className="flex items-center justify-center h-full">
                    <span className="text-4xl text-purple-400">ZM</span>
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#805ad510_50%,transparent_100%)] animate-scanner"></div>
                </div>
                <h3 className="text-xl font-bold mb-1">Zinedine Messaoudi</h3>
                <p className="text-purple-400 mb-2">Chief Technology Officer</p>
                <p className="text-gray-400 text-center max-w-xs">ML engineer specializing in enterprise AI integration and workflow optimization.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full relative mb-4 overflow-hidden border-2 border-blue-500/30 bg-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-500/20"></div>
                  <div className="flex items-center justify-center h-full">
                    <span className="text-4xl text-blue-400">SG</span>
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#4299e110_50%,transparent_100%)] animate-scanner"></div>
                </div>
                <h3 className="text-xl font-bold mb-1">Shaan Ganimusa</h3>
                <p className="text-blue-400 mb-2">Head of Client Solutions</p>
                <p className="text-gray-400 text-center max-w-xs">Transforms business requirements into effective AI implementations that drive results.</p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 p-10 max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-blue-500/10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#4fd1c520_1px,transparent_1px)] [background-size:8px_8px] opacity-70"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to build your custom AI solution?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Let's discuss how our AI agents can address your specific business challenges.</p>
              <a href="#contact" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400/50">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 