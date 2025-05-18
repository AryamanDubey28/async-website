'use client';

import { useState, useEffect, useRef } from 'react';

export default function SkynetChatCallToAction() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Testimonials data - could be moved to a prop or fetched if dynamic
  const testimonials = [
    { name: 'Alex Chen', title: 'Content Director', quote: 'Skynet Chat has transformed how our team creates content. The AI assistance is like having an expert collaborator for every project.' },
    { name: 'Sarah Johnson', title: 'Tech Lead', quote: 'The code assistance is remarkable. It helps our developers document and optimize code faster than ever before.' },
    { name: 'Michael Torres', title: 'Product Manager', quote: 'Having the entire system deployed within our infrastructure gives us the security we need while still leveraging cutting-edge AI.' },
    { name: 'Priya Patel', title: 'Marketing Strategist', quote: 'The memory feature is game-changing. It learns our brand voice and applies it consistently across all content.' },
    { name: 'James Wilson', title: 'CTO', quote: 'Being able to customize the underlying AI model gives us exactly the right balance of performance and cost efficiency.' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbw0jX72GcNKB23nTZAkBC6EzGfniQFOMmWvONXW707FbDAgrhITcBGQgbe9HsGCwHtvsA/exec';
      
      const formData = {
        name,
        email,
        company,
        message,
        timestamp: new Date().toISOString(),
        source: 'SkynetChatCallToAction',
      };
      
      const response = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'no-cors', 
      });
      
      setSubmitted(true);
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="skynet-cta-section" className="py-20 relative">
      {/* Background decorations - Enhanced with more vibrancy */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-500/10 via-purple-500/8 to-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-600/10 via-blue-500/8 to-teal-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Stats section above CTA - REMOVED */}
          
          {/* Main CTA Card */}
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-teal-500/20 shadow-xl shadow-teal-500/5 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-teal-400/20 via-purple-400/15 to-transparent rounded-bl-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-400/20 via-teal-400/15 to-transparent rounded-tr-3xl"></div>
            
            {/* Tech pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#4fd1c515_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
            
            {/* Animated scanner effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/5 to-transparent opacity-30 animate-scanner"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-gray-800/70 backdrop-blur-lg border border-teal-500/30 mb-3">
                  <p className="text-sm font-medium text-teal-300 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                    Limited Early Access Available
                  </p>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">Transform</span> Your Workflow?
                </h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Join innovative companies already using Skynet Chat to enhance their content creation and collaboration.
                </p>
              </div>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8 items-stretch">
                  {/* Form side */}
                  <div className="md:w-1/2">
                    <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 border border-gray-700 h-full">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name-skynet-cta" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                          <input 
                            id="name-skynet-cta"
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent" 
                            placeholder="Your name" 
                          />
                        </div>
                        <div>
                          <label htmlFor="email-skynet-cta" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                          <input 
                            id="email-skynet-cta"
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent" 
                            placeholder="your@email.com" 
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="company-skynet-cta" className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                          <input 
                            id="company-skynet-cta"
                            type="text" 
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent" 
                            placeholder="Your company" 
                          />
                        </div>
                        <div>
                          <label htmlFor="message-skynet-cta" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                          <textarea 
                            id="message-skynet-cta"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent h-24" 
                            placeholder="Tell us about your needs"
                          ></textarea>
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <div className="pt-4">
                          <button 
                            type="submit"
                            disabled={loading}
                            className="w-full group relative px-8 py-4 rounded-lg bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-400/50 overflow-hidden disabled:opacity-70 disabled:hover:scale-100"
                          >
                            <span className="relative z-10">
                              {loading ? 'Sending...' : 'Send Message'}
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Info side */}
                  <div className="md:w-1/2 space-y-6">
                    <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/30 p-4 rounded-lg cursor-pointer" onClick={() => window.location.href='mailto:contact@asyncstudios.co.uk'}>
                      <div className="flex-shrink-0 h-12 w-12 rounded-md bg-teal-400/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-200 font-medium group-hover:text-teal-300 transition-colors duration-300">Email Us</p>
                        <p className="text-gray-400">contact@asyncstudios.co.uk</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/30 p-4 rounded-lg cursor-pointer" onClick={() => window.location.href='tel:02035761250'}>
                      <div className="flex-shrink-0 h-12 w-12 rounded-md bg-purple-400/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-200 font-medium group-hover:text-purple-300 transition-colors duration-300">Call Us</p>
                        <p className="text-gray-400">020 3576 1250</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/30 p-4 rounded-lg cursor-pointer" onClick={() => window.location.href = '#'}>
                      <div className="flex-shrink-0 h-12 w-12 rounded-md bg-green-400/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-200 font-medium group-hover:text-green-300 transition-colors duration-300">Explore Use Cases</p>
                        <p className="text-gray-400">Discover applications for your industry</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/30 p-4 rounded-lg cursor-pointer" onClick={() => window.location.href = '#'}>
                      <div className="flex-shrink-0 h-12 w-12 rounded-md bg-blue-400/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-200 font-medium group-hover:text-blue-300 transition-colors duration-300">Documentation</p>
                        <p className="text-gray-400">Explore our technical guides</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/70 backdrop-blur-sm border border-gray-700 text-gray-300">
                        <span className="inline-block w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                        <span>Limited early access program</span>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center py-10">
                  <svg className="w-12 h-12 text-teal-400 mx-auto mb-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-xl text-white">Thank you! We'll be in touch soon.</p>
                  <p className="text-gray-400 mt-2">Your message has been sent successfully.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Testimonials ticker - REMOVED */}
        </div>
      </div>
    </section>
  );
} 