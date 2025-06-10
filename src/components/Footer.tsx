'use client';
import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleAccordionToggle = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };
  
  return (
    <footer className="relative">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-gray-950 z-[-2]"></div> 
      {/* Subtle radial gradient overlay for depth (matches Hero) - Placed below other effects */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-gray-950/80 z-[-1]"></div>

      {/* Enhanced glass effect background with slightly more transparency */}
      <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-lg border-t border-gray-800/70 z-0"></div>
      
      {/* Top gradient overlay */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-gray-950 to-transparent z-0"></div>
      
      {/* Enhanced background decorations - Adjusted opacity */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-gradient-to-tr from-teal-500/15 via-purple-500/10 to-blue-600/15 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -top-20 right-1/3 w-96 h-96 bg-gradient-to-br from-purple-600/15 via-blue-500/10 to-teal-500/15 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-bl from-blue-600/10 via-teal-500/10 to-indigo-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
        
        {/* Enhanced animated scanner effects - Adjusted opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/10 to-transparent opacity-50 animate-scanner"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/8 to-transparent opacity-40 animate-scanner-vertical"></div>
      </div>
      
      {/* Enhanced tech pattern overlay - Adjusted opacity */}
      <div className="absolute inset-0 bg-[radial-gradient(#4fd1c510_1px,transparent_1px)] [background-size:14px_14px] opacity-20 z-0"></div>
      
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
                { name: 'linkedin', href: 'https://www.linkedin.com/company/async-studios/', icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { name: 'instagram', href: 'https://www.instagram.com/async_official/', icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" }
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:bg-teal-400/15 hover:border-teal-400/50 hover:scale-110 transform transition-all duration-300 shadow-lg shadow-teal-900/10"
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
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms of Service', href: '/terms-of-service' }
              ]
            }
          ].map((section, idx) => {
            const isOpen = openAccordion === section.title;
            return (
              <div key={idx}>
                <div
                  className="flex justify-between items-center mb-5 cursor-pointer md:cursor-auto md:mb-0"
                  onClick={() => handleAccordionToggle(section.title)}
                  role="button"
                  aria-expanded={isOpen}
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && handleAccordionToggle(section.title)}
                >
                  <h3 className="text-white font-semibold relative inline-block group md:mb-5">
                    {section.title}
                    <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-teal-400 to-transparent"></div>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></div>
                  </h3>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 md:hidden ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out md:max-h-full ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className="space-y-3 pt-2 md:pt-0">
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
              </div>
            )
          })}
        </div>
        
        {/* Newsletter section - REMOVED */}
        
        {/* Footer bottom section */}
        <div className="border-t border-gray-700/50 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © {currentYear} Async Studios. All rights reserved.
          </p>
          
          <div className="text-gray-400 text-sm text-center sm:text-right">
            A digital experiment gone right by{' '}
            <a 
              href="/" 
              target="_self" 
              rel="noopener noreferrer" 
              className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-teal-300 to-teal-200 hover:opacity-80 transition-opacity duration-200"
            >
              Async Studios
            </a>
            <br />
            <span className="text-xs text-gray-500">
              (Our pixels prefer more legroom; mobile is cool, but desktop is where the magic{' '}
              <strong className="font-semibold">really</strong>
              {' '}
              happens)
            </span>
          </div>
        </div>
        
        {/* Legal Links moved below */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {
            [
              { name: 'Privacy Policy', href: '/privacy-policy' }, 
              { name: 'Terms of Service', href: '/terms-of-service' },
              { name: 'Cookie Policy', href: '/privacy-policy#cookie-policy' },
              { name: 'Sitemap', href: '#' }
            ].map((item, i) => (
            <Link 
              key={i}
              href={item.href} 
              className="px-3 py-1.5 text-xs text-gray-300 hover:text-teal-400 transition-colors duration-200 relative group"
            >
              {item.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 