'use client';

import { useState } from 'react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import ScrollRevealContainer from './ScrollRevealContainer';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      // In a real application, you would send this to your backend
    }
  };

  return (
    <div id="contact" className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gray-900"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-purple-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-30"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollAnimationWrapper animationVariant="fadeUp" delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your business with{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-200">
                intelligent AI?
              </span>
            </h2>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animationVariant="fadeUp" delay={0.2}>
            <p className="text-gray-300 text-lg mb-8">
              Get in touch with our team of AI experts to discuss how we can help your business leverage the power of artificial intelligence.
            </p>
          </ScrollAnimationWrapper>
          
          <ScrollRevealContainer direction="fromBottom" className="mb-8">
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-400 text-gray-900 font-medium hover:shadow-lg hover:shadow-teal-500/20 hover:scale-105 transition-all duration-300"
                  >
                    Request a Demo
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-center py-3">
                  <svg className="w-6 h-6 text-teal-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-white">Thank you! We'll be in touch soon.</p>
                </div>
              )}
            </div>
          </ScrollRevealContainer>
          
          <ScrollAnimationWrapper animationVariant="fadeUp" delay={0.4}>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-400">Call us</div>
                  <div className="text-white">+1 (555) 123-4567</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-400">Email us</div>
                  <div className="text-white">info@asyncstudios.ai</div>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default CallToAction; 