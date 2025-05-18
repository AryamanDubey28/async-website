'use client';

import { useState, useEffect, Fragment, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const productsDropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Click outside handler for products dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  // Add body scroll locking effect
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent scrolling on the body when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Allow scrolling when menu is closed
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    // If we're on the homepage, scroll to the section
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page with hash
      router.push(`/#${sectionId}`);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleMobileLinkClick = (action: () => void) => {
    action();
    closeMobileMenu();
    setIsProductsDropdownOpen(false);
  };

  const handleMobileNavClick = (path: string) => {
    router.push(path);
    closeMobileMenu();
    setIsProductsDropdownOpen(false);
  }

  const handleProductsToggle = () => {
    setIsProductsDropdownOpen(prev => !prev);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Products', 
      path: '#',
      isDropdown: true,
      onClick: handleProductsToggle,
      dropdownItems: [
        { name: 'Skynet Chat', path: '/skynet-chat' },
        { name: 'Skynet Agents', path: '/skynet-agents' }
      ]
    },
    { name: 'Services', path: '#', onClick: () => scrollToSection('services') },
    { 
      name: 'Blogs', 
      path: '/blogs'
    },
    { name: 'Contact', path: '#', onClick: () => scrollToSection('contact') },
    { name: 'About', path: '/about' }
  ];

  return (
    <Fragment>
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
              <div key={item.name} className="relative group" ref={item.isDropdown ? productsDropdownRef : null}>
                {item.isDropdown ? (
                  <>
                    <button
                      onClick={item.onClick}
                      className="relative text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      {item.name}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ml-1 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : 'group-hover:rotate-180'}`}
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
                      className={`absolute top-full left-0 bg-gray-950/95 backdrop-blur-sm border border-gray-800 rounded-lg shadow-xl transition-all duration-200 ease-out origin-top-left w-64 ${isProductsDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'}`}
                    >
                      <div className="py-3">
                        {item.dropdownItems?.map((dropdownItem) => {
                          const isAgents = dropdownItem.name === 'Skynet Agents';
                          const hoverBgClass = isAgents ? 'hover:bg-gray-800/80' : 'hover:bg-gray-800/80';
                          const hoverTextClass = isAgents ? 'hover:text-purple-300' : 'hover:text-teal-300';
                          const iconColorClass = isAgents ? 'text-purple-400' : 'text-teal-400';
                          const iconHoverClass = isAgents ? 'group-hover/item:text-purple-400' : 'group-hover/item:text-teal-400';
                          const descriptionHoverColorClass = isAgents ? 'group-hover/item:text-purple-400/80' : 'group-hover/item:text-teal-400/70';
                          const underlineHoverColorClass = isAgents ? 'bg-purple-400' : 'bg-teal-400';
                          const leftBorderHoverColorClass = isAgents ? 'bg-purple-400' : 'bg-teal-400';
                          const bgTintHoverClass = isAgents ? 'bg-purple-400/10' : 'bg-teal-400/10';

                          return (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.path}
                              className={`flex items-center whitespace-nowrap px-5 py-3 text-sm text-gray-300 ${hoverBgClass} ${hoverTextClass} transition-all duration-200 nav-dropdown-item relative group/item overflow-hidden`}
                            >
                              <span className={`w-5 h-5 mr-3 ${iconColorClass} transition-transform duration-200 group-hover/item:scale-110 ${iconHoverClass}`}>
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
                                <span className={`text-xs text-gray-400 mt-0.5 ${descriptionHoverColorClass} transition-colors duration-200`}>
                                  {dropdownItem.name === 'Skynet Chat' ? 'Conversational AI assistant' : 'Autonomous AI agents'}
                                </span>
                                <span className={`h-px w-0 ${underlineHoverColorClass} mt-1 transition-all duration-300 group-hover/item:w-full`}></span>
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
                              <span className={`absolute left-0 w-1 h-0 ${leftBorderHoverColorClass} rounded-r transition-all duration-300 opacity-0 group-hover/item:h-full group-hover/item:opacity-100`}></span>
                              <span className={`absolute inset-0 ${bgTintHoverClass} scale-y-0 origin-bottom transition-transform duration-300 group-hover/item:scale-y-100 -z-10`}></span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  item.onClick ? (
                    <button 
                      onClick={item.onClick}
                      className="relative text-gray-300 hover:text-white transition-colors duration-200 group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  ) : (
                    <Link 
                      href={item.path}
                      className="relative text-gray-300 hover:text-white transition-colors duration-200 group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                closeMobileMenu();
                setIsProductsDropdownOpen(false);
                handleMobileLinkClick(() => scrollToSection('contact'));
              }}
              className="hidden md:block px-6 py-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 text-gray-900 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <button 
        className="block md:hidden text-white fixed top-5 right-4 z-[60] p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-950 z-[55]">
          <div className="flex flex-col items-center space-y-6 p-8 pt-24 h-full">
            {navItems.map((item) => (
              item.isDropdown ? (
                <div key={item.name} className="text-center">
                  <span className="text-lg font-medium text-gray-300 mb-2 block">{item.name}</span>
                  <div className="flex flex-col space-y-3">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.path}
                        onClick={closeMobileMenu}
                        className="text-gray-400 hover:text-teal-300 transition-colors duration-200"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : item.onClick ? (
                <button 
                  key={item.name}
                  onClick={() => handleMobileLinkClick(item.onClick!)}
                  className="text-lg font-medium text-gray-300 hover:text-teal-300 transition-colors duration-200"
                >
                  {item.name}
                </button>
              ) : (
                <Link 
                  key={item.name}
                  href={item.path}
                  onClick={closeMobileMenu}
                  className="text-lg font-medium text-gray-300 hover:text-teal-300 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )
            ))}
            <button 
              onClick={() => {
                closeMobileMenu();
                setIsProductsDropdownOpen(false);
                handleMobileLinkClick(() => scrollToSection('contact'));
              }}
              className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 text-gray-900 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Navbar; 