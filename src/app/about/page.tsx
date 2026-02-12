'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${sectionId}`);
    }
  }, [pathname, router]);

  const coreValues = [
    {
      title: "Innovation Leadership",
      description: "We continuously explore the cutting edge of AI to bring transformative solutions that keep our clients ahead of the competition.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: 'violet',
    },
    {
      title: "Business Transformation",
      description: "We focus on delivering measurable business impact, not just implementing technology for technology's sake.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      color: 'cyan',
    },
    {
      title: "Educational Empowerment",
      description: "We believe in demystifying AI through education, enabling our clients to make informed decisions about their technological future.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'indigo',
    },
  ];

  const leadershipItems = [
    { title: "Conference Speakers", description: "Our team presents at technology conferences, sharing insights on practical AI implementation strategies.", color: 'violet' },
    { title: "AI Workshops", description: "Hands-on workshops to help businesses understand and leverage the latest AI technologies.", color: 'cyan' },
    { title: "Industry Publications", description: "We contribute research and case studies to industry publications, adding to the broader AI discourse.", color: 'indigo' },
  ];

  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />

      {/* Hero Section with Aurora Background */}
      <section className="relative min-h-[60vh] w-full overflow-hidden">
        {/* Aurora Background */}
        <div className="absolute inset-0 aurora-bg" />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 mesh-gradient" />

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[500px] h-[500px] -top-[150px] -right-[150px] orb orb-violet float-slow" />
          <div className="absolute w-[350px] h-[350px] -bottom-[100px] -left-[100px] orb orb-cyan float" />
          <div className="absolute w-[250px] h-[250px] top-1/2 left-[10%] orb orb-indigo float-delayed" />
        </div>

        {/* Noise texture */}
        <div className="absolute inset-0 noise pointer-events-none" />

        {/* Header Content */}
        <div className={`relative z-10 flex items-center justify-center min-h-[60vh] transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto px-4 pt-32 pb-16 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-violet mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-sm text-violet-300 font-medium tracking-wide">Who We Are</span>
              </div>

              {/* Main Heading */}
              <h1 className="mb-6">
                <div className="overflow-hidden">
                  <span className={`block text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white transition-all duration-700 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    About
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span className={`block text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight gradient-text transition-all duration-700 delay-[400ms] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    Async Studios
                  </span>
                </div>
              </h1>

              {/* Subheading */}
              <p className={`text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Empowering businesses to harness the power of AI for transformative growth. We craft bespoke AI agents, ensuring privacy and performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 py-24 relative z-10">

          {/* Mission Section */}
          <section className={`mb-32 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden card-3d">
              {/* Background glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 orb orb-violet opacity-20" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 orb orb-cyan opacity-20" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 justify-center">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Our Mission</h2>
                </div>

                <p className="text-gray-400 text-lg max-w-3xl mx-auto text-center mb-12 leading-relaxed">
                  Our core mission is to empower your business by integrating cutting-edge AI solutions. We focus on optimizing performance, fostering sustainable growth, and are dedicated to the following key areas:
                </p>

                {/* Mission Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { text: "Educating businesses", detail: "Demystifying AI technologies and showcasing their transformative potential", color: "violet" },
                    { text: "Optimising performance", detail: "Creating tailored AI solutions that seamlessly integrate with existing workflows", color: "cyan" },
                    { text: "Driving innovation", detail: "Leading the conversation about emerging AI technologies through collaboration", color: "indigo" }
                  ].map((item, i) => (
                    <div key={i} className={`group glass rounded-2xl p-6 hover-lift border-glow-pulse`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-8 h-8 rounded-lg bg-${item.color}-500/20 flex items-center justify-center`}>
                          <svg className={`w-4 h-4 text-${item.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white">{item.text}</h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>


          {/* Core Values Section */}
          <section className={`mb-32 transition-all duration-1000 delay-[900ms] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="gradient-text">Our Core Values</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coreValues.map((value, i) => (
                <div key={i} className="group glass rounded-2xl p-8 hover-lift border-glow-pulse text-center">
                  <div className={`w-16 h-16 rounded-full bg-${value.color}-500/10 border border-${value.color}-500/30 flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <span className={`text-${value.color}-400`}>{value.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Thought Leadership Section */}
          <section className={`mb-32 transition-all duration-1000 delay-[1000ms] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="gradient-text">Thought Leadership</span>
              </h2>
            </div>

            <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -bottom-24 -right-24 w-64 h-64 orb orb-violet opacity-15" />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {leadershipItems.map((item, i) => (
                  <div key={i} className={`group glass rounded-xl p-6 hover-lift`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2 h-2 rounded-full bg-${item.color}-400`} />
                      <h3 className={`text-lg font-semibold text-${item.color}-300`}>{item.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className={`transition-all duration-1000 delay-[1100ms] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass-violet rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden">
              {/* Background orbs */}
              <div className="absolute -top-24 -left-24 w-48 h-48 orb orb-violet opacity-30" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 orb orb-cyan opacity-20" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Business with AI?
                </h2>
                <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                  Let&apos;s discuss how our bespoke AI expertise can help optimise your operations, drive innovation, and achieve sustainable growth.
                </p>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="group relative px-8 py-4 rounded-full text-white font-semibold overflow-hidden hover:shadow-glow-lg transition-shadow duration-300"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600" />
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute inset-0 btn-shimmer" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get in Touch
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
