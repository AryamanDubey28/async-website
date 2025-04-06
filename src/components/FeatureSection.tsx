'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import ParallaxSection from './ParallaxSection';
import Link from 'next/link';

const features = [
  {
    id: 'skynet-chat',
    title: 'Skynet Chat',
    description: 'Your Data. Your AI. Your Control. Deploy the powerful, insightful Skynet Chat directly on your cloud. Answer complex questions, automate support, and handle sensitive data with confidence.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    benefits: [
      'Secure private cloud deployment',
      'Confidential data handling',
      'Powerful AI Q&A capabilities',
      'Automated support workflows',
    ],
  },
  {
    id: 'skynet-agents',
    title: 'Skynet Agents',
    description: 'Agent Power. Custom Built. Problems Solved. Leverage our adaptable Skynet Agents, refinable for your specific operational needs. Automate specialist workflows and enhance core processes.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    benefits: [
      'Autonomous Task Execution',
      'Custom-Engineered Logic',
      'Seamless Workflow Integration',
      'Adaptive Performance Tuning',
    ],
  },
];

const FeatureSection = () => {
  const [activeFeature, setActiveFeature] = useState('skynet-chat');

  return (
    <ParallaxSection speed={0.15} className="py-24 bg-gray-900 overflow-hidden relative">
      {/* Background decoration elements */}
      <div className="absolute top-40 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-teal-500/15 via-purple-500/10 to-blue-600/15 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-600/15 via-blue-500/10 to-teal-500/15 blur-3xl animate-pulse-slower"></div>
      
      {/* Additional floating elements - lighter */}
      <div className="absolute top-1/4 left-20 w-12 h-12 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-xl float-1 opacity-60 shadow-lg shadow-teal-500/10 backdrop-blur-sm border border-teal-400/20"></div>
      <div className="absolute bottom-1/4 right-20 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-teal-400/20 rounded-lg float-2 opacity-60 shadow-lg shadow-purple-500/10 backdrop-blur-sm border border-purple-400/20"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <ScrollAnimationWrapper animationVariant="fadeUp" className="text-center mb-16">
          <div className="inline-block relative mb-4">
            {/* Even more reduced glow on the heading */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-purple-400/10 rounded-lg blur-sm"></div>
            <h2 className="relative text-3xl md:text-4xl font-bold">
              Our AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">Solutions</span>
            </h2>
          </div>
          <p className="text-gray-300 max-w-3xl mx-auto">
          Beyond standard AI: Powerful, private solutions engineered for your specific business needs.
          </p>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {features.map((feature, index) => (
            <ScrollAnimationWrapper
              key={feature.id}
              animationVariant={index % 2 === 0 ? "fadeRight" : "fadeLeft"}
              delay={0.2 * index}
            >
              <div 
                className={`relative group overflow-hidden rounded-2xl transition-all duration-500 hover-scale backdrop-blur-xl ${
                  activeFeature === feature.id 
                    ? 'border-2 border-teal-400/30 bg-gray-800/80 shadow-xl shadow-teal-500/10' 
                    : 'border border-teal-500/20 bg-gray-900/80 shadow-lg shadow-teal-500/5'
                }`}
                onMouseEnter={() => setActiveFeature(feature.id)}
              >
                {/* Soft gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-purple-500/5 to-blue-600/10 opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>
                
                {/* Glass-like overlay for better readability */}
                <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/40"></div>
                
                <div className="relative z-10 p-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-purple-500/20 flex items-center justify-center mb-6 text-teal-400 group-hover:from-teal-500/30 group-hover:to-purple-500/30 transition-colors duration-300 border border-teal-400/20 group-hover:scale-110 transform transition-transform duration-300 shadow-md shadow-teal-500/10">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:via-purple-400 group-hover:to-blue-500">{feature.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                  
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-teal-500/30 to-purple-500/30 flex items-center justify-center mr-3 shadow-sm shadow-teal-500/10">
                          <svg 
                            className="h-4 w-4 text-teal-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M5 13l4 4L19 7" 
                            />
                          </svg>
                        </span>
                        <span className="text-gray-200">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Link
                      href={`/${feature.id}`}
                      className="group relative px-6 py-2 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400/50 overflow-hidden">
                      <span className="relative z-10">Learn more</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    </Link>
                  </div>
                </div>
                
                {/* Subtle corner gradient decoration */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-teal-400/10 via-purple-400/5 to-transparent rounded-tl-3xl"></div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
};

export default FeatureSection; 