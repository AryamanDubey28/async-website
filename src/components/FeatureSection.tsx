'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import ParallaxSection from './ParallaxSection';

const features = [
  {
    id: 'skynet-chat',
    title: 'Skynet Chat',
    description: 'Advanced AI-powered chat platform that provides secure, private conversations with state-of-the-art language models.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    benefits: [
      'End-to-end encryption',
      'Custom knowledge integration',
      'Enterprise-ready deployment',
      'Seamless API integrations',
    ],
  },
  {
    id: 'skynet-agents',
    title: 'Skynet Agents',
    description: 'Autonomous AI agents customized for your specific business workflows, boosting productivity and eliminating repetitive tasks.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    benefits: [
      'Task automation',
      'Natural language interfaces',
      'Custom workflow design',
      'Secure data handling',
    ],
  },
];

const FeatureSection = () => {
  const [activeFeature, setActiveFeature] = useState('skynet-chat');

  return (
    <ParallaxSection speed={0.15} className="py-24 bg-gray-900 overflow-hidden relative">
      {/* Background decoration elements */}
      <div className="absolute top-40 -left-32 w-64 h-64 rounded-full bg-teal-500/5 blur-3xl"></div>
      <div className="absolute bottom-40 -right-32 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <ScrollAnimationWrapper animationVariant="fadeUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-200">Solutions</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Cutting-edge AI applications designed to transform your business with powerful, private, and customizable solutions.
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
                className={`relative group overflow-hidden rounded-2xl transition-all duration-500 hover-scale ${
                  activeFeature === feature.id 
                    ? 'border-2 border-teal-400/50 bg-gray-800/50' 
                    : 'border border-gray-800 bg-gray-900'
                }`}
                onMouseEnter={() => setActiveFeature(feature.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 p-8">
                  <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mb-6 text-teal-400 group-hover:bg-teal-400/10 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-gradient">{feature.title}</h3>
                  <p className="text-gray-400 mb-6">{feature.description}</p>
                  
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg 
                          className="h-6 w-6 mr-2 text-teal-400" 
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
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <button className="px-6 py-2 rounded-full border border-teal-400/20 text-teal-400 transition-all duration-300 hover:bg-teal-400/10 hover:border-teal-400/40 hover:px-8">
                      Learn more
                    </button>
                  </div>
                </div>
                
                {/* Corner gradient decoration */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-teal-400/20 to-transparent rounded-tl-3xl"></div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
};

export default FeatureSection; 