'use client';

export default function SkynetAgentsCallToAction() {
  return (
    <section className="pt-8 pb-20 relative">
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
              
              <div className="flex flex-col md:flex-row gap-8 items-stretch">
                {/* Form side */}
                <div className="md:w-1/2">
                  <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/80 h-full shadow-xl shadow-gray-950/30">
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="name-agents-cta" className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                        <input id="name-agents-cta" type="text" className="w-full px-4 py-2.5 rounded-lg bg-gray-800/70 border border-gray-600/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition-all duration-300" placeholder="e.g., Ada Lovelace" />
                      </div>
                      <div>
                        <label htmlFor="email-agents-cta" className="block text-sm font-medium text-gray-300 mb-1.5">Work Email</label>
                        <input id="email-agents-cta" type="email" className="w-full px-4 py-2.5 rounded-lg bg-gray-800/70 border border-gray-600/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition-all duration-300" placeholder="ada@example.com" />
                      </div>
                      <div>
                        <label htmlFor="company-agents-cta" className="block text-sm font-medium text-gray-300 mb-1.5">Company Name</label>
                        <input id="company-agents-cta" type="text" className="w-full px-4 py-2.5 rounded-lg bg-gray-800/70 border border-gray-600/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent transition-all duration-300" placeholder="Your Company Inc." />
                      </div>
                      <div>
                        <label htmlFor="message-agents-cta" className="block text-sm font-medium text-gray-300 mb-1.5">How can agents help you?</label>
                        <textarea id="message-agents-cta" className="w-full px-4 py-2.5 rounded-lg bg-gray-800/70 border border-gray-600/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-transparent h-28 transition-all duration-300" placeholder="Describe your automation goals..."></textarea>
                      </div>
                      <div className="pt-4">
                        <button className="w-full group relative px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-400/50 overflow-hidden">
                          <span className="relative z-10">Request a Consultation</span>
                          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Info side - Adjusted for Skynet Agents */}
                <div className="md:w-1/2 space-y-6">
                  <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl cursor-pointer border border-transparent hover:border-purple-500/30">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-purple-500/25 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-100 font-semibold group-hover:text-purple-300 transition-colors duration-300 text-lg">Get in Touch</p>
                      <p className="text-gray-400">agents-inquiries@asyncstudios.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl cursor-pointer border border-transparent hover:border-indigo-500/30">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-indigo-500/25 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-100 font-semibold group-hover:text-indigo-300 transition-colors duration-300 text-lg">Book a Live Demo</p>
                      <p className="text-gray-400">See Skynet Agents in action with your use case</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group transition-all duration-300 hover:bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl cursor-pointer border border-transparent hover:border-blue-500/30">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-500/25 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m0 0A2.25 2.25 0 0014.25 20H17a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h2.75a2.25 2.25 0 002.25-2.25zM12 6.253V5M12 6.253A2.25 2.25 0 019.75 4H7M14.25 4H12a2.25 2.25 0 00-2.25 2.253" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-100 font-semibold group-hover:text-blue-300 transition-colors duration-300 text-lg">API & SDK Docs</p>
                      <p className="text-gray-400">Integrate and extend with our developer tools</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-gray-800/80 backdrop-blur-md border border-gray-700/80 text-gray-300 shadow-md">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-purple-400 mr-3 animate-pulse"></span>
                      <span>Join the Autonomous Revolution</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 