'use client';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative mt-20">
      {/* Enhanced glass effect background with deeper transparency */}
      <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-lg border-t border-gray-800/80 z-0"></div>
      
      {/* Enhanced top gradient overlay */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-gray-900 to-transparent z-0"></div>
      
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-gradient-to-tr from-teal-500/10 via-purple-500/10 to-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 right-1/3 w-96 h-96 bg-gradient-to-br from-purple-600/10 via-blue-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-bl from-blue-600/5 via-teal-500/5 to-indigo-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Enhanced animated scanner effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/8 to-transparent opacity-60 animate-scanner"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/5 to-transparent opacity-50 animate-scanner-vertical"></div>
      </div>
      
      {/* Enhanced tech pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#4fd1c515_1px,transparent_1px)] [background-size:14px_14px] opacity-30 z-0"></div>
      
      {/* Content with higher z-index */}
      <div className="container mx-auto px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          <div className="space-y-5">
            <div className="text-3xl font-bold relative inline-block group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-teal-300 to-teal-200">
                Async Studios
              </span>
              <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-teal-400 to-transparent"></div>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></div>
            </div>
            <p className="text-gray-300 max-w-xs text-sm leading-relaxed">
              AI Agents. Private. Built for you. We help businesses harness the power of AI with custom solutions that transform operations and drive innovation.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { name: 'twitter', icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
                { name: 'linkedin', icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { name: 'github', icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" },
                { name: 'instagram', icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" }
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800/90 backdrop-blur-sm border border-gray-700/60 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:bg-teal-400/10 hover:border-teal-400/40 hover:scale-110 transform transition-all duration-300 shadow-lg shadow-teal-900/5"
                  aria-label={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          {[
            {
              title: "Solutions",
              links: [
                { name: 'Skynet Chat', href: '/skynet-chat' },
                { name: 'Skynet Agents', href: '/skynet-agents' },
                { name: 'Custom Development', href: '/#services' },
                { name: 'Enterprise AI', href: '/#services' }
              ]
            },
            {
              title: "Company",
              links: [
                { name: 'About', href: '/about' },
                { name: 'Blog', href: '/blogs' },
                { name: 'Contact', href: '/#contact' }
              ]
            },
            {
              title: "Legal",
              links: [
                { name: 'Privacy Policy', href: '#' },
                { name: 'Terms of Service', href: '#' }
              ]
            }
          ].map((section, idx) => (
            <div key={idx}>
              <h3 className="text-white font-semibold mb-5 relative inline-block group">
                {section.title}
                <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-teal-400 to-transparent"></div>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></div>
              </h3>
              <ul className="space-y-3">
                {section.links.map((item) => (
                  <li key={item.name}>
                    {item.href === '#' ? (
                      <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-200 group flex items-center">
                        <span className="inline-block mr-2 text-teal-500 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">›</span>
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </a>
                    ) : (
                      <Link href={item.href} className="text-gray-300 hover:text-teal-400 transition-colors duration-200 group flex items-center">
                        <span className="inline-block mr-2 text-teal-500 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">›</span>
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter section - New addition */}
        <div className="mt-16 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="max-w-md">
              <h3 className="text-xl font-semibold text-white mb-3">Join our newsletter</h3>
              <p className="text-gray-400 text-sm">Stay updated with our latest news, articles, and product updates. No spam, we promise.</p>
            </div>
            <div className="lg:w-1/2">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800/70 backdrop-blur-sm text-gray-200 placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-500 text-white font-medium rounded-lg px-6 py-2.5 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-300 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Footer bottom section */}
        <div className="border-t border-gray-700/50 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Async Studios. All rights reserved.
          </p>
          
          <div className="mt-6 sm:mt-0 flex flex-wrap justify-center gap-2">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((item, i) => (
              <a 
                key={i}
                href="#" 
                className="px-3 py-1.5 text-xs text-gray-300 hover:text-teal-400 transition-colors duration-200 relative group"
              >
                {item}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 