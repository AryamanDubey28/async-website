'use client';

import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Add body scroll locking effect
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileLinkClick = (action: () => void) => {
    action();
    closeMobileMenu();
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '#', onClick: () => scrollToSection('services') },
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
              <div key={item.name} className="relative group">
                {item.onClick ? (
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
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                closeMobileMenu();
                scrollToSection('contact');
              }}
              className="hidden md:block px-6 py-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 text-gray-900 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hamburger Menu Button */}
      <button
        className="block md:hidden text-white fixed top-5 right-4 z-[60] p-2 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className={`w-6 h-6 relative transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'transform rotate-180' : ''}`}>
          <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
          <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 bg-gray-950/95 backdrop-blur-xl z-[55] transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center space-y-6 h-full text-center">
          {navItems.map((item, i) => (
            <div
              key={item.name}
              className={`transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
              style={{ transitionDelay: `${100 + i * 50}ms`}}
            >
              {item.onClick ? (
                <button
                  onClick={() => handleMobileLinkClick(item.onClick!)}
                  className="text-2xl font-medium text-white hover:text-teal-300 transition-colors duration-200"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  href={item.path}
                  onClick={closeMobileMenu}
                  className="text-2xl font-medium text-white hover:text-teal-300 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <div
            className={`pt-8 transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            style={{ transitionDelay: `${100 + navItems.length * 50}ms`}}
          >
            <button
              onClick={() => handleMobileLinkClick(() => scrollToSection('contact'))}
              className="px-10 py-3 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 hover:scale-105 active:scale-95">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
