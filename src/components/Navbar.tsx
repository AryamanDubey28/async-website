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
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleMobileLinkClick = (action: () => void) => {
    action();
    closeMobileMenu();
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '#', onClick: () => scrollToSection('services') },
    { name: 'Work', path: '/work' },
    { name: 'Contact', path: '#', onClick: () => scrollToSection('contact') },
    { name: 'About', path: '/about' }
  ];

  return (
    <Fragment>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 glass border-b border-white/5'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold gradient-text-static tracking-tight">
              Async Studios
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="relative text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium group py-2"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300 group-hover:w-full rounded-full" />
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className="relative text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium group py-2"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300 group-hover:w-full rounded-full" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => {
                closeMobileMenu();
                scrollToSection('contact');
              }}
              className="relative px-6 py-2.5 rounded-full text-sm font-medium text-white overflow-hidden group transition-all duration-300 hover:shadow-glow"
            >
              {/* Gradient background */}
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 transition-opacity duration-300" />
              {/* Hover gradient */}
              <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Shimmer effect */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </span>
              <span className="relative z-10">Get Started</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="block md:hidden text-white fixed top-5 right-4 z-[60] p-2 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className={`w-6 h-6 relative transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'transform rotate-180' : ''}`}>
          <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 bg-violet-400' : '-translate-y-2'}`} />
          <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 bg-violet-400' : 'translate-y-2'}`} />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[55] transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background with aurora effect */}
        <div className="absolute inset-0 bg-background aurora-bg">
          <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center space-y-8">
          {navItems.map((item, i) => (
            <div
              key={item.name}
              className={`transition-all duration-500 ease-out ${
                isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: `${100 + i * 75}ms` }}
            >
              {item.onClick ? (
                <button
                  onClick={() => handleMobileLinkClick(item.onClick!)}
                  className="text-3xl font-medium text-white hover:text-violet-400 transition-colors duration-300"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  href={item.path}
                  onClick={closeMobileMenu}
                  className="text-3xl font-medium text-white hover:text-violet-400 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile CTA */}
          <div
            className={`pt-8 transition-all duration-500 ease-out ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: `${100 + navItems.length * 75}ms` }}
          >
            <button
              onClick={() => handleMobileLinkClick(() => scrollToSection('contact'))}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold transition-all duration-300 hover:shadow-glow hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
