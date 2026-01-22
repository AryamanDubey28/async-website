'use client';

import { useEffect, useState, useCallback } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleLearnMore = useCallback(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Aurora Background - Pure CSS */}
      <div className="absolute inset-0 aurora-bg" />

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Floating Orbs - Pure CSS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large violet orb - top right */}
        <div
          className="absolute w-[600px] h-[600px] -top-[200px] -right-[200px] orb orb-violet float-slow"
          style={{ animationDelay: '0s' }}
        />
        {/* Cyan orb - bottom left */}
        <div
          className="absolute w-[400px] h-[400px] -bottom-[100px] -left-[100px] orb orb-cyan float"
          style={{ animationDelay: '2s' }}
        />
        {/* Indigo orb - center right */}
        <div
          className="absolute w-[300px] h-[300px] top-1/2 right-[10%] orb orb-indigo float-delayed"
          style={{ animationDelay: '4s' }}
        />
        {/* Small violet orb - top left */}
        <div
          className="absolute w-[200px] h-[200px] top-[20%] left-[5%] orb orb-violet float-slow"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Main Content */}
      <div
        className={`relative z-10 flex min-h-screen items-center justify-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="mb-8">
              <div className="overflow-hidden">
                <span
                  className={`block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white transition-all duration-700 delay-200 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
                >
                  AI Agents.
                </span>
              </div>
              <div className="overflow-hidden">
                <span
                  className={`block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white transition-all duration-700 delay-300 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
                >
                  Private.
                </span>
              </div>
              <div className="overflow-hidden">
                <span
                  className={`block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight gradient-text transition-all duration-700 delay-[400ms] ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
                >
                  Built for you.
                </span>
              </div>
            </h1>

            {/* Subheading */}
            <p
              className={`text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Ditch generic AI. Get private, custom agents built for{' '}
              <span className="text-white font-medium">your</span> challenges,
              saving <span className="text-white font-medium">you</span> time & delivering results that actually matter.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-[600ms] ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Primary CTA */}
              <button
                onClick={handleGetStarted}
                className="group relative px-8 py-4 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow-lg"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600" />
                <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 btn-shimmer" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>

              {/* Secondary CTA */}
              <button
                onClick={handleLearnMore}
                className="group relative px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 glass rounded-full" />
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                <span className="relative z-10 text-white">Learn More</span>
              </button>
            </div>

            {/* Feature Pills */}
            <div
              className={`flex flex-wrap justify-center gap-3 transition-all duration-700 delay-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {[
                { label: 'Trusted by Industry Leaders', icon: (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )},
                { label: 'Save Time & Resources', icon: (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )},
                { label: 'Custom Solutions', icon: (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )},
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-full glass-violet text-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <span className="text-violet-400 group-hover:text-violet-300 transition-colors duration-300">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Glass Cards - Desktop only */}
      <div className="hidden lg:block">
        {/* Top right glass card - Performance */}
        <div
          className={`absolute top-[22%] right-[8%] w-48 transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass-violet rounded-2xl p-4 float card-3d">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-violet-300">Performance</span>
            </div>
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div className="text-xs text-gray-400">Uptime guaranteed</div>
          </div>
        </div>

        {/* Top left glass card - Time Saved */}
        <div
          className={`absolute top-[18%] left-[6%] w-44 transition-all duration-1000 delay-[750ms] ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass rounded-2xl p-4 float-delayed card-3d -rotate-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-white">Save Time</div>
                <div className="text-xs text-gray-400">Automate your work</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom left glass card - Security */}
        <div
          className={`absolute bottom-[22%] left-[8%] w-52 transition-all duration-1000 delay-[800ms] ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass rounded-2xl p-4 float-delayed card-3d">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-cyan-300">Security</span>
            </div>
            <div className="text-sm text-gray-300">
              Your data stays private. Always encrypted, never shared.
            </div>
          </div>
        </div>

        {/* Middle left - ROI card */}
        <div
          className={`absolute top-[45%] left-[4%] transition-all duration-1000 delay-[850ms] ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass rounded-xl p-3 float-slow card-3d rotate-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-white">Boost ROI</div>
                <div className="text-xs text-gray-400">Measurable results</div>
              </div>
            </div>
          </div>
        </div>

        {/* Code snippet card - right side */}
        <div
          className={`absolute top-[48%] right-[5%] transition-all duration-1000 delay-[900ms] ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass rounded-xl p-3 float-slow rotate-3 card-3d">
            <div className="font-mono text-[10px] leading-relaxed">
              <div>
                <span className="text-violet-400">const</span>{' '}
                <span className="text-cyan-300">agent</span>{' '}
                <span className="text-gray-500">=</span>{' '}
                <span className="text-violet-400">await</span>
              </div>
              <div className="pl-2">
                <span className="text-yellow-300">Async</span>
                <span className="text-gray-500">.</span>
                <span className="text-cyan-300">createAgent</span>
                <span className="text-gray-500">(</span>
                <span className="text-orange-300">&apos;custom&apos;</span>
                <span className="text-gray-500">)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom right - Response time card */}
        <div
          className={`absolute bottom-[18%] right-[10%] w-40 transition-all duration-1000 delay-[950ms] ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass-violet rounded-2xl p-4 float card-3d -rotate-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-[10px] font-medium text-green-300">Response</span>
            </div>
            <div className="text-xl font-bold text-white">&lt;100ms</div>
            <div className="text-[10px] text-gray-400">Average latency</div>
          </div>
        </div>

        {/* Decorative gradient line - left */}
        <div
          className={`absolute top-[35%] left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent transition-all duration-1000 delay-[1000ms] ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Decorative gradient line - right */}
        <div
          className={`absolute bottom-[35%] right-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transition-all duration-1000 delay-[1000ms] ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Additional floating particles/dots */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '25%', left: '15%' },
          { top: '35%', left: '85%' },
          { top: '55%', left: '12%' },
          { top: '65%', left: '88%' },
          { top: '75%', left: '25%' },
          { top: '45%', left: '92%' },
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full bg-violet-400/30 float-slow ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              top: pos.top,
              left: pos.left,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

    </section>
  );
};

export default Hero;
