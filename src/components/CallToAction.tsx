'use client';

import { useState } from 'react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import ScrollRevealContainer from './ScrollRevealContainer';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Replace this URL with your Google Apps Script web app URL once deployed
      const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyfYKlfUNKgFgJ6_vvP01Pp9mKtOhh_39YY2zDA0s4h89Sc7SToyGQboa27RZSZzSw1Yw/exec';
      
      const formData = {
        email,
        name,
        message,
        timestamp: new Date().toISOString(),
      };
      
      const response = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'no-cors', // Required for Google Apps Script
      });
      
      setSubmitted(true);
      setEmail('');
      setName('');
      setMessage('');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="relative py-24 overflow-hidden">
      {/* Background elements - lighter */}
      <div className="absolute inset-0 bg-gray-900"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 via-purple-500/10 to-blue-600/15"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-20"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-500/15 via-purple-500/10 to-blue-600/15 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-600/15 via-blue-500/10 to-teal-500/15 rounded-full blur-3xl animate-pulse-slower"></div>

      {/* Animated floating elements - lighter */}
      <div className="absolute top-1/4 left-20 w-12 h-12 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-xl float-1 opacity-60 shadow-lg shadow-teal-500/10 backdrop-blur-sm border border-teal-400/20"></div>
      <div className="absolute bottom-1/4 right-20 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-teal-400/20 rounded-lg float-2 opacity-60 shadow-lg shadow-purple-500/10 backdrop-blur-sm border border-purple-400/20"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollAnimationWrapper animationVariant="fadeUp" delay={0.1}>
            <div className="inline-block relative mb-4">
              {/* Even more reduced glow on the heading */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-purple-400/10 rounded-lg blur-sm"></div>
              <h2 className="relative text-3xl md:text-4xl font-bold mb-6">
                Ready to transform your business with{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">
                  intelligent AI?
                </span>
              </h2>
            </div>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animationVariant="fadeUp" delay={0.2}>
            <p className="text-gray-300 text-lg mb-8">
              Get in touch with our team of AI experts to discuss how we can help your business leverage the power of artificial intelligence.
            </p>
          </ScrollAnimationWrapper>
          
          <ScrollRevealContainer direction="fromBottom" className="mb-8">
            <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-teal-500/20 shadow-xl shadow-teal-500/5 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300">
              {/* Tech grid lines for tech effect - lighter */}
              <div className="absolute inset-0 rounded-xl overflow-hidden opacity-15">
                <div className="absolute inset-0 bg-[radial-gradient(#4fd1c515_1px,transparent_1px)] [background-size:8px_8px] opacity-70"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#4fd1c508_50%,transparent_100%)] animate-scanner"></div>
              </div>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-3 rounded-lg bg-gray-800/60 backdrop-blur-sm border border-gray-700 text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/15 transition-all duration-300"
                    required
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="flex-grow px-4 py-3 rounded-lg bg-gray-800/60 backdrop-blur-sm border border-gray-700 text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/15 transition-all duration-300"
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message (optional)"
                    rows={3}
                    className="flex-grow px-4 py-3 rounded-lg bg-gray-800/60 backdrop-blur-sm border border-gray-700 text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/15 transition-all duration-300"
                  />
                  
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-purple-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400/30 overflow-hidden disabled:opacity-70 disabled:hover:scale-100"
                  >
                    <span className="relative z-10">
                      {loading ? 'Sending...' : 'Request a Demo'}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-center py-3 relative z-10">
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
                <div className="w-12 h-12 rounded-full bg-gray-800/60 backdrop-blur-sm flex items-center justify-center mr-3 border border-teal-400/20 shadow-lg shadow-teal-500/5">
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
                <div className="w-12 h-12 rounded-full bg-gray-800/60 backdrop-blur-sm flex items-center justify-center mr-3 border border-teal-400/20 shadow-lg shadow-teal-500/5">
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