'use client';

export default function SkynetChatCallToAction() {
  // Testimonials data - could be moved to a prop or fetched if dynamic
  const testimonials = [
    { name: 'Alex Chen', title: 'Content Director', quote: 'Skynet Chat has transformed how our team creates content. The AI assistance is like having an expert collaborator for every project.' },
    { name: 'Sarah Johnson', title: 'Tech Lead', quote: 'The code assistance is remarkable. It helps our developers document and optimize code faster than ever before.' },
    { name: 'Michael Torres', title: 'Product Manager', quote: 'Having the entire system deployed within our infrastructure gives us the security we need while still leveraging cutting-edge AI.' },
    { name: 'Priya Patel', title: 'Marketing Strategist', quote: 'The memory feature is game-changing. It learns our brand voice and applies it consistently across all content.' },
    { name: 'James Wilson', title: 'CTO', quote: 'Being able to customize the underlying AI model gives us exactly the right balance of performance and cost efficiency.' }
  ];

  return (
    <section className="py-20 relative">
      {/* Background decorations - Enhanced with more vibrancy */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-500/10 via-purple-500/8 to-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-600/10 via-blue-500/8 to-teal-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Stats section above CTA */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: '100%', label: 'Private & Secure', icon: 'shield' },
              { value: '24/7', label: 'AI Assistance', icon: 'chat' },
              { value: '90%', label: 'Time Savings', icon: 'clock' },
              { value: '5x', label: 'Productivity Boost', icon: 'lightning' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-4 border border-teal-500/20 shadow-lg shadow-teal-500/5 text-center transform hover:scale-105 transition-all duration-300 hover:border-teal-400/40 group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-800/80 flex items-center justify-center">
                  {stat.icon === 'shield' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400 group-hover:text-teal-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                  {stat.icon === 'chat' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  )}
                  {stat.icon === 'clock' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {stat.icon === 'lightning' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
          
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
              
              <div className="flex flex-col md:flex-row gap-8 items-stretch">
                {/* Form side */}
                <div className="md:w-1/2">
                  <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-6 border border-gray-700 h-full">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                        <input type="text" className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input type="email" className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent" placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                        <input type="text" className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent" placeholder="Your company" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                        <textarea className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent h-24" placeholder="Tell us about your needs"></textarea>
                      </div>
                      <div className="pt-4">
                        <button className="w-full group relative px-8 py-4 rounded-lg bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-400/50 overflow-hidden">
                          <span className="relative z-10">Send Message</span>
                          <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Info side */}
                <div className="md:w-1/2 space-y-6">
                  <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/30 p-4 rounded-lg cursor-pointer">
                    <div className="flex-shrink-0 h-12 w-12 rounded-md bg-teal-400/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-200 font-medium group-hover:text-teal-300 transition-colors duration-300">Contact Us</p>
                      <p className="text-gray-400">info@asyncstudios.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/30 p-4 rounded-lg cursor-pointer">
                    <div className="flex-shrink-0 h-12 w-12 rounded-md bg-purple-400/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-200 font-medium group-hover:text-purple-300 transition-colors duration-300">Schedule a Demo</p>
                      <p className="text-gray-400">See how Skynet Chat works in real-time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/30 p-4 rounded-lg cursor-pointer">
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
              </div>
            </div>
          </div>
          
          {/* Testimonials ticker */}
          <div className="mt-20 overflow-hidden">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white">What Our Users Say</h3>
            </div>
            
            <div className="relative">
              {/* Gradient overlays for smooth scrolling effect */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
              
              <div className="flex gap-6 animate-ticker">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="flex-shrink-0 w-80 bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                    <div className="text-gray-300 italic mb-4">"{testimonial.quote}"</div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 flex items-center justify-center text-white font-medium">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-medium">{testimonial.name}</div>
                        <div className="text-gray-400 text-sm">{testimonial.title}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 