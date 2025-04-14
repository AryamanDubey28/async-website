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
            Empowering businesses to harness the power of AI for transformative growth
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
                    At Async Studios, our mission is to help businesses incorporate powerful AI solutions that optimize performance and drive sustainable growth. Based in London but operating worldwide, we're dedicated to:
                  </p>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center mr-3 mt-1">
                        <svg className="w-4 h-4 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span><span className="font-semibold text-teal-300">Educating businesses</span> — Demystifying AI technologies and showcasing their transformative potential for organizations of all sizes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center mr-3 mt-1">
                        <svg className="w-4 h-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span><span className="font-semibold text-purple-300">Optimizing performance</span> — Creating tailored AI solutions that seamlessly integrate with existing workflows to enhance efficiency and productivity</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-400/20 flex items-center justify-center mr-3 mt-1">
                        <svg className="w-4 h-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span><span className="font-semibold text-blue-300">Driving innovation</span> — Leading the conversation about emerging AI technologies through industry talks, workshops, and collaborative partnerships</span>
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

          {/* Global Impact Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">
              Global Reach, Local Expertise
            </h2>
            <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-2xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Founded in London, Async Studios has quickly grown into a global AI consultancy with clients spanning multiple continents. Our team combines local market insights with cutting-edge technical expertise to deliver solutions that resonate with diverse business environments.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    We pride ourselves on being thought leaders in the AI space, regularly conducting workshops, speaking at conferences, and publishing insights on the latest developments in artificial intelligence. Our educational initiatives have helped countless organizations understand and implement AI strategies that drive measurable business results.
                  </p>
                </div>
                <div className="relative h-64 md:h-auto rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-purple-500/20 to-blue-600/20 rounded-xl"></div>
                  <div className="h-full flex items-center justify-center p-6">
                    <Image
                      src="/global-impact.png"
                      alt="Global Impact"
                      width={400}
                      height={300}
                      className="object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center mb-24">
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Innovation Leadership</h3>
                  <p className="text-gray-400">We continuously explore the cutting edge of AI to bring transformative solutions that keep our clients ahead of the competition.</p>
                </div>
              </div>
              
              {/* Value 2 */}
              <div className="relative p-6 rounded-xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm group hover:border-purple-500/50 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-2 border-purple-400/70 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Business Transformation</h3>
                  <p className="text-gray-400">We focus on delivering measurable business impact, not just implementing technology for technology's sake.</p>
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
                  <h3 className="text-xl font-bold mb-3 text-white">Educational Empowerment</h3>
                  <p className="text-gray-400">We believe in demystifying AI through education, enabling our clients to make informed decisions about their technological future.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Thought Leadership Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">
              Thought Leadership
            </h2>
            <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-teal-500/10 rounded-2xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
                <div className="relative p-6 rounded-xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm hover:border-teal-500/30 transition-colors duration-300">
                  <h3 className="text-xl font-bold mb-3 text-white">Conference Speakers</h3>
                  <p className="text-gray-400 mb-4">Our team regularly presents at leading technology conferences, sharing insights on practical AI implementation strategies.</p>
                </div>
                <div className="relative p-6 rounded-xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm hover:border-purple-500/30 transition-colors duration-300">
                  <h3 className="text-xl font-bold mb-3 text-white">AI Workshops</h3>
                  <p className="text-gray-400 mb-4">We conduct hands-on workshops to help businesses understand and leverage the latest AI technologies for their specific needs.</p>
                </div>
                <div className="relative p-6 rounded-xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm hover:border-blue-500/30 transition-colors duration-300">
                  <h3 className="text-xl font-bold mb-3 text-white">Industry Publications</h3>
                  <p className="text-gray-400 mb-4">Our research and case studies are regularly featured in leading industry publications, contributing to the broader AI discourse.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Founders Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">
              Our Founders
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
                <p className="text-teal-400 mb-2">Head of AI Strategy</p>
                <p className="text-gray-400 text-center max-w-xs">Visionary leader guiding businesses through the complexities of AI adoption and implementation.</p>
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
                <p className="text-purple-400 mb-2">Business Transformation Lead</p>
                <p className="text-gray-400 text-center max-w-xs">Expert in leveraging AI technologies to drive organizational change and business growth.</p>
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
                <p className="text-blue-400 mb-2">Product Officer</p>
                <p className="text-gray-400 text-center max-w-xs">Bridges the gap between business requirements and technical solutions to craft impactful AI products.</p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 p-10 max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-blue-500/10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#4fd1c520_1px,transparent_1px)] [background-size:8px_8px] opacity-70"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your business with AI?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Let's discuss how our AI expertise can help optimize your operations and drive growth.</p>
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