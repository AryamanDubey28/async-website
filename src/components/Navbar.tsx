'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Products', 
      path: '#',
      isDropdown: true,
      dropdownItems: [
        { name: 'Skynet Chat', path: '/skynet-chat' },
        { name: 'Skynet Agents', path: '/skynet-agents' }
      ]
    },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-gray-900/90 backdrop-blur-md border-b border-gray-800' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-200">
            Async Studios
          </span>
        </Link>

        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.isDropdown ? (
                <>
                  <button
                    className="relative text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    {item.name}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 ml-1 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  
                  {/* Dropdown menu */}
                  <div 
                    className={`absolute top-full left-0 mt-1 bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-lg shadow-xl transition-all duration-200 ease-out origin-top-left w-64 ${
                      productsOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <div className="py-3">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link 
                          key={dropdownItem.name} 
                          href={dropdownItem.path}
                          className="flex items-center whitespace-nowrap px-5 py-3 text-sm text-gray-300 hover:bg-gray-800/80 hover:text-teal-300 transition-all duration-200 nav-dropdown-item relative group/item overflow-hidden"
                        >
                          <span className="w-5 h-5 mr-3 text-teal-400 transition-transform duration-200 group-hover/item:scale-110">
                            {dropdownItem.name === 'Skynet Chat' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3v19"></path>
                                <path d="M5 8l7-5 7 5"></path>
                                <path d="M5 16l7 5 7-5"></path>
                              </svg>
                            )}
                          </span>
                          <div className="flex flex-col flex-grow transition-transform duration-200 group-hover/item:translate-x-1">
                            <span className="font-medium">{dropdownItem.name}</span>
                            <span className="text-xs text-gray-400 mt-0.5 group-hover/item:text-teal-400/70 transition-colors duration-200">
                              {dropdownItem.name === 'Skynet Chat' ? 'Conversational AI assistant' : 'Autonomous AI agents'}
                            </span>
                            <span className="h-px w-0 bg-teal-400 mt-1 transition-all duration-300 group-hover/item:w-full"></span>
                          </div>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                          <span className="absolute left-0 w-1 h-0 bg-teal-400 rounded-r transition-all duration-300 opacity-0 group-hover/item:h-full group-hover/item:opacity-100"></span>
                          <span className="absolute inset-0 bg-teal-400/10 scale-y-0 origin-bottom transition-transform duration-300 group-hover/item:scale-y-100 -z-10"></span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link 
                  href={item.path}
                  className="relative text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:block px-6 py-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 text-gray-900 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:scale-105">
            Get Started
          </button>
          <button className="block md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 