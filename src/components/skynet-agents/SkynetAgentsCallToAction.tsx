'use client';
import { useState } from 'react';

export default function SkynetAgentsCallToAction() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required.');
      return;
    }
    if (!name) {
      setError('Full Name is required.');
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
        source: 'SkynetAgentsCallToAction',
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
    <section id="skynet-cta" className="pt-8 pb-20 relative">
      {/* Background decorations - Skynet Agents theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-gradient-to-br from-purple-600/15 via-indigo-500/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-gradient-to-tr from-indigo-600/15 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Card */}
          <div className="bg-gray-950/70 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-purple-500/30 shadow-2xl shadow-purple-500/10 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/25 via-indigo-500/20 to-transparent rounded-bl-3xl opacity-80"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-indigo-500/25 via-blue-500/20 to-transparent rounded-tr-3xl opacity-80"></div>
            
            {/* Tech pattern overlay - Adjusted for Agents theme */}
            <div className="absolute inset-0 bg-[radial-gradient(#805AD520_1px,transparent_1px)] [background-size:20px_20px] opacity-25"></div>
            
            {/* Animated scanner effect - Adjusted for Agents theme */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-50 animate-scanner-slow"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-gray-800/80 backdrop-blur-md border border-purple-500/40 mb-4 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/15">
                  <p className="text-sm font-medium text-purple-300 flex items-center">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-purple-400 mr-2.5 animate-pulse"></span>
                    Unlock Autonomous Power
                  </p>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
                  Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500">Automate</span> Your Enterprise?
                </h2>
                <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                  Discover how Skynet Agents can revolutionize your workflows, connect your systems, and execute tasks autonomously.
                </p>
              </div>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8 items-stretch">
                  {/* Form side */}
                  <div className="md:w-1/2">
                    <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/80 h-full shadow-xl shadow-gray-950/30">
                      <div className="space-y-5">
                        <div>
                          <label htmlFor="name-agents-cta" className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                          <input 
                            id="name-agents-cta" 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-800/70 border border-gray-600/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition-all duration-300" 
                            placeholder="e.g., Ada Lovelace" 
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email-agents-cta" className="block text-sm font-medium text-gray-300 mb-1.5">Work Email</label>
                          <input 
                            id="email-agents-cta" 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-800/70 border border-gray-600/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition-all duration-300" 
                            placeholder="ada@example.com" 
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="company-agents-cta" className="block text-sm font-medium text-gray-300 mb-1.5">Company Name</label>
                          <input 
                            id="company-agents-cta" 
                            type="text" 
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-800/70 border border-gray-600/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition-all duration-300" 
                            placeholder="Your Company Inc." 
                          />
                        </div>
                        <div>
                          <label htmlFor="message-agents-cta" className="block text-sm font-medium text-gray-300 mb-1.5">How can agents help you?</label>
                          <textarea 
                            id="message-agents-cta" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-800/70 border border-gray-600/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent h-28 transition-all duration-300" 
                            placeholder="Describe your automation goals..."></textarea>
                        </div>
                        {error && <p className="text-red-400 text-sm my-2">{error}</p>}
                        <div className="pt-4">
                          <button 
                            type="submit"
                            disabled={loading}
                            className="w-full group relative px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-400/50 overflow-hidden disabled:opacity-70 disabled:hover:scale-100"
                          >
                            <span className="relative z-10">
                              {loading ? 'Sending Request...' : 'Request a Consultation'}
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Info side - Adjusted for Skynet Agents */}
                  <div className="md:w-1/2 space-y-6">
                    <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl cursor-pointer border border-transparent hover:border-purple-500/30" onClick={() => window.location.href='mailto:admin@asyncstudios.co.uk'}>
                      <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-purple-500/25 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-100 font-semibold group-hover:text-purple-300 transition-colors duration-300 text-lg">Email Us</p>
                        <p className="text-gray-400">admin@asyncstudios.co.uk</p>
                      </div>
                    </div>

                    <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl cursor-pointer border border-transparent hover:border-teal-500/30" onClick={() => window.location.href='tel:02035761250'}>
                      <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-teal-500/25 flex items-center justify-center text-teal-300 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-100 font-semibold group-hover:text-teal-300 transition-colors duration-300 text-lg">Call Us</p>
                        <p className="text-gray-400">020 3576 1250</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-4 rounded-xl border border-transparent opacity-60 cursor-default">
                      <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-yellow-500/25 flex items-center justify-center text-yellow-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.846 5.671a1 1 0 00.95.69h5.969c.969 0 1.371 1.24.588 1.81l-4.823 3.522a1 1 0 00-.364 1.118l1.846 5.671c.3.921-.755 1.688-1.54 1.118l-4.823-3.522a1 1 0 00-1.176 0l-4.823 3.522c-.784.57-1.838-.197-1.539-1.118l1.846-5.671a1 1 0 00-.364-1.118L2.487 11.1c-.783-.57-.38-1.81.588-1.81h5.969a1 1 0 00.95-.69L11.049 2.927z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-100 font-semibold text-lg">Success Stories</p>
                        <p className="text-gray-400">Explore our impactful case studies. Coming soon!</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-gray-800/80 backdrop-blur-md border border-gray-700/80 text-gray-300 shadow-md">
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-purple-400 mr-3 animate-pulse"></span>
                        <span>Join the Autonomous Revolution</span>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center py-16">
                  <svg className="w-16 h-16 text-purple-400 mx-auto mb-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="text-2xl font-semibold text-white mb-3">Thank You for Your Interest!</h3>
                  <p className="text-gray-300 max-w-md mx-auto">Our team has received your consultation request and will be in touch with you shortly to discuss how Skynet Agents can empower your enterprise.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 